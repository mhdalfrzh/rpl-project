import data from "./dataKategori";
import { useState } from "react";

const HomeHeader = ({ filter, cari, cat, nofilter }) => {
  const [lainnya, setLainnya] = useState(false);
  const [catText, setCatText] = useState("");

  return (
    <div className="homeHeader">
      <HeaderBanner />
      <HeaderCategories
        filter={filter}
        catText={catText}
        setCatText={setCatText}
        lainnya={lainnya}
        setLainnya={setLainnya}
        nofilter={nofilter}
      />
      {lainnya && (
        <MoreCategories
          filter={filter}
          catText={catText}
          setCatText={setCatText}
        />
      )}
    </div>
  );
};

const HeaderBanner = () => {
  return (
    <div className="headerBanner">
      <div className="bannerText">
        <p>Beli, Jual, dan Temukan </p>
        <p className="btp2">Barang Bekas yang Kamu Cari</p>
      </div>
    </div>
  );
};
const HeaderCategories = ({
  filter,
  lainnya,
  setLainnya,
  nofilter,
  catText,
  setCatText,
}) => {
  return (
    <div className="headerCat">
      <p className="catTitle">Kategori</p>
      <div className="catCategories">
        {data.map((cat) => {
          return (
            <div
              className="catCategory"
              onClick={(e) => {
                var kliked;
                if (e.target.classList.contains("clicked")) kliked = true;
                let arr = Array.from(e.target.parentElement.childNodes);
                arr.map((btn) => {
                  btn.classList.remove("clicked");
                });

                if (cat.nama != "Lainnya") {
                  filter(cat.nama);
                  setCatText(cat.nama);
                } else setLainnya(!lainnya);

                if (!kliked) {
                  e.target.classList.add("clicked");
                } else {
                  setCatText("");
                  nofilter();
                }
              }}
            >
              <div
                className="catPicDiv"
                onClick={(e) => {
                  var kliked;
                  var catCategory =
                    e.target.parentElement.parentElement.parentElement;

                  if (catCategory.classList.contains("clicked")) kliked = true;
                  let arr = Array.from(catCategory.parentElement.childNodes);
                  arr.map((btn) => {
                    btn.classList.remove("clicked");
                  });

                  if (!kliked) {
                    catCategory.classList.add("clicked");
                  }
                }}
              >
                {cat.img}
              </div>
              <p>{cat.nama}</p>
            </div>
          );
        })}
      </div>
      {catText && <h1>Hasil pencarian kategori "{catText}"</h1>}
    </div>
  );
};

const MoreCategories = ({ filter, catText, setCatText }) => {
  return (
    <div className="moreCats">
      <div
        className="moreCat"
        onClick={(e) => {
          filter(e.target.textContent);
          setCatText(e.target.textContent);
        }}
      >
        Elektronik
      </div>
      <div
        className="moreCat"
        onClick={(e) => {
          filter(e.target.textContent);
          setCatText(e.target.textContent);
        }}
      >
        Handphone & Aksesoris
      </div>
      <div
        className="moreCat"
        onClick={(e) => {
          filter(e.target.textContent);
          setCatText(e.target.textContent);
        }}
      >
        Jam Tangan
      </div>
      <div
        className="moreCat"
        onClick={(e) => {
          filter(e.target.textContent);
          setCatText(e.target.textContent);
        }}
      >
        Kesehatan
      </div>
      <div
        className="moreCat"
        onClick={(e) => {
          filter(e.target.textContent);
          setCatText(e.target.textContent);
        }}
      >
        Perlengkapan Rumah
      </div>
      <div
        className="moreCat"
        onClick={(e) => {
          filter(e.target.textContent);
          setCatText(e.target.textContent);
        }}
      >
        Otomotif
      </div>
      <div
        className="moreCat"
        onClick={(e) => {
          filter(e.target.textContent);
          setCatText(e.target.textContent);
        }}
      >
        Souvernir & Pesta
      </div>
      <div
        className="moreCat"
        onClick={(e) => {
          filter(e.target.textContent);
          setCatText(e.target.textContent);
        }}
      >
        Kebutuhan Kos
      </div>
      <div
        className="moreCat"
        onClick={(e) => {
          filter(e.target.textContent);
          setCatText(e.target.textContent);
        }}
      >
        Alat-Alat Musik
      </div>
      <div
        className="moreCat"
        onClick={(e) => {
          filter(e.target.textContent);
          setCatText(e.target.textContent);
        }}
      >
        Lainnya
      </div>
    </div>
  );
};

export default HomeHeader;
