
var SharpiTech = {};

SharpiTech.SalesScheme = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var SALES_SCHEMES = {};
    var SALES_SCHEMES_ITEMS = [];
    

    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.editMode = document.getElementById('EditMode');

        DOM.searchPanel = document.getElementById('SearchPanel');
        //DOM.searchByFinancialYear = document.getElementById('SearchByFinancialYear');
        //DOM.searchByVendor = document.getElementById('SearchByVendor');
        //DOM.searchByPurchaseBillNo = document.getElementById('SearchByPurchaseBillNo');
        //DOM.searchByPurchaseBillNoButton = document.getElementById('SearchByPurchaseBillNoButton');

        DOM.salesSchemeId = document.getElementById('SalesSchemeId');
        DOM.companyName = document.getElementById('CompanyName');
        DOM.branch = document.getElementById('Branch');
        DOM.brand = document.getElementById('Brand');
        DOM.itemCategory = document.getElementById('ItemCategory');
        DOM.item = document.getElementById('Item');
        DOM.discountPercentage = document.getElementById('DiscountPercentage');
        DOM.discountAmount = document.getElementById('DiscountAmount');
        DOM.maxDiscountAmount = document.getElementById('MaxDiscountAmount');
        DOM.saleStartDate = document.getElementById('SaleStartDate');
        DOM.salesStartDateDatePicker = document.getElementById('SaleStartDateDatePicker');
        DOM.saleEndDate = document.getElementById('SaleEndDate');
        DOM.saleEndDateDatePicker = document.getElementById('SaleEndDateDatePicker');
        
        DOM.viewMode = document.getElementById('ViewMode');
        DOM.salesSchemesList = document.getElementById('SalesSchemesList');
        //DOM.filterOption = document.getElementById('FilterOption');
        //DOM.filterYear = document.getElementById('FilterYear');
        //DOM.purchaseOrderList = document.getElementById('PurchaseOrderList');

        DOM.addNewScheme = document.getElementById('AddNewScheme');
        DOM.showSchemeList = document.getElementById('ShowSchemeList');
        DOM.viewScheme = document.getElementById('ViewScheme');
        DOM.editScheme = document.getElementById('EditScheme');
        DOM.saveScheme = document.getElementById('SaveScheme');
        DOM.deleteScheme = document.getElementById('DeleteScheme');
        
        /*cache the jquery element */
        DOM.$saleStartDateDatePicker = $('#SaleStartDateDatePicker');
        DOM.$saleEndDateDatePicker = $('#SaleEndDateDatePicker');

    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        var saleEndDate = new Date() + 7;

        DOM.$saleStartDateDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")            
        });

        DOM.$saleEndDateDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(saleEndDate).format("DD/MMM/YYYY")
        });


    }

    //$('#SaleStartDateDatePicker').click(function () {
    //    var popup = $(this).offset();
    //    var popupTop = popup.top - 40;
    //    $('.ui-datepicker').css({
    //        'top': popupTop
    //    });
    //});

    //var dv = el[0].parentElement.children[1].children[1]
    //dv.style.position = "relative"
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

        DOM.addNewScheme.addEventListener('click', addNewScheme);
        DOM.showSchemeList.addEventListener('click', showSchemeList);
        DOM.viewScheme.addEventListener('click', viewScheme);
        DOM.editScheme.addEventListener('click', editScheme);
        DOM.saveScheme.addEventListener('click', saveScheme);
        DOM.deleteScheme.addEventListener('click', deleteScheme);
        //DOM.printPurchasesOrder.addEventListener('click', printPurchasesOrder);
        //DOM.sendMail.addEventListener('click', sendMail);


        DOM.companyName.onchange = function () {
            getBranchName(1);
        };


        DOM.itemCategory.onchange = function () {
            getItem(-1);
        };

    }

    function loadData() {

        getCompany();
        getBrand();
        getItemCategories();

        addNewScheme();
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

   function getBrand() {

       DOM.brand.length = 0;

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllBrands', DOM.brand, "BrandName", "BrandId", "Choose Brand", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.brand, parseInt(0));
                    shared.setSelect2ControlsText(DOM.brand);

                    //DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                }
            }
        });

        //shared.hideLoader(DOM.loader);
    }

    function getItemCategories() {

        shared.showLoader(DOM.loader);

        DOM.itemCategory.length = 0;

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllItemCategories', DOM.itemCategory, "ItemCategoryName", "ItemCategoryId", "Choose Item Category", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.itemCategory, parseInt(0));
                    shared.setSelect2ControlsText(DOM.itemCategory);

                    getItem(-1);
                    //DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                }
            }
        });


        shared.hideLoader(DOM.loader);
    }

    function getItem(itemId) {

        shared.showLoader(DOM.loader);

        DOM.item.length = 0;

        var brandId = 0;
        var itemCategoryId = 0;

        if (DOM.brand.selectedIndex > 0) {

            brandId = parseInt(DOM.brand.options[DOM.brand.selectedIndex].value);
            itemCategoryId = parseInt(DOM.itemCategory.options[DOM.itemCategory.selectedIndex].value);
        }
        
        if (isNaN(brandId)) { brandId = 0; }
        if (isNaN(itemCategoryId)) { itemCategoryId = 0; }

        if (brandId > 0 && itemCategoryId > 0) {

            shared.fillDropdownWithCallback(SERVICE_PATH + 'GetItemsByBrandAndItemCategory/' + brandId + '/' + itemCategoryId, DOM.item, "ItemName", "ItemId", "Choose Item", function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        shared.setSelectValue(DOM.item, null, parseInt(itemId));                        
                        shared.setSelect2ControlsText(DOM.item);

                        //DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                    }
                }
            });

        }

        shared.hideLoader(DOM.loader);
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

    function getAllSalesSchemes() {

        shared.showLoader(DOM.loader);

        SALES_SCHEMES.length = 0;
        
        shared.sendRequest(SERVICE_PATH + "GetAllSalesSchemes", "GET", true, "JSON", null, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res !== undefined) {

                        if (res.length > 0) {

                            SALES_SCHEMES = res;
                        
                            bindSalesSchemes();
                        }
                    }
                }
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function bindSalesSchemes() {

        shared.showLoader(DOM.loader);

        var tableBody = DOM.salesSchemesList.tBodies[0];

        tableBody.innerHTML = "";

        if (SALES_SCHEMES.length) {

            var data = "";

            for (var r = 0; r < SALES_SCHEMES.length; r++) {

                data = data + "<tr data-sales-scheme-id=" + SALES_SCHEMES[r].SalesSchemeId + ">";
                data = data + "<td class='col-sm-1 text-center'><label class='label-tick'> <input type='checkbox' id='" + SALES_SCHEMES[r].SalesSchemeId + "' class='label-checkbox' name='SelectSalesScheme' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td class='col-sm-1 text-center'>" + SALES_SCHEMES[r].BrandName + "</td>";
                data = data + "<td class='col-sm-1 text-center'>" + SALES_SCHEMES[r].ItemCategoryName + "</td>";
                data = data + "<td class='col-sm-2 text-center'>" + SALES_SCHEMES[r].ItemName + "</td>";
                data = data + "<td class='col-sm-1 text-center'>" + SALES_SCHEMES[r].DiscountPercent + "</td>";
                data = data + "<td class='col-sm-1 text-center'>" + SALES_SCHEMES[r].DiscountAmount + "</td>";
                data = data + "<td class='col-sm-1 text-center'>" + SALES_SCHEMES[r].MaxDiscountAmount + "</td>";
                data = data + "<td class='col-sm-2 text-center'>" + SALES_SCHEMES[r].SaleStartDate + "</td>";
                data = data + "<td class='col-sm-2 text-center'>" + SALES_SCHEMES[r].SaleEndDate + "</td>";

            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }

        shared.hideLoader(DOM.loader);
    }

    function showSalesSchemes(salesSchemeId) {

        //DOM.salesSchemesList.tBodies[0].innerHTML = "";

        shared.showLoader(DOM.loader);

        // Check the sales schemes list has values
        if (SALES_SCHEMES.length > 0) {

            var schemes = SALES_SCHEMES.filter(function (value, index, array) {
                return value.SalesSchemeId === parseInt(salesSchemeId);
            });

            if (schemes.length > 0) {

                DOM.salesSchemeId.value = schemes[0].SalesSchemeId;

                shared.setSelectValue(DOM.companyName, null, parseInt(schemes[0].CompanyId));
                shared.setSelect2ControlsText(DOM.companyName);
                getBranchName(parseInt(schemes[0].BranchId));

                shared.setSelectValue(DOM.brand, null, parseInt(schemes[0].BrandId));
                shared.setSelect2ControlsText(DOM.brand);

                shared.setSelectValue(DOM.itemCategory, null, parseInt(schemes[0].ItemCategoryId));
                shared.setSelect2ControlsText(DOM.itemCategory);

                getItem(schemes[0].ItemId);

                DOM.discountPercentage.value = schemes[0].DiscountPercent;
                DOM.discountAmount.value = schemes[0].DiscountAmount;
                DOM.maxDiscountAmount.value = schemes[0].MaxDiscountAmount;
                DOM.saleStartDate.value = schemes[0].SaleStartDate;
                DOM.saleEndDate.value = schemes[0].SaleEndDate;
                
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

        if (DOM.companyName.selectedIndex === 0) {

            DOM.companyName.focus();
            isValid = false;
            swal("Error", "Please select Company Name.", "error");

        }
        else if (DOM.branch.selectedIndex === 0) {

            DOM.branch.focus();
            isValid = false;
            swal("Error", "Please select Branch.", "error");

        }
        else if (DOM.brand.selectedIndex === 0) {

            DOM.brand.focus();
            isValid = false;
            swal("Error", "Please select the Brand.", "error");

        }
        else if (DOM.itemCategory.selectedIndex === 0) {

            DOM.itemCategory.focus();
            isValid = false;
            swal("Error", "Please select the Item Category.", "error");

        }
        //else if (DOM.item.selectedIndex === 0) {

        //    DOM.item.focus();
        //    isValid = false;
        //    swal("Error", "Please select the Item.", "error");

        //}
        else if (DOM.discountPercentage.value === "" && DOM.discountAmount.value === "") {

            DOM.discountPercentage.focus();
            isValid = false;
            swal("Error", "Please enter either Discount Percentage or Discount Amount.", "error");

        }
        else if (DOM.saleStartDate.value === "") {
            DOM.saleStartDate.focus();
            isValid = false;
            swal("Error", "Please enter the Sale Start Date.", "error");
        }
        else if (DOM.saleEndDate.value === "") {
            DOM.saleEndDate.focus();
            isValid = false;
            swal("Error", "Please enter the Sale End Date.", "error");
        }
        else if (DOM.saleEndDate.value !== "" && DOM.saleStartDate.value !== "") {

            var startDate = new Date(DOM.saleStartDate.value);
            var endDate = new Date(DOM.saleEndDate.value);


            if (endDate < startDate) {
                DOM.saleEndDate.focus();
                isValid = false;
                swal("Error", "Sale End Date should not be less than Start Date.", "error");

            }
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

    function addNewScheme() {

        shared.showLoader(DOM.loader);

        //DOM.searchPanel.style.display = "none";

        shared.clearInputs(DOM.editMode);
        shared.clearTextAreas(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        SALES_SCHEMES.length = 0;
        SALES_SCHEMES_ITEMS.length = 0;
        

        // Set default values
        
        shared.setSelectOptionByIndex(DOM.companyName, parseInt(2));
        shared.setSelect2ControlsText(DOM.companyName);

        getBranchName(1);

        DOM.salesSchemeId.value = "0";

        var currentDate = new Date();

        DOM.saleStartDate.value = moment(currentDate).format("DD/MMM/YYYY");


        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.brand.focus();

        //addRowsToItemsList();

        shared.hideLoader(DOM.loader);
    }

    function showSchemeList() {

        shared.showLoader(DOM.loader);

        shared.showPanel(DOM.viewMode);

        shared.hidePanel(DOM.editMode);

        getAllSalesSchemes();

        shared.hideLoader(DOM.loader);
    }

    function viewScheme() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);

            shared.disableControls(DOM.editMode, true);

            var selectedRows = getSelectedRows(DOM.salesSchemesList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var salesSchemeId = parseInt(currentTableRow.getAttribute('data-sales-scheme-id'));

                    if (isNaN(salesSchemeId)) { salesSchemeId = 0; }

                    //DOM.purchaseOrderId.value = purchaseOrderId;

                    showSalesSchemes(salesSchemeId);
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

    function editScheme() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);

            shared.disableControls(DOM.editMode, false);

            //shared.disableSpecificControls(controls, true);

            var selectedRows = getSelectedRows(DOM.salesSchemesList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var salesSchemeId = parseInt(currentTableRow.getAttribute('data-sales-scheme-id'));

                    if (isNaN(salesSchemeId)) { salesSchemeId = 0; }

                    //DOM.purchaseOrderId.value = purchaseOrderId;

                    showSalesSchemes(salesSchemeId);
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
        DOM.brand.focus();
    }

    function deleteScheme() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.salesSchemesList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.salesSchemesList);

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

                                var schemes = [];

                                if (SALES_SCHEMES.length) {

                                    var salesSchemeId = parseInt(selectedRows[r].getAttribute('data-sales-scheme-id'));

                                    var salesScheme = {};

                                    salesScheme = {
                                        SalesSchemeId: salesSchemeId,
                                        IsDeleted: true,
                                        DeletedBy: LOGGED_USER,
                                        DeletedByIP: IP_ADDRESS                                        
                                    };

                                    var postData = JSON.stringify(salesScheme);

                                    shared.sendRequest(SERVICE_PATH + 'SaveSalesScheme', "POST", true, "JSON", postData, function (response) {

                                        if (response.status === 200) {

                                            if (parseInt(response.responseText) > 0) {

                                                //tableBody.removeChild(selectedRows[r]);

                                                swal({
                                                    title: "Success",
                                                    text: "Scheme Details Deleted successfully.",
                                                    type: "success"
                                                    }, function () {
                                                      getAllSalesSchemes();
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

        shared.hideLoader(DOM.loader);
    }

    //function saveSchem() {

    //    var purchaseOrderId = 0;
    //    var purchaseOrderItemid = 0;
    //    var itemId = 0;
    //    var noOfBales = 0;
    //    var orderQty = 0;
    //    var unitOfMeasurementId = 0;
    //    var orderRate = 0;
    //    var fabricCutoutLength = 0;

    //    var tableBody = DOM.purchaseOrderItemsList.tBodies[0];

    //    var tableRows = tableBody.children;

    //    if (tableRows.length) {

    //        for (var tr = 0; tr < tableRows.length; tr++) {

    //            purchaseOrderItemId = tableRows[tr].getAttribute('data-purchase-order-item-id');

    //            var inputs = tableRows[tr].querySelectorAll('input[type="text"]');

    //            if (inputs.length) {

    //                if (parseFloat(inputs[2].value) > 0) {

    //                    purchaseOrderItemid = parseInt(tableRows[tr].getAttribute('data-purchase-order-item-id'));
    //                    purchaseOrderId = parseInt(DOM.purchaseOrderNo.getAttribute('data-purchase-order-id'));
    //                    noOfBales = parseInt(inputs[0].value);
    //                    fabricCutoutLength = parseInt(inputs[1].value);
    //                    itemId = parseInt(tableRows[tr].getAttribute('data-item-id'));
    //                    orderQty = parseFloat(inputs[2].value);
    //                    unitOfMeasurementId = parseInt(tableRows[tr].getAttribute('data-unit-of-measurement-id'));
    //                    orderRate = parseFloat(inputs[3].value);
                        

    //                    if (isNaN(purchaseOrderItemid)) { purchaseOrderItemid = 0; }
    //                    if (isNaN(purchaseOrderId)) { purchaseOrderId = 0; }
    //                    if (isNaN(noOfBales)) { noOfBales = 0; }
    //                    if (isNaN(itemId)) { itemId = 0; }
    //                    if (isNaN(orderQty)) { orderQty = 0; }
    //                    if (isNaN(unitOfMeasurementId)) { unitOfMeasurementId = 0; }

    //                    var dataValidation = {
    //                        NoOfBales: noOfBales,
    //                        ItemId: itemId,
    //                        OrderQty: orderQty,
    //                        UnitOfMeasurementId: unitOfMeasurementId
    //                    };

    //                    if (validateOrderItems(dataValidation)) { }

    //                    var orderItem = {};

    //                    orderItem = {
    //                        PurchaseOrderItemId: purchaseOrderItemid,
    //                        PurchaseOrderId: purchaseOrderId,
    //                        NoOfBales: noOfBales,
    //                        ItemId: itemId,
    //                        OrderQty: orderQty,
    //                        UnitOfMeasurementId: unitOfMeasurementId,
    //                        OrderRate: orderRate,
    //                        FabricCutOutLength: fabricCutoutLength,
    //                        IsDeleted: false

    //                    };

    //                    if (tableRows[tr].style.display === "none") {
    //                        orderItem.IsDeleted = true;
    //                        orderItem.DeletedBy = parseInt(LOGGED_USER);
    //                        orderItem.DeletedByIP = IP_ADDRESS;
    //                    }
    //                    else {
    //                        if (purchaseOrderItemid === parseInt(0)) {

    //                            orderItem.CreatedBy = parseInt(LOGGED_USER);
    //                            orderItem.CreatedByIP = IP_ADDRESS;
    //                            //addSalesBillItem(billItem);
    //                        }
    //                        else {
    //                            orderItem.ModifiedBy = parseInt(LOGGED_USER);
    //                            orderItem.ModifiedByIP = IP_ADDRESS;
    //                            //updateSalesBillItem(billItem);
    //                        }
    //                    }

    //                    PURCHASE_ORDER_ITEMS.push(orderItem);

    //                }
    //            }
    //        }
    //    }
    //    else {
    //        swal({
    //            title: "Warning",
    //            text: "No Purchase Order Items is entered. Please add the items.",
    //            type: "warning",
    //            function() {
    //                DOM.searchItem.focus();
    //                shared.hideLoader(DOM.loader);
    //                return;
    //            }
    //        });
    //    }

    //}

    function saveScheme() {

        shared.showLoader(DOM.loader);

        if (validateData()) {

            var salesSchemeId = 0;
            var companyId = 0;
            var branchId = 0;
            var brandId = 0;
            var itemCategoryId = 0;
            var itemId = 0;
            var discountPercentage = 0;
            var discountAmount = 0;
            var maxDiscountAmount = 0;
            var saleStartDate = "";
            var saleEndDate = "";
            
            SALES_SCHEMES.length = 0;

            salesSchemeId = parseInt(DOM.salesSchemeId.value);
            companyId = parseInt(DOM.companyName.options[DOM.companyName.selectedIndex].value);
            branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
            brandId = parseInt(DOM.brand.options[DOM.brand.selectedIndex].value);
            itemCategoryId = parseInt(DOM.itemCategory.options[DOM.itemCategory.selectedIndex].value);
            itemId = parseInt(DOM.item.options[DOM.item.selectedIndex].value);
            discountPercentage = parseFloat(DOM.discountPercentage.value);
            discountAmount = parseFloat(DOM.discountAmount.value);
            maxDiscountAmount = parseFloat(DOM.maxDiscountAmount.value);
            saleStartDate = DOM.saleStartDate.value;
            saleEndDate = DOM.saleEndDate.value;
            
            if (isNaN(companyId)) { companyId = 0; }
            if (isNaN(branchId)) { branchId = 0; }
            if (isNaN(brandId)) { brandId = 0; }
            if (isNaN(itemCategoryId)) { itemCategoryId = 0; }
            if (isNaN(itemId)) { itemId = 0; }
            if (isNaN(discountPercentage)) { discountPercentage = 0; }

            var salesScheme = {};

            salesScheme = {
                SalesSchemeId: salesSchemeId,
                BrandId: brandId,
                ItemCategoryId: itemCategoryId,
                ItemId: itemId,
                DiscountPercent: discountPercentage,
                DiscountAmount: discountAmount,
                MaxDiscountAmount: maxDiscountAmount,
                BuyQty: 0,
                FreeQty: 0,
                SaleStartDate: saleStartDate,
                SaleEndDate: saleEndDate,
                BranchId: branchId                
            };

            if (parseInt(salesSchemeId) === parseInt(0)) {

                salesScheme.CreatedBy = LOGGED_USER;
                salesScheme.CreatedByIp = IP_ADDRESS;
            }
            else {

                salesScheme.ModifiedBy = LOGGED_USER;
                salesScheme.ModifiedByIP = IP_ADDRESS;
            }

            var postData = JSON.stringify(salesScheme);

            shared.sendRequest(SERVICE_PATH + "SaveSalesScheme", "POST", true, "JSON", postData, function (response) {

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
                            addNewScheme();
                        });
                    }
                    else if (parseInt(response.responseText) === parseInt(-1)) {
                        swal({
                            title: "Warning",
                            text: "This record is already exists.",
                            type: "warning"
                        }, function () {
                            shared.hideLoader(DOM.loader);
                            DOM.brand.focus();
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

SharpiTech.SalesScheme.init();
