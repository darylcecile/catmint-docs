import { ContactForm } from "./contact-form.client";

export default function FormPage() {
  return (
    <div>
      <h1>Form Handling</h1>
      <p>
        A contact form with client-side validation and state management.
        Demonstrates <code>useState</code> for form fields, real-time validation
        feedback, and submission handling in a client component.
      </p>
      <ContactForm />
    </div>
  );
}
