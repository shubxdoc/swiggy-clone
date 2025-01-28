import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import MenuItemCard from "./MenuItemCard";

const MenuDropDowns = ({ title, itemCards, isSubCategory, restaurantInfo }) => {
  const [show, setShow] = useState(isSubCategory ? false : true);

  return (
    <div className="px-2 my-5">
      <div
        onClick={() => setShow((prev) => !prev)}
        className="flex items-center justify-between mb-2 cursor-pointer"
      >
        <h1
          className={`${
            isSubCategory ? "text-base" : "text-lg"
          }  font-extrabold`}
        >
          {title} ({itemCards.length})
        </h1>
        <span>{show ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
      </div>
      {/* Item Card */}
      {show &&
        itemCards.map((item, i) => {
          const { info } = item?.card;
          return (
            <MenuItemCard
              key={i}
              itemCards={itemCards}
              info={info}
              index={i}
              restaurantInfo={restaurantInfo}
            />
          );
        })}
    </div>
  );
};

export default MenuDropDowns;
