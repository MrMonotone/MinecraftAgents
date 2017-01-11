
var States = {
    CUTTINGWOOD = 0,
    LOOKINGFORWOOD = 1,
}

// Maybe use node event emitter?
// agentBrain.on('foundWood'), agent.on('selectedAction')

function AgentBrain()
{
    this.visualMemory = [];
    this.actionSequence = ROUTINE.States.LOOKINGFORWOOD;
    this.actionCursor = 0;
}

AgentBrain.prototype.ROUTINE = {
    [States.LOOKINGFORWOOD]: [],
    [States.CUTTINGWOOD]: []
}

AgentBrain.prototype.selectAction = function ()
{
    var action = () => { console.error("PANIC")};
    switch (key) {
        case States.CUTTINGWOOD:
            this.actionSequence = ROUTINE.States.CUTTINGWOOD;
            break;
    
        default:
            break;
    }
    return this.actionSequence[this.actionCursor++];
}

AgentBrain.prototype.selectState = function ()
{

}

AgentBrain.prototype.see = function ()
{
    // look at stuff?
}