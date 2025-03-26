let clicks = 0;
let money = 0;
let moneyPerClick = 1;
let moneyPerSecond = 0;
let acquiredUpgrades = 0;
let last = 0;
let numberOfClicks = 0;
let active = false;

const coin = document.querySelector("#coin");
const moneyTracker = document.querySelector("#money");
const mpsTracker = document.querySelector('#mps');
const mpcTracker = document.querySelector('#mpc');
const upgradesTracker = document.querySelector('#upgrades');
const upgradeList = document.querySelector('#upgradeList');
const msgbox = document.querySelector('#msgbox');

coin.addEventListener("click", (event) => {
    clicks += moneyPerClick;
});

function step(timestamp) {
    moneyTracker.textContent = `$${Math.round(clicks)}`;
    mpsTracker.textContent = `Money per second: ${moneyPerSecond}`;
    mpcTracker.textContent = `Money per click: ${moneyPerClick}`;
    // upgradesTracker.textContent = acquiredUpgrades;

    if (timestamp >= last + 1000) {
        clicks += moneyPerSecond;
        last = timestamp;
    };

    if (moneyPerSecond > 0 && !active) {
        mpsTracker.classList.add('active');
        active = true;
    };
    
    // achievements = achievements.filter((achievement) => {
    //     if (achievement.acquired) {
    //         return false;
    //     }
    //     if (
    //         achievement.requiredUpgrades &&
    //         acquiredUpgrades >= achievement.requiredUpgrades
    //     ) {
    //         achievement.acquired = true;
    //         message(achievement.description, 'achievement');
    //         return false;
    //     } else if (
    //         achievement.requiredClicks &&
    //         numberOfClicks >= achievement.requiredClicks
    //     ) {
    //         achievement.acquired = true;
    //         message(achievement.description, 'achievement');
    //         return false;
    //     }
    //     return true;
    // });

    window.requestAnimationFrame(step);
}

window.addEventListener('load', (event) => {
    upgrades.forEach((upgrade) => {
        upgradeList.appendChild(createCard(upgrade));
    });
    window.requestAnimationFrame(step);
});

upgrades = [
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
        amount: 10,
        description: "Every ten seconds you can either win or lose money (50% chance of either winning or losing). The amount of money you lose depends on how many of this upgrade you have bought.",
        bought: 0,
    },
    {
        name: "Bank Funds",
        cost: 100,
        amount: 10,
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
            cost.textContent = `$${upgrade.cost}`;

            if (upgrade.name === "Shares") {
                x = Math.random()
                
                if (x >= 0.5) {
                    clicks += 5 * upgrade.bought
                } else {
                    clicks -= 5 * upgrade.bought
                }

            } else if (upgrade.name === "Bank Funds") {
                x = Math.random()

                if (x >= 0.25) {
                    clicks += 5 * upgrade.bought
                } else {
                    clicks -= 5 * upgrade.bought
                }
            } else {
                moneyPerSecond += upgrade.amount ? upgrade.amount : 0;
                moneyPerClick += upgrade.clicks ? upgrade.clicks : 0;
            }

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
    document.getElementById("msgbox").style.display = "block"
    
    if (type === 'success') {
        document.getElementById("msgbox").style.backgroundColor = "#4abf37"
    } else if(type === "warning") {
        document.getElementById("msgbox").style.backgroundColor = "#c24040"
    }
    
    setTimeout(() => {
        p.parentNode.removeChild(p);
    }, 2000);
}
