// ---------------------------------------- animate bg ----------------------------------------

$(document).ready(function () {
    $('body').addClass('__visible');
});

// ----------------------------------------- carousel -------------------------------------------

$('.product-list .owl-carousel').each(function () {
    var owl = $(this);
    owl.owlCarousel({
        //loop: true,
        margin: 10,
        nav: true,
        navSpeed: 700,
        responsive: {
            0: {
                items: 1
            },

            768: {
                items: 2
            },
            1200: {
                items: 4
            }
        }
    });


})


// -------------------------------------- equal height -----------------------------------------------

function equalHeight(group) {
    tallest = 0;
    group.each(function () {
        thisHeight = $(this).height();
        if (thisHeight > tallest) {
            tallest = thisHeight;
        }
    });
    group.height(tallest);
}


function set_equal() {

    $(".product-list:not(.__catalog)").each(function () {
        $(".item .title", this).css({height: "auto"})
        equalHeight($(".item .title", this))
    })

    $("#info .anounce.col-lg-4").css({height: "auto"})

    equalHeight($("#info .anounce.col-lg-4"))
}

set_equal();


// ---------------------------------------- main slider ---------------------------------------------

var mainSlider = $('#main-slider');
var progressBar = $('#slider #progress');

if (mainSlider.length) {
    mainSlider.owlCarousel({
        //items: 1,
        singleItem: true,
        autoplay: false,
        autoplayHoverPause: false,
        loop: false,
        margin: 0,
        dots: true,
        nav: false,
        responsiveRefreshRate: 100,
        responsive: {
            0: {items: 1},
            479: {items: 1},
            768: {items: 1},
            991: {items: 1},
            1024: {items: 1}
        }
    });


    $(".item", mainSlider).each(function () {
        var title = (typeof $(this).attr("title") != "undefined") ? $(this).attr("title") : "";
        $("#slider #progress .bar ul").append("<li><div></div><span><b>" + title + "</b></span></li>")
    })

    if (progressBar.length) {

        $(".bar ul li", progressBar).css({width: 100 / $(".bar ul li", progressBar).length + "%"}).click(function (e) {
            e.stopPropagation();
            $(".bar ul li.current", progressBar).removeClass("current");
            $(this).addClass("current");
            var owl = $(this).closest("#slider").find(".owl-carousel").data('owlCarousel');
            var index = $(this).closest("ul").find("li").index($(this));
            owl.to(index)
        });

        autoChangeSlide = function () {

            var index = $(".bar ul li", progressBar).index($(".bar ul li.current", progressBar));
            index = (index >= 0) ? index : 0;
            var current = (index + 1 == $(".bar ul li", progressBar).length) ? 0 : index + 1;

            $(".bar ul li.current", progressBar).removeClass("current");
            $(".bar ul li:eq(" + current + ")", progressBar).trigger("click");

        };

        $(".bar ul li:eq(0)", progressBar).addClass("current")

        $(".bar ul li div", progressBar).on("transitionend webkitTransitionEnd webkitAnimationEnd animationend oanimationend MSAnimationEnd", autoChangeSlide)
    }


}


// ----------------------------------------- sticky ------------------------------------------------

var sticky_navigation_offset_top = $('nav').offset().top;

var sticky_navigation = function () {
    $('nav').css('top', '1px');

    var scroll_top = $(window).scrollTop();

    if (scroll_top > sticky_navigation_offset_top) {

        $('nav').addClass('fixedMainMenu');
    } else {
        $('nav').removeClass('fixedMainMenu');
    }

    $('nav').css('top', '0');
};

sticky_navigation();

$(window).scroll(function () {
    sticky_navigation();
});


// ----------------------------------------- /sticky ------------------------------------------------


// ---------------------------------------- popup video ----------------------------------------

$(".various").fancybox({
    maxWidth: 800,
    maxHeight: 600,
    fitToView: false,
    width: '70%',
    height: '70%',
    autoSize: false,
    closeClick: false,
    openEffect: 'none',
    closeEffect: 'none'
});


// --------------------------------------- sidebar toggle -------------------------------------------

$(".navbar-toggle").click(function (e) {
    $('#pozvonim-button').hide();

    var type = String($(this).attr("id")).replace("toggle-", "");

    if (!$("body #sidebar-" + type).length) {
        $("body").append(
            "<div id='sidebar-" + type + "' class='sidebar-wrap'>" +
            "<div class='sidebar'>" +
            "<button class='close'></button>" +
            "<div class='inner'></div>" +
            "</div>" +
            "</div>"
        );

        var tmp = new Array();
        $("*[data-" + type + "]").each(function () {
            tmp[$(this).data(type)] = $(this).clone(true).removeClass("hidden-" + type);
        });

        tmp.sort();
        for (var i = 0; i < tmp.length; i++) $("body #sidebar-" + type + " .sidebar .inner").append(tmp[i])
        $("body #sidebar-" + type).addClass("active");
        //$("body #sidebar-"+type+" .sidebar > div").slimscroll({alwaysVisible: false, height: 'auto', railVisible: false});
    }

    $("body #sidebar-" + type).addClass("active");


    $("body, .sidebar-wrap .sidebar .close").on("click.sidebar", function () {

        $("body .sidebar-wrap").removeClass("active");
        $('#pozvonim-button').show();
        $("body").off("click.sidebar");
        $("body .sidebar-wrap").off("click.sidebar");
    })
    $("body .sidebar-wrap .sidebar").on("click.sidebar", function (e) {
        e.stopPropagation();
    });
    e.stopPropagation();


});


// --------------------------------------- /sidebar toggle -------------------------------------------


// --------------------------------------- callback toggle -------------------------------------------


$("#pozvonim-button .pozvonim-button-phone, .callback-link").click(function (e) {

    e.preventDefault();

    //$("#callback-wrap").addClass("active");
    $("#callback-wrap").fadeIn();
    if ($('.sidebar-wrap').css('display') == 'block') {
        $('.sidebar-wrap').removeClass('active')
    }


    $("#pozvonim-button").addClass("hidden");


    $("body, #callback-wrap .js-close").on("click.sidebar", function () {

        //$("body #callback-wrap").removeClass("active");
        $("body #callback-wrap").fadeOut();
        $("#pozvonim-button").removeClass("hidden");
        $("body, #callback-wrap .close").off("click.sidebar");
        $("body #callback-wrap").off("click.sidebar");
        return false;
    });

    $("body #callback-wrap .sidebar").on("click.sidebar", function (e) {
        e.stopPropagation();
    });

    e.stopPropagation();

});


// --------------------------------------- /callback toggle -------------------------------------------


$("input[name='phone'], .js-phone-mask").mask("+9 (999) 999-9999");


// --------------------------------------- catalog menu toggle -------------------------------------------


$("#catalog-link a").click(function (e) {
    if (!$("nav #nav_left").hasClass("active")) {
        $(this).closest("li").addClass("active");
        $(this).addClass('active');
        $("nav #nav_left").addClass("active");
        $('body').append('<div class="js-menu-hide menu-hide"></div>');
    }
    e.stopPropagation();
    return false;
});

$('body').on('click', '.js-menu-hide', function () {
    $("nav #nav_left").removeClass("active");
    $("#catalog-link a").removeClass("active");
    $(this).remove();
});



//$('#nav_left >li >a.js-mobile-menu').on('click', function (e) {
$('#nav_left >li').on('click', ' >a.js-mobile-menu', function (e) {
    var sublevel_1 = $(this).parent().find('.combo');
    var nameCategory = $(this).text();
    if (sublevel_1.length) {
        $(this).parent().find('.combo > ul').prepend('' +
        '<li><a href="#" class="js-callback-level-1 callback-level">Назад</a></li>' +
        '<li class="js-category-1 nav-category-name">' + nameCategory + '</a></li>' +
        '');
        sublevel_1.show();
        return false
    } else {
        return true
    }
});

function mobileMenu() {
    var widthWindow = $(window).outerWidth();
    if (widthWindow < 1086) {
        $('#nav_left >li >a').addClass('js-mobile-menu');
    } else {
        $('#nav_left >li >a').removeClass('js-mobile-menu');
    }
}
$(document).ready(function(){
    mobileMenu();
});

$('.combo').on('click', '.js-callback-level-1', function (e) {
    e.preventDefault();
    var sublevel_1 = $(this).parents('.combo');
    sublevel_1.hide();
    $(this).parent('li').remove();
    $('.js-category-1').remove();
    $('#nav_left').addClass('active');
});
$(window).resize(function () {
    mobileMenu();
    $("nav #nav_left").removeClass("active");
    $('#nav_left .combo').removeAttr('style');
    $("#catalog-link a").removeClass("active");
    $('.js-callback-level-1').remove();
    $('.js-menu-hide').hide();
});
// --------------------------------------- /catalog menu toggle -------------------------------------------


// --------------------------------------- window resizes -------------------------------------------


$(function () {
    $("form#search :submit").click(function () {
        var $wrap = $(this).closest("#nav_right");
        if ($wrap.hasClass("wide")) return true;

        $wrap.toggleClass("wide");
        $('#search-input').focus();
        return false;

    });

    $("form#search .close").click(function () {
        $(this).closest("#nav_right").removeClass("wide")
        return false;
    })
});


$(window).resize(function () {
    if ($("body .sidebar-wrap").is(":visible")) $("body").trigger("click.sidebar");
    set_equal();
    $('.product-list .owl-carousel').trigger("refresh.owl.carousel");
    $(".js-nano-scroller").each(function () {
        $(this)[0].nanoscroller.reset();
    })
});

$(window).load(function () {
    $(window).trigger("resize");
});

// --------------------------------------- gui elements -------------------------------------------
window.DoList = function () {
    var _list, _this;
    _list = {};
    _this = function (func, oneCall) {
        var fn, id, idEvent;
        if (func == null) {
            func = false;
        }
        if (oneCall == null) {
            oneCall = false;
        }
        if (func) {
            if (typeof func === 'function') {
                id = window.getRandom();
                while (_list[id] != null) {
                    id = window.getRandom();
                }
                _list[id] = func;
                _list[id].isOneCall = oneCall;
                return id;
            }
        } else if (func === false) {
            for (idEvent in _list) {
                fn = _list[idEvent];
                if (typeof fn === 'function') {
                    fn();
                    if (fn.isOneCall) {
                        _this.remove(idEvent);
                    }
                }
            }
        }
    };
    _this.remove = function (idEvent) {
        if (_list[idEvent] != null) {
            return delete _list[idEvent];
        }
    };
    _this.getList = function () {
        return _list;
    };
    return _this;
};
window.getRandom = function (min, max) {
    if (!min) {
        min = 0;
    }
    if (!max) {
        max = min + 999999999;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.doRefreshUI = DoList();

var ui = {
    init: function () {
        this.elementsForm();
        setTimeout(doRefreshUI, 10);
        this.catalogFilter();
        this.nanoScroller();
        this.searchFilter();

    },
    elementsForm: function () {
        var form;

        form = function () {
            $('input[type="checkbox"]:not(._inited):not(._default)').each(function () {
                $(this).addClass('_inited').button().button("widget").addClass('ui-type-checkbox');
            });
            $('input[type="radio"]:not(._inited):not(._default)').each(function () {
                $(this).addClass('_inited').button().button("widget").addClass('ui-type-radio');
            });
            $('select:not(._inited):not(._default)').each(function () {
                return $(this).addClass('_inited').selectmenu();
            });
        };

        doRefreshUI(form);
    },
    catalogFilter: function () {
        $('.js-filter-clear').on('click', function () {
            var parentFiler = $(this).parent();
            var slider = parentFiler.find('[data-filter-slider]');
            if (slider.length) {
                var startMin = slider.attr('data-filter-slider-min');
                var startMax = slider.attr('data-filter-slider-max');
                slider.find('[data-filter-slider-element="start-lower link-lower"]').val(startMin).trigger('change');
                slider.find('[data-filter-slider-element="start-upper link-upper"]').val(startMax).trigger('change');
            } else {
                parentFiler.find('input:checkbox').prop('checked', false).trigger('change')
                parentFiler.find('input:radio').prop('checked', false);
                parentFiler.find('.js-search-catalog').val('');
                $('.js-search-info').remove();
                $('.catalog-filter-list').removeClass('hidden');
                parentFiler.find(".nano")[0].nanoscroller.reset();
                parentFiler.find('.js-filter-more').trigger('click')
            }


        });

        $('.js-clear-search').on('click', function () {
            $(this).parent().find('.js-search-catalog').val('').parent().find('.catalog-filter-list').removeClass('hidden');
            $(this).parent().find(".nano")[0].nanoscroller.reset();
            $('.js-search-info').remove();
        });

        $('.js-btn-filter').on('click', function () {
            $(this).toggleClass('__active');
            $('.catalog-filter-item').toggleClass('__active');
            $('.js-filter-category').toggleClass('__active');
            $('.catalog-filter-content').toggleClass('__active');
        });

        $('.js-filter-more').on('click', function () {
            $(this).toggleClass('__active');
            $(this).next('.catalog-filter-search').toggleClass('__active');

            $(this).next().find(".nano")[0].nanoscroller.reset();

            if ($(this).hasClass('__active')) {
                $(this).html('Свернуть бренды');
            } else {
                $(this).html('Еще бренды');
            }
        });
        $('.js-show-catalog').on('click', function () {
            $(this).toggleClass('__active');
        });

        $('.js-filter-category').each(function () {
            $(this).on('click', function () {
                var textToggleBtn, toggleContent;
                toggleContent = $(this).next();
                $(this).toggleClass('__active');
                toggleContent.toggleClass('__active');

            });
        });
        var _Link = $.noUiSlider.Link;
        $('[data-filter-slider]').each(function () {
            var $siderBlock = $(this);

            var $slider = $siderBlock.find('[data-filter-slider-element~="line"]');

            var $lowerTarget = $siderBlock.find('[data-filter-slider-element~="link-lower"]');
            var $upperTarget = $siderBlock.find('[data-filter-slider-element~="link-upper"]');

            var range = {
                min: parseFloat($siderBlock.attr('data-filter-slider-min')),
                max: parseFloat($siderBlock.attr('data-filter-slider-max'))
            };
            var step = parseFloat($siderBlock.attr('data-filter-slider-step'));
            var startValues = [
                ($siderBlock.find('[data-filter-slider-element~="start-lower"]').val() || 0),
                ($siderBlock.find('[data-filter-slider-element~="start-upper"]').val() || 0)
            ];
            var sliderOptions = {
                connect: true,
                start: startValues,
                range: range,
                step: step,
                serialization: {
                    lower: [
                        new _Link({
                            target: $lowerTarget,
                            format: {
                                decimals: 0,
                                thousand: ' '
                            }
                        })
                    ],
                    upper: [
                        new _Link({
                            target: $upperTarget,
                            format: {
                                decimals: 0,
                                thousand: ' '
                            }
                        })
                    ]
                }
            };
            $slider.noUiSlider(sliderOptions);
        });
    },
    nanoScroller: function () {
        $('.js-nano-scroller').nanoScroller({
            iOSNativeScrolling: true,
            sliderMaxHeight: 150,
            sliderMinHeight: 10,
            disableResize: true
        });
    },
    searchFilter: function () {
        $('.js-search-catalog').on('input', function () {
            var $this = $(this);
            var items = $this.parent().find('.catalog-filter-list');
            items.removeClass('hidden');
            $this.parent().find(".nano")[0].nanoscroller.reset();
            $this.parent().find('.js-search-info').remove();

            if ($this.val().length < 1) return;

            $this.parent().find('.catalog-filter-list').each(function () {
                if ($(this).text().toLowerCase().indexOf($.trim($this.val().toLowerCase())) == -1) {
                    $(this).addClass('hidden');
                    $this.parent().find(".nano")[0].nanoscroller.reset();
                    var hiddenItems = $this.parent().find('.catalog-filter-list.hidden');
                    if (items.length === hiddenItems.length) {
                        $this.parents('.catalog-filter-search').find('.nano-content').append('<div class="js-search-info">По вашему запросу ничего не найдено.</div>');
                        $this.parent().find(".nano")[0].nanoscroller.reset();
                    }
                }
            });
        });

        $('body').on('keydown', function (e) {
            if ($('.js-search-catalog').is(':focus')) {
                if (e.originalEvent.code.toLowerCase() == "escape")
                    $('.js-search-catalog').blur();
                return;
            }
            //if (e.code.toLowerCase().indexOf('key') != 0) return;
            $('.js-search-catalog').focus();
        })
    }
};
$(document).ready(function () {
    ui.init();
});

// --------------------------------------- gui elements -------------------------------------------

// --------------------------------------- gallery product -------------------------------------------
$(document).ready(function () {
    $('.js-product-slider').slick({
        infinite: true,
        vertical: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.js-product-detail',
        focusOnSelect: true
    });
    $('.js-product-detail').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.js-product-slider'
    });

    $(window).resize(function () {
        if ($(window).outerWidth() <= 640) {
            $('.js-product-slider').slick('unslick');
            $('.js-product-slider').slick({
                infinite: true,
                vertical: false,
                slidesToShow: 4,
                slidesToScroll: 1,
                asNavFor: '.js-product-detail',
                focusOnSelect: true
            });
        } else {
            $('.js-product-slider').slick('unslick');
            $('.js-product-slider').slick({
                infinite: true,
                vertical: true,
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: '.js-product-detail',
                focusOnSelect: true
            });
        }
    });

});


// --------------------------------------- gallery product -------------------------------------------

// --------------------------------------- accordion product -------------------------------------------

$(document).ready(function () {
    $('.js-accordion:first').addClass('__active').next().show();
    $('.js-accordion').on('change', function () {
        $('.js-accordion').removeClass('__active');
        $('.product-info-desc').slideUp();

        $(this).addClass('__active').next().slideDown();
    });
});

// --------------------------------------- accordion product -------------------------------------------


// --------------------------------------- tabs product ------------------------------------------------
$('body').on('click', '.js-tabs a[href][data-tabs]', function (e) {
    e.preventDefault();
    var $tab = $(this);
    $('.js-tabs a, [data-tabs-group]').removeClass('__current');
    $('[data-tabs-group="' + $tab.attr('data-tabs') + '"]').addClass('__current');
    $tab.addClass('__current');
});

$(window).resize(function () {
    if ($(window).outerWidth() <= 745) {
        $('.js-tabs a[href][data-tabs]').each(function () {
            var tab = $(this).clone();

            $('[data-tabs-group="' + $(this).attr('data-tabs') + '"]').find('.tabs-item').remove();
            $('[data-tabs-group="' + $(this).attr('data-tabs') + '"]').prepend(tab)

            $(this).click(function () {
                $(this).toggleClass('__current')
            })
        });
    } else {
        $('[data-tabs-group]').find('.tabs-item').remove();
    }
});
// --------------------------------------- tabs product ------------------------------------------------


// --------------------------------------- cart counter ------------------------------------------------
var counter = $('.js-counter');
counter.on('click', '.__max', function (e) {
    var item;
    item = $(this).closest('.counter').find('.counter-text');
    item.val(Number(1 * item.val()) + 1);
    $(this).parent('.counter').find('.__min.__disabled').removeClass('__disabled');
    counter.recalc(item);
    e.preventDefault()

});
counter.on('click', '.__min', function (e) {
    var item;
    item = $(this).closest('.counter').find('.counter-text');
    item.val(Number(1 * item.val()) - 1);
    if (item.val() === 1 || item.val() <= 1) {
        item.val(Number(1));
        $(this).addClass('__disabled');
    }
    counter.recalc(item);
    e.preventDefault()

});
counter.each(function () {
    if ($(this).find('.counter-text').val() == '1') {
        $(this).find('.__min').addClass('__disabled');
    }
});

counter.recalc = function (item) {
    var price = item.val() * item.data('price');
    item.closest('.basket-item').find('.basket-item-all-price').data('price',price);
    price = price.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
    item.closest('.basket-item').find('.basket-item-all-price').html(price + ',-');

    //пересчитываем полную сумму
    var total = 0;
    $('.basket-item-all-price').each(function () {
        total += parseInt($(this).data('price'));
    })

    $('.basket-price-total').html(total.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ") + ',-')

};

$('.js-basket-additional').on('click', function () {
    $(this).toggleClass('__active');
});
// --------------------------------------- cart counter ------------------------------------------------


// --------------------------------------- type delivery ------------------------------------------------

$('.js-show-type-delivery').on('click', function () {
    $(this).toggleClass('__active');
    if ($(this).hasClass('__active')) {
        $(this).html('Свернуть варианты');
    } else {
        $(this).html('Развернуть варианты');
    }
});
$('.js-type-delivery').on('change', function(){
    var attrDelivery =$(this).attr( "data-tab-delivery" );
   if(typeof attrDelivery !== typeof undefined && attrDelivery !== false){
       $('.js-show-type-delivery').addClass('__active').text('Свернуть варианты')
   } else {
       $('.js-show-type-delivery').removeClass('__active').text('Развернуть варианты')
   }
});
// --------------------------------------- type delivery ------------------------------------------------


// использование cb bootstrap`а для фикса прыганья фиксированной шапки и множественных окон
var jsModal = $('.js-modal');
jsModal.on('show.bs.modal', function (e) {
    var width;
    width = $('.fixedMainMenu').outerWidth();
    $('.fixedMainMenu').css('width', width);
    $('.js-modal').trigger('click');

});

jsModal.on('hidden.bs.modal', function (e) {
    $('.fixedMainMenu').css('width', '100%');
    $('body').attr('style', '');

});


// --------------------------------------- adaptive frame iframe bootstrap ------------------------------------------------

$(document).ready(function(){
    $('iframe').each(function(){
        if ($(this).parent().prop("tagName") == 'BODY') return;
        if ($(this).parent().hasClass('embed-responsive')) return;
        if ($(this).hasClass('instagram-media')) return;
        console.log($(this));
        $(this).wrap('<div class="embed-responsive embed-responsive-16by9"></div>')
    })
})