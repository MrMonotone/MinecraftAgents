
// Should an ActionList be an action? Or should we have an action that spawns an action?
function ActionList ()
{
    Action.call(this);
    // We will use lanes to handle reactions?
    this.lanes = [];
    this.size = 0;
}

ActionList.prototype = Object.create(Action.prototype);
ActionList.prototype.constructor = ActionList;

ActionList.prototype.update = function (delta)
{
    // Dont do the action
    if (this.paused || this.finished)
        return;
    this.lanes.forEach((lane) => 
    {
        lane.actions.forEach((action, i) =>
        {
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
                        continue;
                    }
                }

                action.update(delta);

                if (action.finished)
                {
                    lane.actions.splice(i, 1);
                    --this.size;
                    continue;
                }
            }

            if (action.blocking)
                break;
        })
    })

    // recycle lanes
    
    if (this.size === 0)
    {
        this.complete();
    }
}

function ActionLane ()
{
    this.id = -1;
    this.actions = [];
}