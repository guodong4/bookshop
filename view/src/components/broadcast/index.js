import $ from "jquery";
function Index() {
    this.init.apply(this, arguments);
}
//判断鼠标滑动
$.fn.slideDirection = function (selector, callback) {
    var startPosition, endPosition, deltaX, deltaY, moveLength;
    this.on('touchstart', selector, function (e) {
        var touch = e.touches[0];
        startPosition = {
            x: touch.pageX,
            y: touch.pageY
        }

    }).on('touchmove', selector, function (e) {
        var touch = e.touches[0];
        endPosition = {
            x: touch.pageX,
            y: touch.pageY
        };
        deltaX = endPosition.x - startPosition.x;
        deltaY = endPosition.y - startPosition.y;
        moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
    }).on('touchend', selector, function (e) {
        if (deltaX < 0) { // 向左划动  
            callback.call(this, 1);
        } else if (deltaX > 0) { // 向右划动  
            callback.call(this, -1);
        }
    });
}
$.extend(Index.prototype, {
    init: function (config) {
        var _this = this;
        this.el = config.el;
        this.data = config.data;
        this.isAuto = config.isAuto;
        this.speed = config.speed;
        this.render();
        this.setStyle();
        this.page = 0;
        this.event();
        if (_this.isAuto) {
            this.interval = _this.setIntervalFn();
        }
    },
    setIntervalFn: function () {
        var _this = this;
        return setInterval(function () {
            _this.animation.call(_this.el.find(".moveImg"), 1, _this);
        }, _this.speed);
    },
    module: function (data) {
        var li = "";
        var point = "";
        for (var i = 0; i < data.length; i++) {
            li += `<li>
<div class="broadContent">
<p class="mainTitle">${data[i].mainTitle}</p>
<p class="secontTitle">${data[i].secontTitle}</p>
<div class="more" data-url=""><button class="custom-btn-red">加入购物车</button></div>
</div>
<div class="broadImg">
<div class="img-c">
<img src="${data[i].src}" width="100%"/>
</div>
</div>
</li>	`;
            point += `<li data-page="${i}">
<svg style="transform:rotate(-90deg);">
<circle cx="9" cy="8" r="6" stroke-width="3" stroke="#eaaaaa" fill="none"></circle>
<circle cx="9" cy="8" r="6" stroke-width="3" stroke="#e03737" fill="none"  class="init"></circle>
</svg>
</li>`;
        }
        return `
<ul class="moveImg">
${li}
</ul>
<ul class="movePoint">
${point}
</ul>
`;
    },
    setStyle: function () {
        this.el.find(".moveImg li").hide();
        this.el.find(".moveImg li").eq(0).show();
        var len = this.el.find(".moveImg").find("li").length;//计算图片总数
        var wid = $(window).width();
        this.el.find(".moveImg").find("li").each(function () {
            $(this).css("width", "100%");
            $(this).css("height", wid / 3.11 + "px");
        });
        this.el.find(".moveImg").parent().css("width", "100%");//设置父容器宽度
        this.el.find(".moveImg").parent().css("height", wid / 3.11 + "px");//设置父容器高度
        var lipoint = 24;//轮播点的宽度
        var pointCount = (lipoint + 20) * len + 10;//轮播点总宽度
        var left = (wid - pointCount) / 2 + 5;//居中计算
        this.el.find(".movePoint").css("width", pointCount + "px");
        this.el.find(".movePoint").css("left", left * 100 / wid + "%");

        this.el.find(".movePoint").find("li").eq(0).find("circle").eq(1).attr("class", "init animate").css("stroke-dasharray", "38 38");
    },
    itemClick: function (callback) {
        //tap会默认打开图片
        this.el.on("click", ".moveImg li", function () {
            callback.call(this);
        })
    },
    render: function () {
        var _this = this;
        var _html = _this.module(this.data);
        this.el.html(_html);

    },
    animation: function (direction, obj) {
        var _this = obj;
        if (direction == -1) {//向右滑动
            if (_this.page > 0) {
                _this.page = _this.page + direction;
            }
        } else {//向左滑动
            if ((_this.page + 1) < $(this).find("li").length) {
                _this.page = _this.page + direction;
            } else {
                _this.page = 0;
            }
        }
        if (_this.page < $(this).find("li").length && _this.page != -1) {
            _this.animationFn.call(this, _this.page, _this);
        }
    },
    animationFn: function (page, obj) {
        $(this).find("li").hide();
        $(this).find("li").eq(page).fadeIn(600);
        obj.el.find(".movePoint").find("li").each(function () {
            $(this).find("circle").eq(1).attr("class", "init").css("stroke-dasharray", "0 38");
        })
        obj.el.find(".movePoint").find("li").eq(page).find("circle").eq(1).attr("class", "init animate").css("stroke-dasharray", "38 38")
    },
    event: function () {
        var _this = this;
        this.el.slideDirection(".moveImg", function (direction) {
            clearInterval(_this.interval);
            _this.animation.call(this, direction, _this);
            _this.interval = _this.setIntervalFn()
        });
        this.el.on("click", ".movePoint li", function () {
            clearInterval(_this.interval);
            var page = $(this).data("page");
            _this.page = page;
            _this.animationFn.call(_this.el.find(".moveImg"), page, _this);
            _this.interval = _this.setIntervalFn();
        })
    }
});
export default Index;