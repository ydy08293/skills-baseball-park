//방문자 정보 가져오기
async function visitorsDate() {
    const response = await fetch("./선수제공파일/B_Module/visitors.json");
    const data = await response.json();
    return data;
}

async function chartView() {
    let data = await visitorsDate();
    const league = document.querySelector("#league").value;
    const week = document.querySelector("#week").value;

    data  = data.data[league].visitors[week].visitor

    return data;
}

let maxCount = 0;

// 가로 차트 띄우기
async function widthChart() {
    const chartElem = document.querySelector("#chartDiv");
    chartElem.innerHTML = "";
    chartElem.className = "chart_width";

    const data = await chartView();

    Object.entries(data).forEach(([time, count]) => {
        if(count >= 500) {
            maxCount = 500;
        } else {
            maxCount = count;
        }
        chartElem.innerHTML += `
            <div class="width_parents">
                <p>${time}</p>
                <div class="width" style="width: ${maxCount}px;">${count}명</div>
            </div>`
    })
}

// 세로 차트 띄우기
async function heightChart() {
    const chartElem = document.querySelector("#chartDiv");
    chartElem.innerHTML = "";
    chartElem.className = "chart_height";

    const data = await chartView();

    Object.entries(data).forEach(([time, count]) => {
        if(count >= 500) {
            maxCount = 500;
        } else {
            maxCount = count;
        }
        chartElem.innerHTML += `
            <div class="height_parents">
                <div class="height" style="height: ${maxCount}px;">${count}명</div>
                <p>${time}</p>
            </div>`
    })
}

