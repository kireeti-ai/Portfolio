"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Send, Mail, MapPin, Phone, Linkedin, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ProfileContent } from "@/lib/portfolio-types"

interface ContactSectionProps {
  profile: ProfileContent
}

export function ContactSection({ profile }: ContactSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")
    setSubmitSuccess("")
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        throw new Error(result?.error || "Failed to send message. Please try again.")
      }

      setIsSubmitted(true)
      setSubmitSuccess("Message sent successfully.")
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong. Please try again."
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: "bg-[#6366F1]",
      external: false,
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s+/g, "")}`,
      color: "bg-[#2F81F7]",
      external: false,
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      value: profile.linkedinUrl.replace(/^https?:\/\/(www\.)?/, ""),
      href: profile.linkedinUrl,
      color: "bg-[#0077B5]",
      external: true,
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: profile.location,
      href: "#",
      color: "bg-[#FF6B7A]",
      external: false,
    },
  ]

  return (
    <section id="contact" className="py-16 md:py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Get in <span className="bg-[#FF6B7A] text-white px-3 py-1 inline-block">Touch</span>
            </h2>
            <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.external ? "_blank" : undefined}
                  rel={info.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 bg-white border-[3px] border-black rounded-2xl hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className={`w-12 h-12 ${info.color} rounded-full flex items-center justify-center text-white border-2 border-black`}>
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 font-medium">{info.label}</div>
                    <div className="text-lg font-bold text-[#0B0B0B]">{info.value}</div>
                  </div>
                </motion.a>
              ))}

              <motion.div
                className="mt-8 p-6 bg-[#FFC224] border-[3px] border-black rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h4 className="text-xl font-bold mb-2">Open for Opportunities</h4>
                <p className="text-[#393939]">
                  {profile.opportunitiesText}
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="bg-white border-[3px] border-black rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-[3px] border-black rounded-xl px-4 h-14 text-base focus:ring-2 focus:ring-[#6366F1]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold mb-2">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border-[3px] border-black rounded-xl px-4 h-14 text-base focus:ring-2 focus:ring-[#6366F1]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-bold mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border-[3px] border-black rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-[#6366F1] resize-none"
                      required
                    />
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-black text-white hover:bg-gray-800 rounded-xl py-6 text-lg font-bold h-auto"
                      disabled={isSubmitted || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Send className="w-5 h-5 mr-2 animate-pulse" />
                          Sending...
                        </>
                      ) : isSubmitted ? (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Message Sent!
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>

                    {submitSuccess && (
                      <div className="flex items-center gap-2 text-green-700 font-medium pt-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>{submitSuccess}</span>
                      </div>
                    )}

                    {submitError && (
                      <div className="flex items-center gap-2 text-red-600 font-medium pt-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>{submitError}</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
