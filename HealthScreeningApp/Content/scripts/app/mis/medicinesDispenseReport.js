

var Sofarch = {};

Sofarch.medicinesDispense = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var medicinesDispense = [];

    /* --- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');
        DOM.viewMode = document.getElementById('ViewMode');

        DOM.editMode = document.getElementById('EditMode');




        DOM.fromdate = document.getElementById('FromDate');
        DOM.todate = document.getElementById('ToDate');

        DOM.printmedicinesdispenseReport = document.getElementById('PrintmedicinesDispense');

        DOM.$medicinesDispenseDateDatePicker1 = $('#medicinesDispenseDateDatePicker1');
        DOM.$medicinesDispenseDateDatePicker2 = $('#medicinesDispenseDateDatePicker2');

    }

    function applyPlugins() {



        var currentDate = new Date();

        DOM.$medicinesDispenseDateDatePicker1.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });
        DOM.$medicinesDispenseDateDatePicker2.datetimepicker({
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

        DOM.printmedicinesdispenseReport.addEventListener('click', PrintmedicinesDispenseReport);

    }

    function PrintmedicinesDispenseReport() {

        shared.showLoader(DOM.loader);



        var print = {};

        var fromdate = DOM.fromdate.value;
        var todate = DOM.todate.value;

        var folderName = 'PreEmploymentDetails';

        print = {
            FromDate: fromdate,
            ToDate: todate

        };

        var postData = JSON.stringify(print);

        shared.sendRequest(SERVICE_PATH + "medicinesDispenseReport", "POST", true, "JSON", postData, function (response) {

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





    /* ---- public methods ---- */
    function init() {
        cacheDOM();
        applyPlugins();
        bindEvents();
    }

    return {
        init: init
    };

}());


Sofarch.medicinesDispense.init();
