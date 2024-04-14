document.addEventListener("DOMContentLoaded", function() {
    const basketLink = document.querySelector('.basket-link');
    const modal = document.getElementById('myModal');
    const closeBtn = document.querySelector('.close');

    if (basketLink && modal && closeBtn) {
        basketLink.addEventListener('click', (event) => {
            event.preventDefault();
            if (modal.style) {
                modal.style.display = 'block';
                toggleCheckoutAndClearButtonsVisibility();
            }
        });

        closeBtn.addEventListener('click', () => {
            if (modal.style) {
                modal.style.display = 'none';
            }
        });
    }

    let basketItemsContainer = document.querySelector('.basket-items');
    if (!basketItemsContainer) {
        basketItemsContainer = document.createElement('div');
        basketItemsContainer.classList.add('basket-items');
        document.body.appendChild(basketItemsContainer);
    }

    const storedBasketItems = localStorage.getItem('basketItems');
    if (storedBasketItems) {
        basketItemsContainer.innerHTML = storedBasketItems;
        updateTotalPrice(0);
        toggleCheckoutAndClearButtonsVisibility();
        updateBasketCount();
        updateTotalPriceFromItems();
        attachQuantityEventHandlers();
    }
});

function attachQuantityEventHandlers() {
    const increaseButtons = document.querySelectorAll('.quantity-counter button:last-child');
    const decreaseButtons = document.querySelectorAll('.quantity-counter button:first-child');

    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const quantityDisplay = button.parentNode?.querySelector('span');
            if (quantityDisplay) {
                const pricePerItem = parseFloat(button.closest('.basket-item')?.getAttribute('data-price-per-item')!);
                increaseQuantity(quantityDisplay, pricePerItem);
            }
        });
    });

    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const quantityDisplay = button.parentNode?.querySelector('span');
            if (quantityDisplay) {
                const pricePerItem = parseFloat(button.closest('.basket-item')?.getAttribute('data-price-per-item')!);
                decreaseQuantity(quantityDisplay, pricePerItem);
            }
        });
    });
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

function toggleCheckoutAndClearButtonsVisibility() {
    const basketItems = document.querySelectorAll('.basket-item');
    const clearBasketButton = document.querySelector('.clear-basket-button');
    const checkoutButton = document.querySelector('.checkout-button');

    if (basketItems.length === 0) {
        if (clearBasketButton) {
            clearBasketButton.classList.add('fade-out');
        }
        if (checkoutButton) {
            checkoutButton.classList.add('fade-out');
        }
    } else {
        if (clearBasketButton) {
            clearBasketButton.classList.remove('fade-out');
        }
        if (checkoutButton) {
            checkoutButton.classList.remove('fade-out');
        }
    }
}


const basketItemsContainer = document.querySelector('.basket-items');

function addToBasket(dish: any) {
    const basketItemsContainer = document.querySelector('.basket-items');

    if (basketItemsContainer) {
        const existingBasketItem = Array.from(basketItemsContainer.children).find((item: any) => {
            return item.querySelector('.item-name')?.textContent === dish.name;
        });

        if (existingBasketItem) {
            const quantityDisplay = existingBasketItem.querySelector('.quantity-counter span');
            if (quantityDisplay) {
                const currentQuantity = parseInt(quantityDisplay.textContent || '0');
                quantityDisplay.textContent = (currentQuantity + 1).toString();
            }
            const totalPriceElement = existingBasketItem.querySelector('.total-price');
            if (totalPriceElement) {
                const currentTotal = parseFloat(totalPriceElement.textContent!.replace('Общая стоимость: ', '').replace(' ₽', ''));
                const newTotal = currentTotal + parseFloat(dish.price);
                totalPriceElement.textContent = `Общая стоимость: ${newTotal.toFixed(0)} ₽`;
            }
            updateTotalPrice(parseFloat(dish.price));
        } else {
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
            decreaseButton.addEventListener('click', () => {
                decreaseQuantity(quantityDisplay, parseFloat(dish.price));
            });
            quantityCounter.appendChild(decreaseButton);

            const quantityDisplay = document.createElement('span');
            quantityDisplay.textContent = '1';
            quantityCounter.appendChild(quantityDisplay);

            const increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            increaseButton.addEventListener('click', () => {
                increaseQuantity(quantityDisplay, parseFloat(dish.price));
            });
            quantityCounter.appendChild(increaseButton);

            basketItem.appendChild(quantityCounter);

            const priceInfo = document.createElement('div');
            priceInfo.classList.add('price-info');
            
            const pricePerItem = document.createElement('div');
            pricePerItem.textContent = `Цена за 1 единицу: ${dish.price} ₽`;
            priceInfo.appendChild(pricePerItem);

            const totalPrice = document.createElement('div');
            totalPrice.classList.add('total-price');
            totalPrice.textContent = `Общая стоимость: ${dish.price} ₽`;
            priceInfo.appendChild(totalPrice);

            basketItem.appendChild(priceInfo);
            basketItemsContainer.appendChild(basketItem);
            updateTotalPrice(parseFloat(dish.price));
            localStorage.setItem('basketItems', basketItemsContainer.innerHTML);
            localStorage.setItem(dish.name + '-quantity', '1');
        }
        updateBasketCount();
    }
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