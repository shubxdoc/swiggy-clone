import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { removeUserData } from "../store/authSlice";
import { signOut } from "firebase/auth";
import { useEffect } from "react";

const Profile = () => {
  const { userData } = useSelector((state) => state.authSlice);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  async function handleSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUserData());
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <>
      <section className="relative pb-24 pt-36">
        <img
          src="https://pagedone.io/asset/uploads/1705471739.png"
          alt="cover-image"
          className="absolute top-0 left-0 z-0 object-cover w-full h-60"
        />
        <div className="w-full px-6 mx-auto max-w-7xl md:px-8">
          <div className="flex items-center justify-center relative z-[1] mb-2.5">
            <img
              src={
                userData?.photo ||
                `https://global.discourse-cdn.com/turtlehead/optimized/2X/c/c830d1dee245de3c851f0f88b6c57c83c69f3ace_2_250x250.png`
              }
              alt="user-avatar-image"
              className="object-cover border-4 border-white border-solid rounded-full size-40"
            />
          </div>
          <h3 className="mb-3 text-3xl font-bold leading-10 text-center text-gray-900 capitalize font-manrope">
            {userData?.name || "NA"}
          </h3>
          <div className="mt-10 text-center">
            <button
              onClick={handleSignOut}
              className="px-4 py-2 ml-2 text-sm text-center text-white transition-all border border-transparent rounded-md shadow-md bg-slate-800 hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
