﻿
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var shared = require('./shared/default');





var SharpiTech = {};

SharpiTech.Employee = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var employees = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.employeesList = document.getElementById('EmployeesList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.employer = document.getElementById('Employer');
        DOM.firstName = document.getElementById('FirstName');
        DOM.middleName = document.getElementById('MiddleName');
        DOM.lastName = document.getElementById('LastName');
        DOM.gender = document.getElementsByName('Gender');
        DOM.dateOfBirth = document.getElementById('DateOfBirth');
        DOM.contactNo1 = document.getElementById('ContactNo1');
        DOM.contactNo2 = document.getElementById('ContactNo2');
        DOM.mobileNo1 = document.getElementById('MobileNo1');
        DOM.mobileNo2 = document.getElementById('MobileNo2');
        DOM.address = document.getElementById('Address');
        DOM.emailId = document.getElementById('EmailId');
        DOM.panNo = document.getElementById('PANNo');
        DOM.department = document.getElementById('Department');

        DOM.addNewEmployee = document.getElementById('AddNewEmployee');
        DOM.showEmployeeList = document.getElementById('ShowEmployeeList');
        DOM.viewEmployee = document.getElementById('ViewEmployee');
        DOM.editEmployee = document.getElementById('EditEmployee');
        DOM.saveEmployee = document.getElementById('SaveEmployee');
        DOM.deleteEmployee = document.getElementById('DeleteEmployee');
        DOM.printEmployeeList = document.getElementById('PrintEmployeeList');
        DOM.filterEmployee = document.getElementById('FilterEmployee');
        DOM.exportEmployeeList = document.getElementById('ExportEmployeeList');

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

    //    $("select").on("change", function (event) {

    //    setFocusOnSelect(event);

    //});


    function bindEvents() {

        DOM.addNewEmployee.addEventListener('click', addNewEmployee);
        DOM.showEmployeeList.addEventListener('click', getEmployees);
        DOM.viewEmployee.addEventListener('click', viewEmployee);
        DOM.editEmployee.addEventListener('click', editEmployee);
        DOM.saveEmployee.addEventListener('click', saveEmployee);
        DOM.deleteEmployee.addEventListener('click', deleteEmployee);
        //DOM.filterEmployee.addEventListener('click', filterEmployee);

        DOM.department.addEventListener('change', function (e) {
            setFocusOnSelect(e);
        });
    }

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    function loadData() {

        getEmployers();

        getDepartments();

        getEmployees();
    }

    function getEmployers() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllEmployers', DOM.employer, "EmployerName", "EmployerId", "Choose Employer", function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function getDepartments() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllDepartments', DOM.department, "DepartmentName", "DepartmentId", "Choose Department", function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);

        });
    }

    var getSelectedRows = function () {

        var selectedRows = [];

        var tableBody = DOM.employeesList.tBodies[0];

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

    var getEmployeeId = function (selectedRows) {

        var employeeId = 0;

        employeeId = parseInt(selectedRows[0].getAttribute('data-employee-id'));

        if (isNaN(employeeId)) { employeeId = 0; }

        return employeeId;
    }

    function addNewEmployee() {

        // Clear the modal control inputs
        shared.clearInputs(DOM.editMode);
        shared.disableControls(DOM.editMode, false);

        DOM.firstName.setAttribute('data-employee-id', 0);

        // Show panel;
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        // Set focus
        DOM.employer.focus();
    }

    function viewEmployee() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.disableControls(DOM.editMode, true);

        var selectedRows = getSelectedRows();

        if (selectedRows.length) {

            if (selectedRows.length > 1) {
                swal({
                    title: "Warning",
                    text: "Please select only one record to View or Edit the Records.",
                    type: "success"
                }, function () {
                    shared.hideLoader(DOM.loader);
                });
            }
            else {

                var employeeId = getEmployeeId(selectedRows);

                showEmployeeDetails(employeeId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

        DOM.firstName.focus();
    }

    function editEmployee() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.disableControls(DOM.editMode, false);

        var selectedRows = getSelectedRows();

        if (selectedRows.length) {

            if (selectedRows.length > 1) {
                swal('Warning', "Please select only one record to Edit the Records.", "warning");
                return false;
            }
            else {

                var employeeId = getEmployeeId(selectedRows);

                showEmployeeDetails(employeeId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

        // Set ocus
        DOM.firstName.focus();
    }

    function deleteEmployee(currentTableRow) {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.employeesList.tBodies[0];

            var selectedRows = getSelectedRows();

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
                    closeOnCancel: true,
                },
                    function (isConfirm) {

                        if (isConfirm) {

                            for (var r = 0; r < selectedRows.length; r++) {

                                var employee = {};

                                employee = {
                                    EmployeeId: parseInt(selectedRows[r].getAttribute('data-employee-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS
                                };

                                var postData = JSON.stringify(employee);

                                shared.sendRequest(SERVICE_PATH + 'SaveEmployee', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {

                                            swal({
                                                title: "Success",
                                                text: "Employee deleted successfully.",
                                                type: "success"
                                            }, function () {
                                                getEmployees();
                                            });
                                        }
                                    }

                                    shared.hideLoader(DOM.loader);

                                });
                            }
                        }
                    }
                );
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

    function getEmployees() {

        shared.showLoader(DOM.loader);

        employees.length = 0;
        
        DOM.employeesList.tBodies[0].innerHTML = "";

        shared.sendRequest(SERVICE_PATH + "GetAllEmployees", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var data = JSON.parse(response.responseText);

                    if (data !== undefined) {

                        if (data.length > 0) {

                            for (var r = 0; r < data.length; r++) {

                                var employee = {};

                                employee = {
                                    EmployeeId: data[r].EmployeeId,
                                    FirstName: data[r].FirstName,
                                    MiddleName: data[r].MiddleName,
                                    LastName: data[r].LastName,
                                    FullName: data[r].FullName,
                                    SrNo: data[r].SrNo,
                                    EmployerId: data[r].EmployerId,
                                    EmployerName: data[r].EmployerName,
                                    ResidentialAddress: data[r].ResidentialAddress,
                                    DateOfBirth: data[r].DateOfBirth,
                                    Gender: data[r].Gender,
                                    ContactNo1: data[r].ContactNo1,
                                    ContactNo2: data[r].ContactNo2,
                                    MobileNo1: data[r].MobileNo1,
                                    MobileNo2: data[r].MobileNo2,
                                    ContactNos: data[r].ContactNos,
                                    EmailId: data[r].EmailId,
                                    PANNo: data[r].PANNo,
                                    DepartmentId: data[r].DepartmentId,
                                    guid: data[r].guid
                                };

                                employees.push(employee);
                            }
                        }

                        bindEmployeeDetails();
                    }

                    shared.hideLoader(DOM.loader);
                }
            }

        });
    }

    function bindEmployeeDetails() {

        var tableBody = DOM.employeesList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the employees has values
        if (employees.length) {

            var data = "";

            for (var r = 0; r < employees.length; r++) {

                data = data + "<tr data-employee-id=" + employees[r].EmployeeId + " >";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + employees[r].EmployeeId + "' class='label-checkbox' name='SelectEmployee' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + employees[r].SrNo + "</td>";
                data = data + "<td>" + employees[r].FullName + "</td>";
                data = data + "<td>" + employees[r].Gender + "</td>";
                data = data + "<td>" + employees[r].ContactNos + "</td>";
                data = data + "<td>" + employees[r].EmailId + "</td>";
                data = data + "</tr>";

            }

            tableBody.innerHTML = data;

            // Show panels
            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }
    }
    
    function showEmployeeDetails(employeeId) {

        if (employees.length) {

            var selectedEmployee = employees.filter(function (value, index, array) {
                return value.EmployeeId === employeeId;
            });

            if (selectedEmployee.length > 0) {

                for (var e = 0; e < selectedEmployee.length; e++) {

                    shared.setSelectValue(DOM.employer, null, parseInt(selectedEmployee[e].EmployerId));
                    shared.setSelect2ControlsText(DOM.employer);
                    DOM.firstName.value = selectedEmployee[e].FirstName;
                    DOM.firstName.setAttribute('data-employee-id', employeeId);
                    DOM.middleName.value = selectedEmployee[e].MiddleName;
                    DOM.lastName.value = selectedEmployee[e].LastName;
                    DOM.address.value = selectedEmployee[e].ResidentialAddress;
                    DOM.dateOfBirth.value = selectedEmployee[e].DateOfBirth;
                    shared.setRadioButtonValue(DOM.gender, selectedEmployee[e].Gender, null);
                    DOM.contactNo1.value = selectedEmployee[e].ContactNo1;
                    DOM.contactNo2.value = selectedEmployee[e].ContactNo2;
                    DOM.mobileNo1.value = selectedEmployee[e].MobileNo1;
                    DOM.mobileNo2.value = selectedEmployee[e].MobileNo2;
                    DOM.emailId.value = selectedEmployee[e].EmailId;
                    DOM.panNo.value = selectedEmployee[e].PANNo;
                    shared.setSelectValue(DOM.department, null, parseInt(selectedEmployee[e].DepartmentId));
                    shared.setSelect2ControlsText(DOM.department);

                }
            }

            shared.showPanel(DOM.editMode);
            shared.hidePanel(DOM.viewMode);
        }
    }
    
    var validateData = function() {

        var isValid = true;

        if (DOM.employer.selectedIndex === -1 || DOM.employer.selectedIndex === 0) {
            isValid = false;
            swal("Error!!!", "Please select the Employer.", "error");
        }
        else if (DOM.firstName.value === "") {
            isValid = false;
            swal("Error!!!", "Please enter the First Name.", "error");
        }
        else if (DOM.middleName.value === "") {
            isValid = false;
            swal("Error!!!", "Please enter the Middle Name.", "error");        
        }
        else if (DOM.lastName.value === "") {
            isValid = false;
            swal("Error!!!", "Please enter the Last Name.", "error");            
        }
        else if (DOM.dateOfBirth.value === "") {
            isValid = false;
            swal("Error!!!", "Please enter the First Name.", "error");            
        }
        else if (DOM.address.value === "") {
            isValid = false;
            swal("Error!!!", "Please enter the Address.", "error");            
        }

        return isValid;
    }

    function saveEmployee() {

        if (validateData()) {

            /* temp variable */
            var employerSelectedIndex = parseInt(0); DOM.employer.selectedIndex;
            var employerId = parseInt(0);
            var employerName = "";
            var employeeId = parseInt(0);
            var firstName = "";
            var middleName = "";
            var lastName = "";
            var gender = "";
            var dateOfBirth = "";
            var contactNo1 = "";
            var contactNo2 = "";
            var mobileNo1 = "";
            var mobileNo2 = "";
            var address = "";
            var emailId = "";
            var panNo = "";
            var deparmentSelectedIndex = parseInt(0);
            var departmentId = parseInt(0);
            var departmentName = "";

            var methodName = "AddEmployee";

            employerSelectedIndex = parseInt(DOM.employer.selectedIndex);
            employerId = parseInt(DOM.employer.options[employerSelectedIndex].value);
            employerName = DOM.employer.options[employerSelectedIndex].text;
            employeeId = parseInt(DOM.firstName.getAttribute('data-employee-id'));
            firstName = DOM.firstName.value;
            middleName = DOM.middleName.value;
            lastName = DOM.lastName.value;
            gender = shared.getRadioSelectedValue(DOM.gender);
            dateOfBirth = DOM.dateOfBirth.value;
            contactNo1 = DOM.contactNo1.value;
            contactNo2 = DOM.contactNo2.value;
            mobileNo1 = DOM.mobileNo1.value;
            mobileNo2 = DOM.mobileNo2.value;
            address = DOM.address.value;
            emailId = DOM.emailId.value;
            panNo = DOM.panNo.value;
            deparmentSelectedIndex = DOM.department.selectedIndex;
            departmentId = parseInt(DOM.department.options[deparmentSelectedIndex].value);
            departmentName = DOM.department.options[deparmentSelectedIndex].text;

            var employee = {};

            employee = {
                EmployeeId: employeeId,
                EmployerId: employerId,
                FirstName: firstName,
                MiddleName: middleName,
                lastName: lastName,
                ResidentialAddress: address,
                DateOfBirth: dateOfBirth,
                ContactNo1: contactNo1,
                ContactNo2: contactNo2,
                MobileNo1: mobileNo1,
                MobileNo2: mobileNo2,
                EmailId: emailId,
                DepartmentId: departmentId
            };

            if (parseInt(employeeId) === parseInt(0)) {

                employee.CreatedBy = parseInt(LOGGED_USER);
                employee.CreatedByIP = IP_ADDRESS;
            }
            else {

                employee.ModifiedBy = parseInt(LOGGED_USER);
                employee.ModifiedByIP = IP_ADDRESS;
            }

            var postData = JSON.stringify(employee);

            shared.sendRequest(SERVICE_PATH + "SaveEmployee", "POST", true, "JSON", postData, function (response) {
                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Employee Details saved successfully.",
                            type: "success"
                        }, function () {
                            getEmployees();
                        });
                    }
                }
            });
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


SharpiTech.Employee.init();
