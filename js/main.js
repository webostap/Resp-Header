function NewResponsiveLayout() {
  'use strict';


  var masthead = document.getElementById('masthead');
  var main_menu = document.getElementById("spy");
  var sub_menus = document.getElementsByClassName("sub-menu");
  var side_menu = document.querySelector('.side-menu');
  var main_menuCh = main_menu.children;
  var logo = document.querySelector('.logo');

  var pop = document.getElementById("pop");

  //triggers
  var headButt = document.getElementById("headButt");
  var orderButt = document.querySelector('.cons-order');
  var pop_closes = document.querySelectorAll(".pop-close");
  var order_calls = document.querySelectorAll("a[href='#callback']");


  //get scrollbar width
  window.addEventListener('mousedown', function () {
    if (!document.body.classList.contains('pop')) {
      let scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollBar', scrollBarWidth + 'px');
    }
  });

  var HeadState = 0;

  function initSizes() {
    HeadState = MastheadLayoyt(HeadState);
    pop.style.top = masthead.offsetHeight + 'px';
    if (HeadState != 2) setSubMenus();
  }

  initSizes();
  initOrderCalls();
  initPopCloses();
  initClosePopOnLinksClick();

  window.addEventListener('load', initSizes);
  window.addEventListener('resize', initSizes);


  function setSubMenus() {
    for (let i = 0; i < sub_menus.length; i++) {
      let parentLeft = -sub_menus[i].parentElement.offsetLeft;
      let subMenuLeft = (sub_menus[i].parentElement.offsetWidth - sub_menus[i].offsetWidth) / 2;
      if (HeadState == 1) {
        sub_menus[i].style.left = subMenuLeft > parentLeft ? subMenuLeft + 'px' : parentLeft + 'px';
      } else sub_menus[i].style.left = subMenuLeft + 'px';
    }
  }

  function getMenuWidth() {
    var menu_width = 0;
    for (let i = 0; i < main_menuCh.length; i++) {
      menu_width += main_menuCh[i].offsetWidth;
      menu_width += 20; //margin
    }
    menu_width -= 20
    return menu_width;
  }


  function MastheadLayoyt(aHeadState) {
    var menu_width = getMenuWidth();

    if (aHeadState == 0 || aHeadState == 1) {
      if (window.innerWidth - 50 < menu_width + logo.offsetWidth + orderButt.offsetWidth) {
        aHeadState = 1;
        masthead.className = 'masthead--medium';
      } else {
        aHeadState = 0;
        masthead.className = '';
        main_menu.classList.remove("is-open");
        headButt.classList.remove("is-active");
      }
    }
    if (aHeadState == 1 || aHeadState == 2) {
      if (window.innerWidth - 50 < menu_width) {
        aHeadState = 2;
        masthead.className = 'masthead--small';
        main_menu.classList.remove("is-open");
        headButt.classList.remove("is-active");
      } else {
        aHeadState = 1;
        masthead.className = 'masthead--medium';
        if (pop.className == "o-side-nav") {
          pop.className = "";
          document.body.classList.remove("pop");
        }
      }
    }
    pop.style.top = masthead.offsetHeight + 'px';
    return aHeadState;
  }


  headButt.onclick = function () {
    headButt.classList.toggle("is-active");


    if (HeadState == 1) {
      var trans = parseFloat(getComputedStyle(main_menu)['transitionDuration']) * 1000;

      main_menu.classList.toggle("is-opening");
      setTimeout(function () {
        main_menu.classList.toggle("is-opening");
        if (main_menu.classList.contains('is-open')) {
          pop.style.top = masthead.offsetHeight + 'px';
        }
      }, trans);

      main_menu.classList.toggle("is-open");

    }
    if (HeadState == 2) {
      if (pop.className == "o-pop-order") {
        pop.className = "o-side-nav";
      } else {
        pop.classList.toggle("o-side-nav");
        document.body.classList.toggle("pop");

        pop.classList.toggle('is-opening');
        setTimeout(function () {
          pop.classList.toggle('is-opening');
        }, 250);

      }
    }
  }

  function initOrderCalls() {
    for (let order_call of order_calls) {
      order_call.onclick = function (e) {
        e.preventDefault;

        document.body.classList.add("pop");
        pop.className = "o-pop-order";
        pop.style.top = masthead.offsetHeight + 'px';

        pop.classList.toggle('is-opening');
        setTimeout(function () {
          pop.classList.toggle('is-opening');
        }, 250);

        if (HeadState == 2) {
          headButt.classList.remove("is-active");
        }
        return false;
      };
    }
  }

  function initPopCloses() {
    for (let pop_close of pop_closes) {
      pop_close.onclick = function () {
        document.body.classList.remove("pop");
        pop.className = "";
        if (HeadState == 2) {
          headButt.classList.remove("is-active");
        }
      }
    }
  }

  function initClosePopOnLinksClick() {
    for (let link of main_menu.querySelectorAll('a')) {
      link.addEventListener('click', function () {
        document.body.classList.remove("pop");
        pop.className = "";
      });
    }
  }
  for (let link of side_menu.querySelectorAll('a')) {
    link.addEventListener('click', function () {
      document.body.classList.remove("pop");
      headButt.classList.remove("is-active");
      pop.className = "";
    });
  }
  logo.onclick = function () {
    if (HeadState == 1) {
      document.body.classList.remove("pop");
      pop.className = "";
    }
    if (HeadState == 2) {
      document.body.classList.remove("pop");
      headButt.classList.remove("is-active");
      pop.className = "";
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new NewResponsiveLayout();
});
