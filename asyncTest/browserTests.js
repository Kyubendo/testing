let assert = chai.assert;

describe('loadScript', function(){
  it('callback called once', function(done){
    var callback = sinon.spy();
    loadScript('script.js', ()=>{
      callback();
      assert.equal(callback.callCount, 1);
      done();
    });
  });
});
