const bodyOptions=document.createElement('div');bodyOptions.className='bodyOptions';bodyOptions.innerHTML='<label for="cameraControl">Play with</label><select id="cameraControl"><option value="body">👋 Body movement</option><option value="balls">Spirometer balls</option></select><div id="bodyHelp"><p>Wave a hand or gently move your upper body to rise. Stay still to glow and land. No spirometer needed.</p><label for="motionSensitivity">Movement sensitivity</label><select id="motionSensitivity"><option value="0.08">Normal</option><option value="0.04">Gentle movements</option><option value="0.16">Less sensitive</option></select><small>Keep the camera fixed. This detects motion in the frame, not body poses. Moving backgrounds can also trigger it. Video stays on your device.</small></div>';$('cameraPanel').prepend(bodyOptions);
function setCameraControl(){cameraControl=$('cameraControl').value;bodySway=0;motionDetector.reset();$('bodyHelp').hidden=cameraControl!=='body';$('calibrate').textContent=cameraControl==='body'?'Reset movement':'Reset ball calibration';if(typeof resetFlightMotion==='function')resetFlightMotion();if(typeof resetMine==='function')resetMine();if(stream)resetCalibration();else $('status').textContent=cameraControl==='body'?'Turn on the camera, then wave inside the preview.':'Turn on the camera, then tap the three balls at rest.';updateFlightBoard();if(mode==='camera'&&cameraControl==='body')say('Turn on your camera. Wave to rise, stay still to land.');$('modeLabel').textContent=mode==='camera'?(cameraControl==='body'?'◉ BODY CAMERA':'◉ SPIROMETER CAMERA'):'● PRACTICE MODE'}
$('cameraControl').onchange=setCameraControl;$('motionSensitivity').onchange=()=>{motionDetector.reset();smoothed=0;missing=1;if(typeof resetFlightMotion==='function')resetFlightMotion()};
const originalTrack=track;track=function(){
 if(cameraControl!=='body')return originalTrack();
 motionCtx.drawImage(video,0,0,80,60);const result=motionDetector.process(motionCtx.getImageData(0,0,80,60).data,80,60,Number($('motionSensitivity').value));
 missing=result.valid?0:1;smoothed=result.level;trackedLevels=result.valid?[smoothed,smoothed,smoothed]:[];bodySway=result.valid?result.steer*32:0;
 oc.clearRect(0,0,320,240);oc.strokeStyle='#ffffff99';oc.lineWidth=2;oc.setLineDash([5,5]);oc.strokeRect(38,19,244,207);oc.setLineDash([]);
 if(result.valid&&smoothed>.04){oc.fillStyle='#ffe6a6';oc.beginPath();oc.arc(result.x*4,result.y*4,8+smoothed*10,0,Math.PI*2);oc.fill()}
 $('tracking').textContent=result.valid?'● Body motion '+Math.round(smoothed*100)+'% · on-device':result.reason;
 $('status').textContent=result.valid?'Wave to rise. Stay still to land. Keep the camera fixed.':result.reason;
 return smoothed;
};
const originalFlightBoard=updateFlightBoard;updateFlightBoard=function(){originalFlightBoard();if(mode==='camera')$('flightMode').textContent=cameraControl==='body'?'Body camera · motion input':'Spirometer camera · experimental'};
const previousCameraClick=$('camera').onclick;$('camera').onclick=()=>{previousCameraClick();setCameraControl()};
setCameraControl();
