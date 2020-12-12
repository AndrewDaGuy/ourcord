// initial imports
import ws from "ws";
import fetch from "node-fetch";
import { EventEmitter as Emitter } from "events";
import { red, green, yellow, bold } from "chalk";
import os from "os"
import handleErr from "./handlers/error";
import handleMessage from "./handlers/message";
import zlib from "zlib-sync";
import { config } from "dotenv";

config();

export interface messageProperties {
	content?: string;
}

export interface embedProperties {
	embed: {
		title: string;
		author: object;
		thumbnail: string;
		description: string;
		fields: object[];
		colour: string | number;
		color: embedProperties["embed"]["colour"];
		footer: object;
		image: string;
	};
};

export class Client extends Emitter {
	token: string;
	socket: any;
	config: NodeJS.ProcessEnv;
	constructor(token?: string) {
		super();
		this.config = process.env;
		if (!token) throw new Error(`${red.bold("[ERROR/websocket]")} ${red("No token was provided")}`);
		this.token = token;
	}

	connect() {
		this.emit("debug", `${green.bold("[NOTICE/websocket]")} ${yellow("Attempting to connect to the discord gateway")}`)
		this.socket = new ws("wss://gateway.discord.gg/?v=6&encoding=json");
		this.socket.once("open", () => {
			this.emit("debug", `${green.bold("[NOTICE/websocket]")} ${green("Attempting to login")}`);
			const data = JSON.stringify(this.getMetaData());
			this.socket.send(data);
			this.socket.once("error", (error: string) => {
				handleErr(error, this)
			});
			this.socket.on("message", (message: any, flag: any) => {
				console.log(message);
				console.log(flag);
				console.log(this);

				handleMessage(message, flag, this)
			});
			this.socket.on("close", () => {
				this.emit("debug", `${bold("[NOTICE/websocket]")} Connection closed unexpectedly. Re-attempting login`);
				this.connect();
			});

		});
	}

	async sendMessage(channel: string, content: string | object) {
		const url = `https://discord.com/api/v7/channels/${channel}/messages`;
		let b: messageProperties = {};
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
	}

	async MessageEmbed(channel: string, options: embedProperties) {
		const url = `https://discord.com/api/v7/channels/${channel}/messages`;
		if (!options) throw new Error('CANNOT send an Empty message lol')
		const data = await fetch(url, {
			method: "POST",
			headers: {
				"Authorization": `Bot ${this.token}`,
				"Content-Type" : "application/json",
			},
			body: JSON.stringify(options),
		});
		return await data.json();
	}

	getMetaData(): object {
		const metaData = {
			op: 2,			// opcode of 2 means "identify"
			d: {			// d is for data
				token: this.token,
				properties: {
					$os: os.platform,
					$browser: "ourcord (https://github.com/alebot-dev/our.discord)",
					$device: "ourcord (https://github.com/alebot-dev/our.discord)"
				}
			}
		};
		return metaData;
	}

	evaluate(data: any, flag: any) {
		if (typeof flag !== "object") flag = {};
		if (!flag.binary) return JSON.parse(data);
		const inflateData = new zlib.Inflate();
		inflateData.push(data, zlib.Z_SYNC_FLUSH);
		if (inflateData.err) throw new Error("An error occured while decompressing data");
		return JSON.parse(inflateData.toString());
	}
}

export default Client;
