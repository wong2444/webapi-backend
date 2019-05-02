const assert = require('chai').assert;
//const sayHello = require('../app').sayHello;
//const addNumbers = require('../app').addNumbers;
const ArticlesController = require('../controllers/articles')

// Results

addNumbersResult = app.addNumbers(5, 5);

describe('App', function () {
    describe('articles_get_all()', function () {
        it('string return', function () {
            //let result = app.sayHello();
            assert.typeOf(ArticlesController.articles_get_all(), 'string');
        });


    });

});
