document.addEventListener("DOMContentLoaded", function() {
    const basketLink: HTMLElement | null = document.querySelector('.basket-link');
    const modal: HTMLElement | null = document.getElementById('myModal');
    const closeBtn: HTMLElement | null = document.querySelector('.close');

    if (basketLink && modal && closeBtn) {
        basketLink.addEventListener('click', (event: Event) => {
            event.preventDefault(); 
            if (modal.style) {
                modal.style.display = 'block'; 
            }
        });

        closeBtn.addEventListener('click', () => {
            if (modal.style) {
                modal.style.display = 'none';
            }
        });
    }
});

const basketItemsContainer = document.querySelector('.basket-items');

function addToBasket(dish: any) {
    const basketItem = document.createElement('div');
    basketItem.classList.add('basket-item');

    const itemName = document.createElement('span');
    itemName.textContent = dish.name;
    basketItem.appendChild(itemName);

    const itemPrice = document.createElement('span');
    itemPrice.textContent = `${dish.price} руб.`;
    basketItem.appendChild(itemPrice);

    const quantityControl = document.createElement('div');
    quantityControl.classList.add('quantity-control');

    const decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.addEventListener('click', () => {
        decreaseQuantity(itemPrice, dish.price);
    });
    quantityControl.appendChild(decreaseButton);

    const quantityDisplay = document.createElement('span');
    quantityDisplay.textContent = '1'; 
    quantityControl.appendChild(quantityDisplay);

    const increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.addEventListener('click', () => {
        increaseQuantity(itemPrice, dish.price);
    });
    quantityControl.appendChild(increaseButton);

    basketItem.appendChild(quantityControl);

    basketItemsContainer?.appendChild(basketItem);

    updateTotalPrice(dish.price);
}

function decreaseQuantity(itemPriceElement: HTMLElement, price: number) {
    const currentQuantity = parseInt(itemPriceElement.nextElementSibling?.textContent || '0');
    if (currentQuantity > 1) {
        itemPriceElement.nextElementSibling!.textContent = (currentQuantity - 1).toString();
        updateTotalPrice(-price);
    }
}

function increaseQuantity(itemPriceElement: HTMLElement, price: number) {
    const currentQuantity = parseInt(itemPriceElement.nextElementSibling?.textContent || '0');
    itemPriceElement.nextElementSibling!.textContent = (currentQuantity + 1).toString();
    updateTotalPrice(price);
}

function updateTotalPrice(priceChange: number) {
    const totalPriceElement = document.getElementById('total-price');
    const currentTotal = parseInt(totalPriceElement?.textContent || '0');
    const newTotal = currentTotal + priceChange;
    totalPriceElement!.textContent = newTotal.toString();
}

