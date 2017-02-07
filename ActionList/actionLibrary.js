var Action = require('./action.js')

//Implement Look random
//Implement Scan Direction Up down left Right

function TestAction() {
    Action.call(this)
    this.random = 0;
}

TestAction.prototype = Object.create(Action.prototype);
TestAction.prototype.constructor = TestAction;

TestAction.prototype.update = function (delta) {
    console.log("Test")
    random += Math.random();
    this.complete();
}

function Wait(duration) {
    Action.call(this)
    // this.duration = duration || 100; // in milliseconds
    this.duration = duration < 0 ? 0 : duration;
    this.startTime = 0;
    this.once('started', function () { this.startTime = Date.now(); })
}

Wait.prototype = Object.create(Action.prototype);
Wait.prototype.constructor = Wait;

// Wait.prototype.OnStarted = function() {
//     this.startTime = Date.now();
// }

Wait.prototype.update = function (delta) {
    if (Date.now() - this.startTime > this.duration) {
        console.log("Wait Done");
        this.complete();
    }
}


function StartMoveForward() {
    Action.call(this);
}

StartMoveForward.prototype = Object.create(Action.prototype);
StartMoveForward.prototype.constructor = StartMoveForward;

StartMoveForward.prototype.update = function (delta, agent) {
    agent.startMove('forward');
    console.log("Start Move");
    this.complete();
}

function StopMoveForward() {
    Action.call(this)
}

StopMoveForward.prototype = Object.create(Action.prototype);
StopMoveForward.prototype.constructor = StopMoveForward;

StopMoveForward.prototype.update = function (delta, agent) {
    console.log("Stop Move");
    agent.stopMove('forward');
    this.complete();
}


function StartMoveBackward() {
    Action.call(this)
}

StartMoveBackward.prototype = Object.create(Action.prototype);
StartMoveBackward.prototype.constructor = StartMoveBackward;

StartMoveBackward.prototype.update = function (delta, agent) {
    console.log("start back");
    agent.startMove('back');
    this.complete();
}

function StopMoveBackward() {
    Action.call(this)
}

StopMoveBackward.prototype = Object.create(Action.prototype);
StopMoveBackward.prototype.constructor = StopMoveBackward;

StopMoveBackward.prototype.update = function(delta, agent) {
    console.log("stop back");
    agent.stopMove('back');
    this.complete();
}

function GetWood() {
    Action.call(this);
}

GetWood.prototype = Object.create(Action.prototype);
GetWood.prototype.constructor = GetWood;

GetWood.prototype.update = function(delta, agent) {
    // if
    // if (agent.brain.wood) {
    //     this.complete();
    // }
    // agent.lookRandom();
    // agent.see();
}

function FindWood() {
    Action.call(this);
}

FindWood.prototype = Object.create(Action.prototype);
FindWood.prototype.constructor = FindWood;

FindWood.prototype.update = function(delta, agent) {
    if (agent.brain.wood) {
        this.parent.pushBack(new MoveToWood());
        this.complete();
    }
    agent.lookRandom();
    agent.brain.look();
}

function MoveToWood() {
    Action.call(this);
}

MoveToWood.prototype = Object.create(Action.prototype);
MoveToWood.prototype.constructor = MoveToWood;

MoveToWood.prototype.update = function(delta, agent) {
    if (agent.brain.wood) {
        agent.startMove('forward');
        agent.brain.look();
    } else {
        agent.stopMove('forward');
        this.parent.pushBack(new ChopWood());
        this.complete();
    }
}

function ChopWood() {
    Action.call(this);
}

ChopWood.prototype = Object.create(Action.prototype);
ChopWood.prototype.constructor = ChopWood;

ChopWood.prototype.update = function(delta, agent) {
    if (agent.brain.wood) {
        agent.use();
        agent.brain.look();
    } else {
        this.parent.pushBack(new FindWood())
        this.complete();
    }
}

module.exports = {
    GetWood,
    Wait,
    StartMoveForward,
    StopMoveForward,
    StartMoveBackward,
    StopMoveBackward
}
// module.exports.Wait = Wait;
// module.exports.StartMoveForward = StartMoveForward;
// module.exports.StopMoveForward = StopMoveForward;
// module.exports.StartMoveBackward = StartMoveBackward;
// module.exports.StopMoveBackward = StopMoveBackward;