export default function imageModalPopup(product) {
    const productImage = document.querySelector(".product-image");
    const imgModal = document.querySelector("#image-modal");
    const imageContainer = document.querySelector(".modal-image");
    var exitImg = document.getElementsByClassName("exit")[0];

    productImage.addEventListener("click", showLargeImage);

    function showLargeImage() {
        imgModal.style.display = "block";
        imageContainer.style.backgroundImage = `url("${product.image_URL}")`;
    };

    exitImg.onclick = function() { 
        imgModal.style.display = "none";
    };

    window.addEventListener("click", function(event) {
        if (event.target === imgModal) {
            imgModal.style.display = "none";
        };
    });
    
};