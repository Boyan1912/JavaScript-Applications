/*
 Create a function that:
 *   **Takes** a collection of books
 *   Each book has propeties `title` and `author`
 **  `author` is an object that has properties `firstName` and `lastName`
 *   **finds** the most popular author (the author with biggest number of books)
 *   **prints** the author to the console
 *	if there is more than one author print them all sorted in ascending order by fullname
 *   fullname is the concatenation of `firstName`, ' ' (empty space) and `lastName`
 *   **Use underscore.js for all operations**
 */

var _ = require('underscore');

var books = [{
    title : 'b1',
    author : {
        firstName : 'John',
        lastName: 'Johnson'
    }
}, {
    title : 'b2',
    author : {
        firstName : 'John',
        lastName: 'Johnson'
    }
}, {
    title : 'b3',
    author : {
        firstName : 'Jim',
        lastName: 'Johnson'
    }
}, {
    title : 'b4',
    author : {
        firstName : 'Adam',
        lastName: 'Johnson'
    }
}, {
    title : 'b5',
    author : {
        firstName : 'John',
        lastName: 'Johnson'
    }
}, {
    title : 'b6',
    author : {
        firstName : 'Adam',
        lastName: 'Johnson'
    }
}, {
    title : 'b7',
    author : {
        firstName : 'Adam',
        lastName: 'Johnson'
    }
}];

function solveTaskSix(books){
    var booksCountPerAuthor,
        bestCount = 0,
        mostPopularAuthors = [];
    _.each(books, function(book){
        book.author.fullName = book.author.firstName + ' ' + book.author.lastName;
    });

    _.each(books, function(book){
        booksCountPerAuthor = _.filter(books, function(b){
            return b.author.fullName === book.author.fullName;
        }).length;

        if (booksCountPerAuthor === bestCount){
            if (!_.contains(mostPopularAuthors, book.author.fullName)){
                mostPopularAuthors.push(book.author.fullName);
            }
        }else if (booksCountPerAuthor > bestCount){
            bestCount = booksCountPerAuthor;
            mostPopularAuthors.splice(0, mostPopularAuthors.length, book.author.fullName);
        }
    });
    _.chain(mostPopularAuthors)
        .sortBy()
        .each(function(authorName){
            console.log(authorName);
        })
}
solveTaskSix(books);