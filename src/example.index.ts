import Client from './websocket';
const client = new Client(process.env.TOKEN, {
  status: 'dnd',
  cacheGuilds: true,
  cacheChannels: true,
  cacheUsers: true,
  cacheMembers: true,
});
client.connect();

client.on('ready', () => {
  console.log('Client connected to discord API');
});

client.on('debug', (log) => {
  console.log(log);
});

client.on('message', async (msg: any) => {
  if (msg.author.bot) return;
  if (msg.content == 'stupid servers') {
    console.log(client.cache.guilds.size)
    msg.channel.send(`Servers: ${client.cache.guilds.size}`)
  }
});
