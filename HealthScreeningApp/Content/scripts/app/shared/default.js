
var SharpiTech = SharpiTech || {};

Shared = function() {
        
};

Shared.prototype = function () {

    var _createXMLHTTPObject = function () {

        var xhr;

        if (typeof XMLHttpRequest !== 'undefined') {
            xhr = new XMLHttpRequest();
        }
        else {
            var versions = [
                "MSXML2.XmlHttp.6.0",
                "MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"
            ];

            var versionsLength = versions.length;

            for (var vl = 0; vl < versionsLength; vl++) {
                try {
                    xhr = new ActiveXObject(versions[vl]);
                    break;
                }
                catch (e) {
                    console.log(e);
                }
            }
        }

        return xhr;
    };

    var sendRequest = function (url, method, async, responseType, data, callback) {

        var req = _createXMLHTTPObject();

        if (!req) return;

        var _method = method || "GET";
        var _async = async || true;

        req.open(_method, url, _async);

        //req.setRequestHeader('User-Agent', 'XMLHTTP/1.0');

        if (responseType === "JSON") {
            req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        }

        if (method === "POST") {
            //req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');            
        }

        req.onreadystatechange = function () {

            if (req.readyState !== 4) { return; }

            if (req.status !== 200) {
                //alert('HTTP Error ' + req.status);
                callback(req);
            }

            if (req.readyState === 4) { if (req.status === 200) { callback(req); } }
        };

        req.send(data);
    };

    var _httpRespone = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var response = JSON.parse(httpRequest.responseText);
                return response;
            }
            else {
                alert('There was a problem with the request.');
            }
        }
    };

    //Generic function to call AXMX/WCF  Service function CallService() {
    function callService(httpVerb, url, postData, contentType, dataType, processData, async, callback) {

        var isAsync = async || false;

        var output = $.ajax({
            //type: _Type, //GET or POST or PUT or DELETE verb
            //url: _WebUrl, // Location of the service
            //data: _UrlData, //Data sent to server
            //contentType: _ContentType, // content type sent to server
            //dataType: _DataType, //Expected data format from server
            //processdata: _ProcessData, //True or False
            type: httpVerb, //GET or POST or PUT or DELETE verb
            url: url, // Location of the service
            data: postData, //Data sent to server
            contentType: contentType, // content type sent to server
            dataType: dataType, //Expected data format from server
            processdata: processData, //True or False
            async: isAsync,
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
    }

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
    }

    function ServiceSucceeded1(result) {
        return result;
    }

    function ServiceFailed1(result) {
        alert('Service call failed: ' + result.status + '' + result.statusText);
        _Type = null; _WebUrl = null; _UrlData = null; _ContentType = null; _DataType = null; _ProcessData = null;
    }

    function fillDropdownWithSingleValue(control, textField, valueField, defaultOption) {
        
        var fragment = document.createDocumentFragment();

        defaultOption = defaultOption || "Choose";

        //Add default option
        var _option = document.createElement('OPTION');
        _option.innerHTML = defaultOption;
        _option.value = -1;
        fragment.appendChild(_option);

        _option = document.createElement('OPTION');
        _option.innerHTML = textField;
        _option.value = valueField;
        fragment.appendChild(_option);
        
        control.appendChild(fragment);

        setSelectOptionByIndex(control, 1);

    }

    function fillDropdownWithArrayData(data, selectName, textField, valueField, defaultOption) {

        if (data !== null) {

            var select = selectName;

            var fragment = document.createDocumentFragment();

            defaultOption = defaultOption || "Choose";

            //Add default option
            var option = document.createElement('OPTION');
            option.innerHTML = defaultOption;
            option.value = -1;
            fragment.appendChild(option);

            for (var r = 0; r < data.length; r++) {
                option = document.createElement('OPTION');
                option.innerHTML = data[r][textField];
                option.value = data[r][valueField];
                fragment.appendChild(option);
            }

            select.appendChild(fragment);

            setSelectOptionByIndex(selectName, 1);
            //setDefaultValue(selectName, null, 1);

        }
        else {
            var _errorLog = response.status + "<br/>";
            _errorLog += response.statusText;

            console.log("Method: fillDropdown, Message: " + response.Message);
            console.log("Method: fillDropdown, Message: " + response.ExceptionMessage);

            swal("Error in Application!!!", _errorLog, "error");
            return;
        }

    }

    function fillDropdownWithArrayDataAttributesAndCallback(data, selectName, textField, valueField, defaultOption, dataAttributes, callback) {

        if (data !== null) {

            var select = selectName;

            var fragment = document.createDocumentFragment();

            defaultOption = defaultOption || "Choose";

            //Add default option
            var _option = document.createElement('OPTION');
            _option.innerHTML = defaultOption;
            _option.value = -1;
            fragment.appendChild(_option);

            for (var r in data) {
                _option = document.createElement('OPTION');
                _option.innerHTML = data[r][textField];
                _option.value = data[r][valueField];

                if (dataAttributes !== undefined) {
                    if (dataAttributes.indexOf("|") > 0) {
                        var _dataAttributes = dataAttributes.split("|");

                        if (_dataAttributes.length > 0) {
                            for (var da = 0; da < _dataAttributes.length; da++) {
                                _option.setAttribute('data-' + _dataAttributes[da].toLowerCase().replace(/_/g, "-").replace(/\s+/g, ""), data[r][_dataAttributes[da]]);
                            }
                        }
                    }
                    else {
                        _option.setAttribute('data-' + dataAttributes.toLowerCase().replace(/_/g, "-").replace(/\s+/g, ""), data[r][dataAttributes]);
                    }
                }

                fragment.appendChild(_option);
            }

            select.appendChild(fragment);

            setSelectOptionByIndex(selectName, 1);
            //setDefaultValue(selectName, null, 1);

            callback(data);
        }
    }


    function fillDropdown(url, selectName, textField, valueField, defaultOption) {

        sendRequest(url, "GET", true, "JSON", undefined, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {

                var _select = selectName;

                var fragment = document.createDocumentFragment();

                defaultOption = defaultOption || "Choose";

                //Add default option
                var _option = document.createElement('OPTION');
                _option.innerHTML = defaultOption;
                _option.value = -1;
                fragment.appendChild(_option);

                for (var r in _response) {
                    _option = document.createElement('OPTION');
                    _option.innerHTML = _response[r][textField];
                    _option.value = _response[r][valueField];
                    fragment.appendChild(_option);
                }

                _select.appendChild(fragment);

                setSelectOptionByIndex(selectName, 1);
                //setDefaultValue(selectName, null, 1);

            }
            else {
                var _errorLog = response.status + "<br/>";
                _errorLog += response.statusText;

                console.log("Method: fillDropdown, Message: " + _response.Message);
                console.log("Method: fillDropdown, Message: " + _response.ExceptionMessage);

                swal("Error in Application!!!", _errorLog, "error");
                return;
            }

        });

        //sendRequest(url, )
        //$.ajax({
        //    type: "GET",
        //    url: url,
        //    contentType: "application/json; charset=utf-8",
        //    dataType: "json",
        //    crossdomain: true,
        //    success: function (r) {
        //        var ddl = dropdownname;
        //        defaultOption = defaultOption || "Please Select";

        //        ddl.empty().append('<option value="-1">' + defaultOption + '</option>');

        //        $.each(r, function (key, val) {
        //            ddl.append($("<option></option>").val(val['' + valuefield + '']).html(val['' + textField + '']));
        //        });
        //    }
        //});
    }

    function fillDropdownWithCallback(url, selectName, textField, valueField, defaultOption, callback) {

        sendRequest(url, "GET", true, "JSON", undefined, function (response) {

            var _select = selectName;

            var _response = JSON.parse(response.responseText);

            var fragment = document.createDocumentFragment();

            defaultOption = defaultOption || "Choose";

            //Add default option
            var _option = document.createElement('OPTION');
            _option.innerHTML = defaultOption;
            _option.value = -1;
            fragment.appendChild(_option);

            for (var r in _response) {
                _option = document.createElement('OPTION');
                _option.innerHTML = _response[r][textField];
                _option.value = _response[r][valueField];
                fragment.appendChild(_option);
            }

            _select.appendChild(fragment);

            callback(response);

        });
    }

    function fillDropdownUsingPostWithCallback(url, selectName, textField, valueField, defaultOption, postdata, callback) {

        sendRequest(url, "POST", true, "JSON", postdata, function (response) {

            var _select = selectName;

            var _response = JSON.parse(response.responseText);

            var fragment = document.createDocumentFragment();

            defaultOption = defaultOption || "Choose";

            //Add default option
            var _option = document.createElement('OPTION');
            _option.innerHTML = defaultOption;
            _option.value = -1;
            fragment.appendChild(_option);

            for (var r in _response) {
                _option = document.createElement('OPTION');
                _option.innerHTML = _response[r][textField];
                _option.value = _response[r][valueField];
                fragment.appendChild(_option);
            }

            _select.appendChild(fragment);

            callback(response);

        });
    }

    function fillDropdownWithDataAttributes(url, selectName, textField, valueField, dataAttributes, defaultOption) {

        sendRequest(url, "GET", true, "JSON", undefined, function (response) {

            var _response = JSON.parse(response.responseText);

            if (response.status === 200) {

                var _select = selectName;

                var fragment = document.createDocumentFragment();

                defaultOption = defaultOption || "Choose";

                //Add default option
                var _option = document.createElement('OPTION');
                _option.innerHTML = defaultOption;
                _option.value = -1;
                fragment.appendChild(_option);

                for (var r in _response) {
                    _option = document.createElement('OPTION');
                    _option.innerHTML = _response[r][textField];
                    _option.value = _response[r][valueField];

                    if (dataAttributes !== undefined) {
                        if (dataAttributes.indexOf("|") > 0) {
                            var _dataAttributes = dataAttributes.split("|");

                            if (_dataAttributes.length > 0) {
                                for (var da = 0; da < _dataAttributes.length; da++) {
                                    _option.setAttribute('data-' + _dataAttributes[da].toLowerCase().replace(/_/g, "-").replace(/\s+/g, ""), val['' + _response[r][_dataAttributes[da]] + '']);
                                }
                            }
                        }
                        else {
                            _option.setAttribute('data-' + dataAttributes.toLowerCase().replace(/_/g, "-").replace(/\s+/g, ""), _response[r][dataAttributes]);
                        }
                    }

                    fragment.appendChild(_option);
                }

                _select.appendChild(fragment);

                setSelectOptionByIndex(selectName, 1);
                //setDefaultValue(selectName, null, 1);

            }
            else {
                var _errorLog = response.status + "<br/>";
                _errorLog += response.statusText;

                console.log("Method: fillDropdown, Message: " + _response.Message);
                console.log("Method: fillDropdown, Message: " + _response.ExceptionMessage);

                swal("Error in Application!!!", _errorLog, "error");
                return;
            }

        });
    }

    function fillDropdownWithDataAttributesAndCallback(url, selectName, textField, valueField, defaultOption, dataAttributes, callback) {

        sendRequest(url, "GET", true, "JSON", undefined, function (response) {

            var _select = selectName;

            var _response = JSON.parse(response.responseText);

            var fragment = document.createDocumentFragment();

            defaultOption = defaultOption || "Choose";

            //Add default option
            var _option = document.createElement('OPTION');
            _option.innerHTML = defaultOption;
            _option.value = -1;
            fragment.appendChild(_option);

            for (var r in _response) {
                _option = document.createElement('OPTION');
                _option.innerHTML = _response[r][textField];
                _option.value = _response[r][valueField];

                if (dataAttributes !== undefined) {
                    if (dataAttributes.indexOf("|") > 0) {
                        var _dataAttributes = dataAttributes.split("|");

                        if (_dataAttributes.length > 0) {
                            for (var da = 0; da < _dataAttributes.length; da++) {
                                _option.setAttribute('data-' + _dataAttributes[da].toLowerCase().replace(/_/g, "-").replace(/\s+/g, ""), _response[r][_dataAttributes[da]]);
                            }
                        }
                    }
                    else {
                        _option.setAttribute('data-' + dataAttributes.toLowerCase().replace(/_/g, "-").replace(/\s+/g, ""), _response[r][dataAttributes]);
                    }
                }

                fragment.appendChild(_option);
            }

            _select.appendChild(fragment);

            setSelectOptionByIndex(selectName, 1);
            //setDefaultValue(selectName, null, 1);

            callback(response);
        });
    }

    var clearInputs = function clearInputs(parentControl) {

        if (parentControl !== undefined) {

            /* clear all type of inputs values */
            var inputs = parentControl.getElementsByTagName("INPUT");

            if (inputs.length > 0) {

                for (var i = 0; i < inputs.length; i++) {

                    inputs[i].value = "";
                }
            }
        }
    };

    var clearSelect = function (parentControl) {

        if (parentControl !== undefined) {

            /* set dropdown select index value to 1 */
            var selects = parentControl.getElementsByTagName("SELECT");

            if (selects.length > 0) {

                for (var i = 0; i < selects.length; i++) {

                    setSelectOptionByIndex(selects[i], parseInt(0));
                    setSelect2ControlsText(selects[i]);
                }
            }
        }
    };

    var clearCheckbox = function (parentControl) {

        if (parentControl !== undefined) {

            /* set dropdown select index value to 1 */
            var checkboxes = parentControl.getElementsByTagName("checkbox");

            if (checkboxes.length) {

                for (var i = 0; i < checkboxes.length; i++) {

                    checkboxes[i].checked = false;
                }
            }
        }
    };

    var clearTables = function (parentControl) {

        if (parentControl !== undefined) {

            /* Clear table*/
            var tables = parentControl.getElementsByTagName('TABLE');

            if (tables.length > 0) {

                for (var t = 0; t < tables.length; t++) {

                    var tableBody = tables[t].getElementsByTagName('tbody');
                    var tableFooter = tables[t].getElementsByTagName('tfoot');

                    if (tableBody.length) {
                        tables[t].tBodies[0].innerHTML = "";
                    }

                    if (tableFooter.length) {
                        tables[t].tFoot.innerHTML = "";
                    }
                }
            }
        }
    };

    var clearTextAreas = function clearTextAreas(parentControl) {

        if (parentControl !== undefined) {

            /* clear all textareas value */
            var textAreas = parentControl.getElementsByTagName("TEXTAREA");

            if (textAreas.length > 0) {

                for (var i = 0; i < textAreas.length; i++) {

                    textAreas[i].value = "";
                }
            }
        }
    };

    var disableControls = function (parentControl, isDisabled) {

        var inputs = parentControl.getElementsByTagName("INPUT");

        var countOfInputs = inputs.length;

        if (countOfInputs > 0) {

            for (i = 0; i < countOfInputs; i++) {

                inputs[i].disabled = isDisabled;
            }
        }

        var textAreas = parentControl.getElementsByTagName("TEXTAREA");

        var countOfTextAreas = textAreas.length;

        if (countOfTextAreas > 0) {

            for (i = 0; i < countOfTextAreas; i++) {

                textAreas[i].disabled = isDisabled;
            }
        }

        var selects = parentControl.getElementsByTagName("select");

        var countOfSelects = selects.length;

        if (countOfSelects > 0) {

            for (i = 0; i < countOfSelects; i++) {

                selects[i].disabled = isDisabled;
            }
        }

    };

    var disableSpecificControls = function (listOfControls, isDisabled) {

        var controls = listOfControls;
        
        if (controls.length > 0) {

            for (i = 0; i < controls.length; i++) {

                controls[i].disabled = isDisabled;
            }
        }
    };

    var enableDisableButtons = function (controls, flag) {

        var control = {};

        control = controls;

        if (flag.toUpperCase() === "NEW") {

            if (control.EditMode !== undefined) {
                control.EditMode.style.removeProperty("display");
            }
            if (control.ViewMode !== undefined) {
                control.ViewMode.style.display = "none";
            }
            control.CreateNew.style.display = "none";
            control.Save.style.removeProperty("display");
        }
        else if (flag.toUpperCase() === "VIEW") {

            if (control.EditMode !== undefined) {
                control.EditMode.style.display = "none";
            }
            if (control.ViewMode !== undefined) {
                control.ViewMode.style.removeProperty("display");
            }
            control.CreateNew.style.removeProperty("display");
            control.Save.style.display = "none";
        }
        else if (flag.toUpperCase() === "EDIT") {

            if (control.EditMode !== undefined) {
                control.EditMode.style.removeProperty("display");
            }
            if (control.ViewMode !== undefined) {
                control.ViewMode.style.display = "none";
            }
            control.CreateNew.style.removeProperty("display");
            control.Save.style.removeProperty("display");
        }
        else if (flag.toUpperCase() === "SELECTED") {

            if (control.EditMode !== undefined) {
                control.EditMode.style.removeProperty("display");
            }
            if (control.ViewMode !== undefined) {
                control.ViewMode.style.display = "none";
            }
            control.CreateNew.style.removeProperty("display");
            control.Save.style.display = "none";
        }

    };

    var setDefaultValue = function (selectControlName, text, value) {

        if (selectControlName.options.length > 0) {

            if (value !== undefined) {
                setSelectValue(selectControlName, null, parseInt(value));
            }
            else {
                setSelectValue(selectControlName, text, null);
            }

            setSelect2ControlsText(selectControlName);

        }
    };

    var disableRadioOptions = function (nameOfControl, isDisabled) {

        var selectedValue = "";

        var _itemsCount = 0;

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {
                    nameOfControl[i].disabled = isDisabled;
                }
            }
        }

        return selectedValue;
    };

    var disableCheckBoxOptions = function (nameOfControl, isDisabled) {

        var selectedValue = [];

        var _itemsCount = 0;

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {
                    nameOfControl[i].disabled = isDisabled;
                }
            }
        }

        return selectedValue;
    };

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
    };

    var isRadioButtonValueSelected = function (nameOfControl) {

        var selectedValue = false;

        var _itemsCount = 0;

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {
                    if (nameOfControl[i].checked) {
                        selectedValue = true;
                        break;
                    }
                }
            }
        }

        return selectedValue;
    };


    var getCheckboxValues = function (nameOfControl) {

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
    };

    var getCheckboxValue = function (nameOfControl) {

        var selectedValue = false;

        var _itemsCount = 0;

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {
                    if (nameOfControl[i].checked) {
                        selectedValue = nameOfControl[i].value;
                    }
                }
            }
        }

        return selectedValue;
    };

    var setCheckboxValue = function (nameOfControl, text, value) {

        var selectedValue = [];

        var _itemsCount = 0;

        if (nameOfControl !== undefined) {

            _itemsCount = nameOfControl.length;

            if (_itemsCount > 0) {

                for (i = 0; i < _itemsCount; i++) {
                    if (value === true) {
                        nameOfControl[i].checked = true;
                    }
                    else {
                        nameOfControl[i].checked = false;
                    }
                }
            }
        }

        return selectedValue;
    };

    var isCheckboxValueSelected = function (nameOfControl) {

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
    };

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
    };

    var setSelectValue = function (nameOfControl, textToSet, valueToSet) {

        var _itemsCount = 0;

        var _valueToSet = parseInt(valueToSet);

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
    };

    var setSelectOptionByIndex = function (nameOfControl, index) {

        var optionsCount = 0;

        //var index = parseInt(index);

        if (isNaN(index)) {

            index = parseInt(0);
        }

        if (nameOfControl !== undefined) {

            optionsCount = nameOfControl.options.length;

            if (optionsCount > 0) {

                nameOfControl.options[index].selected = true;

                setSelectValue(nameOfControl, null, nameOfControl.options[index].value);
                setSelect2ControlsText(nameOfControl);

                return;
            }
        }
    };

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
    };

    var setSelect2ControlsText = function (selectControl) {

        var selectControlID = selectControl.id;

        var select2Span;

        if (selectControl.multiple === false) {

            select2Span = document.getElementById("select2-" + selectControlID + "-container");

            if (select2Span !== null) {

                if (select2Span !== undefined) {

                    if (selectControl.selectedIndex >= 0) {

                        var selectedText = selectControl.options[selectControl.selectedIndex].text;

                        select2Span.title = selectedText;

                        select2Span.innerText = selectedText;
                    }
                }
            }
        }
    };

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
    };

    var setRadioButtonValue = function (nameOfControl, textToSet, valueToSet) {

        var selectedValue = "";

        var itemsCount = 0;

        if (nameOfControl !== undefined) {

            itemsCount = nameOfControl.length;

            if (itemsCount > 0) {

                for (i = 0; i < itemsCount; i++) {

                    if (textToSet !== null) {

                        if (nameOfControl[i].labels[0].innerText.trim().toUpperCase() === textToSet.toUpperCase()) {

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
    };

    //var setCheckboxValue = function (nameOfControl, valueToSet) {

    //    var selectedValue = [];

    //    var itemsCount = 0;

    //    if (nameOfControl !== undefined) {

    //        itemsCount = nameOfControl.length;

    //        if (itemsCount > 0) {

    //            for (i = 0; i < itemsCount; i++) {

    //                if (nameOfControl[i].labels[0].innerText === valueToSet) {

    //                    nameOfControl[i].checked = true;

    //                }
    //            }
    //        }
    //    }
    //};

    var checkOtherKeyCodes = function (keyCode) {

        /* Checking keypress as Delete, Tab, Enter */
        if (keyCode === 8 || keyCode === 9 || keyCode === 13 || keyCode === 19 || keyCode === 32 ||
            keyCode >= 33 && keyCode <= 47 || keyCode >= 112 && keyCode <= 123) {
            return;
        }
        else {
            return false;
        }
    };

    //Allow only numbers
    var acceptOnlyNumbers = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        var isNumeric = (keyCode === 8 || keyCode === 9 || keyCode === 13 || keyCode === 19) ||
            (keyCode >= 33 && keyCode <= 46) || (keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 96 && keyCode <= 105) || (checkOtherKeyCodes(keyCode) === true);

        return isNumeric;
    };

    var acceptDecimalNos = function (event) {

        event = event || window.event;

        var keyCode = (event.which || event.keyCode);

        var isNumeric = (keyCode === 8 || keyCode === 9 || keyCode === 13 || keyCode === 19) ||
            (keyCode >= 33 && keyCode <= 46) || (keyCode >= 48 && keyCode <= 57) ||
            (keyCode >= 96 && keyCode <= 105) || keyCode === 110 || (checkOtherKeyCodes(keyCode) === true);

        return isNumeric;
    };

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
    };

    var createHTMLTag = function (tagName, id, name, cssClass, textNode) {

        var _htmlTag = document.createElement(tagName);

        if (id !== undefined) {
            _htmlTag.setAttribute('id', id);
        }

        //if (name !== undefined) {

        //}

        if (cssClass !== undefined) {
            _htmlTag.classList.add(cssClass);
        }

        if (textNode !== undefined) {
            _htmlTag.TEXT_NODE = textNode;
        }

        return _htmlTag;
    };


    var createCookie = function (name, value, expires, path, domain) {

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
    };

    var getCookie = function (name) {
        var regexp = new RegExp("(?:^" + name + "|;\s*" + name + ")=(.*?)(?:;|$)", "g");
        var result = regexp.exec(document.cookie);
        return result === null ? null : result[1];
    };

    var deleteCookie = function (name, path, domain) {
        // If the cookie exists
        if (getCookie(name))
            createCookie(name, "", -1, path, domain);
    };

    var getDateDifferenceInDays = function (date1, date2) {

        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        // Discard the time and time-zone information.
        var utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        var utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);

    };

    var getUrlVars = function () {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        //alert(vars);
        return vars;
    };

    var highlightSelectedRow = function (tableRow) {

        var table = tableRow.parentElement.parentElement;

        removeHighlightEffect(table);

        if (tableRow !== undefined) {

            var rowCSSClasses = tableRow.classList;

            if (rowCSSClasses.contains("highlight-selected-row")) {

                tableRow.classList.remove("highlight-selected-row");
            }
            else {
                tableRow.classList.add("highlight-selected-row");
            }
        }
    };

    var removeHighlightEffect = function (table) {

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

    };

    var createTable = function () {

    };

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

    var panelShowHide = function (editModeElement, viewModeElement, displayEditMode, displayViewMode) {

        editModeElement.style.display = displayEditMode;
        viewModeElement.style.display = displayViewMode;
    };

    var getParameterByName = function (name, url) {

        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    var showLoader = function (element) {

        element.style.display = "block";
    };

    var hideLoader = function (element) {

        element.style.display = "none";
    };

    var showPanel = function (element) {

        element.style.display = "block";
    };

    var hidePanel = function (element) {

        element.style.display = "none";
    };

    var getMaxSrNo = function (data, maxSrNo) {

        var _maxSrNo = maxSrNo;

        if (data.length > 0) {

            for (var s = 0; s < data.length; s++) {

                if (data[s].SrNo >= _maxSrNo) {
                    _maxSrNo = data[s].SrNo;
                }
            }
        }

        return _maxSrNo += 1;
    };

    var openChildWindow = function (url, targetLocation, heightOfWindow, widthOfWindow, isToolbarRequired,
        isMenubarRequired, isScrollbarsRequired, isResizable, topLocation, leftLocation) {

        targetLocation = targetLocation || '_blank';
        heightOfWindow = heightOfWindow || 300;
        widthOfWindow = widthOfWindow || 200;
        isToolbarRequired = isToolbarRequired || 'no';
        isMenubarRequired = isMenubarRequired || 'no';
        isScrollbarsRequired = isScrollbarsRequired || 'yes';
        isResizable = isResizable || 'yes';
        topLocation = topLocation || '500';
        leftLocation = leftLocation || '500';

        window.open(url, targetLocation, 'height=' + heightOfWindow, 'width=' + widthOfWindow, 'toolbar=' + isToolbarRequired,
            'menubar=' + isMenubarRequired, 'scrollbars=' + isScrollbarsRequired, 'resizable=' + isResizable,
            'top=50%', 'left=50%');
    };

    var roundOff = function (value, decimals) {
        return Number(Math.round(parseFloat(value) + 'e' + decimals) + 'e-' + decimals);
    };

    var createElement = function (elementName, inputType, inputClass, inputName, inputId) {

        var element = document.createElement(elementName);

        if (inputType !== undefined) {
            element.setAttribute('type', inputType);
        }
        if (inputClass !== undefined) {
            element.setAttribute('class', inputClass);
        }
        if (inputName !== undefined) {
            element.setAttribute('name', inputName);
        }
        if (inputId !== undefined) {
            element.setAttribute('id', inputId);
        }

        return element;
    };

    function showAutoCompleteItemsList(parameters, callback) {
        //e, currentFocus, keyName, elementToBeAppend, arrayList, dataAttributes, url, callback) {

        var event = parameters["Event"];
        var currentFocus = parameters["CurrentFocus"];
        var elementToBeAppend = parameters["ElementToBeAppend"];
        //var dataAttributes = parameters["DataAttributes"];
        var postParamObject = parameters["PostParamObject"];
        var url = parameters["URL"];
        //var displayName = parameters["DisplayName"];

        if (event.target.value === "") {
            currentFocus = -1;
            closeAutoCompleteList(elementToBeAppend);
            return;
        }

        if (event.keyCode === 40) {
            currentFocus++;
            addActive(elementToBeAppend, currentFocus);
        }
        else if (event.keyCode === 38) {
            currentFocus--;
            addActive(elementToBeAppend, currentFocus);
        }
        else {

            var autoCompleteList = [];

            autoCompleteList.length = 0;

            closeAutoCompleteList(elementToBeAppend);

            currentFocus = -1;

            var method = "GET";

            var postData = null;

            if (postParamObject !== undefined) {

                var data = {};

                data[postParamObject] = event.target.value;

                postData = JSON.stringify(data);

                method = "POST";
            }

            sendRequest(url, method, true, "JSON", postData, function (response) {

                if (response.status === 200) {

                    autoCompleteList = JSON.parse(response.responseText);

                    callback(autoCompleteList);

                }
            });
        }

        callback(currentFocus);

    } 

    function addActive(element, currentFocus) {

        removeActive(element);

        var li = element.querySelectorAll('li');

        var count = li.length;

        if (currentFocus >= count) {
            currentFocus = 0;
        }

        if (currentFocus < 0) {
            currentFocus = count - 1;
        }

        li[currentFocus].classList.add('autocompleteListItem-active');

        element.scrollTop = parseInt(li[currentFocus].offsetHeight * currentFocus ) - currentFocus;

        return currentFocus;
    }

    function removeActive(element) {

        var li = element.querySelectorAll('li');

        var count = li.length;

        if (count) {

            for (var l = 0; l < count; l++) {

                li[l].classList.remove('autocompleteListItem-active');
            }
        }

    }

     
    // Will Implement later 

    //function setItem(e, targetElement, elementToBeAppend, dataAttributes, isTargetElementShouldBeBlank, isCallBack, callback) {

    //    FLAG = "NEW ITEM";

    //    targetElement.value = e.target.textContent;

    //    var data = {};

    //    if (dataAttributes.length) {

    //        for (var d = 0; d < dataAttributes.length; d++) {

    //            var attributeName = dataAttributes[d].toLowerCase();
    //            var keyName = dataAttributes[d].replace(/-/g, '');

    //            targetElement.setAttribute('data-' + attributeName, dataAttributes[d][keyName]);

    //            data[keyName.substring(0, 1).toLowerCase + keyName.substring(1)] = dataAttributes[d][keyName];
    //        }
    //    }

    //    shared.closeAutoCompleteList(elementToBeAppend);

    //    if (isCallBack) {

    //        return callback(data);
    //    }

    //    if (isTargetElementShouldBeBlank) {
    //        targetElement.value = "";
    //    }

    //}

    function closeAutoCompleteList(element) {

        element.classList.remove('autocompleteList-active');

        var ul = element.querySelectorAll('ul');

        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }

    }

    return {
        clearInputs: clearInputs,
        clearSelect: clearSelect,
        clearTables: clearTables,
        clearTextAreas: clearTextAreas,
        createElement: createElement,
        disableControls: disableControls,
        disableSpecificControls: disableSpecificControls,
        enableDisableButtons: enableDisableButtons,
        getSelectValue: getSelectValue,
        setSelectValue: setSelectValue,
        sendRequest: sendRequest,
        callService: callService,
        fillDropdown: fillDropdown,
        fillDropdownWithArrayData: fillDropdownWithArrayData,
        fillDropdownWithArrayDataAttributesAndCallback: fillDropdownWithArrayDataAttributesAndCallback,
        fillDropdownWithSingleValue: fillDropdownWithSingleValue,
        fillDropdownWithCallback: fillDropdownWithCallback,
        fillDropdownWithDataAttributes: fillDropdownWithDataAttributes,
        fillDropdownWithDataAttributesAndCallback: fillDropdownWithDataAttributesAndCallback,
        fillDropdownUsingPostWithCallback: fillDropdownUsingPostWithCallback,
        setDefaultValue: setDefaultValue,
        setSelectMultipleValue: setSelectMultipleValue,
        setSelect2ControlsText: setSelect2ControlsText,
        setSelect2MultipleControlsText: setSelect2MultipleControlsText,
        setSelectOptionByIndex: setSelectOptionByIndex,
        setRadioButtonValue: setRadioButtonValue,
        getRadioSelectedValue: getRadioSelectedValue,
        getParameterByName: getParameterByName,
        isRadioButtonValueSelected: isRadioButtonValueSelected,
        isCheckboxValueSelected: isCheckboxValueSelected,
        getCheckboxValues: getCheckboxValues,
        getCheckboxValue: getCheckboxValue,
        setCheckboxValue: setCheckboxValue,
        highlightSelectedRow: highlightSelectedRow,
        removeHighlightEffect: removeHighlightEffect,
        acceptOnlyNumbers: acceptOnlyNumbers,
        acceptDecimalNos: acceptDecimalNos,
        checkDecimalNos: checkDecimalNos,
        panelShowHide: panelShowHide,
        showLoader: showLoader,
        hideLoader: hideLoader,
        showPanel: showPanel,
        hidePanel: hidePanel,
        openChildWindow: openChildWindow,
        getMaxSrNo: getMaxSrNo,
        roundOff: roundOff,
        createTableHeader: createTableHeader,
        createTableBody: createTableBody,
        showAutoCompleteItemsList: showAutoCompleteItemsList,
        closeAutoCompleteList: closeAutoCompleteList        
    };

}();