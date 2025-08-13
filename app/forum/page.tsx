"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Users, TrendingUp, Search, Plus, Pin, Lock, Eye, Filter } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Mock forum data
const forumCategories = [
  {
    id: "general",
    name: "Discussions Générales",
    description: "Discussions ouvertes sur l'apprentissage et l'éducation",
    icon: "💬",
    topics: 156,
    posts: 1247,
    lastPost: {
      title: "Conseils pour rester motivé",
      author: "Marie Dubois",
      timestamp: "2024-01-20T10:30:00Z",
    },
  },
  {
    id: "marketing",
    name: "Marketing Digital",
    description: "Échanges sur les stratégies et outils marketing",
    icon: "📈",
    topics: 89,
    posts: 567,
    lastPost: {
      title: "Nouvelles tendances SEO 2024",
      author: "Jean Dupont",
      timestamp: "2024-01-20T09:15:00Z",
    },
  },
  {
    id: "tech",
    name: "Développement Web",
    description: "Questions techniques et partage de code",
    icon: "💻",
    topics: 134,
    posts: 892,
    lastPost: {
      title: "React vs Vue.js en 2024",
      author: "Ahmed Hassan",
      timestamp: "2024-01-20T08:45:00Z",
    },
  },
  {
    id: "design",
    name: "Design & Créativité",
    description: "Inspiration et critiques constructives",
    icon: "🎨",
    topics: 67,
    posts: 423,
    lastPost: {
      title: "Outils de design gratuits",
      author: "Sarah Johnson",
      timestamp: "2024-01-19T16:20:00Z",
    },
  },
  {
    id: "career",
    name: "Carrière & Emploi",
    description: "Conseils professionnels et opportunités",
    icon: "💼",
    topics: 78,
    posts: 345,
    lastPost: {
      title: "Préparer un entretien technique",
      author: "Paul Martin",
      timestamp: "2024-01-19T14:30:00Z",
    },
  },
  {
    id: "help",
    name: "Aide & Support",
    description: "Questions sur l'utilisation de la plateforme",
    icon: "❓",
    topics: 45,
    posts: 234,
    lastPost: {
      title: "Problème de lecture vidéo",
      author: "Lisa Chen",
      timestamp: "2024-01-19T12:15:00Z",
    },
  },
]

const recentTopics = [
  {
    id: "1",
    title: "Comment créer une stratégie de contenu efficace ?",
    author: "Marie Dubois",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Marketing Digital",
    replies: 23,
    views: 156,
    lastReply: "2024-01-20T10:30:00Z",
    isPinned: true,
    isLocked: false,
    tags: ["stratégie", "contenu", "marketing"],
  },
  {
    id: "2",
    title: "Débuter avec React : par où commencer ?",
    author: "Jean Dupont",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Développement Web",
    replies: 45,
    views: 289,
    lastReply: "2024-01-20T09:15:00Z",
    isPinned: false,
    isLocked: false,
    tags: ["react", "débutant", "javascript"],
  },
  {
    id: "3",
    title: "Partage de ressources design gratuites",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Design & Créativité",
    replies: 12,
    views: 98,
    lastReply: "2024-01-20T08:45:00Z",
    isPinned: false,
    isLocked: false,
    tags: ["ressources", "gratuit", "design"],
  },
  {
    id: "4",
    title: "Reconversion professionnelle : vos expériences",
    author: "Ahmed Hassan",
    avatar: "/placeholder.svg?height=40&width=40",
    category: "Carrière & Emploi",
    replies: 67,
    views: 234,
    lastReply: "2024-01-19T16:20:00Z",
    isPinned: false,
    isLocked: false,
    tags: ["reconversion", "carrière", "expérience"],
  },
]

const forumStats = {
  totalTopics: 569,
  totalPosts: 3708,
  totalMembers: 1247,
  onlineMembers: 89,
}

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("categories")

  const filteredTopics = recentTopics.filter((topic) => topic.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Forum Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Forum Communautaire</h1>
              <p className="text-gray-600 mt-2">Échangez avec la communauté E-Classroom</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nouveau sujet
            </Button>
          </div>

          {/* Forum Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-900">{forumStats.totalTopics}</div>
                <div className="text-sm text-gray-600">Sujets</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-900">{forumStats.totalPosts}</div>
                <div className="text-sm text-gray-600">Messages</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-900">{forumStats.totalMembers}</div>
                <div className="text-sm text-gray-600">Membres</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{forumStats.onlineMembers}</div>
                <div className="text-sm text-gray-600">En ligne</div>
              </CardContent>
            </Card>
          </div>

          {/* Search Bar */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher dans le forum..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtrer
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-blue-100">
            <TabsTrigger value="categories">Catégories</TabsTrigger>
            <TabsTrigger value="recent">Récents</TabsTrigger>
            <TabsTrigger value="trending">Populaires</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid gap-4">
              {forumCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{category.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Link href={`/forum/category/${category.id}`}>
                            <h3 className="text-lg font-semibold text-blue-900 hover:text-blue-700">{category.name}</h3>
                          </Link>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{category.topics}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{category.posts}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Dernier message: <span className="font-medium">{category.lastPost.title}</span> par{" "}
                            <span className="text-blue-600">{category.lastPost.author}</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(category.lastPost.timestamp).toLocaleDateString("fr-FR")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="space-y-4">
            <div className="space-y-4">
              {filteredTopics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={topic.avatar || "/placeholder.svg"}
                        alt={topic.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              {topic.isPinned && <Pin className="w-4 h-4 text-blue-600" />}
                              {topic.isLocked && <Lock className="w-4 h-4 text-gray-500" />}
                              <Link href={`/forum/topic/${topic.id}`}>
                                <h3 className="text-lg font-semibold text-blue-900 hover:text-blue-700">
                                  {topic.title}
                                </h3>
                              </Link>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm text-gray-600">Par {topic.author}</span>
                              <Badge variant="outline" className="text-xs">
                                {topic.category}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {topic.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-600">
                            <div className="flex items-center space-x-4 mb-1">
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-4 h-4" />
                                <span>{topic.replies}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{topic.views}</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(topic.lastReply).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <div className="space-y-4">
              {recentTopics
                .sort((a, b) => b.views - a.views)
                .map((topic) => (
                  <Card key={topic.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-full">
                          <TrendingUp className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <Link href={`/forum/topic/${topic.id}`}>
                                <h3 className="text-lg font-semibold text-blue-900 hover:text-blue-700 mb-1">
                                  {topic.title}
                                </h3>
                              </Link>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm text-gray-600">Par {topic.author}</span>
                                <Badge variant="outline" className="text-xs">
                                  {topic.category}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                              <div className="flex items-center space-x-4 mb-1">
                                <div className="flex items-center space-x-1">
                                  <Eye className="w-4 h-4" />
                                  <span className="font-semibold text-orange-600">{topic.views}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <MessageCircle className="w-4 h-4" />
                                  <span>{topic.replies}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
