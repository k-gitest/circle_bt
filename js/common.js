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