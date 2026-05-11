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
const popularGrid = $(".popular-grid");
function getCardsPerRow() {
    if (window.innerWidth <= 900) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4;
}

function createCard(item) {
    return `
        <div class="card">
            ${item.discount ? `<div class="card-badge">${item.discount}</div>` : ""}
            <img src="${item.img}" alt="${item.title}" />
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

function renderPopularCards() {
    popularItems.forEach(item => {
        popularGrid.append(`
            <div class="card-wrapper">
                ${createCard(item)}
            </div>
        `);
    });
    initCarousel();
}

function initCarousel() {
    popularGrid.slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: true,
        speed: 600,
        prevArrow: $(".slider-btn.left"),
        nextArrow: $(".slider-btn.right"),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    centerMode: true,
                    centerPadding: "0px"
                }
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: "120px"
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: "80px"
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    centerPadding: "40px"
                }
            }
        ]
    });

    setTimeout(initCart, 300);
}

renderCards();
renderPopularCards();

let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        renderCards();
    }, 150);
});

const cartState = {};
function initCart() {
    $(".add-wrapper").each(function () {
        const key = $(this).data("id");
        if (cartState[key] === undefined) {
            cartState[key] = 0;
        }
        updateUI($(this), key);
    });
}

function updateUI(element, key) {
    const count = cartState[key];
    const addBtn = element.find(".add-btn");
    const counter = element.find(".counter");
    const countElement = element.find(".count");

    if (count <= 0) {
        cartState[key] = 0;
        addBtn.show();
        counter.addClass("hidden");
    }

    else {
        addBtn.hide();
        counter.removeClass("hidden");
        countElement.text(count);
    }
}

$(document).on("click", ".add-btn", function (event) {
    event.preventDefault();
    const wrapper = $(this).closest(".add-wrapper");
    const key = wrapper.data("id");
    cartState[key] = 1;
    updateUI(wrapper, key);
});

$(document).on("click", ".plus", function (event) {
    event.preventDefault();
    const wrapper = $(this).closest(".add-wrapper");
    const key = wrapper.data("id");
    cartState[key]++;
    updateUI(wrapper, key);
});

$(document).on("click", ".minus", function (event) {
    event.preventDefault();
    const wrapper = $(this).closest(".add-wrapper");
    const key = wrapper.data("id");
    if (cartState[key] > 0) {
        cartState[key]--;
    }
    updateUI(wrapper, key);
});

const video = document.getElementById("mainVideo");
const playBtn = document.getElementById("playBtn");
const videoWrapper = document.querySelector(".video-wrapper");
function toggleVideo() {
    if (video.paused) {
        video.play();
        videoWrapper.classList.add("playing");
    }else {
        video.pause();
        videoWrapper.classList.remove("playing");
    }
}

video.addEventListener("click", toggleVideo);
playBtn.addEventListener("click", toggleVideo);
video.addEventListener("ended", () => {
    videoWrapper.classList.remove("playing");
});

const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    this.reset();
});

fetch("modal.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("modal-root").innerHTML = data;
        initModal();
    })
    .catch(error => {
        console.error("Failed to load modal:", error);
    });