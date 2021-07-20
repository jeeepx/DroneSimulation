var myCarousel = document.getElementById("module1");
var carouselL = document.querySelector(".carousel-control-prev")
var carouselR = document.querySelector(".carousel-control-next")
var carouselInner = document.querySelector(".carousel-inner")

var carousel = new bootstrap.Carousel(myCarousel, {
    interval: false,
    wrap: false
});


carouselL.style.display = 'none';
myCarousel.addEventListener('slide.bs.carousel', ()=> {
    carouselL.style.display = 'block';
});

myCarousel.addEventListener('slid.bs.carousel', ()=> {

    if(carouselInner.firstChild.nextSibling.classList.contains('active')){
        carouselL.style.display = 'none';
    }else{
        carouselL.style.display = 'block';
    }

    if(carouselInner.lastChild.previousSibling.classList.contains('active')){
        carouselR.style.display = 'none';
        // myCarousel.setAttribute("data-interval","false");
    }else{
        carouselR.style.display = 'block';
    }

});
