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
            $('#pictureLocation').val(response[0].avatar);
            
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
        },
        error: function () {
            alert('修改失败')
        }
    });
    //阻止默认提交
    return false
})
//第一天做的内容
//用户的删除
$('#list').on('click', '.delet', function () {
    var id = $(this).attr('data-id');
    if (confirm('你真的要删除的吗')) {
        $.ajax({
            type: "delete",
            url: "/users/" + id,
            success: function (response) {
                //用户的刷新
                location.reload()
            }
        });
    }
})
//用户的批量删除 全选按钮
$('#selectAll').on('change', function () {
    //$(this).prop('checked')表示全选框的状态
    var status = $(this).prop('checked');
    //获取整个数据的input框,跟随全选框
    $('#list').find('input').prop('checked', status);
    //显示批量删除
    if (status) {
        $('.deleteAll').show()
    } else {
        $('.deleteAll').hide();
    }
})
//单个用户前面的按钮的状态
$('#list').on('change', '.selectUser', function () {
    //获取所有用户的
    var status = $('#list').find('input');
    //过滤用户点击选中的状态status.filter(':checked').length的个数
    if (status.length == status.filter(':checked').length) {
        //所有选中的全选按钮选中
        $('#selectAll').prop('checked', true);
        //所有的选中的时候显示批量删除的按钮
        $('.deleteAll').show()
        // .style.display = 'inline-block'
    } else {
        //不是所有的用户选中   全选的按钮也不是选中的
        $('#selectAll').prop('checked', false);
        $('.deleteAll').hide()
    };
    //当选中的用户大于一的时候
    if (status.filter(':checked').length > 1) {
        $('.deleteAll').show()
    } else {
        $('.deleteAll').hide()
    }
})
//批量删除的事件
$('.deleteAll').on('click', function () {
    var ids = [];
    //获取选中的框
    var status = $('#list').find('input').filter(':checked')
    status.each(function (index, element) {
        //获取input中的用户id的值  追加到ids中
        ids.push($(element).attr('data-id'));
        $.ajax({
            type: "delete",
            url: "/users/" + ids.join('-'),
            success: function (response) {
                location.reload()
            }
        });
    })
})

