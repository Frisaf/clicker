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

coin.addEventListener("click", (event) => {
    clicks += 1;
    // moneyTracker.textContent = "$" + clicks;
});

function step(timestamp) {
    moneyTracker.textContent = `$${Math.round(clicks)}`;
    mpsTracker.textContent = `Money per second: ${moneyPerSecond}`;
    mpcTracker.textContent = `Money per click: ${moneyPerClick}`;
    // upgradesTracker.textContent = acquiredUpgrades;

    if (timestamp >= last + 10000) {
        money += moneyPerSecond;
        last = timestamp;
    }

    if (moneyPerSecond > 0 && !active) {
        mpsTracker.classList.add('active');
        active = true;
    }
    
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
    },
    {
        name: "Shares",
        cost: 50,
        clicks: 2,
        description: "Every ten seconds you can either win or lose money (50% chance of either winning or losing). The amount of money you lose depends on how many of this upgrade you have bought.",
    },
    {
        name: "Bank Funds",
        cost: 100,
        amount: 10,
        description: "Like shares, but more expensive and safer. Every ten seconds there is a 75% chance you will go into profit and a 25% chance you will lose money."
    },
    {
        name: "Start a Company",
        cost: 1000,
        amount: 100,
        description: "Create a business, sell stuff, make money!"
    },
];

function createCard(upgrade) {
    const card = document.createElement('div');
    const upgradeCost = document.querySelector("#cost")
    const upgradeText = document.querySelector("#upgradeText") // HERE

    card.classList.add('card');

    const header = document.createElement('p');
    header.classList.add('title');

    const cost = document.createElement('p');
    cost.classList.add("cost")

    const description = document.createElement("p")
    description.classList.add("descriptionText")
    if (upgrade.amount) {
        header.textContent = `${upgrade.name}, +${upgrade.amount} per second.`;
    } else {
        header.textContent = `${upgrade.name}, +${upgrade.clicks} per click.`;
    }
    description.textContent = upgrade.description
    cost.textContent = `$${upgrade.cost}`;

    card.addEventListener('click', (e) => {
        if (money >= upgrade.cost) {
            acquiredUpgrades++;
            money -= upgrade.cost;
            upgrade.cost *= 1.5;
            cost.textContent = 'Köp för ' + upgrade.cost + ' benbitar';
            moneyPerSecond += upgrade.amount ? upgrade.amount : 0;
            moneyPerClick += upgrade.clicks ? upgrade.clicks : 0;
            message('Grattis du har köpt en uppgradering!', 'success');
        } else {
            message('Du har inte råd.', 'warning');
        }
    });

    // card.appendChild(header);
    // card.appendChild(description)
    upgradeText.appendChild(header)
    upgradeText.appendChild(description)
    card.appendChild(upgradeText)
    
    card.appendChild(upgradeCost.appendChild(cost));
    return card;
}