$(document).ready(function() {	
	
	$('#preloader').fadeOut(300, function(){ $('#preloader').hide(); });
	$(window).on('load', function(){
		$('#preloader').fadeOut(200, function(){ $('#preloader').hide(); });
	});
	let lAV = '.ar-wa-discover';	
	let searchDebounceTimer;
	function stopFeaturedAppsSwiper() {
		if ($('.featured-apps-slider').length) {
			featuredAppsSwiper.autoplay.stop();
		}
	}
	function sCLaLC(viewNavClass, contentType) {
		$('.ar-wa-view-nav-item').removeClass('ar-wa-view-nav-item-active');
		$('.ar-wa-view-nav-item.' + viewNavClass).addClass('ar-wa-view-nav-item-active');
		$('.ar-wa-discover, .ar-wa-games, .ar-wa-apps').hide();
		$('.' + contentType).html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>').show();
		lC(contentType.replace('ar-wa-', ''), '.' + contentType);
	}
	$('.stw-view-all').on('click', function() {
		stopFeaturedAppsSwiper();
		const viewMapping = {
			'stw-view-all-apps': {
				viewNavClass: 'nav-apps',
				contentType: 'ar-wa-apps'
			},
			'stw-view-all-games': {
				viewNavClass: 'nav-games',
				contentType: 'ar-wa-games'
			}
		};
		for (const className in viewMapping) {
			if ($(this).hasClass(className)) {
				const { viewNavClass, contentType } = viewMapping[className];
				sCLaLC(viewNavClass, contentType);
				break;
			}
		}
	});
	$('.ar-wa-view-nav-item').on('click', function() {
		if ($(this).hasClass('ar-wa-view-nav-item-active')) {
			return;
		}
		if ($('#cloned-appdet-c-top').length) {
			$('#cloned-appdet-c-top').remove();
		}
        $('.ar-wa-view-nav-item').removeClass('ar-wa-view-nav-item-active');
        $(this).addClass('ar-wa-view-nav-item-active');
        let vtS = '';
        $('.ar-wa-discover, .ar-wa-games, .ar-wa-apps').hide();
        if ($(this).hasClass('nav-discover')) {
			vtS = '.ar-wa-discover';
			$('.ar-wa-discover').show();
			if($('.featured-apps-slider').length){
				featuredAppsSwiper.update();
				featuredAppsSwiper.autoplay.start();
			}            
        } else if ($(this).hasClass('nav-games')) {
			vtS = '.ar-wa-games';
			stopFeaturedAppsSwiper();	
            $('.ar-wa-games').html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>').show();
            lC('games', '.ar-wa-games');
        } else if ($(this).hasClass('nav-apps')) {
			vtS = '.ar-wa-apps';
			stopFeaturedAppsSwiper();
            $('.ar-wa-apps').html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>').show();        
            lC('apps', '.ar-wa-apps');
        }
        if (vtS) {
            lAV = vtS;
            $('.ar-wa-discover, .ar-wa-games, .ar-wa-apps, .ar-wa-search, .ar-wa-det').hide();
            $(vtS).show();
        }
    });
	function triggerSearchNow(q) {
		clearTimeout(searchDebounceTimer);
		let sQ = (q !== undefined ? q : $('#search-input').val()).trim();
		if (sQ.length > 0) {
			stopFeaturedAppsSwiper();
			$('.ar-wa-discover, .ar-wa-games, .ar-wa-apps, .ar-wa-det').hide();
			$('.ar-wa-search').show();
			$('#search-query').text(sQ);
			$('#search-results').html('<div class="content-loader-w"><div class="ball-scale-multiple"><div></div><div></div><div></div></div></div>');
			pfS(sQ);
		} else {
			$('.ar-wa-search').hide();
			$('.ar-wa-det').empty().hide();
			if ($('#cloned-appdet-c-top').length) {
				$('#cloned-appdet-c-top').remove();
			}
			$(lAV).show();
			if($('.featured-apps-slider').length) {
				featuredAppsSwiper.update();
				featuredAppsSwiper.autoplay.start();
			}
		}
	}

	$('#search-input').on('input', function() {
		clearTimeout(searchDebounceTimer);
		let sQ = $(this).val().trim();
		if (sQ.length > 0) {
			searchDebounceTimer = setTimeout(function() {
				triggerSearchNow(sQ);
			}, 120);
		} else {
			triggerSearchNow('');
		}
	});

	$('#search-input').on('keydown', function(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			triggerSearchNow();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			$('#close-search').trigger('click');
		}
	});
    $('#close-search').on('click', function() {
        $('#search-input').val('');
		$('#search-query').text('');
        $('.ar-wa-search').hide();
		$('.ar-wa-det').empty().hide();
		if ($('#cloned-appdet-c-top').length) {
			$('#cloned-appdet-c-top').remove();
		}
        $(lAV).show();
		if($('.featured-apps-slider').length) {
			featuredAppsSwiper.update();
			featuredAppsSwiper.autoplay.start();
		}
    });
    function lC(category, container) {
        $.ajax({
            url: 'includes/' + category + '.html',
            type: 'GET',
            success: function(response) {
                if(response.trim() === '' || response.includes('No category specified')) {
					$(container).html('<div class="empty-content">No ' + category + ' found</div>');
				} else {
					$(container).html(response).show();
					$(container).append('<div class="lc-spacer"></div>');
				}
            },
            error: function(xhr, status, error) {
                console.error("AJAX Error: ", xhr.responseText);
				$(container).html('<div class="error-message">Error loading content</div>');
            }
        });
    }
	if($('.featured-apps-slider').length){
		var featuredAppsSwiper = new Swiper('.featured-apps-slider', {
			loop: true,
			autoplay: {
				delay: 2500,
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			},
			speed: 500,
			slidesPerView: 2,
			centeredSlides: true,
			spaceBetween: 30,
			pauseOnMouseEnter: true,
			 breakpoints: {
				1024: {
					slidesPerView: 2,
					spaceBetween: 30
				},
				320: {
					slidesPerView: 1,
					spaceBetween: 10
				}
			  }
		});
	}
	function scrollToTop() {
		$('html, body').animate({
			scrollTop: 0
		}, 200);
	}
	$c_s_m = ".proccessing-msg";
	let iAL = false;
	$(document).on('click', '.lit', function(){
		if (iAL) {
			console.log("Please wait.");
			return;
		}
		var appid = $(this).data('appid');
		if (appid) {
			iAL = true;
			if ($('#cloned-appdet-c-top').length) {
				$('#cloned-appdet-c-top').remove();
			}
			scrollToTop();
			$.ajax({
				url: 'includes/data/app_' + appid + '.json',
				type: 'GET',
				dataType: 'json',
				success: function(data) {
					if (data.error) {
						console.log("Error from server: ", data.error);
					} else {
						dAD(data);
						$('.ar-wa-discover, .ar-wa-games, .ar-wa-apps, .ar-wa-search').hide(); // Hide other views
						$('.ar-wa-det').empty().show();						
					}
					iAL = false;
				},
				error: function(xhr, status, error) {
					console.log("AJAX Error: ", xhr.responseText);
					iAL = false;
				}
			});
		} else {
			console.log("App Error");
		}
	});
	function decodeHtml(html) {
		var txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	}
	function dAD(appData) {
		gS( "psf_1", function(src) {
		let r = Math.random().toString(36).substring(7);
		$('.ar-wa-det').append('<div id="h'+r+'" class="animated slideInUp anifa"></div>');
		let app_img_src = appData.app_img_src;
		let app_bg_img_src = appData.app_bg_img_src;
		let app_name = appData.app_name;
		let app_shortname = appData.app_name;
		let app_author = appData.app_author || '';
		let app_rating = appData.app_rating || '';
		let app_size = appData.app_size || '';
		let app_description = appData.app_description || '';
		let app_downloads = appData.app_downloads || '';
		let app_platforms = appData.app_os;
		let app_badge = appData.app_badge;
		let app_duration = appData.app_duration;
		let app_category = appData.app_category;
		let app_category_l = appData.category_label;
		let app_locker_url = decodeHtml(appData.app_locker_url);
		let app_locker_url_ios = decodeHtml(appData.app_locker_url_ios);
		
		$( '#h'+r ).html(src);
		if (app_bg_img_src) {
            $('.appdet-container-bg', '#h' + r).css('background-image', 'url(' + app_bg_img_src + ')');
        } else {
            $('.appdet-container-bg', '#h' + r).css('background-image', 'url(' + app_img_src + ')').addClass('bg-blur');
        }
		$('.appdet-icon', '#h'+r).attr('src', app_img_src);
		if(app_badge) {
			$('.appdet-badge').html('<div class="appdet-badge-b">'+app_badge+'</div>');
		}
		if(app_author) {
			$('.appdet-c-meta-val-author').text(app_author);
		}
		if(app_downloads) {
			$('.appdet-c-meta-val-downloads').text(app_downloads);
		}
		if(app_size) {
			$('.appdet-c-meta-val-size').text(app_size);
		}
		if(app_rating) {
			let formattedRating = parseFloat(app_rating).toFixed(1);
			$('.appdet-c-meta-val-rating').text(formattedRating);
		}
		$('.appdet-c-meta-val-os').html(buildPlatformHTML(app_platforms));
		$('.appdet-c-meta-category-icon').html(buildCatHtml(app_category));
		$('.appdet-name').text(app_name);
		$('.appdet-c-meta-val-category').text(app_category_l);
		$('.appdet-description').html(decodeHtml(app_description));
		let app_slug = app_name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'app';
		if (app_name.indexOf('تطعيس') !== -1) app_slug = 'king-of-steering-desert-drifting';
		if (app_name.indexOf('الطاره') !== -1) app_slug = 'king-of-the-wheel-malik-al-tara';
		$('#app-permalink', '#h'+r).attr('href', 'products/' + app_slug + '.html');
		$('#s-ex').on('click', function() {
			$( '#h'+r ).removeClass('animated slideInUp');
			$( '#h'+r ).addClass('animated slideOutDown anifav');	
			if ($('#cloned-appdet-c-top').length) {
				$('#cloned-appdet-c-top').remove();
			}	
			$( '#h'+r ).on("animationend", function(){
				$( '#h'+r ).remove();
				$('.ar-wa-det').hide();
				$(lAV).show();
				if($('.featured-apps-slider').length) {
					featuredAppsSwiper.update();
					featuredAppsSwiper.autoplay.start();
				}
			});
		});
		if (typeof iMO !== 'undefined' && iMO) {
			const appTop = $('.appdet-c-top');
			if (appTop.length) {
				clonedAppTop = appTop.clone().attr('id', 'cloned-appdet-c-top').css('display', 'none');
				$('body').prepend(clonedAppTop);
			}
			$(window).scroll(function() {
			const header = $('.ar-wa-header');
			const headerHeight = header.outerHeight();
			const scrollPosition = $(this).scrollTop();
			if (scrollPosition > 0 && !header.hasClass('sticky-header')) {
				header.addClass('sticky-header');
			} else if (scrollPosition <= 0 && header.hasClass('sticky-header')) {
				header.removeClass('sticky-header');
			}
			if (appTop.length && scrollPosition >= appTop.offset().top - headerHeight) {
				clonedAppTop.show().addClass('sticky-app-top').css({
					'top': headerHeight + 'px',
					'position': 'fixed',
					'z-index': '5000'
				});
			} else {
				clonedAppTop.hide().removeClass('sticky-app-top');
			}
			});		
		}
		let secDuration = app_duration;
		let totalDuration = secDuration * 1000;
		let actionsTriggered = {};
		let rUr;
		$(document).on('click', '#sp-sb', function(){
			if ($('#cloned-appdet-c-top').length) {
				$('#cloned-appdet-c-top').remove();
			}
			if ($('.mobile-menu').length) {	
				$('.mobile-menu').addClass('hidden').remove();
			}
			$('.ar-wa-view-nav-item').addClass('inactive-nav');
			$('#search-input').prop('disabled', true).css('opacity', '0.7');
			$('#s-ex').remove();
			rUr = decodeHtml(appData.is_ios && appData.app_locker_url_ios ? appData.app_locker_url_ios : appData.app_locker_url);
			$('#sp-sb').fadeOut( 100, function() {
				gS("psf_2", function(src) {
					$('#h' + r).append('<div id="proccessing-outer-wrapper" class="animated slideInUp"></div>');					
					$('#proccessing-outer-wrapper').html(src).hide().fadeIn();
					if (typeof iMO !== 'undefined' && !iMO) {
						aO($('.proccessing-wrapper'), 'bounceIn animation-delay-400');
					} else {
						$.magnificPopup.open({
							items: {
								src: '#proccessing-outer-wrapper',
							},
							type: 'inline',
							preloader: false,
							mainClass: 'anifa2',
							modal: true,
							fixedContentPos: true,
							fixedBgPos: true,
							callbacks: {
								open: function() {
									
								}
							}
						});	
					}
					const appTopP = $('.appdet-c-top');
					const appTopR = $('.appdet-c-meta-col-c-rating');
					const appTopD = $('.appdet-c-meta-col-c-downloads');
					if (appTopP.length) {
						clonedAppTopP = appTopP.clone().attr('id', 'cloned-appdet-c-top').addClass('cloned-appdet-c-top-p');
						$('.proccessing-header').prepend(clonedAppTopP);
					}
					if (appTopR.length) {
						clonedAppTopR = appTopR.clone().attr('id', 'cloned-appdet-c-meta-col-c-rating').addClass('cloned-appdet-c-meta-col-c-rating-p');
						$('.cloned-appdet-c-top-p .appdet-badge-w').append(clonedAppTopR);
					}
					if (appTopD.length) {
						clonedAppTopD = appTopD.clone().attr('id', 'cloned-appdet-c-meta-col-c-downloads').addClass('cloned-appdet-c-meta-col-c-downloads-p');
						$('.cloned-appdet-c-top-p .appdet-badge-w').append(clonedAppTopD);
					}
					$('.p-title').text($console_title_string_1);
					if(app_size) {
						$('.p-size').text(app_size);
					}
					aP(totalDuration);
				});
			});
		});
		function aP(duration) {
			let startTime = Date.now();
			let interval = 100;
			let intervalId = setInterval(function() {
				let elapsed = Date.now() - startTime;
				let progress = elapsed / duration;
				let percentage = easeInOut(progress) * 100;
				let roundedPercentage = Math.min(Math.round(percentage), 100);
				uCO(roundedPercentage);
				$('.p-percentage').text(roundedPercentage + '%');
				if (elapsed >= duration) {
					clearInterval(intervalId);
					cPRC();
				}
			}, interval);
		}
		function uCO(percentage) {
			$console_msg_string_1 = $console_msg_string_1.replace(/\[appname\]/g, app_name);
			$console_msg_string_2 = $console_msg_string_2.replace(/\[appname\]/g, app_name);
			$console_msg_string_3 = $console_msg_string_3.replace(/\[appname\]/g, app_name);
			$console_msg_string_4 = $console_msg_string_4.replace(/\[appname\]/g, app_name);
			$console_msg_string_5 = $console_msg_string_5.replace(/\[appname\]/g, app_name);
			if (percentage >= 0 && !actionsTriggered[0]) {
				sCM($console_msg_string_1, 0);
				actionsTriggered[0] = true;
			}
			if (percentage >= 25 && !actionsTriggered[25]) {
				sCM($console_msg_string_2, 1);
				actionsTriggered[25] = true;
			}
			if (percentage >= 55 && !actionsTriggered[55]) {
				sCM($console_msg_string_3, 1);
				actionsTriggered[55] = true;
			}
			if (percentage >= 75 && !actionsTriggered[75]) {
				sCM($console_msg_string_4, 0);
				actionsTriggered[75] = true;
			}
			if (percentage >= 90 && !actionsTriggered[90]) {
				sCM($console_msg_string_5, 0);
				actionsTriggered[90] = true;
			}
			if (percentage >= 100 && !actionsTriggered[100]) {
				cPRC();
				actionsTriggered[100] = true;
			}
		}
		function sCM(message, gn) {
			$($c_s_m).html(message);
			aO($($c_s_m), 'bounceIn');
			if (gn === 1) {
				$('.c-n').html(app_name);
			}
		}
		function cPRC() {
			$('h3.proccessing-title').text($console_title_string_2); 
			var lockerTarget = 'ContentLoker/index.html?app=' + encodeURIComponent(app_name) + '&size=' + encodeURIComponent(app_size || '') + '&icon=' + encodeURIComponent(app_img_src || '');
			window.location.href = lockerTarget;
		}
		function easeInOut(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		}
		function buildPlatformHTML(platform) {
			let html = '<div class="app-step-pr">';
			if(platform === 'androidios') {
				html += '<i class="fab fa-android imr"></i><i class="fab fa-apple"></i>';
			} else if(platform === 'android') {
				html += '<i class="fab fa-android"></i>';
			} else if(platform === 'ios') {
				html += '<i class="fab fa-apple"></i>';
			}
			html += '</div>';
			return html;
		}
		function buildCatHtml(cat) {
			let html = '<div class="app-cat-icon-w">';
			if(cat === 'games') {
				html += '<img src="assets/img/icons/icon-games.svg" class="img-fluid appdet-meta-icon">';
			} else if(cat === 'apps') {
				html += '<img src="assets/img/icons/icon-apps.svg" class="img-fluid appdet-meta-icon">';
			}
			html += '</div>';
			return html;
		}
		});
	}
	function gS(step, onStep) {
		fetch('includes/psf/' + step + '.html', {
			method: 'GET',
			headers: {
				"X-Requested-With": 'XMLHttpRequest'
			}
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.text();
		})
		.then(data => {
			onStep && onStep(data);
		})
		.catch(error => {
			console.error('There has been a problem with your fetch operation:', error);
		});
	}
	function aO(el, anim, onDone) {
		var $el = $(el);
		$el.addClass( 'animated ' + anim );
		$el.one( 'animationend', function() {
			$(this).removeClass( 'animated ' + anim );
			onDone && onDone();
		});
	}
	if (typeof iMO !== 'undefined' && iMO) {
		$(window).scroll(function() {
			const scrollPosition = $(this).scrollTop();
			const header = $('.ar-wa-header');
			const offset = 0;
			if (scrollPosition > offset && !header.hasClass('sticky-header')) {
				header.addClass('sticky-header');
			} else if (scrollPosition <= offset && header.hasClass('sticky-header')) {
				header.removeClass('sticky-header');
			}
		});		
		let lastScrollTop = 0;
		window.addEventListener("scroll", function () {
			const st = window.pageYOffset || document.documentElement.scrollTop;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;
			if (st + windowHeight >= documentHeight) {
				document.querySelector('.mobile-menu').classList.remove('hidden');
			} else if (st > lastScrollTop) {
				document.querySelector('.mobile-menu').classList.add('hidden');
			} else {
				document.querySelector('.mobile-menu').classList.remove('hidden');
			}
			lastScrollTop = st <= 0 ? 0 : st;
		});
	}
	if (typeof iMO !== 'undefined' && !iMO) {
		if( $('.ar-wa-view-nav').length ) {
			$('.ar-wa-view-nav').sticky({
				'offset' : 10,
				'mode'   : 'fixed'
			});
		}
	}

	try {
		var urlParams = new URLSearchParams(window.location.search);
		var initialQuery = urlParams.get('s') || urlParams.get('search') || urlParams.get('q');
		if (initialQuery) {
			$('#search-input').val(initialQuery);
			triggerSearchNow(initialQuery);
		}
	} catch(e) {}
});
var _cachedAppsData = null;
function getAppsCache(cb) {
    if (_cachedAppsData) {
        cb(_cachedAppsData);
        return;
    }
    $.getJSON('includes/data/apps.json', function(data) {
        _cachedAppsData = data;
        cb(_cachedAppsData);
    }).fail(function() {
        cb({});
    });
}

function normalizeSearchText(str) {
    if (!str) return '';
    return str.toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\u064B-\u065F\u0670]/g, '')
        .replace(/[إأآٱ]/g, 'ا')
        .replace(/ة/g, 'ه')
        .replace(/ى/g, 'ي')
        .replace(/[^a-z0-9\u0600-\u06FF\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function calcLevenshtein(a, b) {
    if (a === b) return 0;
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    if (Math.abs(a.length - b.length) > 3) return 99;

    var matrix = [];
    for (var i = 0; i <= b.length; i++) matrix[i] = [i];
    for (var j = 0; j <= a.length; j++) matrix[0][j] = j;

    for (var i = 1; i <= b.length; i++) {
        for (var j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}

var SEARCH_ALIASES_RAW = {
    'gta': 'grand theft auto vi',
    'gta6': 'grand theft auto vi',
    'gta 6': 'grand theft auto vi',
    'gtav': 'grand theft auto vi',
    'gta v': 'grand theft auto vi',
    'gta 5': 'grand theft auto vi',
    'fifa': 'fc mobile 2026',
    'fifa26': 'fc mobile 2026',
    'fifa 26': 'fc mobile 2026',
    'fifa mobile': 'fc mobile 2026',
    'fcmobile': 'fc mobile 2026',
    'fc mobile': 'fc mobile 2026',
    'pes': 'efootball 2027',
    'pes27': 'efootball 2027',
    'pes 2027': 'efootball 2027',
    'pes mobile': 'efootball 2027',
    'efootbal': 'efootball 2027',
    'pubg': 'pubg mobile',
    'pubgm': 'pubg mobile',
    'bgmi': 'pubg mobile',
    'ff': 'free fire',
    'freefire': 'free fire',
    'cod': 'call of duty: mobile',
    'codm': 'call of duty: mobile',
    'call of duty': 'call of duty: mobile',
    'ml': 'mobile legends: bang bang',
    'mlbb': 'mobile legends: bang bang',
    'dls': 'dream league soccer 2026',
    'dls26': 'dream league soccer 2026',
    'dls 2026': 'dream league soccer 2026',
    'cpm': 'car parking multiplayer 2',
    'cpm2': 'car parking multiplayer 2',
    'car parking': 'car parking multiplayer',
    'ets': 'euro truck simulator 2 mobile',
    'ets2': 'euro truck simulator 2 mobile',
    'truck simulator': 'truck simulator : ultimate',
    'cr': 'clash royale',
    'bs': 'brawl stars',
    'subway': 'subway surfers',
    'subwaysurfers': 'subway surfers',
    'coin': 'coin master',
    'king of steering': 'كنق التطعيس',
    'desert drifting': 'كنق التطعيس',
    'hajwala': 'كنق التطعيس',
    'tataees': 'كنق التطعيس',
    'king of wheel': 'ملك الطاره',
    'king of steering wheel': 'ملك الطاره',
    'malik al tara': 'ملك الطاره',
    'tara': 'ملك الطاره',
    'shahid': 'شاهد shahid vip',
    '8ball': '8 ball pool',
    'pool': '8 ball pool',
    'eight ball': '8 ball pool',
    'beamng': 'beamng drive mobile',
    'valorant': 'valorant mobile',
    'valo': 'valorant mobile',
    'monopoly': 'monopoly go'
};

var SEARCH_ALIASES = {};
Object.keys(SEARCH_ALIASES_RAW).forEach(function(k) {
    SEARCH_ALIASES[normalizeSearchText(k)] = normalizeSearchText(SEARCH_ALIASES_RAW[k]);
});

function pfS(query) {
    getAppsCache(function(apps) {
        var rawQ = (query || '').trim();
        if (!rawQ) {
            $('#search-results').empty();
            return;
        }

        var normQ = normalizeSearchText(rawQ);
        var compactQ = normQ.replace(/\s+/g, '');
        var tokens = normQ.split(' ').filter(Boolean);
        var aliasTarget = SEARCH_ALIASES[normQ] || SEARCH_ALIASES[compactQ] || null;

        var scored = [];

        Object.values(apps).forEach(function(app) {
            var rawName = app.app_name || '';
            var normName = normalizeSearchText(rawName);
            var compactName = normName.replace(/\s+/g, '');
            var normAuthor = normalizeSearchText(app.app_author || '');
            var normDesc = normalizeSearchText(app.app_description || '');
            var words = normName.split(' ').filter(Boolean);

            var score = 0;

            // 1. Exact match on title
            if (normName === normQ || compactName === compactQ) {
                score = Math.max(score, 1000);
            }
            // 2. Prefix match on title
            else if (normName.startsWith(normQ)) {
                score = Math.max(score, 600 - (normName.length - normQ.length));
            }
            else if (compactName.startsWith(compactQ)) {
                score = Math.max(score, 550 - (compactName.length - compactQ.length));
            }

            // 3. Alias match
            if (aliasTarget) {
                if (normName === aliasTarget || compactName === aliasTarget.replace(/\s+/g, '')) {
                    score = Math.max(score, 520);
                } else if (normName.includes(aliasTarget) || aliasTarget.includes(normName)) {
                    score = Math.max(score, 480);
                }
            }

            // 4. Any word in title starts with query
            for (var i = 0; i < words.length; i++) {
                var w = words[i];
                if (w.startsWith(normQ)) {
                    score = Math.max(score, 380 - (w.length - normQ.length));
                    break;
                }
            }

            // 5. Title contains query substring
            if (normName.includes(normQ)) {
                score = Math.max(score, 300);
            } else if (compactName.includes(compactQ) && compactQ.length >= 3) {
                score = Math.max(score, 280);
            }

            // 6. Multi-token match (all query tokens found anywhere in title)
            if (tokens.length > 1) {
                var allInTitle = tokens.every(function(t) { return normName.includes(t); });
                if (allInTitle) {
                    score = Math.max(score, 260);
                }
            }

            // 7. Author or description match (only for query length >= 3)
            if (normQ.length >= 3) {
                if (normAuthor.includes(normQ)) {
                    score = Math.max(score, 90);
                } else if (normDesc.includes(normQ)) {
                    score = Math.max(score, 60);
                }
            }

            // 8. Fuzzy / Misspelling match (only for words of length >= 4)
            if (score === 0 && normQ.length >= 4) {
                // Whole query vs whole title
                var fullDist = calcLevenshtein(normQ, normName);
                if (fullDist <= 1) {
                    score = Math.max(score, 200);
                } else if (fullDist <= 2 && normQ.length >= 6) {
                    score = Math.max(score, 170);
                }

                // Sub-slice distance against title
                for (var j = 0; j <= normName.length - normQ.length; j++) {
                    var sub = normName.slice(j, j + normQ.length);
                    if (calcLevenshtein(normQ, sub) <= 1) {
                        score = Math.max(score, 160);
                        break;
                    }
                }

                // Word-by-word typo check
                for (var ti = 0; ti < tokens.length; ti++) {
                    var qToken = tokens[ti];
                    if (qToken.length >= 4) {
                        for (var wi = 0; wi < words.length; wi++) {
                            var targetW = words[wi];
                            if (targetW.length >= 4) {
                                var d = calcLevenshtein(qToken, targetW);
                                if (d === 1) {
                                    score = Math.max(score, 150);
                                    break;
                                } else if (d === 2 && qToken.length >= 6 && targetW.length >= 6) {
                                    score = Math.max(score, 120);
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            if (score > 0) {
                scored.push({ app: app, score: score });
            }
        });

        scored.sort(function(a, b) { return b.score - a.score; });
        var matches = scored.map(function(s) { return s.app; });

        if (matches.length === 0) {
            $('#search-results').html("<div class='empty-content empty-content-search'><img src='assets/img/icons/icon-flash-slash.svg' class='img-fluid empty-content-icon' alt='No results found' /><span>No results found</span></div>");
        } else {
            var html = '';
            matches.forEach(function(a) {
                var badge = a.app_badge ? '<div class="listing-item-badge-w"><span>' + a.app_badge + '</span></div>' : '';
                html += '<div class="listing-item-wrapper">' +
                    '<div class="listing-item lit lit-t" data-appid="' + a.id + '">' +
                        '<div class="listing-item-left">' +
                            '<img src="' + a.app_img_src + '" class="img-fluid listing-item-img liti" alt="' + a.app_name + ' Logo"/>' +
                            badge +
                        '</div>' +
                        '<div class="listing-item-right">' +
                            '<div class="listing-item-name-w">' +
                                '<div class="listing-item-name litn">' + a.app_name + '</div>' +
                            '</div>' +
                            '<div class="listing-item-meta-w">' +
                                '<div class="listing-item-meta-col">' +
                                    '<div class="listing-item-meta-col-c">' +
                                        '<img src="assets/img/icons/icon-download1.svg" class="img-fluid listing-item-meta-icon" alt="Download count" />' +
                                        '<div class="listing-item-meta-label-w">' +
                                            '<span class="listing-item-meta-label">Size:</span>' +
                                            '<span class="listing-item-meta-val">' + (a.app_size || 'N/A') + '</span>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="listing-item-meta-col">' +
                                    '<div class="listing-item-meta-col-c">' +
                                        '<img src="assets/img/icons/icon-star.svg" class="img-fluid listing-item-meta-icon" alt="Rating" />' +
                                        '<div class="listing-item-meta-label-w">' +
                                            '<span class="listing-item-meta-label">Rating:</span>' +
                                            '<span class="listing-item-meta-val">' + (a.app_rating || '5.0') + '</span>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';
            });
            $('#search-results').html(html);
        }
        $('.ar-wa-search').show();
    });
}
