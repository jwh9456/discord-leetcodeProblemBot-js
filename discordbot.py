import discord
from discord.ext.commands import Bot
import DBHandler as sql

discord_token = "MTAyMzgxMTAwMjY0MDM3OTkyOA.Gqhh28.46CAViYnLbmBVvWeHLXZEwi7BDT96frB92J3EA"


intents = discord.Intents.default()

# !로 시작하면 명령어로 인식
bot = Bot(command_prefix='!', intents=intents)


@bot.event
async def on_ready():
  print(f'logged in as {bot.user}')

# !hello 명령어 처리


@bot.command()
async def hello(ctx):
  await ctx.reply('Hi, there!')

# !bye 명령어 처리


@bot.command()
async def bye(ctx):
  await ctx.reply('See you later!')

@bot.command()
async def find(ctx):
    sql.cur.execute("SELECT * from freelancer")
    await ctx.reply(sql.cur.fetchall())


bot.run(discord_token)
