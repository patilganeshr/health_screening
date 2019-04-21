

var SharpiTech = {};

SharpiTech.PkgSlip = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var pkgSlips = [];
    var pkgSlipItems = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.addNewPkgSlip = document.getElementById('AddNewPkgSlip');
        DOM.showPkgSlipList = document.getElementById('ShowPkgSlipList');
        DOM.viewPkgSlip = document.getElementById('ViewPkgSlip');
        DOM.editPkgSlip = document.getElementById('EditPkgSlip');
        DOM.savePkgSlip = document.getElementById('SavePkgSlip');
        DOM.deletePkgSlip = document.getElementById('DeletePkgSlip');
        DOM.printPkgSlip = document.getElementById('PrintPkgSlip');
        DOM.exportPkgSlip = document.getElementById('ExportPkgSlip');

        DOM.editMode = document.getElementById('EditMode');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.company = document.getElementById('Company');
        DOM.branch = document.getElementById('Branch');
        DOM.fromLocation = document.getElementById('FromLocation');
        DOM.toLocation = document.getElementById('ToLocation');
        DOM.pkgSlipNo = document.getElementById('PkgSlipNo');
        DOM.pkgSlipDate = document.getElementById('PkgSlipDate');
        DOM.pkgSlipDatePicker = document.getElementById('PkgSlipDatePicker');
        DOM.vendor = document.getElementById('Vendor');
        DOM.purchaseBillNo = document.getElementById('PurchaseBillNo');
        DOM.typeOfTransfer = document.getElementById('TypeOfTransfer');
        DOM.karagir = document.getElementById('Karagir');
        DOM.referenceNo = document.getElementById('ReferenceNo');
        DOM.pkgSlipItemsList = document.getElementById('PkgSlipItemsList');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.pkgSlipList = document.getElementById('PkgSlipList');
        
        /* jquery dom elements */
        DOM.$pkgSlipDatePicker = $('#PkgSlipDatePicker');
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

        DOM.$pkgSlipDatePicker.datetimepicker({
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

        DOM.addNewPkgSlip.addEventListener('click', addNewPkgSlip);
        DOM.showPkgSlipList.addEventListener('click', showPkgSlipList);
        DOM.viewPkgSlip.addEventListener('click', viewPkgSlip);
        DOM.editPkgSlip.addEventListener('click', editPkgSlip);
        DOM.deletePkgSlip.addEventListener('click', deletePkgSlip);
        DOM.savePkgSlip.addEventListener('click', savePkgSlip);
        DOM.printPkgSlip.addEventListener('click', printPkgSlip);
        DOM.exportPkgSlip.addEventListener('click', exportPkgSlip);

        DOM.company.onchange = function () {
            getBranch();
        };

        DOM.vendor.onchange = function () {
            getPurchaseBillNo();
        };

        DOM.purchaseBillNo.onchange = function () {
            getFromLocations(0);
        };


        DOM.typeOfTransfer.onchange = function () {
            enableDisableKaragirField();
        };

        //DOM.pkgQtyInPcs.onkeydown = function validate(e) {
        //    return shared.acceptDecimalNos(e);
        //};

        //DOM.pkgQtyInMtrs.onkeydown = function validate(e) {
        //    return shared.acceptDecimalNos(e);
        //}
    }
    
    function loadData() {

        getFinancialYears();
        getCompanyNames();
        getToLocations();
        getTransferTypes();
        getKaragir();
        //getPkgSlip();

    }

    function getFinancialYears() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
                    shared.setSelect2ControlsText(DOM.financialYear);
                }

                shared.hideLoader(DOM.loader);
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

                    getBranchName(0);

                    shared.hideLoader(DOM.loader);
                }
            }

        });
    }

   function getBranchName(branchId) {

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

                        if (branchId === 0) {
                            getVendors();
                        }

                    }

                    shared.hideLoader(DOM.loader);
                }
            });
        }
    }
    
    function getToLocations() {

        var dataAttributes = "LocationTypeID";

        shared.fillDropdownWithDataAttributesAndCallback(SERVICE_PATH + 'GetAllLocationsWithLocationTypes', DOM.toLocation, "LocationName", "LocationId", "Choose To Location", dataAttributes, function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.toLocation, parseInt(1));
                    shared.setSelect2ControlsText(DOM.toLocation);
                    
                }
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function removeSimilarLocationFromToLocation() {

        var fromLocationsOptionsCount = DOM.fromLocation.options.length;

        var toLocationsOptionsCount = DOM.toLocation.options.length;

        var fromLocationOptions = DOM.fromLocation.getElementsByTagName('option');

        var toLocationOptions = DOM.toLocation.getElementsByTagName('option');

        if (fromLocationsOptionsCount && toLocationsOptionsCount) {

            for (var fl = 1; fl < fromLocationsOptionsCount - 1; fl++) {

                for (var tl = 1; tl < toLocationsOptionsCount - 1; tl++) {

                    if (fromLocationOptions[fl].text.toLowerCase() === toLocationOptions[tl].text.toLowerCase()) {

                        DOM.toLocation.options.remove(tl);
                        break;
                    }
                }
            }

            DOM.toLocation.options.selectedIndex = 1;
        }
    }

    function getTransferTypes() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetTransferTypes', DOM.typeOfTransfer, "TransferType", "TypeOfTransferId", "Choose Type of Transfer", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.typeOfTransfer, parseInt(1));
                    shared.setSelect2ControlsText(DOM.typeOfTransfer);
                }
            }

            shared.hideLoader(DOM.loader);

        });
    }

    function getVendors() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetVendorsForPkgSlip', DOM.vendor, "VendorName", "VendorId", "Choose Vendor", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.vendor, parseInt(0));
                    shared.setSelect2ControlsText(DOM.vendor);

                    getPurchaseBillNo();
                }
            }

            shared.hideLoader(DOM.loader);

        });
    }

    function getPurchaseBillNo() {

        DOM.purchaseBillNo.options.length = 0;

        var vendorId = parseInt(0);

        if (DOM.vendor.selectedIndex > 0) {

            vendorId = parseInt(DOM.vendor.options[DOM.vendor.selectedIndex].value);

            if (vendorId > 0) {

                shared.fillDropdownWithCallback(SERVICE_PATH + 'GetPurchaseBillNosByVendorId/' + vendorId, DOM.purchaseBillNo, "PurchaseBillNo", "PurchaseBillId", "Choose Bale No.", function (response) {

                    if (response.status === 200) {

                        shared.showLoader(DOM.loader);

                        if (response.responseText !== undefined) {

                            shared.setSelectOptionByIndex(DOM.purchaseBillNo, parseInt(1));
                            shared.setSelect2ControlsText(DOM.purchaseBillNo);

                            getFromLocations(0);
                        }
                    }

                    shared.hideLoader(DOM.loader);

                });
            }
        }
    }

    function getFromLocations(fromLocationId) {

        DOM.fromLocation.options.length = 0;

        var purchaseBillId = 0;
        
        purchaseBillId = parseInt(DOM.purchaseBillNo.options[DOM.purchaseBillNo.selectedIndex].value);
        
        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetFromLocationsByPurchaseBillid/' + purchaseBillId, DOM.fromLocation, "FromLocation", "FromLocationId", "Choose Location", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.fromLocation, parseInt(0));
                    shared.setSelect2ControlsText(DOM.fromLocation);

                    DOM.fromLocation.options.selectedIndex = 1;

                    if (fromLocationId === 0) {

                        removeSimilarLocationFromToLocation();

                        getPkgSlipItemsByPurchaseBillIdAndLocationId();

                    }
                }
            }

            shared.hideLoader(DOM.loader);

        });
    }

    function getKaragir() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/5', DOM.karagir, "ClientAddressName", "ClientAddressId", "Choose Karagir", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.karagir, parseInt(0));
                    shared.setSelect2ControlsText(DOM.karagir);

                }
            }

            shared.hideLoader(DOM.loader);

        });
    }

    function enableDisableKaragirField() {

        DOM.karagir.disabled = true;

        if (DOM.typeOfTransfer.selectedIndex > 0) {

            if (DOM.typeOfTransfer.options[DOM.typeOfTransfer.selectedIndex].value === "2") {

                DOM.karagir.disabled = false;
            }
        }
    }

    function getPkgSlipItemsByPurchaseBillIdAndLocationId() {

        var purchaseBillId = parseInt(0);
        var locationId = parseInt(0);

        purchaseBillId = parseInt(DOM.purchaseBillNo.options[DOM.purchaseBillNo.selectedIndex].value);
        locationId = parseInt(DOM.fromLocation.options[DOM.fromLocation.selectedIndex].value);

        shared.sendRequest(SERVICE_PATH + "GetBaleItemsByPurchaseBillIdAndLocationId/" + purchaseBillId + '/' + locationId, "GET", true, "JSON", null, function (response) {

            if (response.responseText !== undefined) {

                var res = JSON.parse(response.responseText);
                            
                pkgSlipItems = res;

                bindPkgSlipItemByBaleNo();
            }
        });
    
    }

    function bindPkgSlipItemByBaleNo() {

        var table = DOM.pkgSlipItemsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (pkgSlipItems.length) {

            var data = "";

            for (var r = 0; r < pkgSlipItems.length; r++) {

                data = data + "<tr data-pkg-slip-item-id=" + pkgSlipItems[r].PkgSlipItemId + " data-item-id=" + pkgSlipItems[r].ItemId + " data-unit-of-measurement-id=" + pkgSlipItems[r].UnitOfMeasurementId + " data-goods-receipt-item-id=" + pkgSlipItems[r].GoodsReceiptItemId + ">";
                data = data + "<td>" + pkgSlipItems[r].BaleNo + "</td>";
                data = data + "<td>" + pkgSlipItems[r].ItemName + "</td>";
                data = data + "<td>" + pkgSlipItems[r].PkgQty + "</td>";
                data = data + "<td> <input type='text' class='form-control input-sm' id=" + pkgSlipItems[r].GoodsReceiptItemId +  " value=" + pkgSlipItems[r].PkgQty + " /></td>";
                data = data + "<td>" + pkgSlipItems[r].UnitCode + "</td>";
                data = data + "</tr>";
            }

            tableBody.innerHTML = data;

            assignValidation();

        }
    }

    function assignValidation() {

        var table = DOM.pkgSlipItemsList;

        var tableBody = table.tBodies[0];

        var inputs = table.querySelectorAll('input[type="text"]');

        if (inputs.length) {

            for (var inp = 0; inp < inputs.length; inp++) {

                inputs[inp].onkeydown = function validate(e) {
                    return shared.acceptDecimalNos(e);
                };

                inputs[inp].onblur = function (e) {
                    validatePkgQty(e); 
                };
            }
        }
    }

    function validatePkgQty(e) {

        var tableRow = e.target.parentElement.parentElement;

        var balanceQty = parseFloat(tableRow.children[2].innerHTML);

        var pkgQty = parseFloat(e.target.value);

        if (pkgQty > balanceQty) {
            swal({
                title: "Warning",
                text: "Pkg Qty should not be greater than balance qty.",
                type: "warning"
            }, function () {
                e.target.focus();
            });            
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
    
    function addNewPkgSlip() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.disableControls(DOM.editMode, false);

        pkgSlips.length = 0;

        DOM.pkgSlipNo.setAttribute('data-pkg-slip-id', parseInt(0));
        DOM.pkgSlipNo.disabled = true;

        var currentDate = new Date();

        shared.setSelectOptionByIndex(DOM.financialYear, 1);
        shared.setSelectOptionByIndex(DOM.company, 2);
        shared.setSelectOptionByIndex(DOM.branch, 1);
        shared.setSelectOptionByIndex(DOM.typeOfTransfer, 1);

        DOM.pkgSlipDate.value = moment(currentDate).format("DD/MMM/YYYY");

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);

        DOM.vendor.focus();
    }

    function showPkgSlipList() {

        getPkgSlip();

    }

    function viewPkgSlip() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.disableControls(DOM.editMode, true);

        var selectedRows = getSelectedRows(DOM.pkgSlipList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {
                swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                shared.hideLoader(DOM.loader);
            }
            else {

                var currentTableRow = selectedRows[0];

                var pkgSlipId = parseInt(currentTableRow.getAttribute('data-pkg-slip-id'));

                if (isNaN(pkgSlipId)) { pkgSlipId = 0; }

                showPkgSlipDetails(pkgSlipId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hidePanel(DOM.loader);
    }

    function editPkgSlip() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.disableControls(DOM.editMode, false);

        var selectedRows = getSelectedRows(DOM.pkgSlipList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {
                swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                shared.hideLoader(DOM.loader);
            }
            else {

                var currentTableRow = selectedRows[0];

                var pkgSlipId = parseInt(currentTableRow.getAttribute('data-pkg-slip-id'));

                if (isNaN(pkgSlipId)) { pkgSlipId = 0; }

                showPkgSlipDetails(pkgSlipId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hidePanel(DOM.loader);
    }

    function deletePkgSlip() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.pkgSlipList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.pkgSlipList);

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

                                var pkgSlipId = parseInt(selectedRows[r].getAttribute('data-pkg-slip-id'));

                                var pkgSlipItems = [];

                                if (pkgSlips.length) {

                                    var pkgSlipList = pkgSlips.filter(function (value, index, array) {
                                        return value.PkgSlipId === pkgSlipId;
                                    });
                                    
                                    pkgSlipItems = pkgSlipList[0].PkgSlipItems;

                                    if (pkgSlipItems.length) {

                                        for (var p = 0; p < pkgSlipItems.length; p++) {

                                            pkgSlipItems[p].IsDeleted = true;
                                            pkgSlipItems[p].DeletedBy = 1;
                                            pkgSlipItems[p].DeletedByIP = IP_ADDRESS;
                                        }
                                    }

                                    var pkgSlip = {};

                                    pkgSlip = {
                                        PkgSlipId: parseInt(selectedRows[r].getAttribute('data-pkg-slip-id')),
                                        IsDeleted: true,
                                        DeletedBy: parseInt(LOGGED_USER),
                                        DeletedByIP: IP_ADDRESS,
                                        PkgSlipItems: pkgSlipItems
                                    };

                                    var postData = JSON.stringify(pkgSlip);

                                    shared.sendRequest(SERVICE_PATH + 'SavePkgSlip', "POST", true, "JSON", postData, function (response) {

                                        if (response.status === 200) {

                                            if (parseInt(response.responseText) > 0) {

                                                //tableBody.removeChild(selectedRows[r]);

                                                swal({
                                                    title: "Success",
                                                    text: "Pkg Slip Details Deleted Successfully.",
                                                    type: "success"
                                                }, function () {
                                                    getPkgSlip();
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

    function savePkgSlip() {

        var companyId = 0;
        var companyName = null;
        var branchId = 0;
        var branchName = null;
        var pkgSlipId = 0;
        var pkgSlipNo = 0;
        var pkgSlipDate = null;
        var purchaseBillId = 0;
        var baleNo = null;
        var fromLocation = null;
        var fromLocationId = 0;
        var toLocation = null;
        var toLocationId = 0;
        var transferType = null;
        var typeOfTransferId = 0;
        var karagirId = 0;
        var karagirName = null;
        var referenceNo = null;
        var financialYear = null;        
        var workingPeriodId = 0;

        pkgSlipItems.length = 0;

        savePkgSlipItem();

        if (pkgSlipItems.length === 0) {
            swal("Error", "No Pkg Slip Items found.", "error");
            return;
        }

        companyId = parseInt(DOM.company.options[DOM.company.selectedIndex].value);
        companyName = DOM.company.options[DOM.company.selectedIndex].text;
        branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
        branchName = DOM.branch.options[DOM.branch.selectedIndex].text;
        pkgSlipId = DOM.pkgSlipNo.getAttribute('data-pkg-slip-id');
        pkgSlipNo = parseInt(DOM.pkgSlipNo.value);
        pkgSlipDate = DOM.pkgSlipDate.value;
        purchaseBillId = parseInt(DOM.purchaseBillNo.options[DOM.purchaseBillNo.selectedIndex].value);
        purchaseBillNo = DOM.purchaseBillNo.options[DOM.purchaseBillNo.selectedIndex].text;
        fromLocation = DOM.fromLocation.options[DOM.fromLocation.selectedIndex].text;
        fromLocationId = parseInt(DOM.fromLocation.options[DOM.fromLocation.selectedIndex].value);
        toLocation = DOM.toLocation.options[DOM.toLocation.selectedIndex].text;
        toLocationId = parseInt(DOM.toLocation.options[DOM.toLocation.selectedIndex].value);
        transferType = DOM.typeOfTransfer.options[DOM.typeOfTransfer.selectedIndex].text;
        typeOfTransferId = parseInt(DOM.typeOfTransfer.options[DOM.typeOfTransfer.selectedIndex].value);
        karagirId = parseInt(DOM.karagir.options[DOM.karagir.selectedIndex].value);
        karagirName = DOM.karagir.options[DOM.karagir.selectedIndex].text;
        referenceNo = DOM.referenceNo.value;
        financialYear = DOM.financialYear.options[DOM.financialYear.selectedIndex].text;
        workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);

        if (pkgSlipId === null) { pkgSlipId = 0; }

        if (isNaN(pkgSlipNo)) { pkgSlipNo = 0;}

        if (isNaN(pkgSlipId)) { pkgSlipId = 0; }

        if (isNaN(fromLocationId)) { fromLocationId = 0; }

        if (isNaN(typeOfTransferId)) { typeOfTransferId = 0; }

        if (isNaN(karagirId)) { karagirId = 0; }

        if (karagirId === -1) { karagirId = null; }

        var pkgSlip = {};

        pkgSlip = {
            PkgSlipId: pkgSlipId,
            PkgSlipNo: pkgSlipNo,
            PkgSlipDate: pkgSlipDate,
            PurchaseBillId: purchaseBillId,
            BaleNo: baleNo,
            FromLocation: fromLocation,
            FromLocationId: fromLocationId,
            ToLocation: toLocation,
            ToLocationId: toLocationId,
            TransferType: transferType,
            TypeOfTransferId: typeOfTransferId,
            KaragirId: karagirId,
            ReferenceNo: referenceNo,
            FinancialYear: financialYear,
            CompanyId: companyId,
            BranchId: branchId,
            IsDeleted: false,
            WorkingPeriodId: workingPeriodId,
            PkgSlipItems: pkgSlipItems
        };

        if (parseInt(pkgSlipId) === parseInt(0)) {

            pkgSlip.CreatedBy = LOGGED_USER;
            pkgSlip.CreatedByIp = IP_ADDRESS;
        }
        else {
            pkgSlip.ModifiedBy = LOGGED_USER;
            pkgSlip.ModifiedByIp = IP_ADDRESS;
        }

        var postData = JSON.stringify(pkgSlip);

        shared.sendRequest(SERVICE_PATH + "SavePkgSlip", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                if (parseInt(response.responseText) > 0) {
                    swal({
                        title: "Success",
                        text: "Records Saved Succesfully.",
                        type: "success"
                    }, function () {
                        getPkgSlip();
                    });
                }
            }
            else {
                swal("error", "Unable to save the Pkg Slip Details due to some error.", "error");
                //handleError(response.Message + " " + response.ExceptionMessage);
            }
        });

    }

    function printPkgSlip() {

    }

    function exportPkgSlip() {

    }

    function showPkgSlipDetails(pkgSlipId) {

        if (pkgSlipId > 0) {

            if (pkgSlips.length) {

                var pkgSlip = pkgSlips.filter(function (value, index, array) {
                    return value.PkgSlipId === pkgSlipId;
                });

                if (pkgSlip.length) {

                    shared.setSelectValue(DOM.financialYear, null, pkgSlip[0].WorkingPeriodId);
                    shared.setSelect2ControlsText(DOM.financialYear);
                    shared.setSelectValue(DOM.company, null, pkgSlip[0].CompanyId);
                    shared.setSelect2ControlsText(DOM.company);
                    getBranchName(pkgSlip[0].BranchId);
                    DOM.pkgSlipNo.value = pkgSlip[0].PkgSlipNo;
                    DOM.pkgSlipNo.setAttribute("data-pkg-slip-id", pkgSlip[0].PkgSlipId);
                    DOM.pkgSlipDate.value = pkgSlip[0].PkgSlipDate;
                    shared.setSelectValue(DOM.typeOfTransfer, null, pkgSlip[0].TypeOfTransferId);
                    shared.setSelect2ControlsText(DOM.typeOfTransfer);
                    shared.setSelectValue(DOM.vendor, null, pkgSlip[0].VendorId);
                    shared.setSelect2ControlsText(DOM.vendor);
                    //shared.setSelectValue(DOM.purchaseBillNo, null, pkgSlip[0].PurchaseBillId);
                    //shared.setSelect2ControlsText(DOM.purchaseBillNo);
                    
                    DOM.referenceNo.value = pkgSlip[0].ReferenceNo;

                    DOM.purchaseBillNo.options.length = 0;

                    var option = document.createElement('option');

                    option.value = pkgSlip[0].PurchaseBillId;
                    option.text = pkgSlip[0].PurchaseBillNo;

                    DOM.purchaseBillNo.appendChild(option);
                    DOM.purchaseBillNo.options.selectedIndex = 0;

                    getFromLocations(pkgSlip[0].FromLocationId);

                    //shared.setSelectValue(DOM.fromLocation, null, pkgSlip[0].FromLocationId);
                    //shared.setSelect2ControlsText(DOM.fromLocation);                    
                    
                    //option = document.createElement('option');

                    //option.value = pkgSlip[0].FromLocationId;
                    //option.text = pkgSlip[0].FromLocation;

                    //DOM.fromLocation.appendChild(option);
                    //DOM.fromLocation.options.selectedIndex = 0;

                    shared.setSelectValue(DOM.toLocation, null, pkgSlip[0].ToLocationId);
                    shared.setSelect2ControlsText(DOM.toLocation);

                    shared.setSelectValue(DOM.karagir, null, pkgSlip[0].KaragirId);
                    shared.setSelect2ControlsText(DOM.karagir);

                    bindPkgSlipItem(pkgSlip);

                    shared.showPanel(DOM.editMode);
                    shared.hidePanel(DOM.viewMode);
                }
            }
        }

    }
    
    function savePkgSlipItem() {

        if (validatePkgSlipListItem()) {

            /* temp variable */
            var pkgSlipItemId = parseInt(0);
            var pkgSlipId = parseInt(0);
            var goodsReceiptItemId = parseInt(0);
            var itemId = parseInt(0);
            var baleNo = null;
            var itemName = null;
            var pkgQty = parseFloat(0);
            var unitOfMeasurementId = parseInt(0);
            var unitCode = null;
            var srNo = parseInt(0);

            var table = DOM.pkgSlipItemsList;
            var tableBody = table.tBodies[0];
            var tableRows = tableBody.children;

            if (tableRows.length) {

                for (var tr = 0; tr < tableRows.length; tr++) {

                    var input = tableRows[tr].children[3].children[0];

                    if (input.value > 0) {

                        pkgSlipItemId = parseInt(tableRows[tr].getAttribute('data-pkg-slip-item-id'));
                        pkgSlipId = parseInt(DOM.pkgSlipNo.getAttribute("data-pkg-slip-id"));
                        srNo = tr + 1;
                        goodsReceiptItemId = parseInt(tableRows[tr].getAttribute('data-goods-receipt-item-id'));
                        itemId = parseInt(tableRows[tr].getAttribute('data-item-id'));
                        baleNo = tableRows[tr].children[0].innerHTML;
                        itemName = tableRows[tr].children[1].innerHTML;
                        pkgQty = parseFloat(input.value);
                        unitOfMeasurementId = parseInt(tableRows[tr].getAttribute('data-unit-of-measurement-id'));
                        unitCode = tableRows[tr].children[4].innerHTML;

                        if (isNaN(pkgSlipItemId)) { pkgSlipItemId = parseInt(0); }

                        if (isNaN(pkgSlipId)) { pkgSlipId = parseInt(0); }

                        if (isNaN(goodsReceiptItemId)) { goodsReceiptItemId = parseInt(0); }

                        var pkgSlipItem = {};

                        pkgSlipItem = {
                            PkgSlipItemId: pkgSlipItemId,
                            PkgSlipId: pkgSlipId,
                            GoodsReceiptItemId: goodsReceiptItemId,
                            ItemId: itemId,
                            BaleNo: baleNo,
                            ItemName: itemName,
                            PkgQty: pkgQty,
                            UnitOfMeasurementId: unitOfMeasurementId,
                            SrNo: srNo,
                            IsDeleted: false
                        };

                        if (pkgSlipItemId === parseInt(0)) {

                            pkgSlipItem.CreatedBy = LOGGED_USER;
                            pkgSlipItem.CreatedByIP = IP_ADDRESS;
                        }
                        else {
                            pkgSlipItem.ModifiedBy = LOGGED_USER;
                            pkgSlipItem.ModifiedByIP = IP_ADDRESS;
                        }

                        pkgSlipItems.push(pkgSlipItem);

                    }
                }
            }
        }
    }
        
    function saveAndAddNewPkgSlipItem() {

        savePkgSlipItem();

        DOM.itemName.focus();

    }

    function validatePkgSlip() {

        isValid = true;

        if (DOM.purchaseBillNo.selectedIndex === 0) {
            DOM.purchaseBillNo.focus();
            swal("Error!!!", "Please select the Purchase Bill No..", "error");
            isValid = false;
        }
        else if (DOM.financialYear.selectedIndex === 0) {
            DOM.financialYear.focus();
            swal("Error!!!", "Please select the Financial Year.", "error");
            isValid = false;
        }
        else if (DOM.company.selectedIndex === 0) {
            DOM.company.focus();
            swal("Error!!!", "Please select the Company Name.", "error");
            isValid = false;
        }            
        else if (DOM.fromLocation.selectedIndex === 0) {
            DOM.fromLocation.focus();
            swal("Error!!!", "Please select the Location Name.", "error");
            isValid = false;
        }
        else if (DOM.pkgSlipDate.value === "") {
            DOM.pkgSlipDate.focus();
            swal("Error!!!", "Please enter the Pkg Slip Date.", "error");
            isValid = false;
        }

        return isValid;
    }

    function validatePkgSlipListItem() {

        isValid = true;

        var table = DOM.pkgSlipItemsList;

        var tableBody = table.tBodies[0];

        var inputs = table.querySelectorAll('input[type="text"]');

        if (inputs.length) {

            for (var inp = 0; inp < inputs.length; inp++) {

                var tableRow = inputs[inp].parentElement.parentElement;

                var balanceQty = parseFloat(tableRow.children[2].innerHTML);

                var pkgQty = parseFloat(inputs[inp].value);

                if (pkgQty > balanceQty) {                    
                    swal({
                        title: "Warning",
                        text: "Pkg Qty should not be greater than balance qty.",
                        type: "warning"
                    }, function () {
                        isValid = false;
                        inputs[inp].focus();
                    });
                }
            }
        }

        return isValid;
    }

    function bindPkgSlipItem(pkgSlip) {

        var table = DOM.pkgSlipItemsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (pkgSlip.length) {

            var pkgSlipItems = pkgSlip[0].PkgSlipItems;

            if (pkgSlipItems.length > 0) {

                var data = "";

                for (var r = 0; r < pkgSlipItems.length; r++) {

                    data = data + "<tr data-pkg-slip-item-id=" + pkgSlipItems[r].PkgSlipItemId + " data-item-id=" + pkgSlipItems[r].ItemId + " data-unit-of-measurement-id=" + pkgSlipItems[r].UnitOfMeasurementId + " data-goods-receipt-item-id=" + pkgSlipItems[r].GoodsReceiptItemId + ">";
                    data = data + "<td>" + pkgSlipItems[r].BaleNo + "</td>";
                    data = data + "<td>" + pkgSlipItems[r].ItemName + "</td>";
                    data = data + "<td>" + pkgSlipItems[r].PkgQty + "</td>";
                    data = data + "<td> <input type='text' class='form-control input-sm' id=" + pkgSlipItems[r].GoodsReceiptItemId + " value=" + pkgSlipItems[r].PkgQty + " /></td>";
                    data = data + "<td>" + pkgSlipItems[r].UnitCode + "</td>";
                    data = data + "</tr>";
                }

                tableBody.innerHTML = data;

                assignValidation();

            }
        }
    }

    function bindPkgSlip() {

        var table = DOM.pkgSlipList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (pkgSlips.length > 0) {

            var data = "";

            for (var r = 0; r < pkgSlips.length; r++) {

                data += "<tr data-pkg-slip-id=" + pkgSlips[r].PkgSlipId + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + pkgSlips[r].PkgSlipId + "' class='label-checkbox' name='SelectPkgSlip' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td> " + pkgSlips[r].SrNo + "</td > ";
                data += "<td>" + pkgSlips[r].PkgSlipNo + "</td>";
                data += "<td>" + pkgSlips[r].PkgSlipDate + "</td>";
                data += "<td>" + pkgSlips[r].FromLocation + "</td>";
                data += "<td>" + pkgSlips[r].TransferType + "</td>";
                data += "<td>" + pkgSlips[r].VendorName + "</td>";
                data += "<td>" + pkgSlips[r].ReferenceNo + "</td>";
                data += "<td>" + pkgSlips[r].TotalPkgSlipQty + "</td>";
                data += "</tr>";

            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);

        }
    }

    function getPkgSlip() {

        shared.showLoader(DOM.loader);

        pkgSlips.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllPkgSlips", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res !== undefined) {

                        pkgSlips = res;

                        bindPkgSlip();
                    }
                }
            }
            else {

                handleError('Response Status Code ' + response.status + ' Message: ' + response.responseText);

                swal({
                    html: true,
                    title: "Error",
                    text: "Unable to get the records due to an error in the system <br/> Response Code " + response.status + " Response Message " + response.responseText + "",
                    type: "error"
                });

                shared.showPanel(DOM.editMode);
                shared.hidePanel(DOM.viewMode);
            }

            shared.hideLoader(DOM.loader);

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


SharpiTech.PkgSlip.init();
