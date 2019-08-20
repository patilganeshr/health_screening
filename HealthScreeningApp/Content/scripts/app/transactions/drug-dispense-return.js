
var Sofarch = {};

Sofarch.DrugDispenseReturn = (function () {

        //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();
    var CurrentFocus = -1;

    var DrugReturnDetails = [];
    var DrugsReturn = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.searchDrugReturnDetailsPanel = document.getElementById('SearchDrugReturnDetailsPanel');
        DOM.searchCriteriaList = document.getElementById('SearchCriteriaList');
        DOM.searchFieldsList = document.getElementById('SearchFieldsList');
        DOM.searchDrugReturnDetails = document.getElementById('SearchDrugReturnDetails');

        DOM.drugReturnDetailsList = document.getElementById('DrugReturnDetailsList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.drugReturnDetailsPanel = document.getElementById('DrugReturnDetailsPanel');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.drugReturnNo = document.getElementById('DrugReturnNo');
        DOM.drugReturnDate = document.getElementById('DrugReturnDate');
        DOM.patientCode = document.getElementById('PatientCode');
        DOM.patientName = document.getElementById('PatientName');
        DOM.searchPatientList = document.getElementById('SearchPatientList');
        DOM.employerName = document.getElementById('EmployerName');
        DOM.drugsName = document.getElementById('DrugsName');
        DOM.pastDrugReturnDate = document.getElementById('PastDrugReturnDate');
        DOM.searchDrugName = document.getElementById('SearchDrugName');
        DOM.searchDrugList = document.getElementById('SearchDrugList');
        DOM.drugReturnList = document.getElementById('DrugReturnList');

        DOM.addNewDrugReturnDetails = document.getElementById('AddNewDrugReturnDetails');
        DOM.showDrugReturnList = document.getElementById('ShowDrugReturnList');
        DOM.viewDrugReturnDetails = document.getElementById('ViewDrugReturnDetails');
        DOM.editDrugReturnDetails = document.getElementById('EditDrugReturnDetails');
        DOM.saveDrugReturnDetails = document.getElementById('SaveDrugReturnDetails');
        DOM.deleteDrugReturnDetails = document.getElementById('DeleteDrugReturnDetails');
        DOM.printDrugReturnDetails = document.getElementById('PrintDrugReturnList');
        DOM.filterDrugReturnDetails = document.getElementById('FilterDrugReturnList');

        DOM.searchPatientName = document.getElementById('SearchPatientName');
        DOM.searchPatientModal = document.getElementById('SearchPatientModal');
        DOM.firstName = document.getElementById('FirstName');
        DOM.lastName = document.getElementById('LastName');
        DOM.searchPatient = document.getElementById('SearchPatient');
        DOM.patientSearchList = document.getElementById('PatientSearchList');
        DOM.selectPatient = document.getElementById('SelectPatient');
        DOM.closeSearchPatientModal = document.getElementById('CloseSearchPatientModal');

        /*cache the jquery element */
        DOM.$drugReturnDateDatePicker = $('#DrugReturnDateDatePicker');
        DOM.$searchPatientModal = $('#SearchPatientModal');
        DOM.$closeSearchPatientModal = $('#CloseSearchPatientModal');

    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        DOM.$drugReturnDateDatePicker.datetimepicker({
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

        DOM.addNewDrugReturnDetails.addEventListener('click', addNewDrugReturnDetails);
        DOM.showDrugReturnList.addEventListener('click', showDrugReturnList);
        DOM.viewDrugReturnDetails.addEventListener('click', viewDrugReturnDetails);
        DOM.editDrugReturnDetails.addEventListener('click', editDrugReturnDetails);
        DOM.saveDrugReturnDetails.addEventListener('click', saveDrugDispenseReturnDetails);
        DOM.deleteDrugReturnDetails.addEventListener('click', deleteDrugReturnDetails);
        DOM.searchDrugReturnDetails.addEventListener('click', searchDrugReturnDetails);
        DOM.filterDrugReturnDetails.addEventListener('click', filterDrugReturnDetails);

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

        DOM.drugsName.onchange = function (e) {

            getDrugDispenseDetailsByPatientIdAndDrugId(e);

        };

        DOM.pastDrugReturnDate.onchange = function (e) {

            getDrugDetailsByDrugDispenseId(e);

        };

    }

    function loadData() {

        getFinancialYear();

        addNewDrugReturnDetails();

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

        fillpastDrugReturnDate(id);

        getDrugsNameByPatientId();
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
            URL: SERVICE_PATH + "GetDrugIdAndDrugNameByDrugName/D/" + DOM.searchDrugName.value + "/",
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

        getDrugDispenseDetailsByPatientIdAndDrugId(parseInt(id));
    }

    function getDrugsNameByPatientId() {

        DOM.drugsName.options.length = 0;

        shared.showLoader(DOM.loader);

        var patientId = parseInt(DOM.patientName.getAttribute('data-patient-id'));

        if (isNaN(patientId)) { patientId = 0; }

        if (patientId > 0) {

            shared.fillDropdownWithCallback(SERVICE_PATH + 'GetDrugDetailsByPatientId/' + patientId, DOM.drugsName, "DrugName", "DrugId", "Choose Drug", function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        shared.setSelectOptionByIndex(DOM.drugsName, parseInt(0));
                        shared.setSelect2ControlsText(DOM.drugsName);

                        //DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                    }
                }

                shared.hideLoader(DOM.loader);

            });

        }
        else {
            swal("Error", "Patient Id Not Found and so unable to fetch the Drug Details.", "error");
        }

        shared.hideLoader(DOM.loader);
    }

    function getDrugDispenseDetailsByPatientIdAndDrugId(drugId) {

        var patientId = 0;

        patientId = parseInt(DOM.patientName.getAttribute('data-patient-id'));

        if (isNaN(patientId)) { patientId = 0; }

        if (isNaN(drugId)) { drugId = 0; }

        if (patientId > 0 && drugId > 0) {

            shared.sendRequest(SERVICE_PATH + "GetDrugDispenseDetailsByPatientIdAndDrugId/" + patientId + '/' + drugId, "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        DrugsReturn = JSON.parse(response.responseText);

                        if (DrugsReturn.length) {

                            for (var d = 0; d < DrugsReturn.length; d++) {

                                bindDrugDetails(DrugsReturn[d]);

                            }

                        }

                    }
                }

                shared.hideLoader(DOM.loader);

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

    function getSelectedDrugReturnDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.drugReturnDetailsList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var drugDispenseReturnId = parseInt(currentTableRow.getAttribute('data-drug-dispense-return-id'));

                if (isNaN(drugDispenseReturnId)) { drugDispenseReturnId = 0; }

                showDrugReturnDetailsById(drugDispenseReturnId);
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

    var getDrugDispenseReturnId = function (selectedRows) {

        var drugDispenseReturnId = 0;

        drugDispenseReturnId = parseInt(selectedRows[0].getAttribute('data-drug-dispense-return-id'));

        if (isNaN(drugDispenseReturnId)) { drugDispenseReturnId = 0; }

        return drugDispenseReturnId;
    };

    function addNewDrugReturnDetails() {

        shared.showLoader(DOM.loader);

        // Clear the modal control inputs
        shared.clearInputs(DOM.editMode);
        shared.disableControls(DOM.editMode, false);
        shared.clearTables(DOM.editMode);

        DOM.patientName.setAttribute('data-patient-id', 0);
        DOM.drugReturnNo.setAttribute('data-drug-dispense-return-id', 0);

        var currentDate = new Date();

        DOM.drugReturnDate.value = moment(currentDate).format("DD/MMM/YYYY");

        // Show panel;
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        // Set focus
        DOM.patientName.focus();

        shared.hideLoader(DOM.loader);
    }

    function viewDrugReturnDetails() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedDrugReturnDetails();

        shared.hideLoader(DOM.loader);

        DOM.patientName.focus();
    }

    var getPatientId = function (selectedRows) {

        var patientId = 0;

        patientId = parseInt(selectedRows[0].getAttribute('data-patient-id'));

        if (isNaN(patientId)) { patientId = 0; }

        return patientId;
    };

    function editDrugReturnDetails() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        getSelectedDrugReturnDetails();

        shared.hideLoader(DOM.loader);

        // Set Focus
        DOM.patientName.focus();
    }

    function deleteDrugReturnDetails() {

        shared.showLoader(DOM.loader);

        try {

            var selectedRows = getSelectedRows(DOM.drugReturnDetailsList);

            var drugDispenseReturnId = getDrugDispenseReturnId(selectedRows);

            if (drugDispenseReturnId > 0) {

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

                            var drugDispenseDrugUtilisations = [];

                            if (DrugReturnDetails.length) {

                                var drugReturnDetails = DrugReturnDetails.filter(function (value, index, array) {
                                    return value.DrugDispenseReturnId === parseInt(drugDispenseReturnId);
                                });

                                if (drugReturnDetails.length) {

                                    if (drugReturnDetails[0].DrugDispenseDrugReturns.length) {

                                        drugReturns = {
                                            DrugDispenseReturnId: drugDispenseReturnId,
                                            IsDeleted: true,
                                            DeletedBy: parseInt(LOGGED_USER),
                                            DeletedByIP: IP_ADDRESS
                                        };
                                    }
                                }
                            }

                            var drugReturn = {};

                            drugReturn = {
                                DrugDispenseReturnId: drugDispenseReturnId,
                                DrugDispenseDrugReturns: null,
                                IsDeleted: true,
                                DeletedBy: parseInt(LOGGED_USER),
                                DeletedByIP: IP_ADDRESS
                            };

                            var postData = JSON.stringify(drugReturn);

                            shared.sendRequest(SERVICE_PATH + 'SaveDrugDispenseReturnDetails', "POST", true, "JSON", postData, function (response) {

                                if (response.status === 200) {

                                    if (parseInt(response.responseText) > 0) {

                                        swal({
                                            title: "Success",
                                            text: "Drug Return deleted successfully.",
                                            type: "success"
                                        }, function () {
                                            addNewDrugReturnDetails();
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

        shared.sendRequest(SERVICE_PATH + "GetSearchFields/18", "GET", true, "JSON", null, function (response) {

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

    function filterDrugReturnDetails() {

        shared.showPanel(DOM.searchDrugReturnDetailsPanel);

        shared.clearInputs(DOM.searchDrugReturnDetailsPanel);

        var tableRows = checkSearchFieldsTableHasRows();

        if (tableRows.length) {
            clearSearchFieldsListControls(tableRows);
        }
        else {
            getSearchFields();
        }

        if (DOM.searchDrugReturnDetailsPanel.classList.contains("hide")) {
            DOM.searchDrugReturnDetailsPanel.classList.remove('hide');
            DOM.searchDrugReturnDetailsPanel.classList.add('show');
        }
        else {
            DOM.searchDrugReturnDetailsPanel.classList.remove('show');
            DOM.searchDrugReturnDetailsPanel.classList.add('hide');
        }

        DOM.searchFieldsList.tBodies[0].innerHTML = "";

    }


    function searchDrugReturnDetails() {

        shared.showLoader(DOM.loader);

        var table = DOM.drugReturnDetailsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        DrugReturnDetails.length = 0;

        //var searchParmater = {
        //    PatientName: null,
        //    EmployerName: null,
        //    PatientCode: null
        //};

        //var searchParameterName = DOM.searchOptions.options[DOM.searchOptions.selectedIndex].value;
        //var searchValue = DOM.searchValue.value;

        //searchParmater[searchParameterName] = searchValue;

        var searchParameter = getSearchCriteria();

        var postData = JSON.stringify(searchParameter);

        shared.sendRequest(SERVICE_PATH + "SearchDrugDispenseReturn/", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        DrugReturnDetails = _response;

                        bindDrugReturnDetails();

                        filterDrugReturnDetails();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

        shared.hideLoader(DOM.loader);
    }

    function getDrugReturnDetails() {

        shared.showLoader(DOM.loader);

        DrugReturnDetails.length = 0;

        DOM.drugReturnDetailsList.tBodies[0].innerHTML = "";

        shared.sendRequest(SERVICE_PATH + "GetAllDrugReturnDetails/", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var data = JSON.parse(response.responseText);

                    if (data !== undefined) {

                        DrugDispenseDetails = data;

                        bindDrugDispenseDetails();
                    }

                    shared.hideLoader(DOM.loader);
                }
            }

        });
    }

    function bindDrugReturnDetails() {

        shared.showLoader(DOM.loader);

        var tableBody = DOM.drugReturnDetailsList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the pre employment has values
        if (DrugReturnDetails.length) {

            var data = "";

            for (var r = 0; r < DrugReturnDetails.length; r++) {

                data = data + "<tr data-drug-dispense-return-id=" + DrugReturnDetails[r].DrugDispenseReturnId + " data-patient-id=" + DrugReturnDetails[r].PatientId + " >";
                data = data + "<td> <label class='label-tick'> <input type='checkbox' id='" + DrugReturnDetails[r].PatientId + "' class='label-checkbox' name='SelectPatient' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + DrugReturnDetails[r].EmployerName + "</td>";
                data = data + "<td>" + DrugReturnDetails[r].PatientCode + "</td>";
                data = data + "<td>" + DrugReturnDetails[r].PatientName + "</td>";
                data = data + "<td>" + DrugReturnDetails[r].DrugReturnNo + "</td>";
                data = data + "<td>" + DrugReturnDetails[r].DrugReturnDate + "</td>";
                data = data + "<td>" + DrugReturnDetails[r].FinancialYear + "</td>";
                data = data + "</tr>";

            }

            tableBody.innerHTML = data;

            // Show panels
            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }

        shared.hideLoader(DOM.loader);

    }

    function showDrugReturnList() {

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        filterDrugReturnDetails();

        var table = DOM.drugReturnDetailsList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

    }

    function fillpastDrugReturnDate(patientId) {

        DOM.pastDrugReturnDate.options.length = 0;

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetpastDrugReturnDatesByPatientId/' + parseInt(patientId), DOM.pastDrugReturnDate, "DrugDispenseDate", "DrugDispenseId", "Choose Date", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.pastDrugReturnDate, parseInt(0));
                    shared.setSelect2ControlsText(DOM.pastDrugReturnDate);

                    //DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                }
            }
        });

        shared.hideLoader(DOM.loader);
    }

    function getDrugDispenseDetailsByDrugDispenseReturnId(e) {

        var drugDispenseReturnId = parseInt(e.target.value);

        if (isNaN(drugDispenseReturnId)) { drugDispenseReturnId = 0; }

        if (drugDispenseReturnId > 0) {

            shared.sendRequest(SERVICE_PATH + "GetDrugReturnDetailsByDrugDispenseReturnId/" + drugDispenseReturnId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        DrugsReturn = JSON.parse(response.responseText);

                        if (DrugsReturn.length) {

                            for (var d = 0; d < DrugsReturn.length; d++) {

                                bindDrugDetails(DrugsReturn[d]);
                            }
                        }
                    }
                }

                shared.hideLoader(DOM.loader);

            });
        }
    }

    function showDrugReturnDetailsById(drugDispenseReturnId) {

        shared.showLoader(DOM.loader);

        if (DrugReturnDetails.length) {

            var drugReturnDetails = DrugReturnDetails.filter(function (value, index, array) {
                return value.DrugDispenseReturnId === drugDispenseReturnId;
            });

            if (drugReturnDetails.length) {

                shared.setSelectValue(DOM.financialYear, null, drugReturnDetails[0].WorkingPeriodId);
                shared.setSelect2ControlsText(DOM.financialYear);
                DOM.drugReturnNo.value = drugReturnDetails[0].DrugReturnNo;
                DOM.drugReturnNo.setAttribute('data-drug-dispense-return-id', drugReturnDetails[0].DrugDispenseReturnId);
                DOM.drugReturnDate.value = drugReturnDetails[0].DrugReturnDate;
                DOM.patientCode.value = drugReturnDetails[0].PatientCode;
                DOM.patientName.setAttribute('data-patient-id', drugReturnDetails[0].PatientId);
                DOM.patientName.value = drugReturnDetails[0].PatientName;
                //DOM.employerCode.value = drugDispenseDetails.EmployerCode;
                DOM.employerName.value = drugReturnDetails[0].EmployerName;
                DOM.employerName.setAttribute('data-employer-id', drugReturnDetails[0].EmployerId);

                DrugsReturn = drugReturnDetails[0].DrugDispenseDrugReturns;

                if (DrugsReturn.length) {

                    var drugsReturn = DrugsReturn.filter(function (value) {
                        return value.DrugDispenseReturnId === drugDispenseReturnId;
                    });

                    for (var d = 0; d < drugsReturn.length; d++) {

                        if (drugReturnDetails.length) {

                            bindDrugDetails(drugsReturn[d]);
                        }
                    }
                }
            }
        }

        shared.hideLoader(DOM.loader);

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);
    }

    function bindDrugDetails(drugReturnDetails) {

        var table = DOM.drugReturnList;

        var tableBody = table.tBodies[0];

        var data = "";

        shared.showLoader(DOM.loader);

        if (drugReturnDetails !== undefined) {

            var tableRow = document.createElement('tr');

            tableRow.setAttribute('data-drug-dispense-drug-return-id', drugReturnDetails.DrugDispenseDrugReturnId);
            tableRow.setAttribute('data-drug-id', drugReturnDetails.DrugId);
            tableRow.setAttribute('data-drug-utilisation-id', drugReturnDetails.DrugUtilisationId);

            data += "<td class='text-center'> <button type='button' class='btn btn-sm btn-danger' id='" + drugReturnDetails.DrugId + "'><i class='fa fa-fw fa-remove'></i></button></td>";
            data += "<td class='text-center'>" + drugReturnDetails.DrugCode + "</td>";
            data += "<td class='text-center'>" + drugReturnDetails.DrugName + "</td>";
            data += "<td class='text-center'>" + drugReturnDetails.DispenseQty + "</td>";
            data += "<td class='text-center'> <input type='text' id='" + drugReturnDetails.DrugId + "' class='form-control' value='" + drugReturnDetails.ReturnQty + "'/> </td>";
            data += "<td class='text-center'>" + drugReturnDetails.BalanceQty + "</td>";
            data += "<td class='text-right'>" + drugReturnDetails.Rate + "</td>";
            data += "<td class='text-right'>" + drugReturnDetails.Amount + "</td>";

            tableRow.innerHTML = data;

            tableBody.appendChild(tableRow);

            addEventsToTableElements();

            setFocusOnNewRowInput(tableBody);
        }

        shared.hideLoader(DOM.loader);

    }

    function addEventsToTableElements() {

        var table = DOM.drugReturnList;

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
        var tableBody = DOM.drugReturnList.tBodies[0];

        var tableRow = e.currentTarget.parentElement.parentElement;

        var drugDispenseDrugReturnId = parseInt(tableRow.getAttribute('data-drug-dispense-drug-return-id'));

        if (isNaN(drugDispenseDrugReturnId)) { drugDispenseDrugReturnId = parseInt(0); }

        if (drugDispenseDrugReturnId === 0) {

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
        var purchaseRate = parseFloat(tableRow.children[6].textContent);
        var amount = 0;

        tableRow.children[7].textContent = parseFloat(parseFloat(dispenseQty * purchaseRate).toFixed(2));

        if (tableRow.rowIndex === tableRows.length) {

            setTimeout(function () {
                DOM.searchDrugName.focus();
            }, 2000);

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

    var saveDrugReturnDetails = function () {

        var table = DOM.drugReturnList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var drugDispenseDrugReturnId = 0;
        var drugDispenseReturnId = 0;
        var drugUtilisationId = 0;
        var drugDispenseId = 0;
        var drugId = 0;
        var returnQty = 0;
        var rate = 0;

        DrugsReturn.length = 0;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                var returnQtyInput = tableRows[tr].children[4].children[0];
                drugDispenseDrugReturnId = parseInt(tableRows[tr].getAttribute('data-drug-dispense-drug-return-id'));
                drugDispenseReturnId = parseInt(DOM.drugReturnNo.getAttribute('data-drug-dispense-return-id'));
                drugId = parseInt(tableRows[tr].getAttribute('data-drug-id'));
                returnQty = parseFloat(returnQtyInput.value);
                rate = parseFloat(tableRows[tr].children[6].textContent);

                if (isNaN(drugDispenseDrugReturnId)) { drugDispenseDrugReturnId = 0; }
                if (isNaN(drugDispenseReturnId)) { drugDispenseReturnId = 0; }
                if (isNaN(drugId)) { drugId = 0; }

                drugReturn = {
                    DrugDispenseDrugReturnId: drugDispenseDrugReturnId,
                    DrugDispenseReturnId: drugDispenseReturnId,
                    DrugUtilisationId: drugUtilisationId,
                    DrugId: drugId,
                    ReturnQty: returnQty,
                    Rate: rate,
                    IsDeleted: false
                };

                if (drugDispenseDrugReturnId === parseInt(0)) {

                    drugReturn.CreatedBy = parseInt(LOGGED_USER);
                    drugReturn.CreatedByIP = IP_ADDRESS;
                }
                else {

                    drugReturn.ModifiedBy = parseInt(LOGGED_USER);
                    drugReturn.ModifiedByIP = IP_ADDRESS;
                }

                DrugsReturn.push(drugReturn);
            }
        }

        return DrugsReturn;
    };

    function saveDrugDispenseReturnDetails() {

        if (validateData()) {

            /* temp variable */
            var drugDispenseReturnId = 0;
            var patientId = 0;
            var drugReturnDate = null;
            var workingPeriodId = 0;

            drugDispenseReturnId = parseInt(DOM.drugReturnNo.getAttribute('data-drug-dispense-return-id'));
            patientId = parseInt(DOM.patientName.getAttribute('data-patient-id'));
            drugReturnDate = DOM.drugReturnDate.value;
            workingPeriodId = parseInt( DOM.financialYear.options[DOM.financialYear.selectedIndex].value);

            if (isNaN(drugDispenseReturnId)) { drugDispenseReturnId = 0; }
            if (isNaN(patientId)) { patientId = 0; }
            if (isNaN(workingPeriodId)) { workingPeriodId = 0; }

            var drugDispenseReturn = {};

            saveDrugReturnDetails();

            drugDispenseReturn = {
                DrugDispenseReturnId: drugDispenseReturnId,
                PatientId: patientId,
                DrugReturnDate: drugReturnDate,
                workingPeriodId: workingPeriodId,
                DrugDispenseDrugReturns: DrugsReturn
            };

            if (parseInt(drugDispenseReturnId) === parseInt(0)) {

                drugDispenseReturn.CreatedBy = parseInt(LOGGED_USER);
                drugDispenseReturn.CreatedByIP = IP_ADDRESS;
            }
            else {

                drugDispenseReturn.ModifiedBy = parseInt(LOGGED_USER);
                drugDispenseReturn.ModifiedByIP = IP_ADDRESS;
            }

            var postData = JSON.stringify(drugDispenseReturn);

            shared.sendRequest(SERVICE_PATH + "SaveDrugDispenseReturnDetails", "POST", true, "JSON", postData, function (response) {
                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Drug Return Details saved successfully.",
                            type: "success"
                        }, function () {
                            addNewDrugReturnDetails();
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


Sofarch.DrugDispenseReturn.init();
