var Direction = {
    FORWARD: 'forward',
    BACKWARD: 'back',
    LEFT: 'left',
    RIGHT: 'right'
}

function Agent(bot)
{
    this.bot = bot;
    this.brain = new AgentBrain();
}

Agent.prototype.act = function ()
{
    this.brain.selectState();
    this.brain.selectAction();
}

// There is a fancier way to do directions but lets not get too complicated yet

Agent.prototype.toggleSprint = function ()
{
    return new Action(() => {
        this.bot.setControlState('sprint', true);
    }, () => {
        this.bot.setControlState('sprint', false);
    })
}

Agent.prototype.stop = function ()
{
    bot.clearControlStates();
}

Agent.prototype.look = function (yaw, pitch)
{
    bot.look(yaw, pitch);
}

Agent.prototype.lookAtPosition = function (position)
{
    bot.lookAt(position);
}

Agent.prototype.toggleDiagonalMove = function (verticalDirection, horizontalDirection)
{
    return new Action(() => {
        this.toggleDirection(verticalDirection).start();
        this.toggleDirection(horizontalDirection).start();
    }, () => {
        this.toggleDirection(verticalDirection).stop();
        this.toggleDirection(horizontalDirection).stop();
    })
}

Agent.prototype.toggleMove = function (direction)
{
    return new Action(() => {
        this.bot.setControlState(direction, true);
    }, () => {
        this.bot.setControlState(direction, false);
    })
}

// this could be annoymous but lets define it for clarity. can profile it it is too slow?
function Action (startFunction, stopFunction)
{
    this.startFunction = startFunction;
    this.stopFunction = stopFunction;
}

Action.prototype.start = function ()
{
    this.startFunction();
}

Action.prototype.stop = function ()
{
    this.stopFunction();
}