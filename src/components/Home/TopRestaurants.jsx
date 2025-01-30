import { Carousel } from "../Common";
import RestaurantCard from "./RestaurantCard";

const TopRestaurants = ({ data, title }) => {
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
