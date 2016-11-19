var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if (creep.memory.working && creep.carry.energy == creep.carryCapacity) creep.memory.working = false;
        if (!creep.memory.working && creep.carry.energy == 0) creep.memory.working = true;
        
	    if(creep.memory.working) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1]);
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                            structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    if (targets[0].energy == targets[0].energyCapacity) {
                        creep.moveTo(30, 26);
                    } else {
                        creep.moveTo(targets[0]);
                    }
                }
            }
        }
	}
};

module.exports = roleHarvester;