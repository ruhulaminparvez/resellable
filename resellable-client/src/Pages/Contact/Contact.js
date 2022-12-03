import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import toast from 'react-hot-toast';

const Contact = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [contactError, setContactError] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    setContactError("");

    fetch("https://reseller-red.vercel.app/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast("Your message has been sent");
        }
      })
      .catch((error) => {
        toast(error.message);
      });

      // reset form data after submit
      document.getElementById("contact-form").reset();
  };

  return (
    <div className="lg:px-56 bg-base-200 pb-20">
      <h1 className="text-3xl text-center font-bold py-10">Contact Us</h1>

      <div className="flex justify-center">
        <Form onSubmit={handleSubmit(onSubmit)} id="contact-form" className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {
                  ...register("name", {
                    required: "**Name is required",
                  })
                }
                placeholder="Enter your name"
                className="input input-bordered"
              />
              {errors.name && <p className="text-red-700 mt-2">{errors.name?.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", 
                  { 
                    required: "**Email is Required", 
                    pattern: { value: /^\S+@\S+$/i, message: "**Invalid Email" } 
                  }
                  )}    
                placeholder="Enter your email"
                className="input input-bordered"
              />
              {errors.email && <p className="text-red-700 mt-2">{errors.email?.message}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea type="text"
                {...register("message", {
                  required: "**Message is required",
                })}
              className="textarea textarea-bordered" 
              placeholder="Enter your message"></textarea>
              {errors.message && <p className="text-red-700 mt-2">{errors.message?.message}</p>}
            </div>
            <div className="form-control mt-6">
              <button className="btn text-white border-0 hover:bg-orange-400 hover:text-white">Submit</button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
