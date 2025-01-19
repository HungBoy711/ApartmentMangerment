$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);

    var ID = button.data('id');
    var ApartNumber = button.data('apartnumber');
    var Owner = button.data('owner');
    var ContractID = button.data('contractid');
    var ContractType = button.data('contracttype');
    var ContractStartDate = button.data('contractstartdate');
    var ContractEndDate = button.data('contractenddate');
    var ContractStatus = button.data('contractstatus');

    var modal = $(this);
    modal.find('#ID').val(ID);
    modal.find('#ApartNumber').val(ApartNumber);
    modal.find('#Owner').val(Owner);
    modal.find('#ContractID').val(ContractID);
    modal.find('#ContractType').val(ContractType);
    modal.find('#ContractStartDate').val(ContractStartDate);
    modal.find('#ContractEndDate').val(ContractEndDate);
    modal.find('#ContractStatus').val(ContractStatus);
});

$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ID = button.data('id');
    var Owner = button.data('owner');
    var modal = $(this);
    modal.find('#ID').val(ID);
    modal.find('#Owner').val(Owner);
});




