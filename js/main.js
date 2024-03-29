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
    let category_swiper = function () {
        if ($('#category_slider').length > 0) {
            let category_slider = new Swiper("#category_slider", {
                slidesPerView: 3,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                speed: 1500,
                // noSwiping: false,
                // noSwipingClass: 'swiper-slide',
                breakpoints: {
                    0: {slidesPerView: "auto", spaceBetween: 10,},
                    700: {slidesPerView: "auto", spaceBetween: 15},
                    991: {slidesPerView: "auto", spaceBetween: 20},
                    1400: {slidesPerView: 5, spaceBetween: 20, loop: false},

                },
            });
        }
    }

    let orphan_slider = function () {
        if ($('#orphan_slider').length > 0) {
            new Swiper("#orphan_slider", {
                slidesPerView: "auto",
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                speed: 1500,
                // noSwiping: false,
                // noSwipingClass: 'swiper-slide',
                breakpoints: {
                    0: {slidesPerView: "auto", spaceBetween: 10,},
                    700: {slidesPerView: "auto", spaceBetween: 15},
                    991: {slidesPerView: "auto", spaceBetween: 20},
                    1400: {slidesPerView: "auto", spaceBetween: 20, loop: false},

                },
            });
        }
    }
    let home_gallery_slider = function () {
        if ($('#home_gallery_slider').length > 0) {
             new Swiper("#home_gallery_slider", {
                slidesPerView: 3,
                spaceBetween: 20,
                loop: false,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: "#home_gallery_slider_next",
                    prevEl: "#home_gallery_slider_prev",
                },
                speed: 1500,
                // noSwiping: false,
                // noSwipingClass: 'swiper-slide',
                breakpoints: {
                    0: {slidesPerView: 1, spaceBetween: 0,},
                    700: {slidesPerView: 2, spaceBetween: 0},
                    991: {slidesPerView: 3, spaceBetween: 0},
                    1400: {slidesPerView: 3, spaceBetween: 0},

                },
            });
        }
    }

let orphan_gallery_slider = function () {
    if ($('.orphan_gallery_slider').length > 0) {
        new Swiper(".orphan_gallery_slider", {
            slidesPerView: 5,
            spaceBetween: 20,
            loop: false,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            // navigation: {
            //     nextEl: "#home_gallery_slider_next",
            //     prevEl: "#home_gallery_slider_prev",
            // },
            speed: 1000,
            // noSwiping: false,
            // noSwipingClass: 'swiper-slide',
            breakpoints: {
                0: {slidesPerView: 2, spaceBetween: 0,},
                700: {slidesPerView: 3, spaceBetween: 0},
                991: {slidesPerView: 4, spaceBetween: 0},
                1400: {slidesPerView: 5, spaceBetween: 0},

            },
        });
    }
}

let partnership_slider = function () {
    if ($('#partnership_slider').length > 0) {
        new Swiper("#partnership_slider", {
            slidesPerView: 2,
            spaceBetween: 10,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            // navigation: {
            //     nextEl: "#home_gallery_slider_next",
            //     prevEl: "#home_gallery_slider_prev",
            // },
            speed: 1000,
            // noSwiping: false,
            // noSwipingClass: 'swiper-slide',
            breakpoints: {
                0: {slidesPerView: 2, spaceBetween: 10,},
                700: {slidesPerView: 3, spaceBetween: 10},
                991: {slidesPerView: 5, spaceBetween: 10},
                1400: {slidesPerView: 6, spaceBetween: 10},

            },
        });
    }
}
    // add class active to all previous elements
    // $('.prprpr .gfgfg').prevAll().addClass("active");


    function testimonialSwiper() {
        var testimonialSwiper = new Swiper(".testimonial-slider", {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
            roundLengths: true,
            loop: true,
            loopAdditionalSlides: 30,


            breakpoints: {
                576: {
                    slidesPerView:1.3,
                    spaceBetween: 30,
                },
            },
        });

    }

    function isRtl() {
        let dir = $("html").attr("dir");
        return dir === "rtl";
    }

    let youtubePlyr = function () {
        const player = new Plyr('.y-player', {
            youtube: {
                showinfo: 0,
                rel: 0
            }
        });
        $('.promo-video').on('click', function () {
            player.play();
            $('.v-overlay, .v-overlay-content').fadeOut();
        });
        player.on('pause', () => {
            $('.v-overlay, .v-overlay-content').fadeIn();
        });
        player.on('play', () => {
            $('.v-overlay, .v-overlay-content').fadeOut();
        });
    }
    $('.see-more-payment').on('click', function () {
        $('.select-zakat-box').toggleClass('show')
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).text('See Less')
        } else {
            $(this).text('See More')
        }
    });
    let phoneNumber = function () {
        var input = document.querySelector("#phone");
        $("#phone").on("change focus input", function () {
            $(this).removeAttr('placeholder');
        })
        var iti = window.intlTelInput(input, {
            // separateDialCode:true,
            // nationalMode: false,
            utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@17.0.3/build/js/utils.js",
        });
        iti.setCountry("sa");
        // var error = iti.getValidationError();
        // console.log(error)
        // window.iti = iti;
        let phoneInput = $('.phone-width');
        let phoneNumberDrop = $(".iti__country-list")
        let phoneInputWidth = phoneInput.width();
        phoneNumberDrop.css('width', phoneInputWidth + 'px')
        $(window).on('resize', function () {
            let phoneInputWidth = phoneInput.width();
            phoneNumberDrop.css('width', phoneInputWidth + 'px');

        });
    }
    let productDetailsSlider = function () {
        if ($('.mySwiper-g').length) {
            var swiper = new Swiper(".mySwiper-g", {
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: false,
                watchSlidesVisibility: true,
                watchSlidesProgress: false,
                breakpoints: {
                    0: {
                        slidesPerView: 2,
                    },
                    400: {
                        slidesPerView: 3,
                    },
                    640: {
                        slidesPerView: 4,
                    },
                    768: {
                        slidesPerView: 5,
                    },
                    992: {
                        slidesPerView: 5,
                    },
                    1200: {
                        slidesPerView: 4,
                    },
                },
            });
        }

        var swiper2 = new Swiper(".mySwiper2", {
            spaceBetween: 10,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            thumbs: {
                swiper: $('.mySwiper-g').length ? swiper : null,
            }
        });
        let contentToToggle = $('.share-social');
        $('.share-btn').on('click',
            function (e) {
                e.preventDefault()
                contentToToggle.toggleClass('open');
            });
        $('.favorite-btn').on('click', function (e) {
            e.preventDefault()
            $(this).toggleClass('active');
        });

    }
    // $('.project-search-wrapper input').focus(function () {
    //     $('.popular-search-wrapper').addClass('show');
    // }).focusout(function () {
    //     $('.popular-search-wrapper').removeClass('show');
    // });

    // Start Cart logic
    // delete item from cart
    const myCollapsible = document.getElementById('orderSummaryCollapse');
    const myCollapsible2 = document.getElementById('orderSummaryCollapse2')
    if (myCollapsible) {
        myCollapsible.addEventListener('hidden.bs.collapse', event => {
            document.querySelector('.order-summary-overlay').classList.remove('show');
        });
        myCollapsible.addEventListener('shown.bs.collapse', event => {
            document.querySelector('.order-summary-overlay').classList.add('show');
        });
        document.querySelector('.order-summary-overlay').addEventListener('click', function () {
            document.querySelector('.order-summary-overlay').classList.remove('show');
            const bsCollapse = new bootstrap.Collapse(myCollapsible, {
                hide: true
            })
        });
    }
    if (myCollapsible2) {
        myCollapsible2.addEventListener('hidden.bs.collapse', event => {
            document.querySelector('.order-summary-overlay-2').classList.remove('show');
        });
        myCollapsible2.addEventListener('shown.bs.collapse', event => {
            document.querySelector('.order-summary-overlay-2').classList.add('show');
        });
        document.querySelector('.order-summary-overlay-2').addEventListener('click', function () {
            document.querySelector('.order-summary-overlay-2').classList.remove('show');
            const bsCollapse = new bootstrap.Collapse(myCollapsible2, {
                hide: true
            })
        });
    }

    // End Cart logic
    let showPassword = function () {
        $(".password-toggle").on("change", function () {
            let passwordInput = $(this).parent().find("input.password-input");
            let checkLabel = $(this).parent().find(".password-toggle-btn");
            if ($(this).is(':checked')) {
                passwordInput.attr("type", "text");
                checkLabel.addClass('active');
            } else {
                passwordInput.attr("type", "password");
                checkLabel.removeClass('active');
            }
        })
    }

    let datePiker = function () {
        const elem = document.getElementById('datepicker');
        try {
            new Datepicker(elem, {
                autohide: true,
            });
        } catch (e) {
            /* ... */
        }
    }

    let quickDonate = function () {
        if ($('.quick-donate-section').length) {
            // fade in when scroll more than 100px
            if ($(window).scrollTop() > 150) {
                $('.quick-donate-section').fadeIn();
            } else {
                $('.quick-donate-section').fadeOut();
            }
            $(window).on('scroll', function () {
                if ($(window).scrollTop() > 150) {
                    $('.quick-donate-section').fadeIn();
                } else {
                    $('.quick-donate-section').fadeOut();
                }
            });
        }
    }
    // let show_more = function () {
    //     $('.more-filter-btn button').on('click', function () {
    //         $('.filter-btn-list').addClass('active');
    //         $(this).addClass('d-none');
    //     });
    // }

    return {
        init: function () {
            // if($('.more-filter-btn').length){
            //     show_more();
            // }
            quickDonate();
            partnership_slider();
            orphan_gallery_slider();
            orphan_slider();
            if($('#datepicker').length){
                datePiker();
            }
            if ($('#phone').length) {
                phoneNumber()
            }
            if ($('.password-toggle').length) {
                showPassword();
            }
            hero_swiper();
            if ($('.numscroller').length) {
                countUp();
            }
            category_swiper();
            if ($('.testimonial-slider').length) {
                testimonialSwiper();
            }
            if ($('.y-player').length) {
                youtubePlyr();
            }
            home_gallery_slider();
            if ($('.mySwiper2').length) {
                productDetailsSlider()
            }
        }
    };
})();
$(document).ready(function () {
    main.init();
    $(".subscribe").click(function(e){
        e.preventDefault();
        $(this).parents(".subscribe-form").find(".alert-danger").addClass("d-none");
        $(this).parents(".subscribe-form").find(".alert-success").addClass("d-none");

        let email = $(this).parents(".subscribe-form").find("input.subscribe_email").val();
        let current_lang_path=$("#current_lang_path").val();
        let url = current_lang_path+'/subscribe';
        let clickbtn=$(this)

        let pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

        if(!pattern.test(email))
        {
            $(this).parents(".subscribe-form").find(".alert-danger").removeClass("d-none");
            $(this).parents(".subscribe-form").find(".alert-danger").html($("#Please_Enter_Valid_Email").val());
        }else{
            $.ajax({
                url:url,
                method:'POST',
                data:{
                    email:email
                },
                success:function(response){
                    if(response.success){
                        clickbtn.parents(".subscribe-form").find(".alert-success").removeClass("d-none");
                        clickbtn.parents(".subscribe-form").find(".alert-success").html(response.message);
                        clickbtn.attr("disabled","disabled");
                    }else{
                        clickbtn.parents(".subscribe-form").find(".alert-danger").removeClass("d-none");
                        clickbtn.parents(".subscribe-form").find(".alert-danger").html(response.message);
                        clickbtn.attr("disabled","disabled");
                    }
                },
                error:function(error){}
            });
        }
    });
});
