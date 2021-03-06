export {
  myMath,
  objSkip,
  pow,
  func,
  callFun,
  reverseStr,
  requestFunc,
  $
}

import jquery = require('jquery');


import { JSDOM } from 'jsdom';
const { window } = new JSDOM('<!doctype html><html><body></body></html>');

declare global {
  namespace NodeJS {
    interface Global {
       document: Document;
       window: Window;
       navigator: Navigator;
    }
  }
}
global.document = window.document;
global.window = window;

const $ = jquery(global.window);

declare global {
  namespace NodeJS {
    interface Global {
       document: Document;
       window: Window;
       navigator: Navigator;
    }
  }
}
global.document = window.document;
global.window = window;

var myMath = {
  mult: function (num1:number, num2:number):number {
    if (objSkip.skipFunc())   return num1 * num2;
  }
}

var objSkip = {
  skipFunc: function():boolean {
      console.log("skipFunc working");
      return false;
  }
}


function pow(x:number, n:number):number {
  if (n <= 0) return NaN;
  if (Math.round(n) !=n) return NaN;
  var result = 1;

  for (let i = 0; i < n; i++) {

    try {
      result = myMath.mult(result, x);

    } catch (e) {
      console.log('error: '+ e);
      return e;
    }
  }
  return result;
}

function func():void{
  console.log("test");
}


function callFun( func:()=>void ):void {
  if (objSkip.skipFunc()) {
    func();
  }
}


function reverseStr(str:string):string {
  if (typeof(str)!='string') throw new Error('this is not a string');
  var result:string = '';
  for (let i = str.length-1; i>=0; i--) {
    result+=str[i];
  }

  return result;
}

function requestFunc(name:string, callback:()=>void):void {
  $.ajax({
    url: 'this/'+name+'/lll',
    succsess: callback
  });
  callback();
  console.log('requestFunc working');
}
