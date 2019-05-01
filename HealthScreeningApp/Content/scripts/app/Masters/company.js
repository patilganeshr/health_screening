

var Sofarch = {};

Sofarch.Company = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var companies = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.companyList = document.getElementById('CompanyList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.companyCode = document.getElementById('CompanyCode');
        DOM.companyName = document.getElementById('CompanyName');
        DOM.shortName = document.getElementById('ShortName');
        DOM.address = document.getElementById('Address');
        DOM.country = document.getElementById('Country');
        DOM.state = document.getElementById('State');
        DOM.city = document.getElementById('City');
        DOM.locality = document.getElementById('Locality');
        DOM.pinCode = document.getElementById('PinCode');
        DOM.contactPerson = document.getElementById('ContactPerson');
        DOM.contactNo = document.getElementById('ContactNo');
        DOM.emailId = document.getElementById('EmailId');

        DOM.addNewCompany = document.getElementById('AddNewCompany');
        DOM.showCompanyList = document.getElementById('ShowCompanyList');
        DOM.viewCompany = document.getElementById('ViewCompany');
        DOM.editCompany = document.getElementById('EditCompany');
        DOM.saveCompany = document.getElementById('SaveCompany');
        DOM.deleteCompany = document.getElementById('DeleteCompany');

    }

    function applyPlugins() {

        $('select').select2();
    }

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    $("select").on("change", function (event) {

        setFocusOnSelect(event);

    });

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.addNewCompany.addEventListener('click', addNewCompany);
        DOM.showCompanyList.addEventListener('click', getCompanies);
        DOM.viewCompany.addEventListener('click', viewCompany);
        DOM.editCompany.addEventListener('click', editCompany);
        DOM.saveCompany.addEventListener('click', saveCompany);
        DOM.deleteCompany.addEventListener('click', deleteCompany);
    }

    function loadData() {

        getCountries();    

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

        shared.fillDropdownWithDataAttributesAndCallback(SERVICE_PATH + 'GetStateByCountry/' + countryId, DOM.state, "StateName", "StateId", "Choose State", dataAttributes, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {
                    /* Set state as Maharashtra */
                    shared.setSelectValue(DOM.state, null, parseInt(22));
                    shared.setSelect2ControlsText(DOM.state);

                    getCities();
                }
            }
            else {
                swal("Error!!!", "Error in the application " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);

        });
        
    }

       function getCities() {

        DOM.city.options.length = 0;

        var stateId = parseInt(0);

        if (DOM.state.selectedIndex > 0) {
            stateId = DOM.state.options[DOM.state.selectedIndex].value;
        }

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetCitiesByState/' + stateId, DOM.city, "CityName", "CityId", "Choose City", function (response) {

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

    var getSelectedRows = function (listObject) {

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
    };
    
    function addNewCompany() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.companyName.setAttribute('data-brand-id', 0);
                
        DOM.companyCode.focus();

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);
    }

    function getSelectedCompanyDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.companyList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var companyId = parseInt(currentTableRow.getAttribute('data-company-id'));

                if (isNaN(companyId)) { companyId = 0; }

                showCompanyDetailsById(companyId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

    }

    function viewCompany() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedCompanyDetails();

    }

    function editCompany() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        getSelectedCompanyDetails();
    }

    function deleteCompany() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.companyList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.companyList);

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

                                var company = {
                                    CompanyId: parseInt(selectedRows[r].getAttribute('data-company-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS
                                };

                                var postData = JSON.stringify(company);

                                shared.sendRequest(SERVICE_PATH + 'SaveCompany', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {
                                            swal({
                                                title: "Success",
                                                text: "Company Details deleted successfully.",
                                                type: "success"
                                            }, function () {
                                                addNewCompany();
                                            });
                                        }
                                        else {
                                            swal("Error", "Unable to delete the records due to some error.", "Error");
                                        }
                                    }

                                    shared.hideLoader(DOM.loader);

                                });
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

    function showCompanyDetailsById(companyId) {

        if (companies.length) {

            var selectedCompany = companies.filter(function (value, index, array) {
                return value.CompanyId === companyId;
            });

            if (selectedCompany.length) {

                DOM.companyCode.value = selectedCompany[0].CompanyCode;
                DOM.companyName.setAttribute('data-company-id', selectedCompany[0].CompanyId);
                DOM.companyName.value = selectedCompany[0].CompanyName;
                DOM.shortName.value = selectedCompany[0].ShortName;
                DOM.address.value = selectedCompany[0].Address;
                shared.setSelectValue(DOM.country, null, parseInt(selectedCompany[0].CountryId));
                shared.setSelect2ControlsText(DOM.country);
                shared.setSelectValue(DOM.state, null, parseInt(selectedCompany[0].StateId));
                shared.setSelect2ControlsText(DOM.state);
                shared.setSelectValue(DOM.city, null, parseInt(selectedCompany[0].CityId));
                shared.setSelect2ControlsText(DOM.city);
                DOM.locality.value = selectedCompany[0].Locality;
                DOM.pinCode.value = selectedCompany[0].PinCode;
                DOM.contactPerson.value = selectedCompany[0].ContactPerson;
                DOM.contactNo.value = selectedCompany[0].ContactNo;
                DOM.emailId.value = selectedCompany[0].EmailId;
                
            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.companyName.focus();
    }

    function saveCompany() {

        if (DOM.companyName.value === "") {
            DOM.companyName.focus();
            swal("Error!!!", "Please enter the Company Name.", "error");
            return;
        }

    /* temp variable */
        var companyCode = null;
        var companyId = 0; //parseInt(DOM.brandName.getAttribute('data-brand-id'));
        var companyName = null;
        var shortName = null;
        var address = null;
        var countryId = 0;
        var stateId = 0;
        var cityId = 0;
        var locality = null;
        var pinCode = null;
        var website = null;
        var GSTINNo = null;
        var contactPerson = null;
        var contactNo = null;
        var emailId = null;

        companyId = parseInt(DOM.companyName.getAttribute('data-company-id'));
        companyCode = DOM.companyCode.value;
        companyName = DOM.companyName.value;
        shortName = DOM.shortName.value;
        address = DOM.address.value;
        countryId = parseInt(DOM.country.options[DOM.country.selectedIndex].value);
        stateId = parseInt(DOM.state.options[DOM.state.selectedIndex].value);
        cityId = parseInt(DOM.city.options[DOM.city.selectedIndex].value);
        locality = DOM.locality.value;
        pinCode = DOM.pinCode.value;
        contactPerson = DOM.contactPerson.value;
        contactNo = DOM.contactNo.value;
        emailId = DOM.emailId.value;

        if (isNaN(companyId)) { companyId = 0; }

        var company = {};

        company = {
            CompanyId: companyId,
            CompanyCode: companyCode,
            CompanyName: companyName,
            ShortName: shortName,
            CompanyAddress: address,
            CountryId: countryId,
            StateId: stateId,
            CityId: cityId,
            Locality: locality,
            PinCode: pinCode,
            Website: website,
            GSTINNo: GSTINNo,
            ContactPerson: contactPerson,
            ContactNo: contactNo,
            EmailId: emailId
        };

        if (parseInt(companyId) === parseInt(0)) {

            company.CreatedBy = parseInt(LOGGED_USER);
            company.CreatedByIP = IP_ADDRESS;            
        }
        else {
            company.ModifiedBy = parseInt(LOGGED_USER);
            company.ModifiedByIP = IP_ADDRESS;            
        }

        var postData = JSON.stringify(company);

        shared.sendRequest(SERVICE_PATH + "SaveCompany", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Successfully.",
                        type: "success"
                    }, function () {
                        getCompanies();
                    });
                }
            }
            else {
                swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
            }
        });

    }

    function getCompanies() {

        shared.showLoader(DOM.loader);

        DOM.companyList.tBodies[0].innerHTML = "";

        companies.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllCompanies", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        companies = _response;

                        bindCompanyDetails();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }

    function bindCompanyDetails() {

        shared.showLoader(DOM.loader);

        DOM.companyList.tBodies[0].innerHTML = "";
        
        if (companies.length) {

            var data = "";

            for (var r = 0; r < companies.length; r++) {

                data += "<tr data-company-id=" + companies[r].CompanyId + ">";
                data += "<td class='text-center'><label class='label-tick'> <input type='checkbox' id='" + companies[r].CompanyId + "' class='label-checkbox' name='SelectCompany' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td class='text-center'>" + companies[r].CompanyCode + "</td>";
                data += "<td class='text-center'>" + companies[r].CompanyName + "</td>";
                data += "<td class='text-center'>" + companies[r].ShortName + "</td>";
                data += "<td class='text-center'>" + companies[r].CompanyAddress + "</td>";
                data += "<td class='text-center'>" + companies[r].StateName + "</td>";
                data += "<td class='text-center'>" + companies[r].CityName + "</td>";
                data += "<td class='text-center'>" + companies[r].PinCode + "</td>";
                data += "<td class='text-center'>" + companies[r].GSTINNo + "</td>";
                data += '</tr>';

            }

            DOM.companyList.tBodies[0].innerHTML = data;            
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.companyList.focus();

        shared.hideLoader(DOM.loader);
    }
    
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        applyPlugins();
        loadData();
        addNewCompany();
    }

    return {
        init: init
    };

}());


Sofarch.Company.init();
