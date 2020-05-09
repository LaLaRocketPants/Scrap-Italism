var player = {
    strength: 1,
    constitution: 1,
    wisdom: 1,
    dexterity: 1,
    charisma: 1,
    intelligence: 1,
    
    hunger: 100,
    thirst: 100,
    energy: 300,
    radiation: 0,
    scrap: 0
}
var totalStats = player.strength + player.constitution + player.wisdom + player.dexterity + player.charisma + player.intelligence;

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

var changeDay = 0;
var currentDay = days[changeDay];

function searchAction() {
    let tSRNG = Math.floor(Math.random() * (totalStats * 5));

    if (player.energy >= 50 && player.hunger >= 5 && player.thirst >= 10) {
        if (tSRNG == 0) {
            document.getElementById('historyLog').innerText = 'You found nothing! You are a loser! ';
        } else {
            player.scrap += tSRNG;
            document.getElementById('historyLog').innerText = 'You found ' + tSRNG + ' scrap! ';
        }
        
        needsFiveTick();
        radiationOneTick();

    } else {
        document.getElementById('historyLog').innerText = 'You are too tired to do anything. ';
    }

    updateUI();
}

function drinkAction() {
    if (player.energy >= 10 && player.hunger >= 2 && player.scrap >= 5) {
        needsOneTick();
        radiationOneTick();
        player.scrap -= 5;
        player.thirst += 11;
        document.getElementById('historyLog').innerText = "You spent 5 scrap to buy Inca Kola at the El Tiburón. ";
        document.getElementById('historyLog2').innerText = 'The barkeeper yells "You have to spend money to make money!" ';

    } else if (player.scrap <= 5){
        document.getElementById('historyLog').innerText = "You are tossed out of the bar. ";
        document.getElementById('historyLog2').innerText = "The bouncer sneers. 'Nothing's free!' ";

    } else {
        document.getElementById('historyLog').innerText = "You're too tired to even go to the bar. ";
        document.getElementById('historyLog2').innerText = "People laugh at you while you stumble in a tired daze. ";
    }

    updateUI();
}

function eatAction() {
    if (player.energy >= 10 && player.thirst >= 2 && player.scrap >= 10 ) {
        needsOneTick();
        radiationOneTick();
        player.scrap -= 10;        
        player.hunger += 22;        
        document.getElementById('historyLog').innerText = "You spent 10 scrap to buy a burrito at the El Tiburón. ";
        document.getElementById('historyLog2').innerText = "The chef only smiles, 'The freshest ingredients' ";

    } else if (player.scrap <= 10) {
        document.getElementById('historyLog').innerText = "You are shooed away from the stand. ";
        document.getElementById('historyLog2').innerText = "The chef frowns at you, 'There is no place for sloths like you.' ";

    } else {
        document.getElementById('historyLog').innerText = "You're too tired to even go to El Tiburón. ";
        document.getElementById('historyLog2').innerText = "People laugh at you while you stumble in a tired daze. ";
    }

    updateUI();
}

function mealAction() {
    if (player.scrap >= 100) {
        player.energy += 50;
        player.hunger += 40;
        player.thirst += 20;

        document.getElementById('historyLog').innerText = "You spend 100 caps to dine at the extravagant Gourmet. "
        document.getElementById('historyLog2').innerText = ""

    } else {
        document.getElementById('historyLog').innerText = "The guards brandish their rifles at you. "
        document.getElementById('historyLog2').innerText = " 'This is the Gourmet. And you can't afford it.'"
    }

    updateUI();
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

    updateUI();
}

function shaqShlepAction() {
    if (player.energy <= 50 && player.hunger >= 10 && player.thirst >= 20) {
        needsTenTick();
        let tsRNG = (player.strength + player.constitution) * 10;
        player.energy = 280 + tsRNG;
        document.getElementById('historyLog').innerText = "You find somewhere safe to sleep. ";
        document.getElementById('historyLog2').innerText = ""

        changeDay++;
        if (changeDay >= 6) {
            changeDay = 0;
        }
    
        training.strength = false;    
        training.constitution = false;
        training.wisdom = false;
        training.dexterity = false;
        training.intelligence = false;
        training.charisma = false;
        currentDay = days[changeDay];

    } else if (player.hunger <= 10 && player.thirst <= 20) {
        document.getElementById('historyLog').innerText = "You are either too hangry or too thirsty to sleep. ";
        document.getElementById('historyLog2').innerText = ""

    } else {
        document.getElementById('historyLog').innerText = "You're not sleepy enough! Work harder!";
        document.getElementById('historyLog2').innerText = ""
    }

    updateUI();
}

function strengthAction() {
    if (player.energy >= 100 && player.hunger >= 20 && player.thirst >= 10 && training.strength == false) {
        let rnJesus = Math.floor(Math.random() * player.strength) + training.statBalance;

        if (rnJesus >= player.strength) {
            player.strength++
            training.strength = true;
            training.statBalance = 0;
            totalStats = player.strength + player.constitution + player.wisdom + player.dexterity + player.charisma + player.intelligence;4
            
            document.getElementById('historyLog').innerText = "After a good workout, you feel sore. ";
            document.getElementById('historyLog2').innerText = ""            
        } else {
            training.statBalance++;

            document.getElementById('historyLog').innerText = "You feel like you could use a better workout. ";
            document.getElementById('historyLog2').innerText = ""
        }
        needsTenTick();

    } else {
        document.getElementById('historyLog').innerText = "You're too tired to do some heavy lifting.";
        document.getElementById('historyLog2').innerText = ""
    }

    updateUI();
}

function constitutionAction() {
    if (player.energy >= 100 && player.hunger >= 20 && player.thirst >= 10 && training.constitution == false) {
        let rnJesus = Math.floor(Math.random() * player.constitution) + training.statBalance;

        if (rnJesus >= player.constitution) {
            player.constitution++
            training.constitution = true;
            training.statBalance = 0;
            totalStats = player.strength + player.constitution + player.wisdom + player.dexterity + player.charisma + player.intelligence;4
            
            document.getElementById('historyLog').innerText = "After a good workout, you feel sore. ";
            document.getElementById('historyLog2').innerText = ""            
        } else {
            training.statBalance++;

            document.getElementById('historyLog').innerText = "You feel like you could use a better workout. ";
            document.getElementById('historyLog2').innerText = ""
        }
        needsTenTick();

    } else {
        document.getElementById('historyLog').innerText = "You're too tired to do go running.";
        document.getElementById('historyLog2').innerText = ""
    }

    updateUI();
}

function wisdomAction() {
    if (player.energy >= 100 && player.hunger >= 20 && player.thirst >= 10 && training.wisdom == false) {
        let rnJesus = Math.floor(Math.random() * player.wisdom) + training.statBalance;

        if (rnJesus >= player.wisdom) {
            player.wisdom++
            training.wisdom = true;
            training.statBalance = 0;
            totalStats = player.strength + player.constitution + player.wisdom + player.dexterity + player.charisma + player.intelligence;4
            
            document.getElementById('historyLog').innerText = "You successfully created something new! ";
            document.getElementById('historyLog2').innerText = ""            
        } else {
            training.statBalance++;

            document.getElementById('historyLog').innerText = "You didn't reach a breakthrough. ";
            document.getElementById('historyLog2').innerText = ""
        }
        needsTenTick();

    } else {
        document.getElementById('historyLog').innerText = "You're too tired to create something.";
        document.getElementById('historyLog2').innerText = ""
    }

    updateUI();
}

function dexterityAction() {
    if (player.energy >= 100 && player.hunger >= 20 && player.thirst >= 10 && training.dexterity == false) {
        let rnJesus = Math.floor(Math.random() * player.dexterity) + training.statBalance;

        if (rnJesus >= player.dexterity) {
            player.dexterity++
            training.dexterity = true;
            training.statBalance = 0;
            totalStats = player.strength + player.constitution + player.wisdom + player.dexterity + player.charisma + player.intelligence;4
            
            document.getElementById('historyLog').innerText = "You successfully created something new! ";
            document.getElementById('historyLog2').innerText = ""            
        } else {
            training.statBalance++;

            document.getElementById('historyLog').innerText = "You broke it. ";
            document.getElementById('historyLog2').innerText = ""
        }
        needsTenTick();

    } else {
        document.getElementById('historyLog').innerText = "You're too tired to create something.";
        document.getElementById('historyLog2').innerText = ""
    }

    updateUI();
}

function intelligenceAction() {
    if (player.energy >= 100 && player.hunger >= 20 && player.thirst >= 10 && training.intelligence == false) {
        let rnJesus = Math.floor(Math.random() * player.intelligence) + training.statBalance;

        if (rnJesus >= player.intelligence) {
            player.intelligence++
            training.intelligence = true;
            training.statBalance = 0;
            totalStats = player.strength + player.constitution + player.wisdom + player.dexterity + player.charisma + player.intelligence;4
            
            document.getElementById('historyLog').innerText = "You successfully created something new! ";
            document.getElementById('historyLog2').innerText = ""            
        } else {
            training.statBalance++;

            document.getElementById('historyLog').innerText = "You didn't reach a breakthrough. ";
            document.getElementById('historyLog2').innerText = ""
        }
        needsTenTick();

    } else {
        document.getElementById('historyLog').innerText = "You're too tired to create something.";
        document.getElementById('historyLog2').innerText = ""
    }

    updateUI();    
}

function charismaAction() {
    if (player.energy >= 100 && player.hunger >= 20 && player.thirst >= 10 && training.charisma == false) {
        let rnJesus = Math.floor(Math.random() * player.charisma) + training.statBalance;

        if (rnJesus >= player.charisma) {
            player.charisma++
            training.charisma = true;
            training.statBalance = 0;
            totalStats = player.strength + player.constitution + player.wisdom + player.dexterity + player.charisma + player.intelligence;4
            
            document.getElementById('historyLog').innerText = "You successfully created something new! ";
            document.getElementById('historyLog2').innerText = ""            
        } else {
            training.statBalance++;

            document.getElementById('historyLog').innerText = "You didn't reach a breakthrough. ";
            document.getElementById('historyLog2').innerText = ""
        }
        needsTenTick();

    } else {
        document.getElementById('historyLog').innerText = "You're too tired to create something.";
        document.getElementById('historyLog2').innerText = ""
    }

    updateUI();
    
}

function saveGame() {
    var saveFile = {
        player1: player,
        training1: training,
        changeDay1: changeDay
    }
    localStorage.setItem("saveFile", JSON.stringify(saveFile));

    document.getElementById('historyLog').innerText = "The game has been saved";
    document.getElementById('historyLog2').innerText = ""

}

function loadGame() {
    var loadFile = JSON.parse(localStorage.getItem("saveFile"));

    player = loadFile.player1;
    training = loadFile.training1;
    changeDay = loadFile.changeDay1;
    updateUI();

    document.getElementById('historyLog').innerText = "The game has been loaded";
    document.getElementById('historyLog2').innerText = ""
}