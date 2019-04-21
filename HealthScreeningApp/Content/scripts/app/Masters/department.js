
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var _shared = require('./shared/default');





var SharpiTech = {};

SharpiTech.Department = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var _shared = new Shared();

    /* ---- private method ---- */
    //cache DOM elements
    function _cacheDOM() {

        DOM.departmentName = document.getElementById('Department');
        DOM.departmentModal = document.getElementById('DepartmentModal');
        DOM.createNew = document.getElementById('CreateNew');
        DOM.backToView = document.getElementById('BackToView');
        DOM.saveDepartment = document.getElementById('SaveDepartment');
        DOM.showsDepartments = document.getElementById('ShowDepartments');

        /*cache the jquery element */
        DOM.$departmentModal = $('#DepartmentModal');
            
    }

    /* ---- handle errors ---- */
    function handleError(err) {
        consol.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {
        DOM.createNew.addEventListener('click', createNewDepartment);
        DOM.backToView.addEventListener('click', backToView);
        DOM.saveDepartment.addEventListener('click', saveDepartment);
        DOM.showsDepartments.addEventListener('click', getDepartment);
    }
    
    function createNewDepartment() {

        //clear the modal control inputs        
        _shared.clearInputs(DOM.departmentModal);

        DOM.departmentName.setAttribute('data-department-id', 0);

        //show modal;
        DOM.$departmentModal.modal('show');

        setFocus();

    }

    function backToView() {

        //close modal;
        DOM.$departmentModal.modal('hide');

    }

    DOM.$styleSizeModal.on('shown.bs.modal', function () {
            DOM.departmentName.focus();
    });

    function getDepartment(evt) {

        var element = evt.target;

        var _currentTableRow = element.parentElement.parentElement;

        if (element.nodeName === 'A' || element.nodeName === 'I') {

            if (element.text.trim().toUpperCase() === "EDIT") {
                editDepartment(_currentTableRow);
            }
            else if (element.text.trim().toUpperCase() === "DELETE") {
                deleteDepartment(_currentTableRow);
            }
        }
    }

    function editDepartment(currentTableRow) {

        //assign text to input
        DOM.departmentName.setAttribute('data-department-id', currentTableRow.getAttribute('data-department-id'));

        DOM.departmentName.value = currentTableRow.children[1].textContent;
        
        //show modal;
        DOM.$departmentModal.modal('show');

        setFocus();
        
    }

    function deleteDepartment(currentTableRow) {

        var _table = DOM.showsDepartments;
        var _tableBody = _table.tBodies[0];


        /* temp variable */
        var _departmentId = currentTableRow.getAttribute('data-department-id');
        
        var department = {};

        department = {
            DepartmentId: _departmentId,
            DeletedBy: LOGGED_USER,
            DeletedByIp: IP_ADDRESS
        };

        var postData = JSON.stringify(department);
        
        _shared.sendRequest(SERVICE_PATH + 'DeleteDepartment', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    _tableBody.removeChild(currentTableRow);

                }
            }
        });
    }

    function setFocus() {
        DOM.$departmentModal.on('shown.bs.modal', function () {
            DOM.departmentName.focus();
        });
    }

    function saveDepartment() {

        if (DOM.departmentName.value === "") {
            swal("Error!!!", "Please enter the Department.", "error");
            return;
        }

        /* temp variable */
        var _departmentId = DOM.departmentName.getAttribute('data-department-id');
        var _departmentName = DOM.departmentName.value;
        
        var department = {};

            department = {
                DepartmentId: _departmentId,
                DepartmentName: _departmentName
            };

        if (parseInt(_departmentId) === parseInt(0)) {
            department.CreatedBy = LOGGED_USER;
            department.CreatedByIp = IP_ADDRESS;
        }
        else {
            department.ModifiedBy = LOGGED_USER;
            department.ModifiedByIp = IP_ADDRESS;
        }

        var postData = JSON.stringify(department);

        _shared.sendRequest(SERVICE_PATH + "SaveDepartment", "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    viewDepartment();
                }
            }            
        });

    }

    function viewDepartment() {

        DOM.showsDepartments.tBodies[0].innerHTML = "";
        
        _shared.sendRequest(SERVICE_PATH + "GetAllDepartments", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        var _table = DOM.showsDepartments;
                        var _tableBody = _table.tBodies[0];
                        
                        for (var r = 0; r < _response.length; r++) {

                            var _currentRow = document.createElement('TR');

                            var _data;

                            _data = "<tr><td>" + _response[r].Sr + "</td>";
                            _data = _data + "<td>" + _response[r].DepartmentName + "</td>";
                            _data = _data + "<td class='text-center'> <a href='#' class='btn btn-info btn-xs' data-department-id = " +  _response[r].DepartmentId + "> <i class='fa fa-edit'></i> Edit </a> " +
                                "<a href='#' class='btn btn-danger btn-xs' data-department-id = " +  _response[r].DepartmentId + "> <i class='fa fa-danger'> </i> Delete </a> </td > ";

                            _currentRow.setAttribute('data-department-id', _response[r].DepartmentId);
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
        viewDepartment();
    }

    return {
        init: init
    };

}());


SharpiTech.Department.init();
