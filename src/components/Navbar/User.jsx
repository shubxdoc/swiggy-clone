import { useEffect, useState } from "react";
import { Navlinks } from "./Navbar";
import { useSelector } from "react-redux";
import { MdOutlinePermIdentity } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { SignIn } from "../Common";

const User = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { userData } = useSelector((state) => state.authSlice);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <>
      {userData ? (
        <Navlinks
          text={userData.name.slice(0, 7) + "..." || userData.name}
          Icon={FaRegUser}
          routeLink={"/profile"}
        />
      ) : (
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <Navlinks text={"Sign In"} Icon={MdOutlinePermIdentity} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "right-0" : "-right-full"
        } fixed top-0 h-full w-full lg:w-[40vw] max-w-7xl bg-white z-40 transition-all duration-300`}
      >
        <div className="mt-8 ml-8 lg:ml-10 w-[90%] lg:w-[50%] ">
          <button
            onClick={() => setIsOpen(false)}
            className="my-4 text-slate-400"
          >
            <IoMdClose size={"1.5em"} />
          </button>
          <div className="flex items-center justify-between pb-8 border-b">
            <h1 className="text-3xl">Login</h1>
            <span className="size-20">
              <img
                src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r"
                alt=""
              />
            </span>
          </div>
          <div className="mt-10">
            <SignIn setIsOpen={setIsOpen} />
            <p className="mt-10 text-[10px] text-slate-400">
              By clicking on Login, I accept the Terms & Conditions & Privacy
              Policy
            </p>
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

export default User;
