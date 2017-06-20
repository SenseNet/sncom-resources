---
title: sensenet ECM Releases
permalink: /releases/
redirect_from: /releases.html
layout: releases
---

{% for repository in site.data.releases %}
{% assign ind = forloop.index %}
<ul class="item{% if ind == 1 %} show{% endif %}" id="item-{{forloop.index}}">
{% for release in repository.releases %}

<li markdown="1">
### [{{ release.version }}]({{ release.html_url }}) _{{ release.created_at | date: '%B %d, %Y' }}_
{{ release.body }}
</li>

{% endfor releases %}
</ul>
{% endfor releases %}

<script>
$(function(){
    $('.tab').on('click', function(){
        var index = $(this).index();
        $('.item').removeClass('show');
        $('.tab').removeClass('active');
        $('.item:eq(' + index + ')').addClass('show')
        $('.tab:eq(' + index + ')').addClass('active')
    });
});
</script>