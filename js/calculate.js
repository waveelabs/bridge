//calculateScore
//calculateMatchpoints
//calculateVulnerability
//doubledConverter
//tesztelés -- nem valami részletes, még valszeg a konrás és rekonrás eseteket jó lenne lefedni

let ScorePage = {
  ns_v: "m",
  ew_v: "m",
  declarer: "E",
  contract_amount: 3,
  contract_suite: "N",
  tricks_result: 1, // a kontraktban vállalt ütéshez képest hány ütést nyertek el, pl. 1 = 1 ütés többlet, -1 = 1 ütés hiány
  doubled: 1,
};

export function calculateScore(ScorePage) {
  //2 elemű tömböt ad vissza, az első elem a NS, a második az EW pontszám

  let score = 0;

  let {
    ns_v,
    ew_v,
    declarer,
    contract_amount,
    contract_suite,
    tricks_result,
    doubled,
  } = ScorePage;

  //data
  let v = null;
  if (declarer === "N" || declarer === "S") {
    v = ns_v;
  }
  if (declarer === "E" || declarer === "W") {
    v = ew_v;
  }

  let d2 = doubled - 1; // undertricks helper
  if (doubled === 4) {
    d2 = 2;
  }

  let ns_score = 0;
  let ew_score = 0;

  //
  if (tricks_result > 0) {
    //trick points
    if (contract_suite === "C" || contract_suite === "D") {
      score = 20 * contract_amount * doubled;
    }

    if (contract_suite === "H" || contract_suite === "S") {
      score = 30 * contract_amount * doubled;
    }

    if (contract_suite === "N") {
      score = (40 + 30 * (tricks_result - 1)) * doubled;
    }

    // double points
    if (doubled === 2) {
      score *= 2;
    }
    if (doubled === 4) {
      score *= 4;
    }

    //game points
    if (score >= 100 && v === "m") {
      score += 300;
    }
    if (score >= 100 && v === "b") {
      score += 500;
    }
    if (score < 100) {
      score += 50;
    }

    //slam points
    if (contract_amount === 6 && v === "m") {
      score += 500;
    }
    if (contract_amount === 6 && v === "b") {
      score += 750;
    }

    if (contract_amount === 7 && v === "m") {
      score += 1000;
    }
    if (contract_amount === 7 && v === "b") {
      score += 1500;
    }

    //overtricks
    if (doubled === 1 && tricks_result > 0) {
      if (contract_suite === "C" || contract_suite === "D") {
        score += 20 * tricks_result;
      }
      if (
        contract_suite === "H" ||
        contract_suite === "S" ||
        contract_suite === "N"
      ) {
        score += 30 * tricks_result;
      }
    }

    if (doubled === 2 && tricks_result > 0) {
      if (v === "m") {
        score += 100 * tricks_result;
      }
      if (v === "b") {
        score += 200 * tricks_result;
      }
    }

    if (doubled === 4 && tricks_result > 0) {
      if (v === "m") {
        score += 200 * tricks_result;
      }
      if (v === "b") {
        score += 400 * tricks_result;
      }
    }
  }

  //undertricks
  if (tricks_result < 0) {
    const ot = [
      [50, 100, 200, 100, 200, 400],
      [100, 300, 600, 200, 500, 1000],
      [150, 500, 1000, 300, 800, 1600],
      [200, 800, 1600, 400, 1100, 2200],
      [250, 1100, 2200, 500, 1400, 2800],
      [300, 1400, 2800, 600, 1700, 3400],
      [350, 1700, 3400, 700, 2000, 4000],
      [400, 2000, 4000, 800, 2300, 4600],
      [450, 2300, 4600, 900, 2600, 5200],
      [500, 2600, 5200, 1000, 2900, 5800],
      [550, 2900, 5800, 1100, 3200, 6400],
      [600, 3200, 6400, 1200, 3500, 7000],
      [650, 3500, 7000, 1300, 3800, 7600],
    ];
    if (v === "m") {
      score = -ot[-tricks_result - 1][d2];
    }
    if (v === "b") {
      score = -ot[-tricks_result - 1][d2 + 3];
    }
  }

  //score számolása

  if (contract_suite == "P") {
    return [0, 0];
  }

  if (declarer === "N" || declarer === "S") {
    ns_score = score;
    ew_score = -score;
  }
  if (declarer === "E" || declarer === "W") {
    ns_score = -score;
    ew_score = score;
  }

  return [ns_score, ew_score];
}

export function calculateMatchpoints(score) {
  //intet kap meg intet ad vissza
  let matchpoint = 0;
  let mp = [
    10, 40, 80, 120, 160, 210, 260, 310, 360, 420, 490, 590, 740, 890, 1090,
    1290, 1490, 1740, 1990, 2240, 2490, 2990, 3490, 3990, 4000,
  ];
  for (let i = 0; i < mp.length; i++) {
    if (score > mp[i] && score <= mp[i + 1]) {
      matchpoint = i + 1;
      break;
    }
  }

  return matchpoint;
}

export function calculateVulnerability(board, declarer) {
  //intet és stringet ad meg stringet ad vissza
  let x = board % 16;
  let ns = "";
  let ew = "";
  const table = [
    [1, 8, 11, 14],
    [2, 5, 12, 15],
    [3, 6, 9, 16],
    [4, 7, 10, 13],
  ];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (table[i][j] === x) {
        ns = i === 0 || i === 2 ? "m" : "b";
        ew = i === 0 || i === 1 ? "m" : "b";
      }
    }
  }

  if (declarer === "N" || declarer === "S") {
    return ns;
  }
  if (declarer === "E" || declarer === "W") {
    return ew;
  }
}

export function doubledConverter(value) {
  if (value === "none") {
    return 1;
  } else if (value === "X") {
    return 2;
  } else if (value === "XX") {
    return 4;
  }
  return 1;
}

//tesztek
//calculateScore

let Page1 = {
  ns_v: "b",
  ew_v: "m",
  declarer: "E",
  contract_amount: 4,
  contract_suite: "H",
  tricks_result: -3,
  doubled: 1,
};
let Page2 = {
  ns_v: "m",
  ew_v: "b",
  declarer: "S",
  contract_amount: 2,
  contract_suite: "S",
  tricks_result: 3,
  doubled: 1,
};
let Page3 = {
  ns_v: "m",
  ew_v: "m",
  declarer: "W",
  contract_amount: 6,
  contract_suite: "H",
  tricks_result: 1,
  doubled: 1,
};

const res1 = calculateScore(Page1);
console.assert(res1[0] === 150 && res1[1] === -150, "Page1 hiba!");

const res2 = calculateScore(Page2);
console.assert(res2[0] === 200 && res2[1] === -200, "Page2 hiba!");

const res3 = calculateScore(Page3);
console.assert(res3[0] === -1010 && res3[1] === 1010, "Page3 hiba!");

//calulateMatchpoints teszt

console.assert(
  calculateMatchpoints(10) === 0,
  "calculateMatchpoints teszt 1 hiba!",
);
console.assert(
  calculateMatchpoints(3990) === 23,
  "calculateMatchpoints teszt 2 hiba!",
);
console.assert(
  calculateMatchpoints(4000) === 24,
  "calculateMatchpoints teszt 3 hiba!",
);
console.assert(
  calculateMatchpoints(2210) === 19,
  "calculateMatchpoints teszt 4 hiba!",
);
console.assert(
  calculateMatchpoints(170) === 5,
  "calculateMatchpoints teszt 5 hiba!",
);

//calculateVulnerability teszt

console.assert(
  calculateVulnerability(65, "N") === "m",
  "calculateVulnerability teszt 1 hiba!",
);
console.assert(
  calculateVulnerability(38, "E") === "b",
  "calculateVulnerability teszt 2 hiba!",
);
console.assert(
  calculateVulnerability(26, "S") === "b",
  "calculateVulnerability teszt 3 hiba!",
);
console.assert(
  calculateVulnerability(31, "W") === "m",
  "calculateVulnerability teszt 4 hiba!",
);
