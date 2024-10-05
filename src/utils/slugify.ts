export default function slugify(text: string): string {
  return text
    .replaceAll(' ', '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
