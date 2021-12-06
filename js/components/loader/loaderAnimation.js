export default function loaderAnimation() {
    const loaderAnimation = document.querySelector(".loader-container");

    window.setInterval(function() {
        loaderAnimation.style.display = "none";
    }, 2500);
}