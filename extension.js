const St = imports.gi.St;
const Clutter = imports.gi.Clutter;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const Mainloop = imports.mainloop;

let panelAgeText, panelButton, timeout;

let counter = 0;

function init() {
    panelButton = new St.Bin({
        style_class: "panel-button"
    });
    
    panelAgeText = new St.Label({ text: "Initializing", style_class: "panelAgeText", y_align: Clutter.ActorAlign.CENTER });
    panelButton.set_child(panelAgeText);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(panelButton, 0);
    timeout = Mainloop.timeout_add(1, calculateAge);
}

function calculateAge() {
    let bday = new Date('2000-05-20T00:15:00');
    let now = new Date();
    panelAgeText.set_text(((now-bday)/31556952000).toFixed(9).toString());
    return true;
}

function disable() {
    Mainloop.source_remove(timeout);
    Main.panel._rightBox.remove_child(button);
}