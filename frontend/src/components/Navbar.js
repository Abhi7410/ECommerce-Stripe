import React from "react";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

function NavbarComponent() {
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    // Implement your logout logic, e.g., clearing local storage and updating user state
    setUser(null);
    localStorage.removeItem("authToken");
  };
  console.log(user);
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Ecommerce-Stripe</Link>
      </div>
      <ul>
        {user ? (
          <>
            {user.userType === "1" && (
              <>
                <li>
                  <Link to="/store">
                    <FaShoppingCart />
                    Store
                  </Link>
                </li>
                <li>
                  <Link to="/cart">
                    <HiShoppingBag />
                    Cart
                  </Link>
                </li>
              </>
            )}
            {user.userType === "2" && (
              // Seller-specific links
              <li>
                <Link to="/add-product">
                  <FaUser />
                  Add Product
                </Link>
              </li>
            )}
            <li>
              <Link to="/logout" onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </Link>
            </li>
          </>
        ) : (
          // If the user is not authenticated (logged out)
          <>
            <li>
              <Link to="/register">
                <FaSignInAlt />
                Register
              </Link>
            </li>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default NavbarComponent;
