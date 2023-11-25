import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Navbar from "../other/Navbar";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}`);
  };

  return (
    <>
      <Navbar />
      <div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="row center">
            <div className="col-2">
              <div className="card card-body">
                <div className="row start">
                  <div className="row center">
                    <img
                      className="large"
                      src={product.image}
                      alt={product.name}
                    ></img>
                  </div>
                  <div className="row center">
                    <ul>
                      <li>
                        <h1>{product.name}</h1>
                      </li>
                      <li>Harga: Rp{product.price}</li>
                      <li>
                        Deskripsi:
                        <p>{product.description}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    Penjual{" "}
                    <h2>
                      <Link to={`/seller/${product.seller._id}`}>
                        {product.seller.name}
                      </Link>
                    </h2>
                  </li>
                  <li>
                    <div className="row">
                      <div>Harga</div>
                      <div className="price">Rp{product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">Tersedia</span>
                        ) : (
                          <span className="danger">Terjual</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Tambahkan ke Keranjang
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
