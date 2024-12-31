const cardsArray = [
    { name: "apple", img: "./Assets/Images/APPLE.jpeg" },
    { name: "banana", img: "./Assets/Images/banana.webp" },
    { name: "cherry", img: "./Assets/Images/cherry.webp" },
    { name: "grape", img: "./Assets/Images/grape.jpeg" },
    { name: "orange", img: "./Assets/Images/orange.jpeg" },
    { name: "peach", img: "./Assets/Images/peach.jpeg" },
  ];
  
  // Duplicate and shuffle cards
  let cards = [...cardsArray, ...cardsArray].sort(() => Math.random() - 0.5);
  
  const gameGrid = document.querySelector(".game-grid");
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let moves = 0;
  let startTime = null;
  let timerInterval = null;
  
  // Create card elements
  function createCards() {
    gameGrid.innerHTML = "";
    cards.forEach(({ name, img }) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.name = name;
  
      const frontFace = document.createElement("img");
      frontFace.src = img;
      frontFace.classList.add("front-face");
  
      const backFace = document.createElement("img");
      backFace.src = "./Assets/Images/img.png"; // Replace with your card back image
      backFace.classList.add("back-face");
  
      card.appendChild(frontFace);
      card.appendChild(backFace);
      gameGrid.appendChild(card);
  
      card.addEventListener("click", flipCard);
    });
  }
  
  // Flip card
  function flipCard() {
    if (lockBoard || this === firstCard) return;
  
    this.classList.add("flipped");
  
    if (!firstCard) {
      firstCard = this;
      return;
    }
  
    secondCard = this;
    updateMoveCount();
    checkMatch();
  }
  
  // Check for a match
  function checkMatch() {
    const isMatch = firstCard.dataset.name === secondCard.dataset.name;
  
    if (isMatch) {
      disableCards();
    } else {
      unflipCards();
    }
  
    // Check if all cards are matched
    setTimeout(checkVictory, 500);
  }
  
  // Disable matched cards
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    resetBoard();
  }
  
  // Unflip cards
  function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetBoard();
    }, 1000);
  }
  
  // Reset board state
  function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
  }
  
  // Update move count
  function updateMoveCount() {
    moves++;
    document.getElementById("move-count").textContent = moves;
  }
  
  // Check for victory
  function checkVictory() {
    const flippedCards = document.querySelectorAll(".card.flipped");
    if (flippedCards.length === cards.length) {
      clearInterval(timerInterval);
      alert(`Congratulations! You won in ${moves} moves and ${document.getElementById("timer").textContent}!`);
    }
  }
  
  // Timer
  function startTimer() {
    startTime = new Date();
    timerInterval = setInterval(() => {
      const currentTime = new Date();
      const timeElapsed = Math.floor((currentTime - startTime) / 1000);
      document.getElementById("timer").textContent = `Time: ${timeElapsed}s`;
    }, 1000);
  }
  
  // Restart game
  document.getElementById("restart-button").addEventListener("click", () => {
    moves = 0;
    document.getElementById("move-count").textContent = moves;
    document.getElementById("timer").textContent = "Time: 0s";
    clearInterval(timerInterval);
    resetBoard();
    cards = [...cardsArray, ...cardsArray].sort(() => Math.random() - 0.5);
    createCards();
    startTimer();
  });
  
  // Initialize game
  createCards();
  startTimer();
  