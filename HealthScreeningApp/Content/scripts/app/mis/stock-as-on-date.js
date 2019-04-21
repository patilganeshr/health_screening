

var SharpiTech = {};

SharpiTech.StockReport = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var stockDetails = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');
        DOM.generateStockReport = document.getElementById('GenerateStockReport');
        DOM.printStockReport =  document.getElementById('PrintStockReport');
        DOM.filterStockReport = document.getElementById('FilterStockReport');
        DOM.exportStockReport = document.getElementById('ExportStockReport');

        DOM.stockReport = document.getElementById('StockReport');

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
    }

    function bindEvents() {

        DOM.generateStockReport.addEventListener('click', generateStockReport);
        DOM.printStockReport.addEventListener('click', printStockReport);
     //   DOM.filterStockReport.addEventListener('click', filterStockReport);
        DOM.exportStockReport.addEventListener('click', exportStockReport);        
    }

    function loadData() {
        
        //getStockData();
        getStockAsOnDateByItemwiseWithPurchaseCost();
    }

    function generateStockReport() {

        shared.showLoader(DOM.loader);
                
        stockDetails.length = 0;

        //getStockData();

        getStockAsOnDateByItemwiseWithPurchaseCost();
    }

    
    function bindStockData() {

        // Check the _charges list has values
        if (stockDetails.length > 0) {

            var tableBody = DOM.stockReport.tBodies[0];

            tableBody.innerHTML = "";

            // Check the stock details has values
            if (stockDetails.length > 0) {

                var data = "";

                for (var r = 0; r < stockDetails.length; r++) {

                    data = data + "<tr>";
                    data = data + "<td>" + stockDetails[r].ItemName + "</td>";
                    data = data + "<td>" + stockDetails[r].StockQty + "</td>";
                    data = data + "<td>" + stockDetails[r].UnitCode + "</td>";
                    data = data + "<td>" + stockDetails[r].PurchaseCost + "</td>";
                    //data = data + "<td>" + stockDetails[r].ItemName + "</td>";
                    //data = data + "<td>" + stockDetails[r].ItemQuality + "</td>";
                    //data = data + "<td>" + stockDetails[r].BrandName + "</td>";
                    //data = data + "<td>" + stockDetails[r].ItemCategoryName + "</td>";
                    //data = data + "<td>" + stockDetails[r].VendorName + "</td>";
                    //data = data + "<td>" + stockDetails[r].QtyInPcs + "</td>";
                    //data = data + "<td>" + stockDetails[r].QtyInMtrs + "</td>";
                    //data = data + "<td>" + stockDetails[r].LocationName + "</td>";
                    //data = data + "<td>" + stockDetails[r].CategoryA + "</td>";
                    //data = data + "<td>" + stockDetails[r].CategoryC + "</td>";
                    data = data + "</tr>";

                }

                tableBody.innerHTML = data;

            }
        }
    }
    
    function getStockData() {

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.stockReport.tBodies[0];

            tableBody.innerHTML = "";
                        
            shared.sendRequest(SERVICE_PATH + "GetStockASOnDate", "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res !== undefined) {

                            if (res.length > 0) {
                                
                                for (var r = 0; r < res.length; r++) {

                                    var stock = {};

                                    stock = {
                                        ItemName: res[r].ItemName,
                                        ItemQuality: res[r].ItemQuality,
                                        BrandName: res[r].BrandName,
                                        ItemCategoryName: res[r].ItemCategoryName,
                                        VendorName: res[r].VendorName,
                                        QtyInPcs: res[r].QtyInPcs,
                                        QtyInMtrs: res[r].QtyInMtrs,
                                        LocationName: res[r].LocationName,
                                        CategoryA: res[r].CategoryA,
                                        CategoryC: res[r].CategoryC
                                    };

                                    stockDetails.push(stock);                                    
                                }

                                bindStockData();
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

    function getStockAsOnDateByItemwiseWithPurchaseCost() {

        stockDetails.length = 0;

        shared.showLoader(DOM.loader);

        try {

            var tableBody = DOM.stockReport.tBodies[0];

            tableBody.innerHTML = "";
                        
            shared.sendRequest(SERVICE_PATH + "GetStockAsOnDateByItemwiseWithPurchaseCost", "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res !== undefined) {

                            if (res.length > 0) {
                                
                                for (var r = 0; r < res.length; r++) {

                                    var stock = {};

                                    stock = {
                                        ItemName: res[r].ItemName,
                                        StockQty: res[r].StockQty,
                                        UnitCode: res[r].UnitCode,
                                        PurchaseCost: res[r].PurchaseCost
                                    };

                                    stockDetails.push(stock);                                    
                                }

                                bindStockData();
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
        tab = DOM.stockReport; // id of table

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


SharpiTech.StockReport.init();
