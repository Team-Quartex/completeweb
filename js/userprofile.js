const userData = JSON.parse(localStorage.getItem('userData'));
console.log('dataof',userData);

document.getElementById('user-name').innerHTML = userData.name;
document.getElementById('username').innerHTML = '@'+userData.username;
document.getElementById('user-img').src = `http://127.0.0.1:8000/uploads/${userData.profilepic}`;
document.getElementById('user-img1').src = `http://127.0.0.1:8000/uploads/${userData.profilepic}`;