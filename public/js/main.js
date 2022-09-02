/**
 * Creates a div with a class name
 * @param {string} className 
 * @returns div with a classname passed in parameter
 */
function createDivWithClass(className) {
	let div = document.createElement('div')
	div.setAttribute('class', className)
	return div
}

/**
 * Displays menu on click
 */
function menuDisplay() {
	var button = document.getElementById('nav-icon')
	var nav = document.getElementById('nav')
	var background = document.getElementById('nav-background')
	button.classList.toggle('nav-icon-toggled')
	background.classList.toggle('nav-background-toggled')
	nav.classList.toggle('nav-displayed')

	var navList = document.getElementsByClassName("nav-item")
	var delay = 80

	for (let i = 0; i < navList.length; i++) {
		setTimeout(function () {
			navList[i].classList.toggle('nav-item-display')
		}, delay)
		delay += 80
	}
}

/**
 * Makes the header background glide
 */
let header, backgroundPhoto, lFollowX = 0,
	lFollowY = 0,
	x = 0,
	y = 0,
	friction = 1 / 20

function moveBackground() {
	x += (lFollowX - x) * friction
	y += (lFollowY - y) * friction
	translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.2)'
	backgroundPhoto.style.webkitTransform = translate
	backgroundPhoto.style.transform = translate
	window.requestAnimationFrame(moveBackground);
}

/**
 * Makes the experiences glide
 */
let expContent, experiences

function glide() {
	x += (lFollowX - x) * friction
	y += (lFollowY - y) * friction
	translate = 'translate(' + x + 'px, ' + y + 'px)'
	for (let experience of experiences) {
		experience.style.transform = translate
		experience.style.webkitTransform = translate
	}
	window.requestAnimationFrame(glide);
}

/**
 * DOM loading
 */
window.addEventListener('load', function (event) {
	//Overlay
	var overlay = document.getElementById('overlay')
	var helloScroll = document.getElementById('scroll_content')
	overlay.style.opacity = '0'
	overlay.style.zIndex = '0'
	helloScroll.style.opacity = 1
	document.documentElement.style.overflowY = 'visible'
})

/**
 * DOM loaded
 */
document.addEventListener('DOMContentLoaded', function () {
	//Image alt auto
	let imgDirectory = "img"
	images = document.getElementsByTagName('img')
	for (let image of images) {
		let imageSrc = String(image.getAttribute('src'))
		let imageAlt = imageSrc.substring(imageSrc.indexOf(imgDirectory) + imgDirectory.length + 1)
		imageAlt = imageAlt.replace(/\//g, ' ')
		image.setAttribute('alt', imageAlt)
	}

	//Background parallax
	header = document.getElementById('header')
	backgroundPhoto = document.getElementById('background_image')
	header.addEventListener('mousemove', function (e) {
		let lMouseX = Math.max(-100, Math.min(100, header.offsetWidth * 0.5 - e.clientX))
		let lMouseY = Math.max(-100, Math.min(100, header.offsetHeight * 0.5 - e.clientY))
		lFollowX = (30 * lMouseX) / 100
		lFollowY = (30 * lMouseY) / 100
	});
	moveBackground();

	//Articles fade-in
	window.addEventListener('scroll', function () {
		let articles = document.querySelectorAll('.js-appear')
		for (let article of articles) {
			if (article.getBoundingClientRect().y < 600) {
				article.classList.add('article-displayed')
			}
		}
	})

	//About
	let about = document.getElementById('about_content')
	let aboutDesc = document.getElementById('about_description')
	let aboutHeight = about.offsetHeight
	about.addEventListener('mousemove', function (e) {
		let yOffset = 2 - e.pageY / aboutHeight
		let transProp = 'rotateX(' + (-yOffset * 6) + 'deg)'
		aboutDesc.style.transform = transProp
		aboutDesc.style.webkitTransform = transProp
	})

	//Image fullscreen
	let zoomOverlays = document.querySelectorAll('.zoom')
	let modal = document.getElementById('modal')
	let modalImg = document.getElementById('modal-content')
	for (let zoomOverlay of zoomOverlays) {
		zoomOverlay.addEventListener('click', function () {
			modalImg.src = zoomOverlay.children[0].src
			modal.style.display = 'flex'
		})
	}
	modal.onclick = function () {
		modal.style.display = 'none'
	}

	//Projects
	let typewriters = document.querySelectorAll('.typewriter')
	window.addEventListener('scroll', function () {
		for (let typewriter of typewriters) {
			if (typewriter.getBoundingClientRect().y < 600) {
				typewriter.style.animationPlayState = 'running'
			}
		}
	})

	//Skillbars (outdated)
	// let skills = document.querySelector("#skills")
	// let skillsDisplayed = false
	// window.addEventListener('scroll', function () {
	// 	let percents = skills.querySelectorAll(".percent-fill")
	// 	if (skills.getBoundingClientRect().y < 400 && skills.getBoundingClientRect().y > -400) {
	// 		if (!skillsDisplayed) {
	// 			skillsDisplayed = true
	// 			for (let percent of percents)
	// 				percent.style.width = percent.innerHTML + "%"
	// 		}
	// 	}
	// })

	//Timeline Fade-in
	window.addEventListener('scroll', function () {
		let items = document.querySelectorAll('.js-appear-item')
		for (let item of items) {
			if (item.getBoundingClientRect().y < 600 && item.getBoundingClientRect().y > -600) {
				item.style.visibility = 'visible'
				item.style.opacity = '1'
			}
		}
	})

	//Experience
	expContent = document.getElementById('experience_content')
	experiences = expContent.querySelectorAll('.jobExperience')
	expContent.addEventListener('mousemove', function (e) {
		let lMouseX = Math.max(-100, Math.min(100, expContent.offsetWidth * 0.5 - e.clientX))
		let lMouseY = Math.max(-100, Math.min(100, expContent.offsetHeight * 0.5 - e.clientY))
		lFollowX = (20 * lMouseX) / 100
		lFollowY = (20 * lMouseY) / 100
	});
	glide();
})

//JQuery
$(document).ready(function () {
	//Hello
	let maxOpacity = 500
	$.fn.moveIt = function () {
		var $window = $(window)
		var instances = []

		$(this).each(function () {
			instances.push(new moveItem($(this)))
		})

		window.addEventListener('scroll', function () {
			var scrollTop = $window.scrollTop()
			instances.forEach(function (inst) {
				inst.update(scrollTop)
			})
		}, {
			passive: true
		})
	}
	var moveItem = function (el) {
		this.el = $(el)
		this.speed = parseInt(this.el.attr('data-scroll-speed'))
	}
	moveItem.prototype.update = function (scrollTop) {
		this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)')
		if (scrollTop < maxOpacity)
			this.el.css('opacity', 1 - (scrollTop / maxOpacity))
		else
			this.el.css('opacity', 0)
		if (this.el.css('opacity') == 0)
			$('#scroll_content').css('display', 'none')
		else
			$('#scroll_content').css('display', 'fixed')
	}
	$(function () {
		$('[data-scroll-speed]').moveIt()
	})
	//TimeLine hover
	$('.AnnecySwitch').hover(function () {
		$('.Annecy').toggleClass('locationHovered')
	})
	$('.MaconSwitch').hover(function () {
		$('.Macon').toggleClass('locationHovered')
	})
	$('.ParaySwitch').hover(function () {
		$('.Paray').toggleClass('locationHovered')
	})
	// Fade in
	const ratio = 0.9
	const options = {
		root: null,
		rootMargin: '0px',
		threshold: ratio
	}

	const handleIntersectionObserver = function (entries, observer) {
		entries.forEach(entry => {
			if (entry.intersectionRatio > ratio) {
				entry.target.classList.add('visible')
				observer.unobserve(entry.target)
			}
		});
	};
	const observer = new IntersectionObserver(handleIntersectionObserver, options);
	const targets = document.querySelectorAll('.fade-in')
	targets.forEach(target => {
		observer.observe(target)
	})
})