///////////////////// Scroll animations

const footerBtn = document.querySelector(".footer__back-btn");

if (footerBtn) {
  window.onscroll = () => {
    let top = window.scrollY;
    if (top >= 100) {
      footerBtn.classList.add("back-btn-show");
    } else {
      footerBtn.classList.remove("back-btn-show");
    }
  };

  footerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  });
}

///////////////////// Sub nav hover & functionality

const links = [...document.querySelectorAll(".sub-nav__item")];
let bar = document.querySelector(".sub-nav__line");
let subNav = document.querySelector(".sub-menu");
let subNavInfo = document.querySelector(".sub-menu__info");
let subNavFlavors = document.querySelector(".sub-menu__flavors");

const t1 = new TimelineMax({ paused: true });

if (subNav && subNavInfo && subNavFlavors) {
  t1.to(subNav, 1, {
    className: "+=sub-menu-show",
    ease: Power4.easeInOut
  });

  t1.to(
    subNavInfo,
    1,
    {
      className: "+=sub-item-show",
      ease: Power4.easeInOut
    },
    0.6
  );

  t1.to(
    subNavFlavors,
    1,
    {
      className: "+=sub-item-show",
      ease: Power4.easeInOut
    },
    0.6
  );

  t1.reverse();
}

if (links) {
  links.forEach((link) => {
    link.addEventListener("mouseover", (e) => {
      let activeLink = e.target.parentElement;
      let id = activeLink.dataset.id;
      let barWidth = activeLink.offsetWidth;

      bar.style.width = `${barWidth}px`;
      bar.style.transform = `translateX(${id}px)`;
    });

    link.addEventListener("mouseleave", (e) => {
      bar.style.width = "67px";
      bar.style.transform = "translate(0, 0)";
    });

    link.addEventListener("click", (e) => {
      if (t1.reversed()) {
        t1.play().timeScale(1.5);
      } else {
        t1.reverse().timeScale(1.5);
      }
    });
  });
}

///////////////////// Signup / login animation

const signUpButton = document.getElementById("signUp");
const logInButton = document.getElementById("logIn");
const signUpNav = document.getElementById("signUpNav");
const logInNav = document.getElementById("logInNav");
const container = document.getElementById("form-container");

if (signUpButton) {
  signUpButton.addEventListener("click", () => {
    container.classList.remove("right-panel-static");
    container.classList.add("right-panel-active");
  });
}

if (logInButton) {
  logInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
    container.classList.remove("right-panel-static");
  });
}

if (container) {
  window.onload = () => {
    let val = localStorage.getItem("param");
    if (val && val === "signUp") {
      container.classList.add("right-panel-static");
    }
  };
}

if (signUpNav) {
  signUpNav.addEventListener("click", () => {
    localStorage.setItem("param", "signUp");
  });
}

if (logInNav) {
  logInNav.addEventListener("click", () => {
    localStorage.setItem("param", "logIn");
  });
}

///////////////////// page navigation

const guest = () => {
  window.location.href = "checkout.html";
};

const login = () => {
  window.location.href = "login.html";
};

const home = () => {
  window.location.href = "index.html";
};

///////////////////// popup

const popUp = () => {
  const popUp = document.getElementById("popUp");
  const popUpInner = document.getElementById("popUpInner");
  const t3 = new TimelineMax({ paused: true });

  t3.to(popUp, 0.1, {
    className: "+=pop-up-overlay"
  });

  t3.to(popUpInner, 0.2, {
    className: "+=pop-up-slide"
  });

  t3.play();

  window.onclick = function(event) {
    if (event.target == popUp) {
      t3.reverse();
    }
  };
};

///////////////////// Cart Functionality

// Variables
const cartBtn = document.querySelector(".header__cart");
const cartItems = document.querySelector(".header__cart__item");
const cartItemsInner = document.querySelector(".cart__items");
const cartItemsCheckout = document.querySelector(".cart__items--checkout");
const cartClose = document.querySelector(".cart__close");
const cartDom = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartBg = document.querySelector(".cart-bg");
const cartTotal = document.querySelector(".cart__total");
const cartTotalCheckout = document.querySelector(".cart__total--checkout");
const cartContent = document.querySelector(".cart__content");
const productsDOM = document.querySelector(".product-container");

// cart
let cart = [];
let tempCart = [];

// btnsDom
let btnsDom = [];

// getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch("menu.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const {
          title,
          price,
          description,
          flavor,
          dynaPrice,
          amount,
          egg,
          eggTotal,
          meat,
          meatTotal,
          veggies,
          veggiesTotal
        } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return {
          title,
          price,
          description,
          flavor,
          dynaPrice,
          amount,
          egg,
          eggTotal,
          meat,
          meatTotal,
          veggies,
          veggiesTotal,
          id,
          image,
          // randomID:  Math.random().toString(36).substr(2, 9)
        };      
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

// displaying the products
class UI {
  displayProducts(products) {
    products.forEach((product) => {
      cart.forEach((cartItem) => {
        if (product.id == cartItem.id) {
          if (cartItem.amount > 1) product.amount = cartItem.amount;
        }
      });
    });

    let result = "";
    products.forEach((product) => {
      result += `
        <section class="product section">
        <div class="product__text">
          <h1 class="product__name heading-1">
            ${product.title}
          </h1>
          <h2 class="product__description heading-2">
            ${product.description}
          </h2>
          <h4 class="product__flavor heading-4">
            ${product.flavor}
          </h4>
        </div>
        <div class="product__stat">
          <h3 class="product__stat__1 heading-3">Sweetness</h3>
          <div class="product__stat__bar">
            <span class="product__stat__bar__bar product__stat__bar__bar--red"></span>
            <span class="product__stat__bar__bar product__stat__bar__bar--red"></span>
            <span class="product__stat__bar__bar product__stat__bar__bar--red"></span>
            <span class="product__stat__bar__bar product__stat__bar__bar--white"></span>
            <span class="product__stat__bar__bar product__stat__bar__bar--white"></span>    
          </div>
          <h3 class="product__stat__2 heading-3">Savory</h3>
          <div class="product__stat__bar">
            <span class="product__stat__bar__bar product__stat__bar__bar--red"></span>
            <span class="product__stat__bar__bar product__stat__bar__bar--red"></span>
            <span class="product__stat__bar__bar product__stat__bar__bar--red"></span>
            <span class="product__stat__bar__bar product__stat__bar__bar--red"></span>
            <span class="product__stat__bar__bar product__stat__bar__bar--white"></span> 
          </div>
        </div>
        <div class="product__img">
          <img src="${product.image}" class="product__img__img">
        </div>
        
        <div class="product__serving">
        <h1 class="heading-1 heading-1--num"><span class="heading-2">Php </span>${product.price}</h1>

        <div class="product__serving__additional">
          <h2 class="heading-4">Additional :</h2>
          <div>
            <picture class="additional" data-id=${product.id}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.998 511"><path d="m 260.543 212.926 c -17.4805 13.3281 -27.5078 33.5664 -27.5078 55.5273 c 0 4.14844 3.36328 7.50781 7.51172 7.50781 s 7.50781 -3.35938 7.50781 -7.50781 c 0 -17.2344 7.87109 -33.1172 21.5977 -43.582 c 3.29688 -2.51563 3.93359 -7.22656 1.41797 -10.5273 c -2.51562 -3.30078 -7.22656 -3.93359 -10.5273 -1.41797 Z m 0 0" /><path d="m 450.887 134.438 c -5.19531 -4.05469 -10.5664 -8.24609 -15.6797 -12.6953 c -3.12891 -2.72266 -7.87109 -2.39453 -10.5977 0.734374 c -2.72266 3.12891 -2.39453 7.875 0.734375 10.5977 c 5.41797 4.71094 10.9492 9.03125 16.2969 13.2031 c 29.6914 23.1758 55.3359 43.1875 55.3359 121.098 c 0 33.8125 -10.2969 69.5625 -28.25 98.0859 c -13.7188 21.7969 -38.2539 49.7188 -77.25 58.9531 c -26.8086 6.34766 -44.9531 21.9102 -62.5039 36.9609 c -20.6953 17.7461 -40.2422 34.5117 -72.9727 34.5117 c -52.2734 0 -85.3164 -27.0664 -121.688 -70.7344 c -2.65625 -3.1875 -7.39063 -3.61719 -10.5781 -0.960938 c -3.1875 2.65234 -3.62109 7.39063 -0.964844 10.5781 c 30.6797 36.8359 68.8125 76.1406 133.23 76.1406 c 38.2891 0 60.8945 -19.3867 82.7539 -38.1328 c 16.9336 -14.5234 32.9258 -28.2383 56.1836 -33.7461 c 76.0352 -18.0039 117.059 -101.879 117.059 -171.656 c 0.003906 -85.2422 -31.0664 -109.488 -61.1094 -132.938 Z m 0 0" /><path d="m 100.43 383.465 c -11.5781 -13.8711 -24.957 -21.7461 -37.8984 -29.3594 c -25.4922 -15.0039 -47.5078 -27.9609 -47.5078 -86.7305 c 0 -29.8789 8.26562 -54.0078 25.2773 -73.7734 c 15.1484 -17.6016 34.8555 -29.4922 53.918 -40.9883 c 13.4844 -8.13672 26.2227 -15.8203 36.3086 -25 c 15.6797 -14.2734 23.0898 -32.1992 30.2617 -49.5391 c 13.875 -33.5625 25.8633 -62.5508 95.2109 -62.5508 c 74.6875 0 98.7969 31.6133 129.324 71.6367 c 4.72656 6.19531 9.60938 12.6016 14.8047 19.0195 c 2.60938 3.22656 7.33984 3.72266 10.5625 1.11328 c 3.22656 -2.60938 3.72266 -7.33984 1.11328 -10.5625 c -5.05469 -6.25 -9.875 -12.5703 -14.5352 -18.6797 c -30.418 -39.8828 -59.1484 -77.5508 -141.27 -77.5508 c -35.2773 0 -60.9961 7.42969 -78.6289 22.7148 c -15.832 13.7227 -23.2695 31.7148 -30.4648 49.1211 c -6.83984 16.5391 -13.2969 32.1563 -26.4922 44.168 c -8.99219 8.1875 -21.1211 15.5 -33.957 23.2461 c -38.5195 23.2344 -86.457 52.1484 -86.457 127.625 c 0 67.3633 27.9141 83.7891 54.9102 99.6758 c 12.3828 7.28516 24.0781 14.1719 33.9844 26.0391 c 3.41016 4.08594 7.02344 8.50391 11.7148 14.3281 c 1.48438 1.84375 3.66016 2.79688 5.85547 2.79688 c 1.65234 0 3.32031 -0.542969 4.70703 -1.66016 c 3.23047 -2.60547 3.73828 -7.33203 1.13672 -10.5625 c -4.75 -5.89453 -8.41406 -10.375 -11.8789 -14.5273 Z m 0 0" /><path d="m 302.816 164.801 c -57.1523 0 -103.652 46.5 -103.652 103.652 s 46.5 103.652 103.652 103.652 s 103.652 -46.5 103.652 -103.652 s -46.5 -103.652 -103.652 -103.652 Z m 0 192.281 c -48.8711 0 -88.6289 -39.7578 -88.6289 -88.6289 s 39.7578 -88.6289 88.6289 -88.6289 s 88.6289 39.7578 88.6289 88.6289 s -39.7578 88.6289 -88.6289 88.6289 Z m 0 0" /></svg>
              <h4 class="heading-5">egg</h4>
              <h5 class="heading-5 heading-5--num">Php 15</h5>
            </picture>
            <picture class="additional" data-id=${product.id}>
              <svg height="511pt" viewBox="0 -66 511.99999 511" width="511pt" xmlns="http://www.w3.org/2000/svg"><path d="m506.210938 104.640625c-10.757813-37.023437-35.289063-67.644531-69.074219-86.21875-33.789063-18.574219-72.785157-22.882813-109.8125-12.125-16.296875 4.734375-31.859375 12.484375-46.910157 19.980469-30.9375 15.402344-60.15625 29.949218-96.050781 21.050781-28.417969-7.046875-54.632812-10.25-77.917969-9.515625-29.8125.933594-53.882812 8.414062-71.539062 22.226562-23.160156 18.121094-34.90625 46.699219-34.90625 84.9375v74.425782c0 30.617187 10.082031 61.109375 28.386719 85.855468 18.917969 25.578126 45.101562 43.796876 75.722656 52.691407 49.46875 14.371093 100.734375 21.585937 152.011719 21.585937 40.015625 0 80.039062-4.394531 119.207031-13.203125 4.039063-.910156 6.578125-4.921875 5.667969-8.964843-.90625-4.039063-4.921875-6.574219-8.960938-5.671876-38.09375 8.570313-77 12.84375-115.914062 12.84375-49.859375-.003906-99.726563-7.019531-147.824219-20.992187-27.441406-7.972656-50.9375-24.269531-67.847656-47.207031-29.28125-39.71875-25.449219-87.496094-25.449219-87.496094 3.792969 7.699219 8.265625 15.070312 13.386719 21.992188 18.917969 25.574218 45.101562 43.792968 75.722656 52.691406 49.679687 14.433594 100.78125 21.648437 151.882813 21.648437 51.097656 0 102.09375-7.582031 151.878906-21.648437 68.664062-19.402344 88.054687-72.515625 88.921875-74.25l-.050781 17.765625c-3.25 54.46875-40.625 101.269531-93.058594 116.503906-3.976563 1.15625-6.402344 5.359375-5.109375 9.296875 2.199219 6.679688 8.597656 5.3125 9.296875 5.109375 58.582031-17.023437 100.320312-69.363281 103.855468-130.242187.007813-.140626.234376-79.257813.234376-79.257813.339843-14.621094-1.554688-29.363281-5.75-43.8125zm-25.265626 102.585937c-16.714843 30.238282-44.085937 52.257813-77.261718 61.894532-96.625 28.070312-198.765625 28.070312-295.390625 0-27.4375-7.972656-50.898438-24.296875-67.847657-47.207032-16.410156-22.183593-25.445312-49.507812-25.445312-76.9375 0-33.390624 9.808594-57.992187 29.148438-73.125 18.433593-14.417968 43.660156-19.109374 68.691406-19.109374 25.242187 0 50.183594 5.175781 67.914062 9.144531 45.074219 10.078125 81.226563-9.679688 106.34375-22.183594 15.125-7.527344 29.410156-14.640625 44.414063-19 33.175781-9.640625 68.121093-5.78125 98.398437 10.863281 30.277344 16.644532 52.257813 44.082032 61.898438 77.261719 3.417968 11.773437 5.132812 23.765625 5.183594 35.695313-.007813.144531 2.070312 29.925781-16.046876 62.703124zm0 0"/><path d="m367.660156 41.585938c-24.632812 0-61.757812 17.859374-68.953125 21.441406-26.40625 13.148437-56.34375 28.054687-92.496093 28.054687-4.925782 0-24.609376-2.96875-41.976563-5.59375-20.488281-3.089843-41.671875-6.289062-50.972656-6.714843-22.945313-1.050782-40.957031 4.492187-53.519531 16.492187-8.527344 8.140625-18.6875 23.375-18.6875 49.710937 0 22.449219 11.488281 46.25 31.523437 65.300782 3 2.851562 7.75 2.734375 10.601563-.269532 2.855468-3 2.734374-7.746093-.265626-10.601562-17.070312-16.234375-26.863281-36.070312-26.863281-54.433594 0-16.644531 4.859375-30.082031 14.050781-38.863281 9.484376-9.058594 23.769532-13.222656 42.472657-12.355469 8.519531.390625 30.25 3.671875 49.421875 6.566406 23.746094 3.582032 38.570312 5.761719 44.214844 5.761719 39.679687 0 71.292968-15.742187 99.183593-29.628906 18.414063-9.164063 45.769531-19.871094 62.265625-19.871094 38.988282 0 73.828125 26.195313 84.722656 63.695313 6.582032 22.648437 3.949219 46.5-7.414062 67.167968-8.503906 15.472657-31.652344 29.734376-50.476562 37.925782-36.226563 15.761718-82.824219 23.75-138.503907 23.75-63.199219 0-113.421875-10.746094-149.261719-31.945313-3.566406-2.105469-8.164062-.925781-10.273437 2.640625s-.929687 8.164063 2.636719 10.269532c38.1875 22.585937 90.976562 34.035156 156.898437 34.035156 57.75 0 106.363281-8.410156 144.488281-24.996094 39.382813-17.132812 53.425782-36.792969 57.636719-44.453125 13.292969-24.179687 16.375-52.082031 8.675781-78.578125-12.746093-43.867188-53.507812-74.507812-99.128906-74.507812zm0 0"/><path d="m419.75 143.808594c0-26.625-21.660156-48.285156-48.28125-48.285156-26.625 0-48.285156 21.660156-48.285156 48.285156s21.660156 48.285156 48.285156 48.285156c26.621094 0 48.28125-21.660156 48.28125-48.285156zm-81.566406 0c0-18.355469 14.929687-33.285156 33.285156-33.285156 18.351562 0 33.285156 14.929687 33.285156 33.285156 0 18.351562-14.933594 33.285156-33.285156 33.285156-18.355469 0-33.285156-14.933594-33.285156-33.285156zm0 0"/></svg>
              <h4 class="heading-5">meat</h4>
              <h5 class="heading-5 heading-5--num">Php 20</h5>
            </picture>
              <picture class="additional" data-id=${product.id}>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <path d="M491.02,240.438c-5.722-7.12-7.749-16.621-5.423-25.415c12.463-47.117-6.695-96.525-47.673-122.944
                c-35.612-22.96-80.518-23.99-117.194-2.685c-3.582,2.081-4.798,6.671-2.718,10.252c2.081,3.582,6.671,4.799,10.252,2.718
                c31.774-18.459,70.68-17.57,101.532,2.321c35.499,22.888,52.097,65.687,41.3,106.502c-3.541,13.381-0.463,27.829,8.231,38.647
                c21.628,26.913,23.579,64.507,4.856,93.547c-23.162,35.925-60.053,36.546-62.501,36.546c-0.029,0-33.354,2.457-75.689,15.655
                c-29.736,9.27-54.393,20.72-74.643,32.653c11.274-20.437,24.49-44.712,37.713-69.733c25.438-11.977,58.105-22.507,95.909-23.871
                c4.14-0.149,7.373-3.626,7.225-7.766c-0.149-4.141-3.635-7.362-7.766-7.225c-32.374,1.169-61.018,8.709-84.32,17.769
                c10.721-20.656,21.075-41.21,30-59.966c13.287-4.123,31.448-8.048,53.763-8.75c4.14-0.13,7.391-3.592,7.26-7.73
                c-0.13-4.141-3.588-7.391-7.73-7.261c-14.694,0.462-27.766,2.205-39.173,4.588c8.313-12.374,15.549-29.429,15.849-51.559
                c0.556-41.018-25.085-77.628-63.806-91.096c-8.627-3.003-15.386-9.981-18.079-18.671C283.77,50.41,241.323,18.688,192.57,18.027
                c-20.041-0.275-39.795,4.816-57.107,14.717c-3.596,2.057-4.844,6.638-2.788,10.232c2.057,3.597,6.639,4.844,10.233,2.788
                c14.986-8.57,32.054-12.978,49.459-12.74c42.233,0.573,79.006,28.053,91.502,68.38c4.098,13.221,14.369,23.836,27.478,28.397
                c32.61,11.343,54.204,42.177,53.736,76.727c-0.586,43.248-32.262,63.307-33.66,64.169c-0.142,0.086-26.909,19.734-55.802,53.383
                c-20.292,23.633-35.122,46.419-45.959,67.277c-1.261-22.884-2.938-50.537-5.017-79.002c15.246-23.722,37.378-50.058,68.645-71.23
                c3.43-2.322,4.328-6.985,2.005-10.414c-2.322-3.431-6.986-4.327-10.415-2.005c-26.828,18.165-47.113,39.755-62.062,59.797
                c-1.195-14.857-2.497-29.632-3.906-43.766c-0.812-8.146-1.634-15.809-2.465-23.006c9.439-10.981,22.719-23.709,40.938-35.92
                c3.441-2.306,4.36-6.965,2.054-10.404c-2.307-3.442-6.967-4.36-10.405-2.054c-14.372,9.633-25.95,19.067-35.183,27.665
                c-1.451-10.604-2.923-19.776-4.406-27.415c-4.242-21.845-8.631-34.518-18.517-34.651c-0.052-0.001-0.104-0.001-0.156-0.001
                c-9.778,0-14.486,12.53-19.294,34.137c-1.753,7.879-3.537,17.405-5.342,28.47c-8.907-9.56-20.149-19.795-34.225-29.794
                c-3.375-2.398-8.058-1.605-10.456,1.77c-2.399,3.377-1.606,8.06,1.771,10.457c18.201,12.929,31.158,26.245,39.946,37.031
                c-1.025,7.168-2.055,14.8-3.086,22.917c-1.791,14.091-3.493,28.825-5.091,43.644c-14.399-20.441-34.092-42.572-60.417-61.459
                c-3.366-2.416-8.052-1.645-10.465,1.722c-2.415,3.365-1.644,8.052,1.722,10.465c30.706,22.03,52.109,48.913,66.694,73.001
                c-2.853,28.424-5.282,56.051-7.165,78.91c-13.498-27.71-29.942-51.064-44.117-68.509c-27.965-34.416-53.682-54.412-53.925-54.593
                c-0.136-0.101-0.274-0.197-0.417-0.289c-1.483-0.974-32.484-21.886-31.898-65.054c0.468-34.55,22.892-64.787,55.797-75.241
                c13.227-4.202,23.785-14.534,28.238-27.641c4.359-12.825,11.242-24.414,20.459-34.443c2.803-3.051,2.602-7.794-0.448-10.597
                c-3.05-2.805-7.794-2.602-10.596,0.447C97.82,65.878,89.874,79.257,84.84,94.07c-2.928,8.612-9.873,15.406-18.579,18.173
                C27.191,124.657,0.566,160.557,0.01,201.577c-0.668,49.223,33.523,74.299,38.407,77.616c3,2.341,96.125,76.423,115.492,183.348
                c2.705,14.934,15.201,26.092,30.134,27.255c5.039,2.808,10.592,4.188,16.124,4.188c8.828,0,17.588-3.495,24.052-10.223
                c75.503-78.584,194.534-88.611,197.652-88.843c5.786-0.085,48.35-2.196,74.921-43.408
                C519.02,317.031,516.701,272.395,491.02,240.438z M204.479,460.354c-1.789,8.548-9.387,14.624-18.107,14.551
                c-8.702-0.118-16.149-6.442-17.706-15.037c-2.496-13.778-6.174-27.004-10.648-39.588c2.826-36.83,8.545-105.94,15.855-165.682
                c7.44-60.809,13.286-85.393,16.781-95.321c3.224,10.019,8.401,34.752,14.189,95.741c5.688,59.939,9.532,129.213,11.357,166.097
                C210.479,435.937,206.814,449.199,204.479,460.354z M217.292,469.424c0.798-1.91,14.363-98.094,107.222-173.701
                c-26.653,53.513-60.389,114.865-80.365,150.602C233.43,454.36,224.549,462.226,217.292,469.424z"/>
                </svg>
                <h4 class="heading-5">veggies</h4>
                <h5 class="heading-5 heading-5--num">Php 30</h5>
            </picture>
          </div>
        </div>

        <div class="product__serving__quantity">
          <h4 class="heading-4">Quantity :</h4>
          <div>
              <span class="add-quantity heading-3 heading-3--num" data-id=${product.id}>+</span>
              <h2 class="quantity heading-3 heading-3--num" data-id=${product.id}>${product.amount}</h2>
              <span class="minus-quantity heading-3 heading-3--num" data-id=${product.id}>-</span>
          </div>
        </div>
        </div>

    <div class="product__btns">
      <button class="product__btn btn btn--product add-to-cart" data-id=${product.id}>Add to order</button>
      <button class="product__btn btn btn--product btn--product--light buy-now" data-id=${product.id} onclick="login()">buy now</button>
    </div>

    </section>
        `;
    });
    if (productsDOM) {
      productsDOM.innerHTML = result;

      new fullpage("#fullpage", {
        //options here
        autoScrolling: true,
        scrollingSpeed: 600,
        controlArrows: false,
        continuousVertical: true,
        onLeave: (origin, destination, direction) => {
          const section = destination.item;

          const title = section.querySelector(".product__text");
          const img = section.querySelector(".product__img");
          const buttons = section.querySelector(".product__btns");
          const stat = section.querySelector(".product__stat");
          const serving = section.querySelector(".product__serving");

          const tl = new TimelineMax({ delay: 0.4 });

          tl.fromTo(title, 0.2, { y: "20", opacity: 0 }, { y: 0, opacity: 1 })
            .fromTo(
              stat,
              0.2,
              { y: "20", opacity: 0 },
              { y: 0, opacity: 1 },
              "-=0.1"
            )
            .fromTo(
              img,
              0.1,
              { y: "50", opacity: 0 },
              { y: 0, opacity: 1 },
              "-=0.09"
            )
            .fromTo(
              serving,
              0.2,
              { y: "20", opacity: 0 },
              { y: 0, opacity: 1 },
              "-=0.1"
            )
            .fromTo(
              buttons,
              0.2,
              { y: "20", opacity: 0 },
              { y: 0, opacity: 1 },
              "-=0.1"
            );
        }
      });
    }
  }

  getBagBtns() {
    const btns = [...document.querySelectorAll(".product__btn")];
    btnsDom = btns;
    btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let id = btn.dataset.id;
        let inCart = cart.find((item) => item.id === id);

        if (e.target.classList.contains(".buy-now")) {
          window.location.href = "login.html";
        }

        if (!inCart) {
          let cartItem = Storage.getProduct(id);
          cart = [...cart, cartItem];
          Storage.saveCart(cart);
          this.setCartValues(cart);
          this.addCartItem(cartItem);
          this.glowCart();
        } else {
          let amounts = [...document.querySelectorAll(".cart-amount")];
          let prices = [...document.querySelectorAll(".cart__item__price")];
          let tempAmount = amounts.find((amount) => amount.dataset.id === id);
          let tempPrice = prices.find((price) => price.dataset.id === id);

          inCart.dynaPrice = inCart.amount * inCart.price;
          Storage.saveCart(cart);
          this.setCartValues(cart);

          tempAmount.innerText = inCart.amount;
          tempPrice.innerText = inCart.dynaPrice;
          this.glowCart();
        }
      });
    });
  }

  quantity() {
    if (productsDOM) {
      productsDOM.addEventListener("click", (e) => {
        if (e.target.matches(".add-quantity")) {
          let addQuantity = e.target;
          let id = addQuantity.dataset.id;
          let inCart = cart.find((item) => item.id === id);
          let quantity = [...document.querySelectorAll(".quantity")];
          let cartQuantity = quantity.find(
            (quantity) => quantity.dataset.id === id
          );
          let tempQuantity;

          if (!inCart) {
            let cartItem = Storage.getProduct(id);
            cart = [...cart, cartItem];
            cartItem.amount += 1;
            cartItem.dynaPrice = cartItem.amount * cartItem.price;
            Storage.saveCart(cart);
            this.addCartItem(cartItem);
            cartQuantity.innerText = cartItem.amount;
          } else {
            tempQuantity = inCart.amount += 1;
            console.log(tempQuantity);
            inCart.amount = tempQuantity;
            inCart.dynaPrice = inCart.amount * inCart.price;
            Storage.saveCart(cart);
            cartQuantity.innerText = inCart.amount;
          }
        } else if (e.target.matches(".minus-quantity")) {
          let minusQuantity = e.target;
          let id = minusQuantity.dataset.id;
          let inCart = cart.find((item) => item.id === id);
          let quantity = [...document.querySelectorAll(".quantity")];
          let cartQuantity = quantity.find(
            (quantity) => quantity.dataset.id === id
          );
          let tempQuantity;

          if (inCart.amount > 1) {
            tempQuantity = inCart.amount -= 1;
            inCart.amount = tempQuantity;
            inCart.dynaPrice = inCart.amount * inCart.price;
            Storage.saveCart(cart);
            cartQuantity.innerText = inCart.amount;
          }
        }
      });
    }
  }

  additional() {
    const addBtns = [...document.querySelectorAll(".additional")];
    if (addBtns) {
      addBtns.forEach((addBtn) => {
        addBtn.addEventListener("click", (e) => {
          let id = addBtn.dataset.id;
          let inCart = cart.find((item) => item.id === id);

          if (inCart) {
            this.showCart();
            this.toggleEditContent(addBtn);
          }
        });
      });
    }
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let numItems = 0;

    cart.map((item) => {
      let eggTotal = item.eggTotal;
      let meatTotal = item.meatTotal;
      let veggiesTotal = item.veggiesTotal;
      let dynaPrice = item.dynaPrice;

      tempTotal += eggTotal + meatTotal + veggiesTotal + dynaPrice;
      numItems += item.amount;
    });

    if (cartTotal && cartItems && cartItemsInner) {
      cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
      cartItems.innerText = numItems;
      cartItemsInner.innerText = numItems;
    }

    if (cartItemsCheckout && cartTotalCheckout) {
      cartItemsCheckout.innerText = numItems;
      cartTotalCheckout.innerText = parseFloat(tempTotal.toFixed(2));
    }
  }

  addCartItem(item) {
    let div = document.createElement("div");
    div.classList.add("cart__item");
    div.innerHTML = `
            <div class="cart__item__amount">
                <span class="add-item heading-3 heading-3--num" data-id=${item.id}>+</span>
                <h2 class="heading-3 heading-3--num cart-amount" data-id=${item.id}>${item.amount}</h2>
                <span class="minus-item heading-3 heading-3--num" data-id=${item.id}>-</span>
            </div>

            <img src=${item.image} alt="${item.title}" class="cart__item__img">
            <div class="cart__item__main">
                <h3 class="cart__item__main__title heading-4 heading-4--dark">${item.title}</h3>
                <div class="cart__item__main__additional" data-id=${item.id}>
                    <h4 class="heading-5 heading-5--small">Egg (<span class="heading-5--num">${item.egg}</span>)</h4>
                    <h4 class="heading-5 heading-5--small">Meat (<span class="heading-5--num">${item.meat}</span>)</h4>
                    <h4 class="heading-5 heading-5--small">Veggies (<span class="heading-5--num">${item.veggies}</span>)</h4>
                </div>
                <a href="#" class="cart__item__main__edit edit-btn" data-id=${item.id}>EDIT</a>
            </div>
            <h4 class="heading-4 heading-4--dark">&#8369; <span class="cart__item__price heading-4--num" data-id=${item.id}>${item.dynaPrice}</span></h4>
                
            <div class="cart__edit__amount heading-5 heading-5--small" data-id=${item.id}>
                <div>
                    <span class="add-egg" data-id=${item.id}>+</span>
                    <h5 class="heading-5--num">${item.egg}</h5>
                    <span class="minus-egg" data-id=${item.id}>-</span>
                </div>
                <div>
                    <span class="add-meat" data-id=${item.id}>+</span>
                    <h5 class="heading-5--num">${item.meat}</h5>
                    <span class="minus-meat" data-id=${item.id}>-</span>
                </div>
                <div>
                    <span class="add-veggies" data-id=${item.id}>+</span>
                    <h5 class="heading-5--num">${item.veggies}</h5>
                    <span class="minus-veggies" data-id=${item.id}>-</span>
                </div>
            </div>

            <div class="cart__edit__additional" data-id=${item.id}>
                <h4 class="heading-5 heading-5--small">Egg</h4>
                <h4 class="heading-5 heading-5--small">Meat</h4>
                <h4 class="heading-5 heading-5--small">Veggies</h4>
            </div>

            <div class="cart__edit__price" data-id=${item.id}>
                <h4 class="heading-5 heading-5--small">&#8369;<span class="heading-5--num">15</span></h4>
                <h4 class="heading-5 heading-5--small">&#8369;<span class="heading-5--num">20</span></h4>
                <h4 class="heading-5 heading-5--small">&#8369;<span class="heading-5--num">30</span></h4>
            </div>

            <div class="cart__edit__total" data-id=${item.id}>
                <h4 class="heading-5 heading-5--small">&#8369;<span class="heading-5--num">${item.eggTotal}</span></h4>
                <h4 class="heading-5 heading-5--small">&#8369;<span class="heading-5--num">${item.meatTotal}</span></h4>
                <h4 class="heading-5 heading-5--small">&#8369;<span class="heading-5--num">${item.veggiesTotal}</span></h4>
            </div>
            
            <div class="cart__edit__buttons" data-id=${item.id}>
                <a href="#" class="cart__item__main__edit save-edit-btn" data-id=${item.id}>SAVE EDIT</a>
                <a href="#" class="cart__item__main__edit cancel-edit-btn" data-id=${item.id}>CANCEL</a>
            </div>
            `;
    if (cartContent) {
      cartContent.appendChild(div);
    }
  }

  glowCart() {
    const t2 = new TimelineMax({ paused: true });

    t2.to(cartBtn, 0.3, {
      className: "+=glow-cart"
    });

    t2.to(cartBtn, 0.3, {
      className: "-=glow-cart"
    });

    t2.play();
  }

  showCart() {
    cartDom.classList.add("cartShow");
    cartOverlay.classList.add("cartBcg");
    cartBg.classList.add("cartBcg");
  }

  setUpAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    if (cartBtn && cartClose) {
      cartBtn.addEventListener("click", this.showCart);
      cartClose.addEventListener("click", this.hideCart);
    }
  }

  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }

  hideCart() {
    cartDom.classList.remove("cartShow");
    cartOverlay.classList.remove("cartBcg");
    cartBg.classList.remove("cartBcg");
  }

  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
  }

  removeTempItem(id) {
    tempCart = tempCart.filter((item) => item.id !== id);
    Storage.saveTempCart(tempCart);
  }

  getSingleBtn(id) {
    return btnsDom.find((btn) => btn.dataset.id === id);
  }

  cartLogic() {
    if (cartContent) {
      cartContent.addEventListener("click", (e) => {
        if (e.target.matches(".add-item")) {
          let addAmount = e.target;
          this.add(addAmount);
        } else if (e.target.matches(".minus-item")) {
          let minusAmount = e.target;
          this.minus(minusAmount);
        } else if (e.target.matches(".add-egg")) {
          let addEgg = e.target;
          this.add(addEgg);
        } else if (e.target.matches(".minus-egg")) {
          let minusEgg = e.target;
          this.minus(minusEgg);
        } else if (e.target.matches(".add-meat")) {
          let addMeat = e.target;
          this.add(addMeat);
        } else if (e.target.matches(".minus-meat")) {
          let minusMeat = e.target;
          this.minus(minusMeat);
        } else if (e.target.matches(".add-veggies")) {
          let addVeggies = e.target;
          this.add(addVeggies);
        } else if (e.target.matches(".minus-veggies")) {
          let minusVeggies = e.target;
          this.minus(minusVeggies);
        } else if (e.target.matches(".edit-btn")) {
          let editBtn = e.target;
          this.toggleEditContent(editBtn);
        } else if (e.target.matches(".save-edit-btn")) {
          let saveEdit = e.target;
          this.toggleEditContent(saveEdit);
        } else if (e.target.matches(".cancel-edit-btn")) {
          let cancelEdit = e.target;
          this.toggleEditContent(cancelEdit);
        }
      });
    }
  }

  add(ing) {
    let id = ing.dataset.id;
    let tempItem = cart.find((item) => item.id === id);
    const mainCounters = [
      ...document.querySelectorAll(".cart__item__main__additional")
    ];
    let mainCounter = mainCounters.find(
      (mainCounter) => mainCounter.dataset.id === id
    );

    if (ing.matches(".add-veggies")) {
      tempItem.veggies += 1;
      tempItem.veggiesTotal = tempItem.veggies * 30;
      ing.nextElementSibling.innerText = tempItem.veggies;

      ing.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `&#8369;<span class="heading-5--num">${tempItem.veggiesTotal}</span>`;
      mainCounter.lastElementChild.firstElementChild.innerText =
        tempItem.veggies;
    } else if (ing.matches(".add-egg")) {
      tempItem.egg += 1;
      tempItem.eggTotal = tempItem.egg * 15;
      ing.nextElementSibling.innerText = tempItem.egg;

      ing.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML = `&#8369;<span class="heading-5--num">${tempItem.eggTotal}</span>`;
      mainCounter.firstElementChild.firstElementChild.innerText = tempItem.egg;
    } else if (ing.matches(".add-meat")) {
      tempItem.meat += 1;
      tempItem.meatTotal = tempItem.meat * 20;
      ing.nextElementSibling.innerText = tempItem.meat;

      ing.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerHTML = `&#8369;<span class="heading-5--num">${tempItem.meatTotal}</span>`;
      mainCounter.firstElementChild.nextElementSibling.firstElementChild.innerText =
        tempItem.meat;
    } else if (ing.matches(".add-item")) {
      tempItem.amount += 1;
      tempItem.dynaPrice = tempItem.amount * tempItem.price;

      ing.nextElementSibling.innerText = tempItem.amount;
      ing.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerText =
        tempItem.dynaPrice;
    }

    Storage.saveCart(cart);
    this.setCartValues(cart);
  }

  minus(ing) {
    let id = ing.dataset.id;
    let tempItem = cart.find((item) => item.id === id);
    const mainCounters = [
      ...document.querySelectorAll(".cart__item__main__additional")
    ];
    let mainCounter = mainCounters.find(
      (mainCounter) => mainCounter.dataset.id === id
    );

    if (ing.matches(".minus-egg")) {
      if (tempItem.egg > 0) {
        tempItem.egg -= 1;
        tempItem.eggTotal = tempItem.egg * 15;
        ing.previousElementSibling.innerText = tempItem.egg;

        ing.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerHTML = `&#8369;<span class="heading-5--num">${tempItem.eggTotal}</span>`;
        mainCounter.firstElementChild.firstElementChild.innerText =
          tempItem.egg;
      }
    } else if (ing.matches(".minus-meat")) {
      if (tempItem.meat > 0) {
        tempItem.meat -= 1;
        tempItem.meatTotal = tempItem.meat * 20;
        ing.previousElementSibling.innerText = tempItem.meat;

        ing.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.innerHTML = `&#8369;<span class="heading-5--num">${tempItem.meatTotal}</span>`;
        mainCounter.firstElementChild.nextElementSibling.firstElementChild.innerText =
          tempItem.meat;
      }
    } else if (ing.matches(".minus-veggies")) {
      if (tempItem.veggies > 0) {
        tempItem.veggies -= 1;
        tempItem.veggiesTotal = tempItem.veggies * 30;
        ing.previousElementSibling.innerText = tempItem.veggies;

        ing.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = `&#8369;<span class="heading-5--num">${tempItem.veggiesTotal}</span>`;
        mainCounter.lastElementChild.firstElementChild.innerText =
          tempItem.veggies;
      }
    } else if (ing.matches(".minus-item")) {
      tempItem.amount -= 1;
      tempItem.dynaPrice = tempItem.amount * tempItem.price;
      if (tempItem.amount > 0) {
        Storage.saveCart(cart);
        this.setCartValues(cart);
        ing.previousElementSibling.innerText = tempItem.amount;
        ing.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.innerText =
          tempItem.dynaPrice;
      } else {
        cartContent.removeChild(ing.parentElement.parentElement);
        this.removeItem(id);
      }
    }

    Storage.saveCart(cart);
    this.setCartValues(cart);
  }

  toggleEditContent(btn) {
    let id = btn.dataset.id;
    const editBtns = [...document.querySelectorAll(".edit-btn")];
    let editBtn = editBtns.find((editBtn) => editBtn.dataset.id === id);

    let cartAmounts = [...document.querySelectorAll(".cart__edit__amount")];
    let cartAdditionals = [
      ...document.querySelectorAll(".cart__edit__additional")
    ];
    let cartPrices = [...document.querySelectorAll(".cart__edit__price")];
    let cartTotals = [...document.querySelectorAll(".cart__edit__total")];
    let cartBtns = [...document.querySelectorAll(".cart__edit__buttons")];

    let cartAmount = cartAmounts.find(
      (cartAmount) => cartAmount.dataset.id === id
    );
    let cartAdditional = cartAdditionals.find(
      (cartAdditional) => cartAdditional.dataset.id === id
    );
    let cartPrice = cartPrices.find((cartPrice) => cartPrice.dataset.id === id);
    let cartTotal = cartTotals.find((cartTotal) => cartTotal.dataset.id === id);
    let cartBtn = cartBtns.find((cartBtn) => cartBtn.dataset.id === id);

    if (btn.classList.contains("edit-btn")) {
      btn.classList.add("hideBtn");
      cartAmount.classList.add("showEdit");
      cartAdditional.classList.add("showEdit");
      cartPrice.classList.add("showEdit");
      cartTotal.classList.add("showEdit");
      cartBtn.classList.add("showEdit");
      cartBtn.classList.add("opacity");
      cartBtn.classList.add("display");
    } else if (btn.classList.contains("save-edit-btn") || "cancel-edit-btn") {
      editBtn.classList.remove("hideBtn");
      cartAmount.classList.remove("showEdit");
      cartAdditional.classList.remove("showEdit");
      cartPrice.classList.remove("showEdit");
      cartTotal.classList.remove("showEdit");
      cartBtn.classList.remove("showEdit");
      cartBtn.classList.remove("opacity");
      cartBtn.classList.remove("display");
    }

    if (btn.classList.contains("additional")) {
      editBtn.classList.add("hideBtn");
      cartAmount.classList.add("showEdit");
      cartAdditional.classList.add("showEdit");
      cartPrice.classList.add("showEdit");
      cartTotal.classList.add("showEdit");
      cartBtn.classList.add("showEdit");
      cartBtn.classList.add("opacity");
      cartBtn.classList.add("display");
    }
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static saveTempCart(tempCart) {
    localStorage.setItem("tempCart", JSON.stringify(tempCart));
  }

  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

// task runner
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // setup app
  ui.setUpAPP();

  // get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagBtns();
      ui.additional();
      ui.quantity();
      ui.cartLogic();
    });
});
