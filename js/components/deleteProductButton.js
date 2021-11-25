import { productsUrl } from "../data/URLs.js";
import { getToken } from "../utils/storage.js";

export default function deleteProductButton(id) {
    const container = document.querySelector(".delete-container");

    container.innerHTML = `<button type="button" class="formButton delete"><span>Delete product</span></button>`;

    const deleteButton = document.querySelector("button.delete");

    deleteButton.onclick = async function() {
        console.log(id);

        const doDeleteProduct = confirm("Are you sure you want to delete this product?");

        if(doDeleteProduct) {
            const url = productsUrl + id;

            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const json = await response.json();
                location.href = "/";
                console.log(json);

            } 
            catch (error) {
                console.log(error);
            }
        }
    }


}