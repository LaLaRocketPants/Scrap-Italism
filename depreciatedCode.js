//Replaced by the restoreAction
function drinkAction() {
    if (player.energy >= 10 && player.hunger >= 2 && player.scrap >= 5) {
        needsOneTick();
        radiationOneTick();
        player.scrap -= shopPrice;
        player.thirst += 11;
        document.getElementById('historyLog').innerText = "You spent scrap to buy Inca Kola at the El Tiburón. ";
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
        // Hooray for cannibalism. I mean, resource appropriating.
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