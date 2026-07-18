import SapthamMark from "./SapthamMark";

/**
 * Mark + wordmark. The wordmark is live text (not outlined paths) so it stays
 * selectable, searchable, and accessible; the mark carries the identity.
 *
 * @param {"row"|"stack"} orientation
 */
const SapthamLockup = ({
  orientation = "row",
  variant = "primary",
  size = 36,
  tagline,
  className = "",
}) => {
  const row = orientation === "row";
  return (
    <span
      className={`inline-flex ${row ? "flex-row items-center gap-3" : "flex-col items-center gap-3"} ${className}`}
    >
      <SapthamMark variant={variant} size={size} title="" />
      <span className={`flex flex-col ${row ? "items-start" : "items-center"}`}>
        <span
          className="font-display gold-text text-2xl leading-none font-medium tracking-[0.14em]"
          style={{ fontOpticalSizing: "auto" }}
        >
          SAPTHAM
        </span>
        {tagline && (
          <span className="mt-1.5 text-[0.6rem] tracking-[0.28em] text-ash uppercase">
            {tagline}
          </span>
        )}
      </span>
    </span>
  );
};

export default SapthamLockup;
