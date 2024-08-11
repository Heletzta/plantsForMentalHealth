const bar = document.querySelector("#bar");
console.log("this page loaded omml");

const xBar = document.getElementById("xButton");


bar.addEventListener("click", function() {
    var div = document.getElementById("slidingW");
    moveInFromLeft(div);
});


xBar.addEventListener("click", function() {
    var div = document.getElementById("slidingW");
    moveOutLeft(div);
})


function moveOutLeft(div) {
    // white box, slides to the right, not too wide (1/5 of the page)
    // say add a plant, and create a family
    div.style.position = "absolute";
    var left = parseInt(div.style.left, 10);
    console.log(left);
    var gap = 5;
    var timer = window.setInterval(function() {
      div.style.left = left + "px";
      if (left < -500) {
        left = -500;
      } else {
        left -= gap;
      }
      if (left == -500) {
        clearInterval(timer);
      }
    }, 5);

    bar.style.display = 'block'; // this can't be generalized????????

}


function moveInFromLeft(div) {
    // white box, slides to the right, not too wide (1/5 of the page)
    // say add a plant, and create a family
    bar.style.display = 'none'; // this can't be generalized????????

    div.style.display = 'block';
    div.style.position = "absolute";
    var left = -500;
    div.style.left = left + "px";
    var gap = 7;
    var timer = window.setInterval(function() {
      div.style.left = left + "px";
      if (left + gap > 15) {
        left = 30;
      } else {
        left += gap;
      }
      if (left == 30) {
        clearInterval(timer);
      }
    }, 5);

    

}