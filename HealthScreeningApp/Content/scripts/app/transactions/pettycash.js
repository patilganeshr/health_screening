

var Sofarch = {};

Sofarch.PettyCash = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var Pettycase = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');
        DOM.viewMode = document.getElementById('ViewMode');
        DOM.pettycashlist = document.getElementById('PettyCashList');
        DOM.editMode = document.getElementById('EditMode');

        DOM.DocNo = document.getElementById('DocNo');
        DOM.EntryDate = document.getElementById('EntryDate');
        DOM.DateRange = document.getElementById('DateRange');
        DOM.AccountHead = document.getElementById('AccountHead');
        DOM.Supplier = document.getElementById('Supplier');
        DOM.VoucherNo = document.getElementById('VoucherNo');
        DOM.Amount = document.getElementById('Amount');



        DOM.addNewpettycash = document.getElementById('AddNewpettycash');
        DOM.showpettycashList = document.getElementById('ShowpettycashList');
        DOM.viewpettycash = document.getElementById('Viewpettycash');
        DOM.editpettycash = document.getElementById('Editpettycash');
        DOM.savepettycash = document.getElementById('Savepettycash');
        DOM.deletepettycash = document.getElementById('Deletepettycash');
        DOM.printpettycashList = document.getElementById('PrintpettycashList');
        DOM.filterpettycash = document.getElementById('Filterpettycash');
        DOM.exportpettycashList = document.getElementById('ExportpettycashList');
        DOM.$PettyCashDateDatePicker = $('#pettycashDateDatePicker');

    }

    function applyPlugins() {

        $('select').select2();
        var currentDate = new Date();

        DOM.$PettyCashDateDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

    }

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    $("select").on("change", function (event) {

        setFocusOnSelect(event);

    });

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.addNewpettycash.addEventListener('click', addNewPettyCash);
        DOM.showpettycashList.addEventListener('click',getPettyCash);
        DOM.viewpettycash.addEventListener('click', viewPettycash);
        DOM.editpettycash.addEventListener('click', editPettycash);
        DOM.savepettycash.addEventListener('click', savePettyCash);
        DOM.deletepettycash.addEventListener('click', deletePettyCash);
    }

    function loadData() {



    }

    function getAccountHead() {

        DOM.AccountHead.options.length = 0;

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllAccountHead', DOM.AccountHead, "AccountHeadName", "AccountHeadId", "Select Head", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectValue(DOM.AccountHead, null, parseInt(0));
                    shared.setSelect2ControlsText(DOM.AccountHead);
                    shared.hideLoader(DOM.loader);
                    //getStates(98);
                }
            }

        });

    }


    var getSelectedRows = function (listObject) {

        var selectedRows = [];

        var tableBody = listObject.tBodies[0];

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

    function addNewPettyCash() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.DocNo.setAttribute('data-PettycaseId-id', 0);

        getAccountHead();

        //set focus
        DOM.DocNo.focus();

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);
    }

    function viewPettycash() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        var selectedRows = getSelectedRows(DOM.pettycashlist);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var PettycaseId = parseInt(currentTableRow.getAttribute('data-PettycaseId-id'));

                if (isNaN(PettycaseId)) { PettycaseId = 0; }

                showSelectedPettycash(PettycaseId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.DocNo.focus();

    }

    function editPettycash() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        var selectedRows = getSelectedRows(DOM.pettycashlist);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");
                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var PettycaseId = parseInt(currentTableRow.getAttribute('data-PettycaseId-id'));

                if (isNaN(PettycaseId)) { PettycaseId = 0; }

                showSelectedPettycash(PettycaseId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.DocNo.focus();

    }

    function deletePettyCash(currentTableRow) {

        var table = DOM.pettycashlist;

        var tableBody = table.tBodies[0];

        /* temp variable */
    
        var Pettycaseid = parseInt(currentTableRow.getAttribute('data-PettycaseId-id'));

        if (isNaN(Pettycaseid)) { Pettycaseid = 0; }

        var Pettycash = {};

        Pettycash = {
            PettycaseId: Pettycaseid,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIP: IP_ADDRESS
        };

        var postData = JSON.stringify(Pettycash);

        shared.sendRequest(SERVICE_PATH + 'SavePettyCash', "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                if (response.responseText === "true") {

                    tableBody.removeChild(currentTableRow);
                }
            }

        });
    }

    function showSelectedPettycash(PettycaseId) {

        if (Pettycase.length > 0) {

            var selectedPettycase = Pettycase.filter(function (value, index, array) {
                return value.PettycaseId === PettycaseId;
            });

            if (selectedPettycase.length) {

                for (var c = 0; c < selectedPettycase.length; c++) {

                    //assign text to input
                    DOM.DocNo.setAttribute('data-PettycaseId-id',PettycaseId);
                    DOM.DocNo.value = selectedPettycase[c].DocNo;
                    DOM.EntryDate.value = selectedPettycase[c].EntryDate;
                    DOM.DateRange.value = selectedPettycase[c].DateRange;
                    shared.setSelectValue(DOM.AccountHead, null, parseInt(selectedPettycase[c].AccountHeadId));
                    shared.setSelect2ControlsText(DOM.AccountHead);
                    DOM.Supplier.value = selectedPettycase[c].Supplier;
                    DOM.VoucherNo.value = selectedPettycase[c].VoucherNo;
                    DOM.Amount.value = selectedPettycase[c].Amount;

                }

            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.DocNo.focus();
    }

    function savePettyCash() {

        if (DOM.DocNo.value === "") {
            swal("Error!!!", "Please enter the DocNo.", "error");
            return;
        }

        /* temp variable */


        var pettycaseid = 0;
        var docno = null;
        var entrydate = null;
        var daterange = null;
        var accounthead = 0;
        var supplier = null;
        var voucherno = null;
        var amount = null;


        pettycaseid = parseInt(DOM.DocNo.getAttribute('data-PettycaseId-id'));
        docno = DOM.DocNo.value;
        entrydate = DOM.EntryDate.value;
        daterange = DOM.DateRange.value;
        accountheadid = parseInt(DOM.AccountHead.options[DOM.AccountHead.selectedIndex].value);

        supplier = DOM.Supplier.value;
        voucherno = DOM.VoucherNo.value;
        amount = DOM.Amount.value;


        if (isNaN(AccountHead)) { AccountHead = 0; }
        if (isNaN(pettycaseid)) { pettycaseid = 0; }

        var Pettycash = {};

        Pettycash = {
            PettycaseId:pettycaseid,
            DocNo: docno,
            EntryDate: entrydate,
            DateRange: daterange,
            AccountHeadId: accountheadid,
            supplier: supplier,
            voucherno: voucherno,
            Amount: amount
        };

        if (parseInt(pettycaseid) === parseInt(0)) {

           Pettycash.CreatedBy = parseInt(LOGGED_USER);
           Pettycash.CreatedByIP = IP_ADDRESS;
        }
        else {
            Pettycash.ModifiedBy = parseInt(LOGGED_USER);
            Pettycash.ModifiedByIP = IP_ADDRESS;
        }



      
        var postData = JSON.stringify(Pettycash);

        shared.sendRequest(SERVICE_PATH + "SavePettyCash", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {

                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Successfully.",
                        type: "success"
                    }, function () {
                        addNewPettyCash();
                    });
                }
            }
            else {
                swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
            }
        });

    }

    function getPettyCash() {

        shared.showLoader(DOM.loader);

        DOM.pettycashlist.tBodies[0].innerHTML = "";

        Pettycase.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllPettyCash", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        Pettycase = _response;

                        bindpettycash();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }

    function bindpettycash() {

        shared.showLoader(DOM.loader);

        DOM.pettycashlist.tBodies[0].innerHTML = "";

        if (Pettycase.length) {

            var data = "";

            for (var r = 0; r < Pettycase.length; r++) {

                data += "<tr data-PettycaseId-id=" + Pettycase[r].PettycaseId + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + Pettycase[r].PettycaseId + "' class='label-checkbox' name='Select' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + Pettycase[r].SrNo + "</td>";
                data += "<td>" + Pettycase[r].DocNo + "</td>";
                data += "<td>" + Pettycase[r].EntryDate + "</td>";
                data += "<td>" + Pettycase[r].DateRange + "</td>";
                data += "<td>" + Pettycase[r].AccountHead + "</td>";
                data += "<td>" + Pettycase[r].Supplier + "</td>";
                data += "<td>" + Pettycase[r].VoucherNo + "</td>";
                data += "<td>" + Pettycase[r].Amount + "</td>";
                data += '</tr>';
            }

            DOM.pettycashlist.tBodies[0].innerHTML = data;
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.pettycashlist.focus();

        shared.hideLoader(DOM.loader);
    }


    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        applyPlugins();
        bindEvents();
        loadData();
        addNewPettyCash();
    }

    return {
        init: init
    };

}());


Sofarch.PettyCash.init();
