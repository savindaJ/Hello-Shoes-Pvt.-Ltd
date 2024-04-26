$('#btn-employee-modal').click(function () {
    $('#employee-modal').modal('show');
});

$('#emp-img').on('change', function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        $('#emp-img-preview').attr('src', reader.result);
    };
});

$('#btn-add-emp').click(function () {

    let formData = new FormData();
    const employee = {
        empId: '',
        empName: $('#emp-name').val(),
        gender: $('#emp-gender').val(),
        emergencyContact: $('#emp-emg-contact').val(),
        emergencyInfo: $('#emp-emg-guardian').val(),
        role: $(this).text() === 'Add Manager' ? 'ADMIN' : 'USER',
        status: $('#emp-civil-status').val(),
        email: $('#emp-email').val(),
        contact: $('#emp-contact').val(),
        designation: $('#emp-designation').val(),
        dob: $('#emp-dob').val(),
        branchId: $('#emp-branch').val(),
        address: {
            lane: $('#emp-address-lane').val(),
            mainCountry: $('#emp-address-country').val(),
            mainCity: $('#emp-address-city').val(),
            mainState: $('#emp-address-state').val(),
            postalCode: $('#emp-address-code').val(),
        },
    };
    formData.append('employee', JSON.stringify(employee));
    formData.append('image', $('#emp-img')[0].files[0]);

    $.ajax({
        url: BASE_URL + 'api/v1/employee',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        headers: {
            "Authorization": "Bearer " + user.jwt
        },
        success: function (data) {
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
                title: data
            });
            $('#employee-modal').modal('hide');
        },
        error: function (error) {
            console.log(error);
        }
    });

});

function loadBranchIds() {
    $.ajax({
        url: BASE_URL + 'api/v1/branch/get/id',
        type: 'GET',
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            data.forEach(branch => {
                $('#emp-branch').append(`<option value="${branch}">${branch}</option>`);
            });
        },
        error: function (error) {
            console.log(error);
        }
    });
}

loadBranchIds();