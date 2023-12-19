function closeAllDropdowns() {
  dropdowns.forEach((dropdown) => {
    const dropdownOptions = dropdown.querySelector(".dropdown-options");
    dropdownOptions.classList.remove("active");
  });
}

const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener(
    "click",
    function () {
      const dropdownOptions = this.querySelector(".dropdown-options");
      if (dropdownOptions.classList.contains("active")) {
        dropdownOptions.classList.remove("active");
      } else {
        closeAllDropdowns();
        dropdownOptions.classList.add("active");
      }
    },
    false
  );

  // Prevent event propagation for child options
  const dropdownOptions = dropdown.querySelector(".dropdown-options");
  dropdownOptions.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".dropdown")) {
    closeAllDropdowns();
  }
});

let i = 1;

//  for the range inputs;
window.onload = function () {
  slideOne(i);
  slideTwo(i);
};

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = 200; // Set the maximum value to 200
function slideOne(i) {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderOne.value = parseInt(sliderTwo.value) - minGap;
  }
  if (i == 1) {
    displayValOne.textContent = `> ${sliderOne.value}`;
    i++;
  } else {
    displayValOne.textContent = sliderOne.value;
  }
  fillColor();
}

function slideTwo(i) {
  if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
    sliderTwo.value = parseInt(sliderOne.value) + minGap;
  }
  if (i == 1) {
    displayValTwo.textContent = `< ${sliderTwo.value}`;
    i++;
  } else {
    displayValTwo.textContent = sliderTwo.value;
  }
  fillColor();
}

function fillColor() {
  percent1 = ((sliderOne.value - 50) / (sliderMaxValue - 50)) * 100;
  percent2 = ((sliderTwo.value - 50) / (sliderMaxValue - 50)) * 100;
  sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #58a09a ${percent1}%, #58a09a ${percent2}%, #dadae5 ${percent2}%)`;
}

// const starIcons = document.querySelectorAll(".star_icon");

// starIcons.forEach((starIcon) => {
//   starIcon.addEventListener("click", function () {
//     this.classList.toggle("dark-yellow-bg");
//   });
// });

const starIcons = document.querySelectorAll(".star_icon");

starIcons.forEach((starIcon) => {
  starIcon.addEventListener("click", function () {
    if (this.classList.contains("ri-star-line")) {
      this.classList.remove("ri-star-line");
      this.classList.add("ri-star-fill");
    } else {
      this.classList.remove("ri-star-fill");
      this.classList.add("ri-star-line");
    }
  });
});
