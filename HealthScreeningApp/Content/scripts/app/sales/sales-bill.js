
var SharpiTech = {};

SharpiTech.SalesBill = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var salesBills = [];
    var salesBillDeliveryDetails = [];
    var salesBillPaymentDetails = [];
    var salesBillChargesDetails = [];
    var salesBillItems = [];
    var salesBillItemsChargesDetails = [];
    var GSTDetails = [];
    var searchedItemsList = [];
    var currentFocus;
    var FLAG;
    var elementName;

    var gstApplicable = "SGST";

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.addNewSalesBill = document.getElementById('AddNewSalesBill');
        DOM.showSalesBillList = document.getElementById('ShowSalesBillList');
        DOM.viewSalesBill = document.getElementById('ViewSalesBill');
        DOM.editSalesBill = document.getElementById('EditSalesBill');
        DOM.saveSalesBill = document.getElementById('SaveSalesBill');
        DOM.cancelSalesBill = document.getElementById('CancelSalesBill');
        DOM.deleteSaleBill = document.getElementById('DeleteSalesBill');
        DOM.printSalesBill = document.getElementById('PrintSalesBill');
        DOM.filterSalesBill = document.getElementById('FilterSalesBill');
        DOM.exportSalesBillList = document.getElementById('ExportSalesBillList');
        DOM.showItemRate = document.getElementById('ShowItemRate');

        DOM.searchPanel = document.getElementById('SearchPanel');
        DOM.searchByFinancialYear = document.getElementById('SearchByFinancialYear');
        DOM.searchBySaleType = document.getElementById('SearchBySaleType');
        DOM.searchBySalesBillNo = document.getElementById('SearchBySalesBillNo');
        DOM.searchBySalesBillNoButton = document.getElementById('SearchBySalesBillNoButton');

        DOM.editMode = document.getElementById('EditMode');
        DOM.salesBillId = document.getElementById('SalesBillId');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.companyName = document.getElementById('CompanyName');
        DOM.branch = document.getElementById('Branch');
        DOM.billingLocation = document.getElementById('BillingLocation');
        DOM.typeOfSale = document.getElementById('TypeOfSale');
        DOM.isBillNoAuto = document.getElementsByName('IsBillNoAuto');
        DOM.billNoAuto = document.getElementById('BillNoAuto');
        DOM.billNoManual = document.getElementById('BillNoManual');
        DOM.billNo = document.getElementById('BillNo');
        DOM.billDate = document.getElementById('BillDate');
        DOM.billDatePicker = document.getElementById('BillDatePicker');
        DOM.salesman = document.getElementById('Salesman');
        DOM.isTaxInclusive = document.getElementsByName('IsTaxInclusive');
        DOM.taxInclusive = document.getElementById('TaxInclusive');
        DOM.taxExclusive = document.getElementById('TaxExclusive');

        DOM.scanBarcode = document.getElementById('ScanBarcode');
        DOM.totalBillAmount = document.getElementById('TotalBillAmount');
        DOM.salesBillItemsList = document.getElementById('SalesBillItemsList');
        DOM.gstBreakup = document.getElementById('GSTBreakup');

        DOM.customerName = document.getElementById('CustomerName');
        DOM.addNewCustomer = document.getElementById('AddNewCustomer');
        DOM.refreshCustomerList = document.getElementById('RefreshCustomerList');
        DOM.consigneeName = document.getElementById('ConsigneeName');
        DOM.addNewConsignee = document.getElementById('AddNewConsignee');
        DOM.refreshConsigneeList = document.getElementById('RefreshConsigneeList');

        DOM.salesBillPaymentId = document.getElementById('SalesBillPaymentId');
        DOM.paymentSettlement = document.getElementById('PaymentSettlement');
        DOM.modeOfPayment = document.getElementById('ModeOfPayment');
        DOM.cashMode = document.getElementById('CashMode');
        DOM.cashAmount = document.getElementById('CashAmount');
        DOM.chequeMode = document.getElementById('ChequeMode');
        DOM.chequeNo = document.getElementById('ChequeNo');
        DOM.chequeDate = document.getElementById('ChequeDate');
        DOM.chequeDrawnOn = document.getElementById('ChequeDrawnOn');
        DOM.chequeAmount = document.getElementById('ChequeAmount');
        DOM.creditCardMode = document.getElementById('CreditCardMode');
        DOM.creditCardNo = document.getElementById('CreditCardNo');
        DOM.creditCardAmount = document.getElementById('CreditCardAmount');
        DOM.netBankingMode = document.getElementById('NetBankingMode');
        DOM.netBankingReferenceNo = document.getElementById('NetBankingReferenceNo');
        DOM.netBankingAmount = document.getElementById('NetBankingAmount');
        DOM.paymentRemarks = document.getElementById('PaymentRemarks');

        DOM.salesBillDeliveryId = document.getElementById('SalesBillDeliveryId');
        DOM.transporter = document.getElementById('Transporter');
        DOM.addNewTransporter = document.getElementById('AddNewTransporter');
        DOM.refreshTransporterList = document.getElementById('RefreshTransporterList');
        DOM.lrNo = document.getElementById('LRNo');
        DOM.lrDate = document.getElementById('LRDate');
        DOM.lrDatePicker = document.getElementById('LRDatePicker');
        DOM.deliveryTo = document.getElementById('DeliveryTo');
        DOM.deliveryAddress = document.getElementById('DeliveryAddress');
        DOM.deliveryDate = document.getElementById('DeliveryDate');
        DOM.deliveryDatePicker = document.getElementById('DeliveryDatePicker');
        DOM.isDeliveryPending = document.getElementsByName('IsDeliveryPending');
        DOM.deliveryPendingYes = document.getElementById('DeliveryPendingYes');
        DOM.deliveryPendingNo = document.getElementById('DeliveryPendingNo');
        DOM.deliveryRemarks = document.getElementById('DeliveryRemarks');

        DOM.billChargesViewMode = document.getElementById('BillChargesViewMode');
        DOM.billChargesList = document.getElementById('BillChargesList');
        DOM.salesBillChargeSrNo = document.getElementById('SalesBillChargeSrNo');
        DOM.salesBillChargeId = document.getElementById('SalesBillChargeId');
        DOM.addNewBillCharge = document.getElementById('AddNewBillCharge');
        DOM.showBillChargesList = document.getElementById('ShowBillChargesList');
        DOM.editBillCharge = document.getElementById('EditBillCharge');
        DOM.saveBillCharge = document.getElementById('SaveBillCharge');
        DOM.saveAndAddNewBillCharge = document.getElementById('SaveAndAddNewBillCharge');
        DOM.deleteBillCharge = document.getElementById('DeleteBillCharge');

        DOM.billChargesEditMode = document.getElementById('BillChargesEditMode');
        DOM.billChargeName = document.getElementById('BillChargeName');
        DOM.billChargeAmount = document.getElementById('BillChargeAmount');
        DOM.isBillChargeTaxInclusive = document.getElementsByName('IsBillChargeTaxInclusive');
        DOM.billChargeTaxInclusive = document.getElementById('BillChargeTaxInclusive');
        DOM.billChargeTaxExclusive = document.getElementById('BillChargeTaxExclusive');
        DOM.billChargeGSTRate = document.getElementById('BillChargeGSTRate');
        DOM.billChargeGSTAmount = document.getElementById('BillChargeGSTAmount');
        DOM.billChargeTotalAmount = document.getElementById('BillChargeTotalAmount');

        DOM.searchItemRate = document.getElementById('SearchItemRate');
        DOM.searchItemForItemRate = document.getElementById('SearchItemForItemRate');
        DOM.itemsList = document.getElementById('ItemsList');
        DOM.itemRateList = document.getElementById('ItemRateList');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.salesBillList = document.getElementById('SalesBillList');

        DOM.clientModal = document.getElementById('ClientModal');
        DOM.clientDetails = document.getElementById('ClientDetails');
        DOM.closeClientModal = document.getElementById('CloseClientModal');

        DOM.itemRateHistoryModal = document.getElementById('ItemRateHistoryModal');
        DOM.itemRateHistoryList = document.getElementById('ItemRateHistoryList');

        /* Jquery cache */
        /* Jquery cache */

        DOM.$clientModal = $('#ClientModal');
        DOM.$closeClientModal = $('#CloseClientModal');
        DOM.$cashSalesItemModal = $('#CashSaleItemModal');
        DOM.$billDatePicker = $('#BillDatePicker');
        DOM.$lrDatePicker = $('#LRDatePicker');
        DOM.$deliveryDatePicker = $('#DeliveryDatePicker');
        DOM.$searchItemRateModal = $('#SearchItemRate');
        DOM.$closeSearchItemRateModal = $('#CloseSearchItemRate');
        DOM.$itemRateHistoryModal = $('#ItemRateHistoryModal');
        DOM.$closeItemRateHistoryModal = $('#CloseItemRateHistoryModal');
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

        DOM.searchBySalesBillNoButton.addEventListener('click', getSalesBillDetailsBySearch);

        DOM.addNewSalesBill.addEventListener('click', addNewSalesBill);
        DOM.showSalesBillList.addEventListener('click', getSalesBills);
        DOM.viewSalesBill.addEventListener('click', viewSalesBill);
        DOM.editSalesBill.addEventListener('click', editSalesBill);
        DOM.saveSalesBill.addEventListener('click', saveSalesBill);
        DOM.deleteSaleBill.addEventListener('click', deleteSaleBill);
        DOM.printSalesBill.addEventListener('click', printSalesBill);
        DOM.cancelSalesBill.addEventListener('click', cancelSalesBill);
        DOM.showItemRate.addEventListener('click', showItemRateModal);

        DOM.addNewCustomer.addEventListener('click', addNewClient);
        DOM.refreshCustomerList.addEventListener('click', refreshClientList(event));

        DOM.addNewConsignee.addEventListener('click', addNewClient);
        DOM.refreshConsigneeList.addEventListener('click', refreshClientList(this));

        DOM.addNewTransporter.addEventListener('click', addNewClient);
        DOM.refreshTransporterList.addEventListener('click', refreshClientList(this));

        DOM.addNewBillCharge.addEventListener('click', addNewBillCharge);
        DOM.showBillChargesList.addEventListener('click', getBillCharges);
        DOM.editBillCharge.addEventListener('click', editBillCharge);
        DOM.saveBillCharge.addEventListener('click', saveBillCharge);
        DOM.deleteBillCharge.addEventListener('click', deleteBillCharges);
        DOM.saveAndAddNewBillCharge.addEventListener('click', saveAndAddNewBillCharge);

        DOM.companyName.onchange = function () {
            getBranchName(0);
        };

        DOM.typeOfSale.onchange = function () {
            setDefaultCustomer();
        };

        DOM.billNoAuto.onchange = function () {
            enableBillNo();
        };

        DOM.billNoManual.onchange = function () {
            enableBillNo();
        };

        DOM.billNo.onblur = function () {
            checkBillNoIsExists(function (response) {
                if (response === true) {
                    DOM.billno.focus();
                    shared.hideLoader(DOM.loader);
                    swal("Warning", "This Bill No. is already exists.", "warning");
                    return false;
                }
            });
        };

        DOM.modeOfPayment.onchange = function (e) {

            var option = e.currentTarget.options[e.currentTarget.selectedIndex].text;

            showModeOfPayment(option);
        };

        DOM.consigneeName.onchange = function () {
            getGSTApplicable();
        };

        DOM.scanBarcode.onchange = function () {
            getItemNameAsPerBarcode();
        };

        DOM.billNo.onkeydown = function validate(e) {
            return shared.acceptOnlyNumbers(e);
        };

        DOM.billChargeAmount.onkeydown = function (e) {
            return shared.acceptDecimalNos(e);
        };

        DOM.billChargeAmount.onblur = function () {
            calculateGSTOnBillChargeAmount();
        };

        DOM.searchBySalesBillNo.onkeydown = function (e) {

            e = e || window.event;

            var keyCode = (e.which || e.keyCode);

            if (keyCode === 13 || keyCode === 8) {
                getSalesBillDetailsBySearch();
            }

        };

        DOM.searchItemForItemRate.onkeyup = function (e) {

            if (currentFocus === undefined) { currentFocus = -1; }

            showItemsList(e, DOM.searchItemForItemRate);

        };

    }

    function getSalesBillDetailsBySearch() {

        var workingPeriodId = parseInt(0);
        var salesBillNo = parseInt(0);
        var saleTypeId = parseInt(0);

        workingPeriodId = parseInt(DOM.searchByFinancialYear.options[DOM.searchByFinancialYear.selectedIndex].value);
        saleTypeId = parseInt(DOM.searchBySaleType.options[DOM.searchBySaleType.selectedIndex].value);
        salesBillNo = parseInt(DOM.searchBySalesBillNo.value);

        if (salesBillNo > 0) {

            salesBills.length = 0;
            salesBillItems.length = 0;

            shared.sendRequest(SERVICE_PATH + "GetSalesBillDetailsByWorkingPeriodSaleTypeAndSalesBillNo/" + workingPeriodId + '/' + saleTypeId + '/' + salesBillNo, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    var res = JSON.parse(response.responseText);

                    salesBills = res;

                    showSalesBillDetails(salesBills.SalesBillId);
                }

            });

        }
    }

    var checkIsSalesBillDeleted = function () {

        var isDeleted = false;

        if (salesBills !== undefined) {

            if (salesBills.IsDeleted) {

                isDeleted = true;

            }
            else {

                isDeleted = false;

            }
        }

        return isDeleted;
    };

    function showModeOfPayment(option) {

        var elements = [];

        if (option.toUpperCase() === "CASH") {
            elements = [DOM.creditCardMode, DOM.chequeMode, DOM.netBankingMode];
            hidePaymentOption(elements);
            showPaymentOption(DOM.cashMode);
        }
        else if (option.toUpperCase() === "CREDIT CARD") {
            elements = [DOM.cashMode, DOM.chequeMode, DOM.netBankingMode];
            hidePaymentOption(elements);
            showPaymentOption(DOM.creditCardMode);
        }
        else if (option.toUpperCase() === "CHEQUE") {
            elements = [DOM.cashMode, DOM.creditCardMode, DOM.netBankingMode];
            hidePaymentOption(elements);
            showPaymentOption(DOM.chequeMode);
        }
        else if (option.toUpperCase() === "NEFT/RTGS") {
            elements = [DOM.cashMode, DOM.chequeMode, DOM.creditCardMode];
            hidePaymentOption(elements);
            showPaymentOption(DOM.netBankingMode);
        }
        else if (option.toUpperCase() === "PART BY CASH AND PART BY CREDIT CARD") {
            elements = [DOM.chequeMode, DOM.netBankingMode];
            hidePaymentOption(elements);
            showPaymentOption(DOM.cashMode);
            showPaymentOption(DOM.creditCardMode);
        }
        else if (option.toUpperCase() === "PART BY CASH AND PART BY CHEQUE") {
            elements = [DOM.creditCardMode, DOM.netBankingMode];
            hidePaymentOption(elements);
            showPaymentOption(DOM.cashMode);
            showPaymentOption(DOM.chequeMode);
        }
    }

    function showPaymentOption(element) {

        var getHeight = function () {
            element.style.display = "block";
            var height = element.scrollHeight + 'px';
            element.style.display = '';
            return height;
        };

        var height = getHeight();

        element.classList.remove('hide-panel');
        element.classList.remove('removed-item');
        element.classList.add('restored-item');
        element.height = height;

        setTimeout(function () {
            element.style.height = '0';
        }, 100);
    }

    function hidePaymentOption(elements) {

        if (elements.length) {

            for (var e = 0; e < elements.length; e++) {

                var element = elements[e];

                element.style.height = element.scrollHeight + 'px';

                //setTimeout(function () {
                element.style.height = "0";

                //}, 500);

                //setTimeout(function () {
                element.classList.remove('restored-item');
                element.classList.add('hide-panel');
                element.classList.add('removed-item');
                //}, 500);
            }
        }
    }

    function setFocus() {
        DOM.$cashSalesItemModal.on('shown.bs.modal', function () {
            DOM.itemName.focus();
        });
    }

    function loadData() {

        getFinancialYear();
        getCompany();
        getBillingLocation();
        getTypeOfSale();
        getTransporter();
        getSalesman();
        //getDiscountOptions();
        getModeOfPayments();
        getPaymentSettlements();
        getCharges();

        addNewSalesBill();
    }

    function validateInput(e) {
        return shared.acceptDecimalNos(e);
    }

    function getDiscountOptions(element) {

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

        element.appendChild(fragment);
    }

    function getFinancialYear() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
                    shared.setSelect2ControlsText(DOM.financialYear);

                    DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                }
            }
        });
    }

    function getCompany() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllCompanies', DOM.companyName, "CompanyName", "CompanyId", "Choose Company", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.companyName, parseInt(2));
                    shared.setSelect2ControlsText(DOM.companyName);

                    getBranchName(1);
                }
            }
        });
    }

    function getBranchName(branchId) {

        DOM.branch.options.length = 0;

        var companyId = 0;

        if (DOM.companyName.selectedIndex > 0) {
            companyId = parseInt(DOM.companyName.options[DOM.companyName.selectedIndex].value);
        }

        if (isNaN(companyId)) { companyId = parseInt(0); }

        if (companyId > 0) {

            shared.fillDropdownWithCallback(SERVICE_PATH + 'GetBranchesByCompanyId/' + companyId, DOM.branch, "BranchName", "BranchId", "Choose Branch", function (response) {

                if (response.status === 200) {

                    shared.showLoader(DOM.loader);

                    if (response.responseText !== undefined) {

                        if (branchId > 0) {
                            shared.setSelectValue(DOM.branch, null, branchId);
                            shared.setSelect2ControlsText(DOM.branch);
                        }
                        else {
                            shared.setSelectOptionByIndex(DOM.branch, parseInt(1));
                            shared.setSelect2ControlsText(DOM.branch);
                        }

                        shared.hideLoader(DOM.loader);
                    }
                }
            });
        }
    }

    function getBillingLocation() {

        //shared.fillDropdownWithCallback(SERVICE_PATH + 'GetLocation', DOM.billingLocation, "LocationName", "LocationId", "Choose Billing Location", function (response) {

        //    if (response.status === 200)

        //        if (response.responseText !== undefined) {

        //            shared.setSelectOptionByIndex(DOM.billingLocation, parseInt(1));
        //            shared.setSelect2ControlsText(DOM.billingLocation);
        //        }
        //    }
        //});
    }

    function getModeOfPayments() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetModeOfPayments', DOM.modeOfPayment, "PaymentMode", "ModeOfPaymentId", "Choose Mode of Payment", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.modeOfPayment, parseInt(1));
                    shared.setSelect2ControlsText(DOM.modeOfPayment);
                }
            }
        });
    }

    function getPaymentSettlements() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetPaymentSettlements', DOM.paymentSettlement, "SettlementOfPayment", "PaymentSettlementId", "Choose Payment Settlement", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.paymentSettlement, parseInt(1));
                    shared.setSelect2ControlsText(DOM.paymentSettlement);
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

    function getTypeOfSale() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetTypeOfSales', DOM.typeOfSale, "SaleType", "SaleTypeId", "Choose Type of Sale", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.typeOfSale, parseInt(1));
                    shared.setSelect2ControlsText(DOM.typeOfSale);

                    DOM.searchBySaleType.innerHTML = DOM.searchBySaleType.innerHTML + DOM.typeOfSale.innerHTML;
                }
            }
        });
    }

    function getCustomer() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/1', DOM.customer, "ClientAddressName", "ClientAddressId", "Choose Customer", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.customer, parseInt(1));
                    shared.setSelect2ControlsText(DOM.customer);

                    getGSTApplicable();
                }
            }
        });
    }

    function getConsignee() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/1', DOM.consignee, "ClientAddressName", "ClientAddressId", "Choose Consignee", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.consignee, parseInt(1));
                    shared.setSelect2ControlsText(DOM.consignee);

                    //getGSTApplicable();
                }
            }
        });
    }

    function getTransporter() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/3', DOM.transporter, "ClientAddressName", "ClientAddressId", "Choose Transporter", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.transporter, parseInt(1));
                    shared.setSelect2ControlsText(DOM.transporter);
                }
            }
        });
    }

    function getSalesman() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetEmployeesByDepartmentId/3', DOM.salesman, "FullName", "EmployeeId", "Choose Salesman", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.salesman, parseInt(0));
                    shared.setSelect2ControlsText(DOM.salesman);
                }
            }
        });
    }

    //function getItems() {

    //    shared.fillDropdownWithCallback(SERVICE_PATH + 'GetItemsByBrandCategoryAndQuality', DOM.itemName, "ItemName", "ItemId", "Choose Item", function (response) {
    //        if (response.status === 200) {

    //            if (response.responseText !== undefined) {

    //                shared.setSelectOptionByIndex(DOM.itemName, parseInt(-1));
    //                shared.setSelect2ControlsText(DOM.itemName);
    //            }
    //        }
    //    });
    //}

    function getCharges() {

        DOM.billChargeName.options.length = 0;

        var dataAttributes = 'GSTCategoryId';

        shared.fillDropdownWithDataAttributesAndCallback(SERVICE_PATH + 'GetAllCharges', DOM.billChargeName, "ChargeName", "ChargeId", "Choose Charge", dataAttributes, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    if (DOM.billChargeName.options.length > 1) {
                        shared.setSelectOptionByIndex(DOM.billChargeName, parseInt(1));
                        shared.setSelect2ControlsText(DOM.billChargeName);
                    }
                }
            }
        });

        shared.hideLoader(DOM.loader);
    }

    $('#ScanBarcode').autocomplete({
        source: function (request, response) {
            //var param = { hsCod: HSCode.value };
            $.ajax({
                url: SERVICE_PATH + "SearchSaleItemByItemName/" + DOM.scanBarcode.value + "",
                dataType: "json",
                type: "GET",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.ItemName + '^' + item.GoodsReceiptItemId + '|' + item.StockQty, //vLabel,
                            val: item.ItemId, //vValue
                            GoodsReceiptItemId: item.GoodsReceiptItemId,
                            StockQty: item.StockQty
                        };
                    }));
                    if (data.length === 0) {
                        //    DOM.scanBarcode.value = "";
                        DOM.scanBarcode.removeAttribute("data-item-id");
                        DOM.scanBarcode.removeAttribute("data-goods-receipt-item-id");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    handleError(textStatus + ' ' + errorThrown);
                    swal({
                        title: "Error",
                        text: "No Records Found.",
                        type: "error"
                    }, function () {
                        DOM.scanBarcode.value = "";
                        DOM.scanBarcode.focus();
                    });
                }
            });
        },
        select: function (event, ui) {
            if (ui.item) {

                DOM.scanBarcode.value = ui.item.label.substring(0, ui.item.label.lastIndexOf('^'));
                DOM.scanBarcode.setAttribute('data-item-id', parseInt(ui.item.val));
                DOM.scanBarcode.setAttribute('data-goods-receipt-item-id', parseInt(ui.item.GoodsReceiptItemId));
            }
        },
        minLength: 2
    });

    $('#CustomerName').autocomplete({
        source: function (request, response) {
            //var param = { hsCod: HSCode.value };
            $.ajax({
                url: SERVICE_PATH + "SearchClientAddressNameByClientAddressName/" + DOM.customerName.value + "/",
                dataType: "json",
                type: "GET",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.ClientAddressName, //vLabel,
                            val: item.ClientAddressId //vValue                                                    }
                        };
                    }));
                    if (data.length === 0) {
                        DOM.customerName.value = "";
                        DOM.customerName.removeAttribute("data-customer-address-id");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    handleError(textStatus + ' ' + errorThrown);
                    swal({
                        title: "Error",
                        text: "No Records Found.",
                        type: "error"
                    }, function () {
                        DOM.customerName.value = "";
                        DOM.customerName.focus();
                    });
                }
            });
        },
        select: function (event, ui) {
            if (ui.item) {

                DOM.customerName.removeAttribute("data-customer-address-id");

                DOM.customerName.value = ui.item.label;
                DOM.customerName.setAttribute('data-customer-address-id', parseInt(ui.item.val));
            }
        },
        minLength: 2
    });

    $('#ConsigneeName').autocomplete({
        source: function (request, response) {
            //var param = { hsCod: HSCode.value };
            $.ajax({
                url: SERVICE_PATH + "SearchClientAddressNameByClientAddressName/" + DOM.consigneeName.value + "",
                dataType: "json",
                type: "GET",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.ClientAddressName, //vLabel,
                            val: item.ClientAddressId //vValue                                                    }
                        };
                    }));
                    if (data.length === 0) {
                        DOM.consigneeName.value = "";
                        DOM.consigneeName.removeAttribute("data-consingee-address-id");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    handleError(textStatus + ' ' + errorThrown);
                    swal({
                        title: "Error",
                        text: "No Records Found.",
                        type: "error"
                    }, function () {
                        DOM.consigneeName.value = "";
                        DOM.consigneeName.focus();
                    });
                }
            });
        },
        select: function (event, ui) {
            if (ui.item) {

                DOM.consigneeName.removeAttribute("data-consignee-address-id");

                DOM.consigneeName.value = ui.item.label;
                DOM.consigneeName.setAttribute('data-consignee-address-id', parseInt(ui.item.val));
            }
        },
        minLength: 3
    });

    //function getItems() {

    //    shared.sendRequest(SERVICE_PATH + "GetItemsByBrandCategoryAndQuality", "GET", true, "JSON", null, function (response) {

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

            shared.setSelectValue(DOM.consignee, null, parseInt(customerId));
            shared.setSelect2ControlsText(DOM.consignee);

        }
    }

    function enableBillNo() {

        if (DOM.billNoAuto.checked) {
            DOM.billNo.disabled = true;
        }
        else {
            DOM.billNo.disabled = false;
        }
    }

    var checkBillNoIsExists = function (callback) {

        if (parseInt(DOM.billNo.getAttribute('data-sales-bill-id')) === 0) {

            if (DOM.billNo.value !== "") {

                var billNo = {};

                billNo = {
                    BranchId: parseInt(DOM.branch.options[DOM.branch.selectedIndex].value),
                    WorkingPeriodId: parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value),
                    SaleTypeId: parseInt(DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].value),
                    SalesBillNo: parseInt(DOM.billNo.value)
                };

                var postData = JSON.stringify(billNo);

                shared.sendRequest(SERVICE_PATH + "CheckSalesBillNoIsExists/", "POST", true, "JSON", postData, function (response) {

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            var res = JSON.parse(response.responseText);

                            callback(res);
                        }
                    }
                });
            }
            else {

                callback(false);

            }
        }
        else {
            callback(false);
        }
    };

    function getGSTApplicable() {

        var clientAddressId = parseInt(DOM.consigneeName.getAttribute('data-consignee-address-id'));

        if (isNaN(clientAddressId)) { clientAddressId = parseInt(0); }

        shared.sendRequest(SERVICE_PATH + "GetGSTApplicable/" + clientAddressId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res.GSTName !== undefined) {

                        gstApplicable = res.GSTName;
                    }
                }
            }
        });
    }

    function getItemNameAsPerBarcode() {

        if (DOM.scanBarcode.value !== "") {

            var goodsReceiptItemId = 0;
            var inwardGoodsId = 0;
            var itemId = 0;

            var lastIndex = 0;
            var url = "";

            if (DOM.scanBarcode.value.indexOf("/") > 0) {

                DOM.scanBarcode.value = DOM.scanBarcode.value.substring(DOM.scanBarcode.value.lastIndexOf('/') + 1);
            }

            if (DOM.scanBarcode.value.indexOf("-") > 0) {
                lastIndex = DOM.scanBarcode.value.indexOf("-");

                if (lastIndex > 0) {
                    inwardGoodsId = DOM.scanBarcode.value.substring(lastIndex + 1);
                    goodsReceiptItemId = DOM.scanBarcode.value.substring(0, lastIndex);
                }
            }
            else {
                goodsReceiptItemId = parseInt(DOM.scanBarcode.value);
            }

            itemId = parseInt(DOM.scanBarcode.getAttribute("data-item-id"));

            if (isNaN(goodsReceiptItemId)) { goodsReceiptItemId = parseInt(0); }
            if (isNaN(itemId)) { itemId = parseInt(0); }
            if (isNaN(inwardGoodsId)) { inwardGoodsId = 0; }

            if (inwardGoodsId > 0) {
                url = SERVICE_PATH + "GetItemsListByGoodsReceiptAndInwardGoodsBarcode/" + goodsReceiptItemId + '/' + inwardGoodsId;
            }
            else {
                url = SERVICE_PATH + "GetItemListByGoodsReceiptBarcode/" + goodsReceiptItemId;
            }

            if (goodsReceiptItemId > 0) {

                shared.sendRequest(url, "GET", true, "JSON", null, function (response) {

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            var res = JSON.parse(response.responseText);

                            if (res.ItemName === null) {
                                DOM.scanBarcode.value = "";
                                swal("error", "No Item found.", "error");
                            }
                            else if (res.ItemName !== undefined) {

                                res.SalesBillItemId = parseInt(0);
                                res.SaleQty = parseFloat(1);
                                res.CashDiscountPercent = parseFloat(0);
                                res.GSTRateId = parseInt(0);
                                res.TaxId = parseInt(0);
                                res.GSTRate = parseFloat(0);
                                res.TotalItemAmount = parseFloat(0);

                                getSalesSchemeDetails(res.ItemId, function (data) {

                                    res.SalesSchemes = data;

                                    bindBarcodeItem(res);

                                });
                            }

                            //DOM.qtyInPcs.value = parseInt(1);
                            //DOM.qtyInPcs.focus();
                        }
                    }
                });
            }
            else if (itemId > 0) {

                shared.sendRequest(SERVICE_PATH + "GetItemDetailsByItemId/" + itemId, "GET", true, "JSON", null, function (response) {

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            var res = JSON.parse(response.responseText);

                            if (res.ItemName === null) {
                                DOM.scanBarcode.value = "";
                                swal("error", "No Item found.", "error");
                            }
                            else if (res.ItemName !== undefined) {

                                res.SalesBillItemId = parseInt(0);
                                res.SaleQty = parseFloat(1);
                                res.UnitOfMeasurementId = parseInt(8);
                                res.CashDiscountPercent = parseFloat(0);
                                res.GSTRateId = parseInt(0);
                                res.TaxId = parseInt(0);
                                res.GSTRate = parseFloat(0);
                                res.TotalItemAmount = parseFloat(0);
                                res.GoodsReceiptItemId = parseInt(DOM.scanBarcode.getAttribute('data-goods-receipt-item-id'));

                                getSalesSchemeDetails(res.ItemId, function (data) {

                                    res.SalesSchemes = data;

                                    bindBarcodeItem(res);

                                });
                            }

                            //DOM.qtyInPcs.value = parseInt(1);
                            //DOM.qtyInPcs.focus();
                        }
                    }
                });
            }
        }

        DOM.scanBarcode.value = "";
    }

    var checkIsItemExistsInTable = function (goodsReceiptItemId) {

        var isItemExists = false;

        var table = DOM.salesBillItemsList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var r = 0; r < tableRows.length; r++) {

                if (tableRows[r].classList.contains("removed-item") === false) {

                    //var inputs = table.querySelectorAll("input[type='text']");

                    //if (inputs.length) {

                    //for (var i = 0; i < inputs.length; i++) {
                    //if (parseInt(inputs[i].value) === goodsReceiptItemId) {
                    if (parseInt(tableRows[r].getAttribute('data-goods-receipt-item-id')) === goodsReceiptItemId) {
                        isItemExists = true;
                    }
                    //}
                    //}
                }
            }
        }

        return isItemExists;
    };

    function removeBillItem(e) {

        // Remove the item from the Table only if the sales bill item id is 0
        var tableBody = DOM.salesBillItemsList.tBodies[0];

        var tableRows = tableBody.children;

        var tableRow = e.currentTarget.parentElement.parentElement;

        var salesBillItemId = parseInt(tableRow.getAttribute('data-sales-bill-item-id'));

        if (isNaN(salesBillItemId)) { salesBillItemId = parseInt(0); }

        tableRow.classList.add('removed-item');

        //setTimeout(function() {
        tableRow.style.display = "none";
        //}, 100);

        //tableBody.removeChild(tableRow);

        // Mark the Item as Deleted if the sales bill item id is > 0
        if (salesBillItems.length) {
            for (var i = 0; i < salesBillItems.length; i++) {
                if (salesBillItems[i].SalesBillItemId === salesBillItemId) {
                    salesBillItems[i].IsDeleted = true;
                    salesBillItems[i].DeletedBy = parseInt(LOGGED_USER);
                    salesBillItems[i].DeletedByIP = IP_ADDRESS;
                    break;
                }
            }
        }

        showGSTBreakup();
        showTotalBillAmount();

    }

    function getSalesSchemeDetails(itemId, callback) {

        // Get the sales scheme details by item id and bill date

        var billDate = DOM.billDate.value;

        billDate = billDate.replace(/\//g, "-");

        shared.sendRequest(SERVICE_PATH + "GetSalesSchemeDetails/" + itemId + "/" + billDate, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    callback(res);

                }
            }
        });

    }

    function bindBarcodeItem(response) {

        var table = DOM.salesBillItemsList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var salesBillItemId = parseInt(0);
        var goodsReceiptItemId = parseInt(0);
        var itemId = parseInt(0);
        var itemName = null;
        var unitOfMeasurementId = parseInt(0);
        var unitCode = null;
        var HSNCode = null;
        var saleQty = parseFloat(0);
        var itemSaleRate = parseFloat(0);
        var salesSchemeid = 0;
        var salesScheme = null;
        var schemeDiscountPercent = 0;
        var schemeDiscountAmount = 0;
        var typeOfDiscount = null;
        var cashDiscountPercent = parseFloat(0);
        var taxId = parseInt(0);
        var taxableValue = parseFloat(0);
        var GSTRateId = parseInt(0);
        var GSTRate = parseFloat(0);
        var GSTAmount = parseFloat(0);
        var totalItemAmount = parseFloat(0);
        var salesSchemeList = [];

        salesBillItemId = parseInt(response.SalesBillItemId);
        goodsReceiptItemId = parseInt(response.GoodsReceiptItemId);
        itemId = parseInt(response.ItemId);
        itemName = response.ItemName;
        unitOfMeasurementId = response.UnitOfMeasurementId,
            unitCode = response.UnitCode;
        HSNCode = response.HSNCode;
        saleQty = response.SaleQty;
        itemSaleRate = response.SaleRate;
        salesSchemeid = response.SalesSchemeId;
        salesScheme = response.SalesScheme;
        schemeDiscountPercent = response.SchemeDiscountPercent;
        schemeDiscountAmount = response.SchemeDiscountAmount;
        typeOfDiscount = response.TypeOfDiscount;
        cashDiscountPercent = parseFloat(response.CashDiscountPercent);
        taxId = parseInt(response.TaxId);
        taxableValue = parseFloat(response.TaxableValue);
        GSTRateId = parseInt(response.GSTRateId);
        GSTRate = parseFloat(response.GSTRate);
        GSTAmount = parseFloat(response.GSTAmount);
        totalItemAmount = parseFloat(response.TotalItemAmount);
        salesSchemeList = response.SalesSchemes;

        if (unitCode === undefined) { unitCode = "PCS"; }

        if (salesBillItemId === 0) {
            if (goodsReceiptItemId > 0) {
                if (checkIsItemExistsInTable(goodsReceiptItemId)) {
                    DOM.scanBarcode.focus();
                    swal("Warning", "This Item Name is already exists.", "warning");
                    return;
                }
            }
        }

        var data = "";

        var tr = createElement('tr');

        var DOM_selectItemContainer = createElement('td');
        var DOM_checkboxLabel = createElement('label', undefined, 'label-tick');
        var DOM_checkboxSpan = createElement('span', undefined, 'label-text');
        var DOM_selectItem = createElement('input', 'checkbox', 'label-checkbox', 'SelectSalesBillItem', 'cb' + goodsReceiptItemId);

        var DOM_removeButton = createElement('button', 'button', 'btn btn-xs btn-danger btn-round', 'Remove' + goodsReceiptItemId);
        var DOM_removeFontIcon = createElement('span', undefined, 'fa fa-fw fa-remove', 'Remove' + goodsReceiptItemId);

        var DOM_barcodeContainer = createElement('td');
        var DOM_barcode = createElement('input', 'text', 'form-control input-sm text-center', 'Barcode', 'Barcode' + goodsReceiptItemId);

        var DOM_hsnCodeContainer = createElement('td');
        var DOM_itemNameContainer = createElement('td');
        var DOM_unitOfMeasurementContainer = createElement('td');

        var DOM_saleQtyContainer = createElement('td');
        var DOM_saleQty = createElement('input', 'text', 'form-control input-sm text-center', 'SaleQty', 'SaleQty' + goodsReceiptItemId);

        var DOM_sellRateContainer = createElement('td');
        var DOM_itemRateHistoryContainer = createElement('div', undefined, "input-group", undefined, undefined);
        var DOM_sellRate = createElement('input', 'text', 'form-control input-sm text-center', 'SellRate', 'SellRate' + goodsReceiptItemId);
        var DOM_itemRateHistorySpan = createElement('span', undefined, "input-group-addon", undefined, "ItemRateHistory");
        var DOM_itemRateHistory = createElement('i', undefined, "fa fa-history", undefined);

        var DOM_salesSchemeContainer = createElement('td');
        var DOM_salesScheme = createElement('select', '', 'form-control input-sm', 'SalesScheme', 'SalesScheme' + goodsReceiptItemId);
        //var DOM_salesScheme = createElement('input', 'text', 'form-control input-sm text-center', 'SalesScheme', 'SalesScheme' + goodsReceiptItemId);

        var DOM_typeOfDiscountContainer = createElement('td');
        var DOM_typeOfDiscount = createElement('select', '', 'form-control input-sm', 'TypeOfDiscount', 'TypeOfDiscount' + goodsReceiptItemId);

        var DOM_discountRateContainer = createElement('td');
        var DOM_discountRate = createElement('input', 'text', 'form-control input-sm text-center', 'DiscountRate', 'DiscRate' + goodsReceiptItemId);

        var DOM_taxableValueContainer = shared.createElement('td');
        var DOM_taxableValue = shared.createElement('input', 'text', 'form-control input-sm text-center', 'TaxableVlue', 'TaxableValue' + goodsReceiptItemId);

        var DOM_GSTRateContainer = shared.createElement('td');
        var DOM_GSTRate = shared.createElement('input', 'text', 'form-control input-sm text-center', 'GSTRate', 'GSTRate' + goodsReceiptItemId);

        var DOM_GSTAmountContainer = shared.createElement('td');
        var DOM_GSTAmount = shared.createElement('input', 'text', 'form-control input-sm text-center', 'GSTAmount', 'GSTAmount' + goodsReceiptItemId);

        var DOM_totalItemAmountContainer = createElement('td');
        var DOM_totalItemAmount = createElement('input', 'text', 'form-control input-sm text-right', 'TotalItemAmount', 'TotalItemAmount' + goodsReceiptItemId);

        DOM_taxableValue.disabled = true;
        DOM_GSTRate.disabled = true;
        DOM_GSTAmount.disabled = true;
        DOM_totalItemAmount.disabled = true;

        //DOM_removeButton.onclick = removeBillItem;

        //DOM_saleQty.onkeydown = validateInput;
        //DOM_saleQty.onblur = calculateItemAmount;

        //DOM_sellRate.onkeydown = validateInput;
        //DOM_sellRate.onblur = calculateItemAmount;
        //DOM_itemRateHistorySpan.onclick = showItemRateHistory;
        //DOM_itemRateHistory.onclick = showItemRateHistory;
        //DOM_discountRate.onkeydown = validateInput;
        //DOM_discountRate.onblur = calculateItemAmountAndSetFocus;

        //checkboxLabel.appendChild(selectItem);
        //checkboxLabel.appendChild(checkboxSpan);
        //selectItemContainer.appendChild(checkboxLabel);
        DOM_removeButton.appendChild(DOM_removeFontIcon);
        DOM_selectItemContainer.appendChild(DOM_removeButton);
        DOM_barcodeContainer.appendChild(DOM_barcode);
        DOM_saleQtyContainer.appendChild(DOM_saleQty);
        DOM_itemRateHistoryContainer.appendChild(DOM_sellRate);
        DOM_itemRateHistorySpan.appendChild(DOM_itemRateHistory);
        DOM_itemRateHistoryContainer.appendChild(DOM_itemRateHistorySpan);
        DOM_sellRateContainer.appendChild(DOM_itemRateHistoryContainer);
        DOM_salesSchemeContainer.appendChild(DOM_salesScheme);
        DOM_typeOfDiscountContainer.appendChild(DOM_typeOfDiscount);
        DOM_discountRateContainer.appendChild(DOM_discountRate);
        DOM_taxableValueContainer.appendChild(DOM_taxableValue);
        DOM_GSTRateContainer.appendChild(DOM_GSTRate);
        DOM_GSTAmountContainer.appendChild(DOM_GSTAmount);
        DOM_totalItemAmountContainer.appendChild(DOM_totalItemAmount);

        getDiscountOptions(DOM_typeOfDiscount);
                
        // Set Item
        tr.setAttribute('data-sales-bill-item-id', salesBillItemId);
        tr.setAttribute('data-goods-receipt-item-id', goodsReceiptItemId);
        tr.setAttribute('data-item-id', itemId);
        tr.setAttribute('data-unit-of-measurement-id', unitOfMeasurementId);
        tr.setAttribute('data-tax-id', taxId);
        tr.setAttribute('data-taxable-value', taxableValue);
        tr.setAttribute('data-gst-rate-id', GSTRateId);
        tr.setAttribute('data-gst-rate', GSTRate);
        tr.setAttribute('data-gst-amount', GSTAmount);

        DOM_barcode.value = goodsReceiptItemId;
        DOM_hsnCodeContainer.innerHTML = HSNCode;
        DOM_itemNameContainer.innerHTML = itemName;
        DOM_unitOfMeasurementContainer.innerHTML = unitCode;
        DOM_saleQty.value = parseFloat(saleQty);
        DOM_sellRate.value = parseFloat(itemSaleRate);
        //DOM_salesScheme.value = salesScheme;
        //DOM_salesScheme.setAttribute('data-sales-scheme-id', salesSchemeid);
        //DOM_salesScheme.setAttribute('data-scheme-discount-percent', schemeDiscountPercent);
        //DOM_salesScheme.setAttribute('data-scheme-discount-amount', schemeDiscountAmount);
        //DOM_salesScheme.disabled = "disabled";
        shared.setSelectValue(DOM_typeOfDiscount, typeOfDiscount, null);
        shared.setSelect2ControlsText(DOM_typeOfDiscount);

        shared.setSelectValue(DOM_typeOfDiscount, typeOfDiscount, null);
        shared.setSelect2ControlsText(DOM_typeOfDiscount);

        DOM_taxableValue.value = parseFloat(taxableValue);
        DOM_GSTRate.value = parseFloat(GSTRate);
        DOM_GSTAmount.value = parseFloat(GSTAmount);
        DOM_totalItemAmount.value = parseFloat(totalItemAmount);

        tr.appendChild(DOM_selectItemContainer);
        tr.appendChild(DOM_barcodeContainer);
        tr.appendChild(DOM_hsnCodeContainer);
        tr.appendChild(DOM_itemNameContainer);
        tr.appendChild(DOM_unitOfMeasurementContainer);
        tr.appendChild(DOM_saleQtyContainer);
        tr.appendChild(DOM_itemRateHistoryContainer);
        tr.appendChild(DOM_salesSchemeContainer);
        tr.appendChild(DOM_typeOfDiscountContainer);
        tr.appendChild(DOM_discountRateContainer);
        tr.appendChild(DOM_taxableValueContainer);
        tr.appendChild(DOM_GSTRateContainer);
        tr.appendChild(DOM_GSTAmountContainer);
        tr.appendChild(DOM_totalItemAmountContainer);

        tableBody.appendChild(tr);

        bindSalesSchemeDetails(salesSchemeList, DOM_salesScheme);

        DOM_removeButton.onclick = function(e) {
            removeBillItem(e);
        };

        DOM_saleQty.onkeydown = function (e) {
            validateInput(e);
        };

        DOM_saleQty.onblur = function (e) {
            calculateItemAmount(e.currentTarget.parentElement.parentElement);
        };

        DOM_sellRate.onkeydown = function (e) {
            validateInput(e);
        };

        DOM_sellRate.onblur = function (e) {
            calculateItemAmount(e.currentTarget.parentElement.parentElement);
        };

        DOM_itemRateHistorySpan.onclick = function (e) {
            showItemRateHistory(e);
        };
        
        DOM_itemRateHistory.onclick = function (e) {
            showItemRateHistory(e);
        }

        DOM_discountRate.onkeydown = function (e) {
            validateInput(e);
        };

        DOM_discountRate.onblur = function (e) {
            calculateItemAmountAndSetFocus(e.currentTarget.parentElement.parentElement, e);
        };


        if (salesBillItemId === 0) {


            //var event = new Event('onblur');
            //DOM_sellRate.addEventListener('onblur', calculateItemAmount);
            //DOM_sellRate.dispatchEvent(event);


            DOM_sellRate.onblur = function (e) {
                calculateItemAmount(e.currentTarget.parentElement.parentElement);
            };

            DOM_salesScheme.onchange = function (e) {
                setSchemeDetails(e.currentTarget.parentElement.parentElement);
            };

            //var event = new Event('onblur');
            //DOM_salesScheme.addEventListener('onblur', removeScheme);
            //DOM_salesScheme.dispatchEvent(event);

            DOM.scanBarcode.focus();
        }

        //assignEventsToTableInputs();

    }

    var createElement = function (elementName, inputType, inputClass, inputName, inputId) {

        var element = document.createElement(elementName);

        if (inputType !== undefined) {
            element.setAttribute('type', inputType);
        }
        if (inputClass !== undefined) {
            element.setAttribute('class', inputClass);
        }
        if (inputName !== undefined) {
            element.setAttribute('name', inputName);
        }
        if (inputId !== undefined) {
            element.setAttribute('id', inputId);
        }

        return element;
    };

    function calculateItemAmountAndSetFocus(tableRow, e) {
        calculateItemAmount(tableRow);
        setFocusToSearchItem(e);
    }

    function setFocusToSearchItem(e) {

        var tableRow = e.currentTarget.parentElement.parentElement;

        var tableBody = tableRow.parentElement;

        var tableRows = tableBody.children;

        if (tableRow.rowIndex === tableRows.length) {

            DOM.scanBarcode.focus();

        }

    }

    function showItemRateHistory(e) {

        getItemRateHistory(e);

        DOM.$itemRateHistoryModal.modal('show');
    }

    function getItemRateHistory(e) {

        if (parseInt(DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].value) === 2) {

            var customerId = parseInt(DOM.customerName.getAttribute('data-customer-address-id'));

            var tableRow = e.target.parentElement.parentElement.parentElement;

            var itemId = parseInt(tableRow.getAttribute('data-item-id'));

            var saleTypeId = 2;

            shared.sendRequest(SERVICE_PATH + "GetItemRateHistory/" + customerId + '/' + itemId + '/' + saleTypeId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var _response = JSON.parse(response.responseText);

                        if (_response !== undefined) {

                            bindItemRateHistory(_response);
                        }
                    }
                }
            });

        }

    }

    function bindItemRateHistory(response) {

        shared.showLoader(DOM.loader);

        var table = DOM.itemRateHistoryList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (response.length) {

            var data = "";

            for (var r = 0; r < response.length; r++) {

                data = data + "<tr data-sales-bill-id=" + response[r].SalesBillId + ">";
                data = data + "<td class='col-xs-6 text-center'>" + response[r].CustomerName + "</td>";
                data = data + "<td class='col-xs-2 text-center'>" + response[r].SalesBillNo + "</td>";
                data = data + "<td class='col-xs-2 text-center'>" + response[r].SalesBillDate + "</td>";
                data = data + "<td class='col-xs-2 text-center'>" + response[r].SaleRate + "</td>";
            }

            tableBody.innerHTML = data;

        }

        shared.hideLoader(DOM.loader);

    }

    //function assignEventsToTableInputs() {

    //    var tableBody = DOM.salesBillItemsList.tBodies[0];

    //    var tableRows = tableBody.children;

    //    if (tableRows.length) {

    //        for (var tr = 0; tr < tableRows.length; tr++) {

    //            var inputs = tableRows[tr].children;

    //            inputs[3].children[0].onkeydown = validateInput;
    //            inputs[4].children[0].onblur = calculateItemAmount;
    //            inputs[3].children[0].onkeydown = validateInput;
    //            getDiscountOptions(inputs[6].children[0]);
    //            inputs[7].children[0].onblur = calculateItemAmount;
    //        }
    //    }

    //}

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

                DOM.rateDifference.focus();
            }
        }

        calculateItemAmount();
    }


    function removeScheme(e) {

        e.target.setAttribute('data-sales-scheme-id', 0);
        e.target.setAttribute('data-scheme-discount-percent', 0);
        e.target.setAttribute('data-scheme-discount-amount', 0);

        calculateItemAmount(e);
    }

    function bindSalesSchemeDetails(schemes, element) {

        var dataAttributes = "DiscountPercent|DiscountAmount";

        shared.fillDropdownWithArrayDataAttributesAndCallback(schemes, element, "SchemeName", "SalesSchemeId", "Choose Scheme", dataAttributes, function (response) {

            if (element.options.length > 2) {
                shared.setSelectOptionByIndex(element, parseInt(2));
            }
            else {
                shared.setSelectOptionByIndex(element, parseInt(1));
            }

            shared.setSelect2ControlsText(element);

            setSchemeDetails(element.parentElement.parentElement);
        });
    }


    function setSchemeDetails(tableRow) {

            var inputs;

            var select;

        var selectedIndex = 0;

        inputs = tableRow.querySelectorAll("input[type='text']");

        select = tableRow.querySelectorAll("select");

        selectedIndex = parseInt(select[0].options.selectedIndex);

        schemeDiscountPercent = parseFloat(select[0].options[selectedIndex].getAttribute('data-discountpercent'));
        schemeDiscountAmount = parseFloat(select[0].options[selectedIndex].getAttribute('data-discountamount'));

        if (schemeDiscountPercent > 0) {
            inputs[3].value = parseFloat(schemeDiscountPercent);
            typeOfDiscount = "CASH DISCOUNT";

            shared.setSelectValue(select[1], typeOfDiscount, null);
            shared.setSelect2ControlsText(select[1]);

        }
        else if (schemeDiscountAmount > 0) {
            inputs[3].value = parseFloat(schemeDiscountAmount);
            typeOfDiscount = "RATE DIFFERENCE";

            shared.setSelectValue(select[1], typeOfDiscount, null);
            shared.setSelect2ControlsText(select[1]);

        }
        else {
            inputs[3].value = 0;
            typeOfDiscount = null;

            shared.setSelectOptionByIndex(select[1], parseInt(0));
            shared.setSelect2ControlsText(select[1]);

        }

        
        calculateItemAmount(tableRow);
    }

    function calculateItemAmount(tableRow) {

        var itemId = parseInt(0);        
        var saleQty = parseFloat(0);
        var saleRate = parseFloat(0);
        var amount = parseFloat(0);
        var schemeDiscountPercent = parseFloat(0);
        var schemeDiscountAmount = parseFloat(0);
        var rateAfterSchemeDiscount = 0;
        var cashDiscountPercent = parseFloat(0);
        var cashDiscountAmt = parseFloat(0);
        var rateDifference = parseFloat(0);
        var rateAfterCDRD = parseFloat(0);
        var taxableValue = parseFloat(0);
        var GSTRate = parseFloat(0);
        var GSTAmount = parseFloat(0);
        var totalItemAmount = parseFloat(0);
        var GSTExclAmount = parseFloat(0);
        var GSTInclAmount = parseFloat(0);
        var GSTRateId = parseInt(0);
        var taxId = parseInt(0);

        var HSNCode = "";

        //var tableRow;

        //if (e.hasAttributes('option')) {

          //  tableRow = e.parentElement.parentElement;            
        //}
        //else {
            //tableRow = e.currentTarget.parentElement.parentElement;            
        //}

        var inputs = tableRow.querySelectorAll("input[type='text']");

        var select = tableRow.querySelectorAll("select");

        itemId = parseInt(tableRow.getAttribute('data-item-id'));
        HSNCode = tableRow.children[2].innerHTML;
        saleQty = parseFloat(inputs[1].value);
        saleRate = parseFloat(inputs[2].value);
        schemeDiscountPercent = parseFloat(select[0].options[select[0].selectedIndex].getAttribute('data-discountpercent'));
        schemeDiscountAmount = parseFloat(select[0].options[select[0].selectedIndex].getAttribute('data-discountamount'));


        if (isNaN(schemeDiscountPercent)) { schemeDiscountPercent = 0; }
        if (isNaN(schemeDiscountAmount)) { schemeDiscountAmount = 0; }

        typeOfDiscount = select[1].options[select[1].selectedIndex].text;

        if (parseInt(select[0].options[select[0].selectedIndex].value) > 0) {

            if (schemeDiscountPercent > 0) {
                typeOfDiscount = "CASH DISCOUNT";
                inputs[3].value = schemeDiscountPercent;
                cashDiscountPercent = inputs[3].value;
            }
            else if (schemeDiscountAmount > 0) {
                typeOfDiscount = "RATE DIFFERENCE";
                inputs[3].value = schemeDiscountAmount;
                rateDifference = inputs[3].value;
            }
            else {
                typeOfDiscount = null;
                inputs[3].value = 0;
                cashDiscountPercent = 0;
                rateDifference = 0;

                shared.setSelectOptionByIndex(select[1], parseInt(0));
                shared.setSelect2ControlsText(select[1]);
            }
        }
        else {
            if (typeOfDiscount !== null) {
                if (typeOfDiscount.toUpperCase() === "CASH DISCOUNT") {
                    cashDiscountPercent = parseFloat(inputs[3].value);
                    //cashDiscountAmt = saleRate * (cashDiscountPercent / 100);        
                }
                else {
                    rateDifference = parseFloat(inputs[3].value);
                }
            }
        }

        ////SCHEME DISCOUNT APPLICABLE
        //if (schemeDiscountPercent > 0) {

        //    var schemeDisc = parseFloat(parseFloat(saleRate * (schemeDiscountPercent / 100)).toFixed(2));

        //    //DOM.cashDiscountAmt.value = cashDiscountAmt;

        //    rateAfterSchemeDiscount = parseFloat(saleRate - schemeDisc);

        //    amount = parseFloat(saleQty * rateAfterSchemeDiscount);
        //}
        //else if (schemeDiscountAmount > 0) {

        //    rateAfterSchemeDiscount = parseFloat(saleRate - schemeDiscountAmount);

        //    amount = parseFloat(saleQty * rateAfterSchemeDiscount);
        //}
        //else {

        //    rateAfterSchemeDiscount = parseFloat(saleRate);

        //    amount = parseFloat(saleQty * (parseFloat(rateAfterSchemeDiscount)));

        //}

        //DOM.rateDifference.value = rateDifference;
        //DOM.rateAfterCDRD.value = rateAfterCDRD;
        //DOM.amount.value = amount;

        //DOM.taxableValue.value = taxableValue;
        //DOM.gstRate.value = gstRate;
        //DOM.gstAmount.value = gstAmount;
        //DOM.totalItemAmount.value = totalItemAmount;

        if (cashDiscountPercent > 0) {

            cashDiscountAmt = parseFloat(parseFloat(saleRate * (cashDiscountPercent / 100)).toFixed(2));

            //DOM.cashDiscountAmt.value = cashDiscountAmt;

            rateAfterCDRD = parseFloat(saleRate - cashDiscountAmt);

            amount = parseFloat(saleQty * rateAfterCDRD);            
        }
        else if (rateDifference > 0) {

            rateAfterCDRD = parseFloat(saleRate - rateDifference);

            amount = parseFloat(saleQty * rateAfterCDRD);            
        }
        else {

            //if (rateAfterSchemeDiscount === 0) {

                rateAfterCDRD = parseFloat(saleRate);

                amount = parseFloat(saleQty * parseFloat(rateAfterCDRD));
            //}            
        }

        //DOM.amount.value = amount;

        if (amount > 0) {

            var rate = 0;

            getGSTRate(itemId, saleRate, function (response) {

                rate = response.Rate;

                if (rate >= 0) {

                    GSTRate = rate;

                    GSTRateId = parseInt(response.GSTRateId);
                    taxId = parseInt(response.TaxId);

                    tableRow.setAttribute('data-gst-rate-id', GSTRateId);
                    tableRow.setAttribute('data-tax-id', taxId);
                    tableRow.setAttribute('data-gst-rate', GSTRate);
                    
                    if (DOM.isTaxInclusive[0].checked === true) {

                        GSTExclAmount = parseFloat(parseFloat(parseFloat(amount * 100) / (GSTRate + 100)).toFixed(2));

                        taxableValue = GSTExclAmount;

                        GSTAmount = parseFloat(parseFloat(GSTExclAmount * (GSTRate / 100)).toFixed(2));

                    }
                    else {
                        
                        taxableValue = amount;

                        GSTAmount =  parseFloat(parseFloat(parseFloat(amount) * (GSTRate / 100)).toFixed(2));
                    }

                    tableRow.setAttribute('data-taxable-value', taxableValue);

                    totalItemAmount = parseFloat(parseFloat(taxableValue + GSTAmount).toFixed(2));

                    inputs[4].value = taxableValue;
                    inputs[5].value = GSTRate,
                    inputs[6].value = GSTAmount;                    
                    inputs[7].value = totalItemAmount;
                    
                    showGSTBreakup();

                    showTotalBillAmount();
                }
            });
        }
        else {

            inputs[7].value = totalItemAmount;

            showGSTBreakup();

            showTotalBillAmount();
        }
    }

    function showGSTBreakup() {

        DOM.gstBreakup.tBodies[0].innerHTML = "";

        var table = DOM.salesBillItemsList;
        var tableBody = table.tBodies[0];
        var tableRows = tableBody.children;
        
        if (tableRows.length) {

            var data = "";
    
            for (var g = 0; g < tableRows.length; g++) {

                if (tableRows[g].style.display !== "none") {
                    
                    var taxableValue = parseFloat(tableRows[g].getAttribute('data-taxable-value'));
                    var gstRate = parseFloat(tableRows[g].getAttribute('data-gst-rate'));

                    var SGSTAmount = parseFloat(taxableValue * (gstRate * (50 / 100)) / 100).toFixed(2);
                    var CGSTAmount = parseFloat(taxableValue * (gstRate * (50 / 100)) / 100).toFixed(2);
                    var IGSTAmount = parseFloat(0);
                    var totalGSTAmount = parseFloat(0);

                    totalGSTAmount = SGSTAmount + CGSTAmount + IGSTAmount;

                    data = data + "<tr>";
                    //data = data + "<td class='text-center'>" + tableRows[g].children[3].innerHTML + "</td>";
                    data = data + "<td class='text-center'>" + tableRows[g].children[2].innerHTML + "</td>";
                    data = data + "<td class='text-center'>" + taxableValue + "</td>";
                    data = data + "<td class='text-center'>" + gstRate + "</td>";
                    data = data + "<td class='text-center'>" + SGSTAmount + "</td>";
                    data = data + "<td class='text-center'>" + CGSTAmount + "</td>";
                    data = data + "<td class='text-center'>" + IGSTAmount + "</td>";
                    data = data + "<td class='text-center'>" + totalGSTAmount + "</td>";
                    data = data + "</tr>";
                }
            }

            DOM.gstBreakup.tBodies[0].innerHTML = data;
        }
    }

    function showTotalBillAmount() {

        var totalBillAmount = parseFloat(0);

        var table = DOM.salesBillItemsList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                if (tableRows[tr].style.display !== "none") {

                    var totalItemAmount = tableRows[tr].children[13].children[0];

                    totalBillAmount += parseFloat(totalItemAmount.value);
                }
            }

            DOM.totalBillAmount.innerHTML = totalBillAmount;

            if (parseInt(DOM.modeOfPayment.options[DOM.modeOfPayment.selectedIndex].value) === 1) {
                DOM.cashAmount.value = totalBillAmount;
            }
        }        
    }

    function getGSTRate(itemId, saleRate, callback) {

        var gstRate = parseInt(0);
        //var itemId = parseInt(0);

        //if (DOM.barcodeItem.value === "") {
        //    itemId = parseInt(DOM.itemName.getAttribute('data-item-id'));
        //}
        //else {
        //    itemId = DOM.barcodeItem.getAttribute('data-item-id');
        //}

        var gstr = {};

        gstr = {
            ItemId: itemId,
            GSTApplicable: gstApplicable,
            Rate: saleRate,
            EffectiveFromDate: DOM.billDate.value
        };

        var postData = JSON.stringify(gstr);

        shared.sendRequest(SERVICE_PATH + "GetGSTRateByItemIdGSTApplicableAndSaleRate/", "POST", true, "JSON", postData, function (response) {

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

        shared.showLoader(DOM.loader);

        var typeOfSale = undefined;
        var modeOfPayment = undefined;

        if (DOM.typeOfSale.selectedIndex > 0) {
            typeOfSale = DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].text.trim().toUpperCase();
        }

        if (DOM.modeOfPayment.selectedIndex > 0) {
            modeOfPayment = DOM.modeOfPayment.options[DOM.modeOfPayment.selectedIndex].text.trim().toUpperCase();
        }

        if (typeOfSale !== undefined) {

            var customer = "CASH";

            if (typeOfSale === "CASH") {

                if (modeOfPayment === "CASH") {
                    customer = "CASH";
                }
                else {
                    customer = "CARD";
                }
            }

            shared.sendRequest(SERVICE_PATH + "GetClientAddressByName/" + customer, "GET", true, "JSON", null, function (response) {
                if (response.status === 200) {

                    var res = JSON.parse(response.responseText);

                    DOM.customerName.value = res.ClientAddressName;
                    DOM.customerName.setAttribute('data-customer-address-id', res.ClientAddressId);
                }
            });

        }

        shared.hideLoader(DOM.loader);
    }

    function addNewClient(evt) {

        shared.showLoader(DOM.loader);

        var clientType = null;

        if (evt.currentTarget.name.toUpperCase() === "NEWCUSTOMER" || evt.currentTarget.name.toUpperCase() === "NEWCONSIGNEE") {
            if (DOM.typeOfSale.selectedIndex > 0) {
                if (DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].text.trim().toUpperCase() === "CASH") {
                    // Open local client modal popup
                    DOM.clientDetails.src = location.origin + '/POS/PopUps/LocalClient';
                    DOM.clientDetails.style = 'zoom:0.60; frameborder:0; height:650px; width:99.6%;';

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

        shared.hideLoader(DOM.loader);
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

        //shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/1', clientName, "ClientAddressName", "ClientAddressId", "Choose Consignee", function (response) {

        shared.sendRequest(SERVICE_PATH + "GetClientAddressByName/" + clientName, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    DOM.consigneeName.value = res.ClientAddressName;
                    DOM.consigneeName.setAttribute('data-consignee-address-id', res.ClientAddressId);
                    //shared.setSelectValue(DOM.consignee, clientName, null);
                    //shared.setSelect2ControlsText(DOM.consignee);                    
                }
            }
            else {
                swal("Error!!!", "Error in the application " + response.responseText, "error");
            }
        });
        
    });

    function addNewSalesBill() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);
        shared.clearTextAreas(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.clearInputs(DOM.salesBillItemsEditMode);
        shared.clearTextAreas(DOM.salesBillItemsEditMode);
        shared.clearSelect(DOM.salesBillItemsEditMode);
        shared.clearTables(DOM.salesBillItemsEditMode);

        shared.clearInputs(DOM.billChargesEditMode);
        shared.clearSelect(DOM.billChargesEditMode);
        shared.clearTables(DOM.billChargesEditMode);

        //DOM.salesBillList.tBodies[0].innerHTML = "";

        salesBills.length = 0;
        salesBillDeliveryDetails.length = 0;
        salesBillPaymentDetails.length = 0;
        salesBillChargesDetails.length = 0;
        salesBillItems.length = 0;
        salesBillItemsChargesDetails.length =0;
        GSTDetails.length = 0;

        shared.disableControls(DOM.editMode, false);
        shared.disableControls(DOM.billChargesEditMode, false);

        // Set default values
        DOM.billNo.setAttribute('data-sales-bill-id', parseInt(0));

        DOM.billNo.value = parseInt(0);

        DOM.billNo.disabled = true;

        var currentDate = new Date();

        DOM.billDate.value = moment(currentDate).format("DD/MMM/YYYY");

        shared.setSelectOptionByIndex(DOM.financialYear, 1);
        shared.setSelect2ControlsText(DOM.financialYear);

        shared.setSelectOptionByIndex(DOM.companyName, 2);
        shared.setSelect2ControlsText(DOM.companyName);

        getBranchName(1);

        //shared.setSelectOptionByIndex(DOM.branch, 1);
        //shared.setSelect2ControlsText(DOM.branch);

        shared.setSelectOptionByIndex(DOM.salesman, 0);
        shared.setSelect2ControlsText(DOM.salesman);

        shared.setSelectOptionByIndex(DOM.typeOfSale, 1);
        shared.setSelect2ControlsText(DOM.typeOfSale);

        shared.setSelectOptionByIndex(DOM.paymentSettlement, 1);
        shared.setSelect2ControlsText(DOM.paymentSettlement);

        shared.setSelectOptionByIndex(DOM.modeOfPayment, 1);
        shared.setSelect2ControlsText(DOM.modeOfPayment);

        showModeOfPayment("CASH");
        
        setDefaultCustomer();

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);
        shared.hidePanel(DOM.searchPanel);
        
        shared.showPanel(DOM.billChargesViewMode);
        shared.hidePanel(DOM.billChargesEditMode);

        shared.hideLoader(DOM.loader);

        DOM.scanBarcode.focus();
    }

    function refreshSalesBill() {
        getSalesBills();
    }

    var getSelectedRows = function (element) {

        var selectedRows = [];

        var tableBody = element.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length > 0) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                var checkBox = tableRows[tr].querySelectorAll('.label-checkbox')[0];

                if (checkBox.checked) {

                    selectedRows.push(tableRows[tr]);
                }
            }
        }

        return selectedRows;
    };
    
    function viewSalesBill() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);
        shared.clearInputs(DOM.editMode.children[0]);
        shared.clearTextAreas(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.clearInputs(DOM.salesBillItemsEditMode);
        shared.clearTextAreas(DOM.salesBillItemsEditMode);
        shared.clearSelect(DOM.salesBillItemsEditMode);
        shared.clearTables(DOM.salesBillItemsEditMode);

        shared.clearInputs(DOM.billChargesEditMode);
        shared.clearSelect(DOM.billChargesEditMode);
        shared.clearTables(DOM.billChargesEditMode);

        shared.disableControls(DOM.editMode, true);
        shared.disableControls(DOM.billChargesEditMode, true);

        var controls = [
            DOM.searchByFinancialYear,
            DOM.searchBySaleType,
            DOM.searchBySalesBillNo
        ];

        shared.disableSpecificControls(controls, false);
        
        //DOM.salesBillList.tBodies[0].innerHTML = "";

        salesBills.length = 0;
        salesBillDeliveryDetails.length = 0;
        salesBillPaymentDetails.length = 0;
        salesBillChargesDetails.length = 0;
        salesBillItems.length = 0;
        salesBillItemsChargesDetails.length =0;
        GSTDetails.length = 0;
        
        shared.showPanel(DOM.searchPanel);
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);
        shared.showPanel(DOM.billChargesViewMode);
        shared.hidePanel(DOM.billChargesEditMode);

        shared.hideLoader(DOM.loader);

        DOM.searchByFinancialYear.focus();
    }

    function editSalesBill() {

        shared.showLoader(DOM.loader);

        shared.disableControls(DOM.editMode, false);
        shared.disableControls(DOM.billChargesEditMode, false);

        shared.hidePanel(DOM.searchPanel);
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);
        shared.showPanel(DOM.billChargesViewMode);
        shared.hidePanel(DOM.billChargesEditMode);

        shared.hideLoader(DOM.loader);

        var isSalesBillDeleted = checkIsSalesBillDeleted();

        if (isSalesBillDeleted) {

            DOM.searchBySalesBillNo.focus();
            swal("Error", "This Bill can not be edited because it is deleted.", "error");
            return;

        }
                    
        DOM.searchByFinancialYear.focus();
    }
    //function viewSalesBill() {

    //    shared.showLoader(DOM.loader);

    //    try {

    //        shared.clearInputs(DOM.editMode);
    //        shared.clearSelect(DOM.editMode);
    //        shared.disableControls(DOM.editMode, true);

    //        var selectedRows = getSelectedRows(DOM.salesBillList);

    //        if (selectedRows.length > 0) {

    //            if (selectedRows.length > 1) {
    //                swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
    //                return false;
    //            }
    //            else {

    //                var currentTableRow = selectedRows[0];

    //                var salesBillId = parseInt(currentTableRow.getAttribute('data-sales-bill-id'));

    //                if (isNaN(salesBillId)) { salesBillId = 0; }

    //                DOM.salesBillId.value = salesBillId;

    //                showSalesBillDetails(salesBillId);
    //            }
    //        }
    //        else {
    //            swal("error", "No row selected.", "error");
    //        }
    //    }
    //    catch (e) {
    //        handleError(e.message);
    //    }
    //    finally {

    //        shared.hideLoader(DOM.loader);
    //    }
    //}

    //function editSalesBill() {

    //    shared.showLoader(DOM.loader);

    //    try {

    //        shared.clearInputs(DOM.editMode);
    //        shared.clearSelect(DOM.editMode);
    //        shared.disableControls(DOM.editMode, false);
    //        DOM.customerName.removeAttribute('data-customer-address-id');
    //        DOM.consigneeName.removeAttribute('data-consignee-address-id');
                    
    //        var controls = [
    //            DOM.financialYear
    //        ]

    //        shared.disableSpecificControls(controls, true);
            
    //        var selectedRows = getSelectedRows(DOM.salesBillList);

    //        if (selectedRows.length > 0) {

    //            if (selectedRows.length > 1) {
    //                swal('Warning', "Please select only one record to Edit the Records.", "warning");
    //                return false;
    //            }
    //            else {

    //                var currentTableRow = selectedRows[0];

    //                var salesBillId = parseInt(currentTableRow.getAttribute('data-sales-bill-id'));

    //                if (isNaN(salesBillId)) { salesBillId = 0; }

    //                DOM.salesBillId.value = salesBillId;

    //                showSalesBillDetails(salesBillId);
    //            }
    //        }
    //        else {
    //            swal("error", "No row selected.", "error");
    //        }
    //    }
    //    catch (e) {
    //        handleError(e.message);
    //    }
    //    finally {

    //        shared.hideLoader(DOM.loader);
    //    }

    //    // Focus
    //    DOM.billNo.focus();
    //}

    function deleteSaleBill() {

        shared.showLoader(DOM.loader);

        try {

            var isSalesBillDeleted = checkIsSalesBillDeleted();

            if (isSalesBillDeleted) {

                DOM.searchBySalesBillNo.focus();
                swal("Error", "This Bill can not be deleted because it is already deleted.", "error");
                return;

            }

            var salesBillid = parseInt(DOM.billNo.getAttribute('data-sales-bill-id'));
            
            if (salesBillid > 0) {

                swal({
                    title: "Are you sure",
                    text: "Are you sure you want to delete this record?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel pls",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                    function (isConfirm) {

                        if (isConfirm) {

                            if (salesBills !== undefined) {

                                var billItems = salesBills.SalesBillItems.filter(function (value, index, array) {
                                    return value.SalesBillId === salesBillid;
                                });

                                var billDeliveryDetails = salesBills.SalesBillDeliveryDetails.filter(function (value, index, array) {
                                    return value.SalesBillId === salesBillid;
                                });

                                var billPayments = salesBills.SalesBillPaymentDetails.filter(function (value, index, array) {
                                    return value.SalesBillId === salesBillid;
                                });

                                salesBills.IsDeleted = true;
                                salesBills.DeletedBy = parseInt(LOGGED_USER);
                                salesBills.DeletedByIP = IP_ADDRESS;

                                if (billItems.length) {

                                    for (var bi = 0; bi < billItems.length; bi++) {
                                        billItems[bi].IsDeleted = true;
                                        billItems[bi].DeletedBy = parseInt(LOGGED_USER);
                                        billItems[bi].DeletedByIP = IP_ADDRESS;
                                    }

                                    salesBills.SalesBillItems = billItems;
                                }

                                if (billDeliveryDetails.length) {

                                    billDeliveryDetails[0].IsDeleted = true;
                                    billDeliveryDetails[0].DeletedBy = parseInt(LOGGED_USER);
                                    billDeliveryDetails[0].DeletedByIP = IP_ADDRESS;

                                    salesBills.SalesBillDeliveryDetails = billDeliveryDetails;
                                }

                                if (billPayments.length) {
                                    billPayments[0].IsDeleted = true;
                                    billPayments[0].DeletedBy = parseInt(LOGGED_USER);
                                    billPayments[0].DeletedByIP = IP_ADDRESS;

                                    salesBills.SalesBillPaymentDetails = billPayments;
                                }
                            }
                        }

                        var postData = JSON.stringify(salesBills);

                        shared.sendRequest(SERVICE_PATH + 'SaveSalesBill', "POST", true, "JSON", postData, function (response) {

                            if (response.status === 200) {

                                if (parseInt(response.responseText) > 0) {

                                    //tableBody.removeChild(selectedRows[r]);

                                    swal({
                                        title: "Success",
                                        text: "Sales Bill Details Deleted successfully.",
                                        type: "success"
                                    }, function () {
                                        addNewSalesBill();
                                        //getSalesBills();
                                    });
                                }
                            }

                            shared.hideLoader(DOM.loader);

                        });
                    });
            }
            else {
                swal("error", "No row selected.", "error");
            }

        }
        catch (e) { 
            handleError(e.message);
        }
        finally {

            shared.hideLoader(DOM.loader);
        }
        
    }

    function showSalesBillDetails(salesBillId) {

        shared.showLoader(DOM.loader);

        if (salesBillId > 0) {

            // Check the sales bills list has values
            if (salesBills !== undefined) {

                var paymentDetails = salesBills.SalesBillPaymentDetails.filter(function (value, index, array) {
                    return value.SalesBillId === parseInt(salesBillId);
                });

                var deliveryDetails = salesBills.SalesBillDeliveryDetails.filter(function (value, index, array) {
                    return value.SalesBillId === parseInt(salesBillId);
                });

                DOM.billNo.value = salesBills.SalesBillNo;
                DOM.billNo.setAttribute('data-sales-bill-id', parseInt(salesBillId));
                DOM.billDate.value = salesBills.SalesBillDate;
                DOM.customerName.value = salesBills.CustomerName;
                DOM.customerName.setAttribute('data-customer-address-id', parseInt(salesBills.CustomerId));
                DOM.consigneeName.value = salesBills.ConsigneeName;
                DOM.consigneeName.setAttribute('data-consignee-address-id', parseInt(salesBills.ConsigneeId));
                shared.setSelectValue(DOM.companyName, null, parseInt(salesBills.CompanyId));
                shared.setSelect2ControlsText(DOM.companyName);
                getBranchName(parseInt(salesBills.BranchId));
                shared.setSelectValue(DOM.branch, null, parseInt(salesBills.BranchId));
                shared.setSelect2ControlsText(DOM.branch);
                shared.setSelectValue(DOM.financialYear, null, parseInt(salesBills.WorkingPeriodId));
                shared.setSelect2ControlsText(DOM.financialYear);
                shared.setSelectValue(DOM.typeOfSale, null, parseInt(salesBills.SaleTypeId));
                shared.setSelect2ControlsText(DOM.typeOfSale);
                shared.setSelectValue(DOM.salesman, null, parseInt(salesBills.SalesmanId));
                shared.setSelect2ControlsText(DOM.salesman);
                if (salesBills.IsTaxInclusive) {
                    DOM.taxInclusive.checked = true; 
                    DOM.taxExclusive.checked = false;
                } else {
                    DOM.taxInclusive.checked = false;
                    DOM.taxExclusive.checked = true;
                }
                //shared.setSelectValue(DOM.modeOfPayment, null, parseInt(cas))

                bindSalesBillItems(salesBillId);

            }

            if (paymentDetails.length) {

                DOM.salesBillPaymentId.value = paymentDetails[0].SalesBillPaymentId;
                shared.setSelectValue(DOM.modeOfPayment, null, parseInt(paymentDetails[0].ModeOfPaymentId));
                shared.setSelect2ControlsText(DOM.modeOfPayment);
                shared.setSelectValue(DOM.paymentSettlement, null, parseInt(paymentDetails[0].PaymentSettlementId));
                shared.setSelect2ControlsText(DOM.paymentSettlement);
                DOM.cashAmount.value = paymentDetails[0].CashAmount;
                DOM.creditCardNo.value = paymentDetails[0].CreditCardNo;
                DOM.creditCardAmount.value = paymentDetails[0].CreditCardAmount;
                DOM.chequeNo.value = paymentDetails[0].ChequeNo;
                DOM.chequeDate.value = paymentDetails[0].ChequeDate;
                DOM.chequeDrawnOn.value = paymentDetails[0].ChequeDrawnOn;
                DOM.chequeAmount.value = paymentDetails[0].ChequeAmount;
                DOM.netBankingReferenceNo.value = paymentDetails[0].NetBankingReferenceNo;
                DOM.netBankingAmount.value = paymentDetails[0].NetBankingAmount;
                DOM.paymentRemarks.value = paymentDetails[0].Remarks;

                if (paymentDetails[0].ModeOfPaymentId === parseInt(1)) {
                    showPaymentOption(DOM.cashMode);
                }
            }

            if (deliveryDetails.length) {
                DOM.salesBillDeliveryId.value = deliveryDetails[0].SalesBillDeliveryId;
                shared.setSelectValue(DOM.transporter, null, parseInt(deliveryDetails[0].TransporterId));
                shared.setSelect2ControlsText(DOM.transporter);
                DOM.deliveryTo.value = deliveryDetails[0].DeliveryTo;
                DOM.deliveryAddress.value = deliveryDetails[0].DeliveryAddress;
                DOM.lrNo.value = deliveryDetails[0].LRNo;
                DOM.lrDate.value = deliveryDetails[0].LRDate;
                DOM.deliveryDate.value = deliveryDetails[0].DeliveryDate;
                if (deliveryDetails[0].IsDeliveryPending) {
                    DOM.deliveryPendingYes.checked = true;
                }
                else {
                    DOM.deliveryPendingNo.checked = true;
                }
                //shared.setRadioButtonValue(DOM.isDeliveryPending, null, parseInt(deliveryDetails[0].IsDeliveryPending));
                //shared.setSelect2ControlsText(DOM.IsDeliveryPending);                    
                DOM.deliveryRemarks.value = deliveryDetails[0].Remarks;
            }

            // Show panels
            shared.showPanel(DOM.editMode);
            shared.hidePanel(DOM.viewMode);

        }

        shared.hideLoader(DOM.loader);
    }

    //function showSalesBillDetails(salesBillId) {

    //    shared.showLoader(DOM.loader);

    //    if (salesBillId > 0) {

    //        // Check the sales salesBills list has values
    //        if (salesBills.length > 0) {

    //            var bills = salesBills.filter(function (value, index, array) {
    //                return value.SalesBillId === parseInt(salesBillId);
    //            });

    //            var paymentDetails = salesBillPaymentDetails.filter(function (value, index, array) {
    //                return value.SalesBillId === parseInt(salesBillId);
    //            });

    //            var deliveryDetails = salesBillDeliveryDetails.filter(function (value, index, array) {
    //                return value.SalesBillId === parseInt(salesBillId);
    //            });
                
    //            if (bills.length > 0) {

    //                DOM.billNo.value = bills[0].SalesBillNo;
    //                DOM.billNo.setAttribute('data-sales-bill-id', parseInt(salesBillId));
    //                DOM.billDate.value = bills[0].SalesBillDate;
    //                DOM.customerName.value = bills[0].CustomerName;
    //                DOM.customerName.setAttribute('data-customer-address-id', parseInt(bills[0].CustomerId));
    //                DOM.consigneeName.value = bills[0].ConsigneeName;
    //                DOM.consigneeName.setAttribute('data-consignee-address-id', parseInt(bills[0].ConsigneeId));
    //                shared.setSelectValue(DOM.companyName, null, parseInt(bills[0].CompanyId));
    //                shared.setSelect2ControlsText(DOM.companyName);
    //                getBranchName(parseInt(bills[0].BranchId));
    //                shared.setSelectValue(DOM.branch, null, parseInt(bills[0].BranchId));
    //                shared.setSelect2ControlsText(DOM.branch);
    //                shared.setSelectValue(DOM.financialYear, null, parseInt(bills[0].WorkingPeriodId));
    //                shared.setSelect2ControlsText(DOM.financialYear);
    //                shared.setSelectValue(DOM.typeOfSale, null, parseInt(bills[0].SaleTypeId));
    //                shared.setSelect2ControlsText(DOM.typeOfSale);
    //                shared.setSelectValue(DOM.salesman, null, parseInt(bills[0].SalesmanId));
    //                shared.setSelect2ControlsText(DOM.salesman);
    //                shared.setRadioButtonValue(DOM.isTaxInclusive, null, parseInt(bills[0].IsTaxInclusive));
    //                shared.setSelect2ControlsText(DOM.isTaxInclusive);
    //                //shared.setSelectValue(DOM.modeOfPayment, null, parseInt(cas))

    //                bindSalesBillItems(salesBillId);

    //            }

    //            if (paymentDetails.length) {

    //                DOM.salesBillPaymentId.value = paymentDetails[0].SalesBillPaymentId;
    //                shared.setSelectValue(DOM.modeOfPayment, null, parseInt(paymentDetails[0].ModeOfPaymentId));
    //                shared.setSelect2ControlsText(DOM.modeOfPayment);
    //                shared.setSelectValue(DOM.paymentSettlement, null, parseInt(paymentDetails[0].PaymentSettlementId));
    //                shared.setSelect2ControlsText(DOM.paymentSettlement);
    //                DOM.cashAmount.value = paymentDetails[0].CashAmount;
    //                DOM.creditCardNo.value = paymentDetails[0].CreditCardNo;
    //                DOM.creditCardAmount.value = paymentDetails[0].CreditCardAmount;
    //                DOM.chequeNo.value = paymentDetails[0].ChequeNo;
    //                DOM.chequeDate.value = paymentDetails[0].ChequeDate;
    //                DOM.chequeDrawnOn.value = paymentDetails[0].ChequeDrawnOn;
    //                DOM.chequeAmount.value = paymentDetails[0].ChequeAmount;
    //                DOM.netBankingReferenceNo.value = paymentDetails[0].NetBankingReferenceNo;
    //                DOM.netBankingAmount.value = paymentDetails[0].NetBankingAmount;
    //                DOM.paymentRemarks.value = paymentDetails[0].Remarks;

    //                if (paymentDetails[0].ModeOfPaymentId === parseInt(1)) {
    //                    showPaymentOption(DOM.cashMode);
    //                }
    //            }

    //            if (deliveryDetails.length) {
    //                DOM.salesBillDeliveryId.value = deliveryDetails[0].SalesBillDeliveryId;
    //                shared.setSelectValue(DOM.transporter, null, parseInt(deliveryDetails[0].TransporterId));
    //                shared.setSelect2ControlsText(DOM.transporter);
    //                DOM.deliveryTo.value = deliveryDetails[0].DeliveryTo;
    //                DOM.deliveryAddress.value = deliveryDetails[0].DeliveryAddress;
    //                DOM.lrNo.value = deliveryDetails[0].LRNo;
    //                DOM.lrDate.value = deliveryDetails[0].LRDate;
    //                DOM.deliveryDate.value = deliveryDetails[0].DeliveryDate;
    //                if (deliveryDetails[0].IsDeliveryPending) {
    //                    DOM.deliveryPendingYes.checked = true;
    //                }
    //                else {
    //                    DOM.deliveryPendingNo.checked = true;
    //                }
    //                //shared.setRadioButtonValue(DOM.isDeliveryPending, null, parseInt(deliveryDetails[0].IsDeliveryPending));
    //                //shared.setSelect2ControlsText(DOM.IsDeliveryPending);                    
    //                DOM.deliveryRemarks.value = deliveryDetails[0].Remarks;
    //            }

    //            // Show panels
    //            shared.showPanel(DOM.editMode);
    //            shared.hidePanel(DOM.viewMode);

    //        }
    //    }

    //    shared.hideLoader(DOM.loader);
    //}

    function getSalesBills() {

        return false;

        //shared.showLoader(DOM.loader);

        //var saleTypeId = parseInt(1);
        //var workingPeriodId = parseInt(1);
        //var branchId = parseInt(1);

        //if (DOM.financialYear.selectedIndex > 0) {
        //    workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);            
        //}

        //if (DOM.branch.selectedIndex > 0) {
        //    branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
        //}

        //if (workingPeriodId === 0 && branchId === 0) {

        //    createNewSalesBill();

        //    return;
        //}
        
        //salesBills.length = 0;
        //salesBillDeliveryDetails.length = 0;
        //salesBillPaymentDetails.length = 0;
        //salesBillChargesDetails.length = 0;

        //salesBillItems.length = 0;
        //salesBillItemsChargesDetails.length = 0;

        //DOM.salesBillList.tBodies[0].innerHTML = "";
        
        //shared.sendRequest(SERVICE_PATH + "GetSalesBillsBySaleType/" + branchId + '/' + workingPeriodId + '/' + saleTypeId, "GET", true, "JSON", null, function (response) {

        //    if (response.status === 200) {

        //        shared.showLoader(DOM.loader);

        //        if (response.responseText !== undefined) {

        //            var res = JSON.parse(response.responseText);

        //            if (res !== undefined) {

        //                if (res.length > 0) {

        //                    for (var r = 0; r < res.length; r++) {

        //                        var billItems = res[r].SalesBillItems;
        //                        var paymentDetails = res[r].SalesBillPaymentDetails;
        //                        var deliveryDetails = res[r].SalesBillDeliveryDetails;
                                
        //                        var salesBill = {};

        //                        salesBill = {
        //                            SalesBillId: res[r].SalesBillId,
        //                            SalesBillNo: res[r].SalesBillNo,
        //                            SalesBillDate: res[r].SalesBillDate,
        //                            CustomerId: res[r].CustomerId,
        //                            CustomerName: res[r].CustomerName,
        //                            ConsigneeId: res[r].ConsigneeId,
        //                            ConsigneeName: res[r].ConsigneeName,
        //                            SalesmanId: res[r].SalesmanId,
        //                            SalesmanName: res[r].SalesmanName,
        //                            SaleTypeId: res[r].SaleTypeId,
        //                            TotalSaleQty: res[r].TotalSaleQty,
        //                            TotalSaleAmount: res[r].TotalSaleAmount,
        //                            GSTApplicable: res[r].GSTApplicable,
        //                            IsTaxInclusive: res[r].IsTaxInclusive,
        //                            CompanyId: res[r].CompanyId,
        //                            CompanyName: res[r].CompanyName,
        //                            BranchId: res[r].BranchId,
        //                            BranchName: res[r].BranchName,
        //                            GSTApplicable: res[r].GSTApplicable,
        //                            WorkingPeriodId: res[r].WorkingPeriodId,
        //                            FinancialYear: res[r].FinancialYear,
        //                            TotalCashSaleQty: res[r].TotalCashSaleQty,
        //                            TotalCashSaleAmount: res[r].TotalCashSaleAmount,
        //                            IsDeleted: false
        //                        };

        //                        salesBills.push(salesBill);

        //                        if (billItems.length > 0) {

        //                            for (var s = 0; s < billItems.length; s++) {

        //                                var salesBillItem = {};

        //                                salesBillItem = {
        //                                    SalesBillItemId: billItems[s].SalesBillItemId,
        //                                    GoodsReceiptItemId: billItems[s].GoodsReceiptItemId,
        //                                    SalesBillId: billItems[s].SalesBillId,
        //                                    ItemId: billItems[s].ItemId,
        //                                    ItemName: billItems[s].ItemName,
        //                                    UnitOfMeasurementId: billItems[s].UnitOfMeasurementId,
        //                                    UnitCode: billItems[s].UnitCode,
        //                                    HSNCode: billItems[s].HSNCode,
        //                                    SaleQty: billItems[s].SaleQty,
        //                                    SaleRate: billItems[s].SaleRate,
        //                                    Amount: billItems[s].Amount,
        //                                    TypeOfDiscount: billItems[s].TypeOfDiscount,
        //                                    CashDiscountPercent: billItems[s].CashDiscountPercent,
        //                                    DiscountAmount: billItems[s].DiscountAmount,
        //                                    TotalAmountAfterDiscount: billItems[s].TotalAmountAfterDiscount,
        //                                    TaxableValue: billItems[s].TaxableValue,
        //                                    TaxId: billItems[s].TaxId,
        //                                    GSTRateId: billItems[s].GSTRateId,                                            
        //                                    GSTRate: billItems[s].GSTRate,
        //                                    GSTName: billItems[s].GSTName,
        //                                    GSTAmount: billItems[s].GSTAmount,
        //                                    TotalItemAmount: billItems[s].TotalItemAmount,
        //                                    SrNo: billItems[s].SrNo,
        //                                    IsDeleted: false
        //                                };

        //                                salesBillItems.push(salesBillItem);
        //                            }
        //                        }

        //                        if (paymentDetails.length) {
        //                            for (var p = 0; p < paymentDetails.length; p++) {
        //                                var payment = {};

        //                                payment = {
        //                                    SalesBillPaymentId: paymentDetails[p].SalesBillPaymentId,
        //                                    SalesBillId: paymentDetails[p].SalesBillId,
        //                                    PaymentSettlementId: paymentDetails[p].PaymentSettlementId,
        //                                    ModeOfPaymentId: paymentDetails[p].ModeOfPaymentId,
        //                                    CashAmount: paymentDetails[p].CashAmount,
        //                                    CreditCardNo: paymentDetails[p].CreditCardNo,
        //                                    CreditCardAmount: paymentDetails[p].CreditCardAmount,
        //                                    ChequeNo: paymentDetails[p].ChequeNo,
        //                                    ChequeDate: paymentDetails[p].ChequeDate,
        //                                    ChequeDrawnOn: paymentDetails[p].ChequeDrawnOn,
        //                                    ChequeAmount: paymentDetails[p].ChequeAmount,
        //                                    NetBankingReferenceNo: paymentDetails[p].NetBankingReferenceNo,
        //                                    NetBankingAmount: paymentDetails[p].NetBankingAmount,
        //                                    Remarks: paymentDetails[p].Remarks,
        //                                    guid: paymentDetails[p].guid
        //                                };

        //                                salesBillPaymentDetails.push(payment);
        //                            }
        //                        }

        //                        if (deliveryDetails.length) {
        //                            for (var d = 0; d < deliveryDetails.length; d++) {
        //                                var delivery = {};

        //                                delivery = {
        //                                    SalesBillDeliveryId: deliveryDetails[d].SalesBillDeliveryId,
        //                                    SalesBillId: deliveryDetails[d].SalesBillId,
        //                                    DeliveryTo: deliveryDetails[d].DeliveryTo,
        //                                    DeliveryAddress: deliveryDetails[d].DeliveryAddress,
        //                                    TransporterId: deliveryDetails[d].TransporterId,
        //                                    LRNo: deliveryDetails[d].LRNo,
        //                                    LRDate: deliveryDetails[d].LRDate,
        //                                    DeliveryDate: deliveryDetails[d].DeliveryDate,
        //                                    IsDeliveryPending: deliveryDetails[d].IsDeliveryPending,
        //                                    Remarks: deliveryDetails[d].Remarks,
        //                                    guid: deliveryDetails[d].guid
        //                                };

        //                                salesBillDeliveryDetails.push(delivery);
        //                            }
        //                        }
        //                    }

        //                    bindSalesBills();

        //                }
        //                else {
        //                    shared.showPanel(DOM.editMode);
        //                    shared.hidePanel(DOM.viewMode);
        //                }
        //            }
        //        }
        //        shared.hideLoader(DOM.loader);
        //    }
        //});

        
    }

    function bindSalesBills() {

        shared.showLoader(DOM.loader);

        var tableBody = DOM.salesBillList.tBodies[0];

        tableBody.innerHTML = "";

        if (salesBills.length) {

            var data = "";

            for (var r = 0; r < salesBills.length; r++) {

                data = data + "<tr data-sales-bill-id=" + salesBills[r].SalesBillId + ">";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + salesBills[r].SalesBillId + "' class='label-checkbox' name='SelectSalesBill' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + salesBills[r].CompanyName + "</td>";
                data = data + "<td>" + salesBills[r].BranchName + "</td>";
                data = data + "<td>" + salesBills[r].SalesBillNo + "</td>";                
                data = data + "<td>" + salesBills[r].SalesBillDate + "</td>";
                data = data + "<td>" + salesBills[r].CustomerName + "</td>";
                data = data + "<td>" + salesBills[r].ConsigneeName + "</td>";
                data = data + "<td>" + salesBills[r].TotalSaleQty + "</td>";
                data = data + "<td>" + salesBills[r].TotalSaleAmount + "</td>";
                data = data + "<td>" + salesBills[r].FinancialYear + "</td>";
                            
            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }

        shared.hideLoader(DOM.loader);
    }

    function saveSalesBill() {

        shared.showLoader(DOM.loader);

         var isSalesBillDeleted = checkIsSalesBillDeleted();

        if (isSalesBillDeleted) {

            shared.hideLoader(DOM.loader);
            DOM.searchBySalesBillNo.focus();
            swal("Error", "This Bill can not be saved because it is deleted.", "error");
            return;

        }

        checkBillNoIsExists(function (response) {

            if (response === true) {
                DOM.billNo.focus();
                shared.hideLoader(DOM.loader);
                swal("Warning", "This Bill No. is already exists.", "warning");
                return false;
            }
            else {

                if (validateSalesBill() === false) {
                    shared.hideLoader(DOM.loader);
                    return;
                }

                // Clearing the Sales Bill and other arrays
                salesBills.length = 0;
                salesBillItems.length = 0;
                salesBillDeliveryDetails.length = 0;
                salesBillPaymentDetails.length = 0;
                //salesBillChargesDetails.length = 0;

                var workingPeriodId = parseInt(0);
                var companyId = parseInt(0);
                var branchId = parseInt(0);
                var billingLocationId = parseInt(0);
                var typeOfSaleId = parseInt(0);
                var typeOfSale = null;
                var salesBillId = parseInt(0);
                var salesBillNo = parseInt(0);
                var salesBillDate = null;
                var salesmanId = parseInt(0);
                var isTaxInclusive = true;
                var customerId = parseInt(0);
                var consigneeId = parseInt(0);
                var billRemarks = null;
                var salesBillDeliveryId = parseInt(0);
                var deliveryTo = null;
                var deliveryAddress = null;
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
                var cashAmount = parseFloat(0);
                var creditCardNo = null;
                var creditCardAmount = parseFloat(0);
                var chequeNo = null;
                var chequeDate = null;
                var chequeDrawnOn = null;
                var chequeAmount = parseFloat(0);
                var netBankingReferenceNo = null;
                var netBankingAmount = parseFloat(0);
                var paymentRemarks = null;

                saveSalesBillItem();

                if (salesBillItems.length === 0) {
                    swal("Warning", "Bill Items Not added. Unable to save the records.", "warning");
                    shared.hideLoader(DOM.loader);
                    return;
                }

                workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);
                companyId = parseInt(DOM.companyName.options[DOM.companyName.selectedIndex].value);
                branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
                billingLocationId = parseInt(0);
                typeOfSaleId = parseInt(DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].value);
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
                //isTaxInclusive = shared.isRadioButtonValueSelected(DOM.isTaxInclusive);
                customerId = parseInt(DOM.customerName.getAttribute('data-customer-address-id'));
                consigneeId = parseInt(DOM.consigneeName.getAttribute('data-consignee-address-id'));
                billRemarks = null;
                //if (DOM.billRemarks.value !== "") {
                //    billRemarks = DOM.billRemarks.value;
                //}
                transporterId = parseInt(DOM.transporter.options[DOM.transporter.selectedIndex].value);
                salesBillDeliveryId = parseInt(DOM.salesBillDeliveryId.value);
                deliveryTo = DOM.deliveryTo.value;
                deliveryAddress = DOM.deliveryAddress.value;
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

                salesBillPaymentId = parseInt(DOM.salesBillPaymentId.value);
                paymentSettlementId = parseInt(DOM.paymentSettlement.options[DOM.paymentSettlement.selectedIndex].value);
                paymentSettlement = DOM.paymentSettlement.options[DOM.paymentSettlement.selectedIndex].text;
                modeOfPaymentId = parseInt(DOM.modeOfPayment.options[DOM.modeOfPayment.selectedIndex].value);
                modeOfPayment = DOM.modeOfPayment.options[DOM.modeOfPayment.selectedIndex].text;
                cashAmount = parseFloat(parseFloat(DOM.cashAmount.value).toFixed(2));
                creditCardNo = DOM.creditCardNo.value;
                creditCardAmount = parseFloat(parseFloat(DOM.creditCardAmount.value).toFixed(2));
                chequeNo = DOM.chequeNo.value;
                chequeDate = DOM.chequeDate.value;
                chequeDrawnOn = DOM.chequeDrawnOn.value;
                chequeAmount = parseFloat(parseFloat(DOM.chequeAmount.value).toFixed(2));
                netBankingReferenceNo = DOM.netBankingReferenceNo.value;
                netBankingAmount = parseFloat(parseFloat(DOM.netBankingAmount.value).toFixed(2));
                if (DOM.paymentRemarks.value !== "") {
                    paymentRemarks = DOM.paymentRemarks.value;
                }

                if (salesBillId === null) { salesBillId = parseInt(0); }

                if (isNaN(salesBillId)) { salesBillId = parseInt(0); }

                if (isNaN(salesBillNo)) { salesBillNo = parseInt(0); }

                if (isNaN(salesBillPaymentId)) { salesBillPaymentId = parseInt(0); }
                if (isNaN(salesBillDeliveryId)) { salesBillDeliveryId = parseInt(0); }
                if (isNaN(cashAmount)) { cashAmount = parseFloat(0); }
                if (isNaN(creditCardAmount)) { creditCardAmount = parseFloat(0); }
                if (isNaN(chequeAmount)) { chequeAmount = parseFloat(0); }
                if (isNaN(netBankingAmount)) { netBankingAmount = parseFloat(0); }

                // Store sales bill delivery details
                var billDeliveryDetails = {};

                if (lrNo !== "") {

                    billDeliveryDetails = {
                        SalesBillDeliveryId: salesBillDeliveryId,
                        SalesBillId: salesBillId,
                        DeliveryTo: deliveryTo,
                        DeliveryAddress: deliveryAddress,
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

                    if (salesBillDeliveryId > 0) {
                        billDeliveryDetails.ModifiedBy = parseInt(LOGGED_USER);
                        billDeliveryDetails.ModifiedByIP = IP_ADDRESS;
                    }

                    salesBillDeliveryDetails.push(billDeliveryDetails);
                }


                // Store sales bill payment details

                var billPaymentDetails = {};

                billPaymentDetails = {
                    SalesBillPaymentId: salesBillPaymentId,
                    SalesBillId: salesBillId,
                    PaymentSettlementId: paymentSettlementId,
                    ModeOfPaymentId: modeOfPaymentId,
                    CashAmount: cashAmount,
                    CreditCardNo: creditCardNo,
                    CreditCardAmount: creditCardAmount,
                    ChequeNo: chequeNo,
                    ChequeDate: chequeDate,
                    ChequeDrawnOn: chequeDrawnOn,
                    ChequeAmount: chequeAmount,
                    NetBankingReferenceNo: netBankingReferenceNo,
                    NetBankingAmount: netBankingAmount,
                    Remarks: paymentRemarks,
                    IsDeleted: false,
                    CreatedBy: parseInt(LOGGED_USER),
                    CreatedByIP: IP_ADDRESS
                };

                if (salesBillPaymentId > 0) {
                    billPaymentDetails.ModifiedBy = parseInt(LOGGED_USER);
                    billPaymentDetails.ModifiedByIP = IP_ADDRESS;
                }

                salesBillPaymentDetails.push(billPaymentDetails);

                var salesBill = {};

                salesBill = {
                    SalesBillId: salesBillId,
                    SalesOrderId: parseInt(0),
                    SalesBillNo: salesBillNo,
                    SalesBillDate: salesBillDate,
                    CustomerId: customerId,
                    ConsigneeId: consigneeId,
                    SalesmanId: salesmanId,
                    SaleTypeId: typeOfSaleId,
                    GSTApplicable: gstApplicable,
                    IsTaxInclusive: isTaxInclusive,
                    BranchId: branchId,
                    WorkingPeriodId: workingPeriodId,
                    Remarks: billRemarks,
                    SalesBillDeliveryDetails: salesBillDeliveryDetails,
                    SalesBillPaymentDetails: salesBillPaymentDetails,
                    SalesBillChargesDetails: salesBillChargesDetails,
                    SalesBillItems: salesBillItems,
                    IsDeleted: false
                };

                if (parseInt(salesBillId) === parseInt(0)) {

                    salesBill.CreatedBy = LOGGED_USER;
                    salesBill.CreatedByIP = IP_ADDRESS;
                }
                else {
                    salesBill.ModifiedBy = LOGGED_USER;
                    salesBill.ModifiedByIP = IP_ADDRESS;
                }

                var postData = JSON.stringify(salesBill);

                shared.sendRequest(SERVICE_PATH + "SaveSalesBill", "POST", true, "JSON", postData, function (response) {

                    shared.showLoader(DOM.loader);

                    var _response = JSON.parse(response.responseText);

                    if (response.status === 200) {

                        if (parseInt(response.responseText) > parseInt(0)) {
                            swal({
                                title: "Success",
                                text: "Sales Bill saved successfully.",
                                type: "success"
                            }, function () {
                                addNewSalesBill();
                                //getSalesBills();
                            });
                        }
                    }
                    else {
                        swal("error", "Unable to save the Cash Sales Details due to some error.", "error");
                        handleError(_response.Message + " " + _response.ExceptionMessage);
                        salesBills.length = 0;
                        salesBillItems.length = 0;
                        salesBillDeliveryDetails.length = 0;
                        salesBillPaymentDetails.length = 0;
                    }

                    shared.hideLoader(DOM.loader);
                });

            }
        });

    }

    function cancelSalesBill() {

        var selectedRows = getSelectedRows(DOM.salesBillList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var salesBillId = parseInt(currentTableRow.getAttribute('data-sales-bill-id'));

                    if (isNaN(salesBillId)) { salesBillId = 0; }

                    DOM.salesBillId.value = salesBillId;

                    var cancelSalesBill = [];

                    var salesBill = {};

                    salesBill = {
                        SalesBillId: salesBillId,
                        CancelledBy: LOGGED_USER
                    };

                    cancelSalesBill.push(salesBill);

                    var postData = JSON.stringify(cancelSalesBill);

                    shared.sendRequest(SERVICE_PATH + "CancelSalesBill", "POST", true, "JSON", postData, function (response) {

                        shared.showLoader(DOM.loader);

                        var res = JSON.parse(response.responseText);

                        if (res.status === 200) {

                            if (parseInt(res.responseText) > parseInt(0)) {
                                swal({
                                    title: "Success",
                                    text: "Sales Bill cancelled successfully.",
                                    type: "success"
                                }, function () {
                                    //getSalesBills();
                                });
                            }
                        }
                        else {
                            swal("error", "Unable to cancel the Sales Bill due to some error.", "error");
                            handleError(res.Message + " " + res.ExceptionMessage);                            
                        }

                        shared.hideLoader(DOM.loader);
                    });

                }
            }
            else {
                swal("error", "No row selected.", "error");
            }
            
    }

    function printSalesBill() {

        shared.showLoader(DOM.loader);

        var print = {};

        var salesBillId = parseInt(DOM.billNo.getAttribute('data-sales-bill-id'));
        var salesBillNo = parseInt(DOM.billNo.value);
        var branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
        var saleTypeId = parseInt(DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].value);
        var folderName = 'CashSalesBills';

        if (saleTypeId === 1) {
            folderName = 'CashSalesBills';
        }
        else {
            folderName = 'CreditSalesBills';
        }

        print = {
            SalesBillId: salesBillId,
            SalesBillNo: salesBillNo,
            BranchId: branchId,
            SaleTypeId: saleTypeId            
        };

        var postData = JSON.stringify(print);

        shared.sendRequest(SERVICE_PATH + "PrintCashSaleInvoice", "POST", true, "JSON", postData, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            window.open(location.origin + "/POS/ApplicationFiles/Sales/Bills/" + branchId + '/' + folderName + "/BillNo_" + salesBillNo + ".pdf", "_blank");

                        }
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });
    }

    //function addNewSalesBillItem() {
        
    //    shared.clearInputs(DOM.salesBillItemsEditMode);

    //    DOM.qtyInPcqtyInPcs.value = parseFloat(0);
    //    DOM.qtyInMtrs.value = parseFloat(0);
    //    DOM.saleRate.value = parseFloat(0);
    //    DOM.amount.value = parseFloat(0);
    //    DOM.cashDiscountPercent.value = parseFloat(0);
    //    DOM.rateDifference.value = parseFloat(0);
    //    DOM.taxableValue.value = parseFloat(0);
    //    DOM.gstRate.value = parseFloat(0);
    //    DOM.gstAmount.value = parseFloat(0);
    //    DOM.totalItemAmount.value = parseFloat(0);
    //    DOM.srNo.value = parseInt(0);
    //    DOM.salesBillItemId.value = parseInt(0);

    //    DOM.cashDiscountPercent.disabled = true;
    //    DOM.cashDiscountAmt.disabled = true;
    //    DOM.rateDifference.disabled = true;

    //    //DOM.hiddenSalesOrderItemId.setAttribute('data-sales-order-item-id', parseInt(0));

    //    //show panel
    //    shared.showPanel(DOM.salesBillItemsEditMode);
    //    shared.hidePanel(DOM.salesBillItemsViewMode);

    //    // Focus on control
    //    DOM.barcode.focus();

    //    //set focus
    //    ///setFocus();
    //}

    function backToSalesBillItemsList() {

        //show hide panel
        shared.showPanel(DOM.salesBillItemsViewMode);
        shared.hidePanel(DOM.salesBillItemsEditMode);

        //DOM.$cashSalesItemModal.modal('hide');
    }

    function bindSalesBillItems(salesBillId) {

        var table = DOM.salesBillItemsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (isNaN(salesBillId)) { salesBillId = parseInt(0); }

        if (salesBills.SalesBillItems.length) {

            var billItems = salesBills.SalesBillItems;

            for (var i = 0; i < billItems.length; i++) {

                var response = {};

                response = {
                    SalesBillItemId: billItems[i].SalesBillItemId,
                    GoodsReceiptItemId: billItems[i].GoodsReceiptItemId,
                    ItemId: billItems[i].ItemId,
                    ItemName: billItems[i].ItemName,
                    UnitOfMeasurementId: billItems[i].UnitOfMeasurementId,
                    UnitCode: billItems[i].UnitCode,
                    HSNCode: billItems[i].HSNCode,
                    SaleQty: billItems[i].SaleQty,
                    SaleRate: billItems[i].SaleRate,
                    SalesSchemes: billItems[i].SalesSchemes,
                    TypeOfDiscount: billItems[i].TypeOfDiscount,
                    CashDiscountPercent: billItems[i].CashDiscountPercent,
                    TaxableValue: billItems[i].TaxableValue,
                    TaxId: billItems[i].TaxId,
                    GSTRateId: billItems[i].GSTRateId,
                    GSTRate: billItems[i].GSTRate,
                    GSTAmount: billItems[i].GSTAmount,
                    TotalItemAmount: billItems[i].TotalItemAmount
                };

              
                bindBarcodeItem(response);
            }

            showGSTBreakup();

            showTotalBillAmount();
        }
    }
    //function bindSalesBillItems(salesBillId) {

    //    var table = DOM.salesBillItemsList;

    //    var tableBody = table.tBodies[0];

    //    tableBody.innerHTML = "";

    //    if (isNaN(salesBillId)) { salesBillId = parseInt(0); }

    //    if (salesBillItems.length > 0) {

    //        var billItems = salesBillItems.filter(function (value, index, array) {
    //            return value.SalesBillId === salesBillId && value.IsDeleted === false;
    //        });

    //        var itemsCount = billItems.length;

    //        if (itemsCount > 0) {

    //            for (var i = 0; i < itemsCount; i++) {

    //                var response = {};

    //                response = {
    //                    SalesBillItemId: billItems[i].SalesBillItemId,
    //                    GoodsReceiptItemId: billItems[i].GoodsReceiptItemId,
    //                    ItemId: billItems[i].ItemId,
    //                    ItemName: billItems[i].ItemName,
    //                    UnitOfMeasurementId: billItems[i].UnitOfMeasurementId,
    //                    UnitCode: billItems[i].UnitCode,
    //                    HSNCode: billItems[i].HSNCode,
    //                    SaleQty: billItems[i].SaleQty,
    //                    SaleRate: billItems[i].SaleRate,
    //                    TypeOfDiscount: billItems[i].TypeOfDiscount,
    //                    CashDiscountPercent: billItems[i].CashDiscountPercent,
    //                    TotalItemAmount: billItems[i].TotalItemAmount,
    //                    GSTRateId: billItems[i].GSTRateId,
    //                    TaxId: billItems[i].TaxId,
    //                    GSTRate: billItems[i].GSTRate,
    //                    TaxableValue: billItems[i].TaxableValue
    //                }

    //                bindBarcodeItem(response);
    //            }

    //            showGSTBreakup();
    //            showTotalBillAmount();
    //        }
    //    }
    //}

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

        shared.sendRequest(SERVICE_PATH + 'SaveSalesBill', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function saveSalesBillItem() {

        if (validateSalesBillItem() === true) {

            var salesBillItemId = parseInt(0);
            var salesBillId = parseInt(0);
            var goodsReceiptItemId = parseInt(0);
            var itemId = parseInt(0);
            var itemName = null;
            var unitOfMeasurementId = parseInt(0);
            var unitCode = null;
            var saleQty = parseFloat(0);
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
            var taxableValue = parseFloat(0);
            var gstRate = parseFloat(0);
            var gstAmount = parseFloat(0);
            var totalItemAmount = parseFloat(0);
            var taxId = parseInt(0);
            var gstRateId = parseInt(0);
            var srNo = parseInt(0);
            var salesSchemeId = 0;
            var schemeDiscountPercent = 0;
            var schemeDiscountAmount = 0;

            salesBillId = parseInt(DOM.billNo.getAttribute('data-sales-bill-id'));

            var tableBody = DOM.salesBillItemsList.tBodies[0];

            var tableRows = tableBody.children;

            if (tableRows.length) {

                for (var tr = 0; tr < tableRows.length; tr++) {

                    salesBillItemId = parseInt(tableRows[tr].getAttribute('data-sales-bill-item-id'));

                    var inputs = tableRows[tr].querySelectorAll('input[type="text"]');
                    var select = tableRows[tr].querySelectorAll('select');

                    if (inputs.length) {

                        if (parseFloat(inputs[5].value) > parseFloat(0)) {
                            goodsReceiptItemId = parseInt(inputs[0].value);
                            itemId = parseInt(tableRows[tr].getAttribute('data-item-id'));
                            saleQty = parseFloat(parseFloat(inputs[1].value).toFixed(2));
                            saleRate = parseFloat(parseFloat(inputs[2].value).toFixed(2));
                            cashDiscountPercent = parseFloat(parseFloat(inputs[3].value).toFixed(2));
                            salesSchemeId = parseInt(select[0].options[select[0].selectedIndex].value);
                            schemeDiscountPercent = parseFloat(select[0].options[select[0].selectedIndex].getAttribute('data-discountpercent'));
                            schemeDiscountAmount = parseFloat(select[0].options[select[0].selectedIndex].getAttribute('data-discountamount'));

                            if (salesSchemeId > 0) {

                                if (schemeDiscountPercent > 0) {

                                    typeOfDiscount = "CASH DISCOUNT";
                                }
                                else if (schemeDiscountAmount > 0) {
                                    typeOfDiscount = "RATE DIFF";
                                }
                                else {
                                    typeOfDiscount = null;
                                }
                            }

                            if (select[1].selectedIndex > 0) {
                                typeOfDiscount = select[1].options[select[1].selectedIndex].text.toUpperCase();
                            }

                            if (typeOfDiscount === null) {
                                discountAmount = parseFloat(0);
                            }
                            else if (typeOfDiscount === "CASH DISCOUNT") {
                                discountAmount = (saleQty * (saleRate * (cashDiscountPercent / 100)));
                            }
                            else {
                                discountAmount = (saleQty * cashDiscountPercent);
                            }

                            taxId = parseInt(tableRows[tr].getAttribute('data-tax-id'));
                            gstRateId = parseInt(tableRows[tr].getAttribute('data-gst-rate-id'));
                            unitOfMeasurementId = parseInt(tableRows[tr].getAttribute('data-unit-of-measurement-id'));
                            //salesSchemeId = parseInt(inputs[3].getAttribute('data-sales-scheme-id'));

                            if (isNaN(salesBillItemId)) { salesBillItemId = parseInt(0); }
                            if (isNaN(salesBillId)) { salesBillId = parseInt(0); }
                            if (isNaN(itemId)) { itemId = parseInt(0); }
                            if (isNaN(srNo)) { srNo = parseInt(0); }
                            if (isNaN(unitOfMeasurementId)) { unitOfMeasurementId = parseInt(0); }
                            if (isNaN(salesSchemeId)) { salesSchemeId = 0; }


                            var billItem = {};

                            billItem = {
                                SalesBillItemId: salesBillItemId,
                                SalesBillId: salesBillId,
                                GoodsReceiptItemId: goodsReceiptItemId,
                                ItemId: itemId,
                                ItemName: itemName,
                                UnitOfMeasurementId: unitOfMeasurementId,
                                UnitCode: unitCode,
                                SaleQty: saleQty,
                                SaleRate: saleRate,
                                SalesSchemeId: salesSchemeId,
                                TypeOfDiscount: typeOfDiscount,
                                CashDiscountPercent: cashDiscountPercent,
                                DiscountAmount: discountAmount,
                                GSTRateId: gstRateId,
                                TaxId: taxId,
                                SrNo: srNo,
                                IsDeleted: false,
                                SalesBillItemsCharges: salesBillItemsChargesDetails
                            };

                            if (tableRows[tr].style.display === "none") {
                                billItem.IsDeleted = true;
                                billItem.DeletedBy = parseInt(LOGGED_USER);
                                billItem.DeletedByIP = IP_ADDRESS;
                            }
                            else {
                                if (salesBillItemId === parseInt(0)) {

                                    billItem.CreatedBy = parseInt(LOGGED_USER);
                                    billItem.CreatedByIP = IP_ADDRESS;
                                    //addSalesBillItem(billItem);
                                }
                                else {
                                    billItem.ModifiedBy = parseInt(LOGGED_USER);
                                    billItem.ModifiedByIP = IP_ADDRESS;
                                    //updateSalesBillItem(billItem);
                                }
                            }

                            salesBillItems.push(billItem);
                        }
                    }
                }
            }
        }
    }

    function validateSalesBill() {

        var isValid = true;

        var customerAddressId = parseInt(0);
        var consigneeAddressId = parseInt(0);

        customerAddressId = parseInt(DOM.customerName.getAttribute('data-customer-address-id'));
        consigneeAddressId = parseInt(DOM.consigneeName.getAttribute('data-consignee-address-id'));

        if (isNaN(customerAddressId)) { customerAddressId = parseInt(0); }
        if (isNaN(consigneeAddressId)) { consigneeAddressId = parseInt(0); }

        if (DOM.companyName.selectedIndex === 0) {
            DOM.companyName.focus();
            swal("Error!!!", "Please select the Company Name.", "error");
            isValid = false;
        }
        else if (DOM.branch.selectedIndex === 0) {
            DOM.branch.focus();
            swal("Error!!!", "Please select the Branch Name.", "error");
            isValid = false;
        }
        else if (DOM.billDate.value === "") {
            DOM.billDate.focus();
            swal("Error!!!", "Please select the Branch Name.", "error");
            isValid = false;
        }
            else if (DOM.salesman.selectedIndex === 0) {
            DOM.salesman.focus();
            swal("Error!!!", "Please select the Saleman Name.", "error");
            isValid = false;
        }
            else if (DOM.billNoAuto.checked === false && DOM.billNoManual.checked === false) {
            DOM.billNoAuto.focus();
            swal("Error!!!", "Please select the Bill No. Auto or Manual option.", "error");
            isValid = false;
        }
        else if (DOM.typeOfSale.value === "") {
            DOM.typeOfSale.focus();
            swal("Error!!!", "Please select the Type of Sale.", "error");
            isValid = false;
        }
        else if (DOM.customerName.value === "") {
            DOM.customerName.focus();
            swal("Error!!!", "Please enter the Customer Name.", "error");
            isValid = false;
        }
        else if (DOM.consigneeName.value === "") {
            DOM.consigneeName.focus();
            swal("Error!!!", "Please enter the Consignee Name.", "error");
            isValid = false;
        }
        else if (customerAddressId === 0) {
            DOM.customerName.focus();
            swal("Error!!!", "Customer Name not found.", "error");
            isValid = false;
        }
        else if (consigneeAddressId === 0) {
            DOM.consigneeName.focus();
            swal("Error!!!", "Consignee Name not found.", "error");
            isValid = false;
        }

        if (DOM.billNoManual.checked) {
            if (DOM.billNo.value === "" || parseInt(DOM.billNo.value) === 0) {
                DOM.billNo.focus();
                swal("Error!!!", "Please enter the Bill No. manually", "error");
                isValid = false;
            }
        }

        return isValid;
    }
    function validateSalesBillItem() {

        var isValid = true;

        //if (DOM.itemName.selectedIndex === 0) {
        //    DOM.itemName.focus();
        //    swal("Error!!!", "Please select the Item Name.", "error");
        //    isValid = false;
        //}
        //else if (DOM.qtyInPcs.value === "") {
        //    DOM.qtyInPcs.focus();
        //    swal("Error!!!", "Please enter the Sale Qty in Pcs.", "error");
        //    isValid = false;
        //}
        //else if (DOM.qtyInPcs.value === "0") {
        //    DOM.qtyInPcs.focus();
        //    swal("Error!!!", "Sale Qty should be greater than zero.", "error");
        //    isValid = false;
        //}

        return isValid;
    }

    function addNewBillCharge() {

        shared.clearInputs(DOM.billChargesEditMode);
        shared.clearTextAreas(DOM.billChargesEditMode);
        shared.clearSelect(DOM.billChargesEditMode);
        shared.clearTables(DOM.billChargesEditMode);

        DOM.billChargeAmount.value = "0";
        DOM.billChargeGSTRate.value = "0";
        DOM.billChargeGSTAmount.value = "0";
        DOM.billChargeTotalAmount.value = "0";

        shared.showPanel(DOM.billChargesEditMode);
        shared.hidePanel(DOM.billChargesViewMode);

        DOM.billChargeName.focus();
    }

    function viewBillCharges() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.billChargesEditMode);
            shared.clearSelect(DOM.billChargesEditMode);
            shared.disableControls(DOM.billChargesEditMode, true);

            var selectedRows = getSelectedRows(DOM.billChargesList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var salesBillChargeId = parseInt(currentTableRow.getAttribute('data-sales-bill-charge-id'));

                    if (isNaN(salesBillChargeId)) { salesBillChargeId = 0; }

                    DOM.salesBillChargeId.value = salesBillChargeId;

                    showSelectedBillChargeDetails(salesBillId);
                }
            }
            else {
                swal("error", "No row selected.", "error");
            }
        }
        catch (e) {
            handleError(e.message);
        }
        finally {

            shared.hideLoader(DOM.loader);
        }
    }

    function editBillCharge() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.billChargesEditMode);
            shared.clearSelect(DOM.billChargesEditMode);
            shared.disableControls(DOM.billChargesEditMode, false);
                    
            var selectedRows = getSelectedRows(DOM.billChargesList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var salesBillChargeId = parseInt(currentTableRow.getAttribute('data-sales-bill-charge-id'));

                    if (isNaN(salesBillChargeId)) { salesBillChargeId = 0; }

                    DOM.salesBillChargeId.value = salesBillChargeId;

                    showSalesBillDetails(salesBillChargeId);
                }
            }
            else {
                swal("error", "No row selected.", "error");
            }
        }
        catch (e) {
            handleError(e.message);
        }
        finally {

            shared.hideLoader(DOM.loader);
        }

        // Focus
        DOM.billNo.focus();
    }

    function deleteBillCharges() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.billChargesList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.billChargesList);

            if (selectedRows.length > 0) {

                swal({
                    title: "Are you sure",
                    text: "Are you sure you want to delete this record?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel pls",
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                    function (isConfirm) {

                        if (isConfirm) {

                            for (var r = 0; r < selectedRows.length; r++) {

                                if (selectedRows[r].SalesBillChargeId === 0) {
                                    tableBody.removeChild(selectedRows[r]);
                                }
                                else {
                                    var salesBillCharge = {};

                                    salesBillCharge = {
                                        SalesBillChargeId: selectedRows[r].SalesBillChargeId,
                                        IsDeleted: true,
                                        DeletedBy: LOGGED_USER,
                                        DeletedByIP: IP_ADDRESS
                                    };

                                    var postData = JSON.stringify(salesBillCharge);

                                    shared.sendRequest(SERVICE_PATH + 'SaveSalesBill', "POST", true, "JSON", postData, function (response) {

                                        if (response.status === 200) {

                                            if (parseInt(response.responseText) > 0) {

                                                //tableBody.removeChild(selectedRows[r]);

                                                swal({
                                                    title: "Success",
                                                    text: "Sales Bill Charges Deleted successfully.",
                                                    type: "success"
                                                }, function () {
                                                    getBillCharges();
                                                });
                                            }
                                        }

                                        shared.hideLoader(DOM.loader);

                                    });
                                }
                            }
                        }
                    }
                );
            }
            else {
                swal("error", "No row selected.", "error");
            }
        }
        catch (e) {
            handleError(e.message);
        }
        finally {

            shared.hideLoader(DOM.loader);
        }
        
    }
    
    function showBillCharges() {

        if (salesBillChargesDetails.length > 0) {

            var salesBillChargeId = parseInt(currentTableRow.getAttribute('data-sales-bill-charge-id'));

            var srNo = parseInt(currentTableRow.getAttribute('data-sr-no'));

            DOM.salesBillChargesSrNo.value = srNo;

            DOM.salesBillChargeId.value = salesBillChargeId;

            var billCharges = salesBillChargesDetails.filter(function (value, index, array) {
                return value.SalesBillChargeId === salesBillChargeId
                    && value.SrNo === parseInt(srNo);
            });

            if (billCharges.length > 0) {

                shared.setSelectValue(DOM.billChargeName, null, parseInt(billCharges[0].ChargeId));
                shared.setSelect2ControlsText(DOM.billChargeName);
                DOM.billChargeAmount.value = billCharges[0].ChargeAmount;
                if (billCharges[0].IsTaxInclusive === true) {
                    DOM.billChargeTaxInclusive[0].checked = true;
                }
                else {
                    DOM.billChargeTaxExclusive[1].checked = true;
                }
                DOM.billChargeGSTRate.value = billCharges[0].GSTRate;
                DOM.billChargeGSTAmount.value = billCharges[0].GSTAmount;
                DOM.billChargeTotalAmount.value = billCharges[0].ChargeTotalAmount;
                
                shared.showPanel(DOM.billChargesEditMode);
                shared.hidePanel(DOM.billChargesViewMode);
            }
        }
    }


    function backToBillChargesList() {

        shared.hidePanel(DOM.billChargesEditMode);
        shared.showPanel(DOM.billChargesViewMode);

    }

    function addBillCharge(billCharge) {

        var srNo = getMaxSrNo(salesBillChargesDetails, 0);

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

        salesBillChargesDetails.push(salesBillCharge);
    }

    function updateBillCharge(billCharge) {

        if (salesBillChargesDetails.length > 0) {

            for (var r = 0; r < salesBillChargesDetails.length; r++) {

                if (salesBillChargesDetails[r].SalesBillChargeId === salesBillChargeId
                    && salesBillChargesDetails[r].SrNo === srNo) {

                    salesBillChargesDetails[r].SalesBillChargeId = billCharge.SalesBillChargeId;
                    salesBillChargesDetails[r].SalesBillId = billCharge.SalesBillId;
                    salesBillChargesDetails[r].ChargeId = billCharge.ChargeId;
                    salesBillChargesDetails[r].ChargeName = billCharge.ChargeName;
                    salesBillChargesDetails[r].ChargeAmount = billCharge.ChargeAmount;
                    salesBillChargesDetails[r].TaxId = billCharge.TaxId;
                    salesBillChargesDetails[r].GSTRate = billCharge.GSTRate;
                    salesBillChargesDetails[r].GSTAmount = billCharge.GSTAmount;
                    salesBillChargesDetails[r].BillChargeTotalAmount = billCharge.BillChargeTotalAmount;
                    salesBillChargesDetails[r].SrNo = billCharge.SrNo;
                    salesBillChargesDetails[r].GSTRateId = billCharge.GSTRateId;
                    salesBillChargesDetails[r].Remarks = billCharge.Remarks;
                    salesBillChargesDetails[r].IsDeleted = false;

                    if (salesBillChargesDetails[r].SalesBillChargeId > 0) {
                        salesBillChargesDetails[r].CreatedBy = parseInt(LOGGED_USER);
                        salesBillChargesDetails[r].CreatedByIP = IP_ADDRESS;
                    }
                    else {
                        salesBillChargesDetails[r].ModifiedBy = parseInt(LOGGED_USER);
                        salesBillChargesDetails[r].ModifiedByIP = IP_ADDRESS;
                    }

                    break;
                }
            }
        }
    }

    function getBillCharges() {

    }


    
    var validateBillCharges = function () {

        var isValid = true;

        return isValid;
    };

    function saveBillCharge() {

        if (validateBillCharges() === true) {

            var salesBillChargeId = parseInt(0);
            var salesBillId = parseInt(0);
            var billChargeId = parseInt(0);
            var billChargeName = null;
            var isTaxInclusive = true;
            var billChargeGSTRate = parseFloat(0);
            var billChargeGSTAmount = parseFloat(0);
            var billChargeTotalAmount = parseFloat(0);
            var taxId = parseInt(0);
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

        var table = DOM.billChargesList;

        var tableBody = table.tBodies[0];
        var tableFooter = table.tFoot;

        tableBody.innerHTML = "";
        tableFooter.innerHTML = "";

        if (isNaN(salesBillId)) { salesBillId = parseInt(0); }

        if (salesBillChargesDetails.length > 0) {

            var billCharges = salesBillChargesDetails.filter(function (value, index, array) {
                return value.SalesBillId === salesBillId;
            });

            var itemsCount = billCharges.length;

            if (itemsCount > 0) {

                var totalChargeAmount = parseFloat(0);
                var totalTaxableValue = parseFloat(0);
                var totalGSTAmount = parseFloat(0);
                //var totalChargeAmount = parseFloat(0);

                var data = "";
                
                for (var r = 0; r < itemsCount; r++) {

                    data = data + "<tr data-sales-bill-charge-id=" + billCharges[r].SalesBillChargeId + ">";                
                    data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + billCharges[r].SalesBillChargeId + "' class='label-checkbox' name='SelectSalesBillCharge' /> <span class='label-text'></span> </label>" + "</td>";
                    data = data + "<td>" + billCharges[r].ChargeName + "</td>";
                    data = data + "<td class='text-right'>" + billCharges[r].ChargeAmount + "</td>";
                    data = data + "<td class='text-center'>" + billCharges[r].GSTRate + "</td>";
                    data = data + "<td class='text-right'>" + billCharges[r].GSTAmount + "</td>";
                    data = data + "<td class='text-right'>" + billCharges[r].BillChargeTotalAmount + "</td>";

                    totalChargeAmount += parseFloat(billCharges[r].ChargeAmount);
                    totalTaxableValue += parseFloat(billCharges[r].TotalTaxableValue);
                    totalGSTAmount += parseFloat(billCharges[r].GSTAmount);
                    //totalBillChargeAmount += parseFloat(billItems[r].TotalItemAmount);
                }

                tableBody.innerHTML = data;

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

            shared.showPanel(DOM.billChargesViewMode);
            shared.hidePanel(DOM.billChargesEditMode);
        }
    }

    function saveAndAddNewBillCharge() {

        saveBillCharge();

        addNewBillCharge();

        DOM.billChargeName.focus();
    }

    function calculateGSTOnBillChargeAmount() {

        var billChargeAmount = 0;
        var gstRate = 0;
        var gstAmount = 0;
        var taxableValue = 0;

        var response = getGSTRateAsPerGSTCategoryId(function (response) {

            if (response) {

                billChargeAmount = parseFloat(parseFloat(DOM.billChargeAmount.value).toFixed(2));

                DOM.billChargeGSTRate.value = response.Rate;
                DOM.billChargeGSTRate.setAttribute('data-tax-id', response.TaxId);
                DOM.billChargeGSTRate.setAttribute('data-gst-rate-id', response.GSTRateId);

                if (DOM.billChargeTaxInclusive.checked) {
                    taxableValue = shared.roundOff(billChargeAmount * (100 / (response.Rate + 100)),2);
                }
                else {
                    taxableValue = billChargeAmount;
                }

                gstAmount = shared.roundOff(taxableValue * (response.Rate / 100), 2);

                DOM.billChargeGSTAmount.value = gstAmount;

                DOM.billChargeTotalAmount.value = shared.roundOff(taxableValue + gstAmount, 2);
            }
        });
    }

    var getGSTRateAsPerGSTCategoryId = function (callback) {

        var gstRate = 0;
        var gstCategoryId = parseInt(0);

        var gstRateDetails = {};

        gstCategoryId = parseInt(DOM.billChargeName.options[DOM.billChargeName.selectedIndex].getAttribute('data-gstcategoryid'));

        if (isNaN(gstCategoryId)) { gstCategoryId = 0; }

        if (gstCategoryId > 0) {

            gstRateDetails = {
                GSTCategoryId: gstCategoryId,
                GSTApplicable: gstApplicable,
                EffectiveFromDate: DOM.billDate.value
            };

            var postData = JSON.stringify(gstRateDetails);

            shared.sendRequest(SERVICE_PATH + "GetGSTRateByGSTCategoryIdGSTApplicableAndEffectiveDate/", "POST", true, "JSON", postData, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res.Rate >= 0) {
                            callback(res);
                        }
                    }
                }
            });
        }
    };

    function showItemRateModal() {

        DOM.$searchItemRateModal.show('modal');
    }

    function getItemRateListByItemId(itemId) {

        if (itemId > 0) {

            shared.sendRequest(SERVICE_PATH + "GetWholesaleAndRetailRatesOfItems/" + itemId, "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    shared.showLoader(DOM.loader);

                    if (response.responseText !== undefined) {

                        var _response = JSON.parse(response.responseText);

                        if (_response !== undefined || _response !== null) {

                            bindItemRateList(_response);
                        }
                    }
                }

                shared.hideLoader(DOM.loader);

            });
        }

    }

    function bindItemRateList(response) {

        var tableBody = DOM.itemRateList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the inward details has values
        if (response.length > 0) {

            var data = "";

            for (var r = 0; r < response.length; r++) {

                data = data + "<tr data-item-id=" + response[r].ItemId + " >";
                data = data + "<td>" + response[r].ItemName + "</td>";
                data = data + "<td>" + response[r].WholesaleRate + "</td>";
                data = data + "<td>" + response[r].RetailRate + "</td>";
                data = data + "<td>" + response[r].RateEffectiveFromDate + "</td>";
                data = data + "</tr>";

            }

            tableBody.innerHTML = data;
            
        }

        shared.hideLoader(DOM.loader);
    }

    function showItemsList(e, element) {

        elementName = element;

        if (element.value === "") {
            currentFocus = -1;
            closeAutoCompleteList();
            return;
        }

        if (e.keyCode === 40) {
            currentFocus++;
            addActive(e);
        }
        else if (e.keyCode === 38) {
            currentFocus--;
            addActive(e);
        }
        else if (e.keyCode === 13) {
            currentFocus = -1;
            setItemOnEnter(element);
        }
        else {

            searchedItemsList.length = 0;

            closeAutoCompleteList();

            var searchItem = {};

            ItemName: element.value;
            
            //var postData = JSON.stringify(searchItem);

            shared.sendRequest(SERVICE_PATH + "SearchItemRateByItemName/" + element.value, "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    searchedItemsList = JSON.parse(response.responseText);

                    var itemsCount = searchedItemsList.length;

                    if (itemsCount) {

                        var data = "";

                        var fragment = document.createDocumentFragment();

                        var ul = document.createElement('ul');

                        ul.classList.add('list-group');

                        for (var s = 0; s < itemsCount; s++) {

                            var li = document.createElement('li');

                            li.classList.add('list-group-item');
                            li.classList.add('clearfix');

                            li.setAttribute('id', searchedItemsList[s].ItemId);
                            li.setAttribute('data-unit-of-measurement-id', searchedItemsList[s].UnitOfMeasurementId);
                            li.setAttribute('data-unit-code', searchedItemsList[s].UnitCode);

                            li.style.cursor = "pointer";
                            li.onclick = setItem;
                            li.textContent = searchedItemsList[s].ItemName;

                            fragment.appendChild(li);

                            //data = data + "<li class='list-group-item clearfix'" +
                            //    "data-item-id=" + itemsList[s].ItemId + " data-unit-of-measurement-id=" + itemsList[s].UnitOfMeasurementId +
                            //    "style='padding:0px;'> <label class='label-tick'>" +
                            //    "<input type='checkbox' class='label-checkbox' id=Item_" + itemsList[s].ItemId + " checked='false' />" +
                            //    "<span class='label-text'></span> </label>" + itemsList[s].ItemName + "</li>";
                        }

                        ul.appendChild(fragment);

                        DOM.itemsList.appendChild(ul);

                        DOM.itemsList.style.width = element.offsetWidth + 'px';
                        DOM.itemsList.style.left = element.offsetParent.offsetLeft + 15 + 'px';

                        DOM.itemsList.classList.add('autocompleteList-active');
                        //DOM.itemsList.innerHTML = data;
                    }

                }

                shared.hideLoader(DOM.loader);

            });

        }
    }

    function addActive(e) {

        removeActive();

        var li = DOM.itemsList.querySelectorAll('li');

        var count = li.length;

        if (currentFocus >= count) {
            currentFocus = 0;
        }

        if (currentFocus < 0) {
            currentFocus = count - 1;
        }

        li[currentFocus].classList.add('autocompleteListItem-active');

    }

    function removeActive() {

        var li = DOM.itemsList.querySelectorAll('li');

        var count = li.length;

        if (count) {

            for (var l = 0; l < count; l++) {

                li[l].classList.remove('autocompleteListItem-active');
            }
        }

    }

    function setItem(e) {

        FLAG = "NEW ITEM";

        var element = elementName;

        element.value = e.target.textContent;

        closeAutoCompleteList();

        var itemId = e.target.id;
        var itemName = e.target.textContent;
        var unitCode = e.target.getAttribute('data-unit-code');
        var unitOfMeasurementId = e.target.getAttribute('data-unit-of-measurement-id');

        getItemRateListByItemId(itemId);

        element.value = "";
    }

    function setItemOnEnter(element) {

        FLAG = "NEW ITEM";

        var li = DOM.itemsList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            element.value = li[0].textContent;

            closeAutoCompleteList();
        }

        var itemId = li[0].id;
        var itemName = li[0].textContent;
        var unitCode = li[0].getAttribute('data-unit-code');
        var unitOfMeasurementId = li[0].getAttribute('data-unit-of-measurement-id');

        getItemRateListByItemId(itemId);

        element.value = "";
    }

    function closeAutoCompleteList() {

        DOM.itemsList.classList.remove('autocompleteList-active');

        var ul = DOM.itemsList.querySelectorAll('ul');

        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        while (DOM.itemsList.firstChild) {
            DOM.itemsList.removeChild(DOM.itemsList.firstChild);
        }

    }

    $('#SearchItemRate').on('shown.bs.modal', function () {

        DOM.searchItemRate.focus();
    });

    $('#CloseSearchItemRate').on('click', function () {

        $('#SearchItemRate').hide('modal');

    });


    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        applyPlugins();
        loadData();
    }

    return {
        init: init
    };

}());


SharpiTech.SalesBill.init();
