import { setSession, clearSession } from "../slices/authSlice";
import { createClient } from "../../utils/supabase/client";

export const authMiddleware = (store) => {
  let supabase;
  let unsubscribe;

  const initializeAuthListener = async () => {
    supabase = await createClient();

    const {
      data: { user, session },
    } = await supabase.auth.getSession();

    if (user && session) {
      store.dispatch(setSession({ user, session }));
    } else {
      store.dispatch(clearSession());
    }

    // Subscribe to auth changes
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        store.dispatch(setSession({ user: session.user, session }));
      } else if (event === "SIGNED_OUT") {
        store.dispatch(clearSession());
      }
    });

    unsubscribe = subscription?.unsubscribe;
  };

  // Initialize the listener when middleware is loaded
  initializeAuthListener();

  return (next) => (action) => {
    const result = next(action);

    // Cleanup on store destruction
    if (action.type === "STORE_DESTROY") {
      if (unsubscribe) unsubscribe();
    }

    return result;
  };
};