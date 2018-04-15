$(function () {
	// 调用axios获取数据
	function getData() {
		var str=location.href; 
		var num=str.indexOf("?");
		str=str.substr(num+1);//取？后一位，一直取
		var arr=str.split("=");
		console.log(arr[1]);

		return axios.get('goods/search');
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



	// 页面加载后事件
	$(document).on('pageInit', function () {
		// Promise方法调用
		getData()
			.then(render_data)
			.catch(function () {
				$.toast('err');
			})
	});

	$.init();

});