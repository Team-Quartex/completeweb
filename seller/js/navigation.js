import {fetchProducts,fetchCategories} from './product.js'
import {fetchrentDetails,sellerEarnings,sellerWithdraw} from './earings.js'
import {profileDetailsLoad} from './profileview.js'

const contents = document.querySelectorAll(".main-content");
const navbtns = document.querySelectorAll(".nav-item");
navbtns.forEach((button, index) => {
  button.addEventListener("click", () => {
    navbtns.forEach((navbtn) => navbtn.classList.remove("active"));
    button.classList.add("active");
    contents.forEach((content) => content.classList.remove("show-content"));
    contents[index].classList.add("show-content");
    onTabShow(index);
  });
});
function onTabShow(index) {
  
  // Example of tab-specific actions
  if (index === 0) {

  } else if (index === 1) {
    fetchProducts();
    fetchCategories();
  }else if(index===2){
    fetchrentDetails();
    sellerEarnings();
    sellerWithdraw();
  }else if(index ===3){
    profileDetailsLoad();
  }else{
    
  }
  // Add more conditions for other tabs if needed
}