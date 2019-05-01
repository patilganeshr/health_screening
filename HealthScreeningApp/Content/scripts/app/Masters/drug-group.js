
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var _shared = require('./shared/default');





var Sofarch = {};

Sofarch.DrugGroup = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var DrugGroups = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.drugGroupList = document.getElementById('DrugGroupList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.groupName = document.getElementById('GroupName');

        DOM.addNewDrugGroup = document.getElementById('AddNewDrugGroup');
        DOM.showDrugGroupList = document.getElementById('ShowDrugGroupList');
        DOM.viewDrugGroup = document.getElementById('ViewDrugGroup');
        DOM.editDrugGroup = document.getElementById('EditDrugGroup');
        DOM.saveDrugGroup = document.getElementById('SaveDrugGroup');
        DOM.deleteDrugGroup = document.getElementById('DeleteDrugGroup');

    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.addNewDrugGroup.addEventListener('click', addNewDrugGroup);
        DOM.showDrugGroupList.addEventListener('click', getDrugGroups);
        DOM.viewDrugGroup.addEventListener('click', viewDrugGroup);
        DOM.editDrugGroup.addEventListener('click', editDrugGroup);
        DOM.saveDrugGroup.addEventListener('click', saveDrugGroup);
        DOM.deleteDrugGroup.addEventListener('click', deleteDrugGroup);
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
    
    function addNewDrugGroup() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.groupName.setAttribute('data-drug-group-id', 0);
                
        //set focus
        DOM.groupName.focus();

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);
    }

    function getSelectedDrugGroupDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.drugGroupList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var drugGroupId = parseInt(currentTableRow.getAttribute('data-drug-group-id'));

                if (isNaN(drugGroupId)) { drugGroupId = 0; }

                showDrugGroupDetailsById(drugGroupId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

    }

    function viewDrugGroup() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedDrugGroupDetails();

        DOM.groupName.focus();

    }

    function editDrugGroup() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);
                
        getSelectedDrugGroupDetails();

        //set focus
        DOM.groupName.focus();

    }

    function deleteDrugGroup() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.drugGroupList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.drugGroupList);

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

                                var drugGroup = {
                                    DrugGroupId: parseInt(selectedRows[r].getAttribute('data-drug-group-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS
                                };

                                var postData = JSON.stringify(drugGroup);

                                shared.sendRequest(SERVICE_PATH + 'SaveDrugGroup', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {
                                            swal({
                                                title: "Success",
                                                text: "Drug Group deleted successfully.",
                                                type: "success"
                                            }, function () {
                                                addNewDrugGroup();
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

    function showDrugGroupDetailsById(drugGroupId) {

        if (DrugGroups.length) {

            var selectedDrugGroup = DrugGroups.filter(function (value, index, array) {
                return value.DrugGroupId === drugGroupId;
            });

            if (selectedDrugGroup.length) {

                //assign text to input
                DOM.groupName.setAttribute('data-drug-group-id', selectedDrugGroup[0].DrugGroupId);
                DOM.groupName.value = selectedDrugGroup[0].GroupName;

            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.groupName.focus();
    }

    function saveDrugGroup() {

        if (DOM.groupName.value === "") {
            DOM.groupName.focus();
            swal("Error!!!", "Please enter the Group Name.", "error");
            return;
        }

        /* temp variable */
        var drugGroupId = 0;
        var groupName = null;

        drugGroupId = parseInt(DOM.groupName.getAttribute('data-drug-group-id'));
        groupName = DOM.groupName.value;

        if (isNaN(drugGroupId)) { drugGroupId = 0; }

        var drugGroup = {};

            drugGroup = {
                DrugGroupId: drugGroupId,
                GroupName: groupName
            };

        if (parseInt(drugGroupId) === parseInt(0)) {

            drugGroup.CreatedBy = parseInt(LOGGED_USER);
            drugGroup.CreatedByIP = IP_ADDRESS;            
        }
        else {
            drugGroup.ModifiedBy = parseInt(LOGGED_USER);
            drugGroup.ModifiedByIP = IP_ADDRESS;            
        }

        var postData = JSON.stringify(drugGroup);

        shared.sendRequest(SERVICE_PATH + "SaveDrugGroup", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Successfully.",
                        type: "success"
                    }, function () {
                        getDrugGroups();
                    });
                }
            }
            else {
                swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
            }
        });

    }

    function getDrugGroups() {

        shared.showLoader(DOM.loader);

        DOM.drugGroupList.tBodies[0].innerHTML = "";

        DrugGroups.length = 0;

        shared.sendRequest(SERVICE_PATH + "SearchAllDrugGroups", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        DrugGroups = _response;

                        bindDrugGroup();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }

    function bindDrugGroup() {

        shared.showLoader(DOM.loader);

        DOM.drugGroupList.tBodies[0].innerHTML = "";
        
        if (DrugGroups.length > 0) {

            var data = "";

            for (var r = 0; r < DrugGroups.length; r++) {

                data += "<tr data-drug-group-id=" + DrugGroups[r].DrugGroupId + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + DrugGroups[r].DrugGroupId + "' class='label-checkbox' name='SelectDrugGroup' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + DrugGroups[r].GroupName + "</td>";
                data += '</tr>';
            }

            DOM.drugGroupList.tBodies[0].innerHTML = data;            
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.drugGroupList.focus();

        shared.hideLoader(DOM.loader);
    }
    
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        addNewDrugGroup();
    }

    return {
        init: init
    };

}());


Sofarch.DrugGroup.init();
