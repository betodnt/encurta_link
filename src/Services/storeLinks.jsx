//Buscar links salvos
export async function getLinksSave(key) {
  const myLinks = await localStorage.getItem(key);
  let linksSaves = JSON.parse(myLinks) || [];
  return linksSaves;
}
//Salvar link no storage
export async function saveLink(key, newLink) {
  let linksStored = await getLinksSave(key);
  //Não salvar links iguais
  const hasLink = linksStored.some((link) => link.link === newLink.link);
  if (hasLink) {
    return false;
  }
  linksStored.push(newLink); // Adicionar novo link
  await localStorage.setItem(key, JSON.stringify(linksStored));
  return true;
}
//Deletar link
export function deleteLink(links, linkToDelete) {
  let myLinks = links.filter((item) => {
    return item.link !== linkToDelete;
  });
  localStorage.setItem('@linkCurto', JSON.stringify(myLinks));

  return myLinks;
}
