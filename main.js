$(document).ready(function(){
	$(this).scrollTop(0);
	$("a").click(function(){
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$("html, body").animate({
				scrollTop: $(hash).offset().top
				},800);
		}
	});
});

