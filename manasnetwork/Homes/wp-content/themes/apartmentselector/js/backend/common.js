jQuery(document).ready(function($) { 
    sideMenu()
    
    activateMenu() 

    jQuery('#login-user-box').popover({ 
        html : true, 
        content: function() {
          return $('#login-user-box-content').html();
        }
    });    


 
function sideMenu(){


 var handleSidenarAndContentHeight = function () {
        var content = jQuery('.page-content');
        var sidebar = jQuery('.page-sidebar');

        if (!content.attr("data-height")) {
            content.attr("data-height", content.height());
        }

        if (sidebar.height() > content.height()) {
            content.css("min-height", sidebar.height() + 120);
        } else {
            content.css("min-height", content.attr("data-height"));
        }
    }
    
    jQuery("#menu-collapse").click(function() {  
        if(jQuery('.page-sidebar').hasClass('mini')){
            jQuery('.page-sidebar').removeClass('mini');
            jQuery('.page-content').removeClass('condensed-layout');
            jQuery('.footer-widget').show();
        }
        else{
            jQuery('.page-sidebar').addClass('mini');
            jQuery('.page-content').addClass('condensed-layout');
            jQuery('.footer-widget').hide();
            calculateHeight();
        }
    });
 
//**********************************BEGIN MAIN MENU********************************
    jQuery('.page-sidebar li > a').on('click', function (e) {
            if (jQuery(this).next().hasClass('sub-menu') == false) {
                return;
    }
     var parent = jQuery(this).parent().parent();


            parent.children('li.open').children('a').children('.arrow').removeClass('open');
            parent.children('li.open').children('a').children('.arrow').removeClass('active');
            parent.children('li.open').children('.sub-menu').slideUp(200);
            parent.children('li').removeClass('open');
          //  parent.children('li').removeClass('active');
            
            var sub = jQuery(this).next();
            if (sub.is(":visible")) {
                jQuery('.arrow', jQuery(this)).removeClass("open");
                jQuery(this).parent().removeClass("active");
                sub.slideUp(200, function () {
                    handleSidenarAndContentHeight();
                });
            } else {
                jQuery('.arrow', jQuery(this)).addClass("open");
                jQuery(this).parent().addClass("open");
                sub.slideDown(200, function () {
                    handleSidenarAndContentHeight();
                });
            }

            e.preventDefault();
        });
    //Auto close open menus in Condensed menu
        if( jQuery('.page-sidebar').hasClass('mini'))  {         
            var elem = jQuery('.page-sidebar ul');
            elem.children('li.open').children('a').children('.arrow').removeClass('open');
            elem.children('li.open').children('a').children('.arrow').removeClass('active');
            elem.children('li.open').children('.sub-menu').slideUp(200);
            elem.children('li').removeClass('open');
        }
}
        
function activateMenu(){

    var current_link = jQuery('a[href="'+window.location.href+'"]');
 
    jQuery("#"+current_link.parent().parent().parent().attr('id')+" a").trigger('click')


}
});

//clear errors warnings and success alerts

function clearAlerts(){
    jQuery(".text-success").remove();
    jQuery(".text-error").remove();
}



//reset form values and scroll top to see the message on save completion

function resetForm(e,entryId,response){

   if(entryId=="" && response.error==false){

        jQuery('form').find("input[type=text], textarea ,select").val("");
        jQuery('select').val('')
        jQuery('select').trigger('change')
        jQuery('input:checkbox').removeAttr('checked')
    }

    msgClass= (response.error==false)? "text-success" :"text-error";
        
    jQuery('form').prepend('<div class="'+msgClass+'">'+response.msg+'</div>')
    
    jQuery(".loading-animator").remove();

    jQuery(e.target).show() ; 

   jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;

}

//get the display text for the id from the the master collections
function getDisplayText(itemId,collection,field){
 
    itemFound =  _.findWhere(collection, {id: parseInt(itemId)})
 
    return itemFound==undefined ?'':itemFound[field];
}

function fileUploadByIndex(field){  
    // Change this to the location of your server-side upload handler:
  console.log('#fileupload'+field);
    jQuery('#fileupload'+field).fileupload({
        url: AJAXURL+"?action=upload_file",
        
    autoUpload: true,

    send: function (e, data) {
        jQuery('#progress'+field).show(); 
    },
    add: function (e, data) { 
        data.submit();
    },
    progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);

        jQuery('#progress'+field+' .progress-bar').css(
            'width',
            progress + '%'
        );
    },
    done: function (e, data) {   
       
       jQuery('#fileupload'+field+'_image_id').val(data.result.attachment_id )
       
       jQuery('#fileupload'+field+'_image_display').attr('src',data.result.attachment_url )
       
       jQuery('#progress'+field).hide(); 
    
       jQuery('#progress'+field+' .progress-bar').css(
            'width',
            '0%'
        );
    }
    }) 
}

function fileUploadById(field){  
    // Change this to the location of your server-side upload handler:
 
    jQuery('#fileupload'+field).fileupload({
        url: AJAXURL+"?action=upload_file",
        
    autoUpload: true,

    send: function (e, data) {
        jQuery('#progress'+field).show(); 
    },
    add: function (e, data) { 
        data.submit();
    },
    progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);

        jQuery('#progress'+field+' .progress-bar').css(
            'width',
            progress + '%'
        );
    },
    done: function (e, data) {   
        console.log(jQuery('#fileupload'+field).parent().find(".image_id"))
        jQuery("#"+field).val(data.result.attachment_id )
        jQuery("#image_display"+field).show()
        jQuery("#image_display"+field).attr('src',data.result.attachment_url )
        jQuery('#progress'+field).hide(); 
        jQuery('#progress'+field+' .progress-bar').css(
            'width',
            '0%'
        );
    }
    }) 
}

function fileUploadById(field){  
    // Change this to the location of your server-side upload handler:
 
    jQuery('#fileupload'+field).fileupload({
        url: AJAXURL+"?action=upload_file",
        
    autoUpload: true,

    send: function (e, data) {
        jQuery('#progress'+field).show(); 
    },
    add: function (e, data) { 
        data.submit();
    },
    progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);

        jQuery('#progress'+field+' .progress-bar').css(
            'width',
            progress + '%'
        );
    },
    done: function (e, data) {   
        console.log(jQuery('#fileupload'+field).parent().find(".image_id"))
        jQuery("#"+field).val(data.result.attachment_id )
        jQuery("#image_display"+field).show()
        jQuery("#image_display"+field).attr('src',data.result.attachment_url )
        jQuery('#progress'+field).hide(); 
        jQuery('#progress'+field+' .progress-bar').css(
            'width',
            '0%'
        );
    }
    }) 
}


function fileUploadByformidable(fileInput){  
    // Change this to the location of your server-side upload handler:
  
 var fileField = fileInput.attr("name").replace("file","")

 console.log("fileField")
    jQuery('#fileupload'+fileField).fileupload({
        url: AJAXURL+"?action=upload_file",
        
    autoUpload: true,
    add: function (e, data) { 
        data.submit();
    },
    progressall: function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);

        jQuery('#progress'+fileField+' .progress-bar').css(
            'width',
            progress + '%'
        );
    },
    done: function (e, data) {    
        fileUploadName = "item_meta\\["+fileField+"\\]"
        console.log(fileUploadName)
        jQuery('input[name="'+fileUploadName+'"]').val(data.result.attachment_id)
        if(jQuery('input[name="'+fileUploadName+'"]').parent().find('.attachment-thumbnail').length==0){
            jQuery('input[name="'+fileUploadName+'"]').after('<a href="'+data.result.attachment_url+'"><img width="150" height="150" src="'+data.result.attachment_url+'" class="attachment-thumbnail"  ></a>')
        }else{
            console.log(jQuery('input[name="'+fileUploadName+'"]').parent().html())
            jQuery('input[name="'+fileUploadName+'"]').parent().find('.attachment-thumbnail').attr("src",data.result.attachment_url)
        }
        
    }
    }) 
}


function customFileUploadUi(fileInput){
 fileField = fileInput.attr("name").replace("file","")
 html =  '<span class="btn btn-success fileinput-button">'
            +'<i class="glyphicon glyphicon-plus"></i>'
            +'<span>Select files...</span>'
            +'<input type="hidden" class="image_id" name="image_id"><input id="fileupload'+fileField+'" class="fileupload" type="file" name="files">'
            +'</span>'
            +'<br>'
            +'<br>'
            +'<div id="progress'+fileField+'" class="progress">'
            +'<div class="progress-bar progress-bar-success"></div>'
            +'</div>'
            +'<br><div class="row-fluid">'
            +'<div class="col-md-12">'
            +'<img src="" id="image_display'+fileField+'">'
            +'</div>';
return html;
}

function toProperCase(s)
{
  return s.toLowerCase().replace(/^(.)|\s(.)/g, 
          function($1) { return $1.toUpperCase(); });
}