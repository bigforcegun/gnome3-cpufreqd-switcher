/* -*- Mode: js2; indent-tabs-mode: t; c-basic-offset: 4; tab-width: 4 -*-  */
/*
 * extension.js
 * Copyright (C) 2017 bigforcegun <bigforcegun@BFPC20L>
 * 
 * foobar-sample is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the
 * Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * foobar-sample is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

// Other javascript files in the foobar_sample-bigforcegun@BFPC20L directory are accesible via Extension.<file name>
const Extension = imports.ui.extensionSystem.extensions['foobar_sample-bigforcegun@BFPC20L'];

let text, button;

function _hideHello() {
	Main.uiGroup.remove_actor(text);
	text = null;
}

function _showHello() {
	if (!text) {
		text = new St.Label({ style_class: '-label', text: "Hello, world!" });
		Main.uiGroup.add_actor(text);
	}

	text.opacity = 255;

	let monitor = Main.layoutManager.primaryMonitor;

	text.set_position(Math.floor(monitor.width / 2 - text.width / 2),
		Math.floor(monitor.height / 2 - text.height / 2));

	Tweener.addTween(text,
		{ opacity: 0,
		time: 2,
		transition: 'easeOutQuad',
		onComplete: _hideHello });
}

function init() {
	button = new St.Bin({ style_class: 'panel-button',
	                      reactive: true,
	                      can_focus: true,
	                      x_fill: true,
	                      y_fill: false,
	                      track_hover: true });
	let icon = new St.Icon({ icon_name: 'system-run',
	                         icon_type: St.IconType.SYMBOLIC,
	                         style_class: 'system-status-icon' });

	button.set_child(icon);
	button.connect('button-press-event', _showHello);
}

function enable() {
	Main.panel._rightBox.insert_actor(button, 0);
}

function disable() {
	Main.panel._rightBox.remove_actor(button);
}

