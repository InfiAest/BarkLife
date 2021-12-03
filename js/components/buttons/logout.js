import { logoutUser } from "../../utils/storage.js";

export default function logout() {
    const logoutButtons = document.querySelectorAll(".logout");

    if(logoutButtons) {
        logoutButtons.forEach((logoutButton) => {
            logoutButton.addEventListener("click", doLogout);
        })
        function doLogout() {
            const completeLogout = confirm("Are you sure you want to logout?");

            if (completeLogout) {
                logoutUser();
                location.href = "/";
            }
        }
    }
}