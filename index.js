// Global Vars
const yearDD = document.getElementById("year"); 
const makeDD = document.getElementById("make"); 
const locaAtext = document.getElementById("locA"); 
const locaBtext = document.getElementById("locB"); 
const yearsURL = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year";
var tempYear = "2023"
var makeURL = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=" + tempYear;
const form = document.querySelector('form');

// handle site backgorund color change
function changeBG() {
    var checkBox = document.getElementById("checkbox");
    var header = document.getElementById("header");
    var footer = document.getElementById("footer");
    var section = document.getElementsByTagName("section")
    if (checkBox.checked){
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
// 
// handle form
// TODO: values for user input from gov site, Locations autofill from google
// TODO: 1) get form values 2) On calculate button -> verify values -> send api req to EPA site 3) parse responce 4) show google maps route 
// TODO: 5) finish stats board 
// TODO: Footer... DONE!!!!

// event listner bc i like them better lowks

async function fetchJSONYears(request) {
    try {
      const response = await fetch(request, {  headers: {
        "Accept": "application/json",
      } });
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const jsonData = await response.json();

      // auto fill in year options  
      for(var i in jsonData.menuItem){
        var newOption = new Option(jsonData.menuItem[i].text,jsonData.menuItem[i].value);
        yearDD.add(newOption,undefined);
      }

      console.log("Years added");

    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
    }
  }

  async function fetchJSONMake(request) {
    try {
      const response = await fetch(request, {  headers: {
        "Accept": "application/json",
      } });
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Oops, we haven't got JSON!");
      }

      const jsonData = await response.json();

      // auto fill in year options  
      for(var i in jsonData.menuItem){
        var newOption = new Option(jsonData.menuItem[i].text,jsonData.menuItem[i].value);
        makeDD.add(newOption,undefined);
      }

      console.log("makes added");

    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
    }
  }

yearDD.addEventListener('change',(e) => {
    e.preventDefault();
    console.log(yearDD.value);
})

locaAtext.addEventListener('input',(e) => {
    e.preventDefault();
    console.log(locaAtext.value);
})

locaBtext.addEventListener('input',(e) => {
    e.preventDefault();
    console.log(locaBtext.value);
})

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form);
    // validateData(formData);
  })

  fetchJSONYears(yearsURL);
  fetchJSONMake(makeURL);

  console.log(this.crypto.randomUUID()); 
function validateData(){
    for (const pair of formData.entries()) {
        console.log(pair);
      }
    return ;
}



