
// var States = {
//     CUTTINGWOOD = 0,
//     LOOKINGFORWOOD = 1,
// }

// Maybe use node event emitter?
// agentBrain.on('foundWood'), agent.on('selectedAction')
var ActionList = require('../ActionList/actionList.js')
var actionUtils = require('../ActionList/actionUtils.js')
var ActionLibrary = require('../ActionList/actionLibrary.js');
// var Wait = require('../ActionList/actionLibrary.js').Wait;
// var StartMoveForward = require('../ActionList/actionLibrary.js').StartMoveForward;
// var StopMoveForward = require('../ActionList/actionLibrary.js').StopMoveForward;
// var StartMoveBackward = require('../ActionList/actionLibrary.js').StartMoveBackward;
// var StopMoveBackward = require('../ActionList/actionLibrary.js').StopMoveBackward;
function AgentBrain(agent)
{
    // this.visualMemory = [];
    this.agent = agent;
    this.actionList = new ActionList();
    // this.actionSequence = ROUTINE.States.LOOKINGFORWOOD;
    // this.actionCursor = 0;
}

AgentBrain.prototype.start = function()
{
    var test2 = actionUtils.serial([new ActionLibrary.LookRandom()]);
    // var testSequence = actionUtils.serial([new ActionLibrary.StartMoveForward(), new ActionLibrary.Wait(3000),
    //                                         new ActionLibrary.StopMoveForward(), new ActionLibrary.Wait(3000), 
    //                                         new ActionLibrary.StartMoveBackward(), new ActionLibrary.Wait(3000), 
    //                                         new ActionLibrary.StopMoveBackward(), new ActionLibrary.Wait(3000), 
    //                                         new ActionLibrary.StartMoveForward(), new ActionLibrary.Wait(3000), 
    //                                         new ActionLibrary.StopMoveForward()]);
    this.actionList = test2; 
}

AgentBrain.prototype.update = function(delta)
{
    this.actionList.update(delta, this.agent);
}

AgentBrain.prototype.pause = function() {
    this.actionList.pause();
}

module.exports = AgentBrain;