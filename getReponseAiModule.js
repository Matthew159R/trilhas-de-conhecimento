const sendMessageToAIModel = require('./sendMessageToAiModule');
const getAllContentWebSites = require('./getAllContentWebSitesModule');
const generateTrail = require('./generateTrail');

const getReponseAi = async userExpectation => {
    try {
        const searchTerm = await generateTrail(userExpectation);

        const result = await getAllContentWebSites(searchTerm);

        const concatenatedContent = JSON.stringify(result.allContentWebSites);

        const response = await sendMessageToAIModel(userExpectation, concatenatedContent);

        const jsonResponse = {
            searchTerm: searchTerm,
            userExpectation: userExpectation,
            link: result.links,
            responses: response
        };
        return jsonResponse;
    } catch (error) {
        console.error('Erro geral:', error);
    }
};

module.exports = getReponseAi;
