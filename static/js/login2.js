
//Global vars


function window_onload() {
    const loginForm = document.querySelector("#login");
    if (document.getElementById("error").value == '1') {
        setFormMessage(loginForm, "error", "Invalid username/ password combination");
    } else if (document.getElementById("error").value == '2') {
        setFormMessage(loginForm, "error", "Username does not exist!");
    } else if (document.getElementById("error").value == '3') {
        setFormMessage(loginForm, "success", "Your account has been created! Please login here.");
    }
    /*const loginForm = document.querySelector("#login");
    var map = parseLink();
    if (map.has('e') && map.get('e') == '1') {
        setFormMessage(loginForm, "error", "Invalid username/ password combination");
    } else {
        setFormMessage(loginForm, "error", "worked!")
    }*/
}

function parseLink() {
    var url = document.location.href;
    const vars = new Map();
    if (url.indexOf("?") != -1) {
        var params = url.split("?");
        if (params[1].indexOf("&") != -1) {
            var paramsSplit = params[1].split("&");
            for (var i = 0; i < paramsSplit.length; i++)  {
                var keyVal = paramsSplit[i].split("=");
                vars.set(keyVal[0], keyVal[1]);
            }
        } else {
            var keyVal = params[1].split("=");
            vars.set(keyVal[0], keyVal[1]);
        }
    }
    
    return vars;
}

function createAccountOnClick() {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    loginForm.classList.add("form--hidden");
    createAccountForm.classList.remove("form--hidden");
}

function backToLogin() {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");
    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
}


function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;

}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add('form__message--${type}');
}


/*document.addEventListener("DOMContentLoaded", () => {

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        createAccountForm.classList.add("form--hidden");
        loginForm.classList.remove("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        setFormMessage(loginForm, "error", "Invalid username/ password combination");

    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id == "SignUpUsername" && e.target.value.length > 0 && e.target.value.length < 7) {
                setInputError(inputElement, "Username must be at least 7 characters in length");
            }
            
        });

        inputElement.addEventListener("input", e=> {
            clearInputError(inputElement);
        });
    });
});*/

