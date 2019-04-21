
var SharpiTech = {};

SharpiTech.Charge = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    var _charges = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.editMode = document.getElementById('EditMode');
        DOM.loader = document.getElementById('Loader');
        DOM.addNew = document.getElementById('AddNew');
        DOM.showList = document.getElementById('ShowList');        
        DOM.view = document.getElementById('View');
        DOM.edit = document.getElementById('Edit');
        DOM.save = document.getElementById('Save');
        DOM.delete = document.getElementById('Delete');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.chargeName = document.getElementById('ChargeName');
        DOM.chargeDesc = document.getElementById('ChargeDesc');
        DOM.gstCategory = document.getElementById('GSTCategory');
        DOM.chargesList = document.getElementById('ChargesList');

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
    }

    function bindEvents() {

        DOM.addNew.addEventListener('click', addNewCharge);
        DOM.showList.addEventListener('click', showCharges);
        DOM.view.addEventListener('click', viewCharge);
        DOM.edit.addEventListener('click', editCharge);
        DOM.save.addEventListener('click', saveCharge);
        DOM.delete.addEventListener('click', deleteCharge);

        DOM.chargeName.addEventListener('blur', setChargeDesc);
    }

    function loadData() {
        
        getGSTCategories();

        getCharges();
    }

    function getGSTCategories() {

        _shared.showLoader(DOM.loader);

        DOM.gstCategory.options.length = 0;
        
        //var dataAttributes = 'gst_category_id|tin_no';

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllGSTCategories', DOM.gstCategory, "GSTCategoryName", "GSTCategoryId", "Choose GST Category", function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

            _shared.hideLoader(DOM.loader);

        });
    }

    function setChargeDesc() {

        if (DOM.chargeName.value !== "") {

            DOM.chargeDesc.value = DOM.chargeName.value;
        }

    }
    function addNewCharge() {

        _shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        _shared.clearInputs(DOM.editMode);

        _charges = [];

        DOM.chargesList.tBodies[0].innerHTML = "";

        DOM.chargeName.setAttribute('data-charge-id', 0);

        //show edit panel
        _shared.showPanel(DOM.editMode);
        _shared.hidePanel(DOM.viewMode);

        //set focus
        DOM.chargeName.focus();

        _shared.hideLoader(DOM.loader);

    }

    function showCharges() {

        getCharges();
    }

    function filterCharges() {

    }

    var getSelectedRows = function() {

        var selectedRows = [];

        var tableBody = DOM.chargesList.tBodies[0];

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

    function bindChargeDetails(currentTableRow) {

        var chargeId = parseInt(currentTableRow.getAttribute('data-charge-id'));

        if (chargeId > 0) {

            // Check the _charges list has values
            if (_charges.length > 0) {

                var charges = _charges.filter(function (value, index, array) {
                    return value.ChargeId === parseInt(chargeId);
                });

                if (charges.length > 0) {

                    DOM.chargeName.value = charges[0].ChargeName;
                    DOM.chargeName.setAttribute('data-charge-id', charges[0].ChargeId);
                    DOM.chargeDesc.value = charges[0].ChargeDesc;
                    _shared.setSelectValue(DOM.gstCategory, null, parseInt(charges[0].GSTCategoryId));
                    _shared.setSelect2ControlsText(DOM.gstCategory);

                }

                // Show panels
                _shared.showPanel(DOM.editMode);
                _shared.hidePanel(DOM.viewMode);
            }
        }
    }

    function viewCharge() {
        
        _shared.showLoader(DOM.loader);

        try {

            _shared.clearInputs(DOM.editMode);
            _shared.clearSelect(DOM.editMode);
            _shared.disableControls(DOM.editMode, true);

            var selectedRows = getSelectedRows();

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    bindChargeDetails(currentTableRow);
                }
            }
            else {
                swal("error", "No row selected.", "error");
            }
        }
        catch (e) {
            handleError(e.message);
        }
        finally {

            _shared.hideLoader(DOM.loader);
        }
    }

    function editCharge() {

        _shared.showLoader(DOM.loader);

        try {

            _shared.clearInputs(DOM.editMode);
            _shared.clearSelect(DOM.editMode);
            _shared.disableControls(DOM.editMode, false);

            var selectedRows = getSelectedRows();

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    bindChargeDetails(currentTableRow);
                }
            }
            else {
                swal("error", "No row selected.", "error");
            }
        }
        catch (e) {
            handleError(e.message);
        }
        finally {

            _shared.hideLoader(DOM.loader);
        }

        // Focus
        DOM.chargeName.focus();
    }

    function deleteCharge() {

        _shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.chargesList.tBodies[0];

            var selectedRows = getSelectedRows();

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

                                var charge = {};

                                charge = {
                                    ChargeId: parseInt(selectedRows[r].getAttribute('data-charge-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS
                                };

                                var postData = JSON.stringify(charge);

                                _shared.sendRequest(SERVICE_PATH + 'SaveCharge', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {

                                            //tableBody.removeChild(selectedRows[r]);

                                            swal({
                                                title: "Success",
                                                text: "Charge deleted successfully.",
                                                type: "success"
                                            }, function () {
                                                getCharges();
                                            });
                                        }
                                    }

                                    _shared.hideLoader(DOM.loader);

                                });
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

            _shared.hideLoader(DOM.loader);
        }
        
    }

    var validateData = function() {

        var isValid = true;

        if (DOM.chargeName.value === "") {
            DOM.chargeName.focus();
            swal("Error!!!", "Please enter the Charge Name.", "error");
            isValid = false;
        }
        else if (DOM.gstCategory.selectedIndex === 0) {
            DOM.gstCategory.focus();
            swal("Error!!!", "Please select the GST Category Name.", "error");
            isValid = false;
        }

        return isValid;
    }

    function saveCharge() {

        _shared.showLoader(DOM.loader);

        try {

            if (validateData()) {
                
                var chargeId = parseInt(0);
                var chargeName = null;
                var chargeDesc = null;
                var gstCategoryId = parseInt(0);
                var gstCategoryName = null;

                chargeId = parseInt(DOM.chargeName.getAttribute('data-charge-id'));
                chargeName = DOM.chargeName.value;
                chargeDesc = DOM.chargeDesc.value;
                gstCategoryId = parseInt(DOM.gstCategory.options[DOM.gstCategory.selectedIndex].value);
                gstCategoryName = DOM.gstCategory.options[DOM.gstCategory.selectedIndex].text;

                if (isNaN(chargeId)) { chargeId = parseInt(0); }

                var charge = {};

                charge = {
                    ChargeId: chargeId,
                    ChargeName: chargeName,
                    ChargeDesc: chargeDesc,
                    GSTCategoryId: gstCategoryId
                };

                if (parseInt(chargeId) === parseInt(0)) {

                    charge.CreatedBy = parseInt(LOGGED_USER);
                    charge.CreatedByIP = IP_ADDRESS;
                }
                else {

                    charge.ModifiedBy = parseInt(LOGGED_USER);
                    charge.ModifiedByIP = IP_ADDRESS;
                }

                var postData = JSON.stringify(charge);

                _shared.sendRequest(SERVICE_PATH + "SaveCharge", "POST", true, "JSON", postData, function (response) {

                    var _response = JSON.parse(response.responseText);

                    if (response.status === 200) {
                        if (parseInt(response.responseText) > parseInt(0)) {
                            swal({
                                title: "Success",
                                text: "Records Saved Succesfully.",
                                type: "success"
                            }, function () {
                                getCharges();
                            });
                        }
                    }
                    else {
                        swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
                    }

                });
            }
        }
        catch (e) {
            handleError("Error in application" + e.message);
        }
        finally {

            _shared.hideLoader(DOM.loader);
        }

    }

    function getCharges() {

        _shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.chargesList.tBodies[0];

            tableBody.innerHTML = "";
                        
            _shared.sendRequest(SERVICE_PATH + "GetAllCharges", "GET", true, "JSON", null, function (response) {

                _shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var _response = JSON.parse(response.responseText);

                        if (_response !== undefined) {

                            if (_response.length > 0) {

                                _charges = [];
                                
                                for (var r = 0; r < _response.length; r++) {

                                    var charge = {};

                                    charge = {
                                        ChargeId: _response[r].ChargeId,
                                        ChargeName: _response[r].ChargeName,
                                        ChargeDesc: _response[r].ChargeDesc,
                                        GSTCategoryName: _response[r].GSTCategoryName,
                                        GSTCategoryId: _response[r].GSTCategoryId,
                                        SrNo: _response[r].SrNo,
                                    };

                                    _charges.push(charge);

                                    var currentRow = document.createElement('TR');

                                    var data;
                                    
                                    data = "<td><label class='label-tick'> <input type='checkbox' id='" + _response[r].ChargeId + "' class='label-checkbox' name='SelectCharge' /> <span class='label-text'></span> </label>" + "</td>";
                                    data = data + "<td>" + _response[r].SrNo + "</td>";
                                    data = data + "<td>" + _response[r].ChargeName + "</td>";
                                    data = data + "<td>" + _response[r].ChargeDesc + "</td>";
                                    data = data + "<td>" + _response[r].GSTCategoryName + "</td>";
                                    
                                    currentRow.setAttribute('data-charge-id', _response[r].ChargeId);
                                    currentRow.innerHTML = data;

                                    tableBody.appendChild(currentRow);
                                }

                                _shared.showPanel(DOM.viewMode);
                                _shared.hidePanel(DOM.editMode);
                            }
                            else {
                                _shared.showPanel(DOM.editMode);
                                _shared.hidePanel(DOM.viewMode);
                            }
                        }
                        else {
                            _shared.showPanel(DOM.viewMode);
                            _shared.hidePanel(DOM.editMode);
                        }
                    }

                    _shared.hideLoader(DOM.loader);
                }

                _shared.hideLoader(DOM.loader);

            });

        }
        catch (e) {
            handleError("Error in application" + e.message);
        }
        finally {

            _shared.hideLoader(DOM.loader);
        }
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


SharpiTech.Charge.init();
