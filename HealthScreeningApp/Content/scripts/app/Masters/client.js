
var SharpiTech = {};

SharpiTech.Client = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var clients = [];
    var clientAddressess = [];
    var transporters = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');
        DOM.viewMode = document.getElementById('ViewMode');
        DOM.clientList = document.getElementById('ClientList');
        
        DOM.editMode = document.getElementById('EditMode');
        DOM.clientType = document.getElementById('ClientType');
        DOM.clientName = document.getElementById('ClientName');
        DOM.panno = document.getElementById('PANNo');
        DOM.addNewClient = document.getElementById('AddNewClient');
        DOM.showClientList = document.getElementById('ShowClientList');
        DOM.viewClient = document.getElementById('ViewClient');
        DOM.editClient = document.getElementById('EditClient');
        DOM.saveClient = document.getElementById('SaveClient');
        DOM.deleteClient = document.getElementById('DeleteClient');
        DOM.filterClient = document.getElementById('FilterClient');
        DOM.exportClientList = document.getElementById('ExportClientList');
        DOM.saveClient = document.getElementById('SaveClient');

        DOM.clientAddressViewSection = document.getElementById('ClientAddressViewSection');
        DOM.clientAddressEditSection = document.getElementById('ClientAddressEditSection');
        DOM.addNewClientAddress = document.getElementById('AddNewClientAddress');
        DOM.showClientAddressList = document.getElementById('ShowClientAddressList');
        DOM.clientAddressList = document.getElementById('ClientAddressList');
        DOM.editClientAddress = document.getElementById('EditClientAddress');
        DOM.saveClientAddress = document.getElementById('SaveClientAddress');
        DOM.saveAndAddNewClientAddress = document.getElementById('SaveAndAddNewClientAddress');
        DOM.deleteClientAddress = document.getElementById('DeleteClientAddress');
        DOM.addressDetails = document.getElementById('AddressDetails');
        DOM.addressType = document.getElementById('AddressType');
        DOM.clientAddressName = document.getElementById('ClientAddressName');
        DOM.address = document.getElementById('Address');
        DOM.country = document.getElementById('Country');
        DOM.state = document.getElementById('State');
        DOM.city = document.getElementById('City');
        DOM.addNewCity = document.getElementById('AddNewCity');
        DOM.refreshCityList = document.getElementById('RefreshCityList');
        DOM.area = document.getElementById('Area');
        DOM.pincode = document.getElementById('PinCode');
        DOM.contactNos = document.getElementById('ContactNos');
        DOM.emailId = document.getElementById('EmailId');
        DOM.website = document.getElementById('Website');
        DOM.gstno = document.getElementById('GSTNo');
        DOM.transporter = document.getElementById('Transporter');
        DOM.addTransporter = document.getElementById('AddTransporter');
        DOM.transportersList = document.getElementById('TransportersListContainer');
        DOM.transportersList = document.getElementById('TransportersList');
    }

    function applyPlugins() {

        $('select').select2();
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

        DOM.showClientList.addEventListener('click', getClientList);
        DOM.addNewClient.addEventListener('click', addNewClient);
        DOM.viewClient.addEventListener('click', viewClient);
        DOM.editClient.addEventListener('click', editClient);
        DOM.saveClient.addEventListener('click', saveClient);
        DOM.deleteClient.addEventListener('click', deleteClient);
        //DOM.filterClient.addEventListener('click', filterClient);
        //DOM.exportClientList.addEventListener('click', exportClientList);

        //DOM.clientAddressList.addEventListener('click', clientAddressList);
        DOM.addNewClientAddress.addEventListener('click', addNewClientAddress);
        DOM.showClientAddressList.addEventListener('click', showClientAddressList);
        DOM.editClientAddress.addEventListener('click', editClientAddress);
        DOM.saveClientAddress.addEventListener('click', saveClientAddress);
        //DOM.saveAndAddNewClientAddress.addEventListener('click', saveAndAddNewClientAddress);
        DOM.addNewCity.addEventListener('click', addNewCity);
        DOM.refreshCityList.addEventListener('click', refreshCityList);
        DOM.addTransporter.addEventListener('click', addTransporter);

        DOM.panno.onblur = function (evt) {
            appendGSTNo();
        };

        DOM.country.change = function (evt) {
            getStates(this.value);
        };

        DOM.state.change = function (evt) {
            getCities();
            appendGSTNo();
        };

        //DOM.gstno.onblur = function () {
        //    getCustomerDetails();
        //}

        //DOM.area.addEventListener('blur', appendClientAddressValue);
        //DOM.addressDetails.addEventListener('click', showClientAddress);
    }

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    function loadData() {

        shared.showLoader(DOM.loader);

        var url = window.location.href;

        var parent = getUrlParameter('parent');

        var clientType = getUrlParameter('clientType');

        if (clientType === "CUSTOMER") {

            shared.setSelectValue(DOM.clientType, "CUSTOMER", null);
            shared.setSelect2ControlsText(DOM.clientType);
        }

        getClientType();

        getAddressType();

        getCountries();

        getTransporters();
                
        getClientList();

        //shared.hideLoader(DOM.loader);

    }

    function getUrlParameter(name) {

        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    function getClientType() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllClientTypes', DOM.clientType, "ClientTypeName", "ClientTypeId", "Choose Client Type", function (response) {
            
            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {
                    shared.setSelectOptionByIndex(DOM.clientType, parseInt(1));
                    shared.setSelect2ControlsText(DOM.clientType);
                }
            }

        });
        
    }

    function getAddressType() {
        
        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllAddressTypes', DOM.addressType, "AddressTypeName", "AddressTypeId", "Choose Address Type", function (response) {
            
            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {
                    shared.setSelectOptionByIndex(DOM.addressType, parseInt(1));
                    shared.setSelect2ControlsText(DOM.addressType);
                }
            }

        });

    }

    function getCountries() {

        DOM.country.options.length = 0;

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllCountries', DOM.country, "CountryName", "CountryId", "Choose Country", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {
                    shared.setSelectValue(DOM.country, null, parseInt(98));
                    shared.setSelect2ControlsText(DOM.country);

                    getStates(98);
                }
            }

        });
        
    }

    function getStates(countryId) {

        DOM.state.options.length = 0;

        DOM.city.options.length = 0;

        var dataAttributes = 'StateCode|TINNo';

        shared.fillDropdownWithDataAttributesAndCallback(SERVICE_PATH + 'GetStateByCountryId/' + countryId, DOM.state, "StateName", "StateId", "Choose State", dataAttributes, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {
                    /* Set state as Maharashtra */
                    shared.setSelectValue(DOM.state, null, parseInt(22));
                    shared.setSelect2ControlsText(DOM.state);

                    appendGSTNo();

                    getCities();
                }
            }
            else {
                swal("Error!!!", "Error in the application " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);

        });
        
    }

    //function closeCityModal() {
        
    //}

    $('#CityModal').on('hidden.bs.modal', function () {

        var iframe = $(this).find('iframe');

        var innerDoc = iframe[0].contentWindow.document;
        
        var cityName = innerDoc.getElementById('CityName').value;
        var state = innerDoc.getElementById('State');

        var stateName = state.options[state.selectedIndex].text;
        var stateId = state.options[state.selectedIndex].value;

        shared.setSelectValue(DOM.state, null, parseInt(stateId));
        shared.setSelect2ControlsText(DOM.state);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetCityByStateId/' + stateId, DOM.city, "CityName", "CityId", "Choose City", function (response) {
            if (response.status === 200) {
                if (response.responseText !== undefined) {
                    /* Set Mumbai as default city*/
                    shared.setSelectValue(DOM.city, cityName, null);
                    shared.setSelect2ControlsText(DOM.city);
                }
            }
            else {
                swal("Error!!!", "Error in the application " + response.responseText, "error");
            }
        });

    });

    function getCities() {

        DOM.city.options.length = 0;

        var stateId = parseInt(0);

        if (DOM.state.selectedIndex > 0) {
            stateId = DOM.state.options[DOM.state.selectedIndex].value;
        }

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetCityByStateId/' + stateId, DOM.city, "CityName", "CityId", "Choose City", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {
                    /* Set Mumbai as default city*/
                    shared.setSelectValue(DOM.city, null, parseInt(1793));
                    shared.setSelect2ControlsText(DOM.city);
                }
            }
            else {
                swal("Error!!!", "Error in the application " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);

        });
        
    }

    function getCitiesWithCallback(stateId, callback) {

        DOM.city.options.length = 0;

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetCityByStateId/' + stateId, DOM.city, "CityName", "CityId", "Choose City", function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {
                if (response.responseText !== undefined) {
                    callback();
                }
            }
            else {
                swal("Error!!!", "Error in the application " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);

        });
    }

    function getTransporters() {
        
        DOM.transporter.options.length = 0;

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/3', DOM.transporter, "ClientAddressName", "ClientAddressId", "Choose Transporter", function (response) {        
            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {
                    shared.setSelectOptionByIndex(DOM.transporter, parseInt(1));
                    shared.setSelect2ControlsText(DOM.transporter);
                }
            }
            else {
                swal("Error!!!", "Error in the application " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);
        });
        
    }

    /**
     * add new city
     */
    function addNewCity() {

        var cityPopupWindow = document.getElementById('CityDetails');

        cityPopupWindow.src = location.origin + '/POS/PopUps/City';

        cityPopupWindow.style = 'zoom:0.60; frameborder:0; height:450px; width:99.6%;';

        $('#CityModal').modal('show');

        //window.open(location.origin + '/POS/Masters/City', '_blank', 'height=400, width=600, toolbar=no, menubar=no, scrollbars=yes, resizable=yes, top=200, left=400');
        //shared.openChildWindow(location.origin + '/POS/Masters/City', '_blank');
    }

    function refreshCityList() {

        getCities();
    }

    var getSelectedRows = function(listObject) {

        var selectedRows = [];

        var tableBody = listObject.tBodies[0];

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

    function addNewClient() {

        shared.showLoader(DOM.loader);

        //clear the inputs
        clients.length = 0;
        clientAddressess.length = 0;
        transporters.length = 0;

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.clientName.setAttribute('data-client-id', 0);
        DOM.clientAddressName.setAttribute('data-client-address-id', parseInt(0));
        DOM.clientAddressName.setAttribute('data-sr-no', 0);

        DOM.clientList.tBodies[0].innerHTML = "";
        DOM.clientAddressList.tBodies[0].innerHTML = "";

        //show edit panel;
        shared.showPanel(DOM.editMode);
        shared.showPanel(DOM.clientAddressEditSection);
        shared.hidePanel(DOM.clientAddressViewSection);
        shared.hidePanel(DOM.viewMode);

        /* set focus */
        DOM.clientType.focus();

        shared.hideLoader(DOM.loader);
    }

    function editClient(currentTableRow) {

        shared.showLoader(DOM.loader);

        try {
            shared.clearInputs(DOM.editMode);

            shared.clearTextAreas(DOM.editMode);

            shared.disableControls(DOM.editMode, false);
            
            var selectedRows = getSelectedRows(DOM.clientList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to Edit the Records.", "warning");
                    return false;
                }
                else {

                    currentTableRow = selectedRows[0];

                    showSelectedClientDetails(currentTableRow);
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
        DOM.clientName.focus();
    }

    function deleteClient(currentTableRow) {

        var table = DOM.clientList;

        var tableBody = table.tBodies[0];

        /* temp variable */
        var clientAddressId = currentTableRow.getAttribute('data-client-address-id');

        var client = {};

        client = {
            ClientId: clientId,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(client);

        shared.sendRequest(SERVICE_PATH + 'DeleteClient', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });
    }

    function showSelectedClientDetails(currentTableRow) {

        /* assign text to input controls */
        if (clients !== null) {

            if (clients !== undefined) {

                if (clients.length > 0) {

                    var selectedClients = clients.filter(function (value, index, array) {
                        return value.ClientId === parseInt(currentTableRow.getAttribute('data-client-id'));
                    });

                    if (selectedClients.length > 0) {

                        shared.showPanel(DOM.editMode);
                        shared.hidePanel(DOM.viewMode);

                        shared.setSelectValue(DOM.clientType, null, parseInt(selectedClients[0].ClientTypeId));
                        shared.setSelect2ControlsText(DOM.clientType);
                        DOM.clientName.value = selectedClients[0].ClientName;
                        DOM.clientName.setAttribute('data-client-id', selectedClients[0].ClientId);
                        DOM.panno.value = selectedClients[0].PANNo;

                        showClientAddressList();
                    }
                }
            }
        }

        //set focus
        DOM.addressType.focus();
    }

    function viewClient() {

        shared.showLoader(DOM.loader);

        try {

            shared.clearInputs(DOM.editMode);

            shared.clearTextAreas(DOM.editMode);

            shared.disableControls(DOM.editMode, true);
            
            var selectedRows = getSelectedRows(DOM.clientList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    showSelectedClientDetails(currentTableRow);                    
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
    
    function addNewClientAddress() {

        // Show/hide panel
        shared.showPanel(DOM.clientAddressEditSection);
        shared.hidePanel(DOM.clientAddressViewSection);

        //clear the inputs
        shared.clearInputs(DOM.clientAddressEditSection);
        shared.clearTextAreas(DOM.clientAddressEditSection);

        DOM.transportersList.innerHTML = "";

        //Set default value
        DOM.clientAddressName.value = DOM.clientName.value;
        DOM.clientAddressName.setAttribute('data-client-address-id', parseInt(0));
        DOM.clientAddressName.setAttribute('data-sr-no', parseInt(getMaxSrNo(parseInt(0))));

        appendGSTNo();

        DOM.clientAddressName.focus();
    }

    function appendClientAddressValue() {

        if (DOM.addressType.options[DOM.addressType.selectedIndex].text.toUpperCase() !== "HEAD OFFICE") {

            if (DOM.city.selectedIndex > 0) {

                if (DOM.area.value !== "") {
                    DOM.clientAddressName.value = DOM.clientAddressName.value + " - " + DOM.area.value;
                }
                else {
                    DOM.clientAddressName.value = DOM.clientAddressName.value + " - " + DOM.city.options[DOM.city.selectedIndex].text;
                }
            }
        }
    }

    function appendGSTNo() {

        if (DOM.panno.value !== "") {

            if (DOM.state.selectedIndex > 0) {

                DOM.gstno.value = DOM.state.options[DOM.state.selectedIndex].getAttribute('data-statecode') + DOM.panno.value.toUpperCase();
            }
        }
    }

    function bindClientAddressByClientId(clientId) {

        var table = DOM.clientAddressList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        var data = "";

        var clientAddressList = clientAddressess.filter(function (value, index, array) {
            return value.ClientId === parseInt(clientId)
                && value.IsDeleted === false;
        });

        if (clientAddressList.length > 0) {

            for (var r = 0; r < clientAddressList.length; r++) {

                data += "<tr data-client-address-id=" + clientAddressList[r].ClientAddressId + " data-sr-no=" + clientAddressList[r].SrNo + ">";
                data += "<td>" + clientAddressList[r].AddressTypeName + "</td>";
                data += "<td>" + clientAddressList[r].ClientAddressName + "</td>";
                data += "<td>" + clientAddressList[r].CountryName + "</td>";
                data += "<td>" + clientAddressList[r].StateName + "</td>";
                data += "<td>" + clientAddressList[r].CityName + "</td>";
                data += "<td>" + clientAddressList[r].ContactNos + "</td>";
                data += "<td>" + clientAddressList[r].GSTNo + "</td>";
                data += "<td class='text-center'>" +
                    "<a href='#' class='btn btn-default btn-xs' data-name='view' > <i class='fa fa-lg fa-eye' data-name='view'></i> </a> " +
                    "<a href='#' class='btn btn-default btn-xs' data-name='edit'> <i class='fa fa-lg fa-edit' data-name='edit'></i></a> " +
                    "<a href='#' class='btn btn-default btn-xs' data-name='remove' > <i class='fa fa-lg fa-remove' data-name='remove'></i></a> </td></tr>";
                data += "</tr>";
            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.clientAddressViewSection);
            shared.hidePanel(DOM.clientAddressEditSection);

        }

    }

    function showClientAddressList() {

        clientId = parseInt(DOM.clientName.getAttribute('data-client-id'));

        if (isNaN(clientId)) { clientId = parseInt(0); }

        shared.showLoader(DOM.loader);

        var table = DOM.clientAddressList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";
        
        var clientAddressList = clientAddressess.filter(function (value, index, array) {
            return value.ClientId === parseInt(clientId)
                && value.IsDeleted === false;
        });

        if (clientAddressList.length > 0) {

            var data = "";

            for (var r = 0; r < clientAddressList.length; r++) {
                
                data += "<tr data-client-address-id=" + clientAddressList[r].ClientAddressId + " data-sr-no=" + clientAddressess[r].SrNo + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + clientAddressList[r].ClientAddressId + "' class='label-checkbox' name='SelectClientAddress' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + clientAddressList[r].AddressTypeName + "</td>";
                data += "<td>" + clientAddressList[r].ClientAddressName + "</td>";
                data += "<td>" + clientAddressList[r].CountryName + "</td>";
                data += "<td>" + clientAddressList[r].StateName + "</td>";
                data += "<td>" + clientAddressList[r].CityName + "</td>";
                data += "<td>" + clientAddressList[r].ContactNos + "</td>";
                data += "<td>" + clientAddressList[r].GSTNo + "</td>";
                data += "</tr>";
                
            }

            tableBody.innerHTML = data;
                        
            shared.showPanel(DOM.clientAddressViewSection);
            shared.hidePanel(DOM.clientAddressEditSection);

        }

        shared.hideLoader(DOM.loader);

    }
        
    function editClientAddress(currentTableRow) {

        shared.clearInputs(DOM.clientAddressEditSection);

        shared.clearTextAreas(DOM.clientAddressEditSection);

        shared.disableControls(DOM.clientAddressEditSection, false);

        shared.showLoader(DOM.loader);

        try {
            
            var selectedRows = getSelectedRows(DOM.clientAddressList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    currentTableRow = selectedRows[0];

                    showSelectedClientAddress(currentTableRow);
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

    function deleteClientAddress(srNo) {

        if (clientAddressess.length > 0) {

            var filteredRecord = clientAddressess.filter(function (value, index, array) {
                return value.SrNo === parseInt(srNo) && value.IsDeleted === false;
            });

            for (var ca = clientAddressess.length - 1; ca >= 0; ca--) {
                if (parseInt(clientAddressess[ca].SrNo) === srNo) {
                    clientAddressess.splice(ca, 1);
                }
            }
        }
    }

    function deleteClientAddressFromTable(currentTableRow) {

        var clientId = parseInt(DOM.clientName.getAttribute('data-client-id'));

        var clientName = DOM.clientName.value;

        if (isNaN(clientId)) {
            clientId = parseInt(0);
        }

        if (clientAddressess.length > 0) {

            var filteredRecord = clientAddressess.filter(function (value, index, array) {
                return value.ClientAddressId === parseInt(currentTableRow.getAttribute('data-client-address-id')) && value.IsDeleted === false;
            });

            for (var ca = clientAddressess.length - 1; ca >= 0; ca--) {

                if (parseInt(clientAddressess[ca].ClientAddressId) > 0) {

                    clientAddressess[ca].IsDeleted = true;
                }
                else {
                    clientAddressess.splice(ca, 1);
                }
            }

            bindClientAddressByClientId(clientId);
        }
    }

    function saveClientAddress() {
        
        if (validateData()) {

            /* Add new address in object and show in table */

            var clientAddress = {};

            var clientId = parseInt(0);
            var clientName = null;
            var srNo = parseInt(0);
            var addressTypeSelectedIndex = parseInt(0);
            var addressTypeId = parseInt(0);
            var addressType = null;
            var clientAddressId = parseInt(0);
            var clientAddressName = null;
            var address = null;
            var countrySelectedIndex = parseInt(0);
            var countryId = parseInt(0);
            var countryName = null;
            var stateSelectedIndex = parseInt(0);
            var stateId = parseInt(0);
            var stateName = null;
            var citySelectedIndex = parseInt(0);
            var cityId = parseInt(0);
            var cityName = null;
            var area = null;
            var pincode = null;
            var contactNos = null;
            var emailId = null;
            var website = null;
            var gstno = null;

            if (DOM.clientName.getAttribute("data-client-id") !== null) {
                if (DOM.clientName.getAttribute("data-client-id") !== undefined) {
                    clientId = parseInt(DOM.clientName.getAttribute("data-client-id"));
                }
            }

            clientName = DOM.clientName.value;

            if (DOM.addressType.options.length > 0) {

                addressTypeSelectedIndex = DOM.addressType.selectedIndex;
                addressTypeId = parseInt(DOM.addressType.options[addressTypeSelectedIndex].value);
                addressType = DOM.addressType.options[addressTypeSelectedIndex].text;

            }

            appendClientAddressValue();
            clientAddressName = DOM.clientAddressName.value;
            clientAddressId = parseInt(DOM.clientAddressName.getAttribute('data-client-address-id'));
            srNo = parseInt(DOM.clientAddressName.getAttribute('data-sr-no'));
            address = DOM.address.value;

            if (DOM.country.options.length > 0) {
                countrySelectedIndex = DOM.country.selectedIndex;
                countryId = parseInt(DOM.country.options[countrySelectedIndex].value);
                countryName = DOM.country.options[countrySelectedIndex].text;
            }

            if (DOM.state.options.length > 0) {
                stateSelectedIndex = DOM.state.selectedIndex;
                stateId = parseInt(DOM.state.options[stateSelectedIndex].value);
                stateName = DOM.state.options[stateSelectedIndex].text;
            }

            if (DOM.city.options.length > 0) {
                citySelectedIndex = DOM.city.selectedIndex;
                cityId = parseInt(DOM.city.options[citySelectedIndex].value);
                cityName = DOM.city.options[citySelectedIndex].text;
            }

            area = DOM.area.value;
            pincode = DOM.pincode.value;
            contactNos = DOM.contactNos.value;
            emailId = DOM.emailId.value;
            website = DOM.website.value;
            gstno = DOM.gstno.value;

            if (srNo > 0) {
                //delete the existing row from the client addressess list
                deleteClientAddress(srNo);
            }

            clientAddress = {
                ClientId: clientId,
                ClientName: clientName,
                AddressTypeId: addressTypeId,
                AddressTypeName: addressType,
                ClientAddressId: clientAddressId,
                ClientAddressName: clientAddressName,
                Address: address,
                CountryId: countryId,
                CountryName: countryName,
                StateId: stateId,
                StateName: stateName,
                CityId: cityId,
                CityName: cityName,
                Area: area,
                Pincode: pincode,
                ContactNos: contactNos,
                EmailId: emailId,
                Website: website,
                GSTNo: gstno,
                IsDeleted: false,
                SrNo: srNo,
                CustomerAndTransporterMapping: transporters
            };

            if (parseInt(clientAddressId) === parseInt(0)) {

                clientAddress.CreatedBy = parseInt(LOGGED_USER);
                clientAddress.CreatedByIP = IP_ADDRESS;
                clientAddress.ModifiedBy = parseInt(0);
                clientAddress.ModifiedByIP = "";
            }
            else {
                clientAddress.CreatedBy = parseInt(0);
                clientAddress.CreatedByIP = "";
                clientAddress.ModifiedBy = parseInt(LOGGED_USER);
                clientAddress.ModifiedByIP = IP_ADDRESS;
            }

            clientAddressess.push(clientAddress);

            bindClientAddressByClientId(clientId);
        }
    }

    function showSelectedClientAddress(currentTableRow) {

        /* assign text to input controls */
        //DOM.addressDetails.tBodies[0].innerHTML = "";

        var clientAddressId = parseInt(currentTableRow.getAttribute('data-client-address-id'));

        if (isNaN(clientAddressId)) { clientAddressId = parseInt(0); }

        var selectedClientAddressess = clientAddressess.filter(function (value, index, array) {
            if (parseInt(currentTableRow.getAttribute('data-client-address-id')) > 0) {
                return value.ClientAddressId ===  clientAddressId && value.IsDeleted === false;
            }
            else {
                return value.SrNo === parseInt(currentTableRow.getAttribute('data-sr-no')) && value.IsDeleted === false;
            }
        });

        if (selectedClientAddressess.length > 0) {

            shared.setSelectValue(DOM.addressType, null, parseInt(selectedClientAddressess[0].AddressTypeId));
            shared.setSelect2ControlsText(DOM.addressType);
            DOM.clientAddressName.value = selectedClientAddressess[0].ClientAddressName;
            DOM.clientAddressName.setAttribute('data-client-address-id', currentTableRow.getAttribute('data-client-address-id'));
            DOM.clientAddressName.setAttribute('data-sr-no', parseInt(currentTableRow.getAttribute('data-sr-no')));
            DOM.address.value = selectedClientAddressess[0].Address;
            shared.setSelectValue(DOM.country, null, parseInt(selectedClientAddressess[0].CountryId));
            shared.setSelect2ControlsText(DOM.country);
            shared.setSelectValue(DOM.state, null, parseInt(selectedClientAddressess[0].StateId));
            shared.setSelect2ControlsText(DOM.state);

            var cityId = parseInt(selectedClientAddressess[0].CityId);

            getCitiesWithCallback(parseInt(selectedClientAddressess[0].StateId), function (response) {
                shared.setSelectValue(DOM.city, null, cityId);
                shared.setSelect2ControlsText(DOM.city);
            });

            DOM.area.value = selectedClientAddressess[0].Area;
            DOM.pincode.value = selectedClientAddressess[0].Pincode;
            DOM.contactNos.value = selectedClientAddressess[0].ContactNos;
            DOM.emailId.value = selectedClientAddressess[0].EmailId;
            DOM.website.value = selectedClientAddressess[0].Website;
            DOM.gstno.value = selectedClientAddressess[0].GSTNo;

            bindTransporterByClientAddressId(clientAddressId);
            
            shared.showPanel(DOM.clientAddressEditSection);
            shared.hidePanel(DOM.clientAddressViewSection);
        }

        //set focus
        DOM.addressType.focus();

    }
        
    function viewClientAddress() {

        shared.clearInputs(DOM.clientAddressEditSection);

        shared.clearTextAreas(DOM.clientAddressEditSection);

        shared.disableControls(DOM.clientAddressEditSection, true);

        shared.showLoader(DOM.loader);

        try {

            var selectedRows = getSelectedRows(DOM.clientAddressList);

            if (selectedRows.length > 0) {

                if (selectedRows.length > 1) {
                    swal('Warning', "Please select only one record to View or Edit the Records.", "warning");
                    return false;
                }
                else {

                    var currentTableRow = selectedRows[0];

                    showSelectedClientAddress(currentTableRow);
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
    
    function getMaxSrNo(maxSrNo) {

        //var maxSrNo = maxSrNo;

        if (clientAddressess.length > 0) {

            for (var ca = 0; ca < clientAddressess.length; ca++) {

                if (clientAddressess[ca].SrNo >= maxSrNo) {
                    maxSrNo = clientAddressess[ca].SrNo;
                }
            }
        }

        return maxSrNo += 1;
    }
    
    function validateData() {

        var isValid = true;

        if (DOM.clientType.selectedIndex === -1 || DOM.clientType.selectedIndex === 0) {
            isValid = false;
            DOM.clientType.focus();
            swal("Error!!!", "Please select the Client Type.", "error");
        }
        else if (DOM.clientName.value === "") {
            isValid = false;
            DOM.clientName.focus();
            swal("Error!!!", "Please enter the Client Name.", "error");
        }
        else if (DOM.clientAddressName.value === "") {
            isValid = false;
            DOM.clientAddressName.focus();
            swal("Error!!!", "Please enter the Client Address Name.", "error");
        }
        else if (DOM.country.selectedIndex === -1) {
            isValid = false;
            DOM.country.focus();
            swal("Error!!!", "Please select the Country.", "error");
        }
        else if (DOM.state.selectedIndex === -1) {
            isValid = false;
            DOM.state.focus();
            swal("Error!!!", "Please select the State.", "error");
        }
        else if (DOM.city.selectedIndex === -1) {
            isValid = false;
            DOM.city.focus();
            swal("Error!!!", "Please select the City.", "error");
        }

        return isValid;
    }

    function saveClient() {

        if (validateData()) {

            clients.length = 0;

            /* temp variable */
            var clientTypeSelectedIndex = DOM.clientType.selectedIndex;
            var clientTypeId = parseInt(DOM.clientType.options[clientTypeSelectedIndex].value);
            var clientType = DOM.clientType.options[clientTypeSelectedIndex].text;
            var clientId = parseInt(DOM.clientName.getAttribute('data-client-id'));
            var clientName = DOM.clientName.value;
            var panno = DOM.panno.value;
            //var clientAddressess = clientAddressess;

            if (isNaN(clientId)) {
               clientId = parseInt(0);
            }

            if (clientAddressess.length > 0) {
                var selectedClientAddress = clientAddressess.filter(function (value, index, array) {
                    return value.ClientId === clientId;
                });
            }

            var client = {};

            client = {
                ClientTypeId: clientTypeId,
                ClientId: clientId,
                ClientName: clientName,
                PANNo: panno,
                ClientAddressess: selectedClientAddress
            };

            if (parseInt(clientId) === parseInt(0)) {

                client.CreatedBy = parseInt(LOGGED_USER);
                client.CreatedByIp = IP_ADDRESS;
                client.ModifiedBy = parseInt(0);
                client.ModifiedByIp = "";
            }
            else {
                client.CreatedBy = parseInt(0);
                client.CreatedByIp = "";
                client.ModifiedBy = parseInt(LOGGED_USER);
                client.ModifiedByIp = IP_ADDRESS;
            }

            clients.push(client);

            var postData = JSON.stringify(clients);

            shared.sendRequest(SERVICE_PATH + "SaveClient", "POST", true, "JSON", postData, function (response) {
                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Records Saved Successfully.",
                            type: "success"
                        }, function () {
                            getClientList();
                        });
                    }
                    else if (parseInt(response.responseText) === parseInt(-2)) {
                        swal({
                            title: "Warning",
                            text: "This Client Name is already exists.",
                            type: "warning"
                        });
                    }
                    else if (parseInt(response.responseText) === parseInt(-1)) {
                        swal({
                            title: "Error",
                            text: "Unable to save the Client.",
                            type: "error"
                        });
                    }
                }
            });
        }

    }

    function bindClientList() {

        shared.showLoader(DOM.loader);

        DOM.clientList.tBodies[0].innerHTML = "";

        var table = DOM.clientList;

        var tableBody = table.tBodies[0];

        if (clients.length > 0) {

            var data = "";        
                
            for (var r = 0; r < clients.length; r++) {

                data += "<tr data-client-id=" + clients[r].ClientId + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + clients[r].ClientId + "' class='label-checkbox' name='SelectClient' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + clients[r].SrNo + "</td>";
                data += "<td>" + clients[r].ClientTypeName + "</td>";
                data += "<td>" + clients[r].ClientCode + "</td>";
                data += "<td>" + clients[r].ClientName + "</td>";
                data += "</tr>"
            }

            tableBody.innerHTML = data;

            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }

        shared.hideLoader(DOM.loader);

    }

    /**
     * Get clients list
     */
    function getClientList() {

        shared.showLoader(DOM.loader);
        
        clients.length = 0;

        clientAddressess.length = 0;

        //try {

            shared.sendRequest(SERVICE_PATH + "GetAllClients", "GET", true, "JSON", null, function (response) {
                
                if (response.status === 200) {

                    shared.showLoader(DOM.loader);

                    if (response.responseText !== undefined) {

                        var _response = JSON.parse(response.responseText);

                        if (_response !== undefined) {

                            if (_response.length > 0) {
                                
                                for (var r = 0; r < _response.length; r++) {

                                    var addressess = _response[r].ClientAddressess;
                                    
                                    addressList = addressess.filter(function (value, index, array) {
                                        return value.ClientId === parseInt(_response[r].ClientId);
                                    });

                                    var client = {};

                                    client = {
                                        ClientTypeId: _response[r].ClientTypeId,
                                        ClientTypeName: _response[r].ClientTypeName,
                                        ClientId: _response[r].ClientId,
                                        ClientCode: _response[r].ClientCode,
                                        ClientName: _response[r].ClientName,
                                        PANNo: _response[r].PANNo,
                                        SrNo: _response[r].SrNo
                                    };

                                    clients.push(client);

                                    if (addressList.length > 0) {

                                        for (var ca = 0; ca < addressList.length; ca++) {

                                            var clientAddress = {};

                                            clientAddress = {
                                                ClientId: addressList[ca].ClientId,
                                                ClientName: addressList[ca].ClientName,
                                                ClientTypeId: addressList[ca].ClientTypeId,
                                                ClientType: addressList[ca].ClientType,
                                                ClientAddressCode: addressList[ca].ClientAddressCode,
                                                AddressTypeId: addressList[ca].AddressTypeId,
                                                AddressTypeName: addressList[ca].AddressType,
                                                ClientAddressId: addressList[ca].ClientAddressId,
                                                ClientAddressName: addressList[ca].ClientAddressName,
                                                Address: addressList[ca].Address,
                                                CountryId: addressList[ca].CountryId,
                                                CountryName: addressList[ca].CountryName,
                                                StateId: addressList[ca].StateId,
                                                StateName: addressList[ca].StateName,
                                                CityId: addressList[ca].CityId,
                                                CityName: addressList[ca].CityName,
                                                Area: addressList[ca].Area,
                                                Pincode: addressList[ca].PinCode,
                                                ContactNos: addressList[ca].ContactNos,
                                                EmailId: addressList[ca].EmailId,
                                                Website: "",//_addressess[ca].Website,
                                                GSTNo: addressList[ca].GSTNo,
                                                IsDeleted: false,
                                                SrNo: addressList[ca].SrNo
                                            };

                                            clientAddressess.push(clientAddress);

                                            var transporterMappingList = addressList[ca].CustomerAndTransporterMapping;

                                            if (transporterMappingList.length > 0) {

                                                for (var t = 0; t < transporterMappingList.length; t++) {

                                                    var transporterMapping = {};

                                                    transporterMapping = {
                                                        MappingId: transporterMappingList[t].MappingId,
                                                        CustomerAddressId: transporterMappingList[t].CustomerAddressId,
                                                        CustomerName: transporterMappingList[t].CustomerName,
                                                        TransporterAddressId: transporterMappingList[t].TransporterAddressId,
                                                        TransporterName: transporterMappingList[t].TransporterName
                                                    };

                                                    transporters.push(transporterMapping);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            shared.showPanel(DOM.viewMode);
                            shared.hidePanel(DOM.editMode);
                        }
                        else {
                            shared.showPanel(DOM.editMode);
                            shared.hidePanel(DOM.viewMode);

                            //shared.hideLoader(DOM.loader);
                        }
                    }
                }

                shared.hideLoader(DOM.loader);

                bindClientList();

            });
        //}
        //catch (e) {
        //    handleError("Error in application" + e.message);
        //}
        //finally {
        //    shared.hideLoader(DOM.loader);
        //}

    }

    function addTransporter() {

        var selectedIndex = DOM.transporter.selectedIndex;

        if (selectedIndex > 0) {

            var transporterName = DOM.transporter.options[selectedIndex].text;

            var transporterId = parseInt(DOM.transporter.options[selectedIndex].value);

            var clientAddressId = parseInt(DOM.clientAddressName.getAttribute("data-client-address-id"));

            if (isNaN(transporterId)) { transporterId = parseInt(0); }
            if (isNaN(clientAddressId)) { clientAddressId = parseInt(0); }

            if (checkTransporterNameExists(transporterId)) {
                swal("Warning", "This Transporter Name is already exists.", "warning");
                DOM.transporter.focus();
                return;
            }

            var transporter = {};

            transporter = {
                MappingId: 0,
                CustomerAddressId: clientAddressId,
                TransporterAddressId: transporterId,
                TransporterName: transporterName,
                IsDeleted: false,
                CreatedBy: parseInt(LOGGED_USER),
                CreatedByIP: IP_ADDRESS
            };

            transporters.push(transporter);

            bindTransporterByClientAddressId(clientAddressId);

        }
        else {
            swal("warning", "Please select the Transporter.", "warning");
            DOM.addNewTransporter.focus();
        }

    }

    function bindTransporterByClientAddressId(clientAddressId) {

        DOM.transportersList.innerHTML = "";

        if (transporters.length > 0) {

            var fragment = document.createDocumentFragment();

            var transporterMappingList = transporters.filter(function (value, index, array) {
                return value.CustomerAddressId === clientAddressId;
            });

            if (transporterMappingList.length > 0) {

                for (var t = 0; t < transporterMappingList.length; t++) {

                    var listItem = document.createElement('li');
                    var removeIcon = document.createElement('span');
                    var div = document.createElement('div');

                    listItem.classList.add("list-group-item");
                    listItem.setAttribute('data-transporter-id', transporterMappingList[t].TransporterId);
                    listItem.textContent = transporterMappingList[t].TransporterName;

                    div.classList.add("pull-right");

                    removeIcon.setAttribute('id', transporterMappingList[t].TransporterId);
                    removeIcon.setAttribute('class', 'fa fa-remove');
                    removeIcon.style.cursor = "pointer";

                    removeIcon.onclick = removeTransporter;

                    div.appendChild(removeIcon);

                    listItem.appendChild(div);

                    fragment.appendChild(listItem);
                }
            }

            DOM.transportersList.appendChild(fragment);
        }
    }

    var checkTransporterNameExists = function(transporterId) {

        var isTransporterNameExists = false;

        if (transporters.length > 0) {

            var transporter = transporters.filter(function (value, index, array) {
                return value.TransporterId === transporterId;
            });

            if (transporter.length > 0) {
                isTransporterNameExists = true;
            }
        }

        return isTransporterNameExists;
    }

    function removeTransporter(e) {

        var clientAddressId = parseInt(DOM.clientAddressName.getAttribute("data-client-address-id"));

        var transporterId = parseInt(e.target.id);

        if (isNaN(transporterId)) { transporterId = parseInt(0); }

        if (transporters.length > 0) {

            if (clientAddressId > 0) {
                for (var t = 0; t <= transporters.length; t++) {
                    if (transporters[t].ClientAddressId === clientAddressId
                    && transporters[t].TransporterId === transporterId) {
                        transporters[t].IsDeleted = true;
                        transporters[t].DeletedBy = parseInt(LOGGED_USER);
                        transporters[t].DeletedByIP = IP_ADDRESS;
                    }
                }
            }
            else {
                for (var i = transporters.length - 1; i >= 0; i--) {
                    if (parseInt(transporters[i].ClientAddressId) === clientAddressId
                    && parseInt(transporters[i].TransporterId) === transporterId) {
                        transporters.splice(i, 1);
                    }
                }
            }

            bindTransporterByClientAddressId(clientAddressId);
        }
    }

    function getCustomerDetails() {

        var gstData = [];

        var gstNo = {};

        gstNo = {
            gstin: "27AADCI0409D1Z4"
        };

        gstData.push(gstNo);

        var postData = JSON.stringify(gstData);

        //shared.sendRequest("https://ewaybill.nic.in/BillGeneration/BillGeneration.aspx/GetGSTNDetails/", "POST", true, "JSON", postData, function (response) {
        //    if (response.status === 200) {
                
        //    }
        //});
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


SharpiTech.Client.init();
