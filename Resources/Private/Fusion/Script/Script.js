var SitegeistCookieOptIn = function () {
	var socialOptIn = document.getElementById("social-opt-in");
	if (!socialOptIn) return;
	var allOptInLink = document.getElementById("all-opt-in-toggle");
	var statisticOptInLink = document.getElementById("statistic-opt-in-toggle");
	var necessaryOptInLink = document.getElementById("necessary-opt-in-toggle");
	var detailsToggleLink = document.getElementById("social-opt-in__details-toggle");
	var detailsToggleText = document.getElementById("social-opt-in__details-text");
	var imprintOrPrivacyUrl = socialOptIn.getAttribute('data-imprint-privacy-url');

	var getCookie = function (name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		var result = parts.length === 2 ? parts.pop().split(";").shift() : 'false';
		return result ? result : 'false';
	};
	var enableCookie = function (cookieName) {
		document.cookie = cookieName  +'=true; expires=Thu, 31 Dec 2199 23:59:59 GMT; path=/';
	};
	var disableCookie = function (cookieName) {
		document.cookie = cookieName  +'=false; expires=Thu, 01 Jan 1970 00:00:01 GMT; Max-Age=0; path=/';
	};
	var toggleClass = function (socialOptIn, button) {
		socialOptIn === 'true' ? button.classList.add('social-opt-in__button--selected') : button.classList.remove('social-opt-in__button--selected');
	};
	var closeOptIn = function() {
		socialOptIn.classList.remove('social-opt-in--visible');
		location.reload();
		return false;
	};
	function allButton() {
		if (allOptInLink) {
			var statisticOptIn = getCookie('statistic-opt-in');
			var necessaryOptIn = getCookie('necessary-opt-in');
			var marketingOptIn = getCookie('marketing-opt-in');
			var allOptIn = (statisticOptIn === 'true' && necessaryOptIn === 'true' && marketingOptIn === 'true') ? 'true' : 'false';
			toggleClass(allOptIn, allOptInLink);
			allOptInLink.onclick = function () {
				enableCookie('marketing-opt-in');
				enableCookie('necessary-opt-in');
				enableCookie('statistic-opt-in');
				toggleClass('true', allOptInLink);
				toggleClass('true', statisticOptInLink);
				toggleClass('true', necessaryOptInLink);
				return closeOptIn();
			}
		}
	}
	function statisticsButton() {
		if (statisticOptInLink) {
			var statisticOptIn = getCookie('statistic-opt-in');
			toggleClass(statisticOptIn, statisticOptInLink);
			statisticOptInLink.onclick = function () {
				statisticOptIn = getCookie('statistic-opt-in') !== 'true' ? 'true' : 'false';
				enableCookie('statistic-opt-in');
				enableCookie('necessary-opt-in');
				disableCookie('marketing-opt-in');
				toggleClass('false', allOptInLink);
				return closeOptIn();
			}
		}
	}
	function necessaryButton() {
		if (necessaryOptInLink) {
			var necessaryOptIn = getCookie('necessary-opt-in');
			var statisticOptIn = getCookie('statistic-opt-in');
			var marketingOptIn = getCookie('marketing-opt-in');
			toggleClass(necessaryOptIn, necessaryOptInLink);
			necessaryOptInLink.onclick = function () {
				toggleClass('false', allOptInLink);
				toggleClass('false', statisticOptInLink);
				toggleClass('true', necessaryOptInLink);
				enableCookie('necessary-opt-in');
				if (statisticOptIn === 'true') {
					disableCookie('statistic-opt-in');
				}
				if (marketingOptIn === 'true') {
					disableCookie('marketing-opt-in');
				}
				return closeOptIn();
			}
		}
	}
	function detailsToogle() {
		if (detailsToggleLink) {
			detailsToggleLink.onclick = function () {
				detailsToggleText.classList.contains('social-opt-in__details-text--visible') ? detailsToggleText.classList.remove('social-opt-in__details-text--visible') : detailsToggleText.classList.add('social-opt-in__details-text--visible');
				detailsToggleLink.classList.contains('social-opt-in__details-link--visible') ? detailsToggleLink.classList.remove('social-opt-in__details-link--visible') : detailsToggleLink.classList.add('social-opt-in__details-link--visible');
				return false;
			};
		}
	}
	function reloadStateFromCookie() {
		if (imprintOrPrivacyUrl === 'true') {
			return;
		}
		var statisticOptIn = getCookie('statistic-opt-in');
		var necessaryOptIn = getCookie('necessary-opt-in');
		var marketingOptIn = getCookie('marketing-opt-in');
		var allOptIn = (statisticOptIn === 'true' || necessaryOptIn === 'true' || marketingOptIn === 'true') ? 'true' : 'false';
		if (allOptIn !== 'true') {
			socialOptIn.classList.add('social-opt-in--visible');
		}
	}
	function openSettingsOnKeypress() {
		document.addEventListener('keydown', function (event) {
			if (event.code === 'KeyQ' && (event.ctrlKey || event.metaKey)) {
				reloadButtonStateFromCookie();
				socialOptIn.classList.add('social-opt-in--visible');
			}
		});
	}
	function reloadButtonStateFromCookie() {
		var statisticOptIn = getCookie('statistic-opt-in');
		var necessaryOptIn = getCookie('necessary-opt-in');
		var marketingOptIn = getCookie('marketing-opt-in');
		var allOptIn = (statisticOptIn === 'true' && necessaryOptIn === 'true' && marketingOptIn === 'true') ? 'true' : 'false';
		toggleClass(allOptIn, allOptInLink);
		toggleClass(statisticOptIn, statisticOptInLink);
		toggleClass(necessaryOptIn, necessaryOptInLink);
	}

	allButton();
	statisticsButton();
	necessaryButton();
	detailsToogle();
	reloadStateFromCookie();
	openSettingsOnKeypress();
};
new SitegeistCookieOptIn();
