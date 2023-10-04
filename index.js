// Global Vars
const yearDD = document.getElementById("year");
const makeDD = document.getElementById("make");
const modelDD = document.getElementById("model");
const locaAtext = document.getElementById("locA");
const locaBtext = document.getElementById("locB");
const yearsURL = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year";
var tempYear = new Date().getFullYear().toString();
var makeURL = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=";
var modelURL = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=";
const form = document.querySelector("form");
const publicToken =
  "pk.eyJ1IjoibHB1cmdzbCIsImEiOiJjbG42aXB2cWYwNGFjMmxwaXp0bXY4dGVrIn0.5e9pBlHJvQPcf5mD8t-Z2w";
var yearSelected = false;
var makeSelected = false;
var travelHours = "";
var travelMins = "";
var travelDist = ""; // miles
var travelMetrics = document.getElementById("travel_metrics");
var metricItems = ["rtt", "gas_used", "co2" ];
var vehicleData = "";
// MAPBOX MAP OBJECT
mapboxgl.accessToken = publicToken;
const map = new mapboxgl.Map({
container: 'map',
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
style: 'mapbox://styles/mapbox/streets-v12',
center: [-118.242766, 34.053691], // los angeles
zoom: 13
});

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
  console.log("changing theme")
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
    console.log("added suggestions");
    locationElement.appendChild(newOp);
  }
}


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

async function fetchJSONDD(request, dropDown) {
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

async function getVehicleInfo() {
  try {
    const response = await fetch(
    "https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=" + tempYear +"&make="+ makeDD.value + "&model=" + modelDD.value,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const jsonData = await response.json();
    var tempId = "";
    if(jsonData.menuItem.length > 1){
      console.log(jsonData.menuItem[0].value); // this is the car ID, grab first version off list... they are gonna have similar MPG most likley
      tempId=jsonData.menuItem[0].value;
    }
    else{
      console.log(jsonData.menuItem.value); // this is the car ID
      tempId=jsonData.menuItem.value;
    }
    

    // then make call to find call id
    const vehicleInfo = await fetch(
      "https://www.fueleconomy.gov/ws/rest/vehicle/" + tempId,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
       //usefull keys are comb08 - combined MPG, co2TailpipeGpm- tailpipe CO2 in grams/mile, id - vehicle record id
      const vehicleJSON = await vehicleInfo.json();
      vehicleData = vehicleJSON;
      console.log(vehicleData);
     

    // parse data

    for(var x in metricItems){
      var temp = document.getElementById(metricItems[x]);
      if(temp.id == 'rtt'){
        if(travelHours != ""){
        temp.textContent =  `travel time: ${Math.round( ( (parseInt(travelHours)*2*60) + (parseInt(travelMins)*2) / 60 ) )  } hour ${Math.round( ( (parseInt(travelHours)*2*60) + (parseInt(travelMins)*2) % 60 ) ) } min`;
        }else{
          temp.textContent =  `travel time: ${Math.round( ( (parseInt(travelMins)*2) / 60 ) ) } hour ${Math.round( (parseInt(travelMins)*2) % 60 )  } min`;
        }
      }
      if(temp.id == 'gas_used'){
        temp.textContent = `${(parseInt(travelDist) * 2)/ parseInt(vehicleData.comb08) } gallons of gas used` ;
        console.log('here');
      }
      if(temp.id == 'co2'){
        temp.textContent = `${((parseInt(travelDist) * 2)) * parseInt(vehicleData.co2TailpipeGpm)} co2 released`;
      }
    }
    
  } catch (error) {
    console.error("Error:", error);
    alert("Error:", error);
  }
}

function validateForm(formData){
  // round_trip and number of trips will always have a value selected (unless someone changes the html on purpose)
  // year, make, model will have "none" when no selection has been made
  // Display the key/value pairs
  var cont = true;
  var errorMsg = document.querySelector(".error");
  
  for (const pair of formData.entries()) {
    // console.log(`${pair[0]} , ${pair[1]}`);
    if(!pair[1] || pair[1] == "none"){
        console.log("EMPTY FIELD");
        cont = false;
        var temp = document.getElementById(pair[0]);
        console.log(temp);
        temp.style.border = '2px solid red';
        errorMsg.style.display = 'flex';
        
    }
    
  }

  return cont;
}

function addOriginAndDestination(formData){
  for (const pair of formData.entries()) {
    if(pair[0] == 'locA'){
      console.log(`grabbed this location: ${pair[0]}, ${pair[1]}`);
      var origin  = new MapboxDirections({
        accessToken: publicToken,
        controls : {
          inputs: false
        } ,
        interactive: false,
        profile: 'mapbox/driving-traffic'
      });
      origin = origin.setOrigin(pair[1]);
      map.addControl(origin);
    } 
    else if(pair[0] == 'locB'){
      console.log(`grabbed this location: ${pair[0]}, ${pair[1]}`);
      var destination  = new MapboxDirections({
        accessToken: publicToken,
        controls : false, 
        interactive: false,
        profile: 'mapbox/driving-traffic'
      });
      destination = destination.setDestination(pair[1]);
      map.addControl(destination);
    }
  }
}

function grabRouteDeatilsFromPopup(){
    //grab inner html of directions
    var directionsPopup = document.getElementsByClassName("mapbox-directions-route-summary");
    // time in h1 div is formatted as '{numberhere}h_{number here}min'

    var timeElement = directionsPopup.item(0).getElementsByTagName('h1')[0].textContent;
    // deal with if there is no hour
    console.log(timeElement)
    if(timeElement.includes("h ")){
      travelHours = timeElement.split("h ")[0];
      console.log(`hours ${travelHours}`);
      travelMins = timeElement.split("h ")[1].split('min')[0];
      console.log(`minutes ${travelMins}`);
    }else{
      travelHours = "";
      travelMins = timeElement.split('min')[0];
      console.log(`minutes ${travelMins}`);
    }

    var distanceElement = directionsPopup.item(0).getElementsByTagName('span')[0].textContent;
    travelDist = distanceElement.split("mi")[0];
    console.log(`distance in mi ${travelDist}`);    
}

function statsInfo(){
  getVehicleInfo();
  console.log('stats');
}
// EVENT LISTENER SECTIONS

yearDD.addEventListener("change", (e) => {
  e.preventDefault();
  tempYear = yearDD.value;
  console.log(yearDD.value);
  yearSelected = true;

  if(makeSelected){ // do not enable model until year and model values are changed
    modelDD.disabled = false;
    fetchJSONDD(modelURL + tempYear + "&make=" + makeDD.value, modelDD);
  }
  // if year and make has been selected enable model drop down and options
});

makeDD.addEventListener("change", (e) => {
  e.preventDefault();
  console.log(makeDD.value);
  makeSelected = true;
  if(yearSelected){ // do not enable model until year and model values are changed
    modelDD.disabled = false;
    fetchJSONDD(modelURL + tempYear + "&make=" + makeDD.value, modelDD);
  }
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
  // validation
  var cont = validateForm(formData);
   // if not everything is filled, in don't update the map
  if (!cont){
    return;
  }
  // implies cont is true and can update the map
  addOriginAndDestination(formData);

  // LOL this is hacky but it works 
  // I could use another api call with lang/lat for origin/dest but ... less straight forward
  // wait for container to spawn, then get data from DOM
  setTimeout(grabRouteDeatilsFromPopup(), 5000);
  statsInfo();


});

// MAIN AREA
checkUUID();
checklocalTheme();
// populate drop downs with most recent year and makes from goverment api, model is fetched when both year and make has been entered
fetchJSONDD(yearsURL, yearDD);
fetchJSONDD(makeURL + tempYear, makeDD);

// handle form
// TODO: 1) get form values 2) On calculate button -> verify values -> send api req to EPA site 3) parse responce 4) show maps route
// TODO: 5) finish stats board
// TODO: Footer... DONE!!!!

// TODO: !!!!! will need for error handling of invalid combination of year make and model


// !: these event listers were for testing input for search suggestions
// locaAtext.addEventListener("input", (e) => {
//   e.preventDefault();
//   console.log(locaAtext.value);
// });

// locaBtext.addEventListener("input", (e) => {
//   e.preventDefault();
//   console.log(locaBtext.value);
// });
