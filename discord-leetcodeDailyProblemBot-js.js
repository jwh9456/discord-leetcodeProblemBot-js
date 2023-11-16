import Discord from "discord.js";
import {LeetCode} from "leetcode-query";
import cron from "node-cron";


const intents = new Discord.IntentsBitField(32767);
const client = new Discord.Client({ intents: intents });

const alert = async (event, context) => {
  try {
    await client.login("botkey");
    client.on("ready", async () => {
      try {
        const leetcode = new LeetCode();
        let dailyProblem = await leetcode.daily();
        let embed = await new Discord.EmbedBuilder()
          .setTitle(`${dailyProblem.question.title}`)
          .setURL(`https://leetcode.com${dailyProblem.link}`)
          .setDescription(`Difficulty: ${dailyProblem.question.difficulty}`)
          .setColor(0x00AE86);

        let channel = await client.channels.cache.get("chKey");
        if (channel) {
          await channel.send({ embeds: [embed] });
          await client.destroy();
          process.exit();
        } else {
          console.error("Channel not found");
        }
      } catch (error) {
        console.error(error);
      }
    });

    return { statusCode: 200, body: "Success" };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: "Error" };
  }
};

cron.schedule('* 9 * * *', alert());
