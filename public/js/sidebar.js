const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});
function showMore(id) {
  var dots = document.querySelector(".dots" + id);
  var moreText = document.querySelector(".more" + id);
  var viewMoreButton = document.querySelector(".viewMore" + id);

  if (dots && moreText && viewMoreButton) {
    if (dots.style.display === "none" || dots.style.display === "") {
    dots.style.display = "inline";
    viewMoreButton.textContent = "View Less";
    moreText.style.display = "inline";
    } else {
    dots.style.display = "none";
    viewMoreButton.textContent = "View More";
    moreText.style.display = "none";
    }
}
}
const hideDiv = () =>{
  document.querySelector('#hide').style.display="none"
} 

setTimeout(hideDiv,3000)

