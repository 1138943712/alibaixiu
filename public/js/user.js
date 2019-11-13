//为表单提交提交事件
$('#addForm').on('submit', function () {
    //获取表单的数据
    var formdata = $(this).serialize();
    //将获取的数据添加到数据库
    $.ajax({
        type: 'post',
        url: '/users',
        data: formdata,
        success: function () {
            //刷新页面
            location.reload()
        },
        error: function () {
            console.log('添加失败');
        }
    })
    //阻止表单的默认行为
    return false
});
//上传图片的事件
$('.modifyUser').on('change', '#avatar', function () {
    //this.files[0] 获取图片的属性
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉$.ajax不要解析请求参数
        processData: false,
        //告诉$.ajax不要设置请求参数的格式
        contentType: false,
        success: function (response) {
            //reponse就是图片的地址
            $('#preview').attr('src', response[0].avatar);
            $('#pictureLocation').val(response[0].avatar)
        }
    })
})

//用户的展现
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
        // console.log(response);

        var html = template('userTpl', {
            data: response
        });
        //页面的渲染
        $('#list').html(html)
    }
})
//用户的编辑   事件的委托
$('#list').on('click', '.edit', function () {
    //获取点击的时候的id
    var id = $(this).attr('data-id');
    //查询用户
    $.ajax({
        type: "get",
        url: "/users/" + id,
        success: function (response) {
            var html = template('modifyTpl', response);
            console.log(html);

            $('.modifyUser').html(html)
        }
    });
})
//用户的修改
$('.modifyUser').on('submit', '#modifyForm', function () {
    var formdata = $(this).serialize();
    // console.log(formdata);
    var id = $(this).attr('data-id');
    // console.log(id);
    $.ajax({
        type: "put",
        url: "/users/" + id,
        data: formdata,
        success: function (response) {
            // console.log(response);
            location.reload()
        }
    });
    //阻止默认提交
    return false
})
//用户的删除
$('#list').on('click', '.delet', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: "delete",
        url: "/users/" + id,
        success: function (response) {
            location.reload()

        }
    });

})