$('document').ready(function() {

    // mask to phone
    $('input[type="tel"]').mask('+7 (999) 999-99-99');

    // section 1 script
    $(".section1 ol li").on('click', function() {
        $(".section1 ol li").removeClass("active");
        $(this).addClass("active");

        var valArticle = $(this).text();
        var valText = $(this).attr("data-val");

        $(".section1 .section1_article").text(valArticle);
        $(".section1 .section1_text").text(valText);
    });

    $.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function(data) {
        $('.dollars').html(data.Valute.USD.Value);
    });

    // section 13 script
    /*
    $(".section13 .tabs-control .point").on('click', function() {
        $(".section13 .tabs-control .point").removeClass("active");
        $(this).addClass("active");
        var tabscontrolArticle = $(this).text();
        $(".section13 .tabs-control_article").text(tabscontrolArticle);
    });
    */

    // carousel init
    $(".carousel-price").owlCarousel({
        items: 1,
        dots: false,
        autoHeight: true,
        margin: 35
    });

    // reviews carousel init
    $(".reviews-carousel").owlCarousel({
        items: 1,
        dots: true,
        nav: false
    });

    // accordeon animation
    $(".accordeon-item").on('click', function() {
        $(".accordeon-item").removeClass("active");
        $(this).addClass("active");
    });

    var dataMainers = [
        {
            id: 0,
            text: 'Antminer S9 13,5 TH/s',
            dataCost: '1500',
            dataCostElectr: '4745',
            dataValutDay: '0.00066 BTC',
            dataDollars: '5.2',
            dataCostEquipment: '50000',
            dataExpence: '6245'
        },
        {
            id: 1,
            text: 'Antminer S9 14 TH/s',
            dataCost: '1600',
            dataCostElectr: '5292',
            dataValutDay: '0.00069 BTC',
            dataDollars: '5.4',
            dataCostEquipment: '54000',
            dataExpence: '6892'
        },
        {
            id: 2,
            text: 'Antminer L3+ 504 MH/s',
            dataCost: '1200',
            dataCostElectr: '2920',
            dataValutDay: '0.0261 LTC',
            dataDollars: '2.5',
            dataCostEquipment: '32000',
            dataExpence: '4120'
        },
        {
            id: 3,
            text: 'Antminer D3 15GH/s',
            dataCost: '1400',
            dataCostElectr: '4380',
            dataValutDay: '',
            dataDollars: '',
            dataCostEquipment: '',
            dataExpence: ''
        },
        {
            id: 4,
            text: 'Antminer A3 815 GH/s',
            dataCost: '1400',
            dataCostElectr: '4380',
            dataValutDay: '0.0423 LTC',
            dataDollars: '3.86',
            dataCostEquipment: '29000',
            dataExpence: '5780'
        },
        {
            id: 5,
            text: 'Baikal Giant B 160 GH/s',
            dataCost: '800',
            dataCostElectr: '1460',
            dataValutDay: '4.1374 Pascal coin',
            dataDollars: '2.84',
            dataCostEquipment: '170000',
            dataExpence: '2260'
        },
        {
            id: 6,
            text: 'Antminer T9 11,5 th/s',
            dataCost: '1600',
            dataCostElectr: '5475',
            dataValutDay: '',
            dataDollars: '',
            dataCostEquipment: '',
            dataExpence: ''
        },
        {
            id: 7,
            text: 'iBeLink DM22G X11 (22 GH/s)',
            dataCost: '1300',
            dataCostElectr: '2956',
            dataValutDay: '',
            dataDollars: '',
            dataCostEquipment: '',
            dataExpence: ''
        },
        {
            id: 8,
            text: 'INNOSILICON A5 DashMaster',
            dataCost: '1200',
            dataCostElectr: '2737',
            dataValutDay: '',
            dataDollars: '',
            dataCostEquipment: '',
            dataExpence: ''
        },
        {
            id: 9,
            text: 'Antminer R4 Batch 6 (8.7TH/s)',
            dataCost: '1300',
            dataCostElectr: '3084',
            dataValutDay: '',
            dataDollars: '',
            dataCostEquipment: '',
            dataExpence: ''
        }
    ];

    // select init
    $('.custom-select').select2({
        containerCssClass: "custom-select-box",
        dropdownCssClass: "custom-select-dropdown",
        minimumResultsForSearch: -1,
        placeholder: 'Выберите оборудование',
        data: dataMainers,

        "language": {
            "noResults": function(){
                return "Ничего не найдено.";
            }
        }
    });

    $('.custom-select').on('select2:select', function (e) {
        Date.prototype.getNumberOfDaysInMonth = function(monthOffset) {
            if (monthOffset !== undefined) {
                return new Date(this.getFullYear(), this.getMonth()+monthOffset, 0).getDate();
            } else {
                return new Date(this.getFullYear(), this.getMonth(), 0).getDate();
            }
        };

        var myDate = new Date();

        var nameMainer = dataMainers[e.currentTarget.value].text;
        var dataCost = dataMainers[e.currentTarget.value].dataCost;
        var dataCostElectr = dataMainers[e.currentTarget.value].dataCostElectr;
        var dataCostResult = Number(dataCost) + Number(dataCostElectr);
        var dataValutDay = dataMainers[e.currentTarget.value].dataValutDay;
        var dataDollars = dataMainers[e.currentTarget.value].dataDollars;
        var dataRubls = Number(dataDollars) * Number($('.dollars').text());
        var dataValMonth = Number(dataRubls) * Number(myDate.getNumberOfDaysInMonth());
        var dataCostEquipment = dataMainers[e.currentTarget.value].dataCostEquipment;
        var dataExpence = dataMainers[e.currentTarget.value].dataExpence;
        var dataProfit = Number(dataValMonth) - Number(dataExpence);
        var dataRecoupment = Number(dataCostEquipment) / Number(dataProfit);

        $(".dataCostResult").text(dataCostResult + " ₽");
        $(".dataCostElectr").text(dataCostElectr);
        $(".dataCost").text(dataCost);
        $(".dataValMonth").text(Math.round(dataValMonth));
        $(".dataValutDay").text(dataValutDay);

        if(dataCostEquipment) {
            $(".dataCostEquipment").text(dataCostEquipment);
        }else {
            $(".dataCostEquipment").text('-');
        }

        if(dataExpence) {
            $(".dataExpence").text(dataExpence);
        }else {
            $(".dataExpence").text('-');
        }

        if(dataRecoupment) {
            $(".dataRecoupment").text(Math.round(dataRecoupment));
        }else {
            $(".dataRecoupment").text('-');
        }
    });

    $(".input-videocard").on('focusout', function() {
        var e = Number($(this).attr("data-cost")) * Number($(this).val());
        if(e) {
            $(".dataCostResult").text(e.toFixed(1) + " ₽");
        }else {
            $(".dataCostResult").text("0 ₽");
        }
    });


    // calc elements
    $(".toggle-box .point").on('click', function() {
        $(this).parent().find(".point").removeClass("checked");
        $(this).addClass("checked");

        if( $(this).text() == "Видеокарта") {
            resultZerroHide();
        }else {
            resultZerroView();
        }
    });

    $('.show-modal').click(function() {
       var name = $(".modal-main").find("h2").attr("data-name");
        $(".modal-main").find("h2").text(name);
       $(".modal-main").modal('show');
    });

    $(".show-model-miner").click(function() {
        var name = $(this).parent().find(".miner-name").text();
        $(".modal-mail").find("h2").text("Купить " + name);
        $(".modal-main").modal('show');
    });

    // Form feedback
    $(".signup").each(function () {
        $(this).validate({
            rules: {
                firstName: {
                    required: true

                },
                phone: {
                    required: true

                },
                email: {
                    required: false,
                    email: true

                }

            },
            messages: {
                firstName: {
                    required: ""

                },
                phone: {
                    required: ""

                },
                email: {
                    required: "",
                    email: "E-mail введен неверный!"

                }

            },
            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize()
                }).done(function () {
                    $("form").trigger("reset");

                });
                return false;
            }
        });
    });

});

// input pattern to numbers
var inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].className == 'input-videocard custom-input input-number') {
        inputs[i].onkeypress = function(e) {

            e = e || event;
            if (e.ctrlKey || e.altKey || e.metaKey) return;

            var chr = getChar(e);
            if (chr == null) return;

            if (chr < '0' || chr > '9') {
                return false;
            }
        };
    }
}

function getChar(event) {
    if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) // other browsers
    }

    return null;
}

function resultZerroHide() {
    $(".hideBox").hide();
    $(".calc-form").addClass("show-videocard-box");
}

function resultZerroView() {
    $(".hideBox").show();
    $(".calc-form").removeClass("show-videocard-box");
}