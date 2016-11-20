var harvesterSpn = require('role.harvester.spawn');
var harvesterExt = require('role.harvester.extension')
var builder = require('role.builder');
var upgrader = require('role.upgrader');
var attacker = require('role.attacker');

var chkPop = require('mod.populator');

module.exports.loop = function () {
    
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    console.log('State of colony:');
    
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];

        var role = creep.memory.role;

        if (role == 'harvester.spawn') harvesterSpn.run(creep);
        if (role == 'harvester.extension') harvesterExt.run(creep);
        if (role == 'upgrader')  upgrader.run(creep);
        if (role == 'builder')   builder.run(creep);
        if (role == 'attacker')  attacker.run(creep);
    }
    
    chkPop.check();
    
    var enemies = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS);
    
    if (enemies.length > 0) {
        console.log('ALERT!, ', enemies.length, ' hostile creeps have been found!');
        for (let vname in enemies) {
            console.log('\tUsername: ' + enemies[vname].owner.username);
        }
    } else {
        console.log('No hostile creeps detected');
    }
    
    console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    
}