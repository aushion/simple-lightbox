# simple-lightbox.js

<h3>轻量</h3>
这是一个用纯原生js编写的一个lightbox插件，无需引用过多的css，你仅仅需要引入这个js文件即可

![示例](https://github.com/aushion/markdownPictures/blob/master/TIM%E6%88%AA%E5%9B%BE20171206150822.png)
<!-- ![image](https://github.com/flouthoc/Uglipop.js/blob/master/shot.png) -->

<h3>如何调用</h3>
在header标签里引用插件

~~~html
 <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="lightbox.js"></script>  
</head>

<body>
    <div class="test">
        <img src="1.jpg" alt="">
        <img src="3.jpg" alt="">
    </div>
</body>
~~~
直接调用previewImage方法参数传入需要预览img标签的父元素id或者className或者标签名
```javascript
   <script>
      previewImage('.test')
   </script>        

```
