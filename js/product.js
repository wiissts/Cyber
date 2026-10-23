// ============================================================
// Детальная страница товара: product.html?id=N
// Зависит от: products.js (данные), product-card.js (карточки)
// ============================================================

// 1. Достаём id из адресной строки и ищем товар в моковых данных
const params = new URLSearchParams(window.location.search);
const productId = Number(params.get("id"));
const product = products.find((item) => item.id === productId);

// 2. Если товара нет — показываем сообщение вместо страницы
if (!product) {
    renderNotFound();
} else {
    renderProductPage(product);
}

// ------------------------------------------------------------
// Страница "товар не найден"
// ------------------------------------------------------------
function renderNotFound() {
    document.title = "Product not found";
    document.querySelector("main").innerHTML = `
        <section class="product-info">
            <div class="product-info__inner" style="flex-direction: column; align-items: center; text-align: center; gap: 24px; padding: 80px 0;">
                <h1 class="product-info__title">Product not found</h1>
                <p>The product with id "${params.get("id") ?? ""}" does not exist.</p>
                <a href="catalog.html" class="btn btn--filled">Back to catalog</a>
            </div>
        </section>
    `;
}

// ------------------------------------------------------------
// Сборка всей страницы
// ------------------------------------------------------------
function renderProductPage(product) {
    document.title = product.name;

    renderBreadcrumbs(product);
    renderInfo(product);
    renderDetails(product);
    renderReviews(product);
    renderRelated(product);

    initColors(product);
    initMemory();
}

// ------------------------------------------------------------
// Хлебные крошки
// ------------------------------------------------------------
function renderBreadcrumbs(product) {
    document.getElementById("breadcrumb-category").textContent = product.category;
    document.getElementById("breadcrumb-brand").textContent = product.brand;
    document.getElementById("breadcrumb-current").textContent = product.model;
}

// ------------------------------------------------------------
// Блок с галереей, ценой, цветами, памятью, характеристиками
// ------------------------------------------------------------
function renderInfo(product) {
    const defaultColor =
        product.colors.find((color) => color.name === product.defaultColor) || product.colors[0];

    const colors = product.colors
        .map(
            (color) => `
            <li>
                <button class="colors__item ${color.name === defaultColor.name ? "colors__item--active" : ""}" type="button" style="--color: ${color.hex}" aria-label="${color.name}" data-color="${color.name}"></button>
            </li>`
        )
        .join("");

    const memory = product.memory
        .map(
            (option) => `
            <li class="memory__option">
                <button class="memory__item ${option.label === product.defaultMemory ? "memory__item--active" : ""}" type="button" ${option.disabled ? "disabled" : ""}>${option.label}</button>
            </li>`
        )
        .join("");

    const oldPrice = product.oldPrice ? `<s class="product-info__old-price">$${product.oldPrice}</s>` : "";

    const s = product.specs;
    const specs = [
        ["spec-screen.png", "Screen size", s.screen],
        ["spec-cpu.png", "CPU", s.cpu],
        ["spec-cores.png", "Number of Cores", s.cores],
        ["spec-main-camera.png", "Main camera", s.mainCamera],
        ["spec-front-camera.png", "Front-camera", s.frontCamera],
        ["spec-battery.png", "Battery capacity", s.battery],
    ]
        .map(
            ([icon, name, value]) => `
            <li class="specs__item">
                <img class="specs__icon" src="./img/${icon}" alt="">
                <p class="specs__text"><span class="specs__name">${name}</span><span class="specs__value">${value}</span></p>
            </li>`
        )
        .join("");

    document.getElementById("product-info").innerHTML = `
        <div class="gallery">
            <ul class="gallery__thumbs"></ul>
            <img class="gallery__main" id="gallery-main" src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-info__content">
            <div class="product-info__head">
                <h1 class="product-info__title">${product.name}</h1>
                <div class="product-info__prices">
                    <p class="product-info__price">$${product.price}</p>
                    ${oldPrice}
                </div>
            </div>

            <div class="colors">
                <p class="colors__label">Select color :</p>
                <ul class="colors__list">${colors}</ul>
            </div>

            <ul class="memory">${memory}</ul>

            <ul class="specs">${specs}</ul>

            <p class="product-info__description">${product.description}
                <a class="product-info__more" href="#details">more...</a></p>

            <div class="product-info__actions">
                <button class="btn product-info__btn" type="button">Add to Wishlist</button>
                <button class="btn btn--filled product-info__btn" type="button" data-add-to-cart="${product.id}">Add to Cart</button>
            </div>

            <ul class="features">
                <li class="features__item">
                    <span class="features__icon-box"><img class="features__icon" src="./img/feature-delivery.png" alt=""></span>
                    <p class="features__text">Free Delivery <span class="features__value">1-2 day</span></p>
                </li>
                <li class="features__item">
                    <span class="features__icon-box"><img class="features__icon" src="./img/feature-stock.png" alt=""></span>
                    <p class="features__text">In Stock <span class="features__value">Today</span></p>
                </li>
                <li class="features__item">
                    <span class="features__icon-box"><img class="features__icon" src="./img/feature-guarantee.png" alt=""></span>
                    <p class="features__text">Guaranteed <span class="features__value">1 year</span></p>
                </li>
            </ul>
        </div>
    `;

    // Фото берём из набора выбранного цвета (если у цвета набора нет — из product.image)
    renderGallery((defaultColor && defaultColor.images) || [product.image]);
}

// ------------------------------------------------------------
// Блок Details (описание + таблицы характеристик)
// ------------------------------------------------------------
function renderDetailsGroup(title, rows) {
    const html = rows
        .map(([name, value]) => {
            const text = Array.isArray(value) ? value.join("<br>") : value;
            return `
                <div class="details__row">
                    <dt class="details__name">${name}</dt>
                    <dd class="details__value">${text}</dd>
                </div>`;
        })
        .join("");

    return `
        <div class="details__group">
            <h3 class="details__subtitle">${title}</h3>
            <dl class="details__list">${html}</dl>
        </div>`;
}

function renderDetails(product) {
    document.getElementById("product-details").innerHTML = `
        <div class="details__content">
            <h2 class="product-section-title">Details</h2>
            <p class="details__text">${product.longDescription}</p>

            <div class="details__groups">
                ${renderDetailsGroup("Screen", product.details.screen)}
                ${renderDetailsGroup("CPU", product.details.cpu)}
            </div>

            <button class="more-btn details__more" type="button">
                View More
                <svg class="more-btn__icon" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    `;
}

// ------------------------------------------------------------
// Блок Reviews (рейтинг товара + общие моковые отзывы)
// ------------------------------------------------------------
function renderReviews(product) {
    const labels = ["Excellent", "Good", "Average", "Below Average", "Poor"];
    const counts = product.rating.counts;
    const total = counts.reduce((sum, n) => sum + n, 0);
    const max = Math.max(...counts);

    const bars = labels
        .map(
            (label, index) => `
            <li class="rating-bars__item">
                <span class="rating-bars__label">${label}</span>
                <span class="rating-bars__track"><span class="rating-bars__fill" style="--fill: ${Math.round((counts[index] / max) * 95)}%"></span></span>
                <span class="rating-bars__count">${counts[index]}</span>
            </li>`
        )
        .join("");

    const reviewItems = reviews
        .map((review) => {
            const photos = review.photos
                ? `<div class="review__photos">${review.photos
                      .map((src, i) => `<img class="review__photo" src="${src}" alt="Customer photo ${i + 1}">`)
                      .join("")}</div>`
                : "";

            return `
            <li class="review">
                <img class="review__avatar" src="${review.avatar}" alt="">
                <div class="review__content">
                    <div class="review__head">
                        <h3 class="review__author">${review.author}</h3>
                        <time class="review__date" datetime="${review.date}">${review.dateText}</time>
                    </div>
                    <img class="review__stars" src="./img/stars-${review.stars}.png" alt="${review.stars} out of 5">
                    <p class="review__text">${review.text}</p>
                    ${photos}
                </div>
            </li>`;
        })
        .join("");

    document.getElementById("product-reviews").innerHTML = `
        <h2 class="product-section-title">Reviews</h2>

        <div class="reviews__overall">
            <div class="rating">
                <p class="rating__score">${product.rating.score}</p>
                <p class="rating__count">of ${total} reviews</p>
                <img class="rating__stars" src="./img/stars-4-5.png" alt="Rating ${product.rating.score} out of 5">
            </div>
            <ul class="rating-bars">${bars}</ul>
        </div>

        <input class="reviews__comment" type="text" placeholder="Leave Comment" aria-label="Leave Comment">

        <ul class="reviews__list">${reviewItems}</ul>

        <button class="more-btn reviews__more" type="button">
            View More
            <svg class="more-btn__icon" viewBox="0 0 12 8" fill="none" aria-hidden="true">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    `;
}

// ------------------------------------------------------------
// Related Products: 4 других товара (не текущий), берём по кругу
// начиная со следующего за текущим
// ------------------------------------------------------------
function renderRelated(product) {
    const index = products.findIndex((item) => item.id === product.id);
    const others = [...products.slice(index + 1), ...products.slice(0, index)];
    renderProductCards(document.getElementById("related-list"), others.slice(0, 4));
}

// ------------------------------------------------------------
// Интерактивность: галерея, цвета, память
// ------------------------------------------------------------
// Рисует миниатюры слева через map. Каждая миниатюра получает свой клик:
// по нажатию главное фото заменяется на выбранное.
function renderGallery(images) {
    const main = document.getElementById("gallery-main");
    const thumbsBox = document.querySelector(".gallery__thumbs");

    // по умолчанию показываем первое фото набора
    main.src = images[0];

    const items = images.map((src, index) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        const img = document.createElement("img");

        btn.className = "gallery__thumb" + (index === 0 ? " gallery__thumb--active" : "");
        btn.type = "button";
        btn.setAttribute("aria-label", `Photo ${index + 1}`);

        img.className = "gallery__thumb-img";
        img.src = src;
        img.alt = "";

        btn.addEventListener("click", () => {
            main.src = src; // меняем большое фото

            // подсвечиваем только выбранную миниатюру
            thumbsBox.querySelectorAll(".gallery__thumb").forEach((thumb) => {
                thumb.classList.remove("gallery__thumb--active");
            });
            btn.classList.add("gallery__thumb--active");
        });

        btn.append(img);
        li.append(btn);
        return li;
    });

    thumbsBox.replaceChildren(...items);
}

function initColors(product) {
    document.querySelector(".colors__list").addEventListener("click", (event) => {
        const btn = event.target.closest(".colors__item");
        if (!btn) return;

        document.querySelectorAll(".colors__item").forEach((item) => {
            item.classList.toggle("colors__item--active", item === btn);
        });

        // Если у цвета есть свой набор фото — показываем его целиком
        const color = product.colors.find((c) => c.name === btn.dataset.color);
        if (color && color.images) {
            renderGallery(color.images);
        }
    });
}

function initMemory() {
    document.querySelector(".memory").addEventListener("click", (event) => {
        const btn = event.target.closest(".memory__item");
        if (!btn || btn.disabled) return;

        document.querySelectorAll(".memory__item").forEach((item) => {
            item.classList.toggle("memory__item--active", item === btn);
        });
    });
}
