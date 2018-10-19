$(document).ready(function(){
	$(this).scrollTop(0);
	$("a").click(function(){
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$("html, body").animate({
				scrollTop: $(hash).offset().top
				},600);
		}
	});

let toPreload = ["assets/deepcove.JPG",
				"assets/graph.png",
				"assets/ball.png",
				"assets/email.png",
				"assets/github-mark.png",
				"assets/graph.png",
				"assets/linkedin.png",
				"assets/menolikey.png",
				"assets/music.png",
				"assets/resume.png"];

let imageLoadPromises = [];
	for (let url of toPreload) {
		imageLoadPromises.push(new Promise((resolve, reject) => {
			let image = new Image();
			image.src = url;
			image.onload = () => {
				resolve();
			}
		}));
	}
	imageLoadPromises.push(new Promise((resolve, reject) => {
		setTimeout(function(){
    		resolve();
  		}, 500);
	}));

	Promise.all(imageLoadPromises).then(()=>{
		document.getElementById("cover").style.display="none";
		document.getElementById("websiteContent").style.display="block";
	});
});