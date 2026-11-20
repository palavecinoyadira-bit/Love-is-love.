const screens = document.querySelectorAll(".screen");

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }
}

function goHome() {
  showScreen("home");
}

function enterGarden() {
  showScreen("garden");
}

function openScene(id) {
  showScreen(id);
}

function notYet() {
  showScreen("not-yet");
}

/* ROSA */

let roseOpened = false;

function bloomRose() {
  const rose = document.querySelector(".large-rose");
  const message = document.getElementById("rose-message");

  if (!rose) return;

  rose.classList.toggle("bloomed");
  roseOpened = !roseOpened;

  message.textContent = roseOpened
    ? "Quería regalarte algo lindo, aunque sea a través de esta pequeña sorpresa. ♡"
    : "Algunas cosas lindas no necesitan demasiadas palabras.";
}

/* REGALO */

let giftOpened = false;

function openGift() {
  const gift = document.getElementById("largeGift");
  const instruction = document.getElementById("gift-instruction");

  if (!gift) return;

  giftOpened = !giftOpened;
  gift.classList.toggle("opened", giftOpened);

  instruction.textContent = giftOpened
    ? "Un pequeño recordatorio: sos alguien muy especial. ♡"
    : "Hay algo esperando adentro.";
}

/* CARTA */

let letterOpened = false;

function openLetter() {
  const stage = document.getElementById("letterStage");
  const instruction = document.getElementById("letter-instruction");
  const button = document.getElementById("letterButton");

  if (!stage) return;

  if (!letterOpened) {
    stage.classList.add("opened");
    letterOpened = true;
    instruction.textContent = "La carta está lista para leer.";
    button.querySelector("span").textContent = "Leer carta";

    setTimeout(() => {
      showScreen("letter-reading");
    }, 850);
  } else {
    showScreen("letter-reading");
  }
}

/* SECRETO */

let secretRevealed = false;

function revealSecret() {
  const message = document.getElementById("secret-message");
  const heart = document.getElementById("secretHeart");

  if (secretRevealed) {
    message.textContent = "Y eso era todo... aunque todavía hay más sorpresas.";
    return;
  }

  secretRevealed = true;
  heart.classList.add("revealed");

  message.textContent =
    "Este pequeño secreto es para recordarte que alguien se tomó el tiempo de preparar todo esto pensando en vos. ♡";
}

/* ESTRELLAS */

function createStars() {
  const container = document.getElementById("stars");
  if (!container) return;

  for (let i = 0; i < 35; i++) {
    const star = document.createElement("span");

    star.className = "star";
    star.textContent = Math.random() > 0.5 ? "✦" : "·";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.fontSize = (7 + Math.random() * 12) + "px";
    star.style.animationDelay = Math.random() * 4 + "s";

    container.appendChild(star);
  }
}

/* PÉTALOS FLOTANTES */

function createPetals() {
  const container = document.getElementById("petals");
  if (!container) return;

  for (let i = 0; i < 12; i++) {
    const petal = document.createElement("span");

    petal.className = "petal";
    petal.style.left = Math.random() * 100 + "%";
    petal.style.animationDelay = (Math.random() * -15) + "s";
    petal.style.animationDuration = (10 + Math.random() * 10) + "s";
    petal.style.opacity = 0.2 + Math.random() * 0.35;

    container.appendChild(petal);
  }
}

createStars();
createPetals();
