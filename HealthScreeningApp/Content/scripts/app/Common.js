
var LMS_Core = (function () {

    var _Type;
    var _WebUrl;
    var _UrlData;
    var _ContentType;
    var _DataType;
    var _ProcessData;
    var _WebMethod;

    var output;




    //Generic function to call AXMX/WCF  Service function CallService() {
    function callService(webInvokeMethod, webUrl, urlData, contentType, dataType, processData, callback) {

        //var async = isAsync || false;

        var output = $.ajax({
            //type: _Type, //GET or POST or PUT or DELETE verb
            //url: _WebUrl, // Location of the service
            //data: _UrlData, //Data sent to server
            //contentType: _ContentType, // content type sent to server
            //dataType: _DataType, //Expected data format from server
            //processdata: _ProcessData, //True or False
            type: webInvokeMethod, //GET or POST or PUT or DELETE verb
            url: webUrl, // Location of the service
            data: urlData, //Data sent to server
            contentType: contentType, // content type sent to server
            dataType: dataType, //Expected data format from server
            processdata: processData, //True or False
            //async: false,
            success: function (data) {//On Successfull service call
                result = ServiceSucceeded1(data);
                callback(data);
            },
            error: ServiceFailed1// When Service call fails
        });
        //.done(function (output) {)
        //    //alert(output);
        //    return output;
        //});

        //return result;
    };

    //Generic function to call AXMX/WCF  Service function CallService() {
    function callService_asyc(webInvokeMethod, webUrl, urlData, contentType, dataType, processData, async, callback) {

        //var async = isAsync || false;

        var output = $.ajax({
            //type: _Type, //GET or POST or PUT or DELETE verb
            //url: _WebUrl, // Location of the service
            //data: _UrlData, //Data sent to server
            //contentType: _ContentType, // content type sent to server
            //dataType: _DataType, //Expected data format from server
            //processdata: _ProcessData, //True or False
            type: webInvokeMethod, //GET or POST or PUT or DELETE verb
            url: webUrl, // Location of the service
            data: urlData, //Data sent to server
            contentType: contentType, // content type sent to server
            dataType: dataType, //Expected data format from server
            processdata: processData, //True or False
            async: async,
            //async: false,
            success: function (data) {//On Successfull service call
                result = ServiceSucceeded1(data);
                callback(data);
            },
            error: ServiceFailed1// When Service call fails
        });
        //.done(function (output) {)
        //    //alert(output);
        //    return output;
        //});

        //return result;
    };

    function createCookie(name, value, expires, path, domain) {
        var cookie = name + "=" + escape(value) + ";";

        if (expires) {
            // If it's a date
            if (expires instanceof Date) {
                // If it isn't a valid date
                if (isNaN(expires.getTime()))
                    expires = new Date();
            }
            else
                expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);

            cookie += "expires=" + expires.toGMTString() + ";";
        }

        if (path)
            cookie += "path=" + path + ";";
        if (domain)
            cookie += "domain=" + domain + ";";

        document.cookie = cookie;
    }

    function getCookie(name) {
        var regexp = new RegExp("(?:^" + name + "|;\s*" + name + ")=(.*?)(?:;|$)", "g");
        var result = regexp.exec(document.cookie);
        return (result === null) ? null : result[1];
    }

    function deleteCookie(name, path, domain) {
        // If the cookie exists
        if (getCookie(name))
            createCookie(name, "", -1, path, domain);
    }

    // date1 and date2 are javascript Date objects
    function getDateDifferenceInDays(date1, date2) {

        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        // Discard the time and time-zone information.
        var utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        var utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);

    }

    function Get_Pagewise_user_access_details(userId, pageId, callback) {
        $.ajax({
            type: "GET",
            url: ServicePath + "Get_User_Page_Access_Permission_Details/" + userId + "/" + pageId,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossdomain: true,
            async: false,
            success: function (r) {
                callback(r);
            }
        });
    }

    function getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        //alert(vars);
        return vars;
    }


    function ServiceSucceeded1(result) {
        //resultSet$ = result;

        return result;
        //else {
        //    resultObject = data.GetMenus;

        //    var string = data.MenuGroup + " \n " + data.Designation + " \n " + data.Address + " \n " + data.Email;
        //    alert(string);
        //}
    }

    function ServiceFailed1(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        _Type = null; _WebUrl = null; _UrlData = null; _ContentType = null; _DataType = null; _ProcessData = null;
    }


    function bindSelectWithCallback(url, dropdownname, textField, valuefield, callback) {
        var result = $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossdomain: true,
            success: function (r) {
                var ddl = dropdownname;
                ddl.empty().append('<option selected="selected" value="0">Please select</option>');
                $.each(r, function (key, val) {
                    ddl.append($("<option></option>").val(val['' + valuefield + '']).html(val['' + textField + '']));
                });
                callback(r);
            }
        });
    }

    /* BIND SELECT ELEMENT */

    function BindDropDown(url, dropdownname, textField, valuefield, defaultOption) {
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossdomain: true,
            success: function (r) {
                var ddl = dropdownname;
                defaultOption = defaultOption || "Please Select";

                ddl.empty().append('<option value="-1">' + defaultOption + '</option>');

                $.each(r, function (key, val) {
                    ddl.append($("<option></option>").val(val['' + valuefield + '']).html(val['' + textField + '']));
                });
            }
        });
    }

    function BindDropDownWithCallback(url, dropdownname, textField, valuefield, callback, defaultOption) {
        $.ajax({
            type: "GET",
            url: url,
            //data: '{"_company_name": A}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossdomain: true,
            success: function (r) {
                var ddl = dropdownname;
                defaultOption = defaultOption || "Please Select";

                ddl.empty().append('<option selected="selected" value="-1">' + defaultOption + '</option>');

                $.each(r, function (key, val) {
                    ddl.append($("<option></option>").val(val['' + valuefield + '']).html(val['' + textField + '']));
                });
                callback(r);
            }
        });
    }

    function BindDropDownWithAsync(url, dropdownname, textField, valuefield, async, defaultOption) {
        $.ajax({
            type: "GET",
            url: url,
            async: async,
            //data: '{"_company_name": A}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossdomain: true,
            success: function (r) {
                var ddl = dropdownname;

                defaultOption = defaultOption || "Please Select";

                ddl.empty().append('<option selected="selected" value="-1">' + defaultOption + '</option>');

                $.each(r, function (key, val) {
                    ddl.append($("<option></option>").val(val['' + valuefield + '']).html(val['' + textField + '']));
                });
            }
        });
    }

    function BindDropDownWithCallback_Async(url, dropdownname, textField, valuefield, async, callback, defaultOption) {
        $.ajax({
            type: "GET",
            url: url,
            //data: '{"_company_name": A}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossdomain: true,
            async: async,
            success: function (r) {
                var ddl = dropdownname;

                ddl.empty().append('<option selected="selected" value="-1">' + defaultOption + '</option>');

                $.each(r, function (key, val) {
                    ddl.append($("<option></option>").val(val['' + valuefield + '']).html(val['' + textField + '']));
                });
                callback(r);
            }
        });
    }

    function BindDropDownWithDataAttributesCallback_Async(url, dropdownname, textField, valuefield, dataAttributes, async, defaultOption, callback) {
        $.ajax({
            type: "GET",
            url: url,
            //data: '{"_company_name": A}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossdomain: true,
            async: async,
            success: function (r) {
                var ddl = dropdownname;

                ddl.empty().append('<option selected="selected" value="-1">' + defaultOption + '</option>');

                $.each(r, function (key, val) {

                    var element = $("<option></option>");

                    if (dataAttributes !== undefined) {

                        if (dataAttributes.indexOf("|") > 0) {

                            var dataAttr = dataAttributes.split("|");

                            if (dataAttr.length > 0)

                                for (k = 0; k < dataAttr.length; k++) {
                                    element.attr('data-' + dataAttr[k].toLowerCase().replace(/_/g, "-").replace(/\s+/g, ""), (val['' + dataAttr[k] + '']));
                                }
                        }
                    }

                    element.val(val['' + valuefield + '']).html(val['' + textField + '']);

                    ddl.append(element);
                });
                callback(r);
            }
        });
    }

    var bindSelect = function (url, selectElementName, textField, valueField, isAsync, defaultOption, isCallBack, callback) {
        $.ajax({
            type: "GET",
            url: url,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            crossdomain: true,
            async: isAsync,
            success: function (response) {

                var element = selectElementName;

                defaultOption = defaultOption || "Choose Option";

                element.empty().append('<option value="-1">' + defaultOption + '</option>');

                $.each(response, function (key, val) {
                    element.append($("<option></option>").val(val['' + valueField + '']).html(val['' + textField + '']));
                });

                if (isCallBack === true) {
                    callback(response);
                }
            }
        });
    }

    var bindSelectElement = function (serviceMethod, bindControl, textField, valueField, isAsync, isCallBack, callbackResult) {

        var url = ServicePath + serviceMethod;

        var defaultOption;

        isAsync = isAsync || false;

        isCallBack = isCallBack || false;
        if (bindControl.hasAttribute != undefined) {
            if (bindControl.hasAttribute("data-placeholder") === false) {

                defaultOption = "Choose";
            }

            defaultOption = bindControl.getAttribute("data-placeholder");
        }
        bindSelect(url, $(bindControl), textField, valueField, isAsync, defaultOption, isCallBack, callbackResult);
    }

    var bindSelectElementWithDataAttributes = function (url, selectElementName, textField, valueField, dataAttributes, isAsync, defaultOption, isCallback, callBackResponse) {

        $.ajax({

            type: "GET",

            url: url,

            contentType: "application/json; charset=utf-8",

            dataType: "json",

            crossdomain: true,

            async: isAsync,

            success: function (response) {

                var element = selectElementName;

                element.empty().append('<option selected="selected" value="-1">' + defaultOption + '</option>');

                //if (selectElementName.hasAttribute("data-placeholder") === false) {

                //    defaultOption = "Choose";
                //}

                // defaultOption = selectElementName.getAttribute("data-placeholder");

                $.each(response, function (key, val) {

                    var options = $("<option></option>");

                    if (dataAttributes !== undefined) {

                        if (dataAttributes.indexOf("|") > 0) {

                            var dataAttr = dataAttributes.split("|");

                            if (dataAttr.length > 0)

                                for (k = 0; k < dataAttr.length; k++) {

                                    options.attr('data-' + dataAttr[k].toLowerCase().replace(/_/g, "-").replace(/\s+/g, ""), (val['' + dataAttr[k] + '']));
                                }
                        }
                    }

                    options.val(val['' + valueField + '']).html(val['' + textField + '']);

                    element.append(options);
                });

                if (isCallback == true) {
                    callback(response);
                }
            }
        });
    }

    var setSelect2ControlsText = function (selectControl) {

        var selectControlID = selectControl.id;

        var select2Span;

        if (selectControl.multiple === false) {

            select2Span = document.getElementById("select2-" + selectControlID + "-container");

            if (select2Span !== undefined) {

                if (selectControl.selectedIndex >= 0) {

                    var selectedText = selectControl.options[selectControl.selectedIndex].text;

                    select2Span.title = selectedText;

                    select2Span.innerText = selectedText;
                }
            }
        }
    }

    var setSelect2MultipleControlsText = function (selectControl, selectedValues) {

        var selectControlID = selectControl.id;

        var select2Span;

        if (selectControl.multiple === true) {

            select2Span = document.getElementsByClassName("select2-selection--multiple");

            if (select2Span !== undefined) {

                var $ul = $('</ul>');

                var options = [];

                options = selectedValues;

                if (options.length > 0) {

                    for (var i = 0; i < options.length; i++) {

                        var $li = $('</li>');
                        var $span = $('</span>');

                        $span.attr('class', 'select2-selection__choice__remove').attr('role', 'presentation').html('x');
                        $li.attr('class', 'select2-selection__choice').attr('title', options[i]);

                        $span.append($li);
                        $li.append($ul);

                    }
                }

                $ul.attr('class', 'select2-selecton__rendered');

                $ul.append(select2Span);
            }
        }
    }

    var disableRadioOptions = function (nameOfControl, IsDisabled) {

        var selectedValue = "";

        var _itemsCount = 0;

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {
                    nameOfControl[i].disabled = IsDisabled;
                }
            }
        }

        return selectedValue;
    }

    var disableCheckBoxOptions = function (nameOfControl, IsDisabled) {

        var selectedValue = [];

        var _itemsCount = 0;

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {
                    nameOfControl[i].disabled = IsDisabled;
                }
            }
        }

        return selectedValue;
    }

    var getRadioSelectedValue = function (nameOfControl) {

        var selectedValue = "";

        var _itemsCount = 0;

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {
                    if (nameOfControl[i].checked) {
                        selectedValue = nameOfControl[i].id;
                        break;
                    }
                }
            }
        }

        return selectedValue;
    }

    var getCheckboxValue = function (nameOfControl) {

        var selectedValue = [];

        var _itemsCount = 0;

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {
                    if (nameOfControl[i].checked) {
                        selectedValue.push(nameOfControl[i].value);
                    }
                }
            }
        }

        return selectedValue;
    }

    var IsCheckboxValueSelected = function (nameOfControl) {

        var selectedValue = false;

        var _itemsCount = 0;

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {
                    if (nameOfControl[i].checked) {
                        selectedValue = true;
                    }
                }
            }
        }

        return selectedValue;
    }

    var getSelectValue = function (nameOfControl, getText, getValue) {

        var selectedValue = "";

        var _itemsCount = 0;

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.options.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {
                    if (nameOfControl.options[i].selected === true) {

                        if (getText !== undefined || getText === "") {
                            selectedValue = nameOfControl.options[i].text;
                        }
                        else {
                            selectedValue = nameOfControl.options[i].value;
                        }
                        break;
                    }
                }
            }
        }

        return selectedValue;
    }

    var setRadioButtonValue = function (nameOfControl, textToSet, valueToSet) {

        var selectedValue = "";

        var itemsCount = 0;

        if (nameOfControl !== undefined) {

            itemsCount = nameOfControl.length;

            if (itemsCount > 0) {

                for (i = 0; i < itemsCount; i++) {

                    if (textToSet !== null) {

                        if (nameOfControl[i].labels[0].innerText === textToSet) {

                            nameOfControl[i].checked = true;
                            break;
                        }

                    }
                    else if (valueToSet !== null) {

                        if (Number(valueToSet)) {

                            if (parseInt(nameOfControl[i].id) === parseInt(valueToSet)) {

                                nameOfControl[i].checked = true;
                                break;
                            }
                        }
                        else {

                            if (nameOfControl[i].id === valueToSet) {

                                nameOfControl[i].checked = true;
                                break;
                            }
                        }
                    }

                }

            }

        }
    }

    var setCheckboxValue = function (nameOfControl, valueToSet) {

        var selectedValue = [];

        var itemsCount = 0;

        if (nameOfControl !== undefined) {

            itemsCount = nameOfControl.length;

            if (itemsCount > 0) {

                for (i = 0; i < itemsCount; i++) {

                    if (nameOfControl[i].labels[0].innerText === valueToSet) {

                        nameOfControl[i].checked = true;

                    }
                }
            }
        }
    }

    var setSelectValue = function (nameOfControl, textToSet, valueToSet) {

        var _itemsCount = 0;

        var _valueToSet = parseInt(valueToSet)

        if (isNaN(_valueToSet)) {

            _valueToSet = valueToSet;
        }

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.options.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {

                    if (textToSet !== null) {

                        if (nameOfControl.options[i].text.toUpperCase() === textToSet.toUpperCase()) {

                            nameOfControl.options[i].selected = true;
                            return;
                        }
                    }
                    else if (_valueToSet !== null) {

                        if (parseInt(_valueToSet)) {

                            if (parseInt(nameOfControl.options[i].value) === _valueToSet) {

                                nameOfControl.options[i].selected = true;
                                return;
                            }
                        }
                        else {

                            if (nameOfControl.options[i].value === _valueToSet) {
                                nameOfControl.options[i].selected = true;
                                return;
                            }
                        }
                    }
                }
            }
        }
    }

    var setSelectMultipleValue = function (nameOfControl, textToSet, valueToSet) {

        var _itemsCount = 0;

        var _textToSet = [];
        var _valuesToSet = [];

        if (textToSet !== null) {
            _textToSet = textToSet;
        }

        if (valueToSet !== null) {
            _valuesToSet = valueToSet;
        }

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.options.length;

            if (_itemsCount > 0) {

                for (var o = 0; o < _itemsCount; o++) {

                    if (_textToSet.length > 0) {

                        for (var t = 0; t < _textToSet.length; t++) {

                            if (nameOfControl.options[o].text.toUpperCase() === _textToSet[t].toUpperCase()) {

                                nameOfControl.options[o].selected = true;
                            }
                        }
                    }
                    else if (_valuesToSet.length > 0) {

                        for (var v = 0; v < _valuesToSet.length; v++) {

                            if (parseInt(_valuesToSet[v])) {

                                if (parseInt(nameOfControl.options[o].value) === parseInt(_valuesToSet[v])) {

                                    nameOfControl.options[o].selected = true;
                                }
                            }
                            else {

                                if (nameOfControl.options[o].value === _valuesToSet[v]) {
                                    nameOfControl.options[o].selected = true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /* SHOW DATE PICKER */
    var showDatePicker = function (triggerControl, eventName, targetControl, minDate, maxDate, yearStartRange, yearEndRange) {
        minDate = minDate || '01/Jan/1947';
        maxDate = maxDate || '31/Dec/2025';
        var newYearRange = [];

        var date = new Date();

        yearStartRange = yearStartRange || 2000;
        yearEndRange = yearEndRange || (date.getFullYear + 5);

        newYearRange.push(yearStartRange);
        newYearRange.push(yearEndRange);

        eventName = eventName || "focus";

        if (eventName === "click") {
            $(triggerControl).click(function () {
                var showDate = $(triggerControl).pikaday({
                    defaultDate: Date(),
                    setDefaultDate: true,
                    format: 'DD/MMM/YYYY',
                    firstDay: 1,
                    minDate: new Date(minDate),
                    maxDate: new Date(maxDate),
                    yearRange: newYearRange,
                    field: targetControl,
                    trigger: triggerControl,
                    onSelect: function () {
                        targetControl.value = this.getMoment().format('DD/MMM/YYYY');
                        setTimeout(function () {
                            targetControl.focus();
                        }, 200);
                    }
                });

                // chain a few methods for the first datepicker, jQuery style!
                showDate.pikaday('show').pikaday('currentMonth');

            });
        }
        else {
            $(triggerControl).focus(function () {
                var showDate = $(triggerControl).pikaday({
                    defaultDate: Date(),
                    setDefaultDate: true,
                    format: 'DD/MMM/YYYY',
                    firstDay: 1,
                    minDate: new Date(minDate),
                    maxDate: new Date(maxDate),
                    yearRange: newYearRange,
                });

                // chain a few methods for the first datepicker, jQuery style!
                showDate.pikaday('show').pikaday('currentMonth');

            });
        }
    }

    var setCurrentDate = function (format) {

        var currentDate;

        var today = new Date();

        var dd = today.getDate();

        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {

            if (format === "ddMMMyyyy") {

                mm = mm

            }
            else {

                mm = '0' + mm
            }
        }

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var monthName;

        for (var j = 0; j < months.length; j++) {

            if (mm === j) {

                monthName = months[j];
            }
        }

        var today = dd + '/' + monthName + '/' + yyyy;

        return today;
    }

    var checkEmailAddress = function (emailID) {

        var email = emailID;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }

    //Return true if input value contains letters and numbers
    var checkAlphaNumeric = function (inputValue) {
        var IsValid = true;

        var filter = /^[0-9a-zA-Z]+$/;

        if (!inputValue.match(filter)) {
            IsValid = false;
        }

        return IsValid;
    }

    var checkOnlyNumbers = function (inputValue) {

        var IsValid = true;

        var filter = /^[0-9]+$/;

        if (!inputValue.match(filter)) {

            IsValid = false;
        }

        return IsValid;
    }

    var checkOtherKeyCodes = function (keyCode) {

        /* Checking keypress as Delete, Tab, Enter */
        if (keyCode === 8 || keyCode === 9 || keyCode === 13 || keyCode === 19 || keyCode === 32 || (keyCode >= 33 && keyCode <= 47) || (keyCode >= 112 && keyCode <= 123)) {
            return;
        }
        else {
            return false;
        }
    }

    //Allow only numbers
    var acceptOnlyNumbers = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        var isNumeric = (keyCode === 8 || keyCode === 9 || keyCode === 13 || keyCode === 19) || (keyCode >= 33 && keyCode <= 46) || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || (checkOtherKeyCodes(keyCode) === true);

        return isNumeric;
    }

    //Allow only Alphabets
    var checkOnlyAlphabets = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        var isAlphabets = (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (checkOtherKeyCodes(keyCode) === true);

        return isAlphabets;
    }

    //Allow only Alphabets and Numbers
    var checkOnlyAlphabetsAndNumbers = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || checkOtherKeyCodes(keyCode) === true) {
            return true;
        }
        else if (keyCode >= 33 && keyCode <= 47) {
            return false;
        }
        else {
            alert("Only Alphabets and Numbers are allowed in this field.");
            return false;
        }
    }

    //Allow Characters, Dot, Hyphen
    var checkAlphaDotHyphen = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (keyCode >= 45 && keyCode <= 46) || checkOtherKeyCodes(keyCode) === true) {
            return true;
        }
        else {
            alert("Only Alphabets, Dot (.), Hyphen or Dash (-) are allowed in this field.");
            return false;
        }
    }

    //Allow AlphaNumeric Characters, Dot, Hyphen
    var checkAlphaNumericDotHyphen = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (keyCode >= 45 && keyCode <= 46) || checkOtherKeyCodes(keyCode) === true) {
            return true;
        }
        else {
            alert("Only Alphabets, Numbers, Dot (.), Hyphen or Dash (-) are allowed in this field.");
            return false;
        }
    }

    //Allow Numbers, Dot
    var CheckNumbersDot = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        if ((keyCode >= 48 && keyCode <= 57) || (keyCode === 46) || checkOtherKeyCodes(keyCode) === true) {
            return true;
        }
        else {
            alert("Only Numbers and Dot (.) are allowed in this field.");
            return false;
        }
    }

    //Allow Numbers, Forwarding Slash
    var checkNumbersFwdSlash = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        if ((keyCode >= 48 && keyCode <= 57) || (keyCode === 47) || checkOtherKeyCodes(keyCode) === true) {
            return true;
        }
        else {
            alert("Only Numbers and Forward Slash (/) are allowed in this field.");
            return false;
        }
    }

    //Allow Numbers, Hyphen, Forwarding Slash
    var checkNumbersHyphenFwdSlash = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        if ((keyCode >= 48 && keyCode <= 57) || (keyCode === 47) || (keyCode === 45) || checkOtherKeyCodes(keyCode) === true) {
            return true;
        }
        else {
            alert("Only Numbers, Hyphen or Dash (-), Forward Slash (/) are allowed in this field.");
            return false;
        }
    }

    //Allow AlphaNumeric Characters, Fwd Slash, Numbers
    var checkAlphaNumericFwdSlashNumbers = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        if ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) || (keyCode === 47) || checkOtherKeyCodes(keyCode) === true) {
            return true;
        }
        else {
            alert("Only Alphabets, Numbers, Forward Slash (/) are allowed in this field.");
            return false;
        }
    }

    //Except numbers
    var checkExceptNumbers = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        if ((keyCode >= 48 && keyCode <= 57) || checkOtherKeyCodes(keyCode) === true) {
            alert("Numbers are not allowed in this field.");
            return false;
        }
        else {
            return true;
        }
    }

    //Allow Numbers, Dot
    var checkDecimalNos = function (textvalue) {
        var char;
        char = textvalue.value.indexOf(".");
        if (char > -1) {
            for (i = 0; i < textvalue.value.length; i++) {
                if (textvalue.value.substring(char + 1).indexOf(".") > -1) {
                    alert("Only Decimal Values. You have entered more than one Dot(.)");
                    return false;
                }
            }
            if (textvalue.value.substring(char + 1).length > 3) {
                alert("Only 3 digits are allowed in decimal value after Dot(.)");
                return false;
            }
        }
    }

    //Allow only decimal numbers
    var acceptDecimalNos = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        var isNumeric = (keyCode === 8 || keyCode === 9 || keyCode === 13 || keyCode === 19) || (keyCode >= 33 && keyCode <= 46) || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105) || (checkOtherKeyCodes(keyCode) === true);

        return isNumeric;
    }

    //Check PopUp Blocker
    var checkPopUpBlock = function (url) {
        var newWin = window.open(url);

        if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
            //POPUP BLOCKED
            alert("Enable PopUps.");
        }
    }

    var highlightSelectedRow = function (tableRow) {

        if (tableRow !== undefined) {

            var tableRow = tableRow;

            var rowCSSClasses = tableRow.classList;

            if (rowCSSClasses.contains("highlight-selected-row")) {

                tableRow.classList.remove("highlight-selected-row");
            }
            else {
                tableRow.classList.add("highlight-selected-row");
            }
        }
    }

    var removeHighlightSelectedRow = function (table) {

        var table = table;

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.getElementsByTagName('tr');

        var rowsCount = tableRows.length;

        if (rowsCount > 0) {

            for (r = 0; r < rowsCount; r++) {

                var tableRow = tableRows[r];

                if (tableRow !== undefined) {

                    var rowCSSClasses = tableRow.classList;

                    if (rowCSSClasses.contains("highlight-selected-row")) {

                        tableRow.classList.remove("highlight-selected-row");
                    }
                }
            }
        }
    }

    var getNewTableRow = function (tableName, selectedRowIndex) {

        var objTable = {};

        var table = tableName;

        if (selectedRowIndex <= 0) {

            insertNewRow(table, false);
        }

        var tableBody = table.tBodies[0];

        var tableRows = tableBody.getElementsByTagName("tr");

        var rowsCount = tableRows.length;

        var rowIndex = 1;

        if (selectedRowIndex <= 0) {

            rowIndex = tableRows.length;
        }
        else {

            rowIndex = selectedRowIndex;
        }

        //set the rowindex - 1 to get the rows from 0 index
        var tableRow = tableRows[rowIndex - 1];

        if (tableRow !== undefined) {

            var tableCells = tableRow.getElementsByTagName('td');

            //#region Assign the control values to temp variables

            objTable = {
                TableRow: tableRow,
                RowIndex: rowIndex,
                TableCells: tableCells
            }
        }

        return objTable;
    }

    var insertNewRow = function (tableName, IsAnchorTagRequired) {

        var _tableName = tableName;

        var tableHead = _tableName.tHead;

        var colsCount = tableHead.getElementsByTagName("th").length;

        var tableBody = _tableName.tBodies[0];

        var rowsCount = tableBody.children.length;

        var rowIndex = 0;

        var row;

        if (rowsCount > 0) {

            row = tableBody.getElementsByTagName("tr"); //_tableName.find('tbody tr:last').not('thead tr');

            rowIndex = tableBody.children.length - 1;
        }

        rowIndex < 0 ? 0 : rowIndex += 1;

        if (colsCount > 0) {

            var tableRow = document.createElement("tr");

            for (i = 0; i < colsCount; i++) {

                var tableCell = document.createElement("td");

                if (IsAnchorTagRequired === true) {

                    if (i === 7 || i === 8) {

                        var thName = tableHead.children[0].children[i].innerText;

                        thName = thName.toLowerCase().replace(/\s/g, "");

                        var hl = '<a id=' + thName + rowIndex + '>' + thName + '</a>';  //createHyperLink(rowIndex);

                        tableCell.appendChild(hl);
                    }
                }

                tableRow.appendChild(tableCell);
            }

            tableBody.appendChild(tableRow);
        }
    }

    return {
        acceptOnlyNumbers: acceptOnlyNumbers,
        BindDropDown: BindDropDown,
        BindDropDownWithAsync: BindDropDownWithAsync,
        BindDropDownWithCallback: BindDropDownWithCallback,
        BindDropDownWithCallBack_Async: BindDropDownWithCallback_Async,
        BindDropDownWithDataAttributesCallback_Async: BindDropDownWithDataAttributesCallback_Async,
        bindSelectElement: bindSelectElement,
        bindSelectElementWithDataAttributes: bindSelectElementWithDataAttributes,
        checkEmailAddress: checkEmailAddress,
        callService: callService,
        highlightSelectedRow: highlightSelectedRow,
        setCheckboxValue: setCheckboxValue,
        getCheckboxValue: getCheckboxValue,
        setRadioButtonValue: setRadioButtonValue,
        getRadioSelectedValue: getRadioSelectedValue,
        setSelectValue: setSelectValue,
        setSelectMultipleValue: setSelectMultipleValue,
        setSelect2ControlsText: setSelect2ControlsText,
        setSelect2MultipleControlsText: setSelect2MultipleControlsText,
        getSelectValue: getSelectValue,
        removeHighlightSelectedRow: removeHighlightSelectedRow,
        showDatePicker: showDatePicker,
        getNewTableRow: getNewTableRow,
        insertNewRow: insertNewRow,
        callService_asyc: callService_asyc,
        getUrlVars: getUrlVars,
        Get_Pagewise_user_access_details: Get_Pagewise_user_access_details,
        createCookie: createCookie,
        getCookie: getCookie,
        deleteCookie: deleteCookie,
        getDateDifferenceInDays: getDateDifferenceInDays
    };

})();
