import React, { Component } from 'react';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';

class Carousel extends Component {
    
    componentDidMount() {
        // set defaults for swiper
        let params = {
            autoplay: {
                delay: 9999999,
                disableOnInteraction: false
            },
            breakpoints: {
                575: {
                    slidesPerView: 1,
                },
                700: {
                    slidesPerView: 2,
                },
                810: {
                    slidesPerView: 3,
                },
                1020: {
                    slidesPerView: 4,
                },
                1230: {
                    slidesPerView: 5,
                }
            },
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false
            },
            slidesPerView: 6,
            spaceBetween: 30
        };

        if (this.props.params) {
            params = this.props.params;
        }

        const swiper = new Swiper(".swiper-container", params);
    }

    render() {
        return (    
            <div className="swiper-container">
                <h2 className="section-title">{this.props.title}</h2>
                <div className="swiper-wrapper">{this.props.children}</div>
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
                <div className="swiper-scrollbar"></div>
            </div>
        );
    }
};

export default Carousel;