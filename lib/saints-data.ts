export type SaintCategory =
  | "Nine Saints"
  | "Archangels"
  | "Martyrs"
  | "Monastic Saints"
  | "Hermits"
  | "Church Fathers"
  | "Hymnographers"
  | "Royal Saints"
  | "Church Builders"
  | "Holy Women"
  | "Repentance"
  | "Apostles"

export type Saint = {
  id: string
  nameEn: string
  nameAmharic: string
  title: string
  feastDayEthiopian: string
  feastDayGregorian: string
  century: string
  origin?: string
  categories: SaintCategory[]
  bio: string
  fullBio: string
  miracles?: string[]
  quote?: string
  monastery?: string
  patronOf?: string[]
  isNineSaint?: boolean
  isArchangel?: boolean
  scriptureReadings?: string[]
}

export const saints: Saint[] = [
  // ═══════════════════════════════════════════════════════════════
  // THE NINE SAINTS (ተስዓቱ ቅዱሳን)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "aregawi",
    nameEn: "Abba Aregawi",
    nameAmharic: "አባ አረጋዊ",
    title: "Head of the Nine Saints, Founder of Debre Damo",
    feastDayEthiopian: "Tikimt 14",
    feastDayGregorian: "October 24",
    century: "5th–6th Century",
    origin: "Syria",
    categories: ["Nine Saints", "Monastic Saints", "Church Fathers"],
    isNineSaint: true,
    bio: "Spiritual leader of the Nine Saints who came from Syria to spread Christianity in Ethiopia. He founded the historic monastery of Debre Damo on a sheer cliff summit, accessible only by rope.",
    fullBio: "Abba Aregawi, also known by his birth name Zemika'el, was the spiritual leader and elder statesman of the Nine Saints — the 5th–6th century missionaries who fled religious persecution in the Byzantine Empire after the Council of Chalcedon. These holy men crossed the Red Sea and fanned out across the northern Ethiopian highlands, laying the permanent monastic and theological foundation of the Ethiopian Orthodox Tewahedo Church.\n\nAregawi's most celebrated feat was the founding of the monastery of Debre Damo, perched on the flat summit of a sheer cliff in the Tigray region. The cliff face drops straight down with no natural path to ascend. Tradition holds that the Holy Spirit commanded a massive serpent to coil around Aregawi and lift him safely to the top, where he remained in prayer and built the first monastic church of Ethiopia. The monastery of Debre Damo still stands today and remains accessible only by a leather rope — visitors must pull themselves up the vertical face of the rock, just as Aregawi was first drawn heavenward.\n\nHis arrival transformed the spiritual landscape of northern Ethiopia. Together with his eight companions, Aregawi translated the Holy Scriptures into Ge'ez, established the rules of Ethiopian monasticism, and consolidated the Tewahedo faith against the theological drift of Chalcedonian Christianity. He is venerated as the father of Ethiopian monasticism and the shield of true Orthodox belief.",
    miracles: [
      "A great serpent was commanded by the Holy Spirit to lift him to the summit of Debre Damo cliff",
      "He remained in unbroken prayer for decades on the mountain",
      "Numerous healings and miracles of protection are attributed to his intercession"
    ],
    monastery: "Debre Damo Monastery, Tigray",
    scriptureReadings: ["Psalm 61:2 — 'Lead me to the rock that is higher than I'", "Hebrews 11:38 — 'Of whom the world was not worthy, they wandered in deserts and mountains'"]
  },
  {
    id: "garima",
    nameEn: "Abba Garima",
    nameAmharic: "አባ ጋሪማ",
    title: "Illuminator of the North, Keeper of the Gospels",
    feastDayEthiopian: "Sene 17",
    feastDayGregorian: "June 24",
    century: "5th–6th Century",
    origin: "Syria",
    categories: ["Nine Saints", "Monastic Saints", "Church Fathers"],
    isNineSaint: true,
    bio: "Famous for writing and illuminating the Garima Gospels — authenticated as the world's earliest surviving illustrated Christian manuscript. God miraculously halted the setting sun so he could complete his holy writing in a single day.",
    fullBio: "Abba Garima, born Yeshaq, was one of the Nine Saints who journeyed from the Byzantine world to evangelize the Ethiopian highlands. He settled in the Adwa region of Tigray and founded the monastery that bears his name — the Abba Garima Monastery — which still exists today as one of the oldest continuously functioning monasteries on earth.\n\nHis most extraordinary legacy is the Garima Gospels. This illuminated manuscript of the four Gospels, hand-copied and decorated by Garima himself, has been scientifically carbon-dated to between 330–650 AD, making it the world's oldest surviving illustrated Christian book — older than any manuscript preserved in Europe or the Middle East. The manuscript is kept in the monastery to this day, guarded by the monks of his community.\n\nThe miraculous tradition surrounding the Garima Gospels is renowned across the Ethiopian Church: as Garima sat writing and the sun began to descend toward the horizon, he prayed that God would give him enough light to finish. God answered by commanding the sun to stand still — halting time itself — so that the holy writing could be completed before darkness fell. This miracle echoes the story of Joshua and places Garima within the great lineage of the servants of the Living Word.",
    miracles: [
      "God miraculously halted the setting sun so he could finish illuminating the Garima Gospels in a single day",
      "The Garima Gospels themselves are considered a miraculous relic — the world's oldest illustrated Christian manuscript",
      "His monastery has never been conquered or destroyed despite wars and invasions over 1,500 years"
    ],
    monastery: "Abba Garima Monastery, Adwa, Tigray",
    scriptureReadings: ["John 1:1 — 'In the beginning was the Word, and the Word was with God'", "Psalm 119:105 — 'Your word is a lamp to my feet and a light to my path'"]
  },
  {
    id: "pantaleon",
    nameEn: "Abba Pantelewon",
    nameAmharic: "አባ ጰንጠሌዎን",
    title: "The Unmovable Pillar, Hermit of Aksum",
    feastDayEthiopian: "Tikimt 6",
    feastDayGregorian: "October 16",
    century: "5th–6th Century",
    origin: "Syria",
    categories: ["Nine Saints", "Monastic Saints", "Hermits"],
    isNineSaint: true,
    bio: "He built a small cell on the summit of the hill of Aksum and lived as a strict ascetic hermit for 45 years, never sitting down — standing in perpetual prayer and intercession.",
    fullBio: "Abba Pantelewon was one of the Nine Saints who chose the ancient holy city of Aksum as his field of labor. Rather than founding a large monastery, he embodied the purest form of ascetic withdrawal: he built a small cell on the summit of the hill overlooking the city and resolved never to sit down for the rest of his earthly life.\n\nFor 45 unbroken years, Pantelewon stood. He stood through the burning days of the Ethiopian highlands and through the cold nights. He never leaned against a wall and never bent his knees in rest. His entire life became a living sacrifice — a body offered as a permanent altar of prayer before the throne of God. The citizens of Aksum could see his figure standing on the hill at all hours, day and night, and they understood that a holy fire was burning in their midst.\n\nThis extraordinary form of asceticism — known in the Eastern tradition as standing prayer — represents the belief that the body itself must be brought into submission to the spirit. Pantelewon's stance was not merely physical discipline; it was a theology in action, proclaiming that sleep, comfort, and ease are the enemies of the unceasing prayer commanded by the Apostle Paul. He is venerated as one of the supreme exemplars of watchfulness and total self-offering in the Ethiopian Church.",
    miracles: [
      "Stood in perpetual prayer for 45 straight years without ever sitting",
      "Residents of Aksum witnessed his figure standing in prayer at all hours",
      "Numerous conversions occurred among those who witnessed his ascetic life"
    ],
    scriptureReadings: ["1 Thessalonians 5:17 — 'Pray without ceasing'", "Psalm 134 — 'Behold, bless the Lord, all you servants of the Lord'"]
  },
  {
    id: "aftse",
    nameEn: "Abba Aftse",
    nameAmharic: "አባ አፍጼ",
    title: "Consecrator of Yeha, Transformer of Temples",
    feastDayEthiopian: "Hamle 2",
    feastDayGregorian: "July 9",
    century: "5th–6th Century",
    origin: "Syria",
    categories: ["Nine Saints", "Monastic Saints", "Church Builders"],
    isNineSaint: true,
    bio: "Traveled to the ancient cultural center of Yeha, where he repurposed the pre-Christian Sabaean temple into a holy church dedicated to the True God.",
    fullBio: "Abba Aftse was among the Nine Saints who brought the Christian Gospel to the most ancient corners of the Ethiopian highlands. His ministry brought him to Yeha — one of the oldest inhabited sites in Africa and the former capital of the pre-Aksumite civilization. Yeha is home to the Great Temple of Yeha, an ancient Sabaean structure built over 2,700 years ago and dedicated to the moon deity Almaqah.\n\nRather than destroying this pre-Christian structure, Aftse consecrated it — transforming the ancient stone temple into a Christian church through prayer, fasting, and the planting of the cross. This act of spiritual reclamation reflects the patristic theology that creation itself belongs to God, and that what was once offered to false gods can be redeemed and returned to the True God through the power of the Holy Spirit.\n\nThe Church of Abba Aftse at Yeha is considered one of the oldest surviving Christian churches in Ethiopia, built within the walls of the ancient temple. It remains an active place of worship to this day. Aftse's ministry represents the transformation not just of souls but of places — consecrating the ancient land of Ethiopia as holy ground.",
    miracles: [
      "Successfully converted the ancient Sabaean temple of Yeha into a Christian church",
      "His consecration of pagan sites is credited with clearing demonic strongholds from the region",
      "The ancient church at Yeha continues to stand for over 1,500 years"
    ],
    monastery: "Church of Abba Aftse, Yeha",
    scriptureReadings: ["Isaiah 56:7 — 'My house shall be called a house of prayer for all nations'", "1 Corinthians 3:16 — 'Do you not know that you are the temple of God?'"]
  },
  {
    id: "alef",
    nameEn: "Abba Alef",
    nameAmharic: "አባ አለፍ",
    title: "Apostle of the North, Ascetic of Absolute Poverty",
    feastDayEthiopian: "Magabit 11",
    feastDayGregorian: "March 20",
    century: "5th–6th Century",
    origin: "Syria",
    categories: ["Nine Saints", "Monastic Saints", "Hermits"],
    isNineSaint: true,
    bio: "Spread the Gospel northward along the Mareb River, establishing the remote monastery of Bi'isa and serving as an exemplar of absolute poverty and detachment.",
    fullBio: "Abba Alef carried the Gospel northward along the Mareb River into the rugged borderlands of northern Ethiopia, evangelizing regions that had not yet been touched by the Christian witness. His approach to mission was rooted in radical simplicity: he owned nothing, carried nothing, and expected nothing from the world. His witness was the poverty of the desert fathers transplanted to African soil.\n\nIn a region defined by tribal loyalties and material wealth, Alef preached detachment from all earthly possessions as the path to encounter the living God. He established the remote monastery of Bi'isa, hidden in the mountains north of the Mareb River — a place deliberately chosen for its isolation from the noise and commerce of human civilization.\n\nAlef's legacy is one of quiet perseverance. He did not perform the spectacular miracles of fire and serpents associated with some of his companions, but his fidelity to absolute poverty and prayer for decades planted seeds of faith that took root across entire regions. His life is a testimony that holiness does not always announce itself in drama — sometimes it speaks most clearly in silence, simplicity, and total surrender.",
    miracles: [
      "Converted numerous pagan communities along the Mareb River through preaching and prayer",
      "His life of absolute poverty was itself considered a perpetual miracle witnessed by all who knew him"
    ],
    monastery: "Monastery of Bi'isa, Northern Ethiopia",
    scriptureReadings: ["Matthew 19:21 — 'If you want to be perfect, go, sell what you have and give to the poor'", "Luke 9:58 — 'The Son of Man has nowhere to lay His head'"]
  },
  {
    id: "guba",
    nameEn: "Abba Guba",
    nameAmharic: "አባ ጉባ",
    title: "Warrior of the Wilderness, Conqueror of Dark Forces",
    feastDayEthiopian: "Sene 29",
    feastDayGregorian: "July 6",
    century: "5th–6th Century",
    origin: "Syria",
    categories: ["Nine Saints", "Monastic Saints", "Hermits"],
    isNineSaint: true,
    bio: "Chose a highly isolated, rugged mountain wilderness to live a hidden life of intensive fasting and spiritual warfare against the dark forces.",
    fullBio: "Abba Guba sought the most desolate place he could find. Among the Nine Saints who each chose different regions of Ethiopia, Guba went furthest from human civilization — retreating into an isolated and rugged mountain wilderness to wage unrelenting spiritual warfare against demonic forces through fasting and prayer.\n\nGuba understood that the spiritual condition of a land is shaped not only by preaching but by the hidden warfare of intercessors. He fasted with an intensity that few could withstand, going without food for periods that astonished his contemporaries. His hidden life of prayer was understood by the Church as an invisible shield raised over the Ethiopian highlands — the spiritual warfare waged in secret that protects nations from darkness without anyone knowing.\n\nThe desert fathers of Egypt taught that a community of monks praying in the desert is more important to a city's safety than its army. Guba embodied this truth in Ethiopia. He is venerated as a patron of those who fast, those who battle addictions and temptations, and all who fight unseen spiritual battles in the name of Christ.",
    miracles: [
      "Conducted spiritual warfare through fasting that cleared demonic strongholds from entire regions",
      "Survived in the wilderness for years under conditions that would be fatal for an ordinary person"
    ],
    scriptureReadings: ["Ephesians 6:12 — 'We wrestle not against flesh and blood, but against principalities and powers'", "Matthew 4:4 — 'Man shall not live by bread alone'"]
  },
  {
    id: "liqanos",
    nameEn: "Abba Liqanos",
    nameAmharic: "አባ ሊቃኖስ",
    title: "Theological Giant of the Nine Saints",
    feastDayEthiopian: "Sanay 28",
    feastDayGregorian: "July 5",
    century: "5th–6th Century",
    origin: "Syria",
    categories: ["Nine Saints", "Monastic Saints", "Church Fathers"],
    isNineSaint: true,
    bio: "Known as the theological giant among the Nine Saints, he spent his years at Debre Kuanat writing profound metric homilies and liturgical outlines.",
    fullBio: "Among the Nine Saints, Abba Liqanos was distinguished not primarily by miraculous feats but by the depth of his theological mind. Settling at the monastery of Debre Kuanat, he dedicated his decades of monastic life to writing — producing metric homilies, liturgical outlines, and theological treatises that became foundational texts for the Ethiopian church.\n\nLiqanos understood that the true enemies of the faith were not only paganism and heresy but theological ignorance among the faithful. He believed that every believer deserved to understand the depths of the Tewahedo tradition — the theology of the one nature of Christ, the mystery of the Holy Trinity, the significance of the sacraments — not merely as religious obligation but as the very source of spiritual life.\n\nHis written works, though not all of them have survived to the present day, formed part of the intellectual foundation upon which subsequent Ethiopian theologians built. He is honored as the scholar-saint: a reminder that the life of the mind, when surrendered to God, becomes itself an act of worship. His feast is celebrated on the day after the feast of his close companion Abba Guba, and together they represent the twin calling of the monk: physical warfare through fasting and spiritual enrichment through study.",
    monastery: "Debre Kuanat Monastery",
    scriptureReadings: ["2 Timothy 4:7 — 'I have fought the good fight, I have finished the race, I have kept the faith'", "Colossians 3:16 — 'Let the word of Christ dwell in you richly'"]
  },
  {
    id: "sehma",
    nameEn: "Abba Sehma (Tsahma)",
    nameAmharic: "አባ ፀሕማ",
    title: "Preacher of Repentance, Baptizer of Nations",
    feastDayEthiopian: "Ter 16",
    feastDayGregorian: "January 24",
    century: "5th–6th Century",
    origin: "Syria",
    categories: ["Nine Saints", "Monastic Saints"],
    isNineSaint: true,
    bio: "Established the monastery of Enda Tsahma in the historical region of Agame, focused on preaching repentance and baptizing pagan populations.",
    fullBio: "Abba Sehma, also known as Tsahma, brought the message of repentance to the historical region of Agame in northern Ethiopia. Unlike some of his companions who focused on writing or severe asceticism, Sehma was primarily a preacher — going directly to the people, calling them to turn from paganism and receive the waters of baptism.\n\nHe established the monastery of Enda Tsahma, which became not only a center of monastic life but a hub of evangelism. People traveled from surrounding villages and districts to hear Sehma preach. His message was urgent and uncompromising: repent, for the Kingdom of God is at hand. His preaching style drew on the prophetic tradition — the direct, fire-touched proclamation of the desert fathers who burned with love for the souls they served.\n\nThousands were baptized through his ministry, and the region of Agame became one of the most deeply Christianized areas of northern Ethiopia. His model of combining monastic withdrawal with active evangelism — living apart from the world while simultaneously going to the world — became a defining characteristic of Ethiopian Orthodox missionary practice.",
    miracles: [
      "Thousands of pagan conversions across the region of Agame",
      "Miraculous healings associated with his baptisms",
      "Demonic expulsions reported during his preaching campaigns"
    ],
    monastery: "Enda Tsahma Monastery, Agame",
    scriptureReadings: ["Mark 1:15 — 'The kingdom of God is at hand. Repent, and believe in the gospel'", "Acts 2:38 — 'Repent and be baptized, every one of you'"]
  },
  {
    id: "yemata",
    nameEn: "Abba Yem'ata",
    nameAmharic: "አባ የምዓታ",
    title: "Builder of the Sky Church, Hermit of the Rock Pinnacle",
    feastDayEthiopian: "Tikimt 28",
    feastDayGregorian: "November 7",
    century: "5th–6th Century",
    origin: "Syria",
    categories: ["Nine Saints", "Monastic Saints", "Church Builders", "Hermits"],
    isNineSaint: true,
    bio: "Founded the breathtaking monolithic church Abuna Yemata Guh, carved into a vertical rock pinnacle 200 meters high. Accessing it requires climbing barefoot without ropes — a pilgrimage into heaven itself.",
    fullBio: "Of all the Nine Saints, Abba Yem'ata chose the most dramatic dwelling place. In the Gheralta mountain range of the Tigray region, he climbed to a natural cave carved by God himself into a vertical pinnacle of rock, standing nearly 200 meters above the earth. There, in this inaccessible eyrie, he carved a church with his own hands and lived his entire monastic life above the clouds.\n\nThe church of Abuna Yemata Guh is considered one of the most spectacular sacred sites on earth. To reach it today requires crossing a narrow ledge of rock barely half a meter wide with a sheer drop on both sides, then ascending a near-vertical face of rock using handholds cut into the stone — all of it done barefoot, as the entire ascent is considered holy ground. There are no ropes and no safety equipment. The experience is designed to mirror the journey of the soul toward God: it requires total commitment, complete trust, and the willingness to let go of all ordinary security.\n\nInside the church, original ancient paintings of the saints and biblical scenes survive on the walls and ceiling — among the oldest church paintings in the world. Yem'ata is honored as the saint who understood that to meet God, one must literally leave the ground.",
    miracles: [
      "Carved a complete church by hand in a vertical rock pinnacle 200 meters above the earth",
      "The original frescoes inside the church have survived 1,500 years of exposure with remarkable preservation",
      "Many pilgrims report spiritual transformation during the dangerous barefoot ascent"
    ],
    monastery: "Abuna Yemata Guh Church, Gheralta Mountains, Tigray",
    scriptureReadings: ["Colossians 3:2 — 'Set your mind on things above, not on things on the earth'", "Psalm 121:1 — 'I will lift up my eyes to the hills — from whence comes my help?'"]
  },

  // ═══════════════════════════════════════════════════════════════
  // THE HOLY ARCHANGELS (ቅዱሳን መላእክት)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "michael",
    nameEn: "St. Michael the Archangel",
    nameAmharic: "ቅዱስ ሚካኤል",
    title: "Chief of the Heavenly Hosts, Protector of the Church",
    feastDayEthiopian: "Hedar 12 & Sene 12",
    feastDayGregorian: "November 21 & June 19 (also 12th of every Ethiopian month)",
    century: "Before Creation",
    categories: ["Archangels"],
    isArchangel: true,
    bio: "Chief Commander of the heavenly armies who cast out Lucifer from heaven. He is the premier intercessor for humanity, delivering prayers to God and rescuing souls from peril. His name means 'Who is like God?'",
    fullBio: "Saint Michael is recognized as the Archistrategos — the Chief Commander of the heavenly hosts. The very name Michael (Mi-Ka-El in Hebrew: 'Who is like God?') defines his ultimate identity: the one who, when Lucifer boasted of his own power, stood before the throne and declared the supreme difference between Creator and creature.\n\nWhen Satan rebelled and drew a third of the angels into pride and defiance, it was Michael who rallied the faithful hosts and cast the rebellious powers out of heaven. He declared, 'Let us stand well, let us stand with fear before God!' — and the loyal angels followed him. Because of his humility in the face of cosmic pride, God appointed Michael as the supreme leader of all the celestial orders in place of the fallen Sataniel.\n\nIn EOTC theology, Michael is the angel of supreme mercy. He stands perpetually before the Tabernacle of the Most High, catching the prayers of the repentant and offering them as incense before God. He is assigned as the guardian of the Old Testament people of Israel and, by extension, the protector of the New Covenant Church.\n\nIn Ethiopia, Michael holds a place of extraordinary devotion. The 12th of every Ethiopian month is his feast — twelve celebrations per year, each marked with all-night vigils and the crowds filling every church dedicated to him. He is invoked above all other saints in moments of spiritual danger, crisis, and temptation.\n\nIconographically, Michael is shown in imperial robes holding scales of justice in one hand and a drawn sword in the other, trampling the defeated figure of Satan beneath his feet. He is the saint of divine justice, of spiritual warfare, and of God's mercy toward sinners who call on his name.",
    miracles: [
      "Cast Satan and the rebellious angels out of heaven in the primordial war",
      "Protected the three holy youth — Hananiah, Azariah, and Mishael — from Nebuchadnezzar's fiery furnace",
      "Guided and protected the people of Israel in the wilderness for forty years",
      "Protected island monasteries on Lake Tana from destruction",
      "Credited with appearing on a white horse to aid Ethiopian forces at the Battle of Adwa",
      "Contended with the devil over the body of Moses after his death (Jude 1:9)"
    ],
    patronOf: ["Ethiopia", "Soldiers", "The Sick", "All who face spiritual danger"],
    scriptureReadings: ["Revelation 12:7–11 — 'Michael and his angels fought with the dragon'", "Daniel 10:13 — 'Michael, one of the chief princes, came to help me'", "Jude 1:9 — 'Michael the archangel contended with the devil'"]
  },
  {
    id: "gabriel",
    nameEn: "St. Gabriel the Archangel",
    nameAmharic: "ቅዱስ ገብርኤል",
    title: "Messenger of Peace, Herald of the Incarnation",
    feastDayEthiopian: "Tahsas 19 & Hamle 19",
    feastDayGregorian: "December 28 & July 26 (also 19th of every Ethiopian month)",
    century: "Before Creation",
    categories: ["Archangels"],
    isArchangel: true,
    bio: "The archangel of Incarnation, Revelation, and Divine Joy. He delivered the Annunciation to the Holy Virgin Mary and is celebrated as the bringer of glad tidings — the angel who opens closed wombs and delivers the faithful from impossible situations.",
    fullBio: "Saint Gabriel is the Archangel of Incarnation, Revelation, and Divine Joy. His entire biblical ministry is defined by one theme: God radically entering time and space to save His people — and Gabriel is always the first to announce it.\n\nHis name (Gebr-El in Hebrew/Ge'ez: 'Servant of God' or, more profoundly, 'God and Man') points to the great mystery he was chosen to announce: that God would become Man. He first appeared in the pages of Scripture to the Prophet Daniel, explaining the complex visions of kingdoms and end times (Daniel 8:16, 9:21). Then he appeared to the elderly priest Zechariah in the Temple to announce the miraculous birth of John the Baptist (Luke 1:11–20). And finally, in the moment that divides all history, he came to the young Virgin Mary in Nazareth and spoke the words that changed the universe: 'Hail, full of grace, the Lord is with you... You will conceive and bring forth a Son, and shall call His name Jesus' (Luke 1:26–38).\n\nIn the Ethiopian tradition, Gabriel represents unshakeable peace and divine reassurance. While Michael carries the sword of protection, Gabriel carries the lily of peace and the herald's staff. His Hamle 19 feast day — celebrated with enormous pilgrimage gatherings, especially at Kulubi Gabriel church near Dire Dawa — commemorates his miraculous intervention to save the child-martyr Kirkos and his mother Iyeluta from a boiling cauldron of pitch, rendering it miraculously cold.\n\nGabriel is also called Megabe Hadis — Administrator of the New Testament — because it was he who was chosen to announce both the Nativity and the Ascension of our Lord. He stands as the supreme messenger: the voice of God spoken into the silence of human history at its most pivotal moments.",
    miracles: [
      "Delivered the Annunciation to the Holy Virgin Mary",
      "Announced the birth of John the Baptist to the elderly priest Zechariah",
      "Descended into the boiling cauldron of pitch to save the child-martyr Kirkos and his mother Iyeluta",
      "Revealed the mysteries of the end times to the Prophet Daniel",
      "Announced the Ascension of Christ to the heavenly hosts"
    ],
    patronOf: ["Messengers", "Those who seek God's word", "Pregnant women"],
    scriptureReadings: ["Luke 1:26–38 — The Annunciation to the Virgin Mary", "Luke 1:19 — 'I am Gabriel, who stands in the presence of God'", "Daniel 9:21 — 'The man Gabriel, whom I had seen in the vision at the beginning, being caused to fly swiftly'"]
  },
  {
    id: "raphael",
    nameEn: "St. Raphael the Archangel",
    nameAmharic: "ቅዱስ ሩፋኤል",
    title: "God's Healer, Guardian of Travelers and the Unborn",
    feastDayEthiopian: "Paguemen 3",
    feastDayGregorian: "Early September",
    century: "Before Creation",
    categories: ["Archangels"],
    isArchangel: true,
    bio: "The Archangel of healing, travel, and the protection of the unborn. He guards every fetus from the 40th day in the womb, restores sight to the blind, and blesses the waters of healing.",
    fullBio: "Saint Raphael's name means 'God is a healer' (Repha-El in Hebrew), and his entire ministry is a reflection of God's will to restore what has been broken: broken bodies, broken sight, broken families, and the most vulnerable of all — the unborn child.\n\nIn the Book of Tobit, Raphael himself reveals his identity as one of the seven archangels who stand before God and present the prayers of the saints (Tobit 12:15). He accompanied the young Tobias on a dangerous journey, disguised as a fellow traveler, and guided him to heal his father's blindness using fish gall — a remedy Raphael himself prescribed.\n\nThe Book of Enoch identifies Raphael as the angel 'appointed over all diseases and over all the wounds of the children of men.' In the Gospel of John, he is the angel who descended once a week to stir the pool of Bethesda, making its waters medicinal for those sick enough to reach the pool first (John 5:4).\n\nEthiopian Orthodox tradition gives Raphael a unique and tender role: from the 40th day after a child is conceived, Raphael stands guard over the fetus so that no harm comes to it — so that the mother's movements, her food, and the compressions of the womb do not injure the fragile new life within her. When a woman enters labor, it is Raphael who eases her pain and opens the womb for safe delivery. He is called Fetahe Mahtsen — Opener of the Womb. Every child born into this world has already, from the earliest days of its existence, been held in the arms of this holy archangel.",
    miracles: [
      "Healed the blindness of the elder Tobit by prescribing fish gall, applied by his son Tobias",
      "Descended weekly to bless the pool of Bethesda, granting healing to the sick",
      "Guards every unborn child in the womb from the 40th day of conception",
      "Eases the pain of labor and opens the womb for safe delivery",
      "Accompanied Tobias on his journey as a disguised guide, protecting him from all danger"
    ],
    patronOf: ["The sick", "Travelers", "Pregnant women", "The unborn", "Physicians"],
    scriptureReadings: ["Tobit 12:15 — 'I am Raphael, one of the seven holy angels which present the prayers of the saints'", "John 5:4 — 'An angel went down at a certain time into the pool and stirred up the water'"]
  },
  {
    id: "uriel",
    nameEn: "St. Uriel the Archangel",
    nameAmharic: "ቅዱስ ዑራኤል",
    title: "Angel of Divine Light and Wisdom",
    feastDayEthiopian: "Hamle 22",
    feastDayGregorian: "July 29",
    century: "Before Creation",
    categories: ["Archangels"],
    isArchangel: true,
    bio: "The Archangel of divine light and wisdom. EOTC tradition honors him for wiping away tears and bringing divine light to illuminate the minds of God's servants.",
    fullBio: "Saint Uriel's name means 'God is my light' (Uri-El in Hebrew), and he is the Archangel associated with divine illumination — the light that penetrates darkness not of the physical world but of the mind and soul.\n\nIn the Book of 2 Esdras (a text held in the Ethiopian biblical canon), Uriel appears to the prophet Ezra to explain divine mysteries that surpass human comprehension. When Ezra challenges God about the suffering of the righteous, Uriel responds with profound questions that reframe Ezra's entire understanding — teaching him that divine wisdom cannot be measured by human logic (2 Esdras 4:1).\n\nIn Ethiopian Orthodox tradition, Uriel is invoked as the angel who wipes away tears from the faces of the suffering and the mourning. He brings the cool light of divine consolation into places of grief and confusion. He is also the angel of truth and divine revelation — the one who illuminates the Scriptures so that the faithful can understand their deeper meaning.\n\nHis feast on Hamle 22 (July 29) coincides with the feast of Abune Petros, the 20th-century Ethiopian martyr, connecting the light of the eternal archangel with the witness of the modern martyr. Uriel is especially invoked by those seeking wisdom for difficult decisions, students of theology, and all who feel lost in spiritual darkness.",
    miracles: [
      "Revealed divine mysteries to the Prophet Ezra that no human teacher could explain",
      "Wiped tears from the faces of mourners in visions recorded by the saints",
      "Illuminated the understanding of holy men when reading the Scriptures"
    ],
    scriptureReadings: ["2 Esdras 4:1 — 'Then the angel that was sent unto me, whose name was Uriel, gave me an answer'", "Psalm 43:3 — 'Oh, send out Your light and Your truth! Let them lead me'"]
  },
  {
    id: "phanuel",
    nameEn: "St. Phanuel the Archangel",
    nameAmharic: "ቅዱስ ፋኑኤል",
    title: "Angel of Repentance and Expulsion of Evil",
    feastDayEthiopian: "Tahsas 3",
    feastDayGregorian: "December 12",
    century: "Before Creation",
    categories: ["Archangels", "Repentance"],
    isArchangel: true,
    bio: "The Archangel of repentance and the expulsion of evil spirits. He guides souls away from dark paths and stands as a defender against demonic temptation.",
    fullBio: "Saint Phanuel is the Archangel of hope and the patron of repentance. His name (Penu-El: 'Face of God') evokes the moment in Genesis when Jacob wrestled with God and saw the divine face — emerging transformed. This transformation through encounter with God is the essence of Phanuel's ministry.\n\nIn the Book of Enoch (a canonical text of the Ethiopian Church), Phanuel is identified as one of the four chief angels who stand before the throne of God. He is specifically assigned to minister to those who are spiritually lost, turning them back from paths of destruction before it is too late. He works especially among those caught in the grip of sin and despair — those who believe they have wandered too far to return.\n\nPhanuel is also associated with the expulsion of evil spirits and demonic temptation. He stands guard at the boundary between the soul's free will and the demonic forces that seek to corrupt it. While Michael wages war against demons in the external realm, Phanuel works in the interior life — clearing the soul of the spiritual oppression that makes repentance feel impossible.\n\nHis feast in the Ethiopian calendar falls in Tahsas (December), the month that also contains Christmas — linking the angel of repentance with the message of the Nativity: that God comes to us not because we have made ourselves worthy, but because He loves us in our darkness.",
    miracles: [
      "Guides souls back from paths of destruction through inner conviction",
      "Expels evil spirits and delivers those oppressed by demonic forces",
      "Intercedes for those who believe themselves beyond forgiveness"
    ],
    scriptureReadings: ["Matthew 4:10–11 — 'Then the devil left Him, and behold, angels came and ministered to Him'", "Psalm 51 — 'Create in me a clean heart, O God'"]
  },
  {
    id: "raguel",
    nameEn: "St. Raguel the Archangel",
    nameAmharic: "ቅዱስ ራጉኤል",
    title: "Angel of Justice, Order, and Harmony",
    feastDayEthiopian: "Meskerem 1",
    feastDayGregorian: "September 11 (Ethiopian New Year)",
    century: "Before Creation",
    categories: ["Archangels"],
    isArchangel: true,
    bio: "The Archangel of justice, order, and harmony. He watches over the celestial lights and ensures the execution of God's perfect laws. His feast falls on the Ethiopian New Year.",
    fullBio: "Saint Raguel is the Archangel of divine order — the heavenly minister who ensures that God's creation operates according to its intended harmony. His name (Ra'uel: 'Friend of God') reflects a relationship of deep trust: God entrusts to Raguel the oversight of the laws of the cosmos.\n\nIn the Book of Enoch, Raguel is identified as the angel who takes vengeance on the world of the luminaries — meaning he is the guardian of the sun, moon, and stars, ensuring they follow their ordained paths and do not deviate from God's design. In a broader theological sense, he is the angel who maintains justice — ensuring that the divine order of creation is upheld even when human beings seek to overturn it.\n\nThe placement of Raguel's feast on Meskerem 1 — the Ethiopian New Year — is profoundly symbolic. At the dawn of each new year, the Church invokes the angel of divine order to sanctify the days ahead and bring God's perfect will into the new season. His intercession is sought for the ordering of personal life, the restoration of broken relationships, and the establishment of justice where injustice has prevailed.\n\nRaguel stands as a reminder that God is not a God of chaos but of order, beauty, and perfect harmony — and that these qualities are maintained in creation by celestial ministers working without rest.",
    miracles: [
      "Maintains the orderly movement of the sun, moon, and stars in their courses",
      "Brings divine justice into situations of injustice and oppression",
      "Intercedes for the restoration of harmony in broken communities"
    ],
    scriptureReadings: ["Revelation 4:5 — 'From the throne proceeded lightnings, thunderings, and voices. Seven lamps of fire were burning before the throne'", "Psalm 119:137 — 'Righteous are You, O Lord, and upright are Your judgments'"]
  },
  {
    id: "saquael",
    nameEn: "St. Saquael the Archangel",
    nameAmharic: "ቅዱስ ሳቁኤል",
    title: "Angel of Comfort, Peace, and Mercy",
    feastDayEthiopian: "Hidar 20",
    feastDayGregorian: "November 29",
    century: "Before Creation",
    categories: ["Archangels"],
    isArchangel: true,
    bio: "The Archangel of divine comfort, peace, and mercy who brings the souls of the humble before the Almighty and intercedes for the afflicted.",
    fullBio: "Saint Saquael is the Archangel of peace — the celestial minister who carries the consolation of God to souls shattered by grief, loneliness, and despair. In a world that often does not hear the cries of the broken, Saquael is the assurance that no tear falls unnoticed before God.\n\nIn Ethiopian Orthodox tradition, Saquael is particularly associated with the ministry of comfort and with presenting the humble before the face of God. He is the angel who ensures that the prayers of the poor in spirit — those with no earthly power or position — reach the throne of heaven without being lost. He brings the divine peace that transcends human understanding into the hearts of the afflicted.\n\nHis feast in Hidar (November) falls during the pre-Advent period, a time of increased fasting and preparation in the Ethiopian Church. This placement is significant: in the days of waiting and longing for God's coming, Saquael ministers to those who feel the ache of absence, bringing divine comfort to sustain them through the fast.\n\nSaquael is invoked by the grieving, the lonely, those struggling with depression, and those who feel that God has withdrawn His presence. His ministry is the reminder that God never truly withdraws — He sends His angel of comfort to fill the silence.",
    miracles: [
      "Brings divine peace into hearts shattered by grief and loneliness",
      "Presents the prayers of the humble before the throne of God",
      "Intercedes for the afflicted and the forgotten"
    ],
    scriptureReadings: ["Matthew 5:4 — 'Blessed are those who mourn, for they shall be comforted'", "Isaiah 61:3 — 'To give them beauty for ashes, the oil of joy for mourning'"]
  },

  // ═══════════════════════════════════════════════════════════════
  // MIGHTY WARRIORS & GREAT MARTYRS (ሰማዕታት)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "george",
    nameEn: "St. George of Lydda",
    nameAmharic: "ቅዱስ ጊዮርጊስ",
    title: "Prince of Martyrs, Patron Saint of Ethiopia",
    feastDayEthiopian: "Miyazia 23",
    feastDayGregorian: "May 1 (also 23rd of every Ethiopian month)",
    century: "3rd–4th Century",
    origin: "Lydda, Palestine",
    categories: ["Martyrs"],
    patronOf: ["Ethiopia", "Soldiers", "Those facing unjust authority"],
    bio: "The 'Prince of Martyrs' and Patron Saint of Ethiopia. A high-ranking Roman military officer who openly renounced Emperor Diocletian's pagan decrees, endured seven years of unimaginable torture, and was raised back to life by Christ three times before his final martyrdom.",
    fullBio: "Saint George is, without question, the most beloved and most widely venerated saint in Ethiopia. He is the Kewakibe Semaitat — the Star of Martyrs — and his feast on the 23rd of every Ethiopian month means that twelve times a year, the entire country pauses to honor his memory.\n\nGeorge was a high-ranking noble military tribune in the Roman imperial guard under Emperor Diocletian during the late 3rd century. When the emperor issued brutal decrees demanding that all Roman soldiers sacrifice to pagan idols and assist in the persecution of Christians, George openly renounced his commission. He tore down the imperial edicts in a public square, distributed all his wealth to the poor, and stood before the imperial court to declare: 'I am a servant of Jesus Christ, and I will not bow to stone and gold.'\n\nWhat followed was seven years of unimaginable torture. Diocletian utilized the most sophisticated instruments of cruelty at his disposal. George was bound to a wheel of razor-sharp blades, cast into a pit of boiling lime, forced to walk in red-hot iron sandals with nails driven through his feet, and made to drink deadly poison. Each time, Christ appeared to George in his prison cell, healing him completely and raising him back to life — three separate times — enabling him to continue his witness and to convert his very executioners, including the Empress Alexandra herself.\n\nIn Ethiopian history, George is not merely a saint of the past. He is credited with appearing on a white horse in the skies above the battlefield during the Battle of Adwa (1896), leading the Ethiopian forces to their historic victory over the Italian colonial army — the only African nation to defeat a European colonial power in the age of imperialism.\n\nHis classic icon shows him as a youthful royal knight on a white horse, piercing a writhing dragon with a cross-tipped lance — representing Christ destroying the power of the devil and rescuing the Church.",
    miracles: [
      "Raised back to life by Christ three separate times after fatal tortures",
      "Converted the Empress Alexandra through the witness of his suffering",
      "Slew a dragon that was terrorizing the city of Lydda and demanding human sacrifice",
      "Appeared on a white horse above the Battle of Adwa (1896), credited with Ethiopia's historic victory",
      "Countless healings attributed to his intercession across Ethiopia"
    ],
    scriptureReadings: ["2 Timothy 2:3 — 'You therefore must endure hardship as a good soldier of Jesus Christ'", "Ephesians 6:11–18 — The Armor of God", "Revelation 2:10 — 'Be faithful until death, and I will give you the crown of life'"]
  },
  {
    id: "merkorios",
    nameEn: "St. Merkorios",
    nameAmharic: "ቅዱስ መርቆሬዎስ",
    title: "Abu-Seifen, The Two-Sworded Martyr",
    feastDayEthiopian: "Hedar 25 & Sene 25",
    feastDayGregorian: "December 4 & July 2",
    century: "3rd Century",
    origin: "Scythia (modern-day region of Armenia/Black Sea)",
    categories: ["Martyrs"],
    bio: "Known as Abu-Seifen — the Two-Sworded Saint. An angel handed him a heavenly sword alongside his earthly weapon to secure military victory. He later chose torture and death over bowing to Roman idols, and his spirit was sent centuries later to strike down the apostate Emperor Julian.",
    fullBio: "Saint Merkorios, known throughout East Africa and Egypt as Abu-Seifen (meaning 'Father of the Two Swords'), was an exceptionally skilled warrior born in Scythia who served as a prominent general under the Roman Emperor Decius in the 3rd century.\n\nDuring a catastrophic military campaign against barbarian hordes, his legions were facing complete encirclement and annihilation. On the eve of the final battle, a radiant angel of the Lord appeared to Merkorios, holding a brilliant heavenly sword of fire, and said: 'Merkorios, servant of Jesus Christ, fear not. Take this sword from my hand and face the enemy. When you conquer, do not forget the Lord your God.' Merkorios took the blade, charged single-handedly into the enemy frontlines, and routed the barbarian army through what could only have been divine power.\n\nFollowing the victory, Emperor Decius organized a massive pagan sacrifice and celebration. Merkorios refused to attend. When confronted by the emperor, he threw down his military belt and golden crown at his feet, declaring: 'I am a servant of Christ, and I will not worship gold and stone.' He was subjected to brutal flaying, fire, and torture — yet refused to recant — and was ultimately beheaded in Cappadocia.\n\nCenturies later, when the Roman Emperor Julian the Apostate attempted to systematically dismantle Christianity and restore paganism, the Holy Virgin Mary commanded the spirit of St. Merkorios to temporarily return to the earthly realm. Icons in a hidden church miraculously blurred, and his spirit appeared on the battlefield in Persia, piercing Julian with his spear — preserving the Orthodox Church from the most serious internal threat since the Arian heresy.\n\nHe is depicted in full Roman military armor on a dark red warhorse, dramatically holding two crossed swords — one earthly and one heavenly — above his head.",
    miracles: [
      "An angel appeared in battle and handed him a heavenly sword of fire for victory",
      "His spirit was sent by the Holy Virgin to strike down Emperor Julian the Apostate centuries after his death",
      "Survived multiple tortures through divine protection before his martyrdom",
      "Miraculous healings continue to be attributed to his intercession across Ethiopia and Egypt"
    ],
    scriptureReadings: ["Hebrews 11:32–34 — 'Who through faith subdued kingdoms, worked righteousness, obtained promises'", "Psalm 18:32–39 — 'God arms me with strength and makes my way perfect'"]
  },
  {
    id: "kirkos-iyeluta",
    nameEn: "St. Kirkos & St. Iyeluta",
    nameAmharic: "ቅዱስ ቂርቆስና ኢያሉጣ",
    title: "Child Martyr and Faithful Mother",
    feastDayEthiopian: "Hamle 15",
    feastDayGregorian: "July 22",
    century: "3rd–4th Century",
    categories: ["Martyrs"],
    bio: "The ultimate symbols of child martyrdom. St. Kirkos was only three years old when he and his faithful mother Iyeluta were thrown into a boiling cauldron of pitch, where they were miraculously protected by Archangel Gabriel before giving up their spirits.",
    fullBio: "The story of Saint Kirkos and his mother Saint Iyeluta is the most poignant account of child martyrdom in the Ethiopian Orthodox tradition. Kirkos was three years old — an age when most children are learning to speak and play — when he was brought before a pagan Roman magistrate alongside his mother.\n\nIyeluta was a devout Christian widow. When summoned and commanded to renounce Christ, she refused. The magistrate tried a different tactic — threatening her three-year-old son. But the child, filled with a supernatural boldness that astonished all who witnessed it, reportedly cried out the name of Christ and refused to bow to the idol. The magistrate ordered both mother and child thrown into a cauldron of boiling pitch.\n\nThe Archangel Gabriel descended into the cauldron and rendered the boiling pitch miraculously cold. Kirkos is reported to have preached to the magistrate from inside the vessel — a three-year-old child proclaiming the Gospel from within what should have been his tomb. They were eventually martyred by other means.\n\nThe feast of Kirkos and Iyeluta (Hamle 15, July 22) is celebrated with particular tenderness in the Ethiopian Church. Their story speaks to the ultimate truth that faith is not measured by age, learning, or physical strength — but by the love of God burning within the heart. Kirkos is the patron of children and of all who face persecution too young to understand why.",
    miracles: [
      "Archangel Gabriel descended into the boiling cauldron and rendered it miraculously cold",
      "A three-year-old child preached the Gospel from inside the cauldron of pitch",
      "Their martyrdom converted numerous witnesses on the spot",
      "Countless children have been healed through their intercession"
    ],
    patronOf: ["Children", "Mothers facing persecution", "The young and vulnerable"],
    scriptureReadings: ["Matthew 18:3 — 'Unless you are converted and become as little children, you will by no means enter the kingdom of heaven'", "Psalm 8:2 — 'Out of the mouth of babes and nursing infants You have ordained strength'"]
  },
  {
    id: "stephen",
    nameEn: "St. Stephen",
    nameAmharic: "ቅዱስ እስጢፋኖስ",
    title: "The Protomartyr, First of the Deacons",
    feastDayEthiopian: "Ter 1",
    feastDayGregorian: "January 9",
    century: "1st Century",
    origin: "Jerusalem",
    categories: ["Martyrs", "Church Fathers"],
    bio: "The Proto-martyr (first martyr of the Christian Church) and Archdeacon of Jerusalem. Stoned to death by the Sanhedrin while praying for his executioners — his last words echoing those of Christ on the cross.",
    fullBio: "Saint Stephen holds a unique place in the history of the Church: he is the Protomartyr — the very first human being to die for faith in Jesus Christ after the Resurrection and Ascension of the Lord. His martyrdom is recorded in the Acts of the Apostles (Acts 7) and stands as the foundational moment of Christian witness: the seal of the faith in blood.\n\nStephen was one of the seven deacons appointed by the Apostles to serve the early Jerusalem community in practical ministry — distributing food to widows and caring for the poor. But he was also a man 'full of faith and the Holy Spirit' (Acts 6:5), a preacher of extraordinary power. He performed miracles among the people and debated so effectively with the synagogue leaders that they could not match his wisdom.\n\nBrought before the Sanhedrin on charges of blasphemy, Stephen delivered one of the most comprehensive theological addresses in the New Testament — a sweeping survey of the entire history of Israel, showing how every generation had rejected God's messengers. When he concluded by saying 'You stiff-necked people... you always resist the Holy Spirit,' the council was enraged. As they dragged him outside the city to stone him, Stephen looked up and saw the heavens open and the Son of Man standing at the right hand of God — a vision granted to him alone.\n\nAs the stones fell, Stephen prayed: 'Lord Jesus, receive my spirit.' Then, kneeling: 'Lord, do not hold this sin against them.' These last words — forgiving his murderers — made him not only the first martyr but the first imitator of Christ's death. Among those who watched with approval stood a young man named Saul of Tarsus, who would later become the Apostle Paul — transformed by the seed planted in his conscience that day.\n\nStephen is especially venerated in the Deacon's Corner of the Ethiopian Church, as the supreme example of diaconal service elevated to the highest witness.",
    miracles: [
      "Performed signs and wonders among the people of Jerusalem",
      "Received a vision of the heavens opening and the Son of Man standing at God's right hand",
      "His prayer of forgiveness over his murderers planted the seed of Paul's conversion",
      "His relics have been associated with numerous miraculous healings through church history"
    ],
    patronOf: ["Deacons", "Those persecuted for their faith", "Stonecutters"],
    scriptureReadings: ["Acts 7:54–60 — The stoning of Stephen", "Acts 6:5 — 'They chose Stephen, a man full of faith and the Holy Spirit'"]
  },

  // ═══════════════════════════════════════════════════════════════
  // FOUNDATIONAL PILLARS OF THE EOTC
  // ═══════════════════════════════════════════════════════════════
  {
    id: "frumentius",
    nameEn: "St. Frumentius",
    nameAmharic: "አቡነ ሰላማ ከሣቴ ብርሃን",
    title: "Abba Salama, Illuminator of Ethiopia, First Bishop of Axum",
    feastDayEthiopian: "Tikimt 26",
    feastDayGregorian: "November 5",
    century: "4th Century",
    origin: "Tyre, Syria/Phoenicia",
    categories: ["Church Fathers", "Apostles"],
    bio: "Shipwrecked on the Red Sea coast as a young man, he rose to become the first Bishop of Ethiopia. Ordained by St. Athanasius of Alexandria, he baptized King Ezana and made Ethiopia one of the first Christian kingdoms on earth.",
    fullBio: "Saint Frumentius is the master-builder of the institutional Ethiopian Orthodox Church. Born in Tyre as a highly educated Greek-Syrian Christian youth, he was approximately 15 years old when he accompanied his uncle Meropius on a merchant trading voyage through the Red Sea. When the ship stopped at an Aksumite port to take on water, the crew was ambushed and massacred. Only Frumentius and his brother Aedesius survived, likely spared because of their youth.\n\nBrought to the royal palace in the capital city of Aksum as royal slaves, the young men quickly won the deep trust of King Ella Amida through their exceptional intellect and personal integrity. Frumentius was appointed royal chancellor and tutor to the young Crown Prince Ezana — and this is where providence took over. While serving in the court, Frumentius began quietly gathering Christian merchants into prayer groups, building the first underground Christian community in Ethiopia.\n\nWhen Prince Ezana ascended the throne, Frumentius was given his freedom. Rather than returning to his homeland, he traveled to Alexandria — the theological capital of the ancient world — to meet with the great Patriarch St. Athanasius. He begged Athanasius to send a bishop to oversee the rapidly growing Ethiopian flock. Athanasius looked at Frumentius and said: 'What man can we find more filled with the Spirit of God than you to fulfill this task?' — and consecrated him as the first Bishop of Ethiopia on the spot.\n\nFrumentius returned to Aksum as Abba Salama (Father of Peace) and Kassate Berhan (Revealer of Light), baptized King Ezana, established Christianity as the official state religion, and firmly planted Apostolic Succession into the soil of East Africa. Ethiopia became one of the first nations on earth to officially declare itself a Christian kingdom — a status it has maintained for 1,700 years.",
    miracles: [
      "Through divine providence, survived the massacre of an entire ship's crew as a teenager",
      "Built the first Christian community in Aksumite Ethiopia while a royal slave",
      "Baptized King Ezana, converting the entire Aksumite Kingdom to Christianity",
      "Established the first line of Apostolic Succession in sub-Saharan Africa"
    ],
    patronOf: ["Ethiopia", "Missionaries", "Those unjustly captured"],
    scriptureReadings: ["Matthew 28:19–20 — 'Go therefore and make disciples of all nations'", "Isaiah 9:2 — 'The people who walked in darkness have seen a great light'"]
  },
  {
    id: "yared",
    nameEn: "St. Yared",
    nameAmharic: "ቅዱስ ያሬድ",
    title: "Father of Sacred Music, Inventor of Ge'ez Hymnology",
    feastDayEthiopian: "Ginbot 11",
    feastDayGregorian: "May 19",
    century: "6th Century",
    origin: "Aksum, Ethiopia",
    categories: ["Church Fathers", "Hymnographers"],
    bio: "The musical genius who composed the entire liturgical chant system of the Ethiopian Orthodox Church. Caught up to Paradise in a vision, he brought back the music of the angels — dividing the sacred melodies into three holy modes: Ge'ez, Ezel, and Araray.",
    fullBio: "Saint Yared is the peerless liturgical, musical, and poetic genius of the Ethiopian Orthodox Tewahedo Church — a figure so singular that no one before or since has approached his contribution to the Church's worship.\n\nBorn in Aksum in the 6th century and orphaned young, Yared was raised by his uncle, a prominent priest. As a child, he struggled severely with his studies, unable to memorize the complex Ge'ez script. He faced harsh discipline and eventually fled to the wilderness in deep shame, convinced he was too slow-minded for the priesthood.\n\nWhile resting under a tree, he watched a tiny caterpillar trying to climb a smooth rock face to reach a piece of fruit. The caterpillar fell six consecutive times. On the seventh attempt, it persevered and reached the top. Deeply convicted by this natural parable of endurance, Yared repented of his despair and threw himself back into his studies. God opened his intellect, and he rapidly surpassed all his peers.\n\nYears later, Yared was caught up in a divine mystical vision into the heavenly courts of Paradise. There, he heard the choir of the Seraphim singing unearthly, multi-layered praises around the throne of God. Upon returning to consciousness, he went to the Great Church of Aksum and began chanting the melodies he had witnessed — stunning the congregation with music that no human ear had heard before.\n\nYared invented the entire indigenous Ge'ez musical notation system: a complex system using letters, dashes, and leather markers, creating the Digua — the multi-volume liturgical songbook that governs all Ethiopian Orthodox worship. He divided the Church calendar into three vocal modes: Ge'ez (solemn daily chant), Ezel (deep, mournful fasting tone), and Araray (soaring festival melody). Every chant, every liturgical melody, every sacred hymn sung in Ethiopian churches today traces its lineage back to the vision of Yared.",
    miracles: [
      "Received a vision of the heavenly choir and brought back their music to earth",
      "Created a complete musical notation system that has remained unchanged for 1,500 years",
      "Emperor Gebra Maskel once pierced Yared's foot with his spear while lost in rapturous chanting — and Yared did not even notice",
      "His music is said to cause those who hear it to lose all awareness of earthly time"
    ],
    quote: "The voice of the Church is the voice of the angels. Blessed is the one whose song joins theirs.",
    scriptureReadings: ["Psalm 150 — 'Praise Him with stringed instruments and flutes! Let everything that has breath praise the Lord'", "Revelation 5:9 — 'They sang a new song before the throne'"]
  },

  // ═══════════════════════════════════════════════════════════════
  // MONASTIC ASCETICS & HERMITS (ጻድቃን)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "tekle-haymanot",
    nameEn: "St. Tekle Haymanot",
    nameAmharic: "ቅዱስ ተክለ ሃይማኖት",
    title: "The Pillar of Ethiopia, Father of Monks",
    feastDayEthiopian: "Nehassie 24",
    feastDayGregorian: "August 30 (also Ter 24 / February 1 — Nativity)",
    century: "13th Century",
    origin: "Shewa, Ethiopia",
    categories: ["Monastic Saints", "Repentance"],
    bio: "The most celebrated indigenous saint of Ethiopia. He stood on one leg in continuous prayer for 29 years until the leg severed — and was granted six wings by God. He founded the great Monastery of Debre Libanos and revitalized the Christian faith of the entire nation.",
    fullBio: "Saint Tekle Haymanot is the most celebrated homegrown saint of Ethiopia — a figure so central to Ethiopian Christian identity that his image appears in churches, homes, and heart-crosses across the nation. Born in the region of Shewa during the 13th century to a pious priestly family, his name means 'Plant of the Faith' — and his life fulfilled that name completely.\n\nAs a young man, Tekle Haymanot set out across the length and breadth of Ethiopia as an uncompromising missionary, leveling pagan shrines, casting out sorcerers, and converting tens of thousands to Christ. He preached in the north and the south, in highland and lowland, to kings and to peasants. His preaching was said to be accompanied by miraculous signs that no one could explain or deny.\n\nAfter his missionary journeys, he sought total union with God through extreme asceticism. He retreated to a tiny narrow cave at Debre Libanos and resolved to stand in unbroken, unceasing intercessory prayer for the nation. He stood completely upright, motionless, eating only a single leaf on Sundays, for 29 straight years. He never lay down, never sat. The immense physical stress caused his right leg to gradually wither — and eventually it severed completely from the bone and fell away. Undeterred, he balanced on his remaining left leg for the rest of his life.\n\nGod's response to this total self-offering was extraordinary: He granted Tekle Haymanot six wings of light like a Seraph — the only human in Ethiopian tradition ever said to have been granted angelic wings. These wings were not decoration but a mark of transformation: a human being so fully surrendered to God that his nature had begun to mirror the angels.\n\nHe founded the great Monastery of Debre Libanos, which remains to this day the premier center of EOTC monasticism — a living extension of the prayers he poured out for 29 years on one leg.",
    miracles: [
      "Stood in unbroken prayer on one leg for 29 straight years",
      "His right leg severed from the bone but he continued standing on the left",
      "God granted him six wings of light like a Seraph",
      "Converted tens of thousands across Ethiopia through preaching and miraculous signs",
      "Commanded crocodiles to carry him safely across rivers",
      "Raised a person from the dead",
      "His intercession is associated with countless healings across Ethiopia"
    ],
    monastery: "Debre Libanos Monastery, Shewa",
    quote: "Prayer is the key to heaven, fasting is the wing that carries it there.",
    scriptureReadings: ["Galatians 6:14 — 'God forbid that I should boast except in the cross of our Lord Jesus Christ'", "Psalm 92:12 — 'The righteous shall flourish like a palm tree, he shall grow like a cedar in Lebanon'"]
  },
  {
    id: "gebre-menfes-kidus",
    nameEn: "St. Gebre Menfes Kidus",
    nameAmharic: "ቅዱስ ገብረ መንፈስ ቅዱስ",
    title: "Servant of the Holy Spirit, The Great Wanderer",
    feastDayEthiopian: "Megabit 5",
    feastDayGregorian: "March 14 (also 5th of every Ethiopian month)",
    century: "14th Century",
    origin: "Egypt",
    categories: ["Hermits", "Monastic Saints", "Repentance"],
    bio: "The supreme exemplar of the hermit tradition in Ethiopia. Born in Egypt, he wandered the deserts and mountains for 300 years, clothed only in his own miraculous white hair, tamed by 60 lions and 60 leopards. He wept for 100 years standing in a volcanic lake praying for the sins of the world.",
    fullBio: "Saint Gebre Menfes Kidus stands as the ultimate exemplar of the Ethiopian hermit tradition — a figure so extraordinary that his biography reads not as human history but as the Book of Genesis restored: the pristine peace of Eden, the dominion of Adam over creation, the paradise lost now recovered by a man of total purity.\n\nBorn to wealthy, long-barren parents in Egypt, he abandoned human civilization at an early age, entirely called by the Holy Spirit into the absolute depths of the desert. He spent an incredible 300 years living an utterly non-traditional monastic life — wandering the wildernesses of Egypt and later migrating into the volcanic mountains of Ethiopia, particularly settling near Mount Zequala.\n\nGebre Menfes Kidus completely detached himself from all human necessities. He never wore earthly clothes — his body was miraculously covered in thick, snow-white hair that protected him from the elements. He never built a house or cell. He never ate bread or drank cultivated wine, sustained solely by divine grace — nourished spiritually rather than physically.\n\nHis holiness was so radiant that it restored the pre-fallen peace of Eden around him. He was permanently accompanied by sixty fierce wild lions and sixty leopards, who acted as gentle guardians, lying at his feet and licking them in absolute submission. The natural terror of wild animals was dissolved by the holiness of his presence — just as Adam once named and commanded all creatures before the Fall.\n\nHis most staggering act of intercession: Gebre Menfes Kidus plunged himself into the freezing volcanic crater lake of Mount Zequala and stood there, submerged to his neck in the cold water, for 100 years — weeping without ceasing for the sins of humanity. The owl that is always shown leaning toward his face in his icon drinks a drop of water from his eye — a symbol of this century of unbroken tears poured out for the world.",
    miracles: [
      "60 wild lions and 60 leopards tamed by his holiness and lived peacefully around him",
      "His body was covered in miraculous white hair to protect him from the elements",
      "He lived for 300 years through divine preservation",
      "He stood in a volcanic crater lake for 100 years weeping for the sins of humanity",
      "Sustained by the Holy Spirit without earthly food for decades at a time",
      "Innumerable healings and miracles of mercy attributed to his intercession"
    ],
    monastery: "Mount Zequala Monastery, Oromia",
    scriptureReadings: ["Isaiah 11:6 — 'The wolf also shall dwell with the lamb, the leopard shall lie down with the young goat'", "Matthew 6:33 — 'Seek first the kingdom of God and His righteousness, and all these things shall be added to you'"]
  },
  {
    id: "ewostatewos",
    nameEn: "St. Ewostatewos",
    nameAmharic: "ቅዱስ ዕወስጣቴዎስ",
    title: "Champion of the Sabbath, Defender of EOTC Traditions",
    feastDayEthiopian: "Meskerem 18",
    feastDayGregorian: "September 28",
    century: "14th Century",
    origin: "Tigray, Ethiopia",
    categories: ["Monastic Saints", "Church Fathers"],
    bio: "A fierce champion of Orthodox traditions who strongly advocated for the observance of the Biblical Seventh-day Sabbath alongside Sunday worship. Facing institutional opposition, he went into exile to Armenia — establishing an uncompromised line of strict monastic movements.",
    fullBio: "Saint Ewostatewos (Eustathius in Greek) was one of the most theologically courageous figures in Ethiopian Church history — a man who refused to compromise the full counsel of Scripture even when doing so put him at odds with powerful institutions.\n\nBorn in Tigray in the 14th century, Ewostatewos became a devoted monk and theologian who studied the Scriptures with unusual depth. His central conviction, which would define and dominate his entire ministry, was that the Biblical commandment to honor the Seventh Day Sabbath (Saturday) had never been abrogated — that the Ethiopian Church should worship both on Saturday and Sunday, as witnessed in the Old and New Testaments respectively.\n\nThis position brought him into direct conflict with elements of the Ethiopian Church establishment who had drifted away from full Sabbath observance. Rather than compromise or stay silent, Ewostatewos preached, wrote, and organized with tireless persistence. When the opposition became too great, rather than conform, he chose exile — traveling to Egypt, Jerusalem, Cyprus, and finally Armenia, where he died.\n\nBut his movement did not die with him. His disciples — the Ewostathians — maintained his traditions in Ethiopia with fierce loyalty. Their sustained pressure eventually led to the resolution of the Sabbath question at the Council of Debre Mitmaq (1450), where the Ethiopian Church officially enshrined the observance of both the Saturday Sabbath and Sunday as non-negotiable practices of the faith — a position the EOTC maintains to this day.\n\nEwostatewos teaches the Church that truth is not always immediately victorious — but it is ultimately irresistible when held with love and sacrifice.",
    miracles: [
      "His persistent theological witness eventually caused the entire Ethiopian Church to formally adopt dual Sabbath observance",
      "Miraculous protection during years of exile across multiple countries",
      "His relics are associated with healings at Ethiopian monasteries"
    ],
    scriptureReadings: ["Hebrews 4:9 — 'There remains therefore a rest for the people of God'", "Exodus 20:8 — 'Remember the Sabbath day, to keep it holy'"]
  },
  {
    id: "samuel-waldebba",
    nameEn: "St. Samuel of Waldebba",
    nameAmharic: "ቅዱስ ሳሙኤል ዘወልደባ",
    title: "Founding Father of Waldebba Desert Monastery",
    feastDayEthiopian: "Tahsas 12",
    feastDayGregorian: "December 21",
    century: "14th Century",
    origin: "Ethiopia",
    categories: ["Monastic Saints", "Hermits"],
    bio: "The iconic founding father of the vast Waldebba desert monastery. He famously rode wild lions through the desert sands and spent nights standing to his neck in freezing rivers praying for the sins of the world.",
    fullBio: "Saint Samuel of Waldebba is one of the great desert ascetics of Ethiopian monasticism — a figure who combined the fearless physical hardship of the desert fathers with an intercessory ministry of extraordinary breadth.\n\nHe established the vast monastery complex of Waldebba in the lowland desert of northwestern Ethiopia — a region of brutal heat, scarce water, and physical harshness that was considered inhospitable to permanent habitation. Samuel chose it precisely because of its severity. In his understanding, the harder the environment, the purer the prayer: the body has nothing to distract it when survival itself is uncertain.\n\nHis life combined the two great streams of Ethiopian monasticism: ferocious physical asceticism and intense intercession for the world. He fasted with a discipline that astonished even other monks. He was said to ride wild lions through the desert — the same imagery of tamed lions associated with Gebre Menfes Kidus — representing the restoration of human dominion over creation through holiness.\n\nFor his intercessory practice, Samuel adopted a posture of extremity: he would stand waist-deep or neck-deep in the freezing rivers near Waldebba throughout entire nights, praying without ceasing for the sins of the world. The cold was not masochism — it was the physical enactment of the prayer: 'I suffer what the world suffers in its sin. Let my suffering intercede for those who do not know how to pray for themselves.'\n\nWaldebba Monastery, which he founded, remains one of the most strictly ascetic monastic communities in Ethiopia — carrying forward his vision of extreme fasting and unceasing intercession.",
    miracles: [
      "Rode wild lions through the desert, demonstrating dominion over animals through purity of life",
      "Stood in freezing rivers all night in intercession for the world's sins",
      "Numerous miraculous healings attributed to his intercession"
    ],
    monastery: "Waldebba Monastery, Northwestern Ethiopia",
    scriptureReadings: ["Luke 3:4 — 'The voice of one crying in the wilderness: prepare the way of the Lord'", "Psalm 42:1 — 'As the deer pants for the water brooks, so pants my soul for You, O God'"]
  },
  {
    id: "anthony",
    nameEn: "St. Anthony the Great",
    nameAmharic: "አባ እንጦንስ",
    title: "Father of All Christian Monasticism",
    feastDayEthiopian: "Ter 22",
    feastDayGregorian: "January 30",
    century: "3rd–4th Century",
    origin: "Egypt",
    categories: ["Monastic Saints", "Church Fathers", "Hermits"],
    bio: "The global Father of all Christian monasticism. His life and the monastic rules derived from his practice are deeply woven into the spiritual vows and disciplines of all Ethiopian monks.",
    fullBio: "Saint Anthony the Great is not uniquely Ethiopian — he belongs to the whole Church — but he is foundational to Ethiopian monasticism in a way that cannot be overstated. The monastic vows, the desert disciplines, the rules of communal and solitary life that define every Ethiopian monk trace their ultimate origins to Anthony's experiment in the Egyptian desert in the 3rd century.\n\nBorn to wealthy Christian parents in Middle Egypt, Anthony heard the Gospel call of Matthew 19:21 — 'Go, sell what you have and give to the poor, and you will have treasure in heaven' — and obeyed it literally at the age of 20. He gave away his entire inheritance, settled his sister in a community of virgins, and retired to the desert.\n\nFor 20 years he lived alone at the edge of the village, then another 20 years in an abandoned desert fort on the outer edge of civilization, and finally the last 45 years of his life on Mount Colzim near the Red Sea — entirely alone, fighting demonic assaults of a ferocity that he described in detail and that became the founding literature of the spiritual life.\n\nHis biographer, St. Athanasius of Alexandria, wrote The Life of Anthony — a text that circulated throughout the Roman Empire and detonated a revolution. Thousands of men and women fled the cities for the desert. Communities of monastics formed across Egypt, Syria, Palestine, and eventually Ethiopia. The Nine Saints who came to Ethiopia were themselves formed by this Antonian tradition.\n\nAnthony died in 356 AD at the age of 105, still clear-minded and physically vigorous. He had literally battled demons, lived without food for periods that astonished observers, and radiated a holiness that his visitors described as palpable — something that entered the room with him like a fragrance.",
    miracles: [
      "Survived brutal demonic attacks in the desert that left him physically wounded but spiritually unbroken",
      "Healed numerous sick pilgrims who traveled to his desert cell",
      "His very presence was described by visitors as radiating perceptible holiness",
      "Died at 105 years old, still mentally clear and physically vigorous"
    ],
    monastery: "Monastery of St. Anthony, Red Sea Desert, Egypt (oldest Christian monastery in the world)",
    scriptureReadings: ["Matthew 19:21 — 'If you want to be perfect, go, sell what you have and give to the poor'", "Psalm 91 — 'He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty'"]
  },

  // ═══════════════════════════════════════════════════════════════
  // HOLY WOMEN & RIGHTEOUS MATRIARCHS
  // ═══════════════════════════════════════════════════════════════
  {
    id: "walatta-petros",
    nameEn: "St. Walatta Petros",
    nameAmharic: "ቅድስት ወለተ ጴጥሮስ",
    title: "Defender of Tewahedo, Mother of Seven Monasteries",
    feastDayEthiopian: "Sanay 17",
    feastDayGregorian: "June 24",
    century: "17th Century",
    origin: "Ethiopia",
    categories: ["Holy Women", "Monastic Saints", "Martyrs"],
    bio: "A high-born noblewoman who walked away from extreme wealth and political marriage to lead a successful religious resistance against state-enforced conversion to Roman Catholicism. She founded seven female-led monasteries across Lake Tana.",
    fullBio: "Saint Walatta Petros stands as one of the most remarkable women in Ethiopian Christian history — a noblewoman of the highest rank who chose prison and poverty over comfort and compromise, and in doing so preserved the Ethiopian Orthodox faith for generations.\n\nBorn into the imperial aristocracy in the early 17th century, she was married to a senior official. Her life seemed set on a path of luxury and political prominence. But when Emperor Susenyos — under the influence of Jesuit missionaries — declared Roman Catholicism the state religion of Ethiopia and commanded all subjects to convert under penalty of death, Walatta Petros could not comply.\n\nShe refused conversion. When ordered by her own husband to attend Catholic Mass, she left him. When summoned by the emperor, she refused to bow. She was imprisoned, exiled, and threatened multiple times. Each time she was released, she continued her resistance — gathering communities of the faithful around her, preaching the Tewahedo faith, and establishing monasteries.\n\nOver the course of her ministry, she founded seven monasteries around the shores and islands of Lake Tana — each one a refuge for those who refused Catholic conversion and a center of Ethiopian Orthodox worship. She led communities of hundreds of monks and nuns who regarded her as their spiritual mother.\n\nHer biography, Gädlä Wälättä P'et'ros (Acts of Walatta Petros), written by her disciples shortly after her death, is the oldest known biography of a sub-Saharan African woman. It documents not only her resistance but her deep interior life, her theological clarity, and her extraordinary pastoral care for the communities she led.\n\nWhen Emperor Fasilides finally reversed his father's Catholic decrees and restored the Tewahedo faith as the state religion, it was largely due to the sustained resistance that Walatta Petros had made possible. She died in 1642 having never compromised.",
    miracles: [
      "Successfully resisted the state-enforced Catholic conversion while imprisoned and exiled multiple times",
      "Founded seven monasteries that preserved Tewahedo faith during the Catholic crisis",
      "Miraculous healing reported at her tomb on Lake Tana",
      "Communities of hundreds followed her leadership without any earthly power behind her"
    ],
    monastery: "Multiple monasteries on Lake Tana, including Qwärata and Mätsähä",
    scriptureReadings: ["Matthew 10:39 — 'He who finds his life will lose it, and he who loses his life for My sake will find it'", "Acts 5:29 — 'We ought to obey God rather than men'"]
  },
  {
    id: "kristos-samra",
    nameEn: "St. Kristos Samra",
    nameAmharic: "ቅድስት ክርስቶስ ሠምራ",
    title: "The Intercessor of Lake Tana, Weeper for the World",
    feastDayEthiopian: "Nehassie 24",
    feastDayGregorian: "August 30",
    century: "15th Century",
    origin: "Ethiopia",
    categories: ["Holy Women", "Monastic Saints", "Repentance"],
    bio: "A 15th-century saint who abandoned her wealthy life to take monastic vows on Lake Tana. Her unique spirituality focused on intense intercessory prayer — she spent 12 years standing in the cold waters of the lake praying for the reconciliation of all fallen souls.",
    fullBio: "Saint Kristos Samra was a woman of extraordinary intercessory passion — someone who understood prayer not as a brief communication but as a life poured out completely for others.\n\nBorn to a wealthy family in the 15th century, she renounced her inheritance and social position to take monastic vows on one of the island monasteries of Lake Tana in northwestern Ethiopia. Lake Tana — the largest lake in Ethiopia and source of the Blue Nile — was then as now a center of Ethiopian monastic life, its islands dotted with ancient churches and contemplative communities.\n\nKristos Samra's particular form of spiritual warfare was intercession. Moved by an almost unbearable love for fallen humanity, she adopted a posture of prayer that echoes both Gebre Menfes Kidus and Samuel of Waldebba: she entered the cold waters of Lake Tana and stood there — waist deep, neck deep — praying without ceasing for 12 straight years. Not 12 days. Not 12 months. Twelve years of standing in the lake, weeping and interceding for the reconciliation of sinful human souls with God.\n\nThis act of intercession reflects the deepest current of Ethiopian monastic spirituality: the belief that the body of the righteous person can stand as a substitute offering, absorbing physical suffering on behalf of those who cannot or will not pray for themselves. 'I am willing to suffer in the cold for those who are suffering in sin' — this is the logic of the great intercessors.\n\nHer feast day coincides with the feast of St. Tekle Haymanot, placing her alongside Ethiopia's most beloved male saint as an equally remarkable intercessor — a reminder that the Church's greatness is built by the hidden prayers of women as surely as by the celebrated deeds of men.",
    miracles: [
      "Stood in the waters of Lake Tana for 12 unbroken years in intercession for fallen souls",
      "Numerous miraculous healings associated with her intercession",
      "Sustained by divine grace through years of physical exposure in the lake"
    ],
    scriptureReadings: ["Romans 9:3 — 'I could wish that I myself were accursed from Christ for my brethren'", "Colossians 1:24 — 'I now rejoice in my sufferings for you, and fill up in my flesh what is lacking in the afflictions of Christ'"]
  },
  {
    id: "arsema",
    nameEn: "St. Arsema (Hripsime)",
    nameAmharic: "ቅድስት አርሴማ",
    title: "Virgin Martyr, Healer of the Nations",
    feastDayEthiopian: "Meskerem 29",
    feastDayGregorian: "October 9",
    century: "3rd–4th Century",
    origin: "Armenia",
    categories: ["Holy Women", "Martyrs"],
    bio: "Originally an Armenian virgin martyr who fled Roman persecution, her extraordinary devotion and miraculous healing powers captured the heart of the Ethiopian Church. Major churches and shrines across Ethiopia honor her powerful intercession.",
    fullBio: "Saint Arsema, known in the Armenian tradition as Hripsime, was a young Christian virgin who became one of the most widely venerated saints in Ethiopia despite being born on the other side of the ancient world.\n\nArsema and a group of Christian women fled the Roman Empire during the persecutions of Emperor Diocletian in the early 4th century. They traveled eastward toward Armenia, hoping to find safety. The group was intercepted and subjected to brutal persecution. Arsema herself was tortured and martyred with particular cruelty, refusing to renounce Christ through extreme suffering.\n\nThe story of her martyrdom traveled across the ancient Christian world through the networks of the early Church. When it reached Ethiopia, something in the Ethiopian Christian spirit recognized Arsema's suffering as its own — the suffering of a woman who chose Christ over safety, holiness over life. Her story resonated deeply with the Ethiopian tradition of martyrdom and the veneration of those who laid down their lives for the faith.\n\nOver the centuries, Arsema became integrated into the Ethiopian Orthodox calendar not as a foreign import but as a fully adopted daughter. Major churches across Ethiopia were dedicated to her. Shrines were built in her name. Countless miraculous healings — particularly involving women who were sick, infertile, or in labor — were attributed to her intercession.\n\nHer presence in the EOTC's liturgical year is a beautiful testament to the catholicity of the Orthodox tradition: the Church recognizes no national borders in its cloud of witnesses. Arsema is Ethiopian in her saints' hearts, regardless of where she was born.",
    miracles: [
      "Major miraculous healings, particularly for women, reported at shrines across Ethiopia",
      "Her intercession is associated with healing infertility and protecting women in labor",
      "Numerous churches built in her name have survived wars and earthquakes"
    ],
    patronOf: ["Women", "Those suffering unjust persecution", "The sick"],
    scriptureReadings: ["Revelation 12:11 — 'They overcame him by the blood of the Lamb and by the word of their testimony'", "Romans 8:18 — 'The sufferings of this present time are not worthy to be compared with the glory which shall be revealed in us'"]
  },

  // ═══════════════════════════════════════════════════════════════
  // THE ROYAL SAINTS (ቅዱሳን ነገሥታት)
  // ═══════════════════════════════════════════════════════════════
  {
    id: "lalibela",
    nameEn: "St. Lalibela",
    nameAmharic: "ቅዱስ ላሊበላ",
    title: "The Saint-King, Builder of the New Jerusalem",
    feastDayEthiopian: "Sene 12",
    feastDayGregorian: "June 19",
    century: "12th–13th Century",
    origin: "Roha (now Lalibela), Ethiopia",
    categories: ["Royal Saints", "Church Builders"],
    bio: "A humble emperor of the Zagwe Dynasty who received a heavenly mandate to build a 'New Jerusalem' in Africa. He carved 11 monolithic rock-hewn churches out of solid volcanic rock — with angels working alongside him at night — creating one of the greatest architectural wonders in history.",
    fullBio: "Saint Lalibela is the most remarkable church-builder in the history of Christianity. During his reign as emperor of the Zagwe Dynasty in the 12th–13th century, he undertook a project of such staggering ambition and spiritual significance that it defies rational explanation: the excavation of eleven complete churches, carved downward and inward from the surface of solid volcanic rock, surrounded by trenches, interconnected by tunnels, and decorated with bas-reliefs — all of it built not up from the ground but carved out of it.\n\nThe churches of Lalibela were not built because the Holy Land was inaccessible to Ethiopian pilgrims — they were built as an alternative pilgrimage site, a New Jerusalem on African soil, complete with a 'Jordan River' (the Yordanos stream running between the churches), a 'Calvary Hill,' a church dedicated to each major site of Christ's life.\n\nTradition holds that Lalibela was granted a vision of the New Jerusalem in heaven and commanded to reproduce it on earth. He received a heavenly mandate not unlike that given to Moses for the Tabernacle: 'I will show you the pattern; you will build what I show you.' According to the tradition preserved in his hagiography (Gädlä Lalibala), the human workers carved by day, and at night, angels came down and continued the work — which is why, the tradition says, the churches were completed in only 23 years despite requiring what modern engineers estimate would take centuries by human labor alone.\n\nBet Giorgis (the Church of St. George) — the most perfect of the eleven churches — stands completely isolated from the others, a perfect cruciform structure cut straight down into the rock, its exterior carved with a pattern of crosses, accessible only by a single narrow trench. It is perhaps the most photographed building in Africa and the most singular church in the world.\n\nThe city of Lalibela (formerly Roha) was renamed in his honor. He is venerated as the king who understood that a ruler's truest power is not in conquest but in consecration: offering the land itself back to God.",
    miracles: [
      "Received a heavenly vision of Jerusalem and a divine mandate to reproduce it in Ethiopia",
      "Angels worked alongside human carvers at night to complete the churches",
      "Eleven complete churches carved from solid volcanic rock in approximately 23 years",
      "The churches have survived 900 years of floods, earthquakes, and wars without structural failure",
      "Countless miraculous healings continue to occur at the Lalibela churches"
    ],
    patronOf: ["Builders", "Architects", "Pilgrims", "All who seek to consecrate their work to God"],
    scriptureReadings: ["Psalm 26:8 — 'Lord, I have loved the habitation of Your house, and the place where Your glory dwells'", "Revelation 21:2 — 'I saw the Holy City, New Jerusalem, coming down out of heaven from God'"]
  },
  {
    id: "yemrehana-krestos",
    nameEn: "St. Yemrehana Krestos",
    nameAmharic: "ቅዱስ ይምርሃነ ክርስቶስ",
    title: "The Priest-King, Builder of the Cave Cathedral",
    feastDayEthiopian: "Hamle 19",
    feastDayGregorian: "July 26",
    century: "11th–12th Century",
    origin: "Ethiopia",
    categories: ["Royal Saints", "Church Builders"],
    bio: "A priest-king who ruled the Zagwe Dynasty before Lalibela. He constructed a breathtaking church hidden inside a massive mountain cave — built from alternating layers of dark stone and white wood, with intricate interior carvings that have survived a thousand years.",
    fullBio: "Saint Yemrehana Krestos was a Zagwe emperor who preceded Lalibela and, like his successor, dedicated his reign not to conquest but to the construction of a house of God.\n\nHe built the Church of Yemrehana Krestos inside an enormous natural cave hidden in the mountains outside the city of Lalibela. The cave itself — a massive natural cathedral formed by volcanic activity — was chosen as a holy space already sanctified by the earth itself. Into this cave, Yemrehana Krestos constructed a church of stunning craftsmanship: the walls are built in alternating horizontal layers of polished black obsidian stone and white wood, creating a striped visual pattern unique in all of Ethiopian religious architecture.\n\nThe interior is decorated with intricate carvings and ancient paintings. A wooden ceiling panel carved with geometric designs survived intact for nearly a thousand years. The floor is inlaid with marble tiles — materials that had to be transported for enormous distances across difficult terrain, a logistical feat that alone testifies to the king's extraordinary commitment.\n\nAt the back of the cave, behind the church, lie the remains of thousands of pilgrims who traveled from across Ethiopia and Egypt to die at this holy site — believing that to breathe their last breath near the church of Yemrehana Krestos was to die in a sacred and blessed place. Their skeletal remains fill the back of the cave in a quiet, poignant testament to the faith of medieval Ethiopia.\n\nYemrehana Krestos is venerated as a royal saint who understood that kingship finds its highest expression in service to God — not in the accumulation of power but in its humble offering.",
    miracles: [
      "Built a complete church inside a mountain cave with no precedent in Ethiopian architecture",
      "The intricate woodwork has survived a thousand years without deterioration",
      "Miraculous healings continue to be reported at the cave church"
    ],
    monastery: "Church of Yemrehana Krestos, Lasta, Ethiopia",
    scriptureReadings: ["1 Kings 6:12 — 'Concerning this temple which you are building, if you walk in My statutes, execute My judgments, keep all My commandments, and walk in them, then I will perform My word with you'"]
  },
  {
    id: "kaleb",
    nameEn: "St. Kaleb (Elaboras)",
    nameAmharic: "ቅዱስ ካሌብ",
    title: "The Warrior-King Who Chose the Cell",
    feastDayEthiopian: "Ginbot 20",
    feastDayGregorian: "May 28",
    century: "6th Century",
    origin: "Aksum, Ethiopia",
    categories: ["Royal Saints"],
    bio: "A mighty 6th-century Aksumite King who led a military expedition across the Red Sea to defend persecuted Christians in Najran. After his victory, he sent his royal crown to the Church of the Holy Sepulchre in Jerusalem and spent the rest of his life as a simple monk.",
    fullBio: "Saint Kaleb, also known as Elaboras, is the Aksumite king who stands as the supreme example of the saint-king who chose the cell over the throne — who understood that the highest form of royal power is the complete surrendering of it to God.\n\nIn the early 6th century, the Christian community of Najran in southern Arabia (modern-day Yemen) was under violent persecution by the Himyarite king Yusuf Asar Yathar (also known as Dhu Nuwas), who had converted to Judaism and was forcing his subjects to renounce Christianity on pain of death. The massacre of the Christians of Najran — described in Sura 85 of the Quran as the 'People of the Ditch' — sent shockwaves through the Christian world.\n\nKaleb assembled a massive Aksumite navy and army, crossed the Red Sea, and launched a military expedition to defend the persecuted Christians. His campaign was successful: he defeated Dhu Nuwas and installed a Christian king in Arabia — one of the most remarkable military and religious interventions of the ancient world, carried out not for land or tribute but for the protection of believers.\n\nUpon his return to Aksum, Kaleb did something extraordinary: he removed his royal crown and sent it to the Church of the Holy Sepulchre in Jerusalem as an offering to God. Then he abdicated his throne — voluntarily, at the height of his power and prestige — and retired to a locked monastic cell, where he spent the remainder of his days as a simple monk. He left behind the greatest empire in Africa to live in a single room.\n\nHis trajectory — from warrior to monk, from emperor to hermit — is the Ethiopian model of the complete Christian life: power fully surrendered to God.",
    miracles: [
      "Led a successful military expedition across the Red Sea to defend persecuted Christians",
      "Voluntarily abdicated imperial power to become a simple monk",
      "His crown in Jerusalem is considered a permanent Ethiopian offering to the Holy Sepulchre"
    ],
    scriptureReadings: ["Philippians 3:8 — 'I count all things loss for the excellence of the knowledge of Christ Jesus my Lord'", "Matthew 16:25 — 'For whoever desires to save his life will lose it, but whoever loses his life for My sake will find it'"]
  },

  // ═══════════════════════════════════════════════════════════════
  // GREAT GLOBAL PILLARS OF ORTHODOXY
  // ═══════════════════════════════════════════════════════════════
  {
    id: "athanasius",
    nameEn: "St. Athanasius of Alexandria",
    nameAmharic: "ቅዱስ አትናቴዎስ",
    title: "Athanasius Contra Mundum — Champion of the Trinity",
    feastDayEthiopian: "Genbot 7",
    feastDayGregorian: "May 15",
    century: "4th Century",
    origin: "Alexandria, Egypt",
    categories: ["Church Fathers"],
    bio: "The great Patriarch of Alexandria who defended the full divinity of Christ against Arianism — exiled five times for his faith but ultimately vindicated. He ordained Frumentius as the first Bishop of Ethiopia, directly planting the faith in African soil.",
    fullBio: "Saint Athanasius of Alexandria is one of the greatest theologians in the history of Christianity — and his connection to Ethiopia is deeply personal, not merely theological. It was Athanasius who ordained Frumentius as the first Bishop of Ethiopia, making him the direct human instrument through which the Ethiopian Orthodox faith received its Apostolic Succession.\n\nBorn in Alexandria around 296 AD, Athanasius was a deacon and secretary to the Patriarch Alexander of Alexandria when the Arian controversy exploded the early Church. Arius, a popular Alexandrian priest, was teaching that the Son of God was a created being — not fully divine, but the first and greatest of God's creations. The phrase 'There was a time when the Son was not' became the theological fault line of the 4th century.\n\nAt the Council of Nicaea (325 AD), the young Athanasius played a decisive role in the formulation of the Nicene Creed — the statement that the Son is 'of one substance with the Father.' When Athanasius became Patriarch of Alexandria in 328 AD, defending this truth became his entire life's work.\n\nHe was exiled five times by five different emperors who favored Arianism. He spent 17 of his 45 years as Patriarch in exile. Yet he never yielded. The phrase Athanasius contra mundum (Athanasius against the world) describes his singular determination to hold the line of Nicene orthodoxy when almost everyone else had compromised.\n\nUltimately, the world came around to Athanasius. The Council of Constantinople (381 AD) permanently enshrined the Nicene faith. The Son is fully God. This truth — which Athanasius defended at the cost of decades of exile and personal suffering — is the foundation of the Tewahedo Christology that makes the Ethiopian Church who she is.",
    miracles: [
      "His theological defense of the full divinity of Christ has preserved the faith of millions for 1,700 years",
      "Ordained Frumentius as the first Bishop of Ethiopia",
      "Survived five separate imperial exiles without abandoning his theological convictions",
      "Wrote The Life of Anthony, which launched the worldwide monastic movement"
    ],
    scriptureReadings: ["John 1:14 — 'The Word became flesh and dwelt among us'", "1 Timothy 3:16 — 'Great is the mystery of godliness: God was manifested in the flesh'"]
  },
  {
    id: "cyril-alexandria",
    nameEn: "St. Cyril of Alexandria",
    nameAmharic: "ቅዱስ ቄርሎስ",
    title: "Seal of the Fathers, Defender of the Theotokos",
    feastDayEthiopian: "Hamle 3",
    feastDayGregorian: "July 10",
    century: "5th Century",
    origin: "Alexandria, Egypt",
    categories: ["Church Fathers"],
    bio: "The Patriarch of Alexandria who defended the unity of Christ's divine and human natures and championed the title of the Virgin Mary as Theotokos (God-bearer). His Christology is the theological foundation of the Tewahedo faith.",
    fullBio: "Saint Cyril of Alexandria is the theologian whose Christology is the direct and non-negotiable foundation of the Ethiopian Orthodox Tewahedo faith. His defense of the unity of Christ's person — that the divine and human natures of Christ are united in one nature without separation, confusion, or division — is the specific theological position that defines the Oriental Orthodox churches (including the EOTC) and separates them from the Chalcedonian understanding.\n\nBorn in Alexandria around 378 AD, Cyril became Patriarch in 412 AD and almost immediately found himself in one of the greatest theological controversies of the early Church: the Nestorian controversy. Nestorius, the Patriarch of Constantinople, was teaching a form of Christology that seemed to divide Christ into two persons — one divine, one human — and consequently refused to call the Virgin Mary Theotokos (God-bearer or 'Mother of God'), insisting instead that she was only Christotokos (Christ-bearer).\n\nCyril saw clearly that Nestorius's position, if accepted, would destroy the theology of salvation. If Mary gave birth only to the human Christ, then who saved us on the cross? The one who died must be the same one who is divine — fully and inseparably. At the Council of Ephesus (431 AD), Cyril presided over the condemnation of Nestorius and the formal proclamation that Mary is indeed Theotokos — a title the Ethiopian Church treasures above almost all others.\n\nCyril's formula 'One nature of the Word Incarnate' (mia physis tou theou logou sesarkomene) is the specific theological expression that the Oriental Orthodox — including the EOTC — hold as the truest articulation of the mystery of Christ. He is called 'the Seal of the Fathers' because his theology is the capstone of the patristic Christological development.",
    miracles: [
      "Presided over the Council of Ephesus (431 AD) that formally declared Mary as Theotokos",
      "His theological writings preserved the full Incarnational faith against Nestorian division",
      "Authored 12 Anathemas against Nestorianism that remain canonical in Orthodox theology"
    ],
    scriptureReadings: ["John 1:14 — 'The Word became flesh'", "Luke 1:43 — 'And why is this granted to me, that the mother of my Lord should come to me?'"]
  },
  {
    id: "moses-black",
    nameEn: "St. Moses the Black",
    nameAmharic: "አባ ሙሴ ጸሊም",
    title: "From Bandit to Desert Father, Icon of Repentance",
    feastDayEthiopian: "Sene 24",
    feastDayGregorian: "July 1",
    century: "4th Century",
    origin: "Ethiopia/Egypt",
    categories: ["Monastic Saints", "Repentance", "Church Fathers"],
    bio: "A notorious gang leader and thief who experienced a radical conversion and became one of the most beloved desert fathers of Scetis. His life is the ultimate proof of God's radical mercy — the most violent sinner becoming one of the most gentle saints.",
    fullBio: "Saint Moses the Black (also called Moses the Ethiopian) is the patron saint of repentance in Ethiopian Christianity — and his story is one of the most radical transformations in the history of the Church.\n\nMoses was a large, physically imposing man who worked as a slave to an Egyptian official. He was dismissed after being suspected of theft and murder. Joining a band of robbers, he became their leader — notorious throughout the Egyptian desert for violence, cruelty, and fearlessness. He is described in the ancient sources as a man who inspired terror in all who saw him.\n\nThe circumstances of his conversion are unclear, but at some point — possibly fleeing justice, possibly drawn by hunger — Moses found himself in contact with the desert monasteries of Scetis. Something he witnessed there — the peace of the monks, the reality of their God — broke something open in him. He presented himself to Abba Isidore and asked to become a monk.\n\nThe transformation was immediate in direction but gradual in depth. Moses struggled intensely with his past life — with violence, with lust, with the habits of twenty years of criminal existence. The monks watched. He fought his demons openly, honestly, without pretense. He fasted with extraordinary severity. He built up a discipline of prayer that eventually surpassed most of his peers.\n\nHe became famous for his humility. When asked to judge a brother who had sinned, Moses arrived at the gathering carrying a leaking jug of water on his back. Asked why, he said: 'My sins run out behind me like this water, yet I have come to judge the sins of another man.' The story stopped the meeting cold.\n\nMoses died around 405 AD, martyred by raiders — choosing not to flee even when warned, saying 'Those who live by the sword die by the sword. I was a man of violence. This is my death.' He died peacefully among the invaders.",
    miracles: [
      "The most complete personal transformation in the desert father tradition — from feared bandit to beloved saint",
      "His sayings on humility and repentance became foundational texts of Eastern monasticism",
      "He died deliberately choosing martyrdom as the final act of repentance for his violent past",
      "His intercession is particularly powerful for those trapped in addiction, violence, or habitual sin"
    ],
    quote: "Go, sit in your cell, and your cell will teach you everything.",
    scriptureReadings: ["Luke 15:7 — 'There will be more joy in heaven over one sinner who repents than over ninety-nine just persons who need no repentance'", "1 Timothy 1:15 — 'Christ Jesus came into the world to save sinners, of whom I am chief'"]
  },
  {
    id: "abune-petros",
    nameEn: "Abune Petros",
    nameAmharic: "አቡነ ጴጥሮስ",
    title: "The Modern Martyr, Archbishop Who Refused to Bow",
    feastDayEthiopian: "Hamle 22",
    feastDayGregorian: "July 29",
    century: "20th Century",
    origin: "Ethiopia",
    categories: ["Martyrs", "Church Fathers"],
    bio: "A 20th-century Archbishop of the EOTC who publicly excommunicated the Italian fascist forces occupying Ethiopia in 1936. He was publicly executed in Addis Ababa while holding his hand-cross — becoming the modern icon of uncompromising righteousness.",
    fullBio: "Abune Petros is the most recent of the great Ethiopian martyrs — a man who proved in the 20th century that the tradition of dying for one's faith was not merely an ancient phenomenon but a living reality in the Ethiopian Church.\n\nWhen Fascist Italy invaded and occupied Ethiopia in 1936, the Italian colonial authorities sought the cooperation of the Ethiopian Orthodox Church. They wanted church leaders to sign declarations of submission acknowledging Italian authority and ordering the Ethiopian people to cooperate with the occupation. This would have given the invasion a veneer of religious legitimacy.\n\nAbune Petros, then serving as the Archbishop of the EOTC for Eastern Ethiopia, not only refused to sign — he went further. He issued a public proclamation declaring the Italian forces excommunicated: condemning the invasion as a sin against God and calling on the Ethiopian people to resist. He stood publicly against an armed colonial force with the full knowledge of what it would cost him.\n\nHe was arrested and brought before an Italian military tribunal. Asked to recant and submit, he refused. On July 29, 1936 — a date the Ethiopian Church now observes as his feast day — Abune Petros was taken to a public square in Addis Ababa and executed by firing squad. Witnesses reported that as the soldiers prepared to fire, he lifted his hand-cross high above his head and blessed the Ethiopian people. He was praying when the shots were fired.\n\nHis statue stands today in the center of Addis Ababa near the railway station — a modern Ethiopian saint in robes and cross, standing permanently in defiance of all powers that set themselves against God and the dignity of God's people.",
    miracles: [
      "Publicly excommunicated an occupying fascist army with no earthly power to enforce it",
      "Died praying with his hand-cross raised above his head",
      "His witness strengthened Ethiopian resistance to colonialism throughout the occupation",
      "His feast has inspired countless Ethiopians facing unjust authority"
    ],
    patronOf: ["Those facing unjust authority", "The persecuted Church", "Ethiopian national dignity"],
    scriptureReadings: ["John 15:13 — 'Greater love has no one than this, than to lay down one's life for his friends'", "Acts 5:29 — 'We ought to obey God rather than men'"]
  },
]

export const NINE_SAINTS = saints.filter((s) => s.isNineSaint)
export const ARCHANGELS = saints.filter((s) => s.isArchangel)

export const ALL_CATEGORIES: SaintCategory[] = [
  "Nine Saints",
  "Archangels",
  "Martyrs",
  "Monastic Saints",
  "Hermits",
  "Church Fathers",
  "Hymnographers",
  "Royal Saints",
  "Church Builders",
  "Holy Women",
  "Repentance",
  "Apostles",
]

export function getSaintById(id: string): Saint | undefined {
  return saints.find((s) => s.id === id)
}

export function getSaintsByCategory(category: SaintCategory): Saint[] {
  return saints.filter((s) => s.categories.includes(category))
}

export function searchSaints(query: string): Saint[] {
  const q = query.toLowerCase()
  return saints.filter(
    (s) =>
      s.nameEn.toLowerCase().includes(q) ||
      s.nameAmharic.includes(q) ||
      s.title.toLowerCase().includes(q) ||
      s.bio.toLowerCase().includes(q) ||
      s.categories.some((c) => c.toLowerCase().includes(q))
  )
}
