import { socialMediaUrl } from "../data/URLs.js";

//social media attests

export default async function getSocialMediaAttests() {
    try {
        const response = await fetch(socialMediaUrl);
        const instaMentions = await response.json();

        const attest1 = document.querySelector(".attest1");
        const attest2 = document.querySelector(".attest2");
        const attest3 = document.querySelector(".attest3");

        for (var i = 0; i < instaMentions.length; i++) {
            
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