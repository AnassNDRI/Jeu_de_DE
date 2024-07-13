
// Je déclare les variables pour garder les scores des deux joueurs, le score courant du tour, 
// le joueur actif et une variable pour savoir si le jeu est en cours.
let scores, currentScore, activePlayer, gamePlaying;

// J'appelle la fonction initGame pour initialiser le jeu au démarrage.
initGame();

// Je définis la fonction initGame qui initialise les variables et l'interface du jeu.
function initGame() {
    scores = [0, 0]; // Je mets les scores à 0 pour chaque joueur.
    currentScore = 0; // Je mets le score courant à 0.
    activePlayer = 1; // Je commence avec le joueur 1 comme actif.
    gamePlaying = true; // Je mets l'état du jeu à vrai, ce qui signifie que le jeu est en cours.

// Je réinitialise les scores sur l'interface du jeu.
    document.getElementById('score-1').textContent = '0';
    document.getElementById('score-2').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-2').textContent = '0';
    drawDice(1); // Je dessine un dé avec la face 1 au début du jeu.
    // J'ajoute des écouteurs d'événements pour réagir aux clics sur les boutons de l'interface.
    document.querySelector('.btn-roll').addEventListener('click', rollDice);
    document.querySelector('.btn-hold').addEventListener('click', holdScore);
    document.querySelector('.btn-new').addEventListener('click', initGame);
}

// Je définis la fonction rollDice qui est appelée quand le joueur lance le dé.
function rollDice() {
    if (!gamePlaying) return; // Je vérifie si le jeu est en cours.

    let dice = Math.floor(Math.random() * 6) + 1; // Je génère un nombre aléatoire pour le dé.
    drawDice(dice); // Je dessine le dé avec la valeur obtenue.

    // Si le dé ne montre pas 1, je mets à jour le score courant.
    if (dice !== 1) {
        currentScore += dice; // J'ajoute la valeur du dé au score courant.
        document.getElementById('current-' + activePlayer).textContent = currentScore;
    } else {
        switchPlayer(); // Si le dé montre 1, je passe la main au prochain joueur.
    }
}

// Je définis la fonction holdScore qui est appelée quand le joueur décide de "garder" son score courant.
function holdScore() {
    if (!gamePlaying) return;

  
    scores[activePlayer - 1] += currentScore;
    document.getElementById('score-' + activePlayer).textContent = scores[activePlayer - 1];
    if (scores[activePlayer - 1] >= 100) {  
        // J'affiche le joueur comme gagnant et je termine le jeu.
        document.getElementById('player-' + activePlayer).classList.add('winner');
        document.getElementById('name-' + activePlayer).textContent = 'Gagnant!';
        gamePlaying = false;
    } else {
        switchPlayer(); // Sinon, je passe la main au prochain joueur.
    }
}

// Je définis la fonction switchPlayer pour changer de joueur actif.
function switchPlayer() {
    currentScore = 0; // Je remets le score courant à 0.
    document.getElementById('current-' + activePlayer).textContent = '0';
    activePlayer = activePlayer === 1 ? 2 : 1;
    // Je change de joueur actif.
    // J'active visuellement le joueur actif sur l'interface.
    document.getElementById('player-1').classList.toggle('active');
    document.getElementById('player-2').classList.toggle('active');
    drawDice(1);  // Je réinitialise le dé pour le nouveau joueur.
}

// Je définis la fonction drawDice pour dessiner le dé sur le canvas.
function drawDice(diceValue) {
    let canvas = document.getElementById('diceCanvas');
    if (canvas.getContext) {
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Je nettoie le canvas pour le nouveau dessin.
        ctx.fillStyle = 'white';  // Je définis la couleur de fond du dé.
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Je dessine le fond du dé.

        
        ctx.fillStyle = '#e74c3c';
        let dotPositions = getDotPositions(diceValue);
        dotPositions.forEach(function(dot) {
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, 5, 0, Math.PI * 2, true); // Je dessine chaque point.
            ctx.fill();  // Je remplis les points avec la couleur rouge.
        });
    }
}

// Je définis la fonction getDotPositions pour obtenir les positions des points sur le dé.
function getDotPositions(diceValue) {
    let w = document.getElementById('diceCanvas').width;
    let h = document.getElementById('diceCanvas').height;
    let cx = w / 2; // Je calcule le centre du canvas en largeur.
    let cy = h / 2; // Je calcule le centre du canvas en hauteur.

    // Je définis un plan avec les positions des points pour chaque valeur du dé.
    let dotMap = {
         // Chaque clé correspond à une valeur du dé et contient un tableau de positions pour les points.
        1: [{x: cx, y: cy}],
        // et ainsi de suite pour les autres valeurs du dé...
        2: [{x: cx - 20, y: cy - 20}, {x: cx + 20, y: cy + 20}],
        3: [{x: cx - 20, y: cy - 20}, {x: cx, y: cy}, {x: cx + 20, y: cy + 20}],
        4: [{x: cx - 20, y: cy - 20}, {x: cx - 20, y: cy + 20}, {x: cx + 20, y: cy - 20}, {x: cx + 20, y: cy + 20}],
        5: [{x: cx - 20, y: cy - 20}, {x: cx - 20, y: cy + 20}, {x: cx, y: cy}, {x: cx + 20, y: cy - 20}, {x: cx + 20, y: cy + 20}],
        6: [{x: cx - 20, y: cy - 25}, {x: cx - 20, y: cy}, {x: cx - 20, y: cy + 25}, {x: cx + 20, y: cy - 25}, {x: cx + 20, y: cy}, {x: cx + 20, y: cy + 25}]
    };

    return dotMap[diceValue]; // Je renvoie les positions des points pour la valeur actuelle du dé.
}
