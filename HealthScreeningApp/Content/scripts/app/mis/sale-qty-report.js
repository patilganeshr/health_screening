
var SharpiTech = {};

SharpiTech.SaleQtyReport = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var saleQtyReportData = [];
    var itemQualitywiseData = [];
    var itemwiseData = [];

    /* ---- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');
        //DOM.item = document.getElementById('Item');
        //DOM.itemCategory = document.getElementById('ItemCategory');
        //DOM.location = document.getElementById('Location');
        DOM.reportFilterOption = document.getElementById('ReportFilterOption');
        DOM.generateSaleQtyReport = document.getElementById('GenerateSaleQtyReport');
        DOM.printSaleQtyReport =  document.getElementById('PrintSaleQtyReport');
        DOM.filterSaleQtyReport = document.getElementById('FilterSaleQtyReport');
        DOM.exportSaleQtyReport = document.getElementById('ExportSaleQtyReport');

        DOM.company = document.getElementById('Company');
        DOM.branch = document.getElementById('Branch');
        DOM.month = document.getElementById('Month');
        DOM.salesType = document.getElementById('SalesType');
        DOM.unitCode = document.getElementById('UnitCode');


        DOM.saleQtyReport = document.getElementById('SaleQtyReport');

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

        DOM.generateSaleQtyReport.addEventListener('click', generateSaleQtyReport);
        DOM.printSaleQtyReport.addEventListener('click', printSaleQtyReport);
     //   DOM.filterSaleQtyReport.addEventListener('click', filterSaleQtyReport);
        DOM.exportSaleQtyReport.addEventListener('click', exportSaleQtyReport);        

        DOM.reportFilterOption.onchange = function () {
            //enableDisableControls();
        }

    }

    function loadData() {

        var reportFilterOptions = [];

        reportFilterOptions = [
            {
                filterOption: "By All Item Category",
                filterOptionValue: 0
            },
            {
                filterOption: "By ItemCategory and ItemQuality",
                filterOptionValue: 1
            },
            {
                filterOption: "By ItemCategory, ItemQuality and Itemwise",
                filterOptionValue: 2
            }
            //{
            //    filterOption: "By Location",
            //    filterOptionValue: 3
            //}
        ];

        shared.fillDropdownWithArrayData(reportFilterOptions, DOM.reportFilterOption, "filterOption", "filterOptionValue", "Choose Filter Option")
                
        getSaleQtyData();

        //enableDisableControls();
    }

    function enableDisableControls() {

        var reportFilterOptionValue = getReportFilterOptionValue();

        if (reportFilterOptionValue === "0") {

            DOM.item.disabled = true;
            DOM.itemCategory.disabled = true;
            DOM.location.disabled = true;

        }
        else if (reportFilterOptionValue === "1") {

            DOM.item.disabled = false;
            DOM.itemCategory.disabled = true;
            DOM.location.disabled = true;

        }
        else if (reportFilterOptionValue === "2") {

            DOM.item.disabled = true;
            DOM.itemCategory.disabled = false;
            DOM.location.disabled = true;

        }
        else if (reportFilterOptionValue === "3") {

            DOM.item.disabled = true;
            DOM.itemCategory.disabled = true;
            DOM.location.disabled = false;

        }
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

    function getItemCategory() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllItemCategories', DOM.itemCategory, "ItemCategoryName", "ItemCategoryId", "Choose Item Category", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var option = document.createElement('OPTION');
                    option.innerHTML = "All";
                    option.value = 0;
                    DOM.itemCategory.insertBefore(option, DOM.itemCategory.childNodes[1]);
                                        
                    shared.setSelectOptionByIndex(DOM.itemCategory, parseInt(0));
                    shared.setSelect2ControlsText(DOM.itemCategory);
                }

                shared.hideLoader(DOM.loader);

            }
        });
    }

    function getLocations() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetBranchesByCompanyId/1', DOM.location, "BranchName", "BranchId", "Choose Location", function (response) {

            if (response.status === 200) {

                if (response.responseText !== undefined) {

                    var option = document.createElement('OPTION');
                    option.innerHTML = "All";
                    option.value = 0;
                    DOM.location.insertBefore(option, DOM.location.childNodes[1]);
                                                            
                    shared.setSelectOptionByIndex(DOM.location, parseInt(0));
                    shared.setSelect2ControlsText(DOM.location);
                }

                shared.hideLoader(DOM.loader);
            }
        });
    }
    
    function generateSaleQtyReport() {

        shared.showLoader(DOM.loader);
                
        saleQtyReportData.length = 0;

        getSaleQtyData();
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

                        tableHeaderCaption.innerText = getTableHeaderCaption(prop);;

                        tableHeaderRow.appendChild(tableHeaderCaption);
                    }
                    //}         
                //}
            }
        }

        tableHeader.appendChild(tableHeaderRow);

        return tableHeader;
    }

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
    }

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
    }

    function fillReportFilterOptions() {

        //Bind Company Data
        bindListItems(saleQtyReportData, DOM.company, "CompanyName", "CompanyId");

        bindListItems(saleQtyReportData, DOM.branch, "BranchName", "BranchId");

        bindListItems(saleQtyReportData, DOM.month, "MonthName", "MonthId");

        bindListItems(saleQtyReportData, DOM.salesType, "SaleType", "SaleTypeId");

        bindListItems(saleQtyReportData, DOM.unitCode, "UnitCode", "UnitOfMeasurementId");

    }

    function bindListItems(data, element, displayField, valueField) {

        var itemsList = getReportFilterOptions(data, displayField, valueField);

        if (itemsList.length) {

            var fragment = document.createDocumentFragment();

            var ul = document.createElement('ul');

            ul.classList.add('list-group');

            for (var l = 0; l < itemsList.length; l++) {

                var displayText = itemsList[l];
                
                var li = document.createElement('li');

                li.classList.add('list-group-item');
                li.classList.add('clearfix');

                var id = getItemId(data, displayField, displayText, valueField);

                li.setAttribute('id', id);

                li.style.cursor = "pointer";
                li.textContent = displayText;

                var icon = document.createElement('i');

                icon.setAttribute('class', 'fa fa-check-circle fa-fw');

                li.appendChild(icon);

                fragment.appendChild(li);
            }

            ul.appendChild(fragment);

            element.appendChild(ul);
        }
    }

    function bindSalesQty(data, reportName) {

        if (saleQtyReportData.length) {

            fillReportFilterOptions();

            getItemCategorywise();
            
        }
    }

    var getReportFilterOptions = function (data, filterKey) {

        var reportFilterOptions;

        reportFilterOptions = data.map(function (value, index, array) {
            return value[filterKey];
        }).filter(function (val, indx, arr) {
            return arr.indexOf(val) === indx;
        });

        return reportFilterOptions;
    };

    var getColumnFilters = function (element, colFilters) {

        var filterValues = [];
        var count = 1;

        var li = element.querySelectorAll('li');

        if (li.length) {
            
            for (var l = 0; l < li.length; l++) {

                filterValues.push(li[l].textContent);
            }
        }

        return filterValues;
    };

    var getColumnFiltersLength = function (colFilters, keyToFind) {

        var count = 1;

            var keyIndex = getObjectKeyIndex(colFilters, keyToFind);

            if (keyIndex > 0) {

                for (var s = 0; s < keyIndex; s++) {

                    for (var key in colFilters) {

                        if (key === keyToFind) {
                            return count;
                        }

                        count = count * colFilters[key].length;
                    }
                }
            }

            //for (var key in colFilters) {

            //    if (colFilters.hasOwnProperty(key)) {

            //        if (colFilters[key][indx] !== indx) {

            //            count = count * colFilters[key].length;
            //        }
            //    }
            //}
        

        if (count === 0) {
            count = 1;
        }

        return count;
    };

    var getColumnValues = function (keyName, keyValue, valueField) {

        var colData;

        if (keyValue === undefined) {
            colData = saleQtyReportData.map(function (value, index, array) {
                return value[keyName];
            }).filter(function (value, index, arr) {
                return arr.indexOf(value) === index;
            });
        }
        else {
            colData = saleQtyReportData.filter(function (value, index, arr) {
                return value[keyName] === keyValue;
            }).map(function (value, index, array) {
                return value[valueField];
            }).filter(function (value, index, arr) {
                return arr.indexOf(value) === index;
            });
        }

        return colData;
    };

    var getItemId = function (reportData, filterKey, filterValue, valueId) {

        var itemId = reportData.filter(function (value, index, array) {
            return value[filterKey] === filterValue;
        }).map(function (value, index, array) {
            return value[valueId];
        }).filter(function (value, index, arr) {
            return arr.indexOf(value) === index;
        });

        return itemId[0];
    };

    var getSumOfQty = function (data, itemCategoryName, monthName, salesType, unitCode, parameters) {

        var sumQty = 0;

        var criteria = "";

        //if (parameters.length) {
        //    for (var o = 0; o < parameters.length; o++) {
        //        criteria += "value[" + parameters[o][0] + "].toLowerCase() === " + parameters[o][1] + " && ";
        //    }

        //    criteria = criteria.slice(0, criteria.lastIndexOf("&&"));
        //}

        //if (monthName === "Total") {

        //    sumQty = data.filter(function (value, index, array) {
        //        return value.ItemCategoryName === itemCategoryName &&
        //            value.SaleType.toLowerCase() === salesType &&
        //            value.UnitCode.toLowerCase() === unitCode;
        //    }).reduce(function (acc, curr) {
        //        return acc + curr.SaleQty;
        //    }, 0);
        //}
        //else {

            //sumQty = saleQtyReportData.filter(function (value, index, array) {
            //    return criteria;
            //}).reduce(function (acc, curr) {
            //    return acc + curr.SaleQty;
            //    }, 0);

            //sumQty = saleQtyReportData.filter(function (value, index, array) {
            //    return value.ItemCategoryName.toLowerCase() === itemCategoryName &&
            //        value.MonthName.toLowerCase() === monthName &&
            //        value.SaleType.toLowerCase() === salesType &&
            //        value.UnitCode.toLowerCase() === unitCode;
            //}).reduce(function (acc, curr) {
            //    return acc + curr.SaleQty;
            //    }, 0);

            var filtered = multiFilter(data, parameters);

            sumQty = filtered.reduce(function (acc, curr) {
                return acc + curr.SaleQty;
            }, 0);
        //}

        return sumQty;
    };

    var getTotalSumForItemCategory = function (obj) {

        //var criteria = "";

        //if (obj.length) {
        //    for (var o = 0; o < obj.length; o++) {
        //        criteria += "value[" + obj[o][0] + "].toLowerCase() === " + obj[o][1] + " && ";
        //    }

        //    criteria = criteria.slice(0, criteria.lastIndexOf("&&"));
        //}

        //sumQty = saleQtyReportData.filter(function (value, index, array) {
        //    return criteria;
        //    //value.ItemCategoryName.toLowerCase() === itemCategoryName &&
        //      //      value.SaleType.toLowerCase() === salesType &&
        //        //    value.UnitCode.toLowerCase() === unitCode;
        //    }).reduce(function (acc, curr) {
        //        return acc + curr.SaleQty;
        //    }, 0);


    };

    function multiFilter(array, filters) {

        var filterKeys = Object.keys(filters);

        return array.filter(function (item) {

            return filterKeys.every(function (key) {

                return !!~filters[key].indexOf(item[key]);

            });

        });

    }

    var getObjectSize = function (obj) {

        var size = 0;

        for (var key in obj) {

            if (obj.hasOwnProperty(key)) {
                size++;
            }
        }

        return size;
    };

    
    var getObjectKeyIndex = function (obj, keyToFind) {

        var indx = 0;

        for (var key in obj) {

            if (obj.hasOwnProperty(key)) {

                if (key === keyToFind) {
                    return indx;
                }

                indx++;
            }
        }

        return null;
    };

    var tableHeaderMarkup = function (table, colFilters) {

        var tableHeaderRow;
        var tableHeader;
        var tableHead;
        var colData;
        var count;
        var maxColLength = 0;
        var currentColLength = 0;

        tableHeader = document.createElement('thead');

        for (var key in colFilters) {

            if (colFilters.hasOwnProperty(key)) {

                tableHeaderRow = document.createElement('tr');

                tableHeaderRow.id = key;

                tableHeader.appendChild(tableHeaderRow);

                tableHead = document.createElement('th');

                tableHead.textContent = key;

                tableHeaderRow.appendChild(tableHead);

                count = getColumnFiltersLength(colFilters, key);

                for (var c = 0; c < count; c++) {

                    for (var k = 0; k < colFilters[key].length; k++) {

                        tableHead = document.createElement('th');

                        tableHead.textContent = colFilters[key][k];

                        if (key === "MonthName") {
                            tableHead.colSpan = "4";
                        }
                        else if (key === "SalesType") {
                            tableHead.colSpan = "2";
                        }

                        tableHead.classList.add("text-center");

                        tableHeaderRow.appendChild(tableHead);
                    }
                }

                tableHeader.appendChild(tableHeaderRow);

                table.appendChild(tableHeader);
            }
        }

        return tableHeader;
    };

    var getTableHeader = function (table, col) {

    var tableHeaderRow;
    var tableHeader;
    var tableHead;
    var colData;
    var count;
    var maxColLength = 0;
    var currentColLength = 0;

    tableHeader = document.createElement('thead');

    for (var key in col) {

        tableHeaderRow = document.createElement('tr');

        tableHeaderRow.id = key;

        tableHeader.appendChild(tableHeaderRow);

        tableHead = document.createElement('th');

        tableHead.textContent = key;

        tableHeaderRow.appendChild(tableHead);

        tableHeader.appendChild(tableHeaderRow);
    }

    table.appendChild(tableHeader);

    for (var m = 0; m < col.MonthName.length; m++) {

        tableHead = document.createElement('th');

        tableHead.textContent = col.MonthName[m];
        tableHead.colSpan = "4";
        tableHead.classList.add("text-center");

        var monthTableHeaderRow = table.querySelectorAll('#MonthName')[0];

        monthTableHeaderRow.appendChild(tableHead);

        tableHeader.appendChild(monthTableHeaderRow);

        for (var s = 0; s < col.SalesType.length; s++) {

            tableHead = document.createElement('th');

            tableHead.textContent = col.SalesType[s];
            tableHead.colSpan = "2";
            tableHead.classList.add("text-center");

            var salesTypeTableHeaderRow = table.querySelectorAll('#SalesType')[0];

            salesTypeTableHeaderRow.appendChild(tableHead);

            tableHeader.appendChild(salesTypeTableHeaderRow);

            for (var u = 0; u < col.UnitCode.length; u++) {

                tableHead = document.createElement('th');

                tableHead.textContent = col.UnitCode[u];

                var unitCodeTableHeaderRow = table.querySelectorAll('#UnitCode')[0];

                unitCodeTableHeaderRow.appendChild(tableHead);

                tableHeader.appendChild(unitCodeTableHeaderRow);
            }
        }
    }


        

        //if (count) {

        //    tableHead = document.createElement('th');

        //    tableHead.textContent = col[0][key];

        //    tableHeaderRow.appendChild(tableHead);

            
                    
        //        }
        //        else {

        //            for (var d = 0; d < colData.length; d++) {

        //                tableHead = document.createElement('th');

        //                tableHead.textContent = colData[d];

        //                tableHeaderRow.appendChild(tableHead);

        //                tableHeader.appendChild(tableHeaderRow);
        //            }
        //        }
        //    }
        //}

        return tableHeader;
    };

    var getTableBody = function (reportData, rowItemObject, colFilters, dataAttributes, valueField, drillDown, displayText, parameterValue) {

        var tableBody;
        var tableRow;
        var tableCell;
        var sumSaleQty = 0;

        tableBody = document.createElement('tbody');

        //var rowItems = {};

        //rowItems = {
        //    RowItem: getColumnValues(parameterName, parameterValue, retField)
        //};

        //var parameters = [];

        if (rowItemObject.RowItem.length) {

            for (var r = 0; r < rowItemObject.RowItem.length; r++) {

                var columnId = 0;

                var rowItemName = rowItemObject.RowItem[r];

                columnId = getItemId(reportData, displayText, rowItemName, valueField);

                tableRow = document.createElement('tr');

                if (dataAttributes.length) {

                    for (var d = 0; d < dataAttributes.length; d++) {

                        tableRow.setAttribute(dataAttributes[d], columnId);

                    }

                }

                tableCell = document.createElement('td');

                var link = document.createElement('a');

                link.text = rowItemName;

                link.id = columnId;

                //tableCell.textContent = row.ItemCategoryName[r];
                tableCell.appendChild(link);

                tableRow.appendChild(tableCell);

                for (var m = 0; m < colFilters.MonthName.length; m++) {

                    for (var s = 0; s < colFilters.SalesType.length; s++) {

                        for (var u = 0; u < colFilters.UnitCode.length; u++) {

                            tableCell = document.createElement('td');

                            var parameters = {};

                            if (colFilters.MonthName[m] !== "Total") {
                                parameters.MonthName = [colFilters.MonthName[m]];
                            }

                            parameters.SaleType = [colFilters.SalesType[s]];
                            parameters.UnitCode = [colFilters.UnitCode[u]];
                            
                            if (displayText === "ItemCategoryName") {
                                parameters.ItemCategoryName = rowItemName;
                            }
                            else if (displayText === "ItemQuality") {
                                parameters.ItemCategoryName = parameterValue;
                                parameters.ItemQuality = rowItemName;
                            }
                            else if (displayText === "Item") {
                                parameters.ItemQuality = parameterValue;
                                parameters.ItemName = rowItemName;
                            }


                            //var filtered = multiFilter(saleQtyReportData, parameters);

                            //console.info('Filtered:');
                            //console.log(filtered);

                            tableCell.textContent = getSumOfQty(reportData, rowItemName, colFilters.MonthName[m], colFilters.SalesType[s], colFilters.UnitCode[u], parameters);

                            tableCell.classList.add("text-center");

                            tableRow.appendChild(tableCell);
                        }
                    }
                }

                tableBody.appendChild(tableRow);

                if (drillDown !== undefined) {

                    if (displayText === "ItemCategoryName") {
                        link.onclick = getItemQualitiesByItemCategoryId;
                    }
                    else if (displayText === "ItemQuality") {
                        link.onclick = getItemsByItemQualityId;
                    }

                }
            }
        }

        return tableBody;
    };

    function getItemCategorywise() {

        var cols = [];

        var col = {};

        //col = {
        //    MonthName: getColumnValues("MonthName"),
        //    SalesType: getColumnValues("SaleType"),
        //    UnitCode: getColumnValues("UnitCode")
        //};

        var colFilters = {};

        colFilters.MonthName = getColumnFilters(DOM.month, colFilters);
        colFilters.SalesType = getColumnFilters(DOM.salesType, colFilters);
        colFilters.UnitCode = getColumnFilters(DOM.unitCode, colFilters);

        //multiFilter(saleQtyReportData, col);

        colFilters.MonthName.push('Total');

        //cols.push({ "MonthName": getMonths }, { "SalesType": salesTypes }, { "UnitCode": unitCodes });

        //cols.push(col);

        if (colFilters) {

            var table;
            var tableHeader;
            var colData;
            var maxColLength = 0;
            var currentColLength = 0;
            var tableId;

            table = document.createElement('table');

            tableId = "ItemCategorywiseReport";

            table.setAttribute('id', tableId);
            table.setAttribute('class', 'table table-condensed');

            // Prepare a table header
            tableHeader = tableHeaderMarkup(table, colFilters); //getTableHeader(table, col);

            table.appendChild(tableHeader);

            //ItemCategoryId: [parameterValue],
            //                ItemQuality: [rowItemName],


            var rowItem = {};

            rowItem = {
                RowItem: getColumnValues("ItemCategoryName", undefined, "ItemCategoryName")
            };

            dataAttributes = ["item-category-id"];

            var tableBody = getTableBody(saleQtyReportData, rowItem, colFilters, dataAttributes, "ItemCategoryId", "getItemQualitiesByItemCategoryId", "ItemCategoryName");

            table.appendChild(tableBody);
        }

        var pivot = document.getElementById('PivotTable');

        pivot.appendChild(table);
    }

    function getItemQualitiesByItemCategoryId(e) {

        var cols = [];

        var col = {};

        //col = {
        //    MonthName: getColumnValues("MonthName"),
        //    SalesType: getColumnValues("SaleType"),
        //    UnitCode: getColumnValues("UnitCode")
        //};

        var colFilters = {};

        colFilters.MonthName = getColumnFilters(DOM.month, colFilters);
        colFilters.SalesType = getColumnFilters(DOM.salesType, colFilters);
        colFilters.UnitCode = getColumnFilters(DOM.unitCode, colFilters);

        //multiFilter(saleQtyReportData, col);

        colFilters.MonthName.push('Total');

        //cols.push({ "MonthName": getMonths }, { "SalesType": salesTypes }, { "UnitCode": unitCodes });

        //cols.push(col);

        if (colFilters) {

            var table;
            var tableHeader;
            var colData;
            var maxColLength = 0;
            var currentColLength = 0;
            var tableId;

            table = document.createElement('table');

            tableId = "ItemQualityywiseReport";

            table.setAttribute('id', tableId);
            table.setAttribute('class', 'table table-condensed');

            // Prepare a table header
            tableHeader = tableHeaderMarkup(table, colFilters); //getTableHeader(table, col);

            table.appendChild(tableHeader);

            //ItemCategoryId: [parameterValue],
            //                ItemQuality: [rowItemName],


            var itemCategoryId = e.target.id;

            var rowItem = {};

            rowItem = {
                RowItem: getColumnValues("ItemCategoryName", e.target.text, "ItemQuality")
            };

            var dataAttributes = ["item-quality-id", "item-category-id"];

            var tableBody = getTableBody(saleQtyReportData, rowItem, colFilters, dataAttributes, "ItemQuality", "getItemQualitiesByItemCategoryId", "ItemQuality", e.target.text);

            table.appendChild(tableBody);
        }

        var pivot = document.getElementById('PivotTable');

        pivot.appendChild(table);
    }

    function getItemsByItemQualityId(e) {

        var cols = [];

        var col = {};

        //col = {
        //    MonthName: getColumnValues("MonthName"),
        //    SalesType: getColumnValues("SaleType"),
        //    UnitCode: getColumnValues("UnitCode")
        //};

        var colFilters = {};

        colFilters.MonthName = getColumnFilters(DOM.month, colFilters);
        colFilters.SalesType = getColumnFilters(DOM.salesType, colFilters);
        colFilters.UnitCode = getColumnFilters(DOM.unitCode, colFilters);

        //multiFilter(saleQtyReportData, col);

        colFilters.MonthName.push('Total');

        //cols.push({ "MonthName": getMonths }, { "SalesType": salesTypes }, { "UnitCode": unitCodes });

        //cols.push(col);

        if (colFilters) {

            var table;
            var tableHeader;
            var colData;
            var maxColLength = 0;
            var currentColLength = 0;
            var tableId;

            table = document.createElement('table');

            tableId = "ItemWiseReport";

            table.setAttribute('id', tableId);
            table.setAttribute('class', 'table table-condensed');

            // Prepare a table header
            tableHeader = tableHeaderMarkup(table, colFilters); //getTableHeader(table, col);

            table.appendChild(tableHeader);

            //ItemCategoryId: [parameterValue],
            //                ItemQuality: [rowItemName],


            rowFilters = {};

            rowFilters.ItemCategoryId = 29;
            rowFilters.ItemQuality = e.target.text;

            var rowItem = {};

            rowItem = {
                RowItem: multiFilter(saleQtyReportData, rowFilters) //getColumnValues("ItemQuality", e.target.text, "ItemName")
            };

            var dataAttributes = ["item-id", "item-quality-id"];

            var tableBody = getTableBody(saleQtyReportData, rowItem, colFilters, dataAttributes, "ItemName", "getItemsByItemQualityId", "Item", e.target.text);

            table.appendChild(tableBody);
        }

        var pivot = document.getElementById('PivotTable');

        pivot.appendChild(table);

    }

    function bindSaleQtyData() {

        // Check the Stock Report Data has values
        if (saleQtyReportData.length > 0) {

            var excludeListOfTableHeaders = [];

            var reportFilterOptionValue = getReportFilterOptionValue();

            if (reportFilterOptionValue !== null) {

                if (reportFilterOptionValue === "0") {

                    excludeListOfTableHeaders.push("ItemCategoryId");
                    excludeListOfTableHeaders.push("ItemQuality");
                    excludeListOfTableHeaders.push("ItemName");
                }
                else if (reportFilterOptionValue === "1") {

                    excludeListOfTableHeaders.push("ItemCategoryId");
                    excludeListOfTableHeaders.push("ItemName");
                }
                else if (reportFilterOptionValue === "2") {

                    excludeListOfTableHeaders.push("ItemCategoryId");                    
                }
                //else if (reportFilterOptionValue === "3") {

        
                //    excludeListOfTableHeaders.push("ItemCategoryName");
                //}
            }

            if (DOM.saleQtyReport.hasChildNodes('thead')) {
                if (DOM.saleQtyReport.tHead !== null) {
                    DOM.saleQtyReport.tHead.remove();
                }
            }

            if (DOM.saleQtyReport.hasChildNodes('tbody')) {
                if (DOM.saleQtyReport.tBodies.length ) {
                    DOM.saleQtyReport.tBodies[0].remove();
                }
            }

            var tableHeader = createTableHeader(saleQtyReportData, excludeListOfTableHeaders);

            var tableBody = createTableBody(saleQtyReportData, excludeListOfTableHeaders);

            DOM.saleQtyReport.appendChild(tableHeader);

            DOM.saleQtyReport.appendChild(tableBody);            
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

    }
    var getReportURL = function() {

        var url = "";
        var reportFilterOptionValue = null;
        var itemSelectedIndex = parseInt(0);
        var itemCategorySelectedIndex = parseInt(0);
        var locationSelectedIndex = parseInt(0);

        //itemSelectedIndex = DOM.item.selectedIndex;
        //itemCategorySelectedIndex = DOM.itemCategory.selectedIndex;
        //locationSelectedIndex = DOM.location.selectedIndex;

        reportFilterOptionValue = getReportFilterOptionValue();

        if (reportFilterOptionValue === "0") {
            url = "GetSaleQtyOfAllItemCategories";
            
        }
        else if (reportFilterOptionValue === "1") {
                url = "GetSaleQtyOfAllItemCategoriesAndItemQualities/"; // + DOM.item.options[itemSelectedIndex].value;
            
        }
        else if (reportFilterOptionValue === "2") {
            url = "GetSaleQtyOfAllItemCategoriesItemQualitiesAndItem/"; // + DOM.itemCategory.options[itemCategorySelectedIndex].value;
            
        }
        //else if (reportFilterOptionValue === "3") {            
        //    if (locationSelectedIndex >= 0) {
        //        if (DOM.location.options[locationSelectedIndex].text.toLowerCase() === "all") {
        //            url = "GetStockLocationWiseItemQualitWiseAndItemWise";
        //        }
        //        else {
        //            url = "GetStockLocationWiseAndItemWiseByLoctionId/" + DOM.location.options[locationSelectedIndex].value;
        //        }                
        //    }
        //}

        return url;
    }

    function getSaleQtyData() {

        shared.showLoader(DOM.loader);

        try {

            var url = "GetSaleQtyOfAllItemCategoriesItemQualitiesAndItem";//getReportURL();

            shared.sendRequest(SERVICE_PATH + url, "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res !== undefined) {

                            if (res.length > 0) {
                                
                                saleQtyReportData = res;

                                bindSalesQty();

                                // bindSaleQtyData();
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

    function getSaleQtyOfAllItemCategoriesAndItemQualities() {

        shared.showLoader(DOM.loader);

        try {

            var url = "GetSaleQtyOfAllItemCategoriesAndItemQualities/";

            shared.sendRequest(SERVICE_PATH + url, "GET", true, "JSON", null, function (response) {

                shared.showLoader(DOM.loader);

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res !== undefined) {

                            if (res.length > 0) {
                                
                                itemQualitywiseData = res;

                                binditemg();

                                // bindSaleQtyData();
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
    
    function printSaleQtyReport() {

    }

    function exportSaleQtyReport() {

        fnExcelReport();
    }

    function fnExcelReport() {
        var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
        var textRange; var j = 0;
        tab = document.getElementById('Report'); //DOM.saleQtyReport; // id of table

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


SharpiTech.SaleQtyReport.init();
