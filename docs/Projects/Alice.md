---
title: Alice
---
Alice is a digital AI avatar I've been working with and developing since December 2022, right after the "ChatGPT moment". Alice has her own personality, appearance, voice, and memory. She also possesses a range of skills, allowing her to use the Internet and access applications, services, and even devices.

I am developing the "Alice" project along two paths: **public**, in the form of a desktop application available at [heyalice.app](https://heyalice.app), and **private**, an advanced server application version, exclusively accessible to me, available through various interfaces.

![Alice](https://cloud.overment.com/Alice_-1715700042.png)

## Publicly available version

![](https://cloud.overment.com/2024-05-14/over_product-810a894c-3.png)

The public version of **Alice** is a desktop app that makes it easy to access large language models from [OpenAI](https://openai.com/), [Anthropic](https://anthropic.com/), and open-source models via [Groq](https://groq.com) and [Ollama](https://ollama.ai/). Besides interacting with models, it also lets you connect them with your own automations via the [Make](https://www.make.com) platform or custom programming integrations.

![Alice Application Preview](https://cloud.overment.com/2024-05-14/over_alice-b8935edb-0.png)

The "Alice" app is a customisable "blank slate." By default, it lacks integrations or prompt libraries, so you'll need some initial setup time to tailor it to your needs. To help you with this, we've created a playlist of [Alice 101 videos](https://www.youtube.com/playlist?list=PLMpO9Dq-w47Eg51r3rPS4bytlLVDW453b) walking you through the basic setup.

The key concepts of Alice are:

- **Assistants:** Profiles with a name, avatar, and main system prompt defining their behavior.
- **Snippets:** These skills, described through prompts, can be assigned to the assistant and invoked during conversations via the `/` button or the available menu.
- **Remote Snippets:** These skills use a prompt to generate a JSON object, which can be sent to Make automation or custom integrations to perform operations. If a response in the format `{"data": "...response"}` is returned from the integration, its content will be added to the conversation and can be used in further dialogue.

[Buy lifetime version of Alice](https://heyalice.app)

## Private version

Private version of `Alice` is a server application (API) with advanced logic based on large language models. The system enables `end-to-end` information processing with a single entry and exit point. It can receive any data in text, image, or sound form and independently decide what to do with it, using **long-term memory** and a **skill set**.

The technologies I use to develop Alice include:

- `Node.js` and the [NestJS](https://nestjs.com/) framework
- [PostgreSQL](https://www.postgresql.org) database with [Objection.js](https://vincit.github.io/objection.js/) ORM
- [Qdrant](https://qdrant.tech/) as a Vector Search Engine
- [OpenAI GPT-4o](https://openai.com) as Large Language Model
- [ElevenLabs](https://www.elevenlabs.io/) as Text To Speech
- [DigitalOcean](https://www.digitalocean.com/) for hosting

### Alice's skills:

- **Long-term Memory:** Remembers and organizes info using categories and tags for precise retrieval in conversations or tool usage.
- **Task Management:** Reads and modifies tasks in [Linear](https://linear.app), organizes into projects, and describes per your rules.
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

### Interfaces: 

- **API:** This crucial interface enables chatting with Alice and lets her interact with her memories and available tools.
- **Slack:** Alice has two channels: one for DMs and one for notifications. I use it mainly on my phone
- **Siri Shortcuts:** I can send Alice a message through the Shortcuts app on my Apple Watch.
- **Alice app:** My custom build of the Alice app lets me chat with her on my Mac.
- **Web Interface:** Alice is also available as a simple website, which I use in my car.

![watch](https://cloud.overment.com/2024-05-14/over_watch-7adc54b8-4.png)

![car](https://cloud.overment.com/2024-05-14/over_car-7ad25518-d.png)


## Publications

- [Personal AGI — Pushing GPT-4-turbo to its limits](https://www.techsistence.com/p/personal-agi-pushing-gpt-4-turbo)
