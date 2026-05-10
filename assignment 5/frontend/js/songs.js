const songInputs = {
  song_id: document.getElementById("song_id"),
  song_name: document.getElementById("song_name"),
  release_year: document.getElementById("release_year"),
  album_id: document.getElementById("album_id")
};

function songPayload() {
  return {
    song_id: Number(songInputs.song_id.value),
    song_name: songInputs.song_name.value.trim(),
    release_year: Number(songInputs.release_year.value),
    album_id: Number(songInputs.album_id.value)
  };
}

function renderSongs(songs) {
  const body = document.getElementById("songs-body");
  body.innerHTML = songs
    .map(
      (song) => `
    <tr>
      <td>${song.song_id}</td>
      <td>${song.song_name}</td>
      <td>${song.release_year}</td>
      <td>${song.album_id}</td>
    </tr>
  `
    )
    .join("");
}

async function loadSongs() {
  try {
    const response = await request("/songs");
    const songs = response.data || [];
    renderSongs(songs);
  } catch (error) {
    alert(error.message);
  }
}

document.getElementById("create-song").addEventListener("click", async () => {
  try {
    await request("/songs", {
      method: "POST",
      body: JSON.stringify(songPayload())
    });
    loadSongs();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("update-song").addEventListener("click", async () => {
  try {
    const data = songPayload();
    await request(`/songs/${data.song_id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
    loadSongs();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("delete-song").addEventListener("click", async () => {
  try {
    const songId = Number(songInputs.song_id.value);
    await request(`/songs/${songId}`, { method: "DELETE" });
    loadSongs();
  } catch (error) {
    alert(error.message);
  }
});

document.getElementById("refresh-songs").addEventListener("click", loadSongs);

loadSongs();
