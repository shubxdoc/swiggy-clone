import { useState } from "react";
import { HorizontalLine } from "../Common";
import { Star2 } from "../../assets/svg";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { setSimilarResDish } from "../../store/searchSlice";

const MenuItemCard = ({
  index,
  itemCards,
  info,
  restaurantInfo,
  searchCard,
}) => {
  const [readMore, setReadMore] = useState(false);

  const descriptionWords = info?.description?.split(" ") || [];
  const maxWords = 28;

  const dispatch = useDispatch();

  const { resInfo } = useSelector((state) => state.cartSlice);

  const { id: selectedItemId } = info;

  const { city, restaurant: selectedResLocation } = restaurantInfo?.slugs;

  function handleSameResInfoToggle() {
    if (resInfo.id == restaurantInfo.id || !resInfo) {
      dispatch(
        setSimilarResDish({
          isSimilarResDishes: true,
          city: city,
          resLocation: selectedResLocation,
          resId: restaurantInfo.id,
          itemId: selectedItemId,
        })
      );
    }
  }

  return (
    <>
      <div className="flex justify-between py-5">
        <div className="max-w-[536px] space-y-3">
          <span className="font-bold">
            <img
              src={
                info?.itemAttribute?.vegClassifier == "VEG" || info.isVeg
                  ? "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png"
                  : "https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"
              }
              alt=""
              width={16}
              height={16}
            />
            <p>{info.name}</p>
            <p>₹{(info.defaultPrice || info.price) / 100}</p>
          </span>
          {!searchCard && info?.ratings?.aggregatedRating?.rating && (
            <span className="flex items-center text-sm">
              <Star2 />
              <span
                className={`${
                  info.ratings.aggregatedRating.rating > 3
                    ? "text-green-600"
                    : "text-yellow-600"
                } pr-0.5 font-bold`}
              >
                {info.ratings.aggregatedRating.rating}
              </span>
              <span>({info.ratings.aggregatedRating.ratingCountV2})</span>
            </span>
          )}
          {!searchCard && (
            <div className="flex items-end text-sm text-gray-500">
              <span
                className={`break-all text-ellipsis ${
                  !readMore && "line-clamp-2"
                }`}
              >
                {info?.description}
              </span>
              {descriptionWords?.length > maxWords && !readMore && (
                <span
                  onClick={() => setReadMore((prev) => !prev)}
                  className="font-bold"
                >
                  more
                </span>
              )}
            </div>
          )}
        </div>
        <div className="ml-[60px] max-h-[174px] min-w-[156px] relative">
          <img
            src={
              info?.imageId
                ? `https://media-assets.swiggy.com/swiggy/image/upload/${info.imageId}`
                : "https://www.foodservicerewards.com/cdn/shop/t/262/assets/fsr-placeholder.png?v=45093109498714503231652397781"
            }
            alt=""
            className="rounded-xl w-[156px] h-[144px]"
          />
          <span
            onClick={() => searchCard && handleSameResInfoToggle()}
            className="absolute flex justify-center -bottom-1 inset-x-2"
          >
            <button
              onClick={() => dispatch(addToCart({ info, restaurantInfo }))}
              className="px-6 py-1 font-bold text-green-600 bg-white border shadow-md rounded-xl"
            >
              ADD
            </button>
          </span>
        </div>
      </div>
      {itemCards && index !== itemCards?.length - 1 && (
        <HorizontalLine customClass={"my-3 border-gray-300"} />
      )}
    </>
  );
};

export default MenuItemCard;
