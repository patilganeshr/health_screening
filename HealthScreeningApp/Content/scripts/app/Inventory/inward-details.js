

var SharpiTech = {};

SharpiTech.InwardDetails = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var inwardDetails = [];
    var inwardGoodsDetails = [];
    var items = [];
    var currentFocus;
    var FLAG;

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.editMode = document.getElementById('EditMode');
        DOM.loader = document.getElementById('Loader');
        DOM.addNew = document.getElementById('AddNew');
        DOM.showList = document.getElementById('ShowList');
        DOM.view = document.getElementById('View');
        DOM.edit = document.getElementById('Edit');
        DOM.save = document.getElementById('Save');
        DOM.delete = document.getElementById('Delete');
        DOM.filter = document.getElementById('Filter');
        DOM.export = document.getElementById('Export');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.company = document.getElementById('Company');
        DOM.branch = document.getElementById('Branch');
        DOM.inwardId = document.getElementById('InwardId');
        DOM.inwardNo = document.getElementById('InwardNo');
        DOM.inwardDate = document.getElementById('InwardDate');
        DOM.inwardDatePicker = document.getElementById('InwardDatePicker');
        DOM.inwardFrom = document.getElementById('InwardFrom');
        DOM.referenceNo = document.getElementById('ReferenceNo');
        DOM.referenceDate = document.getElementById('ReferenceDate');
        DOM.typeOfTransfer = document.getElementById('TypeOfTransfer');
        DOM.fromLocation = document.getElementById('FromLocation');
        DOM.toLocation = document.getElementById('ToLocation');
        DOM.transporter = document.getElementById('Transporter');
        DOM.vehicleNo = document.getElementById('VehicleNo');
        DOM.inwardGoodsList = document.getElementById('InwardGoodsList');
        DOM.jobWorkItems = document.getElementById('JobWorkItems');
        DOM.itemName = document.getElementById('ItemName');
        DOM.addNewItem = document.getElementById('AddNewItem');
        DOM.unitOfMeasurement = document.getElementById('UnitOfMeasurement');
        DOM.itemsList = document.getElementById('ItemsList');
        DOM.inwardList = document.getElementById('InwardList');

        DOM.$inwardDatePicker = $('#InwardDatePicker');
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

        DOM.$inwardDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

        //$('#InwardDate').inputmask("dd/mmm/yyyy");

    }

    function bindEvents() {

        DOM.addNew.addEventListener('click', addNewInwardDetails);
        DOM.showList.addEventListener('click', getInwards);
        DOM.view.addEventListener('click', viewInwardDetails);
        DOM.edit.addEventListener('click', editInwardDetails);
        DOM.save.addEventListener('click', saveInwardDetails);
        DOM.delete.addEventListener('click', deleteInwardDetails);

        DOM.itemName.onkeyup = function (e) {
            //getKey(e.keyCode);

            if (currentFocus === undefined) { currentFocus = -1; }
            //if (e.keyCode === 8 || e.keyCode === 127) {
            //    DOM.itemName.value = "";                
            //}
            //setTimeout(function () {
                showItemsList(e);
            //}, 1000);            
            
        };

        DOM.company.onchange = function () {
            getBranchName(0);
        };

        DOM.inwardFrom.onchange = function () {
            DOM.inwardId.value = 0;
            getReferenceNos(0);
        };

        DOM.referenceNo.onchange = function (e) {

            var inwardFrom = DOM.inwardFrom.options[DOM.inwardFrom.selectedIndex].text.toUpperCase();

            // get the Goods Receipt No.'s or Outward No.'s or Job Work No.'s.
            if (inwardFrom === "GOODS RECEIPT") {
                getReferenceDetailsByGoodsReceiptId(parseInt(e.currentTarget.value));
                getInwardGoodsDetailsFromGoodsReceiptId(parseInt(e.currentTarget.value));
            }
            else if (inwardFrom === "OUTWARD") {
                getReferenceDetailsByOutwardId(parseInt(e.currentTarget.value));
                getInwardGoodsDetailsFromOutwardId(parseInt(e.currentTarget.value));
            }
        };

        DOM.addNewItem.addEventListener('click', redirectToItemMaster);
    }

    $("select").on("change", function (event) {

        setFocusOnSelect(event);

    });

    document.addEventListener('click', function (e){
        closeAutoCompleteList();
    });

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    function loadData() {

        
        getFinancialYears();
        getCompanyNames();
        getInwardFrom();
        getToLocation();
        getTransporters();
        //getItems();
        getInwards();
    }

    function redirectToItemMaster() {

        window.open(location.origin + '/POS/Masters/item?flag=New','_blank');

    }

    $('#ItemName').autocomplete({
        minLength: 0,
        source: items,        
        select: function (event, ui) {

            DOM.itemName.removeAttribute("data-item-id");

            DOM.itemName.value = ui.item.label;
            DOM.itemName.setAttribute('data-item-id', parseInt(ui.item.val));
            DOM.itemName.setAttribute('data-unit-of-measurement-id', ui.item.UnitOfMeasurementId);
            DOM.itemName.setAttribute('data-unit-code', ui.item.UnitCode);

            return false;
        }
    });

    var getKey = function (keyCode) {

        var value = keyCode === 8 || keyCode === 127 ||
            keyCode >= 65 && keyCode <= 90 || keyCode >= 48 && keyCode <= 57 ||
            keyCode >= 97 && keyCode <= 122 || keyCode === 32;

        return value;
    };

    //function showItemsList() {

    //    closeAutoCompleteList();

    //    if (DOM.itemName.value === "") {
    //        return;
    //    }

    //    var itemsList = items.filter(function (value, index, array) {
    //        return value.ItemName.toLowerCase().match(DOM.itemName.value.toLowerCase());            
    //    });

    //    var itemsCount = itemsList.length;

    //    if (itemsCount) {
                        
    //        var data = "";

    //        var fragment = document.createDocumentFragment();

    //        var ul = document.createElement('ul');

    //        ul.classList.add('list-group');

    //        for (var s = 0; s < itemsCount; s++) {

    //            var li = document.createElement('li');

    //            li.classList.add('list-group-item');
    //            li.classList.add('clearfix');
    //            li.setAttribute('id', itemsList[s].ItemId);
    //            li.style.cursor = "pointer";
    //            li.onclick = setItem;
    //            li.textContent = itemsList[s].ItemName;

    //            fragment.appendChild(li);

    //            //data = data + "<li class='list-group-item clearfix'" +
    //            //    "data-item-id=" + itemsList[s].ItemId + " data-unit-of-measurement-id=" + itemsList[s].UnitOfMeasurementId +
    //            //    "style='padding:0px;'> <label class='label-tick'>" +
    //            //    "<input type='checkbox' class='label-checkbox' id=Item_" + itemsList[s].ItemId + " checked='false' />" +
    //            //    "<span class='label-text'></span> </label>" + itemsList[s].ItemName + "</li>";
    //        }

    //        ul.appendChild(fragment);

    //        DOM.itemsList.appendChild(ul);

    //        DOM.itemsList.style.width = DOM.itemName.offsetWidth + 'px';
    //        DOM.itemsList.style.left = DOM.itemName.offsetParent.offsetLeft + 15 + 'px';

    //        //DOM.itemsList.innerHTML = data;
    //    }

    //}
        
    function showItemsList(e) {

        if (DOM.itemName.value === "") {
            currentFocus = -1;
            closeAutoCompleteList();
            return;
        }

        if (e.keyCode === 40) {
            currentFocus++;
            addActive(e);
        }
        else if (e.keyCode === 38) {
            currentFocus--;
            addActive(e);
        }
        else if (e.keyCode === 13) {
            currentFocus = -1;
            setItemOnEnter();
        }
        else {

            items.length = 0;

            closeAutoCompleteList();

            currentFocus = -1;

            var item = {};

            item = {
                ItemName: DOM.itemName.value
            };

            var postData = JSON.stringify(item);

            shared.sendRequest(SERVICE_PATH + "SearchItem/", "POST", true, "JSON", postData, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    items = JSON.parse(response.responseText);

                    var itemsCount = items.length;

                    if (itemsCount) {

                        var data = "";

                        var fragment = document.createDocumentFragment();

                        var ul = document.createElement('ul');

                        ul.classList.add('list-group');

                        for (var s = 0; s < itemsCount; s++) {

                            var li = document.createElement('li');

                            li.classList.add('list-group-item');
                            li.classList.add('clearfix');

                            li.setAttribute('id', items[s].ItemId);
                            li.setAttribute('data-unit-of-measurement-id', items[s].UnitOfMeasurementId);
                            li.setAttribute('data-unit-code', items[s].UnitCode);

                            li.style.cursor = "pointer";
                            li.onclick = setItem;
                            li.textContent = items[s].ItemName;

                            fragment.appendChild(li);

                            //data = data + "<li class='list-group-item clearfix'" +
                            //    "data-item-id=" + itemsList[s].ItemId + " data-unit-of-measurement-id=" + itemsList[s].UnitOfMeasurementId +
                            //    "style='padding:0px;'> <label class='label-tick'>" +
                            //    "<input type='checkbox' class='label-checkbox' id=Item_" + itemsList[s].ItemId + " checked='false' />" +
                            //    "<span class='label-text'></span> </label>" + itemsList[s].ItemName + "</li>";
                        }

                        ul.appendChild(fragment);

                        DOM.itemsList.appendChild(ul);

                        DOM.itemsList.style.width = DOM.itemName.offsetWidth + 'px';
                        DOM.itemsList.style.left = DOM.itemName.offsetParent.offsetLeft + 15 + 'px';

                        DOM.itemsList.classList.add('autocompleteList-active');
                        //DOM.itemsList.innerHTML = data;
                    }

                }

                shared.hideLoader(DOM.loader);

            });

        }
    }

    function addActive(e) {

        removeActive();

        var li = DOM.itemsList.querySelectorAll('li');

        var count = li.length;

        if (currentFocus >= count) {
            currentFocus = 0;
        }

        if (currentFocus < 0) {
            currentFocus = count - 1;
        }

        li[currentFocus].classList.add('autocompleteListItem-active');

        DOM.itemsList.scrollTop = parseInt(li[currentFocus].offsetHeight * currentFocus + 50);
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

        DOM.itemName.value = e.target.textContent;

        closeAutoCompleteList();

        var itemId = e.target.id;
        var itemName = e.target.textContent;
        var unitCode = e.target.getAttribute('data-unit-code');
        var unitOfMeasurementId = e.target.getAttribute('data-unit-of-measurement-id');

        bindJobWorkItems(itemName, itemId, unitCode, unitOfMeasurementId, 0);

        DOM.itemName.value = "";
    }

    function setItemOnEnter() {

        FLAG = "NEW ITEM";

        var li = DOM.itemsList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            DOM.itemName.value = li[0].textContent;

            closeAutoCompleteList();
        }

        var itemId = li[0].id;
        var itemName = li[0].textContent;
        var unitCode = li[0].getAttribute('data-unit-code');
        var unitOfMeasurementId = li[0].getAttribute('data-unit-of-measurement-id');

        bindJobWorkItems(itemName, itemId, unitCode, unitOfMeasurementId);

        DOM.itemName.value = "";
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

    //$('#ItemName').autocomplete({
    //    source: function (request, response) {
    //        //var param = { hsCod: HSCode.value };
            
    //        $.ajax({
    //            //url: SERVICE_PATH + "SearchItem/",
    //            //dataType: "json",
    //            source: items,
    //            //type: "GET",
    //            success: function (data) {
    //                response($.map(data, function (item) {
    //                    return {
    //                        label: item.ItemName,
    //                        val: item.ItemId,
    //                        UnitOfMeasurementId: item.UnitOfMeasurementId,
    //                        UnitCode: item.UnitCode
    //                    };
    //                }));
    //                if (data.length === 0) {
    //                    DOM.itemName.value = "";
    //                    DOM.itemName.removeAttribute("data-item-id");
    //                }
    //            },
    //            error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                handleError(textStatus + ' ' + errorThrown);
    //                swal({
    //                    title: "Error",
    //                    text: "No Records Found.",
    //                    type: "error"
    //                }, function () {
    //                    DOM.itemName.value = "";
    //                    DOM.itemName.focus();
    //                });
    //            }
    //        });
    //    },
    //    select: function (event, ui) {
    //        if (ui.item) {

    //            DOM.itemName.removeAttribute("data-item-id");

    //            DOM.itemName.value = ui.item.label;
    //            DOM.itemName.setAttribute('data-item-id', parseInt(ui.item.val));
    //            DOM.itemName.setAttribute('data-unit-of-measurement-id', ui.item.UnitOfMeasurementId);
    //            DOM.itemName.setAttribute('data-unit-code', ui.item.UnitCode);
    //        }
    //    },
    //    minLength: 2
    //});

    function getItems() {

        shared.showLoader(DOM.loader);
        
        shared.sendRequest(SERVICE_PATH + "GetAllItems/", "GET", true, "JSON", null, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                items = JSON.parse(response.responseText);                
            }

            shared.hideLoader(DOM.loader);

        });

    }
    
    function getFinancialYears() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

        });
    }

    function getCompanyNames() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllCompanies', DOM.company, "CompanyName", "CompanyId", "Choose Company", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.company, parseInt(2));
                    shared.setSelect2ControlsText(DOM.company);

                    getBranchName(0);

                    shared.hideLoader(DOM.loader);
                }
            }

        });
    }

    function getBranchName(branchId) {

        DOM.branch.options.length = 0;

        var companyId = parseInt(DOM.company.options[DOM.company.selectedIndex].value);

        if (isNaN(companyId)) { companyId = parseInt(0); }

        if (companyId > 0) {

            shared.fillDropdownWithCallback(SERVICE_PATH + 'GetBranchesByCompanyId/' + companyId, DOM.branch, "BranchName", "BranchId", "Choose Branch", function (response) {

                if (response.status === 200) {

                    shared.showLoader(DOM.loader);

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

                    shared.hideLoader(DOM.loader);
                }
            });
        }
    }

    function getInwardFrom() {

        var fragment = document.createDocumentFragment();

        //Add default option
        var _option = document.createElement('OPTION');
        _option.innerHTML = "Choose Inward From";
        _option.value = -1;
        fragment.appendChild(_option);

        _option = document.createElement('OPTION');
        _option.innerHTML = "Goods Receipt";
        _option.value = "GR";
        fragment.appendChild(_option);

        _option = document.createElement('OPTION');
        _option.innerHTML = "Outward";
        _option.value = "O";
        fragment.appendChild(_option);

        _option = document.createElement('OPTION');
        _option.innerHTML = "Job Work";
        _option.value = "JW";
        fragment.appendChild(_option);

        DOM.inwardFrom.appendChild(fragment);
    }

    function getReferenceNos(referenceId) {

        var inwardId = parseInt(DOM.inwardId.value);

        if (isNaN(inwardId)) {
            inwardId = parseInt(0);
        }

        if (inwardId > 0) {

            // Get reference No.'s from inward details
            getReferenceNosFromInwardDetails(inwardId, referenceId);

        }
        else {

            // if reference no. is selected then
            if (DOM.inwardFrom.selectedIndex > 0) {

                var inwardFrom = DOM.inwardFrom.options[DOM.inwardFrom.selectedIndex].text.toUpperCase();

                // get the Goods Receipt No.'s or Outward No.'s or Job Work No.'s.
                if (inwardFrom === "GOODS RECEIPT") {

                    getReferenceNosFromGoodsReceipts();

                }
                else if (inwardFrom === "OUTWARD") {

                    getReferenceNosFromOutward();

                }
                else if (inwardFrom === "JOB WORK") {

                    getReferenceNosFromJobWork();

                }

                //focus on next control
                DOM.toLocation.focus();
            }
        }
    }

    function getReferenceNosFromInwardDetails(inwardId, referenceId) {

        DOM.referenceNo.options.length = 0;

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetReferenceNoFromInward/' + inwardId, DOM.referenceNo, "ReferenceNo", "ReferenceId", "Choose Goods Receipt No.", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.referenceNo, parseInt(1));
                    shared.setSelect2ControlsText(DOM.referenceNo);

                    if (DOM.referenceNo.selectedIndex > 0) {

                        shared.setSelectValue(DOM.referenceNo, null, referenceId);
                        shared.setSelect2ControlsText(DOM.referenceNo);

                        if (DOM.inwardFrom.options[DOM.inwardFrom.selectedIndex].text.toUpperCase() === "GOODS RECEIPT") {

                            // Get the Reference Details by Goods Receipt Id
                            getReferenceDetailsByGoodsReceiptId(referenceId);
                        }
                        else {
                            // Get the Reference Details by Outward Id
                            getReferenceDetailsByOutwardId(referenceId);
                        }
                    }
                }
            }
        });
    }

    function getReferenceNosFromGoodsReceipts() {

        DOM.referenceNo.options.length = 0;

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetReferenceNosFromGoodsReceipt', DOM.referenceNo, "ReferenceNo", "ReferenceId", "Choose Goods Receipt No.", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.referenceNo, parseInt(1));
                    shared.setSelect2ControlsText(DOM.referenceNo);

                    if (DOM.referenceNo.selectedIndex > 0) {

                        var goodsReceiptId = parseInt(DOM.referenceNo.options[DOM.referenceNo.selectedIndex].value);

                        if (isNaN(goodsReceiptId)) { goodsReceiptId = parseInt(0); }

                        // Get the Reference Details by Goods Receipt Id
                        getReferenceDetailsByGoodsReceiptId(goodsReceiptId);

                        // Get the Inward Goods Details
                        getInwardGoodsDetailsFromGoodsReceiptId(goodsReceiptId);
                    }
                }
            }
        });
    }

    function getReferenceNosFromOutward() {

        DOM.referenceNo.options.length = 0;

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetReferenceNosFromOutwards', DOM.referenceNo, "ReferenceNo", "ReferenceId", "Choose Goods Receipt No.", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.referenceNo, parseInt(1));
                    shared.setSelect2ControlsText(DOM.referenceNo);

                    if (DOM.referenceNo.selectedIndex > 0) {

                        var outwardId = parseInt(DOM.referenceNo.options[DOM.referenceNo.selectedIndex].value);

                        if (isNaN(outwardId)) { outwardId = parseInt(0); }

                        // Get the Reference Details by Outward Id
                        getReferenceDetailsByOutwardId(outwardId);

                        // Get the Inward Goods Details
                        getInwardGoodsDetailsFromOutwardId(outwardId);
                    }
                }
            }
        });
    }

    function getReferenceDetailsByGoodsReceiptId(goodsReceiptId) {

        shared.sendRequest(SERVICE_PATH + "GetReferenceNoDetailsByGoodsReceiptId/" + goodsReceiptId, "GET", true, "JSON", null, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined || _response !== null) {

                        if (_response.ReferenceDate !== null) {

                            DOM.referenceDate.value = _response.ReferenceDate;
                            DOM.fromLocation.value = _response.FromLocationName;
                            DOM.fromLocation.setAttribute('data-from-location-id', _response.FromLocationId);
                        }
                    }
                }
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function getInwardGoodsDetailsFromGoodsReceiptId(goodsReceiptId) {

        DOM.inwardGoodsList.tBodies[0].innerHTML = "";

        inwardGoodsDetails.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetInwardGoodsDetailsByGoodsReceiptId/" + goodsReceiptId, "GET", true, "JSON", null, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var res = JSON.parse(response.responseText);

                    if (res !== undefined) {

                        if (res.length > 0) {

                            for (var r = 0; r < res.length; r++) {

                                var inwardGoods = {};

                                inwardGoods = {
                                    InwardGoodsId: res[r].InwardGoodsId,
                                    InwardId: res[r].InwardId,
                                    GoodsReceiptId: res[r].GoodsReceiptId,
                                    GoodsReceiptItemId: res[r].GoodsReceiptItemId,
                                    ItemId: res[r].ItemId,
                                    ItemName: res[r].ItemName,
                                    UnitOfMeasurementId: res[r].UnitOfMeasurementId,
                                    UnitCode: res[r].UnitCode,
                                    ReceivedQty: res[r].ReceivedQty,
                                    InwardQty: res[r].InwardQty,
                                    InwardStatus: 'P',
                                    CreatedBy: parseInt(LOGGED_USER),
                                    CreatedByIP: IP_ADDRESS
                                };

                                inwardGoodsDetails.push(inwardGoods);


                            }

                            // Bind inward goods details
                            getInwardGoodsDetails(goodsReceiptId);
                        }
                    }
                }
            }

            shared.hideLoader(DOM.loader);

        });
    }

    function getReferenceDetailsByOutwardId(outwardId) {

        shared.sendRequest(SERVICE_PATH + "GetReferenceNoDetailsByOutwardId/" + outwardId, "GET", true, "JSON", null, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined || _response !== null) {

                        if (_response.ReferenceDate !== null) {

                            DOM.referenceDate.value = _response.ReferenceDate;
                            DOM.fromLocation.value = _response.FromLocationName;
                            DOM.fromLocation.setAttribute('data-from-location-id', _response.FromLocationId);
                            DOM.typeOfTransfer.value = _response.TypeOfTransfer;
                        }
                    }
                }
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function getInwardGoodsDetailsFromOutwardId(outwardId) {

        DOM.inwardGoodsList.tBodies[0].innerHTML = "";

        inwardGoodsDetails.length = 0;

        
        shared.sendRequest(SERVICE_PATH + "GetInwardGoodsDetailsByOutwardId/" + outwardId, "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var _response = JSON.parse(response.responseText);

                        if (_response !== undefined) {

                            if (_response.length > 0) {

                                for (var r = 0; r < _response.length; r++) {

                                    var inwardGoods = {};

                                    inwardGoods = {
                                        InwardGoodsId: _response[r].InwardGoodsId,
                                        InwardId: _response[r].InwardId,
                                        OutwardId: _response[r].OutwardId,
                                        GoodsReceiptItemId: _response[r].GoodsReceiptItemId,
                                        ItemId: _response[r].ItemId,
                                        ItemName: _response[r].ItemName,
                                        UnitOfMeasurementId: _response[r].UnitOfMeasurementId,
                                        UnitCode: _response[r].UnitCode,
                                        ReceivedQty: _response[r].PkgQty,
                                        InwardQty: _response[r].InwardQty,
                                        InwardStatus: 'P',
                                        CreatedBy: parseInt(LOGGED_USER),
                                        CreatedByIP: IP_ADDRESS
                                    };

                                    inwardGoodsDetails.push(inwardGoods);


                                }

                                // Bind inward goods details
                                getInwardGoodsDetails(outwardId);
                            }
                        }
                    }
                }

                shared.hideLoader(DOM.loader);

            });

        
    }

    function bindInwardDetails() {

        var tableBody = DOM.inwardList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the inward details has values
        if (inwardDetails.length > 0) {

            var data = "";

            for (var r = 0; r < inwardDetails.length; r++) {

                data = data + "<tr data-inward-id=" + inwardDetails[r].InwardId + " >";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + inwardDetails[r].InwardId + "' class='label-checkbox' name='SelectInward' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + inwardDetails[r].SrNo + "</td>";
                data = data + "<td>" + inwardDetails[r].InwardNo + "</td>";
                data = data + "<td>" + inwardDetails[r].InwardDate + "</td>";
                data = data + "<td>" + inwardDetails[r].ReferenceType + "</td>";
                data = data + "<td>" + inwardDetails[r].ReferenceNo + "</td>";
                data = data + "<td>" + inwardDetails[r].FromLocationName + "</td>";
                data = data + "<td>" + inwardDetails[r].ToLocationName + "</td>";
                data = data + "</tr>";

            }

            tableBody.innerHTML = data;

            // Show panels
            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);

        }
    }

    function showInwardDetails(inwardId) {

        if (inwardId > 0) {

            // Check the _charges list has values
            if (inwardDetails.length > 0) {

                var inwards = inwardDetails.filter(function (value, index, array) {
                    return value.InwardId === parseInt(inwardId);
                });

                if (inwards.length > 0) {

                    shared.setSelectValue(DOM.financialYear, null, parseInt(inwards[0].WorkingPeriodId));
                    shared.setSelect2ControlsText(DOM.financialYear);
                    shared.setSelectValue(DOM.company, null, parseInt(inwards[0].CompanyId));
                    shared.setSelect2ControlsText(DOM.company);
                    getBranchName(inwards[0].BranchId);
                    DOM.inwardId.value = inwards[0].InwardId;
                    DOM.inwardNo.value = inwards[0].InwardNo;
                    DOM.inwardDate.value = inwards[0].InwardDate;
                    shared.setSelectValue(DOM.inwardFrom, inwards[0].ReferenceType, null);
                    shared.setSelect2ControlsText(DOM.inwardFrom);
                    //getReferenceNos(parseInt(inwards[0].ReferenceId));
                    var fragment = document.createDocumentFragment();

                    //Add default option
                    var _option = document.createElement('OPTION');
                    _option.innerHTML = "Choose Reference No.";
                    _option.value = -1;
                    fragment.appendChild(_option);

                    _option = document.createElement('OPTION');
                    _option.innerHTML = inwards[0].ReferenceNo;
                    _option.value = inwards[0].ReferenceId;
                    fragment.appendChild(_option);

                    DOM.referenceNo.appendChild(fragment);

                    shared.setSelectValue(DOM.referenceNo, null, parseInt(inwards[0].ReferenceId));
                    shared.setSelect2ControlsText(DOM.referenceNo);
                    
                    DOM.fromLocation.value = inwards[0].FromLocationName;
                    DOM.fromLocation.setAttribute('data-from-location-id', inwards[0].FromLocationId);
                    shared.setSelectValue(DOM.toLocation, null, parseInt(inwards[0].ToLocationId));
                    shared.setSelect2ControlsText(DOM.toLocation);
                    DOM.typeOfTransfer.value = inwards[0].TypeOfTransfer;                    
                    shared.setSelectValue(DOM.transporter, null, parseInt(inwards[0].TransporterId));
                    shared.setSelect2ControlsText(DOM.transporter);
                    DOM.vehicleNo.value = inwards[0].VehicleNo;
                }

                // Show panels
                shared.showPanel(DOM.editMode);
                shared.hidePanel(DOM.viewMode);

                // Bind inward goods details
                getInwardGoodsDetails(inwardId);
            }
        }
    }

    function getInwardGoodsDetails(referenceId) {

        if (isNaN(referenceId)) { referenceId = parseInt(0); }

        var inwardFrom = DOM.inwardFrom.options[DOM.inwardFrom.selectedIndex].text.toUpperCase();
                
        if (inwardGoodsDetails.length > 0) {

            var inwardGoods = [];

            if (parseInt(DOM.inwardId.value) > 0) {

                inwardGoods = inwardGoodsDetails.filter(function (value, index, array) {
                    return value.InwardId === referenceId;
                });
            }
            else {
                if (inwardFrom === "GOODS RECEIPT") {
                    inwardGoods = inwardGoodsDetails.filter(function (value, index, array) {
                        return value.GoodsReceiptId === referenceId;
                    });
                }
                else if (inwardFrom === "OUTWARD") {
                    inwardGoods = inwardGoodsDetails.filter(function (value, index, array) {
                        return value.OutwardId === referenceId;
                    });
                }
            }

            if (DOM.typeOfTransfer.value.toLowerCase() !== "job work") {

                bindInwardGoodsDetails(inwardGoods, inwardFrom);
            }
            else {

                if (inwardGoods.length) {

                    DOM.inwardGoodsList.tBodies[0].innerHTML = "";
                        
                    for (var g = 0; g < inwardGoods.length; g++) {

                        if (DOM.inwardId.value !== undefined && parseInt(DOM.inwardId.value) > 0 ) {
                            bindJobWorkItems(inwardGoods[g].ItemName, inwardGoods[g].ItemId, inwardGoods[g].UnitCode, inwardGoods[g].UnitOfMeasurementId, inwardGoods[0].InwardQty, inwardGoods[0].InwardGoodsId, inwardGoods[0].GoodsReceiptItemId);
                        }
                    }
                }
            }
        }
    }

    function bindInwardGoodsDetails(inwardGoods, inwardFrom) {

        var table = DOM.inwardGoodsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        var recordsCount = inwardGoods.length;

        if (recordsCount > 0) {

            var data = "";

            for (var r = 0; r < recordsCount; r++) {

                data += "<tr data-inward-goods-id=" + parseInt(inwardGoods[r].InwardGoodsId) +
                    " data-goods-receipt-item-id=" + parseInt(inwardGoods[r].GoodsReceiptItemId) +
                    " data-unit-of-measurement-id=" + parseInt(inwardGoods[r].UnitOfMeasurementId) + ">";
                data += "<td>" + (r + 1) + "</td>";
                data += "<td>" + inwardGoods[r].ItemName + "</td>";
                data += "<td>" + inwardGoods[r].UnitCode + "</td>";
                data += "<td>" + inwardGoods[r].ReceivedQty + "</td>";
                if (inwardFrom === "GOODS RECEIPT") {
                    data += "<td>" + inwardGoods[r].InwardQty + "</td>";
                }
                else {
                    data += "<td> <input type='text' id=InwardQty" + (r + 1) + " class='form-control input-sm' value='" + inwardGoods[r].InwardQty + "'/> </td>";
                }
                data += "</tr>";
            }

            tableBody.innerHTML = data;
        }

    }

    function addJobWorkItem() {


    }

    function bindJobWorkItems(itemName, itemId, unitCode, unitOfMeasurementId, inwardQty, inwardGoodsId) {

        var goodsReceiptItemId = 0;

        if (inwardGoodsDetails.length) {
            inwardGoods = inwardGoodsDetails.filter(function (value, index, array) {
                return value.InwardId === parseInt(DOM.inwardId.value);
            });

            goodsReceiptItemId = inwardGoods[0].GoodsReceiptItemId;
        }

        var table = DOM.inwardGoodsList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var rowsCount = tableBody.children.length;

        if (inwardQty === undefined) { inwardQty = 0; }

        if (inwardGoodsId === undefined) { inwardGoodsId = 0; }

        if (goodsReceiptItemId === undefined) { goodsReceiptItemId = 0; }

        if (rowsCount === 0) {
            tableBody.innerHTML = "";
        }

        if (FLAG === "NEW ITEM") {

            if (itemName !== "") {

                for (var r = 0; r < rowsCount; r++) {

                    if (parseInt(tableRows[r].getAttribute('data-item-id')) === parseInt(itemId)) {
                        DOM.itemName.value = "";
                        DOM.itemName.focus();
                        swal("Error", "This item is alredy exists.", "error");
                        return;
                    }
                }
            }
        }

        if (itemName !== "") {

            var data = "";

            var tr = document.createElement('tr');

            tr.setAttribute('data-inward-goods-id', inwardGoodsId);
            tr.setAttribute('data-goods-receipt-item-id', goodsReceiptItemId);
            tr.setAttribute('data-item-id', itemId);
            tr.setAttribute('data-unit-of-measurement-id', unitOfMeasurementId);

            data += "<td>" +
                "<button type='button' id=RemoveItem'" + (rowsCount + 1) + "' class='btn btn-xs btn-danger btn-round' >" +
                "<span class='fa fa-fw fa-remove'></span> </button>" + "</td >";
            data += "<td>" + (rowsCount + 1) + "</td>";
            data += "<td>" + itemName + "</td>";
            data += "<td>" + unitCode + "</td>";
            data += "<td>" + 0 + "</td>";
            data += "<td> <input type='text' id=InwardQty" + (rowsCount + 1) + " class='form-control input-sm' value=" + inwardQty + " /></td>";

            tr.innerHTML = data;

            tableBody.appendChild(tr);

            var buttons = tableBody.querySelectorAll('button');
            var inputs = tableBody.querySelectorAll('input[type="text"]');

            if (buttons.length) {

                for (var b = 0; b < buttons.length; b++) {
                    buttons[b].onclick = removeItem;
                }
            }

            if (inputs.length) {

                for (var i = 0; i < inputs.length; i++) {
                    inputs[i].onkeydown = function validate(e) {
                        return shared.acceptOnlyNumbers(e);
                    };
                }
            }
        }
    }

    function removeItem(e) {

        // Remove the item from the Table only if the sales bill item id is 0
        var tableBody = DOM.inwardGoodsList.tBodies[0];

        var tableRows = tableBody.children;

        var tableRow = e.currentTarget.parentElement.parentElement;

        var inwardGoodsId = parseInt(tableRow.getAttribute('data-inward-goods-id'));

        if (isNaN(inwardGoodsId)) { inwardGoodsId = parseInt(0); }

        //tableRow.classList.add('removed-item');

        //setTimeout(function() {
        //    tableRow.style.display = "none";
        //}, 100);

        tableBody.removeChild(tableRow);
        
        // Mark the Item as Deleted if the inward goods id is > 0
        if (inwardGoodsDetails.length) {

            if (inwardGoodsId > 0) {

                for (var i = 0; i < inwardGoodsDetails.length; i++) {

                    if (inwardGoodsDetails[i].InwardGoodsId === inwardGoodsId) {
                        inwardGoodsDetails[i].IsDeleted = true;
                        inwardGoodsDetails[i].DeletedBy = parseInt(LOGGED_USER);
                        inwardGoodsDetails[i].DeletedByIP = IP_ADDRESS;
                        break;
                    }
                }
            }
        }

    }

    function getToLocation() {

        shared.showLoader(DOM.loader);

        var dataAttributes = "LocationTypeID";

        shared.fillDropdownWithDataAttributesAndCallback(SERVICE_PATH + 'GetAllLocationsWithLocationTypes', DOM.toLocation, "LocationName", "LocationId", "Choose Location", dataAttributes, function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

        });
    }

    function getTransporters() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/3', DOM.transporter, "ClientAddressName", "ClientAddressId", "Choose Transporter", function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

        });
    }

    function addNewInwardDetails() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);
        shared.disableControls(DOM.editMode, false);

        var controls = [
            DOM.inwardNo,
            DOM.fromLocation
        ];

        shared.disableSpecificControls(controls, true);
            
        inwardDetails.length = 0;
        inwardGoodsDetails.length = 0;

        DOM.inwardGoodsList.tBodies[0].innerHTML = "";
        DOM.inwardList.tBodies[0].innerHTML = "";

        DOM.inwardNo.disabled = true;
        DOM.inwardId.value = "0";
        
        // Set default values
        var currentDate = new Date();
        
        shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
        shared.setSelect2ControlsText(DOM.financialYear);
        DOM.inwardDate.value = moment(currentDate).format("DD/MMM/YYYY");

        //show edit panel
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        //set focus
        DOM.inwardFrom.focus();

        shared.hideLoader(DOM.loader);
    }


    function filterInwardDetails() {

    }

    var getSelectedRows = function() {

        var selectedRows = [];

        var tableBody = DOM.inwardList.tBodies[0];

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
    };
    
    function viewInwardDetails() {

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

                    var inwardId = parseInt(currentTableRow.getAttribute('data-inward-id'));

                    if (isNaN(inwardId)) { inwardId = 0; }

                    DOM.inwardId.value = inwardId;

                    showInwardDetails(inwardId);
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

    function editInwardDetails() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);
            shared.clearSelect(DOM.editMode);
            shared.disableControls(DOM.editMode, false);

            var controls = [
                DOM.financialYear,
                DOM.inwardNo,
                DOM.inwardFrom,
                DOM.referenceNo,
                DOM.referenceDate,
                DOM.fromLocation
            ];

            shared.disableSpecificControls(controls, true);
            
            var selectedRows = getSelectedRows();

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    var inwardId = parseInt(currentTableRow.getAttribute('data-inward-id'));

                    if (isNaN(inwardId)) { inwardId = 0; }

                    DOM.inwardId.value = inwardId;

                    showInwardDetails(inwardId);
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
        DOM.inwardNo.focus();
    }

    function checkIsInwardItemExistsInSalesBill(inwardId, callback) {

        var isInwardExists = false;

        shared.sendRequest(SERVICE_PATH + 'CheckInwardExistsInSalesBill/' + inwardId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {
                callback(response.responseText);
            }
            else {
                swal("Error", "Unable to delete the records.", "error");
            }
        });
    }

    function deleteInwardDetails() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.inwardList.tBodies[0];

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
                    closeOnCancel: true
                },
                    function (isConfirm) {

                        if (isConfirm) {
                            
                            for (var r = 0; r < selectedRows.length; r++) {

                                var inwards = [];

                                if (inwardDetails.length) {

                                    var inwardId = parseInt(selectedRows[r].getAttribute('data-inward-id'));

                                    checkIsInwardItemExistsInSalesBill(inwardId, function (response) {
                                        if (response === "true") {
                                            swal({
                                                title: "Warning",
                                                text: "Sales Bill is generated against this Inward Items so can not delete.",
                                                type: "warning"
                                            }, function () {
                                                shared.hideLoader(DOM.loader);
                                            });
                                        }
                                        else if (response === "false") {

                                            inwards = inwardDetails.filter(function (value, index, array) {
                                                return value.InwardId === inwardId && value.IsDeleted === false;
                                            });

                                            if (inwards.length) {

                                                var inwardItems = inwardGoodsDetails.filter(function (value, index, array) {
                                                    return value.InwardId === inwardId && value.IsDeleted === false;
                                                });

                                                inwards[0].IsDeleted = true;
                                                inwards[0].DeletedBy = parseInt(LOGGED_USER);
                                                inwards[0].DeletedByIP = IP_ADDRESS;

                                                if (inwardItems.length) {
                                                    for (var ri = 0; ri < inwardItems.length; ri++) {
                                                        inwardItems[ri].IsDeleted = true;
                                                        inwardItems[ri].DeletedBy = parseInt(LOGGED_USER);
                                                        inwardItems[ri].DeletedByIP = IP_ADDRESS;
                                                    }

                                                    inwards[0].InwardGoodsDetails = inwardItems;
                                                }
                                            }


                                            var postData = JSON.stringify(inwards);

                                            shared.sendRequest(SERVICE_PATH + 'SaveInwardDetails', "POST", true, "JSON", postData, function (response) {

                                                if (response.status === 200) {

                                                    if (parseInt(response.responseText) > 0) {

                                                        swal({
                                                            title: "Success",
                                                            text: "Inward details deleted successfully.",
                                                            type: "success"
                                                        }, function () {
                                                            getInwards();
                                                        });
                                                    }
                                                    else {
                                                        swal("Error", "Unable to delete the records due to some error.", "Error");
                                                    }
                                                }

                                                shared.hideLoader(DOM.loader);

                                            });
                                        }
                                    });
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

    var validateData = function () {

        var isValid = true;


        if (DOM.company.selectedIndex === 0) {
            DOM.company.focus();
            swal("Error", "Please select the Company Name.", "error");
            isValid = false;
        }
        else if (DOM.branch.selectedIndex === 0) {
            DOM.branch.focus();
            swal("Error", "Please select the Branch Name.", "error");
            isValid = false;
        }
        else if (DOM.inwardDate.value === "") {
            DOM.inwardDate.focus();
            swal("Error!!!", "Please enter the Inward Date.", "error");
            isValid = false;
        }
        else if (DOM.inwardFrom.selectedIndex === 0) {
            DOM.inwardFrom.focus();
            swal("Error!!!", "Please select the Inward From option as where to take the Inward of goods.", "error");
            isValid = false;
        }
        else if (DOM.referenceNo.selectedIndex === 0) {
            DOM.referenceNo.focus();
            swal("Error!!!", "Please select the Reference No.", "error");
            isValid = false;
        }
        else if (DOM.toLocation.selectedIndex === 0) {
            DOM.toLocation.focus();
            swal("Error!!!", "Please select the To Location.", "error");
            isValid = false;
        }

        return isValid;
    };

    function saveInwardGoodsDetails() {

        var inwardId = parseInt(DOM.inwardId.value);

        var tableBody = DOM.inwardGoodsList.tBodies[0];

        var tableRows = tableBody.children;

        var tableRowsCount = tableRows.length;

        var inwardGoodsCount = inwardGoodsDetails.length;

        if (isNaN(inwardId)) { inwardId = 0; }

        if (inwardGoodsCount > 0) {

            for (var t = 0; t < tableRowsCount; t++) {

                var goodsReceiptItemId = parseInt(tableRows[t].getAttribute("data-goods-receipt-item-id"));
                var unitOfMeasurementId = parseInt(tableRows[t].getAttribute('data-unit-of-measurement-id'));
                var inputs = tableRows[t].querySelectorAll('input[type="text"]');
                
                if (isNaN(goodsReceiptItemId)) { goodsReceiptItemId = 0; }

                for (var i = 0; i < inwardGoodsCount; i++) {

                    if (inwardGoodsDetails[i].InwardId === inwardId &&
                        inwardGoodsDetails[i].GoodsReceiptItemId === goodsReceiptItemId) {

                        inwardGoodsDetails[i].InwardQty = inputs[0].value;
                        inwardGoodsDetails[i].UnitOfMeasurementId = unitOfMeasurementId;

                        break;
                    }
                }
            }
        }
    }

    function saveInwardGoodsDetailsForJobWork() {

        var inwardId = parseInt(DOM.inwardId.value);

        var tableBody = DOM.inwardGoodsList.tBodies[0];

        var tableRows = tableBody.children;

        var tableRowsCount = tableRows.length;

        inwardGoodsDetails.length = 0;

        if (isNaN(inwardId)) { inwardId = 0; }

        if (tableRowsCount > 0) {

            for (var t = 0; t < tableRowsCount; t++) {

                var inputs = tableRows[t].querySelectorAll('input[type="text"]');

                var inwardGoodsId = parseInt(tableRows[t].getAttribute('data-inward-goods-id'));
                var goodsReceiptItemId = parseInt(tableRows[t].getAttribute("data-goods-receipt-item-id"));
                var unitOfMeasurementId = parseInt(tableRows[t].getAttribute('data-unit-of-measurement-id'));
                
                var itemId = parseInt(tableRows[t].getAttribute("data-item-id"));
                var inwardQty = inputs[0].value;                

                if(isNaN(goodsReceiptItemId)) { goodsReceiptItemId = 0; }

                var inwardGoods = {};

                inwardGoods = {
                    InwardGoodsId: inwardGoodsId,
                    InwardId: inwardId,
                    GoodsReceiptItemId: goodsReceiptItemId,
                    ItemId: itemId,
                    InwardQty: inwardQty,
                    UnitOfMeasurementId: unitOfMeasurementId,
                    InwardStatus: 'P',
                    Remarks: null
                };

                if (parseInt(inwardGoodsId) === parseInt(0)) {

                    inwardGoods.CreatedBy = parseInt(LOGGED_USER);
                    inwardGoods.CreatedByIP = IP_ADDRESS;
                }
                else {

                    inwardGoods.ModifiedBy = parseInt(LOGGED_USER);
                    inwardGoods.ModifiedByIP = IP_ADDRESS;
                }

                inwardGoodsDetails.push(inwardGoods);
            }
        }
    }

    function saveInwardDetails() {

        shared.showLoader(DOM.loader);

        try {

            if (validateData()) {

                inwardDetails.length = 0;

                var companyId = parseInt(0);
                var companyName = null;
                var branchId = parseInt(0);
                var branchName = null;
                var inwardId = parseInt(0);
                var inwardNo = parseInt(0);
                var inwardDate = null;
                var referenceId = parseInt(0);
                var fromLocationId = parseInt(0);
                var toLocationId = parseInt(0);
                var referencetype = null;
                var remarks = null;
                var workingPeriodId = parseInt(0);
                var transporterId = parseInt(0);
                var vehicleNo = null;

                companyId = parseInt(DOM.company.options[DOM.company.selectedIndex].value);
                branchId = parseInt(DOM.branch.options[DOM.branch.selectedIndex].value);
                inwardId = parseInt(DOM.inwardId.value);
                inwardNo = parseInt(DOM.inwardNo.value);
                inwardDate = DOM.inwardDate.value;
                referenceId = parseInt(DOM.referenceNo.options[DOM.referenceNo.selectedIndex].value);
                referenceType = DOM.inwardFrom.options[DOM.inwardFrom.selectedIndex].text;
                fromLocationId = parseInt(DOM.fromLocation.getAttribute('data-from-location-id'));
                toLocationId = parseInt(DOM.toLocation.options[DOM.toLocation.selectedIndex].value);
                transporterId = parseInt(DOM.transporter.options[DOM.transporter.selectedIndex].value);
                vehicleNo = DOM.vehicleNo.value;
                workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);

                if (isNaN(companyId)) { companyId = parseInt(0); }
                if (isNaN(branchId)) { branchId = parseInt(0);}
                if (isNaN(inwardId)) { inwardId = parseInt(0); }
                if (isNaN(inwardNo)) { inwardNo = parseInt(0); }
                if (isNaN(referenceId)) { referenceId = parseInt(0); }
                if (isNaN(fromLocationId)) { fromLocationId = parseInt(0); }
                if (isNaN(toLocationId)) { toLocationId = parseInt(0); }
                if (isNaN(transporterId)) { transporterId = parseInt(0);}

                if (referenceType.toLowerCase() === "outward" && DOM.typeOfTransfer.value.toLowerCase() === "stock transfer") {
                    saveInwardGoodsDetails();
                }
                else {
                    saveInwardGoodsDetailsForJobWork();
                }

                var inward = {};

                inward = {
                    InwardId: inwardId,
                    InwardNo: inwardNo,
                    InwardDate: inwardDate,
                    ReferenceId: referenceId,
                    FromLocationId: fromLocationId,
                    ToLocationId: toLocationId,
                    ReferenceType: referenceType,
                    Remarks: remarks,
                    TransporterId: transporterId,
                    VehicleNo: vehicleNo,
                    BranchId: branchId,
                    WorkingPeriodId: workingPeriodId,
                    InwardGoodsDetails: inwardGoodsDetails
                };

                if (parseInt(inwardId) === parseInt(0)) {

                    inward.CreatedBy = parseInt(LOGGED_USER);
                    inward.CreatedByIP = IP_ADDRESS;
                }
                else {

                    inward.ModifiedBy = parseInt(LOGGED_USER);
                    inward.ModifiedByIP = IP_ADDRESS;
                }

                inwardDetails.push(inward);

                var postData = JSON.stringify(inwardDetails);

                shared.sendRequest(SERVICE_PATH + "SaveInwardDetails", "POST", true, "JSON", postData, function (response) {

                    var _response = JSON.parse(response.responseText);

                    if (response.status === 200) {
                        if (parseInt(response.responseText) > parseInt(0)) {
                            swal({
                                title: "Success",
                                text: "Records Saved Succesfully.",
                                type: "success"
                            }, function () {
                                getInwards();
                            });
                        }
                    }
                    else {
                        swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
                    }

                });
            }
        }
        catch (e) {
            handleError("Error in application" + e.message);
        }
        finally {

            shared.hideLoader(DOM.loader);
        }

    }

    function getInwards() {

        inwardDetails.length = 0;
        inwardGoodsDetails.length = 0;

        shared.showLoader(DOM.loader);

        try {

            shared.sendRequest(SERVICE_PATH + "GetAllInwardDetails", "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var _response = JSON.parse(response.responseText);

                        if (_response !== undefined) {

                            if (_response.length > 0) {

                                for (var r = 0; r < _response.length; r++) {

                                    var inward = {};

                                    inward = {
                                        InwardId: _response[r].InwardId,
                                        InwardNo: _response[r].InwardNo,
                                        InwardDate: _response[r].InwardDate,
                                        ReferenceId: _response[r].ReferenceId,
                                        ReferenceType: _response[r].ReferenceType,
                                        ReferenceNo: _response[r].ReferenceNo,
                                        FromLocationId: _response[r].FromLocationId,
                                        FromLocationName: _response[r].FromLocationName,
                                        ToLocationId: _response[r].ToLocationId,
                                        ToLocationName: _response[r].ToLocationName,
                                        TypeOfTransfer: _response[r].TypeOfTransfer,
                                        TypeOfTransferId: _response[r].TypeOfTransferId,
                                        TransporterId: _response[r].TransporterId,
                                        VehicleNo: _response[r].VehicleNo,
                                        Remarks: _response[r].Remarks,
                                        CompanyId: _response[r].CompanyId,
                                        BranchId: _response[r].BranchId,
                                        WorkingPeriodId: _response[r].WorkingPeriodId,
                                        IsDeleted: false,
                                        Guid: _response[r].guid,
                                        SrNo: _response[r].SrNo
                                    };

                                    inwardDetails.push(inward);

                                    // Get Inward Goods Details

                                    var goodsDetails = _response[r].InwardGoodsDetails;

                                    if (goodsDetails.length > 0) {

                                        for (var g = 0; g < goodsDetails.length; g++) {

                                            var inwardGoods = {};

                                            inwardGoods = {
                                                InwardGoodsId: goodsDetails[g].InwardGoodsId,
                                                InwardId: goodsDetails[g].InwardId,
                                                GoodsReceiptItemId: goodsDetails[g].GoodsReceiptItemId,
                                                ItemId: goodsDetails[g].ItemId,
                                                ItemName: goodsDetails[g].ItemName,
                                                UnitOfMeasurementId: goodsDetails[g].UnitOfMeasurementId,
                                                UnitCode: goodsDetails[g].UnitCode,
                                                ReceivedQty: goodsDetails[g].ReceivedQty,
                                                InwardQty: goodsDetails[g].InwardQty,
                                                Remarks: goodsDetails[g].Remarks,
                                                InwardStatus: goodsDetails[g].InwardStatus,
                                                IsDeleted: false,
                                                guid: goodsDetails[g].guid,
                                                SrNo: goodsDetails[g].SrNo
                                            };

                                            inwardGoodsDetails.push(inwardGoods);
                                        }
                                    }
                                }
                            }
                        }

                        bindInwardDetails();
                    }

                    shared.hideLoader(DOM.loader);
                }

                shared.hideLoader(DOM.loader);

            });

        }
        catch (e) {
            handleError("Error in application" + e.message);
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


SharpiTech.InwardDetails.init();
