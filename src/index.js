import { initialize } from '@telnyx/video';

// UI
document.querySelector("input[name=room-id]").value = process.env.TELNYX_ROOM_ID || ''

const btnConnect = document.getElementById('btn-connect');
const btnGenerateToken = document.getElementById('btn-generate-token');
const codeBlock = document.querySelector('code');
const clientTokenField = document.querySelector('textarea');
const roomId = document.querySelector("input[name=room-id]").value;

async function generateClientToken() {
  const response = await fetch(`${process.env.TELNYX_API_URL}/rooms/${roomId}/actions/generate_join_client_token`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.TELNYX_API_KEY}`
    }
  }).then((r) => r.json())

  return response.data
}

async function connectToTheRoom ({ roomId, clientToken, ...rest }){
  const room = await initialize({ roomId, clientToken, ...rest});

  room.on('state_changed', function(state) {
    console.log(JSON.stringify(state, null, 2));

    // render UI
    codeBlock.innerHTML += JSON.stringify(state, null, 2);
    codeBlock.innerHTML += '\n';
  });

  room.connect().then(function() {
    console.log('You are connected to the room!');

    // render UI
    codeBlock.innerHTML += ':------- You are connected to the room! --------:';
  });
}

// Button events

btnGenerateToken.addEventListener('click', function() {
  generateClientToken().then(({ token }) => {
    clientTokenField.value = token
  })
})

btnConnect.addEventListener('click', function() {
  const clientToken = clientTokenField.value
  const context = JSON.stringify({ name: 'Bob The Builder', id: 1 })
  connectToTheRoom({ roomId, clientToken, context })
})


