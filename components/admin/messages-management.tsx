"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { MessageSquare, Mail, Phone, Search, Eye, Check, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"
import type { ContactMessage } from "@/lib/types"
import { useI18n } from "@/lib/i18n/context"

interface MessagesManagementProps {
  messages: ContactMessage[]
  onMessageUpdate: () => void
}

export function MessagesManagement({ messages, onMessageUpdate }: MessagesManagementProps) {
  const { t } = useI18n()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "read" | "unread">("all")
  const [openMessages, setOpenMessages] = useState<Set<string>>(new Set())
  const [updatingMessages, setUpdatingMessages] = useState<Set<string>>(new Set())

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "read" && message.is_read) ||
      (statusFilter === "unread" && !message.is_read)

    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: messages.length,
    unread: messages.filter((m) => !m.is_read).length,
    read: messages.filter((m) => m.is_read).length,
  }

  // Toggle message open/close
  const toggleMessage = (messageId: string) => {
    setOpenMessages(prev => {
      const newSet = new Set(prev)
      if (newSet.has(messageId)) {
        newSet.delete(messageId)
      } else {
        newSet.add(messageId)
      }
      return newSet
    })
  }

  // Mark message as read
  const markAsRead = async (messageId: string) => {
    if (updatingMessages.has(messageId)) return
    
    setUpdatingMessages(prev => new Set(prev).add(messageId))
    
    try {
      const response = await fetch(`/api/messages/${messageId}/mark-read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        
        // Call the callback to refresh messages from database
        onMessageUpdate()
        
        // Also close the message if it's open
        setOpenMessages(prev => {
          const newSet = new Set(prev)
          newSet.delete(messageId)
          return newSet
        })
        
        // Show success message (you can add a toast notification here)
        // alert('Poruka označena kao pročitana!') // Commented out to avoid annoying alerts
      } else {
        const errorData = await response.json()
        console.error('Failed to mark message as read:', errorData)
        console.error(`Greška: ${errorData.error || 'Nepoznata greška'}`)
        // alert(`Greška: ${errorData.error || 'Nepoznata greška'}`) // Commented out to avoid annoying alerts
      }
    } catch (error) {
      console.error('Error marking message as read:', error)
      console.error(`Greška: ${error instanceof Error ? error.message : 'Nepoznata greška'}`)
      // alert(`Greška: ${error instanceof Error ? error.message : 'Nepoznata greška'}`) // Commented out to avoid annoying alerts
    } finally {
      setUpdatingMessages(prev => {
        const newSet = new Set(prev)
        newSet.delete(messageId)
        return newSet
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("messagesManagementTitle")}</h1>
            <p className="text-muted-foreground">{t("messagesManagementSubtitle")}</p>
          </div>
          {statusCounts.unread > 0 && (
            <Badge variant="destructive" className="text-lg px-4 py-2 animate-pulse">
              {statusCounts.unread} {t("unread")}
            </Badge>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchMessages")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
                className={statusCounts.unread > 0 ? "relative" : ""}
              >
                {t("allMessages")} ({statusCounts.all})
                {statusCounts.unread > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </Button>
              <Button
                variant={statusFilter === "unread" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("unread")}
                className={statusCounts.unread > 0 ? "relative" : ""}
              >
                {t("onlyUnread")} ({statusCounts.unread})
                {statusCounts.unread > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </Button>
              <Button
                variant={statusFilter === "read" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("read")}
              >
                {t("onlyRead")} ({statusCounts.read})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">{t("noMessages")}</p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card 
              key={message.id} 
              className={`transition-all duration-200 ${
                !message.is_read ? "border-l-4 border-l-primary" : ""
              } ${
                openMessages.has(message.id) ? "ring-2 ring-primary/20 shadow-lg" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      {!message.is_read && (
                        <Badge variant="default" className="animate-pulse bg-red-500 hover:bg-red-600">
                          {t("unread")}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        <span>{message.email}</span>
                      </div>
                      {message.phone && (
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{message.phone}</span>
                        </div>
                      )}
                      <span>{format(new Date(message.created_at), "dd.MM.yyyy HH:mm")}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleMessage(message.id)}
                        >
                          {openMessages.has(message.id) ? (
                            <ChevronUp className="mr-2 h-4 w-4" />
                          ) : (
                            <Eye className="mr-2 h-4 w-4" />
                          )}
                          {openMessages.has(message.id) ? t("close") : t("open")}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{openMessages.has(message.id) ? "Zatvori detalje poruke" : "Prikaži detalje poruke"}</p>
                      </TooltipContent>
                    </Tooltip>
                    {!message.is_read && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            size="sm"
                            onClick={() => markAsRead(message.id)}
                            disabled={updatingMessages.has(message.id)}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            {updatingMessages.has(message.id) ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                {t("loading")}
                              </>
                            ) : (
                              t("markAsRead")
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Označi poruku kao pročitanu</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </CardHeader>

              {openMessages.has(message.id) && (
                <CardContent className="transition-all duration-300 ease-in-out">
                  <div className="space-y-4">
                    {/* Subject */}
                    {message.subject && (
                      <div>
                        <h4 className="font-medium text-sm mb-1">{t("messageSubject")}:</h4>
                        <p className="text-sm">{message.subject}</p>
                      </div>
                    )}

                    {/* Message */}
                    <div>
                      <h4 className="font-medium text-sm mb-1">{t("messageContent")}:</h4>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        {t("reply")}
                      </Button>
                      <Button variant="outline" size="sm">
                        Arhiviraj / Archive
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
