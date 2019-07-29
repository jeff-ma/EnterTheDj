module.exports = {
    siteTitle: 'Enter the DJ',
    siteDescription: '',
    siteKeywords: 'Jeff Ma, Jeff, Ma, Bruce Lee, Bruce, Lee, software engineer, front-end engineer, web developer, javascript, react, node',
    siteUrl: 'https://jeffma.website',
    siteLanguage: 'en_US',
  
    name: 'Jeff Ma',
    location: 'Seattle, WA',
    email: 'JeffMaEmail@gmail.com',
    socialMedia: [
      {
        name: 'Github',
        url: 'https://github.com/jeff-ma/',
      },
      {
        name: 'Linkedin',
        url: 'https://www.linkedin.com/in/jeff-ma/',
      },
    ],

    swiperParams: {
        hero: {

        },
        normal: {
            autoplay: {
                delay: 9999999,
                disableOnInteraction: false
            },
            breakpoints: {
                // units are in pixels and only apply if less than or equal to screen width
                575: {
                    slidesPerView: 1,
                    // spaceBetween: 10
                },
                767: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 3,
                },
                1199: {
                    slidesPerView: 4,
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
            slidesPerView: 5,
            spacesBetween: 50
        }
    }
  };
  