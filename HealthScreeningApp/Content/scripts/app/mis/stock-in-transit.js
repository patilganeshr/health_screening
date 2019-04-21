﻿

var SharpiTech = {};

SharpiTech.StockInTransit = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var stockInTransits = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.printStockInTransitDetails = document.getElementById('PrintStockInTransitDetails');
        DOM.exportStockInTransitDetails = document.getElementById('ExportStockInTransitDetails');

        //DOM.reportByFinancialYear = document.getElementById('ReportByFinancialYear');
        //DOM.reportByVendor = document.getElementById('ReportByVendor');
        //DOM.reportByFromToDate = document.getElementById('ReportByFromToDate');
        //DOM.reportByFinancialYearAndVendor = document.getElementById('ReportByFinancialYearAndVendor');
        //DOM.reportByVendorAndFromToDate = document.getElementById('RepotByVendorAndFromToDate');
        //DOM.financialYear = document.getElementById('FinancialYear');
        //DOM.vendor = document.getElementById('Vendor');
        //DOM.fromDate = document.getElementById('FromDate');
        //DOM.fromDatePicker = document.getElementById('FromDatePicker');
        //DOM.toDate = document.getElementById('ToDate');
        //DOM.toDatePicker = document.getElementById('ToDatePicker');
        //DOM.generateReport = document.getElementById('GenerateReport');

        //DOM.$fromDatePicker = $('#FromDatePicker');
        //DOM.$toDatePicker = $('#ToDatePicker');

        DOM.stockInTransitList = document.getElementById('StockInTransitList');
    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function applyPlugins() {

        //$('select').select2();
        
        var currentDate = new Date();

        //DOM.$fromDatePicker.datetimepicker({
        //    format: 'DD/MMM/YYYY',
        //    defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        //});

        //DOM.$toDatePicker.datetimepicker({
        //    format: 'DD/MMM/YYYY'
        //});
    }

    function bindEvents() {

        //DOM.generateReport.addEventListener('click', generatePurchaseBillRegister);
        DOM.printStockInTransitDetails.addEventListener('click', printStockInTransitDetails);
        DOM.exportStockInTransitDetails.addEventListener('click', exportStockInTransitDetails);

        //DOM.reportByFinancialYear.onclick = showFilterCriteria;
        //DOM.reportByVendor.onclick = showFilterCriteria;
        //DOM.reportByFromToDate.onclick = showFilterCriteria;
        //DOM.reportByFinancialYearAndVendor.onclick = showFilterCriteria;
        //DOM.reportByVendorAndFromToDate.onclick = showFilterCriteria;
    }

    function showFilterCriteria() {

        if (DOM.reportByFinancialYear.checked) {
            DOM.financialYear.disabled = false;
            DOM.vendor.disabled = true;
            DOM.fromDate.disabled = true;
            DOM.toDate.disabled = true;
        }
        else if (DOM.reportByVendor.checked) {
            DOM.vendor.disabled = false;
            DOM.financialYear.disabled = true;
            DOM.fromDate.disabled = true;
            DOM.toDate.disabled = true;
        }
        else if (DOM.reportByFromToDate.checked) {
            DOM.fromDate.disabled = false;
            DOM.toDate.disabled = false;
            DOM.vendor.disabled = true;
            DOM.financialYear.disabled = true;            
        }
        else if (DOM.reportByFinancialYearAndVendor.checked) {            
            DOM.vendor.disabled = false;
            DOM.financialYear.disabled = false;
            DOM.fromDate.disabled = true;
            DOM.toDate.disabled = true;
        }
        else if (DOM.reportByVendorAndFromToDate.checked) {            
            DOM.vendor.disabled = false;
            DOM.financialYear.disabled = true;
            DOM.fromDate.disabled = false;
            DOM.toDate.disabled = false;
        }
    }

    function loadData() {

        //getFinancialYear();
        //getVendor();

        //DOM.reportByFinancialYear.checked = true;

        //showFilterCriteria();

        getStockInTransit();
    }

    function getFinancialYear() {

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(0));
                    shared.setSelect2ControlsText(DOM.financialYear);
                }
            }
        });
    }

    function getVendor() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/2', DOM.vendor, "ClientAddressName", "ClientAddressId", "Choose Vendor", function (response) {
            if (response.status === 200) {
                shared.setSelectOptionByIndex(DOM.vendor, parseInt(0));
                shared.setSelect2ControlsText(DOM.vendor);
            }

            shared.hideLoader(DOM.loader);

        });
    }

    var getReportURL = function() {

        var url = "";

        if (DOM.reportByFinancialYear.checked) {
            if (DOM.financialYear.selectedIndex > 0) {
                url = "GetPurchaseBillRegisterByWorkingPeriod/" + DOM.financialYear.options[DOM.financialYear.selectedIndex].value;
            }
        }
        else if (DOM.reportByVendor.checked) {
            if (DOM.vendor.selectedIndex > 0) {
                url = "GetPurchaseBillRegisterByVendor/" + DOM.vendor.options[DOM.vendor.selectedIndex].value;
            }
        }
        else if (DOM.reportByFromToDate.checked) {
            if (DOM.fromDate.value !== "" && DOM.toDate.value !== '') {
                url = "GetPurchaseBillRegisterByPeriod"; // "/" + DOM.fromDate.value + '/' + DOM.toDate.value + '/';
            }
        }
        else if (DOM.reportByFinancialYearAndVendor.checked) {            
            if (DOM.financialYear.selectedIndex > 0 && DOM.vendor.selectedIndex > 0) {
                url = "GetPurchaseBillRegisterByWorkingPeriodAndVendor/" + DOM.financialYear.options[DOM.financialYear.selectedIndex].value + '/' + DOM.vendor.options[DOM.vendor.selectedIndex].value;
            }
        }
        else if (DOM.reportByVendorAndFromToDate.checked) {            
            if (DOM.vendor.selectedIndex > 0 && (DOM.fromDate.value !== "" && DOM.toDate.value !== "")) {
                url = "GetPurchaseBillRegisterByVendorAndFromToDate/" + DOM.vendor.options[DOM.vendor.selectedIndex].value + '/' + DOM.fromDate.value + '/' + DOM.toDate.value + '/';
            }
        }

        return url;
    }

    function getStockInTransit() {

        shared.showLoader(DOM.loader);

        stockInTransits.length = 0;

        try {

            var tableBody = DOM.stockInTransitList.tBodies[0];

            tableBody.innerHTML = "";
            
            shared.sendRequest(SERVICE_PATH + "GetStockInTransitDetails", "GET", true, "JSON", null, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res !== undefined) {

                            if (res.length) {

                                stockInTransits = res;

                                bindReportData();
                            }
                        }
                    }

                    shared.hideLoader(DOM.loader);
                }

                shared.hideLoader(DOM.loader);

            });

        }
        catch (e) {
            handleError("Error in application" + e.message);
        }
        finally {

            shared.hideLoader(DOM.loader);
        }
    }


    function bindReportData() {

        // Check the _charges list has values
        if (stockInTransits.length > 0) {

            var tableBody = DOM.stockInTransitList.tBodies[0];

            tableBody.innerHTML = "";

            // Check the purchase bill register details has values
            if (stockInTransits.length) {

                var data = "";

                for (var r = 0; r < stockInTransits.length; r++) {

                    data = data + "<tr>";
                    data = data + "<td>" + stockInTransits[r].VendorName + "</td>";
                    data = data + "<td>" + stockInTransits[r].ItemName + "</td>";
                    data = data + "<td>" + stockInTransits[r].PurchaseBillNo + "</td>";
                    data = data + "<td>" + stockInTransits[r].PurchaseBillDate + "</td>";
                    data = data + "<td>" + stockInTransits[r].TransporterName + "</td>";
                    data = data + "<td>" + stockInTransits[r].LRNo + "</td>";
                    data = data + "<td>" + stockInTransits[r].PurchaseQty + "</td>";
                    data = data + "<td>" + stockInTransits[r].UnitCode + "</td>";
                    data = data + "<td>" + stockInTransits[r].PurchaseRate + "</td>";
                    data = data + "<td>" + stockInTransits[r].TotalAmount + "</td>";
                    data = data + "</tr>";

                }

                tableBody.innerHTML = data;

            }
        }
    }
    
    
    function printStockInTransitDetails() {

    }

    function exportStockInTransitDetails() {

        fnExcelReport();
    }

    function fnExcelReport() {
        var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
        var textRange; var j = 0;
        tab = DOM.stockInTransitList; // id of table

        for (j = 0; j < tab.rows.length; j++) {
            tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
            //tab_text=tab_text+"</tr>";
        }

        tab_text = tab_text + "</table>";
        tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
        tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
        tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
        {
            txtArea1.document.open("txt/html", "replace");
            txtArea1.document.write(tab_text);
            txtArea1.document.close();
            txtArea1.focus();
            sa = txtArea1.document.execCommand("SaveAs", true, "Test.xls");
        }
        else                 //other browser not tested on IE 11
            sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));

        return (sa);
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


SharpiTech.StockInTransit.init();
