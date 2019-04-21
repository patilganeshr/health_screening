﻿
var SharpiTech = {};

SharpiTech.SalesmanwiseSaleQtyReport = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var reportData = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');
        DOM.salesman = document.getElementById('Salesman');
        DOM.fromBillDate = document.getElementById('FromBillDate');
        DOM.toBillDate = document.getElementById('ToBillDate');
        DOM.fromBillDateDatePicker = document.getElementById('FromBillDateDatePicker');
        DOM.toBillDateDatePicker = document.getElementById('toBillDateDatePicker');
        DOM.reportFilterOption = document.getElementById('ReportFilterOption');
        DOM.generateSaleQtyReport = document.getElementById('GenerateSaleQtyReport');
        DOM.printSalesReport =  document.getElementById('PrintSalesReport');
        DOM.filterSalesReport = document.getElementById('FilterSalesReport');
        DOM.exportSalesReport = document.getElementById('ExportSalesReport');

        DOM.salesmanwiseSaleQtyReport= document.getElementById('SalesmanwiseSaleQtyReport');

        DOM.$fromBillDateDatePicker = $('#FromBillDateDatePicker');
        DOM.$toBillDateDatePicker = $('#ToBillDateDatePicker');

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

        DOM.$fromBillDateDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

        DOM.$toBillDateDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

    }

    function bindEvents() {

        DOM.generateSaleQtyReport.addEventListener('click', generateSaleQtyReport);
        DOM.printSalesReport.addEventListener('click', printStockReport);
        DOM.exportSalesReport.addEventListener('click', exportStockReport);        

        DOM.reportFilterOption.onchange = function () {
            enableDisableControls();
        };

    }

    function loadData() {

        var reportFilterOptions = [];

        reportFilterOptions = [
            {
                filterOption: "Sales Value",
                filterOptionValue: 0
            }
            //{
            //    filterOption: "Sale Qty",
            //    filterOptionValue: 0
            //},
            //{
            //    filterOption: "Sale Rate And Purchase Rate",
            //    filterOptionValue: 1
            //}
        ];

        shared.fillDropdownWithArrayData(reportFilterOptions, DOM.reportFilterOption, "filterOption", "filterOptionValue", "Choose Filter Option");

        getSalesman();

        enableDisableControls();

        shared.hideLoader(DOM.loader);
    }

    function enableDisableControls() {

        var reportFilterOptionValue = getReportFilterOptionValue();

        //if (reportFilterOptionValue === "0") {

        //    DOM.item.disabled = true;
        //    DOM.itemCategory.disabled = true;
        //    DOM.location.disabled = true;

        //}
        //else if (reportFilterOptionValue === "1") {

        //    DOM.item.disabled = false;
        //    DOM.itemCategory.disabled = true;
        //    DOM.location.disabled = true;

        //}
        //else if (reportFilterOptionValue === "2") {

        //    DOM.item.disabled = true;
        //    DOM.itemCategory.disabled = false;
        //    DOM.location.disabled = true;

        //}
        //else if (reportFilterOptionValue === "3") {

        //    DOM.item.disabled = true;
        //    DOM.itemCategory.disabled = true;
        //    DOM.location.disabled = false;

        //}
    }

    //function getItem() {

    //    shared.showLoader(DOM.loader);

    //    shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllItems', DOM.item, "ItemName", "ItemId", "Choose Item", function (response) {

    //        if (response.status === 200) {

    //            if (response.responseText !== undefined) {

    //                shared.setSelectOptionByIndex(DOM.item, parseInt(0));
    //                shared.setSelect2ControlsText(DOM.item);
    //            }

    //            getItemCategory();
    //        }

    //        shared.hideLoader(DOM.loader);

    //    });
    //}

    //function getItemCategory() {

    //    shared.showLoader(DOM.loader);

    //    shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllItemCategories', DOM.itemCategory, "ItemCategoryName", "ItemCategoryId", "Choose Item Category", function (response) {

    //        if (response.status === 200) {

    //            if (response.responseText !== undefined) {

    //                var option = document.createElement('OPTION');
    //                option.innerHTML = "All";
    //                option.value = 0;
    //                DOM.itemCategory.insertBefore(option, DOM.itemCategory.childNodes[1]);
                                        
    //                shared.setSelectOptionByIndex(DOM.itemCategory, parseInt(0));
    //                shared.setSelect2ControlsText(DOM.itemCategory);
    //            }

    //            getLocations();

    //            shared.hideLoader(DOM.loader);

    //        }
    //    });
    //}

    //function getLocations() {

    //    shared.showLoader(DOM.loader);

    //    shared.fillDropdownWithCallback(SERVICE_PATH + 'GetBranchesByCompanyId/1', DOM.location, "BranchName", "BranchId", "Choose Location", function (response) {

    //        if (response.status === 200) {

    //            if (response.responseText !== undefined) {

    //                var option = document.createElement('OPTION');
    //                option.innerHTML = "All";
    //                option.value = 0;
    //                DOM.location.insertBefore(option, DOM.location.childNodes[1]);
                                                            
    //                shared.setSelectOptionByIndex(DOM.location, parseInt(0));
    //                shared.setSelect2ControlsText(DOM.location);
    //            }

    //            shared.hideLoader(DOM.loader);
    //        }
    //    });
    //}


    function getSalesman() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetEmployeesByDepartmentId/3', DOM.salesman, "FullName", "EmployeeId", "Choose Salesman", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.salesman, parseInt(0));
                    shared.setSelect2ControlsText(DOM.salesman);
                }

            }

            shared.hideLoader(DOM.loader);
            
        });

        
    }

    function generateSaleQtyReport() {

        shared.showLoader(DOM.loader);
                
        reportData.length = 0;

        getSaleQtyReportData();

        shared.hideLoader(DOM.loader);
    }

    var createTableHeader = function (data, excludeListOfTableHeaderCaption) {

        var tableHeader = document.createElement('thead');

        tableHeader.innerHTML = "";

        var tableHeaderRow = document.createElement('tr');

        if (data.length) {

            //for (var d = 0; d < data.length; d++) {

            for (var prop in data[0]) {

                var excludeList = excludeListOfTableHeaderCaption.filter(function (value, index, array) {
                    return value.toLowerCase() === prop.toLowerCase();
                });

                //for (var ex = 0; ex < excludeListOfTableHeaderCaption.length; ex++) {

                if (excludeList.length === 0) {

                    var tableHeaderCaption = document.createElement('th');

                    tableHeaderCaption.innerText = getTableHeaderCaption(prop);

                    tableHeaderRow.appendChild(tableHeaderCaption);
                }
                //}         
                //}
            }
        }

        tableHeader.appendChild(tableHeaderRow);

        return tableHeader;
    };

    var getTableHeaderCaption = function (tableHeaderCaption) {

        var caption = "";

        for (var cl = 0; cl < tableHeaderCaption.length; cl++) {

            if (tableHeaderCaption.charAt(cl) === tableHeaderCaption.charAt(cl).toUpperCase()) {

                if (cl === 0) {
                    caption += tableHeaderCaption.charAt(0);
                }
                else {
                    caption += " " + tableHeaderCaption.charAt(cl);
                }

            }
            else {
                caption += tableHeaderCaption.charAt(cl);
            }

        }

        return caption;
    };

    var createTableBody = function (data, excludeListOfTableHeaderCaption) {

        var tableBody = document.createElement('tbody');

        tableBody.innerHTML = "";

        if (data.length) {

            for (var d = 0; d < data.length; d++) {

                var tableBodyRow = document.createElement('tr');

                for (var prop in data[d]) {

                    var excludeList = excludeListOfTableHeaderCaption.filter(function (value, index, array) {
                        return value.toLowerCase() === prop.toLowerCase();
                    });

                    if (excludeList.length === 0) {

                        var tableDetails = document.createElement('td');

                        tableDetails.innerText = data[d][prop];

                        tableBodyRow.appendChild(tableDetails);
                    }
                }

                tableBody.appendChild(tableBodyRow);

            }
        }

        return tableBody;
    };

    function bindSaleQtyData() {

        // Check the Stock Report Data has values
        if (reportData.length > 0) {

            var excludeListOfTableHeaders = [
                'SalesmanId',
                'CompanyId',
                'BranchId',
                'MonthId',
                'SaleTypeId',
                'ItemCategoryId',
                'ItemQualityId',
                'ItemId',
                'GoodsReceiptItemId',
                'UnitOfMeasurementId',
                'SaleQty',
                'UnitCode'
            ];

            var reportFilterOptionValue = getReportFilterOptionValue();

            if (reportFilterOptionValue !== null) {

                if (reportFilterOptionValue === "0") {

                    excludeListOfTableHeaders.push("SaleRate");
                    excludeListOfTableHeaders.push("PurchaseRate");
                }
                //else if (reportFilterOptionValue === "1") {

                //    excludeListOfTableHeaders.push("ItemCategoryName");
                //    excludeListOfTableHeaders.push("LocationName");
                //}
                //else if (reportFilterOptionValue === "2") {

                //    excludeListOfTableHeaders.push("ItemQuality");                    
                //    excludeListOfTableHeaders.push("ItemName");
                //    excludeListOfTableHeaders.push("LocationName");
                //    excludeListOfTableHeaders.push("UnitCode");
                //}
                //else if (reportFilterOptionValue === "3") {

        
                //    excludeListOfTableHeaders.push("ItemCategoryName");
                //}
            }

            if (DOM.salesmanwiseSaleQtyReport.hasChildNodes('thead')) {
                if (DOM.salesmanwiseSaleQtyReport.tHead !== null) {
                    DOM.salesmanwiseSaleQtyReport.tHead.remove();
                }
            }

            if (DOM.salesmanwiseSaleQtyReport.hasChildNodes('tbody')) {
                if (DOM.salesmanwiseSaleQtyReport.tBodies.length ) {
                    DOM.salesmanwiseSaleQtyReport.tBodies[0].remove();
                }
            }

            var tableHeader = createTableHeader(reportData, excludeListOfTableHeaders);

            var tableBody = createTableBody(reportData, excludeListOfTableHeaders);

            DOM.salesmanwiseSaleQtyReport.appendChild(tableHeader);

            DOM.salesmanwiseSaleQtyReport.appendChild(tableBody);            
        }
    }

    var getReportFilterOptionValue = function () {

        var reportFilterOptionSelectedIndex = parseInt(0);

        var reportFilterOptionValue = "0";

        reportFilterOptionSelectedIndex = DOM.reportFilterOption.selectedIndex;

        if (reportFilterOptionSelectedIndex > 0) {

            reportFilterOptionValue = DOM.reportFilterOption.options[reportFilterOptionSelectedIndex].value;
        }

        return reportFilterOptionValue;

    };

    var getReportURL = function () {

        var url = "";
        var reportFilterOptionValue = null;


        reportFilterOptionValue = getReportFilterOptionValue();

        if (reportFilterOptionValue === "0") {
            //url = "GetDailySalesQtyReport/";
            url = "GetSalesmanwiseItemwiseDailySalesValueReport";

        }
        else if (reportFilterOptionValue === "1") {
            url = "GetDailySalesQtyReportWithSaleRateAndPurchaseRate/";
            
        }
        
        return url;
    };

    function getSaleQtyReportData() {

        shared.showLoader(DOM.loader);

        try {

            var reportParameters = {
                SalesmanId: parseInt(DOM.salesman.options[DOM.salesman.selectedIndex].value),
                FromBillDate: DOM.fromBillDate.value,
                ToBillDate: DOM.toBillDate.value
            };

            var postData = JSON.stringify(reportParameters);

            var url = getReportURL();

            shared.sendRequest(SERVICE_PATH + url, "POST", true, "JSON", postData, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res !== undefined) {

                            if (res.length > 0) {
                                
                                reportData = res;

                                bindSaleQtyData();
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
    
    function printStockReport() {

    }

    function exportStockReport() {

        fnExcelReport();
    }

    function fnExcelReport() {
        var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
        var textRange; var j = 0;
        tab = DOM.salesmanwiseSaleQtyReport; // id of table

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

        return sa;
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


SharpiTech.SalesmanwiseSaleQtyReport.init();
