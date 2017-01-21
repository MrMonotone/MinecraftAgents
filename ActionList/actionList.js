
// Should an ActionList be an action? Or should we have an action that spawns an action?
// each lane used for sensor or actuator
// use actionlist as state machine?
//   function update(delta)
//   {
//       this.complete();
//       this.parent.push(new newState(), 0);
//   }
var createPool = require('pool')
function ActionList() {
    Action.call(this);
    // We will use lanes to handle reactions?
    this.lanes = []; // maybe linked list would be faster???
    this.size = 0;
    this.pool = 
}

ActionList.prototype = Object.create(Action.prototype);
ActionList.prototype.constructor = ActionList;

ActionList.prototype.getLane = function(lane) {
    if (!lanes[lane])
    {
        let list = pool.get();
        lanes[lane] = list;
    }
    return lanes[lane];
}

ActionList.prototype.pushBack = function(action, lane) {
    this.getLane(lane).actions.pushBack(action);
    action.laneId = lane;
    ++size;
    return this;
}

ActionList.prototype.pushFront = function(action, lane) {
    this.getLane(lane).actions.pushFront(action);
    action.laneId = lane;
    ++size;
    return this;
}

ActionList.prototype.update = function (delta)
{
    // Dont do the action
    if (this.paused || this.finished)
        return;
    this.lanes.forEach(function (lane) {
        lane.actions.forEach(function (action, i) {
            // action completed remove it
            if (action.finished)
            {
                lane.actions.splice(i, 1);
                --this.size;
                continue;
            }

            if (!action.paused)
            {
                if (!action.started)
                {
                    action.start();
                    if (action.finished)
                    {
                        lane.actions.splice(i, 1);
                        --this.size;
                        // continue;
                    }
                }

                action.update(delta);

                if (action.finished)
                {
                    lane.actions.splice(i, 1);
                    --this.size;
                    // continue;
                }
            }

            if (action.blocking)
                // break;
        });
    })

    // recycle lanes

    if (this.size === 0)
    {
        this.complete();
    }
}

function ActionLane() {
    this.id = Lanes.NONE;
    this.actions = [];
}
