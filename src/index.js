import { Room, initialize } from '@telnyx/video';

function appendUIResponse(response) {
  codeBlock.innerHTML += JSON.stringify(response, null, 2);
  codeBlock.innerHTML += '\n';
  return response;
}

// UI
document.querySelector('input[name=room-id]').value = process.env.TELNYX_ROOM_ID || '';

const btnConnect = document.getElementById('btn-connect');
const btnDisconnect = document.getElementById('btn-disconnect');
const btnGenerateToken = document.getElementById('btn-generate-token');
const codeBlock = document.querySelector('code');
const clientTokenField = document.querySelector('textarea');
const roomId = document.querySelector('input[name=room-id]').value;

const VideoRoom = {
  room: null,
  clientToken: null,
  generateToken: async function () {
    const response = await fetch(`${process.env.TELNYX_API_URL}/rooms/${roomId}/actions/generate_join_client_token`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TELNYX_API_KEY}`,
      },
    })
      .then((r) => r.json())
      .then(appendUIResponse);

    VideoRoom.clientToken = response.data.token;
    return response.data;
  },
  connect: async function ({ roomId, clientToken, ...rest }) {
    VideoRoom.room = await initialize({ roomId, clientToken, ...rest });

    VideoRoom.room.on('state_changed', function (state) {
      console.info(state);

      // render UI
      document.getElementById('status').innerHTML = state.status;
      appendUIResponse(state);
    });

    VideoRoom.room.connect().then(function () {
      console.info('You are connected to the room!');
    });
  },
  disconnect: function () {
    VideoRoom.room.disconnect();
  },
};

window.VideoRoom = VideoRoom;


// Buttons
btnGenerateToken.addEventListener('click', function () {
  VideoRoom.generateToken().then(({ token }) => { clientTokenField.value = token; });
});

btnConnect.addEventListener('click', async function () {
  const clientToken = VideoRoom.clientToken;
  const context = JSON.stringify({ name: 'Bob The Builder', id: 1 });

  if (!clientToken || !roomId) {
    return alert('You need a client Token and a Room ID to be able to connect');
  }

  VideoRoom.connect({ roomId, clientToken, context });
});

btnDisconnect.addEventListener('click', async function () {
  VideoRoom.disconnect();
  VideoRoom.room.on('disconnected', () => {
    const state = VideoRoom.room.getState();
    appendUIResponse(state);
    document.getElementById('status').innerHTML = state.status;
  });
});
