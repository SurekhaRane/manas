define ['jquery'],(jQuery)->

    jQuery(document).ready ($) ->
        #display
        DisplayFormVIew = (FormId, EntryIds, Element) ->
            $.post AJAXURL,
                action: "fetch_form_views"
                form_id: FormId
                entry_ids: EntryIds
                async: false
            , (response) ->
                store_entry_data = $(Element).attr("store-entry-data")
                i = 0
                while i < response.length
                    FormNo = parseInt(i)+1
                    $(Element).parent().append "<div class='form-container bordered' store-entry-data='" + store_entry_data + "' form-no='" + FormNo + "' entry-id='" + response[i].entry_id + "'>" + response[i].form_html + "</div>"
                    ++i

                NoOfForms = (if ($("option:selected", $(Element)).attr("no-of-forms") isnt `undefined`) then $("option:selected", $(Element)).attr("no-of-forms") else 0);

                NoOfForms = (if ($(Element).attr("no-of-forms") isnt `undefined` && NoOfForms is 0) then $(Element).attr("no-of-forms") else NoOfForms) - i ;
                AddDetailsLink( Element,NoOfForms  )

            return
        AddDetailsLink = (Element, NoOfForms) ->
            FormId = $(Element).attr("form-id")
            FieldStoreEntryData = $(Element).attr("store-entry-data")
            I = 1
            while I <= NoOfForms
                $(Element).parent().append "<div class='form-container bordered' store-entry-data='" + FieldStoreEntryData + "'   ><a href='javascript:void(0)'form-id='" + FormId + "' class='show-add-form' store-entry-data='" + FieldStoreEntryData + "' >Add Details</a></div>"
                I++
            return

        GetSubFormEntries = (e) ->
            _e = e
            sub_forms = $(e.target).prev().children('.frm_forms .frm_form_fields' ).children().children().find(".form-container")
            parent = $(e.target).prev().children('.frm_forms .frm_form_fields' ).children().children()
            if sub_forms.length is 0
                sub_forms = $(e.target).prev().children().children('.frm_form_fields').children().children().find(".form-container")
                parent = $(e.target).prev().children().children('.frm_form_fields').children().children()
            if sub_forms.length isnt 0
                entries = []
                StoreEntryData = ""
                $.each sub_forms, (i, val) ->
                    StoreEntryData = $(val).attr("store-entry-data")
                    entries[$(val).attr("form-no")] = $(val).attr("entry-id")
                    return
                SaveEntries = []
                Object.keys(entries).length == entries.length;
                $.each entries, (i, val) ->
                    SaveEntries.push val  if val != `undefined`
                    return

                parent.children("."+StoreEntryData).val(SaveEntries)

        $(".frm_submit").remove()
        $(document).on "click", ".add-rooms",(e) ->
            form_id = $(this).attr("form-id")
            FormNo = parseInt($(this).parent().children('.form-container').length)+ 1
            field_store_entry_data = $(this).attr("store-entry-data")
            $(e.target).parent().append "<div class='form-container bordered' store-entry-data='" + field_store_entry_data + "' form-no= '" + FormNo + "'  ><a href='javascript:void(0)'form-id='" + form_id + "' class='show-add-form' >Add Details</a></div>"
            return

        $(".show_sub_form").each (e) ->
            _this = this
            get_form_id = $("option:selected", $(this)).attr("form-id")
            form_id = (if (get_form_id is "" or get_form_id is `undefined`) then $(this).attr("form-id") else get_form_id)
            field_store_entry_data = $(this).attr("store-entry-data")
            entry_ids = $(this).parent().parent().find("." + field_store_entry_data).val()
            DisplayFormVIew form_id, entry_ids, _this  if entry_ids isnt "" and entry_ids isnt `undefined`
            return

        $(document).on "change", ".room_type",(e) ->
            form_id = ($("option:selected", $(this)).attr("form-id"))
            field_store_entry_data = $(this).attr("store-entry-data")
            $(e.target).parent().parent().find("." + field_store_entry_data).val('')
            selected_value = $(this).attr("selected-value")
            entry_id = $(this).parent().parent().find("." + field_store_entry_data).val()
            field_id = $(this).attr("field-id")
            if form_id is ""
                $(e.target).parent().find(".form-container").remove()
                return
            if form_id is selected_value
                DisplayFormVIew form_id, entry_id, $(e.target)
            else
                $(e.target).parent().find(".form-container").remove()
                $(e.target).parent().append "<div class='form-container bordered' store-entry-data='" + field_store_entry_data + "' form-no=1 ><a href='javascript:void(0)'form-id='" + form_id + "' class='show-add-form' >Add Details</a></div>"
            return

        $(document).on "change", ".unit_type",(e) ->
            form_id = ($("option:selected", $(e.target)).attr("form-id"))
            field_store_entry_data = $(this).attr("store-entry-data")
            $(e.target).parent().parent().find("." + field_store_entry_data).val('')
            selected_value = $(this).attr("selected-value")
            entry_id = $("#" + field_store_entry_data).val()
            field_id = $(e.target).attr("field-id")
            no_of_forms = $("option:selected", $(e.target)).attr("no-of-forms")
            if form_id is ""
                $(e.target).parent().find(".form-container").remove()
                return
            if no_of_forms isnt "" and no_of_forms isnt `undefined`
                $(e.target).parent().find(".form-container").remove()
                i = 1
                while i <= no_of_forms
                    $(e.target).parent().append "<div class='form-container bordered' store-entry-data='" + field_store_entry_data + "' selected_value = " + selected_value + " form_id = " + form_id + " form-no=" + i + "><a href='javascript:void(0)'form-id='" + form_id + "' class='show-add-form'  floor-no=" + i + "  >Add Details</a></div>"
                    i++
            return

        $(document).on "click", ".save-form",(e) ->
            _e = e

            GetSubFormEntries( _e )
            data = $( "form" ).serializeArray()
            $.post AJAXURL,
                action: "save_entry"
                data: data
            , (response) ->

                if response.entry_id is false
                    alert("error saving the entry")
                    return
                $(_e.target).parent().attr('entry-id',response.entry_id)
                $(_e.target).parent().html response.entry_html
            return

        $(document).on "click", "#save-main-entry",(e) ->
            GetSubFormEntries( e )
            data = $("#frm_form_" + $("#save-main-entry").attr("form-id") + "_container form").serializeArray()
            $.post AJAXURL,
                action: "save_entry"
                data: data
            , (response) ->
                window.location.href = SITEURL + "/listing/?form_id="+$("#frm_form_" + $("#save-main-entry").attr("form-id") + "_container form input[name='form_id']").val()
                return

            return

        $(document).on "click", ".show-add-form", (e) ->

            #if $(e.target).parent().prev().find('.show-add-form').length > 0
                #console.log('Add Details In Sequence')
                #return;
            _e = e

            form_id = $(e.target).attr("form-id")
            $.post AJAXURL,
                action: "fetch_form"
                form_id: form_id
                async: false
            , (response) ->
                parent = $(_e.target).parent()
                $(_e.target).parent().html response
                $(".frm_submit").remove()
                return

            return
        $(document).on "click", ".edit-entry", (e) ->
            _e = e
            form_id = $(e.target).attr("form-id")
            entry = $(e.target).attr("entry-id")
            $.post AJAXURL,
                action: "fetch_form"
                form_id: form_id
                entry: entry
                frm_action: "edit"
                async: false
            , (response) ->
                parent = $(_e.target).parent()
                parent.html response
                $(".frm_submit").remove()
                parent.find(".show_sub_form").each (e) ->
                    _this = this
                    get_form_id = $("option:selected", $(this)).attr("form-id")
                    form_id = (if (get_form_id is "" or get_form_id is `undefined`) then $(this).attr("form-id") else get_form_id)
                    field_store_entry_data = $(this).attr("store-entry-data")
                    entry_ids = $(this).parent().parent().find("." + field_store_entry_data).val()
                    DisplayFormVIew form_id, entry_ids, _this  if entry_ids isnt "" and entry_ids isnt `undefined`
                    return

                return

            return

        return
