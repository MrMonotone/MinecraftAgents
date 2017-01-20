
var States = {
    CUTTINGWOOD = 0,
    LOOKINGFORWOOD = 1,
}

// Maybe use node event emitter?
// agentBrain.on('foundWood'), agent.on('selectedAction')

function AgentBrain()
{
    // this.visualMemory = [];
    this.actionList = Object.create(ActionList.prototype);
    // this.actionSequence = ROUTINE.States.LOOKINGFORWOOD;
    // this.actionCursor = 0;
}

AgentBrain.prototype.start = function()
{
    let testSequence = actionUtils.serial(new Wait(1000), new StartMoveForward(), new Wait(1000),
                                          new StopMoveForward(), new Wait(1000), new StartMoveBackward(), 
                                          new Wait(1000), new StopMoveBackward());
    this.actionList = testSequence; 
}

AgentBrain.prototype.update = function (delta)
{
    this.actionList.update(delta);
}

AgentBrain.prototype.pause = function ()
{
    this.actionList.pause();
}

// AgentBrain.prototype.ROUTINE = {
//     [States.LOOKINGFORWOOD]: [],
//     [States.CUTTINGWOOD]: []
// }

// AgentBrain.prototype.selectAction = function ()
// {
//     var action = () => { console.error("PANIC")};
//     switch (key) {
//         case States.CUTTINGWOOD:
//             this.actionSequence = ROUTINE.States.CUTTINGWOOD;
//             break;
    
//         default:
//             break;
//     }
//     return this.actionSequence[this.actionCursor++];
// }

// AgentBrain.prototype.selectState = function ()
// {

// }

// AgentBrain.prototype.see = function ()
// {
//     // look at stuff?
// }