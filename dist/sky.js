// A layered meadow-to-sky scene driven by the same height as the balloon.
// Uses the existing animation loop, so pause, tracking loss and game changes stop it.
const flightSky=document.createElement('div');flightSky.className='flightSky';flightSky.setAttribute('aria-hidden','true');gameSection.prepend(flightSky);
const farHills=document.createElement('div');farHills.className='farHills';farHills.setAttribute('aria-hidden','true');farHills.innerHTML='<svg viewBox="0 0 900 180" preserveAspectRatio="none"><path d="M0 150 Q110 30 240 110 Q370 160 480 80 Q660 -10 900 140 L900 180 L0 180Z" fill="#a7c8b3"/><path d="M0 150 Q160 80 300 150 Q500 20 690 130 Q820 80 900 150 L900 180 L0 180Z" fill="#b7d1b0"/></svg>';gameSection.insertBefore(farHills,document.querySelector('.h1'));
const flightBirds=document.createElement('div');flightBirds.className='flightBirds';flightBirds.setAttribute('aria-hidden','true');flightBirds.innerHTML='<svg viewBox="0 0 160 60"><path d="M10 22 Q22 8 34 22 Q46 8 58 22 M95 40 Q104 30 113 40 Q122 30 131 40" fill="none" stroke="#729990" stroke-width="2.5" stroke-linecap="round"/></svg>';gameSection.insertBefore(flightBirds,$('balloon'));
const skyCaption=document.createElement('span');skyCaption.className='skyCaption';skyCaption.textContent='☘ Meadow';gameSection.append(skyCaption);
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');let skyDrift=0,skyHeight=0;
function updateSky(height,dt,enabled){
 if(game!=='balloon')return;
 const reduced=motionPreference.matches;
 if(!enabled){gameSection.classList.add('skyStill');return}
 gameSection.classList.remove('skyStill');skyHeight=height;
 if(!reduced)skyDrift+=Math.max(0,height)*dt*.32;
 gameSection.style.setProperty('--sky-altitude',String(reduced?0:height));
 gameSection.style.setProperty('--sky-tint',String(height));
 gameSection.style.setProperty('--cloud-drift',`${reduced?0:Math.sin(skyDrift)*35}px`);
 gameSection.style.setProperty('--far-drift',`${reduced?0:Math.sin(skyDrift*.65)*12}px`);
 skyCaption.textContent=height>.55?'☁ Among the clouds':height>.12?'✧ Above the meadow':'☘ Meadow';
}
function resetSky(){skyDrift=0;skyHeight=0;gameSection.style.setProperty('--sky-altitude','0');gameSection.style.setProperty('--sky-tint','0');gameSection.style.setProperty('--cloud-drift','0px');gameSection.style.setProperty('--far-drift','0px');skyCaption.textContent='☘ Meadow'}
motionPreference.addEventListener('change',()=>updateSky(skyHeight,0,true));
const originalFlightMotion=resetFlightMotion;resetFlightMotion=function(){originalFlightMotion();resetSky()};
resetSky();
