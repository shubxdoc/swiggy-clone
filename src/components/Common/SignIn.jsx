import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../firebase/config";
import { addUserData } from "../../store/authSlice";

const SignIn = ({ setIsOpen }) => {
  const dispatch = useDispatch();

  async function handleGoogleAuth() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          name: user.displayName,
          photo: user.photoURL,
        };
        dispatch(addUserData(userData));
        setIsOpen(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorMessage);
      });
  }

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={handleGoogleAuth}
        className="flex gap-2 px-4 py-2 transition duration-150 border rounded-lg border-slate-200 text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow"
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default SignIn;
