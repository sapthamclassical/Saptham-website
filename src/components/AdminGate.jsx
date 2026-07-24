import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion as Motion } from "motion/react";
import { signInAdmin } from "../lib/adminAuth";
import { EASE } from "../lib/motion";

/**
 * The hidden door (team priority 5).
 *
 * `useSecretKnock()` returns a click handler for any innocuous element — the
 * footer's © symbol. Seven clicks inside four seconds (the tala count) opens
 * a password-only modal. Normal visitors see nothing: no link, no button, no
 * hint; a stray click or two does nothing.
 */
export function useSecretKnock(onOpen, knocks = 7, windowMs = 4000) {
  const taps = useRef([]);
  return () => {
    const now = Date.now();
    taps.current = [...taps.current.filter((t) => now - t < windowMs), now];
    if (taps.current.length >= knocks) {
      taps.current = [];
      onOpen();
    }
  };
}

const AdminGate = ({ open, onClose }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const close = () => {
    if (busy) return;
    setPassword("");
    setError("");
    onClose();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!password || busy) return;
    setBusy(true);
    let ok = false;
    let err = "Admin sign-in could not be completed. Please try again.";
    try {
      ({ ok, error: err } = await signInAdmin(password));
    } catch {
      // Keep the error generic; authentication details are not useful here.
    } finally {
      setBusy(false);
    }
    if (ok) {
      setPassword("");
      setError("");
      onClose();
      navigate("/calendar");
    } else {
      setError(err);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-sanctum/90 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
        >
          <Motion.form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="glow-border w-full max-w-xs bg-charcoal p-8"
            style={{ "--gb-a": "#F2B458", "--gb-b": "#A375D9" }}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <p className="eyebrow">The Green Room</p>
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="passphrase"
              aria-label="Admin passphrase"
              className="mt-5 w-full border border-granite bg-sanctum/70 px-4 py-3 text-sm text-ivory outline-none placeholder:text-basalt focus:border-gold"
            />
            {error && <p className="mt-3 text-xs text-kumkum">{error}</p>}
            <button type="submit" disabled={busy} className="btn-brass mt-5 w-full justify-center">
              {busy ? "…" : "Enter"}
            </button>
          </Motion.form>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminGate;
