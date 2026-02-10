// hud.js

function createHealthDisplay() {
  const p = document.createElement('p');
  p.setAttribute('style', 'color: red; font-size:28px; position: fixed;');
  p.textContent = 'HEALTH: 0';
  document.body.appendChild(p);
  return p;
}

function updateHealthDisplay(element, health) {
  element.textContent = 'HEALTH: ' + health;
}
