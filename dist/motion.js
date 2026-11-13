(function(root){
class CameraMotion {
 constructor(){this.reset()}
 reset(){this.previous=null;this.frames=0;this.level=0;this.steer=0}
 process(data,width,height,sensitivity=.08){
  const gray=new Float32Array(width*height);let mean=0;
  for(let i=0;i<gray.length;i++){gray[i]=data[i*4]*.299+data[i*4+1]*.587+data[i*4+2]*.114;mean+=gray[i]}
  mean/=gray.length;
  if(!this.previous){this.previous=gray;this.frames=1;return {valid:false,level:0,steer:0,reason:'Get comfortable. Keep the camera still…'}}
  let shift=0;for(let i=0;i<gray.length;i++)shift+=gray[i]-this.previous[i];shift/=gray.length;
  let changed=0,total=0,sx=0,sy=0;for(let y=Math.floor(height*.08);y<height*.94;y++)for(let x=Math.floor(width*.12);x<width*.88;x++){const i=y*width+x;total++;if(Math.abs(gray[i]-this.previous[i]-shift)>18){changed++;sx+=x;sy+=y}}
  this.previous=gray;this.frames++;const fraction=changed/total;
  if(mean<18||mean>240||fraction>.6||Math.abs(shift)>35){this.level=0;this.steer=0;return {valid:false,level:0,steer:0,reason:mean<18?'Too dark. Add light in front of you.':'Camera or lighting changed. Keep the camera still.'}}
  if(this.frames<7)return {valid:false,level:0,steer:0,reason:'Get comfortable. Keep the camera still…'};
  const raw=fraction<.006?0:Math.min(1,(fraction-.006)/sensitivity);
  this.level=this.level*.45+raw*.55;this.steer=this.steer*.65+(changed?((sx/changed)/width-.5)*2:0)*.35;
  if(this.level<.025)this.level=0;
  return {valid:true,level:this.level,steer:this.steer,x:changed?sx/changed:width/2,y:changed?sy/changed:height/2};
 }
}
root.CameraMotion=CameraMotion;if(typeof module!=='undefined')module.exports=CameraMotion;
})(globalThis);
