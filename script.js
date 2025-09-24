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
const equipmentScreen = document.getElementById('equipment-screen');
const equippedItemsList = document.getElementById('equipped-items-list');
const inventoryItemsList = document.getElementById('inventory-items-list');

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
    { name: 'Wooden Stick', price: 10, attack: 2, type: 'weapon' },
    { name: 'Dagger', price: 150, attack: 5, type: 'weapon' },
    { name: 'Short Sword', price: 400, attack: 8, type: 'weapon' },
    { name: 'Long Sword', price: 850, attack: 12, type: 'weapon' },
    { name: 'Broadsword', price: 1500, attack: 18, type: 'weapon' },
    { name: 'Battle Axe', price: 2300, attack: 25, type: 'weapon' },
    { name: 'Spear', price: 3000, attack: 30, type: 'weapon' },
    { name: 'Mithril Sword', price: 5000, attack: 40, type: 'weapon' },
    { name: 'Magic Staff', price: 7500, attack: 35, magic: 15, type: 'weapon' },
    { name: 'Legendary Blade', price: 12000, attack: 55, type: 'weapon' },
];
const armors = [
    { name: 'Leather Clothes', price: 80, defense: 3, type: 'armor' },
    { name: 'Leather Shield', price: 120, defense: 2, type: 'shield' },
    { name: 'Iron Shield', price: 450, defense: 5, type: 'shield' },
    { name: 'Leather Armor', price: 700, defense: 8, type: 'armor' },
    { name: 'Chain Mail', price: 1600, defense: 15, type: 'armor' },
    { name: 'Plate Mail', price: 3500, defense: 25, type: 'armor' },
    { name: 'Magic Robe', price: 6000, defense: 18, magic: 10, type: 'armor' },
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
    inventory: [],
    equipment: {
        weapon: null,
        armor: null,
        shield: null
    }
};

// --- State Variables ---
let gameState = 'title'; // title, map_select, playing, status_screen, equipment_screen
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
let equipmentMenuState = 'equipment'; // 'equipment' or 'inventory'
let equipmentMenuIndex = 0;

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
    const items = ['Resume', 'Status', 'Equipment', 'Quit to Title'];
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
        case 'Equipment':
            pauseScreen.classList.add('hidden');
            equipmentScreen.classList.remove('hidden');
            gameState = 'equipment_screen';
            updateEquipmentDisplay();
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

function handleEquipAction() {
    if (equipmentMenuState === 'equipment') {
        // Unequip action
        const equipmentSlots = ['weapon', 'armor', 'shield'];
        const slotToUnequip = equipmentSlots[equipmentMenuIndex];
        const itemToUnequip = player.equipment[slotToUnequip];

        if (itemToUnequip) {
            player.inventory.push(itemToUnequip);
            player.equipment[slotToUnequip] = null;
        }
    } else { // 'inventory'
        // Equip action
        const itemToEquip = player.inventory[equipmentMenuIndex];
        if (!itemToEquip) return;

        const itemType = itemToEquip.type;

        let slotToEquip = null;
        if (itemType === 'weapon') slotToEquip = 'weapon';
        else if (itemType === 'armor') slotToEquip = 'armor';
        else if (itemType === 'shield') slotToEquip = 'shield';

        if (slotToEquip) {
            const currentlyEquipped = player.equipment[slotToEquip];
            if (currentlyEquipped) {
                player.inventory.push(currentlyEquipped);
            }

            player.equipment[slotToEquip] = itemToEquip;
            player.inventory.splice(equipmentMenuIndex, 1);
        }
    }

    equipmentMenuIndex = 0;
    updateEquipmentDisplay();
    updateUI();
}

function updateEquipmentDisplay() {
    equippedItemsList.innerHTML = '';
    inventoryItemsList.innerHTML = '';

    const equipmentSlots = [
        { name: 'Weapon', item: player.equipment.weapon },
        { name: 'Armor', item: player.equipment.armor },
        { name: 'Shield', item: player.equipment.shield },
    ];

    equipmentSlots.forEach((slot, index) => {
        const li = document.createElement('li');
        li.textContent = `${slot.name}: ${slot.item ? slot.item.name : 'None'}`;
        if (equipmentMenuState === 'equipment' && index === equipmentMenuIndex) {
            li.classList.add('selected');
        }
        equippedItemsList.appendChild(li);
    });

    player.inventory.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        if (equipmentMenuState === 'inventory' && index === equipmentMenuIndex) {
            li.classList.add('selected');
        }
        inventoryItemsList.appendChild(li);
    });
}

function updateStatusDisplay() {
    const { weapon, armor, shield } = player.equipment;
    const attackBonus = (weapon?.attack || 0);
    const defenseBonus = (armor?.defense || 0) + (shield?.defense || 0);
    const magicBonus = (weapon?.magic || 0) + (armor?.magic || 0);

    const totalAttack = player.attack + attackBonus;
    const totalDefense = player.defense + defenseBonus;
    const totalSpeed = player.speed; // No speed bonus from equipment yet
    const totalMagic = player.magic + magicBonus;

    document.getElementById('status-health').textContent = `${player.currentHealth} / ${player.maxHealth}`;
    document.getElementById('status-attack').textContent = `${totalAttack} (${player.attack} + ${attackBonus})`;
    document.getElementById('status-defense').textContent = `${totalDefense} (${player.defense} + ${defenseBonus})`;
    document.getElementById('status-speed').textContent = totalSpeed;
    document.getElementById('status-magic').textContent = `${totalMagic} (${player.magic} + ${magicBonus})`;
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
        player.inventory.push(item);
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

    if (gameState === 'equipment_screen') {
        let listSize;
        switch (e.key) {
            case 'Escape':
                equipmentScreen.classList.add('hidden');
                pauseScreen.classList.remove('hidden');
                gameState = 'playing';
                isPaused = true;
                // Reset equipment menu state for next time
                equipmentMenuState = 'equipment';
                equipmentMenuIndex = 0;
                displayPauseMenu();
                break;
            case 'ArrowRight':
                if (equipmentMenuState === 'equipment') {
                    equipmentMenuState = 'inventory';
                    equipmentMenuIndex = 0;
                    updateEquipmentDisplay();
                }
                break;
            case 'ArrowLeft':
                if (equipmentMenuState === 'inventory') {
                    equipmentMenuState = 'equipment';
                    equipmentMenuIndex = 0;
                    updateEquipmentDisplay();
                }
                break;
            case 'ArrowUp':
                listSize = (equipmentMenuState === 'equipment') ? 3 : player.inventory.length;
                if (listSize > 0) {
                    equipmentMenuIndex = (equipmentMenuIndex - 1 + listSize) % listSize;
                    updateEquipmentDisplay();
                }
                break;
            case 'ArrowDown':
                listSize = (equipmentMenuState === 'equipment') ? 3 : player.inventory.length;
                if (listSize > 0) {
                    equipmentMenuIndex = (equipmentMenuIndex + 1) % listSize;
                    updateEquipmentDisplay();
                }
                break;
            case 'Enter':
                handleEquipAction();
                break;
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