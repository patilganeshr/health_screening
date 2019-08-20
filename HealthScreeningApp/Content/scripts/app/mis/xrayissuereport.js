

var Sofarch = {};

Sofarch.xrayissuereport = (function () {

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

      
        DOM.fromdateissue = document.getElementById('FromDateIssue');
        DOM.todateIssue = document.getElementById('ToDateIssue');

        DOM.issueStockReport = document.getElementById('IssueReportPrintList');

        DOM.$IssueReportDatePicker1 = $('#IssueDateDatePicker1');
        DOM.$IssueReportDatePicker2 = $('#IssueDateDatePicker2');



    }

    function applyPlugins() {



       

        var currentDate = new Date();

        DOM.$IssueReportDatePicker1.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });
       

        DOM.$IssueReportDatePicker2.datetimepicker({
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

        DOM.issueStockReport.addEventListener('click', issueStockReport);

    }

    function issueStockReport() {

        shared.showLoader(DOM.loader);

        var print = {};

        var fromdate = DOM.fromdateissue.value;
        var todate = DOM.todateIssue.value;


        var folderName = 'StockReport';

        print = {
            FromDate: fromdate,
            ToDate: todate

        };

        var postData = JSON.stringify(print);

        shared.sendRequest(SERVICE_PATH + "XrayIssueReportPrint", "POST", true, "JSON", postData, function (response) {

            shared.showLoader(DOM.loader);

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response !== undefined) {

                        if (_response.length > 0) {

                            window.open(location.origin + "/HealthScreeningApp/ApplicationFiles/" + folderName + "/XrayIssueReport.pdf", "_blank");

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


Sofarch.xrayissuereport.init();
