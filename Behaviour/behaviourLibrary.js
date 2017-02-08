var Behaviour = require('./behaviour.js');

// Assuming we want one piece of wood

function GetWood() {
    Behaviour.call(this);
}

GetWood.prototype = Object.create(Behaviour.prototype);
GetWood.prototype.constructor = GetWood;

GetWood.prototype.update = function (tick, agent) {
    if (agent.brain.wood) {
        this.parent.pushBack(new WalkToWood())
        this.complete();
    }
    else
    {
        Behaviour.prototype.update.call(this, tick, agent);
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
        // Find Wood
        this.parent.pushFront(new FindWood());
        this.complete();
    }
    if (agent.brain.nextToWood() && agent.brain.wood) {
        Behaviour.prototype.update.call(this, tick, agent);
    }
    if (!agent.brain.wood) {
        // Find Wood;
        this.complete();
    } else {
        
    }
}

