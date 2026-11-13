let diamondToastTime=0;const diamondFlight=new DiamondFlight(),diamondTrail=document.querySelector('.trail');
diamondTrail.setAttribute('aria-label','Collect diamonds: 2, 5, 8 points. Occasional gold diamond: 15 points.');
const diamondHint=document.createElement('p');diamondHint.className='diamondHint';diamondHint.textContent='◆ 2  ·  ◆ 5  ·  ◆ 8  ·  Gold ◆ 15 (occasional green-ball bonus)';flightBoard.querySelector('.boardActions').before(diamondHint);
const greenDemo=document.createElement('button');greenDemo.id='greenDemo';greenDemo.className='greenDemo';greenDemo.textContent='Hold to simulate a green-ball rise';greenDemo.setAttribute('aria-label','Hold to simulate a green spirometer ball rise');$('practicePanel').append(greenDemo);
greenDemo.onpointerdown=e=>{e.preventDefault();greenDemo.setPointerCapture(e.pointerId);practiceGreen=true};greenDemo.onpointerup=greenDemo.onpointercancel=()=>practiceGreen=false;greenDemo.onkeydown=e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();practiceGreen=true}};greenDemo.onkeyup=e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();practiceGreen=false}};window.addEventListener('blur',()=>practiceGreen=false);
function drawDiamonds(){
 const children=diamondTrail.children;
 for(let i=0;i<diamondFlight.items.length;i++){
  const item=diamondFlight.items[i];let el=children[i];if(!el){el=document.createElement('div');el.className='flightDiamond';el.innerHTML='<svg viewBox="0 0 36 42" aria-hidden="true"><path d="M18 2 L33 17 L18 40 L3 17 Z"/><path d="M3 17 H33 M18 2 L12 17 L18 40 L24 17 Z"/></svg><span></span>';diamondTrail.append(el)}
  el.classList.toggle('goldDiamond',item.gold);el.classList.toggle('collectedDiamond',item.collected);el.style.top=`calc(100% - 272px - ${(item.height??item.base)*Math.max(60,Math.min(180,gameSection.clientHeight-332))}px)`;el.querySelector('span').textContent=item.points;el.setAttribute('aria-label',`${item.gold?'Gold diamond':'Diamond'} ${item.points} points${item.collected?' collected':''}`);
 }
 while(diamondTrail.children.length>diamondFlight.items.length)diamondTrail.lastElementChild.remove();
}
const diamondToast=document.createElement('div');diamondToast.className='diamondToast';diamondToast.hidden=true;diamondToast.setAttribute('role','status');gameSection.append(diamondToast);
diamondTrail.replaceChildren();
function diamondFrame(result,dt,valid){
 if(!valid)return;
 diamondToastTime=Math.max(0,diamondToastTime-dt);diamondToast.hidden=diamondToastTime===0;
 let green=0;
 if(mode==='practice')green=practiceGreen?1:0;
 else if(cameraControl==='balls'&&trackedLevels.length===3){const i=anchors.findIndex(a=>a.h>=70&&a.h<=175);if(i>=0)green=trackedLevels[i]}
 const rewards=diamondFlight.step(result.height,green,dt,result.phase,true);drawDiamonds();
 if(rewards.length){const sum=rewards.reduce((a,b)=>a+b,0),session=flightSessions[flightScoreKey()],saved=flightSaved[flightScoreKey()];diamondToast.textContent=(rewards.includes(15)?'Gold! ':'◆ ')+'+'+sum+' points';diamondToast.hidden=false;diamondToastTime=1.6;session.score+=sum;saved.best=Math.max(saved.best,session.score);saveFlights();updateFlightBoard();say(`${rewards.includes(15)?'Golden diamond!':'Diamond collected!'} +${sum} points`)}
}
const beforeDiamondReset=resetFlightMotion;resetFlightMotion=function(){beforeDiamondReset();practiceGreen=false;diamondToastTime=0;diamondToast.hidden=true;diamondFlight.reset();drawDiamonds()};
drawDiamonds();
