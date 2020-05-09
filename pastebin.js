function updateUI() {
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

    document.getElementById('dayDisplay').innerText = currentDay;
    if (dayTracker < 10) {
        document.getElementById('dateDayDisplay').innerText = "0" + dayTracker;
    } else {
        document.getElementById('dateDayDisplay').innerText = dayTracker;
    }
    if (monthTracker < 10) {
        document.getElementById('dateMonthDisplay').innerText = "0" + monthTracker;
    } else {
        document.getElementById('dateMonthDisplay').innerText = monthTracker;
    }
        document.getElementById('dateYearDisplay').innerText = yearTracker;
    if (daysPassed == 0) {
        document.getElementById('daysPassed').innerText = "a few hours ";
    } else if (daysPassed == 1) {
        document.getElementById('daysPassed').innerText = daysPassed + " day ";
    } else {
        document.getElementById('daysPassed').innerText = daysPassed + "days ";
    }

}

function needsOneTick() {
    player.thirst -= 2;
    player.hunger -= 1;
    player.energy -= 10;
}

function timeTableTick() {
    hourTracker ++;
    if (hourTracker >= 24) {
        changeDay++;
        if (changeDay >= 6) {
            changeDay = 0;
        }
        currentDay = days[changeDay];

        dayTracker ++;
        if (dayTracker >= 30) {
            dayTracker = 1;
            monthTracker ++;
        }
  
        if (monthTracker >= 12) {
            monthTracker = 1;
            yearTracker ++;
        }

        daysPassed ++;
    
        training.strength = false;    
        training.constitution = false;
        training.wisdom = false;
        training.dexterity = false;
        training.intelligence = false;
        training.charisma = false; 
    }
}

function radiationOneTick() {
    let rnJesus = Math.floor((Math.random() * 101) + player.wisdom);
    rnJesus - player.totalStats;

    if (rnJesus <= 25) {
        let radiationChange = Math.floor((Math.random() * 5) + 1 - player.constitution);

        if (radiationChange <= 0) {
            document.getElementById('historyLog2').innerText = "Your body resisted any radiation";

        } else {
            player.radiation += radiationChange;
            document.getElementById('historyLog2').innerText = "You have gained " + radiationChange + " Rads!";
            }

    } else {
        document.getElementById('historyLog2').innerText = "There was no radiation in the zone.";
    }
}

function radiationTenTick() {
    let rnJesus = Math.floor((Math.random() * 101) + player.wisdom);
    rnJesus - player.totalStats;

    if (rnJesus <= 50) {
        let radiationChange = Math.floor((Math.random() * 50) + 1 - player.constitution);

        if (radiationChange <= 0) {
            document.getElementById('historyLog2').innerText = "Your body resisted any radiation.";

        } else {
            player.radiation += radiationChange;
            document.getElementById('historyLog2').innerText = "You have gained " + radiationChange + " Rads!";
            }

    } else {
        document.getElementById('historyLog2').innerText = "There was no radiation in the zone.";
    }
}

function setDailyPrices() {
    let tsRNJesus = Math.floor(Math.random() * ((player.luck + player.charisma + player.intelligence) / 3));
    var shopPrice = Math.floor(Math.random() * totalStats - tsRNJesus);
    var scavengePrice = Math.floor(Math.random() * (totalStats * 2));
}