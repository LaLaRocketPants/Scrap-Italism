//Updates the UI elements like Stats and Needs, checks for Time.
function updateUI() {
    document.getElementById('energyDisplay').innerText = player.energy;
    document.getElementById('hungerDisplay').innerText = player.hunger;
    document.getElementById('thirstDisplay').innerText = player.thirst;
    document.getElementById('radiationDisplay').innerText = player.radiation;
    document.getElementById('scrapDisplay').innerText = player.scrap;

    //The player does not get to see their luck stat.
    document.getElementById('strengthDisplay').innerText = player.strength;
    document.getElementById('constitutionDisplay').innerText = player.constitution;
    document.getElementById('wisdomDisplay').innerText = player.wisdom;
    document.getElementById('dexterityDisplay').innerText = player.dexterity;
    document.getElementById('intelligenceDisplay').innerText = player.intelligence;
    document.getElementById('charismaDisplay').innerText = player.charisma;

    document.getElementById('rationsCount').innerText = player.inventory["Rations"];

    document.getElementById('dayDisplay').innerText = currentDay;

    //Checks for double digits in the day
    if (dateTracker.dayTracker < 10) {
        document.getElementById('dateDayDisplay').innerText = "0" + dateTracker.dayTracker;

    } else {
        document.getElementById('dateDayDisplay').innerText = dateTracker.dayTracker;

    }

    //Checks for double digits in month
    if (dateTracker.monthTracker < 10) {
        document.getElementById('dateMonthDisplay').innerText = "0" + dateTracker.monthTracker;

    } else {
        document.getElementById('dateMonthDisplay').innerText = dateTracker.monthTracker;

    }
        
        document.getElementById('dateYearDisplay').innerText = dateTracker.yearTracker;

    //Prevents '0 days has passed since you arrived'
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

    console.log(player.luck);
}

function needsOneTick() {
    player.thirst -= 2;
    player.hunger -= 1;
    player.energy -= 10;
}

//Passes one hour and updates day, month, and year
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
    
        //Once new day has happened, training of stats can be restarted
        training.strength = false;    
        training.constitution = false;
        training.wisdom = false;
        training.dexterity = false;
        training.intelligence = false;
        training.charisma = false; 
        training.luck = false;
    }
}

function radiationOneTick() {
    rnJesus = Math.floor((Math.random() * 100) + totalStats);

    if (rnJesus <= 25) {
        radiationChange = (Math.floor((Math.random() * totalStats)) + (1 - player.constitution));

        if (radiationChange <= 0) {
            document.getElementById('historyLog2').innerText = "Your body resisted any radiation";

        } else {
            player.radiation += radiationChange;
            document.getElementById('historyLog2').innerText = "You have gained " + radiationChange + " Rads!";
            }

    } else {
        document.getElementById('historyLog2').innerText = "There was no radiation in the zone.";
    }

    if (player.radiation <= 250) {
        document.getElementById('historyLog3').innerText = 'You are healthy.';
    } else if (player.radiation >= 251 && player.radiation <= 500) {
        document.getElementById('historyLog3').innerText = 'Rashes are developing on your skin.';
    } else if (player.radiation >= 501 && player.radiation <= 750) {
        document.getElementById('historyLog3').innerText = 'You are dying.';
    } else if (player.radiation >= 751 && player.radiation <= 1000) {
        document.getElementById('historyLog3').innerText = 'Buy some Cura-Sal before its too late.';
    }
}

// shopPrice = (1 to totalStats) - (player.cha/int/wis)
// scavengePrice = (1 to totalStats * 2)
function setDailyPrices() {
    shopPrice = ((Math.floor(Math.random() * 3)) + totalStats) - (player.charisma + player.luck);
    if (shopPrice < 1) {
        shopPrice = 1;
    }
    
    rnJesus = totalStats * 2;
    scavengePrice = Math.floor(Math.random() * rnJesus) + 1;
}
