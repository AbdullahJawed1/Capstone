import { create } from 'zustand'
import { doc, setDoc,getDoc } from "firebase/firestore"; 
import { firebaseDb } from './firebase';

export const useChatStore = create((set) => ({
  chatId: null,
  user:null,
  isLoading:true,
  changeChat: (chatId,user) =>{
    return set({
        chatId,
        user
    })
  }
}))