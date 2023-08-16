---
title: Alice
---

Alice is my AI assistant, whom I am primarily developing based on models provided by OpenAI. This project is evolving in both its public and private (more advanced) versions.

![](https://cloud.overment.com/alice-1685380601.png)

Her skills constantly evolve and extend well beyond text generation and question answering. She possesses long-term memory capabilities through the use of Pinecone & PostgreSQL and can leverage various tools via API integration. Additionally, she has the ability to delegate tasks to other avatars associated with my Automations and work with the information they provide. Alice, thanks to the API, is also connected to the internet and my devices, as outlined in the [Hardware](../Tools/Hardware.md) documentation. Specifically, we're referring to the Macbook, iPhone, and Apple Watch, as well as apps like [Make](../Apps/Make.md) and Slack.

[Download Alice](https://heyalice.app)

## Desktop App

One of Alice's interfaces is a desktop application, available on macOS and Windows systems. I built it using the Tauri framework (Rust & SvelteKit). The application allows me to have conversations and save snippets that include predefined prompts, as well as the ability to perform remote actions. The private version of this application also has a direct connection to the API. Snippets can also be connected to global keyboard shortcuts, so there is no need to activate the application to perform selected actions.

![](https://cloud.overment.com/alice-app-1685383431.png)

## Siri

Interaction with Alice is also possible through Siri Shortcuts, allowing me to talk to her on my computer, phone, and Apple Watch. In the case of the watch, the side button directly activates the Shortcuts macro, which uses the ElevenLabs API to generate voice in multiple languages.

![](https://cloud.overment.com/alice-siri-1685383716.png)

## Slack

Since the Alice app is currently available on desktop only, and Siri isn't sufficient for longer interactions, I use the Slack channel to communicate with Alice. An integration has been set up with a simple make.com automation scenario that monitors direct messages (DMs) between two accounts.

![](https://cloud.overment.com/slack-62a3955a-a.png)

## API 

A version of Alice, available exclusively to me, grants me access to the API and all the advanced features it offers. This includes Internet Access, the ability to process lengthy documents, remote access to various services and devices. The application I developed is built using NestJS and LangChain, and I've also created numerous scripts to enhance its functionality.

You can learn more about developing this API on my YouTube channel, especially through this playlist: https://www.youtube.com/watch?v=GJvUl-UuPI0&list=PLjHmWifVUNMJNaWSEldpN4R9NyU0voLhK.