
$(document).ready(function () {

    // Proxy created on the fly
    var chat = $.connection.chatHub;

    // Declare a function on the chat hub so the server can invoke it
    chat.client.addMessage = function (message) {
        $('#divChatWindow').find('ul').append('<LI>' + message + '');
    };

    $("#broadcast").click(function () {
        /* Call the chat method on the server */
        chat.server.send($('#msg').val());
    });

    // Start the connection
    $.connection.hub.start()
        .done(function () {
            chat.server.getAllOnlineStatus();
        })
        .fail(function () { alert('unable to connect'); });

    /* create group method joined */
    chat.client.joined = function (connectionId, userList) {

        var chatRoom = $("#ChatRoom");

        $(chatRoom).empty();

        $(userList).each(function (index, obj) {

            var userImg = $('<img>');

            var userLink = $('<a>');

            $(userImg).attr('id', obj.UserId).attr('src', '../Content/app_imgs/online.png').css('width', 18).css('height', 18);

            $(userLink).attr('id', obj.UserId).attr('href', '#').attr('data-userid', obj.UserId).addClass('UserItem').addClass('online').html(obj.Full_Name);

            $(chatRoom).append(userImg);

            $(chatRoom).append(userLink);

            $(chatRoom).append('<br>');

            //if (obj.UserId === 1) {
            //    $("#stat1").attr('src', '../Content/app_imgs/online.png');
            //    $("#status1").addClass('online');
            //    $("#status1").html(obj.Full_Name);
            //    $("#hUserID").val(obj.UserId);
            //    $("#hUserName").val(obj.Full_Name);
            //}
            //else if (obj.UserId === 2) {
            //    $("#stat2").attr('src', '../Content/app_imgs/online.png');
            //    $("#status2").addClass('online');
            //    $("#status2").html(obj.Full_Name);
            //    $("#hUserID").val(obj.UserId);
            //    $("#hUserName").val(obj.Full_Name);
            //}
        })
    }

    /* create method to check onlinestatus */
    chat.client.onlineStatus = function (connectionID, userList) {
        $("img[id^=stat]").attr('src', '../Content/app_imgs/offline.png');

        $(userList).each(function (index, obj) {
            if (obj.UserId === 1) {
                $("#stat1").attr('src', '../Content/app_imgs/online.png');
                $("#status1").addClass('online');
            }
            else if (obj.UserId === 2) {
                $("#stat2").attr('src', '../Content/app_imgs/online.png');
                $("#status2").addClass('online');
            }
        })
    }

    /* chat window for online users */
    $('#ChatRoom').on('click', '.UserItem', function () {

        if ($(this).hasClass('online')) {

            chat.server.createGroup(Logged_User_ID, $(this).attr('data-userid'));

            var chatWindow = $('#divChatWindow').clone(true);

            $(chatWindow).css("display", "block");

            $(chatWindow).attr('data-chatToId', $(this).attr('data-userid'));

            //$(chatWindow).attr('data-groupname', $('#hUserID').val(), $(this).attr('data-userid'));
            //$(chatWindow).attr('data-groupname', 29);

            $('#chatContainer').append(chatWindow);

        }

        return false;
    });

    chat.client.setChatWindow = function (groupName, connectTo) {
        //chat.server.setChatWindow(groupName, connectTo);

        if (groupName !== undefined || groupName !== null) {
            var chatWindow = $('#divChatWindow');
            $(chatWindow).attr('data-groupname', groupName);
        }
    }


    // submit button click event
    $.connection.hub.start().done(function () {

        $(".ChatSend").click(function () {

            strChatText = $('.ChatText', $(this).parent()).val();

            if (strChatText != '') {

                var strGroupName = $(this).parent().attr('data-groupname');

                if (typeof strGroupName !== 'undefined' && strGroupName !== false)

                    chat.server.send($("[id$='hdnUserName']").val() + ' : ' + strChatText, $(this).parent().attr('data-groupname'));

                //$('.ChatText', $(this).parent()).find('ul').append(strChatText);

                //$("#divChatWindow").find('ul').append(strChatText);

            }

            return false;
        });
    });

    chat.client.addMessage = function (message, groupName) {

        var chatWindow = $("#divChatWindow");

        //if ($('div[groupname=' + groupName + ']').length == 0)
        if ($('#divChatWindow').data("groupname") != groupName) {

            //var chatWindow = $("#divChatWindow").clone(true);

            $(chatWindow).css('display', 'block');

            $(chatWindow).attr('data-groupname', groupName);

            $("#chatContainer").append(chatWindow);

        }

        //$('div[groupname=' + groupName + ']').find('ul').append('<LI>' + message + '');
        $(chatWindow).find('ul').append('<li>' + message + '');

    };

    chat.client.leave = function (id) {
        chat.server.leaveChat(id);
    };

});
