function loadProfile() {
  const users = JSON.parse(localStorage.getItem("brickBreakerUsers")) || {};
  const leaderboardList = document.getElementById("leaderboardList");

  let latestUser = localStorage.getItem("lastLoggedUser");
  if (!latestUser || !users[latestUser]) {
    window.location.href = 'index.html';
    return;
  }

  const userData = users[latestUser];
  const highScore = userData.highscore || 0;
  const level = userData.level || 1;

  // Populate profile section
  document.getElementById("welcomeUsername").textContent = `Welcome, ${latestUser}!`;
  document.getElementById("displayScore").textContent = highScore;
  document.getElementById("displayLevel").textContent = level;

  // Populate leaderboard
  const sorted = Object.keys(users)
    .map(u => ({ name: u, score: users[u].highscore || 0 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  leaderboardList.innerHTML = sorted
    .map(player => {
      const highlightClass = player.name === latestUser ? 'current-user' : '';
      return `<li class="${highlightClass}"><strong>${player.name}</strong>: ${player.score}</li>`;
    })
    .join("");

  // Button actions
  document.getElementById('playAgainBtn').addEventListener('click', () => {
    localStorage.setItem('startGameDirectly', 'true');
    window.location.href = 'index.html';
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    logout();
  });
}

function logout() {
  localStorage.removeItem("lastLoggedUser");
  window.location.href = 'index.html';
}

window.onload = loadProfile;