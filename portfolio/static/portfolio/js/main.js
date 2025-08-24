// portfolio/static/portfolio/js/main.js

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ main.js chargé avec succès");

  // === Canvas Matrix en arrière-plan ===
  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "-1"
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);

  // Icônes spéciales (basse fréquence)
  const specialIcons = ["💻", "🛡️", "🔒", "⚡", "🚀", "🖥️"];

  // Chaque colonne a un symbole fixe : 0, 1 ou rarement une icône
  const columnSymbols = Array.from({ length: columns }, () => {
    if (Math.random() < 0.08) {
      // 8% de colonnes seront une icône spéciale
      return specialIcons[Math.floor(Math.random() * specialIcons.length)];
    } else {
      // sinon 0 ou 1
      return Math.random() > 0.5 ? "1" : "0";
    }
  });

  // Position des gouttes
  const drops = Array(columns).fill(0);

  function drawMatrix() {
    // Fond sombre avec léger dégradé radial
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 100,
      canvas.width / 2, canvas.height / 2, canvas.width
    );
    gradient.addColorStop(0, "#001100");
    gradient.addColorStop(1, "#000000");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Style texte Matrix
    ctx.fillStyle = "#00ff00";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = columnSymbols[i]; // symbole stable par colonne
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i] += 0.2; // vitesse fluide
    }

    requestAnimationFrame(drawMatrix);
  }
  drawMatrix();

  // === Texte terminal en bas ===
  const hackerText = document.createElement("div");
  Object.assign(hackerText.style, {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    color: "#00ff00",
    fontFamily: "monospace",
    fontSize: "16px",
    textShadow: "0 0 8px #00ff00",
    pointerEvents: "none"
  });
  document.body.appendChild(hackerText);

  const messages = [
    "> Connexion établie.",
    "> Accès autorisé."
  ];
  let msgIndex = 0;
  let charIndex = 0;

  function typeWriter() {
    if (msgIndex < messages.length) {
      if (charIndex < messages[msgIndex].length) {
        hackerText.textContent += messages[msgIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 50);
      } else {
        setTimeout(() => {
          hackerText.textContent = "";
          charIndex = 0;
          msgIndex++;
          typeWriter();
        }, 2000);
      }
    } else {
      msgIndex = 0;
      typeWriter();
    }
  }
  typeWriter();

  // Resize dynamique
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
