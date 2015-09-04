/*
Task 1
 Create a function that:
 *   Takes an array of students
 *   Each student has a `firstName` and `lastName` properties
 *   **Finds** all students whose `firstName` is before their `lastName` alphabetically
 *   Then **sorts** them in descending order by fullname
 *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
 *   Then **prints** the fullname of founded students to the console
 *   **Use underscore.js for all operations**
 */

var _ = require('underscore');

function getRandomStudents(){
    var firstNames = ['Jamie', 'Jeremy', 'Cesar', 'Josefina', 'Jeffery', 'Jenny', 'Nellie', 'Mark', 'Pesho', 'Ivan', 'Stoyan'],
        lastNames = ['Gray', 'Brown', 'Black', 'White', 'Dimitrov', 'Pink', 'Ivanov', 'Green', 'Petrov', 'Light', 'Dark'],
        students = [],
        random = Math.random() * firstNames.length | 0;

    for (var i = 0; i < 10; i++) {
        random = (random + i) % firstNames.length;
        students.push({
            firstName: firstNames[random]
        });
        random = (random + i) % lastNames.length;
        students[i].lastName = lastNames[random];
        students[i].fullName = students[i].firstName + ' ' + students[i].lastName;

    }
    return students;
}

    function solveTaskOne(students) {
         var filtered = _.filter(students, function(student){
            return student.firstName < student.lastName;
        });

        var ordered = _.sortBy(filtered, function(st){
            return st.fullName;
        });

        _.chain(ordered)
            .pluck('fullName')
            .each(function(fullname){
                console.log(fullname);
            })
    }


solveTaskOne(getRandomStudents());
console.log('*********************************');

/*
Task 2
 Create a function that:
 *   Takes an array of students
 *   Each student has a `firstName`, `lastName` and `age` properties
 *   **finds** the students whose age is between 18 and 24
 *   **prints**  the fullname of found students, sorted lexicographically ascending
 *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
 *   **Use underscore.js for all operations**
 */

function getStudentsWithAge(){
    var students = getRandomStudents(),
        rand;
    for (var i = 0; i < students.length; i++) {
        rand = Math.random() * (35 - 17) + 17 | 0;
        students[i].age = rand;
    }
    return students
}

function solveTaskTwo(students){

     _.chain(students)
        .filter(function(st){
            return st.age >= 18 && st.age <= 24;
        })
        .sortBy('fullName')
        .each(function(st){
            console.log(st.fullName + ' ' + st.age);
        })
}

solveTaskTwo(getStudentsWithAge());
console.log('*********************************');
/*
Task 3
 Create a function that:
 *   Takes an array of students
 *   Each student has:
 *   `firstName`, `lastName`, `age` and `marks` properties
 *   `marks` is an array of decimal numbers representing the marks
 *   **finds** the student with highest average mark (there will be only one)
 *   **prints** to the console  'FOUND_STUDENT_FULLNAME has an average score of MARK_OF_THE_STUDENT'
 *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
 *   **Use underscore.js for all operations**
 */

function getStudentsWithMarks(){
    var students = getStudentsWithAge(),
        rnd;
    for (var i = 0; i < students.length; i++) {
        students[i].marks = [];
        for (var j = 0; j < 5; j++) {
            rnd = Math.random() * (7 - 2) + 2 | 0;
            students[i].marks.push(rnd);
        }
    }
    return students;
}

function solveTaskThree(students){
    var bestStudent =  _.chain(students)
                        .each(function(st){
                        var sumMarks = _.reduce(st.marks, function(sum, mark){
                            return sum + mark;
                        }, 0);
                        st.averageMark = sumMarks / st.marks.length;
                    })
                        .sortBy('averageMark')
                        .value()[students.length - 1];

    console.log(bestStudent.fullName + ' has an average score of ' + bestStudent.averageMark);
}

solveTaskThree(getStudentsWithMarks());



