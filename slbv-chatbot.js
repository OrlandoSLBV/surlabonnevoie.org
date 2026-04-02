/**
 * Sur la Bonne Voie — Chatbot Widget
 * Embed: <script src="slbv-chatbot.js"></script>
 * Requires: Your Anthropic API key set as window.SLBV_API_KEY
 */

(function () {
  'use strict';

  // ─── SYSTEM PROMPT ────────────────────────────────────────────────────────
  const SYSTEM_PROMPT = `You are the official assistant of "Sur la Bonne Voie", an association based in Aubenas, Ardèche, France, helping immigrants integrate into French society through responsibility, effort, and respect.

Your tone must be direct, honest, firm, and practical. Never sugar-coat reality. Never give generic motivational answers. Never be rude or disrespectful. Show empathy when needed but never at the cost of ignoring reality.

CORE PRINCIPLES you must always communicate:
- Integration is earned through personal effort, responsibility, and respect for France, its laws, language, and culture.
- "La France ne vous doit rien" — France owes you nothing. You owe France effort and respect if you choose to live here.
- Help people who want to help themselves. Encourage self-reliance and long-term autonomy.
- Practical help is temporary. The real goal is independence through learning French, working, and integrating.

RULES:
- Always answer in the SAME LANGUAGE the user writes in (French, English, Spanish, or Arabic). This is critical.
- Keep answers SHORT and actionable unless the user needs detail.
- Base answers on Sur la Bonne Voie's guides and philosophy.

KEY KNOWLEDGE — GUIDES SUMMARY:

ASILE (Asylum):
- Register at prefecture → get ADA attestation (6 months renewable)
- Submit OFPRA dossier within 21 days — your personal narrative is critical, get help writing it
- Interview ~3 months later. Be coherent. Correct the agent if they misquote you.
- If refused: 30 days to appeal at CNDA. Act the same day you receive refusal.
- Learning French is priority #1 throughout the entire process.

TITRE DE SÉJOUR (Residence permit options):
- Work visa (from abroad): employer sponsors you — underused option
- Student visa: study at French institution, work part-time, then get professional permit
- Family reunification: if partner is French or legal resident
- Métiers en tension (2024 law): if working in shortage sectors (restaurants, construction, healthcare, transport, agriculture) for 3+ years — you may qualify NOW without papers
- Titre exceptionnel: for exceptional profiles — strong dossier, community support, letters from elected officials

LEARNING FRENCH:
- It's a decision, not an intention. Make it once, never revisit it.
- Passive immersion first: French music, films with French subtitles, radio
- Tools: Duolingo (15min/day), YouTube teachers, free association courses (ask the mairie)
- Speak immediately, even badly. French people respect the effort.
- Get DELF certified (B1/B2) — it changes everything administratively
- Biggest mistake: staying in your language bubble. It costs years.

SOCIAL INTEGRATION:
- Start before you're ready. Act on day one.
- Facebook groups of your village/town: post who you are with warmth and dignity. This is the #1 underused tool.
- Greet everyone daily. Offer before you ask. Your reputation builds in ordinary moments.
- Find common ground: sport, cooking, music — friendships come from shared activities, not conversations.
- Avoid building a circle only of people in the same difficult situation — it traps everyone.

PRACTICAL RESOURCES IN AUBENAS/ARDÈCHE:
- Secours Populaire Aubenas: food, clothing, basic help
- Restos du Cœur: free meals
- Aubenas Partage: local solidarity
- Secours Catholique: material and moral support
- CCAS (at the Mairie d'Aubenas): social action center, can orient to all local services
- Free French classes: ask at the Mairie or any of the above associations

MANIFESTE CORE:
1. Thinking clearly is not racism.
2. Nothing is free. Nothing is impossible.
3. France owes you nothing. You owe France everything.
4. The past explains. It does not excuse.

Sur la Bonne Voie does NOT help people unconditionally. It helps those who want to do things right — with responsibility, respect, and a real will to integrate.

Contact: contact@surlabonnevoie.org | Aubenas, Ardèche`;

  // ─── CONVERSATION HISTORY ─────────────────────────────────────────────────
  let messages = [];
  let isOpen = false;
  let isTyping = false;

  // ─── INJECT STYLES ────────────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #slbv-widget * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Lato', system-ui, sans-serif; }

    #slbv-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 12px;
    }

    /* TOGGLE BUTTON */
    #slbv-toggle {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #1D9E75;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 20px rgba(29,158,117,0.4);
      transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
      flex-shrink: 0;
    }
    #slbv-toggle:hover {
      transform: scale(1.08);
      background: #0F6E56;
      box-shadow: 0 6px 28px rgba(29,158,117,0.5);
    }
    #slbv-toggle svg { width: 24px; height: 24px; fill: white; transition: opacity 0.2s; }

    /* CHAT WINDOW */
    #slbv-window {
      width: 360px;
      max-height: 520px;
      background: #fff;
      border: 1px solid #e8e6de;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      box-shadow: 0 16px 48px rgba(0,0,0,0.12);
      transform: scale(0.92) translateY(12px);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), opacity 0.2s;
      transform-origin: bottom right;
    }
    #slbv-window.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }

    /* HEADER */
    #slbv-header {
      background: #1D9E75;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    #slbv-header-icon {
      width: 32px;
      height: 32px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    #slbv-header-icon svg { width: 16px; height: 16px; fill: white; }
    #slbv-header-text { flex: 1; }
    #slbv-header-name {
      font-weight: 700;
      font-size: 0.9rem;
      color: white;
      letter-spacing: 0.01em;
    }
    #slbv-header-sub {
      font-size: 0.72rem;
      color: rgba(255,255,255,0.75);
      margin-top: 1px;
    }
    #slbv-close {
      background: none;
      border: none;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s;
      padding: 4px;
    }
    #slbv-close:hover { opacity: 1; }
    #slbv-close svg { width: 18px; height: 18px; fill: white; display: block; }

    /* MESSAGES */
    #slbv-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #faf9f6;
      scroll-behavior: smooth;
    }
    #slbv-messages::-webkit-scrollbar { width: 4px; }
    #slbv-messages::-webkit-scrollbar-thumb { background: #d0cec6; border-radius: 4px; }

    /* WELCOME */
    #slbv-welcome {
      background: #E1F5EE;
      border: 1px solid rgba(29,158,117,0.15);
      border-radius: 8px;
      padding: 12px 14px;
      font-size: 0.82rem;
      color: #085041;
      line-height: 1.55;
    }
    #slbv-welcome strong { display: block; font-size: 0.85rem; margin-bottom: 4px; color: #0F6E56; }

    /* BUBBLES */
    .slbv-msg {
      display: flex;
      gap: 8px;
      align-items: flex-end;
      max-width: 88%;
    }
    .slbv-msg.user { margin-left: auto; flex-direction: row-reverse; }
    .slbv-msg.bot { margin-right: auto; }

    .slbv-bubble {
      padding: 9px 13px;
      border-radius: 16px;
      font-size: 0.875rem;
      line-height: 1.55;
      word-break: break-word;
    }
    .slbv-msg.user .slbv-bubble {
      background: #1D9E75;
      color: white;
      border-bottom-right-radius: 4px;
    }
    .slbv-msg.bot .slbv-bubble {
      background: white;
      color: #1a1a18;
      border: 1px solid #e8e6de;
      border-bottom-left-radius: 4px;
    }

    /* TYPING INDICATOR */
    .slbv-typing {
      display: flex;
      gap: 4px;
      align-items: center;
      padding: 10px 14px;
      background: white;
      border: 1px solid #e8e6de;
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      width: fit-content;
    }
    .slbv-dot {
      width: 6px;
      height: 6px;
      background: #1D9E75;
      border-radius: 50%;
      animation: slbv-bounce 1.2s infinite;
      opacity: 0.6;
    }
    .slbv-dot:nth-child(2) { animation-delay: 0.2s; }
    .slbv-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes slbv-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-5px); opacity: 1; }
    }

    /* INPUT AREA */
    #slbv-input-area {
      padding: 12px;
      border-top: 1px solid #e8e6de;
      background: white;
      display: flex;
      gap: 8px;
      align-items: flex-end;
      flex-shrink: 0;
    }
    #slbv-input {
      flex: 1;
      border: 1.5px solid #e8e6de;
      border-radius: 20px;
      padding: 9px 14px;
      font-size: 0.875rem;
      color: #1a1a18;
      outline: none;
      resize: none;
      line-height: 1.4;
      max-height: 100px;
      transition: border-color 0.2s;
      background: #faf9f6;
      font-family: 'Lato', system-ui, sans-serif;
    }
    #slbv-input:focus { border-color: #1D9E75; }
    #slbv-input::placeholder { color: #aaa; }

    #slbv-send {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #1D9E75;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: background 0.2s, transform 0.15s;
    }
    #slbv-send:hover { background: #0F6E56; transform: scale(1.06); }
    #slbv-send:disabled { background: #ccc; cursor: not-allowed; transform: none; }
    #slbv-send svg { width: 16px; height: 16px; fill: white; margin-left: 1px; }

    #slbv-footer {
      text-align: center;
      font-size: 0.68rem;
      color: #aaa;
      padding: 0 12px 8px;
      background: white;
    }

    @media (max-width: 420px) {
      #slbv-window { width: calc(100vw - 32px); }
      #slbv-widget { bottom: 16px; right: 16px; }
    }
  `;
  document.head.appendChild(style);

  // ─── BUILD HTML ───────────────────────────────────────────────────────────
  const widget = document.createElement('div');
  widget.id = 'slbv-widget';
  widget.innerHTML = `
    <div id="slbv-window">
      <div id="slbv-header">
        <div id="slbv-header-icon">
          <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
        </div>
        <div id="slbv-header-text">
          <div id="slbv-header-name">Sur la bonne voie</div>
          <div id="slbv-header-sub">Assistant — FR · ES · EN · AR</div>
        </div>
        <button id="slbv-close" aria-label="Fermer">
          <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>

      <div id="slbv-messages">
        <div id="slbv-welcome">
          <strong>Bienvenue / Welcome / Bienvenido / أهلاً</strong>
          Posez votre question — je réponds dans votre langue.<br>
          Ask your question — I'll answer in your language.
        </div>
      </div>

      <div id="slbv-input-area">
        <textarea id="slbv-input" placeholder="Écrivez votre message..." rows="1"></textarea>
        <button id="slbv-send" aria-label="Envoyer">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
      <div id="slbv-footer">Sur la bonne voie · Aubenas, Ardèche</div>
    </div>

    <button id="slbv-toggle" aria-label="Ouvrir l'assistant">
      <svg id="slbv-icon-chat" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
      <svg id="slbv-icon-close" viewBox="0 0 24 24" style="display:none"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    </button>
  `;
  document.body.appendChild(widget);

  // ─── ELEMENTS ─────────────────────────────────────────────────────────────
  const win = document.getElementById('slbv-window');
  const toggle = document.getElementById('slbv-toggle');
  const closeBtn = document.getElementById('slbv-close');
  const messagesEl = document.getElementById('slbv-messages');
  const input = document.getElementById('slbv-input');
  const sendBtn = document.getElementById('slbv-send');
  const iconChat = document.getElementById('slbv-icon-chat');
  const iconClose = document.getElementById('slbv-icon-close');

  // ─── OPEN / CLOSE ─────────────────────────────────────────────────────────
  function openChat() {
    isOpen = true;
    win.classList.add('open');
    iconChat.style.display = 'none';
    iconClose.style.display = 'block';
    setTimeout(() => input.focus(), 250);
  }

  function closeChat() {
    isOpen = false;
    win.classList.remove('open');
    iconChat.style.display = 'block';
    iconClose.style.display = 'none';
  }

  toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  // ─── AUTO-RESIZE TEXTAREA ─────────────────────────────────────────────────
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  });

  // ─── SEND ON ENTER (shift+enter = newline) ────────────────────────────────
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  sendBtn.addEventListener('click', sendMessage);

  // ─── APPEND MESSAGE ───────────────────────────────────────────────────────
  function appendMessage(role, text) {
    const wrap = document.createElement('div');
    wrap.className = `slbv-msg ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'slbv-bubble';
    bubble.textContent = text;
    wrap.appendChild(bubble);
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return bubble;
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'slbv-msg bot';
    wrap.id = 'slbv-typing-wrap';
    wrap.innerHTML = `<div class="slbv-typing"><div class="slbv-dot"></div><div class="slbv-dot"></div><div class="slbv-dot"></div></div>`;
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('slbv-typing-wrap');
    if (el) el.remove();
  }

  // ─── SEND MESSAGE ─────────────────────────────────────────────────────────
  async function sendMessage() {
    const text = input.value.trim();
    if (!text || isTyping) return;

    // Add user message
    appendMessage('user', text);
    messages.push({ role: 'user', content: text });

    // Reset input
    input.value = '';
    input.style.height = 'auto';
    sendBtn.disabled = true;
    isTyping = true;
    showTyping();

    try {
      const response = await fetch('https://slbv-proxy.surlabonnevoiefr.workers.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 600,
          system: SYSTEM_PROMPT,
          messages: messages
        })
      });

      const data = await response.json();
      removeTyping();

      if (data.error) {
        appendMessage('bot', `Erreur: ${data.error.message}`);
        messages.pop(); // remove failed user message from history
      } else {
        const reply = data.content[0].text;
        appendMessage('bot', reply);
        messages.push({ role: 'assistant', content: reply });

        // Keep history manageable (last 20 messages)
        if (messages.length > 20) messages = messages.slice(-20);
      }

    } catch (err) {
      removeTyping();
      appendMessage('bot', 'Connexion error. Please try again.');
      messages.pop();
    }

    sendBtn.disabled = false;
    isTyping = false;
  }

})();
