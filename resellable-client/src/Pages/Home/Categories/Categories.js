import React, { useEffect, useState } from "react";
import CategoriesItem from "./CategoriesItem";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://reseller-red.vercel.app/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="lg:px-56 bg-base-200 pb-10">
      <h1 className="text-3xl text-center font-bold py-10">Categories</h1>

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-10">
          {categories.map((category) => (
            <CategoriesItem
              category={category}
              key={category._id}
            ></CategoriesItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
