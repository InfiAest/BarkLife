export default function loaderAnimation() {
    const loaderAnimation = document.querySelector(".page-loader-container");

    window.setInterval(function() {
        loaderAnimation.style.display = "none";
    }, 2500);
}