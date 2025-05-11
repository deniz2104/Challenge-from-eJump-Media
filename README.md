# Cerință: Afișarea datelor dintr-un fișier într-un tabel HTML cu filtre dinamice

În fișierul [https://gandacel.ro/code_tests/testData.txt](https://gandacel.ro/code_tests/testData.txt) sunt mai multe înregistrări de forma `"Ax,By,Cz"`.  
Vrem să afișăm aceste înregistrări pe o pagină HTML, într-un **tabel** cu posibilitatea de **filtrare** a valorilor pe baza unor input-uri de tip **`<select>`**.

Inițial, pagina ar trebui să aibă un output similar cu cel de la:  
➡️ [https://gandacel.ro/code_tests/initial.html](https://gandacel.ro/code_tests/initial.html)

## Comportament dorit

La selecția unei valori noi din `select`-urile din partea de sus a paginii, conținutul paginii ar trebui să se **actualizeze automat**:
- Se vor modifica atât conținutul celorlalte elemente `select`, cât și conținutul tabelului.

### Exemple

- **Exemplul 1**  
  Dacă selectăm `A1` în primul `select`:
  - Al doilea `select`: vor fi afișate opțiunile `B1`, `B2`, `B3`
  - Al treilea `select`: vor fi afișate opțiunile `C1` până la `C6`
  - Tabelul: se afișează liniile 1 - 6  
  🔗 [https://gandacel.ro/code_tests/select_A1.html](https://gandacel.ro/code_tests/select_A1.html)

- **Exemplul 2**  
  Dacă selectăm `B4` în al doilea `select`:
  - Primul `select`: este selectat automat `A2`
  - Al treilea `select`: rămâne doar opțiunea `C7` (dispare opțiunea "Toate")
  - Tabelul: rămâne doar linia 7  
  🔗 [https://gandacel.ro/code_tests/select_B4.html](https://gandacel.ro/code_tests/select_B4.html)

- **Exemplul 3**  
  Dacă selectăm `C10` în al treilea `select`:
  - Primul `select`: este selectat automat `A3`
  - Al doilea `select`: este selectat automat `B6`
  - Tabelul: rămâne doar linia 10  
  🔗 [https://gandacel.ro/code_tests/select_C10.html](https://gandacel.ro/code_tests/select_C10.html)

---

⚙️ **Mecanismul de selecție trebuie să funcționeze pentru orice combinație de selecții făcută de utilizator**, nu doar pentru cazurile de mai sus.

📄 Ideal, datele ar trebui citite direct din fișierul atașat (`testData.txt`) sau dintr-un fișier cu structură similară.  
✅ Este acceptată și o soluție în care datele sunt hardcodate direct în HTML.
