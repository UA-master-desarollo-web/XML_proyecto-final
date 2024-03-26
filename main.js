const inputElement = document.getElementById("inputElement");
const containerResult = document.getElementById("result");
const btn = document.getElementById("btn");
const btnTransform2 = document.getElementById("btnTransform2");
const btnDownload2 = document.getElementById("btnDownload2");
const containerResult2 = document.getElementById("result2");
const resultTransform2 = document.getElementById("resultTransform2");

btnTransform2.disabled = true;
btnDownload2.disabled = true;
let xmlDocTransfo1; // Documento xml resultado de la primera transformacion
let resultDocument;
let resultDocument2;

inputElement.onchange = (e) => {
  const file = inputElement.files[0];

  if (!file) {
    btn.disabled = true; // Si no hay archivo, deshabilitar el botón de descarga
    btnTransform2.disabled = true;
    btnDownload2.disabled = true;
    return;
  }

  const reader = new FileReader();

  reader.onload = (e) => {
    const textContent = e.target.result;
    const parser = new DOMParser();
    xmlDocTransfo1 = parser.parseFromString(textContent, "text/xml");
    const xslDoc = new XMLHttpRequest();
    xslDoc.open("GET", "estilo.xsl", true);
    w;
    xslDoc.responseType = "document";

    xslDoc.onload = () => {
      const xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xslDoc.responseXML);
      resultDocument = xsltProcessor.transformToDocument(xmlDocTransfo1);
      console.log(resultDocument);

      const transformedContent = document.createElement("div");
      transformedContent.innerHTML = new XMLSerializer().serializeToString(
        resultDocument.documentElement
      );
      containerResult.appendChild(transformedContent);
    };

    xslDoc.send();
    btn.disabled = false;
    btnTransform2.disabled = false;
  };

  reader.onerror = (e) => {
    const error = e.target.error;
    console.log(`Error happened while reading ${file.name}`, error);
  };

  reader.readAsText(file);
};

function downloadFile() {
  if (!resultDocument) {
    console.log("No document is available");
    return;
  }

  try {
    const transformedXmlString = new XMLSerializer().serializeToString(
      resultDocument
    );
    const blob = new Blob([transformedXmlString], { type: "text/xml" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "pueblos_transformados.xml";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}

function transformFromResult() {
  console.log("Segunda transformación iniciada");

  if (!resultDocument) {
    console.error("No se ha realizado la primera transformación");
    return;
  }

  // Crear un nuevo documento XML para la segunda transformación
  resultDocument2 = new DOMParser().parseFromString(
    '<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet href="estilo.xsl" type="text/xsl"?>\n<rows/>',
    "text/xml"
  );

  // Obtener los elementos div del resultado de la primera transformación
  const divs = containerResult.querySelectorAll("div");

  // Realizar la segunda transformación utilizando los elementos
  divs.forEach((div, index) => {
    const row = resultDocument2.createElement("row");
    row.setAttribute("num", index + 1);

    const documentName = div.querySelector("h3")
      ? div.querySelector("h3").textContent.trim()
      : "";
    const documentDescription = div.querySelector("p")
      ? div.querySelector("p").textContent.replace("Descripcion: ", "")
      : "";
    const country = div.querySelectorAll("p")[1]
      ? div.querySelectorAll("p")[1].textContent.replace("País: ", "")
      : "";
    const latwgs84 = div.querySelectorAll("p")[2]
      ? div.querySelectorAll("p")[2].textContent.replace("Latitud: ", "")
      : "";
    const lonwgs84 = div.querySelectorAll("p")[3]
      ? div.querySelectorAll("p")[3].textContent.replace("Longitud: ", "")
      : "";
    const territory = div.querySelector("section h5")
      ? div.querySelector("section h5").textContent.trim()
      : "";
    const friendlyUrl = div.querySelector("a")
      ? div.querySelector("a").href
      : "";

    const documentNameElement = resultDocument2.createElement("documentName");
    documentNameElement.textContent = documentName;
    row.appendChild(documentNameElement);

    const documentDescriptionElement = resultDocument2.createElement(
      "documentDescription"
    );
    documentDescriptionElement.textContent = documentDescription;
    row.appendChild(documentDescriptionElement);

    const countryElement = resultDocument2.createElement("country");
    countryElement.textContent = country;
    row.appendChild(countryElement);

    const latwgs84Element = resultDocument2.createElement("latwgs84");
    latwgs84Element.textContent = latwgs84;
    row.appendChild(latwgs84Element);

    const lonwgs84Element = resultDocument2.createElement("lonwgs84");
    lonwgs84Element.textContent = lonwgs84;
    row.appendChild(lonwgs84Element);

    const territoryElement = resultDocument2.createElement("territory");
    territoryElement.textContent = territory;
    row.appendChild(territoryElement);

    const friendlyUrlElement = resultDocument2.createElement("friendlyUrl");
    friendlyUrlElement.textContent = friendlyUrl;
    row.appendChild(friendlyUrlElement);

    // Agregar el elemento row al elemento raíz del documento XML de salida
    resultDocument2.documentElement.appendChild(row);
  });

  // Mostrar el resultado de la segunda transformación en el textarea
  const resultTextarea = document.getElementById("resultTransform2");
  resultTextarea.value = new XMLSerializer().serializeToString(
    resultDocument2.documentElement
  );

  // Habilitar el botón de descarga para la segunda transformación
  btnDownload2.disabled = false;

  console.log(
    "Resultado de la segunda transformación:",
    new XMLSerializer().serializeToString(resultDocument2.documentElement)
  );
}

function showMessage() {
  const resultContainer = document.getElementById("result2");
  resultContainer.innerHTML +=
    "<p>Se ha cargado el archivo con la Transformación 1 realizada.</p>";
}

function downloadFile2() {
  if (!resultDocument2) {
    console.log("No document is available");
    return;
  }

  try {
    const transformedXmlString = new XMLSerializer().serializeToString(
      resultDocument2
    );
    const blob = new Blob([transformedXmlString], { type: "text/xml" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "transformacionII.xml";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}
