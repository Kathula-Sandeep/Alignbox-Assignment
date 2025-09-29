const socket = io();
const messagesEl = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const anonToggle = document.getElementById("anonToggle");
const anonBanner = document.getElementById("anonBanner");
const anonMessage = document.getElementById("anonMessage");

let userName = "You";
let anonymous = false;
let clientId = `client_${Math.random().toString(36).substr(2, 9)}`;
const groupId = 1;

// Join group
socket.on("connect", () => socket.emit("join_group", groupId));

// Toggle anonymous
anonToggle.addEventListener("click", () => {
  anonymous = !anonymous;

  // Show/hide banner at top
  anonBanner.classList.toggle("hidden", !anonymous);

  // Show/hide message above input box
  anonMessage.classList.toggle("hidden", !anonymous);
});

// Load previous messages
async function loadMessages() {
  const res = await fetch(`/api/messages?group_id=${groupId}`);
  const messages = await res.json();
  messages.forEach(addMessageToDOM);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Add message to DOM
function addMessageToDOM(msg) {
  const row = document.createElement("div");
  row.classList.add(
    "message-row",
    msg.client_id === clientId ? "message-right" : "message-left"
  );

  if (msg.client_id !== clientId) {
    const avatar = document.createElement("img");
    avatar.src =
      "https://thumbs.dreamstime.com/b/confident-blond-man-classic-fedora-hat-smart-jacket-avatar-illustration-confident-blond-man-classic-fedora-hat-401077596.jpg?w=986";
    avatar.className = "msg-avatar";
    row.appendChild(avatar);
  }

  const bubble = document.createElement("div");
  bubble.className =
    "bubble " + (msg.client_id === clientId ? "bubble-right" : "bubble-left");
  bubble.innerHTML = `
    ${msg.anonymous ? "" : `<div class="name-tag">${msg.user_name}</div>`}
    ${msg.text}
    <span class="msg-meta">${new Date(msg.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}</span>
  `;
  row.appendChild(bubble);
  messagesEl.appendChild(row);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Send message
sendBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;
  socket.emit("send_message", {
    group_id: groupId,
    client_id: clientId,
    user_name: userName,
    anonymous: anonymous ? 1 : 0,
    text,
  });
  input.value = "";
});

// Receive message
socket.on("message", addMessageToDOM);

// Initial load
loadMessages();