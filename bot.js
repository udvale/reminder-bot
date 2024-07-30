const TelegramBot = require('node-telegram-bot-api');
const schedule = require('node-schedule');
require('dotenv').config(); 

const bot = new TelegramBot(process.env.TELE_TOKEN, { polling: true });

let tasks = [];
let reminderInterval = null;
let reminderJob = null;

//Cpmmand to start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
  Welcome to Task Reminder Bot!
  
  This bot helps you manage and remind you of your daily tasks.
  
  Commands:
  - /task <tasks> - Add tasks for the day. Seperate each task with - ;.
  - /settime <minutes|hours> - Set reminder intervals (e.g., 30m for 30 minutes, 1h for 1 hour).
  - /done <task_number> - Mark a specific task as done.
  - /doneall - Mark all tasks as done for the day.
  - /viewtasks - View the list of current tasks.
  - /help - Show this help message.
      `;
  bot.sendMessage(chatId, welcomeMessage.trim());
});

//Command to list all tasks to be done
bot.onText(/\/task (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  tasks = match[1].split(';').map(task => task.trim());
  const taskList = tasks.map((task, index) => `${index + 1}. ${task}`).join('\n');
  bot.sendMessage(chatId, `Tasks:\n${taskList}`);
});

//Command to set time for task reminder
bot.onText(/\/settime (\d+)([mh])/, (msg, match) => {
   const chatId = msg.chat.id;
   const value = parseInt(match[1], 10);
   const unit = match[2];
   let interval;

   if (unit === 'm') {
       interval = value; 
   } else if (unit === 'h') {
       interval = value * 60; 
   } else {
       bot.sendMessage(chatId, 'Invalid unit. Use `m` for minutes or `h` for hours.');
       return;
   }
   reminderInterval = interval;

   // Cancel any existing reminder job
   if (reminderJob) {
       reminderJob.cancel();
   }
   reminderJob = schedule.scheduleJob(`*/${interval} * * * *`, () => {
       bot.sendMessage(chatId, `Reminder: Don't forget to complete your tasks!`);
   });

   bot.sendMessage(chatId, `Reminder set to every ${interval} minute${interval > 1 ? 's' : ''}.`);
});

 
//Command to indicate a certain task is done
bot.onText(/\/done (\d+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const taskNumber = parseInt(match[1], 10) - 1;
  if (taskNumber >= 0 && taskNumber < tasks.length) {
    tasks.splice(taskNumber, 1);
    bot.sendMessage(chatId, `Task ${taskNumber + 1} done.`);
  } else {
    bot.sendMessage(chatId, 'Invalid task number.');
  }
});

//Command to indicate all tasks are done
bot.onText(/\/doneall/, (msg) => {
  const chatId = msg.chat.id;
  tasks = [];
  if (reminderJob) {
    reminderJob.cancel();
  }
  bot.sendMessage(chatId, 'All tasks done.');
});

//Cpmmand to view all tasks
bot.onText(/\/viewtasks/, (msg) => {
  const chatId = msg.chat.id;
  if (tasks.length > 0) {
    const taskList = tasks.map((task, index) => `${index + 1}. ${task}`).join('\n');
    bot.sendMessage(chatId, `Current Tasks:\n${taskList}`);
  } else {
    bot.sendMessage(chatId, 'No tasks to show.');
  }
});

//Help command to list commands
bot.onText(/\/help/, (msg) => {
   const chatId = msg.chat.id;
   const helpMessage = `
Commands:
- /task <tasks> - Add tasks for the day (separated by semicolons).
- /settime <minutes|hours> - Set reminder intervals (e.g., 30m for 30 minutes, 1h for 1 hour).
- /done <task_number> - Mark a specific task as done.
- /doneall - Mark all tasks as done for the day.
- /viewtasks - View the list of current tasks.
- /help - Show this help message.
   `;
   bot.sendMessage(chatId, helpMessage.trim());
});

