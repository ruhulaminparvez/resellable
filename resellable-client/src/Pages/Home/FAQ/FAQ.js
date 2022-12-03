import React, { useState, useEffect } from 'react';
import FAQItem from './FAQItem';

const FAQ = () => {
    const [faqs, setFaqs] = useState([]);

    useEffect(() => {
        fetch('https://reseller-red.vercel.app/faqs')
            .then(res => res.json())
            .then(data => setFaqs(data))
    }, []);

    return (
        <div className='lg:px-56 pb-20'>
            <h1 className='text-3xl text-center font-bold py-10'>FAQ</h1>

            <div className='flex flex-col gap-2'>
                {
                    faqs.map(faq => <FAQItem faqs={faq} key={faq._id}></FAQItem>)
                }
            </div>
        </div>
    );
};

export default FAQ;