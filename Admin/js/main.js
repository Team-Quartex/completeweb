document.addEventListener('DOMContentLoaded',()=>{
    fetch('http://localhost:8000/api/check-cookie-admin', {
        method: 'GET',
        credentials: 'include'  // Sends cookies with the request
    })
    .then(response => response.json())
    .then(data => {
        if (data.cookieFound) {
        } else {
            window.location.href = 'login.html' ;
        }
    })
    .catch(error => window.location.href = 'login.html');
    
})