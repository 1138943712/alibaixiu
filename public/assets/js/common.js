
$('#logout').on('click', function () {
    var logoutConfirm = confirm('确定退出吗');
    if (logoutConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function () {
                location.href = 'login.html'
            }
        })
    }
})
$.ajax({
    type: "get",
    url: "/users/" + userId,
    success: function (response) {
        console.log(response);
        $('#author').attr('src', response.avatar);
        $('#uname').html(response.nickName)
    }
});