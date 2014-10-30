<?php
 /*
add custom fields to taxonomy unit type
*/

function extra_unit_type_fields($tag){

$term_id = $tag->term_id;
$no_of_floors_selected = get_option( "unit_type_".$term_id."_no_of_floors",true);

if (is_null($term_id)){
?>
<div class="form-field">
    <label for="tag-slug">No of floors</label>
    <select name="no_of_floors" id="no_of_floors" class="postform">
        <?php for($i=1;$i<=4;$i++){?>
            <option value="<?php echo $i;?>" <?php if($no_of_floors_selected==$no_of_room){ ?>selected<?php } ?>><?php echo $i;?></option>
        <?php
        }
        ?>
    </select>
    <p><?php _e( 'no of floors in the unit type' ); ?></p>
</div>
<?php
}else{
    ?>
    <tr class="form-field textbook_fields" >
        <th scope="row" valign="top"><?php _e( 'No of floors' ); ?></label></th>
        <td>
            <div class="row form-input">
                <select name="no_of_floors" id="no_of_floors" class="postform">
                    <?php for($no_of_floor=1;$no_of_floor<=4;$no_of_floor++){?>
                        <option value="<?php echo $no_of_floor;?>" <?php if($no_of_floors_selected==$no_of_floor){ ?>selected<?php } ?>><?php echo $no_of_floor;?></option>
                    <?php
                    }
                    ?>
                </select>
                <br>
                <span class="description"><?php _e( 'no of floors in the unit type' ); ?></span>
            </div>
        </td>
    </tr>
<?php
}
?>


<?php
}

add_action( 'unit_type_add_form_fields', 'extra_unit_type_fields', 10, 2 );

add_action( 'unit_type_edit_form_fields', 'extra_unit_type_fields', 10, 2 );

// save extra unit type fields callback function
function save_extra_unit_type_fields( $term_id ) {

    if (isset($_REQUEST['no_of_floors'])) {

        $no_of_floors =  $_REQUEST['no_of_floors']  ;

        //save the option array
        update_option( "unit_type_".$term_id."_no_of_floors", $no_of_floors );

    }
    return;
}
add_action( 'created_unit_type', 'save_extra_unit_type_fields', 10, 2 );

add_action( 'edited_unit_type', 'save_extra_unit_type_fields', 10, 2 );


/* get unit type taxonomy items byif by id then id should be passed*/

function get_unit_types($ids=array())
{

    $unit_types = array();

    $categories = get_terms( 'unit_type', array(
        'hide_empty' => 0,
        'include'	=> $ids
    ) );

    foreach($categories as $category){

        $no_of_floors= get_option( "unit_type_".$category->term_id."_no_of_floors",true);

        $unit_types[] = array('id'=>intval($category->term_id),"name"=>$category->name,"no_of_floors"=>$no_of_floors);

    }
    return $unit_types;
}