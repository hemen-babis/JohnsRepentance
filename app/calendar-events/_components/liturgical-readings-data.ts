export type LiturgicalReading = {
  date: string
  mezmur: {
    am: string
    en: string
  }
  readings: {
    pauline: { am: string; en: string }
    catholic: { am: string; en: string }
    acts: { am: string; en: string }
  }
  misbak: {
    reference: {
      am: string
      en: string
    }
    geez: string[]
    amharic: string[]
    english: string[]
  }
  gospel: {
    am: string
    en: string
  }
  kidase: {
    am: string
    en: string
  }
}

const baseLiturgicalReadings: Record<string, Omit<LiturgicalReading, "misbak"> & { misbak: Omit<LiturgicalReading["misbak"], "english"> }> = {
  "Meskerem 4": {
    date: "Meskerem 4, 2018",
    mezmur: { am: "ዮሐንስ አኅድዐ", en: "Yohannes Ahde'a" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 11፥17 እስከ ፍጻሜ", en: "1 Corinthians 11:17 to end" },
      catholic: { am: "ያዕቆብ 2፥1 እስከ 14", en: "James 2:1-14" },
      acts: { am: "ግብረ ሐዋርያት 18፥24 እስከ ፍጻሜ", en: "Acts 18:24 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 84፥10", en: "Psalm 84:10" },
      geez: ["ሳህል ወርትዕ ተራከባ።", "ጽድቅ ወሰላም ተሰዓማ፤", "ርትዕሰ እምድር ሰረጸት።"],
      amharic: ["ይቅርታና ቅንነት ተገናኙ።", "ጽድቅና ሰላም ተስማሙ፤", "ቅንነት ከምድር በቀለች።"],
    },
    gospel: { am: "ዮሐንስ 1፥15 እስከ 38", en: "John 1:15-38" },
    kidase: { am: "ቅዳሴ ዘአትናቴዎስ", en: "Kidase of St. Athanasius" },
  },
  "Meskerem 11": {
    date: "Meskerem 11, 2018",
    mezmur: { am: "እኵት አንተ", en: "Equit Ante" },
    readings: {
      pauline: { am: "2 ቆሮንቶስ 9፥1 እስከ ፍጻሜ", en: "2 Corinthians 9:1 to end" },
      catholic: { am: "ያዕቆብ 5፥1 እስከ 10", en: "James 5:1-10" },
      acts: { am: "ግብረ ሐዋርያት 19፥21 እስከ ፍጻሜ", en: "Acts 19:21 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 66፥6", en: "Psalm 66:6" },
      geez: ["ምድርኒ ትሁብ ፍሬሃ።", "ወይባርከነ እግዚአብሔር አምላክነ፤", "ወይባርከነ እግዚአብሔር።"],
      amharic: ["ምድር ፍሬዋን ሰጠች።", "እግዚአብሔር አምላካችንም ይባርከናል፤", "እግዚአብሔር ይባርከናል።"],
    },
    gospel: { am: "ማርቆስ 4፥24 እስከ 39", en: "Mark 4:24-39" },
    kidase: { am: "ቅዳሴ ዘወልደ ነጎድጓድ", en: "Kidase of Welde Negodguad" },
  },
  "Meskerem 18": {
    date: "Meskerem 18, 2018",
    mezmur: { am: "ዝንቱ ውእቱ መስቀል", en: "Zentu Wetu Meskel" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 1፥10 እስከ ፍጻሜ", en: "1 Corinthians 1:10 to end" },
      catholic: { am: "1 ጴጥሮስ 4፥1 እስከ 12", en: "1 Peter 4:1-12" },
      acts: { am: "ግብረ ሐዋርያት 2፥22 እስከ 37", en: "Acts 2:22-37" },
    },
    misbak: {
      reference: { am: "መዝሙር 59፥4", en: "Psalm 59:4" },
      geez: ["ወወሀብኮሙ ትእምርተ ለእለ ይፈርሑከ።", "ከመ ያምስጡ እምገጸ ቅስት።", "ወይድኃኑ ፍቁራኒከ።"],
      amharic: ["ከቀስት ፊት ያመልጡ ዘንድ ለሚፈሩህ ምልክትን ሰጥሀቸው።", "ወድጆችህ እንዲድኑ።"],
    },
    gospel: { am: "ማርቆስ 8፥34 እስከ ፍጻሜ", en: "Mark 8:34 to end" },
    kidase: { am: "ቅዳሴ ዘአትናቴዎስ", en: "Kidase of St. Athanasius" },
  },
  "Meskerem 25": {
    date: "Meskerem 25, 2018",
    mezmur: { am: "ትብሎ መርዓት", en: "Tiblo Mer'at" },
    readings: {
      pauline: { am: "ገላትያ 2፥11 እስከ ፍጻሜ", en: "Galatians 2:11 to end" },
      catholic: { am: "ይሁዳ 1፥17 እስከ ፍጻሜ", en: "Jude 1:17 to end" },
      acts: { am: "ግብረ ሐዋርያት 14፥8 እስከ 18", en: "Acts 14:8-18" },
    },
    misbak: {
      reference: { am: "መዝሙር 18፥3-4", en: "Psalm 18(19):3-4" },
      geez: ["አልቦ ነገር ወአልቦ ነቢብ ዘኢተሰምዐ ቃሎሙ።", "ውስተ ኲሉ ምድር ወጽአ ነገሮሙ።", "ወእስከ አጽናፈ ዓልም በጽሐ ንቢቦሙ።"],
      amharic: ["ድምጻቸው ቃላቸው ያልተሰማበት ቦታ የለም።", "ወደምድር ሁሉ ነገራቸው ወጣ።", "እስከምድር ዳርቻም ቃላቸው ደረሰ።"],
    },
    gospel: { am: "ማቴዎስ 9፥14 እስከ 18", en: "Matthew 9:14-18" },
    kidase: { am: "ቅዳሴ ዘሐዋርያት አው ወልደ ንጐድጓድ", en: "Kidase of the Apostles or Welde Negodguad" },
  },
  "Tikimt 2": {
    date: "Tikimt 2, 2018",
    mezmur: { am: "ትዌድሶ መርዓት", en: "Tiwedso Mer'at" },
    readings: {
      pauline: { am: "ኤፌሶን 5፥21 እስከ ፍጻሜ", en: "Ephesians 5:21 to end" },
      catholic: { am: "ራእይ ዮሐንስ 21፥1 እስከ 9", en: "Revelation 21:1-9" },
      acts: { am: "ግብረ ሐዋርያት 21፥31 እስከ ፍጻሜ", en: "Acts 21:31 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 127፥2", en: "Psalm 127:2" },
      geez: ["ፍሬ ጻማከ ተሴሰይ፡፡", "ብጹዕ አንተ ወሰናይ ለከ፤", "ብእሲትከ ከመ ወይን ስሙር ውስተ ጽርሐ ቤትከ፡፡"],
      amharic: ["የድካምህን ፍሬ ትመገባለህ።", "ምስጉን ነህ መልካምም ይሆንልሃል።", "ሚስትህ በቤትህ እልፍኝ ውስጥ እንደሚያፈራ ወይን ናት።"],
    },
    gospel: { am: "ዮሐንስ 3፥25 እስከ ፍጻሜ", en: "John 3:25 to end" },
    kidase: { am: "ቅዳሴ ዘእግዝእትነ", en: "Kidase of Our Lady" },
  },
  "Tikimt 9": {
    date: "Tikimt 9, 2018",
    mezmur: { am: "ኪነ ጥበቡ መንክር ወእጹብ", en: "Kine Tibebu Menkir We'etsub" },
    readings: {
      pauline: { am: "ኤፌሶን 6፥1 እስከ 10", en: "Ephesians 6:1-10" },
      catholic: { am: "ራእይ ዮሐንስ 12፥1 እስከ 13", en: "Revelation 12:1-13" },
      acts: { am: "ግብረ ሐዋርያት 7፥23 እስከ 30", en: "Acts 7:23-30" },
    },
    misbak: {
      reference: { am: "መዝሙር 102፥14", en: "Psalm 102:14" },
      geez: ["ተዘከር እግዚኦ ከመ መሬት ንሕነ፡፡", "ወሰብሰ ከመ ሣእር መዋዕሊሁ፡፡", "ወከመ ጽጌ ገዳም ከማሁ ይፈሪ፡፡"],
      amharic: ["አቤቱ እኛ አፈር እንደ ሆንን አስብ።", "ሰውስ ዘመኑ እንደ ሳር ነው።", "እንደ ዱር አበባ እንዲሁ ያብባል።"],
    },
    gospel: { am: "ሉቃስ 12፥16 እስከ 32", en: "Luke 12:16-32" },
    kidase: { am: "ቅዳሴ ዘእግዝእትነ", en: "Kidase of Our Lady" },
  },
  "Tikimt 16": {
    date: "Tikimt 16, 2018",
    mezmur: { am: "ወመኑ መሐሪ ዘከማከ", en: "Wemenu Mehari Zekemake" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 10፥1 እስከ 14", en: "1 Corinthians 10:1-14" },
      catholic: { am: "ራእይ ዮሐንስ 14፥1 እስከ 6", en: "Revelation 14:1-6" },
      acts: { am: "ግብረ ሐዋርያት 4፥19 እስከ 31", en: "Acts 4:19-31" },
    },
    misbak: {
      reference: { am: "መዝሙር 91፥12", en: "Psalm 91:12" },
      geez: ["ጻድቅሰ ከመ በቀልት ይፈሪ፡፡", "ወይበዝህ ከመ ዘግባ ዘሊባኖስ፤", "ትኩላን እሙንቱ ውስተ ቤተ እግዚአብሔር፡፡"],
      amharic: ["ጻድቅ እንደ ዘንባባ ያፈራል።", "እንደ ሊባኖስ ዝግባም ያድጋል።", "በእግዚአብሔር ቤት ውስጥ ተተክለዋል።"],
    },
    gospel: { am: "ማቴዎስ 12፥1 እስከ 32", en: "Matthew 12:1-32" },
    kidase: { am: "ቅዳሴ ዘእግዝእትነ", en: "Kidase of Our Lady" },
  },
  "Tikimt 23": {
    date: "Tikimt 23, 2018",
    mezmur: { am: "ጸገየ ወይን ወፈርየ ሮማን", en: "Tsegeye Weyin Weferye Roman" },
    readings: {
      pauline: { am: "ሮሜ 11፥13 እስከ 25", en: "Romans 11:13-25" },
      catholic: { am: "ራእይ ዮሐንስ 12፥13 እስከ ፍጻሜ", en: "Revelation 12:13 to end" },
      acts: { am: "ግብረ ሐዋርያት 11፥1 እስከ 12", en: "Acts 11:1-12" },
    },
    misbak: {
      reference: { am: "መዝሙር 79፥8", en: "Psalm 79(80):8" },
      geez: ["አጸደ ወይን አፍለስከ እምግብጽ።", "ሰደድከ አሕዛበ ወተከልከ ኪያሃ።", "ወፄሕከ ፍኖተ ቅድሜሃ።"],
      amharic: ["ከግብጽ የወይን ግንድ አመጣህ።", "አሕዛብን አባረርህ እርስዋንም ተከልህ።", "በፊትዋም ሥፍራን አዘጋጀህ።"],
    },
    gospel: { am: "ማቴዎስ 21፥33 እስከ ፍጻሜ", en: "Matthew 21:33 to end" },
    kidase: { am: "ቅዳሴ ዘእግዝእትነ", en: "Kidase of Our Lady" },
  },
  "Tikimt 30": {
    date: "Tikimt 30, 2018",
    mezmur: { am: "ክርስቶስ ሠርዐ ሰንበተ", en: "Kristos Ser'a Senbete" },
    readings: {
      pauline: { am: "ቈላስይስ 1፥1 እስከ 12", en: "Colossians 1:1-12" },
      catholic: { am: "ያዕቆብ 1፥1 እስከ 13", en: "James 1:1-13" },
      acts: { am: "ግብረ ሐዋርያት 13፥6 እስከ 16", en: "Acts 13:6-16" },
    },
    misbak: {
      reference: { am: "መዝሙር 1፥3", en: "Psalm 1:3" },
      geez: ["ወይከውን ከመ ዕፅ እንተ ትክልት ኀበ ሙኀዘ ማይ።", "እንተ ትሁብ ፍሬሃ በበጊዜሃ።", "ወቆጽላኒ ኢይትነገፍ።"],
      amharic: ["እርሱም በውሃ ፈሳሾች ዳር እንደተተከለች።", "ፍሪርዋንም በየጊዜዋ እንደምትሰጥ።", "ቅጠልዋም እንደማይረግፍ ዛፍ ይሆናል።"],
    },
    gospel: { am: "ማቴዎስ 6፥25 እስከ ፍጻሜ", en: "Matthew 6:25 to end" },
    kidase: { am: "ቅዳሴ ዘእግዝእትነ", en: "Kidase of Our Lady" },
  },
  "Hidar 7": {
    date: "Hidar 7, 2018",
    mezmur: { am: "ኢተዘኪሮ አበሳነ", en: "Itezekiro Abesane" },
    readings: {
      pauline: { am: "ሮሜ 5፥10 እስከ ፍጻሜ", en: "Romans 5:10 to end" },
      catholic: { am: "1 ዮሐንስ 2፥1 እስከ 18", en: "1 John 2:1-18" },
      acts: { am: "ግብረ ሐዋርያት 22፥1 እስከ 12", en: "Acts 22:1-12" },
    },
    misbak: {
      reference: { am: "መዝሙር 78፥8", en: "Psalm 78:8" },
      geez: ["ኢትዝክር ለነ አበሳነ ዘትካት፡፡", "ፍጡነ ይርከበነ ሳህለከ እግዚኦ።", "እስመ ተመንደብነ ፈድፋደ፡፡"],
      amharic: ["የቀደመውን በደላችንን አታስብብን።", "ምህረትህ በቶሎ ታግኘን።", "እጅግ ተቸግረናልና።"],
    },
    gospel: { am: "ማቴዎስ 6፥5 እስከ 16", en: "Matthew 6:5-16" },
    kidase: { am: "ቅዳሴ ዘእግዚእነ", en: "Kidase of Our Lord" },
  },
  "Hidar 14": {
    date: "Hidar 14, 2018",
    mezmur: { am: "ሎቱ ስብሐት ወሎቱ አኮቴት", en: "Lotu Sibh'at Wolotu Akotet" },
    readings: {
      pauline: { am: "ቆላስይስ 1፥12 እስከ ፍጻሜ", en: "Colossians 1:12 to end" },
      catholic: { am: "1 ጴጥሮስ 1፥13 እስከ 21", en: "1 Peter 1:13-21" },
      acts: { am: "ግብረ ሐዋርያት 19፥21 እስከ ፍጻሜ", en: "Acts 19:21 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 134፥6", en: "Psalm 134:6" },
      geez: ["ኲሎ ዘፈቀደ ገብረ እግዚአብሔር።", "በሰማይኒ ወበምድርኒ።", "በባሕርኒ ወበኲሉ ቀልያት።"],
      amharic: ["በሰማይና በምድር በባሕርና በጥልቆች ሁሉ፣", "እግዚአብሔር የወደደውን ሁሉ አደረገ።"],
    },
    gospel: { am: "ዮሐንስ 5፥16 እስከ 28", en: "John 5:16-28" },
    kidase: { am: "ቅዳሴ ዘአትናቴዎስ", en: "Kidase of St. Athanasius" },
  },
  "Hidar 21": {
    date: "Hidar 21, 2018",
    mezmur: { am: "አምላክ ፍጹም በህላዌሁ", en: "Amlak Fetsum Behlawihu" },
    readings: {
      pauline: { am: "ዕብራውያን 12፥25 እስከ ፍጻሜ", en: "Hebrews 12:25 to end" },
      catholic: { am: "ያዕቆብ 3፥4 እስከ 13", en: "James 3:4-13" },
      acts: { am: "ግብረ ሐዋርያት 21፥27 እስከ ፍጻሜ", en: "Acts 21:27 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 33፥5", en: "Psalm 33:5" },
      geez: ["ቅረቡ ሐቤሁ ወያበርህ ለክሙ፡፡", "ወኢይትሀፈር ገጽክሙ።", "ዝንቱ ነዳይ ጸርሐ ወእግዚአብሔር ሰምዖ።"],
      amharic: ["ወደ እርሱ ቅረቡ ያበራላችሁማል።", "ፊታችሁም አያፍርም።", "ይህ ችግረኛ ጮኸ እግዚአብሔርም ሰማው።"],
    },
    gospel: { am: "ማቴዎስ 8፥23 እስከ ፍጻሜ", en: "Matthew 8:23 to end" },
    kidase: { am: "ቅዳሴ ዘእግዚእነ", en: "Kidase of Our Lord" },
  },
  "Hidar 28": {
    date: "Hidar 28, 2018",
    mezmur: { am: "ይቤሉ እስራኤል", en: "Yibelu Israel" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 2፥1 እስከ ፍጻሜ", en: "1 Corinthians 2:1 to end" },
      catholic: { am: "1 ዮሐንስ 5፥1 እስከ 6", en: "1 John 5:1-6" },
      acts: { am: "ግብረ ሐዋርያት 5፥21 እስከ ፍጻሜ", en: "Acts 5:21 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 4፥2", en: "Psalm 4:2" },
      geez: ["ደቂቀ እጓለ እመሕያው እስከ ማዕዜኑ ታከብዱ ልበክሙ።", "ለምንት ታፈቅሩ ከንቶ ወተሐሱ ሐሰተ።", "አእምሩ ከመ ተሰብሐ እግዚአብሔር በጻድቁ።"],
      amharic: ["እናንት የሰው ልጆች እስከ መቼ ልባችሁን ታከብዳላችሁ።", "ከንቱ ነገርን ለምን ትወድዳላችሁ? ሐሰትንም ለምን ትሻላችሁ?", "እግዚአብሔር በጻድቁ እንደተገለጸ እወቁ።"],
    },
    gospel: { am: "ዮሐንስ 9፥1 እስከ ፍጻሜ", en: "John 9:1 to end" },
    kidase: { am: "ቅዳሴ ዘእግዚእነ", en: "Kidase of Our Lord" },
  },
  "Tahsas 5": {
    date: "Tahsas 5, 2018",
    mezmur: { am: "ሠርዓ ሰንበተ ለሰብእ ዕረፍተ", en: "Ser'a Senbete Lesebe Erefte" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 15፥12 እስከ 33", en: "1 Corinthians 15:12-33" },
      catholic: { am: "2 ጴጥሮስ 3፥10 እስከ መጨረሻ", en: "2 Peter 3:10 to end" },
      acts: { am: "ግብረ ሐዋርያት 20፥28 እስከ መጨረሻ", en: "Acts 20:28 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 131፥15", en: "Psalm 131:15" },
      geez: ["ለንዳያኒሃኒ አጸግቦሙ እክለ።", "ወለካህናቲሃኒ አለብሶሙ ሕይወተ።", "ወጻድቃኒሃኒ ትፍሥሕተ ይትፌሥሑ።"],
      amharic: ["ደሆችንም እንጀራ አጠግባለሁ።", "ካህናቶችዋንም ደኅንነትን አለብሳቸዋለሁ።", "ቅዱሳኖችዋም እጅግ ደስ ይላቸዋል።"],
    },
    gospel: { am: "ሉቃስ 12፥32 እስከ 41", en: "Luke 12:32-41" },
    kidase: { am: "ቅዳሴ ዘአትናቴዎስ", en: "Kidase of St. Athanasius" },
  },
  "Tahsas 12": {
    date: "Tahsas 12, 2018",
    mezmur: { am: "ወልዶ መድህነ", en: "Weldo Medhene" },
    readings: {
      pauline: { am: "ዕብራውያን 1፥1 እስከ መጨረሻ", en: "Hebrews 1:1 to end" },
      catholic: { am: "2 ጴጥሮስ 3፥1 እስከ 10", en: "2 Peter 3:1-10" },
      acts: { am: "ግብረ ሐዋርያት 3፥17 እስከ ፍጻሜ", en: "Acts 3:17 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 143፥6", en: "Psalm 143:6" },
      geez: ["ፈኑ እዴከ እምአርያም።", "አድህነኒ ወባልሀኒ እማይ ብዙህ።", "ወእምእዴሆሙ ለደቂቀ ነኪር።"],
      amharic: ["እጅህን ከአርያም ላክ።", "ከብዙ ውሃም አድነኝ።", "ከባዕድ ልጆችም እጅ።"],
    },
    gospel: { am: "ዮሐንስ 1፥44 እስከ ፍጻሜ", en: "John 1:44 to end" },
    kidase: { am: "ቅዳሴ ዘእግዚእነ", en: "Kidase of Our Lord" },
  },
  "Tahsas 19": {
    date: "Tahsas 19, 2018",
    mezmur: { am: "አቅዲሙ ነገረ በኦሪት", en: "Aqidimu Negere BeOrit" },
    readings: {
      pauline: { am: "ሮሜ 13፥11 እስከ ፍጻሜ", en: "Romans 13:11 to end" },
      catholic: { am: "1 ዮሐንስ 1፥1 እስከ ፍጻሜ", en: "1 John 1:1 to end" },
      acts: { am: "ግብረ ሐዋርያት 26፥12 እስከ 19", en: "Acts 26:12-19" },
    },
    misbak: {
      reference: { am: "መዝሙር 42፥3", en: "Psalm 42:3" },
      geez: ["ፈኑ ብርሃነከ ወጽድቀከ።", "እማንቱ ይምርሃኒ ወይሰዳኒ ደብረ መቅደስከ።", "ወውስተ አብያቲከ እግዚኦ።"],
      amharic: ["ብርሃንህንና እውነትህን ላክ።", "ወደ ቅድስናህ ተራራና ወደ ማደሪያህ ይውሰዱኝ።", "ወደ እግዚአብሔር መሰዊያ።"],
    },
    gospel: { am: "ዮሐንስ 1፥1 እስከ 19", en: "John 1:1-19" },
    kidase: { am: "ቅዳሴ ዘአትናቴዎስ", en: "Kidase of St. Athanasius" },
  },
  "Tahsas 26": {
    date: "Tahsas 26, 2018",
    mezmur: { am: "ኖላዊ ዘመጽአ", en: "Nolawi Zemetse'a" },
    readings: {
      pauline: { am: "ዕብራውያን 13፥16 እስከ ፍጻሜ", en: "Hebrews 13:16 to end" },
      catholic: { am: "1 ጴጥሮስ 2፥21 እስከ ፍጻሜ", en: "1 Peter 2:21 to end" },
      acts: { am: "ግብረ ሐዋርያት 11፥22 እስከ ፍጻሜ", en: "Acts 11:22 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 79፥1", en: "Psalm 79:1" },
      geez: ["ኖላዊሆሙ ለእስራኤል አጽምእ።", "ዘይርዕዮሙ ከመ አባግዐ ዮሴፍ።", "ዘይነብር ላዕለ ኪሩቤል አስተርአየ።"],
      amharic: ["ዮሴፍን እንደ መንጋ የምትመራ።", "የእስራኤል ጠባቂ ሆይ አድምጥ።", "በኪሩቤል ላይ የምትቀመጥ ተገለጥ።"],
    },
    gospel: { am: "ዮሐንስ 10፥1 እስከ 22", en: "John 10:1-22" },
    kidase: { am: "ቅዳሴ ዘእግዚእነ", en: "Kidase of Our Lord" },
  },
  "Tir 3": {
    date: "Tir 3, 2018",
    mezmur: { am: "ዘልደት ይሠርቅ ኮከብ እምያዕቆብ", en: "Zeldet Yiserik Kokeb Emya'eqob" },
    readings: {
      pauline: { am: "ሮሜ 11፥25 እስከ ፍጻሜ", en: "Romans 11:25 to end" },
      catholic: { am: "1 ዮሐንስ 4፥1 እስከ 9", en: "1 John 4:1-9" },
      acts: { am: "ግብረ ሐዋርያት 7፥17 እስከ 23", en: "Acts 7:17-23" },
    },
    misbak: {
      reference: { am: "መዝሙር 88፥27", en: "Psalm 88(89):27" },
      geez: ["ወአነሂ በኲርየ እሬስዮ።", "ወልዑል ውእቱ እምነገሥተ ምድር።", "ወለዓለም አዐቅብ ሎቱ ሳህልየ።"],
      amharic: ["እኔም ደግሞ በኲሬ አደርግዋለሁ።", "ከምድር ነገሥታትም ከፍ ይላል።", "ለዘለዓለምም ምህረቴን ለእርሱ እጠብቃለሁ።"],
    },
    gospel: { am: "ማቴዎስ 2፥1 እስከ 13", en: "Matthew 2:1-13" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Tir 10": {
    date: "Tir 10, 2018",
    mezmur: { am: "ንጉሥኪ ጽዮን", en: "Niguski Tsiyon" },
    readings: {
      pauline: { am: "ሮሜ 15፥1 እስከ 14", en: "Romans 15:1-14" },
      catholic: { am: "1 ዮሐንስ 4፥14 እስከ ፍጻሜ", en: "1 John 4:14 to end" },
      acts: { am: "ግብረ ሐዋርያት 13፥32 እስከ 44", en: "Acts 13:32-44" },
    },
    misbak: {
      reference: { am: "መዝሙር 131፥6", en: "Psalm 131(132):6" },
      geez: ["ናሁ ሰማዕናሁ በኤፍራታ።", "ወረክብናሁ ውስተ ኦመ ገዳም።", "ንበውእ እንከሰ ውስተ አብያቲሁ ለእግዚአብሔር።"],
      amharic: ["እነሆ በኤፍራታ ሰማነው።", "በዱር ውስጥም አገኘነው።", "ወደ ማደሪያዎቹ እንገባለን።"],
    },
    gospel: { am: "ማቴዎስ 2፥19 እስከ ፍጻሜ", en: "Matthew 2:19 to end" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Tir 17": {
    date: "Tir 17, 2018",
    mezmur: { am: "ሖረ ኢየሱስ", en: "Hore Iyesus" },
    readings: {
      pauline: { am: "ዕብራውያን 2፥1 እስከ 3", en: "Hebrews 2:1-3" },
      catholic: { am: "1 ዮሐንስ 5፥1 እስከ 13", en: "1 John 5:1-13" },
      acts: { am: "ግብረ ሐዋርያት 10፥34 እስከ 39", en: "Acts 10:34-39" },
    },
    misbak: {
      reference: { am: "መዝሙር 83፥6", en: "Psalm 83:6" },
      geez: ["እስመ መምህረ ሕግ ይሁብ በረከተ።", "ወየሐውር እምሀይል ውስተ ሀይል።", "ወያስተርኢ አምላከ አማልክት በጽዮን።"],
      amharic: ["የሕግ መምህር በረከትን ይሰጣልና።", "ከሀይል ወደ ሀይል ይሄዳሉ።", "የአምላክት አምላክ በጽዮን ይታያል።"],
    },
    gospel: { am: "ዮሐንስ 2፥1 እስከ 14", en: "John 2:1-14" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Tir 24": {
    date: "Tir 24, 2018",
    mezmur: { am: "እሙነ ኮነ ልደቱ", en: "Emune Kone Lidetu" },
    readings: {
      pauline: { am: "2 ቆሮንቶስ 1፥13 እስከ ፍጻሜ", en: "2 Corinthians 1:13 to end" },
      catholic: { am: "1 ዮሐንስ 2፥22 እስከ ፍጻሜ", en: "1 John 2:22 to end" },
      acts: { am: "ግብረ ሐዋርያት 13፥20 እስከ 28", en: "Acts 13:20-28" },
    },
    misbak: {
      reference: { am: "መዝሙር 117፥27", en: "Psalm 117(118):27" },
      geez: ["እግዚአብሔር እግዚእ አስተርአየ ለነ።", "ግበሩ በዐለ በትፍስሕት በሀበ እለ ያስተሐምምዎ።", "እስከ አቅርንቲሁ ለምስዋዕ።"],
      amharic: ["ጌታ እግዚአብሔር ተገለጠልን።", "እስከ መሰዊያው ቀንዶች ድረስ።", "በሚያስተነትኑበት በደስታ በዐልን አድርጉ።"],
    },
    gospel: { am: "ሉቃስ 2፥42 እስከ ፍጻሜ", en: "Luke 2:42 to end" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Yekatit 1": {
    date: "Yekatit 1, 2018",
    mezmur: { am: "ወብዙኃን ኖሎት መጽኡ", en: "Webizu'han Nolot Mets'u" },
    readings: {
      pauline: { am: "ሮሜ 9፥1 እስከ 17", en: "Romans 9:1-17" },
      catholic: { am: "1 ጴጥሮስ 2፥20 እስከ ፍጻሜ", en: "1 Peter 2:20 to end" },
      acts: { am: "ግብረ ሐዋርያት 11፥1 እስከ 19", en: "Acts 11:1-19" },
    },
    misbak: {
      reference: { am: "መዝሙር 46፥3", en: "Psalm 46:3" },
      geez: ["አግረረ ለነ አሕዛበ ወሕዝበ ታሕተ እገሪነ ወሀርየነ ሎቱ ለርስቱ።", "ሥኖ ለይዕቆብ ዘአፍቀረ።"],
      amharic: ["አሕዛብን ከእኛ በታች።", "ወገኖችንም ከእግራችን በታች አስገዛልን።", "ለርስቱ እኛን መረጠን። የያዕቆብን ውበት ወደደ።"],
    },
    gospel: { am: "ዮሐንስ 4፥1 እስከ 28", en: "John 4:1-28" },
    kidase: { am: "ቅዳሴ ዘእግዚእነ", en: "Kidase of Our Lord" },
  },
  "Yekatit 8": {
    date: "Yekatit 8, 2018",
    mezmur: { am: "ተቀነዩ ለእግዚአብሔር", en: "Teqeneyu LeEgziabher" },
    readings: {
      pauline: { am: "ዕብራውያን 13፥7 እስከ 16", en: "Hebrews 13:7-16" },
      catholic: { am: "ያዕቆብ 4፥6 እስከ ፍጻሜ", en: "James 4:6 to end" },
      acts: { am: "ግብረ ሐዋርያት 25፥13 እስከ ፍጻሜ", en: "Acts 25:13 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 2፥11", en: "Psalm 2:11" },
      geez: ["ተቀነዩ ለእግዚአብሔር በፍርሃት።", "ወተሐሰዩ ሎቱ በረዓድ።", "አጽንዕዋ ለጥበብ ከመ ኢይትመዐዕ እግዚአብሔር።"],
      amharic: ["ለእግዚአብሔር በፍርሃት ተገዙ።", "በረዓድም ደስ ይበላችሁ።", "ጥበብን አጽኑአት እግዚአብሔር እንዳይቆጣ።"],
    },
    gospel: { am: "ዮሐንስ 3፥10 እስከ 25", en: "John 3:10-25" },
    kidase: { am: "ቅዳሴ ዘእግዚእነ", en: "Kidase of Our Lord" },
  },
  "Yekatit 15": {
    date: "Yekatit 15, 2018",
    mezmur: { am: "ግነዩ ለግዚአብሔር", en: "Gineyu LeGziabher" },
    readings: {
      pauline: { am: "1 ተሰሎንቄ 4፥1 እስከ 13", en: "1 Thessalonians 4:1-13" },
      catholic: { am: "1 ጴጥሮስ 1፥13 እስከ ፍጻሜ", en: "1 Peter 1:13 to end" },
      acts: { am: "ግብረ ሐዋርያት 10፥17 እስከ 30", en: "Acts 10:17-30" },
    },
    misbak: {
      reference: { am: "መዝሙር 95፥5", en: "Psalm 95:5" },
      geez: ["እግዚአብሔርሰ ሰማያተ ገብረ።", "አሚን ወሠናይት ቅድሜሁ።", "ቅድሳት ወዕበየ ስብሐት ውስተ መቅደሱ።"],
      amharic: ["እግዚአብሔር ሰማያትን ፈጠረ።", "እምነትና በጎነት በፊቱ።", "ቅድስናና የክብር ገናናነት በመቅደሱ ውስጥ ናቸው።"],
    },
    gospel: { am: "ማቴዎስ 6፥16 እስከ 25", en: "Matthew 6:16-25" },
    kidase: { am: "ቅዳሴ ዘኤጲፋንዮስ", en: "Kidase of Epiphanius" },
  },
  "Yekatit 22": {
    date: "Yekatit 22, 2018",
    mezmur: { am: "ቦአ ኢየሱስ", en: "Boa Iyesus" },
    readings: {
      pauline: { am: "ቆላስይስ 2፥16 እስከ ፍጻሜ", en: "Colossians 2:16 to end" },
      catholic: { am: "ያዕቆብ 2፥14 እስከ ፍጻሜ", en: "James 2:14 to end" },
      acts: { am: "ግብረ ሐዋርያት 10፥1 እስከ 9", en: "Acts 10:1-9" },
    },
    misbak: {
      reference: { am: "መዝሙር 68፥9", en: "Psalm 68:9" },
      geez: ["እስመ ቅንዐተ ቤትከ በልዐኒ።", "ትዕይርቶሙ ለእለ ይትዔየሩከ ወድቀ ላዕሌየ።", "ወቀፃዕክዋ በጾም ለነፍስየ።"],
      amharic: ["የቤትህ ቅናት በልቶኛልና።", "የሚሰድቡህም ስድብ በላየ ወድቆአልና።", "ሰውነቴን በጾም አደከምኋት።"],
    },
    gospel: { am: "ዮሐንስ 2፥12 እስከ ፍጻሜ", en: "John 2:12 to end" },
    kidase: { am: "ቅዳሴ ዘእግዚእነ", en: "Kidase of Our Lord" },
  },
  "Yekatit 29": {
    date: "Yekatit 29, 2018",
    mezmur: { am: "አምላኩሰ ለአዳም", en: "Amlakuse LeAdam" },
    readings: {
      pauline: { am: "ገላትያ 5፥1 እስከ ፍጻሜ", en: "Galatians 5:1 to end" },
      catholic: { am: "ያዕቆብ 5፥14 እስከ ፍጻሜ", en: "James 5:14 to end" },
      acts: { am: "ግብረ ሐዋርያት 3፥1 እስከ 12", en: "Acts 3:1-12" },
    },
    misbak: {
      reference: { am: "መዝሙር 40፥3", en: "Psalm 40:3" },
      geez: ["እግዚአብሔር ይረድኦ ውስተ ዐራተ ሕማሙ።", "ወይምይጥ ሎቱ ኲሎ ምስካቢሁ እምደዌሁ።", "አንሰ እቤ እግዚኦ ተሳሃለኒ።"],
      amharic: ["እግዚአብሔር በደዌው አልጋ ሳለ ይረዳዋል።", "ምኝታውንም ሁሉ ከበሽታው የተነሳ ይለውጥለታል።", "እኔስ አቤቱ ይቅር በለኝ።"],
    },
    gospel: { am: "ዮሐንስ 5፥1 እስከ 25", en: "John 5:1-25" },
    kidase: { am: "ቅዳሴ ዘእግዚእነ", en: "Kidase of Our Lord" },
  },
  "Megabit 6": {
    date: "Megabit 6, 2018",
    mezmur: { am: "እንዘ ይነብር እግዚእነ", en: "Enze Yinebir Egzi'ine" },
    readings: {
      pauline: { am: "1 ተሰሎንቄ 4፥13 እስከ ፍጻሜ", en: "1 Thessalonians 4:13 to end" },
      catholic: { am: "2 ጴጥሮስ 3፥7 እስከ 15", en: "2 Peter 3:7-15" },
      acts: { am: "ግብረ ሐዋርያት 24፥1 እስከ 22", en: "Acts 24:1-22" },
    },
    misbak: {
      reference: { am: "መዝሙር 49፥2", en: "Psalm 49(50):2-3" },
      geez: ["ስእግዚአብሔርሰ ገሃደ ይመጽእ።", "ወአምላክነሂ ኢያረምም።", "እሳት ይነድድ ቅድሜሁ።"],
      amharic: ["እግዚአብሔር በግልጥ ይመጣል።", "አምላካችንም ዝም አይልም።", "እሳት በፊቱ ይነድዳል።"],
    },
    gospel: { am: "ማቴዎስ 24፥1 እስከ 36", en: "Matthew 24:1-36" },
    kidase: { am: "ቅዳሴ ዘአትናቴዎስ", en: "Kidase of St. Athanasius" },
  },
  "Megabit 13": {
    date: "Megabit 13, 2018",
    mezmur: { am: "መኑ ውእቱ ገብር ሄር", en: "Menu Wetu Gebr Her" },
    readings: {
      pauline: { am: "2 ጢሞቴዎስ 2፥1 እስከ 16", en: "2 Timothy 2:1-16" },
      catholic: { am: "1 ጴጥሮስ 5፥1 እስከ 12", en: "1 Peter 5:1-12" },
      acts: { am: "ግብረ ሐዋርያት 1፥6 እስከ 9", en: "Acts 1:6-9" },
    },
    misbak: {
      reference: { am: "መዝሙር 39፥8", en: "Psalm 39:8" },
      geez: ["ከመ እንግር ፈቃደከ መከርኩ አምላኪየ።", "ወሕግከኒ በማዕከለ ከርስየ።", "ዜኖኩ ጽድቀከ በማህበር ዐቢይ።"],
      amharic: ["አምላኬ ሆይ ፈቃድህን ለማድረግ ወደድሁ።", "ሕግህም በልቤ ውስጥ ነው።", "በታላቅ ጉባኤ ጽድቅን አወራለሁ።"],
    },
    gospel: { am: "ማቴዎስ 25፥14 እስከ 31", en: "Matthew 25:14-31" },
    kidase: { am: "ቅዳሴ ዘባስልዮስ", en: "Kidase of St. Basil" },
  },
  "Megabit 20": {
    date: "Megabit 20, 2018",
    mezmur: { am: "ሖረ ኀቤሁ", en: "Hore Habehu" },
    readings: {
      pauline: { am: "ሮሜ 7፥1 እስከ 12", en: "Romans 7:1-12" },
      catholic: { am: "1 ዮሐንስ 4፥18 እስከ ፍጻሜ", en: "1 John 4:18 to end" },
      acts: { am: "ግብረ ሐዋርያት 5፥34 እስከ ፍጻሜ", en: "Acts 5:34 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 16፥3", en: "Psalm 16:3" },
      geez: ["ሐወጽከኒ ሌሊተ ወፈትንኮ ለልብየ።", "አመከርከኒ ወኢተርክበ አመፃ በላዕሌየ።", "ከመ ኢይንብብ አፉየ ግብረ እጓለ እመሕያው።"],
      amharic: ["ልቤን ፈተንኸው በሌሊትም ጎበኘኸኝ።", "ፈተንኸኝ ምንም አላገኘህብኝም።", "የሰውን ሥራ አፌ እንዳይናገር ፈቃዴ ነው።"],
    },
    gospel: { am: "ዮሐንስ 3፥1 እስከ 12", en: "John 3:1-12" },
    kidase: { am: "ቅዳሴ ዘግዝእትነ", en: "Kidase of Our Lady" },
  },
  "Megabit 27": {
    date: "Megabit 27, 2018",
    mezmur: { am: "ወእንዘ ሰሙን በዐለ ፋሲካ", en: "We'enze Semun Be'ale Fasika" },
    readings: {
      pauline: { am: "ዕብራውያን 9፥11 እስከ ፍጻሜ", en: "Hebrews 9:11 to end" },
      catholic: { am: "1 ጴጥሮስ 4፥1 እስከ 12", en: "1 Peter 4:1-12" },
      acts: { am: "ግብረ ሐዋርያት 28፥11 እስከ ፍጻሜ", en: "Acts 28:11 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 8፥2", en: "Psalm 8:2" },
      geez: ["እምአፈ ደቂቅ ወሕጻናት አስተዳሎከ ስብሐተ።", "በእንተ ጸላኢ።", "ከመ ትንሥቶ ለጸላኢ ወለገፋኢ።"],
      amharic: ["ከሕጻናትና ከሚጠቡ ልጆች አፍ ምስጋናን አዘጋጀህ ስለ ጠላትህ።", "ጠላትንና ቂመኛን ለማጥፋት።"],
    },
    gospel: { am: "ዮሐንስ 5፥11 እስከ 31", en: "John 5:11-31" },
    kidase: { am: "ቅዳሴ ዘጎርጎርዮስ", en: "Kidase of St. Gregory" },
  },
  "Miazia 4": {
    date: "Miazia 4, 2018",
    mezmur: { am: "ዘትንሣኤ ይትፌሣሕ ሰማይ", en: "Of the Resurrection: Let Heaven Rejoice" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 15፥20 እስከ 41", en: "1 Corinthians 15:20-41" },
      catholic: { am: "1 ጴጥሮስ 1፥1 እስከ 13", en: "1 Peter 1:1-13" },
      acts: { am: "ግብረ ሐዋርያት 2፥22 እስከ 37", en: "Acts 2:22-37" },
    },
    misbak: {
      reference: { am: "መዝሙር 117፥24", en: "Psalm 117(118):24" },
      geez: ["ዛቲ ዕለት እንተ ገብረ እግዚአብሔር።", "ንትፈሣሕ ወንትሐሠይ ባቲ።", "ኦ እግዚኦ አድህንሶ።"],
      amharic: ["እግዚአብሔር የሰራት ቀን ይህች ናት።", "ሐሴትን እናድርግ በእርስዋም ደስ ይበለን።", "አቤቱ እባክህ አሁን አድን።"],
    },
    gospel: { am: "ማቴዎስ 28፥1 እስከ ፍጻሜ፣ ማርቆስ 16፥1 እስከ ፍጻሜ፣ ሉቃስ 24፥1 እስከ 13፣ ዮሐንስ 20፥1 እስከ 19", en: "Matthew 28:1 to end; Mark 16:1 to end; Luke 24:1-13; John 20:1-19" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Miazia 11": {
    date: "Miazia 11, 2018",
    mezmur: { am: "ይትፌሣሕ ሰማይ", en: "Yitfeseh Semay" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 15፥1 እስከ 20", en: "1 Corinthians 15:1-20" },
      catholic: { am: "1 ዮሐንስ 1፥1 እስከ 10", en: "1 John 1:1-10" },
      acts: { am: "ግብረ ሐዋርያት 23፥1 እስከ 10", en: "Acts 23:1-10" },
    },
    misbak: {
      reference: { am: "መዝሙር 67፥1", en: "Psalm 67:1" },
      geez: ["ይትነሣእ እግዚአብሔር ወይዘረው ፀሩ።", "ወይጉየዩ ጸላእቱ እምቅድመ ገጹ።", "ከመ የሐልቅ ጢስ ከማሁ የሃልቁ።"],
      amharic: ["እግዚአብሔር ይነሳ ጠልቶቹም ይበተኑ።", "የሚጠሉትም ከፊቱ ይሽሹ።", "ጢስ እንደሚበንን እንዲሁ ይብነኑ።"],
    },
    gospel: { am: "ዮሐንስ 20፥19 እስከ ፍጻሜ", en: "John 20:19 to end" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Miazia 18": {
    date: "Miazia 18, 2018",
    mezmur: { am: "ወበእሁድ ሰንበት", en: "Webe'ehud Senbet" },
    readings: {
      pauline: { am: "2 ቆሮንቶስ 5፥11 እስከ ፍጻሜ", en: "2 Corinthians 5:11 to end" },
      catholic: { am: "2 ጴጥሮስ 3፥14 እስከ ፍጻሜ", en: "2 Peter 3:14 to end" },
      acts: { am: "ግብረ ሐዋርያት 21፥31 እስከ ፍጻሜ", en: "Acts 21:31 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 11፥5", en: "Psalm 11(12):5" },
      geez: ["ይእዜ እትነሳእ ይቤ እግዚአብሔር።", "እሬሲ መድሀኒተ ወአግህድ ቦቱ።", "ቃለ እግዚአብሔር ቃል ንጹሕ።"],
      amharic: ["እግዚአብሔር አሁን እነሳለሁ ይላል።", "መድሀኒትን አደርጋለሁ በላዩም እገለጣለሁ።"],
    },
    gospel: { am: "ሉቃስ 24፥13 እስከ 33", en: "Luke 24:13-33" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Miazia 25": {
    date: "Miazia 25, 2018",
    mezmur: { am: "ተንሥአ ወአንሥአ ኲሎ ሙታነ", en: "Tense'a We'anse'a Kulo Mutane" },
    readings: {
      pauline: { am: "ቈላስይስ 3፥1 እስከ ፍጻሜ", en: "Colossians 3:1 to end" },
      catholic: { am: "1 ጴጥሮስ 3፥15 እስከ ፍጻሜ", en: "1 Peter 3:15 to end" },
      acts: { am: "ግብረ ሐዋርያት 11፥1 እስከ ፍጻሜ 19", en: "Acts 11:1-19" },
    },
    misbak: {
      reference: { am: "መዝሙር 3፥5", en: "Psalm 3:5" },
      geez: ["አንሰ ሰከብኩ ወኖምኩ።", "ወተንሣእኩ እስመ እግዚአብሔር አንስአኒ።", "ኢይፈርህ እምአዕላፍ አህዛብ።"],
      amharic: ["እኔ ተኛሁ አንቀላፋሁም።", "እግዚአብሔርም ደግፎኛልና ነቃሁ።", "ከሚከቡኝ ከአእላፍ ሕዝብ አልፈራም።"],
    },
    gospel: { am: "ሉቃስ 24፥33 እስከ 45", en: "Luke 24:33-45" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Ginbot 2": {
    date: "Ginbot 2, 2018",
    mezmur: { am: "አርአየ ስልጣኖ ላዕለ ሞት", en: "Ar'aye Siltano La'ele Mot" },
    readings: {
      pauline: { am: "ሮሜ 4፥14 እስከ ፍጻሜ", en: "Romans 4:14 to end" },
      catholic: { am: "ራእይ ዮሐንስ 20፥1 እስከ ፍጻሜ", en: "Revelation 20:1 to end" },
      acts: { am: "ግብረ ሐዋርያት 10፥39 እስከ 44", en: "Acts 10:39-44" },
    },
    misbak: {
      reference: { am: "መዝሙር 77፥29", en: "Psalm 77:29" },
      geez: ["በልዑ ወጸግቡ ጥቀ።", "ወወሀቦሙ ለፍትወቶሙ።", "ወኢያህጥዖሙ እምዘፈቀዱ።"],
      amharic: ["በሉ እጅግም በጠገቡ።", "ምኞታቸውንም ሰጣቸው።", "ከወደዱትም አላሳጣቸውም።"],
    },
    gospel: { am: "ዮሐንስ 21፥1 እስከ 15", en: "John 21:1-15" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Ginbot 9": {
    date: "Ginbot 9, 2018",
    mezmur: { am: "ፋሲካ", en: "Fasika" },
    readings: {
      pauline: { am: "ሮሜ 6፥1 እስከ 15", en: "Romans 6:1-15" },
      catholic: { am: "1 ጴጥሮስ 4፥4 እስከ 12", en: "1 Peter 4:4-12" },
      acts: { am: "ግብረ ሐዋርያት 23፥15 እስከ 22", en: "Acts 23:15-22" },
    },
    misbak: {
      reference: { am: "መዝሙር 106፥16", en: "Psalm 106:16" },
      geez: ["እስመ ሰበረ ሆሀተ ብርት።", "ወቀጥቀጠ መናሥግተ ዘሀፂን።", "ወተወክፎሙ እምፍኖተ ጌጋዮሙ።"],
      amharic: ["የናሱን ደጆች ሰብሮአልና።", "የብረቱንም መወርወሪያ ቆርጦአልና።", "ከበደላቸው ጎዳና ተቀበላቸው።"],
    },
    gospel: { am: "ዮሐንስ 21፥15 እስከ ፍጻሜ", en: "John 21:15 to end" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Ginbot 16": {
    date: "Ginbot 16, 2018",
    mezmur: { am: "በሰንበት ዐርገ ሐመረ", en: "Besenbet Arge Hamere" },
    readings: {
      pauline: { am: "ሮሜ 10፥1 እስከ ፍጻሜ", en: "Romans 10:1 to end" },
      catholic: { am: "1 ጴጥሮስ 3፥15 እስከ ፍጻሜ", en: "1 Peter 3:15 to end" },
      acts: { am: "ግብረ ሐዋርያት 1፥1 እስከ 12", en: "Acts 1:1-12" },
    },
    misbak: {
      reference: { am: "መዝሙር 46፥5", en: "Psalm 46:5" },
      geez: ["ዐርገ እግዚአብሔር በይባቤ።", "ወእግዚእነ በቃለ ቀርን።", "ዘምሩ ለአምላክነ ዘምሩ።"],
      amharic: ["አምላክ በእልልታ።", "እግዚአብሔር በመለከት ድምፅ ዐረገ።", "ዘምሩ ለአምላካችን ዘምሩ።"],
    },
    gospel: { am: "ሉቃስ 24፥45 እስከ ፍጻሜ", en: "Luke 24:45 to end" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Ginbot 23": {
    date: "Ginbot 23, 2018",
    mezmur: { am: "ይትፌሣሕ ሰማይ የሌሊቱን እንደ ትንሳኤ አድርስ", en: "Yitfeseh Semay - night hymn in resurrection mode" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 15፥20 እስከ 41", en: "1 Corinthians 15:20-41" },
      catholic: { am: "1 ጴጥሮስ 1፥1 እስከ 13", en: "1 Peter 1:1-13" },
      acts: { am: "ግብረ ሐዋርያት 2፥22 እስከ 37", en: "Acts 2:22-37" },
    },
    misbak: {
      reference: { am: "መዝሙር 117፥24", en: "Psalm 117(118):24" },
      geez: ["ዛቲ ዕለት እንተ ገብረ እግዚአብሔር።", "ንትፈሣሕ ወንትሐሠይ ባቲ።", "ኦ እግዚኦ አድህንሶ።"],
      amharic: ["እግዚአብሔር የሰራት ቀን ይህች ናት።", "ሐሴትን እናድርግ በእርስዋም ደስ ይበለን።", "አቤቱ እባክህ አሁን አድን።"],
    },
    gospel: { am: "ዮሐንስ 20፥1 እስከ 19", en: "John 20:1-19" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Ginbot 30": {
    date: "Ginbot 30, 2018",
    mezmur: { am: "ወረደ መንፈስ ቅዱስ", en: "Worede Menfes Qidus" },
    readings: {
      pauline: { am: "ኤፌሶን 4፥1 እስከ 17", en: "Ephesians 4:1-17" },
      catholic: { am: "1 ዮሐንስ 2፥1 እስከ 18", en: "1 John 2:1-18" },
      acts: { am: "ግብረ ሐዋርያት 2፥1 እስከ 14", en: "Acts 2:1-14" },
    },
    misbak: {
      reference: { am: "መዝሙር 67፥18", en: "Psalm 67:18" },
      geez: ["ዐረገ ውስተ ዓርያም ፄዊወከ ፄዋ።", "ወወሀብከ ጸጋከ ለእጓለ እመሕያው።", "እስመ ይክህዱ ከመ ይህድሩ።"],
      amharic: ["ወደ ላይ ዐረግህ ምርኮንም ማረክህ።", "ስጦታንም ለሰዎች ሰጠህ።", "ደግሞም ለአመጸኞች በዚያ ያድሩ ዘንድ።"],
    },
    gospel: { am: "ዮሐንስ 14፥1 እስከ 22", en: "John 14:1-22" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Sene 7": {
    date: "Sene 7, 2018",
    mezmur: { am: "ዓርገ እግዚአብሔር በቃለ ቀርን", en: "Arge Egziabher BeQale Qern" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 12፥1 እስከ 12", en: "1 Corinthians 12:1-12" },
      catholic: { am: "1 ዮሐንስ 2፥20 እስከ መጨረሻ", en: "1 John 2:20 to end" },
      acts: { am: "ግብረ ሐዋርያት 2፥14 እስከ 22", en: "Acts 2:14-22" },
    },
    misbak: {
      reference: { am: "መዝሙር 50፥10", en: "Psalm 50:10" },
      geez: ["ልበ ንጹሐ ፍጥር ሊተ እግዚኦ።", "መንፈሰ ርቱዓ ሐድስ ውስተ ከርሥየ።", "ኢትግድፈኒ እምቅድመ ገጽከ።"],
      amharic: ["አቤቱ ንጹሕ ልብን ፍጠርልኝ።", "የቀናውንም መንፈስ በውስጤ አድስ።", "ከፊትህ አትጣለኝ።"],
    },
    gospel: { am: "ወንጌል ዘዮሐንስ 14፥22 እስከ መጨረሻ", en: "John 14:22 to end" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Sene 14": {
    date: "Sene 14, 2018",
    mezmur: { am: "ዘምሩ ለእግዚአብሔር በቃለ ቀርን", en: "Zemru LeEgziabher BeQale Qern" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 14፥1 እስከ 27", en: "1 Corinthians 14:1-27" },
      catholic: { am: "1 ዮሐንስ 4፥1 እስከ 9", en: "1 John 4:1-9" },
      acts: { am: "ግብረ ሐዋርያት 10፥44 እስከ 11", en: "Acts 10:44-11:11" },
    },
    misbak: {
      reference: { am: "መዝሙር 50፥11", en: "Psalm 50:11" },
      geez: ["ኢትግድፈኒ እምቅድመ ገጽከ።", "ወመንፈሰከ ቅዱሰ ኢታውጽእ እምላዕሌየ።", "ዕሥየኒ ፍሥሓ ወአድኅኖተከ።"],
      amharic: ["ከፊትህ አትጣለኝ።", "ቅዱስ መንፈስህንም ከእኔ አትውሰድብኝ።", "የማዳንህን ደስታ ስጠኝ።"],
    },
    gospel: { am: "ወንጌል ዘዮሐንስ 15፥17 እስከ ፍጻሜ", en: "John 15:17 to end" },
    kidase: { am: "ቅዳሴ ዘዲዮስቆሮስ", en: "Kidase of Dioscorus" },
  },
  "Sene 21": {
    date: "Sene 21, 2018",
    mezmur: { am: "ናክብር ሰንበቶ (በበዓታ ሐነፀ መቅደሶ)", en: "Nakbir Senbeto (BeBe'ata Hanetse Meqdeso)" },
    readings: {
      pauline: { am: "ሮሜ 5፥12 እስከ መጨረሻ", en: "Romans 5:12 to end" },
      catholic: { am: "3 ዮሐንስ 1፥1 እስከ መጨረሻ", en: "3 John 1:1 to end" },
      acts: { am: "ግብረ ሐዋርያት 16፥1 እስከ 14", en: "Acts 16:1-14" },
    },
    misbak: {
      reference: { am: "መዝሙር 85፥15", en: "Psalm 85:15" },
      geez: ["አንተሰ እግዚኦ መሐሪ ወመስተሣህል።", "ርኁቀ መዓት ወብዙኃ ምሕረት ወጻድቅ።", "ነጽር ላዕሌየ ወተሣሃለኒ።"],
      amharic: ["አቤቱ አንተ ግን መሐሪና ርኅሩኅ አምላክ ነህ።", "መዓትህ የራቀ ምሕረትህም እውነትህም የበዛ።", "ወደ እኔ ተመልከት ማረኝም።"],
    },
    gospel: { am: "ማቴዎስ 22፥1 እስከ 23", en: "Matthew 22:1-23" },
    kidase: { am: "ቅዳሴ ዘእዚእነ", en: "Kidase of Our Lord" },
  },
  "Sene 28": {
    date: "Sene 28, 2018",
    mezmur: { am: "ደምጸ እገሪሁ ለዝናም", en: "Demtse Egerihu LeZinam" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 15፥33 እስከ 51", en: "1 Corinthians 15:33-51" },
      catholic: { am: "ያዕቆብ 5፥16 እስከ ፍጻሜ", en: "James 5:16 to end" },
      acts: { am: "ግብረ ሐዋርያት 27፥11 እስከ 21", en: "Acts 27:11-21" },
    },
    misbak: {
      reference: { am: "መዝሙር 146፥8", en: "Psalm 146:8" },
      geez: ["ዘይገለብቦ ለሰማይ በደመና።", "ወያስተዴሉ ክረምተ ለምድር።", "ዘያበቊል ሣዕረ ውስተ አድባር።"],
      amharic: ["ሰማዩን በደመናት ይሸፍናል።", "ለምድርም ዝናብን ያዘጋጃል።", "ሣርን በተራሮች ላይ ያበቅላል።"],
    },
    gospel: { am: "ሉቃስ 8፥1 እስከ 22", en: "Luke 8:1-22" },
    kidase: { am: "ቅዳሴ ዘኤጲፋንዮስ", en: "Kidase of Epiphanius" },
  },
  "Hamle 5": {
    date: "Hamle 5, 2018",
    mezmur: { am: "አሠርገዎሙ", en: "Asergeowomu" },
    readings: {
      pauline: { am: "2 ጢሞቴዎስ 4፥1 እስከ ፍጻሜ", en: "2 Timothy 4:1 to end" },
      catholic: { am: "1 ጴጥሮስ 1፥12 እስከ 19", en: "1 Peter 1:12-19" },
      acts: { am: "ግብረ ሐዋርያት 23፥10 እስከ ፍጻሜ", en: "Acts 23:10 to end" },
    },
    misbak: {
      reference: { am: "መዝሙር 18፥3", en: "Psalm 18:3-4" },
      geez: ["አልቦ ነገር ወአልቦ ነቢብ ዘኢተሰምዐ ቃሎሙ።", "ውስተ ኲሉ ምድር ወፅአ ነገሮሙ።", "ወእስከ አፅናፈ ዓለም በጽሐ ነቢቦሙ።"],
      amharic: ["ነገር የለም መናገርም የለም።", "ድምፃቸውም አይሰምም።", "ቃላቸውም እስከ ዓለም ዳርቻ ወጣ።"],
    },
    gospel: { am: "ሉቃስ 6፥1 እስከ 20", en: "Luke 6:1-20" },
    kidase: { am: "ቅዳሴ ዘሐዋያት", en: "Kidase of the Apostles" },
  },
  "Hamle 12": {
    date: "Hamle 12, 2018",
    mezmur: { am: "ንጉሥ ውእቱ", en: "Nigus Wetu" },
    readings: {
      pauline: { am: "2 ቆሮንቶስ 9፥1 እስከ ፍጻሜ", en: "2 Corinthians 9:1 to end" },
      catholic: { am: "1 ጴጥሮስ 3፥15 እስከ ፍጻሜ", en: "1 Peter 3:15 to end" },
      acts: { am: "ግብረ ሐዋርያት 27፥21 እስከ 33", en: "Acts 27:21-33" },
    },
    misbak: {
      reference: { am: "መዝሙር 146፥8", en: "Psalm 146:8" },
      geez: ["ዘያበቊል ሣዕረ ለእንስሳ።", "ወሐመልማለ ለቅኔ እጓለ እመሕያው።", "ከመ ያውፅእ እክለ እምድር።"],
      amharic: ["ሣርን በተራሮች ላይ ያበቅላል።", "ልምላሜውንም ለሰው ልጆች አገልግሎት።", "ለሚጠሩት ለቊራዎች ጫጩቶች ለእንስሳትም ምግባቸውን ይሰጣል።"],
    },
    gospel: { am: "ማቴዎስ 24፥36 እስከ ፍጻሜ", en: "Matthew 24:36 to end" },
    kidase: { am: "ቅዳሴ ዘኤጲፋዮስ", en: "Kidase of Epiphanius" },
  },
  "Hamle 19": {
    date: "Hamle 19, 2018",
    mezmur: { am: "ጥቡዕ ልቡ ለህፃን", en: "Tibu'e Libu LeHitsan" },
    readings: {
      pauline: { am: "1 ተሰሎንቄ 2፥1 እስከ 13", en: "1 Thessalonians 2:1-13" },
      catholic: { am: "1 ጴጥሮስ 2፥1 እስከ 13", en: "1 Peter 2:1-13" },
      acts: { am: "ግብረ ሐዋርያት 20፥1 እስከ 13", en: "Acts 20:1-13" },
    },
    misbak: {
      reference: { am: "መዝሙር 76፥17", en: "Psalm 76:17" },
      geez: ["ቃለ ወሀቡ ደመናት አሕፃከ ይወፅኡ።", "ቃለ ነጐድጓድከ በሠረገላት።", "አስተርአየ መባርቅቲሁ ለዓለም።"],
      amharic: ["ደመኖች ድምፅን ሰጡ ፍላጾችህም ወጡ።", "የነጐድጓድህ ድምፅ በዐውሎ ነበረ።", "መንረቆች ለዓለም አበሩ።"],
    },
    gospel: { am: "ሉቃስ 10፥17 እስከ 25", en: "Luke 10:17-25" },
    kidase: { am: "ቅዳሴ ዘወልደ ነጐድጓድ", en: "Kidase of Welde Negodguad" },
  },
  "Hamle 26": {
    date: "Hamle 26, 2018",
    mezmur: { am: "በሰንበት ቦአ ኢየሱስ", en: "Besenbet Boa Iyesus" },
    readings: {
      pauline: { am: "2 ቆሮንቶስ 10፥1 እስከ ፍጻሜ", en: "2 Corinthians 10:1 to end" },
      catholic: { am: "ያዕቆብ 3፥1 እስከ 9", en: "James 3:1-9" },
      acts: { am: "ግብረ ሐዋርያት 28፥17", en: "Acts 28:17" },
    },
    misbak: {
      reference: { am: "መዝሙር 64፥9", en: "Psalm 64:9" },
      geez: ["ሐወጽካ ለምድር ወአርወይካ።", "ወአብዛህኮ ለብዕላ።", "ፈለገ እግዚአብሔር ምሉዕ ማያተ።"],
      amharic: ["ምድርን ጎበኘሃት አጠጣሃትም።", "ብልጥግናዋንም እጅግ አበዛህ።", "የእግዚአብሔር ወንዝ ውኃን የተመላ ነው።"],
    },
    gospel: { am: "ማቴዎስ 8፥1 እስከ ፍጻሜ", en: "Matthew 8:1 to end" },
    kidase: { am: "ቅዳሴ ዘእግዚእነ", en: "Kidase of Our Lord" },
  },
  "Nehase 3": {
    date: "Nehase 3, 2018",
    mezmur: { am: "ዮም ንወድሳ ለማርያም", en: "Yom Niwedsa LeMaryam" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 8፥1 እስከ ፍጻሜ", en: "1 Corinthians 8:1 to end" },
      catholic: { am: "1 ጴጥሮስ 4፥1 እስከ 6", en: "1 Peter 4:1-6" },
      acts: { am: "ግብረ ሐዋርያት 26፥1 እስከ 24", en: "Acts 26:1-24" },
    },
    misbak: {
      reference: { am: "መዝሙር 86፥5", en: "Psalm 86:5" },
      geez: ["እምነ ጽዮን ይብል ሰብእ።", "ወብእሲ ተወልደ በውስቴታ።", "ወውእቱ ልዑል ሳረራ።"],
      amharic: ["ሰው ሁሉ እናታችን ጽዮን ይላል።", "በውስጥዋም ሰው ተወለደ።", "እርሱ ራሱም ልዑል መሠረታት።"],
    },
    gospel: { am: "ማቴዎስ 12፥38 እስከ ፍጻሜ", en: "Matthew 12:38 to end" },
    kidase: { am: "ቅዳሴ ዘእግእትነ", en: "Kidase of Our Lady" },
  },
  "Nehase 10": {
    date: "Nehase 10, 2018",
    mezmur: { am: "ዛቲ ይእቲ ማርያም", en: "Zati Yi'iti Maryam" },
    readings: {
      pauline: { am: "ዕብራውያን 11፥8 እስከ 19", en: "Hebrews 11:8-19" },
      catholic: { am: "1 ዮሐንስ 1፥1 እስከ 8", en: "1 John 1:1-8" },
      acts: { am: "ግብረ ሐዋርያት 27፥31", en: "Acts 27:31" },
    },
    misbak: {
      reference: { am: "መዝሙር 120፥1", en: "Psalm 120(121):1" },
      geez: ["አንሳእኩ አዕይትየ መንገለ አድባር።", "እምአይቴ ይምጻእ ረድኤትየ።", "ረድኤትየሰ እምሀበ እግዚአብሔር።"],
      amharic: ["ዓይኖቼን ወደ እግዚአብሔር አነሳሁ።", "ረዳቴ ከወዴት ይምጣ?", "ረዳቴ ሰማይና ምድርን ከሰራ ከእግዚአብሔር ዘንድ ነው።"],
    },
    gospel: { am: "ሉቃስ 1፥39 እስከ 46", en: "Luke 1:39-46" },
    kidase: { am: "ቅዳሴ ዘእግዝእትነ", en: "Kidase of Our Lady" },
  },
  "Nehase 17": {
    date: "Nehase 17, 2018",
    mezmur: { am: "ንዒ ርግብየ", en: "Ni'i Rigidbiye" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 7፥13 እስከ 18", en: "1 Corinthians 7:13-18" },
      catholic: { am: "ያዕቆብ 4፥11 እስከ ፍጻሜ", en: "James 4:11 to end" },
      acts: { am: "ግብረ ሐዋርያት 18፥9 እስከ 18", en: "Acts 18:9-18" },
    },
    misbak: {
      reference: { am: "መዝሙር 67፥13", en: "Psalm 67:13" },
      geez: ["ክነፈ ርግብ በብሩር ዘግቡር።", "ወገበዋቲሃኒ በሐመልማለ ወርቅ።", "አመ አዘዘ ሰማያዊ ንጉሥ ላዕሌሃ።"],
      amharic: ["ከብር እንደተሠሩ እንደ ርግብ ክንፎች።", "በቅጠልያ ወርቅም እንደ ተለበጡ ላባዎችዋት ሆናላችሁ።", "ሰማያዊ ንጉሥ በላይዋ ባዘዘ ጊዜ።"],
    },
    gospel: { am: "ሉቃስ 1፥26 እስከ 39", en: "Luke 1:26-39" },
    kidase: { am: "ቅዳሴ ዘእግዝእትነ", en: "Kidase of Our Lady" },
  },
  "Nehase 24": {
    date: "Nehase 24, 2018",
    mezmur: { am: "ይሁበነ ዝናመ በጊዜሁ", en: "Yihubene Ziname BeGizehu" },
    readings: {
      pauline: { am: "ዕብራውያን 3፥1 እስከ ፍጻሜ", en: "Hebrews 3:1 to end" },
      catholic: { am: "ያዕቆብ 5፥1 እስከ 12", en: "James 5:1-12" },
      acts: { am: "ግብረ ሐዋርያት 22፥1 እስከ 22", en: "Acts 22:1-22" },
    },
    misbak: {
      reference: { am: "መዝሙር 144፥16", en: "Psalm 144:16" },
      geez: ["ዐይነ ኲሉ ነፍስ ይሴፎ ኪያከ።", "አንተ ትሁቦሙ ሲሳዮሙ በጊዜሁ።", "ትሰፍሕ የማነከ ወታጸግብ ለጒሉ እንስሳ ዘበሥርዓትከ።"],
      amharic: ["የሁሉ ዐይን አንተን ተስፋ ያደርጋል።", "አንተም ምግባቸውን በየጊዜው ትሰጣቸዋለህ።", "አንተ እጅህን ትከፍታለህ፤ ሕይወት ላለውም ሁሉ መልካምን ታጠግባለህ።"],
    },
    gospel: { am: "ዮሐንስ 6፥41 እስከ ፍጻሜ", en: "John 6:41 to end" },
    kidase: { am: "ቅዳሴ ዘኤጲፋንዮስ", en: "Kidase of Epiphanius" },
  },
  "Pagumen 1": {
    date: "Pagumen 1, 2018",
    mezmur: { am: "ከመ እንተ መብረቅ", en: "Keme Ente Mebreq" },
    readings: {
      pauline: { am: "1 ቆሮንቶስ 1፥1 እስከ 10", en: "1 Corinthians 1:1-10" },
      catholic: { am: "1 ጴጥሮስ 2፥2 እስከ 11", en: "1 Peter 2:2-11" },
      acts: { am: "ግብረ ሐዋርያት 9፥1 እስከ 10", en: "Acts 9:1-10" },
    },
    misbak: {
      reference: { am: "መዝሙር 49፥2", en: "Psalm 49(50):2" },
      geez: ["እግዚአብሔርሰ ገሃደ ይመጽእ።", "ወአምላክነሂ ኢያረምም።", "እሳት ይነድድ ቅድሜሁ።"],
      amharic: ["እግዚአብሔር ግልጥ ሆኖ ይመጣል።", "አምላካችን ይመጣል ዝምም አይልም።", "እሳት በፊቱ ይነዳል።"],
    },
    gospel: { am: "ወንጌል ሉቃስ 17፥11 እስከ መጨረሻ", en: "Luke 17:11 to end" },
    kidase: { am: "ቅዳሴ ዘያዕቆብ ዘሥሩግ", en: "Kidase of Jacob of Serugh" },
  },
}

const misbakEnglishTranslations: Record<string, string[]> = {
  "Meskerem 4": ["Mercy and truth have met together.", "Righteousness and peace have embraced.", "Truth has sprung up from the earth."],
  "Meskerem 11": ["The earth has yielded its fruit.", "God, our God, shall bless us.", "God shall bless us."],
  "Meskerem 18": ["You have given a sign to those who fear You.", "That they may escape from the bow.", "That Your beloved may be delivered."],
  "Meskerem 25": ["There is no speech and there are no words where their voice is not heard.", "Their message has gone out into all the earth.", "Their words have reached the ends of the world."],
  "Tikimt 2": ["You shall eat the fruit of your labor.", "Blessed are you, and it shall be well with you.", "Your wife shall be like a fruitful vine within your house."],
  "Tikimt 9": ["Remember, O Lord, that we are dust.", "Man's days are like grass.", "He flourishes like a flower of the field."],
  "Tikimt 16": ["The righteous shall flourish like a palm tree.", "He shall grow like a cedar in Lebanon.", "They are planted in the house of the Lord."],
  "Tikimt 23": ["You brought a vine out of Egypt.", "You drove out the nations and planted it.", "You prepared room for it before You."],
  "Tikimt 30": ["He shall be like a tree planted by streams of water.", "It yields its fruit in its season.", "Its leaf also shall not wither."],
  "Hidar 7": ["Do not remember our former sins against us.", "Let Your mercies quickly come to us, O Lord.", "For we have been brought very low."],
  "Hidar 14": ["Whatever the Lord pleased, He has done.", "In heaven and on earth.", "In the sea and in all the deep places."],
  "Hidar 21": ["Come near to Him and be enlightened.", "Your faces shall not be ashamed.", "This poor man cried, and the Lord heard him."],
  "Hidar 28": ["O sons of men, how long will you harden your hearts?", "Why do you love vanity and seek falsehood?", "Know that the Lord has glorified His holy one."],
  "Tahsas 5": ["I will abundantly bless her provision.", "I will clothe her priests with salvation.", "Her saints shall shout aloud for joy."],
  "Tahsas 12": ["Stretch out Your hand from on high.", "Deliver me and rescue me from great waters.", "And from the hand of strangers."],
  "Tahsas 19": ["Send out Your light and Your truth.", "Let them lead me and bring me to Your holy hill.", "And to Your dwelling places, O Lord."],
  "Tahsas 26": ["Give ear, O Shepherd of Israel.", "You who lead Joseph like a flock.", "You who dwell between the cherubim, shine forth."],
  "Tir 3": ["I will make him My firstborn.", "Higher than the kings of the earth.", "My mercy I will keep for him forever."],
  "Tir 10": ["Behold, we heard of it in Ephrathah.", "We found it in the fields of the forest.", "Let us enter into His dwelling place."],
  "Tir 17": ["The teacher of the law gives blessing.", "They go from strength to strength.", "The God of gods shall be seen in Zion."],
  "Tir 24": ["The Lord God has revealed Himself to us.", "Celebrate the feast with gladness.", "Even to the horns of the altar."],
  "Yekatit 1": ["He subdued the peoples under us.", "And the nations under our feet.", "He chose our inheritance for us, the glory of Jacob whom He loved."],
  "Yekatit 8": ["Serve the Lord with fear.", "Rejoice before Him with trembling.", "Hold fast to wisdom lest the Lord be angry."],
  "Yekatit 15": ["The Lord made the heavens.", "Faithfulness and goodness are before Him.", "Holiness and glorious praise are in His sanctuary."],
  "Yekatit 22": ["Zeal for Your house has consumed me.", "The reproaches of those who reproach You have fallen on me.", "I humbled my soul with fasting."],
  "Yekatit 29": ["The Lord will sustain him upon the bed of sickness.", "He will turn all his bed in his illness.", "As for me, I said, O Lord, have mercy on me."],
  "Megabit 6": ["Our God comes openly.", "Our God will not keep silent.", "Fire burns before Him."],
  "Megabit 13": ["My God, I desired to do Your will.", "Your law is within my heart.", "I declared Your righteousness in the great assembly."],
  "Megabit 20": ["You tested my heart in the night.", "You examined me and found no wrongdoing in me.", "I resolved that my mouth would not speak the works of men."],
  "Megabit 27": ["Out of the mouths of infants and nursing children You prepared praise.", "Because of the enemy.", "To silence the enemy and the avenger."],
  "Miazia 4": ["This is the day the Lord has made.", "Let us rejoice and be glad in it.", "O Lord, save now."],
  "Miazia 11": ["Let God arise and let His enemies be scattered.", "Let those who hate Him flee from before His face.", "As smoke vanishes, so let them vanish."],
  "Miazia 18": ["Now I will arise, says the Lord.", "I will bring salvation and make it manifest.", "The word of the Lord is a pure word."],
  "Miazia 25": ["I lay down and slept.", "I awoke, for the Lord sustained me.", "I will not be afraid of ten thousands of people."],
  "Ginbot 2": ["They ate and were well filled.", "He gave them what they desired.", "He did not withhold what they longed for."],
  "Ginbot 9": ["He broke the gates of bronze.", "He cut the bars of iron in two.", "He received them back from the path of their transgressions."],
  "Ginbot 16": ["God has gone up with a shout.", "The Lord with the sound of a trumpet.", "Sing praises to our God, sing praises."],
  "Ginbot 23": ["This is the day the Lord has made.", "Let us rejoice and be glad in it.", "O Lord, save now."],
  "Ginbot 30": ["You ascended on high and led captivity captive.", "You gave gifts to the children of men.", "Even to the rebellious, that they may dwell there."],
  "Sene 7": ["Create in me a clean heart, O God.", "Renew a right spirit within me.", "Do not cast me away from Your presence."],
  "Sene 14": ["Do not cast me away from Your presence.", "Do not take Your Holy Spirit from me.", "Restore to me the joy of Your salvation."],
  "Sene 21": ["But You, O Lord, are merciful and compassionate.", "Slow to anger and abundant in mercy and truth.", "Look upon me and have mercy on me."],
  "Sene 28": ["He covers the heavens with clouds.", "He prepares rain for the earth.", "He makes grass grow on the mountains."],
  "Hamle 5": ["There is no speech and no language where their voice is not heard.", "Their message has gone out into all the earth.", "Their words have reached the ends of the world."],
  "Hamle 12": ["He causes grass to grow for the cattle.", "And greenery for the service of man.", "He gives food to the beasts and to the young ravens that cry."],
  "Hamle 19": ["The clouds gave forth Your arrows.", "The voice of Your thunder was in the whirlwind.", "Your lightnings lit up the world."],
  "Hamle 26": ["You visited the earth and watered it.", "You greatly enriched it.", "The river of God is full of water."],
  "Nehase 3": ["Of Zion it shall be said: this one and that one were born in her.", "A man was born within her.", "The Most High Himself shall establish her."],
  "Nehase 10": ["I lifted up my eyes to the mountains.", "From where shall my help come?", "My help comes from the Lord."],
  "Nehase 17": ["The wings of the dove are covered with silver.", "And her feathers with yellow gold.", "When the heavenly King gave command over her."],
  "Nehase 24": ["The eyes of all look to You with hope.", "You give them their food in due season.", "You open Your hand and satisfy every living thing with goodness."],
  "Pagumen 1": ["God shall come openly.", "Our God shall come and shall not keep silent.", "Fire shall burn before Him."],
}

export const liturgicalReadings: Record<string, LiturgicalReading> = Object.fromEntries(
  Object.entries(baseLiturgicalReadings).map(([key, reading]) => [
    key,
    {
      ...reading,
      misbak: {
        ...reading.misbak,
        english: misbakEnglishTranslations[key] ?? [],
      },
    },
  ]),
) as Record<string, LiturgicalReading>

export const liturgicalReadingKeys = Object.keys(liturgicalReadings)
