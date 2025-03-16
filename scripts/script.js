const tabButtons = document.querySelectorAll('.tab__button');

tabButtons.forEach(tabButton => {
    tabButton.addEventListener('click', () => {
        tabButtons.forEach(button => {
            button.classList.remove('tab__button-active');
            button.style.backgroundColor = '';
        });

        tabButton.classList.add('tab__button-active');

        const borderColor = getComputedStyle(tabButton).borderColor;
        tabButton.style.backgroundColor = borderColor;
    });
});
