import { HorizontalLine } from "../components/Common";
import {
  OnYourMind,
  TopRestaurants,
  RestaurantsWithOnlineDelivery,
} from "../components/Home";

const Home = () => {
  return (
    <div className="container px-4 mx-auto max-w-[90rem] mb-10">
      <div className="my-7">
        <OnYourMind />
      </div>

      <HorizontalLine />

      <div className="hidden lg:block">
        <TopRestaurants />
        <HorizontalLine />
      </div>

      <RestaurantsWithOnlineDelivery />
    </div>
  );
};

export default Home;
