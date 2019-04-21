
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var shared = require('./shared/default');





var SharpiTech = {};

SharpiTech.ItemRate = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var itemRates = [];
    var customerCategoryRates = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.addNewItemRate = document.getElementById('AddNewItemRate');
        DOM.showItemRateList = document.getElementById('ShowItemRateList');
        DOM.viewItemRate = document.getElementById('ViewItemRate');
        DOM.editItemRate = document.getElementById('EditItemRate');
        DOM.saveItemRate = document.getElementById('SaveItemRate');
        DOM.deleteItemRate = document.getElementById('DeleteItemRate');
        DOM.printItemRateList = document.getElementById('PrintItemRateList');
        DOM.filterItemRateList = document.getElementById('FilterItemRateList');
        DOM.exportItemRateList = document.getElementById('ExportItemRateList');

        DOM.loader = document.getElementById('Loader');
            
        DOM.editMode = document.getElementById('EditMode');
        DOM.itemRateId = document.getElementById('ItemRateId');
        DOM.itemName = document.getElementById('ItemName');        
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

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.itemRateList = document.getElementById('ItemRateList');
        
        /* Jquery cache */
        DOM.$effectiveFromDatePicker = $('#EffectiveFromDatePicker');
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

        DOM.$effectiveFromDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });
    }

    $("select").on("change", function (event) {

        setFocusOnSelect(event);

    });

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }
    
    function bindEvents() {

        DOM.addNewItemRate.addEventListener('click', addNewItemRate);
        DOM.showItemRateList.addEventListener('click', getItemRates);
        DOM.viewItemRate.addEventListener('click', viewItemRate);
        DOM.editItemRate.addEventListener('click', editItemRate);
        DOM.saveItemRate.addEventListener('click', saveItemRate);
        DOM.deleteItemRate.addEventListener('click', deleteItemRate);

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
    
    function loadData() {

        getItems();
        getCustomerCategories();
        getItemRates();
    }
    
    function getItems() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetItemsByBrandCategoryAndQuality', DOM.itemName, "ItemName", "ItemId", "Choose Item", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.itemName, parseInt(1));
                    shared.setSelect2ControlsText(DOM.itemName);                    
                }
            }
        });

        shared.hideLoader(DOM.loader);
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

        var itemId = parseInt(DOM.itemName.options[DOM.itemName.selectedIndex].value);

        var gstr = {};

        gstr = {
            ItemId: itemId,
            GSTApplicable: 'SGST',
            Rate: rate,
            EffectiveFromDate: DOM.effectiveFromDate.value
        };

        var postData = JSON.stringify(gstr);

        shared.sendRequest(SERVICE_PATH + "GetGSTRateByItemIdGSTApplicableAndSaleRate/", "POST", true, "JSON", postData, function (response) {

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

    function ServiceFailed1(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        _Type = null; _WebUrl = null; _UrlData = null; _ContentType = null; _DataType = null; _ProcessData = null;
    }

    function getMaxSrNo(data, maxSrNo) {

        var _maxSrNo = maxSrNo;

        if (data.length > 0) {

            for (var s = 0; s < data.length; s++) {

                if (data[s].SrNo >= _maxSrNo) {
                    _maxSrNo = data[s].SrNo;
                }
            }
        }

        return _maxSrNo += 1;
    }

    var getSelectedRows = function() {

        var selectedRows = [];

        var tableBody = DOM.itemRateList.tBodies[0];

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

    function addNewItemRate() {

        shared.clearInputs(DOM.editMode);
        shared.clearTables(DOM.editMode);

        itemRates.length  = [];
        customerCategoryRates.length = 0;

        shared.disableControls(DOM.editMode, false);

        getCustomerCategories();        

        DOM.itemRateId.value = parseInt(0);

        DOM.totalItemRate.disable = true;

        DOM.transportCost.value = parseFloat(0);
        DOM.labourCost.value = parseFloat(0);
        DOM.totalItemRate.value = parseFloat(0);

        var currentDate = new Date();
        
        DOM.effectiveFromDate.value = moment(currentDate).format("DD/MMM/YYYY");

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);        

        DOM.itemName.focus();
    }

    function viewItemRate() {
        
        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);
            shared.disableControls(DOM.editMode, true);

            var selectedRows = getSelectedRows();

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

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);
            shared.disableControls(DOM.editMode, false);

            var selectedRows = getSelectedRows();

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
                                                text: "Unable to delete records due to an error." +  response.responseText,
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
            shared.showPanel(DOM.editMode);
            shared.hidePanel(DOM.viewMode);

        }
    }

    function showItemRateDetails(itemRateId) {

        if (itemRates.length > 0) {
            
            DOM.itemRateId.value = itemRateId;

            var data = itemRates.filter(function (value, index, array) {

                return value.ItemRateId === itemRateId;

            });

            if (data.length > 0) {

                shared.setSelectValue(DOM.itemName, null, parseInt(data[0].ItemId));
                shared.setSelect2ControlsText(DOM.itemName);
                DOM.purchaseRate.value = data[0].PurchaseRate;
                DOM.discount.value = data[0].DiscountAmount;
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

                shared.showPanel(DOM.editMode);
                shared.hidePanel(DOM.viewMode);
                
                DOM.itemName.focus();
            }
        }
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

                var srNo = getMaxSrNo(customerCategoryRates, 0);

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
                    SrNo:  srNo,
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
                rateDifference = shared.roundOff(discount,2);
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

                DOM.totalItemRate.value = shared.roundOff(parseFloat( DOM.goodsCost.value) + parseFloat(DOM.gstAmount.value), 0);
            }
        });
    }

    function round(value, precision) {

        var multiplier = Math.pow(10, precision || 0);

        return Math.round(value * multiplier) / multiplier;
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

    function setUrlData() {

        var result = false;

        var itemId = shared.getParameterByName('itemId');

        if (itemId !== undefined && itemId !== null) {

            shared.setSelectValue(DOM.itemName, null, parseInt(itemId));
            shared.setSelect2ControlsText(DOM.itemName);

            result = true;
        }        

        return result;
    }

    function getItemRates() {

        shared.showLoader(DOM.loader);

        if (itemRates.length > 0) {

            unselectItemRate();

            shared.hideLoader(DOM.loader);

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        
            return;
        }

        DOM.itemRateList.tBodies[0].innerHTML = "";

        itemRates.length = 0;

        customerCategoryRates.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllItemsRates", "GET", true, "JSON", null, function (response) {

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

                            if (setUrlData()) {
                                shared.showPanel(DOM.editMode);
                                shared.hidePanel(DOM.viewMode);
                                //toggleModes("block", "none");
                            }
                            else {
                                shared.showPanel(DOM.viewMode);
                                shared.hidePanel(DOM.editMode);
                                //toggleModes("none", "block");
                            }
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

    function saveItemRate() {

        shared.showLoader(DOM.loader);

        /* Store customer category rates data to an array*/
        addCustomerCategoryRate();

        itemRates.length = 0;

        var itemRateId = parseInt(0);
        var itemId = parseInt(0);
        var purchaseRate = null;
        var discountPercent = parseFloat(0);
        var discountAmount = parseFloat(0);
        var transportCost = null;
        var labourCost = null;
        var gstRateId = parseInt(0);
        var gstRate = parseFloat(0);
        var isSellAtNetRate = false;
        var rateEffectiveFromDate = parseInt(0);
        var workingPeriodId = parseInt(0);
        
        itemRateId = parseInt( DOM.itemRateId.value);
        itemId = parseInt(DOM.itemName.value);
        purchaseRate = parseFloat(DOM.purchaseRate.value);
        var index = DOM.discount.value.indexOf('%');
        if (DOM.discount.value.indexOf('%') !== 0) {
            discountPercent = shared.roundOff(DOM.discount.value.substring(0, index),2);
        }
        else {
            discountAmount = shared.roundOff(DOM.discount.value,2);
        }
        transportCost = parseFloat(DOM.transportCost.value);
        labourCost = parseFloat(DOM.labourCost.value);
        gstRateId = parseInt(DOM.gstRate.getAttribute('data-gst-rate-id'));
        if (DOM.isSellAtNetRate[0].checked) {
            isSellAtNetRate = true;
        }
        rateEffectiveFromDate = DOM.effectiveFromDate.value;
        workingPeriodId = parseInt(1);

        if (itemRateId === null) { itemRateId = parseInt(0); }

        if (isNaN(itemRateId)) { itemRateId = parseInt(0); }
        if (isNaN(discountPercent)) { discountPercent = parseInt(0); }

        var itemRate = {};

        itemRate = {
            ItemRateId: itemRateId,
            ItemId: itemId,
            PurchaseRate: purchaseRate,
            DiscountPercent: discountPercent,
            DiscountAmount: discountAmount,
            TransportCost: transportCost,
            LabourCost: labourCost,
            GSTRateId: gstRateId,
            IsSellAtNetRate: isSellAtNetRate,
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

        var postData = JSON.stringify(itemRates);

        shared.sendRequest(SERVICE_PATH + "SaveItemRate", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Succesfully.",
                        type: "success"
                    }, function () {
                        itemRates.length = 0;
                        getItemRates();
                    });
                }
            }
            else {
                swal("error", "Unable to save the Item Rate Details due to some error.", "error");
                handleError(_response.Message + " " + _response.ExceptionMessage);
                itemRates = [];
                customerCategoryRates = [];
            }
        });

        shared.hideLoader(DOM.loader);

    }
        
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        applyPlugins();
        loadData();
    }

    return {
        init: init
    };

}());


SharpiTech.ItemRate.init();
