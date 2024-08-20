'use server';

import { saveMeal } from '@/lib/meals';
import { redirect } from 'next/navigation';

function isInvalidText(text) {
  return !text || text?.trim() === '';
}

export async function shareMeal(prevState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  const isInvalidFormDataText = Object.entries(meal)
    .filter(([key, _]) => key !== 'image')
    .some(([_, value]) => isInvalidText(value));

  if (
    isInvalidFormDataText ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return { message: 'Invalid Input' };
  }

  await saveMeal(meal);
  redirect('/meals');
}
