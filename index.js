import { config } from 'dotenv';
import readline from 'readline';
import { Configuration, OpenAIApi } from 'openai';

config();

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.GPT_SECRET_KEY,
}));

const ui = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const messages = [];

ui.prompt('> ');
ui.on('line', async (input) => {
    messages.push({
        role: 'user',
        content: input,
    });

    const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 1000,
    });
    const answer = result.data.choices[0].message.content;

    console.info(result.data.choices[0].message.content + '\r\n');

    messages.push({
        role: 'assistant',
        content: answer,
    });
    ui.prompt();
});
