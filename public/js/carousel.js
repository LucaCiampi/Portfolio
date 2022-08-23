class Carousel {

	constructor (element, options = {}) {
		this.element = element
		this.options = Object.assign({}, {
			slidesToScroll: 1,
			slidesVisible: 1,
			loop: false,
			pagination: false
		}, options)
		let children = [].slice.call(element.children)
		this.isMobile = false
		this.currentSlide = 0
		this.moveCallBacks = []

		// DOM
		this.root = createDivWithClass('carousel')
		this.container = createDivWithClass('carousel_container')
		this.root.setAttribute('tabindex', '0')
		this.root.appendChild(this.container)
		this.element.appendChild(this.root)
		this.items = children.map((child) => {
			let item = createDivWithClass('carousel_item')
			item.appendChild(child)
			this.container.appendChild(item)
			return item
		})
		this.setStyle()
		this.createNavigation()
		if (this.options.pagination)
			this.createPagination()


		// Events
		this.moveCallBacks.forEach(cb => cb(0))
		this.onWindowResize()
		window.addEventListener('resize', this.onWindowResize.bind(this))
		this.root.addEventListener('keyup', e => {
			if (e.key === 'ArrowRight' ||  e.key === 'Right')
				this.next()
			else if (e.key === 'ArrowLeft' ||  e.key === 'Left')
				this.prev()
		})
	}

	setStyle (){
		let ratio = this.items.length / this.slidesVisible
		this.container.style.width = (ratio * 100) + '%'
		this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio) + '%')
	}

	createNavigation () {
		let nextButton = createDivWithClass('nextButton')
		let prevButton = createDivWithClass('prevButton')
		this.root.appendChild(nextButton)
		this.root.appendChild(prevButton)
		nextButton.addEventListener('click', this.next.bind(this))
		prevButton.addEventListener('click', this.prev.bind(this))

		if (this.options.loop === true)
			return

		this.onMove(index => {
			if (index === 0) {
				prevButton.style.opacity = '0'
				prevButton.style.cursor = 'auto'
			}
			else
				prevButton.style.opacity = '1'
			if (this.items[this.currentSlide + this.slidesVisible] === undefined) {
				nextButton.style.opacity = '0'
				nextButton.style.cursor = 'auto'
			}
			else
				nextButton.style.opacity = '1'
		})	
	}

	createPagination () {
		let pagination = createDivWithClass('carousel_pagination')
		let buttons = []
		this.root.appendChild(pagination)
		for (let i = 0; i < this.items.length; i = i + this.options.slidesToScroll)	{
			let button = createDivWithClass('carousel_pagination_button')
			button.addEventListener('click', () => this.goToSlide(i))
			pagination.appendChild(button)
			buttons.push(button)
		}

		this.onMove (index => {
			let activeButton = buttons[Math.floor(index / this.options.slidesToScroll)]
			if (activeButton) {
				buttons.forEach(button => button.classList.remove('carousel_pagination_button-active'))
				activeButton.classList.add('carousel_pagination_button-active')
			}
		})
	}

	next () {
		this.goToSlide(this.currentSlide + this.slidesToScroll)
	}

	prev () {
		this.goToSlide(this.currentSlide - this.slidesToScroll)
	}

	goToSlide (index) {
		if (index < 0) {
			if(this.options.loop)
				index = this.items.length - this.slidesVisible
			else
				return
		}

		else if (index >= this.items.length || (this.items[this.currentSlide + this.slidesVisible] === undefined && index > this.currentSlide)) {
			if (this.options.loop)
				index = 0
			else
				return
		}
		let translateX = index * -100 / this.items.length
		this.container.style.transform = 'translate3d(' + translateX +'%, 0, 0) '
		this.currentSlide = index
		this.moveCallBacks.forEach (cb => cb(index))
	}

	onMove (cb) {
		this.moveCallBacks.push(cb)
	}

	onWindowResize () {
		let mobile = window.innerWidth < 1200
		if (mobile !== this.isMobile) {
			this.isMobile = mobile
			this.setStyle()
			this.moveCallBacks.forEach(cb => cb(this.currentSlide))	
		}
	}

	get slidesToScroll () { return this.isMobile ? 1 : this.options.slidesToScroll }

	get slidesVisible () { return this.isMobile ? 1 : this.options.slidesVisible }
}

document.addEventListener("DOMContentLoaded", function() {
	new Carousel(document.querySelector('#AnnecyAnimation'), {
		slidesToScroll: 1,
		slidesVisible: 1,
		pagination: true
	})
})