import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductItem from './ProductItem';


const Products = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://reseller-red.vercel.app/products/category/${category}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [category])

    return (
        <div className="lg:px-56 bg-base-200 pb-10">
            <h1 className="text-3xl text-center font-bold py-10">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <div className='flex justify-center items-center'>
                <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-10">
                    {
                        products.map(product => <ProductItem product={product} key={product._id}></ProductItem>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Products;