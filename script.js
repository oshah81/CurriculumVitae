async function exportToWord(event) {
    const importProm = import("html-to-docx");
    const mainElem = document.querySelector("main");
    const { default: generateContainer } = await importProm;

    const docXRes = await generateContainer(mainElem.innerHTML, null, {
        orientation: "portrait",
        title: document.title,
        lastModifiedBy: document.getElementById("meta[name='author']")?.content ?? "CV",
        font: "Arial",
        footer: true,
        pageNumber: true
    }, null);
    window.location = URL.createObjectURL(docXRes);
}


export { exportToWord };
