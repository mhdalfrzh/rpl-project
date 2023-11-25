import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import Navbar from "../other/Navbar";
import Footer from "../other/Footer";
import { LogoIPB } from "../Logo";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo1 } = userSignin;
  if (!userInfo1) {
    props.history.push("/signin");
  }
  const cart = useSelector((state) => state.cart);
  const { shippingAddress1 } = cart;
  const [fullName, setFullName] = useState(shippingAddress1.fullName);
  const [address, setAddress] = useState(shippingAddress1.address);
  const [city, setCity] = useState(shippingAddress1.city);
  const [postalCode, setPostalCode] = useState(shippingAddress1.postalCode);
  const [noHandphone, setNoHandPhone] = useState(shippingAddress1.noHandphone);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, noHandphone })
    );
    props.history.push("/payment");
  };

  return (
    <>
      <Navbar />
      <LogoIPB />
      <div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <form className="form" onSubmit={submitHandler}>
          <div className="shipAddress">
            <h1 className="shipTitle">Alamat Pengiriman</h1>
            <div className="shipAddressBox">
              <div className="shipInput">
                <h1>Nama Lengkap</h1>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                ></input>
              </div>
              <div className="shipInput">
                <h1>No. Handphonee</h1>
                <input
                  type="text"
                  id="noHandphone"
                  placeholder="No. Handphone"
                  value={noHandphone}
                  onChange={(e) => setNoHandPhone(e.target.value)}
                  required
                ></input>
              </div>
              <div className="shipInput">
                <h1>Alamat</h1>
                <input
                  type="text"
                  id="address"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></input>
              </div>
              <div className="shipInput">
                <h1>Kota</h1>
                <input
                  type="text"
                  id="city"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                ></input>
              </div>
              <div className="shipInput">
                <h1>Kode Pos</h1>
                <input
                  type="text"
                  id="postalCode"
                  placeholder="Enter postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                ></input>
              </div>
            </div>

            <button className="shipBtn" type="submit">
              <h1>Lanjut</h1>
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
