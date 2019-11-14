$(function () {
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
})