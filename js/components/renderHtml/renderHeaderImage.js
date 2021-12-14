import { headerUrl } from "../../data/URLs.js";

export default async function renderHeaderImage() {

    const headerImgContainer = document.querySelector(".header-img-container");

    try {
        const response = await fetch(headerUrl);
        const result = await response.json();

        headerImgContainer.innerHTML = `<div class="header-img" style="background-image: url('${result.hero_banner_image.url}');">`;
    } catch(error) {
        console.log(error);
    };
};