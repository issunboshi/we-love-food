var client              = require('../client').client,
    chai                = require('chai'),
    assert              = chai.assert,
    expect              = chai.expect;

var pageUrl             = process.env.TEST_ROOT_URL;

describe('Bootstrap init test', function(){

    before(function(done) {
        client.init(done);
    });

    beforeEach(function() {
        client.url(pageUrl);
    });


    it('should display the correct h1', function(done) {
        
        client.getText('h1', function(err, text) {
            expect(text).to.equal('Food recomendations');
        });
        done();
    });

    describe('Body', function(){

        it('should have a js class',function(done) {

            client.getTagName('.js', function(err, tagName) {
                expect(err instanceof Error).to.be.false;
                expect(tagName).to.be.equal('html');
            });

            done();
        });        
    });

    after(function(done) {
        client.end();
        done();
    });
});
