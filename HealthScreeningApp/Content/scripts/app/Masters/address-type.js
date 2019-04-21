
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var _shared = require('./shared/default');





var SharpiTech = {};

SharpiTech.AddressType = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var addressTypes = [];

    /* ---- private method ---- */
    //cache DOM elements
    function _cacheDOM() {

        DOM.loader = document.getElementById('Loader');
        DOM.editMode = document.getElementById('EditMode');
        DOM.addressTypeName = document.getElementById('AddressType');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.showAddressTypeList = document.getElementById('ShowAddressTypeList');

        DOM.addNewAddressType = document.getElementById('AddNewAddressType');
        DOM.addressTypeList = document.getElementById('AddressTypeList');
        DOM.viewAddressType = document.getElementById('ViewAddressType');
        DOM.editAddressType = document.getElementById('EditAddressType');
        DOM.saveAddressType = document.getElementById('SaveAddressType');
        DOM.deleteAddressType = document.getElementById('DeleteAddressType');
        DOM.printAddressType = document.getElementById('PrintAddressType');

    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.addNewAddressType.addEventListener('click', addNewAddressType);
        DOM.showAddressTypeList.addEventListener('click', getAddressType);
        DOM.viewAddressType.addEventListener('click', viewAddressType);
        DOM.editAddressType.addEventListener('click', editAddressType);
        DOM.saveAddressType.addEventListener('click', saveAddressType);
        DOM.deleteAddressType.addEventListener('click', deleteAddressType);
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

    function addNewAddressType() {

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        DOM.addressTypeName.setAttribute('data-client-type-id', 0);

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        //set focus
        DOM.addressTypeName.focus();
    }

    function viewAddressType() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        var selectedRows = getSelectedRows(DOM.addressTypeList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {
                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var addressTypeId = parseInt(currentTableRow.getAttribute('data-client-type-id'));

                if (isNaN(addressTypeId)) { addressTypeId = 0; }

                showSelectedAddressType(addressTypeId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

        //set focus
            DOM.addressTypeName.focus();
    }

    function editAddressType() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        var selectedRows = getSelectedRows(DOM.addressTypeList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {
                swal('Warning', "Please select only one record to Edit the Records.", "warning");
                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var addressTypeId = parseInt(currentTableRow.getAttribute('data-client-type-id'));

                if (isNaN(addressTypeId)) { addressTypeId = 0; }

                showSelectedAddressType(addressTypeId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.addressTypeName.focus();
    }

    function showSelectedAddressType(addressTypeId) {

        if (addressTypes.length > 0) {

            for (var a = 0; a < addressTypes.length; a++) {

                if (addressTypes[a].AddressTypeId === addressTypeId) {

                    //assign text to input
                    DOM.addressTypeName.setAttribute('data-client-type-id', addressTypeId);

                    DOM.addressTypeName.value = addressTypes[a].AddressTypeName;
                }
            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.addressTypeName.focus();        
    }

    function deleteAddressType(currentTableRow) {

        var table = DOM.addressTypeList;

        var tableBody = table.tBodies[0];
        
        /* temp variable */
        var addressTypeId = currentTableRow.getAttribute('data-client-type-id');
        
        var addressType = {};

        addressType = {
            AddressTypeId: addressTypeId,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIP: IP_ADDRESS
        };

        var postData = JSON.stringify(addressType);
        
        shared.sendRequest(SERVICE_PATH + 'DeleteAddressType', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }
    
    function saveAddressType() {

        shared.showLoader(DOM.loader);

        if (DOM.addressTypeName.value === "") {
            swal("Error!!!", "Please enter the AddressType.", "error");
            return;
        }

        var addressTypeId = DOM.addressTypeName.getAttribute('data-client-type-id');
        var addressTypeName = DOM.addressTypeName.value;
        
        var addressType = {};

            addressType = {
                AddressTypeId: addressTypeId,
                AddressTypeName: addressTypeName
            };

        if (parseInt(addressTypeId) === parseInt(0)) {

            addressType.CreatedBy = parseInt(LOGGED_USER);
            addressType.CreatedByIP = IP_ADDRESS;            
        }
        else {
            addressType.ModifiedBy = parseInt(LOGGED_USER);
            addressType.ModifiedByIP = IP_ADDRESS;            
        }

        var postData = JSON.stringify(addressType);

        shared.sendRequest(SERVICE_PATH + "SaveAddressType", "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                            title: "Success",
                            text: "Records Saved Successfully.",
                            type: "success"
                        }, function () {
                            getAddressType();
                        });
                }
            }            
        });

        shared.hideLoader(DOM.loader);

    }

    function getAddressType() {

        shared.showLoader(DOM.loader);

        addressTypes.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllAddressTypes", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        for (var r = 0; r < _response.length; r++) {

                            var addressType = {};

                            addressType = {
                                AddressTypeId: _response[r].AddressTypeId,
                                AddressTypeName: _response[r].AddressTypeName,
                                SrNo: _response[r].SrNo
                            }

                            addressTypes.push(addressType);
                        }

                        bindAddressType();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });
    }

    function bindAddressType() {

        DOM.addressTypeList.tBodies[0].innerHTML = "";
        
        if (addressTypes.length > 0) {

            var data = "";

            for (var r = 0; r < addressTypes.length; r++) {

                data += "<tr data-client-type-id=" + addressTypes[r].AddressTypeId + ">";
                data += "<td><label class='cr-styled'> <input type='checkbox' id='" + addressTypes[r].AddressTypeId + "' name='SelectAddressType' /> <i class='fa'></i> </label>" + "</td>";
                data += "<td>" + addressTypes[r].SrNo + "</td>";
                data += "<td>" + addressTypes[r].AddressTypeName + "</td>";
                data += '</tr>'
            }

            DOM.addressTypeList.tBodies[0].innerHTML = data;            
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.addressTypeList.focus();

    }
    
    /* ---- public methods ---- */
    function init() {
        _cacheDOM();
        bindEvents();
        getAddressType();
    }

    return {
        init: init
    };

}());


SharpiTech.AddressType.init();
