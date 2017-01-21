
var States = {
    CUTTINGWOOD = 0,
    LOOKINGFORWOOD = 1,
}

// Maybe use node event emitter?
// agentBrain.on('foundWood'), agent.on('selectedAction')

function AgentBrain(agent)
{
    // this.visualMemory = [];
    this.agent = agent;
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
    this.actionList.update(delta, agent);
}

AgentBrain.prototype.pause = function ()
{
    this.actionList.pause();
}