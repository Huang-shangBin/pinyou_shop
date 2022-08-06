window.addEventListener('load', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 点击右侧按钮 图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    // 节流阀
    var flag = true;

    // 鼠标经过 focus 显示隐藏左右按钮 
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000)
    })

    // 动态生成小圆圈 = 图片个数
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过索引号来做
        li.setAttribute('index', i);
        // 把 li 添加到 ol 里面
        ol.appendChild(li);
        // 生成小圆圈的同时直接绑定事件
        // 小圆圈的排他思想
        li.addEventListener('mouseover', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            // 当鼠标移动到 li 时 获取 li 的索引号
            var index = this.getAttribute('index');
            // bug
            num = index;
            circle = index;
            // 鼠标经过小圆圈时 移动图片  ul的移动距离 = 小圆圈的索引号 * 图片的宽度 （注意是负值）
            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    // 克隆第一张图片(li)放到 ul 最后面  true为深克隆 false为浅克隆
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 右侧按钮
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;  // 打开节流阀
            });
            // 点击右侧按钮 小圆圈跟着一起变化
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })

    // 左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            // 点击右侧按钮 小圆圈跟着一起变化
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1;
            }
            // circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    })
    function circleChange() {
        // 排他思想
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    // 自动播放轮播图
    var timer = setInterval(function () {
        arrow_r.click();
    }, 3000)
});