document.addEventListener("DOMContentLoaded", function() {
    const basketLink = document.querySelector('.basket-link');
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');

    if (basketLink && modal && closeBtn) {
        basketLink.addEventListener('click', handleBasketLinkClick);
        closeBtn.addEventListener('click', handleCloseButtonClick);
    }

    let basketItemsContainer: HTMLElement | null = document.querySelector('.basket-items');
    if (!basketItemsContainer) {
        basketItemsContainer = createBasketItemsContainer();
        document.body.appendChild(basketItemsContainer);
    }

    const storedBasketItems = localStorage.getItem('basketItems');
    if (storedBasketItems) {
        initializeBasketFromStorage(storedBasketItems);
    }
});

function handleBasketLinkClick(event: Event) {
    event.preventDefault();
    const modal = document.getElementById('myModal');
    if (modal && modal.style) {
        modal.style.display = 'block';
        toggleCheckoutAndClearButtonsVisibility();
    }
}

function handleCloseButtonClick() {
    const modal = document.getElementById('myModal');
    if (modal && modal.style) {
        modal.style.display = 'none';
    }
}

function createBasketItemsContainer(): HTMLElement {
    const basketItemsContainer = document.createElement('div');
    basketItemsContainer.classList.add('basket-items');
    return basketItemsContainer;
}

function initializeBasketFromStorage(storedBasketItems: string) {
    const basketItemsContainer = document.querySelector('.basket-items');
    if (basketItemsContainer) {
        basketItemsContainer.innerHTML = storedBasketItems;
        updateBasket();
    }
}

function attachQuantityEventHandlers() {
    const increaseButtons = document.querySelectorAll('.quantity-counter button:last-child');
    const decreaseButtons = document.querySelectorAll('.quantity-counter button:first-child');

    increaseButtons.forEach(button => {
        button.addEventListener('click', handleIncreaseButtonClick);
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', handleDecreaseButtonClick);
    });
}

function handleIncreaseButtonClick(this: HTMLElement) {
    const quantityDisplay = this.parentNode?.querySelector('span');
    if (quantityDisplay) {
        const pricePerItem = parseFloat(this.closest('.basket-item')?.getAttribute('data-price-per-item')!);
        increaseQuantity(quantityDisplay, pricePerItem);
    }
}

function handleDecreaseButtonClick(this: HTMLElement) {
    const quantityDisplay = this.parentNode?.querySelector('span');
    if (quantityDisplay) {
        const pricePerItem = parseFloat(this.closest('.basket-item')?.getAttribute('data-price-per-item')!);
        decreaseQuantity(quantityDisplay, pricePerItem);
    }
}

function updateBasket() {
    updateTotalPriceFromItems();
    toggleCheckoutAndClearButtonsVisibility();
    updateBasketCount();
    attachQuantityEventHandlers();
}

function toggleCheckoutAndClearButtonsVisibility() {
    const basketItems = document.querySelectorAll('.basket-item');
    const clearBasketButton = document.querySelector('.clear-basket-button');
    const checkoutButton = document.querySelector('.checkout-button');

    if (basketItems.length === 0) {
        clearBasketButton?.classList.add('fade-out');
        checkoutButton?.classList.add('fade-out');
    } else {
        clearBasketButton?.classList.remove('fade-out');
        checkoutButton?.classList.remove('fade-out');
    }
}

function addToBasket(dish: { name: string; image: string; price: string }) {
    const basketItemsContainer = document.querySelector('.basket-items');

    if (basketItemsContainer) {
        const existingBasketItem = Array.from(basketItemsContainer.children).find(item =>
            (item.querySelector('.item-name') as HTMLElement)?.textContent === dish.name
        );

        if (existingBasketItem) {
            updateExistingBasketItem(existingBasketItem, parseFloat(dish.price));
        } else {
            createNewBasketItem(dish);
        }
        updateBasket();
        updateLocalStorage();
    }
}

function updateExistingBasketItem(existingBasketItem: Element, pricePerItem: number) {
    const quantityDisplay = existingBasketItem.querySelector('.quantity-counter span');
    if (quantityDisplay) {
        const currentQuantity = parseInt(quantityDisplay.textContent || '0');
        quantityDisplay.textContent = (currentQuantity + 1).toString();
    }
    const totalPriceElement = existingBasketItem.querySelector('.total-price');
    if (totalPriceElement) {
        const currentTotal = parseFloat(totalPriceElement.textContent!.replace('Общая стоимость: ', '').replace(' ₽', ''));
        const newTotal = currentTotal + parseFloat(pricePerItem.toString());
        totalPriceElement.textContent = `Общая стоимость: ${newTotal.toFixed(0)} ₽`;
    }
}

function createNewBasketItem(dish: { name: string; image: string; price: string }) {
    const basketItemsContainer = document.querySelector('.basket-items');
    if (basketItemsContainer) {
        const basketItem = document.createElement('div');
        basketItem.classList.add('basket-item');
        basketItem.setAttribute('data-price-per-item', dish.price);

        const itemImage = document.createElement('img');
        itemImage.src = dish.image;
        itemImage.alt = dish.name;
        itemImage.width = 120;
        itemImage.height = 80;
        basketItem.appendChild(itemImage);

        const itemName = document.createElement('div');
        itemName.classList.add('item-name');
        itemName.textContent = dish.name;
        basketItem.appendChild(itemName);

        const quantityCounter = document.createElement('div');
        quantityCounter.classList.add('quantity-counter');

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', handleDecreaseButtonClick);
        quantityCounter.appendChild(decreaseButton);

        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = '1';
        quantityCounter.appendChild(quantityDisplay);

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', handleIncreaseButtonClick);
        quantityCounter.appendChild(increaseButton);

        basketItem.appendChild(quantityCounter);

        const priceInfo = document.createElement('div');
        priceInfo.classList.add('price-info');

        const pricePerItemElement = document.createElement('div');
        pricePerItemElement.textContent = `Цена за 1 единицу: ${dish.price} ₽`;
        priceInfo.appendChild(pricePerItemElement);

        const totalPriceElement = document.createElement('div');
        totalPriceElement.classList.add('total-price');
        totalPriceElement.textContent = `Общая стоимость: ${dish.price} ₽`;
        priceInfo.appendChild(totalPriceElement);

        basketItem.appendChild(priceInfo);

        basketItemsContainer.appendChild(basketItem);
    }
}

function updateLocalStorage() {
    const basketItems = document.querySelectorAll('.basket-item');
    const serializedBasketItems = Array.from(basketItems).map(item => item.outerHTML).join('');
    localStorage.setItem('basketItems', serializedBasketItems);
}

function increaseQuantity(quantityDisplay: HTMLElement, pricePerItem: number) {
    const currentQuantity = parseInt(quantityDisplay.textContent || '0');
    quantityDisplay.textContent = (currentQuantity + 1).toString();
    const totalPriceElement = quantityDisplay.closest('.basket-item')?.querySelector('.total-price');
    if (totalPriceElement) {
        const currentTotal = parseFloat(totalPriceElement.textContent!.replace('Общая стоимость: ', '').replace(' ₽', ''));
        totalPriceElement.textContent = `Общая стоимость: ${(currentTotal + pricePerItem).toFixed(0)} ₽`;
    }
    updateTotalPrice(pricePerItem);
    updateBasketCount();
    updateLocalStorage(); 
}

function decreaseQuantity(quantityDisplay: HTMLElement, pricePerItem: number) {
    const currentQuantity = parseInt(quantityDisplay.textContent || '0');
    if (currentQuantity > 1) {
        quantityDisplay.textContent = (currentQuantity - 1).toString();
        const totalPriceElement = quantityDisplay.closest('.basket-item')?.querySelector('.total-price');
        if (totalPriceElement) {
            const currentTotal = parseFloat(totalPriceElement.textContent!.replace('Общая стоимость: ', '').replace(' ₽', ''));
            totalPriceElement.textContent = `Общая стоимость: ${(currentTotal - pricePerItem).toFixed(0)} ₽`;
        }
        updateTotalPrice(-pricePerItem);
        updateBasketCount();
        updateLocalStorage();
    } else {
        const basketItem = quantityDisplay.closest('.basket-item');
        if (basketItem) {
            basketItem.classList.add('fade-out');
            setTimeout(() => {
                basketItem.remove();
                toggleCheckoutAndClearButtonsVisibility();
                updateBasketCount();
                updateLocalStorage();
            }, 300);
        }
        updateTotalPrice(-pricePerItem);
    }
}

function updateTotalPriceFromItems() {
    let totalPrice = 0;
    const basketItems = document.querySelectorAll('.basket-item');
    basketItems.forEach(item => {
        const totalPriceElement = item.querySelector('.total-price');
        if (totalPriceElement) {
            totalPrice += parseFloat(totalPriceElement.textContent!.replace('Общая стоимость: ', '').replace(' ₽', ''));
        }
    });
    const totalPriceElement = document.getElementById('total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = totalPrice.toString();
    }
}

function updateBasketCount() {
    const basketItems = document.querySelectorAll('.basket-item');
    let totalCount = 0;
    basketItems.forEach(item => {
        const quantityDisplay = item.querySelector('.quantity-counter span');
        if (quantityDisplay) {
            totalCount += parseInt(quantityDisplay.textContent || '0');
        }
    });
    const basketCountElement = document.querySelector('.basket-count');
    if (basketCountElement) {
        basketCountElement.textContent = totalCount.toString();
    }
}

function updateTotalPrice(priceChange: number) {
    const totalPriceElement = document.getElementById('total-price');
    const currentTotal = parseInt(totalPriceElement?.textContent || '0');
    const newTotal = currentTotal + priceChange;
    totalPriceElement!.textContent = newTotal.toString();
}

function clearBasket() {
    const basketItemsContainer = document.querySelector('.basket-items');
    const totalPriceElement = document.getElementById('total-price');

    if (basketItemsContainer) {
        const basketItems = basketItemsContainer.querySelectorAll('.basket-item');
        basketItems.forEach(item => {
            item.classList.add('fade-out');
        });

        setTimeout(() => {
            basketItemsContainer.innerHTML = '';
            localStorage.removeItem('basketItems');
            toggleCheckoutAndClearButtonsVisibility();
        }, 300); 
    }

    if (totalPriceElement) {
        totalPriceElement.textContent = '0';
    }

    const basketCountElement = document.querySelector('.basket-count');
    if (basketCountElement) {
        basketCountElement.textContent = '0';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const clearBasketButton = document.querySelector('.clear-basket-button');
    if (clearBasketButton) {
        clearBasketButton.addEventListener('click', function() {
            clearBasket();
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            alert('Ваш заказ успешно оформлен!');
            clearBasket();
            toggleCheckoutAndClearButtonsVisibility();
        });
    }
});