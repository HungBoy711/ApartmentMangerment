


const getInvoicePage = async (req, res) => {
    let results = await Invoice.aggregate([
        {
            $lookup: {
                from: "contracts",
                localField: "ContractID",
                foreignField: "ContractID",
                as: "Details"
            }
        },
        { $unwind: "$Details" },
        {
            $project: {
                _id: 1,
                PaymentTerm: {
                    $dateToString: { format: "%d-%m-%Y", date: "$PaymentTerm" }
                },
                InvoiceID: 1,
                ApartmentFee: 1,
                ElectricityFee: 1,
                WaterFee: 1,
                Total: { $sum: ["$ApartmentFee", "$ElectricityFee", "$WaterFee"] },
                "Details.ContractID": 1,
                "Details.ApartNumber": 1,
                "Details.Owner": 1
            }
        }
    ]);
    return res.render('invoices/invoicePage.ejs', { listInvoices: results })
}

const createInvoice = async (req, res) => {
    let InvoiceID = req.body.InvoiceID;
    let ContractID = req.body.ContractID;
    let PaymentTerm = req.body.PaymentTerm;
    let ApartmentFee = req.body.ApartmentFee;
    let ElectricityFee = req.body.ElectricityFee;
    let WaterFee = req.body.WaterFee;

    await Invoice.create({
        InvoiceID: InvoiceID,
        ContractID: ContractID,
        PaymentTerm: PaymentTerm,
        ApartmentFee: ApartmentFee,
        ElectricityFee: ElectricityFee,
        WaterFee: WaterFee,
    });
    res.redirect('/invoice');
}
const editInvoice = async (req, res) => {
    let ID = req.body.ID;
    let InvoiceID = req.body.InvoiceID;
    let ContractID = req.body.ContractID;
    let PaymentTerm = req.body.PaymentTerm;
    let ApartmentFee = req.body.ApartmentFee;
    let ElectricityFee = req.body.ElectricityFee;
    let WaterFee = req.body.WaterFee;

    await Invoice.updateOne({ _id: ID }, {
        InvoiceID: InvoiceID,
        ContractID: ContractID,
        PaymentTerm: PaymentTerm,
        ApartmentFee: ApartmentFee,
        ElectricityFee: ElectricityFee,
        WaterFee: WaterFee
    });
    res.redirect('/invoice');
};

const deleteInvoice = async (req, res) => {
    let ID = req.body.ID;
    await Invoice.deleteOne({ _id: ID });
    res.redirect('/invoice');
}

const paymentInvoice = async (req, res) => {
    let { InvoiceID, Owner, ApartNumber, PaymentTerm, PaymentDate,
        ApartmentFee, ElectricityFee, WaterFee, Total } = req.body
    console.log('req', req.body)
    try {
        await PaymentHistory.create({
            InvoiceID, Owner, ApartNumber, PaymentTerm, PaymentDate,
            ApartmentFee, ElectricityFee, WaterFee, Total
        });

        res.status(200).redirect('/paymentHistory');
    } catch (error) {
        res.render('errorData.ejs');
    };
}

module.exports = {
    getInvoicePage, createInvoice,
    editInvoice, deleteInvoice,
    paymentInvoice
}