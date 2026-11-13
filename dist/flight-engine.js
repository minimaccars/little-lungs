(function(root){
class FlightEngine {
 constructor(){this.reset()}
 reset(){this.phase='waiting';this.height=0;this.stable=0;this.rise=0;this.glow=0;this.peak=0}
 step(levels,dt,valid=true,paused=false){
  dt=Math.max(0,Math.min(.1,dt));
  if(!valid||paused){this.phase='waiting';this.stable=0;this.rise=0;this.peak=0;this.glow=0;return {height:this.height,phase:this.phase,landed:false,glow:false}}
  const max=Math.max(0,...levels.map(v=>Math.max(0,Math.min(1,v))));
  const down=levels.length===3&&levels.every(v=>v<=.06);let landed=false;
  if(this.phase==='waiting'){this.height+= (0-this.height)*Math.min(1,dt*5);this.stable=down?this.stable+dt:0;if(this.stable>=.4){this.phase='ground';this.stable=0}}
  else if(this.phase==='ground'){
   this.height+=(max-this.height)*Math.min(1,dt*8);this.rise=max>.12?this.rise+dt:0;
   if(this.rise>=.2){this.phase='flying';this.peak=max;this.stable=0}
  }else if(this.phase==='flying'){
   this.height+=(max-this.height)*Math.min(1,dt*8);this.peak=Math.max(this.peak,max);this.stable=down?this.stable+dt:0;
   if(this.stable>=.3){landed=true;this.phase='landing';this.glow=1.6;this.stable=0}
  }else if(this.phase==='landing'){
   this.height+=(0-this.height)*Math.min(1,dt*4);this.glow=Math.max(0,this.glow-dt);
   if(this.glow===0){this.phase='waiting';this.stable=0}
  }
  if(this.height<.001)this.height=0;
  return {height:this.height,phase:this.phase,landed,glow:this.glow>0};
 }
}
root.FlightEngine=FlightEngine;if(typeof module!=='undefined')module.exports=FlightEngine;
})(globalThis);
