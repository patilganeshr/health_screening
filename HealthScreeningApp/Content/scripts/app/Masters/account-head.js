

var Sofarch = {};

Sofarch.AccountHead = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var AccountHeads = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.accountHeadList = document.getElementById('AccountHeadList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.accountHeadName = document.getElementById('AccountHeadName');

        DOM.addNewAccountHead = document.getElementById('AddNewAccountHead');
        DOM.showAccountHeadList = document.getElementById('ShowAccountHeadList');
        DOM.viewAccountHead = document.getElementById('ViewAccountHead');
        DOM.editAccountHead = document.getElementById('EditAccountHead');
        DOM.saveAccountHead = document.getElementById('SaveAccountHead');
        DOM.deleteAccountHead = document.getElementById('DeleteAccountHead');

    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.addNewAccountHead.addEventListener('click', addNewAccountHead);
        DOM.showAccountHeadList.addEventListener('click', getAccountHeads);
        DOM.viewAccountHead.addEventListener('click', viewAccountHead);
        DOM.editAccountHead.addEventListener('click', editAccountHead);
        DOM.saveAccountHead.addEventListener('click', saveAccountHead);
        DOM.deleteAccountHead.addEventListener('click', deleteAccountHead);
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

    function getSelectedAccountHeadDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.accountHeadList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var accountHeadId = parseInt(currentTableRow.getAttribute('data-account-head-id'));

                if (isNaN(accountHeadId)) { accountHeadId = 0; }

                showAccountHeadDetailsById(accountHeadId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

    }

    function addNewAccountHead() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.accountHeadName.setAttribute('data-account-head-id', 0);
                
        //set focus
        DOM.accountHeadName.focus();

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);
    }

    function viewAccountHead() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedAccountHeadDetails();

        DOM.accountHeadName.focus();

    }

    function editAccountHead() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);
                
        getSelectedAccountHeadDetails();

        //set focus
        DOM.accountHeadName.focus();

    }

    function deleteAccountHead() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.accountHeadList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.accountHeadList);

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

                                var accountHead = {
                                    AccountHeadId: parseInt(selectedRows[r].getAttribute('data-account-head-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS
                                };

                                var postData = JSON.stringify(accountHead);

                                shared.sendRequest(SERVICE_PATH + 'SaveAccountHead', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {
                                            swal({
                                                title: "Success",
                                                text: "Account Head deleted successfully.",
                                                type: "success"
                                            }, function () {
                                                addNewAccountHead();
                                            });
                                        }
                                        else {
                                            swal("Error", "Unable to delete the records due to some error.", "Error");
                                        }
                                    }

                                    shared.hideLoader(DOM.loader);

                                });
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

    function showAccountHeadDetailsById(accountHeadId) {

        if (AccountHeads.length) {

            var selectedAccountHead = AccountHeads.filter(function (value, index, array) {
                return value.AccountHeadId === accountHeadId;
            });

            if (selectedAccountHead.length) {

                //assign text to input
                DOM.accountHeadName.setAttribute('data-account-head-id', selectedAccountHead[0].AccountHeadId);
                DOM.accountHeadName.value = selectedAccountHead[0].AccountHeadName;

            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.accountHeadName.focus();
    }

    function saveAccountHead() {

        if (DOM.accountHeadName.value === "") {
            DOM.accountHeadName.focus();
            swal("Error!!!", "Please enter the Account Head Name.", "error");
            return;
        }

        /* temp variable */
        var accountHeadId = 0;
        var accountHeadName = null;

        accountHeadId = parseInt(DOM.accountHeadName.getAttribute('data-account-head-id'));
        accountHeadName = DOM.accountHeadName.value;

        if (isNaN(accountHeadId)) { accountHeadId = 0; }

        var accountHead = {};

            accountHead = {
                AccountHeadId: accountHeadId,
                AccountHeadName: accountHeadName
            };

        if (parseInt(accountHeadId) === parseInt(0)) {

            accountHead.CreatedBy = parseInt(LOGGED_USER);
            accountHead.CreatedByIP = IP_ADDRESS;            
        }
        else {
            accountHead.ModifiedBy = parseInt(LOGGED_USER);
            accountHead.ModifiedByIP = IP_ADDRESS;            
        }

        var postData = JSON.stringify(accountHead);

        shared.sendRequest(SERVICE_PATH + "SaveAccountHead", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Successfully.",
                        type: "success"
                    }, function () {
                        getAccountHeads();
                    });
                }
            }
            else {
                swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
            }
        });

    }

    function getAccountHeads() {

        shared.showLoader(DOM.loader);

        DOM.accountHeadList.tBodies[0].innerHTML = "";

        AccountHeads.length = 0;

        shared.sendRequest(SERVICE_PATH + "SearchAllAccountHeads", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        AccountHeads = _response;

                        bindAccountHead();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }

    function bindAccountHead() {

        shared.showLoader(DOM.loader);

        DOM.accountHeadList.tBodies[0].innerHTML = "";
        
        if (AccountHeads.length > 0) {

            var data = "";

            for (var r = 0; r < AccountHeads.length; r++) {

                data += "<tr data-account-head-id=" + AccountHeads[r].AccountHeadId + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + AccountHeads[r].AccountHeadId + "' class='label-checkbox' name='SelectAccountHead' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + AccountHeads[r].AccountHeadName + "</td>";
                data += '</tr>';
            }

            DOM.accountHeadList.tBodies[0].innerHTML = data;            
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.accountHeadList.focus();

        shared.hideLoader(DOM.loader);
    }
    
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        addNewAccountHead();
    }

    return {
        init: init
    };

}());


Sofarch.AccountHead.init();
