var harvester = require('role.harvester');
var builder = require('role.builder');
var upgrader = require('role.upgrader');
var attacker = require('role.attacker');

var chkPop = require('mod.populator');

module.exports.loop = function () {
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        var role = creep.memory.role;

        if (role == 'harvester') harvester.run(creep);
        if (role == 'upgrader')  upgrader.run(creep);
        if (role == 'builder')   builder.run(creep);
        if (role == 'attacker')  attacker.run(creep);
        
        chkPop.check();


    }
}