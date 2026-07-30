import { notFound } from "next/navigation"
import RealTalkClient from "./real-talk-client"

// ─── Types (shared) ───────────────────────────────────────────────────────────

export type BodySection = {
  heading: string
  text: string
}

export type RealTalkTopic = {
  slug: string
  emoji: string
  title: string
  subtitle: string
  color: string
  borderColor: string
  bgColor: string
  openingLine: string
  body: BodySection[]
  scripture: { reference: string; text: string }
  reflectionQ: string
  prayer: string
  nextSteps: { label: string; href: string; external?: boolean }[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const REAL_TALK_DATA: Record<string, RealTalkTopic> = {
  tempted: {
    slug: "tempted",
    emoji: "⚔️",
    title: "I keep falling into the same sin",
    subtitle: "The Church calls this passion. It is not who you are.",
    color: "rose",
    borderColor: "border-rose-500",
    bgColor: "bg-rose-50 dark:bg-rose-950/20",
    openingLine: "You are not your worst moment. Not even close.",
    body: [
      {
        heading: "What the Church says",
        text: "The Fathers call repeated sin a 'passion' — a habit of the soul, not a sentence. Saints like Moses the Black, Mary of Egypt, and Cyprian were famous sinners before they were famous saints. Their fall was not the final word. The Tewahedo tradition does not pretend that holiness is for people who never struggled. It was built by people who struggled so hard that the struggle itself became their testimony.",
      },
      {
        heading: "Why willpower alone won't work",
        text: "Trying to stop by willpower alone is like fighting fire with your hands. The ancient remedy is substitution: replace the moment of temptation with something holy. The Jesus Prayer, physical movement, cold water, calling someone who knows you — these interrupt the pattern before it completes. You are not trying to be strong. You are trying to redirect the energy somewhere holy before it reaches the moment of choice.",
      },
      {
        heading: "The most important thing you can do today",
        text: "Go to confession. Not tomorrow. The longer you carry the shame alone, the heavier it becomes, and shame is the enemy of return. The priest is not there to judge you — he is a witness that God has already decided to forgive. After confession, fast the next available day. Fasting weakens bodily passions. This is ancient technology, not theory. The Fathers tested it in the desert for centuries.",
      },
    ],
    scripture: {
      reference: "Romans 7:15",
      text: "I do not understand what I do. For what I want to do, I do not do. But what I hate, I do.",
    },
    reflectionQ: "What is the specific moment — the trigger — right before you fall? Name it honestly.",
    prayer:
      "Lord Jesus Christ, Son of God, have mercy on me, a sinner. I am tired of fighting alone. I bring this to You — not because I deserve mercy, but because You promised it. Help me take one step toward the light today. Just one. Amen.",
    nextSteps: [
      { label: "Prepare for Confession", href: "/repentance" },
      { label: "Read about St. Mary of Egypt", href: "/saints" },
      { label: "Start the Silence Plan", href: "/youth-corner/plans/silence-in-a-loud-world" },
    ],
  },

  doubting: {
    slug: "doubting",
    emoji: "🤔",
    title: "I'm losing my faith",
    subtitle: "Doubt is not the opposite of faith. It is the beginning of honest faith.",
    color: "violet",
    borderColor: "border-violet-500",
    bgColor: "bg-violet-50 dark:bg-violet-950/20",
    openingLine: "If you are doubting, you are taking your faith seriously enough to question it.",
    body: [
      {
        heading: "The Church is not afraid of your questions",
        text: "The desert fathers had doubt. The Psalms are full of doubt. 'My God, my God, why have you forsaken me?' was not asked by a pagan — it was prayed by the Son of God on the Cross. Your doubt is not outside of Christianity. It is inside it. The Ethiopian Orthodox tradition has survived centuries of theological pressure, empire, invasion, and isolation precisely because its foundation is not feelings but sacrament, tradition, and the living body of the Church.",
      },
      {
        heading: "The difference between doubt and disbelief",
        text: "Doubt says: I want to believe but I cannot see clearly right now. Disbelief says: I have decided not to believe. One is a prayer. The other is a conclusion. If you are doubting, you have not concluded — you are still searching. That is exactly where God meets people. The father in the Gospels said 'I believe; help my unbelief.' That one sentence contains the whole honest spiritual life. You are allowed to pray it too.",
      },
      {
        heading: "What to do in a season of doubt",
        text: "Don't stop the physical practice. Keep fasting, keep attending liturgy, keep saying the prayers even if they feel empty. The Church's sacramental life is not dependent on your feelings in the moment. Faith is a muscle. You exercise it even when you are sore. The structure of the Church — Liturgy, fasting calendar, saints' days, the Psalter — exists precisely so that you have something to hold onto when the feeling disappears. Hold onto the structure while the feeling returns.",
      },
    ],
    scripture: {
      reference: "Mark 9:24",
      text: "Immediately the father of the child cried out and said, 'I believe; help my unbelief!'",
    },
    reflectionQ: "What specific thing are you struggling to believe? Name it — don't hide it in vague language.",
    prayer:
      "God, if You are real, meet me here. I am not sure what I believe right now. But I am here. And I am asking. If this is enough — take it. I am not pretending to have more than this. But I am not walking away. Amen.",
    nextSteps: [
      { label: "Ask a Question on Telegram", href: "https://t.me/johnsrepentance", external: true },
      { label: "Study Plan: 7 Days of Prayer", href: "/youth-corner/plans/7-days-of-prayer" },
      { label: "Read the Saints", href: "/saints" },
    ],
  },

  empty: {
    slug: "empty",
    emoji: "🌫️",
    title: "I feel like God is far away",
    subtitle: "Feelings about God's presence are not evidence of God's presence.",
    color: "sky",
    borderColor: "border-sky-500",
    bgColor: "bg-sky-50 dark:bg-sky-950/20",
    openingLine: "You are not spiritually dead. You are spiritually tired.",
    body: [
      {
        heading: "What the Fathers call spiritual dryness",
        text: "The desert tradition names this experience: akedia, desolation, the 'dark night.' It is so common that the entire book of Psalms is built around it. The Psalmist moves between 'The Lord is my shepherd' and 'My God, my God, why have You forsaken me?' in the same collection. Spiritual dryness is not a sign that you have done something wrong or that God has left. It is a season. Every serious Christian you admire went through it. The Fathers treated it like spiritual weather, not spiritual failure.",
      },
      {
        heading: "Why God sometimes feels distant",
        text: "Sometimes God allows dryness so that we discover whether we love Him or only love the feeling of Him. When the consolation is removed, what remains? If you find yourself still showing up — still praying, still fasting, still choosing the right thing — even without the feeling, you are discovering that your faith is real. The feeling was never the foundation. It was only the sunlight. The root grows in the dark.",
      },
      {
        heading: "What to do when prayer feels like talking to the ceiling",
        text: "Pray anyway. Pray short. The Fathers say: when prayer is dry, don't try to manufacture emotion. Say the Jesus Prayer. Light a candle. Read one Psalm slowly. Put your body in posture — kneel, face East, make the Sign of the Cross — and let the body carry the prayer when the heart cannot. The dryness will pass. It always has. God is closer than your breath, whether you feel it or not.",
      },
    ],
    scripture: {
      reference: "Psalm 22:1",
      text: "My God, my God, why have you forsaken me? Why are you so far from saving me?",
    },
    reflectionQ: "When was the last time you felt close to God? What were the conditions of your life then?",
    prayer:
      "Lord, I cannot feel You right now. And I am not going to pretend. But I am still here, which means something in me believes You are here too. Come close. Not when I deserve it — now. I am tired of the distance. Amen.",
    nextSteps: [
      { label: "Silence Plan: 5 Days", href: "/youth-corner/plans/silence-in-a-loud-world" },
      { label: "Study Plan: Psalms", href: "/youth-corner/plans/psalms-for-hard-days" },
      { label: "5-min Prayer", href: "/youth-corner/quick-prayer" },
    ],
  },

  ashamed: {
    slug: "ashamed",
    emoji: "😔",
    title: "I'm ashamed and don't know how to come back",
    subtitle: "The prodigal son got up before he reached the father. You just got up.",
    color: "amber",
    borderColor: "border-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    openingLine: "Shame lies. It tells you that you are the exception to God's mercy.",
    body: [
      {
        heading: "What shame does to the soul",
        text: "Shame is not the same as guilt. Guilt says: what I did was wrong. Shame says: I am wrong. Guilt can lead you to the door of confession. Shame makes you feel like you don't deserve to knock. The enemy uses shame to keep you outside the house, convinced that you are the one case where God's mercy does not apply. This is a lie. The entire sacrament of confession exists as God's formal, institutional answer to the accusation that you are too far gone.",
      },
      {
        heading: "The prodigal son did not wait until he was clean",
        text: "He was still in the foreign country, still smelling of the pig farm, when he decided to get up. He did not clean himself up first. He did not write a speech. He got up and started walking. The father ran to meet him while he was 'still a great way off.' God does not wait for you to complete your transformation before He moves toward you. He moves the moment you turn your face toward home. The direction of your face is what He is watching.",
      },
      {
        heading: "How to come back",
        text: "You do not need to feel worthy. Worthiness is not the requirement — honesty is. Go to your confessor. If you do not have one, find one. Say the thing you cannot say out loud. The sacrament does not require that you have already changed; it is the starting place of change. After confession, receive the Eucharist at the next available Liturgy. The Body and Blood of Christ is not a reward for the clean — it is medicine for the sick. You qualify.",
      },
    ],
    scripture: {
      reference: "Luke 15:20",
      text: "But while he was still a great way off, his father saw him and had compassion, and ran and fell on his neck and kissed him.",
    },
    reflectionQ: "What would you say to a friend who came to you with the same shame you are carrying right now?",
    prayer:
      "Father, I have been in the far country. I have wasted things I cannot recover. I am not coming back because I deserve it — I am coming back because I have nowhere else to go, and because something in me still believes the door is open. Meet me on the road. Amen.",
    nextSteps: [
      { label: "Prepare for Confession", href: "/repentance" },
      { label: "6 Days of Returning", href: "/youth-corner/plans/returning-to-god" },
      { label: "Ask on Telegram", href: "https://t.me/johnsrepentance", external: true },
    ],
  },

  heavy: {
    slug: "heavy",
    emoji: "😔",
    title: "My heart feels heavy",
    subtitle: "Grief, pressure, and sorrow are not signs that God has abandoned you.",
    color: "indigo",
    borderColor: "border-indigo-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    openingLine: "Heaviness of heart is not a spiritual failure. It is a human reality that the Psalms never ignored.",
    body: [
      {
        heading: "God does not require you to be okay",
        text: "The Psalms — which are the prayer book of the Church — are saturated with lament. 'Out of the depths I cry to You.' 'My soul is overwhelmed with sorrow.' 'How long, O Lord?' These are not the prayers of weak people. They are the prayers of people who were honest with God about how hard things were. The Ethiopian Orthodox tradition is not a tradition of forced cheerfulness. It is a tradition of people who have prayed through slavery, exile, and famine, and found God present in the weight of it all.",
      },
      {
        heading: "Carrying weight is not the same as being abandoned",
        text: "Christ said 'Come to me, all who are weary and burdened.' He did not say 'Come to me when you are sorted out.' He said come with the weight. He did not promise to remove every hardship immediately. He promised presence. 'I am with you always.' When the heaviness comes, it is not proof that He left. It is an invitation to discover that He is present even in it. The Cross is the theology of God inside human suffering, not God absent from it.",
      },
      {
        heading: "What to do when you are carrying too much",
        text: "Tell someone. The Church has confession for a reason — not only for sin, but for the weight we carry that we were never meant to carry alone. Tell your confessor. Tell a trusted friend who prays. Bring the weight to the Liturgy and let the incense carry it. Prostrate yourself and let the physical act of lowering yourself before God be the prayer when words have run out. The weight was never yours alone to carry.",
      },
    ],
    scripture: {
      reference: "Matthew 11:28",
      text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    },
    reflectionQ: "What is the heaviest thing you are carrying right now that you have not said out loud to anyone?",
    prayer:
      "Lord, I am carrying something today that is too heavy for me. I don't have beautiful words. I just have this weight, and I am laying it at Your feet. You said You would give rest. I am asking for it now. Not tomorrow. Now. Amen.",
    nextSteps: [
      { label: "5-min Prayer", href: "/youth-corner/quick-prayer" },
      { label: "7 Days of Prayer", href: "/youth-corner/plans/7-days-of-prayer" },
      { label: "Ask on Telegram", href: "https://t.me/johnsrepentance", external: true },
    ],
  },

  restless: {
    slug: "restless",
    emoji: "😤",
    title: "I can't be still — my mind won't stop",
    subtitle: "The fathers called this 'logismoi' — the unstillable thoughts. They had a cure.",
    color: "orange",
    borderColor: "border-orange-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    openingLine: "Your restlessness is not a character flaw. It is a symptom of a malnourished soul in an overstimulated world.",
    body: [
      {
        heading: "What the Fathers called logismoi",
        text: "The desert monks coined a word for what you are experiencing: logismoi — intrusive thoughts, restless mental energy, the mind that cannot settle. They did not treat this as a personal failure. They treated it as something that happens to the soul when it has consumed too much noise and not enough silence. The modern version of logismoi is a mind that has been fed on notifications, social media, and constant input, and now cannot find its own stillness. This is treatable. The Fathers developed specific technology for it over 1,700 years.",
      },
      {
        heading: "The Jesus Prayer as a tether",
        text: "The ancient cure for an untethered mind is a short, repeated prayer that anchors the attention. 'Lord Jesus Christ, Son of God, have mercy on me, a sinner.' You say it with each breath — inhale on the first half, exhale on the second. This is not mindless repetition. It is the Name acting as a tether on a runaway mind. Each time you notice your thoughts have drifted, you do not fight them. You simply return to the Name. The practice is the return, not the staying. Over time, the mind learns a new default.",
      },
      {
        heading: "The physical practice that breaks the cycle",
        text: "When the mind is completely scattered, go to the body. Cold water on the face. Three slow prostrations. A walk outside. Breathe in for four counts, hold for four, exhale for four. The body and the mind are connected — the desert fathers knew this and used the body to quiet the soul. When the logismoi come, they said: don't engage them, don't argue with them, don't analyze them. Ignore them and return to the Name. You are not trying to empty your mind. You are trying to fill it with Something better.",
      },
    ],
    scripture: {
      reference: "Psalm 46:10",
      text: "Be still and know that I am God.",
    },
    reflectionQ: "What are the top two or three thoughts that keep returning when you try to be still? Name them.",
    prayer:
      "Lord, my mind is loud right now and I cannot quiet it myself. I give You the chaos. Not when it's tidied up — now, as it is. Be the stillness I cannot manufacture. Breathe in me what I cannot breathe on my own. Lord Jesus Christ, Son of God, have mercy on me, a sinner. Amen.",
    nextSteps: [
      { label: "Silence Plan: 5 Days", href: "/youth-corner/plans/silence-in-a-loud-world" },
      { label: "Quick Prayer: Night", href: "/youth-corner/quick-prayer#night" },
      { label: "7 Days of Prayer", href: "/youth-corner/plans/7-days-of-prayer" },
    ],
  },
}

// ─── Static params (server) ────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(REAL_TALK_DATA).map((slug) => ({ topic: slug }))
}

// ─── Page (server component) ───────────────────────────────────────────────────

export default function RealTalkPage({ params }: { params: { topic: string } }) {
  const data = REAL_TALK_DATA[params.topic]
  if (!data) notFound()
  return <RealTalkClient data={data} />
}
