let main = (function () {
    function countUp() {
        (function ($) {
            $(document).ready(function () {
                $('body').prepend("<div style='position:fixed;top:0px;left:0px;width:0;height:0;' id='scrollzipPoint'></div>");
                $(document).rollerInit();
                $('.numscroller').scrollzip({
                    showFunction: function () {
                        numberRoller($(this).attr('data-slno'));
                    },
                    wholeVisible: false,
                });
            });
            $(document).on("scroll resize", function () {
                $('.numscroller').scrollzip({
                    showFunction: function () {
                        numberRoller($(this).attr('data-slno'));
                    },
                    wholeVisible: false,
                });
            });
            $.fn.rollerInit = function () {
                var i = 0;
                $('.numscroller').each(function () {
                    i++;
                    $(this).attr('data-slno', i);
                    $(this).addClass("roller-title-number-" + i);
                });
            };
            $.fn.scrollzip = function (options) {
                var settings = $.extend({
                    showFunction: null,
                    hideFunction: null,
                    showShift: 0,
                    wholeVisible: false,
                    hideShift: 0,
                }, options);
                return this.each(function (i, obj) {
                    $(this).addClass('scrollzip');
                    if ($.isFunction(settings.showFunction)) {
                        if (
                            !$(this).hasClass('isShown') &&
                            ($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.showShift) > ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) &&
                            ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) < ($(this).outerHeight() + $(this).offset().top - settings.showShift)
                        ) {
                            $(this).addClass('isShown');
                            settings.showFunction.call(this);
                        }
                    }
                    if ($.isFunction(settings.hideFunction)) {
                        if (
                            $(this).hasClass('isShown') &&
                            (($(window).outerHeight() + $('#scrollzipPoint').offset().top - settings.hideShift) < ($(this).offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) ||
                                ($('#scrollzipPoint').offset().top + ((settings.wholeVisible) ? $(this).outerHeight() : 0)) > ($(this).outerHeight() + $(this).offset().top - settings.hideShift))
                        ) {
                            $(this).removeClass('isShown');
                            settings.hideFunction.call(this);
                        }
                    }
                    return this;
                });
            };

            function numberRoller(slno) {
                var min = parseInt($('.roller-title-number-' + slno).attr('data-min'));
                var max = parseInt($('.roller-title-number-' + slno).attr('data-max'));
                var timediff = parseInt($('.roller-title-number-' + slno).attr('data-delay'));
                var increment = parseInt($('.roller-title-number-' + slno).attr('data-increment'));
                var numdiff = max - min;
                var timeout = (timediff * 1000) / numdiff;
                //if(numinc<10){
                //increment=Math.floor((timediff*1000)/10);
                //}//alert(increment);
                numberRoll(slno, min, max, increment, timeout);

            }

            function numberRoll(slno, min, max, increment, timeout) {//alert(slno+"="+min+"="+max+"="+increment+"="+timeout);
                if (min <= max) {
                    $('.roller-title-number-' + slno).html(min);
                    min = parseInt(min) + parseInt(increment);
                    setTimeout(function () {
                        numberRoll(eval(slno), eval(min), eval(max), eval(increment), eval(timeout))
                    }, timeout);
                } else {
                    $('.roller-title-number-' + slno).html(max);
                }
            }
        })(jQuery);
    }

    let hero_swiper = function () {
        if ($('#hero_swiper').length > 0) {
            let swiperAnimation = new SwiperAnimation();
            let hero_slider = new Swiper("#hero_swiper", {
                pagination: {
                    el: "#hero_swiper_pagination",
                    clickable: true,
                },
                loop: true,
                effect: "fade",
                autoplay: {
                    delay: 5100,
                },
                speed: 1500,
                noSwiping: false,
                noSwipingClass: 'swiper-slide',
                on: {
                    init: function () {
                        swiperAnimation.init(this).animate();
                    },
                    slideChange: function () {
                        swiperAnimation.init(this).animate();
                    },
                },
            });
        }
    };
    function testimonialSwiper() {
        var testimonialSwiper = new Swiper(".testimonialSwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: ".testimonial-slider-container .swiper-button-next",
                prevEl: ".testimonial-slider-container .swiper-button-prev",
            },
            pagination: {
                el: ".testimonial-slider-container .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                900: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },

                1200: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });

    }
    function isRtl() {
        let dir = $("html").attr("dir");
        return dir === "rtl";
    }

    return {
        init: function () {
            hero_swiper();
            if ($('.numscroller').length) {
                countUp();
            }

            // testimonialSwiper();

        }
    };
})();
$(document).ready(function () {
    main.init();
});
