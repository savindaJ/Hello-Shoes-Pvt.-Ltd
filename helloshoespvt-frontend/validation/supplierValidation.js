const supplierAddresRegEx = /^[a-zA-Z0-9\s,.-_]{5,100}$/;
const supplierNameRegex = /^[a-zA-Z0-9\s]{5,50}$/;
const supplierContactRegex = /^[0-9()-]{5,20}$/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


let vArray = [];

vArray.push({field: $("#supplier-name"), regEx: supplierNameRegex});
vArray.push({field: $("#sup-contact-1"), regEx: supplierContactRegex});
vArray.push({field: $("#sup-contact-2"), regEx: supplierContactRegex});
vArray.push({field: $("#sup-email"), regEx: emailRegex});


vArray.push({field: $("#sup-address-lane"), regEx: supplierAddresRegEx});
vArray.push({field: $("#sup-address-state"), regEx: supplierAddresRegEx});
vArray.push({field: $("#sup-address-city"), regEx: supplierAddresRegEx});
vArray.push({field: $("#sup-address-country"), regEx: supplierAddresRegEx});
vArray.push({field: $("#sup-address-code"), regEx: supplierAddresRegEx});
vArray.push({field: $("#sup-origin-country"), regEx: supplierAddresRegEx});

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


$("#supplier-inputs input").on("keydown keyup", function () {
    let isTrue = validateEmployee();
    if (isTrue) {
        $("#btn-add-sup").prop("disabled", false);
    } else {
        $("#btn-add-sup").prop("disabled", true);
    }
});

$("#btn-add-sup").prop("disabled", true);