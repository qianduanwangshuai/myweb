$(function () {
    // 获取轮播图数据
    function getImg() {
        return axios.get('home/swiperdata');
    }

    // 渲染轮播图
    function renderImg(param) {
        return new Promise(function (resolve, reject) {
            // 调用模板引擎---template(模板id, 数据)   list：为了和模板引擎对应
            let html = template('swiperTpl', {list: param.data});
            // 把模板添加到元素中
            $('#swiperInfo').html(html);
            // 成功和失败回调函数，必须在Promise中调用其中一个
            resolve();
        });
    }

    // 启用轮播效果--swiper插件
    function startImg() {
        return new Promise(function (resolve, reject) {
            new Swiper('.swiper-container', {
                loop: true,

                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                }
            });
            // 成功函数
            resolve();
        });
    }

    // ---------------------------

    // 分类数据获取
    function getFenlei() {
        return axios.get('home/catitems');
    }

    // 渲染数据--
    function renderFenlei(param) {
        return new Promise(function (resolve, reject) {
            // 模板引擎
            let html = template('menuTpl', {list: param.data});
            // 添加到元素中
            $('#menuInfo').html(html);
            // 成功回调函数
            resolve();
        });
    };

    // ------------------------

    // 列表数据获取
    function getList() {
        return axios.get('home/goodslist');
    }

    // 渲染数据
    function renderList(param) {
        return new Promise(function (resolve, reject) {
            let html = template('listTpl', param.data);
            $('#listInfo').html(html);
            resolve();
        });
    }


    // 页面加载后触发事件
    $(document).on('pageInit', function () {
        // 处理轮播图
        getImg()
            .then(renderImg)
            .then(startImg)
            .then(function () {
                $.toast('success');
            })
            .catch(function () {
                $.toast('err');
            });

        // 分类部分
        getFenlei()
            .then(renderFenlei)
            .then(function () {
                $.toast('success1');
            })
            .catch(function () {
                $.toast('err1')
            });

        // 列表详情
        getList()
            .then(renderList)
            .then(function () {
                $.toast('success2');
            })
            .catch(function () {
                $.toast('err2');
            });


    });


    // SUI使用，必须调用该方法
    $.init();
});