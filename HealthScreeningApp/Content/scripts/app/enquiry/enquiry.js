
var SharpiTech = {};

SharpiTech.Enquiry = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    var Enquiries = [];
    var Styles = [];
    //var StyleSizesRequirement = [];
    //var StyleItemsRequirement = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.editMode = document.getElementById('EditMode');
        DOM.customerName = document.getElementById('CustomerName');
        DOM.customerAddress = document.getElementById('CustomerAddress');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.enquiryNo = document.getElementById('EnquiryNo');
        DOM.enquiryDate = document.getElementById('EnquiryDate');

        DOM.styleDetails = document.getElementById('StyleDetails');
        DOM.createNewStyle = document.getElementById('CreateNewStyle');
        DOM.showStyles = document.getElementById('ShowStyles');

        DOM.styleModal = document.getElementById('StyleModal');
        DOM.styleNo = document.getElementById('StyleNo');
        DOM.styleType = document.getElementById('StyleType');
        DOM.gender = document.getElementById('Gender');
        DOM.styleDesc = document.getElementById('StyleDesc');
        DOM.tentativeCompletionDate = document.getElementById('TentativeCompletionDate');
        DOM.isSampleRequired = document.getElementsByName('IsSampleRequired');
        DOM.styleSizeRequirement = document.getElementById('StyleSizeRequirement');
        DOM.backToStyle = document.getElementById('BackToStyle');
        DOM.saveStyle = document.getElementById('SaveStyle');

        DOM.itemRequirementDetails = document.getElementById('ItemRequirementDetails');        
        DOM.createNewItemRequirement = document.getElementById('CreateNewItemRequirement');
        DOM.showItemRequirement = document.getElementById('ShowItemRequirement');        
        DOM.itemRequirementModal = document.getElementById('ItemRequirementModal');       
        DOM.itemCategory = document.getElementById('ItemCategory');
        DOM.itemName = document.getElementById('ItemName');
        DOM.itemDesc = document.getElementById('ItemDesc');
        DOM.itemNoImage = document.getElementById('ItemNoImage');
        DOM.itemImage = document.getElementById('ItemImage');
        DOM.uploadItemImage = document.getElementById('UploadItemImage');
        DOM.backToItemRequirement = document.getElementById('BackToItemRequirement');
        DOM.saveItemRequirement = document.getElementById('SaveItemRequirement');

        DOM.showEnquiries = document.getElementById('ShowEnquiries');
        DOM.createNew = document.getElementById('CreateNew');
        DOM.backToView = document.getElementById('BackToView');
        DOM.saveEnquiry = document.getElementById('SaveEnquiry');

        //cache for jquery
        DOM.$styleModal = $('#StyleModal');
        DOM.$itemRequirementModal = $('#ItemRequirementModal');
    }

    function applyPlugins() {

        $('select').select2();
    }

    /* ---- handle errors ---- */
    function handleError(err) {
        consol.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    $("select").on("change", function (event) {

        setFocusOnSelect(event);

    });


    function bindEvents() {

        DOM.createNew.addEventListener('click', createNewEnquiry);
        DOM.backToView.addEventListener('click', backToView);
        DOM.saveEnquiry.addEventListener('click', saveEnquiry);
        DOM.showEnquiries.addEventListener('click', showEnquiry);
        DOM.customerName.change = function () {
            showAddress();
        };
        DOM.createNewStyle.addEventListener('click', createNewStyle);
        DOM.backToStyle.addEventListener('click', closeStyleModal);
        DOM.styleType.change = function () {
            var _styleTypeSelectedIndex = DOM.styleType.selectedIndex;

            if (_styleTypeSelectedIndex > 0) {
                getStyleSizeRequirement(parseInt(DOM.styleType.options[_styleTypeSelectedIndex].value));
            }
        };
        DOM.saveStyle.addEventListener('click', saveStyle);
        DOM.showStyles.addEventListener('click', showStyle);
        DOM.createNewItemRequirement.addEventListener('click', createNewItemRequirement);
        DOM.itemImage.addEventListener('change', showTempImage);
        DOM.uploadItemImage.addEventListener('click', openFileUploadControl);
        DOM.backToItemRequirement.addEventListener('click', closeItemRequirementModal);
        DOM.saveItemRequirement.addEventListener('click', saveItemRequirement);
        DOM.showItemRequirement.addEventListener('click', showItemRequirement);
        DOM.enquiryDate.addEventListener('keydown', inputMask);
    }

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    function loadData() {
        getCustomer();
        getFinancialYear();
        getStyleType();
        getGender();
        getItemCategory();
    }

    function inputMask() {

        
    }

    function showAddress() {

        var selectedIndex = DOM.customerName.selectedIndex;

        DOM.customerAddress.value = DOM.customerName.options[selectedIndex].getAttribute("data-address");
    }

    function getCustomer() {

        var dataAttributes = "Address";

        _shared.fillDropdownWithDataAttributes(SERVICE_PATH + 'GetAllClientAddressess', DOM.customerName, "ClientAddressName", "ClientAddressId", dataAttributes, "Choose Customer");
    }

    function getFinancialYear() {

        _shared.fillDropdown(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year");
    }

    function getStyleType() {

        _shared.fillDropdown(SERVICE_PATH + 'GetAllStyleType', DOM.styleType, "TypeOfStyle", "StyleTypeId", "Choose Style Type");        
    }

    function getGender() {

        _shared.fillDropdown(SERVICE_PATH + 'GetAllGenders', DOM.gender, "GenderName", "GenderId", "Choose Gender");
    }

    function getItemCategory() {

        _shared.fillDropdown(SERVICE_PATH + 'GetAllItemCategories', DOM.itemCategory, "ItemCategoryName", "ItemCategoryId", "Choose Item Category");
    }

    function createNewEnquiry() {

        var controls = {
            EditMode: DOM.editMode,
            ViewMode: DOM.viewMode,
            CreateNew: DOM.createNew,            
            Save: DOM.saveEnquiry,
            Back: DOM.backToView,
        }

        //clear the inputs
        _shared.clearInputs(DOM.editMode);

        DOM.enquiryNo.setAttribute('data-enquiry-id', 0);

        ////show edit panel;
        //DOM.editMode.style.display = "block";
        //DOM.viewMode.style.display = "none";

        _shared.disableControls(DOM.editMode, false);        
        _shared.enableDisableButtons(controls, "NEW");

        DOM.enquiryNo.disabled = true;

        var currentDate = new Date();

        DOM.enquiryDate.value = moment(currentDate).format("DD/MMM/YYYY");

        /* set focus */
        DOM.customerName.focus();
    }

    function viewEnquiry(currentTableRow) {

        var controls = {
            EditMode: DOM.editMode,
            ViewMode: DOM.viewMode,
            CreateNew: DOM.createNew,            
            Save: DOM.saveEnquiry,
            Back: DOM.backToView,
        }

        _shared.clearInputs(DOM.editMode);
        _shared.clearTextAreas(DOM.editMode);
        _shared.disableControls(DOM.editMode, true);        
        _shared.enableDisableButtons(controls, "VIEW");

        DOM.createNewStyle.disabled = true;
        DOM.createNewItemRequirement.disabled = true;

        showSelectedEnquiry(currentTableRow);
    }

    function backToView() {

        /* Get enquiries list */
        getEnquiries();

        DOM.viewMode.style.display = "block";
        DOM.editMode.style.display = "none";
    }

    function isStyleNoSelected() {

        var enquiryStyleId = parseInt(-1);

        var tableBody = DOM.showStyles.tBodies[0];

        var tableRowsCount = tableBody.children.length;
        
        if (tableRowsCount > 0) {

            var tableRows = tableBody.children;

            for (var r = 0; r < tableRowsCount; r++) {

                if (tableRows[r].className.indexOf("highlight-selected-row") >= 0) {
                    enquiryStyleId = parseInt(tableRows[r].getAttribute('data-enquiry-style-id'));
                    break;
                }
            }
        }
        else {
            enquiryStyleId = -2; 
        }

        return enquiryStyleId;
    }

    function createNewItemRequirement() {

        var enquiryStyleId = isStyleNoSelected();
        var enquiryId = parseInt(0);

        if (enquiryStyleId === -2) {
            swal("Error", "You can not add new Item Requirement as there is no data for Style Details.");
            return;
        }
        else if (enquiryStyleId === -1) {
            swal("Error", "Please select the row from Style Details table against which you want to enter the Item Requirement.");
            return;
        }

        //clear the inputs
        _shared.clearInputs(DOM.itemRequirementModal);
        _shared.clearTextAreas(DOM.itemRequirementModal);

        enquiryId = parseInt(DOM.enquiryNo.getAttribute("data-enquiry-id"));
        
        var styleItemsRequirement = getStyleItemsRequirement(enquiryId, enquiryStyleId);
        
        //Set default value
        DOM.itemName.value = DOM.itemName.value;
        DOM.itemName.setAttribute('data-enquiry-style-item-requirement-id', parseInt(0));
        DOM.itemName.setAttribute('data-sr-no', parseInt(getMaxSrNo(styleItemsRequirement, parseInt(0))));

        DOM.$itemRequirementModal.modal('show');

        setFocusOnModal();
    }

    function closeItemRequirementModal() {

        _shared.removeHighlightEffect(DOM.showItemRequirement);

        DOM.$itemRequirementModal.modal('hide');
    }

    function setFocusOnModal() {
        DOM.itemRequirementModal.on('shown.bs.modal', function () {
            DOM.itemCategory.focus();
        });
    }

    function validateItemRequirementData() {

        var isValid = true;

        return isValid;
    }

    function saveItemRequirement() {

        if (validateItemRequirementData()) {

            /* Add new style item in object and show in table */

            StyleItemsRequirement = [];

            var item = {};

            var _enquiryId = parseInt(0);
            var _enquiryNo = null;
            var _srNo = parseInt(0);
            var _enquiryStyleId = parseInt(0);
            var _styleNo = null;
            var _enquiryStyleItemRequirementId = parseInt(0);
            var _itemCategorySelectedIndex = parseInt(0);
            var _itemCategoryId = parseInt(0);
            var _itemCategoryName = null;
            var _itemName = null;
            var _itemDesc = null;
            var _itemImage = null;

            //upload image

            var files = DOM.itemImage.files;

            if (files.length > 0) {

                var oFile = new FormData();

                for (var i = 0; i < files.length; i++) {
                    oFile.append(files[i].name, files[i]);
                    oFile.append("FilePath", "SystemFiles/Enquiry/ItemRequirement/");
                    oFile.append("CreatedBy", parseInt(LOGGED_USER));
                    FileName = files[i].name;
                }

                //var postData = JSON.stringify(enquiries);

                _shared.sendRequest(SERVICE_PATH + "UploadFiles", "POST", true, null, oFile, function (response) {
                    if (response.status === 200) {
                        if (parseInt(response.responseText) > parseInt(0)) {
                            swal("Success", "Records Saved Succesfully.", "success");
                            viewEnquiry();
                        }
                    }
                });
            }

            _enquiryStyleItemRequirementId = parseInt(DOM.itemName.getAttribute("data-enquiry-style-item-requirement-id"));
            _enquiryNo = DOM.enquiryNo.value;
            _enquiryId = parseInt(DOM.enquiryNo.getAttribute("data-enquiry-id"));

            if (isNaN(_enquiryStyleItemRequirementId)) {
                _enquiryStyleItemRequirementId = 0;
            }

            _styleNo = DOM.styleNo.value;
            _enquiryStyleId = parseInt(DOM.styleNo.getAttribute('data-enquiry-style-id'));
            _srNo = parseInt(DOM.itemName.getAttribute('data-sr-no'));

            if (isNaN(_enquiryStyleId)) {
                _enquiryStyleId = 0;
            }

            if (DOM.itemCategory.options.length > 0) {

                _itemCategorySelectedIndex = DOM.itemCategory.selectedIndex;
                _itemCategoryId = parseInt(DOM.itemCategory.options[_itemCategorySelectedIndex].value);
                _itemCategoryName = DOM.itemCategory.options[_itemCategorySelectedIndex].text;
            }

            //if (DOM.itemName.options.length > 0) {
            //    _styleTypeSelectedIndex = DOM.styleType.selectedIndex;
            //    _styleTypeId = parseInt(DOM.styleType.options[_styleTypeSelectedIndex].value);
            //    _styleType = DOM.styleType.options[_styleTypeSelectedIndex].text;
            //}

            _itemName = DOM.itemName.value;
            _itemDesc = DOM.itemDesc.value;
            _itemImage = "SystemFiles/Enquiry/ItemRequirement/" + DOM.itemImage.value.split('\\').pop();

            //if (_srNo > 0) {
            //    //delete the existing row from the item list
            //    deleteItemRequirement(_srNo);
            //}

            item = {
                EnquiryStyleItemRequirementId: _enquiryStyleItemRequirementId,
                EnquiryStyleId: _enquiryStyleId,                
                StyleNo: _styleNo,
                ItemCategoryId: _itemCategoryId,
                ItemCategoryName: _itemCategoryName,
                ItemId: 0,
                ItemName: _itemName,
                ItemDesc: _itemDesc,
                ItemImagePath: _itemImage,
                IsDeleted: false,
                SrNo: _srNo
            };

            if (parseInt(_enquiryStyleItemRequirementId) === parseInt(0)) {

                item.CreatedBy = parseInt(LOGGED_USER);
                item.CreatedByIp = IP_ADDRESS;
                item.ModifiedBy =  parseInt(0);
                item.ModifiedByIp = "";
            }
            else {
                item.CreatedBy = parseInt(0);
                item.CreatedByIp = "";
                item.ModifiedBy =  parseInt(LOGGED_USER);
                item.ModifiedByIp = IP_ADDRESS;
            }

            var enquiries = getEnquiryData(_enquiryId);
            var enquiriesCount = enquiries.length;

            if (enquiriesCount > 0) {

                for (var e = 0; e < enquiriesCount; e++) {

                    if (Enquiries[e].EnquiryId === _enquiryId) {

                        var enquiryStyles = getEnquiryStyles(_enquiryId);
                        var enquiryStylesCount = enquiryStyles.length;

                        if (enquiryStylesCount > 0) {

                            for (var es = 0; es < enquiryStylesCount; es++) {

                                if (enquiryStyles[es].EnquiryId === _enquiryId
                                    && enquiryStyles[es].EnquiryStyleId === _enquiryStyleId) {

                                    Enquiries[e].EnquiryStyles[es].EnquiryStyleItemsRequirement.push(item);
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            //var styleItemsRequirement = getStyleItemsRequirement(_enquiryId, _enquiryStyleId);

            //if (styleItemsRequirement.length > 0) {
            //    styleItemsRequirement.push(item);
            //}

            //StyleItemsRequirement.push(item);

            //if (Styles.length > 0) {
                
            //    for (var s = 0; s < Styles.length; s++) {
                    
            //        if (Styles[s].EnquiryStyleId === _enquiryStyleId) {
            //            Styles[s].EnquiryStyleItemsRequirement = StyleItemsRequirement;
            //        }
            //    }
            //}

            bindItemByEnquiryStyleId(_enquiryStyleId);
        }
    }

    //function bindClientAddress() {

    //    var _table = DOM.addressDetails;

    //    var _tableBody = _table.tBodies[0];

    //    _tableBody.innerHTML = "";

    //    for (var r = 0; r < clientAddressess.length; r++) {

    //        var _currentRow = document.createElement('TR');

    //        var _data;

    //        _data = "<tr><td>" + clientAddressess[r].AddressTypeName + "</td>";
    //        _data += "<td>" + clientAddressess[r].ClientAddressName + "</td>";
    //        _data += "<td>" + clientAddressess[r].CountryName + "</td>";
    //        _data += "<td>" + clientAddressess[r].StateName + "</td>";
    //        _data += "<td>" + clientAddressess[r].CityName + "</td>";
    //        _data += "<td>" + clientAddressess[r].ContactNos + "</td>";
    //        _data += "<td>" + clientAddressess[r].GSTNo + "</td>";
    //        _data += "<td class='text-center'>" +
    //            "<a href='#' class='btn btn-default btn-xs' data-name='view' > <i class='fa fa-lg fa-eye' data-name='view'></i> </a> " +
    //            "<a href='#' class='btn btn-default btn-xs' data-name='edit'> <i class='fa fa-lg fa-edit' data-name='edit'></i></a> " +
    //            "<a href='#' class='btn btn-default btn-xs' data-name='remove' > <i class='fa fa-lg fa-remove' data-name='remove'></i></a> </td></tr>";

    //        //_currentRow.setAttribute('data-client-address-type-id', clientAddressess[r].AddressTypeId);
    //        _currentRow.setAttribute('data-client-address-id', clientAddressess[r].ClientAddressId);
    //        _currentRow.setAttribute('data-sr-no', clientAddressess[r].SrNo);
    //        _currentRow.innerHTML = _data;

    //        _tableBody.appendChild(_currentRow);
    //    }
    //}

    function bindItemByEnquiryStyleId(enquiryStyleId) {

        var table = DOM.showItemRequirement;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        var enquiryId = parseInt(DOM.enquiryNo.getAttribute("data-enquiry-id"));

        var styleItemsRequirement = getStyleItemsRequirement(enquiryId, enquiryStyleId);

        var itemsRequirementCount = styleItemsRequirement.length;

        if (itemsRequirementCount > 0) {

            for (var r = 0; r < itemsRequirementCount; r++) {

                var currentRow = document.createElement('TR');

                var data, imageName;

                var charIndex = styleItemsRequirement[r].ItemImagePath.lastIndexOf("/");

                if (charIndex > 0) {
                    imageName = styleItemsRequirement[r].ItemImagePath.slice(charIndex + 1);
                }

                data = "<tr><td>" + styleItemsRequirement[r].ItemCategoryName + "</td>";
                data += "<td>" + styleItemsRequirement[r].ItemName + "</td>";
                data += "<td>" + styleItemsRequirement[r].ItemDesc + "</td>";
                data += "<td>" + imageName + "</td>";
                data += "<td class='text-center'>" +
                    "<a href='#' class='btn btn-default btn-xs' data-name='view' > <i class='fa fa-lg fa-eye' data-name='view'></i> </a> " +
                    "<a href='#' class='btn btn-default btn-xs' data-name='edit'> <i class='fa fa-lg fa-edit' data-name='edit'></i></a> " +
                    "<a href='#' class='btn btn-default btn-xs' data-name='remove' > <i class='fa fa-lg fa-remove' data-name='remove'></i></a> </td></tr>";

                currentRow.setAttribute('data-enquiry-style-item-requirement-id', parseInt(styleItemsRequirement[r].EnquiryStyleItemRequirementId));
                currentRow.setAttribute('data-sr-no', parseInt(styleItemsRequirement[r].SrNo));
                currentRow.innerHTML = data;

                tableBody.appendChild(currentRow);
            }
        }
    }

    function showItemRequirement(evt) {

        var element = evt.target;

        var currentTableRow = element.parentElement.parentElement.parentElement;

        if (element.nodeName === 'I' || element.nodeName === 'A') {

            if (element.getAttribute('data-name').trim().toUpperCase() === "VIEW") {
                viewItemRequirement(currentTableRow);
            }
            if (element.getAttribute('data-name').trim().toUpperCase() === "EDIT") {
                editItemRequirement(currentTableRow);
            }
            else if (element.getAttribute('data-name').trim().toUpperCase() === "DELETE") {
                deleteItemFromTable(currentTableRow);
            }
        }
    }

    function viewItemRequirement(currentTableRow) {

        _shared.clearInputs(DOM.itemRequirementModal);
        _shared.clearTextAreas(DOM.itemRequirementModal);

        _shared.disableControls(DOM.itemRequirementModal, true);

        showSelectedItemRequirement(currentTableRow);
    }

    function editItemRequirement(currentTableRow) {

        _shared.clearInputs(DOM.itemRequirementModal);
        _shared.clearTextAreas(DOM.itemRequirementModal);

        _shared.disableControls(DOM.itemRequirementModal, false);

        showSelectedItemRequirement(currentTableRow);
    }

    function deleteItemRequirement(srNo) {

        if (StyleItemsRequirement.length > 0) {

            var _filteredRecord = StyleItemsRequirement.filter(function (value, index, array) {
                return value.SrNo === parseInt(srNo) && value.IsDeleted === false;
            });

            for (var i = StyleItemsRequirement.length - 1; i >= 0; i--) {
                if (parseInt(StyleItemsRequirement[i].SrNo) === srNo) {
                    StyleItemsRequirement.splice(i, 1);
                }
            }
        }
    }

    function deleteItemFromTable(currentTableRow) {
        
        var _itemRequirementId = parseInt(DOM.itemName.getAttribute('data-enquiry-style-item-requirement-id'));
        var _enquiryStyleId = 0; // get value of enquiry style id from the selected table row

        if (isNaN(_itemRequirementId)) {
            _itemRequirementId = parseInt(0);
        }

        if (StyleItemsRequirement.length > 0) {

            var _filteredRecord = StyleItemsRequirement.filter(function (value, index, array) {
                return value.EnquiryStyleItemRequirementId === parseInt(_itemRequirementId) && value.IsDeleted === false;
            });

            for (var i = StyleItemsRequirement.length - 1; i >= 0; i--) {

                if (parseInt(StyleItemsRequirement[i].EnquiryStyleItemRequirementId) > 0) {

                    StyleItemsRequirement[i].IsDeleted = true;
                }
                else {
                    StyleItemsRequirement.splice(i, 1);
                }
            }

            bindItemByEnquiryStyleId(_enquiryStyleId);
        }
    }

    function showSelectedItemRequirement(currentTableRow) {

        /* assign text to input controls */
        if (StyleItemsRequirement !== null) {

            if (StyleItemsRequirement !== undefined) {

                if (StyleItemsRequirement.length === 0) {

                    DOM.showItemRequirement.tBodies[0].innerHTML = "";

                }
                else {

                    var selectedItems = StyleItemsRequirement.filter(function (value, index, array) {

                        var itemRequirementId = parseInt(currentTableRow.getAttribute('data-enquiry-style-item-requirement-id'));
                        var srNo = parseInt(currentTableRow.getAttribute('data-sr-no'));

                        if (parseInt(itemRequirementId) > 0) {
                            return value.EnquiryStyleItemRequirementId === parseInt(itemRequirementId)
                                && value.IsDeleted === false;
                        }
                        else {
                            return value.SrNo === parseInt(srNo)
                                && value.IsDeleted === false;
                        }
                    });

                    if (selectedItems.length > 0) {

                        DOM.styleNo.setAttribute('data-sr-no', parseInt(currentTableRow.getAttribute('data-sr-no')));
                        _shared.setSelectValue(DOM.itemCategory, null, parseInt(selectedItems[0].ItemCategoryId));
                        _shared.setSelect2ControlsText(DOM.itemCategory);
                        DOM.itemName.value = selectedItems[0].ItemName;
                        DOM.itemDesc.value = selectedItems[0].ItemDesc;
                        //DOM.itemImage.value = selectedItems[0].ItemImagePath.slice(selectedItems[0].ItemImagePath.lastIndexOf("/") + 1);
                        DOM.itemNoImage.src = "../" + selectedItems[0].ItemImagePath;

                        DOM.$itemRequirementModal.modal('show');
                    }
                }
            }
        }

        //set focus
        DOM.itemCategory.focus();
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

    function createNewStyle() {

        //clear the inputs
        _shared.clearInputs(DOM.styleModal);
        _shared.clearTextAreas(DOM.styleModal);

        var controls = {
            EditMode: undefined,
            ViewMode: undefined,
            CreateNew: DOM.createNewStyle,            
            Save: DOM.saveStyle,
            Back: DOM.backToStyle,
        }

        _shared.enableDisableButtons(controls, "NEW");

        //Set default value
        DOM.styleNo.value = DOM.styleNo.value;
        DOM.styleNo.setAttribute('data-enquiry-style-id', parseInt(0));
        DOM.styleNo.setAttribute('data-sr-no', parseInt(getMaxSrNo(Styles, parseInt(0))));

        if (DOM.styleType.selectedIndex > 0) {

            getStyleSizeRequirement(parseInt(DOM.styleType.options[DOM.styleType.selectedIndex].value));
        }

        DOM.$styleModal.modal('show');

        setFocusOnModal();
    }

    function closeStyleModal() {

        _shared.removeHighlightEffect(DOM.showStyles);

        DOM.$styleModal.modal('hide');
    }

    function setFocusOnModal() {
        DOM.$styleModal.on('shown.bs.modal', function () {
            DOM.styleNo.focus();
        });
    }

    function getStyleSizeRequirement(styleTypeId, callback) {

        var table = DOM.styleSizeRequirement;

        table.innerHTML = "";

        _shared.sendRequest(SERVICE_PATH + "GetStyleSizeByStyleTypeId/" + styleTypeId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var response = JSON.parse(response.responseText);

                    if (response !== undefined) {

                        if (response.length > 0) {

                            var tableHead = document.createElement('thead');

                            var tableHeadRow = document.createElement('tr');

                            table.appendChild(tableHead);

                            tableHead.appendChild(tableHeadRow);

                            var tableBody = document.createElement('tbody');

                            table.appendChild(tableBody);

                            var tableBody = table.tBodies[0];

                            var tableRow = document.createElement('tr');

                            tableBody.appendChild(tableRow);

                            for (var r = 0; r < response.length; r++) {

                                var tableHeads = document.createElement('th');

                                var tableDetails = document.createElement('td');

                                tableHeads.textContent = response[r].Size;
                                tableHeadRow.appendChild(tableHeads);

                                var input = document.createElement('input');
                                input.setAttribute('id', 'StyleSize_' + response[r].Size);
                                input.setAttribute('type', "text");
                                input.setAttribute('class', 'form-control input-sm');
                                input.setAttribute('data-style-size-id', parseInt(response[r].StyleSizeId));
                                input.setAttribute('data-enquiry-style-size-requirement-id', parseInt(0));

                                tableDetails.appendChild(input);

                                tableRow.appendChild(tableDetails);
                            }

                            //_tableHead.appendChild(_tableHeadRow);

                            tableBody.appendChild(tableRow);

                            if (callback !== null) {
                                if (callback !== undefined) {
                                    callback(response);
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    function saveStyleSizeRequirement() {

        //Get the style size requirement table
        //and get no. of rows
        var enquiryStyleSizeRequirementId = parseInt(0);

        var table = DOM.styleSizeRequirement;
        var tableBody = table.tBodies[0];
        var tableRowsCount = tableBody.children.length;

        if (tableRowsCount > 0) {

            var tableRows = tableBody.children;

            var cols = tableRows[0].children.length;

            for (var r = 0; r < cols; r++) {

                var input = tableRows[0].children[r].children[0];

                // if not a number then assign value as zero
                if (isNaN(input.value)) {
                    input.value = parseInt(0);
                }

                if (input.getAttribute("data-enquiry-style-size-requirement-id") !== null) {
                    enquiryStyleSizeRequirementId = parseInt(input.getAttribute("data-enquiry-style-size-requirement-id"));
                }

                if (StyleSizesRequirement.length > 0) {

                    if (enquiryStyleSizeRequirementId > 0) {
                        var record = StyleSizesRequirement.filter(function (value, index, array) {
                            return value.EnquiryStyleSizeRequirementId === parseInt(enquiryStyleSizeRequirementId)
                                && value.IsDeleted === false;
                        });
                    }
                    else {
                        var record = StyleSizesRequirement.filter(function (value, index, array) {
                            return
                                value.EnquiryId === parseInt(DOM.enquiryNo.getAttribute("data-enquiry-id"))
                                && value.EnquiryStyleId === parseInt(DOM.styleNo.getAttribute("data-enquiry-style-id"))
                                && value.EnquiryStyleSizeRequirementId === parseInt(enquiryStyleSizeRequirementId)
                                && value.StyleSizeId === parseInt(input.getAttribute("data-style-size-id"))
                                && value.IsDeleted === false;
                        });
                    }

                    if (record.length === 0) {
                        // call insert method
                        if (input.value !== "" || parseInt(input.value) > 0) {
                            insertSizeRequirement(input);
                        }
                    }
                    else {
                        // call update method
                        updateSizeRequirement(enquiryStyleSizeRequirementId, input);
                    }
                }
                else {
                    // call insert method                    
                    if (input.value !== "" || parseInt(input.value) > 0) {
                        insertSizeRequirement(input);
                    }
                }
            }
        }
    }

    function insertSizeRequirement(input) {

        var sizeRequirement = {};

        var _enquiryId = parseInt(0);
        var _enquiryNo = null;
        var _enquiryStyleId = parseInt(0);
        var _styleTypeId = parseInt(0);
        var _styleType = null;
        var _styleNo = null;
        var _sizeRequirementId = parseInt(0);
        var _styleSizeId = parseInt(0);
        var _styleSize = null;
            var _qty = parseInt(0);

        _enquiryId = parseInt(DOM.enquiryNo.getAttribute("data-enquiry-id"));
        _enquiryNo = DOM.enquiryNo.value;
        _enquiryStyleId = parseInt(DOM.styleNo.getAttribute("data-enquiry-style-id"));
        _styleTypeId = parseInt(DOM.styleType.options[DOM.styleType.selectedIndex].value);
        _styleType = DOM.styleType.options[DOM.styleType.selectedIndex].text;
        _styleNo = DOM.styleNo.value;
        _sizeRequirementId = parseInt(input.getAttribute('data-enquiry-style-size-requirement-id'));
        _styleSizeId = parseInt(input.getAttribute('data-style-size-id'));
        _styleSize = input.id.substring(input.id.lastIndexOf("_") + 1);
        _qty = parseInt(input.value);

        sizeRequirement = {};

        sizeRequirement = {
            EnquiryStyleSizeRequirementId: _sizeRequirementId,            
            EnquiryStyleId: _enquiryStyleId,
            StyleTypeId: _styleTypeId,
            StyleType: _styleType,
            StyleNo: _styleNo,
            StyleSizeId: _styleSizeId,
            StyleSize: _styleSize,
            Qty: _qty,
            IsDeleted: false,
            CreatedBy: parseInt(LOGGED_USER),
            CreatedByIp: IP_ADDRESS
        }

        StyleSizesRequirement.push(sizeRequirement);

    }

    function updateSizeRequirement(sizeRequirementId, input) {

        if (StyleSizesRequirement.length > 0) {

            for (var sr = 0; sr < StyleSizesRequirement.length; sr++) {

                if (parseInt(StyleSizesRequirement[sr].EnquiryStyleSizeRequirementId) === parseInt(sizeRequirementId)
                    && parseInt(StyleSizesRequirement[sr].StyleSizeId) === parseInt(input.getAttribute("data-style-size-id"))) {

                    StyleSizesRequirement[sr].Qty = parseInt(input.value);

                    if (parseInt(qty) === 0) {
                        StyleSizesRequirement[sr].IsDeleted = true;
                        StyleSizesRequirement[sr].DeletedBy = parseInt(LOGGED_USER);
                        StyleSizesRequirement[sr].DeletedByIp = IP_ADDRESS;
                    }
                    else {
                        StyleSizesRequirement[sr].IsDeleted = false;
                        StyleSizesRequirement[sr].ModifiedBy = parseInt(LOGGED_USER);
                        StyleSizesRequirement[sr].ModifiedByIp = IP_ADDRESS;
                    }

                    break;
                }
            }
        }
    }

    function saveStyle() {

        if (validateStyleData()) {

            /* Add new style in object and show in table */

            StyleSizesRequirement = [];

            saveStyleSizeRequirement();

            var style = {};

            var _enquiryId = parseInt(0);
            var _enquiryNo = null;
            var _srNo = parseInt(0);
            var _enquiryStyleId = parseInt(0);
            var _styleNo = parseInt(0);
            var _styleTypeSelectedIndex = parseInt(0);
            var _styleTypeId = parseInt(0);
            var _styleType = null;
            var _genderSelectedIndex = parseInt(0);
            var _genderId = parseInt(0);
            var _gender = null;
            var _styleDesc = null;
            var _tentativeCompletionDate = null;
            var _isSampleRequired = false;

            _enquiryId = parseInt(DOM.enquiryNo.getAttribute("data-enquiry-id"));
            _enquiryNo = DOM.enquiryNo.value;
            _enquiryStyleId = parseInt(DOM.styleNo.getAttribute("data-enquiry-style-id"));

            if (_enquiryStyleId !== null) {
                if (_enquiryStyleId !== undefined) {
                    _enquiryStyleId = parseInt(_enquiryStyleId);
                }
            }

            _styleNo = DOM.styleNo.value;
            _srNo = parseInt(DOM.styleNo.getAttribute('data-sr-no'));
            
            if (DOM.styleType.options.length > 0) {
                _styleTypeSelectedIndex = DOM.styleType.selectedIndex;
                _styleTypeId = parseInt(DOM.styleType.options[_styleTypeSelectedIndex].value);
                _styleType = DOM.styleType.options[_styleTypeSelectedIndex].text;
            }

            if (DOM.gender.options.length > 0) {
                _genderSelectedIndex = DOM.gender.selectedIndex;
                _genderId = parseInt(DOM.gender.options[_genderSelectedIndex].value);
                _gender = DOM.gender.options[_genderSelectedIndex].text;
            }

            _styleDesc = DOM.styleDesc.value;
            _tentativeCompletionDate = DOM.tentativeCompletionDate.value;
            _isSampleRequired = _shared.getRadioSelectedValue(DOM.isSampleRequired);

            _isSampleRequired.toUpperCase() === "NO" ? _isSampleRequired = false : _isSampleRequired = true;
            
            if (_srNo > 0) {
                //delete the existing row from the style list
                deleteStyle(_srNo);
            }

            style = {
                EnquiryStyleId: _enquiryStyleId,                
                EnquiryId: _enquiryId,
                EnquiryNo: _enquiryNo,
                StyleNo: _styleNo,
                StyleTypeId: _styleTypeId,
                TypeOfStyle: _styleType,
                GenderId: _genderId,
                GenderName: _gender,
                StyleDesc: _styleDesc,
                TentativeCompletionDate: _tentativeCompletionDate,
                IsSampleRequired: _isSampleRequired,
                IsDeleted: false,
                SrNo: _srNo,
                EnquiryStyleSizesRequirement: StyleSizesRequirement
            };

            if (parseInt(_enquiryStyleId) === parseInt(0)) {

                style.CreatedBy = parseInt(LOGGED_USER);
                style.CreatedByIp = IP_ADDRESS;
                style.ModifiedBy =  parseInt(0);
                style.ModifiedByIp = "";
            }
            else {
                style.CreatedBy = parseInt(0);
                style.CreatedByIp = "";
                style.ModifiedBy =  parseInt(LOGGED_USER);
                style.ModifiedByIp = IP_ADDRESS;
            }

            var enquiry = getEnquiryData(_enquiryId);
            var enquiryCount = enquiry.length;

            if (enquiryCount > 0) {
                for (var e = 0; e < enquiryCount; e++) {
                    if (Enquiries[e].EnquiryId === _enquiryId) {
                        Enquiries[e].EnquiryStyles.push(style);
                    }
                }
            }

            //Styles.push(style);

            bindStyleByEnquiryId(_enquiryId);
        }
    }

    function openFileUploadControl() {

        DOM.itemImage.click();
    }

    function showTempImage() {

        //var regex = /^([a-zA-Z0-9\s_\\.\-:])+( + fileExtensionsAllowed + ")$/;
        var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
        
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        //if ($(this) !== undefined) {
            if (regex.test($(this).val().toLowerCase())) {
                if (msie > 0) {
                    //if ( ) {//$.browser.msie && parseFloat(jQuery.browser.version) <= 9.0) {
                    $("#ItemImage").show();
                    $("#ItemImage")[0].filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = $(this).val();
                    //}
                }
                else {
                    if (typeof (FileReader) != "undefined") {
                        $("#ItemNoImage").show();

                        var i = $('.icon-block').find('i');

                        $(i).hide();

                        var reader = new FileReader();
                        reader.onload = function (e) {
                            DOM.itemNoImage.setAttribute("src", e.target.result);
                            //var frame = document.getElementById('CourseBroucherImage1');
                            //frame.src = e.target.result;
                        }
                        reader.readAsDataURL($(this)[0].files[0]);
                    } else {
                        alert("This browser does not support FileReader.");
                    }
                }
            } else {
                alert("Please upload a valid image file.");
            }
        //}
    }

    /**
     * Bind style by enquiry id
     * @param {any} enquiryId - Enquiry Id
     */
    function bindStyleByEnquiryId(enquiryId) {

        var table = DOM.showStyles;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        var enquiryStyles = getEnquiryStyles(parseInt(enquiryId));

        var enquiryStylesCount = enquiryStyles.length;

        if (enquiryStylesCount > 0) {

            for (var r = 0; r < enquiryStylesCount; r++) {

                var currentRow = document.createElement('TR');

                var data;

                data = "<tr><td>" + enquiryStyles[r].StyleNo + "</td>";
                data += "<td>" + enquiryStyles[r].TypeOfStyle + "</td>";
                data += "<td>" + enquiryStyles[r].GenderName + "</td>";
                data += "<td>" + enquiryStyles[r].StyleDesc + "</td>";
                data += "<td>" + enquiryStyles[r].TentativeCompletionDate + "</td>";
                data += "<td>" + enquiryStyles[r].IsSampleRequired + "</td>";
                data += "<td class='text-center'>" +
                    "<a href='#' class='btn btn-default btn-xs' data-name='view' > <i class='fa fa-lg fa-eye' data-name='view'></i> </a> " +
                    "<a href='#' class='btn btn-default btn-xs' data-name='edit'> <i class='fa fa-lg fa-edit' data-name='edit'></i></a> " +
                    "<a href='#' class='btn btn-default btn-xs' data-name='remove' > <i class='fa fa-lg fa-remove' data-name='remove'></i></a> </td></tr>";

                currentRow.setAttribute('data-enquiry-style-id', parseInt(enquiryStyles[r].EnquiryStyleId));
                currentRow.setAttribute('data-sr-no', parseInt(enquiryStyles[r].SrNo));
                currentRow.innerHTML = data;

                tableBody.appendChild(currentRow);

                if (r === 0) {

                    _shared.highlightSelectedRow(currentRow);

                    bindItemByEnquiryStyleId(parseInt(enquiryStyles[r].EnquiryStyleId));
                }
            }
        }

        //var enquiryStyles = selectedEnquiry[0].EnquiryStyles;

        //                var styles = enquiryStyles.filter(function (value, index, array) {
        //                    return value.EnquiryId === parseInt(enqiuryId);
        //                });

        //                if (styles.length > 0) {
        //                    for (var es = 0; es < styles.length; es++) {
        //                        bindItemByEnquiryStyleId(styles[es].EnquiryStyleId);
        //                    }                            
        //                }
    }

    /**
     * Show enquiry style
     * @param {any} evt - The target element name which is clicked
     */
    function showStyle(evt) {
        
        var element = evt.target;

        var currentTableRow = element.parentElement;

        if (element.nodeName === 'I' || element.nodeName === 'A') {

            currentTableRow = element.parentElement.parentElement.parentElement;

            if (element.getAttribute('data-name').trim().toUpperCase() === "VIEW") {
                viewStyle(currentTableRow);
            }
            if (element.getAttribute('data-name').trim().toUpperCase() === "EDIT") {
                editStyle(currentTableRow);
            }
            else if (element.getAttribute('data-name').trim().toUpperCase() === "DELETE") {
                deleteStyleFromTable(currentTableRow);
            }
        }
        else {

            var _enquiryStyleId = parseInt(currentTableRow.getAttribute("data-enquiry-style-id"));

            if (isNaN(_enquiryStyleId)) {
                _enquiryStyleId = parseInt(0);
            }

            bindItemByEnquiryStyleId(_enquiryStyleId);
        }

        _shared.highlightSelectedRow(currentTableRow);        
    }

    function getEnquiryData(enquiryId) {

        var enquiry = Enquiries.filter(function (value, index, array) {
            return value.EnquiryId === parseInt(enquiryId);
        });

        return enquiry;
    }

    function getEnquiryStyles(enquiryId) {

        var enquiry = getEnquiryData(enquiryId);
        
        var enquiryStyles = enquiry[0].EnquiryStyles.filter(function (value, index, array) {
            return value.EnquiryId === parseInt(enquiryId);
            //&& value.IsDeleted === false;
            //}
        });

        return enquiryStyles;
    }
    
    function getStyleSizesRequirement(enquiryId, enquiryStyleId) {

        var enquiryStyles = getEnquiryStyles(enquiryId);

        var enquiryStylesCount = enquiryStyles.length;

        var styleSizesRequirement= [];

        if (enquiryStylesCount > 0) {

            for (var es = 0; es < enquiryStylesCount; es++) {

                styleSizesRequirement = enquiryStyles[es].EnquiryStyleSizesRequirement.filter(function (value, index, array) {
                    return value.EnquiryStyleId === parseInt(enquiryStyleId);
                    //&& value.IsDeleted === false;
                    //}
                });

                if (styleSizesRequirement.length > 0) {
                    break;
                }
            }
        }

        return styleSizesRequirement;
    }

    function getStyleItemsRequirement(enquiryId, enquiryStyleId) {

        var enquiryStyles = getEnquiryStyles(enquiryId);

        var enquiryStylesCount = enquiryStyles.length;

        var styleItemsRequirement = [];

        if (enquiryStylesCount > 0) {

            for (var es = 0; es < enquiryStylesCount; es++) {

                if (enquiryStyles[es].hasOwnProperty("EnquiryStyleItemsRequirement")) {
                    styleItemsRequirement = enquiryStyles[es].EnquiryStyleItemsRequirement.filter(function (value, index, array) {
                        return value.EnquiryStyleId === parseInt(enquiryStyleId);
                        //&& value.IsDeleted === false;
                        //}
                    });

                }

                if (styleItemsRequirement.length > 0) {
                    break;
                }
            }
        }

        return styleItemsRequirement;
    }

    /**
     * View enquiry style
     * @param {any} currentTableRow - The current table row pass to the showSelectedStyle method. 
     */
    function viewStyle(currentTableRow) {

        var controls = {
            EditMode: undefined,
            ViewMode: undefined,
            CreateNew: DOM.createNewStyle,            
            Save: DOM.saveStyle,
            Back: DOM.backToStyle,
        }

        _shared.clearInputs(DOM.styleModal);
        _shared.clearTextAreas(DOM.styleModal);

        _shared.disableControls(DOM.styleModal, true);
        _shared.enableDisableButtons(controls, "VIEW");

        showSelectedStyle(currentTableRow);

    }

    /**
     * Edit enquiry style
     * @param {any} currentTableRow - The current table row pass to the showSelectedStyle method.
     */
    function editStyle(currentTableRow) {

        var controls = {
            EditMode: undefined,
            ViewMode: undefined,
            CreateNew: DOM.createNewStyle,            
            Save: DOM.saveStyle,
            Back: DOM.backToStyle,
        }

        _shared.clearInputs(DOM.styleModal);
        _shared.clearTextAreas(DOM.styleModal);

        _shared.disableControls(DOM.styleModal, false);
        _shared.enableDisableButtons(controls, "EDIT");

        showSelectedStyle(currentTableRow);
    }

    /**
     * Delete enquiry style
     * @param {any} srNo - The srNo to delete the item from Styles. 
     */
    function deleteStyle(srNo) {

        if (Styles.length > 0) {

            var filteredRecord = Styles.filter(function (value, index, array) {
                return value.SrNo === parseInt(srNo) && value.IsDeleted === false;
            });

            for (var ca = Styles.length - 1; ca >= 0; ca--) {
                if (parseInt(Styles[ca].SrNo) === srNo) {
                    Styles.splice(ca, 1);
                }
            }
        }
    }

    function deleteStyleSizeRequirement(styleSizeId) {

        if (StyleSizesRequirement.length > 0) {

            var filteredRecord = StyleSizesRequirement.filter(function (value, index, array) {
                return value.StyleSizeId === parseInt(styleSizeId)
                    && value.IsDeleted === false;
            });

            for (var ca = StyleSizesRequirement.length - 1; ca >= 0; ca--) {
                if (parseInt(StyleSizesRequirement[ca].StyleSizeId) === parseInt(styleSizeId)) {
                    StyleSizesRequirement.splice(ca, 1);
                }
            }
        }
    }

    function deleteStyleFromTable(currentTableRow) {
        
        var enquiryId = parseInt(DOM.enquiryNo.getAttribute('data-enquiry-style-id'));
        var enquiryNo = DOM.enquiryNo.value;

        if (isNaN(_styleId)) {
            styleId = parseInt(0);
        }

        if (Styles.length > 0) {

            var filteredRecord = Styles.filter(function (value, index, array) {
                return value.EnquiryStyleId === parseInt(currentTableRow.getAttribute('data-enquiry-style-id')) && value.IsDeleted === false;
            });

            for (var s = Styles.length - 1; s >= 0; s--) {

                if (parseInt(Styles[s].EnquiryStyleId) > 0) {

                    Styles[s].IsDeleted = true;
                }
                else {
                    Styles.splice(s, 1);
                }
            }

            bindStyleByEnquiryId(enquiryId);
        }
    }

    function showSelectedStyle(currentTableRow) {

        var enquiryId = parseInt(DOM.enquiryNo.getAttribute("data-enquiry-id"));
        var enquiryStyleId = parseInt(currentTableRow.getAttribute('data-enquiry-style-id'));
        var srNo = parseInt(currentTableRow.getAttribute('data-sr-no'));

        var enquiryStyles = getEnquiryStyles(enquiryId);
        var enquiryStylesCount = enquiryStyles.length;
        
        if (enquiryStylesCount > 0) {

            //enquiryStyle = enquiryStyles.filter(function (value, index, array) {

            //    if (parseInt(enquiryStyleId) > 0) {
            //        return value.EnquiryStyleId === parseInt(enquiryStyleId) && value.IsDeleted === false;
            //    }
            //    else {
            //        return value.SrNo === parseInt(srNo) && value.IsDeleted === false;
            //    }
            //});

            for (var es = 0; es < enquiryStylesCount; es++) {

                if (enquiryStyles[es].EnquiryStyleId === enquiryStyleId
                    && enquiryStyles[es].SrNo === srNo) {

                    DOM.styleNo.value = enquiryStyles[es].StyleNo;
                    DOM.styleNo.setAttribute('data-enquiry-style-id', parseInt(currentTableRow.getAttribute('data-enquiry-style-id')));
                    DOM.styleNo.setAttribute('data-sr-no', parseInt(currentTableRow.getAttribute('data-sr-no')));
                    _shared.setSelectValue(DOM.styleType, null, parseInt(enquiryStyles[es].StyleTypeId));
                    _shared.setSelect2ControlsText(DOM.styleType);
                    _shared.setSelectValue(DOM.gender, null, parseInt(enquiryStyles[es].GenderId));
                    _shared.setSelect2ControlsText(DOM.gender);
                    DOM.styleDesc.value = enquiryStyles[es].StyleDesc;
                    DOM.tentativeCompletionDate.value = enquiryStyles[es].TentativeCompletionDate;
                    DOM.isSampleRequired.value = enquiryStyles[es].IsSampleRequired;

                    // Show selected style size details
                    showSelectedStyleSize(enquiryStyles[es].StyleTypeId, enquiryStyles[es].EnquiryId, enquiryStyles[es].EnquiryStyleId);

                    break;
                }
            }
            
            DOM.$styleModal.modal('show');
        }
       
        //set focus
        DOM.styleNo.focus();
    }

    function showSelectedStyleSize(styleTypeId, enquiryId, enquiryStyleId) {

        var table = DOM.styleSizeRequirement;

        getStyleSizeRequirement(styleTypeId, function (data) {

            if (data.length > 0) {

                //get size requirement
                var styleSizesRequirement = getStyleSizesRequirement(enquiryId, enquiryStyleId);

                if (styleSizesRequirement.length > 0) {

                    var tableBody = table.tBodies[0];

                    var tableRowsCount = tableBody.children.length;

                    if (tableRowsCount > 0) {

                        var tableRows = tableBody.children;

                        var tableDetailsCount = tableRows[0].children.length;

                        for (var r = 0; r < tableDetailsCount; r++) {

                            var input = tableRows[0].children[r].children[0];

                            //var filterSize = styleSizesRequirement.filter(function (value, index, array) {
                            //    if (parseInt(enquiryStyleId) >= 0) {
                            //        return value.EnquiryStyleId === parseInt(enquiryStyleId)
                            //            && value.StyleTypeId === parseInt(styleTypeId)
                            //            && value.StyleSizeId === parseInt(input.getAttribute('data-style-size-id'))
                            //            && value.IsDeleted === false;
                            //    }
                            //});

                            for (var s = 0; s < styleSizesRequirement.length; s++) {

                                if (styleSizesRequirement[s].EnquiryStyleId === enquiryStyleId &&
                                    styleSizesRequirement[s].StyleTypeId === styleTypeId &&
                                    styleSizesRequirement[s].StyleSizeId === parseInt(input.getAttribute('data-style-size-id'))) {

                                    if (styleSizesRequirement[s].Qty > 0) {

                                        input.value = parseFloat(styleSizesRequirement[s].Qty).toFixed(2);
                                        input.setAttribute("data-enquiry-style-size-requirement-id", parseInt(styleSizesRequirement[s].EnquiryStyleSizeRequirementId));
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    //ENQUIRY START
    function showEnquiry(evt) {

        var element = evt.target;

        var currentTableRow = element.parentElement.parentElement.parentElement;

        if (element.nodeName === 'A' || element.nodeName === 'I') {

            if (element.getAttribute('data-name').trim().toUpperCase() === "VIEW") {
                viewEnquiry(currentTableRow);
            }
            if (element.getAttribute('data-name').trim().toUpperCase() === "EDIT") {
                editEnquiry(currentTableRow);
            }
            else if (element.getAttribute('data-name').trim().toUpperCase() === "DELETE") {
                deleteEnquiry(currentTableRow);
            }
        }
    }

    function editEnquiry(currentTableRow) {

        _shared.clearInputs(DOM.editMode);
        _shared.clearTextAreas(DOM.editMode);

        _shared.disableControls(DOM.editMode, false);

        DOM.createNewStyle.disabled = false;
        DOM.createNewItemRequirement.disabled = false;

        showSelectedEnquiry(currentTableRow);
    }

    function showSelectedEnquiry(currentTableRow) {

        var enquiryId = currentTableRow.getAttribute('data-enquiry-id');

        /* assign text to input controls */
        if (Enquiries !== null) {

            if (Enquiries !== undefined) {

                if (Enquiries.length > 0) {

                    var selectedEnquiry = Enquiries.filter(function (value, index, array) {
                        return value.EnquiryId === parseInt(enquiryId);
                    });

                    if (selectedEnquiry.length > 0) {

                        DOM.viewMode.style.display = "none";
                        DOM.editMode.style.display = "block";

                        _shared.setSelectValue(DOM.financialYear, null, parseInt(selectedEnquiry[0].FinancialYear));
                        _shared.setSelect2ControlsText(DOM.financialYear);
                        DOM.enquiryNo.value = selectedEnquiry[0].EnquiryNo;
                        DOM.enquiryNo.setAttribute('data-enquiry-id', selectedEnquiry[0].EnquiryId);
                        DOM.enquiryDate.value = selectedEnquiry[0].EnquiryDate;
                        _shared.setSelectValue(DOM.customerName, null, parseInt(selectedEnquiry[0].CustomerName));
                        _shared.setSelect2ControlsText(DOM.customerName);
                        DOM.customerAddress.value = selectedEnquiry[0].ClientAddress;

                        bindStyleByEnquiryId(enquiryId);                        
                    }
                }
            }
        }
        
        //set focus
        DOM.customerName.focus();
    }

    function deleteEnquiry(currentTableRow) {

        var _table = DOM.showEnquiries;
        var _tableBody = _table.tBodies[0];


        /* temp variable */
        var _enquiryId = currentTableRow.getAttribute('data-enquiry-id');
        
        var enquiry = {};

        enquiry = {
            EnquiryId: _enquiryId,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(client);
        
        _shared.sendRequest(SERVICE_PATH + 'DeleteEnquiry', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    _tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function validateStyleData() {

        var isValid = true;

        //if (DOM.customerName.selectedIndex === -1 || DOM.customerName.selectedIndex === 0) {
        //    isValid = false;
        //    swal("Error!!!", "Please select the Customer.", "error");
        //}
        //else if (DOM.enquiryDate.value === "") {
        //    isValid = false;
        //    swal("Error!!!", "Please enter the Enquiry Date.", "error");
        //}
        //else
        if (DOM.styleNo.value === "") {
            isValid = false;
            swal("Error!!!", "Please enter the Style No..", "error");        
        }
        else if (DOM.styleType.selectedIndex === -1) {
            isValid = false;
            swal("Error!!!", "Please select the Style Type.", "error");            
        }
        else if (DOM.gender.selectedIndex === -1) {
            isValid = false;
            swal("Error!!!", "Please select the Gender.", "error");            
        }

        return isValid;
    }

    function validateEnquiryData() {

        var isValid = true;

        if (DOM.customerName.selectedIndex === -1 || DOM.customerName.selectedIndex === 0) {
            isValid = false;
            swal("Error!!!", "Please select the Customer.", "error");
        }
        else if (DOM.enquiryDate.value === "") {
            isValid = false;
            swal("Error!!!", "Please enter the Enquiry Date.", "error");
        }
        else if (Styles.length === 0) {
            isValid = false;
            swal("Error!!!", "Please enter the Style Details.", "error");
        }
        else if (StyleSizesRequirement.length === 0) {
            isValid = false;
            swal("Error!!!", "Please enter the Size Requirement.", "error");
        }
        else if (StyleItemsRequirement.length === 0) {
            isValid = false;
            swal("Error!!!", "Please enter the Style Item Requirement.", "error");
        }

        return isValid;
    }


    function saveEnquiry() {

        if (validateEnquiryData()) {

            var enquiries = [];

            /* temp variable */
            var _clientSelectedIndex = DOM.customerName.selectedIndex;
            var _clientAddressId = parseInt(DOM.customerName.options[_clientSelectedIndex].value);
            var _clientAddressName = DOM.customerName.options[_clientSelectedIndex].text;
            var _financialYearSelectedIndex = DOM.financialYear.selectedIndex;
            var _financialYear = DOM.financialYear.options[_financialYearSelectedIndex].text;
            var _enquiryId = parseInt(DOM.enquiryNo.getAttribute('data-enquiry-id'));
            var _enquiryNo = DOM.enquiryNo.value;
            var _enquiryDate = DOM.enquiryDate.value;
            var _enquiryStyles = Styles;
            var _styleSizesRequirement = StyleSizesRequirement;
            var _styleItemsRequirement = StyleItemsRequirement;

            if (isNaN(_clientAddressId)) {
                _clientAddressId = parseInt(0);
            }

            if (isNaN(_enquiryId)) {
                _enquiryId = parseInt(0);
            }

            if (_enquiryStyles.length > 0) {
                var _selectedEnquiryStyles = _enquiryStyles.filter(function (value, index, array) {
                    return value.EnquiryId === _enquiryId;
                });
            }
 
            var enquiry = {};
            
            enquiry = {
                    ClientAddressId: _clientAddressId,
                    CustomerName: _clientAddressName,
                    EnquiryId: _enquiryId,
                    EnquiryNo: _enquiryNo,
                    EnquiryDate: _enquiryDate,
                    EnquiryStyles: _selectedEnquiryStyles                    
                };

            //enquiry.EnquiryStyles.EnquiryStyleSizesRequirement = _styleSizesRequirement;
            //enquiry.EnquiryStyles.EnquiryStyleItemsRequirement = _styleItemsRequirement;

            if (parseInt(_enquiryId) === parseInt(0)) {
                enquiry.CreatedBy = parseInt(LOGGED_USER);
                enquiry.CreatedByIp = IP_ADDRESS;
                enquiry.ModifiedBy =  parseInt(0);
                enquiry.ModifiedByIp = "";
            }
            else {
                enquiry.CreatedBy = parseInt(0);
                enquiry.CreatedByIp = "";
                enquiry.ModifiedBy =  parseInt(LOGGED_USER);
                enquiry.ModifiedByIp = IP_ADDRESS;
            }

            enquiries.push(enquiry);

            var postData = JSON.stringify(enquiries);

            _shared.sendRequest(SERVICE_PATH + "SaveEnquiry", "POST", true, "JSON", postData, function (response) {
                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal("Success", "Records Saved Succesfully.", "success");
                        getEnquiries();
                    }
                }
            });
        }

    }

    function getEnquiries() {
        
        if (Enquiries !== undefined) {

            if (Enquiries !== null) {

                if (Enquiries.length > 0) {

                    return Enquiries;
                }
                else {

                    DOM.viewMode.style.display = "none";
                    DOM.editMode.style.display = "block";

                    DOM.showEnquiries.tBodies[0].innerHTML = "";

                    _shared.sendRequest(SERVICE_PATH + "GetAllEnquiries", "GET", true, "JSON", null, function (response) {
                        
                        if (response.status === 200) {

                            if (response.responseText !== undefined) {

                                var _response = JSON.parse(response.responseText);

                                if (_response !== []) {

                                    Enquiries = _response;

                                    var table = DOM.showEnquiries;

                                    var tableBody = table.tBodies[0];

                                    for (var r = 0; r < _response.length; r++) {

                                        var currentRow = document.createElement('TR');

                                        var data;

                                        data = "<tr><td>" + _response[r].Sr + "</td>";
                                        data += "<td>" + _response[r].EnquiryNo + "</td>";
                                        data += "<td>" + _response[r].EnquiryDate + "</td>";
                                        data += "<td>" + _response[r].ClientAddressName + "</td>";
                                        data += "<td>" + _response[r].FinancialYear + "</td>";
                                        data += "<td class='text-center'>" +
                                            "<a href='#' class='btn btn-info btn-xs' data-name='view'> <i class='fa fa-eye' data-name='view'> </i> </a> " +
                                            "<a href='#' class='btn btn-info btn-xs' data-name='edit'> <i class='fa fa-pencil' data-name='edit'> </i> </a> " +
                                            "<a href='#' class='btn btn-danger btn-xs' data-name='delete'> <i class='fa fa-remove' data-name='delete'> </i> </a> </td > ";

                                        currentRow.setAttribute('data-enquiry-id', _response[r].EnquiryId);
                                        currentRow.innerHTML = data;

                                        tableBody.appendChild(currentRow);
                                    }

                                    DOM.viewMode.style.display = "block";
                                    DOM.editMode.style.display = "none";
                                }
                            }
                        }
                        else {
                            console.log(JSON.parse(response.responseText));
                            swal("Error!!!", "Unable to fetch the data.", "error");
                        }
                    });
                }
            }
        }
    }
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        applyPlugins();        
        bindEvents();
        loadData();
        getEnquiries();
    }

    return {
        init: init
    };

}());


SharpiTech.Enquiry.init();
