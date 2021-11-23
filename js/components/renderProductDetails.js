export default function renderProductDetails(product) {

    const productContainer = document.querySelector(".product-container");

    productContainer.innerHTML += `<h1 class="product-name">${product.name}</h1>
                                    <div class="img-container">
                                        <div class="product-image" style="background-image: url('${product.image.url}');"></div>
                                    </div>
                                    <div class="description-price-container">
                                        <div class="description-container">
                                            <h2 class="description-header">Product Description:</h2>
                                            <p>${product.description}</p>
                                        </div>
                                        <div class="price-container">
                                            <p>£${product.price}</p>
                                        </div>
                                    </div>
                                    <div class="cta-button-container">
                                        <a href="#" id="addToCartButton" class="cta-button"><span>Add to cart</span></a>
                                    </div>`
}