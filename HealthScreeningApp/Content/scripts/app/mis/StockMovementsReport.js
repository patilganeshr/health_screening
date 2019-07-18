

var Sofarch = {};

Sofarch.StockMovement = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    var Pettycase = [];

    /* --- private method ---- */
    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');
        DOM.viewMode = document.getElementById('ViewMode');
        DOM.editMode = document.getElementById('EditMode');

        DOM.searchdrugname = document.getElementById('SearchDrugName');
        DOM.todate = document.getElementById('ToDate');

        DOM.printstockmovementlist = document.getElementById('PrintStockMovementList');

        DOM.searchdruglist = document.getElementById('SearchDrugList');
    }

    function applyPlugins() {



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

        DOM.printpettycashReport.addEventListener('click', printpettyCashReport);

        DOM.searchdrugname.onkeyup = function (e) {

            if (CurrentFocus === undefined) { CurrentFocus = -1; }

            showSearchDrugList(e);

        };
    }


    function showDrugNameOnEnterKey() {

        FLAG = "NEW ITEM";

        var li = DOM.searchDrugList.querySelectorAll('.autocompleteListItem-active');

        var count = li.length;

        if (count) {

            setDrugName(li[0].textContent, parseInt(li[0].id));
        }

    }



    function showSearchDrugList(e) {

        if (e.keyCode === 13) {
            CurrentFocus = -1;
            showDrugNameOnEnterKey(e);
            return;
        }
        else if (e.keyCode === 9) {
            CurrentFocus = -1;
            shared.closeAutoCompleteList(DOM.searchdruglist);
            return;
        }

        var dataAttributes = ['Drug-Id', 'Drug-Code'];

        var parameters = {};

        parameters = {

            Event: e,
            CurrentFocus: CurrentFocus,
            PostDataKeyValue: postMessage,
            ElementToBeAppend: DOM.searchdruglist,
            DataAttributes: dataAttributes,
            PostParamObject: undefined,
            URL: SERVICE_PATH + "GetDrugIdAndDrugNameByDrugName/D/" + DOM.searchdrugname.value + "/",
            DisplayName: "DrugName"
        };

        shared.showAutoCompleteItemsList(parameters, function (response) {

            if (response !== undefined) {

                if (response >= 0) {

                    CurrentFocus = response;
                }
                else {

                    CurrentFocus = -1;

                    var autoCompleteList = response;

                    var listCount = autoCompleteList.length;

                    if (listCount) {

                        var data = "";

                        var fragment = document.createDocumentFragment();

                        var ul = document.createElement('ul');

                        ul.classList.add('list-group');

                        for (var s = 0; s < listCount; s++) {

                            var li = document.createElement('li');
                            var span = document.createElement('span');
                            var p = document.createElement('p');

                            li.classList.add('list-group-item');
                            li.classList.add('clearfix');

                            li.setAttribute('id', autoCompleteList[s].DrugId);
                            li.setAttribute('data-drug-code', autoCompleteList[s].DrugCode);

                            li.style.cursor = "pointer";
                            li.onclick = showDrugNameOnSelection;
                            li.textContent = autoCompleteList[s].DrugName;

                            fragment.appendChild(li);
                        }

                        ul.appendChild(fragment);

                        DOM.searchdruglist.appendChild(ul);

                        DOM.searchdruglist.style.width = e.target.offsetWidth + 'px';
                        DOM.searchdrugList.style.left = 0;//e.target.offsetParent.offsetLeft + 15 + 'px';

                        DOM.searchdruglist.classList.add('autocompleteList-active');
                        //DOM.itemsList.innerHTML = data;

                    }
                }
            }

        });
    }


    function printpettyCashReport() {

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

        shared.sendRequest(SERVICE_PATH + "printPettyCashReport", "POST", true, "JSON", postData, function (response) {

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


Sofarch.PettyCash.init();
