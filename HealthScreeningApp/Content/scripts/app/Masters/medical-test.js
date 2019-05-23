

var Sofarch = {};

Sofarch.MedicalTest = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var MedicalTests = [];
    var MedicalTestParameters = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.medicalTestList = document.getElementById('MedicalTestList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.testName = document.getElementById('TestName');
        DOM.isGeneralTest = document.getElementsByName('IsGeneralTest');
        DOM.generalTestYes = document.getElementById('GeneralTestYes');
        DOM.generalTestNo = document.getElementById('GeneralTestNo');
        DOM.isTestHasParameters = document.getElementsByName('IsTestHasParameters');
        DOM.testParametersYes = document.getElementById('TestParametersYes');
        DOM.testParametersNo = document.getElementById('TestParametersNo');

        DOM.parameterName = document.getElementById('ParameterName');
        DOM.parameterDesc = document.getElementById('ParameterDesc');
        DOM.parameterSequence = document.getElementById('ParameterSequence');
        DOM.minValue = document.getElementById('MinValue');
        DOM.maxValue = document.getElementById('MaxValue');
        DOM.normalValue = document.getElementById('NormalValue');
        DOM.unit = document.getElementById('Unit');
        DOM.testParametersList = document.getElementById('TestParametersList');
        DOM.testParameterDetails = document.getElementById('TestParameterDetails');

        DOM.addParameterDetails = document.getElementById('AddParameterDetails');

        DOM.addNewMedicalTest = document.getElementById('AddNewMedicalTest');
        DOM.showMedicalTestList = document.getElementById('ShowMedicalTestList');
        DOM.viewMedicalTest = document.getElementById('ViewMedicalTest');
        DOM.editMedicalTest = document.getElementById('EditMedicalTest');
        DOM.saveMedicalTest = document.getElementById('SaveMedicalTest');
        DOM.deleteMedicalTest = document.getElementById('DeleteMedicalTest');

    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.addParameterDetails.addEventListener('click', addParameterDetails);

        DOM.addNewMedicalTest.addEventListener('click', addNewMedicalTest);
        DOM.showMedicalTestList.addEventListener('click', getMedicalTests);
        DOM.viewMedicalTest.addEventListener('click', viewMedicalTest);
        DOM.editMedicalTest.addEventListener('click', editMedicalTest);
        DOM.saveMedicalTest.addEventListener('click', saveMedicalTest);
        DOM.deleteMedicalTest.addEventListener('click', deleteMedicalTest);

        DOM.testParametersYes.onchange = function (e) {
            showParameterDetailsPanel(e);
        };

        DOM.testParametersNo.onchange = function (e) {
            showParameterDetailsPanel(e);
        };

    }

    function loadData() {

        getUnitsOfMeasurements();

        addNewMedicalTest();

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

    function getUnitsOfMeasurements() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllUnitsOfMeasurement', DOM.unit, "UnitCode", "UnitOfMeasurementId", "Choose Unit", function (response) {

            if (response.status !== 200) {

                swal("Error!!!", "Unable to fetch the records due to an error " + response.responseText, "error");
            }

            shared.hideLoader(DOM.loader);

        });

    }

    var showParameterDetailsPanel = function (e) {

        if (e.target.id.toLowerCase().includes('yes')) {
            DOM.testParameterDetails.style.display = "";
        }
        else {
            DOM.testParameterDetails.style.display = "none";
        }
    };

    var checkParameterNameIsExists = function (testParameterName) {

        var isExists = false;

        if (MedicalTestParameters.length) {

            for (var e = 0; e < MedicalTestParameters.length; e++) {

                if (MedicalTestParameters[e].TestParameterName.toLowerCase() === testParameterName) {

                    DOM.parameterName.focus();
                    swal('Error', 'This Test Parameter Name is already exists.', 'error');
                    isExists = true;
                }
            }
        }

        return isExists;
    };

    function addParameterDetails() {

        var srNo = parseInt(DOM.parameterName.getAttribute('data-sr-no'));

        if (isNaN(srNo)) { srNo = 0; }

        saveParameterDetails(srNo);
    }

    function editParameterDetails(event) {

        if (MedicalTestParameters.length) {

            var tableRow;

            if (event.target.nodeName.toLowerCase() === "i") {
                tableRow = event.target.parentElement.parentElement.parentElement;
            }
            else {
                tableRow = event.target.parentElement.parentElement;
            }

            var medicalTestParameterId = parseInt(tableRow.getAttribute('data-medical-test-parameter-id'));
            var srNo = parseInt(tableRow.getAttribute('data-sr-no'));

            if (isNaN(medicalTestParameterId)) { medicalTestParameterId = 0; }
            if (isNaN(srNo)) { srNo = 0; }

            DOM.parameterName.setAttribute('data-medical-test-parameter-id', medicalTestParameterId);
            DOM.parameterName.setAttribute('data-sr-no', srNo);
            DOM.parameterName.value = tableRow.children[0].textContent;
            DOM.parameterDesc.value = tableRow.children[0].textContent;
            DOM.parameterSequence.value = tableRow.children[1].textContent;
            DOM.minValue.value = tableRow.children[2].textContent;
            DOM.maxValue.value = tableRow.children[3].textContent;
            DOM.normalValue.value = tableRow.children[4].textContent;
            shared.setSelectValue(DOM.unit, null, tableRow.getAttribute('data-unit-of-measurement-id'));
            shared.setSelect2ControlsText(DOM.title);
        }

        DOM.parameterName.focus();

    }

    function deleteParameterDetails(event) {

        if (MedicalTestParameters.length) {

            var table = DOM.testParametersList;

            var tableBody = table.tBodies[0];

            var tableRow;

            if (event.target.nodeName.toLowerCase() === "i") {
                tableRow = event.target.parentElement.parentElement.parentElement;
            }
            else {
                tableRow = event.target.parentElement.parentElement;
            }

            var medicalTestParameterId = parseInt(tableRow.getAttribute('data-medical-test-parameter-id'));

            var srNo = parseInt(tableRow.getAttribute('data-sr-no'));

            if (isNaN(medicalTestParameterId)) { medicalTestParameterId = 0; }

            if (isNaN(srNo)) { srNo = 0; }

            var testParameters = MedicalTestParameters.filter(function (value, index, array) {
                return value.SrNo === srNo;
            });

            if (medicalTestParameterId === 0) {
                tableBody.removeChild(tableRow);
            }
            else {
                if (testParameters.length) {

                    for (var e = 0; e < MedicalTestParameters.length; e++) {

                        if (MedicalTestParameters[e].SrNo === srNo) {
                            MedicalTestParameters[e].MedicalTestParameterId = medicalTestParameterId;
                            MedicalTestParameters[e].IsDeleted = true;
                            MedicalTestParameters[e].DeletedBy = parseInt(LOGGED_USER);
                            MedicalTestParameters[e].DeletedByIP = IP_ADDRESS;

                            tableRow.style.display = 'none';

                            break;
                        }
                    }

                    bindParameterDetails();
                }
            }
        }
    }

    function bindParameterDetails() {

        var table = DOM.testParametersList;

        var tableBody = table.tBodies[0];

        tableBody.innerHTML = "";

        var data = "";

        if (MedicalTestParameters.length) {

            var testParameters = MedicalTestParameters.filter(function (value, index, array) {
                return value.IsDeleted === false || value.IsDeleted === null;
            });

            if (testParameters.length) {

                for (var e = 0; e < testParameters.length; e++) {

                    data += "<tr data-medical-test-parameter-id=" + testParameters[e].MedicalTestParameterId + " data-sr-no=" + testParameters[e].SrNo + " data-unit-of-measurement-id=" + testParameters[e].UnitOfMeasurementId + ">";
                    data += "<td>" + testParameters[e].TestParameterName + "</td>";
                    data += "<td>" + testParameters[e].TestParameterSequence + "</td>";
                    data += "<td>" + testParameters[e].MinimumValue + "</td>";
                    data += "<td>" + testParameters[e].MaximumValue + "</td>";
                    data += "<td>" + testParameters[e].NormalValue + "</td>";
                    data += "<td>" + testParameters[e].UnitCode + "</td>";
                    data += "<td> <button type='button' id='EditParameter' class='btn btn-xs btn-info'><i class='fa fa-edit fa-fw'></i></button>" +
                        " <button type='button' id='RemoveParameter' class='btn btn-xs btn-danger'><i class='fa fa-remove fa-fw'></i></button>" +
                        "</td>";
                    data += "</tr>";
                }

                tableBody.innerHTML = data;

                addEventsToParametersTableElements(tableBody);
            }
        }
    }

    function addEventsToParametersTableElements(tableBody) {

        var buttons = tableBody.querySelectorAll('button');

        if (buttons.length) {

            for (var b = 0; b < buttons.length; b++) {

                var button = buttons[b];

                if (button.id.toLowerCase() === "editparameter") {

                    button.onclick = function (e) {
                        editParameterDetails(e);
                    };
                }
                else if (button.id.toLowerCase() === "removeparameter") {

                    button.onclick = function (e) {
                        deleteParameterDetails(e);
                    };
                }

            }
        }
    }

    function saveParameterDetails(srNo) {

        var IsTestParameterNameExists = false;

        if (srNo === 0) {

            IsTestParameterNameExists = checkParameterNameIsExists(DOM.parameterName.value.toLowerCase());

            srNo = shared.getMaxSrNo(MedicalTestParameters, 0);
        }

        if (IsTestParameterNameExists === false) {

            var medicalTestParameterId = 0;
            var medicalTestId = 0;
            var parameterName = null;
            var parameterDesc = null;
            var parameterSequence = 0;
            var minValue = 0;
            var maxValue = 0;
            var normalValue = 0;
            var unitOfMeasurementId = 0;

            medicalTestParameterId = parseInt(DOM.parameterName.getAttribute('data-medical-test-parameter-id'));
            medicalTestId = parseInt(DOM.testName.getAttribute('data-medical-test-id'));
            parameterName = DOM.parameterName.value;
            parameterDesc = DOM.parameterName.value;
            parameterSequence = parseInt(DOM.parameterSequence.value);
            minValue = parseFloat(DOM.minValue.value);
            maxValue = parseFloat(DOM.maxValue.value);
            normalValue = parseFloat(DOM.normalValue.value);
            unitOfMeasurementId = parseInt(DOM.unit.options[DOM.unit.selectedIndex].value);

            var parameterDetails = {};

            if (isNaN(medicalTestParameterId)) { medicalTestParameterId = 0; }

            if (isNaN(medicalTestId)) { medicalTestId = 0; }

            if (isNaN(unitOfMeasurementId)) { unitOfMeasurementId = 0; }

            if (isNaN(srNo)) { srNo = 0; }

            if (MedicalTestParameters.length) {

                var testParameters = MedicalTestParameters.filter(function (value, index, array) {
                    return value.SrNo === srNo;
                });

                if (testParameters.length === 0) {

                    testParameter = {
                        SrNo: srNo,
                        MedicalTestId: medicalTestId,
                        MedicalTestParameterId: medicalTestParameterId,
                        TestParameterName: parameterName,
                        TestParameterDesc: parameterDesc,
                        TestParameterSequence: parameterSequence,
                        MinimumValue: minValue,
                        MaximumValue: maxValue,
                        NormalValue: normalValue,
                        UnitOfMeasurementId: unitOfMeasurementId,
                        IsDeleted: false,
                        CreatedBy: parseInt(LOGGED_USER),
                        CreatedByIP: IP_ADDRESS
                    };

                    MedicalTestParameters.push(testParameter);

                    bindParameterDetails();
                }
                else {

                    for (var e = 0; e < MedicalTestParameters.length; e++) {

                        if (MedicalTestParameters[e].SrNo === srNo) {
                            MedicalTestParameters[e].MedicalTestParameterId = medicalTestParameterId;
                            MedicalTestParameters[e].MedicalTestId = medicalTestId;
                            MedicalTestParameters[e].TestParameterName = parameterName;
                            MedicalTestParameters[e].TestParameterDesc = parameterDesc;
                            MedicalTestParameters[e].TestParameterSequence = parameterSequence;
                            MedicalTestParameters[e].MinimumValue = minValue;
                            MedicalTestParameters[e].MaximumValue = maxValue;
                            MedicalTestParameters[e].NormalValue = normalValue;
                            MedicalTestParameters[e].UnitOfMeasurementId = unitOfMeasurementId;
                            MedicalTestParameters[e].IsDeleted = false;
                            MedicalTestParameters[e].ModifiedBy = parseInt(LOGGED_USER);
                            MedicalTestParameters[e].ModifiedByIP = IP_ADDRESS;

                            break;
                        }
                    }

                    bindParameterDetails();
                }
            }
            else {

                parameterDetails = {
                    SrNo: srNo,
                    MedicalTestId: medicalTestId,
                    MedicalTestParameterId: medicalTestParameterId,
                    TestParameterName: parameterName,
                    TestParameterDesc: parameterName,
                    TestParameterSequence: parameterSequence,
                    MinimumValue: minValue,
                    MaximumValue: maxValue,
                    NormalValue: normalValue,
                    UnitOfMeasurementId: unitOfMeasurementId,
                    IsDeleted: false,
                    CreatedBy: parseInt(LOGGED_USER),
                    CreatedByIP: IP_ADDRESS
                };

                MedicalTestParameters.push(parameterDetails);

                bindParameterDetails();
            }
        }

        //Reset controls
        DOM.parameterName.value = "";
        DOM.parameterName.setAttribute('data-medical-test-parameter-id', 0);
        DOM.parameterName.setAttribute('data-sr-no', 0);
        DOM.parameterSequence.value = "";
        DOM.minValue.value = "";
        DOM.maxValue.value = "";
        DOM.normalValue.value = "";
        DOM.unit.selectedIndex = 0;

        DOM.parameterName.focus();
    }

    function addNewMedicalTest() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.testName.setAttribute('data-medical-test-id', 0);

        DOM.testParameterDetails.style.display = "none";

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.testName.focus();

    }

    function getSelectedMedicalTestDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.medicalTestList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var medicalTestId = parseInt(currentTableRow.getAttribute('data-medical-test-id'));

                if (isNaN(medicalTestId)) { medicalTestId = 0; }

                showMedicalTestDetailsById(medicalTestId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

    }

    function viewMedicalTest() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedMedicalTestDetails();

        DOM.testName.focus();

    }

    function editMedicalTest() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);
                
        getSelectedMedicalTestDetails();

        //set focus
        DOM.testName.focus();

    }

    function deleteMedicalTest() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.medicalTestList.tBodies[0];

            var selectedRows = getSelectedRows(DOM.medicalTestList);

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

                                var medicalTest = {
                                    MedicalTestId: parseInt(selectedRows[r].getAttribute('data-medical-test-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS
                                };

                                var postData = JSON.stringify(medicalTest);

                                shared.sendRequest(SERVICE_PATH + 'SaveMedicalTest', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {
                                            swal({
                                                title: "Success",
                                                text: "Medical Test deleted successfully.",
                                                type: "success"
                                            }, function () {
                                                addNewMedicalTest();
                                            });
                                        }
                                        else {
                                            swal("Error", "Unable to delete the records due to some error.", "Error");
                                        }
                                    }

                                    shared.hideLoader(DOM.loader);

                                });
                            }

                        }

                    });
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

    function showMedicalTestDetailsById(medicalTestid) {

        if (MedicalTests.length) {

            var selectedMedicalTest = MedicalTests.filter(function (value, index, array) {
                return value.MedicalTestId === medicalTestid;
            });

            if (selectedMedicalTest.length) {

                //assign text to input
                DOM.testName.setAttribute('data-medical-test-id', selectedMedicalTest[0].MedicalTestId);
                DOM.testName.value = selectedMedicalTest[0].TestName;

            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.testName.focus();
    }

    function saveMedicalTest() {

        if (DOM.testName.value === "") {
            DOM.testName.focus();
            swal("Error!!!", "Please enter the Test Name.", "error");
            return;
        }

        /* temp variable */
        var medicalTestId = 0;
        var testName = null;

        medicalTestId = parseInt(DOM.testName.getAttribute('data-medical-test-id'));
        testName = DOM.testName.value;

        if (isNaN(medicalTestId)) { medicalTestId = 0; }

        var medicalTest = {};

            medicalTest = {
                MedicalTestId: medicalTestId,
                TestName: testName
            };

        if (parseInt(medicalTestId) === parseInt(0)) {

            medicalTest.CreatedBy = parseInt(LOGGED_USER);
            medicalTest.CreatedByIP = IP_ADDRESS;            
        }
        else {
            medicalTest.ModifiedBy = parseInt(LOGGED_USER);
            medicalTest.ModifiedByIP = IP_ADDRESS;            
        }

        var postData = JSON.stringify(medicalTest);

        shared.sendRequest(SERVICE_PATH + "SaveMedicalTest", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Successfully.",
                        type: "success"
                    }, function () {
                        getMedicalTests();
                    });
                }
            }
            else {
                swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
            }
        });

    }

    function getMedicalTests() {

        shared.showLoader(DOM.loader);

        DOM.medicalTestList.tBodies[0].innerHTML = "";

        MedicalTests.length = 0;

        shared.sendRequest(SERVICE_PATH + "SearchAllMedicalTests", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        MedicalTests = _response;

                        bindMedicalTest();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }

    function bindMedicalTest() {

        shared.showLoader(DOM.loader);

        DOM.medicalTestList.tBodies[0].innerHTML = "";
        
        if (MedicalTests.length > 0) {

            var data = "";

            for (var r = 0; r < MedicalTests.length; r++) {

                data += "<tr data-medical-test-id=" + MedicalTests[r].MedicalTestId + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + MedicalTests[r].MedicalTestId + "' class='label-checkbox' name='SelectMedicalTest' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + MedicalTests[r].TestName + "</td>";
                data += '</tr>';
            }

            DOM.medicalTestList.tBodies[0].innerHTML = data;            
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.medicalTestList.focus();

        shared.hideLoader(DOM.loader);
    }
    
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        loadData();
        addNewMedicalTest();
    }

    return {
        init: init
    };

}());


Sofarch.MedicalTest.init();
