# Policy Prodigies — Claude Code Briefing

## What this is
A live, in-person Jeopardy-style quiz game built as a single-page web app. Played at Oxford's Blavatnik School of Government for MPP/PhD students. One host controls everything from a laptop projected onto a screen. 9 teams of 5-6 people compete.

---

## Current file structure
```
policy-prodigies-project/
├── index.html       — HTML structure, all screens
├── src/
│   ├── style.css    — All styling
│   └── game.js      — All game logic and state
└── BRIEFING.md      — This file
```

No build tools, no framework, no dependencies. Pure HTML/CSS/JS. Opens directly in Chrome.

---

## Game structure

### 3 Rounds, 4 Categories each, 5 Point tiers
| Round | Categories |
|---|---|
| Round 1 — Science | Geography, History, Literature, Science |
| Round 2 — Knowledge | General Knowledge, Sports, Mental Abilities, Technology |
| Round 3 — Arts & Culture | Music, Cinema & Theater, Visual Arts, Pop Culture |

Point values per category: **100, 200, 300, 400, 500** (configurable to 3/4/5 tiers)

---

## Screens (all in index.html as divs with class="screen")
1. `#setup` — team names, turn order (drag to reorder), music upload, timer/tiers settings
2. `#board` — two-column layout: left scoreboard panel + right Jeopardy tile grid
3. `#question` — two-column layout: left scoreboard panel + right question display with timer
4. `#editor` — two-column: left sidebar (round/category/question tree) + right edit form
5. `#end` — podium + full rankings + confetti

---

## Core game mechanic
- **Fixed turn rotation**: 9 teams take turns picking tiles from the board in a set order (draggable at setup)
- **Active team** is highlighted in the scoreboard panel with a dark card and "Your Turn" badge
- **Tile click flow**:
  1. Host clicks tile on board
  2. If team still has Joker: modal appears asking to play it or not
  3. Question screen opens with 45-second countdown timer + background music
  4. Host reads question aloud, team discusses, host clicks award or deduct
  5. "Back to Board" closes question, marks tile as used, advances turn

---

## Scoring rules
- Correct answer: +full point value (or doubled if Joker active)
- Wrong answer: **-100 points** (flat penalty regardless of tile value)
- Joker wrong answer: **-200 points**
- No answer (timer runs out): 0 points, answer revealed

---

## Joker mechanic
- Each team has **one Joker for the entire game** (not per round)
- Must be declared BEFORE the tile is opened
- Doubles the point value of that question
- Joker status shown in scoreboard panel for all teams at all times
- Once used: greyed out with "Joker used" text

---

## Audio
- **Background music**: single file uploaded at setup, loops during every 45-second timer, stops when timer ends or host stops it manually
- **Question audio clips**: per-question audio file uploaded in the editor (used for "name this song/artist" questions), plays automatically when question opens
- **Web Audio API beeps**: built-in correct/wrong/time-up sound effects as fallback

---

## State object (in game.js)
```js
G = {
  teams: [{name, color, score, jokerUsed}],  // 9 teams
  turnOrder: [0,1,2,...],       // indices into teams array, draggable
  turnIndex: 0,                 // current position in turnOrder
  activeRound: 0,               // 0/1/2
  usedTiles: Set,               // keys like "0-geo-100"
  questions: { catId: [{q, a, note, media, mtype}] },
  tiers: 5,                     // 3/4/5 point tiers
  timerDuration: 45,
  currentTile: {roundIdx, catId, pts, jokerActive, ePts, qIdx},
  musicBlob: null,              // object URL for background music
  pendingJokerTile: null,       // tile waiting for joker decision
  editorCtx: null               // currently selected editor question
}
```

---

## Design direction
- **Theme**: Clean, minimal, editorial — lots of white space
- **Palette**: Cream background (#F7F5F0), white cards, dark ink (#1A1714), gold accent (#B8850A)
- **Typography**: Libre Baskerville (serif headings), DM Sans (body), DM Mono (labels/numbers)
- **Layout**: Two-column on board and question screens (220px left panel + flex-1 right)
- **Projector-friendly**: Large text, high contrast, readable from a distance

---

## What works well (keep)
- Two-column layout with persistent scoreboard panel
- Active team highlighted in dark on scoreboard
- Joker modal before tile opens
- Award/deduct buttons per team, all undoable (toggle)
- Tile colour coding by point value (blue/green/gold/orange/red)
- Drag-to-reorder turn order at setup
- Built-in question editor organised by round/category/question
- Confetti on end screen

---

## Known issues / things to improve
- The tile grid could be taller / tiles bigger for better projector visibility
- The scoreboard panel can get cramped with all 9 teams — may need overflow handling
- The question text size could scale better on very large screens
- No persistent storage — refreshing the page resets everything (intentional for single-session use)
- Font loading depends on Google Fonts CDN — falls back gracefully if offline

---

## Key constraints
- Must work as a **single HTML file** OR as this folder opened directly in Chrome (no server needed)
- No internet required during the game session (except Google Fonts for typography)
- No frameworks — vanilla JS only
- All 60 default questions are pre-loaded in game.js in the DEFAULT_Q object

---

## Session context
- Played live at BSG Cafe, Oxford
- Host: Adam (quizmaster, controls everything)
- 9 teams, 5-6 people per team
- ~90 minute session
- Teams' phones NOT used (no buzzer system)
- Fairness note: with 9 teams and 60 tiles, first 6 teams get one extra turn — consider adjusting to 54 questions (dropping one tier) if strict fairness is required
