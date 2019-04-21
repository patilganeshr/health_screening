
var SharpiTech = {};

SharpiTech.StockDetails = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    var _stockDetails = [];

    /* ---- private method ---- */

    //cache DOM elements
    function _cacheDOM() {

        DOM.editMode = document.getElementById('EditMode');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.branch = document.getElementById('Branch');
        DOM.stockId = document.getElementById('StockId');
        DOM.vendor = document.getElementById('Vendor');
        DOM.item = document.getElementById('Item');
        DOM.stockDate = document.getElementById('StockDate');
        DOM.stockDatePicker = document.getElementById('StockDatePicker');
        DOM.baleNo = document.getElementById('BaleNo');
        DOM.lotNo = document.getElementById('LotNo');
        DOM.purchaseRate = document.getElementById('PurchaseRate');
        DOM.receivedQtyInPcs = document.getElementById('ReceivedQtyInPcs');
        DOM.receivedQtyInMtrs = document.getElementById('ReceivedQtyInMtrs');
        DOM.location = document.getElementById('Location');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.stockItemList = document.getElementById('StockItemList');

        DOM.addNewStockItem = document.getElementById('AddNewStockItem');
        DOM.refreshStockItem = document.getElementById('RefreshStockItem');
        DOM.backToStockList = document.getElementById('BackToStockList');
        DOM.saveStockDetails = document.getElementById('SaveStockDetails');
        DOM.saveAndAddNewStockDetails = document.getElementById('SaveAndAddNewStockDetails');

        /* Jquery cache */
        DOM.$stockDatePicker = $('#StockDatePicker');
    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        DOM.$stockDatePicker.datetimepicker({
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

        DOM.addNewStockItem.addEventListener('click', addNewStockItem);
        DOM.backToStockList.addEventListener('click', backToStockList);
        DOM.saveStockDetails.addEventListener('click', saveStockDetails);
        DOM.saveAndAddNewStockDetails.addEventListener('click', saveAndAddNewStockDetails);
        DOM.stockItemList.addEventListener('click', stockItemList);
        DOM.refreshStockItem.addEventListener('click', refreshStockItem);

        DOM.purchaseRate.onkeydown = function validate(e) {
            return _shared.acceptDecimalNos(e);
        }

        DOM.receivedQtyInPcs.onkeydown = function validate(e) {
            return _shared.acceptDecimalNos(e);
        };

        DOM.receivedQtyInMtrs.onkeydown = function validate(e) {
            return _shared.acceptDecimalNos(e);
        }
    }

    function loadData() {

        getFinancialYears();
        getBranchNames();
        getVendors();
        getItems();
        getGoodsReceivedLocations();
    }

    function getFinancialYears() {

        _shared.fillDropdown(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year");
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

    function getVendors() {

        _shared.fillDropdown(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/2', DOM.vendor, "ClientAddressName", "ClientAddressId", "Choose Vendor");

    }

    function getItems() {

        _shared.fillDropdown(SERVICE_PATH + 'GetItemsByBrandCategoryAndQuality', DOM.item, "ItemName", "ItemId", "Choose Item");
    }


    function getGoodsReceivedLocations() {

        _shared.fillDropdown(SERVICE_PATH + 'GetAllBranchNames', DOM.location, "BranchName", "BranchId", "Choose Branch");
    }

    function addNewStockItem() {

        _shared.clearInputs(DOM.editMode);

        _stockDetails = [];

        DOM.stockId.value = parseInt(0);

        var currentDate = new Date();

        DOM.stockDate.value = moment(currentDate).format("DD/MMM/YYYY");

        toggleModes("block", "none");

        DOM.vendor.focus();
    }

    function backToStockList() {

        getStockDetails();

        toggleModes("none", "block");
    }

    function stockItemList(evt) {

        var element = evt.target;

        var currentTableRow;

        if (element.nodeName === 'I') {
            currentTableRow = element.parentElement.parentElement.parentElement;
        }
        else if (element.nodeName === 'A') {
            currentTableRow = element.parentElement.parentElement;
        }

        if (element.getAttribute('data-name').trim().toUpperCase() === "VIEW") {
            viewStockDetails(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "EDIT") {
            editStockDetails(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "REMOVE") {
            deleteStockDetails(currentTableRow);
        }
    }

    function viewStockDetails(currentTableRow) {

        _shared.clearInputs(DOM.editMode);

        _shared.clearTextAreas(DOM.editMode);

        _shared.disableControls(DOM.editMode, true);

        showStockDetails(currentTableRow);
    }

    function editStockDetails(currentTableRow) {

        _shared.clearInputs(DOM.editMode);

        _shared.clearTextAreas(DOM.editMode);

        _shared.disableControls(DOM.editMode, false);

        showStockDetails(currentTableRow);
    }

    function deleteStockDetails(currentTableRow) {

        var table = DOM.stockItemList;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var stockId = currentTableRow.getAttribute('data-stock-id');

        var stockDeatils = {};

        stockDetails = {
            StockId: stockId,
            IsDeleted: true,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(stockDetails);

        _shared.sendRequest(SERVICE_PATH + 'SaveStockDetails', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "1") {
                    tableBody.removeChild(currentTableRow);
                    swal("success", "Stock Details deleted successfully.", "success");
                    handleError(_response.Message + " " + _response.ExceptionMessage);
                }
            }
            else {
                swal("error", "Unable to delete the Stock Details due to some error.", "error");
                handleError(_response.Message + " " + _response.ExceptionMessage);
            }
        });
    }

    function setFocus() {
        DOM.vendor.focus();
    }

    function refreshStockItem() {

        getStockDetails();
    }

    function validateStockDetails() {

            var isValid = true;

            if (DOM.vendor.selectedIndex === "0" || DOM.vendor.selectedIndex === -1) {
                DOM.vendor.focus();
                swal("Error!!!", "Please select the Vendor Name.", "error");
                isValid = false;
            }
            else if (DOM.financialYear.selectedIndex === "0") {
                DOM.financialYear.focus();
                swal("Error!!!", "Please select the Financial Year.", "error");
                isValid = false;
            }
            else if (DOM.branch.selectedIndex === 0) {
                DOM.branch.focus();
                swal("Error!!!", "Please select the Branch Name.", "error");
                isValid = false;
            }
            else if (DOM.item.selectedIndex === 0) {
                DOM.item.focus();
                swal("Error!!!", "Please select the Item Name.", "error");
                isValid = false;
            }
            else if (DOM.stockDate.value === "") {
                DOM.stockDate.focus();
                swal("Error!!!", "Please enter the Stock Date.", "error");
                isValid = false;
            }
            else if (DOM.baleNo.value === "") {
                DOM.baleNo.focus();
                swal("Error!!!", "Please enter the Bale No..", "error");
                isValid = false;
            }
            else if (DOM.lotNo.value === "") {
                DOM.lotNo.focus();
                swal("Error!!!", "Please enter the Lot No..", "error");
                isValid = false;
            }
            else if (DOM.purchaseRate.value === "") {
                DOM.purhaseRate.focus();
                swal("Error!!!", "Please enter the Purchase Rate.", "error");
                isValid = false;
            }
            else if (DOM.receivedQtyInPcs.value === "") {
                DOM.receivedQtyInPcs.focus();
                swal("Error!!!", "Please enter the Received Qty In Pcs.", "error");
                isValid = false;
            }
            else if (DOM.receivedQtyInMtrs.value !== "") {
                if (DOM.receivedQtyInPcs.value === "") {
                    DOM.receivedQtyInMtrs.focus();
                    swal("Error!!!", "Please enter the Received Qty in Pcs also.", "error");
                    isValid = false;
                }
            }
            else if (DOM.location.selectedIndex === 0) {
                DOM.location.focus();
                swal("Error!!!", "Please select the Location Name.", "error");
                isValid = false;
            }

            return isValid;
    }
    
    function getStockDetails() {

        DOM.stockItemList.tBodies[0].innerHTML = "";

        _stockDetails = [];
        
        _shared.sendRequest(SERVICE_PATH + "GetStockDetails", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            var table = DOM.stockItemList;

                            var tableBody = table.tBodies[0];

                            for (var r = 0; r < _response.length; r++) {

                                var stockDetails = {};

                                stockDetails = {
                                    StockId: _response[r].StockId,
                                    VendorId: _response[r].VendorId,
                                    VendorName: _response[r].VendorName,
                                    ItemId: _response[r].ItemId,
                                    ItemName: _response[r].ItemName,
                                    ItemQualityName: _response[r].ItemQualityName,
                                    StockDate: _response[r].StockDate,
                                    BaleNo: _response[r].BaleNo,
                                    LotNo: _response[r].LotNo,
                                    PurchaseRate: _response[r].PurchaseRate,
                                    ReceivedQtyInPcs: _response[r].ReceivedQtyInPcs,
                                    ReceivedQtyInMtrs: _response[r].ReceivedQtyInMtrs,
                                    GoodsReceivedLocationId: _response[r].GoodsReceivedLocationId,
                                    GoodsReceivedLocationName: _response[r].GoodsReceivedLocationName,
                                    BranchId: _response[r].BranchId,
                                    BranchName: _response[r].BranchName,
                                    WorkingPeriodId: _response[r].WorkingPeriodId,
                                    FinancialYear: _response[r].FinancialYear,
                                    guid: _response[r].guid,
                                    SrNo: _response[r].SrNo,
                                    IsDeleted: false
                                };

                                _stockDetails.push(stockDetails);
                                
                                var currentRow = document.createElement('TR');

                                var data;

                                data = "<tr><td>" + _response[r].SrNo + "</td>";
                                data = data + "<td>" + _response[r].LotNo + "</td>";
                                data = data + "<td>" + _response[r].StockDate + "</td>";
                                data = data + "<td>" + _response[r].ItemName + "</td>";
                                data = data + "<td>" + _response[r].ItemQualityName + "</td>";
                                data = data + "<td>" + _response[r].VendorName + "</td>";
                                data = data + "<td>" + _response[r].BaleNo + "</td>";
                                data = data + "<td>" + _response[r].ReceivedQtyInPcs + "</td>";
                                data = data + "<td>" + _response[r].ReceivedQtyInMtrs + "</td>";                                
                                data = data + "<td>" + _response[r].PurchaseRate + "</td>";
                                data = data + "<td>" + _response[r].GoodsReceivedLocationName + "</td>";
                                data = data + "<td class='text-center'> " +
                                    "<a href='#' class='btn btn-info btn-xs' data-name='view'> <i class='fa fa-eye' data-name='view'></i> View </a > " +
                                    "<a href='#' class='btn btn-info btn-xs' data-name='edit'> <i class='fa fa-edit' data-name='edit'></i> Edit </a > " +
                                    "<a href='#' class='btn btn-danger btn-xs' data-name='remove'> <i class='fa fa-remove' data-name='remove'> </i> Delete </a> </td > ";

                                currentRow.setAttribute('data-stock-id', _response[r].StockId);
                                currentRow.setAttribute('data-item-id', _response[r].ItemId);
                                
                                currentRow.innerHTML = data;

                                tableBody.appendChild(currentRow);
                                
                            }

                            toggleModes("none", "block"); 
                        }
                        else {
                            toggleModes("block", "none");
                            addNewStockItem();
                        }
                    }
                }
            }
        });
    }

    function showStockDetails(currentTableRow) {

        if (_stockDetails.length > 0) {

            var stockId = parseInt(currentTableRow.getAttribute('data-stock-id'));

            DOM.stockId.value = stockId;

            var data = _stockDetails.filter(function (value, index, array) {
                return value.StockId === parseInt(stockId);
            });

            if (data.length > 0) {
                
                _shared.setSelectValue(DOM.vendor, null, parseInt(data[0].VendorId));
                _shared.setSelect2ControlsText(DOM.vendor);
                _shared.setSelectValue(DOM.item, null, parseInt(data[0].ItemId));
                _shared.setSelect2ControlsText(DOM.item);
                DOM.stockDate.value = data[0].StockDate;
                DOM.baleNo.value = data[0].BaleNo;
                DOM.lotNo.value = data[0].LotNo;
                DOM.purchaseRate.value = data[0].PurchaseRate;
                DOM.receivedQtyInPcs.value = data[0].ReceivedQtyInPcs;
                DOM.receivedQtyInMtrs.value = data[0].ReceivedQtyInMtrs;
                _shared.setSelectValue(DOM.location, null, parseInt(data[0].GoodsReceivedLocationId));
                _shared.setSelect2ControlsText(DOM.location);
                _shared.setSelectValue(DOM.branch, null, parseInt(data[0].BranchId));
                _shared.setSelect2ControlsText(DOM.branch);
                _shared.setSelectValue(DOM.financialYear, null, parseInt(data[0].WorkingPeriodId));
                _shared.setSelect2ControlsText(DOM.financialYear);
                

                toggleModes("block", "none"); 
            }
        }
    }

    function saveStockDetails() {

        if (validateStockDetails()) {

            /* temp variable */
            var stockId = parseInt(0);
            var vendorId = parseInt(0);
            var itemId = parseInt(0);
            var stockDate = null;
            var baleNo = null;
            var lotNo = null;
            var purchaseRate = parseFloat(0);
            var receivedQtyInPcs = parseFloat(0);
            var receivedQtyInMtrs = parseFloat(0);
            var goodsReceivedLocationId = parseInt(0);
            var branchId = parseInt(0);
            var workigPeriodId = parseInt(0);
            
            stockId = parseInt(DOM.stockId.value);
            vendorId = parseInt(DOM.vendor.options[DOM.vendor.selectedIndex].value);
            itemId = parseInt(DOM.item.options[DOM.item.selectedIndex].value);
            stockDate = DOM.stockDate.value;
            baleNo = DOM.baleNo.value;
            lotNo = DOM.lotNo.value;
            purchaseRate = parseFloat(DOM.purchaseRate.value);
            receivedQtyInPcs = parseFloat(DOM.receivedQtyInPcs.value);
            receivedQtyInMtrs = parseFloat(DOM.receivedQtyInMtrs.value);
            goodsReceivedLocationId = parseInt(DOM.location.options[DOM.location.selectedIndex].value);
            branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
            workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);
            
            if (isNaN(stockId)) { stockId = parseInt(0); }
            if (isNaN(vendorId)) { vendorId = parseInt(0); }
            if (isNaN(itemId)) { itemId = parseInt(0); }

            _stockDetails = [];

            var stockDetails = {};

            stockDetails = {
                stockId: stockId,
                VendorId: vendorId,
                ItemId: itemId,
                StockDate: stockDate,
                BaleNo: baleNo,
                LotNo: lotNo,
                PurchaseRate: purchaseRate,
                ReceivedQtyInPcs: receivedQtyInPcs,
                ReceivedQtyInMtrs: receivedQtyInMtrs,
                GoodsReceivedLocationId: goodsReceivedLocationId,
                BranchId: branchId,
                WorkingPeriodId: workingPeriodId,
                IsDeleted: false
            };

            if (parseInt(stockId) === parseInt(0)) {

                stockDetails.CreatedBy = LOGGED_USER;
                stockDetails.CreatedByIp = IP_ADDRESS;
            }
            else {

                stockDetails.ModifiedBy = LOGGED_USER;
                stockDetails.ModifiedByIp = IP_ADDRESS;
            }

            _stockDetails.push(stockDetails);            

            var postData = JSON.stringify(stockDetails);

            _shared.sendRequest(SERVICE_PATH + "SaveStockDetails", "POST", true, "JSON", postData, function (response) {

                var _response = JSON.parse(response.responseText);

                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        getStockDetails();
                    }
                }
                else {
                    swal("error", "Unable to save the Stock Details due to some error.", "error");
                    handleError(_response.Message + " " + _response.ExceptionMessage);
                }
            });
        }
    }

    function saveAndAddNewStockDetails() {

        saveStockDetails();

        DOM.vendor.focus();

    }
    
    function toggleModes(editModeDisplay, viewModeDisplay) {

        DOM.editMode.style.display = editModeDisplay;
        DOM.viewMode.style.display = viewModeDisplay;
    }

    /* ---- public methods ---- */
    function init() {
        _cacheDOM();
        applyPlugins();
        bindEvents();
        loadData();
        getStockDetails();
    }

    return {
        init: init
    };

}());


SharpiTech.StockDetails.init();
