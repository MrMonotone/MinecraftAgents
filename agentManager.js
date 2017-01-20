
var mineflayer = mineflayer || require('mineflayer');
// When we want to run multiple agents this will be helpful
function AgentManager(host, port, amount)
{
    this.host = host || "localhost";
    this.port = port || 25565;
    this.agents = [];
    this.amount = amount || 1;
}

AgentManager.prototype.start = function ()
{
    for (let i = 0; i < this.amount; ++i)
    {
        this.spawnAgent(i);
    }
    this.loop();

}

AgentManager.prototype.spawnAgent = function (id) 
{
    let bot = mineflayer.createBot({
        host: this.host,
        port: this.port,
        username: "Agent " + id,
        // password: process.argv[5], // sorry microsoft :'(
        verbose: true,
    });
    let agent = new Agent(bot);
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



