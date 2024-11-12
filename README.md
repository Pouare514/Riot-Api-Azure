# 🎮 GetRiotData 🌟

Bienvenue sur **Riot Api Azure**, un projet Node.js qui te permet d'accéder facilement aux données des joueurs de League of Legends via l'API de Riot Games avec penser pour microsoft azure ! 🚀

## 🔍 Qu'est-ce que c'est ?

GetRiotData est conçu pour récupérer des informations sur les comptes des joueurs en utilisant leur nom de jeu et leur tag. Que tu sois un développeur cherchant à intégrer des données de League of Legends dans ton application ou un passionné souhaitant explorer les statistiques des joueurs, ce projet est fait pour toi ! 🌍


## 🚀 Déployer le projet sur Azure Functions

Voici un guide étape par étape pour déployer ce projet sur Azure Functions :

### Prérequis

- **Un compte Azure :** Assure-toi d'avoir un compte Azure actif.
- **Azure CLI :** Installe l'outil Azure CLI pour gérer tes ressources Azure.
- **Node.js :** Assure-toi que Node.js est installé sur ta machine.

### Étapes de déploiement

1. **Clone le dépôt :** `git clone https://github.com/Pouare514/GetRiotData.git && cd GetRiotData`

2. **Installe les dépendances :** Assure-toi d'être dans le répertoire de ton projet et exécute : `npm install`

3. **Connecte-toi à ton compte Azure :** Si tu ne l'as pas déjà fait, connecte-toi à Azure via la CLI : `az login`

4. **Crée une Function App :** Remplace `nomDeTaFunctionApp` par un nom unique : `az functionapp create --resource-group MonGroupeRessources --consumption-plan-location westeurope --runtime node --runtime-version 20 --functions-version 4 --name nomDeTaFunctionApp --storage-account monStockage`

5. **Déploie ton code :** Assure-toi que tu es dans le répertoire du projet, puis exécute : `az functionapp deployment source config --name nomDeTaFunctionApp --resource-group MonGroupeRessources --branch main --manual-integration --repo-url https://github.com/ton_nom_utilisateur/GetRiotData.git`

6. **Configure les variables d'environnement :** N'oublie pas de configurer ta clé API Riot Games dans les paramètres d'application de ta Function App : `az functionapp config appsettings set --name nomDeTaFunctionApp --resource-group MonGroupeRessources --settings RIOT_API_KEY=ta_clé_api`

7. **Test ton API :** Une fois déployée, tu peux tester ton API en accédant à l'URL suivante (remplace `nomDeTaFunctionApp` par le nom que tu as choisi) : `https://nomDeTaFunctionApp.azurewebsites.net/api/fetchplayerpuuid?gameName=nomDuJoueur&tagLine=tagDuJoueur`

### 🎉 Félicitations !

Tu as maintenant déployé ton projet sur Azure Functions ! 🚀
