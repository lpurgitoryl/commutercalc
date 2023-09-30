// handle site backgorund color change
function changeBG() {
    var checkBox = document.getElementById("checkbox");
    var header = document.getElementById("header");
    var footer = document.getElementById("footer");
    var section = document.getElementsByTagName("section")
    if (checkBox.checked){
        document.body.style.backgroundColor = "var(--bg-black)";
        document.body.style.color = "white";

        header.style.color = "white";
        header.style.backgroundColor = "var(--sec-grey)";

        footer.style.color = "white";
        footer.style.backgroundColor = "var(--sec-grey)";

        for (let i = 0; i < section.length; i++) {
            section[i].style.color = "white";
            section[i].style.backgroundColor = "var(--sec-grey)";
        }

    } else {
        document.body.style.backgroundColor = "var(--bg-white)";
        document.body.style.color = "black";

        header.style.color = "black";
        header.style.backgroundColor = "var(--sec-off-white)";

        footer.style.color = "black";
        footer.style.backgroundColor = "var(--sec-off-white)";

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
const form = document.querySelector("#userInput");
form.addEventListener("submit", function (event) {
	// stop form submission
	event.preventDefault();

    // key value of forms
    var values = new FormData(form);
	// validate the form
    console.log()
});

const yearsURL = "https://www.fueleconomy.gov/ws/rest/vehicle/menu/year";

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
      const yearDD = document.getElementById("year");   
      for(var i in jsonData.menuItem){
        console.log(jsonData.menuItem[i].value);
        var newOption = new Option(jsonData.menuItem[i].text,jsonData.menuItem[i].value);

        yearDD.add(newOption,undefined);
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
    }
  }

  fetchJSONYears(yearsURL)