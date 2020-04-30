//Halp. I ar shlep deprive
var moneyTotal = 0;
var historyLog = ''

// Placeholder stats til we figure out something
var strength = 1;
var perception = 1;
var endurance = 1;
var charisma = 1;
var intelligence = 1;
var agility = 1;
var luck = 1;
var totalSpecial = strength + perception + endurance + charisma + intelligence + agility + luck;
var thirst = 100;
var hunger = 100;
var energy = 300;
var radiationTotal = 0;

function searchAction() {
    let totalSpecialRNG = Math.floor(Math.random() * totalSpecial);    

    if (totalSpecialRNG == 0 && energy >= 10 && hunger >= 2 && thirst >= 1) {
        thirst -= 1;
        hunger -= 2;
        energy -= 10;
        document.getElementById('historyLog').innerText = 'You found nothing! You are a loser!';
    } else if (totalSpecialRNG >= 1 && energy >= 10 && hunger >= 2 && thirst >= 1) {
        moneyTotal += totalSpecialRNG;
        thirst -= 1;
        hunger -= 2;
        energy -= 10;
        updateShit();
        document.getElementById('historyLog').innerText = 'You found ' + totalSpecialRNG + ' scrap!';
    } else {
        document.getElementById('historyLog').innerText = 'You are too tired to do anything';
    }

    // Radiation Ticks - Works regardless of energy
    let rng = Math.floor((Math.random() * 101) + luck);
    rng - totalSpecial;

    if (rng <= 25) {
        let radiationChange = Math.floor((Math.random() * 5) + 1 - endurance);

        // If Endurance negates Radiation, flex.
        if (radiationChange <= 0) {
            updateShit();
            document.getElementById('historyLog2').innerText = " It was nothing your Endurance couldn't handle.";

        } else {
            radiationTotal += radiationChange;
            updateShit();
            document.getElementById('historyLog2').innerText = " You have gained " + radiationChange + " Rads!";
            }

    } else {
        document.getElementById('historyLog2').innerText = " The area is safe.";
    }
}

function drinkAction() {
    if (moneyTotal >= 25) {
        moneyTotal -= 25;
        thirst += 25;
        energy -= 10
        updateShit();
        document.getElementById('historyLog').innerText = "You spent 25 scrap to buy Inca Kola at the El Tiburón. ";
        document.getElementById('historyLog2').innerText = 'The barkeeper yells "You have to spend money to make money!"';
    } else {
        document.getElementById('historyLog').innerText = "You are tossed out of the bar. ";
        document.getElementById('historyLog2').innerText = "The bouncer sneers. 'Nothing's free!'";
    }
}

function eatAction() {
    if (moneyTotal >= 50 && thirst >= 1) {
        moneyTotal -= 50;
        hunger += 25;
        energy -= 10;
        thirst -= 1;
        updateShit();
        document.getElementById('historyLog').innerText = "You spent 50 scrap to buy a burrito at the El Tiburón. ";
        document.getElementById('historyLog2').innerText = 'The barkeeper yells "You have to spend money to make money!"';
    } else {
        document.getElementById('historyLog').innerText = "You are tossed out of the bar. ";
        document.getElementById('historyLog2').innerText = "The bouncer sneers. 'Nothing's free!'";
    }
}

function radAwayAction() {
    if (moneyTotal >= 100 && hunger >= 2 && thirst >=1 ) {
        moneyTotal -= 100;
        radiationTotal -= 50;
        energy -= 100;
        hunger -= 2;
        thirst -= 1;
        updateShit();
        document.getElementById('historyLog').innerText = "You spent 100 scrap for a whiff of Cura'Sal. ";
        document.getElementById('historyLog2').innerText = 'You feel nauseated and tired.';
    } else {
        document.getElementById('historyLog').innerText = "Banana Sauce does not provide free Cura'Sal. ";
        document.getElementById('historyLog2').innerText = "Make more money, you poor bastard.";
    }
}

function shaqShlepAction() {
    if (hunger >= 20 && thirst >= 10) {
        energy = 300;
        hunger -= 20;
        thirst -= 10;
        updateShit();
        document.getElementById('historyLog').innerText = "You find somewhere safe to sleep. ";
    } else {
        document.getElementById('historyLog').innerText = "You are either too hangry or too thirsty to sleep. ";
    }

    let rng = Math.floor((Math.random() * 101) + luck);
    rng - totalSpecial;

    if (rng <= 50) {
        let radiationChange = Math.floor((Math.random() * 5) + 1 - endurance);

        // If Endurance negates Radiation, flex.
        if (radiationChange <= 0) {
            updateShit();
            document.getElementById('historyLog2').innerText = "It was nothing your Endurance couldn't handle.";

        } else {
            radiationTotal += radiationChange;
            updateShit();
            document.getElementById('historyLog2').innerText = " You have gained " + radiationChange + " Rads!";
            }
    }
}

function updateShit() {
    document.getElementById('energyTotalDisplay').value = energy;
    document.getElementById('energyTotalDisplay').innerText = energy;
    document.getElementById('hungerTotalDisplay').value = hunger;
    document.getElementById('hungerTotalDisplay').innerText = hunger;
    document.getElementById('thirstTotalDisplay').value = thirst;
    document.getElementById('thirstTotalDisplay').innerText = thirst;
    document.getElementById('radiationTotalDisplay').value = radiationTotal;
    document.getElementById('radiationTotalDisplay').innerText = radiationTotal;
    document.getElementById('moneyTotalDisplay').value = moneyTotal;
    document.getElementById('moneyTotalDisplay').innerText = moneyTotal;
}