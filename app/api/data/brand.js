const brands = [
  { slug: "1stplayer", name: "1stPlayer" },
  { slug: "a-point-tech", name: "A Point Tech" },
  { slug: "a4tech", name: "A4Tech" },
  { slug: "agi", name: "AGI" },
  { slug: "aitc", name: "AITC" },
  { slug: "ajazz", name: "AJAZZ" },
  { slug: "akash", name: "AKASH" },
  { slug: "amd", name: "AMD" },
  { slug: "aoc", name: "AOC" },
  { slug: "apc", name: "APC" },
  { slug: "arktek", name: "ARKTEK" },
  { slug: "ars", name: "ARS" },
  { slug: "asrock", name: "ASRock" },
  { slug: "aula", name: "AULA" },
  { slug: "aun", name: "AUN" },
  { slug: "avita", name: "AVITA" },
  { slug: "aver", name: "AVer" },
  { slug: "avermedia", name: "AVerMedia" },
  { slug: "acer", name: "Acer" },
  { slug: "adata", name: "Adata" },
  { slug: "addlink", name: "Addlink" },
  { slug: "adobe", name: "Adobe" },
  { slug: "afox", name: "Afox" },
  { slug: "ahuja", name: "Ahuja" },
  { slug: "aigo", name: "Aigo" },
  { slug: "aiwa", name: "Aiwa" },
  { slug: "akaso", name: "Akaso" },
  { slug: "amazfit", name: "Amazfit" },
  { slug: "amazon", name: "Amazon" },
  { slug: "anacomda", name: "Anacomda" },
  { slug: "anker", name: "Anker" },
  { slug: "antec", name: "Antec" },
  { slug: "anydesk", name: "AnyDesk" },
  { slug: "apacer", name: "Apacer" },
  { slug: "aplus", name: "Aplus" },
  { slug: "apollo", name: "Apollo" },
  { slug: "apple", name: "Apple" },
  { slug: "aptech", name: "Aptech" },
  { slug: "arctic", name: "Arctic" },
  { slug: "armor", name: "Armor" },
  { slug: "asiahorse", name: "Asiahorse" },
  { slug: "astrum", name: "Astrum" },
  { slug: "asus", name: "Asus" },
  { slug: "asustor", name: "Asustor" },
  { slug: "audio-technica", name: "Audio Technica" },
  { slug: "aurora", name: "Aurora" },
  { slug: "ausek", name: "Ausek" },
  { slug: "avision", name: "Avision" },
  { slug: "awei", name: "Awei" },
  { slug: "bdcom", name: "BDCOM" },
  { slug: "baseus", name: "Baseus" },
  { slug: "beats", name: "Beats" },
  { slug: "belkin", name: "Belkin" },
  { slug: "benq", name: "Benq" },
  { slug: "bijoy", name: "Bijoy" },
  { slug: "biostar", name: "Biostar" },
  { slug: "bitdefender", name: "Bitdefender" },
  { slug: "biwintech", name: "Biwintech" },
  { slug: "bixolon", name: "Bixolon" },
  { slug: "blackmagic-design", name: "Blackmagic Design" },
  { slug: "bory", name: "Bory" },
  { slug: "bose", name: "Bose" },
  { slug: "boxlight", name: "Boxlight" },
  { slug: "boya", name: "Boya" },
  { slug: "brother", name: "Brother" },
  { slug: "c-data", name: "C-Data" },
  { slug: "cmx", name: "CMX" },
  { slug: "colmi", name: "COLMI" },
  { slug: "cambium", name: "Cambium" },
  { slug: "canon", name: "Canon" },
  { slug: "carbono", name: "Carbono" },
  { slug: "casio", name: "Casio" },
  { slug: "cheerlux", name: "Cheerlux" },
  { slug: "chuwi", name: "Chuwi" },
  { slug: "cisco", name: "Cisco" },
  { slug: "colorful", name: "Colorful" },
  { slug: "cooler-master", name: "Cooler Master" },
  { slug: "corsair", name: "Corsair" },
  { slug: "cote", name: "Cote" },
  { slug: "cougar", name: "Cougar" },
  { slug: "creative", name: "Creative" },
  { slug: "crucial", name: "Crucial" },
  { slug: "cudy", name: "Cudy" },
  { slug: "d-link", name: "D-Link" },
  { slug: "dinstar", name: "DINSTAR" },
  { slug: "dizo", name: "DIZO" },
  { slug: "dji", name: "DJI" },
  { slug: "dahua", name: "Dahua" },
  { slug: "dareu", name: "Dareu" },
  { slug: "deepcool", name: "Deepcool" },
  { slug: "deli", name: "Deli" },
  { slug: "dell", name: "Dell" },
  { slug: "delux", name: "Delux" },
  { slug: "digipod", name: "Digipod" },
  { slug: "digital-x", name: "Digital X" },
  { slug: "domens", name: "Domens" },
  { slug: "dopah", name: "Dopah" },
  { slug: "dtech", name: "Dtech" },
  { slug: "e-yooso", name: "E-YOOSO" },
  { slug: "eksa", name: "EKSA" },
  { slug: "ekwb", name: "EKWB" },
  { slug: "easysmx", name: "Easysmx" },
  { slug: "edifier", name: "Edifier" },
  { slug: "energizer", name: "Energizer" },
  { slug: "epson", name: "Epson" },
  { slug: "eset", name: "Eset" },
  { slug: "evga", name: "Evga" },
  { slug: "evolis", name: "Evolis" },
  { slug: "evolur", name: "Evolur" },
  { slug: "ewin", name: "Ewin" },
  { slug: "f-d", name: "F&D" },
  { slug: "fifine", name: "FIFINE" },
  { slug: "fjgear", name: "FJGEAR" },
  { slug: "forev", name: "FOREV" },
  { slug: "fsp", name: "FSP" },
  { slug: "furgle", name: "FURGLE" },
  { slug: "fantech", name: "Fantech" },
  { slug: "fanvil", name: "Fanvil" },
  { slug: "fastrack", name: "Fastrack" },
  { slug: "ficer", name: "Ficer" },
  { slug: "fiesta", name: "Fiesta" },
  { slug: "flyingvoice", name: "Flyingvoice" },
  { slug: "foneng", name: "Foneng" },
  { slug: "fujifilm", name: "Fujifilm" },
  { slug: "g-printer", name: "G-Printer" },
  { slug: "g-tide", name: "G-TiDE" },
  { slug: "g-skill", name: "G.Skill" },
  { slug: "galax", name: "Galax" },
  { slug: "gamdias", name: "Gamdias" },
  { slug: "gamesir", name: "GameSir" },
  { slug: "gamemax", name: "Gamemax" },
  { slug: "geil", name: "GeIL" },
  { slug: "general", name: "General" },
  { slug: "gigabyte", name: "Gigabyte" },
  { slug: "gigasonic", name: "Gigasonic" },
  { slug: "glorious", name: "Glorious" },
  { slug: "gopro", name: "GoPro" },
  { slug: "godex", name: "Godex" },
  { slug: "godox", name: "Godox" },
  { slug: "golden-field", name: "Golden Field" },
  { slug: "google", name: "Google" },
  { slug: "grandstream", name: "Grandstream" },
  { slug: "gree", name: "Gree" },
  { slug: "gunnir", name: "Gunnir" },
  { slug: "hkc", name: "HKC" },
  { slug: "hoco", name: "HOCO" },
  { slug: "hp", name: "HP" },
  { slug: "hpe", name: "HPE" },
  { slug: "htdz", name: "HTDZ" },
  { slug: "hxhf", name: "HXHF" },
  { slug: "haier", name: "Haier" },
  { slug: "havit", name: "Havit" },
  { slug: "haylou", name: "Haylou" },
  { slug: "henex", name: "Henex" },
  { slug: "hifuture", name: "HiFuture" },
  { slug: "hikvision", name: "Hikvision" },
  { slug: "hisense", name: "Hisense" },
  { slug: "hitachi", name: "Hitachi" },
  { slug: "hohem", name: "Hohem" },
  { slug: "honeywell", name: "Honeywell" },
  { slug: "honor", name: "Honor" },
  { slug: "horizon", name: "Horizon" },
  { slug: "huananzhi", name: "Huananzhi" },
  { slug: "huanda", name: "Huanda" },
  { slug: "huawei", name: "Huawei" },
  { slug: "huion", name: "Huion" },
  { slug: "huntkey", name: "Huntkey" },
  { slug: "hyperx", name: "HyperX" },
  { slug: "ideal", name: "IDEAL" },
  { slug: "imice", name: "IMICE" },
  { slug: "ip-com", name: "IP-COM" },
  { slug: "imilab", name: "Imilab" },
  { slug: "infinix", name: "Infinix" },
  { slug: "infocus", name: "Infocus" },
  { slug: "insta360", name: "Insta360" },
  { slug: "intel", name: "Intel" },
  { slug: "jbl", name: "JBL" },
  { slug: "jabra", name: "Jabra" },
  { slug: "jedel", name: "Jedel" },
  { slug: "jovision", name: "Jovision" },
  { slug: "joyroom", name: "Joyroom" },
  { slug: "kenson", name: "KENSON" },
  { slug: "kospet", name: "KOSPET" },
  { slug: "kstar", name: "KSTAR" },
  { slug: "kwg", name: "KWG" },
  { slug: "kaloc", name: "Kaloc" },
  { slug: "kaspersky", name: "Kaspersky" },
  { slug: "keychron", name: "Keychron" },
  { slug: "kieslect", name: "Kieslect" },
  { slug: "kingspec", name: "KingSpec" },
  { slug: "kingston", name: "Kingston" },
  { slug: "kioxia", name: "Kioxia" },
  { slug: "kisonli", name: "Kisonli" },
  { slug: "kodak", name: "Kodak" },
  { slug: "ldnio", name: "LDNIO" },
  { slug: "leven", name: "LEVEN" },
  { slug: "lg", name: "LG" },
  { slug: "leadtek", name: "Leadtek" },
  { slug: "lenovo", name: "Lenovo" },
  { slug: "levelone", name: "LevelOne" },
  { slug: "lexar", name: "Lexar" },
  { slug: "lexin", name: "Lexin" },
  { slug: "lian-li", name: "Lian Li" },
  { slug: "linksys", name: "Linksys" },
  { slug: "logitech", name: "Logitech" },
  { slug: "long", name: "Long" },
  { slug: "maono", name: "MAONO" },
  { slug: "maxsun", name: "MAXSUN" },
  { slug: "metz", name: "METZ" },
  { slug: "micropack", name: "MICROPACK" },
  { slug: "msi", name: "MSI" },
  { slug: "magegee", name: "Magegee" },
  { slug: "maken", name: "Maken" },
  { slug: "many", name: "Many" },
  { slug: "marshall", name: "Marshall" },
  { slug: "marsriva", name: "Marsriva" },
  { slug: "marvo", name: "Marvo" },
  { slug: "maxcool", name: "Maxcool" },
  { slug: "maxell", name: "Maxell" },
  { slug: "maxgreen", name: "Maxgreen" },
  { slug: "meetion", name: "Meetion" },
  { slug: "mercusys", name: "Mercusys" },
  { slug: "meta", name: "Meta" },
  { slug: "mi", name: "Mi" },
  { slug: "miphi", name: "MiPhi" },
  { slug: "mibro", name: "Mibro" },
  { slug: "microlab", name: "Microlab" },
  { slug: "microsoft", name: "Microsoft" },
  { slug: "midea", name: "Midea" },
  { slug: "mikrotik", name: "Mikrotik" },
  { slug: "mitel", name: "Mitel" },
  { slug: "monarch", name: "Monarch" },
  { slug: "monka", name: "Monka" },
  { slug: "montech", name: "Montech" },
  { slug: "motorola", name: "Motorola" },
  { slug: "motospeed", name: "Motospeed" },
  { slug: "netgear", name: "NETGEAR" },
  { slug: "npc", name: "NPC" },
  { slug: "nzxt", name: "NZXT" },
  { slug: "nano", name: "Nano" },
  { slug: "neo-forza", name: "Neo forza" },
  { slug: "netac", name: "Netac" },
  { slug: "netis", name: "Netis" },
  { slug: "newland", name: "Newland" },
  { slug: "nikon", name: "Nikon" },
  { slug: "noctua", name: "Noctua" },
  { slug: "noise", name: "Noise" },
  { slug: "nokia", name: "Nokia" },
  { slug: "non-name", name: "Non-Brand" },
  { slug: "norton", name: "Norton" },
  { slug: "noyafa", name: "Noyafa" },
  { slug: "ocpc", name: "OCPC" },
  { slug: "oppo", name: "OPPO" },
  { slug: "orico", name: "ORICO" },
  { slug: "ovo", name: "OVO" },
  { slug: "ofitech", name: "Ofitech" },
  { slug: "oneplus", name: "OnePlus" },
  { slug: "optoma", name: "Optoma" },
  { slug: "oraimo", name: "Oraimo" },
  { slug: "oryx", name: "Oryx" },
  { slug: "pc-power", name: "PC POWER" },
  { slug: "pccooler", name: "PCCOOLER" },
  { slug: "peladn", name: "PELADN" },
  { slug: "pico", name: "PICO" },
  { slug: "pny", name: "PNY" },
  { slug: "power-guard", name: "POWER GUARD" },
  { slug: "prolink", name: "PROLINK" },
  { slug: "palit", name: "Palit" },
  { slug: "panasonic", name: "Panasonic" },
  { slug: "pantum", name: "Pantum" },
  { slug: "patriot", name: "Patriot" },
  { slug: "perfect", name: "Perfect" },
  { slug: "phanteks", name: "Phanteks" },
  { slug: "philips", name: "Philips" },
  { slug: "phoinikas", name: "Phoinikas" },
  { slug: "plustek", name: "Plustek" },
  { slug: "poly", name: "Poly" },
  { slug: "posiflex", name: "Posiflex" },
  { slug: "power-pac", name: "Power Pac" },
  { slug: "power-print", name: "Power Print" },
  { slug: "power-train", name: "Power Train" },
  { slug: "powercolor", name: "PowerColor" },
  { slug: "powerpac", name: "PowerPac" },
  { slug: "qgeem", name: "Qgeem" },
  { slug: "r-m", name: "R&M" },
  { slug: "ramsta", name: "RAMSTA" },
  { slug: "ricoh", name: "RICOH" },
  { slug: "robot", name: "ROBOT" },
  { slug: "rode", name: "RODE" },
  { slug: "rongta", name: "RONGTA" },
  { slug: "royal-kludge", name: "ROYAL KLUDGE" },
  { slug: "rapoo", name: "Rapoo" },
  { slug: "razer", name: "Razer" },
  { slug: "redragon", name: "ReDragon" },
  { slug: "realme", name: "Realme" },
  { slug: "remax", name: "Remax" },
  { slug: "revenger", name: "Revenger" },
  { slug: "riversong", name: "Riversong" },
  { slug: "robeetle", name: "Robeetle" },
  { slug: "rowa", name: "Rowa" },
  { slug: "ruijie", name: "Ruijie" },
  { slug: "sabrent", name: "SABRENT" },
  { slug: "sharp", name: "SHARP" },
  { slug: "sjcam", name: "SJCAM" },
  { slug: "sprt", name: "SPRT" },
  { slug: "stata", name: "STATA" },
  { slug: "sunmi", name: "SUNMI" },
  { slug: "safenet", name: "Safenet" },
  { slug: "safeway", name: "Safeway" },
  { slug: "samsung", name: "Samsung" },
  { slug: "sandisk", name: "Sandisk" },
  { slug: "santak", name: "Santak" },
  { slug: "sapphire", name: "Sapphire" },
  { slug: "saramonic", name: "Saramonic" },
  { slug: "screenbeam", name: "ScreenBeam" },
  { slug: "seagate", name: "Seagate" },
  { slug: "sewoo", name: "Sewoo" },
  { slug: "singer", name: "Singer" },
  { slug: "skyloong", name: "Skyloong" },
  { slug: "smart", name: "Smart" },
  { slug: "smartx", name: "SmartX" },
  { slug: "snom", name: "Snom" },
  { slug: "solitine", name: "Solitine" },
  { slug: "sony", name: "Sony" },
  { slug: "space", name: "Space" },
  { slug: "srihome", name: "Srihome" },
  { slug: "starex", name: "Starex" },
  { slug: "starink", name: "Starink" },
  { slug: "steelseries", name: "SteelSeries" },
  { slug: "sunlux", name: "Sunlux" },
  { slug: "super-general", name: "Super General" },
  { slug: "synology", name: "Synology" },
  { slug: "t-wolf", name: "T-Wolf" },
  { slug: "toten", name: "TOTEN" },
  { slug: "totolink", name: "TOTOLINK" },
  { slug: "tp-link", name: "TP-Link" },
  { slug: "targus", name: "Targus" },
  { slug: "team", name: "Team" },
  { slug: "teclast", name: "Teclast" },
  { slug: "tecnoware", name: "Tecnoware" },
  { slug: "telesin", name: "Telesin" },
  { slug: "tenda", name: "Tenda" },
  { slug: "teutons", name: "Teutons" },
  { slug: "tev", name: "Tev" },
  { slug: "tharmal", name: "Tharmal" },
  { slug: "thermalright", name: "Thermalright" },
  { slug: "thermaltake", name: "Thermaltake" },
  { slug: "thunderobot", name: "Thunderobot" },
  { slug: "titan", name: "Titan" },
  { slug: "toshiba", name: "Toshiba" },
  { slug: "transcend", name: "Transcend" },
  { slug: "trendsonic", name: "Trendsonic" },
  { slug: "true-trust", name: "True Trust" },
  { slug: "twinmos", name: "TwinMOS" },
  { slug: "univision", name: "UNIVISION" },
  { slug: "ubiquiti", name: "Ubiquiti" },
  { slug: "ugreen", name: "Ugreen" },
  { slug: "uniview", name: "Uniview" },
  { slug: "veikk", name: "VEIKK" },
  { slug: "value-top", name: "Value-Top" },
  { slug: "vaseky", name: "Vaseky" },
  { slug: "vention", name: "Vention" },
  { slug: "vertiv", name: "Vertiv" },
  { slug: "viewsonic", name: "ViewSonic" },
  { slug: "viltrox", name: "Viltrox" },
  { slug: "vivitek", name: "Vivitek" },
  { slug: "vivo", name: "Vivo" },
  { slug: "wacom", name: "Wacom" },
  { slug: "walton", name: "Walton" },
  { slug: "wavlink", name: "Wavlink" },
  { slug: "western-digital", name: "Western Digital" },
  { slug: "wiwu", name: "WiWU" },
  { slug: "winson", name: "Winson" },
  { slug: "xfx", name: "XFX" },
  { slug: "xinji", name: "XINJI" },
  { slug: "xoc", name: "XOC" },
  { slug: "xp-pen", name: "XP-PEN" },
  { slug: "xtreme", name: "XTREME" },
  { slug: "xiaomi", name: "Xiaomi" },
  { slug: "xinmeng", name: "Xinmeng" },
  { slug: "xprinter", name: "Xprinter" },
  { slug: "xtra", name: "Xtra" },
  { slug: "xtrfy", name: "Xtrfy" },
  { slug: "xtrike", name: "Xtrike" },
  { slug: "xtrike-me", name: "Xtrike Me" },
  { slug: "yison", name: "YISON" },
  { slug: "yunzii", name: "YUNZII" },
  { slug: "yealink", name: "Yealink" },
  { slug: "yeston", name: "Yeston" },
  { slug: "yuanxin", name: "Yuanxin" },
  { slug: "yumite", name: "Yumite" },
  { slug: "yunteng", name: "Yunteng" },
  { slug: "zadak", name: "ZADAK" },
  { slug: "zhiyun", name: "ZHIYUN" },
  { slug: "ziyoulang", name: "ZIYOULANG" },
  { slug: "zkteco", name: "ZKTeco" },
  { slug: "zoook", name: "ZOOOK" },
  { slug: "zebex", name: "Zebex" },
  { slug: "zeblaze", name: "Zeblaze" },
  { slug: "zebra", name: "Zebra" },
  { slug: "zifriend", name: "Zifriend" },
  { slug: "zigor", name: "Zigor" },
  { slug: "zoom", name: "Zoom" },
  { slug: "zotac", name: "Zotac" },
  { slug: "zyxel", name: "Zyxel" },
  { slug: "escan", name: "eScan" },
  { slug: "inbertec", name: "inbertec" },
  { slug: "innovtech", name: "innovtech" },
  { slug: "kimtigo", name: "kimtigo" },
  { slug: "kington", name: "kington" },
  { slug: "leoch", name: "leoch" },
  { slug: "xigmatek", name: "xigmatek" },
];

export default brands;
