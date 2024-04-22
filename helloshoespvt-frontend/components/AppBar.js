// your_script.js
document.addEventListener("DOMContentLoaded", function() {
    // Assuming your JavaScript generates a navbar
    var navbarHTML = "<nav class='navbar navbar-expand-lg navbar-light bg-light'><div class='container-fluid'><a class='navbar-brand' href='#'>Navbar</a><button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'><span class='navbar-toggler-icon'></span></button><div class='collapse navbar-collapse' id='navbarNav'><ul class='navbar-nav'><li class='nav-item'><a class='nav-link active' aria-current='page' href='#'>Home</a></li><li class='nav-item'><a class='nav-link' href='#'>Features</a></li><li class='nav-item'><a class='nav-link' href='#'>Pricing</a></li><li class='nav-item'><a class='nav-link disabled' href='#' tabindex='-1' aria-disabled='true'>Disabled</a></li></ul></div></div></nav>";

    // Insert navbar HTML into the container
    document.getElementById("navbar-container").innerHTML = navbarHTML;

    $('.navbar-brand').on('click',function (){
        console.log('cfff')
    });

});

$(document).ready(function(){
    $('.navbar-brand').on('click',function (){
        console.log('cfff')
    });
});
