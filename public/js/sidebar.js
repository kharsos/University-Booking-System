const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});

const hideDiv = () =>{
  document.querySelector('#hide').style.display="none"
} 

setTimeout(hideDiv,3000)

