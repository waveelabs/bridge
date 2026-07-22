<?php
  include __DIR__ . '/php/table_db.php';
?>
<!doctype html>
<html lang="hu">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Szkórlap</title>
  <link rel="stylesheet" href="css/styles.css" />
</head>

<body>
  <div class="container">
    <h1>Szkórlap</h1>

    <div class="card">
      <div class="form-row">
        <div class="form-col">
          <label for="tableNum"><strong>Asztal: </strong></label>
          <input type="number" id="tableNum" min="1" value="1" />
        </div>
        <div class="form-col">
          <label for="boardNum"><strong>Leosztás: </strong></label>
          <input type="number" id="boardNum" min="1" value="1" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label for="nsPair"><strong>N-S pár: </strong></label>
          <input type="number" id="nsPair" min="1" />
        </div>
        <div class="form-col">
          <label for="ewPair"><strong>E-W pár: </strong></label>
          <input type="number" id="ewPair" min="1" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-col">
          <label for="declarer"><strong>Felvevő:</strong></label>
          <select id="declarer">
            <option value="N">North</option>
            <option value="E">East</option>
            <option value="S">South</option>
            <option value="W">West</option>
          </select>
        </div>

        <div class="form-col">
          <label for="contractDoubled"><strong>Kontra:</strong></label>
          <select id="contractDoubled">
            <option value="none">Nincs</option>
            <option value="X">Kontra</option>
            <option value="XX">Rekontra</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">
          <label for="contractLevel"><strong>Szint (1-7):</strong></label>
          <select id="contractLevel">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>

        <div class="form-col">
          <label for="contractSuit"><strong>Szín:</strong></label>
          <select id="contractSuit">
            <option value="C">♣️ Treff</option>
            <option value="D">♦️ Káró</option>
            <option value="H">♥️ Kör</option>
            <option value="S">♠️ Pikk</option>
            <option value="NT">Szanzadu (NT)</option>
            <option value="4P">Körpassz (4 passz)</option>
          </select>
        </div>
      </div>

      <div class="form-row">
        <div class="form-col">

          <label for="tricksTaken"><strong>Eredmény:</strong></label>
          <select id="tricksTaken">
            <option value="" disabled selected>Válassz...</option>
            <option value="-13">-13</option>
            <option value="-12">-12</option>
            <option value="-11">-11</option>
            <option value="-10">-10</option>
            <option value="-9">-9</option>
            <option value="-8">-8</option>
            <option value="-7">-7</option>
            <option value="-6">-6</option>
            <option value="-5">-5</option>
            <option value="-4">-4</option>
            <option value="-3">-3</option>
            <option value="-2">-2</option>
            <option value="-1">-1</option>
            <option value="=">=</option>
            <option value="+1">+1</option>
            <option value="+2">+2</option>
            <option value="+3">+3</option>
            <option value="+4">+4</option>
            <option value="+5">+5</option>
            <option value="+6">+6</option>
          </select>
        </div>
        <div class="form-col">
          <label for="recorderName"><strong>Rögzítő neve: </strong></label>
          <input type="text" id="recorderName" placeholder="Pl. Robi" />
        </div>
      </div>

      <div id="declarerVulnerability">A felvevő szkórhelyzete:</div>
    </div>
    <p style="
          font-size: 18px;
          margin-bottom: 0;
          color: #555555;
          text-align: center;
        ">
      Hibáztál? Csak küldd be újra az űrlapot!
    </p>
    <div id="formMessage" class="warning-box" style="display: none; margin-bottom: 20px"></div>

    <button id="submitBtn" class="btn" style="background-color: #2b7a0b">
      Eredmény beküldése
    </button>
    <a href="index.html" class="btn">Vissza a főoldalra</a>
  </div>

  <div style="font-size: smaller; text-align: center">
    built with ♥️ by wavee.labs 🌊
  </div>

  <script src="js/mock-data.js"></script>
  <script src="js/utils.js"></script>
  <script type="module" src="js/pages/table.js"></script>
</body>

</html>