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
