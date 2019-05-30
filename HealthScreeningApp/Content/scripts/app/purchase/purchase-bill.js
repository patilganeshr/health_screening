
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

        DOM.purchaseBillNo = document.getElementById('PurchaseBillNo');
        DOM.purchaseBillDate = document.getElementById('PurchaseBillDate');
        DOM.vendor = document.getElementById('Vendor');
        DOM.searchVendorList = document.getElementById('SearchVendorList');
        DOM.remarks = document.getElementById('Remarks');

        DOM.searchDrugName = document.getElementById('SearchDrugName');
        DOM.searchDrugList = document.getElementById('SearchDrugList');
        DOM.totalBillAmount = document.getElementById('TotalBillAmount');
        DOM.purchaseBillItemList = document.getElementById('PurchaseBillItemList');

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

        DOM.vendor.onkeyup = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchVendorList(e);

        };

        DOM.searchDrugName.onkeyup = function (e) {
            
            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchDrugList(e);
            
        };

    }

    function loadData() {

        addNewPurchaseBill();

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

        var dataAttributes = ['Drug-Id', 'Generic-Name', 'Drug-Code'];

        var parameters = {};
            
        parameters = {

            Event: e,
            CurrentFocus: CurrentFocus,
            PostDataKeyValue: postMessage,
            ElementToBeAppend: DOM.searchDrugList,
            DataAttributes: dataAttributes,
            PostParamObject: undefined,
            URL: SERVICE_PATH + "GetDrugIdAndGenericNameByName/" + DOM.searchDrugName.value,
            DisplayName: "GenericName"
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
                            li.textContent = SearchItemsList[s].GenericName;

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
            GenericName: drugName,
            BatchNo: '',
            Pack1: 0,
            Pack2: 0,
            FreeQty: 0,
            RatePerPack1: 0,
            TaxPercent: 0,
            TaxAmount: 0,
            ItemAmount :0
        };

        bindPurchaseBillItems(purchaseBillItems);

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

                                    //bills = PurchaseBills.filter(function (value, index, array) {
                                    //    return value.PurchaseBillId === purchaseBillId;
                                    //});

                                    //if (bills.length) {

                                    //    bills[0].IsDeleted = true;
                                    //    bills[0].DeletedBy = parseInt(LOGGED_USER);
                                    //    bills[0].DeletedByIP = IP_ADDRESS;

                                    //    if (bills[0].PurchaseBillLItems !== null) {

                                    //        var billItems = bills[0].PurchaseBillItems.filter(function (value, index, array) {
                                    //            return value.PurchaseBillId === purchaseBillId && value.IsDeleted === false;
                                    //        });

                                    //        if (billItems.length) {

                                    //            for (var bi = 0; bi < billItems.length; bi++) {
                                    //                billItems[bi].PurchaseBillItemId = billItems[bi].PurchaseBillItemId;
                                    //                billItems[bi].IsDeleted = true;
                                    //                billItems[bi].DeletedBy = parseInt(LOGGED_USER);
                                    //                billItems[bi].DeletedByIP = IP_ADDRESS;
                                    //            }

                                    //            bills[0].PurchaseBillItems = billItems;
                                    //        }
                                    //    }

                                    //    if (bills[0].PurchaseBillCharges !== null) {
                                    //        var billCharges = bills[0].PurchaseBillCharges.filter(function (value, index, array) {
                                    //            return value.PurchaseBillId === purchaseBillId;
                                    //        });

                                    //        if (billCharges.length) {

                                    //            for (var bc = 0; bc < billCharges.length; bc++) {

                                    //                billCharges[0].IsDeleted = true;
                                    //                billCharges[0].DeletedBy = parseInt(LOGGED_USER);
                                    //                billCharges[0].DeletedByIP = IP_ADDRESS;

                                    //                bills[0].PurchaseBillCharges = billCharges;
                                    //            }
                                    //        }
                                    //    }



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
                DOM.remarks.value = bills[0].Remarks;

                var billItems = bills[0].PurchaseBillItems.filter(function (value, index, array) {
                    return value.PurchaseBillId === purchaseBillId;
                });

                if (billItems.length) {

                    FLAG = "VIEW MODE";

                    for (var bi = 0; bi < billItems.length; bi++) {

                        bindPurchaseBillItems(billItems[bi]);
                    }
                }
                
                //bindBillCharges(purchaseBillId);

            }

            // Show panels
            shared.showPanel(DOM.editMode);
            shared.hidePanel(DOM.viewMode);
        }

    }

    function getItemDetailsByItemId() {

        if (DOM.searchByPurchaseBillNo.value !== undefined) {

            shared.showLoader(DOM.loader);

            var itemId = parseInt(0);
            var purchaseBillItemId = parseInt(0);

            itemId = parseInt(DOM.searchItem.getAttribute('data-item-id'));

            if (itemId > 0) {

                shared.sendRequest(SERVICE_PATH + "GetItemDetailsForPurchaseByItemId/" + itemId, "GET", true, "JSON", null, function (response) {

                    shared.showLoader(DOM.loader);

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            var res = JSON.parse(response.responseText);

                            if (res.ItemName === null) {
                                DOM.searchItem.value = "";
                                DOM.searchItem.removeAttribute('data-item-id');
                                swal({
                                    title: "Error",
                                    text: "No Item Found.",
                                    type: "error"
                                }, function () {
                                    shared.hideLoader(DOM.loader);
                                    DOM.searchItem.focus();
                                });
                            }
                            else if (res.ItemName !== undefined) {

                                res.PurchaseBillItemId = parseInt(0);
                                res.PurchaseQty = parseFloat(1);
                                res.CashDiscountPercent = parseFloat(0);
                                res.GSTRateId = parseInt(0);
                                res.TaxId = parseInt(0);
                                res.GSTRate = parseFloat(0);
                                res.TotalItemAmount = parseFloat(0);

                                addNewPurchaseBillItem(res);
                            }
                        }
                    }
                });
            }

            //set focus
            DOM.purchaseBillList.focus();

            shared.hideLoader(DOM.loader);

        }

        return false;
    }

    function editPurchaseBillItem(currentTableRow) {

        shared.clearInputs(DOM.purchaseBillItemEditMode);

        shared.clearTextAreas(DOM.purchaseBillItemEditMode);

        shared.disableControls(DOM.purchaseBillItemEditMode, false);

        showSelectedItemDetails(currentTableRow);
    }

    function deletePurchaseBillItem(currentTableRow) {

        var table = DOM.purchaseBillItemList;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var purchaseBillItemId = currentTableRow.getAttribute('data-purchase-bill-item-id');

        if (purchaseBillItemId === 0) {
            tableBody.removeChild(currentTableRow);
        }
        else {
            var purchaseBillItem = {};

            purchaseBillItem = {
                PurchaseBillItemId: purchaseBillItemId,
                DeletedBy: LOGGED_USER,
                DeletedByIp: IP_ADDRESS
            };

            var postData = JSON.stringify(purchaseBillItem);

            shared.sendRequest(SERVICE_PATH + 'DeletePurchaseBillItem', "POST", true, "JSON", postData, function (response) {
                if (response.status === 200) {
                    if (response.responseText === "true") {
                        tableBody.removeChild(currentTableRow);
                    }
                }
            });
        }
    }

    function setFocus() {
        DOM.$purchaseBillItemModal.on('shown.bs.modal', function () {
            DOM.item.focus();
        });
    }

    function checkIsItemExists() {

        var isItemExists = false;

        var purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));

        if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }

        if (purchaseBillId === 0) {

            if (purchaseBillItems.length > 0) {

                var itemId = parseInt(DOM.searchItem.getAttribute('data-item-id'));

                var itemsList = purchaseBillItems.filter(function (value, index, array) {
                    return value.ItemId === itemId && value.IsDeleted === false;
                });

                if (itemsList.length > 0) {
                    isItemExists = true;
                }
            }
        }

        return isItemExists;
    }

    function validatePurchaseBillItemDetails() {
        return true;
    }

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

                        if (parseFloat(inputs[5].value) > parseFloat(0)) {
                            drugId = parseInt(tableRows[tr].getAttribute('data-drug-id'));
                            batchNo = inputs[1].value;
                            pack1 = inputs[2].value;
                            pack2 = inputs[3].value;
                            freeQty = parseFloat(parseFloat(inputs[4].value).toFixed(2));
                            ratePerPack1 = parseFloat(parseFloat(inputs[5].value).toFixed(2));
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
            getPurchaseBills();
        }
        else {
            if (IsPurchaseBillRecordChanged === false) {

                unselectPurchaseBillListDetails();
                shared.showPanel(DOM.viewMode);
                shared.hidePanel(DOM.editMode);

                shared.hideLoader(DOM.loader);
            }
        }

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

                data = data + "<tr data-purchase-bill-id=" + PurchaseBills[r].PurchaseBillId + " data-vendor-id=" + PurchaseBills[r].VendorId + ">";
                data = data + "<td class='text-center'><label class='label-tick'> <input type='checkbox' id='" + PurchaseBills[r].PurchaseBillId + "' class='label-checkbox' name='SelectPurchaseBill' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td class='text-left'>" + PurchaseBills[r].VendorName + "</td>";
                data = data + "<td class='text-center'>" + PurchaseBills[r].PurchaseBillNo + "</td>";
                data = data + "<td class='text-center'>" + PurchaseBills[r].PurchaseBillDate + "</td>";
                data = data + "<td class='text-center'>" + PurchaseBills[r].TotalBillQty + "</td>";
                data = data + "<td class='text-right'>" + PurchaseBills[r].TotalBillAmount + "</td>";

            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }

        shared.hideLoader(DOM.loader);
    }

    function savePurchaseBill() {

        shared.showLoader(DOM.loader);

        if (validatePurchaseBillDetails()) {

            /* temp variable */
            var purchaseBillId = 0;
            var purchaseBillNo = null;
            var purchaseBillDate = null;
            var vendorId = 0;
            var remarks = null;
            var srNo = parseInt(0);

            PurchaseBills.length = 0;
            PurchaseBillItems.length = 0;
            
            purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));
            purchaseBillNo = DOM.purchaseBillNo.value;
            purchaseBillDate = DOM.purchaseBillDate.value;
            vendorId = parseInt(DOM.vendor.getAttribute('data-client-address-id'));
            remarks = DOM.remarks.value;

            savePurchaseBillItem();

            if (PurchaseBillItems.length === 0) {
                shared.hideLoader(DOM.loader);
                return;
            }

            //if (purchaseBillItems.length === 0) {
            //    swal({
            //        title: "Warning",
            //        text: "No Purchase Bill Items is entered. Please add the items.",
            //        type: "warning",
            //        function() {
            //            DOM.searchItem.focus();
            //            return false;
            //        }
            //    });
            //}

            if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }
            if (isNaN(vendorId)) { vendorId = parseInt(0); }
            
            srNo = getMaxSrNo(PurchaseBills, 0);

            var purchaseBill = {};

            purchaseBill = {
                PurchaseBillId: purchaseBillId,
                PurchaseBillNo: purchaseBillNo,
                PurchaseBillDate: purchaseBillDate,
                VendorId: vendorId,
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

        shared.hideLoader(DOM.loader);
    }

    var checkIsDrugNameExistsInTable = function (drugId) {

        shared.showLoader(DOM.loader);

        var isItemExists = false;

        var table = DOM.purchaseBillItemList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var i = 0; i < tableRows.length; i++) {
                if (parseInt(tableRows[i].getAttribute('data-drug-id')) === drugId) {
                    isItemExists = true;
                    break;
                }
            }
        }

        shared.hideLoader(DOM.loader);

        return isItemExists;
    };

    function validateInput(e) {
        return shared.acceptDecimalNos(e);
    }

    function removeBillItem(e) {

        // Remove the item from the Table only if the sales bill item id is 0
        var tableBody = DOM.purchaseBillItemList.tBodies[0];

        var tableRows = tableBody.children;

        var tableRow = e.currentTarget.parentElement.parentElement;

        var purchaseBillItemId = parseInt(tableRow.getAttribute('data-purchase-bill-item-id'));

        if (isNaN(purchaseBillItemId)) { purchaseBillItemId = parseInt(0); }

        tableRow.classList.add('removed-item');

        //setTimeout(function() {
            tableRow.style.display = "none";
        //}, 100);

        //tableBody.removeChild(tableRow);
        
        // Mark the Item as Deleted if the sales bill item id is > 0
        if (purchaseBillItems.length) {
            for (var i = 0; i < purchaseBillItems.length; i++) {
                if (purchaseBillItems[i].PurchaseBillItemId === purchaseBillItemId) {
                    purchaseBillItems[i].IsDeleted = true;
                    purchaseBillItems[i].DeletedBy = parseInt(LOGGED_USER);
                    purchaseBillItems[i].DeletedByIP = IP_ADDRESS;
                    break;
                }
            }
        }

        showGSTBreakup();
        showTotalBillAmount();

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

        if (purchaseBillItems.GenericName !== "") {

            var data = "";

            var tr = document.createElement('tr');

            tr.setAttribute('data-purchase-bill-item-id', purchaseBillItems.PurchaseBillItemId);
            tr.setAttribute('data-drug-id', purchaseBillItems.DrugId);
            
            data += "<td>" +
                "<button type='button' id=RemoveItem_'" + rowIndex + "' class='btn btn-xs btn-danger btn-round' >" +
                "<span class='fa fa-fw fa-remove'></span> </button>" + "</td >";
            data = data + "<td> <input type='text' class='form-control input-md' id='DrugCode_" + rowIndex + "' value='" + purchaseBillItems.DrugCode + "' /> </td>";
            data = data + "<td> " + purchaseBillItems.GenericName + "</td>";
            data = data + "<td> <input type='text' class='form-control input-md' id='BatchNo_" + rowIndex + "' value='" + purchaseBillItems.BatchNo + "' /> </td>";
            data = data + "<td> <input type='text' class='form-control input-md' id='Pack1_" + rowIndex + "' value='" + purchaseBillItems.Pack1 + "' /> </td>";
            data = data + "<td> <input type='text' class='form-control input-md' id='Pack2_" + rowIndex + "' value='" + purchaseBillItems.Pack2 + "' /> </td>";
            data = data + "<td> <input type='text' class='form-control input-md' id='FreeQty_" + rowIndex + "' value='" + purchaseBillItems.FreeQty + "' /> </td>";
            data = data + "<td> <input type='text' class='form-control input-md' id='RatePerPack1_" + rowIndex + "' value='" + purchaseBillItems.RatePerPack1 + "'/> </td>";
            data = data + "<td> <input type='text' class='form-control input-md' id='TaxPercent_" + rowIndex + "' value='" + purchaseBillItems.TaxPercent + "'/> </td>";
            data = data + "<td> " + purchaseBillItems.TaxAmount + " </td>";
            data = data + "<td> " + purchaseBillItems.ItemAmount + " </td>";

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

            if (selects.length) {

                for (var s = 0; s < selects.length; s++) {

                    $(selects[s]).select2();

                }
            }

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

        var purchaseBillId = parseInt(tableRow.getAttribute('data-purchase-bill-id'));

        if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }

        tableBody.removeChild(tableRow);
        
        // Mark the Item as Deleted if the inward goods id is > 0
        if (PurchaseBillItems.length) {

            if (purchaseBillId > 0) {

                for (var i = 0; i < PurchaseBillItems.length; i++) {

                    if (PurchaseBillItems[i].PurchaseBillId === purchaseBillId) {
                        PurchaseBillItems[i].IsDeleted = true;
                        PurchaseBillItems[i].DeletedBy = parseInt(LOGGED_USER);
                        PurchaseBillItems[i].DeletedByIP = IP_ADDRESS;
                        break;
                    }
                }
            }
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

        tableRow.children[9].textContent = "";

        tableRow.children[9].textContent = taxAmount;

        tableRow.children[10].textContent = itemTotal;

        DOM.totalBillAmount.textContent = "";

        DOM.totalBillAmount.textContent = itemTotal;
    }

    function setFocusToSearchItem(e) {

        var tableRow = e.currentTarget.parentElement.parentElement;

        var tableBody = tableRow.parentElement;

        var tableRows = tableBody.children;

        if (tableRow.rowIndex === tableRows.length) {

            DOM.searchDrugName.focus();

        }
        
    }

    var getBillChargesTotalAmount = function () {

        var totalChargeAmount = 0;

        var table = DOM.billChargesList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                if (tableRows[tr].style.display !== "none") {

                    totalChargeAmount += parseFloat(tableRows[tr].children[5].innerText);
                }
            }
        }

        return totalChargeAmount;
    };

    function validatePurchaseBillDetails() {

        var isValid = true;

        if (DOM.vendor.selectedIndex === 0) {
            DOM.vendor.focus();
            swal("Error!!!", "Please select the Vendor Name.", "error");
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
        
    function addNewBillCharge() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.billChargesEditMode);
        shared.clearTextAreas(DOM.billChargesEditMode);
        shared.clearSelect(DOM.billChargesEditMode);
        shared.clearTables(DOM.billChargesEditMode);

        DOM.billChargeAmount.value = "0";
        DOM.billChargeGSTRate.value = "0";
        DOM.billChargeGSTAmount.value = "0";
        DOM.billChargeTotalAmount.value = "0";

        shared.showPanel(DOM.billChargesEditMode);
        shared.hidePanel(DOM.billChargesViewMode);

        DOM.billChargeName.focus();

        shared.hideLoader(DOM.loader);
    }

    function viewBillCharges() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.billChargesEditMode);
            shared.clearSelect(DOM.billChargesEditMode);
            shared.disableControls(DOM.billChargesEditMode, true);

            var selectedRows = getSelectedRows(DOM.billChargesList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var purchaseBillChargeId = parseInt(currentTableRow.getAttribute('data-purchase-bill-charge-id'));

                    if (isNaN(purchaseBillChargeId)) { purchaseBillChargeId = 0; }

                    DOM.purchaseBillChargeId.value = purchaseBillChargeId;

                    showSelectedBillChargeDetails(purchaseBillId);
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

    function editBillCharge() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.billChargesEditMode);
            shared.clearSelect(DOM.billChargesEditMode);
            shared.disableControls(DOM.billChargesEditMode, false);
                    
            var selectedRows = getSelectedRows(DOM.billChargesList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var purchaseBillChargeId = parseInt(currentTableRow.getAttribute('data-purchase-bill-charge-id'));
                    var billChargeId = parseInt(currentTableRow.getAttribute('data-bill-charge-id'));

                    if (isNaN(purchaseBillChargeId)) { purchaseBillChargeId = 0; }

                    if (isNaN(billChargeId)) { billChargeId = 0; }

                    DOM.purchaseBillChargeId.value = purchaseBillChargeId;
                    
                    showBillCharges(purchaseBillChargeId, billChargeId);
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

    function deleteBillCharges() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.billChargesList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.billChargesList);

            var selectedRowsCount = selectedRows.length;

            if (selectedRowsCount > 0) {

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

                            for (var r = 0; r < selectedRowsCount; r++) {

                                if (selectedRows[r].PurchaseBillChargeId === 0) {
                                    tableBody.removeChild(selectedRows[r]);
                                }
                                else {

                                    var purchaseBillId = 0;
                                    var purchaseBillChargeId = 0;
                                    var billChargeId = 0;
                                    var message = null;

                                    purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));
                                    purchaseBillChargeId = parseInt(selectedRows[r].getAttribute('data-purchase-bill-charge-id'));
                                    billChargeId = parseInt(selectedRows[r].getAttribute('data-bill-charge-id'));

                                    if (purchaseBillCharges.length) {

                                        var purchaseBillChargesCount = purchaseBillCharges.length;

                                        for (var c = 0; c < purchaseBillChargesCount; c++) {

                                            if (purchaseBillChargeId > 0) {

                                                if (purchaseBillCharges[c].PurchaseBillId === purchaseBillId &&
                                                    purchaseBillCharges[c].PurchaseBillChargeId === purchaseBillChargeId
                                                    && purchaseBillCharges[c].ChargeId === billChargeId
                                                    && purchaseBillCharges[c].IsDeleted === false) {

                                                    purchaseBillCharges[c].PurchaseBillId = purchaseBillId;
                                                    purchaseBillCharges[c].PurchaseBillChargeId = purchaseBillChargeId;
                                                    purchaseBillCharges[c].IsDeleted = true;
                                                    purchaseBillCharges[c].DeletedBy = LOGGED_USER;
                                                    purchaseBillCharges[c].DeletedByIP = IP_ADDRESS;
                                                }
                                            }
                                            else {

                                                if (parseInt(purchaseBillCharges[c].PurchaseBillId) === purchaseBillId
                                                    && parseInt(purchaseBillCharges[c].ChargeId) === billChargeId) {
                                                    purchaseBillCharges.splice(i, 1);

                                                }
                                            }

                                            swal({
                                                title: "Success",
                                                text: "Purchase Bill Charges Removed successfully. Click on top Save button to Update the Records once you finished updation of Bill Charges.",
                                                type: "success"
                                            }, function () {
                                                bindBillCharges(purchaseBillId);
                                            });
                                        }

                                        shared.hideLoader(DOM.loader);
                                    }
                                }
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

    function showBillCharges(purchaseBillChargeId, billChargeId) {

        shared.showLoader(DOM.loader);

        if (purchaseBillCharges.length > 0) {

            //var purchaseBillChargeId = parseInt(currentTableRow.getAttribute('data-purchase-bill-charge-id'));

            //var srNo = parseInt(currentTableRow.getAttribute('data-sr-no'));

            //DOM.purchaseBillChargesSrNo.value = srNo;

            //DOM.purchaseBillChargeId.value = purchaseBillChargeId;

            var billCharges = purchaseBillCharges.filter(function (value, index, array) {
                return value.PurchaseBillChargeId === purchaseBillChargeId
                    && value.ChargeId === parseInt(billChargeId);
            });

            if (billCharges.length > 0) {

                shared.setSelectValue(DOM.billChargeName, null, parseInt(billCharges[0].ChargeId));
                shared.setSelect2ControlsText(DOM.billChargeName);
                DOM.billChargeAmount.value = billCharges[0].ChargeAmount;
                if (billCharges[0].IsTaxInclusive === true) {
                    DOM.billChargeTaxInclusive.checked = true;
                }
                else {
                    DOM.billChargeTaxExclusive.checked = true;
                }
                DOM.billChargeGSTRate.value = billCharges[0].GSTRate;
                DOM.billChargeGSTAmount.value = billCharges[0].GSTAmount;
                DOM.billChargeTotalAmount.value = billCharges[0].ChargeTotalAmount;
                
                shared.showPanel(DOM.billChargesEditMode);
                shared.hidePanel(DOM.billChargesViewMode);
            }
        }

        shared.hideLoader(DOM.loader);
    }

    function addBillCharge(billCharge) {

        shared.showLoader(DOM.loader);

        var srNo = getMaxSrNo(purchaseBillCharges, 0);

        var purchaseBillCharge = {};

        purchaseBillCharge = {
            PurchaseBillChargeId: billCharge.PurchaseBillChargeId,
            PurchaseBillId: billCharge.PurchaseBillId,
            ChargeId: billCharge.ChargeId,
            ChargeName: billCharge.ChargeName,
            ChargeAmount: billCharge.ChargeAmount,
            IsTaxInclusive: billCharge.IsTaxInclusive,
            TaxableValue: billCharge.TaxableValue,
            GSTRateId: billCharge.GSTRateId,
            TaxId: billCharge.TaxId,
            GSTRate: billCharge.GSTRate,
            GSTAmount: billCharge.GSTAmount,
            BillChargeTotalAmount: billCharge.BillChargeTotalAmount,
            Remarks: billCharge.Remarks,
            SrNo: srNo,
            CreatedBy: parseInt(LOGGED_USER),
            CreatedByIP: IP_ADDRESS,
            IsDeleted: false
        };

        purchaseBillCharges.push(purchaseBillCharge);

        shared.hideLoader(DOM.loader);
    }

    function updateBillCharge(billCharge) {

        shared.showLoader(DOM.loader);

        var billChargesCount = purchaseBillCharges.length;

        if (billChargesCount > 0) {

            for (var r = 0; r < billChargesCount; r++) {

                if (purchaseBillCharges[r].PurchaseBillChargeId === billCharge.PurchaseBillChargeId
                    && purchaseBillCharges[r].ChargeId === billCharge.ChargeId) {

                    purchaseBillCharges[r].PurchaseBillChargeId = billCharge.PurchaseBillChargeId;
                    purchaseBillCharges[r].PurchaseBillId = billCharge.PurchaseBillId;
                    purchaseBillCharges[r].ChargeId = billCharge.ChargeId;
                    purchaseBillCharges[r].ChargeName = billCharge.ChargeName;
                    purchaseBillCharges[r].ChargeAmount = billCharge.ChargeAmount;
                    purchaseBillCharges[r].TaxId = billCharge.TaxId;
                    purchaseBillCharges[r].GSTRate = billCharge.GSTRate;
                    purchaseBillCharges[r].GSTAmount = billCharge.GSTAmount;
                    purchaseBillCharges[r].BillChargeTotalAmount = billCharge.BillChargeTotalAmount;
                    purchaseBillCharges[r].SrNo = billCharge.SrNo;
                    purchaseBillCharges[r].GSTRateId = billCharge.GSTRateId;
                    purchaseBillCharges[r].Remarks = billCharge.Remarks;
                    purchaseBillCharges[r].IsDeleted = false;

                    if (purchaseBillCharges[r].PurchaseBillChargeId === 0) {
                        purchaseBillCharges[r].CreatedBy = parseInt(LOGGED_USER);
                        purchaseBillCharges[r].CreatedByIP = IP_ADDRESS;
                    }
                    else {
                        purchaseBillCharges[r].ModifiedBy = parseInt(LOGGED_USER);
                        purchaseBillCharges[r].ModifiedByIP = IP_ADDRESS;
                    }

                    break;
                }
            }
        }

        shared.hideLoader(DOM.loader);
    }

    function getBillCharges() {

        shared.showPanel(DOM.billChargesViewMode);
        shared.hidePanel(DOM.billChargesEditMode);
    }
        
    var validateBillCharges = function () {

        var isValid = true;

        return isValid;
    };

    function bindBillCharges(purchaseBillId) {

        shared.showLoader(DOM.loader);

        var table = DOM.billChargesList;

        var tableBody = table.tBodies[0];
        var tableFooter = table.tFoot;

        tableBody.innerHTML = "";
        tableFooter.innerHTML = "";

        if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }

        if (purchaseBillCharges.length > 0) {

            var billCharges = purchaseBillCharges.filter(function (value, index, array) {
                return value.PurchaseBillId === parseInt(purchaseBillId) &&
                    value.IsDeleted === false;
            });

            var itemsCount = billCharges.length;

            if (itemsCount > 0) {

                var totalChargeAmount = parseFloat(0);
                var totalTaxableValue = parseFloat(0);
                var totalGSTAmount = parseFloat(0);
                var totalBillChargeAmount = parseFloat(0);

                var data = "";
                
                for (var r = 0; r < itemsCount; r++) {

                    data = data + "<tr data-purchase-bill-charge-id=" + billCharges[r].PurchaseBillChargeId + " data-bill-charge-id=" + billCharges[r].ChargeId + ">";
                    data = data + "<td class='text-center'><label class='label-tick'> <input type='checkbox' id='" + billCharges[r].PurchaseBillChargeId + "' class='label-checkbox' name='SelectPurchaseBillCharge' /> <span class='label-text'></span> </label>" + "</td>";
                    data = data + "<td>" + billCharges[r].ChargeName + "</td>";
                    data = data + "<td class='text-center'>" + billCharges[r].ChargeAmount + "</td>";
                    data = data + "<td class='text-center'>" + billCharges[r].GSTRate + "</td>";
                    data = data + "<td class='text-center'>" + billCharges[r].GSTAmount + "</td>";
                    data = data + "<td class='text-center'>" + billCharges[r].BillChargeTotalAmount + "</td>";

                    totalChargeAmount += parseFloat(billCharges[r].ChargeAmount);
                    totalTaxableValue += parseFloat(billCharges[r].TaxableValue);
                    totalGSTAmount += parseFloat(billCharges[r].GSTAmount);
                    totalBillChargeAmount += parseFloat(billCharges[r].BillChargeTotalAmount);
                }

                tableBody.innerHTML = data;

                var footerRow = document.createElement('tr');
                footerRow.classList.add('bg-amber-100');

                var footerData = '';

                footerData += "<td class='text-center text-bold text-size-medium'></td>";
                footerData += "<td class='text-center text-bold text-size-medium'> Total </td>";
                footerData += "<td class='text-center text-bold text-size-medium'>" + totalChargeAmount + "</td>";
                footerData += "<td class='text-center text-bold text-size-medium'></td>";
                footerData += "<td class='text-center text-bold text-size-medium'>" + totalGSTAmount + "</td>";
                footerData += "<td class='text-center text-bold text-size-medium'>" + totalBillChargeAmount + "</td>";
                footerData += "<td class='text-center text-bold text-size-medium'></td>";

                footerRow.innerHTML = footerData;

                tableFooter.appendChild(footerRow);
            }

            shared.showPanel(DOM.billChargesViewMode);
            shared.hidePanel(DOM.billChargesEditMode);
        }

        showTotalBillAmount();

        shared.hideLoader(DOM.loader);
    }

    function saveAndAddNewBillCharge() {

        saveBillCharge();

        addNewBillCharge();

        DOM.billChargeName.focus();
    }

    function calculateGSTOnBillChargeAmount() {

        shared.showLoader(DOM.loader);

        var billChargeAmount = 0;
        var gstRate = 0;
        var gstAmount = 0;
        var taxableValue = 0;

        var response = getGSTRateAsPerGSTCategoryId(function (response) {

            if (response) {

                billChargeAmount = parseFloat(parseFloat(DOM.billChargeAmount.value).toFixed(2));

                DOM.billChargeGSTRate.value = response.Rate;
                DOM.billChargeGSTRate.setAttribute('data-tax-id', response.TaxId);
                DOM.billChargeGSTRate.setAttribute('data-gst-rate-id', response.GSTRateId);

                if (DOM.billChargeTaxInclusive.checked) {
                    taxableValue = shared.roundOff(billChargeAmount * (100 / (response.Rate + 100)),2);
                }
                else {
                    taxableValue = billChargeAmount;
                }

                gstAmount = shared.roundOff(taxableValue * (response.Rate / 100), 2);

                DOM.billChargeGSTAmount.value = gstAmount;
                DOM.billChargeGSTAmount.setAttribute('data-taxable-value', taxableValue);
                DOM.billChargeTotalAmount.value = shared.roundOff(taxableValue + gstAmount, 2);
            }
        });

        shared.hideLoader(DOM.loader);
    }

    var getGSTRateAsPerGSTCategoryId = function (callback) {

        shared.showLoader(DOM.loader);

        var gstRate = 0;
        var gstCategoryId = parseInt(0);

        var gstRateDetails = {};

        gstCategoryId = parseInt(DOM.billChargeName.options[DOM.billChargeName.selectedIndex].getAttribute('data-gstcategoryid'));

        if (isNaN(gstCategoryId)) { gstCategoryId = 0; }

        if (gstCategoryId > 0) {

            gstRateDetails = {
                GSTCategoryId: gstCategoryId,
                GSTApplicable: GSTApplicable,
                EffectiveFromDate: DOM.purchaseBillDate.value
            };

            var postData = JSON.stringify(gstRateDetails);

            shared.sendRequest(SERVICE_PATH + "GetGSTRateByGSTCategoryIdGSTApplicableAndEffectiveDate/", "POST", true, "JSON", postData, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res.Rate >= 0) {
                            callback(res);
                        }
                    }
                }
            });
        }

        shared.hideLoader(DOM.loader);

    };
    
    function saveBillCharge() {

        if (validateBillCharges() === true) {

            var purchaseBillChargeId = parseInt(0);
            var purchaseBillId = parseInt(0);
            var billChargeId = parseInt(0);
            var billChargeName = null;
            var isTaxInclusive = true;
            var billChargeGSTRate = parseFloat(0);
            var billChargeGSTAmount = parseFloat(0);
            var taxableValue = 0;
            var billChargeTotalAmount = parseFloat(0);
            var taxId = parseInt(0);
            var gstRateId = parseInt(0);
            var srNo = parseInt(0);
            var flag = "add";

            purchaseBillChargeId = parseInt(DOM.purchaseBillChargeId.value);
            purchaseBillId = parseInt(DOM.purchaseBillNo.getAttribute('data-purchase-bill-id'));
            billChargeId = parseInt(DOM.billChargeName.options[DOM.billChargeName.selectedIndex].value);
            billChargeName = DOM.billChargeName.options[DOM.billChargeName.selectedIndex].text;
            if (DOM.billChargeTaxInclusive.checked === true) {
                isTaxInclusive = true;
            }
            else {
                isTaxInclusive = false;
            }
            billChargeAmount = parseFloat(DOM.billChargeAmount.value);
            billChargeGSTRate = parseFloat(parseFloat(DOM.billChargeGSTRate.value).toFixed(2));
            billChargeGSTAmount = parseFloat(parseFloat(DOM.billChargeGSTAmount.value).toFixed(2));
            taxableValue = parseFloat(DOM.billChargeGSTAmount.getAttribute('data-taxable-value'));
            billChargeTotalAmount = parseFloat(parseFloat(DOM.billChargeTotalAmount.value).toFixed(2));
            taxId = parseInt(DOM.billChargeGSTRate.getAttribute('data-tax-id'));
            gstRateId = parseInt(DOM.billChargeGSTRate.getAttribute('data-gst-rate-id'));
            srNo = 0; //parseInt(DOM.purchaseBillChargesSrNo.value);
            
            if (isNaN(purchaseBillChargeId)) { purchaseBillChargeId = parseInt(0); }
            if (isNaN(purchaseBillId)) { purchaseBillId = parseInt(0); }
            if (isNaN(billChargeId)) { billChargeId = parseInt(0); }
            if (isNaN(taxId)) { taxId = parseInt(0); }
            if (isNaN(gstRateId)) { gstRateId = parseInt(0); }
            if (isNaN(srNo)) { srNo = parseInt(0); }

            var billChargesCount = purchaseBillCharges.length;

            if (billChargesCount > 0) {

                for (var c = 0; c < billChargesCount; c++) {

                    if (purchaseBillCharges[c].PurchaseBillChargeId === purchaseBillChargeId &&
                        purchaseBillCharges[c].ChargeId === billChargeId && purchaseBillCharges[c].IsDeleted === false ) {

                        flag = "update";

                        break;
                    }
                }
            }

            var billCharge = {};

            billCharge = {
                PurchaseBillChargeId: purchaseBillChargeId,
                PurchaseBillId: purchaseBillId,
                ChargeId: billChargeId,
                ChargeName: billChargeName,
                ChargeAmount: billChargeAmount,
                IsTaxInclusive: isTaxInclusive,
                GSTRateId: gstRateId,
                TaxId: taxId,
                TaxableValue: taxableValue,
                GSTRate: billChargeGSTRate,
                GSTAmount: billChargeGSTAmount,
                BillChargeTotalAmount: billChargeTotalAmount,
                Remarks: null,
                SrNo: srNo,
                IsDeleted: false
            };

            if (flag === "add") {

                addBillCharge(billCharge);
            }
            else {

                updateBillCharge(billCharge);
            }

            bindBillCharges(purchaseBillId);
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

Sofarch.PurchaseBill.init();
