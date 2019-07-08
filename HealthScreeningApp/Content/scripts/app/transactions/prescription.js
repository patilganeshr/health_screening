
var Sofarch = {};

Sofarch.Prescription = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

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
        DOM.patientName = document.getElementById('PatientName');
        DOM.age = document.getElementById('Age');
        DOM.medicinesPre = document.getElementById('MedicinesPre');
        DOM.searchPatientList = document.getElementById('SearchPatientList');

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
        DOM.deletePrescription.addEventListener('click',deleteprescription);
        DOM.printPrescription.addEventListener('click', printPrescription);

        //DOM.search.addEventListener('click', searchDrugs);

       
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
            else if (DOM.medicinesPre.value === "") {
                DOM.medicinesPre.focus();
                swal("Error!!!", "Please enter the Medicines Prescribed.", "error");
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
            medicinesPre = DOM.medicinesPre.value;


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
            else
            {
                precautions.ModifiedBy = parseInt(LOGGED_USER);
                precautions.ModifiedByIP = IP_ADDRESS;
            }

        

            var postData = JSON.stringify(precautions);

            shared.sendRequest(SERVICE_PATH + "SavePrescription", "POST", true, "JSON", postData, function (response) {

                var _response = JSON.parse(response.responseText);

                if (response.status === 200) {
                    if (parseInt(response.responseText) > parseInt(0)) {
                        swal({
                            title: "Success",
                            text: "Records Saved Successfully.",
                            type: "success"
                        }, function () {
                            addNewPrescription();

                        });
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
                    data += "<td>" + Prescription[r].MedicinesPre + "</td>";

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
                        DOM.medicinesPre.value = Prescription[c].MedicinesPre;
                    }
                }
            }

            shared.showPanel(DOM.editMode);
            shared.hidePanel(DOM.viewMode);

            DOM.docName.focus();
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

                                window.open(location.origin + "/HealthScreeningApp/ApplicationFiles/Sales/" + "/PatientNo_" + PrecautionsId + ".pdf", "_blank");

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
