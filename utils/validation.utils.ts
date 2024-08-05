interface formData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export function allDataFilledIn(formData: formData) {
  return Object.keys(formData).every((key) => formData[key as keyof typeof formData].trim().length > 0);
}