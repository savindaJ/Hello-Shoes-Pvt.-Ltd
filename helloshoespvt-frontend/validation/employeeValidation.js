var employeeAddressRegex = /^[a-zA-Z0-9\s,.-_]{5,100}$/;
var empNameRegex = /^[a-zA-Z0-9\s]{5,50}$/;
var genderRegex = /^[a-zA-Z]{4,6}$/;
var civilStatusRegex = /^[a-zA-Z]{1,2}$/;
var contactRegex = /^[0-9]{10}$/;
var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var designationRegex = /^[a-zA-Z0-9\s]{5,50}$/;
var dobRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
var guardianNameRegex = /^[a-zA-Z0-9\s]{5,50}$/;

let vArray = [];

vArray.push({field: $("#emp-name"), regEx: empNameRegex});
// vArray.push({field: $("#emp-branch"), regEx: empNameRegex});
vArray.push({field: $("#emp-gender"), regEx: genderRegex});
vArray.push({field: $("#emp-civil-status"), regEx: civilStatusRegex});
vArray.push({field: $("#emp-contact"), regEx: contactRegex});
vArray.push({field: $("#emp-email"), regEx: emailRegex});
vArray.push({field: $("#emp-designation"), regEx: designationRegex});
vArray.push({field: $("#emp-dob"), regEx: dobRegex});
vArray.push({field: $("#emp-emg-guardian"), regEx: guardianNameRegex});
vArray.push({field: $("#emp-emg-contact"), regEx: contactRegex});



vArray.push({field: $("#emp-address-lane"), regEx: employeeAddressRegex});
vArray.push({field: $("#emp-address-state"), regEx: employeeAddressRegex});
vArray.push({field: $("#emp-address-city"), regEx: employeeAddressRegex});
vArray.push({field: $("#emp-address-country"), regEx: employeeAddressRegex});
vArray.push({field: $("#emp-address-code"), regEx: employeeAddressRegex});

function validateEmployee() {
    let isValid = true;
    vArray.forEach(function (item) {
        if (!item.regEx.test(item.field.val())) {
            item.field.addClass("is-invalid");
            isValid = false;
        } else {
            item.field.removeClass("is-invalid");
        }
    });
    return isValid;
}


$("#emp-inputs input").on("keydown keyup", function () {
    let isTrue = validateEmployee();
    if (isTrue) {
        $("#btn-add-emp").prop("disabled", false);
    } else {
        $("#btn-add-emp").prop("disabled", true);
    }
});

$("#btn-add-emp").prop("disabled", true);

