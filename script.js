const foodItems = [
        {img: "assets/images/pizza1.png",title: "Margherita Pizza",rating: 4.7,time: "40-50 min",price: "₹199"},
        {img: "assets/images/pizza1.png",title: "Cheese Burger",rating: 4.5,time: "30-40 min",price: "₹149"},
        {img: "assets/images/pizza1.png",title: "Veg Noodles",rating: 4.3,time: "25-35 min",price: "₹120"},
        {img: "assets/images/pizza1.png",title: "Margherita Pizza",rating: 4.7,time: "40-50 min",price: "₹199"},
        {img: "assets/images/pizza1.png",title: "Cheese Burger",rating: 4.5,time: "30-40 min",price: "₹149"},
        {img: "assets/images/pizza1.png",title: "Veg Noodles",rating: 4.3,time: "25-35 min",price: "₹120"},
        {img: "assets/images/pizza1.png",title: "Margherita Pizza",rating: 4.7,time: "40-50 min",price: "₹199"},
        {img: "assets/images/pizza1.png",title: "Cheese Burger",rating: 4.5,time: "30-40 min",price: "₹149"},
        {img: "assets/images/pizza1.png",title: "Veg Noodles",rating: 4.3,time: "25-35 min",price: "₹120"},
        {img: "assets/images/pizza1.png",title: "Margherita Pizza",rating: 4.7,time: "40-50 min",price: "₹199"},
        {img: "assets/images/pizza1.png",title: "Cheese Burger",rating: 4.5,time: "30-40 min",price: "₹149"},
        {img: "assets/images/pizza1.png",title: "Veg Noodles",rating: 4.3,time: "25-35 min",price: "₹120"},];

const popularItems = [
        {img: "assets/images/pizza1.png",title: "Margherita Pizza",rating: 4.7,time: "40-50 min",price: "₹199"},
        {img: "assets/images/pizza1.png",title: "Cheese Burger",rating: 4.5,time: "30-40 min",price: "₹149"},
        {img: "assets/images/pizza1.png",title: "Veg Noodles",rating: 4.3,time: "25-35 min",price: "₹120"},
        {img: "assets/images/pizza1.png",title: "Margherita Pizza",rating: 4.7,time: "40-50 min",price: "₹199"},
        {img: "assets/images/pizza1.png",title: "Cheese Burger",rating: 4.5,time: "30-40 min",price: "₹149"}]


const sidebarIcon = document.querySelector('.sidebar-icon');
const menu = document.querySelector('.nav-menu');

sidebarIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
});

const foodGrid = document.querySelector(".kitchen-grid");
function getCardsPerRow() {
    if (window.innerWidth <= 900) {
        return 2;
    }
    if (window.innerWidth <= 1200) {
        return 3;
    }
    return 4;
}
function renderCards() {
    foodGrid.innerHTML = "";
    const perRow = getCardsPerRow();
    for (let i = 0; i < foodItems.length; i += perRow) {
        const rowItems = foodItems.slice(i, i + perRow);
        const rowHTML = `
            <div class="kitchen-row">
                ${rowItems.map(item => `
                    <div class="card">
                        <div class="card-badge">50%</div>
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
                    </div>
                `).join("")}
            </div> `;
        foodGrid.innerHTML += rowHTML;
    }
}

renderCards();
window.addEventListener("resize", renderCards);
const popularGrid = $(".popular-grid");
function renderPopularCards() {
    popularItems.forEach(item => {
        popularGrid.append(`
            <div class="card-wrapper">
                <div class="card">
                    <div class="card-badge">50%</div>
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
                </div>
            </div>`);
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
        prevArrow: $(".slider-btn.left"),
        nextArrow: $(".slider-btn.right"),
        speed: 600,
        responsive: [
            {breakpoint: 1200, settings: {slidesToShow: 3,centerMode: true,centerPadding: "0px"}},
            {breakpoint: 950, settings: {slidesToShow: 1,centerMode: true,centerPadding: "120px"}},
            {breakpoint: 768, settings: {slidesToShow: 1,centerMode: true,centerPadding: "80px"}},
            {breakpoint: 600,settings: {slidesToShow: 1,centerMode: true,centerPadding: "40px"}}]
    });
    setTimeout(() => {initCart();}, 300);
}
renderPopularCards();

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

function updateUI(el, key) {
    const count = cartState[key];
    const addBtn = el.find(".add-btn");
    const counter = el.find(".counter");
    const countEl = el.find(".count");
    if (count <= 0) {
        cartState[key] = 0;
        addBtn.show();
        counter.addClass("hidden");
    }
    else {
        addBtn.hide();
        counter.removeClass("hidden");
        countEl.text(count);
    }
}

$(document).on("click", ".add-btn", function (e) {
    e.preventDefault();
    const wrapper = $(this).closest(".add-wrapper");
    const key = wrapper.data("id");
    if (!cartState[key]) cartState[key] = 0;
    cartState[key] = 1;
    updateUI(wrapper, key);
});

$(document).on("click", ".plus", function (e) {
    e.preventDefault();
    const wrapper = $(this).closest(".add-wrapper");
    const key = wrapper.data("id");
    cartState[key]++;
    updateUI(wrapper, key);
});

$(document).on("click", ".minus", function (e) {
    e.preventDefault();
    const wrapper = $(this).closest(".add-wrapper");
    const key = wrapper.data("id");
    if (cartState[key] > 0) {
        cartState[key]--;
    }
    updateUI(wrapper, key);
});

const video = document.getElementById("mainVideo");
const playBtn = document.getElementById("playBtn");
const wrapper = document.querySelector(".video-wrapper");
function toggleVideo(){
    if(video.paused){
        video.play();
        wrapper.classList.add("playing");
    } 
    else{
        video.pause();
        wrapper.classList.remove("playing");
    }
}

video.addEventListener("click", toggleVideo);
playBtn.addEventListener("click", toggleVideo);
video.addEventListener("ended", () => {
    wrapper.classList.remove("playing");
});

const contactUsForm = document.querySelector(".contact-form")
contactUsForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    this.reset();
});