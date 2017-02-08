var Behaviour = require('./behaviour.js');

// Assuming we want one piece of wood

// Get some amount of Wood
function GetWood() {
    Behaviour.call(this);
    this.currentAmount = 0;
    this.amount = 1;
}

GetWood.prototype = Object.create(Behaviour.prototype);
GetWood.prototype.constructor = GetWood;

GetWood.prototype.update = function (tick, agent) {
    if (this.currentAmount >= this.amount) {
        this.complete();
    } else { // What the hell would this do??? 
        // Behaviour.prototype.update.call(this, tick, agent); // I have no idea how this would work?
        this.parent.pushFront(new FindWood()); // push it to the front and block it????
    }
}

// When would we have an action modify 
function FindWood() {
    Behaviour.call(this);
}

FindWood.prototype = Object.create(Behaviour.prototype);
FindWood.prototype.constructor = FindWood;

FindWood.prototype.update = function (tick, agent) {
    if (agent.brain.wood) {
        this.parent.pushBack(new WalkToWood())
        this.complete();
    }
    else
    {
        Behaviour.prototype.update.call(this, tick, agent);
    }
}

function WalkToWood() {
    Behaviour.call(this);
}

WalkToWood.prototype = Object.create(Behaviour.prototype);
WalkToWood.prototype.constructor = WalkToWood;

WalkToWood.prototype.update = function (tick, agent) {
    if (agent.brain.nextToWood()) {
        // Chop Wood
        // this.parent.pushBack(new ChopWood());
        this.complete();
    } else if (!agent.brain.wood) {
        // Find Wood 
        this.parent.pushFront(new FindWood()); // we have to find wood before we can chop it
    } else {
        Behaviour.prototype.update.call(this, tick, agent);
    }
}

function ChopWood() {
    Behaviour.call(this);
}

ChopWood.prototype = Object.create(Behaviour.prototype);
ChopWood.prototype.constructor = ChopWood;

ChopWood.prototype.update = function (tick, agent) {
    if(!agent.brain.wood) {
        this.complete();
    }
    else if (agent.brain.nextToWood() && agent.brain.wood) {
        Behaviour.prototype.update.call(this, tick, agent);
    }
}

