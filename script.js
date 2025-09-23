// --- Get HTML Elements ---
const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
const levelElement = document.getElementById('level');
const moneyElement = document.getElementById('money');
const healthBarElement = document.getElementById('health-bar');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const shopMenu = document.getElementById('shop-menu');
const shopTitle = shopMenu.querySelector('h3');
const itemList = document.getElementById('weapon-list');
const titleScreen = document.getElementById('title-screen');
const mapSelectScreen = document.getElementById('map-select-screen');
const mapList = document.getElementById('map-list');
const gameContainer = document.getElementById('game-container');
const mapNameDisplay = document.getElementById('map-name-display');
const pauseScreen = document.getElementById('pause-screen');
const pauseMenuList = document.getElementById('pause-menu-list');
const statusScreen = document.getElementById('status-screen');

// --- Constants ---
const TILE_SIZE = 8;
const MAP_WIDTH_IN_TILES = canvas.width / TILE_SIZE;
const MAP_HEIGHT_IN_TILES = canvas.height / TILE_SIZE;

const TILE_MAPPING = {
    SEA: 0,
    LAKE: 1,
    ROCK: 2,
    GRASS: 3,
    WEAPON_SHOP: 4
};

// --- Data ---
const weapons = [
    { name: 'Wooden Stick', price: 10 },
    { name: 'Dagger', price: 150 },
    { name: 'Short Sword', price: 400 },
    { name: 'Long Sword', price: 850 },
    { name: 'Broadsword', price: 1500 },
    { name: 'Battle Axe', price: 2300 },
    { name: 'Spear', price: 3000 },
    { name: 'Mithril Sword', price: 5000 },
    { name: 'Magic Staff', price: 7500 },
    { name: 'Legendary Blade', price: 12000 },
];
const armors = [
    { name: 'Leather Clothes', price: 80 },
    { name: 'Leather Shield', price: 120 },
    { name: 'Iron Shield', price: 450 },
    { name: 'Leather Armor', price: 700 },
    { name: 'Chain Mail', price: 1600 },
    { name: 'Plate Mail', price: 3500 },
    { name: 'Magic Robe', price: 6000 },
];
const shopCategories = [
    { name: 'Buy Weapons' },
    { name: 'Buy Armor' },
    { name: 'Exit' },
];

function generateMapData(config) {
    const data = [];
    for (let y = 0; y < MAP_HEIGHT_IN_TILES; y++) {
        const row = [];
        for (let x = 0; x < MAP_WIDTH_IN_TILES; x++) {
            const shop = config.shops.find(s => s.x === x && s.y === y);
            if (shop) {
                row.push(shop.tileId);
            } else if (y < 2 || y >= MAP_HEIGHT_IN_TILES - 2 || x < 2 || x >= MAP_WIDTH_IN_TILES - 2) {
                row.push(TILE_MAPPING.SEA);
            } else if (y < 5 || y >= MAP_HEIGHT_IN_TILES - 5 || x < 5 || x >= MAP_WIDTH_IN_TILES - 5) {
                row.push(TILE_MAPPING.LAKE);
            } else if (config.rocks.some(r => r.x === x && r.y === y)) {
                row.push(TILE_MAPPING.ROCK);
            } else {
                row.push(TILE_MAPPING.GRASS);
            }
        }
        data.push(row);
    }
    return data;
}

const maps = {
    starting_plains: {
        name: 'はじまりの平原',
        unlocked: true,
        config: {
            rocks: [
                {x: 10, y: 10}, {x: 15, y: 20}, {x: 22, y: 12}, {x: 18, y: 30},
                {x: 25, y: 28}, {x: 30, y: 8},  {x: 35, y: 22}, {x: 40, y: 30},
                {x: 45, y: 15}, {x: 50, y: 25}, {x: 53, y: 10}, {x: 8,  y: 25},
                {x: 52, y: 35}, {x: 28, y: 18}, {x: 42, y: 8},  {x: 12, y: 36}
            ],
            shops: [
                { x: 20, y: 20, type: 'weapon', tileId: TILE_MAPPING.WEAPON_SHOP }
            ]
        },
        data: []
    },
    map_2: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] }, data: [] },
    map_3: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] }, data: [] },
    map_4: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] }, data: [] },
    map_5: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] }, data: [] },
    map_6: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] }, data: [] },
    map_7: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] }, data: [] },
    map_8: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] }, data: [] },
    map_9: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] }, data: [] },
    map_10: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] }, data: [] },
};

// --- Game Objects & Images ---
const mapImage = new Image();
const playerImage = new Image();
const player = {
    x: Math.floor(MAP_WIDTH_IN_TILES / 2),
    y: Math.floor(MAP_HEIGHT_IN_TILES / 2),
    size: TILE_SIZE,
    level: 1,
    money: 10000,
    maxHealth: 100,
    currentHealth: 100,
    attack: 1,
    defense: 1,
    speed: 1,
    magic: 1,
    inventory: []
};

// --- State Variables ---
let gameState = 'title'; // title, map_select, playing, status_screen
let currentMapId = 'starting_plains';
let imagesLoaded = 0;
const totalImages = 2;
let isMessageVisible = false;
let isShopOpen = false;
let shopState = 'category';
let selectedIndex = 0;
let currentShopList = [];
let isPaused = false;
let pauseMenuIndex = 0;

// --- Game Flow Functions ---
function showMapSelect() {
    gameState = 'map_select';
    selectedIndex = 0;
    titleScreen.classList.add('hidden');
    mapSelectScreen.classList.remove('hidden');
    displayMapList();
}

function displayMapList() {
    mapList.innerHTML = '';
    Object.values(maps).forEach((map, index) => {
        const li = document.createElement('li');
        li.textContent = map.name;
        if (index === selectedIndex) {
            li.classList.add('selected');
        }
        if (!map.unlocked) {
            li.classList.add('locked');
        }
        mapList.appendChild(li);
    });
}

function initializeGamePlay() {
    const selectedMapKey = Object.keys(maps)[selectedIndex];
    const selectedMap = maps[selectedMapKey];

    if (!selectedMap.unlocked) return; // Cannot start a locked map

    currentMapId = selectedMapKey;
    gameState = 'playing';
    mapSelectScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    document.body.style.backgroundColor = '#333';

    for (const mapId in maps) {
        maps[mapId].data = generateMapData(maps[mapId].config);
    }

    mapImage.src = 'img/map.png';
    playerImage.src = 'img/player.png';
    mapImage.onload = onImageLoad;
    playerImage.onload = onImageLoad;
}

function onImageLoad() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        updateUI();
        redraw();
    }
}

// --- UI & Message Functions ---
function updateUI() {
    levelElement.textContent = player.level;
    moneyElement.textContent = player.money;
    const healthPercentage = (player.currentHealth / player.maxHealth) * 100;
    healthBarElement.style.width = `${healthPercentage}%`;
    mapNameDisplay.textContent = maps[currentMapId].name;
}

function showMessage(message, callback) {
    messageText.textContent = message;
    messageBox.classList.remove('hidden');
    isMessageVisible = true;

    const enterListener = (e) => {
        if (e.key === 'Enter') {
            e.stopPropagation();
            hideMessage();
            if (callback) callback();
            window.removeEventListener('keydown', enterListener, true);
        }
    };
    window.addEventListener('keydown', enterListener, true);
}

function hideMessage() {
    messageBox.classList.add('hidden');
    isMessageVisible = false;
}

function displayPauseMenu() {
    pauseMenuList.innerHTML = '';
    const items = ['Resume', 'Status', 'Quit to Title'];
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        if (index === pauseMenuIndex) {
            li.classList.add('selected');
        }
        pauseMenuList.appendChild(li);
    });
}

function handlePauseSelection() {
    const selection = pauseMenuList.getElementsByTagName('li')[pauseMenuIndex].textContent;
    switch(selection) {
        case 'Resume':
            togglePause();
            break;
        case 'Status':
            pauseScreen.classList.add('hidden');
            statusScreen.classList.remove('hidden');
            gameState = 'status_screen';
            updateStatusDisplay();
            break;
        case 'Quit to Title':
            isPaused = false;
            pauseScreen.classList.add('hidden');
            gameContainer.style.filter = 'none';
            gameContainer.classList.add('hidden');
            titleScreen.classList.remove('hidden');
            document.body.style.backgroundColor = '#000';
            gameState = 'title';
            break;
    }
}

function updateStatusDisplay() {
    document.getElementById('status-health').textContent = `${player.currentHealth} / ${player.maxHealth}`;
    document.getElementById('status-attack').textContent = player.attack;
    document.getElementById('status-defense').textContent = player.defense;
    document.getElementById('status-speed').textContent = player.speed;
    document.getElementById('status-magic').textContent = player.magic;
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        pauseMenuIndex = 0;
        displayPauseMenu();
        pauseScreen.classList.remove('hidden');
        gameContainer.style.filter = 'blur(3px)';
    } else {
        pauseScreen.classList.add('hidden');
        gameContainer.style.filter = 'none';
    }
}

// --- Shop Logic (and other gameplay logic) remains largely the same ---
function openShop() {
    isShopOpen = true;
    shopState = 'category';
    selectedIndex = 0;
    displayShopList(shopCategories, 'Weapon Shop');
    shopMenu.classList.remove('hidden');
}

function closeShop() {
    isShopOpen = false;
    shopMenu.classList.add('hidden');
}

function displayShopList(list, title) {
    itemList.innerHTML = '';
    shopTitle.textContent = title;
    currentShopList = list;
    
    const itemsToDisplay = [...list];
    if (shopState === 'weapons' || shopState === 'armors') {
        itemsToDisplay.push({ name: 'Back' });
    }

    itemsToDisplay.forEach((item, index) => {
        const li = document.createElement('li');
        let text = item.name;
        if (item.price !== undefined) text += ` - ${item.price} G`;
        li.textContent = text;
        if (index === selectedIndex) li.classList.add('selected');
        itemList.appendChild(li);
    });
}

function updateSelection(listElement) {
    const listItems = listElement.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove('selected');
    }
    listItems[selectedIndex].classList.add('selected');
}

function buyItem() {
    const item = currentShopList[selectedIndex];
    if (!item || item.name === 'Back') {
        shopState = 'category';
        selectedIndex = 0;
        displayShopList(shopCategories, 'Weapon Shop');
        return;
    }

    if (player.money >= item.price) {
        player.money -= item.price;
        player.inventory.push(item.name);
        updateUI();
        showMessage(`You bought a ${item.name}.`);
    } else {
        showMessage("You don't have enough money.");
    }
}

function drawMap() {
    const currentMapData = maps[currentMapId].data;
    const TILES_PER_ROW_IN_IMAGE = mapImage.width / TILE_SIZE;
    for (let y = 0; y < MAP_HEIGHT_IN_TILES; y++) {
        for (let x = 0; x < MAP_WIDTH_IN_TILES; x++) {
            let tileId = currentMapData[y][x];
            const sx = (tileId % TILES_PER_ROW_IN_IMAGE) * TILE_SIZE;
            const sy = Math.floor(tileId / TILES_PER_ROW_IN_IMAGE) * TILE_SIZE;
            const dx = x * TILE_SIZE;
            const dy = y * TILE_SIZE;
            ctx.drawImage(mapImage, sx, sy, TILE_SIZE, TILE_SIZE, dx, dy, TILE_SIZE, TILE_SIZE);
        }
    }
}

function drawPlayer() {
    ctx.drawImage(playerImage, 0, 0, player.size, player.size, player.x * TILE_SIZE, player.y * TILE_SIZE, player.size, player.size);
}

function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPlayer();
}

function isWalkable(x, y) {
    if (x < 0 || x >= MAP_WIDTH_IN_TILES || y < 0 || y >= MAP_HEIGHT_IN_TILES) return false;
    const tileId = maps[currentMapId].data[y][x];
    return tileId !== TILE_MAPPING.ROCK && tileId !== TILE_MAPPING.SEA;
}

// --- Input Handling ---
window.addEventListener('keydown', (e) => {
    if (gameState === 'title') {
        if (e.key === 'Enter') showMapSelect();
        return;
    }

    if (gameState === 'map_select') {
        const mapCount = Object.keys(maps).length;
        switch(e.key) {
            case 'ArrowUp':
                selectedIndex = (selectedIndex - 1 + mapCount) % mapCount;
                displayMapList();
                break;
            case 'ArrowDown':
                selectedIndex = (selectedIndex + 1) % mapCount;
                displayMapList();
                break;
            case 'Enter':
                initializeGamePlay();
                break;
        }
        return;
    }

    if (gameState === 'status_screen') {
        if (e.key === 'Escape' || e.key === 'Enter') {
            statusScreen.classList.add('hidden');
            pauseScreen.classList.remove('hidden');
            gameState = 'playing'; // Return to playing state, but still paused
            isPaused = true; // Ensure game remains paused
            displayPauseMenu(); // Re-display pause menu to ensure correct selection
        }
        return;
    }

    // --- From here on, gameState is 'playing' ---

    if (isPaused) {
        const itemCount = pauseMenuList.getElementsByTagName('li').length;
        switch(e.key) {
            case 'ArrowUp':
                pauseMenuIndex = (pauseMenuIndex - 1 + itemCount) % itemCount;
                displayPauseMenu();
                break;
            case 'ArrowDown':
                pauseMenuIndex = (pauseMenuIndex + 1) % itemCount;
                displayPauseMenu();
                break;
            case 'Enter':
                handlePauseSelection();
                break;
            case 'Escape':
                togglePause();
                break;
        }
        return; // Block all other game input while paused
    }

    // Message listener handles its own 'Enter' key, we just need to block other inputs.
    if (isMessageVisible) {
        return;
    }

    if (isShopOpen) {
        let listSize = itemList.getElementsByTagName('li').length;
        switch(e.key) {
            case 'ArrowUp':
                selectedIndex = (selectedIndex - 1 + listSize) % listSize;
                updateSelection(itemList);
                break;
            case 'ArrowDown':
                selectedIndex = (selectedIndex + 1) % listSize;
                updateSelection(itemList);
                break;
            case 'Enter':
                if (shopState === 'category') {
                    const category = shopCategories[selectedIndex].name;
                    if (category === 'Buy Weapons') {
                        shopState = 'weapons';
                        selectedIndex = 0;
                        displayShopList(weapons, 'Weapons');
                    } else if (category === 'Buy Armor') {
                        shopState = 'armors';
                        selectedIndex = 0;
                        displayShopList(armors, 'Armor');
                    } else if (category === 'Exit') {
                        closeShop();
                    }
                } else {
                    buyItem();
                }
                break;
            case 'Escape':
                 if (shopState === 'weapons' || shopState === 'armors') {
                    shopState = 'category';
                    selectedIndex = 0;
                    displayShopList(shopCategories, 'Weapon Shop');
                } else {
                    closeShop();
                }
                break;
        }
        return;
    }

    // --- Default playing state actions ---

    if (e.key === 'Escape') {
        togglePause();
        return;
    }

    if (e.key === 'Enter') {
        const currentMapData = maps[currentMapId].data;
        const currentTile = currentMapData[player.y][player.x];
        if (currentTile === TILE_MAPPING.WEAPON_SHOP) {
            showMessage('Welcome to the weapon shop!', openShop);
            return; 
        }
    }

    let newX = player.x;
    let newY = player.y;
    switch(e.key) {
        case 'ArrowUp': newY--; break;
        case 'ArrowDown': newY++; break;
        case 'ArrowLeft': newX--; break;
        case 'ArrowRight': newX++; break;
    }

    if (isWalkable(newX, newY)) {
        player.x = newX;
        player.y = newY;
        redraw();
    }
});