$(function () {
    //分类的展现 设置分页的点击事件   
    $.ajax({
        type: "get",
        url: "/categories",
        success: function (response) {
            var html = template('categoryTpl', { data: response });
            // console.log(html);
            $('#category').html(html)
        }
    });
    //封面图片的上传
    $('#feature').on('change', function () {
        //获取上传的图片
        var file = this.files[0];
        //创建FormData实现二进制文件上传
        var formdata = new FormData()
        //将图片的位置追加在FormData
        formdata.append('cover', file)
        $.ajax({
            type: "post",
            url: "/upload",
            data: formdata,
            processData: false,
            contentType: false,
            success: function (response) {
                // console.log(response);
                $('#thumbnail').val(response[0].cover)
                $('#picture').attr('src', response[0].cover).show()
            }
        });
    });
    //文章的上传
    $('#addForm').on('submit', function () {
        //获取表单的值
        var dataform = $(this).serialize()
        console.log(dataform);
        $.ajax({
            type: "post",
            url: "/posts",
            data: dataform,
            success: function (response) {
                location.href = '/admin/posts.html'
            }
        });
        //阻止表单的默认值
        return false

    })
    //获取浏览器地址栏中id的值
    var id = postData('id')
    //当文章进行修改操作的时候
    if (id != -1) {
        $.ajax({
            type: "put",
            url: "/posts/" + id,
            success: function (response) {

                //修改页面的分类的显示
                $.ajax({
                    type: "get",
                    url: "/categories",
                    success: function (catalogies) {
                        console.log(response);
                        response.catalogies = catalogies;
                        var html = template('modifyTpl', response)
                        console.log(html);
                        $('.parentBox').html(html)
                    }
                });
            }
        });
    }
    //获取地址栏中的值   从地址栏中获取参数，来得知管理员是添加操作还是修改操作
    function postData(name) {
        //返回的一个数组['id=value',]
        var data = location.search.substr(1).split('&');
        //循环一个数组获取id的值 
        for (var i = 0; i < data.length; i++) {
            //等号分割
            var tep = data[i].split('=');
            // console.log(tep);
            if (name == tep[0]) {
                return tep[1]
            }
            //如果参数不存在则返回-1
            return -1
        }
    }
    //提交修改的内容
    $('.parentBox').on('submit', '#modifyForm', function () {
        //获取表单的内容
        // alert(1)
        var dataform=$(this).serialize()
        //获取id
        var id=$(this).attr('data-id')
        //发送ajax请求
        $.ajax({
            type: "put",
            url: "/posts/"+id,
            data: dataform,
            success: function (response) {
                location.href='/admin/posts.html'
            }
        });
        //阻止默认提交
        return false
    })
})