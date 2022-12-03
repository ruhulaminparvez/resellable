import React from "react";
import { Link } from "react-router-dom";

const CategoriesItem = ({ category }) => {
  const { categoryName } = category;

  const catName = categoryName.toLowerCase();

  const [categoryProducts, setCategoryProducts] = React.useState([]);


  React.useEffect(() => {
    fetch(`https://reseller-red.vercel.app/products/category/${catName}`)
      .then((res) => res.json())
      .then((data) => setCategoryProducts(data));
  }, [catName]);

  return (
    <div className="card bg-base-100 shadow-xl">
      <Link to={`/products/category/${catName}`}>
        <div className="card-body flex justify-center items-center hover:bg-orange-400 hover:text-white hover:rounded-lg">
          <h2 className="text-center text-3xl font-bold">{categoryName}</h2>
        </div>
      </Link>
    </div>
  );
};

export default CategoriesItem;
