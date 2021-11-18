const headerImgContainer = document.querySelector(".header-img-container");
const url = "https://charlotte-lucas-semproj2-api.herokuapp.com/home";

async function getHeaderImg() {
    try {
        const response = await fetch(url);
        const result = await response.json();

        console.log(result);
        headerImgContainer.innerHTML += `<div class="header-img" style="background-image: url('${result.hero_banner_image.url}');">`;
    }
    catch(error) {
        console.log(error);
    }
}

getHeaderImg();