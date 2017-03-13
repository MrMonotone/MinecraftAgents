
// Should an ActionList be an action? Or should we have an action that spawns an action?
// each lane used for sensor or actuator
// use actionlist as state machine?
//   function update(delta)
//   {
//       this.complete();
//       this.parent.push(new newState(), 0);
//   }
// var createPool = require('../Pool/pool.js');
var Daemon = require('./daemon')
var ActionLane = require('../ActionList/actionLane.js')
// TODO: have the ActionList listen to an action completed to call next action.
// Use an init method to 
// Would I need a delta???

function StuffList(success, failure) {
    Daemon.call(this, success, failure);
    // We will use lanes to handle reactions?
    this.successes = 0;
    this.lanes = []; // An array of lanes // maybe linked list would be faster???
    this.size = 0;
}

StuffList.prototype = Object.create(Daemon.prototype);
StuffList.prototype.constructor = StuffList;

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
    if (this.paused)
        return;
    if (!this.finished) {
        for (var i = 0; i < this.lanes.length; i++) {
            var lane = this.lanes[i]; // We only
            for (var i = 0; i < lane.actions.length; i++) {
                var action = lane.actions[i];
                if (action.finished)
                    continue;

                //Check Succession and failure before 
                // action.succeed = action.succeeds(agent);
                // action.failed = action.fails(agent);
                if (action.succeeded) {
                    action.finished = true;
                    this.successes++;
                    continue;
                } else if (action.failed) {
                    this.successes = successes - 1 == -1 ? 0 : successes - 1;
                    lane.actions[i - 1 == -1 ? 0 : i - 1].finished = false;
                    this.failure();
                    break;
                }
                action.update(delta, agent);

                
                //Check Succession and failure before
                // action.succeed = action.succeeds(agent);
                // action.failed = action.fails(agent);
                if (action.succeeded) {
                    action.finished = true;
                    this.successes++;
                    continue;
                } else if (action.failed) {
                    this.successes = successes - 1 == -1 ? 0 : successes - 1;
                    lane.actions[i - 1 == -1 ? 0 : i - 1].finished = false;
                    this.failure();
                    break;
                }

                // This action is blocking so we need to break
                if (action.blocking && !action.finished) // I think this and is impossible but who knows
                    break;
            }
        }
    }

    if (this.size === this.successes) {
        this.succeed();
    }
}


// StuffList.prototype.update = function (delta, agent) {

//     // Dont do the action
//     if (this.paused || this.finished)
//         return;

//     if (this.failed) {

//     }
//     if (this.succeed) {
//         this.complete();
//     }
//     for (var i = 0; i < this.lanes.length; i++) {
//         var lane = this.lanes[i]; // We only
//         for (var i = 0; i < lane.actions.length; i++) {
//             var action = lane.actions[i];


//             // action completed remove it
//             // if (action.finished) {
//             //     lane.actions.splice(i, 1);
//             //     i--;
//             //     --this.size;
//             //     continue;
//             // }

//             if (action.succeed) {
//                 action.finished = true;
//                 continue;
//             } else if (action.failed) {
//                 this.successes = 0;
//                 this.failure();
//             }

//             if (!action.paused) {
//                 if (!action.started) {
//                     action.start();
//                     // if (action.finished) {
//                     //     lane.actions.splice(i, 1);
//                     //     i--;
//                     //     --this.size;
//                     //     continue;
//                     // }
//                     if (action.succeed) {
//                         action.finished = true;
//                         continue;
//                     } else if (action.failed) {
//                         this.successes = 0;
//                         this.failure();
//                     }
//                 }

//                 action.update(delta, agent);

//                 // if (action.finished) {
//                 //     lane.actions.splice(i, 1);
//                 //     i--;
//                 //     --this.size;
//                 //     continue;
//                 // }
//                 if (action.succeed) {
//                     action.finished = true;
//                     continue;
//                 }
//             }

//             if (action.blocking)
//                 break;
//         }
//     }

//     // recycle lanes

//     if (this.size === this.successes) {
//         this.succeed();
//     }
// }

module.exports = StuffList;


