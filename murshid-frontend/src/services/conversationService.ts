import {
    addDoc,
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
  } from "firebase/firestore";
  import { db } from "../config/firebase";
  import type { ChatMessage, Conversation } from "../types";
  
  function studentDocId(studentId: number) {
    return String(studentId);
  }
  
  export async function createConversation(studentId: number, title: string) {
    const conversationsRef = collection(
      db,
      "students",
      studentDocId(studentId),
      "conversations"
    );
  
    const docRef = await addDoc(conversationsRef, {
      title,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastMessage: "",
    });
  
    return docRef.id;
  }
  
  export async function getConversations(studentId: number): Promise<Conversation[]> {
    const conversationsRef = collection(
      db,
      "students",
      studentDocId(studentId),
      "conversations"
    );
  
    const q = query(conversationsRef, orderBy("updatedAt", "desc"));
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map((item) => {
      const data = item.data();
  
      return {
        id: item.id,
        title: data.title || "محادثة جديدة",
        lastMessage: data.lastMessage || "",
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      };
    });
  }
  
  export async function addMessageToConversation(params: {
    studentId: number;
    conversationId: string;
    role: "user" | "assistant";
    text: string;
    agent?: string;
    intent?: string;
  }) {
    const messagesRef = collection(
      db,
      "students",
      studentDocId(params.studentId),
      "conversations",
      params.conversationId,
      "messages"
    );
  
    await addDoc(messagesRef, {
      role: params.role,
      text: params.text,
      agent: params.agent || "",
      intent: params.intent || "",
      createdAt: serverTimestamp(),
    });
  
    const conversationRef = doc(
      db,
      "students",
      studentDocId(params.studentId),
      "conversations",
      params.conversationId
    );
  
    await updateDoc(conversationRef, {
      lastMessage: params.text.slice(0, 90),
      updatedAt: serverTimestamp(),
    });
  }
  
  export async function getConversationMessages(
    studentId: number,
    conversationId: string
  ): Promise<ChatMessage[]> {
    const messagesRef = collection(
      db,
      "students",
      studentDocId(studentId),
      "conversations",
      conversationId,
      "messages"
    );
  
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const snapshot = await getDocs(q);
  
    return snapshot.docs.map((item) => {
      const data = item.data();
  
      return {
        id: item.id,
        role: data.role,
        text: data.text || "",
        agent: data.agent || "",
        intent: data.intent || "",
        createdAt: data.createdAt?.toDate?.() || new Date(),
      };
    });
  }