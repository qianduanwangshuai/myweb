$(function(){
  // 搜索条业务功能
  // 初始化遮罩层
  let layer = $('<div class="search"><div id="searchInfo"></div></div>');
  // 设置遮罩层到顶部的距离
  layer.css('top',$('.mysearch').height());
  // 隐藏遮罩层
  layer.hide();
  // 追加到页面
  layer.appendTo('body');

  // 本地存储功能------------------------
  window.showDetail = function (id, name) {
    // 开关
    var flag = false;
    // 获取本地存储
    let history = localStorage.getItem('searchHistory');


    // 判断本地存储是否存在
    if (history) {
      console.log(history);
      console.log(123);

      // 进来则存在，把localStroage字符串转换为js对象---数组
      let historyInfo = JSON.parse(history);

      // 遍历数组，检测是否有存在的元素--重复的搜索内容只保存一个
      historyInfo.some(function (item) {
          // 判断id是否有相等的
          if (id == item.goods_id) {
            // 存在相等的id，让开关为true
            flag = true;
            // 终止循环---return true---此方法内部规定
            return true;
          }
      });

      // 判断开关状态，默认不存在重复---flag为false,取反为true
      if (!flag) {

        // 添加到本地存储--每次点击事件传递过来的参数---每次都不同
        var info = {
          goods_id: id,
          goods_name: name
        }

        // 把新增的本地储存保存包原来的localStroage中
        historyInfo.push(info);
        // 数组转换为字符串
        historyInfo = JSON.stringify(historyInfo);
        // 设置本地存储
        localStorage.setItem('searchHistory', historyInfo);
      } 

    } else {//hostory没有值--不存在，创建新的localStroage
        var info = {
          goods_id: id,
          goods_name: name
        }

        // 声明数组，并把本次添加的存储的信息添加到数组
        let arr = [];
        arr.push(info);
        // 数组转换为字符串
        arr = JSON.stringify(arr);
        // 设置本地存储
        localStorage.setItem('searchHistory', arr);
    }

    // 实现a链接的跳转
    // location.href = '/goods-detail.html?goods_id=' + id;


  }//end func



  // 根据输入的关键字加载列表数据
  function loadKeyWordData(keyword){
    return axios.get('goods/qsearch', {
      params: {
        query: keyword
      }
    });
  }

  // 渲染数据到提示列表
  function renderList(param){
    return new Promise(function(resolve,reject){
      let html = template('searchTpl',param.data);
      $('#searchInfo').html(html);
      resolve();
    });
  }


  // 获取焦点
  $('#search').on('focus',function(){
      layer.show();

      // 获取本地储存，把数据渲染到页面
      let searchHistory = localStorage.getItem('searchHistory');
      // 转为js对象
      searchHistory = JSON.parse(searchHistory);
      // console.log(searchHistory);
      // 调用模板，渲染内容
      let html = template('searchTpl', searchHistory);
      // 把渲染的字符串添加到元素
      $('#searchInfo').html(html);
  })

  $('#search').on('blur',function(){
    // 保证点击a标签之后再触发隐藏操作
    setTimeout(function(){
      layer.hide();
    },0);
  })

  $('#search').on('input',function(){
    // 输入关键字的时候，动态调用后台接口，从而获取该关键字所有对应的数据列表
    let kw = $('#search').val();
    loadKeyWordData(kw).then(renderList);
  })

});