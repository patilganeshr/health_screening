
var Sofarch = Sofarch || null;
var Site = Site || null;

function SiteMaster() {

}

SiteMaster.prototype = function () {

    function loadFiles(type, path) {

        var fileRef = null;

        if (type.toLowerCase() === "css") {
            fileRef = document.createElement('link');
            fileRef.setAttribute('rel', 'stylesheet');
            fileref.setAttribute('type', 'text/css');
            fileref.setAttribute('href', path);
        }
        else if (type.toLowerCase() === "js") {
            fileRef = document.createElement('script');
            fileref.setAttribute('type', 'text/javascript');
            fileRef.setAttribute('src', path);
        }
    }


    function loadCSSAndJSFiles() {

        var vendorCSSPath = "content/css/vendor/";
        var appCSSPath = "content/css/app";

        var vendorJSPath = "content/scripts/vendor/";
        var appJSPath = "content/scripts/app";

        var VendorCSSFiles = [
            'bootstrap/bootstrap.min.css',
            'bootstrap-touchspin/jquery.bootstrap-touchspin.min.css',
            'font-awesome/font-awesome.min.css',
            'animate/animate.css',
            'select2/select2.min.css',
            'sweetalert/sweetalert.css',
            'bootstrap-datetimepicker/bootstrap-datetimepicker.min.css'

        ];

        var AppCSSFiles = [
            'colors-background.css',
            'colors-buttons.css',
            'colors-text.css',
            'bootstrap-custom-style.css',
            'app.css'
        ];

        var VendorJSFiles = [
            'modernizr/modernizr-2.8.3.js',
            'jquery/jquery-3.1.1.min.js',
            'pikaday/moment.js',
            'pikaday/moment-with-locales.js',
            'bootstrap/transition.js',
            'bootstrap/collapse.js',
            'bootstrap/bootstrap.min.js',
            'bootstrap-touchspin/jquery.bootstrap-touchspin.js',
            'bootstrap-datetimepicker/bootstrap-datetimepicker.min.js',
            'select2/select2.min.js',
            'sweetalert/sweetalert.min.js'
        ];

        var AppJSFiles = [
            'app.js'

        ];

        for (var v = 0; v < VendorCSSFiles.length; v++) {

            loadFiles('css', vendorCSSPath + files[v]);
        }

        for (var a = 0; a < AppCSSFiles.length; a++) {

            loadFiles('css', appCSSPath + files[a]);
        }

        for (var vj = 0; vj < VendorJSFiles.length; vj++) {

            loadFiles('js', vendorJSPath + files[vj]);
        }

        for (var aj = 0; aj < AppJSFiles.length; aj++) {

            loadFiles('js', appJSPath + files[aj]);
        }

    }

    function getMenu() {

        shared.sendRequest(SERVICE_PATH + "GetMenusByRole/" + USER_ROLE_ID, "GET", true, "JSON", null, function (response) {

            if (response.responseText !== undefined) {

                var data = JSON.parse(response.responseText);

                loadMenu(data);
            }

        });

    }

    function loadMenu(data) {

        if (data !== null) {
            return;
            
        }

    }

    function init() {
        loadCSSAndJSFiles();
        getMenu();
    }

    return {
        init: init
    };


}();