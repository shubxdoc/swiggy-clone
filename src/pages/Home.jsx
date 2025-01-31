import { useEffect } from "react";
import { HorizontalLine } from "../components/Common";
import {
  OnYourMind,
  TopRestaurants,
  RestaurantsWithOnlineDelivery,
} from "../components/Home";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsData } from "../store/restaurantSlice";
import { ShimmerLoader } from "../components/Common";

const Home = () => {
  const dispatch = useDispatch();

  const {
    onYourMindData,
    topRestaurantsData,
    restaurantsWithOnlineDeliveryData,
    onYourMindTitle,
    topResTitle,
    onlineResTitle,
    serviceAvailability,
    status,
    error,
  } = useSelector((state) => state.restaurantSlice);

  const { coordinates } = useSelector((state) => state.coordinateSlice);

  const { lat, lng } = coordinates;

  useEffect(() => {
    dispatch(getRestaurantsData({ lat, lng }));
  }, [coordinates]);

  if (status === "loading") return <ShimmerLoader />;
  if (status === "failed") return <p>Error: {error}</p>;

  if (serviceAvailability === "Location Unserviceable") {
    return (
      <div className="container flex flex-col items-center justify-center h-[70vh] w-full mx-auto">
        <img
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
          alt="Unserviceable"
        />
        <p>We don’t have any services here till now. Try changing location.</p>
      </div>
    );
  }

  return (
    <div className="container px-4 mx-auto max-w-[90rem] mb-10">
      {onYourMindData.length ? (
        <>
          <div className="my-7">
            <OnYourMind data={onYourMindData} title={onYourMindTitle} />
          </div>

          <HorizontalLine />

          <div className="hidden lg:block">
            <TopRestaurants data={topRestaurantsData} title={topResTitle} />
            <HorizontalLine />
          </div>
        </>
      ) : null}

      <RestaurantsWithOnlineDelivery
        data={restaurantsWithOnlineDeliveryData}
        title={onlineResTitle}
      />
    </div>
  );
};

export default Home;
