$('#btn-login').on('click', function () {
    var username = $('#username').val();
    var password = $('#password').val();
    var data = {
        username: username,
        password: password
    };
    window.location.href = '../page/regular/regular-user-order.html';
});