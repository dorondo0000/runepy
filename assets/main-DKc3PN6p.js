import{A as e,At as t,B as n,C as r,Ct as i,D as a,Dt as o,E as s,Et as c,Ft as l,G as u,H as d,I as f,K as p,L as m,M as h,Mt as g,N as _,Nt as v,O as y,Ot as b,P as x,Pt as S,R as ee,S as te,St as ne,T as re,Tt as ie,U as ae,V as oe,W as se,Z as ce,_ as le,_t as ue,a as de,b as fe,bt as pe,c as me,ct as C,d as he,dt as ge,f as _e,ft as ve,g as ye,gt as be,h as xe,ht as Se,i as Ce,j as we,jt as Te,k as Ee,kt as De,l as Oe,lt as ke,m as Ae,mt as je,n as Me,o as Ne,ot as Pe,p as Fe,pt as Ie,q as Le,r as Re,rt as ze,s as Be,st as Ve,t as He,u as Ue,ut as We,v as Ge,vt as Ke,w as qe,wt as Je,x as Ye,xt as w,y as Xe,yt as Ze,z as Qe}from"./dist-BWAGBJFN.js";var $e=[0,2,4,7,9],et=(e,t=220)=>t*2**(($e[e%5]+12*Math.floor(e/5))/12),tt=e=>e===1?330:e===2?392:e===3?294:262,nt=class{ctx=null;master=null;noiseBuf=null;last=new Map;volume=.2;muted=!1;unlock(){if(this.ctx)this.ctx.state===`suspended`&&this.ctx.resume();else{this.ctx=new AudioContext,this.master=this.ctx.createGain(),this.master.gain.value=this.muted?0:this.volume,this.master.connect(this.ctx.destination);let e=this.ctx.sampleRate;this.noiseBuf=this.ctx.createBuffer(1,e,e);let t=this.noiseBuf.getChannelData(0);for(let n=0;n<e;n++)t[n]=Math.random()*2-1}}setMuted(e){this.muted=e,this.master&&(this.master.gain.value=e?0:this.volume)}ok(e,t){let n=performance.now();return(this.last.get(e)??0)+t>n?!1:(this.last.set(e,n),!0)}tone(e,t,n,r,i=0,a=0){let o=this.ctx;if(!o||!this.master)return;let s=o.currentTime+a,c=o.createOscillator(),l=o.createGain();c.type=n,c.frequency.setValueAtTime(e,s),i&&c.frequency.exponentialRampToValueAtTime(i,s+t),l.gain.setValueAtTime(r,s),l.gain.exponentialRampToValueAtTime(1e-4,s+t),c.connect(l).connect(this.master),c.start(s),c.stop(s+t+.02)}noise(e,t,n,r=0){let i=this.ctx;if(!i||!this.master||!this.noiseBuf)return;let a=i.currentTime+r,o=i.createBufferSource();o.buffer=this.noiseBuf;let s=i.createBiquadFilter();s.type=`lowpass`,s.frequency.setValueAtTime(n,a),s.frequency.exponentialRampToValueAtTime(Math.max(60,n*.15),a+e);let c=i.createGain();c.gain.setValueAtTime(t,a),c.gain.exponentialRampToValueAtTime(1e-4,a+e),o.connect(s).connect(c).connect(this.master),o.start(a),o.stop(a+e+.02)}consume(e){if(this.ctx&&!this.muted)for(let t of e)switch(t.t){case`tick`:{let e=t.beat<.045?4:t.beat<.06?2:1;if(t.i%e)break;let n=t.n<=1?0:Math.round(t.i/(t.n-1)*9);this.tone(et(n),.045,`square`,.045);break}case`release`:t.casts||t.booms?(this.tone(150,.12,`triangle`,.4,55),this.noise(.07,.12,2400)):this.tone(120,.08,`triangle`,.12,80);break;case`launch`:this.ok(`launch`,30)&&this.tone(tt(t.elem)*2,.07,`square`,.05,tt(t.elem)*3);break;case`hit`:if(!this.ok(`hit`,25))break;t.weak?this.tone(tt(t.elem)*2,.09,`square`,.1,tt(t.elem)*4):this.tone(200,.06,`square`,.07,110);break;case`miss`:this.ok(`miss`,80)&&this.tone(140,.05,`triangle`,.06);break;case`kill`:t.depth>0?(this.tone(et(Math.min(14,3+t.depth),330),.14,`square`,.1),this.noise(.08,.1,3e3)):this.ok(`kill`,30)&&(this.tone(520,.07,`triangle`,.22,880),this.noise(.06,.08,2600));break;case`gain`:t.kind===`zeal`&&t.amount>=3&&this.ok(`zeal`,80)?(this.tone(et(12,330),.06,`square`,.06),this.tone(et(9,330),.1,`square`,.06,0,.05)):t.kind!==`ess`&&t.kind!==`zeal`&&t.amount>=3&&this.ok(`gain`,60)&&this.tone(et(9+Math.min(5,t.amount),440),.18,`triangle`,.08);break;case`boom`:if(!this.ok(`boom`,40))break;this.noise(.28,.4,1200),this.tone(100,.24,`triangle`,.4,40);break;case`summon`:{if(!this.ok(`summon`,45))break;let e=t.replaced?.1:0;if(t.replaced&&(this.noise(.07,.08,2200),this.tone(320,.06,`triangle`,.07,170)),t.kind===3)this.tone(880,.22,`sine`,.07,1320,e),this.tone(1320,.18,`sine`,.035,1760,e+.05);else if(t.kind===2)this.tone(85,.26,`sawtooth`,.05,170,e),this.noise(.18,.12,650,e);else{let n=tt(t.elem);this.tone(n,.15,`triangle`,.12,n*2,e),this.tone(n*1.5,.12,`square`,.025,n*3,e+.04)}break}case`sigil`:if(!this.ok(`sigil`,60))break;this.tone(110,.12,`triangle`,.28,60),this.noise(.05,.08,1500),this.tone(tt(t.elem)*2,.25,`sine`,.06,0,.04);break;case`wane`:t.stage>0?this.ok(`wane`,60)&&this.tone(et(6+t.stage*2,330),.14,`sine`,.05,et(4+t.stage*2,330)):this.ok(`fade`,60)&&(this.noise(.35,.05,2600),this.tone(660,.3,`sine`,.035,200));break;case`resonate`:{if(!this.ok(`resonate`,80))break;let e=Math.min(14,4+Math.floor(t.resonance*3));this.tone(et(e,330),.4,`sine`,.06),this.tone(et(e+2,330),.3,`sine`,.025,0,.03);break}case`windup`:this.ok(`windup`,150)&&this.tone(170,.55,`sawtooth`,.035,480);break;case`strike`:if(!this.ok(`strike`,60))break;this.noise(.12,.1,3400),this.tone(640,.12,`square`,.05,240);break;case`knock`:{let e=Math.max(1,Math.min(4,t.lost+1));for(let t=0;t<e;t++)this.tone(et(9-t*2),.04,`square`,.06,0,t*.035);this.tone(120,.18,`triangle`,.32,50),this.noise(.09,.14,900);break}case`shrug`:this.ok(`shrug`,150)&&this.tone(170,.06,`triangle`,.06,120);break;case`overflow`:this.noise(1.1,.6,700),this.tone(80,.9,`sawtooth`,.25,30),this.tone(660,.5,`square`,.06,110,.05);break;case`fizzle`:this.ok(`fizzle`,400)&&this.tone(110,.16,`sawtooth`,.07,70);break;case`unlock`:[0,2,4,7].forEach((e,t)=>this.tone(et(e+5,330),.16,`square`,.08,0,t*.07));break;case`inscribe`:{let e=Math.min(8,Math.max(3,t.runes));for(let t=0;t<e;t++)this.tone(et(t,262),.035,`square`,.04,0,t/e*.42);this.tone(130,.14,`triangle`,.35,55,.46),this.noise(.06,.1,1800,.46);break}case`stop`:this.tone(260,.12,`triangle`,.1,130);break;case`goal`:[0,2,4].forEach((e,t)=>this.tone(et(e+7,330),.14,`triangle`,.1,0,t*.08))}}};function rt(e){return st(e.body)}function it(e){let t=new Map,n=(e,r)=>{if(Array.isArray(e))return e.forEach(e=>n(e,r));if(!e||typeof e!=`object`)return;let i=e,a=typeof i.line==`number`?i.line:r;t.set(a,(t.get(a)??0)+ot(i));for(let e in i)e!==`line`&&n(i[e],a)};return n(e.body,1),t}function at(e){let t=[],n=(e,r)=>{if(Array.isArray(e))return e.forEach(e=>n(e,r));if(!e||typeof e!=`object`)return;let i=e,a=typeof i.line==`number`?i.line:r,o=typeof i.k==`string`?i.k:`iter`in i?`Comprehension`:`default`in i?`Param`:`Keyword`;for(let e=0;e<ot(i);e++)t.push({kind:o,line:a});for(let e in i)e!==`line`&&n(i[e],a)};return n(e.body,1),t}function ot(e){return e.k===`Const`&&typeof e.value==`string`?1+Math.floor(e.value.length/8):1}function st(e){if(Array.isArray(e)){let t=0;for(let n of e)t+=st(n);return t}if(!e||typeof e!=`object`)return 0;let t=e,n=ot(t);for(let e in t)e!==`line`&&(n+=st(t[e]));return n}var T=(e,t={})=>({...t.ess?{ess:t.ess}:{},fire:e,water:e,nature:e,...t.zeal?{zeal:t.zeal}:{},...t.glow?{glow:t.glow}:{}}),ct=[C(`track.0`),C(`track.1`),C(`track.2`),C(`track.3`),C(`track.4`)],E=[{id:`grid3`,title:C(`unlock.grid3.title`),blurb:C(`unlock.grid3.blurb`),gives:[C(`give.grid`,3)],cost:{ess:5},col:0,row:3},{id:`boom`,title:C(`unlock.boom.title`),blurb:C(`unlock.boom.blurb`),gives:[`boom(x, y)`],cost:{ess:12},req:[`grid3`],col:1,row:1},{id:`tempo1`,title:C(`unlock.tempo1.title`),blurb:C(`unlock.tempo1.blurb`),gives:[C(`give.beat`,We[1])],cost:{ess:130},req:[`boom`],col:2,row:4},{id:`sprite`,title:C(`unlock.sprite.title`),blurb:C(`unlock.sprite.blurb`),gives:[C(`give.summon`),`SPRITE`,`IMP`,`FIRE`,`WATER`,`NATURE`],cost:{ess:150},req:[`boom`],col:2,row:0},{id:`assign`,title:C(`unlock.assign.title`),blurb:C(`unlock.assign.blurb`),gives:[C(`give.assign`)],cost:{ess:40,fire:4},req:[`sprite`],col:3,row:1},{id:`read`,title:C(`unlock.read.title`),blurb:C(`unlock.read.blurb`),gives:[`m.elem`,`m.hp`,`m.x`,`m.y`,`m.kind`,`m.charge`,`me.mana`],cost:T(2,{ess:42}),req:[`assign`],col:4,row:1},{id:`if`,title:C(`unlock.if.title`),blurb:C(`unlock.if.blurb`),gives:[`if`,`elif`,`else`,`==`,`!=`,`<`,`<=`,`>`,`>=`,`is`,`is not`],cost:T(2,{ess:48}),req:[`read`],col:5,row:1},{id:`beast`,title:C(`unlock.beast.title`),blurb:C(`unlock.beast.blurb`),gives:[`BEAST`],cost:T(5,{ess:26}),req:[`if`],col:6,row:0},{id:`math`,title:C(`unlock.math.title`),blurb:C(`unlock.math.blurb`),gives:[`+`,`-`,`*`,`/`,`//`,`%`,`**`,C(`give.aug`)],cost:T(5,{ess:28}),req:[`if`],col:6,row:1},{id:`tempo2`,title:C(`unlock.tempo2.title`),blurb:C(`unlock.tempo2.blurb`),gives:[C(`give.beat`,We[2])],cost:T(5,{ess:27}),req:[`tempo1`,`sprite`],col:5,row:4},{id:`resonance`,title:C(`unlock.resonance.title`),blurb:C(`unlock.resonance.blurb`),gives:[C(`give.resonance`)],cost:{zeal:22},req:[`math`,`beast`],col:7,row:3},{id:`ring2`,title:C(`unlock.ring2.title`),blurb:C(`unlock.ring2.blurb`),gives:[C(`give.ring`)],cost:T(8,{ess:45}),req:[`math`],col:8,row:3},{id:`for`,title:C(`unlock.for.title`),blurb:C(`unlock.for.blurb`),gives:[`for … in …`,`range`],cost:{zeal:24},req:[`resonance`],col:8,row:1},{id:`logic`,title:C(`unlock.logic.title`),blurb:C(`unlock.logic.blurb`),gives:[`and`,`or`,`not`,C(`give.ifexp`)],cost:{zeal:110},req:[`beast`],col:7,row:2},{id:`scan`,title:C(`unlock.scan.title`),blurb:C(`unlock.scan.blurb`),gives:[`scan()`,C(`give.index`)],cost:T(50,{zeal:50}),req:[`for`],col:9,row:2},{id:`wisp`,title:C(`unlock.wisp.title`),blurb:C(`unlock.wisp.blurb`),gives:[`WISP`],cost:T(65,{zeal:45}),req:[`for`],col:9,row:0},{id:`mark`,title:C(`unlock.mark.title`),blurb:C(`unlock.mark.blurb`),gives:[C(`give.mark`)],cost:T(90,{glow:200}),req:[`for`],col:10,row:0},{id:`while`,title:C(`unlock.while.title`),blurb:C(`unlock.while.blurb`),gives:[`while`,`break`,`continue`],cost:T(60,{zeal:50}),req:[`for`],col:9,row:1},{id:`mana1`,title:C(`unlock.mana1.title`),blurb:C(`unlock.mana1.blurb`),gives:[C(`give.manaMax`,w[1]),C(`give.manaRegen`,ne[1])],cost:T(80,{glow:210}),req:[`for`],col:9,row:4},{id:`grid5`,title:C(`unlock.grid5.title`),blurb:C(`unlock.grid5.blurb`),gives:[C(`give.grid`,5)],cost:T(200,{ess:400}),req:[`for`],col:9,row:3},{id:`slice`,title:C(`unlock.slice.title`),blurb:C(`unlock.slice.blurb`),gives:[C(`give.slice`),C(`give.sliceStep`)],cost:T(220,{glow:300}),req:[`scan`],col:10,row:2},{id:`tools`,title:C(`unlock.tools.title`),blurb:C(`unlock.tools.blurb`),gives:[`len`,`min`,`max`,`sum`,`abs`],cost:T(330),req:[`scan`],col:11,row:2},{id:`def`,title:C(`unlock.def.title`),blurb:C(`unlock.def.blurb`),gives:[`def`,`return`],cost:T(160,{zeal:180}),req:[`grid5`],col:10,row:1},{id:`list`,title:C(`unlock.list.title`),blurb:C(`unlock.list.blurb`),gives:[`[a, b]`,`(a, b)`,C(`give.star`),`list`,`tuple`,`in`,`not in`,`.append`,`.pop`,`.insert`,`.reverse`,`.index`,`.count`],cost:T(180,{zeal:180}),req:[`def`],col:11,row:1},{id:`dict`,title:C(`unlock.dict.title`),blurb:C(`unlock.dict.blurb`),gives:[C(`give.dict`),`.get`,`.keys`,`.values`,`.items`],cost:T(260,{glow:330}),req:[`list`],col:12,row:1},{id:`comp`,title:C(`unlock.comp.title`),blurb:C(`unlock.comp.blurb`),gives:[`[… for … in …]`,`lambda`],cost:T(440,{ess:1e3}),req:[`list`],col:12,row:2},{id:`kit`,title:C(`unlock.kit.title`),blurb:C(`unlock.kit.blurb`),gives:[`sorted`,`reversed`,`enumerate`,`zip`,`map`,`filter`,`any`,`all`,`reduce`,`xor`,`int`,`float`,`str`,`bool`,`round`,C(`give.kw`),`&`,`|`,`^`,`<<`,`>>`,`~`,`.upper`,`.lower`,`.split`,`.join`,`.find`,`.replace`],cost:T(160,{zeal:220,glow:250}),req:[`list`],col:13,row:2},{id:`tempo3`,title:C(`unlock.tempo3.title`),blurb:C(`unlock.tempo3.blurb`),gives:[C(`give.beat`,We[3])],cost:T(520,{ess:1500}),req:[`tempo2`,`grid5`],col:11,row:4},{id:`mana2`,title:C(`unlock.mana2.title`),blurb:C(`unlock.mana2.blurb`),gives:[C(`give.manaMax`,w[2]),C(`give.manaRegen`,ne[2])],cost:T(560,{glow:300}),req:[`mana1`,`grid5`],col:12,row:4}],lt=[`ess`,`fire`,`water`,`nature`,`zeal`,`glow`],ut=(e,t)=>lt.every(n=>e[n]>=(t[n]??0)),dt={elem:[`sprite`,`assign`,`read`,`scan`],if:[`if`,`logic`],math:[`math`],charge:[`beast`],for:[`for`,`while`,`slice`,`tools`,`scan`],deep:[`def`,`list`,`dict`,`comp`,`kit`]},ft=e=>{let t=E.find(t=>t.id===e);if(!t)throw Error(`없는 봉인: ${e}`);return t},pt=new Map;for(let e of E){let t=(e,n=new Set)=>{for(let r of ft(e).req??[])n.has(r)||t(r,n.add(r));return n};for(let n of t(e.id))pt.set(n,[...pt.get(n)??[],e.id])}var mt=(e,t)=>e.owned.has(t)&&(ft(t).req??[]).every(t=>mt(e,t)),D=(e,t)=>e.owned.has(t)||(pt.get(t)??[]).some(t=>mt(e,t)),O=(e,t)=>ft(e).cost[t]??0,ht=e=>Math.min(e.res.fire,e.res.water,e.res.nature),gt=e=>e.got.fire>0&&e.got.water>0&&e.got.nature>0,_t=rt(Pe(`m = summon(1, 1, SPRITE)
cast(m, m.elem % 3 + 1)`))+4,vt=2.5,yt=1.6,bt=e=>ft(e).title,k=[{text:C(`goal.gather`,O(`grid3`,`ess`)),page:`go-start`,progress:e=>[e.res.ess,O(`grid3`,`ess`)],done:e=>e.res.ess>=O(`grid3`,`ess`)||D(e,`grid3`)},{text:C(`goal.grid3`,bt(`grid3`)),page:`go-start`,tree:!0,done:e=>D(e,`grid3`)},{text:C(`goal.buyEss`,O(`boom`,`ess`),bt(`boom`)),page:`go-boom`,tree:!0,progress:e=>[e.res.ess,O(`boom`,`ess`)],done:e=>D(e,`boom`)},{text:C(`goal.useBoom`),page:`go-boom`,done:e=>e.used.has(`boom`)||D(e,`sprite`)},{text:C(`goal.rate`,vt),page:`go-boom`,progress:e=>[e.best,vt],done:e=>e.best>=2.5||D(e,`sprite`)},{text:C(`goal.buyEss`,O(`sprite`,`ess`),bt(`sprite`)),page:`go-sprite`,tree:!0,progress:e=>[e.res.ess,O(`sprite`,`ess`)],done:e=>D(e,`sprite`)},{text:C(`goal.weakKill`),page:`go-sprite`,done:e=>e.earned.fire+e.earned.water+e.earned.nature>0||D(e,`assign`)},{text:C(`goal.buyFire`,O(`assign`,`fire`),bt(`assign`)),page:`go-name`,tree:!0,progress:e=>[e.res.fire,O(`assign`,`fire`)],done:e=>D(e,`assign`)},{text:C(`goal.buyElems`,O(`read`,`fire`),bt(`read`)),page:`go-name`,tree:!0,progress:e=>[ht(e),O(`read`,`fire`)],done:e=>D(e,`read`)},{text:C(`goal.buyElems`,O(`if`,`fire`),bt(`if`)),page:`go-if`,tree:!0,progress:e=>[ht(e),O(`if`,`fire`)],done:e=>D(e,`if`)},{text:C(`goal.allThree`),page:`go-if`,done:e=>e.spells.some(gt)||D(e,`beast`)||D(e,`math`)},{text:C(`goal.buyElems`,O(`beast`,`fire`),bt(`beast`)),page:`go-beast`,tree:!0,progress:e=>[ht(e),O(`beast`,`fire`)],done:e=>D(e,`beast`)},{text:C(`goal.zeal`),page:`go-beast`,done:e=>e.earned.zeal>0||D(e,`resonance`)},{text:C(`goal.buyElems`,O(`math`,`fire`),bt(`math`)),page:`go-math`,tree:!0,progress:e=>[ht(e),O(`math`,`fire`)],done:e=>D(e,`math`)},{text:C(`goal.shorten`,_t),page:`go-math`,done:e=>e.spells.some(e=>e.running&&e.runes.length<=_t&&gt(e))||D(e,`resonance`)},{text:C(`goal.buyZeal`,O(`resonance`,`zeal`),bt(`resonance`)),page:`go-resonance`,tree:!0,progress:e=>[e.res.zeal,O(`resonance`,`zeal`)],done:e=>D(e,`resonance`)},{text:C(`goal.mult`,yt),page:`go-resonance`,progress:e=>[e.bestMult,yt],done:e=>e.bestMult>=1.6||D(e,`for`)},{text:C(`goal.useFor`,bt(`for`)),page:`go-for`,done:e=>e.owned.has(`for`)&&e.used.has(`For`)||(pt.get(`for`)??[]).some(t=>mt(e,t))},{text:C(`goal.twoRings`,bt(`ring2`)),page:`go-ring`,done:e=>e.spells.filter(e=>e.running).length>=2||D(e,`grid5`)},{text:C(`goal.buy`,bt(`scan`)),page:`go-scan`,tree:!0,done:e=>D(e,`scan`)||D(e,`grid5`)},{text:C(`goal.glow`,bt(`wisp`)),page:`go-wisp`,done:e=>e.earned.glow>0||D(e,`grid5`)},{text:C(`goal.buy`,bt(`grid5`)),page:`go-grid5`,tree:!0,done:e=>D(e,`grid5`)},{text:C(`goal.rate`,12),page:`go-grid5`,progress:e=>[e.best,12],done:e=>e.best>=12||D(e,`def`)},{text:C(`goal.buy`,bt(`def`)),page:`go-deep`,tree:!0,done:e=>D(e,`def`)}];function xt(e,t){let n=(e,t,n)=>{if(t)throw new Ve(C(`gate.word`,e,t),n)},r=(e,i)=>{if(Array.isArray(e)){for(let t of e)r(t,i);return}if(!e||typeof e!=`object`)return;let a=e,o=typeof a.line==`number`?a.line:i;if(typeof a.k==`string`){let e=a.k===`UnaryOp`?a.op===`not`?`Not`:`Neg`:a.k,r=t.nodes.get(e);if(r)throw new Ve(C(`gate.syntax`,r),o);if(e===`Name`&&n(a.id,t.names.get(a.id),o),e===`Call`&&a.keywords.length>0){let e=t.nodes.get(`Keyword`);if(e)throw new Ve(C(`gate.syntax`,e),o)}if(t.ops&&((e===`BinOp`||e===`Neg`)&&n(a.op,t.ops.get(a.op),o),e===`AugAssign`&&n(`${a.op}=`,t.ops.get(a.op),o),e===`Compare`))for(let e of a.ops)n(e,t.ops.get(e),o);t.attrs&&e===`Attribute`&&n(`.${a.attr}`,t.attrs.get(a.attr),o)}for(let e in a)e!==`line`&&r(a[e],o)};r(e.body,1)}function St(e){let t=[];for(let n of e)for(let e of dt[n]??[n])t.includes(e)||t.push(e);return t}var Ct=[[1,0],[-1,0],[0,1],[0,-1]],wt=[[`assign`,`Assign`,C(`node.Assign`)],[`read`,`Attribute`,C(`node.Attribute`)],[`if`,`If`,C(`node.If`)],[`if`,`Compare`,C(`node.Compare`)],[`logic`,`BoolOp`,C(`node.BoolOp`)],[`logic`,`Not`,C(`node.Not`)],[`logic`,`IfExp`,C(`node.IfExp`)],[`math`,`BinOp`,C(`node.BinOp`)],[`math`,`Neg`,C(`node.Neg`)],[`math`,`AugAssign`,C(`node.AugAssign`)],[`for`,`For`,C(`node.For`)],[`while`,`While`,C(`node.While`)],[`while`,`Break`,C(`node.Break`)],[`while`,`Continue`,C(`node.Continue`)],[`scan`,`Subscript`,C(`node.Subscript`)],[`slice`,`Slice`,C(`node.Slice`)],[`def`,`FunctionDef`,C(`node.FunctionDef`)],[`def`,`Return`,C(`node.Return`)],[`list`,`List`,C(`node.List`)],[`list`,`Tuple`,C(`node.Tuple`)],[`list`,`Starred`,C(`node.Starred`)],[`dict`,`Dict`,C(`node.Dict`)],[`comp`,`ListComp`,C(`node.ListComp`)],[`comp`,`Lambda`,C(`node.Lambda`)],[`kit`,`Keyword`,C(`node.Keyword`)]],Tt=[[`boom`,[`boom`]],[`sprite`,[`summon`,`SPRITE`,`IMP`,`FIRE`,`WATER`,`NATURE`]],[`beast`,[`BEAST`]],[`wisp`,[`WISP`]],[`mark`,[`mark`]],[`for`,[`range`]],[`scan`,[`scan`]],[`tools`,[`len`,`min`,`max`,`sum`,`abs`]],[`list`,[`list`,`tuple`]],[`kit`,[`sorted`,`reversed`,`enumerate`,`zip`,`map`,`filter`,`any`,`all`,`reduce`,`xor`,`int`,`float`,`str`,`bool`,`round`]]],Et=[[`list`,[`in`,`not in`]],[`kit`,[`&`,`|`,`^`,`<<`,`>>`,`~`]]],Dt=[[`list`,[`append`,`pop`,`insert`,`reverse`,`index`,`count`]],[`dict`,[`get`,`keys`,`values`,`items`]],[`kit`,[`upper`,`lower`,`split`,`join`,`find`,`replace`]]],Ot=2,kt=e=>E.find(t=>t.id===e)?.title??e,At=(e,t)=>e+Math.random()*(t-e),jt=()=>({ess:0,fire:0,water:0,nature:0,zeal:0,glow:0}),Mt=e=>e===1?`fire`:e===2?`water`:`nature`;function Nt(e,t){let n=e=>{if(Array.isArray(e))return e.forEach(n);if(!e||typeof e!=`object`)return;let r=e;typeof r.k==`string`&&(t.add(r.k),r.k===`Name`&&t.add(r.id));for(let e in r)e!==`line`&&n(r[e])};n(e.body)}var Pt=class{size=1;cells=[null];respawn=[.4];sigils=[null];res=jt();earned=jt();owned=new Set;mana=w[0];silence=0;freeze=0;time=0;played=0;kills=0;spawning=!0;inscribeDelay=Ze;resonanceDecay=c;resonanceGain=o;wispStep=1;markMana=5;markTime=4;resonanceBy=`own`;windup=Te;spells=[];used=new Set;best=0;goal=0;trail=[];marks=[];resonance=Array(Ot).fill(0);bestMult=1;bolts=[];strikes=[];brace=0;knockedTotal=0;fx=[];timers=[];gains=[];carry=Array.from({length:Ot},jt);uid=1;sampleT=0;constructor(){this.addSpell()}level(e){return e.filter(e=>this.owned.has(e)).length}get beat(){return We[this.level([`tempo1`,`tempo2`,`tempo3`])]}get manaMax(){return w[this.level([`mana1`,`mana2`])]}get manaRegen(){return ne[this.level([`mana1`,`mana2`])]}get rings(){return this.owned.has(`ring2`)?2:1}multOf(e){return this.owned.has(`resonance`)&&e>=0?1+(this.resonance[e]??0):1}spell(e){return this.spells.find(t=>t.id===e)}addSpell(){if(this.spells.length>=6)return null;let e=1;for(;this.spells.some(t=>t.name===C(`world.spellName`,e));)e++;let t={id:this.uid++,name:C(`world.spellName`,e),source:``,draft:`cast()`,program:null,runes:[],running:!1,ring:-1,phase:`chant`,chantT:0,ticked:0,inscribing:0,error:null,fresh:!0,calling:!1,printed:``,lastRun:{ops:0,mana:0},since:0,gained:0,got:jt(),cycleAt:0,knocked:0,prev:null};return this.spells.push(t),t}removeSpell(e){return this.spells.length<=1?!1:(this.stop(e),this.spells=this.spells.filter(t=>t.id!==e),!0)}cycleOf(e){return S(e.runes.length,this.beat)}chantIndex(e){return e.phase===`release`?e.runes.length:Math.min(e.runes.length-1,Math.floor(e.chantT/this.beat))}spellStat(e){let t=Math.max(0,this.time-e.since),n=Math.max(6,e.cycleAt*3);return{rate:t>.5?e.gained/t:0,elapsed:t,ready:t>=n}}measureAgain(e){e.since=this.time+e.inscribing,e.gained=0,e.got=jt(),e.cycleAt=this.cycleOf(e),e.knocked=0}freeRing(){for(let e=0;e<this.rings;e++)if(!this.spells.some(t=>t.running&&t.ring===e))return e;return-1}gate(){let e=new Map;for(let[t,n,r]of wt)this.owned.has(t)||e.set(n,r);let t=e=>{let t=new Map;for(let[n,r]of e)if(!this.owned.has(n))for(let e of r)t.set(e,kt(n));return t};return{nodes:e,names:t(Tt),ops:t(Et),attrs:t(Dt)}}compile(e){try{let t=Pe(e);return t.body.length?(xt(t,this.gate()),{ok:!0,nodes:rt(t),module:t}):{ok:!1,message:C(`world.emptySpell`),line:1}}catch(e){return e instanceof Ve?{ok:!1,message:e.message,line:e.line}:{ok:!1,message:String(e?.message??e),line:1}}}inscribe(e,t){let n=this.spell(e);if(!n)return{ok:!1,message:C(`world.noSpell`),line:0};let r=this.compile(t);if(!r.ok)return r;if(!n.running){let e=this.freeRing();if(e<0&&this.rings===1){let t=this.spells.find(e=>e.running);t&&this.stop(t.id),e=0}if(e<0)return{ok:!1,message:C(`world.ringsFull`),line:0};n.ring=e}let i=t!==n.source||!n.program;if(i&&n.program&&n.running){let e=this.spellStat(n);e.ready&&(n.prev={runes:n.runes.length,cycle:n.cycleAt,rate:e.rate})}let a=n.running;return n.source=t,n.draft=t,n.program=r.module,n.runes=at(r.module),n.running=!0,n.phase=`chant`,n.chantT=0,n.ticked=0,n.error=null,n.fresh=!0,n.calling=!1,n.inscribing=this.inscribeDelay,(i||!a)&&(this.measureAgain(n),this.marks.push({t:this.time,kind:`inscribe`}),this.marks.length>200&&this.marks.shift()),Nt(r.module,this.used),this.fx.push({t:`inscribe`,spell:n.id,ring:n.ring,runes:n.runes.length}),r}stop(e){let t=this.spell(e);t&&t.running&&(this.fx.push({t:`stop`,spell:t.id,ring:t.ring}),t.running=!1,t.ring=-1,t.inscribing=0)}unit(e){return e-(this.size-1)/2}at(e,t){return e<0||t<0||e>=this.size||t>=this.size?null:this.cells[t*this.size+e]}sigilAt(e,t){return e<0||t<0||e>=this.size||t>=this.size?null:this.sigils[t*this.size+e]}mobs(){return this.cells.filter(Boolean).sort((e,t)=>e.born-t.born||e.id-t.id)}wispStage(e){return Math.max(0,3-Math.floor(e.age/this.wispStep+1e-9))}make(e,t,n,r){let i=be*(1+At(-Se,Se)),a=n===3?1:2;return{id:this.uid++,cx:e,cy:t,hp:a,kind:n,elem:r,born:this.time,age:0,hurt:0,charge:0,chargeT:0,chargeTime:i,windup:0,by:-1}}put(e,t,n=0,r=+!!l(n),i=-1){let a=this.make(e,t,r,r===1?l(n)?n:this.pickElem(e,t):0);return a.by=i,this.cells[t*this.size+e]=a,a}resize(e){let t=this.cells,n=this.size,r=(e-n)/2;this.cells=Array(e*e).fill(null),this.sigils=Array(e*e).fill(null),this.respawn=Array.from({length:e*e},()=>At(.15,1.1)),this.size=e,t.forEach((t,i)=>{t&&(t.cx=i%n+r,t.cy=Math.floor(i/n)+r,this.cells[t.cy*e+t.cx]=t)}),this.bolts=[],this.strikes=[],this.timers=[]}pickElem(e,t){let n=Ct.map(([n,r])=>this.at(e+n,t+r)).filter(e=>!!e&&e.kind===1&&l(e.elem));return n.length&&Math.random()<.55?n[Math.floor(Math.random()*n.length)].elem:Ke[Math.floor(Math.random()*Ke.length)]}weakTo(e,t){return e.kind===1&&l(e.elem)&&t===v(e.elem)}available(){return E.filter(e=>!this.owned.has(e.id)&&(e.req??[]).every(e=>this.owned.has(e)))}canBuy(e){return!this.owned.has(e.id)&&(e.req??[]).every(e=>this.owned.has(e))&&ut(this.res,e.cost)}buy(e){let t=E.find(t=>t.id===e);if(!t||!this.canBuy(t))return!1;for(let e of lt)this.res[e]-=t.cost[e]??0;this.owned.add(e),e===`grid3`&&this.resize(3),e===`grid5`&&this.resize(5);for(let e of this.spells)e.running&&this.measureAgain(e);return this.marks.push({t:this.time,kind:`unlock`}),this.fx.push({t:`unlock`,id:e}),!0}yieldRate(){let e=this.time-8;return this.gains=this.gains.filter(t=>t.t>=e),this.gains.reduce((e,t)=>e+t.n,0)/Math.min(8,Math.max(2,this.time))}yieldRates(){let e=this.time-8;this.gains=this.gains.filter(t=>t.t>=e);let t=jt(),n=Math.min(8,Math.max(2,this.time));for(let e of this.gains)t[e.kind]+=e.n/n;return t}after(e,t){this.timers.push({t:e,fn:t})}update(e){if(this.freeze>0){this.freeze-=e;return}if(this.time+=e,this.played+=e,this.timers.length){let t=[];this.timers=this.timers.filter(n=>(n.t-=e,n.t>0||(t.push(n.fn),!1)));for(let e of t)e()}this.mana=Math.min(this.manaMax,this.mana+this.manaRegen*e),this.silence=Math.max(0,this.silence-e),this.brace=Math.max(0,this.brace-e);let t=this.resonanceDecay**+(e/this.beat);for(let e=0;e<this.resonance.length;e++)this.resonance[e]*=t;for(let t=0;t<this.cells.length;t++){let n=this.sigils[t];n&&(n.t-=e)<=0&&(this.sigils[t]=null);let r=this.cells[t];if(r){let n=r.kind===3?this.wispStage(r):0;r.age+=e,r.hurt=Math.max(0,r.hurt-e),r.kind===2?this.gather(r,e):r.kind===3&&this.wane(r,t,n)}else if(this.spawning&&(this.respawn[t]-=e)<=0){let e=t%this.size,n=Math.floor(t/this.size),r=this.put(e,n);this.fx.push({t:`spawn`,x:this.unit(e),y:this.unit(n),elem:r.elem})}}this.bolts.length&&(this.bolts=this.bolts.filter(t=>{if(t.t+=e,t.t<t.dur)return!0;let n=this.at(t.cx,t.cy);return n&&n.id===t.mobId?this.hitMob(n,t.elem,0,t.spell,t.volley):this.fx.push({t:`miss`,x:t.tx,y:t.ty}),t.volley&&this.done(t.volley),!1})),this.strikes.length&&(this.strikes=this.strikes.filter(t=>(t.t+=e,t.t<t.dur||(this.knock(),!1))));for(let t of this.spells)t.running&&(t.inscribing>0?t.inscribing=Math.max(0,t.inscribing-e):this.silence<=0&&this.chant(t,e));if(this.sampleT+=e,this.sampleT>=1){this.sampleT=0;let e=this.yieldRate();this.trail.push({t:this.time,rate:e}),this.trail.length>3600&&this.trail.shift(),this.time>6&&e>this.best&&(this.best=e)}for(;this.goal<k.length&&k[this.goal].done(this);)this.goal++,this.fx.push({t:`goal`,index:this.goal})}wane(e,t,n){let r=this.wispStage(e);r>=n||(this.fx.push({t:`wane`,x:this.unit(e.cx),y:this.unit(e.cy),mob:e.id,stage:r}),r>0||(this.cells[t]=null,this.respawn[t]=At(De,b)))}gather(e,t){if(e.windup>0)e.windup-=t,e.windup<=0&&(e.windup=0,this.strike(e));else for(e.chargeT+=t;e.charge<3&&e.chargeT>=e.chargeTime;){e.chargeT-=e.chargeTime,e.charge++;let t=this.unit(e.cx),n=this.unit(e.cy);this.fx.push({t:`charge`,x:t,y:n,mob:e.id,charge:e.charge}),e.charge>=3&&(e.chargeT=0,e.windup=this.windup,this.fx.push({t:`windup`,x:t,y:n,mob:e.id}))}}strike(e){e.charge=0,e.chargeT=0;let t=this.unit(e.cx),n=this.unit(e.cy),r=pe-.7,i=Math.max(.05,Math.hypot(0-t,r-n)/14);this.strikes.push({id:this.uid++,mobId:e.id,sx:t,sy:n,tx:0,ty:r,elem:e.elem,t:0,dur:i}),this.fx.push({t:`strike`,x:t,y:n,mob:e.id,elem:e.elem})}knock(){if(this.brace>0){this.fx.push({t:`shrug`,why:`brace`});return}let e=null;if(this.silence<=0)for(let t of this.spells)!t.running||t.inscribing>0||t.phase!==`chant`||!t.runes.length||(!e||t.chantT>e.chantT)&&(e=t);if(!e){this.fx.push({t:`shrug`,why:`idle`});return}let t=this.beat,n=this.chantIndex(e);e.chantT=Math.max(0,e.chantT-3*t),e.ticked=Math.min(e.runes.length,Math.max(0,Math.ceil(e.chantT/t-1e-6)));let r=this.chantIndex(e),i=n-r;e.knocked+=i,this.knockedTotal+=i,this.brace=Ie,this.fx.push({t:`knock`,spell:e.id,ring:e.ring,from:n,to:r,lost:i})}chant(e,t){let n=this.beat,r=e.runes.length;e.chantT+=t;for(let t=0;t<4;t++)if(e.phase===`chant`){for(;e.ticked<r&&e.chantT>=e.ticked*n;)this.fx.push({t:`tick`,spell:e.id,ring:e.ring,i:e.ticked,n:r,beat:n}),e.ticked++;if(e.chantT<r*n||(e.chantT-=r*n,e.phase=`release`,this.execute(e),this.silence>0))return}else{if(e.chantT<5*n)return;e.chantT-=5*n,e.phase=`chant`,e.ticked=0}}execute(e){let n=[],r=[],a=[],o=0,s=0,c=(e,t)=>e>=0&&t>=0&&e<this.size&&t<this.size,l=e=>new ce(C(`obj.mob`),{x:e.cx,y:e.cy,hp:e.hp,kind:e.kind,elem:e.elem,charge:e.charge},e),u={2:[`beast`,C(`kind.beast`)],3:[`wisp`,C(`kind.wisp`)]},d={FIRE:1,WATER:2,NATURE:3,IMP:0,SPRITE:1,BEAST:2,WISP:3,me:new ce(C(`obj.me`),{mana:Math.floor(this.mana)}),scan:new Le(`scan`,()=>this.mobs().map(l)),summon:new Le(`summon`,(e,n,r)=>{e.length!==3&&r.fail(C(`api.summon.args`));let i=r.int(e[0]),s=r.int(e[1]),d=r.int(e[2]);c(i,s)||r.fail(C(`api.summon.range`,this.size-1)),d===0&&r.fail(C(`api.summon.imp`)),t.includes(d)||r.fail(C(`api.summon.kind`));let f=u[d];f&&!this.owned.has(f[0])&&r.fail(C(`api.summon.sealed`,f[1],kt(f[0]))),o>=25&&r.fail(C(`api.summon.cap`,25)),o++,r.spend(2),a.push({op:`summon`,cx:i,cy:s,kind:d});let p=this.cells[s*this.size+i];return p&&p.kind!==0?l(p):null}),mark:new Le(`mark`,(e,t,n)=>{e.length!==3&&n.fail(C(`api.mark.args`));let r=n.int(e[0]),i=n.int(e[1]),o=n.int(e[2]);return c(r,i)||n.fail(C(`api.mark.range`,this.size-1)),Ke.includes(o)||n.fail(C(`api.mark.elem`)),s>=25&&n.fail(C(`api.mark.cap`,25)),s++,n.spend(this.markMana),a.push({op:`mark`,cx:r,cy:i,elem:o}),null}),cast:new Le(`cast`,(e,t,r)=>{e.length>2&&r.fail(C(`api.cast.args`));let i=null;if(e.length>=1){let t=e[0];if(t===null)return null;if(!(t instanceof ce)||!t.ref)return r.fail(C(`api.cast.mob`));i=t.ref}let a=e.length===2&&e[1]!==null&&e[1]!==void 0?r.int(e[1]):0;return n.length>=32&&r.fail(C(`api.cast.cap`,32)),r.spend(3),n.push({mob:i,elem:a,line:r.line}),null}),boom:new Le(`boom`,(e,t,n)=>{e.length!==2&&n.fail(C(`api.boom.args`));let i=n.int(e[0]),a=n.int(e[1]);return c(i,a)||n.fail(C(`api.boom.range`,this.size-1)),r.length>=16&&n.fail(C(`api.boom.cap`,16)),n.spend(6),r.push({cx:i,cy:a,line:n.line}),null})},f=ze(e.program,d,{mana:this.mana,opMana:i,maxDepth:48,log:t=>e.printed=t});if(e.lastRun={ops:f.ops,mana:f.manaSpent},f.overflow){this.mana=0,this.overflow(f.manaSpent,e);return}this.mana=Math.max(0,this.mana-f.manaSpent);let p={spell:e.id,ring:e.ring,mult:this.multOf(e.ring),at:this.time,pending:0,ops:a,weak:0,added:0};p.mult>this.bestMult&&(this.bestMult=p.mult);let m=e.fresh;if(e.fresh=!1,f.error){m&&f.error.none?(e.error=null,e.calling=!0,this.fx.push({t:`calling`,spell:e.id})):(e.error={message:f.error.message,line:f.error.line},e.calling=!1,this.fx.push({t:`fizzle`,spell:e.id})),this.settle(p);return}e.error=null,e.calling=!1;let h=this.mobs(),g=new Map,_=new Set,v=0,y=0;for(let e of n){let t=e.mob??h.find(e=>e.hp-(g.get(e)??0)>0)??h[0]??null;if(!t){y++;continue}let n=this.weakTo(t,e.elem);g.set(t,(g.get(t)??0)+(n?2:1)),_.add(e.line);let r=e.elem;p.pending++,this.after(v*ge,()=>this.launch(t,r,p)),v++}r.forEach((e,t)=>{_.add(e.line),p.pending++,this.after(ve+t*.07,()=>{this.boomAt(e.cx,e.cy,p),this.done(p)})}),this.fx.push({t:`release`,spell:e.id,ring:e.ring,casts:v,booms:r.length,whiffs:y,lines:[..._]}),p.pending===0&&this.settle(p)}done(e){--e.pending<=0&&this.settle(e)}settle(e){let t=e.ops;e.ops=[];for(let n of t){if(n.cx>=this.size||n.cy>=this.size)continue;let t=n.cy*this.size+n.cx,r=this.cells[t],i=!!r&&r.kind!==0,a=this.unit(n.cx),o=this.unit(n.cy);if(n.op===`mark`){if(i){this.refund(this.markMana);continue}this.sigils[t]={elem:n.elem,t:this.markTime},this.fx.push({t:`sigil`,x:a,y:o,elem:n.elem});continue}if(i){this.refund(2);continue}let s=0;if(n.kind===1){let e=this.sigils[t];e?(s=e.elem,this.sigils[t]=null):s=this.pickElem(n.cx,n.cy)}let c=this.make(n.cx,n.cy,n.kind,s);c.by=e.ring,this.cells[t]=c,this.fx.push({t:`summon`,x:a,y:o,kind:c.kind,elem:c.elem,replaced:!!r})}}refund(e){this.mana=Math.min(this.manaMax,this.mana+e)}launch(e,t,n){let r=pe-.7,i=this.unit(e.cx),a=this.unit(e.cy),o=Math.max(.05,Math.hypot(i-0,a-r)/17);this.bolts.push({id:this.uid++,spell:n.spell,sx:0,sy:r,tx:i,ty:a,cx:e.cx,cy:e.cy,mobId:e.id,elem:t,t:0,dur:o,volley:n}),this.fx.push({t:`launch`,elem:t})}boomAt(e,t,n){if(!(e>=this.size||t>=this.size)){this.fx.push({t:`boom`,cx:e,cy:t});for(let[r,i]of[[0,0],...Ct]){let a=this.at(e+r,t+i);a&&this.hitMob(a,0,0,n.spell,n)}}}hitMob(e,t,n,r,i,a=0,o=!1){if(this.at(e.cx,e.cy)!==e)return;let s=this.weakTo(e,t);e.hp-=(s?2:1)+a,e.hurt=.12;let c=this.unit(e.cx),l=this.unit(e.cy);this.fx.push({t:`hit`,x:c,y:l,elem:t,weak:s}),e.hp<=0&&this.kill(e,t,s,n,r,i,o)}kill(e,t,n,r,i,a,o=!1){let s=e.cy*this.size+e.cx;this.cells[s]=null,this.respawn[s]=At(De,b),this.kills++;let c=this.unit(e.cx),l=this.unit(e.cy);if(this.fx.push({t:`kill`,x:c,y:l,elem:e.elem,weak:n,depth:r}),this.gain(`ess`,1,c,l,i,a),!o&&e.kind===2&&e.charge>0&&this.gain(`zeal`,g[Math.min(e.charge,3)],c,l,i,a),!o&&e.kind===3&&this.gain(`glow`,Math.max(1,this.wispStage(e)),c,l,i,a),!n)return;this.gain(Mt(e.elem),Math.min(6,r+1),c,l,i,a),a&&(this.resonanceBy===`any`||e.by===a.ring)&&this.resonate(a),r>=1&&(this.freeze=Math.max(this.freeze,Math.min(.05,.02+r*.006)));let{cx:u,cy:d}=e,f=e.elem;a&&a.pending++,this.after(je,()=>{for(let[e,n]of Ct){let o=this.at(u+e,d+n);o&&o.kind===1&&o.elem===f&&(this.fx.push({t:`chain`,x1:c,y1:l,x2:this.unit(o.cx),y2:this.unit(o.cy),elem:t,depth:r+1}),this.hitMob(o,t,r+1,i,a))}a&&this.done(a)})}resonate(e){if(!this.owned.has(`resonance`)||e.ring<0)return;e.weak++;let t=0;t=this.resonanceGain===`cast`?+(e.weak===1):Math.min(1/3,4-e.added),t<=1e-9||(e.added+=t,this.resonance[e.ring]+=t*this.resonanceDecay**+((this.time-e.at)/this.beat),this.fx.push({t:`resonate`,ring:e.ring,spell:e.spell,resonance:this.resonance[e.ring]}))}gain(e,t,n,r,i,a){let o=t;if(a&&a.ring>=0&&a.mult!==1){let n=this.carry[a.ring];if(n[e]+=t*a.mult,o=Math.floor(n[e]+1e-9),n[e]-=o,o<=0)return}this.res[e]+=o,this.earned[e]+=o;let s=this.spell(i);s&&(s.gained+=o,s.got[e]+=o),this.gains.push({t:this.time,n:o,kind:e}),this.fx.push({t:`gain`,x:n,y:r,kind:e,amount:o})}overflow(e,t){this.silence=Je+e*ie;for(let e of this.spells)e.phase=`chant`,e.chantT=0,e.ticked=0,e.fresh=!0,e.calling=!1;this.fx.push({t:`overflow`,spent:e});let n=+(e>=30);for(let e of this.mobs())this.hitMob(e,0,0,t.id,null,n,!0)}save(){return{v:4,res:{...this.res},earned:{...this.earned},owned:[...this.owned],spells:this.spells.map(e=>({name:e.name,source:e.source,draft:e.draft,running:e.running})),best:this.best,bestMult:this.bestMult,goal:this.goal,played:this.played,used:[...this.used]}}load(e){if(!e||e.v!==2&&e.v!==3&&e.v!==4||!Array.isArray(e.spells)||!e.spells.length)return!1;let t=Array.isArray(e.owned)?e.owned:[];this.owned=new Set((e.v===2?St(t):t).filter(e=>E.some(t=>t.id===e)));for(let t of lt)this.res[t]=Math.max(0,Number(e.res?.[t])||0),this.earned[t]=Math.max(0,Number(e.earned?.[t])||0);let n=this.owned.has(`grid5`)?5:this.owned.has(`grid3`)?3:1;n!==this.size&&this.resize(n),this.best=Number(e.best)||0,this.bestMult=Math.max(1,Number(e.bestMult)||1),this.goal=e.v===4?Math.max(0,Math.min(k.length,Math.floor(Number(e.goal)||0))):0,this.played=Number(e.played)||0,this.used=new Set(e.used??[]),this.mana=this.manaMax,this.strikes=[],this.brace=0,this.resonance.fill(0),this.carry=Array.from({length:Ot},jt),this.sigils.fill(null),this.spells=[];for(let t of e.spells.slice(0,6)){let e=this.addSpell();if(!e)break;if(e.name=t.name||e.name,e.draft=t.draft??t.source??`cast()`,t.source&&t.running){let n=e.draft;this.inscribe(e.id,t.source).ok||(e.source=``),e.draft=n}else e.source=t.source??``;e.inscribing=0,e.prev=null,this.measureAgain(e)}for(;this.goal<k.length&&k[this.goal].done(this);)this.goal++;return this.marks=[],this.fx=[],!0}},Ft=`runepy.save.v2`;function It(e){let t=e?.v;return typeof t==`number`&&Number.isFinite(t)&&t>4}function Lt(e){let t=new TextEncoder().encode(JSON.stringify(e)),n=``;for(let e=0;e<t.length;e+=32768)n+=String.fromCharCode(...t.subarray(e,e+32768));return btoa(n)}function Rt(e){let t=e.replace(/\s+/g,``);if(!t)return{ok:!1,why:`empty`};let n;try{let e=atob(t),r=Uint8Array.from(e,e=>e.charCodeAt(0));n=JSON.parse(new TextDecoder(`utf-8`,{fatal:!0}).decode(r))}catch{return{ok:!1,why:`format`}}if(!n||typeof n!=`object`||Array.isArray(n))return{ok:!1,why:`format`};if(It(n))return{ok:!1,why:`future`};try{if(!new Pt().load(n))return{ok:!1,why:`invalid`}}catch{return{ok:!1,why:`invalid`}}return{ok:!0,data:n}}var A=128,zt=98,Bt=4,j=102,Vt=26,Ht=16,Ut=5,Wt=.65,Gt=124,Kt=Math.round(Gt*Wt),qt=8,M=207,N=[{aIn:92,aOut:106,aRune:99,max:60},{aIn:106,aOut:120,aRune:113,max:70}],Jt=[`st3`,`st4`,`lit`,`hot`,`ember`,`fire`],Yt={ess:`hot`,fire:`fire`,water:`water`,nature:`leaf`,zeal:`void`,glow:`lit`},Xt={...Yt,zeal:`hot`},P=e=>{let t=Math.imul(e^2654435769,2246822507);return t^=t>>>13,t=Math.imul(t,3266489909),t^=t>>>16,(t>>>0)/4294967296},Zt=(e,t)=>e+Math.random()*(t-e),Qt=new Map;function $t(e,t){let n=`${e}:${t}`,r=Qt.get(n);if(r)return r;let i=new Set,a=[],o=(e,t)=>{let n=(e+512)*1024+(t+512);i.has(n)||(i.add(n),a.push(e,t))};for(let n=-e;n<=e;n++){let r=Math.round(t*Math.sqrt(Math.max(0,1-(n/e)**2)));o(n,r),o(n,-r)}for(let n=-t;n<=t;n++){let r=Math.round(e*Math.sqrt(Math.max(0,1-(n/t)**2)));o(r,n),o(-r,n)}return r=Int16Array.from(a),Qt.set(n,r),r}var en=new Map,tn=720;function nn(e){let t=en.get(e);if(t)return t;let n=e*Wt,r=4e3,i=[],a=[],o=[0];for(let t=0;t<=r;t++){let s=-Math.PI/2+t/r*Math.PI*2;i.push(Math.cos(s)*e),a.push(Math.sin(s)*n),t&&o.push(o[t-1]+Math.hypot(i[t]-i[t-1],a[t]-a[t-1]))}let s=o[r];t=new Int16Array(tn*2);let c=0;for(let e=0;e<tn;e++){let n=e/tn*s;for(;c<r&&o[c+1]<n;)c++;t[e*2]=Math.round(i[c]),t[e*2+1]=Math.round(a[c])}return en.set(e,t),t}function rn(e,t,n,r,i,a=1){t=Math.round(t),n=Math.round(n),r=Math.round(r),i=Math.round(i);let o=Math.abs(r-t),s=-Math.abs(i-n),c=t<r?1:-1,l=n<i?1:-1,u=o+s;for(let d=0;d<600;d++){if(e.fillRect(t,n,a,a),t===r&&n===i)return;let d=2*u;d>=s&&(u+=s,t+=c),d<=o&&(u+=o,n+=l)}}var an=.12,on=.07,sn=[1.15,1.5,1.8,2.2],cn=(e,t)=>`${e},${t}`,ln=e=>e===1?`fire`:e===2?`water`:e===3?`nature`:`none`,un=(e,t)=>e===2?[`bone`,`st3`,`beast`]:e===3?[`lit`,`groove`,`wisp`]:[d(t),se(t),ln(t)],dn=22,fn=.5,pn=class{canvas;g;mobs;auras;mage;mageOff;runes;bubble;backdrop=document.createElement(`canvas`);backdropKey=``;shownSize=-1;growFrom=0;growT=0;grown=new Set;shownRings=-1;parts=[];pops=[];links=[];flashes=[];waves=[];shards=[];corpses=[];glyphs=[];poofs=[];sigilFlashes=[];fades=[];summonDelay=new Map;wanes=new Map;seen=new Map;resShown=[1,1];resFlash=[0,0];ringSparkOffset=0;hits=new Map;knocks=[];flinch=0;clock=0;shake=0;recoil=0;nod=0;ringFlash=[0,0];ringTone=[`lit`,`lit`];overflowT=0;overflowSum=0;overflowShards=0;overflowPop=null;tip={x:135,y:183};scale=2;constructor(e){this.canvas=e,e.width=256,e.height=232,this.g=e.getContext(`2d`),this.g.imageSmoothingEnabled=!1,this.backdrop.width=256,this.backdrop.height=232,this.mobs=m(),this.auras=x(),this.mage=f(!1),this.mageOff=f(!0),this.runes=ee(Jt),this.bubble=Qe(`hot`)}fit(e,t){this.scale=Math.max(1,Math.floor(Math.min(e/256,t/232))),this.canvas.style.width=`${256*this.scale}px`,this.canvas.style.height=`${232*this.scale}px`}px(e){return Math.round(A+e*Vt)}py(e){return Math.round(zt+e*Ht)}feetY(e){return this.py(e)+3}consume(e,t){for(let n of e)switch(n.t){case`tick`:this.nod=.05;break;case`release`:this.recoil=.14,this.flashRing(n.ring,.18,`lit`),n.ring>=0&&n.ring<2&&this.waves.push({x:A,y:j,a:N[n.ring].aRune,speed:60,max:N[n.ring].aRune+8,tone:`lit`}),n.whiffs&&!n.casts&&!n.booms&&this.spark(this.tip.x,M,M-this.tip.y,5,`st3`,24,.4,0);break;case`launch`:this.spark(this.tip.x,M,M-this.tip.y,4,ae(n.elem),50,.2,0);break;case`hit`:{let e=this.px(n.x),t=this.feetY(n.y),r=ae(n.elem);this.spark(e,t,6,n.weak?9:5,r,n.weak?90:55,.3,0),n.weak&&this.spark(e,t,6,4,`hot`,70,.2,0),this.shake=Math.max(this.shake,n.weak?2:1);break}case`miss`:{let e=this.px(n.x),t=this.feetY(n.y);this.debris(e,t,5,[`st3`,`st2`],40,70),this.spark(e,t,1,3,`lit`,30,.2,0);break}case`kill`:{let e=this.px(n.x),t=this.feetY(n.y),r=this.seen.get(cn(n.x,n.y))??+!!n.elem;if(r===3){this.spark(e,t,9,10,`hot`,70,.3,-10),this.spark(e,t,9,8,`lit`,50,.45,-25),this.waves.push({x:e,y:t,a:3,speed:70,max:12,tone:`lit`}),this.shake=Math.max(this.shake,1);break}if(this.corpses.push({x:e,y:t,elem:n.elem,kind:r,t:0}),this.overflowT>0){this.debris(e,t,3,[d(n.elem),se(n.elem)],50,90);break}this.debris(e,t,6+n.depth*2,[d(n.elem),se(n.elem)],60+n.depth*10,110),this.spark(e,t,6,6+n.depth*2,`hot`,80+n.depth*15,.3,0),this.waves.push({x:e,y:t,a:4,speed:80,max:12+Math.min(10,n.depth*3),tone:d(n.elem)}),this.shake=Math.max(this.shake,2+Math.min(3,n.depth));break}case`gain`:{let e=this.px(n.x),t=this.feetY(n.y)-10,[r,i]=this.purseTarget(n.kind);if(this.overflowT>0){this.overflowSum+=n.amount;let a=`+${this.overflowSum}`;this.overflowPop&&this.overflowPop.life>0?(this.overflowPop.text=a,this.overflowPop.life=Math.max(this.overflowPop.life,.7)):(this.overflowPop={x:A,y:30,text:a,tone:`hot`,life:1.1,scale:2},this.pops.push(this.overflowPop)),this.overflowShards<8&&(this.overflowShards++,this.shards.push({x0:e,y0:t,x1:r,y1:i,t:-this.overflowShards*.03,dur:.6,fill:Yt[n.kind]}));break}let a=Math.min(4,n.amount);for(let o=0;o<a;o++)this.shards.push({x0:e+(o-a/2)*4,y0:t,x1:r,y1:i,t:-o*.04,dur:.6,fill:Yt[n.kind]});n.kind!==`ess`&&n.amount>=2&&this.pops.push({x:e,y:t-8,text:`+${n.amount}`,tone:Xt[n.kind],life:.8,scale:n.amount>=4?2:1});break}case`chain`:this.links.push({x1:this.px(n.x1),y1:this.feetY(n.y1),x2:this.px(n.x2),y2:this.feetY(n.y2),tone:ae(n.elem),life:.2});break;case`boom`:for(let[e,r]of[[0,0],[1,0],[-1,0],[0,1],[0,-1]]){let i=n.cx+e,a=n.cy+r;if(i<0||a<0||i>=t.size||a>=t.size)continue;let o=e===0&&r===0;this.flashes.push({cx:i,cy:a,t:0,center:o});let s=this.px(t.unit(i)),c=this.feetY(t.unit(a));this.debris(s,c,o?8:4,[`st3`,`st2`,`st4`],50,o?130:90),this.spark(s,c,2,o?8:4,o?`hot`:`fire`,70,.3,0)}{let e=this.px(t.unit(n.cx)),r=this.feetY(t.unit(n.cy));this.waves.push({x:e,y:r,a:6,speed:150,max:34,tone:`fire`})}this.shake=Math.max(this.shake,3);break;case`spawn`:{let e=this.px(n.x),t=this.feetY(n.y);this.debris(e,t,4,[`st3`,`st2`],30,50);break}case`summon`:{let e=(t.size-1)/2,r=Math.round(n.x+e),i=Math.round(n.y+e),a=n.replaced?an:0,o=t.at(r,i);if(o&&this.summonDelay.set(o.id,a+on),n.replaced){let e=this.px(n.x),t=this.feetY(n.y);this.poofs.push({x:e,y:t,t:0}),this.debris(e,t,6,[`bone`,`st4`,`st3`],55,70),this.spark(e,t,8,6,`st4`,45,.25,-15)}let[s,c,l]=un(n.kind,n.elem);this.glyphs.push({cx:r,cy:i,size:t.size,t:-a,tone:s,shade:c,mark:l,sparked:!1});break}case`sigil`:{let e=(t.size-1)/2;this.sigilFlashes.push({cx:Math.round(n.x+e),cy:Math.round(n.y+e),size:t.size,t:0});let r=this.px(n.x),i=this.feetY(n.y)-3;this.spark(r,i,1,8,d(n.elem),45,.35,-20),this.spark(r,i,1,3,`hot`,30,.2,0);break}case`wane`:{let e=this.px(n.x),t=this.feetY(n.y);n.stage>0?(this.wanes.set(n.mob,0),this.spark(e,t,8+n.stage*2,5+n.stage*2,n.stage>=2?`lit`:`groove`,34,.55,-24),this.spark(e,t,8+n.stage*2,3,`hot`,22,.3,-12),this.waves.push({x:e,y:t,a:2,speed:36,max:6+n.stage*2,tone:n.stage>=2?`lit`:`groove`})):(this.fades.push({x:e,y:t,t:0}),this.spark(e,t,7,12,`groove`,30,.75,-26),this.spark(e,t,7,6,`lit`,22,.5,-18),this.waves.push({x:e,y:t,a:2,speed:30,max:9,tone:`groove`}));break}case`resonate`:if(n.ring>=0&&n.ring<2){this.resFlash[n.ring]=.28,this.resShown[n.ring]=Math.max(1,n.resonance),this.flashRing(n.ring,.16,`hot`);let e=N[n.ring],t=nn(n.ring===0?e.aIn-2:e.aOut+2);for(let e=this.ringSparkOffset;e<tn;e+=40)this.spark(A+t[e*2],j+t[e*2+1],1,1,Math.random()<.5?`hot`:`lit`,14,.5,-22);this.ringSparkOffset=(this.ringSparkOffset+13)%40}break;case`charge`:{let e=this.elemOf(t,n.mob),r=this.px(n.x),i=this.feetY(n.y);this.spark(r,i,1,2+n.charge*2,_(e),28,.4,-28),this.spark(r,i,2,n.charge,h(e),22,.3,-30);break}case`windup`:{let e=this.elemOf(t,n.mob),r=this.px(n.x),i=this.feetY(n.y);this.waves.push({x:r,y:i,a:3,speed:40,max:13,tone:_(e)}),this.spark(r,i,18,4,h(e),30,.4,-30);break}case`strike`:{let e=this.px(n.x),t=this.feetY(n.y);this.spark(e,t,14,6,h(n.elem),60,.25,-20),this.shake=Math.max(this.shake,1);break}case`knock`:this.flinch=.3,this.knocks.push({spell:n.spell,from:n.from,to:n.to,t:0,sparked:!1}),this.spark(A,M,dn,10,`ember`,90,.3,0),this.spark(A,M,dn,5,`fire`,60,.2,0),this.shake=Math.max(this.shake,3);break;case`shrug`:this.spark(A,M,dn,5,n.why===`brace`?`st4`:`st3`,45,.25,0);break;case`overflow`:this.overflowT=.6,this.overflowSum=0,this.overflowShards=0,this.overflowPop=null,this.shake=7,this.flashRing(0,.6,`ember`),this.flashRing(1,.6,`ember`);for(let e=0;e<2;e++)this.waves.push({x:A,y:j,a:10+e*30,speed:200,max:Gt,tone:e?`fire`:`ember`});this.spark(A,j,8,30,`ember`,200,.6,0),this.spark(A,j,8,12,`fire`,150,.45,0),this.debris(A,j,14,[`st3`,`st2`,`ember`],110,140);break;case`fizzle`:this.recoil=.1,this.spark(this.tip.x,M,M-this.tip.y,8,`st3`,30,.6,-40);break;case`unlock`:this.waves.push({x:A,y:j,a:8,speed:220,max:Gt,tone:`lit`}),this.spark(A,j,4,24,`lit`,140,.7,0);break;case`inscribe`:this.flashRing(n.ring,.16,`lit`),this.spark(this.tip.x,M,M-this.tip.y+5,6,`hot`,40,.3,0);break;case`stop`:this.flashRing(n.ring,.3,`st4`);break;case`goal`:this.flashRing(0,.3,`leaf`),this.flashRing(1,.3,`leaf`),this.spark(A,M,22,10,`hot`,60,.6,0)}}purseTarget(e){let t=document.querySelector(`#purse .res[data-k="${e}"]:not([hidden]) img`)??document.querySelector(`#purse .res[data-k="ess"] img`),n=this.canvas.getBoundingClientRect();if(!t||!n.width)return[-40,-30];let r=t.getBoundingClientRect(),i=this.canvas.clientWidth/256||1,a=n.x+this.canvas.clientLeft,o=n.y+this.canvas.clientTop;return[Math.round((r.x+r.width/2-a)/i),Math.round((r.y+r.height/2-o)/i)]}flashRing(e,t,n){e<0||e>1||this.ringFlash[e]>0&&this.ringTone[e]===`ember`&&n!==`ember`||(this.ringFlash[e]=t,this.ringTone[e]=n)}spark(e,t,n,r,i,a,o,s){for(let c=0;c<r;c++){let r=Math.random()*Math.PI*2,c=a*Zt(.35,1);this.parts.push({x:e,y:t,z:n,vx:Math.cos(r)*c,vy:Math.sin(r)*c*Wt,vz:Math.sin(r*3)*c*.5-s,grav:0,life:o*Zt(.6,1),tone:i,size:Math.random()<.25?2:1})}this.trimParts()}debris(e,t,n,r,i,a){for(let o=0;o<n;o++){let n=Math.random()*Math.PI*2,s=i*Zt(.2,1);this.parts.push({x:e,y:t,z:2,vx:Math.cos(n)*s,vy:Math.sin(n)*s*Wt,vz:a*Zt(.5,1),grav:420,life:Zt(.45,.8),tone:r[o%r.length],size:Math.random()<.5?2:1})}this.trimParts()}trimParts(){this.parts.length>600&&this.parts.splice(0,this.parts.length-600)}text(t,n,r,i,o,s=1,c=`void`){let l=Math.round(r-(n.length*4*s-s)/2),u=c?[[c,1],[o,0]]:[[o,0]];for(let[r,o]of u){t.fillStyle=e[r];let c=l+o;for(let e of n){let n=a[e];n&&n.forEach((e,n)=>{for(let r=0;r<3;r++)e[r]===`#`&&t.fillRect(c+r*s,Math.round(i)+o+n*s,s,s)}),c+=4*s}}}outline(t,n,r,i,a,o){let s=$t(i,a);t.fillStyle=e[o];for(let e=0;e<s.length;e+=2)t.fillRect(n+s[e],r+s[e+1],1,1)}fillEllipse(t,n,r,i,a,o){t.fillStyle=e[o];for(let e=-a;e<=a;e++){let o=Math.round(i*Math.sqrt(Math.max(0,1-(e/a)**2)));t.fillRect(n-o,r+e,o*2+1,1)}}tileOrigin(e,t,n){let r=t-(e-1)/2,i=n-(e-1)/2;return[A+(r-.5)*Vt,zt+(i-.5)*Ht]}drawTile(t,n,r,i,a,o){let s=i+a&1;if(o>0&&(t.fillStyle=e.st0,t.fillRect(n-1,r+15,27,o+1),t.fillStyle=e.st1,t.fillRect(n,r+15,25,Math.min(2,o))),t.fillStyle=e.st2,t.fillRect(n,r,25,15),s){t.fillStyle=e.st3;for(let e=2;e<14;e+=2)for(let i=2+(e>>1&1);i<24;i+=2)t.fillRect(n+i,r+e,1,1)}t.fillStyle=e.st3,t.fillRect(n,r,25,1),t.fillRect(n,r,1,15),t.fillStyle=e.st4,t.fillRect(n,r,6,1),t.fillRect(n,r,1,3),t.fillStyle=e.st1,t.fillRect(n+1,r+14,24,1),t.fillRect(n+24,r+1,1,14);let c=i*7+a*13+5;if(P(c)<.6){t.fillStyle=e.st1;let i=n+4+Math.floor(P(c+1)*15),a=r+3+Math.floor(P(c+2)*8),o=3+Math.floor(P(c+3)*4);for(let e=0;e<o;e++)t.fillRect(i,a,1,1),i+=+(P(c+10+e)<.5),a+=1}}drawBackdrop(t,n,r){let i=`${t}:${n}:${r.join()}`;if(i===this.backdropKey)return;this.backdropKey=i;let a=this.backdrop.getContext(`2d`);a.fillStyle=e.void,a.fillRect(0,0,256,232);for(let t=0;t<90;t++){let n=Math.floor(P(t*3+1)*256),r=Math.floor(P(t*3+2)*232),i=P(t*3+3);a.fillStyle=e[i<.75?`dusk`:i<.95?`st0`:`st1`],a.fillRect(n,r,1,1),i>.97&&(a.fillRect(n-1,r,3,1),a.fillRect(n,r-1,1,3))}a.fillStyle=e.dusk;for(let e=197;e<232;e+=2)for(let t=(e>>1&1)*2;t<256;t+=4)P(t*31+e)<.5&&a.fillRect(t,e,1,1);let o=new Map;for(let e=-124,t=0;e<=Gt;t++){let n=5+Math.floor(P(t+300)*10),r=e+n/2,i=Math.max(0,1-(r/Gt)**2)*(6+P(t+400)*18);for(let t=0;t<n;t++){let r=Math.abs(t+.5-n/2)/(n/2);o.set(e+t,{h:Math.round(i*(1-r**1.4)),lit:t<n/2-1})}e+=n}for(let t=-124;t<=Gt;t++){let n=j+Math.round(Kt*Math.sqrt(Math.max(0,1-(t/Gt)**2))),r=A+t,i=qt,{h:s,lit:c}=o.get(t)??{h:0,lit:!1};a.fillStyle=e.st0,a.fillRect(r,n+1,1,i+s),c&&s>3&&(a.fillStyle=e.st1,a.fillRect(r,n+i+1,1,Math.max(1,s-4))),a.fillStyle=e.dusk,s>2&&a.fillRect(r,n+i+s-1,1,1),a.fillStyle=e.st1,a.fillRect(r,n+1,1,4),a.fillStyle=e.st2,a.fillRect(r,n+1,1,1),P(t+777)>.86&&(a.fillStyle=e.st0,a.fillRect(r,n+2,1,2+Math.floor(P(t+99)*4)))}this.fillEllipse(a,A,j,Gt,Kt,`st1`);for(let t=0;t<160;t++){let n=P(t*5+11)*Math.PI*2,r=Math.sqrt(P(t*5+12)),i=Math.round(A+Math.cos(n)*r*120),o=Math.round(j+Math.sin(n)*r*78),s=P(t*5+13);s<.45?(a.fillStyle=e.st0,a.fillRect(i,o,1,1),a.fillRect(i+1,o+ +(s<.2),1,1),s<.12&&a.fillRect(i+2,o+1,1,1)):s<.8?(a.fillStyle=e.st2,a.fillRect(i,o,1,1)):(a.fillStyle=e.st2,a.fillRect(i,o,2,1),a.fillStyle=e.st0,a.fillRect(i,o+1,2,1))}let s=$t(Gt,Kt);for(let t=0;t<s.length;t+=2)s[t+1]>0||(a.fillStyle=e[s[t+1]<-40.5?`st3`:`st2`],a.fillRect(A+s[t],j+s[t+1],1,1));a.fillStyle=e.st0,this.outline(a,A,j,78,Math.round(78*Wt),`st0`),a.fillStyle=e.st0;let c=(e,t,n,r)=>{for(let i=0;i<e;i++){let o=(i+t)/e*Math.PI*2;for(let e=n;e<=r;e++)a.fillRect(Math.round(A+Math.cos(o)*e),Math.round(j+Math.sin(o)*e*Wt),1,1)}};c(20,0,79,91),c(16,.5,62,77);let l=nn(78);a.fillStyle=e.st2;for(let e=0;e<tn;e+=9)l[e*2+1]>0&&a.fillRect(A+l[e*2],j+l[e*2+1]+1,2,1);for(let t=0;t<N.length;t++){let r=N[t],i=Math.round(r.aIn*Wt),o=Math.round(r.aOut*Wt);if(t<n){a.fillStyle=e.st0;for(let e=-o;e<=o;e++){let t=Math.round(r.aOut*Math.sqrt(Math.max(0,1-(e/o)**2))),n=Math.abs(e)<i?Math.round(r.aIn*Math.sqrt(Math.max(0,1-(e/i)**2))):-1;n<0?a.fillRect(A-t,j+e,t*2+1,1):(a.fillRect(A-t,j+e,t-n,1),a.fillRect(A+n+1,j+e,t-n,1))}}else{let t=nn(r.aOut);a.fillStyle=e.st2;for(let e=0;e<tn;e++)e%8<3&&a.fillRect(A+t[e*2],j+t[e*2+1],1,1)}}for(let e=0;e<Math.min(n,N.length);e++){let t=N[e],i=e+1<n&&r[e+1];this.outline(a,A,j,t.aIn,Math.round(t.aIn*Wt),r[e]||e>0&&r[e-1]?`groove`:`st2`),this.outline(a,A,j,t.aOut,Math.round(t.aOut*Wt),r[e]||i?`groove`:`st2`)}let u=(t-1)/2;for(let t=0;t<Ut;t++)for(let n=0;n<Ut;n++){if(Math.abs(n-2)<=u&&Math.abs(t-2)<=u)continue;let[r,i]=this.tileOrigin(Ut,n,t),o=i+Bt,s=n*17+t*29+3;a.fillStyle=e.st0;for(let e=2;e<14;e+=3)for(let t=2+e%2*3;t<24;t+=6)a.fillRect(r+t,o+e,1,1);a.fillStyle=e.st2,a.fillRect(r,o,3,1),a.fillRect(r,o,1,2),a.fillRect(r+22,o,3,1),a.fillRect(r+24,o,1,2),a.fillRect(r,o+14,3,1),a.fillRect(r,o+13,1,2),a.fillRect(r+22,o+14,3,1),a.fillRect(r+24,o+13,1,2);let c=1+Math.floor(P(s)*2.5);for(let t=0;t<c;t++){let n=r+4+Math.floor(P(s+t*3+1)*15),i=o+4+Math.floor(P(s+t*3+2)*7),c=2+Math.floor(P(s+t*3+3)*3);a.fillStyle=e.st0,a.fillRect(n,i+2,c,1),a.fillStyle=e.st2,a.fillRect(n,i,c,2),a.fillStyle=e.st3,a.fillRect(n,i,Math.max(1,c-2),1)}}let[d,f]=this.tileOrigin(t,0,0);a.fillStyle=e.st0,a.fillRect(d-1,f-1,t*Vt+1,t*Ht+Bt+1);for(let e=0;e<t;e++)for(let n=0;n<t;n++){let[r,i]=this.tileOrigin(t,n,e);this.drawTile(a,r,i,n,e,e===t-1?Bt:0)}if(t>=3)for(let e=0;e<t;e++){let[n,r]=this.tileOrigin(t,e,0);this.text(a,`${e}`,n+13,r-10,`st4`);let[i,o]=this.tileOrigin(t,0,e);this.text(a,`${e}`,i-6,o+5,`st4`)}let p=A,m=M;for(let t=-18;t<=18;t++){let n=m+Math.round(6*Math.sqrt(Math.max(0,1-(t/18)**2))),r=1-Math.abs(t)/18,i=Math.floor(r*11*(.5+.5*P(Math.floor((t+40)/3)+500)));a.fillStyle=e.st0,a.fillRect(p+t,n+1,1,4+i),a.fillStyle=e.st1,a.fillRect(p+t,n+1,1,2)}this.fillEllipse(a,p,m,18,6,`st2`);let h=$t(18,6);for(let t=0;t<h.length;t+=2)h[t+1]>=0||(a.fillStyle=e.st3,a.fillRect(p+h[t],m+h[t+1],1,1))}drawGrow(t){let n=this.g,r=t.size,i=(this.growFrom-1)/2,a=(r-1)/2;for(let t=0;t<r;t++)for(let o=0;o<r;o++){let s=o-a,c=t-a,l=Math.max(Math.abs(s),Math.abs(c))-i;if(l<=0)continue;let u=t*r+o,d=(l-1)*.16+P(u+900)*.12,f=this.growT-d,[p,m]=this.tileOrigin(r,o,t);if(f<0){Math.floor(this.clock*20)+u&1&&(n.fillStyle=e.lit,n.fillRect(p,m+Bt,3,1),n.fillRect(p+22,m+Bt+14,3,1),n.fillRect(p+22,m+Bt,3,1),n.fillRect(p,m+Bt+14,3,1));continue}let h=Math.min(1,f/.22),g=Math.round((1-h)*9-Math.sin(h*Math.PI)*2),_=t===r-1||Math.max(Math.abs(s),Math.abs(c+1))-i>l;this.drawTile(n,p,m+g,o,t,_?Math.max(1,Bt-g):0),h>=1&&!this.grown.has(u)&&(this.grown.add(u),this.debris(p+12,m+10,5,[`st3`,`st2`,`st4`],40,80))}}drawRunes(t,n,r){let i=N[n.ring],a=n.runes.length;if(!i||!a)return;let o=Math.min(a,i.max),s=t.chantIndex(n),c=t.silence>0,l=this.ringFlash[n.ring]>0&&this.ringTone[n.ring]===`ember`,d=nn(i.aRune),f=n.inscribing>0,p=f?Math.ceil(o*(1-n.inscribing/Math.max(.001,t.inscribeDelay))):o,m=this.g,h=this.knocks.filter(e=>e.spell===n.id),g=e=>h.find(t=>e>t.to&&e<=t.from);if(!r&&!f&&!c&&!l){let t=n.phase===`release`?1:Math.max(0,s)/a,r=Math.round(t*tn),o=nn(i.aIn+1),c=nn(i.aOut-1);m.fillStyle=e.lit;for(let e=0;e<r;e++)m.fillRect(A+o[e*2],j+o[e*2+1],1,1),m.fillRect(A+c[e*2],j+c[e*2+1],1,1)}for(let t=0;t<p;t++){let h=a<=i.max?t:Math.floor(t*a/o),_=Math.floor(t/o*tn),v=d[_*2],y=d[_*2+1];if(r!==y>=0)continue;let b=`st4`,x=0;if(f)t>=p-2&&(b=`hot`,x=2);else if(l)b=`ember`;else if(c)b=`st3`;else if(n.phase===`chant`&&h>s&&g(h)){let e=g(h);b=e.t<.3?Math.floor(e.t*20)&1?`ember`:`fire`:`ember`,x=e.t<.1?-1:0,e.sparked||this.debris(A+v,j+y,2,[`fire`,`ember`],25,50)}else n.phase===`release`||h<s?b=`lit`:h===s&&(b=`hot`,x=2);let S=A+v-2,ee=j+y-4-x;x>0&&(m.fillStyle=e.void,m.fillRect(S-1,j+y+1,7,3),m.fillStyle=e.hot,m.fillRect(S,j+y+2,5,1)),m.drawImage(this.runes[b][u(n.runes[h].kind)],S,ee),f&&t===p-1&&Math.random()<.5&&this.spark(A+v,j+y,3,1,Math.random()<.5?`hot`:`lit`,30,.25,-20)}}drawRingFlash(e){let t=this.g;for(let n=0;n<N.length;n++){if(this.ringFlash[n]<=0||n>=e.rings)continue;let r=this.ringTone[n],i=N[n],a=Math.round(i.aOut*Wt),o=Math.round(i.aIn*Wt);this.outline(t,A,j,i.aOut,a,r),this.outline(t,A,j,i.aOut+1,a+1,r),this.outline(t,A,j,i.aIn,o,r),this.outline(t,A,j,i.aIn-1,o-1,r)}}visAge(e){return e.age-(this.summonDelay.get(e.id)??0)}drawMobs(t,n){let r=this.g,i=t.cells.filter(Boolean).sort((e,t)=>e.cy-t.cy||e.cx-t.cx),a=(t.size-1)/2;this.seen.clear();for(let e of i)this.seen.set(cn(e.cx-a,e.cy-a),e.kind);r.fillStyle=e.st0;for(let e of i){let n=this.visAge(e);if(n<0)continue;let i=this.px(e.cx-a),o=this.feetY(e.cy-a),s=e.kind===2?16:e.kind===3?2+2*Math.max(1,t.wispStage(e)):12,c=n<.2?Math.round(n/.2*s):s;c<=2||(r.fillRect(i-(c-2>>1),o-1,c-2,1),r.fillRect(i-(c>>1),o,c,1),r.fillRect(i-(c-2>>1),o+1,c-2,1))}for(let o of i){let i=this.px(o.cx-a),s=this.feetY(o.cy-a),c=this.hits.get(o.id);c||this.hits.set(o.id,c={t:9,prev:0}),o.hurt>c.prev+1e-4&&(c.t=0),c.prev=o.hurt,c.t+=n;let l=this.visAge(o);if(l<0)continue;if(o.kind===3){this.drawWisp(t,o,i,s,l,c.t,n);continue}let u=o.kind===2,d=u?1.2:o.elem===1?5:o.elem===2?2.6:o.elem===0?1.6:2,f=Math.floor(this.clock*d+o.id*.37)&1,p=o.hp<2,m=o.windup>0?2:Math.min(2,o.charge),h=u?(p?this.mobs.beast.cracked:this.mobs.beast.normal)[m][f]:((p?this.mobs.cracked:this.mobs.normal)[o.elem]??this.mobs.normal[0])[f],g=u?this.mobs.beast.flash:this.mobs.flash[o.elem]??this.mobs.flash[0],_=h.width,v=h.height,y=i-(_>>1),b=s+1-v;if(l<.2){let t=Math.max(1,Math.round(v*l/.2));r.drawImage(h,0,0,_,t,y,s+1-t,_,t),r.fillStyle=e.st3,r.fillRect(y-1,s,2,1),r.fillRect(y+_-1,s,2,1),r.fillRect(y+2,s+1,1,1),r.fillRect(y+_-3,s+1,1,1)}else if(c.t<.12){let e=1-c.t/.12,t=Math.round(2+4*e),n=e>.5?_+6:_+3,a=Math.round(v*(e>.5?.69:.875));r.drawImage(g,i-(n>>1),s+1-a-t,n,a)}else if(c.t<.32){let e=(c.t-.12)/.2,t=Math.round(2*(1-e)),n=e<.5?2:0,i=y+ +(e<.5),a=b-t-n,s=_-(e<.5?2:0);this.drawAura(o,f,i,a,s,v+n),r.drawImage(h,i,a,s,v+n)}else if(o.windup>0){let e=(Math.floor(this.clock*12)+o.id)%3==0?g:h,t=this.rise(o),[n,i,a,s]=t>=0?[y+1,b-t-1,_-2,v+t]:[y-1,b-t,_+2,v+t];this.drawAura(o,f,n,i,a,s),r.drawImage(e,n,i,a,s)}else this.drawAura(o,f,y,b,_,v),r.drawImage(h,y,b)}if(this.hits.size>80||this.summonDelay.size>80||this.wanes.size>40){let e=new Set(i.map(e=>e.id));for(let t of this.hits.keys())e.has(t)||this.hits.delete(t);for(let t of this.summonDelay.keys())e.has(t)||this.summonDelay.delete(t);for(let t of this.wanes.keys())e.has(t)||this.wanes.delete(t)}}drawWisp(e,t,n,r,i,a,o){let s=this.g,c=Math.max(1,e.wispStage(t)),l=c,u=this.wanes.get(t.id);u!==void 0&&(this.wanes.set(t.id,u+o),u<.24&&c<3&&(l=Math.floor(u*25)&1?c+1:c));let d=Math.floor(this.clock*7+t.id*.61)%4,f=a<.12?this.mobs.wispFlash[l-1]:this.mobs.wisp[l-1][d],p=Math.floor(this.clock*2.2+t.id*.3)&1,m=f.width,h=f.height,g=n-(m>>1),_=r-2-p-h;if(i<.2){let e=Math.max(1,Math.round(h*i/.2));s.drawImage(f,0,h-e,m,e,g,_+h-e,m,e)}else(l!==1||(Math.floor(this.clock*12)+t.id)%9!=0)&&(s.drawImage(f,g,_),c>=2&&Math.random()<o*(c===3?6:2.5)&&this.spark(n+Math.round(Zt(-2,2)),r,2+p+h-2,1,c===3?`hot`:`lit`,6,.5,-16))}rise(e){if(e.windup<=0)return 0;let t=1-e.windup/Te;return t<.8?Math.min(3,Math.round(t*5)):-2}elemOf(e,t){for(let n of e.cells)if(n&&n.id===t)return n.elem;return 0}drawAura(e,t,n,r,i,a){if(e.kind!==2)return;let o=e.windup>0?3:Math.min(3,e.charge);if(o<=0)return;let s=Math.floor(this.clock*(o===3?14:8)+e.id*.53)%3,c=this.auras[o-1][t][s],l=this.mobs.beast.normal[0][0],u=i/l.width,d=a/l.height;this.g.drawImage(c,Math.round(n-3*u),Math.round(r-8*d),Math.round(c.width*u),Math.round(c.height*d))}diamond(t,n,r,i){let a=this.g;a.fillStyle=e[i];for(let e=-r;e<=r;e++){let i=r-Math.abs(e);a.fillRect(t-i,n+e,i*2+1,1)}}drawStrikes(t,n){let r=this.g;for(let i of t.strikes){let t=this.px(i.sx),a=this.feetY(i.sy),o=h(i.elem),s=_(i.elem),c=e=>{let n=Math.max(0,Math.min(1,e)),r=1-(1-n)**2;return[Math.round(t+(A-t)*r),Math.round(a+(M-a)*r),Math.round(9+13*n+104*n*(1-n))]},l=i.t/i.dur,[u,d,f]=c(l);if(n)((u-A)/Gt)**2+((d-j)/Kt)**2<1&&(r.fillStyle=e.st0,r.fillRect(u-1,d,3,1));else{for(let t=4;t>=1;t--){let[n,i,a]=c(l-t*.045),o=t<=2?2:1;r.fillStyle=e.void,r.fillRect(n-1,i-a-1,o+2,o+2),r.fillStyle=e[s],r.fillRect(n,i-a,o,o)}this.diamond(u,d-f,5,`void`),this.diamond(u,d-f,4,o),this.diamond(u,d-f,2,`void`)}}}drawCorpses(t){let n=this.g;this.corpses=this.corpses.filter(r=>{if(r.t+=t,r.t>.26)return!1;let i=r.kind===2;if(r.t<.07){let e=i?28:22,t=i?11:9;return n.drawImage(i?this.mobs.beast.flash:this.mobs.flash[r.elem]??this.mobs.flash[0],r.x-(e>>1),r.y+1-t,e,t),!0}let a=Math.round((i?5:4)+(r.t-.07)*(i?75:60)),o=r.t<.15?`hot`:i?`st4`:d(r.elem);n.fillStyle=e[o];let s=r.y-(i?9:7);n.fillRect(r.x-a,s,3,1),n.fillRect(r.x+a-2,s,3,1),n.fillRect(r.x,s-a,1,3),n.fillRect(r.x,s+a-2,1,2);let c=Math.round(a*.7);return n.fillRect(r.x-c,s-c,2,2),n.fillRect(r.x+c-1,s-c,2,2),n.fillRect(r.x-c,s+c-1,1,1),n.fillRect(r.x+c,s+c-1,1,1),!0}),this.poofs=this.poofs.filter(e=>{if(e.t+=t,e.t>an)return!1;if(Math.floor(e.t*50)&1)return!0;let r=e.t/an,i=this.mobs.ghost,a=Math.round(i.width*(1+r*.4)),o=Math.round(i.height*(1-r*.3));return n.drawImage(i,e.x-(a>>1),e.y+1-o-Math.round(r*5),a,o),!0}),this.fades=this.fades.filter(e=>{if(e.t+=t,e.t>.3)return!1;if(Math.floor(e.t*30)&1)return!0;let r=this.mobs.wisp[0][1];return n.drawImage(r,e.x-(r.width>>1),e.y-3-r.height-Math.round(e.t*24)),!0})}ditherEllipse(t,n,r,i,a,o){let s=this.g;s.fillStyle=e[a];for(let e=-i;e<=i;e++){let a=Math.round(r*Math.sqrt(Math.max(0,1-(e/i)**2)));for(let r=-a;r<=a;r++)r+e+o&1||s.fillRect(t+r,n+e,1,1)}}floorMark(t,n,r,i){let a=y[r]??y.none,o=this.g;o.fillStyle=e[i],a.forEach((e,r)=>{for(let i=0;i<e.length;i++)e[i]===`#`&&o.fillRect(t-2+i,n-1+r,1,1)})}drawFloor(t,n){let r=t.size,i=this.g,a=$t(11,6),o=$t(6,3);for(let n=0;n<t.sigils.length;n++){let s=t.sigils[n];if(!s)continue;let[c,l]=this.tileOrigin(r,n%r,Math.floor(n/r)),u=c+12,f=l+7,p=d(s.elem),m=se(s.elem),h=Math.max(0,Math.min(1,s.t/Math.max(.001,t.markTime))),g=s.t<1&&(Math.floor(this.clock*8)&1)==1;for(let t=0;t<a.length;t+=2){let n=a[t],r=a[t+1],o=Math.abs(Math.atan2(n/11,r/6))/Math.PI;i.fillStyle=e[o<=h&&!g?p:m],i.fillRect(u+n,f+r,1,1)}i.fillStyle=e[m];for(let e=0;e<o.length;e+=2)o[e]+o[e+1]&1&&i.fillRect(u+o[e],f+o[e+1],1,1);this.floorMark(u,f,ln(s.elem),g?m:p)}this.sigilFlashes=this.sigilFlashes.filter(e=>{if(e.t+=n,e.t>.16||e.size!==r)return!1;let[t,a]=this.tileOrigin(r,e.cx,e.cy);e.t<.06&&this.ditherEllipse(t+12,a+7,11,6,`hot`,0);let o=e.t<.08?0:1;return this.outline(i,t+12,a+7,11+o,6+o,`hot`),!0}),this.glyphs=this.glyphs.filter(t=>{if(t.t+=n,t.t>.5||t.size!==r)return!1;if(t.t<0)return!0;let[o,s]=this.tileOrigin(r,t.cx,t.cy),c=o+12,l=s+7;if(t.sparked||(t.sparked=!0,this.spark(c,l+3,1,6,t.tone,40,.35,-30),this.spark(c,l+3,1,3,`hot`,30,.25,-20)),t.t<on)return this.ditherEllipse(c,l,11,6,`hot`,0),this.outline(i,c,l,11,6,`hot`),!0;let u=(t.t-on)/.43;if(u<.55){this.outline(i,c,l,11,6,t.tone),this.outline(i,c,l,6,3,t.shade),this.floorMark(c,l,t.mark,t.tone);let n=Math.round(20*(1-u/.55));i.fillStyle=e[t.tone];for(let e=1;e<=n;e++)e+Math.floor(t.t*30)&1||(i.fillRect(c-11,l-e,1,1),i.fillRect(c+11,l-e,1,1))}else{i.fillStyle=e[t.shade];for(let e=0;e<a.length;e+=2)a[e]+a[e+1]&1||i.fillRect(c+a[e],l+a[e+1],1,1)}return!0})}drawResonance(t,n){if(!t.owned.has(`resonance`))return;let r=this.g;for(let i=0;i<Math.min(t.rings,N.length);i++){this.resShown[i]=Math.max(1,Math.min(this.resShown[i],t.multOf(i))),this.resFlash[i]=Math.max(0,this.resFlash[i]-n);let a=this.resShown[i],o=0;for(;o<sn.length&&a>=sn[o];)o++;let s=this.resFlash[i]>0;if(!o&&!s)continue;let c=N[i],l=(s?[`hot`,`hot`,`lit`,`groove`,`groove`].slice(0,Math.min(5,o+2)):[[],[`groove`],[`lit`,`groove`],[`lit`,`lit`,`groove`,`groove`],[`hot`,`lit`,`lit`,`groove`,`groove`]][o]).slice(0,i===0?5:3);if(l.forEach((t,n)=>{let a=nn(i===0?c.aIn-1-n:c.aOut+1+n);r.fillStyle=e[t];let o=!s&&n===l.length-1&&l.length>1;for(let e=0;e<tn;e++)o&&e%3==0||r.fillRect(A+a[e*2],j+a[e*2+1],1,1)}),o>=3){let t=o===3?3:6,n=nn(i===0?c.aIn-2:c.aOut+2);r.fillStyle=e.hot;for(let e=0;e<t;e++){let a=(Math.floor(this.clock*90)+Math.floor(e*tn/t)+i*37)%tn;r.fillRect(A+n[a*2]-1,j+n[a*2+1],2,1)}}}}arm(t,n,r,i,a){let o=this.g;o.fillStyle=e.void,rn(o,t-1,n-1,r-1,i-1,4),o.fillStyle=e[a],rn(o,t,n,r,i,2)}staff(t,n,r,i,a,o,s){let c=this.g;c.fillStyle=e.void,rn(c,t-1,n,r-1,i,3),c.fillStyle=e[a],rn(c,t,n,r,i,1),c.fillStyle=e.void,c.fillRect(r-2,i-2,5,5),c.fillStyle=e[o],c.fillRect(r-1,i-1,3,3),s&&(c.fillRect(r-3,i,7,1),c.fillRect(r,i-3,1,7)),this.tip={x:r,y:i}}drawMage(t){let n=this.g,r=t.silence>0,i=t.spells.filter(e=>e.running),a=i.some(e=>e.inscribing>0),o=!i.length,s=119,c=M-23,l=r?`heat`:a?`raise`:this.recoil>0?`thrust`:`chant`;r?s+=Math.floor(this.clock*24)&1:this.flinch>0&&(s+=(Math.floor(this.flinch*30)&1?1:-1)*(this.flinch>.15?2:1)),n.fillStyle=e.st0,n.fillRect(s-1,M,20,2),n.fillRect(s+2,209,14,1);let d=r||o?this.mageOff:this.mage,f=r||o?`st3`:`bone`,p=r?`st2`:`st4`,m=Math.floor(this.clock*16)&1?`hot`:`lit`,h=0,g=0,_=0,v=0;l===`thrust`?(h=1,g=2):l===`heat`?(v=2,g=4,_=-1):l===`chant`&&this.nod>0&&(g=1);let y=this.flinch>0&&!r;y&&(g=this.flinch>.15?-2:-1,_=Math.floor(this.flinch*30)&1?1:-1,h+=1);let b={x:s+Ee.x,y:c+Ee.y+h+v};l===`chant`?this.staff(s+19,M,s+19,c+1,p,o?`st3`:`lit`,!1):l===`thrust`?this.staff(s+16,c+21,s+22,c-5,p,`hot`,!0):l===`raise`?this.staff(s+19,c+12,s+19,c-9,p,m,m===`hot`):this.staff(s+15,M,s+23,c+5,p,`st3`,!1),n.drawImage(d,0,11,18,13,s,c+11+h+v,18,13-v),n.drawImage(d,0,0,18,11,s+_,c+g,18,11),l===`heat`&&(n.fillStyle=e.void,n.fillRect(s+_+1,c+g+2,4,3),n.fillStyle=e.st3,n.fillRect(s+_+2,c+g+3,2,1));let x;l===`chant`?x=[s+18,c+15+h]:l===`thrust`?x=[s+19,c+10]:l===`raise`?(x=[s+18,c+3],this.arm(s+4,c+13,s+1,c+5,f),n.fillStyle=e[f],n.fillRect(s,c+4,2,2)):x=[s+17,c+17+v],this.arm(b.x,b.y,x[0],x[1],f),n.fillStyle=e.void,n.fillRect(x[0]-2,x[1]-2,4,4),n.fillStyle=e[f],n.fillRect(x[0]-1,x[1]-1,2,2);let S=i.find(e=>e.inscribing<=0&&e.phase===`chant`);if(!r&&S&&!y){let e=S.runes[t.chantIndex(S)];e&&n.drawImage(this.bubble[u(e.kind)],s-9,c+7+g-+(this.nod>0))}r&&(this.text(n,t.silence.toFixed(1),A,c-12,`fire`),Math.random()<.35&&this.parts.push({x:s+6+Zt(-3,4),y:M,z:24-g-2,vx:Zt(-5,5),vy:0,vz:Zt(14,24),grav:0,life:.8,tone:Math.random()<.5?`st3`:`st2`,size:Math.random()<.4?2:1}))}drawBolts(t,n){let r=this.g;for(let i of t.bolts){let t=ae(i.elem),a=this.tip.x,o=M,s=M-this.tip.y,c=this.px(i.tx),l=this.feetY(i.ty),u=14+Math.hypot(c-a,l-o)*.12,d=e=>{let t=Math.max(0,Math.min(1,e)),n=a+(c-a)*t,r=o+(l-o)*t,i=s+(6-s)*t+4*u*t*(1-t);return[Math.round(n),Math.round(r),Math.round(i)]},f=i.t/i.dur,[p,m,h]=d(f);if(n)((p-A)/Gt)**2+((m-j)/Kt)**2<1&&(r.fillStyle=e.st0,r.fillRect(p-1,m,3,1));else{r.fillStyle=e[t];for(let[e,t]of[[.21,1],[.14,1],[.07,2]]){let[n,i,a]=d(f-e);r.fillRect(n,i-a,t,t)}r.fillStyle=e.void,r.fillRect(p-2,m-h-1,5,3),r.fillRect(p-1,m-h-2,3,5),r.fillStyle=e[t],r.fillRect(p-1,m-h-1,3,3),r.fillStyle=e.hot,r.fillRect(p,m-h,1,1)}}}draw(t,n){if(this.clock+=n,this.recoil=Math.max(0,this.recoil-n),this.nod=Math.max(0,this.nod-n),this.ringFlash[0]=Math.max(0,this.ringFlash[0]-n),this.ringFlash[1]=Math.max(0,this.ringFlash[1]-n),this.overflowT=Math.max(0,this.overflowT-n),this.flinch=Math.max(0,this.flinch-n),this.shake=Math.max(0,this.shake-n*30),(this.shownSize<0||t.size<this.shownSize)&&(this.shownSize=t.size),t.size>this.shownSize&&this.growT===0&&(this.growFrom=this.shownSize,this.growT=1e-4,this.grown.clear(),this.waves.push({x:A,y:j,a:20,speed:160,max:N[0].aIn,tone:`lit`}),this.shake=Math.max(this.shake,2)),this.growT>0&&(this.growT+=n,this.growT>.75&&(this.growT=0,this.shownSize=t.size)),this.shownRings>=0&&t.rings>this.shownRings){let e=nn(N[1].aRune);for(let t=0;t<tn;t+=24)this.spark(A+e[t*2],j+e[t*2+1],2,1,`lit`,20,.8,-25);this.waves.push({x:A,y:j,a:N[1].aIn,speed:40,max:N[1].aOut+4,tone:`hot`})}this.shownRings=t.rings;let r=this.g;r.setTransform(1,0,0,1,0,0),r.fillStyle=e.void,r.fillRect(0,0,256,232);let i=Math.round(this.shake);i>0&&r.translate(Math.round(Zt(-1,1)*i),Math.round(Zt(-1,1)*i));let a=[0,1].map(e=>t.spells.some(t=>t.running&&t.ring===e));this.drawBackdrop(this.shownSize,t.rings,a),r.drawImage(this.backdrop,0,0),this.drawFloaters(),this.growT>0&&this.drawGrow(t);let o=t.size;if(this.flashes=this.flashes.filter(t=>{if(t.t+=n,t.t>.34||t.cx>=o||t.cy>=o)return!1;let[i,a]=this.tileOrigin(o,t.cx,t.cy);if(t.t<.05)r.fillStyle=e.hot,r.fillRect(i,a,25,15);else if(t.t<.14){r.fillStyle=e.fire,r.fillRect(i,a,25,15),r.fillStyle=e.hot;for(let e=1;e<15;e+=2)for(let t=e>>1&1;t<25;t+=2)r.fillRect(i+t,a+e,1,1)}else{let n=t.t<.22?2:4;r.fillStyle=e.ember;for(let e=1;e<15;e+=n)for(let t=(e>>1&1)*(n>>1);t<25;t+=n)r.fillRect(i+t,a+e,1,1)}return!0}),this.overflowT>.3){let[t,n]=this.tileOrigin(o,0,0);r.fillStyle=e.ember;let i=this.overflowT>.45?2:4;for(let e=n;e<n+o*Ht;e+=i)for(let n=t+(e>>1&1)*(i>>1);n<t+o*Vt;n+=i)r.fillRect(n,e,1,1)}this.drawFloor(t,n),this.drawResonance(t,n),this.drawRingFlash(t);for(let e of t.spells)e.running&&this.drawRunes(t,e,!1);this.waves=this.waves.filter(t=>{if(t.a+=t.speed*n,t.a>=t.max)return!1;let i=Math.round(t.a),a=$t(i,Math.max(1,Math.round(i*Wt))),o=t.a>t.max*.6;r.fillStyle=e[t.tone];for(let e=0;e<a.length;e+=2)o&&a[e]+a[e+1]&1||r.fillRect(t.x+a[e],t.y+a[e+1],1,1);return!0}),this.links=this.links.filter(t=>{if(t.life-=n,t.life<=0)return!1;let i=t.x1,a=t.y1-1,o=-(t.y2-t.y1),s=t.x2-t.x1,c=Math.hypot(o,s)||1;for(let n=1;n<=5;n++){let l=n/5,u=n===5?0:Zt(-3,3),d=t.x1+(t.x2-t.x1)*l+o/c*u,f=t.y1-1+(t.y2-t.y1)*l+s/c*u*Wt;r.fillStyle=e[t.tone],rn(r,i,a+1,d,f+1),r.fillStyle=e[t.life>.1?`hot`:t.tone],rn(r,i,a,d,f),i=d,a=f}return!0}),this.drawBolts(t,!0),this.drawStrikes(t,!0),this.drawMobs(t,n),this.drawCorpses(n);for(let t of this.flashes){if(!t.center||t.t>=.12)continue;let[n,i]=this.tileOrigin(o,t.cx,t.cy),a=Math.round(44*(1-t.t/.12));r.fillStyle=e.void,r.fillRect(n+8,i+10-a,9,a),r.fillStyle=e.fire,r.fillRect(n+9,i+10-a,7,a),r.fillStyle=e.hot,r.fillRect(n+11,i+10-a,3,a),r.fillRect(n+6,i+9,13,2)}for(let e of t.spells)e.running&&this.drawRunes(t,e,!0);this.knocks=this.knocks.filter(e=>(e.sparked=!0,e.t+=n,e.t<fn)),this.drawBolts(t,!1),this.drawStrikes(t,!1),this.parts=this.parts.filter(t=>{if(t.life-=n,t.life<=0)return!1;if(t.grav)t.vz-=t.grav*n,t.z+=t.vz*n,t.z<=0&&(t.z=0,t.vz=Math.abs(t.vz)>30?-t.vz*.35:0,t.vx*=.6,t.vy*=.6);else{let e=Math.exp(-4*n);t.vx*=e,t.vy*=e,t.vz*=e,t.z+=t.vz*n}t.x+=t.vx*n,t.y+=t.vy*n;let i=Math.round(t.x),a=Math.round(t.y-t.z);return t.grav&&t.z>2&&(r.fillStyle=e.st0,r.fillRect(i,Math.round(t.y),t.size,1)),r.fillStyle=e[t.tone],r.fillRect(i,a,t.size,t.size),!0}),this.drawMage(t),this.shards=this.shards.filter(t=>{if(t.t+=n,t.t<0)return!0;let i=t.t/t.dur;if(i>=1)return!1;let a=i*i,o=Math.round(t.x0+(t.x1-t.x0)*a),s=Math.round(t.y0+(t.y1-t.y0)*a-Math.sin(i*Math.PI)*16);return r.fillStyle=e[t.fill===`void`?`hot`:`void`],r.fillRect(o,s-2,1,5),r.fillRect(o-2,s,5,1),r.fillRect(o-1,s-1,3,3),r.fillStyle=e[t.fill],r.fillRect(o,s-1,1,3),r.fillRect(o-1,s,3,1),!0}),this.pops=this.pops.filter(e=>(e.life-=n,e.life<=0?!1:(e.y-=16*n,this.text(r,e.text,e.x,e.y,e.tone,e.scale),!0)))}drawFloaters(){let t=this.g;for(let[n,r,i,a]of[[22,204,7,0],[232,198,5,1.3],[64,222,4,2.1],[204,224,6,.7],[14,30,4,1.7],[240,40,5,2.6]]){let o=r+(Math.floor(this.clock*.9+a)&1);t.fillStyle=e.st0,t.fillRect(n,o+1,i,2),t.fillRect(n+1,o+3,Math.max(1,i-3),1),t.fillStyle=e.st1,t.fillRect(n,o,i,1),t.fillStyle=e.st2,t.fillRect(n+1,o,Math.max(1,i-3),1)}}},mn={tree:[`............`,`...######...`,`.##gggggg##.`,`#gggggggggg#`,`#ggggggg#gg#`,`#gg#ggggggg#`,`.##gggggg##.`,`...##..##...`,`.....##.....`,`.....##.....`,`...######...`,`............`],book:[`............`,`.####..####.`,`#....##....#`,`#.mm.##.mm.#`,`#....##....#`,`#.mm.##.mm.#`,`#....##....#`,`#.mm.##.mm.#`,`#....##....#`,`.####..####.`,`.....##.....`,`............`],chart:[`............`,`#...........`,`#........##.`,`#........##.`,`#.....##.##.`,`#.....##.##.`,`#..##.##.##.`,`#..##.##.##.`,`#..##.##.##.`,`#..##.##.##.`,`###########.`,`............`],scroll:[`............`,`.##########.`,`#..........#`,`.##########.`,`.#........#.`,`.#.mmmmmm.#.`,`.#........#.`,`.#.mmmm...#.`,`.#........#.`,`.##########.`,`#..........#`,`.##########.`],plus:[`............`,`............`,`.....##.....`,`.....##.....`,`.....##.....`,`..########..`,`..########..`,`.....##.....`,`.....##.....`,`.....##.....`,`............`,`............`],tidy:[`............`,`#####..#####`,`#####..#####`,`#...#..#...#`,`#####..#####`,`............`,`............`,`#####..#####`,`#####..#####`,`#...#..#...#`,`#####..#####`,`............`],sound:[`............`,`....#.......`,`...##...#...`,`..###....#..`,`#####.#...#.`,`#####..#..#.`,`#####..#..#.`,`#####.#...#.`,`..###....#..`,`...##...#...`,`....#.......`,`............`],mute:[`............`,`....#.......`,`...##.......`,`..###.......`,`#####.r...r.`,`#####..r.r..`,`#####...r...`,`#####..r.r..`,`..###.r...r.`,`...##.......`,`....#.......`,`............`],reset:[`............`,`............`,`.##....#...#`,`.##...##..##`,`.##..###.###`,`.##.########`,`.##.########`,`.##..###.###`,`.##...##..##`,`.##....#...#`,`............`,`............`],close:[`............`,`............`,`..##....##..`,`..###..###..`,`...######...`,`....####....`,`....####....`,`...######...`,`..###..###..`,`..##....##..`,`............`,`............`],foldUp:[`............`,`............`,`............`,`.....##.....`,`....####....`,`...######...`,`..########..`,`.##########.`,`............`,`............`,`............`,`............`],foldDown:[`............`,`............`,`............`,`............`,`.##########.`,`..########..`,`...######...`,`....####....`,`.....##.....`,`............`,`............`,`............`],stop:[`............`,`............`,`............`,`...######...`,`...######...`,`...######...`,`...######...`,`...######...`,`...######...`,`............`,`............`,`............`],trash:[`............`,`....####....`,`.##########.`,`............`,`..########..`,`..#.#..#.#..`,`..#.#..#.#..`,`..#.#..#.#..`,`..#.#..#.#..`,`..#.#..#.#..`,`...######...`,`............`],ringIn:[`....mmmm....`,`..mm....mm..`,`.m........m.`,`.m..tttt..m.`,`m..tttttt..m`,`m..tttttt..m`,`m..tttttt..m`,`m..tttttt..m`,`.m..tttt..m.`,`.m........m.`,`..mm....mm..`,`....mmmm....`],ringOut:[`....tttt....`,`..tttttttt..`,`.ttt....ttt.`,`.tt......tt.`,`tt........tt`,`tt...mm...tt`,`tt...mm...tt`,`tt........tt`,`.tt......tt.`,`.ttt....ttt.`,`..tttttttt..`,`....tttt....`],ringOff:[`....mmmm....`,`..mm....mm..`,`.m........m.`,`.m........m.`,`m...####...m`,`m...####...m`,`m...####...m`,`m...####...m`,`.m........m.`,`.m........m.`,`..mm....mm..`,`....mmmm....`],lock:[`............`,`....####....`,`...#....#...`,`...#....#...`,`...#....#...`,`..########..`,`..########..`,`..###..###..`,`..###..###..`,`..########..`,`..########..`,`............`],lockOpen:[`....####....`,`...#....#...`,`...#....#...`,`...#........`,`...#........`,`..########..`,`..#rrrrrr#..`,`..#rr##rr#..`,`..#rr##rr#..`,`..#rrrrrr#..`,`..########..`,`............`],check:[`............`,`............`,`..........##`,`.........###`,`........###.`,`.##....###..`,`.###..###...`,`..######....`,`...####.....`,`....##......`,`............`,`............`],goal:[`............`,`..##........`,`..#t##......`,`..#ttt##....`,`..#ttttt##..`,`..#ttttttt##`,`..#ttttt##..`,`..#ttt##....`,`..#t##......`,`..##........`,`..#.........`,`.###........`],trBeast:[`.#........#.`,`#m#......#m#`,`#m#......#m#`,`.#m#....#m#.`,`..#m####m#..`,`.#pppppppp#.`,`#pp#pppp#pp#`,`#pppppppppp#`,`#ppp#mm#ppp#`,`#ppp#mm#ppp#`,`.#pp####pp#.`,`..##....##..`],trTool:[`.##..##.....`,`#mm#.#m#....`,`#mm###m#....`,`.#mmmmm#....`,`..##mmm##...`,`....#mmm#...`,`.....#mmm#..`,`......#mmm#.`,`.......#mmm#`,`........#mm#`,`.........##.`,`............`],trGrid:[`............`,`.###.###.###`,`.###.###.###`,`.###.###.###`,`............`,`.###.#r#.###`,`.###.rrr.###`,`.###.#r#.###`,`............`,`.###.###.###`,`.###.###.###`,`.###.###.###`],trWord:[`............`,`.##########.`,`#..........#`,`#.mmmmmmm..#`,`#..........#`,`#.mmmmm....#`,`#..........#`,`.##.#######.`,`..#.#.......`,`..##........`,`..#.........`,`............`],trTempo:[`............`,`............`,`.##...##....`,`..##...##...`,`...##...##..`,`....##...##.`,`....##...##.`,`...##...##..`,`..##...##...`,`.##...##....`,`............`,`............`],trSpring:[`.....##.....`,`....#tt#....`,`....#tt#....`,`...#tttt#...`,`..#tttttt#..`,`.#tttttttt#.`,`.#tttttttt#.`,`.#tptttttt#.`,`.#tptttttt#.`,`..#tptttt#..`,`...######...`,`............`]},hn={"#":`ink`,m:`mid`,r:`red`,t:`teal`,g:`green`,p:`paper`},gn={n:e=>e,i:e=>e===`ink`?`paper`:e===`paper`?`ink`:e,d:e=>e===`paper`?`paper`:`mid`};function _n(e,t){let n=document.createElement(`canvas`);n.width=e[0].length,n.height=e.length;let r=n.getContext(`2d`);return e.forEach((e,n)=>{for(let i=0;i<e.length;i++){let a=hn[e[i]];a&&(r.fillStyle=we[gn[t](a)],r.fillRect(i,n,1,1))}}),n.toDataURL()}var vn=!1;function yn(){if(vn)return;vn=!0;let e=``;for(let[t,n]of Object.entries(mn))e+=`.i-${t}{--n:url(${_n(n,`n`)});--i:url(${_n(n,`i`)});--d:url(${_n(n,`d`)})}\n`;let t=document.createElement(`style`);t.id=`icons`,t.textContent=e,document.head.appendChild(t)}function bn(e,t=``){let n=document.createElement(`i`);return n.className=`ic i-${e}${t?` ${t}`:``}`,n.setAttribute(`aria-hidden`,`true`),n}Object.keys(mn);var xn=e=>{let t=E.find(t=>t.id===e);if(!t)throw Error(`없는 봉인: ${e}`);return t};function Sn(e=``){let t=new Set,n=e=>{if(!t.has(e)&&E.some(t=>t.id===e)){t.add(e);for(let t of xn(e).req??[])n(t)}};for(let t of e.split(` `).filter(Boolean))n(t);return t}function Cn(e){let t={res:{ess:0,fire:0,water:0,nature:0,zeal:0,glow:0},best:0,bestMult:1,owned:new Set,spells:[]},n=k[e]?.progress?.(t);if(!n)throw Error(`진행 막대 없는 목표: ${e}`);return n[1]}var wn=e=>k.flatMap((t,n)=>t.page===e?[n]:[]),Tn=_t,F=e=>String(Number(e.toFixed(3))),En=e=>`${Math.round(e*100)}%`,Dn=e=>e.replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]),I=e=>rt(Pe(e)),On=We[0],kn=(e,t=On)=>S(I(e),t).toFixed(2),An=e=>1/(1-c**+(e+5)),jn=e=>`×${An(e).toFixed(2)}`,L=e=>`<code>${Dn(e)}</code>`,R=e=>`<samp>${Dn(e)}</samp>`,z=(e,t=``)=>`<a data-page="${e}">${t}</a>`,B=e=>`‘${xn(e).title}’`,Mn=(e,t)=>{let n=`‘${C(e)}’`;return t?ke(n,t):n};function Nn(e){let t=xn(e).cost,n=[];return t.ess&&n.push(`정수 {ess} ${t.ess}개`),t.fire&&t.fire===t.water&&t.fire===t.nature?n.push(`세 원소 정수 ${t.fire}개씩`):t.fire&&n.push(`불의 정수 {gfire} ${t.fire}개`),t.zeal&&n.push(`기세의 정수 {gzeal} ${t.zeal}개`),t.glow&&n.push(`도깨비불의 정수 {gglow} ${t.glow}개`),n.join(`, `)}var V=(e,t)=>`<pre class="try" data-runes="${I(e)}"${t===void 0?``:` data-need="${t}"`}>${Dn(e)}</pre>`,H=(...e)=>`<pre class="sig">${e.map(Dn).join(`
`)}</pre>`,U=e=>`<table class="code"><tr><th>코드</th><th>뜻</th></tr>${e.map(([e,t])=>`<tr><td><code>${Dn(e)}</code></td><td>${t}</td></tr>`).join(``)}</table>`,W=(e,t)=>`<table><tr>${e.map(e=>`<th>${e}</th>`).join(``)}</tr>${t.map(e=>Array.isArray(e)?`<tr>${e.map(e=>`<td>${e}</td>`).join(``)}</tr>`:`<tr data-need="${e.need}">${e.cells.map(e=>`<td>${e}</td>`).join(``)}</tr>`).join(``)}</table>`,G=e=>`<ul>${e.map(e=>typeof e==`string`?`<li>${e}</li>`:`<li data-need="${e[1]}">${e[0]}</li>`).join(``)}</ul>`,K=(...e)=>`<p class="links">${e.map(e=>z(e)).join(``)}</p>`,q=e=>`<table class="spec"><tr><th>인자</th><td>${e.arg}</td></tr><tr><th>돌려주는 값</th><td>${e.ret}</td></tr><tr><th>마나</th><td>${e.mana}</td></tr><tr><th>필요한 봉인</th><td>${e.need}</td></tr></table>`,Pn=e=>{let t=xn(e);return`<table class="spec"><tr><th>풀리는 것</th><td>${t.gives.map(e=>L(e)).join(` `)}</td></tr><tr><th>값</th><td>${Nn(e)}</td></tr><tr><th>먼저 풀 봉인</th><td>${(t.req??[]).map(B).join(`, `)||`없음`}</td></tr><tr><th>갈래</th><td>${ct[t.row]}</td></tr></table>`},J=`룬 실행 비용만 듭니다.`;function Fn(e){return`<ul class="goals">${wn(e).map(e=>`<li data-goal="${e}"><span class="gn">목표 ${e+1}</span>${Dn(k[e].text)}</li>`).join(``)}</ul>`}function In(e){let t=Math.max(...wn(e));return t+1<k.length?`목표 줄이 다음 목표로 넘어갑니다. 번호는 ${R(C(`goal.count`,t+2,k.length))}입니다.`:`목표 줄에 모든 목표를 이뤘다는 글이 나옵니다.`}var Ln=e=>`<ol class="steps">${e.map(([e,t])=>`<li>${e}${t?`<span class="see">${t}</span>`:``}</li>`).join(``)}</ol>`,Rn=e=>`봉인의 나무에서 ${B(e)} 봉인을 푸세요. 값은 ${Nn(e)}입니다.`,zn=(e,t=On)=>`${C(`state.same`)} · ${C(`state.same.rest`,I(e),kn(e,t))}`,Bn=C(`state.broken`),Vn=new Pt,Hn=`[오류 예시 확인 필요]`;function Y(e,t=``){Vn.owned=Sn(t);let n=Vn.compile(e);return n.ok?R(Hn):R(`${Bn} · ${n.line>0?`${C(`state.line`,n.line)} · `:``}${n.message}`)}var Un={castArg:{code:`cast(1)`,need:``,mobs:`one`,line:1,message:C(`api.cast.mob`)},castMany:{code:`cast(summon(1, 1, SPRITE), WATER, 1)`,need:`sprite`,mobs:`full`,line:1,message:C(`api.cast.args`)},castCap:{code:`for i in range(33):
    cast()`,need:`mana2`,mobs:`full`,line:2,message:C(`api.cast.cap`,32)},boomOut:{code:`boom(3, 1)`,need:`boom`,mobs:`full`,line:1,message:C(`api.boom.range`,2)},boomOut5:{code:`boom(5, 2)`,need:`grid5`,mobs:`full`,line:1,message:C(`api.boom.range`,4)},boomArgs:{code:`boom(1)`,need:`boom`,mobs:`full`,line:1,message:C(`api.boom.args`)},lower:{code:`cast(summon(1, 1, SPRITE), water)`,need:`sprite`,mobs:`full`,line:1,message:C(`run.undefined`,`water`)},summonOut:{code:`summon(3, 1, SPRITE)`,need:`sprite`,mobs:`full`,line:1,message:C(`api.summon.range`,2)},summonArgs:{code:`summon(1, 1)`,need:`sprite`,mobs:`full`,line:1,message:C(`api.summon.args`)},summonImp:{code:`summon(1, 1, IMP)`,need:`sprite`,mobs:`full`,line:1,message:C(`api.summon.imp`)},summonKind:{code:`summon(1, 1, 7)`,need:`sprite`,mobs:`full`,line:1,message:C(`api.summon.kind`)},summonSealed:{code:`summon(1, 1, 2)`,need:`sprite`,mobs:`full`,line:1,message:C(`api.summon.sealed`,C(`kind.beast`),xn(`beast`).title)},summonCap:{code:`for i in range(26):
    summon(0, 0, SPRITE)`,need:`mana2`,mobs:`full`,line:2,message:C(`api.summon.cap`,25)},none:{code:`m = summon(1, 1, SPRITE)
print(m.elem)`,need:`read`,mobs:`none`,line:2,message:C(`run.noAttr`,`None`,`elem`),later:!0},attr:{code:`m = summon(1, 1, SPRITE)
print(m.element)`,need:`read`,mobs:`full`,line:2,message:C(`run.noField`,C(`obj.mob`),`element`,`x, y, hp, kind, elem, charge`)},meAttr:{code:`print(me.hp)`,need:`read`,mobs:`full`,line:1,message:C(`run.noField`,C(`obj.me`),`hp`,`mana`)},before:{code:`cast(m, WATER)
m = summon(1, 1, SPRITE)`,need:`assign`,mobs:`full`,line:1,message:C(`run.undefined`,`m`)},half:{code:`boom(3 / 2, 1)`,need:`math`,mobs:`full`,line:1,message:C(`run.needInt`,`1.5`)},zero:{code:`n = 0
boom(1 // n, 1)`,need:`math`,mobs:`full`,line:2,message:C(`run.divZero`)},forNum:{code:`for x in 3:
    boom(x, 1)`,need:`for`,mobs:`full`,line:1,message:C(`run.notIterable`,C(`type.number`))},rangeZero:{code:`for x in range(0, 3, 0):
    boom(x, 1)`,need:`for`,mobs:`full`,line:1,message:C(`run.rangeStep`)},empty:{code:`cast(scan()[0], NATURE)`,need:`scan`,mobs:`none`,line:1,message:C(`run.indexRange`,`0`,0)},index1:{code:`cast(scan()[1], FIRE)`,need:`scan`,mobs:`one`,line:1,message:C(`run.indexRange`,`1`,1)},markElem:{code:`mark(1, 1, 0)`,need:`mark`,mobs:`full`,line:1,message:C(`api.mark.elem`)},markOut:{code:`mark(3, 1, FIRE)`,need:`mark`,mobs:`full`,line:1,message:C(`api.mark.range`,2)},sliceZero:{code:`for m in scan()[::0]:
    cast(m)`,need:`slice`,mobs:`full`,line:1,message:C(`run.sliceStep`)},minMob:{code:`m = min(scan())
cast(m)`,need:`tools`,mobs:`full`,line:1,message:C(`run.needNumber`,C(`obj.mob`))},missing:{code:`def hit(m):
    cast(m)
hit()`,need:`def`,mobs:`full`,line:3,message:C(`run.missingArg`,`hit`,`m`)},unpack:{code:`x, y = (1, 2, 3)`,need:`list`,mobs:`full`,line:1,message:C(`run.unpack`,3,2)},popEmpty:{code:`a = []
print(a.pop())`,need:`list`,mobs:`full`,line:2,message:C(`run.popEmpty`)},dictKey:{code:`d = {1: 2}
print(d[5])`,need:`dict scan`,mobs:`full`,line:2,message:C(`run.dictKey`,`5`)},sortMob:{code:`print(sorted(scan()))`,need:`kit scan`,mobs:`full`,line:1,message:C(`run.needNumber`,C(`obj.mob`))},intStr:{code:`print(int("a"))`,need:`kit`,mobs:`full`,line:1,message:C(`run.toInt`,`'a'`)},reduceEmpty:{code:`print(reduce(xor, []))`,need:`kit`,mobs:`full`,line:1,message:C(`run.reduceEmpty`)}},X=e=>R(C(`spell.fizzled`,Un[e].line,Un[e].message)),Wn=C(`world.ringsFull`),Gn=[{v:1,name:`불`,code:`FIRE`,mob:`{fire}`,gem:`{gfire}`},{v:2,name:`물`,code:`WATER`,mob:`{water}`,gem:`{gwater}`},{v:3,name:`자연`,code:`NATURE`,mob:`{nature}`,gem:`{gnature}`}],Kn=e=>{let t=Gn.find(t=>t.v===e);if(!t)throw Error(`없는 원소: ${e}`);return t},qn=e=>Kn(v(e)),Z=`cast()`,Jn=`cast()
cast()`,Yn=`boom(1, 1)`,Xn=`cast(summon(1, 1, SPRITE), WATER)`,Zn=`m = summon(1, 1, SPRITE)
cast(m, WATER)
cast(m, WATER)`,Qn=`m = summon(1, 1, SPRITE)
print(m.elem)`,$n=`m = summon(1, 1, SPRITE)
if m.elem == FIRE:
    cast(m, WATER)`,er=`m = summon(1, 1, BEAST)
cast(m)
cast(m)`,tr=`m = summon(1, 1, BEAST)
if m.charge > 0:
    cast(m)
    cast(m)`,nr=`for x in range(3):
    cast(summon(x, 1, SPRITE), WATER)`,rr=`for x in range(3):
    m = summon(x, 1, SPRITE)
    if m:
        print(m.elem)`,ir=`for m in scan():
    cast(m)`,ar=`for m in scan():
    if m.kind == IMP:
        cast(m)`,or=`cast(summon(1, 1, WISP))`,sr=`mark(1, 1, FIRE)
cast(summon(1, 1, SPRITE), WATER)`,cr=(e,t,n,r)=>({id:e,group:`walk`,title:t,need:n,html:r}),Q=(e,t,n,r)=>({id:e,group:`idea`,title:t,need:n,html:r}),$=(e,t,n,r)=>({id:e,group:`dict`,title:t,need:n,html:r}),lr=e=>`새긴 뒤 첫 발동에는 상태 줄에 ${R(C(`state.calling`))}이 보입니다 (과열이 끝난 뒤의 첫 발동도 같습니다). 오류가 아닙니다. 그 칸에 부른 마물이 아직 없어서 ${L(`summon`)}이 None을 돌려주었습니다. 부름은 이루어지므로 다음 발동부터 값이 있습니다.<br>그 뒤의 발동에서 ${R(C(`spell.fizzled`,2,C(`run.noAttr`,`None`,e)))}가 뜨면, 그 사이에 그 칸의 부른 마물이 사라진 것입니다 (다른 주문이나 폭발이 잡았거나, 도깨비불이 흩어졌습니다).`,ur=lr(`elem`),dr=(e,t)=>ke(String(e),t),fr=[cr(`go-start`,`첫 주문과 첫 봉인`,void 0,`
<h3>목표</h3>
${Fn(`go-start`)}
<h3>할 일</h3>
${Ln([[`‘주문 1’ 창을 보세요.`,`글상자에 ${L(Z)}가 적혀 있습니다. 이 글은 이미 새겨져 돌고 있습니다. 창 제목 줄의 표시가 ${R(C(`phase.chant`,1,I(Z)))}, ${R(C(`phase.chant`,2,I(Z)))}, ${R(C(`phase.chant`,3,I(Z)))}, ${R(C(`phase.release`))} 차례로 바뀝니다.`],[`가운데 결계를 보세요.`,`발동할 때마다 잡귀 {blob}에게 마법탄이 한 발 날아갑니다. 잡귀는 2발을 맞으면 사라집니다. 그때 위쪽 표시줄의 정수 {ess} 숫자가 1 오릅니다.`],[`결계 아래의 마나 막대를 보세요.`,`발동할 때마다 마나가 3 줄고 곧 다시 찹니다. 지금 주문은 마나가 모자라지 않습니다.`],[`정수가 ${Cn(0)}개 모일 때까지 기다리세요.`,`목표 줄의 막대가 끝까지 차고 다음 목표가 나옵니다.`],[`${Mn(`menu.tree`,`을/를`)} 누르세요. T 키를 눌러도 됩니다.`,`${C(`tree.title`)} 화면이 열립니다. ${B(`grid3`)} 칸에 ‘${C(`tree.buy`)}’ 단추가 있습니다.`],[`${B(`grid3`)} 칸의 ‘${C(`tree.buy`)}’를 누르세요.`,`값만큼 정수가 빠지고 칸에 ‘${C(`tree.state.owned`)}’이 적힙니다. 값은 ${Nn(`grid3`)}입니다.`],[`${Mn(`tree.close.label`,`을/를`)} 누르거나 Esc 키를 누르세요.`,`결계 화면으로 돌아옵니다.`]])}
<h3>확인</h3>
${G([`결계가 가로 3칸, 세로 3칸이 됩니다.`,`위쪽 표시줄에 ‘초당’과 ‘최고’가 나타납니다.`,In(`go-start`)])}
<h3>막히면</h3>
${G([`‘${C(`tree.buy`)}’ 단추가 없습니다. 정수가 모자랍니다. 모자란 값은 칸 아래에 붉게 적힙니다.`,`주문 창이 보이지 않습니다. 위쪽 표시줄의 주문 목록에서 그 주문을 누르면 창이 열립니다. ${Mn(`menu.tidy`)} 단추는 모든 창을 처음 자리로 돌려놓습니다.`])}
<h3>더 읽기</h3>
${K(`cycle`,`runes`,`mobs`,`mana`,`cast`,`tree`)}`),cr(`go-boom`,`폭발로 바꾸기`,`boom`,`
<h3>목표</h3>
${Fn(`go-boom`)}
<h3>할 일</h3>
<p>먼저 글을 고치고 새기는 법을 익힙니다.</p>
${Ln([[`글상자를 누르고 ${L(Z)} 다음 줄에 ${L(Z)}를 하나 더 쓰세요.`,`상태 줄이 ${R(C(`state.draft`))}으로 바뀝니다. 새기면 룬이 몇 개가 되고 한 바퀴가 몇 초가 되는지 함께 나옵니다. 결계에서는 아직 예전 글이 돕니다.`],[`인장(각인)을 누르세요. Ctrl + Enter를 눌러도 됩니다.`,`상태 줄이 ${R(zn(Jn))}로 바뀝니다. 빠른 혀를 풀었다면 한 바퀴는 더 짧습니다.`],[`성적이 나올 때까지 기다리세요.`,`인장 옆의 ${Mn(`stat.now`,`이/가`)} ‘${C(`stat.measuring.label`)}’에서 초당 숫자로 바뀝니다. 앞서 돌던 글의 성적은 ‘${C(`stat.prev.label`)}’에 남습니다. 둘을 비교하는 법은 ${z(`stats`)} 쪽에 있습니다.`],[`정수가 ${Cn(2)}개 모이면 봉인의 나무에서 ${B(`boom`)} 봉인을 푸세요.`,`안내서의 사전에 boom 쪽이 생깁니다.`],[`아래 예제의 ‘${C(`docs.copy`)}’를 누르세요.${V(Yn,`boom`)}`,`글상자의 글이 예제로 바뀝니다. 아직 초안입니다.`],[`인장(각인)을 누르세요.`,`발동할 때마다 결계 가운데 칸과 그 위·아래·왼쪽·오른쪽 칸이 함께 터집니다.`],[`위쪽 표시줄의 ‘최고’를 지켜보세요.`,`‘최고’가 ${Cn(4)} 이상이 되면 목표를 이룹니다.`]])}
<h3>확인</h3>
${G([`상태 줄이 ${R(C(`state.same`))}이고 룬 수가 ${I(Yn)}입니다.`,In(`go-boom`)])}
<h3>막히면</h3>
${G([`${Y(Yn,`grid3`)}<br>${B(`boom`)} 봉인을 아직 풀지 않았습니다.`,`${X(`boomOut`)}<br>3×3 결계의 좌표는 0, 1, 2뿐입니다.`,`‘최고’가 ${Cn(4)}에 못 미칩니다. 글을 고쳐 새기고 ‘이번’과 ‘지난번’을 비교하세요. 어떤 글이 나은지는 직접 재어 보아야 압니다.`])}
<h3>더 읽기</h3>
${K(`draft`,`stats`,`boom`,`field`,`mana`)}`),cr(`go-sprite`,`정령 부르기`,`sprite`,`
<h3>목표</h3>
${Fn(`go-sprite`)}
<h3>할 일</h3>
${Ln([[Rn(`sprite`),`결계는 그대로입니다. 저절로 솟는 것은 여전히 잡귀 {blob}뿐입니다. 위쪽 표시줄에 원소 정수 세 칸이 생기고, 안내서에 새 쪽이 생깁니다.`],[`약점 표를 보세요. 정령은 불 {fire}, 물 {water}, 자연 {nature} 가운데 하나의 원소를 띱니다.${W([`정령`,`약점인 원소`,`약점으로 잡으면 남는 것`],Gn.map(e=>[`${e.mob} ${e.name}`,`${qn(e.v).name} ${L(qn(e.v).code)}`,`정수 {ess} 1개, ${e.name}의 정수 ${e.gem} 1개`]))}`,``],[`아래 예제를 옮겨 적고 인장(각인)을 누르세요.${V(Xn,`sprite`)}${U([[`summon(1, 1, SPRITE)`,`결계 한가운데 칸에 정령을 부릅니다. 돌려주는 값은 지금 그 칸에 있는 부른 마물입니다. 없으면 None입니다.`],[`cast(…, WATER)`,`그 마물에게 물 원소로 한 발 쏩니다. None이면 아무 일도 없습니다.`]])}`,``],[`결계의 한가운데 칸을 보세요.`,`첫 발동에는 쏘지 않고 정령만 나타납니다. 방금 부른 정령은 같은 발동에서 칠 수 없습니다. 다음 발동부터는 지난번에 부른 정령을 쏘고, 그 자리가 비면 다시 부릅니다.`],[`몇 바퀴 지켜보세요.`,`불 정령 {fire}은 한 발에 사라지고 불의 정수 {gfire}를 남깁니다. 물 정령과 자연 정령은 두 발을 맞고 사라지며 정수 {ess}만 남깁니다.`]])}
<h3>확인</h3>
${G([`위쪽 표시줄의 불의 정수 {gfire}가 1 이상입니다.`,In(`go-sprite`)])}
<h3>막히면</h3>
${G([`${Y(Xn,`boom`)}<br>${B(`sprite`)} 봉인을 아직 풀지 않았습니다.`,`${X(`lower`)}<br>원소 이름은 대문자로 씁니다.`,`${X(`summonOut`)}<br>좌표가 결계 밖입니다. 3×3 결계의 좌표는 0, 1, 2뿐입니다.`,`불의 정수가 오르지 않습니다. 지금 있는 정령이 불 정령이 아닙니다. 그 정령은 두 발째에 사라지고 새 정령이 나타납니다. 정령의 원소는 부를 때마다 다시 정해집니다.`,`초당 수확이 boom 주문보다 낮습니다. 정령을 한 마리씩 불러서 잡으면 정수가 적게 모입니다. 원소 정수는 정령에게서만 나옵니다.`])}
<h3>더 읽기</h3>
${K(`summoning`,`elem`,`summon`,`kinds`,`elems`)}`),cr(`go-name`,`이름 붙이고 읽기`,`assign`,`
<h3>목표</h3>
${Fn(`go-name`)}
<h3>할 일</h3>
${Ln([[Rn(`assign`),`사전에 이름 붙이기 쪽이 생깁니다.`],[`아래 예제를 옮겨 적고 새기세요.${V(Zn,`assign`)}${U([[`m = summon(1, 1, SPRITE)`,`부른 마물에 m이라는 이름을 붙입니다.`],[`cast(m, WATER)`,`m에게 물 원소로 한 발 쏩니다.`],[`cast(m, WATER)`,`같은 마물에게 한 발 더 쏩니다.`]])}`,`이름을 붙이면 같은 마물을 여러 번 가리킬 수 있습니다. 어떤 정령이든 한 발동에 사라집니다. 원소 정수는 불 정령에게서만 나옵니다.`],[`${L(`WATER`)}를 다른 원소 이름으로 바꿔 새기세요.${W([`쏘는 원소`,`한 발에 잡히는 정령`,`모이는 정수`],Gn.map(e=>{let t=Gn.find(t=>v(t.v)===e.v);return[L(e.code),`${t.mob} ${t.name}`,`${t.name}의 정수 ${t.gem}`]}))}`,`쏘는 원소에 따라 모이는 원소 정수가 달라집니다.`],[Rn(`read`),`사전에 마물의 정보 쪽이 생깁니다.`],[`아래 예제를 옮겨 적고 새기세요.${V(Qn,`read`)}${U([[`m = summon(1, 1, SPRITE)`,`부른 마물에 m이라는 이름을 붙입니다.`],[`print(m.elem)`,`m의 원소를 주문 창에 적습니다.`]])}`,`주문 창에 ${R(C(`spell.printed`,`1`))}, ${R(C(`spell.printed`,`2`))}, ${R(C(`spell.printed`,`3`))} 가운데 하나가 나옵니다. 원소는 숫자입니다. 이 주문은 쏘지 않으므로 같은 정령이 계속 남습니다.`]])}
<h3>확인</h3>
${G([`봉인의 나무에서 ${ke(B(`assign`),`와/과`)} ${B(`read`)} 칸이 ‘${C(`tree.state.owned`)}’입니다.`,In(`go-name`)])}
<h3>막히면</h3>
${G([ur,`${X(`before`)}<br>이름을 붙이기 전에 썼습니다.`,`${X(`attr`)}<br>없는 정보를 읽었습니다. 괄호 안이 읽을 수 있는 정보의 전부입니다.`,`${Y(Qn,`assign`)}<br>${B(`read`)} 봉인을 아직 풀지 않았습니다.`,`물의 정수나 자연의 정수가 모이지 않습니다. 쏘는 원소를 바꿔 새기세요. 위의 표에 어떤 원소가 어떤 정령을 한 발에 잡는지 있습니다.`])}
<h3>더 읽기</h3>
${K(`assign`,`mob`,`elems`,`print`,`summoning`)}`),cr(`go-if`,`if로 고르기`,`if`,`
<h3>목표</h3>
${Fn(`go-if`)}
<h3>할 일</h3>
${Ln([[Rn(`if`),`사전에 if와 비교 쪽이 생깁니다.`],[`아래 예제를 옮겨 적고 새기세요.${V($n,`if`)}${U([[`m = summon(1, 1, SPRITE)`,`부른 마물에 m이라는 이름을 붙입니다.`],[`if m.elem == FIRE:`,`m의 원소가 불이면 아래의 들여 쓴 줄을 실행합니다.`],[`    cast(m, WATER)`,`m에게 물 원소로 쏩니다.`]])}`,`불 정령일 때만 쏩니다. 다른 정령이 나타나면 쏘지 않으므로 그 정령이 계속 남습니다. 주문이 거기서 멈춘 것처럼 보입니다.`],[`이 주문을 고쳐 세 원소의 정령을 모두 약점으로 쏘게 하세요. 갈래를 잇는 말은 ${z(`if`)} 쪽에 있습니다.`,`세 원소 정수가 모두 오릅니다.`]])}
<h3>확인</h3>
${G([`한 주문이 돌면서 위쪽 표시줄의 세 원소 정수가 모두 오릅니다.`,`상태 줄의 룬 수를 적어 두세요. ${z(`go-math`)} 쪽에서 이 숫자를 줄입니다.`,In(`go-if`)])}
<h3>막히면</h3>
${G([`${Y(`m = summon(1, 1, SPRITE)
if m.elem == FIRE:
cast(m, WATER)`,`if`)}<br>if 아래 줄을 네 칸 들여 쓰세요. Tab 키가 네 칸을 넣습니다.`,`${Y(`m = summon(1, 1, SPRITE)
if m.elem == FIRE
    cast(m, WATER)`,`if`)}<br>if 줄 끝에 쌍점(:)을 붙이세요.`,`${Y(`m = summon(1, 1, SPRITE)
if m.elem = FIRE:
    cast(m, WATER)`,`if`)}<br>같은지 물을 때는 ${L(`==`)}를 씁니다.`,ur,`원소 정수가 한두 가지만 오릅니다. 어느 갈래에도 맞지 않는 정령이 남아 있습니다. 결계의 한가운데 칸에 어떤 정령이 있는지 보세요.`])}
<h3>더 읽기</h3>
${K(`if`,`compare`,`elem`,`summoning`)}`),cr(`go-beast`,`맹수와 기세`,`beast`,`
<h3>목표</h3>
${Fn(`go-beast`)}
<h3>할 일</h3>
${Ln([[Rn(`beast`),`결계는 그대로입니다. 맹수는 불러야 나옵니다. 위쪽 표시줄에 기세의 정수 {gzeal} 칸이 생깁니다.`],[`맹수의 규칙을 보세요.${G([`맹수는 약 ${F(be)}초마다 기세를 1 모읍니다. 기세는 3까지 오릅니다.`,`기세가 ${dr(3,`이/가`)} 되면 ${F(Te)}초 동안 예고한 뒤 반격합니다. 반격을 맞으면 읊던 주문이 룬 3개만큼 물러납니다.`,`맹수를 잡으면 죽는 순간의 기세에 따라 기세의 정수를 남깁니다.`])}${W([`죽는 순간의 기세`,`남기는 기세의 정수 {gzeal}`],g.map((e,t)=>[`${t}`,e?`${e}개`:`없음`]))}`,``],[`아래 예제를 옮겨 적고 새기세요.${V(er,`beast`)}`,`매 발동 맹수를 잡고 다시 부릅니다. 정수 {ess}는 오르지만 기세의 정수는 거의 오르지 않습니다. 기세가 오르기 전에 잡기 때문입니다.`],[`아래 예제로 바꿔 새기세요.${V(tr,`beast`)}${U([[`m = summon(1, 1, BEAST)`,`부른 마물에 m이라는 이름을 붙입니다.`],[`if m.charge > 0:`,`m의 기세가 0보다 크면 아래 줄을 실행합니다.`],[`    cast(m)`,`m에게 한 발 쏩니다.`],[`    cast(m)`,`한 발 더 쏩니다.`]])}`,`기세가 오른 맹수만 잡습니다. 기세의 정수가 오르기 시작합니다.`],[`${L(`0`)}을 다른 숫자로 바꿔 새기고 기세의 정수가 모이는 빠르기를 견주어 보세요.`,`늦게 잡을수록 한 마리가 남기는 정수는 많아지고, 반격을 맞을 위험도 커집니다.`]])}
<h3>확인</h3>
${G([`위쪽 표시줄의 기세의 정수 {gzeal}가 1 이상입니다.`,In(`go-beast`)])}
<h3>막히면</h3>
${G([`${Y(er,`if`)}<br>${B(`beast`)} 봉인을 아직 풀지 않았습니다.`,`${X(`summonSealed`)}<br>종류를 숫자로 적어도 봉인을 풀기 전에는 부를 수 없습니다.`,lr(`charge`),`주문 창에 ${R(C(`stat.knocked`,3))}이 나옵니다. 반격을 맞아 물러난 룬의 수입니다. 잃는 것은 시간뿐입니다.`,`정령을 부르던 칸에 맹수가 나타나지 않습니다. 부른 마물이 남아 있는 칸에는 다른 종류도 부를 수 없습니다. 남은 마물을 잡거나 다른 칸에 부르세요.`])}
<h3>더 읽기</h3>
${K(`charge`,`k-beast`,`mob`,`summoning`)}`),cr(`go-math`,`셈으로 줄이기`,`math`,`
<h3>목표</h3>
${Fn(`go-math`)}
<h3>할 일</h3>
${Ln([[Rn(`math`),`사전에 셈 쪽이 생깁니다.`],[`원소 이름이 숫자라는 것을 확인하세요. 아래 예제를 새기면 주문 창에 원소 이름의 값이 찍힙니다.${V(`print(FIRE, WATER, NATURE)`,`sprite`)}`,`주문 창에 ${R(C(`spell.printed`,`1 2 3`))} 표시가 나옵니다.`],[`아래 표를 보세요. 왼쪽은 정령의 ${L(`m.elem`)}, 오른쪽은 그 정령에게 쏠 원소의 값입니다.${W([`m.elem`,`쏠 원소`],Gn.map(e=>[`${e.v} (${e.name})`,`${v(e.v)} (${qn(e.v).name})`]))}`,``],[`${L(`m.elem`)}으로 오른쪽 값을 만드는 셈 하나를 찾으세요. 찾으면 ${L(`cast(m, 셈)`)} 한 줄이 if·elif·else를 대신합니다.`,``],[`찾은 셈으로 주문을 새기세요.`,`상태 줄의 룬 수가 ${Tn} 이하이고 세 원소 정수가 모두 오르면 목표를 이룹니다.`]])}
<details><summary>실마리 1</summary><p>표를 눈으로만 보지 말고 값을 찍어 보세요. ${L(`print(m.elem, 셈)`)}을 넣어 새기면 왼쪽 값과 셈의 값이 주문 창에 나란히 찍힙니다.</p></details>
<details><summary>실마리 2</summary><p>세 줄 가운데 두 줄은 같은 규칙을 따릅니다. 그 규칙을 먼저 찾으세요. 남은 한 줄이 왜 어긋나는지가 다음 물음입니다.</p></details>
<details><summary>실마리 3</summary><p>${z(`math`)} 쪽의 기호를 하나씩 시험해 보세요. 왼쪽 값이 커질 때 셈의 값이 계속 커지지 않는 기호가 있습니다.</p></details>
<h3>확인</h3>
${G([`상태 줄의 룬 수가 ${Tn} 이하입니다.`,`그 주문이 돌면서 세 원소 정수가 모두 오릅니다.`,In(`go-math`)])}
<h3>막히면</h3>
${G([`${Y(`print(1 + 1)`,`if`)}<br>${B(`math`)} 봉인을 아직 풀지 않았습니다.`,`룬 수가 ${dr(Tn,`을/를`)} 넘습니다. 줄 번호 옆의 청록색 숫자가 그 줄의 룬 수입니다. 어느 줄이 무거운지 보고 줄이세요.`,`원소 정수가 한두 가지만 오릅니다. 셈이 표의 일부 줄에서만 맞습니다. 맞지 않는 정령은 약점이 아닌 탄을 두 번 맞고 사라집니다.`,`${X(`half`)}<br>${L(`/`)}의 값은 소수가 됩니다. 원소와 좌표에는 정수를 씁니다.`])}
<h3>더 읽기</h3>
${K(`math`,`runes`,`print`,`elems`)}`),cr(`go-resonance`,`공명`,`resonance`,`
<h3>목표</h3>
${Fn(`go-resonance`)}
<h3>할 일</h3>
${Ln([[Rn(`resonance`),`결계의 마물은 그대로입니다. 바뀌는 것은 고리입니다.`],[`공명의 규칙을 보세요.${G([`발동이 그 고리가 부른 정령을 약점으로 한 마리 이상 잡으면 그 고리의 공명이 1 오릅니다. 몇 마리를 잡든 1입니다.`,`고리가 한 박자를 보낼 때마다 공명에 ${dr(F(c),`이/가`)} 곱해집니다. 공명은 박자마다 식습니다.`,`발동으로 얻는 모든 정수에 (1 + 공명)이 곱해집니다. 이 값이 공명 배수입니다.`])}`,``],[`세 원소의 정령을 부르고 약점으로 잡는 주문을 돌리세요.`,`주문 창의 성적 줄에 ${R(C(`stat.resonance`,`1.00`))}에서 시작하는 숫자가 나오고, 그 주문이 부른 정령을 약점으로 잡을 때마다 오릅니다.`],[`아래 표를 보세요. 매 발동 약점으로 잡는 주문의 공명 배수는 룬 수로 정해집니다.${W([`룬 수`,`한 바퀴의 박자`,`공명 배수`],[10,16,24,32].map(e=>[`${e}`,`${e+5}`,jn(e)]))}`,``],[`공명 배수가 ×${dr(yt,`을/를`)} 넘을 때까지 주문을 고쳐 새기세요.`,`목표 줄의 막대는 지금까지 가장 높았던 배수를 보여 줍니다.`]])}
<h3>확인</h3>
${G([`목표 줄의 숫자가 ${yt} 이상입니다.`,In(`go-resonance`)])}
<h3>막히면</h3>
${G([`배수가 오르다가 내려갑니다. 그 고리가 부른 정령을 약점으로 잡지 못한 발동에서는 공명이 오르지 않고 식기만 합니다.`,`맹수 주문의 배수가 오르지 않습니다. 맹수는 약점이 없어 공명을 올리지 못합니다. 잡귀와 boom도 올리지 못합니다.`,`주문을 다시 새겨도 공명은 고리에 남습니다. 새긴 뒤 몇 바퀴가 지나야 새 주문의 배수가 됩니다.`,`배수가 ×${yt}에 못 미칩니다. 위의 표에서 룬 수와 배수의 관계를 보세요.`])}
<h3>더 읽기</h3>
${K(`reson`,`resonance`,`runes`,`cycle`,`stats`)}`),cr(`go-for`,`되풀이`,`for`,`
<h3>목표</h3>
${Fn(`go-for`)}
<h3>할 일</h3>
${Ln([[Rn(`for`),`사전에 for와 range 쪽이 생깁니다.`],[`아래 예제를 옮겨 적고 새기세요.${V(nr,`for`)}${U([[`for x in range(3):`,`0, 1, 2를 차례로 x라 부르며 아래 줄을 되풀이합니다.`],[`    cast(summon(x, 1, SPRITE), WATER)`,`가운데 가로줄의 (x, 1) 칸에 정령을 부르고, 그 칸에 있던 정령에게 물로 쏩니다.`]])}`,`한 번 발동에 세 칸을 다룹니다. 상태 줄의 룬 수는 ${I(nr)}입니다. 되풀이는 발동 안에서 일어나므로 몇 번 되풀이하든 한 바퀴의 길이는 같습니다.`],[`마나 막대를 보세요.`,`한 칸에 부르기 ${dr(2,`와/과`)} 쏘기 ${dr(3,`이/가`)} 듭니다. 칸을 늘리면 한 바퀴에 쓰는 마나가 차는 마나보다 많아집니다. 마나가 바닥나면 폭주가 일어나고 창 제목 줄에 ${R(C(`phase.silence`,`2.0`))}처럼 남은 시간이 나옵니다.`],[`정보를 읽는 주문을 되풀이에 넣을 때는 아래 모양을 쓰세요.${V(rr,`for`)}${U([[`    m = summon(x, 1, SPRITE)`,`그 칸에 부른 마물이 없으면 m은 None입니다.`],[`    if m:`,`m이 None이 아닐 때만 아래 줄을 실행합니다.`]])}`,`${L(`if m:`)}이 없으면 빈 칸을 만날 때마다 발동이 흩어집니다. 흩어진 발동은 다른 칸의 탄도 쏘지 않습니다.`]])}
<h3>확인</h3>
${G([`for를 쓴 주문의 상태 줄이 ${R(C(`state.same`))}입니다.`,In(`go-for`)])}
<h3>막히면</h3>
${G([`${Y(nr,`math`)}<br>${B(`for`)} 봉인을 아직 풀지 않았습니다.`,`${Y(`for x in range(3)
    cast(summon(x, 1, SPRITE), WATER)`,`for`)}<br>for 줄 끝에 쌍점(:)을 붙이세요.`,ur,`과열이 자주 납니다. ${z(`mana`)} 쪽의 표로 한 발동에 드는 마나를 셈해 보세요.`,`이웃한 정령이 함께 터집니다. 약점으로 잡은 정령 옆에 같은 원소의 정령이 있으면 번집니다.`])}
<h3>더 읽기</h3>
${K(`for`,`range`,`mana`,`chain`,`summoning`)}`),cr(`go-ring`,`고리 둘`,`ring2`,`
<h3>목표</h3>
${Fn(`go-ring`)}
<h3>할 일</h3>
${Ln([[Rn(`ring2`),`동시에 돌릴 수 있는 주문이 둘이 됩니다.`],[`‘${C(`menu.new`)}’(+) 단추를 누르세요.`,`‘${C(`world.spellName`,2)}’ 창이 생깁니다. 글상자에 ${L(Z)}가 초안으로 적혀 있고 상태는 ${R(C(`state.stopped`))}입니다.`],[`‘${C(`world.spellName`,2)}’ 창에 글을 쓰고 인장(각인)을 누르세요.`,`‘${C(`world.spellName`,1)}’은 그대로 돌고 ‘${C(`world.spellName`,2)}’도 돌기 시작합니다. 두 창의 제목 줄이 각자 박자를 셉니다.`]])}
<h3>확인</h3>
${G([`두 주문 창의 상태 줄이 모두 ${R(C(`state.same`))}입니다.`,In(`go-ring`)])}
<h3>막히면</h3>
${G([`${R(`${Bn} · ${Wn}`)}<br>고리가 모두 찼습니다. 돌고 있는 주문 하나의 ‘멈춤’을 누르세요.`,`‘${C(`world.spellName`,1)}’이 멈춥니다. ${B(`ring2`)} 봉인을 풀기 전에는 고리가 하나라서, 다른 주문을 새기면 돌던 주문이 멈춥니다.`,`예제가 다른 창에 옮겨 적힙니다. 옮겨 적기는 마지막으로 누른 주문 창에 들어갑니다. 넣을 창의 글상자를 먼저 누르세요.`,`두 주문이 같은 칸에 부릅니다. 부른 마물이 남아 있는 칸에는 어느 주문의 부름도 헛일이 됩니다. 마나는 돌려받습니다.`])}
<h3>더 읽기</h3>
${K(`rings`,`ring2`,`mana`,`reson`,`stats`)}`),cr(`go-scan`,`결계 보기`,`scan`,`
<h3>목표</h3>
${Fn(`go-scan`)}
<h3>할 일</h3>
${Ln([[Rn(`scan`),`사전에 scan과 꺼내기 쪽이 생깁니다.`],[`아래 예제를 옮겨 적고 새기세요.${V(ir,`scan`)}${U([[`for m in scan():`,`결계의 모든 마물을 오래된 차례로 m이라 부르며 되풀이합니다.`],[`    cast(m)`,`m에게 한 발 쏩니다.`]])}`,`결계의 모든 마물에게 한 발씩 쏩니다. 종류를 가리지 않습니다. 마물 한 마리에 마나가 3 듭니다.`],[`${L(`cast(m)`)}를 ${L(`print(m.kind)`)}로 바꿔 새겨 보세요.`,`주문 창에 맨 마지막 마물의 종류가 숫자로 찍힙니다. 종류의 값은 ${z(`kinds`)} 쪽에 있습니다.`]])}
<h3>확인</h3>
${G([`봉인의 나무에서 ${B(`scan`)} 칸이 ‘${C(`tree.state.owned`)}’입니다.`,In(`go-scan`)])}
<h3>막히면</h3>
${G([`${Y(ir,`for`)}<br>${B(`scan`)} 봉인을 아직 풀지 않았습니다.`,`${X(`empty`)}<br>결계가 비어 있을 때 첫째를 꺼냈습니다.`,`방금 부른 마물이 목록에 없습니다. 부름은 발동이 끝난 뒤에 이루어집니다. 다음 발동의 scan()부터 보입니다.`,`잡귀에게도 쏩니다. scan()은 모든 종류를 돌려줍니다. 종류는 m.kind로 가릅니다.`])}
<h3>더 읽기</h3>
${K(`scan`,`index`,`mob`,`kinds`)}`),cr(`go-wisp`,`도깨비불`,`wisp`,`
<h3>목표</h3>
${Fn(`go-wisp`)}
<h3>할 일</h3>
${Ln([[Rn(`wisp`),`위쪽 표시줄에 도깨비불의 정수 {gglow} 칸이 생깁니다.`],[`도깨비불의 규칙을 보세요.${G([`나타났을 때 3단입니다. ${F(1)}초마다 한 단씩 바랩니다.`,`${F(3)}초가 지나면 아무것도 남기지 않고 흩어집니다.`,`한 발이면 잡힙니다. 잡는 순간의 단만큼 도깨비불의 정수를 남깁니다.`])}`,``],[`아래 예제를 옮겨 적고 새기세요.${V(or,`wisp`)}`,`부른 다음 발동에 잡습니다. 상태 줄의 룬 수는 ${I(or)}입니다. 도깨비불의 정수가 오릅니다.`],[`상태 줄의 ‘한 바퀴’를 아래 표와 견주어 보세요.${W([`부른 뒤 잡기까지`,`잡는 순간의 단`,`남기는 도깨비불의 정수 {gglow}`],[...Array.from({length:3},(e,t)=>[`${F(1*(t+1))}초 안`,`${3-t}단`,`${3-t}개`]),[`${F(3)}초 뒤`,`흩어짐`,`없음`]])}`,`부른 다음 발동에 잡으므로, 부른 뒤 잡기까지의 시간은 한 바퀴의 길이와 같습니다.`]])}
<h3>확인</h3>
${G([`위쪽 표시줄의 도깨비불의 정수 {gglow}가 1 이상입니다.`,In(`go-wisp`)])}
<h3>막히면</h3>
${G([`${Y(or,`for`)}<br>${B(`wisp`)} 봉인을 아직 풀지 않았습니다.`,`도깨비불의 정수가 한 번에 1개씩만 오릅니다. 잡는 순간의 단이 1입니다. 위의 표를 보세요.`,`도깨비불이 잡히기 전에 사라집니다. 다 바래어 흩어졌습니다. 흩어진 칸에는 잡귀가 다시 솟습니다.`,`공명 배수가 오르지 않습니다. 도깨비불은 약점이 없어 공명을 올리지 못합니다.`])}
<h3>더 읽기</h3>
${K(`wisps`,`k-wisp`,`cycle`,`sigil`)}`),cr(`go-grid5`,`큰 결계`,`grid5`,`
<h3>목표</h3>
${Fn(`go-grid5`)}
<h3>할 일</h3>
${Ln([[Rn(`grid5`),`결계가 가로 5칸, 세로 5칸이 됩니다. 좌표는 0부터 4까지입니다. 있던 마물은 가운데 쪽으로 옮겨집니다.`],[`주문의 좌표를 고치세요.`,`3×3의 한가운데 (1, 1)은 5×5에서 한가운데가 아닙니다. 5×5의 한가운데는 (2, 2)입니다.`],[`${Mn(`menu.records`,`을/를`)} 누르세요.`,`${C(`rec.title`)} 창이 열립니다. 초당 수확 그래프와 주문별 룬 수·한 바퀴·초당 표가 나옵니다.`],[`주문을 고쳐 새기고 그래프를 보세요.`,`각인한 순간이 붉은 세로줄로 남습니다. 줄 오른쪽이 왼쪽보다 높으면 고친 글이 더 많이 거둡니다.`],[`위쪽 표시줄의 ‘최고’가 ${Cn(22)} 이상이 될 때까지 고쳐 새기세요.`,``]])}
<details><summary>실마리 1</summary><p>정령 한 줄 주문을 아무리 다듬어도 이 목표에는 닿지 않습니다. 고리 하나가 한 바퀴 동안 하는 일을 살펴보세요. 무엇을 몇 번 하는지 적어 보면 다음 물음이 보입니다.</p></details>
<details><summary>실마리 2</summary><p>부르는 일과 치는 일은 길이가 다릅니다. 두 일에 드는 룬 수를 따로 세어 보세요.</p></details>
<h3>확인</h3>
${G([`‘최고’가 ${Cn(22)} 이상입니다.`,In(`go-grid5`)])}
<h3>막히면</h3>
${G([`${X(`boomOut5`)}<br>5×5 결계의 좌표는 0부터 4까지입니다.`,`과열이 자주 납니다. ${z(`mana`)} 쪽을 보세요. 봉인의 나무의 ${B(`mana1`)} 봉인은 최대 마나와 차는 빠르기를 늘립니다.`,`원소 정수가 적게 모입니다. ${z(`chain`)} 쪽의 원소 정수 표와 ${z(`reson`)} 쪽을 보세요.`,`‘최고’가 ${Cn(22)}에 못 미칩니다. 지금까지 푼 것은 정령, 맹수, 도깨비불, 공명, 고리 둘, 되풀이입니다. 무엇을 어떻게 엮을지는 직접 재어 보아야 압니다.`])}
<h3>더 읽기</h3>
${K(`grid5`,`chain`,`mana`,`stats`,`rings`,`reson`)}`),cr(`go-deep`,`함수 만들기`,`def`,`
<h3>목표</h3>
${Fn(`go-deep`)}
<h3>할 일</h3>
${Ln([[Rn(`def`),`사전에 def와 return 쪽이 생깁니다.`],[`이 뒤의 봉인은 한 칸에 한 가지씩 풀립니다. 칸에 적힌 것이 풀리는 것의 전부입니다.${W([`봉인`,`값`,`사전의 쪽`],[[B(`list`),Nn(`list`),`${z(`list`)} ${z(`tuple`)} ${z(`star`)}`],[B(`dict`),Nn(`dict`),z(`dict`)],[B(`comp`),Nn(`comp`),`${z(`comp`)} ${z(`lambda`)}`],[B(`kit`),Nn(`kit`),`${z(`sorted`)} ${z(`enumzip`)} ${z(`mapfilter`)} ${z(`anyall`)} ${z(`reduce`)} ${z(`convert`)} ${z(`kw`)} ${z(`bits`)} ${z(`strings`)}`]])}`,``]])}
<h3>확인</h3>
${G([In(`go-deep`)])}
<h3>막히면</h3>
${G([`${Y(`def hit(m):
    cast(m)`,`grid5`)}<br>${B(`def`)} 봉인을 아직 풀지 않았습니다.`,`정수가 모자랍니다. 같은 시기에 ${B(`tempo3`)} 봉인과 ${B(`mana2`)} 봉인도 열립니다. 봉인의 나무에서 값을 보세요.`])}
<h3>더 읽기</h3>
${K(`def`,`return`,`tree`,`stats`)}`)],pr=[[`한 줄짜리 식 (부르기만 있는 줄 등)`,`1`,`cast()`],[`이름`,`1`,`cast()`],[`부르기 ( )`,`1`,`cast()`],[`숫자, True, False, None`,`1`,`boom(1, 1)`,`boom`],[`문자열 "…"`,`1 + 글자 수를 8로 나눈 몫`,`print("마물을 쏜다")`],[`pass`,`1`,`pass`],[`이름 붙이기 =`,`1`,`m = summon(1, 1, SPRITE)`,`assign`],[`점으로 읽기 .`,`1`,`print(me.mana)`,`read`],[`if, elif`,`하나마다 1`,`if me.mana > 9:
    cast()`,`if`],[`비교`,`이어진 비교 전체에 1`,`print(0 < me.mana < 50)`,`if`],[`셈 기호`,`기호마다 1`,`print(1 + 2 * 3)`,`math`],[`부호 -`,`1`,`print(-1)`,`math`],[`+= 같은 셈 붙이기`,`1`,`n = 1
n += 2`,`math`],[`and, or`,`이어진 것 전체에 1`,`print(1 and 2 and 3)`,`logic`],[`not`,`1`,`print(not 1)`,`logic`],[`조건식 a if c else b`,`1`,`print(1 if me.mana else 2)`,`logic`],[`for`,`1`,`for x in range(3):
    boom(x, 1)`,`for`],[`꺼내기 [ ]`,`1`,`print(scan()[0])`,`scan`],[`while, break, continue`,`1`,`while 1:
    break`,`while`],[`자르기 [ : ]`,`꺼내기와 따로 1`,`print(scan()[:3])`,`slice`],[`def`,`1, 매개변수마다 1 더`,`def f(m):
    cast(m)`,`def`],[`return`,`1`,`def f(m):
    return m`,`def`],[`리스트 [ ], 튜플 ( , )`,`1`,`print([1, 2])`,`list`],[`펼치기 *`,`1`,`print(*[1, 2])`,`list`],[`딕셔너리 { }`,`1`,`print({1: 2})`,`dict`],[`lambda`,`1, 매개변수마다 1 더`,`f = lambda m: m`,`comp`],[`[… for … in …]`,`1, for마다 1 더`,`print([x for x in range(3)])`,`comp`],[`이름 붙인 인자 reverse=`,`1`,`print(sorted([2, 1], reverse=True))`,`kit`]],mr=[Q(`cycle`,`주문의 한 바퀴`,void 0,`
<p class="def"><b>한 바퀴</b>는 주문이 룬을 모두 읊고 한 번 발동하기까지입니다.</p>
<h3>규칙</h3>
<ol>
<li><b>각인.</b> 인장(각인)을 누르면 글이 고리에 새겨집니다. ${F(Ze)}초 걸리고 그동안은 읊지 않습니다. 창 제목 줄에 ${R(C(`phase.inscribing`))}이 나옵니다.</li>
<li><b>읊기.</b> 첫 룬부터 하나씩 읊습니다. 룬 하나에 한 <b>박자</b>가 걸립니다. 창 제목 줄에 ${R(C(`phase.chant`,2,3))}처럼 나옵니다. 글상자에는 지금 읊는 줄 왼쪽에 붉은 표시가 붙습니다.</li>
<li><b>발동.</b> 마지막 룬을 읊으면 글 전체가 첫 줄부터 끝 줄까지 한 번 실행됩니다. 쏘기와 터뜨리기는 이때 일어납니다. 실행된 줄은 잠깐 청록색으로 물듭니다. 발동 뒤 5박자를 쉽니다. 창 제목 줄에 ${R(C(`phase.release`))}이 나옵니다.</li>
<li>2로 돌아갑니다. ‘멈춤’을 누를 때까지 되풀이합니다.</li>
</ol>
<p>한 바퀴의 길이는 (룬 수 + 5) × 박자입니다. 박자는 ‘빠른 혀’ 봉인으로 줄어듭니다.</p>
${W([`푼 봉인`,`박자`],[[`없음`,`${F(We[0])}초`],...[`tempo1`,`tempo2`,`tempo3`].map((e,t)=>[B(e),`${F(We[t+1])}초`])])}
<h3>예</h3>
<p>${L(Z)}는 룬이 ${I(Z)}개입니다. 한 바퀴는 (${I(Z)} + 5) × ${F(On)} = ${kn(Z)}초입니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([[`읊는 시간은 룬 수로만 정해집니다. for가 몇 번 되풀이하든 한 바퀴의 길이는 같습니다.`,`for`],`같은 글을 다시 새겨도 첫 룬부터 다시 읊습니다.`,`과열 동안에는 모든 주문이 읊지 않습니다. 과열이 끝나면 모든 주문이 첫 룬부터 다시 읊습니다.`,[`맹수의 반격을 맞으면 읊던 자리에서 룬 몇 개만큼 물러납니다. 그만큼 한 바퀴가 길어집니다.`,`beast`]])}
<h3>관련 항목</h3>
${K(`runes`,`draft`,`mana`)}`),Q(`runes`,`룬 세는 법`,void 0,`
<p class="def"><b>룬</b>은 주문을 이루는 조각입니다. 룬 하나를 읊는 데 한 박자가 걸립니다.</p>
<h3>규칙</h3>
<p>글을 문법 단위로 나눈 조각 하나가 룬 1개입니다. 아래 표의 ‘예’는 그 글 전체의 룬 수입니다. 풀지 않은 문법의 줄은 표에 나오지 않습니다.</p>
<table><tr><th>쓴 것</th><th>룬</th><th>예</th></tr>${pr.map(([e,t,n,r])=>`<tr${r?` data-need="${r}"`:``}><td>${Dn(e)}</td><td>${t}</td><td><code>${Dn(n).replace(/\n/g,`⏎`)}</code> ${I(n)}룬</td></tr>`).join(``)}</table>
<p>세지 않는 것은 다음과 같습니다.</p>
${G([`띄어쓰기, 빈 줄, 들여쓰기, 줄바꿈`,`# 뒤의 주석`,`이름의 길이`,`쉼표와 쌍점`,`셈 순서를 묶는 괄호`,[`else`,`if`],[`점 뒤의 이름 (m.elem의 elem)`,`read`],[`def 뒤의 이름`,`def`]])}
<h3>예</h3>
<p>${L(Z)}는 ${I(Z)}룬입니다.</p>
${W([`조각`,`룬`],[[`한 줄짜리 식 ${L(`cast()`)}`,`1`],[`부르기 ${L(`( )`)}`,`1`],[`이름 ${L(`cast`)}`,`1`]])}
<h3>헷갈리기 쉬운 점</h3>
${G([`이름이 길어도 룬은 같습니다.`,`줄 수가 아니라 조각 수를 셉니다. 여러 줄을 한 줄에 몰아 써도 룬은 줄지 않습니다.`,`주문 창에서 줄 번호 옆의 청록색 숫자가 그 줄의 룬 수입니다.`])}
<h3>관련 항목</h3>
${K(`cycle`,`draft`)}`),Q(`draft`,`초안과 각인`,void 0,`
<p class="def"><b>초안</b>은 주문 창의 글상자에 적힌 글입니다. <b>각인</b>은 초안을 고리에 새겨 돌리는 일입니다.</p>
<h3>규칙</h3>
${G([`글상자를 고쳐도 결계는 마지막으로 새긴 글을 계속 돌립니다.`,`<b>인장</b>(각인)을 누르거나 Ctrl + Enter를 누르면 각인합니다.`,`틀린 곳이 있는 글은 새겨지지 않습니다. 예전 글이 계속 돌고, 틀린 줄은 글상자에 붉게 표시됩니다.`])}
<p>상태 줄의 글은 다음과 같습니다.</p>
${W([`상태 줄`,`뜻`],[[R(`${C(`state.same`)} · ${C(`state.same.rest`,`…`,`…`)}`),`글상자의 글이 지금 돌고 있는 글과 같습니다.`],[R(`${C(`state.draft`)} · ${C(`state.draft.rest`,`…`,`…`,`…`,`…`)}`),`고친 글을 아직 새기지 않았습니다. 새겼을 때의 룬 수와 한 바퀴를 미리 보여 줍니다.`],[R(`${Bn} · ${C(`state.line`,`…`)} · …`),`글에 틀린 곳이 있습니다. 뒤에 까닭이 적힙니다.`],[R(`${C(`state.stopped`)} · ${C(`state.stopped.rest`,`…`,`…`)}`),`이 주문은 고리에 없습니다.`]])}
<p>발동하는 도중에 오류가 나면 주문 창에 ${R(C(`spell.fizzled`,`…`,`…`))} 표시가 뜹니다. 그 발동은 아무것도 쏘지 않습니다. 그때까지 쓴 마나는 돌아오지 않습니다. 다음 바퀴에 다시 실행합니다.</p>
<p>글상자의 단축키는 다음과 같습니다.</p>
${W([`키`,`하는 일`],[[`Ctrl + Enter`,`각인`],[`Ctrl + Z`,`고친 것 되돌리기`],[`Tab`,`네 칸 들여쓰기`],[`Shift + Tab`,`네 칸 내어쓰기`]])}
<h3>예</h3>
<p>${L(Z)}가 돌고 있을 때 한 줄을 더 쓰면 상태 줄에 다음 글이 나옵니다. 숫자는 박자에 따라 다릅니다.</p>
<p>${R(`${C(`state.draft`)} · ${C(`state.draft.rest`,I(Jn),`+${I(Jn)-I(Z)}`,kn(Jn),C(`state.speed.slower`,(S(I(Jn),On)-S(I(Z),On)).toFixed(2)))}`)}</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`‘${C(`docs.copy`)}’는 초안만 바꿉니다. 인장(각인)을 눌러야 새겨집니다.`,`같은 글을 다시 새겨도 ${F(Ze)}초 동안 새기고 첫 룬부터 다시 읊습니다.`])}
<h3>관련 항목</h3>
${K(`cycle`,`errors`,`stats`,`rings`)}`),Q(`errors`,`오류 읽는 법`,void 0,`
<p class="def"><b>오류</b>는 주문이 새겨지지 않거나 발동이 흩어진 까닭을 알려 주는 붉은 글입니다.</p>
<h3>규칙</h3>
${W([`오류`,`언제`,`그동안 결계는`],[[R(`${Bn} · ${C(`state.line`,`…`)} · …`),`글이 문법에 맞지 않거나 풀지 않은 말을 썼을 때. 글을 고칠 때마다 바로 다시 판정합니다.`,`예전 글이 계속 돕니다.`],[R(C(`spell.fizzled`,`…`,`…`)),`발동할 때. 글은 맞지만 실행하다가 막혔습니다.`,`그 발동만 아무것도 쏘지 않습니다. 다음 바퀴에 다시 실행합니다.`]])}
${G([`‘${C(`state.line`,`…`)}’은 문제가 난 줄입니다. 인장(각인)을 눌렀는데 새겨지지 않으면 그 줄이 글상자에 붉게 표시됩니다.`,`마지막 부분이 무엇이 틀렸는지입니다. ‘(… 근처)’가 붙으면 그 글자 가까이에서 막혔다는 뜻입니다.`,`발동하는 도중의 값을 보려면 ${z(`print`)}를 씁니다. 찍은 값이 주문 창에 나옵니다.`,`글상자에는 지금 읊는 줄 왼쪽에 붉은 표시가 붙고, 발동한 줄이 잠깐 청록색으로 물듭니다. 어느 줄이 실제로 실행됐는지 이것으로 봅니다.`])}
<p>오류와 폭주는 진행을 망치지 않습니다. 잃는 것은 시간뿐입니다. 모은 정수, 푼 봉인, 적어 둔 주문은 그대로입니다.</p>
<h3>예</h3>
<p>${Y(Yn,``)}</p>
${W([`부분`,`뜻`],[[Bn,`새기기 전에 막혔습니다. 예전 글이 계속 돕니다.`],[C(`state.line`,1),`첫째 줄이 문제입니다.`],[Dn(C(`gate.word`,`boom`,xn(`boom`).title)),`boom이라는 말은 ${B(`boom`)} 봉인을 풀어야 씁니다.`]])}
<h3>헷갈리기 쉬운 점</h3>
${G([`흩어진 발동에서도 그때까지 쓴 마나는 돌아오지 않습니다.`,[`흩어진 발동에서도 흩어지기 전에 부른 것은 이루어집니다. 탄과 폭발만 나가지 않습니다.`,`sprite`],`흩어졌다는 글은 다음 발동이 오류 없이 끝나면 사라집니다.`])}
<h3>관련 항목</h3>
${K(`draft`,`print`,`mana`)}`),Q(`stats`,`성적 읽기`,void 0,`
<p class="def"><b>성적</b>은 주문이 1초에 거두는 정수의 수입니다.</p>
<h3>규칙</h3>
${W([`이름`,`보이는 곳`,`뜻`],[[C(`stat.now`),`주문 창, 인장 옆`,`지금 새겨진 글이 새긴 뒤로 1초에 거둔 정수입니다. 새긴 뒤 6초와 세 바퀴 가운데 긴 쪽이 지나야 숫자가 나옵니다. 그 전에는 ‘재는 중…’이 나옵니다.`],[`지난번`,`주문 창, 인장 옆`,`앞서 새긴 글 가운데 재기를 마친 마지막 글의 성적입니다. 괄호 안은 그 글의 룬 수입니다.`],{need:`resonance`,cells:[`공명`,`주문 창, 인장 옆`,`그 주문의 고리가 지금 발동하면 얻는 정수에 곱해지는 값입니다.`]},{need:`beast`,cells:[`끊김`,`주문 창, 인장 옆`,`새긴 뒤로 맹수의 반격에 끊겨 물러난 룬의 수입니다.`]},[`초당`,`위쪽 표시줄`,`최근 8초 동안 모든 주문이 1초에 거둔 정수입니다. ${B(`grid3`)} 봉인을 풀면 나타납니다.`],[`최고`,`위쪽 표시줄`,`지금까지 가장 높았던 초당입니다.`],[`기록 창`,`‘기록’`,`초당의 흐름 그래프와 주문별 표입니다.`]])}
${G([`이번과 지난번을 비교해 ${R(C(`stat.up`,`1.4`))}, ${R(C(`stat.down`,`0.8`))}처럼 붙입니다. 차이가 5% 안이면 ${R(C(`stat.similar`))}이 붙습니다.`,`정수는 종류를 가리지 않고 합칩니다. 원소 정수 1개도 1로 셉니다.`,`봉인을 풀면 돌고 있는 주문의 ‘이번’을 처음부터 다시 잽니다.`])}
<p>기록 창에는 다음이 있습니다.</p>
${G([`그래프. 초당의 흐름입니다. 붉은 세로줄은 각인한 순간, 청록 세로줄은 봉인을 푼 순간입니다.`,`그래프 위의 단추. 처음부터 보기와 최근 2분만 보기를 바꿉니다.`,`지금, 최고, 잡은 마물, 걸린 시간`,`주문별 표. 주문, 룬, 한 바퀴, 초당`])}
<h3>예</h3>
<p>${R(`${C(`stat.now`)} ${C(`stat.rate`,`1.0`)} · ${C(`stat.prev`,`0.7`)} ${C(`stat.prev.runes`,3)} ${C(`stat.up`,`1.4`)}`)}</p>
<p>지금 글이 1초에 정수 1.0개를 거둡니다. 앞의 3룬짜리 글은 0.7개를 거뒀습니다. 지금 글이 1.4배 많이 거둡니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`게임을 켠 뒤 처음 6초는 ‘최고’에 넣지 않습니다.`,`주문이 둘 이상이면 ‘이번’은 그 주문이 쏜 것으로 거둔 정수만 셉니다. 번져서 죽은 마물은 처음 쏜 주문의 몫입니다.`,[`초당은 종류를 합친 숫자입니다. 정수를 많이 거두는 주문에서 원소 정수를 거두는 주문으로 바꾸면 초당이 내려갈 수 있습니다.`,`sprite`]])}
<h3>관련 항목</h3>
${K(`draft`,`cycle`,`rings`)}`),Q(`field`,`결계와 좌표`,`grid3`,`
<p class="def"><b>결계</b>는 마물이 있는 <b>칸</b>의 판입니다. 칸 하나에 마물이 한 마리까지 있습니다.</p>
<h3>규칙</h3>
${W([`푼 봉인`,`결계`],[[`없음`,`1칸`],[B(`grid3`),`3×3, 9칸`],[B(`grid5`),`5×5, 25칸`]])}
${G([`칸의 자리는 좌표 (x, y)로 부릅니다. x는 가로, y는 세로입니다.`,`x는 왼쪽 끝이 0이고 오른쪽으로 갈수록 커집니다.`,`y는 맨 위가 0이고 아래로 갈수록 커집니다.`,`결계 가장자리에 칸 번호가 적혀 있습니다.`,`빈 칸에는 ${F(De)}~${F(b)}초 뒤에 잡귀가 솟습니다.`,`결계가 넓어지면 있던 마물은 가운데 쪽으로 옮겨집니다.`])}
<p>3×3 결계의 좌표는 다음과 같습니다.</p>
<table class="grid">${[0,1,2].map(e=>`<tr>${[0,1,2].map(t=>`<td>(${t}, ${e})</td>`).join(``)}</tr>`).join(``)}</table>
<h3>예</h3>
<p>3×3 결계에서 (2, 0)은 오른쪽 위 구석입니다. (1, 1)은 한가운데입니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`0부터 셉니다. 3×3의 가장 큰 좌표는 2입니다.`,`가로를 먼저, 세로를 나중에 씁니다.`])}
<h3>관련 항목</h3>
${K(`boom`,`mobs`,`grid3`)}`),Q(`mobs`,`마물과 정수`,void 0,`
<p class="def"><b>마물</b>은 결계의 칸에 있는 적입니다. 잡으면 <b>정수</b> {ess}를 남깁니다.</p>
<h3>규칙</h3>
${W([`종류`,`어떻게 나오나`,`체력`,`남기는 것`],[[`{blob} 잡귀`,`빈 칸에 저절로 솟습니다.`,`2`,`정수 {ess} 1개`],{need:`sprite`,cells:[`{fire} 정령`,`주문으로 부릅니다.`,`2`,`정수 {ess} 1개. 약점으로 잡으면 원소 정수도 남깁니다.`]},{need:`beast`,cells:[`맹수`,`주문으로 부릅니다.`,`2`,`정수 {ess} 1개. 기세가 오른 뒤에 잡으면 기세의 정수 {gzeal}도 남깁니다.`]},{need:`wisp`,cells:[`도깨비불`,`주문으로 부릅니다.`,`1`,`정수 {ess} 1개와 도깨비불의 정수 {gglow}`]}])}
${G([`저절로 솟는 것은 잡귀뿐입니다. 어떤 봉인을 풀어도 결계는 스스로 바뀌지 않습니다.`,`체력이 0이 되면 마물은 사라집니다. 빈 칸에는 곧 잡귀가 다시 솟습니다.`])}
${W([`맞은 것`,`피해`],[[`cast 한 발`,`1`],{need:`sprite`,cells:[`정령이 약점 원소의 cast 한 발을 맞음`,`2`]},{need:`boom`,cells:[`boom (칸마다)`,`1`]},[`폭주`,`1, 태운 마나가 30 이상이면 2`]])}
${G([`인자 없는 cast()는 가장 오래된 마물을 쏩니다. 종류를 가리지 않습니다. 같은 발동에서 이미 죽을 만큼 맞을 마물은 건너뜁니다.`,`마법탄은 발동한 뒤 날아갑니다. 닿기 전에 마물이 사라지면 빗나갑니다.`,`결계에 마물이 없으면 헛발이 됩니다. 마나는 그대로 듭니다.`])}
<h3>예</h3>
<p>${L(Z)}를 두 줄 쓰면 한 발동에 같은 잡귀에게 두 발을 쏩니다. 잡귀는 그 발동에 사라집니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`마물의 수는 칸의 수를 넘지 않습니다.`,[`원소를 띠는 것은 정령뿐입니다. 다른 종류는 원소 탄을 맞아도 피해가 1입니다.`,`sprite`]])}
<h3>관련 항목</h3>
${K(`cast`,`field`,`summoning`,`elem`,`charge`,`wisps`)}`),Q(`mana`,`마나와 폭주`,void 0,`
<p class="def"><b>마나</b>는 주문이 발동할 때 쓰는 힘입니다. 모든 주문이 같은 마나를 씁니다.</p>
<h3>규칙</h3>
${W([`쓰는 것`,`마나`],[[`cast 한 발`,`3`],{need:`boom`,cells:[`boom 한 번`,`6`]},{need:`sprite`,cells:[`summon 한 번`,`2. 끝내 나타나지 못하면 돌려받습니다.`]},{need:`mark`,cells:[`mark 한 번`,`5. 인장을 남기지 못하면 돌려받습니다.`]},[`룬 하나를 실행할 때마다`,`${i}`]])}
${W([`푼 봉인`,`최대 마나`,`1초에 차는 마나`],[[`없음`,`${w[0]}`,`${ne[0]}`],[B(`mana1`),`${w[1]}`,`${ne[1]}`],[B(`mana2`),`${w[2]}`,`${ne[2]}`]])}
${G([`마나는 결계 아래의 막대에 보입니다. 발동할 때 빠지고 시간이 지나면 다시 찹니다.`,[`되풀이 안의 룬은 되풀이할 때마다 실행 비용이 다시 듭니다.`,`for`]])}
<p><b>폭주</b>는 발동하는 도중에 마나가 모자랄 때 일어납니다.</p>
${G([`그 발동은 취소됩니다. 아무것도 쏘지 않습니다.`,[`그 발동에서 부른 것도 없던 일이 됩니다.`,`sprite`],`남은 마나를 모두 태웁니다. 마나가 0이 됩니다.`,`결계의 모든 마물이 피해 1을 입습니다. 태운 마나가 30 이상이면 피해 2입니다.`,`폭주로 죽은 마물은 정수 {ess} 1개만 남깁니다. 다른 정수와 번짐은 없습니다.`,`이어서 <b>과열</b>이 옵니다. ${F(Je)}초 + 태운 마나 ÷ ${F(1/ie)}초 동안 모든 주문이 읊지 않습니다. 창 제목 줄과 마나 막대에 ${R(C(`mana.silence`,(Je+w[0]*ie).toFixed(1)))}처럼 남은 시간이 나옵니다.`,`과열이 끝나면 모든 주문이 첫 룬부터 다시 읊습니다.`,`폭주로 잃는 것은 과열 동안의 시간뿐입니다. 모은 정수와 푼 봉인은 그대로입니다.`,[`끝나지 않는 되풀이도 폭주를 일으킵니다. 게임은 멈추지 않습니다.`,`while`],[`함수가 자기 자신을 48겹 넘게 부르는 것도 폭주를 일으킵니다.`,`def`]])}
<h3>예</h3>
<p>${L(Z)}를 ${Math.floor(w[0]/3)+1}줄 쓴 주문은 cast에만 마나가 ${(Math.floor(w[0]/3)+1)*3} 듭니다. 처음의 최대 마나 ${w[0]}보다 많으므로 그 발동은 폭주합니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`${L(`me.mana`)}는 발동이 시작될 때의 값입니다. 발동하는 동안 줄지 않습니다. 읽으려면 ${B(`read`)} 봉인이 필요합니다.`,`흩어진 발동에서도 그때까지 쓴 마나는 돌아오지 않습니다.`,[`과열 동안에도 공명은 식습니다.`,`resonance`]])}
<h3>관련 항목</h3>
${K(`me`,`cycle`,`rings`,`mana1`)}`),Q(`summoning`,`부르기`,`sprite`,`
<p class="def"><b>부르기</b>는 주문으로 고른 칸에 마물을 나타나게 하는 일입니다. 잡귀가 아닌 마물은 불러야 나옵니다.</p>
<h3>규칙</h3>
<ol>
<li>${L(`summon(x, y, 종류)`)}로 부릅니다. 마나가 2 듭니다.</li>
<li>돌려주는 값은 <b>부른 순간 그 칸에 있는 부른 마물</b>입니다. 없으면 None입니다. 잡귀는 부른 마물이 아닙니다.</li>
<li>부름은 그 발동의 마법탄, 폭발, 번짐이 모두 끝난 뒤에 이루어집니다.</li>
<li>그때 칸이 비어 있거나 잡귀가 있으면 마물이 나타납니다. 잡귀는 정수 없이 사라집니다.</li>
<li>그때 부른 마물이 남아 있으면 부름은 헛일이 됩니다. 종류가 달라도 같습니다. 마나는 돌려받습니다.</li>
<li>부른 마물은 잡힐 때까지 그 칸에 남습니다. 잡히면 칸이 비고 잡귀가 다시 솟습니다.</li>
</ol>
${G([`방금 부른 마물은 같은 발동에서 칠 수 없습니다. 가장 빨라도 다음 발동입니다.`,`${L(`cast(None)`)}은 흩어지지 않습니다. 아무 일도 없고 마나도 들지 않습니다.`,`한 발동에 25번까지 부릅니다. 헛일이 될 부름도 셉니다.`,`폭주한 발동에서 부른 것은 없던 일이 됩니다.`,`흩어진 발동은 탄과 폭발이 나가지 않습니다. 흩어지기 전에 부른 것은 이루어집니다.`])}
<h3>예</h3>
${V(Xn,`sprite`)}
${W([`발동`,`summon이 돌려주는 값`,`쏘기`,`발동이 끝난 뒤`],[[`첫째`,`None`,`없음`,`정령이 나타납니다.`],[`둘째`,`첫째 발동에 부른 정령`,`그 정령을 쏩니다.`,`정령이 잡혔으면 새 정령이 나타납니다. 남았으면 부름은 헛일입니다.`],[`셋째`,`그 칸에 있는 정령`,`그 정령을 쏩니다.`,`위와 같습니다.`]])}
<h3>헷갈리기 쉬운 점</h3>
${G([[`None에서 정보를 읽으면 흩어집니다. 다만 새긴 뒤 첫 발동은 오류로 치지 않고 상태 줄에 ${R(C(`state.calling`))}만 보입니다. 그 뒤의 발동에서 None을 만나면 오류입니다.<br>${X(`none`)}`,`read`],[`같은 발동의 scan()과 인자 없는 cast()에도 방금 부른 마물은 없습니다.`,`scan`],`사라진 잡귀를 겨누고 날아가던 마법탄은 빗나갑니다.`,[`맹수와 도깨비불도 같은 규칙으로 부릅니다. 정령이 남은 칸에는 맹수를 부를 수 없습니다.`,`beast`]])}
<h3>관련 항목</h3>
${K(`summon`,`kinds`,`mobs`,`elem`,`mana`)}`),Q(`elem`,`정령과 약점`,`sprite`,`
<p class="def"><b>정령</b>은 원소를 띤 마물입니다. 정령마다 <b>약점</b>인 원소가 하나 있습니다.</p>
<h3>규칙</h3>
${W([`정령`,`원소 이름과 값`,`약점`,`약점으로 잡으면 남는 것`],Gn.map(e=>[`${e.mob} ${e.name}`,`${L(e.code)} ${e.v}`,`${qn(e.v).name} ${L(qn(e.v).code)}`,`정수 {ess} 1개, ${e.name}의 정수 ${e.gem}`]))}
${G([`정령의 원소는 나타나는 순간에 정해지고 바로 보입니다. 부를 때마다 다시 정해집니다.`,`약점 원소로 맞히면 피해가 2입니다. 정령은 한 발에 사라지고 원소 정수를 남깁니다. 그리고 번집니다.`,`약점이 아닌 원소, 원소 없는 cast, boom, 폭주는 피해 1이고 원소 정수를 남기지 않습니다.`,`새로 부른 정령은 옆 칸에 정령이 있으면 ${En(ue)} 확률로 그 가운데 하나의 원소를 따릅니다. 아니면 세 원소 가운데 하나가 고르게 정해집니다. 그래서 같은 원소끼리 무리를 이룹니다.`,`같은 발동에서 함께 부른 정령끼리도 원소를 따릅니다.`])}
<h3>예</h3>
<p>불 정령 {fire}에게 물 원소로 쏘면 한 발에 사라집니다. 정수 {ess} 1개와 불의 정수 {gfire} 1개가 생깁니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`약점은 맞는 정령 쪽에서 정해집니다. 불 정령에게는 불이 아니라 물을 쏩니다.`,`원소를 띠는 것은 정령뿐입니다. 잡귀에게 원소 탄을 쏘아도 피해는 1입니다.`,`원소 이름은 대문자로 씁니다. ${L(`water`)}라고 쓰면 다음 글이 뜹니다.<br>${X(`lower`)}`])}
<h3>관련 항목</h3>
${K(`chain`,`elems`,`cast`,`summoning`,`sigil`)}`),Q(`chain`,`번짐`,`sprite`,`
<p class="def"><b>번짐</b>은 약점으로 죽은 정령 옆의 같은 원소 정령이 함께 터지는 일입니다.</p>
<h3>규칙</h3>
${G([`약점으로 죽은 정령의 위·아래·왼쪽·오른쪽 칸을 봅니다. 대각선은 보지 않습니다.`,`그 칸의 정령이 같은 원소이면 같은 공격을 받아 약점으로 죽습니다.`,`번져서 죽은 정령에서 다시 번집니다. 이어진 무리가 모두 터집니다.`,`한 번 번지는 데 ${F(je)}초 걸립니다.`,`약점이 아닌 공격으로 죽은 정령은 번지지 않습니다.`,`잡귀와 다른 종류의 마물에게는 번지지 않습니다.`])}
<p>정령마다 정수 {ess} 1개를 남기고, 원소 정수는 몇 번 번져서 죽었는지에 따라 다르게 남깁니다.</p>
${W([`죽은 정령`,`원소 정수`],Array.from({length:6},(e,t)=>[t===0?`직접 맞은 정령`:t===5?`${t}번 이상 번져서 죽은 정령`:`${t}번 번져서 죽은 정령`,`${t+1}개`]))}
<h3>예</h3>
<p>(0, 0), (1, 0), (2, 0)에 불 정령이 이어져 있습니다. (0, 0)의 정령을 물로 쏘면 셋이 모두 죽습니다. 불의 정수 {gfire}는 1 + 2 + 3 = 6개, 정수 {ess}는 3개가 생깁니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`직접 맞아 죽은 정령은 언제나 원소 정수를 1개 남깁니다.`,`boom이나 폭주로 죽은 정령은 번지지 않고 원소 정수도 남기지 않습니다.`,`번짐이 끝나야 그 발동의 부름이 이루어집니다. 번져서 빈 칸에도 같은 발동의 부름이 들어갑니다.`,[`번져서 여러 마리를 잡아도 그 발동이 올리는 공명은 1입니다.`,`resonance`]])}
<h3>관련 항목</h3>
${K(`elem`,`summoning`,`stats`)}`),Q(`charge`,`맹수와 기세`,`beast`,`
<p class="def"><b>맹수</b>는 <b>기세</b>를 모아 반격하는 마물입니다. 기세가 높을 때 잡을수록 기세의 정수 {gzeal}를 많이 남깁니다.</p>
<h3>규칙</h3>
<ol>
<li>맹수는 나타난 뒤 약 ${F(be)}초마다 기세를 1 모읍니다. 맹수마다 ${En(Se)}까지 빠르거나 느립니다.</li>
<li>기세는 0에서 시작해 3까지 오릅니다. 맹수 둘레의 오라로 보입니다.</li>
<li>기세가 ${dr(3,`이/가`)} 되면 ${F(Te)}초 동안 <b>예고</b> 동작을 합니다. 이 사이에 죽으면 쏘지 못합니다.</li>
<li>예고가 끝나면 <b>반격</b>을 쏩니다. 기세는 0으로 돌아가고 다시 모으기 시작합니다.</li>
<li>반격이 닿으면 <b>끊김</b>이 일어납니다. 읊는 중인 주문 가운데 가장 많이 읊은 주문이 룬 3개만큼 물러납니다.</li>
<li>끊김 뒤 ${F(Ie)}초 동안은 다른 반격이 닿아도 끊기지 않습니다.</li>
</ol>
${W([`죽는 순간의 기세`,`남기는 기세의 정수 {gzeal}`],g.map((e,t)=>[`${t}`,e?`${e}개`:`없음`]))}
${G([`맹수는 잡힐 때 정수 {ess} 1개도 남깁니다.`,`폭주로 죽은 맹수는 기세의 정수를 남기지 않습니다.`,`읊는 중인 주문이 없으면 반격이 닿아도 아무 일이 없습니다. 발동 중, 새기는 중, 과열 중인 주문은 끊기지 않습니다.`,`이미 떠난 반격은 맹수가 죽어도 날아옵니다.`,`기세는 ${L(`m.charge`)}로 읽습니다.`])}
<h3>예</h3>
<p>기세가 2인 맹수를 잡으면 정수 {ess} 1개와 기세의 정수 {gzeal} ${g[2]}개가 생깁니다. 같은 맹수를 기세 1에서 잡았다면 ${g[1]}개입니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`끊김으로 잃는 것은 시간뿐입니다. 정수와 마나는 줄지 않습니다.`,`맹수는 원소가 없습니다. 원소 탄을 맞아도 피해는 1이고, 번지지 않습니다.`,[`맹수는 약점이 없어 공명을 올리지 못합니다. 끊겨서 다시 읊는 박자만큼 공명은 더 식습니다.`,`resonance`],`주문 창의 ${R(C(`stat.knocked`,3))} 표시는 새긴 뒤로 끊겨 물러난 룬의 합입니다.`])}
<h3>관련 항목</h3>
${K(`k-beast`,`mob`,`summoning`,`cycle`)}`),Q(`reson`,`공명`,`resonance`,`
<p class="def"><b>공명</b>은 고리에 쌓이는 힘입니다. 발동으로 얻는 정수에 (1 + 공명)이 곱해집니다.</p>
<h3>규칙</h3>
<ol>
<li>고리마다 공명을 따로 가집니다. 처음에는 0입니다.</li>
<li>발동할 때, 그 발동으로 얻는 모든 정수에 (1 + 그 순간의 공명)이 곱해집니다. 이 값이 <b>공명 배수</b>입니다.</li>
<li>그 발동이 <b>그 고리가 부른 정령</b>을 약점으로 한 마리 이상 잡으면 공명이 1 오릅니다. 번져서 잡은 것도 칩니다. 몇 마리를 잡든 1입니다.</li>
<li>고리가 한 박자를 보낼 때마다 공명에 ${dr(F(c),`이/가`)} 곱해집니다. 읊는 박자, 발동하는 박자, 과열이나 각인으로 멈춘 박자, 고리가 비어 있는 박자 모두 식습니다.</li>
</ol>
${G([`상한은 없습니다.`,`곱해서 생긴 소수는 고리에 쌓아 두었다가 1이 되면 줍니다.`,`주문을 다시 새겨도 공명은 고리에 남습니다.`,`공명을 올리는 것은 그 고리가 부른 정령을 약점으로 잡는 일뿐입니다. 잡귀, 맹수, 도깨비불, boom, 약점이 아닌 탄은 올리지 못합니다.`,`다른 고리가 부른 정령을 약점으로 잡으면 정수는 그대로 얻고 공명 배수도 곱해집니다. 다만 공명은 오르지 않습니다.`,`주문을 다시 새겨도 그 고리가 부른 정령은 그 고리의 것입니다.`,`폭주로 죽은 마물의 정수에는 곱해지지 않습니다.`])}
<p>매 발동 약점으로 잡는 주문의 공명 배수는 1 ÷ (1 − ${F(c)}<sup>룬 수 + 5</sup>)에 가까워집니다.</p>
${W([`룬 수`,`한 바퀴의 박자`,`공명 배수`],[8,10,12,16,20,24,28,32].map(e=>[`${e}`,`${e+5}`,jn(e)]))}
<h3>예</h3>
<p>공명 배수가 ×2.00일 때 불 정령을 약점으로 잡으면 정수 {ess} 2개와 불의 정수 {gfire} 2개가 생깁니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`식는 기준은 초가 아니라 박자입니다. 빠른 혀를 풀어도 같은 주문의 배수는 같습니다. 한 바퀴만 짧아집니다.`,`맹수나 도깨비불의 정수에도 공명 배수가 곱해집니다. 다만 그 발동은 공명을 올리지 못합니다.`,`그 고리가 부른 정령을 약점으로 잡지 못한 발동이 끼면 배수는 표의 값보다 낮아집니다.`,[`맹수의 반격에 끊기면 다시 읊는 박자만큼 더 식습니다.`,`beast`]])}
<h3>관련 항목</h3>
${K(`resonance`,`runes`,`cycle`,`rings`,`chain`)}`),Q(`wisps`,`도깨비불`,`wisp`,`
<p class="def"><b>도깨비불</b>은 나타난 순간이 가장 값진 마물입니다. 시간이 지나면 바래다 흩어집니다.</p>
<h3>규칙</h3>
${G([`나타났을 때 3단입니다. ${F(1)}초마다 한 단씩 바랩니다.`,`${F(3)}초가 지나면 아무것도 남기지 않고 흩어집니다. 칸이 비고 잡귀가 다시 솟습니다.`,`체력이 1입니다. 한 발이면 잡힙니다.`,`잡으면 정수 {ess} 1개와, 잡는 순간의 단만큼 도깨비불의 정수 {gglow}를 남깁니다.`,`폭주로 죽으면 도깨비불의 정수를 남기지 않습니다.`,`원소도 기세도 없습니다. 번지지 않고 공명을 올리지 못합니다.`])}
${W([`부른 뒤 지난 시간`,`단`,`잡으면 남기는 도깨비불의 정수 {gglow}`],[...Array.from({length:3},(e,t)=>[`${F(1*t)}초 ~ ${F(1*(t+1))}초`,`${3-t}`,`${3-t}개`]),[`${F(3)}초`,`흩어짐`,`없음`]])}
<h3>예</h3>
<p>한 바퀴가 ${kn(or)}초인 주문이 도깨비불을 부르고 다음 발동에 잡습니다. 부른 뒤 ${kn(or)}초가 지났으므로 ${3-Math.floor(S(I(or),On)/1)}단에서 잡습니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`단은 주문에서 읽을 수 없습니다. 결계에서 눈으로 봅니다.`,`부른 발동에는 잡을 수 없습니다. 잡는 순간은 가장 빨라도 다음 발동입니다.`,`도깨비불이 남아 있는 칸에는 다른 마물을 부를 수 없습니다. 흩어지거나 잡혀야 칸이 빕니다.`])}
<h3>관련 항목</h3>
${K(`k-wisp`,`summoning`,`cycle`)}`),Q(`sigil`,`인장과 원소 각인`,`mark`,`
<p class="def"><b>인장</b>은 칸에 남기는 원소의 표시입니다. 인장이 있는 칸에 부른 정령은 그 원소로 나타납니다.</p>
<h3>규칙</h3>
${G([`${L(`mark(x, y, 원소)`)}로 남깁니다. 마나가 5 듭니다.`,`인장은 ${F(4)}초 동안 남습니다. 그 안에 그 칸에 부른 정령이 인장의 원소로 나타납니다.`,`인장은 정령 하나에 쓰이면 사라집니다.`,`부른 마물이 없는 칸에만 남습니다. 빈 칸과 잡귀가 있는 칸입니다. 부른 마물이 남아 있으면 인장은 남지 않고 마나를 돌려받습니다.`,`각인도 부름처럼 그 발동의 탄, 폭발, 번짐이 끝난 뒤에 이루어집니다. 부름과 각인은 적힌 순서대로 처리됩니다.`,`인장은 결계에 남은 표시입니다. 다른 주문의 부름도 그 인장을 씁니다.`,`맹수와 도깨비불은 인장을 쓰지 않습니다. 인장은 그대로 남습니다.`,`한 발동에 25번까지 남깁니다.`])}
<h3>예</h3>
${V(sr,`mark`)}
${U([[`mark(1, 1, FIRE)`,`한가운데 칸에 불의 인장을 남기라고 적어 둡니다.`],[`cast(summon(1, 1, SPRITE), WATER)`,`그 칸에 있던 정령을 물로 쏘고, 정령을 부르라고 적어 둡니다.`]])}
<p>발동이 끝나면 탄이 먼저 닿고, 그다음 인장이 남고, 그다음 정령이 불 원소로 나타납니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`정령 한 마리에 드는 마나가 늘어납니다. 부르기 2, 각인 5, 쏘기 3입니다.`,`부름을 각인보다 먼저 적으면 정령이 먼저 나타나고, 인장은 남지 않습니다.`,`${X(`markElem`)}<br>원소 자리에 원소가 아닌 값을 넣었습니다.`])}
<h3>관련 항목</h3>
${K(`mark`,`elem`,`summoning`,`mana`)}`),Q(`rings`,`고리와 주문 여러 개`,void 0,`
<p class="def"><b>고리</b>는 새겨진 주문이 도는 자리입니다. 고리 하나에 주문 하나가 돕니다.</p>
<h3>규칙</h3>
${G([`주문은 6개까지 둡니다. ‘새 주문’(+) 단추를 누르면 주문이 하나 늘어납니다. 새 주문의 글상자에는 ${L(Z)}가 초안으로 적혀 있고 상태는 ${R(C(`state.stopped`))}입니다.`,`동시에 도는 주문의 수는 고리의 수와 같습니다. 처음에는 고리가 1개, ${B(`ring2`)} 봉인을 풀면 2개입니다.`,`고리가 하나일 때 멈춘 주문을 새기면 돌던 주문이 멈추고 그 자리를 넘겨받습니다.`,`고리가 둘 이상이고 모두 찼을 때 새기면 다음 글이 뜹니다.<br>${R(`${Bn} · ${Wn}`)}`,`모든 주문이 같은 마나를 씁니다. 성적은 주문마다 따로 잽니다.`,[`공명은 고리마다 따로 쌓입니다. 그 고리가 부른 정령을 그 고리가 약점으로 잡아야 오릅니다.`,`resonance`]])}
${W([`단추`,`하는 일`],[[`멈춤`,`주문을 고리에서 내립니다. 글은 남습니다.`],[`버리기 (휴지통 그림)`,`주문과 그 창을 지웁니다. 두 번 눌러야 지워집니다. 주문이 하나뿐이면 버릴 수 없습니다.`],[`닫기 (×)`,`주문 창만 닫습니다. 주문은 계속 돕니다. 위쪽 표시줄의 주문 목록에서 다시 엽니다.`],[`창 정렬`,`모든 창을 처음 자리로 돌려놓습니다.`],[`처음부터`,`모은 정수와 푼 봉인, 적어 둔 주문을 모두 지우고 새로 시작합니다. 두 번 눌러야 지워집니다.`]])}
<h3>예</h3>
<p>고리가 하나일 때 ‘${C(`world.spellName`,1)}’이 돌고 있습니다. ‘${C(`world.spellName`,2)}’의 인장(각인)을 누르면 ‘${C(`world.spellName`,1)}’은 ${R(C(`state.stopped`))}이 되고 ‘${C(`world.spellName`,2)}’가 돕니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`안내서의 ‘${C(`docs.copy`)}’는 마지막으로 누른 주문 창에 들어갑니다.`,`두 주문이 같은 마물을 노리면 그 마물에게 두 주문이 모두 쏩니다.`,[`결계는 하나입니다. 한 주문이 부른 마물을 다른 주문이 칠 수 있습니다.`,`sprite`]])}
<h3>관련 항목</h3>
${K(`draft`,`mana`,`stats`)}`),Q(`tree`,`봉인의 나무`,void 0,`
<p class="def"><b>봉인</b>은 정수를 내고 푸는 성장 단계입니다. <b>봉인의 나무</b>는 모든 봉인과 그 순서를 보여 주는 화면입니다.</p>
<h3>규칙</h3>
${G([`‘봉인의 나무’를 누르거나 T 키를 누르면 열립니다. ‘결계로 돌아가기’나 Esc 키로 닫습니다. 열어 둔 동안에도 주문은 돕니다.`,`봉인은 ${E.length}칸입니다. 갈래는 ${ct.join(`, `)}입니다.`,`선으로 이어진 왼쪽 봉인을 모두 풀어야 오른쪽 봉인을 풉니다.`,`봉인 한 칸은 한 가지만 풉니다. 칸에 적힌 것이 풀리는 것의 전부입니다.`,`풀면 값만큼 정수가 빠집니다. 안내서에 쪽이 생기고, 돌고 있는 주문의 ‘이번’을 다시 잽니다.`,`봉인을 풀어도 결계의 마물은 바뀌지 않습니다. 새 마물은 주문으로 불러야 나옵니다.`,`‘봉인의 나무’ 단추의 붉은 점은 지금 풀 수 있는 봉인이 있다는 표시입니다. ‘안내서’ 단추의 붉은 점은 아직 읽지 않은 쪽이 있다는 표시입니다.`])}
${W([`봉인 칸의 표시`,`뜻`],[[C(`tree.state.owned`),`푼 봉인입니다.`],[`${C(`tree.state.can`)}, ‘${C(`tree.buy`)}’ 단추`,`지금 풀 수 있습니다.`],[C(`tree.state.lack`),`앞 봉인은 풀었지만 정수가 모자랍니다. 모자란 값이 붉게 적힙니다.`],[C(`tree.state.locked`),`선으로 이어진 왼쪽 봉인을 아직 풀지 않았습니다.`]])}
<h3>예</h3>
<p>${B(`grid3`)}의 값은 ${Nn(`grid3`)}입니다. 풀면 결계가 3×3이 됩니다.</p>
<h3>헷갈리기 쉬운 점</h3>
${G([`풀지 않은 말을 쓴 글은 새겨지지 않습니다. 이때 다음처럼 그 말을 푸는 봉인의 이름이 나옵니다.<br>${Y(Yn,`grid3`)}`,`정수의 종류마다 얻는 마물이 다릅니다. 원소 정수는 정령, 기세의 정수는 맹수, 도깨비불의 정수는 도깨비불에게서 나옵니다.`])}
<h3>관련 항목</h3>
${K(`field`,`mobs`)}`)],hr=(e,t)=>$(e,xn(e).title,e,`
<p>룬 하나를 읊는 박자가 ${F(We[t-1])}초에서 ${F(We[t])}초로 줄어듭니다. 모든 주문의 한 바퀴가 그만큼 짧아집니다.</p>
${Pn(e)}
<h3>예제</h3>
${W([`주문`,`박자 ${F(We[t-1])}초일 때 한 바퀴`,`박자 ${F(We[t])}초일 때 한 바퀴`],[3,10,20,30].map(e=>[`${e}룬`,`${S(e,We[t-1]).toFixed(2)}초`,`${S(e,We[t]).toFixed(2)}초`]))}
<h3>주의</h3>
${G([`한 바퀴가 짧아지면 같은 시간에 마나를 더 자주 씁니다.`,[`공명 배수는 박자의 수로 정해지므로 바뀌지 않습니다.`,`resonance`],[`맹수가 기세를 모으는 빠르기는 바뀌지 않습니다.`,`beast`]])}
<h3>관련 항목</h3>
${K(`cycle`,`runes`,`mana`)}`),gr=(e,t)=>$(e,xn(e).title,e,`
<p>최대 마나가 ${w[t-1]}에서 ${dr(w[t],`으로/로`)}, 1초에 차는 마나가 ${ne[t-1]}에서 ${dr(ne[t],`으로/로`)} 늘어납니다.</p>
${Pn(e)}
<h3>예제</h3>
${W([`한 발동에 쓰는 것`,`마나`,`최대 마나 ${w[t-1]}`,`최대 마나 ${w[t]}`],[5,9,15,20].map(e=>{let n=e*5,r=e=>n<e?`폭주하지 않음`:`폭주`;return[`${e}칸에 부르고 한 발씩 쏘기`,`${n}`,r(w[t-1]),r(w[t])]}))}
<p>마나가 가득 찬 채로 발동했을 때의 판정입니다. 룬 실행 비용은 넣지 않았습니다.</p>
<h3>주의</h3>
${G([`폭주하지 않아도, 한 바퀴에 쓰는 마나가 그동안 차는 마나보다 많으면 몇 바퀴 뒤에 바닥납니다.`])}
<h3>관련 항목</h3>
${K(`mana`,`me`)}`),_r=[$(`cast`,`cast`,void 0,`
${H(`cast()`,`cast(마물)`,`cast(마물, 원소)`)}
<p>마물 하나에게 마법탄을 한 발 쏩니다. 마법탄은 발동한 뒤에 날아가 맞습니다.</p>
${q({arg:`마물: ${L(`summon`)}이나 ${L(`scan()`)}으로 얻은 마물. 빼면 가장 오래된 마물을 쏩니다. None이면 아무 일도 없습니다.<br>원소: ${L(`FIRE`)}, ${L(`WATER`)}, ${L(`NATURE`)} 또는 그 값. 빼면 원소 없이 쏩니다.`,ret:`None`,mana:`3. 마물 자리가 None이면 들지 않습니다.`,need:`없음. 마물과 원소를 넣을 말은 ${B(`sprite`)} 봉인에서 풀립니다.`})}
<h3>예제</h3>
${V(Jn)}
${U([[`cast()`,`가장 오래된 마물에게 한 발 쏩니다.`],[`cast()`,`한 발 더 쏩니다. 앞의 한 발로 죽지 않을 마물이므로 같은 마물을 쏩니다.`]])}
<h3>주의</h3>
${G([`인자 없는 cast()는 같은 발동에서 이미 죽을 만큼 맞을 마물을 건너뜁니다.`,`결계에 마물이 없으면 헛발이 됩니다. 마나는 그대로 듭니다.`,`${X(`castArg`)}<br>첫 인자가 마물이 아닙니다.`,[`${X(`castMany`)}<br>인자가 셋 이상입니다.`,`sprite`],[`한 발동에 32발까지 쏩니다. 넘으면 다음 글이 뜹니다.<br>${X(`castCap`)}`,`for`]])}
<h3>관련 항목</h3>
${K(`mobs`,`mana`,`summon`,`elem`)}`),$(`print`,`print`,void 0,`
${H(`print(값, …)`)}
<p>값을 주문 창의 ${R(`»`)} 표시 뒤에 적습니다. 값이 여럿이면 띄어 적습니다.</p>
${q({arg:`아무 값이나 여러 개`,ret:`None`,mana:J,need:`없음`})}
<h3>예제</h3>
${V(`cast()
print("쐈다")`)}
<p>발동할 때마다 주문 창에 ${R(C(`spell.printed`,`쐈다`))} 표시가 나옵니다.</p>
<h3>주의</h3>
${G([`한 발동에 여러 번 부르면 마지막 것만 보입니다. 다음 print가 불릴 때까지 남습니다.`,[`마물을 적으면 ${R(`<${C(`obj.mob`)} x=1 y=1 hp=2 kind=1 elem=1 charge=0>`)}처럼 나옵니다.`,`sprite`],`문자열은 8글자마다 룬이 1개씩 늘어납니다.`])}
<h3>관련 항목</h3>
${K(`runes`,`errors`)}`),$(`me`,`me.mana`,void 0,`
${H(`me.mana`)}
<p>발동이 시작될 때의 마나를 정수로 돌려줍니다. 소수점 아래는 버립니다.</p>
${q({arg:`없음`,ret:`숫자`,mana:J,need:`${B(`read`)}. ${L(`me`)}라는 이름은 처음부터 있지만, 점으로 읽는 문법이 이 봉인에서 풀립니다.`})}
<h3>예제</h3>
${V(`print(me.mana)`,`read`)}
<p>발동할 때마다 주문 창에 그때의 마나가 찍힙니다.</p>
<h3>주의</h3>
${G([`발동하는 동안 값이 줄지 않습니다.`,[`me.mana만 보고 멈추는 while은 끝나지 않고 폭주합니다.`,`while`],[`${X(`meAttr`)}<br>me에는 mana만 있습니다.`,`read`],`${Y(`print(me.mana)`,``)}<br>${B(`read`)} 봉인을 아직 풀지 않았습니다.`])}
<h3>관련 항목</h3>
${K(`mana`,`mob`)}`),$(`grid3`,xn(`grid3`).title,`grid3`,`
<p>결계가 1칸에서 가로 3칸, 세로 3칸으로 넓어집니다. 위쪽 표시줄에 ‘초당’과 ‘최고’가 나타납니다.</p>
${Pn(`grid3`)}
<h3>예제</h3>
<table class="grid">${[0,1,2].map(e=>`<tr>${[0,1,2].map(t=>`<td>(${t}, ${e})</td>`).join(``)}</tr>`).join(``)}</table>
<p>3×3 결계의 좌표입니다. 한가운데는 (1, 1)입니다.</p>
<h3>주의</h3>
${G([`있던 마물은 가운데 칸으로 옮겨집니다.`,`새 칸에는 잡귀가 저절로 솟습니다.`,`날아가던 마법탄은 사라집니다.`])}
<h3>관련 항목</h3>
${K(`field`,`mobs`,`stats`)}`),$(`boom`,`boom`,`boom`,`
${H(`boom(x, y)`)}
<p>(x, y) 칸과 그 위·아래·왼쪽·오른쪽 칸을 함께 터뜨립니다. 칸마다 마물에게 피해 1을 줍니다.</p>
${q({arg:`x, y: 칸의 좌표. 0부터 결계의 한 변 − 1까지의 정수.`,ret:`None`,mana:`6`,need:B(`boom`)})}
<h3>예제</h3>
${V(Yn)}
<p>3×3 결계의 한가운데를 중심으로 십자 모양 다섯 칸을 터뜨립니다.</p>
<h3>주의</h3>
${G([`결계 밖으로 나간 칸은 버려집니다. boom(0, 0)은 세 칸만 터뜨립니다.`,[`boom에는 원소가 없습니다. 약점을 찌르지 않고 번지지 않습니다.`,`sprite`],`${X(`boomOut`)}<br>좌표가 결계 밖입니다. 3×3 결계에서 뜨는 글입니다.`,`${X(`boomArgs`)}<br>좌표를 하나만 넣었습니다.`,`한 발동에 16번까지 터뜨립니다.`])}
<h3>관련 항목</h3>
${K(`field`,`mobs`,`mana`)}`),hr(`tempo1`,1),$(`summon`,`summon`,`sprite`,`
${H(`summon(x, y, 종류)`)}
<p>(x, y) 칸에 마물을 부르고, 지금 그 칸에 있는 부른 마물을 돌려줍니다.</p>
${q({arg:`x, y: 칸의 좌표. 0부터 결계의 한 변 − 1까지의 정수.<br>종류: ${L(`SPRITE`)}. 봉인을 더 풀면 ${L(`BEAST`)}, ${L(`WISP`)}.`,ret:`부른 순간 그 칸에 있는 부른 마물. 없으면 None. 방금 부른 마물이 아닙니다.`,mana:`2. 끝내 나타나지 못하면 돌려받습니다.`,need:B(`sprite`)})}
<h3>예제</h3>
${V(Xn)}
${U([[`summon(1, 1, SPRITE)`,`한가운데 칸에 정령을 부릅니다. 지금 그 칸에 있는 부른 마물을 돌려줍니다.`],[`cast(…, WATER)`,`돌려받은 마물에게 물 원소로 쏩니다. None이면 아무 일도 없습니다.`]])}
<p>매 발동 지난번에 부른 정령을 쏘고, 그 자리가 비면 다시 부릅니다.</p>
<h3>주의</h3>
${G([`부름은 그 발동의 탄, 폭발, 번짐이 끝난 뒤에 이루어집니다. 방금 부른 마물은 같은 발동에서 칠 수 없습니다.`,`부른 마물이 남아 있는 칸에는 부름이 헛일이 됩니다. 종류가 달라도 같습니다.`,`${X(`summonOut`)}<br>좌표가 결계 밖입니다.`,`${X(`summonArgs`)}<br>종류를 넣지 않았습니다.`,`${X(`summonImp`)}<br>잡귀는 저절로 솟을 뿐입니다.`,`${X(`summonKind`)}<br>없는 종류입니다.`,`${X(`summonSealed`)}<br>그 종류를 부르는 봉인을 아직 풀지 않았습니다.`,[`한 발동에 25번까지 부릅니다. 넘으면 다음 글이 뜹니다.<br>${X(`summonCap`)}`,`for`]])}
<h3>관련 항목</h3>
${K(`summoning`,`kinds`,`cast`,`mana`)}`),$(`kinds`,`SPRITE IMP`,`sprite`,`
${H(`SPRITE`,`IMP`)}
<p>마물의 종류를 가리키는 이름입니다. 이름마다 값이 정해져 있습니다.</p>
${W([`이름`,`종류`,`값`,`부를 수 있나`],[[L(`IMP`),`{blob} 잡귀`,`0`,`부를 수 없습니다. 저절로 솟습니다.`],[L(`SPRITE`),`{fire} 정령`,`1`,`부를 수 있습니다.`],{need:`beast`,cells:[L(`BEAST`),`맹수`,`2`,`부를 수 있습니다.`]},{need:`wisp`,cells:[L(`WISP`),`도깨비불`,`3`,`부를 수 있습니다.`]}])}
${q({arg:`없음`,ret:`숫자`,mana:J,need:B(`sprite`)})}
<h3>예제</h3>
${V(`print(IMP, SPRITE)`)}
<p>주문 창에 ${R(C(`spell.printed`,`0 1`))} 표시가 나옵니다.</p>
<h3>주의</h3>
${G([`대문자로 씁니다.`,[`마물의 종류는 ${L(`m.kind`)}로 읽습니다. 이 이름들과 비교합니다.`,`read`]])}
<h3>관련 항목</h3>
${K(`summon`,`mobs`,`mob`)}`),$(`elems`,`FIRE WATER NATURE`,`sprite`,`
${H(`FIRE`,`WATER`,`NATURE`)}
<p>원소의 이름입니다. 이름마다 값이 정해져 있습니다.</p>
${W([`이름`,`원소`,`값`],Gn.map(e=>[L(e.code),`${e.mob} ${e.name}`,`${e.v}`]))}
${q({arg:`없음`,ret:`숫자`,mana:J,need:B(`sprite`)})}
<h3>예제</h3>
${V(`print(FIRE, WATER, NATURE)`)}
<p>주문 창에 ${R(C(`spell.printed`,`1 2 3`))} 표시가 나옵니다.</p>
<h3>주의</h3>
${G([`대문자로 씁니다. 소문자로 쓰면 다음 글이 뜹니다.<br>${X(`lower`)}`,`값을 숫자로 써도 같습니다. ${L(`cast(m, 2)`)}는 ${L(`cast(m, WATER)`)}와 같습니다.`,`원소가 없는 마물의 원소 값은 0입니다.`])}
<h3>관련 항목</h3>
${K(`elem`,`cast`,`mark`)}`),$(`assign`,`이름 붙이기 =`,`assign`,`
${H(`이름 = 값`)}
<p>값에 이름을 붙입니다. 그 줄 아래에서 이름을 쓰면 그 값을 가리킵니다.</p>
${q({arg:`없음`,ret:`없음`,mana:J,need:B(`assign`)})}
${G([`이름에는 글자, 숫자, 밑줄을 씁니다. 한글도 됩니다. 숫자로 시작할 수 없습니다.`,`if, for 같은 문법의 말은 이름으로 쓸 수 없습니다.`,`이름은 그 발동 안에서만 기억됩니다. 다음 발동은 아무 이름도 없이 시작합니다.`])}
<h3>예제</h3>
${V(`목표 = summon(1, 1, SPRITE)
cast(목표, NATURE)`)}
<h3>주의</h3>
${G([`${X(`before`)}<br>이름을 붙이기 전에 썼습니다.`,[`${L(`=`)}는 이름 붙이기, ${L(`==`)}는 같은지 묻기입니다.`,`if`],[`${L(`x, y = …`)}처럼 여러 이름에 나눠 붙이는 것은 ${z(`tuple`)} 쪽에 있습니다.`,`list`]])}
<h3>관련 항목</h3>
${K(`summon`,`runes`)}`),$(`mob`,`마물의 정보`,`read`,`
${H(`m.x`,`m.y`,`m.hp`,`m.kind`,`m.elem`,`m.charge`)}
<p>${L(`summon`)}이나 ${L(`scan()`)}으로 얻은 마물의 정보를 점(.)을 찍어 읽습니다. 여섯 가지가 어느 종류에나 있습니다.</p>
${W([`이름`,`값`],[[L(`x`),`가로 좌표`],[L(`y`),`세로 좌표`],[L(`hp`),`남은 체력. 처음에는 2`],[L(`kind`),`종류의 값. 잡귀 0, 정령 1, 맹수 2, 도깨비불 3`],[L(`elem`),`원소의 값. ${Gn.map(e=>`${e.name} ${e.v}`).join(`, `)}. 정령이 아니면 0`],[L(`charge`),`기세. 0부터 3까지. 맹수가 아니면 0`]])}
${q({arg:`없음`,ret:`숫자`,mana:J,need:B(`read`)})}
<h3>예제</h3>
${V(Qn)}
${U([[`m = summon(1, 1, SPRITE)`,`부른 마물에 m이라는 이름을 붙입니다.`],[`print(m.elem)`,`m의 원소를 주문 창에 적습니다.`]])}
<h3>주의</h3>
${G([ur,`${X(`attr`)}<br>없는 정보를 읽었습니다.`,`${Y(`m = summon(1, 1, SPRITE)
m.hp = 0`,`read`)}<br>마물의 정보는 읽기만 합니다.`,`읽은 값은 그 발동이 시작될 때의 값입니다. 같은 발동에서 쏘아도 hp는 바뀌지 않습니다.`])}
<h3>관련 항목</h3>
${K(`summon`,`kinds`,`elems`,`me`)}`),$(`if`,`if elif else`,`if`,`
${H(`if 조건:`,`    할 일`,`elif 조건:`,`    할 일`,`else:`,`    할 일`)}
<p>조건에 따라 다른 줄을 실행합니다. 위에서부터 따져 처음으로 참인 갈래 하나만 실행합니다.</p>
${q({arg:`없음`,ret:`없음`,mana:J,need:B(`if`)})}
${G([`if 줄과 elif 줄, else 줄은 쌍점(:)으로 끝납니다.`,`갈래에 딸린 줄은 네 칸 들여 씁니다. 같은 깊이로 들여 쓴 줄이 모두 그 갈래에 딸립니다.`,`elif와 else는 빼도 됩니다. 맞는 갈래가 없으면 아무것도 하지 않습니다.`,`할 일이 없는 갈래에는 pass를 씁니다.`,`조건 자리에 값만 써도 됩니다. 0, None, 빈 문자열은 거짓이고 나머지는 참입니다.`])}
<h3>예제</h3>
${V(`m = summon(1, 1, SPRITE)
if m:
    cast(m, WATER)
else:
    boom(1, 1)`)}
${U([[`m = summon(1, 1, SPRITE)`,`부른 마물에 m이라는 이름을 붙입니다.`],[`if m:`,`m이 None이 아니면`],[`    cast(m, WATER)`,`m에게 물 원소로 쏩니다.`],[`else:`,`아니면`],[`    boom(1, 1)`,`한가운데를 터뜨립니다.`]])}
<h3>주의</h3>
${G([`${Y(`if me.mana > 9:
cast()`,`if`)}<br>들여 쓰지 않았습니다.`,`${Y(`if 1:
    cast()
  cast()`,`if`)}<br>들여쓰기 칸 수가 위 줄과 다릅니다.`,`${Y(`cast()
elif 1:
    cast()`,`if`)}<br>elif 앞에 if가 없습니다.`])}
<h3>관련 항목</h3>
${K(`compare`,`mob`,`logic`)}`),$(`compare`,`비교`,`if`,`
${H(`a == b`,`a != b`,`a < b`,`a > b`,`a <= b`,`a >= b`,`a is b`,`a is not b`)}
<p>두 값을 비교해 참(True)이나 거짓(False)을 돌려줍니다.</p>
${W([`기호`,`참이 되는 때`],[[L(`==`),`두 값이 같을 때`],[L(`!=`),`두 값이 다를 때`],[`${L(`<`)} ${L(`>`)}`,`왼쪽이 작을 때, 왼쪽이 클 때`],[`${L(`<=`)} ${L(`>=`)}`,`왼쪽이 작거나 같을 때, 왼쪽이 크거나 같을 때`],[`${L(`is`)} ${L(`is not`)}`,`같은 것일 때, 같은 것이 아닐 때`],{need:`list`,cells:[`${L(`in`)} ${L(`not in`)}`,`목록 안에 있을 때, 없을 때. ${B(`list`)} 봉인에서 풀립니다.`]}])}
${q({arg:`없음`,ret:`True 또는 False`,mana:J,need:B(`if`)})}
<h3>예제</h3>
${V(`if 10 < me.mana < 50:
    cast()`)}
<p>마나가 10보다 많고 50보다 적을 때만 쏩니다. 이어 쓴 비교는 룬 1개입니다.</p>
<h3>주의</h3>
${G([`${Y(`if me.mana = 9:
    cast()`,`if`)}<br>같은지 물을 때는 ${L(`==`)}를 씁니다.`,`None인지 물을 때는 ${L(`m is None`)}이나 ${L(`m is not None`)}을 씁니다.`])}
<h3>관련 항목</h3>
${K(`if`,`logic`)}`),$(`k-beast`,`BEAST`,`beast`,`
${H(`BEAST`,`summon(x, y, BEAST)`)}
<p>맹수를 가리키는 종류 이름입니다. 값은 2입니다. ${L(`summon`)}의 종류 자리에 넣으면 맹수를 부릅니다.</p>
${q({arg:`없음`,ret:`숫자`,mana:J,need:B(`beast`)})}
<h3>예제</h3>
${V(tr)}
${U([[`m = summon(1, 1, BEAST)`,`한가운데 칸에 맹수를 부르고, 지금 그 칸에 있는 부른 마물에 m이라는 이름을 붙입니다.`],[`if m.charge > 0:`,`m의 기세가 0보다 크면 아래 줄을 실행합니다.`],[`    cast(m)`,`m에게 한 발 쏩니다.`],[`    cast(m)`,`한 발 더 쏩니다.`]])}
<h3>주의</h3>
${G([`맹수의 체력은 2입니다. 약점이 없어 두 발이 필요합니다.`,`기세가 0일 때 잡으면 기세의 정수를 남기지 않습니다.`,lr(`charge`),`${X(`summonSealed`)}<br>봉인을 풀기 전에 값 ${dr(2,`을/를`)} 직접 적었을 때 뜨는 글입니다.`])}
<h3>관련 항목</h3>
${K(`charge`,`summon`,`mob`,`kinds`)}`),$(`math`,`셈`,`math`,`
${H(`a + b`,`a - b`,`a * b`,`a / b`,`a // b`,`a % b`,`a ** b`,`-a`,`n += 1`)}
<p>숫자를 계산합니다.</p>
${W([`기호`,`뜻`,`예`,`값`],[[L(`+ - *`),`더하기, 빼기, 곱하기`,L(`2 * 3`),`6`],[L(`/`),`나누기`,L(`7 / 2`),`3.5`],[L(`//`),`나눗셈의 몫`,L(`7 // 2`),`3`],[L(`%`),`나눗셈의 나머지`,L(`7 % 2`),`1`],[L(`**`),`거듭제곱`,L(`2 ** 3`),`8`],[L(`-a`),`부호 바꾸기`,L(`-1`),`-1`],[L(`+= -= *= …`),`셈한 값을 같은 이름에 다시 붙이기`,L(`n += 1`),`n이 1 커짐`]])}
${G([`거듭제곱을 가장 먼저, 곱하기·나누기 종류를 그다음, 더하기·빼기를 마지막에 합니다.`,`같은 종류끼리는 왼쪽부터 합니다. 순서를 바꾸려면 괄호로 묶습니다.`,`기호 하나가 룬 1개입니다. 괄호는 룬이 아닙니다.`])}
${q({arg:`없음`,ret:`숫자`,mana:J,need:B(`math`)})}
<h3>예제</h3>
${V(`n = 7
boom(n // 4, n - 6)`)}
${U([[`n = 7`,`7에 n이라는 이름을 붙입니다.`],[`boom(n // 4, n - 6)`,`7을 4로 나눈 몫 1과 7에서 6을 뺀 1, 곧 (1, 1) 칸을 터뜨립니다.`]])}
<h3>주의</h3>
${G([`${X(`half`)}<br>${L(`/`)}의 값은 소수가 됩니다. 좌표에는 ${L(`//`)}를 씁니다.`,`${X(`zero`)}<br>0으로 나눴습니다.`,[`비트 셈 ${L(`&`)} ${L(`|`)} ${L(`^`)} ${L(`<<`)} ${L(`>>`)} ${L(`~`)}는 ${B(`kit`)} 봉인에서 풀립니다.`,`kit`]])}
<h3>관련 항목</h3>
${K(`runes`,`print`)}`),hr(`tempo2`,2),$(`resonance`,xn(`resonance`).title,`resonance`,`
<p>고리에 공명이 쌓이기 시작합니다. 그 고리가 부른 정령을 약점으로 잡은 발동마다 1 오르고, 박자마다 식습니다. 발동으로 얻는 정수에 (1 + 공명)이 곱해집니다.</p>
${Pn(`resonance`)}
<h3>예제</h3>
${W([`룬 수`,`매 발동 약점으로 잡을 때의 공명 배수`],[10,16,24,32].map(e=>[`${e}`,jn(e)]))}
<h3>주의</h3>
${G([`새 말이나 문법은 풀리지 않습니다. 돌고 있는 주문에 그대로 적용됩니다.`,`값은 기세의 정수뿐입니다. 기세의 정수는 맹수에게서 나옵니다.`,`공명을 올리는 것은 그 고리가 부른 정령을 약점으로 잡는 일뿐입니다.`])}
<h3>관련 항목</h3>
${K(`reson`,`charge`,`runes`)}`),$(`ring2`,xn(`ring2`).title,`ring2`,`
<p>고리가 하나 늘어 둘이 됩니다. 주문 두 개가 동시에 돕니다.</p>
${Pn(`ring2`)}
<h3>예제</h3>
<p>‘${C(`world.spellName`,1)}’이 도는 동안 ‘새 주문’(+)으로 ‘${C(`world.spellName`,2)}’를 만들고 새깁니다. 두 주문이 각자의 박자로 읊고 발동합니다.</p>
<h3>주의</h3>
${G([`두 주문은 같은 마나를 씁니다.`,`두 주문은 같은 결계를 봅니다. 한 주문이 부른 마물을 다른 주문이 칠 수 있습니다.`,[`공명은 고리마다 따로 쌓입니다. 다른 고리가 부른 정령을 약점으로 잡으면 정수는 얻지만 공명은 오르지 않습니다.`,`resonance`],`맹수의 반격은 읊는 중인 주문 가운데 가장 많이 읊은 주문 하나를 끊습니다.`])}
<h3>관련 항목</h3>
${K(`rings`,`mana`,`stats`)}`),$(`for`,`for`,`for`,`
${H(`for 이름 in 목록:`,`    할 일`)}
<p>목록의 값을 하나씩 이름에 붙이며 들여 쓴 줄을 되풀이합니다.</p>
${q({arg:`없음`,ret:`없음`,mana:`${J} 되풀이할 때마다 다시 듭니다.`,need:B(`for`)})}
<h3>예제</h3>
${V(nr)}
${U([[`for x in range(3):`,`0, 1, 2를 차례로 x라 부르며 아래 줄을 되풀이합니다.`],[`    cast(summon(x, 1, SPRITE), WATER)`,`(x, 1) 칸에 정령을 부르고, 그 칸에 있던 정령에게 물로 쏩니다.`]])}
<h3>주의</h3>
${G([`되풀이는 발동 안에서 일어납니다. 몇 번 되풀이하든 한 바퀴의 길이는 같습니다.`,`부르고 쏘는 수만큼 마나가 듭니다. 모자라면 폭주합니다. ${z(`mana`)}`,`되풀이 안에서 None의 정보를 읽으면 그 발동 전체가 흩어집니다. ${L(`if m:`)}으로 거릅니다.`,`${X(`forNum`)}<br>목록이 아닌 것을 되풀이했습니다. 숫자만큼 되풀이하려면 ${z(`range`,`range`)}를 씁니다.`,`${Y(`for x in range(3)
    boom(x, 1)`,`for`)}<br>for 줄 끝에 쌍점(:)이 없습니다.`])}
<h3>관련 항목</h3>
${K(`range`,`cycle`,`mana`,`while`)}`),$(`range`,`range`,`for`,`
${H(`range(끝)`,`range(시작, 끝)`,`range(시작, 끝, 간격)`)}
<p>정수를 차례로 담은 목록을 돌려줍니다. 끝 수는 넣지 않습니다.</p>
${W([`모양`,`값`],[[L(`range(3)`),`0, 1, 2`],[L(`range(1, 4)`),`1, 2, 3`],[L(`range(0, 5, 2)`),`0, 2, 4`]])}
${q({arg:`시작, 끝, 간격: 정수`,ret:`정수의 목록`,mana:J,need:B(`for`)})}
<h3>예제</h3>
${V(`for x in range(3):
    boom(x, 1)`)}
<p>(0, 1), (1, 1), (2, 1)을 터뜨립니다.</p>
<h3>주의</h3>
${G([`${X(`rangeZero`)}<br>간격에 0을 넣었습니다.`,`되풀이를 겹치면 가로와 세로를 함께 훑습니다. 안쪽 줄은 한 단계 더 들여 씁니다.`])}
<h3>관련 항목</h3>
${K(`for`,`field`)}`),$(`logic`,`and or not`,`logic`,`
${H(`a and b`,`a or b`,`not a`,`값1 if 조건 else 값2`)}
<p>조건을 잇거나 뒤집습니다. 조건식은 조건에 따라 두 값 가운데 하나를 돌려줍니다.</p>
${W([`모양`,`참일 때`],[[L(`a and b`),`둘 다 참`],[L(`a or b`),`하나라도 참`],[L(`not a`),`a가 거짓`],[L(`값1 if 조건 else 값2`),`조건이 참이면 값1, 아니면 값2`]])}
${q({arg:`없음`,ret:`값`,mana:J,need:B(`logic`)})}
<h3>예제</h3>
${V(`m = summon(1, 1, SPRITE)
if m and m.hp < 2:
    cast(m)`)}
<p>m이 None이 아니고 체력이 2보다 작을 때만 쏩니다. ${L(`and`)}는 앞이 거짓이면 뒤를 보지 않습니다.</p>
<h3>주의</h3>
${G([`${Y(`m = summon(1, 1, SPRITE)
cast(m) if m`,`logic`)}<br>조건식에는 else가 있어야 합니다.`,`이어 쓴 and 전체, 이어 쓴 or 전체가 각각 룬 1개입니다.`])}
<h3>관련 항목</h3>
${K(`if`,`compare`)}`),$(`scan`,`scan`,`scan`,`
${H(`scan()`)}
<p>결계의 살아 있는 마물을 모두 목록으로 돌려줍니다. 가장 오래된 마물이 맨 앞입니다.</p>
${q({arg:`없음`,ret:`마물의 목록. 모든 종류가 들어 있습니다.`,mana:J,need:B(`scan`)})}
<h3>예제</h3>
${V(ar)}
${U([[`for m in scan():`,`결계의 모든 마물을 오래된 차례로 m이라 부르며 되풀이합니다.`],[`    if m.kind == IMP:`,`m이 잡귀이면 아래 줄을 실행합니다.`],[`        cast(m)`,`m에게 한 발 쏩니다.`]])}
<h3>주의</h3>
${G([`목록의 마물은 scan()을 부른 순간의 정보를 담습니다. 같은 발동에서 쏘아도 목록의 hp는 바뀌지 않습니다.`,`같은 발동에서 방금 부른 마물은 목록에 없습니다.`,`다른 주문이 부른 마물도 목록에 있습니다.`,`결계가 비어 있으면 빈 목록입니다. 이때 ${L(`scan()[0]`)}을 쓰면 다음 글이 뜹니다.<br>${X(`empty`)}`])}
<h3>관련 항목</h3>
${K(`index`,`mob`,`for`,`kinds`)}`),$(`index`,`꺼내기 [ ]`,`scan`,`
${H(`목록[번호]`)}
<p>목록에서 하나를 꺼냅니다. 번호는 0부터 셉니다.</p>
${q({arg:`번호: 정수`,ret:`꺼낸 값`,mana:J,need:B(`scan`)})}
${W([`번호`,`꺼내는 것`],[[`0`,`첫째`],[`1`,`둘째`],[`-1`,`맨 끝`],[`-2`,`끝에서 둘째`]])}
<h3>예제</h3>
${V(`cast(scan()[0], NATURE)`)}
<p>가장 오래된 마물에게 자연 원소로 쏩니다.</p>
<h3>주의</h3>
${G([`${X(`index1`)}<br>마물이 한 마리뿐인데 둘째를 꺼냈습니다.`,[`리스트, 튜플, 문자열, 딕셔너리에도 같은 대괄호를 씁니다.`,`list`]])}
<h3>관련 항목</h3>
${K(`scan`,`slice`)}`),$(`k-wisp`,`WISP`,`wisp`,`
${H(`WISP`,`summon(x, y, WISP)`)}
<p>도깨비불을 가리키는 종류 이름입니다. 값은 3입니다. ${L(`summon`)}의 종류 자리에 넣으면 도깨비불을 부릅니다.</p>
${q({arg:`없음`,ret:`숫자`,mana:J,need:B(`wisp`)})}
<h3>예제</h3>
${V(or)}
<p>한가운데 칸에 도깨비불을 부르고, 지난번에 부른 도깨비불에게 한 발 쏩니다.</p>
<h3>주의</h3>
${G([`도깨비불의 체력은 1입니다. 한 발이면 잡힙니다.`,`부른 뒤 ${F(3)}초가 지나면 흩어집니다. 그 뒤의 발동에서 summon은 None을 돌려줍니다.`,`단은 주문에서 읽을 수 없습니다.`])}
<h3>관련 항목</h3>
${K(`wisps`,`summon`,`kinds`)}`),$(`mark`,`mark`,`mark`,`
${H(`mark(x, y, 원소)`)}
<p>(x, y) 칸에 원소의 인장을 남깁니다. 인장이 남아 있는 동안 그 칸에 부른 정령은 그 원소로 나타납니다.</p>
${q({arg:`x, y: 칸의 좌표.<br>원소: ${L(`FIRE`)}, ${L(`WATER`)}, ${L(`NATURE`)} 또는 그 값.`,ret:`None`,mana:`5. 인장을 남기지 못하면 돌려받습니다.`,need:B(`mark`)})}
<h3>예제</h3>
${V(sr)}
${U([[`mark(1, 1, FIRE)`,`한가운데 칸에 불의 인장을 남기라고 적어 둡니다.`],[`cast(summon(1, 1, SPRITE), WATER)`,`그 칸에 있던 정령을 물로 쏘고, 정령을 부르라고 적어 둡니다.`]])}
<h3>주의</h3>
${G([`인장은 ${F(4)}초 뒤에 사라집니다. 정령 하나에 쓰여도 사라집니다.`,`부른 마물이 남아 있는 칸에는 인장이 남지 않습니다.`,`${X(`markElem`)}<br>원소 자리에 원소가 아닌 값을 넣었습니다.`,`${X(`markOut`)}<br>좌표가 결계 밖입니다.`,`한 발동에 25번까지 남깁니다.`])}
<h3>관련 항목</h3>
${K(`sigil`,`summon`,`elems`,`mana`)}`),$(`while`,`while`,`while`,`
${H(`while 조건:`,`    할 일`)}
<p>조건이 참인 동안 들여 쓴 줄을 되풀이합니다. 줄을 다 실행할 때마다 조건을 다시 봅니다.</p>
${q({arg:`없음`,ret:`없음`,mana:`${J} 되풀이할 때마다 다시 듭니다.`,need:B(`while`)})}
<h3>예제</h3>
${V(`n = 0
while n < 3:
    boom(n, n)
    n += 1`)}
${U([[`n = 0`,`0에 n이라는 이름을 붙입니다.`],[`while n < 3:`,`n이 3보다 작은 동안 되풀이합니다.`],[`    boom(n, n)`,`(n, n) 칸을 터뜨립니다.`],[`    n += 1`,`n을 1 키웁니다.`]])}
<p>(0, 0), (1, 1), (2, 2)를 터뜨립니다.</p>
<h3>주의</h3>
${G([`끝나지 않는 while은 마나를 다 쓰고 폭주합니다. 잃는 것은 과열 동안의 시간뿐입니다. 게임은 멈추지 않습니다.`,`${L(`me.mana`)}는 발동하는 동안 줄지 않습니다. 조건에 쓰면 끝나지 않습니다.`,`${Y(`n = 0
while n < 3
    n += 1`,`while`)}<br>while 줄 끝에 쌍점(:)이 없습니다.`])}
<h3>관련 항목</h3>
${K(`break`,`continue`,`for`,`mana`)}`),$(`break`,`break`,`while`,`
${H(`break`)}
<p>되풀이를 그 자리에서 그만둡니다. 되풀이 아래의 줄로 넘어갑니다.</p>
${q({arg:`없음`,ret:`없음`,mana:J,need:B(`while`)})}
<h3>예제</h3>
${V(`for x in range(3):
    m = summon(x, 0, SPRITE)
    if m:
        cast(m, WATER)
        break`)}
${U([[`for x in range(3):`,`0, 1, 2를 차례로 x라 부릅니다.`],[`    m = summon(x, 0, SPRITE)`,`맨 윗줄의 (x, 0) 칸에 정령을 부릅니다.`],[`    if m:`,`그 칸에 정령이 있었으면`],[`        cast(m, WATER)`,`물 원소로 한 발 쏘고`],[`        break`,`되풀이를 그만둡니다.`]])}
<p>정령이 있는 첫 칸까지만 다룹니다. 그 뒤의 칸에는 부르지도 않습니다.</p>
<h3>주의</h3>
${G([`여러 겹의 되풀이 안에서는 가장 안쪽 되풀이만 그만둡니다.`,`${Y(`break`,`while`)}<br>break는 되풀이 안에서만 씁니다.`])}
<h3>관련 항목</h3>
${K(`continue`,`while`,`for`)}`),$(`continue`,`continue`,`while`,`
${H(`continue`)}
<p>되풀이의 이번 차례에서 남은 줄을 건너뛰고 다음 차례로 갑니다.</p>
${q({arg:`없음`,ret:`없음`,mana:J,need:B(`while`)})}
<h3>예제</h3>
${V(`for x in range(3):
    if x == 1:
        continue
    boom(x, x)`)}
${U([[`for x in range(3):`,`0, 1, 2를 차례로 x라 부릅니다.`],[`    if x == 1:`,`x가 1이면`],[`        continue`,`이번 차례를 건너뜁니다.`],[`    boom(x, x)`,`(x, x) 칸을 터뜨립니다.`]])}
<p>(0, 0)과 (2, 2)를 터뜨립니다.</p>
<h3>주의</h3>
${G([`${Y(`continue`,`while`)}<br>continue는 되풀이 안에서만 씁니다.`])}
<h3>관련 항목</h3>
${K(`break`,`for`,`while`)}`),gr(`mana1`,1),$(`grid5`,xn(`grid5`).title,`grid5`,`
<p>결계가 가로 5칸, 세로 5칸으로 넓어집니다. 좌표는 0부터 4까지입니다.</p>
${Pn(`grid5`)}
<h3>예제</h3>
<table class="grid">${[0,1,2,3,4].map(e=>`<tr>${[0,1,2,3,4].map(t=>`<td>(${t}, ${e})</td>`).join(``)}</tr>`).join(``)}</table>
<p>5×5 결계의 좌표입니다. 한가운데는 (2, 2)입니다.</p>
<h3>주의</h3>
${G([`있던 마물은 가운데 쪽으로 한 칸씩 옮겨집니다. 3×3의 (1, 1)에 있던 마물은 (2, 2)에 있습니다.`,`예전 좌표로 쓴 주문은 그대로 새겨져 있습니다. 왼쪽 위 3×3만 다룹니다.`,`날아가던 마법탄과 아직 이루어지지 않은 부름은 사라집니다.`,`${X(`boomOut5`)}<br>5×5 결계에서 좌표가 밖으로 나갔을 때 뜨는 글입니다.`])}
<h3>관련 항목</h3>
${K(`field`,`mana`,`chain`)}`),$(`slice`,`자르기 [ : ]`,`slice`,`
${H(`목록[시작:끝]`,`목록[시작:끝:간격]`)}
<p>목록의 한 부분을 새 목록으로 잘라 냅니다. 끝 번호의 값은 넣지 않습니다.</p>
${W([`모양`,`[a, b, c, d, e]에서`],[[L(`[:2]`),`a, b`],[L(`[2:]`),`c, d, e`],[L(`[1:3]`),`b, c`],[L(`[-2:]`),`d, e`],[L(`[::2]`),`a, c, e`],[L(`[::-1]`),`e, d, c, b, a`]])}
${q({arg:`시작, 끝, 간격: 정수. 빼도 됩니다.`,ret:`목록`,mana:J,need:B(`slice`)})}
<h3>예제</h3>
${V(`for m in scan()[1:3]:
    cast(m)`)}
<p>둘째와 셋째로 오래된 마물에게 한 발씩 쏩니다.</p>
<h3>주의</h3>
${G([`목록 길이를 넘는 번호를 써도 오류가 나지 않습니다. 있는 만큼만 잘라 냅니다.`,`${X(`sliceZero`)}<br>간격에 0을 넣었습니다.`])}
<h3>관련 항목</h3>
${K(`index`,`scan`,`for`)}`),$(`builtins`,`len min max sum abs`,`tools`,`
${H(`len(목록)`,`min(목록)`,`max(목록)`,`sum(목록)`,`abs(수)`)}
<p>목록이나 수에서 값 하나를 구합니다.</p>
${W([`말`,`돌려주는 값`],[[L(`len(목록)`),`목록의 길이`],[L(`min(목록)`),`가장 작은 값`],[L(`max(목록)`),`가장 큰 값`],[L(`sum(목록)`),`합`],[L(`abs(수)`),`절댓값`]])}
${q({arg:`목록이나 수`,ret:`값`,mana:J,need:B(`tools`)})}
<h3>예제</h3>
${V(`if len(scan()) > 6:
    boom(1, 1)`)}
<p>마물이 여섯 마리보다 많으면 (1, 1)을 터뜨립니다.</p>
<h3>주의</h3>
${G([`${X(`minMob`)}<br>마물끼리는 크기를 비교하지 못합니다.`,[`마물을 무엇으로 비교할지는 ${z(`kw`)}의 key=로 정합니다.`,`kit`]])}
<h3>관련 항목</h3>
${K(`scan`,`range`)}`),$(`def`,`def`,`def`,`
${H(`def 이름(매개변수):`,`    할 일`)}
<p>여러 줄을 묶어 이름을 붙입니다. 이름을 부르면 묶은 줄을 실행합니다.</p>
${q({arg:`매개변수에 넣을 값. 매개변수에 = 기본값을 붙이면 빼도 됩니다.`,ret:`${z(`return`)}의 값. return이 없으면 None`,mana:J,need:B(`def`)})}
<h3>예제</h3>
${V(`def hit(x, y):
    cast(summon(x, y, SPRITE), WATER)
hit(1, 1)
hit(2, 1)`)}
${U([[`def hit(x, y):`,`hit라는 이름으로 아래 줄을 묶습니다. 넣은 값을 x, y라 부릅니다.`],[`    cast(summon(x, y, SPRITE), WATER)`,`(x, y) 칸에 정령을 부르고, 그 칸에 있던 정령에게 물로 쏩니다.`],[`hit(1, 1)`,`1과 1을 넣어 hit를 부릅니다.`],[`hit(2, 1)`,`2와 1을 넣어 hit를 부릅니다.`]])}
<h3>주의</h3>
${G([`def 줄만으로는 아무것도 실행하지 않습니다. 불러야 실행합니다.`,`def 줄과 묶은 줄의 룬은 부르지 않아도 읊습니다.`,`자기 자신을 48겹 넘게 부르면 폭주합니다.`,`${X(`missing`)}<br>매개변수에 넣을 값을 빼먹었습니다.`])}
<h3>관련 항목</h3>
${K(`return`,`runes`)}`),$(`return`,`return`,`def`,`
${H(`return 값`,`return`)}
<p>def로 묶은 줄의 실행을 끝내고 값을 돌려줍니다.</p>
${q({arg:`없음`,ret:`없음`,mana:J,need:B(`def`)})}
<h3>예제</h3>
${V(`def twice(n):
    return n * 2
boom(twice(1), 1)`)}
<p>twice(1)의 값은 2입니다. (2, 1) 칸을 터뜨립니다.</p>
<h3>주의</h3>
${G([`값 없이 쓴 return은 None을 돌려줍니다.`,`def 바깥에 쓴 return은 그 발동을 거기서 끝냅니다.`])}
<h3>관련 항목</h3>
${K(`def`)}`),$(`list`,`리스트 [ ]`,`list`,`
${H(`[값, 값, …]`,`[]`,`list(목록)`)}
<p>값을 차례로 묶은 목록을 만듭니다. 만든 뒤에 값을 더하거나 뺍니다.</p>
${W([`쓰는 법`,`하는 일`],[[L(`a.append(값)`),`맨 끝에 더합니다.`],[L(`a.pop()`),`맨 끝을 빼서 돌려줍니다. 번호를 넣으면 그 자리를 뺍니다.`],[L(`a.insert(번호, 값)`),`그 자리에 끼워 넣습니다.`],[L(`a.reverse()`),`차례를 뒤집습니다.`],[L(`a.index(값)`),`그 값이 처음 나오는 번호`],[L(`a.count(값)`),`그 값이 나오는 횟수`],[`${L(`값 in a`)} ${L(`값 not in a`)}`,`목록 안에 있는지, 없는지`],{need:`scan`,cells:[L(`a[번호] = 값`),`그 자리의 값을 바꿉니다.`]}])}
${q({arg:`없음`,ret:`리스트`,mana:J,need:B(`list`)})}
<h3>예제</h3>
${V(`spots = [0, 2]
spots.append(4)
for x in spots:
    boom(x, 2)`)}
<p>(0, 2), (2, 2), (4, 2)를 터뜨립니다.</p>
<h3>주의</h3>
${G([`${X(`popEmpty`)}<br>빈 리스트에서 뺐습니다.`,`번호로 꺼내는 대괄호는 ${B(`scan`)} 봉인에서 풀립니다.`])}
<h3>관련 항목</h3>
${K(`tuple`,`star`,`for`)}`),$(`tuple`,`튜플 ( , )`,`list`,`
${H(`(값, 값)`,`값, 값`,`이름, 이름 = 값`,`tuple(목록)`)}
<p>값을 바꿀 수 없게 묶습니다. 여러 이름에 값을 나눠 붙일 때도 씁니다.</p>
${q({arg:`없음`,ret:`튜플`,mana:J,need:B(`list`)})}
<h3>예제</h3>
${V(`x, y = 2, 0
boom(x, y)`)}
${U([[`x, y = 2, 0`,`x에 2를, y에 0을 붙입니다.`],[`boom(x, y)`,`(2, 0) 칸을 터뜨립니다.`]])}
<h3>주의</h3>
${G([`${X(`unpack`)}<br>값의 수와 이름의 수가 다릅니다.`,`for에도 씁니다. ${L(`for x, y in 목록:`)}은 목록의 짝마다 두 이름에 나눠 붙입니다.`])}
<h3>관련 항목</h3>
${K(`list`,`star`)}`),$(`star`,`펼치기 *`,`list`,`
${H(`함수(*목록)`)}
<p>목록의 값을 하나씩 인자로 넣습니다.</p>
${q({arg:`목록`,ret:`없음`,mana:J,need:B(`list`)})}
<h3>예제</h3>
${V(`p = (1, 2)
boom(*p)`)}
<p>${L(`boom(1, 2)`)}와 같습니다.</p>
<h3>주의</h3>
${G([`${Y(`p = (1, 2)
q = *p`,`list`)}<br>펼치기는 부르기의 괄호 안에서만 씁니다.`])}
<h3>관련 항목</h3>
${K(`tuple`,`list`)}`),$(`dict`,`딕셔너리 { }`,`dict`,`
${H(`{키: 값, 키: 값}`,`d.get(키)`)}
<p>키마다 값을 하나씩 짝지어 둡니다. 키로 값을 찾습니다.</p>
${W([`쓰는 법`,`하는 일`],[[L(`d.get(키)`),`키의 값을 돌려줍니다. 키가 없으면 None입니다.`],[L(`d.get(키, 없을 때 값)`),`키가 없으면 두 번째 값을 돌려줍니다.`],[L(`d.keys() d.values() d.items()`),`키, 값, (키, 값) 짝의 목록`],[L(`키 in d`),`키가 있으면 True`],{need:`scan`,cells:[L(`d[키]`),`키의 값을 꺼냅니다. 키가 없으면 흩어집니다.`]},{need:`scan`,cells:[L(`d[키] = 값`),`키의 값을 넣거나 바꿉니다.`]}])}
${q({arg:`없음`,ret:`딕셔너리`,mana:J,need:B(`dict`)})}
<h3>예제</h3>
${V(`d = {"x": 2, "y": 1}
boom(d.get("x"), d.get("y"))`)}
<p>(2, 1) 칸을 터뜨립니다.</p>
<h3>주의</h3>
${G([[`${X(`dictKey`)}<br>딕셔너리에 없는 키를 대괄호로 꺼냈습니다.`,`scan`],`키에는 숫자, 문자열, 튜플을 씁니다.`,`대괄호로 꺼내려면 ${B(`scan`)} 봉인이 필요합니다.`])}
<h3>관련 항목</h3>
${K(`list`,`tuple`)}`),$(`comp`,`[… for …]`,`comp`,`
${H(`[식 for 이름 in 목록]`,`[식 for 이름 in 목록 if 조건]`)}
<p>목록을 훑어 새 목록을 만듭니다. if를 붙이면 조건이 참인 것만 넣습니다.</p>
${q({arg:`없음`,ret:`목록`,mana:J,need:B(`comp`)})}
<h3>예제</h3>
${V(`xs = [x * 2 for x in range(3)]
print(xs)`)}
<p>주문 창에 ${R(C(`spell.printed`,`[0, 2, 4]`))} 표시가 나옵니다.</p>
<h3>주의</h3>
${G([`${Y(`print([x for x range(3)])`,`comp`)}<br>for 뒤에 in이 빠졌습니다.`])}
<h3>관련 항목</h3>
${K(`for`,`list`,`lambda`)}`),$(`lambda`,`lambda`,`comp`,`
${H(`lambda 매개변수: 식`)}
<p>이름 없는 작은 함수를 만듭니다. 식 하나의 값을 돌려줍니다.</p>
${q({arg:`매개변수에 넣을 값`,ret:`식의 값`,mana:J,need:B(`comp`)})}
<h3>예제</h3>
${V(`f = lambda n: n * 2
boom(f(1), 1)`)}
<p>f(1)의 값은 2입니다. (2, 1) 칸을 터뜨립니다.</p>
<h3>주의</h3>
${G([`${Y(`f = lambda m: return m`,`comp`)}<br>lambda 뒤에는 식 하나만 옵니다. return을 쓰지 않습니다.`])}
<h3>관련 항목</h3>
${K(`def`,`comp`)}`),$(`kw`,`이름 붙인 인자`,`kit`,`
${H(`함수(값, 이름=값)`)}
<p>인자를 이름으로 넣습니다. sorted의 key=와 reverse=, min과 max의 key=, def로 만든 함수의 매개변수에 씁니다.</p>
${q({arg:`이름=값`,ret:`함수에 따라 다릅니다`,mana:J,need:B(`kit`)})}
<h3>예제</h3>
${V(`def hit(x, y=1):
    boom(x, y)
hit(2, y=0)`)}
<p>(2, 0) 칸을 터뜨립니다. y=을 빼면 기본값 1이 들어갑니다.</p>
<h3>주의</h3>
${G([`${Y(`print(key=1, 2)`,`kit`)}<br>이름 붙인 인자는 맨 뒤에 둡니다.`])}
<h3>관련 항목</h3>
${K(`def`,`sorted`)}`),$(`sorted`,`sorted reversed`,`kit`,`
${H(`sorted(목록)`,`sorted(목록, key=함수, reverse=True)`,`reversed(목록)`)}
<p>sorted는 작은 것부터 늘어놓은 새 목록을, reversed는 거꾸로 늘어놓은 새 목록을 돌려줍니다.</p>
${q({arg:`목록. sorted는 key=, reverse=를 받습니다.`,ret:`새 목록`,mana:J,need:B(`kit`)})}
<h3>예제</h3>
${V(`print(sorted([3, 1, 2]))`)}
<p>주문 창에 ${R(C(`spell.printed`,`[1, 2, 3]`))} 표시가 나옵니다.</p>
<h3>주의</h3>
${G([[`${X(`sortMob`)}<br>마물끼리는 크기를 비교하지 못합니다. key=로 비교할 값을 정합니다.`,`scan`]])}
<h3>관련 항목</h3>
${K(`kw`,`list`)}`),$(`enumzip`,`enumerate zip`,`kit`,`
${H(`enumerate(목록)`,`zip(목록, 목록)`)}
<p>enumerate는 (번호, 값) 짝의 목록을, zip은 두 목록에서 같은 자리끼리 짝지은 목록을 돌려줍니다.</p>
${q({arg:`목록`,ret:`짝의 목록`,mana:J,need:B(`kit`)})}
<h3>예제</h3>
${V(`for i, x in enumerate([2, 0]):
    boom(x, i)`)}
<p>(2, 0)과 (0, 1)을 터뜨립니다.</p>
<h3>주의</h3>
${G([`zip은 짧은 목록의 길이에서 멈춥니다.`])}
<h3>관련 항목</h3>
${K(`tuple`,`for`)}`),$(`mapfilter`,`map filter`,`kit`,`
${H(`map(함수, 목록)`,`filter(함수, 목록)`)}
<p>map은 값마다 함수를 부른 결과의 목록을, filter는 함수가 참을 돌려준 값만 남긴 목록을 돌려줍니다.</p>
${q({arg:`함수와 목록`,ret:`새 목록`,mana:J,need:B(`kit`)})}
<h3>예제</h3>
${V(`def twice(n):
    return n * 2
print(map(twice, [1, 2]))`)}
<p>주문 창에 ${R(C(`spell.printed`,`[2, 4]`))} 표시가 나옵니다.</p>
<h3>주의</h3>
${G([[`같은 일을 ${z(`comp`)}로도 씁니다. 룬 수가 다릅니다.`,`comp`]])}
<h3>관련 항목</h3>
${K(`def`,`list`)}`),$(`anyall`,`any all`,`kit`,`
${H(`any(목록)`,`all(목록)`)}
<p>any는 하나라도 참이면, all은 모두 참이면 True를 돌려줍니다.</p>
${q({arg:`목록`,ret:`True 또는 False`,mana:J,need:B(`kit`)})}
<h3>예제</h3>
${V(`if any([me.mana > 50, me.mana < 10]):
    cast()`)}
<p>마나가 50보다 많거나 10보다 적을 때 쏩니다.</p>
<h3>주의</h3>
${G([`빈 목록에서 any는 False, all은 True입니다.`])}
<h3>관련 항목</h3>
${K(`list`,`compare`)}`),$(`reduce`,`reduce xor`,`kit`,`
${H(`reduce(함수, 목록)`,`reduce(함수, 목록, 처음 값)`,`xor(a, b)`)}
<p>reduce는 앞의 두 값에 함수를 부르고, 그 결과와 다음 값에 다시 부르기를 끝까지 되풀이합니다. xor는 두 정수의 비트 xor입니다.</p>
${q({arg:`함수와 목록. 처음 값을 주면 그 값부터 시작합니다.`,ret:`마지막 결과`,mana:J,need:B(`kit`)})}
<h3>예제</h3>
${V(`print(reduce(xor, [1, 2, 4]))`)}
<p>주문 창에 ${R(C(`spell.printed`,`7`))} 표시가 나옵니다.</p>
<h3>주의</h3>
${G([`${X(`reduceEmpty`)}<br>빈 목록을 처음 값 없이 reduce했습니다.`])}
<h3>관련 항목</h3>
${K(`bits`,`def`)}`),$(`convert`,`값 바꾸기`,`kit`,`
${H(`int(값)`,`float(값)`,`str(값)`,`bool(값)`,`round(수, 자리)`)}
<p>값을 다른 종류로 바꿉니다. round는 반올림합니다.</p>
${W([`말`,`돌려주는 값`],[[L(`int(3.7)`),`3`],[L(`float(2)`),`2`],[L(`str(5)`),`"5"`],[L(`bool(0)`),`False`],[L(`round(1.26, 1)`),`1.3`]])}
${q({arg:`바꿀 값`,ret:`바뀐 값`,mana:J,need:B(`kit`)})}
<h3>예제</h3>
${V(`print(int(3.7), str(5), bool(0))`)}
<p>주문 창에 ${R(C(`spell.printed`,`3 5 False`))} 표시가 나옵니다.</p>
<h3>주의</h3>
${G([`${X(`intStr`)}<br>숫자가 아닌 글을 정수로 바꾸려 했습니다.`,`${L(`list`)}와 ${L(`tuple`)}은 ${B(`list`)} 봉인의 것입니다.`])}
<h3>관련 항목</h3>
${K(`math`,`list`)}`),$(`bits`,`비트 셈`,`kit`,`
${H(`a & b`,`a | b`,`a ^ b`,`a << n`,`a >> n`,`~a`)}
<p>정수를 이진수의 자리마다 계산합니다.</p>
${W([`기호`,`뜻`,`예`,`값`],[[L(`&`),`두 자리가 모두 1인 자리만 1`,L(`6 & 3`),`2`],[L(`|`),`어느 한쪽이 1인 자리는 1`,L(`6 | 3`),`7`],[L(`^`),`두 자리가 다른 자리만 1`,L(`6 ^ 3`),`5`],[L(`<<`),`왼쪽으로 n자리 밀기`,L(`1 << 2`),`4`],[L(`>>`),`오른쪽으로 n자리 밀기`,L(`6 >> 1`),`3`],[L(`~`),`모든 자리 뒤집기`,L(`~0`),`-1`]])}
${q({arg:`정수`,ret:`정수`,mana:J,need:B(`kit`)})}
<h3>예제</h3>
${V(`print(6 & 3, 6 | 3, 6 ^ 3)`)}
<p>주문 창에 ${R(C(`spell.printed`,`2 7 5`))} 표시가 나옵니다.</p>
<h3>주의</h3>
${G([`${L(`&=`)} 같은 셈 붙이기도 이 봉인에서 풀립니다.`,`기호 하나가 룬 1개입니다.`])}
<h3>관련 항목</h3>
${K(`math`,`reduce`)}`),$(`strings`,`문자열 다루기`,`kit`,`
${H(`s.upper()`,`s.lower()`,`s.split(가름)`,`가름.join(목록)`,`s.find(글)`,`s.replace(옛, 새)`)}
<p>문자열에서 새 문자열이나 값을 얻습니다.</p>
${W([`쓰는 법`,`돌려주는 값`],[[L(`"ab".upper()`),`"AB"`],[L(`"AB".lower()`),`"ab"`],[L(`"a b".split()`),`["a", "b"]`],[L(`"-".join(["a", "b"])`),`"a-b"`],[L(`"abc".find("c")`),`2. 없으면 -1`],[L(`"aba".replace("a", "c")`),`"cbc"`]])}
${q({arg:`문자열`,ret:`문자열, 목록 또는 숫자`,mana:J,need:B(`kit`)})}
<h3>예제</h3>
${V(`print("-".join(["a", "b"]))`)}
<p>주문 창에 ${R(C(`spell.printed`,`a-b`))} 표시가 나옵니다.</p>
<h3>주의</h3>
${G([`문자열은 8글자마다 룬이 1개씩 늘어납니다.`,`${L(`s.count(글)`)}는 ${B(`list`)} 봉인의 것입니다.`])}
<h3>관련 항목</h3>
${K(`print`,`convert`)}`),hr(`tempo3`,3),gr(`mana2`,2)],vr={ko:{groups:[{id:`walk`,title:`길잡이`},{id:`idea`,title:`개념`},{id:`dict`,title:`사전`}],pages:[...fr,...mr,..._r]}},yr=vr.ko.groups,br=vr.ko.pages,xr={grid3:`field`,boom:`go-boom`,sprite:`go-sprite`,assign:`go-name`,read:`go-name`,if:`go-if`,beast:`go-beast`,math:`go-math`,resonance:`go-resonance`,for:`go-for`,ring2:`go-ring`,scan:`go-scan`,wisp:`go-wisp`,mark:`sigil`,grid5:`go-grid5`,def:`go-deep`},Sr=e=>wn(e),Cr=(e,t)=>t.split(` `).filter(Boolean).every(t=>e.owned.has(t));function wr(e,t){if(e.group===`walk`){let n=Math.min(...wn(e.id));return t.goal>=n||!!e.need&&Cr(t,e.need)}return!e.need||Cr(t,e.need)}var Tr=`runepy.layout.v1`,Er=10;function Dr(){try{return JSON.parse(localStorage.getItem(Tr)??`{}`)??{}}catch{return{}}}var Or=Dr();function kr(){try{localStorage.setItem(Tr,JSON.stringify(Or))}catch{}}function Ar(){for(let e of Object.keys(Or))delete Or[e];kr()}var jr={docs:`book`,records:`chart`},Mr=class{key;el=document.createElement(`section`);bar=document.createElement(`header`);titleEl=document.createElement(`span`);tools=document.createElement(`span`);body=document.createElement(`div`);closeBtn=null;onClose=null;constructor(e,t,n={}){this.key=e,this.el.className=`win`,this.el.style.minWidth=`${n.minW??260}px`,this.el.style.minHeight=`${n.minH??160}px`,this.bar.className=`win-bar`,this.titleEl.className=`win-title`,this.titleEl.textContent=t,this.tools.className=`win-tools`,this.body.className=`win-body`;let r=n.icon??jr[e];if(r&&this.bar.appendChild(bn(r,`win-kind`)),this.bar.append(this.titleEl,this.tools),n.closable){let e=document.createElement(`button`);e.className=`win-x`,e.title=C(`win.close`),e.setAttribute(`aria-label`,C(`win.close`)),e.appendChild(bn(`close`)),e.onclick=()=>this.hide(),this.closeBtn=e,this.tools.appendChild(e)}this.el.append(this.bar,this.body),document.querySelector(`#windows`).appendChild(this.el),this.el.addEventListener(`pointerdown`,()=>this.front()),this.bar.addEventListener(`pointerdown`,e=>this.startDrag(e)),new ResizeObserver(()=>this.remember()).observe(this.el)}addTool(e){this.tools.insertBefore(e,this.closeBtn)}setTitle(e){this.titleEl.textContent!==e&&(this.titleEl.textContent=e)}front(){this.el.style.zIndex=`${++Er}`}get shown(){return!this.el.hidden}show(){let e=this.el.hidden;this.el.hidden=!1,this.front(),e&&Or[this.key]?.shut&&(delete Or[this.key].shut,kr())}hide(){this.el.hidden||(this.remember(),this.el.hidden=!0,Or[this.key]&&(Or[this.key].shut=!0,kr()),this.onClose?.())}restoreShut(){Or[this.key]?.shut&&(this.el.hidden=!0)}place(e,t=!1){let n=!t&&Or[this.key]||e,r=window.innerWidth,i=window.innerHeight,a=Math.min(n.w,r-8),o=Math.min(n.h,i-8);this.el.style.width=`${a}px`,this.el.style.height=`${o}px`,this.el.style.left=`${Math.max(4,Math.min(n.x,r-80))}px`,this.el.style.top=`${Math.max(4,Math.min(n.y,i-40))}px`,t&&this.remember()}remember(){!this.el.hidden&&this.el.offsetWidth&&(Or[this.key]={x:this.el.offsetLeft,y:this.el.offsetTop,w:this.el.offsetWidth,h:this.el.offsetHeight},kr())}startDrag(e){if(e.target.closest(`button`))return;e.preventDefault();let t=e.clientX-this.el.offsetLeft,n=e.clientY-this.el.offsetTop,r=e=>{let r=Math.max(-this.el.offsetWidth+80,Math.min(window.innerWidth-80,e.clientX-t)),i=Math.max(0,Math.min(window.innerHeight-32,e.clientY-n));this.el.style.left=`${r}px`,this.el.style.top=`${i}px`},i=()=>{window.removeEventListener(`pointermove`,r),window.removeEventListener(`pointerup`,i),this.remember()};window.addEventListener(`pointermove`,r),window.addEventListener(`pointerup`,i)}destroy(){delete Or[this.key],kr(),this.el.remove()}},Nr=`runepy.read.v2`,Pr=`runepy.docs.tocShut.v1`,Fr={owned:new Set,goal:0},Ir=e=>e.split(` `).filter(Boolean).map(e=>`‘${E.find(t=>t.id===e)?.title??e}’`).join(`, `),Lr=class{world;useCode;win=new Mr(`docs`,C(`docs.title`),{closable:!0,minW:280,minH:220});toc=document.createElement(`nav`);fold=document.createElement(`button`);body=document.createElement(`article`);icons;read=new Set(br.filter(e=>wr(e,Fr)).map(e=>e.id));current=``;tocKey=``;bodyKey=``;constructor(e,t){this.world=e,this.useCode=t,this.win.el.classList.add(`docs-win`),this.toc.className=`toc`,this.toc.id=`docs-toc`,this.body.className=`doc`,this.fold.className=`toc-fold`,this.fold.setAttribute(`aria-controls`,this.toc.id),this.fold.onclick=()=>this.setTocShut(!this.win.el.classList.contains(`toc-shut`),!0);let r=!1;try{r=localStorage.getItem(Pr)===`1`}catch{}this.setTocShut(r,!1),this.win.body.append(this.fold,this.toc,this.body);let i=(e,t)=>`<img class="${t}" src="${e}" alt="">`;this.icons={blob:i(oe(0),`mob`),fire:i(oe(1),`mob`),water:i(oe(2),`mob`),nature:i(oe(3),`mob`),ess:i(n(`ess`),`gem`),gfire:i(n(`fire`),`gem`),gwater:i(n(`water`),`gem`),gnature:i(n(`nature`),`gem`),gzeal:i(n(`zeal`),`gem`),gglow:i(n(`glow`),`gem`)};try{for(let e of JSON.parse(localStorage.getItem(Nr)??`[]`))this.read.add(e)}catch{}this.open(br[0].id)}get progress(){return{owned:this.world.owned,goal:this.world.goal}}visible(){let e=this.progress;return br.filter(t=>wr(t,e))}hasUnread(){return this.visible().some(e=>!this.read.has(e.id))}open(e){let t=this.visible().find(t=>t.id===e);if(!t)return!1;this.current=e,this.read.add(e);try{localStorage.setItem(Nr,JSON.stringify([...this.read]))}catch{}let n=t.html.replace(/\{(\w+)\}/g,(e,t)=>this.icons[t]??e),r=this.visible().filter(e=>e.group===t.group),i=r.indexOf(t),a=r[i-1],o=r[i+1],s=`<nav class="pager">${a?`<a data-page="${a.id}">${C(`docs.prev`,a.title)}</a>`:`<span></span>`}${o?`<a data-page="${o.id}">${C(`docs.next`,o.title)}</a>`:``}</nav>`;return this.body.innerHTML=`<p class="kicker">${this.kicker(t)}</p><h2>${t.title}</h2>${n}${s}`,this.body.querySelectorAll(`pre.try`).forEach(e=>{let t=e.textContent??``,n=document.createElement(`div`);n.className=`use-row`;let r=document.createElement(`button`);r.className=`use`,r.textContent=C(`docs.copy`),r.onclick=()=>this.useCode(t);let i=document.createElement(`span`);i.className=`runes`,n.append(r,i),e.insertAdjacentElement(`afterend`,n)}),this.body.querySelectorAll(`a[data-page]`).forEach(e=>{let t=br.find(t=>t.id===e.dataset.page);e.textContent||=t?.title??e.dataset.page??``,e.onclick=t=>{t.preventDefault(),e.classList.contains(`locked`)||this.open(e.dataset.page)}}),this.body.scrollTop=0,this.tocKey=``,this.bodyKey=``,this.update(),!0}kicker(e){let t=yr.find(t=>t.id===e.group).title;return e.group===`walk`?`${t} ${br.filter(e=>e.group===`walk`).indexOf(e)+1}`:t}stage(e){if(e.group!==`walk`)return``;let t=Sr(e.id),n=this.world.goal;return t.every(e=>e<n)?`done`:t.includes(n)?`now`:``}setTocShut(e,t){if(this.win.el.classList.toggle(`toc-shut`,e),this.fold.setAttribute(`aria-expanded`,String(!e)),this.fold.replaceChildren(bn(e?`foldDown`:`foldUp`),C(e?`docs.toc.open`:`docs.toc.shut`)),t)try{localStorage.setItem(Pr,e?`1`:`0`)}catch{}}forgetRead(){try{localStorage.removeItem(Nr)}catch{}}refreshBody(){let e=this.progress,t=new Set(this.visible().map(e=>e.id));this.body.querySelectorAll(`a[data-page]`).forEach(e=>{let n=t.has(e.dataset.page);e.classList.toggle(`locked`,!n),e.title=n?``:C(`docs.locked`)}),this.body.querySelectorAll(`[data-need]`).forEach(t=>{let n=t.dataset.need??``,r=!n||Cr(e,n);if(t.tagName===`PRE`){let e=t.nextElementSibling,i=e?.querySelector(`button`),a=e?.querySelector(`.runes`);i&&(i.disabled=!r),a&&(a.textContent=`${C(`docs.runes`,t.dataset.runes??``)}${r?``:` · ${C(`docs.needSeal`,Ir(n))}`}`)}else t.hidden=!r}),this.body.querySelectorAll(`pre.try:not([data-need])`).forEach(e=>{let t=e.nextElementSibling?.querySelector(`.runes`);t&&(t.textContent=C(`docs.runes`,e.dataset.runes??``))}),this.body.querySelectorAll(`li[data-goal]`).forEach(e=>{let t=Number(e.dataset.goal);e.classList.toggle(`done`,t<this.world.goal),e.classList.toggle(`now`,t===this.world.goal)})}update(){let e=this.visible(),t=this.world,n=`${[...t.owned].join(`,`)}|${t.goal}|${k.length}`,r=e.map(e=>`${e.id}${this.read.has(e.id)?``:`*`}`).join(`|`)+`@${this.current}#${n}`;r!==this.tocKey&&(this.tocKey=r,this.drawToc(e));let i=`${this.current}#${n}`;i!==this.bodyKey&&(this.bodyKey=i,this.refreshBody())}drawToc(e){this.toc.replaceChildren(...yr.map(t=>{let n=document.createElement(`section`);n.className=`toc-group`;let r=document.createElement(`h4`);r.textContent=t.title;let i=document.createElement(`ul`),a=0;for(let n of br.filter(e=>e.group===t.id)){if(n.group===`walk`&&a++,!e.includes(n))continue;let t=document.createElement(`li`);if(n.group===`walk`){let e=document.createElement(`span`);e.className=`n`,e.textContent=`${a}`,t.append(e);let r=this.stage(n);r&&t.classList.add(r)}n.group===`dict`&&t.classList.add(`code`),t.append(n.title),n.id===this.current?t.classList.add(`on`):this.read.has(n.id)||t.classList.add(`new`),t.onclick=()=>this.open(n.id),i.appendChild(t)}return n.append(r,i),n.hidden=!i.childElementCount,n}))}},Rr=class{host;list=document.querySelector(`#dock-list`);add=document.querySelector(`#btn-new`);key=``;constructor(e){this.host=e}where(e){return e.running?this.host.world.rings<=1?[`ringIn`,C(`dock.ring`)]:e.ring===0?[`ringIn`,C(`dock.inner`)]:[`ringOut`,C(`dock.outer`)]:[`ringOff`,C(`dock.stopped`)]}update(){let e=this.host.world,t=e.spells.map(e=>`${e.id}:${e.name}:${e.running?e.ring:-1}:${+!!this.host.isOpen(e.id)}`).join(`|`)+`/${e.rings}`;if(t===this.key)return;this.key=t,this.list.replaceChildren(...e.spells.map(e=>this.chip(e)));let n=e.spells.length>=6;this.add.setAttribute(`aria-disabled`,String(n)),this.add.title=n?C(`dock.full`,6):C(`menu.new`)}chip(e){let[t,n]=this.where(e),r=this.host.isOpen(e.id),i=document.createElement(`button`);i.className=`chip${r?``:` shut`}${e.running?``:` idle`}`,i.title=`${e.name} · ${n}${r?``:` · ${C(`dock.shut`)}`}`;let a=/^(.*?)(\d+)$/.exec(e.name),o=document.createElement(`span`);if(o.className=`nm`,a&&a[1]){let e=document.createElement(`span`);e.className=`pre`,e.textContent=a[1],o.append(e,a[2])}else o.textContent=e.name;return i.append(bn(t),o),i.onclick=()=>this.host.open(e.id),i}},zr=e=>{let t=document.querySelector(e);if(!t)throw Error(`요소 없음: ${e}`);return t},Br=class{world;help;rate=zr(`#rate`);best=zr(`#best`);goalBox=zr(`#goal`);goalCount=zr(`#goal-count`);goalText=zr(`#goal-text`);goalBar=zr(`#goal-bar`);goalFill=zr(`#goal-bar i`);goalNum=zr(`#goal-num`);goalBtn=zr(`#goal-help`);manaRow=zr(`#mana-row`);manaFill=zr(`#mana-fill`);manaNum=zr(`#mana-num`);toast=zr(`#toast`);resEls=new Map;rateSum=document.createElement(`span`);yrEls=new Map;yrKey=``;cache=new Map;toastUntil=0;hudEl=zr(`#hud`);fitKey=``;constructor(e,t){this.world=e,this.help=t;for(let e of lt){let t=zr(`.res[data-k="${e}"]`),r=t.querySelector(`img`);r.src=n(e),r.alt=C(`res.${e}`),t.title=C(`res.${e}`),this.resEls.set(e,{box:t,num:t.querySelector(`b`),shown:-1,bumpUntil:0});let i=document.createElement(`span`);i.className=`yr`,i.dataset.k=e,i.title=C(`hud.yr.title`,C(`res.${e}`));let a=document.createElement(`img`);a.alt=``,a.src=n(e);let o=document.createElement(`b`);i.append(a,o),this.yrEls.set(e,{box:i,num:o})}this.manaRow.hidden=!1,this.manaRow.querySelector(`span`).textContent=C(`mana.label`),this.rateSum.title=C(`hud.rate.title`),this.best.title=C(`hud.best.title`),this.goalBtn.onclick=()=>{let e=k[this.world.goal];e&&(e.tree?this.help.openTree():e.page&&this.help.openPage(e.page))}}set(e,t){this.cache.get(e)!==t&&(this.cache.set(e,t),e.textContent=t)}say(e,t=2600){this.toast.textContent=e,this.toast.hidden=!1,this.toastUntil=performance.now()+t}unlocked(e){let t=this.world;return e===`glow`?t.owned.has(`wisp`):e===`zeal`?t.owned.has(`beast`):e===`ess`||t.owned.has(`sprite`)}update(){let e=this.world,t=performance.now();for(let n of lt){let r=this.resEls.get(n),i=e.res[n];r.box.hidden=!this.unlocked(n),i!==r.shown&&(i>r.shown&&r.shown>=0&&(r.bumpUntil=t+90),r.shown=i,r.num.textContent=`${i}`),r.box.classList.toggle(`bump`,t<r.bumpUntil)}let n=e.owned.has(`grid3`);if(this.rate.hidden=!n,this.best.hidden=!n,n){let t=lt.filter(e=>this.unlocked(e)),n=t.join();n!==this.yrKey&&(this.yrKey=n,this.rate.replaceChildren(this.rateSum,...t.map(e=>this.yrEls.get(e).box))),this.set(this.rateSum,C(`hud.rate`,e.yieldRate().toFixed(1)));let r=e.yieldRates();for(let e of t){let t=this.yrEls.get(e),n=r[e].toFixed(1);this.set(t.num,n),t.box.classList.toggle(`zero`,Number(n)===0)}this.set(this.best,C(`hud.best`,e.best.toFixed(1)))}let r=k[e.goal];if(!r)this.set(this.goalCount,C(`goal.count`,k.length,k.length)),this.set(this.goalText,C(`goal.allDone`)),this.goalBar.hidden=!0,this.goalNum.hidden=!0,this.goalBtn.hidden=!0;else{this.set(this.goalCount,C(`goal.count`,e.goal+1,k.length)),this.set(this.goalText,r.text);let t=r.progress?.(e);if(this.goalBar.hidden=!t,this.goalNum.hidden=!t,t){let[e,n]=t;this.goalFill.style.width=`${Math.round(Math.min(1,e/n)*100)}%`;let r=n<10&&!Number.isInteger(n)?e.toFixed(1):`${Math.floor(e)}`;this.set(this.goalNum,`${r} / ${n}`)}this.goalBtn.hidden=!(r.tree||r.page);let n=r.tree?`tree`:`book`;this.goalBtn.dataset.k!==n&&(this.goalBtn.dataset.k=n,this.goalBtn.replaceChildren(bn(n),r.tree?C(`goal.openTree`):C(`goal.openGuide`)))}this.fit(),this.goalBox.classList.toggle(`flash`,t<this.toastUntil);let i=e.mana/e.manaMax;this.manaFill.style.width=`${Math.round(i*100)}%`,this.manaRow.classList.toggle(`low`,e.silence>0||i<.2),this.set(this.manaNum,e.silence>0?C(`mana.silence`,e.silence.toFixed(1)):C(`mana.amount`,Math.floor(e.mana),e.manaMax)),!this.toast.hidden&&t>this.toastUntil&&(this.toast.hidden=!0)}fit(){let e=this.world,t=[window.innerWidth,e.spells.length,e.spells.map(e=>e.name).join(),e.owned.has(`sprite`),e.owned.has(`beast`),e.owned.has(`wisp`),e.owned.has(`grid3`),lt.map(t=>`${e.res[t]}`.length).join(),this.rate.textContent?.length,this.best.textContent?.length].join(`|`);if(t===this.fitKey)return;this.fitKey=t,this.hudEl.classList.remove(`tight`,`tighter`,`tightest`);let n=()=>this.hudEl.scrollWidth>this.hudEl.clientWidth;for(let e of[`tight`,`tighter`,`tightest`]){if(!n())break;this.hudEl.classList.add(e)}}},Vr=180,Hr=56,Ur=class{g;span=120;constructor(e){e.width=Vr,e.height=Hr,this.g=e.getContext(`2d`)}draw(e){let t=this.g;t.fillStyle=we.paper,t.fillRect(0,0,Vr,Hr);let n=e.time,r=this.span?Math.max(0,n-this.span):0,i=Math.max(10,n-r),a=e.trail.filter(e=>e.t>=r),o=Math.max(1,...a.map(e=>e.rate))*1.15,s=e=>Math.round((e-r)/i*177)+1,c=e=>53-Math.round(e/o*48);t.fillStyle=we.mid,t.fillRect(0,54,Vr,1);for(let e=0;e<Vr;e+=4)t.fillRect(e,c(o/1.15),1,1);for(let n of e.marks){if(n.t<r)continue;t.fillStyle=we[n.kind===`unlock`?`teal`:`red`];let e=s(n.t);for(let r=2;r<54;r+=n.kind===`unlock`?1:2)t.fillRect(e,r,1,1)}t.fillStyle=we.ink;for(let e=1;e<a.length;e++){let n=s(a[e-1].t),r=c(a[e-1].rate),i=s(a[e].t),o=c(a[e].rate),l=Math.abs(i-n),u=-Math.abs(o-r),d=n<i?1:-1,f=r<o?1:-1,p=l+u;for(let e=0;e<400&&(t.fillRect(n,r,1,1),n!==i||r!==o);e++){let e=2*p;e>=u&&(p+=u,n+=d),e<=l&&(p+=l,r+=f)}}let l=a[a.length-1];return l&&(t.fillStyle=we.red,t.fillRect(s(l.t)-1,c(l.rate)-1,3,3)),o/1.15}},Wr=e=>{let t=Math.floor(e/60),n=Math.floor(e%60);return C(`rec.clock`,t,`${n<10?`0`:``}${n}`)},Gr=class{world;win=new Mr(`records`,C(`rec.title`),{closable:!0,minW:320,minH:220});chart;axis=document.createElement(`div`);stats=document.createElement(`dl`);table=document.createElement(`table`);spanBtn=document.createElement(`button`);cache=``;acc=1;constructor(e,t){this.world=e,this.win.el.classList.add(`records-win`);let n=document.createElement(`canvas`);n.className=`chart`,this.chart=new Ur(n);let r=document.createElement(`div`);r.className=`chart-head`,this.axis.className=`dim`,this.spanBtn.className=`quiet`,this.spanBtn.onclick=()=>{this.chart.span=this.chart.span?0:120,this.acc=1},r.append(this.axis,this.spanBtn);let i=document.createElement(`p`);i.className=`legend`,i.innerHTML=`<i class="l-red"></i>${C(`rec.legend.inscribe`)} &nbsp; <i class="l-teal"></i>${C(`rec.legend.unlock`)}`,this.win.body.append(r,n,i,this.stats,this.table,this.saveBox(t))}saveBox(e){let t=document.createElement(`div`);t.className=`save-io`;let n=document.createElement(`button`);n.textContent=C(`save.export`),n.title=C(`save.export.title`);let r=document.createElement(`button`);r.textContent=C(`save.import`),r.title=C(`save.import.title`);let i=document.createElement(`textarea`);i.spellcheck=!1,i.hidden=!0;let a=document.createElement(`button`);a.textContent=C(`save.apply`),a.hidden=!0;let o=document.createElement(`p`);o.hidden=!0;let s=(e,t=!1)=>{o.textContent=e,o.classList.toggle(`bad`,t),o.hidden=!e};return n.onclick=()=>{let t=e.exportCode();i.hidden=!1,i.readOnly=!0,i.value=t,i.select(),a.hidden=!0,s(C(`save.exporting`));let n=()=>s(C(`save.copied`)),r=()=>s(C(`save.copyFail`));try{navigator.clipboard?.writeText(t).then(n,r)??r()}catch{r()}},r.onclick=()=>{i.hidden=!1,i.readOnly=!1,i.value=``,i.placeholder=C(`save.paste`),a.hidden=!1,s(C(`save.import.lead`)),i.focus()},a.onclick=()=>{let t=e.importCode(i.value);t&&s(t,!0)},t.append(n,r,a,i,o),t}update(e){if(!this.win.shown||(this.acc+=e,this.acc<.5))return;this.acc=0;let t=this.world,n=this.chart.draw(t);this.axis.textContent=C(`rec.axis`,n.toFixed(1)),this.spanBtn.textContent=this.chart.span?C(`rec.span.recent`):C(`rec.span.all`);let r=t.spells.map(e=>{let n=t.spellStat(e),r=e.running?n.ready?n.rate.toFixed(1):C(`rec.measuring`):C(`rec.stopped`),i=e.runes.length?C(`rec.cycle`,t.cycleOf(e).toFixed(2)):`-`;return`<tr><td>${e.name}</td><td>${e.runes.length||`-`}</td><td>${i}</td><td>${r}</td></tr>`}).join(``),i=`<dt>${C(`rec.now`)}</dt><dd>${C(`hud.rate`,t.yieldRate().toFixed(1))}</dd><dt>${C(`rec.best`)}</dt><dd>${C(`hud.rate`,t.best.toFixed(1))}</dd><dt>${C(`rec.kills`)}</dt><dd>${t.kills}</dd><dt>${C(`rec.played`)}</dt><dd>${Wr(t.played)}</dd>|<tr><th>${C(`rec.col.spell`)}</th><th>${C(`rec.col.runes`)}</th><th>${C(`rec.col.cycle`)}</th><th>${C(`rec.col.rate`)}</th></tr>${r}`;if(i===this.cache)return;this.cache=i;let[a,o]=i.split(`|`);this.stats.innerHTML=a,this.table.innerHTML=o}},Kr=re.define(),qr=re.define(),Jr=re.define(),Yr=re.define();function Xr(e,t,n){let r=new qe;for(let i of[...new Set(t)].sort((e,t)=>e-t))if(i>=1&&i<=e.doc.lines){let t=e.doc.line(i);r.add(t.from,t.from,n)}return r.finish()}function Zr(e,t){let n=xe.line({class:t});return s.define({create:()=>xe.none,update(t,r){let i=t.map(r.changes);for(let t of r.effects)t.is(e)&&(i=Xr(r.state,t.value,n));return i},provide:e=>ye.decorations.from(e)})}var Qr=s.define({create:()=>new Map,update(e,t){for(let e of t.effects)if(e.is(Yr))return e.value;return e}}),$r=class e extends le{n;constructor(e){super(),this.n=e}eq(t){return t instanceof e&&t.n===this.n}toDOM(){let e=document.createElement(`span`);return e.textContent=`${this.n}`,e.title=C(`editor.lineRunes`,this.n),e}},ei=Xe({class:`cm-cost-gutter`,lineMarker(e,t){let n=e.state.field(Qr).get(e.state.doc.lineAt(t.from).number);return n?new $r(n):null},lineMarkerChange:e=>e.transactions.some(e=>e.effects.some(e=>e.is(Yr))),initialSpacer:()=>new $r(88)}),ti=Oe.define([{tag:[Ae.keyword,Ae.controlKeyword,Ae.definitionKeyword,Ae.operatorKeyword,Ae.moduleKeyword],color:we.red,fontWeight:`700`},{tag:[Ae.number,Ae.bool,Ae.null,Ae.string],color:we.teal},{tag:Ae.comment,color:we.mid}]),ni=ye.theme({"&":{height:`100%`,color:we.ink,backgroundColor:`transparent`},"&.cm-focused":{outline:`none`},".cm-scroller":{fontFamily:`var(--font-code)`,fontSize:`var(--code-size)`,lineHeight:`var(--code-line)`},".cm-content":{caretColor:we.ink,padding:`6px 0`},".cm-cursor":{borderLeft:`2px solid ${we.ink}`},".cm-gutters":{backgroundColor:`transparent`,color:we.mid,border:`none`,fontFamily:`var(--font-code)`},".cm-lineNumbers .cm-gutterElement":{padding:`0 6px 0 8px`,minWidth:`24px`},".cm-cost-gutter .cm-gutterElement":{padding:`0 10px 0 0`,minWidth:`26px`,textAlign:`right`,color:we.teal,fontWeight:`700`},".cm-matchingBracket, .cm-nonmatchingBracket":{backgroundColor:`transparent`,outline:`1px solid ${we.mid}`}}),ri=class{view;chantLine=0;firedUntil=0;constructor(e,t,n){this.view=new ye({parent:e,state:te.create({doc:t,extensions:[Ye(),Qr,ei,Re(),Ge(),_e.of(`    `),he(),Ue(),Be(),He(),ni,Fe(ti),Zr(Kr,`cm-chanting`),Zr(qr,`cm-fired`),Zr(Jr,`cm-broken`),r.highest(fe.of([{key:`Mod-Enter`,run:()=>(n.apply(),!0)}])),fe.of([{key:`Mod-Shift-z`,run:Ne,preventDefault:!0},...me,...Me,...Ce,de]),ye.updateListener.of(e=>{e.docChanged&&n.change(e.state.doc.toString()),e.focusChanged&&e.view.hasFocus&&n.focus()})]})})}get text(){return this.view.state.doc.toString()}setText(e){this.view.dispatch({changes:{from:0,to:this.view.state.doc.length,insert:e}})}setCosts(e){this.view.dispatch({effects:Yr.of(e)})}setChantLine(e){e!==this.chantLine&&(this.chantLine=e,this.view.dispatch({effects:Kr.of(e?[e]:[])}))}fire(e){this.firedUntil=performance.now()+160,this.view.dispatch({effects:qr.of(e)})}tick(){this.firedUntil&&performance.now()>this.firedUntil&&(this.firedUntil=0,this.view.dispatch({effects:qr.of([])}))}setErrorLine(e){this.view.dispatch({effects:Jr.of(e===null||e<1?[]:[e])})}focus(){this.view.focus()}destroy(){this.view.destroy()}},ii={same:``,draft:``,broken:``,stopped:``},ai=(e,t=2)=>e.toFixed(t),oi=class{spell;win;editor;host;sealBtn=document.createElement(`button`);sealImg=document.createElement(`img`);stateEl=document.createElement(`div`);statEl=document.createElement(`div`);errEl=document.createElement(`p`);stopBtn=document.createElement(`button`);dropBtn=document.createElement(`button`);edWrap=document.createElement(`div`);pending=null;refusal=``;reviewTimer=0;dropArmed=0;dropTimer=0;cache=new Map;sealState=``;constructor(e,t){if(this.spell=t,this.host=e,!ii.same)for(let e of Object.keys(ii))ii[e]=p(e);this.win=new Mr(`spell-${t.name}`,t.name,{closable:!0,icon:`scroll`,minW:260,minH:200}),this.win.el.classList.add(`spell-win`),this.edWrap.className=`ed`,this.editor=new ri(this.edWrap,t.draft,{apply:()=>this.inscribe(),change:e=>this.onEdit(e),focus:()=>e.focused(this)});let n=document.createElement(`div`);n.className=`ritual`,this.sealBtn.className=`seal-btn`,this.sealBtn.title=C(`spell.inscribe.title`),this.sealImg.alt=``;let r=document.createElement(`span`);r.textContent=C(`spell.inscribe`),this.sealBtn.append(this.sealImg,r),this.sealBtn.onclick=()=>this.inscribe();let i=document.createElement(`div`);i.className=`ritual-text`,this.stateEl.className=`state`,this.statEl.className=`stat`,i.append(this.stateEl,this.statEl),this.stopBtn.className=`stop-btn`,this.stopBtn.title=C(`spell.stop.title`);let a=document.createElement(`span`);a.textContent=C(`spell.stop`),this.stopBtn.append(bn(`stop`),a),this.stopBtn.onclick=()=>{e.world.stop(t.id),e.changed()},n.append(this.sealBtn,this.stopBtn,i),this.dropBtn.className=`win-drop`;let o=document.createElement(`span`);this.dropBtn.append(bn(`trash`),o);let s=()=>{this.dropArmed=0,this.dropBtn.classList.remove(`armed`),o.textContent=``,this.dropBtn.title=C(`spell.drop`),this.dropBtn.setAttribute(`aria-label`,C(`spell.drop`))};s(),this.dropBtn.onclick=()=>{if(performance.now()<this.dropArmed)return e.remove(this);this.dropArmed=performance.now()+2500,this.dropBtn.classList.add(`armed`),o.textContent=C(`spell.drop.confirm`),this.dropBtn.title=C(`spell.drop.confirm.title`),this.dropBtn.setAttribute(`aria-label`,C(`spell.drop.confirm.title`)),window.clearTimeout(this.dropTimer),this.dropTimer=window.setTimeout(s,2500)},this.win.addTool(this.dropBtn),this.errEl.className=`err`,this.win.body.append(this.edWrap,n,this.errEl),this.review(t.draft)}set(e,t){this.cache.get(e)!==t&&(this.cache.set(e,t),e.innerHTML=t)}setDraft(e){this.editor.setText(e),this.win.show(),this.editor.focus()}onEdit(e){this.spell.draft=e,this.refusal=``,this.editor.setErrorLine(null),window.clearTimeout(this.reviewTimer),this.reviewTimer=window.setTimeout(()=>{this.review(e),this.host.changed()},120)}review(e=this.editor.text){let t=this.host.world.compile(e);this.pending=t,t.ok&&this.editor.setCosts(it(t.module))}inscribe(){let e=this.host.world.inscribe(this.spell.id,this.editor.text);this.pending=e,e.ok?(this.refusal=``,this.editor.setCosts(it(e.module)),this.editor.setErrorLine(null),this.edWrap.classList.remove(`burn`),this.edWrap.offsetWidth,this.edWrap.classList.add(`burn`),this.host.changed()):(this.refusal=e.line>0?``:e.message,this.editor.setErrorLine(e.line),this.host.refused())}onFx(e){e.t===`release`&&e.spell===this.spell.id&&e.lines.length&&this.isSame()&&this.editor.fire(e.lines)}isSame(){return this.spell.running&&this.spell.draft===this.spell.source}update(){let e=this.host.world,t=this.spell,n=this.isSame(),r=t.runes.length,i=e.cycleOf(t),a=C(`phase.stopped`);t.running&&(a=t.inscribing>0?C(`phase.inscribing`):e.silence>0?C(`phase.silence`,ai(e.silence,1)):t.phase===`release`?C(`phase.release`):C(`phase.chant`,e.chantIndex(t)+1,r)),this.win.setTitle(C(`spell.title`,t.name,a)),this.win.el.classList.toggle(`idle`,!t.running);let o,s,c=this.pending;if(c&&!c.ok)o=`broken`,s=`<b class="bad">${C(`state.broken`)}</b> · ${c.line>0?`${C(`state.line`,c.line)} · `:``}${si(c.message)}`;else if(n&&t.calling)o=`same`,s=`<b>${C(`state.calling`)}</b> · ${C(`state.calling.rest`,r,ai(i))}`;else if(n)o=`same`,s=`<b>${C(`state.same`)}</b> · ${C(`state.same.rest`,r,ai(i))}`;else{let n=c&&c.ok?c.nodes:0,a=S(n,e.beat);if(!t.running)o=`stopped`,s=`<b>${C(`state.stopped`)}</b> · ${C(`state.stopped.rest`,n,ai(a))}`;else{o=`draft`;let e=n-r,t=a-i,c=Math.abs(t)<.005?C(`state.speed.same`):t<0?C(`state.speed.faster`,ai(-t)):C(`state.speed.slower`,ai(t));s=`<b class="draft">${C(`state.draft`)}</b> · ${C(`state.draft.rest`,n,`${e>0?`+`:``}${e}`,ai(a),c)}`}}o!==this.sealState&&(this.sealState=o,this.sealImg.src=ii[o],this.sealBtn.dataset.state=o),this.set(this.stateEl,s);let l=``;if(t.running){let n=e.spellStat(t);if(l=n.ready?`${C(`stat.now`)} <b>${C(`stat.rate`,ai(n.rate,1))}</b>`:`${C(`stat.now`)} <span class="dim">${C(`stat.measuring`,Math.floor(n.elapsed))}</span>`,t.prev&&(l+=` · ${C(`stat.prev`,ai(t.prev.rate,1))} <span class="dim">${C(`stat.prev.runes`,t.prev.runes)}</span>`,n.ready&&t.prev.rate>0)){let e=n.rate/t.prev.rate;l+=e>=1.05?` <b class="up">${C(`stat.up`,ai(e,1))}</b>`:e<=.95?` <b class="bad">${C(`stat.down`,ai(e,1))}</b>`:` <span class="dim">${C(`stat.similar`)}</span>`}if(e.owned.has(`resonance`)){let n=e.multOf(t.ring);l+=` · <b class="mult${n<1.15?` low`:``}" title="${C(`stat.resonance.title`)}">${C(`stat.resonance`,ai(n))}</b>`}t.knocked>0&&(l+=` · <b class="bad" title="${C(`stat.knocked.title`)}">${C(`stat.knocked`,t.knocked)}</b>`)}this.set(this.statEl,l),this.stopBtn.disabled=!t.running,this.dropBtn.hidden=e.spells.length<=1;let u=[];this.refusal&&u.push(this.refusal),t.error&&t.running&&u.push(C(`spell.fizzled`,t.error.line,t.error.message)),t.printed&&u.push(C(`spell.printed`,t.printed));let d=u.join(`
`);this.cache.get(this.errEl)!==d&&(this.cache.set(this.errEl,d),this.errEl.textContent=d);let f=n&&t.inscribing<=0&&e.silence<=0&&t.phase===`chant`;this.editor.setChantLine(f?t.runes[e.chantIndex(t)]?.line??0:0),this.editor.tick()}destroy(){window.clearTimeout(this.reviewTimer),window.clearTimeout(this.dropTimer),this.editor.destroy(),this.win.destroy()}};function si(e){return e.replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e])}var ci=[`trBeast`,`trWord`,`trTool`,`trGrid`,`trTempo`],li=18,ui=16,di=class{world;onBuy;onRead;onClose;el=document.querySelector(`#tree`);board=document.createElement(`div`);svg=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);purse=document.createElement(`div`);note=document.createElement(`div`);nodes=new Map;scroller=document.createElement(`div`);icons={};key=``;edgeKey=``;fresh=``;constructor(e,t,r,i){this.world=e,this.onBuy=t,this.onRead=r,this.onClose=i;for(let e of lt)this.icons[e]=n(e);let a=document.createElement(`header`),o=document.createElement(`h2`);o.append(bn(`tree`),C(`tree.title`));let s=document.createElement(`p`);s.textContent=C(`tree.lead`);let c=document.createElement(`button`);c.title=C(`tree.close.title`),c.append(bn(`close`),C(`tree.close`)),c.onclick=()=>this.close(),this.purse.className=`tree-purse`,a.append(o,this.purse,c);let l=Math.max(...E.map(e=>e.col))+1,u=Math.max(...E.map(e=>e.row))+1,d=e=>{if(e.gives.length<ui)return 1;let t=1;for(;t<3&&!E.some(n=>n.row===e.row&&n.col===e.col+t);)t++;return t},f=Math.max(...E.map(e=>e.col+d(e)));this.board.className=`tree-board`,this.board.style.gridTemplateColumns=`var(--track-w) repeat(${Math.max(l,f)}, var(--node-w))`,this.board.style.gridTemplateRows=`repeat(${u}, auto)`,this.board.appendChild(this.svg),ct.forEach((e,t)=>{let n=document.createElement(`div`);n.className=`track`,n.append(bn(ci[t]??`trGrid`),e),n.style.gridRow=`${t+1}`,this.board.appendChild(n)});for(let e of E){let t=document.createElement(`div`);t.className=`node`,t.style.gridRow=`${e.row+1}`,t.style.gridColumn=`${e.col+2} / span ${d(e)}`,this.board.appendChild(t),this.nodes.set(e.id,t)}this.scroller.className=`tree-scroll`,this.scroller.appendChild(this.board),this.note.className=`tree-note`,this.el.append(a,s,this.scroller,this.note)}get shown(){return!this.el.hidden}open(){this.el.hidden=!1,this.key=``,this.update(),this.reveal()}reveal(){let e=this.world,t=E.filter(t=>e.canBuy(t));if(t.length||(t=e.available()),!t.length)return;let n=t.map(e=>this.nodes.get(e.id)),r=this.board.querySelector(`.track`),i=r?r.offsetWidth+li:0,a=Math.min(...n.map(e=>e.offsetLeft)),o=Math.max(...n.map(e=>e.offsetLeft+e.offsetWidth)),s=Math.min(...n.map(e=>e.offsetTop)),c=Math.max(...n.map(e=>e.offsetTop+e.offsetHeight)),l=this.scroller,u=(parseFloat(getComputedStyle(this.board).getPropertyValue(`--node-w`))||176)+li,d=a-i-u;o-d>l.clientWidth&&(d=Math.min(a-i-li,o-l.clientWidth+li));let f=l.scrollTop;(c-f>l.clientHeight||s<f)&&(f=Math.max(0,Math.min(s-li,c-l.clientHeight+li))),l.scrollTo({left:Math.max(0,d),top:Math.max(0,f)})}close(){this.el.hidden||(this.el.hidden=!0,this.onClose())}toggle(){this.shown?this.close():this.open()}bought(e,t){this.fresh=e,this.key=``;let n=E.find(t=>t.id===e);this.note.replaceChildren();let r=document.createElement(`span`);if(r.textContent=C(t?`tree.bought.page`:`tree.bought`,n.title),this.note.appendChild(r),t){let t=document.createElement(`button`);t.className=`stamp`,t.textContent=C(`tree.read`),t.onclick=()=>{this.close(),this.onRead(e)},this.note.appendChild(t)}window.setTimeout(()=>{this.fresh===e&&(this.fresh=``,this.key=``)},1600)}anyAffordable(){return E.some(e=>this.world.canBuy(e))}update(){if(this.el.hidden)return;let e=this.world,t=E.map(t=>e.owned.has(t.id)?`o`:e.canBuy(t)?`b`:(t.req??[]).every(t=>e.owned.has(t))?`a`:`l`).join(``)+lt.map(t=>e.res[t]).join(`,`)+this.fresh;if(t!==this.key){this.key=t,this.purse.replaceChildren(...lt.filter(t=>t===`ess`||e.res[t]>0||e.owned.has(t===`zeal`?`beast`:t===`glow`?`wisp`:`sprite`)).map(t=>{let n=document.createElement(`span`),r=document.createElement(`img`);return r.src=this.icons[t],r.alt=``,n.append(r,`${e.res[t]}`),n}));for(let t of E){let n=this.nodes.get(t.id),r=e.owned.has(t.id),i=(t.req??[]).every(t=>e.owned.has(t)),a=e.canBuy(t);n.className=`node ${r?`owned`:a?`can`:i?`open`:`locked`}${this.fresh===t.id?` fresh`:``}`,n.replaceChildren();let o=document.createElement(`div`);o.className=`node-title`;let s=document.createElement(`span`);s.textContent=t.title;let[c,l]=r?[`check`,C(`tree.state.owned`)]:a?[`lockOpen`,C(`tree.state.can`)]:i?[`lock`,C(`tree.state.lack`)]:[`lock`,C(`tree.state.locked`)],u=bn(c,`node-state${!r&&!i?` dim`:``}`);u.removeAttribute(`aria-hidden`),u.setAttribute(`role`,`img`),u.setAttribute(`aria-label`,l),u.title=l,o.append(s,u);let d=document.createElement(`div`);d.className=`node-blurb`,d.textContent=t.blurb;let f=document.createElement(`div`);f.className=`node-gives`;for(let e of t.gives){let t=document.createElement(`code`);t.textContent=e,f.appendChild(t)}let p=document.createElement(`div`);if(p.className=`node-foot`,r)p.textContent=C(`tree.state.owned`);else{let n=document.createElement(`span`);n.className=`cost`;for(let r of lt){let i=t.cost[r];if(!i)continue;let a=document.createElement(`span`);e.res[r]<i&&(a.className=`lack`);let o=document.createElement(`img`);o.src=this.icons[r],o.alt=``,a.append(o,`${i}`),n.appendChild(a)}if(p.appendChild(n),a){let e=document.createElement(`button`);e.textContent=C(`tree.buy`),e.className=`stamp`,e.onclick=()=>this.onBuy(t.id),p.appendChild(e)}}n.append(o,d,f,p)}this.drawEdges()}}drawEdges(){let e=this.world,t=E.map(t=>e.owned.has(t.id)?`o`:e.canBuy(t)?`b`:`l`).join(``)+this.board.offsetWidth;if(t===this.edgeKey)return;this.edgeKey=t,this.svg.setAttribute(`width`,`${this.board.scrollWidth}`),this.svg.setAttribute(`height`,`${this.board.scrollHeight}`);let n=new Set(E.map(e=>`${e.row}:${e.col}`)),r=(e,t,r)=>{for(let i=t;i<=r;i++)if(n.has(`${e}:${i}`))return!1;return!0},i=e=>{let t=this.nodes.get(e.id);return{l:t.offsetLeft,r:t.offsetLeft+t.offsetWidth,t:t.offsetTop,b:t.offsetTop+t.offsetHeight,m:Math.round(t.offsetTop+t.offsetHeight/2)}},a=[],o=[];for(let e of E){let t=i(e);a[e.row]=Math.min(a[e.row]??t.t,t.t),o[e.row]=Math.max(o[e.row]??t.b,t.b)}let s=li/2;this.svg.replaceChildren();for(let t of E)for(let n of t.req??[]){let c=E.find(e=>e.id===n),l=i(c),u=i(t),d;if(r(c.row,c.col+1,t.col-1))d=`M${l.r} ${l.m} H${u.l-s} V${u.m} H${u.l}`;else if(r(t.row,c.col+1,t.col-1))d=`M${l.r} ${l.m} H${l.r+s} V${u.m} H${u.l}`;else{let e=c.row>t.row?o[t.row]+s:a[t.row]-s;d=`M${l.r} ${l.m} H${l.r+s} V${e} H${u.l-s} V${u.m} H${u.l}`}let f=document.createElementNS(`http://www.w3.org/2000/svg`,`path`);f.setAttribute(`d`,d),f.setAttribute(`class`,e.owned.has(n)?e.owned.has(t.id)?`edge done`:`edge open`:`edge`),this.svg.appendChild(f)}}},fi=104;function pi(){try{return JSON.parse(localStorage.getItem(`runepy.save.v2`)??`null`)}catch{return null}}function mi(e){try{e?localStorage.setItem(Ft,JSON.stringify(e)):localStorage.removeItem(Ft)}catch{}}var hi=e=>document.querySelector(e);async function gi(){await Promise.all([`16px D2Coding`,`700 16px D2Coding`,`16px "Gowun Batang"`,`700 16px "Gowun Batang"`,`30px Galmuri14`].map(e=>document.fonts.load(e,`룬 rune 0`))).catch(()=>void 0),yn();let e=(e,t,n=t,r=!1)=>{let i=hi(e);i.title=n,r&&i.setAttribute(`aria-label`,t);let a=i.querySelector(`.lbl`);a&&(a.textContent=t)};e(`#btn-tree`,C(`menu.tree`),C(`menu.tree.title`)),e(`#btn-docs`,C(`menu.docs`)),e(`#btn-records`,C(`menu.records`)),e(`#btn-tidy`,C(`menu.tidy`),C(`menu.tidy`),!0),e(`#btn-new`,C(`menu.new`),C(`menu.new`),!0),e(`#btn-wipe`,C(`menu.wipe`),C(`menu.wipe.title`)),hi(`#dock`).setAttribute(`aria-label`,C(`dock.label`));let t=pi();if(It(t)){document.body.textContent=C(`save.future`,t.v);return}let n=new Pt;t&&n.load(t)||n.inscribe(n.spells[0].id,`cast()`);let r=new nt,i=new pn(hi(`#field`)),a=hi(`#stage`),o=()=>i.fit(a.clientWidth-16,a.clientHeight-44);o();let s=0,c=()=>{window.clearTimeout(s),s=window.setTimeout(()=>mi(n.save()),300)},l=[],u=null,d=()=>Math.max(0,(window.innerWidth-256*i.scale)/2),f=()=>Math.max(280,Math.min(540,d()-24)),p=()=>window.innerHeight-fi-12;function m(e,t){let n=f();if(t<=2){let r=t===1?Math.min(p(),440):(p()-10)/2;return{x:12,y:fi+e*(r+10),w:n,h:r}}return{x:12+e*22,y:fi+e*34,w:n,h:Math.min(p()-e*34,340)}}let h=()=>{let e=Math.max(300,Math.min(560,d()-20));return{x:window.innerWidth-e-12,y:fi,w:e,h:Math.min(p(),680)}},g=()=>({x:window.innerWidth-412,y:Math.max(fi,window.innerHeight-440),w:400,h:428}),_={world:n,changed:c,focused:e=>u=e,refused:()=>r.consume([{t:`fizzle`,spell:0}]),remove:e=>{n.removeSpell(e.spell.id)&&(l.splice(l.indexOf(e),1),u===e&&(u=l[0]??null),e.destroy(),c())}};function v(e,t=!1){let r=new oi(_,e);return l.push(r),r.win.place(m(l.length-1,Math.max(l.length,n.spells.length)),t),t||r.win.restoreShut(),r}for(let e of n.spells)v(e);u=l[0];let y=new Rr({world:n,isOpen:e=>l.some(t=>t.spell.id===e&&t.win.shown),open:e=>{let t=l.find(t=>t.spell.id===e);t&&(t.win.show(),u=t,t.editor.focus())}}),b=new Lr(n,e=>{let t=u??l[0];t.setDraft(e),ee.say(C(`toast.copied`,t.spell.name),3200)});b.win.place(h());let x=new Gr(n,{exportCode:()=>Lt(n.save()),importCode:e=>{let t=Rt(e);return t.ok?(window.clearTimeout(s),ce=!0,mi(t.data),location.reload(),null):C(`save.bad.${t.why}`)}});x.win.place(g()),x.win.el.hidden=!0;let S=new di(n,e=>{if(n.buy(e)){S.bought(e,br.some(t=>t.need===e));for(let e of l)e.review();mi(n.save())}},e=>{b.win.show(),b.open(xr[e]??e)||b.open(br.find(t=>t.need===e)?.id??e)},()=>void 0),ee=new Br(n,{openPage:e=>{b.win.show(),b.open(e)},openTree:()=>S.open()});function te(){o(),l.forEach((e,t)=>{e.win.show(),e.win.place(m(t,l.length),!0)}),b.win.show(),b.win.place(h(),!0),x.win.place(g(),!0)}hi(`#btn-tree`).onclick=()=>S.toggle(),hi(`#btn-docs`).onclick=()=>b.win.shown?b.win.hide():b.win.show(),hi(`#btn-records`).onclick=()=>x.win.shown?x.win.hide():x.win.show(),hi(`#btn-tidy`).onclick=te,hi(`#btn-new`).onclick=()=>{let e=n.addSpell();if(!e)return ee.say(C(`toast.maxSpells`,6));let t=v(e,!0);t.win.front(),u=t,ee.say(n.rings>1?C(`toast.newSpell.free`):C(`toast.newSpell.swap`),3600),c()};let ne=hi(`#btn-mute`),re=()=>{let e=r.muted?C(`menu.soundOn`):C(`menu.soundOff`);ne.title=e,ne.setAttribute(`aria-label`,e),ne.setAttribute(`aria-pressed`,String(r.muted)),ne.querySelector(`.ic`).className=`ic i-${r.muted?`mute`:`sound`}`};re(),ne.onclick=()=>{r.setMuted(!r.muted),re()};let ie=hi(`#btn-wipe`),ae=hi(`#btn-wipe .lbl`),oe=0,se=0;ie.onclick=()=>{performance.now()<oe?(window.clearTimeout(s),mi(null),Ar(),b.forgetRead(),ce=!0,location.reload()):(oe=performance.now()+3e3,ie.classList.add(`armed`),ae.textContent=C(`menu.wipe.confirm`),window.clearTimeout(se),se=window.setTimeout(()=>{ie.classList.remove(`armed`),ae.textContent=C(`menu.wipe`)},3e3))};let ce=!1;window.addEventListener(`keydown`,e=>{if(r.unlock(),e.key===`Escape`&&S.shown)return S.close();e.target?.closest?.(`.cm-editor, input, textarea`)||e.ctrlKey||e.metaKey||e.altKey||(e.key===`t`||e.key===`T`)&&S.toggle()}),window.addEventListener(`pointerdown`,()=>r.unlock()),window.addEventListener(`resize`,o),window.setInterval(()=>!ce&&mi(n.save()),3e3);let le=hi(`#btn-tree .dot`),ue=hi(`#btn-docs .dot`),de=hi(`#btn-docs`),fe=hi(`#btn-records`),pe=e=>{n.update(e);let t=n.fx.splice(0);for(let e of t){for(let t of l)t.onFx(e);e.t===`goal`&&ee.say(C(`goal.done`,k[e.index-1].text))}i.consume(t,n),r.consume(t),i.draw(n,e),y.update(),ee.update();for(let e of l)e.update();b.update(),S.update(),x.update(e),le.hidden=!S.anyAffordable(),ue.hidden=!b.hasUnread(),de.classList.toggle(`on`,b.win.shown),fe.classList.toggle(`on`,x.win.shown)},me=performance.now(),he=e=>{let t=Math.min(.05,(e-me)/1e3);me=e,pe(t),requestAnimationFrame(he)};requestAnimationFrame(he)}gi().catch(e=>{document.body.textContent=C(`boot.fail`,String(e?.message??e))});