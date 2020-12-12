// initial imports
import ws from "ws";
import fetch from "node-fetch";
import { EventEmitter as Emitter } from "events";
import { red, yellow, bold } from "chalk";
import os from "os"
import pako from "pako"
import { config } from "dotenv";
import handlers from "./handlers/handlers.index"

config();

export interface MessageProperties {
	content?: string;
}

export interface EmbedProperties {
	embed: {
		title?: string;
		author?: object;
		thumbnail?: string;
		description?: string;
		fields?: object[];
		colour?: string | number;
		color?: EmbedProperties["embed"]["colour"];
		footer?: object;
		image?: string;
	}
};

export interface ClientOptions {
	browser?: string;
	device?: string;
	prefix?: string;
	presence?: {name: string, type: number}
	status?: "dnd" | "invisible" | "online" | "idle"
}

export interface StatusInfo {

}

export class Client extends Emitter {
	token: string;
	socket: any;
	config: ClientOptions;
	constructor(token?: string, options?: ClientOptions) {
		super();
		if (!token) throw new Error(`${red.bold("[ERROR/websocket]")} ${red("No token was provided")}`);
		this.token = token;
		if (!options) this.config = {
			browser: "ourcord (https://github.com/ourcord/ourcord)",
			device: "ourcord (https://github.com/ourcord/ourcord)",
			status: "dnd"
		};
		else this.config = options;
	}

	connect() {
		this.emit("debug", `${yellow.bold("[NOTICE/websocket]")} ${yellow("Attempting to connect to the discord gateway")}`)
		this.socket = new ws("wss://gateway.discord.gg/?v=6&encoding=json");
		this.socket.once("open", () => {
			this.emit("debug", `${yellow.bold("[NOTICE/websocket]")} ${yellow("Attempting to login")}`);
			const data = JSON.stringify(this.getMetaData());
			this.socket.send(data);
			this.socket.once("error", (error: string) => {
				handlers.errorHandler(error, this);
			});
			this.socket.on("message", (message: any, flag: any) => {
				handlers.messageHandler(message, flag, this)
			});
			this.socket.on("close", () => {
				this.emit("debug", `${bold("[NOTICE/websocket]")} Connection closed unexpectedly. Re-attempting login`);
				this.connect();
			});
		});
	};

	destroy(reason?: string) {
		this.socket.close();
		this.emit("debug", `${red.bold("[NOTICE/websocket]")} ${red(reason ? reason : "The websocket was closed")}`)
	};

	async sendMessage(channel: string, content: string | object) {
		const url = `https://discord.com/api/v7/channels/${channel}/messages`;
		let b: MessageProperties = {};
		if (!content || !content.toString().length) throw new Error("[ERROR/discordAPI error] Cannot send a message with no content");
		if (typeof content === "string") b.content = content;
		if (typeof content === "object") b = content;
		const sent = await fetch(url, {
			method: "POST",
			headers: {
				"Authorization": `Bot ${this.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(b)
		});
		return await sent.json();
	};

	async MessageEmbed(channel: string, options: EmbedProperties) {
		const url = `https://discord.com/api/v7/channels/${channel}/messages`;
		if (!options) throw new Error('[ERROR/discordAPI error] Cannot send a message with no content')
		const data = await fetch(url, {
			method: "POST",
			headers: {
				"Authorization": `Bot ${this.token}`,
				"Content-Type" : "application/json",
			},
			body: JSON.stringify(options),
		});
		return await data.json();
	};
	async GetRestUser(userID: string) {
		const url = `https://discord.com/api/v7/users/${userID}`;
		if (!userID || !userID.toString().length) throw new Error("[ERROR/discordAPI error] Please provide a userID");
		const data = await fetch(url, {
			method: "GET",
			headers: {
				"Authorization": `Bot ${this.token}`,
				"Content-Type" : "application/json",
			},
		});
		return await data.json();
	};

	getMetaData(): object {
		const metaData = {
			op: 2,			// opcode of 2 means "identify"
			d: {			// d is for data
				token: this.token,
				properties: {
					$os: os.platform,
					$browser: this.config.browser,
					$device: this.config.device,
				},
				presence: {
					// 	activities: [{name: this.config.presence.name ? this.config.presence.name : null, type: 0}]
					status: this.config.status
				},
			}
		};
		return metaData;
	};

	evaluate(data: any, flag: any) {
		if (typeof flag !== "object") flag = {};
		if (!flag.binary) return JSON.parse(data);
		const inflateData = new pako.Inflate();
		inflateData.push(data);
		if (inflateData.err) throw new Error("An error occured while decompressing data");
		return JSON.parse(inflateData.toString());
	};

	setStatus() {

	}
}

export default Client;
