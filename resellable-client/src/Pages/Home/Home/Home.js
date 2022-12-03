import React from 'react';
import Banner from './../Banner/Banner';
import Categories from './../Categories/Categories';
import FAQ from './../FAQ/FAQ';

const Home = () => {
    return (
        <div className='lg:px-52 bg-base-200'>
            <Banner></Banner>
            <Categories></Categories>
            <FAQ></FAQ>
        </div>
    );
};

export default Home;