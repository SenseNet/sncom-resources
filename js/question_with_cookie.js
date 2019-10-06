function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

$(document).on('click','.js-go_to_survey', function () {
	setCookie('openquestion', 'true', 30)
	$(this).closest('.js-slide_block').removeClass('open');
});
	
