let btnMenu = document.querySelector("#btnMenu");
let btnBoxPanier = document.querySelector(".boxPanier");
let navMenu = document.querySelector("#navMenu");
let boxPizzas = document.querySelector("#boxPizzas");
let inputSearch = document.querySelector("#inputSearch");
let selectCategory = document.querySelector("#category");
let btnCart = document.querySelector("#btnCart");
let cartSidebar = document.querySelector("#cartSidebar");
let closeCart = document.querySelector("#closeCart");
let boxCart = document.querySelector("#boxCart");
let cartTotal = document.querySelector("#cartTotal");
let cartCount = document.querySelector("#cartCount");
let orderForm = document.querySelector("#orderForm");
let orderName = document.querySelector("#orderName");
let orderPhone = document.querySelector("#orderPhone");
let orderType = document.querySelector("#orderType");
let orderError = document.querySelector("#orderError");
let orderConfirmation = document.querySelector("#orderConfirmation");
let contactForm = document.querySelector("#contactForm");
let contactName = document.querySelector("#contactName");
let contactEmail = document.querySelector("#contactEmail");
let contactLocation = document.querySelector("#contactLocation");
let contactMessage = document.querySelector("#contactMessage");
let contactError = document.querySelector("#contactError");
let checkoutBtn = document.querySelector("#checkoutBtn");
let totalproductCart = document.querySelectorAll(".totalproductCart");
let cartPanel = document.querySelector("#cartPanel");

let pizzaGrid = document.querySelector("#pizzaGrid");
let categoryFilter = document.querySelector("#categoryFilter");
let pizzaCount = document.querySelector("#pizzaCount");
let cartOverlay = document.querySelector("#cartOverlay");
let cartItems = document.querySelector("#cartItems");
let burger = document.querySelector("#burger");
let navBar = document.querySelector("#navBar");

class Pizza {
    #price;
    constructor(id, name, price, category, image) {
        this.id = id;
        this.name = name;

        this.#price = price;
        this.category = category;
        this.image = image;
    }
    getPrice() {
        return this.#price;
    }
    setPrice(price) {
        if (price > 0) {
            this.#price = price;
        }
    }
}
let pizzas = [
    new Pizza(1, "Margherita", 49, "classiques", "images/margherita.png"),
    new Pizza(2, "Diavola", 69, "specialites", "images/diavola.png"),
    new Pizza(3, "Poulet", 79, "specialites", "images/pollo.png"),
    new Pizza(4, "Giardino", 65, "vegetariennes", "images/giardino.png"),
    new Pizza(5, "Torno", 75, "specialites", "images/tonno.png"),
    new Pizza(6, "Quattro Formaggi", 85, "classiques", "images/quattro-formaggi.png")
];
class CartItem {
    constructor(pizza, quantity) {
        this.pizza = pizza;
        this.quantity = quantity;
    }
    increaseQuantity() {
        this.quantity++;
    }
    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
    getTotal() {
        return this.pizza.getPrice() * this.quantity;
    }
}
let cart = [];
function displayPizzas(list) {
    pizzaGrid.innerHTML = "";
    pizzaCount.textContent = list.length + " pizzas a decouvrir";
    if (list.length === 0) {
        pizzaGrid.innerHTML = `
            <div>
                <h3>Aucune pizza trouvee.</h3>
            </div>
        `;
        return;
    }
    for (let i = 0; i < list.length; i++) {
        let pizza = list[i];
        pizzaGrid.innerHTML += `
            <div class="pizzaCard">
            <div class="pizzaImage">
                  <div class="boxImage">
                    <img src="${pizza.image}" alt="${pizza.name}">
                  </div>
                    <span class="pizzaTag">${pizza.category}</span>
                    <span class="pizzaNumber">0${pizza.id}</span>
                </div>
                <div class="pizzaInfo">
                    <span class="pizzaType">${pizza.category}</span>
                    <h3>${pizza.name}</h3>
                    <p>${pizza.ingredients}</p>
                    <div class="pizzaBottom">
                        <span class="pizzaPrice">${pizza.getPrice()}<small>MAD</small></span>
                        <button class="addPizza" data-id="${pizza.id}" type="button">+ Ajouter</button>
                    </div>
                </div>
            </div>
        `;
    }
}
displayPizzas(pizzas);

btnBoxPanier.addEventListener("click", function () {
    cartPanel.style.display = "block";
    console.log("clicked");
    console.log(cartPanel);


})

let pizzaData = [
    {
        name: "Margherita",
        type: "Classiques",
        category: "classiques",
        description: "Sauce tomate, mozzarella & basilic frais",
        price: 49,
        image: src = "images/margherita.png",
        tag: "L'ORIGINALE"
    },
    {
        name: "Diavola",
        type: "Epicée",
        category: "specialites",
        description: "Sauce tomate, mozzarella, pepperoni de boeuf & piment.",
        price: 69,
        image: "images/diavola.png",
        tag: "UN PEU DE CARACTERE"
    },
    {
        name: "Poulet",
        type: "Signatures",
        category: "specialites",
        description: "Crème, poulet rôti, champignons & mozzarella.",
        price: 79,
        image: "images/pollo.png",
        tag: "LA GENEREUSE"
    },
    {
        name: "Giardino",
        type: "Végétarienne",
        category: "vegetariennes",
        description: "Sauce tomate, poivrons, champignons & olives.",
        price: 65,
        image: "images/giardino.png",
        tag: "TOUT EN COULEURS"
    },
    {
        name: "Torno",
        type: "Signatures",
        category: "specialites",
        description: "Sauce tomate, thon, oignons rouges & mozzarella.",
        price: 75,
        image: "images/tonno.png",
        tag: "L'AIR DU LARGE"
    },
    {
        name: "Quattro Formaggi",
        type: "Classiques",
        category: "classiques",
        description: "Mozzarella, gorgonzola, chèvre & parmesan.",
        price: 85,
        image: "images/quattro-formaggi.png",
        tag: "POUR LES AMOUREUX"
    }
];




function renderPizzas() {
    if (!pizzaGrid) return;

    let searchValue = inputSearch ? inputSearch.value.toLowerCase().trim() : "";
    let category = categoryFilter ? categoryFilter.value : "all";

    let result = pizzaData.filter(function (pizza) {
        let matchName =
            pizza.name.toLowerCase().includes(searchValue) ||
            pizza.description.toLowerCase().includes(searchValue);

        let matchCategory =
            category === "all" || pizza.category === category;

        return matchName && matchCategory;
    });

    pizzaGrid.innerHTML = "";

    if (pizzaCount) {
        pizzaCount.textContent = result.length + " pizzas a decouvrir";
    }

    for (let i = 0; i < result.length; i++) {
        let pizza = result[i];

        let card = document.createElement("article");
        card.className = "pizzaCard";

        card.innerHTML = `
            <div class="pizzaImage">
              <div class="boxImage">
                <img src="${pizza.image}" alt="${pizza.name}">
              </div>
                <span class="pizzaTag">${pizza.tag}</span>
                <span class="pizzaNumber">0${i + 1}</span>
            </div>

            <div class="pizzaInfo">
                <span class="pizzaType">${pizza.type}</span>
                <h3>${pizza.name}</h3>
                <p>${pizza.description}</p>

                <div class="pizzaBottom">
                    <span class="pizzaPrice">
                        ${pizza.price}<small> MAD</small>
                    </span>

                    <button class="addPizza" type="button">
                        + Ajouter
                    </button>
                </div>
            </div>
        `;

        let addButton = card.querySelector(".addPizza");

        if (addButton) {
            addButton.addEventListener("click", function () {
                addToCart(pizza);
            });
        }

        pizzaGrid.appendChild(card);
    }
}

function addToCart(pizza) {
    if (!pizza) return;

    cart.push(pizza);
    updateCart();
    openCart();
}

function addToCart(pizzaData) {
    let existingPizza = cart.find(item => item.name === pizzaData.name && item.category === pizzaData.category);
    if (existingPizza) {
        existingPizza.quantity += 1;
    } else {
        cart.push({
            ...pizzaData,
            quantity: 1
        });
    }
    updateCart();
}
function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    let totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll(".totalproductCart").forEach(function (element) {
        element.textContent = totalItemsCount;
    });

    if (!cartItems) return;
    cartItems.innerHTML = "";
    let grandTotal = 0;
    cart.forEach((pizza, index) => {
        let itemUnitPrice = Number(pizza.price) || 0;
        let itemTotalPrice = itemUnitPrice * pizza.quantity;
        let itemSameCategoryPrice = 0;
        grandTotal += itemTotalPrice;
        if (pizza.category === pizza.category) {
            itemSameCategoryPrice += Number(pizza.price)
        }
        let item = document.createElement("div");
        item.className = "cartItem";
        item.innerHTML = `
            <img src="${pizza.image}" alt="${pizza.name}">

            <div class="cartItemDetails">
                <strong>${pizza.name}</strong>
                <span class="categoryTag">${pizza.category || ''}</span>
                <span class="priceTag">${itemTotalPrice} MAD</span>
                
                <div class="qtyControls">
                    <button type="button" class="btnQty minusBtn">-</button>
                    <span class="qtyValue">${pizza.quantity}</span>
                    <button type="button" class="btnQty plusBtn">+</button>
                </div>
                <button type="button" class="removeBtn">Supprimer</button>

                <div> <span>Total</span>${itemSameCategoryPrice}</div>
            </div>
        `;
        item.querySelector(".plusBtn").addEventListener("click", function () {
            pizza.quantity += 1;
            updateCart();
        });

        item.querySelector(".minusBtn").addEventListener("click", function () {
            if (pizza.quantity > 1) {
                pizza.quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        });
        item.querySelector(".removeBtn").addEventListener("click", function () {
            cart.splice(index, 1);
            updateCart();
        });

        cartItems.appendChild(item);
    });

    if (cartTotal) {
        cartTotal.textContent = grandTotal + " MAD";
    }
}


function openCart() {
    if (cartPanel) {
        cartPanel.classList.add("open");
    }

    if (cartOverlay) {
        cartOverlay.classList.add("open");
    }
}

document.querySelectorAll(".boxPanier, .boxShopping").forEach(function (element) {
    element.addEventListener("click", openCart);
});

let closeCartButton = document.querySelector("#closeCart");

closeCartButton.addEventListener("click", function () {
    if (cartPanel) {
        cartPanel.classList.remove("open");
    }
    if (cartOverlay) {
        cartOverlay.classList.remove("open");
    }
})

cartOverlay.addEventListener("click", function (event) {
    const isCartOpen = cartPanel && cartPanel.classList.contains("open");
    const isClickOutside = !cartPanel.contains(event.target) &&
        !event.target.closest('.boxPanier') &&
        !event.target.closest('.boxShopping');

    if (isCartOpen && isClickOutside) {
        if (cartPanel) {
            cartPanel.classList.remove("open");
        }
        if (cartOverlay) {
            cartOverlay.classList.remove("open");
        }
    }
});

if (inputSearch) {
    inputSearch.addEventListener("input", renderPizzas);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", renderPizzas);
}

let chooseButton = document.querySelector(".btnjechoisis");

if (chooseButton) {
    chooseButton.addEventListener("click", function () {
        let carte = document.querySelector("#carte");

        if (carte) {
            carte.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}

let tableButton = document.querySelector("#tableBtn");

if (tableButton) {
    tableButton.addEventListener("click", function () {
        let contact = document.querySelector("#contact");

        if (contact) {
            contact.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}

if (burger && navBar) {
    burger.addEventListener("click", function () {
        navBar.classList.toggle("mobileOpen");
    });
}

document.querySelectorAll(".navBare a").forEach(function (link) {
    link.addEventListener("click", function () {
        if (navBar) {
            navBar.classList.remove("mobileOpen");
        }
    });
});

let checkoutButton = document.querySelector("#checkoutBtn");

if (checkoutButton) {
    checkoutButton.addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Votre panier est vide.");
            return;
        }

        alert("Commande de demonstration envoyee.");

        cart = [];
        updateCart();
        closeCart();
    });
}

renderPizzas();

