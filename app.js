const getReponseAi = require('./getReponseAiModule');

// Poderia ser qualquer coisa
getReponseAi('')
    .then(data => console.log(data))
    .catch(error => console.log(error))