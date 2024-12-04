import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSession, clearSession } from "./slices/authSlice";
import { createClient } from "../utils/supabase/server";

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const supabase = createClient();

    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        dispatch(setSession({ user, session: user.session }));
      } else {
        dispatch(clearSession());
      }

      supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
          dispatch(setSession({ user: session.user, session }));
        } else if (event === "SIGNED_OUT") {
          dispatch(clearSession());
        }
      });
    };

    checkAuth();
  }, [dispatch]);

  return null;
};

export default useAuth;