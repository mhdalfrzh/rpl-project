import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import Navbar from "../other/Navbar";
import "../css/cart.css";
import Footer from "../other/Footer";
import { LogoIPB, Trash } from "../Logo";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems1, error } = cart;
  const dispatch = useDispatch();
  console.log(props);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <>
      <Navbar />
      <LogoIPB />
      <div>
        <div>
          <h1 className="cartTitle">Keranjang Saya</h1>
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          {cartItems1.length === 0 ? (
            <div className="emptyCart">
              {" "}
              Wah, keranjang belanjamu masih kosong.{" "}
              <Link to="/">Belanja Sekarang</Link>
            </div>
          ) : (
            <div className="cartItems">
              {cartItems1.map((item) => (
                <div key={item.product} className="cartItem">
                  <img src={item.image} alt={item.name} className="small"></img>
                  <div className="cartItemDetail">
                    <div className="min-30">
                      <Link to={`/product/${item.product}`}>
                        <p>{item.name}</p>
                      </Link>
                    </div>
                    <h1>Rp{item.price}</h1>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                      className="hapusCartBtn"
                    >
                      <Trash />
                      <h4>Hapus</h4>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="cartTitle">Ringkasan Pesanan</h1>
          <div className="totalBelanja">
            <p>Subtotal : </p>
            <p>Rp{cartItems1.reduce((a, c) => c.price, 0).toLocaleString()}</p>
          </div>
          <button
            type="button"
            onClick={checkoutHandler}
            disabled={cartItems1.length === 0}
            className="checkoutBtn"
          >
            <h1>Checkout</h1>
          </button>
        </div>
      </div>
      <Footer margin={"375px"} />
    </>
  );
}
