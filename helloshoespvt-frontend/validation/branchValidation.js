var branchContactRegex = /^[0-9()-]{5,20}$/;
var branchAddressRegex = /^[a-zA-Z0-9\s,.-_]{5,100}$/;
var branchNameRegex = /^[a-zA-Z0-9\s]{5,50}$/;


let vArray = [];

vArray.push({field: $("#branch-name"), regEx: branchNameRegex});
vArray.push({field: $("#branch-contact"), regEx: branchContactRegex});
vArray.push({field: $("#branch-address-code"), regEx: branchAddressRegex});
vArray.push({field: $("#branch-address-state"), regEx: branchAddressRegex});
vArray.push({field: $("#branch-address-city"), regEx: branchAddressRegex});
vArray.push({field: $("#branch-address-country"), regEx: branchAddressRegex});
vArray.push({field: $("#branch-address-lane"), regEx: branchAddressRegex});

function validateEmployee() {
    let isValid = true;
    vArray.forEach(function (item) {
        if (!item.regEx.test(item.field.val())) {
            item.field.addClass("is-invalid");
            isValid = false;
        } else {
            item.field.removeClass("is-invalid");
            item.field.addClass("is-valid");
        }
    });
    return isValid;
}


$("#branch-inputs input").on("keydown keyup", function () {
    let isTrue = validateEmployee();
    if (isTrue) {
        $("#btn-add-branch").prop("disabled", false);
    } else {
        $("#btn-add-branch").prop("disabled", true);
    }
});

$("#btn-add-branch").prop("disabled", true);