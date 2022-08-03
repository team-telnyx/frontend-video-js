import { v4 as uuidv4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { VideoRoom } from '.';

// UI
document.querySelector('input[name=username]').value = faker.name.findName();
const btnJoin = document.getElementById('btn-join');

// Buttons

btnJoin.addEventListener('click', async function () {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const clientToken = params.clientToken;
  const roomId = params.roomId;

  const context = JSON.stringify({
    name: document.querySelector('input[name=username]').value,
    id: uuidv4(),
  });

  if (!clientToken || !roomId) {
    return alert('You need a client Token and a Room ID to be able to connect');
  }

  VideoRoom.connect({ roomId, clientToken, context });
});
