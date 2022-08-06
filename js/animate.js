function animate(obj, target, callback) {  // callback 为形参
    console.log(callback);
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        // 步长取整 如果步长为正 则往上取整 为负值则往下取整
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // 回调函数写到定时器结束的下方
            if (callback) {  // 如果有回调函数 就调用
                // 回调函数
                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}