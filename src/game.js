// ═══════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════
const COLORS = ['#E84040','#D4813A','#4A9EE8','#1A8A4A','#9B5DE5','#E8478A','#00A896','#6B4226','#556B2F'];
const PTS = [100,200,300,400,500];
const TEAM_EMOJIS = ['🦁','🐯','🦊','🐲','🦅','🐬','🦉','🐺','🦈','🐙','🦎','🐝','🦋','🎯','⚡','🔥','💎','🌟','🚀','🎭','🏛','⚖️','🗡','🛡'];

const ROUNDS = [
  { id:'r1', name:'Science Round', short:'Science', categories:[
    {id:'geo',name:'Geography'},{id:'hist',name:'History'},{id:'lit',name:'Literature'},{id:'sci',name:'Science'}
  ]},
  { id:'r2', name:'Knowledge Round', short:'Knowledge', categories:[
    {id:'gen',name:'General Knowledge'},{id:'sport',name:'Sports'},{id:'math',name:'Mental Abilities'},{id:'tech',name:'Technology'}
  ]},
  { id:'r3', name:'Arts & Culture', short:'Arts & Culture', categories:[
    {id:'music',name:'Music'},{id:'cinema',name:'Cinema & Theater'},{id:'visual',name:'Visual Arts'},{id:'pop',name:'Pop Culture'}
  ]}
];

const DEFAULT_Q = {
  geo:[
    {q:"What is the capital city of Morocco?",a:"Rabat",note:"Not Casablanca, which is the largest city.",media:null,mtype:'none'},
    {q:"Which river flows through both Baghdad and Basra?",a:"Tigris",note:"",media:null,mtype:'none'},
    {q:"Name the strait separating Europe from Africa at its narrowest point.",a:"Strait of Gibraltar",note:"About 14 km wide.",media:null,mtype:'none'},
    {q:"What is the world's largest desert by total area?",a:"Antarctic Desert",note:"The Sahara is the largest hot desert.",media:null,mtype:'none'},
    {q:"Which country has the most time zones?",a:"France",note:"12 time zones including overseas territories.",media:null,mtype:'none'}
  ],
  hist:[
    {q:"In what year did the Berlin Wall fall?",a:"1989",note:"November 9, 1989.",media:null,mtype:'none'},
    {q:"Who was the first woman to win a Nobel Prize?",a:"Marie Curie",note:"Physics Prize, 1903.",media:null,mtype:'none'},
    {q:"What was Gorbachev's economic restructuring policy called?",a:"Perestroika",note:"Accompanied by Glasnost.",media:null,mtype:'none'},
    {q:"The Treaty of Westphalia (1648) established which foundational concept in international relations?",a:"State sovereignty",note:"Ended the Thirty Years War.",media:null,mtype:'none'},
    {q:"Which empire controlled Egypt before British occupation in 1882?",a:"Ottoman Empire",note:"Egypt was increasingly autonomous within it.",media:null,mtype:'none'}
  ],
  lit:[
    {q:"George Orwell's 1984 was published in which year?",a:"1949",note:"",media:null,mtype:'none'},
    {q:"Who wrote The Stranger (L'Etranger)?",a:"Albert Camus",note:"Published 1942.",media:null,mtype:'none'},
    {q:"In which city is Dostoevsky's Crime and Punishment set?",a:"St. Petersburg",note:"",media:null,mtype:'none'},
    {q:"What is the name of the dystopian society in The Handmaid's Tale?",a:"Gilead",note:"",media:null,mtype:'none'},
    {q:"Which Egyptian Nobel laureate wrote Palace Walk?",a:"Naguib Mahfouz",note:"Nobel Prize in Literature, 1988.",media:null,mtype:'none'}
  ],
  sci:[
    {q:"What is the chemical symbol for gold?",a:"Au",note:"From Latin Aurum.",media:null,mtype:'none'},
    {q:"What is the approximate speed of light in a vacuum?",a:"300,000 km/s",note:"Exactly 299,792,458 m/s.",media:null,mtype:'none'},
    {q:"What is the powerhouse of the cell?",a:"Mitochondria",note:"",media:null,mtype:'none'},
    {q:"Which gas makes up approximately 78% of Earth's atmosphere?",a:"Nitrogen (N2)",note:"Oxygen is about 21%.",media:null,mtype:'none'},
    {q:"What does DNA stand for?",a:"Deoxyribonucleic Acid",note:"",media:null,mtype:'none'}
  ],
  gen:[
    {q:"How many permanent members does the UN Security Council have?",a:"5",note:"USA, UK, France, Russia, China.",media:null,mtype:'none'},
    {q:"What is the Gini coefficient used to measure?",a:"Income inequality",note:"0 = perfect equality, 1 = perfect inequality.",media:null,mtype:'none'},
    {q:"What does GDP stand for?",a:"Gross Domestic Product",note:"",media:null,mtype:'none'},
    {q:"In which year was the United Nations founded?",a:"1945",note:"UN Charter signed in San Francisco.",media:null,mtype:'none'},
    {q:"What term describes when a government spends more than it receives in tax revenue?",a:"Budget deficit",note:"",media:null,mtype:'none'}
  ],
  sport:[
    {q:"How many players are in a standard football team on the pitch?",a:"11",note:"",media:null,mtype:'none'},
    {q:"In which country were the first modern Olympic Games held?",a:"Greece (Athens, 1896)",note:"",media:null,mtype:'none'},
    {q:"What sport uses the term love to mean zero?",a:"Tennis",note:"",media:null,mtype:'none'},
    {q:"Which country has won the most FIFA World Cup titles?",a:"Brazil (5)",note:"1958, 1962, 1970, 1994, 2002.",media:null,mtype:'none'},
    {q:"In Formula 1, how many points does a driver receive for winning a race?",a:"25 points",note:"",media:null,mtype:'none'}
  ],
  math:[
    {q:"If a train travels at 60 km/h for 2.5 hours, how far did it travel?",a:"150 km",note:"Distance = Speed x Time.",media:null,mtype:'none'},
    {q:"What comes next in the sequence: 2, 6, 12, 20, 30, ?",a:"42",note:"Pattern: n(n+1). Next is 6x7=42.",media:null,mtype:'none'},
    {q:"A policy succeeds in 75% of cases. Out of 200 cases, how many succeed?",a:"150",note:"0.75 x 200 = 150.",media:null,mtype:'none'},
    {q:"What is the next prime number after 17?",a:"19",note:"",media:null,mtype:'none'},
    {q:"What is 17 x 23?",a:"391",note:"(17x20)+(17x3) = 340+51.",media:null,mtype:'none'}
  ],
  tech:[
    {q:"What does AI stand for in computer science?",a:"Artificial Intelligence",note:"",media:null,mtype:'none'},
    {q:"What does HTTPS stand for?",a:"HyperText Transfer Protocol Secure",note:"",media:null,mtype:'none'},
    {q:"What is the term for rules governing how an organisation uses AI?",a:"AI governance or AI policy",note:"",media:null,mtype:'none'},
    {q:"Who co-founded OpenAI and later founded xAI?",a:"Elon Musk",note:"Co-founded OpenAI 2015.",media:null,mtype:'none'},
    {q:"What does LLM stand for in AI?",a:"Large Language Model",note:"Examples: GPT-4, Claude, Gemini.",media:null,mtype:'none'}
  ],
  music:[
    {q:"Which composer wrote the Four Seasons violin concertos?",a:"Antonio Vivaldi",note:"Composed circa 1720.",media:null,mtype:'none'},
    {q:"What nationality was Ludwig van Beethoven?",a:"German",note:"Born in Bonn, 1770.",media:null,mtype:'none'},
    {q:"Which music genre originated in Jamaica in the late 1960s?",a:"Reggae",note:"Associated with Bob Marley.",media:null,mtype:'none'},
    {q:"How many semitones are in a musical octave?",a:"12",note:"",media:null,mtype:'none'},
    {q:"Which Middle Eastern plucked string instrument is the ancestor of the European lute?",a:"Oud",note:"Central to Arab, Turkish, and Persian music.",media:null,mtype:'none'}
  ],
  cinema:[
    {q:"Who directed Parasite (2019), the first non-English film to win Best Picture?",a:"Bong Joon-ho",note:"",media:null,mtype:'none'},
    {q:"In which Shakespeare play does To be or not to be appear?",a:"Hamlet",note:"Act 3, Scene 1.",media:null,mtype:'none'},
    {q:"Which 1994 Disney animated film is loosely based on Shakespeare's Hamlet?",a:"The Lion King",note:"",media:null,mtype:'none'},
    {q:"What does it mean to break the fourth wall in theatre?",a:"Acknowledging the audience directly",note:"",media:null,mtype:'none'},
    {q:"Which streaming platform produced the series Squid Game?",a:"Netflix",note:"Released 2021.",media:null,mtype:'none'}
  ],
  visual:[
    {q:"Who painted the Mona Lisa?",a:"Leonardo da Vinci",note:"Painted circa 1503 to 1519.",media:null,mtype:'none'},
    {q:"In which city is the Sagrada Familia basilica located?",a:"Barcelona, Spain",note:"Designed by Antoni Gaudi.",media:null,mtype:'none'},
    {q:"What art movement is Salvador Dali associated with?",a:"Surrealism",note:"",media:null,mtype:'none'},
    {q:"The Colosseum is located in which city?",a:"Rome, Italy",note:"Completed 80 AD.",media:null,mtype:'none'},
    {q:"What painting technique involves applying small distinct dots of colour?",a:"Pointillism",note:"Developed by Georges Seurat.",media:null,mtype:'none'}
  ],
  pop:[
    {q:"Which TV series features dragons, the Iron Throne, and the phrase Winter is Coming?",a:"Game of Thrones",note:"Based on George R.R. Martin's series.",media:null,mtype:'none'},
    {q:"Which artist released the album Thriller in 1982?",a:"Michael Jackson",note:"Best-selling album of all time.",media:null,mtype:'none'},
    {q:"What social media platform is known for short-form video and was originally Musical.ly?",a:"TikTok",note:"",media:null,mtype:'none'},
    {q:"Which film franchise features the character Tony Stark?",a:"Marvel Cinematic Universe",note:"",media:null,mtype:'none'},
    {q:"Which streaming service produced Stranger Things?",a:"Netflix",note:"",media:null,mtype:'none'}
  ]
};

// ═══════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════
let G = {
  teams: Array.from({length:9},(_,i)=>({name:`Team ${i+1}`,color:COLORS[i],score:0,jokerUsed:false,emoji:TEAM_EMOJIS[i],streak:0})),
  turnOrder: Array.from({length:9},(_,i)=>i),
  turnIndex: 0,
  activeRound: 0,
  usedTiles: new Set(),
  questions: JSON.parse(JSON.stringify(DEFAULT_Q)),
  tiers: 5,
  timerDuration: 45,
  timerRemaining: 45,
  timerInterval: null,
  musicBlob: null,
  musicAudio: null,
  currentTile: null,
  editorCtx: null,
  pendingJokerTile: null,
  prevScreen: 'setup',
  barMode: false,
  lastAwardedTeam: null
};

const CIRC = 2*Math.PI*29;

// ═══════════════════════════════════════════
// AUDIO
// ═══════════════════════════════════════════
function handleMusic(input){
  const f=input.files[0]; if(!f) return;
  G.musicBlob=URL.createObjectURL(f);
  document.getElementById('music-status').textContent=f.name.length>18?f.name.substring(0,18)+'…':f.name;
  notify('Music loaded');
}
function startMusic(){
  stopMusic();
  const src=G.musicBlob||'src/heartbeat-timer.mp3';
  G.musicAudio=new Audio(src);
  G.musicAudio.loop=true; G.musicAudio.volume=0.5;
  G.musicAudio.play().catch(()=>{});
}
function stopMusic(){
  if(G.musicAudio){G.musicAudio.pause();G.musicAudio.currentTime=0;G.musicAudio=null;}
}
let qAud=null;
function playQAudio(blob){
  if(qAud){qAud.pause();qAud=null;}
  if(!blob) return;
  qAud=new Audio(blob); qAud.play().catch(()=>{});
}
function stopQAudio(){ if(qAud){qAud.pause();qAud.currentTime=0;} }

let actx=null;
function getAC(){if(!actx)actx=new(window.AudioContext||window.webkitAudioContext)();return actx;}
function beep(f,d,v=0.12,t='sine',delay=0){
  const c=getAC(),o=c.createOscillator(),g=c.createGain();
  o.type=t;o.frequency.value=f;
  g.gain.setValueAtTime(0,c.currentTime+delay);
  g.gain.linearRampToValueAtTime(v,c.currentTime+delay+0.01);
  g.gain.linearRampToValueAtTime(0,c.currentTime+delay+d);
  o.connect(g);g.connect(c.destination);
  o.start(c.currentTime+delay);o.stop(c.currentTime+delay+d+0.05);
}
// MP3-based correct/wrong sounds — pre-decoded into AudioBuffers for zero-latency playback
let correctBuffer=null, wrongBuffer=null;
async function preloadSounds(){
  try {
    const ac=getAC();
    const [r1,r2]=await Promise.all([
      fetch('src/correct.mp3').then(r=>r.arrayBuffer()),
      fetch('src/wrong.mp3').then(r=>r.arrayBuffer())
    ]);
    [correctBuffer,wrongBuffer]=await Promise.all([
      ac.decodeAudioData(r1),
      ac.decodeAudioData(r2)
    ]);
  } catch(e){}
}
function playCorrect(){
  if(!correctBuffer) return;
  const ac=getAC();
  if(ac.state==='suspended') ac.resume();
  const src=ac.createBufferSource(), g=ac.createGain();
  src.buffer=correctBuffer; g.gain.value=0.7;
  src.connect(g); g.connect(ac.destination); src.start(0);
}
function playWrong(){
  if(!wrongBuffer) return;
  const ac=getAC();
  if(ac.state==='suspended') ac.resume();
  const src=ac.createBufferSource(), g=ac.createGain();
  src.buffer=wrongBuffer; g.gain.value=0.7;
  src.connect(g); g.connect(ac.destination); src.start(0);
}
function playTimeUp(){beep(400,.15,.15,'sawtooth',0);beep(350,.15,.15,'sawtooth',.18);beep(300,.3,.15,'sawtooth',.36);}
// Feature 9: Whoosh sound for tile selection
function playWhoosh(){
  const c=getAC(),o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();
  f.type='bandpass';f.frequency.value=1200;f.Q.value=0.5;
  o.type='sawtooth';o.frequency.setValueAtTime(800,c.currentTime);o.frequency.exponentialRampToValueAtTime(200,c.currentTime+0.2);
  g.gain.setValueAtTime(0,c.currentTime);g.gain.linearRampToValueAtTime(0.08,c.currentTime+0.02);g.gain.exponentialRampToValueAtTime(0.001,c.currentTime+0.25);
  o.connect(f);f.connect(g);g.connect(c.destination);
  o.start(c.currentTime);o.stop(c.currentTime+0.3);
}

// ═══════════════════════════════════════════
// SETUP
// ═══════════════════════════════════════════
function renderSetup(){
  // Teams grid
  const tg=document.getElementById('teams-grid');
  tg.innerHTML='';
  G.teams.forEach((t,i)=>{
    tg.innerHTML+=`<div class="team-input-row" id="team-row-${i}">
      <div class="team-emoji" onclick="toggleEmojiPicker(${i})">${t.emoji}</div>
      <div class="t-dot" style="background:${t.color}"></div>
      <input type="text" value="${t.name}" placeholder="Team name" oninput="G.teams[${i}].name=this.value;renderTurnList()">
    </div>`;
  });
  renderTurnList();
}

// Feature 7: Emoji picker
let openPickerIdx=null;
function toggleEmojiPicker(idx){
  // Close any existing
  document.querySelectorAll('.emoji-picker-pop').forEach(e=>e.remove());
  if(openPickerIdx===idx){openPickerIdx=null;return;}
  openPickerIdx=idx;
  const row=document.getElementById(`team-row-${idx}`);
  const pop=document.createElement('div');
  pop.className='emoji-picker-pop';
  TEAM_EMOJIS.forEach(em=>{
    const b=document.createElement('button');
    b.className='emoji-opt';b.textContent=em;
    b.onclick=(e)=>{e.stopPropagation();G.teams[idx].emoji=em;openPickerIdx=null;renderSetup();};
    pop.appendChild(b);
  });
  row.appendChild(pop);
}
document.addEventListener('click',e=>{
  if(!e.target.closest('.team-emoji')&&!e.target.closest('.emoji-picker-pop')){
    document.querySelectorAll('.emoji-picker-pop').forEach(el=>el.remove());
    openPickerIdx=null;
  }
});

function renderTurnList(){
  G.turnOrder=G.teams.map((_,i)=>i);
  const tl=document.getElementById('turn-list');
  tl.innerHTML='';
  G.turnOrder.forEach((ti,pos)=>{
    const t=G.teams[ti];
    const d=document.createElement('div');
    d.className='turn-row'; d.draggable=true; d.dataset.pos=pos;
    d.innerHTML=`<span class="turn-num">${pos+1}</span>
      <div class="t-dot" style="background:${t.color}"></div>
      <span class="turn-name">${t.name}</span>
      <span class="turn-grip">⠿⠿</span>`;
    d.addEventListener('dragstart',()=>dragSrc=pos);
    d.addEventListener('dragover',e=>e.preventDefault());
    d.addEventListener('drop',e=>{
      e.preventDefault();
      if(dragSrc===null||dragSrc===pos) return;
      const a=[...G.turnOrder],[m]=a.splice(dragSrc,1);a.splice(pos,0,m);
      G.turnOrder=a; renderTurnList(); dragSrc=null;
    });
    tl.appendChild(d);
  });
}
let dragSrc=null;

function addTeam(){
  if(G.teams.length>=9) return notify('Maximum 9 teams');
  const i=G.teams.length;
  G.teams.push({name:`Team ${i+1}`,color:COLORS[i]||'#888',score:0,jokerUsed:false,emoji:TEAM_EMOJIS[i]||'⭐',streak:0});
  renderSetup();
}
function removeTeam(){
  if(G.teams.length<=2) return notify('Minimum 2 teams');
  G.teams.pop(); renderSetup();
}

function startGame(){
  G.timerDuration=parseInt(document.getElementById('timer-setting').value)||45;
  G.tiers=parseInt(document.getElementById('tiers-setting').value)||5;
  G.teams.forEach(t=>{t.score=0;t.jokerUsed=false;t.streak=0;});
  G.usedTiles=new Set(); G.turnIndex=0; G.activeRound=0;
  G.lastAwardedTeam=null; G.barMode=false;
  showScreen('board'); renderBoard();
}

// ═══════════════════════════════════════════
// BOARD
// ═══════════════════════════════════════════
function renderBoard(){
  renderRoundTabs();
  if(G.barMode) renderBarChart('scores-list');
  else renderScoresPanel('scores-list','board-panel');
  renderTileGrid();
  document.getElementById('round-label-panel').textContent=ROUNDS[G.activeRound].name;
}

function renderRoundTabs(){
  const wrap=document.getElementById('round-tabs');
  wrap.innerHTML='';
  ROUNDS.forEach((r,i)=>{
    const done=isRoundDone(i);
    wrap.innerHTML+=`<button class="rtab ${i===G.activeRound?'active':''} ${done&&i!==G.activeRound?'done':''}"
      onclick="switchRound(${i})">${r.short}</button>`;
  });
}

function isRoundDone(ri){
  const r=ROUNDS[ri];
  for(const c of r.categories)
    for(let t=0;t<G.tiers;t++)
      if(!G.usedTiles.has(`${ri}-${c.id}-${PTS[t]}`)) return false;
  return true;
}
function switchRound(i){
  if(i===G.activeRound) return;
  showRoundSplash(i,()=>{
    G.activeRound=i;
    renderBoard();
  });
}

// Feature 6: Round transition splash
function showRoundSplash(roundIdx,cb){
  const r=ROUNDS[roundIdx];
  const cats=r.categories.map(c=>c.name).join(' · ');
  const splash=document.createElement('div');
  splash.className='round-splash';
  splash.innerHTML=`
    <div class="splash-eyebrow">Round ${roundIdx+1}</div>
    <div class="splash-title">${r.name}</div>
    <div class="splash-sub">${cats}</div>`;
  document.body.appendChild(splash);
  setTimeout(()=>{
    splash.classList.add('out');
    setTimeout(()=>{splash.remove();cb();},400);
  },1200);
}

function renderScoresPanel(listId){
  const el=document.getElementById(listId);
  if(!el) return;
  const activeTI=G.turnOrder[G.turnIndex%G.turnOrder.length];
  const sorted=[...G.teams.map((t,i)=>({...t,origIdx:i}))].sort((a,b)=>b.score-a.score);
  el.innerHTML='';
  sorted.forEach((t,rank)=>{
    const isActive=t.origIdx===activeTI;
    const isLeader=rank===0&&G.teams.some(x=>x.score>0);
    const streakHtml=t.streak>=2?`<span class="s-streak">🔥 x${t.streak}</span>`:'';
    el.innerHTML+=`<div class="score-row ${isActive?'active-turn':''} ${isLeader&&!isActive?'leader':''}">
      ${isActive?'<div class="turn-badge">Your Turn</div>':''}
      <div class="s-rank">${rank+1}</div>
      <span class="s-emoji">${t.emoji||''}</span>
      <div class="s-info">
        <div class="s-name">${t.name}</div>
        <div class="s-joker ${t.jokerUsed?'used':''}">${t.jokerUsed?'🃏 Joker used':'🃏 Joker available'}${streakHtml}</div>
      </div>
      <div class="s-score">${t.score}</div>
    </div>`;
  });
}

// Feature 3: Bar chart view
function renderBarChart(listId){
  const el=document.getElementById(listId);
  if(!el) return;
  const sorted=[...G.teams.map((t,i)=>({...t,origIdx:i}))].sort((a,b)=>b.score-a.score);
  const maxScore=Math.max(1,...sorted.map(t=>Math.abs(t.score)));
  el.innerHTML='';
  sorted.forEach(t=>{
    const pct=Math.max(0,(t.score/maxScore)*100);
    el.innerHTML+=`<div class="score-bar-row">
      <span class="score-bar-name">${t.emoji||''} ${t.name}</span>
      <div class="score-bar-track"><div class="score-bar-fill" style="width:${pct}%;background:${t.color}"></div></div>
      <span class="score-bar-val">${t.score}</span>
    </div>`;
  });
}
function toggleBarMode(){
  G.barMode=!G.barMode;
  const btn=document.getElementById('bar-toggle-btn');
  if(btn) btn.classList.toggle('active',G.barMode);
  renderBoard();
}

function renderTileGrid(){
  const r=ROUNDS[G.activeRound];
  const wrap=document.getElementById('tile-grid-wrap');
  wrap.innerHTML='';

  // Category headers
  const catRow=document.createElement('div');
  catRow.className='cat-row';
  catRow.style.gridTemplateColumns=`repeat(${r.categories.length},1fr)`;
  r.categories.forEach(c=>{
    const h=document.createElement('div');
    h.className='cat-head'; h.textContent=c.name;
    catRow.appendChild(h);
  });
  wrap.appendChild(catRow);

  // Tile rows
  const tilesWrap=document.createElement('div');
  tilesWrap.className='tiles-rows';
  for(let t=0;t<G.tiers;t++){
    const pts=PTS[t];
    const row=document.createElement('div');
    row.className='tile-row';
    row.style.gridTemplateColumns=`repeat(${r.categories.length},1fr)`;
    r.categories.forEach(cat=>{
      const key=`${G.activeRound}-${cat.id}-${pts}`;
      const used=G.usedTiles.has(key);
      const tile=document.createElement('div');
      tile.className=`tile${used?' used':''}`;
      tile.dataset.pts=pts;
      tile.innerHTML=`<span class="tile-val">${pts}</span>${!used?`<div class="tile-tooltip">${cat.name} · ${pts} pts</div>`:''}`;
      if(!used) tile.onclick=()=>{
        playWhoosh();
        tile.classList.add('flipping');
        setTimeout(()=>handleTileClick(G.activeRound,cat.id,pts),350);
      };
      row.appendChild(tile);
    });
    tilesWrap.appendChild(row);
  }
  wrap.appendChild(tilesWrap);
}

function handleTileClick(ri,catId,pts){
  const ti=G.turnOrder[G.turnIndex%G.turnOrder.length];
  const team=G.teams[ti];
  if(!team.jokerUsed){
    G.pendingJokerTile={ri,catId,pts};
    document.getElementById('joker-modal-text').innerHTML=
      `<strong>${team.name}</strong> still has their Joker. Play it now to turn <strong>${pts} pts into ${pts*2} pts</strong>? A wrong answer will cost <strong>200 points</strong>.`;
    document.getElementById('joker-overlay').classList.add('open');
  } else {
    openQuestion(ri,catId,pts,false);
  }
}
function confirmJoker(){
  document.getElementById('joker-overlay').classList.remove('open');
  const{ri,catId,pts}=G.pendingJokerTile;
  G.teams[G.turnOrder[G.turnIndex%G.turnOrder.length]].jokerUsed=true;
  openQuestion(ri,catId,pts,true);
}
function cancelJoker(){
  document.getElementById('joker-overlay').classList.remove('open');
  const{ri,catId,pts}=G.pendingJokerTile;
  openQuestion(ri,catId,pts,false);
}
function nextTurn(){G.turnIndex++;renderBoard();}
function prevTurn(){if(G.turnIndex>0)G.turnIndex--;renderBoard();}

// ═══════════════════════════════════════════
// QUESTION
// ═══════════════════════════════════════════
function openQuestion(roundIdx,catId,pts,jokerActive){
  const round=ROUNDS[roundIdx];
  const cat=round.categories.find(c=>c.id===catId);
  const qIdx=PTS.indexOf(pts);
  const q=(G.questions[catId]||[])[qIdx]||{q:`[${cat.name} — ${pts} pts] Add this question in the Editor.`,a:'TBD',note:'',media:null,mtype:'none'};
  const ti=G.turnOrder[G.turnIndex%G.turnOrder.length];
  const team=G.teams[ti];
  const ePts=jokerActive?pts*2:pts;

  G.currentTile={roundIdx,catId,pts,jokerActive,ePts,qIdx};

  document.getElementById('q-round-crumb').textContent=round.short;
  document.getElementById('q-cat-crumb').textContent=cat.name;
  document.getElementById('q-pts-display').innerHTML=`${ePts}<small>pts</small>`;
  document.getElementById('joker-pill').style.display=jokerActive?'inline-flex':'none';
  document.getElementById('timer-team-label').textContent=team.name;
  document.getElementById('q-cat-label').textContent=`${round.name} · ${cat.name}`;
  document.getElementById('q-text').textContent=q.q;
  document.getElementById('ans-text').textContent=q.a;
  document.getElementById('ans-note').textContent=q.note||'';
  document.getElementById('answer-box').classList.remove('show');

  // Media
  const med=document.getElementById('q-media');
  med.innerHTML='';
  if(q.media&&q.mtype==='image') med.innerHTML=`<img src="${q.media}" alt="">`;
  if(q.media&&q.mtype==='audio') playQAudio(q.media);

  // Scores panel on question screen
  document.getElementById('q-round-label-panel').textContent=round.name;
  renderScoresPanel('q-scores-list');

  // Award/deduct buttons
  const penalty=jokerActive?200:100;
  document.getElementById('deduct-label').textContent=`✗ Wrong — deduct ${penalty} points`;
  const ab=document.getElementById('award-btns');
  const db=document.getElementById('deduct-btns');
  ab.innerHTML=''; db.innerHTML='';
  G.teams.forEach((t,i)=>{
    const a=document.createElement('button');
    a.className='award-btn'; a.dataset.i=i;
    a.innerHTML=`<div class="dot" style="background:${t.color}"></div>${t.name}`;
    a.onclick=()=>awardPts(i,ePts,a); ab.appendChild(a);

    const d=document.createElement('button');
    d.className='deduct-btn'; d.dataset.i=i;
    d.innerHTML=`<div class="dot" style="background:${t.color}"></div>${t.name}`;
    d.onclick=()=>deductPts(i,penalty,d); db.appendChild(d);
  });

  // Reset footers: show pre-reveal, hide post-reveal
  document.getElementById('q-footer-pre').classList.remove('hidden');
  document.getElementById('q-footer-post').classList.add('hidden');

  showScreen('question');
  startTimer(q.timer || G.timerDuration);
  startMusic();
}

function awardPts(i,pts,btn){
  if(btn.classList.contains('awarded')){
    // Undo
    btn.classList.remove('awarded');
    G.teams[i].score-=pts;
    G.teams[i].streak=Math.max(0,G.teams[i].streak-1);
    notify(`Undid +${pts} for ${G.teams[i].name}`);
    renderScoresPanel('q-scores-list');
    return;
  }
  // Suspense flow: show overlay → pause → reveal result
  showSuspense(G.teams[i], true, pts, ()=>{
    btn.classList.add('awarded');
    G.teams[i].score+=pts;
    if(G.lastAwardedTeam===i) G.teams[i].streak++;
    else { G.teams.forEach(t=>t.streak=0); G.teams[i].streak=1; }
    G.lastAwardedTeam=i;
    renderScoresPanel('q-scores-list');
  });
}

function deductPts(i,penalty,btn){
  if(btn.classList.contains('deducted')){
    // Undo
    btn.classList.remove('deducted');
    G.teams[i].score+=penalty;
    notify(`Undid -${penalty} for ${G.teams[i].name}`);
    renderScoresPanel('q-scores-list');
    return;
  }
  showSuspense(G.teams[i], false, penalty, ()=>{
    btn.classList.add('deducted');
    G.teams[i].score-=penalty;
    G.teams[i].streak=0;
    renderScoresPanel('q-scores-list');
  });
}

// Reveal overlay — immediate correct/wrong synced with sound
function showSuspense(team, isCorrect, pts, applyFn){
  if(isCorrect) playCorrect(); else playWrong();
  const ov=document.createElement('div');
  ov.className='suspense-overlay';
  ov.innerHTML=`
    <div class="suspense-result ${isCorrect?'correct':'wrong'}">${isCorrect?'✓ Correct!':'✗ Wrong!'}</div>
    <div class="suspense-score-change">${team.emoji||''} ${team.name} ${isCorrect?'+':'-'}${pts}</div>`;
  document.body.appendChild(ov);
  applyFn();
  setTimeout(()=>{
    ov.style.opacity='0'; ov.style.transition='opacity 0.3s';
    setTimeout(()=>ov.remove(),300);
  },2000);
}

// Feature 2: Floating score animation (kept for undo feedback)
function floatScore(btn,text,positive){
  const rect=btn.getBoundingClientRect();
  const el=document.createElement('div');
  el.className=`score-float ${positive?'positive':'negative'}`;
  el.textContent=text;
  el.style.left=rect.left+rect.width/2-20+'px';
  el.style.top=rect.top-10+'px';
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),1300);
}

// Skip question (no points awarded)
function skipQuestion(){
  backToBoard();
}

function revealAnswer(){
  document.getElementById('answer-box').classList.add('show');
  stopTimer(); stopMusic();
  document.querySelector('.q-main').classList.remove('urgent');
  // Show post-reveal controls, hide pre-reveal
  document.getElementById('q-footer-pre').classList.add('hidden');
  document.getElementById('q-footer-post').classList.remove('hidden');
}

function backToBoard(){
  stopTimer(); stopMusic(); stopQAudio();
  document.querySelector('.q-main').classList.remove('urgent');
  if(G.currentTile){
    const{roundIdx,catId,pts}=G.currentTile;
    G.usedTiles.add(`${roundIdx}-${catId}-${pts}`);
  }
  G.turnIndex++;
  showScreen('board'); renderBoard();
}

// ═══════════════════════════════════════════
// TIMER
// ═══════════════════════════════════════════
function startTimer(dur){
  stopTimer();
  G.timerRemaining=dur;
  updateTimerUI(dur,dur);
  document.getElementById('t-num').style.color='var(--ink)';
  document.getElementById('t-fill').style.stroke='var(--ink)';
  document.querySelector('.q-main').classList.remove('urgent');
  G.timerInterval=setInterval(()=>{
    G.timerRemaining--;
    updateTimerUI(G.timerRemaining,dur);
    if(G.timerRemaining<=0){
      stopTimer(); stopMusic(); playTimeUp();
      document.querySelector('.q-main').classList.remove('urgent');
      revealAnswer();
      document.getElementById('t-num').style.color='var(--red)';
    } else if(G.timerRemaining<=10){
      document.getElementById('t-num').style.color='var(--red)';
      document.getElementById('t-fill').style.stroke='var(--red)';
      // Feature 4: Urgency — pulse background & ramp music volume
      document.querySelector('.q-main').classList.add('urgent');
      if(G.musicAudio) G.musicAudio.volume=Math.min(1,0.5+((10-G.timerRemaining)/10)*0.5);
    }
  },1000);
}
function stopTimer(){if(G.timerInterval){clearInterval(G.timerInterval);G.timerInterval=null;}}
function updateTimerUI(rem,total){
  document.getElementById('t-num').textContent=rem;
  document.getElementById('t-fill').style.strokeDashoffset=CIRC*(1-rem/total);
}

// ═══════════════════════════════════════════
// EDITOR
// ═══════════════════════════════════════════
function openEditor(){
  G.prevScreen=document.querySelector('.screen.active').id;
  showScreen('editor'); renderEditorSidebar();
}
function closeEditor(){showScreen(G.prevScreen||'board');}

function renderEditorSidebar(){
  const sb=document.getElementById('editor-sb-content');
  sb.innerHTML='';
  ROUNDS.forEach((round,ri)=>{
    let h=`<div class="esb-round"><span class="esb-round-label">${round.short}</span>`;
    round.categories.forEach(cat=>{
      h+=`<div class="esb-cat">
        <div class="esb-cat-name" onclick="loadEditor('${round.id}','${cat.id}',0,${PTS[0]},${ri})">${cat.name}</div>`;
      for(let qi=0;qi<G.tiers;qi++){
        const pts=PTS[qi];
        const q=(G.questions[cat.id]||[])[qi];
        const sel=G.editorCtx&&G.editorCtx.catId===cat.id&&G.editorCtx.qIdx===qi;
        h+=`<div class="esb-q ${sel?'sel':''}" onclick="loadEditor('${round.id}','${cat.id}',${qi},${pts},${ri})">
          <span>${q&&q.q?q.q.substring(0,24)+'…':'[empty]'}</span>
          <span class="esb-q-pts">${pts}</span>
        </div>`;
      }
      h+=`</div>`;
    });
    h+=`</div>`;
    sb.innerHTML+=h;
  });
}

let pendingAudBlob=null, pendingImgBlob=null;
function loadEditor(roundId,catId,qIdx,pts,ri){
  G.editorCtx={roundId,catId,qIdx,pts,ri};
  const q=(G.questions[catId]||[])[qIdx]||{q:'',a:'',note:'',timer:null,media:'',mtype:'none'};
  const cat=ROUNDS[ri].categories.find(c=>c.id===catId);
  pendingAudBlob=null; pendingImgBlob=null;
  document.getElementById('editor-form').innerHTML=`
    <div class="em-title">Editing: <span>${cat.name} — ${pts} pts</span></div>
    <div class="em-form">
      <div class="form-group">
        <label class="form-label">Question</label>
        <textarea class="form-textarea" id="ef-q" rows="3">${q.q}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Answer</label>
        <input type="text" class="form-input" id="ef-a" value="${q.a}">
      </div>
      <div class="form-group">
        <label class="form-label">Explanation note (optional)</label>
        <input type="text" class="form-input" id="ef-note" value="${q.note||''}">
      </div>
      <div class="form-group">
        <label class="form-label">Custom timer (seconds) — leave blank to use default (${G.timerDuration}s)</label>
        <input type="number" class="form-input" id="ef-timer" value="${q.timer||''}" min="5" max="120" placeholder="${G.timerDuration}">
      </div>
      <div class="form-group">
        <label class="form-label">Media type</label>
        <select class="form-select2" id="ef-mtype" onchange="toggleMedia()">
          <option value="none" ${!q.mtype||q.mtype==='none'?'selected':''}>None</option>
          <option value="audio" ${q.mtype==='audio'?'selected':''}>Audio clip (name this song/artist)</option>
          <option value="image" ${q.mtype==='image'?'selected':''}>Image (upload file)</option>
        </select>
      </div>
      <div id="ef-media-wrap" style="display:${q.mtype&&q.mtype!=='none'?'block':'none'}">
        <div class="form-group" id="ef-audio-g" style="display:${q.mtype==='audio'?'block':'none'}">
          <label class="form-label">Audio file</label>
          <div class="audio-upload">
            <label for="ef-aud-input">🎵 Upload audio file</label>
            <input type="file" id="ef-aud-input" accept="audio/*" onchange="handleEditorAudio(this)">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('ef-aud-input').click()">Browse</button>
            <span class="audio-status" id="ef-aud-status">${q.media&&q.mtype==='audio'?'Loaded':'No file'}</span>
          </div>
        </div>
        <div class="form-group" id="ef-image-g" style="display:${q.mtype==='image'?'block':'none'}">
          <label class="form-label">Image file</label>
          <div class="audio-upload">
            <label for="ef-img-input">🖼 Upload image file</label>
            <input type="file" id="ef-img-input" accept="image/*" onchange="handleEditorImage(this)">
            <button class="btn btn-outline btn-sm" onclick="document.getElementById('ef-img-input').click()">Browse</button>
            <span class="audio-status" id="ef-img-status">${q.media&&q.mtype==='image'?'Loaded':'No file'}</span>
          </div>
        </div>
      </div>
      <div class="em-actions">
        <button class="btn btn-dark" onclick="saveQuestion()">💾 Save</button>
        <button class="btn btn-outline" style="color:var(--red);border-color:var(--red);" onclick="clearQuestion()">🗑 Clear</button>
      </div>
    </div>`;
  renderEditorSidebar();
}

function toggleMedia(){
  const t=document.getElementById('ef-mtype').value;
  document.getElementById('ef-media-wrap').style.display=t==='none'?'none':'block';
  document.getElementById('ef-audio-g').style.display=t==='audio'?'block':'none';
  document.getElementById('ef-image-g').style.display=t==='image'?'block':'none';
}
function handleEditorAudio(input){
  const f=input.files[0]; if(!f) return;
  pendingAudBlob=URL.createObjectURL(f);
  document.getElementById('ef-aud-status').textContent=f.name.substring(0,18);
}
function handleEditorImage(input){
  const f=input.files[0]; if(!f) return;
  pendingImgBlob=URL.createObjectURL(f);
  document.getElementById('ef-img-status').textContent=f.name.substring(0,18);
}
function saveQuestion(){
  if(!G.editorCtx){notify('Select a question first');return;}
  const{catId,qIdx}=G.editorCtx;
  if(!G.questions[catId]) G.questions[catId]=[];
  while(G.questions[catId].length<=qIdx) G.questions[catId].push({q:'',a:'',note:'',timer:null,media:null,mtype:'none'});
  const mtype=document.getElementById('ef-mtype')?.value||'none';
  let media=null;
  if(mtype==='audio') media=pendingAudBlob||G.questions[catId][qIdx]?.media||null;
  if(mtype==='image') media=pendingImgBlob||G.questions[catId][qIdx]?.media||null;
  const timerVal=parseInt(document.getElementById('ef-timer')?.value);
  G.questions[catId][qIdx]={
    q:document.getElementById('ef-q')?.value||'',
    a:document.getElementById('ef-a')?.value||'',
    note:document.getElementById('ef-note')?.value||'',
    timer:timerVal>0?timerVal:null,
    media,mtype
  };
  pendingAudBlob=null; pendingImgBlob=null;
  notify('Saved');
  renderEditorSidebar();
}
function clearQuestion(){
  if(!G.editorCtx) return;
  const{catId,qIdx}=G.editorCtx;
  if(G.questions[catId]) G.questions[catId][qIdx]={q:'',a:'',note:'',timer:null,media:null,mtype:'none'};
  pendingAudBlob=null; pendingImgBlob=null;
  loadEditor(G.editorCtx.roundId,catId,qIdx,G.editorCtx.pts,G.editorCtx.ri);
  notify('Cleared');
}

// ═══════════════════════════════════════════
// END GAME
// ═══════════════════════════════════════════
function endGame(){
  showScreen('end');
  const sorted=[...G.teams].sort((a,b)=>b.score-a.score);
  const pod=document.getElementById('podium');
  const order=[1,0,2]; const cls=['p2','p1','p3']; const medals=['🥇','🥈','🥉'];
  pod.innerHTML='';
  order.forEach((rank,pos)=>{
    const t=sorted[rank]; if(!t) return;
    pod.innerHTML+=`<div class="podium-col">
      <div class="podium-block ${cls[pos]}">
        <div class="p-medal">${medals[rank]}</div>
        <div class="p-name" style="color:${t.color}">${t.emoji||''} ${t.name}</div>
        <div class="p-score">${t.score}</div>
      </div>
    </div>`;
  });
  document.getElementById('final-list').innerHTML=sorted.map((t,i)=>`
    <div class="final-row">
      <div class="final-rank">${i+1}</div>
      <div class="final-bar" style="background:${t.color}"></div>
      <div class="final-name">${t.emoji||''} ${t.name}</div>
      <div class="final-score">${t.score}</div>
    </div>`).join('');
  launchConfetti();
}

function launchConfetti(){
  const cols=['#B8850A','#E84040','#4A9EE8','#1A8A4A','#9B5DE5','#E8B84B'];
  for(let i=0;i<65;i++){
    setTimeout(()=>{
      const el=document.createElement('div');
      el.className='cf';
      el.style.left=Math.random()*100+'vw';
      el.style.background=cols[Math.floor(Math.random()*cols.length)];
      el.style.width=(5+Math.random()*8)+'px';
      el.style.height=(5+Math.random()*8)+'px';
      el.style.animationDuration=(2+Math.random()*3)+'s';
      document.body.appendChild(el);
      setTimeout(()=>el.remove(),6000);
    },i*55);
  }
}

// ═══════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
function notify(msg){
  const n=document.getElementById('notif');
  n.textContent=msg; n.classList.add('show');
  clearTimeout(n._t); n._t=setTimeout(()=>n.classList.remove('show'),2200);
}

// ── INIT ──
preloadSounds();
renderSetup();
