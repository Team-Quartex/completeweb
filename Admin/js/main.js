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

document.getElementById('logout-btn').addEventListener('click',()=>{
    fetch('http://localhost:8000/api/trova/admin/logout', {
        method: 'GET',
        credentials: 'include'  // Sends cookies with the request
    })
    .then(response => window.location.href = 'login.html')
    .then(data => {
        if (data.cookieFound) {
            window.location.href = 'login.html'
        } else {
            window.location.href = 'login.html' ;
        }
    })
    .catch(error => window.location.href = 'login.html');
})