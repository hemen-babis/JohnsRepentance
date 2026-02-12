import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GeezHeading } from "@/components/geez-heading"
import { ChurchLocator } from "@/components/church-locator"
import {
  BookOpen,
  DoorOpen,
  Flame,
  HeartHandshake,
  ShieldCheck,
  ScrollText,
  Church,
  Compass,
  Sparkles,
  HelpCircle,
} from "lucide-react"

const covenantSteps = [
  {
    title: "The Foundation",
    subtitle: "Dogma & Theology",
    description: "The Head — what we believe in the Ethiopian Orthodox Tewahedo tradition.",
    icon: BookOpen,
    href: "#foundation",
  },
  {
    title: "The Ark of Worship",
    subtitle: "Liturgy & Praxis",
    description: "The Heart — how we worship and enter sacred space with reverence.",
    icon: Church,
    href: "#worship",
  },
  {
    title: "The Path of Discipline",
    subtitle: "Fasting & Feasts",
    description: "The Body — how the calendar shapes the soul and daily life.",
    icon: Flame,
    href: "#discipline",
  },
  {
    title: "The Communion of Saints",
    subtitle: "Hagiography & Intercession",
    description: "The Cloud of Witnesses — learning to walk with the saints.",
    icon: Sparkles,
    href: "#saints",
  },
  {
    title: "The Life of the Spirit",
    subtitle: "Penance & Integration",
    description: "Entering fully into the fold through repentance and sacramental life.",
    icon: HeartHandshake,
    href: "#integration",
  },
]

const catechumenChecklist = [
  "I have attended Divine Liturgy.",
  "I have spoken to a priest about catechism.",
  "I have begun a daily prayer routine.",
  "I am fasting on Wednesdays and Fridays.",
  "I am reading the Gospel of John.",
  "I have joined a catechumen class or mentorship.",
]

const commonQuestions = [
  {
    question: "Can I take Holy Communion while learning?",
    answer:
      "Catechumens do not receive Holy Communion yet. The Church blesses you to prepare in prayer and repentance until baptism and chrismation.",
  },
  {
    question: "Do I need to change my lifestyle before I begin?",
    answer:
      "Begin with a willing heart. The Church walks with you into transformation through teaching, prayer, and sacramental preparation.",
  },
  {
    question: "What if my family is not Orthodox?",
    answer:
      "You are still welcome. Many catechumens come from different backgrounds. The Church offers a pastoral, patient path.",
  },
  {
    question: "How long does catechism last?",
    answer:
      "It varies by parish and readiness. The goal is not speed, but a stable foundation for covenant life.",
  },
  {
    question: "Do I have to become Ethiopian to join?",
    answer:
      "No. The Ethiopian Orthodox Tewahedo Church receives all who desire the apostolic faith and commit to the covenant life.",
  },
]

const catechismCourses = [
  "Orthodox Faith Course — St. Paul American Coptic Orthodox Church (Houston, TX)",
  "Orthodox Hymns Course — St. Paul American Coptic Orthodox Church (Houston, TX)",
]

const booksNewToChristianity = ["Thirsting for God in a Land of Shallow Wells — Matthew Gallatin"]

const booksCatechism = [
  "Introduction to the Coptic Orthodox Church — Fr. Tadros Malaty",
  "Orthodox Thought and Instruction: In the Orthodox Church — Fr. Tadros Malaty",
  "The Orthodox Concept: Tradition and Orthodoxy — Fr. Tadros Malaty",
  "The Seven Sacraments: The Catechism of the Coptic Orthodox Church (Book III) — Fr. Tadros Malaty",
  "Coptic Christology Past and Present — Fr. Tadros Malaty",
  "God: The Coptic Orthodox Church & The Dogmas — Fr. Tadros Malaty",
  "The Coptic Orthodox Church & The Dogmas: Alexandria and Christian Dogmas — Fr. Tadros Malaty",
]

const booksUnderstandingOrthodoxy = [
  "Becoming Orthodox: A Journey to the Ancient Christian Faith — Fr. Peter Gillquist",
  "Two Thousand Years of Coptic Christianity — Otto F. A. Meinardus",
  "Comparative Theology (Free PDF) — H.H. Pope Shenouda III",
  "For the Life of the World: Sacraments and Orthodoxy — Alexander Schmemann",
  "Salvation in the Orthodox Concept (Free PDF) — H.H. Pope Shenouda III",
  "The Inner Kingdom — Bishop Kallistos Ware",
  "The Faith: Understanding Orthodox Christianity — Clark Carlton",
  "The Orthodox Faith (Free PDF) — SUS Diocese compilation",
  "The Orthodox Church — Timothy Ware",
]

const booksLearningCopticOrthodoxy = [
  "Introduction to the Coptic Orthodox Church (Free PDF) — Fr. Tadros Malaty",
  "Understanding the Liturgy (Free PDF) — Fr. Athanasius Iskander",
]

const booksSpiritualGrowth = [
  "Beginning to Pray — Anthony Bloom",
  "Orthodox Prayer Life: The Interior Way — Matthew the Poor",
]

const booksMarriageFamily = [
  "Preserve Them, O Lord — Fr. John Mack",
  "Two Become One: An Orthodox Christian Guide to Engagement and Marriage — Fr. Antonios Kaldas",
  "Parenting Toward the Kingdom: Orthodox Principles of Child-Rearing — Philip Mamalakis",
  "Blueprints for the Little Church: Creating an Orthodox Home — Elissa Bjeletich and Caleb Shoemaker",
  "Bringing Up Girls — James Dobson",
  "Bringing Up Boys — James Dobson",
]

const articlesAndHomilies = [
  "Discovering Orthodoxy (Fr. Peter Farrington)",
  "Spiritual Journey to Orthodoxy",
  "Orthodox Catechesis",
  "Why do I need to be baptized?",
  "Orthodox Way of Prayer",
  "Orthodox Way of Prayer – Silence",
  "Developing a Prayer Rule",
  "What about icons?",
  "An Introduction to Orthodoxy – Bishops",
  "The Virgin Mary and Orthodoxy",
  "Liturgical Worship and Orthodoxy (Part 1 | Part 2)",
  "Hyper-grace is no Grace",
]

const earlyChurchDocuments = [
  "Guide to Early Church Documents",
  "Early Church Fathers",
  "The Church Fathers",
  "St. Pachomius Library",
  "Apostolic Canons",
]

export default function CatechumenPage() {
  return (
    <div className="bg-gradient-to-b from-amber-50/90 via-orange-50/40 to-amber-50/80 dark:from-stone-950 dark:via-orange-950/20 dark:to-stone-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_top,rgba(255,235,204,0.45),transparent_60%)]" />
        <div className="absolute inset-0 bg-[url('/patterns/manuscript-border.svg')] opacity-10" />
        <div className="container mx-auto px-4 py-16 md:py-20 relative">
          <div className="max-w-4xl">
            <GeezHeading className="mb-3 text-orange-700 dark:text-amber-400">መንገድ ወደ ኪዳን</GeezHeading>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-600/80 dark:text-amber-300/80">
              🕊️ Catechumen Corner
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4">
              Learning to Live the Covenant
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-4">
              In the Ethiopian Orthodox Tewahedo Church, catechism is not informational. It is sacramental preparation.
              It is entering the Covenant — with humility, discipline, and pastoral care.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                <Link href="#journey">Begin the Journey</Link>
              </Button>
              <Button asChild variant="outline" className="border-amber-400/60 text-orange-700 dark:text-amber-300">
                <Link href="#before-visit">Before I Visit a Church</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Is a Catechumen */}
      <section id="journey" className="py-14 border-y border-amber-200/50 dark:border-orange-900/40">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <GeezHeading className="mb-3 text-orange-700 dark:text-amber-400">መምህራን</GeezHeading>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">What Is a Catechumen?</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                A catechumen is a seeker who is being formed by the Church for baptism and chrismation, walking with the
                community toward sacramental life.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white/80 dark:bg-stone-900/70 border-amber-200/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-amber-400">
                    <ScrollText className="h-5 w-5" /> Scripture Foundations
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                  Acts 2 and Matthew 28:19–20 show the apostolic pattern: preaching, teaching, repentance, and baptism.
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-stone-900/70 border-amber-200/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-amber-400">
                    <ShieldCheck className="h-5 w-5" /> Early Church Tradition
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                  The early Church honored a period of formation so inquirers could receive the faith with clarity,
                  discipline, and spiritual maturity.
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-stone-900/70 border-amber-200/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-amber-400">
                    <Flame className="h-5 w-5" /> Preparation for the Mysteries
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700 dark:text-gray-300">
                  Catechism prepares the soul for baptism and chrismation so the sacramental life begins with repentance
                  and stability.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* The Five Steps of Entering the Covenant */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-[url('/patterns/ethiopian-cross-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <GeezHeading className="mb-3 text-orange-700 dark:text-amber-400">ኪዳን መግባት</GeezHeading>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">The Five Steps of Entering the Covenant</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-2xl mx-auto">
              This path is not a module system. It is a formation journey that moves from belief into worship, discipline,
              communion, and full integration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {covenantSteps.map((step) => (
              <Card key={step.title} className="bg-white/85 dark:bg-stone-900/70 border-amber-200/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-amber-400">
                    <step.icon className="h-5 w-5" /> {step.title}
                  </CardTitle>
                  <p className="text-sm text-orange-600/80 dark:text-amber-300/80">{step.subtitle}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300">{step.description}</p>
                  <div className="mt-4">
                    <Link className="text-sm font-medium text-orange-700 dark:text-amber-300" href={step.href}>
                      Continue this step
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Foundation */}
      <section id="foundation" className="py-16 bg-gradient-to-b from-amber-50/70 to-orange-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">The Foundation: Dogma & Theology</h3>
            <p className="text-gray-700 mt-2">
              The Ethiopian Orthodox Tewahedo faith transmits doctrine with reverence, clarity, and humility. This is
              where the catechumen learns the core mysteries of salvation.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">The Five Pillars of Mystery (Amistu Aemade Mistirat)</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  Mystery of the Holy Trinity, Incarnation (Tewahedo), Baptism, Holy Eucharist, and Resurrection — each
                  taught with Scripture, patristic witness, and EOTC explanation.
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">The Creed (Tselote Haymanot)</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  A line-by-line catechesis of the Nicene-Constantinopolitan Creed, with Ge’ez, English translation, and
                  commentary for each phrase.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Worship */}
      <section id="worship" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">The Ark of Worship: Liturgy & Praxis</h3>
            <p className="text-gray-700 mt-2">
              The catechumen moves from observer to participant, learning the rhythm and beauty of the Divine Liturgy.
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Sacred Space</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  Learn about the Tabot, the three divisions of the church (Kine Mahlet, Kidist, Makdas), why the altar is
                  hidden, and why the church faces East.
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Divine Liturgy (Kidassie)</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  A step-by-step walkthrough: when to bow, use hand-crosses, why incense rises, and how St. Yared’s hymns
                  guide worship.
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Seven Canonical Hours (Sa’atat)</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  Introduction to the Book of Hours with a gentle morning and evening routine for beginners.
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild variant="outline" className="border-amber-400/60 text-orange-700">
                <a href="/resources/first-liturgy-guide.pdf" download>
                  First Liturgy Guide (PDF)
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Discipline */}
      <section id="discipline" className="py-16 bg-gradient-to-b from-orange-50/40 to-amber-50/60">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">The Path of Discipline: Fasting & Feasts</h3>
            <p className="text-gray-700 mt-2">
              Orthodoxy is rhythmic. The calendar shapes the soul through fasting, feasts, and daily remembrance.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Official Fasts</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  Why we fast 250+ days, including Abiye Tsom, Tsome Hawariat, the Fast of Nineveh, and weekly Wednesdays
                  and Fridays.
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Feasts & the Ethiopian Calendar</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  The 33 feasts of the Theotokos, Meskel, Timkat, Genna, Fasika, and the meaning of the 13-month calendar.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Saints */}
      <section id="saints" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">The Communion of Saints</h3>
            <p className="text-gray-700 mt-2">
              The catechumen learns to live within the cloud of witnesses, asking for intercession without confusion or
              fear.
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Kidane Meheret</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  The Covenant of Mercy and the role of St. Mary, explained carefully within Orthodox theology.
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Angels & Ethiopian Saints</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  St. Michael, St. Gabriel, Abune Tekle Haymanot, Abune Gebre Menfes Kidus, and more.
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Choosing a Patron Saint</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  Guidance on baptismal names, their meanings, and the relationship of prayer and protection.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section id="integration" className="py-16 bg-gradient-to-b from-amber-50/60 to-orange-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">The Life of the Spirit: Penance & Integration</h3>
            <p className="text-gray-700 mt-2">
              This is the sacred entrance into the fold: confession, baptism, and the covenant life in daily practice.
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">The Spiritual Father (Yenefs Abat)</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  Why no Orthodox Christian walks alone, how confession works, and how to approach a priest with humility.
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Baptism & Chrismation</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  What to wear, the meaning of the Mateb, white garments, and the theology of rebirth.
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Ethical Living (Fetha Negest Foundations)</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  Marriage, modesty, charity, and family life presented as covenantal — not legalistic.
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Is Orthodoxy for Me? */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">Is Orthodoxy for Me?</h3>
            <p className="text-gray-700 mt-2">
              A gentle reflection area for inquirers who want ancient Christianity, sacramental life, and spiritual
              transformation.
            </p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <Compass className="h-5 w-5" /> Quiet Self-Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  Consider: Do you desire ancient Christianity? Do you want sacramental life? Are you ready for spiritual
                  discipline? Are you willing to be transformed, not just informed?
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <DoorOpen className="h-5 w-5" /> First Steps Guide
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  A gentle guide that introduces prayer, liturgy, and the first conversations with a priest.
                  <div className="mt-4">
                    <Button asChild variant="outline" className="border-amber-400/60 text-orange-700">
                      <a href="/resources/first-steps-toward-orthodoxy.pdf" download>
                        Download "First Steps Toward Orthodoxy" (PDF)
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Before I Visit */}
      <section id="before-visit" className="py-16 bg-gradient-to-b from-orange-50/40 to-amber-50/60">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">Before I Visit a Church…</h3>
            <p className="text-gray-700 mt-2">
              Practical, respectful guidance that reduces fear and confusion before your first visit.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">What to Expect</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  What to wear, why there are no pews in many parishes, why we venerate icons, and why catechumens do not
                  receive the Eucharist yet.
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">How to Speak with a Priest</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  "Abba, I am interested in learning about Orthodoxy. How can I begin the catechumen process?"
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Find a Church */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <GeezHeading className="mb-3 text-orange-700 dark:text-amber-400">ቤተ ክርስቲያን</GeezHeading>
              <h3 className="text-2xl font-bold text-gray-900">Find a Church Near You</h3>
              <p className="text-gray-700 mt-2">
                Locate a parish and introduce yourself. The Church is ready to receive your questions with patience.
              </p>
            </div>
            <ChurchLocator />
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-16 bg-gradient-to-b from-amber-50/70 to-orange-50/40">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">Catechumen Checklist</h3>
            <p className="text-gray-700 mt-2">
              A gentle progress tracker. These are not achievements, but steps of readiness.
            </p>
            <div className="mt-6 grid gap-3">
              {catechumenChecklist.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 bg-white/80 border border-amber-200/60 rounded-lg px-4 py-3"
                >
                  <input type="checkbox" className="h-4 w-4 accent-orange-600" />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Prayer */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">Prayer for Catechumens</h3>
            <p className="text-gray-700 mt-2">
              Lord Jesus Christ, guide those who seek Your covenant. Grant repentance, illumination, and peace through
              the prayers of the Theotokos and all the saints.
            </p>
            <div className="mt-4">
              <Button variant="outline" className="border-amber-400/60 text-orange-700">
                Light a Candle for Catechumens
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-16 bg-gradient-to-b from-orange-50/40 to-amber-50/60">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-orange-700 mb-4">
              <HelpCircle className="h-5 w-5" />
              <h3 className="text-2xl font-bold text-gray-900">Common Questions for Catechumens</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {commonQuestions.map((item) => (
                <Card key={item.question} className="border-amber-200/60">
                  <CardHeader>
                    <CardTitle className="text-orange-700">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-700">{item.answer}</CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900">Cathecuminal Corner Resource Center</h3>
            <p className="text-gray-700 mt-2">
              If you are unfamiliar with the Orthodox Church, do not feel overwhelmed. These resources are organized for
              steady self-study and catechumen formation.
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">What Every Catechumen Should Know</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  Orthodox doctrine, Holy Tradition, liturgy, fasting rhythm, prayer rule, sacraments, repentance, and
                  spiritual fatherhood.
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Core Formation Path</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  Start with Scripture and catechism texts, attend liturgy consistently, establish daily prayer, and
                  prepare for confession and baptism/chrismation.
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Practical Church Life</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  How to approach clergy, why catechumens do not commune yet, reverence for icons, feast/fast discipline,
                  and building an Orthodox home.
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Self-Study Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {catechismCourses.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">New to Christianity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {booksNewToChristianity.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Catechism</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {booksCatechism.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Understanding Orthodoxy</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {booksUnderstandingOrthodoxy.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Learning About the Coptic Orthodox Church</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {booksLearningCopticOrthodoxy.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Spiritual Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {booksSpiritualGrowth.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Marriage and Family Life</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {booksMarriageFamily.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Articles and Homilies</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {articlesAndHomilies.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <Card className="border-amber-200/60">
                <CardHeader>
                  <CardTitle className="text-orange-700">Early Church Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {earlyChurchDocuments.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <p className="text-xs text-gray-400 mt-6">This site is created and managed by Fr. Jerome Maximous. All rights reserved.</p>
          </div>
        </div>
      </section>

      {/* Mentor */}
      <section className="py-16 bg-gradient-to-r from-orange-900 via-amber-900 to-orange-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <GeezHeading className="mb-3 text-amber-300">እርዳታ</GeezHeading>
            <h3 className="text-2xl md:text-3xl font-bold">Request a Catechumen Mentor</h3>
            <p className="text-amber-100 mt-3">
              If you are ready for guidance, we can help you connect with a priest or mentor who will walk with you.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="bg-white text-orange-800 hover:bg-amber-100">
                <Link href="/contact">Request a Mentor</Link>
              </Button>
              <Button asChild variant="outline" className="border-white/70 text-white">
                <Link href="/qa">Submit a Private Question</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
