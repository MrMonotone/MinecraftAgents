
// Should an ActionList be an action? Or should we have an action that spawns an action?
// each lane used for sensor or actuator
// use actionlist as state machine?
//   function update(delta)
//   {
//       this.complete();
//       this.parent.push(new newState(), 0);
//   }
// var createPool = require('../Pool/pool.js');
var Action = require('./action.js')
var ActionLane = require('./actionLane.js')
// TODO: have the ActionList listen to an action completed to call next action.
// Use an init method to 
// Would I need a delta???

function StuffList() {
    Action.call(this);
    // We will use lanes to handle reactions?
    this.successes = 0;
    this.lanes = []; // An array of lanes // maybe linked list would be faster???
    this.size = 0;
}

StuffList.prototype = Object.create(Action.prototype);
StuffList.prototype.constructor = ActionList;

StuffList.prototype.getLane = function (laneID) {
    laneID = laneID || 0;
    var lane = this.lanes[laneID];
    if (!lane) {
        lane = new ActionLane();
        lane.id = laneID;
        this.lanes[laneID] = lane;
    }
    return lane;
}

StuffList.prototype.pushBack = function (action, laneID) {
    laneID = laneID || 0;
    this.getLane(laneID).actions.push(action);
    action.laneID = laneID;
    action.parent = this;
    ++this.size;
    return this;
}

StuffList.prototype.pushFront = function (action, laneID) {
    laneID = laneID || 0; // these arent needed but maybe its faster than declaring a lane?
    this.getLane(laneID).actions.unshift(action);
    action.laneID = laneID;
    action.parent = this;
    ++this.size;
    return this;
}
// // Never use these?
// StuffList.prototype.cancelLane = function (laneID) {
//     this.getLane(laneID).cancel();
// }

// StuffList.prototype.pauseLane = function (laneID) {
//     this.getLane(laneID).pause();
// }

// StuffList.prototype.resumeLane = function (laneID) {
//     this.getLane(laneID).resume();
// }

// StuffList.prototype.blockLane = function (laneID) {
//     this.getLane(laneID).block();
// }

// StuffList.prototype.unblockLane = function (laneID) {
//     this.getLane(laneID).unblock();
// }


StuffList.prototype.update = function (delta, agent) {

    // Dont do the action
    if (this.paused || this.finished)
        return;

    if (this.failed) {
        
    }
    if (this.succeed) {
        this.complete();
    }
    for (var i = 0; i < this.lanes.length; i++) {
        var lane = this.lanes[i]; // We only
        for (var i = 0; i < lane.actions.length; i++) {
            var action = lane.actions[i];
            // action completed remove it
            // if (action.finished) {
            //     lane.actions.splice(i, 1);
            //     i--;
            //     --this.size;
            //     continue;
            // }

            if (action.succeed) {
                action.finished = true;
                continue;
            } else if (action.failed) {
                this.successes = 0;
                this.failure();
            }

            if (!action.paused) {
                if (!action.started) {
                    action.start();
                    // if (action.finished) {
                    //     lane.actions.splice(i, 1);
                    //     i--;
                    //     --this.size;
                    //     continue;
                    // }
                    if (action.succeed) {
                        action.finished = true;
                        continue;
                    } else if (action.failed) {
                        this.successes = 0;
                        this.failure();
                    }
                }

                action.update(delta, agent);

                // if (action.finished) {
                //     lane.actions.splice(i, 1);
                //     i--;
                //     --this.size;
                //     continue;
                // }
                if (action.succeed) {
                    action.finished = true;
                    continue;
                }
            }

            if (action.blocking)
                break;
        }
    }

    // recycle lanes

    if (this.size === this.successes) {
        this.succeed();
    }
}

module.exports = StuffList;


