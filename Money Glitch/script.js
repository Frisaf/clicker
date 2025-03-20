let clicks = 0;
const coin = document.querySelector("#coin");
const moneyTracker = document.querySelector("#money");

coin.addEventListener("click", (event) => {
    clicks += 1;
    moneyTracker.textContent = "$" + clicks;
});

function step(timestamp) {
    moneyTracker.textContent = Math.round(money);
    mpsTracker.textContent = moneyPerSecond;
    mpcTracker.textContent = moneyPerClick;
    upgradesTracker.textContent = acquiredUpgrades;

    if (timestamp >= last + 1000) {
        money += moneyPerSecond;
        last = timestamp;
    }

    if (moneyPerSecond > 0 && !active) {
        mpsTracker.classList.add('active');
        active = true;
    }
    
    achievements = achievements.filter((achievement) => {
        if (achievement.acquired) {
            return false;
        }
        if (
            achievement.requiredUpgrades &&
            acquiredUpgrades >= achievement.requiredUpgrades
        ) {
            achievement.acquired = true;
            message(achievement.description, 'achievement');
            return false;
        } else if (
            achievement.requiredClicks &&
            numberOfClicks >= achievement.requiredClicks
        ) {
            achievement.acquired = true;
            message(achievement.description, 'achievement');
            return false;
        }
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

upgrades = [
    {
        name: "Coin Upgrade",
        cost: 10,
        amount: 1,
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
    card.classList.add('card');
    const header = document.createElement('p');
    header.classList.add('title');
    const cost = document.createElement('p');
    if (upgrade.amount) {
        header.textContent = `${upgrade.name}, +${upgrade.amount} per sekund.`;
    } else {
        header.textContent = `${upgrade.name}, +${upgrade.clicks} per klick.`;
    }
    cost.textContent = `Köp för ${upgrade.cost} benbitar.`;

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

    card.appendChild(header);
    card.appendChild(cost);
    return card;
}