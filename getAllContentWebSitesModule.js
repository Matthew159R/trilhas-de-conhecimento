const getLinks = require('./searchLinksModule');
const scraping = require('./scrapingModule');

const getAllContentWebSites = async searchTerm => {
    try {
        const links = await getLinks(searchTerm);
        const scrapingPromises = links.map((link, index) => {
            return scraping('main', link)
                .then(content => `CHAT GPT ESSE É O CONTEÚDO DO SITE ${index + 1} LINK: ${link}` + JSON.stringify(content))
                .catch(error => `Erro ao fazer scraping do site ${index + 1}: ${error.message}`);
        });

        const allContentWebSites = await Promise.allSettled(scrapingPromises);
        const successfulContent = allContentWebSites.filter(result => result.status === 'fulfilled').map(result => result.value);

        return { allContentWebSites: successfulContent, links: links };
    } catch (error) {
        console.error('Erro ao obter conteúdo dos sites:', error);
        throw error;
    }
};

module.exports = getAllContentWebSites;
