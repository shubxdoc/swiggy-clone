import { TbTrash } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  selectTotalPrice,
} from "../store/cartSlice.js";

const Cart = () => {
  const { cartData, resInfo } = useSelector((state) => state.cartSlice);

  const dispatch = useDispatch();

  const totalPrice = useSelector(selectTotalPrice);

  if (cartData.length == 0) {
    return (
      <div className="w-screen h-[70vh] flex items-center justify-center flex-col gap-3 text-gray-500">
        <div>
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0"
            alt=""
          />
        </div>
        <p>Your cart is empty </p>
      </div>
    );
  }

  console.log(cartData);

  return (
    <div className="container max-w-5xl px-2 mx-auto mt-10 ">
      <div className="flex gap-5 mb-10">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/${resInfo.cloudinaryImageId}`}
          alt=""
          className="object-cover rounded-xl size-52"
        />
        <span>
          <h1 className="text-xl font-medium capitalize">{resInfo.name}</h1>
          <p className="text-sm text-slate-500">{resInfo.locality}</p>
        </span>
      </div>

      {cartData.map((item) => (
        <div className="flex gap-4 mb-5">
          <img
            src={
              item.itemAttribute.vegClassifier == "VEG"
                ? "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png"
                : "https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"
            }
            alt=""
            width={16}
            height={16}
            className="self-start mt-1"
          />
          <span>
            <p>{item.name}</p>
            <p className="text-gray-500">
              ₹{(item.defaultPrice || item.price) / 100}
            </p>
          </span>
          <button
            className="self-start mt-1 transition duration-200 hover:text-red-400"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            <TbTrash />
          </button>
        </div>
      ))}

      <p className="w-full py-3 my-5 text-gray-600 border-t">
        Total Price : ₹{totalPrice / 100}
      </p>

      <button
        onClick={() => dispatch(clearCart())}
        className="p-2 my-5 text-white transition duration-200 bg-blue-400 border rounded-md outline-none hover:bg-blue-500"
      >
        CLEAR CART
      </button>
    </div>
  );
};

export default Cart;
