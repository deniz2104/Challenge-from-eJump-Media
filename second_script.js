let lines = [];

window.addEventListener("DOMContentLoaded", () => {
  fetch("fetch_data.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Nu s-a putut conecta la server");
      }
      return response.text();
    })
    .then((data) => {
      lines = data.trim().split(/\r?\n/);

      populateTable(lines);

      let unique = mergeline(lines);
      unique = sortLines(unique);

      populateDropdowns(unique);

      document.getElementById("selectA").addEventListener("change", filterData);
      document.getElementById("selectB").addEventListener("change", filterData);
      document.getElementById("selectC").addEventListener("change", filterData);
    })
    .catch((error) => {
      console.error("Eroare la obtinerea datelor:", error);
    });
});

function mergeline(lines) {
  const merged = lines.join(",");
  let unique = Array.from(new Set(merged.split(",")));
  return unique;
}

function sortLines(lines) {
  return lines.sort((a, b) => {
    const aLetter = a[0];
    const bLetter = b[0];
    const aNum = parseInt(a.slice(1));
    const bNum = parseInt(b.slice(1));

    if (aLetter === bLetter) {
      return aNum - bNum;
    }
    return aLetter.localeCompare(bLetter);
  });
}

function populateTable(lines) {
  const table = document.getElementById("dataTable");
  while (table.rows.length > 0) {
    table.deleteRow(0);
  }
  lines.forEach((line) => {
    const row = document.createElement("tr");
    const cell = line;
    const cellElement = document.createElement("td");
    cellElement.textContent = cell;
    row.appendChild(cellElement);
    table.appendChild(row);
  });
}

function populateDropdowns(unique) {
  const selects = {
    A: document.getElementById("selectA"),
    B: document.getElementById("selectB"),
    C: document.getElementById("selectC"),
  };

  unique.forEach((item) => {
    const letter = item[0];
    if (selects[letter]) {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      selects[letter].appendChild(option);
    }
  });
}

function filterData() {
  const selectA = document.getElementById("selectA").value;
  const selectB = document.getElementById("selectB").value;
  const selectC = document.getElementById("selectC").value;

  let filteredData = lines;
  if (selectA !== "Toate") {
    filteredData = filteredData.filter((line) => line.includes(selectA));
  }
  if (selectB !== "Toate") {
    filteredData = filteredData.filter((line) => line.includes(selectB));
  }
  if (selectC !== "Toate") {
    filteredData = filteredData.filter((line) => line.includes(selectC));
  }

  populateTable(filteredData);

  let uniqueItems = mergeline(filteredData);
  uniqueItems = sortLines(uniqueItems);

  const currentSelections = {
    A: selectA,
    B: selectB,
    C: selectC,
  };

  const selects = {
    A: document.getElementById("selectA"),
    B: document.getElementById("selectB"),
    C: document.getElementById("selectC"),
  };

  for (const letter in selects) {
    if (currentSelections[letter] === "Toate") {
      while (selects[letter].options.length > 1) {
        selects[letter].remove(1);
      }

      const letterItems = uniqueItems.filter((item) => item[0] === letter);
      letterItems.forEach((item) => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        selects[letter].appendChild(option);
      });
    }
  }
}
