const artistInputs = {
  artist_id: document.getElementById("artist_id"),
  artist_name: document.getElementById("artist_name"),
  genre: document.getElementById("genre"),
  monthly_listeners: document.getElementById("monthly_listeners")
};

function artistPayload() {
  return {
    artist_id: Number(artistInputs.artist_id.value),
    artist_name: artistInputs.artist_name.value.trim(),
    genre: artistInputs.genre.value.trim(),
    monthly_listeners: Number(artistInputs.monthly_listeners.value)
  };
}

function renderArtists(artists) {
  const body = document.getElementById("artists-body");
  body.innerHTML = artists
    .map(
      (artist) => `
    <tr>
      <td>${artist.artist_id}</td>
      <td>${artist.artist_name}</td>
      <td>${artist.genre}</td>
      <td>${artist.monthly_listeners}</td>
    </tr>
  `
    )
    .join("");
}

async function loadArtists() {
  try {
    const response = await request("/artists");
    const artists = response.data || [];
    renderArtists(artists);
  } catch (error) {
    alert(error.message);
  }
}

document.getElementById("create-artist").addEventListener("click", async () => {
  try {
    await request("/artists", {
      method: "POST",
      body: JSON.stringify(artistPayload())
    });
    loadArtists();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("update-artist").addEventListener("click", async () => {
  try {
    const data = artistPayload();
    await request(`/artists/${data.artist_id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
    loadArtists();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("delete-artist").addEventListener("click", async () => {
  try {
    const artistId = Number(artistInputs.artist_id.value);
    await request(`/artists/${artistId}`, { method: "DELETE" });
    loadArtists();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("refresh-artists").addEventListener("click", loadArtists);

loadArtists();
