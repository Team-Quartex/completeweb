const error = document.getElementById("error")
document.getElementById("signupForm").addEventListener('submit',function(event){
    event.preventDefault();
    
    const username =document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const name =document.getElementById("name").value;
    const password = document.getElementById("password").value;
    
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
    "name": name
    });

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
    };

    fetch("http://localhost:8000/api/users/register", requestOptions)
    .then((response) => window.location.href = 'login.html')
    .then((result) => error.innerHTML(JSON.parse(result)))
    .catch((error) => console.error(error));
    

})