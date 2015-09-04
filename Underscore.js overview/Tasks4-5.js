/*
 Create a function that:
 *   **Takes** an array of animals
 *   Each animal has propeties `name`, `species` and `legsCount`
 *   **groups** the animals by `species`
 *   the groups are sorted by `species` descending
 *   **sorts** them ascending by `legsCount`
 *	if two animals have the same number of legs sort them by name
 *   **prints** them to the console in the format:
 ```
 ----------- (number of dashes is equal to the length of the GROUP_1_NAME + 1)
 GROUP_1_NAME:
 ----------- (number of dashes is equal to the length of the GROUP_1_NAME + 1)
 NAME has LEGS_COUNT legs //for the first animal in group 1
 NAME has LEGS_COUNT legs //for the second animal in group 1
 ----------- (number of dashes is equal to the length of the GROUP_2_NAME + 1)
 GROUP_2_NAME:
 ----------- (number of dashes is equal to the length of the GROUP_2_NAME + 1)
 NAME has LEGS_COUNT legs //for the first animal in the group 2
 NAME has LEGS_COUNT legs //for the second animal in the group 2
 NAME has LEGS_COUNT legs //for the third animal in the group 2
 NAME has LEGS_COUNT legs //for the fourth animal in the group 2
 ```
 *   **Use underscore.js for all operations**
 */

var _ = require('underscore');

var animals = [{
    name: 'frog',
    species : 'Amphibians',
    legsCount : 4
}, {
    name: 'salamander',
    species : 'Amphibians',
    legsCount : 4
}, {
    name: 'songbird',
    species : 'Birds',
    legsCount : 2
}, {
    name: 'waterfowl',
    species : 'Birds',
    legsCount : 2
}, {
    name: 'shark',
    species : 'Fish',
    legsCount : 0
}, {
    name: 'salmon',
    species : 'Fish',
    legsCount : 0
}, {
    name: 'butterfly',
    species : 'Insect',
    legsCount : 6
}, {
    name: 'caterpillar',
    species : 'Insect',
    legsCount : 16
}, {
    name: 'dog',
    species : 'Mammals',
    legsCount : 4
}, {
    name: 'cat',
    species : 'Mammals',
    legsCount : 4
}, {
    name: 'ant',
    species : 'Insect',
    legsCount : 8
}, {
    name: 'bug',
    species : 'Insect',
    legsCount : 10
}];

function solveTaskFour(animals){
    var sorted = _.sortBy(animals, 'species');
        sorted.reverse();

    var grouped = _.groupBy(sorted, 'species');

     _.each(grouped, function(value, key){
        value = _.chain(value)
            .sortBy('name')
            .sortBy('legsCount')
            .value();
         console.log(new Array(key.length + 2).join('-'));
         console.log(key + ':');
         console.log(new Array(key.length + 2).join('-'));
         _.each(value, function(animal){
             console.log(animal.name + ' has ' + animal.legsCount + ' legs');
         })
    });
}

solveTaskFour(animals);
console.log('**************************');

function solveTaskFive(animals){

    var numberOfLegs = _.reduce(animals, function(sum, animal){
        return sum + animal.legsCount;
    }, 0);
    console.log('Total number of legs: ' + numberOfLegs)
}
solveTaskFive(animals);