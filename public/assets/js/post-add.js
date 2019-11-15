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
                location.href='/admin/posts.html'
            }
        });
        //阻止表单的默认值
        return false

    })
})