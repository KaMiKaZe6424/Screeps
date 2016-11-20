var roleHarvesterSpn = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.ticksToLive < 40) {
            if (creep.energy > 0) {
                if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            } else {
                creep.suicide();
            }
        } else {
            
            if (creep.memory.working && creep.carry.energy == creep.carryCapacity) creep.memory.working = false;
            if (!creep.memory.working && creep.carry.energy == 0) creep.memory.working = true;
            
            if(creep.memory.working) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0]);
                }
            }
            else {
                var targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_SPAWN) &&
                                structure.energy < structure.energyCapacity;
                        }
                });
                if(targets.length > 0) {
                    if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0]);
                    }
                } else {
                    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
            }
        }
        
	}
};

module.exports = roleHarvesterSpn;