var mineflayer = require('mineflayer');
var events = require('events');

if(process.argv.length < 4 || process.argv.length > 5) {
  console.log("Usage : node index.js <host> <port> [<numberOfBots>]");
  process.exit(1);
}

var agentManager = new AgentManger(process.argv[2], parseInt(process.argv[3]));

agentManager.start();