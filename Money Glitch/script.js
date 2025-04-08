let clicks = 0;
let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;
let acquiredUpgrades = 0;
let last_one = 0;
let last_ten = 0;
let numberOfClicks = 0;
let active = false;
let times_gambled = 0;
let times_donated = 0;
let last_donation = 0;

const coin = document.querySelector("#coin");
const moneyTracker = document.querySelector("#money");
const mpsTracker = document.querySelector('#mps');
const mpcTracker = document.querySelector('#mpc');
const upgradesTracker = document.querySelector('#upgrades');
const upgradeList = document.querySelector('#upgradeList');
const msgbox = document.querySelector('#msgbox');
const gambling = document.querySelector("#gamblingInput");
const charity = document.querySelector("#charityInput");
const achievement_list = document.querySelector("#achievementsList");

coin.addEventListener("click", (event) => {
    clicks += moneyPerClick;
});

function step(timestamp) {
    moneyTracker.textContent = `$${Math.round(clicks)}`;
    mpsTracker.textContent = `Money per second: ${moneyPerSecond}`;
    mpcTracker.textContent = `Money per click: ${moneyPerClick}`;
    // upgradesTracker.textContent = acquiredUpgrades;

    if (timestamp >= last_ten + 10000) {
        upgrades.forEach((upgrade) => {
            if (upgrade.name === "Shares") {
                let x = Math.random();

                if (clicks < 5 * upgrade.bought) {
                    
                } else {
                    if (x >= 0.5) {
                        clicks += 5 * upgrade.bought;
                    } else {
                        clicks -= 5 * upgrade.bought;
                    };
                };
            };

            if (upgrade.name === "Bank Funds") {
                x = Math.random();

                if (clicks < upgrade.bought) {

                } else {
                    if (x > 0.25) {
                        clicks += 5 * upgrade.bought;
                    } else {
                        clicks -= 5 * upgrade.bought;
                    };
                }
            };
            
        last_ten = timestamp;
        })
    } else if (timestamp >= last_one + 1000) {
        clicks += moneyPerSecond;
        last_one = timestamp;
    };

    if (moneyPerSecond > 0 && !active) {
        mpsTracker.classList.add('active');
        active = true;
    };
    
    achievements = achievements.filter((achievement) => {
        if (achievement.acquired) {
            return false;
        };

        if (
            achievement.requiredClicks &&
            clicks >= achievement.requiredClicks
        ) {
            achievement.acquired = true;
            message(achievement.name, 'achievement');
            return false;
        };

        upgrades.forEach((upgrade) => {
            if (upgrade.name === "Shares" && achievement.name === "To Wallstreet!" && upgrade.bought === 1) {
                message(achievement.name, "achievement");
                achievement.acquired = true;
                return false;
            } else if (upgrade.name === "Bank Funds" && achievement.name === "Just To Be Safe" && upgrade.bought === 1) {
                message(achievement.name, "achievement");
                achievement.acquired = true;
                return false;
            } else if (upgrade.name === "Start a Company" && achievement.name === "Small Business Owner" && upgrade.bought === 1) {
                message(achievement.name, "achievement");
                achievement.acquired = true;
                return false;
            } else if (upgrade.name === "Start a Company" && achievement.name === "Capitalist" && upgrade.bought === 10) {
                message(achievement.name, "achievement");
                achievement.acquired = true;
                return false;
            } else if (achievement.name === "All In" && times_gambled === 1 && achievement.acquired === false) {
                message(achievement.name, "achievement");
                achievement.acquired = true;
                return false
            } else if (achievement.name === "A Rare Billionaire" && times_donated === 1 && achievement.acquired === false) {
                message(achievement.name, "achievement");
                achievement.acquired = true;
                return false
            } else if (achievement.name === "A Heart Made of Gold" && last_donation === 1000 && achievement.acquired === false) {
                message(achievement.name, "achievement");
                achievement.acquired = true
                return false
            }
        });

        achievements.forEach((achievement) => {
            if (achievement.acquired === true && achievement.displayed === false) {
                const list_item = document.createElement("div")
                const text = document.createElement("p")

                list_item.classList.add("unlockedAchievement")
                text.textContent = `${achievement.name} - ${achievement.description}`

                list_item.appendChild(text)
                achievement_list.appendChild(list_item)
                achievement.displayed = true
            }
        })
        return true;
    });

    window.requestAnimationFrame(step);
}

window.addEventListener('load', (event) => {
    upgrades.forEach((upgrade) => {
        upgradeList.appendChild(createCard(upgrade));
    });
    window.requestAnimationFrame(step);
});

let upgrades = [
    {
        name: "Coin Upgrade",
        cost: 10,
        clicks: 1,
        description: "The coin generates more money the more you click on it.",
        bought: 0,
    },
    {
        name: "Shares",
        cost: 50,
        amount: 0,
        description: "Every ten seconds you can either win or lose money (50% chance of either winning or losing). The amount of money you lose depends on how many of this upgrade you have bought.",
        bought: 0,
    },
    {
        name: "Bank Funds",
        cost: 100,
        amount: 0,
        description: "Like shares, but more expensive and safer. Every ten seconds there is a 75% chance you will go into profit and a 25% chance you will lose money.",
        bought: 0,
    },
    {
        name: "Start a Company",
        cost: 1000,
        amount: 100,
        description: "Create a business, sell stuff, make money!",
        bought: 0,
    },
];

let achievements = [
    {
        name: "Genieus...",
        requiredClicks: 10,
        acquired: false,
        description: "Earn $10",
        displayed: false,
    },
    {
        name: "Infinite Money Glitch",
        requiredClicks: 100,
        acquired: false,
        description: "Earn $100",
        displayed: false,
    },
    {
        name: "Money, money money",
        requiredClicks: 1000,
        acquired: false,
        description: "Earn $1000",
        displayed: false,
    },
    {
        name: "Rich bitch",
        requiredClicks: 10000,
        acquired: false,
        description: "Earn $10 000",
        displayed: false,
    },
    {
        name: "The Ultimate Capitalist",
        requiredClicks: 100000,
        acquired: false,
        description: "Earn $100 000",
        displayed: false,
    },
    {
        name: "Tax Evader?",
        requiredClicks: 1000000,
        acquired: false,
        description: "Earn $1 000 000",
        displayed: false,
    },
    {
        name: "Tricking The System",
        requiredClicks: 10000000,
        acquired: false,
        description: "Earn $10 000 000",
        displayed: false,
    },
    {
        name: "Candy rain? No, money rain",
        requiredClicks: 100000000,
        acquired: false,
        description: "Earn $100 000 000",
        displayed: false,
    },
    {
        name: "Scrooge McDuck",
        requiredClicks: 1000000000,
        acquired: false,
        description: "Earn $1 000 000 000",
        displayed: false,
    },
    {
        name: "All In",
        acquired: false,
        description: "Gamble for the first time",
        displayed: false,
    },
    {
        name: "Small Business Owner",
        acquired: false,
        description: "Start your first company",
        displayed: false,
    },
    {
        name: "Capitalist",
        acquired: false,
        description: "Start your 10th company",
        displayed: false,
    },
    {
        name: "Law-Abiding Citizen",
        acquired: false,
        description: "Pay your taxes for the first time",
        displayed: false,
    },
    {
        name: "A Rare Billionaire",
        acquired: false,
        description: "Donate money to charity for the first time",
        displayed: false,
    },
    {
        name: "A Heart Made of Gold",
        acquired: false,
        description: "Donate $1000 or more for the first time",
        displayed: false,
    },
    {
        name: "To Wallstreet!",
        acquired: false,
        description: "Buy your first share",
        displayed: false,
    },
    {
        name: "Just To Be Safe",
        acquired: false,
        description: "Buy your first bank fund",
        displayed: false,
    },
];

function createCard(upgrade) {
    const card = document.createElement('div');
    const upgradeCost = document.createElement("div")
    const upgradeText = document.createElement("div")

    card.classList.add('card');
    upgradeCost.classList.add("cost")
    upgradeText.classList.add("upgradeText")

    const header = document.createElement('p');
    header.classList.add('title');

    const cost = document.createElement('p');
    cost.classList.add("cost")

    const description = document.createElement("p")
    description.classList.add("descriptionText")
    if (upgrade.amount) {
        header.textContent = `${upgrade.name}`;
    } else {
        header.textContent = `${upgrade.name}`;
    }
    description.textContent = upgrade.description
    cost.textContent = `$${upgrade.cost}`;

    card.addEventListener('click', (e) => {
        if (clicks >= upgrade.cost) {
            acquiredUpgrades++;
            clicks -= upgrade.cost;
            upgrade.cost *= 1.5;
            upgrade.cost = Math.round(upgrade.cost)
            cost.textContent = `$${upgrade.cost}`;

            moneyPerSecond += upgrade.amount ? upgrade.amount : 0;
            moneyPerClick += upgrade.clicks ? upgrade.clicks : 0;

            message("You bought an upgrade", 'success');

            upgrade.bought += 1
        } else {
            message("You don't have enough money", 'warning');
        }
    });

    upgradeText.appendChild(header)
    upgradeText.appendChild(document.createElement("hr"))
    upgradeText.appendChild(description)
    card.appendChild(upgradeText)
    
    card.appendChild(upgradeCost.appendChild(cost));
    return card;
}

function message(text, type) {
    const p = document.createElement('p');
    p.classList.add(type);
    p.textContent = text;
    msgbox.appendChild(p);
    msgbox.style.display = "block"
    
    setTimeout(() => {
        p.parentNode.removeChild(p);
    }, 2000);
}

gambling.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        let insert = Math.round(parseFloat(gambling.value))
        let a = Math.random()
        let b = Math.random()

        if (insert < 10) {
            message("Your bet needs to be equal to or exceed $10", "warning");
        } else if (insert > 1000) {
            message("Your bet can't exceed $1000", "warning");
        } else {
            if (a > b) {
                clicks += insert;
            } else {
                clicks -= insert;
            };
            times_gambled += 1;
        };
    };
});

charity.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) { 
        let insert = Math.round(parseFloat(gambling.value));
        
        if (insert > clicks) {
            message("You don't have enough money", "warning");
        } else {
            clicks -= insert;
            times_donated += 1;
            last_donation = insert
        };
    };
});