let originalContainer: HTMLElement | null = null;
let filtersVisible = false;

document.addEventListener("DOMContentLoaded", function() {
    const showCardsButton = document.querySelector(".card") as HTMLElement | null;
    if (showCardsButton) {
        showCardsButton.addEventListener("click", function() {
            originalContainer = document.querySelector(".container");
            showCards();
        });
    }
});

function showCards() {
    const filterContainer = document.createElement("div");
    filterContainer.className = "filter-container";

    if (!filtersVisible) {
        filterContainer.classList.add("hidden");
    }

    fetch('http://localhost:3000/dishes')
        .then(response => response.json())
        .then(data => {
            const dishes = data as { name: string, image: string, price: string, category: string, description: string }[];
            
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
                const cardContainer = document.createElement("div"); 
                cardContainer.className = "card-container";
            
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
            
                cardContainer.appendChild(card);
            
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
                
                cardContainer.appendChild(addToCartButton);
            
                cardsContainer.appendChild(cardContainer);
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
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
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

    const cardContainers = document.querySelectorAll(".card-container") as NodeListOf<HTMLElement>; 
    cardContainers.forEach(container => {
        const cardCategory = container.querySelector(".dish-card")?.getAttribute("data-category");
        const basketButton = container.querySelector(".add-to-cart-button") as HTMLElement; 
        if (category === "all" || !cardCategory || cardCategory === category) {
            container.style.display = "block";
            basketButton.style.display = "block";
        } else {
            container.style.display = "none";
            basketButton.style.display = "none";
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

    fetch('http://localhost:3000/americanDishes')
        .then(response => response.json())
        .then(data => {
            const americanDishes = data as { name: string, image: string, price: string, category: string, description: string }[];
            
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
                const cardContainer = document.createElement("div"); 
                cardContainer.className = "card-container";
            
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
            
                cardContainer.appendChild(card);
            
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
                
                cardContainer.appendChild(addToCartButton);
            
                cardsContainer.appendChild(cardContainer);
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
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
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

    fetch('http://localhost:3000/franceDishes')
        .then(response => response.json())
        .then(data => {
            const dishesFrance = data as { name: string, image: string, price: string, category: string, description: string }[];
            
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
                const cardContainer = document.createElement("div"); 
                cardContainer.className = "card-container";
            
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
            
                cardContainer.appendChild(card);
            
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
                
                cardContainer.appendChild(addToCartButton);
            
                cardsContainer.appendChild(cardContainer);
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
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
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

    fetch('http://localhost:3000/japanDishes')
        .then(response => response.json())
        .then(data => {
            const dishesJapan = data as { name: string, image: string, price: string, category: string, description: string }[];
            
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
                const cardContainer = document.createElement("div");
                cardContainer.className = "card-container";
            
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
            
                cardContainer.appendChild(card);
            
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
                
                cardContainer.appendChild(addToCartButton);
            
                cardsContainer.appendChild(cardContainer);
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
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
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

    fetch('http://localhost:3000/taiDishes')
        .then(response => response.json())
        .then(data => {
            const dishesTai = data as { name: string, image: string, price: string, category: string, description: string }[];
            
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
                const cardContainer = document.createElement("div");
                cardContainer.className = "card-container";
            
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
            
                cardContainer.appendChild(card);
            
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
                
                cardContainer.appendChild(addToCartButton);
            
                cardsContainer.appendChild(cardContainer);
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
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
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

    fetch('http://localhost:3000/mexicoDishes')
        .then(response => response.json())
        .then(data => {
            const dishesMexico = data as { name: string, image: string, price: string, category: string, description: string }[];
            
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
                const cardContainer = document.createElement("div"); 
                cardContainer.className = "card-container";
            
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
            
                cardContainer.appendChild(card);
            
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
                
                cardContainer.appendChild(addToCartButton);
            
                cardsContainer.appendChild(cardContainer);
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
        })
        .catch(error => console.error('Ошибка загрузки данных:', error));
}