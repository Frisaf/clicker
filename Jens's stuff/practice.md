# Förklaringar

Här nedan finns lite förklaringar över det HTML, CSS och JavaScript som "kör" din clicker.

## HTML

En klickers gameloop är enkel, du klickar på en knapp och något händer. I detta fall räknar vi antalet klick.

För att skapa knappen med HTML så använder vi `button` elementet, vi ger den ett id så att vi kan hitta den i JavaScript.
För att visa antalet klick så använder vi `span` elementet, vi ger den också ett id.

```html
<button id="gameButton">CSS is AWESOME</button>
<p>Du har klickat <span id="clickCounter">0</span> gånger.</p>
```

## JavaScript

Med javascript kan vi nu använda de iden vi gett knappen och span-elementet för att ge dem funktioner, ändra på dem och visa information.

### Välja element

Vi börjar med att välja knappen, vi gör det genom att använda webbläsarens `document` objekt (som innehåller allt på sidan) och `querySelector` metoden. Vi skickar in id:et för knappen som argument. Värdet som returneras är en referens till knappen och vi sparar den i en variabel `gameButton`.

```javascript
const gameButton = document.querySelector("#gameButton");
``` 

Testa att göra samma sak för span-elementet, döp variabeln till `clickCounter`.

Du kan kontrollera att det fungerade genom att logga variabeln till konsolen.

```javascript
console.log(gameButton);
```

I konsollen på webbläsaren så skriver den ut en referens till knappen.

### Lyssna på händelser

För att göra något när knappen klickas på så använder vi `addEventListener` metoden på knappen. Vi skickar in två argument, första är vilket event vi vill lyssna på, i detta fall `click`. Andra argumentet är en funktion som ska köras när eventet inträffar.

```javascript
gameButton.addEventListener("click", (event) => {
    console.log("Klickad!");
});
```

**Testa att klicka på knappen och se vad som händer i konsollen.**

Eventet vi lyssnar är i det här fallet ett `click` från musen, men det finns många andra event som vi kan lyssna på, t.ex. `mouseover`, `keydown`, `submit` osv.

### Ändra element

För att ändra texten i span-elementet så kan vi använda `textContent` egenskapen på elementet.

```javascript
clickCounter.textContent = "5";
```

**Testa att ändra texten i span-elementet när knappen klickas på.**

### Räkna klick

För att räkna antalet klick så behöver vi en variabel som håller koll på antalet. Vi döper den till `clicks` och sätter den till 0.

```javascript
let clicks = 0;
```

Vi använder här `let` för att deklarera variabeln, vi gör det för att vi kommer att ändra på värdet.

När knappen klickas på så ökar vi variabeln med 1 och uppdaterar texten i span-elementet.

```javascript
gameButton.addEventListener("click", (event) => {
    clicks++;
    clickCounter.textContent = clicks;
});
```

Var noga med var vi deklarerar variabeln `clicks`, den ska vara utanför eventet för att vi ska kunna använda den i flera event. Variabelns scope behöver alltså vara globalt.

**Testa att modifiera så att antalet klick ökas med 5 varje gång knappen klickas på.**

## Köpa en uppgradering

För att köpa en uppgradering så behöver vi en variabel som håller koll på hur mycket pengar vi har. Vi döper den till `money` och sätter den till 0.

```javascript
let money = 0;
```

Vi behöver också en variabel som håller koll på priset för uppgraderingen, vi döper den till `upgradePrice` och sätter den till 10.

```javascript
let upgradePrice = 10;
```

För att köpa en uppgradering så behöver vi en knapp som vi kan klicka på. Vi skapar en ny knapp i HTML och ger den ett id.

```html
<button id="upgradeButton">Köp uppgradering för 10</button>
```

Vi väljer knappen i JavaScript och sparar den i en variabel.

```javascript
const upgradeButton = document.querySelector("#upgradeButton");
```

Vi lyssnar på klick-eventet på knappen och när den klickas på så kollar vi om vi har tillräckligt med pengar för att köpa uppgraderingen.

```javascript
upgradeButton.addEventListener("click", (event) => {
    if (money >= upgradePrice) {
        money -= upgradePrice;
        upgradePrice += 10;
        clickCounter.textContent = money;
        upgradeButton.textContent = `Köp uppgradering för ${upgradePrice}`;
    }
});
```

**Testa att köpa en uppgradering och se att pengarna minskar och priset ökar.**


