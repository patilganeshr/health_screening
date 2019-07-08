
var Sofarch = {};

Sofarch.PurchaseBillReturn = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var PurchaseBillsReturn = [];
    var PurchaseBillReturnItems = [];
    var IsPurchaseBillRecordChanged = false;

    var CurrentFocus = -1;
    var SearchItemsList = [];

    /* ---- private method ---- */

    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.editMode = document.getElementById('EditMode');

        DOM.searchFinancialYear = document.getElementById('SearchFinancialYear');
        DOM.searchPurchaseBillNo = document.getElementById('SearchPurchaseBillNo');
        DOM.searchPurchaseBillNos = document.getElementById('SearchPurchaseBillNos');

        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.vendor = document.getElementById('Vendor');
        DOM.purchaseBillNo = document.getElementById('PurchaseBillNo');
        DOM.purchaseBillDate = document.getElementById('PurchaseBillDate');

        DOM.purchaseBillReturnNo = document.getElementById('PurchaseBillReturnNo');
        DOM.purchaseBillReturnDate = document.getElementById('PurchaseBillReturnDate');
        DOM.purchaseBillReturnDateDatePicker = document.getElementById('PurchaseBillReturnDateDatePicker');
        DOM.remarks = document.getElementById('Remarks');
        DOM.PurchaseBillReturnItemList = document.getElementById('PurchaseBillReturnItemList');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.searchPurchaseBillReturn = document.getElementById('SearchPurchaseBillReturn');
        DOM.searchOptions = document.getElementById('SearchOptions');
        DOM.searchValue = document.getElementById('SearchValue');
        DOM.search = document.getElementById('Search');

        DOM.purchaseBillReturnList = document.getElementById('PurchaseBillReturnList');

        DOM.addNewPurchaseBillReturn = document.getElementById('AddNewPurchaseBillReturn');
        DOM.showPurchaseBillReturnList = document.getElementById('ShowPurchaseBillReturnList');
        DOM.viewPurchaseBillReturn = document.getElementById('ViewPurchaseBillReturn');
        DOM.editPurchaseBillReturn = document.getElementById('EditPurchaseBillReturn');
        DOM.savePurchaseBillReturn = document.getElementById('SavePurchaseBillReturn');
        DOM.deletePurchaseBillReturn = document.getElementById('DeletePurchaseBillReturn');

        /*cache the jquery element */
        DOM.$purchaseBillReturnDateDatePicker = $('#PurchaseBillReturnDateDatePicker');
    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        DOM.$purchaseBillReturnDateDatePicker.datetimepicker({
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

        DOM.addNewPurchaseBillReturn.addEventListener('click', addNewPurchaseBillReturn);
        DOM.showPurchaseBillReturnList.addEventListener('click', checkIsRecordsAreChanged);
        DOM.viewPurchaseBillReturn.addEventListener('click', viewPurchaseBillReturn);
        DOM.editPurchaseBillReturn.addEventListener('click', editPurchaseBillReturn);
        DOM.savePurchaseBillReturn.addEventListener('click', savePurchaseBillReturn);
        DOM.deletePurchaseBillReturn.addEventListener('click', deletePurchaseBillReturn);
        //DOM.printPurchasesBill.addEventListener('click', printPurchasesBill);
        DOM.search.addEventListener('click', searchPurchaseBillReturn);

        DOM.searchPurchaseBillNo.onkeyup = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchPurchaseBillNosList(e);

        };
    }

    function loadData() {

        getFinancialYear();

        addNewPurchaseBillReturn();

    }

    function getFinancialYear() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
                    shared.setSelect2ControlsText(DOM.financialYear);

                    DOM.searchFinancialYear.innerHTML = DOM.searchFinancialYear.innerHTML + DOM.financialYear.innerHTML;
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

    function getSelectedPurchaseBillReturnDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.purchaseBillReturnList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var purchaseBillReturnId = parseInt(currentTableRow.getAttribute('data-purchase-bill-return-id'));

                if (isNaN(purchaseBillReturnId)) { purchaseBillReturnId = 0; }

                showPurchaseBillReturnDetailsById(purchaseBillReturnId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

    }

    function showSearchPurchaseBillNosList(e) {

        if (e.keyCode === 13) {
            CurrentFocus = -1;
            showPurchaseBillNosOnEnterKey(e);
            return;
        }

        var dataAttributes = [];

        var parameters = {};

        parameters = {

            Event: e,
            CurrentFocus: CurrentFocus,
            PostDataKeyValue: postMessage,
            ElementToBeAppend: DOM.searchPurchaseBillNos,
            DataAttributes: dataAttributes,
            PostParamObject: undefined,
            URL: SERVICE_PATH + "GetPurchaseBillNos/",// + DOM.searchPurchaseBillNo.value,
            DisplayName: "PurchaseBillNo"
        };

        shared.showAutoCompleteItemsList(parameters, function (response) {

            if (response !== undefined) {

                if (response >= 0) {

                    CurrentFocus = response;
                }
                else {

                    CurrentFocus = -1;

                    var autoCompleteList = response;

                    var itemsCount = autoCompleteList.length;

                    if (itemsCount) {

                        var data = "";

                        var fragment = document.createDocumentFragment();

                        var ul = document.createElement('ul');

                        ul.classList.add('list-group');

                        for (var s = 0; s < itemsCount; s++) {

                            var li = document.createElement('li');
                            var span = document.createElement('span');
                            var p = document.createElement('p');

                            li.classList.add('list-group-item');
                            li.classList.add('clearfix');

                            li.setAttribute('id', autoCompleteList[s].PurchaseBillId);

                            li.style.cursor = "pointer";
                            li.onclick = showPurchaseBillNosOnSelection;
                            span.textContent = autoCompleteList[s].PurchaseBillNo;

                            p.classList.add('list-group-item-text');
                            p.textContent = autoCompleteList[s].VendorName;

                            li.appendChild(span);
                            li.appendChild(p);

                            fragment.appendChild(li);
                        }

                        ul.appendChild(fragment);

                        DOM.searchPurchaseBillNos.appendChild(ul);

                        DOM.searchPurchaseBillNos.style.width = DOM.searchPurchaseBillNo.offsetWidth + 'px';
                        DOM.searchPurchaseBillNos.style.left = DOM.searchPurchaseBillNo.parentElement.offsetLeft + 15 + 'px';
                        //DOM.itemsList.style.top = DOM.searchDrugName.parentElement.offsetTop + 52 + 'px';

                        DOM.searchPurchaseBillNos.classList.add('autocompleteList-active');
                        //DOM.itemsList.innerHTML = data;
                    }

                }
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function showPurchaseBillNosOnSelection(e) {

        FLAG = "NEW ITEM";

        if (e.target.nodeName.toLowerCase() === "li") {
            setPurchaseBillNo(parseInt(e.target.id), e.target.children[0].textContent, e.target.children[1].textContent);
        }
        else if (e.target.nodeName.toLowerCase() === "span") {
            setPurchaseBillNo(parseInt(e.target.parentElement.id), e.target.textContent, e.target.parentElement.children[1].textContent);
        }
        else if (e.target.nodeName.toLowerCase() === "p") {
            setPurchaseBillNo(parseInt(e.target.parentElement.id), e.target.parentElement.children[0].textContent, e.target.textContent.trim());
        }

        DOM.searchPurchaseBillNo.value = "";
    }

    function showPurchaseBillNosOnEnterKey() {

        FLAG = "NEW ITEM";

        var li = DOM.searchPurchaseBillNos.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            setPurchaseBillNo(parseInt(li[0].id), li[0].children[0].textContent, li[0].getAttribute('data-purchase-bill-id'), li[0].children[1].textContent);
        }

        DOM.searchPurchaseBillNo.value = "";
    }

    function setPurchaseBillNo(purchaseBillId) {

        DOM.searchPurchaseBillNo.value = name;

        shared.closeAutoCompleteList(DOM.searchPurchaseBillNos);

        getPurchaseBillDetailsByPurchaseBillId(purchaseBillId);
    }

    function getPurchaseBillDetailsByPurchaseBillId(purchaseBillId) {

        if (purchaseBillId > 0) {

            shared.sendRequest(SERVICE_PATH + "GetPurchaseBillInfoByPurchaseBillId/" + purchaseBillId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var purchaseBillDetails = JSON.parse(response.responseText);

                        if (purchaseBillDetails !== null) {

                            bindPurchaseBillDetails(purchaseBillDetails);
                        }
                    }
                }
            });
        }
    }

    function bindPurchaseBillDetails(purchaseBillDetails) {

        DOM.purchaseBillNo.value = purchaseBillDetails.PurchaseBillNo;
        DOM.purchaseBillNo.setAttribute('data-purchase-bill-id', purchaseBillDetails.PurchaseBillId);
        DOM.purchaseBillDate.value = purchaseBillDetails.PurchaseBillDate;
        DOM.vendor.value = purchaseBillDetails.VendorName;

        getPurchaseBillItemDetailsByPurchaseBillId(purchaseBillDetails.PurchaseBillId);
    }

    function getPurchaseBillItemDetailsByPurchaseBillId(purchaseBillId) {

        if (purchaseBillId > 0) {

            shared.sendRequest(SERVICE_PATH + "GetPurchaseBillReturnItemDetailsByPurchaseBillId/" + purchaseBillId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        PurchaseBillReturnItems = JSON.parse(response.responseText);

                        if (PurchaseBillReturnItems.length) {

                            for (var b = 0; b < PurchaseBillReturnItems.length; b++) {

                                bindPurchaseBillReturnItems(PurchaseBillReturnItems[b]);
                            }
                        }
                    }
                }
            });
        }
    }

    function fillSearchOption() {

        var options = "";

        options += "<option value='-1'> Choose Search Option </option>";
        options += "<option value='PurchaseBillNo' selected='selected'> Purchase Bill No.</option>";
        options += "<option value='PurchaseBillReturnNo'> PUrchase Bill Return No. </option>";

        DOM.searchOptions.innerHTML = options;
    }

    function filterPurchaseBillReturn() {

        shared.showPanel(DOM.searchPurchaseBillReturn);

        shared.clearInputs(DOM.searchPurchaseBillReturn);

        fillSearchOption();

        if (DOM.searchPurchaseBillReturn.classList.contains("hide")) {
            DOM.searchPurchaseBillReturn.classList.remove('hide');
            DOM.searchPurchaseBillReturn.classList.add('show');
        }
        else {
            DOM.searchPurchaseBillReturn.classList.remove('show');
            DOM.searchPurchaseBillReturn.classList.add('hide');
        }

        DOM.searchValue.focus();
    }

    function searchPurchaseBillReturn() {

        shared.showLoader(DOM.loader);

        DOM.purchaseBillReturnList.tBodies[0].innerHTML = "";

        PurchaseBillsReturn.length = 0;

        var searchParmater = {
            PurchaseBillNo: null,
            WorkingPeriodId: null,
            PurchaseBillReturnNo: null
        };

        var searchParameterName = DOM.searchOptions.options[DOM.searchOptions.selectedIndex].value;
        var searchValue = DOM.searchValue.value;

        searchParmater[searchParameterName] = searchValue;

        var postData = JSON.stringify(searchParmater);

        shared.sendRequest(SERVICE_PATH + "SearchPurchaseBillsReturnAll/", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    PurchaseBills = JSON.parse(response.responseText);

                    bindPurchaseBillsReturn();
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

    function addNewPurchaseBillReturn() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearTextAreas(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        PurchaseBillsReturn.length = 0;
        PurchaseBillReturnItems.length = 0;

        DOM.purchaseBillReturnNo.setAttribute('data-purchase-bill-return-id', parseInt(0));

        var currentDate = new Date();

        DOM.purchaseBillReturnDate.value = moment(currentDate).format("DD/MMM/YYYY");

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.searchPurchaseBillNo.focus();

        shared.hideLoader(DOM.loader);
    }

    function showPurchaseBillReturnList() {

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        filterPurchaseBillReturn();

        DOM.purchaseBillReturnList.tBodies[0].innerHTML = "";
    }

    function viewPurchaseBillReturn() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedPurchaseBillReturnDetails();

        DOM.purchaseBillReturnNo.focus();

        shared.hideLoader(DOM.loader);
    }

    function editPurchaseBillReturn() {

        shared.showLoader(DOM.loader);

        shared.disableControls(DOM.editMode, false);

        getSelectedPurchaseBillReturnDetails();

        DOM.purchaseBillReturnNo.focus();

        shared.hideLoader(DOM.loader);

    }

    function deletePurchaseBillReturn() {

        shared.showLoader(DOM.loader);

        try {

            var selectedRows = getSelectedRows(DOM.purchaseBillReturnList);

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

                                if (PurchaseBillsReturn.length) {

                                    var purchaseBillReturnId = parseInt(selectedRows[r].getAttribute('data-purchase-bill-return-id'));

                                    var billReturnItems = [];

                                    var purchaseBillReturn = {};

                                    purchaseBillReturn = {
                                        PurchaseBillReturnId: purchaseBillReturnId,
                                        IsDeleted: true,
                                        DeletedBy: LOGGED_USER,
                                        DeletedByIP: IP_ADDRESS,
                                        PurchaseBillReturnItems: billReturnItems
                                    };

                                    var postData = JSON.stringify(purchaseBill);

                                    shared.sendRequest(SERVICE_PATH + 'SavePurchaseBillReturn', "POST", true, "JSON", postData, function (response) {

                                        if (response.status === 200) {

                                            if (parseInt(response.responseText) > 0) {

                                                //tableBody.removeChild(selectedRows[r]);

                                                swal({
                                                    title: "Success",
                                                    text: "Purchase Bill Return Details Deleted successfully.",
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

    function showPurchaseBillReturnDetailsById(purchaseBillReturnId) {

        DOM.PurchaseBillReturnItemList.tBodies[0].innerHTML = "";

        shared.showLoader(DOM.loader);

        // Check the purchase bills list has values
        if (PurchaseBillsReturn.length > 0) {

            var returnBills = PurchaseBillsReturn.filter(function (value, index, array) {
                return value.PurchaseBillReturnId === parseInt(purchaseBillReturnId);
            });

            if (returnBills.length > 0) {

                DOM.purchaseBillNo.value = returnBills[0].PurchaseBillNo;
                DOM.purchaseBillNo.setAttribute('data-purchase-bill-id', parseInt(returnBills[0].PurchaseBillId));
                DOM.purchaseBillDate.value = returnBills[0].PurchaseBillDate;
                DOM.vendor.value = returnBills[0].VendorName;
                DOM.purchaseBillReturnNo.value = returnBills[0].PurchaseBillReturnNo;
                DOM.purchaseBillReturnNo.setAttribute('data-purchase-bill-return-id', returnBills[0].purchaseBillReturnId);
                DOM.purchaseBillReturnDate.value = returnBills[0].PurchaseBillReturnDate;
                DOM.remarks.value = returnBills[0].Remarks;

                var billReturnItems = returnBills[0].PurchaseBillReturnItems.filter(function (value, index, array) {
                    return value.PurchaseBillReturnId === purchaseBillReturnId;
                });

                if (billReturnItems.length) {

                    FLAG = "VIEW MODE";

                    for (var bi = 0; bi < billReturnItems.length; bi++) {

                        bindPurchaseBillReturnItems(billReturnItems[bi]);
                    }

                    //calculateTotalItemAmount();

                }

                //bindBillCharges(purchaseBillId);

            }

            // Show panels
            shared.showPanel(DOM.editMode);
            shared.hidePanel(DOM.viewMode);
        }
    }

    var validatePurchaseBillReturnItemDetails = function () {

        var isValidData = true;

        var table = DOM.PurchaseBillReturnItemList;

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
                    }
                }
            }
        }

        return isValidData;
    };

    function savePurchaseBillReturnItem() {

        if (validatePurchaseBillReturnItemDetails() === true) {

            var purchaseBillItemReturnId = 0;
            var purchaseBillReturnId = 0;
            var purchaseBillItemId = 0;
            var drugId = 0;
            var returnQty = 0;

            purchaseBillReturnId = parseInt(DOM.purchaseBillReturnNo.getAttribute('data-purchase-bill-return-id'));

            var tableBody = DOM.PurchaseBillReturnItemList.tBodies[0];

            var tableRows = tableBody.children;

            if (tableRows.length) {

                for (var tr = 0; tr < tableRows.length; tr++) {

                    purchaseBillItemReturnId = parseInt(tableRows[tr].getAttribute('data-purchase-bill-item-return-id'));
                    purchaseBillItemId = parseInt(tableRows[tr].getAttribute('data-purchase-bill-item-id'));
                    drugId = parseInt(tableRows[tr].getAttribute('data-drug-id'));

                    var inputs = tableRows[tr].querySelectorAll('input[type="text"]');

                    if (inputs.length) {

                        if (parseFloat(inputs[0].value) > parseFloat(0)) {

                            returnQty = parseFloat(parseFloat(inputs[0].value).toFixed(2));

                            if (isNaN(purchaseBillItemReturnId)) { purchaseBillItemReturnId = 0; }
                            if (isNaN(purchaseBillReturnId)) { purchaseBillReturnId = 0; }
                            if (isNaN(purchaseBillItemId)) { purchaseBillItemId = 0; }
                            if (isNaN(drugId)) { drugId = parseInt(0); }

                            var billItemReturn = {};

                            billItemReturn = {
                                PurchaseBillItemReturnId: purchaseBillItemReturnId,
                                PurchaseBillReturnId: purchaseBillReturnId,
                                PurchaseBillItemId: purchaseBillItemId,
                                DrugId: drugId,
                                ReturnQty: returnQty,
                                IsDeleted: false
                            };

                            if (tableRows[tr].style.display === "none") {
                                billItemReturn.IsDeleted = true;
                                billItemReturn.DeletedBy = parseInt(LOGGED_USER);
                                billItemReturn.DeletedByIP = IP_ADDRESS;
                            }
                            else {
                                if (purchaseBillItemReturnId === parseInt(0)) {

                                    billItemReturn.CreatedBy = parseInt(LOGGED_USER);
                                    billItemReturn.CreatedByIP = IP_ADDRESS;
                                    //addSalesBillItem(billItem);
                                }
                                else {
                                    billItemReturn.ModifiedBy = parseInt(LOGGED_USER);
                                    billItemReturn.ModifiedByIP = IP_ADDRESS;
                                    //updateSalesBillItem(billItem);
                                }
                            }

                            PurchaseBillReturnItems.push(billItemReturn);
                        }
                    }
                }
            }
            else {
                swal({
                    title: "Warning",
                    text: "No Purchase Bill Items Return is entered. Please add the items.",
                    type: "warning",
                    function() {
                        DOM.searchPurchaseBillNo.focus();
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

    function getPurchaseBillReturnDetailsByPurchaseBillNo() {

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

    function unselectPurchaseBillReturnListDetails() {

        var tableBody = DOM.purchaseBillReturnList.tBodies[0];

        var checkBoxes = tableBody.querySelectorAll('.label-checkbox');

        if (checkBoxes.length > 0) {

            for (var c = 0; c < checkBoxes.length; c++) {

                checkBoxes[c].checked = false;
            }
        }
    }

    function checkIsRecordsAreChanged() {

        shared.showLoader(DOM.loader);

        if (PurchaseBillsReturn.length === 0) {
            showPurchaseBillReturnList();
        }
        else {
            if (IsPurchaseBillRecordChanged === false) {

                unselectPurchaseBillReturnListDetails();
                shared.showPanel(DOM.viewMode);
                shared.hidePanel(DOM.editMode);

                shared.hideLoader(DOM.loader);
            }
        }

        shared.hideLoader(DOM.loader);
    }

    function bindPurchaseBillsReturn() {

        shared.showLoader(DOM.loader);

        var tableBody = DOM.purchaseBillReturnList.tBodies[0];

        tableBody.innerHTML = "";

        if (PurchaseBillsReturn.length) {

            var data = "";

            for (var r = 0; r < PurchaseBillsReturn.length; r++) {

                data = data + "<tr data-purchase-bill-return-id=" + PurchaseBillsReturn[r].PurchaseBillReturnId + ">";
                data = data + "<td class='text-center'><label class='label-tick'> <input type='checkbox' id='" + PurchaseBillsReturn[r].PurchaseBillReturnId + "' class='label-checkbox' name='SelectPurchaseBillReturn' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td class='text-left'>" + PurchaseBillsReturn[r].VendorName + "</td>";
                data = data + "<td class='text-center'>" + PurchaseBillsReturn[r].PurchaseBillReturnNo + "</td>";
                data = data + "<td class='text-center'>" + PurchaseBillsReturn[r].PurchaseBillReturnDate + "</td>";
                data = data + "<td class='text-center'>" + PurchaseBillsReturn[r].TotalReturnQty + "</td>";

            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }

        shared.hideLoader(DOM.loader);
    }

    function savePurchaseBillReturn() {

        shared.showLoader(DOM.loader);

        if (validatePurchaseBillReturnDetails()) {

            /* temp variable */
            var purchaseBillReturnId = 0;
            var purchaseBillId = 0;
            var purchaseBillReturnDate = null;
            var remarks = null;
            var workingPeriodId = 0;
            var srNo = parseInt(0);

            PurchaseBillsReturn.length = 0;
            PurchaseBillReturnItems.length = 0;

            savePurchaseBillReturnItem();

            workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);
            purchaseBillReturnId = parseInt(DOM.purchaseBillReturnNo.getAttribute('data-purchase-bill-return-id'));
            purchaseBillReturnDate = DOM.purchaseBillReturnDate.value;
            purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));
            remarks = DOM.remarks.value;

            if (isNaN(purchaseBillReturnId)) { purchaseBillReturnId = parseInt(0); }
            if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }

            if (PurchaseBillReturnItems.length === 0) {
                swal("Error", "No Purchase Bill Return Items found or there might be some issue.", "error");
                return;
            }

            var purchaseBillReturn = {};

            purchaseBillReturn = {
                PurchaseBillReturnId: purchaseBillReturnId,
                PurchaseBillId: purchaseBillId,
                PurchaseBillReturnDate: purchaseBillReturnDate,
                WorkingPeriodId: workingPeriodId,
                PurchaseBillReturnItems: PurchaseBillReturnItems,
                IsDeleted: false
            };

            if (parseInt(purchaseBillReturnId) === parseInt(0)) {

                purchaseBillReturn.CreatedBy = LOGGED_USER;
                purchaseBillReturn.CreatedByIp = IP_ADDRESS;
            }
            else {

                purchaseBillReturn.ModifiedBy = LOGGED_USER;
                purchaseBillReturn.ModifiedByIP = IP_ADDRESS;
            }

            //purchaseBills.push(purchaseBill);

            var postData = JSON.stringify(purchaseBillReturn);

            shared.sendRequest(SERVICE_PATH + "SavePurchaseBillReturn", "POST", true, "JSON", postData, function (response) {

                var _response = JSON.parse(response.responseText);

                if (response.status === 200) {

                    if (parseInt(response.responseText) > parseInt(0)) {

                        swal({
                            title: "Success",
                            text: "Records Saved Successfully. Please note down the below reference no. " + response.responseText,
                            type: "success"
                        }, function () {
                            IsRecordChanged = true;
                            addNewPurchaseBillReturn();
                        });
                    }
                }
                else {
                    handleError(_response.Message + " " + _response.ExceptionMessage);
                    swal("error", "Unable to save the Purchase Bill Return. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
                }
            });

        }

        shared.hideLoader(DOM.loader);
    }

    function bindPurchaseBillReturnItems(purchaseBillItemReturn) {

        var table = DOM.PurchaseBillReturnItemList;

        var tableBody = table.tBodies[0];

        var data = "";

        if (purchaseBillItemReturn !== undefined) {

            var tableRow = document.createElement('tr');

            tableRow.setAttribute('data-purchase-bill-item-return-id', purchaseBillItemReturn.PurchaseBillItemReturnId);
            tableRow.setAttribute('data-purchase-bill-item-id', purchaseBillItemReturn.PurchaseBillItemId);
            tableRow.setAttribute('data-drug-id', purchaseBillItemReturn.DrugId);

            data += "<td class='text-center'> <button type='button' class='btn btn-sm btn-danger' id='" + purchaseBillItemReturn.DrugId + "'><i class='fa fa-fw fa-remove'></i></button></td>";
            data += "<td class='text-center'>" + purchaseBillItemReturn.DrugCode + "</td>";
            data += "<td class='text-center'>" + purchaseBillItemReturn.DrugName + "</td>";
            data += "<td class='text-center'>" + purchaseBillItemReturn.PurchaseQty + "</td>";
            data += "<td class='text-center'> <input type='text' id='" + purchaseBillItemReturn.DrugId + "' class='form-control' value='" + purchaseBillItemReturn.ReturnQty + "'/> </td>";

            tableRow.innerHTML = data;

            tableBody.appendChild(tableRow);

            addEventsToTableElements();
        }
    }

    function addEventsToTableElements() {

        var table = DOM.PurchaseBillReturnItemList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            var tableRow = tableRows[tableRows.length - 1];

            var inputs = tableRow.querySelectorAll('input[type="text"]');

            var buttons = tableRow.querySelectorAll('button');

            if (inputs.length) {

                for (var i = 0; i < inputs.length; i++) {

                    inputs[i].onkeydown = function (e) {
                        return shared.acceptDecimalNos(e);
                    };
                }
            }

            if (buttons.length) {

                for (var b = 0; b < buttons.length; b++) {

                    buttons[b].onclick = function (e) {
                        removeItem(e);
                    };
                }
            }
        }
    }

    function removeItem(e) {

        // Remove the item from the Table only if the purchase bill item id is 0
        var tableBody = DOM.PurchaseBillReturnItemList.tBodies[0];

        var tableRow = e.currentTarget.parentElement.parentElement;

        var purchaseBillItemReturnId = parseInt(tableRow.getAttribute('data-purchase-bill-item-return-id'));

        if (isNaN(purchaseBillItemReturnId)) { purchaseBillItemReturnId = parseInt(0); }

        if (purchaseBillItemReturnId === 0) {

            tableBody.removeChild(tableRow);
        }
        else {

            tableRow.classList.add('removed-item');

            tableRow.style.display = "none";
        }
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

    function validatePurchaseBillReturnDetails() {

        var isValid = true;

        if (DOM.purchaseBillReturnDate.value === "") {
            DOM.purchaseBillReturnDate.focus();
            swal("Error!!!", "Please enter the Purchase Bill Return Date.", "error");
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

Sofarch.PurchaseBillReturn.init();
