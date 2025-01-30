import { IoIosStar } from "react-icons/io";
import { Link } from "react-router-dom";

const SearchRestaurantCard = ({ info, ctaWithParams }) => {
  return (
    <Link to={`/menu/${ctaWithParams.restaurant_id}`}>
      <div className="flex gap-3 p-5 text-sm bg-white rounded-2xl">
        <div className="relative max-w-24 max-h-24">
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${info.cloudinaryImageId}`}
            alt=""
            className="object-cover w-full h-full rounded-xl"
          />
          <span className="absolute flex justify-center -bottom-1 inset-x-2"></span>
        </div>
        <div className="flex flex-col gap-0.5 justify-center text-gray-500">
          <p className="font-bold text-black line-clamp-1">{info.name}</p>
          <p className="flex items-center gap-1">
            <span className="text-gray-500">
              <IoIosStar />
            </span>
            <span>{info?.avgRatingString}</span>
            <span>{info?.sla?.slaString}</span>
            <span>{info?.costForTwoMessage}</span>
          </p>
          <p className="line-clamp-1">{info.cuisines.slice(0, 4).join(", ")}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchRestaurantCard;
