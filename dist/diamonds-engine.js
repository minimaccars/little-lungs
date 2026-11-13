(function(root){
class DiamondFlight {
 constructor(random=Math.random){this.random=random;this.reset()}
 reset(){this.time=0;this.previousHeight=0;this.wasFlying=false;this.previousGreen=0;this.goldTried=false;this.items=[2,5,8].map((points,i)=>({points,base:[.23,.52,.82][i],collected:false,gold:false}));this.flightPoints=0;this.previousPhase='waiting'}
 step(height,green,dt,phase,enabled=true){
  if(!enabled)return [];
  if(phase==='ground'&&this.previousPhase!=='ground')this.reset();
  this.previousPhase=phase;this.time+=Math.max(0,Math.min(.1,dt));
  const flying=phase==='flying';const greenRising=green>.15&&this.previousGreen<=.15;
  // A green rise can happen just before the flight engine arms the flight.
  if(!this.goldTried&&greenRising&&(phase==='ground'||flying)){
   this.goldTried=true;if(this.random()<.3)this.items.push({points:15,base:.98,collected:false,gold:true});
  }
  this.previousGreen=green;
  for(const [i,item] of this.items.entries())item.height=item.base-height*.08+Math.sin(this.time*1.3+i*.7)*.018;
  const rewards=[];
  if(flying){const from=this.wasFlying?this.previousHeight:0;
   for(const item of this.items){if(item.collected)continue;const low=Math.min(from,height)-.035,high=Math.max(from,height)+.035;if(item.height>=low&&item.height<=high){item.collected=true;this.flightPoints+=item.points;rewards.push(item.points)}}
  }
  this.wasFlying=flying;this.previousHeight=height;return rewards;
 }
}
root.DiamondFlight=DiamondFlight;if(typeof module!=='undefined')module.exports=DiamondFlight;
})(globalThis);
