var EventEmitter = require('events').EventEmitter;

// http://becausejavascript.com/node-js-event-emitters/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
function Action()
{
    EventEmitter.call(this);
    this.started = false;
    this.finished = false;
    this.paused = false;
    this.blocking = false;
    this.lane = 0;
}

Action.prototype = Object.create(EventEmitter.prototype);
Action.prototype.constructor = Action;

Action.prototype.update = function (delta)
{

}


// Events

Action.prototype.start = function ()
{
    this.emit('started');
    this.started = true;
}
Action.prototype.complete = function ()
{
    this.finished = true;
    this.emit('completed');
    this.emit('finished');
}

Action.prototype.pause = function ()
{
    this.paused = true;
    this.emit('paused');
}
Action.prototype.resume = function ()
{
    this.paused = false;
    this.emit('resumed');
}

Action.prototype.cancel = function ()
{
    this.finished = true;
    this.emit('cancelled');
    this.emit('finished');
}