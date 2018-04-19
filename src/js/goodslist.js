$(function () {
    // 分页相关参数
    let curPage = 1;//第几页
    let pagesize = 5;//每次请求条数
    // 设置标记位，保证本次数据加载完之后，再去加载下一条数据
    let flag = false;

    // 调用获取url参数的函数
    let cid = getUrlParams('cid');
    // console.log(cid);
    // console.log(123);

    // 调用axios获取数据
    function getData() {
        return axios.get('goods/search', {
            params: {
                pagenum: curPage,
                pagesize: pagesize,
                cid: cid
            }
        });
    }

    // 渲染
    function render_data(data) {
        return new Promise(function (resolve, reject) {
            console.log(data);
            let html = template('listTpl', data.data);
            $('#listInfo').html(html);
            resolve();
        });
    }

    // 刷新页面
    function refreshPage() {
        // Promise方法调用
        getData()
            .then(render_data)
            .then(function () {
                $.toast('加载成功');
                // 重置下拉刷新
                $.pullToRefreshDone('.pull-to-refresh-content');
            })
            .catch(function () {
                $.toast('err');
            })
    }

    // 下拉刷新
    $(document).on('refresh', '.pull-to-refresh-content', function () {
        // 下拉后重新获取数据，达到刷新效果
        refreshPage();
    });

    // 底部加载事件
    $(document).on('infinite', '.infinite-scroll-bottom', function () {
        console.log(123);
        // 标志位默认为false,只有此次函数内部功能完全执行完毕后会更改其值
        if (flag) {//为true阻止函数执行
            return;
        }
        flag = true;//上锁，保证此次加载完成才会加载下一次数据拉取

        // 获取数据
        getData()
            .then(function (data) {
                console.log(data)

                // 每次滚动时，改变当前页号。每次滚动加载时都会调用此函数，所以此次加加是为了下一个滚动时
                curPage++;

                // 调用模板
                let html = template('listTpl', data.data);
                $('#listInfo').append(html);

                // 记录总条数--返回给下一步
                return data.data.total;
            })
            .then(function (total) {
                // 当前页号乘每次请求条数---判断
                if (curPage * pagesize >= total) {

                    // 大于或等于数据总数，阻止页面加载
                    $.detachInfiniteScroll($('.infinite-scroll'));

                    // 删除加载提示符
                    $('.infinite-scroll-preloader').html('没有更多数据');
                    curPage = 1;
                }
            })
            .then(function () {
                // 加载提示
                $.toast('此次加载成功');

                //容器发生改变,如果是js滚动，需要刷新滚动
                $.refreshScroller();

                // 重置标志位
                flag = false;
            })
    });


    // 页面加载后事件
    $(document).on('pageInit', function () {
        // 刷新页面
        refreshPage();
    });

    $.init();

});