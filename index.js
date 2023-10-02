// Global Vars
const yearDD = document.getElementById("year");
const makeDD = document.getElementById("make");
const modelDD = document.getElementById("model");
const locaAtext = document.getElementById("locA");
const locaBtext = document.getElementById("locB");
const yearsURL = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year";
var tempYear = new Date().getFullYear().toString();
console.log(tempYear);
var makeURL = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=";
const form = document.querySelector("form");
const publicToken =
  "pk.eyJ1IjoibHB1cmdzbCIsImEiOiJjbG42aXB2cWYwNGFjMmxwaXp0bXY4dGVrIn0.5e9pBlHJvQPcf5mD8t-Z2w";
var yearSelected = false;
var makeSelected = false;
// created session UUID
function checkUUID() {
  if (localStorage.getItem("uuid") == null) {
    console.log("no session UUID found, new session UUID created");
    localStorage.setItem("uuid", this.crypto.randomUUID());
  } else {
    console.log("session UUID " + localStorage.getItem("uuid"));
  }
}

// handle site backgorund color change
function changeBG() {
  var checkBox = document.getElementById("checkbox");
  var header = document.getElementById("header");
  // var footer = document.getElementById("footer");
  var section = document.getElementsByTagName("section");
  if (checkBox.checked) {
    localStorage.setItem("theme", "black");

    document.body.style.backgroundColor = "var(--bg-black)";
    // document.body.style.color = "white";

    header.style.color = "white";
    header.style.backgroundColor = "var(--sec-grey)";

    // footer.style.color = "white";
    // footer.style.backgroundColor = "var(--sec-grey)";

    for (let i = 0; i < section.length; i++) {
      section[i].style.color = "white";
      section[i].style.backgroundColor = "var(--sec-grey)";
    }
  } else {
    localStorage.setItem("theme", "white");

    document.body.style.backgroundColor = "var(--bg-white)";
    // document.body.style.color = "black";

    header.style.color = "black";
    header.style.backgroundColor = "var(--sec-off-white)";

    // footer.style.color = "black";
    // footer.style.backgroundColor = "var(--sec-off-white)";

    for (let i = 0; i < section.length; i++) {
      section[i].style.color = "black";
      section[i].style.backgroundColor = "var(--sec-off-white)";
    }
  }
}

// if last choosen them is dark mode, change theme, don't need white theme code bc it's default on load
function checklocalTheme() {
  var header = document.getElementById("header");
  var section = document.getElementsByTagName("section");
  if (localStorage.getItem("theme") == "black") {
    var checkBox = document.getElementById("checkbox");
    checkBox.checked = true;
    document.body.style.backgroundColor = "var(--bg-black)";

    header.style.color = "white";
    header.style.backgroundColor = "var(--sec-grey)";

    for (let i = 0; i < section.length; i++) {
      section[i].style.color = "white";
      section[i].style.backgroundColor = "var(--sec-grey)";
    }
  }
}

// find match between current options datalist and single index item of parsed suggestion list
function findSuggestionMatch(locationElement, suggestionJsonElement) {
  if (locationElement.options.length == 0) {
    return false;
  }
  for (var j = 0; j < locationElement.options.length; j++) {
    if (suggestionJsonElement.place_name == locationElement.options[j].value) {
      console.log("match found");
      return true;
    }
  }

  return false;
}

// add returned parsed suggestion json array to either location text elements
function addSuggestions(locationElement, suggestionJson) {
  for (var i in suggestionJson) {
    if (findSuggestionMatch(locationElement, suggestionJson[i])) {
      console.log("no new suggestion added");
      continue;
    }
    var newOp = new Option(
      suggestionJson[i].place_name,
      suggestionJson[i].place_name
    );
    console.log("added this suggestion");
    console.log(newOp);
    locationElement.appendChild(newOp);
  }
}

// ? not sure if i should finish this
// function removeSuggestions(locationElement,suggestionJson){
//     if(locationElement.options.length == 0){
//       return;
//     }
// }

// use user input from location text element to make an api call for location suggestions
// formats text and returned json response
// grabs datalist element and populates datalist options with the location suggestion
async function getSuggestions(text, locationInput) {
  var locationList = document.getElementById(locationInput);
  text = encodeURIComponent(text.trim()); // format spaces for api request

  try {
    const response = await fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        text +
        ".json?access_token=" +
        publicToken,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const jsonData = await response.json();

    // parse data
    console.log("suggestions fetched");
    var parsedData = [];
    for (var i in jsonData.features) {
      parsedData.push({
        place_name: jsonData.features[i].place_name,
        coordinates: jsonData.features[i].geometry.coordinates,
      });
    }
    console.log(parsedData);
    // add sugestions
    addSuggestions(locationList, parsedData);

    // ?: remove sugestions function
  } catch (error) {
    console.error("Error:", error);
    alert("Error:", error);
  }
}

async function fetchJSON(request, dropDown) {
  try {
    const response = await fetch(request, {
      headers: {
        Accept: "application/json",
      },
    });
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Oops, we haven't got JSON!");
    }

    const jsonData = await response.json();

    // auto fill in year options
    for (var i in jsonData.menuItem) {
      var newOption = new Option(
        jsonData.menuItem[i].text,
        jsonData.menuItem[i].value
      );
      dropDown.add(newOption, undefined);
    }

    console.log("options added for " + dropDown.id);
  } catch (error) {
    console.error("Error:", error);
    alert("Error:", error);
  }
}

// EVENT LISTENER SECTIONS

yearDD.addEventListener("change", (e) => {
  e.preventDefault();
  tempYear = yearDD.value;
  console.log(yearDD.value);

  // if year and make has been selected enable model drop down and options
});

makeDD.addEventListener("change", (e) => {
  e.preventDefault();
  console.log(makeDD.value);
  makeSelected = true;
});

locaAtext.addEventListener("input", (e) => {
  getSuggestions(locaAtext.value, "locationA");
});

locaBtext.addEventListener("input", (e) => {
  getSuggestions(locaBtext.value, "locationB");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  // validateData(formData);
});

// MAIN AREA
// session uuid
checkUUID();
checklocalTheme();
// populate drop downs with most recent year and makes from goverment api
fetchJSON(yearsURL, yearDD);
fetchJSON(makeURL + tempYear, makeDD);

// handle form
// TODO: 1) get form values 2) On calculate button -> verify values -> send api req to EPA site 3) parse responce 4) show maps route
// TODO: 5) finish stats board
// TODO: Footer... DONE!!!!

// TODO: !!!!! will need for error handling of invalid combination of year make and model
// function validateData(){
//     for (const pair of formData.entries()) {
//         console.log(pair);
//       }
//     return ;
// }

// !: these event listers were for testing input for search suggestions
// locaAtext.addEventListener("input", (e) => {
//   e.preventDefault();
//   console.log(locaAtext.value);
// });

// locaBtext.addEventListener("input", (e) => {
//   e.preventDefault();
//   console.log(locaBtext.value);
// });
