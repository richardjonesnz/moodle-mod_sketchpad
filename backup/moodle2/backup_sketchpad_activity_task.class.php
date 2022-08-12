<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Defines backup_sketchpad_activity_task class
 *
 * @package   mod_sketchpad
 * @category  backup
 * @copyright 2019 Richard Jones richardnz@outlook.com
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @see https://github.com/moodlehq/moodle-mod_sketchpad
 * @see https://github.com/justinhunt/moodle-mod_sketchpad */

defined('MOODLE_INTERNAL') || die;

require_once($CFG->dirroot . '/mod/sketchpad/backup/moodle2/backup_sketchpad_stepslib.php');
require_once($CFG->dirroot . '/mod/sketchpad/backup/moodle2/backup_sketchpad_settingslib.php');
/**
 * Provides the steps to perform one complete backup of the sketchpad instance
 *
 * @package   mod_sketchpad
 * @category  backup
 * @copyright 2019 Richard Jones richardnz@outlook.com
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @see https://github.com/moodlehq/moodle-mod_sketchpad
 * @see https://github.com/justinhunt/moodle-mod_sketchpad */
class backup_sketchpad_activity_task extends backup_activity_task {

    /**
     * No specific settings for this activity
     */
    protected function define_my_settings() {
    }

    /**
     * Defines a backup step to store the instance data in the sketchpad.xml file
     */
    protected function define_my_steps() {
        $this->add_step(new backup_sketchpad_activity_structure_step('sketchpad_structure', 'sketchpad.xml'));
    }

    /**
     * Encodes URLs to the index.php and view.php scripts
     *
     * @param string $content some HTML text that eventually contains URLs to the activity instance scripts
     * @return string the content with the URLs encoded
     */
    static public function encode_content_links($content) {
        global $CFG;

        $base = preg_quote($CFG->wwwroot, '/');

        // Link to the list of sketchpads.
        $search = '/('.$base.'\/mod\/sketchpad\/index.php\?id\=)([0-9]+)/';
        $content = preg_replace($search, '$@sketchpadINDEX*$2@$', $content);

        // Link to sketchpad view by moduleid.
        $search = '/('.$base.'\/mod\/sketchpad\/view.php\?id\=)([0-9]+)/';
        $content = preg_replace($search, '$@sketchpadVIEWBYID*$2@$', $content);

        return $content;
    }
}
