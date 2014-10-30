/**
 * Created by diana on 7/10/14.
 */

jQuery(document).ready(function($) {

    $(document).on("change", "#unit_type", function(e) {
        $("#unit_variant").empty();
        $("#unit_variant").append(new Option("Select", ""));
        $.post(ajaxurl, {
            action: "get_unit_variants",
            unit_type: $("option:selected", $(e.target)).val()
        }, function(response) {

            $.each(response, function(i, val) {
                $("#unit_variant").append(new Option(val.variant_name, val.variant_id));
            });

        });
    });
});
