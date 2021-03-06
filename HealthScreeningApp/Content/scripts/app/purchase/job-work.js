﻿var SharpiTech = {};

SharpiTech.JobWork = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var jobWorks = [];
    var jobWorkItems = [];
    var jobWorkItemsMtrAdjustments = [];
    var FLAG = "";

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.addNewJobWork = document.getElementById('AddNewJobWork');
        DOM.showJobWorkList = document.getElementById('ShowJobWorkList');
        DOM.viewJobWork = document.getElementById('ViewJobWork');
        DOM.editJobWork = document.getElementById('EditJobWork');
        DOM.saveJobWork = document.getElementById('SaveJobWork');
        DOM.deleteJobWork = document.getElementById('DeleteJobWork');
        DOM.printJobWork = document.getElementById('PrintJobWork');
        DOM.exportJobWork = document.getElementById('ExportJobWork');

        DOM.editMode = document.getElementById('EditMode');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.company = document.getElementById('Company');
        DOM.branch = document.getElementById('Branch');
        DOM.jobWorkId = document.getElementById('JobWorkId');
        DOM.jobWorkNo = document.getElementById('JobWorkNo');
        DOM.jobWorkDate = document.getElementById('JobWorkDate');
        DOM.jobWorkDatePicker = document.getElementById('JobWorkDatePicker');
        DOM.purchaseBillNo = document.getElementById('PurchaseBillNo');
        DOM.karagir = document.getElementById('Karagir');
        //DOM.referenceNo = document.getElementById('ReferenceNo');
        DOM.karagirBillNo = document.getElementById('KaragirBillNo');
        DOM.karagirLocation = document.getElementById('KaragirLocation');
        DOM.purchaseBillItemsList = document.getElementById('PurchaseBillItemsList');
        DOM.jobWorkItemsList = document.getElementById('JobWorkItemsList');
        DOM.jobWorkItemsMtrAdjustmentList = document.getElementById('JobWorkItemsMtrAdjustmentList');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.jobWorkList = document.getElementById('JobWorkList');

        /* Jquery cache */
        DOM.$jobWorkDatePicker = $('#JobWorkDatePicker');
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

        DOM.$jobWorkDatePicker.datetimepicker({
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

        DOM.addNewJobWork.addEventListener('click', addNewJobWork);
        DOM.showJobWorkList.addEventListener('click', showJobWorkList);
        DOM.viewJobWork.addEventListener('click', viewJobWork);
        DOM.editJobWork.addEventListener('click', editJobWork);
        DOM.deleteJobWork.addEventListener('click', deleteJobWork);
        DOM.saveJobWork.addEventListener('click', saveJobWork);
        DOM.printJobWork.addEventListener('click', printJobWork);
        //DOM.exportOutwardDetails.addEventListener('click', exportOutwardDetails);

        DOM.company.onchange = function () {
            getBranchName(0, true);
        };

        DOM.purchaseBillNo.onchange = function (e) {

            if (e.target.value > 0) {

                getKaragirList(parseInt(e.target.value));

                

            }
        };

        DOM.karagir.onchange = function (e) {

            if (e.target.value > 0) {

                getAdditionalDetails();

                getPurchaseBillItem(parseInt(DOM.purchaseBillNo.options[DOM.purchaseBillNo.selectedIndex].value));

                getJobWorkItemsMTRAdjustmentDetails(parseInt(e.target.options[e.target.selectedIndex].getAttribute('data-pkgslipid')));
            }

        };
    }

    function loadData() {

        getFinancialYears();

        getCompanyNames();        
        
        addNewJobWork();
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

                    getBranchName(1);

                    shared.hideLoader(DOM.loader);
                }
            }

        });
    }

    function getBranchName(branchId) {

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

                    shared.hideLoader(DOM.loader);
                }
            });
        }

        shared.hideLoader(DOM.loader);
    }

    function getPurchaseBillNos() {

        DOM.purchaseBillNo.options.length = 0;

        shared.showLoader(DOM.loader);

        //var dataAttributes = "PkgSlipId";

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetPurchaseBillNos', DOM.purchaseBillNo, "PurchaseBillNo", "PurchaseBillId", "Choose PB No.", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.purchaseBillNo, parseInt(1));
                    shared.setSelect2ControlsText(DOM.purchaseBillNo);

                    getKaragirList(parseInt(DOM.purchaseBillNo.options[DOM.purchaseBillNo.selectedIndex].value));
                }
            }
            //shared.hideLoader(DOM.loader);
        });

    }

    function getKaragirList(purchaseBillId) {

        DOM.karagir.options.length = 0;

        shared.showLoader(DOM.loader);

        var dataAttributes = "PkgSlipId";

        shared.fillDropdownWithDataAttributesAndCallback(SERVICE_PATH + 'GetKaragirList/' + purchaseBillId, DOM.karagir, "KaragirName", "KaragirId", "Choose Karagir", dataAttributes, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.karagir, parseInt(0));
                    shared.setSelect2ControlsText(DOM.karagir);

                    getAdditionalDetails();
                }
            }
            //shared.hideLoader(DOM.loader);
        });

    }

    function getAdditionalDetails() {

        var pkgSlipId = 0;
               
        DOM.karagirBillNo.value = "";
        DOM.karagirLocation.value = "";
        //DOM.referenceNo.value = "";

        shared.showLoader(DOM.loader);

        if (DOM.purchaseBillNo.selectedIndex > 0) {

            pkgSlipId = parseInt(DOM.karagir.options[DOM.karagir.selectedIndex].getAttribute('data-pkgslipid'));

            if (isNaN(pkgSlipId)) { pkgSlipId = 0; }

            if (pkgSlipId > 0) {

                shared.sendRequest(SERVICE_PATH + "GetKaragirAndAdditionalDetails/" + pkgSlipId, "GET", true, "JSON", null, function (response) {

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            var res = JSON.parse(response.responseText);

                            DOM.karagirLocation.value = res.KaragirLocation;
                            DOM.karagirBillNo.value = "";//res.ReferenceNo;
                        }
                    }

                    shared.hideLoader(DOM.loader);

                });
            }
        }

        shared.hideLoader(DOM.loader);
    }

    function getPurchaseBillItem(purchaseBillId) {

        var table = DOM.purchaseBillItemsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        shared.sendRequest(SERVICE_PATH + "GetJobWorkPurchaseBillItems/" + purchaseBillId, "GET", true, "JSON", null, function (response) {

            var res = JSON.parse(response.responseText);

            if (response.status === 200) {

                var data = "";

                var goodsReceiptItemId = 0;

                for (var r = 0; r < res.length; r++) {

                    goodsReceiptItemId = parseInt(res[r].GoodsReceiptItemId);

                    data = data + "<tr data-purchase-bill-item-id=" + res[r].PurchaseBillItemId + " data-item-id=" + res[r].ItemId +" data-goods-receipt-item-id=" + res[r].GoodsReceiptItemId + ">";
                    data = data + "<td>" + res[r].ItemName + "</td>";
                    data = data + "<td>" + res[r].PurchaseQty + "</td>";
                    data = data + "<td>" + res[r].UnitCode + "</td>";
                    data = data + "</tr>";
                }

                tableBody.innerHTML = data;

                if (FLAG === "NEW") {

                    var karagirId = parseInt(DOM.karagir.options[DOM.karagir.selectedIndex].value);

                    getJobWorkItemsFromInward(purchaseBillId, karagirId, goodsReceiptItemId);
                }

            }


        });

    }

    function getJobWorkItemsFromInward(purchaseBillId, karagirId, goodsReceiptItemId) {

        jobWorkItems.length = 0;

        DOM.jobWorkItemsList.tBodies[0].innerHTML = "";

        shared.showLoader(DOM.loader);

        // Set From To Location

        if (DOM.purchaseBillNo.selectedIndex > 0) {

            jobWorkItems.length = 0;

            DOM.jobWorkItemsList.tBodies[0].innerHTML = "";

            shared.sendRequest(SERVICE_PATH + "GetJobWorkItemsFromInward/" + purchaseBillId + '/' + karagirId + '/' + goodsReceiptItemId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        jobWorkItems = res;

                        bindJobWorkItems();

                    }
                }
            });
        }

        shared.hideLoader(DOM.loader);

    }

    function getJobWorkItemsMTRAdjustmentDetails(pkgSlipId) {

        shared.showLoader(DOM.loader);

        // Set From To Location

        if (DOM.karagir.selectedIndex > 0) {

            jobWorkItemsMtrAdjustments.length = 0;

            DOM.jobWorkItemsMtrAdjustmentList.tBodies[0].innerHTML = "";
                    
            shared.sendRequest(SERVICE_PATH + "GetJobWorkItemReferenceNoDetails/" + pkgSlipId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        jobWorkItemsMtrAdjustments = res;

                        bindJobWorkItemsMtrAdjustment();

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
    };

    function unselectJobWorkDetails() {

        var tableBody = DOM.jobWorkList.tBodies[0];
        
        var checkBoxes = tableBody.querySelectorAll('.label-checkbox');

        if (checkBoxes.length > 0) {

            for (var c = 0; c < checkBoxes.length; c++) {

                checkBoxes[c].checked = false;
            }
        }
    }

    function bindJobWorkDetails() {

        shared.showLoader(DOM.loader);

        var table = DOM.jobWorkList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (jobWorks.length > 0) {

            var data = "";

            for (var r = 0; r < jobWorks.length; r++) {

                data += "<tr data-job-work-id=" + jobWorks[r].JobWorkId + ">";
                data += "<td> <label class='label-tick'> <input type='checkbox' id='" + jobWorks[r].jobWorkId + "' class='label-checkbox' name='SelectJobWork' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + jobWorks[r].JobWorkNo + "</td>";
                data += "<td>" + jobWorks[r].JobWorkDate + "</td>";
                data += "<td>" + jobWorks[r].PurchaseBillNo + "</td>";
                data += "<td>" + jobWorks[r].PurchaseQty + "</td>";
                data += "<td>" + jobWorks[r].KaragirName + "</td>";                
                data += "<td>" + jobWorks[r].PkgQty + "</td>";
                data += "<td>" + jobWorks[r].InwardQty + "</td>";
                data += "<td>" + jobWorks[r].AdjustedMtrs + "</td>";
                data += "<td>" + jobWorks[r].KaragirLocation + "</td>";
                data += "<td>" + jobWorks[r].FinancialYear + "</td>";
                data += "</tr>";

            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);

        }

        shared.hideLoader(DOM.loader);
    }

    function addNewJobWork() {

        FLAG = "NEW";

        shared.showLoader(DOM.loader);

        //clear the controls
        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.jobWorkNo.setAttribute('data-job-work-id', 0);
        DOM.jobWorkNo.value = 0;

        var currentDate = new Date();

        DOM.jobWorkDate.value = moment(currentDate).format("DD/MMM/YYYY");
        shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
        shared.setSelect2ControlsText(DOM.financialYear);
        shared.setSelectOptionByIndex(DOM.company, parseInt(2));
        shared.setSelect2ControlsText(DOM.company);
        shared.setSelectOptionByIndex(DOM.branch, parseInt(2));
        shared.setSelect2ControlsText(DOM.branch);

        getPurchaseBillNos();
        
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);

        // Set Focus
        DOM.company.focus();
    }

    function showJobWorkList() {

        if (FLAG === "SAVE") {
           getAllJobWorkDetails();
        }
        else {

            unselectJobWorkDetails();

            getAllJobWorkDetails();

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }
    }

    function viewJobWork() {

        FLAG = "VIEW";

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearTables(DOM.editMode);
        shared.clearSelect(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        var selectedRows = getSelectedRows(DOM.jobWorkList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {
                swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                shared.hideLoader(DOM.loader);
            }
            else {

                var currentTableRow = selectedRows[0];

                var jobWorkId = parseInt(currentTableRow.getAttribute('data-job-work-id'));

                if (isNaN(jobWorkId)) { jobWorkId = 0; }

                showJobWorkDetails(jobWorkId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hidePanel(DOM.loader);
    }

    function editJobWork() {

        FLAG = "EDIT";

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearTables(DOM.editMode);
        shared.clearSelect(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        var listOfControls = [DOM.financialYear, DOM.company, DOM.branch, DOM.purchaseBillNo, DOM.karagirBillNo, DOM.karagirLocation];

        shared.disableSpecificControls(listOfControls, true);

        var selectedRows = getSelectedRows(DOM.jobWorkList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {
                swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                shared.hideLoader(DOM.loader);
            }
            else {

                var currentTableRow = selectedRows[0];

                var jobWorkId = parseInt(currentTableRow.getAttribute('data-job-work-id'));

                if (isNaN(jobWorkId)) { jobWorkId = 0; }

                showJobWorkDetails(jobWorkId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hidePanel(DOM.loader);
    }

    function deleteJobWork() {

        FLAG = "DELETE";

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.jobWorkList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.jobWorkList);

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

                                var jobWorkId = parseInt(selectedRows[r].getAttribute('data-job-work-id'));

                                var jobWorkItems = [];

                                if (jobWorkItems.length) {

                                    var jobWorkItemList = jobWorks.filter(function (value, index, array) {
                                        return value.JobWorkId === jobWorkId;
                                    });

                                    jobWorkItems = jobWorks[0].JobWorkItems;

                                    if (jobWorkItems.length) {

                                        for (var p = 0; p < jobWorkItems.length; p++) {

                                            jobWorkItems[p].IsDeleted = true;
                                            jobWorkItems[p].DeletedBy = 1;
                                            jobWorkItems[p].DeletedByIP = IP_ADDRESS;
                                        }
                                    }

                                    var jobWork = {};

                                    jobWork = {
                                        JobWorkId: parseInt(selectedRows[r].getAttribute('data-job-work-id')),
                                        IsDeleted: true,
                                        DeletedBy: parseInt(LOGGED_USER),
                                        DeletedByIP: IP_ADDRESS,
                                        JobWorkItems: jobWorkItems
                                    };

                                    var postData = JSON.stringify(jobWork);

                                    shared.sendRequest(SERVICE_PATH + 'SaveJobWork', "POST", true, "JSON", postData, function (response) {

                                        if (response.status === 200) {

                                            if (parseInt(response.responseText) > 0) {

                                                //tableBody.removeChild(selectedRows[r]);

                                                swal({
                                                    title: "Success",
                                                    text: "Job Work Details Deleted Successfully.",
                                                    type: "success"
                                                }, function () {
                                                    getJobWorkDetails();
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

    function showJobWorkDetails(jobWorkId) {

        if (jobWorkId > 0) {

            if (jobWorks.length) {

                var jobWork = jobWorks.filter(function (value, index, array) {
                    return value.JobWorkId === jobWorkId;
                });

                if (jobWork.length) {

                    shared.setSelectValue(DOM.financialYear, null, jobWork[0].WorkingPeriodId);
                    shared.setSelect2ControlsText(DOM.financialYear);
                    shared.setSelectValue(DOM.company, null, jobWork[0].CompanyId);
                    shared.setSelect2ControlsText(DOM.company);
                    getBranchName(jobWork[0].BranchId, true);
                    DOM.jobWorkNo.value = jobWork[0].JobWorkNo;
                    DOM.jobWorkNo.setAttribute('data-job-work-id', jobWork[0].JobWorkId);
                    DOM.jobWorkDate.value = jobWork[0].JobWorkDate;
                    DOM.karagirBillNo.value = jobWork[0].KaragirBillNo;
                    DOM.karagirLocation.value = jobWork[0].KaragirLocation;

                    DOM.purchaseBillNo.options.length = 0;
                    
                    var option = document.createElement('option');

                    option.value = -1;
                    option.text = "Choose Purchase Bill No.";

                    DOM.purchaseBillNo.appendChild(option);

                    option = document.createElement('option');

                    option.value = jobWork[0].PurchaseBillId;
                    option.text = jobWork[0].PurchaseBillNo;
                    option.setAttribute('data-pkgslipid', jobWork[0].PkgSlipId);

                    DOM.purchaseBillNo.appendChild(option);

                    DOM.purchaseBillNo.selectedIndex = 1;

                    DOM.karagir.options.length = 0;

                    // Bind Karagir List
                    option.length = 0;

                    option.value = -1;
                    option.text = "Choose Karagir";

                    DOM.karagir.appendChild(option);

                    option = document.createElement('option');

                    option.value = jobWork[0].KaragirId;
                    option.text = jobWork[0].KaragirName;
                    
                    DOM.karagir.appendChild(option);

                    DOM.karagir.selectedIndex = 1;

                    //getKaragirList(jobWork[0].PurchaseBillId);
                    
                    jobWorkItems = jobWork[0].JobWorkItems;

                    bindJobWorkItems();

                    getPurchaseBillItem(jobWork[0].PurchaseBillId);

                    shared.showPanel(DOM.editMode);
                    shared.hidePanel(DOM.viewMode);
                }
            }
        }
    }

    //function getJobWorkDetails(jobWorkId) {

    //    DOM.jobWorkItemsList.tBodies[0].innerHTML = "";

    //    jobWorkItems = [];

    //    shared.sendRequest(SERVICE_PATH + "GetAllJobWorkDetails", "GET", true, "JSON", null, function (response) {

    //        if (response.status === 200) {

    //            if (response.responseText !== undefined) {

    //                var _response = JSON.parse(response.responseText);

    //                if (_response !== undefined) {

    //                    if (_response.length > 0) {

    //                        var table = DOM.jobWorkList;

    //                        var tableBody = table.tBodies[0];

    //                        for (var r = 0; r < _response.length; r++) {

    //                            var jobWorkItems = _response[r].JobWorkItems;

    //                            var jobWorkItemsCount = jobWorkItems.length;

    //                            if (jobWorkItemsCount> 0) {

    //                                for (var o = 0; o < jobWorkItemsCount; o++) {

    //                                    var jobWorkItem= {};

    //                                    jobWorkItem = {
    //                                        JobWorkItemId: jobWorkItem[o].OutwardGoodsId,
    //                                        OutwardId: goodsDetails[o].OutwardId,
    //                                        PkgSlipItemId: goodsDetails[o].PkgSlipItemId,
    //                                        ItemId: goodsDetails[o].ItemId,
    //                                        ItemName: goodsDetails[o].ItemName,
    //                                        PkgSlipId: goodsDetails[o].PkgSlipId,
    //                                        PkgSlipNo: goodsDetails[o].PkgSlipNo,
    //                                        TotalPkgSlipQty: goodsDetails[o].TotalPkgSlipQty,
    //                                        PkgSlipDate: goodsDetails[o].PkgSlipDate,
    //                                        IsDeleted: goodsDetails[0].IsDeleted
    //                                    };

    //                                    outwardGoods.push(outwardGoodsDetails);
    //                                }
    //                            }
    //                        }


    //                    }
    //                }
    //            }
    //        }
    //    });
    //}

    function bindJobWorkItems() {

        var table = DOM.jobWorkItemsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        //jobWorkItems = jobWork.JobWorkItems.filter(function (value, index, array) {
        //    return value.JobWorkId === jobWorkId;
        //});

        if (jobWorkItems.length) {

            var data = "";

            for (var jwi = 0; jwi < jobWorkItems.length; jwi++) {

                data = data + "<tr data-job-work-item-id=" + jobWorkItems[jwi].JobWorkItemId + " data-job-work-id=" + jobWorkItems[jwi].JobWorkId + " data-inward-goods-id=" + jobWorkItems[jwi].InwardGoodsId + " data-item-id=" + jobWorkItems[jwi].ItemId + " data-unit-of-measurement-id=" + jobWorkItems[jwi].UnitOfMeasurementId + " data-goods-receipt-item-id=" + jobWorkItems[jwi].GoodsReceiptItemId + ">";
                data = data + "<td>" + jobWorkItems[jwi].ItemName + "</td>";
                data = data + "<td>" + jobWorkItems[jwi].ItemQty + "</td>";
                data = data + "<td>" + jobWorkItems[jwi].UnitCode + "</td>";
                data = data + "<td> <input type='text' id=CutMtrs_" + jobWorkItems[jwi].JobWorkItemId + " class='form-control input-sm' value='" + jobWorkItems[jwi].CutMtrs + "'/> </td>";                
                data = data + "<td> <input type='text' id=MtrsUsed_" +  jobWorkItems[jwi].JobWorkItemId + " class='form-control input-sm' value='" + jobWorkItems[jwi].MtrsUsed + "'/> </td>";
                data = data + "<td> <input type='text' id=Rate_" + jobWorkItems[jwi].JobWorkItemId + " class='form-control input-sm' value='" + jobWorkItems[jwi].Rate + "'/> </td>";
                data = data + "</tr>";
            }

            tableBody.innerHTML = data;

            enableDisableInputs(tableBody);

            if (FLAG !== "VIEW") {
                attachEventToElement(tableBody);
            }

            calculateTotalMtrsUsedAndCutMtrs();
        }
    }

    function bindJobWorkItemsMtrAdjustment() {

        var table = DOM.jobWorkItemsMtrAdjustmentList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (jobWorkItemsMtrAdjustments.length) {

            var data = "";

            for (var jwi = 0; jwi < jobWorkItemsMtrAdjustments.length; jwi++) {

                data = data + "<tr data-job-work-mtr-adjustment-id=" + jobWorkItemsMtrAdjustments[jwi].JobWorkItemMtrAdjustmentId + ">";
                data = data + "<td>" + jobWorkItemsMtrAdjustments[jwi].ReferenceNo + "</td>";
                data = data + "<td>" + jobWorkItemsMtrAdjustments[jwi].PkgQty + "</td>";
                data = data + "<td>" + jobWorkItemsMtrAdjustments[jwi].BalanceMtrs + "</td>";
                data = data + "<td> <input type='text' id=AdjustedMtrs_" +  jobWorkItemsMtrAdjustments[jwi].JobWorkItemMtrAdjustmentId + " class='form-control input-sm' value='" + jobWorkItemsMtrAdjustments[jwi].AdjustedMtrs + "'/> </td>";
                data = data + "</tr>";
            }

            tableBody.innerHTML = data;

            //enableDisableInputs(tableBody);

            //if (FLAG !== "VIEW") {
            //    attachEventToElement(tableBody);
            //}

            //calculateTotalMtrsUsedAndCutMtrs();
        }
    }

    function enableDisableInputs(tableBody) {

        var inputs = tableBody.querySelectorAll('input[type=text]');

        if (inputs.length) {

            for (var inp = 0; inp < inputs.length; inp++) {

                if (FLAG === "VIEW") {
                    inputs[inp].disabled = true;
                }
                else {
                    inputs[inp].disabled = false;
                }
            }
        }
    }

    function attachEventToElement(tableBody) {

        var cutMtrsInputs = tableBody.querySelectorAll('input[type=text][id*="CutMtrs"]');

        if (cutMtrsInputs.length) {

            for (var inp = 0; inp < cutMtrsInputs.length; inp++) {

                cutMtrsInputs[inp].onblur = calculateMtrsUsed;
            }
        }
    }

    function calculateMtrsUsed(e) {

        var tableRow = e.target.parentElement.parentElement;
                
        var mtrsUsedInput = tableRow.children[4].children[0];

        var inwardQty = parseFloat(tableRow.children[1].innerHTML);

        var cutMtrs = parseFloat(e.target.value);

        if (mtrsUsedInput !== null || mtrsUsedInput !== undefined) {

            if (cutMtrs !== 0) {

                mtrsUsedInput.value = parseFloat(parseFloat(inwardQty * cutMtrs).toFixed(3));
            }
        }

        calculateTotalMtrsUsedAndCutMtrs();
    }

    function calculateTotalMtrsUsedAndCutMtrs() {

        var table = DOM.jobWorkItemsList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var tableFooter = table.tFoot;

        if (tableRows.length) {

            tableFooter.innerHTML = "";

            var totalInwardQty = 0;

            var totalCutMtrs = 0;

            var totalMtrsUsed = 0;

            for (var tr = 0; tr < tableRows.length; tr++) {

                var cutMtrsInput = tableRows[tr].children[3].children[0];

                var mtrsUsedInput = tableRows[tr].children[4].children[0];

                var inwardQty = tableRows[tr].children[1].innerHTML;

                totalInwardQty = parseFloat(totalInwardQty) + parseFloat(inwardQty);

                totalCutMtrs = parseFloat(totalCutMtrs) + parseFloat(cutMtrsInput.value);

                totalMtrsUsed = parseFloat(totalMtrsUsed) + parseFloat(mtrsUsedInput.value);
            }

            var footerData = "";

            var footerRow = document.createElement('tr');

            footerData = "<td class='text-center text-bold text-size-medium'> Total </td>";
            footerData += "<td class='text-center text-bold text-size-medium'>" + totalInwardQty + "</td>";
            footerData += "<td class='text-center text-bold text-size-medium'></td>";
            footerData += "<td class='text-right text-bold text-size-medium'>" + totalCutMtrs + "</td>";
            footerData += "<td class='text-right text-bold text-size-medium'>" + totalMtrsUsed + "</td>";
            footerData += "<td class='text-right text-bold text-size-medium'></td>";

            footerRow.innerHTML = footerData;

            tableFooter.appendChild(footerRow);

        }
    }

    function bindJobWorkItemDetails(jobWork) {

        var table = DOM.jobWorkItemsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (jobWorks.length) {

            jobWorkItems = jobWorks[0].JobWorkItems;

            if (jobWorkItems.length > 0) {

                var data = "";

                for (var r = 0; r < jobWorkItems.length; r++) {

                    //data = data + "<tr data-job-work-item-id=" + jobWorkItems[r].JobworkItemId + " data-pkg-slip-item-id=" + outwardGoods[r].PkgSlipItemId + " data-item-id=" + outwardGoods[r].ItemId + " data-unit-of-measurement-id=" + outwardGoods[r].UnitOfMeasurementId + " data-goods-receipt-item-id=" + outwardGoods[r].GoodsReceiptItemId + ">";
                    //data = data + "<td>" + outwardGoods[r].PkgSlipNo + "</td>";
                    //data = data + "<td>" + outwardGoods[r].PkgSlipDate + "</td>";
                    //data = data + "<td>" + outwardGoods[r].ItemName + "</td>";
                    //data = data + "<td>" + outwardGoods[r].TotalPkgSlipQty + "</td>";
                    //data = data + "<td>" + outwardGoods[r].UnitCode + "</td>";
                    //data = data + "</tr>";
                }

                tableBody.innerHTML = data;

            }
        }

    }

    function deleteJobWorkItem(currentTableRow) {

        var table = DOM.jobWorkItemsList;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var jobWorkItemId = parseInt(currentTableRow.getAttribute('data-job-work-item-id'));

        var jobWorkItem = {};

        jobWorkItem = {
            JobWorkItemId: jobWorkItemId,
            IsDeleted: true,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(jobWorkItems);

        shared.sendRequest(SERVICE_PATH + 'DeleteJobWorkItem', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function getAllJobWorkDetails() {

        shared.showLoader(DOM.loader);

        DOM.jobWorkList.tBodies[0].innerHTML = "";

        jobWorks.length = 0;

        jobWorkItems.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllJobWorks", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res !== undefined) {

                        jobWorks = res;

                        bindJobWorkDetails();

                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });
    }

    function saveJobWorkItems() {

        /* temp variable */
        var jobWorkItemId = parseInt(0);
        var jobWorkId = parseInt(0);     
        var inwardGoodsId = parseInt(0);
        var itemId = parseInt(0);
        var itemName = null;
        var itemQty = parseFloat(0);
        var unitOfMeasurementId = parseInt(0);
        var unitCode = null;
        var cutMtrs = 0;
        var itemRate = 0;
        var srNo = parseInt(0);

        var table = DOM.jobWorkItemsList;
        var tableBody = table.tBodies[0];
        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {
                
                jobWorkItemId = parseInt(tableRows[tr].getAttribute('data-job-work-item-id'));
                jobWorkId = parseInt(DOM.jobWorkNo.getAttribute("data-job-work-id"));
                inwardGoodsId = parseInt(tableRows[tr].getAttribute('data-inward-goods-id'));
                itemId = parseInt(tableRows[tr].getAttribute('data-item-id'));
                itemName = tableRows[tr].children[0].innerHTML;
                itemQty = parseFloat(tableRows[tr].children[1].innerHTML);
                unitOfMeasurementId = parseInt(tableRows[tr].getAttribute('data-unit-of-measurement-id'));
                unitCode = tableRows[tr].children[2].innerHTML;
                cutMtrs = parseFloat(tableRows[tr].children[3].children[0].value);
                itemRate = parseFloat(tableRows[tr].children[5].children[0].value);
                srNo = tr + 1;

                if (isNaN(jobWorkItemId)) { jobWorkItemId = parseInt(0); }

                if (isNaN(jobWorkId)) { jobWorkId = parseInt(0); }

                if (isNaN(inwardGoodsId)) { inwardGoodsId = parseInt(0); }

                if (isNaN(unitOfMeasurementId)) { unitOfMeasurementId = parseInt(0); }

                var jobWorkItem = {};

                jobWorkItem = {
                    JobWorkItemId: jobWorkItemId,
                    JobWorkId: jobWorkId,
                    InwardGoodsId: inwardGoodsId,
                    ItemQty: itemQty,
                    CutMtrs: cutMtrs,
                    Rate: itemRate,
                    SrNo: srNo,
                    IsDeleted: false
                };

                if (jobWorkItemId === parseInt(0)) {

                    jobWorkItem.CreatedBy = LOGGED_USER;
                    jobWorkItem.CreatedByIP = IP_ADDRESS;
                }
                else {
                    jobWorkItem.ModifiedBy = LOGGED_USER;
                    jobWorkItem.ModifiedByIP = IP_ADDRESS;
                }

                jobWorkItems.push(jobWorkItem);
                
                
                
            }
        }
    }

    function saveJobWorkItemsMtrAdjustment() {

        /* temp variable */
        var jobWorkItemMtrAdjustmentId = parseInt(0);
        var jobWorkId = parseInt(0);     
        var referenceNo = null;
        var adjustedMtrs = 0;
        var srNo = parseInt(0);

        var table = DOM.jobWorkItemsMtrAdjustmentList;
        var tableBody = table.tBodies[0];
        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {
                
                jobWorkItemMtrAdjustmentId = parseInt(tableRows[tr].getAttribute('data-job-work-item-mtr-adjustment-id'));
                jobWorkId = parseInt(DOM.jobWorkNo.getAttribute("data-job-work-id"));
                referenceNo = tableRows[tr].children[0].textContent;
                adjustedMtrs = parseFloat(tableRows[tr].children[3].children[0].value);
                srNo = tr + 1;

                if (isNaN(jobWorkItemMtrAdjustmentId)) { jobWorkItemMtrAdjustmentId = parseInt(0); }

                if (isNaN(jobWorkId)) { jobWorkId = parseInt(0); }

                var jobWorkItemMtrAdjustment = {};

                jobWorkItemMtrAdjustment = {
                    JobWorkItemMtrAdjustmentId: jobWorkItemMtrAdjustmentId,
                    JobWorkId: jobWorkId,
                    ReferenceNo: referenceNo,
                    AdjustedMtrs: adjustedMtrs,
                    SrNo: srNo,
                    IsDeleted: false
                };

                if (jobWorkItemMtrAdjustmentId === parseInt(0)) {

                    jobWorkItemMtrAdjustment.CreatedBy = LOGGED_USER;
                    jobWorkItemMtrAdjustment.CreatedByIP = IP_ADDRESS;
                }
                else {
                    jobWorkItemMtrAdjustment.ModifiedBy = LOGGED_USER;
                    jobWorkItemMtrAdjustment.ModifiedByIP = IP_ADDRESS;
                }

                jobWorkItemsMtrAdjustments.push(jobWorkItemMtrAdjustment);
                
            }
        }
    }
    
    function saveJobWork() {

        jobWorks.length = 0;
        jobWorkItems.length = 0;
        jobWorkItemsMtrAdjustments.length = 0;

        saveJobWorkItems();

        saveJobWorkItemsMtrAdjustment();

        if (jobWorkItems.length === 0) {
            swal("Error", "No item details found, so can not save the Job WorK Details.", "error");
            return;
        }

        if (jobWorkItemsMtrAdjustments.length === 0) {
            swal("Error", "No Reference Details found, so can not save the Job WorK Details.", "error");
            return;
        }

        var jobWorkId = 0;
        var purchaseBillId = 0;
        var jobWorkNo = 0;
        var jobWorkDate = null;
        var karagirId = 0;
        var karagirBillNo = null;
        var workingPeriodId = 0;
        var branchId = 0;

        jobWorkId = parseInt(DOM.jobWorkNo.getAttribute('data-job-work-id'));
        purchaseBillId = parseInt(DOM.purchaseBillNo.options[DOM.purchaseBillNo.selectedIndex].value);
        jobWorkNo = DOM.jobWorkNo.value;
        jobWorkDate = DOM.jobWorkDate.value;
        karagirId = parseInt(DOM.karagir.options[DOM.karagir.selectedIndex].value);
        karagirBillNo = DOM.karagirBillNo.value;
        workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);
        branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
            
        if (jobWorkId === null) { jobWorkId = parseInt(0); }

        if (isNaN(jobWorkId)) { jobWorkId = parseInt(0); }

        if (isNaN(purchaseBillId)) { purchaseBillId = 0; }

        if (isNaN(karagirId)) { karagirId = 0; }

        if (jobWorkNo === '') { jobWorkNo = 0; }

        if (purchaseBillId === 0) {
            handleError("Purchase Bill Id is 0");
            swal("Error", "Something went wrong in selection of Purchase Bill No., some data is not found.", "error");
            return;
        }
        else if (karagirId === 0) {
            handleError("Karagir Id is 0.");
            swal("Error", "Something went wrong in selection of Karagir Name, some data is not found.", "error");
            return;
        }
        else if (karagirBillNo === "") {
            swal("Error", "Please enter the Karagir Bill No.", "error");
            return;
        }

        var jobWork = {};

        jobWork = {
            JobWorkId: jobWorkId,
            PurchaseBillId: purchaseBillId,
            JobWorkNo: jobWorkNo,
            JobWorkDate: jobWorkDate,
            KaragirId: karagirId,
            KaragirBillNo: karagirBillNo,
            BranchId: branchId,
            IsDeleted: false,
            WorkingPeriodId: workingPeriodId,
            JobWorkItems: jobWorkItems,
            JobWorkItemMtrAdjustments: jobWorkItemsMtrAdjustments
        };

        if (parseInt(jobWorkId) === parseInt(0)) {

            jobWork.CreatedBy = LOGGED_USER;
            jobWork.CreatedByIp = IP_ADDRESS;
        }
        else {
            jobWork.ModifiedBy = LOGGED_USER;
            jobWork.ModifiedByIp = IP_ADDRESS;
        }

        var postData = JSON.stringify(jobWork);

        shared.sendRequest(SERVICE_PATH + "SaveJobWork", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {
            
                var res = JSON.parse(response.responseText);

                if (parseInt(res) > parseInt(0)) {
                    FLAG = "SAVE";

                    swal({
                        title: "Success",
                        text: "Job Work Details Saved Successfully. Job Work No. is " + res,
                        type: "success"
                    }, function () {
                        //getJobWorkDetails();
                    });
                }
            }
            else {
                
                swal("error", "Unable to save the Outward Details. Error as " + response.Message + " " + response.ExceptionMessage, "error");
                handleError(response.Message + " " + response.ExceptionMessage);
            }
        });
    }

    function printJobWork() {

        shared.showLoader(DOM.loader);

        var print = {};

        var jobWorkId = parseInt(DOM.jobWorkNo.getAttribute('data-job-work-id'));
        var karagirBillNo = DOM.karagirBillNo.value;
        var branchId = DOM.branch.options[DOM.branch.selectedIndex].value;
        var yr = DOM.financialYear.options[DOM.financialYear.selectedIndex].text;

        print = {
            KaragirBillNo: karagirBillNo,
            BranchId: branchId,
            FinancialYear: yr
        };

        var postData = JSON.stringify(print);

        shared.sendRequest(SERVICE_PATH + "PrintKaragirBill", "POST", true, "JSON", postData, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            window.open(location.origin + "/POS/ApplicationFiles/JobWork/KaragirBills/" + branchId + '/' + yr + karagirBillNo + ".pdf", "_blank");

                        }
                    }
                }
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


SharpiTech.JobWork.init();
