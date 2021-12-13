/* eslint-disable no-useless-escape */
/* eslint-disable no-param-reassign */

function minifyHTMLString (htmlString) {
    if (typeof htmlString === 'string' || htmlString instanceof String) {
        try {
            const minifiedHTMLString = htmlString
                .replace(/\n/g, ' ')
                .replace(/\r/g, ' ')
                .replace(/\r\n/g, ' ')
                .replace(/[\t]+\</g, '<')
                .replace(/\>[\t ]+\</g, '><')
                .replace(/\>[\t ]+$/g, '>');

            return minifiedHTMLString;
        } catch (error) {
            return null;
        }
    } else {
        return null;
    }
}

async function generateContainer(
    htmlString,
    headerHTMLString,
    documentOptions = {},
    footerHTMLString
) {
    const JSZip = await import("./jszip.js");
    const zip = new JSZip();

    let contentHTML = htmlString;
    let headerHTML = headerHTMLString;
    let footerHTML = footerHTMLString;
    if (htmlString) {
        contentHTML = minifyHTMLString(contentHTML);
    }
    if (headerHTMLString) {
        headerHTML = minifyHTMLString(headerHTML);
    }
    if (footerHTMLString) {
        footerHTML = minifyHTMLString(footerHTML);
    }

    const { addFilesToContainer } = await import ("./src/html-to-docx");

    addFilesToContainer(zip, contentHTML, documentOptions, headerHTML, footerHTML);

    const buffer = await zip.generateAsync({ type: 'arraybuffer' });
    return new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
}

export default generateContainer;

