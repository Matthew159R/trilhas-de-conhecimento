const cx = 'e18358e3822b146ad';
const apiKeyGoogle = require('./apiKeys.json').googleCustomSearch;

const getLinks = async searchTerm => {
    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${searchTerm}&key=${apiKeyGoogle}&cx=${cx}`;
    const links = [];
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const data = await response.json();
        for (let i = 0; i < 5; i++) { 
            links.push(data.items[i].link);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
    return links;
};



module.exports = getLinks;