function Agent(bot){
    this.bot = bot;
    this.brain = new AgentBrain(this);
}

Agent.prototype.update = function(){
    this.brain.update();
};

Agent.prototype.start = function()
{
    this.brain.start();
};

Agent.prototype.stop = function()
{
    this.brain.stop();
};

Agent.prototype.pause = function()
{
    this.brain.pause();
};

Agent.prototype.resume = function()
{
    this.brain.resume();
};

let Direction = {
    FORWARD: 'forward',
    BACKWARD: 'back',
    LEFT: 'left',
    RIGHT: 'right',
};

// There is a fancier way to do directions but lets not get too complicated yet

Agent.prototype.startSprint = function() {
    this.bot.setControlState('sprint', true);
};

Agent.prototype.stopStrint = function() {
    this.bot.setControlState('sprint', false);
}

Agent.prototype.stopMove = function() {
    bot.clearControlStates();
};

Agent.prototype.look = function(yaw, pitch) {
    bot.look(yaw, pitch);
};

Agent.prototype.lookAtPosition = function(position) {
    bot.lookAt(position);
};

Agent.prototype.startDiagonalMove = function(verticalDirection, horizontalDirection){
    this.toggleDirection(verticalDirection).start();
    this.toggleDirection(horizontalDirection).start();
};

Agent.prototype.stopDiagonalMove = function(verticalDirection, horizontalDirection)
{
    this.toggleDirection(verticalDirection).stop();
    this.toggleDirection(horizontalDirection).stop();
}

Agent.prototype.startMove = function(direction) {
    this.bot.setControlState(direction, true);
};

Agent.prototype.stopMove = function(direction) {
    this.bot.setControlState(direction, false);
}
