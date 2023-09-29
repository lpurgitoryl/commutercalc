// handle site backgorund color change
function changeBG() {
    var checkBox = document.getElementById("checkbox");
    var header = document.getElementById("header"); // for some reason by class wasnt working so i switched to ID and it worked LOL
    var footer = document.getElementById("footer");
    var section = document.getElementsByTagName("section")
    console.log(header)
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

        console.log("clicked");
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

// TODO: Styles in light mode
// TODO: Mobile view
// TODO: values for user innput from gov site, Locations autofill from google
// TODO: 1) get form values 2) On calculate button -> verify values -> send api req to EPA site 3) parse responce 4) show google maps route 
// TODO: 5) finish stats board ... DONE!!!!
