
var SharpiTech = {};

SharpiTech.SalesReturn = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var salesReturnBills = [];
    var salesReturnBillsObject = {};
    var salesReturnBillItems = [];
    var GSTDetails = [];
    var itemsList = [];
    var salesReturnBillAdjustments = [];

    var GSTApplicable = "SGST";

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.addNewSalesReturnBill = document.getElementById('AddNewSalesReturnBill');
        DOM.showSalesReturnList = document.getElementById('ShowSalesReturnList');
        DOM.viewSalesReturnBill = document.getElementById('ViewSalesReturnBill');
        DOM.editSalesReturnBill = document.getElementById('EditSalesReturnBill');
        DOM.saveSalesReturnBill = document.getElementById('SaveSalesReturnBill');
        DOM.deleteSaleReturnBill = document.getElementById('DeleteSalesReturnBill');
        DOM.printSalesReturnBill = document.getElementById('PrintSalesReturnBill');
        DOM.filterSalesReturnBill = document.getElementById('FilterSalesReturnBill');
        DOM.exportSalesReturnBillList = document.getElementById('ExportSalesReturnBillList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.salesReturnBillId = document.getElementById('SalesReturnBillId');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.companyName = document.getElementById('CompanyName');
        DOM.branch = document.getElementById('Branch');
        DOM.typeOfSale = document.getElementById('TypeOfSale');
        DOM.salesBillNo = document.getElementById('SalesBillNo');
        DOM.salesBillDate = document.getElementById('SalesBillDate');
        DOM.consigneeName = document.getElementById('ConsigneeName');        
        DOM.isSalesReturnBillNoAuto = document.getElementsByName('IsSalesReturnBillNoAuto');
        DOM.salesReturnBillNoAuto= document.getElementById('SalesReturnBillNoAuto');
        DOM.salesReturnBillNoManual = document.getElementById('SalesReturnBillNoManual');
        DOM.salesReturnBillNo = document.getElementById('SalesReturnBillNo');
        DOM.salesReturnBillDate = document.getElementById('SalesReturnBillDate');
        DOM.salesReturnBillDatePicker = document.getElementById('SalesReturnBillDatePicker');
        DOM.salesReturnBillRemarks = document.getElementById('SalesReturnBillRemarks');
        //DOM.isTaxInclusive = document.getElementsByName('IsTaxInclusive');

        DOM.totalBillAmount = document.getElementById('TotalBillAmount');
        DOM.salesReturnBillItemsList = document.getElementById('SalesReturnBillItemsList');
        DOM.gstBreakup = document.getElementById('GSTBreakup');
        DOM.salesBillsList = document.getElementById('SalesBillsList');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.salesReturnBillList = document.getElementById('SalesReturnBillList');

        /* Jquery cache */
        /* Jquery cache */

        DOM.$salesReturnBillDatePicker = $('#SalesReturnBillDatePicker');        
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

        DOM.$salesReturnBillDatePicker.datetimepicker({
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

        DOM.addNewSalesReturnBill.addEventListener('click', addNewSalesReturnBill);
        DOM.showSalesReturnList.addEventListener('click', getSalesReturnBills);
        DOM.viewSalesReturnBill.addEventListener('click', viewSalesReturnBill);
        DOM.editSalesReturnBill.addEventListener('click', editSalesReturnBill);
        DOM.saveSalesReturnBill.addEventListener('click', saveSalesReturnBill);
        DOM.deleteSaleReturnBill.addEventListener('click', deleteSaleReturnBill);
        DOM.printSalesReturnBill.addEventListener('click', printSalesReturnBill);
        
        DOM.companyName.onchange = function () {
            getBranchName(0);
        }

        DOM.typeOfSale.onchange = function () {
            getConsignee();
        }

        DOM.consigneeName.onchange = function () {
            getSalesBills();
            getItemsList(0);
        }

        //DOM.salesBillNo.onblur = function () {
        //    getSalesBillAdditionalDetails();
        //}

        DOM.salesReturnBillNoAuto.onchange = function () {
            enableBillNo();
        }

        DOM.salesReturnBillNoManual.onchange = function () {
            enableBillNo();
        }

        DOM.salesReturnBillNo.onblur = function () {

            checkBillReturnNoIsExists(function (response) {
                if (response === true) {
                    shared.hideLoader(DOM.loader);
                    swal("Warning", "This Bill No. is already exists.", "warning");
                    return false;
                }
            });

        }

        DOM.salesReturnBillNo.onkeydown = function validate(e) {
            return shared.acceptOnlyNumbers(e);
        };

    }

    function loadData() {

        getFinancialYear();
        getCompany();
        //getTypeOfSale();   
        getSalesReturnBills();
    }

    function validateInput(e) {
        return shared.acceptDecimalNos(e);
    }

    var checkBillReturnNoIsExists = function (callback) {

        if (parseInt(DOM.salesReturnBillNo.getAttribute('data-sales-return-bill-id')) === 0) {

            var billNo = {};

            billNo = {
                BranchId: parseInt(DOM.branch.options[DOM.branch.selectedIndex].value),
                WorkingPeriodId: parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value),
                SaleTypeId: parseInt(DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].value),
                SalesReturnBillNo: parseInt(DOM.salesReturnBillNo.value)
            };

            var postData = JSON.stringify(billNo);

            shared.sendRequest(SERVICE_PATH + "CheckSalesReturnBillNoIsExists/", "POST", true, "JSON", postData, function (response) {

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

    function getDiscountOptions(element) {

        element.options.length = 0;

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

    function getGSTOptions(element) {

        element.options.length = 0;

        var fragment = document.createDocumentFragment();

        //Add default option
        var _option = document.createElement('OPTION');
        _option.innerHTML = "Choose GST";
        _option.value = -1;
        fragment.appendChild(_option);

        _option = document.createElement('OPTION');
        _option.innerHTML = "Incl";
        _option.value = 0;
        fragment.appendChild(_option);

        _option = document.createElement('OPTION');
        _option.innerHTML = "Excl";
        _option.value = 1;
        fragment.appendChild(_option);

        element.appendChild(fragment);
    }

    function fillSelectOptions(element, defaultOptionText, optionText, optionValue) {

        element.options.length = 0;

        var fragment = document.createDocumentFragment();

        //Add default option
        var _option = document.createElement('OPTION');
        _option.innerHTML = defaultOptionText;
        _option.value = -1;
        fragment.appendChild(_option);

        _option = document.createElement('OPTION');
        _option.innerHTML = optionText;
        _option.value = optionValue;
        fragment.appendChild(_option);
        
        element.appendChild(fragment);
    }

    function getFinancialYear() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {
            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
                    shared.setSelect2ControlsText(DOM.financialYear);
                }
            }
        });
    }

    function getCompany() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllCompanies', DOM.companyName, "CompanyName", "CompanyId", "Choose Company", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.companyName, parseInt(1));
                    shared.setSelect2ControlsText(DOM.companyName);

                    // Call function to load Company Branches                    
                    getBranchName(0);
                }
            }
        });
    }
    
    function getBranchName(branchId, postResponse) {

        DOM.branch.options.length = 0;

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

                        getTypeOfSale();
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

    function getTypeOfSale() {

        DOM.typeOfSale.options.length = 0;

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetTypeOfSales', DOM.typeOfSale, "SaleType", "SaleTypeId", "Choose Type of Sale", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.typeOfSale, parseInt(1));
                    shared.setSelect2ControlsText(DOM.typeOfSale);

                    getConsignee();
                }

                shared.hideLoader(DOM.loader);
            }
        });
    }

    function getConsignee(consigneeId) {

        DOM.consigneeName.options.length = 0;

        var branchId = parseInt(0);
        var saleTypeId = parseInt(0);
        var workingPeriodId = parseInt(0);

        if (DOM.branch.options.length) {

            if (DOM.branch.selectedIndex > 0) {

                branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
                saleTypeId = parseInt(DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].value);
                workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);

            }
        }
        
        if (isNaN(branchId)) { branchId = parseInt(0); }
        if (isNaN(saleTypeId)) { saleTypeId = parseInt(0); }
        if (isNaN(workingPeriodId)) { workingPeriodId = parseInt(0); }

        if (branchId > 0 && saleTypeId > 0 && workingPeriodId > 0) {

            var salesBill = {};

            salesBill = {
                BranchId: branchId,
                SaleTypeId: saleTypeId,
                WorkingPeriodId: workingPeriodId
            };

            var postdata = JSON.stringify(salesBill);
            
            shared.fillDropdownUsingPostWithCallback(SERVICE_PATH + 'GetConsigneeFromSalesBills', DOM.consigneeName, "ClientAddressName", "ClientAddressId", "Choose Consignee Name", postdata, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        //itemsList = JSON.parse(response.responseText);

                        //itemsList = Object.keys(items).map(function (key) {
                        //    return [Number(key), items[key]];
                        //});

                        if (consigneeId > 0) {
                            shared.setSelectValue(DOM.consigneeName, undefined, consigneeId);
                            shared.setSelect2ControlsText(DOM.consigneeName);
                        }
                        else {
                            shared.setSelectOptionByIndex(DOM.consigneeName, parseInt(0));
                            shared.setSelect2ControlsText(DOM.consigneeName);
                        }

                        getSalesBills();

                    }

                    shared.hideLoader(DOM.loader);
                }
            });
        }

    }

    function getItemsList(salesReturnBillId, callback) {

        shared.showLoader(DOM.loader);

        itemsList.length = 0;

        DOM.salesReturnBillItemsList.tBodies[0].innerHTML = "";

        if (DOM.consigneeName.selectedIndex > 0) {

            var consigneeId = parseInt(DOM.consigneeName.options[DOM.consigneeName.selectedIndex].value);

            shared.sendRequest(SERVICE_PATH + "GetSalesReturnBillItemsByConsignee/" + consigneeId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    var res = JSON.parse(response.responseText);

                    itemsList = res;

                    if (salesReturnBillId === 0) {
                        addNewRowToSalesReturnBillItemList();
                    }
                    else {
                        callback(itemsList);
                    }

                }
            });

            shared.hideLoader(DOM.loader);
        }
        
    }

    function getSalesBills() {

        shared.showLoader(DOM.loader);

        salesReturnBillAdjustments.length = 0;

        DOM.salesReturnBillItemsList.tBodies[0].innerHTML = "";

        if (DOM.consigneeName.selectedIndex > 0) {

            var consigneeId = parseInt(DOM.consigneeName.options[DOM.consigneeName.selectedIndex].value);

            shared.sendRequest(SERVICE_PATH + "GetSalesBillsByConsignee/" + consigneeId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    var res = JSON.parse(response.responseText);

                    salesReturnBillAdjustments = res;

                    bindSalesBills();

                    //getItemsList(0);
                }

            });

            shared.hideLoader(DOM.loader);
        }
        
    }

    function bindSalesBills() {

        DOM.salesBillsList.innerHTML = "";

        var data = "";

        if (salesReturnBillAdjustments.length) {

            for (var s = 0; s < salesReturnBillAdjustments.length; s++) {

                data = data + "<li class='list-group-item clearfix' data-sales-bill-id=" + salesReturnBillAdjustments[s].SalesBillId +
                    " data-sales-bill-total-amount=" + salesReturnBillAdjustments[s].SalesBillTotalAmount +
                    " style='padding:0px;'>" +
                    "<label class='label-tick'>" +
                    "<input type='checkbox' class='label-checkbox' id=SalesBillNo_" +
                    salesReturnBillAdjustments[s].SalesBillId + " /> <span class='label-text'></span> </label>" +
                    "" + salesReturnBillAdjustments[s].SalesBillNoCustom +
                    "<span class='pull-right clearfix'  style='margin:0 10px 0 10px;'> " +
                    "<h5 class='text-green-900' > Rs. <a> " +
                    salesReturnBillAdjustments[s].SalesBillTotalAmount + "/- " +
                    "</a> </h5> </span> " +
                    "<span class='pull-right clearfix' style='margin:0 10px 0 10px;'>" +
                    "<h5 class='text-amber-600'> Rs. " +
                    salesReturnBillAdjustments[s].SalesBillTotalAmount + "/- </h5> </span> </li>";
            }

            DOM.salesBillsList.innerHTML = data;
        }

        //data = data + "<li class='list-group-item clearfix' data-sales-bill-id=" + salesReturnBillAdjustments[s].SalesBillId +
        //            " data-sales-bill-total-amount=" + salesReturnBillAdjustments[s].SalesBillTotalAmount +
        //            " style='padding:0px;'> <label class='label-tick'> <input type='checkbox' class='label-checkbox' id=SalesBillNo_" +
        //            salesReturnBillAdjustments[s].SalesBillId + " /> <span class='label-text'></span> </label>" +
        //            salesReturnBillAdjustments[s].SalesBillNoCustom + "<span class='pull-right clearfix'> <button class='btn btn-success'> Rs. " +
        //            salesReturnBillAdjustments[s].SalesBillTotalAmount + "/- </span>" +
        //            "<div class=col-lg-4 col-md-4 col-sm-4 col-xs-12><h4></h4>"
        //            "</li > ";
        //var dataAttributes = "SalesBillTotalAmount";

        //shared.fillDropdownWithArrayDataAttributesAndCallback(salesBills, element, "SalesBillNoCustom", "SalesBillId", "Choose Sales Bill", dataAttributes, function (response) {

        //    shared.setSelectOptionByIndex(element, parseInt(0));
        //    shared.setSelect2ControlsText(element);

        //});
    }

    function bindItemsList(element, value) {

        if (itemsList.length) {

            var dataAttributes = "HSNCode|UnitOfMeasurementId|UnitCode|BalanceQty|SalesBillItemId|GoodsReceiptItemId";

            shared.fillDropdownWithArrayDataAttributesAndCallback(itemsList, element, "ItemName", "ItemId", "Choose Item", dataAttributes, function (response) {

                shared.setSelectOptionByIndex(element, parseInt(0));
                shared.setSelect2ControlsText(element);

            });
        }

    }

    function getSalesBillDetailsBySalesBillId(salesBillId) {

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

    function getMaxSrNoFromTable(tableRows, maxSrNo) {

        var _maxSrNo = maxSrNo;

        if (data.length > 0) {

            _maxSrNo = tableRows.length;
            
        }

        return _maxSrNo += 1;
    }

    function enableBillNo() {

        if (DOM.salesReturnBillNoAuto.checked) {
            DOM.salesReturnBillNo.disabled = true;
        }
        else {
            DOM.salesReturnBillNo.disabled = false;
        }
    }

    function checkSalesReturnBillNoIsExists() {

        if (DOM.salesReturnBillNo.value !== "") {

            var salesReturnBillNo = {};

            salesReturnBillNo = {
                BranchId: parseInt(DOM.branch.options[DOM.branch.selectedIndex].value),
                WorkingPeriodId: parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value),
                SaleTypeId: parseInt(DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].value),
                SalesReturnBillNo: parseInt(DOM.salesReturnBillNo.value)
            };

            var postData = JSON.stringify(salesReturnBillNo);

            shared.sendRequest(SERVICE_PATH + "CheckSalesReturnBillNoIsExists/", "POST", true, "JSON", postData, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res === true) {
                            swal("Warning", "This Bill No. of Return is already exists.", "warning");
                            return false;
                        }
                    }
                }
            });
        }
    }

    function getGSTApplicable() {

        var clientAddressId = parseInt(DOM.consigneeName.getAttribute('data-consignee-address-id'));

        if (isNaN(clientAddressId)) { clientAddressId = parseInt(0); }

        shared.sendRequest(SERVICE_PATH + "GetGSTApplicable/" + clientAddressId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res.GSTName !== undefined) {

                        GSTApplicable = res.GSTName;
                    }
                }
            }
        });
    }

    function removeBillItem(e) {

        // Remove the item from the Table only if the sales bill item id is 0
        var tableBody = DOM.salesReturnBillItemsList.tBodies[0];

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
        if (salesReturnBillItems.length) {
            for (var i = 0; i < salesReturnBillItems.length; i++) {
                if (salesReturnBillItems[i].SalesBillItemId === salesBillItemId) {
                    salesReturnBillItems[i].IsDeleted = true;
                    salesReturnBillItems[i].DeletedBy = parseInt(LOGGED_USER);
                    salesReturnBillItems[i].DeletedByIP = IP_ADDRESS;
                    break;
                }
            }
        }

        showGSTBreakup();

        showTotalBillAmount();

    }

    function getSalesBillAdditionalDetails(salesBillId){

        if (parseInt(DOM.salesReturnBillNo.getAttribute('data-sales-return-bill-id')) > 0) {
            return;
        }

        if (DOM.salesBillNo.value !== '') {

            var salesBillDetails = {};

            salesBillDetails = {
                BranchId: parseInt(DOM.branch.options[DOM.branch.selectedIndex].value),
                WorkingPeriodId: parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value),
                SaleTypeId: parseInt(DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].value),
                SalesBillNo: parseInt(DOM.salesBillNo.value)
            };

            var postdata = JSON.stringify(salesBillDetails);

            shared.sendRequest(SERVICE_PATH + "GetSalesBillAdditionalDetails", "POST", true, "JSON", postdata, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res !== null) {

                            if (res.Remarks !== '') {
                                swal("Error", res.Remarks, "error");
                            }
                            else {
                                DOM.salesBillNo.setAttribute('data-sales-bill-id', res.SalesBillId);
                                DOM.salesBillNo.setAttribute('data-is-tax-inclusive', res.IsTaxInclusive);
                                DOM.salesBillDate.value = res.SalesBillDate;
                                DOM.customerName.value = res.CustomerName;
                                DOM.consigneeName.value = res.ConsigneeName;

                                getSalesBillItems(parseInt(res.SalesBillId));
                            }
                        }
                    }
                }
            });
        }
    }

    
    function getItemDetailsByBarcode() {

        salesReturnBillItems.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetSalesReturnBillItemsByBarcode/" + salesBillId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res.length) {

                        for (var r = 0; r < res.length; r++) {

                            var billReturnItems = {};

                            billReturnItems = {
                                SalesReturnBillItemId: res[r].SalesReturnBillItemId,
                                SalesReturnBillId: res[r].SalesReturnBillId,
                                SalesBillItemId: res[r].SalesBillItemId,
                                GoodsReceiptItemId: res[r].GoodsReceiptItemId,
                                SalesBillId: res[r].SalesBillId,
                                ItemId: res[r].ItemId,
                                ItemName: res[r].ItemName,
                                UnitOfMeasurementId: res[r].UnitOfMeasurementId,
                                UnitCode: res[r].UnitCode,
                                HSNCode: res[r].HSNCode,
                                SaleQty: res[r].SaleQty,
                                ReturnQty: res[r].SaleQty,
                                SaleRate: res[r].SaleRate,
                                Amount: res[r].Amount,
                                TypeOfDiscount: res[r].TypeOfDiscount,
                                CashDiscountPercent: res[r].CashDiscountPercent,
                                DiscountAmount: res[r].DiscountAmount,
                                TotalAmountAfterDiscount: res[r].TotalAmountAfterDiscount,
                                TaxableValue: res[r].TaxableValue,
                                TaxId: res[r].TaxId,
                                GSTRateId: res[r].GSTRateId,
                                GSTRate: res[r].GSTRate,
                                GSTName: res[r].GSTName,
                                GSTAmount: res[r].GSTAmount,
                                TotalItemAmount: res[r].TotalItemAmount,
                                SrNo: res[r].SrNo,
                                IsDeleted: false
                            };

                            salesReturnBillItems.push(billReturnItems);
                        }

                        bindSalesBillItems();
                    }
                }
            }
        });

        //assignEventsToTableInputs();

    }

    function addNewRowToSalesReturnBillItemList(response) {

        var tableBody = DOM.salesReturnBillItemsList.tBodies[0];

        var tableRows = tableBody.children;

        var salesReturnBillItemId = parseInt(0);
        var salesBillItemId = parseInt(0);
        var goodsReceiptItemId = parseInt(0);
        var itemId = parseInt(0);
        var itemName = null;
        var unitOfMeasurementId = parseInt(0);
        var unitCode = null;
        var HSNCode = null;
        var returnQty = parseFloat(0);
        var saleRate = parseFloat(0);
        var typeOfDiscount = null;
        var cashDiscountPercent = parseFloat(0);
        var gstRateId = parseInt(0);
        var taxId = parseInt(0);
        var gstRate = parseFloat(0);
        var isTaxInclusive = true;
        var taxableValue = parseFloat(0);
        var totalItemAmount = parseFloat(0);
        var srNo = tableRows.length + 1;

        if (response !== undefined) {

            salesReturnBillItemId = response.SalesReturnBillItemId;
            salesBillItemId = response.SalesBillItemId;
            goodsReceiptItemId = response.GoodsReceiptItemId;
            itemId = response.ItemId;
            itemName = response.ItemName;
            unitOfMeasurementId = response.UnitOfMeasurementId;
            unitCode = response.UnitCode;
            HSNCode = response.HSNCode;
            returnQty = response.ReturnQty;
            saleRate = response.SaleRate;
            typeOfDiscount = response.TypeOfDiscount;
            cashDiscountPercent = response.CashDiscountPercent;
            gstRateId = response.GSTRateId;
            taxId = response.TaxId;
            gstRate = response.GSTRate;
            isTaxInclusive = response.IsTaxInclusive;
            taxableValue = response.TaxableValue;
            totalItemAmount = response.TotalItemAmount;
        }

        var tr = createElement('tr');

        var DOM_selectItemContainer = createElement('td', undefined, "text-center", undefined, undefined);
        var DOM_checkboxLabel = createElement('label', undefined, 'label-tick', );
        var DOM_checkboxSpan = createElement('span', undefined, 'label-text');
        var DOM_selectItem = createElement('input', 'checkbox', 'label-checkbox', 'SelectSalesReturnBillItem', 'cb' + srNo);

        var DOM_removeButton = createElement('button', 'button', 'btn btn-xs btn-danger btn-round', 'Remove' + srNo);
        var DOM_removeFontIcon = createElement('span', undefined, 'fa fa-fw fa-remove', 'Remove' + srNo);

        //var DOM_itemAutoCompleteListContainer = createElement('div', null, 'autocomplete', 'ItemAutoComplete', null);
        //DOM_itemAutoCompleteListContainer.setAttribute('width', '300px');

        var DOM_itemNameContainer = createElement('td', undefined, "text-center", undefined, undefined);
        var DOM_itemName = createElement('select', undefined, 'form-control input-sm', 'ItemName', 'Item' + srNo);

        var DOM_barcodeContainer = createElement('td', undefined, "text-center", undefined, undefined);
        //var DOM_barcode = createElement('input', 'text', 'form-control input-sm text-center', 'Barcode', 'Barcode' + goodsReceiptItemId);

        var DOM_hsnCodeContainer = createElement('td', undefined, "text-center", undefined, undefined);

        var DOM_unitOfMeasurementContainer = createElement('td', undefined, "text-center", undefined, undefined);

        var DOM_gstInclExclContainer = createElement('td', undefined, "text-center", undefined, undefined);
        var DOM_gstInclExcl = createElement('select', undefined, 'form-control input-sm', 'GSTInclExcl', 'GSTInclExcl' + srNo);
                
        var DOM_returnQtyContainer = createElement('td', undefined, "text-center", undefined, undefined);
        var DOM_returnQty = createElement('input', 'text', 'form-control input-sm text-center', 'ReturnQty', 'ReturnQty' + srNo);

        var DOM_saleRateContainer = createElement('td', undefined, "text-center", undefined, undefined);
        var DOM_saleRate = createElement('input', 'text', 'form-control input-sm text-center', 'SaleRate', 'SaleRate' + srNo);

        var DOM_typeOfDiscountContainer = createElement('td', undefined, "text-center", undefined, undefined);
        var DOM_typeOfDiscount = createElement('select', '', 'form-control input-sm', 'TypeOfDiscount', 'TypeOfDiscount' + srNo);

        var DOM_discountRateContainer = createElement('td', undefined, "text-center", undefined, undefined);
        var DOM_discountRate = createElement('input', 'text', 'form-control input-sm text-center', 'DiscountRate', 'DiscRate' + srNo);

        var DOM_totalItemAmountContainer = createElement('td', undefined, "text-center", undefined, undefined);
        var DOM_totalItemAmount = createElement('input', 'text', 'form-control input-sm text-right', 'TotalItemAmount', 'TotalItemAmount' + srNo);

        var DOM_itemRemarksContainer = createElement('td', undefined, "text-center", undefined, undefined);
        var DOM_itemRemarks = createElement('input', 'text', 'form-control input-sm', 'ItemRemarks', 'ItemRemarks' + srNo);

        DOM_removeButton.onclick = removeBillItem;

        //DOM_itemName.onkeyup = function(e) {
        //    autoComplete(e, itemsList);
        //}

        //DOM_itemName.onblur = checkIsItemExistsInTable;

        //var event = new Event('onkeydown');
        //DOM_itemName.addEventListener('onkeydown', autoComplete);
        //DOM_itemName.dispatchEvent(event);

        getDiscountOptions(DOM_typeOfDiscount);

        getGSTOptions(DOM_gstInclExcl);
               
        bindItemsList(DOM_itemName, itemsList);

        DOM_returnQty.onkeydown = validateInput;
        DOM_returnQty.onblur = calculateItemAmount;
        
        DOM_saleRate.onkeydown = validateInput;
        DOM_saleRate.onblur = calculateItemAmount;

        DOM_discountRate.onkeydown = validateInput;
        DOM_discountRate.onblur = calculateItemAmount;

        //checkboxLabel.appendChild(selectItem);
        //checkboxLabel.appendChild(checkboxSpan);
        //selectItemContainer.appendChild(checkboxLabel);
        DOM_removeButton.appendChild(DOM_removeFontIcon);
        DOM_selectItemContainer.appendChild(DOM_removeButton);
        //DOM_itemAutoCompleteListContainer.appendChild(DOM_itemName);
        DOM_itemNameContainer.appendChild(DOM_itemName);
        //DOM_barcodeContainer.appendChild(DOM_barcode);
        DOM_gstInclExclContainer.appendChild(DOM_gstInclExcl);
        DOM_returnQtyContainer.appendChild(DOM_returnQty);
        DOM_saleRateContainer.appendChild(DOM_saleRate);
        DOM_typeOfDiscountContainer.appendChild(DOM_typeOfDiscount);
        DOM_discountRateContainer.appendChild(DOM_discountRate);
        DOM_totalItemAmountContainer.appendChild(DOM_totalItemAmount);
        DOM_itemRemarksContainer.appendChild(DOM_itemRemarks);
        
        // Set Item
        tr.setAttribute('data-sales-return-bill-item-id', salesReturnBillItemId);
        tr.setAttribute('data-goods-receipt-item-id', goodsReceiptItemId);
        tr.setAttribute('data-item-id', itemId);
        tr.setAttribute('data-gst-rate-id', gstRateId);
        tr.setAttribute('data-tax-id', taxId);
        tr.setAttribute('data-gst-rate', gstRate);
        tr.setAttribute('data-taxable-value', taxableValue);

        DOM_barcodeContainer.innerHTML = goodsReceiptItemId;
        DOM_hsnCodeContainer.innerHTML = HSNCode;
        DOM_unitOfMeasurementContainer.innerHTML = unitCode;
        DOM_returnQty.value = parseFloat(returnQty);
        DOM_saleRate.value = parseFloat(saleRate);
        shared.setSelectValue(DOM_typeOfDiscount, typeOfDiscount, null);
        shared.setSelect2ControlsText(DOM_typeOfDiscount);                    
        DOM_discountRate.value = parseFloat(cashDiscountPercent);
        DOM_totalItemAmount.value = parseFloat(totalItemAmount);

        tr.appendChild(DOM_selectItemContainer);
        tr.appendChild(DOM_itemNameContainer);        
        tr.appendChild(DOM_barcodeContainer);
        tr.appendChild(DOM_hsnCodeContainer);
        tr.appendChild(DOM_unitOfMeasurementContainer);
        tr.appendChild(DOM_gstInclExclContainer);
        tr.appendChild(DOM_returnQtyContainer);
        tr.appendChild(DOM_saleRateContainer);
        tr.appendChild(DOM_typeOfDiscountContainer);
        tr.appendChild(DOM_discountRateContainer);
        tr.appendChild(DOM_totalItemAmountContainer);
        tr.appendChild(DOM_itemRemarksContainer);
        
        tableBody.appendChild(tr);

        $('#Item'+ srNo).select2();
        $('#GSTInclExcl' + srNo).select2();

        if (itemId > 0) {
            shared.setSelectValue(DOM_itemName, null, itemId);
            shared.setSelect2ControlsText(DOM_itemName);            
        }

        if (isTaxInclusive) {
            shared.setSelectValue(DOM_gstInclExcl, "Incl", null);
            shared.setSelect2ControlsText(DOM_gstInclExcl);
        }
        else {
            shared.setSelectValue(DOM_gstInclExcl, null, parseInt(1));
            shared.setSelect2ControlsText(DOM_gstInclExcl);
        }

        //if (isTaxInclusive) {
        //    shared.setSelectValue(DOM_gstInclExcl, null, 1);
        //    shared.setSelect2ControlsText(DOM_gstInclExcl);        
        //}

        //var event = new Event('onchange');

        DOM_itemName.onchange = function (e) {
            getItemDetails(e.currentTarget);
            setFocusOnSelect(e);
        }

        DOM_gstInclExcl.onchange = function (e) {
            setFocusOnSelect(e);
        }

        if (salesReturnBillItemId === 0) {
            var event = new Event('onblur');
            DOM_saleRate.addEventListener('onblur', calculateItemAmount);
            //DOM_saleRate.dispatchEvent(event);
        }

    }

    var getKey = function (keyCode) {

        var value = (keyCode === 8 || keyCode === 127) ||
            (keyCode >= 65 && keyCode <= 90) || (keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 97 && keyCode <= 122) || keyCode === 32;

        return true;
    };

    function getItemDetails(targetElement) {

        if (targetElement !== undefined) {

            if (targetElement.selectedIndex > 0) {

                var tableRow = targetElement.parentElement.parentElement;

                if (tableRow !== undefined) {

                    tableRow.children[2].innerHTML = targetElement.options[targetElement.selectedIndex].getAttribute('data-goodsreceiptitemid');
                    tableRow.children[3].innerHTML = targetElement.options[targetElement.selectedIndex].getAttribute('data-hsncode');
                    tableRow.children[4].innerHTML = targetElement.options[targetElement.selectedIndex].getAttribute('data-unitcode');

                }
            }
        }

    }
    /* Comment out becuase key move up down is not working and yet to check with Ajax */

    //function autoComplete(targetElement, data) {

    //    closeAllLists();
    //    var value = "";

    //    var target = targetElement.target;

    //    if (targetElement.key !== "") {
            
    //        var value = getKey(targetElement.keyCode);

    //        if (value === true) {

    //            value = target.value;
    //        }
    //    }
        
    //    if (value === "") {

    //        return false;
    //    }

    //    if (target.value.length > 0) {

    //        var currentFocus;
    //        var autoCompleteListContainer, autoCompleteList;

    //        //targetElement.target.addEventListener('input', function (e) {

    //        currentFocus = -1;

    //        autoCompleteListContainer = createElement('div', undefined, 'autocomplete-items', 'AutoCompleteListContainer', target.id + 'AutoCompleteListContainer');

    //        autoCompleteListContainer.innerHTML = "";

    //        target.parentNode.appendChild(autoCompleteListContainer);

    //        for (var l = 0; l < data.length; l++) {

    //            if (data[l].ClientAddressName.substr(0, value.length).toLowerCase() === value.toLowerCase()) {

    //                autoCompleteList = createElement('div', undefined, undefined, 'AutoCompleteList', target.id);

    //                autoCompleteList.innerHTML = "<strong>" + data[l].ClientAddressName.substr(0, value.length) + "</strong>";
    //                autoCompleteList.innerHTML += data[l].ClientAddressName.substr(value.length);
    //                autoCompleteList.innerHTML += "<input type='hidden' value='" + data[l].ClientAddressName + "'>";

    //                autoCompleteList.addEventListener('click', function (e) {

    //                    target.value = this.getElementsByTagName("input")[0].value;

    //                    closeAllLists();
    //                });

    //                autoCompleteListContainer.appendChild(autoCompleteList);
    //            }
    //        }

    //        //});

    //        target.addEventListener('keydown', function (e) {

    //            var x = document.getElementById(this.id + "AutoCompleteListContainer");

    //            if (x) x = x.getElementsByTagName('div');

    //            if (e.keyCode === 40) {
    //                currentFocus++;
    //                addActive(x);
    //            }
    //            else if (e.keyCode === 38) {
    //                currentFocus--;
    //                addActive(x);
    //            }
    //            else if (e.keyCode === 13) {
    //                e.preventDefault();
    //                if (currentFocus > -1) {
    //                    if (x) x[currentFocus].click();
    //                }
    //            }
    //        });

    //        function addActive(x) {

    //            if (!x) return false;

    //            removeActive(x);

    //            if (currentFocus >= x.length) currentFocus = 0;

    //            if (currentFocus < 0) currentFocus = (x.length - 1);

    //            x[currentFocus].classList.add('autocomplete-active');
    //        }

    //        function removeActive(x) {
    //            for (var i = 0; i < x.length; i++) {
    //                x[i].classList.remove('autocomplete-active');
    //            }
    //        }

            


    //    }

    //    function closeAllLists(element) {

    //            var x = document.getElementsByClassName('autocomplete-items')

    //            for (var j = 0; j < x.length; j++) {

    //                if (element !== x[j] && element !== targetElement) {
    //                    x[j].parentNode.removeChild(x[j]);
    //                }
    //            }
    //        }

    //        document.addEventListener('click', function (e) {
    //            closeAllLists(e.target);
    //        });
    //}
    
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
    }

    function bindSalesBillItems() {

        shared.showLoader(DOM.loader);

        var tableBody = DOM.salesReturnBillItemsList.tBodies[0];

        tableBody.innerHTML = "";

        if (salesReturnBillItems.length) {

            var data = "";

            for (var r = 0; r < salesReturnBillItems.length; r++) {

                addNewRowToSalesReturnBillItemList(salesReturnBillItems[r]);

                //data = data + "<tr data-sales-return-bill-item-id=" + salesReturnBillItems[r].SalesReturnBillItemId +
                //    " data-sales-return-bill-id=" + salesReturnBillItems[r].SalesReturnBillId +
                //    " data-sales-bill-item-id=" + salesReturnBillItems[r].SalesBillItemId +
                //    " data-item-id=" + salesReturnBillItems[r].ItemId +
                //    " data-unit-of-measurement-id=" + salesReturnBillItems[r].UnitOfMeasurementId +
                //    " data-taxable-value=" + salesReturnBillItems[r].TaxableValue +
                //    " data-gst-rate=" + salesReturnBillItems[r].GSTRate + ">";
                //data = data + "<td> <button type='button' class='btn btn-xs btn-danger btn-round' id=Remove_" + salesReturnBillItems[r].SalesBillItemId + "> <span class='fa fa-fw fa-remove'></span></button>" + "</td>";
                //data = data + "<td>" + salesReturnBillItems[r].GoodsReceiptItemId + "</td>";
                //data = data + "<td>" + salesReturnBillItems[r].HSNCode + "</td>";
                //data = data + "<td>" + salesReturnBillItems[r].ItemName + "</td>";
                //data = data + "<td>" + salesReturnBillItems[r].UnitCode + "</td>";
                //data = data + "<td>" + salesReturnBillItems[r].SaleQty + "</td>";
                //data = data + "<td> <input type='text' id=" + salesReturnBillItems[r].SalesBillItemId + " class='form-control input-sm' value=" + salesReturnBillItems[r].ReturnQty + "></td>";
                //data = data + "<td>" + salesReturnBillItems[r].SaleRate + "</td>";
                //if (salesReturnBillItems[r].TypeOfDiscount === null) {
                //    data = data + "<td></td>";
                //} else {
                //    data = data + "<td>" + salesReturnBillItems[r].TypeOfDiscount + "</td>";
                //}
                //data = data + "<td>" + salesReturnBillItems[r].CashDiscountPercent + "</td>";
                //data = data + "<td>" + salesReturnBillItems[r].TotalItemAmount + "</td>";
                //data = data + "</tr>";
            }

            tableBody.innerHTML = data;

            if (tableBody.children.length) {

                var inputs = tableBody.querySelectorAll('input[type="text"]');

                var buttons = tableBody.querySelectorAll('button[type="button"]');

                if (inputs.length) {

                    inputs[0].onkeydown = validateInput;
                    inputs[0].onblur = calculateItemAmount;        
                }

                if (buttons.length) {

                    buttons[0].onclick = removeBillItem;
                }
            }

            showGSTBreakup();

            showTotalBillAmount();
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

                DOM.rateDifference.focus()
            }
        }

        calculateItemAmount();
    }

    function calculateItemAmount(e) {

        var itemId = parseInt(0);        
        var saleQty = parseFloat(0);
        var returnQty = parseFloat(0);
        var saleRate = parseFloat(0);
        var amount = parseFloat(0);
        var cashDiscountPercent = parseFloat(0);
        var cashDiscountAmt = parseFloat(0);
        var rateDifference = parseFloat(0);
        var rateAfterCDRD = parseFloat(0);
        var taxableValue = parseFloat(0);
        var gstRate = parseFloat(0);
        var gstAmount = parseFloat(0);
        var totalItemAmount = parseFloat(0);
        var isGSTInclExcl = 'Incl';
        var gstExclAmount = parseFloat(0);
        var gstInclAmount = parseFloat(0);
        var gstRateId = parseInt(0);
        var taxId = parseInt(0);

        var HSNCode = "";

        var tableRow = e.currentTarget.parentElement.parentElement;

        var tableBody = tableRow.parentElement;

        var inputs = tableRow.querySelectorAll("input[type='text']");

        var selectList = tableRow.querySelectorAll("select");

        itemId = parseInt(selectList[0].options[selectList[0].selectedIndex].value);
        barcode = tableRow.children[2].innerHTML;
        HSNCode = tableRow.children[3].innerHTML;
        returnQty = parseFloat(inputs[0].value); 
        saleRate = parseFloat(inputs[1].value);
        if (selectList[2].selectedIndex > 0) {

            typeOfDiscount = selectList[2].options[selectList[2].selectedIndex].text;

            cashDiscountPercent = parseFloat(inputs[2].value);

            if (typeOfDiscount === null) {
                cashDiscountAmt = 0;
            }
            else if (typeOfDiscount.toLowerCase() === "cash discount") {
                cashDiscountAmt = parseFloat(returnQty * saleRate) * parseFloat(cashDiscountPercent / 100);
            }
            else if (typeOfDiscount.toLowerCase() === "rate difference") {
                cashDiscountAmt = parseFloat(returnQty * cashDiscountPercent);
            }

        }

        if (selectList[1].selectedIndex > 0) {

            isGSTInclExcl = selectList[1].options[selectList[1].selectedIndex].text;
        }

        amount = parseFloat(returnQty * saleRate) - cashDiscountAmt;

        //inputs[3].value = amount;

        //if (returnQty > saleQty) {
        //    swal("Warning", "Return Qty should not be greater than Sale Qty.", "warning");
        //    return;
        //}

        //if (typeOfDiscount.toUpperCase() === "CASH DISCOUNT") {
        //    cashDiscountPercent = parseFloat(inputs[4].value);
        //    //cashDiscountAmt = saleRate * (cashDiscountPercent / 100);        
        //}
        //else {
        //    rateDifference = parseFloat(inputs[4].value);
        //}

        //DOM.rateDifference.value = rateDifference;
        //DOM.rateAfterCDRD.value = rateAfterCDRD;
        //DOM.amount.value = amount;

        //DOM.taxableValue.value = taxableValue;
        //DOM.gstRate.value = gstRate;
        //DOM.gstAmount.value = gstAmount;
        //DOM.totalItemAmount.value = totalItemAmount;

        //if (cashDiscountPercent > 0) {

        //    cashDiscountAmt = parseFloat(parseFloat(saleRate * (cashDiscountPercent / 100)).toFixed(2));

        //    //DOM.cashDiscountAmt.value = cashDiscountAmt;

        //    rateAfterCDRD = parseFloat(saleRate - cashDiscountAmt);

        //    amount = parseFloat(returnQty * rateAfterCDRD);            
        //}
        //else if (rateDifference > 0) {

        //    rateAfterCDRD = parseFloat(saleRate - rateDifference);

        //    amount = parseFloat(returnQty * rateAfterCDRD);            
        //}
        //else {

        //    rateAfterCDRD = parseFloat(saleRate);

        //    amount = parseFloat(returnQty * (parseFloat(rateAfterCDRD)));
            
        //}

        //DOM.amount.value = amount;

        if (amount > 0) {

            var rate = 0;

            getGSTRate(itemId, saleRate, function (response) {

                rate = response.Rate;

                if (rate >= 0) {

                    gstRate = rate;

                    gstRateId = parseInt(response.GSTRateId);
                    taxId = parseInt(response.TaxId);

                    tableRow.setAttribute('data-gst-rate-id', gstRateId);
                    tableRow.setAttribute('data-tax-id', taxId);
                    tableRow.setAttribute('data-gst-rate', gstRate);
                    
                    if (isGSTInclExcl.toLowerCase() === "incl") {

                        gstExclAmount = parseFloat(parseFloat(parseFloat(amount * 100) / (gstRate + 100)).toFixed(2));

                        taxableValue = gstExclAmount;

                        gstAmount = parseFloat(parseFloat(gstExclAmount * (gstRate / 100)).toFixed(2));

                    }
                    else {
                        
                        taxableValue = amount;

                        gstAmount =  parseFloat(parseFloat(parseFloat(amount) * (gstRate / 100)).toFixed(2));
                    }

                    tableRow.setAttribute('data-taxable-value', taxableValue);

                    totalItemAmount = parseFloat(parseFloat(taxableValue + gstAmount).toFixed(2));

                    inputs[3].value = totalItemAmount;
                    
                    showGSTBreakup();

                    showTotalBillAmount();                    
                }
            });
        }
        else {

            inputs[3].value = totalItemAmount;

            showGSTBreakup();

            showTotalBillAmount();

        }

        if (tableBody.children.length) {

            if (tableRow.rowIndex === tableBody.children.length) {
                addNewRowToSalesReturnBillItemList();
            }
        }

    }

    function showGSTBreakup() {

        DOM.gstBreakup.tBodies[0].innerHTML = "";

        var table = DOM.salesReturnBillItemsList;
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

                    data = data + "<tr>";
                    //data = data + "<td class='text-center'>" + tableRows[g].children[3].innerHTML + "</td>";
                    data = data + "<td class='text-center'>" + tableRows[g].children[3].innerHTML + "</td>";
                    data = data + "<td class='text-center'>" + taxableValue + "</td>";
                    data = data + "<td class='text-center'>" + gstRate + "</td>";
                    data = data + "<td class='text-center'>" + SGSTAmount + "</td>";
                    data = data + "<td class='text-center'>" + CGSTAmount + "</td>";
                    data = data + "<td class='text-center'>" + IGSTAmount + "</td>";
                    data = data + "</tr>";
                }
            }

            DOM.gstBreakup.tBodies[0].innerHTML = data;
        }
    }

    function showTotalBillAmount() {

        var totalBillAmount = parseFloat(0);

        var table = DOM.salesReturnBillItemsList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                if (tableRows[tr].style.display !== "none") {

                    var totalItemAmount = parseFloat(tableRows[tr].children[10].children[0].value);

                    if (isNaN(totalItemAmount)) { totalItemAmount += 0; }

                    totalBillAmount += parseFloat(totalItemAmount);
                }
            }

            DOM.totalBillAmount.innerHTML = totalBillAmount;

            adjustSalesBills(totalBillAmount);

            //if (parseInt(DOM.modeOfPayment.options[DOM.modeOfPayment.selectedIndex].value) === 1) {
            //    DOM.cashAmount.value = totalBillAmount;
            //}
        }        
    }

    function adjustSalesBills(totalBillAmount) {

        return;

        //var items = DOM.salesBillsList.querySelectorAll('li');

        //var checkBoxItem = DOM.salesBillsList.querySelectorAll('input[type="checkbox"]');

        //var billAmount = 0;
        //var billBalanceAmount = 0;

        //if (checkBoxItem.length) {

        //    for (var cb = 0; cb < checkBoxItem.length; cb++) {

        //        checkBoxItem[cb].checked = false;

        //        //sumOfBillsAmount = sumOfBillsAmount + checkBoxItem[cb].getAttribute('data-sales-bill-total-amount');
        //    }
        //}

        //// Loop through Bill Return Item rows
        //var tableBody = DOM.salesReturnBillItemsList.tBodies[0];

        //var tableRows = tableBody.children;

        //if (tableRows.length) {

        //    for (var tr = 0; tableRows.length; tr++) {

        //        var itemAmount = tableRows[tr].children[10].children[0].value;

        //        if (items) {

        //            if (items.length) {

        //                for (var i = 0; i < items.length; i++) {

        //                    var checkBoxItem = items[i].querySelectorAll('input[type="checkbox"]');

        //                    var billAmount = parseFloat(items[i].getAttribute('data-sales-bill-total-amount'));

        //                    var balanceAmount = parseFloat(0);

        //                    var balanceAmountTag = items[i].querySelectorAll('a');

        //                    billBalanceAmount = parseFloat(balanceAmount.innerText.substring(0, balanceAmountTag.innerText.length - 2));

        //                    if (billBalanceAmount > 0) {

        //                        checkBoxItem.checked = true;

        //                        balanceAmount = billBalanceAmount - itemAmount;

        //                        if (balanceAmount > 0) {

        //                            break;
        //                        }
        //                    }
        //                }
        //            }
        //        }
        //    }
        //}
        
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
            GSTApplicable: GSTApplicable,
            Rate: saleRate,
            EffectiveFromDate: DOM.salesReturnBillDate.value
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

    function addNewSalesReturnBill() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);
        shared.clearTextAreas(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        salesReturnBills.length = 0;        
        salesReturnBillItems.length = 0;
        GSTDetails.length = 0;

        shared.disableControls(DOM.editMode, false);
        
        // Set default values
        DOM.salesReturnBillNo.setAttribute('data-sales-return-bill-id', parseInt(0));

        DOM.salesReturnBillNo.value = parseInt(0);

        DOM.salesReturnBillNo.disabled = true;

        var currentDate = new Date();

        DOM.salesReturnBillDate.value = moment(currentDate).format("DD/MMM/YYYY");

        shared.setSelectOptionByIndex(DOM.financialYear, 1);
        shared.setSelect2ControlsText(DOM.financialYear);

        shared.setSelectOptionByIndex(DOM.companyName, 2);
        shared.setSelect2ControlsText(DOM.companyName);

        getBranchName(1);

        shared.setSelectOptionByIndex(DOM.typeOfSale, 1);
        shared.setSelect2ControlsText(DOM.typeOfSale);

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);

    }

    function refreshSalesBill() {
        getSalesReturnBills();
    }

    var getSelectedRows = function(element) {

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
    }
    
    function viewSalesReturnBill() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);
            shared.disableControls(DOM.editMode, true);

            var selectedRows = getSelectedRows(DOM.salesReturnBillList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var salesReturnBillId = parseInt(currentTableRow.getAttribute('data-sales-return-bill-id'));

                    if (isNaN(salesReturnBillId)) { salesReturnBillId = 0; }

                    DOM.salesReturnBillId.value = salesReturnBillId;

                    showSalesReturnBillDetails(salesReturnBillId);
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

    function editSalesReturnBill() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);
            shared.disableControls(DOM.editMode, false);
                    
            var controls = [
                DOM.financialYear
            ]

            shared.disableSpecificControls(controls, true);
            
            var selectedRows = getSelectedRows(DOM.salesReturnBillList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var salesReturnBillId = parseInt(currentTableRow.getAttribute('data-sales-return-bill-id'));

                    if (isNaN(salesReturnBillId)) { salesReturnBillId = 0; }

                    DOM.salesReturnBillId.value = salesReturnBillId;

                    showSalesReturnBillDetails(salesReturnBillId);
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
        DOM.salesReturnBillNo.focus();
    }

    function deleteSaleReturnBill() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.salesReturnBillList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.salesReturnBillList);

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
                    closeOnCancel: true,
                },
                    function (isConfirm) {

                        if (isConfirm) {

                            for (var r = 0; r < selectedRows.length; r++) {

                                var returnBills = [];

                                if (salesReturnBills.length) {

                                    returnBills = salesReturnBills.filter(function (value, index, array) {
                                        return value.SalesReturnBillId === parseInt(selectedRows[r].getAttribute('data-sales-return-bill-id'));
                                    });

                                    if (returnBills.length) {

                                        var returnBillItems = returnBills[0].SalesReturnBillItems.filter(function (value, index, array) {
                                            return value.SalesReturnBillId === parseInt(selectedRows[r].getAttribute('data-sales-return-bill-id'));
                                        });

                                        returnBills[0].IsDeleted = true;
                                        returnBills[0].DeletedBy = parseInt(LOGGED_USER);
                                        returnBills[0].DeletedByIP = IP_ADDRESS;

                                        if (returnBillItems.length) {

                                            for (var bi = 0; bi < returnBillItems.length; bi++) {
                                                returnBillItems[bi].IsDeleted = true;
                                                returnBillItems[bi].DeletedBy = parseInt(LOGGED_USER);
                                                returnBillItems[bi].DeletedByIP = IP_ADDRESS;
                                            }

                                            returnBills[0].SalesReturnBillItems = returnBillItems;
                                        }
                                    }
                                }

                                var postData = JSON.stringify(returnBills);

                                shared.sendRequest(SERVICE_PATH + 'SaveSalesReturnBill', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {

                                            //tableBody.removeChild(selectedRows[r]);

                                            swal({
                                                title: "Success",
                                                text: "Sales Return Bill Details Deleted successfully.",
                                                type: "success"
                                            }, function () {
                                                getSalesReturnBills();
                                            });
                                        }
                                    }

                                    shared.hideLoader(DOM.loader);

                                });
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

    function showSalesReturnBillDetails(salesReturnBillId) {

        shared.showLoader(DOM.loader);

        if (salesReturnBillId > 0) {

            // Check the sales bills list has values
            if (salesReturnBills.length > 0) {

                var returnBills = salesReturnBills.filter(function (value, index, array) {
                    return value.SalesReturnBillId === parseInt(salesReturnBillId);
                });
                
                if (returnBills.length > 0) {

                    DOM.salesReturnBillNo.value = returnBills[0].SalesReturnBillNo;
                    DOM.salesReturnBillNo.setAttribute('data-sales-return-bill-id', parseInt(salesReturnBillId));
                    DOM.salesReturnBillDate.value = returnBills[0].SalesReturnBillDate;
                    shared.setSelectValue(DOM.financialYear, null, parseInt(returnBills[0].WorkingPeriodId));
                    shared.setSelect2ControlsText(DOM.financialYear);
                    shared.setSelectValue(DOM.companyName, null, parseInt(returnBills[0].CompanyId));
                    shared.setSelect2ControlsText(DOM.companyName);
                    fillSelectOptions(DOM.branch, "Choose Branch", returnBills[0].BranchName, returnBills[0].BranchId);
                    shared.setSelectValue(DOM.branch, null, parseInt(returnBills[0].BranchId));
                    shared.setSelect2ControlsText(DOM.branch);
                    fillSelectOptions(DOM.typeOfSale, "Choose Type of Sale", returnBills[0].SaleType, returnBills[0].SaleTypeId);
                    shared.setSelectValue(DOM.typeOfSale, null, parseInt(returnBills[0].SaleTypeId));
                    shared.setSelect2ControlsText(DOM.typeOfSale);
                    fillSelectOptions(DOM.consigneeName, "Choose Consignee", returnBills[0].ConsigneeName, returnBills[0].ConsigneeId);
                    shared.setSelectValue(DOM.consigneeName, null, parseInt(returnBills[0].ConsigneeId));
                    shared.setSelect2ControlsText(DOM.consigneeName);
                    DOM.salesReturnBillRemarks.value = returnBills[0].Remarks;
                    getSalesBills();
                    getItemsList(salesReturnBillId, function response() {

                        if (itemsList.length) {

                            bindSalesReturnBillItems(salesReturnBillId);

                            bindSalesBillAdjustment(salesReturnBillId);
                        }

                    });

                }

                // Show panels
                shared.showPanel(DOM.editMode);
                shared.hidePanel(DOM.viewMode);

            }
        }

        shared.hideLoader(DOM.loader);
    }

    function getSalesReturn() {

        shared.showLoader(DOM.loader);

        var saleTypeId = parseInt(1);
        var workingPeriodId = parseInt(1);
        var branchId = parseInt(1);

        //if (DOM.financialYear.selectedIndex > 0) {
        //    workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);            
        //}

        //if (DOM.branch.selectedIndex > 0) {
        //    branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
        //}

        if (workingPeriodId === 0 && branchId === 0) {

            createNewSalesReturnBill();

            return;
        }
        
        salesReturnBills.length = 0;        
        salesReturnBillItems.length = 0;

        DOM.salesReturnBillList.tBodies[0].innerHTML = "";
        
        shared.sendRequest(SERVICE_PATH + "GetSalesReturnBillsBySaleType/" + branchId + '/' + workingPeriodId + '/' + saleTypeId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res !== undefined) {

                        if (res.length > 0) {

                            for (var r = 0; r < res.length; r++) {

                                var billItems = res[r].SalesBillItems;
                                var paymentDetails = res[r].SalesBillPaymentDetails;
                                var deliveryDetails = res[r].SalesBillDeliveryDetails;
                                
                                var salesBill = {};

                                salesBill = {
                                    SalesBillId: res[r].SalesBillId,
                                    SalesBillNo: res[r].SalesBillNo,
                                    SalesBillDate: res[r].SalesBillDate,
                                    CustomerId: res[r].CustomerId,
                                    CustomerName: res[r].CustomerName,
                                    ConsigneeId: res[r].ConsigneeId,
                                    ConsigneeName: res[r].ConsigneeName,
                                    SalesmanId: res[r].SalesmanId,
                                    SalesmanName: res[r].SalesmanName,
                                    SaleTypeId: res[r].SaleTypeId,
                                    TotalSaleQty: res[r].TotalSaleQty,
                                    TotalSaleAmount: res[r].TotalSaleAmount,
                                    GSTApplicable: res[r].GSTApplicable,
                                    IsTaxInclusive: res[r].IsTaxInclusive,
                                    CompanyId: res[r].CompanyId,
                                    CompanyName: res[r].CompanyName,
                                    BranchId: res[r].BranchId,
                                    BranchName: res[r].BranchName,
                                    WorkingPeriodId: res[r].WorkingPeriodId,
                                    FinancialYear: res[r].FinancialYear,
                                    TotalCashSaleQty: res[r].TotalCashSaleQty,
                                    TotalCashSaleAmount: res[r].TotalCashSaleAmount,
                                    IsDeleted: false
                                };

                                salesBills.push(salesBill);

                                if (billItems.length > 0) {

                                    for (var s = 0; s < billItems.length; s++) {

                                        var salesBillItem = {};

                                        salesBillItem = {
                                            SalesBillItemId: billItems[s].SalesBillItemId,
                                            GoodsReceiptItemId: billItems[s].GoodsReceiptItemId,
                                            SalesBillId: billItems[s].SalesBillId,
                                            ItemId: billItems[s].ItemId,
                                            ItemName: billItems[s].ItemName,
                                            UnitOfMeasurementId: billItems[s].UnitOfMeasurementId,
                                            UnitCode: billItems[s].UnitCode,
                                            HSNCode: billItems[s].HSNCode,
                                            SaleQty: billItems[s].SaleQty,
                                            SaleRate: billItems[s].SaleRate,
                                            Amount: billItems[s].Amount,
                                            TypeOfDiscount: billItems[s].TypeOfDiscount,
                                            CashDiscountPercent: billItems[s].CashDiscountPercent,
                                            DiscountAmount: billItems[s].DiscountAmount,
                                            TotalAmountAfterDiscount: billItems[s].TotalAmountAfterDiscount,
                                            TaxableValue: billItems[s].TaxableValue,
                                            TaxId: billItems[s].TaxId,
                                            GSTRateId: billItems[s].GSTRateId,                                            
                                            GSTRate: billItems[s].GSTRate,
                                            GSTName: billItems[s].GSTName,
                                            GSTAmount: billItems[s].GSTAmount,
                                            TotalItemAmount: billItems[s].TotalItemAmount,
                                            SrNo: billItems[s].SrNo,
                                            IsDeleted: false
                                        };

                                        salesBillItems.push(salesBillItem);
                                    }
                                }

                            }

                            bindSalesBills();

                        }
                        else {
                            shared.showPanel(DOM.editMode);
                            shared.hidePanel(DOM.viewMode);
                        }
                    }
                }
                shared.hideLoader(DOM.loader);
            }
        });

        
    }

    function getSalesReturnBills() {

        shared.showLoader(DOM.loader);

        var saleTypeId = parseInt(1);
        var workingPeriodId = parseInt(1);
        var branchId = parseInt(1);

        //if (DOM.financialYear.selectedIndex > 0) {
        //    workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);            
        //}

        //if (DOM.branch.selectedIndex > 0) {
        //    branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
        //}

        if (workingPeriodId === 0 && branchId === 0) {

            createNewSalesReturnBill();

            return;
        }
        
        salesReturnBills.length = 0;        
        salesReturnBillItems.length = 0;

        //DOM.salesReturnBillList.tBodies[0].innerHTML = "";
        
        shared.sendRequest(SERVICE_PATH + "GetSalesReturnBillsByBranchWorkingPeriodAndSalesType/" + branchId + '/' + workingPeriodId + '/' + saleTypeId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res !== undefined) {

                        if (res.length > 0) {

                            salesReturnBills = res;

                            salesReturnBillsObject = salesReturnBills[0];

                            bindSalesReturnBills();
                        }
                        else {
                            shared.showPanel(DOM.editMode);
                            shared.hidePanel(DOM.viewMode);
                        }
                    }
                }
                shared.hideLoader(DOM.loader);
            }
        });

        
    }

    function bindSalesReturnBills() {

        shared.showLoader(DOM.loader);

        if (salesReturnBills.length) {

            var tableBody = DOM.salesReturnBillList.tBodies[0];

            tableBody.innerHTML = "";

            if (salesReturnBills.length) {

                var data = "";

                for (var r = 0; r < salesReturnBills.length; r++) {

                    data = data + "<tr data-sales-return-bill-id=" + salesReturnBills[r].SalesReturnBillId +
                        "data-sales-bill-id=" + salesReturnBills[r].SalesBillId + ">";
                    data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + salesReturnBills[r].SalesReturnBillId + "' class='label-checkbox' name='SelectSalesReturnBill' /> <span class='label-text'></span> </label>" + "</td>";
                    data = data + "<td>" + salesReturnBills[r].CompanyName + "</td>";
                    data = data + "<td>" + salesReturnBills[r].BranchName + "</td>";
                    data = data + "<td>" + salesReturnBills[r].SaleType + "</td>";
                    data = data + "<td>" + salesReturnBills[r].SalesReturnBillNo + "</td>";
                    data = data + "<td>" + salesReturnBills[r].SalesReturnBillDate + "</td>";
                    data = data + "<td>" + salesReturnBills[r].SalesBillNo + "</td>";
                    data = data + "<td>" + salesReturnBills[r].CustomerName + "</td>";
                    data = data + "<td>" + salesReturnBills[r].ConsigneeName + "</td>";
                    data = data + "<td>" + salesReturnBills[r].TotalReturnQty + "</td>";
                    data = data + "<td>" + salesReturnBills[r].SalesReturnTotalAmount + "</td>";
                    data = data + "<td>" + salesReturnBills[r].FinancialYear + "</td>";

                }

                tableBody.innerHTML = data;

                shared.showPanel(DOM.viewMode);
                shared.hidePanel(DOM.editMode);
            }

            shared.hideLoader(DOM.loader);
        }

        var createTableHeader = function (data, excludeListOfTableHeaderCaption) {

            var excludeListOfTableHeaders = [
                'SalesReturnBillId',
                'SalesBillId',
                'SaleTypeId',
                'SalesBillDate',
                'BranchId',
                'IsTaxInclusive',
                'SrNo',
                'Remarks',
                'guid',
                'IsDeleted',
                'CreatedBy',
                'CreatedByIP',
                'CreatedDateTime',
                'ModifiedBy',
                'ModifiedByIP',
                'ModifiedDateTime',
                'DeletedBy',
                'DeletedByIP',
                'DeletedDateTime',
                'CancelledBy',
                'WorkingPeriodId'
            ];

            var tableHeader = createTableHeader(salesReturnBillsObject, excludeListOfTableHeaders);

            var tableBody = createTableBody(salesReturnBillsObject, excludeListOfTableHeaders);

            DOM.salesReturnBillList.appendChild(tableHeader);

            DOM.salesReturnBillList.appendChild(tableBody);


            //var tableHeader = document.createElement('thead');

            var tableHeaderRow = document.createElement('tr');

            for (var prop in data) {

                var excludeList = excludeListOfTableHeaderCaption.filter(function (value, index, array) {
                    return value.toLowerCase() === prop.toLowerCase();
                });

                //for (var ex = 0; ex < excludeListOfTableHeaderCaption.length; ex++) {

                if (excludeList.length === 0) {

                    var tableHeaderCaption = document.createElement('th');

                    tableHeaderCaption.innerText = getTableHeaderCaption(prop);;

                    tableHeaderRow.appendChild(tableHeaderCaption);
                }
                //}         
            }

            tableHeader.appendChild(tableHeaderRow);

            return tableHeader;
        };
    }

    var getTableHeaderCaption = function (tableHeaderCaption) {

        var caption = "";

        for (var cl = 0; cl < tableHeaderCaption.length; cl++) {

            if (tableHeaderCaption.charAt(cl) === tableHeaderCaption.charAt(cl).toUpperCase()) {

                if (cl === 0) {
                    caption += tableHeaderCaption.charAt(0);
                }
                else {
                    caption += " " + tableHeaderCaption.charAt(cl);
                }

            }
            else {
                caption += tableHeaderCaption.charAt(cl);
            }

        }

        return caption;
    }

    var createTableBody = function (data, excludeListOfTableHeaderCaption) {

        var tableBody = document.createElement('tbody');

        var tableBodyRow = document.createElement('tr');

        for (var prop in data) {

            var excludeList = excludeListOfTableHeaderCaption.filter(function (value, index, array) {
                return value.toLowerCase() === prop.toLowerCase();
            });

            if (excludeList.length === 0) {

                var tableDetails = document.createElement('td');

                tableDetails.innerText = data[prop];

                tableBodyRow.appendChild(tableDetails);
            }
        }

        tableBody.appendChild(tableBodyRow);

        return tableBody;
    }

    var isUpperCase = function (value) {

        if (value === value.toUpperCase(0)) {
            return true;
        }
    }

    function saveSalesReturnBill() {

        shared.showLoader(DOM.loader);

        checkBillReturnNoIsExists(function (response) {

            if (response === true) {
                swal("Warning", "This Bill No. is already exists.", "warning");
                shared.hideLoader(DOM.loader);
                return false;
            }
            else {

                if (validateSalesReturnBill() === false) {
                    shared.hideLoader(DOM.loader);
                    return;
                }

                // Clearing the Sales Bill and other arrays
                salesReturnBills.length = 0;
                salesReturnBillItems.length = 0;
                salesReturnBillAdjustments.length = 0;

                var workingPeriodId = parseInt(0);
                var companyId = parseInt(0);
                var branchId = parseInt(0);
                var billingLocationId = parseInt(0);
                var typeOfSaleId = parseInt(0);
                var typeOfSale = null;
                var consigneeId = parseInt(0);
                var salesReturnBillId = parseInt(0);
                var salesReturnBillNo = parseInt(0);
                var salesReturnBillDate = null;
                var salesReturnBillRemarks = null;

                saveSalesReturnBillItem();
                saveSalesReturnBillAdjustment();

                if (salesReturnBillItems.length === 0) {
                    swal("Warning", "Bill Items Not added. Unable to save the records.", "warning");
                    shared.hideLoader(DOM.loader);
                    return;
                }

                workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);
                companyId = parseInt(DOM.companyName.options[DOM.companyName.selectedIndex].value);
                branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
                typeOfSaleId = parseInt(DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].value);
                salesReturnBillId = DOM.salesReturnBillNo.getAttribute('data-sales-return-bill-id');
                salesReturnBillNo = parseInt(DOM.salesReturnBillNo.value);
                salesReturnBillDate = DOM.salesReturnBillDate.value;
                consigneeId = parseInt(DOM.consigneeName.options[DOM.consigneeName.selectedIndex].value);
                salesReturnBillRemarks = DOM.salesReturnBillRemarks.value;

                if (salesReturnBillId === null) { salesReturnBillId = parseInt(0); }

                if (isNaN(salesReturnBillId)) { salesReturnBillId = parseInt(0); }
                if (isNaN(salesReturnBillNo)) { salesReturnBillNo = parseInt(0); }

                var salesReturnBill = {};

                salesReturnBill = {
                    SalesReturnBillId: salesReturnBillId,
                    ConsigneeId: consigneeId,
                    SalesReturnBillNo: salesReturnBillNo,
                    SalesReturnBillDate: salesReturnBillDate,
                    Remarks: salesReturnBillRemarks,
                    BranchId: branchId,
                    WorkingPeriodId: workingPeriodId,
                    SaleTypeId: typeOfSaleId,
                    SalesReturnBillItems: salesReturnBillItems,
                    SalesReturnBillAdjustments: salesReturnBillAdjustments,
                    IsDeleted: false
                };

                if (parseInt(salesReturnBillId) === parseInt(0)) {

                    salesReturnBill.CreatedBy = LOGGED_USER;
                    salesReturnBill.CreatedByIP = IP_ADDRESS;
                }
                else {
                    salesReturnBill.ModifiedBy = LOGGED_USER;
                    salesReturnBill.ModifiedByIP = IP_ADDRESS;
                }

                //salesReturnBills.push(salesReturnBill);

                var postData = JSON.stringify(salesReturnBill);

                shared.sendRequest(SERVICE_PATH + "SaveSalesReturnBill", "POST", true, "JSON", postData, function (response) {

                    shared.showLoader(DOM.loader);

                    var _response = JSON.parse(response.responseText);

                    if (response.status === 200) {

                        if (parseInt(response.responseText) > parseInt(0)) {
                            swal({
                                title: "Success",
                                text: "Sales Bill Return saved successfully.",
                                type: "success"
                            }, function () {
                                getSalesReturnBills();
                            });
                        }
                    }
                    else {
                        swal("error", "Unable to save the Cash Sales Details due to some error.", "error");
                        handleError(_response.Message + " " + _response.ExceptionMessage);
                        salesReturnBills.length = 0;
                        salesReturnBillItems.length = 0;
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

    function printSalesReturnBill() {

        shared.showLoader(DOM.loader);

        var print = {};

        var salesReturnBillId = parseInt(DOM.salesReturnBillNo.getAttribute('data-sales-return-bill-id'));
        var salesReturnBillNo = parseInt(DOM.salesReturnBillNo.value);
        var branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
        var saleTypeId = parseInt(DOM.typeOfSale.options[DOM.typeOfSale.selectedIndex].value);
        var folderName = 'CashSalesReturnBills';

        if (saleTypeId === 1) {
            folderName = 'CashSalesReturnBills';
        }
        else {
            folderName = 'CreditSalesReturnBills';
        }

        print = {
            SalesReturnBillId: salesReturnBillId,
            SalesReturnBillNo: salesReturnBillNo,
            BranchId: branchId,
            SaleTypeId: saleTypeId            
        };

        var postData = JSON.stringify(print);

        shared.sendRequest(SERVICE_PATH + "PrintSalesReturnInvoice", "POST", true, "JSON", postData, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            window.open(location.origin + "/POS/ApplicationFiles/SalesReturn/Bills/" + branchId + '/' + folderName + "/BillNo_" + salesReturnBillNo + ".pdf", "_blank");

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

    function bindSalesReturnBillItems(salesReturnBillId) {

        var table = DOM.salesReturnBillItemsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        salesReturnBillItems.length = 0;

        if (isNaN(salesReturnBillId)) { salesReturnBillId = parseInt(0); }

        if (salesReturnBills.length > 0) {

            var bills = salesReturnBills.filter(function (value, index, array) {
                return value.SalesReturnBillId === salesReturnBillId; // && value.IsDeleted === false;
            });

            var returnBillItems = bills[0].SalesReturnBillItems.filter(function (value, index, array) {
                return value.SalesReturnBillId === salesReturnBillId; //&& value.IsDeleted === false;
            });

            var itemsCount = returnBillItems.length;

            if (returnBillItems.length) {

                salesReturnBillItems = returnBillItems;

                for (var r = 0; r < salesReturnBillItems.length; r++) {

                    addNewRowToSalesReturnBillItemList(salesReturnBillItems[r]);

                    showGSTBreakup();

                    showTotalBillAmount();
                }
            }
        }
    }

    function bindSalesBillAdjustment(salesReturnBillId) {

        DOM.salesBillsList.innerHTML = "";

        var data = "";

        var returnBills = salesReturnBills.filter(function (value, index, array) {
            return value.SalesReturnBillId === salesReturnBillId;
        });

        if (returnBills.length) {

            var billAdjustments = returnBills[0].SalesReturnBillAdjustments.filter(function (value, index, array) {
                return value.SalesReturnBillId === salesReturnBillId;
            });

            salesReturnBillAdjustments = billAdjustments;            
        }

        if (salesReturnBillAdjustments.length) {

            for (var s = 0; s < salesReturnBillAdjustments.length; s++) {

                data = data + "<li class='list-group-item clearfix' data-sales-bill-id=" + salesReturnBillAdjustments[s].SalesBillId + " data-sales-bill-total-amount=" + salesReturnBillAdjustments[s].SalesBillTotalAmount + " style='padding:0px;'> <label class='label-tick'> <input type='checkbox' class='label-checkbox' id=SalesBillNo_" + salesReturnBillAdjustments[s].SalesBillId + " checked='true' /> <span class='label-text'></span> </label>" + salesReturnBillAdjustments[s].SalesBillNo + "<span class='pull-right clearfix'> <button class='btn btn-success'> Rs. " + salesReturnBillAdjustments[s].SalesBillTotalAmount + "/- </span> </li>";
            }

            DOM.salesBillsList.innerHTML = data;
        }
    }

    function deleteSalesReturnBillItem(currentTableRow) {

        var table = DOM.salesReturnBillItems;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var salesReturnBillItemId = parseInt(currentTableRow.getAttribute('data-sales-return-bill-item-id'));

        var salesReturnBillItem = {};

        salesReturnBillItem = {
            SalesReturnBillItemId: salesReturnBillItemId,
            IsDeleted: true,
            DeletedBy: LOGGED_USER,
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(salesReturnBillItem);

        shared.sendRequest(SERVICE_PATH + 'SaveSalesReturnBill', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function saveSalesReturnBillItem() {

        if (validateSalesReturnBillItem() === true) {

            var salesReturnBillItemId = parseInt(0);
            var salesReturnBillId = parseInt(0);
            var salesBillItemId = parseInt(0);
            var itemId = parseInt(0);
            var itemName = null;
            var unitOfMeasurementId = parseInt(0);
            var unitCode = null;
            var saleQty = parseFloat(0);
            var returnQty = parseFloat(0);
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
            var isGSTInclExcl = 'Incl';
            var isTaxInclusive = true;
            var taxableValue = parseFloat(0);
            var gstRate = parseFloat(0);
            var gstAmount = parseFloat(0);
            var totalItemAmount = parseFloat(0);
            var taxId = parseInt(0)
            var gstRateId = parseInt(0);
            var srNo = parseInt(0);

            salesReturnBillId = parseInt(DOM.salesReturnBillNo.getAttribute('data-sales-return-bill-id'));

            var tableBody = DOM.salesReturnBillItemsList.tBodies[0];

            var tableRows = tableBody.children;

            if (tableRows.length) {

                for (var tr = 0; tr < tableRows.length; tr++) {

                    salesReturnBillItemId = parseInt(tableRows[tr].getAttribute('data-sales-return-bill-item-id'));

                    var inputs = tableRows[tr].querySelectorAll('input[type="text"]');

                    var select = tableRows[tr].querySelectorAll('select');

                    if (inputs.length) {

                        if (parseFloat(inputs[0].value) > 0) {

                            salesBillItemId = parseInt(select[0].options[select[0].selectedIndex].getAttribute('data-salesbillitemid'));
                            goodsReceiptItemId = parseInt(select[0].options[select[0].selectedIndex].getAttribute('data-goodsreceiptitemid')); //parseInt(tableRows[tr].children[1].innerHTML);
                            itemId = parseInt(select[0].options[select[0].selectedIndex].value);  //parseInt(tableRows[tr].getAttribute('data-item-id'));
                            itemName = select[0].options[select[0].selectedIndex].text;
                            returnQty = parseFloat(parseFloat(inputs[0].value).toFixed(2));
                            saleRate = parseFloat(parseFloat(inputs[1].value).toFixed(2));
                            isGSTInclExcl = select[1].options[select[1].selectedIndex].text;
                            cashDiscountPercent = parseFloat(parseFloat(inputs[2].value).toFixed(2));

                            if (select[2].selectedIndex > 0) {

                                typeOfDiscount = select[2].options[select[2].selectedIndex].text;

                                if (typeOfDiscount === "null") {
                                    discountAmount = parseFloat(0);
                                }
                                else if (typeOfDiscount.toLowerCase() === "cash discount") {
                                    discountAmount = (returnQty * saleRate) * (cashDiscountPercent / 100);
                                }
                                else {
                                    discountAmount = returnQty * cashDiscountPercent;
                                }
                            }

                            taxId = parseInt(tableRows[tr].getAttribute('data-tax-id'));
                            gstRateId = parseInt(tableRows[tr].getAttribute('data-gst-rate-id'));
                            unitOfMeasurementId = parseInt(select[0].options[select[0].selectedIndex].getAttribute('data-unitofmeasurementid')); //parseInt(tableRows[tr].getAttribute('data-unit-of-measurement-id'));
                            unitCode = select[0].options[select[0].selectedIndex].getAttribute('data-unitcode');

                            if (isNaN(salesReturnBillItemId)) { salesReturnBillItemId = parseInt(0); }
                            if (isNaN(salesReturnBillId)) { salesReturnBillId = parseInt(0); }
                            if (isNaN(itemId)) { itemId = parseInt(0); }
                            if (isNaN(srNo)) { srNo = parseInt(0); }
                            if (isNaN(unitOfMeasurementId)) { unitOfMeasurementId = parseInt(0); }

                            isGSTInclExcl.toLowerCase() === "incl" ? isTaxInclusive = true : false;

                            var returnBillItem = {};

                            returnBillItem = {
                                SalesReturnBillItemId: salesReturnBillItemId,
                                SalesReturnBillId: salesReturnBillId,
                                SalesBillItemId: salesBillItemId,
                                ItemId: itemId,
                                ItemName: itemName,
                                UnitOfMeasurementId: unitOfMeasurementId,
                                UnitCode: unitCode,
                                ReturnQty: returnQty,
                                SaleRate: saleRate,
                                TypeOfDiscount: typeOfDiscount,
                                CashDiscountPercent: cashDiscountPercent,
                                DiscountAmount: discountAmount,
                                IsTaxInclusive: isTaxInclusive,
                                GSTRateId: gstRateId,
                                TaxId: taxId,
                                SrNo: srNo,
                                IsDeleted: false
                            };

                            if (tableRows[tr].style.display === "none") {
                                returnBillItem.IsDeleted = true;
                                returnBillItem.DeletedBy = parseInt(LOGGED_USER);
                                returnBillItem.DeletedByIP = IP_ADDRESS;
                            }
                            else {
                                if (salesReturnBillItemId === parseInt(0)) {

                                    returnBillItem.CreatedBy = parseInt(LOGGED_USER);
                                    returnBillItem.CreatedByIP = IP_ADDRESS;
                                    //addSalesBillItem(billItem);
                                }
                                else {
                                    returnBillItem.ModifiedBy = parseInt(LOGGED_USER);
                                    returnBillItem.ModifiedByIP = IP_ADDRESS;
                                    //updateSalesBillItem(billItem);
                                }
                            }

                            salesReturnBillItems.push(returnBillItem);
                        }

                    }
                }
            }
        }
    }

    function saveSalesReturnBillAdjustment() {

        salesReturnBillAdjustments.length = 0;

        var items = DOM.salesBillsList.querySelectorAll('input[type="checkbox"]');

        var salesReturnBillAdjustmentId = parseInt(0);
        var salesReturnBillId = parseInt(0);
        var salesBillId = parseInt(0);

        if (items.length) {

            var salesReturnBillAdjustment = {};

            for (var c = 0; c < items.length; c++) {

                if (items[c].checked) {

                    salesReturnBillId = DOM.salesReturnBillNo.getAttribute('data-sales-return-bill-id');
                    salesBillId  = parseInt(items[c].parentElement.parentElement.getAttribute('data-sales-bill-id')),
        
                    salesReturnBillAdjustment = {
                        SalesReturnBillAdjustmentId: 0,
                        SalesReturnBillId: salesReturnBillId,
                        SalesBillId: salesBillId,
                        CreatedBy: parseInt(LOGGED_USER),
                        CreatedByIP: IP_ADDRESS
                    };

                    salesReturnBillAdjustments.push(salesReturnBillAdjustment);                    
                }
            }
        }
    }

    function validateSalesReturnBill() {

        var isValid = true;

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
        else if (DOM.salesReturnBillDate.value === "") {
            DOM.salesReturnBillDate.focus();
            swal("Error!!!", "Please enter the Return Date.", "error");
            isValid = false;
        }
        else if (DOM.salesReturnBillNoAuto.checked === false && DOM.salesReturnBillNoManual.checked === false) {
            DOM.salesReturnBillNoAuto.focus();
            swal("Error!!!", "Please select the Bill No. Auto or Manual option.", "error");
            isValid = false;
        }
        else if (DOM.typeOfSale.value === "") {
            DOM.typeOfSale.focus();
            swal("Error!!!", "Please select the Type of Sale.", "error");
            isValid = false;
        }
        else if (DOM.consigneeName.selectedIndex === 0) {
            DOM.consigneeName.focus();
            swal("Error!!!", "Please select the Consignee Name.", "error");
            isValid = false;
        }

        if (DOM.salesReturnBillNoManual.checked) {
            if (DOM.salesReturnBillNo.value === "" || parseInt(DOM.salesReturnBillNo.value) === 0) {
                DOM.salesReturnBillNo.focus();
                swal("Error!!!", "Please enter the Sales Return Bill No. manually", "error");
                isValid = false;
            }
        }

        return isValid;
    }

    function validateSalesReturnBillItem() {

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
        
    var getGSTRateAsPerGSTCategoryId = function(callback) {

        var gstRate = 0;
        var gstCategoryId = parseInt(0);
        
        var gstRateDetails = {};

        gstCategoryId = parseInt(DOM.billChargeName.options[DOM.billChargeName.selectedIndex].getAttribute('data-gstcategoryid'));

        if (isNaN(gstCategoryId)) { gstCategoryId = 0; }

        if (gstCategoryId > 0) {

            gstRateDetails = {
                GSTCategoryId: gstCategoryId,
                GSTApplicable: GSTApplicable,
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

    }

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


SharpiTech.SalesReturn.init();
