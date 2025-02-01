document.getElementById('channelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const channelName = document.getElementById('channelName').value.trim();
    const channelURL = document.getElementById('channelURL').value.trim();

    if (channelName && channelURL) {
        if (isValidYouTubeURL(channelURL)) {
            addChannel(channelName, channelURL);
            document.getElementById('channelForm').reset();
            showMessage('Canal adicionado com sucesso!');
        } else {
            showMessage('Por favor, insira uma URL válida do YouTube.', true);
        }
    }
});

function isValidYouTubeURL(url) {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;
    return pattern.test(url);
}

function showMessage(message, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isError ? 'error-message' : 'success-message';
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

function addChannel(name, url) {
    let channels = JSON.parse(localStorage.getItem('channels')) || [];
    channels.push({ name, url });
    localStorage.setItem('channels', JSON.stringify(channels));
    displayChannels();
}

function displayChannels() {
    const channels = JSON.parse(localStorage.getItem('channels')) || [];
    const channelList = document.getElementById('channelList');
    channelList.innerHTML = '';

    channels.forEach((channel, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${channel.url}" target="_blank">${channel.name}</a>
            <button onclick="removeChannel(${index})">Remover</button>
        `;
        channelList.appendChild(li);
    });
}

function removeChannel(index) {
    let channels = JSON.parse(localStorage.getItem('channels')) || [];
    channels.splice(index, 1);
    localStorage.setItem('channels', JSON.stringify(channels));
    displayChannels();
    showMessage('Canal removido com sucesso!');
}

function sortChannels() {
    let channels = JSON.parse(localStorage.getItem('channels')) || [];
    channels.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem('channels', JSON.stringify(channels));
    displayChannels();
}

function clearAllChannels() {
    localStorage.removeItem('channels');
    displayChannels();
    showMessage('Todos os canais foram removidos.');
}

window.onload = displayChannels;
