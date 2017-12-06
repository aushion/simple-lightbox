(function (w, doc) {
    "use strict";
    var initted = false;
    function on(el, eventName, handler) {
        if (el.addEventListener) {
            el.addEventListener(eventName, handler);
        } else {
            el.attachEvent('on' + eventName, function () {
                handler.call(el)
            })
        }
    }
    function init() {
        if (initted) {
            return;
        }
        initted = true;
        var mask = doc.createElement('div');
        var imgWrapper = doc.createElement('div');
        var imgTag = doc.createElement('img');
        imgWrapper.id = 'imgWrapper';
        imgTag.id = 'imgTag';
        mask.id = 'mask';
        imgWrapper.setAttribute('style', 'position:absolute;top:50%;left:50%;width:60%;transform:translate(-50%,-50%);z-index: 100;box-shadow: 0 0 3.125em rgba( 255, 255, 255, .75 );');
        mask.setAttribute('style', 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:99;background:rgba(0,0,0,.8);');
        mask.style.display = 'none';
        imgWrapper.style.display = 'none';
        imgWrapper.appendChild(imgTag);
        doc.body.appendChild(mask);
        doc.body.appendChild(imgWrapper);
        mask.addEventListener('click', remove, false);
        w.previewImage = previewImage;
        w.removePreviewImage = remove;
    };

    function previewImage(parentNode) {
       var parentEle = doc.querySelector(parentNode);
       var imgList = parentEle.querySelectorAll('img');
       var count = 0;
       parentEle.addEventListener('click',function(e){
           var target = e.target;
        if (target.nodeName.toLowerCase() === 'img') {
            var imgSrc = target.getAttribute('src');
            imgTag.setAttribute('src', imgSrc);
            doc.body.appendChild(mask);
            doc.getElementById('mask').style.display = 'block';
            doc.getElementById('imgWrapper').style.display = 'block';
        }
       },false)
       
    }

    function remove() {
        console.log(1)
        doc.getElementById('mask').style.display = 'none';
        doc.getElementById('imgWrapper').style.display = 'none';
    }

    on(doc, "DOMContentLoaded", init);
    on(doc, "onload", init);
}(window, document))