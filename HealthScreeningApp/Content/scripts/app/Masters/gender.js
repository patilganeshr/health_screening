
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var _shared = require('./shared/default');





var SharpiTech = {};

SharpiTech.Gender = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    /* ---- private method ---- */
    //cache DOM elements
    function _cacheDOM() {

        DOM.genderName = document.getElementById('Gender');
        DOM.genderModal = document.getElementById('GenderModal');
        DOM.createNew = document.getElementById('CreateNew');
        DOM.backToView = document.getElementById('BackToView');
        DOM.saveGender = document.getElementById('SaveGender');
        DOM.showsGenders = document.getElementById('ShowGenders');

        /*cache the jquery element */
        DOM.$genderModal = $('#GenderModal');
            
    }

    /* ---- handle errors ---- */
    function handleError(err) {
        consol.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {
        DOM.createNew.addEventListener('click', createNewGender);
        DOM.backToView.addEventListener('click', backToView);
        DOM.saveGender.addEventListener('click', saveGender);
        DOM.showsGenders.addEventListener('click', getGender);
    }
    
    function createNewGender() {

        //clear the modal control inputs        
        _shared.clearInputs(DOM.genderModal);

        DOM.genderName.setAttribute('data-gender-id', 0);

        //show modal;
        DOM.$genderModal.modal('show');

        setFocus();

    }

    function backToView() {

        //close modal;
        DOM.$genderModal.modal('hide');

    }

    function getGender(evt) {

        var element = evt.target;

        var _currentTableRow = element.parentElement.parentElement;

        if (element.nodeName === 'A' || element.nodeName === 'I') {

            if (element.text.trim().toUpperCase() === "EDIT") {
                editGender(_currentTableRow);
            }
            else if (element.text.trim().toUpperCase() === "DELETE") {
                deleteGender(_currentTableRow);
            }
        }
    }

    function editGender(currentTableRow) {

        //assign text to input
        DOM.genderName.setAttribute('data-gender-id', currentTableRow.getAttribute('data-gender-id'));

        DOM.genderName.value = currentTableRow.children[1].textContent;
        
        //show modal;
        DOM.$genderModal.modal('show');

        setFocus();
        
    }

    function deleteGender(currentTableRow) {

        var _table = DOM.showsGenders;
        var _tableBody = _table.tBodies[0];


        /* temp variable */
        var _genderId = currentTableRow.getAttribute('data-gender-id');
        
        var gender = {};

        gender = {
            GenderId: _genderId,
            DeletedBy: LOGGED_USER,
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(gender);
        
        _shared.sendRequest(SERVICE_PATH + 'DeleteGender', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    _tableBody.removeChild(currentTableRow);

                }
            }
        });
    }

    function setFocus() {
        DOM.$genderModal.on('shown.bs.modal', function () {
            DOM.genderName.focus();
        });
    }

    function saveGender() {

        if (DOM.genderName.value === "") {
            swal("Error!!!", "Please enter the Gender.", "error");
            return;
        }

        /* temp variable */
        var _genderId = DOM.genderName.getAttribute('data-gender-id');
        var _genderName = DOM.genderName.value;

        var gender = {};

         gender = {
                GenderId: _genderId,
                GenderName: _genderName
            };

         if (parseInt(_genderId) === parseInt(0)) {
             gender.CreatedBy = LOGGED_USER;
             gender.CreatedByIp = IP_ADDRESS;
         }
         else {
             gender.ModifiedBy = LOGGED_USER;
             gender.ModifiedByIp = IP_ADDRESS;
        }

        var postData = JSON.stringify(gender);

        _shared.sendRequest(SERVICE_PATH + "SaveGender", "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    viewGender();
                }
            }            
        });

    }

    function viewGender() {

        DOM.showsGenders.tBodies[0].innerHTML = "";
        
        _shared.sendRequest(SERVICE_PATH + "GetAllGenders", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        var _table = DOM.showsGenders;
                        var _tableBody = _table.tBodies[0];
                        
                        for (var r = 0; r < _response.length; r++) {

                            var _currentRow = document.createElement('TR');

                            var _data;

                            _data = "<tr><td>" + _response[r].Sr + "</td>";
                            _data = _data + "<td>" + _response[r].GenderName+ "</td>";
                            _data = _data + "<td class='text-center'> <a href='#' class='btn btn-info btn-xs' data-gender-id = " +  _response[r].GenderId + "> <i class='fa fa-edit'></i> Edit </a> " +
                                "<a href='#' class='btn btn-danger btn-xs' data-gender-id = " +  _response[r].GenderId + "> <i class='fa fa-danger'> </i> Delete </a> </td > ";

                            _currentRow.setAttribute('data-gender-id', _response[r].GenderId);
                            _currentRow.innerHTML = _data;

                            _tableBody.appendChild(_currentRow);
                        }
                    }
                }
            }
        });

    }

    
    /* ---- public methods ---- */
    function init() {
        _cacheDOM();
        bindEvents();
        viewGender();
    }

    return {
        init: init
    };

}());


SharpiTech.Gender.init();
