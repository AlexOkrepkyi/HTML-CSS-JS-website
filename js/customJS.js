// Opens and closes the menu
$("#open-icon").click(function(e) {
    e.preventDefault();
    $("#menu-wrapper").toggleClass("active");
    $("#open-icon").toggleClass("active"); // Icon remains active after the first click
});


// Smooth rolling
$(function() {
    $("a[href*=#]:not([href=#])").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html,body").animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});


// Slider 
$(".carousel").carousel({
    interval: 5000
});


$(function() {
    $("#text1").show(2000);
    $("#text1").animate({ top: "+=20%" }, 3000);
    $("#text1").fadeOut(5000);
});


$(function() {
    $("#text2").show(2000);
    $("#text2").animate({ top: "-=20%" }, 3000);
    $("#text2").fadeOut(5000);
})(jQuery);


// jQuery(document).ready(function(){
//     $("#text1").fadeIn(3000);
// })(jQuery);


$(document).ready(function() {
  $("#feedbackSubmit").click(function() {
    //clear any errors
    contactForm.clearErrors();
 
    //do a little client-side validation -- check that each field has a value and e-mail field is in proper format
    var hasErrors = false;
    $('#feedbackForm input,textarea').each(function() {
      if (!$(this).val()) {
        hasErrors = true;
        contactForm.addError($(this));
      }
    });
    var $email = $('#email');
    if (!contactForm.isValidEmail($email.val())) {
      hasErrors = true;
      contactForm.addError($email);
    }
 
    //if there are any errors return without sending e-mail
    if (hasErrors) {
      return false;
    }
 
    //send the feedback e-mail
    $.ajax({
      type: "POST",
      url: "library/sendmail.php",
      data: $("#feedbackForm").serialize(),
      success: function(data)
      {
        contactForm.addAjaxMessage(data.message, false);
        //get new Captcha on success
        $('#captcha').attr('src', 'library/vender/securimage/securimage_show.php?' + Math.random());
      },
      error: function(response)
      {
        contactForm.addAjaxMessage(response.responseJSON.message, true);
      }
   });
    return false;
  }); 
});
 
//namespace as not to pollute global namespace
var contactForm = {
  isValidEmail: function (email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
  },
  clearErrors: function () {
    $('#emailAlert').remove();
    $('#feedbackForm .help-block').hide();
    $('#feedbackForm .form-group').removeClass('has-error');
  },
  addError: function ($input) {
    $input.siblings('.help-block').show();
    $input.parent('.form-group').addClass('has-error');
  },
  addAjaxMessage: function(msg, isError) {
    $("#feedbackSubmit").after('<div id="emailAlert" class="alert alert-' + (isError ? 'danger' : 'success') + '" style="margin-top: 5px;">' + $('<div/>').text(msg).html() + '</div>');
  }
};