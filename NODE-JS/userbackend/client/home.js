document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "/login.html"; // Redirect to login if not logged in
    } else {
        document.getElementById("username").innerText = `@${user.username}`;
        document.getElementById("user-role").innerText = user.bio || "No bio available";
        document.getElementById("user-email").innerText = user.email;
        document.getElementById("user-followers").innerText = "Followers: 1000"; // Static for now

        document.getElementById("user-avatar").src = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`;
        document.getElementById("user-container").classList.remove("hidden");
    }

    // Logout functionality
    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/index.html";
    });
});
