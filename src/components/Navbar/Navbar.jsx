import { BiSolidOffer } from "react-icons/bi";
import { IoHelpBuoyOutline } from "react-icons/io5";
import { MdCorporateFare, MdOutlineSearch } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { SwiggyLogo } from "../../assets/svg";
import UserLocation from "./UserLocation";
import { useSelector } from "react-redux";
import User from "./User";

const Navbar = () => {
  const { cartData } = useSelector((state) => state.cartSlice);

  const location = useLocation();

  return (
    <div className="sticky top-0 z-10 flex items-center w-full shadow min-h-20 bg-neutral-50">
      <div className="container flex items-center justify-between max-w-6xl px-5 mx-auto">
        <div className="flex items-center gap-5 md:gap-10">
          <div id="logo" className="transition duration-300 hover:scale-110">
            <Link to="/">
              <SwiggyLogo />
            </Link>
          </div>
          {location.pathname === "/cart" ? (
            <span className="text-xs font-bold uppercase md:text-sm">
              Secure Checkout
            </span>
          ) : (
            <UserLocation />
          )}
        </div>

        <ul className="flex items-center gap-3 text-base font-semibold lg:gap-10">
          {location.pathname === "/cart" ? (
            <>
              <Navlinks text={"Help"} Icon={IoHelpBuoyOutline} routeLink={""} />

              <User />
            </>
          ) : (
            <>
              <Navlinks
                text={"Search"}
                Icon={MdOutlineSearch}
                routeLink={"/search"}
              />
              <User />
              <li className="cursor-pointer hover:text-swiggyOrange">
                <Link to={"/cart"}>
                  <div className="flex items-center gap-1">
                    <span>
                      <span
                        className={`px-1.5 py-0.5 text-xs ${
                          cartData.length === 0
                            ? "border-2 border-gray-500"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {cartData.length}
                      </span>
                    </span>
                    <span className="text-xs md:text-sm">Cart</span>
                  </div>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

export const Navlinks = ({ text, Icon, routeLink, className }) => {
  return (
    <li className={`cursor-pointer hover:text-swiggyOrange ${className}`}>
      <Link to={routeLink}>
        <div className="flex items-center gap-1 text-xs lg:text-base">
          <span>
            <Icon />
          </span>
          <span>{text}</span>
        </div>
      </Link>
    </li>
  );
};
