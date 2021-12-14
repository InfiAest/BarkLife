const imageUrlInput = document.querySelector("#image");
imageUrlInput.addEventListener("change", previewProductImg);
var previewImg = document.getElementById("previewImg");

export default function previewProductImg() {
    if (imageUrlInput.value.length === 0) {
        previewImg.src = "https://via.placeholder.com/150";
    } else {
        previewImg.src = imageUrlInput.value;
    };
};