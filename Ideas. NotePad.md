# NotePad Journal

## 02/10/2021 Moving to Codemirror 6

I haven't kept this up to date. Added many features and now working on Codemirror 6 integration. Things added to date:

- ScriptBar - functionally similar to BitBar, SwiftBar, and TextBar. So far, just able to reuse TextBar scripts.
- Node Red server with output going to ScriptBar
- External Script running from Application Launcher and ScriptBar.

## May 11, 2019, 2:38:35 PM

Completely redid the NotePad program to ScriptPad written in Svelte and running in NW.js. It is much faster than the other versions. It also has full preferences setting, todo lists, and themes! It also has integrations with Alfred, LaunchBar, Dropzone, PopClip, and Keyboard Maestro.

## April 05, 2018, 2:45:42 pm

Finished the script editor by having a delete button and hotkey (<meta>-x).

Redid the lost fix for removing line numbering.

Cleaned up a few items and commited.

## April 03, 2018, 9:04:32 pm

- Create new scripts and save them to the system.
- Update new scripts instead of deleting all scripts.
- Fix the 'Undo Line Numbering' script. It removes all lines that don't have line numbering.

Wow, major advancements have been made. The script editor is fully functional with creating and saving new scripts. The scripts have been split to builtin scripts and user scripts. Only the user scripts are saved to disk while the builtin scripts are just in the code. If you type in the name of a user script that already exists in the script editor, it loads that scripts information. You can also press <ctrl>-m so show a list of user scripts and select the one you want to edit.

More hotkeys have been assigned. <ctrl>-e shows the script editor, <ctrl>-r shows the regular expressions editor (not written), <ctrl>-s on the notes screen stops the server, <ctrl>-s on the script editor saves and closes the script editor, etc. Many bugs have been killed.

All of the builtin scripts are working and have been thoroughly debugged, until the next one shows up!

- Add more notes? Upto 9 would fit and still have easy hotkeys.

Just added the nine notes. So easy with the Vue.js design. Server side had the most difficult stuff, but that wasn't hard. Just testing the edge cases.

## March 31, 2018, 12:43:31 pm

I factored out the evaluation of a text script and added scripts to use a note as a script to evaluate on the selected text or full note. It runs it just like all the other scripts.

It's really interesting because I'm basically running a script inside of a script.

I was able to fix the first time launched not showing a note error. I moved all the server loading to the proper place inside the Vue.js component for the application.

I was also able to factor out all globals to the global NP object. I also added some of the utility functions to that object for use in scripts.

I also moved the files to the `HOME/.notepad` directory. It detects older versions and moves the notes file to that directory as well. This will give more flexibility as I add functionality.

- Add hotkey to change notes. `<cmd>+1` for note 1, etc.

Just added the hotkeys `<cmd>+1` through `<cmd>+5` for each note. Very useful!

## March 30, 2018, 11:30:10 am

- Better editor features like color highlighting, undo, redo, etc.

I migrated the editor area from a textarea to codemirror. NotePad is now fully functional text editor with all the bells and whistles.

This change also makes themes and code highlighting possible. There is color highlighting with my own theme currently.

Started moving the styles to Less. But, the build system is compiling them all the way down to CSS. Therefore, I can't use it to define the color scheme. Looking for a solution.

## March 29, 2018, 1:10:32 pm

Fixed this issue:
- After executing a script, the cursor is always at the end of the buffer.
     - fix to keep the cursor location
     - set the cursor to just after the last character inserted by the script.
- More advanced math processing of notes
     - This is done and works nice.

New items:
- Move the script menu to it’s own component.

Got the script selection working better in NotePad. Looks nice and runs smoothly. But, when the menu is up, the selection in the textarea isn’t visible.

## March 28, 2018, 4:02:13 pm

Just added mathjs and a simple math evaluator to the scripts. I also added a command to process a whole note with math lines specified with ‘>’ at the beginning. I like the way it works.

## March 24, 2018, 11:35:25 am

Added insert only scripts that places the output of the script at the current cursor location.

## March 23, 2018, 9:44:02 pm

Finished adding scripts to the NotePad. I feel the UI is much improved, but still has a long way to go.

# Things to do

- Themes and better color schemes
- Regular Expressions to edit notepads
- Saving a history of Regular Expressions
- Hamburger menu for extended functions
	- Save to disk, Read from disk, Help, About, etc.
- Extensions for Alfred, LaunchBar, Dropzone, and PopClip to work with NotePad.
- Add security to the server. Only allow connections from the localhost.
- Search and load a already created script in the script editor.
	
