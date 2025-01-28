import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import Home from "./pages/Home";
import RestaurantMenu from "./pages/RestaurantsMenu";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu/:id" element={<RestaurantMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
