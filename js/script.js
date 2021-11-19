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
                                            </div>`
            }

        }
    }
    catch(error) {
        console.log(error);
    }
}

getFeaturedProducts();