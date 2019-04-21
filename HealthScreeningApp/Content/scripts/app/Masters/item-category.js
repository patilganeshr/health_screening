
var SharpiTech = {};

SharpiTech.ItemCategory = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var itemCategories = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.itemCategoriesList = document.getElementById('ItemCategoriesList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.itemCategoryName = document.getElementById('ItemCategoryName');
        DOM.itemCategoryDesc = document.getElementById('ItemCategoryDesc');
        DOM.gstCategory = document.getElementById('GSTCategory');

        DOM.addNewItemCategory = document.getElementById('AddNewItemCategory');
        DOM.showItemCategorysList = document.getElementById('ShowItemCategoryList');
        DOM.viewItemCategory = document.getElementById('ViewItemCategory');
        DOM.editItemCategory = document.getElementById('EditItemCategory');
        DOM.deleteItemCategory = document.getElementById('DeleteItemCategory');
        DOM.saveItemCategory = document.getElementById('SaveItemCategory');
        DOM.filterItemCategory = document.getElementById('FilterItemCategory');

    }

    function applyPlugins() {

        $('select').select2();
    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    $("select").on("change", function (event) {

        setFocusOnSelect(event);

    });


    function bindEvents() {

        DOM.addNewItemCategory.addEventListener('click', addNewItemCategory);
        DOM.showItemCategorysList.addEventListener('click', getItemCategories);
        DOM.viewItemCategory.addEventListener('click', viewItemCategory);
        DOM.editItemCategory.addEventListener('click', editItemCategory);
        DOM.deleteItemCategory.addEventListener('click', deleteItemCategory);
        DOM.saveItemCategory.addEventListener('click', saveItemCategory);

        DOM.itemCategoryName.onblur = function () {
            setItemCategoryDesc();
        }

    }

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    function setItemCategoryDesc() {

        if (DOM.itemCategoryName.value !== "") {
            DOM.itemCategoryDesc.value = DOM.itemCategoryName.value;
        }

        DOM.gstCategory.focus();
    }

    function loadData() {

        getGSTCategories();

        getItemCategories();
    }

    function getGSTCategories() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllGSTCategories', DOM.gstCategory, "GSTCategoryName", "GSTCategoryId", "Choose GST Category", function (response) {

            if (response.status !== 200) {
                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);

        });

    }

    var getSelectedRows = function() {

        var selectedRows = [];

        var tableBody = DOM.itemCategoriesList.tBodies[0];

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
    
    function addNewItemCategory() {

        // Clear the inputs
        shared.clearInputs(DOM.editMode);
        shared.disableControls(DOM.editMode, false);

        DOM.itemCategoryName.setAttribute('data-item-category-id', 0);

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.itemCategoryName.focus();
    }

    function viewItemCategory() {
        
        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);
            shared.disableControls(DOM.editMode, true);

            var selectedRows = getSelectedRows();

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    shared.hideLoader(DOM.loader);
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var itemCategoryId = parseInt(currentTableRow.getAttribute('data-item-category-id'));

                    if (isNaN(itemCategoryId)) { itemCategoryId = 0; }

                    showItemCategoryDetails(itemCategoryId);
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

    function editItemCategory() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);
            shared.disableControls(DOM.editMode, false);
            
            var selectedRows = getSelectedRows();

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                    shared.hideLoader(DOM.loader);
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var itemCategoryId = parseInt(currentTableRow.getAttribute('data-item-category-id'));

                    if (isNaN(itemCategoryId)) { itemCategoryId = 0; }

                    showItemCategoryDetails(itemCategoryId);
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
        DOM.itemCategoryName.focus();
    }

    function deleteItemCategory() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.itemCategoriesList.tBodies[0];

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

                                var itemCategory = {};

                                itemCategory = {
                                    ItemCategoryId: parseInt(selectedRows[r].getAttribute('data-item-category-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS
                                };

                                var postData = JSON.stringify(itemCategory);

                                shared.sendRequest(SERVICE_PATH + 'SaveItemCategory', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {

                                            //tableBody.removeChild(selectedRows[r]);

                                            swal({
                                                title: "Success",
                                                text: "Item Category Details saved successfully.",
                                                type: "success"
                                            }, function () {
                                                getItemCategories();
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

    function getItemCategories() {

        itemCategories.length = 0;

        shared.showLoader(DOM.loader);

        try {

            shared.sendRequest(SERVICE_PATH + "GetAllItemCategories", "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var data = JSON.parse(response.responseText);

                        if (data !== undefined) {

                            if (data.length) {

                                for (var r = 0; r < data.length; r++) {

                                    var itemCategory = {};

                                    itemCategory = {
                                        ItemCategoryId: data[r].ItemCategoryId,
                                        ItemCategoryName: data[r].ItemCategoryName,
                                        ItemCategoryDesc: data[r].ItemCategoryDesc,
                                        GSTCategoryName: data[r].GSTCategoryName,
                                        GSTCategoryId: data[r].GSTCategoryId,
                                        SrNo: data[r].SrNo,
                                    };

                                    itemCategories.push(itemCategory);
                                    
                                    
                                }
                            }
                        }

                        bindItemCategories()
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

    function bindItemCategories() {

        var tableBody = DOM.itemCategoriesList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the inward details has values
        if (itemCategories.length > 0) {

            var data = "";

            for (var r = 0; r < itemCategories.length; r++) {

                data = data + "<tr data-item-category-id=" + itemCategories[r].ItemCategoryId + " >";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + itemCategories[r].ItemCategoryId + "' class='label-checkbox' name='SelectItemCategory' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + itemCategories[r].SrNo + "</td>";
                data = data + "<td>" + itemCategories[r].ItemCategoryName + "</td>";
                data = data + "<td>" + itemCategories[r].ItemCategoryDesc + "</td>";
                data = data + "<td>" + itemCategories[r].GSTCategoryName + "</td>";
                data = data + "</tr>";

            }

            tableBody.innerHTML = data;

            // Show panels
            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);

        }
    }

    function showItemCategoryDetails(itemCategoryId) {
        
        if (itemCategoryId > 0) {

            if (itemCategories.length) {

                var itemCategory = itemCategories.filter(function (value, index, array) {
                    return value.ItemCategoryId === parseInt(itemCategoryId);                    
                });

                if (itemCategory.length > 0) {

                    DOM.itemCategoryName.value = itemCategory[0].ItemCategoryName;
                    DOM.itemCategoryDesc.value = itemCategory[0].ItemCategoryDesc;
                    shared.setSelectValue(DOM.gstCategory, null, itemCategory[0].GSTCategoryId);
                    shared.setSelect2ControlsText(DOM.gstCategory);                    
                }

                // Show panels
                shared.showPanel(DOM.editMode);
                shared.hidePanel(DOM.viewMode);

            }
        }
    }

    function validateData() {

        var isValid = true;

        if (DOM.itemCategoryName.value === "") {
            isValid = false;
            swal("Error!!!", "Please enter the Item Category Name.", "error");
        }
        else if (DOM.gstCategory.selectedIndex === -1) {
            isValid = false;
            swal("Error!!!", "Please select the GST Category.", "error");
        }

        return isValid;
    }

    function saveItemCategory() {

        itemCategories.length = 0;

        if (validateData()) {

            var itemCateogry = {};

            /* temp variable */
            var itemCategoryId = parseInt(DOM.itemCategoryName.getAttribute('data-item-category-id'));
            var itemCategoryName = DOM.itemCategoryName.value;
            var itemCategoryDesc = DOM.itemCategoryDesc.value;
            var gstCategorySelectedIndex = DOM.gstCategory.selectedIndex;
            var gstCategoryId = parseInt(DOM.gstCategory.options[gstCategorySelectedIndex].value);
            var gstCategoryName = DOM.gstCategory.options[gstCategorySelectedIndex].text;

            if (isNaN(gstCategoryId)) {
                gstCategoryId = parseInt(0);
            }

            itemCateogry = {
                ItemCategoryId: itemCategoryId,
                ItemCategoryName: itemCategoryName,
                ItemCategoryDesc: itemCategoryDesc,
                GSTCategoryId: gstCategoryId
            };

            if (parseInt(itemCategoryId) === parseInt(0)) {

                itemCateogry.CreatedBy = parseInt(LOGGED_USER);
                itemCateogry.CreatedByIp = IP_ADDRESS;
                itemCateogry.ModifiedBy = parseInt(0);
                itemCateogry.ModifiedByIp = "";
            }
            else {
                itemCateogry.CreatedBy = parseInt(0);
                itemCateogry.CreatedByIp = "";
                itemCateogry.ModifiedBy = parseInt(LOGGED_USER);
                itemCateogry.ModifiedByIp = IP_ADDRESS;
            }

            var postData = JSON.stringify(itemCateogry);

            shared.sendRequest(SERVICE_PATH + "SaveItemCategory", "POST", true, "JSON", postData, function (response) {
                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Item Categories saved successfully.",
                            type: "success"
                        }, function () {
                            getGSTCategories();
                        });
                    }
                }
            });
        }
    }

    
    //function getItemCategories() {

    //    DOM.showItemCategories.tBodies[0].innerHTML = "";

    //    shared.sendRequest(SERVICE_PATH + "GetAllItemCategories", "GET", true, "JSON", null, function (response) {

    //        if (response.status === 200) {

    //            if (response.responseText !== undefined) {

    //                var _response = JSON.parse(response.responseText);

    //                itemCategories = _response;

    //                if (_response !== undefined) {

    //                    if (_response.length > 0) {

    //                        var _table = DOM.showItemCategories;

    //                        var _tableBody = _table.tBodies[0];

    //                        for (var r = 0; r < _response.length; r++) {

    //                            var _currentRow = document.createElement('TR');

    //                            var _data;

    //                            _data = "<tr><td>" + _response[r].SrNo + "</td>";
    //                            _data += "<td>" + _response[r].ItemCategoryName + "</td>";
    //                            _data += "<td>" + _response[r].ItemCategoryDesc + "</td>";
    //                            _data += "<td>" + _response[r].GSTCategoryName + "</td>";
    //                            _data += "<td class='text-center'>" +
    //                                "<a href='#' class='btn btn-info btn-xs' data-name='view'> <i class='fa fa-eye' data-name='view'> </i> </a> " +
    //                                "<a href='#' class='btn btn-info btn-xs' data-name='edit'> <i class='fa fa-pencil' data-name='edit'> </i> </a> " +
    //                                "<a href='#' class='btn btn-danger btn-xs' data-name='delete'> <i class='fa fa-remove' data-name='delete'> </i> </a> </td></tr>";

    //                            _currentRow.setAttribute('data-item-category-id', parseInt(_response[r].ItemCategoryId));
    //                            _currentRow.setAttribute('data-gst-category-id', parseInt(_response[r].GSTCategoryId));
    //                            _currentRow.innerHTML = _data;

    //                            _tableBody.appendChild(_currentRow);
    //                        }
    //                    }
    //                }
    //            }
    //        }
    //    });
    //}
    
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


SharpiTech.ItemCategory.init();
