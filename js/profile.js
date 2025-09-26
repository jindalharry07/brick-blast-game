function loadProfile() {
  let users = JSON.parse(localStorage.getItem("brickBreakerUsers")) || {};
  
  let usernames = Object.keys(users);
  if (usernames.length === 0) {
    document.getElementById("profile").innerHTML = "<p>No game data found.</p>";
    document.getElementById("leaderboard").innerHTML = "";
    return;
  }

  // Get the latest logged-in user (stored in window.currentUser)
  let latestUser = window.localStorage.getItem("lastLoggedUser");
  if (!latestUser || !users[latestUser]) {
    latestUser = usernames[usernames.length - 1]; // fallback to last one
  }

  let userData = users[latestUser];
  let highScore = userData.highscore || 0;
  let level = userData.level || 1;

  let html = `<h2>Welcome, ${latestUser}</h2>`;
  html += `<p><strong>High Score:</strong> ${highScore}</p>`;
  html += `<p><strong>Last Level Reached:</strong> ${level}</p>`;
  document.getElementById("profile").innerHTML = html;

  
  // Leaderboard
  let leaderboardData = [];
  usernames.forEach(u => {
    leaderboardData.push({ name: u, score: users[u].highscore || 0 });
  });

  leaderboardData.sort((a, b) => b.score - a.score);

  let lbHtml = "<h2>Leaderboard</h2><ol>";
  leaderboardData.forEach(u => {
    lbHtml += `<li>${u.name}: ${u.score}</li>`;
  });
  lbHtml += "</ol>";

  document.getElementById("leaderboard").innerHTML = lbHtml;
}

// Call the function when profile.html loads
loadProfile();
