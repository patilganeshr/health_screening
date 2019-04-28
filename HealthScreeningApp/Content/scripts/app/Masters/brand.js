
//var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

//Object.defineProperty(exports, '__esModule', {
//  value: true
//});

//import {default} from 'default';

//var _shared = require('./shared/default');





var SharpiTech = {};

SharpiTech.Brand = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var brands = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.viewMode = document.getElementById('ViewMode');
        DOM.brandList = document.getElementById('BrandList');

        DOM.editMode = document.getElementById('EditMode');
        DOM.brandName = document.getElementById('BrandName');
        DOM.addNewBrand = document.getElementById('AddNewBrand');
        DOM.showBrandList = document.getElementById('ShowBrandList');
        DOM.viewBrand = document.getElementById('ViewBrand');
        DOM.editBrand = document.getElementById('EditBrand');
        DOM.saveBrand = document.getElementById('SaveBrand');
        DOM.deleteBrand = document.getElementById('DeleteBrand');

    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function bindEvents() {

        DOM.addNewBrand.addEventListener('click', addNewBrand);
        DOM.showBrandList.addEventListener('click', getBrands);
        DOM.viewBrand.addEventListener('click', viewBrand);
        DOM.editBrand.addEventListener('click', editBrand);
        DOM.saveBrand.addEventListener('click', saveBrand);
        DOM.deleteBrand.addEventListener('click', deleteBrand);
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
    
    function addNewBrand() {

        shared.showLoader(DOM.loader);

        //clear the modal control inputs        
        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        DOM.brandName.setAttribute('data-brand-id', 0);
                
        //set focus
        DOM.brandName.focus();

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        shared.hideLoader(DOM.loader);
    }

    function viewBrand() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, true);

        var selectedRows = getSelectedRows(DOM.brandList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");

                shared.hideLoader(DOM.loader);

                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var brandId = parseInt(currentTableRow.getAttribute('data-brand-id'));

                if (isNaN(brandId)) { brandId = 0; }

                showSelectedBrand(brandId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.brandName.focus();

    }

    function editBrand() {

        shared.showLoader(DOM.loader);

        shared.clearInputs(DOM.editMode);

        shared.disableControls(DOM.editMode, false);

        var selectedRows = getSelectedRows(DOM.brandList);

        if (selectedRows.length > 0) {

            if (selectedRows.length > 1) {

                swal('Warning', "Please select only one record to Edit the Records.", "warning");
                return false;
            }
            else {

                var currentTableRow = selectedRows[0];

                var brandId = parseInt(currentTableRow.getAttribute('data-brand-id'));

                if (isNaN(brandId)) { brandId = 0; }

                showSelectedBrand(brandId);
            }
        }
        else {
            swal("error", "No row selected.", "error");            
        }

        shared.hideLoader(DOM.loader);

        //set focus
        DOM.brandName.focus();

    }

    function deleteBrand(currentTableRow) {

        var table = DOM.brandList;

        var tableBody = table.tBodies[0];
        
        /* temp variable */
        var brandId = parseInt(currentTableRow.getAttribute('data-brand-id'));

        if (isNaN(brandId)) { brandId = 0; }

        var brand = {};

        brand = {
            BrandId: brandId,
            DeletedBy: parseInt(LOGGED_USER),
            DeletedByIP: IP_ADDRESS
        };

        var postData = JSON.stringify(brand);
        
        shared.sendRequest(SERVICE_PATH + 'DeleteBrand', "POST", true, "JSON", postData, function (response) {
            if (response.status === 200) {
                if (response.responseText === "true") {
                    tableBody.removeChild(currentTableRow);
                }
            }
        });

    }

    function showSelectedBrand(brandId) {

        if (brands.length > 0) {

            for (var c = 0; c < brands.length; c++) {

                if (brands[c].BrandId === brandId) {

                    //assign text to input
                    DOM.brandName.setAttribute('data-brand-id', brandId);

                    DOM.brandName.value = brands[c].BrandName;
                }
            }
        }

        shared.showPanel(DOM.editMode);
        shared.hidePanel(DOM.viewMode);

        DOM.brandName.focus();
    }

    function saveBrand() {

        if (DOM.brandName.value === "") {
            swal("Error!!!", "Please enter the Brand Name.", "error");
            return;
        }

        /* temp variable */
        var brandId = parseInt(DOM.brandName.getAttribute('data-brand-id'));
        var brandName = DOM.brandName.value;

        if (isNaN(brandId)) { brandId = 0; }

        var brand = {};

            brand = {
                BrandId: brandId,
                BrandName: brandName
            };

        if (parseInt(brandId) === parseInt(0)) {

            brand.CreatedBy = parseInt(LOGGED_USER);
            brand.CreatedByIP = IP_ADDRESS;            
        }
        else {
            brand.ModifiedBy = parseInt(LOGGED_USER);
            brand.ModifiedByIP = IP_ADDRESS;            
        }

        var postData = JSON.stringify(brand);

        shared.sendRequest(SERVICE_PATH + "SaveBrand", "POST", true, "JSON", postData, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {
                if (parseInt(response.responseText) > parseInt(0)) {
                    swal({
                        title: "Success",
                        text: "Records Saved Successfully.",
                        type: "success"
                    }, function () {
                        getBrands();
                    });
                }
            }
            else {
                swal("error", "Unable to save the records. Error as " + _response.Message + " " + _response.ExceptionMessage, "error");
            }
        });

    }

    function getBrands() {

        shared.showLoader(DOM.loader);

        DOM.brandList.tBodies[0].innerHTML = "";

        brands.length = 0;

        shared.sendRequest(SERVICE_PATH + "GetAllBrands", "GET", true, "JSON", null, function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        brands = _response;

                        bindBrand();
                    }
                }
            }

            shared.hideLoader(DOM.loader);
        });

    }

    function bindBrand() {

        shared.showLoader(DOM.loader);

        DOM.brandList.tBodies[0].innerHTML = "";
        
        if (brands.length > 0) {

            var data = "";

            for (var r = 0; r < brands.length; r++) {

                data += "<tr data-brand-id=" + brands[r].BrandId + ">";
                data += "<td><label class='label-tick'> <input type='checkbox' id='" + brands[r].BrandId + "' class='label-checkbox' name='SelectBrand' /> <span class='label-text'></span> </label>" + "</td>";
                data += "<td>" + brands[r].SrNo + "</td>";
                data += "<td>" + brands[r].BrandName + "</td>";
                data += '</tr>';
            }

            DOM.brandList.tBodies[0].innerHTML = data;            
        }

        shared.showPanel(DOM.viewMode);
        shared.hidePanel(DOM.editMode);

        DOM.brandList.focus();

        shared.hideLoader(DOM.loader);
    }
    
    
    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        bindEvents();
        addNewBrand();
    }

    return {
        init: init
    };

}());


SharpiTech.Brand.init();
