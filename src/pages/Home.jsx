import { useEffect, useState } from "react";
import { HorizontalLine } from "../components/Common";
import {
  OnYourMind,
  TopRestaurants,
  RestaurantsWithOnlineDelivery,
} from "../components/Home";
import { useSelector } from "react-redux";

const Home = () => {
  const [onYourMindData, setOnYourMindData] = useState([]);
  const [topRestaurantsData, setTopRestaurantsData] = useState([]);
  const [
    restaurantsWithOnlineDeliveryData,
    setRestaurantsWithOnlineDeliveryData,
  ] = useState([]);
  const [onYourMindTitle, setOnYourMindTitle] = useState("");
  const [topResTitle, setTopResTitle] = useState("");
  const [onlineResTitle, setOnlineResTitle] = useState("");
  const [serviceAvailability, setServiceAvailability] = useState("");
  const { coordinates } = useSelector((state) => state.coordinateSlice);

  const { lat, lng } = coordinates;

  const fetchData = async () => {
    const baseURL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    try {
      const response = await fetch(baseURL);
      const result = await response.json();

      const findCardById = (cards, id) => {
        return cards.find((resData) => resData?.card?.card?.id === id)?.card
          ?.card;
      };

      const topBrandsCard = findCardById(
        result?.data?.cards,
        "top_brands_for_you"
      );
      const resOnlineCards = findCardById(
        result?.data?.cards,
        "restaurant_grid_listing"
      );
      const onMindCards = findCardById(
        result?.data?.cards,
        "whats_on_your_mind"
      );

      let onMindData = onMindCards?.imageGridCards?.info;
      let onMindHeader = onMindCards?.header?.title;

      let topResData = topBrandsCard?.gridElements?.infoWithStyle?.restaurants;
      let topResHeader = topBrandsCard?.header?.title;

      let onlineResData =
        resOnlineCards?.gridElements?.infoWithStyle?.restaurants;
      let onlineResHeader = resOnlineCards?.header?.title;

      setOnYourMindData(onMindData || []);
      setOnYourMindTitle(onMindHeader || "");

      setTopRestaurantsData(topResData || []);
      setTopResTitle(topResHeader || "");

      setRestaurantsWithOnlineDeliveryData(topResData || onlineResData);

      setOnlineResTitle(onlineResHeader || "");

      setServiceAvailability(result?.data?.cards[0]?.card?.card?.title);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [coordinates]);

  if (serviceAvailability === "Location Unserviceable") {
    return (
      <div className="container flex flex-col items-center justify-center w-full">
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
