function Agent(bot)
{
    this.bot = bot;
    this.brain = new AgentBrain();
}

Agent.prototype.update = function ()
{
    this.brain.update();
}

Agent.prototype.start = function ()
{
    this.brain.start();
}

Agent.prototype.stop = function ()
{
    this.brain.stop();
}

Agent.prototype.pause = function ()
{
    this.brain.pause();
}

Agent.prototype.resume = function ()
{
    this.brain.resume();
}

var Direction = {
    FORWARD: 'forward',
    BACKWARD: 'back',
    LEFT: 'left',
    RIGHT: 'right'
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

Agent.prototype.stopMove = function ()
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