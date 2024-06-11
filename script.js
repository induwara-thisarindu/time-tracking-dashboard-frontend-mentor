document.addEventListener("DOMContentLoaded", () => {
    const dailyBtn = document.getElementById("daily-btn");
    const weeklyBtn = document.getElementById("weekly-btn");
    const monthlyBtn = document.getElementById("monthly-btn");

    const buttons = [dailyBtn, weeklyBtn, monthlyBtn]

    const fetchData = async () => {
        const res = await fetch("/data.json");
        const data = await res.json();
        return data;
    }

    const updateData = (data, timeframe) => {
        data.forEach((item, index) => {
            const card = document.querySelectorAll(".card")[index];
            const timeInfo = card.querySelector("h1")
            const timePInfo = card.querySelector("p")

            timeInfo.textContent = `${item.timeframes[timeframe].current}hrs`
            timePInfo.textContent = `Last Week - ${item.timeframes[timeframe].previous}hrs`
        })
    }

    const setActiveButton = (activeButton) => {
        buttons.forEach(button => button.classList.remove("active"));
        activeButton.classList.add("active");
    }

    buttons.forEach(button => {
        button.addEventListener("click", async (e) => {
            const timeframe = e.target.id.split("-")[0];
            setActiveButton(e.target);
            const data = await fetchData();
            updateData(data, timeframe);
        })
    })

    (async () => {
        const data = await fetchData();
        updateData(data, "weekly");
    })();
})

