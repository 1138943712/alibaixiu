$(function () {
    $('#password').on('submit', function () {
        var passwordData = $(this).serialize()
        $.ajax({
            type: "put",
            url: "/users/password",
            data: passwordData,
            success: function (response) {
                location.href = 'login.html'
            }
        });
        //阻止表单的提交
        return false
    })
})