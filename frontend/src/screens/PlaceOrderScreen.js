import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Navbar from "../other/Navbar";
import Footer from "../other/Footer";
import { LogoIPB } from "../Logo";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = toPrice(
    cart.cartItems1.reduce((a, c) => a + c.qty + c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems1 }));
  };

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);

  return (
    <>
      <Navbar />
      <LogoIPB />
      <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="orderMain">
          <div className="orderLeft">
            <h1>Place Order</h1>
            <div className="orderBox">
              <div className="orderLeftPart">
                <h4>Pengiriman</h4>
                <p>
                  <div className="orderData">
                    <div className="orderDataKey">Nama</div>
                    <div className="orderDataValue">
                      :{cart.shippingAddress1.fullName}
                    </div>
                  </div>
                  <div className="orderData">
                    <div className="orderDataKey">No. Handphone</div>{" "}
                    <div className="orderDataValue">
                      :{cart.shippingAddress1.noHandphone}{" "}
                    </div>
                  </div>
                  <div className="orderData">
                    <div className="orderDataKey">Alamat</div>{" "}
                    <div className="orderDataValue">
                      :{cart.shippingAddress1.address},
                      {cart.shippingAddress1.city},{" "}
                      {cart.shippingAddress1.postalCode},
                    </div>
                  </div>
                </p>
              </div>

              <div className="orderLeftPart">
                <h4>Pembayaran</h4>
                <p>
                  {" "}
                  <div className="orderData">
                    <div className="orderDataKey">Metode</div>{" "}
                    <div className="orderDataValue">:{cart.paymentMethod}</div>
                  </div>
                </p>
              </div>

              <div className="orderLeftPart">
                <h4>Pesanan</h4>

                {cart.cartItems1.map((item) => (
                  <div key={item.product} className="orderPesanan">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="orderImg"
                    ></img>
                    <div className="detailPesanan">
                      <p>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </p>
                      <h1>Rp {item.qty * item.price}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="orderRight">
            <div className="orderBox rightBox">
              <div className="orderRightPart">
                <h4>Ringkasan Pesanan</h4>
                <p>
                  <div className="orderData2">
                    <div className="orderDataKey">Total Harga</div>
                    <div className="orderDataValue2">
                      Rp{cart.itemsPrice.toFixed(2)}
                    </div>
                  </div>
                </p>

                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
              </div>
            </div>
            <button
              type="button"
              onClick={placeOrderHandler}
              className="orderBtn"
              disabled={cart.cartItems1.length === 0}
            >
              <h1>Buat Pesanan</h1>
            </button>
          </div>
        </div>
      </div>
      <Footer margin={"100px"} />
    </>
  );
}
