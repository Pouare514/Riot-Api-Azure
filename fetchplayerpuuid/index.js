const fetch = require('node-fetch');
const sql = require('mssql');

const sqlConfig = {
    user: process.env.SQL_USER, // Ton nom d'utilisateur SQL
    password: process.env.SQL_PASSWORD, // Ton mot de passe SQL
    server: process.env.SQL_SERVER, // L'URL de ton serveur SQL
    database: process.env.SQL_DATABASE, // Le nom de ta base de données
    options: {
        encrypt: true, // Utilise le chiffrement si tu es sur Azure
        trustServerCertificate: true // Pour les tests locaux, à éviter en production
    }
};

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

    try {
        // Connexion à la base de données
        await sql.connect(sqlConfig);
        
        // Vérifie si le gameName existe déjà dans la base de données
        const result = await sql.query`SELECT * FROM puuids WHERE gameName = ${gameName} AND tagLine = ${tagLine}`;

        if (result.recordset.length > 0) {
            // Si le gameName existe, retourne les données existantes
            context.res = {
                status: 200,
                body: JSON.stringify(result.recordset[0]), // Renvoie le premier enregistrement trouvé
                headers: {
                    "Content-Type": "application/json"
                }
            };
            return;
        }

        const url = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`;
        
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
        const puuid = data.puuid; // Assumes the API response has a 'puuid' field
        
        // Insère les nouvelles données dans la table
        await sql.query`INSERT INTO puuids (gameName, tagLine, puuid) VALUES (${gameName}, ${tagLine}, ${puuid})`;

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
    } finally {
        // Ferme la connexion à la base de données
        await sql.close();
    }
};
