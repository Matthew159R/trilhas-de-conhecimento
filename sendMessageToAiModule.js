const getContext = require('./promptContext');
const getPromptContextForTheAi = require('./promptContext');

let getApiKeyOpenai;
try {
    getApiKeyOpenai = require('./apiKeys.json').openai;
}catch (e) {
    console.error({
        error: "API KEY",
        message: 'Para usar o software você precisa de uma api key da openai. Não posso divulgar a minha. Você pode usar a sua ou entrar em contato comigo.'
    });
    process.exit(1); 
}

// Retorna uma reposta do chat gpt
const sendMessageToChatGpt = async (userExpectation, contentWebSite) => {

    const apiKeyChaGpt = getApiKeyOpenai;


    const endpoint = "https://api.openai.com/v1/chat/completions";

    const input = [
        { role: 'system', content:  getContext()},
        { role: 'user', content: userExpectation },
        { role: 'user', content: contentWebSite }
    ];

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${apiKeyChaGpt}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: input
            })
        });

        const data = await response.json();
        return responseModelAI = await data.error ? `Ocorreu um erro ao analisar esse site: ${JSON.stringify(data.error)}` : data.choices[0].message.content;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
};

module.exports = sendMessageToChatGpt;
