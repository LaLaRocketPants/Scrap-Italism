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

function needsOneTick() {
    thirst -= 1;
    hunger -= 2;
    energy -= 10;
}