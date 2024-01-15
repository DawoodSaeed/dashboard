// To get all the countries;
function getCountries(lang = "en") {
  const A = 65;
  const Z = 90;
  const countryName = new Intl.DisplayNames([lang], { type: "region" });
  const countries = {};
  for (let i = A; i <= Z; ++i) {
    for (let j = A; j <= Z; ++j) {
      let code = String.fromCharCode(i) + String.fromCharCode(j);
      let name = countryName.of(code);
      if (code !== name) {
        countries[code] = name;
      }
    }
  }
  return countries;
}

// Set the privacy statement
function setPrivacyStatement() {
  const privacyStatement = document.getElementById("privacyStatement");
  //   helper method for the class toggling
  const toggleClass = function (elem, className) {
    if (elem.classList.contains(className)) {
      elem.classList.remove(className);
    } else {
      elem.classList.add(className);
    }
  };
  // For the privacy checkbox;
  const privacyCheckBoxLabel = document.getElementById("privacyCheckboxLabel");
  const privacyCheckBox = document.getElementById("privacyCheckBox");

  //   check if the checkbox is already checked;

  if (localStorage.getItem("privacy") && localStorage.getItem("time")) {
    privacyCheckBox.checked = true;
    privacyStatement.textContent = `You agreed to our privacy policy on ${localStorage.getItem(
      "time"
    )}`;
    toggleClass(privacyCheckBoxLabel, "active");
    console.log("Privacy already set");
  }

  // For changing the background of the label
  privacyCheckBoxLabel.addEventListener("click", function () {
    toggleClass(this, "active");
    // Check the state of the checkbox;
  });

  // TGo detect the chnage in orignal checkbox; and rhe store in it label;
  privacyCheckBox.addEventListener("change", function () {
    if (this.checked) {
      const currentDate = new Date();

      // Format the date as "dd.mm.yyyy"
      const formattedDate = `${padNumber(currentDate.getDate())}.${padNumber(
        currentDate.getMonth() + 1
      )}.${currentDate.getFullYear()}.`;

      // Display or use the formatted date as needed
      console.log(formattedDate);
      localStorage.setItem("privacy", true);
      localStorage.setItem("time", formattedDate);
      console.log("Saved in the Storage");
    } else {
      localStorage.removeItem("privacy");
      localStorage.removeItem("time");
      console.log("Removed from the Storage");
    }
  });

  // Function to pad a number with leading zero if needed
  function padNumber(num) {
    return num.toString().padStart(2, "0");
  }
}
