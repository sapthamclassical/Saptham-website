import { VIEWBOX, S_PATH, STRING, DANCER, fanBlades, GOLD, paletteFor } from "../../lib/brand/geometry";

const BLADES = fanBlades();

/**
 * The Saptham mark.
 *
 * @param {"primary"|"gold"|"mono"|"light"|"dark"} variant
 * @param {"full"|"simple"} detail  "simple" drops the dancer and fan — use it
 *   below ~40px, where that detail becomes noise (favicons, dense UI).
 */
const SapthamMark = ({
  variant = "primary",
  detail = "full",
  size = 40,
  title = "Saptham",
  className = "",
  ...rest
}) => {
  const c = paletteFor(variant);
  // Gradient ids must be unique per variant or a second instance on the page
  // reuses the first one's defs.
  const gid = `saptham-gold-${variant}`;
  const fill = c.s === "url(#saptham-gold)" ? `url(#${gid})` : c.s;
  const fanFill = c.fan === "url(#saptham-gold)" ? `url(#${gid})` : c.fan;

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      width={size}
      height={size}
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      {title && <title>{title}</title>}

      {variant === "primary" && (
        <defs>
          {/* 170° so the light reads as falling from above, per the Design Bible */}
          <linearGradient id={gid} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor={GOLD.hi} />
            <stop offset="45%" stopColor={GOLD.mid} />
            <stop offset="100%" stopColor={GOLD.lo} />
          </linearGradient>
        </defs>
      )}

      {/* the seven swaras — behind the S so the blades appear to pass under it */}
      {detail === "full" &&
        BLADES.map((b) => (
          <line
            key={b.key}
            x1={b.x1}
            y1={b.y1}
            x2={b.x2}
            y2={b.y2}
            stroke={fanFill}
            strokeWidth={b.width}
            strokeLinecap="round"
            opacity={0.9}
          />
        ))}

      {/* the drone string */}
      <line
        x1={STRING.x}
        y1={STRING.y1}
        x2={STRING.x}
        y2={STRING.y2}
        stroke={c.string}
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.85}
      />

      {/* the S */}
      <path d={S_PATH} fill={fill} />

      {/* the dancer, held in the upper counter */}
      {detail === "full" && (
        <g
          fill="none"
          stroke={c.dancer}
          strokeWidth={5.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx={DANCER.head.cx} cy={DANCER.head.cy} r={DANCER.head.r} fill={c.dancer} stroke="none" />
          <path d={DANCER.arm} />
          <path d={DANCER.torso} />
          <path d={DANCER.skirt} fill={c.dancer} fillOpacity={0.92} stroke="none" />
        </g>
      )}
    </svg>
  );
};

export default SapthamMark;
