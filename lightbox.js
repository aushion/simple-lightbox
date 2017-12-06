(function (w, doc) {
    "use strict";
    var initted = false;
    //封装的事件处理函数
    function on(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function () {
                handler.call(el)
            })
        }
    }
    //初始化操作
    function init() {
        if (initted) {
            return;
        }
        initted = true;
        //遮罩层
        var mask = doc.createElement('div');
        //图片外框
        var imgWrapper = doc.createElement('div');
        //图片标签
        var imgTag = doc.createElement('img');
        //设置几个标签的ID
        imgWrapper.id = 'imgWrapper';
        imgTag.id = 'imgTag';
        mask.id = 'mask';
        //为相框和遮罩层设置样式
        imgWrapper.setAttribute('style', 'position:absolute;top:50%;left:50%;width:0;transform:translate(-50%,-50%);z-index: 100;transition:all 1s;cursor:pointer;box-shadow: 0 0 3.125em rgba( 255, 255, 255, .75 );');
        mask.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:99;background:rgba(0,0,0,.8);');
        //初始状态遮罩层和相框均设置为隐藏不显示
        mask.style.display = 'none';
        imgWrapper.style.display = 'none';
        //相框中放入图片标签
        imgWrapper.appendChild(imgTag);
        //body中插入遮罩层
        doc.body.appendChild(mask);
        //body中插入相框
        doc.body.appendChild(imgWrapper);
        //为遮罩层添加移除监听事件
        mask.addEventListener('click', remove, false);
        //暴露接口方法供外部调用
        w.previewImage = previewImage;
        w.removePreviewImage = remove;
    };

    //预览图片处理方法
    function previewImage(parentNode) {
        //父级元素
        var parentEle = doc.querySelector(parentNode);
        //该父级元素下所有的img子元素
        var imgList = parentEle.querySelectorAll('img');
        var imgWrapper = doc.getElementById('imgWrapper');
        //接下来3行处理图片的src地址装进一个数组
        var imgSrcArr = [];
        imgList.forEach(function (element) {
            imgSrcArr.push(element.src)
        });
        //点击页面上图片触发预览
        parentEle.addEventListener('click', function (e) {
            var target = e.target;
            if (target.nodeName.toLowerCase() === 'img') {
                var imgSrc = target.getAttribute('src');
                imgTag.setAttribute('src', imgSrc);
                doc.body.appendChild(mask);
                doc.getElementById('mask').style.display = 'block';
                doc.getElementById('imgWrapper').style.display = 'block';
                setTimeout(function () {
                    doc.getElementById('imgWrapper').style.width = '60%';
                }, 100)
            }
        }, false)
        //点击相框里的图片触发切换
        imgWrapper.addEventListener('click', function (e) {
            var target = e.target;
            var index = [].indexOf.call(imgSrcArr, target.src) + 1;
            if (index >= imgSrcArr.length) index = 0;
            imgTag.setAttribute('src', imgSrcArr[index]);

        }, false)
    }
    //关闭预览方法
    function remove() {
        doc.getElementById('mask').style.display = 'none';
        doc.getElementById('imgWrapper').style.display = 'none';
        doc.getElementById('imgWrapper').style.width = '0';
    }
    //页面加载完后自动调用init方法
    on(doc, "DOMContentLoaded", init);
    on(doc, "onload", init);
}(window, document))