
// =================================================================================
// C O N S T A N T S
// =================================================================================

const TILE_SIZE = 8;
const TILE_MAPPING = {
    SEA: 0,
    LAKE: 1,
    ROCK: 2,
    GRASS: 3,
    WEAPON_SHOP: 4,
    STOCK_SHOP: 5,
    FOREST: 6, // Corrected to 6
    CHESTNUT: 7  // Swapped from 6
};

// =================================================================================
// G A M E   D A T A
// =================================================================================

class GameData {
    constructor() {
        this.weapons = [
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
        this.armors = [
            { name: 'Leather Clothes', price: 80, defense: 3, type: 'armor' },
            { name: 'Leather Shield', price: 120, defense: 2, type: 'shield' },
            { name: 'Iron Shield', price: 450, defense: 5, type: 'shield' },
            { name: 'Leather Armor', price: 700, defense: 8, type: 'armor' },
            { name: 'Chain Mail', price: 1600, defense: 15, type: 'armor' },
            { name: 'Plate Mail', price: 3500, defense: 25, type: 'armor' },
            { name: 'Magic Robe', price: 6000, defense: 18, magic: 10, type: 'armor' },
        ];
        this.shoes = [
            { name: 'Leather Boots', price: 250, speed: 2, type: 'shoes' },
            { name: 'Iron Greaves', price: 600, speed: 3, defense: 2, type: 'shoes' },
            { name: 'Speed Shoes', price: 1500, speed: 5, type: 'shoes' }
        ];
        this.accessories = [
            { name: 'Ring of Power', price: 1200, magic: 5, type: 'accessory' }
        ];
        this.stocks = ['NVDA', 'MSFT', 'AAPL', 'AMZN', 'AVGO', 'GOOGL', 'MCD', 'YUM'];
        this.monsters = {
            slime: { name: 'Slime', health: 20, attack: 5, defense: 2, speed: 3, exp: 5, gold: 10, imageSrc: 'img/monster.png', spriteIndex: 0 },
        };
        this.shopCategories = [
            { name: 'Buy Weapons' },
            { name: 'Buy Armor' },
            { name: 'Buy Shoes' },
            { name: 'Buy Accessories' },
            { name: 'Exit' },
        ];
        this.maps = {
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
                        { x: 20, y: 20, type: 'weapon', tileId: TILE_MAPPING.WEAPON_SHOP },
                        { x: 40, y: 20, type: 'stock', tileId: TILE_MAPPING.STOCK_SHOP }
                    ]
                },
            },
            map_2: {
                name: '静寂の森',
                unlocked: true,
                config: {
                    rocks: [],
                    forest: [
                        // Outer walls
                        ...Array.from({length: 45}, (_, i) => ({x: 5 + i, y: 5})), 
                        ...Array.from({length: 45}, (_, i) => ({x: 5 + i, y: 34})), 
                                                ...Array.from({length: 13}, (_, i) => ({x: 5, y: 6 + i})), // Upper part of left wall
                        ...Array.from({length: 12}, (_, i) => ({x: 5, y: 22 + i})), // Lower part of left wall 
                        ...Array.from({length: 28}, (_, i) => ({x: 50, y: 6 + i})), 
                        // Maze walls
                                                ...Array.from({length: 14}, (_, i) => ({x: 15, y: 5 + i})), // Upper part of 1st inner wall
                        ...Array.from({length: 13}, (_, i) => ({x: 15, y: 22 + i})), // Lower part of 1st inner wall 
                                                ...Array.from({length: 30}, (_, i) => ({x: 35, y: 10 + i})), 
                        ...Array.from({length: 20}, (_, i) => ({x: 15 + i, y: 25})), 
                        ...Array.from({length: 20}, (_, i) => ({x: 25 + i, y: 15})), 
                    ],
                    chestnuts: [
                        {x: 8, y: 8}, {x: 48, y: 32}, {x: 30, y: 18}, {x: 17, y: 28}
                    ],
                    shops: [
                        { x: 48, y: 8, type: 'weapon', tileId: TILE_MAPPING.WEAPON_SHOP }
                    ]
                },
            },
            map_3: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] } },
            map_4: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] } },
            map_5: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] } },
            map_6: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] } },
            map_7: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] } },
            map_8: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] } },
            map_9: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] } },
            map_10: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] } },
        };

        // Pre-generate map data
        for (const mapId in this.maps) {
            this.maps[mapId].data = this._generateMapData(this.maps[mapId].config);
        }
    }

    _generateMapData(config) {
        const MAP_WIDTH_IN_TILES = 60; // Assuming canvas width of 480
        const MAP_HEIGHT_IN_TILES = 40; // Assuming canvas height of 320
        const data = [];
        for (let y = 0; y < MAP_HEIGHT_IN_TILES; y++) {
            const row = [];
            for (let x = 0; x < MAP_WIDTH_IN_TILES; x++) {
                const shop = config.shops && config.shops.find(s => s.x === x && s.y === y);
                if (shop) {
                    row.push(shop.tileId);
                } else if (y < 2 || y >= MAP_HEIGHT_IN_TILES - 2 || x < 2 || x >= MAP_WIDTH_IN_TILES - 2) {
                    row.push(TILE_MAPPING.SEA);
                } else if (y < 5 || y >= MAP_HEIGHT_IN_TILES - 5 || x < 5 || x >= MAP_WIDTH_IN_TILES - 5) {
                    row.push(TILE_MAPPING.LAKE);
                } else if (config.forest && config.forest.some(f => f.x === x && f.y === y)) {
                    row.push(TILE_MAPPING.FOREST);
                } else if (config.rocks && config.rocks.some(r => r.x === x && r.y === y)) {
                    row.push(TILE_MAPPING.ROCK);
                } else if (config.chestnuts && config.chestnuts.some(c => c.x === x && c.y === y)) {
                    row.push(TILE_MAPPING.CHESTNUT);
                } else {
                    row.push(TILE_MAPPING.GRASS);
                }
            }
            data.push(row);
        }
        return data;
    }
}

// =================================================================================
// P L A Y E R
// =================================================================================

class Player {
    constructor() {
        this.name = 'Hero';
        this.x = 0;
        this.y = 0;
        this.size = TILE_SIZE;
        this.level = 1;
        this.xp = 0;
        this.xpToNextLevel = 10;
        this.money = 10000;
        this.maxHealth = 100;
        this.currentHealth = 100;
        this.attack = 1;
        this.defense = 1;
        this.speed = 1;
        this.magic = 1;
        this.inventory = [];
        this.stocks = {}; // e.g., { 'NVDA': 10, 'AAPL': 5 }
        this.equipment = {
            weapon: null,
            armor: null,
            shield: null,
            shoes: null,
            accessory: null
        };
    }

    getTotalStats() {
        const stats = {
            attack: this.attack,
            defense: this.defense,
            speed: this.speed,
            magic: this.magic,
            bonuses: { attack: 0, defense: 0, speed: 0, magic: 0 }
        };

        for (const slot in this.equipment) {
            const item = this.equipment[slot];
            if (item) {
                if (item.attack) { stats.bonuses.attack += item.attack; }
                if (item.defense) { stats.bonuses.defense += item.defense; }
                if (item.speed) { stats.bonuses.speed += item.speed; }
                if (item.magic) { stats.bonuses.magic += item.magic; }
            }
        }

        stats.attack += stats.bonuses.attack;
        stats.defense += stats.bonuses.defense;
        stats.speed += stats.bonuses.speed;
        stats.magic += stats.bonuses.magic;

        return stats;
    }

    move(dx, dy, map, game) {
        const newX = this.x + dx;
        const newY = this.y + dy;
        if (map.isWalkable(newX, newY)) {
            this.x = newX;
            this.y = newY;

            if (game.currentMapKey === 'map_2' && Math.random() < 0.1) { // 10% chance of encounter in the forest
                game.startCombat();
            }

            return true;
        }
        return false;
    }

    equip(item) {
        if (!item || !item.type) return;

        let slotToEquip = null;
        if (item.type === 'weapon') slotToEquip = 'weapon';
        else if (item.type === 'armor') slotToEquip = 'armor';
        else if (item.type === 'shield') slotToEquip = 'shield';
        else if (item.type === 'shoes') slotToEquip = 'shoes';
        else if (item.type === 'accessory') slotToEquip = 'accessory';

        if (slotToEquip) {
            const currentlyEquipped = this.equipment[slotToEquip];
            if (currentlyEquipped) {
                this.inventory.push(currentlyEquipped);
            }
            this.equipment[slotToEquip] = item;
            this.inventory.splice(this.inventory.indexOf(item), 1);
        }
    }

    unequip(slot) {
        if (this.equipment[slot]) {
            this.inventory.push(this.equipment[slot]);
            this.equipment[slot] = null;
        }
    }

    gainXP(amount) {
        this.xp += amount;
        if (this.xp >= this.xpToNextLevel) {
            this.levelUp();
        }
    }

    levelUp() {
        while (this.xp >= this.xpToNextLevel) {
            this.level++;
            this.xp -= this.xpToNextLevel;
            this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
            this.maxHealth += 10;
            this.currentHealth = this.maxHealth;
            this.attack += 2;
            this.defense += 1;
        }
    }

    draw(ctx, image) {
        ctx.drawImage(image, 0, 0, this.size, this.size, this.x * TILE_SIZE, this.y * TILE_SIZE, this.size, this.size);

        // Draw player name
        ctx.fillStyle = 'white';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(this.name, this.x * TILE_SIZE + TILE_SIZE / 2, this.y * TILE_SIZE - 5);
    }
}

// =================================================================================
// M O N S T E R
// =================================================================================

class Monster {
    constructor(monsterData) {
        this.name = monsterData.name;
        this.maxHealth = monsterData.health;
        this.currentHealth = monsterData.health;
        this.attack = monsterData.attack;
        this.defense = monsterData.defense;
        this.speed = monsterData.speed;
        this.exp = monsterData.exp;
        this.gold = monsterData.gold;
        this.imageSrc = monsterData.imageSrc;
        this.spriteIndex = monsterData.spriteIndex;
    }

    draw(ctx, image) {
        // Simple draw logic for now
        ctx.drawImage(image, 100, 50, 100, 100); 
    }
}


// =================================================================================
// M A P
// =================================================================================

class Map {
    constructor(mapData, canvas) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.MAP_WIDTH_IN_TILES = this.width / TILE_SIZE;
        this.MAP_HEIGHT_IN_TILES = this.height / TILE_SIZE;
        this.load(mapData);
    }

    load(mapData) {
        this.name = mapData.name;
        this.data = mapData.data;
        this.config = mapData.config;
    }

    isWalkable(x, y) {
        if (x < 0 || x >= this.MAP_WIDTH_IN_TILES || y < 0 || y >= this.MAP_HEIGHT_IN_TILES) {
            return false;
        }
        const tileId = this.data[y][x];
        return tileId !== TILE_MAPPING.ROCK && tileId !== TILE_MAPPING.SEA && tileId !== TILE_MAPPING.FOREST;
    }

    getTile(x, y) {
        if (x < 0 || x >= this.MAP_WIDTH_IN_TILES || y < 0 || y >= this.MAP_HEIGHT_IN_TILES) {
            return null;
        }
        return this.data[y][x];
    }

    draw(ctx, image) {
        const TILES_PER_ROW_IN_IMAGE = image.width / TILE_SIZE;
        for (let y = 0; y < this.MAP_HEIGHT_IN_TILES; y++) {
            for (let x = 0; x < this.MAP_WIDTH_IN_TILES; x++) {
                const tileId = this.data[y][x];
                const sx = (tileId % TILES_PER_ROW_IN_IMAGE) * TILE_SIZE;
                const sy = Math.floor(tileId / TILES_PER_ROW_IN_IMAGE) * TILE_SIZE;
                ctx.drawImage(image, sx, sy, TILE_SIZE, TILE_SIZE, x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
        // Draw shop labels on top
        ctx.fillStyle = 'white';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        for (let y = 0; y < this.MAP_HEIGHT_IN_TILES; y++) {
            for (let x = 0; x < this.MAP_WIDTH_IN_TILES; x++) {
                if (this.data[y][x] === TILE_MAPPING.WEAPON_SHOP) {
                    ctx.fillText('装備屋さん', x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE - 5);
                } else if (this.data[y][x] === TILE_MAPPING.STOCK_SHOP) {
                    ctx.fillText('株屋さん', x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE - 5);
                }
            }
        }
    }
}

// =================================================================================
// U I   M A N A G E R
// =================================================================================

class UIManager {
    constructor() {
        this.elements = {
            // Screens
            title: document.getElementById('title-screen'),
            mapSelect: document.getElementById('map-select-screen'),
            game: document.getElementById('game-container'),
            pause: document.getElementById('pause-screen'),
            status: document.getElementById('status-screen'),
            equipment: document.getElementById('equipment-screen'),
            stock: document.getElementById('stock-screen'),
            shop: document.getElementById('shop-menu'),
            messageBox: document.getElementById('message-box'),
            combat: document.getElementById('combat-screen'),
            // Game UI
            level: document.getElementById('level'),
            xp: document.getElementById('xp'),
            xpToNextLevel: document.getElementById('xp-to-next-level'),
            money: document.getElementById('money'),
            healthBar: document.getElementById('health-bar'),
            mapName: document.getElementById('map-name-display'),
            messageText: document.getElementById('message-text'),
            // Lists
            titleMenuList: document.getElementById('title-menu-list'),
            mapList: document.getElementById('map-list'),
            pauseMenuList: document.getElementById('pause-menu-list'),
            shopTitle: document.getElementById('shop-menu').querySelector('h3'),
            shopItemList: document.getElementById('weapon-list'),
            equippedItemsList: document.getElementById('equipped-items-list'),
            inventoryItemsList: document.getElementById('inventory-items-list'),
            equipmentStatusDisplay: document.getElementById('equipment-status-display'), // New
            stockList: document.getElementById('stock-list'),
            combatMenuList: document.getElementById('combat-menu-list'),
            combatMonsterName: document.getElementById('combat-monster-name'),
            combatMonsterHp: document.getElementById('combat-monster-hp'),
            combatPlayerLevel: document.getElementById('combat-player-level'),
            combatPlayerHp: document.getElementById('combat-player-hp'),
            combatLogContainer: document.getElementById('combat-log-container'),
            combatLog: document.getElementById('combat-log'),
            // Status
            statusHealth: document.getElementById('status-health'),
            statusAttack: document.getElementById('status-attack'),
            statusDefense: document.getElementById('status-defense'),
            statusSpeed: document.getElementById('status-speed'),
            statusMagic: document.getElementById('status-magic'),
            statusStocks: document.getElementById('status-stocks'),
        };
        this.activeScreens = new Set();
    }

    show(elementName) {
        if (this.elements[elementName]) {
            this.elements[elementName].classList.remove('hidden');
            this.activeScreens.add(elementName);
        }
    }

    hide(elementName) {
        if (this.elements[elementName]) {
            this.elements[elementName].classList.add('hidden');
            this.activeScreens.delete(elementName);
        }
    }

    hideAllScreens() {
        Object.keys(this.elements).forEach(key => {
            if (this.elements[key].classList.contains('fullscreen-menu') || key === 'game') {
                this.hide(key);
            }
        });
    }

    showMessage(message, callback) {
        this.elements.messageText.textContent = message;
        this.show('messageBox');
        return new Promise(resolve => {
            const listener = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault(); // Prevent any default browser action
                    e.stopPropagation(); // Stop the event from bubbling up
                    this.hide('messageBox');
                    window.removeEventListener('keydown', listener, true);
                    if (callback) callback();
                    resolve();
                }
            };
            window.addEventListener('keydown', listener, true);
        });
    }

    updatePlayerStats(player) {
        this.elements.level.textContent = player.level;
        this.elements.xp.textContent = player.xp;
        this.elements.xpToNextLevel.textContent = player.xpToNextLevel;
        this.elements.money.textContent = player.money;
        const healthPercentage = (player.currentHealth / player.maxHealth) * 100;
        this.elements.healthBar.style.width = `${healthPercentage}%`;
    }

    updateMapName(name) {
        this.elements.mapName.textContent = name;
    }

    _renderList(ulElement, items, selectedIndex, formatter) {
        if (!ulElement) return;
        ulElement.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = formatter(item);
            if (index === selectedIndex) {
                li.classList.add('selected');
            }
            if (item.locked || item.disabled) {
                li.classList.add('locked');
            }
            ulElement.appendChild(li);
        });
    }

    drawTitleMenu(menuItems, selectedIndex) {
        this._renderList(this.elements.titleMenuList, menuItems, selectedIndex, item => item.name);
    }

    drawMapSelect(maps, selectedIndex) {
        const mapItems = Object.values(maps);
        this._renderList(this.elements.mapList, mapItems, selectedIndex, item => item.name);
    }

    drawPauseMenu(menuItems, selectedIndex) {
        this._renderList(this.elements.pauseMenuList, menuItems, selectedIndex, item => item.name);
    }

    drawCombatMenu(menuItems, selectedIndex) {
        this._renderList(this.elements.combatMenuList, menuItems, selectedIndex, item => item.name);
    }

    addCombatLogMessage(message) {
        const p = document.createElement('p');
        p.textContent = message;
        this.elements.combatLog.appendChild(p);
        // Auto-scroll to the bottom
        this.elements.combatLogContainer.scrollTop = this.elements.combatLogContainer.scrollHeight;
    }

    clearCombatLog() {
        this.elements.combatLog.innerHTML = '';
    }
    
    drawShop(title, items, selectedIndex) {
        this.elements.shopTitle.textContent = title;
        this._renderList(this.elements.shopItemList, items, selectedIndex, item => {
            return item.price !== undefined ? `${item.name} - ${item.price} G` : item.name;
        });
    }

    drawStatusScreen(player) {
        const stats = player.getTotalStats();
        this.elements.statusHealth.textContent = `${player.currentHealth} / ${player.maxHealth}`;
        this.elements.statusAttack.textContent = `${stats.attack} (${player.attack} + ${stats.bonuses.attack})`;
        this.elements.statusDefense.textContent = `${stats.defense} (${player.defense} + ${stats.bonuses.defense})`;
        this.elements.statusSpeed.textContent = `${stats.speed} (${player.speed} + ${stats.bonuses.speed})`;
        this.elements.statusMagic.textContent = `${stats.magic} (${player.magic} + ${stats.bonuses.magic})`;

        let stocksHtml = '<h3>Stocks</h3>';
        if (Object.keys(player.stocks).length === 0) {
            stocksHtml += '<p>None</p>';
        } else {
            stocksHtml += '<ul>';
            for (const symbol in player.stocks) {
                stocksHtml += `<li>${symbol}: ${player.stocks[symbol]} shares</li>`;
            }
            stocksHtml += '</ul>';
        }
        this.elements.statusStocks.innerHTML = stocksHtml;
    }

    drawEquipmentScreen(player, menuState) {
        const equippedSlots = [
            { name: 'Weapon', item: player.equipment.weapon, slot: 'weapon' },
            { name: 'Armor', item: player.equipment.armor, slot: 'armor' },
            { name: 'Shield', item: player.equipment.shield, slot: 'shield' },
            { name: 'Shoes', item: player.equipment.shoes, slot: 'shoes' },
            { name: 'Accessory', item: player.equipment.accessory, slot: 'accessory' },
        ];

        // 1. Render Equipped Items
        const equippedFormatter = item => {
            const itemName = item.item ? item.item.name : 'None';
            return `<div>${item.name}</div><div>${itemName}</div>`;
        };
        this._renderList(this.elements.equippedItemsList, equippedSlots, menuState.state === 'equipment' ? menuState.index : -1, equippedFormatter);

        // 2. Render Inventory Items
        const inventoryFormatter = item => {
            let stats = [];
            if (item.attack) stats.push(`ATK+${item.attack}`);
            if (item.defense) stats.push(`DEF+${item.defense}`);
            if (item.speed) stats.push(`SPD+${item.speed}`);
            if (item.magic) stats.push(`MAG+${item.magic}`);
            return `<div>${item.name}</div><div class="item-stats">${stats.join(' ')}</div>`;
        };
        this._renderList(this.elements.inventoryItemsList, player.inventory, menuState.state === 'inventory' ? menuState.index : -1, inventoryFormatter);

        // 3. Render Status Display (with Preview)
        this.drawEquipmentStatus(player, menuState);
    }

    drawEquipmentStatus(player, menuState) {
        const currentStats = player.getTotalStats();
        let previewItem = null;
        if (menuState.state === 'inventory' && player.inventory.length > 0) {
            previewItem = player.inventory[menuState.index];
        }

        const getPreviewStats = () => {
            if (!previewItem) return null;

            const tempPlayer = new Player(); // Use a temporary player for calculation
            Object.assign(tempPlayer, JSON.parse(JSON.stringify(player))); // Deep copy
            
            // Temporarily equip the item to calculate new stats
            let slotToEquip = null;
            if (previewItem.type === 'weapon') slotToEquip = 'weapon';
            else if (previewItem.type === 'armor') slotToEquip = 'armor';
            else if (previewItem.type === 'shield') slotToEquip = 'shield';
            else if (previewItem.type === 'shoes') slotToEquip = 'shoes';
            else if (previewItem.type === 'accessory') slotToEquip = 'accessory';

            if (slotToEquip) {
                if(tempPlayer.equipment[slotToEquip]) {
                    tempPlayer.inventory.push(tempPlayer.equipment[slotToEquip]);
                }
                tempPlayer.equipment[slotToEquip] = previewItem;
            }

            return tempPlayer.getTotalStats();
        };

        const previewStats = getPreviewStats();

        const statMapping = [
            { label: 'Health', value: `${player.currentHealth} / ${player.maxHealth}` },
            { label: 'Attack', key: 'attack' },
            { label: 'Defense', key: 'defense' },
            { label: 'Speed', key: 'speed' },
            { label: 'Magic', key: 'magic' },
        ];

        let html = '';
        statMapping.forEach(stat => {
            html += `<div class="label">${stat.label}</div>`;
            if (stat.key) {
                const baseValue = currentStats[stat.key];
                let previewHtml = '';
                if (previewStats) {
                    const previewValue = previewStats[stat.key];
                    if (previewValue !== baseValue) {
                        previewHtml = ` <span class="arrow">→</span> <span class="preview">${previewValue}</span>`;
                    }
                }
                html += `<div class="value">${baseValue}${previewHtml}</div>`;
            } else {
                html += `<div class="value">${stat.value}</div>`;
            }
        });

        this.elements.equipmentStatusDisplay.innerHTML = html;
    }

    drawStockScreen(stocks, selectedIndex) {
        const formatter = stock => {
            if (stock.loading) {
                return `<div>${stock.symbol}</div><div>Loading...</div>`;
            }
            if (stock.error) {
                return `<div>${stock.symbol}</div><div class="item-stats">Error</div>`;
            }
            const price = parseFloat(stock.price).toFixed(2);
            const change = parseFloat(stock.change).toFixed(2);
            const changeClass = change >= 0 ? 'preview' : 'locked'; // Use existing classes for color
            return `<div>${stock.symbol}</div><div>$${price} <span class="${changeClass}">(${change})</span></div>`;
        };
        this._renderList(this.elements.stockList, stocks, selectedIndex, formatter);
    }
}

// =================================================================================
// I N P U T   H A N D L E R
// =================================================================================

class InputHandler {
    constructor(game) {
        this.game = game;
        this.ui = game.ui;
        this.player = game.player;
        this.data = game.data;
        
        this.menu = {
            title: { index: 0, items: [] },
            mapSelect: { index: 0, items: Object.values(this.data.maps) },
            pause: { index: 0, items: [{name: 'Resume'}, {name: 'Select Stage'}, {name: 'Status'}, {name: 'Equipment'}, {name: 'Save'}, {name: 'Quit to Title'}] },
            shop: { state: 'category', index: 0, currentList: [] },
            equipment: { state: 'equipment', index: 0 },
            combat: { index: 0, items: [{name: 'たたかう'}, {name: 'にげる'}] },
            stock_shop: { index: 0 }
        };

        window.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    async handleKeydown(e) {
        const state = this.game.gameState;

        if (state === 'title') this.handleTitleInput(e);
        else if (state === 'map_select') this.handleMapSelectInput(e);
        else if (state === 'playing') this.handlePlayingInput(e);
        else if (state === 'paused') this.handlePausedInput(e);
        else if (state === 'status_screen') this.handleStatusScreenInput(e);
        else if (state === 'equipment_screen') this.handleEquipmentScreenInput(e);
        else if (state === 'shop') this.handleShopInput(e);
        else if (state === 'stock_shop') this.handleStockShopInput(e);
        else if (state === 'combat') this.handleCombatInput(e);
    }

    _navigateMenu(e, menuState, list) {
        if (e.key === 'ArrowUp') {
            menuState.index = (menuState.index - 1 + list.length) % list.length;
        } else if (e.key === 'ArrowDown') {
            menuState.index = (menuState.index + 1) % list.length;
        }
    }

    handleCombatInput(e) {
        if (this.game.combatState !== 'player_turn') return;

        this._navigateMenu(e, this.menu.combat, this.menu.combat.items);
        this.ui.drawCombatMenu(this.menu.combat.items, this.menu.combat.index);

        if (e.key === 'Enter') {
            const selection = this.menu.combat.items[this.menu.combat.index].name;
            this.game.handleCombatAction(selection);
        }
    }

    handleTitleInput(e) {
        this._navigateMenu(e, this.menu.title, this.menu.title.items);
        this.ui.drawTitleMenu(this.menu.title.items, this.menu.title.index);

        if (e.key === 'Enter') {
            const selection = this.menu.title.items[this.menu.title.index];
            if (selection.disabled) return;

            if (selection.name === 'New Game') {
                this.game.newGame();
            } else if (selection.name === 'Continue') {
                this.game.loadGame();
            }
        }
    }

    handleMapSelectInput(e) {
        this._navigateMenu(e, this.menu.mapSelect, this.menu.mapSelect.items);
        if (e.key === 'Enter') {
            const selectedMap = this.menu.mapSelect.items[this.menu.mapSelect.index];
            if (selectedMap.unlocked) {
                const mapKey = Object.keys(this.data.maps)[this.menu.mapSelect.index];
                this.game.enterMap(mapKey);
            }
        }
        this.ui.drawMapSelect(this.data.maps, this.menu.mapSelect.index);
    }

    handlePlayingInput(e) {
        if (e.key === 'Escape') {
            this.game.gameState = 'paused';
            this.menu.pause.index = 0;
            this.ui.show('pause');
            this.ui.drawPauseMenu(this.menu.pause.items, this.menu.pause.index);
            this.ui.elements.game.style.filter = 'blur(3px)';
            return;
        }
        if (e.code === 'Space') {
            e.preventDefault();
            this.game.showChatPrompt();
            return;
        }
        if (e.key === 'Enter') {
            const tile = this.game.map.getTile(this.player.x, this.player.y);
            if (tile === TILE_MAPPING.WEAPON_SHOP) {
                this.game.gameState = 'shop';
                this.menu.shop.state = 'category';
                this.menu.shop.index = 0;
                this.ui.showMessage('Welcome to the weapon shop!', () => {
                    this.ui.show('shop');
                    this.ui.drawShop('Weapon Shop', this.data.shopCategories, 0);
                });
            } else if (tile === TILE_MAPPING.STOCK_SHOP) {
                this.game.enterStockShop();
            }
            return;
        }

        if (e.key === 'ArrowUp') this.player.move(0, -1, this.game.map, this.game);
        else if (e.key === 'ArrowDown') this.player.move(0, 1, this.game.map, this.game);
        else if (e.key === 'ArrowLeft') this.player.move(-1, 0, this.game.map, this.game);
        else if (e.key === 'ArrowRight') this.player.move(1, 0, this.game.map, this.game);
    }

    handlePausedInput(e) {
        this._navigateMenu(e, this.menu.pause, this.menu.pause.items);
        if (e.key === 'Escape') {
            this.game.gameState = 'playing';
            this.ui.hide('pause');
            this.ui.elements.game.style.filter = 'none';
            this.game.gameLoop(); // Restart loop
        }
        if (e.key === 'Enter') {
            const selection = this.menu.pause.items[this.menu.pause.index].name;
            if (selection === 'Resume') {
                this.game.gameState = 'playing';
                this.ui.hide('pause');
                this.ui.elements.game.style.filter = 'none';
                this.game.gameLoop(); // Restart loop
            } else if (selection === 'Select Stage') {
                this.game.gameState = 'map_select';
                this.ui.hide('pause');
                this.ui.elements.game.style.filter = 'none';
                this.ui.show('mapSelect');
                this.ui.drawMapSelect(this.data.maps, this.menu.mapSelect.index);
            } else if (selection === 'Status') {
                this.game.gameState = 'status_screen';
                this.ui.hide('pause');
                this.ui.show('status');
                this.ui.drawStatusScreen(this.player);
            } else if (selection === 'Equipment') {
                this.game.gameState = 'equipment_screen';
                this.menu.equipment.state = 'equipment';
                this.menu.equipment.index = 0;
                this.ui.hide('pause');
                this.ui.show('equipment');
                this.ui.drawEquipmentScreen(this.player, this.menu.equipment);
            } else if (selection === 'Save') {
                this.game.saveGame();
            } else if (selection === 'Quit to Title') {
                this.game.gameState = 'title';
                this.ui.hideAllScreens();
                this.ui.show('title');
                this.ui.elements.game.style.filter = 'none';
                document.body.style.backgroundColor = '#000';
                this.game.initTitleScreen();
            }
        }
        this.ui.drawPauseMenu(this.menu.pause.items, this.menu.pause.index);
    }

    handleStatusScreenInput(e) {
        if (e.key === 'Enter' || e.key === 'Escape') {
            this.game.gameState = 'paused';
            this.ui.hide('status');
            this.ui.show('pause');
        }
    }

    handleEquipmentScreenInput(e) {
        const menu = this.menu.equipment;
        if (e.key === 'Escape') {
            this.game.gameState = 'paused';
            this.ui.hide('equipment');
            this.ui.show('pause');
            return;
        }

        let needsRedraw = false;

        if (e.key === 'ArrowLeft' && menu.state === 'inventory') {
            menu.state = 'equipment';
            menu.index = 0;
            needsRedraw = true;
        } else if (e.key === 'ArrowRight' && menu.state === 'equipment') {
            menu.state = 'inventory';
            menu.index = 0;
            needsRedraw = true;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const listSize = menu.state === 'equipment' ? 5 : this.player.inventory.length;
            if (listSize > 0) {
                if (e.key === 'ArrowUp') menu.index = (menu.index - 1 + listSize) % listSize;
                else menu.index = (menu.index + 1) % listSize;
                needsRedraw = true;
            }
        } else if (e.key === 'Enter') {
            if (menu.state === 'equipment') {
                const slots = ['weapon', 'armor', 'shield', 'shoes', 'accessory'];
                this.player.unequip(slots[menu.index]);
            } else { // inventory
                if (this.player.inventory.length > 0) {
                    const item = this.player.inventory[menu.index];
                    this.player.equip(item);
                    // After equipping, the selection might be out of bounds, so reset it.
                    if (this.menu.equipment.index >= this.player.inventory.length) {
                        this.menu.equipment.index = Math.max(0, this.player.inventory.length - 1);
                    }
                }
            }
            this.ui.updatePlayerStats(this.player);
            needsRedraw = true;
        }

        if (needsRedraw) {
            this.ui.drawEquipmentScreen(this.player, menu);
        }
    }
    
    handleShopInput(e) {
        const menu = this.menu.shop;

        // Determine the list for navigation purposes first
        let currentList;
        if (menu.state === 'category') {
            currentList = this.data.shopCategories;
        } else {
            let items = [];
            if (menu.state === 'weapons') items = this.data.weapons;
            else if (menu.state === 'armors') items = this.data.armors;
            else if (menu.state === 'shoes') items = this.data.shoes;
            else if (menu.state === 'accessories') items = this.data.accessories;
            currentList = [...items, {name: 'Back'}];
        }

        // Handle navigation and actions
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            this._navigateMenu(e, menu, currentList);
        } else if (e.key === 'Escape') {
            if (menu.state === 'category') {
                this.game.gameState = 'playing';
                this.ui.hide('shop');
                this.game.gameLoop(); // Restart loop
                return; // Exit to prevent redraw
            } else {
                menu.state = 'category';
                menu.index = 0;
            }
        } else if (e.key === 'Enter') {
            const selection = currentList[menu.index];
            if (selection.name === 'Back' || selection.name === 'Exit') {
                if (menu.state === 'category') {
                    this.game.gameState = 'playing';
                    this.ui.hide('shop');
                    this.game.gameLoop(); // Restart loop
                    return; // Exit
                } else {
                    menu.state = 'category';
                    menu.index = 0;
                }
            } else if (menu.state === 'category') {
                if (selection.name === 'Buy Weapons') menu.state = 'weapons';
                else if (selection.name === 'Buy Armor') menu.state = 'armors';
                else if (selection.name === 'Buy Shoes') menu.state = 'shoes';
                else if (selection.name === 'Buy Accessories') menu.state = 'accessories';
                menu.index = 0;
            } else { // Buying an item
                if (this.player.money >= selection.price) {
                    this.player.money -= selection.price;
                    this.player.inventory.push(selection);
                    this.ui.updatePlayerStats(this.player);
                    this.ui.showMessage(`You bought a ${selection.name}.`);
                } else {
                    this.ui.showMessage("You don't have enough money.");
                }
                return; // Prevent redraw because message box is active
            }
        }

        // Redraw the UI based on the new state
        let titleToDraw = 'Weapon Shop';
        let listToDraw;
        if (menu.state === 'category') {
            listToDraw = this.data.shopCategories;
        } else {
            let items = [];
            if (menu.state === 'weapons') { items = this.data.weapons; titleToDraw = 'Weapons'; }
            else if (menu.state === 'armors') { items = this.data.armors; titleToDraw = 'Armor'; }
            else if (menu.state === 'shoes') { items = this.data.shoes; titleToDraw = 'Shoes'; }
            else if (menu.state === 'accessories') { items = this.data.accessories; titleToDraw = 'Accessories'; }
            listToDraw = [...items, {name: 'Back'}];
        }
        this.ui.drawShop(titleToDraw, listToDraw, menu.index);
    }

    handleStockShopInput(e) {
        const menu = this.menu.stock_shop;
        this._navigateMenu(e, menu, this.game.stockData);

        if (e.key === 'Escape') {
            this.game.gameState = 'playing';
            this.ui.hide('stock');
            this.ui.show('game');
            this.game.gameLoop();
            return; // Return to prevent redraw
        }
        
        if (e.key === 'Enter') {
            const selectedStock = this.game.stockData[menu.index];
            if (!selectedStock || selectedStock.loading || selectedStock.error) return;

            const action = prompt(`Action for ${selectedStock.symbol}: (buy / sell)`, 'buy');
            if (!action) return;

            const quantity = parseInt(prompt('Quantity:', '1'));
            if (isNaN(quantity) || quantity <= 0) return;

            if (action.toLowerCase() === 'buy') {
                this.game.buyStock(selectedStock.symbol, quantity);
            } else if (action.toLowerCase() === 'sell') {
                this.game.sellStock(selectedStock.symbol, quantity);
            }
        }

        this.ui.drawStockScreen(this.game.stockData, menu.index);
    }
}


// =================================================================================
// G A M E   I N I T I A L I Z A T I O N
// =================================================================================

class Game {
    constructor() {
        this.canvas = document.getElementById('mapCanvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.style.backgroundColor = '#000';

        this.data = new GameData();
        this.player = new Player();
        this.ui = new UIManager();
        this.map = new Map(this.data.maps.starting_plains, this.canvas);
        this.inputHandler = new InputHandler(this);

        this.gameState = 'title';
        this.mapImage = new Image();
        this.playerImage = new Image();
        this.monsterImage = new Image();
        this.currentMapKey = 'starting_plains';
        this.currentMonster = null;
        this.combatState = null; // Can be 'player_turn', 'action_in_progress'
        this.saveDataExists = false;
        this.stockData = [];
        this.apiKey = '9VWDAR4T0Y280RE7';

        this.chatMessage = null;
        this.chatMessageExpiry = 0;
        
        this.gameLoop = this.gameLoop.bind(this);
        this.init();
    }

    init() {
        this.ui.hideAllScreens();
        this.ui.show('title');
        this.initTitleScreen();
        
        let imagesLoaded = 0;
        const totalImages = 3; // Increased to 3
        const onImageLoad = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                // Images are ready, but game waits for user input
            }
        };
        this.mapImage.src = 'img/map.png';
        this.playerImage.src = 'img/player.png';
        this.monsterImage.src = 'img/monster.png'; // Preload monster image
        this.mapImage.onload = onImageLoad;
        this.playerImage.onload = onImageLoad;
        this.monsterImage.onload = onImageLoad;
    }

    initTitleScreen() {
        this.checkForSaveData();
        const menuItems = [
            { name: 'New Game' },
            { name: 'Continue', disabled: !this.saveDataExists }
        ];
        this.inputHandler.menu.title.items = menuItems;
        // Select "Continue" by default if it exists
        this.inputHandler.menu.title.index = this.saveDataExists ? 1 : 0;
        this.ui.drawTitleMenu(menuItems, this.inputHandler.menu.title.index);
    }

    checkForSaveData() {
        this.saveDataExists = localStorage.getItem('rpgSaveData') !== null;
    }

    newGame() {
        this.player = new Player();
        this.inputHandler.player = this.player;

        const playerName = prompt("Enter your character's name:", "Hero");
        if (playerName) {
            this.player.name = playerName.trim();
        }

        this.gameState = 'map_select';
        this.ui.hide('title');
        this.ui.show('mapSelect');
        this.ui.drawMapSelect(this.data.maps, this.inputHandler.menu.mapSelect.index);
    }

    enterMap(mapKey, startPosition = null) {
        this.currentMapKey = mapKey;
        this.map.load(this.data.maps[mapKey]);
        
        if (startPosition) {
            this.player.x = startPosition.x;
            this.player.y = startPosition.y;
        } else {
            this.player.x = Math.floor(this.map.MAP_WIDTH_IN_TILES / 2);
            this.player.y = Math.floor(this.map.MAP_HEIGHT_IN_TILES / 2);
        }

        this.gameState = 'playing';
        this.ui.hideAllScreens();
        this.ui.show('game');
        document.body.style.backgroundColor = '#333';
        this.ui.updatePlayerStats(this.player);
        this.ui.updateMapName(this.map.name);
        
        this.gameLoop(); // Start the game loop
    }

    enterStockShop() {
        this.gameState = 'stock_shop';
        this.inputHandler.menu.stock_shop.index = 0;
        this.ui.hideAllScreens();
        this.ui.show('stock');
        this.fetchStockData();
    }

    async fetchStockData() {
        // Set initial loading state
        this.stockData = this.data.stocks.map(symbol => ({ symbol, loading: true }));
        this.ui.drawStockScreen(this.stockData, this.inputHandler.menu.stock_shop.index);

        const fetchedData = await Promise.all(this.data.stocks.map(async (symbol) => {
            try {
                const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${this.apiKey}`);
                if (!response.ok) {
                    return { symbol, error: 'Network response was not ok' };
                }
                const data = await response.json();
                const quote = data['Global Quote'];
                if (quote && Object.keys(quote).length > 0) {
                    return {
                        symbol: quote['01. symbol'],
                        price: quote['05. price'],
                        change: quote['09. change'],
                    };
                } else if (data.Note) {
                    // Handle API limit note
                    console.warn(`API Note for ${symbol}: ${data.Note}`);
                    return { symbol, error: 'API limit likely reached' };
                } else {
                    return { symbol, error: 'Invalid data' };
                }
            } catch (error) {
                console.error(`Error fetching ${symbol}:`, error);
                return { symbol, error: 'Fetch failed' };
            }
        }));

        this.stockData = fetchedData;
        this.ui.drawStockScreen(this.stockData, this.inputHandler.menu.stock_shop.index);
    }

    buyStock(symbol, quantity) {
        const stock = this.stockData.find(s => s.symbol === symbol);
        if (!stock || !stock.price) {
            this.ui.showMessage('Could not retrieve stock price.');
            return;
        }

        const totalCost = stock.price * quantity;
        if (this.player.money < totalCost) {
            this.ui.showMessage('Not enough money.');
            return;
        }

        this.player.money -= totalCost;
        this.player.stocks[symbol] = (this.player.stocks[symbol] || 0) + quantity;
        this.ui.updatePlayerStats(this.player);
        this.ui.showMessage(`Bought ${quantity} share(s) of ${symbol}.`);
    }

    sellStock(symbol, quantity) {
        const ownedQuantity = this.player.stocks[symbol] || 0;
        if (ownedQuantity < quantity) {
            this.ui.showMessage('You do not own enough shares.');
            return;
        }

        const stock = this.stockData.find(s => s.symbol === symbol);
        if (!stock || !stock.price) {
            this.ui.showMessage('Could not retrieve stock price.');
            return;
        }

        const totalValue = stock.price * quantity;
        this.player.money += totalValue;
        this.player.stocks[symbol] -= quantity;
        if (this.player.stocks[symbol] === 0) {
            delete this.player.stocks[symbol];
        }
        this.ui.updatePlayerStats(this.player);
        this.ui.showMessage(`Sold ${quantity} share(s) of ${symbol}.`);
    }

    startCombat() {
        this.gameState = 'combat';
        this.combatState = 'player_turn';

        // For now, we always fight a slime
        this.currentMonster = new Monster(this.data.monsters.slime);
        this.ui.hideAllScreens();
        this.ui.show('combat');
        
        this.ui.elements.combatMonsterName.textContent = this.currentMonster.name;
        this.ui.clearCombatLog();
        this.ui.addCombatLogMessage(`A wild ${this.currentMonster.name} appeared!`);

        // Draw monster sprite on canvas
        const monsterCanvas = document.getElementById('combat-monster-canvas');
        const monsterCtx = monsterCanvas.getContext('2d');
        monsterCtx.imageSmoothingEnabled = false; // Preserve pixel art style

        const spriteWidth = 8;
        const spriteHeight = 9;
        const sx = this.currentMonster.spriteIndex * spriteWidth;
        const sy = 0;

        monsterCtx.clearRect(0, 0, monsterCanvas.width, monsterCanvas.height);
        monsterCtx.drawImage(
            this.monsterImage, 
            sx, sy, spriteWidth, spriteHeight,             // Source rect
            0, 0, monsterCanvas.width, monsterCanvas.height // Destination rect (scaled)
        );

        this.updateCombatUI();

        this.inputHandler.menu.combat.index = 0;
        this.ui.drawCombatMenu(this.inputHandler.menu.combat.items, 0);
    }

    updateCombatUI() {
        this.ui.elements.combatMonsterHp.textContent = `${this.currentMonster.currentHealth} / ${this.currentMonster.maxHealth}`;
        this.ui.elements.combatPlayerLevel.textContent = this.player.level;
        this.ui.elements.combatPlayerHp.textContent = `${this.player.currentHealth} / ${this.player.maxHealth}`;
    }

    endCombat(victory) {
        if (victory) {
            this.player.gainXP(this.currentMonster.exp);
            this.player.money += this.currentMonster.gold;
            this.ui.updatePlayerStats(this.player);
        }
        this.gameState = 'playing';
        this.combatState = null;
        this.currentMonster = null;
        this.ui.hide('combat');
        this.ui.show('game');
        this.gameLoop();
    }

    handleCombatAction(action) {
        if (this.gameState !== 'combat' || this.combatState !== 'player_turn') return;

        this.combatState = 'action_in_progress'; // Prevent player input during the sequence

        if (action === 'たたかう') {
            // Player's turn
            const playerStats = this.player.getTotalStats();
            const damage = Math.max(1, playerStats.attack - this.currentMonster.defense);
            this.currentMonster.currentHealth -= damage;
            this.updateCombatUI();
            this.ui.addCombatLogMessage(`プレイヤーの攻撃！ ${damage} のダメージを与えた。`);

            // Check for monster defeat
            if (this.currentMonster.currentHealth <= 0) {
                this.currentMonster.currentHealth = 0;
                this.updateCombatUI();
                setTimeout(() => {
                    this.ui.addCombatLogMessage(`${this.currentMonster.name} をやっつけた！`);
                    setTimeout(() => {
                        this.ui.addCombatLogMessage(`経験値 ${this.currentMonster.exp} と ${this.currentMonster.gold} ゴールドを手に入れた。`);
                        setTimeout(() => this.endCombat(true), 1000); // End combat after a delay
                    }, 1000);
                }, 1000);
                return; // Stop further actions
            }

            // Monster's turn (after a delay)
            setTimeout(() => {
                const monsterDamage = Math.max(1, this.currentMonster.attack - playerStats.defense);
                this.player.currentHealth -= monsterDamage;
                this.ui.updatePlayerStats(this.player);
                this.updateCombatUI();
                this.ui.addCombatLogMessage(`${this.currentMonster.name} の攻撃！ ${monsterDamage} のダメージを受けた。`);

                // Check for player defeat
                if (this.player.currentHealth <= 0) {
                    this.player.currentHealth = 0;
                    this.updateCombatUI();
                    setTimeout(() => {
                        this.ui.addCombatLogMessage('あなたは倒れてしまった...');
                        setTimeout(() => this.endCombat(false), 1000); // End combat after a delay
                    }, 1000);
                    return; // Stop further actions
                }

                // Return to player's turn
                this.combatState = 'player_turn';
                this.ui.drawCombatMenu(this.inputHandler.menu.combat.items, this.inputHandler.menu.combat.index);

            }, 1000); // 1-second delay before monster attacks

        } else if (action === 'にげる') {
            this.ui.addCombatLogMessage('戦闘から逃げ出した。');
            setTimeout(() => this.endCombat(false), 1000);
        }
    }

    saveGame() {
        try {
            const saveData = {
                player: {
                    name: this.player.name,
                    x: this.player.x,
                    y: this.player.y,
                    level: this.player.level,
                    money: this.player.money,
                    maxHealth: this.player.maxHealth,
                    currentHealth: this.player.currentHealth,
                    attack: this.player.attack,
                    defense: this.player.defense,
                    speed: this.player.speed,
                    magic: this.player.magic,
                    inventory: this.player.inventory,
                    equipment: this.player.equipment,
                    stocks: this.player.stocks,
                },
                currentMapKey: this.currentMapKey
            };
            localStorage.setItem('rpgSaveData', JSON.stringify(saveData));
            this.ui.showMessage('Game Saved!');
        } catch (error) {
            console.error("Failed to save game:", error);
            this.ui.showMessage('Error: Could not save game.');
        }
    }

    loadGame() {
        const savedString = localStorage.getItem('rpgSaveData');
        if (!savedString) {
            this.ui.showMessage("No save data found.");
            return;
        }
        try {
            const savedData = JSON.parse(savedString);
            
            const p = savedData.player;
            this.player.name = p.name || 'Hero';
            this.player.x = p.x;
            this.player.y = p.y;
            this.player.level = p.level;
            this.player.money = p.money;
            this.player.maxHealth = p.maxHealth;
            this.player.currentHealth = p.currentHealth;
            this.player.attack = p.attack;
            this.player.defense = p.defense;
            this.player.speed = p.speed;
            this.player.magic = p.magic;
            this.player.inventory = p.inventory;
            this.player.equipment = p.equipment;
            this.player.stocks = p.stocks || {};

            this.enterMap(savedData.currentMapKey, { x: p.x, y: p.y });

        } catch (error) {
            console.error("Failed to load game:", error);
            this.ui.showMessage('Error: Save data is corrupted.');
            localStorage.removeItem('rpgSaveData');
            this.initTitleScreen();
        }
    }

    showChatPrompt() {
        const message = prompt("Enter message:");
        if (message) {
            this.chatMessage = message;
            this.chatMessageExpiry = Date.now() + 10000;
        }
    }

    drawChatBubble() {
        const FONT_SIZE = 10;
        const PADDING = 8;
        const BUBBLE_Y_OFFSET = 20;
        const BUBBLE_ARROW_HEIGHT = 5;

        this.ctx.font = `${FONT_SIZE}px monospace`;
        const textWidth = this.ctx.measureText(this.chatMessage).width;
        
        const bubbleWidth = textWidth + PADDING * 2;
        const bubbleHeight = FONT_SIZE + PADDING * 2;
        const bubbleX = this.player.x * TILE_SIZE + TILE_SIZE / 2 - bubbleWidth / 2;
        const bubbleY = this.player.y * TILE_SIZE - BUBBLE_Y_OFFSET - bubbleHeight;

        // Draw rounded rectangle (the "cloud")
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        const radius = 10;
        this.ctx.moveTo(bubbleX + radius, bubbleY);
        this.ctx.lineTo(bubbleX + bubbleWidth - radius, bubbleY);
        this.ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY, bubbleX + bubbleWidth, bubbleY + radius);
        this.ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - radius);
        this.ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight, bubbleX + bubbleWidth - radius, bubbleY + bubbleHeight);
        
        // Arrow pointing down
        this.ctx.lineTo(bubbleX + bubbleWidth / 2 + 5, bubbleY + bubbleHeight);
        this.ctx.lineTo(bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight + BUBBLE_ARROW_HEIGHT);
        this.ctx.lineTo(bubbleX + bubbleWidth / 2 - 5, bubbleY + bubbleHeight);

        this.ctx.lineTo(bubbleX + radius, bubbleY + bubbleHeight);
        this.ctx.quadraticCurveTo(bubbleX, bubbleY + bubbleHeight, bubbleX, bubbleY + bubbleHeight - radius);
        this.ctx.lineTo(bubbleX, bubbleY + radius);
        this.ctx.quadraticCurveTo(bubbleX, bubbleY, bubbleX + radius, bubbleY);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();

        // Draw text inside the bubble
        this.ctx.fillStyle = 'black';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.chatMessage, bubbleX + bubbleWidth / 2, bubbleY + bubbleHeight / 2);
    }

    gameLoop() {
        if (this.gameState !== 'playing') {
            return; // Stop the loop if not in playing state
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.draw(this.ctx, this.mapImage);
        this.player.draw(this.ctx, this.playerImage);

        if (this.chatMessage && Date.now() < this.chatMessageExpiry) {
            this.drawChatBubble();
        } else {
            this.chatMessage = null;
        }

        requestAnimationFrame(this.gameLoop);
    }
}

window.addEventListener('load', () => {
    new Game();
});
