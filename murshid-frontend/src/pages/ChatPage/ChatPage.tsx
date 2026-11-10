import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  Bot,
  LogOut,
  Menu,
  MessageCircle,
  PanelLeftClose,
  Plus,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";
import { t } from "../../i18n/dictionary";
import { clearSession, getSession } from "../../services/sessionService";
import { sendChatMessage } from "../../services/chatApiService";
import {
  addMessageToConversation,
  createConversation,
  getConversationMessages,
  getConversations,
} from "../../services/conversationService";
import type { ChatMessage, Conversation } from "../../types";
import "./ChatPage.css";

export default function ChatPage() {
  const { language, toggleLanguage } = useLanguage();
  const session = getSession();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const studentId = session?.studentId || 0;
  const studentName = session?.studentName || "Student";

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  async function loadConversations() {
    if (!studentId) return;

    const list = await getConversations(studentId);
    setConversations(list);

    if (list.length > 0 && !activeConversationId) {
      openConversation(list[0].id);
    }
  }

  async function openConversation(conversationId: string) {
    setActiveConversationId(conversationId);
    const loadedMessages = await getConversationMessages(studentId, conversationId);
    setMessages(loadedMessages);
    setSidebarOpen(false);
  }

  async function handleNewChat() {
    setActiveConversationId("");
    setMessages([]);
    setInput("");
    setSidebarOpen(false);
  }

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function buildConversationTitle(text: string) {
    return text.length > 34 ? `${text.slice(0, 34)}...` : text;
  }

  async function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const text = input.trim();
    if (!text || loading || !studentId) return;

    setInput("");
    setLoading(true);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    let conversationId = activeConversationId;

    try {
      if (!conversationId) {
        conversationId = await createConversation(studentId, buildConversationTitle(text));
        setActiveConversationId(conversationId);
      }

      await addMessageToConversation({
        studentId,
        conversationId,
        role: "user",
        text,
      });

      const result = await sendChatMessage({
        studentId,
        language,
        message: text,
      });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: result.replyText,
        createdAt: new Date(),
        agent: result.agent,
        intent: result.intent,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      await addMessageToConversation({
        studentId,
        conversationId,
        role: "assistant",
        text: result.replyText,
        agent: result.agent,
        intent: result.intent,
      });

      await loadConversations();
    } catch (error) {
      console.error(error);

      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: t(language, "connectionError"),
        createdAt: new Date(),
        agent: "system",
        intent: "connection_error",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    clearSession();
    window.location.href = "/login";
  }

  return (
    <main className={`chat-page ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <aside className={`chat-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="chat-brand">
            <div className="chat-brand-icon">
              <Sparkles size={20} />
            </div>
            <div>
              <strong>{t(language, "appName")}</strong>
              <span>{t(language, "appSubtitle")}</span>
            </div>
          </div>

          <button className="mobile-close" onClick={() => setSidebarOpen(false)}>
  <X size={20} />
</button>
        </div>

        <button className="new-chat-btn" onClick={handleNewChat}>
          <Plus size={18} />
          {t(language, "newChat")}
        </button>

        <div className="conversation-title">{t(language, "conversations")}</div>

        <div className="conversation-list">
          {conversations.length === 0 ? (
            <div className="no-conversations">{t(language, "noConversations")}</div>
          ) : (
            conversations.map((conversation) => (
              <button
                key={conversation.id}
                className={`conversation-item ${
                  activeConversationId === conversation.id ? "active" : ""
                }`}
                onClick={() => openConversation(conversation.id)}
              >
                <MessageCircle size={17} />
                <div>
                  <strong>{conversation.title}</strong>
                  <span>{conversation.lastMessage || "..."}</span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="sidebar-footer">
          <div className="student-chip">
            <UserRound size={18} />
            <div>
              <strong>{studentName}</strong>
              <span>{studentId}</span>
            </div>
          </div>

          <div className="sidebar-actions">
            <button onClick={toggleLanguage}>{language === "ar" ? "EN" : "AR"}</button>
            <button onClick={handleLogout}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <section className="chat-main">
        <header className="chat-topbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
  <Menu size={22} />
</button>

          <div className="topbar-title">
            <strong>{t(language, "assistantName")}</strong>
            <span>{t(language, "chatWelcome")}</span>
          </div>

          <button
  className="hide-desktop-btn"
  onClick={() => setSidebarCollapsed((prev) => !prev)}
>
  <PanelLeftClose size={21} />
</button>
        </header>

        <div className="messages-area">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <div className="empty-icon">
                <Bot size={34} />
              </div>
              <h1>{t(language, "emptyChatTitle")}</h1>
              <p>{t(language, "emptyChatText")}</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`message-row ${message.role}`}>
                <div className="message-avatar">
                  {message.role === "assistant" ? <Bot size={19} /> : <UserRound size={19} />}
                </div>

                <div className="message-bubble">
                  <p>{message.text}</p>
                  {message.role === "assistant" && (message.agent || message.intent) && (
                    <div className="message-meta">
                      {message.agent && <span>{message.agent}</span>}
                      {message.intent && <span>{message.intent}</span>}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="message-row assistant">
              <div className="message-avatar">
                <Bot size={19} />
              </div>
              <div className="typing-bubble">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <div className="chat-input-wrap">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t(language, "askPlaceholder")}
              rows={1}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  e.currentTarget.form?.requestSubmit();
                }
              }}
            />
            <button type="submit" disabled={loading || !input.trim()}>
              <Send size={20} />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}