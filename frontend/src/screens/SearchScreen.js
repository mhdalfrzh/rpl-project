import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/product";
import Category from "../components/Category";
import Navbar from "../other/Navbar";
import Footer from "../other/Footer";
import Items from "../other/HomeItems";
import { LogoIPB2 } from "../Logo";

export default function SearchScreen(props) {
  const { name = "all", category = "all" } = useParams();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    //categories,
  } = productCategoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
      })
    );
  }, [category, dispatch, name]);
  console.log(products);
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
          <>
            {products.length === 0 && (
              <MessageBox>Produk Tidak Ditemukan</MessageBox>
            )}
            <h1 className="searchTitle">Hasil Pencarian Untuk "{name}"</h1>
            <Items data={products} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
