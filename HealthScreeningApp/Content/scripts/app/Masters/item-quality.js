
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var shared = require('./shared/default');





var SharpiTech = {};

SharpiTech.ItemQuality = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();
    var itemQualities = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.itemQualityList = document.getElementById('ItemQualityList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.itemQualityName = document.getElementById('ItemQuality');

        DOM.addNewItemQuality = document.getElementById('AddNewItemQuality');
        DOM.showItemQualityList = document.getElementById('ShowItemQualityList');
        DOM.viewItemQuality = document.getElementById('ViewItemQuality');
        DOM.editItemQuality = document.getElementById('EditItemQuality');
        DOM.deleteItemQuality = document.getElementById('DeleteItemQuality');
        DOM.saveItemQuality = document.getElementById('SaveItemQuality');           

    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.addNewItemQuality.addEventListener('click', addNewItemQuality);
        DOM.showItemQualityList.addEventListener('click', getItemQualities);
        DOM.viewItemQuality.addEventListener('click', viewItemQuality);
        DOM.editItemQuality.addEventListener('click', editItemQuality);
        DOM.deleteItemQuality.addEventListener('click', deleteItemQuality);
        DOM.saveItemQuality.addEventListener('click', saveItemQuality);
        
    }

    var getSelectedRows = function () {

        var selectedRows = [];

        var tableBody = DOM.itemQualityList.tBodies[0];

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
        
    function addNewItemQuality() {

        // Clear the input elements
        shared.clearInputs(DOM.editMode);
        shared.disableControls(DOM.editMode, false);

        DOM.itemQualityName.setAttribute('data-item-quality-id', 0);

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.itemQualityName.focus();
        
    }

    function viewItemQuality() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.disableControls(DOM.editMode, true);

            var selectedRows = getSelectedRows();

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");                    
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var itemQualityId = parseInt(currentTableRow.getAttribute('data-item-quality-id'));

                    if (isNaN(itemQualityId)) { itemQualityId = 0; }

                    showItemQuality(itemQualityId);
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

            shared.hideLoader(DOM.loader);
        }
    }

    /**
     * Edit item quality
     */
    function editItemQuality() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            
            shared.disableControls(DOM.editMode, false);
            
            var selectedRows = getSelectedRows();

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");                    
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var itemQualityId = parseInt(currentTableRow.getAttribute('data-item-quality-id'));

                    if (isNaN(itemQualityId)) { itemQualityId = 0; }

                    showItemQuality(itemQualityId);
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

            shared.hideLoader(DOM.loader);
        }

        // Focus
        DOM.itemQualityName.focus();
    }

    function deleteItemQuality() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.itemQualityList.tBodies[0];

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

                                var itemQuality = {};

                                itemQuality = {
                                    ItemQualityId: parseInt(selectedRows[r].getAttribute('data-item-quality-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS
                                };

                                var postData = JSON.stringify(itemQuality);

                                shared.sendRequest(SERVICE_PATH + 'SaveItemQuality', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {

                                            //tableBody.removeChild(selectedRows[r]);

                                            swal({
                                                title: "Success",
                                                text: "Item Quality saved successfully.",
                                                type: "success"
                                            }, function () {
                                                getItemQualities();
                                            });
                                        }
                                    }

                                    shared.hideLoader(DOM.loader);

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

            shared.hideLoader(DOM.loader);
        }

    }

    function getItemQualities() {

        itemQualities.length = 0;

        shared.showLoader(DOM.loader);

        try {

            shared.sendRequest(SERVICE_PATH + "GetAllItemQualities", "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var data = JSON.parse(response.responseText);

                        if (data !== undefined) {

                            if (data.length > 0) {

                                for (var r = 0; r < data.length; r++) {

                                    var itemQuality = {};

                                    itemQuality = {
                                        ItemQualityId: data[r].ItemQualityId,
                                        QualityName: data[r].QualityName,
                                        SrNo: data[r].SrNo,
                                    };

                                    itemQualities.push(itemQuality);


                                }
                            }
                        }

                        bindItemQuality()
                    }

                    shared.hideLoader(DOM.loader);
                }

                shared.hideLoader(DOM.loader);

            });

        }
        catch (e) {
            handleError("Error in application" + e.message);
        }
        finally {

            shared.hideLoader(DOM.loader);
        }
    }

    function bindItemQuality() {

        var tableBody = DOM.itemQualityList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the item quality details has values
        if (itemQualities.length) {

            var data = "";

            for (var r = 0; r < itemQualities.length; r++) {

                data = data + "<tr data-item-quality-id=" + itemQualities[r].ItemQualityId + " >";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + itemQualities[r].itemQualityId + "' class='label-checkbox' name='SelectItemQuality' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + itemQualities[r].SrNo + "</td>";
                data = data + "<td>" + itemQualities[r].QualityName + "</td>";                
                data = data + "</tr>";

            }

            tableBody.innerHTML = data;

            // Show panels
            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);

        }
    }
    
    function showItemQuality(itemQualityId) {
        
        if (itemQualityId > 0) {

            // Check the item qualities list has values
            if (itemQualities.length) {

                var itemQuality = itemQualities.filter(function (value, index, array) {
                    return value.ItemQualityId === parseInt(itemQualityId);
                });

                if (itemQuality.length) {

                    DOM.itemQualityName.value = itemQuality[0].QualityName;
                    DOM.itemQualityName.setAttribute('data-item-quality-id', itemQuality[0].ItemQualityId);

                }

                // Show panels
                shared.showPanel(DOM.editMode);
                shared.hidePanel(DOM.viewMode);
                
            }
        }
    }

    function saveItemQuality() {

        itemQualities.length = 0;

        if (DOM.itemQualityName.value === "") {
            swal("Error!!!", "Please enter the Item Quality.", "error");
            return;
        }

        var itemQualityId = parseInt(0);
        var itemQualityName = "";

        itemQualityId = DOM.itemQualityName.getAttribute('data-item-quality-id');
        itemQualityName =  DOM.itemQualityName.value;
        
        var itemQuality = {};

            itemQuality = {
                ItemQualityId: itemQualityId,
                QualityName: itemQualityName
            };

            if (parseInt(itemQualityId) === parseInt(0)) {

                itemQuality.CreatedBy = LOGGED_USER;
                itemQuality.CreatedByIP = IP_ADDRESS;
            }
            else {

                itemQuality.ModifiedBy = LOGGED_USER;
                itemQuality.ModifiedByIP = IP_ADDRESS;
            }

        var postData = JSON.stringify(itemQuality);

        shared.sendRequest(SERVICE_PATH + "SaveItemQuality", "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Item Quality Details saved successfully.",
                        type: "success"
                    }, function () {
                        getItemQualities();
                    });
                }
            }            
        });
    }

    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        getItemQualities();
    }

    return {
        init: init
    };

}());


SharpiTech.ItemQuality.init();
