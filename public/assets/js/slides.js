//图片轮播
//图片的上传
$('#file').on('change', function () {
    console.log(this.files[0]);

    var formdata = new FormData();
    //将文件追加到formdata中
    formdata.append('image', this.files[0])
    $.ajax({
        type: "post",
        url: "/upload",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response[0].image);
            $('#image').val(response[0].image)
            //图片的回响
            $('#showImage').attr('src', response[0].image).show()
        }
    });
})
//为内容设置submit事件
$('#sldesBox').on('submit', function () {
    var dataform = $(this).serialize();
    console.log(dataform);
    $.ajax({
        type: "post",
        url: "/slides",
        data: dataform,
        success: function (response) {
            location.reload()
        }
    });
    //阻止默认提交
    return false
})
//轮播图的展现
$.ajax({
    type: "get",
    url: "/slides",
    success: function (response) {
        // console.log(response);
        var html = template('slidesTpl', { data: response });
        // console.log(html);
        $('#slidesBox').html(html)
    }
});
//轮播图的删除
$('#slidesBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: "delete",
        url: "/slides/" + id,
        success: function (response) {
            location.reload()
        }
    });
})