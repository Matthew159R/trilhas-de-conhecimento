const cheerio = require('cheerio');
// Retorna todas as tags 'p' do site
const contentWebSite = async (tagName, url) => {
    const contentWebSite = [];
    await fetch(url)
        .then(reponse => reponse.text())
        .then(html => {
            const $ = cheerio.load(html);
            if (tagName === 'p') {
                const paragraphs = $('p');
                paragraphs.each((index, element) => {
                const paragraph = $(element).text();
        
                    contentWebSite.push({
                        paragraphText: paragraph,
                        paragraphLength: paragraph.length
                    })
                })
            }else if (tagName === 'main') {
                const mainContent = $('main');
                
                const paragraphsInTagMain = mainContent.find('p').map((index, element) => {
                    return {
                        paragraphText: $(element).text().trim(),
                        //paragraphLength: $(element).length
                    };
                }).get();

                contentWebSite.push(...paragraphsInTagMain);
            }
        })
        .catch(error => {
            console.error('Erro ao fazer a requisição: ', error);
        });
        
    return await contentWebSite;    
}

module.exports = contentWebSite;