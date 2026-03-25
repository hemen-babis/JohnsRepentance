export type CatechumenSection = "Foundations" | "Core Beliefs" | "Five Pillars" | "Sacrament" | "Spiritual Life"

export interface CatechumenLesson {
  id: number
  title: string
  slug: string
  description: string
  section: CatechumenSection
  duration: string
  whyItMatters: string
}

export interface TeachingSection {
  title: string
  paragraphs: string[]
}

export interface QnaItem {
  question: string
  answer: string
}

export interface QuizQuestion {
  prompt: string
  options: string[]
  answerIndex: number
  explanation: string
}

export const catechumenLessons: CatechumenLesson[] = [
  {
    id: 1,
    title: "The Ethiopian Orthodox Tewahedo Church",
    slug: "ethiopian-orthodox-tewahedo-church",
    description: "Meet the Church, her worship, her apostolic roots, and why this is the natural place to begin.",
    section: "Foundations",
    duration: "8 min read",
    whyItMatters: "It gives the learner a home before asking them to master ideas.",
  },
  {
    id: 2,
    title: "The Orthodox Creed",
    slug: "orthodox-creed",
    description: "Walk through the confession of faith that anchors Orthodox belief and prayer.",
    section: "Foundations",
    duration: "7 min read",
    whyItMatters: "The Creed becomes a map for everything that follows.",
  },
  {
    id: 3,
    title: "History of the Church",
    slug: "history-of-the-church",
    description: "See how the Church carried the faith through centuries of witness, sacrifice, and continuity.",
    section: "Foundations",
    duration: "9 min read",
    whyItMatters: "History helps newcomers understand that Orthodoxy is a living inheritance, not a trend.",
  },
  {
    id: 4,
    title: "The Trinity of God",
    slug: "trinity-of-god",
    description: "Learn the Orthodox understanding of the Father, the Son, and the Holy Spirit.",
    section: "Core Beliefs",
    duration: "10 min read",
    whyItMatters: "The Trinity is the center of Christian worship and prayer.",
  },
  {
    id: 5,
    title: "The Nature of Our Lord Jesus Christ",
    slug: "nature-of-our-lord-jesus-christ",
    description: "Understand the mystery of Christ in the Tewahedo confession with clarity and reverence.",
    section: "Core Beliefs",
    duration: "10 min read",
    whyItMatters: "Christology shapes how we speak about salvation, worship, and incarnation.",
  },
  {
    id: 6,
    title: "Mystery of the Trinity",
    slug: "five-pillars-trinity",
    description: "Learn the first pillar of mystery: the Holy Trinity, one God in three Persons.",
    section: "Five Pillars",
    duration: "8 min read",
    whyItMatters: "The confession of the Trinity stands at the center of the Church's faith.",
  },
  {
    id: 7,
    title: "Mystery of Incarnation",
    slug: "five-pillars-incarnation",
    description: "Learn the second pillar of mystery: the Incarnation of God the Son for our salvation.",
    section: "Five Pillars",
    duration: "9 min read",
    whyItMatters: "The Incarnation explains who Christ is and why salvation is possible.",
  },
  {
    id: 8,
    title: "Mystery of Baptism",
    slug: "five-pillars-baptism",
    description: "Learn the third pillar of mystery: Baptism as new birth, remission of sin, and adoption.",
    section: "Five Pillars",
    duration: "7 min read",
    whyItMatters: "Baptism is the covenant doorway into the life of grace.",
  },
  {
    id: 9,
    title: "Mystery of the Holy Communion",
    slug: "five-pillars-holy-communion",
    description: "Learn the fourth pillar of mystery: Holy Communion as true participation in Christ's Body and Blood.",
    section: "Five Pillars",
    duration: "8 min read",
    whyItMatters: "Holy Communion is the Church's supreme act of life and communion with God.",
  },
  {
    id: 10,
    title: "Mystery of the Resurrection of the Dead",
    slug: "five-pillars-resurrection",
    description: "Learn the fifth pillar of mystery: the resurrection of the dead and the last judgment.",
    section: "Five Pillars",
    duration: "8 min read",
    whyItMatters: "The resurrection frames Christian hope, judgment, and eternal life.",
  },
  {
    id: 11,
    title: "What is a Sacrament",
    slug: "what-is-a-sacrament",
    description: "Begin to see the sacraments as holy mysteries through which grace is received and lived.",
    section: "Sacrament",
    duration: "6 min read",
    whyItMatters: "This lesson prepares the learner for the sacramental path ahead.",
  },
  {
    id: 12,
    title: "The Sacrament of Baptism",
    slug: "sacrament-of-baptism",
    description: "Discover why baptism is the gateway into the life of the Church.",
    section: "Sacrament",
    duration: "8 min read",
    whyItMatters: "Baptism marks rebirth, belonging, and entry into covenant life.",
  },
  {
    id: 13,
    title: "The Sacrament of Confirmation",
    slug: "sacrament-of-confirmation",
    description: "Learn how holy chrism seals the baptized person into the life of the Spirit.",
    section: "Sacrament",
    duration: "6 min read",
    whyItMatters: "Confirmation completes initiation and strengthens the believer in grace.",
  },
  {
    id: 14,
    title: "The Sacrament of Repentance & Confession",
    slug: "sacrament-of-repentance-confession",
    description: "See confession as healing, restoration, and a continuing return to God.",
    section: "Sacrament",
    duration: "9 min read",
    whyItMatters: "Repentance is not punishment; it is the doorway back into communion.",
  },
  {
    id: 15,
    title: "The Sacrament of Eucharist",
    slug: "sacrament-of-eucharist",
    description: "Encounter the Eucharist as the heart of worship and participation in Christ’s life.",
    section: "Sacrament",
    duration: "9 min read",
    whyItMatters: "The Eucharist is the center of Orthodox sacramental life.",
  },
  {
    id: 16,
    title: "The Sacrament of Priesthood",
    slug: "sacrament-of-priesthood",
    description: "Understand spiritual fatherhood, service, and ordained ministry in the Church.",
    section: "Sacrament",
    duration: "7 min read",
    whyItMatters: "It clarifies how the Church shepherds, teaches, and serves the faithful.",
  },
  {
    id: 17,
    title: "The Sacrament of Anointing of the Sick",
    slug: "sacrament-of-anointing-of-the-sick",
    description: "Learn how the Church prays for healing in body and soul through holy anointing.",
    section: "Sacrament",
    duration: "6 min read",
    whyItMatters: "This sacrament reveals the Church’s pastoral care in weakness and suffering.",
  },
  {
    id: 18,
    title: "The Sacrament of Matrimony",
    slug: "sacrament-of-matrimony",
    description: "See Christian marriage as covenant, mutual sanctification, and holy witness.",
    section: "Sacrament",
    duration: "7 min read",
    whyItMatters: "It shows how Orthodox life is lived not only in church, but in the home.",
  },
  {
    id: 19,
    title: "Salvation in the Orthodox Concept",
    slug: "salvation-in-the-orthodox-concept",
    description: "Explore salvation as healing, union with God, and lifelong transformation.",
    section: "Spiritual Life",
    duration: "10 min read",
    whyItMatters: "It reframes salvation as a living path, not a single slogan.",
  },
  {
    id: 20,
    title: "Saints’ Intercession & Veneration",
    slug: "saints-intercession-veneration",
    description: "Learn why the Church honors the saints and asks for their prayers with confidence.",
    section: "Spiritual Life",
    duration: "8 min read",
    whyItMatters: "It helps newcomers see the communion of saints as family, not distance from Christ.",
  },
  {
    id: 21,
    title: "Fasting",
    slug: "fasting",
    description: "Discover fasting as a school of freedom, prayer, and spiritual discipline.",
    section: "Spiritual Life",
    duration: "7 min read",
    whyItMatters: "Fasting trains the heart to desire God more deeply.",
  },
  {
    id: 22,
    title: "Works and Faith",
    slug: "works-and-faith",
    description: "See how Orthodox life holds belief and lived obedience together.",
    section: "Spiritual Life",
    duration: "8 min read",
    whyItMatters: "This lesson guards against shallow belief and empty performance alike.",
  },
]

export const catechumenSections = [
  {
    key: "Foundations" as const,
    title: "Foundations",
    description: "Begin with the Church, the Creed, and the story that gives this path its home.",
  },
  {
    key: "Core Beliefs" as const,
    title: "Core Beliefs",
    description: "Move into the heart of Orthodox teaching about God and our Lord Jesus Christ.",
  },
  {
    key: "Five Pillars" as const,
    title: "Five Pillars of Mystery",
    description: "Pause between core beliefs and sacraments to see the great mysteries that frame the Church's faith.",
  },
  {
    key: "Sacrament" as const,
    title: "Sacrament",
    description: "Walk through the holy mysteries that shape worship, repentance, healing, and communion.",
  },
  {
    key: "Spiritual Life" as const,
    title: "Spiritual Life",
    description: "Learn the rhythm of salvation, fasting, the saints, and faithful living.",
  },
]

export const catechumenStats = [
  { label: "Formation path", value: "22 lessons" },
  { label: "Starting point", value: "Lesson 1" },
  { label: "Designed for", value: "Newcomers" },
]

export const catechumenLessonRecaps: Record<string, string[]> = {
  "ethiopian-orthodox-tewahedo-church": [
    "The Ethiopian Orthodox Tewahedo Church understands her story as beginning in the first covenant and continuing into the new covenant in Christ.",
    "The Church received the Gospel early and was rooted apostolically through the Ethiopian Eunuch, St. Frumentius, and the See of St. Mark.",
    "The monastic life, Ge'ez Scripture, chant, and sacramental continuity all shape the Church's identity today.",
  ],
  "history-of-the-church": [
    "The issue between Monophysitism and Dyophysitism centers on how the Church speaks about the union of divinity and humanity in our Lord Jesus Christ after the Incarnation.",
    "The fundamental dogmas in the Nicene Creed remain the doctrinal base for confessing Christ as perfect God and perfect man, consubstantial with the Father and truly incarnate for us.",
    "Relations with Orthodox Chalcedonian Churches require clarity about the difference between Oriental Orthodox and Chalcedonian communions without collapsing them into one body.",
    "Dialogue between Orthodox Chalcedonian and Non-Chalcedonian Churches matters because many disagreements have involved vocabulary, interpretation, and the language used after the union.",
  ],
  "orthodox-creed": [
    "The Creed is the Church's shared confession of faith about the Father, the Son, the Holy Spirit, the Church, baptism, resurrection, and the life to come.",
    "It is not only something to study. It is also something to pray and confess together.",
    "Reading it regularly helps root the heart and mind in the faith of the Church.",
  ],
  "trinity-of-god": [
    "The Church confesses one God in three Persons: Father, Son, and Holy Spirit.",
    "The Trinity is known because God reveals Himself, not because human reason can fully contain Him.",
    "The Son and the Holy Spirit are fully divine, of one Being with the Father.",
  ],
  "nature-of-our-lord-jesus-christ": [
    "Our Lord Jesus Christ is truly God and truly man, the Incarnate Logos.",
    "His divine and human natures are united without mingling, confusion, alteration, or separation.",
    "The Ethiopian Orthodox Tewahedo confession is Miaphysite, meaning one united incarnate nature of the Logos, not a denial of Christ's humanity.",
  ],
  "five-pillars-trinity": [
    "The Ethiopian Orthodox Church teaches the Mystery of the Trinity as one God in three Persons.",
    "The Father, the Son, and the Holy Spirit are three in name, person, and deed, yet one in essence, divinity, existence, and will.",
    "This mystery stands as the first pillar supporting the confession of faith.",
  ],
  "five-pillars-incarnation": [
    "The Mystery of Incarnation teaches that God the Son came down from heaven and took flesh and soul from the Holy Virgin Maryam.",
    "Our Lord Jesus Christ is confessed as one incarnate nature of God the Word without change, confusion, separation, or division.",
    "The Incarnation reveals the reason for salvation and the union of divinity and humanity in Christ.",
  ],
  "five-pillars-baptism": [
    "Baptism is given for the remission of sin, adoption by the Triune God, and inheritance of the kingdom of God.",
    "It is called a mystery because the water becomes the water of grace through the prayer of the Church.",
    "The Ethiopian Orthodox Church teaches that whoever believes and is baptized shall be saved.",
  ],
  "five-pillars-holy-communion": [
    "The Mystery of the Holy Communion is the supreme act of life and intimate communion with God.",
    "The bread and wine are changed into the real flesh and blood of the Son of God through the liturgical blessing.",
    "The Church teaches this mystery as real participation in Christ, not a mere symbol.",
  ],
  "five-pillars-resurrection": [
    "The Mystery of the Resurrection of the Dead teaches life after death and the final resurrection of all.",
    "Both the righteous and the unrighteous will rise when Our Lord comes again in glory to judge the living and the dead.",
    "The Church's hope in resurrection rests on the resurrection of Our Lord and Savior Eyesus Christos.",
  ],
  "what-is-a-sacrament": [
    "A sacrament is a holy mystery in which visible signs communicate invisible grace.",
    "The sacraments are effective because they are joined to the risen Christ through the Holy Spirit.",
    "The seven holy sacraments accompany the believer through the stages of spiritual life.",
  ],
  "sacrament-of-baptism": [
    "Baptism is new birth through water and the Spirit and the entrance into the life of the Church.",
    "It unites the believer to the death and resurrection of Christ.",
    "The Church baptizes by triple immersion and also baptizes infants because baptism is the covenant doorway of grace.",
  ],
  "sacrament-of-confirmation": [
    "Confirmation gives the gift and seal of the Holy Spirit after baptism.",
    "It strengthens the believer for spiritual growth and struggle.",
    "The Ethiopian Orthodox Tewahedo Church confirms infants immediately after baptism according to apostolic tradition.",
  ],
  "sacrament-of-repentance-confession": [
    "Repentance and confession heal the spiritual wounds received after baptism.",
    "The sacrament has scriptural roots and includes honest confession, spiritual guidance, and absolution.",
    "True confession requires repentance, truthfulness, and hope in the mercy of Christ.",
  ],
  "sacrament-of-eucharist": [
    "In the Eucharist, believers truly partake of the Body and Blood of our Lord Jesus Christ under the appearance of bread and wine.",
    "The Church confesses the real presence, the sacrificial character of the Eucharist, and the need for worthy communion.",
    "The Eucharist is the crown of the sacraments and the table of communion, remission, and unity.",
  ],
  "sacrament-of-priesthood": [
    "Priesthood is the sacrament of ordination by the laying on of hands for service in the Church.",
    "The Church recognizes ordered ranks of deacons, priests, and bishops, each with real responsibility.",
    "Priesthood is honor, stewardship, consecration, and service after the example of Christ Himself.",
  ],
  "sacrament-of-anointing-of-the-sick": [
    "The anointing of the sick is the Church's sacrament of healing for bodily and psychological illness.",
    "Its scriptural roots appear in Christ's commands, apostolic healing with oil, and James 5:14-16.",
    "The Church receives it in faith while leaving the result to the mercy and wisdom of God.",
  ],
  "sacrament-of-matrimony": [
    "Marriage is a sacrament because earthly union is taken up into the life of the Kingdom and sanctified by grace.",
    "Orthodox marriage is patterned after the mystery of Christ and the Church in Ephesians 5.",
    "Its goal is not mere personal fulfillment but a shared path toward heaven.",
  ],
  "salvation-in-the-orthodox-concept": [
    "Salvation is made available only through the blood of our Lord Jesus Christ.",
    "The Orthodox teaching presents salvation as a whole life: we have been saved, are being saved, and hope to be saved in the last day.",
    "Faith, the saving sacraments, repentance, endurance, and good works all belong to this living path.",
  ],
  "saints-intercession-veneration": [
    "The Church honors the saints without putting them in the place of Christ, who alone saves.",
    "Scripture shows that God accepts intercession and honors His saints with grace and power.",
    "The communion between the heavenly Church and the Church on earth is treated as a lived spiritual reality.",
  ],
  fasting: [
    "Fasting is part of Christian worship and spiritual struggle, not an optional extra.",
    "The Church fasts corporately and personally, combining abstinence, prayer, and restraint in food.",
    "Fasting trains the believer in repentance, discipline, and longing for God.",
  ],
  "works-and-faith": [
    "Faith alone is not presented as sufficient in the lesson; living obedience is required.",
    "Good works are inward and outward actions pleasing to God and empowered by grace.",
    "The believer needs both free will and the grace of God in order to walk faithfully.",
  ],
  bibliography: [
    "The bibliography gathers the printed and online sources behind the catechism lessons.",
    "It is meant as a follow-on reading list for deeper study after the core catechumen path.",
    "The references especially track the lessons from Trinity onward and related sacramental and spiritual themes.",
  ],
  "letter-from-our-lord-jesus-christ": [
    "The closing letter turns information into invitation.",
    "Its emphasis is Christ's patience, love, and nearness to the struggling soul.",
    "The catechumen path ends with a call to respond personally to the Lord.",
  ],
}

export const catechumenMemoryVerses: Record<string, { reference: string; text: string }> = {
  "trinity-of-god": {
    reference: "Genesis 1:26",
    text: "Let Us make man in Our image, according to Our likeness.",
  },
  "nature-of-our-lord-jesus-christ": {
    reference: "Matthew 16:15",
    text: "But who do you say that I am?",
  },
  "five-pillars-trinity": {
    reference: "Matthew 28:19",
    text: "Baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
  },
  "five-pillars-incarnation": {
    reference: "John 1:14",
    text: "And the Word became flesh and dwelt among us.",
  },
  "five-pillars-baptism": {
    reference: "John 3:5",
    text: "Unless one is born of water and the Spirit, he cannot enter the kingdom of God.",
  },
  "five-pillars-holy-communion": {
    reference: "John 6:56",
    text: "He who eats My flesh and drinks My blood abides in Me, and I in him.",
  },
  "five-pillars-resurrection": {
    reference: "John 5:28-29",
    text: "All who are in the graves will hear His voice and come forth.",
  },
  "what-is-a-sacrament": {
    reference: "Proverbs 9:1",
    text: "Wisdom has built her house, She has hewn out her seven pillars.",
  },
  "sacrament-of-baptism": {
    reference: "Psalm 51:7",
    text: "Purge me with hyssop, and I shall be clean; wash me and I shall be whiter than snow.",
  },
  "sacrament-of-confirmation": {
    reference: "Ezekiel 36:26-27",
    text: "I will give you a new heart and put a new spirit within you; I will put My Spirit within you and cause you to walk in My statutes.",
  },
  "sacrament-of-repentance-confession": {
    reference: "Psalm 32:5",
    text: "I acknowledged my sin to You, and my iniquity I have not hidden.",
  },
  "sacrament-of-eucharist": {
    reference: "Psalm 23:5",
    text: "You prepare a table before me in the presence of my enemies.",
  },
  "sacrament-of-priesthood": {
    reference: "Revelation 4:4",
    text: "Around the throne were twenty-four thrones, and on the thrones I saw twenty-four elders sitting, clothed in white robes; and they had crowns of gold on their heads.",
  },
  "sacrament-of-anointing-of-the-sick": {
    reference: "Malachi 4:2",
    text: "But to you who fear My name The Sun of Righteousness shall arise with healing in His wings.",
  },
  "sacrament-of-matrimony": {
    reference: "Genesis 2:18",
    text: "It is not good that man should be alone; I will make him a helper comparable to him.",
  },
  "salvation-in-the-orthodox-concept": {
    reference: "Hebrews 2:3",
    text: "How shall we escape if we neglect so great a salvation.",
  },
  "saints-intercession-veneration": {
    reference: "Mark 14:9",
    text: "Wherever this gospel is preached throughout the whole world, what this woman did will also be spoken of as a memorial to her.",
  },
  fasting: {
    reference: "Matthew 9:15",
    text: "The days will come when the bridegroom will be taken away from them, and then they will fast.",
  },
}

export const catechumenLessonQuizzes: Record<string, QuizQuestion[]> = {
  "ethiopian-orthodox-tewahedo-church": [
    {
      prompt: "Why does the Church describe Ethiopia's story as beginning before the New Testament?",
      options: [
        "Because it sees Ethiopia as formed in the first covenant and fulfilled in Christ",
        "Because the New Testament is not important",
        "Because Christianity arrived in Ethiopia only in modern times",
        "Because the Church rejects the Apostles",
      ],
      answerIndex: 0,
      explanation: "The lesson teaches continuity from the first covenant into the new covenant, not a rejection of the New Testament.",
    },
    {
      prompt: "Who was consecrated as the first Bishop of Ethiopia by St. Athanasius?",
      options: ["St. Yared", "King Ezana", "St. Frumentius", "Menelik I"],
      answerIndex: 2,
      explanation: "St. Frumentius, also called Abba Selama, was consecrated as the first Bishop of Ethiopia.",
    },
    {
      prompt: "What did the Nine Saints help strengthen in Ethiopia?",
      options: [
        "Monastic life and the Church's Tewahedo identity",
        "Roman political rule",
        "A rejection of Scripture",
        "The end of liturgical worship",
      ],
      answerIndex: 0,
      explanation: "The Nine Saints helped root monastic life, Scripture, and the Tewahedo confession deeply in the Church.",
    },
    {
      prompt: "Why do the rock-hewn churches of Lalibela matter in this history?",
      options: [
        "They show how deeply the faith shaped Ethiopian life and holy imagination",
        "They were built as military towers",
        "They replaced all earlier worship",
        "They were intended to end pilgrimage",
      ],
      answerIndex: 0,
      explanation: "The lesson presents Lalibela as a powerful sign of how the faith shaped Ethiopian spiritual life.",
    },
  ],
  "history-of-the-church": [
    {
      prompt: "How does the Ethiopian Orthodox Church describe her place in relation to the One, Holy, Universal and Apostolic Church?",
      options: [
        "She considers herself to belong to the Church founded by Jesus Christ",
        "She considers herself to have begun only after Chalcedon",
        "She considers herself outside apostolic Christianity",
        "She considers herself only a local institution and not catholic",
      ],
      answerIndex: 0,
      explanation: "The section opens by saying the Ethiopian Orthodox Church considers itself to belong to the One, Holy, Universal and Apostolic Church founded by Jesus Christ.",
    },
    {
      prompt: "What expression does the lesson say is more accurate than calling the Church 'Monophysite'?",
      options: [
        "Non-Chalcedonian Orthodox Churches",
        "Eastern Orthodox Churches",
        "Roman Catholic Churches",
        "Nestorian Churches",
      ],
      answerIndex: 0,
      explanation: "The text says these churches are best referred to as the non-Chalcedonian Orthodox Churches because the term used was miaphysis, not Monophysis.",
    },
    {
      prompt: "What does the term 'Tewahido' emphasize in the lesson?",
      options: [
        "The inseparable unity of the Godhead and manhood in the Person of Christ",
        "That Christ became only divine after the union",
        "That Christ remained two separate persons after the union",
        "That Christ's humanity was absorbed and lost",
      ],
      answerIndex: 0,
      explanation: "The lesson defines Tewahido as 'made one' and says it best conveys the inseparable unity of Christ's Godhead and manhood.",
    },
    {
      prompt: "Why does the lesson say dialogue between Chalcedonian and non-Chalcedonian churches remains important?",
      options: [
        "Because many disagreements involved vocabulary and interpretation after the union",
        "Because the Ethiopian Church accepted Eutyches",
        "Because the Nicene Creed was abandoned",
        "Because Christ was denied to be perfect God and perfect man",
      ],
      answerIndex: 0,
      explanation: "The text says the issue involved vocabulary and obscurity in terms such as physis, hypostasis, ausia, prosopon, atreptos, mia, and mono.",
    },
  ],
  "orthodox-creed": [
    {
      prompt: "Why does the Creed begin with 'We believe'?",
      options: [
        "Because faith is received, confessed, and lived by the Church together",
        "Because belief is only a private opinion",
        "Because doctrine does not matter",
        "Because prayer is separate from belief",
      ],
      answerIndex: 0,
      explanation: "The Creed begins with shared faith that is confessed and lived in the Church.",
    },
    {
      prompt: "How does the Creed speak about the Son?",
      options: [
        "Begotten of the Father before all ages, true God of true God",
        "Created later than the angels",
        "Only a great teacher",
        "Separate from the Father's divinity",
      ],
      answerIndex: 0,
      explanation: "The Creed confesses the eternal Son as true God of true God.",
    },
    {
      prompt: "What does the Creed confess about the Church?",
      options: [
        "She is one, holy, universal, and apostolic",
        "She is temporary and optional",
        "She is only local and not universal",
        "She has no link to baptism",
      ],
      answerIndex: 0,
      explanation: "The Creed confesses one holy, universal, and apostolic Church.",
    },
    {
      prompt: "What should a catechumen do with the Creed?",
      options: [
        "Read and pray it regularly so faith is strengthened",
        "Memorize it only for debate",
        "Ignore it after baptism",
        "Treat it only as history",
      ],
      answerIndex: 0,
      explanation: "The explanation teaches that the Creed is both confession and prayer and should be read regularly.",
    },
  ],
  "trinity-of-god": [
    {
      prompt: "What does the Church mean by the Trinity?",
      options: [
        "One Being in three Persons: Father, Son, and Holy Spirit",
        "Three separate gods",
        "One Person with three temporary roles",
        "A doctrine invented by philosophers",
      ],
      answerIndex: 0,
      explanation: "The lesson teaches one God in three Persons, not three gods and not one Person with changing masks.",
    },
    {
      prompt: "How do we know the Trinity?",
      options: [
        "By God's own self-revelation",
        "By laboratory experiment",
        "By mythology",
        "By political decision",
      ],
      answerIndex: 0,
      explanation: "The doctrine arises from God's revelation of Himself, not from experiment or speculation.",
    },
    {
      prompt: "Why is the Holy Spirit confessed as divine?",
      options: [
        "Because He is of one and the same Being with the Father and the Son",
        "Because He is a created force",
        "Because He is less than the Son",
        "Because He only appears in symbols",
      ],
      answerIndex: 0,
      explanation: "The lesson insists that the Spirit is truly divine, not an intermediate power.",
    },
    {
      prompt: "What does the story of St. Augustine on the beach teach?",
      options: [
        "That God truly reveals Himself yet still exceeds our comprehension",
        "That the Trinity can be completely explained by reason",
        "That mystery means contradiction",
        "That faith is unnecessary",
      ],
      answerIndex: 0,
      explanation: "The story teaches humility before divine mystery, not total explanation.",
    },
    {
      prompt: "What does the term homoousion defend in Trinitarian teaching?",
      options: [
        "That the Son and the Spirit are of one and the same Being with the Father",
        "That the Son is less than the Father",
        "That the Holy Spirit is only symbolic",
        "That God changes His nature in history",
      ],
      answerIndex: 0,
      explanation: "The lesson presents homoousion as a key term safeguarding the full divinity of the Son and the Spirit.",
    },
    {
      prompt: "Why must the economic Trinity and the theological Trinity not be separated?",
      options: [
        "Because God truly reveals in history who He eternally is",
        "Because history creates God's being",
        "Because the Church rejects revelation",
        "Because doctrine has no relation to salvation",
      ],
      answerIndex: 0,
      explanation: "The lesson insists that the God revealed in salvation history is the same God who eternally is Father, Son, and Holy Spirit.",
    },
  ],
  "nature-of-our-lord-jesus-christ": [
    {
      prompt: "How does the Church confess our Lord Jesus Christ?",
      options: [
        "As truly God and truly man, the Incarnate Logos",
        "As only divine and not human",
        "As only human and not divine",
        "As two separate persons",
      ],
      answerIndex: 0,
      explanation: "The lesson confesses the Incarnate Logos as fully divine and fully human.",
    },
    {
      prompt: "What words are used to protect the union of Christ's two natures?",
      options: [
        "Without mingling, confusion, alteration, or separation",
        "By blending into a third nature",
        "By dividing Christ into two persons",
        "By denying His humanity",
      ],
      answerIndex: 0,
      explanation: "These are the protective words repeated throughout the lesson.",
    },
    {
      prompt: "What does Miaphysite mean here?",
      options: [
        "One united incarnate nature of the Logos, fully divine and fully human",
        "Only one divine nature with no humanity",
        "Two unrelated persons",
        "A rejection of the incarnation",
      ],
      answerIndex: 0,
      explanation: "The lesson carefully distinguishes Miaphysite from Monophysite.",
    },
    {
      prompt: "What remained united to both Christ's body and spirit even in death?",
      options: [
        "The Divine Logos",
        "Only His human will",
        "Only the body",
        "Nothing remained united",
      ],
      answerIndex: 0,
      explanation: "The Divine Logos remained united with both, which is central to the lesson's explanation.",
    },
    {
      prompt: "What does the term 'One Nature of God the Incarnate Logos' refer to in the lesson?",
      options: [
        "The one incarnate entity formed from the union of the divine and human natures",
        "Only Christ's divinity",
        "Only Christ's humanity",
        "A denial that Christ took real flesh",
      ],
      answerIndex: 0,
      explanation: "The lesson says this phrase refers to the result of the union, not to either nature by itself.",
    },
    {
      prompt: "Why does the lesson use the examples of iron and fire and of spirit and body?",
      options: [
        "To help explain union without confusion, while admitting that no example is perfect",
        "To replace revealed doctrine with physics",
        "To prove Christ had only one element in His humanity",
        "To deny the mystery of the Incarnation",
      ],
      answerIndex: 0,
      explanation: "The examples are teaching aids only, and the lesson explicitly says they are imperfect analogies.",
    },
  ],
  "what-is-a-sacrament": [
    {
      prompt: "What is a sacrament in broad terms?",
      options: [
        "A holy mystery joining a visible sign to invisible grace",
        "Only a symbol with no real grace",
        "A private feeling",
        "A purely material action",
      ],
      answerIndex: 0,
      explanation: "The lesson explains sacraments as visible and invisible together.",
    },
    {
      prompt: "Why are sacraments fitting for human beings?",
      options: [
        "Because human beings are body and soul and receive the spiritual through the material",
        "Because human beings are pure spirits",
        "Because matter is evil",
        "Because grace works without Christ",
      ],
      answerIndex: 0,
      explanation: "The lesson stresses that man is made of matter and spirit, so material signs fit our nature.",
    },
    {
      prompt: "What gives the sacraments their power?",
      options: [
        "Their contact with the risen Christ through the Holy Spirit",
        "Magic in the material itself",
        "Human memory alone",
        "The eloquence of the priest",
      ],
      answerIndex: 0,
      explanation: "The sacraments are not magical signs. They communicate grace because they are joined to Christ.",
    },
    {
      prompt: "How many holy sacraments are listed in the lesson?",
      options: ["Seven", "Three", "Ten", "Twelve"],
      answerIndex: 0,
      explanation: "The lesson lists seven holy sacraments.",
    },
    {
      prompt: "Why does the lesson use the brazen serpent as an example?",
      options: [
        "To show how God uses a material sign as a means of faith and healing fulfilled in Christ",
        "To deny the Old Testament",
        "To show that sacraments are magical objects",
        "To teach that matter has power apart from God",
      ],
      answerIndex: 0,
      explanation: "The brazen serpent is used to show material sign, faith, healing, and fulfillment in Christ.",
    },
    {
      prompt: "Which three things does the lesson say are required for a sacrament?",
      options: [
        "Institution by Christ, an outward sign, and the power of conferring grace",
        "Music, candles, and fasting",
        "A priest, a building, and a choir",
        "Only private belief",
      ],
      answerIndex: 0,
      explanation: "The lesson states these three requirements directly.",
    },
  ],
  "sacrament-of-baptism": [
    {
      prompt: "Why is baptism called the door into the Church?",
      options: [
        "Because it is the sacrament by which a person is born again and enters the life of the Church",
        "Because it replaces faith",
        "Because it is only a public symbol",
        "Because it is optional for salvation",
      ],
      answerIndex: 0,
      explanation: "The lesson teaches that baptism is the entry into the Church and the other sacraments.",
    },
    {
      prompt: "How does baptism save according to the lesson?",
      options: [
        "By uniting us to Christ's death and resurrection",
        "By washing only the body",
        "By giving knowledge without grace",
        "By replacing the cross",
      ],
      answerIndex: 0,
      explanation: "The lesson repeatedly explains baptism as participation in Christ's death and resurrection.",
    },
    {
      prompt: "How is baptism normally practiced in the Church?",
      options: [
        "By triple immersion in the name of the Holy Trinity",
        "Only by symbolic sprinkling",
        "Without water",
        "Only for adults",
      ],
      answerIndex: 0,
      explanation: "The Ethiopian Orthodox Tewahedo Church baptizes by triple immersion.",
    },
    {
      prompt: "Why does the Church baptize infants?",
      options: [
        "Because baptism is necessary for new birth and the covenant includes children",
        "Because infants already need no grace",
        "Because Scripture forbids their baptism",
        "Because baptism can wait until old age",
      ],
      answerIndex: 0,
      explanation: "The lesson gives several reasons for infant baptism rooted in Scripture and covenant life.",
    },
    {
      prompt: "How does the lesson describe St. John's baptism compared to Christian baptism?",
      options: [
        "As preparatory and not yet the full Christian baptism joined to the cross and the Holy Spirit",
        "As exactly the same in every respect",
        "As greater than Christian baptism",
        "As unnecessary for repentance",
      ],
      answerIndex: 0,
      explanation: "The lesson says pre-Pentecost baptisms were preparatory, not the full sacramental baptism of the Church.",
    },
    {
      prompt: "When does the Church allow baptism by sprinkling?",
      options: [
        "Only in exceptional medical cases where immersion cannot be done and death is near",
        "Whenever someone prefers it",
        "For all adult baptisms",
        "Instead of using water",
      ],
      answerIndex: 0,
      explanation: "The lesson makes sprinkling an emergency exception, not the normal practice.",
    },
  ],
  "sacrament-of-confirmation": [
    {
      prompt: "What does confirmation give to the baptized person?",
      options: [
        "The gift and seal of the Holy Spirit",
        "A replacement for baptism",
        "Only church membership paperwork",
        "A temporary blessing with no lasting grace",
      ],
      answerIndex: 0,
      explanation: "The lesson presents confirmation as the gift and seal of the Holy Spirit.",
    },
    {
      prompt: "How does Acts show confirmation as distinct from baptism?",
      options: [
        "People were baptized first and later received the Holy Spirit through apostolic laying on of hands",
        "No baptized person ever received the Holy Spirit",
        "The Apostles rejected baptism",
        "Confirmation replaced Pentecost",
      ],
      answerIndex: 0,
      explanation: "Acts 8 and Acts 19 are used to show the distinction clearly.",
    },
    {
      prompt: "What is chrismation?",
      options: [
        "Holy anointing through which the gift of the Holy Spirit is given",
        "A substitute for the Creed",
        "A civil ceremony",
        "A later optional custom with no apostolic roots",
      ],
      answerIndex: 0,
      explanation: "The lesson explains chrismation as the sacramental continuation of apostolic laying on of hands.",
    },
    {
      prompt: "Why does the Ethiopian Orthodox Tewahedo Church confirm infants immediately after baptism?",
      options: [
        "Because this follows Scripture and apostolic tradition",
        "Because the Spirit only works in infancy",
        "Because children cannot receive the Spirit later",
        "Because baptism is incomplete and invalid",
      ],
      answerIndex: 0,
      explanation: "The lesson explicitly contrasts this practice with delay and grounds it in apostolic tradition.",
    },
    {
      prompt: "What does the lesson call confirmation in relation to Pentecost?",
      options: [
        "A kind of Pentecost to the baptized person",
        "A replacement for Pentecost",
        "A memorial only",
        "A sacrament without the Spirit",
      ],
      answerIndex: 0,
      explanation: "The lesson explicitly calls confirmation a kind of Pentecost to the baptized person.",
    },
    {
      prompt: "Why was chrismation established in addition to laying on of hands?",
      options: [
        "Because the Apostles could not physically travel everywhere as the number of believers grew",
        "Because laying on of hands was rejected",
        "Because the Holy Spirit stopped working",
        "Because baptism became unnecessary",
      ],
      answerIndex: 0,
      explanation: "The lesson explains chrismation as the Church's sacramental continuation of apostolic practice as the Church expanded.",
    },
  ],
  "sacrament-of-repentance-confession": [
    {
      prompt: "Why is repentance and confession needed after baptism?",
      options: [
        "Because baptized people still receive spiritual wounds and need healing and reconciliation",
        "Because baptism has no grace",
        "Because sin after baptism cannot be addressed",
        "Because only public shame can heal sin",
      ],
      answerIndex: 0,
      explanation: "The lesson presents confession as healing for spiritual wounds received after baptism.",
    },
    {
      prompt: "What scriptural words of Christ are central to this sacrament?",
      options: [
        "Whatever you bind on earth shall be bound in heaven, and if you forgive the sins of any, they are forgiven",
        "Judge no one and never speak of sin",
        "Forget all commandments",
        "Only angels may hear confession",
      ],
      answerIndex: 0,
      explanation: "The lesson centers the sacrament on Christ's words to His disciples about binding, loosing, and forgiving sins.",
    },
    {
      prompt: "Which of these is one of the stages of confession listed in the lesson?",
      options: [
        "Confession to oneself, to God, to the priest, and where needed to the offended person",
        "Confession only to strangers",
        "Confession only through silence",
        "Confession only after public punishment",
      ],
      answerIndex: 0,
      explanation: "The lesson lists clear stages or forms of confession.",
    },
    {
      prompt: "What makes confession acceptable?",
      options: [
        "Repentance, truthfulness, self-examination, and hope in Christ's grace",
        "Excusing oneself and hiding details",
        "Despair without repentance",
        "Telling only part of the truth",
      ],
      answerIndex: 0,
      explanation: "The lesson stresses honest repentance, truthfulness, and hope rather than despair or self-defense.",
    },
    {
      prompt: "What does the lesson say about confession without repentance and hope?",
      options: [
        "It is unacceptable and does not benefit the person",
        "It is enough by itself",
        "It is better than truthfulness",
        "It always guarantees healing",
      ],
      answerIndex: 0,
      explanation: "The lesson uses Pharaoh and Judas as warnings that confession without repentance and hope is not saving.",
    },
    {
      prompt: "Why does the lesson say Christ's words about forgiving and retaining sins imply hearing confession?",
      options: [
        "Because the disciples could not know what to forgive or retain without hearing the sins",
        "Because forgiveness never needs discernment",
        "Because priests invent sins",
        "Because only public sin exists",
      ],
      answerIndex: 0,
      explanation: "The lesson makes this exact argument from Christ's words to the disciples.",
    },
  ],
  "sacrament-of-eucharist": [
    {
      prompt: "What does the Church confess about the Eucharist?",
      options: [
        "That believers truly partake of the Body and Blood of Christ under the appearance of bread and wine",
        "That it is only a memorial with no real grace",
        "That it replaces baptism",
        "That it is only for priests to see",
      ],
      answerIndex: 0,
      explanation: "The lesson states clearly that the Eucharist is the true Body and Blood of Christ sacramentally given.",
    },
    {
      prompt: "What is one major benefit of worthy communion named in the lesson?",
      options: [
        "Abiding in Christ and receiving eternal life",
        "Freedom from prayer",
        "Removal of the need for repentance",
        "Permission to ignore the Church",
      ],
      answerIndex: 0,
      explanation: "The lesson lists abiding in Christ, eternal life, remission of sins, growth, and unity among the benefits.",
    },
    {
      prompt: "What does the Church teach about the Eucharist as sacrifice?",
      options: [
        "It is both a sacrament and a true offering to God",
        "It is not linked to sacrifice at all",
        "It is only a private meal",
        "It denies the sacrifice of the Cross",
      ],
      answerIndex: 0,
      explanation: "The lesson explicitly teaches that the Eucharist is both sacrament and sacrifice.",
    },
    {
      prompt: "Why must communion not be taken unworthily?",
      options: [
        "Because one who communes unworthily eats and drinks judgment to himself",
        "Because worthiness means social status",
        "Because only clergy can be worthy",
        "Because the bread and wine stay ordinary",
      ],
      answerIndex: 0,
      explanation: "The lesson cites 1 Corinthians 11 on the serious consequences of unworthy communion.",
    },
    {
      prompt: "What Old Testament figures does the lesson name as symbols of the Eucharist?",
      options: [
        "Melchizedek's offering, the Passover lamb, and the manna",
        "Only Noah's ark",
        "Only David's harp",
        "Only the bronze laver",
      ],
      answerIndex: 0,
      explanation: "The lesson explicitly points to Melchizedek, the Passover, and manna as Eucharistic symbols.",
    },
    {
      prompt: "What does the lesson call the Eucharist in relation to the sacrifice of the Cross?",
      options: [
        "A bloodless sacrifice offered sacramentally until the Lord's second coming",
        "A denial of the Cross",
        "A second crucifixion in history",
        "Only a meal of remembrance",
      ],
      answerIndex: 0,
      explanation: "The lesson carefully distinguishes the Cross from the Eucharistic offering while still calling the Eucharist a true sacrifice.",
    },
    {
      prompt: "Why does the lesson reject memorialism or real absence?",
      options: [
        "Because the biblical, logical, and historical arguments all support the real presence",
        "Because symbols are never used in Scripture",
        "Because the Church denies John 6",
        "Because only philosophy matters",
      ],
      answerIndex: 0,
      explanation: "The lesson organizes its defense of the real presence under biblical, logical, and historical reasons.",
    },
  ],
  "sacrament-of-priesthood": [
    {
      prompt: "What is priesthood according to the lesson?",
      options: [
        "A sacrament of ordination by the laying on of hands for ministry in the Church",
        "Only an administrative title",
        "A temporary volunteer position",
        "A rank with no sacramental authority",
      ],
      answerIndex: 0,
      explanation: "The lesson defines priesthood as a holy sacrament given through ordination.",
    },
    {
      prompt: "Who has the authority to ordain by laying on of hands?",
      options: ["The bishop", "Any visitor", "Only civil rulers", "Only readers"],
      answerIndex: 0,
      explanation: "The sacrament is performed by the bishop through laying on of hands.",
    },
    {
      prompt: "Which major priestly orders are listed in the lesson?",
      options: [
        "Deacons, priests, and bishops",
        "Only bishops",
        "Only monks and deacons",
        "Readers and singers only",
      ],
      answerIndex: 0,
      explanation: "The lesson explains the ranks within deacons, priests, and bishops.",
    },
    {
      prompt: "How does the lesson connect priesthood to Christ?",
      options: [
        "It shows Christ practicing and blessing the work that becomes the essence of the Church ranks",
        "It says Christ had no link to priesthood",
        "It says priesthood came centuries later without biblical roots",
        "It reduces priesthood to administration only",
      ],
      answerIndex: 0,
      explanation: "The lesson closes by showing Christ as the model and fulfillment of priestly service.",
    },
    {
      prompt: "What does the lesson say about the honor of priesthood?",
      options: [
        "No one takes this honor to himself; it is a divine calling and stewardship",
        "It is mainly social prestige",
        "It belongs only to civil rulers",
        "It has no link to holiness",
      ],
      answerIndex: 0,
      explanation: "Hebrews 5:4 and 1 Timothy 5:17 are used to present priesthood as God-given honor and stewardship.",
    },
    {
      prompt: "Which rank is described as having the fullness of priesthood and power to ordain?",
      options: ["Bishop", "Reader", "Epsaltos", "Archdeacon"],
      answerIndex: 0,
      explanation: "The lesson says the bishop is distinguished by the perfection of priesthood and the authority to ordain.",
    },
    {
      prompt: "Why does the lesson spend time on the different ranks of deacons and priests?",
      options: [
        "To show that each rank has real service and is not lowly or empty",
        "To create status competition",
        "To replace pastoral care with titles",
        "To argue that only bishops matter",
      ],
      answerIndex: 0,
      explanation: "The ending of the lesson makes this exact point: each rank is honored because Christ Himself blessed service.",
    },
  ],
  "sacrament-of-anointing-of-the-sick": [
    {
      prompt: "What does the Anointing of the Sick chiefly address?",
      options: [
        "Physical and psychological illness, with prayer for healing and forgiveness",
        "Only church administration",
        "Only public teaching",
        "Only baptism",
      ],
      answerIndex: 0,
      explanation: "The lesson distinguishes it from confession and presents it as the sacrament for bodily and related healing.",
    },
    {
      prompt: "Which apostolic text is central for this sacrament?",
      options: [
        "James 5:14-16",
        "Romans 1:1-3",
        "Philemon 1:1-2",
        "3 John 1:1",
      ],
      answerIndex: 0,
      explanation: "The lesson centers the sacrament on St. James' instruction to call the priests and anoint the sick with oil.",
    },
    {
      prompt: "Why might someone receive this sacrament and not be physically healed?",
      options: [
        "Because of lack of faith or because God in His wisdom permits the illness for spiritual benefit",
        "Because the sacrament has no grace",
        "Because priests cannot pray",
        "Because only apostles could use oil",
      ],
      answerIndex: 0,
      explanation: "The FAQ gives both unbelief and God's wise providence as reasons this may happen.",
    },
    {
      prompt: "Why is this sacrament given to the whole congregation on the last Friday of Lent?",
      options: [
        "Because it is not performed during Holy Week and it helps the faithful continue in the Paschal struggle",
        "Because it replaces Holy Week prayers",
        "Because only that day has grace",
        "Because it is only symbolic",
      ],
      answerIndex: 0,
      explanation: "The lesson gives both the Holy Week liturgical reason and the pastoral reason tied to fasting.",
    },
    {
      prompt: "How does the lesson distinguish the Anointing of the Sick from Repentance and Confession?",
      options: [
        "One is for bodily and psychological illness, while the other is for spiritual wounds after baptism",
        "They are exactly the same sacrament",
        "The anointing is only for clergy",
        "Confession is only for physical illness",
      ],
      answerIndex: 0,
      explanation: "The lesson opens by explicitly distinguishing the two sacraments as two forms of healing.",
    },
    {
      prompt: "Why does the lesson say St. James' teaching matters here?",
      options: [
        "Because it shows the sacrament belongs to priestly prayer and anointing handed down from the Lord",
        "Because it replaces the Gospels",
        "Because it denies healing",
        "Because it makes oil unnecessary",
      ],
      answerIndex: 0,
      explanation: "The lesson treats James 5 as apostolic and sacramental, not merely general advice.",
    },
  ],
  "sacrament-of-matrimony": [
    {
      prompt: "What does the lesson present as the deeper pattern of Christian marriage?",
      options: [
        "The mystery of Christ and the Church",
        "A civil partnership only",
        "A temporary arrangement for social order",
        "A private bond without sacramental meaning",
      ],
      answerIndex: 0,
      explanation: "Ephesians 5 is central in the lesson's teaching on matrimony.",
    },
    {
      prompt: "According to the lesson, what is the ultimate goal of Orthodox marriage?",
      options: ["Economic stability", "Social approval", "Heaven", "Having children only"],
      answerIndex: 2,
      explanation: "The lesson explicitly says the goal of marriage is not merely personal fulfillment but heaven.",
    },
  ],
  "salvation-in-the-orthodox-concept": [
    {
      prompt: "What does the lesson call the source of remission of sins?",
      options: [
        "The blood of our Lord Jesus Christ",
        "Human effort by itself",
        "Knowledge alone",
        "A momentary feeling of peace",
      ],
      answerIndex: 0,
      explanation: "The lesson repeatedly anchors salvation in the blood of Christ and Hebrews 9:22.",
    },
    {
      prompt: "How does the lesson describe salvation in Orthodox teaching?",
      options: [
        "As one isolated past moment only",
        "As a whole-life reality",
        "As unrelated to sacraments",
        "As guaranteed without endurance",
      ],
      answerIndex: 1,
      explanation: "The lesson says salvation is the story of the whole life.",
    },
  ],
  "saints-intercession-veneration": [
    {
      prompt: "Why does the lesson say asking the saints to intercede does not replace Christ?",
      options: [
        "Because the saints save us directly",
        "Because Christ alone saves from sin",
        "Because the saints are greater than Christ",
        "Because intercession is only symbolic",
      ],
      answerIndex: 1,
      explanation: "The lesson explicitly says only Lord Jesus Christ saves, while the saints pray for us.",
    },
    {
      prompt: "Which idea is used to defend the saints' awareness of earthly events?",
      options: [
        "Angels rejoice over one sinner who repents",
        "The saints are asleep and know nothing",
        "Prayer stops after death",
        "Only the living can intercede",
      ],
      answerIndex: 0,
      explanation: "Luke 15:10 is cited to show heavenly awareness and rejoicing.",
    },
  ],
  fasting: [
    {
      prompt: "What does the lesson say Christians do during a fast after the abstinence period ends?",
      options: [
        "They eat vegetarian food",
        "They may eat anything immediately",
        "They stop praying",
        "They only drink water for the whole season",
      ],
      answerIndex: 0,
      explanation: "The lesson explains abstinence from food and water for a period, followed by vegetarian food.",
    },
    {
      prompt: "Which verse does the lesson use to show that fasting remains expected in Christian life?",
      options: ["Matthew 9:15", "John 11:35", "Acts 1:8", "Romans 12:2"],
      answerIndex: 0,
      explanation: "Matthew 9:15 is the headline verse and a key proof text in the lesson.",
    },
  ],
  "works-and-faith": [
    {
      prompt: "What does the lesson say about faith without works?",
      options: ["It is complete", "It is dead", "It is higher than obedience", "It replaces grace"],
      answerIndex: 1,
      explanation: "The lesson cites James 2:26 and Matthew 7:21.",
    },
  ],
}

export const historyTeachingSections: TeachingSection[] = [
  {
    title: "The Issue Between Monophysitism and Dyophysitism",
    paragraphs: [
      "The Ethiopian Orthodox Church considers itself to belong to the One, Holy, Universal and Apostolic Church founded by Jesus Christ. It is holy because its founder, Jesus Christ, is holy; it is catholic because the whole world is its province and because it is universal in time and place; it is apostolic because it was established on earth by the apostles of Christ.",
      "The Ethiopian Church belongs to the group of Orthodox Churches wrongly termed \"Monophysites\" but which prefer the epithet \"Non-Chalcedonian\". The other members of this family are the Coptic, Armenian, Syrian and Indian Churches. Together with the Roman Catholic Church and the Byzantine Orthodox Church they comprised the One Church for four centuries until the division arose on account of the Council of Chalcedon in 451 which insisted that Christ had the two natures of humanity and divinity.",
      "Dyophysites teach that, after the union, Christ retained the natures of divinity and humanity in His one Person in such a way that He ate food, slept, laughed, suffered, walked as man in the human nature, but healed the sick and resuscitated Lazarus as God in the divine nature. Thus He is one Person in two natures of humanity and divinity. The wrongly called Monophysites reject the allegation that they teach one Nature and one Person in Christ. The teaching of the Ethiopian Church may thus be summarized:",
      "1. The Ethiopian Church rejects Eutyches, who is believed to have taught that in Christ the human Nature was absorbed by the divine Nature. Nestorius also is excluded.",
      "2. Dioscorus, whom the Council of Chalcedon deposed, is accepted. But it should be remembered that the Council of 451 did not believe that Dioscorus was a heretic. Dioscorus did not deny the continuance of Godhead and manhood in the One Christ after their union and he agreed with the Council that the teaching which Eutyches was understood to hold was heretical.",
      "3. The teaching of the Ethiopian Church is the faith of the Fathers expounded by the great theologians of the Alexandrine tradition, especially by St. Cyril and his illustrious theological followers. Accordingly the Ethiopian Church maintains that Christ is perfect God and perfect man, at once consubstantial with the Father and with us; the divinity and the humanity continuing in Him without mixture or separation, confusion or change. He is one and the same person both in his eternal pre-existence and also in the economy, in which he performs the redeeming work of God on behalf of man, from the indivisible state of union of Godhead and manhood.",
      "4. The Church abides by the formula \"The one Incarnate Nature of God the Word\", on which St. Cyril of Alexandria increasingly insisted, a formula which was accepted as correct by the Council of Ephesus in 431 A.D and which, after the Council of Chalcedon, the Chalcedonian side in the East itself admitted.",
      "5. It is unfair for the Church to be nicknamed \"Monophysites\" by the faithful who accept the Chalcedonian formula of \"two Natures in the one Person of Jesus Christ\", because the expression used by the non-Chalcedonian side was always miaphysis, and never Monophysis (mia standing for a composite unity unlike mone standing for an elemental unity). Therefore these churches are best referred to as the non-Chalcedonian Orthodox Churches.",
      "6. \"Tewahido\" is the Ethiopian term (meaning \"made one\") which is the best expression conveying the faith of the Church, since it emphasizes the inseparable unity of the Godhead and manhood in the Person of Christ. The Church's official title is \"The Ethiopian Orthodox Tewahido Bete Christian.\"",
      "7. After the Union, Christ was no longer in two natures. The two natures became united into one nature without separation, without confusion and without change. Thus He was at the same tithe perfect God and perfect man. This is the union of the natures in the Incarnation. After the union Christ is not two persons or two natures. but one Person, one incarnate Nature of God the Son, with one will, but being at once divine and human. If you separate the natures after the union and say that Christ is in two natures, you will be confronted with serious problems. You will have to admit, for instance, that Christ was crucified merely as a man and that therefore he did not redeem the world, for God alone is able to accomplish the world's redemption. In brief, it is held that Christ, in acting, acted as a united being, not separately as man or separately as God.",
      "8. Proof that we believe in the continuance of divinity and humanity in the One Christ may be illustrated:",
      "a) In the Communion we receive the very body and blood of Jesus Christ. These belong to man, humanity, and we know that Jesus Christ is God, divinity.",
      "b) The present Liturgy can be used as a criterion of the Church. There it is openly expressed that there is divinity and humanity in Christ.",
      "c) The Chalcedonian formula was rejected because it was thought to destroy the one person of Christ and there was no clear distinction between \"nature\" and \"person\", person meant nature.",
      "d) We believe the Nicean Creed in which the divinity and humanity of Christ are set forth, and in the Creed of the liturgy we declare our belief in the co-equality of Jesus Christ with God the Father, and belief in his having grown like men, yet without sin or evil, and in his having taken flesh from Mary.",
      "e) The confession of Faith by the Emperor Claudius declares that Jesus Christ was perfect man and perfect God.",
      "Monophysitism is rejected. It is a question of error in vocabulary, the concepts of Nature and Person not being clear and there being obscurity in philosophical terms such as physis, hypostasis, ausia, prosopon, atreptos, mia, mono etc. As to the two natures of Christ the Dyophysites and non-Chalcedonians are one, it is a matter of interpretation after the union of the two natures. Happily the Dyophysites are currently realizing the position.",
    ],
  },
  {
    title: "Fundamental Dogmas in the Nicene Creed",
    paragraphs: [
      "The following is the Creed said in the Mass, called \"Amakniyo of the Apostles\", the one which the Apostles gave in Jerusalem: -",
      "\"We believe in one God, Maker of all creation, Father of our Lord and our God and our Saviour Jesus Christ, because his nature is unsearchable.",
      "As we have before declared (i.e. in Didascalia), he is without beginning and without end, but he is ever living, and he has light which is never extinguished, and he can never be approached.",
      "He is not two or three, and no addition can be made to him; but he is only one, living for ever, because he is not hidden that he cannot be known, but we know him perfectly through the law and the prophets, that he is almighty and has authority over all the creation.",
      "One God, Father of our Lord and our Saviour Jesus Christ, who was begotten before the creation of the world, the only begotten Son coequal with him, creator of all the hosts, the principalities and the dominions:",
      "Who in the last days was pleased to become man, and took flesh from our Lady Mary, the holy Virgin, without the seed of man, and grew like men yet without sin or evil; neither was guile found in his mouth.",
      "Then he suffered, died in the flesh, rose from the dead on the third day, ascended unto heaven to the Father who sent him, sat down at the right hand of Power, sent to us the Paraclete, the Holy Spirit, who proceeds from the Father, and saved all the world, and who is co-eternal with the Father and the Son.",
      "We say further that all the creatures of God are good and there is nothing to be repented of, and the spirit, the life of the body, is pure and Holy in all.",
      "And we say that marriage is pure and childbirth is undefiled because God created Adam and Eve to multiply. We under stand further that there is in our body a soul which is immortal and does not perish with the body.",
      "We repudiate all the works of heretics and all schisms and transgression of the law, because they are for us impure.",
      "We also believe in the resurrection of the dead, the righteous and sinners; and in the Day of Judgment, when every one will be recompensed according to his deeds.",
      "We also believe that Christ is not in the least degree inferior because of his incarnation, but he is God the Word who truly became man, and reconciled mankind to God being the High Priest of the Father.",
      "Henceforth let us not be circumcised like the Jews. We know that he who had to fulfil the law and the prophets has already come.",
      "To him, for whose coming all people looked forward, Jesus Christ, who is descended from Judah, from the root of Jesse, whose government is upon his shoulder: to him be the glory, thanksgiving, greatness, blessing, praise, song, both now and ever and world without end, Amen.\"",
    ],
  },
  {
    title: "Relations with Orthodox Chalcedonian Churches",
    paragraphs: [
      "Even though the Ethiopian Orthodox Church in some respects differs from the Orthodox Chalcedonies Churches and has no canonical communion with them, it has always maintained a sense of unity with them; the origin after all is the same, Emperor Constantine wrote a letter in 356 A.D in which he addressed the king of Ethiopia Ezana and his brother “my precious brothers”. The Roman Emperor Justin asked Caleb to help the oppressed Christians in the Yemen in the sixth century. During the last quarter of the nineteenth century the Chalcedonies Orthodox Church made efforts for the progress of the Ethiopian monks. Emperor Yohannes invited the Russian Church to send missionaries to the country.",
      "Representatives of the Greek, Russian, Rumanian and Yugoslavian Churches have repeatedly visited the Church. Recently the Russian Orthodox Church assisted the St. Paul’s school for church students by offering equipment of a Physics Laboratory. Scholarships have been made available for ecclesiastical studies in these churches. Publications are regularly exchanged. In turn the Ethiopian Church sends missions and delegations to these Churches and takes an active part in the conferences organized for the benefit common to Orthodoxy. In her relations with the Chalcedonies Orthodox Churches the Ethiopian Church will continue to proceed from the desire to “keep unity of the Spirit in the bond of peace”. (Eph. 4: 3).",
      "Ethiopian Students are sent to Greece, Russia and Rumania for higher ecclesiastical studies and visits are regularly received and sent.",
    ],
  },
  {
    title: "Dialogue Between Orthodox Chalcedonian and Non-Chalcedonian Churches",
    paragraphs: [
      "Up to the fifth century Christianity was one. The Nestorians were condemned at the Council of Ephesus in 431 A.D giving rise to the Nestorian Church Following the Council of Chalcedony in 451 A.D which condemned the so-called Monophysitcs, there arose a division which caused the separation between the Copts, the Ethiopians, the Syrians and the Armenians on the one hand and the Byzantine and Latin body of Churches on the other. In the eleventh century came the Great Schism between the Latinos and the Byzantine when the Byzantine Patriarchies in the East formed what is now known as the Eastern Orthodox Church.",
      "The Ethiopian Church has never tended in fuse with one or other of the two great churches of Christianity, the Orthodox and the Catholic. There was a time when fusion with the Catholics nearly materialized in the 17th century as the extraordinary Father Paez, a Spanish Jesuit, succeeded in converting Emperor Susenyos to Roman Catholicism. He tried to force his subjects adopt Catholicism but failed. The Orthodox Church made efforts in the 19th century and did not get better results. Many times it was believed that union was to be achieved. Emperor Menelik, however, was of the opinion that if his Church attached itself to Constantinople or Moscow, it would lose its independence and original characteristics; he refused to sign any formal agreement.",
      "The Pan-Orthodox meeting at Rhodes in 1961 considered relationships with the Oriental Orthodox Churches (Armenian, Coptic, Syrian, Ethiopian and Indian) to be one of most urgent matters in the realm of ecumenical relationships. The same had been felt by those Orthodox from both sides who participated in various meetings of the economical movement in the last two decades.",
      "Accordingly in 1964 a theological consultation took place at Aarhus, Denmark, between these churches. The purpose of this meeting was to investigate the different theological interpretations regarding the Christological definition of the Fourth Ecumenical Council in Chalcedon.",
      "The Eastern Orthodox participants included the very Rev. Archpriest Vitally Borncoy (Russian Orthodox Church). The Rt. Rev, Emilianos (Ecumenical Patriarchate of Constantinople), Professor J.K. Kariniris (Church of Greece), the Rev. Professor J. Megendorff (Russian Orthodox Greek Catholic Church of North America). The Oriental Orthodox participants included Lique Siltanat Habte Mariam Workneh (Ethiopian Orthodox Church), Dr. Karma Nazir Khella (Coptic Orthodox Church), His Grace Archbishop Mar Severius Zekke Incas of Mosul (Syrian Orthodox Church), His Grace Metropolitan Mar Thome Dionysus, Pathanapuram Kerala, India (Orthodox Syrian Church of the East), the Rev. Professor V.C. Samuel (Orthodox Syrian Church of the East(, His Grace Bishop Karekin Sarkissian (Armenian Apostolic Church), Dr. Getachew Haile (Ethiopian Orthodox Church).",
      "An extraordinary clear agreement was reached concerning the essence of the Christological dogma, something of the greatest importance for other meetings and negotiations between these Churches. This first step was followed by other efforts sponsored by the Holy Synods of the Churches with the hope that in the near future the happy stage of restoring unity in the Orthodox world be reached. It is of interest to note that as very Rev. Archpriest Vitaly Borovoy of WCC for the Russian Orthodox Church has remarked, the question pertaining to the ways and means of an eventual reunion of Christians in the One Holy Catholic and Apostolic Church, and in particular the reunion of the Oriental national churches which reject the Council of chalcedony with the Orthodox Church which accepts the Council is not new. It appeared at the very initial stages of the schism. Negotiations lasted, with interruptions for entire centuries. It is strongly believed that this time a real henosis dogmatic (love for the truth) will be realized, together with our communion in sacris and a common participation in the life of the One Holy Catholic and Apostolic Church, without prejudice to the jurisdictional independence and autocephaly of all our churches, which would keep their national historical characteristics.",
      "Edited by Aymero W and Joachim M., The Ethiopian Orthodox Church, published by the Ethiopian Orthodox mission, Addis Ababa 1970.",
    ],
  },
]

export const historyLessonConclusion = [
  "The main point of this lesson is clarity: the Ethiopian Orthodox Tewahedo Church is Oriental Orthodox.",
  "It is not the same communion as Eastern Orthodox, Roman Catholic, Protestant, or Anglican churches, even though all stand within the broad history of Christianity.",
  "The Council of Chalcedon matters because it became a dividing point in how churches were grouped and how Christ was confessed.",
  "As a catechumen, you should leave this lesson able to answer simply where the Ethiopian Church stands and why that distinction matters.",
]

export const trinityCatechism = [
  {
    question: "What do we believe of the mystery of Trinity in Unity?",
    answer:
      "Firstly, we believe in the one Eternal and Everlasting God, the one only perfect Being. Secondly, that He is one Being in three Persons. Thirdly, that He alone is the Creator of all things and the Governor of the universe.",
  },
  {
    question: 'What is meant by "the only perfect Being"?',
    answer:
      "This means that He alone possesses the personal perfections which no one shares with Him. He is self-existing, holy, good, almighty, all-wise, present everywhere, pure, incomprehensible, near to all, and the Author of every existing thing.",
  },
  {
    question: 'What is meant by His being "One Being in three Persons"?',
    answer:
      "It means that God is one Being of one substance, but in three Persons: the Father, the Son, and the Holy Spirit.",
  },
  {
    question: "Are the Persons equal in perfection?",
    answer:
      "Yes. They are equal in eternity, holiness, glory, goodness, wisdom, will, power, immortality, and every perfect attribute, because their substance, divinity, and sovereignty are one.",
  },
]

export const trinityTeachingSections: TeachingSection[] = [
  {
    title: "Opening Verse",
    paragraphs: [
      "“Let Us make man in Our image, according to Our likeness.” (Gen 1:26)",
    ],
  },
  {
    title: "The Triunity of God",
    paragraphs: [
      "Lecture VII: The Triunity of God",
    ],
  },
  {
    title: "St. Augustine and the Mystery",
    paragraphs: [
      "One day St. Augustine was walking on the sandy beach by the sea. There churned in his mind the mystery of the Holy Trinity. He was talking to himself, “One God, but Three Persons. Three Persons—not three gods but One God. What does it mean? How can it be explained? How can my mind take it in",
      "And so he was tormenting his mind and beating his brain, when he saw a little boy on the beach. He approached him to see what he was doing. The child had dug a small hole in the sand. With his little hands he was carrying water from the sea and was dumping it in the little hole. St. Augustine asked, “What are you doing, my child?” The child replied, “I want to put all the water of the sea into this hole.”",
      "Once more St. Augustine asked, “But is it possible for all the water of this great sea to be contained in this little hole?” And the child asked him in return, “If the water of the finite sea cannot be contained in this little hole, then how can The Infinite Triune God be contained in your mind?” And the child disappeared; he was actually an angel!",
    ],
  },
  {
    title: "The Doctrine Comes from Revelation",
    paragraphs: [
      "The doctrine of The Holy Trinity is not merely an “article of faith” which men are called to“believe.” It is not simply a dogma, which the Church requires its members to “accept in faith.” Neither is the doctrine of The Holy Trinity the invention of scholars and the result of intellectual speculation or philosophical thinking. The doctrine of the Holy Trinity arises from God’s Own revelation about Himself; God being God, all our knowledge of Him comes by divine revelation, for it is impossible for us to know God without His willingness to be known. God is known only as He makes Himself known to us through the revealing and saving agency of His Word and Spirit.",
    ],
  },
  {
    title: "Revelation Through the Son",
    paragraphs: [
      "God revealed Himself through Himself, through the incarnation of His Son among us as our Saviour and by the power of His Spirit. The Christian doctrine of God is thus inescapably and essentially Chr1'st0centrz'c, for it pivots upon God’s self-revelation and self-communication in the incarnation, in an objective manifestation, an imprint of the divine Hypostasis, which is identical with the very Being of God Himself. This does not mean that all our knowledge of God can be reduced to Christology, but that, as there is only one Mediator between God and man, who is Himself both God and Man, and only one revelation of God in which He Himself is its actual content, all authentic knowledge of God is derived and understood in accordance with the incarnate reality of God’s self-revelation in Lord Jesus Christ, and is formulated in doctrinal coherence with Christology. This is to say that doctrinal statements about God are possible and true only when Christologically grounded, for only in Lord Jesus Christ do we really have to do with an objective personal self-revelation of God which bridges the distance between God and us and which is identical with the very Being of God Himself.",
    ],
  },
  {
    title: "The Holy Spirit and Divine Self-Revelation",
    paragraphs: [
      "It is with the same force that our knowledge and worshipping of God include the Holy Spirit. As He sends through the Son to dwell with us and open our mind toward Himself beyond ourselves, and thus to complete the circle of God's own self revelation and self imparting movement in us whereby He enables us to respond to Him in faith and understanding, the Holy Spirit is no less divine than the Son. How could the Spirit pour the love of God into our Hearts, how could the Spirit mediate Lord Jesus Christ to us, and how could our Lord Jesus be present to us in the Spirit, if the Spirit How could the Spirit pour the love of God into our hearts, how could the Spirit mediate Lord Jesus if the Spirit were not Himself divine like the Father and the Son and of one and the same Being (Homoousios) with them? Like the Son of God the Holy spirit is no mere cosmic power intermediate between God and the world, but is the very Spirit of God who eternally dwells in Him and in whom God knows Himself, so that for us to know God in His Spirit is to know Him in the hidden depths of His Triune Being as Holy Spirit as well as Father and Son.",
      "Apart from the communion of the Holy Spirit we could not enjoy the Grace of the Lord Jesus Christ and the love of God the Father. Only because God has actually made Himself known to us can we speak of Him in this way. This self-revelation of God to us as Father, Son and Holy Spirit provides for us the immediate ground in human existence and history where God may be known as He is in His Triune Reality. The immediate ground on which we actually know God in His historical self—revelation is one and the same with the ultimate ground that God Himself eternally is, for in Lord Jesus Christ and in the Holy Spirit God is wholly identical with the content of His self-revelation and self-communication.",
      "God reveals Himself through Himself, and what God communicates to us is not something of Himself but His very Self, true God from true God. In Him the Revealer and the Revealed, the Giver and the Gift are of one and the same Being. In Lord Jesus Christ God has revealed Himself and given Himself to us unreservedly in the fullness of His divine Reality, in such a way that what He reveals and gives us is grounded in His ultimate Being as God.",
    ],
  },
  {
    title: "The Deity of Christ and Homoousion",
    paragraphs: [
      "That is the central truth, the Deity of Lord Jesus Christ, upon which the Christian conception of God and of His saving activity depends, as the great theologians and councils made clear once for all in the fourth century in their formulation of the crucial concept of the homoosion applied to the Son and the Spirit as the key truth they had to maintain against threats to the Gospel from every side. At this point, it is appropriate to introduce the terms ‘immanent or theological Trinity’conomic Trinity’. The first term refers to our conceptions of God in His eternal Being and the second refers to our conceptions of God that arise out of the economy of God’s saving revelation in history.",
    ],
  },
  {
    title: "Economic and Theological Trinity",
    paragraphs: [
      "In the Gospel God does not just appear to us as Father, Son, and Holy Spirit, for He really is Father, Son, and Holy Spirit in Himself, and reveals Himself as such. Therefore, the economic Trinity and theological Trinity are not to be separated from one another for they are locked together in God’s threefold self-revelation and self-communication to us as Father, Son, and Holy Spirit. While for St. Athanasius economy and theology must be clearly distinguished, they are not to be separated from each other. If the economic Trinity and the theological Trinity were disparate, this would bring into question whether God Himself was the actual content of His revelation, and whether God Himself was really Lord Jesus Christ reconciling the world to Himself.",
      "That is the significance of the term homoousion (‘consubstantial’, of one substance, or of one and the same Being with the Father) formulated by the council of Nicea in 325 AD. If there is no real bond in God between the economic Trinity and the theological Trinity, the saving events proclaimed in the economy of the Gospel would be without any divine validity and the doctrine of the Trinity would be lacking any ultimate divine truth. The Trinitarian message of the Gospel tell us that the very contrary is the case, for in Lord Jesus Christ and in the Holy Spirit we really have to do with the Lord God Himself as our Saviour.",
    ],
  },
  {
    title: "Unity and Trinity",
    paragraphs: [
      "When we look into the Trinitarian content of this self- revelation of God as Father, Son and Holy Spirit, One Being (0usia), Three Persons (Hypostasis) we become even more aware of its intrinsically unique and exclusive nature, for to believe in God as a Trinity in His eternal Being, means renouncing every form of Unitarianism as well as of polytheism. In fact to conceive of God as Unity and Trinity, Trinity and Unity, is the most exclusive of all possible conceptions of God, not only because there is no humanly explicable way of thinking of the Three as One and the One as Three, but because of the unique Nature of God who is Father, Son, and Holy Spirit in His one eternal Being. However, we may and surely must say that the Three Persons are integrated in the One Being and the One Being is integrated in the Three Divine Persons, such that there is no One Being apart from the Three Persons, and there are no Three divine Persons apart from the One Being.",
      "The Holy Trinity is a Unity and the Unity is a Trinity, for God is Triune in Himself and it is essentially in a triune way that God makes Himself known to us. In our knowing of the Triunity of God, we are engaged in a kind of knowing in which we move from the ‘whole’ to the ‘parts’, and from the ‘parts’ to the ‘whole’, understanding the ‘parts’ in the light of the ‘whole’ and the ‘whole’ in the light of the ‘parts’.",
      "This way of speaking of the ‘whole’ and ‘parts’, however, is not strictly appropriate to God’s Triune self- revelation as Unity and Trinity and Trinity and Unity, for the three divine Persons may not be thought of as ‘parts’ of the Trinity nor may the Trinity be thought of as a ‘whole’ composed of parts’. Neither is it appropriate to our apprehension of the Holy Trinity, although it may be more appropriate when we are speaking of the ‘doctrine’ of the Trinity as a whole and the distinct doctrines’ of the Father, of the son, and of the Holy Spirit.",
    ],
  },
  {
    title: "The Limits of Our Understanding",
    paragraphs: [
      "It must also be pointed out, however, that while the Triune God reveals Himself as a whole and while it is as a whole that God is the object of our knowing, this does not mean that we can know Him wholly or have a comprehensive knowledge of Him, for in His transcendent wholeness, God eludes our comprehension.",
      "What God does allow us to apprehend of Himself breaks through the narrow confines of our grasp, so that in the very act of apprehending something of Him we know that we are incapable of comprehending Him. Even in His condescension to reveal Himself to us God infinitely exceeds what we can grasp or conceive, so that our knowledge of the whole God cannot but be ‘in part’ or ‘partial’ as St. Paul said, “Now I know in part, but then I shall know just as I also am known.” (1 Cor 13:12)",
      "All this means that in a faithfiul account of the doctrine of the Holy Trinity our thoughts cannot but engage in a deep circular movement from Unity to Trinity and from Trinity to Unity, for we are unable to speak of the whole Trinity without already speaking of the three particular Persons of the Trinity or to speak of any of the three Persons without presuming knowledge of the whole Triunity, for God is only God as He is Father, Son, and Holy Spirit. It was said above, with some reservation, that in our knowing of the Triunity of God we engage in a kind of knowing in which we move from the ‘whole’ to the ‘parts’ and from the ‘parts’ to the ‘whole’.",
      "The reason for the reservation is due to the fact that the Oneness of the Holy Trinity is a three-in-oneness, that is, a wholeness which includes the three divine Persons such that each divine Person is Himself whole God, so that the usual way of thinking in terms of the whole and the parts does not apply. As St. Gregory Nazianzen said, “No sooner do I place before the mind the One, than I am surrounded by the splendor of the Three.",
    ],
  },
  {
    title: "St. Gregory and the Way of Faith",
    paragraphs: [
      "No sooner do I distinguish the Three, than I am brought back to the One. When any one of the Three appears to me I think of Him as a whole; my eyes are filled and the greater part escapes my eye. I cannot comprehend the magnitude of the One, so as to impart a greater greatness to the Rest. When, again, I consider the Three together, I perceive but one splendor, and I cannot divide or measure the light that is one.",
      "” (Oration XL. In sanctum bqotisma, 41, PG 36:4l7C.)",
      "The fathers and theologians of the Early Church reflected upon the fact that, since the proof of an unknown reality is its own evidence and the conceptual assent or basic belief it calls forth from people, the right way for people to break through into a completely new realm of meaning or truth is the way of faith- hence the principle widely promulgated in the Church: Unless you believe you will not understand. This is certainly the case whenever we have to do with ultimate which carry their own authority calling for the intelligent commitment of belief, and provide the irreducible ground upon which rational knowledge and theological formulation take place.",
      "* This lecture is adapted from The Christian Doctrine of God’ One Being Three Persons by T. F. Torrance",
    ],
  },
]

export const fivePillarsTrinitySections: TeachingSection[] = [
  {
    title: "Five Pillars of Mystery",
    paragraphs: [
      "1. FIVE PILLARS OF MYSTERY (አምስቱ አእማደ ሚስጢር - AMISTU AEMADE MYSTIR)",
      "The Ethiopian Orthodox Church has Five Pillars of Mystery through which it teaches and demonstrates its basic religious belief. They are called Pillars of Mystery due to the fact that they support and strengthen the faithful in religious teachings as a pillar supports a roof. These mysteries have Biblical foundation (1Cor. 14:19). Accordingly, the five pillars of mystery are expressed in the Creed, which is the confession of our faith.",
    ],
  },
  {
    title: "Mystery of the Trinity (ሚስጥረ ሥላሴ)",
    paragraphs: [
      "In this section, the mystery of Unity and Trinity of the Triune God is described.",
      "The Holy Trinity is three in name, in person (Akal), in deed and one in essence, in divinity, in existence, in will.",
      "Three in name (በስም):- Father, Son, Holy Spirit (አብ- Ab፣ ወልድ - Wold፣  መንፈስ ቅዱስ-Menfes Qidus",
      "Three in deed (በግብር):- the Father is the begetter, the Son is begotten, the Holy Spirit is the one who proceeds.",
      "Three in person (በአካል):- the Father has a perfect person, the Son has a perfect person the Holy Spirit has a perfect person.",
      "The Father is the heart, the Son is the word, and the Holy Spirit is the life (breath). The Father is the heart for Himself, and He is the heart for the Son and for the Holy Spirit. The Son is the word for Himself, and He is the word for the Father, and for the Holy Spirit. And the Holy Spirit is the life (breath) for Himself, and He is the life (breath) for the Father and the Son. Even though we say the Trinity are three in name, in deed and in person; the three are one in essence, in divinity, in existence and in will; we do not mean three Gods but one God. While the Father and the Son and the Holy Spirit exist in their own perfect person, they are one in existence. (Abulidis, Faith of the Father’s Chap. 40 Verse 4:6).",
      "As Ignatius has said in the Book of the Faith of the Fathers (Haimanote Abew - ሀይማኖተ አበው) the name of the Father is not changed to be the name of the Son or the Holy Spirit. The name of the Son is not changed to be the name of the Father or the Holy Spirit, the name of the Holy Spirit is not changed to be the name of the Father or the Son. The Father is called Father but not the Son or the Holy Spirit. The Son is called Son but not the Father or the Holy Spirit. The Holy Spirit is called the Holy Spirit but not the Father and the Son. The Father is the Father, the Son is the Son, and the Holy Spirit is the Holy Spirit. The three exist eternally in their own name and person. (Faith of the Fathers Ch. 11 part 1 Verse 7.8).",
      "In their name of unity, the three are called Lord, God. Lord the Father, Lord the Son, and Lord the Holy Spirit One Lord. God the Father, God the Son, God the Holy Spirit One God. The three hundred eighteen fathers in The Book of Faith (Haimanote Abew) said “we believe in Lord the Father, in Lord the Son, in Lord the Holy Spirit. (Hai. Ab. Ch. 19 Part 1 Verse 30).",
      "The unity of God is confessed as the unity of Godhead – Melekote. The Father beget His son without days or hours; and when He beget Him, His Father was not separated from Him. Beyond time, God is the eternal One. That One is Father, Son and Holy Spirit. No one of the three Persons is prior to the other two in time. The Apostolic St. Athanasius Archbishop of Alexandria said “The Father is God, the Son is God, and the Holy Spirit is God. They are called one God but not three Gods.” (Apostolic Athanasius Faith of the Fathers Ch. 24 Part 4 Verse 4). It is stated in many places in the Old and the New Testament Books about the Oneness and Trinity of the Holy Trinity.",
      "In the Old Testament Gen. 1:26; 2:18; 3:22; 11:7; 18:1-8; Ps. 33:6; 146:5; Isa. 6:3,8",
      "In the New Testament Mt. 3:16-17; 28:19; Jn. 14:26; 2Cor. 14:13; 1Pet. 1:2; 1Jn. 5:7-8",
    ],
  },
]

export const fivePillarsIncarnationSections: TeachingSection[] = [
  {
    title: "Mystery of Incarnation (ሚስጥረ ስጋዌ)",
    paragraphs: [
      "Mystery of Incarnation means the mystery of the descending of God the Son who is one of the Trinity from heaven and taking up flesh and soul from Our Holy Mother Virgin Maryam. This is the mystery of God becoming man and man becoming God. “The word became flesh and dwelt among us.” (Jn. 1:14). Therefore the word “Tewahedo” affirms that Our Lord and Savior Eyesus Kristos is not two natures, but one incarnate nature of God the Word.",
      "The Reason for the Incarnation: The Son of God created Adam and Eve without sin and death. “God did not make death”. But, man, through his transgression brought on himself misery and suffering as well as sin and evil, and was condemned to death-death of body and soul, grave and hell (Gen.3:19-24). “For God did not make death, He takes no pleasure in destroying the living. Do not court death by the errors of your ways, nor invite destruction through the work of your hands. To exist for this he created all things the creatures of the world have health in them, in them is no fatal poison, and Hades has no power over the world. But the godless call for death with deed and word, counting him friend, they were themselves out for him; with him they make a pact, working as they are to belong to him” (Wis. 1:12-16; Rom. 6:23). “For God hath not appointed us to wrath, but to obtain salvation by Our Lord and savior Eyesus Christos” (1Thes. 5:9). Adam and Eve disgraced and impoverished themselves. They were expelled from the Garden of Eden. They brought suffering and misery and were subject to the dominion of the devil. Death reigned from Adam to Our Lord and Savior Eyesus Christos, even to them that had not sinned. (Rom. 5:12-14). They knew that, all that happened due to their transgression and violation of the commandment of God. They regretted and repented. They cried to their Creator seeking mercy. God in his forgiveness along with his judgment, hearing their cry, observing their tears and accepting their repentance, was pleased to redeem them, and gave them promise. (Isa. 63:8; Heb. 2:14-16). When the appointed time had come forth, God sent His only Begotten Son, according to the promise. God the Son, descended from heaven and was born from Our Holy Mother Virgin Maryam. He was born so that all who believe in Him would be saved. When it is said, that He became man, it is said to mean that He united to himself the body and soul of man. Then all the words of the prophets were fulfilled. (Isa. 7:14, 9:6; Mich. 5:2; Gal. 4:4). Without separation of His Divinity from His humanity and His humanity from His Divinity, He became one person, one nature without change, without confusion, without separation and without division. “He is one Son and Christos before and after His Incarnation” (Cyril. Faith of the Fathers Ch. 78 Part 48 Verse 9-18). St. Gregory of Nazianzium said “He is the only God the Son who became man and the only man who became God in unity” (Faith of the Fathers Ch. 61 part 4 Verse 23). John Chrysostom has written that the human body was honored by the union of the Divine Word. The poverty in the nature of the flesh was abolished by the Unity of the Word of God with the flesh, and the flesh retained the glory of the word of God to itself by the unity. (Jn. Chrysostom, Faith of the Fathers Ch. 66 part 9 Verse 18-19).",
      "After birth He grew like men, doing all human works except sin. He taught 33 years and 3 months in the world. For us men he died on the Cross, destroyed death by his death and saved the world. He was laid in the tomb for three days and three nights; rose from the dead on the third day; appeared to His disciples, stayed on earth for forty days, gathering His disciples and teaching them the Book of the Covenant. On the fortieth day, while the disciples beheld, He ascended unto heaven to the Father in glory praised by angels, sat at the right hand of His Father, and will come again to judge the living and the dead, when everyone will be recompensed according to his work. (Jn. 3:13; 1 Pet. 3:22; Mt. 25:31; Eph. 4:8-10; Acts 2:30; 2 Cor. 5:14). Therefore, the teaching highlighted in the mystery of Incarnation is to believe that Our Lord and Savior Eyesus Christos is the Word of the Father and of the Holy Spirit, thus Our Holy Mother Virgin Mariam is the true Mother of God; the Mother of the Word. (Cyril Hai. Ab.). This mystery also teaches us the two births of the son, His birth before the world from the Father without a mother, and his birth from the Virgin Mariam without a father.",
    ],
  },
]

export const fivePillarsBaptismSections: TeachingSection[] = [
  {
    title: "Mystery of Baptism (ሚስጥረ ጥምቀት)",
    paragraphs: [
      "Baptism is the sacrament given to all who believe in the Mystery of the Trinity and the Mystery of Incarnation for the remission of sin, to obtain adoption from the Triune God, to inherit the kingdom of God. It is called mystery, because, when the priest recites the prayer of baptism over the water and blesses it, it will be changed and become the water that flowed from the right side of Our Lord and Savior Eyesus Christos and one can receive the invisible grace of the adopted son-hood of God (Jn. 19:34-35). Whosoever believes and is baptized shall get remission of sin. “We believe in one baptism for the remission of sin” (Creed). Every person is born from God through baptism, and will be free from damnation. “He that believes and is baptized shall be saved; but he that believeth not shall be damned” (Mk. 16:16; Acts 2:28). To be born of the Trinity is for inheriting the kingdom of God. Our Lord has taught us that we cannot enter the kingdom of God except through baptism. “Verily, verily I say unto thee, except a man be born of water and Spirit, he cannot enter into the kingdom of God.” (Jn. 3:5; Tit. 3:4-7).",
      "There were prophecies and symbols foretold by the laws and the prophets about Baptism.",
      "Prophecy: - Then will I sprinkle clean water upon you, and ye shall be clean. (Ezek. 36:25; Mich 7:19)",
      "Symbols",
      "1) Circumcision: - Circumcision in the Old Testament was practiced as a sign of baptism. It was given to Abraham as a token of the Covenant. Every one that was not circumcised on the eighth day after birth was to be cut off from his people, shared not from the promise and shall have no portion from the Promised Land. The uncircumcised were not considered as the nation of God. (Gen. 17:7-14).",
      "In the New Testament, circumcision was replaced by Baptism. Every one that is not baptized was not born of God, and cannot inherit the heavenly kingdom. (Col. 2:11).",
      "2) The Ark of Noah and the crossing of Israelites across the Red Sea were symbols of baptism. (1 Pet. 3:19; 1 Cor. 10:2)",
      "To fulfill the prophesy and to make the archetype real,  Our Lord and Savior Eyesus Christos was baptized in the water of the River Jordan by the hand of John the Baptist. (Mt. 3:16; Mk. 1:9; Lk 3:21; Jn. 1:31). The Ethiopian Orthodox Church baptizes children, males on the fortieth day and females on the eightieth day. This signifies that the first persons obtained adoption from God. (Jubilee 4:2-15).",
    ],
  },
]

export const fivePillarsCommunionSections: TeachingSection[] = [
  {
    title: "Mystery of the Holy Communion (ሚስጥረ ቁርባን)",
    paragraphs: [
      "Mystery of the Holy Communion is a supreme act of life through which we can hold intimate communion with God and that which makes us one with God. “Verily, verily, I say unto you, except ye eat the flesh of the Son and Man, and drink his blood, ye have no life in you.” “Who so eateth my flesh, and drinketh my blood hath eternal life. My flesh is meat indeed, and my blood is drink indeed, for it is a real food. He that eateth my flesh, and drinketh my blood, dwelleth in me, and I in him.” (Jn. 6:53-57).",
      "There are prophecies and symbols given about the Holy Communion.",
      "1. Prophecy",
      "“Thou has put gladness in my heart, more than in the time that their corn and their wine has increased”. (Ps. 4, 7).",
      "“Wisdom has built her house, she has hewn out her seven pillars. She has killed her beasts; she hath mingled her wine; she hath also furnished her table; she hath sent forth her maidens: she cries up on the highest place of the city.” (Prov. 9:1-3).",
      "“The prime needs of human beings for living are water, wheat...and juice of grape”. (Sirach 39:26).",
      "These prophecies were foretold about Our Lord and Savior Eyesus Christos, the Lamb of Passover, who was crucified on the cross as to give His flesh and blood in the form of bread and wine.",
      "2. Symbols",
      "When the children of Israel were liberated from the bondage and went out of Egypt, they were told to kill a lamb, eat the flesh, take the blood and sprinkle it on the two side posts and on the upper door post of the houses, in order to get security from the plague of the firstborn. This was applied as a symbol of Our Lord and Savior Eyesus Christos the Son of God, who was crucified and gave his flesh and blood as a ransom to the children of men. “This is the lamb of God, who takes away the sin of the world.” (Jn. 1:29).",
      "Melchizedek, who is the archetype of the priesthood of Our Lord and Savior Eyesus Christos, the Son of God, offered a sacrifice in the form of bread and wine. (Gen. 14:18).",
      "To fulfill these prophecies and realize the symbols, examples, Our Lord and Savior Eyesus Christos on Thursday evening at the Passover, took the bread, blessed it and broke it and gave it to His disciples and said, this bread which I give you is my flesh. In the same manner He took the cup, blessed it and gave it to his disciples, saying “this is my blood which will be shed for you and for many people, for the new covenant, for the remission of sin. (Mt. 26, 28; Mk. 14:22; Lk. 22:19). This mystery is always performed in the Ethiopian Orthodox Tewahedo Church. When the priest puts bread on a paten (ፃህል-T͟sahili) and the wine in a chalice (ፅዋ-Tsiwa) and blesses them with the liturgical prayer, the bread and the wine are changed into the real flesh and blood of the Son of God. This was made clear by the scholar St. Athanasius-when he said “we believe, that the bread and the wine are bread and wine before they are blessed by the priest, but after they are blessed by the priest the bread and the wine are changed to the real flesh and blood of the Son of God.” (Ath. Faith of the Father Ch.28 Part 14 Verse 22).",
      "Therefore, the Holy Communion which the disciples received on Thursday evening, that which was crucified on the cross on Friday, and that which is being practiced at every corner to the end of the world is one and the same. The Ethiopian Orthodox Church believes and teaches, that the flesh and blood is not simply a memorial or symbolic but real flesh and blood of the Son of God. The pure sacrifice that the clergy offers is the same sacrifice that was given up on the cross on Calvary. (Jn. Chr. Liturgy 85).",
    ],
  },
]

export const fivePillarsResurrectionSections: TeachingSection[] = [
  {
    title: "Mystery of the Resurrection of the Dead (ሚስጥረ ትንሳኤ ሙታን)",
    paragraphs: [
      "Resurrection is the Mystery of life after death. All those who have departed from the time of Adam, and will pass away until the second coming of Our Lord and Savior Eyesus Christos, will be risen in the union of body and soul. The souls of the righteous shall abide in paradise and the souls of sinners in hades until the end of this world. But on the last day, when Our Lord and Savior Eyesus Christos shall come in His glory, to judge the living and the dead, the souls shall be united with their bodies on the day of resurrection and they shall rise from the dust of the earth. (Lk. 16:19-31). “Marvel not at this: for the hour is coming; in which all that are in the graves shall hear His voice and shall come forth; they that have done good, unto the resurrection of life; and they that have done evil, unto the resurrection of damnation.” (Jn. 5:28).",
      "Many passages could be cited from the Old and New Testament books about the doctrine of death and the afterlife. The word of God in Deuteronomy 32:39 “I kill, and I make alive” shows the hope of resurrection. Isaiah the prophet says “The dead men shall live, together with my dead body shall they arise. Awake and sing, ye that dwell in dust: for thy dew is as the dew of herbs, and the earth shall cast out the dead.” (Isa. 26:19-20). Daniel the prophet has written “... and at that time thy people shall be delivered, everyone that shall be found written in the book. And many of them that sleep in the dust of the earth shall awake, some to shame and everlasting contempt. And they that be wise shall shine as the brightness of the firmament; and they that turn many to righteousness as the stars forever and ever”. (Dan. 12:1-3). Job said “For I know that my redeemer liveth, and that he shall stand at the latter day, upon the earth: And though after my skin worms destroy this body, yet in my flesh shall I see God: whom I shall see for myself and mine eyes shall behold, and not another.” (Job. 19:25-27)",
      "The teaching of the resurrection of the dead is not only told orally. It has been proved in practice when many among the departed came forth out of the grave and appeared in public. The prophets Elijah and his disciple Elisha raised the dead. (1Kgs. 17:21; 2Kgs. 13:21). Our Lord and Savior Eyesus Christos and his disciples raised the dead in their ministry during the proclamation of the gospel. (Mt. 9:25; Lk. 7:15; Jn. 11:14). Likewise, the Apostles also raised the dead during their apostolic ministry. On the day of the crucifixion of Our Lord and Savior Eyesus Christos the graves were opened and bodies of many saints came out. (Mt. 27:52). All these prove the truth of the resurrection. All those that sleep in the dust of the earth shall come to life at the last judgment. Our belief in our resurrection is based on the resurrection of Our Lord and Savior Eyesus Christos. “Knowing that He which raised up the Lord Jesus shall raise up us also by Jesus, and shall present us with you.” (2 Cor. 4:14). The Church scholars Amoneos and Eusabios said “Our Lord and Savior Eyesus Christos is risen, in order to make it known to us that our body shall arise”.",
      "Resurrection is for all human beings. Both the righteous and un-righteous arise. The final resurrection awaits the last day at the second coming of Our Lord and Savior Eyesus Christos. Our Lord and Savior Eyesus Christos shall come in His glory at the end of the world to judge the living and the dead. (Ps. 50:2; Mt. 25:31-32; Rev. 1:7).",
      "At that time, He shall send forth His angels with a great sound of a trumpet. The dead shall arise. The earth will restore that which was entrusted to it. Then He shall set the righteous on his right hand, but the sinners on the left hand. All arise carrying their works which followed them from the earth; the righteous will be sanctified with the word of blessing, but the sinners will be rebuked with the word of accusation. The righteous shall shine as seven times as the sun, and inherit the kingdom of God, while the sinners shall go away into everlasting punishment prepared for the devil and his angels. (Mt. 13:42-49; 25:31-43; 2 Cor 5:10; Rev. 20:12). Thus the religious teaching of the Ethiopian Orthodox Tewahedo Church is based on the five pillars of mystery mentioned above.",
    ],
  },
]

export const christologyTeachingSections: TeachingSection[] = [
  {
    title: "The Nature of Our Lord Jesus Christ",
    paragraphs: [
      "Lecture II: The Nature of Our Lord Jesus Christ",
    ],
  },
  {
    title: "Our Faith Concerning Christology",
    paragraphs: [
      "Our Lord Jesus Christ is God Himself, the Incarnate Logos, who took to Himself a complete manhood. His Divine Nature is united with His Human Nature in a complete Hypostatic (personal) Union without mingling, confusion, alteration or separation. Furthermore, the unity between the two Natures occurred without transmutation. Thus neither the Divine Nature transmutes to the Human Nature, nor did the Human Nature transmute to the Divine.",
      "Without mingling as in the case of wheat and barely or salt and sugar. Without confusion as in the case of wine and water or tea and milk. Without alteration as in the case of chemical union: Carbon dioxide consists of Carbon and Oxygen, and the nature of both changes when they are combined; each loses some of its properties that distinguished it before this unity. In contrast, no change occurred to the Divine or Human Nature as a result of their unity. Without separation for His Divinity parted not from His Humanity for a single moment nor a twinkling of an eye.",
      "The Divine Logos was united with the Human Nature (body & spirit) that He took from Virgin Mary by the action of the Holy Spirit: The Holy Spirit purified and sanctified the Virgin so that the Child to whom she gave birth would not inherit the original sin. This unity between the Two Natures (Human & Divine) took place from the first moment of the Holy Pregnancy. As a result of this unity between both Natures (Divine & Human) inside the Virgin’s womb, One Nature (entity) was formed out of both: “The ONE Nature of God, the Incarnate Logos.” The Term “One Nature” does not refer to either ofthe Two Natures (Divine & Human), but it refers to the result of the union of Both Natures into this One Nature which is “the Nature of the Incarnate Logos”. The term “Two Natures” implies division or potential separation.",
    ],
  },
  {
    title: "Examples of the Union",
    paragraphs: [
      "Human language is inadequate when it comes to describing this union but here are two examples:",
      "a) The union between Iron & Fire:",
      "In the union of iron and fire, the iron is not changed into fire or the fire into iron. They are both united without mingling, confusion, or alteration.",
      "{At a certain temperature the iron will change and extinguishing the fire will separate them}.",
      "b) The union between the human spirit & body:",
      "The nature of the human spirit unites with the physical earthly nature of the body without mingling, confusion, alteration, or transmutation {they will separate by death and then they reunite}. This union of the two natures (spirit & body) results in ONE nature that is the human nature. The term ONE here doesn’t refer to either of the two natures (spirit — body) but it refers to the result of this union of BOTH natures into this ONE human being.",
      "Therefore, just as we say that the person is ONE nature consisting of two elements (spirit & body), we can also say about the Incarnate Logos that He is ONE entity of two natures (Divine & Human). The union of the spirit & body is a hypostatic one. So is the union of the Divine Logos & the Human Nature in the virgin’s womb. A hypostatic, real, self-essential union not a mere connection that separates as Nestorius claimed.",
      "Although a person is formed of two natures (spirit & body), nobody refers to him/her as two. All the person’s acts are attributed to this ONE nature, not to the spirit alone or the physical body alone. Similarly, all the acts of Christ should be attributed to Him as a whole, not to His Divine Nature independently or to His Human Nature independently.",
      "These examples are intended to clarify some aspects of the union but they are not perfect, just like our human language. The imperfections are put between brackets.",
    ],
  },
  {
    title: "In a Nutshell",
    paragraphs: [
      "Our Lord Jesus Christ has Two Natures:",
      "1. The Divine Nature of the LOGOS.",
      "2. The Human Nature that He took from Virgin Mary.",
      "The Human Nature is composed of Two+ Elements:",
      "a) Human Spirit.",
      "b) Human Body.",
      "The Divine Nature of the LOGOS is united with every element of the Human Nature without mingling, confusion, alteration, transmutation, or separation. As a result of this Hypostatic Union, One Entity is formed out of Both (Divine & Human) Natures. This is the “One Nature Of God, The Incarnate Logos”. When we refer to this ONE NATURE we are referring to this ONE ENTITY that resulted from the union of BOTH the Divine and Human Natures.",
      "So what happened on the cross? Our Lord Jesus Christ died on the cross. Death means that His Human Spirit was separated from His Human Body. The Divine Logos remained united with BOTH the spirit and the body after their separation. Hence, His Divinity parted not from His Humanity. This explains why the body was not corrupted in the grave and it also explains how the spirit was able to return to the body when the Resurrection took place.",
    ],
  },
  {
    title: "Are We Monophysites?",
    paragraphs: [
      "The Oriental Orthodox Churches (Coptic, Syrian, Armenian, Ethiopian, an Indian) are ‘Miaphysites’. There is a difference between the ‘Monophysites’ who believe in One Single Nature (Divine) of our Lord Jesus Christ and the ‘Miaphysites’ who believe in One United Nature or One Composite Nature (Divine & Human) of our Lord Jesus Christ. We do not believe in a Single Nature but we believe in One Incarnate Nature of the Logos.",
    ],
  },
  {
    title: "One Will and One Act",
    paragraphs: [
      "Naturally, since we believe that after the union of the Divine and Human Natures, One Nature (entity) resulted, namely, the Nature of the Incarnate Logos, we also believe in One Will and One Act for the incarnate Logos. There is no contradiction or conflict between the will and the act of the Two Natures; what the Divine Nature chooses is undoubtedly chosen by the Human Nature.",
      "Our Lord Jesus Christ said, “My food is to do the will of Him who sent Me, and to finish His work” (Jn 4:34). This proves that His will is the same as the Father’s. Certainly, the Divine Logos has the same will as the Father since He is one with Him in the Godhead. Thus, it must be that the Nature of the Incarnate Logos has One Will that is not different from the Father.",
      "In fact, sin is nothing but a conflict between man’s will and God’s. But our Lord Jesus Christ said, “Which of you convicts Me of sin?” (Jn 8:46) proving His One will with the Father.",
      "If there were no unity between the will of the Divine Logos and His Human Nature, internal conflict would have resulted. Far be it from Him! How then could the Lord Jesus Christ be our guide and our example? The complete righteousness that marked the life of our savior was due to the unity of His Divine and Human will. Also, the crucifixion was the choice of both the Divine and Human will. Had it not been one will, it would not have been said that He died by His own will for us. And since the will is one, the act is also one.",
    ],
  },
  {
    title: "Note on Christ's Full Humanity",
    paragraphs: [
      "The human nature actually consists of three elements: The body, the spirit and the soul. As St. Paul said, “May your whole spirit, soul, and body be preserved blameless” (lThess 5:23). Only two are mentioned above for simplicity. But we need to understand that our Lord had a FULL human nature.",
      "This Lecture is adapted fiom ‘The Nature of Christ’ by H.H. Pope Shenouda III.",
    ],
  },
]

export const sacramentTeachingSections: TeachingSection[] = [
  {
    title: "What Is a Sacrament?",
    paragraphs: [
      "Lecture 1: What is a Sacrament?",
    ],
  },
  {
    title: "Introduction",
    paragraphs: [
      "To materialists, this world is opaque like a curtain; nothing can be seen through it. A mountain is just a mountain, a sunset just a sunset; but to poets, artists and saints, the world is transparent like a windowpane it tells of something beyond. For example, a mountain tells of the power of God, the sunset of His beauty, and the snow white of His purity.",
      "A Sacrament, in a very broad sense of the term, combines two elements: one visible, the other invisible one can be seen, or tasted, or touched, or heard while the other remains unseen to the eyes of the flesh. There is, however, some kind of relation or significance between the two.",
      "A spoken word is a kind of sacrament because there is something material or audible about it; there is also something spiritual about it, namely, its meaning. A horse can hear a funny story just as well as a man. It is conceivable that the horse may even hear the words better than the man and at the end of the story the man may laugh, but the horse will never give a horselaugh. The reason is that the horse gets the material side of the sacrament namely the sound, but man gets the invisible or the spiritual side, namely, the meaning.",
      "A handshake is a kind of sacrament, because there is something seen and felt, namely the clasping of the hands, but there is something mysterious and unseen, namely, the communication of friendship.",
      "A kiss is a kind of sacrament, the physical side of it is present if one kisses one’s own hand, but the spiritual side of it is missing because there is no sign of affection for another. No wonder our Lord said to Judas, “are you betraying the son of Man with a kiss?” (Jn 22:48)",
    ],
  },
  {
    title: "The Brazen Serpent and the Mystery",
    paragraphs: [
      "Take the brazen serpent in the desert. When the Jewish people were bitten by poisonous serpents, God commanded Moses to make a brazen serpent, and to hang it over the crotch of a tree (Num 21:8-9); all who would look upon that serpent of brass would be healed of the serpent’s sting.",
      "This apparently was a rather ridiculous remedy for poison and not everyone looked at it. If one could discern or guess their reason, it would probably be because they concentrated on only one side of the symbol, namely, the shinny, lifeless brass thing hanging on a pole. But it proved to be a symbol of faith; God used that material thing as a symbol of trust or faith in Him.",
      "The symbolism goes still further, the Old Testament is fullfilled in our Lord Jesus Christ who revealed the full mystery of the brazen serpent. Our Lord told Nicodemus that the brass serpent was lifted up in the desert so that He would have to be lifted up on the cross (Jn 3:14). The meaning now becomes clear; the brass serpent in the desert looked like the serpent that bit the people, but though it seemed to be the same, it was actually without any poison. Our Blessed Lord now says that He is like that brazen serpent.",
      "He, too, would be lifted up on the crotch of a tree, a cross. He would look as if He Himself was filled with the poison of sin, for His body would bear the marks, and the stings, and the piercing of sin; and yet as the brass serpent was without poison so He would be without sin. As those who looked upon that brass serpent in the desert in faith were healed of the bite of the serpent, so all who would look upon Him on His cross bearing the sins and poisons of the world would also be healed of the poison of the serpent, Satan.",
    ],
  },
  {
    title: "Christ the Great Mystery",
    paragraphs: [
      "The word “sacrament” in Greek means “mystery”, and our Lord Jesus Christ has been called by St. Paul “a great mystery” (1 Tim 3:16). In Him is something divine, something human, something eternal, something temporal, something invisible, something visible.",
      "The Human Nature of our Blessed Lord had no power to sanctify of and by itself; that is to say, apart from its union with the Divinity, but because of that union, the Humanity of the Lord became the efficient cause of our justification and sanctification and will be until the end of the world. Herein is hidden a hint of the Sacraments.",
      "The Humanity of the Lord was the bearer of Divine life and the means of making men holy, the Sacraments were also to become the effective means of the sanctification purchased by his death. As our Blessed Lord was the sensible sign of God (He is truly God), so the Sacraments were to become the sensible signs of the grace (they are truly grace), which our Lord had won for us.",
      "If men were angels or pure spirits, there would have been no need of our Lord Jesus Christ using human nature or material things for the communication of the divine, but because man is composed of matter and spirit, body and soul, man functions best when he sees the material as the revealer of the spiritual.",
      "From the very beginning of man’s life, his mother's fondling is not merely to leave an impress upon his infant body, but rather to communicate the sublimely beautiful and invisible love of the mother. It is not the material thing that man values, but rather what is signified by it.",
    ],
  },
  {
    title: "Sacraments and Salvation",
    paragraphs: [
      "One often sees signs painted on roadways, “Jesus saves”. Now this indeed is true, but the important question is how does He save? What relation do we have in the twenty- first century to our Lord Jesus Christ in the first? Do we establish contact with Him only by reading about Him? If that were all, our relationship is not much closer than that which we can have with Plato. If the Lord Jesus Christ is only a memory of someone who lived centuries ago, then it is rather difficult to see that His influence will be any different than that of Socrates or Buddha. The answer to the question of how our Lord Jesus Christ saves is to be found in the Sacraments.",
      "The Divine life of the Lord is communicated through His Church or His mystical body in exactly the same way that His divine life was communicated when He walked on earth. As He then used His human nature as the instrument of divinity and used material things as means to confer His grace; clay and water in the case of the born blind (Jn 9:11). He now uses other human natures (priests) and material things (water, bread and wine, oil) as instruments for the communication of the same divine life (grace).",
      "Every Sacrament has an outward or visible sign. For example, in Baptism it is water, in the Eucharist it is bread and wine, but the Sacrament also has a form or formula, words of spiritual significance given to the matter when it is conferred. Three things then are absolutely required for a Sacrament: (1) Its institution by the Lord Jesus Christ, (2) an outward sign, (3) the power of conferring the grace purchased for us by the Passion, Death, and Resurrection of the Lord.",
      "Calvary is like a reservoir of divine life or grace. From it, there flows seven different kinds of sanctification for man in different stages in his spiritual existence. Each of these seven channels is a Sacrament by which the power of the Risen Christ is bestowed on souls by a spiritual and effective contact.",
      "This divine grace pours into the soul when we receive the Sacraments, unless we put an obstacle in the way, just as water will not flow out of a faucet if we put our hand in front of the faucet. But the faucet in a house has no power to quench thirst unless there is a reservoir and a pipeline. So the Sacraments do not confer grace as magical signs, they communicate it only because they are in contact with the Risen Christ through the work of the Holy Spirit about Whom the Lord said, “He will take of what is Mine and declare it to you.” (Jn 17:14)",
    ],
  },
  {
    title: "The Seven Holy Sacraments",
    paragraphs: [
      "1. The Sacrament of Holy Orders (Priesthood)",
      "2. The Sacrament of Baptism",
      "3. The Sacrament of Confirmation",
      "4. The Sacrament of The Eucharist",
      "5. The Sacrament of Repentance & Confession",
      "6. The Sacrament of The Anointing of The Sick",
      "7. The Sacrament of Matrimony",
    ],
  },
]

export const sacramentQna: QnaItem[] = [
  {
    question: "The word “mystery” occurred in Holy Scripture with many meanings. How are these meanings different from the sacraments of the Church?",
    answer:
      "The word “mystery” in Holy Scripture has two meanings: mysteries of knowledge that God reveals, that is secrets or hidden truths; and mysteries of grace where the Holy Spirit grants invisible gifts, that is the sacraments.",
  },
  {
    question: "What verses does the lesson group under mysteries of knowledge?",
    answer:
      "The lesson lists Psalm 25:14, Amos 3:7, Daniel 2:19, Luke 8:10, 1 Corinthians 2:7, 1 Corinthians 13:2, Ephesians 1:9, Ephesians 6:19, Colossians 1:26, Colossians 4:3, Colossians 2:2, and 1 Timothy 3:16 under mysteries of knowledge.",
  },
  {
    question: "What verse does the lesson use for mysteries of grace?",
    answer:
      "It points especially to Ephesians 5:31-32, where marriage is called a great mystery or sacrament in relation to Christ and the Church.",
  },
]

export const baptismTeachingSections: TeachingSection[] = [
  {
    title: "The Sacrament of Baptism",
    paragraphs: [
      "Lecture V: The Sacrament of Baptism",
      "Baptism is the Holy Sacrament through which we are born again by being immersed in water three times in the name of the Holy Trinity: the Father, the Son and the Holy Spirit. The Sacrament of Baptism has the primacy among the Seven Holy Sacraments for it is the door through which the individual enters the Church and is given the right to partake of the rest of the Sacraments.",
    ],
  },
  {
    title: "Institution of the Sacrament",
    paragraphs: [
      "Lord Jesus Christ instituted this Sacrament after His blessed resurrection, having completed our redemption and having made salvation available, He said to His disciples, “All authority has been given to Me in heaven and on earth. Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit” (Mt 28:18-19), and “He who believes and is baptized will be saved; but he who does not believe will be condemned” (Mk 16:16).",
      "Thus baptism is necessary for salvation as the Lord indicated, “Most assuredly, I say to you, unless one is born of water and the Spirit, he cannot enter the Kingdom of God” (Jn 3:5)",
    ],
  },
  {
    title: "How Exactly Does Baptism Save Us?",
    paragraphs: [
      "Salvation simply means remission of sins and it is written, “Without shedding of blood death there is no remission” (Heb 9:22). Salvation is made available through the redemptive death of Lord Jesus Christ on the cross. In order to have a share in this salvation, we must share the death and resurrection of the Lord. Therefore, St. Paul said, “That I may know Him and the power of His resurrection and the fellowship of His suffering being conformed to His death” (Phil 3:10).",
      "Unless a person undergoes such death, he or she will not be saved. Now how can we undergo such death? How can we share the death of the Lord? The answer is “Through Baptism”. St. Paul said, “Or do you not know that as many of you were baptized into Christ Jesus were baptized into His death? Therefore we were buried with Him through baptism into death” (Rom 6:3-4).",
      "It is our death and burial with the Lord through baptism that saves us and makes us share the glories of His Resurrection. St. Paul affirms, “For if we have been united together in the likeness of His death baptism, certainly we shall be in the likeness of His resurrection... now if we died with Christ, we believe that we shall also live with Him” (Rom 6:5-8).",
      "The salvation that began with our death and burial with Lord Jesus through baptism continues to be effective in us also through death. We obtain salvation through death and our bodies must always remain dead in relation to worldly lusts. For as long as the body is dead to sin, salvation lives in it, but when carnal lusts rise from this death, we become liable to lose our salvation since salvation is only attained through death.",
      "“Reckon yourselves to be dead indeed to sin, but alive to God in Christ our Lord. Therefore do not let sin reign in your mortal body that you should obey it in its lusts.” (Rom 6:11-12)",
      "“If by the Spirit you put to death the deeds of the body, you will live.” (Rom 8:13)",
      "“Those who are Christ’s have crucified the flesh and its passions and desires.” (Gal 5:24)",
      "“I have been crucified with Christ; it is no longer I who live, but Christ lives in me.” (Gal 2:20)",
      "“For you died, and your life is hidden with Christ in God.” (Col 3:3)",
      "“Always carrying about in the body the dying of the Lord Jesus.” (2 Cor 4:10)",
      "“Therefore put to death your members which are on earth: fornication, uncleanness, passion, evil desire, and covetousness, which is idolatry.” (Col 3:5)",
      "“He who has died has been freed from sin.” (Rom 6:7)",
    ],
  },
  {
    title: "Symbols of Baptism in the Old Testament",
    paragraphs: [
      "1. It is written in the Holy Book of Genesis, “The Spirit of God was hovering over the face of the waters” (Gen 1:2). This is both a symbol and a prophecy about the work of the Holy Spirit in baptismal water to give it its saving efficacy.",
      "2. St. Peter interpreted the story of Noah’s ark and the flood as a symbol of baptism, he said, “The divine longsuffering waited in the days of Noah, while the ark was being prepared, in which a few, that is, eight souls, were saved through water. There is also an antitype which now saves us baptism through the resurrection of Jesus Christ” (1 Pet 3:20-21).",
      "3. St. Paul interprets the commandment of circumcision as a symbol of baptism, he said, “You were also circumcised with the circumcision made without hands, by putting off the body of the sins of the flesh, by the circumcision of Christ, buried with Him in baptism, in which you also were raised with Him through faith in the working of God who raised Him from the dead” (Col 2:11-12).",
      "4. The relation between the ark, the circumcision, the saving resurrection of the Lord, and baptism goes even further. Notice that St. Peter emphasizes that only eight souls were saved from the evil world through the water of the flood. Also notice that God ordered that children must be circumcised on the eighth day. Now the Lord’s resurrection took place on the first day of the week (Jn 20:1) that is the eighth day from the previous week. The number eight represents the new life and eternity.",
      "5. St. Paul interpreted the story of crossing the sea as a symbol of baptism, he said, “All our fathers were under the cloud, all passed through the sea, all were baptized into Moses in the cloud and in the sea” (1 Cor 10:1-2).",
      "6. The Priesthood was not given to Aaron and his sons except after being washed with water, also the laver of bronze and its water set between the tabernacle of meeting and the altar was a symbol of the spiritual cleansing effect of baptismal water.",
      "7. The sacrifice of Elijah the Prophet was accepted after pouring water on it three times. Moreover, Elijah himself was not taken up to heaven until he crossed the waters of the Jordan river. The same happened with the Israelites who went into the Promised Land after going through the waters of the Jordan. In the Holy Book of Revelation we read about “a sea of glass” (Rev 4:6) before the throne of God. The point is that we must go through the waters of baptism to reach the heavenly Promised Land and enjoy the company of God.",
    ],
  },
  {
    title: "The Baptism of St. John the Baptist",
    paragraphs: [
      "No pre-Pentecostal baptism can be equated with Christian baptism. This not only includes St. John the Baptist’s but also the disciples’ baptisms during the life of the Lord on earth. These baptisms were preparatory ones, just for repentance, as St. John said, “I indeed baptize you with water unto repentance, but He who is coming after me is mightier than I He will baptize you with the Holy Spirit and fire” (Mt 3:11).",
      "The redemption had not yet been accomplished; the specific relationship of baptism with the cross and the blood of the Lord had not yet been established. Moreover, the gift of the Holy Spirit was not yet available. On the day of Pentecost no exceptions were allowed for those who may have received St. John’s baptism, St. Peter said, “Let every one of you be baptized” (Acts 2:38).",
      "The Holy Book of Acts tells us of a specific incidence where some believers at Ephesus were only baptized with St. John’s baptism so St. Paul asked, “Did you receive the Holy Spirit when you believed?” They replied, “We have not so much as heard whether there is a Holy Spirit.” He wondered, “Into what then were you baptized?” So they said, “Into John’s baptism” Then St. Paul explained, “John indeed baptized with a baptism of repentance, saying to the people that they should believe on Him who would come after him, that is on Christ Jesus.” So when they heard this, they were baptized in the name of the Lord Jesus. (Acts 19:1-5)",
    ],
  },
  {
    title: "The Effectiveness of Baptismal Water",
    paragraphs: [
      "It may be objected, “What does mere water do when a person is immersed in it?” One might just as well ask, what does water do when poured into the boiler? The water in the boiler can do nothing of and by itself, nor can the water in the baptistery, but when the water in the boiler is united with the mind of an engineer, it can drive an engine across a continent or a ship across the sea. So too, when water is united with the power of the Holy Spirit, it can give regeneration and spiritual cleansing.",
      "Those who think that the effectiveness of baptism depends on the water alone bring to mind the story of Naaman, the commander of the Syrian army, who was a leper. This man came to Elisha the Prophet to be healed from leprosy so he told him, “Go and wash in the Jordan seven times, and your flesh shall be restored to you, and you shall be clean” (2 Kgs 5:10).",
      "Likewise, if the blind man from birth had questioned the words of Lord Jesus about washing in the pool of Siloam (Jn 9:11), he would have remained blind. Our Lord emphasized the relation between the water and the Spirit, thus baptismal water is not to be considered mere water for “There are three that bear witness on earth: The Spirit, the water, and the blood; and these three agree as one.” (1 Jn 5:7)",
    ],
  },
  {
    title: "Immersion Versus Sprinkling",
    paragraphs: [
      "To baptize literally means to immerse or to put into. Therefore, the Orthodox Church baptizes by triple immersion, “in the name of the Father, and the Son, and the Holy Spirit” (Mt 28:19).",
      "“Both Philip and the eunuch went down into the water, and he baptized him. Now when they came out of the water, the Spirit of the Lord caught Philip away” (Acts 8:38-39). If baptism were by sprinkling, St. Philip could have just brought water to the chariot and sprinkled it on the eunuch.",
      "St. Paul said, “We were buried with Him through baptism” (Rom 6:4), and “Buried with Him in baptism” (Col 2:12). The only way a person is buried in baptism is through complete immersion.",
      "St. Paul said, “According to His mercy He saved us, through the washing of regeneration and renewing of the Holy Spirit” (Titus 3:5), St. Ananias said to St. Paul, “Be baptized, and wash away your sins” (Acts 22:16). Baptism is also called washing in Holy Scripture. To wash a piece of cloth you need to completely immerse it in water.",
      "Because baptism is a very important condition for salvation, the Church allows baptism by sprinkling only in the case where immersion is prevented by a medical condition and there is a risk that the person would die without being baptized.",
      "Moreover, if there was no priest available, any Orthodox Christian male or female can perform the baptism by anointing the baby with water three times saying, “I baptize you in the name of the Father, the Son, and the Holy Spirit”. If the baby lives, baptism is not repeated and the child just needs to be anointed with the Holy oil.",
    ],
  },
  {
    title: "Why Do We Baptize Infants?",
    paragraphs: [
      "1. Baptism is essential for salvation and without it a person cannot enter the Kingdom of God, “Most assuredly I say to you, unless a person is born of water and the Spirit, he cannot enter the Kingdom of God” (Jn 3:5). Infants are no exception since they are born with the corrupt nature due to the original sin. Therefore, infants are baptized to insure their salvation.",
      "2. Circumcision was a symbol of baptism (Col 2:11-13). Now if God commanded that infants enter in the Old Covenant with Him, should we prevent them from entering in the New Covenant?",
      "3. Crossing the Red Sea was also a symbol of baptism (1 Cor 10:1-2). Undoubtedly, infants crossed the sea with their parents so why should today’s infants be prevented from being baptized?",
      "4. St. Peter said to the people on Pentecost, “Be baptized and you shall receive the gift of the Holy Spirit. For the promise is to you and to your children” (Acts 2:38-39). This is a clear implication that children are accepted in baptism.",
      "5. Holy Scripture records several occasions where families and entire households were baptized together (Acts 16:14-15, 33; 1 Cor 1:16). This is another implication that children were baptized.",
      "6. There is not a single biblical verse that supports the prevention of infants’ baptism. On the contrary, our Lord said, “Let the little children come to Me, and do not forbid them; for of such is the kingdom of heaven” (Mt 19:14), and “Take heed that you do not despise one of these little ones, for I say to you that in heaven their angels always see the face of My Father who is in heaven” (Mt 18:10)",
    ],
  },
  {
    title: "One Baptism",
    paragraphs: [
      "The Sacrament of Baptism is performed once and is not repeated as we say in the creed, “we confess one baptism for the remission of sins”. Since baptism is a spiritual birth so a person is born baptized once and since baptism is death with the Lord and the Lord died once so a person dies with the Lord baptized once. Thus St. Paul said, “one Lord, one faith, one baptism” (Eph 4:5)",
    ],
  },
  {
    title: "Frequently Asked Questions",
    paragraphs: [
      "Q1: If baptism is necessary for salvation, were the people of the Old Testament baptized?",
      "A1: Baptism was not a condition for salvation in the Old Testament, but it was only instituted as a condition in the New Testament, “He who believes and is baptized will be saved” (Mk 16:16). The reason is that baptism’s saving efficacy is linked to the death of Lord Jesus Christ and the Lord had not yet died in the Old Testament. Nevertheless, the people of the Old Testament practiced the symbol of baptism available to them at such time, namely circumcision (Col 2:11-13). They also kept the Passover, which was a symbol of our Lord (1 Cor 5:7).",
      "Q2: What is the fate of infants who die without being baptized?",
      "A2: Lord Jesus Christ said, “Most assuredly, I say to you, unless one is born again, he cannot see the Kingdom of God” (Jn 3:3), and “Most assuredly, I say to you, unless one is born of water and the Spirit, he cannot enter the kingdom of God” (Jn 3:5). These infants inherited the corrupt nature due to the original sin, “we were by nature children of wrath” (Eph 2:3) and St. Paul affirms that corruption does not inherit incorruption (1 Cor 15:50).",
      "Therefore, these infants cannot enter nor see the Kingdom of God. One may object, They didn’t do anything wrong. Well, they didn’t do anything right either. The early Church fathers agree that these infants will not enter the Kingdom of God based on the words of the Lord but concerning suffering and punishment the most probable and most acceptable opinion is that they will not suffer since they did not commit any personal sin.",
      "God said, “the uncircumcised male child, who is not circumcised in the flesh of his foreskin, that person that child shall be cut off from his people; he has broken My covenant” (Gen 17:14). Someone may ask, What about God’s mercy? God’s mercy is full of justice and His Justice is full of mercy. So trust in the merciful justice of our God and don’t worry about this subject.",
      "This lecture is adapted from ‘The Church Sacraments’ by Archdeacon Habib Guirgess.",
    ],
  },
]

export const confirmationTeachingSections: TeachingSection[] = [
  {
    title: "What Confirmation Is",
    paragraphs: [
      "In the biological order, a creature must first be born and then grow. Likewise, in the spiritual order of grace, we are born again in Baptism and then we must grow in the spiritual life and bear the fruits of the Spirit.",
      "We also need spiritual power to struggle against the powers of darkness. The Holy Sacrament of Confirmation induces us into God’s spiritual army and the lay priesthood of believers. Our body becomes a temple of the Holy Spirit. Confirmation is a kind of Pentecost to the baptized person.",
    ],
  },
  {
    title: "Institution and Administration",
    paragraphs: [
      "The roots of this sacrament are found in the promises of the Spirit in both the Old and New Testaments. Our Lord promised the Holy Spirit again and again, and on Pentecost this promise was fulfilled. The Apostles then administered this sacrament by the laying on of hands after Baptism.",
      "The lesson cites Acts 2:17 with Joel 2:28, Ezekiel 36:26-27, John 7:37-39, John 14:16-17, John 14:26, John 15:26, John 16:7, Acts 1:4-5, Acts 8:14-17, Acts 19:5-6, and Hebrews 6:2 to show both the promise of the Spirit and the sacrament's distinction from baptism.",
      "As the number of believers grew, the Apostles established chrismation in addition to the laying on of hands. This holy anointing became the sacramental means by which the gift of the Holy Spirit was given throughout the Church.",
    ],
  },
  {
    title: "The Holy Oil and Its Importance",
    paragraphs: [
      "The holy oil, or Myron, has a long history in the life of the Church. The Apostles took the spices that were on our Lord's body in the tomb and the spices prepared by the women, melted them in pure olive oil, prayed over it, and decreed that this holy oil be used to anoint the baptized so that they might receive the gift of the Holy Spirit. Their successors, the bishops, renewed it through the generations.",
      "When St. Mark came to Alexandria, he brought some of that holy oil with him. In the beginning of the fourth century, Pope Athanasius the Apostolic, the twentieth Pope of Alexandria, renewed it with the scriptural spices of holy ointment and sent some of it to Rome, Antioch, and Constantinople together with the recipe used in preparing it. Here the church references are presented in Ethiopian Orthodox Tewahedo Church language while preserving the same Oriental Orthodox sacramental teaching.",
      "The Church confirms infants immediately after Baptism, in accordance with Scripture and Apostolic Tradition. The Ethiopian Orthodox Tewahedo Church does not delay this sacrament. Confirmation is necessary for the spiritual life, because apart from the gift of the Holy Spirit our efforts remain powerless and our life is exposed to spiritual ruin.",
      "The lesson further reinforces this with 1 John 2:20, 1 John 2:27, 2 Corinthians 1:21-22, Ephesians 4:30, Luke 24:1, Exodus 30, Luke 1:15, and Psalm 51:11.",
    ],
  },
]

export const repentanceTeachingSections: TeachingSection[] = [
  {
    title: "Institution and Need",
    paragraphs: [
      "In the biological order, though a baby is born healthy, it later becomes subject to disease. In the spiritual order, though the soul is made clean in Baptism, it later contracts stains and spiritual diseases. The Sacrament of Repentance and Confession is for the healing of spiritual wounds received after Baptism.",
      "In His mercy, the Lord instituted this sacrament for spiritual guidance, healing, and reconciliation. He said to His disciples, “Whatever you bind on earth will be bound in heaven, and whatever you loose on earth will be loosed in heaven,” and again, “If you forgive the sins of any, they are forgiven them; if you retain the sins of any, they are retained.”",
      "These words imply hearing confessions, for how would the disciples know what to forgive or retain if they did not hear the sins confessed? Thus the Church practiced confession openly in apostolic times, as we read in Acts: “Many who had believed came confessing and telling their deeds.”",
      "The body of the lesson explicitly cites Matthew 18:18, John 20:22-23, Acts 19:18, and Psalm 103:14.",
    ],
  },
  {
    title: "Roots and Stages of Confession",
    paragraphs: [
      "The Old Testament prepared for this sacrament in many ways. God called Adam, Cain, Israel, and many others to acknowledge their sins before Him. Joshua required confession from Achan, and David confessed to Nathan the Prophet.",
      "The lesson names specific Old Testament examples from Genesis, Leviticus, Numbers, Proverbs, Joshua, 2 Samuel, and the ministry of St. John the Baptist as preparation for this sacrament.",
      "There are stages or forms of confession. First, confession to oneself, when the sinner comes to himself. Second, confession to God, for every sin is finally against Him. Third, confession to the priest, where the confessor receives spiritual guidance and absolution. Fourth, where needed, confession to the person against whom the trespass was committed, with the advice of the father of confession.",
    ],
  },
  {
    title: "Acceptable Confession",
    paragraphs: [
      "Confession without repentance and without hope is not acceptable to God and will not benefit the person. Pharaoh confessed at times, and Judas confessed the shedding of innocent blood, yet both perished. Confession must therefore be joined to repentance.",
      "Acceptable confession requires a contrite heart, regret, and a firm intention not to return to sin. It must be joined to steadfast faith in the grace of our Lord Jesus Christ.",
      "It also requires self-examination. The confessor must not excuse himself, must not hide anything from the father of confession, must be truthful, and must not be biased in his own favor. The lesson cites Joel 2:12, 2 Corinthians 7:10, John 5:14, Hebrews 10:39, 2 Peter 2:21-22, Micah 7:8, Ecclesiastes 5:6, Lamentations 2:19, Acts 5, and John 12:25 here.",
    ],
  },
]

export const eucharistTeachingSections: TeachingSection[] = [
  {
    title: "The Sacrament of the Eucharist",
    paragraphs: [
      "Lecture XI: The Sacrament of The Eucharist",
      "In the Sacrament of the Eucharist, believers eat Lord Jesus Christ’s Holy Body and drink His precious Blood under the physical appearance of bread and wine. This Sacrament is called the Sacrament of all Sacraments and the crown of the Sacraments. In the Coptic Orthodox Church, no Sacrament is to be administered on the same day after the person has partaken from Holy Communion.",
    ],
  },
  {
    title: "Institution of the Sacrament",
    paragraphs: [
      "Our Lord instituted this Sacrament on Covenant Thursday, just a few hours before His arrest and trial. After He had washed the feet of the disciples as a sign of their repentance and preparation, “He took bread, blessed it and broke it, and gave it to the disciples and said, Take, eat; this is My body.’ Then He took the cup, and gave thanks, and gave it to them, saying Drink from it all of you. For this is My blood of the new covenant, which is shed for many for the remission of sins’” (Mt 26:26-28)",
      "St. Paul said, “The Lord Jesus on the same night in which He was betrayed took bread; and when He had given thanks, He broke it and said, ‘Take, eat; this is My body which is broken for you; do this in remembrance of Me.’ In the same manner He also took the cup after supper, saying, ‘This cup is the new covenant in My blood. This do, as often as you drink it, in remembrance of Me.’ For as often as you eat this bread and drink this cup, you proclaim the Lord’s death till He comes” (1 Cor 11:23-26)",
    ],
  },
  {
    title: "Symbols of the Eucharist in the Old Testament",
    paragraphs: [
      "The offering of Melchizedek bread and wine was a symbol of this Holy Sacrament, “Melchizedek king of Salem brought out bread and wine; he was the priest of God Most High” (Gen 14:18). Therefore, it was said about our Lord, “You are a priest forever according to the order of Melchizedek” (Ps 110:4; Heb 5:6).",
      "The Passover lamb that the children of Israel offered on the night of their exodus from Egypt, and which they used to offer every year thereafter was a symbol of this Sacrament “For indeed Christ, our Passover, was sacrified for us” (1 Cor 5:7).",
      "The manna that the children of Israel ate in the wilderness of Sinai for forty years was a symbol of the Sacrament of Eucharist. Our Lord said, “This is the bread which came down from heaven not as your fathers ate the manna, and are dead. He who eats this bread will live forever” (Jn 6:58) “I am the living bread which came down from heaven. If anyone eats of this bread, he will live forever and the bread that I shall give is My flesh” (Jn 6:51)",
    ],
  },
  {
    title: "The Question of the Real Presence",
    paragraphs: [
      "Lecture XII: The Question of The Real Presence",
      "Our Lord spoke about this Sacrament openly to the Jews but they “quarreled among themselves saying, ‘How can this Man give us His flesh to eat?’” (Jn 6:52). Moreover, many of the disciples protested saying, “This is a hard saying; who can understand it?” (Jn 6:60). When Lord Jesus explicitly emphasized His real presence in the Sacrament, it was written, “many of His disciples went back and walked with Him no more” (Jn 6:66)",
      "The question of the real presence is of considerable importance in relation to the differences, which have emerged within Christianity since the time of the so-called Reformation. A particularly important witness to the early Christian understanding of this Sacrament is provided by the Catechetical lectures of St. Cyril of Jerusalem. It is clear that St. Cyril regarded the bread and wine as becoming the real body and blood of our Lord Jesus Christ.",
      "“Jesus Christ, by his own will, once changed water into wine at Cana of Galilee. So why should we not believe that he can change wine into blood? We should therefore have full assurance that we are sharing in the body and blood of Christ. For in the type of bread, his body is given to you, and in the type of wine, his blood is given to you, so that by partaking of the body and blood of Christ you may become of one body and one blood with Him.” (St. Cyril of Jerusalem)",
      "“And now you ask how the bread becomes the body of Christ, and the wine and the water become the blood of Christ. I shall tell you. The Holy Spirit comes upon them, and achieves things which surpass every word and thought Let it be enough for you to understand that this takes place by the Holy Spirit” (St. John of Damascus).",
    ],
  },
  {
    title: "Definitions",
    paragraphs: [
      "1. Transubstantiation: This term, associated with the Roman Catholic Church, is the change of the substance of bread and wine into the Body and Blood of Lord Jesus Christ occurring in the Eucharist while all that is accessible to the senses remain as before.",
      "\"Substance\" here means what something is in itself. A hat's shape is not the hat itself, nor is its color the hat, nor is its size, nor its softness to the touch nor anything else about it perceptible to the senses. The hat itself (the \"substance\") has the shape, the color, the size, the softness and the other appearances, but is distinct from them. While the appearances, which are referred to by the philosophical term accidents, are perceptible to the senses, the substance is not. Oriental and Eastern Orthodox Christians agree that the bread and wine truly and actually become the body and blood of Christ. They have in general refrained from philosophical speculation, and usually rely on the status of the doctrine as a Mystery, something known by divine revelation that could not have been arrived at by reason without revelation. Accordingly, they prefer not to elaborate upon the details and remain firmly within Holy Tradition. However, they do speak clearly of a change or metousiosis of the bread and wine.",
      "2. Consubstantiation: This view, especially associated with Martin Luther, attempts to describe the nature of the Eucharist in concrete metaphysical terms. It holds that the fundamental substance of the body and blood of the Lord are present alongside the substance of the bread and wine, which remain present.",
      "3. Memorialism or Real Absence: This understanding of the nature of the Eucharist is especially associated with Zwingli. The Eucharist is nothing but a memorial of the suffering of the Lord, and not a sacrifice. The bread and wine are mere symbols of the Body and Blood.",
    ],
  },
  {
    title: "Why Do We Believe in the Real Presence?",
    paragraphs: [
      "Generally speaking, there are three reasons why we believe in the real presence of Lord Jesus Christ in the Sacrament of the Eucharist:",
      "I) Biblical Reasons",
      "II) Logical Reasons",
      "III) Historical Reasons",
    ],
  },
  {
    title: "Biblical Reasons",
    paragraphs: [
      "1. Whenever our Lord Jesus Christ would speak symbolically and yet the Jews would understand His blessed words literally, St. John would point their mistake out:",
      "a) “Jesus answered and said to them, ‘Destroy this temple, and in three days I will raise it up.’ So the Jews answered and said to Him, ‘It has taken forty-six years to build this temple, and will You raise it up in three days?’ But He was speaking of the temple of His body.” (Jn 2:19-21)",
      "b) “On the last day, that great day of the feast, Jesus stood and cried out, saying, ‘If anyone thirsts, let him come to Me and drink. He who believes in Me, as the Scripture has said, out of his heart will flow rivers of living water.' But this He spoke concerning the Spirit, whom those believing in Him would receive.” (Jn 7:37-39)",
      "c) “Then they said to Him, ‘Who are you?’ And Jesus said to them, ‘Just as I have been saying to you from the beginning...’ They did not understand that He spoke to them of the Father.” (Jn 8:25-27)",
      "Lord Jesus Christ said, “The bread that I will give is My flesh, which I shall give for the life of the world” (Jn 6:51) but “The Jews therefore quarreled among themselves, saying, ‘How can this Man give us His flesh to eat?’” (Jn 6:52)",
      "Now, if Lord Jesus Christ was speaking symbolically and the Jews misunderstood Him why didn't St. John point their mistake out as he did previously? The fact that St. John didn't do that means that Lord Jesus Christ was indeed speaking literally.",
      "The reply of the Lord reinforces the fact that His words were literal, “Most assuredly, I say to you, unless you eat the flesh of the Son of Man and drink His blood, you have no life in you... For My flesh is food indeed, and My blood is drink indeed” (Jn 6:53,55)",
      "2. When Lord Jesus said, “Most assuredly, I say to you, unless you eat the flesh of the Son of Man and drink His blood, you have no life in you. Whoever eats My flesh and drinks My blood has eternal life, and I will raise him up at the last day. For My flesh is food indeed and My blood is drink indeed. He who eats My flesh and drinks My blood abides in Me, and I in him” (Jn 6:53-56), many of His disciples took Him literally and said, “This is a hard saying: who can understand it?”",
      "Now our Lord Jesus Christ was fully aware that many of His disciples understood His words literally and were offended. St. John said, “From that time many of His disciples went back and walked with Him no more” (Jn 6:66)",
      "Obviously, if Lord Jesus Christ had only meant that they would eat His flesh and drink His blood figuratively or symbolically, He would have said so before they walked away for it is written that “He explained all things to His disciples” (Mk 4:34). But the Lord did not explain and let them go. Therefore, He meant His words literally and of course not visually or cannibalistically but miraculously and Sacramentaly.",
      "Some people become confused by what Lord Jesus Christ said after the disciples complained. He said, “It is the Spirit who gives life; the flesh profits nothing. The words that I speak to you are spirit, and they are life” (Jn 6:63). Rather, Lord Jesus Christ is not talking about His Flesh, but about their flesh. He is telling the unbelieving disciples that they cannot grasp or come to His blessed teaching on the Eucharist by their senses or their flesh which profits nothing for this purpose, only through faith or Spirit.",
      "3. St. Paul said that our Lord said, “Take, eat; this is My body which is broken for you” (1 Cor 11:24). But we all know that the Body of our Lord was never broken, “when they came to Jesus and saw that He was already dead, they did not break His legs... these things were done that the Scripture should be fulfilled, No one of His bones shall be broken” (Jn 19:33,36)",
      "The fact that the Lord said that this is His Body which is broken affirms that it is not a symbol but rather the true body because if the bread were a mere symbol, then it should not be broken for the body on the cross was never broken.",
      "4. Whenever the term eating flesh occurs symbolically in Holy Scripture, it refers to slander, hate and back stabbing:",
      "a) “When the wicked came against me to eat up my flesh, my enemies and foes, they stumbled and fell.” (Ps 27:2)",
      "b) “You who hate good and love evil; Who strip the skin from My people, and the flesh from their bones; Who also eat the flesh of My people” (Mic 3:2-3)",
      "c) “If you bite and devour one another, beware lest you be consumed by one another.” (Gal 5:15)",
      "If we interpret the Lord’s words about eating His Flesh and drinking His Blood symbolically, we fall in the worst interpretation.",
      "5. St. Paul said, “He who eats and drinks in an unworthy manner eats and drinks judgment to himself, not discerning the Lord’s body” (1 Cor 11:29). To discern means to perceive or recognize clearly. This verse clearly proves the transformation of the bread to the real body of the Lord and whoever takes communion without this faith eats and drinks judgment to himself.",
      "6. The words of the Lord about this Sacrament are straightforward and clear.",
      "7. St. Paul said, “I speak as to wise men; judge for yourselves what I say. The cup of blessing which we bless, is it not the communion of the blood of Christ? The bread which we break, is it not the communion of the body of Christ?” (1 Cor 10:15-16). How can we possibly have communion with the Body and Blood of Lord Jesus Christ if the bread and wine were mere symbols?",
    ],
  },
  {
    title: "Logical Reasons",
    paragraphs: [
      "1. The words of Lord Jesus Christ about this Sacrament constitute a testimony, “This is My Body, This is My Blood” also the Lord testified that His Body is food indeed and His Blood is drink indeed. A testimony must be literal without figurative or symbolic language.",
      "2. The words of Lord Jesus Christ about this Sacrament constitute a covenant, “This cup is the new covenant” (Lk 22:20) “Whoever eats My flesh and drinks My blood has eternal life” (Jn 6:54). The words of a covenant must be literal.",
      "3. Symbols and analogies must have a kind of resemblance to what they symbolize. The bread, which is broken, cannot be a symbol of the intact body of our Lord. Notice that because the Passover lamb was a symbol of the Lord, no bone was broken from it (Ex 12:46)",
      "4. The saving spiritual blessings that are associated with this Sacrament cannot be attributed to eating mere bread unless this bread is truly transformed into the true body of the Savior.",
      "5. The severe punishment that reaches death cannot be associated with eating mere bread and drinking mere wine unless they are truly transformed to the Body and Blood of Lord Jesus Christ.",
      "6. It is written about the cup that it is for the remission of sins. The only way this can be true is for the mixture in this cup to be transformed to the real blood of the Savior for “without shedding of blood there is no remission” (Heb 9:22)",
    ],
  },
  {
    title: "Historical Reasons",
    paragraphs: [
      "1. All apostolic Churches universally agree about the real presence of the Lord in the Sacrament of the Eucharist in spite of their disagreements on many other issues.",
      "2. All Eastern and Western Church Fathers have agreed, without exception, that the words of the Lord about this Holy Sacrament are to be understood literally.",
      "3. Martin Luther himself could not dare to deny the presence of the Lord in the Eucharist although his view was still heretical and it wasn’t until later that Zwingli came up with the heresy of real absence which most of the Protestants believe today.",
    ],
  },
  {
    title: "Benefits of the Sacrament",
    paragraphs: [
      "Abiding in Lord Jesus Christ: “He who eats My flesh and drinks My blood abides in Me, and I in him” (Jn 6:56). Consequently we bear the fruits of the spirit, “He who abides in Me, and I in him, bears much fruit; for without Me you can do nothing” (Jn 15:5)",
      "Obtaining Eternal Life: “Whoever eats My flesh and drinks My blood has eternal life, and I will raise him up at the last day. He who eats this bread will live forever” (Jn 6:54,58)",
      "Growth and maintenance of our spiritual life: “Unless you eat the flesh of the Son of Man and drink His blood, you have no life in you... For My flesh is food indeed, and My blood is drink indeed... he who feeds on Me will live because of Me” (Jn 6:53,55,57)",
      "Salvation and remission of sins: “This is My blood of the new covenant, which is shed for many for the remission of sins” (Mt 26:28)",
      "Unification of believers: “For we, being many, are one bread and one body; for we all partake of that one bread” (1 Cor 10:17)",
    ],
  },
  {
    title: "Consequences of Unworthy Communion",
    paragraphs: [
      "St. Paul said, “Whoever eats this bread or drinks this cup of the Lord in an unworthy manner will be guilty of the body and blood of the Lord. But let a man examine himself, and so let him eat of that bread and drink of that cup. For he who eats and drinks in an unworthy manner eats and drinks judgment to himself, not discerning the Lord’s body. For this reason many are weak and sick among you, and many sleep die. For if we would judge ourselves, we would not be judged.” (1 Cor 11:27-31)",
    ],
  },
  {
    title: "The Meaning of Worthiness",
    paragraphs: [
      "Orthodox Faith: The person who approaches the Eucharist must be an Orthodox Christian having no doubt concerning the bread and wine being the true body and precious blood of Lord Jesus Christ.",
      "Repentance and Confession: The person must be practicing the Sacrament of Repentance and Confession on regular basis as St. Paul said, “let a man examine himself” (1 Cor 11:28)",
      "Reconciliation With Others: Lord Jesus Christ said, “If you bring your gift to the altar, and there remember that your brother has something against you, leave your gift there before the altar, and go your way. First be reconciled to your brother, and then come offer your gift” (Mt 5:23-24)",
      "True Worthiness is Feeling Unworthy: St. Paul, the meek and humble apostle said, “I know nothing against myself, yet I am not justified by this” (1 Cor 4:4)",
      "Obeying The Church Rules: concerning food abstinence before communion, physical cleanliness, and early attendance of the liturgy.",
    ],
  },
  {
    title: "The Eucharist as a Sacrifice",
    paragraphs: [
      "The Orthodox Church believes and confesses that the Eucharist is a sacrifice and an offering to God in addition to being a Sacrament.",
      "The words of Lord Jesus Christ Himself speak of His blood being shed and His body being broken or given. Undoubtedly, the terms broken body and shed blood refer to a sacrifice.",
      "The presence of an altar in the Church confirms that the Eucharist is a sacrifice. St. Paul said, “We have an altar from which those who serve the tabernacle have no right to eat” (Heb 13:10). Isaiah the Prophet said, “In that day there will be an altar to the Lord in the midst of the land of Egypt” (Is 19:19).",
      "Malachi the Prophet prophesied about the New Testament offering saying, “I have no pleasure in you, says the Lord of hosts, nor will accept an offering from your hands. For from the rising of the sun even to its going down, My name shall be great among the nations” (Mal 1:10-11). This pure offering is the Eucharistic offering that Christians offer on their altars.",
      "St. Paul said, “Observe Israel after the flesh: Are not those who eat of the sacrifices partakers of the altar?... You cannot drink the cup the Lord and the cup of demons; you cannot partake of the Lord's table and the table of demons” (1 Cor 10:18-21). This proves that the Eucharist that is offered on the Christian altar is indeed a sacrifice.",
    ],
  },
  {
    title: "The Cross and the Eucharistic Sacrifice",
    paragraphs: [
      "The Cross: The Holy Body and Precious Blood were offered visibly.",
      "The Eucharist: The Holy Body and Precious Blood are offered sacramentally as bread and wine.",
      "The Cross: Offered by Lord Jesus Christ as the Chief High Priest.",
      "The Eucharist: Offered by the New Testament Priests according to the order of Melchizedek.",
      "The Cross: The lamb Lord Jesus Christ was slain, His blood was shed, and He died.",
      "The Eucharist: No shedding of blood and no death. Hence it is called bloodless sacrifice.",
      "The Cross: Offered once on Good Friday.",
      "The Eucharist: Offered several times from its institution till the second coming of the Lord.",
    ],
  },
  {
    title: "Frequently Asked Questions",
    paragraphs: [
      "Q1: Why don't we allow Protestants to take communion in our Churches?",
      "A1: The Didache or the teaching of the 12 apostles states “Let no one eat or drink of your Eucharist but those baptized in the name of the Lord; to this, too the saying of the Lord is applicable, Do not give what is holy to the dogs” (Mt 7:6). St Paul forbade the Jews from taking communion in an unworthy manner. How can the Church allow a protestant, who denies the real presence of the Lord in the Eucharist, to take communion?",
      "Q: What are the differences with the Roman Catholic Church concerning the Eucharist?",
      "A: There are no differences concerning the belief that the Eucharist is the true Body and Blood of Lord Jesus Christ. Nevertheless, there are some differences concerning the administration of the Sacrament.",
      "a) They consecrate unleavened bread wafers even though the very word artos, which is used in the Greek text of the gospel in the narration on the institution of the Sacrament, signifies precisely leavened, fermented, risen bread.",
      "b) They forbid infants and small children from taking communion. Lord Jesus Christ said about the children, “Let the little children come to Me, and do not forbid them; for of such is the kingdom of heaven” (Mt 19:14).",
      "c) They allow people to partake of the Holy Body without partaking of the Holy Blood. Lord Jesus Christ administered both His Body and His Blood to His disciples and He said about the cup “Drink from it, all of you” (Mt 26:27). He also said, “Unless you eat the flesh of the Son of Man and drink His blood, you have no life in you. Whoever eats My flesh and drinks My blood has eternal life” (Jn 6:53-54).",
      "d) Their practice of separate little wafers for the laity contradicts the unity expressed by “For we, being many, are one bread and one body; for we all partake of that one bread.” (1 Cor 10:17)",
      "Q6: St. Paul said, “Purge out the old leaven, that you may be a new lump, since you truly are unleavened. For indeed Christ, our Passover was sacrificed for us” (1 Cor 5:7). Is the apostle talking about consecrating unleavened bread in the Eucharist?",
      "A6: Leaven is a symbol of sin and evil, and St. Paul says in the verse that follows, “Let us keep the feast, not with old leaven, nor with the leaven of malice and wickedness, but with the unleavened bread of sincerity and truth” (1 Cor 5:8). St. Paul is not talking about the Eucharist but about the sinner that he mentioned in the beginning of this chapter. Since leaven symbolizes sin and our Lord indeed carried our sins, it is more fitting to consecrate leavened bread in the Eucharist.",
      "This lecture is adapted from ‘The Sacraments of The Church’ by Archdeacon Habib Guirgess.",
    ],
  },
]


export const priesthoodTeachingSections: TeachingSection[] = [
  {
    title: "The Sacrament of Priesthood",
    paragraphs: [
      "Lecture II: The Sacrament of Priesthood",
      "The Sacrament of Priesthood is the Holy Sacrament by which the Bishop lays his hand on the elected candidate in order for the Holy Spirit to descend on this person to grant him one of the priestly ranks. As a result, the ordained person is granted the authority to perform the ministry of the Church, whether the Holy Sacraments, teaching or others. This process is called “Laying of hands” or “Ordination.”",
    ],
  },
  {
    title: "Institution of The Sacrament",
    paragraphs: [
      "Lord Jesus Christ instituted this Sacrament when He chose the twelve of His followers and consecrated them for ministry, “He called His disciples to Him, and from them He chose twelve whom He also named apostles” (Lk 6:13). He gave them the authority of absolution and binding, “He breathed on them, and said to them, ‘Receive the Holy Spirit’. If you forgive the sins of any, they are forgiven them; if you retain the sins of any, they are retained” (Jn 20:22-23). Notice that this took place before the Pentecost and the gift of the Holy Spirit here is the gift of ordination. Only to them He said, “Go therefore and make disciples of all the nations, baptizing them in the name of the Father and the Son and of the Holy Spirit” (Mt 28:19) and only to them He delivered the mystery of His Body and Blood (The Eucharist)",
    ],
  },
  {
    title: "Honor of Priesthood",
    paragraphs: [
      "St. Paul said, “No man takes this honor to himself, but he who is called by God” (Heb 5:4) and “Let the elders [priests] who rule well be counted worthy of double honor’ (I Tim 5:17), for the Priesthood is:",
      "a) A divine choice, call and appointment:",
      "“Then He appointed twelve, that they might be with Him and that He might send them out to preach and to have power to heal sicknesses and to cast out demons.” (Mk 3:13-15)",
      "“And when it was day, He called His disciples to Himself; and from them He chose twelve whom He also named apostles.” (Lk 6:12-13)",
      "“You did not choose Me, but I chose you and appointed you that you should go and bear fruit and that",
      "“After these things the Lord appointed seventy others also, and sent them two by two before His face into every city and place where He Himself was about to go.” (Lk 10:1)",
      "“As they ministered to the Lord and fasted, the Holy Spirit said, ‘Now separate to Me Barnabas and Saul for the work to which I have called them.’ Then, having fasted and prayed, and laid hands on them, they sent them away.” (Acts 13:2-3)",
      "b) Faithfulness and Stewardship:",
      "“Who then is that faithfiul and wise steward, whom his master will make ruler over his household, to give them their portion in due season? Blessed is that servant whom his master will find so doing he comes.” (Lk 12:42-43)",
      "“Let a man so consider us, as servants of Christ and stewards of the mysteries [Sacraments] of God. Moreover it is required in stewards that one be found faithful” (1 Cor 4:1-2)",
      "c) Consecration or Sanctification:",
      "Lord Jesus Christ said, “for their sakes I sanctify Myself, that they also may be sanctified by the truth” (Jn 17:19). To sanctify means to consecrate; our Lord has consecrated Himself for the ministry and redemption. Likewise, all ranks ofthe Priesthood are consecrated for the ministry according to the example of Lord Jesus Christ, the Great High Priest.",
    ],
  },
  {
    title: "The Order of Deacons",
    paragraphs: [
      "1. Epsaltos (Hymnist, Cantor):",
      "The work of the Epsaltos is obvious from his name that is to learn and sing Church hymns and praises. This rank is mentioned in some of the early Church canons, “Chanters also must be blessed by the Bishop”. Children are usually ordained in this rank as the Psalm says, “Out of the mouth of babes and infants You have ordained strength” (Ps 8:2), the wisdom of children’s ordination is attaching them to the Church in order to grow up being nourished by the Orthodox faith and rites, so that they become steadfast in the faith, clinging to it with a high level of spirituality and holiness, as the Psalm says, “But I am like a green olive tree in the house of God I will praise You forever” (Ps 52:8-9)",
      "2. Anagnostis (Reader, Lector):",
      "His work is the daily readings in Church especially the Holy Epistles; he must read without mistakes so that the congregation may understand what is read. After the Commemoration of the Saints, readers recite the names of the Patriarchs who passed away in the Lord as the deacon says, “Let those who read recite the names of our fathers the Patriarchs who have fallen asleep; 0 Lord repose their souls and forgive us our sins”. Readers also can give sermons to the congregation as mentioned in the rite oftheir ordination, “Lord show Your face to Your servant standing before You to know by Your Holy Words to preach Your laws to Your people, teach them Your pure words for their rescue and salvation”, this is done by the permission from the Bishop or Priest. Readers are required to receive the Church Psalmody (Praises) and receipt it with the chorus during Liturgy and other occasions.",
      "3. Epideacon (Sub-deacon):",
      "His work is to prevent heretics and false teachers from entering the Church, to light the Church’s lamps, to maintain the books ofthe Church, to prepare the censer, to organize the worshipers and to help the deacon and replace him if necessary. These responsibilities are added to the previous ones of the reader.",
      "4. Deacon (Servant):",
      "His work is to recite all the liturgical responses. In the past no one was allowed to enter to the Sanctuary except the Bishop, Priest and the Deacon or Archdeacon, also kings who were believers and anointed by Chrism. The deacon may carry the chalice and give the congregation from the precious blood of the Lord during communion. He reads the Holy Gospel of the Liturgy and may teach or preach by the permission of the Bishop or Priest. The deacon helps the priest in the service by visiting the congregation, widows and orphans, sick, etc. If he was ordained before marriage, he does not marry. If he had a wife and was ordained then his wife died, he remains without marriage like the case of Priests. Ifhe elects to marry, he loses his rank.",
      "5. Archdeacon (Leader of Deacons):",
      "The Archdeacon leads all the ranks of deacons, manages their needs, and specifies their deeds.",
      "Qualifications of Deacons:",
      "St. Paul said, “Deacons must be reverent, not double-tongued, not given to much wine,not greedy for money, holding the mystery of faith with a pure conscience. But let these also first be proved; then let them serve as deacons, being found blameless... Let deacons be the husbands of one wife, ruling their children and their own houses well.” (1 Tim 3:8-9,12)",
      "The twelve apostles set the criteria ofordination of the seven deacons as being “of good reputation, full of the Holy Spirit and wisdom” (Acts 6:3). Although this rank is the smallest of the priestly ranks, St. Paul praised it saying, “Those who have served well as deacons obtain for themselves a good standing and great boldness in the faith which is in Christ Jesus” (1 Tim 3:13). It is also noteworthy to mention that the first Christian martyr was St. Steven the deacon who saw heaven opened and Lord Jesus standing at the right hand of God (Acts 7:56)",
    ],
  },
  {
    title: "The Order of Priests",
    paragraphs: [
      "1. Priest, Elder, Presbyter:",
      "This is the first and essential priestly rank. The priest has the right to administer all the church Sacraments except the laying of hands and ordination, which reserved to the Bishop or someone above him. He teaches the people the word of God, explains to them the dogmas and rites, and leads them to the way of righteousness “For the lips of a priest should keep knowledge, and people should seek the law from his mouth; for he is the messenger of the Lord of hosts.” (Mal 2:7) He is a father who pastors his children compassionately, visits them with tenderness care and love, as he is zealous for their salvation. He humbly serves them as Lord Jesus washed the feet of His disciples.",
      "2. Hegomen, Senior Priest, Archpriest:",
      "This is only a promotional rank from a priest and is not considered as a new ordination. If there were more than one priest serving in the same Church, the oldest in ordination or the most active and knowledgeable is promoted to the rank of hegomen. The rest of the priests submit to him and consider him the primary responsible person in the Church.",
      "3. Khoori-Episcopos (Bishop of a village):",
      "This rank came to existence by the end of the third century in Asia Minor when the dioceses extended and their division to smaller ones was not preferred. Members of the Nicene Council included 15 Khoori-Episcopos from Asia Minor and Syria. This rank disappeared from our Coptic Church and was revived by H.H. Pope Shenouda III when His Holiness ordained several monks as Khoori-Episcopos in order to assist some Bishops and Metropolitans in the service of their wide dioceses. His Holiness promoted most of them later on to general Bishops or Bishops of Dioceses. This rank is closer to the Bishopric rank for the candidate is a monk, holds the title of \"Anba\", his turban is very similar to the Bishop's, has the authority to ordain the various ranks of Deacons, is a member of the Holy synod, and his name is mentioned like the Bishop in all liturgical prayers and hymns.",
    ],
  },
  {
    title: "The Order of Bishops",
    paragraphs: [
      "1. Bishop, Overseer, Episcopos:",
      "This is the highest rank of the Priesthood. Bishops are distinguished from Priests by having the perfection of the Priesthood and the authority to lay hands and ordain all the deaconry and priestly ranks in their dioceses.",
      "2. Metropolitan (Bishop of a large city):",
      "This is a promotional rank from the Bishop, and the Metropolitan is mentioned before the Bishop in all the Church rites.",
      "3. Patriarch, Pope, Archbishop:",
      "The Patriarch is the highest rank in the Bishopric level and has the greatest ruling of Priesthood; he is the leader of the Church, Bishops and Metropolitans. The Patriarch is the successor of our fathers the Apostles and is the symbol of the unity of the Church. He has the right to ordain Bishops (at least one Bishop accompany him) and promote them to Metropolitans. He also has the right to make the Holy oil (Mayron). He heads the sessions of the Holy Synod, which is the highest authority in the Church.",
      "Qualification of Bishops:",
      "St. Paul said, “A bishop must be blameless, as a steward of God, not self- willed, not quick-tempered, not given to wine, not violent, not greedy for money, but hospitable, a lover of what is good, sober-minded, just, holy, self controlled, holding fast the faithfiul word as he has been taught, that he may be able, by sound doctrine, both to exhort and convict those who contradict.” (Titus 1:7-9)",
      "“A bishop then must be blameless, the husband of one wife, temperate, sober-minded, of good behavior, hospitable, able to teach; not given to wine, not violent, not greedy for money, but gentle, not quarrelsome, not covetous. .. not a novice, lest being puffed up with pride he fall into the same condemnation as the devil. Moreover he must have a good testimony among those who are outside, lest he fall into reproach and the snare of the devil.” (1 Tim 3:2-3,6-7)",
      "Q: The Holy Bible said that the Bishop should be “the husband of one wife” (1 Tim 3:2). Why then do we ordain the Bishops from the celibate monks?",
      "A: First of all, “we” don’t ordain anybody; the Pope does, “we” merely recommend the ordination. Secondly, St. John Chrysostom said, “The apostle did not place this order as a basis that he (the Bishop) must be a husband of a wife, but he forbids from this rank the individual who married more than one wife, as he wanted to choose the most pure and modest, but since the door of celibacy and monasticism is opened so the Bishops are ordained from the celibate monks who never married at all.” Moreover, The Holy Book of Revelation (the only Prophetic Book of the New Testament) called the Bishops “Angels” and our Lord said that the angels “neither man'y nor are given in marriage” (Mt 22:30). In the Nicene Council 325 AD, a decision was made that priests must be married because of the nature of their service since they enter houses and solve family problems. Nevertheless, if the priest is widowed, he does not remarry another woman since he is the father of all women and a father cannot marry one of his daughters.",
    ],
  },
  {
    title: "Lord Jesus Christ & The Ranks of Priesthood",
    paragraphs: [
      "Our Lord Jesus Christ practiced certain services that became the essence of the Church ranks:",
      "a) The Epsaltos: The person who holds this rank is required to learn and sing the Church hymns. Lord Jesus Christ sung a hymn with His disciples before going to Gethsemane, “And when they had sung a hymn, they went out to the Mount of Olives” (Mt 26:30)",
      "b) The Anagnostis: The most important work of this rank is reading the Holy Scriptures in Church during the Liturgy. Our Lord practiced the work ofthe reader when He went in the synagogue and stood up to read (Lk 4:16)",
      "c) The Epideacon: The most important work is keeping the Church organized. The Lord did the same when He drove out all those who bought and sold in the temple (Mt 21:12)",
      "d) The Deacon: One of the duties of the Deacon is to pour water for the priest to wash his hands upon the start of the Mass. Our Lord poured water into a basin and washed the disciples’ feet (Jn 13:5)",
      "e) The Priest: The main work of the priest is to sanctify the bread and wine during the Holy Liturgy and to give communion to the congregation. The Lord did the same on Covenant Thursday (Mk 14:22-26)",
      "1) The Hegomen: The role of the Hegomen is to provide for the Church services. It is obvious that our Lord did the same for when He said to Judas “What you do, do quickly” (Jn 13:27) the disciples thought that since Judas had the money box, the Lord had asked him to buy what they need for the feast or to give to the poor (Jn 13:29)",
      "g) The Bishop: The bishop is the shepherd of the flock. St. Peter refers to Lord Jesus as the shepherd and overseer of our souls (1 Pet 2:25) and the Lord said about Himself, “I am the good Shepherd” (Jn 10:14)",
      "h) The Patriarch: Only the Pope can ordain Bishops and our Lord breathed on His apostles and gve them the authority to bind and loose sins (Jn 20:22-23)",
      "Therefore, we find Lord Jesus Christ practicing most of the priestly ranks despite their variation so that every person may find in Him a good example to follow and to know that however small his rank may seem it is not lowly since the Lord Himself practiced and blessed it.",
      "This lecture 15 adapted from ‘The Sacrament of Priesthood’ by H.G. Bishop Mettaous.",
    ],
  },
]

export const anointingTeachingSections: TeachingSection[] = [
  {
    title: "The Sacrament of the Anointing of the Sick",
    paragraphs: [
      "Lecture XVIII: The Sacrament of the Anointing of the Sick",
      "There are two Sacraments for ‘healing’; one for spiritual illness, which is the Sacrament of Repentance & Confession, the other for physical and psychological illness, which is the Sacrament of the Anointing of the Sick.",
    ],
  },
  {
    title: "Institution of The Sacrament",
    paragraphs: [
      "We do not know the exact time or occasion when our Lord instituted this Sacrament, which is no surprise for there are many things that the Lord did that were not written one by one (Jn 21:25), but we know that the Lord said:",
      "“Heal the sick, cleanse the leper.” (Mt 10:8)",
      "“Whatever city you enter, and they received you ....heal the sick who are there.” (Lk 10:8-9)",
      "We also know that the disciples:",
      "“Anointed with oil many who were sick, and healed them.” (Mk 6:13). It is understood that the apostles, having been sent by the Lord, were instructed to do so.",
      "St. James also said:",
      "“Is anyone among you sick? Let him call for the elders (priests) ofthe church, and let them pray over him, anointing him with oil in the name ofthe Lord. And the prayer of faith will save the sick, and the Lord will raise him up. And if he has committed sins, he will be forgiven. Confess your trespasses to one another, and pray for one another, that you may be healed.” (Jam 5:14-16)",
      "Here St. James is talking about both the Sacraments of Confession and Anointing ofthe Sick. This is not an ordinary means ofhealing sickness because it is administered by the priests and not by any person. Since the apostles did not preach their own gospel but delivered to us what they had previously received from the Lord, Therefore, St. James must have received this teaching directly from the Lord.",
    ],
  },
  {
    title: "FAQ",
    paragraphs: [
      "Q1: Why do people sometimes receive this Sacrament and yet are not healed?",
      "A1: It could be because of their lack of faith, “He did not do many mighty works there because of their unbelief” (Mt 13:58) or it could be that God in His wisdom sees that this illness is beneficial to the person’s spiritual life as the case with St. Paul who prayed three times to be healed but God said to him, “My strength is made perfect in weakness” (2 Cor 12:9). We need to understand that in this Sacrament we do not dictate to God what to do but rather ask for his mercies.",
      "Q2: Why does the Church perform this Sacrament to the whole congregation on the last Friday of the Lent?",
      "A2: During the Holy Week of Pascha, the Church does not perform this Sacrament and therefore performs it and anoints the entire congregation on the last Friday ofthe Lent. Moreover, many are weak from fasting and this anointing helps them to continue with the scheduled prayers and food abstinence of the Pascha.",
      "This lecture is adapted fiom, ‘The Church Sacraments ’ by Archdeacon Habib Guirgess.",
    ],
  },
]

export const matrimonyTeachingSections: TeachingSection[] = [
  {
    title: "The Sacrament of Matrimony",
    paragraphs: [
      "Lecture XIX: The Sacrament of Matrimony",
      "Marriage is and has been a universal practice for almost every civilized culture throughout history, yet it is considered to be a Sacrament in the Orthodox Church. A Sacrament is a visible form of an invisible grace, it’s a mystery, an open door through which mankind passes from the realm of the physical and earthly, into the reality of the spiritual and heavenly — the realm of communion with God. A Sacrament is seen through the context of created reality (for example, wine and bread in the Eucharist, water in Baptism, and oil in Confirmation, etc. ..). This created reality is then projected into the Kingdom of God and transformed into a higher reality, which belongs to the spiritual realm. As a result of Lord Jesus Christ’s work of redemption, marriage is raised to a new level that transcends human procreation and legal contracts.",
      "Marriage is, on one level, a created reality, which is indeed a universal practice. Men and women are attracted to each other, fall in love, and marry. But this created reality of marriage can be assumed into the Kingdom of God and sanctified. When a man and a woman come to the Church to be married, they are experiencing the transfiguration of their earthly marriage into the reality of the Kingdom of God. In the Holy Gospel according to St. John 2:1-11, we read about Lord Jesus Christ attending a wedding ceremony in Cana of Galilee. In being at this wedding and in performing His first miracle there, Lord Jesus Christ forever blesses marriage and sets it apart as “sanctified” way of life. This first miracle performed by the Lord at the wedding of Cana of Galilee is also symbolic; the transformation o fwater into wine is symbolic of the Sacramental transformation of the earthly reality of marriage into something heavenly and spiritual.",
      "(Adapted from an article by Fr. John Meyendorff) ‘",
    ],
  },
  {
    title: "Marriage and the Church",
    paragraphs: [
      "Marriage, as a Sacrament, belongs to an entirely different order than the mere union of man and woman through civil contract. It basically regards a husband and wife as symbols of another marriage; namely, the marriage of Lord Jesus and the Church.",
      "“Wives, submit to your own husbands, as to the Lord therefore, just as the church is subject to Christ, so let the wives be to their own husbands in everything.” (Eph 5:22,24)",
      "“Husbands, love your wives, just as Christ also loved the church and gave Himself for it so husbands ought to love their own wives as their own bodies; he who loves his wife loves himself. For no one ever hated his own flesh, but nourishes and cherishes it, just as the Lord does the church.” (Eph 5:25,28-29)",
    ],
  },
  {
    title: "Institution of the Sacrament",
    paragraphs: [
      "Holy Scripture does not explicitly mention when our Lord instituted this Sacrament. Nevertheless, some fathers have said that He instituted it when He attended and blessed the wedding at Cana ofGalilee (Jn 2:1—11) others have said that the Lord instituted it during His discussion with the Pharisees about divorce when He said, “What God has joined together, let no man separate.” (Mt 19:6)",
      "In any case, St. Paul explicitly calls marriage “a great mystery [Sacrament]” (Eph 5:32)",
    ],
  },
  {
    title: "Characteristics of an Orthodox Marriage",
    paragraphs: [
      "No mixed marriages: “Do not be equally yoked together with unbelievers. For what fellowship has righteousness with lawlessness? And what communion has light with darkness? And what accord has Christ with Belial? Or what part has a believer with an unbeliever? And what agreement has the temple of God with idols? For you are the temple ofthe living God.” (2 Cor 6:14-16)",
      "Monogamy: “Let each man have his own wife, and let each woman have her own husband.” (1 Cor 7:2)",
      "Divorce is allowed only for sexual immorality reasons, “Whoever divorces his wife, except for sexual immorality and marries another, commits adultery; and whoever marries her who is divorced commits adultery” (Mt 19:9)",
    ],
  },
  {
    title: "The Goal of an Orthodox Marriage",
    paragraphs: [
      "Very often couples get married for the purpose of filling certain needs that they have in their own personal lives. Therefore, they come to marriage expecting happiness, emotional well-being, personal satisfaction without even having to work for them. When they don’t get these things, they feel cheated or blame their spouse. As Orthodox Christians, we approach marriage very differently. The goal of marriage is not the fullfilment of one’s needs; rather, the ultimate goal of marriage is heaven.",
    ],
  },
  {
    title: "FAQ",
    paragraphs: [
      "Q1: St. Paul said, “The unbelieving husband is sanctified by the wife, and the unbelieving wife is sanctified by the husband” (1 Cor 7:14) Is St. Paul permitting the marriage to unbelievers?",
      "Al: St. Paul is talking to people who believed and were already married yet their spouses did not accept the faith. He said before the above verse, “If any brother has a wife who does not believe, and she is willing to live with him, let him not divorce her. And a woman who has a husband who does not believe, if he is willing to live with her, let her not divorce him” (1 Cor 7:12-13) then he said, “if the unbeliever departs, let him depart; a brother or a sister is not under bondage in such cases” (1 Cor 7:15)",
      "This lecture is adapted fom ‘The Church Sacraments’ by Habib Guirgess.",
    ],
  },
  {
    title: "Resources for Marriage",
    paragraphs: [
      "1. “Before You Say I Do” - by H. Norman Wright",
      "2.“Fire Proof Your Marriage” (Couples Kit) — by Jennifer Dion",
      "3. On Marriage and Family Life Paperback by Saint John Chrysostom",
      "4. http://www.focusonthefamily.ca/marriage/pre-marriage/",
      "7-essential-conversations-to-have-with-your-future-spouse",
      "5. http://www.smalley.cc/",
      "6. http://www.5lovelanguages.com/",
    ],
  },
]

export const salvationTeachingSections: TeachingSection[] = [
  {
    title: "The blood of Christ and salvation",
    paragraphs: [
      "“How shall we escape if we neglect so great a salvation.” (Heb 2:3)",
      "I) The Blood of our Lord Jesus Christ & Salvation:",
      "Salvation is only available through the blood of our Lord and Savior Jesus Christ, “without shedding of blood there is no remission” (Heb 9:22). The Passover lamb was a symbol of our Lord, “For indeed Christ, our Passover, was sacrificed for us” (1Cor 5:7). Through the blood of the lamb, the Israelites were saved from death, “Now the blood shall be a sign for you on the houses where you are, and when I see the blood, I will pass over you and the plague shall not be on you to destroy you when I strike the land of Egypt” (Ex 12:13). Through this precious blood sins are remitted and we enter in a new covenant with God, “This is My blood of the new covenant which is shed for many for the remission of sins” (Mt 26:28).",
      "+ Some Biblical References +",
      "“ Shepherd the Church of God which He purchased with His own blood.” (Acts 20:28)",
      "“Having now been justified by His blood, we shall be saved fiom wrath through Him.” (Rom 5:9)",
      "“In Him we have redemption through His blood.” (Eph 1:7) & (Col 1:14)",
      "“In Christ Jesus you who once were far off have been made near by the blood of Christ.” (Eph 2:13)",
      "“Having made peace through the blood of His cross.” (Col 1:20)",
      "“Not with the blood ofgoats and calves, but with His own blood He entered the most Holy place once for all, having obtained eternal redemption.” (Heb 9:12)",
      "“. . .How much more shall the blood of Christ, who through the eternal spirit offered Himself without spot to God, purge your conscience from dead works to serve the living God.” (Heb 9:14)",
      "“Therefore brethren having boldness to enter the Holiest by the blood of Jesus.” (Heb 10:19)",
      "“Of how much worse punishment, do you suppose, will be thought worthy who has trampled the son of God underfoot, counted the blood of the covenant by which he was sanctifieda common thing, and insulted the Spirit of grace?” (Heb 10:29)",
      "“. . .To Jesus the Mediator of the new covenant, and to the blood of sprinkling that speaks better things than that of Abel” (Heb 12:24)",
      "The blood of our Lord Jesus Christ speaks better things than that ofAbel because the blood of Abel was seeking revenge as God said to Cain, “The voice of your brother’s blood cries out to Me from the ground” (Gen 4:10). On the other hand, the blood of Lord Jesus Christ was seeking forgiveness of sins, “Father, forgive them for they do not know what they do.” (Lk 23:34).",
      "“Now may the God of peace through the blood of the everlasting covenant, make you complete in every good work to do His will.” (Heb 13:20-21)",
      "“You were not redeemed with corruptible things ...but with the precious blood of Christ as of a “lamb without blemish and without spot.” (1Pet 1:18-19)",
      "“There are three that bear witness on earth: the Spirit, the water, and the blood; and these three agree as one.” (1Jn 5:8)",
      "“The blood of Jesus Christ His Son cleanses us from all sin.” (1Jn 1:7)",
      "“... To Him who loved us and washed us from our sins in His own blood...” (Rev 1:5)",
      "“.. You were slain, and have redeemed us to God by Your blood ...” (Rev 5:9)",
      "“These are the ones who came out of the great tribulation, and washed their robes and made them white in the blood of the lamb.” (Rev 7:14)",
      "“And they over came him by the blood of the lamb ...” (Rev 12:11)",
    ],
  },
  {
    title: "Application and conditions",
    paragraphs: [
      "+ Application of the above concept:",
      "1. The sins of the people in the Old Testament were not forgiven until the day of the crucifixion of our Lord Jesus Christ. All the sins of the Old Testament were merely “put away” as Nathan the Prophet said to King David, “The Lord also has put away your sin; you shall not die” (2Sam 12:13). He didn’t say ‘ has forgiven your sin ’ because “without shedding of blood there is no remission” (Heb 9:22). Hence, the Paradise was closed in front all the righteous people of the Old Testament until the day when our Lord Jesus Christ shed His ‘Blood on the cross and sins were remitted. The term “put away” means that the sin is transferred from one’s account to the account of the Savior.",
      "2. When our Lord said to the paralytic “your sins are forgiven you” (Lk 5:20), He merely gave him a promise of forgiveness or a check so to speak, which would be cashed on the cross. This applies to all the instances where forgiveness and salvation were mentioned before the crucifixion (the sinful woman, the tax collector, Zacchaeus, and others. . .).",
      "+ Conditions for Salvation:",
      "Our Lord said that His blood is shed for many (Mt 26:28) but in reality only few are saved (Mt 7:13-14).",
      "This sad reality is due to the fact that there are certain conditions (prerequisites) for Salvation:",
      "1. Faith.",
      "2. Saving Sacraments:",
      "a) Baptism.",
      "b) Confirmation.",
      "c) Repentance & Confession.",
      "d) Eucharist.",
      "3. Good Works.",
      "Each of these conditions will be discussed separately after we clarify certain points:",
      "1. Baptism, Confirmation and Eucharist don’t apply to the people of tie Old Testament because they acquire their saving efficacy from the blood of our Lord and the work of the Holy Spirit, which pertains to the New Testament. Nevertheless, the people of the Old Testament had symbols of these Sacraments like Circumcision being symbolic for Baptism (Col 2:11-12).",
      "2. The above conditions for salvation apply to normal responsible adults. Whenever these conditions are mentioned, people come up with all sorts of scenarios to question them. For instance, mentally challenged individuals and infants don’t possess the intellectual ability to understand and believe and therefore the condition of faith doesn’t apply to them.",
      "3. The Sacrament of the Priesthood administers to us the saving Sacraments and therefore plays a major role in our salvation and even though we don’t have to become priests to be saved, we do need them for our salvation as “stewards of the mysteries of God” (1Cor 4:1).",
    ],
  },
  {
    title: "Salvation as the story of the whole life",
    paragraphs: [
      "Salvation is the story of the whole life:",
      "St. Paul said that, “The message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God” (1Cor 1:18). Salvation in the Orthodox concept is seen as comprehending all of life; it is not a historical event that took place during a moment in the past. As the subject of salvation is addressed in Holy Scripture, the Orthodox Christian would see it in at least three aspects:",
      "a) I believe that I have been saved, having put on our Lord Jesus Christ in baptism.",
      "b) I believe that I am being saved, growing in our Lord Jesus Christ through the sacramental life ofthe Church.",
      "c) I believe that I will be saved, by God’s mercy in the Last Day of Judgment.",
    ],
  },
  {
    title: "The Beginning of Salvation",
    paragraphs: [
      "The story of salvation starts by faith, repentance and baptism, “He who believes and is baptized will be saved” (Mk 16:16), “Repent, and let everyone of you be baptized in the name of Jesus Christ for the remission of sins” (Acts 2:38), this remission includes the original sin as well as all actual sins committed before baptism. Baptism provides us with salvation, forgiveness and regeneration. In baptism we are buried with our Lord Jesus Christ (Col 2:12), we die and rise with Him in the newness of life (Rom 6:4), “Knowing this, that our old man was crucified with Him, that the body of sin might be done away with, that we should no longer be slaves of sin” (Rom 6:6). Through baptism, we become children of God and members of His body (the Church). Moreover, St. Paul said, “As many of you as were baptized into Christ have put on Christ” (Gal 3:27).",
    ],
  },
  {
    title: "Growth Through the Holy Spirit",
    paragraphs: [
      "In the Sacrament of Confirmation, we receive the gift of the Holy Spirit, “you have an anointing fiom the Holy One” (1Jn 2:20), and we become a temple of the Holy Spirit, “do you not know that your body is the temple of the Holy Spirit who is in you, whom you have from God” (lCor 6:19). As a result of our response to the work of the Holy Spirit within us, we grow spiritually and bear the fruits of the Spirit (Gal 5:22-23).",
      "Unfortunately, we still sin after being baptized and confirmed, “If we say that we have no sin, we deceive ourselves, and the truth is not in us” (1Jn 1:18). Even though our nature was renewed, we did not become infallible. The nature we receive in baptism is pure, yet liable to sin, as was Adam’s nature before the fall. The gift of regeneration that we receive in baptism does not cancel the gift of free will. Nevertheless, there is a difference between people who sin without being baptized, while living the life of wickedness and those who sin after baptism. The later have the Holy Spirit to rebuke and lead them to repentance, sin is temporary unless a person, with his/her free will, decides to reject repentance insulting the spirit of grace (Heb 10:29) and thus blasphemes against the Holy Spirit (Lk 12:10).",
    ],
  },
  {
    title: "Repentance, Confession, and Eucharist",
    paragraphs: [
      "Through repentance and confession we are being saved, “Unless you repent you will all likewise perish” (Lk 13:3, 5), “If we confess our sins, He is faithful and just to forgive us our sins and to cleanse us from all unrighteousness” (1Jn 1: 9). Additionally, we obtain salvation during Holy Eucharist, as the priest says in the Divine Liturgy,“ “. .. given for us salvation, remission of sins and eternal life to those who partake of it”, “whoever eats My flesh and drinks My blood has eternal life” (Jn 6:54).",
    ],
  },
  {
    title: "Trials and Spiritual Warfare",
    paragraphs: [
      "Our life on earth is a test of our faith, “Now for a little while, if need be, you have been grieved by various trials, that the genuineness of your faith, being much more precious than gold that perishes, though it is tested by fire, may be found to praise, honor, and glory at the revelation of Jesus Christ” (lPet 1:6—7). Indeed, “We must through many tribulations enter the kingdom of God” (Acts 14:22). Moreover, we are subject to spiritual warfare, “we do not wrestle against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this age, against spiritual hosts of wickedness in the heavenly places” (Eph 6:12), “Be sober, be vigilant; because your adversary the devil walks about like a raring lion, seeking whom he may devour” (lPet 5:8).",
    ],
  },
  {
    title: "Endurance and the Last Day",
    paragraphs: [
      "Our Lord said, “He who endures to the end will be saved” (Mt 10:22), “He who overcomes shall inherit all things” (Rev 21:8). St. Paul said, “Lest, when I have preached to others, I myself should become disqualified” (lCor 9:27), therefore, he also said, “Work out you salvation in fear and trembling” (Phil 2:12) and St. Peter exhorts us, “conduct yourselves throughout the time of your sojourning here in fear” (lPet 1:17). The outcome of our life and struggle will be revealed in the last day, “. . .you, who are kept by the power of God through faith for salvation ready to be revealed in the last time” (lPet 1:5). Therefore, our Lord said, “Be faithful until death, and I will give you the crown of life” (Rev 2:10).",
      "Since the spiritual struggle and warfare takes up our whole life, therefore salvation is indeed the story of the whole life.",
      "* This lecture is adapted from ‘The Heresy of Salvation in a Moment ’ by H.H. Pope Shenouda III.",
    ],
  },
]

export const saintsTeachingSections: TeachingSection[] = [
  {
    title: "On the Saints’ Intercession & Veneration",
    paragraphs: [
      "“Assuredly, I say to you, wherever this gospel is preached throughout the whole world, what this woman did will also be spoken of as a memorial to her.” (Mk 14:9)",
      "+ Lecture VI: On the Saints’ Intercession & Veneration +",
      "In Lecture II of Mariology, we presented, by the grace of God, the Orthodox Concept of intercession. However, we need to highlight the fact that in honoring the saints and angels we do not put them in the place of Lord Jesus Christ or even adjacent to Him. No one except Lord Jesus Christ is able to save man from sin thus when the saints pray for us, it is our salvation that they seek from the Lord. They intercede with Him for our salvation. From the Lord they entreat our salvation — not, however, as if they themselves have the power to save, for the only one who saves is Lord Jesus Christ.",
    ],
  },
  {
    title: "Biblical Examples of Intercession",
    paragraphs: [
      "Biblical Exam les of Intercession:",
      "(Gen 20:1-7) 9 Abimelech King of Gerar took Sarah to his palace because our father Abraham said that she was his sister. However God rebuked him and ordered him to restore Sarah to her husband and said to him, “...he [Abraham] will pray for you and you shall live” (Gen 20:7).",
      "(Job 42:7,8) God made the prayer of Job the Righteous on behalf of the three friends a condition for their forgiveness.",
      "(Gen 18:26-32) God said to our father Abraham that He would not destroy Sodom “for the sake” of even 10 righteous people. _",
      "(Jer 5:1) It is written that God is ready to pardon Jerusalem for the sake of one righteous person.",
      "(Ex 32:7-14) We read about Moses the Prophet interceding on behalf of the People with God.",
      "Thus we conclude that God Himself encourages and accepts intercession. However, someone may protest and say that the above holy verses are examples of intercession of people who are still alive. Therefore, we shall mention more biblical examples about the intercession of saints who have already departed:",
      "(Ex 32:13) Moses the Prophet is asking God to act for the sake of Abraham, Isaac, and Israel.",
      "(1 Kg 11:l2,13) God declares that He will not tear the kingdom away in the days of King Solomon “for the sake” of his father David the Prophet who had already departed.",
      "(Jer 15:1) God, wanting to illustrate how sever His wrath towards the people, said, “Even if Moses and Samuel [who had already departed] stood before Me, My mind would not be favorable toward this people.” — This shows that the principle of intercession does exist.",
    ],
  },
  {
    title: "God Honors His Saints",
    paragraphs: [
      "God honors His saints by giving them extraordinary powers and gifis. For instance we read that the dead bones of Elisha the Prophet raised the dead (2 Kg 13:21) and the handkerchiefs or aprons of St. Paul healed the sick and cast out demons (Acts 19:12) while the shadow of St. Peter healed the sick (Acts, 5:15). Therefore, Elijah the Prophet said with confidence, “there shall not be dew nor rain these years, except at my word.” (1 Kg 17:1) — Our Lord said, “If anyone serves Me, him My Father will honor.” (Jn 12:26)",
      "Thus, since God Himself has honored His saints, and accepted their intercessions, we are not mistaken if we honor them and ask for their prayer, blessings and intercession.",
      "Q1: Do the saints who departed and the angels know what happens on earth?",
      "A1: Our Lord said, “Likewise, I say to you, there is joy in the presence of the angels of God over one sinner who repents.” (Lk 15:10) — Thus the angels know and also react to what happens on earth. Moreover, our Lord said that the saints who depart would be like “angels of God in heaven.” (Mt 22:30) Therefore we read about the souls of the martyrs that they knew that God had not avenged their blood yet (Rev 6:10). Also our father Abraham knew that the rich man had received his good things in his life time and that Lazarus evil things (Lk 16:25) he also knew about Moses and the prophets. St. Paul said, “Now I know in part, but then I shall know just as I also am known.” (1 Cor 13:12)",
      "Q2: Why are the Orthodox Churches named after saints aren’t they God’s Churches?",
      "A2: Indeed they are. However, naming the house of God after the saints does not mean that they share God’s Glory. For instance, God’s temple was called after King Solomon and God’s Law was called the “Law of Moses” (Mal 4:4) also the inspired Holy Scriptures are God’s words yet we read “the words of Jeremiah” (Jer 1:1) and “the vision of Isaiah” (Is 1:1) — Moreover, we read about the heavenly Jerusalem, “Now the wall of the city had twelve foundations, and on them were the names of the twelve apostles of the Lamb.” (Rev 21:14) Also, God called Himself the God of Abraham, Isaac and Jacob (Ex 3:6; 4:5; Mt 22:32)",
      "Q3: Is the veneration of the saints’ relics border on idolatry?",
      "A3: The holy relics are neither idols nor deities, nor figures of God, and their veneration is not idol worship. For inasmuch as God has glorified them, giving them miraculous power, so too should we venerate them, for this way we honor God, who bestowed His grace on them (2 Kg 13:21). — These relics were the temple of the Holy Spirit (1 Cor 6:19) and thus we are not honoring the bones themselves, but the divine grace bestowed on them.",
      "A Final Word:",
      "The interaction between the heavenly hosts (saints & angels) and the Church in this world is a practical reality that we experience and thus is not really subject to theological debate and philosophical arguments. Those who deny this reality are the ones who lose the blessings.",
      "* This lecture is adapted from ‘Comparative Theology’ by H.H. Pope Shenouda III.",
    ],
  },
]

export const fastingTeachingSections: TeachingSection[] = [
  {
    title: "Fasting (ጾም)",
    paragraphs: [
      "Fasting is abstinence from all things a body needs, including animal products and any kind of food for a limited time (Fetha Negest 15, Matthew 6:16)",
      "The aims of fasting:",
      "- to make the desire of the body to obey the will of the soul*",
      "- to seek forgiveness for our guilt",
      "- to increase the reward of the soul",
      "The relationship between fasting and religion is strong and everlasting*",
    ],
  },
  {
    title: "Fasting in the Old Testament",
    paragraphs: [
      "Fasting in the Old Testament",
      "In the Old Testament, fasting had a very prominent place",
      "- when the prophets wanted to communicate with God, they did not eat food and drink water (Exodus 34:28)*",
      "- fasting and prayer were used to prevent the anger of God (Joel 2:15).",
      "- righteous people received what they needed and whished through fasting and praying (Ezra 8:21; Nehemiah 9:1-3; Esther 4:16-17)*",
    ],
  },
  {
    title: "Fasting in the New Testament",
    paragraphs: [
      "Fasting in the New Testament",
      "Fasting has significant value in the New Testament",
      "- our Saviour Jesus Christ made fasting the beginning of His ministry (Matthew 4:2; Luke 4:2)*",
      "- He has also taught that fasting has the power of driving away evil spirits (Matthew 17:21; Mark. 9:2)",
      "- The Apostles who were commanded to serve the church received guidance from the Holy Spirit while they were praying and fasting (Acts 13:2)*",
      "- Priests and deacons were inspired and ordained while fasting and praying (Acts 13:3; 14:23)",
      "- The righteous people received what they needed and whished through fasting and praying (Acts 10:30; 13:2-3)",
    ],
  },
  {
    title: "Things to Consider While Fasting",
    paragraphs: [
      "Things to consider while fasting",
      "Abstain from animal products and alcoholic drinks which trigger desire (lust) (Daniel 10:2-3).",
      "Give what has been saved during fasting to the poor or the Church (Isaiah 58:6-7)*",
      "Keep yourself from evil things- eyes from seeing, your mouth from speaking and your ear from hearing evil things (Matthew. 5:21-30; St.Yared-Digua).",
      "Do not fast for a show",
      "Do not fast while blaming others",
      "Do not fast without repentance and asking forgiveness",
      "Do not consider diet for our health as fasting",
    ],
  },
  {
    title: "Fasting in Ethiopian Orthodox Tewahedo Church",
    paragraphs: [
      "There are seven fasting periods",
      "1. The Great Fast/Lent (ዐብይ ጾም)",
      "2. Wednesdays and Fridays (የረቡዕ እና አርብ ጾም)",
      "3. Nineveh (ጾመ ነነዌ)",
      "4. Gehad (the eves of Christmas and Epiphany) (ጾመ ገኃድ)",
      "5. The fast of the prophets or advent (ጾመ ነብያት)",
      "6. The fast of the Apostles (ጾመ ሐዋርያት)",
      "7. The fast of the Assumption of the Holy Virgin Mary (ጾመ ፍልሰታ ለማርያም)",
    ],
  },
  {
    title: "Lent or the Great Fast",
    paragraphs: [
      "1. Lent or the Great Fast",
      "This is the fast that our Lord and Savior Jesus Christ fasted for forty days and forty nights after his baptism",
      "This Lent is called great because",
      "- it is the Lord’s fast",
      "- Satan’s temptations (love of money, greediness and arrogance) were overcome (Matthew 4:2)*",
      "The Church observes this fast following the example set by Lord",
      "All Christians, young and old must observe this Fast",
      "The Great Fast has 8 weeks which consist of 55 days.",
      "According to St. Yared, the Ethiopian Hymnologist who wrote hymn of our Church, each Sunday during the Great Fast is given name",
      "1. Zewerede (ዘወረደ)",
      "2. Kidist (ቅድስት)",
      "3. Mikurab (ምኩራብ)",
      "4. Metsague (መጻጉ)",
      "5. Debre Zeit (ደብረ ዘይት)",
      "6. Gebrhel/Good Servant (ገብርሄል)",
      "7. Nicodemus (ኒቆዲሞስ)",
      "8. Hoshanna/Palm Sunday (ሆሣህና)",
    ],
  },
  {
    title: "Sundays of the Great Fast I",
    paragraphs: [
      "Sundays of the Great Fast",
      "1. Zewerede – means the one who descends from the above",
      "– on this Sunday, the descent, incarnation and crucifixion of our Lord Jesus Christ is preached (John 3:13).",
      "2. Kidist – means Holy and it tells the Holiness of Sunday",
      "3. Mikurab – the word stands for the synagogue",
      "– It reminds us that our Lord Jesus Christ taught in the synagogue during his ministry",
      "4. Metsague – means a person who is in poor health (infirm)",
      "– A hymn for the healing of the sick and giving sight to the blind by the Lord is sung on this day",
      "5. Debre Zeit – the Geez word for Mount of Olive",
      "– on this Sunday, our Lord taught about the second coming on Mount of Olives",
    ],
  },
  {
    title: "Sundays of the Great Fast II",
    paragraphs: [
      "Sundays of the Great Fast",
      "6. Gebrhel/Good Servant",
      "– The story of the good servant who received five talents and made a profit of five more talents is told on this day (Matthew 25:14-30).",
      "7. Nicodemus (ኒቆዲሞስ)",
      "– A hymn commemorating the coming of Nicodemus to our Lord during the night is sung",
      "8. Palm Sunday",
      "– It is a commemorative day on which our Lord entered the temple in triumph and during which the people sung “Hosanna in the highest”.",
      "Sundays of the Great Fast",
      "Questions",
      "1. Why do we fast OR what are the objectives of fasting?",
      "2. How many fasting periods are there in the Ethiopian Orthodox Tewahedo Church? Please mention one of them.",
      "3. What makes the Lent or Great Fast different/special?",
    ],
  },
  {
    title: "The Passion Week (ሰሞነ ህማማት)",
    paragraphs: [
      "The week from the eve of Palm Sunday to Easter is known as Passion Week.",
      "In this week, varieties of food are not eaten",
      "Adoration (ስግደት) is given to God",
      "Gibrehimamat, a book composed of different passages dealing with the passion and death of our Lord the Savior Jesus Christ is read",
      "The priests wear black vestments, and the altar is covered with black cloth",
      "Prayer for the dead and that of intercession are not conducted to commemorate the suffering and damnation of 5500 years since Adam was alienated from his Creator.",
      "The Passion Week (ሰሞነ ህማማት)",
    ],
  },
  {
    title: "Maundy Thursday (የጸሎት ሐሙስ/ሕጽበተ ሐሙስ)",
    paragraphs: [
      "On this day, the Lord Jesus",
      "- Washed his Disciples’ feet with an absolute humility",
      "- Ate the Last Supper with them and",
      "- Revealed the mystery of the Holy Communion",
      "In commemoration of the above, on this day, the priests wash the feet of the parishioners before the Liturgy.",
      "Maundy Thursday (የጸሎት ሐሙስ/ሕጽበተ ሐሙስ)",
    ],
  },
  {
    title: "Good Friday (ስቅለት)",
    paragraphs: [
      "On this day, our Lord Jesus Christ was crucified.",
      "Passages from the Scriptures and other religious books are read in remembrance of Jesus Christ’s crucifixion",
      "The faithful (parishioners) intensively prostrate (adorate)",
      "Sometimes, Good Friday is called the day of prostration.",
      "Late in the afternoon, the priests pat (touch) the portioners with small olive tree branches and command them to prostrate. Patting symbolizes the whipping of our Lord.",
      "At the end of the day, prayer of intercession (የምልጃ ጸሎት) is conducted, and the program is concluded.",
      "The Apostles did not eat and drink until they knew the resurrection of the Lord.",
      "Portioners who have the strength, fast from every kind food for two days (Friday and Saturday). Those who don’t have the strength, fast on Saturday only (Lk. 5:5-35; Fetha Negest Art.15 No. 578).",
      "Good Friday (ስቅለት)",
    ],
  },
  {
    title: "Important Events on Saturday Morning",
    paragraphs: [
      "The laity and the clergy gather in the church",
      "After the morning prayer, the clergy give sedge to the assembled people by singing “Christ made reconciliation by his crucifixion’",
      "The portioners tie the sedge around their heads",
      "The clergy go to the houses of the people who did not come to the Church and give them sedges as good news. They wear vestments, hold cross and ring a bell in the process.*",
      "Using sedge as a sign of good news has a Biblical history. When the earth was covered by the water of destruction, an olive leaf brought by a dove into Noah’s Ark was used as indicator the lowering of the water.",
      "This Sabbath is a day on which Christ passed lying in the grave",
      "This Saturday is called “Se’ur” – unobserved Saturday because once a year it becomes a fast day. It is also called the green Saturday.",
      "Important events on Saturday morning",
    ],
  },
  {
    title: "The Fast of the Apostles (ጾመ ሐዋርያት)",
    paragraphs: [
      "This fast was observed by the Apostles after they received the Holy Spirit and before they set out to proclaim the Gospel.",
      "Orthodox Tewahedo Christians observe this fast following the Pentecost Sunday (the day the Holy Spirit descended on the Apostles) up until Hamle 5 (12 July).",
      "This fast sometimes goes beyond 40 days and sometimes falls short of 30 days.",
      "Christians observe this Fast to express their thanks for the Apostles’ endurance of persecution and to receive blessing.",
      "The Fast of the Apostles (ጾመ ሐዋርያት)",
    ],
  },
  {
    title: "The Fast of Wednesdays and Fridays",
    paragraphs: [
      "Wednesdays and Fridays are observed as fast days, except for the 50 days between Easter and Pentecost and on days of Christmas and Epiphany",
      "Why are these days observed as fast days?",
      "- Wednesday is a day on which the Jewish Council discussed to crucify the Lord (John 11:46-53)",
      "- Instruction is given that Christians should fast on this day remembering the death sentence made against Jesus Christ.",
      "- Friday this is a blessed day on which the Lord is crucified in His flesh and the long awaiting redemption was fulfilled (John 19:17).",
      "Because of the above reasons it is canonized that Wednesday and Friday should be observed every week in fasting and prayer.",
      "The Fast of Wednesdays and Fridays",
    ],
  },
  {
    title: "The Fast of Nineveh (ጾመ ነነዌ)",
    paragraphs: [
      "This is a three days fast – Monday, Tuesday and Wednesday.",
      "Depending on the years, it falls either in January or in February.",
      "Reason for this fast",
      "- The people of Nineveh committed great wickedness",
      "- God called up on prophet Jonah to warn the residents",
      "- Jonah attempted to flee from ‘the presence of God’",
      "- Jonah was swallowed by a whale",
      "- Jonah prays to God inside the belly of the whale",
      "- God commanded the whale to spit Jonah out",
      "- God again commanded Jonah to travel to Nineveh and prophesy to the inhabitants",
      "- The people of Nineveh fasted for three days and were saved from the wrath (extreme anger and punishment) of God (Jonah 3:5-9; Matthew 12:39)",
      "The Fast of Nineveh (ጾመ ነነዌ)",
    ],
  },
  {
    title: "The Fast of the Prophets (ጾመ ነብያት)",
    paragraphs: [
      "This fast starts on Hidar 15 (November 24) and extends to Tahisas 28 (06 January)",
      "We observe this fast following the example set by the prophets.",
      "In their time, the prophets fasted and prayed longing for the Advent (the coming) of Christ.",
      "In the Law of Kings Article 15, instruction is given that we should observe this fast before we celebrate Christmas.",
      "The Fast of the Prophets (ጾመ ነብያት)",
      "We observe this Fast:",
      "- To celebrate the gift, we acquired following the birth of Jesus Christ",
      "- To take part in the blessings of our forefathers, the Prophets and the Apostles",
      "Gehad (ጾመ ገኃድ)",
    ],
  },
  {
    title: "Gehad (ጾመ ገኃድ)",
    paragraphs: [
      "This is a fast observed on the eves of Christmas and Epiphany, when they fall on a Wednesday or a Friday.",
      "On Christmas and Epiphany, the Holy Liturgy is celebrated from midnight to 3:00am.",
      "In the morning people eat animal products even if the days are Wednesdays or Fridays.",
      "So, if Christmas and Epiphany fall on Wednesday and Friday, Tuesday and Thursday will be observed as fast days.",
      "As Christmas Eve is generally a fasting day anyway, this only has the effect of forbidding fasting on Christmas even if it falls on a Wednesday or Friday.",
    ],
  },
  {
    title: "The Fast of Assumption of the Virgin Mary (ጾመ ፍልሰታ ለማርያም)",
    paragraphs: [
      "This is a two weeks fast (1 to 15 Nehassie/7-21 August).",
      "It was observed by Apostles requesting God to reveal the body of St. Virgin Mary.",
      "St. Virgin Mary completed her earthly life and departed on 21 Ter (30 January) in 50 A.D.",
      "While the Apostles were taking her body for burial at Gethsemani, the Jewish priests dispersed them. Following this, the body of St. Virgin Mary was taken by the Angels to paradise and put under the Tree of Life (The Miracle of St. Mary, Sinaxarium Nehassie (August) 16 E.C).",
      "St. John, the Apostle, was used to be taken to the paradise to burn incense over the body of St. Virgin Mary. When he told them this fact, the Apostles they went for retreat and fasted for two weeks, praying to God to reveal this mystery to them.",
      "The Fast of Assumption of the Virgin Mary (ጾመ ፍልሰታ ለማርያም)",
      "On the 14th day of their fast, the Angels brought our Lady’s body and gave them to bury it.",
      "On the 3rd day, on the 16th of August E.C (22 August G.C.) her Assumption took place.",
      "From that time onwards, our Church observes the fast of our Lady’s Assumption.",
      "This fast is being observed by all Orthodox Christians, including Children.",
      "Many elderly people go for retreat leaving their home, abstaining from nutritious food and subsisting only on cereals and water.",
      "They spend all the 15 days fasting and praying to receive the blessings of St. Mary and to get answers for their outstanding issues.",
      "The Fast of Assumption of the Virgin Mary (ጾመ ፍልሰታ ለማርያም)",
      "In the tradition of the Ethiopian Orthodox Church, all its followers above the age of seven should observe all the seven fasts mentioned above.",
    ],
  },
]

export const worksTeachingSections: TeachingSection[] = [
  {
    title: "Faith and works belong together",
    paragraphs: [
      "The lesson asks whether mere faith suffices for salvation and answers no. It cites Matthew 7:21: “Not everyone that saith unto Me Lord, Lord, shall enter into the kingdom of heaven; but he that doeth the will of My Father.”",
      "It also cites James 2:26: “Faith without works is dead.” The lesson concludes that the perfection of religion is attained by faith and works together, though never apart from the aid of the grace of God.",
    ],
  },
  {
    title: "Good deeds, evil deeds, and grace",
    paragraphs: [
      "Good deeds are defined as every inward or outward action good and pleasing to God which the faithful are bound by divine law to perform.",
      "Evil deeds are every inward or outward action opposed to God's holiness, which the believer is bound by law to avoid.",
      "The believer requires knowledge, free will, and always the grace of God, which helps the willing and diligent in the way of obedience. Therefore every believer should ask for this grace in prayer so as to behave according to the religious law.",
    ],
  },
]

export const bibliographySections: TeachingSection[] = [
  {
    title: "Lesson sources",
    paragraphs: [
      "The Church of the Virgin Mary & St. Athanasius Catechism Guide Book III lists the following bibliography.",
      "The Orthodox Creed: www.Coptic.net/prayers/Creed.txt",
      "The Triunity of God: www.suscogts.org",
      "The Nature of Our Lord Jesus Christ: www.suscogts.org",
      "What is a Sacrament: www.suscopts.org",
      "The Sacrament of Baptism: www.suscogts.org",
      "The Sacrament of Confirmation: www.suscogts.org",
      "The Sacrament of Repentance & Confession: www.suscopts.org",
      "The Sacrament of Eucharist: www.suscopts.org",
      "The Question of the Real Presence: www.suscopts.org",
      "The Sacrament of Priesthood: www.suscogts.org",
      "The Sacrament of Anointing of the Sick: www.suscogts.org",
      "The Sacrament of Matrimony: www.suscogts.org",
      "Resources for Marriage: John Magdy Girgis, Sub-deacon.",
      "Salvation in The Orthodox Concept: www.suscopts.org",
      "Saints’ Intercession & Veneration: www.suscogts.org",
      "Fasting: www.suscogts.org",
      "The Ethiopian Orthodox Tewahedo Liturgy of St. Basil. This document is not included in the book. Please see the linked liturgy PDF used in the source edition.",
      "Additional acknowledgments in the printed source include St. Marina Church in Los Angeles, St. George Church of Greater Philadelphia, and Catechism of the Church vol. 1870 by Fr. Filothaus.",
    ],
  },
]

export const jesusLetterSections: TeachingSection[] = [
  {
    title: "A devotional closing reading",
    paragraphs: [
      "Dear Friend:",
      "How are you? I just had to send you this letter to tell you how much I love and care about you. I saw you yesterday as you were walking with your friends. I waited all day, hoping you would talk to Me also.",
      "As evening drew near, I gave you a sunset to close your day and a cool breeze to rest you, and I waited. You never came. Oh yes, it hurt Me, but I still love you because I am your friend.",
      "I saw you fall asleep last night, and I longed to touch your brow, so I spilled moonlight upon your pillow and face. Again I waited, wanting to rush down so we could talk. I have so many gifts for you.",
      "You awakened late and rushed off for the day. My tears were in the rain. Today you looked so sad, so alone. It makes my heart ache because I understand. My friends let Me down and hurt Me many times too, but I love you.",
      "I try to tell you in the quiet green grass. I whisper it in the leaves and trees. I breathe it in the colors of the flowers. I shout it to you in the mountain streams, and give the birds love songs to sing. I clothe you with warm sunshine and perfume the air.",
      "My love for you is deeper than oceans and bigger than the biggest want or need that you have. We will spend eternity together in heaven. I know how hard it is on this earth. I really know because I was there, and I want to help you.",
      "My Father wants to help you too. He's that way, you know. Just call Me, ask Me, talk to Me. It is your decision. I have chosen you, and because of this I will wait.",
      "Because I love you.",
      "Your friend, Jesus",
    ],
  },
]

export const creedExplanationSections = [
  {
    title: "Orthodox Creed",
    paragraphs: [
      "(Nicene Creed)",
      "Christian Orthodox Faith: Dogma",
      "Dogma is what is believed, taught, confessed and practiced. Dogmas, to the Coptic Orthodox Church, are not merely theological concepts concerning God, man, the Church, eternal life, heavenly creatures, demons, and other such matters, which are to be discussed among clergymen, scholars and laymen. Rather, they are, in essence, daily experiences which each member of the Church should live. In other words, dogmas representing our faith in God have one message, namely, our communion with God the Father in Jesus Christ, the Incarnate Word of God, by His Holy Spirit.",
    ],
  },
  {
    title: "The Orthodox Creed",
    paragraphs: [
      "Truly we believe in One God, God the Father, the Almighty, creator of Heaven and earth and of all things visible and invisible.",
      "We believe in one Lord, Jesus Christ, the only begotten Son of God, born of the Father before all ages. Light of Light; True God of True God; begotten, not made; consubstantial with the Father, by whom all things were made. Who for us and for our salvation descended from Heaven, and was incarnate of the Holy Spirit and of the Virgin Mary, and became man. He was crucified for us during the reign of Pontius Pilate. He suffered and was buried. He arose from the dead on the third day, according to the Scriptures. He ascended to the heavens, and sits at the right hand of His Father. He will come back in His glory to judge the living and the dead; and His Kingdom shall have no end.",
      "Truly we believe in the Holy Spirit, the Life—Giving Lord, who proceeds from the Father; we worship and glorify Him together with the Father and the Son, Who speaks through the prophets. We believe in one Holy, Universal and Apostolic Church, and we acknowledge one baptism for the remission of sins. We await the resurrection of the dead, and the life of the world to come.",
      "Amen",
    ],
  },
  {
    title: "Explanation of the Orthodox Creed",
    paragraphs: [
      "The essence of our religious convictions depends not on external experiences but on our acceptance of God-given truths. Surely one cannot prove truths of the spiritual world by any laboratory experiments. These truths belong to the sphere of personal religious experience. The more a We begin the Creed with “We believe.” This is because person grows in the spiritual life – the more one prays, thinks about God, does good – the more his inner spiritual experience develops, the clearer the religious truths become to him. In this fashion, faith becomes for him a subject of personal experience. We believe that God is one fullness of perfection; we believe that He is a perfect spirit, timeless, without beginning, all-powerful and all-wise. God is everywhere, sees all, and knows beforehand when something will happen. He is good beyond measure, just and all-holy. He needs nothing and is the reason for everything that exists.",
      "We believe that God is one in Essence and Trinity in Persons (i.e., the one true God has appeared to us as Father, Son, and Holy Spirit). The Father, Son, and Holy Spirit is the Trinity, one in Essence and indivisible. The Father is not born and does not proceed from the others. The Son pre-eternally was born of the Father, and the Holy Spirit eternally proceeds from the Father",
      "We believe that all the Persons of the Holy Trinity are equally in divine perfection, greatness, power, and glory. That is, we believe that the Father is true and perfect God, the Son is true and perfect God, and, the Holy Spirit is true and perfect God. Therefore, in prayers, we simultaneously glorify the Father, the Son, and the Holy Spirit as one God.",
      "We believe that the entire visible and invisible world was created by God. In the beginning God created the invisible, great angelic world, otherwise known as Heaven. As stated in the Bible, God created our material or physical world from nothing. This was not done at once, but gradually during periods of time which in the Bible are called “days.” God created the world not out of necessity or need but out of His all-good desire to do so in order that His other creations might enjoy life. Being Himself endlessly good, God created all things good. Evil appeared in the world from the misuse of free will, with which God has endowed both angels and people. For example, the Devil (Satan) and his demons were at one time angels of God. But they rebelled against their Creator and became demons. They were cast out of Heaven and formed their own kingdom called “hell.” From that moment on, they tempted people to sin and became our enemies and the enemies of our salvation",
      "We believe that all things are under God’s control; that is, he provides for every creature and guides everything to a good goal. God loves and looks after us as a mother looks after her child. For this reason nothing bad can befall a person who trusts in God.",
    ],
  },
  {
    title: "The Son of God, our Lord Jesus Christ",
    paragraphs: [
      "He came to earth and took on our flesh by the Holy Spirit and the Virgin Mary. Being God from all eternity, He in the time of King Herod took on our human nature, both soul and body, and is therefore truly God and truly man, or the God-man. In one divine Person He combined two natures, divine and human. These two natures will remain with Him always without change, neither blending nor changing from one into the other.",
      "We believe that our Lord Jesus Christ, while living on earth, enlightened the world by His teaching, His example, and miracles. He taught people what they should believe and how they should live so that they may inherit eternal life. By His prayers to His Father, His complete obedience to the Father’s Will, His sufferings and death, He defeated the devil and redeemed the world from sin and death. By His Resurrection from the dead, He laid the foundation for our resurrection. After His Ascension in the flesh to Heaven, which took place forty days after His Resurrection from the dead, our Lord Jesus Christ sat at the right hand of God the Father; that is to say, He received equal power with God the Father and since then together with Him governs the face of the world.",
      "We believe that the Holy Spirit, proceeding from God the Father from the beginning of the world, together with the Father and the Son gives existence to all creation, gives life, and governs all. He is the source of a grace-filled spiritual life, both for angels as well as people, and equally with the Father and the Son is worthy of all glory and worship. The Holy Spirit in the Old Testament spoke through the prophets. Then in the beginning of the New Testament, He spoke through the Apostles and now lives in the Church of Christ, guiding her pastors and people in the truth.",
      "We believe that our Lord Jesus Christ founded the Church on earth for the salvation of all who believe in Him. He sent the Holy Spirit to the Apostles on Pentecost. Since that time the Holy Spirit abides in the Church, that grace-filled community or union of believing Orthodox Christians, and preserves her in the purity of Christ’s teaching. The grace of the Holy Spirit abides in the Church, cleanses those who repent of sins, helps the believers grow in good deeds, and sanctifies them.",
      "We believe that the Church is One, Holy, Catholic and Apostolic. She is One because all Orthodox Christians, although belonging to different national, local churches, are one family together with the angels and saints in Heaven. The oneness of the Church depends on oneness of Faith and Grace.",
    ],
  },
  {
    title: "The Church and the Sacraments",
    paragraphs: [
      "The Church is Catholic because what we believe is the same teaching held to be true by all Orthodox Christians, always and everywhere. The Church is called Apostolic because it preserves Apostolic teaching and the Apostolic succession. From ancient times, this Apostolic succession passes on without interruption from Bishop to Bishop in the sacrament of Ordination. The Church will remain of our Lord and Savior until the end of time.",
      "We believe that in the sacrament of Baptism the believer is forgiven all sins. The believer becomes a member of the Church. Access to the other sacraments of salvation becomes available to him at this time. In the sacrament of Chrismation the believer receives the grace of the Holy Spirit. In Confession or Repentance, sins are forgiven. In Holy Communion, offered at the Divine Liturgy, the believer receives the very Body and Blood of Christ. In the sacrament of Matrimony, an inseparable union is created between a man and a woman. In the sacrament of Ordination Deacons, Priests, and Bishops are ordained to serve the Church. In Holy Unction, the healing of physical and spiritual illness is offered.",
      "We believe that before the end of the world Jesus Christ, accompanied by angels, will again come to the earth in glory. Every person, according to His Word, will resurrect from the dead. A miracle will occur in which the souls of people who have died will return into the bodies which they possessed during their earthly life. All the dead will come to life. During the General Resurrection, the bodies of the saints, both those resurrecting and those still living will be renewed and become spiritualized in the image of the Resurrected Body of Christ. After the resurrection, everyone will appear before the Judgment of Christ, to receive what he is due, according to what he has done when he lived in his body, good or evil.",
    ],
  },
  {
    title: "After the Judgment",
    paragraphs: [
      "After the Judgment, unrepentant sinners will enter into eternal torments and the righteous into eternal life. This will begin the Kingdom of Christ, which will have no end. With the one word “Amen” we witness to the fact that we accept and acknowledge with our whole heart this Creed which we confess to be true.",
      "The Creed is read by a Catechumen (one about to receive Baptism) during the Mystery of Baptism. During the Baptism of an infant, the Creed is read by the Sponsor. The Creed is sung at the Liturgy and should be read daily at Morning Prayers. An attentive reading of the Creed greatly strengthens our faith. This happens because the Creed is not just a formal statement of belief but a prayer. When we say “I believe” in a spirit of prayer, along with the other words of the Creed, we enliven and strengthen our Faith in God and in all those truths which are contained in the Creed. This is why it is so important for the Orthodox Christian to recite the Creed daily or at least regularly.",
    ],
  },
]

export function getLessonBySlug(slug: string) {
  return catechumenLessons.find((lesson) => lesson.slug === slug)
}

export function getLessonById(id: number) {
  return catechumenLessons.find((lesson) => lesson.id === id)
}
