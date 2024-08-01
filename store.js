const store = JSON.parse(localStorage.getItem("store"));
let user_info = JSON.parse(localStorage.getItem("user_info"));
const profile = document.getElementById("profile");
profile.textContent = user_info[0][0][0].toUpperCase();

let m = 0;
const cardContainer = document.getElementById("cardContainer");
let filter_time = false;
let filter_const_time = null;
let filter_cuisine = false;
let filter_const_cuisine = null;

let stored = JSON.parse(localStorage.getItem("selected"));
let recipes = [];

function display() {
  function card_display() {
    console.log(store[i][0]);

    const card = document.createElement("div");
    card.className = "card";

    const mainText = document.createElement("div");
    mainText.className = "main-text";
    mainText.textContent = store[i][0];

    const smallText = document.createElement("div");
    smallText.className = "small-text";
    smallText.textContent = "Time: " + store[i][2];
    const smallerText = document.createElement("div");
    smallerText.className = "small-text";
    smallerText.textContent = "Cuisine: " + store[i][7];

    const ingText = document.createElement("div");
    ingText.className = "ing-text";
    ingText.textContent = "Ingredients : " + store[i][1];

    const img = document.createElement("img");
    img.setAttribute("src", "files/" + store[i][3]);
    img.className = "p";

    card.appendChild(mainText);
    card.appendChild(smallText);

    card.appendChild(ingText);
    card.appendChild(smallerText);
    card.appendChild(img);

    cardContainer.appendChild(card);
    m++;
  }

  let m = 0;
  for (i in store) {
    let c = 0;
    for (j = 0; j < stored.length; j++) {
      if (store[i][1].includes(stored[j])) {
        c++;
      }
    }

    if (c > 1) {
      console.log(filter_time, filter_cuisine);
      if (filter_time) {
        if (filter_const_time == "Less than 15 minutes") {
          if (store[i][2] < 15) {
            card_display();
          }
        } else if (filter_const_time == "15-30 minutes") {
          if (store[i][2] >= 15 && store[i][2] < 30) {
            card_display();
          }
        } else if (filter_const_time == "30-60 minutes") {
          if (store[i][2] >= 30 && store[i][2] <= 60) {
            card_display();
          }
        } else if (filter_const_time == "More than 60 minutes") {
          if (store[i][2] > 60) {
            card_display();
          }
        }
      }

      if (filter_cuisine) {
        if (store[i][7] == filter_const_cuisine) {
          card_display();
        }
      } else if (filter_time == false && filter_cuisine == false) {
        card_display();
      }
    }

    if (m > 2) {
      const bg = document.getElementById("recipe_img");
      let h = 588 + (m - 2) * 200;

      bg.style.height = h.toString() + "px";
    }
  }
}
display();

filters = document.querySelectorAll(".a");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filter_time = true;

    filter_const_time = filter.innerHTML;
    cardContainer.innerHTML = "";
    display();
    cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        sub_card = card.querySelector(".main-text");
        localStorage.setItem("recipe", JSON.stringify(sub_card.innerHTML));
        location.href = "detail.html";
      });
    });
  });
});

filters2 = document.querySelectorAll(".c");

filters2.forEach((filter2) => {
  filter2.addEventListener("click", () => {
    filter_cuisine = true;
    filter_const_cuisine = filter2.innerHTML;
    cardContainer.innerHTML = "";
    display();
    cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.addEventListener("click", () => {
        sub_card = card.querySelector(".main-text");
        localStorage.setItem("recipe", JSON.stringify(sub_card.innerHTML));
        location.href = "detail.html";
      });
    });
  });
});

cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    sub_card = card.querySelector(".main-text");
    localStorage.setItem("recipe", JSON.stringify(sub_card.innerHTML));
    location.href = "detail.html";
  });
});
