"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Bell, X } from "lucide-react"

interface PaymentNotification {
  id: string
  type: "success" | "pending" | "failed" | "refund"
  title: string
  message: string
  amount?: number
  courseName?: string
  timestamp: string
  read: boolean
}

interface PaymentNotificationsProps {
  notifications: PaymentNotification[]
  onMarkAsRead: (id: string) => void
  onDismiss: (id: string) => void
}

export function PaymentNotifications({ notifications, onMarkAsRead, onDismiss }: PaymentNotificationsProps) {
  const [visibleNotifications, setVisibleNotifications] = useState<PaymentNotification[]>([])

  useEffect(() => {
    setVisibleNotifications(notifications.filter((n) => !n.read))
  }, [notifications])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "refund":
        return <CheckCircle className="w-5 h-5 text-blue-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500 bg-green-50"
      case "failed":
        return "border-l-red-500 bg-red-50"
      case "pending":
        return "border-l-yellow-500 bg-yellow-50"
      case "refund":
        return "border-l-blue-500 bg-blue-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const handleMarkAsRead = (notification: PaymentNotification) => {
    onMarkAsRead(notification.id)
    setVisibleNotifications((prev) => prev.filter((n) => n.id !== notification.id))
  }

  const handleDismiss = (notification: PaymentNotification) => {
    onDismiss(notification.id)
    setVisibleNotifications((prev) => prev.filter((n) => n.id !== notification.id))
  }

  if (visibleNotifications.length === 0) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm">
      {visibleNotifications.slice(0, 3).map((notification) => (
        <Card
          key={notification.id}
          className={`border-l-4 shadow-lg animate-in slide-in-from-right-full duration-300 ${getNotificationColor(notification.type)}`}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{notification.title}</h4>
                    <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                    {notification.amount && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          ${notification.amount}
                        </Badge>
                        {notification.courseName && (
                          <span className="text-xs text-gray-600">{notification.courseName}</span>
                        )}
                      </div>
                    )}
                    <p className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString("fr-FR")}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDismiss(notification)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" onClick={() => handleMarkAsRead(notification)} className="text-xs h-7 px-3">
                    Marquer comme lu
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {visibleNotifications.length > 3 && (
        <Card className="border-l-4 border-l-gray-500 bg-gray-50 shadow-lg">
          <CardContent className="p-3 text-center">
            <p className="text-sm text-gray-600">+{visibleNotifications.length - 3} autres notifications</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
