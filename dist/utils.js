"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHeader = exports.activityTypesArray = exports.statusTypesArray = void 0;
exports.statusTypesArray = ['online', 'dnd', 'idle', 'invisible'];
exports.activityTypesArray = ['COMPETING', 'LISTENING', 'STREAMING', 'PLAYING'];
function authHeader(token) {
    return `Bot ${token}`;
}
exports.authHeader = authHeader;
