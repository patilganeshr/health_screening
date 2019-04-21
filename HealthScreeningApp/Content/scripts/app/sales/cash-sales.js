
var SharpiTech = {};

SharpiTech.CashSales = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    var _salesBills = [];
    var _salesBillDeliveryDetails = [];
    var _salesBillPaymentDetails = [];
    var _salesBillChargesDetails = [];

    var _salesBillItems = [];
    var _salesBillItemsChargesDetails = [];

    var _gstApplicable = "IGST";

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.editMode = document.getElementById('EditMode');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.branch = document.getElementById('Branch');
        DOM.billNo = document.getElementById('BillNo');
        DOM.billDate = document.getElementById('BillDate');
        DOM.billDatePicker = document.getElementById('BillDatePicker');
        DOM.salesman = document.getElementById('Salesman');
        DOM.isTaxInclusive = document.getElementsByName('IsTaxInclusive');
        DOM.typeOfSale = document.getElementById('TypeOfSale');
        DOM.clientModal = document.getElementById('ClientModal');
        DOM.clientDetails = document.getElementById('ClientDetails');
        DOM.closeClientModal = document.getElementById('CloseClientModal');

        DOM.customer = document.getElementById('Customer');
        DOM.addNewCustomer = document.getElementById('AddNewCustomer');
        DOM.refreshCustomerList = document.getElementById('RefreshCustomerList');
        DOM.customerAddress = document.getElementById('CustomerAddress');
        DOM.consignee = document.getElementById('Consignee');
        DOM.addNewConsignee = document.getElementById('AddNewConsignee');
        DOM.refreshConsigneeList = document.getElementById('RefreshConsigneeList');
        DOM.consigneeAddress = document.getElementById('ConsigneeAdddress');
        DOM.billRemarks = document.getElementById('BillRemarks');
        
        DOM.salesBillItemsViewMode = document.getElementById('SalesBillItemsViewMode');
        DOM.addNewSalesBillItem = document.getElementById('AddNewSalesBillItem');
        DOM.salesBillItems = document.getElementById('SalesBillItems');
        DOM.backToSalesBillsList = document.getElementById('BackToSalesBillsList');
        DOM.saveSalesBill = document.getElementById('SaveSalesBill');
        DOM.printSalesBill = document.getElementById('PrintSalesBill');

        DOM.cashSaleItemModal = document.getElementById('CashSaleItemModal');

        DOM.salesBillItemsEditMode = document.getElementById('SalesBillItemsEditMode');
        DOM.salesBillItemId = document.getElementById('SalesBillItemId');
        DOM.srNo = document.getElementById('SrNo');
        DOM.barcode = document.getElementById('Barcode');
        DOM.barcodeItem = document.getElementById('BarcodeItem');
        DOM.itemName = document.getElementById('ItemName');
        DOM.qtyInPcs = document.getElementById('QtyInPcs');
        DOM.qtyInMtrs = document.getElementById('QtyInMtrs');
        DOM.saleRate = document.getElementById('SaleRate');
        DOM.amount = document.getElementById('Amount');
        DOM.discountDetails = document.getElementById('DiscountDetails');
        DOM.showDiscount = document.getElementById('ShowDiscount');
        DOM.taxDetails = document.getElementById('TaxDetails');
        DOM.showTaxDetails = document.getElementById('ShowTaxDetails');
        DOM.typeOfDiscount = document.getElementById('TypeOfDiscount');
        DOM.cashDiscountPercent = document.getElementById('CashDiscountPercent');
        DOM.cashDiscountAmt = document.getElementById('CashDiscountAmt');
        DOM.rateDifference = document.getElementById('RateDifference');
        DOM.rateAdjustment = document.getElementById('RateAdjustment');
        DOM.rateAdjustmentRemarks = document.getElementById('RateAdjustmentRemarks');
        DOM.rateAfterCDRD = document.getElementById('RateAfterCDRD');
        DOM.amountBeforeTax = document.getElementById('AmountBeforeTax');
        DOM.gstRate = document.getElementById('GSTRate');
        DOM.gstAmount = document.getElementById('GSTAmount');
        DOM.totalItemAmount = document.getElementById('TotalItemAmount');
        DOM.backToSalesBillItemsList = document.getElementById('BackToSalesBillItemsList');
        DOM.saveSalesBillItem = document.getElementById('SaveSalesBillItem');
        DOM.saveAndAddNewItem = document.getElementById('SaveAndAddNewItem');

        DOM.transporter = document.getElementById('Transporter');
        DOM.addNewTransporter = document.getElementById('AddNewTransporter');
        DOM.refreshTransporterList = document.getElementById('RefreshTransporterList');
        DOM.lrNo = document.getElementById('LRNo');
        DOM.lrDate = document.getElementById('LRDate');
        DOM.lrDatePicker = document.getElementById('LRDatePicker');
        DOM.deliveryDate = document.getElementById('DeliveryDate');
        DOM.deliveryDatePicker = document.getElementById('DeliveryDatePicker');
        DOM.isDeliveryPending = document.getElementsByName('IsDeliveryPending');
        DOM.deliveryRemarks = document.getElementById('DeliveryRemarks');

        DOM.paymentsettlement = document.getElementById('PaymentSettlement');
        DOM.modeOfPayment = document.getElementById('ModeOfPayment');
        DOM.paymentReferenceNo = document.getElementById('PaymentReferenceNo');
        DOM.paymentRemarks = document.getElementById('PaymentRemarks');

        DOM.billChargesViewMode = document.getElementById('BillChargesViewMode');
        DOM.salesBillChargeSrNo = document.getElementById('SalesBillChargeSrNo');
        DOM.salesBillChargeId = document.getElementById('SalesBillChargeId');
        DOM.addNewBillCharge = document.getElementById('AddNewBillCharge');
        DOM.billCharges = document.getElementById('BillCharges');
        DOM.billChargesEditMode = document.getElementById('BillChargesEditMode');
        DOM.billChargeName = document.getElementById('BillChargeName');
        DOM.billChargeAmount = document.getElementById('BillChargeAmount');
        DOM.isBillChargeTaxInclusive = document.getElementById('IsBillChargeTaxInclusive');
        DOM.billChargeGSTRate = document.getElementById('BillChargeGSTRate');
        DOM.billChargeGSTAmount = document.getElementById('BillChargeGSTAmount');
        DOM.billChargeTotalAmount = document.getElementById('BillChargeTotalAmount');
        DOM.backToBillChargesList = document.getElementById('BackToBillChargesList');
        DOM.saveBillCharges = document.getElementById('SaveBillCharges');
        DOM.saveAndAddNewBillCharge = document.getElementById('SaveAndAddNewBillCharge');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.createNewSalesBill = document.getElementById('CreateNewSalesBill');
        DOM.refreshSalesBill = document.getElementById('RefreshSalesBill');
        DOM.filter = document.getElementById('Filter');
        DOM.salesBillsDetails = document.getElementById('SalesBillsDetails');

        /* Jquery cache */

        DOM.$clientModal = $('#ClientModal');
        DOM.$closeClientModal = $('#CloseClientModal');
        DOM.$cashSalesItemModal = $('#CashSaleItemModal');
        DOM.$billDatePicker = $('#BillDatePicker');
        DOM.$lrDatePicker = $('#LRDatePicker');
        DOM.$deliveryDatePicker = $('#DeliveryDatePicker');
    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        DOM.$billDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

        DOM.$lrDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

        DOM.$deliveryDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });
    }

    $("select").on("change", function (event) {

        setFocusOnSelect(event);

    });

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    function bindEvents() {

        DOM.createNewSalesBill.addEventListener('click', createNewSalesBill);
        DOM.refreshSalesBill.addEventListener('click', refreshSalesBill);
        DOM.salesBillsDetails.addEventListener('click', salesBillsDetails);
        DOM.backToSalesBillsList.addEventListener('click', backToSalesBillsList);
        DOM.saveSalesBill.addEventListener('click', saveSalesBill);
        DOM.printSalesBill.addEventListener('click', printSalesBill);

        DOM.addNewSalesBillItem.addEventListener('click', addNewSalesBillItem);
        DOM.salesBillItems.addEventListener('click', salesBillItems);
        DOM.backToSalesBillItemsList.addEventListener('click', backToSalesBillItemsList);
        DOM.saveSalesBillItem.addEventListener('click', saveSalesBillItem);
        DOM.saveAndAddNewItem.addEventListener('click', saveAndAddNewItem);

        DOM.showDiscount.addEventListener('click', showDiscountDetails);
        DOM.showTaxDetails.addEventListener('click', showTaxDetails);

        DOM.addNewCustomer.addEventListener('click', addNewClient);
        DOM.refreshCustomerList.addEventListener('click', refreshClientList(event));

        DOM.addNewConsignee.addEventListener('click', addNewClient);
        DOM.refreshConsigneeList.addEventListener('click', refreshClientList(this));

        DOM.addNewTransporter.addEventListener('click', addNewClient);
        DOM.refreshTransporterList.addEventListener('click', refreshClientList(this));

        DOM.addNewBillCharge.addEventListener('click', addNewBillCharge);
        DOM.billCharges.addEventListener('click', billCharges);
        DOM.backToBillChargesList.addEventListener('click', backToBillChargesList);
        DOM.saveBillCharges.addEventListener('click', saveBillCharges);
        DOM.saveAndAddNewBillCharge.addEventListener('click', saveAndAddNewBillCharge);

        DOM.typeOfDiscount.onchange = function () {
            changeDiscountOption();
        }

        DOM.customer.onchange = function () {

            setConsignee();

            getGSTApplicable();

        }

        DOM.barcode.onchange = function () {

            getItemNameAsPerBarcode();

        }

        DOM.barcodeItem.input = function () {

            alert(document.getElementById('ItemDataList').getAttribute('data-item-id'));

        }

        DOM.qtyInPcs.onkeydown = function validate(e) {
            return _shared.acceptDecimalNos(e);
        };

        DOM.qtyInMtrs.onkeydown = function validate(e) {
            return _shared.acceptDecimalNos(e);
        };

        DOM.saleRate.onkeydown = function validate(e) {
            return _shared.acceptDecimalNos(e);
        };

        DOM.cashDiscountPercent.onkeydown = function validate(e) {
            return _shared.acceptDecimalNos(e);
        };

        DOM.rateDifference.onkeydown = function validate(e) {
            return _shared.acceptDecimalNos(e);
        };

        DOM.qtyInPcs.onblur = function () {
            calculateItemAmount();
        }

        DOM.qtyInMtrs.onblur = function () {
            calculateItemAmount();
        }

        DOM.saleRate.onblur = function () {
            calculateItemAmount();
        }

        DOM.cashDiscountPercent.onblur = function () {
            calculateItemAmount();
        }

        DOM.rateDifference.onblur = function () {
            calculateItemAmount();
        }

    }

    function setFocus() {
        DOM.$cashSalesItemModal.on('shown.bs.modal', function () {
            DOM.itemName.focus();
        });
    }

    function loadData() {

        getFinancialYears();

        getBranchNames();

        getTypeOfSale();

        getCustomers();

        getConsignees();

        getTransporters();

        getSalesmans();

        getDiscountOptions();

        getModeOfPayments();

        getPaymentSettlements();

        addRateAdjustment();

        getCharges();
        //getItems();

    }

    function getDiscountOptions() {

        var fragment = document.createDocumentFragment();

        //Add default option
        var _option = document.createElement('OPTION');
        _option.innerHTML = "Choose Discount Type";
        _option.value = -1;
        fragment.appendChild(_option);

        _option = document.createElement('OPTION');
        _option.innerHTML = "Cash Discount";
        _option.value = "CD";
        fragment.appendChild(_option);

        _option = document.createElement('OPTION');
        _option.innerHTML = "Rate Difference";
        _option.value = "RD";
        fragment.appendChild(_option);

        DOM.typeOfDiscount.appendChild(fragment);
    }

    function getModeOfPayments() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetModeOfPayments', DOM.modeOfPayment, "PaymentMode", "ModeOfPaymentId", "Choose Mode of Payment", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.modeOfPayment, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.modeOfPayment);
                }
            }
        });
    }

    
    function getPaymentSettlements() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetPaymentSettlements', DOM.paymentsettlement, "SettlementOfPayment", "PaymentSettlementId", "Choose Payment Settlement", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.paymentsettlement, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.paymentsettlement);
                }
            }
        });
    }

    function addRateAdjustment() {

        var fragment = document.createDocumentFragment();

        //Add default option
        var _option = document.createElement('OPTION');
        _option.innerHTML = "Choose Adjust Rate";
        _option.value = -1;
        fragment.appendChild(_option);

        _option = document.createElement('OPTION');
        _option.innerHTML = "Add";
        _option.value = "A";
        fragment.appendChild(_option);

        _option = document.createElement('OPTION');
        _option.innerHTML = "Less";
        _option.value = "L";
        fragment.appendChild(_option);

        DOM.rateAdjustment.appendChild(fragment);
    }

    function getFinancialYears() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {
            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.financialYear);
                }
            }
        });
    }

    function getBranchNames() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllBranchNames', DOM.branch, "BranchName", "BranchId", "Choose Branch", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.branch, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.branch);
                }
            }
        });
    }


    function getTypeOfSale() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetTypeOfSales', DOM.typeOfSale, "SaleType", "SaleTypeId", "Choose Type of Sale", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.typeOfSale, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.typeOfSale);
                }
            }
        });
    }

    function getCustomers() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/1', DOM.customer, "ClientAddressName", "ClientAddressId", "Choose Customer", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.customer, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.customer);

                    getGSTApplicable();
                }
            }
        });
    }

    function getConsignees() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/1', DOM.consignee, "ClientAddressName", "ClientAddressId", "Choose Consignee", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.consignee, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.consignee);

                    //getGSTApplicable();
                }
            }
        });
    }

    function getTransporters() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/3', DOM.transporter, "ClientAddressName", "ClientAddressId", "Choose Transporter", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.transporter, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.transporter);
                }
            }
        });
    }

    function getSalesmans() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetEmployeesByDepartmentId/3', DOM.salesman, "FullName", "EmployeeId", "Choose Salesman", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.salesman, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.salesman);
                }
            }
        });
    }

    //function getItems() {

    //    _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetItemsByBrandCategoryAndQuality', DOM.itemName, "ItemName", "ItemId", "Choose Item", function (response) {
    //        if (response.status === 200) {

    //            if (response.responseText !== undefined) {

    //                _shared.setSelectOptionByIndex(DOM.itemName, parseInt(-1));
    //                _shared.setSelect2ControlsText(DOM.itemName);
    //            }
    //        }
    //    });
    //}

    function getCharges() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllCharges', DOM.billChargeName, "ChargeName", "ChargeId", "Choose Charge", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    if (DOM.billChargeName.options.length > 1) {
                        _shared.setSelectOptionByIndex(DOM.billChargeName, parseInt(1));
                        _shared.setSelect2ControlsText(DOM.billChargeName);
                    }
                }
            }
        });
    }
    $('#BarcodeItem').autocomplete({
        source: function (request, response) {
            //var param = { hsCod: HSCode.value };
            $.ajax({
                url: SERVICE_PATH + "SearchItemByItemName/" + DOM.barcodeItem.value + "",
                dataType: "json",
                type: "GET",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.ItemName, //vLabel,
                            val: item.ItemId //vValue                                                    }
                        }
                    }))
                    if (data.length === 0) {
                        DOM.barcodeItem.value = "";
                        DOM.barcodeItem.removeAttribute("data-item-id");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    handleError(textStatus + ' ' + errorThrown);
                    swal({
                        title: "Error",
                            text: "No Records Found.",
                            type: "error"
                        }, function () {
                           DOM.barcodeItem.value = "";
                            DOM.barcodeItem.focus();                    
                    });                    
                }
            });
        },
        select: function (event, ui) {
            if (ui.item) {

                DOM.barcodeItem.value = ui.item.label;
                DOM.barcodeItem.setAttribute('data-item-id', parseInt(ui.item.val));
            }
        },
        minLength: 2
    });

    //function getItems() {

    //    _shared.sendRequest(SERVICE_PATH + "GetItemsByBrandCategoryAndQuality", "GET", true, "JSON", null, function (response) {

    //        if (response.status === 200) {

    //            if (response.responseText !== undefined) {

    //                var _response = JSON.parse(response.responseText);

    //                if (_response.length > 0) {

    //                    for (var r = 0; r < _response.length; r++) {

    //                        var option = document.createElement('option');
                            
    //                        //option.text = _response[r].ItemName;
    //                        option.value = _response[r].ItemName;
    //                        option.setAttribute('data-item-id', _response[r].ItemId);

    //                        document.getElementById('ItemDataList').appendChild(option);
    //                    }
    //                }
    //            }
    //        }
    //    });
    //}

    var getHeight = function () {

            DOM.discountDetails.style.display = "block";

            var height = DOM.discountDetails.scrollHeight + 'px';

            DOM.discountDetails.style.display = '';

            return height;
        };

    function showDiscountDetails() {
        
        if (DOM.discountDetails.classList.contains("is-not-visible")) {
            DOM.discountDetails.classList.remove("is-not-visible");
            DOM.discountDetails.classList.add("is-visible");
        }
        else {
            DOM.discountDetails.classList.remove("is-visible");
            DOM.discountDetails.classList.add("is-not-visible");
        }
    }

    function showTaxDetails() {

        if (DOM.taxDetails.classList.contains("is-not-visible")) {
            DOM.taxDetails.classList.remove("is-not-visible");
            DOM.taxDetails.classList.add("is-visible");
        }
        else {
            DOM.taxDetails.classList.remove("is-visible");
            DOM.taxDetails.classList.add("is-not-visible");
        }
    }

    function getMaxSrNo(data, maxSrNo) {

        var _maxSrNo = maxSrNo;

        if (data.length > 0) {

            for (var s = 0; s < data.length; s++) {

                if (data[s].SrNo >= _maxSrNo) {
                    _maxSrNo = data[s].SrNo;
                }
            }
        }

        return _maxSrNo += 1;
    }

    function setConsignee() {

        if (DOM.customer.selectedIndex > 0) {

            var customerId = DOM.customer.options[DOM.customer.selectedIndex].value;

            _shared.setSelectValue(DOM.consignee, null, parseInt(customerId));
            _shared.setSelect2ControlsText(DOM.consignee);

        }
    }

    function getGSTApplicable() {

        var clientAddressId = parseInt(DOM.customer.options[DOM.customer.selectedIndex].value);

        if (isNaN(clientAddressId)) { clientAddressId = parseInt(0); }

        _shared.sendRequest(SERVICE_PATH + "GetGSTApplicable/" + clientAddressId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response.GSTName !== undefined) {

                        _gstApplicable = _response.GSTName;
                    }
                }
            }
        });
    }

    function getItemNameAsPerBarcode() {

        if (DOM.barcode.value !== "") {

            var index = parseInt(DOM.barcode.value.lastIndexOf('/'));

            if (index > 0) {

                var goodsReceiptItemId = parseInt(DOM.barcode.value.substring(index + 1));
            }

            if (isNaN(goodsReceiptItemId)) { goodsReceiptItemId = parseInt(0); }

            if (goodsReceiptItemId > 0) {

                _shared.sendRequest(SERVICE_PATH + "GetItemNameAsPerBarcode/" + goodsReceiptItemId, "GET", true, "JSON", null, function (response) {

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            var _response = JSON.parse(response.responseText);

                            if (_response.ItemName === null) {
                                DOM.barcodeItem.value = "";
                                swal("error", "No Item found.", "error");
                            }
                            else if (_response.ItemName !== undefined) {

                                DOM.barcodeItem.value = _response.ItemName;
                                DOM.barcodeItem.setAttribute('data-goods-receipt-item-id', goodsReceiptItemId);
                                DOM.barcodeItem.setAttribute('data-item-id', _response.ItemId);
                                DOM.barcodeItem.setAttribute('data-unit-code', _response.UnitCode);
                            }

                            DOM.qtyInPcs.value = parseInt(1);
                            DOM.qtyInPcs.focus();
                        }
                    }
                });
            }            
        }

        DOM.barcode.value = "";
    }

    function changeDiscountOption() {

        var selectedIndex = DOM.typeOfDiscount.selectedOptions[0].index;

        DOM.cashDiscountPercent.value = 0;
        DOM.cashDiscountAmt.value = 0;
        DOM.rateDifference.value = 0;

        if (selectedIndex > 0) {

            var selectedOption = DOM.typeOfDiscount.options[selectedIndex].text.toUpperCase();

            if (selectedOption === 'CASH DISCOUNT') {
                DOM.cashDiscountPercent.disabled = false;
                DOM.cashDiscountAmt.disabled = true;
                DOM.rateDifference.disabled = true;

                DOM.cashDiscountPercent.focus();
            }
            else {
                DOM.cashDiscountPercent.disabled = true;
                DOM.cashDiscountAmt.disabled = true;
                DOM.rateDifference.disabled = false;

                DOM.rateDifference.focus()
            }
        }

        calculateItemAmount();
    }

    function calculateItemAmount() {


        var qtyInPcs = parseFloat(0);
        var qtyInMtrs = parseFloat(0);
        var saleRate = parseFloat(0);
        var amount = parseFloat(0);
        var cashDiscountPercent = parseFloat(0);
        var cashDiscountAmt = parseFloat(0);
        var rateDifference = parseFloat(0);
        var rateAfterCDRD = parseFloat(0);
        var amountBeforeTax = parseFloat(0);
        var gstRate = parseFloat(0);
        var gstAmount = parseFloat(0);
        var totalItemAmount = parseFloat(0);

        qtyInPcs = parseFloat(DOM.qtyInPcs.value);
        saleRate = parseFloat(DOM.saleRate.value);
        cashDiscountPercent = parseFloat(DOM.cashDiscountPercent.value);
        rateDifference = parseFloat(DOM.rateDifference.value);

        DOM.cashDiscountPercent.value = cashDiscountPercent;
        DOM.cashDiscountAmt.value = cashDiscountAmt;
        DOM.rateDifference.value = rateDifference;
        DOM.rateAfterCDRD.value = rateAfterCDRD;
        DOM.amount.value = amount;

        DOM.amountBeforeTax.value = amountBeforeTax;
        DOM.gstRate.value = gstRate;
        DOM.gstAmount.value = gstAmount;
        DOM.totalItemAmount.value = totalItemAmount;

        if (cashDiscountPercent > 0) {

            cashDiscountAmt = parseFloat(parseFloat(saleRate * (cashDiscountPercent / 100)).toFixed(2));

            DOM.cashDiscountAmt.value = cashDiscountAmt;

            DOM.rateAfterCDRD.value = parseFloat(saleRate - cashDiscountAmt);

            if (qtyInPcs >= 0) {

                amount = parseFloat(qtyInPcs * (parseFloat(DOM.rateAfterCDRD.value)));

            }
            else if (qtyInMtrs >= 0) {

                amount = parseFloat(qtyInMtrs * (parseFloat(DOM.rateAfterCDRD.value)));
            }
        }
        else if (rateDifference > 0) {

            DOM.rateAfterCDRD.value = parseFloat(saleRate - rateDifference);

            if (qtyInPcs >= 0) {

                amount = parseFloat(qtyInPcs * (parseFloat(DOM.rateAfterCDRD.value)));

            }
            else if (qtyInMtrs >= 0) {

                amount = parseFloat(qtyInMtrs * (parseFloat(DOM.rateAfterCDRD.value)));
            }
        }
        else {

            DOM.rateAfterCDRD.value = parseFloat(saleRate);

            if (qtyInPcs > 0 && qtyInMtrs === 0) {

                amount = parseFloat(qtyInPcs * (parseFloat(DOM.rateAfterCDRD.value)));

            }
            else if (qtyInMtrs > 0 && qtyInPcs === 0) {

                amount = parseFloat(qtyInMtrs * (parseFloat(DOM.rateAfterCDRD.value)));
            }
            else {
                amount = 0;
            }
        }

        DOM.amount.value = amount;

        if (amount > 0) {

            var rate = 0;

            getGSTRate(function(response) {
                rate = response.Rate;
         
            if (rate >= 0) {
                            gstRate = rate;

                            DOM.gstRate.setAttribute('data-gst-rate-id', parseInt(response.GSTRateId));
                            DOM.gstRate.setAttribute('data-tax-id', parseInt(response.TaxId));

                            DOM.gstRate.value = gstRate;

                            var gstExclAmount = parseFloat(0);
                            var gstInclAmount = parseFloat(0);

                            if (_shared.isRadioButtonValueSelected(DOM.isTaxInclusive) === true) {

                                gstExclAmount = parseFloat(parseFloat(parseFloat(amount * 100) / (gstRate + 100)).toFixed(2));

                                DOM.amountBeforeTax.value = gstExclAmount;

                                gstAmount = parseFloat(parseFloat(gstExclAmount * (gstRate / 100)).toFixed(2));

                            }
                            else {

                                //DOM.amount.value = gstInclAmount;

                                gstAmount = parseFloat(parseFloat(parseFloat(DOM.amountBeforeTax.value) * (gstRate / 100)).toFixed(2));
                            }

                            DOM.gstAmount.value = gstAmount;

                            totalItemAmount = parseFloat(parseFloat(gstExclAmount + gstAmount).toFixed(2));

                            DOM.totalItemAmount.value = totalItemAmount;
                        }
            //        }
            //    }
            });
        }

    }

    function getGSTRate(callback) {

        var gstRate = parseInt(0);
        var itemId = parseInt(0);

        if (DOM.barcodeItem.value === "") {
            itemId = parseInt(DOM.itemName.getAttribute('data-item-id'));
        }
        else {
            itemId = DOM.barcodeItem.getAttribute('data-item-id');
        }

        var saleRate = parseFloat(0);

        saleRate = parseFloat(DOM.saleRate.value);

        var gstr = {};

        gstr = {
            ItemId: itemId,
            GSTApplicable: 'SGST',
            Rate: saleRate,
            EffectiveFromDate: DOM.billDate.value
        };

        var postData = JSON.stringify(gstr);

        _shared.sendRequest(SERVICE_PATH + "GetGSTRateByItemIdGSTApplicableAndSaleRate/", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response.Rate >= 0) {

                        gstRate = _response;

                        callback(gstRate);
                    }
                }
            }
        });
    }

    function toggleModes(editModeDisplay, viewModeDisplay) {

        DOM.editMode.style.display = editModeDisplay;
        DOM.viewMode.style.display = viewModeDisplay;
    }

    function setDefaultCustomer() {

        if (DOM.typeOfSale.selectedIndex > 0) {
            if (DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].text.trim().toUpperCase() === "CASH SALES") {

                _shared.setSelectValue(DOM.customer, 'Cash Sales', null);
                _shared.setSelect2ControlsText(DOM.customer);
            }
        }
    }

    function addNewClient(evt) {

        var clientType = null;

        if (evt.currentTarget.name.toUpperCase() === "NEW_CUSTOMER" || evt.currentTarget.name.toUpperCase() === "NEW_CONSIGNEE") {
            if (DOM.typeOfSale.selectedIndex > 0) {
                if (DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].text.trim().toUpperCase() === "CASH") {
                    // Open local client modal popup
                    DOM.clientDetails.src = location.origin + '/POS/PopUps/LocalClient';
                    DOM.clientDetails.style = 'zoom:0.60; frameborder:0; height:450px; width:99.6%;';

                    DOM.$clientModal.modal('show');
                }
                else {
                    clientType = "CUSTOMER";
                }
            }            
        }

        else if (evt.currentTarget.name.toUpperCase() === "NEW_TRANSPORTER") {
            clientType = "TRANSPORTER";
        }

        if (clientType !== null) {
            window.open(location.origin + '/POS/Masters/client?clientType=' + clientType + '', '_blank');
        }
    }

    function refreshClientList(evt) {

    }

    $('#ClientModal').on('hidden.bs.modal', function () {

        var iframe = $(this).find('iframe');

        var innerDoc = iframe[0].contentWindow.document;

        var clientName = innerDoc.getElementById('ClientName').value;
        var mobileNo = innerDoc.getElementById('MobileNo').value;

        if (clientName === "" || clientName === "") {
            clientName = "CASH SALES - " + mobileNo;
        }

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/1', DOM.consignee, "ClientAddressName", "ClientAddressId", "Choose Consignee", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectValue(DOM.consignee, clientName, null);
                    _shared.setSelect2ControlsText(DOM.consignee);                    
                }
            }
            else {
                swal("Error!!!", "Error in the application " + response.responseText, "error");
            }
        });

        
    });

    function createNewSalesBill() {

        //clear the modal control inputs        
        _shared.clearInputs(DOM.editMode);
        _shared.clearTextAreas(DOM.editMode);
        _shared.clearSelect(DOM.editMode);
        _shared.clearTables(DOM.editMode);

        _shared.clearInputs(DOM.salesBillItemsEditMode);
        _shared.clearTextAreas(DOM.salesBillItemsEditMode);
        _shared.clearSelect(DOM.salesBillItemsEditMode);
        _shared.clearTables(DOM.salesBillItemsEditMode);

        _shared.clearInputs(DOM.billChargesEditMode);
        _shared.clearSelect(DOM.billChargesEditMode);
        _shared.clearTables(DOM.billChargesEditMode);

        //DOM.salesBillsDetails.tBodies[0].innerHTML = "";

        _salesBills = [];
        _salesBillDeliveryDetails = [];
        _salesBillPaymentDetails = [];
        _salesBillChargesDetails = [];
        _salesBillItems = [];
        _salesBillItemsChargesDetails = [];

        _shared.disableControls(DOM.editMode, false);
        _shared.disableControls(DOM.billChargesEditMode, false);

        // Set default values
        DOM.billNo.setAttribute('data-sales-bill-id', parseInt(0));

        DOM.billNo.value = parseInt(0);

        DOM.billNo.disabled = true;

        var currentDate = new Date();

        DOM.billDate.value = moment(currentDate).format("DD/MMM/YYYY");

        _shared.setSelectOptionByIndex(DOM.financialYear, 1);
        _shared.setSelect2ControlsText(DOM.financialYear);

        _shared.setSelectOptionByIndex(DOM.branch, 1);
        _shared.setSelect2ControlsText(DOM.branch);

        _shared.setSelectOptionByIndex(DOM.salesman, 1);
        _shared.setSelect2ControlsText(DOM.salesman);

        _shared.setSelectOptionByIndex(DOM.typeOfSale, 1);
        _shared.setSelect2ControlsText(DOM.typeOfSale);

        _shared.setSelectOptionByIndex(DOM.paymentsettlement, 1);
        _shared.setSelect2ControlsText(DOM.paymentsettlement);

        _shared.setSelectOptionByIndex(DOM.modeOfPayment, 1);
        _shared.setSelect2ControlsText(DOM.modeOfPayment);

        _shared.showPanel(DOM.editMode);
        _shared.hidePanel(DOM.viewMode);

        _shared.showPanel(DOM.salesBillItemsViewMode);
        _shared.hidePanel(DOM.salesBillItemsEditMode);

        _shared.showPanel(DOM.billChargesViewMode);
        _shared.hidePanel(DOM.billChargesEditMode);

        DOM.customer.focus();
    }

    function refreshSalesBill() {
        getSalesBills();
    }

    function backToSalesBillsList() {

        _shared.showPanel(DOM.viewMode);
        _shared.hidePanel(DOM.editMode);
    }

    function viewSalesBill(currentTableRow) {

        _shared.clearInputs(DOM.editMode);

        _shared.disableControls(DOM.editMode, true);

        showSelectedSalesBillDetails(currentTableRow);
    }

    function editSalesBill(currentTableRow) {

        _shared.clearInputs(DOM.editMode);

        _shared.disableControls(DOM.editMode, false);

        showSelectedSalesBillDetails(currentTableRow);
    }

    function deleteSaleBill(currentTableRow) {

        var table = DOM.salesBillsDetails;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var salesBillId = currentTableRow.getAttribute('data-sales-bill-id');

        var salesBilll = {};

        salesBill = {
            SalesBillId: salesBillId,
            IsDeleted: true,
            DeletedBy: LOGGED_USER,
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(salesBill);

        _shared.sendRequest(SERVICE_PATH + 'SaveSalesBill', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function salesBillsDetails(evt) {

        var element = evt.target;

        var currentTableRow;

        if (element.nodeName === 'I') {
            currentTableRow = element.parentElement.parentElement.parentElement;
        }
        else if (element.nodeName === 'A') {
            currentTableRow = element.parentElement.parentElement;
        }

        if (element.getAttribute('data-name').trim().toUpperCase() === "VIEW") {
            viewSalesBill(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "EDIT") {
            editSalesBill(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "REMOVE") {
            deleteSalesBill(currentTableRow);
        }
    }

    function showSelectedSalesBillDetails(currentTableRow) {

        var salesBillId = parseInt(currentTableRow.getAttribute('data-sales-bill-id'));

        if (_salesBills.length > 0) {

            var salesBills = _salesBills.filter(function (value, index, array) {
                return value.SalesBillId === salesBillId;
            });

            var itemsCount = salesBills.length;

            if (itemsCount > 0) {

                DOM.billNo.value = salesBills[0].SalesBillNo;
                DOM.billNo.setAttribute('data-sales-bill-id', parseInt(salesBills[0].SalesBillId));
                DOM.billDate.value = salesBills[0].SalesBillDate;
                _shared.setSelectValue(DOM.customer, null, parseInt(salesBills[0].CustomerId));
                _shared.setSelect2ControlsText(DOM.customer);
                _shared.setSelectValue(DOM.consignee, null, parseInt(salesBills[0].ConsigneeId));
                _shared.setSelect2ControlsText(DOM.consignee);
                _shared.setSelectValue(DOM.branch, null, parseInt(salesBills[0].BranchId));
                _shared.setSelect2ControlsText(DOM.branch);
                _shared.setSelectValue(DOM.financialYear, null, parseInt(salesBills[0].WorkingPeriodId));
                _shared.setSelect2ControlsText(DOM.financialYear);
                _shared.setSelectValue(DOM.salesman, null, parseInt(salesBills[0].SalesmanId));
                _shared.setSelect2ControlsText(DOM.salesman);
                _shared.setRadioButtonValue(DOM.isTaxInclusive, null, parseInt(salesBills[0].IsTaxInclusive));
                _shared.setSelect2ControlsText(DOM.isTaxInclusive);
                //_shared.setSelectValue(DOM.modeOfPayment, null, parseInt(cas))

                bindSalesBillItems(salesBillId);

                _shared.showPanel(DOM.editMode);
                _shared.hidePanel(DOM.viewMode);
            }
        }
    }

    function getSalesBills() {

        DOM.salesBillsDetails.tBodies[0].innerHTML = "";

        var saleTypeId = parseInt(1);
        var workingPeriodId = parseInt(1);
        var branchId = parseInt(1);

        if (DOM.financialYear.selectedIndex > 0) {
            workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);            
        }

        if (DOM.branch.selectedIndex > 0) {
            branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
        }

        if (workingPeriodId === 0 && branchId === 0) {

            createNewSalesBill();

            return;
        }
        
        _salesBills = [];
        _salesBillDeliveryDetails = [];
        _salesBillPaymentDetails = [];
        _salesBillChargesDetails = [];

        _salesBillItems = [];
        _salesBillItemsChargesDetails = [];

        _shared.sendRequest(SERVICE_PATH + "GetSalesBillsBySaleType/" + branchId + '/' + workingPeriodId + '/' + saleTypeId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            var table = DOM.salesBillsDetails;

                            var tableBody = table.tBodies[0];

                            for (var r = 0; r < _response.length; r++) {

                                var billItems = _response[r].SalesBillItems;

                                billItems = billItems.filter(function (value, index, array) {
                                    return value.SalesBillId === parseInt(_response[r].SalesBillId);
                                });

                                var salesBill = {};

                                salesBill = {
                                    SalesBillId: _response[r].SalesBillId,
                                    SalesBillNo: _response[r].SalesBillNo,
                                    SalesBillDate: _response[r].SalesBillDate,
                                    CustomerId: _response[r].CustomerId,
                                    CustomerName: _response[r].CustomerName,
                                    ConsigneeId: _response[r].ConsigneeId,
                                    ConsigneeName: _response[r].ConsigneeName,
                                    SalesmanId: _response[r].SalesmanId,
                                    SalesmanName: _response[r].SalesmanName,
                                    SaleTypeId: _response[r].SaleTypeId,
                                    TotalSaleQty: _response[r].TotalSaleQty,
                                    TotalSaleAmount: _response[r].TotalSaleAmount,
                                    IsTaxInclusive: _response[r].IsTaxInclusive,
                                    BranchId: _response[r].BranchId,
                                    BranchName: _response[r].BranchName,
                                    GSTApplicable: _response[r].GSTApplicable,
                                    WorkingPeriodId: _response[r].WorkingPeriodId,
                                    FinancialYear: _response[r].FinancialYear,
                                    TotalCashSaleQty: _response[r].TotalCashSaleQty,
                                    TotalCashSaleAmount: _response[r].TotalCashSaleAmount,
                                    IsDeleted: false
                                };

                                _salesBills.push(salesBill);

                                if (billItems.length > 0) {

                                    for (var s = 0; s < billItems.length; s++) {

                                        var salesBillItem = {};

                                        salesBillItem = {
                                            SalesBillItemId: billItems[s].SalesBillItemId,
                                            SalesBillId: billItems[s].SalesBillId,
                                            ItemId: billItems[s].ItemId,
                                            ItemName: billItems[s].ItemName,
                                            ItemQtyInPcs: billItems[s].ItemQtyInPcs,
                                            ItemQtyInMtrs: billItems[s].ItemQtyInMtrs,
                                            SaleRate: billItems[s].SaleRate,
                                            Amount: billItems[s].Amount,
                                            TypeOfDiscount: billItems[s].TypeOfDiscount,
                                            CashDiscountPercent: billItems[s].CashDiscountPercent,
                                            DiscountAmount: billItems[s].DiscountAmount,
                                            TotalAmountAfterDiscount: billItems[s].TotalAmountAfterDiscount,
                                            AmountBeforeTax: billItems[s].AmountBeforeTax,
                                            TaxId: billItems[s].TaxId,
                                            GSTRateId: billItems[s].GSTRateId,                                            
                                            GSTRate: billItems[s].GSTRate,
                                            GSTName: billItems[s].GSTName,
                                            GSTAmount: billItems[s].GSTAmount,
                                            TotalItemAmount: billItems[s].TotalItemAmount,
                                            SrNo: billItems[s].SrNo,
                                            IsDeleted: false
                                        };

                                        _salesBillItems.push(salesBillItem);
                                    }
                                }

                                var currentRow = document.createElement('TR');

                                var data;

                                data = "<tr><td>" + _response[r].SalesBillNo + "</td>";
                                data = data + "<td>" + _response[r].SalesBillDate + "</td>";
                                data = data + "<td>" + _response[r].CustomerName + "</td>";
                                data = data + "<td>" + _response[r].TotalSaleQty + "</td>";
                                data = data + "<td>" + _response[r].TotalSaleAmount + "</td>";
                                data = data + "<td>" + _response[r].FinancialYear + "</td>";
                                data = data + "<td class='text-center'> " +
                                    "<a href='#' class='btn btn-info btn-xs'  data-name='view' > <i class='fa fa-eye'  data-name='view' ></i> View </a > " +
                                    "<a href='#' class='btn btn-info btn-xs'  data-name='edit' > <i class='fa fa-edit'  data-name='edit' ></i> Edit </a > " +
                                    "<a href='#' class='btn btn-danger btn-xs' data-name='remove' > <i class='fa fa-remove'  data-name='remove' > </i> Delete </a> </td > ";

                                currentRow.setAttribute('data-sales-bill-id', _response[r].SalesBillId);
                                currentRow.innerHTML = data;

                                tableBody.appendChild(currentRow);
                            }

                            _shared.showPanel(DOM.viewMode);
                            _shared.hidePanel(DOM.editMode);
                        }
                        else {
                            _shared.showPanel(DOM.editMode);
                            _shared.hidePanel(DOM.viewMode);
                        }
                    }
                }
            }
        });
    }

    function saveSalesBill() {

        // Clearing the Sales Bill and other arrays
        _salesBills = [];
        _salesBillDeliveryDetails = [];
        _salesBillPaymentDetails = [];
        //_salesBillChargesDetails = [];
        
        var branchId = parseInt(0);
        var workingPeriodId = parseInt(0);        
        var salesBillId = parseInt(0);
        var salesBillNo = parseInt(0);
        var salesBillDate = null;
        var salesmanId = parseInt(0);
        var isTaxInclusive = true;
        var customerId = parseInt(0);
        var consigneeId = parseInt(0);
        var billRemarks = null;
        var salesBillDeliveryId = parseInt(0);
        var transporterId = parseInt(0);
        var lrNo = null;
        var lrDate = null;
        var deliveryDate = null;
        var isDeliveryPending = false;
        var deliveryRemarks = null;
        var salesBillPaymentId = parseInt(0);
        var paymentSettlementId = parseInt(0);
        var paymentSettlement = null;
        var modeOfPayment = "Cash";
        var paymentReferenceNo = null;
        var paymentRemarks = null;

        branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
        workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);
        salesBillId = DOM.billNo.getAttribute('data-sales-bill-id');
        salesBillNo = parseInt(DOM.billNo.value);
        salesBillDate = DOM.billDate.value;
        salesmanId = parseInt(DOM.salesman.options[DOM.salesman.selectedIndex].value);
        if (DOM.isTaxInclusive[0].checked === true) {
            isTaxInclusive = true;
        }
        else {
            isTaxInclusive = false;
        }
        //isTaxInclusive = _shared.isRadioButtonValueSelected(DOM.isTaxInclusive);
        customerId = parseInt(DOM.customer.options[DOM.customer.selectedIndex].value);
        consigneeId = parseInt(DOM.consignee.options[DOM.consignee.selectedIndex].value);
        if (DOM.billRemarks.value !== "") {
            billRemarks = DOM.billRemarks.value;
        }
        transporterId = parseInt(DOM.transporter.options[DOM.transporter.selectedIndex].value);
        salesBillDeliveryId = parseInt(0);
        lrNo = DOM.lrNo.value;
        lrDate = DOM.lrDate.value;
        deliveryDate = DOM.deliveryDate.value;
        if (DOM.isDeliveryPending[0].checked === true) {
            isDeliveryPending = true;
        }
        else {
            isDeliveryPending = false;
        }
        if (DOM.deliveryRemarks.value !== "") {
            deliveryRemarks = DOM.deliveryRemarks.value;
        }
        paymentSettlementId = parseInt(DOM.paymentsettlement.options[DOM.paymentsettlement.selectedIndex].value);
        paymentSettlement = DOM.paymentsettlement.options[DOM.paymentsettlement.selectedIndex].text;
        modeOfPaymentId = parseInt(DOM.modeOfPayment.options[DOM.modeOfPayment.selectedIndex].value);
        modeOfPayment = DOM.modeOfPayment.options[DOM.modeOfPayment.selectedIndex].text;
        paymentReferenceNo = DOM.paymentReferenceNo.value;
        if (DOM.paymentRemarks.value !== "") {
            paymentRemarks = DOM.paymentRemarks.value;
        }

        if (salesBillId === null) { salesBillId = parseInt(0); }

        if (isNaN(salesBillId)) { salesBillId = parseInt(0); }

        if (isNaN(salesBillNo)) { salesBillNo = parseInt(0); }

        // Store sales bill delivery details
        var salesBillDeliveryDetails = {};

        if (lrNo !== "") {

            salesBillDeliveryDetails = {
                SalesBillDeliveryId: salesBillDeliveryId,
                SalesBillId: salesBillId,
                TransporterId: transporterId,
                LRNo: lrNo,
                LRDate: lrDate,
                DeliveryDate: deliveryDate,
                IsDeliveryPending: isDeliveryPending,
                Remarks: deliveryRemarks,
                IsDeleted: false,
                CreatedBy: parseInt(LOGGED_USER),
                CreatedByIP: IP_ADDRESS
            };

            _salesBillDeliveryDetails.push(salesBillDeliveryDetails);
        }


        // Store sales bill payment details

        var salesBillPaymentDetails = {};
               
        salesBillPaymentDetails = {
            SalesBillPaymentId: salesBillPaymentId,
            SalesBillId: salesBillId,
            PaymentSettlementId: paymentSettlementId,
            ModeOfPaymentId: modeOfPaymentId,
            PaymentReferenceNo: paymentReferenceNo,
            Remarks: paymentRemarks,
            IsDeleted: false,
            CreatedBy: parseInt(LOGGED_USER),
            CreatedByIP: IP_ADDRESS
        };

        _salesBillPaymentDetails.push(salesBillPaymentDetails);
        
        var salesBill = {};

        salesBill = {
            SalesBillId: salesBillId,
            SalesOrderId: parseInt(0),
            SalesBillNo: salesBillNo,
            SalesBillDate: salesBillDate,
            CustomerId: customerId,
            ConsigneeId: consigneeId,
            TransporterId: transporterId,
            LRNo: lrNo,
            LRDate: lrDate,
            DeliveryDate: deliveryDate,
            ModeOfPayment: modeOfPayment,
            PaymentReferenceNo: paymentReferenceNo,
            SalesmanId: salesmanId,
            SaleTypeId: 1,
            GSTApplicable: _gstApplicable,
            IsTaxInclusive: isTaxInclusive,
            BranchId: branchId,
            WorkingPeriodId: workingPeriodId,
            Remarks: billRemarks,
            SalesBillDeliveryDetails: _salesBillDeliveryDetails,
            SalesBillPaymentDetails: _salesBillPaymentDetails,
            SalesBillChargesDetails: _salesBillChargesDetails,
            SalesBillItems: _salesBillItems,
            IsDeleted: false
        };

        if (parseInt(salesBillId) === parseInt(0)) {

            salesBill.CreatedBy = LOGGED_USER;
            salesBill.CreatedByIp = IP_ADDRESS;
        }
        else {
            salesBill.ModifiedBy = LOGGED_USER;
            salesBill.ModifiedByIp = IP_ADDRESS;
        }

        _salesBills.push(salesBill);

        var postData = JSON.stringify(_salesBills);

        _shared.sendRequest(SERVICE_PATH + "SaveSalesBill", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    getSalesBills();
                }
            }
            else {
                swal("error", "Unable to save the Cash Sales Details due to some error.", "error");
                handleError(_response.Message + " " + _response.ExceptionMessage);
                _salesBills = [];
            }
        });
    }

    function printSalesBill() {

        var salesBillId = parseInt(DOM.billNo.getAttribute('data-sales-bill-id'));

        _shared.sendRequest(SERVICE_PATH + "PrintCashSaleInvoice/" + salesBillId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            window.open(location.origin + "/POS/ApplicationFiles/Sales/Bills/BillNo_" + salesBillId + ".pdf", "_blank");

                        }
                    }
                }
            }
        });
    }

    function addNewSalesBillItem() {
        
        _shared.clearInputs(DOM.salesBillItemsEditMode);

        DOM.qtyInPcs.value = parseFloat(0);
        DOM.qtyInMtrs.value = parseFloat(0);
        DOM.saleRate.value = parseFloat(0);
        DOM.amount.value = parseFloat(0);
        DOM.cashDiscountPercent.value = parseFloat(0);
        DOM.rateDifference.value = parseFloat(0);
        DOM.amountBeforeTax.value = parseFloat(0);
        DOM.gstRate.value = parseFloat(0);
        DOM.gstAmount.value = parseFloat(0);
        DOM.totalItemAmount.value = parseFloat(0);
        DOM.srNo.value = parseInt(0);
        DOM.salesBillItemId.value = parseInt(0);

        DOM.cashDiscountPercent.disabled = true;
        DOM.cashDiscountAmt.disabled = true;
        DOM.rateDifference.disabled = true;

        //DOM.hiddenSalesOrderItemId.setAttribute('data-sales-order-item-id', parseInt(0));

        //show panel
        _shared.showPanel(DOM.salesBillItemsEditMode);
        _shared.hidePanel(DOM.salesBillItemsViewMode);

        // Focus on control
        DOM.barcode.focus();

        //set focus
        ///setFocus();
    }

    function backToSalesBillItemsList() {

        //show hide panel
        _shared.showPanel(DOM.salesBillItemsViewMode);
        _shared.hidePanel(DOM.salesBillItemsEditMode);

        //DOM.$cashSalesItemModal.modal('hide');
    }

    function bindSalesBillItems(salesBillId) {

        var table = DOM.salesBillItems;

        var tableBody = table.tBodies[0];

        var tableFooter = table.tFoot;

        tableBody.innerHTML = "";

        tableFooter.innerHTML = "";

        if (isNaN(salesBillId)) { salesBillId = parseInt(0); }

        if (_salesBillItems.length > 0) {

            var billItems = _salesBillItems.filter(function (value, index, array) {

                return value.SalesBillId === salesBillId;

            });

            var itemsCount = billItems.length;

            if (itemsCount > 0) {

                var totalQtyInPcs = parseInt(0);

                var totalQtyInMtrs = parseFloat(0);

                var totalAmount = parseFloat(0);

                var totalAmountAfterDiscount = parseFloat(0);

                var totalAmountBeforeTax = parseFloat(0);

                var totalGSTAmount = parseFloat(0);

                var totalItemAmount = parseFloat(0);

                for (var r = 0; r < itemsCount; r++) {

                    var currentRow = document.createElement('TR');

                    data = "<tr><td>" + billItems[r].ItemName + "</td>";
                    data += "<td class='text-center'>" + billItems[r].ItemQtyInPcs + "</td>";
                    data += "<td class='text-center'>" + billItems[r].ItemQtyInMtrs + "</td>";
                    data += "<td class='text-center'>" + billItems[r].SaleRate + "</td>";
                    //data += "<td>" + cashSaleItems[r].Amount + "</td>";
                    data += "<td class='text-right'>" + billItems[r].DiscountAmount + "</td>";
                    data += "<td class='text-right'>" + billItems[r].TotalAmountAfterDiscount + "</td>";
                    data += "<td class='text-right'>" + billItems[r].AmountBeforeTax + "</td>";
                    data += "<td class='text-center'>" + billItems[r].GSTRate + "</td>";
                    data += "<td class='text-right'>" + billItems[r].GSTAmount + "</td>";
                    data += "<td class='text-right'>" + billItems[r].TotalItemAmount + "</td>";
                    data += "<td class='text-center'>" +
                        "<a href='#' class='btn btn-info btn-xs' data-name='view' > <i class='fa fa-lg fa-eye' data-name='view'></i> view</a> " +
                        "<a href='#' class='btn btn-info btn-xs' data-name='edit'> <i class='fa fa-lg fa-edit' data-name='edit'></i> edit</a> " +
                        "<a href='#' class='btn btn-danger btn-xs' data-name='remove' > <i class='fa fa-lg fa-remove' data-name='remove'></i> delete</a> </td></tr>";

                    currentRow.setAttribute('data-sales-bill-item-id', parseInt(billItems[r].SalesBillItemId));
                    currentRow.setAttribute('data-sr-no', parseInt(billItems[r].SrNo));
                    currentRow.innerHTML = data;

                    tableBody.appendChild(currentRow);

                    totalQtyInPcs += parseInt(billItems[r].ItemQtyInPcs);
                    totalQtyInMtrs += parseFloat(billItems[r].ItemQtyInMtrs);
                    totalAmount += parseFloat(billItems[r].Amount);
                    totalAmountAfterDiscount += parseFloat(billItems[r].TotalAmountAfterDiscount);
                    totalAmountBeforeTax += parseFloat(billItems[r].AmountBeforeTax);
                    totalGSTAmount += parseFloat(billItems[r].GSTAmount);
                    totalItemAmount += parseFloat(billItems[r].TotalItemAmount);
                }

                var footerRow = document.createElement('tr');
                footerRow.classList.add('bg-amber-100');

                var footerData = '';

                footerData = "<td class='text-center text-bold text-size-medium'> Total </td>";
                footerData += "<td class='text-center text-bold text-size-medium'>" + totalQtyInPcs + "</td>";
                footerData += "<td class='text-center text-bold text-size-medium'>" + totalQtyInMtrs + "</td>";
                footerData += "<td></td>";
                footerData += "<td></td>";
                footerData += "<td class='text-right text-bold text-size-medium'>" + totalAmount + "</td>";
                //footerData += "<td></td>";
                //footerData += "<td class='text-right text-bold text-size-medium'>" + totalAmountAfterDiscount + "</td>";
                footerData += "<td class='text-right text-bold text-size-medium'>" + totalAmountBeforeTax + "</td>";
                footerData += "<td></td>";
                footerData += "<td class='text-right text-bold text-size-medium'>" + totalGSTAmount + "</td>";
                footerData += "<td class='text-right text-bold text-size-medium'>" + totalItemAmount + "</td>";
                footerData += "<td class='text-right text-bold text-size-medium'></td>";

                footerRow.innerHTML = footerData;

                tableFooter.appendChild(footerRow);
            }

            _shared.showPanel(DOM.salesBillItemsViewMode);
            _shared.hidePanel(DOM.salesBillItemsEditMode);
        }
    }

    function salesBillItems(evt) {

        var element = evt.target;

        var currentTableRow;

        if (element.nodeName === 'I') {
            currentTableRow = element.parentElement.parentElement.parentElement;
        }
        else if (element.nodeName === 'A') {
            currentTableRow = element.parentElement.parentElement;
        }

        if (element.getAttribute('data-name').trim().toUpperCase() === "VIEW") {
            viewSalesBillItem(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "EDIT") {
            editSalesBillItem(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "REMOVE") {
            deleteSalesBillItem(currentTableRow);
        }
    }

    function viewSalesBillItem(currentTableRow) {

        _shared.clearInputs(DOM.salesBillItemsEditMode);

        _shared.clearTextAreas(DOM.salesBillItemsEditMode);

        _shared.disableControls(DOM.salesBillItemsEditMode, true);

        showSelectedSalesBillItemDetails(currentTableRow);
    }

    function editSalesBillItem(currentTableRow) {

        _shared.clearInputs(DOM.salesBillItemsEditMode);

        _shared.clearTextAreas(DOM.salesBillItemsEditMode);

        _shared.disableControls(DOM.salesBillItemsEditMode, false);

        DOM.amount.disabled = true;
        DOM.gstAmount.disabled = true;
        DOM.gstRate.disabled = true;
        DOM.totalItemAmount.disabled = true;

        showSelectedSalesBillItemDetails(currentTableRow);
    }

    function deleteSalesBillItem(currentTableRow) {

        var table = DOM.salesBillItems;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var salesBillItemId = parseInt(currentTableRow.getAttribute('data-sales-bill-item-id'));

        var salesBillItem = {};

        salesBillItem = {
            SalesBillItem: salesBillItemId,
            IsDeleted: true,
            DeletedBy: LOGGED_USER,
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(salesBillItem);

        _shared.sendRequest(SERVICE_PATH + 'SaveSalesBill', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function addSalesBillItem(billItem) {

        var srNo = getMaxSrNo(_salesBillItems, 0);

        //var cashSaleItem = {};

        //cashSaleItem.SrNo = srNo;
        var salesBillItem = {};

        salesBillItem = {
            SalesBillItemId: billItem.SalesBillItemId,
            SalesBillId: billItem.SalesBillId,
            GoodsReceiptItemId: billItem.GoodsReceiptItemId,
            ItemId: billItem.ItemId,
            ItemName: billItem.ItemName,
            ItemQtyInPcs: billItem.QtyInPcs,
            ItemQtyInMtrs: billItem.QtyInMtrs,
            SaleRate: billItem.SaleRate,
            Amount: billItem.Amount,
            TypeOfDiscount: billItem.TypeOfDiscount,
            CashDiscountPercent: billItem.CashDiscountPercent,
            DiscountAmount: billItem.DiscountAmount,
            RateAdjustment: billItem.RateAdjustment,
            RateAdjustmentRemarks: billItem.RateAdjustmentRemarks,
            TotalAmountAfterDiscount: billItem.TotalAmountAfterDiscount,
            AmountBeforeTax: billItem.AmountBeforeTax,
            TaxId: billItem.TaxId,
            GSTRate: billItem.GSTRate,
            GSTAmount: billItem.GSTAmount,
            TotalItemAmount: billItem.TotalItemAmount,
            SrNo: srNo,
            GSTRateId: billItem.GSTRateId,
            CreatedBy: LOGGED_USER,
            CreatedByIp: IP_ADDRESS,
            IsDeleted: false,
            SalesBillItemsCharges: _salesBillItemsChargesDetails
        };

        _salesBillItems.push(salesBillItem);
    }

    function updateSalesBillItem(billItem) {

        if (_salesBillItems.length > 0) {

            for (var r = 0; r < _salesBillItems.length; r++) {

                if (_salesBillItems[r].SalesBillItemId === billItem.SalesBillItemId
                    && _salesBillItems[r].SrNo === billItem.SrNo) {

                    _salesBillItems[r].SalesBillItemId = billItem.SalesBillItemId;
                    _salesBillItems[r].SalesBillId = billItem.SalesBillId;
                    _salesBillItems[r].GoodsReceiptItemId = billItem.GoodsReceiptItemId;
                    _salesBillItems[r].ItemId = billItem.ItemId;
                    _salesBillItems[r].ItemName = billItem.ItemName;
                    _salesBillItems[r].QtyInPcs = billItem.QtyInPcs;
                    _salesBillItems[r].QtyInMtrs = billItem.QtyInMtrs;
                    _salesBillItems[r].SaleRate = billItem.SaleRate;
                    _salesBillItems[r].TypeOfDiscount = billItem.TypeOfDiscount;
                    _salesBillItems[r].CashDiscountPercent = billItem.CashDiscountPercent;
                    _salesBillItems[r].DiscountAmount = billItem.DiscountAmount;
                    _salesBillItems[r].TotalAmountAfterDiscount = billItem.TotalAmountAfterDiscount;
                    _salesBillItems[r].RateAdjustment = billItem.RateAdjustment;
                    _salesBillItems[r].RateAdjustmentRemarks = billItem.RateAdjustmentRemarks;
                    _salesBillItems[r].AmountBeforeTax = billItem.AmountBeforeTax;
                    _salesBillItems[r].TaxId = billItem.TaxId;
                    _salesBillItems[r].GSTRate = billItem.GSTRate;
                    _salesBillItems[r].GSTAmount = billItem.GSTAmount;
                    _salesBillItems[r].TotalItemAmount = billItem.TotalItemAmount;
                    _salesBillItems[r].SrNo = billItem.SrNo;
                    _salesBillItems[r].GSTRateId = billItem.GSTRateId;
                    _salesBillItems[r].RateCategoryId = parseInt(1);
                    _salesBillItems[r].IsDeleted = false;

                    if (_salesBillItems[r].SalesBillItemId > 0) {
                        _salesBillItems[r].CreatedBy = LOGGED_USER;
                        _salesBillItems[r].CreatedByIP = IP_ADDRESS;
                    }
                    else {
                        _salesBillItems[r].ModifiedBy = LOGGED_USER;
                        _salesBillItems[r].ModifiedByIP = IP_ADDRESS;
                    }
                    break;
                }
            }
        }
    }

    function saveSalesBillItem() {

        if (validateSalesBillItem() === true) {

            var salesBillItemId = parseInt(0);
            var salesBillId = parseInt(0);
            var goodsReceiptItemId = parseInt(0);
            var itemId = parseInt(0);
            var itemName = null;
            var qtyInPcs = parseFloat(0);
            var qtyInMtrs = parseFloat(0);
            var saleRate = parseFloat(0);
            var amount = parseFloat(0);
            var typeOfDiscount = null;
            var cashDiscountPercent = parseFloat(0);
            var cashDiscountAmt = parseFloat(0);
            var rateDifference = parseFloat(0);
            var discountAmount = parseFloat(0);
            var totalAmountAfterDiscount = parseFloat(0);
            var rateAdjustment = null;
            var rateAdjustmentRemarks = null;
            var amountBeforeTax = parseFloat(0);
            var gstRate = parseFloat(0);
            var gstAmount = parseFloat(0);
            var totalItemAmount = parseFloat(0);
            var taxId = parseInt(0)
            var gstRateId = parseInt(0);
            var srNo = parseInt(0);

            salesBillItemId = parseInt(DOM.salesBillItemId.value);
            salesBillId = parseInt(DOM.billNo.getAttribute('data-sales-bill-id'));
            if (DOM.barcodeItem.value === "") {
                goodsReceiptItemId = parseInt(DOM.itemName.options[DOM.itemName.selectedIndex].getAttribute('data-goods-receipt-item-id'));
                itemId = parseInt(DOM.itemName.options[DOM.itemName.selectedIndex].value);
                itemName = DOM.itemName.options[DOM.itemName.selectedIndex].text;            
            }
            else {
                goodsReceiptItemId = parseInt(DOM.barcodeItem.getAttribute('data-goods-receipt-item-id'));
                itemId = parseInt(DOM.barcodeItem.getAttribute('data-item-id'));
                itemName = DOM.barcodeItem.value;
            }            
            qtyInPcs = parseFloat(parseFloat(DOM.qtyInPcs.value).toFixed(2));
            qtyInMtrs = parseFloat(parseFloat(DOM.qtyInMtrs.value).toFixed(2));
            saleRate = parseFloat(parseFloat(DOM.saleRate.value).toFixed(2));
            amount = parseFloat(parseFloat(DOM.amount.value).toFixed(2));
            cashDiscountPercent = parseFloat(parseFloat(DOM.cashDiscountPercent.value).toFixed(2));
            cashDiscountAmt = parseFloat(parseFloat(DOM.cashDiscountAmt.value).toFixed(2));
            rateDifference = parseFloat(parseFloat(DOM.rateDifference.value).toFixed(2));
            if (DOM.typeOfDiscount.selectedIndex > 0) {
                typeOfDiscount = DOM.typeOfDiscount.options[DOM.typeOfDiscount.selectedIndex].text.toUpperCase();
            }
            if (typeOfDiscount === null) {
                discountAmount = parseFloat(0);
            }
            else if (typeOfDiscount === "CASH DISCOUNT") {
                discountAmount = cashDiscountAmt;                
            }
            else {
                discountAmount = rateDifference;                
            }
            totalAmountAfterDiscount = amount - discountAmount;
            if (DOM.rateAdjustment.selectedIndex > 0) {
                rateAdjustment = DOM.rateAdjustment.options[DOM.rateAdjustment.selectedIndex].text;
            }
            rateAdjustmentRemarks = DOM.rateAdjustmentRemarks.value;
            amountBeforeTax = parseFloat(DOM.amountBeforeTax.value);
            gstRate = parseFloat(parseFloat(DOM.gstRate.value).toFixed(2));
            gstAmount = parseFloat(parseFloat(DOM.gstAmount.value).toFixed(2));
            totalItemAmount = parseFloat(parseFloat(DOM.totalItemAmount.value).toFixed(2));
            taxId = parseInt(DOM.gstRate.getAttribute('data-tax-id'));
            gstRateId = parseInt(DOM.gstRate.getAttribute('data-gst-rate-id'));
            srNo = parseInt(DOM.srNo.value);

            if (isNaN(salesBillItemId)) { salesBillItemId = parseInt(0); }
            if (isNaN(salesBillId)) { salesBillId = parseInt(0); }
            if (isNaN(itemId)) { itemId = parseInt(0); }
            if (isNaN(srNo)) { srNo = parseInt(0); }

            var billItem = {};

            billItem = {
                SalesBillItemId: salesBillItemId,
                SalesBillId: salesBillId,
                GoodsReceiptItemId: goodsReceiptItemId,
                ItemId: itemId,
                ItemName: itemName,
                QtyInPcs: qtyInPcs,
                QtyInMtrs: qtyInMtrs,
                SaleRate: saleRate,
                Amount: amount,
                TypeOfDiscount: typeOfDiscount,
                CashDiscountPercent: cashDiscountPercent,
                DiscountAmount: discountAmount,
                TotalAmountAfterDiscount: totalAmountAfterDiscount,
                RateAdjustment: rateAdjustment,
                RateAdjustmentRemarks: rateAdjustmentRemarks,
                AmountBeforeTax: amountBeforeTax,
                GSTRateId: gstRateId,                
                TaxId: taxId,
                GSTRate: gstRate,
                GSTAmount: gstAmount,
                TotalItemAmount: totalItemAmount,
                SrNo: srNo,
                IsDeleted: false
            };


            if (salesBillItemId === parseInt(0)
                && srNo === parseInt(0)) {

                addSalesBillItem(billItem);
            }
            else {

                updateSalesBillItem(billItem);
            }

            DOM.barcode.focus();

            bindSalesBillItems(salesBillId);
        }
    }

    function saveAndAddNewItem() {

        saveSalesBillItem();

        addNewSalesBillItem();

        DOM.barcode.focus();
    }

    function validateSalesBillItem() {

        var isValid = true;

        if (DOM.itemName.selectedIndex === 0) {
            DOM.itemName.focus();
            swal("Error!!!", "Please select the Item Name.", "error");
            isValid = false;
        }
        else if (DOM.qtyInPcs.value === "") {
            DOM.qtyInPcs.focus();
            swal("Error!!!", "Please enter the Sale Qty in Pcs.", "error");
            isValid = false;
        }
        else if (DOM.qtyInPcs.value === "0") {
            DOM.qtyInPcs.focus();
            swal("Error!!!", "Sale Qty should be greater than zero.", "error");
            isValid = false;
        }

        return isValid;
    }

    function showSelectedSalesBillItemDetails(currentTableRow) {

        if (_salesBillItems.length > 0) {

            var salesBillItemId = parseInt(currentTableRow.getAttribute('data-sales-bill-item-id'));

            var srNo = parseInt(currentTableRow.getAttribute('data-sr-no'));

            DOM.srNo.value = srNo;

            DOM.salesBillItemId.value = salesBillItemId;

            var billItems = _salesBillItems.filter(function (value, index, array) {

                return value.SalesBillItemId === salesBillItemId
                    && value.SrNo === parseInt(srNo);
            });

            if (billItems.length > 0) {

                DOM.barcodeItem.value = billItems[0].ItemName;
                DOM.barcodeItem.setAttribute('data-item-id', billItems[0].ItemId);
                //_shared.setSelectValue(DOM.itemName, null, parseInt(billItems[0].ItemId));
                //_shared.setSelect2ControlsText(DOM.itemName);
                DOM.qtyInPcs.value = billItems[0].ItemQtyInPcs;
                DOM.qtyInMtrs.value = billItems[0].ItemQtyInMtrs;
                DOM.saleRate.value = billItems[0].SaleRate;
                DOM.amount.value = billItems[0].Amount;
                _shared.setSelectValue(DOM.typeOfDiscount, null, parseInt(billItems[0].TypeOfDiscount));
                _shared.setSelect2ControlsText(DOM.typeOfDiscount);
                DOM.cashDiscountPercent.value = billItems[0].CashDiscountPercent;
                DOM.cashDiscountAmt.value = billItems[0].CashDiscountAmt;
                DOM.rateDifference.value = billItems[0].RateDifference;
                DOM.amountBeforeTax.value = billItems[0].AmountBeforeTax;
                DOM.gstRate.value = billItems[0].GSTRate;
                DOM.gstAmount.value = billItems[0].GSTAmount;
                DOM.totalItemAmount.value = billItems[0].TotalItemAmount;
                
                _shared.showPanel(DOM.salesBillItemsEditMode);
                _shared.hidePanel(DOM.salesBillItemsViewMode);
            }
        }
    }

    function addNewBillCharge() {

        _shared.clearInputs(DOM.billChargesEditMode);
        _shared.clearTextAreas(DOM.billChargesEditMode);
        _shared.clearSelect(DOM.billChargesEditMode);
        _shared.clearTables(DOM.billChargesEditMode);

        DOM.billChargeAmount.value = "0";
        DOM.billChargeGSTRate.value = "0";
        DOM.billChargeGSTAmount.value = "0";
        DOM.billChargeTotalAmount.value = "0";

        _shared.showPanel(DOM.billChargesEditMode);
        _shared.hidePanel(DOM.billChargesViewMode);

        DOM.billChargeName.focus();
    }

    function billCharges(evt) {

        var element = evt.target;

        var currentTableRow;

        if (element.nodeName === 'I') {
            currentTableRow = element.parentElement.parentElement.parentElement;
        }
        else if (element.nodeName === 'A') {
            currentTableRow = element.parentElement.parentElement;
        }

        if (element.getAttribute('data-name').trim().toUpperCase() === "VIEW") {
            viewBillCharges(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "EDIT") {
            editBillCharge(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "REMOVE") {
            deleteBillCharge(currentTableRow);
        }
    }

    function viewBillCharges(currentTableRow) {

        _shared.clearInputs(DOM.billChargesEditMode);

        _shared.clearTextAreas(DOM.billChargesEditMode);

        _shared.disableControls(DOM.billChargesEditMode, true);

        showSelectedBillChargeDetails(currentTableRow);
    }

    function editBillCharges(currentTableRow) {

        _shared.clearInputs(DOM.billChargesEditMode);

        _shared.clearTextAreas(DOM.billChargesEditMode);

        _shared.disableControls(DOM.billChargesEditMode, false);

        DOM.chargeAmount.disabled = true;
        DOM.billChargeGSTAmount.disabled = true;
        DOM.billChargeGSTRate.disabled = true;
        DOM.billChargeTotalAmount.disabled = true;

        showSelectedBillChargeDetails(currentTableRow);
    }

    function deleteBillCharges(currentTableRow) {

        var table = DOM.billcharges;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var salesBillChargeId = parseInt(currentTableRow.getAttribute('data-sales-bill-charge-id'));

        var salesBillCharge = {};

        salesBillCharge = {
            SalesBillChargeId: salesBillChargeId,
            IsDeleted: true,
            DeletedBy: LOGGED_USER,
            DeletedByIP: IP_ADDRESS
        };

        var postData = JSON.stringify(salesBillCharge);

        _shared.sendRequest(SERVICE_PATH + 'SaveSalesBill', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function showSelectedBillChargeDetails(currentTableRow) {

        if (_salesBillChargesDetails.length > 0) {

            var salesBillChargeId = parseInt(currentTableRow.getAttribute('data-sales-bill-charge-id'));

            var srNo = parseInt(currentTableRow.getAttribute('data-sr-no'));

            DOM.salesBillChargesSrNo.value = srNo;

            DOM.salesBillChargeId.value = salesBillChargeId;

            var billCharges = _salesBillChargesDetails.filter(function (value, index, array) {

                return value.SalesBillChargeId === salesBillChargeId
                    && value.SrNo === parseInt(srNo);
            });

            if (billCharges.length > 0) {

                _shared.setSelectValue(DOM.billChargeName, null, parseInt(billCharges[0].ChargeId));
                _shared.setSelect2ControlsText(DOM.billChargeName);
                DOM.billChargeAmount.value = billCharges[0].ChargeAmount;
                if (billCharges[0].IsTaxInclusive === true) {
                    DOM.IsTaxInclusive[0].checked = true;
                }
                else {
                    DOM.IsTaxInclusive[1].checked = true;
                }
                DOM.billChargeGSTRate.value = billCharges[0].GSTRate;
                DOM.billChargeGSTAmount.value = billCharges[0].GSTAmount;
                DOM.billChargeTotalAmount.value = billCharges[0].ChargeTotalAmount;
                
                _shared.showPanel(DOM.billChargesEditMode);
                _shared.hidePanel(DOM.billChargesViewMode);
            }
        }
    }


    function backToBillChargesList() {

        _shared.hidePanel(DOM.billChargesEditMode);
        _shared.showPanel(DOM.billChargesViewMode);

    }

    function addBillCharge(billCharge) {

        var srNo = getMaxSrNo(_salesBillChargesDetails, 0);

        //var cashSaleItem = {};

        //cashSaleItem.SrNo = srNo;
        var salesBillCharge = {};

        salesBillCharge = {
            SalesBillChargeId: billCharge.SalesBillChargeId,
            SalesBillId: billCharge.SalesBillId,
            ChargeId: billCharge.ChargeId,
            ChargeName: billCharge.ChargeName,
            ChargeAmount: billCharge.ChargeAmount,
            IsTaxInclusive: billCharge.IsTaxInclusive,
            GSTRateId: billCharge.GSTRateId,
            TaxId: billCharge.TaxId,
            GSTRate: billCharge.GSTRate,
            GSTAmount: billCharge.GSTAmount,
            BillChargeTotalAmount: billCharge.BillChargeTotalAmount,
            Remarks: billCharge.Remarks,
            SrNo: srNo,
            CreatedBy: parseInt(LOGGED_USER),
            CreatedByIP: IP_ADDRESS,
            IsDeleted: false
        };

        _salesBillChargesDetails.push(salesBillCharge);
    }

    function updateBillCharge(billCharge) {

        if (_salesBillChargesDetails.length > 0) {

            for (var r = 0; r < _salesBillChargesDetails.length; r++) {

                if (_salesBillChargesDetails[r].SalesBillChargeId === salesBillChargeId
                    && _salesBillChargesDetails[r].SrNo === srNo) {

                    _salesBillChargesDetails[r].SalesBillChargeId = billCharge.SalesBillChargeId;
                    _salesBillChargesDetails[r].SalesBillId = billCharge.SalesBillId;
                    _salesBillChargesDetails[r].ChargeId = billCharge.ChargeId;
                    _salesBillChargesDetails[r].ChargeName = billCharge.ChargeName;
                    _salesBillChargesDetails[r].ChargeAmount = billCharge.ChargeAmount;
                    _salesBillChargesDetails[r].TaxId = billCharge.TaxId;
                    _salesBillChargesDetails[r].GSTRate = billCharge.GSTRate;
                    _salesBillChargesDetails[r].GSTAmount = billCharge.GSTAmount;
                    _salesBillChargesDetails[r].BillChargeTotalAmount = billCharge.BillChargeTotalAmount;
                    _salesBillChargesDetails[r].SrNo = billCharge.SrNo;
                    _salesBillChargesDetails[r].GSTRateId = billCharge.GSTRateId;
                    _salesBillChargesDetails[r].Remarks = billCharge.Remarks;
                    _salesBillChargesDetails[r].IsDeleted = false;

                    if (_salesBillChargesDetails[r].SalesBillChargeId > 0) {
                        _salesBillChargesDetails[r].CreatedBy = parseInt(LOGGED_USER);
                        _salesBillChargesDetails[r].CreatedByIP = IP_ADDRESS;
                    }
                    else {
                        _salesBillChargesDetails[r].ModifiedBy = parseInt(LOGGED_USER);
                        _salesBillChargesDetails[r].ModifiedByIP = IP_ADDRESS;
                    }

                    break;
                }
            }
        }
    }

    var validateBillCharges = function () {

        var isValid = true;

        return isValid;
    }

    function saveBillCharges() {

        if (validateBillCharges() === true) {

            var salesBillChargeId = parseInt(0);
            var salesBillId = parseInt(0);
            var billChargeId = parseInt(0);
            var billChargeName = null;
            var isTaxInclusive = true;
            var billChargeGSTRate = parseFloat(0);
            var billChargeGSTAmount = parseFloat(0);
            var billChargeTotalAmount = parseFloat(0);
            var taxId = parseInt(0)
            var gstRateId = parseInt(0);
            var srNo = parseInt(0);

            salesBillChargeId = parseInt(DOM.salesBillChargeId.value);
            salesBillId = parseInt(DOM.billNo.getAttribute('data-sales-bill-id'));
            billChargeId = parseInt(DOM.billChargeName.options[DOM.billChargeName.selectedIndex].value);
            billChargeName = DOM.billChargeName.options[DOM.billChargeName.selectedIndex].text;
            if (DOM.isTaxInclusive[0].checked === true) {
                isTaxInclusive = true;
            }
            else {
                isTaxInclusive = false;
            }
            billChargeAmount = parseFloat(DOM.billChargeAmount.value);
            billChargeGSTRate = parseFloat(parseFloat(DOM.billChargeGSTRate.value).toFixed(2));
            billChargeGSTAmount = parseFloat(parseFloat(DOM.billChargeGSTAmount.value).toFixed(2));
            billChargeTotalAmount = parseFloat(parseFloat(DOM.billChargeTotalAmount.value).toFixed(2));
            taxId = parseInt(DOM.billChargeGSTRate.getAttribute('data-tax-id'));
            gstRateId = parseInt(DOM.billChargeGSTRate.getAttribute('data-gst-rate-id'));
            srNo = parseInt(DOM.salesBillChargeSrNo.value);

            if (isNaN(salesBillChargeId)) { salesBillChargeId = parseInt(0); }
            if (isNaN(salesBillId)) { salesBillId = parseInt(0); }
            if (isNaN(billChargeId)) { billChargeId = parseInt(0); }
            if (isNaN(taxId)) { taxId = parseInt(0); }
            if (isNaN(gstRateId)) { gstRateId = parseInt(0); }
            if (isNaN(srNo)) { srNo = parseInt(0); }

            var billCharge = {};

            billCharge = {
                SalesBillChargeId: salesBillChargeId,
                SalesBillId: salesBillId,
                ChargeId: billChargeId,
                ChargeName: billChargeName,
                ChargeAmount: billChargeAmount,
                IsTaxInclusive: isTaxInclusive,
                GSTRateId: gstRateId,                
                TaxId: taxId,
                GSTRate: billChargeGSTRate,
                GSTAmount: billChargeGSTAmount,
                BillChargeTotalAmount: billChargeTotalAmount,
                Remarks: null,
                SrNo: srNo,
                IsDeleted: false
            };


            if (salesBillChargeId === parseInt(0)
                && srNo === parseInt(0)) {

                addBillCharge(billCharge);
            }
            else {

                updateBillCharge(billCharge);
            }

            bindBillCharges(salesBillId);
        }
    }

    function bindBillCharges(salesBillId) {

        var table = DOM.billCharges;

        var tableBody = table.tBodies[0];
        var tableFooter = table.tFoot;

        tableBody.innerHTML = "";
        tableFooter.innerHTML = "";

        if (isNaN(salesBillId)) { salesBillId = parseInt(0); }

        if (_salesBillChargesDetails.length > 0) {

            var billCharges = _salesBillChargesDetails.filter(function (value, index, array) {
                return value.SalesBillId === salesBillId;
            });

            var itemsCount = billCharges.length;

            if (itemsCount > 0) {

                var totalChargeAmount = parseFloat(0);
                var totalAmountBeforeTax = parseFloat(0);
                var totalGSTAmount = parseFloat(0);
                //var totalChargeAmount = parseFloat(0);

                for (var r = 0; r < itemsCount; r++) {

                    var currentRow = document.createElement('TR');

                    data = "<tr><td>" + billCharges[r].ChargeName + "</td>";
                    data += "<td class='text-right'>" + billCharges[r].ChargeAmount + "</td>";
                    data += "<td class='text-center'>" + billCharges[r].GSTRate + "</td>";
                    data += "<td class='text-right'>" + billCharges[r].GSTAmount + "</td>";
                    data += "<td class='text-right'>" + billCharges[r].BillChargeTotalAmount + "</td>";
                    data += "<td class='text-center'>" +
                        "<a href='#' class='btn btn-info btn-xs' data-name='view' > <i class='fa fa-lg fa-eye' data-name='view'></i> view</a> " +
                        "<a href='#' class='btn btn-info btn-xs' data-name='edit'> <i class='fa fa-lg fa-edit' data-name='edit'></i> edit</a> " +
                        "<a href='#' class='btn btn-danger btn-xs' data-name='remove' > <i class='fa fa-lg fa-remove' data-name='remove'></i> delete</a> </td></tr>";

                    currentRow.setAttribute('data-sales-bill-item-id', parseInt(billCharges[r].SalesBillChargeId));
                    currentRow.setAttribute('data-sr-no', parseInt(billCharges[r].SrNo));
                    currentRow.innerHTML = data;

                    tableBody.appendChild(currentRow);

                    totalChargeAmount += parseFloat(billCharges[r].ChargeAmount);
                    totalAmountBeforeTax += parseFloat(billCharges[r].TotalAmountBeforeTax);
                    totalGSTAmount += parseFloat(billCharges[r].GSTAmount);
                    //totalBillChargeAmount += parseFloat(billItems[r].TotalItemAmount);
                }

                var footerRow = document.createElement('tr');
                footerRow.classList.add('bg-amber-100');

                var footerData = '';

                footerData = "<td class='text-center text-bold text-size-medium'> Total </td>";
                footerData += "<td class='text-center text-bold text-size-medium'>" + totalChargeAmount + "</td>";
                footerData += "<td class='text-right text-bold text-size-medium'>" + totalGSTAmount + "</td>";
                footerData += "<td class='text-right text-bold text-size-medium'>" + totalChargeAmount + "</td>";
                footerData += "<td class='text-right text-bold text-size-medium'></td>";

                footerRow.innerHTML = footerData;

                tableFooter.appendChild(footerRow);
            }

            _shared.showPanel(DOM.billChargesViewMode);
            _shared.hidePanel(DOM.billChargesEditMode);
        }
    }

    function saveAndAddNewBillCharge() {

        saveBillCharges();

        addNewBillCharge();

        DOM.billChargeName.focus();
    }

    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        applyPlugins();
        loadData();                                                                                                                                                                                                                                                                                                            
        getSalesBills();
    }

    return {
        init: init
    };

}());


SharpiTech.CashSales.init();
