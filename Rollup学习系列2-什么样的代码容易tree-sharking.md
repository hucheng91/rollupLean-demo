# Rollup学习系列2-什么样的代码容易tree-sharking

[Rollup学习系列1-tree-sharking的来源](http://mp.weixin.qq.com/s?__biz=MzAwOTkzNDc0Mg==&mid=2247483789&idx=1&sn=0709788861ea9862abdc52961ace043a&chksm=9b594374ac2eca62c9f67ac00774c1bcd2fc8f64747dd61e29e17543f017b5050dac4b09c742&token=1929377709&lang=zh_CN#rd)

上篇讲了下 tree sharking 来源于 ES6 的静态引入，这篇讲下什么样的代码才能更好的支持 tree sharking

主要有3点
- 自己的代码只引用需要用到的 function
- 避免使用 Class
- 第三方库要注意

**只引用你需要用到的 function,不要瞎鸡儿引用**

先来个例子 

```
 //util.js
 export function test1(){
   console.log("test1");
 }
 export function test2(){
   console.log("test2")
 }

 // main.js
 import{test1} from './util'
 test1() 
```
这种方式打包后是这个样子
```
 // build.js

 function test1() {
  console.log("test1");
}

test1();

```
假设 是下面这种引入方式

```
// main.js
 import * as utli from './util'
 utli.test1() 
```
打包出来是这个样子
```
 // build.js

 function test1() {
  console.log("test1");
}
 function test2() {
  console.log("test2");
}
test1();
```

明显第一种才是我们需要的，所以记住哈，只引用你需要的


## 组件里不要使用 Class

还是来个例子

``` 
export default class Demo {

    test1(){
        console.log("test1");
    }
    test2(){
        console.log("test2");
    }
} 

// main.js
 import Demo utli from './Demo'
 (new Demo()).test1() 
```

生成后的代码

```
 _createClass(Demo, [{
    key: "test1",
    value: function test1() {
      console.log("test1");
    }
  }, {
    key: "test2",
    value: function test2() {
      console.log("test2");
    }
  }]);

  return Demo;
}();

// import * as utils from './util'
new Demo().test1();
```
可以看到把 test1，test2 都打进去了,所以在写库,组件的时候不推荐使用 Class,当然如果项目里有用到 Webpack, Webpack 最后还是能把 test2 给剔除的,但在构建库的时候，能少些代码就少些代码


## 第三方库使用

这里我们用 lodash 举例,lodash 是 用 commonjs 规范写的，社区有 `lodash-es`,举个例子

```
 import sortBy from "lodash-es" // 这样会把很多多余的代码也带进来

 import sortBy from "lodash-es/sortBy" // 这样不会
 
 
```
类似的第三方库还有`Rxjs`,所以在使用的时候要注意了

以上几点注意,基本在使用 Rollup 的过程中，都能很好的构建支持 tree sharking

