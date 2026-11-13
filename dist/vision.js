// Browser-local color segmentation. No frames are saved or sent anywhere.
(function(root){
function hsv(r,g,b){r/=255;g/=255;b/=255;const hi=Math.max(r,g,b),lo=Math.min(r,g,b),d=hi-lo;let h=0;if(d){h=hi===r?((g-b)/d)%6:hi===g?(b-r)/d+2:(r-g)/d+4;h=(h*60+360)%360}return[h,hi?d/hi:0,hi]}
const hueDist=(a,b)=>Math.min(Math.abs(a-b),360-Math.abs(a-b));
function findBall(data,width,height,a,calibrating=false){
 const left=Math.max(0,Math.floor(a.x-20)),right=Math.min(width,Math.ceil(a.x+20)),top=Math.max(0,Math.floor(a.y-(calibrating?20:155))),bottom=Math.min(height,Math.ceil(a.y+20));
 const cols=Math.ceil((right-left)/2),rows=Math.ceil((bottom-top)/2),mask=new Uint8Array(cols*rows),seen=new Uint8Array(cols*rows);let candidates=[];
 for(let gy=0;gy<rows;gy++)for(let gx=0;gx<cols;gx++){const i=((top+gy*2)*width+left+gx*2)*4,[h,s,v]=hsv(data[i],data[i+1],data[i+2]);mask[gy*cols+gx]=s>.3&&v>.12&&hueDist(h,a.h)<22?1:0}
 for(let n=0;n<mask.length;n++){if(!mask[n]||seen[n])continue;const queue=[n];seen[n]=1;let count=0,sx=0,sy=0;for(let q=0;q<queue.length;q++){const k=queue[q],x=k%cols,y=Math.floor(k/cols);count++;sx+=left+x*2;sy+=top+y*2;for(const [nx,ny] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]){if(nx<0||nx>=cols||ny<0||ny>=rows)continue;const next=ny*cols+nx;if(mask[next]&&!seen[next]){seen[next]=1;queue.push(next)}}}if(count>=10){const x=sx/count,y=sy/count,dist=Math.hypot(x-(a.prevX??a.x),y-(a.prevY??a.y));if(dist<45)candidates.push({x,y,count,dist})}}
 candidates.sort((a,b)=>a.dist-b.dist);
 // A ball can fall back to its base between frames. Recover there instead of
 // remaining locked to its previous raised position. Never infer a rise.
 if(!candidates.length&&!calibrating&&(a.prevY!==undefined||a.prevX!==undefined))return findBall(data,width,height,{x:a.x,y:a.y,h:a.h},true);
 return candidates[0]||null;
}
const api={hsv,hueDist,findBall};root.LittleLungsVision=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
