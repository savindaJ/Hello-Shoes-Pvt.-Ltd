let branchID;

$('#btn-branch-modal').on('click', function () {
    $('#btn-add-branch').text('Add Branch')
    $('#branch-modal').modal('show');
});

$('#btn-add-branch').on('click', function () {
    let branch = {
        branchId: branchID,
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
    if ($('#btn-add-branch').text() === 'Add Branch') {
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
    }else {
        $.ajax({
            url: BASE_URL + 'api/v1/branch',
            headers: {
                "Authorization": "Bearer " + user.jwt
            },
            method: 'PUT',
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
    }
});

function setEvent(){
    $('#tbl-branch').on('click', '.btn-edit-branch', function(){
        $('#btn-add-branch').text('Update Branch')
        $('#branch-modal').modal('show');
        let branchId = $(this).closest('tr');
        branchID = branchId.find('td:eq(0)').text();
        $('#branch-name').val(branchId.find('td:eq(1)').text());
        $('#branch-contact').val(branchId.find('td:eq(2)').text());
        $('#branch-address-lane').val(branchId.find('td:eq(5)').text().split(',')[0]);
        $('#branch-address-country').val(branchId.find('td:eq(5)').text().split(',')[4]);
        $('#branch-address-city').val(branchId.find('td:eq(5)').text().split(',')[1]);
        $('#branch-address-state').val(branchId.find('td:eq(5)').text().split(',')[2]);
        $('#branch-address-code').val(branchId.find('td:eq(5)').text().split(',')[3]);

    });

}

function getAllBranches() {
    $.ajax({
        url: BASE_URL + 'api/v1/branch',
        headers: {
            "Authorization": "Bearer " + user.jwt
        },
        method: 'GET',
        success: function (res) {
            console.log(res);
            let branches = res;
            let html = '';
            branches.forEach(branch => {
                html += `
               <tr style="font-size: 13px">
                   <td scope="row">${branch.branchId}</td>
                   <td>${branch.branchName}</td>
                   <td>${branch.branchContact}</td>
                   <td>${branch.branchManager===null ? 'not assign' : branch.branchManager}</td>
                   <td>${branch.noOfEmployees ===null ? 'not assign' : branch.noOfEmployees}</td>
                   <td>${branch.address.lane}, ${branch.address.mainCity}, ${branch.address.mainState}, ${branch.address.postalCode},${branch.address.mainCountry}</td>
                   <td>${branch.createdDate}</td>
                   <td class="d-flex h-100">
                       <button style="height: 30px" class="btn btn-sm btn-outline-primary btn-edit-branch">
                           <i class="bi bi-pencil-square"></i>
                       </button>
                       <button style="height: 30px" class="btn btn-sm ms-2 btn-outline-danger">
                           <i class="bi bi-trash3-fill"></i>
                       </button>
                   </td>
               </tr>
                `;
            });
            setEvent();
            $('#tbl-branch').html(html);
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
                title: 'Session expired! Please login again.'
            });
        }
    });
}

getAllBranches();