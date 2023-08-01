import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setEerror] = useState(null);
  const [loading, setLoading] = useState(null);

  //claenup
  // lida com memoryu leak
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) return;
  }

  //register
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setEerror(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;
      if (error.message.includes("6 characters")) {
        systemErrorMessage = "A senha precisa ter no mínimo 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail ja cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }
      setLoading(false);
      setEerror(systemErrorMessage);
    }
  };

  //logout
  const logOut = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  //login -sing in

  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setEerror(false);

    try {
      /// função login  no firebase
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
      /// tratamento de erro
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage;
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
      }

      setEerror(systemErrorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logOut,
    login,
  };
};
