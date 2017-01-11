var mineflayer = require('mineflayer');
var agentManager = new AgentManger();

if(process.argv.length < 4 || process.argv.length > 5) {
  console.log("Usage : node index.js <host> <port> [<numberOfBots>]");
  process.exit(1);
}