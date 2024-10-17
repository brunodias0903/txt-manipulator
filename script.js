let originalFileContent = "";
let fileName = "";

function openFile() {
  document.getElementById("fileInput").click();
}

document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      fileName = file.name;

      reader.onload = function (e) {
        originalFileContent = e.target.result;
        document.querySelector("textarea").value = originalFileContent;
        document.getElementById("saveFileBtn").disabled = false;
        document.getElementById("downloadOriginalBtn").disabled = false;
      };

      reader.readAsText(file);
    } else {
      alert("Por favor, selecione um arquivo .txt válido.");
    }
  });

document.getElementById("saveFileBtn").addEventListener("click", function () {
  const textAreaContent = document.querySelector("textarea").value;
  downloadFile(textAreaContent, fileName);
});

document
  .getElementById("downloadOriginalBtn")
  .addEventListener("click", function () {
    downloadFile(originalFileContent, fileName);
  });

function downloadFile(content, fileName) {
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
