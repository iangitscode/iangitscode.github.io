const anchors = ['aboutmeBox', 'projectsAnchor', 'contactAnchor']

function smooth_scroll(idName) {
	scrollTo(document.body, document.getElementById(idName).offsetTop, 750)
}

function scrollTo(element, to = 0, duration= 1000) {
  const start = element.scrollTop;
  const change = to - start;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = (() => {

    currentTime += increment;

    const val = Math.easeInOutQuad(currentTime, start, change, duration);

    element.scrollTop = val;

    if (currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  });

  animateScroll();
};

 Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

let toPreload = ["assets/deepcove.JPG",
				"assets/graph.png",
				"assets/ball.png",
				"assets/email.png",
				"assets/github-mark.png",
				"assets/graph.png",
				"assets/linkedin.png",
				"assets/menolikey.png",
				"assets/music.png",
				"assets/resume.png",
				"assets/pokeball.PNG"];

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
// });