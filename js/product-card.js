// Общий шаблон карточки товара.
// Используется в catalog.js и product.js (блок Related Products).
function createProductCard(product) {
    return `
        <article class="product-card" data-id="${product.id}">
            <button class="product-card__like" type="button" aria-label="Add to wishlist"></button>
            <img class="product-card__img" src="${product.image}" alt="${product.name}">
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__price">$${product.price}</p>
            <a href="product.html?id=${product.id}" class="btn btn--filled product-card__buy">Buy Now</a>
        </article>
    `;
}

// Выводит массив товаров в контейнер
function renderProductCards(container, items) {
    container.innerHTML = items.map(createProductCard).join("");
}
