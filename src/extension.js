const ExtensionUtils = imports.misc.extensionUtils;
const Self = ExtensionUtils.getCurrentExtension();
// Other javascript files in the foobar_sample-bigforcegun@BFPC20L directory are accesible via Extension.<file name>
// const Extension = imports.ui.extensionSystem.extensions['foobar_sample-bigforcegun@BFPC20L'];
//const Convenience = Me.imports.convenience;

const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const Lang = imports.lang;
const PanelMenu = imports.ui.panelMenu;
const Clutter = imports.gi.Clutter;


const EXTENSIONDIR = Self.dir.get_path();


const ProfileIndicator = new Lang.Class({
    Name: 'CpufreqdProfileSwitcher',
    Extends: PanelMenu.Button,
    _init: function () {
        this.parent(0.0, "CPU Frequency Daemon Profile", false);

        this.statusLabel = new St.Label ({text: "Profile 1", y_expand: true, y_align: Clutter.ActorAlign.CENTER});
        let _box = new St.BoxLayout();
        _box.add_actor(this.statusLabel);
        this.actor.add_actor(_box);
    }
});

let mainMenu;

function init() {
    //let theme = imports.gi.Gtk.IconTheme.get_default();
    //theme.append_search_path (EXTENSIONDIR + "/icons");
}

function enable() {
    mainMenu = new ProfileIndicator;
    Main.panel.addToStatusArea('cpufreqd-switcher', mainMenu);
}

function disable() {
    mainMenu.remove_events();
    mainMenu.destroy();
    mainMenu = null;
    //GLib.spawn_command_line_async ("killall cpufreq-service");
}