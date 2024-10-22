module.exports = async function (context, req) {
    context.log('Test function processed a request.');

    // Réponse simple pour tester le serveur
    context.res = {
        status: 200,
        body: "Server is working!"
    };
};