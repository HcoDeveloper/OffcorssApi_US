$(function () {
    function validate(id) {
        var regex = /^[a-zA-Z ]{2,30}$/;
        if (id == "email") {
            var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        } else if (id == "phone") {
            var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        }
        var ctrl = document.getElementById(id);
        if (regex.test(ctrl.value)) {
            $('#' + id).removeClass('wrong');
            return true;
        } else {
            $('#' + id).addClass('wrong');
            $(ctrl).tooltip({
                'trigger': 'hover',
                'title': 'Incorrect',
                'placement': 'top'
            });
            return false;
        }
    }
    $('button').click(function () {
        var name = $('#name').val();
        var last_name = $('#last_name').val();
        var mail = $('#email').val();
        var state = $('#state').val();
        var phone = $('#phone').val();
        var nameBool = validate("name");
        var last_nameBool = validate("last_name");
        var mailBool = validate("email");
        var stateBool = validate("state");
        var phoneBool = validate("phone");
        if (!$('input[type="checkbox"]').is(':checked')) {
            $('label').addClass('wrong');
            $('label').tooltip({
                'trigger': 'hover',
                'title': 'Incorrect',
                'placement': 'bottom'
            });
            return;
        } else {
            $('label').removeClass('wrong');
        }
        if (nameBool && last_nameBool && mailBool && stateBool && phoneBool) {
            var data = {
                name: name,
                last_name: last_name,
                mail: mail,
                state: state,
                phone: phone,
            }
            $.ajax({
                type: 'POST',
                url: '/api/User/Save',
                data: data,
                success: function (res) {
                    if (res == '11000') {
                        $('#email').addClass('wrong');
                        $('#email').tooltip({
                            'trigger': 'hover',
                            'title': 'The e-mail already exists.',
                            'placement': 'top'
                        });
                    } else {
                        $('#email').removeClass('wrong');
                        $('#email').tooltip({
                            'trigger': 'hover',
                            'title': 'The e-mail already exists.',
                            'placement': 'top'
                        });
                        $(".form-container").toggleClass('done');
                    }
                },
                error: function (data) {
                    alert('Error sending data!');
                }
            });
        } else if (!phoneBool) {
            console.log('phone');
        }
    });
    $('.top-nav > .logo').click(function () {
        location.href = 'http://www.offcorss.com';
    })
    var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
    for (var i = 0; i < states.length; i++) {
        $('select').append('<option value="' + states[i] + '" class="col-xs-12">' + states[i] + '</option>');
    }
});
