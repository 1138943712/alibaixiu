$(function () {
    $('#password').on('change', function () {

        if ( $('#password').val().trim().length==0 ) {
            alert('不能为空')
            $('#btn').attr('disabled', true)
        } else {
            $('#btn').attr('disabled', false)
        }


    })

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