//获取评论的事件
$.ajax({
    type: "get",
    url: "/comments",
    // data: {page},
    success: function (response) {
        // console.log(response);
        var html = template('commentTpl', response);
        // console.log(html);
        $('#commentBox').html(html);
        // var pageHTML = template('pageTpl', response);
        // // console.log(pageHTML);
        // $('#pageBox').html(pageHTML)
        $('#pageBox').twbsPagination({
            totalPages: response.pages,
            visiblePages: 7,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (event, page) {
                //   $('#page-content').text('Page ' + page);
                changePage(page)
            }
        });
    }
});
//实现分页
function changePage(page) {
    $.ajax({
        type: "get",
        url: "/comments",
        data: { page: page },
        // data: {page},
        success: function (response) {
            // console.log(response);
            var html = template('commentTpl', response);
            // console.log(html);
            $('#commentBox').html(html);
            // var pageHTML = template('pageTpl', response);
            // // console.log(pageHTML);
            // $('#pageBox').html(pageHTML)
        }
    });
}
//评论状态的编辑
$('#commentBox').on('click', '.status', function () {
    //获取评论状态 转换为数据的格式
    var status = Number($(this).attr('data-status'));
    //用户的id
    var id = $(this).attr('data-id')
    //更改状态
    $.ajax({
        type: "put",
        url: "/comments/" + id,
        data: { state: status == 0 ? 1 : 0 },
        success: function (response) {
            location.reload();
        }
    });
})
//评论的删除
$('#commentBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id');
    //发送删除评论的ajax
    $.ajax({
        type: "delete",
        url: "/comments/" + id,
        success: function (response) {
            // console.log(response);

            location.reload()
        }
    });
})

