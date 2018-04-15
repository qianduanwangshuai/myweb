$(function () {
	// 加载分类数据
	function getCateData() {
		return axios.get('categories');
	}

	// 渲染左侧列表
	function render_left(data) {
		return new Promise(function (resolve, reject) {
			// 调用模板
			let html = template('cate_left_tpm', data.data);
			// 把字符串添加到元素
			$('#leftMenuInfo').html(html);

			// 为左侧列表每个div注册点击事件--每次点击时把数据发送过去
			$('#leftMenuInfo').find('.items').on('click', function () {
				// 移除带有cur类的元素，并为当前点击的元素添加cur样式
				$('#leftMenuInfo').find('.items.cur').removeClass('cur');
				$(this).addClass('cur');

				// 点击左侧按钮时，把数据发送到渲染右侧的函数
				render_right.call(this, data.data);
			});

			// 默认选中状态
			$('#leftMenuInfo').find('.items').eq(0).addClass('cur');
			// 成功毁掉函数
			resolve(data.data);
		});
	}

	// 渲染右侧列表
	function render_right(data) {
		// 获取当前点击元素的索引。此处this指向点击时的div
		let cur_Index = $(this).index() == -1? 0: $(this).index();//判断找没找到
		// 根据索引获取对应的数据
		let curData = data[cur_Index].children && data[cur_Index].children;//判断是否存在
		return new Promise(function (resolve, reject) {

			// 调用模板--图片公共路径作为参数传入模板，这个操作贼吊
			let html = template('cate_right_tpm', {
				data: curData,
				baseUrl: imgBaseUrl.url
			});
			$('#rightCateInfo').html(html);

			// 为右侧每个元素注册事件
			$('#rightCateInfo').find('.good').on('click', function () {
				location.href = 


			resolve();
		});


	}


	// 页面加载后事件
	$(document).on('pageInit', function () {
		// 加载提示信息
    	$.showPreloader('加载中');

    	// 调用Promise的方法
    	getCateData()
    		.then(render_left)
    		.then(render_right)
    		.catch(function () {
    			$.toast('err');
    		})
		    .finally(function(){
		      // 无论成功还是失败都会调用该方法
		      $.hidePreloader();
		    })
	});

	$.init();


});