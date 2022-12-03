import React from 'react';
import img1 from '../../../Assets/images/1.png';
import img2 from '../../../Assets/images/2.png';
import img3 from '../../../Assets/images/3.png';
import BannerItem from './BannerItem';

const Banner = () => {
    const bannerItems = [
        {
            id: 1,
            title: 'Best Seller',
            description: 'Best market place for Resellers. Resale your product with suitable price.',
            image: img1,
            next: 2,
            prev: 3
        },
        {
            id: 2,
            title: 'New Arrival',
            description: 'Best market place for Resellers. Resale your product with comfortable price.',
            image: img2,
            next: 3,
            prev: 1
        },
        {
            id: 3,
            title: 'Special Offer',
            description: 'Best market place for Resellers. Resale your product suitable products.',
            image: img3,
            next: 1,
            prev: 2
        }
    ]

    return (
        <div className="carousel w-full">
            {
                bannerItems.map(item => <BannerItem key={item.id} item={item} />)
            }
        </div>
    );
};

export default Banner;