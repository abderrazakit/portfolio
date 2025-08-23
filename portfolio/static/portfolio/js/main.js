// portfolio/static/portfolio/js/main.js

document.addEventListener("DOMContentLoaded", function () {
  console.log("main.js chargé ✅");

  // 🎨 Couleurs "hacker"
  const colors = ["#00ff00", "#0f0", "#33ff33", "#66ff66", "#99ff99"];

  // 🌌 Effet gradient animé au lieu d'un simple fond uni
  let gradientStep = 0;
  setInterval(() => {
    gradientStep += 0.02;
    const c1 = colors[Math.floor(Math.random() * colors.length)];
    const c2 = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = `radial-gradient(circle at 50% 50%, ${c1}, ${c2}, #000)`;
    document.body.style.transition = "background 1.5s ease-in-out";
  }, 2500);

  // 🖥️ Texte style "terminal hacker"
  const hackerText = document.createElement("div");
  hackerText.style.position = "fixed";
  hackerText.style.bottom = "20px";
  hackerText.style.left = "20px";
  hackerText.style.color = "#00ff00";
  hackerText.style.fontFamily = "monospace";
  hackerText.style.fontSize = "18px";
  hackerText.style.textShadow = "0 0 10px #00ff00";
  hackerText.style.pointerEvents = "none"; // ne bloque pas les clics
  document.body.appendChild(hackerText);

  // ⌨️ Animation effet "typing"
  const messages = [
    "> Accès autorisé. Bienvenue 😉"
  ];

  let msgIndex = 0;
  let charIndex = 0;

  function typeWriter() {
    if (msgIndex < messages.length) {
      if (charIndex < messages[msgIndex].length) {
        hackerText.textContent += messages[msgIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 60);
      } else {
        // Attendre un peu avant le prochain message
        setTimeout(() => {
          hackerText.textContent = "";
          charIndex = 0;
          msgIndex++;
          typeWriter();
        }, 1500);
      }
    } else {
      msgIndex = 0; // 🔄 boucle infinie
      typeWriter();
    }
  }

  typeWriter();
});
