# Rollup学习系列1-tree-sharking的来源

最近在公司用 Rollup 写了个 npm sdk的模板，配置规则非常少,感觉还是挺有意思的,写写 Rollup,
Rollup 是2015出现的(Github上翻到 2015.5.21第一个tag,ES6是2015年出现的,Webpack 是2013年出来的,注意这个时间点哦,后面会讲) 
号称下一代 ES Module 打包,Vue,React 都换成了 Rollup 打包,现在主流的玩法都是 Rollup 负责打包 
库,Webpack 负责打包项目,Rollup 最大的特点就是 支持 tree sharking 功能,意思是能把你没用到的代码去掉,让包的体积变小
经常看 npm 第三方库的同学肯定会发现 很多库的 package.json 有个 main 和 module 入口 
```
// package.json

{
  "name": "npm-sdk-template",
  "version": "1.0.9",
  "description": "npm sdk template",
  "main": "./lib/index.cjs.js",
  "module": "./es/index.esm.js",
}
```
main 这个很好理解，主入口文件， 那 module 是个啥玩意，module 在 npm 的官网配置文件中是没有的,是 rollup 定义的一个字段,目前 webpack 也已经采用了,用这个入口文件,就代表用的是 ES写法,支持 tree sharking,下面就来聊聊 tree sharking

大家知道 ES6 是 2015 年出来的,最大的变化就是 定义了 JavaScript 模块化机制,类似 `import {ajax} from './utils'` ,在这之前都是社区定义的各种规范,使用最多的是 Node.js 的 Commonjs 模块机制 `var utils = require('./utils')`
 ES6 模块最大的特点是静态的!,静态的!,静态的!,强调 3 遍,很重要哈,Commonjs 是个动态的,看个例子

 ```
 if (pastTheFold === true) {
  let parallax =  require('./parallax') 
  // 在Common.js 规范里 是没问题,大家经常写
}

if (pastTheFold === true) {
  import parallax from  './parallax'
   // 这里运行起来是会报错的,不支持这种引入，只能放在 头部
}
 ```
 正是由于 ES6 模块的静态特点， 才能在打包的过程的去分析标记依赖了哪些 function, 然后把没用到的 fuction 给剔除掉,类似

 ```
  // util.js

    function ajax() {
        console.log(13);
    }
    function test() {
        console.log(56);
    }
    export {
        ajax,
        test
    }
 // index.js
 import {ajax} from './util'

ajax();

经过 tree sharking 后 如下
//dist/index.esm.js

    function ajax() {
    console.log(13);
    }

    ajax();
 ```

 可以看到 这样就把 没用到 test function 给 剔除掉了,打出来的包就很小
 所以 Vue, React 开发者们能不喜欢么，赶紧迁到了 Rollup

那我们思考下,为什么 Webpack 一开始不支持 tree sharking(后来是支持的) ,这个不是它不想支持，是它没办法
Webpack 是在 2013 年出来的,ES6 是 2015年出来的,所以没得法呀,(Webpack的出现也很有意思,谁能想到它是从 Java 的 GWT 衍生来的,后面有机会单独一篇讲 Webpack 的历史 ),就是 因为 ES6 的这个特性,才出现了 Rollup ,为 npm 库开发而生

网上有讨论,Rollup 和 Webpack 谁取代谁的问题, 不存在滴,使用场景不同,Rollup 写组件, Webpack 用来开发项目了

有的人以为只要项目用了Rollup,module入口方式 ,简单配配就能 tree sharking 么, 
图样图破森,那是不可能的, 支持 tree sharking 是对代码写法,格式有要求的,下篇讲 怎么样的写法,才比较好的支持 tree sharking

所以记得关注我哦
