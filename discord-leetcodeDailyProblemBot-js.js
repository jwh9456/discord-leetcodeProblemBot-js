import Discord from "discord.js";
import { LeetCode } from "leetcode-query";
import cron from "node-cron";

const leetcode = new LeetCode();
const client = new Discord.Client();

// When the client is ready, we will start listening for messages
client.once("ready", () => {
  console.log("Ready!");
  cron.schedule("0 9 * * *", async () => {
    try {

      let dailyProblem = await leetcode.daily();
      let embed = await new Discord.MessageEmbed()

        .setTitle(`${dailyProblem.question.title}`)
        .setURL(`https://leetcode.com${dailyProblem.link}`)
        .setDescription(`Difficulty: ${dailyProblem.question.difficulty}`);

      await client.channels.cache.get("1067369939637370884").send(embed);
      // await message.channel.send(embed);
    } catch (error) {
      await client.channels.cache.get("1067369939637370884").send(error);
      console.log(error);
    }
  })
});

// Start the client
client.login("myBotKey");