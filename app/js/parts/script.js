$('document').ready(function() {

    $(".section1 ol li").on('click', function() {
        $(".section1 ol li").removeClass("active");
        $(this).addClass("active");
    });

    // carousel init
    $(".carousel-price").owlCarousel({
        items: 1,
        dots: false,
        autoHeight: true,
        margin: 35
    });

    // select init
    $('.custom-select').select2({
        containerCssClass: "custom-select-box",
        dropdownCssClass: "custom-select-dropdown",
        minimumResultsForSearch: -1,
        placeholder: 'Выберите оборудование',
        tags: false,

        "language": {
            "noResults": function(){
                return "Ничего не найдено.";
            }
        }
    });

    // calc elements
    $(".toggle-box .point").on('click', function() {
        $(".toggle-box .point").removeClass("checked");
        $(this).addClass("checked");
    });

});

// input pattern to numbers
var inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].className == 'custom-input input-number') {
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