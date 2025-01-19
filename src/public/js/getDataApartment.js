$('#editApartmentModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);

    var ID = button.data('id');
    var ApartID = button.data('apartid');
    var CitizenCount = button.data('citizencount');
    var Floor = button.data('floor');
    var Status = button.data('status');
    var Size = button.data('size');

    var modal = $(this);
    modal.find('#ID').val(ID);
    modal.find('#ApartID').val(ApartID);
    modal.find('#CitizenCount').val(CitizenCount);
    modal.find('#Floor').val(Floor);
    modal.find('#Status').val(Status);
    modal.find('#Size').val(Size);
});

$('#deleteApartmentModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ID = button.data('id');
    var ApartID = button.data('apartid');
    var modal = $(this);
    modal.find('#ID').val(ID);
    modal.find('#ApartID').val(ApartID);
});




