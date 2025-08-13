"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Flag,
  Pin,
  Lock,
  Eye,
  Clock,
  ChevronLeft,
  Quote,
  Edit,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Mock topic data
const mockTopic = {
  id: "1",
  title: "Comment créer une stratégie de contenu efficace ?",
  author: "Marie Dubois",
  avatar: "/placeholder.svg?height=40&width=40",
  category: "Marketing Digital",
  createdAt: "2024-01-15T10:30:00Z",
  views: 156,
  replies: 23,
  isPinned: true,
  isLocked: false,
  tags: ["stratégie", "contenu", "marketing"],
  content: `Bonjour à tous !

Je travaille actuellement sur la création d'une stratégie de contenu pour mon entreprise et j'aimerais avoir vos retours d'expérience.

Voici les questions que je me pose :

1. **Fréquence de publication** : Combien de fois par semaine publiez-vous du contenu ?
2. **Types de contenu** : Quels formats fonctionnent le mieux pour vous (articles, vidéos, infographies) ?
3. **Mesure du ROI** : Comment mesurez-vous l'efficacité de votre contenu ?

J'ai déjà commencé à définir mes personas et mes objectifs, mais j'aimerais avoir des conseils pratiques de personnes qui ont déjà mis en place ce type de stratégie.

Merci d'avance pour vos réponses !`,
  likes: 15,
  dislikes: 2,
}

const mockReplies = [
  {
    id: "1",
    author: "Jean Dupont",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-15T11:15:00Z",
    content: `Excellente question Marie ! 

Pour répondre à tes questions :

**Fréquence** : Personnellement, je publie 3 fois par semaine - 2 articles de blog et 1 vidéo. L'important c'est la régularité plutôt que la quantité.

**Types de contenu** : Les vidéos courtes (2-3 min) ont le meilleur engagement chez moi, suivies des infographies. Les articles longs marchent bien pour le SEO.

**ROI** : J'utilise Google Analytics pour le trafic et des outils comme Hootsuite pour l'engagement social. Le plus important c'est de définir des KPIs clairs dès le début.`,
    likes: 8,
    dislikes: 0,
    isInstructor: false,
  },
  {
    id: "2",
    author: "Sophie Martin",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-15T14:30:00Z",
    content: `Je rejoins Jean sur l'importance de la régularité !

Quelques conseils supplémentaires :

- **Planification** : Utilise un calendrier éditorial, ça change la vie
- **Réutilisation** : Un bon article peut devenir une vidéo, une infographie, plusieurs posts sociaux
- **Interaction** : N'oublie pas de répondre aux commentaires, c'est crucial pour l'engagement

Tu as déjà fait le plus dur en définissant tes personas. Maintenant il faut tester et ajuster !`,
    likes: 12,
    dislikes: 1,
    isInstructor: true,
  },
  {
    id: "3",
    author: "Ahmed Hassan",
    avatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-16T09:20:00Z",
    content: `Super sujet ! 

J'ajouterais l'importance de l'analyse concurrentielle. Regarde ce que font tes concurrents :
- Quels sujets ils traitent
- Leurs formats préférés  
- Leur fréquence de publication
- L'engagement qu'ils génèrent

Ça peut t'donner de bonnes idées et t'aider à te différencier.

Pour les outils, je recommande BuzzSumo pour l'analyse de contenu et Canva pour les visuels.`,
    likes: 6,
    dislikes: 0,
    isInstructor: false,
  },
]

export default function TopicPage() {
  const params = useParams()
  const topicId = params.id as string
  const [newReply, setNewReply] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  const topic = mockTopic // In real app, fetch by topicId
  const replies = mockReplies

  const handleLike = (postId: string, isReply = false) => {
    console.log(`Liking ${isReply ? "reply" : "topic"} ${postId}`)
  }

  const handleDislike = (postId: string, isReply = false) => {
    console.log(`Disliking ${isReply ? "reply" : "topic"} ${postId}`)
  }

  const handleReply = () => {
    if (newReply.trim()) {
      console.log("Adding reply:", newReply)
      setNewReply("")
      setReplyingTo(null)
    }
  }

  const handleQuote = (content: string, author: string) => {
    const quotedText = `> ${content.split("\n").join("\n> ")}\n\n@${author} `
    setNewReply(quotedText)
    setReplyingTo(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/forum" className="hover:text-blue-600">
            Forum
          </Link>
          <span>/</span>
          <Link
            href={`/forum/category/${topic.category.toLowerCase().replace(" ", "-")}`}
            className="hover:text-blue-600"
          >
            {topic.category}
          </Link>
          <span>/</span>
          <span className="text-blue-600">{topic.title}</span>
        </div>

        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/forum">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Retour au forum
          </Link>
        </Button>

        {/* Topic Header */}
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {topic.isPinned && <Pin className="w-4 h-4 text-blue-600" />}
                  {topic.isLocked && <Lock className="w-4 h-4 text-gray-500" />}
                  <h1 className="text-2xl font-bold text-blue-900">{topic.title}</h1>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-2">
                    <img
                      src={topic.avatar || "/placeholder.svg"}
                      alt={topic.author}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>Par {topic.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(topic.createdAt).toLocaleDateString("fr-FR")}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{topic.views} vues</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{topic.replies} réponses</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{topic.category}</Badge>
                  {topic.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
                <Button variant="outline" size="sm">
                  <Flag className="w-4 h-4 mr-2" />
                  Signaler
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Original Post */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <img
                src={topic.avatar || "/placeholder.svg"}
                alt={topic.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  <h3 className="font-semibold text-blue-900">{topic.author}</h3>
                  <Badge variant="outline" className="text-xs">
                    Auteur
                  </Badge>
                  <span className="text-sm text-gray-500">{new Date(topic.createdAt).toLocaleDateString("fr-FR")}</span>
                </div>
                <div className="prose max-w-none mb-4">
                  <div className="whitespace-pre-wrap text-gray-700">{topic.content}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(topic.id)}
                      className="text-gray-600 hover:text-green-600"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {topic.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDislike(topic.id)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <ThumbsDown className="w-4 h-4 mr-1" />
                      {topic.dislikes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuote(topic.content, topic.author)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <Quote className="w-4 h-4 mr-1" />
                      Citer
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Replies */}
        <div className="space-y-4 mb-6">
          {replies.map((reply) => (
            <Card key={reply.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={reply.avatar || "/placeholder.svg"}
                    alt={reply.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-3">
                      <h4 className="font-semibold text-blue-900">{reply.author}</h4>
                      {reply.isInstructor && <Badge className="bg-blue-600 hover:bg-blue-700 text-xs">Formateur</Badge>}
                      <span className="text-sm text-gray-500">
                        {new Date(reply.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                    <div className="prose max-w-none mb-4">
                      <div className="whitespace-pre-wrap text-gray-700">{reply.content}</div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(reply.id, true)}
                        className="text-gray-600 hover:text-green-600"
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {reply.likes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDislike(reply.id, true)}
                        className="text-gray-600 hover:text-red-600"
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        {reply.dislikes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuote(reply.content, reply.author)}
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <Quote className="w-4 h-4 mr-1" />
                        Citer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reply Form */}
        {!topic.isLocked && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-blue-900">Répondre au sujet</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Écrivez votre réponse..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="min-h-32"
              />
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">Vous pouvez utiliser Markdown pour formater votre texte</div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setNewReply("")}>
                    Annuler
                  </Button>
                  <Button onClick={handleReply} className="bg-blue-600 hover:bg-blue-700">
                    Publier la réponse
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  )
}
