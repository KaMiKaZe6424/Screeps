module.exports = {
    
    
    run: function (creep) {
        var friends = ['S4nvers', 'SunFusion'];
        
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        
        for (let i = 0; i < enemies.length; i++) {
            var isFriend = false;
            for (let j = 0; j < friends.length; j++) {
                if (enemies[i].owner.username == friends[j]) isFriend = true;
            }
            if (isFriend == true) break;
        }
        
        if (enemies.length > 0 && !isFriend) {
            if (creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemies[0]);
            }
        } else {
            creep.moveTo(41, 21);
        }
        
    }
    
};