

var SharpiTech = {};

SharpiTech.DailyReceivablePayable = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var dailyReceivablePayable = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.editMode = document.getElementById('EditMode');
        DOM.addDailyReceivablePayable = document.getElementById('AddDailyReceivablePayable');
        DOM.saveDailyReceivablePayable = document.getElementById('SaveDailyReceivablePayable');
        DOM.printDailyReceivablePayable = document.getElementById('PrintDailyReceivablePayable');
        DOM.exportDailyReceivablePayable = document.getElementById('ExportDailyReceivablePayable');

        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.company = document.getElementById('Company');
        DOM.branch = document.getElementById('Branch');
        DOM.entryDate = document.getElementById('EntryDate');
        DOM.entryDatePicker = document.getElementById('EntryDatePicker');
        DOM.particulars = document.getElementById('Particulars');
        DOM.recPayAmount = document.getElementById('RecPayAmount');
        DOM.receivablePayable = document.getElementById('ReceivablePayable');
        DOM.comments = document.getElementById('Comments');
        
        DOM.$entryDatePicker = $('#EntryDatePicker');

        DOM.dailyReceivablePayableList = document.getElementById('DailyReceivablePayableList');
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

        DOM.$entryDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

    }

    function bindEvents() {

        DOM.addDailyReceivablePayable.addEventListener('click', addNewDailyReceivablePayable);
        DOM.saveDailyReceivablePayable.addEventListener('click', saveDailyReceivablePayable);
        //DOM.printDailyReceivablePayable.addEventListener('click', printDailyReceivablePayable);
        DOM.exportDailyReceivablePayable.addEventListener('click', exportDailyReceivablePayableReport);

        DOM.entryDate.onchange = function () {
            getDailyReceivablePayableData();
        };

        DOM.$entryDatePicker.datetimepicker().on('dp.change', function (e) {
            getDailyReceivablePayableData();
        });

    }

    function loadData() {

        getFinancialYear();
        getCompany();
        
    }

    function getFinancialYear() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
                    shared.setSelect2ControlsText(DOM.financialYear);

                }
            }

            shared.hideLoader(DOM.loader);

        });

        shared.hideLoader(DOM.loader);
    }

    function getCompany() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllCompanies', DOM.company, "CompanyName", "CompanyId", "Choose Company", function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.company, parseInt(2));
                    shared.setSelect2ControlsText(DOM.company);

                    getBranchName(0);
                }
            }

            shared.hideLoader(DOM.loader);

        });

        shared.hideLoader(DOM.loader);
    }

    function getBranchName(branchId) {

        shared.showLoader(DOM.loader);

        DOM.branch.options.length = 0;

        if (DOM.company.selectedIndex > 0) {

            var companyId = parseInt(DOM.company.options[DOM.company.selectedIndex].value);

            if (isNaN(companyId)) { companyId = parseInt(0); }

            if (companyId > 0) {

                shared.fillDropdownWithCallback(SERVICE_PATH + 'GetBranchesByCompanyId/' + companyId, DOM.branch, "BranchName", "BranchId", "Choose Branch", function (response) {

                    shared.showLoader(DOM.loader);

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            if (branchId > 0) {
                                shared.setSelectValue(DOM.branch, null, branchId);
                                shared.setSelect2ControlsText(DOM.branch);
                            }
                            else {
                                shared.setSelectOptionByIndex(DOM.branch, parseInt(2));
                                shared.setSelect2ControlsText(DOM.branch);
                            }
                        }
                    }

                    shared.hideLoader(DOM.loader);

                });
            }
        }

        shared.hideLoader(DOM.loader);
    }

    function resetControlsData() {

        DOM.particulars.value = "";
        DOM.amount.value = "";
        DOM.comments.value = "";

        DOM.particulars.focus();
    }

    function addNewDailyReceivablePayable() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);
        shared.disableControls(DOM.editMode, false);

        // Set default values
        var currentDate = new Date();
        
        shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
        shared.setSelect2ControlsText(DOM.financialYear);
        DOM.entryDate.value = moment(currentDate).format("DD/MMM/YYYY");

        DOM.particulars.setAttribute('data-daily-rec-pay-id', 0);

        //set focus
        DOM.entryDate.focus();

        shared.hideLoader(DOM.loader);

    }

    function validateData() {

        var isValidData = true;

        if (DOM.financialYear.options[DOM.branch.selectedIndex].value === -1) {
            swal("Error!!!", "Please select the Financial Year.", "error");
            DOM.financialYear.focus();
            isValidData = false;
            return;
        }
        else if (DOM.company.options[DOM.company.selectedIndex].value === -1) {
            swal("Error!!!", "Please select the Company.", "error");
            DOM.company.focus();
            isValidData = false;
            return;
        }
        else if (DOM.branch.options[DOM.branch.selectedIndex].value === -1) {
            swal("Error!!!", "Please select the Branch.", "error");
            DOM.branch.focus();
            isValidData = false;
            return;
        }
        else if (DOM.particulars.value === "") {
            swal("Error!!!", "Please enter the Particulars.", "error");
            DOM.particulars.focus();
            isValidData = false;
            return;
        }
            
        else if (DOM.recPayAmount.value === "") {
            swal("Error!!!", "Please enter the Amount.", "error");
            DOM.amount.focus();
            isValidData = false;
            return;
        }
        
        return isValidData;
    }

    function saveDailyReceivablePayable() {

        var isValidData = validateData();

        if (isValidData) {

            var dailyRecPayId = 0;
            var workingPeriodId = 0;
            var financialYear = null;
            var companyName = null;
            var branchId = 0;
            var branchName = null;
            var entryDate = null;
            var particulars = null;
            var recPayaAmount = 0;
            var receivablePayable = null;
            var comments = null;

            dailyRecPayId = parseInt(DOM.particulars.getAttribute('data-daily-rec-pay-id'));
            workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);
            financialYear = DOM.financialYear.options[DOM.financialYear.selectedIndex].text;
            companyName = DOM.company.options[DOM.company.selectedIndex].text;
            branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
            branchName = DOM.branch.options[DOM.branch.selectedIndex].text;
            entryDate = DOM.entryDate.value;
            particulars = DOM.particulars.value.toUpperCase();
            recPayAmount = parseFloat(DOM.recPayAmount.value);
            receivablePayable = DOM.receivablePayable.options[DOM.receivablePayable.selectedIndex].text;
            comments = DOM.comments.value.toUpperCase();

            if (isNaN(dailyRecPayId)) { dailyRecPayId = 0; }
            if (isNaN(workingPeriodId)) { workingPeriodId = 0; }
            if (isNaN(branchId)) { branchId = 0; }
           
            var recpay = {};

            recpay = {
                DailyRecPayId: dailyRecPayId,
                EntryDate: entryDate,
                Particulars: particulars,
                Amount: recPayAmount,
                Comments: comments,
                ReceivablePayable: receivablePayable,
                WorkingPeriodId: workingPeriodId,
                BranchId: branchId
            };

            if (parseInt(dailyRecPayId) === parseInt(0)) {

                recpay.CreatedBy = parseInt(LOGGED_USER);
                recpay.CreatedByIP = IP_ADDRESS;
            }
            else {
                recpay.ModifiedBy = parseInt(LOGGED_USER);
                recpay.ModifiedByIP = IP_ADDRESS;
            }

            var postData = JSON.stringify(recpay);

            shared.sendRequest(SERVICE_PATH + "SaveDailyReceivablePayable", "POST", true, "JSON", postData, function (response) {

                var _response = JSON.parse(response.responseText);

                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Records Saved Successfully.",
                            type: "success"
                        }, function () {
                            resetControlsData();
                            getDailyReceivablePayableData();
                        });
                    }
                }
                else {
                    swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
                }
            });

        }

    }

    function bindReportData() {

        // Check the _charges list has values
        if (dailyReceivablePayable.length > 0) {

            var tableBody = DOM.dailyReceivablePayableList.tBodies[0];

            tableBody.innerHTML = "";

            // Check the Sales bill register details has values
            if (dailyReceivablePayable.length) {

                var data = "";

                for (var r = 0; r < dailyReceivablePayable.length; r++) {

                    data = data + "<tr data-daily-rec-pay-id=" +  dailyReceivablePayable[r].DailyRecPayId + ">";
                    data = data + "<td class='text-left'> <span> " + dailyReceivablePayable[r].Particulars + " </span> <p style='text-indent:15px; font-weight:700'>" + dailyReceivablePayable[r].Comments + " </span></td>";
                    data = data + "<td class='text-right'>" + dailyReceivablePayable[r].ReceivableAmount + "</td>";
                    data = data + "<td class='text-right'>" + dailyReceivablePayable[r].PayableAmount + "</td>";
                    if(dailyReceivablePayable[r].Flag === "EDIT") {
                        data = data + "<td class='text-left'> <button type='button' class='btn btn-xs btn-info' id='EditDailyRecPayItem" + r + "'><i class='fa fa-edit'></i></button> " +
                            "<button type='button' class='btn btn-xs btn-danger' id='DeleteDailyRecPayItem" + r + "'><i class='fa fa-remove'></i></button></td> ";
                    }
                    data = data + "</tr>";

                }

                tableBody.innerHTML = data;

                assignEventHandler(tableBody, "Edit", editItem);
                assignEventHandler(tableBody, "Delete", deleteItem);

                
            }
        }
    }

    function assignEventHandler(tableBody, buttonIdToFind, methodName) {

        var buttons = tableBody.querySelectorAll("button[type='button'][id*='"+ buttonIdToFind + "']");
        
        if (buttons.length) {

            for (var b = 0; b < buttons.length; b++) {

                buttons[b].onclick = methodName;
                buttons[b].children[0].onclick = methodName;
            }
        }

    }

    function editItem(e) {

        e.stopPropagation();

        var particulars = null;
        var recPayAmount = 0;
        var receivablePayable = null;
        var comments = null;
        var tableRow = null;
        var dailyRecPayId = 0;

        if (e.currentTarget.classList[0].includes('fa')) {

            tableRow = e.target.parentElement.parentElement.parentElement;
        }
        else {

            tableRow = e.target.parentElement.parentElement;

        }

        particulars = tableRow.children[0].children[0].textContent;

        if (tableRow.children[1].textContent !== "0") {
            recPayAmount = tableRow.children[1].textContent;
            receivablePayable = "R";

        }
        else {
            amount = tableRow.children[2].textContent;
        }
        comments = tableRow.children[0].children[1].textContent;
        dailyRecPayId = parseInt(tableRow.getAttribute('data-daily-rec-pay-id'));

        DOM.particulars.value = particulars;
        DOM.particulars.setAttribute('data-daily-rec-pay-id', dailyRecPayId);
        DOM.recPayAmount.value = recPayAmount;
        shared.setSelectValue(DOM.receivablePayable, null, receivablePayable);
        shared.setSelect2ControlsText(DOM.receivablePayable);            
        DOM.comments.value = comments;

        DOM.particulars.focus();
    }

    function deleteItem(e) {

        e.stopPropagation();

            shared.showLoader(DOM.loader);

        try {

            //var tableBody = DOM.inwardList.tBodies[0];

            var tableRow = null;
            var dailyRecPayId = 0;

            if (e.currentTarget.classList[0].includes('fa')) {

                tableRow = e.target.parentElement.parentElement.parentElement;
            }
            else {

                tableRow = e.target.parentElement.parentElement.parentElement;

            }

            dailyRecPayId = parseInt(tableRow.getAttribute('data-daily-rec-pay-id'));

            DOM.particulars.setAttribute('data-daily-rec-pay-id', dailyRecPayId);

            if (isNaN(dailyRecPayId)) { dailyRecPayId = -1; }

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

                        var recpay = {};

                        recpay = {
                            DailyRecPayId: dailyRecPayId,
                            IsDeleted: true,
                            DeletedBy: parseInt(LOGGED_USER),
                            DeletedByIP: IP_ADDRESS
                        };

                        var postData = JSON.stringify(recpay);

                        shared.sendRequest(SERVICE_PATH + 'SaveDailyReceivablePayable', "POST", true, "JSON", postData, function (response) {

                            if (response.status === 200) {

                                if (parseInt(response.responseText) > 0) {

                                    swal({
                                        title: "Success",
                                        text: "Item deleted successfully.",
                                        type: "success"
                                    }, function () {
                                        getDailyReceivablePayableData();
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
        catch (e) {
            handleError(e.message);
        }
        finally {

            shared.hideLoader(DOM.loader);
        }
    
    }

    function getDailyReceivablePayableData() {

        dailyReceivablePayable.length = 0;

        var dailyRecPay = {
            EntryDate: DOM.entryDate.value
        };

        var postData = JSON.stringify(dailyRecPay);

        shared.sendRequest(SERVICE_PATH + "GetDailyReceivablePaybleData", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        dailyReceivablePayable = _response;
                        
                        bindReportData();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }
    
    function exportDailyReceivablePayableReport() {

        fnExcelReport();
    }

    function fnExcelReport() {
        var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
        var textRange; var j = 0;
        tab = DOM.dailyReceivablePayableList; // id of table

        for (j = 0; j < tab.rows.length; j++) {
            tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
            //tab_text=tab_text+"</tr>";
        }

        tab_text = tab_text + "</table>";
        tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
        tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
        tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
        {
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(tab_text);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, "Test.xls");
        }
        else                 //other browser not tested on IE 11
            sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

        return (sa);
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


SharpiTech.DailyReceivablePayable.init();
