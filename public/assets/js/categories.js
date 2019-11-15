$(function () {
    //添加
    $('#categoriesList').on('submit', function () {
        var dataform = $(this).serialize();
        console.log(dataform);

        $.ajax({
            type: "post",
            url: "/categories",
            data: dataform,
            success: function (response) {
                location.reload()
            }
        });
        //阻止默认行为
        return false
    });
    //页面的展示
    $.ajax({
        type: "get",
        url: "/categories",
        success: function (response) {
            var html = template('categoriesTpl', { data: response })
            $('#categoriesData').html(html)
        }
    });
    //页面的编辑
    $('#categoriesData').on('click', '.edit', function () {
        //获取点击的id值
        var id = $(this).attr('data-id');
        //获取根据id的数据
        $.ajax({
            type: "get",
            url: "/categories/" + id,
            success: function (response) {
                // console.log(response);
                var html = template('editTpl', response)
                // console.log(html);
                $('#categoryEidte').html(html)

            }
        });
    })
    //页面展现的事件
    $('#categoryEidte').on('submit', '#categoriesEdit', function () {
        var dataform = $(this).serialize();
        console.log(dataform);
        var id = $(this).attr('data-id');
        $.ajax({
            type: "put",
            url: "/categories/" + id,
            data: dataform,
            success: function () {
                location.reload()
            }
        });
        //阻止页面的提交、
        return false
    });
    //用户的删除
    $('#categoriesData').on('click', '.delete', function () {
        var id = $(this).attr('data-id');
        if (confirm('你真的要删除吗')) {
            $.ajax({
                type: "delete",
                url: "/categories/" + id,
                success: function (response) {
                    location.reload()
                }
            });
        }

    })
})