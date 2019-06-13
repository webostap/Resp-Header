function OrderForm(formId) {
  'use strict';
  var form = document.getElementById(formId);
  var name = form.querySelector('input[name=name]');
  var phone = form.querySelector('input[name=phone]');
  var button = form.querySelector('button');
  var emptyError = form.querySelector('.empty-error');
  var loadObj = {};

  var formattedPhone = new Formatter(phone, {
    'pattern': '+7({{999}}) {{999}} {{99}} {{99}}',
    'persistent': true
  });

  for (let field of [name, phone]) {
    field.addEventListener('focus', function () {
      emptyError.classList.remove('is-active');
    });
  }

  button.onclick = function (e) {
    e.preventDefault;

    for (let field of [name, phone]) {
      if (field.parentElement.classList.contains('is-invalid'))
        return false;
    }

    if (!name.parentElement.classList.contains('is-dirty') || phone.value.replace(/ /g, '').length < 7) {
      emptyError.classList.add('is-active');
      return false;
    }

    loadObj = {
      name: name.value,
      phone: phone.value
    };
    console.log(loadObj);
    /*xhrPOST('../submit-order-form.php', loadObj, function(){
      alert(loadObj);
    });*/
    return false;
  }





  function xhrPOST(request, paramsObj, cb) {

    var xhr = new XMLHttpRequest();

    xhr.open('POST', request);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(paramsObj));

    xhr.onreadystatechange = function () {
      if (this.readyState === 4)
        if (this.status == 200 && this.status < 300)
          if (typeof cb === 'function')
            cb(JSON.parse(xhr.responseText));
    }
  }

}


document.addEventListener('DOMContentLoaded', function () {
  var main_menu = new OrderForm('orderForm');
});
