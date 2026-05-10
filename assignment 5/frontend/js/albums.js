const albumInputs = {
  album_id: document.getElementById("album_id"),
  album_name: document.getElementById("album_name"),
  release_year: document.getElementById("release_year"),
  number_of_listens: document.getElementById("number_of_listens"),
  artist_id: document.getElementById("artist_id")
};

function albumPayload() {
  return {
    album_id: Number(albumInputs.album_id.value),
    album_name: albumInputs.album_name.value.trim(),
    release_year: Number(albumInputs.release_year.value),
    number_of_listens: Number(albumInputs.number_of_listens.value),
    artist_id: Number(albumInputs.artist_id.value)
  };
}

function renderAlbums(albums) {
  const body = document.getElementById("albums-body");
  body.innerHTML = albums
    .map(
      (album) => `
    <tr>
      <td>${album.album_id}</td>
      <td>${album.album_name}</td>
      <td>${album.release_year}</td>
      <td>${album.number_of_listens}</td>
      <td>${album.artist_id}</td>
    </tr>
  `
    )
    .join("");
}

async function loadAlbums() {
  try {
    const response = await request("/albums");
    const albums = response.data || [];
    renderAlbums(albums);
  } catch (error) {
    alert(error.message);
  }
}

document.getElementById("create-album").addEventListener("click", async () => {
  try {
    await request("/albums", {
      method: "POST",
      body: JSON.stringify(albumPayload())
    });
    loadAlbums();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("update-album").addEventListener("click", async () => {
  try {
    const data = albumPayload();
    await request(`/albums/${data.album_id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
    loadAlbums();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("delete-album").addEventListener("click", async () => {
  try {
    const albumId = Number(albumInputs.album_id.value);
    await request(`/albums/${albumId}`, { method: "DELETE" });
    loadAlbums();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("refresh-albums").addEventListener("click", loadAlbums);

loadAlbums();
