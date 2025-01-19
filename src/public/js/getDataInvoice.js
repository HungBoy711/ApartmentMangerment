$('#editModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);

    var ID = button.data('id');
    var InvoiceID = button.data('invoiceid');
    var ContractID = button.data('contractid');
    var PaymentTerm = button.data('paymentterm');
    var ApartmentFee = button.data('apartmentfee');
    var ElectricityFee = button.data('electricityfee');
    var WaterFee = button.data('waterfee');

    var modal = $(this);
    modal.find('#ID').val(ID);
    modal.find('#InvoiceID').val(InvoiceID);
    modal.find('#ContractID').val(ContractID);
    modal.find('#PaymentTerm').val(PaymentTerm);
    modal.find('#ApartmentFee').val(ApartmentFee);
    modal.find('#ElectricityFee').val(ElectricityFee);
    modal.find('#WaterFee').val(WaterFee);
});

$('#deleteModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var ID = button.data('id');
    var Owner = button.data('owner');

    var modal = $(this);
    modal.find('#ID').val(ID);
    modal.find('#Owner').val(Owner);
});
