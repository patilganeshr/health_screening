
var SharpiTech = {};

SharpiTech.LocalClient = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.editMode = document.getElementById('EditMode');
        DOM.loader = document.getElementById('Loader');
        DOM.mobileNo = document.getElementById('MobileNo');
        DOM.emailAddress = document.getElementById('EmailAddress');
        DOM.clientName = document.getElementById('ClientName');
        DOM.state = document.getElementById('State');
        DOM.city = document.getElementById('City');
        DOM.area = document.getElementById('Area');
        DOM.saveClient = document.getElementById('SaveClient');        
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

        DOM.saveClient.addEventListener('click', saveClient);        
    }

    function loadData() {

        _shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        _shared.clearInputs(DOM.editMode);

        DOM.clientName.setAttribute('data-client-address-id', 0);

        //show edit panel
        _shared.showPanel(DOM.editMode);
        
        //set focus
        DOM.mobileNo.focus();

        _shared.hideLoader(DOM.loader);

        getStates();

        getCities();

    }

    function getStates() {

        _shared.showLoader(DOM.loader);

        DOM.state.options.length = 0;
        
        var dataAttributes = 'state_code|tin_no';

        _shared.fillDropdownWithDataAttributesAndCallback(SERVICE_PATH + 'GetStateByCountryId/98', DOM.state, "StateName", "StateId", "Choose State", dataAttributes, function (response) {
            if (response.status === 200) {

                _shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {
                    /* Set state as Maharashtra */
                    _shared.setSelectValue(DOM.state, null, parseInt(22));
                    _shared.setSelect2ControlsText(DOM.state);

                    getCities();
                }
            }
            else {
                swal("Error!!!", "Error in the application " + response.responseText, "error");
            }

            _shared.hideLoader(DOM.loader);

        });

        _shared.hideLoader(DOM.loader);
    }

    function getCities() {

        DOM.city.options.length = 0;

        var stateId = parseInt(0);

        if (DOM.state.selectedIndex > 0) {
            stateId = DOM.state.options[DOM.state.selectedIndex].value;
        }

        _shared.fillDropdownWithCallback(SERVICE_PATH + 'GetCityByStateId/' + stateId, DOM.city, "CityName", "CityId", "Choose City", function (response) {
            if (response.status === 200) {
                if (response.responseText !== undefined) {
                    /* Set Mumbai as default city*/
                    _shared.setSelectValue(DOM.city, null, parseInt(1793));
                    _shared.setSelect2ControlsText(DOM.city);
                }
            }
            else {
                handleError("Response Status " + response.status + " Response Message " + response.message);
                swal("Error!!!", "Error in the application " + response.responseText, "error");
            }
        });
    }

    function validateClientDetails() {

        var isValid = true;

        if (DOM.mobileNo.value === "") {
            DOM.mobileNo.focus();
            swal("Error!!!", "Please enter the Mobile No.", "error");
            isValid = false;
        }
        else if (DOM.state.selectedIndex === -1) {
            DOM.state.focus();
            swal("Error!!!", "Please select the State Name.", "error");
            isValid = false;
        }
        else if (DOM.city.value === "") {
            DOM.cityName.focus();
            swal("Error!!!", "Please enter the City Name.", "error");
            return;
        }

        return isValid;
    }
    function saveClient() {

        _shared.showLoader(DOM.loader);

        try {
            /* temp variable */
            var mobileNo = null;
            var emailId = null;
            var clientName = null;
            var stateId = parseInt(0);
            var stateName = null;
            var cityId = parseInt(0);
            var cityName = null;
            var area = null;

            mobileNo = DOM.mobileNo.value;
            clientName = DOM.clientName.value;
            emaildId = DOM.emailAddress.value;
            stateId = parseInt(DOM.state.options[DOM.state.selectedIndex].value);
            cityId = parseInt(DOM.city.options[DOM.city.selectedIndex].value);

            area = DOM.area.value;

            if (clientName === "") {
                clientName = "CASH SALES - " + mobileNo;
            }

            if (isNaN(cityId)) { cityId = parseInt(0); }

            var clientAddress = {};
            var clientAddressess = [];

            clientAddress = {
                ClientId: 0,
                ClientName: clientName,
                AddressTypeId: 1,
                ClientAddressId: 0,
                ClientAddressName: clientName,
                Address: null,
                CountryId: 98,
                StateId: stateId,
                CityId: cityId,
                Area: area,
                ContactNos: mobileNo,
                EmailId: emailId,
                Website: null,
                GSTNo: null,
                IsDeleted: false,
                CreatedBy: parseInt(LOGGED_USER),
                CreatedByIP: IP_ADDRESS
            };

            clientAddressess.push(clientAddress);

            var client = {};
            var clients = [];

            client = {
                ClientTypeId: 1,
                ClientId: 0,
                ClientName: clientName,
                PANNo: null,
                CreatedBy: parseInt(LOGGED_USER),
                CreatedByIP: IP_ADDRESS,
                ClientAddressess: clientAddressess
            }

            clients.push(client);

            var postData = JSON.stringify(clients);

            _shared.sendRequest(SERVICE_PATH + "SaveClient", "POST", true, "JSON", postData, function (response) {

                _shared.showLoader(DOM.loader);

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
                            text: "This Client Name is already exists.",
                            type: "warning"
                        }, function () {
                            DOM.clientName.focus();
                        });
                    }
                }
                else {
                    handleError('Response ' + response.Status + ' Response Message: ' + response.responseText);
                    swal("error", "Unable to save the records. Error as " + response.Message + " " + response.ExceptionMessage, "error");
                }

                _shared.hideLoader(DOM.loader);

            });

        }
        catch (e) {
            handleError(e.message);
        }
        finally {
            _shared.hideLoader(DOM.loader);
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


SharpiTech.LocalClient.init();
