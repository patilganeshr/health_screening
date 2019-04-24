

var Sofarch = {};

Sofarch.Employer = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var employers = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.employerList = document.getElementById('EmployerList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.employerName = document.getElementById('EmployerName');
        DOM.address = document.getElementById('Address');
        DOM.country = document.getElementById('Country');
        DOM.state = document.getElementById('State');
        DOM.city = document.getElementById('City');
        DOM.pinCode = document.getElementById('PinCode');
        DOM.website = document.getElementById('Website');
        DOM.gstinNo = document.getElementById('GSTINNo');


        DOM.addNewEmployer = document.getElementById('AddNewEmployer');
        DOM.showEmployerList = document.getElementById('ShowEmployerList');
        DOM.viewEmployer = document.getElementById('ViewEmployer');
        DOM.editEmployer = document.getElementById('EditEmployer');
        DOM.saveEmployer = document.getElementById('SaveEmployer');
        DOM.deleteEmployer = document.getElementById('DeleteEmployer');

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

        DOM.addNewEmployer.addEventListener('click', addNewEmployer);
        DOM.showEmployerList.addEventListener('click', getEmployers);
        DOM.viewEmployer.addEventListener('click', viewEmployer);
        DOM.editEmployer.addEventListener('click', editEmployer);
        DOM.saveEmployer.addEventListener('click', saveEmployer);
        DOM.deleteEmployer.addEventListener('click', deleteEmployer);
    }

    function loadData() {

        

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

    function appendGSTNo() {

        //if (DOM.panno.value !== "") {

        //    if (DOM.state.selectedIndex > 0) {

        //        DOM.gstno.value = DOM.state.options[DOM.state.selectedIndex].getAttribute('data-statecode'); //+ DOM.panno.value.toUpperCase();
        //    }
        //}
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
    
    function addNewEmployer() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.employerName.setAttribute('data-employer-id', 0);

        getCountries();

        //set focus
        DOM.employerName.focus();

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);
    }

    function viewEmployer() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        var selectedRows = getSelectedRows(DOM.employerList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var employerId = parseInt(currentTableRow.getAttribute('data-employer-id'));

                if (isNaN(employerId)) { employerId = 0; }

                showSelectedEmployer(employerId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.employerName.focus();

    }

    function editEmployer() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        var selectedRows = getSelectedRows(DOM.employerList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");
                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var employerId = parseInt(currentTableRow.getAttribute('data-employer-id'));

                if (isNaN(employerId)) { employerId = 0; }

                showSelectedEmployer(employerId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.employerName.focus();

    }

    function deleteEmployer(currentTableRow) {

        var table = DOM.employerList;

        var tableBody = table.tBodies[0];
        
        /* temp variable */
        var employerId = parseInt(currentTableRow.getAttribute('data-employer-id'));

        if (isNaN(employerId)) { employerId = 0; }

        var employer = {};

        employer = {
            EmployerId: employerId,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIP: IP_ADDRESS
        };

        var postData = JSON.stringify(employer);
        
        shared.sendRequest(SERVICE_PATH + 'SaveEmployer', "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                if (response.responseText === "true") {

                    tableBody.removeChild(currentTableRow);
                }
            }

        });
    }

    function showSelectedEmployer(employerId) {

        if (employers.length > 0) {

            var selectedEmployer = employers.filter(function (value, index, array) {
                return value.EmployerId === employerId;
            });

            if (selectedEmployer.length) {

                for (var c = 0; c < selectedEmployer.length; c++) {

                    //assign text to input
                    DOM.employerName.setAttribute('data-employer-id', employerId);
                    DOM.employerName.value = selectedEmployer[c].EmployerName;
                    DOM.address.value = selectedEmployer[c].EmployerAddress;
                    shared.setSelectValue(DOM.country, null, parseInt(selectedEmployer[c].CountryId));
                    shared.setSelect2ControlsText(DOM.country);
                    shared.setSelectValue(DOM.state, null, parseInt(selectedEmployer[c].StateId));
                    shared.setSelect2ControlsText(DOM.state);
                    shared.setSelectValue(DOM.city, null, parseInt(selectedEmployer[c].CityId));
                    shared.setSelect2ControlsText(DOM.city);
                    DOM.website.value = selectedEmployer[c].Website;
                    DOM.gstinNo.value = selectedEmployer[c].GSTINNo;
                    DOM.pinCode.value = selectedEmployer[c].PinCode;
                }

            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.employerName.focus();
    }

    function saveEmployer() {

        if (DOM.employerName.value === "") {
            swal("Error!!!", "Please enter the Employer Name.", "error");
            return;
        }

        /* temp variable */
        var employerId = 0;
        var employerName = null;
        var address = null;
        var countryId = 0;
        var stateId = 0;
        var cityId = 0;
        var pinCode = null;
        var website = null;
        var gstinNo = null;

        employerId = parseInt(DOM.employerName.getAttribute('data-employer-id'));
        employerName = DOM.employerName.value;
        address = DOM.address.value;
        countryId = parseInt(DOM.country.options[DOM.country.selectedIndex].value);
        stateId = parseInt(DOM.state.options[DOM.state.selectedIndex].value);
        cityId = parseInt(DOM.city.options[DOM.city.selectedIndex].value);
        pinCode = DOM.pinCode.value;
        website = DOM.website.value;
        gstinNo = DOM.gstinNo.value;

        if (isNaN(employerId)) { employerId = 0; }
        if (isNaN(countryId)) { countryId = 0; }
        if (isNaN(stateId)) { stateId = 0; }
        if (isNaN(cityId)) { cityId = 0; }

        var employer = {};

            employer = {
                EmployerId: employerId,
                EmployerName: employerName,
                EmployerAddress: address,
                CountryId: countryId,
                StateId: stateId,
                CityId: cityId,
                PinCode: pinCode,
                Website: website,
                GSTINNo: gstinNo
            };

        if (parseInt(employerId) === parseInt(0)) {

            employer.CreatedBy = parseInt(LOGGED_USER);
            employer.CreatedByIP = IP_ADDRESS;            
        }
        else {
            employer.ModifiedBy = parseInt(LOGGED_USER);
            employer.ModifiedByIP = IP_ADDRESS;            
        }

        var postData = JSON.stringify(employer);

        shared.sendRequest(SERVICE_PATH + "SaveEmployer", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {

                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Successfully.",
                        type: "success"
                    }, function () {
                        addNewEmployer();
                    });
                }
            }
            else {
                swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
            }
        });

    }

    function getEmployers() {

        shared.showLoader(DOM.loader);

        DOM.employerList.tBodies[0].innerHTML = "";

        employers.length = 0;

        shared.sendRequest(SERVICE_PATH + "SearchEmployerByName/", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        employers = _response;

                        bindEmployer();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }

    function bindEmployer() {

        shared.showLoader(DOM.loader);

        DOM.employerList.tBodies[0].innerHTML = "";
        
        if (employers.length) {

            var data = "";

            for (var r = 0; r < employers.length; r++) {

                data += "<tr data-employer-id=" + employers[r].EmployerId + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + employers[r].EmployerId + "' class='label-checkbox' name='SelectEmployer' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + employers[r].EmployerName + "</td>";
                data += "<td>" + employers[r].EmployerAddress + "</td>";
                data += "<td>" + employers[r].StateName + "</td>";
                data += "<td>" + employers[r].CityName + "</td>";
                data += "<td>" + employers[r].GSTINNo + "</td>";
                data += '</tr>';
            }

            DOM.employerList.tBodies[0].innerHTML = data;            
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.employerList.focus();

        shared.hideLoader(DOM.loader);
    }
    
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        applyPlugins();
        bindEvents();
        loadData();
        addNewEmployer();
    }

    return {
        init: init
    };

}());


Sofarch.Employer.init();
