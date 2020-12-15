"use strict";
exports.fileTree = [{ "name": "handlers", "children": [] }, { "name": "utils", "path": "/utils", "fullPath": "./documentation/docs/utils" }, { "name": "websocket", "path": "/websocket", "fullPath": "./documentation/docs/websocket" }];
exports.sidebarTree = (title = 'Mainpage') => ({ "/docs/": [{ "title": "ourcord", "collapsable": false, "children": [["", "" + title + ""], "utils", "websocket"] }] });
