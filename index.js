// Global Vars
const yearDD = document.getElementById("year");
const makeDD = document.getElementById("make");
const locaAtext = document.getElementById("locA");
const locaBtext = document.getElementById("locB");
const yearsURL = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year";
var tempYear = "2023";
var makeURL =
  "https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=";
const form = document.querySelector("form");
const publicToken = "pk.eyJ1IjoibHB1cmdzbCIsImEiOiJjbG42aXB2cWYwNGFjMmxwaXp0bXY4dGVrIn0.5e9pBlHJvQPcf5mD8t-Z2w";

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
  var footer = document.getElementById("footer");
  var section = document.getElementsByTagName("section");
  if (checkBox.checked) {
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

// handle search sugestions !!
function findSuggestionMatch(locationElement,suggestionJsonElement){
    if(locationElement.options.length == 0){
      return;
    }
    for(var j = 0; j < locationElement.options.length ; j++){
      if(suggestionJsonElement.place_name == locationElement.options[j].value){
        console.log('match found');
        return true;
      }
  }
  

  return false;
}

function addSuggestions(locationElement,suggestionJson){
    for(var i in suggestionJson){
      if(findSuggestionMatch(locationElement,suggestionJson[i])){
        console.log('no new suggestion added');
        continue;
      }
      var newOp = new Option(
        suggestionJson[i].place_name, suggestionJson[i].place_name
      );
      console.log("added this suggestion");
      console.log(newOp);
      locationElement.appendChild(newOp);
    }
}

// TODO: finish this
// function removeSuggestions(locationElement,suggestionJson){
//     if(locationElement.options.length == 0){
//       return;
//     }
// }
async function getSuggestions(text, locationInput){

  var locationList = document.getElementById(locationInput);
  text = encodeURIComponent(text.trim()) // format spaces for api request

  try {
    
    const response = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + text + ".json?access_token=" + publicToken, {
      headers: {
        Accept: "application/json",
      }
    });

    const jsonData = await response.json();

    // parse data
    console.log("suggestions fetched");
    var parsedData = [];
    for(var i in jsonData.features ){
      parsedData.push({"place_name": jsonData.features[i].place_name ,  "coordinates": jsonData.features[i].geometry.coordinates});
    }
    console.log(parsedData);
    // add sugestions 
    addSuggestions(locationList,parsedData);

    // TODO: remove sugestions

    
  } catch (error) {
    console.error("Error:", error);
    alert("Error:", error);
  } finally{
    
  }

}
locaAtext.addEventListener("input", (e) => {

   getSuggestions(locaAtext.value,"locationA");

});

locaBtext.addEventListener("input", (e) => {

  getSuggestions(locaBtext.value,"locationB");

});


//
// handle form
// TODO: values for user input from gov site, Locations autofill from google
// TODO: 1) get form values 2) On calculate button -> verify values -> send api req to EPA site 3) parse responce 4) show google maps route
// TODO: 5) finish stats board
// TODO: Footer... DONE!!!!

// event listner bc i like them better lowks

async function fetchJSONYears(request) {
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
      yearDD.add(newOption, undefined);
    }

    console.log("Years added");
  } catch (error) {
    console.error("Error:", error);
    alert("Error:", error);
  }
}

async function fetchJSONMake(request) {
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
      makeDD.add(newOption, undefined);
    }

    console.log("makes added");
  } catch (error) {
    console.error("Error:", error);
    alert("Error:", error);
  }
}

yearDD.addEventListener("change", (e) => {
  e.preventDefault();
  tempYear = yearDD.value;
  console.log(yearDD.value);
});

locaAtext.addEventListener("input", (e) => {
  e.preventDefault();
  console.log(locaAtext.value);
});

locaBtext.addEventListener("input", (e) => {
  e.preventDefault();
  console.log(locaBtext.value);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  // validateData(formData);
});

// MAIN AREA

fetchJSONYears(yearsURL);
fetchJSONMake(makeURL + tempYear);
checkUUID();

// function validateData(){
//     for (const pair of formData.entries()) {
//         console.log(pair);
//       }
//     return ;
// }
