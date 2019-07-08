
var Sofarch = {};

Sofarch.DrugDispense = (function () {

        //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();
    var CurrentFocus = -1;

    var DrugDispenseDetails = [];
    var DrugsUtilisation = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.searchDrugDispenseDetailsPanel = document.getElementById('SearchDrugDispenseDetailsPanel');
        DOM.searchOptions = document.getElementById('SearchOptions');
        DOM.searchValue = document.getElementById('SearchValue');
        DOM.searchDrugDispenseDetails = document.getElementById('SearchDrugDispenseDetails');

        DOM.drugDispenseDetailsList = document.getElementById('DrugDispenseDetailsList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.drugDispenseDetailsPanel = document.getElementById('DrugDispenseDetailsPanel');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.drugDispenseNo = document.getElementById('DrugDispenseNo');
        DOM.drugDispenseDate = document.getElementById('DrugDispenseDate');
        DOM.patientCode = document.getElementById('PatientCode');
        DOM.patientName = document.getElementById('PatientName');
        DOM.searchPatientList = document.getElementById('SearchPatientList');
        DOM.employerName = document.getElementById('EmployerName');
        DOM.pastDrugDispenseDate = document.getElementById('PastDrugDispenseDate');
        DOM.searchDrugName = document.getElementById('SearchDrugName');
        DOM.searchDrugList = document.getElementById('SearchDrugList');
        DOM.drugUtilisationList = document.getElementById('DrugUtilisationList');

        DOM.addNewDrugDispenseDetails = document.getElementById('AddNewDrugDispenseDetails');
        DOM.showDrugDispenseList = document.getElementById('ShowDrugDispenseList');
        DOM.viewDrugDispenseDetails = document.getElementById('ViewDrugDispenseDetails');
        DOM.editDrugDispenseDetails = document.getElementById('EditDrugDispenseDetails');
        DOM.saveDrugDispenseDetails = document.getElementById('SaveDrugDispenseDetails');
        DOM.deleteDrugDispenseDetails = document.getElementById('DeleteDrugDispenseDetails');
        DOM.printDrugDispenseDetails = document.getElementById('PrintDrugDispenseList');
        DOM.filterDrugDispenseDetails = document.getElementById('FilterDrugDispenseList');

        /*cache the jquery element */
        DOM.$drugDispenseDateDatePicker = $('#DrugDispenseDateDatePicker');

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

        DOM.addNewDrugDispenseDetails.addEventListener('click', addNewDrugDispenseDetails);
        DOM.showDrugDispenseList.addEventListener('click', showDrugDispenseList);
        DOM.viewDrugDispenseDetails.addEventListener('click', viewDrugDispenseDetails);
        DOM.editDrugDispenseDetails.addEventListener('click', editDrugDispenseDetails);
        DOM.saveDrugDispenseDetails.addEventListener('click', saveDrugDispenseDetails);
        DOM.deleteDrugDispenseDetails.addEventListener('click', deleteDrugDispenseDetails);
        DOM.searchDrugDispenseDetails.addEventListener('click', searchDrugDispenseDetails);
        DOM.filterDrugDispenseDetails.addEventListener('click', filterDrugDispenseDetails);

        DOM.patientName.onkeydown = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchPatientList(e);

        };

        DOM.searchDrugName.onkeyup = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchDrugList(e);

        };

        DOM.pastDrugDispenseDate.onchange = function (e) {

            getDrugDetailsByDrugDispenseId(e);

        };

    }

    function loadData() {

        getFinancialYear();

        addNewDrugDispenseDetails();

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

        var dataAttributes = ['Patient-Id', 'Patient-Code'];

        var parameters = {};

        parameters = {

            Event: e,
            CurrentFocus: CurrentFocus,
            PostDataKeyValue: postMessage,
            ElementToBeAppend: DOM.searchPatientList,
            DataAttributes: dataAttributes,
            PostParamObject: undefined,
            URL: SERVICE_PATH + "GetPatientIdAndNameByPatientName/" + DOM.patientName.value,
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

        fillPastDrugDispenseDate(id);
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

        getDrugDetailsByDrugId(parseInt(id));
    }

    function getDrugDetailsByDrugId(drugId) {

        var drugUtilisationId = 0;
        var drugDispenseId = 0;
        var dispenseQty = 0;
        var drugName = name;
        var drugUtilisation = {};

        if (drugId > 0) {

            shared.sendRequest(SERVICE_PATH + "GetDrugDetailsByDrugId/" + drugId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        drugUtilisation = JSON.parse(response.responseText);

                        bindDrugDetails(drugUtilisation);
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

    function getSelectedDrugDispenseDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.drugDispenseDetailsList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var drugDispenseId = parseInt(currentTableRow.getAttribute('data-drug-dispense-id'));

                if (isNaN(drugDispenseId)) { drugDispenseId = 0; }

                showDrugDispenseDetailsById(drugDispenseId);
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

    var getDrugDispenseId = function (selectedRows) {

        var drugDispenseId = 0;

        drugDispenseId = parseInt(selectedRows[0].getAttribute('data-drug-dispense-id'));

        if (isNaN(drugDispenseId)) { drugDispenseId = 0; }

        return drugDispenseId;
    };

    function addNewDrugDispenseDetails() {

        shared.showLoader(DOM.loader);

        // Clear the modal control inputs
        shared.clearInputs(DOM.editMode);
        shared.disableControls(DOM.editMode, false);
        shared.clearTables(DOM.editMode);

        DOM.patientName.setAttribute('data-patient-id', 0);
        DOM.drugDispenseNo.setAttribute('data-drug-dispense-id', 0);

        var currentDate = new Date();

        DOM.drugDispenseDate.value = moment(currentDate).format("DD/MMM/YYYY");

        // Show panel;
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        // Set focus
        DOM.patientName.focus();

        shared.hideLoader(DOM.loader);
    }

    function viewDrugDispenseDetails() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedDrugDispenseDetails();

        shared.hideLoader(DOM.loader);

        DOM.patientName.focus();
    }

    var getPatientId = function (selectedRows) {

        var patientId = 0;

        patientId = parseInt(selectedRows[0].getAttribute('data-patient-id'));

        if (isNaN(patientId)) { patientId = 0; }

        return patientId;
    };

    function editDrugDispenseDetails() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);
        shared.clearSelect(DOM.editMode);
        shared.clearTables(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        getSelectedDrugDispenseDetails();

        shared.hideLoader(DOM.loader);

        // Set Focus
        DOM.patientName.focus();
    }

    function deleteDrugDispenseDetails() {

        shared.showLoader(DOM.loader);

        try {

            var selectedRows = getSelectedRows(DOM.drugDispenseDetailsList);

            var drugDispenseId = getDrugDispenseId(selectedRows);

            if (drugDispenseId > 0) {

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

                            if (DrugDispenseDetails.length) {

                                var drugDispenseDetails = DrugDispenseDetails.filter(function (value, index, array) {
                                    return value.DrugDispenseId === parseInt(drugDispenseId);
                                });

                                if (drugDispenseDetails.length) {

                                    if (drugDispenseDetails[0].DrugDispenseDrugUtilisations.length) {

                                        drugUtilisation = {
                                            DrugDispenseId: drugDispenseId,
                                            IsDeleted: true,
                                            DeletedBy: parseInt(LOGGED_USER),
                                            DeletedByIP: IP_ADDRESS
                                        };
                                    }
                                }
                            }

                            var drugDispense = {};

                            drugDispense = {
                                DrugDispenseId: drugDispenseId,
                                DrugDispenseDrugUtilisations: null,
                                IsDeleted: true,
                                DeletedBy: parseInt(LOGGED_USER),
                                DeletedByIP: IP_ADDRESS
                            };

                            var postData = JSON.stringify(drugDispense);

                            shared.sendRequest(SERVICE_PATH + 'SaveDrugDispenseDetails', "POST", true, "JSON", postData, function (response) {

                                if (response.status === 200) {

                                    if (parseInt(response.responseText) > 0) {

                                        swal({
                                            title: "Success",
                                            text: "Drug Dispense deleted successfully.",
                                            type: "success"
                                        }, function () {
                                            addNewDrugDispenseDetails();
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

    function fillSearchOption() {

        var options = "";

        options += "<option value='-1'> Choose Search Option </option>";
        options += "<option value='PatientName' selected='selected'> Patient Name</option>";
        options += "<option value='EmployerName'> Company Name </option>";
        options += "<option value='PatientCode'> Patient Code</option>";

        DOM.searchOptions.innerHTML = options;
    }

    function filterDrugDispenseDetails() {

        shared.showPanel(DOM.searchDrugDispenseDetailsPanel);

        shared.clearInputs(DOM.searchDrugDispenseDetailsPanel);

        fillSearchOption();

        if (DOM.searchDrugDispenseDetailsPanel.classList.contains("hide")) {
            DOM.searchDrugDispenseDetailsPanel.classList.remove('hide');
            DOM.searchDrugDispenseDetailsPanel.classList.add('show');
        }
        else {
            DOM.searchDrugDispenseDetailsPanel.classList.remove('show');
            DOM.searchDrugDispenseDetailsPanel.classList.add('hide');
        }

        DOM.searchValue.focus();
    }

    function searchDrugDispenseDetails() {

        shared.showLoader(DOM.loader);

        DOM.drugDispenseDetailsList.tBodies[0].innerHTML = "";

        DrugDispenseDetails.length = 0;

        var searchParmater = {
            PatientName: null,
            EmployerName: null,
            PatientCode: null
        };

        var searchParameterName = DOM.searchOptions.options[DOM.searchOptions.selectedIndex].value;
        var searchValue = DOM.searchValue.value;

        searchParmater[searchParameterName] = searchValue;

        var postData = JSON.stringify(searchParmater);

        shared.sendRequest(SERVICE_PATH + "SearchDrugDispense/", "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        DrugDispenseDetails = _response;

                        bindDrugDispenseDetails();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

        shared.hideLoader(DOM.loader);
    }

    function getDrugDispenseDetails() {

        shared.showLoader(DOM.loader);

        DrugDispenseDetails.length = 0;

        DOM.drugDispenseDetailsList.tBodies[0].innerHTML = "";

        shared.sendRequest(SERVICE_PATH + "GetAllDrugDispenseDetails/", "GET", true, "JSON", null, function (response) {

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

    function bindDrugDispenseDetails() {

        var tableBody = DOM.drugDispenseDetailsList.tBodies[0];

        tableBody.innerHTML = "";

        // Check the pre employment has values
        if (DrugDispenseDetails.length) {

            var data = "";

            for (var r = 0; r < DrugDispenseDetails.length; r++) {

                data = data + "<tr data-drug-dispense-id=" + DrugDispenseDetails[r].DrugDispenseId + " data-patient-id=" + DrugDispenseDetails[r].PatientId + " >";
                data = data + "<td> <label class='label-tick'> <input type='checkbox' id='" + DrugDispenseDetails[r].PatientId + "' class='label-checkbox' name='SelectPatient' /> <span class='label-text'></span> </label>" + "</td>";
                data = data + "<td>" + DrugDispenseDetails[r].EmployerName + "</td>";
                data = data + "<td>" + DrugDispenseDetails[r].PatientCode + "</td>";
                data = data + "<td>" + DrugDispenseDetails[r].PatientName + "</td>";
                data = data + "<td>" + DrugDispenseDetails[r].Gender + "</td>";
                data = data + "</tr>";

            }

            tableBody.innerHTML = data;

            // Show panels
            shared.showPanel(DOM.viewMode);
            shared.hidePanel(DOM.editMode);
        }
    }

    function showDrugDispenseList() {

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        filterDrugDispenseDetails();

        DOM.drugDispenseDetailsList.tBodies[0].innerHTML = "";

    }

    function fillPastDrugDispenseDate(patientId) {

        DOM.pastDrugDispenseDate.options.length = 0;

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetPastDrugDispenseDatesByPatientId/' + parseInt(patientId), DOM.pastDrugDispenseDate, "DrugDispenseDate", "DrugDispenseId", "Choose Date", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.pastDrugDispenseDate, parseInt(0));
                    shared.setSelect2ControlsText(DOM.pastDrugDispenseDate);

                    //DOM.searchByFinancialYear.innerHTML = DOM.searchByFinancialYear.innerHTML + DOM.financialYear.innerHTML;
                }
            }
        });

        shared.hideLoader(DOM.loader);
    }

    function getDrugDetailsByDrugDispenseId(e) {

        var drugDispenseId = parseInt(e.target.value);

        if (isNaN(drugDispenseId)) { drugDispenseId = 0; }

        if (drugDispenseId > 0) {

            shared.sendRequest(SERVICE_PATH + "GetDrugUtilisationByDrugDispenseId/" + drugDispenseId, "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        DrugsUtilisation = JSON.parse(response.responseText);

                        if (DrugsUtilisation.length) {

                            for (var d = 0; d < DrugsUtilisation.length; d++) {

                                bindDrugDetails(DrugsUtilisation[d]);
                            }
                        }
                    }
                }

                shared.hideLoader(DOM.loader);

            });
        }
    }

    function showDrugDispenseDetailsById(drugDispenseId) {

        shared.showLoader(DOM.loader);

        if (DrugDispenseDetails.length) {

            var drugDispenseDetails = DrugDispenseDetails.filter(function (value, index, array) {
                return value.DrugDispenseId === drugDispenseId;
            });

            if (drugDispenseDetails.length) {

                shared.setSelectValue(DOM.financialYear, null, drugDispenseDetails[0].WorkingPeriodId);
                shared.setSelect2ControlsText(DOM.financialYear);
                DOM.drugDispenseNo.value = drugDispenseDetails[0].DrugDispenseNo;
                DOM.drugDispenseNo.setAttribute('data-drug-dispense-id', drugDispenseDetails[0].DrugDispenseId);
                DOM.drugDispenseDate.value = drugDispenseDetails[0].DrugDispenseDate;
                DOM.patientCode.value = drugDispenseDetails[0].PatientCode;
                DOM.patientName.setAttribute('data-patient-id', drugDispenseDetails[0].PatientId);
                DOM.patientName.value = drugDispenseDetails[0].PatientName;
                //DOM.employerCode.value = drugDispenseDetails.EmployerCode;
                DOM.employerName.value = drugDispenseDetails[0].EmployerName;
                DOM.employerName.setAttribute('data-employer-id', drugDispenseDetails[0].EmployerId);

                DrugsUtilisation = drugDispenseDetails[0].DrugDispenseDrugUtilisations;

                if (DrugsUtilisation.length) {

                    var drugUtilisation = DrugsUtilisation.filter(function (value) {
                        return value.DrugDispenseId === drugDispenseId;
                    });

                    for (var d = 0; d < drugUtilisation.length; d++) {

                        if (drugUtilisation.length) {

                            bindDrugDetails(drugUtilisation[d]);
                        }
                    }
                }
            }
        }

        shared.hideLoader(DOM.loader);

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);
    }

    function bindDrugDetails(drugUtilisation) {

        var table = DOM.drugUtilisationList;

        var tableBody = table.tBodies[0];

        var data = "";

        if (drugUtilisation !== undefined) {

            var tableRow = document.createElement('tr');

            tableRow.setAttribute('data-drug-utilisation-id', drugUtilisation.DrugUtilisationId);
            tableRow.setAttribute('data-drug-id', drugUtilisation.DrugId);

            data += "<td class='text-center'> <button type='button' class='btn btn-sm btn-danger' id='" + drugUtilisation.DrugId + "'><i class='fa fa-fw fa-remove'></i></button></td>";
            data += "<td class='text-center'>" + drugUtilisation.DrugCode + "</td>";
            data += "<td class='text-center'>" + drugUtilisation.DrugName + "</td>";
            data += "<td class='text-center'> <input type='text' id='" + drugUtilisation.DrugId + "' class='form-control' value='" + drugUtilisation.DispenseQty + "'/> </td>";
            data += "<td class='text-center'>" + drugUtilisation.BalanceQty + "</td>";
            data += "<td class='text-right'>" + drugUtilisation.PurchaseRate + "</td>";
            data += "<td class='text-right'>" + drugUtilisation.Amount + "</td>";

            tableRow.innerHTML = data;

            tableBody.appendChild(tableRow);

            addEventsToTableElements();
        }

    }

    function addEventsToTableElements() {

        var table = DOM.drugUtilisationList;

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
        var tableBody = DOM.drugUtilisationList.tBodies[0];

        var tableRow = e.currentTarget.parentElement.parentElement;

        var drugUtilisationId = parseInt(tableRow.getAttribute('data-drug-utilisation-id'));

        if (isNaN(drugUtilisationId)) { drugUtilisationId = parseInt(0); }

        if (drugUtilisationId === 0) {

            tableBody.removeChild(tableRow);
        }
        else {

            tableRow.classList.add('removed-item');

            tableRow.style.display = "none";
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

    var saveDrugUtilisationDetails = function () {

        var table = DOM.drugUtilisationList;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.children;

        var drugUtilisationId = 0;
        var drugDispenseId = 0;
        var drugId = 0;
        var dispenseQty = 0;

        DrugsUtilisation.length = 0;

        if (tableRows.length) {

            for (var tr = 0; tr < tableRows.length; tr++) {

                var dispenseQtyInput = tableRows[tr].children[3].children[0];
                drugUtilisationId = parseInt(tableRows[tr].getAttribute('data-drug-utilisation-id'));
                drugDispenseId = parseInt(DOM.drugDispenseNo.getAttribute('data-drug-dispense-id'));
                drugId = parseInt(tableRows[tr].getAttribute('data-drug-id'));
                dispenseQty = parseFloat(dispenseQtyInput.value);

                if (isNaN(drugUtilisationId)) { drugUtilisationId = 0; }
                if (isNaN(drugDispenseId)) { drugDispenseId = 0; }
                if (isNaN(drugId)) { drugId = 0; }

                drugUtilisation = {
                    DrugUtilisationId: drugUtilisationId,
                    DrugDispenseId: drugDispenseId,
                    DrugId: drugId,
                    DispenseQty: dispenseQty,
                    IsDeleted: false
                };

                if (drugUtilisationId === parseInt(0)) {

                    drugUtilisation.CreatedBy = parseInt(LOGGED_USER);
                    drugUtilisation.CreatedByIP = IP_ADDRESS;
                }
                else {

                    drugUtilisation.ModifiedBy = parseInt(LOGGED_USER);
                    drugUtilisation.ModifiedByIP = IP_ADDRESS;
                }

                DrugsUtilisation.push(drugUtilisation);
            }
        }

        return DrugsUtilisation;
    };

    function saveDrugDispenseDetails() {

        if (validateData()) {

            /* temp variable */
            var drugDispenseId = 0;
            var patientId = 0;
            var drugDispenseDate = null;
            var workingPeriodId = 0;

            drugDispenseId = parseInt(DOM.drugDispenseNo.getAttribute('data-drug-dispense-id'));
            patientId = parseInt(DOM.patientName.getAttribute('data-patient-id'));
            drugDispenseDate = DOM.drugDispenseDate.value;
            workingPeriodId = parseInt( DOM.financialYear.options[DOM.financialYear.selectedIndex].value);

            if (isNaN(drugDispenseId)) { drugDispenseId = 0; }
            if (isNaN(patientId)) { patientId = 0; }
            if (isNaN(workingPeriodId)) { workingPeriodId = 0; }

            var drugDispense = {};

            saveDrugUtilisationDetails();

            drugDispense = {
                DrugDispenseId: drugDispenseId,
                PatientId: patientId,
                DrugDispenseDate: drugDispenseDate,
                workingPeriodId: workingPeriodId,
                DrugDispenseDrugUtilisations: DrugsUtilisation
            };

            if (parseInt(drugDispenseId) === parseInt(0)) {

                drugDispense.CreatedBy = parseInt(LOGGED_USER);
                drugDispense.CreatedByIP = IP_ADDRESS;
            }
            else {

                drugDispense.ModifiedBy = parseInt(LOGGED_USER);
                drugDispense.ModifiedByIP = IP_ADDRESS;
            }

            var postData = JSON.stringify(drugDispense);

            shared.sendRequest(SERVICE_PATH + "SaveDrugDispenseDetails", "POST", true, "JSON", postData, function (response) {
                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Drug Dispense Details saved successfully.",
                            type: "success"
                        }, function () {
                            addNewDrugDispenseDetails();
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


Sofarch.DrugDispense.init();
