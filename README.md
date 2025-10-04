# 🎮 Brick Breaker Game with User Authentication & Leaderboard

A **web-based Brick Breaker Game** built using **HTML, CSS, and JavaScript**, featuring:

- User **Login & Registration** (with LocalStorage)
- Dynamic **Leaderboard System**
- User-specific **Profile Page**
- Persistent **High Score and Level Saving**
- Smooth and responsive gameplay using the HTML5 **Canvas API**

---

## 📁 Project Structure

```
BrickBreaker/
│
├── assets/
│ ├── bg.jpg
│ └── profile.jpg
│
├── css/
│ ├── auth-style.css
│ └── profile.css
│
├── js/
│ ├── auth.js
│ ├── game.js
│ └── profile.js
│
├── index.html ← Login & Game Page
├── profile.html ← Profile & Leaderboard Page
└── README.md ← Documentation File
```

## 🧩 Features

### 🧍 User Authentication

- Users can **register or login** with a username and password.
- Data is stored securely in **LocalStorage** under the key `brickBreakerUsers`.
- If a user already exists, login validates their password.
- New users are automatically registered with a starting score and level.

### 🕹️ Gameplay

- Classic **Brick Breaker mechanics** implemented with the HTML5 Canvas API.
- Smooth movement controls:
  - Move Paddle: `←` / `→` keys or `A` / `D`.
- Lives, Levels, and Score are dynamically displayed.
- Each cleared level increases difficulty by adding more rows of bricks.
- On game over, the player is redirected to the **Profile Page**.

### 🏆 Score Saving

- Player’s **high score** and **last level** are automatically saved.
- Only the best score per user is retained.
- Progress is persistent — even after closing the browser.

### 👤 Profile Page

- Displays the **logged-in user's**:
  - Username
  - Highest Score
  - Last Level Reached
- Includes:
  - **Leaderboard** showing top 10 players (sorted by score)
  - **Play Again** and **Logout** buttons

### 🪪 Leaderboard

- Real-time leaderboard sorted by high scores.
- Highlights the **current logged-in player**.

## 🧠 How It Works

1. **index.html**

- Displays the **Login / Register form**.
- After successful authentication, redirects to the **profile.html** or launches the game directly.
- Game is drawn dynamically using `canvas` and `requestAnimationFrame()`.

2. **auth.js**

- Handles **login and signup** logic.
- Manages user data in LocalStorage.
- Redirects to profile or game on success.

3. **game.js**

- Contains the full **game loop**, including:
  - Drawing the paddle, ball, bricks
  - Handling collisions
  - Score & level updates
- Calls `saveScore()` to store the player's progress.

4. **profile.js**
  - Loads the **last logged-in user** from LocalStorage.
  - Displays the player’s stats and leaderboard.
  - Allows replaying or logging out.

---

## 🚀 How to Run the Project

1. **Download or Clone** this repository.
  ```bash
  git clone https://github.com/jindalharry07/brick-blast-game.git
  ```
