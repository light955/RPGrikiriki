
// =================================================================================
// C O N S T A N T S
// =================================================================================

const TILE_SIZE = 8;
const TILE_MAPPING = {
    SEA: 0,
    LAKE: 1,
    ROCK: 2,
    GRASS: 3,
    WEAPON_SHOP: 4
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
                        { x: 20, y: 20, type: 'weapon', tileId: TILE_MAPPING.WEAPON_SHOP }
                    ]
                },
            },
            map_2: { name: '？？？？？', unlocked: false, config: { rocks: [], shops: [] } },
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
}

// =================================================================================
// P L A Y E R
// =================================================================================

class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.size = TILE_SIZE;
        this.level = 1;
        this.money = 10000;
        this.maxHealth = 100;
        this.currentHealth = 100;
        this.attack = 1;
        this.defense = 1;
        this.speed = 1;
        this.magic = 1;
        this.inventory = [];
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

    move(dx, dy, map) {
        const newX = this.x + dx;
        const newY = this.y + dy;
        if (map.isWalkable(newX, newY)) {
            this.x = newX;
            this.y = newY;
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

    draw(ctx, image) {
        ctx.drawImage(image, 0, 0, this.size, this.size, this.x * TILE_SIZE, this.y * TILE_SIZE, this.size, this.size);
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
        return tileId !== TILE_MAPPING.ROCK && tileId !== TILE_MAPPING.SEA;
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
            shop: document.getElementById('shop-menu'),
            messageBox: document.getElementById('message-box'),
            // Game UI
            level: document.getElementById('level'),
            money: document.getElementById('money'),
            healthBar: document.getElementById('health-bar'),
            mapName: document.getElementById('map-name-display'),
            messageText: document.getElementById('message-text'),
            // Lists
            mapList: document.getElementById('map-list'),
            pauseMenuList: document.getElementById('pause-menu-list'),
            shopTitle: document.getElementById('shop-menu').querySelector('h3'),
            shopItemList: document.getElementById('weapon-list'),
            equippedItemsList: document.getElementById('equipped-items-list'),
            inventoryItemsList: document.getElementById('inventory-items-list'),
            // Status
            statusHealth: document.getElementById('status-health'),
            statusAttack: document.getElementById('status-attack'),
            statusDefense: document.getElementById('status-defense'),
            statusSpeed: document.getElementById('status-speed'),
            statusMagic: document.getElementById('status-magic'),
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
                    e.stopPropagation();
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
        this.elements.money.textContent = player.money;
        const healthPercentage = (player.currentHealth / player.maxHealth) * 100;
        this.elements.healthBar.style.width = `${healthPercentage}%`;
    }

    updateMapName(name) {
        this.elements.mapName.textContent = name;
    }

    _renderList(ulElement, items, selectedIndex, formatter) {
        ulElement.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = formatter(item);
            if (index === selectedIndex) {
                li.classList.add('selected');
            }
            if (item.locked) {
                li.classList.add('locked');
            }
            ulElement.appendChild(li);
        });
    }

    drawMapSelect(maps, selectedIndex) {
        const mapItems = Object.values(maps);
        this._renderList(this.elements.mapList, mapItems, selectedIndex, item => item.name);
    }

    drawPauseMenu(menuItems, selectedIndex) {
        this._renderList(this.elements.pauseMenuList, menuItems, selectedIndex, item => item.name);
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
    }

    drawEquipmentScreen(player, menuState) {
        const equippedSlots = [
            { name: 'Weapon', item: player.equipment.weapon, slot: 'weapon' },
            { name: 'Armor', item: player.equipment.armor, slot: 'armor' },
            { name: 'Shield', item: player.equipment.shield, slot: 'shield' },
            { name: 'Shoes', item: player.equipment.shoes, slot: 'shoes' },
            { name: 'Accessory', item: player.equipment.accessory, slot: 'accessory' },
        ];
        
        const equippedFormatter = item => `${item.name}: ${item.item ? item.item.name : 'None'}`;
        const inventoryFormatter = item => item.name;

        if (menuState.state === 'equipment') {
            this._renderList(this.elements.equippedItemsList, equippedSlots, menuState.index, equippedFormatter);
            this._renderList(this.elements.inventoryItemsList, player.inventory, -1, inventoryFormatter);
        } else {
            this._renderList(this.elements.equippedItemsList, equippedSlots, -1, equippedFormatter);
            this._renderList(this.elements.inventoryItemsList, player.inventory, menuState.index, inventoryFormatter);
        }
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
            mapSelect: { index: 0, items: Object.values(this.data.maps) },
            pause: { index: 0, items: [{name: 'Resume'}, {name: 'Status'}, {name: 'Equipment'}, {name: 'Quit to Title'}] },
            shop: { state: 'category', index: 0, currentList: [] },
            equipment: { state: 'equipment', index: 0 }
        };

        window.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleKeydown(e) {
        if (this.ui.activeScreens.has('messageBox')) return;

        const state = this.game.gameState;

        if (state === 'title') this.handleTitleInput(e);
        else if (state === 'map_select') this.handleMapSelectInput(e);
        else if (state === 'playing') this.handlePlayingInput(e);
        else if (state === 'paused') this.handlePausedInput(e);
        else if (state === 'status_screen') this.handleStatusScreenInput(e);
        else if (state === 'equipment_screen') this.handleEquipmentScreenInput(e);
        else if (state === 'shop') this.handleShopInput(e);
    }

    _navigateMenu(e, menuState, list) {
        if (e.key === 'ArrowUp') {
            menuState.index = (menuState.index - 1 + list.length) % list.length;
        } else if (e.key === 'ArrowDown') {
            menuState.index = (menuState.index + 1) % list.length;
        }
    }

    handleTitleInput(e) {
        if (e.key === 'Enter') {
            this.game.gameState = 'map_select';
            this.ui.hide('title');
            this.ui.show('mapSelect');
            this.ui.drawMapSelect(this.data.maps, this.menu.mapSelect.index);
        }
    }

    handleMapSelectInput(e) {
        this._navigateMenu(e, this.menu.mapSelect, this.menu.mapSelect.items);
        if (e.key === 'Enter') {
            const selectedMap = this.menu.mapSelect.items[this.menu.mapSelect.index];
            if (selectedMap.unlocked) {
                const mapKey = Object.keys(this.data.maps)[this.menu.mapSelect.index];
                this.game.startGame(mapKey);
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
            }
            return;
        }

        let moved = false;
        if (e.key === 'ArrowUp') moved = this.player.move(0, -1, this.game.map);
        else if (e.key === 'ArrowDown') moved = this.player.move(0, 1, this.game.map);
        else if (e.key === 'ArrowLeft') moved = this.player.move(-1, 0, this.game.map);
        else if (e.key === 'ArrowRight') moved = this.player.move(1, 0, this.game.map);
        
        if (moved) {
            this.game.redraw();
        }
    }

    handlePausedInput(e) {
        this._navigateMenu(e, this.menu.pause, this.menu.pause.items);
        if (e.key === 'Escape') {
            this.game.gameState = 'playing';
            this.ui.hide('pause');
            this.ui.elements.game.style.filter = 'none';
        }
        if (e.key === 'Enter') {
            const selection = this.menu.pause.items[this.menu.pause.index].name;
            if (selection === 'Resume') {
                this.game.gameState = 'playing';
                this.ui.hide('pause');
                this.ui.elements.game.style.filter = 'none';
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
            } else if (selection === 'Quit to Title') {
                this.game.gameState = 'title';
                this.ui.hideAllScreens();
                this.ui.show('title');
                this.ui.elements.game.style.filter = 'none';
                document.body.style.backgroundColor = '#000';
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
        if (e.key === 'ArrowLeft' && menu.state === 'inventory') {
            menu.state = 'equipment';
            menu.index = 0;
        } else if (e.key === 'ArrowRight' && menu.state === 'equipment') {
            menu.state = 'inventory';
            menu.index = 0;
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const listSize = menu.state === 'equipment' ? 5 : this.player.inventory.length;
            if (listSize > 0) {
                if (e.key === 'ArrowUp') menu.index = (menu.index - 1 + listSize) % listSize;
                else menu.index = (menu.index + 1) % listSize;
            }
        } else if (e.key === 'Enter') {
            if (menu.state === 'equipment') {
                const slots = ['weapon', 'armor', 'shield', 'shoes', 'accessory'];
                this.player.unequip(slots[menu.index]);
            } else { // inventory
                const item = this.player.inventory[menu.index];
                this.player.equip(item);
            }
            this.ui.updatePlayerStats(this.player);
        }
        this.ui.drawEquipmentScreen(this.player, menu);
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
        
        this.init();
    }

    init() {
        this.ui.hideAllScreens();
        this.ui.show('title');
        
        let imagesLoaded = 0;
        const totalImages = 2;
        const onImageLoad = () => {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                // Images are ready, but game waits for user input
            }
        };
        this.mapImage.src = 'img/map.png';
        this.playerImage.src = 'img/player.png';
        this.mapImage.onload = onImageLoad;
        this.playerImage.onload = onImageLoad;
    }

    startGame(mapKey) {
        this.map.load(this.data.maps[mapKey]);
        this.player.x = Math.floor(this.map.MAP_WIDTH_IN_TILES / 2);
        this.player.y = Math.floor(this.map.MAP_HEIGHT_IN_TILES / 2);
        this.gameState = 'playing';
        this.ui.hideAllScreens();
        this.ui.show('game');
        document.body.style.backgroundColor = '#333';
        this.ui.updatePlayerStats(this.player);
        this.ui.updateMapName(this.map.name);
        this.redraw();
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map.draw(this.ctx, this.mapImage);
        this.player.draw(this.ctx, this.playerImage);
    }
}

window.addEventListener('load', () => {
    new Game();
});
