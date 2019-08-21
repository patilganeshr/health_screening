
var Sofarch = {};

Sofarch.PreEmployment = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();
    var CurrentFocus = -1;

    var PreEmploymentDetails = [];
    var PreEmploymentTestDetails = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.searchPreEmploymentDetailsPanel = document.getElementById('SearchPreEmploymentDetailsPanel');
        DOM.searchCriteriaList = document.getElementById('SearchCriteriaList');
        DOM.searchFieldsList = document.getElementById('SearchFieldsList');
        DOM.searchPreEmploymentDetails = document.getElementById('SearchPreEmploymentDetails');

        DOM.preEmploymentDetailsList = document.getElementById('PreEmploymentDetailsList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.patientDetailsPanel = document.getElementById('PatientDetailsPanel');
        DOM.patientCode = document.getElementById('PatientCode');
        DOM.patientName = document.getElementById('PatientName');
        DOM.searchPatientList = document.getElementById('SearchPatientList');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.consultDate = document.getElementById('ConsultDate');
        DOM.preEmploymentCodeNo = document.getElementById('PreEmploymentCodeNo');
        DOM.age = document.getElementById('Age');
        DOM.gender = document.getElementById('Gender');
        DOM.maritalStatus = document.getElementById('MaritalStatus');
        DOM.noOfSons = document.getElementById('NoOfSons');
        DOM.noOfDaughters = document.getElementById('NoOfDaughters');
        DOM.employerCode = document.getElementById('EmployerCode');
        DOM.employerName = document.getElementById('EmployerName');
        DOM.designation = document.getElementById('Designation');
        DOM.identificationMark = document.getElementById('IdentificationMark');
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

        DOM.searchPatientName = document.getElementById('SearchPatientName');
        DOM.searchPatientModal = document.getElementById('SearchPatientModal');
        DOM.firstName = document.getElementById('FirstName');
        DOM.lastName = document.getElementById('LastName');
        DOM.searchPatient = document.getElementById('SearchPatient');
        DOM.patientSearchList = document.getElementById('PatientSearchList');
        DOM.selectPatient = document.getElementById('SelectPatient');
        DOM.closeSearchPatientModal = document.getElementById('CloseSearchPatientModal');

        DOM.addNewPreEmploymentDetails = document.getElementById('AddNewPreEmploymentDetails');
        DOM.showPreEmploymentDetails = document.getElementById('ShowPreEmploymentDetails');
        DOM.viewPreEmploymentDetails = document.getElementById('ViewPreEmploymentDetails');
        DOM.editPreEmploymentDetails = document.getElementById('EditPreEmploymentDetails');
        DOM.savePreEmploymentDetails = document.getElementById('SavePreEmploymentDetails');
        DOM.deletePreEmploymentDetails = document.getElementById('DeletePreEmploymentDetails');
        DOM.printPreEmploymentDetails = document.getElementById('PrintPreEmploymentDetails');
        DOM.filterPreEmploymentDetails = document.getElementById('FilterPreEmploymentDetails');
        DOM.exportEmployeeList = document.getElementById('ExportEmployeeList');

        /*cache the jquery element */
        DOM.$consultDateDatePicker = $('#ConsultDateDatePicker');
        DOM.$searchPatientModal = $('#SearchPatientModal');
        DOM.$closeSearchPatientModal = $('#CloseSearchPatientModal');

    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        DOM.$consultDateDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

    }

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    function setFocusOnElement(element) {
        setTimeout(function () {
            element.focus();
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
        DOM.showPreEmploymentDetails.addEventListener('click', showPreEmploymentList);
        DOM.viewPreEmploymentDetails.addEventListener('click', viewPreEmploymentDetails);
        DOM.editPreEmploymentDetails.addEventListener('click', editPreEmploymentDetails);
        DOM.savePreEmploymentDetails.addEventListener('click', savePreEmploymentDetails);
        DOM.deletePreEmploymentDetails.addEventListener('click', deletePreEmploymentDetails);
        DOM.printPreEmploymentDetails.addEventListener('click', printPreEmploymentDetails);
        DOM.searchPreEmploymentDetails.addEventListener('click', searchPreEmploymentDetails);
        DOM.filterPreEmploymentDetails.addEventListener('click', filterPreEmploymentDetails);

        DOM.searchPatientName.addEventListener('click', showSearchPatientModal);
        DOM.searchPatient.addEventListener('click', getPatientList);
        DOM.selectPatient.addEventListener('click', selectPatient);
        DOM.closeSearchPatientModal.addEventListener('click', closeSearchPatientModal);

        DOM.familyHistoryOfMajorIllness.onblur = function (e) {
            setActiveTabAndFocus(e);
        };

        DOM.patientName.onkeydown = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            if (e.target.value.length > 5) {
                showSearchPatientList(e);
            }
            else if (e.target.value === "") {
                DOM.patientName.setAttribute('data-patient-id', 0);
                DOM.patientCode.value = "";
                DOM.employerName.value = "";
            }

        };

    }

    function loadData() {

        getFinancialYear();

        addNewPreEmploymentDetails();

    }

    function setDefaultActiveTabAndFocus() {

        //Get the current active tab list
        var tabs = document.querySelectorAll('.nav-tabs li');

        if (tabs.length) {

            for (var t = 0; t < tabs.length; t++) {

                tabs[t].classList.remove('active');
            }
        }

        var tabPanes = document.querySelectorAll('.tab-pane');

        for (var tp = 0; tp < tabPanes.length; tp++) {

            tabPanes[tp].classList.remove('in');
            tabPanes[tp].classList.remove('active');
        }

        tabs[0].classList.add('active');

        tabPanes[0].classList.add('in');
        tabPanes[0].classList.add('active');

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

            tabPanes[tp].classList.remove('in');
            tabPanes[tp].classList.remove('active');
        }

        var currentActiveTab = getCurrentActiveTab(e);

        var nextTab = currentActiveTab.nextElementSibling;

        var linkName;

        if (nextTab !== null) {

            linkName = nextTab.id;

            var currentTab = document.querySelectorAll('.nav-tabs li a[href="#' + linkName + '"]');

            var firstInput = nextTab.querySelectorAll('input[type="text"]');

            currentActiveTab.classList.remove('in');
            currentActiveTab.classList.remove('active');

            currentTab[0].parentElement.classList.add('active');

            nextTab.classList.add('in');
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

    function getFinancialYear() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(1));
                    shared.setSelect2ControlsText(DOM.financialYear);

                    //DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                }
            }
        });

        //shared.hideLoader(DOM.loader);
    }

    function getPatientList() {

        shared.showLoader(DOM.loader);

        shared.sendRequest(SERVICE_PATH + "GetPatientIdAndNameByPatientName/" + DOM.firstName.value + " " + DOM.lastName.value, "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var searchPatientList = JSON.parse(response.responseText);

                    bindSearchPatientList(searchPatientList);
                }
            }
        });

        shared.hideLoader(DOM.loader);

    }

    function showSearchPatientModal() {

        DOM.firstName.value = "";

        DOM.lastName.value = "";

        var table = DOM.patientSearchList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        DOM.$searchPatientModal.modal('show');
    }

    $('#SearchPatientModal').on('shown.bs.modal', function () {

        DOM.firstName.focus();

    });

    $('#CloseSearchPatientModal').on('click', function () {

        DOM.$searchPatientModal.modal('hide');

    });

    function bindSearchPatientList(searchPatientList) {

        shared.showLoader(DOM.loader);

        var table = DOM.patientSearchList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        if (searchPatientList.length) {

            var data = "";

            for (var s = 0; s < searchPatientList.length; s++) {

                data = data + "<tr data-patient-id=" + searchPatientList[s].PatientId + ">";
                data = data + "<td> <label class='label-tick'> <input type='checkbox' id='" + searchPatientList[s].PatientId + "' class='label-checkbox' name='SelectPatient' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + searchPatientList[s].PatientCode + "</td>";
                data = data + "<td>" + searchPatientList[s].FullName + "</td>";
                data = data + "<td>" + searchPatientList[s].EmployerName + "</td>";
                data = data + "</tr>";
            }

            tableBody.innerHTML = data;

        }

        shared.hideLoader(DOM.loader);
    }

    function selectPatient() {

        var selectedRows = getSelectedRows(DOM.patientSearchList);

        if (selectedRows.length > 1) {

            DOM.$searchPatientModal.modal('show');

            swal('Warning', "Please select only one record to select the Records.", "warning");

            return false;
        }
        else {

            var patientId = 0;
            var patientCode = null;
            var patientName = null;
            var employerName = null;

            patientId = parseInt(selectedRows[0].getAttribute('data-patient-id'));
            patientCode = selectedRows[0].children[1].textContent;
            patientName = selectedRows[0].children[2].textContent;
            employerName = selectedRows[0].children[3].textContent;

            DOM.patientCode.value = patientCode;
            DOM.patientName.value = patientName;
            DOM.patientName.setAttribute('data-patient-id', patientId);
            DOM.employerName.value = employerName;

            DOM.patientName.focus();

            DOM.$searchPatientModal.modal('hide');
        }
    }

    function closeSearchPatientModal() {

        DOM.$searchPatientModal.modal('hide');
    }

    function showSearchPatientList(e) {

        if (e.keyCode === 13) {
            CurrentFocus = -1;
            showPatientNameOnEnterKey(e);
            return;
        }
        else if (e.keyCode === 9) {
            CurrentFocus = -1;
            shared.closeAutoCompleteList(DOM.searchPatientList);
            return;
        }
        else if (e.keyCode === 32 || e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 65 && e.keyCode <= 90 ||
            e.keyCode >= 97 && e.keyCode <= 105) {


            var dataAttributes = ['Patient-Id', 'Patient-Code'];

            var parameters = {};

            var searchKey = e.target.value + e.key;

            parameters = {

                Event: e,
                CurrentFocus: CurrentFocus,
                PostDataKeyValue: postMessage,
                ElementToBeAppend: DOM.searchPatientList,
                DataAttributes: dataAttributes,
                PostParamObject: undefined,
                URL: SERVICE_PATH + "GetPatientIdAndNameByPatientName/" + searchKey,
                DisplayName: "FullName"
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

                            ul.classList.add('list-group');

                            for (var s = 0; s < listCount; s++) {

                                var li = document.createElement('li');
                                var span = document.createElement('span');
                                var p = document.createElement('p');

                                li.classList.add('list-group-item');
                                li.classList.add('clearfix');

                                li.setAttribute('id', autoCompleteList[s].PatientId);

                                li.style.cursor = "pointer";
                                li.onclick = showEmployeeNameOnSelection;
                                span.textContent = autoCompleteList[s].FullName;

                                p.classList.add('list-group-item-text');
                                p.textContent = autoCompleteList[s].EmployerName;

                                li.appendChild(span);
                                li.appendChild(p);

                                fragment.appendChild(li);
                            }

                            ul.appendChild(fragment);

                            DOM.searchPatientList.appendChild(ul);

                            DOM.searchPatientList.style.width = e.target.offsetWidth + 'px';
                            DOM.searchPatientList.style.left = 0;//e.target.offsetParent.offsetLeft + 15 + 'px';

                            DOM.searchPatientList.classList.add('autocompleteList-active');
                            //DOM.itemsList.innerHTML = data;

                        }
                    }
                }
            });

        }
    }

    function showEmployeeNameOnSelection(e) {

        FLAG = "NEW ITEM";

        if (e.target.nodeName.toLowerCase() === "li") {
            setPatientName(e.target.children[0].textContent, parseInt(e.target.id));
        }
        else if (e.target.nodeName.toLowerCase() === "span") {
            setPatientName(e.target.textContent, parseInt(e.target.parentElement.id));
        }
        else if (e.target.nodeName.toLowerCase() === "p") {
            setPatientName(e.target.parentElement.children[0].textContent, parseInt(e.target.parentElement.id));
        }

    }

    function showPatientNameOnEnterKey() {

        FLAG = "NEW ITEM";

        var li = DOM.searchPatientList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            setPatientName(li[0].children[0].textContent, parseInt(li[0].id));
        }

    }

    function setPatientName(name, id) {

        DOM.patientName.value = name;

        DOM.patientName.setAttribute('data-patient-id', id);

        shared.closeAutoCompleteList(DOM.searchPatientList);

        DOM.patientName.focus();

        getPatientAndTestDetails(id);
    }

    var getSelectedRows = function (listObject) {

        var selectedRows = [];

        var tableBody = listObject.tBodies[0];

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

    function getSelectedPreEmploymentDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.preEmploymentDetailsList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var preEmploymentId = parseInt(currentTableRow.getAttribute('data-pre-employment-id'));

                if (isNaN(preEmploymentId)) { preEmploymentId = 0; }

                showPreEmploymentDetails(preEmploymentId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

    }

    var getPreEmploymentId = function (selectedRows) {

        var preEmploymentId = 0;

        preEmploymentId = parseInt(selectedRows[0].getAttribute('data-pre-employment-id'));

        if (isNaN(preEmploymentId)) { preEmploymentId = 0; }

        return preEmploymentId;
    };

    function getPatientAndTestDetails(patientId) {

        //patientId = parseInt(DOM.patientName.getAttribute('data-patient-id'));

        if (isNaN(patientId)) { patientId = 0; }

        if (DOM.patientName.value !== "") {

            shared.sendRequest(SERVICE_PATH + "GetPatientAndTestDetails/" + patientId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText) {

                        var data = JSON.parse(response.responseText);

                        if (data !== undefined) {

                            PreEmploymentDetails = data;

                            showPatientDetails(PreEmploymentDetails);
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

        DOM.patientName.setAttribute('data-patient-id', 0);
        DOM.preEmploymentCodeNo.setAttribute('data-pre-employment-id', 0);

        var currentDate = new Date();

        DOM.consultDate.value = moment(currentDate).format("DD/MMM/YYYY");

        // Show panel;
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        // Set focus
        setDefaultActiveTabAndFocus();

        DOM.patientName.focus();

        shared.hideLoader(DOM.loader);
    }

    function showPreEmploymentList() {

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        filterPreEmploymentDetails();

        DOM.preEmploymentDetailsList.tBodies[0].innerHTML = "";
    }

    function viewPreEmploymentDetails() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedPreEmploymentDetails();

        shared.hideLoader(DOM.loader);

        DOM.patientName.focus();
    }

    var getPatientId = function (selectedRows) {

        var patientId = 0;

        patientId = parseInt(selectedRows[0].getAttribute('data-patient-id'));

        if (isNaN(patientId)) { patientId = 0; }

        return patientId;
    };

    function editPreEmploymentDetails() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        getSelectedPreEmploymentDetails();

        shared.hideLoader(DOM.loader);

        // Set Focus
        DOM.patientName.focus();
    }

    function deletePreEmploymentDetails() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.preEmploymentDetailsList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.preEmploymentDetailsList);

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
                                PatientId: parseInt(patientId),
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
                                            addNewPreEmploymentDetails();
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

    function printPreEmploymentDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.preEmploymentDetailsList);

        var preEmploymentId = 0;
        var preEmploymentCodeNo = 0;

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

                preEmploymentId = getPreEmploymentId(selectedRows);
            }
        }

        var print = {};

        preEmploymentId = parseInt(DOM.preEmploymentCodeNo.getAttribute('data-pre-employment-id'));
        preEmploymentCodeNo = parseInt(DOM.preEmploymentCodeNo.value);

        var folderName = 'PreEmploymentDetails';

        print = {
            PreEmploymentOrHealthCheckup: "P",
            PreEmploymentId: preEmploymentId,
            PreEmploymentCodeNo: preEmploymentCodeNo
        };

        var postData = JSON.stringify(print);

        shared.sendRequest(SERVICE_PATH + "PrintPreEmploymentReport", "POST", true, "JSON", postData, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            window.open(location.origin + "/HealthScreeningApp/ApplicationFiles/" + folderName + "/" + preEmploymentCodeNo + ".pdf", "_blank");

                        }
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });
    }

    function getSearchFields() {

        shared.showLoader(DOM.loader);

        shared.sendRequest(SERVICE_PATH + "GetSearchFields/14", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        bindSearchFields(_response);

                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

        shared.hideLoader(DOM.loader);

    }

    function bindSearchFields(searchFields) {

        var table = DOM.searchFieldsList;

        var tableBody = table.tBodies[0];

        if (searchFields.length) {

            for (var s = 0; s < searchFields.length; s++) {

                var data = "";

                var tableRow = shared.createElement('TR');

                data += "<td class='col-lg-2 col-md-2 col-sm-4 col-xs-12' data-table-field-name='" + searchFields[s].FieldValue + "'>" + searchFields[s].FieldName + "</td>";

                if (searchFields[s].ControlName.toLowerCase() === "select") {
                    data += "<td class='col-lg-2 col-md-2 col-sm-4 col-xs-12'> <select id='" + searchFields[s].FieldValue + "' class='form-control input-md'></select> </td>";
                }
                else if (searchFields[s].ControlName.toLowerCase() === "date") {
                    data += "<td class='col-lg-2 col-md-2 col-sm-4 col-xs-12'> <div class='input-group date input-group-md' id='" + searchFields[s].FieldValue + "DatePicker'><input type='text' id='" + searchFields[s].FieldValue + "' class='form-control input-md'/> <span class='input-group-addon'><i class='fa fa-calendar'></i></span></div></td>";
                }
                else
                    data += "<td class='col-lg-2 col-md-2 col-sm-4 col-xs-12'> <input type='text' id='" + searchFields[s].FieldValue + "' class='form-control input-md'/> </td>";

                tableRow.innerHTML = data;

                tableBody.appendChild(tableRow);
            }

        }

        applyPluginsToSearchFields(tableBody);

        setFocusToFirstElement(tableBody);

    }

    function applyPluginsToSearchFields(tableBody) {

        var selects = tableBody.querySelectorAll('select');

        var divs = tableBody.querySelectorAll('.date');

        if (selects.length) {

            for (var s = 0; s < selects.length; s++) {

                selects[s].innerHTML = selects[s].innerHTML + DOM.financialYear.innerHTML;

                $($(selects[s])[0]).select2();

                shared.setSelectOptionByIndex(selects[s], parseInt(1));
                shared.setSelect2ControlsText(selects[s]);

            }
        }

        if (divs.length) {

            for (var d = 0; d < divs.length; d++) {

                if (divs[d].classList.contains('date')) {

                    $($(divs[d])[0]).datetimepicker({
                        format: 'DD/MMM/YYYY'
                    });
                }
            }
        }

    }

    function setFocusToFirstElement(tableBody) {

        var input = tableBody.querySelectorAll('input[type="text"]')[0];

        setFocusOnElement(input);

    }

    var checkSearchFieldsTableHasRows = function () {

        var tableBody = DOM.searchFieldsList.tBodies[0];

        var tableRows = tableBody.children;

        return tableRows;
    };

    function clearSearchFieldsListControls(tableRows) {

        if (tableRows.length) {

            var tableBody = DOM.searchFieldsList.tBodies[0];

            var inputs = tableBody.querySelectorAll('input[type="text"]');

            if (inputs.length) {

                for (var i = 0; i < inputs.length; i++) {

                    inputs[i].value = "";
                }
            }
        }
    }

    function filterPreEmploymentDetails() {

        shared.showPanel(DOM.searchPreEmploymentDetailsPanel);

        shared.clearInputs(DOM.searchPreEmploymentDetailsPanel);

        var tableRows = checkSearchFieldsTableHasRows();

        if (tableRows.length) {
            clearSearchFieldsListControls(tableRows);
        }
        else {
            getSearchFields();
        }

        if (DOM.searchPreEmploymentDetailsPanel.classList.contains("hide")) {
            DOM.searchPreEmploymentDetailsPanel.classList.remove('hide');
            DOM.searchPreEmploymentDetailsPanel.classList.add('show');
        }
        else {
            DOM.searchPreEmploymentDetailsPanel.classList.remove('show');
            DOM.searchPreEmploymentDetailsPanel.classList.add('hide');
        }

        DOM.searchFieldsList.tBodies[0].innerHTML = "";
    }

    var getSearchCriteria = function () {

        var table = DOM.searchFieldsList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var searchCriteria = "";

        var searchParameter = {};

        if (tableRows.length) {

            searchParameter["PreEmploymentOrHealthCheckup"] = "P";

            for (var tr = 0; tr < tableRows.length; tr++) {

                if (tableRows[tr].children[1].children[0].value !== "") {

                    if (tableRows[tr].children[1].children[0].nodeName.toLowerCase() === "select") {

                        var selectedIndex = tableRows[tr].children[1].children[0].selectedIndex;

                        searchParameter[tableRows[tr].children[0].getAttribute('data-table-field-name')] = tableRows[tr].children[1].children[0].options[selectedIndex].text;
                    }
                    else {

                        searchParameter[tableRows[tr].children[0].getAttribute('data-table-field-name')] = tableRows[tr].children[1].children[0].value;
                    }
                }

                //var searchFieldName = "";
                //var operator = "";
                //var searchFieldValue = "";

                //var condition = "and ";

                //searchFieldName = tableRows[tr].children[0].getAttribute('data-table-field-name');

                //searchFieldValue = tableRows[tr].children[2].textContent;

                //if (tableRows[tr].children[1].textContent.toLowerCase().indexOf('contains') !== -1) {
                //    operator = "like";
                //}
                //else if (tableRows[tr].children[1].textContent.toLowerCase().indexOf('equals') !== -1) {
                //    operator = "=";
                //}
                //else {
                //    operator = tableRows[tr].children[1].textContent;
                //}

                //searchCriteria += "" + searchFieldName + " " + operator + " ''%" + searchFieldValue + "%'' " + condition + " ";

            }

            //searchCriteria = "" +  searchCriteria.substring(0, searchCriteria.lastIndexOf("'")) + "'";
            //searchCriteria.substring(0, searchCriteria.length - (searchCriteria.lastIndexOf("'") + condition.length));
        }

        return searchParameter;
    };

    function searchPreEmploymentDetails() {

        shared.showLoader(DOM.loader);

        DOM.preEmploymentDetailsList.tBodies[0].innerHTML = "";

        PreEmploymentDetails.length = 0;

        //var searchParmater = {
        //    PreEmploymentOrHealthCheckup: 'P',
        //    PatientFullName: null,
        //    EmployerName: null,
        //    PatientCode: null
        //};

        //var searchParameterName = DOM.searchOptions.options[DOM.searchOptions.selectedIndex].value;
        //var searchValue = DOM.searchValue.value;

        var searchParameter = getSearchCriteria();

        var postData = JSON.stringify(searchParameter);

        shared.sendRequest(SERVICE_PATH + "SearchPreEmploymentDetails/", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        PreEmploymentDetails = _response;

                        bindPreEmploymentDetails();

                        filterPreEmploymentDetails();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

        shared.hideLoader(DOM.loader);
    }

    function getPreEmploymentDetails() {

        shared.showLoader(DOM.loader);

        PreEmploymentDetails.length = 0;

        DOM.preEmploymentDetailsList.tBodies[0].innerHTML = "";

        shared.sendRequest(SERVICE_PATH + "GetAllPreEmploymentDetails/P/", "GET", true, "JSON", null, function (response) {

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

                data = data + "<tr data-pre-employment-id=" + PreEmploymentDetails[r].PreEmploymentId + " data-patient-id=" + PreEmploymentDetails[r].PatientId + " >";
                data = data + "<td><label class='label-tick'> <input type='checkbox' id='" + PreEmploymentDetails[r].PatientId + "' class='label-checkbox' name='SelectPatient' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + PreEmploymentDetails[r].EmployerName + "</td>";
                data = data + "<td>" + PreEmploymentDetails[r].PatientCode + "</td>";
                data = data + "<td>" + PreEmploymentDetails[r].PatientFullName + "</td>";
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
                showPatientDetails(preEmploymentDetails[0]);
            }

        }
    }

    function showPatientDetails(preEmploymentDetails) {

        shared.showLoader(DOM.loader);

        if (preEmploymentDetails !== undefined) {

            DOM.patientCode.value = preEmploymentDetails.PatientCode;
            DOM.patientName.setAttribute('data-patient-id', preEmploymentDetails.PatientId);
            DOM.patientName.value = preEmploymentDetails.PatientFullName;
            DOM.consultDate.value = preEmploymentDetails.ConsultDate;
            DOM.preEmploymentCodeNo.value = preEmploymentDetails.PreEmploymentCodeNo;
            DOM.preEmploymentCodeNo.setAttribute('data-pre-employment-id', preEmploymentDetails.PreEmploymentId);
            DOM.age.value = preEmploymentDetails.Age;
            DOM.gender.value = preEmploymentDetails.Gender;
            DOM.designation.value = preEmploymentDetails.Designation;
            DOM.identificationMark.value = preEmploymentDetails.IdentificationMark;
            DOM.maritalStatus.value = preEmploymentDetails.MaritalStatus;
            DOM.noOfSons.value = preEmploymentDetails.NoOfSons;
            DOM.noOfDaughters.value = preEmploymentDetails.NoOfDaughters;
            DOM.employerCode.value = preEmploymentDetails.EmployerCode;
            DOM.employerName.value = preEmploymentDetails.EmployerName;
            DOM.designation.value = preEmploymentDetails.Designation;
            DOM.personalHistoryOfMajorIllness.value = preEmploymentDetails.PersonalHistoryOfMajorIllness;
            DOM.drugAllergy.value = preEmploymentDetails.AllergicTo;
            DOM.micturation.value = preEmploymentDetails.Micturation;
            DOM.bowels.value = preEmploymentDetails.Bowels;
            DOM.sleep.value = preEmploymentDetails.Sleep;
            DOM.alcohol.value = preEmploymentDetails.Alcohol;
            DOM.smoking.value = preEmploymentDetails.Smoking;
            DOM.mc.value = preEmploymentDetails.MC;
            DOM.personalHistoryOfMajorIllness.value = preEmploymentDetails.PastHistory;
            DOM.familyHistoryOfMajorIllness.value = preEmploymentDetails.FamilyHistory;
            shared.setSelectValue(DOM.financialYear, null, preEmploymentDetails.WorkingPeriodId);
            shared.setSelect2ControlsText(DOM.financialYear);

            PreEmploymentTestDetails = preEmploymentDetails.PreEmploymentTestDetails;

            if (PreEmploymentTestDetails !== undefined) {

                bindTestDetails(true);

                bindTestDetails(false);

            }
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

        //if (DOM.patientCode.value === "") {
        //    isValid = false;
        //    swal("Error!!!", "Please enter the Patient Code.", "error");
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

    function savePreEmploymentDetails() {

        if (validateData()) {

            /* temp variable */
            var preEmploymentId = 0;
            var patientId = 0;
            var preEmploymentOrHealthCheckup = "P";
            var consultDate = null;
            var maritalStatus = null;
            var noOfSons = 0;
            var nofOfDaughters = 0;
            var designation = null;
            var identificationMark = null;
            var pastHistory = null;
            var drugAllergy = null;
            var micturation = null;
            var bowels = null;
            var sleep = null;
            var alcohol = null;
            var smoking = null;
            var mc = null;
            var familyHistory = null;
            var workingPeriodId = 0;

            preEmploymentId = parseInt(DOM.preEmploymentCodeNo.getAttribute('data-pre-employment-id'));
            patientId = parseInt(DOM.patientName.getAttribute('data-patient-id'));
            consultDate = DOM.consultDate.value;
            maritalStatus = DOM.maritalStatus.value;
            noOfSons = DOM.noOfSons.value;
            noOfDaughters = DOM.noOfDaughters.value;
            designation = DOM.designation.value;
            identificationMark = DOM.identificationMark.value;
            drugAllergy = DOM.drugAllergy.value;
            micturation = DOM.micturation.value;
            bowels = DOM.bowels.value;
            sleep = DOM.sleep.value;
            alcohol = DOM.alcohol.value;
            smoking = DOM.smoking.value;
            mc = DOM.mc.value;
            pastHistory = DOM.personalHistoryOfMajorIllness.value;
            familyHistory = DOM.familyHistoryOfMajorIllness.value;
            workingPeriodId = parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value);

            if (isNaN(preEmploymentId)) { preEmploymentId = 0; }
            if (isNaN(patientId)) { patientId = 0; }

            var preEmploymentDetails = {};

            PreEmploymentTestDetails.length = 0;

            savePreEmploymentTestDetails(true);

            savePreEmploymentTestDetails(false);

            preEmploymentDetails = {
                PreEmploymentId: preEmploymentId,
                PreEmploymentOrHealthCheckup: preEmploymentOrHealthCheckup,
                PatientId: patientId,
                ConsultDate: consultDate,
                MaritalStatus: maritalStatus,
                NoOfSons: noOfSons,
                NoOfDaughters: nofOfDaughters,
                Designation: designation,
                IdentificationMark: identificationMark,
                AllergicTo: drugAllergy,
                Micturation: micturation,
                Bowels: bowels,
                Sleep: sleep,
                Smoking: smoking,
                Alcohol: alcohol,
                MC: mc,
                PastHistory: pastHistory,
                FamilyHistory: familyHistory,
                WorkingPeriodId: workingPeriodId,
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
                            addNewPreEmploymentDetails();
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
