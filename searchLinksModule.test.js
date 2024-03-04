const getLinks = require('./searchLinksModule');

test('Buscar links no google com base no termo de pesquisa', async () => {
    const arrayLinks = await getLinks('Café');

    arrayLinks.forEach(link => {
        expect(link).toMatch(/^https?:\/\/\S+$/);
    });
});

