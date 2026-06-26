// in development - not ready

class Leaderboard {
    constructor() {
        this.uploadToLeaderboardURL = "https://lbqeptenrpgspmykqimd.supabase.co/functions/v1/perfect-deal-upsert";
        this.getTop20Url = "https://lbqeptenrpgspmykqimd.supabase.co/functions/v1/perfect-deal-top-moneyleft";
    }

    upload(name, moneyLeft, level) {
        fetch(this.uploadToLeaderboardURL, { method: "POST", body: JSON.stringify({name: name, moneyLeft: moneyLeft, level: level})})
            .then(res => {
                if (!res.ok) alert("Could not save your score.");
            })
    }

    async getTop20(level) {
        const res = await fetch(`${this.getTop20Url}${new URLSearchParams({ level: level })}`, { method: "GET" });
        const data = await res.json();

        return data;
    }
}

export default Leaderboard;