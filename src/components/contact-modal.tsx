"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Info, Globe, AlertTriangle, ArrowUpRight, ShieldCheck, User, Mail, Phone, Building2, PhilippinePeso, Zap, Calendar, BookOpen, Cpu, MoreHorizontal, MessageSquare, HelpCircle, AlertCircle } from "lucide-react";
import { createPortal } from "react-dom";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/b-combobox";
import { faqs } from "@/config/landing-data";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/r-select";
import { CarouselItem } from "@/components/ui/carousel";
import { Tooltip } from "@/components/ui/r-tooltip";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const TooltipIcon = ({ text }: { text: string }) => (
  <Tooltip content={text} side="top">
    <button type="button" className="flex items-center justify-center outline-none">
      <Info className="h-4 w-4 text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors" />
    </button>
  </Tooltip>
);

const IconContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-gradient-to-b from-[#2a2a2f] to-[#121214] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),_0_2px_8px_rgba(0,0,0,0.4)]">
    {children}
  </div>
);

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const SERVICE_OFFERS: Record<string, { title: string, desc: string }[]> = {
  "IT Services": [
    { title: "Website Development", desc: "Custom websites, landing pages, and e-commerce" },
    { title: "System Development", desc: "Enterprise software, CRM, and internal tools" },
    { title: "Hardware Development", desc: "Custom circuits, PCBs, and hardware integration" },
    { title: "Software Development", desc: "Desktop and cloud-based software applications" },
    { title: "Mobile App Development", desc: "iOS and Android mobile applications" },
    { title: "Game Development", desc: "2D/3D games, mechanics, and asset design" },
  ],
  "Thesis Services": [
    { title: "Research Proposal", desc: "Topic defense and proposal writing support" },
    { title: "Thesis Writing", desc: "Comprehensive chapter drafting and editing" },
    { title: "Data Statistics", desc: "Quantitative and qualitative data analysis" },
    { title: "Thesis Advising", desc: "Expert guidance and defense preparation" },
    { title: "Thesis Consultation", desc: "1-on-1 review and formatting assistance" },
  ],
  "Engineering Services": [
    { title: "Embedded System", desc: "Microcontroller programming and firmware" },
    { title: "Machine Learning", desc: "Predictive models and data intelligence" },
    { title: "Robotics", desc: "Automated systems and mechanical design" },
    { title: "Electronics", desc: "Circuit design, testing, and prototyping" },
    { title: "Electrical Design", desc: "Power systems and wiring schematics" },
    { title: "3D Modeling", desc: "CAD designs and prototype rendering" },
    { title: "Artificial Intelligence", desc: "Custom AI solutions and integrations" },
    { title: "Prototyping", desc: "Rapid MVP builds and physical testing" },
    { title: "Internet of Things", desc: "Smart devices and cloud connectivity" },
  ],
  "Other Services": [
    { title: "Seminars & Webinars", desc: "Tech talks and digital training events" },
    { title: "Trainings & Workshops", desc: "Hands-on developer and engineering labs" },
  ],
};

const REVERSE_MAP: Record<string, { cat: string, off: string }> = {
  "Thesis Documentation": { cat: "Thesis Services", off: "Thesis Writing" },
  "Seminars & Trainings": { cat: "Other Services", off: "Trainings & Workshops" },
  "Website Development": { cat: "IT Services", off: "Website Development" },
  "Engineering Services": { cat: "Engineering Services", off: "" },
  "Software Applications": { cat: "IT Services", off: "Software Development" },
  "Game Development": { cat: "IT Services", off: "Game Development" },
  "General Inquiry": { cat: "General Inquiry", off: "" }
};

export function ContactModal({ isOpen, onClose, defaultService = "General Inquiry" }: ContactModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [startDateValue, setStartDateValue] = useState<Date | undefined>(undefined);
  const [selectedFaq, setSelectedFaq] = useState<typeof faqs[number] | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    specificOffer: "",
    startDate: "",
    budget: "",
    urgency: "",
    details: "",
  });

  const totalSteps = 3;

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      
      let initialCategory = defaultService;
      let initialOffer = "";
      if (REVERSE_MAP[defaultService]) {
        initialCategory = REVERSE_MAP[defaultService].cat;
        initialOffer = REVERSE_MAP[defaultService].off;
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: initialCategory,
        specificOffer: initialOffer,
        startDate: "",
        budget: "",
        urgency: "",
        details: "",
      });
      setCurrentStep(1);
      setIsSuccess(false);
      setErrors({});
      setStartDateValue(undefined);
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen, defaultService]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleServiceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, service: value, specificOffer: "" }));
    if (errors.service) setErrors(prev => ({ ...prev, service: "" }));
  };

  const handleDateChange = (date: Date) => {
    setStartDateValue(date);
    handleChange("startDate", format(date, "E, MMM d, yyyy"));
  };

  const handleNext = () => {
    setErrors({});
    let newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Please enter your full name.";
      if (!formData.email.trim() || !formData.email.includes("@")) newErrors.email = "Please enter a valid email address.";
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.service) newErrors.service = "Please select a service category.";
      if (SERVICE_OFFERS[formData.service] && !formData.specificOffer) newErrors.specificOffer = "Please select a specific offer.";
      if (!startDateValue) newErrors.startDate = "Please select a target start date.";
      if (!formData.urgency) newErrors.urgency = "Please select the project urgency.";
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!formData.details.trim()) newErrors.details = "Please provide some project details or requirements.";
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
      handleSubmit();
    }
  };

  const handleBack = () => {
    setErrors({});
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  if (!mounted) return null;

  const getInputClasses = (hasError: boolean) => {
    if (hasError) {
      return "pl-10 bg-red-950/10 border-red-500/50 text-red-100 placeholder:text-red-500/50 focus-visible:ring-red-500/20 shadow-[inset_0_1px_0_rgba(239,68,68,0.1),0_1px_3px_rgba(0,0,0,0.5)] transition-all";
    }
    return "pl-10 bg-zinc-900/80 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_3px_rgba(0,0,0,0.5)] transition-all";
  };

  const getSelectClasses = (hasError: boolean) => {
    if (hasError) {
      return "!bg-red-950/10 !border-red-500/50 !text-red-100 shadow-[inset_0_1px_0_rgba(239,68,68,0.1),0_1px_3px_rgba(0,0,0,0.5)] focus:ring-red-500/20 transition-all data-[state=open]:border-red-500/30 !h-10 !min-h-10 !px-3 !py-2 !rounded-md";
    }
    return "!bg-zinc-900/80 !border-zinc-700/50 !text-zinc-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_3px_rgba(0,0,0,0.5)] focus:ring-emerald-500/20 transition-all data-[state=open]:border-emerald-500/30 !h-10 !min-h-10 !px-3 !py-2 !rounded-md";
  };

  const getTextareaClasses = (hasError: boolean) => {
    if (hasError) {
      return "bg-red-950/10 border-red-500/50 text-red-100 placeholder:text-red-500/50 focus-visible:ring-red-500/20 shadow-[inset_0_1px_0_rgba(239,68,68,0.1),0_1px_3px_rgba(0,0,0,0.5)] transition-all resize-none";
    }
    return "bg-zinc-900/80 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_3px_rgba(0,0,0,0.5)] transition-all resize-none";
  };

  // Decide MultiStepForm title & description depending on currentStep
  let stepTitle = "Contact Information";
  let stepDescription = "Tell us who you are so we can reach back to you.";
  if (currentStep === 2) {
    stepTitle = "Select Service & Start Date";
    stepDescription = "Choose the service you're interested in and your target timeline.";
  } else if (currentStep === 3) {
    stepTitle = "Tell Us About Your Project";
    stepDescription = "Provide specific details to help us understand your requirements.";
  }

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-black/60 backdrop-blur-md overscroll-none" data-lenis-prevent>
          {/* Backdrop Click */}
          <div className="fixed inset-0 -z-10" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[700px] bg-zinc-950/95 border border-zinc-800 rounded-2xl shadow-2xl overflow-visible"
          >
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-center p-8 sm:p-12 min-h-[400px]"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-100 mb-2">Inquiry Submitted!</h3>
                  <p className="text-zinc-400 max-w-sm text-sm">
                    Thank you for reaching out to PRIMA. We've received your details and will review them shortly. A mentor will contact you via email soon!
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-8 px-6 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium transition-colors text-sm border border-zinc-700"
                  >
                    Close Window
                  </button>
                </motion.div>
              ) : (
                <MultiStepForm
                  key="form"
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  stepTitles={["Contact Info", "Service Details", "Project Scope"]}
                  title={stepTitle}
                  description={stepDescription}
                  onBack={handleBack}
                  onNext={handleNext}
                  onClose={onClose}
                  nextButtonText={currentStep === 3 ? (isSubmitting ? "Submitting..." : "Submit Inquiry") : "Next Step"}
                  className="border-0 bg-transparent text-zinc-100 shadow-none"
                  footerContent={
                    <Popover>
                      <PopoverTrigger 
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800/80 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all shadow-[inset_0_1px_0_rgba(255,255,255,0.05),_0_2px_4px_rgba(0,0,0,0.3)] outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50"
                        aria-label="Need Help"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </PopoverTrigger>
                      <PopoverContent 
                        side="top" 
                        align="start" 
                        sideOffset={8}
                        className="w-80 sm:w-96 !bg-zinc-950 !border-zinc-800 !text-zinc-100 shadow-[0_12px_40px_rgba(0,0,0,0.7)] rounded-xl border p-4 z-50 flex flex-col gap-3 font-sans"
                      >
                        {/* Popover Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-zinc-850">
                          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Support & FAQs</span>
                        </div>

                        {/* Searchable Combobox */}
                        <div className="w-full">
                          <Combobox
                            itemToStringLabel={(item: any) => item ? item.title : ""}
                            itemToStringValue={(item: any) => item ? item.id : ""}
                            items={faqs}
                            onValueChange={(val: any) => setSelectedFaq(val)}
                            value={selectedFaq}
                          >
                            <ComboboxInput 
                              placeholder="Search FAQs..." 
                              className="!bg-zinc-900/60 !border-zinc-800/80 !text-zinc-100 shadow-inner !h-9 !rounded-md"
                            />
                            <ComboboxContent className="!bg-zinc-950 !border-zinc-800 !text-zinc-100 shadow-2xl !rounded-lg max-h-48 z-[9999]">
                              <ComboboxList className="p-1">
                                {(faq: any, index: number) => (
                                  <ComboboxItem
                                    index={index}
                                    key={faq.id}
                                    value={faq}
                                    className="!text-xs py-2 px-2.5 hover:bg-zinc-900 rounded-md transition-colors cursor-pointer text-zinc-300 data-[highlighted]:bg-zinc-900 data-[highlighted]:text-zinc-100"
                                  >
                                    {faq.title}
                                  </ComboboxItem>
                                )}
                              </ComboboxList>
                              <ComboboxEmpty className="text-xs text-zinc-500 py-3 text-center">No matches found.</ComboboxEmpty>
                            </ComboboxContent>
                          </Combobox>
                        </div>

                        {/* Answer Area */}
                        <div className="min-h-[60px] flex flex-col justify-center">
                          <AnimatePresence mode="wait">
                            {selectedFaq ? (
                              <motion.div
                                key={selectedFaq.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.15 }}
                                className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-900 text-xs text-zinc-300 leading-relaxed"
                              >
                                <p className="font-semibold text-zinc-200 mb-1">{selectedFaq.title}</p>
                                <p className="text-zinc-400">{selectedFaq.content}</p>
                              </motion.div>
                            ) : (
                              <div className="text-center py-4 text-xs text-zinc-500 italic border border-dashed border-zinc-850 rounded-lg">
                                Search or select a question above.
                              </div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Direct Support Footer */}
                        <div className="pt-2 border-t border-zinc-850 flex items-center justify-between text-[11px] text-zinc-500">
                          <span>Still need assistance?</span>
                          <a
                            href="mailto:prima.digitechsolutions@gmail.com"
                            className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium flex items-center gap-0.5"
                          >
                            Email Support <ArrowUpRight className="h-3 w-3" />
                          </a>
                        </div>
                      </PopoverContent>
                    </Popover>
                  }
                >
                  {/* Step 1 Content */}
                  <CarouselItem>
                    <div className="space-y-6 px-2 sm:px-6 py-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
                          <div className="relative">
                            <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${errors.name ? "text-red-400" : "text-zinc-500"}`} />
                            <Input
                              id="name"
                              placeholder="e.g. John Doe"
                              value={formData.name}
                              onChange={(e) => handleChange("name", e.target.value)}
                              className={getInputClasses(!!errors.name)}
                            />
                          </div>
                          {errors.name && <p className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {errors.name}</p>}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-zinc-300">Email Address</Label>
                          <div className="relative">
                            <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${errors.email ? "text-red-400" : "text-zinc-500"}`} />
                            <Input
                              id="email"
                              type="email"
                              placeholder="e.g. john@example.com"
                              value={formData.email}
                              onChange={(e) => handleChange("email", e.target.value)}
                              className={getInputClasses(!!errors.email)}
                            />
                          </div>
                          {errors.email && <p className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {errors.email}</p>}
                        </div>
                      </div>
                      
                      <hr className="border-zinc-800/50" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="phone" className="text-zinc-300">Phone / WhatsApp <span className="text-zinc-500 text-xs font-normal">(Optional)</span></Label>
                          </div>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="e.g. +1 234 567 890"
                              value={formData.phone}
                              onChange={(e) => handleChange("phone", e.target.value)}
                              className={getInputClasses(false)}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="company" className="text-zinc-300">Company / University <span className="text-zinc-500 text-xs font-normal">(Optional)</span></Label>
                          </div>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <Input
                              id="company"
                              placeholder="e.g. Acme Corp or MIT"
                              value={formData.company}
                              onChange={(e) => handleChange("company", e.target.value)}
                              className={getInputClasses(false)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Step 2 Content */}
                  <CarouselItem>
                    <div className="space-y-6 px-2 sm:px-6 py-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="service" className="text-zinc-300">Select Service Category</Label>
                            <TooltipIcon text="Choose the main PRIMA service category you are interested in." />
                          </div>
                          <Select value={formData.service} onValueChange={handleServiceChange}>
                            <SelectTrigger id="service" className={getSelectClasses(!!errors.service)}>
                              <div className="flex items-center min-w-0">
                                <Globe className={`h-4 w-4 mr-2 shrink-0 ${errors.service ? "text-red-400" : "text-zinc-400"}`} />
                                <span className="truncate"><SelectValue placeholder="Select a service category..." /></span>
                              </div>
                            </SelectTrigger>
                            <SelectContent className="!bg-zinc-900 !border-zinc-700/50 !text-zinc-100 shadow-2xl !rounded-xl">
                              <SelectGroup>
                                <SelectItem value="IT Services" description="Web, Mobile, System & Game Development" icon={<IconContainer><Globe className="h-4 w-4 text-white" /></IconContainer>}>IT Services</SelectItem>
                                <SelectItem value="Thesis Services" description="Writing, Advising, Data Stats & Consultation" icon={<IconContainer><BookOpen className="h-4 w-4 text-white" /></IconContainer>}>Thesis Services</SelectItem>
                                <SelectItem value="Engineering Services" description="Embedded Systems, Robotics, ML & AI" icon={<IconContainer><Cpu className="h-4 w-4 text-white" /></IconContainer>}>Engineering Services</SelectItem>
                                <SelectItem value="Other Services" description="Seminars, Webinars & Workshops" icon={<IconContainer><MoreHorizontal className="h-4 w-4 text-white" /></IconContainer>}>Other Services</SelectItem>
                                <SelectItem value="General Inquiry" description="General questions or custom requests" icon={<IconContainer><MessageSquare className="h-4 w-4 text-white" /></IconContainer>}>General Inquiry</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {errors.service && <p className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {errors.service}</p>}
                        </div>

                        <AnimatePresence>
                          {formData.service && SERVICE_OFFERS[formData.service] && (
                            <motion.div 
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              className="space-y-2"
                            >
                              <div className="flex items-center gap-2">
                                <Label htmlFor="specific-offer" className="text-zinc-300">Specific Offer</Label>
                                <TooltipIcon text="Choose the specific offer under this category." />
                              </div>
                              <Select value={formData.specificOffer} onValueChange={(val) => handleChange("specificOffer", val)}>
                                <SelectTrigger id="specific-offer" className={getSelectClasses(!!errors.specificOffer)}>
                                  <div className="flex items-center min-w-0">
                                    <CheckCircle2 className={`h-4 w-4 mr-2 shrink-0 ${errors.specificOffer ? "text-red-400" : "text-zinc-400"}`} />
                                    <span className="truncate"><SelectValue placeholder="Select an offer..." /></span>
                                  </div>
                                </SelectTrigger>
                                <SelectContent className="!bg-zinc-900 !border-zinc-700/50 !text-zinc-100 shadow-2xl !rounded-xl max-h-[300px]">
                                  <SelectGroup>
                                    {SERVICE_OFFERS[formData.service].map(offer => (
                                      <SelectItem key={offer.title} value={offer.title} description={offer.desc} icon={<IconContainer><CheckCircle2 className="h-4 w-4 text-white" /></IconContainer>}>{offer.title}</SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              {errors.specificOffer && <p className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {errors.specificOffer}</p>}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      
                      <hr className="border-zinc-800/50" />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="start-date" className="text-zinc-300">Target Start Date</Label>
                            <TooltipIcon text="The date you plan to kick off the project or documentation." />
                          </div>
                          <DatePicker
                            value={startDateValue}
                            onChange={handleDateChange}
                            placeholder="DD/MM/YYYY"
                            className={cn(
                              "max-w-none w-full",
                              errors.startDate
                                ? "[&>button]:h-10 [&>button]:px-3 [&>button]:py-0 [&>button]:border-red-500/50 [&>button]:bg-red-950/10 [&>button]:text-red-100 [&>button]:shadow-[inset_0_1px_0_rgba(239,68,68,0.1),0_1px_3px_rgba(0,0,0,0.5)] [&>button>span>svg]:text-red-400"
                                : "[&>button]:h-10 [&>button]:px-3 [&>button]:py-0 [&>button]:border-zinc-700/50 [&>button]:bg-zinc-900/80 [&>button]:text-zinc-100 [&>button]:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_3px_rgba(0,0,0,0.5)] [&>button]:hover:border-emerald-500/30 [&>button>span>svg]:text-zinc-500"
                            )}
                          />
                          {errors.startDate && <p className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {errors.startDate}</p>}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Label htmlFor="budget" className="text-zinc-300">Estimated Budget <span className="text-zinc-500 text-xs font-normal">(Optional)</span></Label>
                            <TooltipIcon text="Helps us tailor the perfect solution for your investment level." />
                          </div>
                          <Select value={formData.budget} onValueChange={(val) => handleChange("budget", val)}>
                            <SelectTrigger id="budget" className={getSelectClasses(false)}>
                              <div className="flex items-center min-w-0">
                                <PhilippinePeso className="h-4 w-4 mr-2 shrink-0 text-zinc-400" />
                                <span className="truncate"><SelectValue placeholder="Select a range..." /></span>
                              </div>
                            </SelectTrigger>
                            <SelectContent className="!bg-zinc-900 !border-zinc-700/50 !text-zinc-100 shadow-2xl !rounded-xl">
                              <SelectGroup>
                                <SelectItem value="Under ₱25,000" description="Basic tasks & minor projects" icon={<IconContainer><PhilippinePeso className="h-4 w-4 text-white" /></IconContainer>}>Under ₱25,000</SelectItem>
                                <SelectItem value="₱25,000 - ₱75,000" description="Standard custom projects" icon={<IconContainer><PhilippinePeso className="h-4 w-4 text-white" /></IconContainer>}>₱25,000 - ₱75,000</SelectItem>
                                <SelectItem value="₱75,000 - ₱250,000" description="Advanced applications & systems" icon={<IconContainer><PhilippinePeso className="h-4 w-4 text-white" /></IconContainer>}>₱75,000 - ₱250,000</SelectItem>
                                <SelectItem value="₱250,000+" description="Enterprise scale solutions" icon={<IconContainer><PhilippinePeso className="h-4 w-4 text-white" /></IconContainer>}>₱250,000+</SelectItem>
                                <SelectItem value="To Be Discussed" description="I'm not sure yet" icon={<IconContainer><HelpCircle className="h-4 w-4 text-white" /></IconContainer>}>To Be Discussed</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <hr className="border-zinc-800/50" />

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="urgency" className="text-zinc-300">Project Urgency</Label>
                          <TooltipIcon text="How quickly do you need this completed?" />
                        </div>
                        <Select value={formData.urgency} onValueChange={(val) => handleChange("urgency", val)}>
                          <SelectTrigger id="urgency" className={getSelectClasses(!!errors.urgency)}>
                            <div className="flex items-center min-w-0">
                              <Zap className={`h-4 w-4 mr-2 shrink-0 ${errors.urgency ? "text-red-400" : "text-zinc-400"}`} />
                              <span className="truncate"><SelectValue placeholder="Select timeline priority..." /></span>
                            </div>
                          </SelectTrigger>
                          <SelectContent className="!bg-zinc-900 !border-zinc-700/50 !text-zinc-100 shadow-2xl !rounded-xl">
                            <SelectGroup>
                              <SelectItem value="Flexible" description="Standard timeline, no rush" icon={<IconContainer><Calendar className="h-4 w-4 text-zinc-300" /></IconContainer>}>Standard / Flexible</SelectItem>
                              <SelectItem value="High Priority" description="I need this done soon" icon={<IconContainer><AlertCircle className="h-4 w-4 text-zinc-300" /></IconContainer>}>High Priority</SelectItem>
                              <SelectItem value="Expedited" description="Urgent request (Premium rate)" icon={<IconContainer><Zap className="h-4 w-4 text-zinc-300" /></IconContainer>}>Rush / Expedited</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {errors.urgency && <p className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {errors.urgency}</p>}
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Step 3 Content */}
                  <CarouselItem>
                    <div className="space-y-6 px-2 sm:px-6 py-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="details" className="text-zinc-300">Project Details</Label>
                          <TooltipIcon text="Mention formatting requirements, target school, scope of work, etc." />
                        </div>
                        <Textarea
                          id="details"
                          rows={4}
                          placeholder="Please provide details about your project, target goals, timelines, or questions..."
                          value={formData.details}
                          onChange={(e) => handleChange("details", e.target.value)}
                          className={getTextareaClasses(!!errors.details)}
                        />
                        {errors.details && <p className="text-xs text-red-400 flex items-center gap-1"><AlertTriangle className="h-3 w-3" /> {errors.details}</p>}
                      </div>

                      <Alert 
                        appearance="default" 
                        width="100%"
                        timeout={0}
                        className="bg-zinc-900/80 border-zinc-700/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_1px_3px_rgba(0,0,0,0.5)]"
                      >
                        <Info className="h-4 w-4 text-emerald-400" />
                        <AlertTitle className="text-zinc-100 font-medium">Final Review</AlertTitle>
                        <AlertDescription className="text-zinc-400">
                          Please verify your email and service selection before submitting. A confirmation message will be sent instantly.
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CarouselItem>
                </MultiStepForm>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
