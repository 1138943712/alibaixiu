//上传图片的事件
$('#logo').on('change', function () {
    //获取 上传文件
    var file = this.files[0];
    //设置FormData格式
    var formData = new FormData();
    //追加到formData里
    formData.append('logo', file)
    $.ajax({
        type: "post",
        url: "/upload",
        processData: false,
        contentType: false,
        data: formData,
        success: function (response) {
            console.log(response);
            $('#logoFile').val(response[0].logo);
            $('#showFile').attr('src', response[0].logo)
        }
    });

});
//设置的获取数据
$('#settingBox').on('submit', function () {
    var dataform = $(this).serialize();
    console.log(dataform);
    $.ajax({
        type: "post",
        url: "/settings",
        data: dataform,
        // dataType: "dataType",
        success: function (response) {
            location.reload()
        }
    });
    //阻止默认提交
    return false
})
// //将网站的设置显现在页面上
$.ajax({
    type: "get",
    url: "/settings",
    success: function (response) {
        $('#showFile').attr('src', response.logo);
        $('#site_name').val(response.title)
        $('#comment_status').attr('checked', response.comment);
        $('#comment_reviewed').attr('checked', response.review)

    }
});