const motsPendu = [
  "POMME",
  "BANANE",
  "ORANGE",
  "FRAISE",
  "CERISE",
  "ANANAS",
  "KIWI",
  "RAISIN",
  "PECHE",
  "MANGUE",
  "POIRE",
  "CITRON",
  "AVOCAT",
  "PASTEQUE",
  "BLEU",
  "ROUGE",
  "VERT",
  "JAUNE",
  "NOIR",
  "BLANC",
  "MARRON",
  "VIOLET",
  "OR",
  "ARGENT",
  "PLATANE",
  "OLIVIER",
  "TOMATE",
  "CAROTTE",
  "OIGNON",
  "COURGETTE",
  "AUBERGINE",
  "BROCOLI",
  "PATATE",
  "CONCOMBRE",
  "RADIS",
];

const body = document.querySelector("body");
const vieRestantes = document.querySelector("h2");
const imageMarguerite = document.querySelector(".images");
const h1 = document.querySelector("h1");
const motCacher = document.querySelector(".motCacher");
const lettresDevinees = [];
const boutonRestart = document.querySelector(".rejouer button ");
const boutonsClavier = document.querySelectorAll(".keyboard button");
const btnLettres = document.querySelectorAll(".lettre");
const verifier = document.querySelector("#faireProposition");

let resteVie = 7;
const totalvie = 7;

let dernierNombreAleatoire = -1;
let nombreAleatoire = -1;
let motADeviner = "";
let motDecoupe;

let motCache = "";
let motAffiche = "";

//  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function genererNombreAleatoire(max) {
  // on génère un nombre aléatoire
  return Math.floor(Math.random() * Math.floor(max));
}

function genererMot() {
  while (nombreAleatoire == dernierNombreAleatoire) {
    nombreAleatoire = genererNombreAleatoire(motsPendu.length);
  }
  dernierNombreAleatoire = nombreAleatoire;
  return motsPendu[nombreAleatoire];
}

function decouperMot(mot) {
  // on découpe le mot en lettres
  return mot.split("");
}

function creerMotCache() {
  motCacher.innerHTML = "";
  motDecoupe.forEach(() => {
    const span = document.createElement("span");
    span.className = "letter_word";
    span.textContent = " _";
    lettresDevinees.push(span);
    motCacher.appendChild(span);
  });
}

function afficheVie() {
  vieRestantes.textContent = "il vous reste " + resteVie + " essais";
}

function afficheImageMarguerite() {
  const indexImage = totalvie - resteVie;
  imageMarguerite.style.backgroundImage = `url("images/marguerite${indexImage}.png")`;
}

function afficherLettresTrouvees(letter) {
  motDecoupe.forEach((lettre, index) => {
    if (letter == lettre) {
      lettresDevinees[index].textContent = lettre;
    }
  });
}

function motEstTrouve() {
  return motCacher.textContent.includes("_") === false;
}

function proposerMot() {
  verifier.addEventListener("click", function () {
    const motPropose = prompt("Proposer un mot");
    if (motPropose.toUpperCase() === motADeviner) {
      afficherMessageWin();
      afficherImageWin();
    } else {
      afficherMessageLose();
    }
  });
}

function afficherStatut(message, color) {
  h1.textContent = message;
  h1.style.color = color;
}

function afficherMessageWin() {
  afficherStatut("Vous avez gagné !", "green");
  vieRestantes.style.display = "none";
  motCacher.classList.add("motTrouver");
}

function afficherMessageLose() {
  afficherStatut("Vous avez perdu !", "red");
}

function afficherImageWin() {
  body.style.backgroundImage = `url('images/gameWin.png')`;
  body.classList.add("gameWin");
  imageMarguerite.style.display = "none";
  verifier.disabled = true;
  boutonsClavier.forEach((button) => {
    button.disabled = true;
  });
}

function reactiverBoutonsLettres() {
  // on réactive les boutons du clavier
  boutonsClavier.forEach((button) => {});
}

function nouveauJeu() {
  // on réinitialise le jeu
  motADeviner = genererMot();
  console.log(motADeviner);
  motDecoupe = decouperMot(motADeviner);
  resteVie = totalvie;
  reactiverBoutonsLettres();
  afficherStatut("Jeu de la marguerite", "black");
  creerMotCache();
  afficheVie();
  afficherLettresTrouvees();
  proposerMot();
}

function initalisationApp() {
  boutonsClavier.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      if (resteVie <= 0) {
        return;
      }
      const letter = bouton.textContent;

      if (motDecoupe.includes(letter)) {
        // bonne lettre trouvé par le joueur
        bouton.disabled = true;
        afficherLettresTrouvees(letter);
        if (motEstTrouve()) {
          afficherMessageWin();
          afficherImageWin();
        }
      } else {
        // mauvaise lettre trouvé par le joueur (on affiche l'image) et on enlève une vie
        resteVie--;
        bouton.disabled = true;
        afficheVie();
        afficheImageMarguerite();
        if (resteVie === 0) {
          afficherMessageLose();
        }
      }
    });
  });
}

boutonRestart.addEventListener("click", function () {
  // on réinitialise le jeu
  nouveauJeu();
  location.reload();
});

initalisationApp();
nouveauJeu();
