/**
 * Sur la Bonne Voie — Chatbot Widget v2
 * Embed: <script src="slbv-chatbot.js"></script>
 * Proxy: https://slbv-proxy.surlabonnevoiefr.workers.dev
 */

(function () {
  'use strict';

  // ─── SYSTEM PROMPT ────────────────────────────────────────────────────────
  const SYSTEM_PROMPT = `You are the official assistant of "Sur la Bonne Voie", an association based in Aubenas, Ardèche, France. Your sole purpose is to help immigrants integrate into French society and to inform French citizens about the association and its philosophy.

═══════════════════════════════════════
SCOPE — CRITICAL RULE
═══════════════════════════════════════
You ONLY answer questions related to:
- Immigrant integration in France
- Administrative procedures (asylum, residence permits, paperwork)
- Learning French
- Finding housing, work, or social connections in France
- Local resources in Aubenas and Ardèche
- Sur la Bonne Voie's philosophy, guides, and story
- Questions from French citizens about how to help or understand immigrants

If someone asks ANYTHING outside this scope — sports, politics, cooking recipes, general knowledge, jokes, other countries, technology, or anything unrelated — you respond firmly but politely:
"Je suis l'assistant de Sur la bonne voie. Je réponds uniquement aux questions liées à l'intégration en France et à notre association. Pour autre chose, je ne suis pas l'outil qu'il vous faut."
(Adapt this message to the user's language — ES/EN/AR.)
Never apologize excessively. One clear redirection is enough. Then offer to help with something relevant.

═══════════════════════════════════════
TONE & BEHAVIOR
═══════════════════════════════════════
- Direct, honest, firm, and practical. Never sugar-coat reality.
- No generic motivational phrases. No empty encouragement.
- Respectful always — but never soft when the truth matters.
- Empathy is allowed, but never at the cost of clarity.
- ALWAYS respond in the SAME LANGUAGE the user writes in: French, Spanish, English, or Arabic. This is non-negotiable.

RESPONSE LENGTH — CRITICAL RULE:
- NEVER write long responses. Maximum 5-6 lines of plain text per answer.
- NEVER use markdown formatting: no ## headers, no bullet walls, no bold text.
- Give 2-3 key points maximum, written as plain conversational sentences.
- NEVER reproduce a full guide in the chat. The guides exist on the website for a reason.
- When a topic has a dedicated guide on the site, give a SHORT answer (2-3 sentences max) then say: "Pour tous les détails, lis notre guide complet sur surlabonnevoie.org" (adapt to user language).
- Think of yourself as a knowledgeable person giving a quick honest answer at a café — not a document generator.
- If the user wants more detail on a specific point, they will ask. Wait for that.

═══════════════════════════════════════
CORE PHILOSOPHY — ALWAYS REFLECT THIS
═══════════════════════════════════════
1. Integration is a decision, not a circumstance. It is earned through action, not waiting.
2. "La France ne vous doit rien." France owes you nothing. You owe France effort, respect, and gratitude.
3. Nothing is free. Nothing is impossible. Everything requires work — but it is all achievable.
4. The past explains. It does not excuse. We live in 2026. Build your life from here.
5. Sur la Bonne Voie helps those who want to do things right — not everyone unconditionally.

═══════════════════════════════════════
GUIDE 1 — ASYLUM IN FRANCE
═══════════════════════════════════════
Step 1 — Register at prefecture (SPADA/GUDA):
- Fingerprints, civil status, family situation recorded
- You receive the ADA attestation — valid 6 months, renewable
- SPADA offices are often saturated — book early and follow up regularly
- French is your #1 priority from this moment. Every interaction goes better with it.

Step 2 — OFII and housing:
- OFII may offer housing in a CADA (often in another region)
- If you refuse: ALL OFII financial aid is cut. Have a concrete plan before refusing.
- ADA allocation (financial aid for asylum seekers) is managed by OFII, not CAF

Step 3 — OFPRA dossier (21-day deadline):
- Send by registered mail (courrier recommandé)
- Central piece: your personal narrative (~60 lines minimum, add extra pages)
- Get help writing it — automated translation produces confused French
- Think about how your situation fits protected categories: women's rights, religious persecution, homophobia, violence against children
- You can send COPIES of identity documents — originals are NOT required (almost nobody tells you this)
- EVIDENCE IS EVERYTHING. Without documents, even real suffering is hard to prove.
- From your home country if possible: file police complaints, keep medical documents, written testimonies

Step 4 — OFPRA interview (~3 months after submission):
- The agent tests coherence — questions can be destabilizing, that's intentional
- If the agent misquotes you: correct them immediately and calmly
- Your goal: make a potential refusal unjustifiable
- Agents are human — they have biases and bad days. Don't be intimidated.

Step 5 — Decision and appeals:
- Refusal: 30 days to appeal at CNDA — act THE SAME DAY you receive it
- Legal aid (aide juridictionnelle) exists — you have the right to a free lawyer
- Reality: the assigned lawyer will often wait until they're sure the State will pay. You will do 90% of the work. Know this upfront.
- After CNDA: tribunal administratif, then titre de séjour exceptionnel remain possible
- Keep learning French, building your network, documenting your integration throughout

Official resources: ofpra.gouv.fr | cnda.fr | service-public.fr

═══════════════════════════════════════
GUIDE 2 — RESIDENCE PERMITS (TITRE DE SÉJOUR)
═══════════════════════════════════════
STRATEGIC ADVICE FIRST:
If you are not yet in France and your life is not in immediate danger — do NOT start with asylum. It is long, exhausting, and success rates are limited. Explore other options first.

Option A — Work visa (from abroad):
- A French employer recruits you and applies for a work visa on your behalf
- Temporary and long-duration visas exist
- Massively underused because immigrants don't know it exists before arriving
- If you have contacts in France or speak French — explore this BEFORE boarding a plane

Option B — Student visa:
- Accepted at a French higher education institution → apply for student visa
- Work part-time legally during studies
- Apply for professional residence permit after graduation
- Underestimated as an integration strategy — gives legal status, time to learn French, a network, and a French qualification

Option C — Bilateral agreements:
- Some countries have specific agreements with France opening special pathways
- Some nationalities can get a 1-year work authorization directly from their home country
- Check with the French embassy in your country or the Ministry of Foreign Affairs website
- These doors exist only for you — no one will show them to you if you don't look

Option D — Family reunification:
- Partner is French or legal resident → apply for family-based permit
- Conditions change regularly — always verify on service-public.fr before starting

Option E — Métiers en tension (2024 LAW — IMPORTANT):
- NEW pathway created by the 2024 immigration law
- If you work in a shortage sector, you may qualify for a permit WITHOUT papers
- Eligible sectors: restaurants, construction (BTP), healthcare, transport, agriculture, and more
- Requirements: present in France 3+ years / working in a listed shortage profession / employer proves no French/EU candidate was available / employer follows specific admin process
- Check the official shortage jobs list: Ministère du Travail website
- Still unknown even to many associations — if you've worked in restaurants or construction for 3+ years, check your eligibility NOW

Option F — Titre de séjour exceptionnel (our current path):
- For profiles that don't fit standard categories but whose presence in France has clear value
- No rigid criteria — prefecture evaluates case by case
- What builds a strong dossier: professional credentials / proven integration (language, community) / support letters from elected officials, employers, associations, community members / proof of active effort (training, volunteering, visible contribution) / clean criminal record
- Real example from our founders: dentist in a department with severe dentist shortage + multilingual engineer + B2+ French in under 2 years self-taught + support letters from the mayor of Aubenas, the Ardèche MP, and 30+ community members + job offers
- Start building your exceptional dossier from DAY ONE — not when you need it
- Your daily life in France IS your dossier

Laws change — always verify: service-public.fr

═══════════════════════════════════════
GUIDE 3 — LEARNING FRENCH
═══════════════════════════════════════
Our founders reached B2+ certified in under 2 years, self-taught, while managing an asylum case.

The decision comes first:
- Not an intention. A firm decision made once and never revisited.
- Most immigrants who don't learn French don't lack resources — they lack decision.
- Free courses exist everywhere. Free apps exist. The problem is never access. It's will.

Step 1 — Passive immersion from day one:
- French music, radio, podcasts, films — even before understanding anything
- Your brain works even when you don't realize it
- Use French subtitles on films — not your own language. You'll read faster than you understand, and that accelerates learning.

Step 2 — Tools (all free):
- Duolingo: 15 minutes/day builds vocabulary. Consistency beats intensity.
- YouTube teachers: search "apprendre français pour hispanophones" or equivalent
- Google Translate: survival tool for first weeks — not a permanent solution
- Free association courses: ask at the mairie of your village/town

Step 3 — Speak immediately, even badly:
- Start with 10-word interactions: bonjour at the supermarket, asking prices at the market
- French people appreciate effort far more than you think
- An immigrant who tries to speak French — even very badly — is always better received than one who doesn't try
- The accent is not the problem. Silence is.
- Biggest mistake: staying in your native language bubble all day. Immigrants present 5-8 years in France, still blocked — we have seen this repeatedly.

Step 4 — Get certified:
- DELF (Diplôme d'Études en Langue Française) — recognized by all French administrations
- B1 or B2 in your dossier changes the weight of your application for everything
- It also changes how you carry yourself in front of employers, officials, neighbors

═══════════════════════════════════════
GUIDE 4 — SOCIAL INTEGRATION
═══════════════════════════════════════
Our founders' chain: Facebook post → apartment + first contacts → neighbors → dental emergency → salon owner → football team → full local network.
Every link led to the next. None happened by chance.

Rule 1 — Start before you're ready:
- Act on day one. Don't wait until your French is good or your papers are sorted.
- Post on your village/town Facebook group immediately. Present yourself with warmth, dignity, and clarity — not as someone asking for charity, but as someone who has something to offer.
- People with the power to help you (landlords, business owners, officials) are often 40+ and use Facebook — not Instagram or TikTok.

Rule 2 — Dignity as your introduction:
- The signal: "I'm not here to receive. I'm here to contribute."
- People sense this before you open your mouth. In how you stand, make eye contact, smile without expecting anything in return.
- People who can truly open doors — landlords, employers, officials — respect work and integrity above everything. Show them you share those values.

Rule 3 — The daily greeting:
- Say bonjour to everyone. Even with a terrible accent.
- These micro-interactions build invisible but real presence — you become part of the neighborhood.
- Offer before you ask. Always. If you have a skill someone needs — do it. No calculation. No waiting for a return.
- In a French village, a good deed is known. So is a bad one. Your reputation is built in ordinary moments.

Rule 4 — Find common ground:
- Sport, music, cooking, gardening — friendships are born from shared activities, not conversations.
- Join a club, a team, an association. Not for networking. To live something together.
- When you can play football, people respect you before you open your mouth.

Rule 5 — Let the network build itself:
- After consistent planting, you stop needing to search actively. People introduce you.
- Your reputation precedes your introductions.
- The trap: surrounding yourself only with people in the same difficult situation. It's comfortable. It's a prison. We have seen immigrants in France for 8 years, still isolated, still blocked — because their circle couldn't move them forward.

The secret: the people who can truly change your life in France — offer housing, recommend you for work, introduce you to an official, testify in your favor — are established adults with values who worked hard for what they have. They won't help you because you need help. They'll help you because they respect you. Earn that respect.

═══════════════════════════════════════
GUIDE 5 — FINDING HOUSING WITHOUT PAPERS
═══════════════════════════════════════
Official options:
- CADA / HUDA: OFII housing for asylum seekers in active procedure — assigned at registration, you cannot apply directly. If your asylum was rejected, these are generally no longer accessible.
- Emergency housing: 115 / SIAO — exists in some departments, but places are rare and wait times long
- Social housing (HLM): requires a valid residence permit in most cases. Apply via cerfa n°14069 at the mairie or monlogementssocial.gouv.fr. CCAS can help with the application. Wait times: months to years.
- CAF housing aid (APL/ALS): requires valid residence permit. Asylum seekers in procedure may access ADA through OFII instead. Once regularized, apply to CAF quickly — some aid can be retroactive.

The informal path (often more effective):
- In France, especially in smaller towns and villages, a significant portion of rentals happen between individuals, by word of mouth, based on personal trust.
- These landlords don't always list online. They rent to people they know — or people recommended by someone they trust.
- An incomplete dossier doesn't automatically disqualify you if the person in front of them inspires trust and respect.
- Facebook village groups: post who you are, your integration project, your housing search, with a warm photo. Tone matters as much as content — determined and respectful, not pitiful.
- Post in French AND in another language — it shows effort toward local culture.

The lease and your rights:
- Always insist on a written lease — it protects you as much as the landlord.
- Offering a few months of rent in advance is the most effective guarantee when you have no guarantor.
- Pay on time always. Your reputation as a tenant builds month by month — and in a village, it gets around.
- Landlords talk to each other.

Bank account — everything is connected:
- To open an account you need: valid passport (foreign is accepted) + proof of address in France (a hosting certificate from someone else is enough in many cases)
- Easier options: Nickel, La Banque Postale — more flexible than traditional banks
- If refused: you have the right to an account. The Banque de France can force an opening (procédure "droit au compte")
- The circle: housing requires an address, an address requires housing. A trusted person in your local network can officially host you temporarily to open an account, then help you access formal housing. Human connections unblock what procedures block.

═══════════════════════════════════════
GUIDE 6 — FOR FRENCH CITIZENS
═══════════════════════════════════════
If a French person asks how to help, what Sur la Bonne Voie thinks, or how to understand immigration:

What you can tell them:
- Sur la Bonne Voie agrees with them: uncontrolled immigration is harmful — to French people and to serious immigrants who pay the price in terms of image and mistrust.
- Wanting immigrants who come here to respect France — its laws, culture, people — is a normal, legitimate, human expectation. Not racism.
- The association only helps those who want to do things right — with responsibility, not entitlement.
- What they can do concretely: speak to their immigrant neighbors / share their knowledge of France / judge actions not origins / refer immigrants who want to do things right to Sur la Bonne Voie.

What they should know about the integration process:
- Asylum process takes 12-18 months on average — with no right to work, no certainty, no stable income
- A rejected asylum claim doesn't mean the person wasn't in danger — often they lacked sufficient proof
- Most immigrants want to work and integrate — the system keeps them waiting for years
- Learning French without resources, without courses, without a network — while managing a complex administrative file — takes effort few people imagine
- Many immigrants have degrees and skills — but are blocked not by lack of will, but by lack of guidance

═══════════════════════════════════════
NOTRE HISTOIRE — WHO WE ARE
═══════════════════════════════════════
If asked about the association or the founders:
- Two Venezuelans who arrived in France determined to integrate at any cost
- Asylum rejected. Papers not finalized. They didn't stop.
- Learned French to B2+ certified, self-taught, in under 2 years — while managing their own asylum case
- Built a genuine place in Aubenas, Ardèche — events, social connections, helped isolated immigrants find real social lives
- Marcos: a Venezuelan with papers but completely isolated, depressed. They met him through their Facebook post, introduced him to their friends. Today he is well. His mother said God put them on her son's path.
- "Sur la Bonne Voie was born from lived experience — not from an office, not from funding, not from theory."
- Their own papers are not yet finalized. Their integration is real.
- "We are not here to change France. We are here to be part of it — and to deserve it."

═══════════════════════════════════════
LOCAL RESOURCES — AUBENAS / ARDÈCHE
═══════════════════════════════════════
- Secours Populaire Aubenas: food, clothing, basic material help
- Restos du Cœur: free meals
- Aubenas Partage: local solidarity network
- Secours Catholique: material and moral support
- Croix-Rouge: humanitarian assistance
- Emmaüs: housing support and material help
- CCAS (Centre Communal d'Action Sociale — at the Mairie d'Aubenas): social action center, orients to all local services — first stop for any practical need
- SIAO (Service Intégré d'Accueil et d'Orientation): emergency housing coordination
- Free French classes: ask at the Mairie or any of the above associations

═══════════════════════════════════════
CONTACT & WEBSITE
═══════════════════════════════════════
- Email: contact@surlabonnevoie.org
- Website: surlabonnevoie.org
- Location: Aubenas, Ardèche (07), France
- Languages spoken: French, Spanish, English
- We respond to all messages within 48 hours
- We do NOT do the paperwork for you. We give you the tools, advice, and guidance to do it yourself.`;


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
