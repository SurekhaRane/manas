 
<div class="page-sidebar" id="main-menu">
    <!-- BEGIN MINI-PROFILE -->
    <div class="page-sidebar-wrapper" id="main-menu-wrapper">
        <!-- END MINI-PROFILE -->
        <!-- BEGIN SIDEBAR MENU -->
        <?php  
        $menu = wp_nav_menu(array('menu' => "Backend Menu", 'container' => '', 'menu_class' => 'mega-menu', 'menu_id' => 'menu-main',  ));
        ?>
        <div class="clearfix"></div>
        <!-- END SIDEBAR MENU -->
    </div>
</div>