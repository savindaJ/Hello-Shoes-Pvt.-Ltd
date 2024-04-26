
class user {
    constructor(username, password,jwt,profilePic,role) {
        this.username = username;
        this.password = password;
        this.jwt = jwt;
        this.profilePic = profilePic;
        this.role = role;
    }
}

$('#btn-login').on('click', function () {
    var username = $('#txt-user-name').val();
    var password = $('#txt-password').val();
    var data = {
        username: username,
        password: password
    };

    console.log(data)

    $.ajax(
        {
            url: BASE_URL + 'api/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (res) {
                console.log(res);
                localStorage.setItem('user', JSON.stringify(res));
                console.log(JSON.parse(localStorage.getItem('user')).jwt);
                console.log(JSON.parse(localStorage.getItem('user')).profilePic);
                console.log(JSON.parse(localStorage.getItem('user')).role);
                console.log(JSON.parse(localStorage.getItem('user')).username);
                let timerInterval;
                Swal.fire({
                    title: "Login SuccessFull !!!, Please Wait...",
                    html: "I will close in <b></b> milliseconds.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                            timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        if (JSON.parse(localStorage.getItem('user')).role === 'ADMIN' || JSON.parse(localStorage.getItem('user')).role === 'SUPER_ADMIN') {
                            window.location.href = "page/admin/";
                        } else if (JSON.parse(localStorage.getItem('user')).role === 'USER') {
                            window.location.href = 'page/regular/regular-user-order.html';
                        } else {
                            alert('invalid !');
                        }
                    } else {
                        alert('invalid !');
                    }
                });
            },
            error: function (res) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Invalid username or password!"
                });
            }
        }
    )

});