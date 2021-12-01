import { logoutUser } from "../../utils/storage.js";

export default function logout() {
    const logoutButton = document.querySelector("#logout");

    if(logoutButton) {
        logoutButton.onclick = function() {
            const completeLogout = confirm("Are you sure you want to logout?");

            if (completeLogout) {
                logoutUser();
                location.href = "/";
            }
        }
    }
}