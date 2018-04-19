$(function () {

    // 表单验证
    function checkFrom() {
        return new Promise(function (resolve, reject) {
            // 获取参数
            let mobile = $('#mobile').val();
            let code = $('#code').val();
            let email = $('#email').val();
            let pwd = $('#pwd').val();
            let confirmPwd = $('#confirmPwd').val();
            let gender = $('#gender').val();

            // 手机号验证
            if (!/^\d{11}$/.test(mobile)) {
                reject('手机号格式错误');
            }

            if (!code || code.length != 4) {
                reject('验证码格式错误');
            }

            let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if (!reg.test(email)) {
                reject('邮箱格式错误123');
            }

            if (pwd.length != 6) {
                reject('密码必须为六位数字');
            }

            if (!confirmPwd || confirmPwd != pwd) {
                reject('两次输入密码不一致');
            }

            // 如果验证成功，则把参数返回
            resolve({
                mobile: mobile,
                code: code,
                email: email,
                pwd: pwd,
                gender: gender
            })
        });
    }

    // 验证码获取
    function getAuthCode(mobile) {
        return axios.post('users/get_reg_code', {
            mobile: mobile
        })
    }

    // 设置验证码延时时间
    let delayTime = 60;

    // 处理验证码按钮状态-倒计时
    function authCodeStatus() {
        let timeId = setInterval(function () {
            delayTime--;
            console.log(1);
            // 判断定时器状态--是否大于0
            if (delayTime > 0) {
                // 大于0则倒计时在继续，需要禁用按钮点击事件，并改变按钮的文本
                $('#codeButton').addClass('disabled').attr('disabled', 'disabled').text(delayTime + '秒后重试').attr('disabled');
            } else {

                // 重置验证码延时时间
                delayTime = 60;

                // 清除定时器
                clearInterval(timeId);

                // 小于或等于0时，回复按钮状态
                $('#codeButton').removeClass('disabled').removeAttr('disabled', 'disabled').text('重新获取验证码').attr('disabled');
            }
        }, 100);
    }

    // 提交表单
    function submitFrom(formData) {
        return axios.post('users/reg', formData);
    }

    // 页面加载事件
    $(document).on('pageInit', function () {

        // 点击获取验证码时，需要对手机号进行验证
        $('#codeButton').on('click', function () {
            let mobile = $('#mobile').val();
            // 判断
            if (!/^\d{11}$/.test(mobile)) {
                // 取反则手机号格式错误
                $.toast('手机号格式错误');
                return;
            }

            // 倒计时效果
            authCodeStatus();

            // 调用获取验证码接口
            getAuthCode(mobile)
                .then(function (data) {
                    // 弹出框显示验证码
                    $.toast(data.data);
                });
        });

        // 点击注册按钮
        $('#registerBtn').on('click', function () {
            checkFrom()
                .then(submitFrom)
                .then(function (data) {
                    // console.log(data);
                    $.toast(data.meta.msg);
                })
                .catch(function (err) {
                    $.toast(err);
                })

        });


    });

    // 初始化页面
    $.init();


});