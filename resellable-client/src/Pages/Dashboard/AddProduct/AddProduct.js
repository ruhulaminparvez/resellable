import React, { useContext, useState } from 'react';
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import useToken from '../../../hooks/useToken';
// import useSeller from '../../../hooks/useSeller';


const AddProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useContext(AuthContext);
    const [createdProduct, setCreatedProduct] = useState('')
    const [ ProductError, setProductError ] = useState('');
    // const [token] = useToken(createdProduct);
    // const navigate = useNavigate();
    // const [isSeller] = useSeller(user?.email)

    // if(token){
    //     navigate('/');
    //   }

    const onSubmit = (data) => {
        console.log(data);
        setProductError("");

        fetch('https://reseller-red.vercel.app/addProduct', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data =>{
            setCreatedProduct(data);
            toast("Your product has been added");
        })
        .catch(err => {
            console.log(err)
            setProductError(err.message)
            toast(err.message);
        });
    
    // reset form data after submit
    document.getElementById("add-product-form").reset();
    }
    return (
        <div>
            <h2 className='text-2xl font-bold mb-5'>Add a Product</h2>

            <Form onSubmit={handleSubmit(onSubmit)} id="add-product-form" className='w-full'>
                <div className='flex flex-col'>
                    <label htmlFor="name" className='font-bold'>Product Name</label>
                    <input type="text" {...register("productName", 
                    { 
                    required: "**ProductName is Required", 
                    }
                    )} 
                    placeholder="Product Name" className="input input-bordered w-full max-w-xs" />
                    {errors.productName && <span className='text-red-500'>{errors.productName.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="price" className='font-bold'>Price</label>
                    <input type="number" 
                    {
                        ...register("price",
                        {
                            required: "**Price is Required",
                        })
                    } 
                    placeholder="Price" className="input input-bordered w-full max-w-xs" />
                    {errors.price && <span className='text-red-500'>{errors.price.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="description" className='font-bold'>Description</label>
                    <textarea name="description" id="description"
                     {
                        ...register("description",
                        {
                            required: "**Description is Required",
                        })
                     }
                    placeholder='Description' cols="30" rows="10" className="input input-bordered w-full max-w-xs"></textarea>
                    {errors.description && <span className='text-red-500'>{errors.description.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="condition" className='font-bold'>Condition</label>
                    <select name="condition" id="condition" {
                        ...register("condition",
                        {
                            required: "**Condition is Required",
                        })
                    } className="input input-bordered w-full max-w-xs">
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                    </select>
                    {errors.condition && <span className='text-red-500'>{errors.condition.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="image" className='font-bold'>ImageURL</label>
                    <input type="text" id='image' {
                        ...register("image",
                        {
                            required: "**Image is Required",
                        })
                    } placeholder="ImageURL" className="input input-bordered w-full max-w-xs" />
                    {errors.image && <span className='text-red-500'>{errors.image.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="category" className='font-bold'>Category</label>
                    <select name="category" id="category" {
                        ...register("category",{
                            required: "**Category is Required",
                        })
                    } className="input input-bordered w-full max-w-xs">
                        <option value="suzuki">suzuki</option>
                        <option value="hero">hero</option>
                        <option value="yamaha">yamaha</option>
                    </select>
                    {errors.category && <span className='text-red-500'>{errors.category.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="mobile" className='font-bold'>Mobile</label>
                    <input type="text" {
                        ...register("mobile",{
                            required: "**Mobile is Required",
                        })
                    } placeholder="Mobile" className="input input-bordered w-full max-w-xs" />
                    {errors.mobile && <span className='text-red-500'>{errors.mobile.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="location" className='font-bold'>Location</label>
                    <input type="text" {
                        ...register("location",{
                            required: "**Location is Required",})
                    } placeholder="Location" className="input input-bordered w-full max-w-xs" />
                    {errors.location && <span className='text-red-500'>{errors.location.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="yearOfPurchase" className='font-bold'>Year Of Purchase</label>
                    <input type="number" {
                        ...register("yearOfPurchase",{
                            required: "**Year Of Purchase is Required",
                        })
                    } placeholder="Year Of Purchase" className="input input-bordered w-full max-w-xs" />
                    {errors.yearOfPurchase && <span className='text-red-500'>{errors.yearOfPurchase.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="engineCapacity" className='font-bold'>Engine Capacity</label>
                    <input type="number" {
                        ...register("engineCapacity",{
                            required: "**Engine Capacity is Required",
                        })
                    } placeholder="Engine Capacity" className="input input-bordered w-full max-w-xs" />
                    {errors.engineCapacity && <span className='text-red-500'>{errors.engineCapacity.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="mileage" className='font-bold'>Mileage</label>
                    <input type="number" {
                        ...register("mileage",{
                            required: "**Mileage is Required",
                        })
                    } placeholder="Mileage" className="input input-bordered w-full max-w-xs" />
                    {errors.mileage && <span className='text-red-500'>{errors.mileage.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="color" className='font-bold'>Color</label>
                    <input type="text" {
                        ...register("color",{
                            required: "**Color is Required",
                        })
                    } placeholder="Color" className="input input-bordered w-full max-w-xs" />
                    {errors.color && <span className='text-red-500'>{errors.color.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="fuelType" className='font-bold'>Fuel Type</label>
                    <select name="fuelType" {
                        ...register("fuelType",{
                            required: "**Fuel Type is Required",
                        })
                    } id="fuelType" className="input input-bordered w-full max-w-xs">
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="cng">CNG</option>
                    </select>
                    {errors.fuelType && <span className='text-red-500'>{errors.fuelType.message}</span>}
                </div>
                <div className='flex flex-col mt-4'>
                    <label htmlFor="user" className='font-bold'>Who create this post?</label>
                    <select name="user" {
                        ...register("user",{
                            required: "**User is Required"
                        })
                    } id="user" className="input input-bordered w-full max-w-xs">
                        <option defaultValue={user.email} value={user.email}>{user.email}</option>
                    </select>   
                    {errors.user && <span className='text-red-500'>{errors.user.message}</span>}
                </div>

                <button className='btn text-white border-0 hover:bg-orange-400 hover:text-white my-4'>Add Product</button>
            </Form>
        </div>
    );
};

export default AddProduct;