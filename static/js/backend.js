

function echo() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      //document.getElementById("demo").innerHTML = this.responseText;
      var message = JSON.parse(this.responseText);
      //alert("reply from the server: " + message['reply']);
      //helloWorld();
      //document.location = "/Home";
    }
    var message = {'message' : "myMessage"};
    xhttp.open("POST", "/echo");
    xhttp.setRequestHeader("Content-type", "application/JSON");
    xhttp.send(JSON.stringify(message));

  }

  function helloWorld() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
      alert(this.responseText);
    }
    xhttp.open("GET", "/");
    //xhttp.setRequestHeader("Content-type", "application/JSON");
    xhttp.send();

  }
  