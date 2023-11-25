import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import Navbar from "../other/Navbar";
import Footer from "../other/Footer";
import "../css/cart.css";
import { LogoIPB } from "../Logo";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo1 } = userSignin;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailsOrder(orderId));
    }
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    }
  }, [dispatch, orderId, successPay, successDeliver, order]);

  const paymentHandler = () => {
    dispatch(payOrder(order._id));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      <Navbar />
      <LogoIPB />
      <div>
        <div className="orderMain">
          <div className="orderLeft">
            <h1>Order {order._id}</h1>
            <div className="orderBox">
              <div className="orderLeftPart">
                <h4>Pengiriman</h4>
                <p>
                  <div className="orderData">
                    <div className="orderDataKey">Nama</div>
                    <div className="orderDataValue">
                      :{order.shippingAddress1.fullName}
                    </div>
                  </div>
                  <div className="orderData">
                    <div className="orderDataKey">No. Handphone</div>{" "}
                    <div className="orderDataValue">
                      :{order.shippingAddress1.noHandphone}{" "}
                    </div>
                  </div>
                  <div className="orderData">
                    <div className="orderDataKey">Alamat</div>{" "}
                    <div className="orderDataValue">
                      :{order.shippingAddress1.address},
                      {order.shippingAddress1.city},{" "}
                      {order.shippingAddress1.postalCode},
                    </div>
                  </div>
                </p>
                {order.isDelivered ? (
                  <div className="orderAlert alertSuccess">
                    <p>Dikirim pada {order.deliveredAt}</p>
                  </div>
                ) : (
                  <div className="orderAlert alertFail">
                    <p>Belum Dikirim</p>
                  </div>
                )}
              </div>

              <div className="orderLeftPart">
                <h4>Pembayaran</h4>
                <p>
                  {" "}
                  <div className="orderData">
                    <div className="orderDataKey">Metode</div>{" "}
                    <div className="orderDataValue">:{order.paymentMethod}</div>
                  </div>
                </p>
                {order.isPaid ? (
                  <div className="orderAlert alertSuccess2">
                    <p>Dibayar pada {order.paidAt}</p>
                  </div>
                ) : (
                  <div className="orderAlert alertFail2">
                    <p> Belum Bayar</p>
                  </div>
                )}
              </div>

              <div className="orderLeftPart">
                <h4>Pesanan</h4>

                {order.orderItems.map((item) => (
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
                      Rp{order.itemsPrice.toFixed(2)}
                    </div>
                  </div>
                </p>

                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
              </div>
            </div>
            {userInfo1.isAdmin && !order.isPaid && (
              <div>
                {loadingPay && <LoadingBox></LoadingBox>}
                {errorPay && (
                  <MessageBox variant="danger">{errorPay}</MessageBox>
                )}
                <button
                  type="button"
                  onClick={paymentHandler}
                  className="orderBtn"
                >
                  <h1>Bayar Pesanan</h1>
                </button>
              </div>
            )}
            {userInfo1.isAdmin && order.isPaid && !order.isDelivered && (
              <div>
                {loadingDeliver && <LoadingBox></LoadingBox>}
                {errorDeliver && (
                  <MessageBox variant="danger">{errorDeliver}</MessageBox>
                )}
                <button
                  type="button"
                  className="orderBtn"
                  onClick={deliverHandler}
                >
                  <h1>Kirim Pesanan</h1>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer margin={"100px"} />
    </>
  );
}
