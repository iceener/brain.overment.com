---
title: Alice
---
Alice is a name that has two meanings for me:

- Alice, as a desktop app, available as a standalone product at https://heyalice.app
- Alice, as a personal agent, available just for me.

Alice is a project I've been working on since December 2022, right after the "ChatGPT moment". It quickly became my sandbox for exploring what generative AI can and cannot do. Due to its complexity, it has been a significant programming challenge, as everything I design needs to work flawlessly (or at least aim to) while remaining flexible enough to keep up with the rapid pace of changes in the field.
## Desktop Client for LLMs

![](https://cloud.overment.com/SCR-20251004-kxne-1759572322.png)

Alice is an advanced chat UI for LLMs with a minimalistic interface. It provides easy access to large language models from OpenAI, Anthropic, DeepMind, xAI, and open-source models using Groq, Ollama, or LMStudio. It also supports integration with MCP (Model Context Protocol), offering Tools, Prompts, Resources, and Sampling.

![Alice Application Preview](https://cloud.overment.com/SCR-20251004-kxud-1759572367.png)

The Alice app is a highly customizable blank slate that you can shape however you like, either by importing assistants from the library or by creating your own. 

The key concepts of Alice are:

- **Assistants:** Profiles with a name, avatar, and main system prompt that define their behavior.  
- **Skills:** These are described through prompts, can be assigned to an assistant, and invoked during conversations via the `/` button or the available menu.  
- **Tools:** Tools can be added using Model Context Protocol servers, allowing assistants to access and use external apps or services.  
- **Documents:** You can upload text-based documents and assign them to assistants so they can explore them during chats using AI agentic logic.

[Start 21-days trial](https://heyalice.app)

## Personal AI agent

Alice has her own personality, appearance, voice, memory, and skills. She can access the Internet as well as external apps and services. Technically, she is a back-end application running on my VPS and can be accessed directly through my watch, phone, or car. She can also perform background tasks triggered by schedules or external events.

![Alice](https://cloud.overment.com/alice_agi_avatar-1759570179.png)

**Tech stack:**

- `Node.js` and the [Hono](https://hono.dev/) framework and AI SDK
- SQLite with FTS, sqlite-vec and Drizzle ORM
- OpenAI/Gemini/Anthropic/xAI models
- [elevenlabs](https://www.elevenlabs.io/) as Text To Speech
- [DigitalOcean](https://www.digitalocean.com/) for hosting

**Skills:**

- **Long-term Memory:** Remembers and organizes information using categories and tags for precise retrieval in conversations or tool usage.
- **Task Management:** Reads and modifies tasks in [Linear](https://linear.app), organizes into projects, and describes according to your rules.
- **Calendar Management:** Reads and organizes calendar events.
- **Spotify:** Uses Spotify API to search, play songs on devices, and create playlists.
- **Newsfeed:** Manages your newsfeed, especially "Read Later," by adding entries from followed sources or your messages.
- **Web Search:** Searches the internet, focusing on your chosen knowledge sources.
- **Sending SMS/Email/Voice Notification:** Sends emails, SMS, or voice notifications from your Mac or phone.
- **Google Maps:** Finds place info and calculates travel time from your current location.
- **File Uploading**: Uploads given file to the FTP
- **Wolfram Alpha:** It's a skill primarily used for advanced calculations.
- **Light Management:** Control the lights in my house, turning them on and off.
- **Loading URLs**: Reads contents of the url which may be a website, youtube video, file (markdown, pdf, txt) or Notion document
- **Read Documents:** Includes actions like answering based on entire documents or fragments, generating summaries, extracting key information, extracting resources, and memorizing them.
- **Transform Documents:** Includes actions like proofreading, translation, and fact-checking.
- **Notification System:** It's the notification queue that allows Alice to notify herself about something (like finished task) or me.
- **Scheduling:** This action lets me schedule tasks for Alice

**Interfaces:**

- **API:** This crucial interface enables chatting with Alice and lets her interact with her memories and available tools.
- **Slack:** Alice has two channels: one for DMs and one for notifications. I use it mainly on my phone
- **Siri Shortcuts:** I can send a message to Alice through the Shortcuts app on my Apple Watch.
- **Alice app:** My custom build of the Alice app lets me chat with her on my Mac.
- **Web Interface:** Alice is also available as a simple website, which I use in my car.

![](https://cloud.overment.com/SCR-20251004-kwqt-1759572176.jpeg)

![](https://cloud.overment.com/SCR-20251004-kwtz-1759572197.jpeg)
