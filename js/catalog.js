// ============================================================
// Каталог: карточки товаров + пагинация
// ============================================================

const list = document.getElementById("catalog-list");
const pagination = document.getElementById("pagination");

const TOTAL_PAGES = 12; // всего страниц (как в макете)
let currentPage = 1;    // текущая страница

// Товары для страницы.
// Сейчас это мок: на всех страницах показываем одни и те же айфоны.
// Когда появятся реальные данные, здесь можно вернуть срез:
// products.slice((page - 1) * 9, page * 9)
function getPageProducts(page) {
    return products;
}

// Какие элементы показывать в пагинации: номера страниц и "dots".
// Пример для 12 страниц:  1 2 3 .... 12  |  1 .... 5 6 7 .... 12  |  1 .... 10 11 12
function getPageItems(current, total) {
    const pages = new Set([1, total, current - 1, current, current + 1]);

    // в начале и в конце держим по три номера, как в макете
    if (current <= 2) pages.add(3);
    if (current >= total - 1) pages.add(total - 2);

    const sorted = [...pages].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);

    const items = [];
    sorted.forEach((n, index) => {
        const prev = sorted[index - 1];
        if (prev !== undefined) {
            if (n - prev === 2) items.push(prev + 1); // пропущена одна страница — показываем её
            else if (n - prev > 2) items.push("dots"); // пропущено много — многоточие
        }
        items.push(n);
    });
    return items;
}

// Переключение страницы
function goToPage(page) {
    if (page < 1 || page > TOTAL_PAGES || page === currentPage) return;
    currentPage = page;
    renderCatalog();

    // возвращаемся к началу списка товаров
    list.scrollIntoView({ behavior: "smooth", block: "start" });
}

// Кнопка-стрелка
function createArrow(label, symbol, disabled, onClick) {
    const btn = document.createElement("button");
    btn.className = "pagination__btn pagination__btn--arrow";
    btn.type = "button";
    btn.textContent = symbol;
    btn.disabled = disabled;
    btn.setAttribute("aria-label", label);
    btn.addEventListener("click", onClick);
    return btn;
}

// Рисуем пагинацию через map
function renderPagination() {
    const items = getPageItems(currentPage, TOTAL_PAGES).map((item) => {
        if (item === "dots") {
            const dots = document.createElement("span");
            dots.className = "pagination__dots";
            dots.textContent = "....";
            return dots;
        }

        const btn = document.createElement("button");
        btn.className = "pagination__btn" + (item === currentPage ? " pagination__btn--active" : "");
        btn.type = "button";
        btn.textContent = item;
        if (item === currentPage) btn.setAttribute("aria-current", "page");
        btn.addEventListener("click", () => goToPage(item));
        return btn;
    });

    pagination.replaceChildren(
        createArrow("Previous page", "‹", currentPage === 1, () => goToPage(currentPage - 1)),
        ...items,
        createArrow("Next page", "›", currentPage === TOTAL_PAGES, () => goToPage(currentPage + 1))
    );
}

// Карточки + пагинация
function renderCatalog() {
    renderProductCards(list, getPageProducts(currentPage)); // шаблон — в product-card.js
    renderPagination();
}

renderCatalog();
