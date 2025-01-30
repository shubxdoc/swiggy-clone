import RestaurantCard from "./RestaurantCard";
import { useSelector } from "react-redux";
import { FilterButton } from "../Common";

const RestaurantsWithOnlineDelivery = ({ data, title }) => {
  const { filterValue } = useSelector((state) => state.filterSlice);

  const filterData = data.filter((item) => {
    if (!filterValue) return;

    switch (filterValue) {
      case "Fast Delivery":
        return item?.info?.sla?.deliveryTime < 22;
      case "Ratings 4.0+":
        return item?.info?.avgRating > 4;
      case "Veg Only":
        return item?.info?.veg;
      case "Offers":
        return item?.info?.aggregatedDiscountInfoV3;
      default:
        return;
    }
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center gap-3 my-5">
        <FilterButton btnText={"Fast Delivery"} />
        <FilterButton btnText={"Ratings 4.0+"} />
        <FilterButton btnText={"Veg Only"} />
        <FilterButton btnText={"Offers"} />
      </div>
      <div className="grid grid-cols-1 gap-2 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {(filterValue ? filterData : data).map((item) => (
          <RestaurantCard
            key={item.info.id}
            type={"delivery-restaurants"}
            link={item.cta.link.split("/")[5]}
            Name={item.info.name}
            discountInfo={item.info.aggregatedDiscountInfoV3}
            imageID={item?.info.cloudinaryImageId}
            rating={item.info.avgRating}
            deliveryTime={item.info.sla.slaString}
            tags={item.info.cuisines}
            location={item.info.locality}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantsWithOnlineDelivery;
