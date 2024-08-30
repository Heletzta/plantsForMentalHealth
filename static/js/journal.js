function submitted() {
    if (document.getElementById("entered").value == '1') {
        alert("Your entry was saved!");
        //document.getElementById("status").textContent = "You did it! It's awesome that you wrote about your day today!";
    } else if (document.getElementById("entered").value == '2') {
        alert("There was an error in submitting your form. Please try again.");
        //document.getElementById("status").textContent = "there was an error in submitting your form. Please try again.";
    }

}


function makeNewEntry() {
    const entryForm = document.querySelector("#entries");
    const container = document.querySelector(".calContainer");
    const topButtons = document.querySelector(".topButtons");
    topButtons.classList.add("entryForm--hidden");
    container.classList.add("entryForm--hidden");
    entryForm.classList.remove("entryForm--hidden");
    selectJournal();
}



function goToMainPage() {
    const entryForm = document.querySelector("#entries");
    const journalForm = document.querySelector("#makeJournal");
    const container = document.querySelector(".calContainer");
    const topButtons = document.querySelector(".topButtons");
    const editForm = document.querySelector("#entriesEdit");
    topButtons.classList.remove("entryForm--hidden");
    container.classList.remove("entryForm--hidden");
    entryForm.classList.add("entryForm--hidden");
    journalForm.classList.add("entryForm--hidden");
    editForm.classList.add("entryForm--hidden");
}


function makeNewJournal() {
    const journalForm = document.querySelector("#makeJournal");
    const container = document.querySelector(".calContainer");
    const topButtons = document.querySelector(".topButtons");
    topButtons.classList.add("entryForm--hidden");
    container.classList.add("entryForm--hidden");
    journalForm.classList.remove("entryForm--hidden");
}


function selectJournal() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var journals = JSON.parse(this.response);
        console.log(journals);
        var options;
        for (journal of journals) {
            options += `<option>${journal[0]}</option>`;
        }
        const journalSelect = document.querySelector("#journal");
        journalSelect.innerHTML = options;
        //alert(this.responseText);
    }
    xhttp.open("GET", "/getAllJournals");
    //xhttp.setRequestHeader("Content-type", "application/JSON");
    xhttp.send();
    
}


function getAllJournals() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        var journals = JSON.parse(this.response);
        console.log(journals);
        for (journal of journals) {
            console.log(journal[0]);
            console.log(journal[1]);
            console.log(journal[2]);
        }
        //alert(this.responseText);
    }
    xhttp.open("GET", "/getAllJournals");
    //xhttp.setRequestHeader("Content-type", "application/JSON");
    xhttp.send();
}

