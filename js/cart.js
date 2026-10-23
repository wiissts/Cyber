// Корзина
// Тут функции: добавить товар, удалить товар, поменять количество.
// Корзина хранится в localStorage, чтобы не пропадала при переходе на другую страницу.

// Массив с товарами в корзине. Сначала берем его из localStorage
let cart = [];

let saved = localStorage.getItem("cart");
if (saved) {
    cart = JSON.parse(saved);
}

// Налог и доставка (просто числа для примера)
let tax = 50;
let shipping = 29;

// Сохраняем корзину в localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    showCartCount();
}

// Ищем товар в моковых данных по id
function getProduct(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            return products[i];
        }
    }
    return null;
}

// Добавить товар в корзину
function addToCart(id, color, memory) {
    // если такой товар уже есть (тот же id, цвет и память) - просто +1
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        if (item.id === id && item.color === color && item.memory === memory) {
            if (item.quantity < 99) {
                item.quantity = item.quantity + 1;
            }
            saveCart();
            return;
        }
    }

    // если такого товара нет - добавляем новый
    cart.push({
        id: id,
        color: color,
        memory: memory,
        quantity: 1,
    });
    saveCart();
}

// Удалить товар из корзины (index - номер товара в массиве)
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

// Изменить количество товара
function changeQuantity(index, newQuantity) {
    newQuantity = Number(newQuantity);

    // если ввели ерунду или меньше 1 - ставим 1
    if (isNaN(newQuantity) || newQuantity < 1) {
        newQuantity = 1;
    }
    if (newQuantity > 99) {
        newQuantity = 99;
    }

    cart[index].quantity = Math.floor(newQuantity);
    saveCart();
}

// Сколько всего штук в корзине (для кружочка у иконки)
function getCartCount() {
    let count = 0;
    for (let i = 0; i < cart.length; i++) {
        count = count + cart[i].quantity;
    }
    return count;
}

// Сумма всех товаров
function getSubtotal() {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
        let product = getProduct(cart[i].id);
        sum = sum + product.price * cart[i].quantity;
    }
    return sum;
}

// Показываем кружочек с количеством у иконки корзины в шапке
function showCartCount() {
    let links = document.querySelectorAll('.header__action[href="cart.html"]');

    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        link.classList.add("header__action--cart");

        let badge = link.querySelector(".cart-badge");
        if (badge === null) {
            badge = document.createElement("span");
            badge.className = "cart-badge";
            link.appendChild(badge);
        }

        let count = getCartCount();
        badge.textContent = count;
        if (count === 0) {
            badge.hidden = true;
        } else {
            badge.hidden = false;
        }
    }
}

// Клик по кнопке "Add to Cart" (на странице товара)
document.addEventListener("click", function (event) {
    let button = event.target.closest("[data-add-to-cart]");
    if (button === null) {
        return;
    }

    let id = Number(button.dataset.addToCart);
    let product = getProduct(id);

    // берем цвет и память по умолчанию
    let color = product.defaultColor;
    let memory = product.defaultMemory;

    // а если пользователь выбрал другие - берем выбранные
    let activeColor = document.querySelector(".colors__item--active");
    if (activeColor !== null) {
        color = activeColor.dataset.color;
    }
    let activeMemory = document.querySelector(".memory__item--active");
    if (activeMemory !== null) {
        memory = activeMemory.textContent.trim();
    }

    addToCart(id, color, memory);

    // на секунду меняем текст кнопки
    button.textContent = "Added ✓";
    setTimeout(function () {
        button.textContent = "Add to Cart";
    }, 1200);
});

// ---------- Страница корзины (cart.html) ----------

let cartList = document.getElementById("cart-list");

// Рисуем все товары в корзине
function renderCart() {
    if (cartList === null) {
        return; // мы не на странице корзины
    }

    // если корзина пустая
    if (cart.length === 0) {
        cartList.innerHTML =
            '<li class="cart__empty">' +
            "<p>Your cart is empty</p>" +
            '<a href="catalog.html" class="btn btn--filled">Go to catalog</a>' +
            "</li>";
        showTotals();
        return;
    }

    let html = "";
    for (let i = 0; i < cart.length; i++) {
        let item = cart[i];
        let product = getProduct(item.id);

        html +=
            '<li class="cart-item" data-index="' + i + '">' +
            '<img class="cart-item__img" src="' + product.image + '" alt="' + product.name + '">' +
            '<div class="cart-item__info">' +
            '<h3 class="cart-item__name">' + product.name + "</h3>" +
            '<p class="cart-item__variant">' + item.color + ", " + item.memory + "</p>" +
            '<p class="cart-item__code">#' + product.id + "</p>" +
            "</div>" +
            '<div class="counter">' +
            '<button class="counter__btn" type="button" data-action="minus">−</button>' +
            '<input class="counter__value" type="number" value="' + item.quantity + '" min="1" max="99">' +
            '<button class="counter__btn" type="button" data-action="plus">+</button>' +
            "</div>" +
            '<span class="cart-item__price">$' + product.price * item.quantity + "</span>" +
            '<button class="cart-item__remove" type="button" data-action="remove">×</button>' +
            "</li>";
    }
    cartList.innerHTML = html;
    showTotals();
}

// Считаем и показываем итоговые суммы
function showTotals() {
    let totals = document.getElementById("cart-totals");
    if (totals === null) {
        return;
    }

    let subtotal = getSubtotal();
    let currentTax = tax;
    let currentShipping = shipping;

    // если корзина пустая - налог и доставка тоже 0
    if (cart.length === 0) {
        currentTax = 0;
        currentShipping = 0;
    }

    totals.querySelector('[data-total="subtotal"]').textContent = "$" + subtotal;
    totals.querySelector('[data-total="tax"]').textContent = "$" + currentTax;
    totals.querySelector('[data-total="shipping"]').textContent = "$" + currentShipping;
    totals.querySelector('[data-total="total"]').textContent = "$" + (subtotal + currentTax + currentShipping);

    // кнопка Checkout не работает, если корзина пустая
    let checkout = document.getElementById("cart-checkout");
    if (checkout !== null) {
        if (cart.length === 0) {
            checkout.classList.add("is-disabled");
        } else {
            checkout.classList.remove("is-disabled");
        }
    }
}

// Клики по кнопкам + - и крестику в корзине
if (cartList !== null) {
    cartList.addEventListener("click", function (event) {
        let button = event.target.closest("[data-action]");
        if (button === null) {
            return;
        }

        let row = button.closest(".cart-item");
        let index = Number(row.dataset.index);
        let action = button.dataset.action;

        if (action === "remove") {
            removeFromCart(index);
        }
        if (action === "plus") {
            changeQuantity(index, cart[index].quantity + 1);
        }
        if (action === "minus") {
            changeQuantity(index, cart[index].quantity - 1);
        }

        renderCart();
    });

    // Если ввели количество руками в поле
    cartList.addEventListener("change", function (event) {
        if (!event.target.classList.contains("counter__value")) {
            return;
        }
        let row = event.target.closest(".cart-item");
        let index = Number(row.dataset.index);

        changeQuantity(index, event.target.value);
        renderCart();
    });
}

// Запускаем при загрузке страницы
showCartCount();
renderCart();
