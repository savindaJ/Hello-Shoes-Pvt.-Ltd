$('#btn-branch-modal').on('click', function () {
    $('#branch-modal').modal('show');
});

$('#btn-add-branch').on('click', function () {
    let branch = {
        branchName: $('#branch-name').val(),
        branchContact: $('#branch-contact').val(),
        address: {
            lane: $('#branch-address-lane').val(),
            mainCountry: $('#branch-address-country').val(),
            mainCity: $('#branch-address-city').val(),
            mainState: $('#branch-address-state').val(),
            postalCode: $('#branch-address-code').val()
        }
    }
    $.ajax({
        url: BASE_URL + 'api/v1/branch',
        headers: {
            "Authorization": "Bearer " + user.jwt
        },
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(branch),
        success: function (res) {
            $('#branch-modal').modal('hide');
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: res
            });
        }, error: function (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: 'Something went wrong! Please try again.'
            });
        }
    });
});