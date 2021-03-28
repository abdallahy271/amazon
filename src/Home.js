import './Home.css'
import ImageGallery from 'react-image-gallery';
import React from 'react'
import Product from './Product'

function Home() {
    const images = [{ original: 'https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg' 
    },
    { original: 'https://www.ithaka.travel/blog/wp-content/uploads/2017/08/asia-1500-X-600-banner.jpg' 
    },
    { original: 'https://bentwoodinn.com/wp-content/uploads/2018/06/Photography-of-Jackson-Hole-WY-1500x600.jpg' 
    },
    { original: 'https://www.potomacaudubon.org/wp-content/uploads/2018/08/monarch-1500x600.jpg'}]

    return (
        <div className='home'>
            <div className="home__container">
                {/* <img className="home__image" src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg' 
                
                alt=''/> */}
                <div className='home__image'>
                    <ImageGallery items={images} infinite={true} autoPlay={true} showNav={false}/>;
                </div>
                <div className="home__row">
                    <Product 
                    id= {1}
                    title='The Lean Startup: How Constant Innovation Created Radically Successful Business Paperback'
                    price={29.99} 
                    image={'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL.AC_SY400_.jpg'}
                    rating={5}/>
                    <Product 
                     id= {2}
                     title= "Oculus Quest All-in-one VR Gaming Headset – 64GB"
                     image= "https://images-na.ssl-images-amazon.com/images/I/31pEe2taIPL._AC_US327_FMwebp_QL65_.jpg"
                     price= {11.96}
                     rating= {4} />
                   {/* product */}

                </div>
                <div className="home__row">
                    <Product 
                    id= {3}
                    title= "Nintendo Switch with Neon Blue and Neon Red Joy‑Con - HAC-001(-01)"
                    image= "https://images-na.ssl-images-amazon.com/images/I/41DQoLIfsRL._AC_US327_FMwebp_QL65_.jpg"
                    price= {15.96}
                    rating= {3}/>
                    <Product 
                    id= {4}
                    title= "YHT Wireless Pro Controller for PS4, Playstation 4 Controller Remote Control Gamepad"
                    image= "https://images-na.ssl-images-amazon.com/images/I/71FJoLzwNIL._AC_SL1500_.jpg"
                    price= {19.96}
                    rating= {3}/>
                    <Product 
                    id= {5}
                    title= "Memories, Not Dreams"
                    image= "https://m.media-amazon.com/images/I/41OneGhwipL.jpg"
                    price= {12.99}
                    rating= {5}
                    />
                </div>
                <div className="home__row">
                    {/* product */}
                    <Product 
                    id= {3}
                    title= "Mass Effect Andromeda - Xbox One"
                    image= "https://images-na.ssl-images-amazon.com/images/I/71EbMHxldxL._SL1000_.jpg"
                    price= {23.96}
                    rating= {4} />
                </div>
            </div>
        </div>
    )
}

export default Home
