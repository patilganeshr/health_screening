
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var shared = require('./shared/default');





var Sofarch = {};

Sofarch.Patient = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();
    var CurrentFocus = -1;
    var IsPatientRecordChanged = false;

    var Patients = [];
    var ExerciseDetails = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.searchPatientPanel = document.getElementById('SearchPatientPanel');
        DOM.searchOptions = document.getElementById('SearchOptions');
        DOM.searchValue = document.getElementById('SearchValue');
        DOM.searchPatient = document.getElementById('SearchPatient');

        DOM.patientsList = document.getElementById('PatientsList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.patientCode = document.getElementById('PatientCode');
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

        DOM.patientPersonalHistoryId = document.getElementById('PatientPersonalHistoryId');
        DOM.height = document.getElementById('Height');
        DOM.weight = document.getElementById('Weight');
        DOM.maritalStatus = document.getElementsByName('MaritalStatus');
        DOM.married = document.getElementById('Married');
        DOM.unMarried = document.getElementById('UnMarried');
        DOM.noOfSons = document.getElementById('NoOfSons');
        DOM.noOfDaughters = document.getElementById('NoOfDaughters');
        DOM.smoking = document.getElementById('Smoking');
        DOM.alcohol = document.getElementById('Alcohol');
        DOM.tobacco = document.getElementById('Tobacco');
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

        DOM.addNewPatient = document.getElementById('AddNewPatient');
        DOM.showPatientList = document.getElementById('ShowPatientList');
        DOM.viewPatient = document.getElementById('ViewPatient');
        DOM.editPatient = document.getElementById('EditPatient');
        DOM.savePatient = document.getElementById('SavePatient');
        DOM.deletePatient = document.getElementById('DeletePatient');
        DOM.printPatientList = document.getElementById('PrintPatientList');
        DOM.filterPatient = document.getElementById('FilterPatient');
        DOM.exportPatientList = document.getElementById('ExportPatientList');

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

        DOM.addNewPatient.addEventListener('click', addNewPatient);
        DOM.showPatientList.addEventListener('click', checkIsRecordsAreChanged);
        DOM.viewPatient.addEventListener('click', viewPatient);
        DOM.editPatient.addEventListener('click', editPatient);
        DOM.savePatient.addEventListener('click', savePatient);
        DOM.deletePatient.addEventListener('click', deletePatient);
        DOM.searchPatient.addEventListener('click', searchPatient);

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

        DOM.companyName.onkeydown = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchCompanyList(e);

        };

        //DOM.firstName.onblur = function () {

        //    checkIsPatientNameExists();
        //};

        //DOM.middleName.onblur = function () {

        //    checkIsPatientNameExists();
        //};

        //DOM.lastName.onblur = function () {

        //    checkIsPatientNameExists();
        //};

    }

    function loadData() {

        getBloodGroups();

        addNewPatient();

        //getBranches();

        //getDepartments();

        //getEmployees();
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

            var firstInput = nextTab.querySelectorAll('input[type="text"]');

            currentActiveTab.classList.remove('active');

            currentTab[0].parentElement.classList.add('active');

            nextTab.classList.add('active');

            firstInput[0].focus();

            //setTimeout(function () {
            //    firstInput.focus();
            //}, 2000);

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

    var getPatientId = function (selectedRows) {

        var patientId = 0;

        patientId = parseInt(selectedRows[0].getAttribute('data-patient-id'));

        if (isNaN(patientId)) { patientId = 0; }

        return patientId;
    };

    function showSearchCompanyList(e) {

        if (e.keyCode === 13) {
            CurrentFocus = -1;
            showCompanyNameOnEnterKey(e);
            return;
        }
        else if (e.keyCode === 9) {
            CurrentFocus = -1;
            shared.closeAutoCompleteList(DOM.searchPatientList);
            return;
        }

        var dataAttributes = ['Employer-Id', 'Employer-Name'];

        var parameters = {};

        parameters = {

            Event: e,
            CurrentFocus: CurrentFocus,
            PostDataKeyValue: postMessage,
            ElementToBeAppend: DOM.searchCompanyList,
            DataAttributes: dataAttributes,
            PostParamObject: undefined,
            URL: SERVICE_PATH + "GetEmployerIdAndNameByName/" + DOM.companyName.value + "/",
            DisplayName: "EmployerName"
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

                            li.setAttribute('id', autoCompleteList[s].EmployerId);

                            li.style.cursor = "pointer";
                            li.onclick = showCompanyNameOnSelection;
                            li.textContent = autoCompleteList[s].EmployerName;

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
        DOM.companyName.setAttribute('data-employer-id', id);

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

                    data += "<tr data-employee-exercise-id=" + exerciseDetails[e].patientExerciseHistoryId + " data-sr-no=" + exerciseDetails[e].SrNo + ">";
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

            var patientExerciseHistoryId = 0;
            var patientId = 0;

            patientExerciseHistoryId = parseInt(DOM.exercise.getAttribute('data-patient-exercise-history-id'));
            patientId = parseInt(DOM.patientCode.getAttribute('data-patient-id'));

            var exerciseDetails = {};

            if (isNaN(patientExerciseHistoryId)) { patientExerciseHistoryId = 0; }

            if (isNaN(patientId)) { patientId = 0; }

            if (isNaN(srNo)) { srNo = 0; }

            if (ExerciseDetails.length) {

                var exercise = ExerciseDetails.filter(function (value, index, array) {
                    return value.SrNo === srNo;
                });

                if (exercise.length === 0) {

                    exerciseDetails = {
                        SrNo: srNo,
                        PatientId: patientId,
                        PatientExerciseHistoryId: patientExerciseHistoryId,
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
                            ExerciseDetails[e].PatientExerciseHistoryId = patientExerciseHistoryId;
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
                    PatientId: patientId,
                    PatientExerciseHistoryId: patientExerciseHistoryId,
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
        DOM.exercise.setAttribute('data-patient-exercise-history-id', 0);
        DOM.exercise.setAttribute('data-sr-no', 0);
        DOM.frequency.value = "";

        DOM.exercise.focus();
    }

    function fillSearchOption() {

        var options = "";

        options += "<option value='-1'> Choose Search Option </option>";
        options += "<option value='FullName' selected='selected'> Patient Name</option>";
        options += "<option value='EmployerName'> Company Name </option>";
        options += "<option value='PatientCode'> Patient Code</option>";

        DOM.searchOptions.innerHTML = options;
    }

    function filterPatient() {

        shared.showPanel(DOM.searchPatientPanel);

        shared.clearInputs(DOM.searchPatientPanel);

        fillSearchOption();

        if (DOM.searchPatientPanel.classList.contains("hide")) {
            DOM.searchPatientPanel.classList.remove('hide');
            DOM.searchPatientPanel.classList.add('show');
        }
        else {
            DOM.searchPatientPanel.classList.remove('show');
            DOM.searchPatientPanel.classList.add('hide');
        }

        DOM.searchValue.focus();
    }

    function searchPatient() {

        shared.showLoader(DOM.loader);

        DOM.patientsList.tBodies[0].innerHTML = "";

        Patients.length = 0;

        var searchParmater = {
            FullName: null,
            EmployerName: null,
            PatientCode: null
        };

        var searchParameterName = DOM.searchOptions.options[DOM.searchOptions.selectedIndex].value;
        var searchValue = DOM.searchValue.value;

        searchParmater[searchParameterName] = searchValue;

        var postData = JSON.stringify(searchParmater);

        shared.sendRequest(SERVICE_PATH + "SearchPatients/", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        Patients = _response;

                        bindPatientDetails();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

        shared.hideLoader(DOM.loader);
    }

    function addNewPatient() {

        shared.showLoader(DOM.loader);

        // Clear the modal control inputs
        shared.clearInputs(DOM.editMode);
        shared.disableControls(DOM.editMode, false);
        shared.clearTables(DOM.editMode);

        DOM.patientCode.setAttribute('data-patient-id', 0);
        DOM.patientPersonalHistoryId.value = 0;
        DOM.exercise.setAttribute('data-patient-exercise-history-id', 0);

        // Show panel;
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        // Set focus
        DOM.companyName.focus();

        shared.hideLoader(DOM.loader);
    }

    function unselectPatientListDetails() {

        var tableBody = DOM.patientsList.tBodies[0];

        var checkBoxes = tableBody.querySelectorAll('.label-checkbox');

        if (checkBoxes.length > 0) {

            for (var c = 0; c < checkBoxes.length; c++) {

                checkBoxes[c].checked = false;
            }
        }
    }

    function checkIsRecordsAreChanged() {

        shared.showLoader(DOM.loader);

        showPaitentList();

        shared.hideLoader(DOM.loader);
    }

    function showPaitentList() {

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        filterPatient();

        DOM.patientsList.tBodies[0].innerHTML = "";
    }

    var getSelectedRows = function (element) {

        var selectedRows = [];

        var tableBody = element.tBodies[0];

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

    function getSelectedPatientDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.patientsList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var patientId = parseInt(currentTableRow.getAttribute('data-patient-id'));

                if (isNaN(patientId)) { patientId = 0; }

                showPatientDetailsByPatientId(patientId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);
    }

    function viewPatient() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedPatientDetails();

        shared.hideLoader(DOM.loader);

        DOM.companyName.focus();
    }

    function editPatient() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        getSelectedPatientDetails();

        shared.hideLoader(DOM.loader);

        // Set Focus
        DOM.firstName.focus();
    }

    function deletePatient() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.patientsList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.patientsList);

            var patientId = getPatientId(selectedRows);

            if (patientId > 0) {

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

                            var patientPersonalHistory = {};

                            var patientExerciseHistories = [];

                            if (Patients.length) {

                                var selectedPatient = Patients.filter(function (value, index, array) {
                                    return value.PatientId === parseInt(patientId);
                                });

                                if (selectedPatient.length) {

                                    if (selectedPatient[0].PatientPersonalHistory.PatientPersonalHistoryId > 0) {

                                        patientPersonalHistory = {
                                            PatientPersonalHistoryId: parseInt(selectedPatient[0].PatientPersonalHistory.PatientPersonalHistoryId),
                                            IsDeleted: true,
                                            DeletedBy: parseInt(LOGGED_USER),
                                            DeletedByIP: IP_ADDRESS
                                        };
                                    }
                                    else {
                                        patientPersonalHistory = null;
                                    }

                                    patientExerciseHistories = selectedPatient[0].PatientExerciseHistories.filter(function (value, index, array) {
                                        return value.PatientId === selectedPatient[0].PatientId;
                                    });

                                    if (patientExerciseHistories.length) {

                                        for (var e = 0; e < patientExerciseHistories.length; e++) {
                                            patientExerciseHistories[e].IsDeleted = true;
                                            patientExerciseHistories[e].DeletedBy = parseInt(LOGGED_USER);
                                            patientExerciseHistories[e].DeletedByIP = IP_ADDRESS;
                                        }
                                    }
                                }
                            }

                            var patient = {};

                            patient = {
                                PatientId: parseInt(patientId),
                                PatientPersonalHistory: patientPersonalHistory,
                                PatientExerciseHistories: patientExerciseHistories,
                                IsDeleted: true,
                                DeletedBy: parseInt(LOGGED_USER),
                                DeletedByIP: IP_ADDRESS
                            };

                            var postData = JSON.stringify(patient);

                            shared.sendRequest(SERVICE_PATH + 'SavePatient', "POST", true, "JSON", postData, function (response) {

                                if (response.status === 200) {

                                    if (parseInt(response.responseText) > 0) {

                                        swal({
                                            title: "Success",
                                            text: "Patient Details Deleted Successfully.",
                                            type: "success"
                                        }, function () {
                                            addNewPatient();
                                        });
                                    }
                                }

                                shared.hideLoader(DOM.loader);

                            });
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

    function getPatients() {

        shared.showLoader(DOM.loader);

        Patients.length = 0;

        DOM.patientsList.tBodies[0].innerHTML = "";

        shared.sendRequest(SERVICE_PATH + "SearchPatients/", "POST", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var data = JSON.parse(response.responseText);

                    if (data !== undefined) {

                        Patients = data;

                        bindPatientDetails();
                    }

                    shared.hideLoader(DOM.loader);
                }
            }

        });
    }

    function bindPatientDetails() {

        var tableBody = DOM.patientsList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the array has values
        if (Patients.length) {

            var data = "";

            for (var r = 0; r < Patients.length; r++) {

                data = data + "<tr data-patient-id=" + Patients[r].PatientId + " >";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + Patients[r].PatientId + "' class='label-checkbox' name='SelectPatient' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + Patients[r].EmployerName + "</td>";
                data = data + "<td>" + Patients[r].PatientCode + "</td>";
                data = data + "<td>" + Patients[r].FullName + "</td>";
                data = data + "<td>" + Patients[r].Gender + "</td>";
                data = data + "<td>" + Patients[r].ContactNos + "</td>";
                data = data + "<td>" + Patients[r].EmailId + "</td>";
                data = data + "</tr>";

            }

            tableBody.innerHTML = data;

            // Show panels
            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }
    }

    function showPatientDetailsByPatientId(patientId) {

        shared.showLoader(DOM.loader);

        if (Patients.length) {

            var selectedPatient = Patients.filter(function (value, index, array) {
                return value.PatientId === patientId;
            });

            if (selectedPatient.length > 0) {

                DOM.companyName.value = selectedPatient[0].EmployerName;
                DOM.companyName.setAttribute('data-employer-id', selectedPatient[0].EmployerId);
                DOM.patientCode.value = selectedPatient[0].PatientCode;
                DOM.patientCode.setAttribute('data-patient-id', selectedPatient[0].PatientId);
                shared.setSelectValue(DOM.title, selectedPatient[0].Title, null);
                shared.setSelect2ControlsText(DOM.title);
                DOM.firstName.value = selectedPatient[0].FirstName;
                DOM.middleName.value = selectedPatient[0].MiddleName;
                DOM.lastName.value = selectedPatient[0].LastName;
                DOM.address.value = selectedPatient[0].Address;
                DOM.dateOfBirth.value = selectedPatient[0].DateOfBirth;
                shared.setRadioButtonValue(DOM.gender, selectedPatient[0].Gender, null);
                DOM.contactNo1.value = selectedPatient[0].ContactNo1;
                DOM.contactNo2.value = selectedPatient[0].ContactNo2;
                DOM.mobileNo1.value = selectedPatient[0].MobileNo1;
                DOM.mobileNo2.value = selectedPatient[0].MobileNo2;
                DOM.emailId.value = selectedPatient[0].EmailId;
                DOM.panNo.value = selectedPatient[0].PANNo;
                DOM.department.value = selectedPatient[0].Department;
                DOM.designation.value = selectedPatient[0].Designation;

                showPatientPersonalHistory(selectedPatient[0]);

                var exerciseDetails = selectedPatient[0].PatientExerciseHistories.filter(function (value, index, array) {
                    return value.PatientId === selectedPatient[0].PatientId;
                });

                ExerciseDetails = exerciseDetails;

                bindExerciseDetails();
            }

            shared.showPanel(DOM.editMode);
            shared.hidePanel(DOM.viewMode);
        }

        shared.hideLoader(DOM.loader);
    }

    function showPatientPersonalHistory(patient) {

        var patientPersonalHistory = patient.PatientPersonalHistory;

        if (patientPersonalHistory !== null) {

            DOM.patientPersonalHistoryId.value = patientPersonalHistory.PatientPersonalHistoryId;
            DOM.height.value = patientPersonalHistory.PatientHeight;
            DOM.weight.value = patientPersonalHistory.PatientWeight;
            if (patientPersonalHistory.MaritalStatus.toLowerCase() === "married") {
                DOM.married.checked = true;
                DOM.unMarried.checked = false;
            }
            else {
                DOM.married.checked = false;
                DOM.unMarried.checked = true;
            }
            DOM.noOfSons.value = patientPersonalHistory.NoOfSons;
            DOM.noOfDaughters.value = patientPersonalHistory.NoOfDaughters;
            DOM.smoking.value = patientPersonalHistory.Smoking;
            DOM.alcohol.value = patientPersonalHistory.Alcohol;
            DOM.tobacco.value = patientPersonalHistory.Tobacco;
            shared.setSelectValue(DOM.bloodGroup, null, parseInt(patientPersonalHistory.BloodGroupId));
            shared.setSelect2ControlsText(DOM.bloodGroup);
            DOM.diet.value = patientPersonalHistory.Diet;
            DOM.allergicTo.value = patientPersonalHistory.AllergicTo;
            DOM.otherAddictions.value = patientPersonalHistory.OtherAddictions;
            DOM.presentIllness.value = patientPersonalHistory.PresentIllness;
            DOM.treatment.value = patientPersonalHistory.Treatment;
            DOM.micturation.value = patientPersonalHistory.Micturation;
            DOM.bowels.value = patientPersonalHistory.Bowels;
            DOM.sleep.value = patientPersonalHistory.Sleep;
            DOM.mc.value = patientPersonalHistory.MC;
            DOM.pastHistory.value = patientPersonalHistory.PastHistory;
            DOM.familyHistory.value = patientPersonalHistory.FamilyHistory;
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);
    }

    var validateData = function () {

        var isValid = true;

        if (DOM.title.selectedIndex === 0) {
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

    var savePatientPersonalHistory = function () {

        var patientPersonalHistory = {};

        var patientPersonalHistoryId = 0;
        var patientId = 0;
        var height = 0;
        var weight = 0;
        var maritalStatus = null;
        var noOfSons = 0;
        var noOfDaughters = 0;
        var smoking = null;
        var alcohol = null;
        var tobacco = null;
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

        patientPersonalHistoryId = parseInt(DOM.patientPersonalHistoryId.value);
        patientId = parseInt(DOM.patientCode.getAttribute('data-patient-id'));

        if (isNaN(patientPersonalHistoryId)) { patientPersonalHistoryId = 0; }

        if (isNaN(patientId)) { patientId = 0; }

        height = DOM.height.value;
        weight = DOM.weight.value;
        maritalStatus = shared.getRadioSelectedValue(DOM.maritalStatus);
        noOfSons = parseInt(DOM.noOfSons.value);
        noOfDaughters = parseInt(DOM.noOfDaughters.value);
        smoking = DOM.smoking.value;
        alcohol = DOM.alcohol.value;
        tobacco = DOM.tobacco.value;
        bloodGroupId = DOM.bloodGroup.options[DOM.bloodGroup.selectedIndex].value;
        bloodGroupFactorId = DOM.bloodGroup.options[DOM.bloodGroup.selectedIndex].getAttribute('data-bloodgroupfactorid');
        diet = DOM.diet.value;
        allergicTo = DOM.allergicTo.value;
        otherAddictions = DOM.otherAddictions.value;
        exercise = DOM.exercise.value;
        frequency = DOM.frequency.value;
        presentIllness = DOM.presentIllness.value;
        treatment = DOM.treatment.value;
        micturation = DOM.micturation.value;
        bowels = DOM.bowels.value;
        sleep = DOM.sleep.value;
        mc = DOM.mc.value;
        pastHistory = DOM.pastHistory.value;
        familyHistory = DOM.familyHistory.value;

        patientPersonalHistory = {
            PatientPersonalHistoryId: patientPersonalHistoryId,
            PatientId: patientId,
            PatientHeight: height,
            HeightUnit: 'Cms',
            PatientWeight: weight,
            WeightUnit: 'Kgs',
            MaritalStatus: maritalStatus,
            NoOfSons: noOfSons,
            NoOfDaughters: noOfDaughters,
            Smoking: smoking,
            Alcohol: alcohol,
            Tobacco: tobacco,
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
            FamilyHistory: familyHistory,
            IsDeleted: false
        };

        if (parseInt(patientPersonalHistoryId) === parseInt(0)) {

            patientPersonalHistory.CreatedBy = parseInt(LOGGED_USER);
            patientPersonalHistory.CreatedByIP = IP_ADDRESS;
        }
        else {

            patientPersonalHistory.ModifiedBy = parseInt(LOGGED_USER);
            patientPersonalHistory.ModifiedByIP = IP_ADDRESS;
        }

        return patientPersonalHistory;

    };

    function checkIsPatientNameExists() {

        var employerId = parseInt(DOM.companyName.getAttribute('data-employer-id'));

        var patientName = "";
        var firstName = undefined;
        var middleName = undefined;
        var lastName = undefined;
        var patientId = 0;

        firstName = DOM.firstName.value;
        middleName = DOM.middleName.value;
        lastName = DOM.lastName.value;
        patinetId = parseInt(DOM.patientCode.getAttribute('data-patient-id'));

        if (isNaN(patientId)) { patientId = 0;}

        if (isNaN(patientId)) { patientId = 0; }

        if (patientId > 0) { return; }

        if (firstName !== "" || middleName !== "" || lastName !== "") {
            patientName = firstName + ' ' + middleName + ' ' + lastName;
        }

        patientName = patientName.trim();

        if (isNaN(employerId)) { employerId = 0; }

        if (employerId === 0) { return; }

        shared.sendRequest(SERVICE_PATH + "IsPatientNameExists/" + employerId + '/' + patientName, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText) {

                    DOM.firstName.focus();

                    swal("Error", "This Patient Name is already exists.", "error");

                }

                //callback(isEmployeeNameExists);
            }
        });
    }

    function savePatient() {

        if (validateData()) {

            /* temp variable */
            var patientId = 0;
            var patientCode = null;
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
            var employerId = 0;
            var department = null;
            var designation = null;

            var methodName = "AddPatient";

            patientId = parseInt(DOM.patientCode.getAttribute('data-patient-id'));
            patientCode = DOM.patientCode.value;
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
            employerId = DOM.companyName.getAttribute('data-employer-id');
            department = DOM.department.value;
            designation = DOM.designation.value;

            if (isNaN(patientId)) { patientId = 0; }
            if (isNaN(employerId)) { employerId = 0; }


            var patient = {};

            var patientPersonalHistory = savePatientPersonalHistory(patientId);

            var patientExerciseHistories = ExerciseDetails;

            patient = {
                PatientId: patientId,
                PatientCode: patientCode,
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
                EmployerId: employerId,
                PatientPersonalHistory: patientPersonalHistory,
                PatientExerciseHistories: patientExerciseHistories
            };

            if (parseInt(patientId) === parseInt(0)) {

                patient.CreatedBy = parseInt(LOGGED_USER);
                patient.CreatedByIP = IP_ADDRESS;
            }
            else {

                patient.ModifiedBy = parseInt(LOGGED_USER);
                patient.ModifiedByIP = IP_ADDRESS;
            }

            var postData = JSON.stringify(patient);

            shared.sendRequest(SERVICE_PATH + "SavePatient", "POST", true, "JSON", postData, function (response) {
                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Patient Details Saved Successfully.",
                            type: "success"
                        }, function () {
                            addNewPatient();
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


Sofarch.Patient.init();
