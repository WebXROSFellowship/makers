<?php
class WebXROSTheme {
    const TABS = array(
        'basic' => 'Basic',
        'frameworks' => '3D Frameworks',
        'content' => 'Content',
        'advanced' => 'Advanced'
    );

    public function __construct() {
        add_action('admin_menu', array($this, 'admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
    }

    // Register admin menu
    public function admin_menu() {
        add_menu_page(
            'WebXROS', // Page title
            'WebXROS', // Menu title
            'manage_options', // Capability required to access the page
            'webxros', // Menu slug
            array($this, 'settings_page'), // Callback function to display the page content
            'dashicons-admin-generic' // Custom icon
        );
    
        // Add sub-pages
        add_submenu_page(
            'webxros',
            '3D Frameworks Settings',
            '3D Frameworks',
            'manage_options',
            'webxros-frameworks',
            array($this, 'frameworks_settings_page')
        );
    
        add_submenu_page(
            'webxros',
            'Content Settings',
            'Content',
            'manage_options',
            'webxros-content',
            array($this, 'content_settings_page')
        );
    
        add_submenu_page(
            'webxros',
            'Advanced Settings',
            'Advanced',
            'manage_options',
            'webxros-advanced',
            array($this, 'advanced_settings_page')
        );
    }

    // Enqueue admin styles and scripts
    public function admin_enqueue_scripts() {
        wp_enqueue_style('webxros-admin-style', get_template_directory_uri() . '/admin.css');
    }


    // Renders the header
    public function header() {
        ?>
        <div class="webxros-header">
            <div class="webxros-logo">
                <img src="<?php echo get_template_directory_uri(); ?>/logo.png" alt="WebXROS Logo">
            </div>
            <div class="webxros-title">
                <h1>WebXROS</h1>
                <p>Wordpress WebXR Integration theme</p>
            </div>
        </div>
        <?php
    }

    // Renders the tabs
    public function admin_menu_tabs($tabs, $current_tab) {
        $tab_menu = '<div class="wrap-tabs">';
        foreach($tabs as $slug => $label){
            $active_class = ($slug == $current_tab) ? 'nav-tab-active' : '';
            $tab_menu .= "<a href=". admin_url('admin.php?page=webxros-'.$slug)." class='nav-tab $active_class'>$label</a>";
        }
        $tab_menu .= '</div>';

        return $tab_menu;
    }

    // Callback function to display the settings page
    public function settings_page() {
        ?>
        <div class="wrap">
            <?php $this->header(); ?>
            <?php echo $this->admin_menu_tabs(self::TABS, 'basic'); ?>
            <p>Here you can configure the settings for your WebXROS theme.</p>
        </div>
        <?php
    }




    // Callback function to display the 3D Frameworks settings page
    public function frameworks_settings_page() {
        ?>
        <div class="wrap">
            <h1>3D Frameworks Settings</h1>
            <?php echo $this->get_admin_menu_tabs('frameworks'); ?>
            <p>Here you can configure the settings for the 3D Frameworks section of your WebXROS theme.</p>
        </div>
        <?php
    }

    // Callback function to display the Content settings page
    public function content_settings_page() {
        ?>
        <div class="wrap">
            <h1>Content Settings</h1>
            <?php echo $this->get_admin_menu_tabs('content'); ?>
            <p>Here you can configure the settings for the Content section of your WebXROS theme.</p>
        </div>
        <?php
    }

    // Callback function to display the Advanced settings page
    public function advanced_settings_page() {
        ?>
        <div class="wrap">
            <h1>Advanced Settings</h1>
            <?php echo $this->get_admin_menu_tabs('advanced'); ?>
            <p>Here you can configure the advanced settings for your WebXROS theme.</p>
        </div>
        <?php
    }

    // Add the admin styles
    public function add_admin_styles() {
        wp_enqueue_style('webxros-admin-style', get_template_directory_uri() . '/admin-style.css');
    }

    // Helper function to generate the admin menu tabs
    private function get_admin_menu_tabs($current_tab) {
        $tabs_html = '<h2 class="nav-tab-wrapper">';
        foreach (self::TABS as $slug => $label) {
            $active_class = ($current_tab === $slug) ? 'nav-tab-active' : '';
            $tabs_html .= sprintf(
                '<a href="%s" class="nav-tab %s">%s</a>',
                admin_url('admin.php?page=webxros-' . $slug),
                $active_class,
                $label
            );
        }
        $tabs_html .= '</h2>';

        return $tabs_html;
    }
}

new WebXROSTheme();
<<<<<<< Updated upstream
=======




class My_Plugin_Admin_Page {
    const FRAMEWORKS_META_KEY = 'my_plugin_frameworks_meta';

    // Existing code

    private function get_frameworks_form_html() {
        $frameworks_meta = get_option(self::FRAMEWORKS_META_KEY, array());
        $html = '<h2>Frameworks Settings</h2>';
        $html .= '<form method="post" action="">';
        $html .= '<table class="form-table">';
        $html .= '<tr>';
        $html .= '<th><label for="threejs_url">ThreeJS URL</label></th>';
        $html .= '<td><input type="text" name="threejs_cdn_url" id="threejs_cdn_url" value="' . esc_attr($frameworks_meta['threejs_cdn_url']) . '"></td>';
        $html .= '</tr>';
        $html .= '<tr>';
        $html .= '<th><label for="aframe_url">A-Frame URL</label></th>';
        $html .= '<td><input type="text" name="aframe_url" id="aframe_cdn_url" value="' . esc_attr($frameworks_meta['aframe_cdn_url']) . '"></td>';
        $html .= '</tr>';
        $html .= '<tr>';
        $html .= '<th><label for="babylonjs_url">BabylonJS CDN URL</label></th>';
        $html .= '<td><input type="text" name="babylonjs_url" id="babylonjs_cdn_url" value="' . esc_attr($frameworks_meta['babylonjs_cdn_url']) . '"></td>';
        $html .= '</tr>';
        $html .= '<tr>';
        $html .= '<th><label for="babylonjs_url">ReactThreeFiber CDN URL</label></th>';
        $html .= '<td><input type="text" name="babylonjs_url" id="babylonjs_cdn_url" value="' . esc_attr($frameworks_meta['babylonjs_cdn_url']) . '"></td>';
        $html .= '</tr>';
        $html .= '</table>';
        $html .= '<p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes"></p>';
        $html .= '</form>';

        return $html;
    }

    // Existing code
}

>>>>>>> Stashed changes
/*    
    add_action('admin_menu', 'webxros_admin_menu');

function webxros_admin_menu() {
    add_menu_page(
        'WebXROS', // Page title
        'WebXROS', // Menu title
        'manage_options', // Capability required to access the page
        'webxros', // Menu slug
        'webxros_settings_page', // Callback function to display the page content
        'dashicons-admin-generic', // Icon URL
        30 // Position in the menu
    );
    
    // Add submenu items
    add_submenu_page(
        'webxros', // Parent slug
        'Basic', // Page title
        'Basic', // Menu title
        'manage_options', // Capability required to access the page
        'webxros-basic', // Menu slug
        'webxros_basic_settings_page' // Callback function to display the page content
    );
    
    add_submenu_page(
        'webxros', // Parent slug
        '3D Frameworks', // Page title
        '3D Frameworks', // Menu title
        'manage_options', // Capability required to access the page
        'webxros-3d-frameworks', // Menu slug
        'webxros_3d_frameworks_settings_page' // Callback function to display the page content
    );
    
    add_submenu_page(
        'webxros', // Parent slug
        'Content', // Page title
        'Content', // Menu title
        'manage_options', // Capability required to access the page
        'webxros-content', // Menu slug
        'webxros_content_settings_page' // Callback function to display the page content
    );
    
    add_submenu_page(
        'webxros', // Parent slug
        'Advanced', // Page title
        'Advanced', // Menu title
        'manage_options', // Capability required to access the page
        'webxros-advanced', // Menu slug
        'webxros_advanced_settings_page' // Callback function to display the page content
    );
}


function webxros_admin_menu_tab($tab){

}


function webxros_admin_menu_tabs($tabs,$current_tab){
    // pass $tabs as comma separated list of labels
    $tabs = explode(",",$tabs);
    $tab_menu = '<div class="wrap-tabs">';
    foreach($tabs as $t =>$tab){
        $label = $tab; // the tab itself is the label.
        $slug = sanitize_title($tab); //turns the label into a slug
        $tab_menu .= "<a href=". admin_url("admin.php?page=webxros-$slug")." class='nav-tab'>$label</a>";


    }
    $tab_menu .= '<h2>
    </div>';

    return $tab_menu;

}


function webxros_settings_page() {
    ?>
    <div class="wrap">
        <h1>WebXROS Settings</h1>
        <?php print webxros_admin_menu_tabs("Basic,3D Frameworks,Content,Advanced","basic");?>
        <p>Here you can configure the settings for your WebXROS theme.</p>
    </div>
    <?php
}
function webxros_3d_frameworks_settings_page() {
    ?>
    <div class="wrap">
        <h1>3D Frameworks Settings</h1>
        <p>These are some 3D frameworks settings.</p>
    </div>
    <?php
}

function webxros_content_settings_page() {
    ?>
    <div class="wrap">
        <h1>Content Settings</h1>
        <p>These are some content settings.</p>
    </div>
    <?php
}

function webxros_advanced_settings_page() {
    ?>
    <div class="wrap">
        <h1>Advanced Settings</h1>
        <p>These are some advanced settings.</p>
    </div>
    <?php
}

//Add CSS styles for the tabs
function webxros_admin_styles() {
    echo '<style>
            .nav-tab-wrapper {
                margin-bottom: 20px;
            }
            
            .nav-tab {
                margin-right: 10px;
            }
        </style>';
}

add_action('admin_print_styles', 'webxros_admin_styles');
function webxros_basic_settings_page() {
    ?>
    <div class="wrap">
        <h1>Basic Settings</h1>
        <p>These are some basic settings.</p>
    </div>
    <?php
}
*/
?>