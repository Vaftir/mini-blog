import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null,
};

const updateReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDoc = (docColletion) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  //deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispach = (action) => {
    if (!cancelled) dispatch(action);
  };

  const updateDocument = async (id, data) => {
    checkCancelBeforeDispach({
      type: "LOADING",
    });

    try {
      const docRef = await doc(db, docColletion, id);

      const updatedDoc = await updateDoc(docRef, data);

      checkCancelBeforeDispach({
        type: "UPDATED_DOC",
        payload: updatedDoc,
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

  return { updateDocument, response };
};
