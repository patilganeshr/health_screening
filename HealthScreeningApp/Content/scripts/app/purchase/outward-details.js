
var SharpiTech = {};

SharpiTech.Outward = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var outwards = [];
    var outwardGoods = [];
    var FLAG = "";

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.addNewOutwardDetails = document.getElementById('AddNewOutward');
        DOM.showOutwardList = document.getElementById('ShowOutwardList');
        DOM.viewOutwardDetails = document.getElementById('ViewOutward');
        DOM.editOutwardDetails = document.getElementById('EditOutward');
        DOM.saveOutwardDetails = document.getElementById('SaveOutward');
        DOM.deleteOutwardDetails = document.getElementById('DeleteOutward');
        DOM.printOutwardDetails = document.getElementById('PrintOutward');
        DOM.exportOutwardDetails = document.getElementById('ExportOutward');

        DOM.editMode = document.getElementById('EditMode');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.company = document.getElementById('Company');
        DOM.branch = document.getElementById('Branch');
        DOM.outwardId = document.getElementById('OutwardId');
        DOM.outwardNo = document.getElementById('OutwardNo');
        DOM.outwardDate = document.getElementById('OutwardDate');
        DOM.outwardDatePicker = document.getElementById('OutwardDatePicker');
        DOM.transporter = document.getElementById('Transporter');
        DOM.vehicleNo = document.getElementById('VehicleNo');
        DOM.fromtoLocation = document.getElementById('FromToLocation');
        DOM.typeOfTransfer = document.getElementById('TypeOfTransfer');
        DOM.pkgSlipNo = document.getElementById('PkgSlipNo');
        DOM.referenceNo = document.getElementById('ReferenceNo');
        DOM.outwardGoodsList = document.getElementById('OutwardGoodsList');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.outwardList = document.getElementById('OutwardList');

        /* Jquery cache */
        DOM.$outwardDatePicker = $('#OutwardDatePicker');
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

        DOM.$outwardDatePicker.datetimepicker({
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

        DOM.addNewOutwardDetails.addEventListener('click', addNewOutwardDetails);
        DOM.showOutwardList.addEventListener('click', showOutwardList);
        DOM.viewOutwardDetails.addEventListener('click', viewOutwardDetails);
        DOM.editOutwardDetails.addEventListener('click', editOutwardDetails);
        DOM.deleteOutwardDetails.addEventListener('click', deleteOutwardDetails);
        DOM.saveOutwardDetails.addEventListener('click', saveOutwardDetails);
        //DOM.printOutwardDetails.addEventListener('click', printOutwardDetails);
        //DOM.exportOutwardDetails.addEventListener('click', exportOutwardDetails);

        DOM.company.onchange = function () {
            getBranchName(0, true);
        };

        DOM.pkgSlipNo.onchange = function (e) {
            getPkgSlipAdditionalDetails(parseInt(e.target.value));
            getPkgSlipItems(parseInt(e.target.value), parseInt(e.target.options[e.target.selectedIndex].getAttribute('data-purchasebillitemid')));
        };
    }

    function loadData() {

        getFinancialYears();
        getCompanyNames();
        getTransporters();
        getOutwardDetails();

    }

    function getFinancialYears() {

        //shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
                    shared.setSelect2ControlsText(DOM.financialYear);
                }

                //shared.hideLoader(DOM.loader);
            }
        });
    }

    function getCompanyNames() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllCompanies', DOM.company, "CompanyName", "CompanyId", "Choose Company", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.company, parseInt(2));
                    shared.setSelect2ControlsText(DOM.company);

                    getBranchName(0, false);

                    //shared.hideLoader(DOM.loader);
                }
            }

        });
    }

    function getBranchName(branchId, isLoaderToBeHide) {

        shared.showLoader(DOM.loader);

        DOM.branch.options.length = 0;

        var companyId = parseInt(DOM.company.options[DOM.company.selectedIndex].value);

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
                    }

                    if (isLoaderToBeHide) {
                        shared.hideLoader(DOM.loader);
                    }
                }
            });
        }
    }

    function getTransporters() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/3', DOM.transporter, "ClientAddressName", "ClientAddressId", "Choose Transporter", function (response) {

            if (response.status === 200) {

                //shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.transporter, parseInt(0));
                    shared.setSelect2ControlsText(DOM.transporter);

                    //shared.hideLoader(DOM.loader);
                }
            }

        });
    }

    function getBaleNos() {

        DOM.pkgSlipNo.options.length = 0;

        shared.showLoader(DOM.loader);

        var dataAttributes = "PurchaseBillItemId";

        shared.fillDropdownWithDataAttributesAndCallback(SERVICE_PATH + 'GetBaleNos', DOM.pkgSlipNo, "BaleNo", "PkgSlipId", "Choose Bale No.", dataAttributes, function (response) {
        
            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.pkgSlipNo, parseInt(0));
                    shared.setSelect2ControlsText(DOM.pkgSlipNo);
                }
            }
            //shared.hideLoader(DOM.loader);
        });

    }

    function getPkgSlipNos() {

        DOM.pkgSlipNo.options.length = 0;

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetPendingPkgSlipNos', DOM.pkgSlipNo, "PkgSlipNo", "PkgSlipId", "Choose Pkg Slip No.", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.pkgSlipNo, parseInt(0));
                    shared.setSelect2ControlsText(DOM.pkgSlipNo);

                }
            }
            //shared.hideLoader(DOM.loader);
        });

    }

    function getPkgSlipAdditionalDetails(pkgSlipId) {

        DOM.fromtoLocation.value = "";
        DOM.fromtoLocation.removeAttribute('data-to-location-id');
        DOM.typeOfTransfer.value = "";

        shared.showLoader(DOM.loader);

        if (DOM.pkgSlipNo.selectedIndex > 0) {
            
            shared.sendRequest(SERVICE_PATH + "GetPkgSlipAdditionalDetails/" + pkgSlipId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        DOM.fromtoLocation.value = res.FromToLocation;
                        DOM.fromtoLocation.setAttribute('data-to-location-id', res.ToLocationId);
                        DOM.typeOfTransfer.value = res.TypeOfTransfer;
                        DOM.referenceNo.value = res.ReferenceNo;
                    }
                }

                shared.hideLoader(DOM.loader);

            });
            
        }

        shared.hideLoader(DOM.loader);
    }

    function getPkgSlipItems(pkgSlipId, purchaseBillItemid) {

        DOM.outwardGoodsList.tBodies[0].innerHTML = "";

        shared.showLoader(DOM.loader);

        // Set From To Location

        if (DOM.pkgSlipNo.selectedIndex > 0) {

            outwardGoods.length = 0;

            DOM.outwardGoodsList.tBodies[0].innerHTML = "";

            shared.sendRequest(SERVICE_PATH + "GetPkgSlipItems/" + pkgSlipId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        outwardGoods = res;

                        bindPkgSlipItems();

                    }
                }
            });
        }

        shared.hideLoader(DOM.loader);

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
    }

    function unselectOutwardDetails() {

        var tableBody = DOM.outwardList.tBodies[0];
        
        var checkBoxes = tableBody.querySelectorAll('.label-checkbox');

        if (checkBoxes.length > 0) {

            for (var c = 0; c < checkBoxes.length; c++) {

                checkBoxes[c].checked = false;
            }
        }
    }

    function bindOutwardDetails() {

        shared.showLoader(DOM.loader);

        var table = DOM.outwardList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (outwards.length > 0) {

            var data = "";

            for (var r = 0; r < outwards.length; r++) {

                data += "<tr data-outward-id=" + outwards[r].OutwardId + ">";
                data += "<td> <label class='label-tick'> <input type='checkbox' id='" + outwards[r].OutwardId + "' class='label-checkbox' name='SelectOutward' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + outwards[r].OutwardNo + "</td>";
                data += "<td>" + outwards[r].OutwardDate + "</td>";
                data += "<td>" + outwards[r].BaleNo + "</td>";
                data += "<td>" + outwards[r].FromLocation + "</td>";
                data += "<td>" + outwards[r].TransferType + "</td>";
                data += "<td>" + outwards[r].VendorName + "</td>";
                data += "<td>" + outwards[r].TotalPkgSlipQty + "</td>";
                data += "</tr>";

            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);

        }

        shared.hideLoader(DOM.loader);
    }

    function addNewOutwardDetails() {

        FLAG = "NEW";

        shared.showLoader(DOM.loader);

        //clear the controls
        shared.clearInputs(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.outwardNo.setAttribute('data-outward-id', parseInt(0));
        DOM.outwardNo.value = parseInt(0);

        var currentDate = new Date();

        DOM.outwardDate.value = moment(currentDate).format("DD/MMM/YYYY");

        //getBaleNos();
        getPkgSlipNos();

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);

        // Set Focus
        DOM.company.focus();
    }

    function showOutwardList() {

        if (FLAG === "SAVE") {
            getOutwardDetails();
        }
        else {

            unselectOutwardDetails();

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }
    }

    function viewOutwardDetails() {

        FLAG = "VIEW";

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearTables(DOM.editMode);
        shared.clearSelect(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        var selectedRows = getSelectedRows(DOM.outwardList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {
                swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                shared.hideLoader(DOM.loader);
            }
            else {

                var currentTableRow = selectedRows[0];

                var outwardId = parseInt(currentTableRow.getAttribute('data-outward-id'));

                if (isNaN(outwardId)) { outwardId = 0; }

                showOutwardDetails(outwardId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hidePanel(DOM.loader);
    }

    function editOutwardDetails() {

        FLAG = "EDIT";

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearTables(DOM.editMode);
        shared.clearSelect(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        var selectedRows = getSelectedRows(DOM.outwardList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {
                swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                shared.hideLoader(DOM.loader);
            }
            else {

                var currentTableRow = selectedRows[0];

                var outwardId = parseInt(currentTableRow.getAttribute('data-outward-id'));

                if (isNaN(outwardId)) { outwardId = 0; }

                showOutwardDetails(outwardId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hidePanel(DOM.loader);
    }

    function deleteOutwardDetails(currentTableRow) {

        FLAG = "DELETE";

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.outwardList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.outwardList);

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

                                var outwardId = parseInt(selectedRows[r].getAttribute('data-outward-id'));

                                var outwardGoods = [];

                                if (outwards.length) {

                                    var outwardList = outwards.filter(function (value, index, array) {
                                        return value.OutwardId === outwardId;
                                    });

                                    outwardGoods = outwardList[0].OutwardGoodsDetails;

                                    if (outwardGoods.length) {

                                        for (var p = 0; p < outwardGoods.length; p++) {

                                            outwardGoods[p].IsDeleted = true;
                                            outwardGoods[p].DeletedBy = 1;
                                            outwardGoods[p].DeletedByIP = IP_ADDRESS;
                                        }
                                    }

                                    var outward = {};

                                    outward = {
                                        OutwardId: parseInt(selectedRows[r].getAttribute('data-outward-id')),
                                        IsDeleted: true,
                                        DeletedBy: parseInt(LOGGED_USER),
                                        DeletedByIP: IP_ADDRESS,
                                        OutwardGoodsDetails: outwardGoods
                                    };

                                    var postData = JSON.stringify(outward);

                                    shared.sendRequest(SERVICE_PATH + 'SaveOutwardDetails', "POST", true, "JSON", postData, function (response) {

                                        if (response.status === 200) {

                                            if (parseInt(response.responseText) > 0) {

                                                //tableBody.removeChild(selectedRows[r]);

                                                swal({
                                                    title: "Success",
                                                    text: "Outward Details Deleted Successfully.",
                                                    type: "success"
                                                }, function () {
                                                    getOutwardDetails();
                                                });
                                            }
                                        }
                                        else {
                                            swal("Error", "Error while deleting the records.", "error");
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

    function showOutwardDetails(outwardId) {

        if (outwardId > 0) {

            if (outwards.length) {

                var outward = outwards.filter(function (value, index, array) {
                    return value.OutwardId === outwardId;
                });

                if (outward.length) {

                    shared.setSelectValue(DOM.financialYear, null, outward[0].WorkingPeriodId);
                    shared.setSelect2ControlsText(DOM.financialYear);
                    shared.setSelectValue(DOM.company, null, outward[0].CompanyId);
                    shared.setSelect2ControlsText(DOM.company);
                    getBranchName(outward[0].BranchId, true);
                    DOM.outwardNo.value = outward[0].OutwardNo;
                    DOM.outwardDate.value = outward[0].OutwardDate;
                    shared.setSelectValue(DOM.transporter, null, outward[0].TransporterId);
                    shared.setSelect2ControlsText(DOM.transporter);
                    DOM.vehicleNo.value = outward[0].VehicleNo;
                    DOM.pkgSlipNo.options.length = 0;
                    DOM.typeOfTransfer.value = outward[0].TypeOfTransfer;
                    DOM.fromtoLocation.value = outward[0].FromLocation + '-' + outward[0].ToLocation;
                    DOM.fromtoLocation.setAttribute('data-to-location-id', outward[0].ToLocationId);

                    var option = document.createElement('option');

                    option.value = outward[0].PkgSlipId;
                    option.text = outward[0].BaleNo;
                    option.setAttribute = outward[0].FromToLocation;

                    DOM.pkgSlipNo.appendChild(option);

                    bindOutwardGoodsDetails(outward);

                    shared.showPanel(DOM.editMode);
                    shared.hidePanel(DOM.viewMode);
                }
            }
        }
    }

    function getOutwardGoodsDetails(outwardId) {

        DOM.outwardGoodsDetails.tBodies[0].innerHTML = "";

        outwardGoods = [];

        shared.sendRequest(SERVICE_PATH + "GetAllOutwardDetails", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            var table = DOM.outwardGoodsDetails;

                            var tableBody = table.tBodies[0];

                            for (var r = 0; r < _response.length; r++) {

                                var goodsDetails = _response[r].OutwardGoodsDetails;

                                var goodsDetailsCount = goodsDetails.length;

                                if (goodsDetailsCount > 0) {

                                    for (var o = 0; o < goodsDetailsCount; o++) {

                                        var outwardGoodsDetails = {};

                                        outwardGoodsDetails = {
                                            OutwardGoodsId: goodsDetails[o].OutwardGoodsId,
                                            OutwardId: goodsDetails[o].OutwardId,
                                            PkgSlipItemId: goodsDetails[o].PkgSlipItemId,
                                            ItemId: goodsDetails[o].ItemId,
                                            ItemName: goodsDetails[o].ItemName,
                                            PkgSlipId: goodsDetails[o].PkgSlipId,
                                            PkgSlipNo: goodsDetails[o].PkgSlipNo,
                                            TotalPkgSlipQty: goodsDetails[o].TotalPkgSlipQty,
                                            PkgSlipDate: goodsDetails[o].PkgSlipDate,
                                            IsDeleted: goodsDetails[0].IsDeleted
                                        };

                                        outwardGoods.push(outwardGoodsDetails);
                                    }
                                }
                            }


                        }
                    }
                }
            }
        });
    }

        
    function bindPkgSlipItems() {

        var table = DOM.outwardGoodsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";


        if (outwardGoods.length > 0) {

            var data = "";

            for (var r = 0; r < outwardGoods.length; r++) {

                data = data + "<tr data-outward-goods-id=" + outwardGoods[r].OutwardGoodsId + " data-pkg-slip-item-id=" + outwardGoods[r].PkgSlipItemId + " data-item-id=" + outwardGoods[r].ItemId + " data-unit-of-measurement-id=" + outwardGoods[r].UnitOfMeasurementId + " data-goods-receipt-item-id=" + outwardGoods[r].GoodsReceiptItemId + ">";
                data = data + "<td>" + outwardGoods[r].PkgSlipNo + "</td>";
                data = data + "<td>" + outwardGoods[r].PkgSlipDate + "</td>";
                data = data + "<td>" + outwardGoods[r].ItemName + "</td>";
                data = data + "<td>" + outwardGoods[r].TotalPkgSlipQty + "</td>";
                data = data + "<td>" + outwardGoods[r].UnitCode + "</td>";
                data = data + "</tr>";
            }

            tableBody.innerHTML = data;

        }
    }

    function bindOutwardGoodsDetails(outwardDetails) {

        var table = DOM.outwardGoodsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (outwardDetails.length) {

            outwardGoods = outwardDetails[0].OutwardGoodsDetails;

            if (outwardGoods.length > 0) {

                var data = "";

                for (var r = 0; r < outwardGoods.length; r++) {

                    data = data + "<tr data-outward-goods-id=" + outwardGoods[r].OutwardGoodsId + " data-pkg-slip-item-id=" + outwardGoods[r].PkgSlipItemId + " data-item-id=" + outwardGoods[r].ItemId + " data-unit-of-measurement-id=" + outwardGoods[r].UnitOfMeasurementId + " data-goods-receipt-item-id=" + outwardGoods[r].GoodsReceiptItemId + ">";
                    data = data + "<td>" + outwardGoods[r].PkgSlipNo + "</td>";
                    data = data + "<td>" + outwardGoods[r].PkgSlipDate + "</td>";
                    data = data + "<td>" + outwardGoods[r].ItemName + "</td>";
                    data = data + "<td>" + outwardGoods[r].TotalPkgSlipQty + "</td>";
                    data = data + "<td>" + outwardGoods[r].UnitCode + "</td>";
                    data = data + "</tr>";
                }

                tableBody.innerHTML = data;

            }
        }

    }

    function deleteOutwardGoodsDetails(currentTableRow) {

        var table = DOM.outwardGoodsDetails;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var outwardGoodsID = parseInt(currentTableRow.getAttribute('data-outward-goods-id'));

        var outwardGoodsDetails = {};

        outwardGoodsDetails = {
            OutwardGoodsId: outwardGoodsId,
            IsDeleted: true,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(outwardGoodsDetails);

        shared.sendRequest(SERVICE_PATH + 'DeleteOutwardGoodsDetails', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function getOutwardDetails() {

        shared.showLoader(DOM.loader);

        DOM.outwardList.tBodies[0].innerHTML = "";

        outwards.length = 0;
        outwardGoods.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllOutwardDetails", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res !== undefined) {

                        outwards = res;

                        bindOutwardDetails();

                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });
    }

    function saveOutwardGoodsDetails() {

        /* temp variable */
        var outwardGoodsId = parseInt(0);
        var outwardId = parseInt(0);     
        var pkgSlipItemId = parseInt(0);
        var goodsReceiptItemId = parseInt(0);
        var itemId = parseInt(0);
        var itemName = null;
        var pkgQty = parseFloat(0);
        var unitOfMeasurementId = parseInt(0);
        var unitCode = null;
        var srNo = parseInt(0);

        var table = DOM.outwardGoodsList;
        var tableBody = table.tBodies[0];
        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {
                
                outwardGoodsId = parseInt(tableRows[tr].getAttribute('data-outward-goods-id'));
                outwardId = parseInt(DOM.outwardNo.getAttribute("data-outward-id"));
                pkgSlipItemId = parseInt(tableRows[tr].getAttribute('data-pkg-slip-item-id'));
                goodsReceiptItemId = parseInt(tableRows[tr].getAttribute('data-goods-receipt-item-id'));
                itemId = parseInt(tableRows[tr].getAttribute('data-item-id'));
                itemName = tableRows[tr].children[2].innerHTML;
                outwardQty = parseFloat(tableRows[tr].children[3].innerHTML);
                unitOfMeasurementId = parseInt(tableRows[tr].getAttribute('data-unit-of-measurement-id'));
                unitCode = tableRows[tr].children[4].innerHTML;
                srNo = tr + 1;

                if (isNaN(outwardGoodsId)) { outwardGoodsId = parseInt(0); }

                if (isNaN(outwardId)) { outwardId = parseInt(0); }

                if (isNaN(pkgSlipItemId)) { pkgSlipItemId = parseInt(0); }

                if (isNaN(goodsReceiptItemId)) { goodsReceiptItemId = parseInt(0); }

                var outwardGoodsDetails = {};

                outwardGoodsDetails = {
                    OutwardGoodsId: outwardGoodsId,
                    OutwardId: outwardId,
                    PkgSlipItemId: pkgSlipItemId,
                    GoodsReceiptItemId: goodsReceiptItemId,
                    ItemId: itemId,
                    ItemName: itemName,
                    OutwardQty: outwardQty,
                    UnitOfMeasurementId: unitOfMeasurementId,
                    SrNo: srNo,
                    IsDeleted: false
                };

                if (outwardGoodsId === parseInt(0)) {

                    outwardGoodsDetails.CreatedBy = LOGGED_USER;
                    outwardGoodsDetails.CreatedByIP = IP_ADDRESS;
                }
                else {
                    outwardGoodsDetails.ModifiedBy = LOGGED_USER;
                    outwardGoodsDetails.ModifiedByIP = IP_ADDRESS;
                }

                outwardGoods.push(outwardGoodsDetails);
                
            }
        }
    }
    
    function saveOutwardDetails() {

        outwards.length = 0;
        outwardGoods.length = 0;

        saveOutwardGoodsDetails();

        if (outwardGoods.length === 0) {
            swal("Error", "No item details found, so can not save the Outward Details.", "error");
            return;
        }

        var outwardId = 0;
        var pkgSlipId = 0;
        var outwardNo = 0;
        var outwardDate = null;
        var locationId = 0;
        var workingPeriodId = 0;
        var transporterId = 0;
        var vehicleNo = null;
        var branchId = 0;

        outwardId = parseInt(DOM.outwardNo.getAttribute('data-outward-id'));
        pkgSlipId = parseInt(DOM.pkgSlipNo.options[DOM.pkgSlipNo.selectedIndex].value);
        outwardNo = DOM.outwardNo.value;
        outwardDate = DOM.outwardDate.value;
        workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);
        transporterId = parseInt(DOM.transporter.options[DOM.transporter.selectedIndex].value);
        vehicleNo = DOM.vehicleNo.value;
        locationId = DOM.fromtoLocation.getAttribute('data-to-location-id');
        branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
            
        if (outwardId === null) { outwardId = parseInt(0); }

        if (isNaN(outwardId)) { outwardId = parseInt(0); }

        var outwardDetails = {};

        outwardDetails = {
            OutwardId: outwardId,
            PkgSlipId: pkgSlipId,
            OutwardNo: outwardNo,
            OutwardDate: outwardDate,
            TransporterId: transporterId,
            VehicleNo: vehicleNo,
            GoodsSentLocationId: locationId,
            BranchId: branchId,
            IsDeleted: false,
            WorkingPeriodId: workingPeriodId,
            OutwardGoodsDetails: outwardGoods
        };

        if (parseInt(outwardId) === parseInt(0)) {

            outwardDetails.CreatedBy = LOGGED_USER;
            outwardDetails.CreatedByIp = IP_ADDRESS;
        }
        else {
            outwardDetails.ModifiedBy = LOGGED_USER;
            outwardDetails.ModifiedByIp = IP_ADDRESS;
        }

        //outwards.push(outwardDetails);

        var postData = JSON.stringify(outwardDetails);

        shared.sendRequest(SERVICE_PATH + "SaveOutwardDetails", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {
            
                var res = JSON.parse(response.responseText);

                if (parseInt(res) > parseInt(0)) {
                    FLAG = "SAVE";

                    getOutwardDetails();
                }
            }
            else {
                
                swal("error", "Unable to save the Outward Details. Error as " + response.Message + " " + response.ExceptionMessage, "error");
                handleError(response.Message + " " + response.ExceptionMessage);
            }
        });
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


SharpiTech.Outward.init();
