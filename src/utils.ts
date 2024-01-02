import type { Contact, ContactWithErrors } from './schema'

export function validateContact(newContact: Omit<Contact, 'id'>) {
  let contactWithErrors: ContactWithErrors = {
    ...newContact,
  }
  if (newContact.email.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        email: 'No email provided'
      }
    }
  }

  if (newContact.first.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        first: 'No first name provided'
      }
    }
  }
  if (newContact.last.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        last: 'No last name provided'
      }
    }
  }
  if (newContact.phone.length <= 0) {
    contactWithErrors = {
      ...contactWithErrors,
      errors: {
        ...contactWithErrors.errors,
        phone: 'No phone number provided'
      }
    }
  }

  return contactWithErrors
}