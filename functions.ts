export var myMath = {
  mult: function (num1:number, num2:number):number {
    if (objSkip.skipFunc())   return num1 * num2;
  }
}

export var objSkip = {
  skipFunc: function():boolean {
      console.log("skipFunc working");
      return false;
  }
}


export function pow(x:number, n:number):number {
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

export function func():void{
  console.log("test");
}


export function callFun( func:()=>void ):void {
  if (objSkip.skipFunc()) {
    func();
  }
}


export function reverseStr(str:string):string {
  if (typeof(str)!='string') throw new Error('this is not a string');
  var result:string = '';
  for (let i = str.length-1; i>=0; i--) {
    result+=str[i];
  }

  return result;
}
