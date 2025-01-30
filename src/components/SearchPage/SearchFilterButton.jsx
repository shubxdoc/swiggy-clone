const SearchFilterButton = ({ btnText, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-3 font-semibold rounded-3xl text-sm border shadow-md flex items-center justify-between gap-3 ${
        isSelected ? "bg-gray-700 text-white" : "bg-transparent text-gray-700"
      }`}
    >
      {btnText}
    </button>
  );
};

export default SearchFilterButton;
