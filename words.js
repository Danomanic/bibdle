// Bibdle word list — five-letter Bible-related words (names, places, themes).
// All uppercase, all exactly 5 letters. Hand-curated vocabulary, not text
// copied from any copyrighted Bible translation.
const ANSWERS = [
  // people
  "DAVID", "MOSES", "AARON", "JONAH", "SARAH", "JACOB", "PETER", "JAMES",
  "JESUS", "ISAAC", "NAOMI", "LABAN", "CALEB", "SIMON", "JUDAS", "SILAS",
  "TITUS", "ENOCH", "DINAH", "HAGAR", "HEROD", "LYDIA", "BARAK", "JESSE",
  "HAMAN", "CYRUS", "HOSEA", "URIAH", "MICAH", "NAHUM", "ASHER",
  // places
  "JUDAH", "SINAI", "EGYPT", "SODOM", "SYRIA", "HARAN", "SHEBA", "BABEL",
  "CRETE", "MALTA",
  // themes, objects, virtues
  "GRACE", "FAITH", "MANNA", "ALTAR", "TORAH", "PSALM", "EXILE", "CROWN",
  "BLOOD", "TRIBE", "REIGN", "HONOR", "GLORY", "WORLD", "LIGHT", "BREAD",
  "WATER", "STONE", "SWORD", "CURSE", "RULER", "REBEL", "ANGEL", "JUDGE",
  "PEACE", "TEMPT", "DEATH", "BEAST", "CHILD", "EARTH", "HEART", "SOUTH",
  "NORTH", "PRIDE", "TRUTH", "SPEAR", "FLESH", "SHEEP", "MERCY", "TITHE",
  "FEAST", "TRIAL", "SAINT", "CHOIR", "VOICE", "BLESS", "DEMON", "IDOLS",
  "ELDER", "OFFER", "DREAM", "VERSE", "LAMBS", "GOATS", "FLOCK", "FLOOD",
  "STORM", "RAINS", "SLAVE", "BONDS", "FREED", "QUAIL", "MOUNT", "RIVER",
  "OCEAN", "WHALE", "SNAKE", "FRUIT", "SEEDS", "WHEAT", "GRAIN", "OLIVE",
  "GRAPE", "HONEY", "ROBES", "CLOAK", "TUNIC", "STAFF", "ARMOR", "TENTS",
  "WORDS", "BOOKS", "NAMES", "SIGNS", "POWER", "MIGHT", "HANDS", "HEALS",
  "BLIND", "LEPER", "RISEN", "TOMBS", "CROSS", "NAILS", "THORN", "CRIED",
  "MOURN", "HYMNS", "GUILT", "SHAME", "WRATH", "ANGER", "FEARS", "HOPES",
  "LOVED", "LOVES", "KINGS", "QUEEN", "REALM", "PROUD", "FOOLS", "TRUST",
  "CLEAN",
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
