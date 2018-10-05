function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$(window).on('load', function (){
	var c = getCookie('openquestion');
	if ( c == null || c == false) {
          setTimeout (function(){
              $('.js-slide_block').addClass('open');
          }, 3000);
    }
	
	$('.js-slide_block__close').on('click', function () {
          $(this).closest('.js-slide_block').removeClass('open');
	});

	$('.js-go_to_survey').on('click', function () {
		$(this).closest('.js-slide_block').removeClass('open');
	});
});