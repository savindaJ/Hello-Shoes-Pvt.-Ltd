$('#btn-employee-modal').click(function () {
    if ($(this).text() === 'Add Manager') {
        $('#btn-add-emp').text('Add Manager');
    }else {
        $('#btn-add-emp').text('Add Employee');
    }

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
let timerInterval;
$('#btn-add-emp').click(function () {

    Swal.fire({
        timer: 100000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
        }
    });

    let formData = new FormData();
    const employee = {
        empId: employeeId,
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


    if ($(this).text() === 'Update Employee') {
        formData.append('employee', JSON.stringify(employee));
        if ($('#emp-img')[0].files.length === 0) {
            formData.append('image', new File([""], "notUpdate"));
        }else {
            formData.append('image', $('#emp-img')[0].files[0]);
        }
        $.ajax({
            url: BASE_URL + 'api/v1/employee',
            type: 'PUT',
            data: formData,
            contentType: false,
            processData: false,
            headers: {
                "Authorization": "Bearer " + user.jwt
            },
            success: function (data) {
                clearInterval(timerInterval);
                loadAllAdmins();
                loadAllUsers();
                $('#employee-modal').modal('hide');
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
                clearInterval(timerInterval);
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
                    title: 'Failed to update employee'
                });
            }
        });
    }else {
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
                clearInterval(timerInterval);
                loadAllAdmins();
                loadAllUsers();
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
                clearInterval(timerInterval);
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
                    title: 'Failed to add employee'
                });
            }
        });
    }

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
                title: 'session expired'
            });
        }
    });
}

loadBranchIds();

function loadAllAdmins() {
    $.ajax({
        url: BASE_URL + 'api/v1/employee/admin',
        type: 'GET',
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            console.log(data)
            data.forEach(employee => {
                $('#emp-row').append(`
                   
            <div class="col position-relative">
            <div class="card mt-3 p-2">
              <div class="employee-header"></div>
              <img src="https://drive.google.com/thumbnail?id=${employee.profilePic}&sz=w1000" width="100" height="100" class="rounded-circle m-auto z-3">
              <small class="text-center emp-id">${employee.empId}</small>
              <h6 class="text-center">${employee.empName}</h6>
              <small class="text-center">${employee.designation}</small>
              <div class="d-flex gap-5 justify-content-sm-between px-4">
                <small>Branch</small>
                <small>${employee.branchName}</small>
              </div>
              <div class="d-flex gap-5 justify-content-sm-between px-4">
                <small>Date of Birth</small>
                <small>${employee.dob}</small>
              </div>
              <div class="d-flex gap-5 justify-content-sm-between px-4">
                <small>Gender</small>
                <small>${employee.gender}</small>
              </div>
              <div class="d-flex gap-5 justify-content-sm-between px-4">
                <small>Email</small>
                <small>${employee.email}</small>
              </div>
              <div class="d-flex gap-5 justify-content-sm-between px-4">
                <small>Contact No</small>
                <small class="emp-contact">${employee.contact}</small>
              </div>
              <small class="text-center mt-2 text-dark">${employee.address.lane}<br>Dickwall</small>
              <small class="text-danger">Emergency</small>
              <div class="d-flex gap-5 mt-2 justify-content-sm-between px-4">
                <small>${employee.emergencyInfo}</small>
                <small>${employee.emergencyContact}</small>
              </div>
              <hr>
              <div class="d-flex mt-2 justify-content-end px-4">
                <button class="btn btn-sm btn-primary btn-edit-employee">Edit</button>
<!--                <button class="btn btn-sm btn-danger ms-2">Delete</button>-->
              </div>
            </div>
          </div>
                
                `)
            });
            setEvent();
        },
        error: function (error) {
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
                title: "session expired"
            });
        }
    });
}


let employeeId;

function setEvent() {
    $('.btn-edit-employee').on('click', function () {
        let branchId = $(this).closest('.card');
        $('#btn-add-emp').text('Update Employee');
        $('#emp-email').prop('disabled', true);
        employeeId = branchId.find('.emp-id').text();
        console.log(employeeId)

        $.ajax({
            url: BASE_URL + 'api/v1/employee/' + employeeId,
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + user.jwt
            },
            success: function (data) {
                $('#emp-name').val(data.empName);
                $('#emp-gender').val(data.gender);
                $('#emp-contact').val(data.contact);
                $('#emp-email').val(data.email);
                $('#emp-designation').val(data.designation);
                $('#emp-dob').val(data.dob);
                $('#emp-emg-guardian').val(data.emergencyInfo);
                $('#emp-emg-contact').val(data.emergencyContact);
                $('#emp-civil-status').val(data.status);
                $('#emp-branch').val(data.branchId);
                $('#emp-address-lane').val(data.address.lane);
                $('#emp-address-country').val(data.address.mainCountry);
                $('#emp-address-city').val(data.address.mainCity);
                $('#emp-address-state').val(data.address.mainState);
                $('#emp-address-code').val(data.address.postalCode);
                $('#emp-img-preview').attr('src', 'https://drive.google.com/thumbnail?id=' + data.profilePic + '&sz=w1000');
                $('#employee-modal').modal('show');
            },
            error: function (error) {
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
                    title: "session expired"
                });
            }
        })
    });
}

loadAllAdmins();

function loadAllUsers() {
    $.ajax({
        url: BASE_URL + 'api/v1/employee/cashier',
        type: 'GET',
        headers: {
            Authorization: 'Bearer ' + user.jwt
        },
        success: function (data) {
            console.log(data)
            $('#emp-cashier-row').empty();
            data.forEach(employee => {
                $('#emp-cashier-row').append(`
                    <div class="col position-relative">
            <div class="card mt-3 p-2">
              <div class="employee-header"></div>
              <img src="https://drive.google.com/thumbnail?id=${employee.profilePic}&sz=w1000" width="100" height="100" class="rounded-circle m-auto z-3">
              <small class="text-center emp-id">${employee.empId}</small>
              <h6 class="text-center">${employee.empName}</h6>
              <small class="text-center emp-designation">${employee.designation}</small>
              <div class="d-flex gap-5 justify-content-sm-between px-4">
                <small>Branch</small>
                <small>${employee.branchName}</small>
              </div>
              <div class="d-flex gap-5 justify-content-sm-between px-4">
                <small>Date of Birth</small>
                <small class="dob">${employee.dob}</small>
              </div>
              <div class="d-flex gap-5 justify-content-sm-between px-4">
                <small>Gender</small>
                <small>${employee.gender}</small>
              </div>
              <div class="d-flex gap-5 justify-content-sm-between px-4">
                <small>Email</small>
                <small class="email">${employee.email}</small>
              </div>
              <div class="d-flex gap-5 justify-content-sm-between px-4">
                <small>Contact No</small>
                <small class="emp-contact">${employee.contact}</small>
              </div>
              <small class="text-center mt-2 text-dark">${employee.address.lane}<br>Dickwall</small>
              <small class="text-danger">Emergency</small>
              <div class="d-flex gap-5 mt-2 justify-content-sm-between px-4">
                <small class="emg-info">${employee.emergencyInfo}</small>
                <small class="emg-contact">${employee.emergencyContact}</small>
              </div>
              <hr>
              <div class="d-flex mt-2 justify-content-end px-4">
                <button class="btn btn-sm btn-primary btn-edit-employee">Edit</button>
<!--                <button class="btn btn-sm btn-danger ms-2">Delete</button>-->
              </div>
            </div>
          </div>
                `);
            });
            setEvent();
        },
        error: function (error) {
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
                title: "session expired"
            });
        }
    });
}

loadAllUsers();