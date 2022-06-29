import { initialize } from '@telnyx/video';

async function connectToTheRoom ({ roomId, clientToken, ...rest }){
  const room = await initialize({ roomId, clientToken, ...rest});
  
  room.on('state_changed', function(state) {
    console.log(JSON.stringify(state, null, 2))
  });
  
  room.connect().then(function() {
    console.log('You are connected to the room!');
  });
}

const roomId = "e6e26b76-ca8f-41bd-90b3-719e930d869a";
const clientToken = "eyJhbGciOiJFZDI1NTE5IiwidHlwIjoiSldUIn0.eyJhdWQiOiJ0ZWxueXhfY2xpZW50X3Rva2VuIiwiZXhwIjoxNjU2NTI3NjUxLCJncmFudHMiOlt7ImFjdGlvbnMiOlsiam9pbiJdLCJyZXNvdXJjZXMiOlsidGVsbnl4OnZpZGVvOnJvb21zOmU2ZTI2Yjc2LWNhOGYtNDFiZC05MGIzLTcxOWU5MzBkODY5YSJdLCJzdWJqZWN0cyI6WyJ0ZWxueXg6dXNlcnM6ODFjNWJjZDAtMWY0OC00YzhhLThhNDItOGY1NWU2NDkzZWE5Il19XSwiZ3JhbnRzX3ZlcnNpb24iOiIxLjAuMCIsImlhdCI6MTY1NjUyNzA1MSwiaXNzIjoidGVsbnl4X2NsaWVudF90b2tlbiIsImp0aSI6IjNjNTE1NzYwLTdlZmItNDA3Mi04MzI0LWNkMWFiNGJiOGNmNiIsIm5iZiI6MTY1NjUyNzA1MCwic3ViIjoibnVsbCIsInR5cCI6ImFjY2VzcyJ9.9lon-M04l8BrBhSX0YEH5CKCrd2vq8jeqDKob5DvFibzzg4VF8BfhP8oXYiN6dkqXNK3dquS7zlCvf2lTxdhBg"
const context = JSON.stringify({ name: 'Bob The Builder', id: 1 })

connectToTheRoom({ roomId, clientToken, context })
