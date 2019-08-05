
var Sofarch = {};

Sofarch.XRayIssue = (function () {

        //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();
    var CurrentFocus = -1;

    var XRayIssueDetails = [];
    var XRayFilmsUsed = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.searchXRayIssueDetailsPanel = document.getElementById('SearchXRayIssueDetailsPanel');
        DOM.searchCriteriaList = document.getElementById('SearchCriteriaList');
        DOM.searchFieldsList = document.getElementById('SearchFieldsList');
        DOM.searchXRayIssueDetails = document.getElementById('SearchXRayIssueDetails');

        DOM.xrayIssueDetailsList = document.getElementById('XRayIssueDetailsList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.xrayIssueDetailsPanel = document.getElementById('XRayIssueDetailsPanel');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.xrayIssueNo = document.getElementById('XRayIssueNo');
        DOM.xrayIssueDate = document.getElementById('XRayIssueDate');
        DOM.patientCode = document.getElementById('PatientCode');
        DOM.patientName = document.getElementById('PatientName');
        DOM.searchPatientList = document.getElementById('SearchPatientList');
        DOM.employerName = document.getElementById('EmployerName');
        DOM.partOfBodyToXRay = document.getElementById('PartOfBodyToXRay');
        DOM.isECGDone = document.getElementById('IsECGDone');
        DOM.purpose = document.getElementById('Purpose');
        DOM.impression = document.getElementById('Impression');
        DOM.pastXRayIssueDate = document.getElementById('PastXRayIssueDate');
        DOM.searchDrugName = document.getElementById('SearchDrugName');
        DOM.searchDrugList = document.getElementById('SearchDrugList');
        DOM.xrayFilmUsedList = document.getElementById('XRayFilmUsedList');

        DOM.searchPatientName = document.getElementById('SearchPatientName');
        DOM.searchPatientModal = document.getElementById('SearchPatientModal');
        DOM.firstName = document.getElementById('FirstName');
        DOM.lastName = document.getElementById('LastName');
        DOM.searchPatient = document.getElementById('SearchPatient');
        DOM.patientSearchList = document.getElementById('PatientSearchList');
        DOM.selectPatient = document.getElementById('SelectPatient');
        DOM.closeSearchPatientModal = document.getElementById('CloseSearchPatientModal');

        DOM.addNewXRayIssueDetails = document.getElementById('AddNewXRayIssueDetails');
        DOM.showXRayIssueList = document.getElementById('ShowXRayIssueList');
        DOM.viewXRayIssueDetails = document.getElementById('ViewXRayIssueDetails');
        DOM.editXRayIssueDetails = document.getElementById('EditXRayIssueDetails');
        DOM.saveXRayIssueDetails = document.getElementById('SaveXRayIssueDetails');
        DOM.deleteXRayIssueDetails = document.getElementById('DeleteXRayIssueDetails');
        DOM.printXRayIssueDetails = document.getElementById('PrintXRayIssueList');
        DOM.filterXRayIssueDetails = document.getElementById('FilterXRayIssueList');

        /*cache the jquery element */
        DOM.$drugDispenseDateDatePicker = $('#XRayIssueDateDatePicker');
        DOM.$searchPatientModal = $('#SearchPatientModal');
        DOM.$closeSearchPatientModal = $('#CloseSearchPatientModal');
    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        DOM.$drugDispenseDateDatePicker.datetimepicker({
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

        DOM.addNewXRayIssueDetails.addEventListener('click', addNewXRayIssueDetails);
        DOM.showXRayIssueList.addEventListener('click', showXRayIssueList);
        DOM.viewXRayIssueDetails.addEventListener('click', viewXRayIssueDetails);
        DOM.editXRayIssueDetails.addEventListener('click', editXRayIssueDetails);
        DOM.saveXRayIssueDetails.addEventListener('click', saveXRayIssueDetails);
        DOM.deleteXRayIssueDetails.addEventListener('click', deleteXRayIssueDetails);
        DOM.searchXRayIssueDetails.addEventListener('click', searchXRayIssueDetails);
        DOM.filterXRayIssueDetails.addEventListener('click', filterXRayIssueDetails);

        DOM.searchPatientName.addEventListener('click', showSearchPatientModal);
        DOM.searchPatient.addEventListener('click', getPatientList);
        DOM.selectPatient.addEventListener('click', selectPatient);
        DOM.closeSearchPatientModal.addEventListener('click', closeSearchPatientModal);

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

        DOM.searchDrugName.onkeyup = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchDrugList(e);

        };

        DOM.pastXRayIssueDate.onchange = function (e) {

            getXRayIssueDetailsByXRayIssueId(e);

        };

    }

    function loadData() {

        getFinancialYear();

        addNewXRayIssueDetails();

    }

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

            DOM.searchDrugName.focus();

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
                                li.setAttribute('data-patient-code', autoCompleteList[s].PatientCode);

                                li.style.cursor = "pointer";
                                li.onclick = showPatientNameOnSelection;
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

    function showPatientNameOnSelection(e) {

        FLAG = "NEW ITEM";

        if (e.target.nodeName.toLowerCase() === "li") {
            setPatientName(e.target.children[0].textContent, parseInt(e.target.id), e.target.getAttribute('data-patient-code'), e.target.children[1].textContent);
        }
        else if (e.target.nodeName.toLowerCase() === "span") {
            setPatientName(e.target.textContent, parseInt(e.target.parentElement.id), e.target.parentElement.getAttribute('data-patient-code'), e.target.parentElement.children[1].textContent);
        }
        else if (e.target.nodeName.toLowerCase() === "p") {
            setPatientName(e.target.parentElement.children[0].textContent, parseInt(e.target.parentElement.id), e.target.parentElement.getAttribute('data-patient-code'), e.target.textContent.trim());
        }

    }

    function showPatientNameOnEnterKey() {

        FLAG = "NEW ITEM";

        var li = DOM.searchPatientList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            setPatientName(li[0].children[0].textContent, parseInt(li[0].id), li[0].getAttribute('data-patient-code'), li[0].children[1].textContent);
        }

    }

    function setPatientName(name, id, patientCode, employerName) {

        DOM.patientName.value = name;

        DOM.patientName.setAttribute('data-patient-id', id);

        DOM.patientCode.value = patientCode;

        DOM.employerName.value = employerName;

        shared.closeAutoCompleteList(DOM.searchPatientList);

        DOM.patientName.focus();

    }

    function showSearchDrugList(e) {

        if (e.keyCode === 13) {
            CurrentFocus = -1;
            showDrugNameOnEnterKey(e);
            return;
        }
        else if (e.keyCode === 9) {
            CurrentFocus = -1;
            shared.closeAutoCompleteList(DOM.searchDrugList);
            return;
        }

        var dataAttributes = ['Drug-Id', 'Drug-Code'];

        var parameters = {};

        parameters = {

            Event: e,
            CurrentFocus: CurrentFocus,
            PostDataKeyValue: postMessage,
            ElementToBeAppend: DOM.searchDrugList,
            DataAttributes: dataAttributes,
            PostParamObject: undefined,
            URL: SERVICE_PATH + "GetDrugIdAndDrugNameByDrugName/X/" + DOM.searchDrugName.value + "/",
            DisplayName: "DrugName"
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

                            li.setAttribute('id', autoCompleteList[s].DrugId);
                            li.setAttribute('data-drug-code', autoCompleteList[s].DrugCode);

                            li.style.cursor = "pointer";
                            li.onclick = showDrugNameOnSelection;
                            li.textContent = autoCompleteList[s].DrugName;

                            fragment.appendChild(li);
                        }

                        ul.appendChild(fragment);

                        DOM.searchDrugList.appendChild(ul);

                        DOM.searchDrugList.style.width = e.target.offsetWidth + 'px';
                        DOM.searchDrugList.style.left = 0;//e.target.offsetParent.offsetLeft + 15 + 'px';

                        DOM.searchDrugList.classList.add('autocompleteList-active');
                        //DOM.itemsList.innerHTML = data;

                    }
                }
            }

        });
    }

    function showDrugNameOnSelection(e) {

        FLAG = "NEW ITEM";

        setDrugName(e.target.textContent, parseInt(e.target.id));

    }

    function showDrugNameOnEnterKey() {

        FLAG = "NEW ITEM";

        var li = DOM.searchDrugList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            setDrugName(li[0].textContent, parseInt(li[0].id));
        }

    }

    function setDrugName(name, id) {

        //DOM.searchDrugName.value = name;

        DOM.searchDrugName.value = "";

        shared.closeAutoCompleteList(DOM.searchDrugList);

        DOM.searchDrugName.focus();

        getFilmDetailsByDrugId(parseInt(id));
    }

    function getFilmDetailsByDrugId(drugId) {

        var xrayFilmUsedId = 0;
        var xrayIssueId = 0;
        var dispenseQty = 0;
        var drugName = name;
        var xrayFilmUsed = {};

        if (drugId > 0) {

            shared.sendRequest(SERVICE_PATH + "GetFilmDetailsByDrugId/" + drugId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        xrayFilmUsed = JSON.parse(response.responseText);

                        bindDrugDetails(xrayFilmUsed);
                    }
                }
            });
        }
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

    function getSelectedXRayIssueDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.xrayIssueDetailsList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var xrayIssueId = parseInt(currentTableRow.getAttribute('data-xray-issue-id'));

                if (isNaN(xrayIssueId)) { xrayIssueId = 0; }

                showXRayIssueDetailsById(xrayIssueId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

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

    var getXRayIssueId = function (selectedRows) {

        var xrayIssueId = 0;

        xrayIssueId = parseInt(selectedRows[0].getAttribute('data-xray-issue-id'));

        if (isNaN(xrayIssueId)) { xrayIssueId = 0; }

        return xrayIssueId;
    };

    function addNewXRayIssueDetails() {

        shared.showLoader(DOM.loader);

        // Clear the modal control inputs
        shared.clearInputs(DOM.editMode);
        shared.disableControls(DOM.editMode, false);
        shared.clearTables(DOM.editMode);

        DOM.patientName.setAttribute('data-patient-id', 0);
        DOM.xrayIssueNo.setAttribute('data-xray-issue-id', 0);

        var currentDate = new Date();

        DOM.xrayIssueDate.value = moment(currentDate).format("DD/MMM/YYYY");

        var listOfControls = [DOM.xrayIssueNo, DOM.xrayIssueDate, DOM.patientCode, DOM.employerName];

        shared.disableSpecificControls(listOfControls, true);

        // Show panel;
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        // Set focus
        DOM.patientName.focus();

        shared.hideLoader(DOM.loader);
    }

    function viewXRayIssueDetails() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedXRayIssueDetails();

        shared.hideLoader(DOM.loader);

        DOM.patientName.focus();
    }

    var getPatientId = function (selectedRows) {

        var patientId = 0;

        patientId = parseInt(selectedRows[0].getAttribute('data-patient-id'));

        if (isNaN(patientId)) { patientId = 0; }

        return patientId;
    };

    function editXRayIssueDetails() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        var listOfControls = [DOM.xrayIssueNo, DOM.xrayIssueDate, DOM.patientCode, DOM.patientName, DOM.employerName];

        shared.disableSpecificControls(listOfControls, true);

        getSelectedXRayIssueDetails();

        shared.hideLoader(DOM.loader);

        // Set Focus
        DOM.patientName.focus();
    }

    function deleteXRayIssueDetails() {

        shared.showLoader(DOM.loader);

        try {

            var selectedRows = getSelectedRows(DOM.xrayIssueDetailsList);

            var xrayIssueId = getXRayIssueId(selectedRows);

            if (xrayIssueId > 0) {

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

                            var xrayFilmsUsed = [];

                            if (XRayIssueDetails.length) {

                                var xrayIssueDetails = XRayIssueDetails.filter(function (value, index, array) {
                                    return value.XRayIssueId === parseInt(xrayIssueId);
                                });

                                if (xrayIssueDetails.length) {

                                    if (xrayIssueDetails[0].XRayFilmsUsed.length) {

                                        xrayFilmUsed = {
                                            XRayIssueId: xrayIssueId,
                                            IsDeleted: true,
                                            DeletedBy: parseInt(LOGGED_USER),
                                            DeletedByIP: IP_ADDRESS
                                        };
                                    }
                                }
                            }

                            var xrayIssue = {};

                            xrayIssue = {
                                XRayIssueId: xrayIssueId,
                                XRayFilmsUsed: null,
                                IsDeleted: true,
                                DeletedBy: parseInt(LOGGED_USER),
                                DeletedByIP: IP_ADDRESS
                            };

                            var postData = JSON.stringify(xrayIssue);

                            shared.sendRequest(SERVICE_PATH + 'SaveXRayIssueDetails', "POST", true, "JSON", postData, function (response) {

                                if (response.status === 200) {

                                    if (parseInt(response.responseText) > 0) {

                                        swal({
                                            title: "Success",
                                            text: "XRay Issued deleted successfully.",
                                            type: "success"
                                        }, function () {
                                            addNewXRayIssueDetails();
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

    function getSearchFields() {

        shared.showLoader(DOM.loader);

        shared.sendRequest(SERVICE_PATH + "GetSearchFields/6", "GET", true, "JSON", null, function (response) {

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

    function filterXRayIssueDetails() {

        shared.showPanel(DOM.searchXRayIssueDetailsPanel);

        shared.clearInputs(DOM.searchXRayIssueDetailsPanel);

        var tableRows = checkSearchFieldsTableHasRows();

        if (tableRows.length) {
            clearSearchFieldsListControls(tableRows);
        }
        else {
            getSearchFields();
        }

        if (DOM.searchXRayIssueDetailsPanel.classList.contains("hide")) {
            DOM.searchXRayIssueDetailsPanel.classList.remove('hide');
            DOM.searchXRayIssueDetailsPanel.classList.add('show');
        }
        else {
            DOM.searchXRayIssueDetailsPanel.classList.remove('show');
            DOM.searchXRayIssueDetailsPanel.classList.add('hide');
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

    function searchXRayIssueDetails() {

        shared.showLoader(DOM.loader);

        DOM.xrayIssueDetailsList.tBodies[0].innerHTML = "";

        XRayIssueDetails.length = 0;

        //var searchParmater = {
        //    FullName: null,
        //    EmployerName: null,
        //    PatientCode: null
        //};

        //var searchParameterName = DOM.searchOptions.options[DOM.searchOptions.selectedIndex].value;
        //var searchValue = DOM.searchValue.value;

        //searchParmater[searchParameterName] = searchValue;

        var searchParameter = getSearchCriteria();

        var postData = JSON.stringify(searchParameter);

        shared.sendRequest(SERVICE_PATH + "SearchXRayIssue/", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        XRayIssueDetails = _response;

                        bindXRayIssueDetails();

                        filterXRayIssueDetails();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

        shared.hideLoader(DOM.loader);
    }

    function getXRayIssueDetails() {

        shared.showLoader(DOM.loader);

        XRayIssueDetails.length = 0;

        DOM.xrayIssueDetailsList.tBodies[0].innerHTML = "";

        shared.sendRequest(SERVICE_PATH + "GetAllXRayIssueDetails/", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var data = JSON.parse(response.responseText);

                    if (data !== undefined) {

                        XRayIssueDetails = data;

                        bindXRayIssueDetails();
                    }

                    shared.hideLoader(DOM.loader);
                }
            }

        });
    }

    function bindXRayIssueDetails() {

        var tableBody = DOM.xrayIssueDetailsList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the pre employment has values
        if (XRayIssueDetails.length) {

            var data = "";

            for (var r = 0; r < XRayIssueDetails.length; r++) {

                data = data + "<tr data-xray-issue-id=" + XRayIssueDetails[r].XRayIssueId + " data-patient-id=" + XRayIssueDetails[r].PatientId + " >";
                data = data + "<td> <label class='label-tick'> <input type='checkbox' id='" + XRayIssueDetails[r].PatientId + "' class='label-checkbox' name='SelectPatient' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + XRayIssueDetails[r].XRayIssueNo + "</td>";
                data = data + "<td>" + XRayIssueDetails[r].XRayIssueDate + "</td>";
                data = data + "<td>" + XRayIssueDetails[r].PatientCode + "</td>";
                data = data + "<td>" + XRayIssueDetails[r].PatientName + "</td>";
                data = data + "<td>" + XRayIssueDetails[r].EmployerName + "</td>";
                data = data + "<td>" + XRayIssueDetails[r].FinancialYear + "</td>";

                data = data + "</tr>";

            }

            tableBody.innerHTML = data;

            // Show panels
            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }
    }

    function showXRayIssueList() {

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        filterXRayIssueDetails();

        DOM.xrayIssueDetailsList.tBodies[0].innerHTML = "";

    }

    function fillPastXRayIssuedDate(patientId) {

        DOM.pastXRayIssueDate.options.length = 0;

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetPastXRayIssueDatesByPatientId/' + parseInt(patientId), DOM.pastXRayIssueDate, "XRayIssueDate", "XRayIssueId", "Choose Date", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.pastXRayIssueDate, parseInt(0));
                    shared.setSelect2ControlsText(DOM.pastXRayIssueDate);

                    //DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                }
            }
        });

        shared.hideLoader(DOM.loader);
    }

    function getDrugDetailsByXRayIssueId(e) {

        var xrayIssueId = parseInt(e.target.value);

        if (isNaN(xrayIssueId)) { xrayIssueId = 0; }

        if (xrayIssueId > 0) {

            shared.sendRequest(SERVICE_PATH + "GetFilmUsedDetailsByXRayIssueId/" + xrayIssueId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        XRayFilmsUsed = JSON.parse(response.responseText);

                        if (XRayFilmsUsed.length) {

                            for (var d = 0; d < XRayFilmsUsed.length; d++) {

                                bindDrugDetails(XRayFilmsUsed[d]);
                            }
                        }
                    }
                }

                shared.hideLoader(DOM.loader);

            });
        }
    }

    function showXRayIssueDetailsById(xrayIssueId) {

        shared.showLoader(DOM.loader);

        if (XRayIssueDetails.length) {

            var xrayIssueDetails = XRayIssueDetails.filter(function (value, index, array) {
                return value.XRayIssueId === xrayIssueId;
            });

            if (xrayIssueDetails.length) {

                shared.setSelectValue(DOM.financialYear, null, xrayIssueDetails[0].WorkingPeriodId);
                shared.setSelect2ControlsText(DOM.financialYear);
                DOM.xrayIssueNo.value = xrayIssueDetails[0].XRayIssueNo;
                DOM.xrayIssueNo.setAttribute('data-xray-issue-id', xrayIssueDetails[0].XRayIssueId);
                DOM.xrayIssueDate.value = xrayIssueDetails[0].XRayIssueDate;
                DOM.partOfBodyToXRay.value = xrayIssueDetails[0].PartOfBodyToXRay;
                if (xrayIssueDetails[0].IsECGDone) {
                    DOM.isECGDone.checked = true;
                }
                DOM.purpose.value = xrayIssueDetails[0].Purpose;
                DOM.impression.value = xrayIssueDetails[0].Impression;
                DOM.patientCode.value = xrayIssueDetails[0].PatientCode;
                DOM.patientName.setAttribute('data-patient-id', xrayIssueDetails[0].PatientId);
                DOM.patientName.value = xrayIssueDetails[0].PatientName;
                //DOM.employerCode.value = drugDispenseDetails.EmployerCode;
                DOM.employerName.value = xrayIssueDetails[0].EmployerName;
                DOM.employerName.setAttribute('data-employer-id', xrayIssueDetails[0].EmployerId);

                XRayFilmsUsed = xrayIssueDetails[0].XRayFilmsUsed;

                if (XRayFilmsUsed.length) {

                    var xrayFilmUsed = XRayFilmsUsed.filter(function (value) {
                        return value.XRayIssueId === xrayIssueId;
                    });

                    for (var d = 0; d < xrayFilmUsed.length; d++) {

                        if (xrayFilmUsed.length) {

                            bindDrugDetails(xrayFilmUsed[d]);
                        }
                    }
                }
            }
        }

        shared.hideLoader(DOM.loader);

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);
    }

    function bindDrugDetails(xrayFilmUsed) {

        var table = DOM.xrayFilmUsedList;

        var tableBody = table.tBodies[0];

        var data = "";

        if (xrayFilmUsed !== undefined) {

            var tableRow = document.createElement('tr');

            tableRow.setAttribute('data-xray-film-used-id', xrayFilmUsed.XRayFilmUsedId);
            tableRow.setAttribute('data-drug-id', xrayFilmUsed.DrugId);

            data += "<td class='text-center'> <button type='button' class='btn btn-sm btn-danger' id='" + xrayFilmUsed.DrugId + "'><i class='fa fa-fw fa-remove'></i></button></td>";
            data += "<td class='text-center'>" + xrayFilmUsed.DrugCode + "</td>";
            data += "<td class='text-center'>" + xrayFilmUsed.DrugName + "</td>";
            data += "<td class='text-center'> <input type='text' id='" + xrayFilmUsed.DrugId + "' class='form-control' value='" + xrayFilmUsed.DispenseQty + "'/> </td>";
            data += "<td class='text-center'>" + xrayFilmUsed.BalanceQty + "</td>";
            data += "<td class='text-right'>" + xrayFilmUsed.PurchaseRate + "</td>";
            data += "<td class='text-right'>" + xrayFilmUsed.Amount + "</td>";

            tableRow.innerHTML = data;

            tableBody.appendChild(tableRow);

            addEventsToTableElements();

            setFocusOnNewRowInput(tableBody);
        }

    }

    function addEventsToTableElements() {

        var table = DOM.xrayFilmUsedList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        if (tableRows.length) {

            var tableRow = tableRows[tableRows.length - 1];

            var inputs = tableRow.querySelectorAll('input[type="text"]');

            var buttons = tableRow.querySelectorAll('button');

            if (inputs.length) {

                for (var i = 0; i < inputs.length; i++) {

                    inputs[i].onkeydown = function (e) {
                        return shared.acceptDecimalNos(e);
                    };

                    inputs[i].onblur = function (e) {
                        calculateItemAmount(e);
                    };
                }
            }

            if (buttons.length) {

                for (var b = 0; b < buttons.length; b++) {

                    buttons[b].onclick = function (e) {
                        removeItem(e);
                    };
                }
            }
        }
    }

    function removeItem(e) {

        // Remove the item from the Table only if the purchase bill item id is 0
        var tableBody = DOM.xrayFilmUsedList.tBodies[0];

        var tableRow = e.currentTarget.parentElement.parentElement;

        var xrayFilmUsedId = parseInt(tableRow.getAttribute('data-xray-film-used-id'));

        if (isNaN(xrayFilmUsedId)) { xrayFilmUsedId = parseInt(0); }

        if (xrayFilmUsedId === 0) {

            tableBody.removeChild(tableRow);
        }
        else {

            tableRow.classList.add('removed-item');

            tableRow.style.display = "none";
        }
    }

    function setFocusOnNewRowInput(tableBody) {

        var tableRows = tableBody.children;

        var inputs = tableBody.querySelectorAll('input[type="text"]');

        if (inputs.length) {
            inputs[tableRows.length - 1].focus();
        }

    }

    function calculateItemAmount(e) {

        var tableRow = e.target.parentElement.parentElement;

        var tableBody = tableRow.parentElement;

        var tableRows = tableBody.children;

        var dispenseQty = parseFloat(e.target.value);
        var purchaseRate = parseFloat(tableRow.children[5].textContent);
        var amount = 0;

        tableRow.children[6].textContent = dispenseQty * purchaseRate;

        if (tableRow.rowIndex === tableRows.length) {

            setTimeout(function () {
                DOM.searchDrugName.focus();
            }, 200);

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

    var saveXRayFilmUsedDetails = function () {

        var table = DOM.xrayFilmUsedList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var xrayFilmUsedId = 0;
        var xrayIssueId = 0;
        var drugId = 0;
        var dispenseQty = 0;
        var rate = 0;

        XRayFilmsUsed.length = 0;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                var dispenseQtyInput = tableRows[tr].children[3].children[0];
                xrayFilmUsedId = parseInt(tableRows[tr].getAttribute('data-xray-film-used-id'));
                xrayIssueId = parseInt(DOM.xrayIssueNo.getAttribute('data-xray-issue-id'));
                drugId = parseInt(tableRows[tr].getAttribute('data-drug-id'));
                dispenseQty = parseFloat(dispenseQtyInput.value);
                rate = parseFloat(tableRows[tr].children[5].textContent);

                if (isNaN(xrayFilmUsedId)) { xrayFilmUsedId = 0; }
                if (isNaN(xrayIssueId)) { xrayIssueId = 0; }
                if (isNaN(drugId)) { drugId = 0; }
                if (isNaN(rate)) { rate = 0; }

                xrayFilmUsed = {
                    XRayFilmUsedId: xrayFilmUsedId,
                    XRayIssueId: xrayIssueId,
                    DrugId: drugId,
                    DispenseQty: dispenseQty,
                    Rate: rate,
                    IsDeleted: false
                };

                if (xrayFilmUsedId === parseInt(0)) {

                    xrayFilmUsed.CreatedBy = parseInt(LOGGED_USER);
                    xrayFilmUsed.CreatedByIP = IP_ADDRESS;
                }
                else {

                    xrayFilmUsed.ModifiedBy = parseInt(LOGGED_USER);
                    xrayFilmUsed.ModifiedByIP = IP_ADDRESS;
                }

                XRayFilmsUsed.push(xrayFilmUsed);
            }
        }

        return XRayFilmsUsed;
    };

    function saveXRayIssueDetails() {

        if (validateData()) {

            /* temp variable */
            var xrayIssueId = 0;
            var patientId = 0;
            var xrayIssueDate = null;
            var partOfBodyToXRay = null;
            var isECGDone = false;
            var purpose = null;
            var impression = null;
            var workingPeriodId = 0;

            xrayIssueId = parseInt(DOM.xrayIssueNo.getAttribute('data-xray-issue-id'));
            patientId = parseInt(DOM.patientName.getAttribute('data-patient-id'));
            xrayIssueDate = DOM.xrayIssueDate.value;
            partOfBodyToXRay = DOM.partOfBodyToXRay.value;
            if (DOM.isECGDone.checked) { isECGDone = true; }
            purpose = DOM.purpose.value;
            impression = DOM.impression.value;
            workingPeriodId = parseInt( DOM.financialYear.options[DOM.financialYear.selectedIndex].value);

            if (isNaN(xrayIssueId)) { xrayIssueId = 0; }
            if (isNaN(patientId)) { patientId = 0; }
            if (isNaN(workingPeriodId)) { workingPeriodId = 0; }

            var xrayIssue = {};

            saveXRayFilmUsedDetails();

            xrayIssue = {
                XRayIssueId: xrayIssueId,
                PatientId: patientId,
                XRayIssueDate: xrayIssueDate,
                PartOfBodyToXRay: partOfBodyToXRay,
                IsECGDone: isECGDone,
                Purpose: purpose,
                Impression: impression,
                workingPeriodId: workingPeriodId,
                XRayFilmsUsed: XRayFilmsUsed
            };

            if (parseInt(xrayIssueId) === parseInt(0)) {

                xrayIssue.CreatedBy = parseInt(LOGGED_USER);
                xrayIssue.CreatedByIP = IP_ADDRESS;
            }
            else {

                xrayIssue.ModifiedBy = parseInt(LOGGED_USER);
                xrayIssue.ModifiedByIP = IP_ADDRESS;
            }

            var postData = JSON.stringify(xrayIssue);

            shared.sendRequest(SERVICE_PATH + "SaveXRayIssueDetails", "POST", true, "JSON", postData, function (response) {
                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "XRay Issue Details saved successfully.",
                            type: "success"
                        }, function () {
                            addNewXRayIssueDetails();
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


Sofarch.XRayIssue.init();
