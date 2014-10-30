/**
 *   Interactive Map by @sekler
 */

(function($) {

	var Mapplic = function() {
		var self = this;

		self.o = {
			id: 0,
			height: 420,
			locations: true,
			minimap: true,
			slide: 0,
			zoomLimit: 10
		};

		self.init = function(el, params) {
			// Extend options
			self.o = $.extend(self.o, params);
			var o = self.o;

			self.el = el.addClass('im-element').height(o.height);
			self.container = $('<div></div>').addClass('im-container loading').height(o.height).appendTo(el);

			self.map = $('<div></div>').addClass('im-map').appendTo(self.container);
			shownLevel = null;

			var map = self.map;

			if (o.id == 0) {
				console.log('Id of map is not set!');
				return;
			} 

			var param = {
				action: 'mapdata',
				map: o.id
			};

			// Process JSON file
			$.getJSON(ajaxurl, param, function(data) {
				self.container.removeClass('loading');
				self.data = data;
				mapData = data;

				var nrlevels = 0;

				self.levelselect = $('<select></select>').addClass('im-levels-select');

				var hw_ratio = data.mapheight / data.mapwidth;
				if (data.mapheight / self.container.height() > data.mapwidth / self.container.width()) {
					self.min_width = self.container.width();
					self.min_height = self.container.width() * hw_ratio;
				}
				else {
					self.min_height = self.container.height();
					self.min_width = self.container.height() / hw_ratio;
				}

				map.css({
					'width': data.mapwidth,
					'height': data.mapheight
				});

				// Create minimap
				if (o.minimap) {
					self.minimap = $('<div></div>').addClass('im-minimap').appendTo(self.container);
					self.minimap.css('height', self.minimap.width() * hw_ratio);
					self.minimap.click(function(e) {
						e.preventDefault();
						var pos = $(this).offset(),
							posX = (e.pageX - pos.left) / $(this).width(),
							posY = (e.pageY - pos.top) / $(this).height();
						self.goTo(posX, posY, 800);
					});
				}

				// Iterate through levels
				if (data.levels) {
					$.each(data.levels, function(index, value) {
						var source = value.map;
						var extension = source.substr((source.lastIndexOf('.') + 1)).toLowerCase();

						// Create new map layer
						var layer = $('<div></div>').addClass('im-layer').addClass(value.id).hide().appendTo(map);
						switch (extension) {
							// Image formats
							case 'jpg': case 'jpeg': case 'png': case 'gif':
								$('<img>').attr('src', source).addClass('im-map-image').appendTo(layer);
								break;
							// Vector format
							case 'svg':
								$('<div></div>').addClass('im-map-image').load(source).appendTo(layer);
								break;
							default:
								console.log('File type ' + extension + ' is not supported!');
						}

						// Create new minimap layer
						if (o.minimap) {
							var minimap_layer = $('<div></div>').addClass('im-minimap-layer').addClass(value.id).appendTo(self.minimap);
							$('<img>').attr('src', value.minimap).addClass('im-minimap-background').appendTo(minimap_layer);
							$('<div></div>').addClass('im-minimap-overlay').appendTo(minimap_layer);
							$('<img>').attr('src', value.minimap).addClass('im-minimap-active').appendTo(minimap_layer);
						}

						// Build layer control
						self.levelselect.prepend($('<option></option>').attr('value', value.id).text(value.title));

						if ((shownLevel == null) || (value.show)) shownLevel = value.id;
						
						// Iterate through locations
						$.each(value.locations, function(index, value) {
							var top = value.y * 100;
							var left = value.x * 100;

							var pin = $('<a></a>').attr({'href': '#' + value.id, 'title': value.label}).addClass('im-pin').css({'top': top + '%', 'left': left + '%'}).appendTo(layer);
							pin.data('landmarkData', value);
							
							if (value.pin) pin.addClass(value.pin);


							$(document).on('click', '.im-pin', function(event) {
								event.preventDefault();
                                console.log('ppppppppppppp');
							});
						});

						nrlevels++;
					});
				}

				// Pin drag
				$(document).on('mousedown', '.im-element .im-pin', function(event) {
					var pin = $(this);
					event.preventDefault();

					$('.selected-pin').removeClass('selected-pin');
					pin.addClass('selected-pin');

					$(document).on('mousemove', function(event) {
						var x = event.pageX - map.offset().left,
							y = event.pageY - map.offset().top;
						pin.css({
							left: x + 'px',
							top: y + 'px'
						});
					});

					$(document).on('mouseup', function() {
						$(document).off('mousemove');
						$(document).off('mouseup');

						var x = ((pin.offset().left - map.offset().left - parseInt(pin.css('margin-left')))/map.width()).toFixed(4),
							y = ((pin.offset().top - map.offset().top - parseInt(pin.css('margin-top')))/map.height()).toFixed(4);
						
						pin.css({
							left: (x*100) + '%',
							top: (y*100) + '%'
						});

						var value = pin.data('landmarkData');

						value.x = x;
						value.y = y;

						$('#landmark-settings .title-input').val(value.label);
						$('#landmark-settings .id-input').val(value.id);
						$('#landmark-settings .description-input').val(value.description);
						$('#landmark-settings .category-select').val(value.category);
						$('#landmark-settings .zoom-input').val(value.zoom);
						$('#pins-input .selected').removeClass('selected');
						var pinClass = 'default';
						if (value.pin) pinClass = value.pin;
						$('#pins-input .' + pinClass).addClass('selected');

						$('#landmark-settings').show();
					});
				});

				// Components
				// Zoom level
				self.zoomlevel = $('<div>1.00</div>').addClass('im-zoomlevel').appendTo(self.container);

				// Levels
				if (nrlevels > 1) {
					self.levels = $('<div></div>').addClass('im-levels');
					var up = $('<a href="#"></a>').addClass('im-levels-up').appendTo(self.levels);
					self.levelselect.appendTo(self.levels);
					var down = $('<a href="#"></a>').addClass('im-levels-down').appendTo(self.levels);
					self.container.append(self.levels);
				
					self.levelselect.change(function() {
						var value = $(this).val();
						self.level(value);
					});
				
					up.click(function(event) {
						event.preventDefault();
						if (!$(this).hasClass('disabled')) self.level('+');
					});

					down.click(function(event) {
						event.preventDefault();
						if (!$(this).hasClass('disabled')) self.level('-');
					});
				}
				self.level(shownLevel);
				
				self.zoomTo(0.5, 0.5, 1, 0);

			}).fail(function() {
				// Couldn't load JSON file, or it is invalid.
				console.log('Data file missing or invalid!');
			});

			// Controls
			// Drag and drop
			$(document).on('mousedown', '.im-map-image', function(e) {
				e.preventDefault();

				map.data('mouseX', e.clientX);
				map.data('mouseY', e.clientY);
				map.css('cursor', 'move');

				$(document).on('mousemove', move);
				$(document).on('mouseup', function(e) {
					$(document).off('mousemove');
					$(document).off('mouseup');
					map.css('cursor', 'default');

					// Slide effect
					map.finish();
					map.animate({
						left: map.data('newX'),
						top: map.data('newY')
					}, 400, 'easeOutExpo');

					return false;
				});
			});

			// Double click
			map.on('dblclick', function(e) {
				var mapPos = self.map.offset();
				var x = (e.pageX - mapPos.left) / self.map.width();
				var y = (e.pageY - mapPos.top) / self.map.height();
				var z = self.map.width() / self.min_width * 2;

				self.zoomTo(x, y, z, 600);
			});

			// Touch support
			map.on('touchstart', function(e) {
				var orig = e.originalEvent,
					pos = map.position();

				map.data('touchY', orig.changedTouches[0].pageY - pos.top);
				map.data('touchX', orig.changedTouches[0].pageX - pos.left);
			});

			map.on('touchmove', function(e) {
				e.preventDefault();
				var orig = e.originalEvent;

				var newX = orig.changedTouches[0].pageX - map.data('touchX'),
					newY = orig.changedTouches[0].pageY - map.data('touchY'),
					minX = self.container.width() - map.width(),
					minY = self.container.height() - map.height();

				if (newX > 0) newX = 0;
				else if (newX < minX) newX = minX;
				if (newY > 0) newY = 0;
				else if (newY < minY) newY = minY;

				map.css({
					top: newY,
					left: newX
				});
				map.data('newX', newX);
				map.data('newY', newY);

				if (self.o.minimap) updateMinimap(self.container, map);
			});

			// Mouse Wheel
			self.container.bind('mousewheel DOMMouseScroll', function(e, delta) {
				e.preventDefault();

				var posX = e.pageX - self.container.offset().left;
				var posY = e.pageY - self.container.offset().top;

				var pos = map.position();
				var ratio = 1 + delta / 5;

				var scaleX = map.width();
				var scaleY = map.height();

				var newW = map.width() * ratio;
				var newH = map.height() * ratio;

				if (newW < self.min_width) newW = self.min_width;
				else if (newW > self.min_width * self.o.zoomLimit) newW = self.min_width * self.o.zoomLimit;
				if (newH < self.min_height) newH = self.min_height;
				else if (newH > self.min_height * self.o.zoomLimit) newH = self.min_height * self.o.zoomLimit;

				scaleX = newW / scaleX;
				scaleY = newH / scaleY;

				var newX = pos.left - ((posX - pos.left) * scaleX - (posX - pos.left));
				var newY = pos.top - ((posY - pos.top) * scaleY - (posY - pos.top));
				
				// needs to be checked only on zoom-out
				if (delta < 0) {
					var minX = self.container.width() - newW;
					var minY = self.container.height() - newH;

					if (newX > 0) newX = 0;
					else if (newX < minX) newX = minX;
					if (newY > 0) newY = 0;
					else if (newY < minY) newY = minY;
				}

				map.finish();
				map.animate({
					width: newW,
					height: newH,
					left: newX,
					top: newY
				}, 200, 'easeOutExpo');

				map.data('newX', newX);
				map.data('newY', newY);

				if (self.o.minimap) updateMinimap(self.container, map, newW, newH);

				// Zoom level
				var level = newW / self.container.width();
				self.zoomlevel.text(level.toFixed(2));
			});
			return self;
		}

		// Functions
		self.getLocationData = function(id) {
			var data = null;
			$.each(mapData.levels, function(index, layer) {
				$.each(layer.locations, function(index, value) {
					if (value.id == id) {
						data = value;
					}
				});
			});
			return data;
		}

		self.search = function(keyword) {
			if (keyword) self.clear.fadeIn(100);
			else self.clear.fadeOut(100);

			$('.im-list li', self.el).each(function() {
				if ($('h4', this).text().search(new RegExp(keyword, "i")) < 0) {
					$(this).removeClass('im-list-shown');
					$(this).slideUp(200);
				} else {
					$(this).addClass('im-list-shown');
					$(this).show();
				}
			});

			$('.im-list > li', self.el).each(function() {
				var count = $('.im-list-shown', this).length;
				$('.im-list-count', this).text(count);
			});
		}

		self.level = function(target) {
			switch (target) {
				case '+':
					target = $('option:selected', self.levelselect).removeAttr('selected').prev().prop('selected', 'selected').val();
					break;
				case '-':
					target = $('option:selected', self.levelselect).removeAttr('selected').next().prop('selected', 'selected').val();
					break;
				default:
					$('option[value="' + target + '"]', self.levelselect).prop('selected', 'selected');
			}

			shownLevel = target;
			var layer = $('.im-layer.' + target);

			// Target layer is active
			if (layer.is(':visible')) return;

			// Show target layer
			$('.im-layer:visible').hide();
			layer.show();

			// Show target minimap layer
			if (self.o.minimap) {
				$('.im-minimap-layer:visible').hide();
				$('.im-minimap-layer.' + target).show();
			}

			// Update control
			var index = self.levelselect.get(0).selectedIndex,
				up = $('.im-levels-up', self.levels),
				down = $('.im-levels-down', self.levels);

			up.removeClass('disabled');
			down.removeClass('disabled');
			if (index == 0) {
				up.addClass('disabled');
			}
			else if (index == self.levelselect.get(0).length - 1) {
				down.addClass('disabled');
			}
		}

		self.zoomTo = function(x, y, z, duration) {
			var map = self.map;
			var container = self.container;
			duration = typeof duration !== 'undefined' ? duration : 800;
			
			var newW = self.min_width * z;
			var newH = self.min_height * z;

			if (newW < self.min_width) newW = self.min_width;
			else if (newW > self.min_width * self.o.zoomLimit) newW = self.min_width * self.o.zoomLimit;
			if (newH < self.min_height) newH = self.min_height;
			else if (newH > self.min_height * self.o.zoomLimit) newH = self.min_height * self.o.zoomLimit;

			var newX = container.width() * 0.5 - newW * x;
			var newY = container.height() * 0.5 - newH * y;

			map.finish();
			map.animate({
				left: newX,
				top: newY,
				width: newW,
				height: newH
			}, duration, 'easeInOutCubic');

			map.data('newX', newX);
			map.data('newY', newY);

			if (self.o.minimap) updateMinimap(container, map, newW, newH);

			// Zoom level
			var level = newW / self.container.width();
			self.zoomlevel.text(level.toFixed(2));
		};

		self.goTo = function(x, y, duration) {
			var map = self.map;
			var container = self.container;
			duration = typeof duration !== 'undefined' ? duration : 800;


			var newX = container.width() * 0.5 - x * map.width();
			var newY = container.height() * 0.5 - y * map.height();

			map.finish();
			map.animate({
				left: newX,
				top: newY
			}, duration, 'easeInOutCubic');

			map.data('newX', newX);
			map.data('newY', newY);

			if (self.o.minimap) updateMinimap(container, map);
		}

		self.showLocation = function(id, duration) {
			$.each(mapData.levels, function(index, layer) {
				$.each(layer.locations, function(index, value) {
					if (value.id == id) {
						var zoom = typeof value.zoom !== 'undefined' ? value.zoom : 4;
						self.level(layer.id);
						self.zoomTo(value.x, value.y, zoom, duration);
					}
				});
			});
		};

		var move = function(e) {
			var map = self.map,
				slide = self.o.slide;

			var changeX = e.clientX - map.data('mouseX');
			var changeY = e.clientY - map.data('mouseY');

			var pos = map.position();
			
			var newX = pos.left + changeX;
			var newY = pos.top + changeY;
			
			var rawX = newX;
			var rawY = newY;

			var minX = self.container.width() - map.width();
			var minY = self.container.height() - map.height();

			if (newX > 0) {
				rawX = Math.min(newX, slide);
				newX = 0;
			}
			else if (newX < minX) {
				rawX = Math.max(newX, minX - slide);
				newX = minX;
			}
			if (newY > 0) {
				rawY = Math.min(newY, slide);
				newY = 0;
			}
			else if (newY < minY) {
				rawY = Math.max(newY, minY - slide);
				newY = minY;
			}

			map.finish();
			map.animate({
				left: rawX,
				top: rawY
			}, 0, 'easeOutExpo');
			
			map.data('newX', newX);
			map.data('newY', newY);
			map.data('mouseX', e.clientX);
			map.data('mouseY', e.clientY);

			if (self.o.minimap) updateMinimap(self.container, map);
		};

		var updateMinimap = function(container, map, mapWidth, mapHeight) {
			var minimap = self.minimap,
				active = $('.im-minimap-active', minimap);

			// Default values
			mapWidth = typeof mapWidth !== 'undefined' ? mapWidth : map.width();
			mapHeight = typeof mapHeight !== 'undefined' ? mapHeight : map.height();

			// Active zone dimension and position
			var width = Math.round(container.width() / mapWidth * minimap.width()),
				height = Math.round(container.height() / mapHeight * minimap.height()),
				top = Math.round((-map.data('newY')) / mapWidth * minimap.width()),
				left = Math.round((-map.data('newX')) / mapHeight * minimap.height()),
				right = left + width,
				bottom = top + height;
			
			active.css('clip', 'rect(' + top + 'px, ' + right + 'px, ' + bottom + 'px, ' + left + 'px)');
		};
	};

	//  Create a jQuery plugin
	$.fn.mapplic = function(params) {
		var len = this.length;

		return this.each(function(index) {
			var me = $(this),
				key = 'interactivemap' + (len > 1 ? '-' + ++index : ''),
				instance = (new Mapplic).init(me, params);

			me.data(key, instance).data('key', key);
		});
	};
})(jQuery);