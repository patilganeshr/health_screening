
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var _shared = require('./shared/default');





var SharpiTech = {};

SharpiTech.ClientType = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var clientTypes = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.clientTypeList = document.getElementById('ClientTypeList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.clientTypeName = document.getElementById('ClientType');

        DOM.addNewClientType = document.getElementById('AddNewClientType');
        DOM.showClientTypeList = document.getElementById('ShowClientTypeList');
        DOM.viewClientType = document.getElementById('ViewClientType');
        DOM.editClientType = document.getElementById('EditClientType');        
        DOM.saveClientType = document.getElementById('SaveClientType');
        DOM.deleteClientType = document.getElementById('DeleteClientType');
        DOM.printClientType = document.getElementById('PrintClientType');
        
    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.addNewClientType.addEventListener('click', addNewClientType);
        DOM.showClientTypeList.addEventListener('click', getClientTypes);
        DOM.viewClientType.addEventListener('click', viewClientType);
        DOM.editClientType.addEventListener('click', editClientType);
        DOM.saveClientType.addEventListener('click', saveClientType);
        DOM.deleteClientType.addEventListener('click', deleteClientType);
        
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
    }
    
    function addNewClientType() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.clientTypeName.setAttribute('data-client-type-id', 0);

        //set focus
        DOM.clientTypeName.focus();

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);
    }

    function viewClientType() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        var selectedRows = getSelectedRows(DOM.clientTypeList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {
                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var clientTypeId = parseInt(currentTableRow.getAttribute('data-client-type-id'));

                if (isNaN(clientTypeId)) { clientTypeId = 0; }

                showSelectedClientType(clientTypeId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.clientTypeName.focus();

    }

    function editClientType() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        var selectedRows = getSelectedRows(DOM.clientTypeList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {
                swal('Warning', "Please select only one record to Edit the Records.", "warning");
                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var clientTypeId = parseInt(currentTableRow.getAttribute('data-client-type-id'));

                if (isNaN(clientTypeId)) { clientTypeId = 0; }

                showSelectedClientType(clientTypeId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.clientTypeName.focus();

    }

    function deleteClientType(currentTableRow) {

        var table = DOM.clientTypeList;

        var tableBody = table.tBodies[0];
        
        /* temp variable */
        var clientTypeId = parseInt(currentTableRow.getAttribute('data-client-type-id'));

        if (isNaN(clientTypeId)) { clientTypeId = 0; }

        var clientType = {};

        clientType = {
            ClientTypeId: clientTypeId,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIP: IP_ADDRESS
        };

        var postData = JSON.stringify(clientType);
        
        shared.sendRequest(SERVICE_PATH + 'DeleteClientType', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });

    }

    function showSelectedClientType(clientTypeId) {

        if (clientTypes.length > 0) {

            for (var c = 0; c < clientTypes.length; c++) {

                if (clientTypes[c].ClientTypeId === clientTypeId) {

                    //assign text to input
                    DOM.clientTypeName.setAttribute('data-client-type-id', clientTypeId);

                    DOM.clientTypeName.value = clientTypes[c].ClientTypeName;
                }
            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.clientTypeName.focus();        
    }

    function saveClientType() {

        if (DOM.clientTypeName.value === "") {
            swal("Error!!!", "Please enter the ClientType.", "error");
            return;
        }

        /* temp variable */
        var clientTypeId = parseInt( DOM.clientTypeName.getAttribute('data-client-type-id'));

        var clientTypeName = DOM.clientTypeName.value;

        if (isNaN(clientTypeId)) { clientTypeId = 0; }

        var clientType = {};

            clientType = {
                ClientTypeId:  clientTypeId,
                ClientTypeName: clientTypeName
            };

        if (parseInt(clientTypeId) === parseInt(0)) {

            clientType.CreatedBy = parseInt(LOGGED_USER);
            clientType.CreatedByIP = IP_ADDRESS;
        }
        else {
            clientType.ModifiedBy = parseInt(LOGGED_USER);
            clientType.ModifiedByIP = IP_ADDRESS;            
        }

        var postData = JSON.stringify(clientType);

        shared.sendRequest(SERVICE_PATH + "SaveClientType", "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Successfully.",
                        type: "success"
                    }, function () {
                        getClientTypes();
                    });
                }
            }            
        });

    }

    function getClientTypes() {

        shared.showLoader(DOM.loader);

        DOM.clientTypeList.tBodies[0].innerHTML = "";

        clientTypes.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllClientTypes", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        for (var r = 0; r < _response.length; r++) {

                            var clientType = {};

                            clientType = {
                                ClientTypeId: _response[r].ClientTypeId,
                                ClientTypeName: _response[r].ClientTypeName,
                                SrNo: _response[r].SrNo
                            }

                            clientTypes.push(clientType);
                        }

                        bindClientType();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }

    function bindClientType() {

        shared.showLoader(DOM.loader);

        DOM.clientTypeList.tBodies[0].innerHTML = "";
        
        if (clientTypes.length > 0) {

            var data = "";

            for (var r = 0; r < clientTypes.length; r++) {

                data += "<tr data-client-type-id=" + clientTypes[r].ClientTypeId + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + clientTypes[r].ClientTypeId + "' class='label-checkbox' name='SelectClientType' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + clientTypes[r].SrNo + "</td>";
                data += "<td>" + clientTypes[r].ClientTypeName + "</td>";
                data += '</tr>'
            }

            DOM.clientTypeList.tBodies[0].innerHTML = data;            
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.clientTypeList.focus();

        shared.hideLoader(DOM.loader);
    }
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        getClientTypes();
    }

    return {
        init: init
    };

}());


SharpiTech.ClientType.init();
