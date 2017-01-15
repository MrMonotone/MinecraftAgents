
var mineflayer = mineflayer || require('mineflayer');
// When we want to run multiple agents this will be helpful
function AgentManager(host, port)
{
    this.host = host || "localhost";
    this.port = port || 25565;
    this.agent = null;
}

AgentManager.prototype.start = function ()
{
    this.spawnAgent();
    this.loop();

}

AgentManager.prototype.spawnAgent = function (amount) 
{
    var bot = mineflayer.createBot({
        host: this.host,
        port: this.port,
        username: process.argv[4] || "bot",
        // password: process.argv[5], // sorry microsoft :'(
        verbose: true,
    });
    agent = new Agent(bot);
}

AgentManager.prototype.loop = function()
{
    agent.update();
    this.loop();
}



