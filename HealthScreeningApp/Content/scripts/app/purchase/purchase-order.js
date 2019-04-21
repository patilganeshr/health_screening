var SharpiTech = {};

SharpiTech.PurchaseOrder = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var PURCHASE_ORDERS = {};
    var PURCHASE_ORDER_ITEMS = [];
    var UNIT_OF_MEASUREMENTS = [];
    var SEARCH_ITEMS_LIST = [];
    var CURRENT_FOCUS = -1;


    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.editMode = document.getElementById('EditMode');

        DOM.searchPanel = document.getElementById('SearchPanel');
        DOM.searchByFinancialYear = document.getElementById('SearchByFinancialYear');
        DOM.searchByVendor = document.getElementById('SearchByVendor');
        DOM.searchByPurchaseBillNo = document.getElementById('SearchByPurchaseBillNo');
        DOM.searchByPurchaseBillNoButton = document.getElementById('SearchByPurchaseBillNoButton');

        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.companyName = document.getElementById('CompanyName');
        DOM.branch = document.getElementById('Branch');
        DOM.purchaseOrderNo = document.getElementById('PurchaseOrderNo');
        DOM.purchaseOrderDate = document.getElementById('PurchaseOrderDate');
        DOM.purchaseOrderDateDatePicker = document.getElementById('PurchaseOrderDateDatePicker');
        DOM.vendor = document.getElementById('Vendor');
        DOM.vendorReferenceNo = document.getElementById('VendorReferenceNo');
        DOM.vendorList = document.getElementById('VendorList');
        DOM.addNewVendor = document.getElementById('AddNewVendor');
        DOM.refreshVendorList = document.getElementById('RefreshVendorList');
        DOM.paymentTerms = document.getElementById('PaymentTerms');
        DOM.noOfDaysForPayment = document.getElementById('NoOfDaysForPayment');
        DOM.discountRate = document.getElementById('DiscountRate');
        DOM.paymentDays = document.getElementById('PaymentDays');
        DOM.expectedDeliveryDate = document.getElementById('ExpectedDeliveryDate');

        DOM.searchItemName = document.getElementById('SearchItemName');
        DOM.itemsList = document.getElementById('ItemsList');
        DOM.purchaseOrderItemsList = document.getElementById('PurchaseOrderItemsList');
        DOM.itemsTotalSummary = document.getElementById('ItemsTotalSummary');
        DOM.orderRemarks = document.getElementById('OrderRemarks');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.filterOption = document.getElementById('FilterOption');
        DOM.filterYear = document.getElementById('FilterYear');
        DOM.purchaseOrderList = document.getElementById('PurchaseOrderList');

        DOM.addNewPurchaseOrder = document.getElementById('AddNewPurchaseOrder');
        DOM.showPurchaseOrderList = document.getElementById('ShowPurchaseOrderList');
        DOM.viewPurchaseOrder = document.getElementById('ViewPurchaseOrder');
        DOM.editPurchaseOrder = document.getElementById('EditPurchaseOrder');
        DOM.savePurchaseOrder = document.getElementById('SavePurchaseOrder');
        DOM.deletePurchaseOrder = document.getElementById('DeletePurchaseOrder');
        DOM.sendMail = document.getElementById('SendMail');
        DOM.printPurchasesOrder = document.getElementById('PrintPurchasesOrder');

        /*cache the jquery element */
        DOM.$purchaseOrderDateDatePicker = $('#PurchaseOrderDateDatePicker');
        DOM.$expectedDeliveryDateDatePicker = $('#ExpectedDeliveryDateDatePicker');

    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        var deliveryDate = new Date() + 30;

        DOM.$purchaseOrderDateDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

        DOM.$expectedDeliveryDateDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(deliveryDate).format("DD/MMM/YYYY")
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


    function bindEvents() {

        //DOM.searchByPurchaseBillNoButton.addEventListener('click', getPurchaseBillDetailsByPurchaseBillNo);

        DOM.addNewPurchaseOrder.addEventListener('click', addNewPurchaseOrder);
        DOM.showPurchaseOrderList.addEventListener('click', showPurchaseOrderList);
        DOM.viewPurchaseOrder.addEventListener('click', viewPurchaseOrder);
        DOM.editPurchaseOrder.addEventListener('click', editPurchaseOrder);
        DOM.savePurchaseOrder.addEventListener('click', savePurchaseOrder);
        DOM.deletePurchaseOrder.addEventListener('click', deletePurchaseOrder);
        //DOM.printPurchasesOrder.addEventListener('click', printPurchasesOrder);
        //DOM.sendMail.addEventListener('click', sendMail);


        DOM.companyName.onchange = function () {
            getBranchName(1);
        };

                DOM.vendor.onkeyup = function (e) {
            //getKey(e.keyCode);

            if (CURRENT_FOCUS === undefined) { CURRENT_FOCUS = -1; }
            //if (e.keyCode === 8 || e.keyCode === 127) {
            //    DOM.itemName.value = "";                
            //}
            //setTimeout(function () {
            getVendorList(e);
            //}, 1000);            

        };

        DOM.searchItemName.onkeyup = function (e) {
            //getKey(e.keyCode);

            if (CURRENT_FOCUS === undefined) { CURRENT_FOCUS = -1; }
            //if (e.keyCode === 8 || e.keyCode === 127) {
            //    DOM.itemName.value = "";                
            //}
            //setTimeout(function () {
                showItemsList(e);
            //}, 1000);            
            
        };

    }

    function loadData() {

        getFinancialYear();
        getCompany();
        getBranchName();
        getUnitOfMeasurements();
        getPaymentTerms();

        addNewPurchaseOrder();
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

    function getCompany() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllCompanies', DOM.companyName, "CompanyName", "CompanyId", "Choose Company", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.companyName, parseInt(2));
                    shared.setSelect2ControlsText(DOM.companyName);

                    getBranchName(0);
                }
            }
        });

        //shared.hideLoader(DOM.loader);
    }

    function getBranchName(branchId) {

        shared.showLoader(DOM.loader);

        DOM.branch.options.length = 0;

        if (DOM.companyName.selectedIndex > 0) {

            var companyId = parseInt(DOM.companyName.options[DOM.companyName.selectedIndex].value);

            if (isNaN(companyId)) { companyId = parseInt(0); }

            if (companyId > 0) {

                shared.fillDropdownWithCallback(SERVICE_PATH + 'GetBranchesByCompanyId/' + companyId, DOM.branch, "BranchName", "BranchId", "Choose Branch", function (response) {

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            if (branchId > 0) {
                                shared.setSelectValue(DOM.branch, null, branchId);
                                shared.setSelect2ControlsText(DOM.branch);
                            }
                            else {
                                shared.setSelectOptionByIndex(DOM.branch, parseInt(1));
                                shared.setSelect2ControlsText(DOM.branch);
                            }
                        }
                    }
                });
            }
        }

        shared.hideLoader(DOM.loader);
    }

   function getPaymentTerms() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllPaymentTerms', DOM.paymentTerms, "TermShortDesc", "PaymentTermId", "Choose Payment Terms", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.paymentTerms, parseInt(10));
                    shared.setSelect2ControlsText(DOM.paymentTerms);

                    //DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                }
            }
        });

        //shared.hideLoader(DOM.loader);
    }

    function getUnitOfMeasurements() {

        shared.showLoader(DOM.loader);

        UNIT_OF_MEASUREMENTS.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllUnitsOfMeasurement", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                var res = JSON.parse(response.responseText);

                UNIT_OF_MEASUREMENTS = res;
                
            }
        });

        shared.hideLoader(DOM.loader);
    }

    function bindUnitOfMeasurements(element, value) {

        if (UNIT_OF_MEASUREMENTS.length) {

            shared.fillDropdownWithArrayData(UNIT_OF_MEASUREMENTS, element, "UnitCode", "UnitOfMeasurementId", "Choose UoM");

        }

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

    function getVendorList(e) {

        if (e.keyCode === 13) {
            CURRENT_FOCUS = -1;
            showVendorNameOnEnterKey(e);
            return;
        }

        var dataAttributes = ['Client-Address-Id', 'Client-Address-Name'];

        var parameters = {};

        parameters = {

            Event: e,
            CurrentFocus: CURRENT_FOCUS,
            PostDataKeyValue: postMessage,
            ElementToBeAppend: DOM.vendorList,
            DataAttributes: dataAttributes,
            PostParamObject: undefined,
            URL: SERVICE_PATH + "SearchClientAddressNameByClientAddressName/" + DOM.vendor.value + "/",
            DisplayName: "ClientAddressName"
        };

        shared.showAutoCompleteItemsList(parameters, function (response) {
            //e, CurrentFocus, undefined, DOM.customerList, CustomerList, , function (response) {

            if (response !== undefined) {

                if (response >= 0) {

                    CURRENT_FOCUS = response;
                }
                else {
                                        
                    CURRENT_FOCUS = -1;

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

                        DOM.vendorList.appendChild(ul);

                        DOM.vendorList.style.width = e.target.offsetWidth + 'px';
                        DOM.vendorList.style.left = 0;//e.target.offsetParent.offsetLeft + 15 + 'px';

                        DOM.vendorList.classList.add('autocompleteList-active');
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
       
        var li = DOM.vendorList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            setVendorName(li[0].textContent, li[0].id);
        }

    }

    function setVendorName(name, id) {

        DOM.vendor.value = name;
        DOM.vendor.setAttribute('data-client-address-id', id);

        shared.closeAutoCompleteList(DOM.vendorList);

        DOM.vendor.focus();
    }


    function showItemsList(e) {

        if (e.keyCode === 13) {
            CURRENT_FOCUS = -1;
            showItemNameOnEnterKey(e);
            return;
        }

        var dataAttributes = ['Item-Id', 'Item-Name'];

        var parameters = {};
            
        parameters = {

            Event: e,
            CurrentFocus: CURRENT_FOCUS,
            PostDataKeyValue: postMessage,
            ElementToBeAppend: DOM.itemsList,
            DataAttributes: dataAttributes,
            PostParamObject: "ItemName",
            URL: SERVICE_PATH + "SearchItem/",
            DisplayName: "ItemName"
        };

        shared.showAutoCompleteItemsList(parameters, function (response) {

            if (response !== undefined) {

                if (response >= 0) {

                    CURRENT_FOCUS = response;
                }
                else {

                    CURRENT_FOCUS = -1;


                    SEARCH_ITEMS_LIST = response;

                    var itemsCount = SEARCH_ITEMS_LIST.length;

                    if (itemsCount) {

                        var data = "";

                        var fragment = document.createDocumentFragment();

                        var ul = document.createElement('ul');

                        ul.classList.add('list-group');

                        for (var s = 0; s < itemsCount; s++) {

                            var li = document.createElement('li');

                            li.classList.add('list-group-item');
                            li.classList.add('clearfix');

                            li.setAttribute('id', SEARCH_ITEMS_LIST[s].ItemId);
                            li.setAttribute('data-unit-of-measurement-id', SEARCH_ITEMS_LIST[s].UnitOfMeasurementId);
                            li.setAttribute('data-unit-code', SEARCH_ITEMS_LIST[s].UnitCode);

                            li.style.cursor = "pointer";
                            li.onclick = showItemNameOnSelection;
                            li.textContent = SEARCH_ITEMS_LIST[s].ItemName;

                            fragment.appendChild(li);

                            //data = data + "<li class='list-group-item clearfix'" +
                            //    "data-item-id=" + itemsList[s].ItemId + " data-unit-of-measurement-id=" + itemsList[s].UnitOfMeasurementId +
                            //    "style='padding:0px;'> <label class='label-tick'>" +
                            //    "<input type='checkbox' class='label-checkbox' id=Item_" + itemsList[s].ItemId + " checked='false' />" +
                            //    "<span class='label-text'></span> </label>" + itemsList[s].ItemName + "</li>";
                        }

                        ul.appendChild(fragment);

                        DOM.itemsList.appendChild(ul);

                        DOM.itemsList.style.width = DOM.searchItemName.offsetWidth + 'px';
                        DOM.itemsList.style.left = DOM.searchItemName.parentElement.offsetLeft + 15 + 'px';
                        //DOM.itemsList.style.top = DOM.searchItemName.parentElement.offsetTop + 52 + 'px';

                        DOM.itemsList.classList.add('autocompleteList-active');
                        //DOM.itemsList.innerHTML = data;
                    }

                }
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function addActive(e) {

        removeActive();

        var li = DOM.itemsList.querySelectorAll('li');

        var count = li.length;

        if (CURRENT_FOCUS >= count) {
            CURRENT_FOCUS = 0;
        }

        if (CURRENT_FOCUS < 0) {
            CURRENT_FOCUS = count - 1;
        }

        li[CURRENT_FOCUS].classList.add('autocompleteListItem-active');

        var liHeight = parseInt(li[CURRENT_FOCUS].offsetHeight);

        var liTop = parseInt(li[CURRENT_FOCUS].offsetTop);

        var diff = liHeight * CURRENT_FOCUS - liTop;

        DOM.itemsList.scrollTop = liHeight * CURRENT_FOCUS - diff;

        
    }

    function removeActive() {

        var li = DOM.itemsList.querySelectorAll('li');

        var count = li.length;

        if (count) {

            for (var l = 0; l < count; l++) {

                li[l].classList.remove('autocompleteListItem-active');
            }
        }

    }

    function setItem(e) {

        FLAG = "NEW ITEM";

        //var element = elementName;

        DOM.searchItemName.value = e.target.textContent;

        closeAutoCompleteList();

        var itemId = e.target.id;
        var itemName = e.target.textContent;
        var unitCode = e.target.getAttribute('data-unit-code');
        var unitOfMeasurementId = e.target.getAttribute('data-unit-of-measurement-id');

        bindItemDetails(itemId, itemName, unitCode, unitOfMeasurementId);

        DOM.searchItemName.value = "";
    }

    function setItemOnEnter() {

        FLAG = "NEW ITEM";

        var li = DOM.itemsList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            DOM.searchItemName.value = li[0].textContent;

            closeAutoCompleteList();
        }

        var itemId = li[0].id;
        var itemName = li[0].textContent;
        var unitCode = li[0].getAttribute('data-unit-code');
        var unitOfMeasurementId = li[0].getAttribute('data-unit-of-measurement-id');

        bindItemDetails(itemId, itemName, unitCode, unitOfMeasurementId);

        DOM.searchItemName.value = "";
    }

    function closeAutoCompleteList() {

        DOM.itemsList.classList.remove('autocompleteList-active');

        var ul = DOM.itemsList.querySelectorAll('ul');

        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        while (DOM.itemsList.firstChild) {
            DOM.itemsList.removeChild(DOM.itemsList.firstChild);
        }

    }

    function showItemNameOnSelection(e) {

        FLAG = "NEW ITEM";

        setItemName(e);

        DOM.searchItemName.value = "";
    }

    function showItemNameOnEnterKey() {

        FLAG = "NEW ITEM";
       
        var li = DOM.itemsList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            setItemName(li[0]);
        }

        DOM.searchItemName.value = "";
    }

    function setItemName(e) {

        DOM.searchItemName.value = name;
        
        shared.closeAutoCompleteList(DOM.itemsList);

        DOM.searchItemName.focus();

        var itemId = 0;
        var itemName = "";
        var unitCode = "";
        var unitOfMeasurementId = "";
        var purchaseOrderItems = {};



        if (e.nodeName === undefined) {
            itemId = e.target.id;
            itemName = e.target.textContent;
            unitCode = e.target.getAttribute('data-unit-code');
            unitOfMeasurementId = e.target.getAttribute('data-unit-of-measurement-id');
        }
        else {
            itemId = e.id;
            itemName = e.textContent;
            unitCode = e.getAttribute('data-unit-code');
            unitOfMeasurementId = e.getAttribute('data-unit-of-measurement-id');
        }

        purchaseOrderItems = {
            PurchaseOrderItemId: 0,
            NoOfBales: 0,
            ItemId: itemId,
            ItemName: itemName,
            FabricCutOutLength: 0,
            OrderQty: 1,
            UnitCode: unitCode,
            UnitOfMeasurementId: unitOfMeasurementId,
            OrderRate: 0,
            Discount: 0,
            ItemAmount: 0
        };


        bindItemDetails(purchaseOrderItems);

    }


    function bindItemDetails(purchaseOrderItems) {

        var table = DOM.purchaseOrderItemsList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var rowsCount = tableRows.length;

        var rowIndex = rowsCount;
                
        if (rowsCount === 0) {
            tableBody.innerHTML = "";
        }

        if (FLAG === "NEW ITEM") {

            if (purchaseOrderItems.ItemName !== "") {

                for (var r = 0; r < rowsCount; r++) {

                    if (parseInt(tableRows[r].getAttribute('data-item-id')) === parseInt(purchaseOrderItems.ItemId)) {
                        DOM.itemName.value = "";
                        DOM.itemName.focus();
                        swal("Error", "This item is alredy exists.", "error");
                        return;
                    }
                }
            }
        }

        if (purchaseOrderItems.ItemName !== "") {

            var data = "";

            var tr = document.createElement('tr');

            tr.setAttribute('data-purchase-order-item-id', purchaseOrderItems.PurchaseOrderItemId);
            tr.setAttribute('data-item-id', purchaseOrderItems.ItemId);
            tr.setAttribute('data-unit-of-measurement-id', purchaseOrderItems.UnitOfMeasurementId);

            data += "<td>" +
                "<button type='button' id=RemoveItem_'" + rowIndex + "' class='btn btn-xs btn-danger btn-round' >" +
                "<span class='fa fa-fw fa-remove'></span> </button>" + "</td >";
            data = data + "<td> <input type='text' class='form-control input-md' id='NoOfBales_" + rowIndex + "' value='" + purchaseOrderItems.NoOfBales + "' /> </td>";
            data = data + "<td> " + purchaseOrderItems.ItemName + "</td>";
            data = data + "<td> <input type='text' class='form-control input-md' id='FabricCutLength_" + rowIndex + "' value='" + purchaseOrderItems.FabricCutOutLength + "' /> </td>";
            data = data + "<td> <input type='text' class='form-control input-md' id='OrderQty_" + rowIndex + "' value='" + purchaseOrderItems.OrderQty + "' /> </td>";
            data = data + "<td> " + purchaseOrderItems.UnitCode + "</td>";
            data = data + "<td> <input type='text' class='form-control input-md' id='OrderRate_" + rowIndex + "' value='" + purchaseOrderItems.OrderRate + "'/> </td>";
            data = data + "<td> <input type='text' class='form-control input-md' id='Discount_" + rowIndex + "' value='" + purchaseOrderItems.Discount + "'/> </td>";
            data = data + "<td> " + purchaseOrderItems.ItemAmount + " </td>";

            tr.innerHTML = data;

            tableBody.appendChild(tr);

            var buttons = tableBody.querySelectorAll('button');

            if (buttons.length) {

                for (var b = 0; b < buttons.length; b++) {
                    buttons[b].onclick = removeItem;
                }
            }

            addEvents();
        }
    }
       
    function addEvents() {

        var tableBody = DOM.purchaseOrderItemsList.tBodies[0];

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

                    if (inputs[i].id.toLowerCase().indexOf('noofbales') === 0) {

                        inputs[i].onkeydown = function (e) {
                            return shared.acceptDecimalNos(e);
                        };
                    }
                    else if (inputs[i].id.toLowerCase().indexOf('fabriccutoutlength') === 0) {
                        inputs[i].onkeydown = function (e) {
                            return shared.acceptDecimalNos(e);
                        };
                    }
                    else if (inputs[i].id.toLowerCase().indexOf('orderqty') === 0) {
                        inputs[i].onkeydown = function (e) {
                            return shared.acceptDecimalNos(e);
                        };
                        inputs[i].onblur = function () {

                            calculateItemAmount(tableRow);
                        };
                    }
                    else if (inputs[i].id.toLowerCase().indexOf('orderrate') === 0) {
                        inputs[i].onkeydown = function (e) {
                            return shared.acceptDecimalNos(e);
                        };
                        inputs[i].onblur = function () {

                            calculateItemAmount(tableRow);
                        };
                    }
                    else if (inputs[i].id.toLowerCase().indexOf('discount') === 0) {
                        inputs[i].onkeydown = function (e) {
                            return shared.acceptDecimalNos(e);
                        };
                        inputs[i].onblur = function () {

                            calculateItemAmount(tableRow);

                            if (tableRow.nextSibling === null) {
                                DOM.searchItemName.focus();
                            }
                        };
                    }
                }

            }
        }
    }

    function removeItem(e) {

        // Remove the item from the Table only if the sales bill item id is 0
        var tableBody = DOM.purchaseOrderItemsList.tBodies[0];

        //var tableRows = tableBody.children;

        var tableRow = e.currentTarget.parentElement.parentElement;

        var purchaseOrderId = parseInt(tableRow.getAttribute('data-purchase-order-id'));

        if (isNaN(purchaseOrderId)) { purchaseOrderId = parseInt(0); }

        //tableRow.classList.add('removed-item');

        //setTimeout(function() {
        //    tableRow.style.display = "none";
        //}, 100);

        tableBody.removeChild(tableRow);
        
        // Mark the Item as Deleted if the inward goods id is > 0
        if (PURCHASE_ORDER_ITEMS.length) {

            if (purchaseOrderId > 0) {

                for (var i = 0; i < PURCHASE_ORDER_ITEMS.length; i++) {

                    if (PURCHASE_ORDER_ITEMS[i].PurchaseOrderId === purchaseOrderId) {
                        PURCHASE_ORDER_ITEMS[i].IsDeleted = true;
                        PURCHASE_ORDER_ITEMS[i].DeletedBy = parseInt(LOGGED_USER);
                        PURCHASE_ORDER_ITEMS[i].DeletedByIP = IP_ADDRESS;
                        break;
                    }
                }
            }
        }

    }

    function calculateItemAmount(tableRow) {

        var orderQtyInput = tableRow.querySelectorAll('input[id*=OrderQty]');

        var orderRateInput = tableRow.querySelectorAll('input[id*=OrderRate]');

        var discountInput = tableRow.querySelectorAll('input[id*=Discount]');
        
        var orderQty = parseFloat(orderQtyInput[0].value);
        var orderRate = parseFloat( orderRateInput[0].value);
        var discount = parseFloat(discountInput[0].value);
        var itemTotal = 0;


        if (isNaN(orderQty)) { orderQty = 0; }
        if (isNaN(orderRate)) { orderRate = 0; }
        if (isNaN(discount)) { discount = 0; }

        
        itemTotal = orderQty * orderRate;

        tableRow.children[8].textContent = itemTotal;

        calculateItemSummary();
        
    }

    function calculateItemSummary() {

        var tableBody = DOM.purchaseOrderItemsList.tBodies[0];

        var tableRows = tableBody.children;

        var subTotal = 0;

        var GSTAmount = 0;

        var orderAmount = 0;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                var tableCells = tableRows[tr].children;

                var lastTableCell = tableCells[tableCells.length - 1];

                var itemAmount = parseFloat(lastTableCell.textContent);

                subTotal = parseFloat(subTotal) + itemAmount;
                GSTAmount = 0;
                orderAmount = subTotal + GSTAmount;
            }

            var spans = DOM.itemsTotalSummary.querySelectorAll('span');

            if (spans.length) {

                spans[0].textContent = subTotal;
                spans[1].textContent = GSTAmount;
                spans[2].textContent = orderAmount;

            }

        }

    }
    //var getTableHeaderCaptions = function () {

    //    var cols = [];

    //    var tableHead = DOM.purchaseOrderItemsList.tHead;

    //    var tableHeadCells = tableHead.children;

    //    if (tableHeadCells.length) {

    //        for (var th = 0; th < tableHeadCells.length; th++) {

    //            cols.push(tableHeadCells[th].textContent)
    //        }
    //    }

    //    return cols;
    //};

    //var tableHeaders = function () {

    //    var cols = ['NoOfBales', 'ItemName', 'OrderQty', 'UoM', 'OrderRate', 'Discount', 'Item Total'];

    //    return cols;
    //};

    //var inputList = function () {

    //    var inputList = {};

    //    var cols = tableHeaders();

    //    if (cols.length) {

    //        for (var c = 0; c < cols.length; c++) {

    //            inputList['NoOfBales'] = 'INPUT';
    //            inputList['ItemName'] = 'INPUT';
    //            inputList['OrderQty'] = 'INPUT';
    //            inputList['UoM'] = 'SELECT';
    //            inputList['OrderRate'] = 'INPUT';
    //            inputList['Discount'] = 'INPUT';
    //            inputList['ItemTotal'] = undefined;
    //        }
    //    }

    //};

    //var createTableRow = function () {

    //    return document.createElement('tr');
    //};


    //var createTableCell = function () {
    //    return document.createElement('td');
    //};

    //var createElement = function (typeOfElement, id, name, cssClass, dataAttributes) {

    //    var element = document.createElement(typeOfElement);

    //    element.setAttribute('id', id);
    //    element.setAttribute('name', name);

    //    if (cssClass !== null) {
    //        element.classList.add(cssClass);
    //    }

    //    if (dataAttributes.length) {

    //        for (var d = 0; d < dataAttributes.lenght; d++) {

    //            element.setAttribute('data-' + dataAttributes[d], dataAttributes[d][0]);
    //        }
    //    }
    //};

    function getPurchaseOrders() {

        shared.showLoader(DOM.loader);

        PURCHASE_ORDERS.length = 0;
        PURCHASE_ORDER_ITEMS.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllPurchaseOrders", "GET", true, "JSON", null, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res !== undefined) {

                        if (res.length > 0) {

                            PURCHASE_ORDERS = res;
                        
                            bindPurchaseOrders();
                        }
                    }
                }
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function bindPurchaseOrders() {

        shared.showLoader(DOM.loader);

        var tableBody = DOM.purchaseOrderList.tBodies[0];

        tableBody.innerHTML = "";

        if (PURCHASE_ORDERS.length) {

            var data = "";

            for (var r = 0; r < PURCHASE_ORDERS.length; r++) {

                data = data + "<tr data-purchase-order-id=" + PURCHASE_ORDERS[r].PurchaseOrderId + ">";
                data = data + "<td class='col-sm-1 text-center'><label class='label-tick'> <input type='checkbox' id='" + PURCHASE_ORDERS[r].PurchaseOrderId + "' class='label-checkbox' name='SelectPurchaseOrder' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td class='col-sm-1 text-center'>" + PURCHASE_ORDERS[r].PurchaseOrderNo + "</td>";
                data = data + "<td class='col-sm-1 text-center'>" + PURCHASE_ORDERS[r].PurchaseOrderDate + "</td>";
                data = data + "<td class='col-sm-2 text-center'>" + PURCHASE_ORDERS[r].VendorName + "</td>";
                data = data + "<td class='col-sm-1 text-center'>" + PURCHASE_ORDERS[r].VendorReferenceNo + "</td>";
                data = data + "<td class='col-sm-1 text-center'>" + PURCHASE_ORDERS[r].TotalNoOfBales + "</td>";
                data = data + "<td class='col-sm-1 text-center'>" + PURCHASE_ORDERS[r].TotalOrderQty + "</td>";
                data = data + "<td class='col-sm-1 text-center'>" + PURCHASE_ORDERS[r].UnitCode + "</td>";
                data = data + "<td class='col-sm-1 text-right'>" + PURCHASE_ORDERS[r].TotalOrderAmount + "</td>";
                data = data + "<td class='col-sm-2 text-center'>" + PURCHASE_ORDERS[r].OrderStatus + "</td>";

            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }

        shared.hideLoader(DOM.loader);
    }

    function showPurchaseOrderDetails(purchaseOrderId) {

        DOM.purchaseOrderItemsList.tBodies[0].innerHTML = "";

        shared.showLoader(DOM.loader);

        // Check the purchase orders list has values
        if (PURCHASE_ORDERS.length > 0) {

            var orders = PURCHASE_ORDERS.filter(function (value, index, array) {
                return value.PurchaseOrderId === parseInt(purchaseOrderId);
            });

            if (orders.length > 0) {

                shared.setSelectValue(DOM.financialYear, null, parseInt(orders[0].WorkingPeriodId));
                shared.setSelect2ControlsText(DOM.financialYear);
                shared.setSelectValue(DOM.companyName, null, parseInt(orders[0].CompanyId));
                shared.setSelect2ControlsText(DOM.companyName);                
                getBranchName(parseInt(orders[0].BranchId));
                DOM.purchaseOrderNo.value = orders[0].PurchaseOrderNo;
                DOM.purchaseOrderNo.setAttribute('data-purchase-order-id', parseInt(purchaseOrderId));
                DOM.purchaseOrderDate.value = orders[0].PurchaseOrderDate;
                shared.setSelectValue(DOM.branch, null, parseInt(orders[0].BranchId));
                shared.setSelect2ControlsText(DOM.branch);
                DOM.vendor.value = orders[0].VendorName;
                DOM.vendor.setAttribute('data-vendor-id', orders[0].VendorId);
                DOM.vendorReferenceNo.value = orders[0].VendorReferenceNo;
                shared.setSelectValue(DOM.paymentTerms, null, parseInt(orders[0].PaymentTermId));
                shared.setSelect2ControlsText(DOM.paymentTerms);
                DOM.discountRate.value = orders[0].DiscountRateForPayment;
                DOM.paymentDays = orders[0].DiscountApplicableBeforePaymentDays;
                DOM.noOfDaysForPayment = orders[0].NoOfDaysForPayment;
                DOM.orderRemarks.value = orders[0].Remarks;

                getItemDetails(orders[0], purchaseOrderId);
            }

            // Show panels
            shared.showPanel(DOM.editMode);
            shared.hidePanel(DOM.viewMode);
        }

    }

    function getItemDetails(orders, purchaseOrderId) {

        if ( orders.PurchaseOrderItems.length) {

            var orderItems = orders.PurchaseOrderItems.filter(function (value, index, array) {
                return value.PurchaseOrderId === parseInt(purchaseOrderId);
            });

            if (orderItems.length) {

                for (var oi = 0; oi < orderItems.length; oi++) {

                    FLAG = "VIEW ITEM";

                    bindItemDetails(orderItems[oi]);
                }
            }

        }
    }

    var validateData = function () {

        var isValid = true;

        if (DOM.financialYear.selectedIndex === 0) {

            DOM.financialYear.focus();
            isValid = false;
            swal("Error", "Please select Financial Year.", "error");

        }
        else if (DOM.companyName.selectedIndex === 0) {

            DOM.companyName.focus();
            isValid = false;
            swal("Error", "Please select Company Name.", "error");

        }
        else if (DOM.branch.selectedIndex === 0) {

            DOM.branch.focus();
            isValid = false;
            swal("Error", "Please select Branch.", "error");

        }
        else if (DOM.purchaseOrderDate.value === "") {

            DOM.purchaseOrderDate.focus();
            isValid = false;
            swal("Error", "Please enter Purchase Order Date.", "error");

        }
        else if (DOM.vendor.value === "") {

            DOM.vendor.focus();
            isValid = false;
            swal("Error", "Please enter the Vendor Name.", "error");

        }
        else if (DOM.vendor.getAttribute('data-client-address-id') === 0) {

            DOM.vendor.focus();
            isValid = false;
            swal("Error", "Please check Vendor Name is properly selected from the List.", "error");

        }
        else if (DOM.paymentTerms.selectedIndex === 0) {

            DOM.paymentTerms.focus();
            isValid = false;
            swal("Error", "Please select the Paymen Terms.", "error");

        }
        else if (DOM.expectedDeliveryDate.value === "") {

            DOM.expectedDeliveryDate.focus();
            isValid = false;
            swal("Error", "Please enter the Expected Delivery Date.", "error");

        }

        return isValid;
    };

    function validateOrderItems(data) {

        var IsDataValid = true;

        if (data !== null) {

            for (var key in data) {

                for (var d = 0; d < data.length; d++) {

                    if (data[d][key] === 0) {

                        IsDataValid = false;
                        swal("Error", "Please enter the " + key, "error");
                    }
                }
            }

            return IsDataValid;
        }

    }

    function addNewPurchaseOrder() {

        shared.showLoader(DOM.loader);

        //DOM.searchPanel.style.display = "none";

        shared.clearInputs(DOM.editMode);
        shared.clearTextAreas(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        PURCHASE_ORDERS.length = 0;
        PURCHASE_ORDER_ITEMS.length = 0;
        
        DOM.purchaseOrderNo.setAttribute('data-purchase-order-id', parseInt(0));
        //DOM.totalBillAmount.innerHTML = "";


        // Set default values
        shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
        shared.setSelect2ControlsText(DOM.financialYear);

        shared.setSelectOptionByIndex(DOM.companyName, parseInt(2));
        shared.setSelect2ControlsText(DOM.companyName);

        getBranchName(1);

        var currentDate = new Date();

        DOM.purchaseOrderDate.value = moment(currentDate).format("DD/MMM/YYYY");

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.vendor.focus();

        //addRowsToItemsList();

        shared.hideLoader(DOM.loader);
    }

    function showPurchaseOrderList() {

        shared.showLoader(DOM.loader);

        shared.showPanel(DOM.viewMode);

        shared.hidePanel(DOM.editMode);

        getPurchaseOrders();

        shared.hideLoader(DOM.loader);
    }

    function viewPurchaseOrder() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);

            shared.disableControls(DOM.editMode, true);

            var selectedRows = getSelectedRows(DOM.purchaseOrderList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var purchaseOrderId = parseInt(currentTableRow.getAttribute('data-purchase-order-id'));

                    if (isNaN(purchaseOrderId)) { purchaseOrderId = 0; }

                    //DOM.purchaseOrderId.value = purchaseOrderId;

                    showPurchaseOrderDetails(purchaseOrderId);
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

    function editPurchaseOrder() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);

            shared.disableControls(DOM.editMode, false);

            var controls = [
                DOM.financialYear
            ];

            shared.disableSpecificControls(controls, true);

            var selectedRows = getSelectedRows(DOM.purchaseOrderList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var purchaseOrderId = parseInt(currentTableRow.getAttribute('data-purchase-order-id'));

                    if (isNaN(purchaseOrderId)) { purchaseOrderId = 0; }

                    //DOM.purchaseOrderId.value = purchaseOrderId;

                    showPurchaseOrderDetails(purchaseOrderId);
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
        DOM.purchaseOrderNo.focus();
    }

    function deletePurchaseOrder() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.purchaseOrderList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.purchaseOrderList);

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

                                var orders = [];

                                if (PURCHASE_ORDERS.length) {

                                    var purchaseOrderId = parseInt(selectedRows[r].getAttribute('data-purchase-order-id'));

                                    orders = PURCHASE_ORDERS.filter(function (value, index, array) {
                                        return value.PurchaseOrderId === purchaseOrderId;
                                    });

                                    if (orders.length) {

                                        var orderItems = purchaseOrderItems.filter(function (value, index, array) {
                                            return value.PurchaseOrderId === purchaseOrderId && value.IsDeleted === false;
                                        });

                                        orders[0].IsDeleted = true;
                                        orders[0].DeletedBy = parseInt(LOGGED_USER);
                                        orders[0].DeletedByIP = IP_ADDRESS;

                                        if (orderItems.length) {

                                            for (var bi = 0; bi < orderItems.length; bi++) {
                                                orderItems[bi].IsDeleted = true;
                                                orderItems[bi].DeletedBy = parseInt(LOGGED_USER);
                                                orderItems[bi].DeletedByIP = IP_ADDRESS;
                                            }

                                            orders[0].PurchaseOrderItems = orderItems;
                                        }
                                    }

                                    var purchaseOrder = {};

                                    purchaseOrder = {
                                        PurchaseOrderId: purchaseOrderId,
                                        IsDeleted: true,
                                        DeletedBy: LOGGED_USER,
                                        DeletedByIP: IP_ADDRESS,
                                        PurchaseOrderItems: orderItems
                                    };

                                    var postData = JSON.stringify(purchaseOrder);

                                    shared.sendRequest(SERVICE_PATH + 'SavePurchaseOrder', "POST", true, "JSON", postData, function (response) {

                                        if (response.status === 200) {

                                            if (parseInt(response.responseText) > 0) {

                                                //tableBody.removeChild(selectedRows[r]);

                                                swal({
                                                    title: "Success",
                                                    text: "Purchase Order Details Deleted successfully.",
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

    function savePurchaseOrderItems() {

        var purchaseOrderId = 0;
        var purchaseOrderItemid = 0;
        var itemId = 0;
        var noOfBales = 0;
        var orderQty = 0;
        var unitOfMeasurementId = 0;
        var orderRate = 0;
        var fabricCutoutLength = 0;

        var tableBody = DOM.purchaseOrderItemsList.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                purchaseOrderItemId = tableRows[tr].getAttribute('data-purchase-order-item-id');

                var inputs = tableRows[tr].querySelectorAll('input[type="text"]');

                if (inputs.length) {

                    if (parseFloat(inputs[2].value) > 0) {

                        purchaseOrderItemid = parseInt(tableRows[tr].getAttribute('data-purchase-order-item-id'));
                        purchaseOrderId = parseInt(DOM.purchaseOrderNo.getAttribute('data-purchase-order-id'));
                        noOfBales = parseInt(inputs[0].value);
                        fabricCutoutLength = parseInt(inputs[1].value);
                        itemId = parseInt(tableRows[tr].getAttribute('data-item-id'));
                        orderQty = parseFloat(inputs[2].value);
                        unitOfMeasurementId = parseInt(tableRows[tr].getAttribute('data-unit-of-measurement-id'));
                        orderRate = parseFloat(inputs[3].value);
                        

                        if (isNaN(purchaseOrderItemid)) { purchaseOrderItemid = 0; }
                        if (isNaN(purchaseOrderId)) { purchaseOrderId = 0; }
                        if (isNaN(noOfBales)) { noOfBales = 0; }
                        if (isNaN(itemId)) { itemId = 0; }
                        if (isNaN(orderQty)) { orderQty = 0; }
                        if (isNaN(unitOfMeasurementId)) { unitOfMeasurementId = 0; }

                        var dataValidation = {
                            NoOfBales: noOfBales,
                            ItemId: itemId,
                            OrderQty: orderQty,
                            UnitOfMeasurementId: unitOfMeasurementId
                        };

                        //if (validateOrderItems(dataValidation)) { }

                        var orderItem = {};

                        orderItem = {
                            PurchaseOrderItemId: purchaseOrderItemid,
                            PurchaseOrderId: purchaseOrderId,
                            NoOfBales: noOfBales,
                            ItemId: itemId,
                            OrderQty: orderQty,
                            UnitOfMeasurementId: unitOfMeasurementId,
                            OrderRate: orderRate,
                            FabricCutOutLength: fabricCutoutLength,
                            IsDeleted: false

                        };

                        if (tableRows[tr].style.display === "none") {
                            orderItem.IsDeleted = true;
                            orderItem.DeletedBy = parseInt(LOGGED_USER);
                            orderItem.DeletedByIP = IP_ADDRESS;
                        }
                        else {
                            if (purchaseOrderItemid === parseInt(0)) {

                                orderItem.CreatedBy = parseInt(LOGGED_USER);
                                orderItem.CreatedByIP = IP_ADDRESS;
                                //addSalesBillItem(billItem);
                            }
                            else {
                                orderItem.ModifiedBy = parseInt(LOGGED_USER);
                                orderItem.ModifiedByIP = IP_ADDRESS;
                                //updateSalesBillItem(billItem);
                            }
                        }

                        PURCHASE_ORDER_ITEMS.push(orderItem);

                    }
                }
            }
        }
        else {
            swal({
                title: "Warning",
                text: "No Purchase Order Items is entered. Please add the items.",
                type: "warning",
                function() {
                    DOM.searchItem.focus();
                    shared.hideLoader(DOM.loader);
                    return;
                }
            });
        }

    }

    function savePurchaseOrder() {

        shared.showLoader(DOM.loader);

        if (validateData()) {

            var purchaseOrderId = 0;
            var workingPeriodId = 0;
            var companyId = 0;
            var branchId = 0;
            var purchaseOrderNo = 0;
            var purchaseOrderDate = "";
            var vendorId = 0;
            var vendorReferenceNo = "";
            var paymentTermsId = 0;
            var noOfDays = 0;
            var discountRate = 0;
            var discountDays = 0;
            var expectedDeliveryDate = "";
            var remarks = "";

            PURCHASE_ORDERS.length = 0;
            PURCHASE_ORDER_ITEMS.length = 0;

            savePurchaseOrderItems();

            if (PURCHASE_ORDER_ITEMS.length === 0) {

                swal("Error", "Purchase Order Items Not Found.", "error");

                return false;
            }

            workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);
            companyId = parseInt(DOM.companyName.options[DOM.companyName.selectedIndex].value);
            branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
            purchaseOrderNo = parseInt(0);
            purchaseOrderId = parseInt(DOM.purchaseOrderNo.getAttribute('data-purchase-order-id'));
            purchaseOrderDate = DOM.purchaseOrderDate.value;
            vendorId = parseInt(DOM.vendor.getAttribute('data-client-address-id'));
            vendorReferenceNo = DOM.vendorReferenceNo.value;
            paymentTermsId = parseInt(DOM.paymentTerms.options[DOM.paymentTerms.selectedIndex].value);
            noOfDays = parseInt(DOM.noOfDaysForPayment.value);
            discountRate = parseFloat(DOM.discountRate.value);
            discountDays = parseFloat(DOM.paymentDays.value);
            expectedDeliveryDate = DOM.expectedDeliveryDate.value;
            remarks = DOM.orderRemarks.value;


            if (isNaN(workingPeriodId)) { workingPeriodId = 0; }
            if (isNaN(companyId)) { companyId = 0; }
            if (isNaN(branchId)) { branchId = 0; }
            if (isNaN(purchaseOrderId)) { purchaseOrderId = 0; }
            if (isNaN(vendorId)) { vendorId = 0; }
            if (isNaN(paymentTermsId)) { paymentTermsId = 0; }
            if (isNaN(noOfDays)) { noOfDays = 0; }

            var purchaseOrder = {};

            purchaseOrder = {
                PurchaseOrderId: purchaseOrderId,
                VendorId: vendorId,
                VendorReferenceNo: vendorReferenceNo,
                PurchaseOrderNo: purchaseOrderNo,
                PurchaseOrderDate: purchaseOrderDate,
                PaymentTermId: paymentTermsId,
                NoOfDaysForPayment: noOfDays,
                DiscountRateForPayment: discountRate,
                DiscountApplicableBeforePaymentDays: discountDays,
                ExpectedDeliveryDate: expectedDeliveryDate,
                Remarks: remarks,
                OrderStatusId: 1,
                BranchId: branchId,
                WorkingPeriodId: workingPeriodId,
                PurchaseOrderItems: PURCHASE_ORDER_ITEMS
            };

            if (parseInt(purchaseOrderId) === parseInt(0)) {

                purchaseOrder.CreatedBy = LOGGED_USER;
                purchaseOrder.CreatedByIp = IP_ADDRESS;
            }
            else {

                purchaseOrder.ModifiedBy = LOGGED_USER;
                purchaseOrder.ModifiedByIP = IP_ADDRESS;
            }

            var postData = JSON.stringify(purchaseOrder);

            shared.sendRequest(SERVICE_PATH + "SavePurchaseOrder", "POST", true, "JSON", postData, function (response) {

                var _response = JSON.parse(response.responseText);

                if (response.status === 200) {

                    if (parseInt(response.responseText) > parseInt(0)) {

                        swal({
                            title: "Success",
                            text: "Records Saved Successfully. Please note down the below reference no. " + response.responseText,
                            type: "success"
                        }, function () {
                            shared.hideLoader(DOM.loader);
                            IsRecordChanged = true;
                            addNewPurchaseOrder();
                        });
                    }
                    else if (parseInt(response.responseText) === parseInt(-1)) {
                        swal({
                            title: "Warning",
                            text: "This Purchase Order No. is already exists.",
                            type: "warning"
                        }, function () {
                            shared.hideLoader(DOM.loader);
                            DOM.purchaseOrderNo.focus();
                        });
                    }
                }
                else {

                    console.log("While saving the purchase order " + response.responseText);

                    swal({
                        title: "Error",
                        text: "Unable to save the records due to some error. " + _response.ExceptionMessage,
                        type: "error"
                    }, function () {
                        shared.hideLoader(DOM.loader);
                    });
                }
            });
 
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

SharpiTech.PurchaseOrder.init();
