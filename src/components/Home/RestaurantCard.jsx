import { Link } from "react-router-dom";
import star from "../../assets/star.webp";

const RestaurantCard = ({
  id,
  link,
  type,
  Name,
  imageID,
  discountInfo,
  rating,
  deliveryTime,
  tags,
  location,
}) => {
  return (
    <Link to={`/menu/${link}`}>
      <div className="mt-4 space-y-2 transition-all duration-300 hover:scale-95">
        <div
          className={`relative ${
            type == "top-restaurants"
              ? "w-[273px] h-[183px]"
              : "w-[330px] h-[220px]"
          } `}
        >
          <img
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${imageID}`}
            alt=""
            className="object-cover w-full h-full rounded-xl"
          />
          <div className="absolute top-0 w-full h-full bg-gradient-to-t from-black/45 to-transparent rounded-xl"></div>
          {discountInfo && (
            <p className="absolute text-lg font-extrabold text-white bottom-2 left-4">
              {discountInfo?.header + " " + discountInfo?.subHeader}
            </p>
          )}
        </div>
        <div className="pl-2">
          <h1 className="my-1 font-bold">{Name}</h1>
          <div className="flex items-center gap-0.5">
            <span className="size-4">
              <img src={star} alt="" />
            </span>
            <span>{rating + " • "}</span>
            <span>{deliveryTime}</span>
          </div>
          <p className="text-sm text-gray-500 line-clamp-1">
            {tags.slice(0, 4).join(", ")}
          </p>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
