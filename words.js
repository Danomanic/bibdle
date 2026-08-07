// Bibdle word list — five-letter Bible-related words (names, places, themes).
// All uppercase, all exactly 5 letters.
const ANSWERS = [
  "DAVID", "MOSES", "GRACE", "FAITH", "MANNA", "ALTAR", "TORAH", "JUDAH",
  "AARON", "JONAH", "PSALM", "SINAI", "EXILE", "CROWN", "BLOOD", "TRIBE",
  "REIGN", "HONOR", "GLORY", "WORLD", "LIGHT", "BREAD", "WATER", "STONE",
  "SWORD", "CURSE", "RULER", "REBEL", "SARAH", "JACOB", "PETER", "JAMES",
  "JESUS", "ANGEL", "JUDGE", "PEACE", "TEMPT", "DEATH", "BEAST", "CHILD",
  "EARTH", "HEART", "SOUTH", "NORTH", "PRIDE", "TRUTH", "SPEAR", "FLESH",
  "SHEEP", "MERCY", "TITHE", "FEAST", "TRIAL", "SAINT", "CHOIR", "VOICE"
];

// Deterministic "word of the day": every visitor on the same UTC calendar
// day gets the same word, with no server/backend involved.
function getTodayIndex() {
  const EPOCH = Date.UTC(2024, 0, 1); // arbitrary fixed epoch
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const daysSinceEpoch = Math.floor((today - EPOCH) / 86400000);
  return ((daysSinceEpoch % ANSWERS.length) + ANSWERS.length) % ANSWERS.length;
}

function getTodayWord() {
  return ANSWERS[getTodayIndex()];
}

function getTodayKey() {
  const now = new Date();
  return `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}-${now.getUTCDate()}`;
}
