
var SharpiTech = {};

SharpiTech.GoodsReceipt = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();
    var FLAG = "";
    var goodsReceipts = [];
    var goodsReceiptItems = [];

    /* ---- private method ---- */

    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.addNewGoodsReceipt = document.getElementById('AddNewGoodsReceipt');
        DOM.showGoodsReceiptList = document.getElementById('ShowGoodsReceiptList');
        DOM.viewGoodsReceipt = document.getElementById('ViewGoodsReceipt');
        DOM.editGoodsReceipt = document.getElementById('EditGoodsReceipt');
        DOM.saveGoodsReceipt = document.getElementById('SaveGoodsReceipt');
        DOM.deleteGoodsReceipt = document.getElementById('DeleteGoodsReceipt');
        DOM.printGoodsReceipt = document.getElementById('PrintGoodsReceipt');
        DOM.exportGoodsReceiptList = document.getElementById('ExportGoodsReceiptList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.vendor = document.getElementById('Vendor');
        DOM.purchaseBillNo = document.getElementById('PurchaseBillNo');        
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.branch = document.getElementById('Branch');
        DOM.goodsReceiptNo = document.getElementById('GoodsReceiptNo');
        DOM.goodsReceiptDate = document.getElementById('GoodsReceiptDate');
        DOM.goodsReceiptDatePicker = document.getElementById('GoodsReceiptDatePicker');
        DOM.$goodsReceiptDatePicker = $('#GoodsReceiptDatePicker');
        DOM.location = document.getElementById('Location');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.goodsReceiptList = document.getElementById('GoodsReceiptList');
        DOM.goodsReceiptItemsList = document.getElementById('GoodsReceiptItemsList');
    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        DOM.$goodsReceiptDatePicker.datetimepicker({
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

        DOM.addNewGoodsReceipt.addEventListener('click', addNewGoodsReceipt);
        DOM.showGoodsReceiptList.addEventListener('click', getGoodsReceipts);
        DOM.viewGoodsReceipt.addEventListener('click', viewGoodsReceipt);
        DOM.editGoodsReceipt.addEventListener('click', editGoodsReceipt);
        DOM.deleteGoodsReceipt.addEventListener('click', deleteGoodsReceipt);
        DOM.saveGoodsReceipt.addEventListener('click', saveGoodsReceipt);        
        
        //DOM.receivedQtyInPcs.onkeydown = function validate(e) {
        //    return shared.acceptDecimalNos(e);
        //};

        //DOM.receivedQtyInMtrs.onkeydown = function validate(e) {
        //    return shared.acceptDecimalNos(e);
        //}

        DOM.vendor.onchange = function (e) {
            getPendingPurchaseBills(parseInt(e.currentTarget.value));
        }

        DOM.purchaseBillNo.onchange = function (e) {
            getPurchaseBillItems(parseInt(e.currentTarget.value));
        }
    }

    function loadData() {
        getFinancialYears();
        getBranchNames();
        getVendors();
        getGoodsReceivedLocations();
        getGoodsReceipts();
    }

    function getFinancialYears() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {
            if (response.status === 200) {
                if (response.responseText !== undefined) {
                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
                    shared.setSelect2ControlsText(DOM.financialYear);
                }
            }
        });
    }

    function getBranchNames() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllBranchNames', DOM.branch, "BranchName", "BranchId", "Choose Branch", function (response) {
            if (response.status === 200) {
                if (response.responseText !== undefined) {
                    shared.setSelectOptionByIndex(DOM.branch, parseInt(1));
                    shared.setSelect2ControlsText(DOM.branch);                }
            }
        });
    }

    function getVendors() {

        //shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/2', DOM.vendor, "ClientAddressName", "ClientAddressId", "Choose Vendor", function (response) {
        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetPendingVendors', DOM.vendor, "VendorName", "VendorId", "Choose Vendor", function (response) {
            if (response.status === 200) {
                if (response.responseText !== undefined) {
                    shared.setSelectOptionByIndex(DOM.vendor, parseInt(1));
                    shared.setSelect2ControlsText(DOM.vendor);
                }
            }
        });
    }

    function getGoodsReceivedLocations() {

        var dataAttributes = "LocationTypeID";

        shared.fillDropdownWithDataAttributesAndCallback(SERVICE_PATH + 'GetAllLocationsWithLocationTypes', DOM.location, "LocationName", "LocationId", "Choose Location", dataAttributes, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.location, parseInt(1));
                    shared.setSelect2ControlsText(DOM.location);

                }
            }
        });

    }

    var getSelectedRows = function (nameOfControl) {

        var selectedRows = [];

        var tableBody = nameOfControl.tBodies[0];

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

    var getGoodsReceiptId = function (selectedRows) {

        var goodsReceiptId = 0;

        goodsReceiptId = parseInt(selectedRows[0].getAttribute('data-goods-receipt-id'));

        if (isNaN(goodsReceiptId)) { goodsReceiptId = 0; }

        return goodsReceiptId;
    }


    function addNewGoodsReceipt() {

        FLAG = "NEW";

        shared.clearInputs(DOM.editMode);
        shared.clearTextAreas(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);
        shared.disableControls(DOM.editMode, false);

        shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
        shared.setSelect2ControlsText(DOM.financialYear);
        shared.setSelectOptionByIndex(DOM.branch, parseInt(1));
        shared.setSelect2ControlsText(DOM.branch);
                        
        goodsReceipts.length = 0;
        goodsReceiptItems.length = 0;

        DOM.goodsReceiptNo.setAttribute('data-goods-receipt-id', parseInt(0));
        DOM.goodsReceiptNo.disabled = true;

        var currentDate = new Date();
        
        DOM.goodsReceiptDate.value = moment(currentDate).format("DD/MMM/YYYY");

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.vendor.focus();
    }

    function viewGoodsReceipt() {

        FLAG = "VIEW";

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearTextAreas(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);
        shared.disableControls(DOM.editMode, true);

        shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
        shared.setSelect2ControlsText(DOM.financialYear);
        shared.setSelectOptionByIndex(DOM.branch, parseInt(1));
        shared.setSelect2ControlsText(DOM.branch);
        
        var selectedRows = getSelectedRows(DOM.goodsReceiptList);

        if (selectedRows.length) {

            if (selectedRows.length > 1) {
                swal({
                    title: "Warning",
                    text: "Please select only one record to View or Edit the Records.",
                    type: "success"
                }, function () {
                    shared.hideLoader(DOM.loader);
                });
            }
            else {

                var goodsReceiptId = getGoodsReceiptId(selectedRows);

                showGoodsReceiptDetails(goodsReceiptId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

        DOM.goodsReceiptNo.focus();
    }

    function editGoodsReceipt() {

        FLAG = "EDIT";

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearTextAreas(DOM.editMode);
        shared.disableControls(DOM.editMode, true);

        DOM.location.disabled = false;

        var selectedRows = getSelectedRows(DOM.goodsReceiptList);

        if (selectedRows.length) {

            if (selectedRows.length > 1) {
                swal({
                    title: "Warning",
                    text: "Please select only one record to View or Edit the Records.",
                    type: "success"
                }, function () {
                    shared.hideLoader(DOM.loader);
                });
            }
            else {

                var goodsReceiptId = getGoodsReceiptId(selectedRows);

                showGoodsReceiptDetails(goodsReceiptId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

        DOM.goodsReceiptNo.focus();
    }

    function checkIsGoodReceiptItemExistsInSalesBill(goodsReceiptId, callback) {

        var isGoodsReceiptExists = false;

        shared.sendRequest(SERVICE_PATH + 'CheckGoodsReceiptExistsInSalesBill/' + goodsReceiptId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {
                callback(response.responseText);
            }
            else {
                swal("Error", "Unable to delete the records.", "error");
            }
        });
    }

    function deleteGoodsReceipt() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.goodsReceiptList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.goodsReceiptList);

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

                                var receipts = [];

                                if (goodsReceipts.length) {

                                    var goodsReceiptId = parseInt(selectedRows[r].getAttribute('data-goods-receipt-id'));

                                    checkIsGoodReceiptItemExistsInSalesBill(goodsReceiptId, function (response) {
                                        if (response === "true") {
                                            swal({
                                                title: "Warning",
                                                text: "Sales Bill is generated against this Goods Receipt Items so can not delete.",
                                                type: "warning"
                                            }, function () {
                                                shared.hideLoader(DOM.loader);
                                            });
                                        }
                                        else if (response === "false") {

                                            receipts = goodsReceipts.filter(function (value, index, array) {
                                                return value.GoodsReceiptId === goodsReceiptId;
                                            });

                                            if (receipts.length) {

                                                var receiptItems = goodsReceiptItems.filter(function (value, index, array) {
                                                    return value.GoodsReceiptId === goodsReceiptId && value.IsDeleted === false;
                                                });

                                                receipts[0].IsDeleted = true;
                                                receipts[0].DeletedBy = parseInt(LOGGED_USER);
                                                receipts[0].DeletedByIP = IP_ADDRESS;

                                                if (receiptItems.length) {
                                                    for (var ri = 0; ri < receiptItems.length; ri++) {
                                                        receiptItems[ri].IsDeleted = true;
                                                        receiptItems[ri].DeletedBy = parseInt(LOGGED_USER);
                                                        receiptItems[ri].DeletedByIP = IP_ADDRESS;
                                                    }

                                                    receipts[0].GoodsReceiptItems = receiptItems;
                                                }
                                            }


                                            var postData = JSON.stringify(receipts);

                                            shared.sendRequest(SERVICE_PATH + 'SaveGoodsReceipt', "POST", true, "JSON", postData, function (response) {

                                                if (response.status === 200) {

                                                    if (parseInt(response.responseText) > 0) {

                                                        swal({
                                                            title: "Success",
                                                            text: "Goods Receipt deleted successfully.",
                                                            type: "success"
                                                        }, function () {
                                                            getGoodsReceipts();
                                                        });
                                                    }
                                                    else {
                                                        swal("Error", "Unable to delete the records due to some error.", "Error");
                                                    }
                                                }

                                                shared.hideLoader(DOM.loader);

                                            });
                                        }

                                    });
                                }
                            }
                        }
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

    function getGoodsReceipts() {

        shared.showLoader(DOM.loader);

        DOM.goodsReceiptList.tBodies[0].innerHTML = "";

        goodsReceipts.length = 0;
        goodsReceiptItems.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllGoodsReceipts", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res !== undefined) {

                        if (res.length > 0) {

                            for (var r = 0; r < res.length; r++) {

                                var goodsReceipt = {};

                                goodsReceipt = {
                                    GoodsReceiptId: res[r].GoodsReceiptId,
                                    PurchaseBillId: res[r].PurchaseBillId,
                                    GoodsReceiptNo: res[r].GoodsReceiptNo,
                                    GoodsReceiptDate: res[r].GoodsReceiptDate,
                                    PurchaseBillNo: res[r].PurchaseBillNo,
                                    VendorId: res[r].VendorId,
                                    VendorName: res[r].VendorName,
                                    TotalQtyReceived: res[r].TotalQtyReceived,
                                    UnitOfMeasurementId: res[r].UnitOfMeasurementId,
                                    UnitCode: res[r].UnitCode,
                                    GoodsReceivedLocationId: res[r].GoodsReceivedLocationId,
                                    GoodsReceivedLocationName: res[r].GoodsReceivedLocationName,
                                    BranchId: res[r].BranchId,
                                    BranchName: res[r].BranchName,
                                    WorkingPeriodId: res[r].WorkingPeriodId,
                                    FinancialYear: res[r].FinancialYear,
                                    guid: res[r].guid,
                                    SrNo: res[r].SrNo,
                                    IsDeleted: false
                                };

                                goodsReceipts.push(goodsReceipt);

                                var receiptItems = res[r].GoodsReceiptItems;

                                if (receiptItems.length > 0) {

                                    for (var ri = 0; ri < receiptItems.length; ri++) {

                                        var goodsReceiptItem = {};

                                        goodsReceiptItem = {
                                            GoodsReceiptItemId: receiptItems[ri].GoodsReceiptItemId,
                                            GoodsReceiptId: receiptItems[ri].GoodsReceiptId,
                                            PurchaseBillItemId: receiptItems[ri].PurchaseBillItemId,
                                            ItemId: receiptItems[ri].ItemId,
                                            ItemName: receiptItems[ri].ItemName,
                                            BaleNo: receiptItems[ri].BaleNo,
                                            LRNo: receiptItems[ri].LRNo,
                                            PurchaseQty: receiptItems[ri].PurchaseQty,
                                            UnitOfMeasurementId: receiptItems[ri].UnitOfMeasurementId,
                                            UnitCode: receiptItems[ri].UnitCode,
                                            ReceivedQty: receiptItems[ri].ReceivedQty,                                            
                                            guid: receiptItems[ri].guid,
                                            SrNo: receiptItems[ri].SrNo,
                                            IsDeleted: false,
                                            CreatedBy: null,
                                            CreatedByIP: null,
                                            ModifiedBy: null,
                                            ModifiedByIP: null
                                        };

                                        goodsReceiptItems.push(goodsReceiptItem);
                                    }
                                }
                            }

                            bindGoodsReceiptDetails();
                        }
                        else {
                            
                            addNewGoodsReceipt();
                        }
                    }
                }

                shared.hideLoader(DOM.loader);
            }
        });
    }

    function bindGoodsReceiptDetails() {

        var tableBody = DOM.goodsReceiptList.tBodies[0];

        tableBody.innerHTML = "";

        if (goodsReceipts.length > 0) {

            var data = "";

            for (var d = 0; d < goodsReceipts.length; d++) {

                data = data + "<tr data-goods-receipt-id=" + goodsReceipts[d].GoodsReceiptId + " data-purchase-bill-id=" + goodsReceipts[d].PurchaseBillId + ">";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + goodsReceipts[d].GoodsReceiptId + "' class='label-checkbox' name='SelectGoodsReceipt' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + goodsReceipts[d].SrNo + "</td>";
                data = data + "<td>" + goodsReceipts[d].VendorName + "</td>";
                data = data + "<td>" + goodsReceipts[d].PurchaseBillNo + "</td>";
                data = data + "<td>" + goodsReceipts[d].GoodsReceiptNo + "</td>";
                data = data + "<td>" + goodsReceipts[d].GoodsReceiptDate + "</td>";
                data = data + "<td>" + goodsReceipts[d].TotalQtyReceived + "</td>";
                data = data + "<td>" + goodsReceipts[d].UnitCode + "</td>";
                data = data + "<td>" + goodsReceipts[d].GoodsReceivedLocationName + "</td>";
                data = data + "</tr>";
            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }
    }

    function showGoodsReceiptDetails(goodsReceiptId) {

        shared.showLoader(DOM.loader);

        if (goodsReceipts.length > 0) {

            var data = goodsReceipts.filter(function (value, index, array) {
                return value.GoodsReceiptId === goodsReceiptId
                    && (value.IsDeleted === false || value.IsDeleted === null);
            });

            if (data.length > 0) {

                shared.setSelectValue(DOM.vendor, null, parseInt(data[0].VendorId));
                shared.setSelect2ControlsText(DOM.vendor);
                DOM.goodsReceiptNo.value = data[0].GoodsReceiptNo;
                DOM.goodsReceiptNo.setAttribute('data-goods-receipt-id', data[0].GoodsReceiptId);
                DOM.goodsReceiptDate.value = data[0].GoodsReceiptDate;
                shared.setSelectValue(DOM.location, null, parseInt(data[0].GoodsReceivedLocationId));
                shared.setSelect2ControlsText(DOM.location);
                
                fillPurchaseBill(data[0].PurchaseBillNo, parseInt(data[0].PurchaseBillId));

                bindReceiptItems(goodsReceiptId);

                shared.showPanel(DOM.editMode);
                shared.hidePanel(DOM.viewMode);
            }
        }

        shared.hideLoader(DOM.loader);
    }

    function fillPurchaseBill(purchaseBillNo, purchaseBillId) {

        DOM.purchaseBillNo.options.length = 0;

        shared.fillDropdownWithSingleValue(DOM.purchaseBillNo, purchaseBillNo, purchaseBillId, "Choose Purchase Bill");
    }

    function getPendingPurchaseBills(vendorId) {

        DOM.purchaseBillNo.options.length = 0;

        DOM.goodsReceiptItemsList.tBodies[0].innerHTML = "";

        if (vendorId > 0) {

            shared.fillDropdownWithCallback(SERVICE_PATH + 'GetPendingPurchaseBills/' + vendorId, DOM.purchaseBillNo, "PurchaseBillNo", "PurchaseBillId", "Choose Purhcase Bill", function (response) {

                if (response.status === 200) {
                    if (response.responseText !== undefined) {
                        shared.setSelectOptionByIndex(DOM.purchaseBillNo, parseInt(1));
                        shared.setSelect2ControlsText(DOM.purchaseBillNo);

                        getPurchaseBillItems(parseInt(DOM.purchaseBillNo.options[DOM.purchaseBillNo.selectedIndex].value));
                    }
                }
            });
        }
    }
    
    function getPurchaseBillItems(purchaseBillId) {

        goodsReceiptItems.length = 0;

        DOM.goodsReceiptItemsList.tBodies[0].innerHTML = "";

        //var purchaseBillId = parseInt(DOM.purchaseBillNo.options[DOM.purchaseBillNo.selectedIndex].value);

        if (purchaseBillId > 0) {
            
            shared.sendRequest(SERVICE_PATH + "GetPurchaseBillItems/" + purchaseBillId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res !== undefined) {

                            if (res.length > 0) {

                                for (var r = 0; r < res.length; r++) {

                                    var purchaseBillItem = {};

                                    purchaseBillItem = {
                                        SrNo: res[r].SrNo,
                                        BaleNo: res[r].BaleNo,
                                        LRNo: res[r].LRNo,
                                        ItemName: res[r].ItemName,
                                        UnitOfMeasurementId: res[r].UnitOfMeasurementId,
                                        UnitCode: res[r].UnitCode,
                                        PurchaseQty: res[r].PurchaseQty,
                                        ReceivedQty: res[r].ReceivedQty,
                                        GoodsReceiptItemId: res[r].GoodsReceiptItemId,
                                        GoodsReceiptId: res[r].GoodsReceiptId,
                                        PurchaseBillItemId: res[r].PurchaseBillItemId,
                                        guid: res[r].guid,
                                        CreatedBy: LOGGED_USER,
                                        CreatedByIP: IP_ADDRESS,
                                        ModifiedBy: null,
                                        ModifiedByIP: null,
                                        IsDeleted: false
                                    };

                                    goodsReceiptItems.push(purchaseBillItem);
                                }

                                bindPurchaseBillItems();
                            }
                        }
                    }
                }
            });
        }
    }

    function bindPurchaseBillItems() {

        var tableBody = DOM.goodsReceiptItemsList.tBodies[0];

        tableBody.innerHTML = "";

        if (goodsReceiptItems.length) {

            var data = "";

            for (var ri = 0; ri < goodsReceiptItems.length; ri++) {

                data = data + "<tr data-goods-receipt-item-id=" + goodsReceiptItems[ri].GoodsReceiptItemId +
                    " data-purchase-bill-item-id=" + goodsReceiptItems[ri].PurchaseBillItemId +
                    " data-item-id=" + goodsReceiptItems[ri].ItemId +
                    " data-unit-of-measurement-id=" + goodsReceiptItems[ri].UnitOfMeasurementId + ">";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + goodsReceiptItems[ri].PurchaseBillItemId + "' class='label-checkbox' name='SelectReceiptItem' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + goodsReceiptItems[ri].SrNo + "</td>";
                data = data + "<td>" + goodsReceiptItems[ri].BaleNo + "</td>";
                data = data + "<td>" + goodsReceiptItems[ri].LRNo + "</td>";
                data = data + "<td>" + goodsReceiptItems[ri].ItemName + "</td>";
                data = data + "<td>" + goodsReceiptItems[ri].UnitCode + "</td>";
                data = data + "<td>" + goodsReceiptItems[ri].PurchaseQty + "</td>";
                data = data + "<td> <input type='text' class='form-control input-sm' id=ReceivedQty_" + goodsReceiptItems[ri].PurchaseBillItemId + " value =" + goodsReceiptItems[ri].ReceivedQty + " </></td>";
                data = data + "</tr>";
            }

            tableBody.innerHTML = data;

            enableDisableTableInputControls();
        }
    }
   
   function bindReceiptItems(goodsReceiptId) {

        var table = DOM.goodsReceiptItemsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (isNaN(goodsReceiptId)) { goodsReceiptId = parseInt(0); }

        if (goodsReceiptItems.length > 0) {

            var receiptItems = goodsReceiptItems.filter(function (value, index, array) {
                return value.GoodsReceiptId === goodsReceiptId;                
            });

            var itemsCount = receiptItems.length;

            if (itemsCount > 0) {

                var data = "";

                for (var ri = 0; ri < itemsCount; ri++) {

                    data = data + "<tr data-goods-receipt-item-id=" + receiptItems[ri].GoodsReceiptItemId +
                        " data-purchase-bill-item-id=" + receiptItems[ri].PurchaseBillItemId +
                        " data-item-id=" + receiptItems[ri].ItemId +
                        " data-unit-of-measurement-id=" + receiptItems[ri].UnitOfMeasurementId + ">";
                    data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + receiptItems[ri].PurchaseBillItemId + "' class='label-checkbox' name='SelectReceiptItem' /> <span class='label-text'></span> </label>" + "</td>";
                    data = data + "<td>" + receiptItems[ri].SrNo + "</td>";
                    data = data + "<td>" + receiptItems[ri].BaleNo + "</td>";
                    data = data + "<td>" + receiptItems[ri].LRNo + "</td>";
                    data = data + "<td>" + receiptItems[ri].ItemName + "</td>";
                    data = data + "<td>" + receiptItems[ri].UnitCode + "</td>";
                    data = data + "<td>" + receiptItems[ri].PurchaseQty + "</td>";                    
                    data = data + "<td> <input type='text' class='form-control input-sm' id=ReceivedQty_" + receiptItems[ri].PurchaseBillItemId + " value =" + receiptItems[ri].ReceivedQty + " </></td>";
                    data = data + "</tr>";
                }

                tableBody.innerHTML = data;

                enableDisableTableInputControls();
            }
        }
    }

    function deleteReceiptItem(currentTableRow) {

        var table = DOM.goodsReceiptItemsList;

        var tableBody = table.tBodies[0];
        
        /* temp variable */
        var goodsReceiptItemId = currentTableRow.getAttribute('data-goods-receipt-item-id');
        
        var goodsReceiptItem = {};

        goodsReceiptItem = {
            GoodsReceiptItemId: goodsReceiptItemId,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(goodsReceiptItem);
        
        shared.sendRequest(SERVICE_PATH + 'DeleteGoodsReceiptItem', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function enableDisableTableInputControls() {

        var inputs = DOM.goodsReceiptItemsList.querySelectorAll("input[type='text']");

        if (inputs.length > 0) {

            for (var inp = 0; inp < inputs.length; inp++) {

                if (FLAG === "VIEW") {
                    inputs[inp].disabled = true;
                }
                else if (FLAG === "NEW" || FLAG === "EDIT") {
                    inputs[inp].disabled = false;
                }
            }
        }
    }

    function validateGoodsReceiptItemDetails() {

        var isValid = true;

        var selectedRows = getSelectedRows(DOM.goodsReceiptItemsList);

        if (selectedRows.length > 0) {

            var inputs = DOM.goodsReceiptItemsList.querySelectorAll("input[type='textbox']");

            if (inputs.length > 0) {

                for (var i = 0; i < inputs.length; i++) {

                    if (inputs[i].value !== "" || parseInt(inputs[i].value) > 0) {
                        isValid = true;
                        break;
                    }
                    else {
                        isValid = false;
                    }
                }
            }
        }

        return isValid;
    }

    function addReceiptItem(receiptItem) {

        var srNo = getMaxSrNo(goodsReceiptItems, 0);

        var goodsReceiptItem = {};

            goodsReceiptItem = {
                GoodsReceiptItemId: receiptItem.GoodsReceiptItemId,
                GoodsReceiptId: receiptItem.GoodsReceiptId,
                PurchaseBillItemId: receiptItem.PurchaseBillItemId,
                ItemId: receiptItem.ItemId,
                ItemName: receiptItem.ItemName,
                UnitCode: receiptItem.UnitCode,
                UnitOfMeasurementId: receiptItem.UnitOfMeasurementId,
                BaleNo: receiptItem.baleNo,
                LRNo: receiptItem.lrNo,                
                PurchaseQty: receiptItem.PurchaseQty,                
                ReceivedQty: receiptItem.receivedQty,                
                SrNo: receiptItem.srNo,
                IsDeleted: false,
                CreatedBy: parseInt(LOGGED_USER),
                CreatedByIp:IP_ADDRESS
            };

        goodsReceiptItems.push(goodsReceiptItem);

    }

    function updateReceiptItem(receiptItem) {

        if (goodsReceiptItems.length > 0) {

            for (var p = 0; p < goodsReceiptItems.length; p++) {

                if (goodsReceiptItems[p].GoodsReceiptItemId === parseInt(receiptItem.GoodsReceiptItemId)
                    && goodsReceiptItems[p].SrNo === parseInt(receiptItem.SrNo)) {

                    goodsReceiptItems[p].ItemId = receiptItem.ItemId;
                    goodsReceiptItems[p].ItemName = receiptItem.ItemName;
                    goodsReceiptItems[p].UnitOfMeasurementId = receiptItem.UnitOfMeasurementId;
                    goodsReceiptItems[p].UnitCode = receiptItem.UnitCode;
                    goodsReceiptItems[p].BaleNo = receiptItem.BaleNo;
                    goodsReceiptItems[p].LRNo = receiptItem.LRNo;
                    goodsReceiptItems[p].ReceivedQty = receiptItem.ReceivedQty;                    
                    goodsReceiptItems[p].PurchaseQty = receiptItem.PurchaseQty;
                    goodsReceiptItems[p].IsDeleted = false;

                    if (receiptItem.GoodsReceiptItemId === 0) {
                        goodsReceiptItems[p].CreatedBy = parseInt(LOGGED_USER);
                        goodsReceiptItems[p].CreatedByIP = IP_ADDRESS;
                    }
                    else {
                        goodsReceiptItems[p].ModifiedBy = parseInt(LOGGED_USER);
                        goodsReceiptItems[p].ModifiedByIP = IP_ADDRESS
                    }

                    break;
                }
            }
        }
    }

    function saveGoodsReceiptItem() {

        if (validateGoodsReceiptItemDetails()) {

            goodsReceiptItems.length = 0;

            /* temp variable */
            var goodsReceiptItemId = parseInt(0);
            var goodsReceiptId = parseInt(0);
            var purchaseBillItemId = parseInt(0);
            var itemId = parseInt(0);
            var itemName = null;
            var unitOfMeasurementId = parseInt(0);
            var unitCode = null;
            var baleNo = null;
            var lrNo = null;
            var purchaseQty = parseFloat(0);
            var receivedQty = parseFloat(0);
            var srNo = parseInt(0);

            var selectedRows = getSelectedRows(DOM.goodsReceiptItemsList);

            if (selectedRows.length > 0) {

                for (var r = 0; r < selectedRows.length; r++) {

                    goodsReceiptId = parseInt(DOM.goodsReceiptNo.getAttribute("data-goods-receipt-id"));
                    goodsReceiptItemId = parseInt(selectedRows[r].getAttribute("data-goods-receipt-item-id"));                    
                    purchaseBillItemId = parseInt(selectedRows[r].getAttribute("data-purchase-bill-item-id"));
                    srNo = selectedRows[r].children[1].innerHTML;
                    baleNo = selectedRows[r].children[2].innerHTML;
                    lrNo = selectedRows[r].children[3].innerHTML;
                    itemId = parseInt(selectedRows[r].getAttribute('data-item-id'));
                    itemName = selectedRows[r].children[4].innerHTML;
                    unitCode = selectedRows[r].children[5].innerHTML;
                    unitOfMeasurementId = parseInt(selectedRows[r].getAttribute('data-unit-of-measurement-id'));
                    purchaseQty = parseFloat(selectedRows[r].children[6].innerHTML);
                    receivedQty = parseFloat(selectedRows[r].children[7].children[0].value);
                    
                    if (isNaN(goodsReceiptItemId)) { goodsReceiptItemId = parseInt(0); }
                    if (isNaN(goodsReceiptId)) { goodsReceiptId = parseInt(0); }

                    var receiptItem = {};

                    receiptItem = {
                        GoodsReceiptItemId: goodsReceiptItemId,
                        GoodsReceiptId: goodsReceiptId,
                        PurchaseBillItemId: purchaseBillItemId,
                        ItemId: itemId,
                        ItemName: itemName,
                        UnitOfMeasurementId: unitOfMeasurementId,
                        BaleNo: baleNo,
                        LRNo: lrNo,
                        PurchaseQty: purchaseQty,
                        ReceivedQty: receivedQty,
                        SrNo: srNo,
                        IsDeleted: false
                    };


                    if (goodsReceiptItemId === parseInt(0)) {

                        receiptItem.CreatedBy = LOGGED_USER;
                        receiptItem.CreatedByIP = IP_ADDRESS;
                        receiptItem.ModifiedBy = null;
                        receiptItem.ModifiedByIP = null;
                    }
                    else {
                        receiptItem.CreatedBy = null;
                        receiptItem.CreatedByIP = null;
                        receiptItem.ModifiedBy = LOGGED_USER;
                        receiptItem.ModifiedByIP = IP_ADDRESS;
                    }

                    goodsReceiptItems.push(receiptItem);

                    //updateReceiptItem(receiptItem);

                    //bindReceiptItems(goodsReceiptId);
                }
            }
        }
    }
    
    //function addGoodsReceipt(obj) {

        
    //    var goodsReceipt = {};

    //    goodsReceipt = {
    //            GoodsReceiptId: obj.GoodsReceiptId,
    //            PurchaseBillId: obj.PurchaseBillId,
    //            GoodsReceiptNo: obj.GoodsReceiptNo,
    //            GoodsReceiptDate: obj.GoodsReceiptDate,
    //            GoodsReceivedLocationId: obj.GoodsReceivedLocationId,
    //            TransporterId: obj.TransporterId,
    //            ChallanNo: obj.ChallanNo,
    //            GoodsReceiptItems: obj.GoodsReceiptItems,
    //            IsDeleted: false,
    //            CreatedBy: LOGGED_USER,
    //            CreatedByIp: IP_ADDRESS
    //        };

    //    goodsReceipts.push(goodsReceipt);
    //}

    //function updateGoodsReceipt(goodsReceipt) {

    //    if (goodsReceipts.length > 0) {

    //        for (var g = 0; g < goodsReceipts.length; g++) {

    //            if (goodsReceipts[g].GoodsReceiptId === goodsReceipt.GoodsReceiptId
    //                && goodsReceipts[g].SrNo === goodsReceipt.SrNo) {

    //                goodsReceipts[g].PurchaseBillId = goodsReceipt.PurchaseBillId;
    //                goodsReceipts[g].GoodsReceiptNo = goodsReceipt.GoodsReceiptNo;
    //                goodsReceipts[g].GoodsReceiptDate = goodsReceipt.GoodsReceiptDate;
    //                goodsReceipts[g].GoodsReceivedLocationId = goodsReceipt.GoodsReceivedLocationId;
    //                goodsReceipts[g].TransporterId = goodsReceipt.TransporterId;
    //                goodsReceipts[g].ChallanNo = goodsReceipt.ChallanNo;
    //                goodsReceipts[g].GoodsReceiptItems = goodsReceipt.GoodsReceiptItems;
    //                goodsReceipts[g].ModifiedBy = LOGGED_USER;
    //                goodsReceipts[g].ModifiedByIp = IP_ADDRESS;

    //                break;
    //            }
    //        }
    //    }
    //}

    function saveGoodsReceipt() {

        if (validateGoodsReceiptDetails()) {

            saveGoodsReceiptItem();

            /* temp variable */
            var goodsReceiptId = parseInt(0);
            var purchaseBillId = parseInt(0);
            var goodsReceiptNo = parseInt(0);
            var goodsReceiptDate = null;
            var goodsReceivedLocationId = parseInt(0);
            var transporterId = parseInt(0);
            var challanNo = null;
            var branchId = parseInt(0);
            var workigPeriodId = parseInt(0);
            var srNo = parseInt(0);

            goodsReceiptId = parseInt(DOM.goodsReceiptNo.getAttribute('data-goods-receipt-id'));
            purchaseBillId = parseInt(DOM.purchaseBillNo.options[DOM.purchaseBillNo.selectedIndex].value);
            goodsReceiptNo = DOM.goodsReceiptNo.value;
            goodsReceiptDate = DOM.goodsReceiptDate.value;
            goodsReceivedLocationId = parseInt(DOM.location.options[DOM.location.selectedIndex].value);                        
            branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
            workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);
            //srNo = getMaxSrNo(goodsReceipts, 0);

            if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }
            if (isNaN(goodsReceiptId)) { goodsReceiptId = parseInt(0); }
            if (isNaN(goodsReceivedLocationId)) { goodsReceivedLocationId = parseInt(0); }            
           
            goodsReceipts.length = 0;

            var goodsReceipt = {};

            goodsReceipt = {
                GoodsReceiptId: goodsReceiptId,
                PurchaseBillId: purchaseBillId,
                GoodsReceiptNo: goodsReceiptNo,
                GoodsReceiptDate: goodsReceiptDate,
                GoodsReceivedLocationId: goodsReceivedLocationId,
                BranchId: branchId,
                WorkingPeriodId: workingPeriodId,
                GoodsReceiptItems: goodsReceiptItems,
                IsDeleted: false
            };

            if (parseInt(goodsReceiptId) === parseInt(0)) {

                goodsReceipt.CreatedBy = LOGGED_USER;
                goodsReceipt.CreatedByIP = IP_ADDRESS;
            }
            else {

                goodsReceipt.ModifiedBy = LOGGED_USER;
                goodsReceipt.ModifiedByIP = IP_ADDRESS;
            }

            goodsReceipts.push(goodsReceipt);            

            var postData = JSON.stringify(goodsReceipts);

            shared.sendRequest(SERVICE_PATH + "SaveGoodsReceipt", "POST", true, "JSON", postData, function (response) {

                var _response = JSON.parse(response.responseText);

                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Goods Receipt updated successfully.",
                            type: "success"
                        }, function () {
                            getGoodsReceipts();
                        });
                    }
                }
                else {
                    swal("error", "Unable to save the Purchase Bill. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
                    handleError(_response.Message + " " + _response.ExceptionMessage);
                }
            });
        }
    }

    function saveAndAddNewGoodsReceiptItem() {

        saveGoodsReceiptItem();

        DOM.ReceiptQty.focus();

    }

    function validateGoodsReceiptDetails() {

        var isValid = true;

        if (DOM.vendor.options[DOM.vendor.selectedIndex].value === "-1") {
            DOM.vendor.focus();
            swal("Error!!!", "Please select the Vendor Name.", "error");
            isValid = false;
        }
        else if (DOM.purchaseBillNo.options[DOM.purchaseBillNo.selectedIndex].value === "-1") {
            DOM.purchaseBillNo.focus();
            swal("Error!!!", "Please select the Purchase Bill No.", "error");
            isValid = false;
        }
        else if (DOM.goodsReceiptDate.value === "") {
            DOM.goodsReceiptDate.focus();
            swal("Error!!!", "Please enter the Godos Receipt Date.", "error");
            isValid = false;
        }
        else if (DOM.financialYear.selectedIndex === 0) {
            DOM.financialYear.focus();
            swal("Error!!!", "Please select the Financial Year.", "error");
            isValid = false;
        }
        else if (DOM.branch.selectedIndex === 0) {
            DOM.branch.focus();
            swal("Error!!!", "Please select the Branch Name.", "error");
            isValid = false;
        }
        else if (DOM.location.selectedIndex === 0) {
            DOM.location.focus();
            swal("Error!!!", "Please select the Location.", "error");
            isValid = false;
        }

        return isValid;
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


SharpiTech.GoodsReceipt.init();
