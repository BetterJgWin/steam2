const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/games', async (req, res) => {
    try {
        const response = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/', {
            method: 'GET'
        });

        // Лог заглавията на отговора
        console.log('Response headers:', response.headers);

        if (!response.ok) {
            console.error('Failed to fetch games:', response.status, response.statusText);
            return res.status(response.status).send('Error fetching games');
        }

        const gamesData = await response.json();
        res.json(gamesData.applist.apps);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).send('Error fetching games');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
