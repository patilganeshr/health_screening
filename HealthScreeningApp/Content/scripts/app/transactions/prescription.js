
var Sofarch = {};

Sofarch.Prescription = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var DrugDispenseDetails = [];
    var DrugsUtilisation = [];


    var CurrentFocus = -1;

    var shared = new Shared();

    var Prescription = [];
    var brands = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');
        DOM.editMode = document.getElementById('EditMode');
        DOM.viewMode = document.getElementById('ViewMode');

        DOM.PrescriptionList = document.getElementById('PrescriptionList');

        DOM.docName = document.getElementById('DocName');

        DOM.age = document.getElementById('Age');
        DOM.medicinesPre = document.getElementById('MedicinesPre');

        DOM.patientName = document.getElementById('PatientName');
        DOM.searchPatientList = document.getElementById('SearchPatientList');



        DOM.searchDrugName = document.getElementById('SearchDrugName');
        DOM.searchDrugList = document.getElementById('SearchDrugList');
        DOM.drugUtilisationList = document.getElementById('DrugUtilisationList');

        DOM.addNewPrescription = document.getElementById('AddNewPrescription');
        DOM.showPrescriptionList = document.getElementById('ShowPrescriptionList');
        DOM.viewPrescription = document.getElementById('ViewPrescription');
        DOM.editPrescription = document.getElementById('EditPrescription');
        DOM.savePrescription = document.getElementById('SavePrescription');
        DOM.deletePrescription = document.getElementById('DeletePrescription');
        DOM.printPrescription = document.getElementById('PrintPrescription');



    }


    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.addNewPrescription.addEventListener('click', addNewPrescription);
        DOM.showPrescriptionList.addEventListener('click', showPrescriptionList);
        DOM.viewPrescription.addEventListener('click', viewPrescription);
        DOM.editPrescription.addEventListener('click', editPrescription);
        DOM.savePrescription.addEventListener('click', saveprescription);
        DOM.deletePrescription.addEventListener('click', deleteprescription);
        DOM.printPrescription.addEventListener('click', printPrescription);

        //DOM.search.addEventListener('click', searchDrugs);



        DOM.searchDrugName.onkeyup = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchDrugList(e);

        };

        DOM.patientName.onkeydown = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchPatientList(e);

        };

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
            URL: SERVICE_PATH + "GetPatientIdAndNameByPatientName/" + DOM.patientName.value + "/",
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
            data += "<td class='text-center'> <input type='text' id='" + drugUtilisation.DrugId + "' class='form-control' /> </td>";


            tableRow.innerHTML = data;

            tableBody.appendChild(tableRow);

            addEventsToTableElements();
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

    function deleteprescription() {

        //var table = DOM.PrescriptionList;

        //var tableBody = table.tBodies[0];

        /* temp variable */
        var selectedRows = getSelectedRows(DOM.PrescriptionList);
        var currentTableRow = selectedRows[0];
        //var PrecautionsId = parseInt(currentTableRow.getAttribute('data-Precaution-id'));

        var precautionid = parseInt(currentTableRow.getAttribute('data-Precaution-id'));

        if (isNaN(precautionid)) { precautionid = 0; }

        var precautions = {};

        precautions = {
            PrecautionsId: precautionid,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIP: IP_ADDRESS
        };

        var postData = JSON.stringify(precautions);

        shared.sendRequest(SERVICE_PATH + 'SavePrescription', "POST", true, "JSON", postData, function (response) {

            if (response.status === 200) {



                showPrescriptionList()

            }

        });

    }

    function viewPrescription() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        var selectedRows = getSelectedRows(DOM.PrescriptionList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var PrecautionsId = parseInt(currentTableRow.getAttribute('data-Precaution-id'));


                if (isNaN(PrecautionsId)) { PrecautionsId = 0; }

                showSelectedPrecautions(PrecautionsId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.docName.focus();

    }

    function editPrescription() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        var selectedRows = getSelectedRows(DOM.PrescriptionList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");
                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var PrecautionsId = parseInt(currentTableRow.getAttribute('data-Precaution-id'));

                if (isNaN(PrecautionsId)) { PrecautionsId = 0; }

                showSelectedPrecautions(PrecautionsId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.docName.focus();

    }

    function addNewPrescription() {
        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);
        DOM.docName.setAttribute('data-Precaution-id', 0);
        DOM.patientName.setAttribute('data-patient-id', 0);
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);
    }



    function saveprescription() {

        if (DOM.docName.value === "") {
            DOM.docName.focus();
            swal("Error!!!", "Please enter the Doctor Name.", "error");
            return;
        }
        else if (DOM.patientName.value === "") {
            DOM.patientName.focus();
            swal("Error!!!", "Please enter the Patient Name.", "error");
            return;
        }
        else if (DOM.age.value === "") {
            DOM.age.focus();
            swal("Error!!!", "Please enter the Age.", "error");
            return;
        }

        var PrecautionsId = 0;
        var docName = null;
        var patientName = null;
        var age = 0;
        var medicinesPre = null;

        PrecautionsId = parseInt(DOM.docName.getAttribute('data-Precaution-id'));
        docName = DOM.docName.value;
        patientName = DOM.patientName.value;
        age = DOM.age.value;
        medicinesPre = "Test";


        if (isNaN(PrecautionsId)) { PrecautionsId = 0; }

        var precautions = {};

        precautions = {

            PrecautionsId: PrecautionsId,
            DocName: docName,
            PatientName: patientName,
            Age: age,
            MedicinesPre: medicinesPre

        };



        if (parseInt(PrecautionsId) === parseInt(0)) {

            precautions.CreatedBy = parseInt(LOGGED_USER);
            precautions.CreatedByIP = IP_ADDRESS;

        }
        else {
            precautions.ModifiedBy = parseInt(LOGGED_USER);
            precautions.ModifiedByIP = IP_ADDRESS;
        }



        var postData = JSON.stringify(precautions);

        shared.sendRequest(SERVICE_PATH + "SavePrescription", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    var table = DOM.drugUtilisationList;

                    var tableBody = table.tBodies[0];

                    var tableRows = tableBody.children;
                    var precautions_Id = 0;
                    var drugUtilisationId = 0;
                    var drugDispenseId = 0;
                    var drugId = 0;
                    var dispenseQty = 0;
                    var dosage = 0;
                    var drugname = "";
                    DrugsUtilisation.length = 0;

                    if (tableRows.length) {

                        for (var tr = 0; tr < tableRows.length; tr++) {

                            var DrugCodeInput = tableRows[tr].children[1].children[0];
                            var DrugNameInput = tableRows[tr].children[2].children[0];
                            var dispenseQtyInput = tableRows[tr].children[3].children[0];
                            var dispenseQtyInputD_ = tableRows[tr].children[4].children[0];
                            drugUtilisationId = parseInt(tableRows[tr].getAttribute('data-drug-utilisation-id'));
                            drugDispenseId = parseInt(tableRows[tr].getAttribute('data-drug-dispense-id'));
                            drugId = parseInt(tableRows[tr].getAttribute('data-drug-id'));
                            dispenseQty = parseFloat(dispenseQtyInput.value);
                            dosage = parseFloat(dispenseQtyInputD_.value);
                            precautions_Id = _response;
                            drugname = DrugNameInput;

                            if (isNaN(drugUtilisationId)) { drugUtilisationId = 0; }
                            if (isNaN(drugDispenseId)) { drugDispenseId = 0; }
                            if (isNaN(drugId)) { drugId = 0; }

                            drugUtilisation = {
                                PrecautionsId: precautions_Id,
                                DrugId: drugId,
                                DrugName: drugname,
                                DispenseQty: dispenseQty,
                                Dosage: dosage,
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
                            var postData = JSON.stringify(drugUtilisation);

                            shared.sendRequest(SERVICE_PATH + "SavePrescriptionDrug", "POST", true, "JSON", postData, function (response) {

                                var _response = JSON.parse(response.responseText);

                                if (response.status === 200) {
                                    if (parseInt(response.responseText) > parseInt(0)) {
                                        swal({
                                            title: "Success",
                                            text: "Record Save successfully.",
                                            type: "success"
                                        }, function () {
                                            addNewPrescription();
                                        });
                                    }

                                }
                            });
                        }
                    }



                }

            }
            else {
                swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
            }
        });

    }


    function showPrescriptionList() {

        shared.showLoader(DOM.loader);

        DOM.PrescriptionList.tBodies[0].innerHTML = "";

        Prescription.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllPre", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        Prescription = _response;

                        bindPrec();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }

    function bindPrec() {

        shared.showLoader(DOM.loader);

        DOM.PrescriptionList.tBodies[0].innerHTML = "";

        if (Prescription.length > 0) {

            var data = "";

            for (var r = 0; r < Prescription.length; r++) {

                data += "<tr data-Precaution-id=" + Prescription[r].PrecautionsId + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + Prescription[r].PrecautionsId + "' class='label-checkbox' name='SelectBrand' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + Prescription[r].SrNo + "</td>";
                data += "<td>" + Prescription[r].DocName + "</td>";
                data += "<td>" + Prescription[r].PatientName + "</td>";
                data += "<td>" + Prescription[r].Age + "</td>";
                data += "<td>" + Prescription[r].Date + "</td>";

                data += '</tr>';
            }

            DOM.PrescriptionList.tBodies[0].innerHTML = data;
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.PrescriptionList.focus();

        shared.hideLoader(DOM.loader);
    }


    function showSelectedPrecautions(PrecautionsId) {

        if (Prescription.length > 0) {

            for (var c = 0; c < Prescription.length; c++) {

                if (Prescription[c].PrecautionsId === PrecautionsId) {

                    //assign text to input
                    DOM.docName.setAttribute('data-Precaution-id', PrecautionsId);

                    DOM.docName.value = Prescription[c].DocName;
                    DOM.patientName.value = Prescription[c].PatientName;
                    DOM.age.value = Prescription[c].Age;






                }
            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);
        DOM.docName.focus();

        var drugUtilisation = {};

        if (PrecautionsId > 0) {

            shared.sendRequest(SERVICE_PATH + "GetAllPreDetails/" + PrecautionsId, "GET", true, "JSON", null, function (response) {

                var _response = JSON.parse(response.responseText);

                if (response.status === 200) {

                    if (_response !== undefined) {

                        drugUtilisation = JSON.parse(response.responseText);

                        bindDrugDetails(drugUtilisation);
                    }
                }
            });
        }
    }




    function printPrescription() {

        shared.showLoader(DOM.loader);

        var print = {};

        var selectedRows = getSelectedRows(DOM.PrescriptionList);
        var currentTableRow = selectedRows[0];
        var PrecautionsId = parseInt(currentTableRow.getAttribute('data-Precaution-id'));

        print = {
            PrecautionsId: PrecautionsId
        };

        var postData = JSON.stringify(print);

        shared.sendRequest(SERVICE_PATH + "PrintInvoice", "POST", true, "JSON", postData, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            window.open(location.origin + "/HealthScreeningApp/ApplicationFiles/PatientNo/PatientNo_" + PrecautionsId + ".pdf", "_blank");

                        }
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });
    }


    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();

        addNewPrescription();
    }

    return {
        init: init
    };

}());


Sofarch.Prescription.init();
