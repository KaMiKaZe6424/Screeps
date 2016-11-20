module.exports = {
    
    check: function () {
        
        var harvesterSpawnAmount = 2;
        var harvesterExtAmount = 2;
        var builderAmount = 3;
        var upgraderAmount = 2;
        var attackerAmount = 2;
        
        var sHarS = false;
        var sHarE = false;
        var sUp = false;
        var sAtt = false;
        var sBuil = false;
        
        var deaths = '';
        
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                if (deaths.length > 0) deaths += ', ' + name;
                else deaths += name;
            }
        }
        
        var shortest = 1500;
        
        for (let vname in Game.creeps) {
            if (Game.creeps[vname].ticksToLive < shortest) shortest = Game.creeps[vname].ticksToLive;
        }
        
        console.log('\tDeaths: ' + (deaths.length > 0 ? deaths : 'No deaths since last tick. Next creep dies in ' + shortest + ' ticks at most.'));
        
        var harvestersSpn = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester.spawn').length;
        var harvestersExt = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester.extension').length;
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder').length;
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader').length;
        var attackers = _.filter(Game.creeps, (creep) => creep.memory.role == 'attacker').length;
        
        if (harvestersSpn < harvesterSpawnAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, WORK, WORK, CARRY, CARRY, MOVE], undefined, { role: 'harvester.spawn', working: true } );
            sHarS = true;
        } else if (harvestersExt < harvesterExtAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, WORK, WORK, WORK, CARRY], undefined, { role: 'harvester.extension', working: true } );
            sHarE = true;
        } else if (upgraders < upgraderAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, WORK, WORK, CARRY, WORK], undefined, { role: 'upgrader', working: true } );
            sUp = true;
        } else if (attackers < attackerAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, MOVE, ATTACK, ATTACK, ATTACK], undefined, { role: 'attacker' } );
            sAtt = true;
        } else if (builders < builderAmount) {
            var name = Game.spawns['Spawn1'].createCreep([MOVE, WORK, WORK, CARRY, CARRY], undefined, { role: 'builder', building: false } );
            sBuil = true;
        }
        
        var mHar = 300 - Game.spawns['Spawn1'].room.energyAvailable;
        var mBuil = 300 - Game.spawns['Spawn1'].room.energyAvailable;
        var mUp = 300 - Game.spawns['Spawn1'].room.energyAvailable;
        var mAtt = 280 - Game.spawns['Spawn1'].room.energyAvailable;
        
        console.log('Creeps: Excpected:', (harvesterSpawnAmount+harvesterExtAmount+builderAmount+upgraderAmount+attackerAmount), 'Alive:', (harvestersSpn+harvestersExt+builders+upgraders+attackers),
                    '\n\tHarvester (Spawn):\n\t\tExpected:', harvesterSpawnAmount, 'Alive:', harvestersSpn, sHarS ? 'Spawning... (' + mHar + ' Energy missing)' : ' ',
                    '\n\tHarvester (Extensions):\n\t\tExpected:', harvesterExtAmount, 'Alive:', harvestersExt, sHarE ? 'Spawning... (' + mHar + ' Energy missing)' : ' ',
                    '\n\tUpgrader:\n\t\tExpected:', upgraderAmount, 'Alive:', upgraders, sUp ? 'Spawning... (' + mUp + ' Energy missing)' : ' ',
                    '\n\tAttacker:\n\t\tExpected:', attackerAmount, 'Alive:', attackers, sAtt ? 'Spawning... (' + mAtt + ' Energy missing)' : ' ',
                    '\n\tBuilder:\n\t\tExpected:', builderAmount, 'Alive:', builders, sBuil ? 'Spawning... (' + mBuil + ' Energy missing)' : ' ');
    }
    
};