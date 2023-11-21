import { FaSignInAlt, FaSignOutAlt, FaUser , FaShoppingCart} from "react-icons/fa";
import { Link } from "react-router-dom";

function NavbarComponent() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Ecommerce-Stripe</Link>
      </div>
      <ul>
        <li>
          <Link to="/cart">
            <FaShoppingCart />
            Cart
          </Link>
        </li>
        <li>
          <Link to="/">
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
      </ul>
    </header>
  );
}

export default NavbarComponent;
