require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/gtt-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/gtt-flip", async ({ ack, respond }) => {
  await ack();
  const result = Math.random() < 0.5 ? "Heads" : "Tails";
  await respond({ text: `🪙 ${result}!` });
});

app.command("/gtt-roll", async ({ command, ack, respond }) => {
  await ack();
  const sides = parseInt(command.text.trim(), 10) || 6;
  if (sides < 2) {
    await respond({ text: "🎲 A die needs at least 2 sides. Try `/gtt-roll 20`." });
    return;
  }
  const roll = Math.floor(Math.random() * sides) + 1;
  await respond({ text: `🎲 You rolled a ${roll} (d${sides})` });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
