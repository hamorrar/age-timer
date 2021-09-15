const St = imports.gi.St;
const Clutter = imports.gi.Clutter;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;

const MILLI_TO_YEARS = 31556952000;

// YYYY-MM-DDTHH:MM:SS in 24hr format.
const bdayString = "2000-05-20T00:15:00";

let panelAgeText, panelButton, timeout;

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
    const bday = new Date(bdayString);
    const now = new Date();
    panelAgeText.set_text(((now-bday)/MILLI_TO_YEARS).toFixed(9).toString());
    return true;
}

function disable() {
    Mainloop.source_remove(timeout);
    Main.panel._rightBox.remove_child(button);
}