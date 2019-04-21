
var SharpiTech = {};

SharpiTech.SalesBillRegister = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var SalesBillsRegister = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.printSalesBillRegister = document.getElementById('PrintSalesBillRegister');
        DOM.exportSalesBillRegister = document.getElementById('ExportSalesBillRegister');

        DOM.reportByFinancialYear = document.getElementById('ReportByFinancialYear');
        DOM.reportByCustomer = document.getElementById('ReportByCustomer');
        DOM.reportByFromToDate = document.getElementById('ReportByFromToDate');
        DOM.reportByFinancialYearAndCustomer = document.getElementById('ReportByFinancialYearAndCustomer');
        DOM.reportByCustomerAndFromToDate = document.getElementById('RepotByCustomerAndFromToDate');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.customer = document.getElementById('Customer');
        DOM.fromDate = document.getElementById('FromDate');
        DOM.fromDatePicker = document.getElementById('FromDatePicker');
        DOM.toDate = document.getElementById('ToDate');
        DOM.toDatePicker = document.getElementById('ToDatePicker');
        DOM.generateReport = document.getElementById('GenerateReport');

        DOM.$fromDatePicker = $('#FromDatePicker');
        DOM.$toDatePicker = $('#ToDatePicker');

        DOM.salesBillsRegisterList = document.getElementById('SalesBillRegisterList');
    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    function applyPlugins() {

        $('select').select2();
        
        var currentDate = new Date();

        DOM.$fromDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

        DOM.$toDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY'
        });
    }

    function bindEvents() {

        DOM.generateReport.addEventListener('click', generateSalesBillRegister);
        DOM.printSalesBillRegister.addEventListener('click', printSalesBillRegister);
        DOM.exportSalesBillRegister.addEventListener('click', exportSalesBillRegister);

        DOM.reportByFinancialYear.onclick = showFilterCriteria;
        DOM.reportByCustomer.onclick = showFilterCriteria;
        DOM.reportByFromToDate.onclick = showFilterCriteria;
        DOM.reportByFinancialYearAndCustomer.onclick = showFilterCriteria;
        DOM.reportByCustomerAndFromToDate.onclick = showFilterCriteria;
    }

    function showFilterCriteria() {

        if (DOM.reportByFinancialYear.checked) {
            DOM.financialYear.disabled = false;
            DOM.customer.disabled = true;
            DOM.fromDate.disabled = true;
            DOM.toDate.disabled = true;
        }
        else if (DOM.reportByVendor.checked) {
            DOM.customer.disabled = false;
            DOM.financialYear.disabled = true;
            DOM.fromDate.disabled = true;
            DOM.toDate.disabled = true;
        }
        else if (DOM.reportByFromToDate.checked) {
            DOM.fromDate.disabled = false;
            DOM.toDate.disabled = false;
            DOM.customer.disabled = true;
            DOM.financialYear.disabled = true;            
        }
        else if (DOM.reportByFinancialYearAndVendor.checked) {            
            DOM.customer.disabled = false;
            DOM.financialYear.disabled = false;
            DOM.fromDate.disabled = true;
            DOM.toDate.disabled = true;
        }
        else if (DOM.reportByVendorAndFromToDate.checked) {            
            DOM.customer.disabled = false;
            DOM.financialYear.disabled = true;
            DOM.fromDate.disabled = false;
            DOM.toDate.disabled = false;
        }
    }

    function loadData() {

        getFinancialYear();
        getCustomer();

        DOM.reportByFinancialYear.checked = true;

        showFilterCriteria();
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

    function getCustomer() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetClientAddressNamesByClientTypeId/1', DOM.customer, "ClientAddressName", "ClientAddressId", "Choose Vendor", function (response) {
            if (response.status === 200) {
                shared.setSelectOptionByIndex(DOM.customer, parseInt(0));
                shared.setSelect2ControlsText(DOM.customer);
            }

            shared.hideLoader(DOM.loader);

        });
    }

    var getReportURL = function() {

        var url = "";

        if (DOM.reportByFinancialYear.checked) {
            if (DOM.financialYear.selectedIndex > 0) {
                url = "GetSalesBillRegisterByWorkingPeriod/" + DOM.financialYear.options[DOM.financialYear.selectedIndex].value;
            }
        }
        else if (DOM.reportByCustomer.checked) {
            if (DOM.customer.selectedIndex > 0) {
                url = "GetSalesBillRegisterByCustomer/" + DOM.customer.options[DOM.customer.selectedIndex].value;
            }
        }
        else if (DOM.reportByFromToDate.checked) {
            if (DOM.fromDate.value !== "" && DOM.toDate.value !== '') {
                url = "GetSalesBillRegisterByFromToDate"; // "/" + DOM.fromDate.value + '/' + DOM.toDate.value + '/';
            }
        }
        else if (DOM.reportByFinancialYearAndVendor.checked) {            
            if (DOM.financialYear.selectedIndex > 0 && DOM.customer.selectedIndex > 0) {
                url = "GetSalesBillRegisterByCustomerAndWorkingPeriodId/" + DOM.customer.options[DOM.customer.selectedIndex].value + '/' + DOM.financialYear.options[DOM.financialYear.selectedIndex].value;
            }
        }
        else if (DOM.reportByCustomerAndFromToDate.checked) {            
            if (DOM.customer.selectedIndex > 0 && (DOM.fromDate.value !== "" && DOM.toDate.value !== "")) {
                url = "GetSalesBillRegisterByCustomerAndFromToDate/" //+ DOM.customer.options[DOM.customer.selectedIndex].value + '/' + DOM.fromDate.value + '/' + DOM.toDate.value + '/';
            }
        }

        return url;
    }

    function generateSalesBillRegister() {

        shared.showLoader(DOM.loader);
                
        DOM.salesBillsRegisterList.length = 0;

        try {

            var tableBody = DOM.salesBillsRegisterList.tBodies[0];

            tableBody.innerHTML = "";

            var url = getReportURL();

            if (DOM.reportByFromToDate.checked || DOM.reportByCustomerAndFromToDate.checked) {

                var report = {};

                report = {
                    FromDate: DOM.fromDate.value,
                    ToDate: DOM.toDate.value
                };

                if (DOM.reportByCustomerAndFromToDate.checked) {
                    report.CustomerId = DOM.customer.options[DOM.customer.selectedIndex].value;
                }

                var postdata = JSON.stringify(report);

                shared.sendRequest(SERVICE_PATH + url, "POST", true, "JSON", postdata, function (response) {

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            var res = JSON.parse(response.responseText);

                            if (res !== undefined) {

                                if (res.length) {

                                    SalesBillsRegister = res;

                                    bindReportData();
                                }
                            }
                        }

                        shared.hideLoader(DOM.loader);
                    }

                    shared.hideLoader(DOM.loader);

                });
            }
            else if (DOM.reportByCustomerAndFromToDate.checked) {

                shared.sendRequest(SERVICE_PATH + url, "GET", true, "JSON", null, function (response) {

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            var res = JSON.parse(response.responseText);

                            if (res !== undefined) {

                                if (res.length) {

                                    SalesBillsRegister = res;

                                    bindReportData();
                                }
                            }
                        }

                        shared.hideLoader(DOM.loader);
                    }

                    shared.hideLoader(DOM.loader);

                });
            }
            else {
                shared.sendRequest(SERVICE_PATH + url, "GET", true, "JSON", null, function (response) {

                    if (response.status === 200) {

                        if (response.responseText !== undefined) {

                            var res = JSON.parse(response.responseText);

                            if (res !== undefined) {

                                if (res.length) {

                                    SalesBillsRegister = res;

                                    bindReportData();
                                }
                            }
                        }

                        shared.hideLoader(DOM.loader);
                    }

                    shared.hideLoader(DOM.loader);

                });
            }
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
        if (SalesBillsRegister.length > 0) {

            var tableBody = DOM.salesBillsRegisterList.tBodies[0];

            tableBody.innerHTML = "";

            // Check the Sales bill register details has values
            if (SalesBillsRegister.length) {

                var data = "";

                for (var r = 0; r < SalesBillsRegister.length; r++) {

                    data = data + "<tr>";
                    data = data + "<td class='text-center'>" + SalesBillsRegister[r].SalesBillNo + "</td>";
                    data = data + "<td class='text-center'>" + SalesBillsRegister[r].SalesBillDate + "</td>";                    
                    data = data + "<td class='text-left'>" + SalesBillsRegister[r].CustomerName + "</td>";
                    data = data + "<td class='text-center'>" + SalesBillsRegister[r].LRNo + "</td>";
                    data = data + "<td class='text-center'>" + SalesBillsRegister[r].TransporterName + "</td>";
                    data = data + "<td class='text-right'>" + SalesBillsRegister[r].TaxableValue + "</td>";
                    data = data + "<td class='text-right'>" + SalesBillsRegister[r].GSTAmount + "</td>";
                    data = data + "<td class='text-right'>" + SalesBillsRegister[r].TotalItemAmount + "</td>";
                    data = data + "<td class='text-right'>" + SalesBillsRegister[r].RoundOffAmount + "</td>";
                    data = data + "</tr>";

                }

                tableBody.innerHTML = data;

            }
        }
    }
    
    
    function printSalesBillRegister() {

    }

    function exportSalesBillRegister() {

        fnExcelReport();
    }

    function fnExcelReport() {
        var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
        var textRange; var j = 0;
        tab = DOM.salesBillsRegisterList; // id of table

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


SharpiTech.SalesBillRegister.init();
