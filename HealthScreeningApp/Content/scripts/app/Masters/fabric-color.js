
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var _shared = require('./shared/default');





var SharpiTech = {};

SharpiTech.FabricColor = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    /* ---- private method ---- */
    //cache DOM elements
    function _cacheDOM() {

        DOM.fabricColorName = document.getElementById('FabricColor');
        DOM.fabricColorModal = document.getElementById('FabricColorModal');
        DOM.createNew = document.getElementById('CreateNew');
        DOM.backToView = document.getElementById('BackToView');
        DOM.saveFabricColor = document.getElementById('SaveFabricColor');
        DOM.showsFabricColors = document.getElementById('ShowFabricColors');

        /*cache the jquery element */
        DOM.$fabricColorModal = $('#FabricColorModal');
            
    }

    /* ---- handle errors ---- */
    function handleError(err) {
        consol.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {
        DOM.createNew.addEventListener('click', createNewFabricColor);
        DOM.backToView.addEventListener('click', backToView);
        DOM.saveFabricColor.addEventListener('click', saveFabricColor);
        DOM.showsFabricColors.addEventListener('click', getFabricColor);
    }
    
    function createNewFabricColor() {

        //clear the modal control inputs        
        _shared.clearInputs(DOM.fabricColorModal);

        DOM.fabricColorName.setAttribute('data-fabric-color-id', 0);

        //show modal;
        DOM.$fabricColorModal.modal('show');

        setFocus();

    }

    function backToView() {

        //close modal;
        DOM.$fabricColorModal.modal('hide');

    }

    function getFabricColor(evt) {

        var element = evt.target;

        var _currentTableRow = element.parentElement.parentElement;

        if (element.nodeName === 'A' || element.nodeName === 'I') {

            if (element.text.trim().toUpperCase() === "EDIT") {
                editFabricColor(_currentTableRow);
            }
            else if (element.text.trim().toUpperCase() === "DELETE") {
                deleteFabricColor(_currentTableRow);
            }
        }
    }

    function editFabricColor(currentTableRow) {

        //assign text to input
        DOM.fabricColorName.setAttribute('data-fabric-color-id', currentTableRow.getAttribute('data-fabric-color-id'));

        DOM.fabricColorName.value = currentTableRow.children[1].textContent;
        
        //show modal;
        DOM.$fabricColorModal.modal('show');

        setFocus();
        
    }

    function deleteFabricColor(currentTableRow) {

        var _table = DOM.showsFabricColors;
        var _tableBody = _table.tBodies[0];


        /* temp variable */
        var _fabricColorId = currentTableRow.getAttribute('data-fabric-color-id');
        
        var fabricColor = {};

        fabricColor = {
            FabricColorId: _fabricColorId,
            DeletedBy: LOGGED_USER,
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(fabricColor);
        
        _shared.sendRequest(SERVICE_PATH + 'DeleteFabricColor', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    _tableBody.removeChild(currentTableRow);

                }
            }
        });
    }

    function setFocus() {
        DOM.$fabricColorModal.on('shown.bs.modal', function () {
            DOM.fabricColorName.focus();
        });
    }

    function saveFabricColor() {

        if (DOM.fabricColorName.value === "") {
            swal("Error!!!", "Please enter the Fabric Color.", "error");
            return;
        }

        /* temp variable */
        var _fabricColorId = DOM.fabricColorName.getAttribute('data-fabric-color-id');
        var _fabricColorName = DOM.fabricColorName.value;
        
        var fabricColor = {};

            fabricColor = {
                FabricColorId: _fabricColorId,
                FabricColorName: _fabricColorName
            };

            if (parseInt(_fabricColorId) === parseInt(0)) {
                fabricColor.CreatedBy = LOGGED_USER;
                fabricColor.CreatedByIp = IP_ADDRESS;
            }
            else {
                fabricColor.ModifiedBy = LOGGED_USER;
                fabricColor.ModifiedByIp = IP_ADDRESS;
            }

        var postData = JSON.stringify(fabricColor);

        _shared.sendRequest(SERVICE_PATH + "SaveFabricColor", "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    viewFabricColor();
                }
            }            
        });

    }

    function viewFabricColor() {

        DOM.showsFabricColors.tBodies[0].innerHTML = "";
        
        _shared.sendRequest(SERVICE_PATH + "GetAllFabricColors", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        var _table = DOM.showsFabricColors;
                        var _tableBody = _table.tBodies[0];
                        
                        for (var r = 0; r < _response.length; r++) {

                            var _currentRow = document.createElement('TR');

                            var _data;

                            _data = "<tr><td>" + _response[r].Sr + "</td>";
                            _data = _data + "<td>" + _response[r].FabricColorName + "</td>";
                            _data = _data + "<td class='text-center'> <a href='#' class='btn btn-info btn-xs' data-fabric-color-id = " +  _response[r].FabricColorId + "> <i class='fa fa-edit'></i> Edit </a> " +
                                "<a href='#' class='btn btn-danger btn-xs' data-fabric-color-id = " +  _response[r].FabricColorId + "> <i class='fa fa-danger'> </i> Delete </a> </td > ";

                            _currentRow.setAttribute('data-fabric-color-id', _response[r].FabricColorId);
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
        viewFabricColor();
    }

    return {
        init: init
    };

}());


SharpiTech.FabricColor.init();
