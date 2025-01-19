$('#editUserModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);

    var ID = button.data('id');
    var Username = button.data('username');
    var Email = button.data('email');
    var Role = button.data('role');
    var Gender = button.data('gender');
    var Phone = button.data('phone');

    var modal = $(this);
    modal.find('#ID').val(ID);
    modal.find('#Username').val(Username);
    modal.find('#Email').val(Email);
    modal.find('#Role').val(Role);
    modal.find('#Gender').val(Gender);
    modal.find('#Phone').val(Phone);
});

$('#deleteUserModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ID = button.data('id');
    var Username = button.data('username');

    var modal = $(this);
    modal.find('#ID').val(ID);
    modal.find('#Username').val(Username);
});
