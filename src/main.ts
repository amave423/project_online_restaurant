import axios from 'axios';

let originalContainer: HTMLElement | null = null;
let filtersVisible = false;

document.addEventListener("DOMContentLoaded", function() {
    initializeCards();
});

async function initializeCards() {
    const cardData = [
        { id: "america-card", endpoint: "americanDishes" },
        { id: "france-card", endpoint: "franceDishes" },
        { id: "japan-card", endpoint: "japanDishes" },
        { id: "tai-card", endpoint: "taiDishes" },
        { id: "mexico-card", endpoint: "mexicoDishes" }
    ];

    cardData.forEach(card => {
        const cardElement = document.getElementById(card.id);
        if (cardElement) {
            cardElement.addEventListener("click", () => {
                originalContainer = document.querySelector(".container");
                showDishes(`http://localhost:3000/${card.endpoint}`);
            });
        }
    });

    const showCardsButton = document.querySelector(".card") as HTMLElement | null;
    if (showCardsButton) {
        showCardsButton.addEventListener("click", () => {
            originalContainer = document.querySelector(".container");
            showDishes("http://localhost:3000/dishes");
        });
    }
}

async function showDishes(url: string) {
    try {
        const response = await axios.get(url);
        const dishes = response.data as { name: string, image: string, price: string, category: string, description: string }[];
        const categories = [...new Set(dishes.map(dish => dish.category))];
        
        const filterContainer = createFilterContainer(categories);
        const cardsContainer = createCardsContainer(dishes);

        replaceOrAppendElement(".filter-container", filterContainer);
        replaceOrAppendElement(".container", cardsContainer);

        const backButton = createBackButton();
        filterContainer.appendChild(backButton);

        document.addEventListener("keydown", function(event) {
            if (event.key === "Escape") {
                goBack();
            }
        });

        filterContainer.classList.remove("hidden");
        filtersVisible = true;

        selectButton(".filter-button[data-category='all']");
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

function createFilterContainer(categories: string[]) {
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    if (!filtersVisible) {
        filterContainer.classList.add("hidden");
    }

    const allButton = createFilterButton("Все", "all");
    allButton.addEventListener("click", () => filterCards("all"));
    filterContainer.appendChild(allButton);

    categories.forEach(category => {
        const filterButton = createFilterButton(category, category);
        filterButton.addEventListener("click", () => filterCards(category));
        filterContainer.appendChild(filterButton);
    });

    return filterContainer;
}

function createFilterButton(text: string, category: string) {
    const filterButton = document.createElement("button");
    filterButton.textContent = text;
    filterButton.className = "filter-button";
    filterButton.setAttribute("data-category", category);
    return filterButton;
}

function createCardsContainer(dishes: { name: string, image: string, price: string, category: string, description: string }[]) {
    const cardsContainer = document.createElement("div");
    cardsContainer.className = "container";

    dishes.forEach(dish => {
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container";

        const card = createDishCard(dish);
        const addToCartButton = createAddToCartButton(dish);

        cardContainer.appendChild(card);
        cardContainer.appendChild(addToCartButton);
        cardsContainer.appendChild(cardContainer);
    });

    return cardsContainer;
}

function createDishCard(dish: { name: string, image: string, price: string, category: string, description: string }) {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.setAttribute("data-category", dish.category);

    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";

    const img = document.createElement("img");
    img.src = dish.image;
    img.alt = dish.name;

    const overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.textContent = dish.name;

    const descriptionOverlay = document.createElement("div");
    descriptionOverlay.className = "description-overlay";
    descriptionOverlay.textContent = dish.description;

    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    card.appendChild(overlay);
    card.appendChild(descriptionOverlay);

    return card;
}

function createAddToCartButton(dish: { name: string, image: string, price: string, category: string, description: string }) {
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = `В корзину`;
    addToCartButton.className = "add-to-cart-button";

    const priceSpan = document.createElement("span");
    priceSpan.textContent = `${dish.price} ₽`;
    priceSpan.className = "price";

    addToCartButton.appendChild(document.createElement("br")); 
    addToCartButton.appendChild(priceSpan);

    addToCartButton.addEventListener("click", function(event) {
        event.stopPropagation();
        priceSpan.style.display = "none";
        addToCartButton.classList.add("clicked");

        setTimeout(function() {
            addToCartButton.classList.remove("clicked");
        }, 1000);

        setTimeout(function() {
            priceSpan.style.display = "inline";
            addToBasket(dish);
        }, 1000);

        console.log(`Добавить ${dish.name} в корзину`);
        event.stopPropagation();
    });

    return addToCartButton;
}

function createBackButton() {
    const backButton = document.createElement("button");
    backButton.textContent = "Назад";
    backButton.className = "back-button";
    backButton.addEventListener("click", goBack);
    return backButton;
}

function replaceOrAppendElement(selector: string, element: HTMLElement) {
    const existingElement = document.querySelector(selector);
    if (existingElement) {
        existingElement.replaceWith(element);
    } else {
        document.body.appendChild(element);
    }
}

function goBack() {
    if (originalContainer) {
        replaceOrAppendElement(".container", originalContainer);
        originalContainer = null;
    }
    const filterContainer = document.querySelector(".filter-container");
    if (filterContainer) {
        filterContainer.classList.add("hidden");
        filtersVisible = false;
    }
}

function selectButton(selector: string) {
    const selectedButton = document.querySelector(selector);
    if (selectedButton) {
        selectedButton.classList.add("selected");
    }
}

function filterCards(category: string) {
    const filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach(button => button.classList.remove("selected"));

    selectButton(`.filter-button[data-category="${category}"]`);

    const cardContainers = document.querySelectorAll(".card-container") as NodeListOf<HTMLElement>;
    cardContainers.forEach(container => {
        const cardCategory = container.querySelector(".dish-card")?.getAttribute("data-category");
        if (!cardCategory || category === "all" || cardCategory === category) {
            container.style.display = "block";
            const basketButton = container.querySelector(".add-to-cart-button") as HTMLElement;
            basketButton.style.display = "block";
        } else {
            container.style.display = "none";
            const basketButton = container.querySelector(".add-to-cart-button") as HTMLElement;
            basketButton.style.display = "none";
        }
    });
}
