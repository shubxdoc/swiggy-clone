import { useEffect, useState } from "react";
import { Carousel } from "../Common";
import { useSelector } from "react-redux";

const OnYourMind = () => {
  const [data, setData] = useState([]);

  const { coordinates } = useSelector((state) => state.coordinateSlice);

  const { lat, lng } = coordinates;

  const fetchData = async () => {
    const baseURL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    try {
      const response = await fetch(baseURL);
      const result = await response.json();
      setData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [coordinates]);

  return (
    <>
      <Carousel
        title={"What's on your mind?"}
        data={data}
        slidesToShow={8.5}
        slidesToScroll={3}
        renderItem={(item) => (
          <img
            key={item.id}
            src={`https://media-assets.swiggy.com/swiggy/image/upload/${item.imageId}`}
            alt={item.accessibility?.altText || "Image"}
            className="px-2 rounded-lg"
          />
        )}
      ></Carousel>
    </>
  );
};

export default OnYourMind;
