import { initModal } from './modal.js';

const foodItems = [
    {img: "assets/images/butterpaneer.jpg", discount:"40%", title: "Butter Paneer", rating: 4.8, time: "35-45 min", price: "₹329"},
    {img: "assets/images/littichoka.jpg", title: "Litti Choka", rating: 4.7, time: "30-40 min", price: "₹299"},
    {img: "assets/images/hakkanoodles.jpg", discount:"25%", title: "Hakka Noodles", rating: 4.4, time: "20-30 min", price: "₹189"},
    {img: "assets/images/biryani.jpg", title: "Veg Biryani", rating: 4.6, time: "35-45 min", price: "₹249"},
    {img: "assets/images/cholebhature.jpg", discount:"15%", title: "Chole Bhature", rating: 4.9, time: "20-30 min", price: "₹179"},
    {img: "assets/images/momos.jpg", title: "Veg Momos", rating: 4.3, time: "15-20 min", price: "₹129"},
    {img: "assets/images/panipuri.jpg", discount:"50%", title: "Pani Puri", rating: 4.5, time: "25-35 min", price: "₹279"},
    {img: "assets/images/masaladosa.jpg", discount:"30%", title: "Masala Dosa", rating: 4.7, time: "20-25 min", price: "₹159"},
    {img: "assets/images/sushiroll.jpg", title: "Veg Sushi Roll", rating: 4.4, time: "40-50 min", price: "₹449"},
    {img: "assets/images/burger.jpg", title: "Cheese Burger", rating: 4.5, time: "20-30 min", price: "₹219"},
    {img: "assets/images/rice.jpg", discount:"20%", title: "Veg Fried Rice", rating: 4.2, time: "20-25 min", price: "₹169"},
    {img: "assets/images/paneertikka.jpg", title: "Paneer Tikka", rating: 4.8, time: "25-35 min", price: "₹289"}
];

const popularItems = [
    {img: "assets/images/idlisambhar.jpg", discount:"50%", title: "Idli Sambhar", rating: 4.9, time: "30-40 min", price: "₹369"},
    {img: "assets/images/pavbhaji.jpg", discount:"25%", title: "Pav Bhaji", rating: 4.7, time: "20-25 min", price: "₹149"},
    {img: "assets/images/pasta.jpg", discount:"35%", title: "Pasta", rating: 4.8, time: "30-40 min", price: "₹319"},
    {img: "assets/images/springrolls.jpg", discount:"60%", title: "Spring Rolls", rating: 4.4, time: "15-20 min", price: "₹149"},
    {img: "assets/images/macroni.jpg", discount:"40%", title: "Macaroni", rating: 4.6, time: "25-35 min", price: "₹329"}
];

const sidebarIcon = document.querySelector(".sidebar-icon");
const navMenu = document.querySelector(".nav-menu");

if (sidebarIcon && navMenu) {
    sidebarIcon.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        sidebarIcon.classList.toggle("active");
    });
}

const foodGrid = document.querySelector(".kitchen-grid");

function getCardsPerRow() {
    if (window.innerWidth <= 900) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
}

function createCard(item) {
    return `
        <div class="card">
            ${item.discount ? `<div class="card-badge">${item.discount}</div>` : ""}
            <img src="${item.img}" />
            <div class="card-body">
                <div class="card-content">
                    <div class="card-row-1">
                        <span>${item.title}</span>
                        <span>${item.price}</span>
                    </div>
                    <div class="card-row-2">
                        <div class="rating-price">
                            <div class="rating">★ ${item.rating}</div>
                            <div class="time">${item.time}</div>
                        </div>
                        <div class="add-wrapper" data-id="${item.title}">
                            <div class="add-btn">+</div>
                            <div class="counter hidden">
                                <button class="minus">-</button>
                                <div class="count">0</div>
                                <button class="plus">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

function createPopularCard(item) {
    return `
        <div class="popular-card">
            ${item.discount ? `<div class="popular-card-badge">${item.discount}</div>` : ""}
            <img class="popular-card-img" src="${item.img}" alt="${item.title}">
            <div class="popular-card-body">
                <div class="popular-card-content">
                    <div class="popular-card-row-1">
                        <span>${item.title}</span>
                        <span>${item.price}</span>
                    </div> 
                    <div class="popular-card-row-2">
                        <div class="popular-rating-price">
                            <div class="popular-rating">★ ${item.rating}</div>
                            <div class="popular-time">${item.time}</div>
                        </div>
                        <div class="popular-add-wrapper" data-id="${item.title}">
                            <div class="popular-add-btn">+</div>
                            <div class="popular-counter hidden">
                                <button class="popular-minus" type="button">-</button>
                                <div class="popular-count">0</div>
                                <button class="popular-plus" type="button">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
}

function renderCards() {
    foodGrid.innerHTML = "";
    const perRow = getCardsPerRow();

    for (let i = 0; i < foodItems.length; i += perRow) {
        const rowItems = foodItems.slice(i, i + perRow);
        foodGrid.innerHTML += `
            <div class="kitchen-row">
                ${rowItems.map(createCard).join("")}
            </div>`;
    }
}

const popularGrid = document.querySelector(".popular-grid");
const leftBtn = document.querySelector(".slider-btn.left");
const rightBtn = document.querySelector(".slider-btn.right");

let currentIndex = 0;
let isAnimating = false;
let autoSlide = null;
let popularTrack = null;

function getVisibleCards() {
    if (window.innerWidth <= 1100) return 1;
    return 3;
}

function getCardWidth() {
    const card = popularTrack?.querySelector(".popular-card");
    if (!card) return 0;
    const styles = window.getComputedStyle(popularTrack);
    const gap = parseFloat(styles.columnGap || styles.gap) || 0;
    return card.offsetWidth + gap;
}

function getCarouselPeekOffset() {
    if (!popularGrid || window.innerWidth <= 600) return 0;
    const step = getCardWidth();
    const card = popularTrack?.querySelector(".popular-card");
    if (!card || !step) return 0;
    const gap = step - card.offsetWidth;
    const fullCardsWidth = (getVisibleCards() * card.offsetWidth) + ((getVisibleCards() - 1) * gap);
    return Math.max(0, (popularGrid.clientWidth - fullCardsWidth) / 2);
}

function renderPopularCards() {
    popularGrid.innerHTML = `<div class="popular-track"></div>`;
    popularTrack = popularGrid.querySelector(".popular-track");

    const visible = getVisibleCards();
    const startClones = popularItems.slice(-visible);
    const endClones = popularItems.slice(0, visible);

    const all = [...startClones, ...popularItems, ...endClones];

    all.forEach(item => {
        popularTrack.innerHTML += createPopularCard(item);
    });

    currentIndex = visible;

    popularTrack.style.transition = "none";
    updateCarousel();
    popularTrack.offsetHeight;
    popularTrack.style.transition = "transform 0.6s ease";
}

function updateCarousel() {
    const offset = (currentIndex * getCardWidth()) - getCarouselPeekOffset();
    if (popularTrack) {
        popularTrack.style.transform = `translateX(-${offset}px)`;
    }
    updateCenterCard();
}

function updateCenterCard() {
    const cards = popularTrack?.querySelectorAll(".popular-card") || [];

    cards.forEach(card => card.classList.remove("is-active"));

    const center = currentIndex + Math.floor(getVisibleCards() / 2);

    if (cards[center]) {
        cards[center].classList.add("is-active");
    }
}

function animate(btn) {
    btn.classList.add("active");
    setTimeout(() => btn.classList.remove("active"), 200);
}

function next(isAuto = false) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex++;
    updateCarousel();

    if (!isAuto) animate(rightBtn);

    const visible = getVisibleCards();

    setTimeout(() => {
        if (currentIndex >= popularItems.length + visible) {
            popularTrack.style.transition = "none";
            currentIndex = visible;
            updateCarousel();
            popularTrack.offsetHeight;
            popularTrack.style.transition = "transform 0.6s ease";
        }
        isAnimating = false;
    }, 600);
}

function prev() {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex--;
    updateCarousel();
    animate(leftBtn);

    const visible = getVisibleCards();

    setTimeout(() => {
        if (currentIndex < visible) {
            popularTrack.style.transition = "none";
            currentIndex = popularItems.length + visible - 1;
            updateCarousel();
            popularTrack.offsetHeight;
            popularTrack.style.transition = "transform 0.6s ease";
        }
        isAnimating = false;
    }, 600);
}

function startAuto() {
    stopAuto();
    autoSlide = setInterval(() => {
        if (!isAnimating) next(true);
    }, 3000);
}

function stopAuto() {
    clearInterval(autoSlide);
}

rightBtn?.addEventListener("click", () => next(false));
leftBtn?.addEventListener("click", prev);

window.addEventListener("resize", () => {
    stopAuto();
    renderCards();
    renderPopularCards();
    startAuto();
});

renderCards();
renderPopularCards();
startAuto();

const cartState = {};

document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-btn");
    const plus = e.target.closest(".plus");
    const minus = e.target.closest(".minus");

    if (!addBtn && !plus && !minus) return;

    const wrapper = e.target.closest(".add-wrapper");
    const key = wrapper?.dataset.id;

    if (!key) return;

    if (cartState[key] === undefined) cartState[key] = 0;

    if (addBtn) cartState[key] = 1;
    if (plus) cartState[key]++;
    if (minus && cartState[key] > 0) cartState[key]--;

    updateCartUI(wrapper, key);
});

document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".popular-add-btn");
    const plus = e.target.closest(".popular-plus");
    const minus = e.target.closest(".popular-minus");

    if (!addBtn && !plus && !minus) return;

    const wrapper = e.target.closest(".popular-add-wrapper");
    const key = wrapper?.dataset.id;

    if (!key) return;

    if (cartState[key] === undefined) cartState[key] = 0;

    if (addBtn) cartState[key] = 1;
    if (plus) cartState[key]++;
    if (minus && cartState[key] > 0) cartState[key]--;

    updatePopularCartUI(wrapper, key);
});

function updateCartUI(wrapper, key) {
    const count = cartState[key];

    const addBtn = wrapper.querySelector(".add-btn");
    const counter = wrapper.querySelector(".counter");
    const countEl = wrapper.querySelector(".count");

    if (count <= 0) {
        cartState[key] = 0;
        addBtn.classList.remove("hidden");
        counter.classList.add("hidden");
        countEl.textContent = 0;
    } else {
        addBtn.classList.add("hidden");
        counter.classList.remove("hidden");
        countEl.textContent = count;
    }
}

function updatePopularCartUI(wrapper, key) {
    const count = cartState[key];

    const addBtn = wrapper.querySelector(".popular-add-btn");
    const counter = wrapper.querySelector(".popular-counter");
    const countEl = wrapper.querySelector(".popular-count");

    if (count <= 0) {
        cartState[key] = 0;
        addBtn.classList.remove("hidden");
        counter.classList.add("hidden");
        countEl.textContent = 0;
    } else {
        addBtn.classList.add("hidden");
        counter.classList.remove("hidden");
        countEl.textContent = count;
    }
}

const video = document.getElementById("mainVideo");
const playBtn = document.getElementById("playBtn");
const videoWrapper = document.querySelector(".video-wrapper");

function toggleVideo() {
    if (!video) return;

    if (video.paused) {
        video.play();
        videoWrapper.classList.add("playing");
    } else {
        video.pause();
        videoWrapper.classList.remove("playing");
    }
}

video?.addEventListener("click", toggleVideo);
playBtn?.addEventListener("click", toggleVideo);

fetch("modal.html")
.then(r => r.text())
.then(d => {
    document.getElementById("modal-root").innerHTML = d;
    initModal();
});
