let btnMenu = document.querySelector("#btnMenu");
let btnBoxPanier = document.querySelector(".boxPanier");
let navMenu = document.querySelector("#navMenu");
let boxPizzas = document.querySelector("#boxPizzas");
let inputSearch = document.querySelector("#inputSearch");
let selectCategory = document.querySelector("#category");
let btnCart = document.querySelector("#btnCart");
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
let contactFormContent = document.querySelector("#contactFormContent");
let contactSuccess = document.querySelector("#contactSuccess");
let locationArticles = document.querySelectorAll(".locationList article");
let faqDetails = document.querySelectorAll(".faqList details");

let checkoutBtn = document.querySelector("#checkoutBtn");
let totalproductCart = document.querySelectorAll(".totalproductCart");
let pizzaGrid = document.querySelector("#pizzaGrid");
let categoryFilter = document.querySelector("#categoryFilter");
let pizzaCount = document.querySelector("#pizzaCount");
let burger = document.querySelector("#burger");
let navBar = document.querySelector("#navBar");

class Pizza {
    #price;
    constructor(id, name, price, category, description, image, tag) {
        this.id = id;
        this.name = name;
        this.#price = price;
        this.category = category;
        this.description = description;
        this.image = image;
        this.tag = tag;
    }

    get getPrice() {
        return this.#price;
    }
    set setPrice(price) {
        if (price > 0) {
            this.#price = price;
        }
    }
}

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
        return this.pizza.getPrice * this.quantity;
    }
}

let pizzas = [
    new Pizza(1, "Margherita", 49, "classiques", "Sauce tomate, mozzarella & basilic frais", "images/margherita.png", "L'ORIGINALE"),
    new Pizza(2, "Diavola", 69, "specialites", "Sauce tomate, mozzarella & basilic frais", "images/diavola.png", "UN PEU DE CARACTERE"),
    new Pizza(3, "Poulet", 79, "specialites", "Crème, poulet rôti, champignons & mozzarella.", "images/pollo.png", "LA GENEREUSE"),
    new Pizza(4, "Giardino", 65, "vegetariennes", "Sauce tomate, poivrons, champignons & olives.", "images/giardino.png", "TOUT EN COULEURS"),
    new Pizza(5, "Torno", 75, "specialites", "Sauce tomate, thon, oignons rouges & mozzarella.", "images/tonno.png", "L'AIR DU LARGE"),
    new Pizza(6, "Quattro Formaggi", 85, "classiques", "Mozzarella, gorgonzola, chèvre & parmesan.", "images/quattro-formaggi.png", "POUR LES AMOUREUX")
];

let cart = [];

function showToast(message) {
    let toast = document.getElementById("toastNotification");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toastNotification";
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #1a1a1a;
            color: #fff;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            z-index: 1000;
            display: none;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 2500);
}

function closeCart() {
    let cartPanel = document.querySelector("#cartPanel") || document.querySelector("#cartSidebar");
    let cartOverlay = document.querySelector("#cartOverlay") || document.querySelector(".cartOverlay");

    if (cartPanel && cartPanel.classList) {
        cartPanel.classList.remove("open");
    }
    if (cartOverlay && cartOverlay.classList) {
        cartOverlay.classList.remove("open");
    }
}

function openCart() {
    let cartPanel = document.querySelector("#cartPanel") || document.querySelector("#cartSidebar");
    let cartOverlay = document.querySelector("#cartOverlay") || document.querySelector(".cartOverlay");

    if (cartPanel && cartPanel.classList) {
        cartPanel.classList.add("open");
    }
    if (cartOverlay && cartOverlay.classList) {
        cartOverlay.classList.add("open");
    }
}

document.querySelectorAll(".boxPanier, .boxShopping").forEach(function (element) {
    element.addEventListener("click", openCart);
});

document.querySelectorAll("#closeCart").forEach(function (button) {
    button.addEventListener("click", closeCart);
});

let cartOverlayEl = document.querySelector("#cartOverlay") || document.querySelector(".cartOverlay");
if (cartOverlayEl) {
    cartOverlayEl.addEventListener("click", function (event) {
        let cartPanel = document.querySelector("#cartPanel") || document.querySelector("#cartSidebar");
        if (cartPanel && cartPanel.classList.contains("open")) {
            let isClickOutside = !cartPanel.contains(event.target) &&
                !event.target.closest('.boxPanier') &&
                !event.target.closest('.boxShopping');

            if (isClickOutside) {
                closeCart();
            }
        }
    });
}

function addToCart(pizza, buttonElement) {
    if (!pizza) return;

    let existingPizza = cart.find(item => item.name === pizza.name && item.category === pizza.category);

    if (existingPizza) {
        existingPizza.quantity += 1;
    } else {
        pizza.quantity = 1;
        cart.push(pizza);
    }

    updateCart();
    showToast(`${pizza.name} ajoutée au panier`);

    if (buttonElement) {
        let originalText = buttonElement.innerHTML;
        buttonElement.innerHTML = "✓ Ajoutée";
        buttonElement.style.backgroundColor = "#2e7d32";
        buttonElement.style.color = "#fff";

        setTimeout(() => {
            buttonElement.innerHTML = originalText;
            buttonElement.style.backgroundColor = "";
            buttonElement.style.color = "";
        }, 1500);
    }
}

function updateCart() {
    const cartItemsEl = document.getElementById("cartItems");
    const cartTotalEl = document.getElementById("cartTotal");

    let totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll(".totalproductCart").forEach(function (element) {
        element.textContent = totalItemsCount;
    });

    if (!cartItemsEl) return;
    cartItemsEl.innerHTML = "";

    let grandTotal = 0;

    cart.forEach((pizza, index) => {
        let unitPrice = Number(pizza.getPrice) || 0;
        let itemTotalPrice = unitPrice * pizza.quantity;

        grandTotal += itemTotalPrice;

        let itemSameCategoryPrice = cart
            .filter(item => item.category === pizza.category)
            .reduce((sum, item) => sum + ((Number(item.getPrice) || 0) * item.quantity), 0);

        let item = document.createElement("div");
        item.className = "cartItem";
        item.innerHTML = `
            <img src="${pizza.image}" alt="${pizza.name || ''}">

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
                <div class="categoryTotalRow">
                    <span>Total Type :</span>
                    <strong>${itemSameCategoryPrice} MAD</strong>
                </div>
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

        cartItemsEl.appendChild(item);
    });

    if (cartTotalEl) {
        cartTotalEl.textContent = grandTotal + " MAD";
    }
}

function SearchPizzas() {
    if (!pizzaGrid) return;

    let searchValue = inputSearch ? inputSearch.value.toLowerCase().trim() : "";
    let category = categoryFilter ? categoryFilter.value : "all";

    let result = pizzas.filter(function (pizza) {
        let matchName = pizza.name.toLowerCase().includes(searchValue);
        let matchCategory = category === "all" || pizza.category === category;
        return matchName && matchCategory;
    });

    pizzaGrid.innerHTML = "";

    if (pizzaCount) {
        pizzaCount.textContent = result.length + " pizzas a decouvrir";
    }

    if (result.length === 0) {
        pizzaGrid.innerHTML = `
            <div>
                <h3>Aucune pizza trouvee.</h3>
            </div>
        `;
        return;
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
                <span class="pizzaType">${pizza.category}</span>
                <h3>${pizza.name}</h3>
                <p>${pizza.description}</p>

                <div class="pizzaBottom">
                    <span class="pizzaPrice">
                        ${pizza.getPrice}<small> MAD</small>
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
                addToCart(pizza, addButton);
            });
        }

        pizzaGrid.appendChild(card);
    }
}

if (inputSearch) inputSearch.addEventListener("input", SearchPizzas);
if (categoryFilter) categoryFilter.addEventListener("change", SearchPizzas);

if (burger && navBar) {
    burger.addEventListener("click", function () {
        navBar.classList.toggle("mobileOpen");
    });
}

document.querySelectorAll(".navBare a").forEach(function (link) {
    link.addEventListener("click", function () {
        if (navBar) navBar.classList.remove("mobileOpen");
    });
});


if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
        if (cart.length === 0) {
            showToast("Votre panier est vide !");
            return;
        }

        const cartItemsEl = document.getElementById("cartItems");
        if (cartItemsEl) cartItemsEl.style.display = "none";
        if (checkoutBtn) checkoutBtn.style.display = "none";
        if (orderForm) orderForm.style.display = "block";
    });
}

if (orderForm) {
    orderForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameVal = document.getElementById("customerName")?.value.trim();
        const phoneVal = document.getElementById("customerPhone")?.value.trim();

        if (!nameVal || !phoneVal) {
            if (orderError) {
                orderError.textContent = "Veuillez remplir tous les champs.";
                orderError.style.display = "block";
            }
            return;
        }

        if (orderError) orderError.style.display = "none";

        if (orderConfirmation) {
            let totalAmount = cart.reduce((sum, item) => sum + ((Number(item.getPrice) || 0) * item.quantity), 0);
            let itemsSummary = cart.map(item => `<p>${item.quantity} × ${item.name} <span>${(Number(item.getPrice) || 0) * item.quantity} MAD</span></p>`).join("");

            orderConfirmation.innerHTML = `
                <div class="successOrderCard">
                    <span class="sectionEyebrow">BON APPÉTIT !</span>
                    <h2>Merci, ${nameVal} !</h2>
                    <p class="successSubtitle">Votre commande de démonstration est prête.</p>
                    
                    <div class="summaryItemsList">
                        ${itemsSummary}
                    </div>

                    <div class="summaryGroup">
                        <label>Téléphone :</label>
                        <p>${phoneVal}</p>
                    </div>

                    <div class="summaryGroup">
                        <label>Total :</label>
                        <strong>${totalAmount} MAD</strong>
                    </div>

                    <button id="backToMenuBtn" class="mainButton" type="button">Retour à la carte</button>
                </div>
            `;

            orderForm.style.display = "none";
            orderConfirmation.style.display = "block";

            cart = [];
            updateCart();

            const backBtn = document.getElementById("backToMenuBtn");
            if (backBtn) {
                backBtn.addEventListener("click", function () {
                    const cartItemsEl = document.getElementById("cartItems");
                    if (cartItemsEl) cartItemsEl.style.display = "block";
                    if (checkoutBtn) checkoutBtn.style.display = "block";
                    if (orderConfirmation) orderConfirmation.style.display = "none";
                    closeCart();
                });
            }
        }
    });
}

if (pizzaGrid) {
    SearchPizzas();
}

if (locationArticles.length > 0) {
    locationArticles.forEach(function (article) {
        article.addEventListener("click", function () {
            locationArticles.forEach(item => item.classList.remove("active"));
            this.classList.add("active");

            let h3Val = this.querySelector("h3");
            if (h3Val && contactLocation) {
                contactLocation.value = h3Val.textContent.trim();
            }
        });
    });
}

if (contactLocation) {
    contactLocation.addEventListener("change", function () {
        let selectedValue = this.value;
        locationArticles.forEach(function (article) {
            let h3Val = article.querySelector("h3");
            if (h3Val && h3Val.textContent.trim() === selectedValue) {
                article.classList.add("active");
            } else {
                article.classList.remove("active");
            }
        });
    });
}

if (faqDetails.length > 0) {
    faqDetails.forEach(function (detail) {
        detail.addEventListener("toggle", function () {
            let spanIcon = this.querySelector("summary span");
            if (spanIcon) {
                spanIcon.textContent = this.open ? "×" : "+";
            }
        });
    });
}

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let nameVal = contactName ? contactName.value.trim() : "";
        let emailVal = contactEmail ? contactEmail.value.trim() : "";
        let locationVal = contactLocation ? contactLocation.value : "";
        let messageVal = contactMessage ? contactMessage.value.trim() : "";

        let subjectInput = document.querySelector('input[name="subject"]:checked');
        let subjectText = "Une question";
        if (subjectInput) {
            let labelOption = subjectInput.closest(".subject-option");
            if (labelOption) {
                let lastSpan = labelOption.querySelector("span:last-child");
                if (lastSpan) subjectText = lastSpan.textContent.trim();
            }
        }

        if (!nameVal || !emailVal || !locationVal || !messageVal) {
            if (contactError) {
                contactError.textContent = "Veuillez remplir tous les champs obligatoires (*).";
                contactError.style.display = "block";
            }
            return;
        }

        if (contactError) contactError.style.display = "none";

        if (contactSuccess && contactFormContent) {
            contactSuccess.innerHTML = `
                <div class="successCard">
                    <span class="sectionEyebrow">VOTRE DEMANDE</span>
                    <h2>Merci, ${nameVal} !</h2>
                    <p class="successSubtitle">Votre message de démonstration est prêt.</p>

                    <div class="summaryGroup"><label>Maison</label><p>${locationVal}</p></div>
                    <div class="summaryGroup"><label>Sujet</label><p>${subjectText}</p></div>
                    <div class="summaryGroup"><label>E-mail</label><p>${emailVal}</p></div>
                    <div class="summaryGroup"><label>Message</label><p>${messageVal}</p></div>

                    <button id="resetContactBtn" class="mainButton" type="button">Écrire un autre message</button>
                </div>
            `;

            contactFormContent.style.display = "none";
            contactSuccess.style.display = "block";

            let resetBtn = document.querySelector("#resetContactBtn");
            if (resetBtn) {
                resetBtn.addEventListener("click", function () {
                    contactForm.reset();
                    locationArticles.forEach(item => item.classList.remove("active"));
                    contactSuccess.style.display = "none";
                    contactFormContent.style.display = "block";
                });
            }
        }
    });
}