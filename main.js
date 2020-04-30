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
var radiationTotal = 0;


// function rngJesus() {
//     var rng = Math.floor(Math.random() * 101);
//     var totalSpecialRNG = Math.floor(Math.random () * totalSpecial);
// }

function searchAction() {
    // Can't get it to work
    // rngJesus();

    // Searching for Caps
    let totalSpecialRNG = Math.floor(Math.random() * totalSpecial);
    moneyTotal += totalSpecialRNG;
    document.getElementById('moneyTotalDisplay').value = moneyTotal;
    document.getElementById('moneyTotalDisplay').innerText = moneyTotal
    document.getElementById('historyLog').innerText = 'You found ' + totalSpecialRNG + ' scrap!';

    // Radiation Ticks
    let rng = Math.floor((Math.random() * 101) + luck);
    rng - totalSpecial;

    if (rng <= 25) {
        let radiationChange = Math.floor((Math.random() * 5) + 1 - endurance);

        // If Endurance negates Radiation, flex.
        if (radiationChange <= 0) {
            document.getElementById('radiationTotalDisplay').value = radiationTotal;
            document.getElementById('radiationTotalDisplay').innerText = radiationTotal;
            document.getElementById('historyLog2').innerText = " It was nothing your Endurance couldn't handle.";

        } else {
            radiationTotal += radiationChange;
            document.getElementById('radiationTotalDisplay').value = radiationTotal;
            document.getElementById('radiationTotalDisplay').innerText = radiationTotal;
            document.getElementById('historyLog2').innerText = " You have gained " + radiationChange + " Rads!";
            }

    } else {
        document.getElementById('historyLog2').innerText = " It was easy pickings.";
    }

}