const getApiKeyOpenai = require('./apiKeys.json').openai;

const generateTrail = async (userExpectation) => {

    const apiKeyChaGpt = getApiKeyOpenai;


    const endpoint = "https://api.openai.com/v1/chat/completions";

    const input = [
        { role: 'system', content: 'Você irá receber uma mensagem do usuário sobre o que ele deseja aprender. Você precisa gerar uma trilha de estudos. Por fins e teste no momento, forneça apenas o primeiro tópico da trilha em uma linha. Exemplo: Introdução ao spring' },
        { role: 'user', content: userExpectation },
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
        return responseModelAI = await data.choices[0].message.content;
    } catch (error) {
        console.error("Erro na requisição:", error);
        throw error;
    }
};

// generateTrail('Gostaria estudar spring para desenvolver apis rest')
//     .then(data => console.log(data))
//     .catch(error => console.log(error))

module.exports = generateTrail;