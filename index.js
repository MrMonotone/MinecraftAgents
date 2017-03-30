var AgentManager = require('./agentManager.js');
var actionUtils = require('./ActionList/actionUtils');

if(process.argv.length < 4 || process.argv.length > 5) {
  console.log("Usage : node index.js <host> <port> [<numberOfBots>]");
  process.exit(1);
}

var agentManager = new AgentManager(process.argv[2], parseInt(process.argv[3]), 3);

agentManager.start();