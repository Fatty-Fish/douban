# douban
仿写豆瓣音乐页面
#### 技术
HTML + CSS3 + JS + jQuery

#### 突破点

这个是比较久以前写的，技术还不是很成熟，刚了解了 CSS3 和 jQuery 的部分功能，页面里有一个轮播图，有自己画的小图标，搜索框利用豆瓣开放的 API 和 jQuery 的 ajax 函数做了正确的搜索功能。算是一个比较全面的页面。

#### 效果展示

页面大概长这样，因为太多信息，所以同一个功能区域下，我采用了相同的信息代替豆瓣页面中五花八门的歌曲信息。图片由页面上到下，省略重复：<br/>
图一：
<img src = "https://github.com/Fatty-Fish/douban/raw/master/images/1.png" height = "300px"/><br/>
图二：
<img src = "https://github.com/Fatty-Fish/douban/raw/master/images/2.png" height = "300px"/><br/>
图三：
<img src = "https://github.com/Fatty-Fish/douban/raw/master/images/3.png" height = "300px"/><br/>

#### 总结
***CSS 上***，运用了伪类选择器，条件选择器，用伪元素清除浮动流，flex 布局，用 border-width 配合 border-color 画出箭头图标。CSS 对于页面外观，用户体验是非常重要的，主要靠使用经验。
***HTML*** 需要考虑包几层好，即不会增加页面累赘，也会更好的实现 CSS 样式。总之，HTML + CSS 的使用，我还需要进一步的练习，累积经验。
***页面重复*** 重复的页面，比如各种ul、li，我用js封装了函数，在页面初始化时执行函数来创建她们。省力一些。
***轮播图*** 豆瓣页面的轮播图，是用引用了jQuery.easing.js。用animate函数实现的。单纯的滑动很简单，点击右键向右滑动，点击图片下方的标识点（point）跳转到对应的图片也很简单，就是改变index，但有一点要控制：当快速点击右键操作时，图片会争抢着展现，最后会出现“断片”，所以加了一个lock，只有当前一张图片改变完了状态，才会开锁，让下一张图片改变位置。而在这期间鼠标点击右键的操作都是无效的。豆瓣做完后，我另外做了一个优酷轮播图，把方法封装了一下。优酷轮播图也可以在此仓库中看到。
***搜索框数据请求***，主要利用了 jQuery 的 ajax 函数。由于浏览器的跨域限制，我当时想到了几种方法用来解决：
##### jsonp
以前，跨域我总会先想到 jsonp ，但是经过这个豆瓣项目的实战，牢牢的记住了：jsonp 跨域需要先与后台说好，后台需要配合。如下图，是我动态创建 script 标签，然后向脚本传入一个aa函数，但是报错<br/>
```js
function aa (data) {
    console.log(JSON.parse(data));
}
var oScript = document.createElement("script");
oScript.src = "https://api.douban.com/v2/music/search?q="+ item + "&count=7" + "&cb=aa";
document.body.appendChild(oScript);
document.body.removeChild(oScript);

```
<img src = "https://github.com/Fatty-Fish/douban/raw/master/images/jsonError.png" height = "200px"/><br/>
我会以为我语法错了，或者编译器没保存，再检查一遍，还是同样的错误，说多了一个不可识别到的“ ：”后来经过多方查找，最后在[菜鸟教程](http://www.runoob.com/json/json-jsonp.html)中找到了答案。

##### 服务器代理中转
这个也是 pass 掉，因为我并不是豆瓣内部人员啊，，，
但是讲讲原理。跨域限制是存在于浏览器与浏览器之间的，为了防止恶意植入脚本，恶意攻击，信息泄露。但服务器之间不存在跨域限制。所以浏览器可以先访问一下当前服务器，然后服务器里被访问的文件里再访问另一个服务器，返回的值传入浏览器。

其他还有很多方法，但不适用于仿写豆瓣，所以。。。

##### $.ajax()
jQuery 函数的方法，与正常 ajax 使用一样，有回调函数。但正常 ajax 函数无法跨域，jQuery封装的可以跨域。。。太强大

