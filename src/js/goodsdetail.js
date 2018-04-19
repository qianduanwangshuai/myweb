$(function () {
    // 获取url参数传递的id
    let goods_id = getUrlParams('goods_id');

    // 请求数据
    function getData() {
        return axios.get('/goods/detail', {
            params: {
                goods_id: goods_id
            }
        })
    }

    // 渲染数据到页面
    function render_data(data) {
        return new Promise(function (resolve, reject) {
            console.log(data);

            // 渲染轮播图
            let html = template('swiperTpl', data.data.pics);
            $('#swiperInfo').html(html);

            // swiper插件使用
            new Swiper('.swiper-container', {
                loop: true,
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                }
            })

            // 渲染基础页面
            let baseHtml = template('baseTpl', data.data);
            $('#baseInfo').html(baseHtml);

            // 商品详情
            $('#good_introduce').html(data.data.goods_introduce);

            // tab右侧右侧规格
            let righthtml = template('paramTpl', data.data.attrs);
            $('#good_attrs').html(righthtml);

            resolve();
        });
    }


    // DOM加载完毕事件
    $(document).on('pageInit', function () {
        getData()
            .then(render_data)
            .then(function () {
                $.toast('success');
            })
            .catch(function () {
                // 错误提示
                $.toast('error');
            })
    });

    // Sui初始化页面
    $.init();

});