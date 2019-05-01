
var Sofarch = {};

Sofarch.Drug = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var Drugs = [];
    var DrugRoutes = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.drugList = document.getElementById('DrugList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.drugCode = document.getElementById('DrugCode');
        DOM.genericName = document.getElementById('GenericName');
        DOM.drugGroup = document.getElementById('DrugGroup');
        DOM.brand = document.getElementById('Brand');
        DOM.formulation = document.getElementById('Formulation');
        DOM.strength = document.getElementById('Strength');
        DOM.unit = document.getElementById('Unit');
        DOM.adverseEffects = document.getElementById('AdverseEffects');
        DOM.precautions = document.getElementById('Precautions');
        DOM.routes = document.getElementById('Routes');
        DOM.remarks = document.getElementById('Remarks');

        DOM.addNewDrug = document.getElementById('AddNewDrug');
        DOM.showDrugList = document.getElementById('ShowDrugList');
        DOM.viewDrug = document.getElementById('ViewDrug');
        DOM.editDrug = document.getElementById('EditDrug');
        DOM.saveDrug = document.getElementById('SaveDrug');
        DOM.deleteDrug = document.getElementById('DeleteDrug');

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

        DOM.addNewDrug.addEventListener('click', addNewDrug);
        DOM.showDrugList.addEventListener('click', getDrugs);
        DOM.viewDrug.addEventListener('click', viewDrug);
        DOM.editDrug.addEventListener('click', editDrug);
        DOM.saveDrug.addEventListener('click', saveDrug);
        DOM.deleteDrug.addEventListener('click', deleteDrug);
    }

    function loadData() {

        getDrugGroups();
        getBrandNames();
        getDrugRoutes();
    }

    function getDrugGroups() {

        DOM.drugGroup.options.length = 0;

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetDrugGroupIdAndGroupName', DOM.drugGroup, "GroupName", "DrugGroupId", "Choose Drug Group", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.drugGroup, parseInt(0));
                    shared.setSelect2ControlsText(DOM.drugGroup);
                }
            }

        });
                
        shared.hideLoader(DOM.loader);
    }

    function getBrandNames() {

        DOM.brand.options.length = 0;

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllBrands', DOM.brand, "BrandName", "BrandId", "Choose Brand", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.brand, parseInt(0));
                    shared.setSelect2ControlsText(DOM.brand);
                }
            }

        });
        
        shared.hideLoader(DOM.loader);
    }

    function getDrugRoutes() {

        DOM.routes.innerHTML = "";

        shared.sendRequest(SERVICE_PATH + "GetAllDrugRouteIdAndRouteName/", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    var data = JSON.parse(response.responseText);

                    bindDrugRoutes(data);
                }

            }

            shared.hideLoader(DOM.loader);
        });

        shared.hideLoader(DOM.loader);
    }

    function bindDrugRoutes(data) {

        var listGroup = null;
        var listGroupItem = "";
        var drugRouteLinkId = 0;
        var drugRouteId = 0;
        var drugId = 0;
        var routeName = null;

        listGroup = document.createElement('ul');

        listGroup.classList.add('list-group');
        listGroup.classList.add('list-group-flush');

        if (data.length) {

            for (var d = 0; d < data.length; d++) {

                drugRouteLinkId = 0;
                drugRouteId = data[d].DrugRouteId;
                drugId = 0;
                routeName = data[d].RouteName;
                
                listGroupItem += "<li class='list-group-item'> <label class='label-tick'> <input type='checkbox' id=" + drugRouteId + " class='label-checkbox' data-drug-route-link-id=" + drugRouteLinkId + " data-drug-id=" + drugId + " /> <span class='label-text'></span> </label>" + routeName + "</li>";
                
            }

            listGroup.innerHTML = listGroupItem;

            DOM.routes.appendChild(listGroup);
        }

        shared.hideLoader(DOM.loader);
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

    function getSelectedDrugDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.drugList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var drugId = parseInt(currentTableRow.getAttribute('data-drug-id'));

                if (isNaN(drugId)) { drugId = 0; }

                showDrugDetailsById(drugId);
            }
        }
        else {
            swal("error", "No row selected.", "error");
        }

        shared.hideLoader(DOM.loader);

    }

    function addNewDrug() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.genericName.setAttribute('data-drug-id', 0);

        //set focus
        DOM.drugCode.focus();

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);
    }

    function viewDrug() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedDrugDetails();

        //set focus
        DOM.drugCode.focus();

    }

    function editDrug() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);
                
        getSelectedDrugDetails();

        //set focus
        DOM.drugCode.focus();

    }

    function deleteDrug() {

        shared.showLoader(DOM.loader);

        try {

            var selectedRows = getSelectedRows(DOM.drugList);

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

                                var drug = {
                                    DrugId: parseInt(selectedRows[r].getAttribute('data-drug-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS
                                };

                                var postData = JSON.stringify(drug);

                                shared.sendRequest(SERVICE_PATH + 'SaveDrug', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {
                                            swal({
                                                title: "Success",
                                                text: "Drug deleted successfully.",
                                                type: "success"
                                            }, function () {
                                                addNewDrug();
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


    function showDrugDetailsById(drugId) {

        if (Drugs.length) {

            var selectedDrug = Drugs.filter(function (value, index, array) {
                return value.DrugId === drugId;
            });

            if (selectedDrug.length) {

                DOM.drugCode.value = selectedDrug[0].DrugCode;
                DOM.genericName.setAttribute('data-drug-id', selectedDrug[0].DrugId);
                DOM.genericName.value = selectedDrug[0].GenericName;
                shared.setSelectValue(DOM.drugGroup, null, parseInt(selectedDrug[0].DrugGroupId));
                shared.setSelect2ControlsText(DOM.drugGroup);
                shared.setSelectValue(DOM.brand, null, parseInt(selectedDrug[0].BrandId));
                shared.setSelect2ControlsText(DOM.brand);
                DOM.formulation.value = selectedDrug[0].Formulation;
                DOM.strength.value = selectedDrug[0].Strength;
                DOM.unit.value = selectedDrug[0].Unit;
                DOM.adverseEffects.value = selectedDrug[0].AdverseEffects;
                DOM.precautions.value = selectedDrug[0].Precautions;
                DOM.remarks.value = selectedDrug[0].Remarks;

                var selectedDrugsLinkWithDrougRoutes = selectedDrug[0].DrugLinkWithDrugRoutes.filter(function (value, index, array) {
                    return value.DrugId === drugId;
                });

                if (selectedDrugsLinkWithDrougRoutes.length) {

                    // find selected drug routes
                    var inputTypes = DOM.routes.querySelectorAll('input[type="checkbox"]');

                    if (inputTypes.length) {

                        //Remove all the checked mark from checkbox
                        for (c = 0; c < inputTypes.length; c++) {

                            inputTypes[c].checked = false;
                        }
                    }

                    for (var d = 0; d < selectedDrugsLinkWithDrougRoutes.length; d++) {
                                            
                        if (inputTypes.length) {

                            for (c = 0; c < inputTypes.length; c++) {

                                if (selectedDrugsLinkWithDrougRoutes[d].DrugRouteId === parseInt(inputTypes[c].id)) {
                                    inputTypes[c].checked = true;
                                    inputTypes[c].setAttribute('data-drug-route-link-id', selectedDrugsLinkWithDrougRoutes[d].DrugRouteLinkId);
                                    inputTypes[c].setAttribute('data-drug-id', selectedDrugsLinkWithDrougRoutes[d].DrugId);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.drugCode.focus();
    }

    function saveDrugRoutes() {

        DrugRoutes.length = 0;

        // find selected drug routes
        var drugRoutes = DOM.routes.querySelectorAll('input[type="checkbox"]');

        if (drugRoutes.length) {

            for (var dr = 0; dr < drugRoutes.length; dr++) {

                var drugRouteLinkId = parseInt(drugRoutes[dr].getAttribute('data-drug-route-link-id'));
                var drugId = parseInt(drugRoutes[dr].getAttribute('data-drug-id'));
                var drugRouteId = parseInt(drugRoutes[dr].id);

                if (isNaN(drugRouteLinkId)) { drugRouteLinkId = 0; }
                if (isNaN(drugId)) { drugId = 0; }
                if (isNaN(drugRouteId)) { drugRouteId = 0; }

                if (drugRoutes[dr].checked) {

                    var drugRoute = {
                        DrugRouteLinkId: drugRouteLinkId,
                        DrugId: drugId,
                        DrugRouteId: drugRouteId
                    };

                    if (parseInt(drugRouteLinkId) === parseInt(0)) {

                        drugRoute.CreatedBy = parseInt(LOGGED_USER);
                        drugRoute.CreatedByIP = IP_ADDRESS;
                    }
                    //else {
                    //    drugRoute.ModifiedBy = parseInt(LOGGED_USER);
                    //    drugRoute.ModifiedByIP = IP_ADDRESS;
                    //}
                    DrugRoutes.push(drugRoute);
                }
                else {
                    if (parseInt(drugRouteLinkId) > 0) {

                        drugRoute = {
                            DrugRouteLinkId: drugRouteLinkId,
                            IsDeleted: true,
                            DeletedBy: parseInt(LOGGED_USER),
                            DeleteByIP: IP_ADDRESS
                        };

                        DrugRoutes.push(drugRoute);
                    }
                }
                
            }
        }

    }

    function saveDrug() {

        if (DOM.drugCode.value === "") {
            DOM.drugCode.focus();
            swal("Error!!!", "Please enter the Drug Code.", "error");
            return;
        }
        else if (DOM.genericName.value === "") {
            DOM.genericName.focus();
            swal("Error!!!", "Please enter the Generic Name.", "error");
            return;
        }
        else if (DOM.drugGroup.selectedIndex === 0) {
            DOM.drugGroup.focus();
            swal("Error!!!", "Please select the Drug Group.", "error");
            return;
        }
        else if (DOM.brand.selectedIndex === 0) {
            DOM.brand.focus();
            swal("Error!!!", "Please select the Brand.", "error");
            return;
        }

        /* temp variable */
        var drugId = 0;
        var drugCode = null;
        var genericName = null;
        var drugGroupId = 0;
        var brandId = 0;
        var formulation = null;
        var strength = null;
        var unit = null;
        var adverseEffects = null;
        var precautions = null;
        var remarks = null;

        saveDrugRoutes();

        if (DrugRoutes.length === 0) {
            swal("Error", "No Drug Routes Selection Found. Data can not be saved.", "error");
            return;
        }

        drugId = parseInt(DOM.genericName.getAttribute('data-drug-id'));
        drugCode = DOM.drugCode.value;
        genericName = DOM.genericName.value;
        drugGroupId = parseInt(DOM.drugGroup.options[DOM.drugGroup.selectedIndex].value);
        brandId = parseInt(DOM.brand.options[DOM.brand.selectedIndex].value);
        formulation = DOM.formulation.value;
        strength = DOM.strength.value;
        unit = DOM.unit.value;
        adverseEffects = DOM.adverseEffects.value;
        precautions = DOM.precautions.value;
        remarks = DOM.remarks.value;
        
        if (isNaN(drugId)) { drugId = 0; }

        var drug = {};

            drug = {
                DrugId: drugId,
                DrugCode: drugCode,
                GenericName: genericName,
                DrugGroupId: drugGroupId,
                BrandId: brandId,
                Formulation: formulation,
                Strength: strength,
                Unit: unit,
                AdverseEffects: adverseEffects,
                Precautions: precautions,
                Remarks: remarks,
                DrugLinkWithDrugRoutes: DrugRoutes
            };

        if (parseInt(drugId) === parseInt(0)) {

            drug.CreatedBy = parseInt(LOGGED_USER);
            drug.CreatedByIP = IP_ADDRESS;
        }
        else {
            drug.ModifiedBy = parseInt(LOGGED_USER);
            drug.ModifiedByIP = IP_ADDRESS;            
        }

        var postData = JSON.stringify(drug);

        shared.sendRequest(SERVICE_PATH + "SaveDrug", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Successfully.",
                        type: "success"
                    }, function () {
                        getDrugs();
                    });
                }
            }
            else {
                swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
            }
        });

    }

    function getDrugs() {

        shared.showLoader(DOM.loader);

        DOM.drugList.tBodies[0].innerHTML = "";

        Drugs.length = 0;

        shared.sendRequest(SERVICE_PATH + "SearchDrugsAll", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        Drugs = _response;

                        bindDrug();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }

    function bindDrug() {

        shared.showLoader(DOM.loader);

        DOM.drugList.tBodies[0].innerHTML = "";
        
        if (Drugs.length > 0) {

            var data = "";

            for (var r = 0; r < Drugs.length; r++) {

                data += "<tr data-drug-id=" + Drugs[r].DrugId + ">";
                data += "<td class='text-center'><label class='label-tick'> <input type='checkbox' id='" + Drugs[r].DrugId + "' class='label-checkbox' name='SelectDrug' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td class='text-center'>" + Drugs[r].GenericName + "</td>";
                data += '</tr>';
            }

            DOM.drugList.tBodies[0].innerHTML = data;            
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.drugList.focus();

        shared.hideLoader(DOM.loader);
    }
    
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        applyPlugins();
        loadData();
        addNewDrug();
    }

    return {
        init: init
    };

}());


Sofarch.Drug.init();
