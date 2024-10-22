const fetch = require('node-fetch');

module.exports = async function (context, req) {
    const gameName = req.query.gameName;
    const tagLine = req.query.tagLine;

    // Vérification des paramètres
    if (!gameName || !tagLine) {
        context.res = {
            status: 400,
            body: JSON.stringify({ error: "Please provide both gameName and tagLine." }),
            headers: {
                "Content-Type": "application/json"
            }
        };
        return;
    }

    const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'X-Riot-Token': process.env.RIOT_API_KEY // Remplacez par votre clé API stockée dans les variables d'environnement
            }
        });

        if (!response.ok) {
            const errorBody = await response.text(); // Lire le corps de la réponse
            context.res = {
                status: response.status,
                body: JSON.stringify({ error: "Error fetching data from Riot API.", details: errorBody }),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            return;
        }
        
        const data = await response.json();
        context.res = {
            status: 200,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: JSON.stringify({ error: "Error: " + error.message }),
            headers: {
                "Content-Type": "application/json"
            }
        };
    }
};
