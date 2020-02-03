import sinon = require('sinon');
import assert = require('assert');
import jquery = require('jquery');
import 'mocha';



import * as funcs from './functions';
import * as appF from './asyncTest/app';



describe('mult function', function() {

  before(() => {
    var stubSkipFunc: sinon.SinonStub = sinon.stub(funcs.objSkip, "skipFunc");
    stubSkipFunc.returns(true);
  });

  after(() => {
    (funcs.objSkip.skipFunc as any).restore();
  });

  it('4 * 5 = 20', function() {
    assert.equal(funcs.myMath.mult(4, 5), 20);
  })
  it('non-numbers return NaN', function() {
    var stringVal: any = 'hello';
    assert.equal(isNaN(funcs.myMath.mult(4, stringVal)), true)
  });

});


describe('pow function', function() {
  var stubMult: sinon.SinonStub;
  before(() => {
    stubMult = sinon.stub(funcs.myMath, "mult");
    var stubSkipFunc: sinon.SinonStub = sinon.stub(funcs.objSkip, "skipFunc");
    stubSkipFunc.returns(true);
  });

  after(() => {
    (funcs.objSkip.skipFunc as any).restore();
  });

  it('2 to the power of 1 returns 2 (stub)', function() {

    stubMult.withArgs(1, 2).returns(2);
    assert.equal(funcs.pow(2, 1), 2);
    (funcs.myMath.mult as any).restore();
  });



  it('2 to the power of string "3" returns 8', function() {
    var strNum: any = '3';
    assert.equal(funcs.pow(2, strNum), 8);

  });

  describe('number of calls', function() {
    var multCount = [1, 2, 6, 3];

    multCount.forEach((x) => {

      it(`2 to the power of ${x} called mult ${x} times`, function() {
        var multSpy = sinon.spy(funcs.myMath, "mult");

        funcs.pow(2, x);
        assert.equal(multSpy.callCount, x);
        (funcs.myMath.mult as any).restore();
      });
    });
  });



describe('should return NaN', function(){
  var nanIn: any[] = ['hello', '', '###', '4+2'];

  nanIn.forEach((input) => {
    it(`${input} return NaN`, function() {
      assert.equal(isNaN(funcs.pow(3, input)), true)
    });
  }
  );

  var ex = [0, -3, 2.4, -6.7];
  ex.forEach((num) => {

    it(`2 to the power of ${num} return NaN`, function() {

      assert.equal(isNaN(funcs.pow(2, num)), true);
    });
  });
});

});

describe("callFun function", function() {

  after(() => {
    (funcs.objSkip.skipFunc as any).restore();
  });

  it("func called once", function() {
    var funcSpy: sinon.SinonSpy = sinon.spy(funcs.func);
    var skipFuncStub = sinon.stub(funcs.objSkip, "skipFunc");
    skipFuncStub.returns(true);
    funcs.callFun(funcSpy);
    sinon.assert.calledOnce(funcSpy);
  });
});

describe("error throwing", function() {
  it("mult throws error", function() {
    var multStub: sinon.SinonStub = sinon.stub(funcs.myMath, 'mult');
    var err: string = 'testError';
    multStub.throws(err);
    assert.equal(funcs.pow(4, 3), err);
    (funcs.myMath.mult as any).restore();
  });
});

describe("mock testing", function() {
  it('4 * 2 returns 27 (mock)', function() {
    var myMathMock: sinon.SinonMock = sinon.mock(funcs.myMath);
    myMathMock.expects('mult').withArgs(4, 2).returns(27);

    console.log(funcs.myMath.mult(4, 2));
    myMathMock.restore();
    myMathMock.verify();
  });
  it('pow calls mult(2,5) 2-6 times', function() {
    var myMathMock: sinon.SinonMock = sinon.mock(funcs.myMath);
    myMathMock.expects('mult').atLeast(2).atMost(6);
    funcs.pow(2, 5);
    myMathMock.restore();
    myMathMock.verify();
  });
});

describe('reverse function', function(){
  it('hello returns olleh', function(){
    assert.equal(funcs.reverseStr('hello'), 'olleh');
  });
  it('throws error if input is not a string', function(){
    var num:any = 5;
    assert.throws(function(){funcs.reverseStr(num)}, Error);
  });
});

describe('fake request', function(){
  it('request called with ... arguments', function(){
    console.log( jquery().jquery)
    funcs.requestFunc('nAmE', funcs.func);
    sinon.replace(jquery, 'ajax', sinon.fake());
    funcs.requestFunc('nAmE', sinon.fake());
    assert(jquery.ajax.calledWithMatch({url: 'qwe/nAmE/lll'}));
  });
});
