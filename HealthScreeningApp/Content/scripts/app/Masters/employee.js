
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var shared = require('./shared/default');





var Sofarch = {};

Sofarch.Employee = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();
    var CurrentFocus = -1;

    var employees = [];
    var ExerciseDetails = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.employeesList = document.getElementById('EmployeesList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.employeeCode = document.getElementById('EmployeeCode');
        DOM.title = document.getElementById('Title');
        DOM.firstName = document.getElementById('FirstName');
        DOM.middleName = document.getElementById('MiddleName');
        DOM.lastName = document.getElementById('LastName');
        DOM.address = document.getElementById('Address');
        DOM.gender = document.getElementsByName('Gender');
        DOM.dateOfBirth = document.getElementById('DateOfBirth');
        DOM.dateOfBirthDatePicker = document.getElementById('DateOfBirthDatePicker');
        DOM.age = document.getElementById('Age');
        DOM.contactNo1 = document.getElementById('ContactNo1');
        DOM.contactNo2 = document.getElementById('ContactNo2');
        DOM.mobileNo1 = document.getElementById('MobileNo1');
        DOM.mobileNo2 = document.getElementById('MobileNo2');
        DOM.emailId = document.getElementById('EmailId');
        DOM.panNo = document.getElementById('PANNo');
        DOM.companyName = document.getElementById('CompanyName');
        DOM.searchCompanyList = document.getElementById('SearchCompanyList');
        DOM.department = document.getElementById('Department');
        DOM.designation = document.getElementById('Designation');
        DOM.height = document.getElementById('Height');
        DOM.weight = document.getElementById('Weight');
        DOM.maritalStatus = document.getElementsByName('MaritalStatus');
        DOM.married = document.getElementById('Married');
        DOM.unMarried = document.getElementById('UnMarried');
        DOM.noOfSons = document.getElementById('NoOfSons');
        DOM.noOfDaughters = document.getElementById('NoOfDaughters');
        DOM.smoking = document.getElementsByName('Smoking');
        DOM.smokingYes = document.getElementById('SmokingYes');
        DOM.smokingNo = document.getElementById('SmokingNo');
        DOM.alcohol = document.getElementsByName('Alcohol');
        DOM.alcoholYes = document.getElementById('AlcoholYes');
        DOM.alcoholNo = document.getElementById('AlcoholNo');
        DOM.tobacco = document.getElementsByName('Tobacco');
        DOM.tobaccoYes = document.getElementById('TobaccoYes');
        DOM.tobaccoNo = document.getElementById('TobaccoNo');
        DOM.bloodGroup = document.getElementById('BloodGroup');
        DOM.diet = document.getElementById('Diet');
        DOM.allergicTo = document.getElementById('AllergicTo');
        DOM.otherAddictions = document.getElementById('OtherAddictions');

        DOM.exercise = document.getElementById('Exercise');
        DOM.frequency = document.getElementById('Frequency');
        DOM.presentIllness = document.getElementById('PresentIllness');
        DOM.treatment = document.getElementById('Treatment');
        DOM.exerciseList = document.getElementById('ExerciseList');
        DOM.addExerciseDetails = document.getElementById('AddExerciseDetails');

        DOM.micturation = document.getElementById('Micturation');
        DOM.bowels = document.getElementById('Bowels');
        DOM.sleep = document.getElementById('Sleep');
        DOM.mc = document.getElementById('MC');
        DOM.pastHistory = document.getElementById('PastHistory');
        DOM.familyHistory = document.getElementById('FamilyHistory');

        DOM.$dateOfBirthDatePicker = $('#DateOfBirthDatePicker');

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

        DOM.$dateOfBirthDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY'
        });
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

        DOM.addNewEmployee.addEventListener('click', addNewEmployee);
        DOM.showEmployeeList.addEventListener('click', getEmployees);
        DOM.viewEmployee.addEventListener('click', viewEmployee);
        DOM.editEmployee.addEventListener('click', editEmployee);
        DOM.saveEmployee.addEventListener('click', saveEmployee);
        DOM.deleteEmployee.addEventListener('click', deleteEmployee);

        DOM.addExerciseDetails.addEventListener('click', addExerciseDetails);

        DOM.dateOfBirth.onblur = function () {
            calculateAge();
        };

        DOM.designation.onblur = function (e) {
            setActiveTabAndFocus(e);
        };

        DOM.otherAddictions.onblur = function (e) {
            setActiveTabAndFocus(e);
        };

        DOM.treatment.onblur = function (e) {
            setActiveTabAndFocus(e);
        };

        DOM.companyName.onkeyup = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchCompanyList(e);

        };

        DOM.employeeCode.onblur = function () {

            checkIsEmployeeCodeExists();
        };

        DOM.companyName.onblur = function () {

            checkIsEmployeeCodeExists();
        };

        DOM.firstName.onblur = function () {

            checkIsEmployeeNameExists();
        };

        DOM.middleName.onblur = function () {

            checkIsEmployeeNameExists();
        };

        DOM.lastName.onblur = function () {

            checkIsEmployeeNameExists();
        };

    }

    function loadData() {

        getBloodGroups();

        addNewEmployee();

        //getBranches();

        //getDepartments();

        //getEmployees();
    }

    function getBranches() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllBranchNames', DOM.branch, "BranchName", "BranchId", "Choose Branch", function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);

        });

    }

    function getBloodGroups() {

        shared.showLoader(DOM.loader);

        var dataAttributes = "BloodGroupFactorId";

        shared.fillDropdownWithDataAttributesAndCallback(SERVICE_PATH + 'GetAllBloodGroups', DOM.bloodGroup, "BloodGroupName", "BloodGroupId", "Choose Blood Group", dataAttributes, function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }
            else {

                shared.setSelectOptionByIndex(DOM.bloodGroup, parseInt(0));
                shared.setSelect2ControlsText(DOM.bloodGroup);

            }

            shared.hideLoader(DOM.loader);

        });

    }

    //function getDepartments() {

    //    shared.showLoader(DOM.loader);

    //    shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllDepartments', DOM.department, "DepartmentName", "DepartmentId", "Choose Department", function (response) {

    //        if (response.status !== 200) {

    //            swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
    //        }

    //        shared.hideLoader(DOM.loader);

    //    });
    //}

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
    };

    function setActiveTabAndFocus(e) {

        //Get the current active tab list
        var tabs = document.querySelectorAll('.nav-tabs li');

        if (tabs.length) {

            for (var t = 0; t < tabs.length; t++) {

                tabs[t].classList.remove('active');
            }
        }

        var tabPanes = document.querySelectorAll('.tab-pane');

        for (var tp = 0; tp < tabPanes.length; tp++) {

            tabPanes[tp].classList.remove('active');
        }

        var currentActiveTab = getCurrentActiveTab(e);

        var nextTab = currentActiveTab.nextElementSibling;

        var linkName;

        if (nextTab !== null) {

            linkName = nextTab.id;

            var currentTab = document.querySelectorAll('.nav-tabs li a[href="#' + linkName + '"]');

            var firstInput = nextTab.querySelectorAll('input[type="text"]')[0];

            currentActiveTab.classList.remove('active');

            currentTab[0].parentElement.classList.add('active');

            nextTab.classList.add('active');

            firstInput.focus();
        }
    }

    var getCurrentActiveTab = function (e) {

        //Find all tab panes
        var tabPanes = document.querySelectorAll('.tab-pane');

        var currentTab;

        for (var tp = 0; tp < tabPanes.length; tp++) {

            //Find the element
            var element = tabPanes[tp].querySelectorAll('input[id="' + e.target.id + '"]')[0];

            if (element !== undefined) {

                //Set the active tab
                currentTab = tabPanes[tp];

                //if found exit for loop
                break;
            }
        }

        //var currentTab = e.target.parentElement.parentElement.parentElement.parentElement;

        //if (currentTab.nodeName === "tab") {
        //    currentTab = e.target.parentElement.parentElement.parentElement.parentElement;
        //}
        //else {
        //    currentTab = e.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        //}

        return currentTab;

    };

    function calculateAge() {

        var dateOfBirth = new Date(DOM.dateOfBirth.value);

        var currentDate = new Date();

        var age = currentDate.getFullYear() - dateOfBirth.getFullYear();

        DOM.age.value = age;
    }

    var getEmployeeId = function (selectedRows) {

        var employeeId = 0;

        employeeId = parseInt(selectedRows[0].getAttribute('data-employee-id'));

        if (isNaN(employeeId)) { employeeId = 0; }

        return employeeId;
    };

    function showSearchCompanyList(e) {

        if (e.keyCode === 13) {
            CurrentFocus = -1;
            showCompanyNameOnEnterKey(e);
            return;
        }

        var dataAttributes = ['Company-Id', 'Company-Name'];

        var parameters = {};

        parameters = {

            Event: e,
            CurrentFocus: CurrentFocus,
            PostDataKeyValue: postMessage,
            ElementToBeAppend: DOM.searchCompanyList,
            DataAttributes: dataAttributes,
            PostParamObject: undefined,
            URL: SERVICE_PATH + "SearchCompaniesByCompanyCodeOrName/" + DOM.companyName.value + "/",
            DisplayName: "CompanyName"
        };

        shared.showAutoCompleteItemsList(parameters, function (response) {

            if (response !== undefined) {

                if (response >= 0) {

                    CurrentFocus = response;
                }
                else {

                    CurrentFocus = -1;

                    var autoCompleteList = response;

                    var listCount = autoCompleteList.length;

                    if (listCount) {

                        var data = "";

                        var fragment = document.createDocumentFragment();

                        var ul = document.createElement('ul');

                        ul.innerHTML = "";

                        ul.classList.add('list-group');

                        for (var s = 0; s < listCount; s++) {

                            var li = document.createElement('li');

                            li.classList.add('list-group-item');
                            li.classList.add('clearfix');

                            li.setAttribute('id', autoCompleteList[s].CompanyId);

                            li.style.cursor = "pointer";
                            li.onclick = showCompanyNameOnSelection;
                            li.textContent = autoCompleteList[s].CompanyName;

                            fragment.appendChild(li);
                        }

                        ul.appendChild(fragment);

                        DOM.searchCompanyList.appendChild(ul);

                        DOM.searchCompanyList.style.width = e.target.offsetWidth + 'px';
                        DOM.searchCompanyList.style.left = 0;//e.target.offsetParent.offsetLeft + 15 + 'px';

                        DOM.searchCompanyList.classList.add('autocompleteList-active');
                        //DOM.itemsList.innerHTML = data;

                    }
                }
            }

        });
    }

    function showCompanyNameOnSelection(e) {

        FLAG = "NEW ITEM";

        setCompanyName(e.target.textContent, e.target.id);

    }

    function showCompanyNameOnEnterKey() {

        FLAG = "NEW ITEM";

        var li = DOM.searchCompanyList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            setCompanyName(li[0].textContent, li[0].id);
        }

    }

    function setCompanyName(name, id) {

        DOM.companyName.value = name;
        DOM.companyName.setAttribute('data-company-id', id);

        shared.closeAutoCompleteList(DOM.searchCompanyList);

        DOM.companyName.focus();
    }

    var checkExerciseNameIsExists = function (exerciseName) {

        var isExists = false;

        if (ExerciseDetails.length) {

            for (var e = 0; e < ExerciseDetails.length; e++) {

                if (ExerciseDetails[e].ExerciseName.toLowerCase() === exerciseName) {

                    DOM.exercise.focus();
                    swal('Error', 'This Exercise Name is already exists.', 'error');
                    isExists = true;
                }
            }
        }

        return isExists;
    };

    function addExerciseDetails() {

        var srNo = parseInt(DOM.exercise.getAttribute('data-sr-no'));

        if (isNaN(srNo)) { srNo = 0; }

        saveExerciseDetails(srNo);
    }

    function editExerciseDetails(event) {

        if (ExerciseDetails.length) {

            var tableRow;

            if (event.target.nodeName.toLowerCase() === "i") {
                tableRow = event.target.parentElement.parentElement.parentElement;
            }
            else {
                tableRow = event.target.parentElement.parentElement;
            }

            var employeeExerciseId = parseInt(tableRow.getAttribute('data-employee-exercise-id'));
            var srNo = parseInt(tableRow.getAttribute('data-sr-no'));

            if (isNaN(employeeExerciseId)) { employeeExerciseId = 0; }
            if (isNaN(srNo)) { srNo = 0; }

            DOM.exercise.setAttribute('data-employee-exercise-id', employeeExerciseId);
            DOM.exercise.setAttribute('data-sr-no', srNo);
            DOM.exercise.value = tableRow.children[0].textContent;
            DOM.frequency.value = tableRow.children[1].textContent;
        }

        DOM.exercise.focus();

    }

    function deleteExerciseDetails(event) {

        if (ExerciseDetails.length) {

            var table = DOM.exerciseList;

            var tableBody = table.tBodies[0];

            var tableRow;

            if (event.target.nodeName.toLowerCase() === "i") {
                tableRow = event.target.parentElement.parentElement.parentElement;
            }
            else {
                tableRow = event.target.parentElement.parentElement;
            }

            var employeeExerciseId = parseInt(tableRow.getAttribute('data-employee-exercise-id'));

            var srNo = parseInt(tableRow.getAttribute('data-sr-no'));

            if (isNaN(employeeExerciseId)) { employeeExerciseId = 0; }

            if (isNaN(srNo)) { srNo = 0; }

            var exercise = ExerciseDetails.filter(function (value, index, array) {
                return value.SrNo === srNo;
            });

            if (employeeExerciseId === 0) {
                tableBody.removeChild(tableRow);
            }
            else {
                if (exercise.length) {

                    for (var e = 0; e < ExerciseDetails.length; e++) {

                        if (ExerciseDetails[e].SrNo === srNo) {
                            ExerciseDetails[e].ExerciseName = DOM.exercise.value;
                            ExerciseDetails[e].Frequency = DOM.frequency.value;
                            ExerciseDetails[e].IsDeleted = true;
                            ExerciseDetails[e].DeletedBy = parseInt(LOGGED_USER);
                            ExerciseDetails[e].DeletedByIP = IP_ADDRESS;

                            tableRow.style.display = 'none';

                            break;
                        }
                    }

                    bindExerciseDetails();
                }
            }
        }
    }

    function bindExerciseDetails() {

        var table = DOM.exerciseList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        var data = "";

        if (ExerciseDetails.length) {

            var exerciseDetails = ExerciseDetails.filter(function (value, index, array) {
                return value.IsDeleted === false || value.IsDeleted === null;
            });

            if (exerciseDetails.length) {

                for (var e = 0; e < exerciseDetails.length; e++) {

                    data += "<tr data-employee-exercise-id=" + exerciseDetails[e].EmployeeExerciseId + " data-sr-no=" + exerciseDetails[e].SrNo + ">";
                    data += "<td>" + exerciseDetails[e].ExerciseName + "</td>";
                    data += "<td>" + exerciseDetails[e].Frequency + "</td>";
                    data += "<td> <button type='button' id='EditExercise' class='btn btn-xs btn-info'><i class='fa fa-edit fa-fw'></i></button>" +
                        " <button type='button' id='RemoveExercise' class='btn btn-xs btn-danger'><i class='fa fa-remove fa-fw'></i></button>" +
                        "</td>";
                    data += "</tr>";
                }

                tableBody.innerHTML = data;

                addEventsToExerciseTableElements(tableBody);
            }
        }
    }

    function addEventsToExerciseTableElements(tableBody) {

        var buttons = tableBody.querySelectorAll('button');

        if (buttons.length) {

            for (var b = 0; b < buttons.length; b++) {

                var button = buttons[b];

                if (button.id.toLowerCase() === "editexercise") {

                    button.onclick = function (e) {
                        editExerciseDetails(e);
                    };
                }
                else if (button.id.toLowerCase() === "removeexercise") {

                    button.onclick = function (e) {
                        deleteExerciseDetails(e);
                    };
                }

            }
        }
    }

    function saveExerciseDetails(srNo) {

        var IsExerciseNameExists = false;

        if (srNo === 0) {

            IsExerciseNameExists = checkExerciseNameIsExists(DOM.exercise.value.toLowerCase());

            srNo = shared.getMaxSrNo(ExerciseDetails, 0);
        }

        if (IsExerciseNameExists === false) {

            var employeeId = parseInt(DOM.employeeCode.getAttribute('data-employee-id'));

            var exerciseDetails = {};

            if (isNaN(employeeId)) { employeeId = 0; }

            if (isNaN(srNo)) { srNo = 0; }

            if (ExerciseDetails.length) {

                var exercise = ExerciseDetails.filter(function (value, index, array) {
                    return value.SrNo === srNo;
                });

                if (exercise.length === 0) {

                    exerciseDetails = {
                        SrNo: srNo,
                        EmployeeId: employeeId,
                        EmployeeExerciseId: 0,
                        ExerciseName: DOM.exercise.value,
                        Frequency: DOM.frequency.value,
                        IsDeleted: false,
                        CreatedBy: parseInt(LOGGED_USER),
                        CreatedByIP: IP_ADDRESS
                    };

                    ExerciseDetails.push(exerciseDetails);

                    bindExerciseDetails();
                }
                else {

                    for (var e = 0; e < ExerciseDetails.length; e++) {

                        if (ExerciseDetails[e].SrNo === srNo) {
                            ExerciseDetails[e].ExerciseName = DOM.exercise.value;
                            ExerciseDetails[e].Frequency = DOM.frequency;
                            ExerciseDetails[e].IsDeleted = false;
                            ExerciseDetails[e].ModifiedBy = parseInt(LOGGED_USER);
                            ExerciseDetails[e].ModifiedByIP = IP_ADDRESS;

                            break;
                        }
                    }

                    bindExerciseDetails();
                }
            }
            else {

                exerciseDetails = {
                    SrNo: srNo,
                    EmployeeId: employeeId,
                    EmployeeExerciseId: 0,
                    ExerciseName: DOM.exercise.value,
                    Frequency: DOM.frequency.value,
                    IsDeleted: false,
                    CreatedBy: parseInt(LOGGED_USER),
                    CreatedByIP: IP_ADDRESS
                };

                ExerciseDetails.push(exerciseDetails);

                bindExerciseDetails();
            }
        }

        DOM.exercise.value = "";
        DOM.exercise.setAttribute('data-employee-exercise-id', 0);
        DOM.exercise.setAttribute('data-sr-no', 0);
        DOM.frequency.value = "";

        DOM.exercise.focus();
    }


    function addNewEmployee() {

        shared.showLoader(DOM.loader);

        // Clear the modal control inputs
        shared.clearInputs(DOM.editMode);
        shared.disableControls(DOM.editMode, false);
        shared.clearTables(DOM.editMode);

        DOM.employeeCode.setAttribute('data-employee-id', 0);

        // Show panel;
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        // Set focus
        DOM.employeeCode.focus();

        shared.hideLoader(DOM.loader);
    }

    function viewEmployee() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

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
        shared.clearTables(DOM.editMode);

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

        // Set Focus
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
                    closeOnCancel: true
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

        shared.sendRequest(SERVICE_PATH + "SearchAllEmployees/", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var data = JSON.parse(response.responseText);

                    if (data !== undefined) {

                        employees = data;

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
                data = data + "<td>" + employees[r].CompanyName + "</td>";
                data = data + "<td>" + employees[r].EmployeeCode + "</td>";
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

        shared.showLoader(DOM.loader);

        if (employees.length) {

            var selectedEmployee = employees.filter(function (value, index, array) {
                return value.EmployeeId === employeeId;
            });

            if (selectedEmployee.length > 0) {

                DOM.companyName.value = selectedEmployee[0].CompanyName;
                DOM.companyName.setAttribute('data-company-id', selectedEmployee[0].CompanyId);
                DOM.employeeCode.value = selectedEmployee[0].EmployeeCode;
                DOM.employeeCode.setAttribute('data-employee-id', selectedEmployee[0].EmployeeId);
                DOM.firstName.value = selectedEmployee[0].FirstName;
                DOM.middleName.value = selectedEmployee[0].MiddleName;
                DOM.lastName.value = selectedEmployee[0].LastName;
                DOM.address.value = selectedEmployee[0].Address;
                DOM.dateOfBirth.value = selectedEmployee[0].DateOfBirth;
                shared.setRadioButtonValue(DOM.gender, selectedEmployee[0].Gender, null);
                DOM.contactNo1.value = selectedEmployee[0].ContactNo1;
                DOM.contactNo2.value = selectedEmployee[0].ContactNo2;
                DOM.mobileNo1.value = selectedEmployee[0].MobileNo1;
                DOM.mobileNo2.value = selectedEmployee[0].MobileNo2;
                DOM.emailId.value = selectedEmployee[0].EmailId;
                DOM.panNo.value = selectedEmployee[0].PANNo;
                DOM.department.value = selectedEmployee[0].Department;
                DOM.designation.value = selectedEmployee[0].Designation;

                showEmployeePersonalHistory(selectedEmployee[0]);

                var exerciseDetails = selectedEmployee[0].EmployeeExerciseHistories.filter(function (value, index, array) {
                    return value.EmployeeId === selectedEmployee[0].EmployeeId;
                });

                ExerciseDetails = exerciseDetails;

                bindExerciseDetails();
            }

            shared.showPanel(DOM.editMode);
            shared.hidePanel(DOM.viewMode);
        }

        shared.hideLoader(DOM.loader);
    }

    function showEmployeePersonalHistory(employee) {

        var employeePersonalHistory = employee.EmployeePersonalHistory;

        if (employeePersonalHistory !== null) {

            DOM.height.value = employeePersonalHistory.EmployeeHeight;
            DOM.weight.value = employeePersonalHistory.EmployeeWeight;
            if (employeePersonalHistory.MaritalStatus.toLowerCase() === "married") {
                DOM.married.checked = true;
                DOM.unMarried.checked = false;
            }
            else {
                DOM.married.checked = false;
                DOM.unMarried.checked = true;
            }
            DOM.noOfSons.value = employeePersonalHistory.NoOfSons;
            DOM.noOfDaughters.value = employeePersonalHistory.NoOfDaughters;
            if (employeePersonalHistory.Smoking.toLowerCase() === "no") {
                DOM.smokingNo.checked = true;
                DOM.smokingYes.checked = false;
            }
            else {
                DOM.smokingNo.checked = false;
                DOM.smokingYes.checked = true;
            }
            if (employeePersonalHistory.Alcohol.toLowerCase() === "no") {
                DOM.alcoholNo.checked = true;
                DOM.alcoholYes.checked = false;
            }
            else {
                DOM.alcoholNo.checked = false;
                DOM.alcoholYes.checked = true;
            }
            if (employeePersonalHistory.Tobacco.toLowerCase() === "no") {
                DOM.tobaccoNo.checked = true;
                DOM.tobaccoYes.checked = false;
            }
            else {
                DOM.tobaccoNo.checked = false;
                DOM.tobaccoYes.checked = true;
            }
            shared.setSelectValue(DOM.bloodGroup, null, parseInt(employeePersonalHistory.BloodGroupId));
            shared.setSelect2ControlsText(DOM.bloodGroup);
            DOM.diet.value = employeePersonalHistory.Diet;
            DOM.allergicTo.value = employeePersonalHistory.AllergicTo;
            DOM.otherAddictions.value = employeePersonalHistory.OtherAddictions;
            DOM.presentIllness.value = employeePersonalHistory.PresentIllness;
            DOM.treatment.value = employeePersonalHistory.Treatment;
            DOM.micturation.value = employeePersonalHistory.Micturation;
            DOM.bowels.value = employeePersonalHistory.Bowels;
            DOM.sleep.value = employeePersonalHistory.Sleep;
            DOM.mc.value = employeePersonalHistory.MC;
            DOM.pastHistory.value = employeePersonalHistory.PastHistory;
            DOM.familyHistory.value = employeePersonalHistory.FamilyHistory;
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);
    }
    
    var validateData = function () {

        var isValid = true;

        if (DOM.employeeCode.value === "") {
            isValid = false;
            swal("Error!!!", "Please enter the Employee Code.", "error");
        }
        else if (DOM.title.selectedIndex === 0) {
            isValid = false;
            swal("Error!!!", "Please select the Title.", "error");
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
            swal("Error!!!", "Please enter the Date of Birth.", "error");
        }
        else if (shared.getRadioSelectedValue(DOM.gender) === false) {
            isValid = false;
            swal("Error!!!", "Please select the Gender.", "error");
        }
        else if (DOM.address.value === "") {
            isValid = false;
            swal("Error!!!", "Please enter the Address.", "error");
        }

        return isValid;
    };

    var saveEmployeePersonalHistory = function () {

        var employeePersonalHistory = {};

        var employeePersonalHistoryId = 0;
        var employeeId = 0;
        var height = 0;
        var weight = 0;
        var maritalStatus = null;
        var noOfSons = 0;
        var noOfDaughters = 0;
        var isSmoking = false;
        var isAlcohol = false;
        var isTobacco = false;
        var bloodGroupId = 0;
        var bloodGroupFactorId = 0;
        var diet = null;
        var allergicTo = null;
        var otherAddictions = null;
        var exercise = null;
        var frequency = null;
        var presentIllness = null;
        var treatment = null;
        var micturation = null;
        var bowels = null;
        var sleep = null;
        var mc = null;
        var pastHistory = null;
        var familyHistory = null;

        height = DOM.height.value;
        weight = DOM.weight.value;
        maritalStatus = shared.getRadioSelectedValue(DOM.maritalStatus);
        noOfSons = parseInt(DOM.noOfSons.value);
        noOfDaughters = parseInt(DOM.noOfDaughters.value);
        DOM.smokingYes.checked ? isSmoking = true : false;
        DOM.alcoholYes.checked ? isAlcohol = true : false;
        DOM.tobaccoYes.checked ? isTobacco = true : false;
        bloodGroupId = DOM.bloodGroup.options[DOM.bloodGroup.selectedIndex].value;
        bloodGroupFactorId = DOM.bloodGroup.options[DOM.bloodGroup.selectedIndex].getAttribute('data-bloodgroupfactorid');
        diet = DOM.diet.value;
        allergicTo = DOM.allergicTo.value;
        otherAddictions = DOM.otherAddictions.value;
        exercise = DOM.exercise.value;
        frequency = DOM.frequency.value;
        presentIllness = DOM.presentIllness.vlaue;
        treatment = DOM.treatment.value;
        micturation = DOM.micturation.value;
        bowels = DOM.bowels.value;
        sleep = DOM.sleep.value;
        mc = DOM.mc.value;
        pastHistory = DOM.pastHistory.value;
        familyHistory = DOM.familyHistory.value;

        employeePersonalHistory = {
            EmployeePersonalHistoryId: employeePersonalHistoryId,
            EmployeeId: employeeId,
            EmployeeHeight: height,
            HeightUnit: 'Cms',
            EmployeeWeight: weight,
            WeightUnit: 'Kgs',
            MaritalStatus: maritalStatus,
            NoOfSons: noOfSons,
            NoOfDaughters: noOfDaughters,
            IsSmoking: isSmoking,
            IsAlcohol: isAlcohol,
            IsTobacco: isTobacco,
            BloodGroupId: bloodGroupId,
            BloodGroupFactorId: bloodGroupFactorId,
            Diet: diet,
            AllergicTo: allergicTo,
            OtherAddictions: otherAddictions,
            PresentIllness: presentIllness,
            Treatment: treatment,
            Micturation: micturation,
            Bowels: bowels,
            Sleep: sleep,
            MC: mc,
            PastHistory: pastHistory,
            FamilyHistory: familyHistory
        };

        if (parseInt(employeeId) === parseInt(0)) {

            employeePersonalHistory.CreatedBy = parseInt(LOGGED_USER);
            employeePersonalHistory.CreatedByIP = IP_ADDRESS;
        }
        else {

            employeePersonalHistory.ModifiedBy = parseInt(LOGGED_USER);
            employeePersonalHistory.ModifiedByIP = IP_ADDRESS;
        }

        return employeePersonalHistory;

    };

    var saveEmployeeExerciseHistory = function () {

        var employeePersonalHistories = [];

        var employeePersonalHistory = {};

        return employeePersonalHistories;
    };

    function checkIsEmployeeNameExists() {

        var companyId = parseInt(DOM.companyName.getAttribute('data-company-id'));

        var employeeName = "";
        var firstName = undefined;
        var middleName = undefined;
        var lastName = undefined;

        firstName = DOM.firstName.value;
        middleName = DOM.middleName.value;
        lastName = DOM.lastName.value;

        if (firstName !== "" && middleName !== "" && lastName !== "") {
            employeeName = firstName + ' ' + middleName + ' ' + lastName;
        }

        if (isNaN(companyId)) { companyId = 0; }

        shared.sendRequest(SERVICE_PATH + "IsEmployeeNameExists/" + companyId + '/' + employeeName, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText) {

                    DOM.firstName.focus();

                    swal("Error", "This Employee Name is already exists.", "error");

                }

                //callback(isEmployeeNameExists);
            }
        });
    }

    function checkIsEmployeeCodeExists() {

        var companyId = parseInt(DOM.companyName.getAttribute('data-company-id'));

        var employeeName = "";
        var employeeCode = "";

        employeeCode = DOM.employeeCode.value;

        if (isNaN(companyId)) { companyId = 0; }

        if (empoyeeCode !== "" && companyName !== "") {
            
        
        shared.sendRequest(SERVICE_PATH + "IsEmployeeCodeExists/" + companyId + '/' + employeeCode, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText) {

                    DOM.firstName.focus();

                    swal("Error", "This Employee Name is already exists.", "error");

                }

                //callback(isEmployeeNameExists);
            }
        });
    }

    function saveEmployee() {

        if (validateData()) {

            /* temp variable */
            var employeeId = 0;
            var employeeCode = null;
            var title = null;
            var firstName = null;
            var middleName = null;
            var lastName = null;
            var address = null;            
            var dateOfBirth = null;
            var gender = null;            
            var contactNo1 = null;
            var contactNo2 = null;
            var mobileNo1 = null;
            var mobileNo2 = null;
            var emailId = null;
            var panNo = null;
            var companyId = 0;
            var department = null;
            var designation = null;
            
            var methodName = "AddEmployee";

            employeeId = parseInt(DOM.employeeCode.getAttribute('data-employee-id'));
            employeeCode = DOM.employeeCode.value;
            title = DOM.title.options[DOM.title.selectedIndex].text;
            firstName = DOM.firstName.value;
            middleName = DOM.middleName.value;
            lastName = DOM.lastName.value;
            address = DOM.address.value;            
            gender = shared.getRadioSelectedValue(DOM.gender);
            dateOfBirth = DOM.dateOfBirth.value;
            contactNo1 = DOM.contactNo1.value;
            contactNo2 = DOM.contactNo2.value;
            mobileNo1 = DOM.mobileNo1.value;
            mobileNo2 = DOM.mobileNo2.value;
            emailId = DOM.emailId.value;
            panNo = DOM.panNo.value;
            companyId = DOM.companyName.getAttribute('data-company-id');
            department = DOM.department.value;
            designation = DOM.designation.value;
            
            if (isNaN(employeeId)) { employeeId = 0; }
            if (isNaN(companyId)) { companyId = 0; }


            var employee = {};

            var employeePersonalHistory = saveEmployeePersonalHistory();

            var employeeExerciseHistories = ExerciseDetails;

            employee = {
                EmployeeId: employeeId,
                EmployeeCode: employeeCode,
                Title: title,
                FirstName: firstName,
                MiddleName: middleName,
                LastName: lastName,
                Address: address,
                DateOfBirth: dateOfBirth,
                ContactNo1: contactNo1,
                ContactNo2: contactNo2,
                MobileNo1: mobileNo1,
                MobileNo2: mobileNo2,
                EmailId: emailId,
                PANNo: panNo,
                Department: department,
                Designation: designation,
                Gender: gender,
                CompanyId: companyId,
                EmployeePersonalHistory: employeePersonalHistory,
                EmployeeExerciseHistories: employeeExerciseHistories
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
                else {
                    swal({
                        title: "Error",
                        text: "Unable to save the records.",
                        type: "error"
                    });
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


Sofarch.Employee.init();
