import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const insertReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useIsertDoc = (docColletion) => {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispach = (action) => {
    if (!cancelled) dispatch(action);
  };

  const insertDocument = async (documet) => {
    checkCancelBeforeDispach({
      type: "LOADING",
    });

    try {
      const newDoc = { ...documet, createdAt: Timestamp.now() }; /// crio um novo objeto e  consigo pegar quando ele foi criado

      const isertedDocument = await addDoc(
        /// resultado da inserção
        collection(db, docColletion), //vai procurar no database a coleçaõ que eu passei como argumento na função ]
        newDoc
      );

      checkCancelBeforeDispach({
        type: "INSERTED_DOC",
        payload: isertedDocument,
      });
    } catch (error) {
      checkCancelBeforeDispach({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { insertDocument, response };
};
