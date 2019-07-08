
var Sofarch = {};

Sofarch.PurchaseBill = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var PurchaseBills = [];
    var PurchaseBillItems = [];
    var PurchaseBillCharges = [];
    var IsPurchaseBillRecordChanged = false;
    var IsPurchaseBillItemRecordChanged = false;
    var IsPurchaseBillChargeRecordChanged = false;

    var GSTApplicable = "IGST";
    var CurrentFocus = -1;
    var SearchItemsList = [];

    /* ---- private method ---- */

    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.editMode = document.getElementById('EditMode');

        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.purchaseBillNo = document.getElementById('PurchaseBillNo');
        DOM.purchaseBillDate = document.getElementById('PurchaseBillDate');
        DOM.vendor = document.getElementById('Vendor');
        DOM.searchVendorList = document.getElementById('SearchVendorList');
        DOM.remarks = document.getElementById('Remarks');

        DOM.searchDrugName = document.getElementById('SearchDrugName');
        DOM.searchDrugList = document.getElementById('SearchDrugList');
        DOM.totalBillAmount = document.getElementById('TotalBillAmount');
        DOM.purchaseBillItemList = document.getElementById('PurchaseBillItemList');
        DOM.totalItemAmount = document.getElementById('TotalItemAmount');
        DOM.purchaseBillAmount = document.getElementById('PurchaseBillAmount');
        DOM.adjustedAmount = document.getElementById('AdjustedAmount');

        DOM.searchPurchaseBill = document.getElementById('SearchPurchaseBill');
        DOM.searchOptions = document.getElementById('SearchOptions');
        DOM.searchValue = document.getElementById('SearchValue');
        DOM.search = document.getElementById('Search');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.purchaseBillList = document.getElementById('PurchaseBillList');

        DOM.addNewPurchaseBill = document.getElementById('AddNewPurchaseBill');
        DOM.showPurchaseBillList = document.getElementById('ShowPurchaseBillList');
        DOM.viewPurchaseBill = document.getElementById('ViewPurchaseBill');
        DOM.editPurchaseBill = document.getElementById('EditPurchaseBill');
        DOM.savePurchaseBill = document.getElementById('SavePurchaseBill');
        DOM.deletePurchaseBill = document.getElementById('DeletePurchaseBill');

        /*cache the jquery element */
        DOM.$purchaseBillDateDatePicker = $('#PurchaseBillDateDatePicker');
    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        DOM.$purchaseBillDateDatePicker.datetimepicker({
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

        DOM.addNewPurchaseBill.addEventListener('click', addNewPurchaseBill);
        DOM.showPurchaseBillList.addEventListener('click', checkIsRecordsAreChanged);
        DOM.viewPurchaseBill.addEventListener('click', viewPurchaseBill);
        DOM.editPurchaseBill.addEventListener('click', editPurchaseBill);
        DOM.savePurchaseBill.addEventListener('click', savePurchaseBill);
        DOM.deletePurchaseBill.addEventListener('click', deletePurchaseBill);
        //DOM.printPurchasesBill.addEventListener('click', printPurchasesBill);
        DOM.search.addEventListener('click', searchPurchaseBill);

        DOM.vendor.onkeyup = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchVendorList(e);

        };

        DOM.searchDrugName.onkeyup = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchDrugList(e);

        };

        DOM.purchaseBillAmount.onblur = function (e) {

            calculateAdjustedAmount();
        };

    }

    function loadData() {

        getFinancialYear();

        addNewPurchaseBill();

    }

    function getFinancialYear() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
                    shared.setSelect2ControlsText(DOM.financialYear);

                    //DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                }
            }
        });

        //shared.hideLoader(DOM.loader);
    }

    var getSelectedRows = function (element) {

        shared.showLoader(DOM.loader);

        var selectedRows = [];

        var tableBody = element.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length > 0) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                var checkBox = tableRows[tr].querySelectorAll('.label-checkbox')[0];

                if (checkBox.checked) {

                    selectedRows.push(tableRows[tr]);
                }
            }
        }

        shared.hideLoader(DOM.loader);

        return selectedRows;
    };

    function getSelectedPurchaseBillDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.purchaseBillList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var purchaseBillId = parseInt(currentTableRow.getAttribute('data-purchase-bill-id'));

                if (isNaN(purchaseBillId)) { purchaseBillId = 0; }

                showPurchaseBillDetailsById(purchaseBillId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

    }

    function showSearchVendorList(e) {

        if (e.keyCode === 13) {
            CurrentFocus = -1;
            showVendorNameOnEnterKey(e);
            return;
        }

        var dataAttributes = ['Client-Address-Id', 'Client-Address-Name'];

        var parameters = {};

        parameters = {

            Event: e,
            CurrentFocus: CurrentFocus,
            PostDataKeyValue: postMessage,
            ElementToBeAppend: DOM.searchVendorList,
            DataAttributes: dataAttributes,
            PostParamObject: undefined,
            URL: SERVICE_PATH + "SearchClientAddressNameByClientAddressName/" + DOM.vendor.value + "/",
            DisplayName: "ClientAddressName"
        };

        shared.showAutoCompleteItemsList(parameters, function (response) {

            if (response !== undefined) {

                if (response >= 0) {

                    CurrentFocus = response;
                }
                else {

                    CurrentFocus = -1;

                    var autoCompleteList = response;

                    var listCount = autoCompleteList.length;

                    if (listCount) {

                        var data = "";

                        var fragment = document.createDocumentFragment();

                        var ul = document.createElement('ul');

                        ul.classList.add('list-group');

                        for (var s = 0; s < listCount; s++) {

                            var li = document.createElement('li');

                            li.classList.add('list-group-item');
                            li.classList.add('clearfix');

                            li.setAttribute('id', autoCompleteList[s].ClientAddressId);

                            li.style.cursor = "pointer";
                            li.onclick = showVendorNameOnSelection;
                            li.textContent = autoCompleteList[s].ClientAddressName;

                            fragment.appendChild(li);
                        }

                        ul.appendChild(fragment);

                        DOM.searchVendorList.appendChild(ul);

                        DOM.searchVendorList.style.width = e.target.offsetWidth + 'px';
                        DOM.searchVendorList.style.left = 0;//e.target.offsetParent.offsetLeft + 15 + 'px';

                        DOM.searchVendorList.classList.add('autocompleteList-active');
                        //DOM.itemsList.innerHTML = data;

                    }
                }
            }

        });
    }

    function showVendorNameOnSelection(e) {

        FLAG = "NEW ITEM";

        setVendorName(e.target.textContent, e.target.id);

    }

    function showVendorNameOnEnterKey() {

        FLAG = "NEW ITEM";

        var li = DOM.searchVendorList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            setVendorName(li[0].textContent, li[0].id);
        }

    }

    function setVendorName(name, id) {

        DOM.vendor.value = name;
        DOM.vendor.setAttribute('data-client-address-id', id);

        shared.closeAutoCompleteList(DOM.searchVendorList);

        DOM.vendor.focus();
    }

    function showSearchDrugList(e) {

        if (e.keyCode === 13) {
            CurrentFocus = -1;
            showDrugNameOnEnterKey(e);
            return;
        }

        var dataAttributes = ['Drug-Id', 'Drug-Name', 'Drug-Code'];

        var parameters = {};

        parameters = {

            Event: e,
            CurrentFocus: CurrentFocus,
            PostDataKeyValue: postMessage,
            ElementToBeAppend: DOM.searchDrugList,
            DataAttributes: dataAttributes,
            PostParamObject: undefined,
            URL: SERVICE_PATH + "GetDrugIdAndDrugNameByDrugName/" + DOM.searchDrugName.value,
            DisplayName: "DrugName"
        };

        shared.showAutoCompleteItemsList(parameters, function (response) {

            if (response !== undefined) {

                if (response >= 0) {

                    CurrentFocus = response;
                }
                else {

                    CurrentFocus = -1;

                    SearchItemsList = response;

                    var itemsCount = SearchItemsList.length;

                    if (itemsCount) {

                        var data = "";

                        var fragment = document.createDocumentFragment();

                        var ul = document.createElement('ul');

                        ul.classList.add('list-group');

                        for (var s = 0; s < itemsCount; s++) {

                            var li = document.createElement('li');

                            li.classList.add('list-group-item');
                            li.classList.add('clearfix');

                            li.setAttribute('id', SearchItemsList[s].DrugId);

                            li.style.cursor = "pointer";
                            li.onclick = showDrugNameOnSelection;
                            li.textContent = SearchItemsList[s].DrugName;

                            li.setAttribute('data-drug-code', SearchItemsList[s].DrugCode);

                            fragment.appendChild(li);
                        }

                        ul.appendChild(fragment);

                        DOM.searchDrugList.appendChild(ul);

                        DOM.searchDrugList.style.width = DOM.searchDrugName.offsetWidth + 'px';
                        DOM.searchDrugList.style.left = DOM.searchDrugName.parentElement.offsetLeft + 15 + 'px';
                        //DOM.itemsList.style.top = DOM.searchDrugName.parentElement.offsetTop + 52 + 'px';

                        DOM.searchDrugList.classList.add('autocompleteList-active');
                        //DOM.itemsList.innerHTML = data;
                    }

                }
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function showDrugNameOnSelection(e) {

        FLAG = "NEW ITEM";

        setDrugName(e);

        DOM.searchDrugName.value = "";
    }

    function showDrugNameOnEnterKey() {

        FLAG = "NEW ITEM";

        var li = DOM.searchDrugList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            setDrugName(li[0]);
        }

        DOM.searchDrugName.value = "";
    }

    function setDrugName(e) {


        DOM.searchDrugName.value = name;

        shared.closeAutoCompleteList(DOM.searchDrugList);

        DOM.searchDrugName.focus();

        var drugId = 0;
        var drugCode = null;
        var drugName = null;

        var purchaseBillItems = {};

        if (e.nodeName === undefined) {
            drugId = e.target.id;
            drugCode = e.target.getAttribute('data-drug-code');
            drugName = e.target.textContent;
        }
        else {
            drugId = e.id;
            drugCode = e.getAttribute('data-drug-code');
            drugName = e.textContent;
        }

        purchaseBillItems = {
            PurchaseBillItemId: 0,
            DrugId: drugId,
            DrugCode: drugCode,
            DrugName: drugName,
            BatchNo: '',
            Pack1: 0,
            Pack2: 0,
            FreeQty: 0,
            RatePerPack1: 0,
            ExpiryDate: '',
            TaxPercent: 0,
            TaxAmount: 0,
            ItemAmount: 0
        };

        bindPurchaseBillItems(purchaseBillItems);

    }

    function fillSearchOption() {

        var options = "";

        options += "<option value='-1'> Choose Search Option </option>";
        options += "<option value='billno' selected='selected'> Purchase Bill No.</option>";
        //options += "<option value='gstno'> GST No. </option>";
        //options += "<option value='panno'> PAN No.</option>";

        DOM.searchOptions.innerHTML = options;
    }

    function filterPurchaseBill() {

        shared.showPanel(DOM.searchPurchaseBill);

        shared.clearInputs(DOM.searchPurchaseBill);

        fillSearchOption();

        if (DOM.searchPurchaseBill.classList.contains("hide")) {
            DOM.searchPurchaseBill.classList.remove('hide');
            DOM.searchPurchaseBill.classList.add('show');
        }
        else {
            DOM.searchPurchaseBill.classList.remove('show');
            DOM.searchPurchaseBill.classList.add('hide');
        }

        DOM.searchValue.focus();
    }

    function searchPurchaseBill() {

        shared.showLoader(DOM.loader);

        DOM.purchaseBillList.tBodies[0].innerHTML = "";

        PurchaseBills.length = 0;

        var searchOption = DOM.searchOptions.options[DOM.searchOptions.selectedIndex].text;
        var searchValue = DOM.searchValue.value;
        var url = null;

        if (searchOption.toLowerCase() === "purchase bill no.") {
            url = "SearchPurchaseBillsByPurchaseBillNo/" + searchValue;
        }
        else {
            url = "SearchPurchaseBillsAll";
        }

        shared.sendRequest(SERVICE_PATH + url, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        PurchaseBills = _response;

                        bindPurchaseBills();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

        shared.hideLoader(DOM.loader);
    }

    function checkPurchaseBillNoIsExists(callback) {

        shared.showLoader(DOM.loader);

        var purchaseBillNo = null;
        var purchaseBillId = 0;
        var vendorId = 0;

        purchaseBillNo = DOM.purchaseBillNo.value;
        purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));
        vendorId = parseInt(DOM.vendor.getAttribute('data-client-address-id'));

        if (isNaN(vendorId)) { vendorId = 0; }

        if (purchaseBillId === 0) {

            if (purchaseBillNo !== "" && vendorId > 0) {

                shared.sendRequest(SERVICE_PATH + "CheckPurchaseBillNoIsExists/" + vendorId + "/" + purchaseBillNo, "GET", true, "JSON", null, function (response) {

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            var _response = JSON.parse(response.responseText);

                            if (_response !== undefined) {

                                if (_response) {
                                    swal({
                                        title: "Warning",
                                        text: "This Purchase Bill No. is already exists.",
                                        type: "warning"
                                    }, function () {
                                        DOM.purchaseBillNo.focus();
                                    });
                                }
                            }
                        }

                        callback(_response);
                    }

                    shared.hideLoader(DOM.loader);
                });

            }
        }
        else {
            callback(false);
        }

        shared.hideLoader(DOM.loader);
    }

    function addNewPurchaseBill() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearTextAreas(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        PurchaseBills.length = 0;
        PurchaseBillItems.length = 0;
        PurchaseBillCharges.length = 0;

        DOM.purchaseBillNo.setAttribute('data-purchase-bill-id', parseInt(0));
        DOM.totalBillAmount.textContent = 0.00;
        DOM.purchaseBillAmount.value = 0;
        DOM.totalItemAmount.value = 0;
        DOM.adjustedAmount.value = 0;

        var currentDate = new Date();

        DOM.purchaseBillDate.value = moment(currentDate).format("DD/MMM/YYYY");

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.purchaseBillNo.focus();

        shared.hideLoader(DOM.loader);
    }

    function showPurchaseBillList() {

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        filterPurchaseBill();

        DOM.purchaseBillList.tBodies[0].innerHTML = "";
    }

    function viewPurchaseBill() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedPurchaseBillDetails();

        DOM.purchaseBillNo.focus();

        shared.hideLoader(DOM.loader);
    }

    function editPurchaseBill() {

        shared.showLoader(DOM.loader);

        shared.disableControls(DOM.editMode, false);

        getSelectedPurchaseBillDetails();

        DOM.purchaseBillNo.focus();

        shared.hideLoader(DOM.loader);

    }

    function deletePurchaseBill() {

        shared.showLoader(DOM.loader);

        try {

            var selectedRows = getSelectedRows(DOM.purchaseBillList);

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

                                var bills = [];

                                if (PurchaseBills.length) {

                                    var purchaseBillId = parseInt(selectedRows[r].getAttribute('data-purchase-bill-id'));

                                    var billItems = [];
                                    var billCharges = [];

                                    var purchaseBill = {};
                                    purchaseBill = {
                                        PurchaseBillId: purchaseBillId,
                                        IsDeleted: true,
                                        DeletedBy: LOGGED_USER,
                                        DeletedByIP: IP_ADDRESS,
                                        PurchaseBillItems: billItems,
                                        PurchaseBillCharges: billCharges
                                    };

                                    var postData = JSON.stringify(purchaseBill);

                                    shared.sendRequest(SERVICE_PATH + 'SavePurchaseBill', "POST", true, "JSON", postData, function (response) {

                                        if (response.status === 200) {

                                            if (parseInt(response.responseText) > 0) {

                                                //tableBody.removeChild(selectedRows[r]);

                                                swal({
                                                    title: "Success",
                                                    text: "Purchase Bill Details Deleted successfully.",
                                                    type: "success"
                                                    //}, function () {
                                                    //  deleteGoodsReceiptAndInwardDetails();
                                                });

                                                //deleteGoodsReceiptAndInwardDetails(purchaseBillId);
                                            }
                                        }

                                        shared.hideLoader(DOM.loader);

                                    });
                                }
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

    function showPurchaseBillDetailsById(purchaseBillId) {

        DOM.purchaseBillItemList.tBodies[0].innerHTML = "";

        shared.showLoader(DOM.loader);

        // Check the purchase bills list has values
        if (PurchaseBills.length > 0) {

            var bills = PurchaseBills.filter(function (value, index, array) {
                return value.PurchaseBillId === parseInt(purchaseBillId);
            });

            if (bills.length > 0) {

                DOM.purchaseBillNo.value = bills[0].PurchaseBillNo;
                DOM.purchaseBillNo.setAttribute('data-purchase-bill-id', parseInt(purchaseBillId));
                DOM.purchaseBillDate.value = bills[0].PurchaseBillDate;
                DOM.vendor.value = bills[0].VendorName;
                DOM.vendor.setAttribute('data-client-address-id', parseInt(bills[0].VendorId));
                DOM.adjustedAmount.value = bills[0].AdjustedAmount;
                DOM.purchaseBillAmount.value = bills[0].PurchaseBillAmount;
                DOM.totalItemAmount.value = bills[0].PurchaseBillAmount - bills[0].AdjustedAmount;
                DOM.remarks.value = bills[0].Remarks;
                shared.setSelectValue(DOM.financialYear, null, bills[0].WorkingPeriodId);
                shared.setSelect2ControlsText(DOM.financialYear);


                var billItems = bills[0].PurchaseBillItems.filter(function (value, index, array) {
                    return value.PurchaseBillId === purchaseBillId;
                });

                if (billItems.length) {

                    FLAG = "VIEW MODE";

                    for (var bi = 0; bi < billItems.length; bi++) {

                        bindPurchaseBillItems(billItems[bi]);
                    }

                    calculateTotalItemAmount();

                }

                //bindBillCharges(purchaseBillId);

            }

            // Show panels
            shared.showPanel(DOM.editMode);
            shared.hidePanel(DOM.viewMode);
        }
    }

    var validatePurchaseBillItemDetails = function () {

        var isValidData = true;

        var table = DOM.purchaseBillItemList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                var inputs = tableRows[tr].querySelectorAll('input[type="text"]');

                var select = tableRows[tr].querySelectorAll('select');

                if (inputs.length) {

                    for (var i = 0; i < inputs.length; i++) {

                        if (inputs[i].value === "") {
                            swal("Error", "Please enter the " + inputs[i].name + " for Drug " + tableRows[tr].children[2].textContent, "error");
                            inputs[i].focus();
                            shared.hideLoader(DOM.loader);
                            isValidData = false;
                            break;
                        }

                        if (inputs[i].name.toLowerCase() === "expiry_date") {

                            if (inputs[i].value.length > 7) {
                                swal("Error", "Expiry Date should be in MM/YYYY i.e. 06/2020 format. for Drug " + tableRows[tr].children[2].textContent, "error");
                                inputs[i].focus();
                                shared.hideLoader(DOM.loader);
                                isValidData = false;
                                break;
                            }
                        }
                    }
                }
            }
        }

        return isValidData;
    };

    function savePurchaseBillItem() {

        if (validatePurchaseBillItemDetails() === true) {

            var purchaseBillItemId = parseInt(0);
            var purchaseBillId = parseInt(0);
            var drugId = 0;
            var batchNo = null;
            var pack1 = 0;
            var pack2 = 0;
            var freeQty = 0;
            var ratePerPack1 = 0;
            var expiryDate = null;
            var taxPercent = 0;

            purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));

            var tableBody = DOM.purchaseBillItemList.tBodies[0];

            var tableRows = tableBody.children;

            if (tableRows.length) {

                for (var tr = 0; tr < tableRows.length; tr++) {

                    purchaseBillItemId = parseInt(tableRows[tr].getAttribute('data-purchase-bill-item-id'));

                    var inputs = tableRows[tr].querySelectorAll('input[type="text"]');

                    var select = tableRows[tr].querySelectorAll('select');

                    if (inputs.length) {

                        if (parseFloat(inputs[4].value) > parseFloat(0)) {
                            drugId = parseInt(tableRows[tr].getAttribute('data-drug-id'));
                            batchNo = inputs[0].value;
                            pack1 = inputs[1].value;
                            pack2 = inputs[2].value;
                            freeQty = parseFloat(parseFloat(inputs[3].value).toFixed(2));
                            ratePerPack1 = parseFloat(parseFloat(inputs[4].value).toFixed(2));
                            expiryDate = inputs[5].value;
                            taxPercent = parseFloat(parseFloat(inputs[6].value).toFixed(2));

                            if (isNaN(purchaseBillItemId)) { purchaseBillItemId = parseInt(0); }
                            if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }
                            if (isNaN(drugId)) { drugId = parseInt(0); }

                            var billItem = {};

                            billItem = {
                                PurchaseBillItemId: purchaseBillItemId,
                                PurchaseBillId: purchaseBillId,
                                DrugId: drugId,
                                BatchNo: batchNo,
                                Pack1: pack1,
                                Pack2: pack2,
                                FreeQty: freeQty,
                                RatePerPack1: ratePerPack1,
                                ExpiryDate: expiryDate,
                                TaxPercent: taxPercent,
                                IsDeleted: false
                            };

                            if (tableRows[tr].style.display === "none") {
                                billItem.IsDeleted = true;
                                billItem.DeletedBy = parseInt(LOGGED_USER);
                                billItem.DeletedByIP = IP_ADDRESS;
                            }
                            else {
                                if (purchaseBillItemId === parseInt(0)) {

                                    billItem.CreatedBy = parseInt(LOGGED_USER);
                                    billItem.CreatedByIP = IP_ADDRESS;
                                    //addSalesBillItem(billItem);
                                }
                                else {
                                    billItem.ModifiedBy = parseInt(LOGGED_USER);
                                    billItem.ModifiedByIP = IP_ADDRESS;
                                    //updateSalesBillItem(billItem);
                                }
                            }

                            PurchaseBillItems.push(billItem);
                        }
                    }
                }
            }
            else {
                swal({
                    title: "Warning",
                    text: "No Purchase Bill Items is entered. Please add the items.",
                    type: "warning",
                    function() {
                        DOM.searchDrugName.focus();
                        shared.hideLoader(DOM.loader);
                        return;
                    }
                });
            }
        }
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

    //function getPurchaseBill(purchaseBillId) {

    //    var purchaseBill = purchaseBills.filter(function (value, index, array) {
    //        return value.PurchaseBillId === parseInt(purchaseBillId);
    //    });

    //    return purchaseBill;
    //}

    //function getPurchaseGoods(purchaseBillId) {

    //    var purchaseBill = getPurchaseBills(purchaseBillId);

    //    var goodsReceipts = purchaseBill[0].GoodsReceipts.filter(function (value, index, array) {
    //        return value.PurchaseBillId === parseInt(purchaseBillId);
    //    });

    //    return goodsReceipts;
    //} to be discard

    function getPurchaseBillDetailsByPurchaseBillNo() {

        getSearchVendorListByPurchseBillNo(function (response) {

            if (response) {

                var workingPeriodId = parseInt(0);
                var searchPurchaseBillNo = null;
                var vendorId = parseInt(0);

                workingPeriodId = parseInt(DOM.searchByFinancialYear.options[DOM.searchByFinancialYear.selectedIndex].value);
                searchPurchaseBillNo = DOM.searchByPurchaseBillNo.value;
                vendorId = parseInt(DOM.searchByVendor.options[DOM.searchByVendor.selectedIndex].value);

                var purchaseBillInfo = {};

                purchaseBillInfo = {
                    PurchaseBillNo: searchPurchaseBillNo,
                    WorkingPeriodId: workingPeriodId,
                    VendorId: vendorId
                };

                var postData = JSON.stringify(purchaseBillInfo);

                if (searchPurchaseBillNo !== "") {

                    purchaseBills.length = 0;
                    purchaseBillItems.length = 0;

                    shared.sendRequest(SERVICE_PATH + "GetPurchaseBillDetailsByPurchaseBillNoVendorIdAndWorkingPeriodId/", "POST", true, "JSON", postData, function (response) {

                        if (response.status === 200) {

                            var res = JSON.parse(response.responseText);

                            purchaseBills = res;

                            showPurchaseBillDetails(purchaseBills.PurchaseBillId);
                        }

                    });

                }
            }

        });

    }

    function unselectPurchaseBillListDetails() {

        var tableBody = DOM.purchaseBillList.tBodies[0];

        var checkBoxes = tableBody.querySelectorAll('.label-checkbox');

        if (checkBoxes.length > 0) {

            for (var c = 0; c < checkBoxes.length; c++) {

                checkBoxes[c].checked = false;
            }
        }
    }

    function checkIsRecordsAreChanged() {

        shared.showLoader(DOM.loader);

        if (PurchaseBills.length === 0) {
            showPurchaseBillList();
        }
        else {
            if (IsPurchaseBillRecordChanged === false) {

                unselectPurchaseBillListDetails();
                shared.showPanel(DOM.viewMode);
                shared.hidePanel(DOM.editMode);

                shared.hideLoader(DOM.loader);
            }
        }

        shared.hideLoader(DOM.loader);
    }

    function getPurchaseBills() {

        shared.showLoader(DOM.loader);

        PurchaseBills.length = 0;
        PurchaseBillItems.length = 0;
        PurchaseBillCharges.length = 0;

        shared.sendRequest(SERVICE_PATH + "SearchPurchaseBillsAll", "GET", true, "JSON", null, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var data = JSON.parse(response.responseText);

                    if (data !== undefined) {

                        if (data.length > 0) {

                            PurchaseBills = data;

                            bindPurchaseBills();
                        }
                    }
                }
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function bindPurchaseBills() {

        shared.showLoader(DOM.loader);

        var tableBody = DOM.purchaseBillList.tBodies[0];

        tableBody.innerHTML = "";

        if (PurchaseBills.length) {

            var data = "";

            for (var r = 0; r < PurchaseBills.length; r++) {

                data = data + "<tr data-purchase-bill-id=" + PurchaseBills[r].PurchaseBillId + " data-client-address-id=" + PurchaseBills[r].VendorId + ">";
                data = data + "<td class='text-center'><label class='label-tick'> <input type='checkbox' id='" + PurchaseBills[r].PurchaseBillId + "' class='label-checkbox' name='SelectPurchaseBill' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td class='text-left'>" + PurchaseBills[r].VendorName + "</td>";
                data = data + "<td class='text-center'>" + PurchaseBills[r].PurchaseBillNo + "</td>";
                data = data + "<td class='text-center'>" + PurchaseBills[r].PurchaseBillDate + "</td>";
                data = data + "<td class='text-center'>" + PurchaseBills[r].TotalBillQty + "</td>";
                data = data + "<td class='text-right'>" + PurchaseBills[r].TotalBillAmount + "</td>";
                data = data + "<td class='text-center'>" + PurchaseBills[r].FinancialYear + "</td>";

            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }

        shared.hideLoader(DOM.loader);
    }

    function savePurchaseBill() {

        shared.showLoader(DOM.loader);


        checkPurchaseBillNoIsExists(function (response) {

            if (response === false) {

                if (validatePurchaseBillDetails()) {

                    /* temp variable */
                    var purchaseBillId = 0;
                    var purchaseBillNo = null;
                    var purchaseBillDate = null;
                    var vendorId = 0;
                    var purchaseBillAmount = 0;
                    var remarks = null;
                    var workingPeriodId = 0;
                    var srNo = parseInt(0);

                    PurchaseBills.length = 0;
                    PurchaseBillItems.length = 0;

                    savePurchaseBillItem();

                    purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));
                    purchaseBillNo = DOM.purchaseBillNo.value;
                    purchaseBillDate = DOM.purchaseBillDate.value;
                    vendorId = parseInt(DOM.vendor.getAttribute('data-client-address-id'));
                    purchaseBillAmount = parseFloat(DOM.purchaseBillAmount.value);
                    remarks = DOM.remarks.value;
                    workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);

        if (isNaN(purchaseBillId)) { purchaseBillId = 0; }
                    if (isNaN(vendorId)) { vendorId = 0; }
                    if (isNaN(workingPeriodId)) { workingPeriodId = 0;}

                    if (PurchaseBillItems.length === 0) {
                        swal("Error", "No Purchase Bill Items found or there might be some issue.", "error");
                        return;
                    }

                    var purchaseBill = {};

                    purchaseBill = {
                        PurchaseBillId: purchaseBillId,
                        PurchaseBillNo: purchaseBillNo,
                        PurchaseBillDate: purchaseBillDate,
                        VendorId: vendorId,
                        PurchaseBillAmount: purchaseBillAmount,
                        Remarks: remarks,
                        WorkingPeriodId: workingPeriodId,
                        PurchaseBillItems: PurchaseBillItems,
                        PurchaseBillChargesDetails: PurchaseBillCharges,
                        IsDeleted: false
                    };

                    if (parseInt(purchaseBillId) === parseInt(0)) {

                        purchaseBill.CreatedBy = LOGGED_USER;
                        purchaseBill.CreatedByIp = IP_ADDRESS;
                    }
                    else {

                        purchaseBill.ModifiedBy = LOGGED_USER;
                        purchaseBill.ModifiedByIP = IP_ADDRESS;
                    }

                    //purchaseBills.push(purchaseBill);

                    var postData = JSON.stringify(purchaseBill);

                    shared.sendRequest(SERVICE_PATH + "SavePurchaseBill", "POST", true, "JSON", postData, function (response) {

                        var _response = JSON.parse(response.responseText);

                        if (response.status === 200) {
                            if (parseInt(response.responseText) > parseInt(0)) {
                                swal({
                                    title: "Success",
                                    text: "Records Saved Successfully. Please note down the below reference no. " + response.responseText,
                                    type: "success"
                                }, function () {
                                    IsRecordChanged = true;
                                    addNewPurchaseBill();
                                });
                            }
                            else if (parseInt(response.responseText) === parseInt(-1)) {
                                swal({
                                    title: "Warning",
                                    text: "This Purchase Bill No. is already exists for this Vendor.",
                                    type: "warning"
                                }, function () {
                                    DOM.purchaseBillNo.focus();
                                });
                            }
                        }
                        else {
                            handleError(_response.Message + " " + _response.ExceptionMessage);
                            swal("error", "Unable to save the Purchase Bill. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
                        }
                    });
                }

            }

        });

        shared.hideLoader(DOM.loader);
    }

    function bindPurchaseBillItems(purchaseBillItems) {

        var table = DOM.purchaseBillItemList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var rowsCount = tableRows.length;

        var rowIndex = rowsCount;

        if (rowsCount === 0) {
            tableBody.innerHTML = "";
        }

        if (FLAG === "NEW ITEM") {

            if (purchaseBillItems.DrugName !== "") {

                for (var r = 0; r < rowsCount; r++) {

                    if (parseInt(tableRows[r].getAttribute('data-drug-id')) === parseInt(purchaseBillItems.DrugId)) {
                        DOM.searchDrugName.value = "";
                        DOM.searchDrugName.focus();
                        swal("Error", "This Drug Name is alredy exists.", "error");
                        return;
                    }
                }
            }
        }

        if (purchaseBillItems.DrugName !== "") {

            var data = "";

            var tr = document.createElement('tr');

            tr.setAttribute('data-purchase-bill-item-id', purchaseBillItems.PurchaseBillItemId);
            tr.setAttribute('data-drug-id', purchaseBillItems.DrugId);

            data += "<td class='text-center'> <button type='button' id=RemoveItem_" + rowIndex + " class='btn btn-xs btn-danger btn-round'> <span class='fa fa-fw fa-remove'> </span> </button> </td >";
            data = data + "<td class='text-center'> " + purchaseBillItems.DrugCode + "</td>";
            data = data + "<td class='text-center'> " + purchaseBillItems.DrugName + "</td>";
            data = data + "<td class='text-center'> <input type='text' class='form-control input-md' name='Batch_No' id='BatchNo_" + rowIndex + "' value='" + purchaseBillItems.BatchNo + "' /> </td>";
            data = data + "<td class='text-center'> <input type='text' class='form-control input-md' name='Pack_1' id='Pack1_" + rowIndex + "' value='" + purchaseBillItems.Pack1 + "' /> </td>";
            data = data + "<td class='text-center'> <input type='text' class='form-control input-md' name='Pack_2' id='Pack2_" + rowIndex + "' value='" + purchaseBillItems.Pack2 + "' /> </td>";
            data = data + "<td class='text-center'> <input type='text' class='form-control input-md' name='Free_Qty' id='FreeQty_" + rowIndex + "' value='" + purchaseBillItems.FreeQty + "' /> </td>";
            data = data + "<td class='text-center'> <input type='text' class='form-control input-md' name='Rate_Per_Pack_1' id='RatePerPack1_" + rowIndex + "' value='" + purchaseBillItems.RatePerPack1 + "'/> </td>";
            data = data + "<td class='text-center'> <input type='text' class='form-control input-md' name='Expiry_Date' placeholder='MM/YYYY' maxLength='7'id='ExpiryDate_" + rowIndex + "' value='" + purchaseBillItems.ExpiryDate + "'/> </td>";
            //data = data + "<td> <input type='text' class='form-control input-md masked' placeholder='dd/MMM/yyyy' pattern='^(([0-9])|([0-2][0-9])|([3][0-1]))\/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\/\d{4}$' id='ExpiryDate_" + rowIndex + "' value='" + purchaseBillItems.ExpiryDate + "'/> </td>";
            data = data + "<td class='text-center'> <input type='text' class='form-control input-md' id='TaxPercent_" + rowIndex + "' value='" + purchaseBillItems.TaxPercent + "'/> </td>";
            data = data + "<td class='text-right'> " + purchaseBillItems.TaxAmount + " </td>";
            data = data + "<td class='text-right'> " + purchaseBillItems.ItemAmount + " </td>";

            tr.innerHTML = data;

            tableBody.appendChild(tr);

            var buttons = tableBody.querySelectorAll('button');

            if (buttons.length) {

                for (var b = 0; b < buttons.length; b++) {
                    buttons[b].onclick = removeItem;
                }
            }

            addEventsToPurchaseBillItemDetailsTableInputs();
        }
    }

    function addEventsToPurchaseBillItemDetailsTableInputs() {

        var tableBody = DOM.purchaseBillItemList.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            var tableRow = tableRows[tableRows.length - 1];

            var inputs = tableRow.querySelectorAll('input[type="text"]');

            var selects = tableRow.querySelectorAll('select');

            //var datePickers = tableRow.querySelectorAll('.date');

            //inputs = inputs.filter(function (value, index, array) {
            //    return value.
            //});

            if (selects.length) {

                for (var s = 0; s < selects.length; s++) {

                    $(selects[s]).select2();

                }
            }

            //if (datePickers.length) {

            //    for (var d = 0; d < datePickers.length; d++) {

            //        var currentDate = new Date();

            //        $(datePickers[d]).datetimepicker({
            //            format: 'DD/MMM/YYYY',
            //            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
            //            //orientation:'bottom'
            //        });

            //        //datePickers[d].addEventListener('click', function (e) {
            //        //    var datepicker = document.body.find('.bootstrap-datetimepicker-widget:last'),

            //        //        position = datepicker.offset();

            //        //    // Move datepicker to the exact same place it was but attached to the body
            //        //    datepicker.appendTo('body');
            //        //    datepicker.css({
            //        //        position: 'absolute',
            //        //        top: position.top,
            //        //        bottom: 'auto',
            //        //        left: position.left,
            //        //        right: 'auto'
            //        //    });
            //        //});

            //        $(datePickers[d]).on('dp.show', function () {
            //            var datepicker = $('body').find('.bootstrap-datetimepicker-widget:last');
            //            if (datepicker.hasClass('bottom')) {
            //                var top = $(this).offset().top + $(this).outerHeight();
            //                var left = $(this).offset().left;
            //                datepicker.css({
            //                    'top': top + 'px',
            //                    'bottom': 'auto',
            //                    'left': left + 'px',
            //                    'z-index': 9999
            //                });
            //            }
            //            else if (datepicker.hasClass('top')) {
            //                var top = $(this).offset().top - datepicker.outerHeight();
            //                var left = $(this).offset().left;

            //                var controlHeight = datepicker[0].parentElement.parentElement.children[0].children[0].offsetHeight;

            //                top = controlHeight;
            //                left = 0;

            //                datepicker.css({
            //                    'top': top + 'px',
            //                    'bottom': 'auto'
            //                });
            //            }
            //        });

            //    }
            //}

            if (inputs.length) {

                for (var i = 0; i < inputs.length; i++) {

                    if (inputs[i].id.toLowerCase().indexOf('pack1') === 0) {

                        inputs[i].onkeydown = function (e) {
                            return shared.acceptDecimalNos(e);
                        };
                    }
                    else if (inputs[i].id.toLowerCase().indexOf('pack2') === 0) {
                        inputs[i].onkeydown = function (e) {
                            return shared.acceptDecimalNos(e);
                        };
                    }
                    else if (inputs[i].id.toLowerCase().indexOf('freeqty') === 0) {
                        inputs[i].onkeydown = function (e) {
                            return shared.acceptDecimalNos(e);
                        };
                        inputs[i].onblur = function () {

                            calculateItemAmount(tableRow);
                        };
                    }
                    else if (inputs[i].id.toLowerCase().indexOf('rateperpack1') === 0) {
                        inputs[i].onkeydown = function (e) {
                            return shared.acceptDecimalNos(e);
                        };
                        inputs[i].onblur = function () {

                            calculateItemAmount(tableRow);
                        };
                    }
                    else if (inputs[i].id.toLowerCase().indexOf('expirydate') === 0) {
                        inputs[i].length = 7;
                    }
                    else if (inputs[i].id.toLowerCase().indexOf('taxpercent') === 0) {
                        inputs[i].onkeydown = function (e) {
                            return shared.acceptDecimalNos(e);
                        };
                        inputs[i].onblur = function () {

                            calculateItemAmount(tableRow);

                            if (tableRow.nextSibling === null) {
                                DOM.searchDrugName.focus();
                            }
                        };
                    }
                }

            }
        }
    }

    function removeItem(e) {

        // Remove the item from the Table only if the purchase bill item id is 0
        var tableBody = DOM.purchaseBillItemList.tBodies[0];

        var tableRow = e.currentTarget.parentElement.parentElement;

        var purchaseBillItemId = parseInt(tableRow.getAttribute('data-purchase-bill-item-id'));

        if (isNaN(purchaseBillItemId)) { purchaseBillItemId = parseInt(0); }

        if (purchaseBillItemId === 0) {

            tableBody.removeChild(tableRow);
        }
        else {

            tableRow.classList.add('removed-item');

            tableRow.style.display = "none";
        }

        //// Mark the Item as Deleted if the inward goods id is > 0
        //if (PurchaseBillItems.length) {

        //    if (purchaseBillId > 0) {

        //        for (var i = 0; i < PurchaseBillItems.length; i++) {

        //            if (PurchaseBillItems[i].PurchaseBillId === purchaseBillId) {
        //                PurchaseBillItems[i].IsDeleted = true;
        //                PurchaseBillItems[i].DeletedBy = parseInt(LOGGED_USER);
        //                PurchaseBillItems[i].DeletedByIP = IP_ADDRESS;
        //                break;
        //            }
        //        }
        //    }
        //}

        calculateItemAmount(tableRow);
    }

    function calculateItemAmount(tableRow) {

        var freeQtyInput = tableRow.querySelectorAll('input[id*=FreeQty]');

        var purchaseRateInput = tableRow.querySelectorAll('input[id*=RatePerPack1]');

        var taxPercentInput = tableRow.querySelectorAll('input[id*=TaxPercent]');

        var freeQty = parseFloat(freeQtyInput[0].value);
        var purchaseRate = parseFloat( purchaseRateInput[0].value);
        var taxPercent = parseFloat(taxPercentInput[0].value);
        var taxAmount = 0;
        var itemTotal = 0;

        if (isNaN(freeQty)) { freeQty= 0; }
        if (isNaN(purchaseRate)) { purchaseRate = 0; }
        if (isNaN(taxPercent)) { taxPercent = 0; }

        // Calculate tax amount
        taxAmount = parseFloat(parseFloat(freeQty * purchaseRate * (taxPercent / 100)).toFixed(2));

        itemTotal = freeQty * purchaseRate + taxAmount;

        tableRow.children[10].textContent = "";

        tableRow.children[10].textContent = taxAmount;

        tableRow.children[11].textContent = parseFloat(parseFloat(itemTotal).toFixed(2));

        calculateTotalItemAmount();
    }

    function calculateTotalItemAmount() {

        var table = DOM.purchaseBillItemList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var totalItemAmount = 0;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                if (tableRows[tr].className.indexOf('removed-item') === -1) {

                    var tableRow = tableRows[tr];

                    totalItemAmount += parseFloat(parseFloat(tableRow.children[11].textContent).toFixed(2));
                }
            }
        }

        DOM.totalBillAmount.textContent = "";

        DOM.totalBillAmount.textContent = totalItemAmount;

        DOM.totalItemAmount.value = totalItemAmount;

        calculateAdjustedAmount();
    }

    function calculateAdjustedAmount() {

        var purchaseBillAmount = 0;
        var totalItemAmount = 0;
        var adjustedAmount = 0;

        totalItemAmount = parseFloat(DOM.totalItemAmount.value);
        purchaseBillAmount = parseFloat(DOM.purchaseBillAmount.value);

        if (isNaN(totalItemAmount)) { totalItemAmount = 0; }
        if (isNaN(purchaseBillAmount)) { purchaseBillAmount = 0; }

        adjustedAmount = parseFloat(parseFloat(purchaseBillAmount - totalItemAmount).toFixed(2));

        DOM.adjustedAmount.value = adjustedAmount;
    }

    function setFocusToSearchItem(e) {

        var tableRow = e.currentTarget.parentElement.parentElement;

        var tableBody = tableRow.parentElement;

        var tableRows = tableBody.children;

        if (tableRow.rowIndex === tableRows.length) {

            DOM.searchDrugName.focus();

        }

    }

    function validatePurchaseBillDetails() {

        var isValid = true;

        if (DOM.vendor.selectedIndex === 0) {
            DOM.vendor.focus();
            swal("Error!!!", "Please select the Vendor Name.", "error");
            isValid = false;
        }
        else if (DOM.financialYear.selectedIndex === 0) {
            DOM.financialYear.focus();
            swal("Error!!!", "Please select the Financial Year.", "error");
            isValid = false;
        }
        else if (DOM.purchaseBillNo.value === "") {
            DOM.purchaseBillNo.focus();
            swal("Error!!!", "Please enter the Purchase Bill No.", "error");
            isValid = false;
        }
        else if (DOM.purchaseBillDate.value === "") {
            DOM.purchaseBillDate.focus();
            swal("Error!!!", "Please enter the Purchase Bill Date.", "error");
            isValid = false;
        }

        return isValid;
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

Sofarch.PurchaseBill.init();
