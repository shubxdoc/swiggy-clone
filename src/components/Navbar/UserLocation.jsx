import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setCoordinates } from "../../store/coordinateSlice.js";

const UserLocation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("searchLocation")) || ""
  );

  const dispatch = useDispatch();

  function handleClose() {
    setIsOpen(false);
    setSearchResult([]);
  }

  useEffect(() => {
    localStorage.setItem("searchLocation", JSON.stringify(address));
  }, [address]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  async function handleSearchResult(val) {
    if (val.trim() === "") return;

    const res = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/place-autocomplete?input=${val}`
    );
    const result = await res.json();
    setSearchResult(result.data);
  }

  async function fetchLatAndLng(id) {
    if (id.trim() === "") return;

    const res = await fetch(
      `https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/misc/address-recommend?place_id=${id}`
    );
    const result = await res.json();
    const { lat, lng } = result.data[0]?.geometry?.location;

    console.log(lat, lng);

    dispatch(
      setCoordinates({
        lat: lat,
        lng: lng,
      })
    );
    setAddress(result.data[0]?.formatted_address);
    handleClose();
  }

  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 cursor-pointer group hover"
      >
        <span className="text-sm font-semibold border-b-2 border-black group-hover:border-swiggyOrange group-hover:text-swiggyOrange">
          other
        </span>
        <span className="text-sm text-gray-500 line-clamp-1 max-w-52">
          {address}
        </span>
        <span className="group-hover:text-swiggyOrange">
          <MdKeyboardArrowDown />
        </span>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "left-0" : "-left-full"
        } fixed top-0 h-full max-w-7xl bg-white z-40 transition-all duration-300`}
      >
        <div className="xl:w-[40vw] w-full py-4 pr-10 pl-20 xl:pl-52">
          <button onClick={() => setIsOpen(false)} className="my-4">
            <IoMdClose size={"1.5em"} />
          </button>
          <input
            type="text"
            onChange={(e) => handleSearchResult(e.target.value)}
            placeholder="Search for area, street name..."
            className="w-full px-3 py-4 border shadow-lg outline-none"
          />
          <div className="mt-8">
            <ul>
              {searchResult.map((item) => (
                <li
                  onClick={() => fetchLatAndLng(item.place_id)}
                  className="flex gap-3 px-2 border-b border-gray-300 border-dashed cursor-pointer py-7"
                >
                  <div className="mt-1">
                    <CiLocationOn />
                  </div>
                  <div>
                    <span className="flex items-center space-x-2">
                      {item.structured_formatting.main_text}
                    </span>
                    <span className="text-xs text-gray-500">
                      {item.structured_formatting.secondary_text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-30 overflow-hidden transition-all duration-300 bg-black/30"
        ></div>
      )}
    </>
  );
};

export default UserLocation;
