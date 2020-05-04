var historyLog = '';

var player = new Object();
player.strength = 1;
player.constitution = 1;
player.wisdom = 1;
player.dexterity = 1;
player.charisma = 1;
player.intelligence = 1;
player.totalStats = player.strength + player.constitution + player.wisdom + player.dexterity + player.charisma + player.intelligence;
player.hunger = 100;
player.thirst = 100;
player.energy = 300;
player.radiation = 0;
player.scrap = 0;


function searchAction() {
    let tSRNG = Math.floor(Math.random() * player.totalStats);

    if (player.energy >= 10 && player.hunger >= 2 && player.thirst >= 1 && tSRNG == 0) {
        needsOneTick();
        document.getElementById('historyLog').innerText = 'You found nothing! You are a loser!';

    } else if (player.energy >= 10 && player.hunger >= 2 && player.thirst >= 1 && tSRNG >= 1) {
        player.scrap += tSRNG;
        needsOneTick();
        document.getElementById('historyLog').innerText = 'You found ' + tSRNG + ' scrap!';

    } else {
        document.getElementById('historyLog').innerText = 'You are too tired to do anything';
    }

    radiationOneTick();
    updateNeeds();
}

function drinkAction() {
    if (player.energy >= 10 && player.hunger >= 2 && player.scrap >= 5) {
        needsOneTick();
        player.scrap -= 5;
        player.thirst += 26;
        document.getElementById('historyLog').innerText = "You spent 25 scrap to buy Inca Kola at the El Tiburón. ";
        document.getElementById('historyLog2').innerText = 'The barkeeper yells "You have to spend money to make money!"';

    } else if (player.scrap <= 5){
        document.getElementById('historyLog').innerText = "You are tossed out of the bar. ";
        document.getElementById('historyLog2').innerText = "The bouncer sneers. 'Nothing's free!'";

    } else {
        document.getElementById('historyLog').innerText = "You're too tired to even go to the bar. ";
        document.getElementById('historyLog2').innerText = "People laugh at you while you stumble in a tired daze.";
    }

    updateNeeds();
}

function eatAction() {
    if (player.energy >= 10 && player.thirst >= 2 && player.scrap >= 10 ) {
        needsOneTick();
        player.scrap -= 10;        
        player.hunger += 27;        
        document.getElementById('historyLog').innerText = "You spent 50 scrap to buy a burrito at the El Tiburón. ";
        document.getElementById('historyLog2').innerText = 'The barkeeper yells "You have to spend money to make money!"';

    } else if (player.scrap <= 10) {
        document.getElementById('historyLog').innerText = "You are tossed out of the bar. ";
        document.getElementById('historyLog2').innerText = "The bouncer sneers. 'Nothing's free!'";

    } else {
        document.getElementById('historyLog').innerText = "You're too tired to even go to El Tiburón. ";
        document.getElementById('historyLog2').innerText = "People laugh at you while you stumble in a tired daze.";
    }

    updateNeeds();
}

function radAwayAction() {
    if (player.energy >= 100 && player.hunger>=2 && player.thirst >=1 && player.scrap >= 50) {
        needsOneTick();
        player.scrap -= 50;
        player.radiation -= 50;
        player.energy -= 90;
        document.getElementById('historyLog').innerText = "You spent 50 scrap for a whiff of Cura'Sal. ";
        document.getElementById('historyLog2').innerText = 'You feel nauseated and tired.';

    } else if (player.scrap <= 50) {
        document.getElementById('historyLog').innerText = "Banana Sauce does not provide free Cura'Sal. ";
        document.getElementById('historyLog2').innerText = "Make more money, you poor bastard.";

    } else {
        document.getElementById('historyLog').innerText = "Taking Cura'Sal under exhaustion may lead to comatose or heart failure. ";
        document.getElementById('historyLog2').innerText = "Just go to sleep and take it in the morning.";
    }

    updateNeeds();
}

function shaqShlepAction() {
    if (player.energy <= 0 && player.hunger >= 20 && player.thirst >= 10) {
        needsTenTick();
        player.energy = 300;
        document.getElementById('historyLog').innerText = "You find somewhere safe to sleep. ";
        
    } else if (player.hunger <= 20 && player.thirst <= 10) {
        document.getElementById('historyLog').innerText = "You are either too hangry or too thirsty to sleep. ";

    } else {
        document.getElementById('historyLog').innerText = "You're not sleepy enough! Work harder!"
    }

    updateNeeds();
}