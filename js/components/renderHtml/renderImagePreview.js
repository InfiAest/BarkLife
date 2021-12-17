var previewImg = document.getElementById("previewImg");

export default function previewProductImg(json) {
    const imageValue = json.image.url;
    if (!imageValue) {
        previewImg.src = "https://via.placeholder.com/150";
        previewImg.alt = `Photo of ${json.name}`; 
    } else {
        previewImg.src = imageValue;
    }
};