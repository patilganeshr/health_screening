

var SharpiTech = {};

SharpiTech.City = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    var _cities = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.editMode = document.getElementById('EditMode');
        DOM.loader = document.getElementById('Loader');
        DOM.state = document.getElementById('State');
        DOM.cityName = document.getElementById('CityName');
        DOM.backToCityList = document.getElementById('BackToCityList');
        DOM.saveCity = document.getElementById('SaveCity');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.addNewCity = document.getElementById('AddNewCity');
        DOM.refreshCityList = document.getElementById('RefreshCityList');
        DOM.filterCityList = document.getElementById('FilterCityList');
        DOM.citiesList = document.getElementById('CitiesList');

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
    }

    function bindEvents() {

        DOM.addNewCity.addEventListener('click', addNewCity);
        DOM.refreshCityList.addEventListener('click', refreshCityList);
        DOM.filterCityList.addEventListener('click', filterCityList);
        DOM.backToCityList.addEventListener('click', backToCityList);
        DOM.saveCity.addEventListener('click', saveCity);
        DOM.citiesList.addEventListener('click', citiesList);
    }

    function loadData() {
        
        getStates();

        getCities();
    }

    function getStates() {

        _shared.showLoader(DOM.loader);

        DOM.state.options.length = 0;
        
        var dataAttributes = 'state_code|tin_no';

        _shared.fillDropdownWithDataAttributesAndCallback(SERVICE_PATH + 'GetStateByCountryId/98', DOM.state, "StateName", "StateId", "Choose State", dataAttributes, function (response) {
            if (response.status === 200) {
                if (response.responseText !== undefined) {
                    /* Set state as Maharashtra */
                    _shared.setSelectValue(DOM.state, null, parseInt(22));
                    _shared.setSelect2ControlsText(DOM.state);                    
                }
            }
            else {
                swal("Error!!!", "Error in the application " + response.responseText, "error");
            }

            _shared.hideLoader(DOM.loader);

        });
    }

    function addNewCity() {

        _shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        _shared.clearInputs(DOM.editMode);

        _cities = [];
        DOM.citiesList.tBodies[0].innerHTML = "";

        DOM.cityName.setAttribute('data-city-id', 0);

        //show edit panel
        _shared.showPanel(DOM.editMode);
        _shared.hidePanel(DOM.viewMode);

        //set focus
        DOM.state.focus();

        _shared.hideLoader(DOM.loader);

    }

    function backToCityList() {

        //hide panel;
        _shared.hidePanel(DOM.editMode);
        _shared.showPanel(DOM.viewMode);

    }

    function refreshCityList() {

        getCities();
    }

    function filterCityList() {

    }

    function citiesList(evt) {

        _shared.showLoader(DOM.loader);

        var element = evt.target;

        var currentTableRow = element.parentElement.parentElement.parentElement;

        try {
            if (element.nodeName === 'A' || element.nodeName === 'I') {

                if (element.className.indexOf('fa-eye') !== -1) {
                    viewCity(currentTableRow);
                }
                else if (element.className.indexOf('fa-edit') !== -1 ) {
                    editCity(currentTableRow);
                }
                else if (element.className.indexOf('fa-remove') !== -1) {
                    deleteCity(currentTableRow);
                }
            }
        }
        catch (e) {
            handleError(e.message);
        }
        finally {

            _shared.hideLoader(DOM.loader);
        }
    }

    function viewCity(currentTableRow) {

        _shared.showLoader(DOM.loader);

        //assign text to input
        DOM.cityName.setAttribute('data-city-id', currentTableRow.getAttribute('data-city-id'));

        DOM.cityName.value = currentTableRow.children[1].textContent;

        _shared.disableControls(DOM.editMode, true);

        //show panel;
        _shared.showPanel(DOM.editMode);
        _shared.hidePanel(DOM.viewMode);

        //set focus
        DOM.state.focus();

        _shared.hideLoader(DOM.loader);
    }

    function editCity(currentTableRow) {

        _shared.showLoader(DOM.loader);

        //assign text to input
        DOM.cityName.setAttribute('data-city-id', currentTableRow.getAttribute('data-city-id'));

        DOM.cityName.value = currentTableRow.children[1].textContent;

        _shared.disableControls(DOM.editMode, false);

        //show panel;
        _shared.showPanel(DOM.editMode);
        _shared.hidePanel(DOM.viewMode);

        //set focus
        DOM.state.focus();

        _shared.hideLoader(DOM.loader);
    }

    function deleteCity(currentTableRow) {

        _shared.showLoader(DOM.loader);

        var table = DOM.citiesList;

        var tableBody = table.tBodies[0];
        
        /* temp variable */
        var cityId = currentTableRow.getAttribute('data-city-id');
        
        var city = {};

        city = {
            CityId: cityId,
            IsDeleted: true,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(city);
        
        _shared.sendRequest(SERVICE_PATH + 'SaveCity', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "1") {
                    tableBody.removeChild(currentTableRow);
                }
            }

            _shared.hideLoader(DOM.loader);

        });
    }

    function saveCity() {

        _shared.showLoader(DOM.loader);

        if (DOM.state.selectedIndex === -1) {
            DOM.state.focus();
            swal("Error!!!", "Please select the State Name.", "error");
            return;
        }
        else if (DOM.cityName.value === "") {
            DOM.cityName.focus();
            swal("Error!!!", "Please enter the City Name.", "error");
            return;
        }

        /* temp variable */
        var stateId = parseInt(0);
        var stateName = null;
        var cityId = parseInt(0);
        var cityName = DOM.cityName.value;

        stateId =  parseInt(DOM.state.options[DOM.state.selectedIndex].value);
        stateName = DOM.state.options[DOM.state.selectedIndex].text;
        cityId = parseInt(DOM.cityName.getAttribute('data-city-id'));
        cityName = DOM.cityName.value;

        if (isNaN(cityId)) { cityId = parseInt(0); }

        var city = {};

            city = {
                CityId: cityId,
                StateId: stateId,
                CityName: cityName
            };

        if (parseInt(cityId) === parseInt(0)) {

            city.CreatedBy = parseInt(LOGGED_USER);
            city.CreatedByIp = IP_ADDRESS;            
        }
        else {
            city.ModifiedBy = parseInt(LOGGED_USER);
            city.ModifiedByIp = IP_ADDRESS;            
        }

        var postData = JSON.stringify(city);

        _shared.sendRequest(SERVICE_PATH + "SaveCity", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Records Saved Succesfully.",
                            type: "success"
                        }, function () {
                            getCities();
                        });
                    }
            }
            else {
                swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
            }

            _shared.hideLoader(DOM.loader);

        });

    }

    function getCities() {

        _shared.showLoader(DOM.loader);

        DOM.citiesList.tBodies[0].innerHTML = "";
        
        var stateId = 22;

        _shared.sendRequest(SERVICE_PATH + "GetCityByStateId/" + stateId, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            cities = [];

                            var table = DOM.citiesList;

                            var tableBody = table.tBodies[0];

                            for (var r = 0; r < _response.length; r++) {

                                var city = {};

                                city = {
                                    CityId: _response[r].CityId,
                                    StateId: _response[r].StateId,
                                    CityName: _response[r].CityName,
                                    SrNo: _response[r].SrNo,
                                };

                                cities.push(city);

                                var currentRow = document.createElement('TR');

                                var data;

                                data = "<tr><td>" + _response[r].SrNo + "</td>";
                                data = data + "<td>" + _response[r].CityName + "</td>";
                                data = data + "<td class='text-center'>" +
                                    "<a href='#' class='icons-controls-space'> <i class='fa fa-eye fa-fw'></i> </a> " +
                                    "<a href='#' class='icons-controls-space'> <i class='fa fa-edit fa-fw'></i> </a> " +
                                    "<a href='#' class='icons-controls-space'> <i class='fa fa-remove fa-fw'> </i> </a> </td > ";

                                currentRow.setAttribute('data-city-id', _response[r].CityId);
                                currentRow.innerHTML = data;

                                tableBody.appendChild(currentRow);
                            }

                            _shared.showPanel(DOM.viewMode);
                            _shared.hidePanel(DOM.editMode);
                        }
                        else {
                            _shared.showPanel(DOM.editMode);
                            _shared.hidePanel(DOM.viewMode);
                        }
                    }
                    else {
                        _shared.showPanel(DOM.viewMode);
                       _shared.hidePanel(DOM.editMode);
                    }
                }

                _shared.hideLoader(DOM.loader);
            }

        });

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


SharpiTech.City.init();
