function authenticateUser() {
  const username = document.getElementById("usernameInput").value.trim();
  const password = document.getElementById("passwordInput").value.trim();
  const messageDiv = document.getElementById("message");

  if (!username || !password) {
    messageDiv.style.color = "purple";
    messageDiv.textContent = "Username and password cannot be empty!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("brickBreakerUsers")) || {};

  if (users[username]) {
    if (users[username].password === password) {
      messageDiv.style.color = "lightgreen";
      messageDiv.textContent = "Login successful!";
      proceedToProfile(username, users[username]);
    } else {
      messageDiv.style.color = "purple";
      messageDiv.textContent = "Incorrect password!";
    }
  } else {
    // Register new user
    users[username] = { password: password, highscore: 0, level: 1 };
    localStorage.setItem("brickBreakerUsers", JSON.stringify(users));
    messageDiv.style.color = "lightgreen";
    messageDiv.textContent = "Registration successful!";
    proceedToProfile(username, users[username]);
  }
}

// Redirect to profile page after login
function proceedToProfile(username, userData) {
  localStorage.setItem("lastLoggedUser", username);
  window.location.href = "profile.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("authButton");
  if (btn) {
    btn.addEventListener("click", authenticateUser);
  } else {
    console.error("Login button not found!");
  }

  const changeUserBtn = document.getElementById("changeUserButton");
  if (changeUserBtn) {
    changeUserBtn.addEventListener("click", () => {
      localStorage.removeItem("lastLoggedUser");
      document.getElementById("authForm").style.display = "block";
      document.getElementById("userInput").style.display = "none";
      document.getElementById("gameWrapper").style.display = "none";
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const startGameDirectly = localStorage.getItem("startGameDirectly");
  const lastUser = localStorage.getItem("lastLoggedUser");

  if (lastUser && startGameDirectly === "true") {
    localStorage.removeItem("startGameDirectly");
    window.currentUser = lastUser;

    document.getElementById("authForm").style.display = "none";
    document.getElementById("userInput").style.display = "none"; // you can hide user input here if game is full screen
    document.getElementById("gameWrapper").style.display = "block";

    startGame();
  }
});
