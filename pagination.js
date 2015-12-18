(function($){

	var pagination = {

		options: {
			selector: null,
			itemSelector: null,
			infoWrapper: '.pagination-info',
			currentPage: 1,
			perPage: 3,
			scrollSpeed: 700,
			autoScroll: true,
			scrollOffset: 80,
			scrollTarget: 'html,body'
		},
		initialized: false,
		listObjects: [],

		init: function(args) {
			var that = this;
			$.extend(true, that.options, args);

			if ($(that.options.selector).length) {
				that.getItems(function() {
					that.changePage(that.options.currentPage);
				});

				that.setupPagination();
				that.initialized = true;
			}

		},

		getItems: function(fn) {
			var that = this;
			var items = $(that.options.selector).find(that.options.itemSelector);
			for(var i=0;i < items.length;i++) {
				that.listObjects.push(items[i]);
			}
			fn();
		},

		setupPagination: function() {
			var that = this;
			var elem = $(that.options.infoWrapper);
			var _html = '<div class="table_pager">';

			_html += '<div class="pager_title">Sida</div>';

			for(var i=1;i < that.numPages();i++) {
				var _class = (i === that.options.currentPage)? ' current_page' : '';
				_html += '<div class="page_button page-' + i + _class + '" data-page="' + i + '">' + i + '</div>';
			}
			_html += '</div>';

			elem.html(_html);

			$('.page_button').bind('click', function(e) {
				e.preventDefault();
				var id = this.getAttribute('data-page');
				that.changePage(id);
			});
		},

		getClassName: function(name) {
			return name.replace('.', '');
		},

		prevPage: function() {
			var that = pagination;

			if (that.options.currentPage > 1) {
				that.options.currentPage--;
				that.changePage(that.options.currentPage);
			}
		},

		nextPage: function() {
			var that = pagination;

			if (that.options.currentPage < that.numPages()) {
				that.options.currentPage++;
				that.changePage(that.options.currentPage);
			}
		},

		changePage: function(page) {
			var that = this;
			var list_wrapper = $(that.options.selector);
			var current_button = $('.page-' + that.options.currentPage);

			$(current_button).removeClass('current_page');

			// Validate page
			if (page < 1) page = 1;
			if (page > that.numPages()) page = that.numPages();

			that.options.currentPage = page;

			$('.page-' + page).addClass('current_page');

			var _html = '';
			list_wrapper.html('');
			for (var i = (page-1) * that.options.perPage; i < (page * that.options.perPage) && i < that.listObjects.length; i++) {
				that.listObjects[i].style.display = 'block';
				_html += that.listObjects[i].outerHTML;
			}
			list_wrapper.html(_html);

			if (that.initialized && that.options.autoScroll) that.scrollToTop();

		},

		scrollToTop: function() {
			var that = this;
			var _top = $(that.options.selector).offset().top;

			$(that.options.scrollTarget).animate({
			    scrollTop: (_top - that.options.scrollOffset)
			}, that.options.scrollSpeed);
		},

		numPages: function() {
			var that = this;
			return Math.ceil(that.listObjects.length / that.options.perPage);
		}

	};

	$(document).on('ready', function() {
		pagination.init({
			selector: '#product-list',
			itemSelector: '.row-fluid',
			infoWrapper: '.pagination',
			perPage: 5,
			scrollSpeed: 500,
			autoScroll: true
		});
	});

})(jQuery);
