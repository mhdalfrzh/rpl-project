import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { product } = props;
  console.log(product);
  return (
    <div className="card-homescreen">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <div className="row">
          <div className="price">Rp{product.price}</div>
          <div>
            <Link to={`/seller/${product.seller._id}`}>
              {product.seller.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
