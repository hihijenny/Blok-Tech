var style = document.createElement('style'); // maakt style element aan
  style.innerHTML = `
  .form {
    grid-template-columns: 4fr;
    margin-top: -3%;
  }

  button {
    margin-top: 5%;
  }
  `;
  document.head.appendChild(style);

var tabs = document.querySelectorAll(".choice .food-choices");
console.log(tabs);
for(let i = 0; i < tabs.length; i++){
  tabs[i].style.display = 'none'; //tabs staan op display: none
}

var nextButton = document.querySelector('button');
nextButton.type = 'button';
var currentTab = 0; // Huidige tab is 0
showTab(currentTab); // Laat de huidige tab zien

function showTab(n) {
  // Laat het tab zien door op display: grid te zetten
  var x = document.getElementsByClassName("food-choices");
  x[n].style.display = "grid";
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("food-choices");

  // Verberg de huidige tab
  x[currentTab].style.display = "none";
  currentTab = currentTab + n;
  // Als je aan het einde van je form komt word deze gesubmit 
  if (currentTab >= x.length) {
   
    document.getElementById("form").submit();
    return false;
  }
  // En anders laat de huidige tab zien
  showTab(currentTab);
}

///w3schools.com. (z.d.). How To Create a Form With Multiple Steps. 
///Geraadpleegd op 25 juni 2020, van https://www.w3schools.com/howto/howto_js_form_steps.asp

///Karataev, E. (2019, 6 juli). Set CSS styles with javascript. 
///Geraadpleegd op 26 juni 2020, van https://dev.to/karataev/set-css-styles-with-javascript-3nl5