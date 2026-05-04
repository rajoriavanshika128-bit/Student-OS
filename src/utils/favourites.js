export function getFavourites() {
  try {
    const data = localStorage.getItem('studentos_favourites');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to parse favourites from localStorage', error);
    return [];
  }
}

export function saveFavourite(job) {
  const favourites = getFavourites();
  if (!favourites.some(fav => fav.id === job.id)) {
    favourites.push(job);
    localStorage.setItem('studentos_favourites', JSON.stringify(favourites));
  }
}

export function removeFavourite(jobId) {
  const favourites = getFavourites();
  const updatedFavourites = favourites.filter(fav => fav.id !== jobId);
  localStorage.setItem('studentos_favourites', JSON.stringify(updatedFavourites));
}

export function isFavourited(jobId) {
  const favourites = getFavourites();
  return favourites.some(fav => fav.id === jobId);
}
