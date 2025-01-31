import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DealsForYou,
  Menu,
  RestaurantBannerCard,
  NewRestaurantConfirmModal,
} from "../components/RestaurantMenu";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, confirmAddToCart } from "../store/cartSlice";
import { getMenuData } from "../store/restaurantSlice";
import { SkeletonLoader } from "../components/Common";

const RestaurantsMenu = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const restaurantId = id.replace(/\D/g, "");

  const { coordinates } = useSelector((state) => state.coordinateSlice);
  const { lat, lng } = coordinates;

  // Modal handling
  const { isOpen } = useSelector((state) => state.cartSlice.modalState);

  const handleConfirm = () => {
    dispatch(confirmAddToCart());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const { menuData, restaurantInfo, discountData, menuStatus, error } =
    useSelector((state) => state.restaurantSlice);

  console.log(menuData);

  useEffect(() => {
    dispatch(getMenuData({ restaurantId, lat, lng }));
  }, [id, coordinates, dispatch]);

  if (menuStatus === "loading") return <SkeletonLoader />;
  if (menuStatus === "failed") return <p>Error: {error}</p>;

  return (
    <div className="container w-full max-w-3xl px-2 mx-auto my-5 space-y-10">
      <div>
        <p className="text-[0.6rem] text-gray-400 cursor-pointer">
          <Link to={"/"}>
            <span className="hover:text-black">Home</span>
          </Link>{" "}
          / <span className="hover:text-black">{restaurantInfo.city}</span> /{" "}
          <span className="text-black cursor-text">{restaurantInfo.name}</span>
        </p>
      </div>

      <h1 className="px-2 text-2xl font-black">{restaurantInfo.name}</h1>

      <RestaurantBannerCard restaurantInfo={restaurantInfo} />

      <DealsForYou data={discountData} />

      <Menu data={menuData} restaurantInfo={restaurantInfo} />

      <NewRestaurantConfirmModal
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </div>
  );
};

export default RestaurantsMenu;
