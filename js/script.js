const headerImgContainer = document.querySelector(".header-img-container");
const headerUrl = "https://charlotte-lucas-semproj2-api.herokuapp.com/home";

async function getHeaderImg() {
    try {
        const response = await fetch(headerUrl);
        const result = await response.json();

        headerImgContainer.innerHTML += `<div class="header-img" style="background-image: url('${result.hero_banner_image.url}');">`;
    }
    catch(error) {
        console.log(error);
    }
}

getHeaderImg();


//Sticky nav

window.onscroll = function() {stickyNav()};

var headerSection = document.querySelector("header");
var sticky = headerSection.offsetTop;

function stickyNav() {
  if (window.pageYOffset > sticky) {
    headerSection.classList.add("sticky");
  } else {
    headerSection.classList.remove("sticky");
  }
}


//featured products

const productsUrl = "https://charlotte-lucas-semproj2-api.herokuapp.com/products";
const featuredGrid = document.querySelector(".featured-grid");

async function getFeaturedProducts() {
    try {
        const response = await fetch(productsUrl);
        const products = await response.json();

        for (i = 0; i < products.length; i++) {
            
            if (products[i].featured === true) {
                console.log(products[i])
                featuredGrid.innerHTML += `<div class="product-card">
                                                <div class="product-img-container">
                                                    <div class="card-img" style="background-image: url('${products[i].image.url}');">
                                                </div>
                                                <div class="product-name-container">
                                                    <h3>${products[i].name}</h3>
                                                    <p>£${products[i].price}</p>
                                                </div>
                                                <div class="cta-button-container">
                                                    <a href="#" class="cta-button"><span>View product</span></a>
                                                </div>
                                            </div>`
            }

        }
    }
    catch(error) {
        console.log(error);
    }
}

getFeaturedProducts();


//social media attests

const socialMediaUrl = "https://charlotte-lucas-semproj2-api.herokuapp.com/social-media-attests";
const attest1 = document.querySelector(".attest1");
const attest2 = document.querySelector(".attest2");
const attest3 = document.querySelector(".attest3");

async function getSocialMediaAttests() {
    try {
        const response = await fetch(socialMediaUrl);
        const instaMentions = await response.json();

        for (i = 0; i < instaMentions.length; i++) {
            console.log(instaMentions[i]);

            attest1.innerHTML = `<div class="attest">
                                                <div class="insta-img-container">
                                                    <div class="insta-img-lrg" style="background-image: url('${instaMentions[0].insta_image.url}');">
                                                </div>
                                                <div class="insta-info-container">
                                                    <p class="insta-username">${instaMentions[0].username} - ${instaMentions[0].comment}</p>
                                                </div>
                                            </div>`;
        
            attest2.innerHTML = `<div class="attest">
                                            <div class="insta-img-container">
                                                <div class="insta-img-sm" style="background-image: url('${instaMentions[1].insta_image.url}');">
                                            </div>
                                            <div class="insta-info-container">
                                                <p class="insta-username">${instaMentions[1].username}</p>
                                            </div>
                                        </div>`;

            attest3.innerHTML = `<div class="attest">
                                                <div class="insta-img-container">
                                                    <div class="insta-img-sm" style="background-image: url('${instaMentions[2].insta_image.url}');">
                                                </div>
                                                <div class="insta-info-container">
                                                    <p class="insta-username">${instaMentions[2].username}</p>
                                                </div>
                                            </div>`;
        }
    }
    catch(error) {
        console.log(error);
    }
}

getSocialMediaAttests();