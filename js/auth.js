document.getElementById('authButton').addEventListener('click', authenticateUser);
document.getElementById('changeUserButton').addEventListener('click', goBackToAuth);

function authenticateUser() {
  const username = document.getElementById('usernameInput').value.trim();
  const password = document.getElementById('passwordInput').value.trim();
  const messageDiv = document.getElementById('message');

  if (!username || !password) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = "Username and password cannot be empty!";
    return;
  }

  let users = JSON.parse(localStorage.getItem('brickBreakerUsers')) || {};

  if (users[username]) {// if user exists
    if (users[username].password === password) {
      messageDiv.style.color = 'lightgreen';
      messageDiv.textContent = "Login successful!";
      proceedToGame(username, users[username].highscore || 0);
    } else {
      messageDiv.style.color = 'red';
      messageDiv.textContent = "Incorrect password!";
    }
  } else {
    users[username] = { password: password, highscore: 0 };
    localStorage.setItem('brickBreakerUsers', JSON.stringify(users));
    messageDiv.style.color = 'lightgreen';
    messageDiv.textContent = "Registration successful!";
    proceedToGame(username, 0);
  }
}

function proceedToGame(username, highscore) {
  document.getElementById('authForm').style.display = 'none';
  document.getElementById('userInput').style.display = 'block';
  document.getElementById('displayName').textContent = username;

  window.currentUser = username;
  window.currentHighscore = highscore;
}

function goBackToAuth() {
  document.getElementById('userInput').style.display = 'none';
  document.getElementById('authForm').style.display = 'block';
  document.getElementById('message').textContent = "";
  document.getElementById('usernameInput').value = "";
  document.getElementById('passwordInput').value = "";
}

function startGame() {
  if (!window.currentUser) {
    alert("No user logged in! Please login first.");
    return;
  }

  username = window.currentUser;

  document.getElementById("userInput").style.display = "none";
  document.getElementById("gameWrapper").style.display = "flex";

  resetGame();
  draw();
}
