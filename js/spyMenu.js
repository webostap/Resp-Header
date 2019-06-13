function SpyMeny(menuId, sectionsClass) {
//  "use strict";
  var spy_menu = document.getElementById(menuId);
  var spy_menuCh = spy_menu.children;

  var pointer = document.createElement('li');
  pointer.className = "pointer";
  spy_menu.appendChild(pointer);

  var sections_query = document.getElementsByClassName(sectionsClass);
  var sections = new Array();
  for (let i = 0; i < sections_query.length; i++) {
    sections.push({
      section_el: sections_query[i],
      off_top: sections_query[i].offsetTop,
      li_el: spy_menu.querySelector('a[href*=' + sections_query[i].id + ']').parentElement
    });
  }

  var cur_scroll = 0;
  var cur_pointer = spy_menu.firstElementChild;
  var spy_is_hover = false;

  function set_pointer(cur_el) {
    pointer.style.transform = "translateX(" + cur_el.offsetLeft + "px) scaleX(" + cur_el.offsetWidth + ")";
  }

  function init_sizes() {
    set_pointer(cur_pointer);
    for (let i = 0; i < sections.length; i++) {
      sections[i].off_top = sections[i].section_el.offsetTop;
    }
  }

  init_sizes();
  window.addEventListener('resize', init_sizes);
  window.addEventListener('load', init_sizes);


  window.onscroll = function () {
    var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

    for (var i = 0, last_scroll = 0; i < sections.length; i++)
      if (sections[i].off_top <= scrollPosition + 100)
        last_scroll = i;

    if (last_scroll != cur_scroll) {
      cur_scroll = last_scroll;
      cur_pointer = sections[cur_scroll].li_el;
      if (!spy_is_hover) set_pointer(cur_pointer);
    }

  };

  for (let i = 0; i < spy_menuCh.length; i++) {
    spy_menuCh[i].onmouseenter = function (e) {
      spy_is_hover = true;
      set_pointer(e.target);
    };
  }

  spy_menu.onmouseleave = function () {
    spy_is_hover = false;
    set_pointer(cur_pointer);
  };

}

document.addEventListener('DOMContentLoaded', function () {
  var main_menu = new SpyMeny('spy', 'section');
});
