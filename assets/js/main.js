document.addEventListener("DOMContentLoaded", () => {
const aidaPanel = document.querySelector("[data-aida-panel]");
const aidaOpen = document.querySelector("[data-aida-open]");
const aidaClose = document.querySelector("[data-aida-close]");
const aidaReset = document.querySelector("[data-aida-reset]");
const aidaScrim = document.querySelector("[data-aida-scrim]");
const aidaStatus = document.querySelector("[data-aida-status]");
const aidaLaunchState = document.querySelector("[data-aida-launch-state]");
const aidaMessages = document.querySelector("[data-aida-messages]");
const aidaForm = document.querySelector("[data-aida-form]");
const aidaInput = document.querySelector("[data-aida-input]");
const aidaSubmit = aidaForm?.querySelector('button[type="submit"]');
const aidaPrivacy = document.querySelector("[data-aida-privacy]");
const aidaQuestions = [...document.querySelectorAll("[data-aida-question]")];
const aidaProxyUrl = aidaPanel?.dataset.proxyUrl?.trim().replace(/\/$/, "") || "";
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const aidaWelcome = aidaProxyUrl
  ? "I can help you navigate Emil's 4th-semester notes, explain RAG, MCP and agents, or connect ideas across lessons."
  : "AIDA is not connected through Cloudflare yet. Open AIDA directly below while the secure connection is completed.";
let aidaConversationId = "";
let aidaBusy = false;

const setAidaMode = (label) => {
  if (aidaStatus) aidaStatus.textContent = label;
  if (aidaLaunchState) aidaLaunchState.textContent = label;
};

const openAida = () => {
  if (!aidaPanel || !aidaOpen || !aidaScrim) return;
  aidaPanel.classList.add("is-open");
  aidaPanel.setAttribute("aria-hidden", "false");
  aidaOpen.setAttribute("aria-expanded", "true");
  aidaScrim.hidden = false;
  document.body.classList.add("aida-open");
  window.setTimeout(() => aidaInput?.focus(), reduceMotion ? 0 : 180);
};

const closeAida = () => {
  if (!aidaPanel || !aidaOpen || !aidaScrim) return;
  aidaPanel.classList.remove("is-open");
  aidaPanel.setAttribute("aria-hidden", "true");
  aidaOpen.setAttribute("aria-expanded", "false");
  aidaScrim.hidden = true;
  document.body.classList.remove("aida-open");
  aidaOpen.focus();
};

const appendAidaMessage = (role, message) => {
  if (!aidaMessages) return null;
  const article = document.createElement("article");
  article.className = `aida-message is-${role}`;

  const label = document.createElement("span");
  label.textContent = role === "user" ? "QUERY / YOU" : "AIDA / RESPONSE";
  article.append(label);

  const body = document.createElement("p");
  body.textContent = message;
  article.append(body);

  aidaMessages.append(article);
  article.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "end" });
  return { article, body };
};

const getResourceUrl = (resource) => {
  const candidates = [
    resource?.url,
    resource?.document_url,
    resource?.document?.url,
    resource?.metadata?.url,
    resource?.segment?.document?.url
  ];
  return candidates.find((value) => typeof value === "string" && /^https?:\/\//i.test(value)) || "";
};

const renderAidaSources = (article, resources = []) => {
  if (!article || !Array.isArray(resources)) return;
  const seen = new Set();
  const sources = resources
    .map((resource) => ({
      name: resource?.document_name || resource?.document?.name || "Portfolio source",
      url: getResourceUrl(resource)
    }))
    .filter(({ name, url }) => {
      const key = `${name}|${url}`;
      if (!url || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  if (!sources.length) return;
  const list = document.createElement("div");
  list.className = "aida-sources";
  sources.slice(0, 4).forEach(({ name, url }) => {
    const link = document.createElement("a");
    link.href = url;
    link.textContent = name;
    link.target = "_blank";
    link.rel = "noopener";
    list.append(link);
  });
  article.append(list);
};

const setAidaBusy = (busy) => {
  aidaBusy = busy;
  if (aidaPanel) aidaPanel.setAttribute("aria-busy", String(busy));
  if (aidaInput) aidaInput.disabled = busy;
  if (aidaSubmit) aidaSubmit.disabled = busy;
  if (aidaReset) aidaReset.disabled = busy;
  aidaQuestions.forEach((button) => { button.disabled = busy; });
};

const getAidaUserId = () => {
  const storageKey = "aidadoc-rag-user";
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) return saved;
    const randomPart = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const userId = `aidadoc-${randomPart}`;
    window.localStorage.setItem(storageKey, userId);
    return userId;
  } catch (_error) {
    return `aidadoc-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
};

const readAidaStream = async (response, onEvent) => {
  if (!response.body) throw new Error("AIDA returned no response stream.");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const consume = (block) => {
    const payload = block
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    if (!payload || payload === "[DONE]") return;
    let event;
    try {
      event = JSON.parse(payload);
    } catch (error) {
      console.warn("Ignored an unreadable AIDA event.", error);
      return;
    }
    onEvent(event);
  };

  while (true) {
    const { done, value } = await reader.read();
    buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
    const blocks = buffer.split(/\r?\n\r?\n/);
    buffer = blocks.pop() || "";
    blocks.forEach(consume);
    if (done) break;
  }
  if (buffer.trim()) consume(buffer);
};

const askAida = async (question) => {
  const cleanQuestion = question.trim();
  if (!cleanQuestion || aidaBusy) return;
  if (!aidaProxyUrl) {
    appendAidaMessage("assistant", "AIDA is not connected through Cloudflare yet. Open AIDA directly below.");
    return;
  }

  appendAidaMessage("user", cleanQuestion);
  const pending = appendAidaMessage("assistant", "");
  if (!pending) return;
  pending.article.classList.add("is-pending");

  let answer = "";
  let sources = [];
  setAidaBusy(true);
  setAidaMode("THINKING");

  try {
    const response = await fetch(`${aidaProxyUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: cleanQuestion,
        conversation_id: aidaConversationId,
        user: getAidaUserId()
      })
    });

    if (!response.ok) throw new Error(`AIDA request failed with ${response.status}.`);

    await readAidaStream(response, (event) => {
      if (event.event === "message" || event.event === "agent_message") {
        answer += event.answer || "";
      } else if (event.event === "message_replace") {
        answer = event.answer || answer;
      } else if (event.event === "message_end") {
        aidaConversationId = event.conversation_id || aidaConversationId;
        sources = event.metadata?.retriever_resources || sources;
      } else if (event.event === "error") {
        throw new Error("AIDA could not complete this answer.");
      }

      if (answer) {
        pending.article.classList.remove("is-pending");
        pending.body.textContent = answer;
        pending.article.scrollIntoView({ behavior: "auto", block: "end" });
      }
    });

    pending.article.classList.remove("is-pending");
    pending.body.textContent = answer || "AIDA did not return enough evidence to answer that confidently.";
    renderAidaSources(pending.article, sources);
    setAidaMode("ONLINE");
  } catch (error) {
    console.warn("AIDA request failed.", error);
    pending.article.classList.remove("is-pending");
    pending.body.textContent = "AIDA is temporarily unavailable. No local answer was generated; please try again shortly or open AIDA directly.";
    setAidaMode("OFFLINE");
  } finally {
    setAidaBusy(false);
    aidaInput?.focus();
  }
};

const resetAida = () => {
  if (!aidaMessages || aidaBusy) return;
  aidaConversationId = "";
  aidaMessages.replaceChildren();
  appendAidaMessage("assistant", aidaWelcome);
  setAidaMode(aidaProxyUrl ? "READY" : "SETUP");
  aidaInput?.focus();
};

if (aidaPanel && aidaOpen) {
  setAidaMode(aidaProxyUrl ? "READY" : "SETUP");
  if (aidaPrivacy) aidaPrivacy.hidden = !aidaProxyUrl;
  if (!aidaProxyUrl) {
    if (aidaInput) aidaInput.disabled = true;
    if (aidaSubmit) aidaSubmit.disabled = true;
    aidaQuestions.forEach((button) => { button.disabled = true; });
  }

  aidaOpen.addEventListener("click", openAida);
  aidaClose?.addEventListener("click", closeAida);
  aidaReset?.addEventListener("click", resetAida);
  aidaScrim?.addEventListener("click", closeAida);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && aidaPanel.classList.contains("is-open")) closeAida();
  });

  aidaQuestions.forEach((button) => {
    button.addEventListener("click", () => askAida(button.dataset.aidaQuestion || button.textContent));
  });
  aidaForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = aidaInput?.value || "";
    if (aidaInput) aidaInput.value = "";
    askAida(question);
  });
}
});
