import React from "react";
import { Link } from "react-router-dom";
import './BannerItem.css';

const BannerItem = ({ item }) => {
  const {id, title, description, image, next, prev } = item;
  console.log(item);
  return (
    <div
      id={`slide${id}`}
      className="carousel-item relative w-full"
      data-theme="emerald"
    >
      <div className="carousel-img">
        <img src={image} alt="" className="w-full" />
      </div>
      <div className="absolute flex flex-col justify-end transform -translate-y-1/2 left-24 top-1/2">
        <h1 className="text-6xl font-bold text-white mb-5">{title}</h1>
        <p className="text-xl text-white w-96 mt-4">{description}</p>
        <div className="my-5">
          <Link to="/categories">
            <button className="btn bg-white border-0 text-black hover:bg-orange-400 hover:text-white mr-5">
              Explore Our Bikes
            </button>
          </Link>
          <Link to="/blogs">
            <button className="btn bg-white border-0 text-black hover:bg-orange-400 hover:text-white">
              Read Our Blogs
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
        <a href={`#slide${prev}`} className="btn btn-circle bg-white border-0 text-black hover:bg-orange-400 hover:text-white mr-5">
          ❮
        </a>
        <a href={`#slide${next}`} className="btn btn-circle bg-white border-0 text-black hover:bg-orange-400 hover:text-white">
          ❯
        </a>
      </div>
    </div>
  );
};

export default BannerItem;
