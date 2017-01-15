function TestAction ()
{
    this.random = 0;
}

TestAction.prototype = Object.create(Action.prototype);
TestAction.prototype.constructor = TestAction;

TestAction.prototype.update = function (delta) 
{
    console.log("Test")
    random += Math.random();
    this.complete();
}

function MoveForward ()
{

}

MoveForward.prototype = Object.create(Action.prototype);
MoveForward.prototype.constructor = MoveForward;

MoveForward.prototype.update = function (delta) 
{
    
    this.complete();
}