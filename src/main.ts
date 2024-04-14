let originalContainer: HTMLElement | null = null;

const dishes = [
    { name: "Брускетта", image: "image/italydishes/brusketta.jpg", price: "250", category: "Основные блюда", description: "Ломтики обжаренного хлеба с томатами, базиликом, чесноком и оливковым маслом." },
    { name: "Канноли", image: "image/italydishes/kanoli.jpg", price: "280", category: "Десерты", description: "Хрустящие трубочки, наполненные сливочным кремом с добавлением фруктов или орехов." },
    { name: "Апероль", image: "image/italydishes/aperol.jpg", price: "200", category: "Напитки", description: "Освежающий коктейль с апельсиновым ликером, просекко и содовой, украшенный апельсиновой цедрой." },
    { name: "Спагетти карбонара", image: "image/italydishes/carbonara.jpg", price: "320", category: "Основные блюда", description: "Итальянская паста со свежими яйцами, грудинкой, сыром пармезан и перцем." },
    { name: "Эспрессо", image: "image/italydishes/espresso.jpg", price: "150", category: "Напитки", description: "Крепкий и ароматный итальянский кофе, приготовленный в классическом эспрессо." },
    { name: "Салат капрезе", image: "image/italydishes/kapreze.jpg", price: "280", category: "Основные блюда", description: "Свежие томаты, моцарелла и базилик, заправленные оливковым маслом и бальзамическим уксусом." },
    { name: "Лазанья", image: "image/italydishes/laz.jpg", price: "270", category: "Основные блюда", description: "Паста с мясным соусом, сыром моцарелла и плотным белым соусом." },
    { name: "Пицца маргарита", image: "image/italydishes/margarita.jpg", price: "380", category: "Основные блюда", description: "Традиционная итальянская пицца с томатным соусом, моцареллой и свежим базиликом." },
    { name: "Коктейль негрони", image: "image/italydishes/negroni.jpg", price: "220", category: "Напитки", description: "Крепкий коктейль на основе джина, красного вермута и кампари, украшенный апельсиновой коркой." },
    { name: "Панна котта", image: "image/italydishes/panna-kotta.jpg", price: "280", category: "Десерты", description: "Итальянский десерт из сливок, сахара и желатина, подается с фруктовым или шоколадным соусом." },
    { name: "Ризотто", image: "image/italydishes/rizotto.jpg", price: "280", category: "Основные блюда", description: "Итальянский рис, приготовленный с бульоном, сыром пармезан и добавлением различных ингредиентов." },
    { name: "Тирамису", image: "image/italydishes/tiramisu.jpg", price: "250", category: "Десерты", description: "Итальянский десерт из слоеных бисквитов, кофе, маскарпоне и какао." },
    { name: "Заварной крем", image: "image/italydishes/zavar-krem.jpg", price: "200", category: "Десерты", description: "Легкий и воздушный десерт с заварными пирожными, кремом и шоколадной глазурью." },
];

const americanDishes = [
    { name: "Чили кон карне", image: "image/americadishes/chili.jpg", price: "300₽", category: "Основные блюда", description: "Острая говяжья похлебка с фасолью и специями, подается с сыром и луком." },
    { name: "Печенье", image: "image/americadishes/coocie.jpg", price: "120₽", category: "Десерты", description: "Традиционные американские шоколадные печенья с кусочками шоколада." },
    { name: "Пиво", image: "image/americadishes/beer.jpg", price: "150₽", category: "Напитки", description: "Холодное американское пиво различных сортов." },
    { name: "Торт", image: "image/americadishes/cake.jpg", price: "250₽", category: "Десерты", description: "Пышный шоколадный торт с кремом и ягодами." },
    { name: "Чизкейк", image: "image/americadishes/cheesecake.jpg", price: "280₽", category: "Десерты", description: "Нежный чизкейк с клубничным соусом." },
    { name: "Куриные стрипсы", image: "image/americadishes/chiken.jpg", price: "270₽", category: "Основные блюда", description: "Хрустящие куриные полоски, подается с соусами на выбор." },
    { name: "Гамбургер", image: "image/americadishes/humburger.jpg", price: "350₽", category: "Основные блюда", description: "Сочный гамбургер с говяжьей котлетой, овощами и сыром." },
    { name: "Лимонад", image: "image/americadishes/lemonade.jpg", price: "100₽", category: "Напитки", description: "Освежающий лимонад с лимоном и мятой." },
    { name: "Коктейль маргарита", image: "image/americadishes/margo.jpg", price: "200₽", category: "Напитки", description: "Классический коктейль маргарита с текилой, лаймом и солью на краю бокала." },
    { name: "Макароны с сыром", image: "image/americadishes/pasta.jpg", price: "220₽", category: "Основные блюда", description: "Традиционное американское блюдо из макарон с сырным соусом." },
    { name: "Яблочный пирог", image: "image/americadishes/pie.jpg", price: "180₽", category: "Десерты", description: "Домашний яблочный пирог с корицей." },
    { name: "Ребрышки гриль", image: "image/americadishes/rebra.jpg", price: "400₽", category: "Основные блюда", description: "Сочные свиные ребрышки, запеченные на гриле и политые барбекю-соусом." },
    { name: "Говяжий стейк", image: "image/americadishes/steik.jpg", price: "500₽", category: "Основные блюда", description: "Нежный говяжий стейк, подается с жареными овощами и картофелем по-деревенски." },
];

const dishesFrance = [
    { name: "Бёф бургиньон", image: "image/francedishes/bugi.jpg", price: "450", category: "Основные блюда", description: "Традиционное блюдо из говядины, тушеной в красном вине с овощами и специями." },
    { name: "Кок-о-вен", image: "image/francedishes/coco.jpg", price: "380", category: "Основные блюда", description: "Ароматное блюдо из курицы, приготовленное в кокосовом молоке с пряностями." },
    { name: "Утиное конфи", image: "image/francedishes/confit.jpg", price: "550", category: "Основные блюда", description: "Нежное утиное мясо, тушеное в собственном жире до готовности, подается с жареным картофелем." },
    { name: "Круассан", image: "image/francedishes/croissant.jpg", price: "100", category: "Десерты", description: "Пышная французская выпечка из слоеного теста, идеально подходит для завтрака." },
    { name: "Коньяк", image: "image/francedishes/cognac.jpg", price: "350", category: "Напитки", description: "Высококачественный французский коньяк, наслаждение для ценителей." },
    { name: "Карри по-французски", image: "image/francedishes/karri.jpg", price: "400", category: "Основные блюда", description: "Ароматное блюдо с курицей и овощами, приправленное нежным карри." },
    { name: "Крепы", image: "image/francedishes/krep.jpg", price: "200", category: "Десерты",  description: "Традиционные французские блины, подается с различными начинками и соусами." },
    { name: "Макарон", image: "image/francedishes/makaron.jpg", price: "180", category: "Десерты", description: "Изысканные французские десертные пирожные с различными вкусовыми наполнителями." },
    { name: "Раклет", image: "image/francedishes/raclette.jpg", price: "600", category: "Основные блюда", description: "Традиционное блюдо из расплавленного сыра, подаваемое с картофелем и ветчиной." },
    { name: "Шампанское", image: "image/francedishes/shamp.jpg", price: "800", category: "Напитки", description: "Изысканный французский шампанское для особенных случаев." },
    { name: "Тарт", image: "image/francedishes/tart.jpg", price: "250", category: "Десерты", description: "Аппетитный французский пирог с начинкой из фруктов или крема." },
    { name: "Вино", image: "image/francedishes/wine.jpg", price: "500", category: "Напитки", description: "Широкий выбор французских вин различных сортов и сортов." },
    { name: "Устрицы", image: "image/francedishes/ystrica.jpg", price: "1200", category: "Основные блюда", description: "Свежие французские устрицы, идеальное дополнение к аперитиву." },
];

const dishesJapan = [
    { name: "Рамен", image: "image/japandishes/ramen.jpg", price: "350", category: "Основные блюда", description: "Популярное японское блюдо, состоящее из мясного бульона, лапши, мяса, яйца и овощей." },
    { name: "Дораяки", image: "image/japandishes/doraiaki.jpg", price: "150", category: "Десерты", description: "Традиционные японские пирожки, состоящие из двух слоев пышного блинчика с начинкой из красного варенья." },
    { name: "Мочи", image: "image/japandishes/mochi.jpg", price: "200", category: "Десерты", description: "Клейкие рисовые пирожки, обычно наполненные сладким начинком и покрытые порошком из риса." },
    { name: "Карбонара", image: "image/japandishes/tako.jpg", price: "400", category: "Десерты", description: "Жареные кальмары, обычно подаются с соусом тар-тар и лимоном." },
    { name: "Саке", image: "image/japandishes/sake.jpg", price: "600", category: "Напитки", description: "Традиционный японский рисовый алкоголь, который может быть подаваться как горячим, так и холодным." },
    { name: "Сашими", image: "image/japandishes/sashimi.jpg", price: "700", category: "Основные блюда", description: "Тонко нарезанные свежие рыбные ломтики, обычно подаются без приправы." },
    { name: "Суши", image: "image/japandishes/suchi.jpg", price: "800", category: "Основные блюда", description: "Рисовые рулеты с начинкой из морепродуктов, овощей или мяса, часто подаются с соевым соусом и васаби." },
    { name: "Тайяки", image: "image/japandishes/tayaki.jpg", price: "250", category: "Десерты", description: "Традиционные японские кексики в форме рыбы, наполненные сладкой начинкой, как правило, анко (паста из сладкой адзуки)." },
    { name: "Зелёный чай", image: "image/japandishes/tea.jpg", price: "100", category: "Напитки", description: "Традиционный японский напиток, богатый антиоксидантами и имеющий освежающий вкус." },
    { name: "Темпура", image: "image/japandishes/tempura.jpg", price: "600", category: "Основные блюда", description: "Легкие и хрустящие кусочки мяса, морепродуктов или овощей, обваленные в тесте и обжаренные во фритюре." },
    { name: "Тонкацу", image: "image/japandishes/tonkacu.jpg", price: "550", category: "Основные блюда", description: "Жареные свиные отбивные, подаются с соусом тонкацу и молотым белым кунжутом." },
    { name: "Удон", image: "image/japandishes/udon.jpg", price: "400", category: "Основные блюда", description: "Традиционные японские лапша из пшеничной муки, обычно подаются в горячем бульоне с различными добавками." },
    { name: "Умешу", image: "image/japandishes/umeshu.jpg", price: "350", category: "Напитки", description: "Сладкий японский алкоголь, изготовленный из слив, который часто подают в качестве десерта." },
];

const dishesMexico = [
    { name: "Энчилада", image: "image/mexicodishes/enchi.jpg", price: "450", category: "Основные блюда", description: "Традиционное мексиканское блюдо, состоящее из тортильи, начиненной мясом, сыром и соусом." },
    { name: "Арроз кон пойо", image: "image/mexicodishes/arroz.jpg", price: "250", category: "Десерты", description: "Мексиканский рис с курицей, приправленный специями и травами." },
    { name: "Мексиканское пиво", image: "image/mexicodishes/beer.jpg", price: "200", category: "Напитки", description: "Популярные мексиканские марки пива, такие как Corona и Dos Equis." },
    { name: "Чуррос", image: "image/mexicodishes/churros.jpg", price: "150", category: "Десерты", description: "Кружевные палочки из теста, обычно посыпанные коричневым сахаром и подаваемые с шоколадным соусом." },
    { name: "Фада", image: "image/mexicodishes/fada.jpg", price: "400", category: "Основные блюда", description: "Традиционный мексиканский десерт, состоящий из сладкого крема, слоёв печенья и фруктов." },
    { name: "Флан", image: "image/mexicodishes/flan.jpg", price: "300", category: "Десерты", description: "Мексиканский карамельный пудинг, приготовленный на основе яиц, молока и сахара." },
    { name: "Гуакамоле", image: "image/mexicodishes/guakamole.jpg", price: "350", category: "Основные блюда", description: "Популярное мексиканское блюдо, приготовленное из авокадо, лимонного сока, лука, помидоров и специй." },
    { name: "Орчата", image: "image/mexicodishes/horhata.jpg", price: "180", category: "Напитки", description: "Мексиканский напиток, приготовленный из орехов тигрового ореха, риса, корицы и ванили." },
    { name: "Кесадилья", image: "image/mexicodishes/kessa.jpg", price: "300", category: "Основные блюда", description: "Мексиканский перепелёнок, обычно с сыром, мясом или овощами, завёрнутый в тортилью и обжаренный на сковороде." },
    { name: "Позоле", image: "image/mexicodishes/pozole.jpg", price: "400", category: "Основные блюда", description: "Традиционный мексиканский суп с кукурузой, мясом, специями и другими ингредиентами." },
    { name: "Такос", image: "image/mexicodishes/takos.jpg", price: "250", category: "Основные блюда", description: "Традиционные мексиканские тортильи, начиненные мясом, овощами и соусами." },
    { name: "Трес лечес", image: "image/mexicodishes/tres.jpg", price: "280", category: "Десерты", description: "Мексиканский десерт, состоящий из трёх молочных сладостей: конденсированного молока, сгущённого молока и крема." },
];

const dishesTai = [
    { name: "Пад-тай", image: "image/taidishes/pad.jpg", price: "400", category: "Основные блюда", description: "Тайское блюдо, состоящее из обжаренных лапши с курицей, креветками или твердым тофу, приправленных соусом тамаринд, рыбным соусом, кунжутом, чесноком, красным перцем и яйцом." },
    { name: "Тапиока", image: "image/taidishes/pud.jpg", price: "250", category: "Десерты", description: "Традиционный десерт, приготовленный из тапиоки, молока и сахара, обычно подаётся с кокосовым молоком и фруктами." },
    { name: "Кокосовый сок", image: "image/taidishes/kokos.jpg", price: "150", category: "Напитки", description: "Свежий сок, который извлекается из зеленых или спелых кокосов, популярный напиток в Таиланде." },
    { name: "Пад Кра Пао", image: "image/taidishes/krapao.jpg", price: "450", category: "Основные блюда", description: "Тайское блюдо из обжаренного мяса (обычно свинины, курицы или морепродуктов) с баклажанами, базиликом, чесноком, острый перцем и соусом ойстер." },
    { name: "Лемонграсс", image: "image/taidishes/lemon.jpg", price: "180", category: "Напитки", description: "Ароматный и освежающий напиток, приготовленный из лимонной травы, обычно подается холодным." },
    { name: "Лаап", image: "image/taidishes/liovan.jpg", price: "350", category: "Основные блюда", description: "Тайское мясное блюдо, приготовленное из нарезанного мяса (обычно свинины, курицы или утки) с лимонным соком, рисовым порошком, ростками лука и острым перцем." },
    { name: "Рис с манго", image: "image/taidishes/mango.jpg", price: "280", category: "Десерты", description: "Традиционный тайский десерт, состоящий из сладкого клейкого риса, который подаётся с нарезанным спелым манго и поливается кокосовым молоком." },
    { name: "Роти", image: "image/taidishes/roti.jpg", price: "200", category: "Десерты", description: "Тайское блюдо, похожее на лепёшку, обычно подается с сладкими начинками, такими как бананы, шоколад или сгущенное молоко." },
    { name: "Сом Там", image: "image/taidishes/somtam.jpg", price: "380", category: "Основные блюда", description: "Традиционный тайский салат, приготовленный из свежих овощей (обычно папайи), помидоров, зеленых фасолей, лимонного сока, рыбного соуса, чеснока, острого перца и орехов." },
    { name: "Тайский синий чай", image: "image/taidishes/tai.jpg", price: "220", category: "Напитки", description: "Традиционный тайский чай, приготовленный из сушеных клубней цветка бора́жника, имеющий голубоватый оттенок." },
    { name: "Том ям", image: "image/taidishes/tomiam.jpg", price: "420", category: "Основные блюда", description: "Традиционный тайский суп на основе кокосового молока, лимонной травы, листьев кафрского лайма, галангала, острого перца и морепродуктов или мяса." },
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
}
