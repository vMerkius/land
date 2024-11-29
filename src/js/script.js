import { data } from "../data/data.js";
const { cards, articles, testimonials } = data;

const navbar = document.querySelector(".nav");

const cardsContainer = document.querySelector(".cards__container");
const cardsBtnsContainer = document.querySelector(".cards__paging");
const cardsBtns = document.querySelectorAll(".cards__btn");
const cardsTypes = document.querySelector(".cards__options");

const testimonialsContainer = document.querySelector(
  ".testimonials__container"
);
const dotButtons = document.querySelectorAll(".testimonials__dot-btn");

const showMoreBtn = document.querySelector(".more__show-btn");
const moreRight = document.querySelector(".more__right");
const moreLeft = document.querySelector(".more__left");

const textarea = document.querySelector("#message");
const current = document.querySelector("#current");
const customSelect = document.querySelector(".custom-select");

const emailInput = document.querySelector("#email");
const emailBtn = document.querySelector(".subscribe__btn");
const inputBox = document.querySelector(".subscribe__rounded-box");

const valueSelect = document.querySelector(".custom-select__value");
const options = document.querySelector(".custom-select__options");
const optionItems = document.querySelectorAll(".custom-select__option");
const arrow = document.querySelector(".custom-select__icon");

const closeCookies = document.querySelector(".footer__icon-x");
const cookies = document.querySelector(".footer__cookies");

// ------ Navbar
window.addEventListener("scroll", () => {
  setTimeout(() => {
    if (window.scrollY > 70) {
      navbar.classList.add("nav--scrolled");
    } else {
      navbar.classList.remove("nav--scrolled");
    }
  }, 500);
});

const generateTestimonial = (testimonial) => {
  return `
  <div class="testimonial">
    <img
      src="./src/img/${testimonial.img}"
      alt="House img"
      class="testimonial__img"
    />
    <div class="testimonial__review">
      <h3 class="testimonial__header">${testimonial.header}</h3>
      <p class="testimonial__text">
        ${testimonial.text}
      </p>
      <div class="testimonial__bottom">
        <div class="owner">
          <img
            src="./src/img/${testimonial.ownerImg}"
            alt="Owner"
            class="owner__img"
          />
          <div class="owner__info">
            <span class="owner__name">${testimonial.owner}</span>
            <span class="owner__location">${testimonial.location}</span>
          </div>
        </div>
        <div class="testimonial__rating-container">
          <img
            src="./src/img/icon-star.svg"
            alt="Star icon"
            class="testimonial__star"
          />
          <span class="testimonial__rating">${testimonial.rating}</span>
        </div>
      </div>
    </div>
  </div>
  `;
};

const renderTestimonials = () => {
  const testimonialsHTML = testimonials
    .map((testimonial) => generateTestimonial(testimonial))
    .join("");
  testimonialsContainer.innerHTML = testimonialsHTML;
};

renderTestimonials();

dotButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    switch (index) {
      case 0:
        testimonialsContainer.style.transform = `translateX(8%)`;
        break;
      case 1:
        testimonialsContainer.style.transform = `translateX(-16%)`;
        break;
      case 2:
        testimonialsContainer.style.transform = `translateX(-40%)`;
        break;
    }
    dotButtons.forEach((btn) =>
      btn.classList.remove("testimonials__dot-btn--active")
    );
    button.classList.toggle("testimonials__dot-btn--active");
  });
});

// ------ Cards
const clearTypeClass = () => {
  cardsBtns.forEach((btn) => {
    btn.classList.remove("white-btn--active");
  });
};

const generateCard = (card) => {
  return `
  <div class="card">
    <div class="card__img-container">
      <img
        src="./src/img/${card.img}"
        alt="House"
        class="card__img"
        />
      <span class="card__extra ${
        (card.iconText === "Popular" && "card__extra--red") ||
        (card.iconText === "New house" && "card__extra--blue") ||
        (card.iconText === "Best deals" && "card__extra--green")
      }
      ">
        <img
          src="./src/img/${card.icon}"
          alt="Fire icon"
          class="card__extra-icon"
        />
        ${card.iconText}
      </span>
    </div>
    <div class="card__text">
      <h3 class="card__name">${card.name}</h3>
      <p class="card__price">${card.price}</p>
      <div class="owner">
        <img src="./src/img/${card.ownerImg}" alt="Owner" class="owner__img" />
        <div class="owner__info">
          <span class="owner__name">${card.ownerName}</span>
          <span class="owner__location">${card.location}</span>
        </div>
      </div>
    </div>
  </div>
  `;
};

const renderCards = (type = "house") => {
  const filteredCards = cards.filter((c) => c.type === type);
  const cardsHTML = filteredCards.map((card) => generateCard(card)).join("");

  cardsContainer.innerHTML = cardsHTML;
};

renderCards();

cardsContainer.setAttribute("data-counter", "0");

//handling left, right buttons
cardsBtnsContainer.addEventListener("click", (e) => {
  const counter = parseInt(cardsContainer.getAttribute("data-counter"), 10);
  let newCounter = counter;

  const type = document
    .querySelector(".white-btn--active")
    .getAttribute("data-type");

  const filteredCards = cards.filter((c) => c.type === type);
  const btn = e.target.closest(".rounded-btn");

  if (!btn) return;

  if (btn.classList.contains("cards__btn-left")) {
    if (counter === 0) return;
    newCounter = counter - 1;
    cardsContainer.setAttribute("data-counter", newCounter);
    cardsContainer.style.transform = `translateX(${-newCounter * 30}rem)`;
  } else {
    if (counter >= filteredCards.length - 2) return;
    newCounter = counter + 1;
    cardsContainer.setAttribute("data-counter", newCounter);
    cardsContainer.style.transform = `translateX(${-newCounter * 30}rem)`;
  }
});

// handling chaning type of cards
cardsTypes.addEventListener("click", (e) => {
  clearTypeClass();
  const btn = e.target.closest(".white-btn");
  if (!btn) return;

  btn.classList.add("white-btn--active");
  const type = btn.getAttribute("data-type");
  renderCards(type);
  cardsContainer.style.transform = `translateX(0rem)`;
});

// ------ More
const generateArticle = (article) => {
  return `
    <div class="more__small">
      <img
      src="./src/img/${article.img}"
      alt="Home image"
      class="more__img-small"
      />
      <div class="more__container-small">
        <div class="owner owner--more">
          <img
          src="./src/img/${article.ownerImg}"
          alt="Owner"
          class="owner__img"
          />
          <span class="owner__name owner__name--more">${article.ownerName}</span>
        </div>
        <h2 class="more__header--small">
          ${article.header}
        </h2>
        <div class="more__time">
          <img
          src="./src/img/icon-time.png"
          alt="Time icon"
          class="more__icon-time"
          />
          <span class="more__time-text">${article.time}</span>
        </div>
      </div>
    </div>
  `;
};

const generateArticleBig = (article) => {
  return `
  <img
  src="./src/img/${article.img}"
  alt="House image"
  class="more__img-big"
  />
  <div class="more__container-big">
    <div class="owner owner--more">
      <img src="./src/img/${article.ownerImg}" alt="Owner" class="owner__img" />
      <span class="owner__name owner__name--more"
        >${article.ownerName}</span>
    </div>
    <h2 class="more__header--big">
      ${article.header}
    </h2>
    <p class="more__description">
      ${article.description}
    </p>
    <div class="more__time">
      <img
      src="./src/img/icon-time.png"
      alt="Time icon"
      class="more__icon-time"
      />
      <span class="more__time-text">${article.time}</span>
    </div>
  </div>
  `;
};

// generating articles, 3 small, 3 small hidden and 1 big
const renderArticles = () => {
  const firstArticlesHTML = articles
    .slice(0, 3)
    .map((article) => generateArticle(article))
    .join("");

  const nextArticlesHTML = articles
    .slice(3, 6)
    .map((article) => generateArticle(article))
    .join("");

  moreLeft.innerHTML = firstArticlesHTML;

  const showAfterClickDiv = document.createElement("div");
  showAfterClickDiv.classList.add("more__show-after-click");
  showAfterClickDiv.innerHTML = nextArticlesHTML;
  moreLeft.appendChild(showAfterClickDiv);
  const rightArticle = generateArticleBig(articles[3]);
  moreRight.innerHTML = rightArticle;
};
renderArticles();

const smallMore = document.querySelectorAll(".more__small");
smallMore.forEach((item, index) => {
  item.addEventListener("click", () => {
    moreRight.innerHTML = generateArticleBig(articles[index]);
  });
});

showMoreBtn.addEventListener("click", () => {
  const showAfterClick = document.querySelector(".more__show-after-click");
  showAfterClick.classList.toggle("more__show-after-click--active");
});

// ------ Email Validation
const errorMessage = "Field error. Please fix it";
const regexEmail = /\S+@\S+\.\S+/;
emailBtn.addEventListener("click", () => {
  const existingError = document.querySelector(".error");
  if (existingError) {
    existingError.remove();
  }
  inputBox.classList.remove("rounded-box--error");

  if (!regexEmail.test(emailInput.value)) {
    inputBox.classList.add("rounded-box--error");
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error");
    errorSpan.textContent = errorMessage;
    inputBox.appendChild(errorSpan);
  }
});

// ------ Error input
function charCounter(inputField) {
  const maxLength = inputField.getAttribute("maxlength");
  const currentLength = inputField.value.length;
  current.textContent = currentLength;
  if (currentLength >= maxLength) {
    current.style.color = "red";
  }
}
textarea.oninput = () => charCounter(textarea);

// ------ Custom Select
const deleteAllActiveClasses = () => {
  optionItems.forEach((item) =>
    item.classList.remove("custom-select__option--selected")
  );
};

customSelect.addEventListener("click", () => {
  options.classList.toggle("custom-select__options--active");
  if (arrow.getAttribute("src") === "./src/img/icon-arrow-up-gray.svg")
    arrow.src = "./src/img/icon-arrow-down-gray.svg";
  else arrow.src = "./src/img/icon-arrow-up-gray.svg";
});

optionItems.forEach((item) => {
  item.addEventListener("click", () => {
    valueSelect.textContent = item.textContent;
    options.classList.remove("custom-select__options--active");
    deleteAllActiveClasses();
    item.classList.add("custom-select__option--selected");
  });
});

// Cookies
closeCookies.addEventListener("click", () => {
  cookies.classList.add("footer__cookies--inactive");
});
