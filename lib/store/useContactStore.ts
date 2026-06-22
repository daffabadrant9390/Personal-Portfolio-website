"use client";

import { create } from "zustand";
import type { ContactFormData, FormStatus } from "@/lib/types";

interface ContactState extends ContactFormData {
  status: FormStatus;
  errors: Partial<ContactFormData>;
  setField: (field: keyof ContactFormData, value: string) => void;
  setStatus: (status: FormStatus) => void;
  validate: () => boolean;
  reset: () => void;
}

const EMPTY: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

// Same pattern the WHATWG HTML spec uses for <input type="email"> validation.
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const useContactStore = create<ContactState>()((set, get) => ({
  ...EMPTY,
  status: "idle",
  errors: {},

  setField: (field, value) =>
    set((state) => ({
      [field]: value,
      errors: { ...state.errors, [field]: undefined },
    })),

  setStatus: (status) => set({ status }),

  validate: () => {
    const { name, email, subject, message } = get();
    const errors: Partial<ContactFormData> = {};

    if (!name.trim())    errors.name    = "Name is required";
    if (!email.trim())   errors.email   = "Email is required";
    else if (!EMAIL_REGEX.test(email.trim()))
                         errors.email   = "Invalid email address";
    if (!subject.trim()) errors.subject = "Subject is required";
    if (!message.trim()) errors.message = "Message is required";

    set({ errors });
    return Object.keys(errors).length === 0;
  },

  reset: () => set({ ...EMPTY, status: "idle", errors: {} }),
}));
