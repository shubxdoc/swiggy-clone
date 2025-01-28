import { IoIosSearch } from "react-icons/io";
import MenuDropDowns from "./MenuDropDowns";
import { Carousel, HorizontalLine } from "../Common";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

const Menu = ({ data, restaurantInfo }) => {
  const dispatch = useDispatch();

  return (
    <div className="space-y-3">
      <h1 className="text-sm tracking-widest text-center text-gray-500">
        MENU
      </h1>

      <div className="relative w-full p-3 font-semibold text-center text-gray-500 bg-gray-100 rounded-lg cursor-pointer min-h-5">
        Search for dishes
        <span className="absolute cursor-default right-3 top-3">
          <IoIosSearch size={"1.5em"} />
        </span>
      </div>

      <div>
        {data.map((item, i) => {
          const { categories, carousel, itemCards, title } = item.card?.card;
          return (
            <>
              {/* TOP PICKS */}

              {carousel && (
                <>
                  <HorizontalLine />
                  <Carousel
                    title={title}
                    customHeaderClass={"text-lg"}
                    data={carousel}
                    slidesToShow={2.2}
                    slidesToScroll={1}
                    renderItem={(item) => {
                      const { info } = item?.dish;
                      return (
                        <>
                          <div className="relative">
                            <img
                              src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.creativeId}`}
                              alt=""
                            />
                            <span className="absolute z-20 text-white bottom-5 left-5">
                              ₹{(info.defaultPrice || info.price) / 100}
                            </span>
                            <span className="absolute flex justify-center bottom-5 right-5">
                              <button
                                onClick={() =>
                                  dispatch(addToCart({ info, restaurantInfo }))
                                }
                                className="px-6 py-2 font-bold text-green-600 bg-white border shadow-md rounded-xl hover:bg-gray-100 min-w-28"
                              >
                                ADD
                              </button>
                            </span>
                          </div>
                        </>
                      );
                    }}
                  />
                </>
              )}

              {/* Categories Cards */}
              {categories && (
                <div>
                  <HorizontalLine customClass={"my-4 py-1.5 bg-gray-100"} />
                  <h1 className="px-2 mb-5 text-lg font-extrabold">{title}</h1>
                  {categories.map((item, i) => {
                    const {
                      itemCards: categoriesItemCards,
                      title: categoriesTitles,
                    } = item;
                    return (
                      <>
                        {categoriesItemCards && (
                          <>
                            <MenuDropDowns
                              key={i}
                              itemCards={categoriesItemCards}
                              title={categoriesTitles}
                              isSubCategory={true}
                              restaurantInfo={restaurantInfo}
                            />
                            {i !== categories.length - 1 && (
                              <HorizontalLine customClass={"my-3"} />
                            )}
                          </>
                        )}
                      </>
                    );
                  })}
                </div>
              )}

              {/* Normal Cards */}
              {itemCards && (
                <>
                  <HorizontalLine customClass={"my-4 py-1.5 bg-gray-100"} />
                  <MenuDropDowns
                    key={i}
                    itemCards={itemCards}
                    title={title}
                    restaurantInfo={restaurantInfo}
                  />
                </>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
