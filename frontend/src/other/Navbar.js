import { Link, Route } from "react-router-dom";
import SearchBar from "./SearchBar";
import { signout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { LogoScraptifyWhite, LogoSearch, DropDown, Cart } from "../Logo";
import "../css/home.css";
import { useState } from "react";

const Navbar = ({ setSidebarIsOpen }) => {
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems1 } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo1 } = userSignin;
  const [showMenu1, setShowMenu1] = useState(false);
  const [showMenu2, setShowMenu2] = useState(false);
  const [showMenu3, setShowMenu3] = useState(false);
  return (
    <>
      <div className="navbar">
        <div>
          <Link to="/">
            <LogoScraptifyWhite />
          </Link>
        </div>

        <SearchBar />
        <Link to="/cart">
          <Cart />
        </Link>

        <div className="jualan">
          <div
            className="jualBtn"
            onClick={() => {
              setShowMenu1(!showMenu1);
              if (!userInfo1.isAdmin) {
                setShowMenu3(!showMenu3);
              }
            }}
          >
            <p
              style={{
                color: "white",
                marginRight: "9px",
                fontSize: "20px",
              }}
            >
              Penjualan
            </p>
            <DropDown />
          </div>
        </div>

        <div>
          {userInfo1 ? (
            <img
              className="proPic"
              src={"/images/img1.png"}
              alt={userInfo1.name}
              onClick={() => {
                setShowMenu2(!showMenu2);
              }}
            ></img>
          ) : (
            <Link to="/signin">
              <a href="" id="loginLink">
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
      {userInfo1 && userInfo1.isAdmin && showMenu1 && (
        <div className="dropMenu">
          <div className="moreMenu">
            <Link to="/productlist">Products</Link>
          </div>
          <div className="moreMenu">
            <Link to="/orderlist">Orders</Link>
          </div>
          <div className="moreMenu">
            <Link to="/userlist">Users</Link>
          </div>
        </div>
      )}
      {userInfo1 && showMenu2 && (
        <div className="dropMenu2">
          <div className="moreMenu">
            <Link to="/profile">User Profile</Link>
          </div>
          <div className="moreMenu">
            <Link to="/orderhistory">Order History</Link>
          </div>
          <div className="moreMenu">
            <Link to="#signout" onClick={signoutHandler}>
              Sign Out
            </Link>
          </div>
        </div>
      )}
      {userInfo1 && userInfo1.isSeller && !userInfo1.isAdmin && showMenu3 && (
        <div className="dropMenu">
          <div className="moreMenu">
            <Link to="/productlist/seller">Produk</Link>
          </div>
          <div className="moreMenu">
            <Link to="/orderlist/seller">Order</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
