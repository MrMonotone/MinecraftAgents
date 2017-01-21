// var intro:Action = 
//   serial
//   (
//     new Wait(WAIT_TIME), 
//     new TweenTo(logo, TWEEN_TIME, { alpha: 1.0 }), 
//     new Wait(WAIT_TIME), 
     
//     parallel
//     (
//       new TweenTo(button1, TWEEN_TIME, { y: 100 }), 
//       new TweenTo(button2, TWEEN_TIME, { y: 200 }), 
//       new TweenTo(button3, TWEEN_TIME, { y: 300 })
//     )
//   );

function parallel(actions)
{
    var actionList = new ActionList();

    actions.forEach(function(element) {
        action.unblock();
        actionList.pushBack(action);
    }, this);

    return actionList;
}

function serial(actions)
{
    var actionList = new ActionList();
    actions.forEach(function(action) {
        action.block();
        actionList.pushBack(action);
    }, this);
    return actionList;
}

module.exports.parallel = parallel;
module.exports.serial = serial;