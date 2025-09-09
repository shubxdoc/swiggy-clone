import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { MdClear } from "react-icons/md";
import {
  SearchDishesCard,
  SearchFilterButton,
  SearchRestaurantCard,
} from "../components/SearchPage";
import { useDispatch, useSelector } from "react-redux";
import { NewRestaurantConfirmModal } from "../components/RestaurantMenu";
import { closeModal, confirmAddToCart } from "../store/cartSlice";
import { resetSimilarResDish } from "../store/searchSlice";
import {
  fetchDishes,
  fetchRestaurantsSearch,
  fetchSimilarResDishes,
} from "../services/api";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSelected, setIsSelected] = useState(false);

  const [dishesData, setDishesData] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);

  const [selectedResDish, setSelectedResDish] = useState(null);
  const [sameResDishes, setSameResDishes] = useState([]);

  const { coordinates } = useSelector((state) => state.coordinateSlice);

  const { lat, lng } = coordinates;

  // Modal handling
  const { isOpen } = useSelector((state) => state.cartSlice.modalState);

  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(confirmAddToCart());
    dispatch(resetSimilarResDish());
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  // SimilarRes response

  const { isSimilarResDishes, city, resId, itemId, resLocation } = useSelector(
    (state) => state.searchSlice.similarResDish
  );

  const handleFetchSimilarDishes = async () => {
    try {
      const { selectedRestaurantDish, sameDishes } =
        await fetchSimilarResDishes({
          lat,
          lng,
          searchQuery,
          city,
          resLocation,
          resId,
          itemId,
        });

      setSelectedResDish(selectedRestaurantDish);
      setSameResDishes(sameDishes);
      dispatch(resetSimilarResDish());
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (isSimilarResDishes) {
      handleFetchSimilarDishes();
    }
  }, [isSimilarResDishes]);

  const getDishes = async () => {
    if (!searchQuery) return;
    try {
      const dishes = await fetchDishes({ searchQuery, lat, lng });
      setDishesData(dishes);
    } catch (error) {
      console.log("Error fetching dishes:", error);
    }
  };

  const getRestaurants = async () => {
    if (!searchQuery) return;

    try {
      const restaurants = await fetchRestaurantsSearch({
        searchQuery,
        lat,
        lng,
      });
      setRestaurantsData(restaurants);
    } catch (error) {
      console.log("Error fetching restaurants:", error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() == "") return;

    setSelectedResDish(null);
    getDishes();
    getRestaurants();
  }, [searchQuery]);

  return (
    <div className="container relative max-w-4xl px-3 mx-auto mt-20">
      <div className="relative flex items-center justify-between px-5 py-4 border border-gray-400 rounded-lg">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for restaurants and food"
          className="w-full outline-none"
        />
        <span className="absolute right-3">
          {searchQuery ? (
            <MdClear
              cursor={"pointer"}
              size={"1.5em"}
              onClick={() => setSearchQuery("")}
            />
          ) : (
            <IoIosSearch size={"1.5em"} />
          )}
        </span>
      </div>

      {!selectedResDish && (
        <div className="flex gap-4 my-5">
          <SearchFilterButton
            btnText={"Restaurants"}
            isSelected={isSelected === "Restaurants"}
            onClick={() => setIsSelected("Restaurants")}
          />
          <SearchFilterButton
            btnText={"Dishes"}
            isSelected={isSelected === "Dishes"}
            onClick={() => setIsSelected("Dishes")}
          />
        </div>
      )}

      {searchQuery && (
        <div
          className={`grid gap-5 p-3 bg-slate-50 
      ${selectedResDish ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}
        >
          {selectedResDish ? (
            <>
              <div>
                <h1 className="my-5 text-xl font-medium">Item added to cart</h1>
                <div className="grid gap-5 md:grid-cols-2">
                  <SearchDishesCard
                    info={selectedResDish?.card?.card?.info}
                    restaurant={selectedResDish?.card?.card?.restaurant?.info}
                  />
                </div>
              </div>
              <div>
                <h1 className="my-5 text-xl font-medium">
                  More dishes from this restaurant
                </h1>
                <div className="grid gap-5 md:grid-cols-2">
                  {sameResDishes.map((item) => {
                    const { info, hideRestaurantDetails } = item?.card;
                    return (
                      <SearchDishesCard
                        key={info?.id}
                        info={info}
                        restaurant={
                          selectedResDish?.card?.card?.restaurant?.info
                        }
                        hideRestaurantDetails={hideRestaurantDetails}
                      />
                    );
                  })}
                </div>
              </div>
            </>
          ) : isSelected === "Restaurants" ? (
            restaurantsData.map((item) => {
              const { ctaWithParams, info } = item?.card?.card;
              return (
                <SearchRestaurantCard
                  key={info?.id}
                  info={info}
                  ctaWithParams={ctaWithParams.params}
                />
              );
            })
          ) : (
            dishesData.map((item) => {
              const { info, restaurant } = item?.card?.card;
              return (
                <SearchDishesCard
                  key={info?.id}
                  info={info}
                  restaurant={restaurant.info}
                />
              );
            })
          )}
        </div>
      )}

      <NewRestaurantConfirmModal
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </div>
  );
};

export default SearchPage;
