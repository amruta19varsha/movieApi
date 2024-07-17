document.addEventListener("DOMContentLoaded", () => {
    const movieNameInput = document.getElementById("movieName");
    const btn = document.getElementById("btn");
    const toggle = document.getElementById("toggle");
    const elements = {
        title: document.getElementById("title"),
        director: document.getElementById("director"),
        actors: document.getElementById("actors"),
        collection: document.getElementById("collection"),
        desc: document.getElementById("desc"),
        award: document.getElementById("award"),
        writer: document.getElementById("writter"),
        rating: document.getElementById("rating"),
        genre: document.getElementById("genre"),
        date: document.getElementById("date"),
        poster: document.getElementById("poster")
    };

    btn.addEventListener("click", async () => {
        const movieTitle = movieNameInput.value.trim();
        if (movieTitle !== "") {
            try {
                const movieData = await getMovie(movieTitle);
                displayMovieData(movieData);
                toggle.style.display = "block";
            } catch (error) {
                console.error("Error fetching movie data:", error);
                // You can handle error display here
            }
        } else {
            console.log("Please enter a movie name");
            // You can add UI feedback for empty input here
        }
    });

    async function getMovie(movieTitle) {
        const apiKey = "bb746825";
        const apiUrl = `http://www.omdbapi.com/?&apikey=${apiKey}&t=${movieTitle}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch movie data");
        }
        const data = await response.json();
        return data;
    }

    function displayMovieData(movieData) {
        elements.title.innerText = movieData.Title;
        elements.director.innerText = movieData.Director;
        elements.actors.innerText = movieData.Actors;
        elements.collection.innerText = movieData.BoxOffice;
        elements.desc.innerText = movieData.Plot;
        elements.award.innerText = movieData.Awards;
        elements.writer.innerText = movieData.Writer;
        elements.rating.innerText = movieData.imdbRating;
        elements.genre.innerText = movieData.Genre;
        elements.date.innerText = movieData.Released;
        elements.poster.src = movieData.Poster;
    }
});