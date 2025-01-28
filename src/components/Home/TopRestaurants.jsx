import { useEffect, useState } from "react";
import { Carousel } from "../Common";
import RestaurantCard from "./RestaurantCard";
import { useSelector } from "react-redux";

const TopRestaurants = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [serviceAvailability, setServiceAvailability] = useState("");
  const { coordinates } = useSelector((state) => state.coordinateSlice);

  const { lat, lng } = coordinates;

  const fetchData = async () => {
    const baseURL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    try {
      const response = await fetch(baseURL);
      const result = await response.json();

      setTitle(result?.data?.cards[1]?.card?.card?.header?.title);

      setData(
        result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );

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
    <>
      <Carousel
        title={title}
        data={data}
        slidesToScroll={2}
        slidesToShow={4.7}
        renderItem={(item) => (
          <RestaurantCard
            type={"top-restaurants"}
            link={item.cta.link.split("/")[5]}
            Name={item.info.name}
            discountInfo={item.info.aggregatedDiscountInfoV3}
            imageID={item?.info.cloudinaryImageId}
            rating={item.info.avgRating}
            deliveryTime={item.info.sla.slaString}
            tags={item.info.cuisines}
            location={item.info.locality}
          />
        )}
      ></Carousel>
    </>
  );
};

export default TopRestaurants;
