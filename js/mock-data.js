// nyinyinyinyi - have fun

const STORAGE_KEY = 'bridge_database';


//olvasás
function getDatabase() {
    let data = localStorage.getItem(STORAGE_KEY);

    if (data === null) {
        return null;
        // nincs még tournament
    }

    return JSON.parse(data);
}

//mentés

function saveDatabase(data) {
    let dataString = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, dataString);
}

// uj bizbasz (tournament)

function createTournament(name, tableCount, boardCount) {
    let newTournament = {
        name: name,
        tableCount: tableCount,
        boardCount: boardCount,
        results: [], //array, amibe majd az eredmények kerülnek
        pairs: [] // párok adatai
    };

    saveDatabase(newTournament);
    return newTournament;
}

// ez ilyen hard reset, ami nekem nagyon jó, mert
// egyszerre 1 bizbasszal tudok dealelni, de itt belenyomhatod 
// az eredményeket valami tartós tárba, idk rád bízom

function clearDatabase() {
    localStorage.removeItem(STORAGE_KEY);
}

git