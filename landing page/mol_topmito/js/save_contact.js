$(document).ready(function () {
    $(document).on("submit", ".e_form_submit", function (e) {
        e.preventDefault();
        var obj = $(this);
        check_lienhe(obj);
        cancelConfirm = true;
    });
    (function ($) {        // DOM Ready
        $(function () {
            // Binding a click event            // From jQuery v.1.7.0 use .on() instead of .bind()        
            $('#popup_1').bind('click', function (e) {
                // Prevents the default action to be triggered.          
                e.preventDefault();
                // Triggering bPopup when click event is fired       
                $('#element_to_pop_up').bPopup();
            });
            $('#popup_2').bind('click', function (e) {
                // Prevents the default action to be triggered.          
                e.preventDefault();
                // Triggering bPopup when click event is fired        
                $('#element_to_pop_up_2').bPopup();
            });
        });
    })(jQuery);
    (function ($) {
        $(function () {
            $('#popup_1').bind('click', function (e) {
                e.preventDefault();
                $('#element_to_pop_up').bPopup({
                    appendTo: 'form',
                    zIndex: 2,
                    modalClose: false,
                    opacity: 0.6,
                    positionStyle: 'fixed'
                });
            });
            $('#popup_2').bind('click', function (e) {
                e.preventDefault();
                $('#element_to_pop_up_2').bPopup({
                    appendTo: 'form',
                    zIndex: 2,
                    modalClose: false,
                    opacity: 0.6,
                    positionStyle: 'fixed'
                });
            });
        });
    })(jQuery);
});
function check_sdt(sdt) {
    if (isNaN(sdt.value)) {
        sdt.style.border = '3px solid Yellow';
        sdt.value = '';
        alert("เหมายเลขของคุณไม่ถูกต้อง หมายเลขของคุณต้องเริ่มต้นด้วยหมายเลย 0");
    }
}
function check_lienhe(obj) {
    var button = obj.find('.e_btn_submit');
    var email = obj.find('input[name="email"]').val();
    var name = obj.find('input[name="name"]').val();
    var age = obj.find('select[name="age"]').val();
    var aCong = email.indexOf("@");
    var dauCham = email.lastIndexOf(".");
    var sdttext = obj.find('input[name="phone"]').val();
    var dodaisdt = sdttext.length;
    if ((name.trim() == "") || (name == "Họ tên *")) {
        alert("กรุณากรอกชื่อ และนามสกุลของคุณ");
        obj.find('input[name="name"]').focus();
        return (false);
    }
    if ((email == "") || (email == "email_address@gmail.com")) {
        alert("กรุณากรอกอีเมล์ของคุณ");
        obj.find('input[name="email"]').focus();
        return (false);
    }
    if ((aCong < 1) || (dauCham < aCong + 2) || (dauCham + 2 > email.length)) {
        alert("อีเมล์ อย่างเช่น :email@example.com");
        obj.find('input[name="email"]').focus();
        return false;
    }
    if ((sdttext == "") || (sdttext == "Điện thoại *")) {
        alert("โปรดกรอกเบอร์โทรศัพท์เพื่อรับคำแนะนำ");
        obj.find('input[name="phone"]').focus();
        return (false);
    }
    if (age == "" || age == 0)  {
        alert("กรุณาเลือกอายุของคุณ");
        obj.find('select[name="age"]').focus();
        return (false);
    }


    if (d = sdttext.match(/^0/i)) {
        if (dodaisdt < 10) {
            alert("เหมายเลขของคุณไม่ถูกต้อง หมายเลขของคุณต้องเริ่มต้นด้วยหมายเลย 0");
            obj.find('input[name="phone"]').focus();
            return (false);
        }
    } else {
        alert("หมายเลขของคุณไม่ถูกต้อง หมายเลขของคุณต้องเริ่มต้นด้วยหมายเลย 0");
        obj.find('input[name="phone"]').focus();
        return false;
    }


    // if (d = sdttext.match(/^09/i)) {
    //     if ((dodaisdt < 10) || (dodaisdt > 10)) {
    //         alert("เบอร์โทร ขึ้นต้นด้วยเลข 09xxxxxxxx หรือ 012xxxxxxxx หรือ 08xxxxxxxx");
    //         obj.find('input[name="phone"]').focus();
    //         return (false);
    //     }
    // } else if (d = sdttext.match(/^01/i)) {
    //     if ((dodaisdt < 11) || (dodaisdt > 11)) {
    //         alert("เบอร์โทร ขึ้นต้นด้วยเลข 09xxxxxxxx หรือ 012xxxxxxxx หรือ 08xxxxxxxx");
    //         obj.find('input[name="phone"]').focus();
    //         return (false);
    //     }
    // } else if (d = sdttext.match(/^08/i)) {
    //     if ((dodaisdt < 10) || (dodaisdt > 10)) {
    //         alert("เบอร์โทร ขึ้นต้นด้วยเลข 09xxxxxxxx หรือ 012xxxxxxxx หรือ 08xxxxxxxx");
    //         obj.find('input[name="phone"]').focus();
    //         return (false);
    //     }
    // }
    // else {
    //     alert("เบอร์โทร ขึ้นต้นด้วยเลข 09xxxxxxxx หรือ 012xxxxxxxx หรือ 08xxxxxxxx");
    //     obj.find('input[name="phone"]').focus();
    //     return false;
    // }
    button.attr('disabled', 'disabled');
    var url = obj.attr("action");
    var formData = {name: name, email: email, sdttext: sdttext};
    obj.ajaxSubmit({type: "POST", url: url, dataType: 'json', async: false, success: function (data) {
            if (data.status) {
                //Thông báo khi đăng ký thành công
                // alert(data.msg);
                //alert("ขอบคุณสำหรับการสมัคร เราจะติดต่อกลับให้เร็วที่สุดครับ.");
                window.location = data.redirect;
            } else {
                alert(data.msg);
                location.reload();
            }
        }, error: function () {
            alert('การลงทะเบียนของคุณมีบางอย่างผิดพลาด โปรดลงทะเบียนอีกครั้ง!');
            button.removeAttr('disabled');
        }, complete: function () {
            // button.removeAttr('disabled');
        }});
}