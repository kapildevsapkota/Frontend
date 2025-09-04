function closeAnnouncement() {
  const announcementBar = document.getElementById("announcement-bar")
  const navbar = document.querySelector(".navbar")
  const mobileMenu = document.getElementById("mobile-menu")
  const mainContent = document.querySelector(".main-content")

  announcementBar.classList.add("hidden")

  navbar.classList.add("announcement-closed")

  if (mobileMenu) {
    mobileMenu.classList.add("announcement-closed")
  }

  if (mainContent) {
    mainContent.classList.add("announcement-closed")
  }

  setTimeout(() => {
    announcementBar.style.display = "none"
  }, 300)
}

function showSubmenuHeader(submenuName) {
  const logo = document.getElementById("nav-logo")
  const submenuHeader = document.getElementById("mobile-submenu-header-inline")
  const submenuTitle = document.getElementById("submenu-title")

  if (logo && submenuHeader && submenuTitle) {
    logo.style.display = "none"
    submenuHeader.style.display = "flex"
    const titles = {
      mealtime: "Shop Mealtime",
      playtime: "Shop Playtime",
      bathtime: "Shop Bathtime",
      playboxes: "The Play Boxes",
    }
    submenuTitle.textContent = titles[submenuName] || "Menu"
  }
}

function hideSubmenuHeader() {
  const logo = document.getElementById("nav-logo")
  const submenuHeader = document.getElementById("mobile-submenu-header-inline")

  if (logo && submenuHeader) {
    logo.style.display = "block"
    submenuHeader.style.display = "none"
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("close-announcement")
  if (closeBtn) {
    closeBtn.addEventListener("click", closeAnnouncement)
  }
  const hamburger = document.getElementById("hamburger")
  const mobileMenu = document.getElementById("mobile-menu")
  if (hamburger) {
    hamburger.addEventListener("click", toggleMobileMenu)
  }

  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const submenuTarget = link.dataset.submenu
      if (submenuTarget) {
        e.preventDefault()
        showMobileSubmenu(submenuTarget)
      } else {
        // Close menu for non-submenu items
        if (hamburger && mobileMenu) {
          hamburger.classList.remove("active")
          mobileMenu.classList.remove("active")
          document.body.style.overflow = ""
          hideSubmenuHeader()
        }
      }
    })
  })

  const mobileBackBtns = document.querySelectorAll(".mobile-back-btn")
  mobileBackBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      hideMobileSubmenus()
      showMobileMain()
    })
  })

  const mobileCloseBtns = document.querySelectorAll(".mobile-close-btn")
  mobileCloseBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeMobileMenu()
    })
  })

  const inlineBackBtn = document.querySelector(".mobile-submenu-header-inline .mobile-back-btn")
  const inlineCloseBtn = document.querySelector(".mobile-submenu-header-inline .mobile-close-btn")

  if (inlineBackBtn) {
    inlineBackBtn.addEventListener("click", () => {
      hideMobileSubmenus()
      showMobileMain()
    })
  }

  if (inlineCloseBtn) {
    inlineCloseBtn.addEventListener("click", () => {
      closeMobileMenu()
    })
  }
  document.addEventListener("click", (event) => {
    const hamburger = document.getElementById("hamburger")
    const mobileMenu = document.getElementById("mobile-menu")
    const navbar = document.querySelector(".navbar")

    if (mobileMenu && mobileMenu.classList.contains("active")) {
      if (!navbar.contains(event.target) && !mobileMenu.contains(event.target)) {
        hamburger.classList.remove("active")
        mobileMenu.classList.remove("active")
        document.body.style.overflow = ""
        hideMobileSubmenus()
        showMobileMain()
      }
    }
  })

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      const hamburger = document.getElementById("hamburger")
      const mobileMenu = document.getElementById("mobile-menu")

      if (hamburger && mobileMenu) {
        hamburger.classList.remove("active")
        mobileMenu.classList.remove("active")
        document.body.style.overflow = ""
        hideMobileSubmenus()
        showMobileMain()
      }
    }
  })

  const carousels = document.querySelectorAll(".product-carousel")
  carousels.forEach((carousel) => {
    new ProductCarousel(carousel)
  })

  const megaMenuItems = document.querySelectorAll(".has-megamenu")
  let hoverTimeout

  function hideAllMegaMenus() {
    megaMenuItems.forEach((item) => {
      const megamenu = item.querySelector(".megamenu")
      if (megamenu) {
        megamenu.style.opacity = "0"
        megamenu.style.visibility = "hidden"
        megamenu.style.transform = "translateY(-10px)"
      }
    })
  }

  megaMenuItems.forEach((item) => {
    const megamenu = item.querySelector(".megamenu")

    item.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout)
      hideAllMegaMenus()
      setTimeout(() => {
        megamenu.style.opacity = "1"
        megamenu.style.visibility = "visible"
        megamenu.style.transform = "translateY(0)"
      }, 50)
    })

    item.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        megamenu.style.opacity = "0"
        megamenu.style.visibility = "hidden"
        megamenu.style.transform = "translateY(-10px)"
      }, 100)
    })

    megamenu.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout)
    })

    megamenu.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        megamenu.style.opacity = "0"
        megamenu.style.visibility = "hidden"
        megamenu.style.transform = "translateY(-10px)"
      }, 100)
    })
  })

  document.addEventListener("click", (event) => {
    const navbar = document.querySelector(".navbar")
    if (!navbar.contains(event.target)) {
      hideAllMegaMenus()
    }
  })

  const ageYears = document.querySelectorAll(".age-year")
  ageYears.forEach((year) => {
    year.addEventListener("click", () => {
      ageYears.forEach((y) => y.classList.remove("active"))

      year.classList.add("active")
    })
  })


  new SliderAccordion()

  console.log("Responsive navigation with mega menus and slider accordion loaded successfully")
})

function toggleMobileMenu() {
  const hamburger = document.getElementById("hamburger")
  const mobileMenu = document.getElementById("mobile-menu")
  const body = document.body

  hamburger.classList.toggle("active")
  mobileMenu.classList.toggle("active")

  if (mobileMenu.classList.contains("active")) {
    body.style.overflow = "hidden"
    showMobileMain()
  } else {
    body.style.overflow = ""
    hideMobileSubmenus()
  }
}

function showMobileSubmenu(submenuName) {
  const mainMenu = document.getElementById("mobile-menu-main")
  const submenu = document.getElementById(`mobile-submenu-${submenuName}`)

  if (mainMenu && submenu) {
    mainMenu.classList.add("hidden")
    submenu.classList.add("active")
    showSubmenuHeader(submenuName)
  }
}

function hideMobileSubmenus() {
  const submenus = document.querySelectorAll(".mobile-submenu")
  submenus.forEach((submenu) => {
    submenu.classList.remove("active")
  })
  hideSubmenuHeader()
}

function showMobileMain() {
  const mainMenu = document.getElementById("mobile-menu-main")
  if (mainMenu) {
    mainMenu.classList.remove("hidden")
  }
}

function closeMobileMenu() {
  const hamburger = document.getElementById("hamburger")
  const mobileMenu = document.getElementById("mobile-menu")

  if (hamburger && mobileMenu) {
    hamburger.classList.remove("active")
    mobileMenu.classList.remove("active")
    document.body.style.overflow = ""
    hideMobileSubmenus()
    showMobileMain()
  }
}

class ProductCarousel {
  constructor(carouselElement) {
    this.carousel = carouselElement
    this.track = this.carousel.querySelector(".product-track")
    this.cards = this.track.querySelectorAll(".product-card")
    this.prevBtn = this.carousel.closest(".megamenu-products")
      .querySelector(`[data-carousel="${this.carousel.dataset.carousel}"].prev`)
    this.nextBtn = this.carousel.closest(".megamenu-products")
      .querySelector(`[data-carousel="${this.carousel.dataset.carousel}"].next`)

    this.currentIndex = 0
    this.cardWidth = this.cards[0].offsetWidth + 20
    this.visibleCards = this.getVisibleCards()

    this.init()
  }

  getVisibleCards() {
    const carouselWidth = this.carousel.offsetWidth
    return Math.floor(carouselWidth / this.cardWidth)
  }

  init() {
    this.updateButtons()

    if (this.prevBtn) this.prevBtn.addEventListener("click", () => this.prev())
    if (this.nextBtn) this.nextBtn.addEventListener("click", () => this.next())

    window.addEventListener("resize", () => {
      this.cardWidth = this.cards[0].offsetWidth + 20
      this.visibleCards = this.getVisibleCards()
      this.currentIndex = Math.min(this.currentIndex, this.getMaxIndex())
      this.updateCarousel()
      this.updateButtons()
    })
  }

  getMaxIndex() {
    return Math.max(0, this.cards.length - this.visibleCards)
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--
      this.updateCarousel()
      this.updateButtons()
    }
  }

  next() {
    const maxIndex = this.getMaxIndex()
    if (this.currentIndex < maxIndex) {
      this.currentIndex++
      this.updateCarousel()
      this.updateButtons()
    }
  }

  updateCarousel() {
    const translateX = -this.currentIndex * this.cardWidth
    this.track.style.transform = `translateX(${translateX}px)`
  }

  updateButtons() {
    const maxIndex = this.getMaxIndex()
    if (this.prevBtn) this.prevBtn.disabled = this.currentIndex === 0
    if (this.nextBtn) this.nextBtn.disabled = this.currentIndex >= maxIndex
  }
}


class SliderAccordion {
  constructor() {
    this.currentSlide = 0
    this.slides = document.querySelectorAll(".slide")
    this.accordionItems = document.querySelectorAll(".accordion-item")
    this.autoplayInterval = null
    this.autoplayDelay = 4000
    this.isVisible = false

    this.init()
  }

  init() {
    this.setupIntersectionObserver()

    this.accordionItems.forEach((item, index) => {
      const header = item.querySelector(".accordion-header")
      header.addEventListener("click", () => {
        this.handleAccordionClick(index)
      })
    })
    this.showSlide(0)
    this.showAccordion(0)
  }

  setupIntersectionObserver() {
    const section = document.getElementById("slider-accordion")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.classList.add("visible")
            this.isVisible = true
            this.startAutoplay()
          } else {
            this.isVisible = false
            this.stopAutoplay()
          }
        })
      },
      {
        threshold: 0.3,
      },
    )

    observer.observe(section)
  }

  showSlide(index) {

    this.slides.forEach((slide) => {
      slide.classList.remove("active")
      const video = slide.querySelector("video")
      const iframe = slide.querySelector("iframe")

      if (video) {
        video.pause()
        video.muted = true
      }

      if (iframe) {
        const src = iframe.src
        if (src.includes("autoplay=1")) {
          iframe.src = src.replace("autoplay=1", "autoplay=0")
        }
      }
    })

    const currentSlideElement = this.slides[index]
    currentSlideElement.classList.add("active")

    const video = currentSlideElement.querySelector("video")
    const iframe = currentSlideElement.querySelector("iframe")

    if (video && this.isVisible) {
      video.currentTime = 0
      video.muted = false 
      video.play().catch((e) => {
        console.log("Video autoplay failed:", e)
        video.muted = true
        video.play()
      })
    }

    if (iframe && this.isVisible) {
      const src = iframe.src
      if (src.includes("autoplay=0")) {
        iframe.src = src.replace("autoplay=0", "autoplay=1")
      } else if (!src.includes("autoplay=1")) {
        iframe.src = src + (src.includes("?") ? "&" : "?") + "autoplay=1"
      }
    }

    this.currentSlide = index
  }

  showAccordion(index) {
    this.accordionItems.forEach((item) => {
      item.classList.remove("active")
    })
    this.accordionItems[index].classList.add("active")
  }

  handleAccordionClick(index) {
    const isCurrentlyActive = this.accordionItems[index].classList.contains("active")

    if (isCurrentlyActive) {
      this.accordionItems[index].classList.remove("active")
    } else {
      this.showSlide(index)
      this.showAccordion(index)

      this.stopAutoplay()
      this.startAutoplay()
    }
  }

  nextSlide() {
    const nextIndex = (this.currentSlide + 1) % this.slides.length
    this.showSlide(nextIndex)
    this.showAccordion(nextIndex)
  }

  startAutoplay() {
    if (!this.isVisible) return

    this.stopAutoplay()
    this.autoplayInterval = setInterval(() => {
      if (this.isVisible) {
        this.nextSlide()
      }
    }, this.autoplayDelay)
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval)
      this.autoplayInterval = null
    }
  }
}
