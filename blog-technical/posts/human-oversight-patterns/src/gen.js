const fs=require('fs');
const Y='#FFCE4A',G='#A6A6A6',W='#F1F1F1',P='#141414',H='#3a3a3a';
const head=(w,h,extra='')=>`<!DOCTYPE html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=block" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0}html,body{width:${w}px;height:${h}px;background:${P};color:${W};font-family:'Instrument Sans',sans-serif;overflow:hidden;position:relative}
.mono{font-family:'JetBrains Mono',monospace}svg text{font-family:'Instrument Sans',sans-serif}svg .m{font-family:'JetBrains Mono',monospace}${extra}</style></head><body>`;
const out=(n,w,h,body,extra)=>{fs.writeFileSync(n+'.html',head(w,h,extra)+body+'</body></html>');console.log(n,w,h);};

// ---- fig 1
{const W1=802,H1=430;
const rows=[['Authority','Who may decide, and with which qualification'],['Exclusions','Who may not decide'],['Deadline','When the decision is due'],['Timeout outcome','What happens when nobody decides'],['Minimum review','How long a reviewer must look'],['Escalation','Which queue receives the event next'],['Record','Who decided, on what, and why']];
const boxes=[['Workflow step',0],['thenPause',1],['Command arrives',0],['Step continues',0]];
const arrow='<svg width="14" height="30" viewBox="0 0 14 30"><line x1="7" y1="0" x2="7" y2="24" stroke="#A6A6A6" stroke-width="1.5"/><path d="M2 20 L7 28 L12 20" fill="none" stroke="#A6A6A6" stroke-width="1.5"/></svg>';
const left=boxes.map((b,i)=>(i?`<div class="ar">${arrow}</div>`:'')+`<div class="bx ${b[1]?'mono':''}">${b[0]}</div>`).join('');
out('fig-01-wait-and-rules',W1,H1,`<div class="wrap"><div class="pn l"><h2>The Akka SDK</h2><div class="flow">${left}</div></div>
<div class="pn r"><h2>The application</h2>${rows.map(r=>`<div class="rw"><b>${r[0]}</b><span>${r[1]}</span></div>`).join('')}</div></div>`,
`.wrap{display:flex;gap:14px;padding:16px;height:100%}.pn{border:1px solid ${H};padding:18px 20px;display:flex;flex-direction:column}.l{width:230px}.r{flex:1}
h2{font-size:16px;font-weight:600;margin-bottom:16px}.flow{flex:1;display:flex;flex-direction:column;justify-content:space-between;align-items:center}
.bx{width:100%;border:1px solid ${G};text-align:center;padding:13px 6px;font-size:14px;font-weight:500;color:${W}}.bx.mono{font-size:13.5px;font-weight:600}.ar{height:30px}
.rw{flex:1;display:flex;flex-direction:column;justify-content:center;border-top:1px solid ${H};gap:3px}.h2+.rw{border-top:0}
.rw b{color:${Y};font-weight:700;font-size:15px}.rw span{font-size:14px;color:${W}}`);}

// ---- bar helper
const leg=(items,x0,y)=>items.map(([t,c,wd])=>{const s=`<rect x="${x0}" y="${y-6}" width="11" height="11" fill="${c}"/><text x="${x0+18}" y="${y+4}" font-size="13" fill="${G}">${t}</text>`;x0+=wd;return s}).join('');
function bars({name,w,rows,lw,max,rh,top,bh,legend,extraSvg='',h}){
 const bw=w-lw-90; let s=`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`+legend;
 rows.forEach((r,i)=>{const y=top+i*rh+(r.gap||0),cy=y+rh/2,len=r.v/max*bw;
  s+=`<text x="${lw-12}" y="${cy+5}" text-anchor="end" font-size="13.5" fill="${W}">${r.l}</text>`;
  if(r.dash)s+=`<rect x="${lw+.75}" y="${cy-bh/2+.75}" width="${len-1.5}" height="${bh-1.5}" fill="none" stroke="${G}" stroke-width="1.5" stroke-dasharray="5 4"/>`;
  else if(len>0)s+=`<rect x="${lw}" y="${cy-bh/2}" width="${len}" height="${bh}" fill="${r.c}"/>`;
  s+=`<text x="${lw+len+8}" y="${cy+5}" font-size="13.5" font-weight="600" fill="${W}" style="font-variant-numeric:tabular-nums">${r.v}</text>`;});
 s+=`<line x1="${lw}" y1="${top-6}" x2="${lw}" y2="${top+rows.length*rh+(rows[rows.length-1].gap||0)}" stroke="${H}"/>`+extraSvg+'</svg>';
 out(name,w,h,s);}

bars({name:'fig-02-classification',w:802,h:230,lw:230,max:206,rh:44,top:24,bh:26,legend:'',
 rows:[{l:'Person-related controls',v:206,c:W},{l:'In the fourteen patterns',v:183,c:Y},{l:'Overseer registry',v:23,c:G},{l:'Consent controls, left out',v:53,dash:1,gap:22}],
 extraSvg:`<line x1="16" y1="${24+3*44+11}" x2="786" y2="${24+3*44+11}" stroke="${H}"/>`});

const r3=[['Contest and appeal',39,G],['Attestation',34,G],['Triage',22,G],['Change authorization',18,Y],['Decision review',16,Y],['Hand-off',15,Y],['Halt and restart',13,W],['Action approval',6,Y],['Oversight quality',6,G],['Exception',5,Y],['Flag and feedback',4,G],['Override',3,G],['Match and adjudication',2,Y],['Outcome reconciliation',0,Y]].map(a=>({l:a[0],v:a[1],c:a[2]}));
bars({name:'fig-03-by-pattern',w:802,h:510,lw:200,max:39,rh:30,top:62,bh:19,rows:r3,legend:leg([['The work waits',Y,150],['The work continues',G,175],['The capability stops',W,170]],200,24)});

// ---- fig 4
const r4=[['Decision review',8,12],['Halt and restart',10,10],['Change authorization',0,8],['Contest and appeal',8,8],['Triage',6,6],['Action approval',1,3],['Exception',0,2],['Flag and feedback',2,2],['Attestation',1,1],['Hand-off',1,1],['Match and adjudication',0,1],['Override',1,1],['Oversight quality',0,1],['Outcome reconciliation',0,0]];
{const w=802,lw=200,top=62,rh=38,bh=13,max=12,bw=w-lw-90,h=top+14*rh+64;
let s=`<svg width="${w}" height="${h}">`+leg([['October 27',G,130],['October 31',Y,130]],200,24);
r4.forEach((r,i)=>{const y=top+i*rh,cy=y+rh/2;
 s+=`<text x="${lw-12}" y="${cy+5}" text-anchor="end" font-size="13.5" fill="${W}">${r[0]}</text>`;
 [[r[1],G,-bh-1],[r[2],Y,1]].forEach(([v,c,o])=>{const len=v/max*bw;
  if(len>0)s+=`<rect x="${lw}" y="${cy+o}" width="${len}" height="${bh}" fill="${c}"/>`;
  s+=`<text x="${lw+len+7}" y="${cy+o+bh-2}" font-size="12" fill="${c==Y?W:G}" style="font-variant-numeric:tabular-nums">${v}</text>`;});});
s+=`<line x1="${lw}" y1="${top-6}" x2="${lw}" y2="${top+14*rh}" stroke="${H}"/><line x1="16" y1="${top+14*rh+10}" x2="786" y2="${top+14*rh+10}" stroke="${H}"/>
<text x="${lw}" y="${top+14*rh+38}" font-size="12.5" fill="${G}">October 27: 38</text><text x="${lw+150}" y="${top+14*rh+38}" font-size="12.5" fill="${G}">October 31: 56</text></svg>`;
out('fig-04-corpus-change',w,h,s);}

// ---- fig 5
{const w=802,h=410,nw=96,nh=40,ys=150,xs=[24,152,280,408,536,664],names=['Open','Claimed','In review','Decided','Applied','Closed'];
const node=(x,y,t,c,w2=nw,h2=nh,two)=>`<rect x="${x}" y="${y}" width="${w2}" height="${h2}" fill="${P}" stroke="${c}" stroke-width="1.5"/>`+(two?`<text x="${x+w2/2}" y="${y+h2/2-3}" text-anchor="middle" font-size="13.5" font-weight="500" fill="${W}">${two[0]}</text><text x="${x+w2/2}" y="${y+h2/2+13}" text-anchor="middle" font-size="13.5" font-weight="500" fill="${W}">${two[1]}</text>`:`<text x="${x+w2/2}" y="${y+h2/2+5}" text-anchor="middle" font-size="13.5" font-weight="500" fill="${c==Y?W:G}">${t}</text>`);
const ln=(d,c)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="1.6" marker-end="url(#a${c==Y?'y':'g'})"/>`;
let s=`<svg width="${w}" height="${h}"><defs>${[['y',Y],['g',G]].map(([k,c])=>`<marker id="a${k}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1 L10 5 L0 9z" fill="${c}"/></marker>`).join('')}</defs>`;
s+=`<path d="M14 132 H392 V215 H444 V300 H14 Z" fill="none" stroke="#6a6a6a" stroke-width="1" stroke-dasharray="3 4" stroke-linejoin="round"/><text x="100" y="291" font-size="13" fill="${G}">Pending</text>`;
xs.forEach((x,i)=>{s+=node(x,ys,names[i],Y);if(i<5)s+=ln(`M${x+nw} ${ys+20} H${xs[i+1]-1}`,Y)});
s+=node(312,235,'',Y,120,44,['Awaiting second','reviewer']);
s+=ln(`M340 ${ys+nh} V233`,Y)+ln(`M432 257 H456 V${ys+nh+1}`,Y);
s+=node(145,40,'Escalated',G,110)+ln(`M200 ${ys} V82`,G)+`<path d="M100 ${ys} V110 H328 V${ys}" fill="none" stroke="${G}" stroke-width="1.6"/>`
 +ln(`M145 60 H72 V${ys-1}`,G)+`<text x="108" y="52" text-anchor="middle" font-size="12.5" fill="${G}">next queue</text>`;
s+=node(400,40,'Sent back',G,96)+ln(`M352 ${ys} V60 H398`,G)+ln(`M448 40 V24 H36 V${ys-1}`,G)+`<text x="260" y="17" text-anchor="middle" font-size="12.5" fill="${G}">resubmitted</text>`;
const by=345;
s+=node(24,by,'Withdrawn',G)+ln(`M72 ${ys+nh} V${by-1}`,G);
s+=node(202,by,'Timed out',G)+ln(`M250 300 V${by-1}`,G);
s+=node(332,by,'Abandoned',G)+ln(`M380 300 V${by-1}`,G);
s+=node(664,by,'Reopened',G)+ln(`M712 ${ys+nh} V${by-1}`,G);
s+='</svg>';out('fig-05-states',w,h,s);}

// ---- fig 6
{const cols=[['Before the system acts',[[1,'Action approval','w'],[2,'Decision review','w'],[3,'Change authorization','w'],[4,'Exception','w'],[5,'Match and adjudication','w'],[6,'Outcome reconciliation','w']]],
['After the system acts',[[7,'Contest and appeal','c'],[8,'Override','c'],[9,'Flag and feedback','c']]],
['While the system runs',[[10,'Triage','c'],[11,'Hand-off','w'],[12,'Halt and restart','s']]],
['On a schedule or across many decisions',[[13,'Attestation','c'],[14,'Oversight quality','c']]]];
const mk=t=>t=='w'?`<svg width="14" height="14"><circle cx="7" cy="7" r="6" fill="${Y}"/></svg>`:t=='c'?`<svg width="14" height="14"><circle cx="7" cy="7" r="5.2" fill="none" stroke="${G}" stroke-width="1.6"/></svg>`:`<svg width="14" height="14"><rect x="1.5" y="1.5" width="11" height="11" fill="${W}"/></svg>`;
const lg=[['w','The work waits'],['c','The work continues'],['s','The capability stops']].map(([t,l])=>`<span>${mk(t)}${l}</span>`).join('');
out('fig-07-groups',802,372,`<div class="g">${cols.map(c=>`<div class="c"><h3>${c[0]}</h3>${c[1].map(p=>`<div class="p">${mk(p[2])}<i class="mono">${p[0]}</i><span>${p[1]}</span></div>`).join('')}</div>`).join('')}</div><div class="lg">${lg}</div>`,
`.g{display:flex;padding:16px 0 0 16px;height:300px}.c{width:25%;padding:0 14px 0 0;margin-right:14px;border-right:1px solid ${H}}.c:last-child{border:0;margin:0}
h3{font-size:14.5px;font-weight:600;line-height:1.25;height:56px;color:${W}}.p{display:flex;align-items:flex-start;gap:8px;font-size:13.5px;line-height:1.25;margin-bottom:12px}.p svg{flex:none;margin-top:2px}
.p i{font-style:normal;font-size:11.5px;color:${G};width:15px;flex:none;margin-top:2px;text-align:right}.lg{position:absolute;left:16px;right:16px;bottom:16px;border-top:1px solid ${H};padding-top:14px;display:flex;gap:28px;font-size:13px;color:${G}}.lg span{display:flex;gap:8px;align-items:center}`);}

// ---- fig 7
{const w=802,h=440,x0=17,x1=770;
const box=(x,y,wd,ht,c=G)=>`<rect x="${x}" y="${y}" width="${wd}" height="${ht}" fill="none" stroke="${c}" stroke-width="1.2"/>`;
const t=(x,y,s,o='')=>`<text x="${x}" y="${y}" ${o}>${s}</text>`;
const m=(x,y,s,sz=12,fill=W,a='start')=>`<text class="m" x="${x}" y="${y}" font-size="${sz}" font-weight="600" fill="${fill}" text-anchor="${a}">${s}</text>`;
const hd='font-size="14" font-weight="600" fill="#F1F1F1"',sub='font-size="12.5" fill="#A6A6A6"';
let s=`<svg width="${w}" height="${h}"><defs><marker id="ag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 1 L10 5 L0 9z" fill="${G}"/></marker></defs>`;
s+=box(x0,24,300,96)+t(x0+16,50,'Console kit',hd)+m(x0+16,76,'@akka-human/kit',12)+t(x0+16+130,76,'(React)',sub)+m(x0+16,100,'@akka-human/elements',12)+t(x0+16+160,100,'(web components)',sub);
s+=box(x0+312,24,170,96)+t(x0+328,50,'Oversight console',hd);
s+=box(x0+494,24,259,96)+t(x0+510,50,'Sample services',hd)+['patterns','context layer','loan origination'].map((q,i)=>t(x0+510,72+i*17,q,sub)).join('');
[x0+150,x0+397].forEach(x=>s+=`<path d="M${x} 150 V122" stroke="${G}" stroke-width="1.4" fill="none" marker-end="url(#ag)"/>`);
s+=`<rect x="${x0}" y="150" width="${x1-x0}" height="48" fill="none" stroke="${Y}" stroke-width="1.5"/>`+m((x0+x1)/2,180,'/oversight contract',15,Y,'middle');
const mods=[['human-api',[],104],['human-engine',['state machine'],108],['human-akka',['entity, consumer,','view, endpoint'],114],['human-runtime-local',['tool-call guardrail,','halt guardrails,','proof ledger'],150],['human-testkit',[],108],['human-conformance',[],138]];
const gap=(x1-x0-mods.reduce((a,b)=>a+b[2],0))/5,my=250,mh=130;let x=x0,ak=0;
mods.forEach(([n,d,wd])=>{s+=box(x,my,wd,mh)+m(x+wd/2,my+30,n,11.5,W,'middle')+d.map((q,j)=>t(x+wd/2,my+56+j*17,q,sub+' text-anchor="middle"')).join('');
 if(n=='human-akka'){ak=x+wd/2;s+=`<path d="M${ak} ${my} V200" stroke="${G}" stroke-width="1.4" fill="none" marker-end="url(#ag)"/>`;} x+=wd+gap;});
s+=`<path d="M${x0+753} 72 H788 V${my+mh+28} H${ak} V${my+mh+1}" stroke="${G}" stroke-width="1.4" fill="none" marker-end="url(#ag)"/>`;
s+='</svg>';out('fig-19-modules',w,h,s);}
