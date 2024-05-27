import OpenAI from "openai";
import dotenv from "dotenv";
import chalk from "chalk";
import readlineSync from "readline-sync";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.clear();

console.log(
  chalk.yellow(`
     o      ooooo        oooooooo8 oooo                   o8   
    888      888       o888     88  888ooooo    ooooooo o888oo 
   8  88     888       888          888   888   ooooo888 888   
  8oooo88    888       888o     oo  888   888 888    888 888   
o88o  o888o o888o       888oooo88  o888o o888o 88ooo88 8o 888o 
                                                               `)
);

const messages = [];

while (true) {
  const userContent = readlineSync.question(chalk.cyan("User: "));

  if (userContent.toLowerCase() === "exit") {
    console.log(chalk.red("Assistant:") + " Goodbye!");
    break;
  }

  const userMessage = { role: "user", content: userContent };
  messages.push(userMessage);

  const aiResponse = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-4o",
  });

  const aiMessage = aiResponse.choices[0].message;
  messages.push(aiMessage);

  console.log(chalk.red("Assistant: ") + aiMessage.content);
}
