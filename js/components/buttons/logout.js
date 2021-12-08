import { logoutUser } from "../../utils/storage.js";

export default function logout() {
    const logoutButtons = document.querySelectorAll(".logout");
    const modal = document.querySelector(".modal");
    const modalHeader = document.querySelector(".modal-header");
    const modalMessage = document.querySelector(".modal-message");
    const modalButtonContainer = document.querySelector(".modal-button-container");

    if(logoutButtons) {
        logoutButtons.forEach((logoutButton) => {
            logoutButton.addEventListener("click", doLogout);
        })
        function doLogout() {
            modal.style.display = "block";
            modalHeader.innerHTML = `<i class="fas fa-bone"></i>`;
            modalMessage.innerHTML = `<p>Are you sure you want to logout?</p>`;
            modalButtonContainer.style.display = "grid";

            const confirmButton = document.getElementById("confirmButton");
            const cancelButton = document.getElementById("cancelButton");

            confirmButton.addEventListener("click", () => {
                logoutUser();
                location.href = "/";
            });

            cancelButton.addEventListener("click", () => {
                modal.style.display = "none";
            });
            
        }
    }
}