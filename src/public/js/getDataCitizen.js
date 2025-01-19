$('#editCitizenModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);

    var ID = button.data('id');
    var CitizenID = button.data('citizenid');
    var ApartID = button.data('apartid');
    var Relationship = button.data('relationship');
    var Name = button.data('name');
    var BirthDay = button.data('birthday');
    var Gender = button.data('gender');
    var Hometown = button.data('hometown');
    var Phone = button.data('phone');
 
    var date = new Date(BirthDay);
    BirthDay = date.toISOString().split('T')[0]; 

    var modal = $(this);
    modal.find('#ID').val(ID);
    modal.find('#CitizenID').val(CitizenID);
    modal.find('#Name').val(Name);
    modal.find('#ApartID').val(ApartID);
    modal.find('#Relationship').val(Relationship);
    modal.find('#BirthDay').val(BirthDay);
    modal.find('#Gender').val(Gender);
    modal.find('#Hometown').val(Hometown);
    modal.find('#Phone').val(Phone);

});

$('#deleteCitizenModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ID = button.data('id');
    var ApartID = button.data('apartid');
    var Name = button.data('name');

    var modal = $(this);
    modal.find('#ID').val(ID);
    modal.find('#Name').val(Name);
    modal.find('#ApartID').val(ApartID);
});




