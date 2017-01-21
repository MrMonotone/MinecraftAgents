
var mineflayer = require('mineflayer');
// When we want to run multiple agents this will be helpful
var Agent = require('./Agent/agent.js')
function AgentManager(host, port, amount) {
    this.host = host || "localhost";
    this.port = port || 25565;
    this.agents = [];
    this.amount = amount || 1;
}

AgentManager.prototype.start = function () {
    for (var i = 0; i < this.amount; ++i) {
        this.spawnAgent(i);
    }
    this.loop();
}

AgentManager.prototype.spawnAgent = function (id) {
    var bot = mineflayer.createBot({
        host: this.host,
        port: this.port,
        username: "Agent " + id,
        // password: process.argv[5], // sorry microsoft :'(
        verbose: true,
    });
    var agent = new Agent(bot);
    this.agents.push(agent);
}

AgentManager.prototype.loop = function()
{
    this.agents.forEach(function(agent) {
        agent.update();
    })
    this.loop();
}

module.exports = AgentManager;



