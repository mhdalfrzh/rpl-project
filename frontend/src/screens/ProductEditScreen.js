import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import Navbar from "../other/Navbar";
import Footer from "../other/Footer";
import "../css/jual.css";

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo1 } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo1.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="jualMenu">
            <h1 id="jualMenuTitle">Tambahkan Barang Yang Ingin Dijual</h1>

            <div className="row top">
              <form className="jualBox" onSubmit={submitHandler}>
                <div className="jualBoxLeft">
                  <label htmlFor="imageFile">
                    {" "}
                    <img
                      className="inputImg"
                      src={product.image}
                      alt={product.name}
                    ></img>
                  </label>
                </div>
                <div className="jualBoxRight">
                  <div>
                    <h1>Nama Barang</h1>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <h1>Harga</h1>
                    <input
                      id="price"
                      type="text"
                      placeholder="Enter price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></input>
                  </div>

                  <div style={{ display: "none" }}>
                    <h1>File gambar</h1>
                    <input
                      type="file"
                      id="imageFile"
                      label="Choose Image"
                      onChange={uploadFileHandler}
                    ></input>
                    {loadingUpload && <LoadingBox></LoadingBox>}
                    {errorUpload && (
                      <MessageBox variant="danger">{errorUpload}</MessageBox>
                    )}
                  </div>
                  <div>
                    <h1>Kategori</h1>
                    <select
                      id="category"
                      type="option"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Pilih Kategori</option>
                      <option>Buku & Alat Tulis</option>
                      <option>Komputer & Aksesoris</option>
                      <option>Baju & Celana</option>
                      <option>Sepatu & Sandal</option>
                      <option>Kebutuhan Kampus</option>
                      <option>Olahrga & Outdoor</option>
                      <option>Tas</option>
                      <option>Elektronik</option>
                      <option>Handphone & Aksesoris</option>
                      <option>Jam Tangan</option>
                      <option>Kesehatan</option>
                      <option>Perlengkapan Rumah</option>
                      <option>Otomotif</option>
                      <option>Souvenir & Pesta</option>
                      <option>Kebutuhan Kos</option>
                      <option>Alat-Alat Musik</option>
                      <option>Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <h1>Deskripsi</h1>
                    <textarea
                      id="description"
                      rows="3"
                      type="text"
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button className="posting" type="submit">
                    Posting
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer margin={"100px"} />
    </>
  );
}
