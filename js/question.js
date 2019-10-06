function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$(window).on("load", function() {
  const c = getCookie("openquestion");
  if (c == null || c == false) {
    setTimeout(function() {
      $(".js-slide_block").addClass("open");
    }, 3000);
  }

  $(".js-slide_block__close").on("click", function() {
    $(this)
      .closest(".js-slide_block")
      .removeClass("open");
  });

  $(".js-go_to_survey").on("click", function() {
    $(this)
      .closest(".js-slide_block")
      .removeClass("open");
  });
});
