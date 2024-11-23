const error = document.getElementById('error')
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
        credentials: "include" // Ensures cookies are sent with the request
    })
    .then(response => {
            if(response.status===200){
                console.log(response.status);
                window.location.href = 'index.html';
            }
            else if(response.status===404){
                error.innerHTML='User Not Found';
            }
            else if(response.status===400){
                error.innerHTML='User name or password wrong';
            }
            else{
                error.innerHTML='Check Connection';
            }
        return response.json(); // Assuming the response is in JSON format
    })
    .catch(error => {
        console.error('Error:', error);

        // Handling specific error codes
        if (error.message.includes('401')) {
            alert('Unauthorized: Incorrect username or password.');
        } else if (error.message.includes('403')) {
            alert('Forbidden: You do not have access.');
        } else if (error.message.includes('500')) {
            alert('Server error: Please try again later.');
        } else {
            alert('An unexpected error occurred: ' + error.message);
        }
    });
});
