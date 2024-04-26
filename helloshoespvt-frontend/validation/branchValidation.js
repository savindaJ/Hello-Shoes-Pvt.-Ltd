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

function clearInputFields() {
    $("#branch-inputs input").val("");
    $("#branch-inputs input").css("border", "1px solid #ced4da");
    $("#branch-name").focus();
}

function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}


$("#branch-inputs input").on("keydown keyup", function () {
    setBtn();
});

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }

}

function checkAll() {
    for (let i = 0; i < vArray.length; i++) {
        if (!checkValidations(vArray[i])) return false;
    }
    return true;
}

function setBtn() {
    if (checkAll()) {
        $("#btn-add-branch").prop("disabled", false);
    } else {
        $("#btn-add-branch").prop("disabled", true);
    }
}

$("#btn-add-branch").prop("disabled", true);