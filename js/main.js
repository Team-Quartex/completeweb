fetch('http://localhost:8000/api/check-cookie', {
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
.catch(error => console.error('Error:', error));
