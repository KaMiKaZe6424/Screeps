module.exports = {
    
    check: function () {
        
        var harvesterAmount = 4;
        var builderAmount = 3;
        var upgraderAmount = 2;
        var attackerAmount = 5;
        
        var sHar = false;
        var sUp = false;
        var sAtt = false;
        var sBuil = false;
        
        
        
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
        
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester').length;
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker').length;
        
        if (harvesters < harvesterAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, WORK, WORK, CARRY], undefined, { role: 'harvester' } );
            sHar = true;
        } else if (upgraders < upgraderAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, WORK, WORK, CARRY], undefined, { role: 'upgrader' } );
            sUp = true;
        } else if (attackers < attackerAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, MOVE, ATTACK, ATTACK], undefined, { role: 'attacker' } );
            sAtt = true;
        } else if (builders < builderAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, WORK, WORK, CARRY], undefined, { role: 'builder' } );
            sBuil = true;
        }
        
        console.log('Creeps: Excpected:', (harvesterAmount+builderAmount+upgraderAmount+attackerAmount), 'Alive:', (harvesters+builders+upgraders+attackers),
                    '\n\tHarvester:\n\t\tExpected:', harvesterAmount, 'Alive:', harvesters, sHar ? 'Spawning...' : ' ',
                    '\n\tUpgrader:\n\t\tExpected:', upgraderAmount, 'Alive:', upgraders, sUp ? 'Spawning...' : ' ',
                    '\n\tAttacker:\n\t\tExpected:', attackerAmount, 'Alive:', attackers, sAtt ? 'Spawning...' : ' ',
                    '\n\tBuilder:\n\t\tExpected:', builderAmount, 'Alive:', builders, sBuil ? 'Spawning...' : ' ');
    }
    
};