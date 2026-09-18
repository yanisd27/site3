<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FitLife Pro - Nutriție</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header class="navbar">
        <div class="logo">FitLife Pro</div>
        <nav class="nav-links">
            <a href="index.html">Acasă</a>
            <a href="antrenamente.html">Antrenamente</a>
            <a href="nutritie.html" class="active">Nutriție</a>
        </nav>
        <div style="display: flex; align-items: center;">
            <button id="theme-toggle" class="theme-toggle-btn">🌙 Dark Mode</button>
            <div class="auth-buttons" id="auth-area">
                <a href="login.html" class="login-btn">Conectare</a>
                <a href="register.html" class="register-btn">Înregistrare</a>
            </div>
        </div>
    </header>

    <main class="auth-section">
        <h2>Calculator de Calorii zilnice</h2>
        <p style="margin-bottom: 20px; color: #555;">Află de câte calorii ai nevoie pentru a-ți menține greutatea actuală.</p>
        
        <div class="nutritie-calculatoare-wrapper">

            <!-- CALCULATORUL TĂU DE CALORII -->
            <div class="calculator-box">
                <form id="calorie-form">
                    <div class="form-group">
                        <label for="sex">Gen</label>
                        <select id="sex" style="padding: 12px; border: 1px solid #cccccc; border-radius: 5px; font-size: 1rem; outline: none; background: white;">
                            <option value="masculin">Masculin</option>
                            <option value="feminin">Feminin</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="greutate">Greutate (kg)</label>
                        <input type="number" id="greutate" placeholder="Ex: 75" required min="30" max="250">
                    </div>
                    <div class="form-group">
                        <label for="inaltime">Înălțime (cm)</label>
                        <input type="number" id="inaltime" placeholder="Ex: 180" required min="100" max="250">
                    </div>
                    <div class="form-group">
                        <label for="varsta">Vârstă (ani)</label>
                        <input type="number" id="varsta" placeholder="Ex: 25" required min="10" max="100">
                    </div>
                    <div class="form-group">
                        <label for="activitate">Nivel de activitate</label>
                        <select id="activitate" style="padding: 12px; border: 1px solid #cccccc; border-radius: 5px; font-size: 1rem; outline: none; background: white;">
                            <option value="1.2">Sedentar (puțin sau deloc efort)</option>
                            <option value="1.375">Activitate ușoară (1-3 zile/săptămână)</option>
                            <option value="1.55">Activitate moderată (3-5 zile/săptămână)</option>
                            <option value="1.725">Activitate intensă (6-7 zile/săptămână)</option>
                        </select>
                    </div>
                    <button type="submit" class="submit-btn">Calculează</button>
                </form>

                <div id="rezultat-calorii" style="margin-top: 30px; display: none; text-align: center; background: #ffffff; padding: 25px; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); width: 100%;">
                    <h3 style="color: #222831; margin-bottom: 20px;">Planul Tău Caloric:</h3>
                    <div style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee;">
                        <p style="font-size: 0.9rem; color: #666; margin-bottom: 5px;">Pentru Menținere Greutate</p>
                        <p style="font-size: 1.4rem; font-weight: bold; color: #222831;"><span id="calorii-mentinere">0</span> kcal / zi</p>
                    </div>
                    <div class="zona-slabire-box" style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #eee; background-color: #fff5f5; border-radius: 8px;">
                        <p style="font-size: 0.9rem; color: #c53030; margin-bottom: 5px; font-weight: bold;">Pentru Slăbire (Deficit)</p>
                        <p style="font-size: 1.4rem; font-weight: bold; color: #c53030;"><span id="calorii-slabire">0</span> kcal / zi</p>
                    </div>
                    <div class="zona-masa-box" style="padding: 10px; background-color: #f0fff4; border-radius: 8px;">
                        <p style="font-size: 0.9rem; color: #2f855a; margin-bottom: 5px; font-weight: bold;">Pentru Masă Musculară (Surplus)</p>
                        <p style="font-size: 1.4rem; font-weight: bold; color: #2f855a;"><span id="calorii-masa">0</span> kcal / zi</p>
                    </div>
                </div>
            </div>
            <!-- CALCULATORUL TĂU DE MACRONUTRIENȚI -->
            <div class="calculator-box macro-box">
                <h3 style="margin-bottom: 20px; text-align: center;">Calculator Macronutrienți</h3>
                <p style="font-size: 0.9rem; text-align: center; margin-bottom: 20px;">Introdu caloriile ca să afli nutrienții.</p>
                <div class="form-group">
                    <label for="macro-calorii">Calorii Zilnice (kcal):</label>
                    <input type="number" id="macro-calorii" placeholder="Ex: 2000" min="0" required style="width: 100%; padding: 12px; border: 1px solid #cccccc; border-radius: 5px; font-size: 1rem;">
                </div>
                <button type="button" class="submit-btn" id="btn-calculeaza-macro" onclick="calculeazaMacronutrienti()">Calculează Macro</button>
                <div id="rezultat-macro-box" style="margin-top: 30px; padding: 20px; background: rgba(0,0,0,0.03); border-radius: 10px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(0,0,0,0.05);">
                        <span style="font-weight: bold;">Proteine (30%):</span>
                        <span id="rezultat-proteine" style="font-weight: bold; color: #00adb5; font-size: 1.2rem;">0g</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(0,0,0,0.05);">
                        <span style="font-weight: bold;">Carbohidrați (40%):</span>
                        <span id="rezultat-carbohidrati" style="font-weight: bold; color: #00adb5; font-size: 1.2rem;">0g</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="font-weight: bold;">Grăsimi (30%):</span>
                        <span id="rezultat-grasimi" style="font-weight: bold; color: #00adb5; font-size: 1.2rem;">0g</span>
                    </div>
                </div>
            </div>

        </div> <!-- Închidere wrapper calculatoare -->

                <!-- SECȚIUNEA CHAT AI CURATĂ ȘI STILATĂ -->
        <section class="ai-chat-section">
            <div class="chat-card">
                <div class="chat-header">
                    <span class="status-dot"></span>
                    <h3>Asistent Nutriție AI</h3>
                </div>
                <div id="chat-output" class="chat-box">
                    <div class="ai-msg">
                        <strong>AI</strong>
                        <p>Salut! Sunt aici să te ajut. Spune-mi ce ai mâncat azi sau cere-mi un plan alimentar personalizat! 🍎</p>
                    </div>
                </div>
                <div class="chat-input-area">
                    <input type="text" id="user-input" placeholder="Adresează o întrebare despre nutriție...">
                    <button id="send-btn">Trimite</button>
                </div>
            </div>
        </section>


    </main> <!-- Închidere main auth-section -->
    <footer>
        <p>&copy; 2026 FitLife Pro. Toate drepturile rezervate. Creat pentru un stil de viață sănătos.</p>
    </footer>

    <script>
        // 1. Verificăm starea de conectare la încărcarea paginii
        window.addEventListener('DOMContentLoaded', () => {
            const esteConectat = localStorage.getItem('este_conectat');
            const numeUtilizator = localStorage.getItem('utilizator_curent');

            if (esteConectat === 'true' && numeUtilizator) {
                const authArea = document.getElementById('auth-area');
                if (authArea) {
                    authArea.innerHTML = `
                        <span style="font-weight: bold; color: #00adb5; font-size: 0.95rem;">Salut, ${numeUtilizator}!</span>
                        <a href="#" id="logout-btn" style="color: #ffffff; text-decoration: none; font-size: 0.9rem; margin-left: 10px; border: 1px solid #ffffff; padding: 5px 12px; border-radius: 15px; cursor: pointer;">Deconectare</a>
                    `;

                    document.getElementById('logout-btn').addEventListener('click', (e) => {
                        e.preventDefault();
                        localStorage.removeItem('este_conectat');
                        localStorage.removeItem('utilizator_curent');
                        window.location.reload();
                    });
                }

                // Autocompletare date fizice salvate în cont
                const listaUtilizatori = JSON.parse(localStorage.getItem('utilizatori_fitlife')) || [];
                const utilizatorCurentDate = listaUtilizatori.find(u => u.nume === numeUtilizator);

                if (utilizatorCurentDate) {
                    if(document.getElementById('greutate')) document.getElementById('greutate').value = utilizatorCurentDate.greutate;
                    if(document.getElementById('inaltime')) document.getElementById('inaltime').value = utilizatorCurentDate.inaltime;
                    if(document.getElementById('varsta')) document.getElementById('varsta').value = utilizatorCurentDate.varsta;
                }
            }
        });

        // 2. Logica de calcul a calculatorului existent (Calorii)
        document.getElementById('calorie-form').addEventListener('submit', function(event) {
            event.preventDefault();

            const sex = document.getElementById('sex').value;
            const greutate = parseFloat(document.getElementById('greutate').value);
            const inaltime = parseFloat(document.getElementById('inaltime').value);
            const varsta = parseInt(document.getElementById('varsta').value);
            const activitate = parseFloat(document.getElementById('activitate').value);

            let bmr = 0;
            if (sex === 'masculin') {
                bmr = (10 * greutate) + (6.25 * inaltime) - (5 * varsta) + 5;
            } else {
                bmr = (10 * greutate) + (6.25 * inaltime) - (5 * varsta) - 161;
            }

            const caloriiMentinere = Math.round(bmr * activitate);
            const caloriiSlabire = caloriiMentinere - 400;
            const caloriiMasa = caloriiMentinere + 300;

            document.getElementById('calorii-mentinere').innerText = caloriiMentinere;
            document.getElementById('calorii-slabire').innerText = caloriiSlabire;
            document.getElementById('calorii-masa').innerText = caloriiMasa;

            document.getElementById('rezultat-calorii').style.display = 'block';

            localStorage.setItem('fitlife_mentinere', caloriiMentinere);
            localStorage.setItem('fitlife_slabire', caloriiSlabire);
            localStorage.setItem('fitlife_masa', caloriiMasa);
        });

        // 3. SCRIPTUL NOU DE LOGICĂ PENTRU MACRONUTRIENȚI
        function calculeazaMacronutrienti() {
            const inputCalorii = document.getElementById('macro-calorii').value;
            const calorii = parseFloat(inputCalorii);

            if (!calorii || calorii <= 0) {
                alert("Te rog introdu un număr valid de calorii zilnice!");
                return;
            }

            const grameProteine = Math.round((calorii * 0.30) / 4);
            const grameCarbohidrati = Math.round((calorii * 0.40) / 4);
            const grameGrasimi = Math.round((calorii * 0.30) / 9);

            document.getElementById('rezultat-proteine').innerText = grameProteine + "g";
            document.getElementById('rezultat-carbohidrati').innerText = grameCarbohidrati + "g";
            document.getElementById('rezultat-grasimi').innerText = grameGrasimi + "g";
        }

        // 4. LOGICA GLOBALĂ PENTRU DARK MODE
        const butonTema = document.getElementById('theme-toggle');
        const temaSalvata = localStorage.getItem('tema_site');
        
        if (temaSalvata === 'dark') {
            document.body.classList.add('dark-theme');
            if (butonTema) butonTema.innerText = '☀️ Light Mode';
        }

        if (butonTema) {
            butonTema.addEventListener('click', () => {
                document.body.classList.toggle('dark-theme');
                if (document.body.classList.contains('dark-theme')) {
                    butonTema.innerText = '☀️ Light Mode';
                    localStorage.setItem('tema_site', 'dark');
                } else {
                    butonTema.innerText = '🌙 Dark Mode';
                    localStorage.setItem('tema_site', 'light');
                }
            });
        }
    </script>

    <!-- Legătura corectă cu codul AI extern -->
    <script src="script.js"></script>
</body>
</html>
