import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

// Messages de motivation par étape
const MOTIVATION_MESSAGES = {
  course_started: [
    "🎉 Félicitations ! Vous avez commencé votre parcours d'apprentissage !",
    "🚀 Excellent début ! Continuez sur cette lancée !",
    "💪 Bravo pour avoir franchi le premier pas !",
  ],
  lesson_completed: [
    "✨ Superbe ! Une leçon de plus dans votre parcours !",
    "🎯 Vous progressez à merveille ! Continuez ainsi !",
    "🌟 Chaque leçon vous rapproche de votre objectif !",
  ],
  quiz_passed: [
    "🏆 Excellent score ! Votre travail porte ses fruits !",
    "🎊 Bravo ! Vous maîtrisez parfaitement le sujet !",
    "💯 Fantastique ! Vous êtes sur la bonne voie !",
  ],
  course_completed: [
    "🎓 Félicitations ! Vous avez terminé le cours avec succès !",
    "🏅 Incroyable ! Un nouveau cours complété !",
    "🌈 Bravo ! Vous venez d'enrichir vos compétences !",
  ],
  streak_milestone: [
    "🔥 Impressionnant ! Vous maintenez une excellente régularité !",
    "⚡ Votre constance est remarquable ! Continuez !",
    "🎯 Votre discipline est inspirante ! Bravo !",
  ],
}

// Messages de rappel d'étude
const REMINDER_MESSAGES = [
  "📚 Il est temps de reprendre vos études ! Vos cours vous attendent.",
  "🎯 N'oubliez pas vos objectifs d'apprentissage ! Continuez votre formation.",
  "💡 Quelques minutes d'étude aujourd'hui peuvent faire la différence !",
  "🌟 Votre parcours d'apprentissage vous attend ! Reprenez là où vous vous êtes arrêté.",
  "📖 Maintenez votre élan ! Continuez à apprendre et à grandir.",
]

export async function POST() {
  try {
    const supabase = createClient()

    // Récupérer les utilisateurs inactifs (pas d'activité depuis 3 jours)
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    const { data: inactiveUsers, error: usersError } = await supabase
      .from("user_profiles")
      .select("user_id, email, full_name")
      .eq("user_type", "student")
      .lt("last_activity", threeDaysAgo.toISOString())

    if (usersError) {
      console.error("Erreur lors de la récupération des utilisateurs inactifs:", usersError)
      return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
    }

    // Créer des notifications de rappel pour les utilisateurs inactifs
    const reminderNotifications =
      inactiveUsers?.map((user) => ({
        user_id: user.user_id,
        type: "reminder",
        title: "Rappel d'étude",
        message: REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)],
        metadata: { reminder_type: "inactivity", days_inactive: 3 },
      })) || []

    if (reminderNotifications.length > 0) {
      const { error: insertError } = await supabase.from("notifications").insert(reminderNotifications)

      if (insertError) {
        console.error("Erreur lors de la création des rappels:", insertError)
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      reminders_sent: reminderNotifications.length,
    })
  } catch (error) {
    console.error("Erreur API reminders:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

// Fonction utilitaire pour créer une notification de motivation
export async function createMotivationNotification(
  userId: string,
  achievementType: keyof typeof MOTIVATION_MESSAGES,
  metadata: any = {},
) {
  const supabase = createClient()

  const messages = MOTIVATION_MESSAGES[achievementType]
  const message = messages[Math.floor(Math.random() * messages.length)]

  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    type: "motivation",
    title: "Message de motivation",
    message,
    metadata: { achievement_type: achievementType, ...metadata },
  })

  if (error) {
    console.error("Erreur lors de la création de la notification de motivation:", error)
  }
}
