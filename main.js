var player = {
    strength: 1,
    constitution: 1,
    wisdom: 1,
    dexterity: 1,
    charisma: 1,
    intelligence: 1,
    luck: 1,
    health: 100,
    actionPoints: 2,

    hunger: 100,
    thirst: 100,
    energy: 300,
    radiation: 0,
    scrap: 0,

    inventory: {
        "Rations": 5,
    },

    inCombat: false,
}
var totalStats = player.strength + player.constitution + player.wisdom + player.dexterity + player.charisma + player.intelligence + player.luck;
var totalThirst = 90 + (player.constitution * 10);
var totalHunger = 95 + (player.constitution * 5);
var totalEnergy = 280 + (player.constitution * 20);
var totalHealth = 95 + (player.constitution * 5);
var actionPoints = 2 + (Math.floor(player.dexterity + player.constitution / 5))


//Tracks stat training success for the day. One success for each stat per day.
var training = {
    strength: false,
    constitution: false,
    wisdom: false,
    dexterity: false,
    intelligence: false,
    charisma: false,
    statBalance: 0
}

var days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

var dateTracker = {
    changeDay: 0,
    hourTracker: 0,
    dayTracker: 29,
    monthTracker: 2,
    yearTracker: 2302,
    daysPassed: 0
}

var currentDay = days[dateTracker.changeDay];

//Variables for setting RNG, changes on sleepAction()
//Sets how much scrap is used for each point of thirst and hunger
var shopPrice = 1;
//Sets the maximum possible scrap for scavenging the ruins
var scavengePrice = 10;

//Praying to rnJesus
var rnJesus = 0;
var rnJesus2 = 0;

function action1() {
    // rnJesus = ((player.strength + player.constitution + player.wisdom + player.dexterity + player.charisma + player.intelligence - 6) * 2) - (player.luck * 3);
    // rnJesus2 = Math.floor(Math.random() * (100 + rnJesus));
    // if (rnJesus2 >= 50) {
    //     player.inCombat = true;
    //     mortalCombat();
    // }

    //action1() Scavenge the Ruins.
    //Look for scrap with gains depending on the daily scavengePrice and totalStat sum, with a chance of finding rations
    if (player.inCombat === false) {
        rnJesus = Math.floor(Math.random() * (totalStats * scavengePrice));

        if (player.energy >= 50 && player.hunger >= 5 && player.thirst >= 10) {
            if (rnJesus === 0) {
                document.getElementById('historyLog').innerText = 'You found nothing! You are a loser! ';

            } else {
                player.scrap += rnJesus;
                rnJesus2 = (Math.floor(Math.random() * totalStats)) / player.luck;

                if (rnJesus2 <= (totalStats / 2)) {
                    document.getElementById('historyLog').innerText = 'You found ' + rnJesus + ' scrap! ';

                } else {
                    player.inventory["Rations"]++;

                    document.getElementById('historyLog').innerText = 'You found ' + rnJesus + ' scrap and some Old World Rations!';
                }
            }

            //Calls 5 needsOneTick five times
            for (let tickCounter = 1; tickCounter <= 5; tickCounter++) needsOneTick(tickCounter);
            radiationOneTick();
            timeTableTick();

        } else {
            document.getElementById('historyLog').innerText = 'You are too tired to do anything. ';
        }
    }

    updateUI();
}


function action2() {

    //Checks for the shopPrice variable so the player can know how much scrap he's spending on his currentDay. (Every day has a different shopPrice, check 'action7() sleep' )
    if (player.inCombat === false) {
        document.getElementById('historyLog').innerText = "You overhear some of the locals say the prices are " + shopPrice + "x the original price.";
        document.getElementById('historyLog2').innerText = "";
    }
}

//Use 2 scrap for each point of Thirst and 1 scrap for each point of Hunger restored to max, multiplied by the daily shopPrice
function action3() {
    if (player.inCombat === false) {
        if (player.energy >= 10) {
            if (player.hunger < totalHunger || player.thirst < totalThirst) {
                needsOneTick();
                rnJesus = ((totalThirst - player.thirst - 2) + (totalHunger - player.hunger - 1)) * shopPrice;
                if (player.scrap >= rnJesus) {
                    player.scrap -= rnJesus;
                    player.hunger = totalHunger;
                    player.thirst = totalThirst;

                    timeTableTick();

                    document.getElementById('historyLog').innerText = "You eat with the Rangers. ";
                    document.getElementById('historyLog2').innerText = "You paid " + rnJesus + " scrap in exchange.";
                } else {
                    player.hunger += 1;
                    player.thirst += 2;
                    player.energy += 10;

                    document.getElementById('historyLog').innerText = "You're stopped by a member of the Rangers. ";
                    document.getElementById('historyLog2').innerText = "'As much as we'd like to help you, we don't have the luxury of charity.";
                }
            } else {
                document.getElementById('historyLog').innerText = "You're not even remotely hunger or thirsty. ";
                document.getElementById('historyLog2').innerText = "";
            }
        } else {
            document.getElementById('historyLog').innerText = "You're too tired to deal, let alone think about food or thirst.";
            document.getElementById('historyLog2').innerText = "";
        }
    }
    
    updateUI();
}

//Use 200 * shopPrice to increase energy, hunger, and thirst, allowing more actions without sleeping.
function action4() {
    if (player.inCombat === false) {
        rnJesus = shopPrice * 200;
        if (player.scrap >= rnJesus) {
            player.energy += 100;
            player.hunger += 40;
            player.thirst += 20;
            player.scrap -= rnJesus;

            timeTableTick();

            document.getElementById('historyLog').innerText = "You spend " + rnJesus + " caps to dine at the extravagant Gourmet. The food was exquisite and you feel charged.";
            document.getElementById('historyLog2').innerText = "";

        } else {
            document.getElementById('historyLog').innerText = 'The guards brandish their spears at you. ';
            document.getElementById('historyLog2').innerText = " 'This is the Gourmet. And you can't afford it.'";
        }
    }

    updateUI();
}

//Get rid of Radiation
function action5() {
    if (player.inCombat === false) {
        rnJesus = shopPrice * 50;
        if (player.energy >= 100 && player.hunger >= 2 && player.thirst >= 1 && player.scrap >= rnJesus) {
            needsOneTick();
            player.scrap -= rnJesus;
            player.radiation -= 50;
            if (player.radiation <= 0) {
                player.radiation = 0;
            }
            player.energy -= 90;

            timeTableTick();

            document.getElementById('historyLog').innerText = "You spent 50 scrap for a whiff of Cura'Sal. ";
            document.getElementById('historyLog2').innerText = 'You feel nauseated and tired.';

        } else if (player.scrap <= 50) {
            document.getElementById('historyLog').innerText = "Banana Sauce does not provide free Cura'Sal. ";
            document.getElementById('historyLog2').innerText = "Make more money, you poor bastard.";

        } else {
            document.getElementById('historyLog').innerText = "Taking Cura'Sal under exhaustion may lead to comatose or heart failure. ";
            document.getElementById('historyLog2').innerText = "Just go to sleep and take it in the morning.";
        }
    }
    updateUI();
}

//Spend Rations found from Scavenging the Ruins (action1) to increase Thirst and Hunger
function action6() {
    if (player.inCombat === false) {
        if (player.hunger <= totalHunger && player.thirst <= totalThirst) {
            if (player.inventory["Rations"] >= 1) {
                player.inventory["Rations"]--;
                player.thirst += 20;
                player.hunger += 10;

                document.getElementById('historyLog').innerText = "You ate some Rations. ";
                if (player.inventory["Rations"] === 0) {
                    document.getElementById('historyLog2').innerText = "That was your last one.";

                } else if (player.inventory["Rations"] === 1) {
                    document.getElementById('historyLog2').innerText = "You have 1 Ration left.";

                } else {
                    document.getElementById('historyLog2').innerText = "You have " + player.inventory["Rations"] + " Rations left.";
                }

            } else {
                document.getElementById('historyLog').innerText = "You don't have any Rations.";
                document.getElementById('historyLog2').innerText = "";
            }

        } else {
            if (player.inventory["Rations"] === 0) {
                document.getElementById('historyLog2').innerText = "You have no Rations.";

            } else if (player.inventory["Rations"] === 1) {
                document.getElementById('historyLog2').innerText = "You have 1 Ration left.";

            } else {
                document.getElementById('historyLog2').innerText = "You have " + player.inventory["Rations"] + " Rations left.";
            }

            document.getElementById('historyLog').innerText = "You aren't thirsty or hungry enough. ";
        }
    }

    updateUI();
}

//Sleep action. Consumes 20 thirst, 10 hunger.
function action7() {
    if (player.inCombat === false) {
        if (player.energy <= 50 && player.hunger >= 10 && player.thirst >= 20) {
            for (let tickCounter = 1; tickCounter <= 10; tickCounter++) needsOneTick(tickCounter);
            for (let tickCounter = 1; tickCounter <= 6; tickCounter++) timeTableTick(tickCounter);

            player.energy = totalEnergy;

            document.getElementById('historyLog').innerText = "You find somewhere safe to sleep. ";
            document.getElementById('historyLog2').innerText = "";

        } else if (player.hunger <= 10 || player.thirst <= 20) {
            document.getElementById('historyLog').innerText = "You are either too hangry or too thirsty to sleep. ";
            document.getElementById('historyLog2').innerText = "";

        } else {
            document.getElementById('historyLog').innerText = "You're not sleepy enough! Work harder!";
            document.getElementById('historyLog2').innerText = "";
        }
    }
    updateUI();
}


function skill1() {

    // Stat Increase. Chance of success is "(0 to max strength) + (failure count)/(max strength)"
    // 2 strength with 1 failure is "((0 to 2) + 1)/(2)"
    // If quotient is higher than dividend, succeed.
    if (player.inCombat === false) {
        if (player.energy >= 100 && player.hunger >= 10 && player.thirst >= 20 && training.strength == false) {
            rnJesus = Math.floor(Math.random() * player.strength) + training.statBalance;

            if (rnJesus >= player.strength) {
                player.strength++;
                training.strength = true;
                training.statBalance = 0;

                document.getElementById('historyLog').innerText = "After a good workout, you feel sore. ";
                document.getElementById('historyLog2').innerText = "";

            } else {
                training.statBalance++;

                document.getElementById('historyLog').innerText = "You feel like you could use a better workout. ";
                document.getElementById('historyLog2').innerText = "";
            }

            for (let tickCounter = 1; tickCounter <= 10; tickCounter++) needsOneTick(tickCounter);
            timeTableTick();

        } else {
            document.getElementById('historyLog').innerText = "You're too tired to do some heavy lifting.";
            document.getElementById('historyLog2').innerText = "";
        }
    }

    updateUI();
}

function skill2() {
    if (player.inCombat === false) {
        if (player.energy >= 100 && player.hunger >= 10 && player.thirst >= 20 && training.constitution == false) {
            rnJesus = Math.floor(Math.random() * player.constitution) + training.statBalance;

            if (rnJesus >= player.constitution) {
                player.constitution++;
                training.constitution = true;
                training.statBalance = 0;

                document.getElementById('historyLog').innerText = "After a good workout, you feel sore. ";
                document.getElementById('historyLog2').innerText = "";

            } else {
                training.statBalance++;

                document.getElementById('historyLog').innerText = "You feel like you could use a better workout. ";
                document.getElementById('historyLog2').innerText = "";
            }

            for (let tickCounter = 1; tickCounter <= 10; tickCounter++) needsOneTick(tickCounter);
            timeTableTick();

        } else {
            document.getElementById('historyLog').innerText = "You're too tired to do go running.";
            document.getElementById('historyLog2').innerText = "";
        }
    }

    updateUI();
}

function skill3() {
    if (player.inCombat === false) {
        if (player.energy >= 100 && player.hunger >= 10 && player.thirst >= 20 && training.wisdom == false) {
            rnJesus = Math.floor(Math.random() * player.wisdom) + training.statBalance;

            if (rnJesus >= player.wisdom) {
                player.wisdom++;
                training.wisdom = true;
                training.statBalance = 0;

                document.getElementById('historyLog').innerText = "You successfully created something new! ";
                document.getElementById('historyLog2').innerText = ""

            } else {
                training.statBalance++;

                document.getElementById('historyLog').innerText = "You didn't reach a breakthrough. ";
                document.getElementById('historyLog2').innerText = "";
            }

            for (let tickCounter = 1; tickCounter <= 10; tickCounter++) needsOneTick(tickCounter);
            timeTableTick();

        } else {
            document.getElementById('historyLog').innerText = "You're too tired to create something.";
            document.getElementById('historyLog2').innerText = "";
        }
    }

    updateUI();
}

function skill4() {
    if (player.inCombat === false) {
        if (player.energy >= 100 && player.hunger >= 10 && player.thirst >= 20 && training.dexterity == false) {
            rnJesus = Math.floor(Math.random() * player.dexterity) + training.statBalance;

            if (rnJesus >= player.dexterity) {
                player.dexterity++;
                training.dexterity = true;
                training.statBalance = 0;

                document.getElementById('historyLog').innerText = "You successfully created something new! ";
                document.getElementById('historyLog2').innerText = "";

            } else {
                training.statBalance++;

                document.getElementById('historyLog').innerText = "You broke it. ";
                document.getElementById('historyLog2').innerText = "";
            }

            for (let tickCounter = 1; tickCounter <= 10; tickCounter++) needsOneTick(tickCounter);
            timeTableTick();

        } else {
            document.getElementById('historyLog').innerText = "You're too tired to create something.";
            document.getElementById('historyLog2').innerText = "";
        }
    }

    updateUI();
}

function skill5() {
    if (player.inCombat === false) {
        if (player.energy >= 100 && player.hunger >= 10 && player.thirst >= 20 && training.intelligence == false) {
            rnJesus = Math.floor(Math.random() * player.intelligence) + training.statBalance;

            if (rnJesus >= player.intelligence) {
                player.intelligence++;
                training.intelligence = true;
                training.statBalance = 0;

                document.getElementById('historyLog').innerText = "You successfully created something new! ";
                document.getElementById('historyLog2').innerText = "";
            } else {
                training.statBalance++;

                document.getElementById('historyLog').innerText = "You didn't reach a breakthrough. ";
                document.getElementById('historyLog2').innerText = "";
            }

            for (let tickCounter = 1; tickCounter <= 10; tickCounter++) needsOneTick(tickCounter);
            timeTableTick();

        } else {
            document.getElementById('historyLog').innerText = "You're too tired to create something.";
            document.getElementById('historyLog2').innerText = "";
        }
    }

    updateUI();
}

function skill6() {
    if (player.inCombat === false) {
        if (player.energy >= 100 && player.hunger >= 10 && player.thirst >= 20 && training.charisma == false) {
            rnJesus = Math.floor(Math.random() * player.charisma) + training.statBalance;

            if (rnJesus >= player.charisma) {
                player.charisma++
                training.charisma = true;
                training.statBalance = 0;

                document.getElementById('historyLog').innerText = "You successfully created something new! ";
                document.getElementById('historyLog2').innerText = "";

            } else {
                training.statBalance++;

                document.getElementById('historyLog').innerText = "You didn't reach a breakthrough. ";
                document.getElementById('historyLog2').innerText = "";
            }

            for (let tickCounter = 1; tickCounter <= 10; tickCounter++) needsOneTick(tickCounter);
            timeTableTick();

        } else {
            document.getElementById('historyLog').innerText = "You're too tired to create something.";
            document.getElementById('historyLog2').innerText = "";
        }
    }

    updateUI();

}

function skill7() {
    if (player.inCombat === false) {


        rnJesus = (player.luck * 5) + 5;
        if (player.energy >= 10 && player.hunger >= 1 && player.thirst >= 2 && player.scrap >= rnJesus) {

            //
            rnJesus = (Math.floor(Math.random() * player.luck)) + 1;
            rnJesus2 = Math.floor(Math.random() * 100) - rnJesus;

            if (rnJesus2 <= 25) {
                rnJesus = (Math.floor(Math.random() * (player.luck * 25))) + 25;
                player.scrap += rnJesus;

                document.getElementById('historyLog').innerText = "You won the Jackpot: " + rnJesus + " scrap!";
                document.getElementById('historyLog2').innerText = "";

            } else {
                rnJesus = Math.floor(Math.random() * (player.luck * 5)) + 5;
                player.scrap -= rnJesus;

                document.getElementById('historyLog').innerText = "You lost " + rnJesus + " scrap!";
                document.getElementById('historyLog2').innerText = "";
            }

            rnJesus = Math.floor(Math.random() * player.luck);

            if (rnJesus >= player.luck && training.luck === true) {
                player.luck++
                training.luck = true;
            }

            timeTableTick();
            needsOneTick();

        } else if (player.energy < 10 || player.hunger < 1 || player.thirst < 2) {
            document.getElementById('historyLog').innerText = "You're too tired to go to the 'casino'. ";
            document.getElementById('historyLog2').innerText = "Gambling addict.";

        } else {
            document.getElementById('historyLog').innerText = "You don't have enough scrap to enjoy your time at the 'casino' ";
            document.getElementById('historyLog2').innerText = "";
        }
    }


    updateUI();

}

function saveGame() {
    var saveFile = {
        player1: player,
        training1: training,
        dateTracker1: dateTracker,
        inventory1: player.inventory
    }
    localStorage.setItem("saveFile", JSON.stringify(saveFile));

    document.getElementById('historyLog').innerText = "The game has been saved";
    document.getElementById('historyLog2').innerText = ""

}

function loadGame() {
    var loadFile = JSON.parse(localStorage.getItem("saveFile"));

    player = loadFile.player1;
    player.inventory = loadFile.inventory1;
    training = loadFile.training1;
    changeDay = loadFile.changeDay1;
    updateUI();

    document.getElementById('historyLog').innerText = "The game has been loaded";
    document.getElementById('historyLog2').innerText = ""
}

//Code Testing Area
function passTime() {
    for (let tickCounter = 1; tickCounter <= 24; tickCounter++) timeTableTick(tickCounter);
    updateUI();
}
