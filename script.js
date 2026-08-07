(() => {
  const WORD_LENGTH = 5;
  const MAX_GUESSES = 6;

  const KEY_ROWS = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "del"],
  ];

  const boardEl = document.getElementById("board");
  const keyboardEl = document.getElementById("keyboard");
  const toastEl = document.getElementById("toast");

  const state = {
    answer: getTodayWord(),
    guesses: [], // [{ word, statuses }]
    current: "",
    gameOver: false,
    won: false,
  };

  const storageKey = () => `bibdle-${getTodayKey()}`;

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey()) || "null");
      if (saved && saved.answer === state.answer) {
        state.guesses = saved.guesses || [];
        state.gameOver = !!saved.gameOver;
        state.won = !!saved.won;
      }
    } catch (e) {
      // ignore corrupt storage
    }
  }

  function save() {
    localStorage.setItem(
      storageKey(),
      JSON.stringify({
        answer: state.answer,
        guesses: state.guesses,
        gameOver: state.gameOver,
        won: state.won,
      })
    );
  }

  function scoreGuess(guess, answer) {
    const result = new Array(WORD_LENGTH).fill("absent");
    const answerLetters = answer.split("");
    const guessLetters = guess.split("");

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] === answerLetters[i]) {
        result[i] = "correct";
        answerLetters[i] = null;
        guessLetters[i] = null;
      }
    }
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (guessLetters[i] === null) continue;
      const idx = answerLetters.indexOf(guessLetters[i]);
      if (idx !== -1) {
        result[i] = "present";
        answerLetters[idx] = null;
      }
    }
    return result;
  }

  function buildBoard() {
    boardEl.innerHTML = "";
    for (let r = 0; r < MAX_GUESSES; r++) {
      const row = document.createElement("div");
      row.className = "board-row";
      row.dataset.row = r;
      for (let c = 0; c < WORD_LENGTH; c++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.dataset.row = r;
        tile.dataset.col = c;
        row.appendChild(tile);
      }
      boardEl.appendChild(row);
    }
  }

  const keyEls = {};

  function buildKeyboard() {
    keyboardEl.innerHTML = "";
    KEY_ROWS.forEach((rowKeys) => {
      const row = document.createElement("div");
      row.className = "key-row";
      // Wide keys (ENTER/DEL) get more of the row's width; fr units
      // guarantee the columns always sum to exactly the row's width,
      // so the keyboard can never overflow the viewport.
      row.style.gridTemplateColumns = rowKeys
        .map((k) => (k === "enter" || k === "del" ? "1.5fr" : "1fr"))
        .join(" ");
      rowKeys.forEach((k) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.dataset.key = k;
        btn.className = "key" + (k === "enter" || k === "del" ? " wide" : "");
        btn.textContent = k === "del" ? "DEL" : k === "enter" ? "ENTER" : k;
        btn.addEventListener("click", () => handleKey(k));
        keyEls[k] = btn;
        row.appendChild(btn);
      });
      keyboardEl.appendChild(row);
    });
  }

  function tileAt(r, c) {
    return boardEl.querySelector(`.tile[data-row="${r}"][data-col="${c}"]`);
  }

  function updateCurrentRowDisplay() {
    const r = state.guesses.length;
    if (r >= MAX_GUESSES) return;
    for (let c = 0; c < WORD_LENGTH; c++) {
      const tile = tileAt(r, c);
      const letter = state.current[c];
      tile.textContent = letter || "";
      tile.classList.toggle("filled", !!letter);
    }
  }

  function upgradeKeyStatus(letter, status) {
    const rank = { absent: 0, present: 1, correct: 2 };
    const el = keyEls[letter];
    if (!el) return;
    const cur = el.dataset.status;
    if (!cur || rank[status] > rank[cur]) {
      el.dataset.status = status;
      el.classList.remove("correct", "present", "absent");
      el.classList.add(status);
    }
  }

  function renderGuessInstant(r, word, statuses) {
    for (let c = 0; c < WORD_LENGTH; c++) {
      const tile = tileAt(r, c);
      tile.textContent = word[c];
      tile.classList.add("filled", statuses[c]);
    }
    for (let c = 0; c < WORD_LENGTH; c++) {
      upgradeKeyStatus(word[c], statuses[c]);
    }
  }

  function shakeRow(r) {
    for (let c = 0; c < WORD_LENGTH; c++) {
      const tile = tileAt(r, c);
      tile.classList.add("shake");
      tile.addEventListener(
        "animationend",
        () => tile.classList.remove("shake"),
        { once: true }
      );
    }
  }

  let toastTimer = null;
  function showToast(msg, duration = 1500) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), duration);
  }

  function revealRowAnimated(r, word, statuses, onDone) {
    for (let c = 0; c < WORD_LENGTH; c++) {
      const tile = tileAt(r, c);
      setTimeout(() => {
        tile.classList.add("flip");
        setTimeout(() => {
          tile.classList.add(statuses[c]);
          tile.classList.add("filled");
          upgradeKeyStatus(word[c], statuses[c]);
        }, 200);
      }, c * 250);
    }
    setTimeout(onDone, WORD_LENGTH * 250 + 250);
  }

  function submitGuess() {
    if (state.gameOver) return;
    const r = state.guesses.length;
    if (state.current.length < WORD_LENGTH) {
      shakeRow(r);
      showToast("Not enough letters");
      return;
    }

    const guess = state.current;
    // Keys are lowercase (data-key="a".."z") but ANSWERS in words.js are
    // uppercase, so the comparison must normalize case or every guess
    // scores as "absent" and a correct guess can never win.
    const statuses = scoreGuess(guess.toUpperCase(), state.answer);

    revealRowAnimated(r, guess, statuses, () => {
      state.guesses.push({ word: guess, statuses });
      state.current = "";
      const won = guess.toUpperCase() === state.answer;
      if (won) {
        state.gameOver = true;
        state.won = true;
        showToast("Well done! 🎉", 4000);
      } else if (state.guesses.length >= MAX_GUESSES) {
        state.gameOver = true;
        state.won = false;
        showToast(`The word was ${state.answer}`, 5000);
      }
      save();
    });
  }

  function handleKey(k) {
    if (state.gameOver) return;
    if (k === "enter") {
      submitGuess();
    } else if (k === "del") {
      state.current = state.current.slice(0, -1);
      updateCurrentRowDisplay();
    } else if (/^[a-z]$/.test(k)) {
      if (state.current.length < WORD_LENGTH) {
        state.current += k;
        updateCurrentRowDisplay();
      }
    }
  }

  function attachPhysicalKeyboard() {
    document.addEventListener("keydown", (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (key === "enter") {
        handleKey("enter");
      } else if (key === "backspace") {
        handleKey("del");
      } else if (/^[a-z]$/.test(key)) {
        handleKey(key);
      }
    });
  }

  function restoreSavedGuesses() {
    state.guesses.forEach((g, r) => renderGuessInstant(r, g.word, g.statuses));
  }

  function init() {
    load();
    buildBoard();
    buildKeyboard();
    restoreSavedGuesses();
    attachPhysicalKeyboard();

    if (state.gameOver) {
      showToast(
        state.won ? "Well done! 🎉" : `The word was ${state.answer}`,
        4000
      );
    }
  }

  init();
})();
