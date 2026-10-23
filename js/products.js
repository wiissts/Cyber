// ============================================================
// Моковые данные проекта.
// Подключается на страницах ПЕРЕД остальными скриптами и
// создаёт глобальные переменные `products` и `reviews`.
// ============================================================

// --- Фотографии товаров ---
// Первое фото набора — чёткий основной снимок (он же в карточке каталога),
// остальные — другие ракурсы (миниатюры слева в галерее).
// Новое фото: положите файл в /img и добавьте путь в нужный набор.
const PHOTOS = {
    deepPurple: [
        "./img/iphone-14-pro-max.png",
        "./img/iphone-14-pro-deep-purple-front.png",
        "./img/iphone-14-pro-deep-purple-back.png",
        "./img/iphone-14-pro-deep-purple-angle.png",
    ],
    gold: [
        "./img/iphone-gold.jpg",
        "./img/iphone-14-pro-gold-front.png",
        "./img/iphone-14-pro-gold-back.png",
        "./img/iphone-14-pro-gold-angle.png",
    ],
    silver: [
        "./img/Apple-iPhone-14-pro-128GB-White.jpg",
        "./img/iphone-14-pro-silver-front.png",
        "./img/iphone-14-pro-silver-back.png",
        "./img/iphone-14-pro-silver-angle.png",
    ],
    spaceBlack: [ // нет фото сзади — пока 3 снимка
        "./img/Apple-iPhone-14-Pro-256GB-Space-Black-_MQ0T3_.jpg",
        "./img/iphone-14-pro-space-black-front.png",
        "./img/iphone-14-pro-space-black-angle.png",
    ],
    iphone11White: [
        "./img/Apple-iPhone-11-128GB-White.png",
        "./img/iphone-11-white-angle.png",
        "./img/iphone-11-white-back.png",
        "./img/iphone-11-white-side.png",
    ],
    iphone13Pink: [ // есть только 3 разных ракурса
        "./img/Apple iPhone 13 mini 128GB Pink-fotor-bg-remover-2026102119566.png",
        "./img/iphone-13-mini-pink-front.png",
        "./img/iphone-13-mini-pink-angle.png",
    ],
};

// --- Общие наборы цветов (чтобы не дублировать одно и то же) ---
const IPHONE_14_PRO_COLORS = [
    { name: "Space Black", hex: "#1f1f21", images: PHOTOS.spaceBlack },
    { name: "Gold",        hex: "#e1b000", images: PHOTOS.gold },
    { name: "Silver",      hex: "#e8e8e8", images: PHOTOS.silver },
    { name: "Deep Purple", hex: "#781dbc", images: PHOTOS.deepPurple },
];

const IPHONE_14_PRO_MEMORY = [
    { label: "128GB" },
    { label: "256GB" },
    { label: "512GB" },
    { label: "1TB", disabled: true },
];

// --- Общие характеристики для разных поколений ---
const SPECS_14_PRO = {
    screen: "6.1\"",
    cpu: "Apple A16 Bionic",
    cores: "6",
    mainCamera: "48-12-12 MP",
    frontCamera: "12 MP",
    battery: "3200 mAh",
};

const DETAILS_14_PRO = {
    screen: [
        ["Screen diagonal", "6.1\""],
        ["The screen resolution", "2556x1179"],
        ["The screen refresh rate", "120 Hz"],
        ["The pixel density", "460 ppi"],
        ["Screen type", "OLED"],
        ["Additionally", ["Dynamic Island", "Always-On display", "HDR display", "True Tone", "Wide color (P3)"]],
    ],
    cpu: [
        ["CPU", "A16 Bionic"],
        ["Number of cores", "6"],
    ],
};

const TEXT_14_PRO =
    "Dynamic Island, Always-On display and a 48 MP main camera. The Pro line " +
    "delivers incredible photos in weak and in bright lighting using the new camera " +
    "system, and all-day battery life.";

const LONG_TEXT_14_PRO =
    "Just as a book is judged by its cover, the first thing you notice when you pick up " +
    "a modern smartphone is the display. Nothing surprising, because advanced technologies " +
    "allow you to practically level the display frames and cutouts for the front camera and " +
    "speaker, leaving no room for bold design solutions. And how good that in such realities " +
    "Apple everything is fine with displays. Both critics and mass consumers always praise " +
    "the quality of the picture provided by the products of the Californian brand.";

// ============================================================
// Товары
// ============================================================
const products = [
    {
        id: 1,
        name: "Apple iPhone 14 Pro 128GB Gold (MQ233)",
        model: "iPhone 14 Pro",
        brand: "Apple",
        category: "Smartphones",
        price: 1437,
        oldPrice: 1499,
        image: PHOTOS.gold[0],
        colors: IPHONE_14_PRO_COLORS,
        defaultColor: "Gold",
        memory: IPHONE_14_PRO_MEMORY,
        defaultMemory: "128GB",
        specs: SPECS_14_PRO,
        description: TEXT_14_PRO,
        longDescription: LONG_TEXT_14_PRO,
        details: DETAILS_14_PRO,
        rating: { score: 4.8, counts: [100, 11, 3, 8, 1] },
    },
    {
        id: 2,
        name: "Apple iPhone 11 128GB White (MQ233)",
        model: "iPhone 11",
        brand: "Apple",
        category: "Smartphones",
        price: 510,
        oldPrice: 599,
        image: PHOTOS.iphone11White[0],
        colors: [{ name: "White", hex: "#f2f2f2", images: PHOTOS.iphone11White }],
        defaultColor: "White",
        memory: [{ label: "64GB", disabled: true }, { label: "128GB" }, { label: "256GB" }],
        defaultMemory: "128GB",
        specs: {
            screen: "6.1\"",
            cpu: "Apple A13 Bionic",
            cores: "6",
            mainCamera: "12-12 MP",
            frontCamera: "12 MP",
            battery: "3110 mAh",
        },
        description:
            "A dual-camera system with Ultra Wide and Night mode, a Liquid Retina display " +
            "and a fast A13 Bionic chip. Great value for everyday use.",
        longDescription:
            "iPhone 11 remains one of the most balanced smartphones in the lineup. " +
            "The 6.1-inch Liquid Retina LCD is bright and accurate, the dual camera " +
            "handles both wide and ultra-wide shots, and the A13 Bionic chip is still " +
            "fast enough for modern apps and games.",
        details: {
            screen: [
                ["Screen diagonal", "6.1\""],
                ["The screen resolution", "1792x828"],
                ["The screen refresh rate", "60 Hz"],
                ["The pixel density", "326 ppi"],
                ["Screen type", "LCD"],
                ["Additionally", ["Liquid Retina display", "True Tone", "Wide color (P3)"]],
            ],
            cpu: [
                ["CPU", "A13 Bionic"],
                ["Number of cores", "6"],
            ],
        },
        rating: { score: 4.6, counts: [88, 20, 6, 3, 2] },
    },
    {
        id: 3,
        name: "Apple iPhone 11 128GB White (MQ233)",
        model: "iPhone 11",
        brand: "Apple",
        category: "Smartphones",
        price: 550,
        image: PHOTOS.iphone11White[0],
        colors: [{ name: "White", hex: "#f2f2f2", images: PHOTOS.iphone11White }],
        defaultColor: "White",
        memory: [{ label: "64GB", disabled: true }, { label: "128GB" }, { label: "256GB" }],
        defaultMemory: "128GB",
        specs: {
            screen: "6.1\"",
            cpu: "Apple A13 Bionic",
            cores: "6",
            mainCamera: "12-12 MP",
            frontCamera: "12 MP",
            battery: "3110 mAh",
        },
        description:
            "Refurbished-grade iPhone 11 in excellent condition: dual camera, " +
            "Liquid Retina display and all-day battery.",
        longDescription:
            "This iPhone 11 has been fully tested and comes with a one-year guarantee. " +
            "It offers the same 6.1-inch Liquid Retina display, A13 Bionic chip and " +
            "dual-camera system as the new model at a lower price.",
        details: {
            screen: [
                ["Screen diagonal", "6.1\""],
                ["The screen resolution", "1792x828"],
                ["The screen refresh rate", "60 Hz"],
                ["The pixel density", "326 ppi"],
                ["Screen type", "LCD"],
            ],
            cpu: [
                ["CPU", "A13 Bionic"],
                ["Number of cores", "6"],
            ],
        },
        rating: { score: 4.5, counts: [64, 18, 7, 4, 2] },
    },
    {
        id: 4,
        name: "Apple iPhone 14 Pro 256GB Silver (MQ2V3)",
        model: "iPhone 14 Pro",
        brand: "Apple",
        category: "Smartphones",
        price: 1499,
        oldPrice: 1599,
        image: PHOTOS.silver[0],
        colors: IPHONE_14_PRO_COLORS,
        defaultColor: "Silver",
        memory: IPHONE_14_PRO_MEMORY,
        defaultMemory: "256GB",
        specs: SPECS_14_PRO,
        description: TEXT_14_PRO,
        longDescription: LONG_TEXT_14_PRO,
        details: DETAILS_14_PRO,
        rating: { score: 4.8, counts: [92, 12, 4, 2, 1] },
    },
    {
        id: 5,
        name: "Apple iPhone 14 Pro 128GB Gold (MQ2V3)",
        model: "iPhone 14 Pro",
        brand: "Apple",
        category: "Smartphones",
        price: 1399,
        oldPrice: 1499,
        image: PHOTOS.gold[0],
        colors: IPHONE_14_PRO_COLORS,
        defaultColor: "Gold",
        memory: IPHONE_14_PRO_MEMORY,
        defaultMemory: "128GB",
        specs: SPECS_14_PRO,
        description: TEXT_14_PRO,
        longDescription: LONG_TEXT_14_PRO,
        details: DETAILS_14_PRO,
        rating: { score: 4.7, counts: [80, 15, 5, 3, 1] },
    },
    {
        id: 6,
        name: "Apple iPhone 14 Pro Max 256GB Deep Purple (MQ0G3)",
        model: "iPhone 14 Pro Max",
        brand: "Apple",
        category: "Smartphones",
        price: 1600,
        oldPrice: 1699,
        image: PHOTOS.deepPurple[0],
        colors: [
            { name: "Black",       hex: "#000000", images: PHOTOS.spaceBlack },
            { name: "Deep Purple", hex: "#781dbc", images: PHOTOS.deepPurple },
            { name: "Red",         hex: "#e10000" }, // фото нет — галерея не меняется
            { name: "Gold",        hex: "#e1b000", images: PHOTOS.gold },
            { name: "Silver",      hex: "#e8e8e8", images: PHOTOS.silver },
        ],
        defaultColor: "Deep Purple",
        memory: [
            { label: "128GB", disabled: true },
            { label: "256GB" },
            { label: "512GB" },
            { label: "1TB" },
        ],
        defaultMemory: "256GB",
        specs: {
            screen: "6.7\"",
            cpu: "Apple A16 Bionic",
            cores: "6",
            mainCamera: "48-12-12 MP",
            frontCamera: "12 MP",
            battery: "4323 mAh",
        },
        description:
            "Enhanced capabilities thanks to an enlarged display of 6.7 inches and work " +
            "without recharging throughout the day. Incredible photos in weak, yes and in " +
            "bright lighting using the new system with two cameras",
        longDescription: LONG_TEXT_14_PRO +
            " And last year's 6.7-inch Retina panels, which had ProMotion, caused real admiration for many.",
        details: {
            screen: [
                ["Screen diagonal", "6.7\""],
                ["The screen resolution", "2796x1290"],
                ["The screen refresh rate", "120 Hz"],
                ["The pixel density", "460 ppi"],
                ["Screen type", "OLED"],
                ["Additionally", ["Dynamic Island", "Always-On display", "HDR display", "True Tone", "Wide color (P3)"]],
            ],
            cpu: [
                ["CPU", "A16 Bionic"],
                ["Number of cores", "6"],
            ],
        },
        rating: { score: 4.8, counts: [100, 11, 3, 8, 1] },
    },
    {
        id: 7,
        name: "Apple iPhone 13 mini 128GB Pink (MLK23)",
        model: "iPhone 13 mini",
        brand: "Apple",
        category: "Smartphones",
        price: 850,
        oldPrice: 929,
        image: PHOTOS.iphone13Pink[0],
        colors: [{ name: "Pink", hex: "#f9d5d3", images: PHOTOS.iphone13Pink }],
        defaultColor: "Pink",
        memory: [{ label: "128GB" }, { label: "256GB" }, { label: "512GB", disabled: true }],
        defaultMemory: "128GB",
        specs: {
            screen: "5.4\"",
            cpu: "Apple A15 Bionic",
            cores: "6",
            mainCamera: "12-12 MP",
            frontCamera: "12 MP",
            battery: "2438 mAh",
        },
        description:
            "The most compact iPhone with a Super Retina XDR display, A15 Bionic chip " +
            "and a dual-camera system with Cinematic mode.",
        longDescription:
            "iPhone 13 mini proves that small can be powerful. The 5.4-inch OLED display " +
            "is sharp and bright, the A15 Bionic chip handles anything you throw at it, " +
            "and the improved battery lasts through the day.",
        details: {
            screen: [
                ["Screen diagonal", "5.4\""],
                ["The screen resolution", "2340x1080"],
                ["The screen refresh rate", "60 Hz"],
                ["The pixel density", "476 ppi"],
                ["Screen type", "OLED"],
                ["Additionally", ["Super Retina XDR", "HDR display", "True Tone", "Wide color (P3)"]],
            ],
            cpu: [
                ["CPU", "A15 Bionic"],
                ["Number of cores", "6"],
            ],
        },
        rating: { score: 4.7, counts: [75, 14, 4, 2, 1] },
    },
    {
        id: 8,
        name: "Apple iPhone 14 Pro 256GB Space Black (MQ0T3)",
        model: "iPhone 14 Pro",
        brand: "Apple",
        category: "Smartphones",
        price: 1399,
        image: PHOTOS.spaceBlack[0],
        colors: IPHONE_14_PRO_COLORS,
        defaultColor: "Space Black",
        memory: IPHONE_14_PRO_MEMORY,
        defaultMemory: "256GB",
        specs: SPECS_14_PRO,
        description: TEXT_14_PRO,
        longDescription: LONG_TEXT_14_PRO,
        details: DETAILS_14_PRO,
        rating: { score: 4.9, counts: [110, 8, 2, 1, 0] },
    },
    {
        id: 9,
        name: "Apple iPhone 14 Pro 512GB Silver (MQ103)",
        model: "iPhone 14 Pro",
        brand: "Apple",
        category: "Smartphones",
        price: 1399,
        oldPrice: 1549,
        image: PHOTOS.silver[0],
        colors: IPHONE_14_PRO_COLORS,
        defaultColor: "Silver",
        memory: IPHONE_14_PRO_MEMORY,
        defaultMemory: "512GB",
        specs: SPECS_14_PRO,
        description: TEXT_14_PRO,
        longDescription: LONG_TEXT_14_PRO,
        details: DETAILS_14_PRO,
        rating: { score: 4.8, counts: [97, 10, 3, 2, 1] },
    },
];

// ============================================================
// Моковые отзывы (общие для всех товаров)
// ============================================================
const reviews = [
    {
        author: "Grace Carey",
        avatar: "./img/avatar-1.png",
        date: "2023-01-24",
        dateText: "24 January, 2023",
        stars: 4,
        text:
            "I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn't be " +
            "happier with my purchase!! I have a pre-paid data plan so I was worried that this " +
            "phone wouldn't connect with my data plan, since the new phones don't have the " +
            "physical Sim tray anymore, but couldn't have been easier! It was super easy to set " +
            "up and the phone works and looks great. It truly was in excellent condition. " +
            "Highly recommend!!!🖤",
    },
    {
        author: "Ronald Richards",
        avatar: "./img/avatar-2.png",
        date: "2023-01-24",
        dateText: "24 January, 2023",
        stars: 5,
        text:
            "This phone has plenty of storage and is durable. Plus all the new iPhones have a " +
            "C port! Apple is phasing out the current ones! (All about the Benjamins) So if you " +
            "want a phone that's going to last, grab one and get several cords and plugs.",
    },
    {
        author: "Darcy King",
        avatar: "./img/avatar-3.png",
        date: "2023-01-24",
        dateText: "24 January, 2023",
        stars: 4,
        text:
            "I might be the only one to say this but the camera is a little funky. Hoping it " +
            "will change with a software update; otherwise, love this phone! Came in great condition",
        photos: ["./img/review-photo-1.png", "./img/review-photo-2.png"],
    },
];
