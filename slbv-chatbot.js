/**
 * Sur la Bonne Voie — Chatbot Widget v3
 * Embed: <script src="slbv-chatbot.js"></script>
 * Proxy:  https://slbv-proxy.surlabonnevoiefr.workers.dev
 *
 * FIXES vs v2:
 *  - max_tokens raised to 1024 (was 600 → caused truncation)
 *  - System prompt enforces ≤5 sentence replies, so 1024 is always enough
 *  - Markdown stripped from bot bubbles (no raw ** or ## visible)
 *  - Single IIFE — no duplicate code blocks
 *  - Animated text reveal (typewriter) makes responses feel instant
 *  - Graceful error messages in the user's language
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════════════════
     SYSTEM PROMPT
  ═══════════════════════════════════════════════════════════════════════ */
  const SYSTEM_PROMPT = `You are the official assistant of "Sur la Bonne Voie", an association based in Aubenas, Ardèche, France. You help immigrants integrate into French society and inform French citizens about the association.

═══════════════════════
SCOPE — HARD RULE
═══════════════════════
Only answer questions about:
- Immigrant integration in France
- Administrative procedures (asylum, residence permits)
- Learning French
- Housing, work, or social connections in France
- Local resources in Aubenas / Ardèche
- Sur la Bonne Voie's philosophy, guides, and story
- French citizens asking how to help or understand immigrants

For ANYTHING else, reply ONLY: "Je suis l'assistant de Sur la bonne voie. Je réponds uniquement aux questions liées à l'intégration en France. Pour autre chose, je ne suis pas l'outil qu'il vous faut." — adapt to the user's language. No apology. No extra text.

═══════════════════════
RESPONSE LENGTH — CRITICAL
═══════════════════════
MAXIMUM 4-5 sentences per reply. Never more.
Never use markdown: no **, no ##, no bullet lists, no dashes, no headers.
Write in plain conversational prose only.
If a topic has a full guide on surlabonnevoie.org, give 2-3 sentences then say: "Pour tous les détails, lis notre guide sur surlabonnevoie.org" (adapt to user language).
Think: knowledgeable friend at a café — not a document generator.

═══════════════════════
TONE
═══════════════════════
Direct, honest, practical. No sugar-coating. No generic motivation. Respectful but firm. Empathy allowed — never at cost of clarity. Always respond in the SAME LANGUAGE the user writes in (FR, ES, EN, AR). Non-negotiable.

═══════════════════════
CORE PHILOSOPHY
═══════════════════════
1. Integration is a decision earned through action, not waiting.
2. France owes you nothing. You owe France effort, respect, and gratitude.
3. Nothing is free. Nothing is impossible. Everything requires work.
4. The past explains. It does not excuse. We live in 2026.
5. Sur la Bonne Voie helps those who want to do things right — not everyone unconditionally.

═══════════════════════
KEY KNOWLEDGE (USE THESE, KEEP ANSWERS SHORT)
═══════════════════════

ASYLUM:
Register at prefecture → ADA attestation. OFPRA dossier in 21 days by registered mail — personal narrative is critical, get help writing it, send copies not originals. Interview ~3 months later, stay coherent, correct misquotes immediately. Refusal: appeal at CNDA within 30 days — act same day. Legal aid exists but you'll do 90% of the work yourself. French is priority #1 throughout. Resources: ofpra.gouv.fr, cnda.fr, service-public.fr.

RESIDENCE PERMITS:
If not yet in France and life not in danger — don't start with asylum. Options: (A) work visa — employer sponsors from abroad, underused; (B) student visa — study, work part-time, get permit after; (C) bilateral agreements — check French embassy in your country; (D) family reunification — verify conditions on service-public.fr; (E) métiers en tension 2024 law — if 3+ years in France working in restaurants, BTP, healthcare, transport, agriculture, you may qualify NOW without papers; (F) titre exceptionnel — exceptional profile, strong dossier, letters from elected officials, community support. Build your dossier from day one. Always verify: service-public.fr.

LEARNING FRENCH:
It's a firm decision, not an intention. Passive immersion first: French music, radio, films with French subtitles. Tools: Duolingo 15min/day, YouTube teachers, free mairie courses. Speak immediately even badly — accent is not the problem, silence is. Get DELF B1/B2 certified. Biggest mistake: staying in your language bubble for years.

SOCIAL INTEGRATION:
Post on your village Facebook group day one — warmth and dignity, not charity-seeking. People 40+ who can help you use Facebook, not Instagram. Say bonjour to everyone daily. Offer before you ask, always. Find common ground through sport, cooking, music — friendships from shared activities, not conversations. Avoid building a circle only of people in the same difficult situation — it traps everyone. The people who can change your life respect work and integrity above all else. Earn that respect.

HOUSING WITHOUT PAPERS:
Official: CADA (assigned at registration), 115/SIAO emergency, HLM (needs permit, long wait). More effective: private rentals via word of mouth and Facebook village groups. Post warmly with a photo. Always get a written lease. Offer months in advance if no guarantor. Bank account: Nickel or La Banque Postale are easiest; "droit au compte" via Banque de France if refused anywhere.

FOR FRENCH CITIZENS:
Sur la Bonne Voie agrees: uncontrolled immigration is harmful to everyone. Wanting immigrants to respect France is normal and legitimate — not racism. We only help those who want to do things right. Concrete things to do: speak to immigrant neighbors, share knowledge of France, judge actions not origins, refer serious immigrants to us.

OUR STORY:
Two Venezuelans, asylum rejected, no papers finalized. Learned French to B2+ in under 2 years, self-taught. Built a real life in Aubenas — events, friendships, helped isolated immigrants. Their integration is real even if papers aren't final yet. "We are not here to change France. We are here to be part of it — and to deserve it."

LOCAL RESOURCES — AUBENAS/ARDÈCHE:
Secours Populaire, Restos du Cœur, Aubenas Partage, Secours Catholique, Croix-Rouge, Emmaüs, CCAS at the Mairie d'Aubenas (first stop for any need), SIAO for emergency housing, free French classes at the Mairie or any association above.

CONTACT:
contact@surlabonnevoie.org | surlabonnevoie.org | Aubenas, Ardèche 07 | FR · ES · EN | 48h response. We do NOT do paperwork for you — we give tools and guidance.`;

  /* ═══════════════════════════════════════════════════════════════════════
     STATE
  ═══════════════════════════════════════════════════════════════════════ */
  let messages = [];
  let isOpen   = false;
  let isTyping = false;

  /* ═══════════════════════════════════════════════════════════════════════
     STYLES
  ═══════════════════════════════════════════════════════════════════════ */
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

    /* ── Toggle button ── */
    #slbv-toggle {
      width: 56px; height: 56px;
      border-radius: 50%;
      background: #1D9E75;
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 20px rgba(29,158,117,0.4);
      transition: transform .2s, background .2s, box-shadow .2s;
      flex-shrink: 0;
    }
    #slbv-toggle:hover { transform: scale(1.08); background: #0F6E56; box-shadow: 0 6px 28px rgba(29,158,117,0.5); }
    #slbv-toggle svg { width: 24px; height: 24px; fill: white; }

    /* ── Chat window ── */
    #slbv-window {
      width: 360px;
      max-height: 520px;
      background: #fff;
      border: 1px solid #e8e6de;
      border-radius: 12px;
      display: flex; flex-direction: column;
      overflow: hidden;
      box-shadow: 0 16px 48px rgba(0,0,0,0.12);
      transform: scale(0.92) translateY(12px);
      opacity: 0; pointer-events: none;
      transition: transform .25s cubic-bezier(.34,1.56,.64,1), opacity .2s;
      transform-origin: bottom right;
    }
    #slbv-window.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }

    /* ── Header ── */
    #slbv-header {
      background: #1D9E75;
      padding: 14px 16px;
      display: flex; align-items: center; gap: 10px;
      flex-shrink: 0;
    }
    #slbv-header-icon {
      width: 32px; height: 32px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    #slbv-header-icon svg { width: 16px; height: 16px; fill: white; }
    #slbv-header-text { flex: 1; }
    #slbv-header-name { font-weight: 700; font-size: .9rem; color: white; letter-spacing: .01em; }
    #slbv-header-sub  { font-size: .72rem; color: rgba(255,255,255,.75); margin-top: 1px; }
    #slbv-close { background: none; border: none; cursor: pointer; opacity: .7; transition: opacity .2s; padding: 4px; }
    #slbv-close:hover { opacity: 1; }
    #slbv-close svg { width: 18px; height: 18px; fill: white; display: block; }

    /* ── Messages area ── */
    #slbv-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex; flex-direction: column; gap: 10px;
      background: #faf9f6;
      scroll-behavior: smooth;
    }
    #slbv-messages::-webkit-scrollbar { width: 4px; }
    #slbv-messages::-webkit-scrollbar-thumb { background: #d0cec6; border-radius: 4px; }

    /* ── Welcome card ── */
    #slbv-welcome {
      background: #E1F5EE;
      border: 1px solid rgba(29,158,117,0.15);
      border-radius: 8px;
      padding: 12px 14px;
      font-size: .82rem; color: #085041; line-height: 1.55;
    }
    #slbv-welcome strong { display: block; font-size: .85rem; margin-bottom: 4px; color: #0F6E56; }

    /* ── Message bubbles ── */
    .slbv-msg { display: flex; gap: 8px; align-items: flex-end; max-width: 88%; }
    .slbv-msg.user { margin-left: auto; flex-direction: row-reverse; }
    .slbv-msg.bot  { margin-right: auto; }

    .slbv-bubble {
      padding: 9px 13px;
      border-radius: 16px;
      font-size: .875rem; line-height: 1.55;
      word-break: break-word;
      white-space: pre-wrap;
    }
    .slbv-msg.user .slbv-bubble {
      background: #1D9E75; color: white;
      border-bottom-right-radius: 4px;
    }
    .slbv-msg.bot .slbv-bubble {
      background: white; color: #1a1a18;
      border: 1px solid #e8e6de;
      border-bottom-left-radius: 4px;
    }

    /* ── Typing dots ── */
    .slbv-typing {
      display: flex; gap: 4px; align-items: center;
      padding: 10px 14px;
      background: white; border: 1px solid #e8e6de;
      border-radius: 16px; border-bottom-left-radius: 4px;
      width: fit-content;
    }
    .slbv-dot {
      width: 6px; height: 6px;
      background: #1D9E75; border-radius: 50%;
      animation: slbv-bounce 1.2s infinite; opacity: .6;
    }
    .slbv-dot:nth-child(2) { animation-delay: .2s; }
    .slbv-dot:nth-child(3) { animation-delay: .4s; }
    @keyframes slbv-bounce {
      0%,60%,100% { transform: translateY(0); }
      30% { transform: translateY(-5px); opacity: 1; }
    }

    /* ── Input area ── */
    #slbv-input-area {
      padding: 12px;
      border-top: 1px solid #e8e6de;
      background: white;
      display: flex; gap: 8px; align-items: flex-end;
      flex-shrink: 0;
    }
    #slbv-input {
      flex: 1;
      border: 1.5px solid #e8e6de;
      border-radius: 20px;
      padding: 9px 14px;
      font-size: .875rem; color: #1a1a18;
      outline: none; resize: none;
      line-height: 1.4; max-height: 100px;
      transition: border-color .2s;
      background: #faf9f6;
      font-family: 'Lato', system-ui, sans-serif;
    }
    #slbv-input:focus { border-color: #1D9E75; }
    #slbv-input::placeholder { color: #aaa; }

    #slbv-send {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: #1D9E75;
      border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: background .2s, transform .15s;
    }
    #slbv-send:hover { background: #0F6E56; transform: scale(1.06); }
    #slbv-send:disabled { background: #ccc; cursor: not-allowed; transform: none; }
    #slbv-send svg { width: 16px; height: 16px; fill: white; margin-left: 1px; }

    #slbv-footer {
      text-align: center;
      font-size: .68rem; color: #aaa;
      padding: 0 12px 8px;
      background: white;
    }

    @media (max-width: 420px) {
      #slbv-window { width: calc(100vw - 32px); }
      #slbv-widget { bottom: 16px; right: 16px; }
    }
  `;
  document.head.appendChild(style);

  /* ═══════════════════════════════════════════════════════════════════════
     HTML
  ═══════════════════════════════════════════════════════════════════════ */
  const widget = document.createElement('div');
  widget.id = 'slbv-widget';
  widget.innerHTML = `
    <div id="slbv-window">
      <div id="slbv-header">
        <div id="slbv-header-icon">
          <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>
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

  /* ═══════════════════════════════════════════════════════════════════════
     ELEMENT REFS
  ═══════════════════════════════════════════════════════════════════════ */
  const win        = document.getElementById('slbv-window');
  const toggleBtn  = document.getElementById('slbv-toggle');
  const closeBtn   = document.getElementById('slbv-close');
  const messagesEl = document.getElementById('slbv-messages');
  const input      = document.getElementById('slbv-input');
  const sendBtn    = document.getElementById('slbv-send');
  const iconChat   = document.getElementById('slbv-icon-chat');
  const iconClose  = document.getElementById('slbv-icon-close');

  /* ═══════════════════════════════════════════════════════════════════════
     OPEN / CLOSE
  ═══════════════════════════════════════════════════════════════════════ */
  function openChat() {
    isOpen = true;
    win.classList.add('open');
    iconChat.style.display  = 'none';
    iconClose.style.display = 'block';
    setTimeout(() => input.focus(), 250);
  }
  function closeChat() {
    isOpen = false;
    win.classList.remove('open');
    iconChat.style.display  = 'block';
    iconClose.style.display = 'none';
  }
  toggleBtn.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  /* ═══════════════════════════════════════════════════════════════════════
     AUTO-RESIZE TEXTAREA
  ═══════════════════════════════════════════════════════════════════════ */
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 100) + 'px';
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  sendBtn.addEventListener('click', sendMessage);

  /* ═══════════════════════════════════════════════════════════════════════
     HELPERS
  ═══════════════════════════════════════════════════════════════════════ */

  /** Strip markdown so raw ** and ## never appear in bubbles */
  function stripMarkdown(text) {
    return text
      .replace(/#{1,6}\s*/g, '')           // ## headers
      .replace(/\*\*(.+?)\*\*/g, '$1')     // **bold**
      .replace(/\*(.+?)\*/g, '$1')         // *italic*
      .replace(/`(.+?)`/g, '$1')           // `code`
      .replace(/^[-•]\s+/gm, '• ')         // bullet normalization
      .trim();
  }

  function scrollBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function appendMessage(role, text) {
    const wrap   = document.createElement('div');
    wrap.className = `slbv-msg ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'slbv-bubble';
    bubble.textContent = role === 'bot' ? stripMarkdown(text) : text;
    wrap.appendChild(bubble);
    messagesEl.appendChild(wrap);
    scrollBottom();
    return bubble;
  }

  /** Typewriter reveal — makes replies feel instant even if slightly long */
  function revealText(bubble, text, speed = 12) {
    const clean = stripMarkdown(text);
    bubble.textContent = '';
    let i = 0;
    const tick = () => {
      if (i < clean.length) {
        bubble.textContent += clean[i++];
        scrollBottom();
        setTimeout(tick, speed);
      }
    };
    tick();
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'slbv-msg bot';
    wrap.id = 'slbv-typing-wrap';
    wrap.innerHTML = `<div class="slbv-typing"><div class="slbv-dot"></div><div class="slbv-dot"></div><div class="slbv-dot"></div></div>`;
    messagesEl.appendChild(wrap);
    scrollBottom();
  }
  function removeTyping() {
    const el = document.getElementById('slbv-typing-wrap');
    if (el) el.remove();
  }

  /* ═══════════════════════════════════════════════════════════════════════
     SEND MESSAGE
  ═══════════════════════════════════════════════════════════════════════ */
  async function sendMessage() {
    const text = input.value.trim();
    if (!text || isTyping) return;

    // Render user bubble
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1024,          // ← KEY FIX: was 600, caused truncation
          system: SYSTEM_PROMPT,
          messages: messages
        })
      });

      const data = await response.json();
      removeTyping();

      if (data.error) {
        // Show error in a bot bubble
        appendMessage('bot', `⚠️ ${data.error.message}`);
        messages.pop();
      } else {
        const reply = data.content
          .filter(b => b.type === 'text')
          .map(b => b.text)
          .join('');

        // Create empty bubble then reveal text with typewriter
        const wrap   = document.createElement('div');
        wrap.className = 'slbv-msg bot';
        const bubble = document.createElement('div');
        bubble.className = 'slbv-bubble';
        wrap.appendChild(bubble);
        messagesEl.appendChild(wrap);
        revealText(bubble, reply);

        messages.push({ role: 'assistant', content: reply });

        // Cap history to last 20 turns to avoid token creep
        if (messages.length > 20) messages = messages.slice(-20);
      }

    } catch (err) {
      removeTyping();
      // Language-agnostic fallback error
      appendMessage('bot', 'Connexion error — veuillez réessayer / please try again.');
      messages.pop();
    }

    sendBtn.disabled = false;
    isTyping = false;
  }

})();
