
var Sofarch = {};

Sofarch.PreEmployment = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();
    var CurrentFocus = -1;

    var EmployeeDetails = {};
    var PreEmploymentDetails = [];
    var PreEmploymentTestDetails = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.preEmploymentDetailsList = document.getElementById('PreEmploymentDetailsList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.employeeDetails = document.getElementById('EmployeeDetails');
        DOM.employeeCode = document.getElementById('EmployeeCode');
        DOM.employeeName = document.getElementById('EmployeeName');
        DOM.age = document.getElementById('Age');
        DOM.gender = document.getElementsByName('Gender');
        DOM.maritalStatus = document.getElementsByName('MaritalStatus');
        DOM.noOfSons = document.getElementById('NoOfSons');
        DOM.noOfDaughters = document.getElementById('NoOfDaughters');
        DOM.companyCode = document.getElementById('CompanyCode');
        DOM.companyName = document.getElementById('CompanyName');
        DOM.designation = document.getElementById('Designation');
        DOM.personalHistoryOfMajorIllness = document.getElementById('PersonalHistoryOfMajorIllness');
        DOM.drugAllergy= document.getElementById('DrugAllergy');
        DOM.micturation= document.getElementById('Micturation');
        DOM.bowels = document.getElementById('Bowels');
        DOM.sleep = document.getElementById('Sleep');
        DOM.alcohol = document.getElementById('Alcohol');
        DOM.smoking = document.getElementById('Smoking');
        DOM.mc = document.getElementById('MC');
        DOM.familyHistoryOfMajorIllness = document.getElementById('FamilyHistoryOfMajorIllness');
        DOM.height = document.getElementById('Height');
        DOM.weight = document.getElementById('Weight');
        DOM.generalTestDetails = document.getElementById('GeneralTestDetails');
        DOM.investigationTestDetails = document.getElementById('InvestigationTestDetails');
        DOM.generalTestList = document.getElementById('GeneralTestList');
        DOM.investigationTestList = document.getElementById('InvestigationTestList');

        DOM.addNewPreEmploymentDetails = document.getElementById('AddNewPreEmploymentDetails');
        DOM.showPreEmploymentDetails = document.getElementById('ShowPreEmploymentDetails');
        DOM.viewPreEmploymentDetails = document.getElementById('ViewPreEmploymentDetails');
        DOM.editPreEmploymentDetails = document.getElementById('EditPreEmploymentDetails');
        DOM.savePreEmploymentDetails = document.getElementById('SavePreEmploymentDetails');
        DOM.deletePreEmploymentDetails = document.getElementById('DeletePreEmploymentDetails');
        DOM.printPreEmploymentDetails = document.getElementById('PrintPreEmploymentDetails');
        DOM.filterEmployee = document.getElementById('FilterEmployee');
        DOM.exportEmployeeList = document.getElementById('ExportEmployeeList');

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

        DOM.addNewPreEmploymentDetails.addEventListener('click', addNewPreEmploymentDetails);
        DOM.showPreEmploymentDetails.addEventListener('click', getPreEmploymentDetails);
        DOM.viewPreEmploymentDetails.addEventListener('click', viewPreEmploymentDetails);
        DOM.editPreEmploymentDetails.addEventListener('click', editPreEmploymentDetails);
        DOM.savePreEmploymentDetails.addEventListener('click', savePreEmploymentDetails);
        DOM.deletePreEmploymentDetails.addEventListener('click', deletePreEmploymentDetails);

        DOM.employeeCode.onblur = function () {
            getEmployeeAndTestDetails();
        };

    }

    function loadData() {

        addNewPreEmploymentDetails();

    }

    var getSelectedRows = function () {

        var selectedRows = [];

        var tableBody = DOM.preEmploymentDetailsList.tBodies[0];

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

    var getPreEmploymentId = function (selectedRows) {

        var preEmploymentId = 0;

        preEmploymentId = parseInt(selectedRows[0].getAttribute('data-pre-employment-id'));

        if (isNaN(preEmploymentId)) { preEmploymentId = 0; }

        return preEmploymentId;
    };

    function getEmployeeAndTestDetails() {

        var employeeCode = "";

        employeeCode = DOM.employeeCode.value;

        employeeId = parseInt(DOM.employeeCode.getAttribute('data-employee-id'));
        
        if (isNaN(employeeId)) { employeeId = 0; }

        if (employeeCode !== "") {

            shared.sendRequest(SERVICE_PATH + "GetEmployeeDetails/7", "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText) {

                        var data = JSON.parse(response.responseText);

                        if (data !== undefined) {

                            EmployeeDetails = data;

                            showEmployeeDetails();
                        }
                    }
                }
            });
        }
    }

    function addNewPreEmploymentDetails() {

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

    function viewPreEmploymentDetails() {

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

                var preEmploymentId = getPreEmploymentId(selectedRows);

                showPreEmploymentDetails(preEmploymentId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

        DOM.employeeName.focus();
    }

    function editPreEmploymentDetails() {

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

                showPreEmploymentDetails(employeeId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

        // Set Focus
        DOM.employeeName.focus();
    }

    function deletePreEmploymentDetails() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.employeesList.tBodies[0];

            var selectedRows = getSelectedRows();

            var preEmploymentId = getPreEmploymentId(selectedRows);

            if (preEmploymentId > 0) {

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

                            var employeePersonalHistory = {};

                            var employeeExerciseHistories = [];

                            if (PreEmploymentDetails.length) {

                                var selectedEmployee = PreEmploymentDetails.filter(function (value, index, array) {
                                    return value.PreEmploymentId === parseInt(preEmploymentId);
                                });

                                if (selectedEmployee.length) {

                                    if (selectedEmployee[0].PreEmploymentTestDetails.PreEmploymentTestId > 0) {

                                        preEmploymentTestDetails = {
                                            PreEmploymentId: preEmploymentId,
                                            IsDeleted: true,
                                            DeletedBy: parseInt(LOGGED_USER),
                                            DeletedByIP: IP_ADDRESS
                                        };
                                    }
                                    else {
                                        employeePersonalHistory = null;
                                    }
                                }
                            }

                            var preEmployment = {};

                            preEmployment = {
                                PreEmploymentId: preEmploymentId,
                                EmployeeId: parseInt(employeeId),
                                PreEmploymentTestDetails: preEmploymentTestDetails,
                                IsDeleted: true,
                                DeletedBy: parseInt(LOGGED_USER),
                                DeletedByIP: IP_ADDRESS
                            };

                            var postData = JSON.stringify(employee);

                            shared.sendRequest(SERVICE_PATH + 'SavePreEmploymentDetails', "POST", true, "JSON", postData, function (response) {

                                if (response.status === 200) {

                                    if (parseInt(response.responseText) > 0) {

                                        swal({
                                            title: "Success",
                                            text: "Pre Employment deleted successfully.",
                                            type: "success"
                                        }, function () {
                                            getPreEmploymentDetails();
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

    function getPreEmploymentDetails() {

        shared.showLoader(DOM.loader);

        PreEmploymentDetails.length = 0;

        DOM.preEmploymentDetailsList.tBodies[0].innerHTML = "";

        shared.sendRequest(SERVICE_PATH + "GetAllPreEmploymentDetails/", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var data = JSON.parse(response.responseText);

                    if (data !== undefined) {

                        PreEmploymentDetails = data;

                        bindPreEmploymentDetails();
                    }

                    shared.hideLoader(DOM.loader);
                }
            }

        });
    }

    function bindPreEmploymentDetails() {

        var tableBody = DOM.preEmploymentDetailsList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the pre employment has values
        if (PreEmploymentDetails.length) {

            var data = "";

            for (var r = 0; r < PreEmploymentDetails.length; r++) {

                data = data + "<tr data-pre-employment-id=" + PreEmploymentDetails[r].PreEmploymentId + " data-employee-id=" + PreEmploymentDetails[r].EmployeeId + " >";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + PreEmploymentDetails[r].EmployeeId + "' class='label-checkbox' name='SelectEmployee' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + PreEmploymentDetails[r].CompanyName + "</td>";
                data = data + "<td>" + PreEmploymentDetails[r].EmployeeCode + "</td>";
                data = data + "<td>" + PreEmploymentDetails[r].EmployeeName + "</td>";
                data = data + "<td>" + PreEmploymentDetails[r].Gender + "</td>";
                data = data + "</tr>";

            }

            tableBody.innerHTML = data;

            // Show panels
            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }
    }

    function showPreEmploymentDetails(preEmploymentId) {

        if (PreEmploymentDetails.length) {

            var preEmploymentDetails = PreEmploymentDetails.filter(function (value, index, array) {
                return value.PreEmploymentId === preEmploymentId;
            });

            if (preEmploymentDetails.length) {

                var preEmploymentTestDetails = PreEmploymentDetails[0].PreEmploymentTestDetails.filter(function (value, index, array) {
                    return value.PreEmploymentId === preEmploymentId;
                });

                EmployeeDetails = preEmploymentDetails;
                EmployeeDetails.PreEmploymentTestDetails = preEmploymentTestDetails;

                showEmployeeDetails();
            }
        }
    }

    function showEmployeeDetails() {

        shared.showLoader(DOM.loader);

        if (EmployeeDetails !== null) {

            DOM.employeeCode.value = EmployeeDetails.EmployeeCode;
            DOM.employeeCode.setAttribute('data-employee-id', EmployeeDetails.EmployeeId);
            DOM.employeeCode.setAttribute('data-pre-employment-id', EmployeeDetails.PreEmploymentId);
            DOM.employeeName.value = EmployeeDetails.EmployeeFullName;
            DOM.age.value = EmployeeDetails.Age;
            DOM.gender.value = EmployeeDetails.Gender;
            DOM.maritalStatus.value = EmployeeDetails.MaritalStatus;
            DOM.noOfSons.value = EmployeeDetails.NoOfSons;
            DOM.noOfDaughters.value = EmployeeDetails.NoOfDaughters;
            DOM.companyCode.value = EmployeeDetails.CompanyCode;
            DOM.companyName.value = EmployeeDetails.CompanyName;
            DOM.designation.value = EmployeeDetails.Designation;
            DOM.personalHistoryOfMajorIllness.value = EmployeeDetails.PersonalHistoryOfMajorIllness;
            DOM.drugAllergy.value = EmployeeDetails.AllergicTo;
            DOM.micturation.value = EmployeeDetails.Micturation;
            DOM.bowels.value = EmployeeDetails.Bowels;
            DOM.sleep.value = EmployeeDetails.Sleep;
            DOM.alcohol.value = EmployeeDetails.Alcohol;
            DOM.smoking.value = EmployeeDetails.Smoking;
            DOM.mc.value = EmployeeDetails.MC;
            DOM.familyHistoryOfMajorIllness.value = EmployeeDetails.FamilyHistory;

            PreEmploymentTestDetails = EmployeeDetails.PreEmploymentTestDetails;

            bindTestDetails(true);

            bindTestDetails(false);
        }

        shared.hideLoader(DOM.loader);

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);
    }

    function bindTestDetails(isTestGeneral) {

        var table = null;

        var tableBody = null;

        if (isTestGeneral) {
            table = DOM.generalTestList;
        }
        else {
            table = DOM.investigationTestList;
        }

        tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        var data = "";

        if (PreEmploymentTestDetails.length) {

            var testDetails = PreEmploymentTestDetails.filter(function (value, index, array) {
                return value.IsTestGeneral === isTestGeneral && (value.IsDeleted === false || value.IsDeleted === null);
            });

            if (testDetails.length) {

                for (var e = 0; e < testDetails.length; e++) {

                    data += "<tr data-pre-employment-test-id=" + testDetails[e].PreEmploymentTestId + " data-pre-employment-id=" + testDetails[e].PreEmploymentId + " data-medical-test-id=" + testDetails[e].MedicalTestId + " data-medical-test-parameter-id=" + testDetails[e].MedicalTestParameterId + ">";
                    data += "<td>" + testDetails[e].TestName + "</td>";
                    data += "<td> <input type='text' id='TestValue' class='form-control input-md' value='" + testDetails[e].TestValue + "' </td>";
                    data += "</tr>";
                }

                tableBody.innerHTML = data;
            }
        }
    }

    var validateData = function () {

        var isValid = true;

        //if (DOM.employeeCode.value === "") {
        //    isValid = false;
        //    swal("Error!!!", "Please enter the Employee Code.", "error");
        //}
        //else if (DOM.title.selectedIndex === 0) {
        //    isValid = false;
        //    swal("Error!!!", "Please select the Title.", "error");
        //}
        //else if (DOM.firstName.value === "") {
        //    isValid = false;
        //    swal("Error!!!", "Please enter the First Name.", "error");
        //}
        //else if (DOM.middleName.value === "") {
        //    isValid = false;
        //    swal("Error!!!", "Please enter the Middle Name.", "error");
        //}
        //else if (DOM.lastName.value === "") {
        //    isValid = false;
        //    swal("Error!!!", "Please enter the Last Name.", "error");
        //}
        //else if (DOM.dateOfBirth.value === "") {
        //    isValid = false;
        //    swal("Error!!!", "Please enter the Date of Birth.", "error");
        //}
        //else if (shared.getRadioSelectedValue(DOM.gender) === false) {
        //    isValid = false;
        //    swal("Error!!!", "Please select the Gender.", "error");
        //}
        //else if (DOM.address.value === "") {
        //    isValid = false;
        //    swal("Error!!!", "Please enter the Address.", "error");
        //}

        return isValid;
    };

    var savePreEmploymentTestDetails = function (isTestGeneral) {

        var table = null;

        var tableBody = null;

        var tableRows;

        if (isTestGeneral) {
            table = DOM.generalTestList;
        }
        else {
            table = DOM.investigationTestList;
        }

        tableBody = table.tBodies[0];

        tableRows = tableBody.children;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                preEmploymentTestDetails = {
                    PreEmploymentTestId: parseInt(tableRows[tr].getAttribute('data-pre-employment-test-id')),
                    PreEmploymentId: parseInt(tableRows[tr].getAttribute('data-pre-employment-id')),
                    MedicalTestId: parseInt(tableRows[tr].getAttribute('data-medical-test-id')),
                    MedicalTestParameterId: parseInt(tableRows[tr].getAttribute('data-medical-test-parameter-id')),
                    TestValue: tableRows[tr].children[1].children[0].value,
                    IsDeleted: false
                };

                if (parseInt(tableRows[tr].getAttribute('data-pre-employment-test-id')) === parseInt(0)) {

                    preEmploymentTestDetails.CreatedBy = parseInt(LOGGED_USER);
                    preEmploymentTestDetails.CreatedByIP = IP_ADDRESS;
                }
                else {

                    preEmploymentTestDetails.ModifiedBy = parseInt(LOGGED_USER);
                    preEmploymentTestDetails.ModifiedByIP = IP_ADDRESS;
                }

                PreEmploymentTestDetails.push(preEmploymentTestDetails);
            }
        }
        
        return PreEmploymentTestDetails;
    };

    function checkIsEmployeeNameExists() {

        var companyId = parseInt(DOM.companyName.getAttribute('data-company-id'));

        var employeeName = "";
        var firstName = undefined;
        var middleName = undefined;
        var lastName = undefined;
        var employeeId = 0;

        firstName = DOM.firstName.value;
        middleName = DOM.middleName.value;
        lastName = DOM.lastName.value;
        employeeId = parseInt(DOM.employeeCode.getAttribute('data-employee-id'));

        if (isNaN(employeeId)) { employeeId = 0;}
            
        if (isNaN(companyId)) { companyId = 0; }

        if (employeeId > 0) { return; }

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
        employeeId = parseInt(DOM.employeeCode.getAttribute('data-employee-id'));

        if (isNaN(employeeId)) { employeeId = 0;}
            
        if (isNaN(companyId)) { companyId = 0; }

        if (employeeId > 0) { return; }

        if (employeeCode !== "" && companyName !== "") {

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
    }

    function savePreEmploymentDetails() {

        if (validateData()) {

            /* temp variable */
            var preEmploymentId = 0;
            var employeeId = 0;
            
            preEmploymentId = parseInt(DOM.employeeCode.getAttribute('data-pre-employment-id'));
            employeeId = parseInt(DOM.employeeCode.getAttribute('data-employee-id'));
            
            if (isNaN(preEmploymentId)) { preEmploymentId = 0; }
            if (isNaN(employeeId)) { employeeId = 0; }

            var preEmploymentDetails = {};

            PreEmploymentTestDetails.length = 0;

            savePreEmploymentTestDetails(true);

            savePreEmploymentTestDetails(false);

            preEmploymentDetails = {
                PreEmploymentId: preEmploymentId,
                EmployeeId: employeeId,
                DocNo: "",
                PreEmploymentTestDetails: PreEmploymentTestDetails
            };

            if (parseInt(preEmploymentId) === parseInt(0)) {

                preEmploymentDetails.CreatedBy = parseInt(LOGGED_USER);
                preEmploymentDetails.CreatedByIP = IP_ADDRESS;
            }
            else {

                preEmploymentDetails.ModifiedBy = parseInt(LOGGED_USER);
                preEmploymentDetails.ModifiedByIP = IP_ADDRESS;
            }

            var postData = JSON.stringify(preEmploymentDetails);

            shared.sendRequest(SERVICE_PATH + "SavePreEmploymentDetails", "POST", true, "JSON", postData, function (response) {
                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Employee Details saved successfully.",
                            type: "success"
                        }, function () {
                            getPreEmploymentDetails();
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


Sofarch.PreEmployment.init();
