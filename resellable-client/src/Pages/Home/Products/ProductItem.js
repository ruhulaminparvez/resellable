import React, { useState, useContext } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const ProductItem = ({ product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [bookinError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  const { user } = useContext(AuthContext);

  const {
    _id,
    productName,
    image,
    location,
    color,
    description,
    condition,
    yearOfPurchase,
    engineCapacity,
    mileage,
    mobile,
    fuelType,
    user:sellerName,
  } = product;

  const onSubmit = (data) => {
    console.log(data);
    setBookingError("");

    fetch("https://reseller-red.vercel.app/addBooking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setBookingSuccess(data);
          toast.success("Booking Successfull");
        }
      });

    // clear form
    document.getElementById("bookingForm").reset();
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <PhotoProvider>
          <PhotoView src={image}>
            <img className="w-fit" src={image} alt="bikes" />
          </PhotoView>
        </PhotoProvider>
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {productName.toUpperCase()}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <div className="card-actions justify-start">
          <div className="badge badge-outline">
            <b>Location: {location}</b>
          </div>
          <div className="badge badge-outline">
            <b>Color: {color}</b>
          </div>
          <div className="badge badge-outline">
            <b>Condition: {condition}</b>
          </div>
          <div className="badge badge-outline">
            <b>Purchase Year: {yearOfPurchase}</b>
          </div>
          <div className="badge badge-outline">
            <b>Engine Capacity: {engineCapacity}</b>
          </div>
          <div className="badge badge-outline">
            <b>Mileage: {mileage}</b>
          </div>
          <div className="badge badge-outline">
            <b>Fuel Type: {fuelType}</b>
          </div>
        </div>
        <p>{description}</p>
        <label
          htmlFor="booking-modal"
          className="btn text-white border-0 hover:bg-orange-400 hover:text-white mt-3"
        >
          Book Now
        </label>

        <input type="checkbox" id="booking-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl relative">
            <label
              htmlFor="booking-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <h3 className="text-2xl text-center font-bold">
              {productName.toUpperCase()}
            </h3>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full"
              id="bookingForm"
            >
              <div className="flex flex-col justify-center items-center mt-5">
                <label htmlFor="productName" className="font-bold">
                  Product Name
                </label>
                <select
                  name="productName"
                  {...register("productName", {
                    required: "**ProductName is Required",
                  })}
                  id="productName"
                  className="input input-bordered w-full max-w-xs"
                >
                  <option defaultValue={productName} value={productName}>
                    {productName}
                  </option>
                </select>
                {errors.productName && (
                  <span className="text-red-500 text-sm">
                    {errors.productName.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col justify-center items-center mt-5">
                <label htmlFor="productId" className="font-bold">
                  ProductId
                </label>
                <select name="productId"
                  {...register("productId", {
                    required: "**ProductId is Required",
                  })}
                  id="productId"
                  className="input input-bordered w-full max-w-xs">
                    <option defaultValue={_id} value={_id}>
                    {_id}
                  </option>
                </select>
                {errors.productId && (
                  <span className="text-red-500 text-sm">
                    {errors.productId.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-2">
                <label htmlFor="mobile" className="font-bold">
                  Seller Mobile Number
                </label>
                <select
                  name="mobileSeller"
                  {...register("mobileSeller", {
                    required: "**Mobile Number Seller is Required",
                  })}
                  id="mobileSeller"
                  className="input input-bordered w-full max-w-xs"
                >
                  <option defaultValue={mobile} value={mobile}>
                    {mobile}
                  </option>
                </select>
                {errors.mobileSeller && (
                  <span className="text-red-500 text-sm">
                    {errors.mobileSeller.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-2">
                <label htmlFor="buyerName" className="font-bold">
                  Buyer Name
                </label>
                <input
                  type="text"
                  {...register("buyerName", {
                    required: "**Buyer Name is Required",
                  })}
                  placeholder="Buyer Name"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.buyerName && (
                  <span className="text-red-500">
                    {errors.buyerName.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-2">
                <label htmlFor="buyerMobile" className="font-bold">
                  Buyer Mobile Number
                </label>
                <input
                  type="text"
                  {...register("buyerMobile", {
                    required: "**Buyer Mobile Number is Required",
                  })}
                  placeholder="Buyer Mobile Number"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.buyerMobile && (
                  <span className="text-red-500">
                    {errors.buyerMobile.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-2">
                <label htmlFor="price" className="font-bold">
                  Price
                </label>
                <input
                  type="text"
                  {...register("price", {
                    required: "**Price is Required",
                  })}
                  placeholder="Price"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.price && (
                  <span className="text-red-500">{errors.price.message}</span>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-2">
                <label htmlFor="meetingLocation" className="font-bold">
                  Meeting Location
                </label>
                <input
                  type="text"
                  {...register("meetingLocation", {
                    required: "**Meeting Location is Required",
                  })}
                  placeholder="Meeting Location"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.meetingLocation && (
                  <span className="text-red-500">
                    {errors.meetingLocation.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-2">
                <label htmlFor="date" className="font-bold">
                  Date
                </label>
                <input
                  type="date"
                  {...register("date", {
                    required: "**Date is Required",
                  })}
                  placeholder="Date"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.date && (
                  <span className="text-red-500">{errors.date.message}</span>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-2">
                <label htmlFor="time" className="font-bold">
                  Time
                </label>
                <input
                  type="time"
                  {...register("time", {
                    required: "**Time is Required",
                  })}
                  placeholder="Time"
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.time && (
                  <span className="text-red-500">{errors.time.message}</span>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-2 ">
                <label htmlFor="user" className="font-bold">
                  Who create this booking?
                </label>
                <select
                  name="user"
                  {...register("user", {
                    required: "**User is Required",
                  })}
                  id="user"
                  className="input input-bordered w-full max-w-xs"
                >
                  <option defaultValue={user.email} value={user.email}>
                    {user.email}
                  </option>
                </select>
                {errors.user && (
                  <span className="text-red-500">{errors.user.message}</span>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-2 ">
                <label htmlFor="sellerName" className="font-bold">
                  Owner of Product?
                </label>
                <select
                  name="sellerName"
                  {...register("sellerName", {
                    required: "**User is Required",
                  })}
                  id="sellerName"
                  className="input input-bordered w-full max-w-xs"
                >
                  <option defaultValue={sellerName} value={sellerName}>
                    {sellerName}
                  </option>
                </select>
                {errors.sellerName && (
                  <span className="text-red-500">{errors.sellerName.message}</span>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-2">
                <button className="btn text-white border-0 hover:bg-orange-400 hover:text-white">
                  Submit Booking
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
