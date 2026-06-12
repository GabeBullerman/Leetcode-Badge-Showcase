// @ts-nocheck
import Category from './Category';
import themes from '../utils/themes.json';
/**
 * The main SVG widget.
 */
export default function SvgWidget({ response, username, imgSource, theme, border, animated, total }): JSX.Element {
    const borderStyle = border === 'border' ? '1px solid #E4E2E2' : 'none';
    // Make SVG have transparent background if using transparent theme
    const isTransparent = theme === 'transparent';
    // Total badges across every category (independent of whether the username is shown).
    const totalBadges = response?.reduce((sum, category) => sum + (category?.badges?.length ?? 0), 0) ?? 0;
    // Cumulative badge index at the start of each category. Lets every badge know its
    // global position so animation delays can stagger evenly across the whole card
    // (delay = globalIndex / totalBadges * duration) instead of being random per-GIF.
    let running = 0;
    const categoryStart = (response ?? []).map((category) => {
        const start = running;
        running += category?.badges?.length ?? 0;
        return start;
    });

    return (
        <g>
            <foreignObject x="0" y="0" width="100%" height="100%">
                <div xmlns="http://www.w3.org/1999/xhtml">
                    {response?.length > 0 &&
                        <div
                            className="showCase"
                            style={{
                                backgroundColor: `${themes[theme].background}`,
                                border: borderStyle,
                            }}
                        >
                            <div>
                                <span style={{ color: `${themes[theme].colorPrimary}` }} className='header'>
                                    <img src={imgSource} alt="LeetCode Logo" title="LeetCode Logo" width={36} height={36} />
                                    <span>{username?.trim() ? `${username.trim()} LeetCode Badges` : 'LeetCode Badges'}</span>
                                </span>
                                {total !== 'false' &&
                                    <span className='total' style={{ color: `${themes[theme].colorSecondary}` }}>
                                        {totalBadges} {totalBadges === 1 ? 'badge' : 'badges'} earned
                                    </span>
                                }
                                <hr style={{ backgroundColor: `${themes[theme].colorSecondary}` }} />
                            </div>
                            {response?.map((category: Object, index: number) => {
                                return (<Category category={category} key={index} theme={theme} border={border} animated={animated} startIndex={categoryStart[index]} total={totalBadges} />)
                            })}
                        </div>
                    }
                </div>
            </foreignObject>
        </g>
    );
}
