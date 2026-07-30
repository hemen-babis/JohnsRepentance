"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollToTop } from "@/components/scroll-to-top"
import { BookOpen, Calendar, Search, Sparkles } from "lucide-react"

type Saint = {
  name: string
  title: string
  feastDay: string
  century: string
  categories: string[]
  details: string
  synaxarium?: string
  readings: string[]
}

const saints: Saint[] = [
  {
    name: "St. Michael the Archangel",
    title: "Chief of the Heavenly Hosts, Protector of the Church",
    feastDay: "Hedar 12 (November 21) and Sanay 12 (June 19); 12th day of every Ethiopian month",
    century: "Angelic Host",
    categories: ["Holy Archangels", "Miracle Workers"],
    details:
      "St. Michael is venerated as the premier archangel, commander of the heavenly armies, and primary intercessor for humanity. Ethiopian tradition honors him for profound mercy, delivering prayers to God, rescuing souls from destruction, saving the three holy children from the fiery furnace, and protecting saints in peril. His icon shows him with a drawn sword trampling Satan, symbolizing spiritual victory over dark forces.",
    synaxarium:
      "Commemorates his loyalty to God during the heavenly rebellion and his constant defense of the faithful against spiritual attacks.",
    readings: ["Revelation 12:7-11", "Daniel 10:13", "Jude 1:9"],
  },
  {
    name: "St. Gabriel the Archangel",
    title: "Messenger of Peace, Deliverer from Fire",
    feastDay: "Tahsas 19 (December 28) and Hamle 19 (July 26); 19th day of every Ethiopian month",
    century: "Angelic Host",
    categories: ["Holy Archangels", "Miracle Workers"],
    details:
      "St. Gabriel is the herald of God's grandest mysteries and the angel of supreme joy. He delivered the Annunciation to the Holy Virgin Mary and comforted Zechariah regarding the birth of John the Baptist. His Hamle 19 feast is especially loved for his miraculous intervention in saving Kirkos and his mother Iyeluta from a boiling cauldron of pitch.",
    synaxarium:
      "Reflects on obedience, receiving the divine word with humility, and God's power to make worldly trials harmless.",
    readings: ["Luke 1:19", "Luke 1:26-38", "Daniel 3:25-28"],
  },
  {
    name: "St. Raphael the Archangel",
    title: "Archangel of Healing, Travel, and Guidance",
    feastDay: "Paguemen 3 (Early September)",
    century: "Angelic Host",
    categories: ["Holy Archangels", "Protectors", "Miracle Workers"],
    details:
      "St. Raphael is venerated as the archangel of healing, travel, and the recovery of what has been lost. The supplied teaching describes him as a healer of blindness, a guide for the journey, and a heavenly protector who subdues destructive powers.",
    readings: ["Tobit 12:15", "John 5:4"],
  },
  {
    name: "St. Uriel the Archangel",
    title: "Archangel of Divine Light and Wisdom",
    feastDay: "Hamle 22 (July 29)",
    century: "Angelic Host",
    categories: ["Holy Archangels", "Protectors"],
    details:
      "St. Uriel is honored as the archangel of divine light and wisdom. Ethiopian tradition remembers him as one who wipes away tears and brings illumination, including the tradition of sanctifying Ethiopia with the blood of Christ.",
    readings: ["2 Esdras 4:1", "Psalm 43:3"],
  },
  {
    name: "St. Phanuel the Archangel",
    title: "Archangel of Repentance",
    feastDay: "Tahsas 3 (December 12)",
    century: "Angelic Host",
    categories: ["Holy Archangels", "Protectors"],
    details:
      "St. Phanuel is remembered as the archangel of repentance and the expulsion of evil spirits. He guides souls away from dark paths and stands as a defense against demonic temptation.",
    readings: ["Matthew 4:10-11", "Psalm 51"],
  },
  {
    name: "St. Raguel the Archangel",
    title: "Archangel of Justice, Order, and Harmony",
    feastDay: "Meskerem 1 (September 11)",
    century: "Angelic Host",
    categories: ["Holy Archangels", "Protectors"],
    details:
      "St. Raguel is honored as the archangel of justice, order, and harmony. The supplied text describes him as one who watches over the celestial lights and the execution of God's perfect laws.",
    readings: ["Revelation 4:5", "Psalm 119:137"],
  },
  {
    name: "St. Saquael the Archangel",
    title: "Archangel of Divine Comfort, Peace, and Mercy",
    feastDay: "Hidar 20 (November 29)",
    century: "Angelic Host",
    categories: ["Holy Archangels", "Protectors"],
    details:
      "St. Saquael is remembered as an archangel of divine comfort, peace, and mercy who brings the souls of the humble before the Almighty.",
    readings: ["Matthew 5:4", "Isaiah 61:3"],
  },
  {
    name: "St. George of Lydda",
    title: "Prince of Martyrs, Patron Saint of Ethiopia",
    feastDay: "Miyazia 23 (May 1) and Hedar 7 (November 16); 23rd day of every Ethiopian month",
    century: "3rd-4th Century",
    categories: ["Great Warriors & Mighty Martyrs", "Miracle Workers"],
    details:
      "St. George is a towering figure in Ethiopia and is honored as the nation's spiritual protector. A Roman military officer under Diocletian, he tore down imperial edicts demanding sacrifices to idols and endured seven years of tortures while continuing to preach Christ. His dragon-slaying icon represents Christ destroying the power of the devil and saving the Church.",
    synaxarium:
      "A powerful witness on spiritual warfare, overcoming tyranny through the cross, and enduring to the end.",
    readings: ["2 Timothy 2:3", "Ephesians 6:11-13", "Revelation 2:10"],
  },
  {
    name: "St. Merkorios",
    title: "The Two-Sworded Martyr (Abu-Seifen)",
    feastDay: "Hedar 25 (December 4) and Sene 25 (July 2)",
    century: "3rd Century",
    categories: ["Great Warriors & Mighty Martyrs", "Miracle Workers"],
    details:
      "St. Merkorios was a brilliant Armenian warrior in the Roman army. During battle, an angel gave him a heavenly sword alongside his earthly weapon and promised victory if he remembered the Lord. After victory, he refused a pagan celebration and confessed Christ. He endured flaying and fire, and Ethiopian tradition remembers his spirit being sent by the Holy Virgin Mary to strike down Julian the Apostate.",
    synaxarium:
      "Highlights the contrast between earthly armor and heavenly protection, and the Christian's sole allegiance to Christ.",
    readings: ["Hebrews 11:32-34", "Psalm 18:39"],
  },
  {
    name: "St. Kirkos and St. Iyeluta",
    title: "Child Martyr and Faithful Mother",
    feastDay: "Hamle 15 (July 22)",
    century: "Early Christian Martyrs",
    categories: ["Great Warriors & Mighty Martyrs", "Martyrs", "Miracle Workers"],
    details:
      "St. Kirkos and his mother St. Iyeluta are remembered as symbols of child martyrdom and steadfast maternal faith. The supplied text describes their torture and their being thrown into a boiling cauldron of pitch, where Archangel Gabriel miraculously protected them before they surrendered their spirits to God.",
    readings: ["Matthew 18:3", "Psalm 8:2"],
  },
  {
    name: "St. Stephen",
    title: "Proto-martyr and Archdeacon",
    feastDay: "Ter 1 (January 9)",
    century: "1st Century",
    categories: ["Great Warriors & Mighty Martyrs", "Martyrs", "Apostles"],
    details:
      "St. Stephen is the first Christian martyr and the archdeacon of the early Church. He was stoned to death while praying for his executioners, making him especially important for the Deacon's Corner and for teaching forgiveness under persecution.",
    readings: ["Acts 7:54-60"],
  },
  {
    name: "Abba Aregawi (Zemika'el)",
    title: "Leader of the Nine Saints",
    feastDay: "Tikimt 14 (October 24)",
    century: "5th-6th Century",
    categories: ["Nine Saints", "Monastic Saints", "Church Fathers"],
    details:
      "Abba Aregawi led the Nine Saints and founded Debre Damo on a sheer cliff summit. Tradition says the Holy Spirit commanded a massive serpent to wrap around him and lift him safely up the cliffside.",
    readings: ["Psalm 61:2", "Hebrews 11:38"],
  },
  {
    name: "Abba Garima (Yeshaq)",
    title: "Keeper of the Gospel Manuscript Tradition",
    feastDay: "Sene 17 (June 24)",
    century: "5th-6th Century",
    categories: ["Nine Saints", "Monastic Saints", "Church Fathers"],
    details:
      "Abba Garima is known for copying and illuminating the Garima Gospels, recognized as one of the world's earliest illustrated Christian manuscripts. Tradition says God halted the setting sun so he could complete his holy writing in a single day.",
    readings: ["John 1:1", "Psalm 119:105"],
  },
  {
    name: "Abba Pantelewon",
    title: "The Standing Intercessor of Aksum",
    feastDay: "Tikimt 6 (October 16)",
    century: "5th-6th Century",
    categories: ["Nine Saints", "Monastic Saints"],
    details:
      "Abba Pantelewon built a small cell on a hill in Aksum and lived as a strict ascetic hermit for 45 years. He is remembered for never sitting down, standing in perpetual prayer and intercession.",
    readings: ["1 Thessalonians 5:17", "Psalm 134"],
  },
  {
    name: "Abba Aftse",
    title: "Sanctifier of Yeha",
    feastDay: "Hamle 2 (July 9)",
    century: "5th-6th Century",
    categories: ["Nine Saints", "Monastic Saints", "Church Builders"],
    details:
      "Abba Aftse traveled to Yeha and repurposed the ancient pre-Christian Sabaean temple into a holy church dedicated to the True God.",
    readings: ["Isaiah 56:7", "1 Corinthians 3:16"],
  },
  {
    name: "Abba Alef",
    title: "Missionary of Poverty and Detachment",
    feastDay: "Magabit 11 (March 20)",
    century: "5th-6th Century",
    categories: ["Nine Saints", "Monastic Saints"],
    details:
      "Abba Alef spread the Gospel northward along the Mareb River, established the remote monastery of Bi'isa, and became an exemplar of absolute poverty and detachment.",
    readings: ["Matthew 19:21"],
  },
  {
    name: "Abba Guba",
    title: "Hidden Warrior of the Wilderness",
    feastDay: "Sene 29 (July 6)",
    century: "5th-6th Century",
    categories: ["Nine Saints", "Monastic Saints"],
    details:
      "Abba Guba chose a rugged mountain wilderness for a hidden life of fasting and spiritual warfare against dark forces.",
    readings: ["Ephesians 6:12", "Matthew 4:4"],
  },
  {
    name: "Abba Liqanos",
    title: "Teacher and Theological Pillar",
    feastDay: "Sanay 28 (July 5)",
    century: "5th-6th Century",
    categories: ["Nine Saints", "Monastic Saints", "Church Fathers"],
    details:
      "Abba Liqanos is remembered as a theological giant among the Nine Saints. He spent his years praying at Debre Kuanat and writing metric homilies and liturgical outlines.",
    readings: ["2 Timothy 4:7"],
  },
  {
    name: "Abba Sehma (Tsahma)",
    title: "Preacher of Repentance",
    feastDay: "Ter 16 (January 24)",
    century: "5th-6th Century",
    categories: ["Nine Saints", "Monastic Saints"],
    details:
      "Abba Sehma established the monastery of Enda Tsahma in Agame and focused on preaching repentance and baptizing pagan populations.",
    readings: ["Mark 1:15"],
  },
  {
    name: "Abba Yem'ata",
    title: "Founder of the Heights",
    feastDay: "Tikimt 28 (November 7)",
    century: "5th-6th Century",
    categories: ["Nine Saints", "Monastic Saints", "Church Builders"],
    details:
      "Abba Yem'ata founded Abuna Yemata Guh, a monolithic church carved into a vertical rock pinnacle. Its barefoot climb mirrors the spiritual ascent toward heavenly things.",
    readings: ["Colossians 3:2"],
  },
  {
    name: "St. Frumentius (Abba Salama, Kassate Berhan)",
    title: "Illuminator of Ethiopia, First Bishop of Axum",
    feastDay: "Tikimt 26 (November 5)",
    century: "4th Century",
    categories: ["Foundational Pillars", "Church Fathers", "Apostles"],
    details:
      "Shipwrecked as a young Syrian Christian on the Red Sea coast, Frumentius entered the Aksumite royal court and became tutor to Prince Ezana. He traveled to Alexandria to ask St. Athanasius for a bishop, but Athanasius ordained him instead. Returning as Abba Salama, he baptized King Ezana, established Christianity as the state faith, and brought Apostolic Succession to Ethiopia.",
    synaxarium:
      "Celebrates the roots of Ethiopian Orthodoxy, divine providence turning shipwreck into national salvation, and the need for church leadership.",
    readings: ["Matthew 28:19-20", "Isaiah 9:2"],
  },
  {
    name: "St. Yared",
    title: "Father of Sacred Music and Hymnology",
    feastDay: "Ginbot 11 (May 19)",
    century: "6th Century",
    categories: ["Foundational Pillars", "Hymnographers", "Church Fathers"],
    details:
      "St. Yared struggled with learning as a youth, then learned perseverance after watching a caterpillar repeatedly try to climb a tree. He later received a vision of heavenly worship and translated those rhythms into Ethiopian chant. He composed the Digua and established the three sacred modes: Ge'ez, Ezel, and Araray.",
    synaxarium:
      "Explores liturgical worship as an extension of heavenly worship and honors perseverance through weakness.",
    readings: ["Psalm 150", "Revelation 5:9"],
  },
  {
    name: "St. Tekle Haymanot",
    title: "The Pillar of Ethiopia, Father of Monks",
    feastDay: "Nehassie 24 (August 30) and Ter 24 (February 1)",
    century: "13th Century",
    categories: ["Monastic Saints", "Miracle Workers"],
    details:
      "St. Tekle Haymanot is one of Ethiopia's most beloved saints. Born in Shewa, he preached across the nation, destroyed pagan altars, converted thousands, and founded Debre Libanos. Tradition remembers him standing on one leg for 29 years in intercessory prayer until his leg severed, after which God granted him six wings of light.",
    synaxarium:
      "A witness to mortification of the flesh, total surrender to God, and the power of one righteous person's prayer for a whole country.",
    readings: ["Galatians 6:14", "Psalm 92:12"],
  },
  {
    name: "St. Gebre Menfes Kidus (Abbo)",
    title: "Servant of the Holy Spirit, The Great Wanderer",
    feastDay: "Megabit 5 (March 14); 5th day of every Ethiopian month",
    century: "14th Century",
    categories: ["Monastic Saints", "Hermits", "Miracle Workers"],
    details:
      "St. Gebre Menfes Kidus was born in Egypt and spent generations in the wilderness of Egypt and Mount Zequala. He abandoned society, was clothed only by his miraculous white hair, and was sustained by the Holy Spirit. His holiness restored Edenic peace around him, and tradition depicts him with lions, leopards, and an owl drinking a tear from his eye during long repentance for mankind.",
    synaxarium:
      "Focuses on returning to purity through continuous repentance and absolute reliance on God.",
    readings: ["Isaiah 11:6", "Matthew 6:33"],
  },
  {
    name: "St. Ewostatewos (Eustathius)",
    title: "Defender of Orthodox Tradition",
    feastDay: "Meskerem 18 (September 28)",
    century: "13th-14th Century",
    categories: ["Monastic Saints", "Church Fathers"],
    details:
      "St. Ewostatewos strongly defended Orthodox tradition and advocated strict observance of the Biblical Seventh-day Sabbath alongside Sunday worship. Facing opposition, he went into exile to Armenia and established an uncompromised monastic movement.",
    readings: ["Hebrews 4:9", "Exodus 20:8"],
  },
  {
    name: "St. Samuel of Waldebba",
    title: "Father of the Wilderness Monastery",
    feastDay: "Tahsas 12 (December 21)",
    century: "Medieval Ethiopia",
    categories: ["Monastic Saints", "Hermits", "Miracle Workers"],
    details:
      "St. Samuel is remembered as a founding father of the Waldebba desert monastery complex. He was renowned for severe fasting, riding wild lions through the desert, and spending nights standing in freezing rivers while praying for the sins of the world.",
    readings: ["Luke 3:4", "Psalm 42:1"],
  },
  {
    name: "St. Anthony the Great",
    title: "Father of Christian Monasticism",
    feastDay: "Ter 22 (January 30)",
    century: "3rd-4th Century",
    categories: ["Monastic Saints", "Hermits", "Church Fathers"],
    details:
      "St. Anthony the Great is the global father of Christian monasticism. The supplied text notes that his life and rules are deeply woven into Ethiopian monastic vows and the spiritual garments of Ethiopian monks.",
    readings: ["Matthew 19:21", "Psalm 91"],
  },
  {
    name: "St. Walatta Petros",
    title: "Mother of Resistance and Monastic Courage",
    feastDay: "Sanay 17 (June 24)",
    century: "17th Century",
    categories: ["Holy Women", "Monastic Saints"],
    details:
      "St. Walatta Petros was a high-born noblewoman who left wealth and political marriage to lead religious resistance against state-enforced conversion to Roman Catholicism in the 17th century. She founded seven female-led monasteries around Lake Tana.",
    readings: ["Matthew 10:39"],
  },
  {
    name: "St. Kristos Samra",
    title: "Intercessor for the Fallen",
    feastDay: "Nehassie 24 (August 30)",
    century: "15th Century",
    categories: ["Holy Women", "Monastic Saints", "Miracle Workers"],
    details:
      "St. Kristos Samra abandoned a wealthy life for monastic vows on Lake Tana. Her spirituality centered on intense intercessory prayer for humanity, including 12 years standing in lake water praying for the reconciliation of fallen souls.",
    readings: ["Romans 9:3"],
  },
  {
    name: "St. Arsema (Hripsime)",
    title: "Virgin Martyr and Healer",
    feastDay: "Meskerem 29 (October 9)",
    century: "Early Christian Martyr",
    categories: ["Holy Women", "Martyrs", "Miracle Workers"],
    details:
      "St. Arsema was an Armenian virgin martyr fleeing Roman persecution whose devotion and martyrdom became deeply loved in the Ethiopian Church. Many churches and shrines honor her healing miracles.",
    readings: ["Revelation 12:11"],
  },
  {
    name: "St. Lalibela",
    title: "The Saint King",
    feastDay: "Sene 12 (June 19)",
    century: "12th-13th Century",
    categories: ["Royal Saint-Kings", "Church Builders"],
    details:
      "St. Lalibela was a humble emperor of the Zagwe Dynasty who received a heavenly mandate to recreate a New Jerusalem on African soil. He built the 11 monolithic rock-hewn churches of Roha, carved from solid volcanic rock with angelic help.",
    readings: ["Psalm 26:8", "Revelation 21:2"],
  },
  {
    name: "St. Yemrehana Krestos",
    title: "Priest-King and Builder",
    feastDay: "Hamle 19 (July 26)",
    century: "12th Century",
    categories: ["Royal Saint-Kings", "Church Builders"],
    details:
      "St. Yemrehana Krestos ruled before Lalibela and built an architectural masterpiece hidden inside a mountain cave, using alternating dark stone, white wood, and intricate interior carvings.",
    readings: ["1 Kings 6:12"],
  },
  {
    name: "St. Kaleb (Elaboras)",
    title: "King, Defender, and Monk",
    feastDay: "Ginbot 20 (May 28)",
    century: "6th Century",
    categories: ["Royal Saint-Kings", "Miracle Workers"],
    details:
      "St. Kaleb was an Aksumite king who crossed the Red Sea to defend persecuted Christians in Najran. After victory, he sent his crown to the Church of the Holy Sepulchre, abdicated the throne, and lived as a monk in a locked cell.",
    readings: ["Philippians 3:8"],
  },
  {
    name: "St. Tekle Haymanot II (Abune Petros)",
    title: "Modern Martyr and Archbishop of the EOTC",
    feastDay: "Hamle 22 (July 29)",
    century: "20th Century",
    categories: ["Global Saints", "Martyrs", "Church Teachings"],
    details:
      "Abune Petros was a modern martyr and archbishop of the Ethiopian Orthodox Tewahedo Church. During the Italian fascist occupation, he refused submission to foreign invaders, excommunicated the colonial command, and was publicly executed in Addis Ababa while holding his hand-cross.",
    readings: ["John 15:13"],
  },
  {
    name: "St. Athanasius and St. Cyril of Alexandria",
    title: "Great Pillars of Orthodox Theology",
    feastDay: "Ginbot 7 (Athanasius) and Hamle 3 (Cyril)",
    century: "4th-5th Century",
    categories: ["Global Saints", "Church Fathers", "Church Teachings"],
    details:
      "St. Athanasius and St. Cyril are great Church Fathers whose defense of the Trinity and the unified nature of Christ form the structural core of the Tewahedo faith. Athanasius also ordained St. Frumentius for Ethiopia, linking Ethiopian apostolic succession with Alexandrian Orthodoxy.",
    readings: ["John 1:14", "1 Timothy 3:16"],
  },
  {
    name: "St. Moses the Black",
    title: "Repentant Desert Father",
    feastDay: "Sene 24 (July 1)",
    century: "4th Century",
    categories: ["Global Saints", "Monastic Saints", "Church Teachings"],
    details:
      "St. Moses the Black was once a violent desert bandit, then became one of the most compassionate monks of Scetis. His life is a powerful proof of God's radical mercy and the possibility of true repentance.",
    readings: ["Luke 15:7", "1 Timothy 1:15"],
  },
]

const categories = ["All", ...Array.from(new Set(saints.flatMap((saint) => saint.categories)))]

const teachingSections = [
  {
    title: "Angelology: Definition and Meaning",
    body: [
      "The Ge'ez word Mel'ak has two meanings. First, it can mean leader, chief, or official, as in the seven administrators of the churches in Revelation 2 and 3. Second, it means messenger, one who is sent or commissioned, matching Hebrews 1:14.",
      "This explains the work of the angels: they are spirits sent from God to humanity and from humanity to God. They are also called the Heavenly Host.",
    ],
    references: ["Revelation 2-3", "Hebrews 1:14"],
  },
  {
    title: "Classification of Angels",
    body: [
      "The teaching divides angels into two groups: the Angels of Light and the evil angels who form the army of the devil, the commander of darkness.",
      "For this reason, the Church distinguishes the angels of God by calling them holy angels.",
    ],
    references: [],
  },
  {
    title: "Creation of Angels",
    body: [
      "The angels were created on the first day. The teaching cites Jubilees and Psalm 33:6: by the word of the Lord the heavens were made, and all the host of them by the breath of His mouth.",
      "Although created on the first day, they were brought forth after the four physical elements and the seven heavens, so no created being could boast of helping God create. Some theologians therefore call angels the older brothers of mankind, since they were created before humans.",
      "Their nature was brought from non-existence into existence. They are described as refined like wind and warm like fire, powerful and swift executors of God's will.",
    ],
    references: ["Jubilees 2:7-8", "Psalm 33:6", "Psalm 104:4"],
  },
  {
    title: "The Purpose of Creation",
    body: [
      "Among all created things, nothing was created without purpose. The supplied teaching says humans and angels were created for a distinct purpose above all creatures.",
      "Holy angels were created first to praise God's name and inherit eternal glory, and second to be sent forth to minister to human beings so they may inherit salvation.",
    ],
    references: ["Hebrews 1:14"],
  },
  {
    title: "The Silence of God",
    body: [
      "The teaching explains that God brought creation into existence by His own free will, without external necessity. One profound mode of creation is described as arimmo, or silence.",
      "Human silence often means inactivity, but God's silence is different. When God is silent, there is no weakness or pause in His work. His silent thought manifests divine power and brings creation from non-existence into existence.",
      "God did not create through a fleeting decision or because He discovered something unknown. All creation was eternally known in the heart and counsel of God before being called into existence.",
    ],
    references: ["Judges 16:2", "1 Samuel 2:9", "Psalm 4:4", "Psalm 33:11"],
  },
  {
    title: "The Celestial Orders",
    body: [
      "No one except God knows the full number of angels. The teaching presents 100 angelic tribes or legions, arranged in orders: Aga'izt, Kirubel, Surafel, Haylat, Arbab, Menabirt, Slatanat, Mekuanint, Liqanat, and Mela'ekt.",
      "The Cherubim bear the Throne of the Trinity. The Seraphim are angels of praise, with six wings, crying Holy, Holy, Holy. The Powers are led by St. Michael. The Principalities are led by St. Gabriel. The Thrones are led by St. Raphael.",
      "The angels dwell in three celestial realms called Iyor, Rama, and Erer. After the devil fell through pride, the angelic legions were reduced from 100 to 99 and the leaders from 10 to 9. They do not leave their stations unless commanded by the Creator.",
    ],
    references: ["Daniel 7:10", "Ezekiel 1:6-19", "Isaiah 6:2-3", "Enoch 10", "Luke 1:19"],
  },
  {
    title: "Nature of Angels",
    body: [
      "Angels differ from humans because they are spiritual and incorporeal in comparison to us. They do not hunger, thirst, need shelter, marry, reproduce, grow old, or die. Their food is the praise of God, and their drink is divine love.",
      "They are free from negligence, possess immense knowledge, embody meekness and patience, and praise God continuously like a running stream.",
      "They are still finite creatures. St. John of Damascus explains that angels are called incorporeal compared to us, but compared with God, only God is absolutely incorporeal and unsearchable.",
    ],
    references: ["Tobit 12:19", "Matthew 22:30-31", "Luke 20:36", "2 Peter 2:11", "1 Corinthians 13:12"],
  },
  {
    title: "Names and Appearance of Angels",
    body: [
      "The teaching says angelic names reveal the work or mystery of God rather than exhausting the angels' true essence. Gabriel points to God and man; Michael means Who is like God?",
      "In Scripture, angels appear in forms humans can receive: fire, cloud and light, ordinary men, prophets, horses and chariots of fire, linen garments with gold, humble messengers, and glory surrounding the shepherds.",
      "These appearances do not mean angels are formless. They manifest in ways suited to human understanding.",
    ],
    references: ["Exodus 3:2-4", "Exodus 13:21", "Judges 6:12-23", "2 Kings 6:16-17", "Daniel 10:5", "Luke 1:12-13", "Luke 2:29-30"],
  },
  {
    title: "Functions of Angels",
    body: [
      "Angels constantly praise God, saying Holy, Holy, Holy. They bring good news from God to mankind, grant understanding and wisdom, deliver people from destruction, and carry human prayers and righteous deeds before God's throne.",
      "They also execute divine judgment when commanded. The teaching describes angels of judgment as zealous and firm servants of God's righteousness.",
    ],
    references: ["Isaiah 6", "Daniel 3:12-30", "Psalm 34:7", "Psalm 91:10-12"],
  },
  {
    title: "Guardian Angels",
    body: [
      "The teaching says each person has a guardian angel, supported by Psalm 91. St. Michael guarded Israel and revealed himself as commander of the Lord's host to Joshua.",
      "Guardian angels are also appointed over animals, plants, earth, sun, moon, stars, and creation. St. Basil teaches that unless we perform evil deeds, our guardian angel does not depart from us; sin drives the guardian away as smoke drives bees from a hive.",
    ],
    references: ["Psalm 91:10-12", "Joshua 5:14-15", "Jude 1:9", "Jubilees 2:6-8"],
  },
  {
    title: "Angels as Servants of the Church",
    body: [
      "Holy angels serve the Church because the Church is the Body of Christ. They announced the Incarnation, praised at the Nativity, guided the Holy Family to Egypt, ministered to Christ in temptation, strengthened Him in Gethsemane, proclaimed the Resurrection, witnessed the Ascension, and will accompany Him at the Second Coming.",
      "They also served the apostles: freeing them from chains, directing Philip to the Ethiopian eunuch, judging persecutors, and comforting Paul during shipwreck.",
      "The teaching closes by asking how we can repay these protectors who pray for our salvation, rejoice in our repentance, and shield our paths. The answer is praise to God who granted them to us.",
    ],
    references: ["Acts 5:17-20", "Acts 8:26", "Acts 12:7-23", "Acts 27:20-25", "Luke 15:7", "Revelation 7:12"],
  },
  {
    title: "Cherubim, Seraphim, and Liturgical Symbolism",
    body: [
      "The Cherubim are described as bearers of the Throne, adorned with eyes because God reveals hidden things to them. Their faces and forms are linked by the Fathers to the Evangelists and to Christ's saving work: Incarnation, Sacrifice, Resurrection, and Ascension.",
      "The Seraphim means burning or fire. They stand near the fiery throne of God and chant Holy, Holy, Holy. St. Epiphanius compares them to deacons who initiate praise in the Church.",
      "The teaching links the angelic hymn to the Trisagion of the Liturgy and says the angels never depart from the Church where the Body and Blood of Christ are offered. It also compares the Cross, the Cherubim, and the Virgin Mary as throne-bearing mysteries.",
    ],
    references: ["Daniel 7:9", "Isaiah 6:2-3", "Revelation 4:4", "Revelation 5:8", "Luke 24:4"],
  },
  {
    title: "Interface Notes from the Supplied Text",
    body: [
      "The supplied notes recommend using these profiles for category filters such as All, Nine Saints, Archangels, Martyrs, Monastic Saints, Royal Saints, and Church Fathers.",
      "They also recommend using St. Frumentius and St. Yared for Catechumen Corner, and contrasting St. George with St. Gebre Menfes Kidus for the Repentance page: public spiritual warfare and hidden interior transformation.",
      "The notes suggest using feast days for Saint of the Day rotation and presenting detailed saint pages with Life and Legacy, Miracles and Icons, and Liturgical Readings.",
    ],
    references: [],
  },
]

export default function SaintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredSaints = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return saints.filter((saint) => {
      const categoryMatch = activeCategory === "All" || saint.categories.includes(activeCategory)
      const searchMatch =
        !q ||
        saint.name.toLowerCase().includes(q) ||
        saint.title.toLowerCase().includes(q) ||
        saint.details.toLowerCase().includes(q) ||
        saint.feastDay.toLowerCase().includes(q) ||
        saint.readings.some((reading) => reading.toLowerCase().includes(q))
      return categoryMatch && searchMatch
    })
  }, [activeCategory, searchQuery])

  return (
    <main className="min-h-screen bg-[#f8efe4] text-[#241711]">
      <section className="relative overflow-hidden border-b border-[#e5c9aa] bg-[radial-gradient(circle_at_top_left,rgba(255,138,30,0.18),transparent_34%),linear-gradient(135deg,#fffaf4_0%,#f0d2ac_100%)]">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-[0.04]" />
        <div className="container relative mx-auto px-4 py-16 md:py-20">
          <Badge className="mb-5 border-[#d85d16]/20 bg-white/70 text-[#b64312]">ቅዱሳን</Badge>
          <h1 className="max-w-4xl text-5xl font-black tracking-tight md:text-7xl">Ethiopian Orthodox Saints</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-8 text-[#6f5a4d]">
            Lives, feast days, legacies, Synaxarium context, and readings from the information you provided.
          </p>
          <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-full border border-[#d8b996] bg-white/80 px-5 py-3 shadow-sm">
            <Search className="h-5 w-5 text-[#c44b14]" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search saints, feast days, readings..."
              className="border-0 bg-transparent px-0 text-base shadow-none focus-visible:ring-0"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={
                activeCategory === category
                  ? "shrink-0 rounded-full bg-[#d84f12] text-white hover:bg-[#b93f0d]"
                  : "shrink-0 rounded-full border-[#dfc09d] bg-white/70 text-[#5a3d2b] hover:bg-white"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#c44b14]">Directory</p>
            <h2 className="text-3xl font-black">{filteredSaints.length} profiles</h2>
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredSaints.map((saint) => (
            <motion.article
              key={saint.name}
              variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }}
            >
              <Card className="h-full overflow-hidden rounded-[1.35rem] border-[#ddb58d] bg-white/85 shadow-[0_18px_45px_-28px_rgba(104,47,16,0.45)]">
                <CardContent className="flex h-full flex-col p-0">
                  <div className="bg-gradient-to-br from-[#7c2d12] via-[#c2410c] to-[#eab308] p-6 text-white">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/16 ring-1 ring-white/25">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-black leading-tight">{saint.name}</h3>
                    <p className="mt-2 text-sm font-bold text-white/85">{saint.title}</p>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 space-y-3 text-sm font-semibold text-[#6f5a4d]">
                      <div className="flex gap-2">
                        <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#d84f12]" />
                        <span>{saint.feastDay}</span>
                      </div>
                      <div className="flex gap-2">
                        <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-[#d84f12]" />
                        <span>{saint.century}</span>
                      </div>
                    </div>

                    <p className="text-[0.98rem] leading-7 text-[#3f3028]">{saint.details}</p>
                    {saint.synaxarium ? (
                      <p className="mt-4 rounded-2xl bg-[#fff5e8] p-4 text-sm font-medium leading-6 text-[#70432c]">
                        <span className="font-black text-[#9a3412]">Synaxarium Context: </span>
                        {saint.synaxarium}
                      </p>
                    ) : null}

                    <div className="mt-5">
                      <p className="mb-2 text-xs font-black uppercase tracking-[0.16em] text-[#c44b14]">
                        Website Readings
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {saint.readings.map((reading) => (
                          <Badge key={reading} variant="outline" className="border-[#e3ba8d] bg-[#fff9f0] text-[#633c25]">
                            {reading}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {saint.categories.map((category) => (
                        <Badge key={category} className="bg-[#f05a11]/10 text-[#b64312] hover:bg-[#f05a11]/10">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="border-t border-[#e5c9aa] bg-[#fffaf2]">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#c44b14]">Teaching</p>
            <h2 className="mt-2 text-4xl font-black">Angelology and Theological Notes</h2>
            <p className="mt-3 text-base font-medium leading-7 text-[#6f5a4d]">
              The translated article and implementation notes from your attachment, organized for the saints page.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {teachingSections.map((section) => (
              <Card key={section.title} className="rounded-[1.2rem] border-[#ddb58d] bg-white shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-black text-[#2b1a12]">{section.title}</h3>
                  <div className="mt-4 space-y-3">
                    {section.body.map((paragraph) => (
                      <p key={paragraph} className="text-sm font-medium leading-7 text-[#594437]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.references.length ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {section.references.map((reference) => (
                        <Badge key={reference} variant="outline" className="border-[#e3ba8d] bg-[#fff9f0] text-[#633c25]">
                          {reference}
                        </Badge>
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ScrollToTop />
    </main>
  )
}
