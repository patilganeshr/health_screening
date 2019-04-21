
var SharpiTech = {};

SharpiTech.City = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.editMode = document.getElementById('EditMode');
        DOM.loader = document.getElementById('Loader');
        DOM.state = document.getElementById('State');
        DOM.cityName = document.getElementById('CityName');
        DOM.saveCity = document.getElementById('SaveCity');        
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

        DOM.saveCity.addEventListener('click', saveCity);        
    }

    function loadData() {

        _shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        _shared.clearInputs(DOM.editMode);

        DOM.cityName.setAttribute('data-city-id', 0);

        //show edit panel
        _shared.showPanel(DOM.editMode);
        
        //set focus
        DOM.state.focus();

        _shared.hideLoader(DOM.loader);

        getStates();
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

            var response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Succesfully.",
                        type: "success"
                    });
                }
                else if (parseInt(response.responseText) === parseInt(-1)) {
                    swal({
                        title: "Warning",
                        text: "This City Name is already exists.",
                        type: "warning"
                    }, function () {
                        DOM.cityName.focus();
                    });
                }
            }
            else {
                swal("error", "Unable to save the records. Error as " + response.Message + " " + response.ExceptionMessage, "error");
            }

            _shared.hideLoader(DOM.loader);

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
