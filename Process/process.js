
var ActionList = require('../ActionList/actionList.js')
function Process() {
    ActionList.call(this);
}

Process.prototype = Object.create(ActionList.prototype);
Process.prototype.constructor = Process;

Process.prototype.update = function () {
    if(!this.success()) {
        this.emit('success');
        this.complete();
    } else if (this.fail()) {
        this.emit('fail');
        this.complete();
    } else {
        ActionList.prototype.update.call(this, tick, agent);
    }

}

Process.prototype.success = function () {
    return true;
}

Process.prototype.fail = function () {
    return false;
}
module.exports = Process;