import themes from "../utils/themes.json";

const FLOAT_DURATION = 1.8; // seconds; keep in sync with the badgeFloat animation in styles/svg.ts

const Badge = ({ badge, theme, animated, index = 0, total = 1 }) => {

    const isAnimated: boolean = animated === 'true';
    const imageSource: string = (isAnimated && badge.medal?.config?.iconGif?.length) ? badge.medal.config.iconGif : badge.icon;

    // Evenly stagger each badge's float so the whole card moves as one consistent wave
    // (delay spread across one full cycle) rather than some badges happening to line up.
    const delay: number = total > 0 ? ((index % total) / total) * FLOAT_DURATION : 0;

    return (
        <div className="badge">
            <img
                className={isAnimated ? 'animated-icon' : undefined}
                style={isAnimated ? { animationDelay: `${delay.toFixed(3)}s` } : undefined}
                src={imageSource}
                alt="badge"
                width={48}
                height={48}
                title={badge.displayName}
            />
            <p style={{ 'color': `${themes[theme].colorPrimary}` }}>{badge.shortName}</p>
        </div>
    )
}

export default Badge;