const error = document.getElementById('login-error')
document.getElementById('login-seller').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username-login').value;
    const password = document.getElementById('password-login').value;

    const data = JSON.stringify({
        "username": username,
        "password": password
    });

    fetch("http://localhost:8000/api/seller/login", {
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


document.getElementById('sign-form').addEventListener('submit',(event)=>{
    event.preventDefault();

    const username =document.getElementById("username-sign").value;
    const email = document.getElementById("email-sign").value;
    const name =document.getElementById("name-sign").value;
    const password = document.getElementById("password-sign").value;
    const business = document.getElementById("businessname-sign").value;
    const adress = document.getElementById("address-sign").value;
    const city = document.getElementById("city-sign").value;
    
    if(username.length<6){
        error.innerHTML = "Name must be at least 6 characters long"
        return;
    }
    if(name.length<6){
        error.innerHTML = "Name must be at least 6 characters long"
        return;
    }
    if(password.length<6){
        error.innerHTML = "Password must be at least 6 characters long"
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "username": username,
    "email": email,
    "password": password,
    "name": name,
    "businessname": business,
    "address":adress,
    "city":city,
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://localhost:8000/api/seller/register", requestOptions)
    .then((response) => window.location.href = 'login.html')
    .then((result) => error.innerHTML(JSON.parse(result)))
    .catch((error) => console.error(error));

})