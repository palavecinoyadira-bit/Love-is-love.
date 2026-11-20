
const $ = id => document.getElementById(id);

let currentScene = 0;
let surpriseCount = 0;
let roseOpened = false;

const questions = [
  {
    title: "¿Me perdonas, Anyi?",
    subtitle: "Tengo algo que decirte, mi reina."
  },
  {
    title: "¿Me perdonas, mi reina?",
    subtitle: "Una flor para acompañar esta preguntita."
  },
  {
    title: "¿Me perdonas, mi niña?",
    subtitle: "Todavía tengo algunas sorpresitas para vos."
  },
  {
    title: "¿Me perdonas, Anyi bonita?",
    subtitle: "Ojalá esta sorpresa te saque una sonrisa."
  },
  {
    title: "¿Me perdonas, preciosa?",
    subtitle: "Esta pregunta viene con mucho cariño."
  },
  {
    title: "¿Me perdonas, mi reina hermosa?",
    subtitle: "Una preguntita más, acompañada de flores."
  },
  {
    title: "¿Me perdonas, Anyi?",
    subtitle: "Preparé otra cosita especialmente para vos."
  },
  {
    title: "¿Me perdonas, bonita?",
    subtitle: "¿Y si te regalo otra pequeña sorpresa?"
  }
];

const scenes = [
  "rose-scene",
  "letter-scene",
  "gift-scene",
  "heart-scene"
];


/* CAMBIO DE PANTALLAS */

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(screen => {
    screen.classList.remove("active");
  });

  $(id).classList.add("active");
}


/* INICIO */

function startExperience() {
  showScreen("experience");
  createParticles();
  showScene(0);
  updateQuestion();
}


/* PREGUNTAS */

function updateQuestion() {
  const question =
    questions[surpriseCount % questions.length];

  $("question").textContent = question.title;
  $("question-subtitle").textContent = question.subtitle;

  $("question-number").textContent =
    String(surpriseCount + 1).padStart(2, "0");
}


/* RESTABLECER OBJETOS */

function resetObjects() {
  const envelope = document.querySelector(".envelope");
  const gift = document.querySelector(".gift");

  if (envelope) {
    envelope.classList.remove("opened");
  }

  if (gift) {
    gift.classList.remove("opened");
  }

  roseOpened = false;
  resetRose();
}


/* CAMBIAR EXPERIENCIA */

function showScene(index) {
  scenes.forEach(id => {
    $(id).classList.add("hidden");
  });

  currentScene = index % scenes.length;

  resetObjects();

  $(scenes[currentScene]).classList.remove("hidden");

  // La rosa necesita ajustar su tamaño
  // cuando su contenedor deja de estar oculto.

  if (currentScene === 0) {
    requestAnimationFrame(resizeRose);
  }
}


/* BOTÓN NO */

function nextSurprise() {
  surpriseCount++;

  const next = (currentScene + 1) % scenes.length;

  showScene(next);
  updateQuestion();

  createBurst("♡");
}


/* SORPRESA ALEATORIA */

function randomSurprise() {
  const options = scenes
    .map((_, index) => index)
    .filter(index => index !== currentScene);

  const next = options[
    Math.floor(Math.random() * options.length)
  ];

  surpriseCount++;

  showScene(next);
  updateQuestion();

  createBurst("✿");
}


/* CARTA */

function openLetter() {
  const envelope = document.querySelector(".envelope");

  if (envelope.classList.contains("opened")) {
    return;
  }

  envelope.classList.add("opened");

  $("question").textContent =
    "¿Me perdonas, mi reina?";

  $("question-subtitle").textContent =
    "Esta cartita también viene con mucho cariño.";

  createBurst("♡");
}


/* REGALO */

function openGift() {
  const gift = document.querySelector(".gift");

  if (gift.classList.contains("opened")) {
    return;
  }

  gift.classList.add("opened");

  $("question").textContent =
    "¿Me perdonas, Anyi?";

  $("question-subtitle").textContent =
    "¡Había otra preguntita escondida acá!";

  createBurst("✿");
}


/* CORAZÓN */

function heartSurprise() {
  const heart = document.querySelector(".big-heart");

  heart.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.4) rotate(-10deg)" },
      { transform: "scale(1) rotate(0)" }
    ],
    {
      duration: 700,
      easing: "ease-out"
    }
  );

  createBurst("♥");

  $("question").textContent =
    "¿Me perdonas, bonita?";

  $("question-subtitle").textContent =
    "Este corazoncito tiene una preguntita para vos.";
}


/* RESPUESTA SÍ */

function forgive() {
  showScreen("ending");
  startCelebration();
}


/* CELEBRACIÓN FINAL */

function startCelebration() {
  const container = $("celebration");

  container.innerHTML = "";

  const symbols = [
    "♡", "✿", "♥", "✧", "🌸", "🌷"
  ];

  for (let i = 0; i < 55; i++) {
    const item = document.createElement("span");

    item.className = "confetti";

    item.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    item.style.left = Math.random() * 100 + "%";

    item.style.animationDelay =
      Math.random() * 2.5 + "s";

    item.style.animationDuration =
      3 + Math.random() * 3 + "s";

    container.appendChild(item);
  }
}


/* PARTÍCULAS DEL FONDO */

function createParticles() {
  const container = $("particles");

  if (container.dataset.created) {
    return;
  }

  container.dataset.created = "true";

  const symbols = ["♡", "✧", "✿", "·"];

  for (let i = 0; i < 24; i++) {
    const particle = document.createElement("span");

    particle.className = "particle";

    particle.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left = Math.random() * 100 + "%";

    particle.style.fontSize =
      12 + Math.random() * 17 + "px";

    particle.style.animationDuration =
      8 + Math.random() * 12 + "s";

    particle.style.animationDelay =
      Math.random() * 12 + "s";

    container.appendChild(particle);
  }
}


/* EXPLOSIÓN DE ELEMENTOS */

function createBurst(symbol) {
  const scene = $("scene");

  for (let i = 0; i < 14; i++) {
    const item = document.createElement("span");

    item.textContent = symbol;

    item.style.position = "absolute";
    item.style.left = "50%";
    item.style.top = "45%";
    item.style.pointerEvents = "none";
    item.style.color = "#d77fa5";

    item.style.fontSize =
      18 + Math.random() * 15 + "px";

    scene.appendChild(item);

    const angle = Math.random() * Math.PI * 2;

    const distance = 50 + Math.random() * 100;

    item.animate(
      [
        {
          transform: "translate(-50%, -50%) scale(.3)",
          opacity: 1
        },
        {
          transform:
            `translate(
              ${Math.cos(angle) * distance}px,
              ${Math.sin(angle) * distance}px
            ) scale(1.5)`,
          opacity: 0
        }
      ],
      {
        duration: 1100,
        easing: "ease-out"
      }
    );

    setTimeout(() => item.remove(), 1200);
  }
}


/* ==========================================
   ROSA 3D - THREE.JS
========================================== */

let roseScene;
let roseCamera;
let roseRenderer;
let roseGroup;

let petals = [];

let openingStart = null;

let roseInitialized = false;


/* CREAR ROSA */

function initRose() {
  const container = $("rose3d");

  if (!container || !window.THREE) {
    console.error("Three.js no pudo cargarse.");
    return;
  }

  if (roseInitialized) {
    return;
  }

  roseInitialized = true;

  roseScene = new THREE.Scene();

  roseCamera = new THREE.PerspectiveCamera(
    38,
    1,
    0.1,
    100
  );

  roseCamera.position.set(0, 0, 8);

  roseCamera.lookAt(0, 0, 0);

  roseRenderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  roseRenderer.setPixelRatio(
    Math.min(window.devicePixelRatio || 1, 2)
  );

  roseRenderer.setClearColor(0x000000, 0);

  roseRenderer.outputEncoding = THREE.sRGBEncoding;

  container.appendChild(roseRenderer.domElement);

  resizeRose();

  // Iluminación ambiental

  roseScene.add(
    new THREE.AmbientLight(0xffffff, 1.4)
  );

  // Luz principal

  const light = new THREE.DirectionalLight(
    0xffffff,
    2
  );

  light.position.set(3, 5, 7);

  roseScene.add(light);

  // Luz rosa secundaria

  const pinkLight = new THREE.PointLight(
    0xff9fc9,
    1.5,
    15
  );

  pinkLight.position.set(-3, 1, 4);

  roseScene.add(pinkLight);

  roseGroup = new THREE.Group();

  roseScene.add(roseGroup);

  buildRose();

  animateRose();
}


/* GEOMETRÍA DE LOS PÉTALOS */

function createPetalGeometry(length, width) {
  const geometry = new THREE.BufferGeometry();

  const vertices = [];
  const indices = [];

  const rows = 16;
  const columns = 12;

  for (let i = 0; i <= rows; i++) {
    const u = i / rows;

    for (let j = 0; j <= columns; j++) {
      const v = (j / columns) * 2 - 1;

      const shape = Math.sin(Math.PI * u);

      const x = u * length;

      const y = v * width * shape;

      const z =
        0.22 * Math.sin(Math.PI * u) -
        0.12 * v * v * shape;

      vertices.push(x, y, z);
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const a = i * (columns + 1) + j;

      const b = a + columns + 1;

      indices.push(a, b, a + 1);

      indices.push(b, b + 1, a + 1);
    }
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  geometry.setIndex(indices);

  geometry.computeVertexNormals();

  return geometry;
}


/* CONSTRUIR LA FLOR */

function buildRose() {

  // TALLO

  const stemMaterial = new THREE.MeshStandardMaterial({
    color: 0x527d57,
    roughness: 0.8
  });

  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(
      0.045,
      0.065,
      2.8,
      12
    ),
    stemMaterial
  );

  stem.position.set(0, -1.55, -0.2);

  roseGroup.add(stem);


  // HOJAS

  for (let i = 0; i < 2; i++) {

    const leaf = new THREE.Mesh(
      new THREE.SphereGeometry(1, 20, 12),

      new THREE.MeshStandardMaterial({
        color: 0x679a69,
        roughness: 0.7
      })
    );

    leaf.scale.set(0.55, 0.15, 0.23);

    leaf.position.set(
      i === 0 ? -0.35 : 0.35,
      -1.35,
      0
    );

    leaf.rotation.z =
      i === 0 ? -0.4 : 0.4;

    roseGroup.add(leaf);
  }


  // CAPAS DE PÉTALOS

  const layers = [

    {
      count: 8,
      length: 1.35,
      width: 0.53,
      radius: 0.15,
      color: 0xd95388
    },

    {
      count: 7,
      length: 1.12,
      width: 0.48,
      radius: 0.09,
      color: 0xe875a2
    },

    {
      count: 6,
      length: 0.88,
      width: 0.39,
      radius: 0.04,
      color: 0xf08eb4
    },

    {
      count: 5,
      length: 0.62,
      width: 0.30,
      radius: 0,
      color: 0xf5a6c4
    },

    {
      count: 4,
      length: 0.39,
      width: 0.23,
      radius: -0.03,
      color: 0xffc1d5
    }

  ];


  layers.forEach((layer, layerIndex) => {

    for (let i = 0; i < layer.count; i++) {

      const material =
        new THREE.MeshStandardMaterial({
          color: layer.color,
          roughness: 0.42,
          metalness: 0.02,
          side: THREE.DoubleSide
        });

      const petal = new THREE.Mesh(
        createPetalGeometry(
          layer.length,
          layer.width
        ),
        material
      );

      const angle =
        (i / layer.count) * Math.PI * 2 +
        layerIndex * 0.38;

      petal.rotation.z = angle;

      petal.position.set(
        Math.cos(angle) * layer.radius,
        Math.sin(angle) * layer.radius,
        layerIndex * 0.025
      );

      // Empieza cerrada

      petal.scale.set(0.12, 0.12, 0.12);

      petal.userData.originalScale = 1;

      petal.userData.delay =
        layerIndex * 0.22 + i * 0.035;

      petal.userData.opening = false;

      roseGroup.add(petal);

      petals.push(petal);
    }

  });


  // CENTRO

  const center = new THREE.Mesh(
    new THREE.SphereGeometry(0.17, 24, 24),

    new THREE.MeshStandardMaterial({
      color: 0xb83c6d,
      roughness: 0.55
    })
  );

  center.position.z = 0.15;

  roseGroup.add(center);

  roseGroup.rotation.x = -0.12;
}


/* ABRIR ROSA */

function animateRoseOpen() {

  if (roseOpened) {
    return;
  }

  roseOpened = true;

  openingStart = performance.now();

  petals.forEach(petal => {
    petal.userData.opening = true;
  });

  $("question").textContent =
    "¿Me perdonas, mi reina?";

  $("question-subtitle").textContent =
    "Hasta esta rosa quiso abrirse para vos.";

  createBurst("✿");
}


/* CERRAR ROSA */

function resetRose() {

  openingStart = null;

  petals.forEach(petal => {

    petal.scale.set(
      0.12,
      0.12,
      0.12
    );

    petal.userData.opening = false;

  });

}


/* AJUSTAR TAMAÑO */

function resizeRose() {

  if (!roseRenderer || !roseCamera) {
    return;
  }

  const container = $("rose3d");

  const width =
    container.clientWidth || window.innerWidth - 44;

  const height =
    container.clientHeight || 310;

  roseCamera.aspect = width / height;

  roseCamera.updateProjectionMatrix();

  roseRenderer.setSize(width, height, false);
}


/* ANIMACIÓN CONTINUA */

function animateRose() {

  requestAnimationFrame(animateRose);

  if (!roseRenderer || !roseGroup) {
    return;
  }

  const time = performance.now() * 0.001;

  // Apertura progresiva de cada pétalo

  if (openingStart !== null) {

    const elapsed =
      (performance.now() - openingStart) / 1000;

    petals.forEach(petal => {

      const delay = petal.userData.delay;

      const progress = Math.max(
        0,
        Math.min(1, (elapsed - delay) / 1.2)
      );

      // Suavizado

      const eased =
        1 - Math.pow(1 - progress, 3);

      const scale =
        0.12 + eased * 0.88;

      petal.scale.set(
        scale,
        scale,
        scale
      );

    });

  }


  // Movimiento natural de la flor

  roseGroup.rotation.z =
    Math.sin(time * 0.5) * 0.025;

  roseGroup.position.y =
    Math.sin(time * 0.8) * 0.045;


  roseRenderer.render(
    roseScene,
    roseCamera
  );
}


/* INICIO GENERAL */

window.addEventListener("load", () => {

  createParticles();

  initRose();

  window.addEventListener(
    "resize",
    resizeRose
  );

});
