import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email address";
  }
  if (!data.message.trim()) {
    errors.message = "Message is required";
  } else if (data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }
  return errors;
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    // Clear error on change if field was touched
    if (touched[field]) {
      const newErrors = validate({ ...form, [field]: value });
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  }

  function handleBlur(field: keyof FormData) {
    setTouched((t) => ({ ...t, [field]: true }));
    const newErrors = validate(form);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

    const newErrors = validate(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setSubmitted(true);
  }

  function reset() {
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded max-w-lg">
        <h3 className="text-green-800 font-semibold">Message Sent!</h3>
        <p className="text-green-700 text-sm mt-1">
          Thanks, {form.name}. We&apos;ll reply to {form.email} shortly.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-3 px-3 py-1 rounded bg-green-100 hover:bg-green-200 text-green-800 text-sm transition-colors"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-lg">
      <Field
        label="Name"
        value={form.name}
        error={touched.name ? errors.name : undefined}
        onChange={(v) => handleChange("name", v)}
        onBlur={() => handleBlur("name")}
        placeholder="Your name"
      />
      <Field
        label="Email"
        type="email"
        value={form.email}
        error={touched.email ? errors.email : undefined}
        onChange={(v) => handleChange("email", v)}
        onBlur={() => handleBlur("email")}
        placeholder="you@example.com"
      />
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          placeholder="Your message (at least 10 characters)"
          rows={4}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
            touched.message && errors.message
              ? "border-red-300 focus:ring-red-200"
              : "focus:ring-blue-200"
          }`}
        />
        {touched.message && errors.message && (
          <p className="text-red-500 text-xs mt-1">{errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="px-6 py-2 rounded bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-medium transition-colors"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  type = "text",
  value,
  error,
  onChange,
  onBlur,
  placeholder,
}: {
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  placeholder?: string;
}) {
  const fieldId = `contact-${label.toLowerCase()}`;
  return (
    <div>
      <label
        htmlFor={fieldId}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        id={fieldId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
          error ? "border-red-300 focus:ring-red-200" : "focus:ring-blue-200"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
