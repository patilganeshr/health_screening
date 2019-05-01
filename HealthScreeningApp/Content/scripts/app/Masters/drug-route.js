

var Sofarch = {};

Sofarch.DrugRoutes = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var DrugRoutes = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.drugRouteList = document.getElementById('DrugRouteList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.routeName = document.getElementById('RouteName');

        DOM.addNewDrugRoute = document.getElementById('AddNewDrugRoute');
        DOM.showDrugRouteList = document.getElementById('ShowDrugRouteList');
        DOM.viewDrugRoute = document.getElementById('ViewDrugRoute');
        DOM.editDrugRoute = document.getElementById('EditDrugRoute');
        DOM.saveDrugRoute = document.getElementById('SaveDrugRoute');
        DOM.deleteDrugRoute = document.getElementById('DeleteDrugRoute');

    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.addNewDrugRoute.addEventListener('click', addNewDrugRoute);
        DOM.showDrugRouteList.addEventListener('click', getDrugRoutes);
        DOM.viewDrugRoute.addEventListener('click', viewDrugRoute);
        DOM.editDrugRoute.addEventListener('click', editDrugRoute);
        DOM.saveDrugRoute.addEventListener('click', saveDrugRoute);
        DOM.deleteDrugRoute.addEventListener('click', deleteDrugRoute);
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

    function getSelectedDrugRouteDetails() {

        shared.showLoader(DOM.loader);

        var selectedRows = getSelectedRows(DOM.drugRouteList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var drugRouteId = parseInt(currentTableRow.getAttribute('data-drug-route-id'));

                if (isNaN(drugRouteId)) { drugRouteId = 0; }

                showDrugRouteDetailsById(drugRouteId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

    }

    function addNewDrugRoute() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.routeName.setAttribute('data-drug-route-id', 0);
        
        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.routeName.focus();

        shared.hideLoader(DOM.loader);
    }

    function viewDrugRoute() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        getSelectedDrugRouteDetails();

        DOM.routeName.focus();

    }

    function editDrugRoute() {

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        getSelectedDrugRouteDetails();

        //set focus
        DOM.routeName.focus();

    }

    function deleteDrugRoute() {

        shared.showLoader(DOM.loader);

        try {

            var selectedRows = getSelectedRows(DOM.drugRouteList);

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

                                var drugRoute = {
                                    DrugRouteId: parseInt(selectedRows[r].getAttribute('data-drug-route-id')),
                                    IsDeleted: true,
                                    DeletedBy: parseInt(LOGGED_USER),
                                    DeletedByIP: IP_ADDRESS
                                };

                                var postData = JSON.stringify(drugRoute);

                                shared.sendRequest(SERVICE_PATH + 'SaveDrugRoute', "POST", true, "JSON", postData, function (response) {

                                    if (response.status === 200) {

                                        if (parseInt(response.responseText) > 0) {
                                            swal({
                                                title: "Success",
                                                text: "Drug Route deleted successfully.",
                                                type: "success"
                                            }, function () {
                                                addNewDrugRoute();
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

    function showDrugRouteDetailsById(DrugRouteId) {

        if (DrugRoutes.length) {

            var selectedDrugRoute = DrugRoutes.filter(function (value, index, array) {
                return value.DrugRouteId === DrugRouteId;
            });

            if (selectedDrugRoute.length) {

                //assign text to input
                DOM.routeName.setAttribute('data-drug-route-id', selectedDrugRoute[0].DrugRouteId);
                DOM.routeName.value = selectedDrugRoute[0].RouteName;

            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.routeName.focus();
    }

    function saveDrugRoute() {

        if (DOM.routeName.value === "") {
            DOM.routeName.focus();
            swal("Error!!!", "Please enter the Drug Route Name.", "error");
            return;
        }

        /* temp variable */
        var drugRouteId = 0;
        var routeName = null;

        drugRouteId = parseInt(DOM.routeName.getAttribute('data-drug-route-id'));
        routeName = DOM.routeName.value;

        if (isNaN(drugRouteId)) { drugRouteId = 0; }

        var DrugRoute = {};

            DrugRoute = {
                DrugRouteId: drugRouteId,
                RouteName: routeName
            };

        if (parseInt(drugRouteId) === parseInt(0)) {

            DrugRoute.CreatedBy = parseInt(LOGGED_USER);
            DrugRoute.CreatedByIP = IP_ADDRESS;            
        }
        else {
            DrugRoute.ModifiedBy = parseInt(LOGGED_USER);
            DrugRoute.ModifiedByIP = IP_ADDRESS;            
        }

        var postData = JSON.stringify(DrugRoute);

        shared.sendRequest(SERVICE_PATH + "SaveDrugRoute", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Successfully.",
                        type: "success"
                    }, function () {
                        getDrugRoutes();
                    });
                }
            }
            else {
                swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
            }
        });

    }

    function getDrugRoutes() {

        shared.showLoader(DOM.loader);

        DOM.drugRouteList.tBodies[0].innerHTML = "";

        DrugRoutes.length = 0;

        shared.sendRequest(SERVICE_PATH + "SearchAllDrugRoutes", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        DrugRoutes = _response;

                        bindDrugRoute();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }

    function bindDrugRoute() {

        shared.showLoader(DOM.loader);

        DOM.drugRouteList.tBodies[0].innerHTML = "";
        
        if (DrugRoutes.length > 0) {

            var data = "";

            for (var r = 0; r < DrugRoutes.length; r++) {

                data += "<tr data-drug-route-id=" + DrugRoutes[r].DrugRouteId + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + DrugRoutes[r].DrugRouteId + "' class='label-checkbox' name='SelectDrugRoute' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + DrugRoutes[r].RouteName + "</td>";
                data += '</tr>';
            }

            DOM.drugRouteList.tBodies[0].innerHTML = data;            
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.drugRouteList.focus();

        shared.hideLoader(DOM.loader);
    }
    
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        addNewDrugRoute();
    }

    return {
        init: init
    };

}());


Sofarch.DrugRoutes.init();
