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

    if (dateTracker.dayTracker < 10) {
        document.getElementById('dateDayDisplay').innerText = "0" + dateTracker.dayTracker;

    } else {
        document.getElementById('dateDayDisplay').innerText = dateTracker.dayTracker;

    }
    if (dateTracker.monthTracker < 10) {
        document.getElementById('dateMonthDisplay').innerText = "0" + dateTracker.monthTracker;

    } else {
        document.getElementById('dateMonthDisplay').innerText = dateTracker.monthTracker;

    }
        document.getElementById('dateYearDisplay').innerText = dateTracker.yearTracker;

    if (dateTracker.daysPassed == 0) {
        document.getElementById('daysPassed').innerText = "a few hours ";

    } else if (dateTracker.daysPassed == 1) {
        document.getElementById('daysPassed').innerText = dateTracker.daysPassed + " day ";
        
    } else {
        document.getElementById('daysPassed').innerText = dateTracker.daysPassed + " days ";
    }

    totalStats = player.strength + player.constitution + player.wisdom + player.dexterity + player.charisma + player.intelligence;
    totalThirst = 90 + (player.constitution * 10);
    totalHunger = 95 + (player.constitution * 5);
    totalEnergy = 280 + (player.constitution * 20);

    console.log(dateTracker.hourTracker);
}

function needsOneTick() {
    player.thirst -= 2;
    player.hunger -= 1;
    player.energy -= 10;
}

function timeTableTick() {
    dateTracker.hourTracker ++;
    if (dateTracker.hourTracker >= 24) {
        setDailyPrices();
        dateTracker.hourTracker = 0;
        dateTracker.changeDay++;
        if (dateTracker.changeDay >= 6) {
            dateTracker.changeDay = 0;
        }
        currentDay = days[dateTracker.changeDay];

        dateTracker.dayTracker ++;
        if (dateTracker.dayTracker >= 30) {
            dateTracker.dayTracker = 1;
            dateTracker.monthTracker ++;
        }
  
        if (dateTracker.monthTracker >= 12) {
            dateTracker.monthTracker = 1;
            dateTracker.yearTracker ++;
        }

        dateTracker.daysPassed ++;
    
        training.strength = false;    
        training.constitution = false;
        training.wisdom = false;
        training.dexterity = false;
        training.intelligence = false;
        training.charisma = false; 
    }
}

function radiationOneTick() {
    rnJesus = Math.floor((Math.random() * 101) + player.wisdom);
    rnJesus - player.totalStats;

    if (rnJesus <= 25) {
        radiationChange = Math.floor((Math.random() * 5) + 1 - player.constitution);

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

// shopPrice = (1 to totalStats) - (player.cha/int/wis)
// scavengePrice = (1 to totalStats * 2)
function setDailyPrices() {
    let rnJesus = (player.wisdom + player.charisma + player.intelligence);
    shopPrice = Math.floor(Math.random() * (totalStats - rnJesus)) + 1;
    
    rnJesus = totalStats * 2;
    scavengePrice = Math.floor(Math.random() * rnJesus) + 1;
}