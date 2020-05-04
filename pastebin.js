function updateNeeds() {
    document.getElementById('energyDisplay').innerText = player.energy;
    document.getElementById('hungerDisplay').innerText = player.hunger;
    document.getElementById('thirstDisplay').innerText = player.thirst;
    document.getElementById('radiationDisplay').innerText = player.radiation;
    document.getElementById('scrapDisplay').innerText = player.scrap;
    document.getElementById('strengthDisplay').innerText = player.strength;
    document.getElementById('constitutionDisplay').innerText = player.constitution;
    document.getElementById('wisdomDisplay').innerText = player.wisdom;
    document.getElementById('dexterityDisplay').innerText = player.dexterity;
    document.getElementById('intelligenceDisplay').innerText = player.intelligence;
    document.getElementById('charismaDisplay').innerText = player.charisma;
}

function needsOneTick() {
    player.thirst -= 2;
    player.hunger -= 1;
    player.energy -= 10;
}

function needsTenTick() {
    player.thirst -= 20;
    player.hunger -= 10;
    player.energy -= 100;
}

function radiationOneTick() {
    let rng = Math.floor((Math.random() * 101) + player.wisdom);
    rng - player.totalStats;

    if (rng <= 25) {
        let radiationChange = Math.floor((Math.random() * 5) + 1 - player.constitution);

        if (radiationChange <= 0) {
            document.getElementById('historyLog2').innerText = " You endured the radiation.";

        } else {
            player.radiation += radiationChange;
            document.getElementById('historyLog2').innerText = " You have gained " + radiationChange + " Rads!";
            }

    } else {
        document.getElementById('historyLog2').innerText = " There was no radiation in the zone.";
    }
}

function radiationTenTick() {
    let rng = Math.floor((Math.random() * 101) + player.wisdom);
    rng - player.totalStats;

    if (rng <= 50) {
        let radiationChange = Math.floor((Math.random() * 50) + 1 - player.constitution);

        if (radiationChange <= 0) {
            document.getElementById('historyLog2').innerText = " You endured the radiation.";

        } else {
            player.radiation += radiationChange;
            document.getElementById('historyLog2').innerText = " You have gained " + radiationChange + " Rads!";
            }

    } else {
        document.getElementById('historyLog2').innerText = " There was no radiation in the zone.";
    }
}