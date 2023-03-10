/* 画像先読み */
$('.container').each(function () {
    $("<img>").attr("src", $(this).attr('href'));
});

/* 動画制御設定 */
let _video = document.querySelector("video");

window.addEventListener('scroll', function () {
    let scrl_top = document.documentElement.scrollTop ||// IE、Firefox、Opera
        document.body.scrollTop;// Chrome、Safari
    if (scrl_top < 10) {
        _video.play();
    } else if (scrl_top > 10) {
        _video.pause();
    }
});

/* スマホメニュー設定 */
const open = document.querySelectorAll(".sp_btn,.sp_link,.g_menu");
const g_menu = document.querySelector(".g_menu");
const sp_body = document.querySelector("body");

open.forEach(function (e) {
    e.addEventListener('click', function () {
        sp_body.classList.toggle('body_bind');
        g_menu.classList.toggle('inside');
    });
});

/* ナビ固定設定 */
let _window = $(window),
    _header = $('.nav'),
    _title = $('.m-title');

const start_scroll = _header.height() - 5;

_window.on('scroll', function () {
    if (_window.scrollTop() > start_scroll) {
        _header.addClass('fixed');
        _title.addClass('fixed');
    }
    else if (_window.scrollTop() < start_scroll) {
        _header.removeClass('fixed');
        _title.removeClass('fixed');

    }
});

_window.trigger('scroll');

/* 円表示設定 */
let menu_btn_name = ".menu-button";
let swt = document.querySelector(".sw-toggle");
let cirlce_items = document.querySelectorAll('.circular-menu1,.circular-menu2,.circular-menu3,.circular-menu4');
let skill_list1 = document.querySelectorAll('.circular-menu1,.circular-menu1 .svg-image,.circular-menu1  a,.circular-menu1  img');
let skill_list2 = document.querySelectorAll('.circular-menu2,.circular-menu2 .svg-image,.circular-menu2  a,.circular-menu2  img');
let skill_list3 = document.querySelectorAll('.circular-menu3,.circular-menu3 .svg-image,.circular-menu3  a,.circular-menu3  img');

let skill_list4 = document.querySelectorAll('.circular-menu4,.circular-menu4 .svg-image,.circular-menu4  a,.circular-menu4  img');


let skill_list = [skill_list1, skill_list2, skill_list3, skill_list4];
skill_list = Array.prototype.slice.call(skill_list);

for (var i = 0, l = cirlce_items.length; i < l; i++) {
    let items_a = cirlce_items[i].querySelectorAll('.circle a');

    for (var b = 0, m = items_a.length; b < m; b++) {
        items_a[b].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / m) * b * Math.PI)).toFixed(4) + "%";
        items_a[b].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / m) * b * Math.PI)).toFixed(4) + "%";
    }
}

document.addEventListener('click', function (e) {
    if (e.target.dataset.skill) {
        let skill_num = e.target.dataset.skill;
        skill_num = Number(skill_num);

        let menu_btn_num = menu_btn_name + skill_num;
        let skill_ary = skill_num - 1;

        document.querySelector(menu_btn_num).previousElementSibling.classList.toggle('open');
        let skill_btn_chk = document.querySelector(menu_btn_num).previousElementSibling.classList.contains('open');
        if (skill_btn_chk == false) {
            document.querySelector(menu_btn_num).classList.remove('menu_on2');
            document.querySelector(menu_btn_num).classList.remove('menu_on');

            skill_list[skill_ary].forEach(function (e) {
                e.style.animationPlayState = "paused";
            });
        } else {
            document.querySelector(menu_btn_num).classList.add('menu_on2');

            skill_list[skill_ary].forEach(function (e) {
                e.style.animationPlayState = "running";
            });
        }
    }
})

document.querySelector(".sw-toggle").onclick = function (event) {

    if (!document.querySelector(".sw-toggle").checked) {
        document.querySelectorAll('.open').forEach(function (x) {
            x.classList.remove('open');
        });

        document.querySelectorAll('.menu_on').forEach(function (x) {
            x.classList.remove('menu_on');
        });
        document.querySelectorAll('.menu_on2').forEach(function (x) {
            x.classList.remove('menu_on2');
        });

        for (var i = 0, e = event.target.value; i < e; i++) {
            let sk_array = skill_list[i];
            sk_array.forEach(function (g) {
                g.style.animationPlayState = "paused";
            });
        }

    } else if (document.querySelector(".sw-toggle").checked) {

        for (var i = 0, e = event.target.value; i < e; i++) {

            let b = i + 1;
            let m_b_n = menu_btn_name + b;

            document.querySelector(m_b_n).previousElementSibling.classList.add('open');
            document.querySelector(m_b_n).classList.remove('menu_on2');
            document.querySelector(m_b_n).classList.add('menu_on');

            let sk_array = skill_list[i];
            sk_array.forEach(function (g) {
                g.style.animationPlayState = "running";
            });
        }
    }
}

/* fancybox設定 */
$(function () {
    $('[data-fancybox="gallery"]').fancybox({
        loop: true,
        buttons: [
            'thumbs',
            'close'
        ],
        caption: function (instance, current) {
            return $(this).next('figcaption').html();
        },
        touch: {
            vertical: false
        }
    });
});

/* モーダル設定 */
$(function () {
    $('.js-modal-open').each(function () {
        $(this).on('click', function () {
            var target = $(this).data('target');
            var modal = document.getElementById(target);
            $(modal).fadeIn();
            bodyFix();
            close_modal();
            return false;
        });
    });

    $('.js-modal-close').on('click', function () {
        $('.modal').fadeOut();
        bodyFixReset();
        return false;
    });

    //モーダルスクロール位置リセット
    function close_modal() {
        $('.modal__bg').scrollTop(0).hide().removeAttr('style');
    };

    //領域外クリック判定
    $('.modal').on('click', function (e) {
        if (!$(e.target).closest('.modal__content').length && !$(e.target).closest('.js-modal-close').length) {
            $('.modal').fadeOut();
            bodyFixReset();
            return true;
        }
    });

    //body固定関数
    var bodyElm = $('body');
    var scrollPosi;
    function bodyFix() {
        scrollPosi = $(window).scrollTop();
        bodyElm.css({
            'position': 'fixed',
            'width': '100%',
            'z-index': '1',
            'top': -scrollPosi
        });
    }
    //body fixリセット
    function bodyFixReset() {
        bodyElm.removeAttr('style');
        //scroll位置を調整
        $("html, body").scrollTop(scrollPosi);
    }

});

/* swiper設定 */
var swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 1.9,
    centeredSlides: true,
    grabCursor: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

/* 背景チェンジ設定 */
$(window).on('load scroll resize', function () {
    var secArr = new Array();
    var current = -1;
    var secColor = new Array('', '#111', '#035fff', '#BBBE2B', '#5d4037', '#f43959', '#111');

    $('.block').each(function (i) {
        secArr[i] = $(this).offset().top;
    });

    function chengeBG(secNum) {
        if (secNum != current) {
            current = secNum;
            $('.block-bg').css({ backgroundColor: secColor[current] });
        }
    }

    for (var i = secArr.length - 1; i >= 0; i--) {
        if ($(window).scrollTop() > secArr[i]) {
            chengeBG(i);
            break;
        }
    }

});


/* フェード設定 */
window.addEventListener('DOMContentLoaded', function () {
    $(window).scroll(function () {
        $('.fadein').each(function () {
            var elemPos = $(this).offset().top;
            var scroll = $(window).scrollTop();
            var windowHeight = $(window).height();
            if (scroll > elemPos - windowHeight + 200) {
                $(this).addClass('scrollin');
            }
        });
    });
});

window.addEventListener('DOMContentLoaded', function () {
    var effect_btm = 200; // 画面下からどの位置でフェードさせるか
    var effect_move = 30; // どのぐらい要素を動かすか
    var effect_time = 500; // エフェクトの時間(ms) 1秒なら1000

    //親要素と子要素のcssを定義
    $('.scroll-fade-row').css({
        opacity: 0
    });
    $('.scroll-fade-row').children().each(function () {
        $(this).css({
            opacity: 0,
            transform: 'translateY(' + effect_move + 'px)',
            transition: effect_time + 'ms'
        });
    });

    // スクロールまたはロードするたびに実行
    $(window).on('scroll load', function () {
        var scroll_top = $(this).scrollTop();
        var scroll_btm = scroll_top + $(this).height();
        var effect_pos = scroll_btm - effect_btm;

        //エフェクトが発動したとき、子要素をずらしてフェードさせる
        $('.scroll-fade-row').each(function () {
            var this_pos = $(this).offset().top;
            if (effect_pos > this_pos) {
                $(this).css({
                    opacity: 1,
                    transform: 'translateY(0)'
                });
                $(this).children().each(function (i) {
                    $(this).delay(100 + i * 200).queue(function () {
                        $(this).css({
                            opacity: 1,
                            transform: 'translateY(0)'
                        }).dequeue();
                    });
                });
            }
        });
    });

});

/* スムーズスクロール設定 */
var Ease = {
    easeInOut: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}
var duration = 500;
window.addEventListener('DOMContentLoaded', () => {
    var smoothScrollTriggers = document.querySelectorAll('a[href^="#p"]');
    smoothScrollTriggers.forEach(function (smoothScrollTrigger) {
        smoothScrollTrigger.addEventListener('click', function (e) {
            var href = smoothScrollTrigger.getAttribute('href');
            var currentPostion = document.documentElement.scrollTop || document.body.scrollTop;
            var targetElement = document.getElementById(href.replace('#', ''));
            if (targetElement) {
                e.preventDefault();
                e.stopPropagation();
                var targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top + 5;
                var startTime = performance.now();
                var loop = function (nowTime) {
                    var time = nowTime - startTime;
                    var normalizedTime = time / duration;
                    if (normalizedTime < 1) {
                        window.scrollTo(0, currentPostion + ((targetPosition - currentPostion) * Ease.easeInOut(normalizedTime)));
                        requestAnimationFrame(loop);
                    } else {
                        window.scrollTo(0, targetPosition);
                    }
                }
                requestAnimationFrame(loop);
            }
        });
    });
});
