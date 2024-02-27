document.addEventListener('DOMContentLoaded', function () {
    const navbarToggle = document.getElementById('navbarToggle');
    const iconBars = navbarToggle.querySelectorAll('.icon-bar');

    navbarToggle.addEventListener('click', function () {
        this.classList.toggle('collapsed');

        const isMenuOpen = this.classList.contains('collapsed');

        // Toggle the styles for the 'collapsed' class dynamically
        if (isMenuOpen) {
            resetStyles();
        } else {
            setCrossStyles();
        }
    });

    // Close the menu when clicking on a menu item
    const menuItems = document.querySelectorAll('.navbar-nav .nav-link');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            navbarToggle.classList.remove('collapsed');
            setCrossStyles();
        });
    });

    function setCrossStyles() {
        iconBars[0].style.transform = 'rotate(-45deg) translate(-4px, 4px)';
        iconBars[1].style.opacity = '0';
        iconBars[2].style.transform = 'rotate(45deg) translate(-4px, -4px)';
    }

    function resetStyles() {
        iconBars[0].style.transform = '';
        iconBars[1].style.opacity = '';
        iconBars[2].style.transform = '';
    }
});

// Get the current URL
const url = window.location.href;

// Get all the menu links
const links = document.querySelectorAll('#navbarmain .nav-link');

// Loop through the links and remove the active class from all links
for (let i = 0; i < links.length; i++) {
  links[i].classList.remove('active');
}

// Loop through the links again + add the active class to the link which corresponding to the current web page
for (let i = 0; i < links.length; i++) {
  if (links[i].href === url) {
    links[i].classList.add('active');
    break;
  }
}

(function ($) {
	'use strict';

	// navbarDropdown
	if (window.innerWidth < 992) {
		$('.navigation .dropdown-toggle').on('click', function () {
			$(this).siblings('.dropdown-menu').animate({
				height: 'toggle'
			}, 300);
		});
  }

// Shuffle.js Filter
	if ($('.shuffle-wrapper').length !== 0) {
		let Shuffle = window.Shuffle;
		let jQuery = window.jQuery;

		let myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
			itemSelector: '.shuffle-item',
			buffer: 1
		});
		jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
			let input = evt.currentTarget;
			if (input.checked) {
				myShuffle.filter(input.value);
			}
		});
	}

})(jQuery);

// Handle Gtranslate scrolly
window.addEventListener('scroll', function() {
  let translateWrapper = document.querySelector('.gtranslate_wrapper');
  if (window.scrollY > 50) { 
    translateWrapper.style.display = 'none';
  } else {
    translateWrapper.style.display = 'block';
  }
});

// Function to submit form
function submitForm() {
  var form = document.getElementById("contact-form");
  var formData = new FormData(form);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      var successMessage = document.querySelector(".contact__msg");
      if (successMessage && data.includes("Your form submission has been received.")) {
        successMessage.style.display = "block";
      } else {
        console.error("Error submitting form");
      }
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
    });
}

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();
  submitForm();
});
