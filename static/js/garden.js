
let coins = 100;

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
});

const choice1 = document.getElementById("addPlantBar");
const choice2 = document.getElementById("addFamilyBar");

//To display shop when clicking on addPlantBar
choice1.addEventListener("click", function() {
  var div = document.getElementById("slidingW");
  moveOutLeft(div);
  const shop = document.getElementById("shop");
  if (shop.style.display === "none" || shop.style.display ==='') {
    shop.style.display = "block";
  }
  else {
    shop.style.display = "none";
  }
});

//Let user click on plant to purchase it
document.querySelectorAll('.plant').forEach(plant => {
    plant.addEventListener("click", function() {
      const price = parseInt(this.dataset.price);
      if (price <= coins) {
        if(window.confirm("Are you sure you would like to purchase this plant?")) {
          coins -= price;
          document.getElementById.coinCount.innerText = coins;
          const plantClone = this.cloneNode(true);
          plantClone.removeAttribute('data-price');
          //add plant to garden
          document.getElementById('garden').appendChild(plantClone);
          alert("Congratulations! You can now view the plant in your garden.");
        }
      }
      else {
        alert("You do not have enough coins!");
      }
    });
  });

  const xBar2 = document.getElementById("xButton2");
  xBar2.addEventListener("click", function() {
    shop.style.display = "none";
  });



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




