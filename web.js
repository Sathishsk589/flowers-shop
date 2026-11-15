
// =====================================
// GET CART DATA
// =====================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// =====================================
// SAVE CART
// =====================================

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}


// =====================================
// UPDATE CART COUNT
// =====================================

function updateCartCount() {

    let count = 0;

    cart.forEach(function(item) {
        count += item.quantity;
    });

    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = count;
    }
}


// =====================================
// ADD PRODUCT TO CART
// =====================================

function addToCart(name, price, image) {

    let existingProduct = cart.find(function(item) {
        return item.name === name && item.image === image;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });

    }

    saveCart();

    updateCartCount();

    alert(name + " Added To Cart!");
}


// =====================================
// GET PRODUCT DETAILS
// =====================================

function getProductDetails(product, page, index) {

    let image = product.querySelector("img");

    let paragraphs = product.querySelectorAll("p");

    let name = "";
    let price = 0;

    if (page === "index") {

        let descriptions = [
            "Rose Flower",
            "Sampangi Flower",
            "Jasmine Flower",
            "Chrysanthemum",
            "Sunflower",
            "Lotus"
        ];

        let prices = [100, 150, 120, 180, 200, 130];

        name = descriptions[index];
        price = prices[index];

    } else {

        name = paragraphs[0].innerText.trim();

        // Read the last rupee price in the product card
        paragraphs.forEach(function(p) {

            let matches = p.innerText.match(/₹\s*[\d,]+/g);

            if (matches) {

                let lastPrice = matches[matches.length - 1];

                price = Number(
                    lastPrice.replace(/[₹,\s]/g, "")
                );

            }

        });

    }

    let imagePath = image ? image.getAttribute("src") : "";

    return {
        name: name,
        price: price,
        image: imagePath
    };

}


// =====================================
// CONNECT PRODUCT BUTTONS
// =====================================

let products = document.querySelectorAll(".demo, .cls");

let page = window.location.pathname.split("/").pop().toLowerCase();

let pageType = "category";

if (page === "" || page === "index.html") {
    pageType = "index";
}


products.forEach(function(product, index) {

    // CATEGORY PAGE BUTTONS

    let button = product.querySelector(".b1");

    if (button) {

        button.addEventListener("click", function() {

            let details = getProductDetails(
                product,
                pageType,
                index
            );

            addToCart(
                details.name,
                details.price,
                details.image
            );

        });

    }


    // INDEX PAGE ADD TO CART TEXT

    let paragraphs = product.querySelectorAll("p");

    paragraphs.forEach(function(p) {

        if (p.innerText.trim().toLowerCase() === "add to cart") {

            p.style.cursor = "pointer";

            p.addEventListener("click", function() {

                let details = getProductDetails(
                    product,
                    pageType,
                    index
                );

                addToCart(
                    details.name,
                    details.price,
                    details.image
                );

            });

        }

    });

});


// =====================================
// OPEN CART PAGE
// =====================================

let cartLinks = document.querySelectorAll("#child3 span");

cartLinks.forEach(function(link) {

    if (link.innerText.toLowerCase().includes("cart")) {

        link.style.cursor = "pointer";

        link.addEventListener("click", function() {

            window.location.href = "./cart.html";

        });

    }

});


// =====================================
// SEARCH PRODUCTS
// =====================================

let searchInputs = document.querySelectorAll('input[type="search"], input[type^="search"]');

searchInputs.forEach(function(input) {

    input.addEventListener("input", function() {

        let searchValue = input.value.toLowerCase().trim();

        let productCards = document.querySelectorAll(".demo, .cls");

        productCards.forEach(function(product) {

            let productName = "";

            if (product.classList.contains("demo")) {

                productName = product.innerText.toLowerCase();

            } else {

                productName = product.innerText.toLowerCase();

            }

            if (productName.includes(searchValue)) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

});


// =====================================
// UPDATE CART COUNT ON PAGE LOAD
// =====================================

updateCartCount();
