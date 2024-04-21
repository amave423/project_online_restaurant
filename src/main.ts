import axios from 'axios';

interface Dish {
    name: string;
    image: string;
    price: string;
    category: string;
    description: string;
}

let originalContainer: HTMLElement | null = null;
let filtersVisible = false;

document.addEventListener("DOMContentLoaded", initializeCards);

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

    const showCardsButton = document.querySelector(".card");
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
        const dishes: Dish[] = response.data; 
        const categories = [...new Set(dishes.map(dish => dish.category))];
        const filterContainer = createFilterContainer(categories);
        const cardsContainer = createCardsContainer(dishes);
        replaceOrAppendElement(".filter-container", filterContainer);
        replaceOrAppendElement(".container", cardsContainer);
        filterContainer.appendChild(createBackButton());
        document.addEventListener("keydown", (event: KeyboardEvent) => {
            if (event.key === "Escape") goBack();
        });
        toggleFilterVisibility(true);
        selectButton(".filter-button[data-category='all']");
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
    }
}

function createFilterContainer(categories: string[]) {
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container" + (filtersVisible ? "" : " hidden");
    const allButton = createFilterButton("Все", "all", () => filterCards("all"));
    filterContainer.appendChild(allButton);
    categories.forEach(category => {
        const filterButton = createFilterButton(category, category, () => filterCards(category));
        filterContainer.appendChild(filterButton);
    });
    return filterContainer;
}

function createFilterButton(text: string, category: string, onClick: () => void) {
    const filterButton = document.createElement("button");
    filterButton.textContent = text;
    filterButton.className = "filter-button";
    filterButton.setAttribute("data-category", category);
    filterButton.addEventListener("click", onClick);
    return filterButton;
}

function createCardsContainer(dishes: Dish[]) {
    const cardsContainer = document.createElement("div");
    cardsContainer.className = "container";
    dishes.forEach(dish => {
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container";
        cardContainer.appendChild(createDishCard(dish));
        cardContainer.appendChild(createAddToCartButton(dish));
        cardsContainer.appendChild(cardContainer);
    });
    return cardsContainer;
}

function createDishCard(dish: Dish) {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.setAttribute("data-category", dish.category);
    const img = document.createElement("img");
    img.src = dish.image;
    img.alt = dish.name;
    card.appendChild(img);
    card.appendChild(createOverlay(dish.name));
    card.appendChild(createOverlay(dish.description, "description-overlay"));
    return card;
}

function createOverlay(text: string, className: string = "overlay") {
    const overlay = document.createElement("div");
    overlay.className = className;
    overlay.textContent = text;
    return overlay;
}

function createAddToCartButton(dish: Dish) {
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = `В корзину`;
    addToCartButton.className = "add-to-cart-button";
    const priceSpan = document.createElement("span");
    priceSpan.textContent = `${dish.price} ₽`;
    priceSpan.className = "price";
    addToCartButton.appendChild(document.createElement("br")); 
    addToCartButton.appendChild(priceSpan);
    addToCartButton.addEventListener("click", event => {
        event.stopPropagation();
        const clickedButton = event.currentTarget as HTMLElement;
        priceSpan.style.display = "none";
        clickedButton.classList.add("clicked");
        setTimeout(() => {
            clickedButton.classList.remove("clicked");
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
    if (existingElement) existingElement.replaceWith(element);
    else document.body.appendChild(element);
}

function goBack() {
    if (originalContainer) replaceOrAppendElement(".container", originalContainer);
    originalContainer = null;
    toggleFilterVisibility(false);
}

function toggleFilterVisibility(visible: boolean) {
    const filterContainer = document.querySelector(".filter-container");
    if (filterContainer) {
        filterContainer.classList.toggle("hidden", !visible);
        filtersVisible = visible;
    }
}

function selectButton(selector: string) {
    const selectedButton = document.querySelector(selector);
    if (selectedButton) selectedButton.classList.add("selected");
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
