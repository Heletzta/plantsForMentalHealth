function submitted() {
    if (document.getElementById("entered").value == '1') {
        document.getElementById("status").textContent = "You did it! It's awesome that you wrote about your day today!";
    } else if (document.getElementById("entered").value == '2') {
        document.getElementById("status").textContent = "there was an error in submitting your form. Please try again.";
    }

}


function makeNewEntry() {
    const entryForm = document.querySelector("#entries");
    const container = document.querySelector(".calContainer");
    const topButtons = document.querySelector(".topButtons");
    topButtons.classList.add("entryForm--hidden");
    container.classList.add("entryForm--hidden");
    entryForm.classList.remove("entryForm--hidden");
}


function goToMainPage() {
    const entryForm = document.querySelector("#entries");
    const container = document.querySelector(".calContainer");
    const topButtons = document.querySelector(".topButtons");
    topButtons.classList.remove("entryForm--hidden");
    container.classList.remove("entryForm--hidden");
    entryForm.classList.add("entryForm--hidden");
}


