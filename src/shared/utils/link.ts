/** https://devicon.dev */
export const getLangLogo = (name: string) => {
  const lang = name
    .toLocaleLowerCase()
    .replaceAll('+', 'plus')
    .replaceAll('#', 'sharp');
  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${lang}/${lang}-original.svg`;
};
