
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
    // this.startLoop();
    // console.log("Agents are ready!")
    // this.loop();
}
// The agent will not spawn while I am excuting other code???
AgentManager.prototype.spawnAgent = function (id) {
    var self = this;
    var bot = mineflayer.createBot({
        host: this.host,
        port: this.port,
        username: "Agent " + id,
        // password: process.argv[5], // sorry microsoft :'(
        verbose: true,
    });
    var agent = new Agent(bot);
    bot.on('spawn', function() {
        // var test = new Agent(this);
        // test.update();
        // if()
        // self.startLoop(true);
        setInterval(agent.update.bind(agent), 1000);
        // agent.update();
    });
    this.agents.push(agent);
}
//TODO: update to do multiple agents
AgentManager.prototype.startLoop = function (loop) {
    if (!loop)
        return;
    for (var i = 0; i < this.agents.length; i++) {
        var agent = this.agents[i];
        if (agent.ready()) {
            loop = false;
        }
    }
    this.startLoop(loop)
}

AgentManager.prototype.loop = function () {
    for (var i = 0; i < this.agents.length; i++) {
        var agent = this.agents[i];
        agent.update();
    }
    this.loop();
}
function test(agent) {
    agent.update();
    test(agent);
}

module.exports = AgentManager;



