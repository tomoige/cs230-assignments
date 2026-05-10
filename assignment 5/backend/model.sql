PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS artists (
    artist_id INTEGER PRIMARY KEY,
    artist_name TEXT NOT NULL,
    genre TEXT NOT NULL,
    monthly_listeners INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS albums (
    album_id INTEGER PRIMARY KEY,
    album_name TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    number_of_listens INTEGER NOT NULL,
    artist_id INTEGER NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artists (artist_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS songs (
    song_id INTEGER PRIMARY KEY,
    song_name TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    album_id INTEGER NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums (album_id) ON DELETE CASCADE
);

INSERT OR IGNORE INTO artists (artist_id, artist_name, genre, monthly_listeners) VALUES
    (1, 'Linkin Park', 'Rock', 38000000),
    (2, 'The Strokes', 'Indie Rock', 14500000);

INSERT OR IGNORE INTO albums (album_id, album_name, release_year, number_of_listens, artist_id) VALUES
    (101, 'Hybrid Theory', 2000, 1800000000, 1),
    (102, 'Meteora', 2003, 1500000000, 1),
    (103, 'Minutes to Midnight', 2007, 900000000, 1),
    (201, 'Is This It', 2001, 700000000, 2),
    (202, 'The New Abnormal', 2020, 450000000, 2);

INSERT OR IGNORE INTO songs (song_id, song_name, release_year, album_id) VALUES
    (1001, 'Papercut', 2000, 101),
    (1002, 'In the End', 2000, 101),
    (1003, 'Crawling', 2000, 101),
    (1004, 'Numb', 2003, 102),
    (1005, 'Faint', 2003, 102),
    (1006, 'What I''ve Done', 2007, 103),
    (1007, 'Bleed It Out', 2007, 103),
    (2001, 'Last Nite', 2001, 201),
    (2002, 'Someday', 2001, 201),
    (2003, 'The Adults Are Talking', 2020, 202);
