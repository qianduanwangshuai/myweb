$(function () {
    // // 获取数据
    function loadListData() {
        return axios.get('home/goodslist');
    }

    // 渲染列表
    function renderList(param) {
        return new Promise(function (resolve, reject) {  
            let html = template('listTpl', param.data);
            $('#listInfo').html(html);
            resolve();
        });
    }
    // ----------------------------------------
    // 处理菜单，获取分类数据
    function loadMenuData() {
        return axios.get('home/catitems');
    }

    // 渲染菜单内容
    function renderMenu(param) {
        return new Promise(function (resolve, reject) {
            let html = template('menuTpl',{list: param.data});
            $('#menuInfo').html(html);
            resolve();
        });
    }


    // ----------------------------
    function loadSwiperData() {
        return axios.get('home/swiperdata');
    }

    // 渲染轮播图
    function renderSwiper(param) {
        return new Promise(function (resolve, reject) {
            let html = template('swiperTpl', {list: param.data});
            // console.log(html);
            $('#swiperInfo').html(html);
            // 成功后回调函数
            resolve();
        });
    }


    // 处理轮播
    function handleSwiper() {
        return new Promise(function (resolve, reject) {
            new Swiper('.swiper-container', {
                loop: true,
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                }
            });
            resolve();
        });
    }


    // 页面初始化完成之后，触发该事件
    $(document).on("pageInit", function (e, pageId, $page) {

        //处理轮播图
        loadSwiperData()//获取轮播图数据--图片地址
        .then(renderSwiper)//根据数据渲染轮播图
        .then(handleSwiper)//调用轮播图--swiper插件
        .then(function () {
            $.toast('success');
        })
        .catch(function () {
            $.toast('err');
        });

        // 菜单处理
        loadMenuData()//菜单数据
        .then(renderMenu)//渲染
        .catch(function () {
            $.toast('err2');
        })

        // 列表处理
        loadListData()//菜单数据
        .then(renderList)//渲染
        .catch(function () {
            $.toast('err3');
        })





    });

    $.init();


});