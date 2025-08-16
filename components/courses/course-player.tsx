"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Download,
  FileText,
  MessageCircle,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

interface CoursePlayerProps {
  courseId: string
  currentLessonId?: string
}

// Mock course data with lessons
const mockCourseData = {
  id: "1",
  title: "Introduction au Marketing Digital",
  instructor: "Marie Dubois",
  totalLessons: 15,
  completedLessons: 3,
  progress: 20,
  curriculum: [
    {
      id: "section-1",
      title: "Introduction au Marketing Digital",
      lessons: [
        {
          id: "lesson-1",
          title: "Qu'est-ce que le marketing digital ?",
          duration: "12:30",
          videoUrl: "/placeholder-video.mp4",
          isCompleted: true,
          resources: [
            { id: "1", name: "Introduction au Marketing Digital.pdf", type: "pdf", size: "2.3 MB" },
            { id: "2", name: "Checklist Marketing.docx", type: "doc", size: "1.1 MB" },
          ],
          transcript: "Bienvenue dans ce cours sur le marketing digital...",
        },
        {
          id: "lesson-2",
          title: "Les différents canaux digitaux",
          duration: "15:45",
          videoUrl: "/placeholder-video.mp4",
          isCompleted: true,
          resources: [{ id: "3", name: "Canaux Digitaux - Guide.pdf", type: "pdf", size: "3.2 MB" }],
          transcript: "Dans cette leçon, nous allons explorer les différents canaux...",
        },
        {
          id: "lesson-3",
          title: "Définir vos objectifs marketing",
          duration: "18:20",
          videoUrl: "/placeholder-video.mp4",
          isCompleted: true,
          resources: [{ id: "4", name: "Template Objectifs SMART.xlsx", type: "excel", size: "0.8 MB" }],
          transcript: "Définir des objectifs clairs est essentiel...",
        },
      ],
    },
    {
      id: "section-2",
      title: "Stratégie de Contenu",
      lessons: [
        {
          id: "lesson-4",
          title: "Créer un calendrier éditorial",
          duration: "25:10",
          videoUrl: "/placeholder-video.mp4",
          isCompleted: false,
          resources: [
            { id: "5", name: "Template Calendrier Editorial.xlsx", type: "excel", size: "1.5 MB" },
            { id: "6", name: "Exemples de Contenus.pdf", type: "pdf", size: "2.8 MB" },
          ],
          transcript: "Un calendrier éditorial vous aide à planifier...",
        },
        {
          id: "lesson-5",
          title: "Types de contenu efficaces",
          duration: "30:15",
          videoUrl: "/placeholder-video.mp4",
          isCompleted: false,
          resources: [{ id: "7", name: "Guide Types de Contenu.pdf", type: "pdf", size: "4.1 MB" }],
          transcript: "Il existe plusieurs types de contenu que vous pouvez créer...",
        },
      ],
    },
  ],
  discussions: [
    {
      id: "1",
      user: "Jean Dupont",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "2024-01-15T10:30:00Z",
      lessonId: "lesson-1",
      message: "Excellente introduction ! J'ai une question sur les KPIs mentionnés.",
      replies: [
        {
          id: "1-1",
          user: "Marie Dubois",
          avatar: "/placeholder.svg?height=40&width=40",
          timestamp: "2024-01-15T11:00:00Z",
          message:
            "Merci Jean ! Les KPIs seront détaillés dans la leçon 5. En attendant, vous pouvez consulter le PDF joint.",
          isInstructor: true,
        },
      ],
    },
    {
      id: "2",
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      timestamp: "2024-01-15T14:20:00Z",
      lessonId: "lesson-2",
      message: "Très utile ! Pouvez-vous recommander des outils pour automatiser ces processus ?",
      replies: [],
    },
  ],
  notes: [
    {
      id: "1",
      lessonId: "lesson-1",
      timestamp: "05:30",
      content: "Important : Le marketing digital inclut tous les canaux numériques",
      createdAt: "2024-01-15T10:45:00Z",
    },
    {
      id: "2",
      lessonId: "lesson-2",
      timestamp: "08:15",
      content: "Les 4 piliers : SEO, SEM, Social Media, Email Marketing",
      createdAt: "2024-01-15T11:20:00Z",
    },
  ],
}

export function CoursePlayer({ courseId, currentLessonId }: CoursePlayerProps) {
  const { user } = useAuth()
  const [currentLesson, setCurrentLesson] = useState<any>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [newNote, setNewNote] = useState("")
  const [newDiscussion, setNewDiscussion] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  const course = mockCourseData

  // Find current lesson
  useEffect(() => {
    if (currentLessonId) {
      for (const section of course.curriculum) {
        const lesson = section.lessons.find((l) => l.id === currentLessonId)
        if (lesson) {
          setCurrentLesson({ ...lesson, sectionTitle: section.title })
          break
        }
      }
    } else {
      // Default to first lesson
      const firstLesson = course.curriculum[0]?.lessons[0]
      if (firstLesson) {
        setCurrentLesson({ ...firstLesson, sectionTitle: course.curriculum[0].title })
      }
    }
  }, [currentLessonId])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleLessonComplete = () => {
    if (currentLesson) {
      // Mark lesson as completed
      console.log("Lesson completed:", currentLesson.id)
      // Move to next lesson
      const nextLesson = getNextLesson()
      if (nextLesson) {
        setCurrentLesson(nextLesson)
      }
    }
  }

  const getNextLesson = () => {
    // Find next lesson logic
    for (let i = 0; i < course.curriculum.length; i++) {
      const section = course.curriculum[i]
      const lessonIndex = section.lessons.findIndex((l) => l.id === currentLesson?.id)
      if (lessonIndex !== -1) {
        if (lessonIndex < section.lessons.length - 1) {
          return { ...section.lessons[lessonIndex + 1], sectionTitle: section.title }
        } else if (i < course.curriculum.length - 1) {
          return { ...course.curriculum[i + 1].lessons[0], sectionTitle: course.curriculum[i + 1].title }
        }
      }
    }
    return null
  }

  const getPreviousLesson = () => {
    // Find previous lesson logic
    for (let i = 0; i < course.curriculum.length; i++) {
      const section = course.curriculum[i]
      const lessonIndex = section.lessons.findIndex((l) => l.id === currentLesson?.id)
      if (lessonIndex !== -1) {
        if (lessonIndex > 0) {
          return { ...section.lessons[lessonIndex - 1], sectionTitle: section.title }
        } else if (i > 0) {
          const prevSection = course.curriculum[i - 1]
          return { ...prevSection.lessons[prevSection.lessons.length - 1], sectionTitle: prevSection.title }
        }
      }
    }
    return null
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      console.log("Adding note:", {
        lessonId: currentLesson?.id,
        timestamp: formatTime(currentTime),
        content: newNote,
      })
      setNewNote("")
    }
  }

  const handleAddDiscussion = () => {
    if (newDiscussion.trim()) {
      console.log("Adding discussion:", {
        lessonId: currentLesson?.id,
        message: newDiscussion,
      })
      setNewDiscussion("")
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const downloadResource = (resource: any) => {
    console.log("Downloading resource:", resource.name)
    // Implement download logic
  }

  const extractYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : ""
  }

  const extractVimeoId = (url: string): string => {
    const regExp = /vimeo.com\/(\d+)/
    const match = url.match(regExp)
    return match ? match[1] : ""
  }

  if (!currentLesson) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/courses/${courseId}`} className="text-blue-400 hover:text-blue-300">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold">{course.title}</h1>
              <p className="text-sm text-gray-400">Par {course.instructor}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              {course.completedLessons}/{course.totalLessons} leçons
            </div>
            <Progress value={course.progress} className="w-32 h-2" />
            <Link href={`/courses/${courseId}/quiz/quiz-1`}>
              <Button
                size="sm"
                variant="outline"
                className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white bg-transparent"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Quiz
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-gray-400 hover:text-white"
            >
              {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Video Area */}
        <div className={`flex-1 flex flex-col ${showSidebar ? "lg:mr-96" : ""}`}>
          {/* Video Player */}
          <div className="relative bg-black flex-1 flex items-center justify-center">
            <div className="w-full h-full max-w-4xl mx-auto relative">
              {currentLesson?.videoUrl?.includes("youtube.com") || currentLesson?.videoUrl?.includes("youtu.be") ? (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeId(currentLesson.videoUrl)}?autoplay=1&controls=1`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : currentLesson?.videoUrl?.includes("vimeo.com") ? (
                <iframe
                  src={`https://player.vimeo.com/video/${extractVimeoId(currentLesson.videoUrl)}?autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <Play className="w-8 h-8 text-white ml-1" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{currentLesson?.title}</h3>
                    <p className="text-gray-400">Durée: {currentLesson?.duration}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls - only show for non-embedded videos */}
            {!currentLesson?.videoUrl?.includes("youtube.com") && !currentLesson?.videoUrl?.includes("vimeo.com") && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="space-y-2">
                  {/* Progress Bar */}
                  <div className="flex items-center space-x-2 text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <Progress value={(currentTime / duration) * 100} className="flex-1 h-1" />
                    <span>{formatTime(duration)}</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentLesson(getPreviousLesson())}
                        disabled={!getPreviousLesson()}
                        className="text-white hover:bg-white/20"
                      >
                        <SkipBack className="w-5 h-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handlePlayPause}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCurrentLesson(getNextLesson())}
                        disabled={!getNextLesson()}
                        className="text-white hover:bg-white/20"
                      >
                        <SkipForward className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleMute} className="text-white hover:bg-white/20">
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleFullscreen}
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Lesson Info */}
          <div className="bg-gray-800 p-6 border-t border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{currentLesson.title}</h2>
                <p className="text-gray-400">{currentLesson.sectionTitle}</p>
              </div>
              <div className="flex items-center space-x-2">
                {currentLesson.isCompleted ? (
                  <Badge className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Terminé
                  </Badge>
                ) : (
                  <Button onClick={handleLessonComplete} className="bg-blue-600 hover:bg-blue-700">
                    Marquer comme terminé
                  </Button>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentLesson(getPreviousLesson())}
                disabled={!getPreviousLesson()}
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Leçon précédente
              </Button>
              <Button
                onClick={() => setCurrentLesson(getNextLesson())}
                disabled={!getNextLesson()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Leçon suivante
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-4 bg-gray-700 rounded-none">
                <TabsTrigger value="overview" className="text-xs">
                  Aperçu
                </TabsTrigger>
                <TabsTrigger value="resources" className="text-xs">
                  Ressources
                </TabsTrigger>
                <TabsTrigger value="notes" className="text-xs">
                  Notes
                </TabsTrigger>
                <TabsTrigger value="discussions" className="text-xs">
                  Discussion
                </TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="overview" className="h-full overflow-y-auto p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Contenu du cours</h3>
                    <div className="space-y-2">
                      {course.curriculum.map((section) => (
                        <div key={section.id} className="space-y-1">
                          <h4 className="text-sm font-medium text-gray-300">{section.title}</h4>
                          {section.lessons.map((lesson) => (
                            <button
                              key={lesson.id}
                              onClick={() => setCurrentLesson({ ...lesson, sectionTitle: section.title })}
                              className={`w-full text-left p-2 rounded text-sm hover:bg-gray-700 flex items-center space-x-2 ${
                                currentLesson?.id === lesson.id ? "bg-blue-600" : ""
                              }`}
                            >
                              {lesson.isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              ) : (
                                <div className="w-4 h-4 border border-gray-500 rounded-full flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="truncate">{lesson.title}</div>
                                <div className="text-xs text-gray-400">{lesson.duration}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="h-full overflow-y-auto p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Ressources de la leçon</h3>
                    <div className="space-y-2">
                      {currentLesson.resources?.map((resource: any) => (
                        <div key={resource.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-blue-400" />
                            <div>
                              <div className="text-sm font-medium">{resource.name}</div>
                              <div className="text-xs text-gray-400">{resource.size}</div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => downloadResource(resource)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-gray-600"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Transcription</h3>
                    <div className="p-3 bg-gray-700 rounded-lg text-sm text-gray-300 leading-relaxed">
                      {currentLesson.transcript}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="h-full overflow-y-auto p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Mes notes</h3>
                    <div className="space-y-3 mb-4">
                      <Textarea
                        placeholder="Ajouter une note à ce moment de la vidéo..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Button onClick={handleAddNote} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Ajouter note ({formatTime(currentTime)})
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {course.notes
                        .filter((note) => note.lessonId === currentLesson.id)
                        .map((note) => (
                          <div key={note.id} className="p-3 bg-gray-700 rounded-lg">
                            <div className="flex items-center space-x-2 mb-2">
                              <Clock className="w-4 h-4 text-blue-400" />
                              <span className="text-sm text-blue-400">{note.timestamp}</span>
                            </div>
                            <p className="text-sm">{note.content}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="discussions" className="h-full overflow-y-auto p-4 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Discussion</h3>
                    <div className="space-y-3 mb-4">
                      <Textarea
                        placeholder="Poser une question ou partager un commentaire..."
                        value={newDiscussion}
                        onChange={(e) => setNewDiscussion(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <Button onClick={handleAddDiscussion} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Publier
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {course.discussions
                        .filter((discussion) => discussion.lessonId === currentLesson.id)
                        .map((discussion) => (
                          <div key={discussion.id} className="space-y-3">
                            <div className="flex items-start space-x-3">
                              <img
                                src={discussion.avatar || "/placeholder.svg"}
                                alt={discussion.user}
                                className="w-8 h-8 rounded-full"
                              />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="text-sm font-medium">{discussion.user}</span>
                                  <span className="text-xs text-gray-400">
                                    {new Date(discussion.timestamp).toLocaleDateString("fr-FR")}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-300">{discussion.message}</p>
                              </div>
                            </div>
                            {discussion.replies?.map((reply) => (
                              <div key={reply.id} className="ml-8 flex items-start space-x-3">
                                <img
                                  src={reply.avatar || "/placeholder.svg"}
                                  alt={reply.user}
                                  className="w-6 h-6 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-sm font-medium">{reply.user}</span>
                                    {reply.isInstructor && (
                                      <Badge className="text-xs bg-blue-600 hover:bg-blue-700">Formateur</Badge>
                                    )}
                                    <span className="text-xs text-gray-400">
                                      {new Date(reply.timestamp).toLocaleDateString("fr-FR")}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-300">{reply.message}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
