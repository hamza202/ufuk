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

    function shippingSwiper() {
        var shippingSwiper = new Swiper(".shippingSwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            navigation: {
                nextEl: ".shipping-slider-container .swiper-button-next",
                prevEl: ".shipping-slider-container .swiper-button-prev",
            },
            pagination: {
                el: ".shipping-slider-container .swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                700: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                930: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                },
            },
        });

    }
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
    function activation() {
        let charLimit = 1;
        let inputs = $('.inputs')
        $(".inputs").keydown(function (e) {
            let keys = [8, 9, /*16, 17, 18,*/ 19, 20, 27, 105, 104, 103, 102, 101, 100, 99, 98, 97, 96, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 48, 144, 145];

            if (e.which === 8 && this.value.length === 0) {
                $(this).parent().prev('.col').find(inputs).focus();
            } else if ($.inArray(e.which, keys) >= 0) {
                return true;
            } else if (this.value.length >= charLimit) {
                $(this).parent().next('.col').find(inputs).focus();
                return false;
            } else if (e.shiftKey || e.which <= 48 || e.which >= 58) {
                return false;
            }

        }).keyup(function () {
            if (this.value.length >= charLimit) {
                $(this).parent().next('.col').find(inputs).focus();
                return false;
            }
        });
    }
    function isRtl() {
        let dir = $("html").attr("dir");
        return dir === "rtl";
    }

    function changePlan() {
        let planButton = $('.plan-btn-list button')
        planButton.on('click', function () {
            planButton.removeClass('active');
            $(this).addClass('active');
            let plan = $(this).attr('data-plan');

            if (plan === 'month') {
                $('.year-type-text').addClass('d-none');
                $('.month-type-text').removeClass('d-none');
            } else {
                $('.year-type-text').removeClass('d-none');
                $('.month-type-text').addClass('d-none');
            }

            $('.plan-price').each(function () {
                $(this).find('span').text($(this).attr('data-' + plan));
            });

        });
    }
    function showPassword() {
        $('.show-pass').on('click', function (){
            let input = $(this).parent().find('input');
            input.get(0).type = 'text';
            $(this).addClass('d-none');
            $('.hide-pass').removeClass('d-none');
        })
        $('.hide-pass').on('click', function (){
            let input = $(this).parent().find('input');
            input.get(0).type = 'password';
            $(this).addClass('d-none');
            $('.show-pass').removeClass('d-none');
        })
    }
    function changeDir() {
        let dirCheck = localStorage.getItem('dir');

        setRtl(dirCheck);
        function setRtl(dirCheck) {
            if (dirCheck != null) {
                console.log(dirCheck)
                $("html").attr("dir", dirCheck);
                $('#mainStylesheet').attr('href', isRtl() ? 'css/main-rtl.css' : 'css/main.css')
            }
        }

        $("#toggle-rtl").on('click', function () {
            localStorage.setItem('dir', isRtl() ? "ltr" : "rtl");
            location.reload();
        });

    }

    function phoneNumber () {
        var input = document.querySelector("#phone");
        $("#phone").on("change focus input", function () {
            $(this).removeAttr('placeholder');
        })
        var iti = window.intlTelInput(input, {
            // separateDialCode:true,
            nationalMode: false,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.3/build/js/utils.js",
        });
        iti.setCountry("sa");
        // var error = iti.getValidationError();
        // console.log(error)
        // window.iti = iti;
        let phoneInput = $('.iti--allow-dropdown');
        let phoneNumberDrop = $(".iti__country-list")
        let phoneInputWidth = phoneInput.width();
        phoneNumberDrop.css('width', phoneInputWidth + 'px')
        console.log(phoneInputWidth);
        $(window).on('resize', function () {
            let phoneInputWidth = phoneInput.width();
            phoneNumberDrop.css('width', phoneInputWidth + 'px');
            console.log(phoneInputWidth);

        });
    }


    return {
        init: function () {
            changeDir();
            if ($('.numscroller').length) {
                countUp();
            }
            shippingSwiper();
            testimonialSwiper();
            changePlan();
            if($('.inputs').length){
                activation()
            }
            if($('.show-pass').length){
                showPassword();
            }
            if ($('#phone').length) {
                phoneNumber()
            }
        }
    };
})();
$(document).ready(function () {
    main.init();
});
