$('#paymentModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;

    var ID = button.data('id');
    var InvoiceID = button.data('invoiceid');
    var Owner = button.data('owner');
    var ApartNumber = button.data('apartnumber');
    var PaymentTerm = button.data('paymentterm');
    var ApartmentFee = button.data('apartmentfee');
    var ElectricityFee = button.data('electricityfee');
    var WaterFee = button.data('waterfee');
    var Total = button.data('total');

    var modal = $(this);
    modal.find('#ID').val(ID);
    modal.find('#InvoiceID').val(InvoiceID);
    modal.find('#Owner').val(Owner);
    modal.find('#ApartNumber').val(ApartNumber);
    modal.find('#PaymentTerm').val(PaymentTerm);
    modal.find('#ApartmentFee').val(ApartmentFee);
    modal.find('#ElectricityFee').val(ElectricityFee);
    modal.find('#WaterFee').val(WaterFee);
    modal.find('#PaymentDate').val(currentDate);
    modal.find('#Total').val(Total);
});
