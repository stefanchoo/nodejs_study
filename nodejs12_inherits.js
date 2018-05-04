var util = require('util')

function Base() {
    this.name = 'base'
    this.base = 1991
    this.sayHello = () => console.log('Hello ' + this.name)
}

Base.prototype.showName = function () {
    console.log(this.name)
}

function Sub() {
    this.name = 'sub'
}

// Sub仅能集成Base在原型中定义的函数，而构造内部的函数没有被继承
util.inherits(Sub, Base)
var objBase = new Base()
objBase.showName()
objBase.sayHello()
console.log(objBase)

var objSub = new Sub()
objSub.showName()
// objSub.sayHello()  // error
console.log(objSub)

function Person() {
    this.name = 'byvoid'
    this.toString = function () {
        return this.name
    }
    this.one = new Base()
}

var obj = new Person()
// util.inspect(object,[showHidden],[depth],[colors])
// showHidden: true 输出更多隐藏信息
// depth: 递归层数，默认两层
// color: 输出格式采用 ANSI 颜色编码，在终端有更漂亮的效果
console.log(util.inspect(obj))
console.log(util.inspect(obj, true, 3, true))

console.log(util.isArray([]))
console.log(util.isArray(new Array))
console.log(util.isArray({}))

// true
console.log(util.isRegExp(/some regexp/))
// true 
console.log(util.isRegExp(new RegExp('another regexp')))
// false 
console.log(util.isRegExp({}))

// true
console.log(util.isDate(new Date()))
// false (without 'new' returns a String)
console.log(util.isDate(Date()))
// false
console.log(util.isDate({}))

// true
console.log(util.isError(new Error()))
// true
console.log(util.isError(new TypeError()))
// false
console.log(util.isError({
    name: 'Error',
    message: 'an error occurred'
}))
