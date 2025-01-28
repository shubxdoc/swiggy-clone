import star from "../../assets/star.webp";

const RestaurantBannerCard = ({ restaurantInfo }) => {
  return (
    <div className="h-[176px] bg-gradient-to-t from-gray-200 from-0% to-transparent rounded-b-[3rem] px-5 pb-5">
      <div className="h-full border rounded-[2rem] bg-white p-6 space-y-3">
        <div className="flex items-center gap-1 font-semibold">
          <span className="size-4">
            <img src={star} alt="" />
          </span>
          <span>
            {restaurantInfo?.avgRating +
              `(${restaurantInfo?.totalRatingsString})` +
              " • "}
          </span>
          <span>{restaurantInfo?.costForTwoMessage}</span>
        </div>

        <p className="text-sm font-bold underline cursor-pointer text-swiggyOrange">
          {restaurantInfo?.cuisines?.join(", ")}
        </p>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-gray-300 rounded-full size-2"></div>
            <div className="w-[1.1px] h-6 bg-gray-300"></div>
            <div className="bg-gray-300 rounded-full size-2"></div>
          </div>
          <div className="space-y-4 text-xs font-bold">
            <p>
              Outlet{" "}
              <span className="pl-2 font-light text-gray-600">
                {restaurantInfo?.locality}
              </span>
            </p>
            <p>{restaurantInfo?.sla?.slaString}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBannerCard;
