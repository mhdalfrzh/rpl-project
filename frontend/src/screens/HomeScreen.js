import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../components/product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";
import { Link } from "react-router-dom";
import Category from "../components/Category";
import Navbar from "../other/Navbar";
import "../css/home.css";
import Footer from "../other/Footer";
import Header from "../other/HomeHeader";
import Items from "../other/HomeItems";
import PageNums from "../other/ItemPageNums";
import { HiasanHome, HiasanHome2 } from "../Hiasan";
import { LogoIPB2 } from "../Logo";

export default function HomeScreen() {
  const [data, setData] = useState({});
  const [all, setAll] = useState({});
  useEffect(() => {
    axios.get("/api/products").then((result) => {
      setData(result.data);
      setAll(result.data);
    });
  }, []);

  //fungsi kategori
  const barangs = Array.from(data);

  const [category, setCategory] = useState("");

  function filter(jenis) {
    const newBarangs = all.filter((barang) => {
      return barang.category === jenis;
    });
    setData(newBarangs);
    console.log(jenis);
  }
  function nofilter() {
    setData(Array.from(all));
    setCategory("");
  }

  //fungsi page
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);

  const indexLastPost = currentPage * postPerPage;
  const indexFirstPost = indexLastPost - postPerPage;

  const currentItems = barangs.slice(indexFirstPost, indexLastPost);
  return (
    <>
      <Navbar />
      <LogoIPB2 />
      <Header filter={filter} cat={category} nofilter={nofilter} />
      <Items data={currentItems} />
      <PageNums setCurrentPage={setCurrentPage} />
      <HiasanHome2 />

      <Footer margin={"-100px"} />
    </>
  );
}
