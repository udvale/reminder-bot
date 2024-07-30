# Task Reminder Bot
A simple Telegram bot to help you manage your daily tasks by sending reminders at specified intervals. This bot allows you to add tasks, set reminders, mark tasks as done, and view your task list.

<div style="display: flex; gap: 20px;">
  <img src="https://github.com/user-attachments/assets/c1b1c466-ff5c-42f4-a867-13c6804af1f3" alt="Screenshot 2024-07-30 180746" width="450" style="border: 2px solid rgba(0, 0, 0, 0.2); border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); display: block;"/>
  <img src="https://github.com/user-attachments/assets/1f6e52cf-a614-4cfc-8f91-98b8554a3a66" alt="Screenshot 2024-07-30 180759" width="450" height="425" style="border: 2px solid rgba(0, 0, 0, 0.2); border-radius: 15px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); display: block;" />
</div>

## Features
- Add Tasks: Use /task to add tasks for the day.
- Set Reminders: Use /settime to set how often you want to receive reminders (in minutes or hours).
- Mark Tasks Done: Use /done to mark specific tasks as completed.
- Mark All Tasks Done: Use /doneall to mark all tasks as completed for the day.
- View Tasks: Use /viewtasks to see the list of current tasks.
- Help: Use /help to get a list of available commands and their descriptions.

## Setup
### Prerequisites
- Node.js (version 14 or later)
- A Telegram bot token (get one by talking to BotFather)

### Installation 
1. Clone Repository
    ```sh
   git clone https://github.com/udvale/reminder-bot.git
    cd reminder-bot
   ```
3. Install Dependencies
   ```sh
   npm install
   ```
5. Set up environment variable by creating `.env` file
   ```sh
   TELE_TOKEN=your_telegram_bot_token_here
   ```
7. Run Bot
      ```sh
   node bot.js
   ```
