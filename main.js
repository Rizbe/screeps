var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');


module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


    var enn = Game.rooms['W3N7'].find(FIND_SOURCES_ACTIVE);
    console.log("Length of active source:"+enn.length)
    console.log(enn[0])



    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    var upgrader = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgrader: ' + upgrader.length);

    var builder = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builder: ' + builder.length);

    if(harvesters.length < 20) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Brooklyn'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    if(upgrader.length < 8) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spwning new upgrader: ' + newName);
        Game.spawns['Brooklyn'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }

    if(builder.length < 8) {
        var newName = 'Builder' + Game.time;
        console.log('Spwning new builder: ' + newName);
        Game.spawns['Brooklyn'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }

    console.log("Harvesters:"+harvesters.length+" | Upgrader:"+upgrader.length+" | Builder:"+builder.length)

    if(Game.spawns['Brooklyn'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Brooklyn'].spawning.name];
        Game.spawns['Brooklyn'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Brooklyn'].pos.x + 1,
            Game.spawns['Brooklyn'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
