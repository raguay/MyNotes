'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var WorkbenchPlugin = /** @class */ (function (_super) {
    __extends(WorkbenchPlugin, _super);
    function WorkbenchPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkbenchPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //load data from saved settings
                        _a = this;
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        //load data from saved settings
                        _a.settings = (_b.sent()) || new WorkbenchSettings();
                        this.addRibbonIcon('pencil', 'Workbench', function () {
                            var obsidianApp = _this.app;
                            var workbenchNoteTitle = _this.settings.workbenchNoteName;
                            var files = obsidianApp.vault.getFiles();
                            var workbenchNoteFile = files.filter(function (e) { return e.name === workbenchNoteTitle //hat-tip 🎩 to @MrJackPhil for this little workflow 
                                || e.path === workbenchNoteTitle
                                || e.basename === workbenchNoteTitle; })[0];
                            obsidianApp.workspace.openLinkText(workbenchNoteTitle, workbenchNoteFile.path, true, obsidian.MarkdownPreviewView);
                        });
                        this.addCommand({
                            id: 'workbench-link-current-note',
                            name: 'Link the current note/page in your Workbench.',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.linkNoteInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-embed-current-note',
                            name: 'Embed the current note/page in your Workbench.',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.embedNoteInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-link-current-block',
                            name: 'Link the current line/block in your Workbench.',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.linkBlockInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-embed-current-block',
                            name: 'Embed the current line/block into your Workbench.',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.embedBlockInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-copy-current-block',
                            name: 'Copy the current line/block into your Workbench.',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.copyBlockIntoWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-copy-and-link-current-block',
                            name: 'Copy the current line/block into your Workbench as a markdown link to the line/block.',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.copyLineAndLinkToBlock();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-link-current-section',
                            name: 'Link the current heading/section into your Workbench.',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.linkSectionInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'workbench-embed-current-section',
                            name: 'Embed the current heading/section into your Workbench.',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.embedSectionInWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'clear-workbench',
                            name: 'Clear the workbench note.',
                            callback: function () {
                                _this.clearWorkbench();
                            }
                        });
                        this.addCommand({
                            id: 'insert-workbench',
                            name: 'Insert the contents of the workbench note.',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.insertWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addCommand({
                            id: 'choose-new-workbench',
                            name: 'Change your Workbench.',
                            checkCallback: function (checking) {
                                var leaf = _this.app.workspace.activeLeaf;
                                if (leaf) {
                                    if (!checking) {
                                        _this.changeWorkbench();
                                    }
                                    return true;
                                }
                                return false;
                            }
                        });
                        this.addSettingTab(new WorkbenchSettingTab(this.app, this));
                        this.registerDomEvent(document, 'click', function (evt) {
                            if (_this.settings.altClickType != "Nothing") {
                                if (evt.altKey) {
                                    if ((evt.target.className === "internal-link") || (evt.target.className.includes("cm-hmd-internal-link"))) {
                                        _this.altClick(evt);
                                    }
                                }
                            }
                            if (_this.settings.metaAltClickType != "Nothing") {
                                if (evt.metaKey && evt.altKey) {
                                    if ((evt.target.className.includes("cm-hmd-internal-link"))) {
                                        new obsidian.Notice("Sorry, this doesn't work when you click directly on a link. Try clicking outside of the link!");
                                    }
                                    else if ((evt.target.className.includes("CodeMirror-line")) || evt.target.className.includes("cm")) {
                                        var currentFile = _this.app.workspace.activeLeaf.view.file;
                                        _this.metaAltClick(evt, currentFile);
                                    }
                                }
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    WorkbenchPlugin.prototype.onunload = function () {
        console.log('Unloading the Workbench plugin.');
    };
    WorkbenchPlugin.prototype.insertWorkbench = function () {
        var obsidianApp = this.app;
        var workbenchNoteTitle = this.settings.workbenchNoteName;
        var files = obsidianApp.vault.getFiles();
        var workbenchNoteFile = files.filter(function (e) { return e.name === workbenchNoteTitle //hat-tip 🎩 to @MrJackPhil for this little workflow 
            || e.path === workbenchNoteTitle
            || e.basename === workbenchNoteTitle; })[0];
        var currentNoteFile = obsidianApp.workspace.activeLeaf.view.file;
        var editor = obsidianApp.workspace.activeLeaf.view.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var doc = editor.getDoc();
        obsidianApp.vault.read(workbenchNoteFile).then(function (result) {
            doc.replaceRange(result, cursor);
            editor.focus();
        });
    };
    WorkbenchPlugin.prototype.clearWorkbench = function () {
        var obsidianApp = this.app;
        var workbenchNoteTitle = this.settings.workbenchNoteName;
        var editor = obsidianApp.workspace.activeLeaf.view.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var files = obsidianApp.vault.getFiles();
        var workbenchNoteFile = files.filter(function (e) { return e.name === workbenchNoteTitle //hat-tip 🎩 to @MrJackPhil for this little workflow 
            || e.path === workbenchNoteTitle
            || e.basename === workbenchNoteTitle; })[0];
        obsidianApp.vault.modify(workbenchNoteFile, "");
        editor.setCursor(cursor);
        editor.focus();
    };
    WorkbenchPlugin.prototype.saveToWorkbench = function (theMaterial, saveAction) {
        var obsidianApp = this.app;
        var editor = obsidianApp.workspace.activeLeaf.view.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var blankLine = this.settings.includeBlankLine;
        var linePrefix = this.settings.workbenchLinePrefix;
        var workbenchNoteTitle = this.settings.workbenchNoteName;
        var files = obsidianApp.vault.getFiles();
        var workbenchNoteFile = files.filter(function (e) { return e.name === workbenchNoteTitle //hat-tip 🎩 to @MrJackPhil for this little workflow 
            || e.path === workbenchNoteTitle
            || e.basename === workbenchNoteTitle; })[0];
        if (!workbenchNoteFile) {
            var noteText = linePrefix + theMaterial;
            var newWorkbenchFile = obsidianApp.vault.create(workbenchNoteTitle + ".md", noteText);
        }
        else { // The file exists 
            obsidianApp.vault.read(workbenchNoteFile).then(function (result) {
                var previousNoteText = result;
                var lineSpacing = "\n";
                if (blankLine) {
                    lineSpacing = "\n\n";
                }
                var newNoteText = previousNoteText + lineSpacing + linePrefix + theMaterial;
                obsidianApp.vault.modify(workbenchNoteFile, newNoteText);
                new obsidian.Notice("Added " + saveAction + " to the workbench.");
            });
        }
        editor.setCursor(cursor);
        editor.focus();
    };
    WorkbenchPlugin.prototype.createBlockHash = function (inputText) {
        var obsidianApp = this.app;
        var result = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < 7; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    WorkbenchPlugin.prototype.getBlock = function (inputLine, noteFile) {
        var obsidianApp = this.app;
        var noteBlocks = obsidianApp.metadataCache.getFileCache(noteFile).blocks;
        var blockString = "";
        if (noteBlocks) { // the file does contain blocks. If not, return ""
            for (var eachBlock in noteBlocks) { // iterate through the blocks. 
                var blockRegExp = new RegExp("(" + eachBlock + ")$", "gim");
                if (inputLine.match(blockRegExp)) { // if end of inputLine matches block, return it
                    blockString = eachBlock;
                    return blockString;
                }
            }
            return blockString;
        }
        return blockString;
    };
    WorkbenchPlugin.prototype.altClick = function (someMouseEvent) {
        var obsidianApp = this.app;
        var clickType = this.settings.altClickType;
        var linkPrefix = "";
        if (clickType === "Embed") {
            linkPrefix = "!";
        }
        var newMaterial = linkPrefix + "[[" + someMouseEvent.target.innerText + "]]";
        this.saveToWorkbench(newMaterial, "a link to the selected note");
    };
    WorkbenchPlugin.prototype.metaAltClick = function (someMouseEvent, activeFile) {
        var obsidianApp = this.app;
        var editor = obsidianApp.workspace.activeLeaf.view.sourceMode.cmEditor;
        var lineNumber = editor.getCursor().line;
        var lineText = editor.getLine(lineNumber);
        // Get the file and create a link to it
        var currentNoteFile = activeFile;
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var clickType = this.settings.metaAltClickType;
        if (lineText != "") {
            if (clickType === "Copy") {
                var newMaterial = lineText;
                this.saveToWorkbench(newMaterial, "a copy of the selected line/block");
            }
            else {
                var linkPrefix = "";
                if (clickType === "Embed") {
                    linkPrefix = "!";
                }
                if (this.getBlock(lineText, currentNoteFile) === "") { // The line is not already a block
                    lineText = lineText.trim();
                    var lineBlockID = this.createBlockHash(lineText).toString();
                    var lineWithBlock_1 = lineText + " ^" + lineBlockID;
                    obsidianApp.vault.read(currentNoteFile).then(function (result) {
                        var previousNoteText = result;
                        var newNoteText = previousNoteText.replace(lineText, lineWithBlock_1);
                        obsidianApp.vault.modify(currentNoteFile, newNoteText);
                    });
                }
                else {
                    var lineBlockID = this.getBlock(lineText, currentNoteFile);
                }
                var newMaterial = linkPrefix + "[[" + noteLink + "#^" + lineBlockID + "]]";
                this.saveToWorkbench(newMaterial, "a link to the selected line/block");
            }
        }
        else {
            new obsidian.Notice("There is nothing on the selected line.");
        }
    };
    WorkbenchPlugin.prototype.linkNoteInWorkbench = function () {
        var obsidianApp = this.app;
        var currentView = obsidianApp.workspace.activeLeaf.view;
        // Get the file and create a link to it
        var currentNoteFile = obsidianApp.workspace.activeLeaf.view.file;
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var editor = currentView.sourceMode.cmEditor;
        var newMaterial = "[[" + noteLink + "]]";
        this.saveToWorkbench(newMaterial, "a link to the current note");
    };
    WorkbenchPlugin.prototype.embedNoteInWorkbench = function () {
        var obsidianApp = this.app;
        // Get the file and create a link to it
        var currentNoteFile = obsidianApp.workspace.activeLeaf.view.file;
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var newMaterial = "![[" + noteLink + "]]";
        this.saveToWorkbench(newMaterial, "an embed of the current note");
    };
    WorkbenchPlugin.prototype.linkSectionInWorkbench = function () {
        var obsidianApp = this.app;
        // get the heading
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var currentNoteFile = currentView.file;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var currentLineNumber = cursor.line;
        // Stuck here. For some reason the action only works once on some sections tktktk
        var headings = obsidianApp.metadataCache.getFileCache(currentNoteFile).headings;
        var sectionHeading;
        if (!headings) {
            new obsidian.Notice("No headings found in the current document.");
            return;
        }
        else { // check what heading is closest above the current line
            for (var _i = 0, headings_1 = headings; _i < headings_1.length; _i++) {
                var eachHeading = headings_1[_i];
                var headingLineNumber = eachHeading.position.start.line;
                if (headingLineNumber > currentLineNumber) {
                    new obsidian.Notice("All headings are below the cursor. Link the note or a block instead.");
                    return;
                }
                if (headingLineNumber == currentLineNumber) {
                    sectionHeading = eachHeading;
                    break;
                }
                else if (headingLineNumber > currentLineNumber) {
                    break;
                }
                sectionHeading = eachHeading;
            }
        }
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var newMaterial = "[[" + noteLink + "#" + sectionHeading.heading + "]]";
        this.saveToWorkbench(newMaterial, "a link to the current section");
    };
    WorkbenchPlugin.prototype.embedSectionInWorkbench = function () {
        var obsidianApp = this.app;
        // get the heading
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var currentNoteFile = currentView.file;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var currentLineNumber = cursor.line;
        console.log(currentLineNumber);
        // Stuck here. For some reason the action only works once on some sections tktktk
        var headings = obsidianApp.metadataCache.getFileCache(currentNoteFile).headings;
        var sectionHeading;
        if (!headings) {
            new obsidian.Notice("No headings found in the current document.");
            return;
        }
        else { // check what heading is closest above the current line
            for (var _i = 0, headings_2 = headings; _i < headings_2.length; _i++) {
                var eachHeading = headings_2[_i];
                var headingLineNumber = eachHeading.position.start.line;
                if (headingLineNumber > currentLineNumber) {
                    new obsidian.Notice("All headings are below the cursor. Embed the note or a block instead.");
                    return;
                }
                if (headingLineNumber == currentLineNumber) {
                    sectionHeading = eachHeading;
                    break;
                }
                else if (headingLineNumber > currentLineNumber) {
                    break;
                }
                sectionHeading = eachHeading;
            }
        }
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var newMaterial = "![[" + noteLink + "#" + sectionHeading.heading + "]]";
        this.saveToWorkbench(newMaterial, "a link to the current section");
    };
    WorkbenchPlugin.prototype.linkBlockInWorkbench = function () {
        var obsidianApp = this.app;
        // get the block
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var currentNoteFile = currentView.file;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var lineText = editor.getLine(cursor.line);
        var lineBlockID = this.getBlock(lineText, currentNoteFile);
        if (this.getBlock(lineText, currentNoteFile) === "") { // The line is not already a block
            lineBlockID = this.createBlockHash(lineText).toString();
            var lineWithBlock_2 = lineText + " ^" + lineBlockID;
            obsidianApp.vault.read(currentNoteFile).then(function (result) {
                var previousNoteText = result;
                var newNoteText = previousNoteText.replace(lineText, lineWithBlock_2);
                obsidianApp.vault.modify(currentNoteFile, newNoteText);
            });
        }
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var newMaterial = "[[" + noteLink + "#^" + lineBlockID + "]]";
        this.saveToWorkbench(newMaterial, "a link to the current block");
    };
    WorkbenchPlugin.prototype.embedBlockInWorkbench = function () {
        var obsidianApp = this.app;
        // get the block
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var currentNoteFile = currentView.file;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var lineText = editor.getLine(cursor.line);
        var lineBlockID = this.getBlock(lineText, currentNoteFile);
        if (this.getBlock(lineText, currentNoteFile) === "") { // The line is not already a block
            lineBlockID = this.createBlockHash(lineText).toString();
            var lineWithBlock_3 = lineText + " ^" + lineBlockID;
            obsidianApp.vault.read(currentNoteFile).then(function (result) {
                var previousNoteText = result;
                var newNoteText = previousNoteText.replace(lineText, lineWithBlock_3);
                obsidianApp.vault.modify(currentNoteFile, newNoteText);
            });
        }
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var newMaterial = "![[" + noteLink + "#^" + lineBlockID + "]]";
        this.saveToWorkbench(newMaterial, "a link to the current block");
    };
    WorkbenchPlugin.prototype.copyBlockIntoWorkbench = function () {
        var obsidianApp = this.app;
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var lineText = editor.getLine(cursor.line);
        var newMaterial = lineText;
        this.saveToWorkbench(newMaterial, "a copy of the current block");
    };
    WorkbenchPlugin.prototype.copyLineAndLinkToBlock = function () {
        var obsidianApp = this.app;
        var currentView = obsidianApp.workspace.activeLeaf.view;
        var currentNoteFile = currentView.file;
        var editor = currentView.sourceMode.cmEditor;
        var cursor = editor.getCursor();
        var lineText = editor.getLine(cursor.line);
        var blockIDRegex = new RegExp("/(\s){0,1}[\^]{1}([a-zA-Z0-9\-]+)$/", "gim");
        var lineTextWithoutBlockID = lineText.replace(blockIDRegex, "");
        var lineBlockID = this.getBlock(lineText, currentNoteFile);
        if (this.getBlock(lineText, currentNoteFile) === "") { // The line is not already a block
            console.log("This line is not currently a block. Adding a block ID.");
            lineBlockID = this.createBlockHash(lineText).toString();
            var lineWithBlock_4 = lineText + " ^" + lineBlockID;
            obsidianApp.vault.read(currentNoteFile).then(function (result) {
                var previousNoteText = result;
                var newNoteText = previousNoteText.replace(lineText, lineWithBlock_4);
                obsidianApp.vault.modify(currentNoteFile, newNoteText);
            });
        }
        var noteLink = obsidianApp.metadataCache.fileToLinktext(currentNoteFile, currentNoteFile.path, true);
        var encodedNoteLink = encodeURIComponent(noteLink);
        var newMaterial = "[" + lineTextWithoutBlockID + "]" + "(" + encodedNoteLink + "#^" + lineBlockID + ")";
        this.saveToWorkbench(newMaterial, "a linked copy of the current block");
    };
    WorkbenchPlugin.prototype.changeWorkbench = function () {
        var obsidianApp = this.app;
        new workbenchNameModal(obsidianApp).open();
    };
    return WorkbenchPlugin;
}(obsidian.Plugin));
var workbenchNameModal = /** @class */ (function (_super) {
    __extends(workbenchNameModal, _super);
    function workbenchNameModal(app) {
        var _this = _super.call(this, app) || this;
        _this.app = app;
        return _this;
    }
    workbenchNameModal.prototype.getItems = function () {
        var files = this.app.vault.getMarkdownFiles();
        var fileList = files.map(function (file) { return file.name; });
        return fileList;
    };
    workbenchNameModal.prototype.getItemText = function (item) {
        return item;
    };
    workbenchNameModal.prototype.onChooseItem = function (item, evt) {
        var workbenchPlugin = this.app.plugins.getPlugin("workbench-obsidian");
        workbenchPlugin.settings.workbenchNoteName = item;
        workbenchPlugin.saveData(workbenchPlugin.settings);
        new obsidian.Notice("Your workbench is now " + item);
    };
    return workbenchNameModal;
}(obsidian.FuzzySuggestModal));
var WorkbenchSettings = /** @class */ (function () {
    function WorkbenchSettings() {
        this.workbenchNoteName = "Workbench";
        this.workbenchLinePrefix = "";
        this.altClickType = "Link";
        this.metaAltClickType = "Embed";
        this.includeBlankLine = false;
    }
    return WorkbenchSettings;
}());
var WorkbenchSettingTab = /** @class */ (function (_super) {
    __extends(WorkbenchSettingTab, _super);
    function WorkbenchSettingTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkbenchSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        var plugin = this.plugin;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Workbench Settings' });
        new obsidian.Setting(containerEl)
            .setName('Workbench note name')
            .setDesc('Provide a title for the workbench note. Default is Workbench.')
            .addText(function (text) {
            return text
                .setPlaceholder('Workbench')
                .setValue(plugin.settings.workbenchNoteName)
                .onChange(function (value) {
                plugin.settings.workbenchNoteName = value;
                plugin.saveData(plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Workbench line prefix')
            .setDesc('Set the prefix to each line added to Workbench. Default is nothing.')
            .addText(function (text) {
            return text
                .setPlaceholder('')
                .setValue(plugin.settings.workbenchLinePrefix)
                .onChange(function (value) {
                plugin.settings.workbenchLinePrefix = value;
                plugin.saveData(plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Blank lines')
            .setDesc('Toggle whether there should be a blank line between each Workbench entry.')
            .addToggle(function (toggle) {
            toggle.setValue(plugin.settings.includeBlankLine);
            toggle.onChange(function (value) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    plugin.settings.includeBlankLine = value;
                    plugin.saveData(plugin.settings);
                    return [2 /*return*/];
                });
            }); });
        });
        new obsidian.Setting(containerEl)
            .setName('Alt+Click type')
            .setDesc('Set what happens when you alt+click on a link. Default is to copy the link into the Workbench. Note: if your cursor is not already on the targeted line, you may need to double-click!')
            .addDropdown(function (dropDown) {
            return dropDown
                .addOption("Link", "Link selected note in Workbench")
                .addOption("Embed", "Embed selected note in Workbench")
                .addOption("Nothing", "Nothing")
                .setValue(plugin.settings.altClickType)
                .onChange(function (value) {
                plugin.settings.altClickType = value;
                plugin.saveData(plugin.settings);
                _this.display();
            });
        });
        new obsidian.Setting(containerEl)
            .setName('Meta+Alt+Click type')
            .setDesc('Set what happens when you cmd/ctrl+alt+click on a line. Default is to link the line as a block into the Workbench. Note: if your cursor is not already on the targeted line, you may need to double-click!')
            .addDropdown(function (dropDown) {
            return dropDown
                .addOption("Link", "Link block")
                .addOption("Embed", "Embed block")
                .addOption("Copy", "Copy line")
                .addOption("Nothing", "Nothing")
                .setValue(plugin.settings.metaAltClickType)
                .onChange(function (value) {
                plugin.settings.metaAltClickType = value;
                plugin.saveData(plugin.settings);
                _this.display();
            });
        });
    };
    return WorkbenchSettingTab;
}(obsidian.PluginSettingTab));

module.exports = WorkbenchPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgSGFzaCB9IGZyb20gJ2NyeXB0byc7XHJcbmltcG9ydCB7IEFwcCwgTWFya2Rvd25QcmV2aWV3VmlldywgTm90aWNlLCBQbHVnaW4sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcsIFRvZ2dsZUNvbXBvbmVudCwgRnV6enlTdWdnZXN0TW9kYWwsIFN1Z2dlc3RNb2RhbCwgVEZpbGUgfSBmcm9tICdvYnNpZGlhbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JrYmVuY2hQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHNldHRpbmdzOiBXb3JrYmVuY2hTZXR0aW5ncztcclxuXHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0XHJcblx0XHQvL2xvYWQgZGF0YSBmcm9tIHNhdmVkIHNldHRpbmdzXHJcblx0XHR0aGlzLnNldHRpbmdzID0gKGF3YWl0IHRoaXMubG9hZERhdGEoKSkgfHwgbmV3IFdvcmtiZW5jaFNldHRpbmdzKCk7XHJcblxyXG5cclxuXHRcdHRoaXMuYWRkUmliYm9uSWNvbigncGVuY2lsJywgJ1dvcmtiZW5jaCcsICgpID0+IHtcclxuXHRcdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblx0XHRcdGxldCB3b3JrYmVuY2hOb3RlVGl0bGUgPSB0aGlzLnNldHRpbmdzLndvcmtiZW5jaE5vdGVOYW1lO1xyXG5cclxuXHRcdFx0bGV0IGZpbGVzID0gb2JzaWRpYW5BcHAudmF1bHQuZ2V0RmlsZXMoKTtcclxuXHRcdFx0XHRjb25zdCB3b3JrYmVuY2hOb3RlRmlsZSA9IGZpbGVzLmZpbHRlcihlID0+IGUubmFtZSA9PT0gd29ya2JlbmNoTm90ZVRpdGxlIC8vaGF0LXRpcCDwn46pIHRvIEBNckphY2tQaGlsIGZvciB0aGlzIGxpdHRsZSB3b3JrZmxvdyBcclxuXHRcdFx0XHRcdHx8IGUucGF0aCA9PT0gd29ya2JlbmNoTm90ZVRpdGxlXHJcblx0XHRcdFx0XHR8fCBlLmJhc2VuYW1lID09PSB3b3JrYmVuY2hOb3RlVGl0bGVcclxuXHRcdFx0XHQpWzBdO1xyXG5cclxuXHRcdFx0b2JzaWRpYW5BcHAud29ya3NwYWNlLm9wZW5MaW5rVGV4dCh3b3JrYmVuY2hOb3RlVGl0bGUsIHdvcmtiZW5jaE5vdGVGaWxlLnBhdGgsIHRydWUsIE1hcmtkb3duUHJldmlld1ZpZXcpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcclxuXHRcdFx0aWQ6ICd3b3JrYmVuY2gtbGluay1jdXJyZW50LW5vdGUnLFxyXG5cdFx0XHRuYW1lOiAnTGluayB0aGUgY3VycmVudCBub3RlL3BhZ2UgaW4geW91ciBXb3JrYmVuY2guJyxcclxuXHRcdFx0Y2hlY2tDYWxsYmFjazogKGNoZWNraW5nOiBib29sZWFuKSA9PiB7IFxyXG5cdFx0XHRcdGxldCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XHJcblx0XHRcdFx0aWYgKGxlYWYpIHtcclxuXHRcdFx0XHRcdGlmICghY2hlY2tpbmcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5saW5rTm90ZUluV29ya2JlbmNoKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoeyBcclxuXHRcdFx0aWQ6ICd3b3JrYmVuY2gtZW1iZWQtY3VycmVudC1ub3RlJyxcclxuXHRcdFx0bmFtZTogJ0VtYmVkIHRoZSBjdXJyZW50IG5vdGUvcGFnZSBpbiB5b3VyIFdvcmtiZW5jaC4nLFxyXG5cdFx0XHRjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHsgXHJcblx0XHRcdFx0bGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuXHRcdFx0XHRpZiAobGVhZikge1xyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVtYmVkTm90ZUluV29ya2JlbmNoKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoeyBcclxuXHRcdFx0aWQ6ICd3b3JrYmVuY2gtbGluay1jdXJyZW50LWJsb2NrJyxcclxuXHRcdFx0bmFtZTogJ0xpbmsgdGhlIGN1cnJlbnQgbGluZS9ibG9jayBpbiB5b3VyIFdvcmtiZW5jaC4nLFxyXG5cdFx0XHRjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHsgXHJcblx0XHRcdFx0bGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuXHRcdFx0XHRpZiAobGVhZikge1xyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmxpbmtCbG9ja0luV29ya2JlbmNoKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoeyBcclxuXHRcdFx0aWQ6ICd3b3JrYmVuY2gtZW1iZWQtY3VycmVudC1ibG9jaycsXHJcblx0XHRcdG5hbWU6ICdFbWJlZCB0aGUgY3VycmVudCBsaW5lL2Jsb2NrIGludG8geW91ciBXb3JrYmVuY2guJyxcclxuXHRcdFx0Y2hlY2tDYWxsYmFjazogKGNoZWNraW5nOiBib29sZWFuKSA9PiB7IFxyXG5cdFx0XHRcdGxldCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XHJcblx0XHRcdFx0aWYgKGxlYWYpIHtcclxuXHRcdFx0XHRcdGlmICghY2hlY2tpbmcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5lbWJlZEJsb2NrSW5Xb3JrYmVuY2goKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7IFxyXG5cdFx0XHRpZDogJ3dvcmtiZW5jaC1jb3B5LWN1cnJlbnQtYmxvY2snLFxyXG5cdFx0XHRuYW1lOiAnQ29weSB0aGUgY3VycmVudCBsaW5lL2Jsb2NrIGludG8geW91ciBXb3JrYmVuY2guJyxcclxuXHRcdFx0Y2hlY2tDYWxsYmFjazogKGNoZWNraW5nOiBib29sZWFuKSA9PiB7IFxyXG5cdFx0XHRcdGxldCBsZWFmID0gdGhpcy5hcHAud29ya3NwYWNlLmFjdGl2ZUxlYWY7XHJcblx0XHRcdFx0aWYgKGxlYWYpIHtcclxuXHRcdFx0XHRcdGlmICghY2hlY2tpbmcpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5jb3B5QmxvY2tJbnRvV29ya2JlbmNoKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoeyBcclxuXHRcdFx0aWQ6ICd3b3JrYmVuY2gtY29weS1hbmQtbGluay1jdXJyZW50LWJsb2NrJyxcclxuXHRcdFx0bmFtZTogJ0NvcHkgdGhlIGN1cnJlbnQgbGluZS9ibG9jayBpbnRvIHlvdXIgV29ya2JlbmNoIGFzIGEgbWFya2Rvd24gbGluayB0byB0aGUgbGluZS9ibG9jay4nLFxyXG5cdFx0XHRjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHsgXHJcblx0XHRcdFx0bGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuXHRcdFx0XHRpZiAobGVhZikge1xyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmNvcHlMaW5lQW5kTGlua1RvQmxvY2soKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7IFxyXG5cdFx0XHRpZDogJ3dvcmtiZW5jaC1saW5rLWN1cnJlbnQtc2VjdGlvbicsXHJcblx0XHRcdG5hbWU6ICdMaW5rIHRoZSBjdXJyZW50IGhlYWRpbmcvc2VjdGlvbiBpbnRvIHlvdXIgV29ya2JlbmNoLicsXHJcblx0XHRcdGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4geyBcclxuXHRcdFx0XHRsZXQgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xyXG5cdFx0XHRcdGlmIChsZWFmKSB7XHJcblx0XHRcdFx0XHRpZiAoIWNoZWNraW5nKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMubGlua1NlY3Rpb25JbldvcmtiZW5jaCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHsgXHJcblx0XHRcdGlkOiAnd29ya2JlbmNoLWVtYmVkLWN1cnJlbnQtc2VjdGlvbicsXHJcblx0XHRcdG5hbWU6ICdFbWJlZCB0aGUgY3VycmVudCBoZWFkaW5nL3NlY3Rpb24gaW50byB5b3VyIFdvcmtiZW5jaC4nLFxyXG5cdFx0XHRjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHsgXHJcblx0XHRcdFx0bGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuXHRcdFx0XHRpZiAobGVhZikge1xyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmVtYmVkU2VjdGlvbkluV29ya2JlbmNoKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZENvbW1hbmQoeyBcclxuXHRcdFx0aWQ6ICdjbGVhci13b3JrYmVuY2gnLFxyXG5cdFx0XHRuYW1lOiAnQ2xlYXIgdGhlIHdvcmtiZW5jaCBub3RlLicsXHJcblx0XHRcdGNhbGxiYWNrOiAoKSA9PiB7IFxyXG5cdFx0XHRcdHRoaXMuY2xlYXJXb3JrYmVuY2goKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHsgXHJcblx0XHRcdGlkOiAnaW5zZXJ0LXdvcmtiZW5jaCcsXHJcblx0XHRcdG5hbWU6ICdJbnNlcnQgdGhlIGNvbnRlbnRzIG9mIHRoZSB3b3JrYmVuY2ggbm90ZS4nLFxyXG5cdFx0XHRjaGVja0NhbGxiYWNrOiAoY2hlY2tpbmc6IGJvb2xlYW4pID0+IHsgXHJcblx0XHRcdFx0bGV0IGxlYWYgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZjtcclxuXHRcdFx0XHRpZiAobGVhZikge1xyXG5cdFx0XHRcdFx0aWYgKCFjaGVja2luZykge1xyXG5cdFx0XHRcdFx0XHR0aGlzLmluc2VydFdvcmtiZW5jaCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5hZGRDb21tYW5kKHsgXHJcblx0XHRcdGlkOiAnY2hvb3NlLW5ldy13b3JrYmVuY2gnLFxyXG5cdFx0XHRuYW1lOiAnQ2hhbmdlIHlvdXIgV29ya2JlbmNoLicsXHJcblx0XHRcdGNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbikgPT4geyBcclxuXHRcdFx0XHRsZXQgbGVhZiA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmO1xyXG5cdFx0XHRcdGlmIChsZWFmKSB7XHJcblx0XHRcdFx0XHRpZiAoIWNoZWNraW5nKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuY2hhbmdlV29ya2JlbmNoKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFdvcmtiZW5jaFNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcblx0XHR0aGlzLnJlZ2lzdGVyRG9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycsIChldnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuc2V0dGluZ3MuYWx0Q2xpY2tUeXBlICE9IFwiTm90aGluZ1wiKSB7XHJcblx0XHRcdFx0aWYgKGV2dC5hbHRLZXkpIHtcclxuXHRcdFx0XHRcdGlmICgoZXZ0LnRhcmdldC5jbGFzc05hbWUgPT09IFwiaW50ZXJuYWwtbGlua1wiKSB8fCAoZXZ0LnRhcmdldC5jbGFzc05hbWUuaW5jbHVkZXMoXCJjbS1obWQtaW50ZXJuYWwtbGlua1wiKSkpIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5hbHRDbGljayhldnQpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5tZXRhQWx0Q2xpY2tUeXBlICE9IFwiTm90aGluZ1wiKSB7XHJcblx0XHRcdFx0aWYgKGV2dC5tZXRhS2V5ICYmIGV2dC5hbHRLZXkpIHtcclxuXHRcdFx0XHRcdGlmICgoZXZ0LnRhcmdldC5jbGFzc05hbWUuaW5jbHVkZXMoXCJjbS1obWQtaW50ZXJuYWwtbGlua1wiKSkpIHtcclxuXHRcdFx0XHRcdFx0bmV3IE5vdGljZShcIlNvcnJ5LCB0aGlzIGRvZXNuJ3Qgd29yayB3aGVuIHlvdSBjbGljayBkaXJlY3RseSBvbiBhIGxpbmsuIFRyeSBjbGlja2luZyBvdXRzaWRlIG9mIHRoZSBsaW5rIVwiKTtcclxuXHRcdFx0XHRcdH0gZWxzZSBpZiAoKGV2dC50YXJnZXQuY2xhc3NOYW1lLmluY2x1ZGVzKFwiQ29kZU1pcnJvci1saW5lXCIpKSB8fCBldnQudGFyZ2V0LmNsYXNzTmFtZS5pbmNsdWRlcyhcImNtXCIpKSB7XHJcblx0XHRcdFx0XHRcdGxldCBjdXJyZW50RmlsZSA9IHRoaXMuYXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLnZpZXcuZmlsZTtcclxuXHRcdFx0XHRcdFx0dGhpcy5tZXRhQWx0Q2xpY2soZXZ0LCBjdXJyZW50RmlsZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG9udW5sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coJ1VubG9hZGluZyB0aGUgV29ya2JlbmNoIHBsdWdpbi4nKTtcclxuXHR9XHJcblxyXG5cdGluc2VydFdvcmtiZW5jaCgpIHtcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cdFx0bGV0IHdvcmtiZW5jaE5vdGVUaXRsZSA9IHRoaXMuc2V0dGluZ3Mud29ya2JlbmNoTm90ZU5hbWU7XHJcblx0XHRsZXQgZmlsZXMgPSBvYnNpZGlhbkFwcC52YXVsdC5nZXRGaWxlcygpO1xyXG5cdFx0XHRjb25zdCB3b3JrYmVuY2hOb3RlRmlsZSA9IGZpbGVzLmZpbHRlcihlID0+IGUubmFtZSA9PT0gd29ya2JlbmNoTm90ZVRpdGxlIC8vaGF0LXRpcCDwn46pIHRvIEBNckphY2tQaGlsIGZvciB0aGlzIGxpdHRsZSB3b3JrZmxvdyBcclxuXHRcdFx0XHR8fCBlLnBhdGggPT09IHdvcmtiZW5jaE5vdGVUaXRsZVxyXG5cdFx0XHRcdHx8IGUuYmFzZW5hbWUgPT09IHdvcmtiZW5jaE5vdGVUaXRsZVxyXG5cdFx0XHQpWzBdO1xyXG5cdFx0XHJcblx0XHRsZXQgY3VycmVudE5vdGVGaWxlID0gb2JzaWRpYW5BcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldy5maWxlO1xyXG5cclxuXHRcdGxldCBlZGl0b3IgPSBvYnNpZGlhbkFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XHJcblx0XHRsZXQgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xyXG5cdFx0bGV0IGRvYyA9IGVkaXRvci5nZXREb2MoKTtcclxuXHJcblx0XHRvYnNpZGlhbkFwcC52YXVsdC5yZWFkKHdvcmtiZW5jaE5vdGVGaWxlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0ZG9jLnJlcGxhY2VSYW5nZShyZXN1bHQsIGN1cnNvcik7XHJcblx0XHRcdGVkaXRvci5mb2N1cygpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRjbGVhcldvcmtiZW5jaCgpIHtcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cdFx0bGV0IHdvcmtiZW5jaE5vdGVUaXRsZSA9IHRoaXMuc2V0dGluZ3Mud29ya2JlbmNoTm90ZU5hbWU7XHJcblx0XHRsZXQgZWRpdG9yID0gb2JzaWRpYW5BcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldy5zb3VyY2VNb2RlLmNtRWRpdG9yO1xyXG5cdFx0bGV0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcclxuXHRcdGxldCBmaWxlcyA9IG9ic2lkaWFuQXBwLnZhdWx0LmdldEZpbGVzKCk7XHJcblx0XHRcdGNvbnN0IHdvcmtiZW5jaE5vdGVGaWxlID0gZmlsZXMuZmlsdGVyKGUgPT4gZS5uYW1lID09PSB3b3JrYmVuY2hOb3RlVGl0bGUgLy9oYXQtdGlwIPCfjqkgdG8gQE1ySmFja1BoaWwgZm9yIHRoaXMgbGl0dGxlIHdvcmtmbG93IFxyXG5cdFx0XHRcdHx8IGUucGF0aCA9PT0gd29ya2JlbmNoTm90ZVRpdGxlXHJcblx0XHRcdFx0fHwgZS5iYXNlbmFtZSA9PT0gd29ya2JlbmNoTm90ZVRpdGxlXHJcblx0XHRcdClbMF07XHJcblxyXG5cdFx0b2JzaWRpYW5BcHAudmF1bHQubW9kaWZ5KHdvcmtiZW5jaE5vdGVGaWxlLCBcIlwiKTtcclxuXHRcdGVkaXRvci5zZXRDdXJzb3IoY3Vyc29yKTtcclxuXHRcdGVkaXRvci5mb2N1cygpO1xyXG5cdH1cclxuXHJcblx0c2F2ZVRvV29ya2JlbmNoKHRoZU1hdGVyaWFsOiBzdHJpbmcsIHNhdmVBY3Rpb246IHN0cmluZykge1xyXG5cdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblx0XHRsZXQgZWRpdG9yID0gb2JzaWRpYW5BcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldy5zb3VyY2VNb2RlLmNtRWRpdG9yO1xyXG5cdFx0bGV0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcclxuXHRcdGxldCBibGFua0xpbmUgPSB0aGlzLnNldHRpbmdzLmluY2x1ZGVCbGFua0xpbmU7XHJcblxyXG5cdFx0bGV0IGxpbmVQcmVmaXggPSB0aGlzLnNldHRpbmdzLndvcmtiZW5jaExpbmVQcmVmaXg7XHJcblx0XHRsZXQgd29ya2JlbmNoTm90ZVRpdGxlID0gdGhpcy5zZXR0aW5ncy53b3JrYmVuY2hOb3RlTmFtZTtcclxuXHJcblx0XHRsZXQgZmlsZXMgPSBvYnNpZGlhbkFwcC52YXVsdC5nZXRGaWxlcygpO1xyXG5cdFx0XHRjb25zdCB3b3JrYmVuY2hOb3RlRmlsZSA9IGZpbGVzLmZpbHRlcihlID0+IGUubmFtZSA9PT0gd29ya2JlbmNoTm90ZVRpdGxlIC8vaGF0LXRpcCDwn46pIHRvIEBNckphY2tQaGlsIGZvciB0aGlzIGxpdHRsZSB3b3JrZmxvdyBcclxuXHRcdFx0XHR8fCBlLnBhdGggPT09IHdvcmtiZW5jaE5vdGVUaXRsZVxyXG5cdFx0XHRcdHx8IGUuYmFzZW5hbWUgPT09IHdvcmtiZW5jaE5vdGVUaXRsZVxyXG5cdFx0XHQpWzBdO1xyXG5cclxuXHRcdGlmICghd29ya2JlbmNoTm90ZUZpbGUpIHtcclxuXHRcdFx0bGV0IG5vdGVUZXh0ID0gbGluZVByZWZpeCArIHRoZU1hdGVyaWFsO1xyXG5cdFx0XHRsZXQgbmV3V29ya2JlbmNoRmlsZSA9IG9ic2lkaWFuQXBwLnZhdWx0LmNyZWF0ZSh3b3JrYmVuY2hOb3RlVGl0bGUgKyBcIi5tZFwiLCBub3RlVGV4dCk7XHJcblx0XHR9IGVsc2UgeyAvLyBUaGUgZmlsZSBleGlzdHMgXHJcblx0XHRcdGxldCBwcmV2aW91c05vdGVUZXh0ID0gXCJcIjtcclxuXHRcdFx0b2JzaWRpYW5BcHAudmF1bHQucmVhZCh3b3JrYmVuY2hOb3RlRmlsZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcblx0XHRcdFx0bGV0IHByZXZpb3VzTm90ZVRleHQgPSByZXN1bHQ7XHJcblx0XHRcdFx0bGV0IGxpbmVTcGFjaW5nID0gXCJcXG5cIjtcclxuXHRcdFx0XHRpZiAoYmxhbmtMaW5lKSB7XHJcblx0XHRcdFx0XHRsaW5lU3BhY2luZyA9IFwiXFxuXFxuXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxldCBuZXdOb3RlVGV4dCA9IHByZXZpb3VzTm90ZVRleHQgKyBsaW5lU3BhY2luZyArIGxpbmVQcmVmaXggKyB0aGVNYXRlcmlhbDtcclxuXHRcdFx0XHRvYnNpZGlhbkFwcC52YXVsdC5tb2RpZnkod29ya2JlbmNoTm90ZUZpbGUsIG5ld05vdGVUZXh0KTtcclxuXHRcdFx0XHRuZXcgTm90aWNlKFwiQWRkZWQgXCIgKyBzYXZlQWN0aW9uICsgXCIgdG8gdGhlIHdvcmtiZW5jaC5cIilcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRlZGl0b3Iuc2V0Q3Vyc29yKGN1cnNvcik7XHJcblx0XHRlZGl0b3IuZm9jdXMoKTtcclxuXHR9XHJcblxyXG5cdGNyZWF0ZUJsb2NrSGFzaChpbnB1dFRleHQ6IHN0cmluZyk6IHN0cmluZyB7IC8vIENyZWRpdCB0byBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTM0OTQyNlxyXG5cdFx0XHRsZXQgb2JzaWRpYW5BcHAgPSB0aGlzLmFwcDtcclxuXHJcblx0XHRcdGxldCByZXN1bHQgPSAnJztcclxuXHRcdFx0dmFyIGNoYXJhY3RlcnMgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcclxuXHRcdFx0dmFyIGNoYXJhY3RlcnNMZW5ndGggPSBjaGFyYWN0ZXJzLmxlbmd0aDtcclxuXHRcdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgNzsgaSsrICkge1xyXG5cdFx0XHQgICByZXN1bHQgKz0gY2hhcmFjdGVycy5jaGFyQXQoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVyc0xlbmd0aCkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiByZXN1bHQ7XHJcblx0fVxyXG5cclxuXHRnZXRCbG9jayhpbnB1dExpbmU6IHN0cmluZywgbm90ZUZpbGU6IG9iamVjdCk6IHN0cmluZyB7IC8vUmV0dXJucyB0aGUgc3RyaW5nIG9mIGEgYmxvY2sgSUQgaWYgYmxvY2sgaXMgZm91bmQsIG9yIFwiXCIgaWYgbm90LlxyXG5cdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblx0XHRsZXQgbm90ZUJsb2NrcyA9IG9ic2lkaWFuQXBwLm1ldGFkYXRhQ2FjaGUuZ2V0RmlsZUNhY2hlKG5vdGVGaWxlKS5ibG9ja3M7XHJcblx0XHRsZXQgYmxvY2tTdHJpbmcgPSBcIlwiO1xyXG5cdFx0aWYgKG5vdGVCbG9ja3MpIHsgLy8gdGhlIGZpbGUgZG9lcyBjb250YWluIGJsb2Nrcy4gSWYgbm90LCByZXR1cm4gXCJcIlxyXG5cdFx0XHRmb3IgKGxldCBlYWNoQmxvY2sgaW4gbm90ZUJsb2NrcykgeyAvLyBpdGVyYXRlIHRocm91Z2ggdGhlIGJsb2Nrcy4gXHJcblx0XHRcdFx0bGV0IGJsb2NrUmVnRXhwID0gbmV3IFJlZ0V4cChcIihcIiArIGVhY2hCbG9jayArIFwiKSRcIiwgXCJnaW1cIik7XHJcblx0XHRcdFx0aWYgKGlucHV0TGluZS5tYXRjaChibG9ja1JlZ0V4cCkpIHsgLy8gaWYgZW5kIG9mIGlucHV0TGluZSBtYXRjaGVzIGJsb2NrLCByZXR1cm4gaXRcclxuXHRcdFx0XHRcdGJsb2NrU3RyaW5nID0gZWFjaEJsb2NrO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGJsb2NrU3RyaW5nO1xyXG5cdFx0XHRcdH0gXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGJsb2NrU3RyaW5nO1xyXG5cdFx0fSBcclxuXHRcdHJldHVybiBibG9ja1N0cmluZztcclxuXHR9XHJcblxyXG5cdGFsdENsaWNrKHNvbWVNb3VzZUV2ZW50OiBFdmVudCkge1xyXG5cdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblxyXG5cdFx0bGV0IGNsaWNrVHlwZSA9IHRoaXMuc2V0dGluZ3MuYWx0Q2xpY2tUeXBlO1xyXG5cclxuXHRcdGxldCBsaW5rUHJlZml4ID0gXCJcIjtcclxuXHRcdGlmIChjbGlja1R5cGUgPT09IFwiRW1iZWRcIikge1xyXG5cdFx0XHRsaW5rUHJlZml4ID0gXCIhXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IG5ld01hdGVyaWFsID0gbGlua1ByZWZpeCArIFwiW1tcIiArIHNvbWVNb3VzZUV2ZW50LnRhcmdldC5pbm5lclRleHQgKyBcIl1dXCI7XHJcblx0XHR0aGlzLnNhdmVUb1dvcmtiZW5jaChuZXdNYXRlcmlhbCwgXCJhIGxpbmsgdG8gdGhlIHNlbGVjdGVkIG5vdGVcIik7XHJcblx0fVxyXG5cclxuXHRtZXRhQWx0Q2xpY2soc29tZU1vdXNlRXZlbnQ6IEV2ZW50LCBhY3RpdmVGaWxlOiBvYmplY3QpIHtcclxuXHJcblx0XHRsZXQgb2JzaWRpYW5BcHAgPSB0aGlzLmFwcDtcclxuXHRcdGxldCBlZGl0b3IgPSBvYnNpZGlhbkFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XHJcblxyXG5cdFx0bGV0IGxpbmVOdW1iZXIgPSBlZGl0b3IuZ2V0Q3Vyc29yKCkubGluZTtcclxuXHRcdGxldCBsaW5lVGV4dCA9IGVkaXRvci5nZXRMaW5lKGxpbmVOdW1iZXIpO1xyXG5cclxuXHJcblx0XHQvLyBHZXQgdGhlIGZpbGUgYW5kIGNyZWF0ZSBhIGxpbmsgdG8gaXRcclxuXHRcdGxldCBjdXJyZW50Tm90ZUZpbGUgPSBhY3RpdmVGaWxlO1xyXG5cdFx0bGV0IG5vdGVMaW5rID0gb2JzaWRpYW5BcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChjdXJyZW50Tm90ZUZpbGUsIGN1cnJlbnROb3RlRmlsZS5wYXRoLCB0cnVlKTtcclxuXHJcblx0XHRsZXQgY2xpY2tUeXBlID0gdGhpcy5zZXR0aW5ncy5tZXRhQWx0Q2xpY2tUeXBlO1xyXG5cclxuXHRcdGlmIChsaW5lVGV4dCAhPSBcIlwiKSB7XHJcblxyXG5cdFx0XHRpZiAoY2xpY2tUeXBlID09PSBcIkNvcHlcIikge1xyXG5cdFx0XHRcdGxldCBuZXdNYXRlcmlhbCA9IGxpbmVUZXh0O1xyXG5cdFx0XHRcdHRoaXMuc2F2ZVRvV29ya2JlbmNoKG5ld01hdGVyaWFsLCBcImEgY29weSBvZiB0aGUgc2VsZWN0ZWQgbGluZS9ibG9ja1wiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRsZXQgbGlua1ByZWZpeCA9IFwiXCI7XHJcblxyXG5cdFx0XHRcdGlmIChjbGlja1R5cGUgPT09IFwiRW1iZWRcIikge1xyXG5cdFx0XHRcdFx0bGlua1ByZWZpeCA9IFwiIVwiO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuZ2V0QmxvY2sobGluZVRleHQsIGN1cnJlbnROb3RlRmlsZSkgPT09IFwiXCIpIHsgLy8gVGhlIGxpbmUgaXMgbm90IGFscmVhZHkgYSBibG9ja1xyXG5cdFx0XHRcdFx0bGluZVRleHQgPSBsaW5lVGV4dC50cmltKCk7XHJcblx0XHRcdFx0XHRsZXQgbGluZUJsb2NrSUQgPSB0aGlzLmNyZWF0ZUJsb2NrSGFzaChsaW5lVGV4dCkudG9TdHJpbmcoKTtcclxuXHRcdFx0XHRcdGxldCBsaW5lV2l0aEJsb2NrID0gbGluZVRleHQgKyBcIiBeXCIgKyBsaW5lQmxvY2tJRDtcclxuXHRcdFx0XHRcdG9ic2lkaWFuQXBwLnZhdWx0LnJlYWQoY3VycmVudE5vdGVGaWxlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0XHRcdFx0bGV0IHByZXZpb3VzTm90ZVRleHQgPSByZXN1bHQ7XHJcblx0XHRcdFx0XHRcdGxldCBuZXdOb3RlVGV4dCA9IHByZXZpb3VzTm90ZVRleHQucmVwbGFjZShsaW5lVGV4dCwgbGluZVdpdGhCbG9jayk7XHJcblx0XHRcdFx0XHRcdG9ic2lkaWFuQXBwLnZhdWx0Lm1vZGlmeShjdXJyZW50Tm90ZUZpbGUsIG5ld05vdGVUZXh0KTtcclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGxldCBsaW5lQmxvY2tJRCA9IHRoaXMuZ2V0QmxvY2sobGluZVRleHQsIGN1cnJlbnROb3RlRmlsZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHJcblx0XHRcdFx0bGV0IG5ld01hdGVyaWFsID0gbGlua1ByZWZpeCArIFwiW1tcIiArIG5vdGVMaW5rICsgXCIjXlwiICsgbGluZUJsb2NrSUQgKyBcIl1dXCI7XHJcblx0XHRcdFx0dGhpcy5zYXZlVG9Xb3JrYmVuY2gobmV3TWF0ZXJpYWwsIFwiYSBsaW5rIHRvIHRoZSBzZWxlY3RlZCBsaW5lL2Jsb2NrXCIpO1xyXG5cdFx0XHR9IFxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bmV3IE5vdGljZShcIlRoZXJlIGlzIG5vdGhpbmcgb24gdGhlIHNlbGVjdGVkIGxpbmUuXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bGlua05vdGVJbldvcmtiZW5jaCgpIHsgLy8gU2F2ZXMgYSBsaW5rIHRvIHRoZSBjdXJyZW50IG5vdGUgdG8gdGhlIHdvcmtiZW5jaFxyXG5cdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblx0XHRsZXQgY3VycmVudFZpZXcgPSBvYnNpZGlhbkFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3O1xyXG5cdFx0Ly8gR2V0IHRoZSBmaWxlIGFuZCBjcmVhdGUgYSBsaW5rIHRvIGl0XHJcblx0XHRsZXQgY3VycmVudE5vdGVGaWxlID0gb2JzaWRpYW5BcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldy5maWxlO1xyXG5cdFx0bGV0IG5vdGVMaW5rID0gb2JzaWRpYW5BcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChjdXJyZW50Tm90ZUZpbGUsIGN1cnJlbnROb3RlRmlsZS5wYXRoLCB0cnVlKTtcclxuXHRcdGxldCBlZGl0b3IgPSBjdXJyZW50Vmlldy5zb3VyY2VNb2RlLmNtRWRpdG9yO1xyXG5cdFx0XHJcblx0XHRsZXQgbmV3TWF0ZXJpYWwgPSBcIltbXCIgKyBub3RlTGluayArIFwiXV1cIjtcclxuXHRcdHRoaXMuc2F2ZVRvV29ya2JlbmNoKG5ld01hdGVyaWFsLCBcImEgbGluayB0byB0aGUgY3VycmVudCBub3RlXCIpO1xyXG5cdH1cclxuXHJcblx0ZW1iZWROb3RlSW5Xb3JrYmVuY2goKSB7IC8vIFNhdmVzIGFuIGVtYmVkIG9mIHRoZSBjdXJyZW50IG5vdGUgdG8gdGhlIHdvcmtiZW5jaFxyXG5cdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblx0XHQvLyBHZXQgdGhlIGZpbGUgYW5kIGNyZWF0ZSBhIGxpbmsgdG8gaXRcclxuXHRcdGxldCBjdXJyZW50Tm90ZUZpbGUgPSBvYnNpZGlhbkFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3LmZpbGU7XHJcblx0XHRsZXQgbm90ZUxpbmsgPSBvYnNpZGlhbkFwcC5tZXRhZGF0YUNhY2hlLmZpbGVUb0xpbmt0ZXh0KGN1cnJlbnROb3RlRmlsZSwgY3VycmVudE5vdGVGaWxlLnBhdGgsIHRydWUpO1xyXG5cdFx0XHJcblx0XHRsZXQgbmV3TWF0ZXJpYWwgPSBcIiFbW1wiICsgbm90ZUxpbmsgKyBcIl1dXCI7XHJcblx0XHR0aGlzLnNhdmVUb1dvcmtiZW5jaChuZXdNYXRlcmlhbCwgXCJhbiBlbWJlZCBvZiB0aGUgY3VycmVudCBub3RlXCIpO1xyXG5cdH1cclxuXHJcblx0bGlua1NlY3Rpb25JbldvcmtiZW5jaCgpIHsgLy8gU2F2ZXMgYSBsaW5rIHRvIHRoZSBjdXJyZW50IGhlYWRpbmcgdG8gdGhlIHdvcmtiZW5jaFxyXG5cdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblxyXG5cdFx0Ly8gZ2V0IHRoZSBoZWFkaW5nXHJcblx0XHRsZXQgY3VycmVudFZpZXcgPSBvYnNpZGlhbkFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3O1xyXG5cdFx0bGV0IGN1cnJlbnROb3RlRmlsZSA9IGN1cnJlbnRWaWV3LmZpbGU7XHJcblx0XHRsZXQgZWRpdG9yID0gY3VycmVudFZpZXcuc291cmNlTW9kZS5jbUVkaXRvcjtcclxuXHRcdHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XHJcblxyXG5cdFx0bGV0IGN1cnJlbnRMaW5lTnVtYmVyID0gY3Vyc29yLmxpbmU7XHJcblxyXG5cdFx0Ly8gU3R1Y2sgaGVyZS4gRm9yIHNvbWUgcmVhc29uIHRoZSBhY3Rpb24gb25seSB3b3JrcyBvbmNlIG9uIHNvbWUgc2VjdGlvbnMgdGt0a3RrXHJcblxyXG5cdFx0bGV0IGhlYWRpbmdzID0gb2JzaWRpYW5BcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoY3VycmVudE5vdGVGaWxlKS5oZWFkaW5ncztcclxuXHRcdGxldCBzZWN0aW9uSGVhZGluZztcclxuXHRcdGlmICghaGVhZGluZ3MpIHsgXHJcblx0XHRcdG5ldyBOb3RpY2UoXCJObyBoZWFkaW5ncyBmb3VuZCBpbiB0aGUgY3VycmVudCBkb2N1bWVudC5cIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gZWxzZSB7IC8vIGNoZWNrIHdoYXQgaGVhZGluZyBpcyBjbG9zZXN0IGFib3ZlIHRoZSBjdXJyZW50IGxpbmVcclxuXHRcdFx0Zm9yIChsZXQgZWFjaEhlYWRpbmcgb2YgaGVhZGluZ3MpIHtcclxuXHRcdFx0XHRsZXQgaGVhZGluZ0xpbmVOdW1iZXIgPSBlYWNoSGVhZGluZy5wb3NpdGlvbi5zdGFydC5saW5lO1xyXG5cdFx0XHRcdGlmIChoZWFkaW5nTGluZU51bWJlciA+IGN1cnJlbnRMaW5lTnVtYmVyKSB7XHJcblx0XHRcdFx0XHRuZXcgTm90aWNlKFwiQWxsIGhlYWRpbmdzIGFyZSBiZWxvdyB0aGUgY3Vyc29yLiBMaW5rIHRoZSBub3RlIG9yIGEgYmxvY2sgaW5zdGVhZC5cIilcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGhlYWRpbmdMaW5lTnVtYmVyID09IGN1cnJlbnRMaW5lTnVtYmVyKSB7XHJcblx0XHRcdFx0XHRzZWN0aW9uSGVhZGluZyA9IGVhY2hIZWFkaW5nO1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fSBlbHNlIGlmIChoZWFkaW5nTGluZU51bWJlciA+IGN1cnJlbnRMaW5lTnVtYmVyKSB7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdHNlY3Rpb25IZWFkaW5nID0gZWFjaEhlYWRpbmc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRcclxuXHRcdGxldCBub3RlTGluayA9IG9ic2lkaWFuQXBwLm1ldGFkYXRhQ2FjaGUuZmlsZVRvTGlua3RleHQoY3VycmVudE5vdGVGaWxlLCBjdXJyZW50Tm90ZUZpbGUucGF0aCwgdHJ1ZSk7XHJcblxyXG5cdFx0bGV0IG5ld01hdGVyaWFsID0gXCJbW1wiICsgbm90ZUxpbmsgKyBcIiNcIiArIHNlY3Rpb25IZWFkaW5nLmhlYWRpbmcgKyBcIl1dXCI7XHJcblx0XHR0aGlzLnNhdmVUb1dvcmtiZW5jaChuZXdNYXRlcmlhbCwgXCJhIGxpbmsgdG8gdGhlIGN1cnJlbnQgc2VjdGlvblwiKTtcclxuXHR9XHJcblxyXG5cdGVtYmVkU2VjdGlvbkluV29ya2JlbmNoKCkgeyAvLyBTYXZlcyBhbiBlbWJlZCBvZiB0aGUgY3VycmVudCBoZWFkaW5nIHRvIHRoZSB3b3JrYmVuY2hcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cclxuXHRcdC8vIGdldCB0aGUgaGVhZGluZ1xyXG5cdFx0bGV0IGN1cnJlbnRWaWV3ID0gb2JzaWRpYW5BcHAud29ya3NwYWNlLmFjdGl2ZUxlYWYudmlldztcclxuXHRcdGxldCBjdXJyZW50Tm90ZUZpbGUgPSBjdXJyZW50Vmlldy5maWxlO1xyXG5cdFx0bGV0IGVkaXRvciA9IGN1cnJlbnRWaWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XHJcblx0XHR2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xyXG5cdFxyXG5cdFx0bGV0IGN1cnJlbnRMaW5lTnVtYmVyID0gY3Vyc29yLmxpbmU7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coY3VycmVudExpbmVOdW1iZXIpXHJcblxyXG5cdFx0Ly8gU3R1Y2sgaGVyZS4gRm9yIHNvbWUgcmVhc29uIHRoZSBhY3Rpb24gb25seSB3b3JrcyBvbmNlIG9uIHNvbWUgc2VjdGlvbnMgdGt0a3RrXHJcblxyXG5cdFx0bGV0IGhlYWRpbmdzID0gb2JzaWRpYW5BcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoY3VycmVudE5vdGVGaWxlKS5oZWFkaW5ncztcclxuXHRcdGxldCBzZWN0aW9uSGVhZGluZztcclxuXHRcdGlmICghaGVhZGluZ3MpIHsgXHJcblx0XHRcdG5ldyBOb3RpY2UoXCJObyBoZWFkaW5ncyBmb3VuZCBpbiB0aGUgY3VycmVudCBkb2N1bWVudC5cIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH0gZWxzZSB7IC8vIGNoZWNrIHdoYXQgaGVhZGluZyBpcyBjbG9zZXN0IGFib3ZlIHRoZSBjdXJyZW50IGxpbmVcclxuXHRcdFx0Zm9yIChsZXQgZWFjaEhlYWRpbmcgb2YgaGVhZGluZ3MpIHtcclxuXHRcdFx0XHRsZXQgaGVhZGluZ0xpbmVOdW1iZXIgPSBlYWNoSGVhZGluZy5wb3NpdGlvbi5zdGFydC5saW5lO1xyXG5cdFx0XHRcdGlmIChoZWFkaW5nTGluZU51bWJlciA+IGN1cnJlbnRMaW5lTnVtYmVyKSB7XHJcblx0XHRcdFx0XHRuZXcgTm90aWNlKFwiQWxsIGhlYWRpbmdzIGFyZSBiZWxvdyB0aGUgY3Vyc29yLiBFbWJlZCB0aGUgbm90ZSBvciBhIGJsb2NrIGluc3RlYWQuXCIpXHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChoZWFkaW5nTGluZU51bWJlciA9PSBjdXJyZW50TGluZU51bWJlcikge1xyXG5cdFx0XHRcdFx0c2VjdGlvbkhlYWRpbmcgPSBlYWNoSGVhZGluZztcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH0gZWxzZSBpZiAoaGVhZGluZ0xpbmVOdW1iZXIgPiBjdXJyZW50TGluZU51bWJlcikge1xyXG5cdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRzZWN0aW9uSGVhZGluZyA9IGVhY2hIZWFkaW5nO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0XHJcblx0XHRsZXQgbm90ZUxpbmsgPSBvYnNpZGlhbkFwcC5tZXRhZGF0YUNhY2hlLmZpbGVUb0xpbmt0ZXh0KGN1cnJlbnROb3RlRmlsZSwgY3VycmVudE5vdGVGaWxlLnBhdGgsIHRydWUpO1xyXG5cclxuXHRcdGxldCBuZXdNYXRlcmlhbCA9IFwiIVtbXCIgKyBub3RlTGluayArIFwiI1wiICsgc2VjdGlvbkhlYWRpbmcuaGVhZGluZyArIFwiXV1cIjtcclxuXHRcdHRoaXMuc2F2ZVRvV29ya2JlbmNoKG5ld01hdGVyaWFsLCBcImEgbGluayB0byB0aGUgY3VycmVudCBzZWN0aW9uXCIpO1xyXG5cdH1cclxuXHJcblx0bGlua0Jsb2NrSW5Xb3JrYmVuY2goKSB7IC8vIExpbmtzIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSB3b3JrYmVuY2hcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cclxuXHRcdC8vIGdldCB0aGUgYmxvY2tcclxuXHRcdGxldCBjdXJyZW50VmlldyA9IG9ic2lkaWFuQXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLnZpZXc7XHJcblx0XHRsZXQgY3VycmVudE5vdGVGaWxlID0gY3VycmVudFZpZXcuZmlsZTtcclxuXHRcdGxldCBlZGl0b3IgPSBjdXJyZW50Vmlldy5zb3VyY2VNb2RlLmNtRWRpdG9yO1xyXG5cdFx0dmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcclxuXHRcdGxldCBsaW5lVGV4dCA9IGVkaXRvci5nZXRMaW5lKGN1cnNvci5saW5lKTtcclxuXHRcdGxldCBsaW5lQmxvY2tJRCA9IHRoaXMuZ2V0QmxvY2sobGluZVRleHQsIGN1cnJlbnROb3RlRmlsZSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuZ2V0QmxvY2sobGluZVRleHQsIGN1cnJlbnROb3RlRmlsZSkgPT09IFwiXCIpIHsgLy8gVGhlIGxpbmUgaXMgbm90IGFscmVhZHkgYSBibG9ja1xyXG5cdFx0XHRsaW5lQmxvY2tJRCA9IHRoaXMuY3JlYXRlQmxvY2tIYXNoKGxpbmVUZXh0KS50b1N0cmluZygpO1xyXG5cdFx0XHRsZXQgbGluZVdpdGhCbG9jayA9IGxpbmVUZXh0ICsgXCIgXlwiICsgbGluZUJsb2NrSUQ7XHJcblx0XHRcdG9ic2lkaWFuQXBwLnZhdWx0LnJlYWQoY3VycmVudE5vdGVGaWxlKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuXHRcdFx0XHRsZXQgcHJldmlvdXNOb3RlVGV4dCA9IHJlc3VsdDtcclxuXHRcdFx0XHRsZXQgbmV3Tm90ZVRleHQgPSBwcmV2aW91c05vdGVUZXh0LnJlcGxhY2UobGluZVRleHQsIGxpbmVXaXRoQmxvY2spO1xyXG5cdFx0XHRcdG9ic2lkaWFuQXBwLnZhdWx0Lm1vZGlmeShjdXJyZW50Tm90ZUZpbGUsIG5ld05vdGVUZXh0KTtcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgbm90ZUxpbmsgPSBvYnNpZGlhbkFwcC5tZXRhZGF0YUNhY2hlLmZpbGVUb0xpbmt0ZXh0KGN1cnJlbnROb3RlRmlsZSwgY3VycmVudE5vdGVGaWxlLnBhdGgsIHRydWUpO1xyXG5cclxuXHRcdGxldCBuZXdNYXRlcmlhbCA9IFwiW1tcIiArIG5vdGVMaW5rICsgXCIjXlwiICsgbGluZUJsb2NrSUQgKyBcIl1dXCI7XHJcblx0XHR0aGlzLnNhdmVUb1dvcmtiZW5jaChuZXdNYXRlcmlhbCwgXCJhIGxpbmsgdG8gdGhlIGN1cnJlbnQgYmxvY2tcIik7XHJcblx0fVxyXG5cclxuXHRlbWJlZEJsb2NrSW5Xb3JrYmVuY2goKSB7IC8vIFNhdmVzIGFuIGVtYmVkIG9mIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSB3b3JrYmVuY2hcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cclxuXHRcdC8vIGdldCB0aGUgYmxvY2tcclxuXHRcdGxldCBjdXJyZW50VmlldyA9IG9ic2lkaWFuQXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLnZpZXc7XHJcblx0XHRsZXQgY3VycmVudE5vdGVGaWxlID0gY3VycmVudFZpZXcuZmlsZTtcclxuXHRcdGxldCBlZGl0b3IgPSBjdXJyZW50Vmlldy5zb3VyY2VNb2RlLmNtRWRpdG9yO1xyXG5cdFx0dmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcclxuXHRcdGxldCBsaW5lVGV4dCA9IGVkaXRvci5nZXRMaW5lKGN1cnNvci5saW5lKTtcclxuXHJcblx0XHRsZXQgbGluZUJsb2NrSUQgPSB0aGlzLmdldEJsb2NrKGxpbmVUZXh0LCBjdXJyZW50Tm90ZUZpbGUpO1xyXG5cclxuXHRcdGlmICh0aGlzLmdldEJsb2NrKGxpbmVUZXh0LCBjdXJyZW50Tm90ZUZpbGUpID09PSBcIlwiKSB7IC8vIFRoZSBsaW5lIGlzIG5vdCBhbHJlYWR5IGEgYmxvY2tcclxuXHRcdFx0bGluZUJsb2NrSUQgPSB0aGlzLmNyZWF0ZUJsb2NrSGFzaChsaW5lVGV4dCkudG9TdHJpbmcoKTtcclxuXHRcdFx0bGV0IGxpbmVXaXRoQmxvY2sgPSBsaW5lVGV4dCArIFwiIF5cIiArIGxpbmVCbG9ja0lEO1xyXG5cdFx0XHRvYnNpZGlhbkFwcC52YXVsdC5yZWFkKGN1cnJlbnROb3RlRmlsZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcblx0XHRcdFx0bGV0IHByZXZpb3VzTm90ZVRleHQgPSByZXN1bHQ7XHJcblx0XHRcdFx0bGV0IG5ld05vdGVUZXh0ID0gcHJldmlvdXNOb3RlVGV4dC5yZXBsYWNlKGxpbmVUZXh0LCBsaW5lV2l0aEJsb2NrKTtcclxuXHRcdFx0XHRvYnNpZGlhbkFwcC52YXVsdC5tb2RpZnkoY3VycmVudE5vdGVGaWxlLCBuZXdOb3RlVGV4dCk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IG5vdGVMaW5rID0gb2JzaWRpYW5BcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChjdXJyZW50Tm90ZUZpbGUsIGN1cnJlbnROb3RlRmlsZS5wYXRoLCB0cnVlKTtcclxuXHJcblx0XHRsZXQgbmV3TWF0ZXJpYWwgPSBcIiFbW1wiICsgbm90ZUxpbmsgKyBcIiNeXCIgKyBsaW5lQmxvY2tJRCArIFwiXV1cIjtcclxuXHRcdHRoaXMuc2F2ZVRvV29ya2JlbmNoKG5ld01hdGVyaWFsLCBcImEgbGluayB0byB0aGUgY3VycmVudCBibG9ja1wiKTtcclxuXHR9XHJcblxyXG5cdGNvcHlCbG9ja0ludG9Xb3JrYmVuY2goKSB7IC8vIENvcGllcyB0aGUgY29udGVudCBvZiB0aGUgY3VycmVudCBibG9jayB0byB0aGUgd29ya2JlbmNoXHJcblx0XHRsZXQgb2JzaWRpYW5BcHAgPSB0aGlzLmFwcDtcclxuXHJcblx0XHRsZXQgY3VycmVudFZpZXcgPSBvYnNpZGlhbkFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZi52aWV3O1xyXG5cdFx0bGV0IGVkaXRvciA9IGN1cnJlbnRWaWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XHJcblx0XHR2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xyXG5cdFx0bGV0IGxpbmVUZXh0ID0gZWRpdG9yLmdldExpbmUoY3Vyc29yLmxpbmUpO1xyXG5cclxuXHRcdGxldCBuZXdNYXRlcmlhbCA9IGxpbmVUZXh0O1xyXG5cdFx0dGhpcy5zYXZlVG9Xb3JrYmVuY2gobmV3TWF0ZXJpYWwsIFwiYSBjb3B5IG9mIHRoZSBjdXJyZW50IGJsb2NrXCIpO1xyXG5cdH1cclxuXHJcblx0Y29weUxpbmVBbmRMaW5rVG9CbG9jaygpIHsgLy8gQ29waWVzIHRoZSBjb250ZW50IG9mIHRoZSBjdXJyZW50IGJsb2NrIHRvIHRoZSB3b3JrYmVuY2hcclxuXHRcdGxldCBvYnNpZGlhbkFwcCA9IHRoaXMuYXBwO1xyXG5cclxuXHRcdGxldCBjdXJyZW50VmlldyA9IG9ic2lkaWFuQXBwLndvcmtzcGFjZS5hY3RpdmVMZWFmLnZpZXc7XHJcblx0XHRsZXQgY3VycmVudE5vdGVGaWxlID0gY3VycmVudFZpZXcuZmlsZTtcclxuXHRcdGxldCBlZGl0b3IgPSBjdXJyZW50Vmlldy5zb3VyY2VNb2RlLmNtRWRpdG9yO1xyXG5cdFx0dmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcclxuXHRcdGxldCBsaW5lVGV4dCA9IGVkaXRvci5nZXRMaW5lKGN1cnNvci5saW5lKTtcclxuXHJcblx0XHRsZXQgYmxvY2tJRFJlZ2V4ID0gbmV3IFJlZ0V4cChcIi8oXFxzKXswLDF9W1xcXl17MX0oW2EtekEtWjAtOVxcLV0rKSQvXCIsIFwiZ2ltXCIpO1xyXG5cclxuXHRcdGxldCBsaW5lVGV4dFdpdGhvdXRCbG9ja0lEID0gbGluZVRleHQucmVwbGFjZShibG9ja0lEUmVnZXgsIFwiXCIpO1xyXG5cclxuXHRcdGxldCBsaW5lQmxvY2tJRCA9IHRoaXMuZ2V0QmxvY2sobGluZVRleHQsIGN1cnJlbnROb3RlRmlsZSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuZ2V0QmxvY2sobGluZVRleHQsIGN1cnJlbnROb3RlRmlsZSkgPT09IFwiXCIpIHsgLy8gVGhlIGxpbmUgaXMgbm90IGFscmVhZHkgYSBibG9ja1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlRoaXMgbGluZSBpcyBub3QgY3VycmVudGx5IGEgYmxvY2suIEFkZGluZyBhIGJsb2NrIElELlwiKTtcclxuXHRcdFx0bGluZUJsb2NrSUQgPSB0aGlzLmNyZWF0ZUJsb2NrSGFzaChsaW5lVGV4dCkudG9TdHJpbmcoKTtcclxuXHRcdFx0bGV0IGxpbmVXaXRoQmxvY2sgPSBsaW5lVGV4dCArIFwiIF5cIiArIGxpbmVCbG9ja0lEO1xyXG5cdFx0XHRvYnNpZGlhbkFwcC52YXVsdC5yZWFkKGN1cnJlbnROb3RlRmlsZSkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XHJcblx0XHRcdFx0bGV0IHByZXZpb3VzTm90ZVRleHQgPSByZXN1bHQ7XHJcblx0XHRcdFx0bGV0IG5ld05vdGVUZXh0ID0gcHJldmlvdXNOb3RlVGV4dC5yZXBsYWNlKGxpbmVUZXh0LCBsaW5lV2l0aEJsb2NrKTtcclxuXHRcdFx0XHRvYnNpZGlhbkFwcC52YXVsdC5tb2RpZnkoY3VycmVudE5vdGVGaWxlLCBuZXdOb3RlVGV4dCk7XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IG5vdGVMaW5rID0gb2JzaWRpYW5BcHAubWV0YWRhdGFDYWNoZS5maWxlVG9MaW5rdGV4dChjdXJyZW50Tm90ZUZpbGUsIGN1cnJlbnROb3RlRmlsZS5wYXRoLCB0cnVlKTtcclxuXHJcblx0XHRsZXQgZW5jb2RlZE5vdGVMaW5rID0gZW5jb2RlVVJJQ29tcG9uZW50KG5vdGVMaW5rKTtcclxuXHJcblx0XHRsZXQgbmV3TWF0ZXJpYWwgPSBcIltcIiArIGxpbmVUZXh0V2l0aG91dEJsb2NrSUQgKyBcIl1cIiArIFwiKFwiICsgZW5jb2RlZE5vdGVMaW5rICsgXCIjXlwiICsgbGluZUJsb2NrSUQgKyBcIilcIjtcclxuXHJcblx0XHR0aGlzLnNhdmVUb1dvcmtiZW5jaChuZXdNYXRlcmlhbCwgXCJhIGxpbmtlZCBjb3B5IG9mIHRoZSBjdXJyZW50IGJsb2NrXCIpO1xyXG5cdH1cclxuXHJcblx0Y2hhbmdlV29ya2JlbmNoKCkge1xyXG5cdFx0bGV0IG9ic2lkaWFuQXBwID0gdGhpcy5hcHA7XHJcblxyXG5cdFx0bmV3IHdvcmtiZW5jaE5hbWVNb2RhbChvYnNpZGlhbkFwcCkub3BlbigpO1xyXG5cdH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIHdvcmtiZW5jaE5hbWVNb2RhbCBleHRlbmRzIEZ1enp5U3VnZ2VzdE1vZGFsPHN0cmluZz4geyAvLyB0aGFua3MgdG8gTGljYXQgZm9yIHRoZSBhc3Npc3QhXHJcblx0YXBwOiBBcHA7XHJcblxyXG4gICAgY29uc3RydWN0b3IoYXBwOiBBcHApIHtcclxuICAgICAgICBzdXBlcihhcHApO1xyXG5cdFx0dGhpcy5hcHAgPSBhcHA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbXMoKTogc3RyaW5nW10ge1xyXG5cdFx0bGV0IGZpbGVzID0gdGhpcy5hcHAudmF1bHQuZ2V0TWFya2Rvd25GaWxlcygpO1xyXG5cdFx0bGV0IGZpbGVMaXN0ID0gZmlsZXMubWFwKGZpbGUgPT4gZmlsZS5uYW1lKTtcclxuICAgICAgICByZXR1cm4gZmlsZUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbVRleHQoaXRlbTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBvbkNob29zZUl0ZW0oaXRlbTogc3RyaW5nLCBldnQ6IE1vdXNlRXZlbnQgfCBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcblx0XHRsZXQgd29ya2JlbmNoUGx1Z2luID0gdGhpcy5hcHAucGx1Z2lucy5nZXRQbHVnaW4oXCJ3b3JrYmVuY2gtb2JzaWRpYW5cIik7XHJcblx0XHR3b3JrYmVuY2hQbHVnaW4uc2V0dGluZ3Mud29ya2JlbmNoTm90ZU5hbWUgPSBpdGVtO1xyXG5cdFx0d29ya2JlbmNoUGx1Z2luLnNhdmVEYXRhKHdvcmtiZW5jaFBsdWdpbi5zZXR0aW5ncyk7XHJcblx0XHRuZXcgTm90aWNlKFwiWW91ciB3b3JrYmVuY2ggaXMgbm93IFwiICsgaXRlbSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFdvcmtiZW5jaFNldHRpbmdzIHtcclxuXHR3b3JrYmVuY2hOb3RlTmFtZSA9IFwiV29ya2JlbmNoXCI7XHJcblx0d29ya2JlbmNoTGluZVByZWZpeCA9IFwiXCI7XHJcblx0YWx0Q2xpY2tUeXBlID0gXCJMaW5rXCI7XHJcblx0bWV0YUFsdENsaWNrVHlwZSA9IFwiRW1iZWRcIjtcclxuXHRpbmNsdWRlQmxhbmtMaW5lID0gZmFsc2U7XHJcbn1cclxuXHJcbmNsYXNzIFdvcmtiZW5jaFNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuXHRkaXNwbGF5KCk6IHZvaWQge1xyXG5cdFx0bGV0IHtjb250YWluZXJFbH0gPSB0aGlzO1xyXG5cdFx0Y29uc3QgcGx1Z2luOiBhbnkgPSAodGhpcyBhcyBhbnkpLnBsdWdpbjtcclxuXHJcblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHt0ZXh0OiAnV29ya2JlbmNoIFNldHRpbmdzJ30pO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnV29ya2JlbmNoIG5vdGUgbmFtZScpXHJcblx0XHRcdC5zZXREZXNjKCdQcm92aWRlIGEgdGl0bGUgZm9yIHRoZSB3b3JrYmVuY2ggbm90ZS4gRGVmYXVsdCBpcyBXb3JrYmVuY2guJylcclxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiBcclxuXHRcdFx0XHR0ZXh0XHJcblx0XHRcdFx0XHQuc2V0UGxhY2Vob2xkZXIoJ1dvcmtiZW5jaCcpXHJcblx0XHRcdFx0XHQuc2V0VmFsdWUocGx1Z2luLnNldHRpbmdzLndvcmtiZW5jaE5vdGVOYW1lKVxyXG5cdFx0XHRcdFx0Lm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHRwbHVnaW4uc2V0dGluZ3Mud29ya2JlbmNoTm90ZU5hbWUgPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0cGx1Z2luLnNhdmVEYXRhKHBsdWdpbi5zZXR0aW5ncyk7XHJcblx0XHRcdFx0fSkpO1xyXG5cclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnV29ya2JlbmNoIGxpbmUgcHJlZml4JylcclxuXHRcdFx0LnNldERlc2MoJ1NldCB0aGUgcHJlZml4IHRvIGVhY2ggbGluZSBhZGRlZCB0byBXb3JrYmVuY2guIERlZmF1bHQgaXMgbm90aGluZy4nKVxyXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IFxyXG5cdFx0XHRcdHRleHRcclxuXHRcdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignJylcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZShwbHVnaW4uc2V0dGluZ3Mud29ya2JlbmNoTGluZVByZWZpeClcclxuXHRcdFx0XHRcdC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdFx0cGx1Z2luLnNldHRpbmdzLndvcmtiZW5jaExpbmVQcmVmaXggPSB2YWx1ZTtcclxuXHRcdFx0XHRcdFx0cGx1Z2luLnNhdmVEYXRhKHBsdWdpbi5zZXR0aW5ncyk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0JsYW5rIGxpbmVzJylcclxuXHRcdFx0LnNldERlc2MoJ1RvZ2dsZSB3aGV0aGVyIHRoZXJlIHNob3VsZCBiZSBhIGJsYW5rIGxpbmUgYmV0d2VlbiBlYWNoIFdvcmtiZW5jaCBlbnRyeS4nKVxyXG5cdFx0XHQuYWRkVG9nZ2xlKCh0b2dnbGUpID0+IHtcclxuXHRcdFx0XHR0b2dnbGUuc2V0VmFsdWUocGx1Z2luLnNldHRpbmdzLmluY2x1ZGVCbGFua0xpbmUpO1xyXG5cdFx0XHRcdHRvZ2dsZS5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdHBsdWdpbi5zZXR0aW5ncy5pbmNsdWRlQmxhbmtMaW5lID0gdmFsdWU7XHJcblx0XHRcdFx0ICBcdHBsdWdpbi5zYXZlRGF0YShwbHVnaW4uc2V0dGluZ3MpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0LnNldE5hbWUoJ0FsdCtDbGljayB0eXBlJylcclxuXHRcdFx0LnNldERlc2MoJ1NldCB3aGF0IGhhcHBlbnMgd2hlbiB5b3UgYWx0K2NsaWNrIG9uIGEgbGluay4gRGVmYXVsdCBpcyB0byBjb3B5IHRoZSBsaW5rIGludG8gdGhlIFdvcmtiZW5jaC4gTm90ZTogaWYgeW91ciBjdXJzb3IgaXMgbm90IGFscmVhZHkgb24gdGhlIHRhcmdldGVkIGxpbmUsIHlvdSBtYXkgbmVlZCB0byBkb3VibGUtY2xpY2shJylcclxuXHRcdFx0LmFkZERyb3Bkb3duKGRyb3BEb3duID0+XHJcblx0XHRcdFx0ZHJvcERvd25cclxuXHRcdFx0XHRcdC5hZGRPcHRpb24oXCJMaW5rXCIsIFwiTGluayBzZWxlY3RlZCBub3RlIGluIFdvcmtiZW5jaFwiKVxyXG5cdFx0XHRcdFx0LmFkZE9wdGlvbihcIkVtYmVkXCIsIFwiRW1iZWQgc2VsZWN0ZWQgbm90ZSBpbiBXb3JrYmVuY2hcIilcclxuXHRcdFx0XHRcdC5hZGRPcHRpb24oXCJOb3RoaW5nXCIsIFwiTm90aGluZ1wiKVxyXG5cdFx0XHRcdFx0LnNldFZhbHVlKHBsdWdpbi5zZXR0aW5ncy5hbHRDbGlja1R5cGUpXHJcblx0XHRcdFx0XHQub25DaGFuZ2UoKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRcdFx0cGx1Z2luLnNldHRpbmdzLmFsdENsaWNrVHlwZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRwbHVnaW4uc2F2ZURhdGEocGx1Z2luLnNldHRpbmdzKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdFx0XHRcclxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHQuc2V0TmFtZSgnTWV0YStBbHQrQ2xpY2sgdHlwZScpXHJcblx0XHRcdC5zZXREZXNjKCdTZXQgd2hhdCBoYXBwZW5zIHdoZW4geW91IGNtZC9jdHJsK2FsdCtjbGljayBvbiBhIGxpbmUuIERlZmF1bHQgaXMgdG8gbGluayB0aGUgbGluZSBhcyBhIGJsb2NrIGludG8gdGhlIFdvcmtiZW5jaC4gTm90ZTogaWYgeW91ciBjdXJzb3IgaXMgbm90IGFscmVhZHkgb24gdGhlIHRhcmdldGVkIGxpbmUsIHlvdSBtYXkgbmVlZCB0byBkb3VibGUtY2xpY2shJylcclxuXHRcdFx0LmFkZERyb3Bkb3duKGRyb3BEb3duID0+XHJcblx0XHRcdFx0ZHJvcERvd25cclxuXHRcdFx0XHRcdC5hZGRPcHRpb24oXCJMaW5rXCIsIFwiTGluayBibG9ja1wiKVxyXG5cdFx0XHRcdFx0LmFkZE9wdGlvbihcIkVtYmVkXCIsIFwiRW1iZWQgYmxvY2tcIilcclxuXHRcdFx0XHRcdC5hZGRPcHRpb24oXCJDb3B5XCIsIFwiQ29weSBsaW5lXCIpXHJcblx0XHRcdFx0XHQuYWRkT3B0aW9uKFwiTm90aGluZ1wiLCBcIk5vdGhpbmdcIilcclxuXHRcdFx0XHRcdC5zZXRWYWx1ZShwbHVnaW4uc2V0dGluZ3MubWV0YUFsdENsaWNrVHlwZSlcclxuXHRcdFx0XHRcdC5vbkNoYW5nZSgodmFsdWU6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0XHRwbHVnaW4uc2V0dGluZ3MubWV0YUFsdENsaWNrVHlwZSA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0XHRwbHVnaW4uc2F2ZURhdGEocGx1Z2luLnNldHRpbmdzKTtcclxuXHRcdFx0XHRcdFx0dGhpcy5kaXNwbGF5KCk7XHJcblx0XHRcdFx0fSkpO1xyXG5cdH1cclxufVxyXG4iXSwibmFtZXMiOlsiTWFya2Rvd25QcmV2aWV3VmlldyIsIk5vdGljZSIsIlBsdWdpbiIsIkZ1enp5U3VnZ2VzdE1vZGFsIiwiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FB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
