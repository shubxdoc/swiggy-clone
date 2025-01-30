import { IoIosStar } from "react-icons/io";
import { MenuItemCard } from "../RestaurantMenu";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const SearchDishesCard = ({ info, restaurant, hideRestaurantDetails }) => {
  return (
    <div className="flex flex-col justify-between p-4 bg-white border shadow-md rounded-2xl">
      {!hideRestaurantDetails && (
        <div className="flex items-center justify-between pb-3 text-sm text-gray-500 border-b border-gray-400 border-dotted">
          <div className="flex flex-col ">
            <p className="font-semibold ">By {restaurant?.name}</p>
            <p className="flex items-center gap-1">
              <span className="text-gray-500">
                <IoIosStar />
              </span>
              <span>{restaurant?.avgRating}</span>
              <span>{restaurant?.sla?.slaString}</span>
            </p>
          </div>
          <span>
            <Link to={`/menu/${restaurant?.id}`}>
              <FaArrowRight />
            </Link>
          </span>
        </div>
      )}

      <MenuItemCard info={info} restaurantInfo={restaurant} searchCard />
    </div>
  );
};

export default SearchDishesCard;
