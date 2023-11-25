import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../other/Navbar";
import Footer from "../other/Footer";
import { LogoIPB } from "../Logo";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress1 } = cart;
  if (!shippingAddress1.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("transfer");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <>
      <Navbar />
      <LogoIPB />
      <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <h1 className="payTitle">Metode Pembayaran</h1>
        <form className="form" onSubmit={submitHandler} className="payMeth">
          <div className="payMethBox">
            <div
              className="payMethOne"
              onClick={() => {
                document.getElementById("transfer").click();
              }}
            >
              <input
                type="radio"
                id="transfer"
                className="payMethDot"
                value="Transfer"
                name="paymentMethod"
                required
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="transfer">
                <p>Transfer</p>
              </label>
            </div>
            <div
              className="payMethOne"
              onClick={() => {
                document.getElementById("cod").click();
              }}
            >
              <input
                type="radio"
                id="cod"
                className="payMethDot"
                value="COD"
                name="paymentMethod"
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></input>
              <label htmlFor="cod">
                <p> COD</p>
              </label>
            </div>
          </div>

          <button className="shipBtn" type="submit">
            <h1>Lanjut</h1>
          </button>
        </form>
      </div>
      <Footer margin={"300px"} />
    </>
  );
}
