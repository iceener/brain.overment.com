## Initialize Model

```ts
const model = new OpenAI({ openAIApiKey: "sk-...", temperature: 0.9 });
```

## Basic call

```ts
const res = await model.call(  
"What would be a good company name a company that makes colorful socks?"  
);  
console.log(res); // { res: '\n\nFantasy Sockery' }
```

## Prompt Templates

```ts
import { PromptTemplate } from "langchain/prompts";  
  
const template = "What is a good name for a company that makes {product}?";  
const prompt = new PromptTemplate({  
	template: template,  
	inputVariables: ["product"],  
});

// formatting
const res = await prompt.format({ product: "colorful socks" });  
console.log(res); // { res: 'What is a good name for a company that makes colorful socks?' }

```

## Chains

```ts
import { OpenAI } from "langchain/llms/openai";  
import { PromptTemplate } from "langchain/prompts";  
  
const model = new OpenAI({ temperature: 0.9 });  
const template = "What is a good name for a company that makes {product}?";  
const prompt = new PromptTemplate({  
	template: template,  
	inputVariables: ["product"],  
});

import { LLMChain } from "langchain/chains";

const chain = new LLMChain({ llm: model, prompt: prompt });

// Now we can run that chain only specifying the product!

const res = await chain.call({ product: "colorful socks" });
console.log(res);

{ res: { text: '\n\nColorfulCo Sockery.' } }
```

## Agents

```ts
import { OpenAI } from "langchain/llms/openai";  
import { initializeAgentExecutorWithOptions } from "langchain/agents";  
import { SerpAPI } from "langchain/tools";  
import { Calculator } from "langchain/tools/calculator";  
  
const model = new OpenAI({ temperature: 0 });  
const tools = [  
new SerpAPI(process.env.SERPAPI_API_KEY, {  
location: "Austin,Texas,United States",  
hl: "en",  
gl: "us",  
}),  
new Calculator(),  
];  
  
const executor = await initializeAgentExecutorWithOptions(tools, model, {  
agentType: "zero-shot-react-description",  
});  
console.log("Loaded agent.");  
  
const input =  
"Who is Olivia Wilde's boyfriend?" +  
" What is his current age raised to the 0.23 power?";  
console.log(`Executing with input "${input}"...`);  
  
const result = await executor.call({ input });  
  
console.log(`Got output ${result.output}`);
```

## Memory
```ts
import { OpenAI } from "langchain/llms/openai";  
import { BufferMemory } from "langchain/memory";  
import { ConversationChain } from "langchain/chains";  
  
const model = new OpenAI({});  
const memory = new BufferMemory();  
const chain = new ConversationChain({ llm: model, memory: memory });  
const res1 = await chain.call({ input: "Hi! I'm Jim." });  
console.log(res1);
```

## Streaming 

```ts
import { OpenAI } from "langchain/llms/openai";  
  
// To enable streaming, we pass in `streaming: true` to the LLM constructor.  
// Additionally, we pass in a handler for the `handleLLMNewToken` event.  
const chat = new OpenAI({  
streaming: true,  
callbacks: [  
		{  
		handleLLMNewToken(token: string) {  
			process.stdout.write(token);  
		},  
	},  
],  
});  
  
await chat.call("Write me a song about sparkling water.");
```


## Chat

```ts
import { ChatOpenAI } from "langchain/chat_models/openai";  
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";  
  
const chat = new ChatOpenAI({ temperature: 0 });


const response = await chat.call([  
new HumanChatMessage( // `AIChatMessage`, `HumanChatMessage`, `SystemChatMessage`
"Translate this sentence from English to French. I love programming."  
),  
]);  
  
console.log(response);
```

## Chat Prompt templates
```ts
import {  SystemMessagePromptTemplate,  HumanMessagePromptTemplate,  ChatPromptTemplate,} from "langchain/prompts";
```

First we create a reusable template:

```ts
const translationPrompt = ChatPromptTemplate.fromPromptMessages([  SystemMessagePromptTemplate.fromTemplate("You are a helpful assistant that translates {input_language} to {output_language}."  ),  HumanMessagePromptTemplate.fromTemplate("{text}"),]);
```

Then we can use the template to generate a response:

```ts
const responseA = await chat.generatePrompt([  await translationPrompt.formatPromptValue({    input_language: "English",    output_language: "French",    text: "I love programming.",  }),]);console.log(responseA);
```