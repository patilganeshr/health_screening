
var SharpiTech = {};

SharpiTech.GSTCategory = (function () {

        //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    var _gstCategories = [];
    var _gstRates = [];

    /* ---- private method ---- */

    //cache DOM elements
    function _cacheDOM() {

        DOM.loader = document.getElementById('loader');
        DOM.editModeGSTCategory = document.getElementById('EditModeGSTCategory');
        DOM.gstCategoryId = document.getElementById('GSTCategoryId');
        DOM.gstCategoryName = document.getElementById('GSTCategoryName');
        DOM.hsnCode = document.getElementById('HSNCode');

        DOM.viewModeGSTCategory = document.getElementById('ViewModeGSTCategory');
        DOM.createNewGSTCategory = document.getElementById('CreateNewGSTCategory');
        DOM.refreshGSTCategoryList = document.getElementById('RefreshGSTCategoryList');
        DOM.filterGSTCategoryList = document.getElementById('FilterGSTCategoryList');         
        DOM.gstCategories = document.getElementById('GSTCategories');

        DOM.backToGSTCategoryList = document.getElementById('BackToGSTCategoryList');
        DOM.saveGSTCategory = document.getElementById('SaveGSTCategory');
        
        DOM.editModeGSTRate = document.getElementById('EditModeGSTRate');
        DOM.gstRateId = document.getElementById('GSTRateId');
        DOM.srNo = document.getElementById('SrNo');
        DOM.taxName = document.getElementById('TaxName');
        DOM.gstName = document.getElementById('GSTName');
        DOM.gstRate = document.getElementById('GSTRate');
        DOM.saleValueAmount = document.getElementById('SaleValueAmount');
        DOM.effectiveFromDate = document.getElementById('EffectiveFromDate');
        DOM.effectiveFromDatePicker = document.getElementById('EffectiveFromDatePicker');

        DOM.viewModeGSTRate = document.getElementById('ViewModeGSTRate');
        DOM.gstRates = document.getElementById('GSTRates');
        
        DOM.addNewGSTRate = document.getElementById('AddNewGSTRate');
        DOM.backToGSTRateList = document.getElementById('BackToGSTRateList');
        DOM.saveGSTRate = document.getElementById('SaveGSTRate');

        
        /*cache the jquery element */
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

    $("select").on("change", function (event) {

        setFocusOnSelect(event);

    });

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.createNewGSTCategory.addEventListener('click', createNewGSTCategory);
        DOM.gstCategories.addEventListener('click', gstCategory);
        DOM.backToGSTCategoryList.addEventListener('click', backToGSTCategoryList);
        DOM.saveGSTCategory.addEventListener('click', saveGSTCategory);
        DOM.refreshGSTCategoryList.addEventListener('click', refreshGSTCategoryList);

        DOM.addNewGSTRate.addEventListener('click', addNewGSTRate);
        DOM.gstRates.addEventListener('click', gstRate);
        DOM.backToGSTRateList.addEventListener('click', backToGSTRateList);
        DOM.saveGSTRate.addEventListener('click', saveGSTRate);
        
        DOM.gstRate.onkeydown = function validate(e) {
            return _shared.acceptDecimalNos(e);
        };
    }

    function loadData() {

        getTaxNames();        
    }    

    function getTaxNames() {

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetTaxSlabs', DOM.taxName, "TaxName", "TaxSlabId", "Choose Tax", function (response) {
            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    _shared.setSelectOptionByIndex(DOM.taxName, parseInt(1));
                    _shared.setSelect2ControlsText(DOM.taxName);                    
                }
            }
        });
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

    function toggleModes(editMode, viewMode, editModeDisplay, viewModeDisplay) {

        editMode.style.display = editModeDisplay;
        viewMode.style.display = viewModeDisplay;
    }

    function createNewGSTCategory() {

        _shared.clearInputs(DOM.editModeGSTCategory);

        _gstCategories = [];
        _gstRates = [];

        DOM.gstCategoryId.setAttribute('data-gst-category-id', parseInt(0));
        
        var currentDate = new Date();
        
        DOM.effectiveFromDate.value = moment(currentDate).format("DD/MMM/YYYY");

        toggleModes(DOM.editModeGSTCategory, DOM.viewModeGSTCategory, "block", "none"); 
        toggleModes(DOM.editModeGSTRate, DOM.viewModeGSTRate, "none", "block");

        DOM.gstRates.tBodies[0].innerHTML = "";

        DOM.gstCategoryName.focus();
    }

    function backToGSTCategoryList() {

        toggleModes(DOM.editModeGSTCategory, DOM.viewModeGSTCategory, "none", "block");
        toggleModes(DOM.editModeGSTRate, DOM.viewModeGSTRate, "none", "block");
    }

    function gstCategory(evt) {

        var element = evt.target;

        var currentTableRow;

        if (element.nodeName === 'I') {
            currentTableRow = element.parentElement.parentElement.parentElement;
        }
        else if (element.nodeName === 'A') {
            currentTableRow = element.parentElement.parentElement;
        }

        if (element.getAttribute('data-name').trim().toUpperCase() === "VIEW") {
            viewGSTCategory(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "EDIT") {
            editGSTCategory(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "REMOVE") {
            deleteGSTCategory(currentTableRow);
        }
    }

    function viewGSTCategory(currentTableRow) {

        _shared.clearInputs(DOM.editModeGSTCategory);

        _shared.disableControls(DOM.editModeGSTCategory, true);

        showSelectedGSTCategoryDetails(currentTableRow);
    }

    function editGSTCategory(currentTableRow) {

        _shared.clearInputs(DOM.editModeGSTCategory);

        _shared.disableControls(DOM.editModeGSTCategory, false);

        showSelectedGSTCategoryDetails(currentTableRow);
    }

    function deleteGSTCategory(currentTableRow) {

        var table = DOM.gstCategories;

        var tableBody = table.tBodies[0];
        
        /* temp variable */
        var gstCategoryId = currentTableRow.getAttribute('data-gst-category-id');
        
        var gstCategory = {};

        gstCategory = {
            GSTCategoryId: gstCategoryId,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(gstCategory);
        
        _shared.sendRequest(SERVICE_PATH + 'DeleteGSTCategory', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function showSelectedGSTCategoryDetails(currentTableRow) {

        if (_gstCategories.length > 0) {

            var gstCategoryId = parseInt(currentTableRow.getAttribute('data-gst-category-id'));

            var srNo = parseInt(currentTableRow.getAttribute('data-sr-no'));

            DOM.gstCategoryId.value = gstCategoryId;
            //DOM.srNo.value = srNo;
            
            var data = _gstCategories.filter(function (value, index, array) {
                return value.GSTCategoryId === gstCategoryId
                    && value.SrNo === srNo;
            });

            if (data.length > 0) {
                
                DOM.gstCategoryName.value = data[0].GSTCategoryName;
                DOM.hsnCode.value = data[0].HSNCode;

                toggleModes(DOM.editModeGSTCategory, DOM.viewModeGSTCategory, "block", "none");

                bindGSTRate(gstCategoryId);
            }
        }
    }

    function addNewGSTRate() {

        //clear the modal control inputs        
        _shared.clearInputs(DOM.editModeGSTRate);

        DOM.gstRateId.value = parseInt(0);
        DOM.srNo.value = parseInt(0);

        //show gst rate
        toggleModes(DOM.editModeGSTRate, DOM.viewModeGSTRate, "block", "none");

        //set focus
        DOM.taxName.focus();
        //setFocus();
    }

    function backToGSTRateList() {

        //close modal;
        toggleModes(DOM.editModeGSTRate, DOM.viewModeGSTRate, "none", "block");

    }

    function gstRate(evt) {

        var element = evt.target;

        var currentTableRow;

        if (element.nodeName === 'I') {
            currentTableRow = element.parentElement.parentElement.parentElement;
        }
        else if (element.nodeName === 'A') {
            currentTableRow = element.parentElement.parentElement;
        }

        if (element.getAttribute('data-name').trim().toUpperCase() === "VIEW") {
            viewGSTRate(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "EDIT") {
            editGSTRate(currentTableRow);
        }
        else if (element.getAttribute('data-name').trim().toUpperCase() === "REMOVE") {
            deleteGSTRate(currentTableRow);
        }
    }

    function viewGSTRate(currentTableRow) {

        _shared.clearInputs(DOM.editModeGSTRate);

        _shared.disableControls(DOM.editModeGSTRate, true);

        showSelectedGSTRateDetails(currentTableRow);
    }

    function editGSTRate(currentTableRow) {

        _shared.clearInputs(DOM.editModeGSTRate);

        _shared.disableControls(DOM.editModeGSTRate, false);

        showSelectedGSTRateDetails(currentTableRow);
    }

    function deleteGSTRate(currentTableRow) {

        var table = DOM.gstRates;

        var tableBody = table.tBodies[0];
        
        /* temp variable */
        var gstRateId = currentTableRow.getAttribute('data-gst-rate-id');
        
        var gstRate = {};

        gstRate = {
            GSTRateId: gstRateId,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(gstRate);
        
        _shared.sendRequest(SERVICE_PATH + 'SaveGSTRate', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function showSelectedGSTRateDetails(currentTableRow) {

        if (_gstRates.length > 0) {

            var gstRateId = parseInt(currentTableRow.getAttribute('data-gst-rate-id'));

            var srNo = parseInt(currentTableRow.getAttribute('data-sr-no'));

            DOM.gstRateId.value = gstRateId;
            DOM.srNo.value = srNo;

            var data = _gstRates.filter(function (value, index, array) {
                return value.GSTRateId === gstRateId
                    && value.SrNo === srNo;
            });

            if (data.length > 0) {

                _shared.setSelectValue(DOM.taxName, null, parseInt(data[0].TaxName));
                _shared.setSelect2ControlsText(DOM.taxName);
                DOM.gstName.value = data[0].GSTName;                
                DOM.gstRate.value = data[0].Rate;
                DOM.saleValueAmount.value = data[0].SaleValueAmount;
                DOM.effectiveFromDate.value = data[0].EffectiveFromDate;
                
                toggleModes(DOM.editModeGSTRate, DOM.viewModeGSTRate, "block", "none");
            }
        }
    }

    function addGSTRate(item) {

        var srNo = getMaxSrNo(_gstRates, 0);

        var gstRate = {};

        gstRate = {
            GSTRateId: item.GSTRateId,
            GSTCategoryId: item.GSTCategoryId,
            GSTName: item.GSTName,
            Rate: item.Rate,
            EffectiveFromDate: item.EffectiveFromDate,
            TaxId: item.TaxId,
            TaxName: item.TaxName,
            SaleValueAmount: item.SaleValueAmount,
            SrNo: srNo,
            CreatedBy: parseInt(LOGGED_USER),
            CreatedByIP: IP_ADDRESS,
            IsDeleted: false
        };

        _gstRates.push(gstRate);

    }

    function updateGSTRate(gstRate) {

        if (_gstRates.length > 0) {

            for (var p = 0; p < _gstRates.length; p++) {

                if (_gstRates[p].GSTRateId === parseInt(gstRate.GSTRateId)
                    && _gstRates[p].SrNo === parseInt(gstRate.SrNo)) {

                    _gstRates[p].GSTCategoryId = gstRate.GSTCategoryId;
                    _gstRates[p].GSTName = gstRate.GSTName;
                    _gstRates[p].Rate = gstRate.Rate;
                    _gstRates[p].EffectiveFromDate = gstRate.EffectiveFromDate;
                    _gstRates[p].TaxId = gstRate.TaxId;
                    _gstRates[p].TaxName = gstRate.TaxName;
                    _gstRates[p].SaleValueAmount = gstRate.SaleValueAmount;
                    _gstRates[p].IsDeleted = false;

                    if (parseInt(gstRate.GSTRateId) > 0) {
                        _gstRates[p].ModifiedBy = parseInt(LOGGED_USER);
                        _gstRates[p].ModifiedByIp = IP_ADDRESS
                    }
                    else {
                        _gstRates[p].CreatedBy = parseInt(LOGGED_USER);
                        _gstRates[p].CreatedByIP = IP_ADDRESS
                    }

                    break;
                }
            }
        }
    }

    function validateGSTRate() {

        var isValid = true;

        if (DOM.taxName.selectedIndex === -1) {
            DOM.taxName.focus();
            isValid = false;
            swal("Error", "Please selecte the Tax Name.", "error");            
        }
        else if (DOM.gstName.value === "") {
            DOM.gstName.focus();
            isValid = false;
            swal("Error", "Please enter the GST Name.", "error");
        }
        else if (DOM.gstRate.value === "") {
            DOM.gstRate.focus();
            isValid = false;
            swal("Error", "Please enter the GST Rate.", "error");
        }
        else if (parseInt(DOM.gstRate.value) < parseInt(0)) {
            DOM.gstRate.focus();
            isValid = false;
            swal("Error", "GST Rate should be greater than or equal to zero.", "error");
        }
        
        return isValid;
    }

    function saveGSTRate() {

        if (validateGSTRate()) {

            /* temp variable */
            var gstRateId = parseInt(0);
            var gstCategoryId = parseInt(0);
            var gstName = null;
            var rate = parseFloat(0);
            var effectiveFromDate = null;
            var taxId = parseInt(0);
            var taxName = null;
            var saleValueAmount = parseFloat(0);
            var srNo = parseInt(0);

            gstRateId = parseInt(DOM.gstRateId.value);
            gstCategoryId = parseInt(DOM.gstCategoryId.value);
            gstName = DOM.gstName.value.toUpperCase();
            rate = parseFloat(DOM.gstRate.value);
            effectiveFromDate = DOM.effectiveFromDate.value;
            taxId = parseInt(DOM.taxName.options[DOM.taxName.selectedIndex].value);
            taxName = DOM.taxName.options[DOM.taxName.selectedIndex].text.toUpperCase();
            saleValueAmount = parseFloat(DOM.saleValueAmount.value);
            srNo = parseInt(DOM.srNo.value);

            if (isNaN(gstRateId)) { gstRateId = parseInt(0); }
            if (isNaN(gstCategoryId)) { gstCategoryId = parseInt(0); }
            if (isNaN(taxId)) { taxId = parseInt(0); }
            if (isNaN(srNo)) { srNo = parseInt(0); }
            if (isNaN(rate)) { gstRate = parseFloat(0); }

            if (isNaN(saleValueAmount)) { saleValueAmount = parseFloat(0); }

            var gstRates = _gstRates.filter(function (value, index, array) {
                    return value.GSTCategoryId === gstCategoryId;
                });

                if (gstRates.length > 0) {

                    _gstRates = gstRates;
                }

            var gstRate = {};

            gstRate = {
                GSTRateId: gstRateId,
                GSTCategoryId: gstCategoryId,
                GSTName: gstName,
                Rate: rate,
                EffectiveFromDate: effectiveFromDate,
                TaxId: taxId,
                TaxName: taxName,
                SaleValueAmount: saleValueAmount,
                SrNo: srNo,
                IsDeleted: false
            };

            if (gstRateId === 0 && srNo === 0) {
                addGSTRate(gstRate);
            }
            else {
                updateGSTRate(gstRate);
            }

            bindGSTRate(gstCategoryId);
        }
    }

    function bindGSTRate(gstCategoryId) {

        var table = DOM.gstRates;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (isNaN(gstCategoryId)) { gstCategoryId = parseInt(0); }

        if (_gstRates.length > 0) {

            var gstRates = _gstRates.filter(function (value, index, array) {
                return value.GSTCategoryId === gstCategoryId;
            });

            var itemsCount = gstRates.length;

            if (itemsCount > 0) {

                for (var r = 0; r < itemsCount; r++) {

                    var currentRow = document.createElement('TR');

                    data = "<tr><td>" + gstRates[r].SrNo + "</td>";
                    data += "<td>" + gstRates[r].TaxName + "</td>";
                    data += "<td>" + gstRates[r].GSTName + "</td>";
                    data += "<td>" + gstRates[r].Rate + "</td>";
                    data += "<td>" + gstRates[r].SaleValueAmount + "</td>";
                    data += "<td>" + gstRates[r].EffectiveFromDate + "</td>";
                    data += "<td class='text-center'>" +
                        "<a href='#' class='btn btn-default btn-xs' data-name='view' > <i class='fa fa-lg fa-eye' data-name='view'></i> </a> " +
                        "<a href='#' class='btn btn-info btn-xs' data-name='edit'> <i class='fa fa-lg fa-edit' data-name='edit'></i></a> " +
                        "<a href='#' class='btn btn-danger btn-xs' data-name='remove' > <i class='fa fa-lg fa-remove' data-name='remove'></i></a> </td></tr>";

                    currentRow.setAttribute('data-gst-rate-id', parseInt(gstRates[r].GSTRateId));
                    currentRow.setAttribute('data-sr-no', parseInt(gstRates[r].SrNo));
                    currentRow.innerHTML = data;

                    tableBody.appendChild(currentRow);
                }

                toggleModes(DOM.editModeGSTRate, DOM.viewModeGSTRate, "none", "block");

            }
            else {             
                toggleModes(DOM.editModeGSTRate, DOM.viewModeGSTRate, "block", "none");
            }
        }
    }

    function saveAndAddNewGSTRate() {

        saveGSTRate();

        DOM.taxName.focus();
    }

    function validateGSTCategory() {

        var isValid = true;

        if (DOM.gstCategoryName.value === "") {
            DOM.gstCategoryName.focus();
            isValid = false;
            swal("Error", "Please enter the GST Category Name.", "error");
        }
        else if (DOM.hsnCode.value === "") {
            DOM.hsnCode.focus();
            isValid = false;
            swal("Error", "Please enter the HSN Code.", "error");
        }

        return isValid;
    }

    function refreshGSTCategoryList() {
        getGSTCategories();
    }

    function saveGSTCategory() {

        _shared.showLoader(DOM.loader);

        if (validateGSTCategory()) {

            /* temp variable */
            var gstCategoryId = parseInt(0);
            var gstCategoryName = null;
            var hsnCode = null;
            var srNo = parseInt(0);

            gstCategoryId = parseInt(DOM.gstCategoryId.value);
            gstCategoryName = DOM.gstCategoryName.value.toUpperCase();
            hsnCode = DOM.hsnCode.value.toUpperCase();
            srNo = getMaxSrNo(_gstRates, 0);

            if (isNaN(gstCategoryId)) { gstCategoryId = parseInt(0); }

            _gstCategories = [];

            var gstRates = _gstRates.filter(function (value, index, array) {
                    return value.GSTCategoryId === gstCategoryId;
                });

            var gstCategory = {};

            gstCategory = {
                GSTCategoryId: gstCategoryId,
                GSTCategoryName: gstCategoryName,
                HSNCode: hsnCode,
                GSTRates: gstRates,
                IsDeleted: false
            };

            if (parseInt(gstCategoryId) === parseInt(0)) {

                gstCategory.CreatedBy = LOGGED_USER;
                gstCategory.CreatedByIp = IP_ADDRESS;
            }
            else {

                gstCategory.ModifiedBy = LOGGED_USER;
                gstCategory.ModifiedByIp = IP_ADDRESS;
            }

            _gstCategories.push(gstCategory);            

            var postData = JSON.stringify(_gstCategories);

            _shared.sendRequest(SERVICE_PATH + "SaveGSTCategory", "POST", true, "JSON", postData, function (response) {

                var _response = JSON.parse(response.responseText);

                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Records Saved Succesfully.",
                            type: "success"
                        }, function () {
                            getGSTCategories();
                        });
                    }
                }
                else {
                    swal("error", "Unable to save the GST Category. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
                    handleError(_response.Message + " " + _response.ExceptionMessage);
                }

                _shared.hideLoader(DOM.loader);
            });
        }
    }

    function getGSTCategories() {

        _shared.showLoader(DOM.loader);

        DOM.gstCategories.tBodies[0].innerHTML = "";

        _gstCategories = [];
        _gstRates = [];

        _shared.sendRequest(SERVICE_PATH + "GetAllGSTCategories", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            var table = DOM.gstCategories;

                            var tableBody = table.tBodies[0];

                            for (var r = 0; r < _response.length; r++) {

                                var gstRates = _response[r].GSTRates;

                                gstRates = gstRates.filter(function (value, index, array) {
                                    return value.GSTCategoryId === parseInt(_response[r].GSTCategoryId);
                                });

                                var gstCategory = {};

                                gstCategory = {
                                    GSTCategoryId: _response[r].GSTCategoryId,
                                    GSTCategoryName: _response[r].GSTCategoryName,
                                    HSNCode: _response[r].HSNCode,
                                    SrNo: _response[r].SrNo,
                                    IsDeleted: false
                                };

                                _gstCategories.push(gstCategory);

                                if (gstRates.length > 0) {

                                    for (var s = 0; s < gstRates.length; s++) {

                                        var gstRate = {};

                                        gstRate = {
                                            GSTRateId: gstRates[s].GSTRateId,
                                            GSTCategoryId: gstRates[s].GSTCategoryId,
                                            GSTName: gstRates[s].GSTName,
                                            Rate: gstRates[s].Rate,
                                            EffectiveFromDate: gstRates[s].EffectiveFromDate,
                                            SaleValueAmount: gstRates[s].SaleValueAmount,                                           
                                            TaxId: gstRates[s].TaxId,
                                            TaxName: gstRates[s].TaxName,
                                            SrNo: gstRates[s].SrNo,
                                            IsDeleted: false
                                        };

                                        _gstRates.push(gstRate);
                                    }
                                }

                                var currentRow = document.createElement('TR');

                                var data;

                                data = "<tr><td>" + _response[r].SrNo + "</td>";
                                data = data + "<td>" + _response[r].GSTCategoryName + "</td>";
                                data = data + "<td>" + _response[r].HSNCode + "</td>";
                                data = data + "<td class='text-center'> " +
                                    "<a href='#' class='btn btn-info btn-xs'  data-name='view' > <i class='fa fa-eye'  data-name='view' ></i> View </a > " +
                                    "<a href='#' class='btn btn-info btn-xs'  data-name='edit' > <i class='fa fa-edit'  data-name='edit' ></i> Edit </a > " +
                                    "<a href='#' class='btn btn-danger btn-xs' data-name='remove' > <i class='fa fa-remove'  data-name='remove' > </i> Delete </a> </td > ";

                                currentRow.setAttribute('data-gst-category-id', _response[r].GSTCategoryId);
                                currentRow.setAttribute('data-sr-no', _response[r].SrNo);
                                currentRow.innerHTML = data;

                                tableBody.appendChild(currentRow);
                            }

                            toggleModes(DOM.editModeGSTCategory, DOM.viewModeGSTCategory, "none", "block");
                            toggleModes(DOM.editModeGSTRate, DOM.viewModeGSTRate, "none", "none");
                        }
                        else {
                            toggleModes(DOM.editModeGSTCategory, DOM.viewModeGSTCategory, "block", "none");
                            toggleModes(DOM.editModeGSTRate, DOM.viewModeGSTRate, "none", "none");
                        }
                    }

                    _shared.hideLoader(DOM.loader);
                }
            }
            else {
                _shared.hideLoader(DOM.loader);
            }
        });

    }

    /* ---- public methods ---- */
    function init() {
        _cacheDOM();
        applyPlugins();
        bindEvents();
        loadData();
        getGSTCategories();
    }

    return {
        init: init
    };

}());


SharpiTech.GSTCategory.init();
