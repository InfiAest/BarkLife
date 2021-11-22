//Sticky nav

export default function stickyNav() {
    var headerSection = document.querySelector("header");
    var sticky = headerSection.offsetTop;

    if (window.pageYOffset > sticky) {
        headerSection.classList.add("sticky");
    } else {
        headerSection.classList.remove("sticky");
    }
}