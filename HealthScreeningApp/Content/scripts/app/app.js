
function SidebarMenu(el) {
    this.el = el;
    var li = el.children[0].children;

    if (li.length > 0) {
        for (var i = 0; i < li.length; i++) {
            if (li[i].children[0].className === 'link') {
                var links = li[i].children[0];
                links.addEventListener('click', this.dropdown);
            }
        }
    }
}

SidebarMenu.prototype.dropdown = function (e) {
    var el = e.target;

    var li = el.parentElement;

    var submenu = li.children[1];

    if (li.classList.contains('open')) {
        li.classList.remove('open');
        submenu.style.display = 'none';
    }
    else {
        li.classList.add('open');
        submenu.style.display = 'block';
    }
};

    

function OpenSidebar(element) {
    var el = element[0];

    el.addEventListener('click', this.showhideSidebar);
}

OpenSidebar.prototype.showhideSidebar = function (e) {

    var sidebarmenu = document.getElementById('sidebar-menu');

    var el = e.target;

    if (sidebarmenu.classList.length > 0) {
        if (sidebarmenu.classList.contains('hide')) {
            sidebarmenu.classList.add('show');
            sidebarmenu.classList.remove('hide');
        }
        else {
            sidebarmenu.classList.add('hide');
            sidebarmenu.classList.remove('show');
        }
    }
};
    

var sidebarMenu = new SidebarMenu(document.getElementById('sidebar-menu'));
var openSidebar = new OpenSidebar(document.getElementsByClassName('hamburger-menu'));


//document.getElementById('LogOut').onclick = function () {

//    var _shared = new Shared();

//    _shared.sendRequest(SERVICE_PATH + "IsLogOut", "GET", true, "JSON", null, function (response) {

//        if (response.status === 200) {

//            if (response.responseText !== undefined) {

//                var _response = JSON.parse(response.responseText);

//                if (_response !== undefined) {

//                    if (_response.length > 0) {

//                        var location = window.location.origin;

//                        location = location + ROOT_PATH + "login.aspx";

//                        window.location.href = location;
//                    }
//                }
//            }
//        }
//    });
//}

//SidebarMenu.prototype = (function () {

//    dropdown = function(e) {

//        var el = e.target;

//        var li = el.parentElement;

//        var submenu = li.children[1];

//        if (li.classList.contains('open')) {
//            li.classList.remove('open');
//            submenu.style.display = 'none';
//        }
//        else {
//            li.classList.add('open');
//            submenu.style.display = 'block';
//        }
//    }

//    openSidebar = function (e) {
//        var el = e.target;

//        var menuIcon = el;

//    } 

//    return {
//        dropdown: dropdown,
//        openSidebar: openSidebar
//    }

//})();


//$(function() {

//    //var sidebarmenu = document.getElementById('sidebar-menu');

//    //sidebarmenu.addEventListener('click', openSubmenu(event));

//    var SidebarMenu = function (el) {

//        this.el = el || {};

//        var li = el.children[0].children;
        
//        if (li.length > 0) {
//            for (var i = 0; i < li.length; i++) {
//                if (li[i].children[0].className === 'link') {
//                    var links = li[i].children[0];
//                    links.addEventListener('click', this.dropdown);
//                } 
//            }
//        }        
//    }

//    SidebarMenu.prototype = function (e) {

//        var dropdown = function (e) {
//            var el = e.target;

//            var li = el.parentElement;

//            var submenu = li.children[1];

//            if (li.classList.contains('open')) {
//                li.classList.remove('open');
//                submenu.style.display = 'none';
//            }
//            else {
//                li.classList.add('open');
//                submenu.style.display = 'block';
//            }
//        }

//    }

//    var SidebarMenu = new SidebarMenu(document.getElementById('sidebar-menu'));


// //   var Accordion = function (el, multiple) {
//	//	this.el = el || {};
//	//	this.multiple = multiple || false;

//	//	// Variables privadas
//	//	var links = this.el.find('.link');
//	//	// Evento
//	//	links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
//	//}

//	//Accordion.prototype.dropdown = function(e) {
//	//	var $el = e.data.el;
//	//		$this = $(this),
//	//		$next = $this.next();

//	//	$next.slideToggle();
//	//	$this.parent().toggleClass('open');

//	//	if (!e.data.multiple) {
//	//		$el.find('.submenu').not($next).slideUp().parent().removeClass('open');
//	//	};
//	//}	

//	//var accordion = new Accordion($('#accordion'), false);
////});

////document.body.onclick = function (event) {
////    delegateEvent(event);
////    event.stopPropagation();
////}
////$(document).ready(function () {



//function delegateEvent(event) {

//    if (event.target.className === "link") {

//        var link = event.target;

//        link.onclick = function (event) {

//              var chevronDown = event.target.children[1];
            
//        chevronDown.addEventListener('click', openSubmenu(event));

//        }

//    }

//}

//function openSubmenu(event) {

//    var link = event.target.parentElement;
//    var submenu = link.children[1];

//    /* assign active class to the parent link */
//    link.classList.add = "active";

//                /* find classname contains fa chevron down and assign click event */
                
//                    submenu.style.display = "block";
//            }
        
//});
//    //GetMenus(1);

//     $('.panel .tools .fa').click(function () {
//            var el = $(this).parents(".panel").children(".panel-body");
//            if ($(this).hasClass("fa-chevron-down")) {
//                $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
//                el.slideUp(200);
//            } else {
//                $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
//                el.slideDown(200);
//            }
//        });



//        $('.panel .tools .fa-times').click(function () {
//            $(this).parents(".panel").parent().remove();
//        });

//    function GetMenus(userGroupId) {

//        _Type = "GET";
//        _WebUrl = ServicePath + "MenuService.svc/Get_Menu/" + userGroupId;
//        //_UrlData = '{"userGroupId": "' + userGroupId + '"}';
//        _ContentType = "application/json; charset=utf/8",
//        _DataType = "json";
//        _ProcessData = false;
//        _WebMethod = "Get_Menu";
//        CallService();
//    }

//    var _Type;
//    var _WebUrl;
//    var _UrlData;
//    var _ContentType;
//    var _DataType;
//    var _ProcessData;
//    var _WebMethod;

//    //Generic function to call AXMX/WCF  Service
//    function CallService() {
//        $.ajax({
//            type: _Type, //GET or POST or PUT or DELETE verb
//            url: _WebUrl, // Location of the service
//            data: _UrlData, //Data sent to server
//            contentType: _ContentType, // content type sent to server
//            dataType: _DataType, //Expected data format from server
//            processdata: _ProcessData, //True or False
//            success: function (data) {//On Successfull service call
//                ServiceSucceeded(data);
//            },
//            error: ServiceFailed// When Service call fails
//        });
//    }

//    function ServiceFailed(result) {
//        alert('Service call failed: ' + result.status + '' + result.statusText);
//        _Type = null; _WebUrl = null; _UrlData = null; _ContentType = null; _DataType = null; _ProcessData = null;
//    }

//    function ServiceSucceeded(result) {
//        //if (_DataType == "json") {

//        //    if (_WebMethod === "GetMenus") {

//        resultSet$ = result;

//        var pageGroupArray = [];
//        var subMenus = [];

//        //$('#navbar ul').remove();

//        $('#navbar').append('<ul class="nav navbar-nav">');

//        $.each(resultSet$, function (name, value) {
//            if (pageGroupArray.indexOf(value["<Menu_Group>k__BackingField"]) === -1) {
//                pageGroupArray.push(value["<Menu_Group>k__BackingField"]);
//            }
//        });

//        // var Lenli = $('#accordion ul li').length;
//        $('#navbar ul li').remove();

//        if (pageGroupArray.length > 0) {
//            for (i = 0; i < pageGroupArray.length; i++) {
//                $('#navbar ul').append(
//                    $('<li class="dropdown">').append(
//                    $('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">').append(
//                    pageGroupArray[i]).append(
//                    $('<span>').attr('class', 'caret'))
//                    ));
//            }
//        }

//        var li = $('#navbar ul li');

//        if (li.length > 0) {

//            $(li).each(function (indx, lstItem) {

//                var as = li.length;
//                var currentItem = $(this);

//                subMenus = $.grep(resultSet$, function (v) {
//                    return v.MenuGroupName === currentItem.text();

//                });

//                //console.log(subMenus);

//                $(this).append(
//                    $('<ul class="dropdown-menu">'));

//                //$.each(resultSet$, function (indx, value) {
//                $.each(subMenus, function (indx, value) {

//                    //if (currentItem.text() === value.MenuGroupName) {
//                    $('#navbar > ul ul:last').append(
//                    $('<li>').append(
//                    $('<a>').append(value.PageName).attr('href', RootPath + '/' + value.PageToOpen)));
//                });
//            });
//        }

//        //  }
//        //else {
//        //    //resultObject = data.GetMenus;

//        //    //var string = data.MenuGroup + " \n " + data.Designation + " \n " + data.Address + " \n " + data.Email;
//        //    //alert(string);

//        //    resultObject = result.GetMenus;

//        //    var string = result.MenuGroup + " \n " + data.Designation + " \n " + data.Address + " \n " + data.Email;
//        //    alert(string);
//        //}

//        // }
//    }

//    function ServiceFailed(xhr) {
//        alert(xhr.responseText);
//        if (xhr.responseText) {
//            var err = xhr.responseText;
//            if (err)
//                error(err);
//            else
//                error({ Message: "Unknown server error." })
//        }
//        return;
//    }


    

