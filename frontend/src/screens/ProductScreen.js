import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Navbar from "../other/Navbar";
import "../css/item.css";
import { WhatsApp, Cart, LogoIPB2 } from "../Logo";
import Footer from "../other/Footer";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  console.log(props);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}`);
  };

  return (
    <>
      <Navbar />
      <LogoIPB2 />
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="detailBox">
            <h1 className="detailTitle">Detail Barang</h1>
            <div className="detailItem">
              <div className="part partPhoto">
                <div className="part1part">
                  <img src={product.image} className="mainPic" alt="" />
                </div>
              </div>
              <div className="part partDesc">
                <div className="part2part itemName">
                  <h1>{product.name}</h1>
                </div>
                <div className="part2part itemDescr">
                  <div className="deskripsiDiv">
                    <h4>Deskripsi</h4>
                  </div>
                  <p>{product.description}</p>
                </div>
              </div>
              <div className="part partSeller">
                <h4>Profil Penjual</h4>
                <div className="profil">
                  <div className="pp">
                    <img src={product.seller.image} alt="" />
                  </div>
                  <div className="div">
                    <p>{product.seller.name}</p>
                    <button className="iconWA">
                      <WhatsApp />
                      <p>Hubungi Penjual</p>
                    </button>
                  </div>
                </div>
              </div>
              <div className="part partPrice">
                <div className="deskripsiDiv2">
                  <h4>Harga</h4>
                </div>
                <p>Rp {product.price}</p>
                <div className="addToCart" onClick={addToCartHandler}>
                  <Cart />
                  <h4>Tambahkan Ke Keranjang</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer margin={"500px"} />
    </>
  );
}
