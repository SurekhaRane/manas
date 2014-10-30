jQuery(document).ready(function($) {
	$('.sortable-list').sortable({
		placeholder: 'list-item-placeholder',
		forcePlaceholderSize: true,
		handle: '.list-item-handle'
	}).disableSelection();

	$(document).on('keyup', '.title-input', function(event) {
		var text = $(this).val();
		if (text === '') text = 'undefined';

		$(this).closest('.list-item').find('.menu-item-title').text(text);
	});

	$(document).on('click', '.menu-item-toggle', function(event) {
		event.preventDefault();
		$(this).closest('.list-item').children('.list-item-settings').slideToggle(200);
		$(this).toggleClass('opened');
	});

	$('.color-picker').wpColorPicker();

	// Media buttons
	$(document).on('click', '.media-button', function(event) {
		var button = this;

		var media_popup = wp.media({
			title: 'Select or Upload File',
			button: {
				text: 'Select'
			},
			multiple: false,
		});

		media_popup.on('select', function() {
			var attachment = media_popup.state().get('selection').first().toJSON();

			$(button).siblings('.input-text').val(attachment.url);
		}).open();
	});

	// Item actions
	$(document).on('click', '.item-cancel', function(event) {
		event.preventDefault();
		$(this).closest('.list-item-settings').slideToggle(200);
	});

	$(document).on('click', '.item-delete', function(event) {
		event.preventDefault();
		if (confirm('Are you sure you want to delete the selected item?')) {
			$(this).closest('.list-item').remove();
		}
	});

	// Categories
	$('#new-category').click(function() {
		$('#category-list .new-item').clone().removeClass('new-item').appendTo('#category-list');
	});

	// Floors
	$('#new-floor').click(function() {
		$('#floor-list .new-item').clone().removeClass('new-item').appendTo('#floor-list');
	});

	// New landmark
	$('#new-landmark').click(function() {
		// Remove selection if any
		$('.selected-pin').removeClass('selected-pin');
		// Show the cleared landmark fields
		$('#landmark-settings').show();
		$('#landmark-settings input[type="text"]').val('');
		$('#landmark-settings .description-input').val('');
		$('#landmark-settings .category-select').val('false');
		$('#landmark-settings .zoom-input').val('');
		// Change button text
		$('#save-landmark').val('Add');		
	});

	$('#pins-input .im-pin').click(function() {
		$('#pins-input .selected').removeClass('selected');
		$(this).addClass('selected');

		var selected = $('.selected-pin');
		if (selected.length) {

			var data = selected.data('landmarkData'),
				pin = $(this).data('pin');

			selected.attr('class', 'im-pin selected-pin ' + pin);
			data.pin = pin;
		}
	});

	$('#save-landmark').click(function() {
		var data = null,
			selected = $('.selected-pin');
		
		if (selected.length) {
			data = $('.selected-pin').data('landmarkData');
		}
		else {
			data = {};
			data.id = $('#landmark-settings .id-input').val();
			data.label = $('#landmark-settings .title-input').val();
			data.description = $('#landmark-settings .description-input').val();
			data.category = $('#landmark-settings .category-select').val();
			data.pin = $('#pins-input .im-pin.selected').data('pin');
			data.zoom = $('#landmark-settings .zoom-input').val();
			data.x = 0.5;
			data.y = 0.5;
			$(this).val('Save');

			$.each(mapData.levels, function(index, value) {
				if (value.id == shownLevel) {
					value.locations.push(data);
				}
			});

			var pin = $('<a></a>').attr({'href': '#' + data.id, 'title': data.label}).addClass('im-pin selected-pin').addClass(data.pin).css({'top': '50%', 'left': '50%'}).appendTo($('.im-layer:visible'));
			pin.data('landmarkData', data);
		}

		data.id = $('#landmark-settings .id-input').val();
		data.label = $('#landmark-settings .title-input').val();
		data.description = $('#landmark-settings .description-input').val();
		data.category = $('#landmark-settings .category-select').val();
		data.pin = $('#pins-input .im-pin.selected').data('pin');
		data.zoom = $('#landmark-settings .zoom-input').val();
	});

	$('#delete-landmark').click(function() {
		var data = $('.selected-pin').data('landmarkData');

		// Remove the location and pin
		if (data) {
			data.id = null;
			$('.selected-pin').remove();
		}

		// Hide the settings
		$('#landmark-settings').hide();
	});

	var getParameter = function(param) {
		var pageURL = window.location.search.substring(1);
		var variables = pageURL.split('&');
		for (var i = 0; i < variables.length; i++) {
			var paramName = variables[i].split('=');
			if (paramName[0] == param) {
				return paramName[1];
			}
		}
	}

	// Load the map
	$('#admin-map').mapplic({
		id: getParameter('map'),
		height: 420,
		locations: true,
		sidebar: false,
		search: true,
		minimap: true,
		slide: 0
	});

	// Form submit
	$('.form-submit').click(function(event) {
		var newData = {};

		if (typeof mapData === 'undefined') mapData = {};
		else newData = mapData;

		newData['mapwidth'] = $('#im-mapwidth').val();
		newData['mapheight'] = $('#im-mapheight').val();

		if ($('#im-minimap').is(':checked')) newData['minimap'] = 'true';
		else newData['minimap'] = false;

		if ($('#im-sidebar').is(':checked')) newData['sidebar'] = 'true';
		else newData['sidebar'] = false;

		var zoomlimit = $('#im-zoomlimit').val();
		if (isNaN(zoomlimit) || zoomlimit == '') newData['zoomlimit'] = 4;
		else newData['zoomlimit'] = zoomlimit;

		newData['categories'] = getCategories();
		newData['levels'] = getLevels();

		$('#input-data').val(JSON.stringify(newData));
	});

	var getCategories = function() {
		var categories = [];
		$('#category-list .list-item:not(.new-item)').each(function() {
			var category = {};
			
			category['id']       = $('.id-input', this).val();
			category['title']    = $('.title-input', this).val();
			category['color']    = $('.color-input', this).val();
			if (!$('.expand-input', this).is(':checked')) {
				category['show'] = 'false';
			}

			categories.push(category);
		});

		return categories;
	}

	var getLevels = function() {
		var levels = [];
		$('#floor-list .list-item:not(.new-item)').each(function() {
			var level = {};

			level['id']        = $('.id-input', this).val();
			level['title']     = $('.title-input', this).val();
			level['map']       = $('.map-input', this).val();
			level['minimap']   = $('.minimap-input', this).val();
			if ($('.show-input', this).is(':checked')) {
				level['show']  = 'true';
			}
			level['locations'] = getLocations(level['id']);

			levels.push(level);
		});

		levels.reverse();

		return levels;
	}

	var getLocations = function(id) {
		var locations = [];
		
		if (typeof mapData.levels !== 'undefined') {
			$.each(mapData.levels, function(index, value) {
				if (value.id == id) {
					$.each(value.locations, function(index, value) {
						if (value.id !== null) {
							locations.push(value);
						}
					});
				}
			});
		}
		return locations;
	}
});