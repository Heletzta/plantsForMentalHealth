function submitted() {
    if (document.getElementById("entered").value == '1') {
        document.getElementById("status").textContent = "You did it! It's awesome that you wrote about your day today!";
    } else if (document.getElementById("entered").value == '2') {
        document.getElementById("status").textContent = "there was an error in submitting your form. Please try again.";

    }

}

