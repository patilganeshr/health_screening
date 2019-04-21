
var SharpiTech = {};

SharpiTech.VoucherSync = (function () {

    //placeholder for cached DOM elements
    var DOM = {};

    var shared = new Shared();

    /* ---- private method ---- */

    //cache DOM elements
    function cacheDOM() {

        DOM.loader = document.getElementById('Loader');

        DOM.voucherType = document.getElementById('VoucherType');
        DOM.fromToVoucherPeriod = document.getElementById('FromToVoucherPeriod');
        DOM.fromToVoucherNo = document.getElementById('FromToVoucherNo');

        DOM.fromToPeriod = document.getElementById('FromToPeriod');
        DOM.fromDate = document.getElementById('FromDate');
        DOM.toDate = document.getElementById('ToDate');
        DOM.fromDatePicker = document.getElementById('FromDatePicker');
        DOM.toDatePicker = document.getElementById('ToDatePicker');

        DOM.fromToBillNo = document.getElementById('FromToBillNo');
        DOM.financialYear = document.getElementById('FinancialYear');
        DOM.fromBillNo = document.getElementById('FromBillNo');
        DOM.toBillNo = document.getElementById('ToBillNo');
        DOM.syncWithTally = document.getElementById('SyncWithTally');

        DOM.$fromDatePicker = $('#FromDatePicker');
        DOM.$toDatePicker = $('#ToDatePicker');

        
    }

    function applyPlugins() {

        $('select').select2();

        var currentDate = new Date();

        DOM.$fromDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

        DOM.$toDatePicker.datetimepicker({
            format: 'DD/MMM/YYYY',
            defaultDate: moment(currentDate).format("DD/MMM/YYYY")
        });

    }

    /* ---- handle errors ---- */
    function handleError(err) {
        console.log('Application Error: ' + err);
    }

    /* ---- render ---- */
    function render() {


    }

    $("select").on("change", function (event) {

        setFocusOnSelect(event);

    });


    function bindEvents() {

        DOM.fromToVoucherPeriod.onchange = function (e) {
            toggleFromToPeriodPanel(e);
        };

        DOM.fromToVoucherNo.onchange = function (e) {
            toggleFromToBillNoPanel(e);
        };

        DOM.syncWithTally.addEventListener('click', generateTallyData);
    }

    function setFocusOnSelect(e) {
        setTimeout(function () {
            e.currentTarget.focus();
        }, 200);
    }

    function loadData() {

        getFinancialYear();
        getVoucherType();
        
    }

    function getFinancialYear() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetAllWorkingPeriods', DOM.financialYear, "FinancialYear", "WorkingPeriodId", "Choose Year", function (response) {

            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {

                    shared.setSelectOptionByIndex(DOM.financialYear, parseInt(0));
                    shared.setSelect2ControlsText(DOM.financialYear);

                }
            }

            shared.hideLoader(DOM.loader);

        });
    }

    function getVoucherType() {

        shared.showLoader(DOM.loader);

        shared.fillDropdownWithCallback(SERVICE_PATH + 'GetVoucherType/', DOM.voucherType, "TypeOfVoucher", "VoucherTypeId", "Choose Voucher Type", function (response) {
            
            if (response.status === 200) {

                shared.showLoader(DOM.loader);

                if (response.responseText !== undefined) {
                    shared.setSelectOptionByIndex(DOM.voucherType, parseInt(1));
                    shared.setSelect2ControlsText(DOM.voucherType);
                }
            }

            shared.hideLoader(DOM.loader);

        });

        shared.hideLoader(DOM.loader);
        
    }

    function toggleFromToPeriodPanel(e) {

        if (e.currentTarget.checked) {
            DOM.fromToPeriod.classList.add('show');
            DOM.fromToPeriod.classList.remove('hide');
            DOM.fromToBillNo.classList.remove('show');
            DOM.fromToBillNo.classList.add('hide');
        }

    }

    function toggleFromToBillNoPanel(e) {

        if (e.currentTarget.checked) {
            DOM.fromToPeriod.classList.remove('show');
            DOM.fromToPeriod.classList.add('hide');
            DOM.fromToBillNo.classList.remove('hide');
            DOM.fromToBillNo.classList.add('show');
        }

    }

    var validateData = function () {

        var IsValidData = true;

        if (DOM.voucherType.selectedIndex === 0) {
            swal("Error", "Please Select the Voucher Type.", "error");
            IsValidData = false;
            DOM.voucherType.focus();
            return IsValidData;
        }
        else if ((DOM.fromDate.value === "" && DOM.toDate === "") && (DOM.fromBillNo.value === "" && DOM.toBillNo.value === "")) {
            swal("Error", "Please enter either From-To Date or From-To Bill No. range.", "error");
            IsValidData = false;
            return IsValidData;
        }

        if (DOM.fromBillNo.value !== "" && DOM.financialYear.selectedIndex === -1) {
            swal("Error", "Please select the Financial Year if you want to transfer using Bill No..", "error");
            IsValidData = false;
            return IsValidData;
        }

        return IsValidData;
    };

    function generateTallyData() {

        var IsValidData = true;

        IsValidData = validateData();

        if (IsValidData === true) {

            var data = {};

            data = {
                VoucherType: DOM.voucherType.options[DOM.voucherType.selectedIndex].text,
                FromDate: DOM.fromDate.value,
                ToDate: DOM.toDate.value,
                FromVoucherNo: DOM.fromBillNo.value,
                ToVoucherNo: DOM.toBillNo.value,
                WorkingPeriodId: parseInt(DOM.financialYear.options[DOM.financialYear.selectedIndex].value)
            };

            var postData = JSON.stringify(data);

            shared.sendRequest(SERVICE_PATH + "PostVoucherDataToTally/", "POST", true, "JSON", postData, function (response) {

                if (response.status === 200) {

                    if (response.responseText !== undefined) {

                        var res = JSON.parse(response.responseText);

                        if (res) {
                            swal("Success", "Data Synced Successfully. Please check the Tally.Imp file and records in Tally.", "success");
                        }
                    }
                }
            });
        }
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


SharpiTech.VoucherSync.init();
