import { useState, useRef, useEffect } from "react";

const STORAGE_KEY = "gemini_api_key";

interface Message {
  role: "user" | "bot" | "error";
  text: string;
}

interface HistoryEntry {
  role: "user" | "model";
  text: string;
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY) || "");
  const [keyInput, setKeyInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hey there! 👋 I'm here to listen. How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const history = useRef<HistoryEntry[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function saveKey() {
    const val = keyInput.trim();
    if (!val) return;
    setApiKey(val);
    localStorage.setItem(STORAGE_KEY, val);
    setKeyInput("");
  }

  async function callGemini(userText: string): Promise<string> {
    const contents = [
      ...history.current.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      })),
      { role: "user", parts: [{ text: userText }] },
    ];

    // Using v1beta to ensure system_instruction is recognized
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          contents,
          system_instruction: {
            parts: [{ 
              text: `You are a supportive Mental Health and General Wellness assistant. 
                     1. Focus ONLY on mental health, emotional well-being, and general friendly conversation. 
                     2. If a user asks for code, engineering help, or unrelated technical tasks, politely say you are specialized in emotional support and redirect them.
                     3. Use a warm, empathetic, and non-judgmental tone.
                     4. Disclaimer: You are an AI, not a healthcare professional. If they mention self-harm, provide international helpline info.` 
            }]
          }
        }),
      }
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error((err as any)?.error?.message || `HTTP ${res.status}`);
    }

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
  }

  async function sendMessage() {
    if (isTyping || !input.trim()) return;
    if (!apiKey) return;

    const text = input.trim();
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    setMessages((prev) => [...prev, { role: "user", text }]);
    history.current.push({ role: "user", text });
    setIsTyping(true);

    try {
      const reply = await callGemini(text);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      history.current.push({ role: "model", text: reply });
      if (!isOpen) setShowNotif(true);
    } catch (err: any) {
      setMessages((prev) => [...prev, { role: "error", text: `Error: ${err.message}` }]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function autoResize(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + "px";
  }

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.window,
          transform: isOpen ? "scale(1) translateY(0)" : "scale(0.85) translateY(12px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
        }}
      >
        <div style={styles.header}>
          <div style={styles.avatar}>🌿</div>
          <div style={{ flex: 1 }}>
            <div style={styles.headerName}>Asha</div>
            <div style={styles.headerStatus}>
              <span style={styles.statusDot} />
              Your Wellness Guide
            </div>
          </div>
          <button style={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
        </div>

        {!apiKey && (
          <div style={styles.keyBanner}>
            <input
              type="password"
              placeholder="Enter Gemini API key..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && saveKey()}
              style={styles.keyInput}
            />
            <button onClick={saveKey} style={styles.saveBtn}>Save</button>
          </div>
        )}

        <div style={styles.messages}>
          <div style={styles.disclaimer}>
            This bot is for support and general info. For emergencies, please contact a professional.
          </div>
          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                ...styles.msg,
                ...(m.role === "user" ? styles.msgUser : m.role === "error" ? styles.msgError : styles.msgBot),
              }}
            >
              {m.text}
            </div>
          ))}
          {isTyping && (
            <div style={styles.typingIndicator}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{ ...styles.typingDot, animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.inputRow}>
          <textarea
            ref={textareaRef}
            rows={1}
            placeholder="How are you feeling?"
            value={input}
            onChange={autoResize}
            onKeyDown={handleKeyDown}
            style={styles.textarea}
          />
          <button onClick={sendMessage} disabled={isTyping} style={styles.sendBtn}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#fff">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

      <button
        title="Open Wellness Chat"
        onClick={() => { setIsOpen((o) => !o); setShowNotif(false); }}
        style={styles.toggleBtn}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#fff"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s" }}>
          {isOpen
            ? <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            : <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          }
        </svg>
        {showNotif && <span style={styles.notifDot} />}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.25); }
        }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { position: "fixed", bottom: 28, right: 28, zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, fontFamily: "'DM Sans', sans-serif" },
  window: { width: 370, maxHeight: 520, background: "#13111e", border: "1px solid #2a2545", borderRadius: 20, boxShadow: "0 24px 80px rgba(0,0,0,0.55)", display: "flex", flexDirection: "column", overflow: "hidden", transformOrigin: "bottom right", transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1), opacity 0.25s ease" },
  header: { padding: "14px 18px", background: "linear-gradient(135deg,#1a1630,#16122a)", borderBottom: "1px solid #221d3a", display: "flex", alignItems: "center", gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#10b981)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  headerName: { fontWeight: 700, fontSize: "0.92rem", color: "#f0eeff" },
  headerStatus: { fontSize: "0.72rem", color: "#34d399", display: "flex", alignItems: "center", gap: 4 },
  statusDot: { width: 6, height: 6, borderRadius: "50%", background: "#34d399" },
  closeBtn: { background: "none", border: "none", color: "#55506e", cursor: "pointer", fontSize: 18 },
  keyBanner: { padding: "10px 16px", background: "rgba(234,179,8,0.08)", borderBottom: "1px solid rgba(234,179,8,0.15)", display: "flex", gap: 8 },
  keyInput: { flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(234,179,8,0.25)", borderRadius: 8, padding: "6px 10px", color: "#e8e6f0", fontSize: "0.78rem", outline: "none" },
  saveBtn: { background: "#eab308", color: "#0d0d12", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer" },
  messages: { flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 },
  disclaimer: { fontSize: "0.65rem", color: "#8b86a3", textAlign: "center", marginBottom: 8, fontStyle: "italic", lineHeight: 1.4 },
  msg: { maxWidth: "82%", padding: "10px 14px", borderRadius: 16, fontSize: "0.87rem", lineHeight: 1.6, wordBreak: "break-word" },
  msgBot: { alignSelf: "flex-start", background: "#1e1a32", color: "#d4d0e8", borderBottomLeftRadius: 4 },
  msgUser: { alignSelf: "flex-end", background: "linear-gradient(135deg,#059669,#2563eb)", color: "#fff", borderBottomRightRadius: 4 },
  msgError: { alignSelf: "flex-start", background: "rgba(239,68,68,0.12)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)", borderBottomLeftRadius: 4 },
  typingIndicator: { display: "flex", gap: 4, padding: "12px 16px", background: "#1e1a32", borderRadius: 16, borderBottomLeftRadius: 4, alignSelf: "flex-start" },
  typingDot: { width: 7, height: 7, background: "#10b981", borderRadius: "50%", animation: "bounce 1.2s infinite" },
  inputRow: { padding: "12px 14px", background: "#0f0d1a", borderTop: "1px solid #1e1a30", display: "flex", gap: 8, alignItems: "flex-end" },
  textarea: { flex: 1, background: "#1a1630", border: "1px solid #2a2545", borderRadius: 12, padding: "10px 14px", color: "#e8e6f0", fontSize: "0.88rem", outline: "none", resize: "none", maxHeight: 100 },
  sendBtn: { width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#059669,#2563eb)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" },
  toggleBtn: { width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#2563eb)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 30px rgba(5,150,105,0.4)" },
  notifDot: { position: "absolute", top: 3, right: 3, width: 12, height: 12, background: "#34d399", borderRadius: "50%", border: "2px solid #13111e", animation: "pulse-dot 2s infinite" },
};