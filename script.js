let vozaci = [
    { ime: "Max Verstappen", tim: "Red Bull", brzina: 9, vestina: 9, vreme: 0, gumi: "Soft", pitStop: false, status: "Подготвен" },
    { ime: "Lando Norris", tim: "McLaren", brzina: 8, vestina: 8, vreme: 0, gumi: "Hard", pitStop: false, status: "Подготвен" },
    { ime: "Charles Leclerc", tim: "Ferrari", brzina: 8, vestina: 9, vreme: 0, gumi: "Soft", pitStop: false, status: "Подготвен" },
    { ime: "Lewis Hamilton", tim: "Mercedes", brzina: 8, vestina: 9, vreme: 0, gumi: "Hard", pitStop: false, status: "Подготвен" },
    { ime: "Fernando Alonso", tim: "Aston Martin", brzina: 7, vestina: 9, vreme: 0, gumi: "Soft", pitStop: false, status: "Подготвен" },
    { ime: "Carlos Sainz", tim: "Ferrari", brzina: 8, vestina: 8, vreme: 0, gumi: "Hard", pitStop: false, status: "Подготвен" },
    { ime: "Sergio Perez", tim: "Red Bull", brzina: 7, vestina: 7, vreme: 0, gumi: "Soft", pitStop: false, status: "Подготвен" },
    { ime: "George Russell", tim: "Mercedes", brzina: 8, vestina: 8, vreme: 0, gumi: "Hard", pitStop: false, status: "Подготвен" },
    { ime: "Oscar Piastri", tim: "McLaren", brzina: 8, vestina: 7, vreme: 0, gumi: "Soft", pitStop: false, status: "Подготвен" },
    { ime: "Yuki Tsunoda", tim: "RB", brzina: 6, vestina: 7, vreme: 0, gumi: "Hard", pitStop: false, status: "Подготвен" }
];

let krug = 0;
let maxKrugovi = 10;

function azurirajTabela() {
    let tabelaTelo = document.getElementById("tabelaTelo");
    tabelaTelo.innerHTML = "";

    vozaci.sort((a, b) => a.vreme - b.vreme);

    for (let i = 0; i < vozaci.length; i++) {
        let v = vozaci[i];
        let red = `<tr>
            <td>${i + 1}</td>
            <td>${v.ime}</td>
            <td>${v.tim}</td>
            <td>${v.vreme.toFixed(2)}</td>
            <td>${v.gumi}</td>
            <td>${v.status}</td>
        </tr>`;
        tabelaTelo.innerHTML += red;
    }
}

function sledenKrug() {
    if (krug >= maxKrugovi) return;

    krug++;
    document.getElementById("krugInfo").innerText = `Круг: ${krug} / ${maxKrugovi}`;
    
    let poraki = "";
    
    let bezbednosnoVozilo = Math.random() < 0.15; 
    
    if (bezbednosnoVozilo) {
        poraki += "Safety car!<br>";
    }

    for (let i = 0; i < vozaci.length; i++) {
        let v = vozaci[i];
        v.status = "Ок";

        let vremeKrug = 90 - (v.brzina * 0.5) - (v.vestina * 0.3);

        if (v.gumi === "Soft") {
            vremeKrug -= 1.5;
        }

        if (bezbednosnoVozilo) {
            vremeKrug = 110 + Math.random(); 
            v.status = "SC Круг";
        } else {
            let shansaZaGreshka = (10 - v.vestina) * 0.02 + 0.02;
            if (Math.random() < shansaZaGreshka) {
                vremeKrug += 15; 
                v.status = "Се изврте";
            }
        }

        let moraDaVleze = (krug === 9 && !v.pitStop);
        let randomVlez = (!v.pitStop && Math.random() < 0.20 && krug > 2);

        if (moraDaVleze || randomVlez) {
            vremeKrug += 22;
            v.gumi = (v.gumi === "Soft") ? "Hard" : "Soft"; 
            v.pitStop = true;
            v.status = "Пит стоп";
        }

        v.vreme += vremeKrug;
    }

    if (poraki === "") {
        poraki = "Кругот помина нормално без инциденти.";
    }
    
    if (krug === maxKrugovi) {
        vozaci.sort((a, b) => a.vreme - b.vreme);
        poraki = `ТРКАТА ЗАВРШИ! ПОБЕДНИК Е <strong>${vozaci[0].ime}</strong>!`;
        document.getElementById("kopceKrug").disabled = true;
        document.getElementById("kopceKrug").innerText = "Трката е завршена";
    } else {
        document.getElementById("kopceKrug").innerText = `Следен круг (${krug + 1})`;
    }

    document.getElementById("poraki").innerHTML = poraki;
    azurirajTabela();
}

azurirajTabela();