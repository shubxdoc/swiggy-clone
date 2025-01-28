import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setFilterValue } from "../../store/filterSlice";

const FilterButton = ({ btnText }) => {
  const [isSelected, setIsSelected] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    setIsSelected((prev) => !prev);

    if (isSelected) {
      dispatch(setFilterValue(null));
    } else {
      dispatch(setFilterValue(btnText));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`py-2 px-3 font-semibold hover:bg-gray-50 text-gray-700 rounded-3xl text-sm border shadow-md flex items-center justify-between gap-3 ${
        isSelected ? "border-black" : "border-gray-200"
      }`}
    >
      {btnText}{" "}
      {isSelected && (
        <span>
          <RxCross2 style={{ strokeWidth: 0.5, stroke: "black" }} />
        </span>
      )}
    </button>
  );
};

export default FilterButton;
