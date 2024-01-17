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

function setCountries(elem) {
  let countriesDiv;
  if (elem) {
    countriesDiv = elem;
  } else {
    countriesDiv = document.querySelector(".countries");
  }
  countriesDiv.innerHTML = ``;
  for (const [key, value] of Object.entries(getCountries())) {
    const p = document.createElement("p");
    p.textContent = value;
    countriesDiv.appendChild(p);
  }
}

// Set the privacy statement
function setPrivacyStatement(elem) {
  let privacyStatement, privacyCheckBoxLabel, privacyCheckBox;
  if (elem) {
    privacyStatement = elem.querySelector("#privacyStatement");
    // For the privacy checkbox;
    privacyCheckBoxLabel = elem.querySelector("#privacyCheckboxLabel");
    privacyCheckBox = elem.querySelector("#privacyCheckBox");
  } else {
    privacyStatement = document.getElementById("privacyStatement");
    // For the privacy checkbox;
    privacyCheckBoxLabel = document.getElementById("privacyCheckboxLabel");
    privacyCheckBox = document.getElementById("privacyCheckBox");
  }
  //   helper method for the class toggling
  const toggleClass = function (elem, className) {
    if (elem.classList.contains(className)) {
      elem.classList.remove(className);
    } else {
      elem.classList.add(className);
    }
  };

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

function dropDownFunc() {
  const dropdownMenus = document.querySelectorAll(".field_dropdown--menu");
  const pluses = document.querySelectorAll(".plus");
  // Main field;
  const salutionInputs = document.querySelectorAll(".salutionInput");

  const attachEvent = function (element) {
    element.forEach((salutionInput, idx) => {
      salutionInput.addEventListener("click", function () {
        pluses[idx].style.color = `#58a09a`;
        dropdownMenus[idx].classList.add("field_dropdown--menuActive");
        const dropdownMenuList = dropdownMenus[idx].querySelectorAll("p");
        dropdownMenuList.forEach((itm) => {
          itm.addEventListener("click", function () {
            salutionInputs[idx].value = this.textContent;
            //   After clicking close the dropdownmenu
            dropdownMenus[idx].classList.remove("field_dropdown--menuActive");

            pluses[idx].style.color = `gray`;
          });
        });
      });
    });
  };

  attachEvent(salutionInputs);
  attachEvent(pluses);
}

// Set the data for the dropdown;
function setDropdownData(dropdownMenuList, data) {
  data.forEach((itm, idx) => {
    const row = document.createElement("div");
    row.classList.add("grid-container");
    row.style = ``;
    itm.forEach((itm2, idx2) => {
      const p = document.createElement("p");
      p.textContent = itm2;
      row.appendChild(p);
      row.style = `grid-template-columns: repeat(${data[0].length}, 1fr);`;
    });
    dropdownMenuList.appendChild(row);
  });
}

// Add a new row;
function addRow(addBtn) {
  addBtn.addEventListener("click", function () {
    // Find the parent Node;
    const parentNode = addBtn.parentElement;
    // clone node that has to be copied;
    const clonedRow = parentNode.querySelector(".clone").cloneNode(true);

    // Append the clone Node in the parent element;
    parentNode.appendChild(clonedRow);

    parentNode.appendChild(addBtn);
    dropDownFunc();
  });
}

// Return the list of all languages;
function languages() {
  const languages_list = [
    { name: "Afrikaans", code: "af" },
    { name: "Albanian - shqip", code: "sq" },
    { name: "Amharic - አማርኛ", code: "am" },
    { name: "Arabic - العربية", code: "ar" },
    { name: "Aragonese - aragonés", code: "an" },
    { name: "Armenian - հայերեն", code: "hy" },
    { name: "Asturian - asturianu", code: "ast" },
    { name: "Azerbaijani - azərbaycan dili", code: "az" },
    { name: "Basque - euskara", code: "eu" },
    { name: "Belarusian - беларуская", code: "be" },
    { name: "Bengali - বাংলা", code: "bn" },
    { name: "Bosnian - bosanski", code: "bs" },
    { name: "Breton - brezhoneg", code: "br" },
    { name: "Bulgarian - български", code: "bg" },
    { name: "Catalan - català", code: "ca" },
    { name: "Central Kurdish - کوردی (دەستنوسی عەرەبی)", code: "ckb" },
    { name: "Chinese - 中文", code: "zh" },
    { name: "Chinese (Hong Kong) - 中文（香港）", code: "zh-HK" },
    { name: "Chinese (Simplified) - 中文（简体）", code: "zh-CN" },
    { name: "Chinese (Traditional) - 中文（繁體）", code: "zh-TW" },
    { name: "Corsican", code: "co" },
    { name: "Croatian - hrvatski", code: "hr" },
    { name: "Czech - čeština", code: "cs" },
    { name: "Danish - dansk", code: "da" },
    { name: "Dutch - Nederlands", code: "nl" },
    { name: "English", code: "en" },
    { name: "English (Australia)", code: "en-AU" },
    { name: "English (Canada)", code: "en-CA" },
    { name: "English (India)", code: "en-IN" },
    { name: "English (New Zealand)", code: "en-NZ" },
    { name: "English (South Africa)", code: "en-ZA" },
    { name: "English (United Kingdom)", code: "en-GB" },
    { name: "English (United States)", code: "en-US" },
    { name: "Esperanto - esperanto", code: "eo" },
    { name: "Estonian - eesti", code: "et" },
    { name: "Faroese - føroyskt", code: "fo" },
    { name: "Filipino", code: "fil" },
    { name: "Finnish - suomi", code: "fi" },
    { name: "French - français", code: "fr" },
    { name: "French (Canada) - français (Canada)", code: "fr-CA" },
    { name: "French (France) - français (France)", code: "fr-FR" },
    { name: "French (Switzerland) - français (Suisse)", code: "fr-CH" },
    { name: "Galician - galego", code: "gl" },
    { name: "Georgian - ქართული", code: "ka" },
    { name: "German - Deutsch", code: "de" },
    { name: "German (Austria) - Deutsch (Österreich)", code: "de-AT" },
    { name: "German (Germany) - Deutsch (Deutschland)", code: "de-DE" },
    { name: "German (Liechtenstein) - Deutsch (Liechtenstein)", code: "de-LI" },
    { name: "German (Switzerland) - Deutsch (Schweiz)", code: "de-CH" },
    { name: "Greek - Ελληνικά", code: "el" },
    { name: "Guarani", code: "gn" },
    { name: "Gujarati - ગુજરાતી", code: "gu" },
    { name: "Hausa", code: "ha" },
    { name: "Hawaiian - ʻŌlelo Hawaiʻi", code: "haw" },
    { name: "Hebrew - עברית", code: "he" },
    { name: "Hindi - हिन्दी", code: "hi" },
    { name: "Hungarian - magyar", code: "hu" },
    { name: "Icelandic - íslenska", code: "is" },
    { name: "Indonesian - Indonesia", code: "id" },
    { name: "Interlingua", code: "ia" },
    { name: "Irish - Gaeilge", code: "ga" },
    { name: "Italian - italiano", code: "it" },
    { name: "Italian (Italy) - italiano (Italia)", code: "it-IT" },
    { name: "Italian (Switzerland) - italiano (Svizzera)", code: "it-CH" },
    { name: "Japanese - 日本語", code: "ja" },
    { name: "Kannada - ಕನ್ನಡ", code: "kn" },
    { name: "Kazakh - қазақ тілі", code: "kk" },
    { name: "Khmer - ខ្មែរ", code: "km" },
    { name: "Korean - 한국어", code: "ko" },
    { name: "Kurdish - Kurdî", code: "ku" },
    { name: "Kyrgyz - кыргызча", code: "ky" },
    { name: "Lao - ລາວ", code: "lo" },
    { name: "Latin", code: "la" },
    { name: "Latvian - latviešu", code: "lv" },
    { name: "Lingala - lingála", code: "ln" },
    { name: "Lithuanian - lietuvių", code: "lt" },
    { name: "Macedonian - македонски", code: "mk" },
    { name: "Malay - Bahasa Melayu", code: "ms" },
    { name: "Malayalam - മലയാളം", code: "ml" },
    { name: "Maltese - Malti", code: "mt" },
    { name: "Marathi - मराठी", code: "mr" },
    { name: "Mongolian - монгол", code: "mn" },
    { name: "Nepali - नेपाली", code: "ne" },
    { name: "Norwegian - norsk", code: "no" },
    { name: "Norwegian Bokmål - norsk bokmål", code: "nb" },
    { name: "Norwegian Nynorsk - nynorsk", code: "nn" },
    { name: "Occitan", code: "oc" },
    { name: "Oriya - ଓଡ଼ିଆ", code: "or" },
    { name: "Oromo - Oromoo", code: "om" },
    { name: "Pashto - پښتو", code: "ps" },
    { name: "Persian - فارسی", code: "fa" },
    { name: "Polish - polski", code: "pl" },
    { name: "Portuguese - português", code: "pt" },
    { name: "Portuguese (Brazil) - português (Brasil)", code: "pt-BR" },
    { name: "Portuguese (Portugal) - português (Portugal)", code: "pt-PT" },
    { name: "Punjabi - ਪੰਜਾਬੀ", code: "pa" },
    { name: "Quechua", code: "qu" },
    { name: "Romanian - română", code: "ro" },
    { name: "Romanian (Moldova) - română (Moldova)", code: "mo" },
    { name: "Romansh - rumantsch", code: "rm" },
    { name: "Russian - русский", code: "ru" },
    { name: "Scottish Gaelic", code: "gd" },
    { name: "Serbian - српски", code: "sr" },
    { name: "Serbo - Croatian", code: "sh" },
    { name: "Shona - chiShona", code: "sn" },
    { name: "Sindhi", code: "sd" },
    { name: "Sinhala - සිංහල", code: "si" },
    { name: "Slovak - slovenčina", code: "sk" },
    { name: "Slovenian - slovenščina", code: "sl" },
    { name: "Somali - Soomaali", code: "so" },
    { name: "Southern Sotho", code: "st" },
    { name: "Spanish - español", code: "es" },
    { name: "Spanish (Argentina) - español (Argentina)", code: "es-AR" },
    {
      name: "Spanish (Latin America) - español (Latinoamérica)",
      code: "es-419",
    },
    { name: "Spanish (Mexico) - español (México)", code: "es-MX" },
    { name: "Spanish (Spain) - español (España)", code: "es-ES" },
    {
      name: "Spanish (United States) - español (Estados Unidos)",
      code: "es-US",
    },
    { name: "Sundanese", code: "su" },
    { name: "Swahili - Kiswahili", code: "sw" },
    { name: "Swedish - svenska", code: "sv" },
    { name: "Tajik - тоҷикӣ", code: "tg" },
    { name: "Tamil - தமிழ்", code: "ta" },
    { name: "Tatar", code: "tt" },
    { name: "Telugu - తెలుగు", code: "te" },
    { name: "Thai - ไทย", code: "th" },
    { name: "Tigrinya - ትግርኛ", code: "ti" },
    { name: "Tongan - lea fakatonga", code: "to" },
    { name: "Turkish - Türkçe", code: "tr" },
    { name: "Turkmen", code: "tk" },
    { name: "Twi", code: "tw" },
    { name: "Ukrainian - українська", code: "uk" },
    { name: "Urdu - اردو", code: "ur" },
    { name: "Uyghur", code: "ug" },
    { name: "Uzbek - o‘zbek", code: "uz" },
    { name: "Vietnamese - Tiếng Việt", code: "vi" },
    { name: "Walloon - wa", code: "wa" },
    { name: "Welsh - Cymraeg", code: "cy" },
    { name: "Western Frisian", code: "fy" },
    { name: "Xhosa", code: "xh" },
    { name: "Yiddish", code: "yi" },
    { name: "Yoruba - Èdè Yorùbá", code: "yo" },
    { name: "Zulu - isiZulu", code: "zu" },
  ];

  return languages_list;
}

// Set the langages in the dropdown;
function setLanguage(elem) {
  for (let language of languages()) {
    const p = document.createElement("p");
    p.textContent = language.name;
    elem.appendChild(p);
  }
}

function setMultipleDropdownData(dropdowns, dropdownArr) {
  dropdowns.forEach((dropdown) => {
    setDropdownData(dropdown, dropdownArr);
  });
}
