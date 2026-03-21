export type CatechumenSection = "Foundations" | "Core Beliefs" | "Sacrament" | "Spiritual Life" | "Completion"

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
    title: "What is a Sacrament",
    slug: "what-is-a-sacrament",
    description: "Begin to see the sacraments as holy mysteries through which grace is received and lived.",
    section: "Sacrament",
    duration: "6 min read",
    whyItMatters: "This lesson prepares the learner for the sacramental path ahead.",
  },
  {
    id: 7,
    title: "The Sacrament of Baptism",
    slug: "sacrament-of-baptism",
    description: "Discover why baptism is the gateway into the life of the Church.",
    section: "Sacrament",
    duration: "8 min read",
    whyItMatters: "Baptism marks rebirth, belonging, and entry into covenant life.",
  },
  {
    id: 8,
    title: "The Sacrament of Confirmation",
    slug: "sacrament-of-confirmation",
    description: "Learn how holy chrism seals the baptized person into the life of the Spirit.",
    section: "Sacrament",
    duration: "6 min read",
    whyItMatters: "Confirmation completes initiation and strengthens the believer in grace.",
  },
  {
    id: 9,
    title: "The Sacrament of Repentance & Confession",
    slug: "sacrament-of-repentance-confession",
    description: "See confession as healing, restoration, and a continuing return to God.",
    section: "Sacrament",
    duration: "9 min read",
    whyItMatters: "Repentance is not punishment; it is the doorway back into communion.",
  },
  {
    id: 10,
    title: "The Sacrament of Eucharist",
    slug: "sacrament-of-eucharist",
    description: "Encounter the Eucharist as the heart of worship and participation in Christ’s life.",
    section: "Sacrament",
    duration: "9 min read",
    whyItMatters: "The Eucharist is the center of Orthodox sacramental life.",
  },
  {
    id: 11,
    title: "The Sacrament of Priesthood",
    slug: "sacrament-of-priesthood",
    description: "Understand spiritual fatherhood, service, and ordained ministry in the Church.",
    section: "Sacrament",
    duration: "7 min read",
    whyItMatters: "It clarifies how the Church shepherds, teaches, and serves the faithful.",
  },
  {
    id: 12,
    title: "The Sacrament of Anointing of the Sick",
    slug: "sacrament-of-anointing-of-the-sick",
    description: "Learn how the Church prays for healing in body and soul through holy anointing.",
    section: "Sacrament",
    duration: "6 min read",
    whyItMatters: "This sacrament reveals the Church’s pastoral care in weakness and suffering.",
  },
  {
    id: 13,
    title: "The Sacrament of Matrimony",
    slug: "sacrament-of-matrimony",
    description: "See Christian marriage as covenant, mutual sanctification, and holy witness.",
    section: "Sacrament",
    duration: "7 min read",
    whyItMatters: "It shows how Orthodox life is lived not only in church, but in the home.",
  },
  {
    id: 14,
    title: "Salvation in the Orthodox Concept",
    slug: "salvation-in-the-orthodox-concept",
    description: "Explore salvation as healing, union with God, and lifelong transformation.",
    section: "Spiritual Life",
    duration: "10 min read",
    whyItMatters: "It reframes salvation as a living path, not a single slogan.",
  },
  {
    id: 15,
    title: "Saints’ Intercession & Veneration",
    slug: "saints-intercession-veneration",
    description: "Learn why the Church honors the saints and asks for their prayers with confidence.",
    section: "Spiritual Life",
    duration: "8 min read",
    whyItMatters: "It helps newcomers see the communion of saints as family, not distance from Christ.",
  },
  {
    id: 16,
    title: "Fasting",
    slug: "fasting",
    description: "Discover fasting as a school of freedom, prayer, and spiritual discipline.",
    section: "Spiritual Life",
    duration: "7 min read",
    whyItMatters: "Fasting trains the heart to desire God more deeply.",
  },
  {
    id: 17,
    title: "Works and Faith",
    slug: "works-and-faith",
    description: "See how Orthodox life holds belief and lived obedience together.",
    section: "Spiritual Life",
    duration: "8 min read",
    whyItMatters: "This lesson guards against shallow belief and empty performance alike.",
  },
  {
    id: 18,
    title: "Bibliography",
    slug: "bibliography",
    description: "Gather a careful list of further reading for slower, deeper study.",
    section: "Completion",
    duration: "5 min read",
    whyItMatters: "It gives the learner trustworthy next steps without overload.",
  },
  {
    id: 19,
    title: "Letter from our Lord Jesus Christ",
    slug: "letter-from-our-lord-jesus-christ",
    description: "Close the path with a devotional final reading that calls the heart to respond.",
    section: "Completion",
    duration: "4 min read",
    whyItMatters: "The journey ends with invitation, not mere information.",
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
    key: "Sacrament" as const,
    title: "Sacrament",
    description: "Walk through the holy mysteries that shape worship, repentance, healing, and communion.",
  },
  {
    key: "Spiritual Life" as const,
    title: "Spiritual Life",
    description: "Learn the rhythm of salvation, fasting, the saints, and faithful living.",
  },
  {
    key: "Completion" as const,
    title: "Completion",
    description: "Finish with further reading and a final reflective invitation.",
  },
]

export const catechumenStats = [
  { label: "Formation path", value: "19 lessons" },
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
    title: "Introduction",
    paragraphs: [
      "One day St. Augustine was walking on the sandy beach by the sea. There churned in his mind the mystery of the Holy Trinity. He was talking to himself, “One God, but Three Persons. Three Persons, not three gods but One God. What does it mean? How can it be explained? How can my mind take it in?”",
      "As he was tormenting his mind and beating his brain, he saw a little boy on the beach. The child had dug a small hole in the sand. With his little hands he was carrying water from the sea and dumping it into the little hole. St. Augustine asked, “What are you doing, my child?” The child replied, “I want to put all the water of the sea into this hole.”",
      "St. Augustine asked again, “But is it possible for all the water of this great sea to be contained in this little hole?” The child answered, “If the water of the finite sea cannot be contained in this little hole, then how can the Infinite Triune God be contained in your mind?” Then the child disappeared; he was actually an angel.",
      "The doctrine of the Holy Trinity is not merely an article of faith that men are called to believe. It is not simply a dogma that the Church requires her members to accept. Neither is it the invention of scholars or the result of intellectual speculation. The doctrine of the Holy Trinity arises from God’s own revelation about Himself. God is known only as He makes Himself known to us through the revealing and saving agency of His Word and Spirit.",
      "The lesson places over this teaching the verse, “Let Us make man in Our image, according to Our likeness” (Gen 1:26), using it as the opening scriptural witness that the Church reads in the light of full revelation.",
    ],
  },
  {
    title: "How God reveals Himself",
    paragraphs: [
      "God revealed Himself through Himself, through the incarnation of His Son among us as our Saviour and by the power of His Spirit. The Christian doctrine of God is therefore inescapably and essentially Christocentric, for it pivots upon God’s self-revelation and self-communication in the incarnation.",
      "This does not mean that all our knowledge of God can be reduced to Christology, but that all authentic knowledge of God is derived and understood in accordance with the incarnate reality of God’s self-revelation in our Lord Jesus Christ.",
      "It is with the same force that our knowledge and worship of God include the Holy Spirit. The Holy Spirit is no less divine than the Son. How could the Spirit pour the love of God into our hearts, mediate the Lord Jesus Christ to us, and make Christ present to us, if the Spirit were not Himself divine like the Father and the Son and of one and the same Being with them?",
      "Apart from the communion of the Holy Spirit we could not enjoy the grace of the Lord Jesus Christ and the love of God the Father. God reveals Himself through Himself, and what God communicates to us is not something of Himself but His very Self, true God from true God.",
      "That is the central truth upon which the Christian conception of God and of His saving activity depends, as the great theologians and councils made clear in the fourth century in their use of the term homoousion: consubstantial, of one substance, of one and the same Being with the Father.",
      "The Gospel does not merely present God as Father, Son, and Holy Spirit for our sake. God really is Father, Son, and Holy Spirit in Himself, and reveals Himself as such. Therefore, the economic Trinity and the theological Trinity are not to be separated from one another.",
    ],
  },
  {
    title: "The Triunity of God",
    paragraphs: [
      "When we look into the Trinitarian content of this self-revelation of God as Father, Son, and Holy Spirit, One Being and Three Persons, we become aware of its unique and exclusive nature. To believe in God as a Trinity in His eternal Being means renouncing every form of unitarianism as well as every form of polytheism.",
      "The Holy Trinity is a Unity and the Unity is a Trinity, for God is Triune in Himself and it is in a triune way that God makes Himself known to us. There is no One Being apart from the Three Persons, and there are no Three divine Persons apart from the One Being.",
      "At the same time, although God reveals Himself truly, He is not comprehended by us fully. Even in His condescension to reveal Himself, God infinitely exceeds what we can grasp or conceive. As St. Paul says, “Now I know in part” (1 Cor. 13:12).",
      "This means that faithful teaching on the Trinity moves from Unity to Trinity and from Trinity to Unity, because God is only God as He is Father, Son, and Holy Spirit.",
      "The lesson also keeps St. Paul's words in view: “Now I know in part, but then I shall know just as I also am known” (1 Cor 13:12).",
      "As St. Gregory Nazianzen said, “No sooner do I place before the mind the One, than I am surrounded by the splendor of the Three. No sooner do I distinguish the Three, than I am brought back to the One.”",
      "The fathers and theologians of the early Church reflected that the right way to break through into a new realm of truth is the way of faith. Hence the principle widely proclaimed in the Church: unless you believe, you will not understand.",
      "It must also be said that while the Triune God reveals Himself as a whole and is the object of our knowing as a whole, this does not mean that we can know Him wholly or comprehensively. In His transcendent wholeness God eludes our comprehension. What God allows us to apprehend breaks through the narrow confines of our grasp, so that in apprehending something of Him we know we are incapable of comprehending Him fully.",
    ],
  },
]

export const christologyTeachingSections: TeachingSection[] = [
  {
    title: "Our faith concerning Christology",
    paragraphs: [
      "Our Lord Jesus Christ is God Himself, the Incarnate Logos, who took to Himself a complete manhood. His Divine Nature is united with His Human Nature in a complete Hypostatic Union without mingling, confusion, alteration, or separation. Furthermore, the unity between the two Natures occurred without transmutation. Thus neither the Divine Nature transmutes to the Human Nature, nor did the Human Nature transmute to the Divine.",
      "Without mingling as in the case of wheat and barley or salt and sugar. Without confusion as in the case of wine and water or tea and milk. Without alteration as in the case of chemical union. In contrast, no change occurred to the Divine or Human Nature as a result of their unity. Without separation, for His Divinity parted not from His Humanity for a single moment nor a twinkling of an eye.",
      "The Divine Logos was united with the Human Nature that He took from the Virgin Mary by the action of the Holy Spirit. This unity took place from the first moment of the Holy Pregnancy. As a result of this union, One Nature, that is one entity, was formed out of both: the One Nature of God the Incarnate Logos.",
      "The term One Nature does not refer to either of the two Natures alone, but to the result of the union of both Natures into this one Incarnate reality. The term Two Natures implies division or potential separation, so the Church carefully speaks of the one Incarnate Logos.",
    ],
  },
  {
    title: "Examples and summary",
    paragraphs: [
      "Human language is inadequate when it comes to describing this union, but some examples may help. One example is the union between iron and fire. The iron is not changed into fire or the fire into iron, yet they are united. Another example is the union between the human spirit and the body. The result is one human being, not two separate beings.",
      "Therefore, just as we say that a person is one nature consisting of body and spirit, we can also say about the Incarnate Logos that He is one entity of two natures, Divine and Human. The union of the spirit and the body is hypostatic. So is the union of the Divine Logos and the Human Nature in the Virgin’s womb.",
      "In a nutshell: Our Lord Jesus Christ has two natures: the Divine Nature of the Logos and the Human Nature that He took from the Virgin Mary. The Human Nature is full and complete. The Divine Nature of the Logos is united with every element of the Human Nature without mingling, confusion, alteration, transmutation, or separation.",
      "As a result of this Hypostatic Union, One Entity is formed out of both Divine and Human Natures. This is the One Nature of God the Incarnate Logos. When the Lord died on the Cross, His Human Spirit was separated from His Human Body, but the Divine Logos remained united with both. That is why His body was not corrupted in the grave and why the spirit could return to the body in the Resurrection.",
    ],
  },
  {
    title: "Miaphysite faith and one will",
    paragraphs: [
      "The Oriental Orthodox Churches are Miaphysite, not Monophysite. There is a difference between those who teach one single divine nature only and those who confess one united incarnate nature of the Logos, fully Divine and fully Human. We do not believe in a single divine nature without true humanity. We believe in One Incarnate Nature of the Logos.",
      "Because we confess that after the union of the Divine and Human Natures there is one Incarnate Logos, we also speak of one will and one act. There is no contradiction or conflict between the will and the act of the two Natures. What the Divine Nature chooses is undoubtedly chosen by the Human Nature.",
      "Our Lord Jesus Christ said, “My food is to do the will of Him who sent Me, and to finish His work” (Jn 4:34). This proves the unity of His will with the Father. If there were no unity between the will of the Divine Logos and His Human Nature, internal conflict would have resulted. Far be it from Him.",
      "The complete righteousness that marked the life of our Savior was due to the unity of His Divine and Human will. The crucifixion was the choice of both the Divine and Human will. Had it not been one will, it could not be said that He died by His own will for us. And since the will is one, the act is also one.",
      "The human nature actually consists of three elements: body, spirit, and soul, as St. Paul says in 1 Thessalonians 5:23. Only two are sometimes mentioned for simplicity, but the Church insists that our Lord had a full human nature.",
      "The lesson frames all of this under the Lord’s question, “But who do you say that I am?” (Mt 16:15), and strengthens the teaching with John 4:34, John 8:46, and 1 Thessalonians 5:23 in the body of the reading.",
    ],
  },
]

export const sacramentTeachingSections: TeachingSection[] = [
  {
    title: "Introduction",
    paragraphs: [
      "To materialists, this world is opaque like a curtain; nothing can be seen through it. A mountain is just a mountain, a sunset just a sunset; but to poets, artists and saints, the world is transparent like a windowpane: it tells of something beyond. For example, a mountain tells of the power of God, the sunset of His beauty, and the snow white of His purity.",
      "A Sacrament, in a very broad sense of the term, combines two elements: one visible, the other invisible. One can be seen, tasted, touched, or heard while the other remains unseen to the eyes of the flesh. There is, however, some relation or significance between the two.",
      "A spoken word is a kind of sacrament because there is something material or audible about it; there is also something spiritual about it, namely its meaning. A horse can hear the sound of words, but only man grasps the meaning. In the same way, a handshake is a kind of sacrament, because there is something seen and felt, namely the clasping of hands, but there is also something unseen, namely the communication of friendship.",
      "A kiss is also a kind of sacrament. Its physical side is present if one kisses one’s own hand, but its spiritual side is missing because there is no sign of affection for another. No wonder our Lord said to Judas, “Are you betraying the Son of Man with a kiss?”",
      "No wonder our Lord said to Judas, “Are you betraying the Son of Man with a kiss?” (Jn 22:48). The brazen serpent in the wilderness is then set before us from Numbers 21:8-9, and our Lord explains its fulfillment in John 3:14.",
      "Take the brazen serpent in the desert. When the people were bitten by poisonous serpents, God commanded Moses to make a brazen serpent and lift it up. Whoever looked upon it in faith was healed. This was not magic. God used a material thing as a sign of trust and a means of healing. Our Lord later revealed its full meaning when He told Nicodemus that as the serpent was lifted up in the wilderness, so the Son of Man must be lifted up.",
      "The word sacrament in Greek means mystery, and our Lord Jesus Christ has been called by St. Paul “a great mystery” (1 Tim 3:16). In Him is something divine and something human, something eternal and something temporal, something invisible and something visible. As the humanity of our Lord became the bearer of divine life, so the sacraments became the effective means of sanctification purchased by His death and resurrection.",
      "If men were pure spirits, there would have been no need for the Lord Jesus Christ to use human nature or material things for the communication of the divine. But because man is composed of body and soul, matter and spirit, he receives the spiritual most fittingly through the material.",
    ],
  },
  {
    title: "Sacraments and Salvation",
    paragraphs: [
      "One often sees signs painted on roadways saying, “Jesus saves.” This is true, but the important question is: how does He save? If our relationship with Him were only by memory or reading, then it would not be much different from our relation to great teachers of the past. The answer is found in the sacraments.",
      "The divine life of the Lord is communicated through His Church, His mystical body, in exactly the same way that His divine life was communicated when He walked on earth. As He then used His human nature as the instrument of divinity and used material things as means to confer grace, so now He uses human natures, the priests, and material things such as water, bread, wine, and oil as instruments for the communication of the same divine life.",
      "As He used clay and water in the case of the man born blind (Jn 9:11), He now uses water, bread, wine, and oil as means for the communication of grace. The Holy Spirit works in these mysteries, for our Lord said, “He will take of what is Mine and declare it to you” (Jn 17:14 in the book's reference).",
      "Every sacrament has an outward or visible sign. For example, in Baptism it is water, in the Eucharist it is bread and wine. It also has a form or formula: words of spiritual significance given to the matter when it is conferred. Three things are required for a sacrament: its institution by the Lord Jesus Christ, an outward sign, and the power of conferring the grace purchased for us by His Passion, Death, and Resurrection.",
      "Calvary is like a reservoir of divine life or grace. From it there flows seven different kinds of sanctification for man in different stages in his spiritual existence. Each of these seven channels is a sacrament through which the power of the risen Christ is bestowed on souls by a spiritual and effective contact.",
      "This grace pours into the soul when we receive the sacraments, unless we put an obstacle in the way. The sacraments do not confer grace as magical signs. They communicate it only because they are in contact with the risen Christ through the work of the Holy Spirit.",
      "The Seven Holy Sacraments are: Holy Orders (Priesthood), Baptism, Confirmation, Eucharist, Repentance and Confession, Anointing of the Sick, and Matrimony.",
    ],
  },
]

export const sacramentQna: QnaItem[] = [
  {
    question: "The word “mystery” occurred in Holy Scripture with many meanings. How are these meanings different from the sacraments of the Church?",
    answer:
      "The word mystery in Holy Scripture has two meanings: mysteries of knowledge that God reveals, that is hidden truths; and mysteries of grace where the Holy Spirit grants invisible gifts, that is the sacraments.",
  },
  {
    question: "What verses does the lesson group under mysteries of knowledge?",
    answer:
      "The lesson lists Psalm 25:14, Amos 3:7, Daniel 2:19, Luke 8:10, 1 Corinthians 2:7, 1 Corinthians 13:2, Ephesians 1:9, Ephesians 6:19, Colossians 1:26, Colossians 4:3, Colossians 2:2, and 1 Timothy 3:16.",
  },
  {
    question: "What verse does the lesson use for mysteries of grace?",
    answer:
      "It points especially to Ephesians 5:31-32, where marriage is called a great mystery in relation to Christ and the Church.",
  },
]

export const baptismTeachingSections: TeachingSection[] = [
  {
    title: "Institution and Saving Power",
    paragraphs: [
      "Baptism is the Holy Sacrament through which we are born again by being immersed in water three times in the name of the Holy Trinity: the Father, the Son, and the Holy Spirit. It has the primacy among the Seven Holy Sacraments because it is the door through which the individual enters the Church and is given the right to partake of the rest of the sacraments.",
      "Our Lord Jesus Christ instituted this sacrament after His resurrection when He said, “Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit” and “He who believes and is baptized will be saved.” Thus baptism is necessary for salvation, as the Lord also said, “Unless one is born of water and the Spirit, he cannot enter the Kingdom of God.”",
      "How does baptism save us? Salvation means remission of sins, and without shedding of blood there is no remission. Salvation is made available through the redemptive death of our Lord Jesus Christ. In order to share this salvation, we must share His death and resurrection. St. Paul teaches that we are buried with Christ through baptism into death so that we may also live with Him.",
      "The lesson cites Matthew 28:18-19, Mark 16:16, John 3:5, Hebrews 9:22, Philippians 3:10, Romans 6:3-8, Romans 6:11-12, Romans 8:13, Galatians 5:24, Galatians 2:20, Colossians 3:3, 2 Corinthians 4:10, Colossians 3:5, and Romans 6:7 inside this teaching.",
      "The salvation that begins with our death and burial with Christ through baptism continues through a life of putting sin to death. Therefore baptism is not a mere ritual washing, but participation in the death and resurrection of the Lord.",
    ],
  },
  {
    title: "Figures, Meaning, and Practice",
    paragraphs: [
      "The Old Testament contains many symbols of baptism: the Spirit of God moving over the waters in Genesis, Noah’s ark and the flood, circumcision, the crossing of the Red Sea, the laver of bronze, Elijah, the Jordan, and the entry into the Promised Land.",
      "More specifically, the lesson names Genesis 1:2, Noah's ark, circumcision, the crossing of the Red Sea, the laver of bronze, Elijah's sacrifice, the Jordan, and the sea of glass in Revelation as figures that help catechumens understand baptism.",
      "St. John the Baptist’s baptism was preparatory and not the same as Christian baptism. It was a baptism of repentance, but the full saving relation to the death and resurrection of Christ and the gift of the Holy Spirit had not yet been established. Acts 19:1-5 shows why those who had only received John's baptism still needed Christian baptism.",
      "The lesson also explains the effectiveness of baptismal water by insisting that water is not working alone. Water united with the Holy Spirit becomes a means of regeneration and cleansing, as seen in the examples of Naaman and the man born blind.",
      "Baptism is by immersion, for to baptize means to immerse. The Ethiopian Orthodox Tewahedo Church baptizes by triple immersion in the name of the Father, the Son, and the Holy Spirit. Immersion best expresses burial and rising with Christ.",
      "The Church allows baptism by sprinkling only in exceptional medical cases where immersion cannot be performed and death is near. In such emergency cases, even an Ethiopian Orthodox Tewahedo Christian layperson may baptize with water in the name of the Holy Trinity.",
    ],
  },
  {
    title: "Infants, One Baptism, and Questions",
    paragraphs: [
      "The Church baptizes infants because baptism is necessary for salvation and infants are not exempt from the need for new birth. Circumcision, a symbol of baptism, was given to infants in the Old Covenant, and there is no verse in Holy Scripture forbidding infant baptism. The promise of God is given to believers and to their children.",
      "The Church confesses one baptism for the remission of sins. Baptism is performed once and is not repeated, because it is a spiritual birth and a dying with the Lord, and both happen once.",
      "The one-baptism teaching is tied to Ephesians 4:5. The lesson's questions also cite Mark 16:16, John 3:3, John 3:5, Ephesians 2:3, 1 Corinthians 15:50, Genesis 17:14, and 1 Corinthians 5:7 when speaking about Old Testament people and infants who die without baptism.",
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
      "In the Sacrament of the Eucharist, believers eat Lord Jesus Christ’s Holy Body and drink His precious Blood under the physical appearance of bread and wine. This Sacrament is called the Sacrament of all Sacraments and the crown of the Sacraments. In the Ethiopian Orthodox Tewahedo Church, no Sacrament is to be administered on the same day after the person has partaken from Holy Communion.",
      "Our Lord instituted this Sacrament on Covenant Thursday, just a few hours before His arrest and trial. After He had washed the feet of the disciples as a sign of repentance and preparation, He took bread, blessed it and broke it, and gave it to the disciples saying, 'Take, eat; this is My body.' Then He took the cup and gave it to them, saying, 'Drink from it, all of you. For this is My blood of the new covenant, which is shed for many for the remission of sins.' St. Paul repeats the same apostolic witness in 1 Corinthians 11:23-26.",
    ],
  },
  {
    title: "Old Testament symbols and the real presence",
    paragraphs: [
      "The offering of Melchizedek, who brought out bread and wine, was a symbol of this Holy Sacrament. The Passover lamb also pointed forward to it, for indeed Christ our Passover was sacrificed for us. The manna in the wilderness was another symbol, as our Lord said, 'I am the living bread which came down from heaven... and the bread that I shall give is My flesh.'",
      "The lesson grounds this section in Genesis 14:18, Psalm 110:4, Hebrews 5:6, 1 Corinthians 5:7, John 6:58, and John 6:51.",
      "Our Lord spoke openly about this mystery in John 6, and many objected, asking how He could give His flesh to eat. Yet He did not correct them into a symbolic reading. Instead, He spoke even more strongly: 'My flesh is food indeed, and My blood is drink indeed.' Because of this, the Church has always confessed the real presence of Christ in the Eucharist.",
      "St. Cyril of Jerusalem taught that by partaking of the body and blood of Christ we become of one body and one blood with Him. St. John of Damascus taught that the Holy Spirit comes upon the bread and wine and accomplishes what surpasses words and thought. The Church therefore confesses a true change and real presence, received sacramentally and not explained away.",
    ],
  },
  {
    title: "Benefits, worthiness, and the Eucharistic sacrifice",
    paragraphs: [
      "The lesson names several benefits of the Sacrament: abiding in Christ, eternal life, growth and maintenance of spiritual life, salvation and remission of sins, and the unification of believers into one body. At the same time, St. Paul warns that unworthy communion brings judgment. Therefore the believer must approach with Orthodox faith, repentance and confession, reconciliation with others, obedience to Church discipline, and a humble sense of unworthiness.",
      "The verses directly woven into this part include John 6:56, John 15:5, John 6:54, John 6:58, John 6:53, John 6:55, John 6:57, Matthew 26:28, 1 Corinthians 10:17, 1 Corinthians 11:27-31, Matthew 5:23-24, and 1 Corinthians 4:4.",
      "The Orthodox Church also confesses that the Eucharist is not only a Sacrament but also a sacrifice and offering to God. The words of institution speak of Christ’s body given and blood shed. The existence of an altar, the prophecy of Malachi’s pure offering, and St. Paul’s language about the Lord’s table all support this confession. The sacrifice of the Cross and the sacrifice of the Eucharist are not opposed: the Cross offered the Body and Blood visibly once, while the Eucharist offers them sacramentally as a bloodless sacrifice from its institution until the second coming.",
      "The lesson also answers common questions: why communion is not given to those outside the Orthodox faith, why the real presence matters, and how the Church differs from Roman Catholic sacramental practice in administration while still confessing the true Body and Blood of Christ.",
    ],
  },
  {
    title: "The Question of the Real Presence",
    paragraphs: [
      "The lesson defines three major positions: transubstantiation, consubstantiation, and memorialism or real absence. It explains that Oriental and Eastern Orthodox Christians firmly confess a true change and real presence while avoiding speculative excess and remaining within Holy Tradition.",
      "It then gives biblical reasons, logical reasons, and historical reasons for believing in the real presence. John 6 is treated as central. The lesson argues that our Lord did not correct the Jews or disciples into a merely symbolic reading, but spoke more strongly, saying, 'My flesh is food indeed, and My blood is drink indeed.'",
      "It also appeals to John 2:19-21, John 7:37-39, John 8:25-27, John 6:51-66, Mark 4:34, John 19:33 and 19:36, Psalm 27:2, Micah 3:2-3, Galatians 5:15, 1 Corinthians 11:29, Matthew 26:26-28, Mark 14:22-24, Luke 22:19-20, Romans 3:4, 1 Corinthians 10:15-16, Luke 22:20, Exodus 12:46, Hebrews 9:22, and the witness of the apostolic churches and the fathers. The historical section notes that even Luther did not deny presence, while later memorialism is treated as a departure.",
    ],
  },
]

export const priesthoodTeachingSections: TeachingSection[] = [
  {
    title: "The Sacrament of Priesthood",
    paragraphs: [
      "The Sacrament of Priesthood is the Holy Sacrament by which the Bishop lays his hand on the elected candidate so that the Holy Spirit descends upon him and grants him one of the priestly ranks. As a result, the ordained person receives authority to perform the ministry of the Church, whether the Holy Sacraments, teaching, or other forms of service. This is called laying on of hands or ordination.",
      "Lord Jesus Christ instituted this Sacrament when He chose the twelve and consecrated them for ministry. He gave them authority to bind and loose sins, to baptize, and to receive the mystery of His Body and Blood. The lesson stresses that this authority is not self-taken. 'No man takes this honor to himself, but he who is called by God.' Priesthood is therefore divine choice, faithfulness and stewardship, and consecration for ministry.",
    ],
  },
  {
    title: "The ranks of deacons, priests, and bishops",
    paragraphs: [
      "The order of deacons includes the Epsaltos, Anagnostis, Epideacon, Deacon, and Archdeacon. Each rank has work in hymnody, reading, order, liturgical service, and care for the people. Scripture gives qualifications of reverence, purity, wisdom, and good reputation for deacons.",
      "The order of priests includes the Priest or Presbyter, the Hegomen or Archpriest, and the Khoori-Episcopos. The priest administers the Church’s sacraments except ordination and serves as teacher, pastor, and spiritual father. The Hegomen is a rank of responsibility among priests. The Khoori-Episcopos stands close to the episcopal rank and assists in broad fields of service.",
      "The order of bishops includes the Bishop, Metropolitan, and Patriarch. The bishop has the fullness of priesthood and ordains the ranks beneath him. The Metropolitan is a higher rank of oversight. The Patriarch is the leader of the Church, the successor of the Apostles in that see, the head of the synod, and the one who ordains bishops and prepares the Holy Oil.",
      "The lesson also includes the rank of Khoori-Episcopos and notes its historical use and later revival, while presenting the material for the Ethiopian Orthodox Tewahedo Church context.",
    ],
  },
  {
    title: "Qualifications and Christ as the model of priesthood",
    paragraphs: [
      "The lesson includes apostolic qualifications for bishops and deacons from Titus and 1 Timothy: blamelessness, sobriety, hospitality, sound doctrine, gentleness, holiness, and good reputation. It also explains why bishops are ordained from celibate monks, drawing on patristic interpretation and the Church’s discipline.",
      "The lesson closes by showing how our Lord Jesus Christ practiced and blessed what later became the essence of the Church’s ranks. He sang hymns, read Scripture, ordered the temple, washed feet, gave the Eucharist, shepherded the flock, and entrusted apostolic authority. The references named here include Matthew 26:30, Luke 4:16, Matthew 21:12, John 13:5, Mark 14:22-26, John 13:27-29, 1 Peter 2:25, John 10:14, and John 20:22-23.",
      "The point is practical and spiritual: no rank in the Church is lowly or empty, because the Lord Himself honored the work of service. Priesthood therefore exists for sanctification, stewardship, teaching, sacrifice, and pastoral care.",
    ],
  },
]

export const anointingTeachingSections: TeachingSection[] = [
  {
    title: "The Sacrament of the Anointing of the Sick",
    paragraphs: [
      "There are two sacraments for healing: one for spiritual illness, which is the Sacrament of Repentance and Confession, and the other for physical and psychological illness, which is the Sacrament of the Anointing of the Sick.",
      "We do not know the exact time or occasion when our Lord instituted this sacrament, but we know that He commanded the healing of the sick and that the disciples anointed many sick people with oil and healed them. St. James makes the sacramental practice explicit: the sick are to call the priests of the Church, who pray over them and anoint them with oil in the name of the Lord.",
      "The lesson treats James 5:14-16 as speaking together of both confession and anointing of the sick. This is not an ordinary means of healing, because it is administered by priests and handed down as apostolic teaching.",
      "The lesson also places around this Matthew 10:8, Luke 10:8-9, Mark 6:13, and John 21:25.",
    ],
  },
  {
    title: "Questions and pastoral use",
    paragraphs: [
      "The lesson asks why people sometimes receive this sacrament and are not healed. It answers that this may be because of lack of faith, or because God in His wisdom sees that the illness is spiritually beneficial, as in the case of St. Paul whose weakness was not removed.",
      "It also explains why the Church performs this sacrament for the whole congregation on the last Friday of Lent. During Holy Week the Church does not perform it, so she performs it beforehand, and many are also physically weakened by fasting and helped by this anointing as they continue into Pascha.",
    ],
  },
]

export const matrimonyTeachingSections: TeachingSection[] = [
  {
    title: "Marriage as a sacrament",
    paragraphs: [
      "Marriage is a universal human practice, yet in the Orthodox Church it is also a sacrament. A sacrament is a visible form of an invisible grace, a mystery through which mankind passes from the merely earthly into the life of communion with God.",
      "The lesson explains that created realities such as bread, wine, water, and oil are taken up into the Kingdom and transformed by grace. In the same way, marriage as a natural human reality is sanctified and raised to a higher life in Christ.",
      "It points to the wedding at Cana of Galilee in John 2:1-11. By attending the wedding and performing His first miracle there, our Lord Jesus Christ blessed marriage forever and revealed the transformation of earthly union into something heavenly and spiritual.",
    ],
  },
  {
    title: "Marriage and the Church",
    paragraphs: [
      "Marriage belongs to a different order than a civil contract alone. The lesson treats husband and wife as symbols of another marriage: the union of Christ and the Church.",
      "It therefore quotes Ephesians 5:22 and 5:24 for the wife, Ephesians 5:25, 5:28-29 for the husband, and Ephesians 5:32 where St. Paul calls marriage “a great mystery” in relation to Christ and the Church.",
      "The lesson notes that some fathers connect the institution of this sacrament to Cana in John 2:1-11, while others connect it to the Lord's words on divorce: “What God has joined together, let not man separate” (Mt 19:6).",
    ],
  },
  {
    title: "Characteristics, goal, and question",
    paragraphs: [
      "The characteristics of Orthodox marriage are clear: no mixed marriage with unbelief, according to 2 Corinthians 6:14-16; monogamy, according to 1 Corinthians 7:2; and no divorce except for sexual immorality, according to Matthew 19:9.",
      "The lesson also says that many couples come to marriage expecting personal satisfaction, emotional relief, or easy happiness. Orthodox teaching corrects this by saying that the goal of marriage is heaven, not merely the satisfaction of personal needs.",
      "1 Corinthians 7:14 does not grant permission to seek marriage with unbelievers. It addresses people who were already married when one spouse came to faith, as shown by 1 Corinthians 7:12-15.",
    ],
  },
]

export const salvationTeachingSections: TeachingSection[] = [
  {
    title: "The blood of Christ and salvation",
    paragraphs: [
      "The lesson opens by insisting that salvation is available only through the blood of our Lord and Savior Jesus Christ, for “without shedding of blood there is no remission” (Heb 9:22).",
      "It ties this to the Passover lamb in 1 Corinthians 5:7 and Exodus 12:13, and then to the words of institution: “This is My blood of the new covenant which is shed for many for the remission of sins” (Mt 26:28).",
      "The lesson then gathers many references around this doctrine: Acts 20:28, Romans 5:9, Ephesians 1:7, Colossians 1:14, Ephesians 2:13, Colossians 1:20, Hebrews 9:12, Hebrews 9:14, Hebrews 10:19, Hebrews 10:29, Hebrews 12:24, Luke 23:34, Hebrews 13:20-21, 1 Peter 1:18-19, 1 John 5:8, 1 John 1:7, Revelation 1:5, Revelation 5:9, Revelation 7:14, and Revelation 12:11.",
    ],
  },
  {
    title: "Application and conditions",
    paragraphs: [
      "The lesson applies this by saying that Old Testament sins were put away until the Cross rather than fully remitted before the blood of Christ was shed. Nathan's word to David in 2 Samuel 12:13 is read in this light, and the closed state of Paradise before the Crucifixion is emphasized.",
      "It also says that when the Lord told the paralytic, “your sins are forgiven you” (Lk 5:20), He gave a promise of forgiveness grounded in the Cross to come. This same pattern is applied to other pre-crucifixion acts of forgiveness.",
      "The conditions for salvation in normal adult life are faith, the saving sacraments of Baptism, Confirmation, Repentance and Confession, Eucharist, and good works. The people of the Old Testament had symbols of these sacraments, such as circumcision, which is explained in Colossians 2:11-12.",
    ],
  },
  {
    title: "Salvation as the story of the whole life",
    paragraphs: [
      "The lesson is explicit that salvation is not reduced to a single past moment. It quotes 1 Corinthians 1:18 and says salvation in the Orthodox concept comprehends all of life.",
      "It then formulates three aspects: I have been saved, having put on Christ in baptism; I am being saved, growing in Christ through the sacramental life of the Church; and I hope I will be saved, by God's mercy in the last judgment.",
      "The body of the teaching then gathers Mark 16:16, Acts 2:38, Colossians 2:12, Romans 6:4, Romans 6:6, Galatians 3:27, 1 John 2:20, 1 Corinthians 6:19, Galatians 5:22-23, 1 John 1:8, Hebrews 10:29, Luke 12:10, Luke 13:3 and 13:5, 1 John 1:9, John 6:54, 1 Peter 1:6-7, Acts 14:22, Ephesians 6:12, 1 Peter 5:8, Matthew 10:22, Revelation 21:8, 1 Corinthians 9:27, Philippians 2:12, 1 Peter 1:17, 1 Peter 1:5, Revelation 2:10, and concludes that salvation is indeed the story of the whole life.",
    ],
  },
]

export const saintsTeachingSections: TeachingSection[] = [
  {
    title: "Intercession belongs to Christ's saving work",
    paragraphs: [
      "The lesson begins by clarifying that in honoring saints and angels the Church does not place them in the place of Lord Jesus Christ or even adjacent to Him as saviors. No one except Christ saves from sin.",
      "When the saints pray for us, they ask the Lord for our salvation. From Him they entreat mercy and help; they do not save by their own power.",
    ],
  },
  {
    title: "Biblical examples of intercession",
    paragraphs: [
      "Holy Scripture gives many examples of accepted intercession: Abraham praying for Abimelech in Genesis 20:1-7, Job praying for his friends in Job 42:7-8, Abraham pleading for Sodom in Genesis 18:26-32, Jerusalem being spared for the sake of one righteous person in Jeremiah 5:1, and Moses interceding in Exodus 32:7-14.",
      "It then turns to examples involving the departed: Moses appealing to God for the sake of Abraham, Isaac, and Israel in Exodus 32:13, God's regard for David in 1 Kings 11:12-13, and the statement in Jeremiah 15:1 about Moses and Samuel standing before the Lord.",
      "The conclusion drawn is that God Himself encourages and accepts intercession.",
    ],
  },
  {
    title: "God honors His saints",
    paragraphs: [
      "The lesson says God honors His saints by granting them extraordinary gifts and powers. It points to the bones of Elisha in 2 Kings 13:21, the shadow of St. Peter in Acts 5:15, the handkerchiefs of St. Paul in Acts 19:12, Elijah's word in 1 Kings 17:1, and the Lord's promise in John 12:26.",
      "It then answers common questions with Luke 15:10, Matthew 22:30, Revelation 6:10, Luke 16:25, and 1 Corinthians 13:12 to argue that the saints and angels know what happens on earth in a heavenly manner.",
      "The same teaching also explains naming churches after saints and venerating relics, citing Revelation 21:14, Exodus 3:6, and 1 Corinthians 6:19, and always returning to the principle that honoring the saints is honor given to the God who glorified them.",
    ],
  },
]

export const fastingTeachingSections: TeachingSection[] = [
  {
    title: "What fasting is in the life of the Church",
    paragraphs: [
      "The lesson contrasts the neglect of fasting in many Protestant settings with the disciplined fasting life of the Orthodox Church.",
      "During a fast the faithful abstain from food and water for a set period, usually guided by the father of confession and adjusted for spiritual maturity and health. After the abstinence period ends, the fast is broken with vegetarian food, while fish is permitted in some fasts because the Church fasts for more than half the days of the year.",
      "The lesson also notes the ninth hour, around three o'clock in the afternoon, as a key pattern because our Lord died on the Cross at that hour.",
    ],
  },
  {
    title: "Questions about congregational fasting and fasting seasons",
    paragraphs: [
      "The objection that fasting should only be secret is answered by comparing it to prayer. Matthew 6:18 and Matthew 6:6 are read together, so private depth does not abolish congregational discipline.",
      "It gives scriptural examples of communal fasting from Esther 4, Jonah 3, Joel 2:15, Acts 27:21, Acts 13:2-3, and Zechariah 8:19.",
      "It then lists the fasting seasons of the Church: the Advent fast, Jonah's fast, the Holy Great Lent, the Apostles fast, St. Mary's fast, and the weekly Wednesday and Friday fasts, with notes about fish and abstinence.",
    ],
  },
  {
    title: "Why the food rule matters and why Christians still fast",
    paragraphs: [
      "The lesson explains vegetarian fasting through Genesis 1:29, Genesis 3:18, Genesis 9:3, Numbers 11:7-8, and Numbers 11:33, presenting it as ascetic discipline rather than a declaration that other foods are unclean.",
      "It then explains why fish is allowed in some fasting seasons and points to John 21:9 as part of the lesson's reasoning.",
      "Finally, it argues that fasting remains part of Christian worship by citing Matthew 6:18, Matthew 9:15, Mark 9:29, Matthew 4:2, Mark 1:12, Luke 4:1, 2 Corinthians 11:27, 2 Corinthians 6:5, Acts 14:23, Acts 13:3, and 1 Corinthians 7:5.",
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
