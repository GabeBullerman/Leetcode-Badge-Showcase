import React from 'react'
import ReactDOMServer from 'react-dom/server';
import SvgWidget from '../components/SvgWidget';
import { allStyles } from '../styles/svg';
/**
 * 
 * @param {Array<any>} response - Array of LeetCode badge categories, each containing badges
 * @returns {height:number, width:number} 
 * Used to calculate dimensions of svg
 */
const calculateDimensions = (response: Array<any>, border: string, total: string) => {
    let height = 53 + (16 * 2); //header + padding top and bottom (1rem + 1rem)
    if (total !== 'false') {
        height += 18; // "X badges earned" line under the header
    }
    if (border === 'border') {
        height += 2; // add border of 1px on either side
    }
    let columns = 1;
    response.forEach(category => {
        height += 27; // category header
        // row height = icon (48) + reserved 2 name lines + padding/margin
        height += Math.ceil(category.badges.length / 4) * 102;
        columns = Math.max(columns, category.badges.length);
    })
    let width = 300; //for 1, 2 columns
    if (columns == 3) width = 320;
    else if (columns >= 4) width = 400;
    return { height, width };
}
/**
 * Returns SVG as a string.
 */
export function generateSvg(response: Array<any>, username: string, imgSource: string, theme: string, border: string, animated: string, total: string): string {
    const { height, width } = calculateDimensions(response, border, total);
    const svgBody = ReactDOMServer.renderToStaticMarkup(
        <SvgWidget response={response} username={username} imgSource={imgSource} theme={theme} border={border} animated={animated} total={total} />
    );

    return `
    <svg
        width="${width}"
        height="${height}"
        viewBox="0 0 ${width} ${height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        font-family="Segoe UI, sans-serif"
        ${theme === 'transparent' ? 'style="background: transparent;"' : ''}
    >
    <style>${allStyles}</style>
    ${svgBody}
    </svg>`;
}
