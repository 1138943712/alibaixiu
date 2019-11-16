//获取posts数据
$.ajax({
    type: "get",
    url: "/posts",
    success: function (response) {
        // console.log(response);
        var html1 = template('postsTpl', response);
        // console.log(html1);
        //将数据展现到页面上
        $('#postBoxs').html(html1)
        //将页码展现到页面上
        var page = template('pageTpl', response);
        $('#pageBox').html(page)
    }
});
//点击分页按钮的功能
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/posts",
        data: { page: page },
        success: function (response) {
            // console.log(response);
            var html1 = template('postsTpl', response);
            // console.log(html1);
            //将数据展现到页面上
            $('#postBoxs').html(html1)
            //将页码展现到页面上
            var page = template('pageTpl', response);
            $('#pageBox').html(page)
        }
    });
}
//筛选的功能
//获取所以的分类
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        var html = template('catalogyTpl', { data: response });
        // console.log(html);
        $('#postsCatalogy').html(html)
    }
});
//筛选的功能
$('#filtrate').on('submit', function () {
    var dataform = $(this).serialize()
    // console.log(dataform);
    //根据筛选的条件展现数据
    $.ajax({
        type: "get",
        url: "/posts",
        data: dataform,
        success: function (response) {
            // console.log(response);
            var html1 = template('postsTpl', response);
            // console.log(html1);
            //将数据展现到页面上
            $('#postBoxs').html(html1)
            //将页码展现到页面上
            var page = template('pageTpl', response);
            $('#pageBox').html(page)
        }
    });
    //阻止表单的默认提交
    return false
})
//文章的修改
//获取文章编辑的事件
// $('#postBoxs').on('click', '.edit', function () {
//     var id = $(this).attr('data-id');
//    
// })
