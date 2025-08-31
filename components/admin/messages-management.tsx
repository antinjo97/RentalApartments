"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare, Mail, Phone, Search, Eye, Check, ChevronDown, ChevronUp, Reply, Trash2 } from "lucide-react"
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
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [adminName, setAdminName] = useState("")
  const [isSendingReply, setIsSendingReply] = useState(false)

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

  // Send reply to message
  const sendReply = async (messageId: string) => {
    if (!replyMessage.trim()) return
    
    setIsSendingReply(true)
    
    try {
      const response = await fetch(`/api/messages/${messageId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          replyMessage: replyMessage.trim(),
          adminName: adminName.trim() || 'Admin tim'
        }),
      })

      if (response.ok) {
        const result = await response.json()
        
        // Reset form
        setReplyMessage("")
        setReplyingTo(null)
        
        // Refresh messages
        onMessageUpdate()
        
        // Close the message if it's open
        setOpenMessages(prev => {
          const newSet = new Set(prev)
          newSet.delete(messageId)
          return newSet
        })
        
        // Show success message
        alert('Odgovor uspješno poslan!')
      } else {
        const errorData = await response.json()
        console.error('Failed to send reply:', errorData)
        alert(`Greška: ${errorData.error || 'Nepoznata greška'}`)
      }
    } catch (error) {
      console.error('Error sending reply:', error)
      alert(`Greška: ${error instanceof Error ? error.message : 'Nepoznata greška'}`)
    } finally {
      setIsSendingReply(false)
    }
  }

  // Delete message
  const deleteMessage = async (messageId: string) => {
    if (confirm('Jeste li sigurni da želite obrisati ovu poruku? Ova akcija se ne može poništiti.')) {
      try {
        const response = await fetch(`/api/messages/${messageId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          // Refresh messages from database
          onMessageUpdate()
          
          // Close the message if it's open
          setOpenMessages(prev => {
            const newSet = new Set(prev)
            newSet.delete(messageId)
            return newSet
          })
          
          alert('Poruka uspješno obrisana!')
        } else {
          const errorData = await response.json()
          alert(`Greška: ${errorData.error || 'Nepoznata greška'}`)
        }
      } catch (error) {
        console.error('Error deleting message:', error)
        alert(`Greška: ${error instanceof Error ? error.message : 'Nepoznata greška'}`)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t("messagesManagementTitle")}</h1>
            <p className="text-muted-foreground">{t("messagesManagementSubtitle")}</p>
          </div>
          {statusCounts.unread > 0 && (
            <Badge variant="destructive" className="text-lg px-4 py-2 animate-pulse w-full sm:w-auto text-center">
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
            <div className="flex flex-wrap gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
                className={`text-xs sm:text-sm ${statusCounts.unread > 0 ? "relative" : ""}`}
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
                className={`text-xs sm:text-sm ${statusCounts.unread > 0 ? "relative" : ""}`}
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
                className="text-xs sm:text-sm"
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
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-lg">{message.name}</CardTitle>
                      {!message.is_read && (
                        <Badge variant="default" className="animate-pulse bg-red-500 hover:bg-red-600">
                          {t("unread")}
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
                  <div className="flex flex-wrap gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleMessage(message.id)}
                          className="w-full sm:w-auto"
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
                            className="w-full sm:w-auto"
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
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      {/* Reply Button */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setReplyingTo(message.id)}
                            className="w-full sm:w-auto"
                          >
                            <Reply className="mr-2 h-4 w-4" />
                            {t("reply")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Odgovori na poruku</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Vaše ime:</label>
                              <Input
                                placeholder="Unesite vaše ime"
                                value={adminName}
                                onChange={(e) => setAdminName(e.target.value)}
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium">Odgovor:</label>
                              <Textarea
                                placeholder="Unesite vaš odgovor..."
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                rows={6}
                              />
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end gap-2">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setReplyingTo(null)
                                  setReplyMessage("")
                                  setAdminName("")
                                }}
                                className="w-full sm:w-auto"
                              >
                                Odustani
                              </Button>
                              <Button
                                onClick={() => sendReply(message.id)}
                                disabled={isSendingReply || !replyMessage.trim()}
                                className="w-full sm:w-auto"
                              >
                                {isSendingReply ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                                    Slanje...
                                  </>
                                ) : (
                                  'Pošalji odgovor'
                                )}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Delete Button */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteMessage(message.id)}
                        className="w-full sm:w-auto"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Obriši
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
