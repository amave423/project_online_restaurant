let originalContainer: HTMLElement | null = null;

const dishes = [
    { name: "Апероль", image: "image/italydishes/aperol.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Брускетта", image: "image/italydishes/brusketta.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Карбонара", image: "image/italydishes/carbonara.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Эспрессо", image: "image/italydishes/espresso.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Каноли", image: "image/italydishes/kanoli.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Капрезе", image: "image/italydishes/kapreze.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Лазанья", image: "image/italydishes/laz.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Маргарита", image: "image/italydishes/margarita.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Негрони", image: "image/italydishes/negroni.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Панна Кота", image: "image/italydishes/panna-kotta.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Ризотто", image: "image/italydishes/rizotto.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Тирамису", image: "image/italydishes/tiramisu.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Заварной крем", image: "image/italydishes/zavar-krem.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
];

const americanDishes = [
    { name: "Апероль", image: "image/americadishes/beer.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Брускетта", image: "image/americadishes/cake.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Карбонара", image: "image/americadishes/cheesecake.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Эспрессо", image: "image/americadishes/chiken.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Каноли", image: "image/americadishes/chili.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Капрезе", image: "image/americadishes/coocie.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Лазанья", image: "image/americadishes/humburger.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Маргарита", image: "image/americadishes/lemonade.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Негрони", image: "image/americadishes/margo.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Панна Кота", image: "image/americadishes/pasta.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Ризотто", image: "image/americadishes/pie.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Тирамису", image: "image/americadishes/rebra.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Заварной крем", image: "image/americadishes/steik.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
];

const dishesFrance = [
    { name: "Апероль", image: "image/francedishes/bugi.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Брускетта", image: "image/francedishes/coco.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Карбонара", image: "image/francedishes/cognac.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Эспрессо", image: "image/francedishes/confit.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Каноли", image: "image/francedishes/croissant.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Капрезе", image: "image/francedishes/karri.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Лазанья", image: "image/francedishes/krep.jpg", category: "Десерт",  description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Маргарита", image: "image/francedishes/makaron.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Негрони", image: "image/francedishes/raclette.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Панна Кота", image: "image/francedishes/shamp.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Ризотто", image: "image/francedishes/tart.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Тирамису", image: "image/francedishes/wine.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Заварной крем", image: "image/francedishes/ystrica.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
];

const dishesJapan = [
    { name: "Апероль", image: "image/japandishes/doraiaki.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Брускетта", image: "image/japandishes/mochi.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Карбонара", image: "image/japandishes/okasi_tiram.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Эспрессо", image: "image/japandishes/ramen.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Каноли", image: "image/japandishes/sake.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Капрезе", image: "image/japandishes/sashimi.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Лазанья", image: "image/japandishes/suchi.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Маргарита", image: "image/japandishes/tayaki.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Негрони", image: "image/japandishes/tea.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Панна Кота", image: "image/japandishes/tempura.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Ризотто", image: "image/japandishes/tonkacu.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Тирамису", image: "image/japandishes/udon.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Заварной крем", image: "image/japandishes/umeshu.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
];

const dishesMexico = [
    { name: "Апероль", image: "image/mexicodishes/arroz.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Брускетта", image: "image/mexicodishes/beer.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Карбонара", image: "image/mexicodishes/churros.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Эспрессо", image: "image/mexicodishes/enchi.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Каноли", image: "image/mexicodishes/fada.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Капрезе", image: "image/mexicodishes/flan.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Лазанья", image: "image/mexicodishes/guakamole.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Маргарита", image: "image/mexicodishes/horhata.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Негрони", image: "image/mexicodishes/kessa.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Панна Кота", image: "image/mexicodishes/pozole.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Ризотто", image: "image/mexicodishes/takos.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Тирамису", image: "image/mexicodishes/tres.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
];

const dishesTai = [
    { name: "Апероль", image: "image/taidishes/kokos.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Брускетта", image: "image/taidishes/krapao.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Карбонара", image: "image/taidishes/lemon.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Эспрессо", image: "image/taidishes/liovan.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Каноли", image: "image/taidishes/mango.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Капрезе", image: "image/taidishes/pad.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Лазанья", image: "image/taidishes/pud.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Маргарита", image: "image/taidishes/roti.jpg", category: "Десерт", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Негрони", image: "image/taidishes/somtam.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Панна Кота", image: "image/taidishes/tai.jpg", category: "Напитки", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
    { name: "Ризотто", image: "image/taidishes/tomiam.jpg", category: "Основное блюдо", description: "Сочетание итальянских каперов и зеленых оливок, пропитанных оливковым маслом и лимонным соком, приправленное свежемолотым перцем и травами." },
];

document.addEventListener("DOMContentLoaded", function() {
    const showCardsButton = document.querySelector(".card") as HTMLElement | null;
    if (showCardsButton) {
        showCardsButton.addEventListener("click", function() {
            originalContainer = document.querySelector(".container");
            showCards();
        });
    }
});

let filtersVisible = false;

function showCards() {
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    if (!filtersVisible) {
        filterContainer.classList.add("hidden");
    }

    const categories = [...new Set(dishes.map(dish => dish.category))];

    const allButton = document.createElement("button");
    allButton.textContent = "Все";
    allButton.className = "filter-button";
    allButton.setAttribute("data-category", "all");
    filterContainer.appendChild(allButton);

    allButton.addEventListener("click", function () {
        filterCards("all");
    });

    categories.forEach(category => {
        const filterButton = document.createElement("button");
        filterButton.textContent = category;
        filterButton.className = "filter-button";
        filterButton.setAttribute("data-category", category);
        filterContainer.appendChild(filterButton);

        filterButton.addEventListener("click", function () {
            const category = filterButton.getAttribute("data-category");
            if (category) {
                filterCards(category);
            }
        });
    });

    const existingFilterContainer = document.querySelector(".filter-container");
    if (existingFilterContainer) {
        existingFilterContainer.replaceWith(filterContainer);
    } else {
        document.body.appendChild(filterContainer);
    }

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "container";

    dishes.forEach(dish => {
        const card = document.createElement("div");
        card.className = "dish-card";
        card.setAttribute("data-category", dish.category);

        const img = document.createElement("img");
        img.src = dish.image;
        img.alt = dish.name;

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.textContent = dish.name;

        const descriptionOverlay = document.createElement("div");
        descriptionOverlay.className = "description-overlay";
        descriptionOverlay.textContent = dish.description;
        descriptionOverlay.style.display = "none";

        card.addEventListener("mouseenter", function () {
            descriptionOverlay.style.display = "block";
        });

        card.addEventListener("mouseleave", function () {
            descriptionOverlay.style.display = "none";
        });

        card.appendChild(img);
        card.appendChild(overlay);
        card.appendChild(descriptionOverlay);

        cardsContainer.appendChild(card);
    });

    const existingCardsContainer = document.querySelector(".container");
    if (existingCardsContainer) {
        existingCardsContainer.replaceWith(cardsContainer);
    } else {
        document.body.appendChild(cardsContainer);
    }

    const backButton = document.createElement("button");
    backButton.textContent = "Назад";
    backButton.className = "back-button";
    backButton.addEventListener("click", goBack);

    filterContainer.appendChild(backButton);

    document.addEventListener("keydown", function(event) {
        if (event.keyCode === 27) {
            goBack();
        }
    });

    filterContainer.classList.remove("hidden");
    filtersVisible = true;

    const selectedButton = filterContainer.querySelector(".filter-button[data-category='all']");
    if (selectedButton) {
        selectedButton.classList.add("selected");
    }
}

function goBack() {
    if (originalContainer) {
        const cardsContainer = document.querySelector(".container");
        if (cardsContainer) {
            cardsContainer.replaceWith(originalContainer);
            originalContainer = null;
        }
    }
    const filterContainer = document.querySelector(".filter-container");
    if (filterContainer) {
        filterContainer.classList.add("hidden");
        filtersVisible = false;
    }
}

function filterCards(category: string) {
    const filterButtons = document.querySelectorAll(".filter-button");
    filterButtons.forEach(button => {
        button.classList.remove("selected");
    });

    const selectedButton = document.querySelector(`.filter-button[data-category="${category}"]`);
    if (selectedButton) {
        selectedButton.classList.add("selected");
    }

    const cards = document.querySelectorAll(".dish-card");
    cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || !cardCategory || cardCategory === category) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const americaCard = document.getElementById("america-card");
    if (americaCard) {
        americaCard.addEventListener("click", function() {
            originalContainer = document.querySelector(".container");
            showAmericanDishes();
        });
    }
});

function showAmericanDishes() {
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    if (!filtersVisible) {
        filterContainer.classList.add("hidden");
    }

    const categories = [...new Set(americanDishes.map(dish => dish.category))];

    const allButton = document.createElement("button");
    allButton.textContent = "Все";
    allButton.className = "filter-button";
    allButton.setAttribute("data-category", "all");
    filterContainer.appendChild(allButton);

    allButton.addEventListener("click", function () {
        filterCards("all");
    });

    categories.forEach(category => {
        const filterButton = document.createElement("button");
        filterButton.textContent = category;
        filterButton.className = "filter-button";
        filterButton.setAttribute("data-category", category);
        filterContainer.appendChild(filterButton);

        filterButton.addEventListener("click", function () {
            const category = filterButton.getAttribute("data-category");
            if (category) {
                filterCards(category);
            }
        });
    });

    const existingFilterContainer = document.querySelector(".filter-container");
    if (existingFilterContainer) {
        existingFilterContainer.replaceWith(filterContainer);
    } else {
        document.body.appendChild(filterContainer);
    }

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "container";

    americanDishes.forEach(dish => {
        const card = document.createElement("div");
        card.className = "dish-card";
        card.setAttribute("data-category", dish.category);

        const img = document.createElement("img");
        img.src = dish.image;
        img.alt = dish.name;

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.textContent = dish.name;

        const descriptionOverlay = document.createElement("div");
        descriptionOverlay.className = "description-overlay";
        descriptionOverlay.textContent = dish.description;
        descriptionOverlay.style.display = "none";

        card.addEventListener("mouseenter", function () {
            descriptionOverlay.style.display = "block";
        });

        card.addEventListener("mouseleave", function () {
            descriptionOverlay.style.display = "none";
        });

        card.appendChild(img);
        card.appendChild(overlay);
        card.appendChild(descriptionOverlay);

        const basketButton = document.createElement("button");
        basketButton.textContent = "Добавить в корзину";
        basketButton.className = "basket-button";
        card.appendChild(basketButton);

        cardsContainer.appendChild(card);
    });

    const existingCardsContainer = document.querySelector(".container");
    if (existingCardsContainer) {
        existingCardsContainer.replaceWith(cardsContainer);
    } else {
        document.body.appendChild(cardsContainer);
    }

    const backButton = document.createElement("button");
    backButton.textContent = "Назад";
    backButton.className = "back-button";
    backButton.addEventListener("click", goBack);

    filterContainer.appendChild(backButton);

    document.addEventListener("keydown", function(event) {
        if (event.keyCode === 27) {
            goBack();
        }
    });

    filterContainer.classList.remove("hidden");
    filtersVisible = true;

    const selectedButton = filterContainer.querySelector(".filter-button[data-category='all']");
    if (selectedButton) {
        selectedButton.classList.add("selected");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const franceCard = document.getElementById("france-card");
    if (franceCard) {
        franceCard.addEventListener("click", function() {
            originalContainer = document.querySelector(".container");
            showFranceDishes();
        });
    }
});

function showFranceDishes() {
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    if (!filtersVisible) {
        filterContainer.classList.add("hidden");
    }

    const categories = [...new Set(dishesFrance.map(dish => dish.category))];

    const allButton = document.createElement("button");
    allButton.textContent = "Все";
    allButton.className = "filter-button";
    allButton.setAttribute("data-category", "all");
    filterContainer.appendChild(allButton);

    allButton.addEventListener("click", function () {
        filterCards("all");
    });

    categories.forEach(category => {
        const filterButton = document.createElement("button");
        filterButton.textContent = category;
        filterButton.className = "filter-button";
        filterButton.setAttribute("data-category", category);
        filterContainer.appendChild(filterButton);

        filterButton.addEventListener("click", function () {
            const category = filterButton.getAttribute("data-category");
            if (category) {
                filterCards(category);
            }
        });
    });

    const existingFilterContainer = document.querySelector(".filter-container");
    if (existingFilterContainer) {
        existingFilterContainer.replaceWith(filterContainer);
    } else {
        document.body.appendChild(filterContainer);
    }

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "container";

    dishesFrance.forEach(dish => {
        const card = document.createElement("div");
        card.className = "dish-card";
        card.setAttribute("data-category", dish.category);

        const img = document.createElement("img");
        img.src = dish.image;
        img.alt = dish.name;

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.textContent = dish.name;

        const descriptionOverlay = document.createElement("div");
        descriptionOverlay.className = "description-overlay";
        descriptionOverlay.textContent = dish.description;
        descriptionOverlay.style.display = "none";

        card.addEventListener("mouseenter", function () {
            descriptionOverlay.style.display = "block";
        });

        card.addEventListener("mouseleave", function () {
            descriptionOverlay.style.display = "none";
        });

        card.appendChild(img);
        card.appendChild(overlay);
        card.appendChild(descriptionOverlay);

        const basketButton = document.createElement("button");
        basketButton.textContent = "Добавить в корзину";
        basketButton.className = "basket-button";
        card.appendChild(basketButton);

        cardsContainer.appendChild(card);
    });

    const existingCardsContainer = document.querySelector(".container");
    if (existingCardsContainer) {
        existingCardsContainer.replaceWith(cardsContainer);
    } else {
        document.body.appendChild(cardsContainer);
    }

    const backButton = document.createElement("button");
    backButton.textContent = "Назад";
    backButton.className = "back-button";
    backButton.addEventListener("click", goBack);

    filterContainer.appendChild(backButton);

    document.addEventListener("keydown", function(event) {
        if (event.keyCode === 27) {
            goBack();
        }
    });

    filterContainer.classList.remove("hidden");
    filtersVisible = true;

    const selectedButton = filterContainer.querySelector(".filter-button[data-category='all']");
    if (selectedButton) {
        selectedButton.classList.add("selected");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const japanCard = document.getElementById("japan-card");
    if (japanCard) {
        japanCard.addEventListener("click", function() {
            originalContainer = document.querySelector(".container");
            showJapanDishes();
        });
    }
});

function showJapanDishes() {
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    if (!filtersVisible) {
        filterContainer.classList.add("hidden");
    }

    const categories = [...new Set(dishesJapan.map(dish => dish.category))];

    const allButton = document.createElement("button");
    allButton.textContent = "Все";
    allButton.className = "filter-button";
    allButton.setAttribute("data-category", "all");
    filterContainer.appendChild(allButton);

    allButton.addEventListener("click", function () {
        filterCards("all");
    });

    categories.forEach(category => {
        const filterButton = document.createElement("button");
        filterButton.textContent = category;
        filterButton.className = "filter-button";
        filterButton.setAttribute("data-category", category);
        filterContainer.appendChild(filterButton);

        filterButton.addEventListener("click", function () {
            const category = filterButton.getAttribute("data-category");
            if (category) {
                filterCards(category);
            }
        });
    });

    const existingFilterContainer = document.querySelector(".filter-container");
    if (existingFilterContainer) {
        existingFilterContainer.replaceWith(filterContainer);
    } else {
        document.body.appendChild(filterContainer);
    }

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "container";

    dishesJapan.forEach(dish => {
        const card = document.createElement("div");
        card.className = "dish-card";
        card.setAttribute("data-category", dish.category);

        const img = document.createElement("img");
        img.src = dish.image;
        img.alt = dish.name;

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.textContent = dish.name;

        const descriptionOverlay = document.createElement("div");
        descriptionOverlay.className = "description-overlay";
        descriptionOverlay.textContent = dish.description;
        descriptionOverlay.style.display = "none";

        card.addEventListener("mouseenter", function () {
            descriptionOverlay.style.display = "block";
        });

        card.addEventListener("mouseleave", function () {
            descriptionOverlay.style.display = "none";
        });

        card.appendChild(img);
        card.appendChild(overlay);
        card.appendChild(descriptionOverlay);

        const basketButton = document.createElement("button");
        basketButton.textContent = "Добавить в корзину";
        basketButton.className = "basket-button";
        card.appendChild(basketButton);

        cardsContainer.appendChild(card);
    });

    const existingCardsContainer = document.querySelector(".container");
    if (existingCardsContainer) {
        existingCardsContainer.replaceWith(cardsContainer);
    } else {
        document.body.appendChild(cardsContainer);
    }

    const backButton = document.createElement("button");
    backButton.textContent = "Назад";
    backButton.className = "back-button";
    backButton.addEventListener("click", goBack);

    filterContainer.appendChild(backButton);

    document.addEventListener("keydown", function(event) {
        if (event.keyCode === 27) {
            goBack();
        }
    });

    filterContainer.classList.remove("hidden");
    filtersVisible = true;

    const selectedButton = filterContainer.querySelector(".filter-button[data-category='all']");
    if (selectedButton) {
        selectedButton.classList.add("selected");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const taiCard = document.getElementById("tai-card");
    if (taiCard) {
        taiCard.addEventListener("click", function() {
            originalContainer = document.querySelector(".container");
            showTaiDishes();
        });
    }
});

function showTaiDishes() {
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    if (!filtersVisible) {
        filterContainer.classList.add("hidden");
    }

    const categories = [...new Set(dishesTai.map(dish => dish.category))];

    const allButton = document.createElement("button");
    allButton.textContent = "Все";
    allButton.className = "filter-button";
    allButton.setAttribute("data-category", "all");
    filterContainer.appendChild(allButton);

    allButton.addEventListener("click", function () {
        filterCards("all");
    });

    categories.forEach(category => {
        const filterButton = document.createElement("button");
        filterButton.textContent = category;
        filterButton.className = "filter-button";
        filterButton.setAttribute("data-category", category);
        filterContainer.appendChild(filterButton);

        filterButton.addEventListener("click", function () {
            const category = filterButton.getAttribute("data-category");
            if (category) {
                filterCards(category);
            }
        });
    });

    const existingFilterContainer = document.querySelector(".filter-container");
    if (existingFilterContainer) {
        existingFilterContainer.replaceWith(filterContainer);
    } else {
        document.body.appendChild(filterContainer);
    }

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "container";

    dishesTai.forEach(dish => {
        const card = document.createElement("div");
        card.className = "dish-card";
        card.setAttribute("data-category", dish.category);

        const img = document.createElement("img");
        img.src = dish.image;
        img.alt = dish.name;

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.textContent = dish.name;

        const descriptionOverlay = document.createElement("div");
        descriptionOverlay.className = "description-overlay";
        descriptionOverlay.textContent = dish.description;
        descriptionOverlay.style.display = "none";

        card.addEventListener("mouseenter", function () {
            descriptionOverlay.style.display = "block";
        });

        card.addEventListener("mouseleave", function () {
            descriptionOverlay.style.display = "none";
        });

        card.appendChild(img);
        card.appendChild(overlay);
        card.appendChild(descriptionOverlay);

        const basketButton = document.createElement("button");
        basketButton.textContent = "Добавить в корзину";
        basketButton.className = "basket-button";
        card.appendChild(basketButton);

        cardsContainer.appendChild(card);
    });

    const existingCardsContainer = document.querySelector(".container");
    if (existingCardsContainer) {
        existingCardsContainer.replaceWith(cardsContainer);
    } else {
        document.body.appendChild(cardsContainer);
    }

    const backButton = document.createElement("button");
    backButton.textContent = "Назад";
    backButton.className = "back-button";
    backButton.addEventListener("click", goBack);

    filterContainer.appendChild(backButton);

    document.addEventListener("keydown", function(event) {
        if (event.keyCode === 27) {
            goBack();
        }
    });

    filterContainer.classList.remove("hidden");
    filtersVisible = true;

    const selectedButton = filterContainer.querySelector(".filter-button[data-category='all']");
    if (selectedButton) {
        selectedButton.classList.add("selected");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const mexicoCard = document.getElementById("mexico-card");
    if (mexicoCard) {
        mexicoCard.addEventListener("click", function() {
            originalContainer = document.querySelector(".container");
            showMexicoDishes();
        });
    }
});

function showMexicoDishes() {
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    if (!filtersVisible) {
        filterContainer.classList.add("hidden");
    }

    const categories = [...new Set(dishesMexico.map(dish => dish.category))];

    const allButton = document.createElement("button");
    allButton.textContent = "Все";
    allButton.className = "filter-button";
    allButton.setAttribute("data-category", "all");
    filterContainer.appendChild(allButton);

    allButton.addEventListener("click", function () {
        filterCards("all");
    });

    categories.forEach(category => {
        const filterButton = document.createElement("button");
        filterButton.textContent = category;
        filterButton.className = "filter-button";
        filterButton.setAttribute("data-category", category);
        filterContainer.appendChild(filterButton);

        filterButton.addEventListener("click", function () {
            const category = filterButton.getAttribute("data-category");
            if (category) {
                filterCards(category);
            }
        });
    });

    const existingFilterContainer = document.querySelector(".filter-container");
    if (existingFilterContainer) {
        existingFilterContainer.replaceWith(filterContainer);
    } else {
        document.body.appendChild(filterContainer);
    }

    const cardsContainer = document.createElement("div");
    cardsContainer.className = "container";

    dishesMexico.forEach(dish => {
        const card = document.createElement("div");
        card.className = "dish-card";
        card.setAttribute("data-category", dish.category);

        const img = document.createElement("img");
        img.src = dish.image;
        img.alt = dish.name;

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.textContent = dish.name;

        const descriptionOverlay = document.createElement("div");
        descriptionOverlay.className = "description-overlay";
        descriptionOverlay.textContent = dish.description;
        descriptionOverlay.style.display = "none";

        card.addEventListener("mouseenter", function () {
            descriptionOverlay.style.display = "block";
        });

        card.addEventListener("mouseleave", function () {
            descriptionOverlay.style.display = "none";
        });

        card.appendChild(img);
        card.appendChild(overlay);
        card.appendChild(descriptionOverlay);

        const basketButton = document.createElement("button");
        basketButton.textContent = "Добавить в корзину";
        basketButton.className = "basket-button";
        card.appendChild(basketButton);

        cardsContainer.appendChild(card);
    });

    const existingCardsContainer = document.querySelector(".container");
    if (existingCardsContainer) {
        existingCardsContainer.replaceWith(cardsContainer);
    } else {
        document.body.appendChild(cardsContainer);
    }

    const backButton = document.createElement("button");
    backButton.textContent = "Назад";
    backButton.className = "back-button";
    backButton.addEventListener("click", goBack);

    filterContainer.appendChild(backButton);

    document.addEventListener("keydown", function(event) {
        if (event.keyCode === 27) {
            goBack();
        }
    });

    filterContainer.classList.remove("hidden");
    filtersVisible = true;

    const selectedButton = filterContainer.querySelector(".filter-button[data-category='all']");
    if (selectedButton) {
        selectedButton.classList.add("selected");
    }
}
