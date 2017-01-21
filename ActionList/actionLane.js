function ActionLane() {
    this.id = Lanes.NONE;
    this.actions = [];
}

ActionLane.prototype.cancel = function() {
    actions.forEach(function(action) {
        actions.cancel();
    }, this);
}

ActionLane.prototype.pause = function() {
    actions.forEach(function(action) {
        actions.pause();
    }, this);
}

ActionLane.prototype.resume = function() {
    actions.forEach(function(action) {
        actions.resume();
    }, this);
}

ActionLane.prototype.block = function() {
    actions.forEach(function(action) {
        actions.block();
    }, this);
}

ActionLane.prototype.unblock = function() {
    actions.forEach(function(action) {
        actions.unblock();
    }, this);
}

module.exports = ActionLane;