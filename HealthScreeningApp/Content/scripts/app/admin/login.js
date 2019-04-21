var Sofarch = Sofarch || {};
var Admin = Sofarch.Admin || {};

function Login() {


}

Login.prototype = function() {

    var DOM = {};

    var shared = new Shared();

    function cacheDOM() {
        DOM.userName = document.getElementById('UserName');
        DOM.password = document.getElementById('Password');
        DOM.logIn = document.getElementById('LogIn');
    }

    function bindEvents() {

        DOM.logIn.addEventListener('click', verifyUser);
    }

    function validateData() {

        var IsValidData = true;

        if (DOM.userName.value === "") {
            DOM.userName.focus();
            swal("Error", "Please enter the User Name.", "error");
            IsValidData = false;
        }
        else if (DOM.password.value === "") {
            DOM.password.focus();
            swal("Error", "Please enter the Password.", "error");
            IsValidData = false;
        }

        return IsValidData;
    }

    function verifyUser() {

        var userName = "";
        var password = "";

        if (validateData()) {

            userName = DOM.userName.value;
            password = DOM.password.value;

            shared.sendRequest(SERVICE_PATH + "GetUserDetails/" + userName + '/' + password, "GET", true, "JSON", null, function (response) {

                if (response.responseText !== undefined) {

                    var _response = JSON.parse(response.responseText);

                    if (_response.UserId === 0) {
                        DOM.userName.focus();
                        swal("Warning", "No User Found. Please check the username and password is correct.", "warning");
                        return;
                    }
                    else {
                        location.href = window.location.origin + 'HealthScreeningApp/Dashboard';
                    }
                }

            });
        }
    }

    function init() {
        cacheDOM();
        bindEvents();
    }

    return {
        init: init
    };

}();

var login = new Login();

//login.cacheDOM();
login.init();
