const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navOverlay = document.getElementById('nav-overlay');
const body = document.body;

const toggleNav = (open) => {
	if (!navMenu) {
		return;
	}
	navMenu.classList.toggle('nav__menu--open', open);
	navOverlay?.classList.toggle('active', open);
	body.classList.toggle('no-scroll', open);
};

navToggle?.addEventListener('click', () => toggleNav(true));
navClose?.addEventListener('click', () => toggleNav(false));
navOverlay?.addEventListener('click', () => toggleNav(false));

document.querySelectorAll('.nav__link').forEach((link) => {
	link.addEventListener('click', () => toggleNav(false));
});

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
	const scrollY = window.pageYOffset;
	sections.forEach((section) => {
		const sectionHeight = section.offsetHeight;
		const sectionTop = section.offsetTop - 120;
		const sectionId = section.getAttribute('id');
		const menuLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			menuLink?.classList.add('active-link');
		} else {
			menuLink?.classList.remove('active-link');
		}
	});
};

window.addEventListener('scroll', scrollActive);

const header = document.getElementById('header');
const handleScrollHeader = () => {
	if (!header) {
		return;
	}
	header.classList.toggle('header--scrolled', window.scrollY > 80);
};

window.addEventListener('scroll', handleScrollHeader);

const scrollTopButton = document.getElementById('scroll-top');
const handleScrollTop = () => {
	const shouldShow = window.scrollY > 600;
	scrollTopButton?.classList.toggle('scroll-top--show', shouldShow);
};

window.addEventListener('scroll', handleScrollTop);
scrollTopButton?.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});

const root = document.documentElement;
const THEME_KEY = 'ln-theme';
const applyTheme = (theme) => {
	if (theme === 'dark') {
		root.setAttribute('data-theme', 'dark');
	} else {
		root.removeAttribute('data-theme');
	}
};

const storedTheme = localStorage.getItem(THEME_KEY);
if (storedTheme === 'dark') {
	applyTheme('dark');
}

const themeToggle = document.getElementById('theme-toggle');
themeToggle?.addEventListener('click', () => {
	const isDark = root.getAttribute('data-theme') === 'dark';
	const nextTheme = isDark ? 'light' : 'dark';
	applyTheme(nextTheme);
	if (nextTheme === 'dark') {
		localStorage.setItem(THEME_KEY, 'dark');
	} else {
		localStorage.removeItem(THEME_KEY);
	}
});

const yearEl = document.getElementById('year');
if (yearEl) {
	yearEl.textContent = String(new Date().getFullYear());
}

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
form?.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!formStatus) {
		return;
	}
	formStatus.textContent = 'Danke! Ich melde mich in Kürze.';
	setTimeout(() => {
		formStatus.textContent = '';
	}, 4000);
	form.reset();
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.2 }
);

revealElements.forEach((el) => revealObserver.observe(el));