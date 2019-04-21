
var SharpiTech = {};

SharpiTech.CashSales = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    var _cashSales = [];
    var _cashSaleItems = [];
    var _gstApplicable = "IGST";

    /* ---- private method ---- */
    //cache DOM elements
    function _cacheDOM() {

        DOM.editMode = document.getElementById('EditMode');
        DOM.customer = document.getElementById('Customer');
        DOM.addNewCustomer = document.getElementById('AddNewCustomer');
        DOM.refreshCustomerList = document.getElementById('RefreshCustomerList');
        DOM.salesman = document.getElementById('Salesman');
        DOM.isTaxInclusive = document.getElementsByName('IsTaxInclusive');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.branch = document.getElementById('Branch');
        DOM.billNo = document.getElementById('BillNo');
        DOM.billDate = document.getElementById('BillDate');
        DOM.billDatePicker = document.getElementById('BillDatePicker');

        DOM.addNewCashSaleItem = document.getElementById('AddNewCashSaleItem');
        DOM.cashSaleItems = document.getElementById('CashSaleItems');
        DOM.backToCashSaleList = document.getElementById('BackToCashSaleList');
        DOM.saveCashSale = document.getElementById('SaveCashSale');

        DOM.cashSaleItemModal = document.getElementById('CashSaleItemModal');
        DOM.salesBillItemId = document.getElementById('SalesBillItemId');
        DOM.srNo = document.getElementById('SrNo');
        DOM.itemName = document.getElementById('ItemName');
        DOM.qtyInPcs = document.getElementById('QtyInPcs');
        DOM.qtyInMtrs = document.getElementById('QtyInMtrs');
        DOM.saleRate = document.getElementById('SaleRate');
        DOM.amount = document.getElementById('Amount');
        DOM.gstRate = document.getElementById('GSTRate');
        DOM.gstAmount = document.getElementById('GSTAmount');
        DOM.totalItemAmount = document.getElementById('TotalItemAmount');
        DOM.backtoCashSaleItemList = document.getElementById('BackToCashSaleItemList');
        DOM.saveCashSaleItem = document.getElementById('SaveCashSaleItem');
        DOM.saveAndAddNewItem = document.getElementById('SaveAndAddNewItem');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.createNewCashSale = document.getElementById('CreateNewCashSale');
        DOM.refreshCashSale = document.getElementById('RefreshCashSale');
        DOM.filter = document.getElementById('Filter');
        DOM.cashSales = document.getElementById('CashSales');

        /* Jquery cache */

        DOM.$cashSalesItemModal = $('#CashSaleItemModal');
        DOM.$billDatePicker = $('#BillDatePicker');
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

        DOM.createNewCashSale.addEventListener('click', createNewCashSale);
        DOM.refreshCashSale.addEventListener('click', refreshCashSale);
        DOM.cashSales.addEventListener('click', cashSales);
        DOM.backToCashSaleList.addEventListener('click', backToCashSaleList);
        DOM.saveCashSale.addEventListener('click', saveCashSale);

        DOM.addNewCashSaleItem.addEventListener('click', addNewCashSaleItem);
        DOM.cashSaleItems.addEventListener('click', cashSaleItems);
        DOM.backtoCashSaleItemList.addEventListener('click', backToCashSaleItemList);
        DOM.saveCashSaleItem.addEventListener('click', saveCashSaleItem);
        DOM.saveAndAddNewItem.addEventListener('click', saveAndAddNewItem);

        DOM.addNewCustomer.addEventListener('click', addNewCustomer);
        DOM.refreshCustomerList.addEventListener('click', refreshCustomerList);

        DOM.customer.onchange = function () {
            getGSTApplicable();
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

        DOM.qtyInPcs.onblur = function () {
            calculateItemAmount();
        }

        DOM.saleRate.onblur = function () {
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

        getCustomers();

        getSalesmans();

        getItems();

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

    function getCustomers() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/1', DOM.customer, "ClientAddressName", "ClientAddressId", "Choose Vendor", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.customer, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.customer);

                    getGSTApplicable();
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

    function getItems() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetItemsByBrandCategoryAndQuality', DOM.itemName, "ItemName", "ItemId", "Choose Item", function (response) {
            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.itemName, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.itemName);
                }
            }
        });
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

    function calculateItemAmount() {

        var itemId = parseInt(DOM.itemName.options[DOM.itemName.selectedIndex].value);

        var qtyInPcs = parseFloat(0);
        var qtyInMtrs = parseFloat(0);
        var saleRate = parseFloat(0);
        var amount = parseFloat(0);
        var gstRate = parseFloat(0);
        var gstAmount = parseFloat(0);
        var totalItemAmount = parseFloat(0);

        qtyInPcs = parseFloat(DOM.qtyInPcs.value);
        saleRate = parseFloat(DOM.saleRate.value);
        amount = parseFloat(qtyInPcs * saleRate);
        DOM.amount.value = amount;

        if (qtyInPcs > 0 && saleRate > 0) {

            _shared.sendRequest(SERVICE_PATH + "GetGSTRateByItemIdGSTApplicableAndSaleRate/" + itemId + "/" + _gstApplicable + "/" + saleRate, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var _response = JSON.parse(response.responseText);

                        if (_response.Rate > 0) {

                            gstRate = _response.Rate;

                            DOM.gstRate.setAttribute('data-gst-rate-id', parseInt(_response.GSTRateId));
                            DOM.gstRate.setAttribute('data-tax-id', parseInt(_response.TaxId));

                            DOM.gstRate.value = gstRate;

                            var gstExclAmount = parseFloat(0);
                            var gstInclAmount = parseFloat(0);

                            if (_shared.isRadioButtonValueSelected(DOM.isTaxInclusive) === true) {

                                gstExclAmount = parseFloat(parseFloat(parseFloat(amount * 100) / (gstRate + 100)).toFixed(2));

                                DOM.amount.value = gstExclAmount;

                                gstAmount = parseFloat(parseFloat(gstExclAmount * (gstRate / 100)).toFixed(2));

                            }
                            else {

                                //DOM.amount.value = gstInclAmount;

                                gstAmount = parseFloat(parseFloat(parseFloat(DOM.amount.value) * (gstRate / 100)).toFixed(2));
                            }

                            DOM.gstAmount.value = gstAmount;

                            totalItemAmount = parseFloat(parseFloat(gstExclAmount + gstAmount).toFixed(2));

                            DOM.totalItemAmount.value = totalItemAmount;
                        }
                    }
                }
            });
        }

    }

    function toggleModes(editModeDisplay, viewModeDisplay) {

        DOM.editMode.style.display = editModeDisplay;
        DOM.viewMode.style.display = viewModeDisplay;
    }

    function addNewCustomer() {

    }

    function refreshCustomerList() {

    }

    function createNewCashSale() {

        //clear the modal control inputs        
        _shared.clearInputs(DOM.editMode);

        DOM.cashSaleItems.tBodies[0].innerHTML = "";

        _cashSales = [];
        _cashSaleItems = [];

        _shared.disableControls(DOM.editMode, false);

        DOM.billNo.setAttribute('data-sales-bill-id', parseInt(0));

        DOM.billNo.value = parseInt(0);

        DOM.billNo.disabled = true;

        var currentDate = new Date();

        DOM.billDate.value = moment(currentDate).format("DD/MMM/YYYY");

        toggleModes("block", "none");

        DOM.customer.focus();
    }

    function refreshCashSale() {
        getCashSales();
    }

    function backToCashSaleList() {

        getCashSales();

        toggleModes("none", "block");
    }

    function viewCashSale(currentTableRow) {

        _shared.clearInputs(DOM.editMode);

        _shared.disableControls(DOM.editMode, true);

        showSelectedCashSaleDetails(currentTableRow);
    }

    function editCashSale(currentTableRow) {

        _shared.clearInputs(DOM.editMode);

        _shared.disableControls(DOM.editMode, false);

        showSelectedCashSaleDetails(currentTableRow);
    }

    function deleteCashSale(currentTableRow) {

        var table = DOM.cashSales;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var salesBillId = currentTableRow.getAttribute('data-sales-bill-id');

        var cashSale = {};

        cashSale = {
            SalesBillId: salesBillId,
            IsDeleted: true,
            DeletedBy: LOGGED_USER,
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(cashSale);

        _shared.sendRequest(SERVICE_PATH + 'SaveCashSale', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function cashSales(evt) {

        var element = evt.target;

        var currentTableRow;

        if (element.nodeName === 'I') {
            currentTableRow = element.parentElement.parentElement.parentElement;
        }
        else if (element.nodeName === 'A') {
            currentTableRow = element.parentElement.parentElement;
        }

        if (element.getAttribute('data-name').trim().toUpperCase() === "VIEW") {
            viewCashSale(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "EDIT") {
            editCashSale(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "REMOVE") {
            deleteCashSale(currentTableRow);
        }
    }

    function showSelectedCashSaleDetails(currentTableRow) {

        var salesBillId = parseInt(currentTableRow.getAttribute('data-sales-bill-id'));

        if (_cashSales.length > 0) {

            var cashSales = _cashSales.filter(function (value, index, array) {
                return value.SalesBillId === salesBillId;
            });

            var itemsCount = cashSales.length;

            if (itemsCount > 0) {

                DOM.billNo.value = cashSales[0].BillNo;
                DOM.billNo.setAttribute('data-sales-bill-id', parseInt(cashSales[0].SalesBillId));
                DOM.billDate.value = cashSales[0].BillDate;
                _shared.setSelectValue(DOM.customer, null, parseInt(cashSales[0].CustomerId));
                _shared.setSelect2ControlsText(DOM.customer);
                _shared.setSelectValue(DOM.branch, null, parseInt(cashSales[0].BranchId));
                _shared.setSelect2ControlsText(DOM.branch);
                _shared.setSelectValue(DOM.financialYear, null, parseInt(cashSales[0].WorkingPeriodId));
                _shared.setSelect2ControlsText(DOM.financialYear);
                _shared.setSelectValue(DOM.salesman, null, parseInt(cashSales[0].SalesmanId));
                _shared.setSelect2ControlsText(DOM.salesman);
                _shared.setRadioButtonValue(DOM.isTaxInclusive, null, parseInt(cashSales[0].IsTaxInclusive));
                _shared.setSelect2ControlsText(DOM.isTaxInclusive);

                bindCashSaleItems(salesBillId);

                toggleModes("block", "none");
            }
        }
    }

    function getCashSales() {

        DOM.cashSales.tBodies[0].innerHTML = "";

        var saleTypeId = parseInt(1);
        var workingPeriodId = parseInt(0);
        var branchId = parseInt(0);

        if (DOM.financialYear.selectedIndex > 0) {
            workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);            
        }

        if (DOM.branch.selectedIndex > 0) {
            branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
        }

        if (workingPeriodId === 0 && branchId === 0) {

            createNewCashSale();

            return;
        }
        
        _cashSales = [];
        _cashSaleItems = [];

        _shared.sendRequest(SERVICE_PATH + "GetSalesBillsBySaleType/" + branchId + '/' + workingPeriodId + '/' + saleTypeId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            var table = DOM.cashSales;

                            var tableBody = table.tBodies[0];

                            for (var r = 0; r < _response.length; r++) {

                                var cashSaleItems = _response[r].SalesBillItems;

                                cashSaleItems = cashSalesItems.filter(function (value, index, array) {
                                    return value.SalesBillId === parseInt(_response[r].SalesBillId);
                                });

                                var cashSale = {};

                                cashSale = {
                                    SalesBillId: _response[r].SalesBillId,
                                    SalesBillNo: _response[r].SalesBillNo,
                                    SalesBillDate: _response[r].SalesBillDate,
                                    CustomerId: _response[r].CustomerId,
                                    CustomerName: _response[r].CustomerName,
                                    SalesmanId: _response[r].SalesmanId,
                                    SalesmanName: _response[r].SalesmanName,
                                    SaleTypeId: _response[r].SaleTypeId,
                                    GSTApplicable: _response[r].GSTApplicable,
                                    IsTaxInclusive: _response[r].IsTaxInclusive,
                                    BranchId: _response[r].BranchId,
                                    BranchName: _response[r].BranchName,
                                    WorkingPeriodId: _response[r].WorkingPeriodId,
                                    FinancialYear: _response[r].FinancialYear,
                                    TotalCashSaleQty: _response[r].TotalCashSaleQty,
                                    TotalCashSaleAmount: _response[r].TotalCashSaleAmount,
                                    IsDeleted: false
                                };

                                _cashSales.push(cashSale);

                                if (cashSaleItems.length > 0) {

                                    for (var s = 0; s < cashSaleItems.length; p++) {

                                        var cashSaleItem = {};

                                        cashSaleItem = {
                                            SaleBillItemId: cashSaleItems[s].SalesBillItemId,
                                            SalesBillId: cashSalesItems[s].SalesBillId,
                                            ItemId: cashSalesItems[s].ItemId,
                                            ItemName: cashSalesItems[s].ItemName,
                                            ItemQtyInPcs: cashSalesItems[s].SaleQtyInPcs,
                                            ItemQtyInMtrs: cashSalesItems[s].SaleQtyInMtrs,
                                            SaleRate: cashSalesItems[s].SaleRate,
                                            TaxId: cashSalesItems[s].TaxId,
                                            GSTRateId: cashSalesItems[s].GSTRateId,
                                            Amount: cashSalesItems[s].Amount,
                                            GSTRate: cashSalesItems[s].GSTRate,
                                            GSTAmount: cashSalesItems[s].GSTAmount,
                                            TotalItemAmount: cashSalesItems[s].TotalItemAmount,
                                            IsDeleted: false
                                        };

                                        _cashSaleItems.push(cashSaleItem);
                                    }
                                }

                                var currentRow = document.createElement('TR');

                                var data;

                                data = "<tr><td>" + _response[r].SalesBillNo + "</td>";
                                data = data + "<td>" + _response[r].SalesBillDate + "</td>";
                                data = data + "<td>" + _response[r].CustomerName + "</td>";
                                data = data + "<td>" + _response[r].TotalCashSaleQty + "</td>";
                                data = data + "<td>" + _response[r].TotalCashSaleAmount + "</td>";
                                data = data + "<td>" + _response[r].FinancialYear + "</td>";
                                data = data + "<td class='text-center'> " +
                                    "<a href='#' class='btn btn-info btn-xs'  data-name='view' > <i class='fa fa-eye'  data-name='view' ></i> View </a > " +
                                    "<a href='#' class='btn btn-info btn-xs'  data-name='edit' > <i class='fa fa-edit'  data-name='edit' ></i> Edit </a > " +
                                    "<a href='#' class='btn btn-danger btn-xs' data-name='remove' > <i class='fa fa-remove'  data-name='remove' > </i> Delete </a> </td > ";

                                currentRow.setAttribute('data-sales-bill-id', _response[r].SalesBillId);
                                currentRow.innerHTML = data;

                                tableBody.appendChild(currentRow);
                            }

                            toggleModes("none", "block");
                        }
                        else {
                            toggleModes("block", "none");
                        }
                    }
                }
            }
        });
    }

    function saveCashSale() {

        var salesBillId = parseInt(0);
        var salesBillNo = parseInt(0);
        var salesBillDate = null;
        var customerId = parseInt(0);
        var salesmanId = parseInt(0);
        var isTaxInclusive = true;
        var branchId = parseInt(0);
        var workingPeriodId = parseInt(0);

        salesBillId = DOM.billNo.getAttribute('data-sales-bill-id');
        salesBillNo = parseInt(DOM.billNo.value);
        salesBillDate = DOM.billDate.value;
        customerId = parseInt(DOM.customer.options[DOM.customer.selectedIndex].value);
        salesmanId = parseInt(DOM.salesman.options[DOM.salesman.selectedIndex].value);
        isTaxInclusive = _shared.isRadioButtonValueSelected(DOM.isTaxInclusive);
        branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
        workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);

        if (salesBillId === null) { salesBillId = parseInt(0); }

        if (isNaN(salesBillId)) { salesBillId = parseInt(0); }

        var cashSale = {};

        cashSale = {
            SalesBillId: salesBillId,
            SalesOrderId: parseInt(0),
            SalesBillNo: salesBillNo,
            SalesBillDate: salesBillDate,
            CustomerId: customerId,
            SalesmanId: salesmanId,
            SaleTypeId: 1,
            GSTApplicable: _gstApplicable,
            IsTaxInclusive: isTaxInclusive,
            BranchId: branchId,
            WorkingPeriodId: workingPeriodId,
            SalesBillItems: _cashSaleItems,
            IsDeleted: false
        };

        if (parseInt(salesBillId) === parseInt(0)) {

            cashSale.CreatedBy = LOGGED_USER;
            cashSale.CreatedByIp = IP_ADDRESS;
        }
        else {
            cashSale.ModifiedBy = LOGGED_USER;
            cashSale.ModifiedByIp = IP_ADDRESS;
        }

        _cashSales.push(cashSale);

        var postData = JSON.stringify(_cashSales);

        _shared.sendRequest(SERVICE_PATH + "SaveSalesBill", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    getCashSales();
                }
            }
            else {
                swal("error", "Unable to save the Cash Sales Details due to some error.", "error");
                handleError(_response.Message + " " + _response.ExceptionMessage);
                _cashSales = [];
            }
        });
    }

    function addNewCashSaleItem() {

        _shared.clearInputs(DOM.cashSaleItemModal);

        DOM.qtyInPcs.value = parseFloat(0);
        DOM.qtyInMtrs.value = parseFloat(0);
        DOM.saleRate.value = parseFloat(0);
        DOM.amount.value = parseFloat(0);
        DOM.gstRate.value = parseFloat(0);
        DOM.gstAmount.value = parseFloat(0);
        DOM.totalItemAmount.value = parseFloat(0);
        DOM.srNo.value = parseInt(0);
        DOM.salesBillItemId.value = parseInt(0);

        //DOM.hiddenSalesOrderItemId.setAttribute('data-sales-order-item-id', parseInt(0));

        //show modal
        DOM.$cashSalesItemModal.modal('show');

        //set focus
        setFocus();
    }

    function backToCashSaleItemList() {

        DOM.$cashSalesItemModal.modal('hide');
    }

    function bindCashSaleItems(salesBillId) {

        var table = DOM.cashSaleItems;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (isNaN(salesBillId)) { salesBillId = parseInt(0); }

        if (_cashSaleItems.length > 0) {

            var cashSaleItems = _cashSaleItems.filter(function (value, index, array) {
                return value.SalesBillId === salesBillId;
            });

            var itemsCount = cashSaleItems.length;

            if (itemsCount > 0) {

                for (var r = 0; r < itemsCount; r++) {

                    var currentRow = document.createElement('TR');

                    data = "<tr><td>" + cashSaleItems[r].ItemName + "</td>";
                    data += "<td>" + cashSaleItems[r].ItemQtyInPcs + "</td>";
                    data += "<td>" + cashSaleItems[r].ItemQtyInMtrs + "</td>";
                    data += "<td>" + cashSaleItems[r].SaleRate + "</td>";
                    data += "<td>" + cashSaleItems[r].Amount + "</td>";
                    data += "<td>" + cashSaleItems[r].GSTRate + "</td>";
                    data += "<td>" + cashSaleItems[r].GSTAmount + "</td>";
                    data += "<td>" + cashSaleItems[r].TotalItemAmount + "</td>";
                    data += "<td class='text-center'>" +
                        "<a href='#' class='btn btn-info btn-xs' data-name='view' > <i class='fa fa-lg fa-eye' data-name='view'></i> view</a> " +
                        "<a href='#' class='btn btn-info btn-xs' data-name='edit'> <i class='fa fa-lg fa-edit' data-name='edit'></i> edit</a> " +
                        "<a href='#' class='btn btn-danger btn-xs' data-name='remove' > <i class='fa fa-lg fa-remove' data-name='remove'></i> delete</a> </td></tr>";

                    currentRow.setAttribute('data-sales-bill-item-id', parseInt(cashSaleItems[r].SalesBillItemId));
                    currentRow.setAttribute('data-sr-no', parseInt(cashSaleItems[r].SrNo));
                    currentRow.innerHTML = data;

                    tableBody.appendChild(currentRow);
                }
            }
        }
    }

    function cashSaleItems(evt) {

        var element = evt.target;

        var currentTableRow;

        if (element.nodeName === 'I') {
            currentTableRow = element.parentElement.parentElement.parentElement;
        }
        else if (element.nodeName === 'A') {
            currentTableRow = element.parentElement.parentElement;
        }

        if (element.getAttribute('data-name').trim().toUpperCase() === "VIEW") {
            viewCashSaleItem(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "EDIT") {
            editCashSaleItem(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "REMOVE") {
            deleteCashSaleItem(currentTableRow);
        }
    }

    function viewCashSaleItem(currentTableRow) {

        _shared.clearInputs(DOM.cashSaleItemModal);

        _shared.clearTextAreas(DOM.cashSaleItemModal);

        _shared.disableControls(DOM.cashSaleItemModal, true);

        showSelectedCashSaleItemDetails(currentTableRow);
    }

    function editCashSaleItem(currentTableRow) {

        _shared.clearInputs(DOM.cashSaleItemModal);

        _shared.clearTextAreas(DOM.cashSaleItemModal);

        _shared.disableControls(DOM.cashSaleItemModal, false);

        DOM.amount.disabled = true;
        DOM.gstAmount.disabled = true;
        DOM.gstRate.disabled = true;
        DOM.totalItemAmount.disabled = true;

        showSelectedCashSaleItemDetails(currentTableRow);
    }

    function deleteCashSaleItem(currentTableRow) {

        var table = DOM.cashSaleItems;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var salesBillItemId = parseInt(currentTableRow.getAttribute('data-sales-bill-item-id'));

        var cashSaleItem = {};

        cashSaleItem = {
            SalesBillItem: salesBillItemId,
            IsDeleted: true,
            DeletedBy: LOGGED_USER,
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(cashSaleItem);

        _shared.sendRequest(SERVICE_PATH + 'SaveSalesBill', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function addCashSaleItem(cashSaleItem) {

        var srNo = getMaxSrNo(_cashSaleItems, 0);

        //var cashSaleItem = {};

        //cashSaleItem.SrNo = srNo;

        cashSaleItem = {
            SalesBillItemId: cashSaleItem.SalesBillItemId,
            SalesBillId: cashSaleItem.SalesBillId,
            ItemId: cashSaleItem.ItemId,
            ItemName: cashSaleItem.ItemName,
            ItemQtyInPcs: cashSaleItem.QtyInPcs,
            ItemQtyInMtrs: cashSaleItem.QtyInMtrs,
            SaleRate: cashSaleItem.SaleRate,
            TaxId: cashSaleItem.TaxId,
            Amount: cashSaleItem.Amount,
            GSTRate: cashSaleItem.GSTRate,
            GSTAmount: cashSaleItem.GSTAmount,
            TotalItemAmount: cashSaleItem.TotalItemAmount,
            SrNo: srNo,
            GSTRateId: cashSaleItem.GSTRateId,
            CreatedBy: LOGGED_USER,
            CreatedByIp: IP_ADDRESS,
            IsDeleted: false
        };

        _cashSaleItems.push(cashSaleItem);
    }

    function updateCashSaleItem(cashSaleItem) {

        if (_cashSaleItems.length > 0) {

            for (var r = 0; r < _cashSaleItems.length; r++) {

                if (_cashSaleItems[r].SalesBillItemId === salesBillItemId
                    && _cashSaleItems[r].SrNo === srNo) {

                    _cashSaleItems[r].SalesBillItemId = cashSaleItem.SalesBillItemId;
                    _cashSaleItems[r].SalesBillId = cashSaleItem.SalesBillId;
                    _cashSaleItems[r].ItemId = cashSaleItem.ItemId;
                    _cashSaleItems[r].ItemName = cashSaleItem.ItemName;
                    _cashSaleItems[r].QtyInPcs = cashSaleItem.QtyInPcs;
                    _cashSaleItems[r].QtyInMtrs = cashSaleItem.QtyInMtrs;
                    _cashSaleItems[r].SaleRate = cashSaleItem.SaleRate;
                    _cashSaleItems[r].TaxId = cashSaleItem.TaxId;
                    _cashSaleItems[r].Amount = cashSaleItem.Amount;
                    _cashSaleItems[r].GSTRate = cashSaleItem.GSTRate;
                    _cashSaleItems[r].GSTAmount = cashSaleItem.GSTAmount;
                    _cashSaleItems[r].TotalItemAmount = cashSaleItem.TotalItemAmount;
                    _cashSaleItems[r].SrNo = cashSaleItem.SrNo;
                    _cashSaleItems[r].GSTRateId = cashSaleItem.GSTRateId;
                    _cashSaleItems[r].RateCategoryId = parseInt(1);
                    _cashSaleItems[r].IsDeleted = false;
                    _cashSaleItems[r].ModifiedBy = LOGGED_USER;
                    _cashSaleItems[r].ModifiedByIp = IP_ADDRESS;
                    break;
                }
            }
        }
    }

    function saveCashSaleItem() {

        if (validateCashSaleItem() === true) {

            var salesBillItemId = parseInt(0);
            var salesBillId = parseInt(0);
            var itemId = parseInt(0);
            var itemName = null;
            var qtyInPcs = parseFloat(0);
            var qtyInMtrs = parseFloat(0);
            var saleRate = parseFloat(0);
            var amount = parseFloat(0);
            var gstRate = parseFloat(0);
            var gstAmount = parseFloat(0);
            var totalItemAmount = parseFloat(0);
            var taxId = parseInt(0)
            var gstRateId = parseInt(0);
            var srNo = parseInt(0);

            salesBillItemId = parseInt(DOM.salesBillItemId.value);
            salesBillId = parseInt(DOM.billNo.getAttribute('data-sales-bill-id'));
            itemId = parseInt(DOM.itemName.options[DOM.itemName.selectedIndex].value);
            itemName = DOM.itemName.options[DOM.itemName.selectedIndex].text;
            qtyInPcs = parseFloat(parseFloat(DOM.qtyInPcs.value).toFixed(2));
            qtyInMtrs = parseFloat(parseFloat(DOM.qtyInMtrs.value).toFixed(2));
            saleRate = parseFloat(parseFloat(DOM.saleRate.value).toFixed(2));
            amount = parseFloat(parseFloat(DOM.amount.value).toFixed(2));
            gstRate = parseFloat(parseFloat(DOM.gstRate.value).toFixed(2));
            gstAmount = parseFloat(parseFloat(DOM.gstAmount.value).toFixed(2));
            totalItemAmount = parseFloat(parseFloat(DOM.totalItemAmount.value).toFixed(2));
            taxId = parseInt(DOM.gstRate.getAttribute('data-tax-id'));
            gstRateId = parseInt(DOM.gstRate.getAttribute('data-gst-rate-id'));
            srNo = parseInt(DOM.srNo.value);

            if (isNaN(salesBillItemId)) { salesBillItemId = parseInt(0); }
            if (isNaN(salesBillId)) { salesBillId = parseInt(0); }
            if (isNaN(itemId)) { itemId = parseInt(0); }

            var cashSaleItem = {};

            cashSaleItem = {
                SalesBillItemId: salesBillItemId,
                SalesBillId: salesBillId,
                ItemId: itemId,
                ItemName: itemName,
                QtyInPcs: qtyInPcs,
                QtyInMtrs: qtyInMtrs,
                SaleRate: saleRate,
                TaxId: taxId,
                Amount: amount,
                GSTRate: gstRate,
                GSTAmount: gstAmount,
                TotalItemAmount: totalItemAmount,
                SrNo: srNo,
                GSTRateId: gstRateId,
                IsDeleted: false
            };


            if (salesBillItemId === parseInt(0)
                && srNo === parseInt(0)) {

                addCashSaleItem(cashSaleItem);
            }
            else {

                updateCashSaleItem(cashSaleItem);
            }

            bindCashSaleItems(salesBillId);
        }
    }

    function saveAndAddNewItem() {

        saveCashSaleItem();

        addNewCashSaleItem();

        DOM.itemName.focus();
    }

    function validateCashSaleItem() {

        var isValid = true;

        if (DOM.itemName.selectedIndex === "0") {
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

    function showSelectedCashSaleItemDetails(currentTableRow) {

        if (_cashSaleItems.length > 0) {

            var salesBillItemId = parseInt(currentTableRow.getAttribute('data-sales-bill-item-id'));

            var srNo = parseInt(currentTableRow.getAttribute('data-sr-no'));

            DOM.srNo.value = srNo;

            DOM.salesBillItemId.value = salesBillItemId;

            var data = _cashSaleItems.filter(function (value, index, array) {

                return value.SalesBillItemId === salesBillItemId
                    && value.SrNo === parseInt(srNo);
            });

            if (data.length > 0) {

                _shared.setSelectValue(DOM.itemName, null, parseInt(data[0].ItemId));
                _shared.setSelect2ControlsText(DOM.itemName);                
                DOM.qtyInPcs.value = data[0].ItemQtyInPcs;
                DOM.qtyInMtrs.value = data[0].ItemQtyInMtrs;
                DOM.saleRate.value = data[0].SaleRate;
                DOM.amount.value = data[0].Amount;
                DOM.gstRate.value = data[0].GSTRate;
                DOM.gstAmount.value = data[0].GSTAmount;
                DOM.totalItemAmount.value = data[0].TotalItemAmount;
                
                DOM.$cashSalesItemModal.modal('show');
            }
        }
    }


    /* ---- public methods ---- */
    function init() {
        _cacheDOM();
        bindEvents();
        applyPlugins();
        loadData();
        getCashSales();
    }

    return {
        init: init
    };

}());


SharpiTech.CashSales.init();
