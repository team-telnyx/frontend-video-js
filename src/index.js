import { initialize } from '@telnyx/video';

// UI
const btnConnect = document.getElementById('btn-connect');
const codeBlock = document.querySelector('code');

async function connectToTheRoom ({ roomId, clientToken, ...rest }){
  const room = await initialize({ roomId, clientToken, ...rest});

  room.on('state_changed', function(state) {
    console.log(JSON.stringify(state, null, 2));
    codeBlock.innerHTML += JSON.stringify(state, null, 2);
    codeBlock.innerHTML += '\n';
  });

  room.connect().then(function() {
    console.log('You are connected to the room!');
    codeBlock.innerHTML += ':------- You are connected to the room! --------:';
  });
}

const roomId = "e6e26b76-ca8f-41bd-90b3-719e930d869a";
const clientToken = "eyJhbGciOiJFZDI1NTE5IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ0ZWxueXhfY2xpZW50X3Rva2VuIiwiZXhwIjoxNjU3MDYxNTQwLCJncmFudHMiOlt7ImFjdGlvbnMiOlsiam9pbiJdLCJyZXNvdXJjZXMiOlsidGVsbnl4OnZpZGVvOnJvb21zOmU2ZTI2Yjc2LWNhOGYtNDFiZC05MGIzLTcxOWU5MzBkODY5YSJdLCJzdWJqZWN0cyI6WyJ0ZWxueXg6dXNlcnM6ODFjNWJjZDAtMWY0OC00YzhhLThhNDItOGY1NWU2NDkzZWE5Il19XSwiZ3JhbnRzX3ZlcnNpb24iOiIxLjAuMCIsImlhdCI6MTY1NzAzMjc0MCwiaXNzIjoidGVsbnl4X2NsaWVudF90b2tlbiIsImp0aSI6IjllYTQ4M2U0LTZmOWUtNDg2Mi04YTFiLTYyMDRkMGE3ZTcyZiIsIm5iZiI6MTY1NzAzMjczOSwic3ViIjoibnVsbCIsInR5cCI6ImFjY2VzcyJ9.sjGtj_tlHRZUm3L1N6MfLNmctlq9VwYGMVFAE1i5VR8nblfQ6edOxn2_iNxhSLBcXeBda8-eTzhBYaK3jd_sBA"

const context = JSON.stringify({ name: 'Bob The Builder', id: 1 })


btnConnect.addEventListener('click', function() {
  connectToTheRoom({ roomId, clientToken, context })
})


