
var SharpiTech = {};

SharpiTech.Item = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var items = [];
    var SETItems = [];
    var itemPictures = [];
    var itemRates = [];
    var customerCategoryRates = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.itemsList = document.getElementById('ItemsList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.brand = document.getElementById('Brand');
        DOM.itemCategory = document.getElementById('ItemCategory');
        DOM.autoGenerateItemCode = document.getElementsByName('AutoGenerateItemCode');
        DOM.itemCode = document.getElementById('ItemCode');
        DOM.itemName = document.getElementById('ItemName');
        DOM.itemDesc = document.getElementById('ItemDesc');
        DOM.itemQuality = document.getElementById('ItemQuality');
        DOM.unitsOfMeasurement = document.getElementById('UnitsOfMeasurement');
        DOM.hsnCode = document.getElementById('HSNCode');
        DOM.reOrderLevel = document.getElementById('ReOrderLevel');
        DOM.isSet = document.getElementsByName('IsSet');
        DOM.items = document.getElementById('Items');

        DOM.itemPictureUploader = document.getElementById('ItemPictureUploader');
        DOM.uploadedFiles = document.getElementById('UploadedFiles');

        DOM.addNewItem = document.getElementById('AddNewItem');
        DOM.showItemList = document.getElementById('ShowItemList');
        DOM.viewItem = document.getElementById('ViewItem');
        DOM.editItem = document.getElementById('EditItem');
        DOM.saveItem = document.getElementById('SaveItem');
        DOM.deleteItem = document.getElementById('DeleteItem');

        DOM.itemSetViewMode = document.getElementById('ItemSetViewMode');
        DOM.itemSetList = document.getElementById('ItemSetList');

        DOM.itemSetEditMode = document.getElementById('ItemSetEditMode');
        DOM.itemSetId = document.getElementById('ItemSetId');
        DOM.itemSetSrNo = document.getElementById('ItemSetSrNo');
        DOM.setItemName = document.getElementById('SetItemName');
        DOM.setItemNetQty = document.getElementById('SetItemNetQty');

        DOM.addNewSetItem = document.getElementById('AddNewSetItem');
        DOM.showSetItemList = document.getElementById('ShowSetItemList');
        DOM.editSetItem = document.getElementById('EditSetItem');
        DOM.saveSetItem = document.getElementById('SaveSetItem');
        DOM.saveAndAddNewSetItem = document.getElementById('SaveAndAddNewSetItem');
        DOM.deleteSetItem = document.getElementById('DeleteSetItem');

        DOM.addNewItemRate = document.getElementById('AddNewItemRate');
        DOM.showItemRateList = document.getElementById('ShowItemRateList');
        DOM.viewItemRate = document.getElementById('ViewItemRate');
        DOM.editItemRate = document.getElementById('EditItemRate');
        DOM.saveItemRate = document.getElementById('SaveItemRate');
        DOM.deleteItemRate = document.getElementById('DeleteItemRate');

        DOM.itemRateEditMode = document.getElementById('ItemRateEditMode');
        DOM.itemRateViewMode = document.getElementById('ItemRateViewMode');
        DOM.itemRateList = document.getElementById('ItemRateList');

        DOM.itemRateId = document.getElementById('ItemRateId');
        DOM.effectiveFromDate = document.getElementById('EffectiveFromDate');
        DOM.effectiveFromDatePicker = document.getElementById('EffectiveFromDatePicker');
        DOM.purchaseRate = document.getElementById('PurchaseRate');
        DOM.discount = document.getElementById('Discount');
        DOM.rateAfterDiscount = document.getElementById('RateAfterDiscount');
        DOM.goodsCost = document.getElementById('GoodsCost');
        DOM.gstRate = document.getElementById('GSTRate');
        DOM.gstAmount = document.getElementById('GSTAmount');
        DOM.transportCost = document.getElementById('TransportCost');
        DOM.labourCost = document.getElementById('LabourCost');
        DOM.totalItemRate = document.getElementById('TotalItemRate');
        DOM.isSellAtNetRate = document.getElementsByName('IsSellAtNetRate');
        DOM.sellAtNetRate = document.getElementById('SellAtNetRate');
        DOM.dontSellAtNetRate = document.getElementById('DontSellAtNetRate');
        DOM.customerCategoryRateList = document.getElementById('CustomerCategoryRateList');

        /* Jquery cache */
        DOM.$effectiveFromDatePicker = $('#EffectiveFromDatePicker');
    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        DOM.$effectiveFromDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

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

        DOM.addNewItem.addEventListener('click', addNewItem);
        DOM.showItemList.addEventListener('click', getItems);
        DOM.viewItem.addEventListener('click', viewItem);
        DOM.editItem.addEventListener('click', editItem);
        DOM.saveItem.addEventListener('click', saveItem);
        DOM.deleteItem.addEventListener('click', deleteItem);

        DOM.addNewSetItem.addEventListener('click', addNewSETItem);
        DOM.showSetItemList.addEventListener('click', showSETItemList);
        DOM.editSetItem.addEventListener('click', editSETItem);
        DOM.deleteSetItem.addEventListener('click', deleteSETItem)
        DOM.saveSetItem.addEventListener('click', saveSETItem);
        DOM.saveAndAddNewSetItem.addEventListener('click', saveAndAddNewSETItem);

        DOM.addNewItemRate.addEventListener('click', addNewItemRate);
        DOM.showItemRateList.addEventListener('click', getItemRates);
        DOM.viewItemRate.addEventListener('click', viewItemRate);
        DOM.editItemRate.addEventListener('click', editItemRate);
        DOM.saveItemRate.addEventListener('click', saveItemRate);
        DOM.deleteItemRate.addEventListener('click', deleteItemRate);

        DOM.itemName.onblur = function () {
            setItemDesc();
        }

        DOM.itemPictureUploader.onchange = function () {
            uploadFiles();
        }

        DOM.itemCategory.onchange = function () {
            setHSNCode();
        }


        DOM.isSet[0].onclick = function () {
            viewItemSetDetails();
        }

        DOM.isSet[1].onclick = function () {
            viewItemSetDetails();
        }

        DOM.purchaseRate.onkeydown = function validate(e) {
            return shared.acceptDecimalNos(e);
        };

        DOM.transportCost.onkeydown = function validate(e) {
            return shared.acceptDecimalNos(e);
        }

        DOM.labourCost.onkeydown = function validate(e) {
            return shared.acceptDecimalNos(e);
        }

        DOM.purchaseRate.onblur = function () {
            calculateTotalItemRate();
        }

        DOM.discount.onblur = function () {
            calculateTotalItemRate();
        }

        DOM.transportCost.onblur = function () {
            calculateTotalItemRate();
        }

        DOM.labourCost.onblur = function () {
            calculateTotalItemRate();
        }

    }


    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    function loadData() {

        shared.showLoader(DOM.loader);

        getBrands();
        getItemCategories();
        getItemQualities();
        getUnitsOfMeasurement();
        getSETItems();
        getItems();
        getCustomerCategories();
        //getItemRates();
    }

    function setItemDesc() {

        if (DOM.itemName.value !== "") {
            DOM.itemDesc.value = DOM.itemName.value;
        }

        DOM.itemQuality.focus();
    }

    function setHSNCode() {

        if (DOM.itemCategory.selectedIndex > 0) {
            DOM.hsnCode.value = DOM.itemCategory.options[DOM.itemCategory.selectedIndex].getAttribute("hsncode");
        }
    }

    function getBrands() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllBrands', DOM.brand, "BrandName", "BrandId", "Choose Brand", function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);

        });
    }

    function getItemCategories() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllItemCategories', DOM.itemCategory, "ItemCategoryName", "ItemCategoryId", "Choose Item Category", function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);

        });
    }

    function getItemQualities() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllItemQualities', DOM.itemQuality, "QualityName", "ItemQualityId", "Choose Item Category", function (response) {
            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);
        });
    }

    function getUnitsOfMeasurement() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllUnitsOfMeasurement', DOM.unitsOfMeasurement, "UnitCode", "UnitOfMeasurementId", "Choose Item Category", function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

        });
    }

    function getCustomerCategories() {

        shared.showLoader(DOM.loader);

        DOM.customerCategoryRateList.tBodies[0].innerHTML = "";

        customerCategoryRates.length = 0;

        var itemRateId = parseInt(DOM.itemRateId.value);

        if (isNaN(itemRateId)) { itemRateId = parseInt(0); }

        shared.sendRequest(SERVICE_PATH + "GetCustomerCategories", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            var table = DOM.customerCategoryRateList;

                            var tableBody = table.tBodies[0];

                            for (var r = 0; r < _response.length; r++) {

                                var tr = document.createElement('TR');

                                var srNo = document.createElement('TD');
                                srNo.textContent = _response[r].SrNo;

                                var customerCategoryName = document.createElement('TD');
                                customerCategoryName.textContent = _response[r].CustomerCategoryName;

                                var percentageRate = document.createElement('TD');

                                //var data;

                                var rateInPercent = document.createElement('input');
                                rateInPercent.setAttribute('type', 'text');
                                rateInPercent.setAttribute('class', 'form-control input-sm');
                                rateInPercent.setAttribute('name', 'RateInPercent');
                                rateInPercent.id = "RateInPercent" + _response[r].CustomerCategoryId;

                                rateInPercent.onkeydown = function (e) {
                                    return shared.acceptDecimalNos(e);
                                };

                                rateInPercent.onblur = function () {
                                    calculateCustomerCategoryRate(this);
                                };

                                percentageRate.appendChild(rateInPercent);

                                var flatRate = document.createElement('TD');

                                //var data;

                                var rateInFlat = document.createElement('input');
                                rateInFlat.setAttribute('type', 'text');
                                rateInFlat.setAttribute('class', 'form-control input-sm');
                                rateInFlat.setAttribute('name', 'RateInFlat');
                                rateInFlat.id = "RateInFlat" + _response[r].CustomerCategoryId;

                                rateInFlat.onkeydown = function (e) {
                                    return shared.acceptDecimalNos(e);
                                };

                                rateInFlat.onblur = function () {
                                    calculateCustomerCategoryRate(this);
                                };

                                flatRate.appendChild(rateInFlat);

                                tr.appendChild(srNo);
                                tr.appendChild(customerCategoryName);
                                tr.appendChild(percentageRate);
                                tr.appendChild(flatRate);

                                tr.setAttribute('data-customer-category-item-rate-id', parseInt(_response[r].CustomerCategoryItemRateId));
                                tr.setAttribute('data-customer-category-id', parseInt(_response[r].CustomerCategoryId));
                                tr.setAttribute('data-sr-no', parseInt(_response[r].SrNo));

                                tableBody.appendChild(tr);
                            }

                            //toggleModes("none", "block"); 
                        }
                    }
                }
            }
        });

        shared.hideLoader(DOM.loader);
    }

    function getGSTRate(rate, callback) {

        var gstRate = 0;

        var itemCategoryId = parseInt(DOM.itemCategory.options[DOM.itemCategory.selectedIndex].value);

        var gstr = {};

        gstr = {
            ItemCategoryId: itemCategoryId,
            GSTApplicable: 'SGST',
            Rate: rate,
            EffectiveFromDate: DOM.effectiveFromDate.value
        };

        var postData = JSON.stringify(gstr);

        shared.sendRequest(SERVICE_PATH + "GetGSTRateByItemCategoryIdGSTApplicablePurchaseRateAndEffectiveDate/", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response.Rate >= 0) {

                        gstRate = _response;

                        callback(gstRate);
                    }
                }
            }
        });
    }

    function calculateTotalItemRate() {

        var purchaseRate = parseFloat(0);
        var discount = null;
        var discountPercent = parseInt(0);
        var rateDifference = parseFloat(0);
        var discountAmount = parseFloat(0);
        var rateAfterDiscount = parseFloat(0);

        purchaseRate = parseFloat(parseFloat(DOM.purchaseRate.value).toFixed(0));

        if (DOM.discount.value !== "") {

            discount = DOM.discount.value;

            if (discount.indexOf('%') > 0) {

                discountPercent = shared.roundOff(discount.substring(0, discount.indexOf('%')), 2);
            }
            else {
                rateDifference = shared.roundOff(discount, 2);
            }
        }

        if (discountPercent > 0) {
            discountAmount = shared.roundOff(purchaseRate * (discountPercent / 100), 2);
        }
        else if (rateDifference > 0) {
            discountAmount = rateDifference;
        }

        rateAfterDiscount = purchaseRate - discountAmount;

        DOM.rateAfterDiscount.value = rateAfterDiscount;

        getGSTRate(rateAfterDiscount, function (response) {

            var gstRate = response.Rate;

            if (gstRate >= 0) {

                DOM.gstRate.setAttribute('data-gst-rate-id', parseInt(response.GSTRateId));
                DOM.gstRate.setAttribute('data-tax-id', parseInt(response.TaxId));

                DOM.gstRate.value = gstRate.toFixed(2);

                var gstExclAmount = parseFloat(0);
                var gstInclAmount = parseFloat(0);
                var isTaxInclusive = true;

                var transportCost = shared.roundOff(DOM.transportCost.value, 0);

                var labourCost = shared.roundOff(DOM.labourCost.value, 2);

                if (isNaN(purchaseRate)) { purchaseRate = parseFloat(0); }

                if (isNaN(transportCost)) { transportCost = parseFloat(0); }

                if (isNaN(labourCost)) { labourCost = parseFloat(0); }

                DOM.purchaseRate.value = purchaseRate;
                DOM.transportCost.value = transportCost;
                DOM.labourCost.value = labourCost;

                DOM.goodsCost.value = shared.roundOff(rateAfterDiscount + transportCost + labourCost, 0);

                //if (shared.isRadioButtonValueSelected(DOM.isTaxInclusive) === true) {
                if (isTaxInclusive === true) {

                    //    gstExclAmount = shared.roundOff(rateAfterDiscount * 100 / (gstRate + 100), 2);

                    //    DOM.goodsCost.value = gstExclAmount;

                    //    gstAmount = shared.roundOff(gstExclAmount * (gstRate / 100), 2);

                    //}
                    //else {

                    //DOM.amount.value = gstInclAmount;
                    //if (DOM.isTaxRoundOff[0].checked === false) {

                    var gstAmount = parseFloat(parseFloat(parseFloat(DOM.goodsCost.value) * (gstRate / 100)).toFixed(2));
                    //}
                    //else {
                    //    gstAmount = parseFloat(parseFloat(parseFloat(DOM.goodsCost.value) * (gstRate / 100)).toFixed(0));
                    //}
                }

                DOM.gstAmount.value = shared.roundOff(gstAmount, 2);

                DOM.totalItemRate.value = shared.roundOff(parseFloat(DOM.goodsCost.value) + parseFloat(DOM.gstAmount.value), 0);
            }
        });
    }

    function calculateCustomerCategoryRate(currentTarget) {

        //if (currentTarget.parentElement.nextSibling !== null) {
        var percentageAmount = parseFloat(0);

        if (currentTarget.value === "") { currentTarget.value = parseInt(0); }

        if (DOM.totalItemRate.value !== "") {

            if (currentTarget.name.indexOf('RateInPercent') === 0) {

                var nextElement = currentTarget.parentElement.parentElement.querySelectorAll('input')[1];

                nextElement.value = parseFloat(0);

                if (parseFloat(currentTarget.value) > 0) {

                    percentageAmount = parseFloat(parseFloat(DOM.totalItemRate.value).toFixed(0)) * parseFloat(parseFloat((currentTarget.value / 100).toFixed(2)));

                    nextElement.value = parseFloat(DOM.totalItemRate.value) + parseFloat(parseFloat(percentageAmount).toFixed(0));

                    nextElement.value = round(nextElement.value, -1);

                    nextElement.disabled = true;

                    nextElement.focus();
                }
                else {

                    nextElement.value = parseFloat(0);
                    nextElement.disabled = false;
                }
            }
            else {

                var previousElement = currentTarget.parentElement.parentElement.querySelectorAll('input')[0];

                previousElement.value = parseFloat(0);

                if (parseFloat(currentTarget.value) > 0) {

                    percentageAmount = shared.roundOff((parseFloat(currentTarget.value) - parseFloat(DOM.totalItemRate.value)) / parseFloat(DOM.totalItemRate.value) * 100, 2);

                    if (isNaN(percentageAmount)) { percentageAmount = parseFloat(0); }

                    previousElement.value = percentageAmount;

                    previousElement.disabled = true;
                }
                else {
                    previousElement.disabled = false;
                }
            }
        }
        //}
    }

    function round(value, precision) {

        var multiplier = Math.pow(10, precision || 0);

        return Math.round(value * multiplier) / multiplier;
    }

    function uploadFiles() {

        var itemPictureUploader = DOM.itemPictureUploader;
        var uploadedFiles = DOM.uploadedFiles;
        var itemId = parseInt(DOM.itemName.getAttribute('data-item-id'));

        if (isNaN(itemId)) { itemId = parseInt(0); }

        DOM.uploadedFiles.innerHTML = "";

        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;

        for (var p = 0; p < itemPictureUploader.length; p++) {

            if (regex.test(itemPictureUploader[p].value.toLowerCase()) === false) {
                swal("Warning", "Please select the valid file name. Only .jpg / .jpeg / .gif / .png / .bmp file types are supported.", "warning");
                DOM.itemPictureUploader.focus();
                return false;
            }
            else if ((itemPictureUploader[p].size / 1024 / 1024) > 50) {
                swal("Warning", "Image size should not be more than 50 MB.", "warning");
                return false;
            }
            else {

                var itemPicture = {};

                itemPicture = {
                    ItemPictureId: 0,
                    ItemId: itemId,
                    ItemPictureName: itemPictureUploader[p].name.split(' ').join('_'),
                    ItemPicturePath: "/ItemPictures/",
                    CreatedBy: parseInt(LOGGED_USER),
                    CreatedByIP: IP_ADDRESS
                }

                itemPictures.push(itemPicture);
            }

            //var elements = "";

            //elements = elements + "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
            //elements = elements + "<div id='ProgressBar_" + p + "' class='progress-bar progress-bar-striped-active' role='progressbar' aria-valuemin='0' aria-valuemax='100' style='width:0%'</div>";
            //elements = elements + "</div>";
            //elements = elements + "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
            //elements = elements + "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-12'>";
            //elements = elements + "<button type='button' id='Cancel_" + p + "' class='btn btn-sm btn-danger' style='display:none; line-height: 6px; height:25px;'>" + Cancel + "</button>"; 
            //elements = elements + "</div>";
            //elements = elements + "<div class='col-lg-6 col-md-6 col-sm-6 col-xs-12'>";
            //elements = elements + "<p id='Status_" + p + "' class='progress-status' style='text-align:right; margin-right:-15px; font-weight: bold; color: #fefefe'";
            //elements = elements + "</p>";
            //elements = elements + "</div>";
            //elements = elements + "</div" >;
            //elements = elements + "<div class='col-lg-12 col-md-12 col-sm-12 col-xs-12'>";
            //elements = elements + "<p id='notify_" + p + "' style='text-align: right;>";
            //elements = elements + "</p>";
            //elements = elements + "</div>";

            //var progressBar = document.createElement('div');

            //progressBar.setAttribute('id', 'ProgressBar_' + p);
            //progressBar.setAttribute('class', 'progress-bar progress-bar-striped-active');
            //progressBar.setAttribute('role', 'progressbar');
            //progressBar.setAttribute('aria-valuemin', "0");
            //progressBar.setAttribute('aria-valuemax', "100");
            //progressBar.style.width = "0%";

            //uploadSingleFile(itemPictures[p], p);
        }

        //DOM.uploadedFiles.innerHTML = elements;


    }

    function uploadSingleFile(file, index) {

        var fileId = p;

        var ajax = new XMLHttpRequest();

        ajax.upload.addEventListener("progress", function (e) {
            var percent = (e.loaded / e.total) * 100;

        });

    }

    function addNewItem() {

        //clear the inputs
        shared.clearInputs(DOM.editMode);
        shared.clearTables(DOM.editMode);
        shared.disableControls(DOM.editMode, false);
        
        items.length = 0;
        SETItems.length = 0;
        itemPictures.length = 0;

        shared.setSelectOptionByIndex(DOM.brand, parseInt(1));
        shared.setSelect2ControlsText(DOM.brand);

        shared.setSelectValue(DOM.unitsOfMeasurement, "PCS", null);
        shared.setSelect2ControlsText(DOM.unitsOfMeasurement);

        shared.setRadioButtonValue(DOM.isSet, "No", null);

        DOM.itemName.setAttribute('data-item-id', 0);

        addNewItemRate();

        // Show panel        
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hidePanel(DOM.itemSetEditMode);
        shared.hidePanel(DOM.itemSetViewMode);

        // Set focus
        DOM.brand.focus();
    }

    var getSelectedRows = function (list) {

        var selectedRows = [];

        var tableBody = list.tBodies[0];

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

    function showItemList() {
        getItems();
    }

    function viewItem() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);
            shared.disableControls(DOM.editMode, true);

            var selectedRows = getSelectedRows(DOM.itemsList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var itemId = parseInt(currentTableRow.getAttribute('data-item-id'));

                    if (isNaN(itemId)) { itemId = 0; }

                    showItemDetails(itemId);
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

    function editItem() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);
            shared.disableControls(DOM.editMode, false);

            var selectedRows = getSelectedRows(DOM.itemsList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var itemId = parseInt(currentTableRow.getAttribute('data-item-id'));

                    if (isNaN(itemId)) { itemId = 0; }

                    showItemDetails(itemId);
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
        DOM.itemName.focus();
    }

    function deleteItem() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.itemsList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.itemsList);

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

                                var item = {};

                                item = {
                                    ItemId: parseInt(selectedRows[r].getAttribute('data-item-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS
                                };

                                var postData = JSON.stringify(item);

                                shared.sendRequest(SERVICE_PATH + 'SaveItem', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) >= 0) {

                                            swal({
                                                title: "Success",
                                                text: "Item Details Deleted successfully.",
                                                type: "success"
                                            }, function () {
                                                getItems();
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

    function bindItemDetails() {

        var tableBody = DOM.itemsList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the inward details has values
        if (items.length > 0) {

            var data = "";

            for (var r = 0; r < items.length; r++) {

                data = data + "<tr data-item-id=" + items[r].ItemId + " >";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + items[r].ItemId + "' class='label-checkbox' name='SelectItem' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + items[r].SrNo + "</td>";
                data = data + "<td>" + items[r].ItemCode + "</td>";
                data = data + "<td>" + items[r].ItemQualityName + "</td>";
                data = data + "<td>" + items[r].ItemName + "</td>";
                data = data + "<td>" + items[r].BrandName + "</td>";
                data = data + "<td>" + items[r].ItemCategoryName + "</td>";
                data = data + "<td>" + items[r].IsSet + "</td>";
                data = data + "</tr>";

            }

            tableBody.innerHTML = data;

            // Show panels
            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);

        }
    }

    function showItemDetails(itemId) {

        if (itemId > 0) {

            // Check the items list has values
            if (items.length) {

                var itemList = items.filter(function (value, index, array) {
                    return value.ItemId === parseInt(itemId);
                });

                if (itemList.length) {

                    shared.setSelectValue(DOM.brand, null, parseInt(itemList[0].BrandId));
                    shared.setSelect2ControlsText(DOM.brand);
                    shared.setSelectValue(DOM.itemCategory, null, parseInt(itemList[0].ItemCategoryId));
                    shared.setSelect2ControlsText(DOM.itemCategory);
                    if (itemList[0].GenerateItemCodeAuto === false) {
                        shared.setRadioButtonValue(DOM.autoGenerateItemCode, null, "No");
                    }
                    else {
                        shared.setRadioButtonValue(DOM.autoGenerateItemCode, null, "Yes");
                    }
                    DOM.itemName.value = itemList[0].ItemName;
                    DOM.itemName.setAttribute('data-item-id', itemList[0].ItemId);
                    DOM.itemDesc.value = itemList[0].ItemDesc;
                    shared.setSelectValue(DOM.itemQuality, null, parseInt(itemList[0].ItemQualityId));
                    shared.setSelect2ControlsText(DOM.itemQuality);
                    DOM.hsnCode.value = itemList[0].HSNCode;
                    DOM.itemCode.value = itemList[0].ItemCode;
                    shared.setSelectValue(DOM.unitsOfMeasurement, null, parseInt(itemList[0].UnitOfMeasurementId));
                    shared.setSelect2ControlsText(DOM.unitsOfMeasurement);
                    DOM.reOrderLevel.value = itemList[0].ReOrderLevel;
                    if (itemList[0].IsSet === false) {
                        shared.setRadioButtonValue(DOM.isSet, "No", null);
                        viewItemSetDetails();
                    }
                    else {
                        shared.setRadioButtonValue(DOM.isSet, "Yes", null);
                        bindItemSetDetails(itemId);
                    }

                    // Bind Item Rate
                    getItemRates(itemId);
                }

                // Show panels
                shared.showPanel(DOM.editMode);
                shared.hidePanel(DOM.viewMode);

            }
        }
    }

    function validateData() {

        var isValid = true;

        if (DOM.itemCategory.value === "") {
            isValid = false;
            swal("Error!!!", "Please select the Item Category Name.", "error");
        }
        else if (DOM.itemName.value === "") {
            isValid = false;
            swal("Error!!!", "Please enter the Item Name.", "error");
        }


        return isValid;
    }

    function checkItemIsExists(callback) {

        var itemName = DOM.itemName.value;
        var brandId = parseInt(DOM.brand.options[DOM.brand.selectedIndex].value);
        var itemQualityId = parseInt(DOM.itemQuality.options[DOM.itemQuality.selectedIndex].value);

        shared.sendRequest(SERVICE_PATH + "CheckItemIsExists/" + itemName + '/' + brandId + '/' + itemQualityId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                callback(response);

            }
        });

    }

    function addCustomerCategoryRate() {

        customerCategoryRates = [];

        var table = DOM.customerCategoryRateList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var tableRowsCount = tableRows.length;

        if (tableRowsCount > 0) {

            for (var tr = 0; tr < tableRowsCount; tr++) {

                var customerCategoryRate = {};

                var tableDetails = tableRows[tr].children;

                var srNo = shared.getMaxSrNo(customerCategoryRates, 0);

                var customerCategoryItemRateId = parseInt(0);
                var customerCategoryId = parseInt(0);
                var itemRateId = parseInt(0);
                var rateInPercent = parseFloat(0);
                var flatRate = parseFloat(0);

                customerCategoryItemRateId = parseInt(tableRows[tr].getAttribute('data-customer-category-item-rate-id'));
                customerCategoryId = parseInt(tableRows[tr].getAttribute('data-customer-category-id'));
                itemRateId = parseInt(DOM.itemRateId.value);
                rateInPercent = parseFloat(rateInPercent.value);
                flatRate = parseFloat(flatRate.value);
                rateInPercent = parseFloat(tableDetails[2].children[0].value);
                flatRate = parseFloat(tableDetails[3].children[0].value);

                if (isNaN(customerCategoryItemRateId)) { customerCategoryItemRateId = parseInt(0); }
                if (isNaN(customerCategoryId)) { customerCategoryId = parseInt(0); }
                if (isNaN(itemRateId)) { itemRateId = parseInt(0); }
                if (isNaN(rateInPercent)) { rateInPercent = parseFloat(0); }
                if (isNaN(flatRate)) { flatRate = parseFloat(0); }

                customerCategoryRate = {
                    CustomerCategoryItemRateId: customerCategoryItemRateId,
                    CustomerCategoryId: customerCategoryId,
                    ItemRateId: itemRateId,
                    RateInPercent: rateInPercent,
                    FlatRate: flatRate,
                    SrNo: srNo,
                    IsDeleted: false
                };

                if (customerCategoryItemRateId === parseInt(0)) {
                    customerCategoryRate.CreatedBy = parseInt(LOGGED_USER);
                    customerCategoryRate.CreatedByIP = IP_ADDRESS;
                }
                else {
                    customerCategoryRate.ModifiedBy = parseInt(LOGGED_USER);
                    customerCategoryRate.ModifiedByIP = IP_ADDRESS;
                }

                customerCategoryRates.push(customerCategoryRate);

            }
        }
    }

    function saveItemRate() {

        shared.showLoader(DOM.loader);

        /* Store customer category rates data to an array*/
        addCustomerCategoryRate();

        itemRates.length = 0;

        var itemRateId = parseInt(0);
        var itemId = parseInt(0);
        var srNo = parseInt(0);
        var itemName = null;
        var itemQuality = null;
        var purchaseRate = null;
        var discountPercent = parseFloat(0);
        var discountAmount = parseFloat(0);
        var transportCost = null;
        var labourCost = null;
        var gstRateId = parseInt(0);
        var gstRate = parseFloat(0);
        var isSellAtNetRate = false;
        var totalItemRate = parseFloat(0);
        var rateEffectiveFromDate = parseInt(0);
        var workingPeriodId = parseInt(0);

        itemRateId = parseInt(DOM.itemRateId.value);
        itemId = parseInt(DOM.itemName.value);
        itemName = DOM.itemName.value;
        itemQuality = DOM.itemQuality.options[DOM.itemQuality.selectedIndex].text;
        purchaseRate = parseFloat(DOM.purchaseRate.value);
        var index = DOM.discount.value.indexOf('%');
        if (DOM.discount.value.indexOf('%') !== 0) {
            discountPercent = shared.roundOff(DOM.discount.value.substring(0, index), 2);
        }
        else {
            discountAmount = shared.roundOff(DOM.discount.value, 2);
        }
        transportCost = parseFloat(DOM.transportCost.value);
        labourCost = parseFloat(DOM.labourCost.value);
        gstRateId = parseInt(DOM.gstRate.getAttribute('data-gst-rate-id'));
        if (DOM.isSellAtNetRate[0].checked) {
            isSellAtNetRate = true;
        }
        gstRate = parseFloat(DOM.gstRate.value);
        gstAmount = parseFloat(DOM.gstAmount.value);
        totalItemRate = parseFloat(DOM.totalItemRate.value); 
        rateEffectiveFromDate = DOM.effectiveFromDate.value;
        workingPeriodId = parseInt(1);

        if (itemRateId === null) { itemRateId = parseInt(0); }

        if (isNaN(itemRateId)) { itemRateId = parseInt(0); }
        if (isNaN(discountPercent)) { discountPercent = parseInt(0); }

        var itemRate = {};

        if (purchaseRate > 0) {

            itemRate = {
                ItemRateId: itemRateId,
                ItemId: itemId,
                ItemName: itemName,
                ItemQuality: itemQuality,
                PurchaseRate: purchaseRate,
                DiscountPercent: discountPercent,
                DiscountAmount: discountAmount,
                TransportCost: transportCost,
                LabourCost: labourCost,
                GSTRateId: gstRateId,
                GSTRate: gstRate,
                GSTAmount: GSTAmount,
                IsSellAtNetRate: isSellAtNetRate,
                TotalCost: totalItemRate,
                RateEffectiveFromDate: rateEffectiveFromDate,
                IsDeleted: false,
                WorkingPeriodId: workingPeriodId,
                CustomerCategoryRates: customerCategoryRates
            };

            if (parseInt(itemRateId) === parseInt(0)) {

                itemRate.CreatedBy = LOGGED_USER;
                itemRate.CreatedByIP = IP_ADDRESS;
            }
            else {

                itemRate.ModifiedBy = LOGGED_USER;
                itemRate.ModifiedByIP = IP_ADDRESS;
            }

            itemRates.push(itemRate);

            bindItemRateDetails();

        }

        shared.hideLoader(DOM.loader);

        //var postData = JSON.stringify(itemRates);

        //shared.sendRequest(SERVICE_PATH + "SaveItemRate", "POST", true, "JSON", postData, function (response) {

        //    var _response = JSON.parse(response.responseText);

        //    if (response.status === 200) {
        //        if (parseInt(response.responseText) > parseInt(0)) {
        //            swal({
        //                title: "Success",
        //                text: "Records Saved Succesfully.",
        //                type: "success"
        //            }, function () {
        //                itemRates.length = 0;
        //                getItemRates();
        //            });
        //        }
        //    }
        //    else {
        //        swal("error", "Unable to save the Item Rate Details due to some error.", "error");
        //        handleError(_response.Message + " " + _response.ExceptionMessage);
        //        itemRates = [];
        //        customerCategoryRates = [];
        //    }
        //});

        //shared.hideLoader(DOM.loader);

    }

    function saveItem(isRedirect) {

        shared.showLoader(DOM.loader);

        itemRates.length = 0;

        if (validateData()) {

            saveItemRate();

            var item = {};

            var itemCategorySelectedIndex = parseInt(0);
            var itemCategoryId = parseInt(0);
            var itemCategory = null;
            var itemId = parseInt(0);
            var brandId = parseInt(0);
            var autoGenerateItemCode = false;
            var itemCode = null;
            var itemName = null;
            var itemDesc = null;
            var itemQualitySelectedIndex = parseInt(0);
            var itemQualityId = parseInt(0);
            var itemQuality = null;
            var unitsOfMeasurementSelectedIndex = parseInt(0);
            var unitsOfMeasurementId = parseInt(0);
            var unitsOfMeasurement = null;
            var hsncode = null;
            var reOrderLevel = parseInt(0);
            var isSet = false;
            var itemSetSubItemId = parseInt(0);

            itemCategorySelectedIndex = DOM.itemCategory.selectedIndex;
            itemCategoryId = parseInt(DOM.itemCategory.options[itemCategorySelectedIndex].value);
            itemCategory = DOM.itemCategory.options[itemCategorySelectedIndex].text;
            itemId = DOM.itemName.getAttribute('data-item-id');
            brandId = parseInt(DOM.brand.options[DOM.brand.selectedIndex].value);
            autoGenerateItemCode = shared.getRadioSelectedValue(DOM.autoGenerateItemCode);
            if (autoGenerateItemCode.toLowerCase() === "no") {
                autoGenerateItemCode = false;
            }
            else {
                autoGenerateItemCode = true;
            }
            itemCode = DOM.itemCode.value;
            itemName = DOM.itemName.value;
            itemDesc = DOM.itemDesc.value;
            itemQualitySelectedIndex = parseInt(DOM.itemQuality.selectedIndex);
            itemQualityId = parseInt(DOM.itemQuality.options[itemQualitySelectedIndex].value);
            itemQuality = DOM.itemQuality.options[itemQualitySelectedIndex].text;
            unitsOfMeasurementSelectedIndex = parseInt(DOM.unitsOfMeasurement.selectedIndex);
            unitsOfMeasurementId = parseInt(DOM.unitsOfMeasurement.options[unitsOfMeasurementSelectedIndex].value);
            unitsOfMeasurement = DOM.unitsOfMeasurement.options[unitsOfMeasurementSelectedIndex].text;
            hsncode = DOM.hsnCode.value;
            reOrderLevel = DOM.reOrderLevel.value;
            if (shared.getRadioSelectedValue(DOM.isSet) === "IsSetYes") {
                isSet = true;
            }
            else {
                isSet = false;
            };

            itemSetSubItemId = parseInt(DOM.itemSetId.value);

            if (isNaN(itemQualityId)) {
                itemQualityId = parseInt(0);
            }

            if (isNaN(unitsOfMeasurementId)) {
                unitsOfMeasurement = parseInt(0);
            }

            if (isNaN(itemSetSubItemId)) {
                itemSetSubItemId = parseInt(0);
            }

            var subItems = SETItems.filter(function (value, index, array) {
                return value.ItemSetSubItemId === itemSetSubItemId;
            });

            item = {
                ItemId: itemId,
                BrandId: brandId,
                ItemCategoryId: itemCategoryId,
                AutoGenerateItemCode: autoGenerateItemCode,
                ItemCode: itemCode,
                ItemName: itemName,
                ItemDesc: itemDesc,
                ItemQualityId: itemQualityId,
                UnitOfMeasurementId: unitsOfMeasurementId,
                BarcodeNo: "",
                HSNCode: hsncode,
                ReOrderLevel: reOrderLevel,
                IsSet: isSet,
                ItemSetSubItems: SETItems,
                ItemPictures: itemPictures,
                ItemRates: itemRates
            };

            if (parseInt(itemId) === parseInt(0)) {

                item.CreatedBy = parseInt(LOGGED_USER);
                item.CreatedByIP = IP_ADDRESS;
            }
            else {
                item.ModifiedBy = parseInt(LOGGED_USER);
                item.ModifiedByIP = IP_ADDRESS;
            }

            var postData = JSON.stringify(item);

            shared.sendRequest(SERVICE_PATH + "SaveItem", "POST", true, "JSON", postData, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    shared.showLoader(DOM.loader);

                    if (parseInt(response.responseText) > parseInt(0)) {

                        if (isRedirect === true) {
                            swal({
                                title: "Success",
                                text: "Records Saved Succesfully.",
                                type: "success"
                            }, function () {
                                // Redirect to another page
                                window.open(location.origin + '/POS/masters/itemrate?itemId=' + parseInt(response.responseText) + '', "_blank");
                            });
                        }
                        else {
                            swal({
                                title: "Success",
                                text: "Records Saved Succesfully.",
                                type: "success"
                            }, function () {
                                // Redirect to another page
                                getItems();
                            });
                        }
                    }
                    else if (parseInt(response.responseText) === parseInt(-1)) {
                        shared.hideLoader(DOM.loader);
                        DOM.itemName.focus();
                        swal("Error", "This item name is already exists under this Brand and Quality.", "error");
                    }
                    else {
                        shared.hideLoader(DOM.loader);
                        handleError(response.responseText);
                        swal("Error", "Error while saving the Records.", "error");
                    }

                    shared.hideLoader(DOM.loader);

                }

                shared.hideLoader(DOM.loader);

            });
        }
    }

    function saveAndAddItemRate() {

        saveItem(true);
    }

    function getItems() {

        items.length = 0;
        SETItems.length = 0;

        shared.showLoader(DOM.loader);

        shared.sendRequest(SERVICE_PATH + "GetAllItems", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var data = JSON.parse(response.responseText);

                    if (data !== undefined) {

                        if (data.length > 0) {

                            for (var r = 0; r < data.length; r++) {

                                var item = {};

                                item = {
                                    ItemId: data[r].ItemId,
                                    BrandId: data[r].BrandId,
                                    BrandName: data[r].BrandName,
                                    ItemCode: data[r].ItemCode,
                                    ItemName: data[r].ItemName,
                                    ItemDesc: data[r].ItemDesc,
                                    ItemCategoryId: data[r].ItemCategoryId,
                                    ItemCategoryName: data[r].ItemCategoryName,
                                    ItemQualityId: data[r].ItemQualityId,
                                    ItemQualityName: data[r].ItemQualityName,
                                    UnitOfMeasurementId: data[r].UnitOfMeasurementId,
                                    UnitCode: data[r].UnitCode,
                                    HSNCode: data[r].HSNCode,
                                    OpeningUnit: data[r].OpeningUnit,
                                    ReOrderLevel: data[r].ReOrderLevel,
                                    IsSet: data[r].IsSet,
                                    BarcodeNo: data[r].BarcodeNo,
                                    guid: data[r].guid,
                                    SrNo: data[r].SrNo
                                };

                                items.push(item);

                                var setItems = data[r].ItemSetSubItems;

                                if (setItems.length) {

                                    for (var s = 0; s < setItems.length; s++) {

                                        var setItem = {};

                                        setItem = {
                                            ItemSetSubItemId: setItems[s].ItemSetSubItemId,
                                            ItemId: setItems[s].ItemId,
                                            ItemName: setItems[s].ItemName,
                                            SubItemId: setItems[s].SubItemId,
                                            SubItemName: setItems[s].SubItemName,
                                            SubItemNetQty: setItems[s].SubItemNetQty,
                                            SrNo: setItems[s].SrNo,
                                            IsDeleted: false
                                        };

                                        SETItems.push(setItem);
                                    }
                                }
                            }
                        }

                        bindItemDetails()

                        shared.hideLoader(DOM.loader);
                    }
                    else {
                        shared.hideLoader(DOM.loader);
                    }
                }
            }
        });
    }

    function getSETItems() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetSubItems', DOM.setItemName, "SubItemName", "SubItemId", "Choose Set Item", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.setItemName, parseInt(1));
                    shared.setSelect2ControlsText(DOM.setItemName);
                }
            }
        });
    }

    function viewItemSetDetails() {

        if (DOM.isSet[0].checked === true) {

            // Show item set sub item panel
            shared.showPanel(DOM.itemSetEditMode);
            shared.hidePanel(DOM.itemSetViewMode);

            // Focus on first control
            DOM.setItemName.focus();
        }
        else {

            // Show item set sub item panel
            shared.hidePanel(DOM.itemSetEditMode);
            shared.hidePanel(DOM.itemSetViewMode);
        }
    }

    function addNewSETItem() {

        // Clear inputs
        shared.clearInputs(DOM.itemSetEditMode);

        shared.setSelectOptionByIndex(DOM.setItemName, parseInt(0));
        shared.setSelect2ControlsText(DOM.setItemName);

        // Enable/Disable controls
        shared.disableControls(DOM.itemSetEditMode, false);

        DOM.itemSetId.value = "0";
        DOM.itemSetSrNo.value = "0";

        // Set sub item net qty default value to 1
        DOM.setItemNetQty.value = parseInt(1);

        //Show hide paenl
        shared.showPanel(DOM.itemSetEditMode);
        shared.hidePanel(DOM.itemSetViewMode);

        // Focus on the control
        DOM.setItemName.focus();
    }

    function showSETItemList() {

        shared.showPanel(DOM.itemSetViewMode);
        shared.hidePanel(DOM.itemSetEditMode);
    }

    function viewSETItem() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.itemSetEditMode);
            shared.clearSelect(DOM.itemSetViewMode);
            shared.disableControls(DOM.itemSetEditMode, true);

            var selectedRows = getSelectedRows(DOM.itemSetList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var itemSETId = parseInt(currentTableRow.getAttribute('data-sub-item-id'));

                    if (isNaN(itemSETId)) { itemSETId = 0; }

                    DOM.itemSETId.value = itemSETId;

                    showItemSETDetails(itemSETId);
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

    function editSETItem() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.itemSetEditMode);
            shared.clearSelect(DOM.itemSetEditMode);
            shared.disableControls(DOM.itemSetEditMode, false);

            var selectedRows = getSelectedRows(DOM.itemSetList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var itemSETId = parseInt(currentTableRow.getAttribute('data-item-set-id'));

                    if (isNaN(itemSETId)) { itemSETId = 0; }

                    DOM.itemSetId.value = itemSETId;

                    showItemSETDetails(itemSETId);
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
        DOM.setItemName.focus();
    }

    function showItemSETDetails(itemSETId) {

        if (itemSETId > 0) {

            // Check the items list has values
            if (SETItems.length) {

                var itemList = SETItems.filter(function (value, index, array) {
                    return value.SubItemId === parseInt(itemSETId);
                });

                if (itemList.length) {

                    shared.setSelectValue(DOM.setItemName, null, parseInt(itemList[0].SubItemId));
                    shared.setSelect2ControlsText(DOM.setItemName);
                    DOM.setItemNetQty.value = itemList[0].SubItemNetQty;

                }

                // Show panels
                shared.showPanel(DOM.itemSetEditMode);
                shared.hidePanel(DOM.itemSetViewMode);

            }
        }
    }

    //function deleteItemSET() {

    //    shared.showLoader(DOM.loader);

    //    try {

    //        var tableBody = DOM.inwardList.tBodies[0];

    //        var selectedRows = getSelectedRows();

    //        if (selectedRows.length > 0) {

    //            swal({
    //                title: "Are you sure",
    //                text: "Are you sure you want to delete this record?",
    //                type: "warning",
    //                showCancelButton: true,
    //                confirmButtonClass: "btn-danger",
    //                confirmButtonText: "Yes, delete it!",
    //                cancelButtonText: "No, cancel pls",
    //                closeOnConfirm: false,
    //                closeOnCancel: true,
    //            },
    //                function (isConfirm) {

    //                    if (isConfirm) {

    //                        for (var r = 0; r < selectedRows.length; r++) {

    //                            var inward = {};

    //                            inward = {
    //                                InwardId: parseInt(selectedRows[r].getAttribute('data-inward-id')),
    //                                IsDeleted: true,
    //                                DeletedBy: parseInt(LOGGED_USER),
    //                                DeletedByIP: IP_ADDRESS
    //                            };

    //                            var postData = JSON.stringify(inward);

    //                            shared.sendRequest(SERVICE_PATH + 'SaveInwardDetails', "POST", true, "JSON", postData, function (response) {

    //                                if (response.status === 200) {

    //                                    if (parseInt(response.responseText) > 0) {

    //                                        //tableBody.removeChild(selectedRows[r]);

    //                                        swal({
    //                                            title: "Success",
    //                                            text: "Inward Details saved successfully.",
    //                                            type: "success"
    //                                        }, function () {
    //                                            getInwards();
    //                                        });
    //                                    }
    //                                }

    //                                shared.hideLoader(DOM.loader);

    //                            });
    //                        }
    //                    }
    //                }
    //            );
    //        }
    //        else {
    //            swal("error", "No row selected.", "error");
    //        }
    //    }
    //    catch (e) {
    //        handleError(e.message);
    //    }
    //    finally {

    //        shared.hideLoader(DOM.loader);
    //    }

    //}

    function deleteSETItem() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.itemSetList.tBodies[0];

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

                                var itemSetSubItemId = parseInt(selectedRows[r].getAttribute('data-item-set-sub-item-id'));

                                var srNo = parseInt(selectedRows[r].getAttribute('data-sr-no'));

                                var itemId = parseInt(DOM.itemName.getAttribute('data-item-id'));

                                if (itemSetSubItemId === parseInt(0)) {

                                    if (SETItems.length > 0) {

                                        for (var s = SETItems.length - 1; s >= 0; s--) {
                                            if (parseInt(SETItems[s].SrNo) === srNo) {
                                                SETItems.splice(s, 1);
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (SETItems.length > 0) {

                                        for (var si = 0; si < SETItems.length; si++) {

                                            if (SETItems[si].ItemSetSubItemId === parseInt(itemSetSubItemId)) {
                                                SETItems[si].IsDeleted = true;
                                                SETItems[si].DeletedBy = parseInt(LOGGED_USER);
                                                SETItems[si].DeletedByIP = IP_ADDRESS;
                                                break;
                                            }
                                        }
                                    }
                                }

                                bindItemSetDetails(itemId);

                            }
                        }
                    });
            }
        }
        catch (e) {
            handleError(e.message);
            swal({
                title: "Error",
                text: "Error while deleting the Item.",
                type: "error"
            });
        }
        finally {
            shared.hideLoader(DOM.loader);
        }
    }

    function addSETItem(SETItem) {

        var srNo = shared.getMaxSrNo(SETItems, 0);

        var itemSet = {};

        itemSet = {
            ItemSetSubItemId: SETItem.ItemSetSubItemId,
            ItemId: SETItem.ItemId,
            ItemName: SETItem.ItemName,
            SubItemId: SETItem.SubItemId,
            SubItemName: SETItem.SubItemName,
            SubItemNetQty: SETItem.SubItemNetQty,
            SrNo: srNo,
            CreatedBy: parseInt(LOGGED_USER),
            CreatedByIP: IP_ADDRESS,
            IsDeleted: false
        };

        SETItems.push(itemSet);
    }

    function updateSETItem(setItem) {

        if (SETItems.length > 0) {

            for (var p = 0; p < SETItems.length; p++) {

                if (SETItems[p].ItemSetSubItemId === parseInt(setItem.ItemSetSubItemId)
                    && SETItems[p].SrNo === parseInt(setItem.SrNo)) {

                    SETItems[p].ItemSetSubItemId = setItem.ItemSetSubItemId;
                    SETItems[p].ItemId = setItem.ItemId;
                    SETItems[p].ItemName = setItem.ItemName;
                    SETItems[p].SubItemId = setItem.SubItemId;
                    SETItems[p].SubItemName = setItem.SubItemName;
                    SETItems[p].SubItemNetQty = setItem.SubItemNetQty;
                    SETItems[p].IsDeleted = false;

                    if (parseInt(SETItems.ItemSetSubItemId) > 0) {
                        SETItems[p].ModifiedBy = parseInt(LOGGED_USER);
                        SETItems[p].ModifiedByIp = IP_ADDRESS
                    }
                    else {
                        SETItems[p].CreatedBy = parseInt(LOGGED_USER);
                        SETItems[p].CreatedByIP = IP_ADDRESS
                    }

                    break;
                }
            }
        }
    }

    function validateSETItem() {

        var isValid = true;

        if (DOM.setItemName.selectedIndex === -1) {
            DOM.setItemName.focus();
            isValid = false;
            swal("error", "Please select the Item Name.", "error");
        }
        else if (DOM.setItemNetQty.value === "") {
            DOM.setItemNetQty.focus();
            isValid = false;
            swal("error", "Please enter the SET Item Net Qty.", "error");
        }

        return isValid;
    }

    function saveSETItem() {

        if (validateSETItem()) {

            var itemSETId = parseInt(0);
            var itemId = parseInt(0);
            var itemName = null;
            var SETItemId = parseInt(0);
            var SETItemName = null;
            var SETItemNetQty = parseInt(1);
            var srNo = parseInt(0);

            itemSETId = parseInt(DOM.itemSetId.value);
            srNo = parseInt(DOM.itemSetSrNo.value);
            itemId = parseInt(DOM.itemName.getAttribute('data-item-id'));
            itemName = DOM.itemName.value;
            SETItemId = parseInt(DOM.setItemName.options[DOM.setItemName.selectedIndex].value);
            SETItemName = DOM.setItemName.options[DOM.setItemName.selectedIndex].text;
            SETItemNetQty = parseInt(DOM.setItemNetQty.value);

            if (isNaN(itemSETId)) { itemSETId = parseInt(0); }
            if (isNaN(srNo)) { srNo = parseInt(0); }
            if (isNaN(itemId)) { itemId = parseInt(0); }
            if (isNaN(SETItemId)) { SETItemId = parseInt(0); }
            if (isNaN(SETItemNetQty)) { SETItemNetQty = parseInt(1); }

            // To check the sub item name is already exists
            if (srNo === parseInt(0)) {

                if (SETItems.length > 0) {

                    var SETItemList = SETItems.filter(function (value, index, array) {
                        return value.ItemSetSubItemId === parseInt(itemSETId);
                    });

                    if (SETItemList.length > 0) {

                        for (var i = 0; i < SETItemList.length; i++) {

                            if (SETItems[i].SubItemName === DOM.setItemName.options[DOM.setItemName.selectedIndex].text) {
                                DOM.setItemName.focus();
                                swal("error", "This Item Name is already exists.", "error");
                                return;
                            }
                        }
                    }
                }
            }

            var itemSET = {};

            itemSET = {
                ItemSetSubItemId: itemSETId,
                ItemId: itemId,
                ItemName: itemName,
                SubItemId: SETItemId,
                SubItemName: SETItemName,
                SubItemNetQty: SETItemNetQty,
                SrNo: srNo,
                IsDeleted: false
            };

            if (itemSETId === 0 && srNo === 0) {
                addSETItem(itemSET);
            }
            else {
                updateSETItem(itemSET);
            }

            bindItemSetDetails(itemId);
        }
    }

    function saveAndAddNewSETItem() {

        saveSETItem();

        DOM.setItemName.focus();
    }

    function bindItemSetDetails(itemId) {

        shared.showLoader(DOM.loader);

        try {

            var table = DOM.itemSetList;

            var tableBody = table.tBodies[0];

            tableBody.innerHTML = "";

            if (isNaN(itemId)) { itemId = parseInt(0); }

            if (SETItems.length > 0) {

                var setItem = SETItems.filter(function (value, index, array) {
                    return value.ItemId === itemId &&
                        value.IsDeleted === false;
                });

                var itemsCount = setItem.length;

                if (itemsCount > 0) {

                    var data = "";

                    for (var r = 0; r < itemsCount; r++) {

                        data += "<tr data-item-set-sub-item-id=" + parseInt(SETItems[r].ItemSetSubItemId) + " data-sub-item-id=" + parseInt(SETItems[r].SubItemId) + " data-sr-no=" + parseInt(SETItems[r].SrNo) + ">";
                        data += "<td><label class='label-tick'> <input type='checkbox' id='" + SETItems[r].ItemSetSubItemId + "' class='label-checkbox' name='SelectItemSet' /> <span class='label-text'></span> </label>" + "</td>";
                        data += "<td>" + SETItems[r].SrNo + "</td>";
                        data += "<td>" + SETItems[r].SubItemName + "</td>";
                        data += "<td>" + SETItems[r].SubItemNetQty + "</td>";
                        data += "</tr>";
                    }

                    tableBody.innerHTML = data;

                    shared.showPanel(DOM.itemSetViewMode);
                    shared.hidePanel(DOM.itemSetEditMode);
                }
                else {
                    shared.showPanel(DOM.itemSetViewMode);
                    shared.hidePanel(DOM.itemSetEditMode);
                }
            }
        }
        catch (e) {

            handleError(e.message);
        }
        finally {

            shared.hideLoader(DOM.loader);
        }
    }

    function getItemRates(itemId) {

        shared.showLoader(DOM.loader);

        //if (itemRates.length > 0) {

        //    unselectItemRate();

        //    shared.hideLoader(DOM.loader);

        //    shared.showPanel(DOM.itemRateViewMode);
        //    shared.hidePanel(DOM.itemRateEditMode);
        
        //    return;
        //}
                
        itemId = parseInt(DOM.itemName.getAttribute('data-item-id'));

        if (isNaN(itemId)) { itemId = 0; }

        DOM.itemRateList.tBodies[0].innerHTML = "";

        itemRates.length = 0;

        customerCategoryRates.length = 0;

        if (itemId > 0) {

            shared.sendRequest(SERVICE_PATH + "GetItemsRatesByItemId/" + itemId, "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res !== undefined) {

                            if (res.length > 0) {

                                var data = "";

                                for (var r = 0; r < res.length; r++) {

                                    var itemRate = {};

                                    itemRate = {
                                        ItemRateId: res[r].ItemRateId,
                                        ItemId: res[r].ItemId,
                                        ItemName: res[r].ItemName,
                                        ItemQuality: res[r].ItemQuality,
                                        PurchaseRate: res[r].PurchaseRate,
                                        DiscountPercent: res[r].DiscountPercent,
                                        DiscountAmount: res[r].DiscountAmount,
                                        RateAfterDiscount: res[r].RateAfterDiscount,
                                        TransportCost: res[r].TransportCost,
                                        LabourCost: res[r].LabourCost,
                                        CostOfGoods: res[r].CostOfGoods,
                                        GSTRateId: res[r].GSTRateId,
                                        GSTRate: res[r].GSTRate,
                                        GSTAmount: res[r].GSTAmount,
                                        TotalCost: res[r].TotalCost,
                                        IsSellAtNetRate: res[r].IsSellAtNetRate,
                                        RateEffectiveFromDate: res[r].RateEffectiveFromDate,
                                        RateEffectiveToDate: res[r].RateEffectiveToDate,
                                        FinancialYear: res[r].FinancialYear,
                                        WorkingPeriodId: res[r].WorkingPeriodId,
                                        SrNo: res[r].SrNo,
                                        IsDeleted: false
                                    };

                                    itemRates.push(itemRate);

                                    var customerCategorywiseRates = res[r].CustomerCategoryRates;

                                    if (customerCategorywiseRates !== undefined) {

                                        if (customerCategorywiseRates.length > 0) {

                                            for (var p = 0; p < customerCategorywiseRates.length; p++) {

                                                var customerCategoryRate = {};

                                                customerCategoryRate = {
                                                    CustomerCategoryItemRateId: parseInt(customerCategorywiseRates[p].CustomerCategoryItemRateId),
                                                    CustomerCategoryId: parseInt(customerCategorywiseRates[p].CustomerCategoryId),
                                                    ItemRateId: parseInt(customerCategorywiseRates[p].ItemRateId),
                                                    RateInPercent: parseFloat(customerCategorywiseRates[p].RateInPercent),
                                                    FlatRate: parseFloat(customerCategorywiseRates[p].FlatRate),
                                                    IsDeleted: false
                                                };

                                                customerCategoryRates.push(customerCategoryRate);
                                            }
                                        }
                                    }
                                }

                                bindItemRateDetails();

                                shared.showPanel(DOM.itemRateViewMode);
                                shared.hidePanel(DOM.itemRateEditMode);

                            }
                            else {
                                addNewItemRate();
                            }
                        }
                    }
                }

                shared.hideLoader(DOM.loader);

            });

        }

    }

    function addNewItemRate() {

        shared.clearInputs(DOM.itemRateEditMode);
        shared.clearTables(DOM.itemRateEditMode);
        shared.clearTables(DOM.itemRateEditMode);

        itemRates.length = [];
        customerCategoryRates.length = 0;

        shared.disableControls(DOM.itemRateEditMode, false);

        getCustomerCategories();

        DOM.itemRateId.value = parseInt(0);

        DOM.totalItemRate.disable = true;

        DOM.transportCost.value = parseFloat(0);
        DOM.labourCost.value = parseFloat(0);
        DOM.totalItemRate.value = parseFloat(0);
        DOM.itemRateList.tBodies[0].innerHTML = "";

        var currentDate = new Date();

        DOM.effectiveFromDate.value = moment(currentDate).format("DD/MMM/YYYY");

        shared.showPanel(DOM.itemRateEditMode);
        shared.hidePanel(DOM.itemRateViewMode);

        DOM.itemName.focus();
    }

    function viewItemRate() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.itemRateEditMode);
            shared.clearSelect(DOM.itemRateEditMode);
            shared.disableControls(DOM.itemRateEditMode, true);

            var selectedRows = getSelectedRows(DOM.itemRateList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var itemRateId = parseInt(currentTableRow.getAttribute('data-item-rate-id'));

                    showItemRateDetails(itemRateId);
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

    function editItemRate() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.itemRateEditMode);
            shared.clearSelect(DOM.itemRateEditMode);
            shared.disableControls(DOM.itemRateEditMode, false);

            var selectedRows = getSelectedRows(DOM.itemRateList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var itemRateId = parseInt(currentTableRow.getAttribute('data-item-rate-id'));

                    showItemRateDetails(itemRateId);
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
        DOM.itemName.focus();
    }

    function deleteItemRate() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.itemRateList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.itemRateList);

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

                                var data = [];

                                var itemRate = {};
                                var customerCategoryRate = {};

                                if (customerCategoryRates.length > 0) {

                                    var customerCategorywiseRates = customerCategoryRates.filter(function (value, index, array) {
                                        return value.ItemRateId === parseInt(selectedRows[r].getAttribute('data-item-rate-id'));
                                    });
                                }

                                if (customerCategorywiseRates.length > 0) {

                                    for (var c = 0; c < customerCategorywiseRates.length; c++) {

                                        customerCategorywiseRates[c].IsDeleted = true;
                                        customerCategorywiseRates[c].DeletedBy = parseInt(LOGGED_USER);
                                        customerCategorywiseRates[c].DeletedByIP = IP_ADDRESS
                                    }
                                }

                                itemRate = {
                                    ItemRateId: parseInt(selectedRows[r].getAttribute('data-item-rate-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS,
                                    CustomerCategoryRates: customerCategorywiseRates
                                };

                                data.push(itemRate);

                                var postData = JSON.stringify(data);

                                shared.sendRequest(SERVICE_PATH + 'SaveItemRate', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {

                                            //tableBody.removeChild(selectedRows[r]);

                                            swal({
                                                title: "Success",
                                                text: "Item Rate deleted successfully.",
                                                type: "success"
                                            }, function () {
                                                itemRates.length = 0;
                                                getItemRates();
                                            });
                                        }
                                    }
                                    else {
                                        swal({
                                            title: "Error",
                                            text: "Unable to delete records due to an error." + response.responseText,
                                            type: "error"
                                        });
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

    //function setFocus() {
    //    DOM.$pkgSlipItemModal.on('shown.bs.modal', function () {
    //        DOM.itemName.focus();
    //    });
    //}

    function unselectItemRate() {

        var tableBody = DOM.itemRateList.tBodies[0];

        var checkBoxes = tableBody.querySelectorAll('.label-checkbox');

        if (checkBoxes.length > 0) {

            for (var c = 0; c < checkBoxes.length; c++) {

                checkBoxes[c].checked = false;
            }
        }
    }

    function bindItemRateDetails() {

        var tableBody = DOM.itemRateList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the inward details has values
        if (itemRates.length > 0) {

            var data = "";

            for (var r = 0; r < itemRates.length; r++) {

                data = data + "<tr data-item-rate-id=" + parseInt(itemRates[r].ItemRateId) + " data-sr-no=" + parseInt(itemRates[r].SrNo) + ">";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + itemRates[r].ItemRateId + "' class='label-checkbox' name='SelectItemRate' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + itemRates[r].SrNo + "</td>";
                data = data + "<td>" + itemRates[r].ItemName + "</td>";
                data = data + "<td>" + itemRates[r].ItemQuality + "</td>";
                data = data + "<td>" + itemRates[r].PurchaseRate + "</td>";
                data = data + "<td>" + itemRates[r].TransportCost + "</td>";
                data = data + "<td>" + itemRates[r].LabourCost + "</td>";
                data = data + "<td>" + itemRates[r].TotalCost + "</td>";
                data = data + "<td>" + itemRates[r].IsSellAtNetRate + "</td>";
                data = data + "<td>" + itemRates[r].RateEffectiveFromDate + "</td>";
                data = data + "</tr>";

            }

            tableBody.innerHTML = data;

            // Show panels
            shared.showPanel(DOM.itemRateViewMode);
            shared.hidePanel(DOM.itemRateEditMode);

        }
    }

    function showItemRateDetails(itemRateId) {

        if (itemRates.length > 0) {

            DOM.itemRateId.value = itemRateId;

            var data = itemRates.filter(function (value, index, array) {

                return value.ItemRateId === itemRateId;

            });

            if (data.length > 0) {

                if (data[0].RateEffectiveToDate !== null) {
                    swal("Warning", "You can not edit this record.", "warning");
                    return false;
                }

                DOM.purchaseRate.value = data[0].PurchaseRate;
                DOM.discount.value = data[0].DiscountPercent;
                DOM.rateAfterDiscount.value = data[0].RateAfterDiscount;
                DOM.transportCost.value = data[0].TransportCost;
                DOM.labourCost.value = data[0].LabourCost;
                DOM.goodsCost.value = data[0].CostOfGoods;
                DOM.gstRate.value = data[0].GSTRate;
                DOM.gstRate.setAttribute('data-gst-rate_id', data[0].GSTRateId);
                DOM.gstAmount.value = data[0].GSTAmount;
                DOM.totalItemRate.value = data[0].TotalCost;
                if (data[0].IsSellAtNetRate) {
                    DOM.isSellAtNetRate[0].checked = true;
                    DOM.isSellAtNetRate[1].checked = false;
                }
                else {
                    DOM.isSellAtNetRate[0].checked = false;
                    DOM.isSellAtNetRate[1].checked = true;
                }
                DOM.effectiveFromDate.value = data[0].RateEffectiveFromDate;

                if (customerCategoryRates.length > 0) {

                    var customerCategorywiseRates = customerCategoryRates.filter(function (value, index, array) {
                        return value.ItemRateId === itemRateId;
                    });

                    if (customerCategorywiseRates.length > 0) {

                        for (var r = 0; r < customerCategorywiseRates.length; r++) {

                            var tableBody = DOM.customerCategoryRateList.tBodies[0];

                            var tableRows = tableBody.children;

                            var tableRowsCount = tableRows.length;

                            if (tableRowsCount > 0) {

                                for (var tr = 0; tr < tableRowsCount; tr++) {

                                    if (parseInt(tableRows[tr].getAttribute('data-customer-category-id')) === parseInt(customerCategorywiseRates[r].CustomerCategoryId)) {

                                        tableRows[tr].children[2].children[0].value = customerCategorywiseRates[r].RateInPercent;
                                        tableRows[tr].children[3].children[0].value = customerCategorywiseRates[r].FlatRate;
                                        tableRows[tr].setAttribute('data-customer-category-item-rate-id', customerCategorywiseRates[r].CustomerCategoryItemRateId);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }

                shared.showPanel(DOM.itemRateEditMode);
                shared.hidePanel(DOM.itemRateViewMode);

                DOM.itemName.focus();
            }
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


SharpiTech.Item.init();
