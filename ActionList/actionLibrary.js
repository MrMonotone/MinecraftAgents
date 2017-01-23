var Action = require('./action.js')
function TestAction ()
{
    Action.call(this)
    this.random = 0;
}

TestAction.prototype = Object.create(Action.prototype);
TestAction.prototype.constructor = TestAction;

TestAction.prototype.update = function (delta) 
{
    console.log("Test")
    random += Math.random();
    this.complete();
}

function Wait(duration)
{
    Action.call(this)
    this.duration = duration || 100; // in milliseconds
    this.duration = duration < 0 ? 0 : this.duration;
    this.startTime = 0;
    this.once('started', function() {this.startTime = Date.now(); })
}

Wait.prototype = Object.create(Action.prototype);
Wait.prototype.constructor = Wait;

// Wait.prototype.OnStarted = function() {
//     this.startTime = Date.now();
// }

Wait.prototype.update = function (delta) 
{
    if (Date.now() - this.startTime > this.duration)
    {
        console.log("Wait Done");
        this.complete();
    }
}


function StartMoveForward ()
{
    Action.call(this);
}

StartMoveForward.prototype = Object.create(Action.prototype);
StartMoveForward.prototype.constructor = StartMoveForward;

StartMoveForward.prototype.update = function (delta, agent) 
{
    agent.startMove('forward');
    console.log("Start Move");
    this.complete();
}

function StopMoveForward ()
{
    Action.call(this)
}

StopMoveForward.prototype = Object.create(Action.prototype);
StopMoveForward.prototype.constructor = StopMoveForward;

StopMoveForward.prototype.update = function (delta, agent) 
{
    console.log("Stop Move");
    agent.stopMove('forward');
    this.complete();
}


function StartMoveBackward ()
{
    Action.call(this)
}

StartMoveBackward.prototype = Object.create(Action.prototype);
StartMoveBackward.prototype.constructor = StartMoveBackward;

StartMoveBackward.prototype.update = function (delta, agent) 
{
    console.log("start back");
    agent.startMove('back');
    this.complete();
}

function StopMoveBackward ()
{
    Action.call(this)
}

StopMoveBackward.prototype = Object.create(Action.prototype);
StopMoveBackward.prototype.constructor = StopMoveBackward;

StopMoveBackward.prototype.update = function (delta, agent) 
{
    console.log("stop back");
    agent.stopMove('back');
    this.complete();
}

module.exports.Wait = Wait;
module.exports.StartMoveForward = StartMoveForward;
module.exports.StopMoveForward = StopMoveForward;
module.exports.StartMoveBackward = StartMoveBackward;
module.exports.StopMoveBackward = StopMoveBackward;