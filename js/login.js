document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = JSON.stringify({
      "username": username,
      "password": password
  });
  
  fetch("http://localhost:8000/api/users/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: data,
      credentials: "include" // Ensures cookies are sent with the request (similar to xhr.withCredentials = true)
  })
  .then(response => response.json()) // Assuming the response is in JSON format
  .then(result => {
      const userData = result;  
      localStorage.setItem('userData', JSON.stringify(userData));
      window.location.href = 'index.html' 
       // Handle the result from the server
  })
  .catch(error => console.error('Error:', error)); 
//    
});
