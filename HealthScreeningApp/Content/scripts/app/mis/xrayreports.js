

var Sofarch = {};

Sofarch.XrayReports = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var stock = [];

    /* --- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');
        DOM.viewMode = document.getElementById('ViewMode');

        DOM.editMode = document.getElementById('EditMode');

        DOM.date = document.getElementById('FromDate');

        DOM.printStockReport = document.getElementById('StockReportPrintList');

        DOM.$StockReportDatePicker1 = $('#StockDateDatePicker1');


    }

    function applyPlugins() {



        var currentDate = new Date();

        DOM.$StockReportDatePicker1.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });
        ;

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

        DOM.printStockReport.addEventListener('click', printstockreport);

    }

    function printstockreport() {

        shared.showLoader(DOM.loader);



        var print = {};

        var date = DOM.date.value;


        var folderName = 'StockReport';

        print = {
            Date: date
        };

        var postData = JSON.stringify(print);

        shared.sendRequest(SERVICE_PATH + "XrayStockReportPrint", "POST", true, "JSON", postData, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            window.open(location.origin + "/HealthScreeningApp/ApplicationFiles/" + folderName + "/X-RayStockDetailsReport.pdf", "_blank");

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


Sofarch.XrayReports.init();
