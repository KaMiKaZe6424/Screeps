module.exports = {
    
    check: function () {
        
        var harvesterAmount = 4;
        var builderAmount = 3;
        var upgraderAmount = 2;
        var attackerAmount = 2;
        
        
        
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker');
        
        if (harvesters.length < harvesterAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, WORK, WORK, CARRY], undefined, { role: 'harvester' } );
            console.log('Spawning new harvester: ', name);
        } else if (upgraders.length < upgraderAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, WORK, WORK, CARRY], undefined, { role: 'upgrader' } );
            console.log('Spawning new upgrader: ', name);
        } else if (attackers.length < attackerAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, MOVE, ATTACK, ATTACK], undefined, { role: 'attacker' } );
            console.log('Spawning new attacker: ', name);
        } else if (builders.length < builderAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, WORK, WORK, CARRY], undefined, { role: 'builder' } );
            console.log('Spawning new builder: ', name);
        }
    }
    
};