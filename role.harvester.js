/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
      var currentEnergy = Game.rooms['W2N5'].energyAvailable
      var totalEnergy = Game.rooms['W2N5'].energyCapacityAvailable
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
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
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if (currentEnergy == totalEnergy){
              if(creep.carry.energy == creep.carryCapacity) {
                  creep.say('⚡ upgrade');
              }

                  if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                  }

              else {
                  var sources = creep.room.find(FIND_SOURCES);
                  if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                  }
            }
        }
    }
}
};

module.exports = roleHarvester;
