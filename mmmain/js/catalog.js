// 1. Находим на странице коробку для товаров по её id
const list = document.getElementById("catalog-list");

// 2. Сюда будем складывать HTML всех карточек
let html = "";

// 3. Берём каждый товар по очереди и делаем из него карточку
for (const product of products) {
    html += `
        <article class="product-card" data-id="${product.id}">
            <button class="product-card__like" type="button" aria-label="Add to wishlist"></button>
            <img class="product-card__img" src="${product.image}" alt="${product.name}">
            <h3 class="product-card__name">${product.name}</h3>
            <p class="product-card__price">$${product.price}</p>
            <a href="product.html?id=${product.id}" class="btn btn--filled product-card__buy">Buy Now</a>
        </article>
    `;
}

// 4. Кладём все карточки в коробку — они появляются на странице
list.innerHTML = html;
