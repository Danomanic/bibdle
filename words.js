// Bibdle word list — five-letter Bible-related words (names, places, themes).
// All uppercase, all exactly 5 letters. Hand-curated vocabulary, not text
// copied from any copyrighted Bible translation. 366 words — one for every
// day of the year, including leap years, before the cycle repeats.
const ANSWERS = [
  // people
  "DAVID", "MOSES", "AARON", "JONAH", "SARAH", "JACOB", "PETER", "JAMES",
  "JESUS", "ISAAC", "NAOMI", "LABAN", "CALEB", "SIMON", "JUDAS", "SILAS",
  "TITUS", "ENOCH", "DINAH", "HAGAR", "HEROD", "LYDIA", "BARAK", "JESSE",
  "HAMAN", "CYRUS", "HOSEA", "URIAH", "MICAH", "NAHUM", "ASHER",
  "ELIAS", "REHUM", "ELIAB", "ELIHU", "AMASA", "ABNER", "ANNAS", "PHEBE",
  "ORPAH", "ACHAN", "ABDON", "AMNON", "TAMAR", "JOASH", "DEMAS", "LINUS",
  "GAIUS", "JASON",
  // places
  "JUDAH", "SINAI", "EGYPT", "SODOM", "SYRIA", "HARAN", "SHEBA", "BABEL",
  "CRETE", "MALTA",
  "JOPPA", "SIDON", "AMMON", "NEGEV", "JUDEA", "KEDAR", "GERAR", "HAZOR",
  "BEZEK", "MEDIA", "LYDDA", "BEREA", "DERBE", "TROAS", "ASSOS", "CHIOS",
  "SAMOS",
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
  "WIDOW", "BRIDE", "GROOM", "UNCLE", "NIECE", "TWINS", "YOUTH", "ADULT",
  "WIVES", "MOUTH", "TEETH", "KNEES", "TEARS", "WOUND", "SCARS", "CLOUD",
  "WINDS", "STARS", "HILLS", "ROCKS", "SANDS", "TREES", "FIELD", "PLAIN",
  "CLIFF", "CAVES", "FROST", "ISLES", "SHORE", "BROOK", "POOLS", "DUNES",
  "PEAKS", "RIDGE", "WOODS", "GROVE", "SEVEN", "THREE", "FORTY", "NIGHT",
  "YEARS", "MONTH", "WEEKS", "TODAY", "FIRST", "TENTH", "SIXTY", "FIFTY",
  "NINTH", "SIXTH", "FIFTH", "THIRD", "HOURS", "TIMES", "DAILY", "GREED",
  "SLOTH", "KINDS", "LOYAL", "PIOUS", "WEARY", "RIGHT", "WRONG", "NOBLE",
  "LUSTS", "EAGER", "FAINT", "FASTS", "VOWED", "MAKER", "SAVED", "SAVES",
  "ATONE", "WEEPS", "BOWED", "GIVES", "GIFTS", "HARPS", "LAMPS", "MYRRH",
  "JEWEL", "RINGS", "CHAIN", "YOKES", "VEILS", "TOWER", "WALLS", "GATES",
  "DOORS", "ROOMS", "HOUSE", "BOWLS", "WICKS", "SPICE", "LINEN", "CLOTH",
  "SEALS", "COINS", "MONEY", "PURSE", "WHIPS", "BRICK", "BEAMS", "HOOKS",
  "SHIPS", "BOATS", "SAILS", "WAVES", "ROADS", "PATHS", "CAMPS", "WELLS",
  "BANKS", "LIONS", "BEARS", "MULES", "CAMEL", "HORSE", "DOVES", "EAGLE",
  "RAVEN", "FROGS", "GNATS", "FLIES", "WORMS", "BULLS", "SWINE", "FOXES",
  "VIPER", "MOTHS", "HAWKS", "STORK", "WHITE", "BLACK", "GREEN", "IVORY",
  "BRASS", "AMBER", "DEEDS", "WORKS", "TOILS", "LABOR", "STORY", "SONGS",
  "DANCE", "RULES", "COURT", "OATHS", "ASKED", "FOUND", "TEACH", "LEADS",
  "GUIDE", "WALKS", "SPEAK", "SPOKE", "SHOUT", "SINGS", "WATCH", "GUARD",
  "ARISE", "DWELL", "ABIDE", "ENTER", "SERVE", "SEEKS", "FINDS", "KNOCK",
  "OPENS", "BUILT", "BUILD", "RAISE", "FALLS", "RISES", "STAND", "SHINE",
  "ORDER",
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
