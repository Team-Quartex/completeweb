import {initilizeRequest} from './verification.js'
import {initilizeSellers} from './seller.js'
import { initilizeReservation } from './reservation.js';
import { initilizeUser } from './users.js';

const navBtn = document.querySelectorAll('.nav-btn');
const navContent = document.querySelectorAll('.main-container');


navBtn.forEach((btn,index)=>{
    btn.addEventListener('click',()=>{
        navContent.forEach(e=>e.style.display = "none");
        navContent[index].style.display = "block";
        onTabShow(index)
    })
});

function onTabShow(index) {
  
    // Example of tab-specific actions
    if (index === 0) {
        
    } else if (index === 1) {
        initilizeRequest();
    }else if(index===2){
      initilizeSellers();
    }else if(index ===3){
        initilizeReservation();
    }else{
        initilizeUser();
    }
    // Add more conditions for other tabs if needed
  }