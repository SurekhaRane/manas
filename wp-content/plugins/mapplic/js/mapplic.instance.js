jQuery(document).ready(function($) {
	var i = 1;

	while (window['mapplic' + i] !== undefined) {
		var params = window['mapplic' + i];
		var selector = '#mapplic' + i;
		console.log(params.ajaxurl);
		ajaxurl = params.ajaxurl;
		console.log(params);
		console.log(params.id);
		$(selector).mapplic({
			'id': params.id,
			'width': params.width,
			'height': params.height
		});

		i++;
	}
});