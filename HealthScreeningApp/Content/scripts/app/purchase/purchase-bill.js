
var SharpiTech = {};

SharpiTech.PurchaseBill = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var purchaseBill = {};
    var purchaseBills = [];
    var purchaseBillItems = [];
    var purchaseBillCharges = [];
    var unitOfMeasurements = [];
    var IsPurchaseBillRecordChanged = false;
    var IsPurchaseBillItemRecordChanged = false;
    var IsPurchaseBillChargeRecordChanged = false;

    var GSTApplicable = "IGST";

    /* ---- private method ---- */

    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.editMode = document.getElementById('EditMode');

        DOM.searchPanel = document.getElementById('SearchPanel');
        DOM.searchByFinancialYear = document.getElementById('SearchByFinancialYear');
        DOM.searchByVendor = document.getElementById('SearchByVendor');
        DOM.searchByPurchaseBillNo = document.getElementById('SearchByPurchaseBillNo');
        DOM.searchByPurchaseBillNoButton = document.getElementById('SearchByPurchaseBillNoButton');

        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.companyName = document.getElementById('CompanyName');
        DOM.branch = document.getElementById('Branch');
        DOM.vendor = document.getElementById('Vendor');
        DOM.purchaseBillId = document.getElementById('PurchaseBillId');
        DOM.purchaseBillNo = document.getElementById('PurchaseBillNo');
        DOM.purchaseBillDate = document.getElementById('PurchaseBillDate');
        DOM.purchaseBillDatePicker = document.getElementById('PurchaseBillDatePicker');
        DOM.transporter = document.getElementById('Transporter');
        DOM.challanNo = document.getElementById('ChallanNo');
        DOM.isTaxInclusive = document.getElementsByName('IsTaxInclusive');
        DOM.taxInclusive = document.getElementById('TaxInclusive');
        DOM.taxExclusive = document.getElementById('TaxExclusive');
        DOM.billChargeTaxInclusive = document.getElementById('BillChargeTaxInclusive');
        DOM.billChargeTaxExclusive = document.getElementById('BillChargeTaxExclusive');
        DOM.isTaxRoundOff = document.getElementById('IsTaxRoundOff');
        DOM.taxRoundOffYes = document.getElementById('TaxRoundOffYes');
        DOM.taxRoundOffNo = document.getElementById('TaxRoundOffNo');
        DOM.compositionBillYes = document.getElementById('CompositionBillYes');
        DOM.compositionBillNo = document.getElementById('CompositionBillNo');
        DOM.sampleYes = document.getElementById('SampleYes');
        DOM.sampleNo = document.getElementById('SampleNo');
        DOM.totalGSTAmountAsPerVendorBill = document.getElementById('TotalGSTAmountAsPerVendorBill');
        DOM.searchItem = document.getElementById('SearchItem');
        DOM.totalBillAmount = document.getElementById('TotalBillAmount');
        DOM.purchaseBillItemList = document.getElementById('PurchaseBillItemList');
        DOM.viewMode = document.getElementById('ViewMode');
        DOM.purchaseBillList = document.getElementById('PurchaseBillList');

        DOM.addNewPurchaseBill = document.getElementById('AddNewPurchaseBill');
        DOM.showPurchaseBillList = document.getElementById('ShowPurchaseBillList');
        DOM.viewPurchaseBill = document.getElementById('ViewPurchaseBill');
        DOM.editPurchaseBill = document.getElementById('EditPurchaseBill');
        DOM.savePurchaseBill = document.getElementById('SavePurchaseBill');
        DOM.deletePurchaseBill = document.getElementById('DeletePurchaseBill');
        DOM.printPurchasesBill = document.getElementById('PrintPurchasesBill');
        DOM.filterPurchaseBill = document.getElementById('FilterPurchaseBill');
        DOM.exportPurchaseillList = document.getElementById('ExportPurchaseillList');

        DOM.gstBreakup = document.getElementById('GSTBreakup');
        DOM.purchaseBillItemList = document.getElementById('PurchaseBillItemList');

        DOM.billChargesViewMode = document.getElementById('BillChargesViewMode');
        DOM.billChargesList = document.getElementById('BillChargesList');
        DOM.purchaseBillChargeSrNo = document.getElementById('PurchaseBillChargeSrNo');
        DOM.purchaseBillChargeId = document.getElementById('PurchaseBillChargeId');
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

        /*cache the jquery element */
        DOM.$purchaseBillDatePicker = $('#PurchaseBillDatePicker');
    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        DOM.$purchaseBillDatePicker.datetimepicker({
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

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.searchByPurchaseBillNoButton.addEventListener('click', getPurchaseBillDetailsByPurchaseBillNo);

        DOM.addNewPurchaseBill.addEventListener('click', addNewPurchaseBill);
        DOM.showPurchaseBillList.addEventListener('click', checkIsRecordsAreChanged);
        DOM.viewPurchaseBill.addEventListener('click', viewPurchaseBill);
        DOM.editPurchaseBill.addEventListener('click', editPurchaseBill);
        DOM.savePurchaseBill.addEventListener('click', savePurchaseBill);
        DOM.deletePurchaseBill.addEventListener('click', deletePurchaseBill);
        //DOM.printPurchasesBill.addEventListener('click', printPurchasesBill);

        DOM.addNewBillCharge.addEventListener('click', addNewBillCharge);
        DOM.showBillChargesList.addEventListener('click', getBillCharges);
        DOM.editBillCharge.addEventListener('click', editBillCharge);
        DOM.saveBillCharge.addEventListener('click', saveBillCharge);
        DOM.deleteBillCharge.addEventListener('click', deleteBillCharges);
        DOM.saveAndAddNewBillCharge.addEventListener('click', saveAndAddNewBillCharge);

        DOM.searchByPurchaseBillNo.onkeydown = function (e) {

            e = e || window.event;

            var keyCode = (e.which || e.keyCode);

            if (keyCode === 13 || keyCode === 8) {
                getPurchaseBillDetailsByPurchaseBillNo();
            }

        };

        DOM.searchByVendor.onchange = function () {
            getPurchaseBillDetailsByPurchaseBillNo();
        };

        DOM.companyName.onchange = function () {
            getBranchName(1);
        };

        DOM.vendor.onchange = function () {
            getGSTApplicable();
        };

        DOM.searchItem.onchange = function () {
            getItemDetailsByItemId();
        };

        DOM.billChargeAmount.onkeydown = function (e) {
            return shared.acceptDecimalNos(e);
        };

        DOM.billChargeAmount.onblur = function () {
            calculateGSTOnBillChargeAmount();
        };

        DOM.billChargeTaxExclusive.onclick = function () {
            calculateGSTOnBillChargeAmount();
        };

        DOM.billChargeTaxInclusive.onclick = function () {
            calculateGSTOnBillChargeAmount();
        };

    }

    function loadData() {

        getFinancialYear();
        getCompany();
        getBranchName();
        getVendor();
        getTransporter();
        getUnitOfMeasurements();
        getCharges();

        addNewPurchaseBill();
    }

    function getFinancialYear() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {
            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
                    shared.setSelect2ControlsText(DOM.financialYear);

                    DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                }
            }
        });

        //shared.hideLoader(DOM.loader);
    }

    function getCompany() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllCompanies', DOM.companyName, "CompanyName", "CompanyId", "Choose Company", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.companyName, parseInt(1));
                    shared.setSelect2ControlsText(DOM.companyName);

                    getBranchName(0);
                }
            }
        });

        //shared.hideLoader(DOM.loader);
    }

    function getBranchName(branchId) {

        shared.showLoader(DOM.loader);

        DOM.branch.options.length = 0;

        if (DOM.companyName.selectedIndex > 0) {

            var companyId = parseInt(DOM.companyName.options[DOM.companyName.selectedIndex].value);

            if (isNaN(companyId)) { companyId = parseInt(0); }

            if (companyId > 0) {

                shared.fillDropdownWithCallback(SERVICE_PATH + 'GetBranchesByCompanyId/' + companyId, DOM.branch, "BranchName", "BranchId", "Choose Branch", function (response) {

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            if (branchId > 0) {
                                shared.setSelectValue(DOM.branch, null, branchId);
                                shared.setSelect2ControlsText(DOM.branch);
                            }
                            else {
                                shared.setSelectOptionByIndex(DOM.branch, parseInt(1));
                                shared.setSelect2ControlsText(DOM.branch);
                            }
                        }
                    }
                });
            }
        }

        shared.hideLoader(DOM.loader);
    }

    function getVendor() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/2', DOM.vendor, "ClientAddressName", "ClientAddressId", "Choose Vendor", function (response) {
            if (response.status === 200) {
                shared.setSelectOptionByIndex(DOM.vendor, parseInt(1));
                shared.setSelect2ControlsText(DOM.vendor);

                DOM.searchByVendor.innerHTML = DOM.searchByVendor.innerHTML + DOM.vendor.innerHTML;
            }
        });

        //shared.showLoader(DOM.loader);
    }

    function getTransporter() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/3', DOM.transporter, "ClientAddressName", "ClientAddressId", "Choose Transporter", function (response) {
            if (response.status === 200) {
                shared.setSelectOptionByIndex(DOM.transporter, parseInt(12));
                shared.setSelect2ControlsText(DOM.transporter);
            }
        });

        //shared.hideLoader(DOM.loader);
    }

    function getUnitOfMeasurements() {

        shared.showLoader(DOM.loader);

        unitOfMeasurements.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllUnitsOfMeasurement", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                var res = JSON.parse(response.responseText);

                unitOfMeasurements = res;
            }
        });

        shared.hideLoader(DOM.loader);
    }

    //function getUnitOfMeasurements(element, value) {

    //    shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllUnitsOfMeasurement', element, "UnitCode", "UnitOfMeasurementId", "Choose UoM", function (response) {
    //        if (response.status === 200) {
    //            shared.setSelectValue(element, null, parseInt(value));
    //            shared.setSelect2ControlsText(element);
    //        }
    //    });
    //}

    function bindUnitOfMeasurements(element, value) {

        shared.fillDropdownWithArrayData(unitOfMeasurements, element, "UnitCode", "UnitOfMeasurementId", "Choose UoM");
    }

    function getSearchVendorListByPurchseBillNo(callback) {

        DOM.searchByVendor.options.length = 0;

        shared.showLoader(DOM.loader);

        var searchPurchaseBillNo = null;
        var workingPeriodId = 0;

        purchaseBillNo = DOM.searchByPurchaseBillNo.value;
        workingPeriodId = parseInt(DOM.searchByFinancialYear.options[DOM.searchByFinancialYear.selectedIndex].value);

        var purchaseBillInfo = {};

        purchaseBillInfo = {
            PurchaseBillNo: purchaseBillNo,
            WorkingPeriodId: workingPeriodId
        };

        var postData = JSON.stringify(purchaseBillInfo);

        shared.fillDropdownUsingPostWithCallback(SERVICE_PATH + 'GetVendorsByPurchaseBillNo', DOM.searchByVendor, "ClientAddressName", "ClientAddressId", "Choose Vendor", postData, function (response) {

            if (response.status === 200) {

                shared.setSelectOptionByIndex(DOM.searchByVendor, parseInt(1));
                shared.setSelect2ControlsText(DOM.searchByVendor);
            }

            shared.hideLoader(DOM.loader);

            callback(response);

        });

    }

    function getCharges() {

        shared.showLoader(DOM.loader);

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
    }

    // Maybe this function not required so later can be removed.
    //function getItems() {

    //    shared.fillDropdown(SERVICE_PATH + 'GetItemsByBrandCategoryAndQuality', DOM.item, "ItemName", "ItemId", "Choose Item");
    //}

    function getDiscountOptions(element) {

        shared.showLoader(DOM.loader);

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

        shared.hideLoader(DOM.loader);

    }

    function getGSTApplicable() {

        shared.showLoader(DOM.loader);

        var vendorId = parseInt(DOM.vendor.options[DOM.vendor.selectedIndex].value);

        if (isNaN(vendorId)) { vendorId = parseInt(0); }

        shared.sendRequest(SERVICE_PATH + "GetGSTApplicable/" + vendorId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response.GSTName !== undefined) {

                        GSTApplicable = _response.GSTName;
                    }
                }
            }
        });

        shared.hideLoader(DOM.loader);
    }

    // May be this function not required so later can be removed.
    //function showDiscountDetails() {

    //    if (DOM.discountDetails.classList.contains("is-not-visible")) {
    //        DOM.discountDetails.classList.remove("is-not-visible");
    //        DOM.discountDetails.classList.add("is-visible");
    //    }
    //    else {
    //        DOM.discountDetails.classList.remove("is-visible");
    //        DOM.discountDetails.classList.add("is-not-visible");
    //    }
    //}

    //function showTaxDetails() {

    //    if (DOM.taxDetails.classList.contains("is-not-visible")) {
    //        DOM.taxDetails.classList.remove("is-not-visible");
    //        DOM.taxDetails.classList.add("is-visible");
    //    }
    //    else {
    //        DOM.taxDetails.classList.remove("is-visible");
    //        DOM.taxDetails.classList.add("is-not-visible");
    //    }
    //}

    function changeDiscountOption() {

        shared.showLoader(DOM.loader);

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

        shared.hideLoader(DOM.loader);

        calculateItemAmount();
    }


    function getGSTRate(callback) {

        shared.showLoader(DOM.loader);

        var gstRate = 0;

        var itemId = parseInt(DOM.item.options[DOM.item.selectedIndex].value);
        var purchaseRate = parseFloat(0);

        purchaseRate = parseFloat(DOM.purchaseRate.value);

        var gstr = {};

        gstr = {
            ItemId: itemId,
            GSTApplicable: GSTApplicable,
            Rate: purchaseRate,
            EffectiveFromDate: DOM.purchaseBillDate.value
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

        shared.hideLoader(DOM.loader);
    }

    var getSelectedRows = function (element) {

        shared.showLoader(DOM.loader);

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

        shared.hideLoader(DOM.loader);

        return selectedRows;
    };

    $('#SearchItem').autocomplete({
        source: function (request, response) {
            //var param = { hsCod: HSCode.value };
            $.ajax({
                url: SERVICE_PATH + "SearchItemByItemName/" + DOM.searchItem.value + "",
                dataType: "json",
                type: "GET",
                success: function (data) {
                    response($.map(data, function (item) {
                        return {
                            label: item.ItemName, //vLabel,
                            val: item.ItemId //vValue                            
                        };
                    }));
                    if (data.length === 0) {
                        DOM.searchItem.value = "";
                        DOM.searchItem.removeAttribute("data-item-id");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    handleError(textStatus + ' ' + errorThrown);
                    swal({
                        title: "Error",
                        text: "No Records Found.",
                        type: "error"
                    }, function () {
                        DOM.searchItem.value = "";
                        DOM.searchItem.removeAttribute('data-item-id');
                        DOM.searchItem.focus();
                    });
                }
            });
        },
        select: function (event, ui) {
            if (ui.item) {

                DOM.searchItem.value = ui.item.label;
                DOM.searchItem.setAttribute('data-item-id', parseInt(ui.item.val));
            }
        },
        minLength: 3
    });

    function addNewPurchaseBill() {

        shared.showLoader(DOM.loader);

        DOM.searchPanel.style.display = "none";

        shared.clearInputs(DOM.editMode);
        shared.clearTextAreas(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        purchaseBills.length = 0;
        purchaseBillItems.length = 0;
        purchaseBillCharges.length = 0;

        DOM.purchaseBillNo.setAttribute('data-purchase-bill-id', parseInt(0));
        DOM.totalBillAmount.innerHTML = "";


        // Set default values
        shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
        shared.setSelect2ControlsText(DOM.financialYear);

        shared.setSelectOptionByIndex(DOM.companyName, parseInt(2));
        shared.setSelect2ControlsText(DOM.companyName);

        getBranchName(1);

        var currentDate = new Date();

        DOM.purchaseBillDate.value = moment(currentDate).format("DD/MMM/YYYY");

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);
        shared.showPanel(DOM.billChargesEditMode);
        shared.hidePanel(DOM.billChargesViewMode);

        DOM.vendor.focus();

        shared.hideLoader(DOM.loader);
    }

    function showPurchaseBillList() {

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);
    }

    //function viewPurchaseBill() {

    //    shared.showLoader(DOM.loader);

    //    shared.clearInputs(DOM.editMode);
    //    shared.clearTextAreas(DOM.editMode);
    //    shared.clearSelect(DOM.editMode);
    //    shared.clearTables(DOM.editMode);

    //    shared.disableControls(DOM.editMode, true);

    //    var controls = [
    //        DOM.searchByFinancialYear,
    //        DOM.searchByPurchaseBillNo,
    //        DOM.searchByVendor
    //    ];

    //    shared.disableSpecificControls(controls, false);

    //    purchaseBills.length = 0;
    //    purchaseBillItems.length = 0;
    //    purchaseBillCharges.length = 0;

    //    DOM.purchaseBillNo.setAttribute('data-purchase-bill-id', parseInt(0));

    //    DOM.totalBillAmount.innerHTML = "";

    //    DOM.searchPanel.style.display = "block";

    //    shared.showPanel(DOM.editMode);
    //    shared.hidePanel(DOM.viewMode);

    //    shared.showPanel(DOM.billChargesEditMode);
    //    shared.hidePanel(DOM.billChargesViewMode);

    //    DOM.searchByFinancialYear.focus();

    //    shared.hideLoader(DOM.loader);

    //}

    function viewPurchaseBill() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);

            shared.disableControls(DOM.editMode, true);

            var selectedRows = getSelectedRows(DOM.purchaseBillList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var purchaseBillId = parseInt(currentTableRow.getAttribute('data-purchase-bill-id'));

                    if (isNaN(purchaseBillId)) { purchaseBillId = 0; }

                    DOM.purchaseBillId.value = purchaseBillId;

                    showPurchaseBillDetails(purchaseBillId);
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

    function editPurchaseBill() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);

            shared.disableControls(DOM.editMode, false);

            var controls = [
                DOM.financialYear
            ];

            shared.disableSpecificControls(controls, true);

            var selectedRows = getSelectedRows(DOM.purchaseBillList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var purchaseBillId = parseInt(currentTableRow.getAttribute('data-purchase-bill-id'));

                    if (isNaN(purchaseBillId)) { purchaseBillId = 0; }

                    DOM.purchaseBillId.value = purchaseBillId;

                    showPurchaseBillDetails(purchaseBillId);
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
        DOM.purchaseBillNo.focus();
    }

    //function editPurchaseBill() {

    //    shared.showLoader(DOM.loader);

    //    shared.disableControls(DOM.editMode, false);

    //    var controls = [
    //            DOM.companyName,
    //            DOM.financialYear,
    //            DOM.vendor
    //        ]

    //    shared.disableSpecificControls(controls, true);

    //    DOM.searchPanel.style.display = "none";

    //    shared.hideLoader(DOM.loader);

    //}

    function checkIsPurchaseBillExistsInSalesBill(purchaseBillId, callback) {

        var isPurchaseBillExists = false;

        shared.sendRequest(SERVICE_PATH + 'CheckPurchaseBillExistsInSalesBill/' + purchaseBillId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {
                callback(response.responseText);
            }
        });
    }

    //function deletePurchaseBill() {

    //    shared.showLoader(DOM.loader);

    //    try {


    //        if (DOM.searchByPurchaseBillNo.value !== "") {

    //            swal({
    //                title: "Are you sure",
    //                text: "Are you sure you want to delete this record?",
    //                type: "warning",
    //                showCancelButton: true,
    //                confirmButtonClass: "btn-danger",
    //                confirmButtonText: "Yes, delete it!",
    //                cancelButtonText: "No, cancel pls",
    //                closeOnConfirm: false,
    //                closeOnCancel: true,
    //            },
    //                function (isConfirm) {

    //                    if (isConfirm) {

    //                        if (purchaseBills !== undefined) {

    //                            var purchaseBillId = parseInt(purchaseBills.PurchaseBillId);

    //                            checkIsPurchaseBillExistsInSalesBill(purchaseBillId, function (response) {

    //                                if (response === "true") {
    //                                    swal({
    //                                        title: "Warning",
    //                                        text: "Sales Bill is generated against this Purchase Bill Items so can not delete.",
    //                                        type: "warning"
    //                                    }, function () {
    //                                        shared.hideLoader(DOM.loader);
    //                                    });
    //                                }
    //                                else if (response === "false") {

    //                                    purchaseBills.IsDeleted = true;
    //                                    purchaseBills.DeletedBy = parseInt(LOGGED_USER);
    //                                    purchaseBills.DeletedByIP = IP_ADDRESS;

    //                                    if (purchaseBills.PurchaseBillItems.length) {

    //                                        for (var bi = 0; bi < purchaseBillItems.length; bi++) {
    //                                            purchaseBillItems[bi].IsDeleted = true;
    //                                            purchaseBillItems[bi].DeletedBy = parseInt(LOGGED_USER);
    //                                            purchaseBillItems[bi].DeletedByIP = IP_ADDRESS;
    //                                        }
    //                                    }

    //                                    //if (purchaseBills.PurchaseBillCharges.length) {

    //                                    //    var billCharges = purchaseBills.PurchaseBillCharges;

    //                                    //    for (var bc = 0; bc < billCharges.length; bc++) {

    //                                    //        billCharges[0].IsDeleted = true;
    //                                    //        billCharges[0].DeletedBy = parseInt(LOGGED_USER);
    //                                    //        billCharges[0].DeletedByIP = IP_ADDRESS;

    //                                    //        purchaseBills.PurchaseBillCharges = billCharges;
    //                                    //    }
    //                                    //}
    //                                }

    //                                var postData = JSON.stringify(purchaseBills);

    //                                shared.sendRequest(SERVICE_PATH + 'SavePurchaseBill', "POST", true, "JSON", postData, function (response) {

    //                                    if (response.status === 200) {

    //                                        if (parseInt(response.responseText) > 0) {
    //                                            swal({
    //                                                title: "Success",
    //                                                text: "Purchase Bill Details Deleted successfully.",
    //                                                type: "success"
    //                                            }, function () {
    //                                                addNewPurchaseBill();
    //                                                // deleteGoodsReceiptAndInwardDetails();
    //                                            });

    //                                            //deleteGoodsReceiptAndInwardDetails(purchaseBillId);
    //                                        }
    //                                    }

    //                                    shared.hideLoader(DOM.loader);

    //                                });

    //                            });
    //                        }

    //                    }
    //                }
    //            );
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

    function deletePurchaseBill() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.purchaseBillList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.purchaseBillList);

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

                                var bills = [];

                                if (purchaseBills.length) {

                                    var purchaseBillId = parseInt(selectedRows[r].getAttribute('data-purchase-bill-id'));

                                    checkIsPurchaseBillExistsInSalesBill(purchaseBillId, function (response) {
                                        if (response === "true") {
                                            swal({
                                                title: "Warning",
                                                text: "Sales Bill is generated against this Purchase Bill Items so can not delete.",
                                                type: "warning"
                                            }, function () {
                                                shared.hideLoader(DOM.loader);
                                            });
                                        }
                                        else if (response === "false") {

                                            bills = purchaseBills.filter(function (value, index, array) {
                                                return value.PurchaseBillId === purchaseBillId;
                                            });

                                            if (bills.length) {

                                                var billItems = purchaseBillItems.filter(function (value, index, array) {
                                                    return value.PurchaseBillId === purchaseBillId && value.IsDeleted === false;
                                                });

                                                var billCharges = purchaseBillCharges.filter(function (value, index, array) {
                                                    return value.PurchaseBillId === purchaseBillId;
                                                });

                                                bills[0].IsDeleted = true;
                                                bills[0].DeletedBy = parseInt(LOGGED_USER);
                                                bills[0].DeletedByIP = IP_ADDRESS;

                                                if (billItems.length) {

                                                    for (var bi = 0; bi < billItems.length; bi++) {
                                                        billItems[bi].IsDeleted = true;
                                                        billItems[bi].DeletedBy = parseInt(LOGGED_USER);
                                                        billItems[bi].DeletedByIP = IP_ADDRESS;
                                                    }

                                                    bills[0].PurchaseBillItems = billItems;
                                                }

                                                if (billCharges.length) {

                                                    for (var bc = 0; bc < billCharges.length; bc++) {

                                                        billCharges[0].IsDeleted = true;
                                                        billCharges[0].DeletedBy = parseInt(LOGGED_USER);
                                                        billCharges[0].DeletedByIP = IP_ADDRESS;

                                                        bills[0].PurchaseBillCharges = billCharges;
                                                    }
                                                }
                                            }

                                            var purchaseBill = {};

                                            purchaseBill = {
                                                PurchaseBillId: purchaseBillId,
                                                IsDeleted: true,
                                                DeletedBy: LOGGED_USER,
                                                DeletedByIP: IP_ADDRESS,
                                                PurchaseBillItems: billItems,
                                                PurchaseBillCharges: billCharges
                                            };

                                            var postData = JSON.stringify(purchaseBill);

                                            shared.sendRequest(SERVICE_PATH + 'SavePurchaseBill', "POST", true, "JSON", postData, function (response) {

                                                if (response.status === 200) {

                                                    if (parseInt(response.responseText) > 0) {

                                                        //tableBody.removeChild(selectedRows[r]);

                                                        swal({
                                                            title: "Success",
                                                            text: "Purchase Bill Details Deleted successfully.",
                                                            type: "success"
                                                        //}, function () {
                                                          //  deleteGoodsReceiptAndInwardDetails();
                                                        });

                                                        //deleteGoodsReceiptAndInwardDetails(purchaseBillId);
                                                    }
                                                }

                                                shared.hideLoader(DOM.loader);

                                            });
                                        }
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

    function deleteGoodsReceiptAndInwardDetails(purchaseBillId) {

        shared.showLoader(DOM.loader);

        try {

            swal({
                title: "Are you sure",
                text: "Do you want to delete the Goods Receipt and Inward Details for selected Purchase Bills?",
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

                        var purchaseBill = {};

                        purchaseBill = {
                            PurchaseBillId: purchaseBillId,
                            DeletedBy: LOGGED_USER,
                            DeletedByIP: IP_ADDRESS,
                            IsDeleted: true
                        };

                        var postData = JSON.stringify(purchaseBill);

                        shared.sendRequest(SERVICE_PATH + 'DeleteGoodsReceiptAndInwardByPurchaseBillId', "POST", true, "JSON", postData, function (response) {

                            if (response.status === 200) {

                                if (response.responseText === "true") {
                                    swal({
                                        title: "Success",
                                        text: "Goods Receipt and Inwards Details Deleted successfully.",
                                        type: "success"
                                    }, function () {
                                        getPurchaseBills();
                                    });
                                }
                                else {
                                    swal({
                                        title: "Error",
                                        text: "Unable to delete Goods Receipt and Inwards Details.",
                                        type: "error"
                                    });
                                }
                            }

                            shared.hideLoader(DOM.loader);

                        });
                    }
                });

        }
        catch (e) {
            handleError(e.message);
        }
        finally {

            shared.hideLoader(DOM.loader);
        }
    }

    //function showPurchaseBillDetails(purchaseBillId) {

    //    DOM.purchaseBillItemList.tBodies[0].innerHTML = "";

    //    shared.showLoader(DOM.loader);

    //    if (purchaseBillId > 0) {

    //        // Check the purchase bills list has values
    //        if (purchaseBills !== undefined) {

    //            shared.setSelectValue(DOM.financialYear, null, parseInt(purchaseBills.WorkingPeriodId));
    //            shared.setSelect2ControlsText(DOM.financialYear);
    //            shared.setSelectValue(DOM.companyName, null, parseInt(purchaseBills.CompanyId));
    //            shared.setSelect2ControlsText(DOM.companyName);
    //            getBranchName(purchaseBills.BranchId);
    //            shared.setSelectValue(DOM.vendor, null, parseInt(purchaseBills.VendorId));
    //            shared.setSelect2ControlsText(DOM.vendor);
    //            getBranchName(parseInt(purchaseBills.BranchId));
    //            DOM.purchaseBillNo.value = purchaseBills.PurchaseBillNo;
    //            DOM.purchaseBillNo.setAttribute('data-purchase-bill-id', parseInt(purchaseBillId));
    //            DOM.purchaseBillDate.value = purchaseBills.PurchaseBillDate;
    //            shared.setSelectValue(DOM.branch, null, parseInt(purchaseBills.BranchId));
    //            shared.setSelect2ControlsText(DOM.branch);
    //            shared.setSelectValue(DOM.transporter, null, parseInt(purchaseBills.TransporterId));
    //            shared.setSelect2ControlsText(DOM.transporter);
    //            DOM.challanNo.value = purchaseBills.ChallanNo;
    //            if (purchaseBills.IsTaxInclusive) {
    //                DOM.taxInclusive.checked = true;
    //                DOM.taxExclusive.checked = false;
    //            }
    //            else {
    //                DOM.taxExclusive.checked = true;
    //                DOM.taxInclusive.checked = false;
    //            }
    //            if (purchaseBills.IsTaxRoundOff) {
    //                DOM.taxRoundOffYes.checked = true;
    //                DOM.taxRoundOffNo.checked = false;
    //            }
    //            else {
    //                DOM.taxRoundOffNo.checked = true;
    //                DOM.taxRoundOffYes.checked = false;
    //            }
    //            if (purchaseBills.IsCompositionBill) {
    //                DOM.compositionBillYes.checked = true;
    //                DOM.compositionBillNo.checked = false;
    //            }
    //            else {
    //                DOM.compositionBillNo.checked = true;
    //                DOM.compositionBillYes.checked = false;
    //            }
    //            if (purchaseBills.IsSample) {
    //                DOM.sampleYes.checked = true;
    //                DOM.sampleNo.checked = false;
    //            }
    //            else {
    //                DOM.sampleYes.checked = false;
    //                DOM.sampleNo.checked = true;
    //            }
    //            //shared.setSelectValue(DOM.modeOfPayment, null, parseInt(cas))

    //            bindPurchaseBillItems(purchaseBillId);

    //            // Show panels
    //            shared.showPanel(DOM.editMode);
    //            shared.hidePanel(DOM.viewMode);
    //        }
    //    }

    //    shared.hideLoader(DOM.loader);
    //}

    function showPurchaseBillDetails(purchaseBillId) {

        DOM.purchaseBillItemList.tBodies[0].innerHTML = "";

        shared.showLoader(DOM.loader);

        // Check the purchase bills list has values
        if (purchaseBills.length > 0) {

            var bills = purchaseBills.filter(function (value, index, array) {
                return value.PurchaseBillId === parseInt(purchaseBillId);
            });

            if (bills.length > 0) {

                shared.setSelectValue(DOM.financialYear, null, parseInt(bills[0].WorkingPeriodId));
                shared.setSelect2ControlsText(DOM.financialYear);
                shared.setSelectValue(DOM.companyName, null, parseInt(bills[0].CompanyId));
                shared.setSelect2ControlsText(DOM.companyName);
                shared.setSelectValue(DOM.vendor, null, parseInt(bills[0].VendorId));
                shared.setSelect2ControlsText(DOM.vendor);
                getBranchName(parseInt(bills[0].BranchId));
                DOM.purchaseBillNo.value = bills[0].PurchaseBillNo;
                DOM.purchaseBillNo.setAttribute('data-purchase-bill-id', parseInt(purchaseBillId));
                DOM.purchaseBillDate.value = bills[0].PurchaseBillDate;
                shared.setSelectValue(DOM.branch, null, parseInt(bills[0].BranchId));
                shared.setSelect2ControlsText(DOM.branch);
                shared.setSelectValue(DOM.transporter, null, parseInt(bills[0].TransporterId));
                shared.setSelect2ControlsText(DOM.transporter);
                DOM.challanNo.value = bills[0].ChallanNo;
                if (bills[0].IsTaxInclusive) {
                    DOM.taxInclusive.checked = true;
                    DOM.taxExclusive.checked = false;
                }
                else {
                    DOM.taxExclusive.checked = true;
                    DOM.taxInclusive.checked = false;
                }
                if (bills[0].IsTaxRoundOff) {
                    DOM.taxRoundOffYes.checked = true;
                    DOM.taxRoundOffNo.checked = false;
                }
                else {
                    DOM.taxRoundOffNo.checked = true;
                    DOM.taxRoundOffYes.checked = false;
                }
                if (bills[0].IsCompositionBill) {
                    DOM.compositionBillYes.checked = true;
                    DOM.compositionBillNo.checked = false;
                }
                else {
                    DOM.compositionBillNo.checked = true;
                    DOM.compositionBillYes.checked = false;
                }
                if (bills[0].IsSample) {
                    DOM.sampleYes.checked = true;
                    DOM.sampleNo.checked = false;
                }
                else {
                    DOM.sampleYes.checked = false;
                    DOM.sampleNo.checked = true;
                }
                //shared.setSelectValue(DOM.modeOfPayment, null, parseInt(cas))

                bindPurchaseBillItems(purchaseBillId);

                bindBillCharges(purchaseBillId);

            }

            // Show panels
            shared.showPanel(DOM.editMode);
            shared.hidePanel(DOM.viewMode);
        }

    }

    function getItemDetailsByItemId() {

        if (DOM.searchByPurchaseBillNo.value !== undefined) {

            shared.showLoader(DOM.loader);

            var itemId = parseInt(0);
            var purchaseBillItemId = parseInt(0);

            itemId = parseInt(DOM.searchItem.getAttribute('data-item-id'));

            if (itemId > 0) {

                shared.sendRequest(SERVICE_PATH + "GetItemDetailsForPurchaseByItemId/" + itemId, "GET", true, "JSON", null, function (response) {

                    shared.showLoader(DOM.loader);

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            var res = JSON.parse(response.responseText);

                            if (res.ItemName === null) {
                                DOM.searchItem.value = "";
                                DOM.searchItem.removeAttribute('data-item-id');
                                swal({
                                    title: "Error",
                                    text: "No Item Found.",
                                    type: "error"
                                }, function () {
                                    shared.hideLoader(DOM.loader);
                                    DOM.searchItem.focus();
                                });
                            }
                            else if (res.ItemName !== undefined) {

                                res.PurchaseBillItemId = parseInt(0);
                                res.PurchaseQty = parseFloat(1);
                                res.CashDiscountPercent = parseFloat(0);
                                res.GSTRateId = parseInt(0);
                                res.TaxId = parseInt(0);
                                res.GSTRate = parseFloat(0);
                                res.TotalItemAmount = parseFloat(0);

                                addNewPurchaseBillItem(res);
                            }
                        }
                    }
                });
            }

            //set focus
            DOM.purchaseBillList.focus();

            shared.hideLoader(DOM.loader);

        }

        return false;
    }

    function editPurchaseBillItem(currentTableRow) {

        shared.clearInputs(DOM.purchaseBillItemEditMode);

        shared.clearTextAreas(DOM.purchaseBillItemEditMode);

        shared.disableControls(DOM.purchaseBillItemEditMode, false);

        showSelectedItemDetails(currentTableRow);
    }

    function deletePurchaseBillItem(currentTableRow) {

        var table = DOM.purchaseBillItemList;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var purchaseBillItemId = currentTableRow.getAttribute('data-purchase-bill-item-id');

        if (purchaseBillItemId === 0) {
            tableBody.removeChild(currentTableRow);
        }
        else {
            var purchaseBillItem = {};

            purchaseBillItem = {
                PurchaseBillItemId: purchaseBillItemId,
                DeletedBy: LOGGED_USER,
                DeletedByIp: IP_ADDRESS
            };

            var postData = JSON.stringify(purchaseBillItem);

            shared.sendRequest(SERVICE_PATH + 'DeletePurchaseBillItem', "POST", true, "JSON", postData, function (response) {
                if (response.status === 200) {
                    if (response.responseText === "true") {
                        tableBody.removeChild(currentTableRow);
                    }
                }
            });
        }
    }

    function setFocus() {
        DOM.$purchaseBillItemModal.on('shown.bs.modal', function () {
            DOM.item.focus();
        });
    }

    function validatePurchaseBillItemDetails() {

        var isValid = true;

        //if (DOM.baleNo.value === "") {
        //    DOM.baleNo.focus();
        //    swal("Error!!!", "Please enter the Bale No.", "error");
        //    isValid = false;
        //}
        //else if (DOM.lrNo.value === "") {
        //    DOM.lrNo.focus();
        //    swal("Error!!!", "Please enter the LR No.", "error");
        //    isValid = false;
        //}
        //else if (DOM.item.selectedIndex === 0) {
        //    DOM.item.focus();
        //    swal("Error!!!", "Please select the Item.", "error");
        //    isValid = false;
        //}
        //else if (DOM.purchaseQty.value === "") {
        //    DOM.purchaseQty.focus();
        //    swal("Error!!!", "Please enter the Qty (Pcs) purchased.", "error");
        //    isValid = false;
        //}
        //else if (DOM.purchaseRate.value === "") {
        //    DOM.purchaseRate.focus();
        //    swal("Error!!!", "Please enter the Purchase Rate.", "error");
        //    isValid = false;
        //}
        //else if (parseInt(DOM.purchaseRate.value) === parseInt(0)) {
        //    DOM.purchaseRate.focus();
        //    swal("Error!!!", "Purchase Rate shoule be greater than zero.", "error");
        //    isValid = false;
        //}

        return isValid;
    }

    function addPurchaseBillItem(billItem) {

        shared.showLoader(DOM.loader);

        var srNo = getMaxSrNo(purchaseBillItems, 0);

        billItem.SrNo = srNo;

        var purchaseBillItem = {};

        purchaseBillItem = {
            PurchaseBillItemId: billItem.PurchaseBillItemId,
            PurchaseBillId: billItem.PurchaseBillId,
            ItemId: billItem.ItemId,
            ItemName: billItem.ItemName,
            BaleNo: billItem.BaleNo,
            LRNo: billItem.LRNo,
            PurchaseQty: billItem.PurchaseQty,
            UnitOfMeasurementId: billItem.UnitOfMeasurementId,
            PurchaseRate: billItem.PurchaseRate,
            Amount: billItem.Amount,
            TypeOfDiscount: billItem.TypeOfDiscount,
            CashDiscountPercent: billItem.CashDiscountPercent,
            DiscountAmount: billItem.DiscountAmount,
            TotalAmountAfterDiscount: billItem.TotalAmountAfterDiscount,
            TaxableValue: billItem.TaxableValue,
            TaxId: billItem.TaxId,
            GSTRate: billItem.GSTRate,
            GSTAmount: billItem.GSTAmount,
            TotalItemAmount: billItem.TotalItemAmount,
            GSTRateId: billItem.GSTRateId,
            SrNo: billItem.SrNo,
            IsDeleted: false,
            CreatedBy: parseInt(LOGGED_USER),
            CreatedByIp: IP_ADDRESS
        };

        purchaseBillItems.push(purchaseBillItem);

        shared.hideLoader(DOM.loader);

    }

    function updatePurchaseBillItem(billItem) {

        if (purchaseBillItems.length > 0) {

            for (var p = 0; p < purchaseBillItems.length; p++) {

                if (purchaseBillItems[p].PurchaseBillItemId === parseInt(billItem.PurchaseBillItemId)
                    && purchaseBillItems[p].SrNo === parseInt(billItem.SrNo)) {

                    purchaseBillItems[p].ItemId = billItem.ItemId;
                    purchaseBillItems[p].ItemName = billItem.ItemName;
                    purchaseBillItems[p].BaleNo = billItem.BaleNo;
                    purchaseBillItems[p].LRNo = billItem.LRNo;
                    purchaseBillItems[p].PurchaseQty = billItem.PurchaseQty;
                    purchaseBillItems[p].UnitOfMeasurementId = billItem.UnitOfMeasurementId;
                    purchaseBillItems[p].PurchaseRate = billItem.PurchaseRate;
                    purchaseBillItems[p].TypeOfDiscount = billItem.TypeOfDiscount;
                    purchaseBillItems[p].CashDiscountPercent = billItem.CashDiscountPercent;
                    purchaseBillItems[p].DiscountAmount = billItem.DiscountAmount;
                    purchaseBillItems[p].TotalAmountAfterDiscount = billItem.TotalAmountAfterDiscount;
                    purchaseBillItems[p].TaxableValue = billItem.TaxableValue;
                    purchaseBillItems[p].TaxId = billItem.TaxId;
                    purchaseBillItems[p].GSTRate = billItem.GSTRate;
                    purchaseBillItems[p].GSTAmount = billItem.GSTAmount;
                    purchaseBillItems[p].TotalItemAmount = billItem.TotalItemAmount;
                    purchaseBillItems[p].SrNo = billItem.SrNo;
                    purchaseBillItems[p].GSTRateId = billItem.GSTRateId;
                    purchaseBillItems[p].IsDeleted = false;
                    purchaseBillItems[p].ModifiedBy = parseInt(LOGGED_USER);
                    purchaseBillItems[p].ModifiedByIp = IP_ADDRESS;

                    break;
                }
            }
        }
    }

    function checkIsItemExists() {

        var isItemExists = false;

        var purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));

        if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }

        if (purchaseBillId === 0) {

            if (purchaseBillItems.length > 0) {

                var itemId = parseInt(DOM.searchItem.getAttribute('data-item-id'));

                var itemsList = purchaseBillItems.filter(function (value, index, array) {
                    return value.ItemId === itemId && value.IsDeleted === false;
                });

                if (itemsList.length > 0) {
                    isItemExists = true;
                }
            }
        }

        return isItemExists;
    }

    function savePurchaseBillItem() {

        if (validatePurchaseBillItemDetails() === true) {

            var purchaseBillItemId = parseInt(0);
            var purchaseBillId = parseInt(0);
            var baleNo = null;
            var lrNo = null;
            var hsncode = null;
            var itemId = parseInt(0);
            var itemName = null;
            var purchaseQty = parseFloat(0);
            var unitOfMeasurementId = 0;
            var purchaseRate = parseFloat(0);
            var amount = parseFloat(0);
            var typeOfDiscount = null;
            var cashDiscountPercent = parseFloat(0);
            var discountAmount = parseFloat(0);
            var totalAmountAfterDiscount = parseFloat(0);
            var taxableValue = parseFloat(0);
            var gstRate = parseFloat(0);
            var gstAmount = parseFloat(0);
            var totalItemAmount = parseFloat(0);
            var taxId = parseInt(0);
            var gstRateId = parseInt(0);
            var GSTAmountAsPerVendorBill = parseFloat(0);
            var srNo = parseInt(0);

            purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));

            var tableBody = DOM.purchaseBillItemList.tBodies[0];

            var tableRows = tableBody.children;

            if (tableRows.length) {

                for (var tr = 0; tr < tableRows.length; tr++) {

                    purchaseBillItemId = parseInt(tableRows[tr].getAttribute('data-purchase-bill-item-id'));

                    var inputs = tableRows[tr].querySelectorAll('input[type="text"]');
                    var select = tableRows[tr].querySelectorAll('select');

                    if (inputs.length) {

                        if (parseFloat(inputs[5].value) > parseFloat(0)) {
                            baleNo = inputs[0].value;
                            lrNo = inputs[1].value;
                            hsncode = tableRows[tr].children[3].innerHTML;
                            itemId = parseInt(tableRows[tr].getAttribute('data-item-id'));
                            unitOfMeasurementId = parseInt(select[0].options[select[0].selectedIndex].value);
                            purchaseQty = parseFloat(parseFloat(inputs[2].value).toFixed(2));
                            purchaseRate = parseFloat(parseFloat(inputs[3].value).toFixed(2));
                            if (select[1].selectedIndex > 0) {
                                typeOfDiscount = select[1].options[select[1].selectedIndex].text.toUpperCase();
                            }
                            if (typeOfDiscount === null) {
                                discountAmount = parseFloat(0);
                            }
                            else if (typeOfDiscount === "CASH DISCOUNT") {
                                if (purchaseQty > 0) {
                                    discountAmount = (purchaseRate * purchaseQty) * (cashDiscountPercent / 100);
                                }
                            }
                            else {
                                if (purchaseQty > 0) {
                                    discountAmount = (purchaseRate - cashDiscountPercent);
                                }
                            }
                            cashDiscountPercent = parseFloat(parseFloat(inputs[4].value).toFixed(2));
                            taxId = parseInt(tableRows[tr].getAttribute('data-tax-id'));
                            gstRateId = parseInt(tableRows[tr].getAttribute('data-gst-rate-id'));
                            GSTAmountAsPerVendorBill = parseFloat(inputs[8].value);

                            if (isNaN(purchaseBillItemId)) { purchaseBillItemId = parseInt(0); }
                            if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }
                            if (isNaN(itemId)) { itemId = parseInt(0); }
                            if (isNaN(srNo)) { srNo = parseInt(0); }

                            var billItem = {};

                            billItem = {
                                PurchaseBillItemId: purchaseBillItemId,
                                PurchaseBillId: purchaseBillId,
                                BaleNo: baleNo,
                                LRNo: lrNo,
                                ItemId: itemId,
                                ItemName: itemName,
                                UnitOfMeasurementId: unitOfMeasurementId,
                                PurchaseQty: purchaseQty,
                                PurchaseRate: purchaseRate,
                                TypeOfDiscount: typeOfDiscount,
                                CashDiscountPercent: cashDiscountPercent,
                                DiscountAmount: discountAmount,
                                GSTRateId: gstRateId,
                                TaxId: taxId,
                                GSTAmountAsPerVendorBill: GSTAmountAsPerVendorBill,
                                SrNo: srNo,
                                IsDeleted: false
                                //SalesBillItemsCharges: salesBillItemsChargesDetails
                            };

                            if (tableRows[tr].style.display === "none") {
                                billItem.IsDeleted = true;
                                billItem.DeletedBy = parseInt(LOGGED_USER);
                                billItem.DeletedByIP = IP_ADDRESS;
                            }
                            else {
                                if (purchaseBillItemId === parseInt(0)) {

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

                            purchaseBillItems.push(billItem);
                        }
                    }
                }
            }
            else {
                swal({
                    title: "Warning",
                    text: "No Purchase Bill Items is entered. Please add the items.",
                    type: "warning",
                    function() {
                        DOM.searchItem.focus();
                        shared.hideLoader(DOM.loader);
                        return;
                    }
                });
            }
        }
    }

    //function bindPurchaseBillItems(purchaseBillId) {

    //    var table = DOM.purchaseBillItemList;

    //    var tableBody = table.tBodies[0];

    //    var tableFooter = table.tFoot;

    //    tableBody.innerHTML = "";

    //    tableFooter.innerHTML = "";

    //    if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }

    //    if (purchaseBills.PurchaseBillItems.length > 0) {

    //        purchaseBillItems = purchaseBills.PurchaseBillItems;

    //        for (var r = 0; r < purchaseBillItems.length; r++) {

    //            var response = {};

    //            response = {
    //                PurchaseBillItemId: purchaseBillItems[r].PurchaseBillItemId,
    //                BaleNo: purchaseBillItems[r].BaleNo,
    //                LRNo: purchaseBillItems[r].LRNo,
    //                ItemId: purchaseBillItems[r].ItemId,
    //                ItemName: purchaseBillItems[r].ItemName,
    //                HSNCode: purchaseBillItems[r].HSNCode,
    //                UnitOfMeasurementId: purchaseBillItems[r].UnitOfMeasurementId,
    //                UnitCode: purchaseBillItems[r].UnitCode,
    //                PurchaseQty: purchaseBillItems[r].PurchaseQty,
    //                PurchaseRate: purchaseBillItems[r].PurchaseRate,
    //                TypeOfDiscount: purchaseBillItems[r].TypeOfDiscount,
    //                CashDiscountPercent: purchaseBillItems[r].CashDiscountPercent,
    //                TotalItemAmount: purchaseBillItems[r].TotalItemAmount,
    //                GSTRateId: purchaseBillItems[r].GSTRateId,
    //                TaxId: purchaseBillItems[r].TaxId,
    //                GSTRate: purchaseBillItems[r].GSTRate,
    //                TaxableValue: purchaseBillItems[r].TaxableValue,
    //                GSTAmount: purchaseBillItems[r].GSTAmount,
    //                GSTAmountAsPerVendorBill: purchaseBillItems[r].GSTAmountAsPerVendorBill
    //            };

    //            addNewPurchaseBillItem(response);
    //        }

    //        showGSTBreakup();

    //        showTotalBillAmount();

    //        //shared.showPanel(DOM.purchaseBillItemViewMode);
    //        //shared.hidePanel(DOM.purchaseBillItemEditMode);
    //    }
    //}

    function bindPurchaseBillItems(purchaseBillId) {

        var table = DOM.purchaseBillItemList;

        var tableBody = table.tBodies[0];

        var tableFooter = table.tFoot;

        tableBody.innerHTML = "";

        tableFooter.innerHTML = "";

        if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }

        if (purchaseBillItems.length > 0) {

            var billItems = purchaseBillItems.filter(function (value, index, array) {
                return value.PurchaseBillId === purchaseBillId && value.IsDeleted === false;
            });

            var itemsCount = billItems.length;

            if (itemsCount > 0) {

                for (var r = 0; r < itemsCount; r++) {

                    var response = {};

                    response = {
                        PurchaseBillItemId: billItems[r].PurchaseBillItemId,
                        BaleNo: billItems[r].BaleNo,
                        LRNo: billItems[r].LRNo,
                        ItemId: billItems[r].ItemId,
                        ItemName: billItems[r].ItemName,
                        HSNCode: billItems[r].HSNCode,
                        UnitOfMeasurementId: billItems[r].UnitOfMeasurementId,
                        UnitCode: billItems[r].UnitCode,
                        PurchaseQty: billItems[r].PurchaseQty,
                        PurchaseRate: billItems[r].PurchaseRate,
                        TypeOfDiscount: billItems[r].TypeOfDiscount,
                        CashDiscountPercent: billItems[r].CashDiscountPercent,
                        TotalItemAmount: billItems[r].TotalItemAmount,
                        GSTRateId: billItems[r].GSTRateId,
                        TaxId: billItems[r].TaxId,
                        GSTRate: billItems[r].GSTRate,
                        TaxableValue: billItems[r].TaxableValue,
                        GSTAmount: billItems[r].GSTAmount,
                        GSTAmountAsPerVendorBill: billItems[r].GSTAmountAsPerVendorBill
                    };

                    addNewPurchaseBillItem(response);
                }

                showGSTBreakup();
                //showTotalBillAmount();
            }

            //shared.showPanel(DOM.purchaseBillItemViewMode);
            //shared.hidePanel(DOM.purchaseBillItemEditMode);
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

    //function getPurchaseBill(purchaseBillId) {

    //    var purchaseBill = purchaseBills.filter(function (value, index, array) {
    //        return value.PurchaseBillId === parseInt(purchaseBillId);
    //    });

    //    return purchaseBill;
    //}

    //function getPurchaseGoods(purchaseBillId) {

    //    var purchaseBill = getPurchaseBills(purchaseBillId);

    //    var goodsReceipts = purchaseBill[0].GoodsReceipts.filter(function (value, index, array) {
    //        return value.PurchaseBillId === parseInt(purchaseBillId);
    //    });    

    //    return goodsReceipts;
    //} to be discard
    
    function getPurchaseBillDetailsByPurchaseBillNo() {

        getSearchVendorListByPurchseBillNo(function (response) {

            if (response) {

                var workingPeriodId = parseInt(0);
                var searchPurchaseBillNo = null;
                var vendorId = parseInt(0);

                workingPeriodId = parseInt(DOM.searchByFinancialYear.options[DOM.searchByFinancialYear.selectedIndex].value);
                searchPurchaseBillNo = DOM.searchByPurchaseBillNo.value;
                vendorId = parseInt(DOM.searchByVendor.options[DOM.searchByVendor.selectedIndex].value);

                var purchaseBillInfo = {};

                purchaseBillInfo = {
                    PurchaseBillNo: searchPurchaseBillNo,
                    WorkingPeriodId: workingPeriodId,
                    VendorId: vendorId
                };

                var postData = JSON.stringify(purchaseBillInfo);

                if (searchPurchaseBillNo !== "") {

                    purchaseBills.length = 0;
                    purchaseBillItems.length = 0;

                    shared.sendRequest(SERVICE_PATH + "GetPurchaseBillDetailsByPurchaseBillNoVendorIdAndWorkingPeriodId/", "POST", true, "JSON", postData, function (response) {

                        if (response.status === 200) {

                            var res = JSON.parse(response.responseText);

                            purchaseBills = res;

                            showPurchaseBillDetails(purchaseBills.PurchaseBillId);
                        }

                    });

                }
            }

        });

    }

    function unselectPurchaseBillListDetails() {

        var tableBody = DOM.purchaseBillList.tBodies[0];
        
        var checkBoxes = tableBody.querySelectorAll('.label-checkbox');

        if (checkBoxes.length > 0) {

            for (var c = 0; c < checkBoxes.length; c++) {

                checkBoxes[c].checked = false;
            }
        }
    }

    function checkIsRecordsAreChanged() {

        shared.showLoader(DOM.loader);

        if (purchaseBills.length === 0) {
            getPurchaseBills();
        }
        else {
            if (IsPurchaseBillRecordChanged === false) {

                unselectPurchaseBillListDetails();
                shared.showPanel(DOM.viewMode);
                shared.hidePanel(DOM.editMode);

                shared.hideLoader(DOM.loader);
            }
        }

    }

    function getPurchaseBills() {

        shared.showLoader(DOM.loader);

        purchaseBills.length = 0;
        purchaseBillItems.length = 0;
        purchaseBillCharges.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllPurchaseBills", "GET", true, "JSON", null, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res !== undefined) {

                        if (res.length > 0) {

                            var table = DOM.purchaseBillList;

                            var tableBody = table.tBodies[0];

                            for (var r = 0; r < res.length; r++) {

                                var purchaseBill = {};

                                purchaseBill = {
                                    PurchaseBillId: res[r].PurchaseBillId,
                                    VendorId: res[r].VendorId,
                                    VendorName: res[r].VendorName,
                                    TransporterId: res[r].TransporterId,
                                    TransporterName: res[r].TransporterName,
                                    PurchaseBillNo: res[r].PurchaseBillNo,
                                    PurchaseBillDate: res[r].PurchaseBillDate,
                                    ChallanNo: res[r].ChallanNo,
                                    TruckNo: res[r].TruckNo,
                                    TotalQty: res[r].TotalQty,
                                    UnitOfMeasurement: res[r].UnitOfMeasurement,
                                    TotalAmount: res[r].TotalAmount,
                                    GSTApplicable: res[r].GSTApplicable,
                                    IsTaxInclusive: res[r].IsTaxInclusive,
                                    IsTaxRoundOff: res[r].IsTaxRoundOff,
                                    IsCompositionBill: res[r].IsCompositionBill,
                                    IsSample: res[r].IsSample,
                                    CompanyId: res[r].CompanyId,
                                    CompanyName: res[r].CompanyName,
                                    BranchId: res[r].BranchId,
                                    BranchName: res[r].BranchName,
                                    WorkingPeriodId: res[r].WorkingPeriodId,
                                    FinancialYear: res[r].FinancialYear,
                                    guid: res[r].guid,
                                    SrNo: res[r].SrNo,
                                    IsDeleted: false
                                };

                                purchaseBills.push(purchaseBill);

                                var billItems = res[r].PurchaseBillItems;

                                billItems = billItems.filter(function (value, index, array) {
                                    return value.PurchaseBillId === res[r].PurchaseBillId;
                                    //break;
                                });

                                if (billItems.length > 0) {

                                    for (var b = 0; b < billItems.length; b++) {

                                        var purchaseBillItem = {};

                                        purchaseBillItem = {
                                            PurchaseBillItemId: billItems[b].PurchaseBillItemId,
                                            PurchaseBillId: billItems[b].PurchaseBillId,
                                            ItemId: billItems[b].ItemId,
                                            ItemName: billItems[b].ItemName,
                                            HSNCode: billItems[b].HSNCode,
                                            BaleNo: billItems[b].BaleNo,
                                            LRNo: billItems[b].LRNo,
                                            PurchaseQty: billItems[b].PurchaseQty,
                                            UnitOfMeasurementId: billItems[b].UnitOfMeasurementId,
                                            UnitCode: billItems[b].UnitCode,
                                            PurchaseRate: billItems[b].PurchaseRate,
                                            Amount: billItems[b].Amount,
                                            TypeOfDiscount: billItems[b].TypeOfDiscount,
                                            CashDiscountPercent: billItems[b].CashDiscountPercent,
                                            DiscountAmount: billItems[b].DiscountAmount,
                                            TotalAmountAfterDiscount: billItems[b].TotalAmountAfterDiscount,
                                            TaxableValue: billItems[b].TaxableValue,
                                            TaxId: billItems[b].TaxId,
                                            GSTRateId: billItems[b].GSTRateId,
                                            GSTRate: billItems[b].GSTRate,
                                            GSTName: billItems[b].GSTName,
                                            GSTAmount: billItems[b].GSTAmount,
                                            GSTAmountAsPerVendorBill: billItems[b].GSTAmountAsPerVendorBill,
                                            TotalItemAmount: billItems[b].TotalItemAmount,
                                            guid: billItems[b].guid,
                                            SrNo: billItems[b].SrNo,
                                            IsDeleted: false
                                        };

                                        purchaseBillItems.push(purchaseBillItem);
                                    }
                                }

                                var billCharges = res[r].PurchaseBillChargesDetails;

                                billCharges = billCharges.filter(function (value, index, array) {
                                    return value.PurchaseBillId === res[r].PurchaseBillId;
                                    //break;
                                });

                                if (billCharges.length > 0) {

                                    for (var bc = 0; bc < billCharges.length; bc++) {

                                        var purchaseBillCharge = {};

                                        purchaseBillCharge = {
                                            PurchaseBillChargeId: billCharges[bc].PurchaseBillChargeId,
                                            PurchaseBillId: billCharges[bc].PurchaseBillId,
                                            ChargeId: billCharges[bc].ChargeId,
                                            ChargeName: billCharges[bc].ChargeName,
                                            ChargeAmount: billCharges[bc].ChargeAmount,
                                            IsTaxInclusive: billCharges[bc].IsTaxInclusive,
                                            GSTRateId: billCharges[bc].GSTRateId,
                                            TaxId: billCharges[bc].TaxId,
                                            GSTName: billCharges[bc].GSTName,
                                            GSTRate: billCharges[bc].GSTRate,
                                            TaxableValue: billCharges[bc].TaxableValue,
                                            GSTAmount: billCharges[bc].GSTAmount,
                                            BillChargeTotalAmount: billCharges[bc].TotalAmount,
                                            Remarks: billCharges[bc].Remarks,
                                            guid: billCharges[bc].guid,
                                            SrNo: billCharges[bc].SrNo,
                                            IsDeleted: false
                                        };

                                        purchaseBillCharges.push(purchaseBillCharge);
                                    }
                                }
                            }

                            bindPurchaseBills();
                        }
                    }
                }
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function bindPurchaseBills() {

        shared.showLoader(DOM.loader);

        var tableBody = DOM.purchaseBillList.tBodies[0];

        tableBody.innerHTML = "";

        if (purchaseBills.length) {

            var data = "";

            for (var r = 0; r < purchaseBills.length; r++) {

                data = data + "<tr data-purchase-bill-id=" + purchaseBills[r].PurchaseBillId + " data-vendor-id=" + purchaseBills[r].VendorId + ">";
                data = data + "<td class='col-xs-1 text-center'><label class='label-tick'> <input type='checkbox' id='" + purchaseBills[r].PurchaseBillId + "' class='label-checkbox' name='SelectPurchaseBill' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td class='col-xs-1 text-center'>" + purchaseBills[r].SrNo + "</td>";
                data = data + "<td class='col-xs-3 text-left'>" + purchaseBills[r].VendorName + "</td>";
                data = data + "<td class='col-xs-1 text-center'>" + purchaseBills[r].PurchaseBillNo + "</td>";
                data = data + "<td class='col-xs-2 text-center'>" + purchaseBills[r].PurchaseBillDate + "</td>";
                data = data + "<td class='col-xs-1 text-center'>" + purchaseBills[r].TotalQty + "</td>";
                data = data + "<td class='col-xs-1 text-center'>" + purchaseBills[r].UnitOfMeasurement + "</td>";
                data = data + "<td class='col-xs-2 text-right'>" + purchaseBills[r].TotalAmount + "</td>";
            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }

        shared.hideLoader(DOM.loader);
    }

    function savePurchaseBill() {

        shared.showLoader(DOM.loader);

        if (validatePurchaseBillDetails()) {

            /* temp variable */
            var purchaseBillId = parseInt(0);
            var vendorId = parseInt(0);
            var vendorName = null;
            var purchaseBillNo = null;
            var purchaseBillDate = null;
            var transporterId = parseInt(0);
            var transporterName = null;
            var challanNo = null;
            var isTaxInclusive = true;
            var isTaxRoundOff = false;
            var isCompositionBill = false;
            var isSample = false;
            var totalGSTAmountAsPerVendorBill = parseFloat(0);
            var branchId = parseInt(0);
            var workingPeriodId = parseInt(0);
            var srNo = parseInt(0);

            purchaseBills.length = 0;
            purchaseBillItems.length = 0;
            
            purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));
            vendorId = parseInt(DOM.vendor.options[DOM.vendor.selectedIndex].value);
            vendorName = DOM.vendor.options[DOM.vendor.selectedIndex].text;
            purchaseBillNo = DOM.purchaseBillNo.value;
            purchaseBillDate = DOM.purchaseBillDate.value;
            transporterId = parseInt(DOM.transporter.options[DOM.transporter.selectedIndex].value);
            transporterName = DOM.transporter.options[DOM.transporter.selectedIndex].text;
            challanNo = DOM.challanNo.value;
            if (DOM.taxInclusive.checked) {
                isTaxInclusive = true;
            }
            else {
                isTaxInclusive = false;
            }
            if (DOM.taxRoundOffYes.checked) {
                isTaxRoundOff = true;
            }
            else {
                isTaxRoundOff = false;
            }
            if (DOM.compositionBillYes.checked) {
                isCompositionBill = true;
            }

            if (DOM.sampleYes.checked) {
                isSample = true;
            }

            //isTaxInclusive = shared.isRadioButtonValueSelected(DOM.isTaxInclusive);
            //isTaxRoundOff = shared.isRadioButtonValueSelected(DOM.isTaxRoundOff);
            totalGSTAmountAsPerVendorBill = parseFloat(DOM.totalGSTAmountAsPerVendorBill.value);
            branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
            workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);

            savePurchaseBillItem();

            if (purchaseBillItems.length === 0) {
                shared.hideLoader(DOM.loader);
                return;
            }

            //if (purchaseBillItems.length === 0) {
            //    swal({
            //        title: "Warning",
            //        text: "No Purchase Bill Items is entered. Please add the items.",
            //        type: "warning",
            //        function() {
            //            DOM.searchItem.focus();
            //            return false;
            //        }
            //    });
            //}

            if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }
            if (isNaN(vendorId)) { vendorId = parseInt(0); }
            if (isNaN(transporterId)) { transporterId = parseInt(0); }

            srNo = getMaxSrNo(purchaseBills, 0);

            purchaseBills = [];

            var purchaseBill = {};

            purchaseBill = {
                PurchaseBillId: purchaseBillId,
                VendorId: vendorId,
                TransporterId: transporterId,
                PurchaseBillNo: purchaseBillNo,
                PurchaseBillDate: purchaseBillDate,
                TransporterName: transporterName,
                ChallanNo: challanNo,
                GSTApplicable: GSTApplicable,
                IsTaxInclusive: isTaxInclusive,
                IsTaxRoundOff: isTaxRoundOff,
                IsCompositionBill: isCompositionBill,
                IsSample: isSample,
                TotalGSTAmountAsPerVendorBill: totalGSTAmountAsPerVendorBill,
                BranchId: branchId,
                WorkingPeriodId: workingPeriodId,
                SrNo: srNo,
                PurchaseBillItems: purchaseBillItems,
                PurchaseBillChargesDetails: purchaseBillCharges,
                IsDeleted: false
            };

            if (parseInt(purchaseBillId) === parseInt(0)) {

                purchaseBill.CreatedBy = LOGGED_USER;
                purchaseBill.CreatedByIp = IP_ADDRESS;
            }
            else {

                purchaseBill.ModifiedBy = LOGGED_USER;
                purchaseBill.ModifiedByIP = IP_ADDRESS;
            }

            //purchaseBills.push(purchaseBill);

            var postData = JSON.stringify(purchaseBill);

            shared.sendRequest(SERVICE_PATH + "SavePurchaseBill", "POST", true, "JSON", postData, function (response) {

                var _response = JSON.parse(response.responseText);

                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Records Saved Successfully. Please note down the below reference no. " + response.responseText,
                            type: "success"
                        }, function () {
                            IsRecordChanged = true;
                            addNewPurchaseBill();
                        });
                    }
                    else if (parseInt(response.responseText) === parseInt(-1)) {
                        swal({
                            title: "Warning",
                            text: "This Purchase Bill No. is already exists for this Vendor.",
                            type: "warning"
                        }, function () {
                            DOM.purchaseBillNo.focus();
                        });
                    }
                }
                else {
                    handleError(_response.Message + " " + _response.ExceptionMessage);
                    swal("error", "Unable to save the Purchase Bill. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
                }
            });
        }

        shared.hideLoader(DOM.loader);
    }

    var checkIsItemExistsInTable = function (itemId) {

        shared.showLoader(DOM.loader);

        var isItemExists = false;

        var table = DOM.purchaseBillItemList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var i = 0; i < tableRows.length; i++) {
                if (parseInt(tableRows[i].getAttribute('data-item-id')) === itemId) {
                    isItemExists = true;
                    break;
                }
            }
        }

        shared.hideLoader(DOM.loader);

        return isItemExists;
    };

    function validateInput(e) {
        return shared.acceptDecimalNos(e);
    }

    function removeBillItem(e) {

        // Remove the item from the Table only if the sales bill item id is 0
        var tableBody = DOM.purchaseBillItemList.tBodies[0];

        var tableRows = tableBody.children;

        var tableRow = e.currentTarget.parentElement.parentElement;

        var purchaseBillItemId = parseInt(tableRow.getAttribute('data-purchase-bill-item-id'));

        if (isNaN(purchaseBillItemId)) { purchaseBillItemId = parseInt(0); }

        tableRow.classList.add('removed-item');

        //setTimeout(function() {
            tableRow.style.display = "none";
        //}, 100);

        //tableBody.removeChild(tableRow);
        
        // Mark the Item as Deleted if the sales bill item id is > 0
        if (purchaseBillItems.length) {
            for (var i = 0; i < purchaseBillItems.length; i++) {
                if (purchaseBillItems[i].PurchaseBillItemId === purchaseBillItemId) {
                    purchaseBillItems[i].IsDeleted = true;
                    purchaseBillItems[i].DeletedBy = parseInt(LOGGED_USER);
                    purchaseBillItems[i].DeletedByIP = IP_ADDRESS;
                    break;
                }
            }
        }

        showGSTBreakup();
        showTotalBillAmount();

    }

    function addNewPurchaseBillItem(response) {

        shared.showLoader(DOM.loader);

        var table = DOM.purchaseBillItemList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var purchaseBillItemId = parseInt(0);
        var itemId = parseInt(0);
        var itemName = null;
        var baleNo = null;
        var lrNo = null;
        var unitCode = null;
        var unitOfMeasurementId = parseInt(0);
        var HSNCode = null;
        var purchaseQty = parseFloat(0);
        var purchaseRate = parseFloat(0);
        var typeOfDiscount = null;
        var cashDiscountPercent = parseFloat(0);
        var GSTRateId = parseInt(0);
        var taxId = parseInt(0);
        var GSTRate = parseFloat(0);
        var taxableValue = parseFloat(0);
        var GSTAmount = parseFloat(0);
        var GSTAmountAsPerVendorBill = parseFloat(0);
        var adjustedGSTAmount = parseFloat(0);
        var totalItemAmount = parseFloat(0);

        purchaseBillItemId = parseInt(response.PurchaseBillItemId);
        baleNo = response.BaleNo;
        lrNo = response.LRNo;
        itemId = parseInt(response.ItemId);
        itemName = response.ItemName;
        unitCode = response.UnitCode;
        unitOfMeasurementId = response.UnitOfMeasurementId;
        HSNCode = response.HSNCode;
        purchaseQty = response.PurchaseQty;
        purchaseRate = response.PurchaseRate;
        typeOfDiscount = response.TypeOfDiscount;
        cashDiscountPercent = parseFloat(response.CashDiscountPercent);
        GSTRateId = parseInt(response.GSTRateId);
        taxId = parseInt(response.TaxId);
        GSTRate = parseFloat(response.GSTRate);
        taxableValue = parseFloat(response.TaxableValue);
        GSTAmount = parseFloat(response.GSTAmount);
        GSTAmountAsPerVendorBill = parseFloat(response.GSTAmountAsPerVendorBill);
        adjustedGSTAmount = parseFloat(0);
        totalItemAmount = parseFloat(response.TotalItemAmount);
        
        if (unitCode === undefined) { unitCode = "PCS"; }

        //if (purchaseBillItemId === 0) {
        //    if (checkIsItemExistsInTable(itemId)) {
        //        DOM.searchItem.value = "";
        //        DOM.searchItem.removeAttribute('data-item-id');
        //        DOM.searchItem.focus();
        //        swal("Warning", "This Item Name is already exists.", "warning");
        //        return;
        //    }
        //}

        var data = "";

        var tr =  shared.createElement('tr');

        var DOM_selectItemContainer = shared.createElement('td');
        var DOM_checkboxLabel = shared.createElement('label', undefined, 'label-tick', );
        var DOM_checkboxSpan = shared.createElement('span', undefined, 'label-text');
        var DOM_selectItem = shared.createElement('input', 'checkbox', 'label-checkbox', 'SelectPurchaseBillItem', 'cb' + purchaseBillItemId);

        var DOM_removeButton = shared.createElement('button', 'button', 'btn btn-xs btn-danger btn-round', 'Remove' + purchaseBillItemId);
        var DOM_removeFontIcon = shared.createElement('span', undefined, 'fa fa-fw fa-remove', 'Remove' + purchaseBillItemId);

        var DOM_baleNoContainer = shared.createElement('td');
        var DOM_baleNo = shared.createElement('input', 'text', 'form-control input-sm text-center', 'BaleNo', 'BaleNo' + purchaseBillItemId);

        var DOM_LRNoContainer = shared.createElement('td');
        var DOM_LRNo = shared.createElement('input', 'text', 'form-control input-sm text-center', 'LRNo', 'LRNo' + purchaseBillItemId);

        var DOM_hsnCodeContainer = shared.createElement('td');

        var DOM_itemNameContainer = shared.createElement('td');

        var DOM_UoMContainer = shared.createElement('td');
        var DOM_UoM = shared.createElement('select', '', 'form-control input-sm text-center', 'UnitOfMeasurement', 'UoM' + purchaseBillItemId);

        var DOM_purchaseQtyContainer = shared.createElement('td');
        var DOM_purchaseQty = shared.createElement('input', 'text', 'form-control input-sm text-center', 'PurchaseQty', 'PurchaseQty' + purchaseBillItemId);
                
        var DOM_purchaseRateContainer = shared.createElement('td');
        var DOM_purchaseRate = shared.createElement('input', 'text', 'form-control input-sm text-center', 'PurchaseRate', 'PurchaseRate' + purchaseBillItemId);

        var DOM_typeOfDiscountContainer = shared.createElement('td');
        var DOM_typeOfDiscount = shared.createElement('select', '', 'form-control input-sm', 'TypeOfDiscount', 'TypeOfDiscount' + purchaseBillItemId);

        var DOM_discountRateContainer = shared.createElement('td');
        var DOM_discountRate = shared.createElement('input', 'text', 'form-control input-sm text-center', 'DiscountRate', 'DiscRate' + purchaseBillItemId);

        var DOM_taxableValueContainer = shared.createElement('td');
        var DOM_taxableValue = shared.createElement('input', 'text', 'form-control input-sm text-center', 'TaxableVlue', 'TaxableValue' + purchaseBillItemId);

        var DOM_GSTRateContainer = shared.createElement('td');
        var DOM_GSTRate = shared.createElement('input', 'text', 'form-control input-sm text-center', 'GSTRate', 'GSTRate' + purchaseBillItemId);

        var DOM_GSTAmountContainer = shared.createElement('td');
        var DOM_GSTAmount = shared.createElement('input', 'text', 'form-control input-sm text-center', 'GSTAmount', 'GSTAmount' + purchaseBillItemId);

        var DOM_GSTAmountAsPerVendorBillContainer = shared.createElement('td');
        var DOM_GSTAmountAsPerVendorBill = shared.createElement('input', 'text', 'form-control input-sm text-center', 'GSTAmountAsPerVendorBill', 'GSTAmountAsPerVendorBill' + purchaseBillItemId);

        var DOM_adjustedGSTAmountContainer = shared.createElement('td');
        var DOM_adjustedGSTAmount = shared.createElement('input', 'text', 'form-control input-sm text-center', 'AdjustedGSTAmount', 'AdjustedGSTAmount' + purchaseBillItemId);

        var DOM_totalItemAmountContainer = shared.createElement('td');
        var DOM_totalItemAmount = shared.createElement('input', 'text', 'form-control input-sm text-right', 'TotalItemAmount', 'TotalItemAmount' + purchaseBillItemId);

        DOM_taxableValue.disabled = true;
        DOM_GSTRate.disabled = true;
        DOM_GSTAmount.disabled = true;
        DOM_adjustedGSTAmount.disabled = true;
        DOM_totalItemAmount.disabled = true;

        DOM_removeButton.onclick = removeBillItem;

        DOM_purchaseQty.onkeydown = validateInput;
        DOM_purchaseQty.onblur = calculateItemAmount;

        DOM_purchaseRate.onkeydown = validateInput;
        DOM_purchaseRate.onblur = calculateItemAmount;

        DOM_discountRate.onkeydown = validateInput;
        DOM_discountRate.onblur = calculateItemAmount;

        DOM_GSTAmountAsPerVendorBill.onkeydown = validateInput;
        DOM_GSTAmountAsPerVendorBill.onblur = calculateAdjustedGSTAmountAndSetFocus;

        //checkboxLabel.appendChild(selectItem);
        //checkboxLabel.appendChild(checkboxSpan);
        //selectItemContainer.appendChild(checkboxLabel);
        DOM_removeButton.appendChild(DOM_removeFontIcon);
        DOM_selectItemContainer.appendChild(DOM_removeButton);
        DOM_baleNoContainer.appendChild(DOM_baleNo);
        DOM_LRNoContainer.appendChild(DOM_LRNo);
        DOM_UoMContainer.appendChild(DOM_UoM);
        DOM_purchaseQtyContainer.appendChild(DOM_purchaseQty);        
        DOM_purchaseRateContainer.appendChild(DOM_purchaseRate);
        DOM_typeOfDiscountContainer.appendChild(DOM_typeOfDiscount);
        DOM_discountRateContainer.appendChild(DOM_discountRate);
        DOM_taxableValueContainer.appendChild(DOM_taxableValue);
        DOM_GSTRateContainer.appendChild(DOM_GSTRate);
        DOM_GSTAmountContainer.appendChild(DOM_GSTAmount);
        DOM_GSTAmountAsPerVendorBillContainer.appendChild(DOM_GSTAmountAsPerVendorBill);
        DOM_adjustedGSTAmountContainer.appendChild(DOM_adjustedGSTAmount);
        DOM_totalItemAmountContainer.appendChild(DOM_totalItemAmount);

        bindUnitOfMeasurements(DOM_UoM, 8);
        getDiscountOptions(DOM_typeOfDiscount);

        // Set Item
        tr.setAttribute('data-purchase-bill-item-id', purchaseBillItemId);        
        tr.setAttribute('data-item-id', itemId);
        tr.setAttribute('data-gst-rate-id', GSTRateId);
        tr.setAttribute('data-tax-id', taxId);
        tr.setAttribute('data-gst-rate', GSTRate);
        tr.setAttribute('data-taxable-value', taxableValue);

        DOM_baleNo.value = baleNo;
        DOM_LRNo.value = lrNo;
        DOM_hsnCodeContainer.innerHTML = HSNCode;
        DOM_itemNameContainer.innerHTML = itemName;
        shared.setSelectValue(DOM_UoM, null, unitOfMeasurementId);
        shared.setSelect2ControlsText(DOM_UoM);
        DOM_purchaseQty.value = parseFloat(purchaseQty);
        DOM_purchaseRate.value = parseFloat(purchaseRate);
        shared.setSelectValue(DOM_typeOfDiscount, typeOfDiscount, null);
        shared.setSelect2ControlsText(DOM_typeOfDiscount);                    
        DOM_discountRate.value = parseFloat(cashDiscountPercent);
        DOM_taxableValue.value = parseFloat(taxableValue);
        DOM_GSTRate.value = parseFloat(GSTRate);
        DOM_GSTAmount.value = parseFloat(GSTAmount);
        DOM_GSTAmountAsPerVendorBill.value = parseFloat(GSTAmountAsPerVendorBill); 
        DOM_adjustedGSTAmount.value = parseFloat(adjustedGSTAmount);
        DOM_totalItemAmount.value = parseFloat(totalItemAmount);

        tr.appendChild(DOM_selectItemContainer);
        tr.appendChild(DOM_baleNoContainer);
        tr.appendChild(DOM_LRNoContainer);        
        tr.appendChild(DOM_hsnCodeContainer);
        tr.appendChild(DOM_itemNameContainer);
        tr.appendChild(DOM_UoMContainer);
        tr.appendChild(DOM_purchaseQtyContainer);        
        tr.appendChild(DOM_purchaseRateContainer);
        tr.appendChild(DOM_typeOfDiscountContainer);
        tr.appendChild(DOM_discountRateContainer);
        tr.appendChild(DOM_taxableValueContainer);
        tr.appendChild(DOM_GSTRateContainer);
        tr.appendChild(DOM_GSTAmountContainer);
        tr.appendChild(DOM_GSTAmountAsPerVendorBillContainer);
        tr.appendChild(DOM_adjustedGSTAmountContainer);
        tr.appendChild(DOM_totalItemAmountContainer);

        tableBody.appendChild(tr);

        if (purchaseBillItemId === 0) {
            var event = new Event('onblur');
            DOM_purchaseRate.addEventListener('onblur', calculateItemAmount);
            DOM_purchaseRate.dispatchEvent(event);

            DOM.searchItem.value = "";
            DOM.searchItem.removeAttribute('data-item-id');
            DOM_baleNo.focus();
        }

        shared.hideLoader(DOM.loader);
    }

    function calculateItemAmountAndSetFocus(e) {
        calculateItemAmount(e);
        setFocusToSearchItem(e);
    }

    function calculateAdjustedGSTAmountAndSetFocus(e) {
        calculateAdjustedGSTAmount(e);
        setFocusToSearchItem(e);
    }

    function setFocusToSearchItem(e) {

        var tableRow = e.currentTarget.parentElement.parentElement;

        var tableBody = tableRow.parentElement;

        var tableRows = tableBody.children;

        if (tableRow.rowIndex === tableRows.length) {

            DOM.searchItem.focus();

        }
        
    }

    function calculateAdjustedGSTAmount(e) {

        var tableRow = e.currentTarget.parentElement.parentElement;

        var inputs = tableRow.querySelectorAll("input[type='text']");

        var taxableValue = parseFloat(0);
        var GSTAmount = parseFloat(0);
        var GSTAmountAsPerBill = parseFloat(0);
        var adjustedGSTAmount = parseFloat(0);
        var totalItemAmount = parseFloat(0);

        taxableValue = parseFloat(inputs[5].value);
        GSTAmount = parseFloat(inputs[7].value);
        GSTAmountAsPerBill = parseFloat(inputs[8].value);

        adjustedGSTAmount = parseFloat(parseFloat(parseFloat(GSTAmountAsPerBill) - parseFloat(GSTAmount)).toFixed(2));

        totalItemAmount = parseFloat(parseFloat(taxableValue + GSTAmount + adjustedGSTAmount).toFixed(2));

        inputs[9].value = adjustedGSTAmount;

        inputs[10].value = totalItemAmount;

        showTotalBillAmount();

    }

    function calculateItemAmount(e) {

        shared.showLoader(DOM.loader);

        var itemId = parseInt(0);
        var purchaseQty = parseFloat(0);
        var unitOfMeasurementId = parseInt(0);
        var unitOfMeasurement = null;
        var purchaseRate = parseFloat(0);
        var amount = parseFloat(0);
        var cashDiscountPercent = parseFloat(0);
        var cashDiscountAmt = parseFloat(0);
        var rateDifference = parseFloat(0);
        var rateAfterCDRD = parseFloat(0);
        var taxableValue = parseFloat(0);
        var gstRate = parseFloat(0);
        var gstAmount = parseFloat(0);
        var totalItemAmount = parseFloat(0);
        var gstExclAmount = parseFloat(0);
        var gstInclAmount = parseFloat(0);
        var gstRateId = parseInt(0);
        var taxId = parseInt(0);

        var HSNCode = "";

        var tableRow = e.currentTarget.parentElement.parentElement;

        var inputs = tableRow.querySelectorAll("input[type='text']");

        var select = tableRow.querySelectorAll("select");

        itemId = parseInt(tableRow.getAttribute('data-item-id'));
        HSNCode = tableRow.children[3].innerHTML;
        unitofMeasurementId =parseInt(select[0].options[select[0].selectedIndex].value);
        unitOfMeasurement = select[0].options[select[0].selectedIndex].text;        
        purchaseQty = parseFloat(inputs[2].value);
        purchaseRate = parseFloat(inputs[3].value);
        typeOfDiscount = select[1].options[select[1].selectedIndex].text;
        cashDiscountPercent = parseFloat(inputs[4].value);
        
        if (typeOfDiscount.toUpperCase() === "CASH DISCOUNT") {

            cashDiscountAmt = parseFloat(parseFloat(purchaseRate * (cashDiscountPercent / 100)).toFixed(2));
        }
        else {
            cashDiscountAmt = cashDiscountPercent;
        }
        
        amount = parseFloat(purchaseQty * (purchaseRate - cashDiscountAmt));

        if (amount > 0) {

            var rate = 0;

            getGSTRateByItemIdAndPurchaseRate(itemId, purchaseRate, function (response) {

                rate = response.Rate;

                if (rate >= 0) {

                    gstRate = rate;

                    gstRateId = parseInt(response.GSTRateId);
                    taxId = parseInt(response.TaxId);

                    tableRow.setAttribute('data-gst-rate-id', gstRateId);
                    tableRow.setAttribute('data-tax-id', taxId);
                    tableRow.setAttribute('data-gst-rate', gstRate);
                    
                    if (DOM.isTaxInclusive[0].checked === true) {

                        gstExclAmount = parseFloat(parseFloat(parseFloat(amount * 100) / (gstRate + 100)).toFixed(2));

                        taxableValue = gstExclAmount;

                        gstAmount = parseFloat(parseFloat(gstExclAmount * (gstRate / 100)).toFixed(2));

                    }
                    else {
                        
                        taxableValue = amount;

                        gstAmount =  parseFloat(parseFloat(parseFloat(amount) * (gstRate / 100)).toFixed(2));
                    }

                    tableRow.setAttribute('data-taxable-value', taxableValue);

                    inputs[5].value = taxableValue;
                    inputs[6].value = gstRate;
                    inputs[7].value = gstAmount;
                    inputs[8].value = gstAmount;

                    //if (parseFloat(parseFloat(inputs[8].value).toFixed(2)) === 0) {

                    //    inputs[8].value = gstAmount;

                    //}

                    //if (parseFloat(parseFloat(inputs[7].value).toFixed(2)) !== parseFloat(parseFloat(inputs[8].value).toFixed(2))) {
                        
                    //    inputs[9].value = parseFloat(parseFloat(inputs[7].value).toFixed(2)) - parseFloat(parseFloat(inputs[8].value).toFixed(2));

                    //}
                    
                    totalItemAmount = parseFloat(parseFloat(taxableValue + gstAmount).toFixed(2));

                    inputs[10].value = totalItemAmount;
                    
                    showGSTBreakup();

                    showTotalBillAmount();                    
                }
            });
        }
        else {

            inputs[10].value = totalItemAmount;

            showGSTBreakup();

            showTotalBillAmount();
        }

        shared.hideLoader(DOM.loader);        
    }

    function showGSTBreakup() {

        DOM.gstBreakup.tBodies[0].innerHTML = "";

        var table = DOM.purchaseBillItemList;
        var tableBody = table.tBodies[0];
        var tableRows = tableBody.children;
        
        if (tableRows.length) {

            var data = "";
    
            for (var g = 0; g < tableRows.length; g++) {

                if (tableRows[g].style.display !== "none") {
                    
                    var taxableValue = parseFloat(tableRows[g].getAttribute('data-taxable-value'));
                    var gstRate = parseFloat(tableRows[g].getAttribute('data-gst-rate'));

                    var SGSTAmount = parseFloat(parseFloat(taxableValue * (gstRate * (50 / 100)) / 100).toFixed(2));
                    var CGSTAmount = parseFloat(parseFloat(taxableValue * (gstRate * (50 / 100)) / 100).toFixed(2));
                    var IGSTAmount = parseFloat(0);
                    var totalGSTAmount = parseFloat(0);

                    totalGSTAmount = SGSTAmount + CGSTAmount + IGSTAmount;

                    data = data + "<tr>";
                    //data = data + "<td class='text-center'>" + tableRows[g].children[3].innerHTML + "</td>";
                    data = data + "<td class='text-center'>" + tableRows[g].children[3].innerHTML + "</td>";
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

        var table = DOM.purchaseBillItemList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                if (tableRows[tr].style.display !== "none") {

                    var totalItemAmount = tableRows[tr].children[15].children[0];

                    totalBillAmount += parseFloat(totalItemAmount.value);
                }
            }

            var totalBillChargesAmount = 0;

            totalBillChargesAmount = getBillChargesTotalAmount();

            totalBillAmount = totalBillAmount + totalBillChargesAmount;

            DOM.totalBillAmount.innerHTML = shared.roundOff(totalBillAmount,0);
        }

        shared.hideLoader(DOM.loader);
    }


    var getBillChargesTotalAmount = function() {

        var totalChargeAmount = 0;

        var table = DOM.billChargesList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                if (tableRows[tr].style.display !== "none") {

                    totalChargeAmount += parseFloat(tableRows[tr].children[5].innerText);
                }
            }
        }

        return totalChargeAmount;
    };

    function getGSTRateByItemIdAndPurchaseRate(itemId, purchaseRate, callback) {

        shared.showLoader(DOM.loader);

        var gstRate = parseInt(0);
        
        var gstr = {};

        gstr = {
            ItemId: itemId,
            GSTApplicable: GSTApplicable,
            Rate: purchaseRate,
            EffectiveFromDate: DOM.purchaseBillDate.value
        };

        var postData = JSON.stringify(gstr);

        shared.sendRequest(SERVICE_PATH + "GetGSTRateByItemIdGSTApplicableAndSaleRate/", "POST", true, "JSON", postData, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res.Rate >= 0) {

                        gstRate = res;

                        callback(gstRate);
                    }
                }
            }
        });

        shared.hideLoader(DOM.loader);

    }


    function saveAndAddNewPurchaseBillItem() {

        savePurchaseBillItem();

        //Clear the Bale No. and keep rest of the controls data as it is
        DOM.baleNo.value = "";

        DOM.baleNo.focus();

    }

    function validatePurchaseBillDetails() {

        var isValid = true;

        if (DOM.vendor.selectedIndex === 0) {
            DOM.vendor.focus();
            swal("Error!!!", "Please select the Vendor Name.", "error");
            isValid = false;
        }
        else if (DOM.purchaseBillNo.value === "") {
            DOM.purchaseBillNo.focus();
            swal("Error!!!", "Please enter the Purchase Bill No.", "error");
            isValid = false;
        }
        else if (DOM.purchaseBillDate.value === "") {
            DOM.purchaseBillDate.focus();
            swal("Error!!!", "Please enter the Purchase Bill Date.", "error");
            isValid = false;
        }
        else if (DOM.transporter.selectedIndex === 0) {
            DOM.transporter.focus();
            swal("Error!!!", "Please select the Transporter.", "error");
            isValid = false;
        }
        
        return isValid;
    }

    
    //function showSelectedBillDetails(currentTableRow) {

    //    shared.showLoader(DOM.loader);

    //    if (purchaseBills.length > 0) {

    //        var purchaseBillId = parseInt(currentTableRow.getAttribute('data-purchase-bill-id'));

    //        DOM.purchaseBillNo.setAttribute('data-purchase-bill-id', purchaseBillId);

    //        var srNo = parseInt(currentTableRow.getAttribute('data-sr-no'));

    //        var data = purchaseBills.filter(function (value, index, array) {

    //            if (purchaseBillId > 0) {
    //                return value.PurchaseBillId === purchaseBillId
    //                    && (value.IsDeleted === false || value.IsDeleted === null);
    //            }
    //            else {
    //                return value.SrNo === parseInt(srNo)
    //                    && (value.IsDeleted === false || value.IsDeleted === null);
    //            }

    //        });

    //        if (data.length > 0) {

    //            shared.setSelectValue(DOM.financialYear, null, parseInt(data[0].WorkingPeriodId));
    //            shared.setSelect2ControlsText(DOM.financialYear);
    //            shared.setSelectValue(DOM.branch, null, parseInt(data[0].BranchId));
    //            shared.setSelect2ControlsText(DOM.branch);
    //            shared.setSelectValue(DOM.vendor, null, parseInt(data[0].VendorId));
    //            shared.setSelect2ControlsText(DOM.vendor);
    //            DOM.purchaseBillNo.value = data[0].PurchaseBillNo;
    //            DOM.purchaseBillDate.value = data[0].PurchaseBillDate;
    //            shared.setSelectValue(DOM.transporter, null, parseInt(data[0].TransporterId));
    //            shared.setSelect2ControlsText(DOM.transporter);                
    //            DOM.challanNo.value = data[0].ChallanNo;
    //            if (data[0].IsTaxInclusive) {
    //                DOM.isTaxInclusive[0].checked = true;
    //            }
    //            else {
    //                DOM.isTaxInclusive[1].checked = true;
    //            }
    //            if (data[0].IsTaxRoundOff) {
    //                DOM.isTaxRoundOff[0].checked = true;
    //            }
    //            else {
    //                DOM.isTaxRoundOff[1].checked = true;
    //            }
    //            //shared.setCheckboxValue(DOM.isTaxInclusive, null, data[0].IsTaxInclusive);
    //            //shared.setCheckboxValue(DOM.isTaxRoundOff, null, data[0].IsTaxRoundOff);

    //            bindPurchaseBillItems(purchaseBillId);

    //            shared.showPanel(DOM.editMode);
    //            shared.hidePanel(DOM.viewMode);
    //        }
    //    }

    //    shared.showLoader(DOM.loader);
    //}

    
    function addNewBillCharge() {

        shared.showLoader(DOM.loader);

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

        shared.hideLoader(DOM.loader);
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

                    var purchaseBillChargeId = parseInt(currentTableRow.getAttribute('data-purchase-bill-charge-id'));

                    if (isNaN(purchaseBillChargeId)) { purchaseBillChargeId = 0; }

                    DOM.purchaseBillChargeId.value = purchaseBillChargeId;

                    showSelectedBillChargeDetails(purchaseBillId);
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

                    var purchaseBillChargeId = parseInt(currentTableRow.getAttribute('data-purchase-bill-charge-id'));
                    var billChargeId = parseInt(currentTableRow.getAttribute('data-bill-charge-id'));

                    if (isNaN(purchaseBillChargeId)) { purchaseBillChargeId = 0; }

                    if (isNaN(billChargeId)) { billChargeId = 0; }

                    DOM.purchaseBillChargeId.value = purchaseBillChargeId;
                    
                    showBillCharges(purchaseBillChargeId, billChargeId);
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

    function deleteBillCharges() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.billChargesList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.billChargesList);

            var selectedRowsCount = selectedRows.length;

            if (selectedRowsCount > 0) {

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

                            for (var r = 0; r < selectedRowsCount; r++) {

                                if (selectedRows[r].PurchaseBillChargeId === 0) {
                                    tableBody.removeChild(selectedRows[r]);
                                }
                                else {

                                    var purchaseBillId = 0;
                                    var purchaseBillChargeId = 0;
                                    var billChargeId = 0;
                                    var message = null;

                                    purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));
                                    purchaseBillChargeId = parseInt(selectedRows[r].getAttribute('data-purchase-bill-charge-id'));
                                    billChargeId = parseInt(selectedRows[r].getAttribute('data-bill-charge-id'));

                                    if (purchaseBillCharges.length) {

                                        var purchaseBillChargesCount = purchaseBillCharges.length;

                                        for (var c = 0; c < purchaseBillChargesCount; c++) {

                                            if (purchaseBillChargeId > 0) {

                                                if (purchaseBillCharges[c].PurchaseBillId === purchaseBillId &&
                                                    purchaseBillCharges[c].PurchaseBillChargeId === purchaseBillChargeId
                                                    && purchaseBillCharges[c].ChargeId === billChargeId
                                                    && purchaseBillCharges[c].IsDeleted === false) {

                                                    purchaseBillCharges[c].PurchaseBillId = purchaseBillId;
                                                    purchaseBillCharges[c].PurchaseBillChargeId = purchaseBillChargeId;
                                                    purchaseBillCharges[c].IsDeleted = true;
                                                    purchaseBillCharges[c].DeletedBy = LOGGED_USER;
                                                    purchaseBillCharges[c].DeletedByIP = IP_ADDRESS;
                                                }
                                            }
                                            else {

                                                if (parseInt(purchaseBillCharges[c].PurchaseBillId) === purchaseBillId
                                                    && parseInt(purchaseBillCharges[c].ChargeId) === billChargeId) {
                                                    purchaseBillCharges.splice(i, 1);

                                                }
                                            }

                                            swal({
                                                title: "Success",
                                                text: "Purchase Bill Charges Removed successfully. Click on top Save button to Update the Records once you finished updation of Bill Charges.",
                                                type: "success"
                                            }, function () {
                                                bindBillCharges(purchaseBillId);
                                            });
                                        }

                                        shared.hideLoader(DOM.loader);
                                    }
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

    function showBillCharges(purchaseBillChargeId, billChargeId) {

        shared.showLoader(DOM.loader);

        if (purchaseBillCharges.length > 0) {

            //var purchaseBillChargeId = parseInt(currentTableRow.getAttribute('data-purchase-bill-charge-id'));

            //var srNo = parseInt(currentTableRow.getAttribute('data-sr-no'));

            //DOM.purchaseBillChargesSrNo.value = srNo;

            //DOM.purchaseBillChargeId.value = purchaseBillChargeId;

            var billCharges = purchaseBillCharges.filter(function (value, index, array) {
                return value.PurchaseBillChargeId === purchaseBillChargeId
                    && value.ChargeId === parseInt(billChargeId);
            });

            if (billCharges.length > 0) {

                shared.setSelectValue(DOM.billChargeName, null, parseInt(billCharges[0].ChargeId));
                shared.setSelect2ControlsText(DOM.billChargeName);
                DOM.billChargeAmount.value = billCharges[0].ChargeAmount;
                if (billCharges[0].IsTaxInclusive === true) {
                    DOM.billChargeTaxInclusive.checked = true;
                }
                else {
                    DOM.billChargeTaxExclusive.checked = true;
                }
                DOM.billChargeGSTRate.value = billCharges[0].GSTRate;
                DOM.billChargeGSTAmount.value = billCharges[0].GSTAmount;
                DOM.billChargeTotalAmount.value = billCharges[0].ChargeTotalAmount;
                
                shared.showPanel(DOM.billChargesEditMode);
                shared.hidePanel(DOM.billChargesViewMode);
            }
        }

        shared.hideLoader(DOM.loader);
    }

    function addBillCharge(billCharge) {

        shared.showLoader(DOM.loader);

        var srNo = getMaxSrNo(purchaseBillCharges, 0);

        var purchaseBillCharge = {};

        purchaseBillCharge = {
            PurchaseBillChargeId: billCharge.PurchaseBillChargeId,
            PurchaseBillId: billCharge.PurchaseBillId,
            ChargeId: billCharge.ChargeId,
            ChargeName: billCharge.ChargeName,
            ChargeAmount: billCharge.ChargeAmount,
            IsTaxInclusive: billCharge.IsTaxInclusive,
            TaxableValue: billCharge.TaxableValue,
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

        purchaseBillCharges.push(purchaseBillCharge);

        shared.hideLoader(DOM.loader);
    }

    function updateBillCharge(billCharge) {

        shared.showLoader(DOM.loader);

        var billChargesCount = purchaseBillCharges.length;

        if (billChargesCount > 0) {

            for (var r = 0; r < billChargesCount; r++) {

                if (purchaseBillCharges[r].PurchaseBillChargeId === billCharge.PurchaseBillChargeId
                    && purchaseBillCharges[r].ChargeId === billCharge.ChargeId) {

                    purchaseBillCharges[r].PurchaseBillChargeId = billCharge.PurchaseBillChargeId;
                    purchaseBillCharges[r].PurchaseBillId = billCharge.PurchaseBillId;
                    purchaseBillCharges[r].ChargeId = billCharge.ChargeId;
                    purchaseBillCharges[r].ChargeName = billCharge.ChargeName;
                    purchaseBillCharges[r].ChargeAmount = billCharge.ChargeAmount;
                    purchaseBillCharges[r].TaxId = billCharge.TaxId;
                    purchaseBillCharges[r].GSTRate = billCharge.GSTRate;
                    purchaseBillCharges[r].GSTAmount = billCharge.GSTAmount;
                    purchaseBillCharges[r].BillChargeTotalAmount = billCharge.BillChargeTotalAmount;
                    purchaseBillCharges[r].SrNo = billCharge.SrNo;
                    purchaseBillCharges[r].GSTRateId = billCharge.GSTRateId;
                    purchaseBillCharges[r].Remarks = billCharge.Remarks;
                    purchaseBillCharges[r].IsDeleted = false;

                    if (purchaseBillCharges[r].PurchaseBillChargeId === 0) {
                        purchaseBillCharges[r].CreatedBy = parseInt(LOGGED_USER);
                        purchaseBillCharges[r].CreatedByIP = IP_ADDRESS;
                    }
                    else {
                        purchaseBillCharges[r].ModifiedBy = parseInt(LOGGED_USER);
                        purchaseBillCharges[r].ModifiedByIP = IP_ADDRESS;
                    }

                    break;
                }
            }
        }

        shared.hideLoader(DOM.loader);
    }

    function getBillCharges() {

        shared.showPanel(DOM.billChargesViewMode);
        shared.hidePanel(DOM.billChargesEditMode);
    }
        
    var validateBillCharges = function () {

        var isValid = true;

        return isValid;
    };

    function bindBillCharges(purchaseBillId) {

        shared.showLoader(DOM.loader);

        var table = DOM.billChargesList;

        var tableBody = table.tBodies[0];
        var tableFooter = table.tFoot;

        tableBody.innerHTML = "";
        tableFooter.innerHTML = "";

        if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }

        if (purchaseBillCharges.length > 0) {

            var billCharges = purchaseBillCharges.filter(function (value, index, array) {
                return value.PurchaseBillId === parseInt(purchaseBillId) &&
                    value.IsDeleted === false;
            });

            var itemsCount = billCharges.length;

            if (itemsCount > 0) {

                var totalChargeAmount = parseFloat(0);
                var totalTaxableValue = parseFloat(0);
                var totalGSTAmount = parseFloat(0);
                var totalBillChargeAmount = parseFloat(0);

                var data = "";
                
                for (var r = 0; r < itemsCount; r++) {

                    data = data + "<tr data-purchase-bill-charge-id=" + billCharges[r].PurchaseBillChargeId + " data-bill-charge-id=" + billCharges[r].ChargeId + ">";
                    data = data + "<td class='text-center'><label class='label-tick'> <input type='checkbox' id='" + billCharges[r].PurchaseBillChargeId + "' class='label-checkbox' name='SelectPurchaseBillCharge' /> <span class='label-text'></span> </label>" + "</td>";
                    data = data + "<td>" + billCharges[r].ChargeName + "</td>";
                    data = data + "<td class='text-center'>" + billCharges[r].ChargeAmount + "</td>";
                    data = data + "<td class='text-center'>" + billCharges[r].GSTRate + "</td>";
                    data = data + "<td class='text-center'>" + billCharges[r].GSTAmount + "</td>";
                    data = data + "<td class='text-center'>" + billCharges[r].BillChargeTotalAmount + "</td>";

                    totalChargeAmount += parseFloat(billCharges[r].ChargeAmount);
                    totalTaxableValue += parseFloat(billCharges[r].TaxableValue);
                    totalGSTAmount += parseFloat(billCharges[r].GSTAmount);
                    totalBillChargeAmount += parseFloat(billCharges[r].BillChargeTotalAmount);
                }

                tableBody.innerHTML = data;

                var footerRow = document.createElement('tr');
                footerRow.classList.add('bg-amber-100');

                var footerData = '';

                footerData += "<td class='text-center text-bold text-size-medium'></td>";
                footerData += "<td class='text-center text-bold text-size-medium'> Total </td>";
                footerData += "<td class='text-center text-bold text-size-medium'>" + totalChargeAmount + "</td>";
                footerData += "<td class='text-center text-bold text-size-medium'></td>";
                footerData += "<td class='text-center text-bold text-size-medium'>" + totalGSTAmount + "</td>";
                footerData += "<td class='text-center text-bold text-size-medium'>" + totalBillChargeAmount + "</td>";
                footerData += "<td class='text-center text-bold text-size-medium'></td>";

                footerRow.innerHTML = footerData;

                tableFooter.appendChild(footerRow);
            }

            shared.showPanel(DOM.billChargesViewMode);
            shared.hidePanel(DOM.billChargesEditMode);
        }

        showTotalBillAmount();

        shared.hideLoader(DOM.loader);
    }

    function saveAndAddNewBillCharge() {

        saveBillCharge();

        addNewBillCharge();

        DOM.billChargeName.focus();
    }

    function calculateGSTOnBillChargeAmount() {

        shared.showLoader(DOM.loader);

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
                DOM.billChargeGSTAmount.setAttribute('data-taxable-value', taxableValue);
                DOM.billChargeTotalAmount.value = shared.roundOff(taxableValue + gstAmount, 2);
            }
        });

        shared.hideLoader(DOM.loader);
    }

    var getGSTRateAsPerGSTCategoryId = function (callback) {

        shared.showLoader(DOM.loader);

        var gstRate = 0;
        var gstCategoryId = parseInt(0);

        var gstRateDetails = {};

        gstCategoryId = parseInt(DOM.billChargeName.options[DOM.billChargeName.selectedIndex].getAttribute('data-gstcategoryid'));

        if (isNaN(gstCategoryId)) { gstCategoryId = 0; }

        if (gstCategoryId > 0) {

            gstRateDetails = {
                GSTCategoryId: gstCategoryId,
                GSTApplicable: GSTApplicable,
                EffectiveFromDate: DOM.purchaseBillDate.value
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

        shared.hideLoader(DOM.loader);

    };
    
    function saveBillCharge() {

        if (validateBillCharges() === true) {

            var purchaseBillChargeId = parseInt(0);
            var purchaseBillId = parseInt(0);
            var billChargeId = parseInt(0);
            var billChargeName = null;
            var isTaxInclusive = true;
            var billChargeGSTRate = parseFloat(0);
            var billChargeGSTAmount = parseFloat(0);
            var taxableValue = 0;
            var billChargeTotalAmount = parseFloat(0);
            var taxId = parseInt(0);
            var gstRateId = parseInt(0);
            var srNo = parseInt(0);
            var flag = "add";

            purchaseBillChargeId = parseInt(DOM.purchaseBillChargeId.value);
            purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));
            billChargeId = parseInt(DOM.billChargeName.options[DOM.billChargeName.selectedIndex].value);
            billChargeName = DOM.billChargeName.options[DOM.billChargeName.selectedIndex].text;
            if (DOM.billChargeTaxInclusive.checked === true) {
                isTaxInclusive = true;
            }
            else {
                isTaxInclusive = false;
            }
            billChargeAmount = parseFloat(DOM.billChargeAmount.value);
            billChargeGSTRate = parseFloat(parseFloat(DOM.billChargeGSTRate.value).toFixed(2));
            billChargeGSTAmount = parseFloat(parseFloat(DOM.billChargeGSTAmount.value).toFixed(2));
            taxableValue = parseFloat(DOM.billChargeGSTAmount.getAttribute('data-taxable-value'));
            billChargeTotalAmount = parseFloat(parseFloat(DOM.billChargeTotalAmount.value).toFixed(2));
            taxId = parseInt(DOM.billChargeGSTRate.getAttribute('data-tax-id'));
            gstRateId = parseInt(DOM.billChargeGSTRate.getAttribute('data-gst-rate-id'));
            srNo = 0; //parseInt(DOM.purchaseBillChargesSrNo.value);
            
            if (isNaN(purchaseBillChargeId)) { purchaseBillChargeId = parseInt(0); }
            if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }
            if (isNaN(billChargeId)) { billChargeId = parseInt(0); }
            if (isNaN(taxId)) { taxId = parseInt(0); }
            if (isNaN(gstRateId)) { gstRateId = parseInt(0); }
            if (isNaN(srNo)) { srNo = parseInt(0); }

            var billChargesCount = purchaseBillCharges.length;

            if (billChargesCount > 0) {

                for (var c = 0; c < billChargesCount; c++) {

                    if (purchaseBillCharges[c].PurchaseBillChargeId === purchaseBillChargeId &&
                        purchaseBillCharges[c].ChargeId === billChargeId && purchaseBillCharges[c].IsDeleted === false ) {

                        flag = "update";

                        break;
                    }
                }
            }

            var billCharge = {};

            billCharge = {
                PurchaseBillChargeId: purchaseBillChargeId,
                PurchaseBillId: purchaseBillId,
                ChargeId: billChargeId,
                ChargeName: billChargeName,
                ChargeAmount: billChargeAmount,
                IsTaxInclusive: isTaxInclusive,
                GSTRateId: gstRateId,
                TaxId: taxId,
                TaxableValue: taxableValue,
                GSTRate: billChargeGSTRate,
                GSTAmount: billChargeGSTAmount,
                BillChargeTotalAmount: billChargeTotalAmount,
                Remarks: null,
                SrNo: srNo,
                IsDeleted: false
            };

            if (flag === "add") {

                addBillCharge(billCharge);
            }
            else {

                updateBillCharge(billCharge);
            }

            bindBillCharges(purchaseBillId);
        }

    }
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        applyPlugins();
        bindEvents();
        loadData();        
    }

    return {
        init: init
    };

}());

SharpiTech.PurchaseBill.init();
