require('role.harvester');

module.exports.loop = function () {
   
    
   for (let name in Game.creeps){
        var creep = Game.creeps[name];
        role.harvester.run(creep);
   }
    
}