import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlice.js";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-orange-500">
          🍳 CloudKitchen
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/kitchens" className="text-gray-700 hover:text-orange-500">
            Kitchens
          </Link>

          {user ? (
            <>
              <Link
                to="/my-orders"
                className="text-gray-700 hover:text-orange-500"
              >
                My Orders
              </Link>
              <Link
                to="/cart"
                className="text-gray-700 hover:text-orange-500 relative"
              >
                🛒
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-orange-500"
              >
                Profile
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-orange-600 font-medium hover:text-orange-700"
                >
                  Admin
                </Link>
              )}
              <span className="text-sm text-gray-500">Hi, {user.username}</span>
              <button
                onClick={() => dispatch(logout())}
                className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-orange-500">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-orange-600"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
