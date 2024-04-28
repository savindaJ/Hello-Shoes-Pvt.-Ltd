const user = JSON.parse(localStorage.getItem('user'));
console.log(user);
$('#admin-profile-pic').attr('src', `https://drive.google.com/thumbnail?id=${user.profilePic}&sz=w1000`);
$('#user-image').attr('src', `https://drive.google.com/thumbnail?id=${user.profilePic}&sz=w1000`);
$('#admin-user-name').text(user.username);

if (user.role === 'SUPER_ADMIN') {
    $('#admin-option').append(`
                        <li class="mt-3">
                    <a href="manager.html" class="nav-link ">
                        <svg class="bi me-2" width="16" height="16">
                            <i class="bi bi-person-lines-fill text-white bg-primary p-2 rounded-2"></i>
                        </svg>
                        <small class="text-secondary ms-3">Manager</small>
                    </a>
                </li>
                <li class="mt-3">
                    <a href="branch.html" class="nav-link ">
                        <svg class="bi me-2" width="16" height="16">
                            <i class="bi bi-person-lines-fill text-white bg-primary p-2 rounded-2"></i>
                        </svg>
                        <small class="text-secondary ms-3">Branch</small>
                    </a>
                </li>
    `);
}