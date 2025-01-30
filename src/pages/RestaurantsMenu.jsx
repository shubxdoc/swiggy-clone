import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DealsForYou,
  Menu,
  RestaurantBannerCard,
  NewRestaurantConfirmModal,
} from "../components/RestaurantMenu";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, confirmAddToCart } from "../store/cartSlice";

const RestaurantsMenu = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

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

  const [menuData, setMenuData] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);

  const fetchMenu = async () => {
    const restaurantId = id?.split("rest")[1];

    if (!restaurantId && !id) {
      console.error("Invalid restaurant ID format.");
      return;
    }

    const baseURL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${
      restaurantId || id
    }&catalog_qa=undefined&submitAction=ENTER`;

    try {
      const response = await fetch(baseURL);
      const result = await response.json();

      console.log(
        result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR.cards
      );

      setRestaurantInfo(result?.data?.cards[2]?.card?.card?.info);
      setDiscountData(
        result?.data?.cards[3]?.card?.card?.gridElements.infoWithStyle.offers
      );

      let actualMenu =
        (result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
          (data) =>
            data?.card?.card?.itemCards?.length > 0 ||
            data?.card?.card?.categories?.length > 0 ||
            data?.card?.card?.carousel?.length > 0
        );

      setMenuData(actualMenu);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [coordinates]);

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
