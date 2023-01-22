import axios from "axios";

const divideTrucks = async ({ addresses, numberOfTrucks, setPaths }) => {
    addresses.unshift({ lat: 43.3176583, lng: 76.971492 });
    let durations = new Array(addresses.length).fill([]);

    for (let i = 0; i < addresses.length; i++) {
        durations[i] = new Array(addresses.length).fill(0);
        for (let j = i; j < addresses.length; j++) {
            if (i == j) {
                durations[i][j] = 0;
                continue;
            }
            const result = await axios.get(
                `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${addresses[i].lat},${addresses[i].lng}&destinations=${addresses[j].lat},${addresses[j].lng}&key=a09XCcTOlMk1etSHtWruRhuxN3VYo`,
                {
                    mode: "cors",
                    credentials: "same-origin",
                }
            );
            durations[i][j] = result.data.rows[0].elements[0].distance.value;
        }
        if (i != 0) {
            for (let j = 0; j < i; j++) {
                durations[i][j] = durations[j][i];
            }
        }
    }

    const INF = 1e9;

    function findMinimumTime(path, durations) {
        let n = path.length;

        let dp = [];

        for (let mask = 0; mask < 1 << n; mask++) {
            dp.push([]);
            for (let i = 0; i < n; i++) {
                dp[mask].push(INF);
            }
        }

        for (let mask = 0; mask < 1 << n; mask++) {
            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) > 0) {
                    for (let j = 0; j < n; j++) {
                        if ((mask & (1 << j)) == 0) {
                            dp[mask | (1 << j)][j] = Math.min(
                                dp[mask | (1 << j)][j],
                                dp[mask][i] + durations[path[i]][path[j]]
                            );
                        }
                    }
                }
            }
        }
        let end = 0;

        for (let i = 1; i < n; i++) {
            if (
                dp[(1 << n) - 1][i] + durations[0][path[i]] <
                dp[(1 << n) - 1][end] + durations[0][path[end]]
            )
                end = i;
        }

        let minTime = dp[(1 << n) - 1][end];
        let reorderedPath = [];
        let mask = (1 << n) - 1;

        while (end > -1) {
            reorderedPath.push(end);
            mask ^= 1 << end;

            let next = -1;

            for (let i = 0; i < n; i++) {
                if ((mask & (1 << i)) > 0) {
                    if (next == -1 || dp[mask][next] > dp[mask][i]) next = i;
                }
            }

            end = next;
        }

        return [minTime, reorderedPath];
    }
    function generatePaths(n, m, durations) {
        let paths = [];

        for (let i = 0; i < m; i++) {
            paths.push([]);
        }

        for (let i = 1; i < n; i++) {
            let randomIndex = Math.floor(Math.random() * m);
            paths[randomIndex].push(i);
        }

        let T = 0;

        for (let path in paths) {
            let minTime, reorderedPath;
            [minTime, reorderedPath] = findMinimumTime(path, durations);
            T += minTime;
            path = reorderedPath;
        }

        for (let cycles = 0; cycles < 1000; cycles++) {
            let randomIndex = Math.floor(Math.random() * (n - 1)) + 1;
            for (let i = 0; i < paths.length; i++) {
                let isInPath = false,
                    indexInPath;
                for (let j = 0; j < paths[i].length; j++) {
                    if (paths[i][j] == randomIndex) {
                        isInPath = true;
                        indexInPath = j;
                        break;
                    }
                }

                if (isInPath) {
                    [paths[i][paths[i].length - 1], paths[i][indexInPath]] = [
                        paths[i][indexInPath],
                        paths[i][paths[i].length - 1],
                    ];
                    let indexToTransfer = paths[i][paths[i].length - 1];
                    let curT = T - findMinimumTime(paths[i], durations)[0];
                    paths[i].pop();
                    curT += findMinimumTime(paths[i], durations)[0];
                    let minTime = T,
                        pathIndex = i;
                    for (let j = 0; j < paths.length; j++) {
                        if (i != j) {
                            paths[j].push(indexToTransfer);
                            curT += findMinimumTime(paths[j], durations)[0];
                            if (minTime > curT) {
                                minTime = curT;
                                pathIndex = j;
                            }
                            curT -= findMinimumTime(paths[j], durations)[0];
                            paths[j].pop();
                        }
                    }
                    paths[pathIndex].push(indexToTransfer);
                    T = minTime;
                    break;
                }
            }
        }

        return paths;
    }

    let paths = generatePaths(addresses.length, numberOfTrucks, durations);
    console.log(durations);
    console.log(paths);

    setPaths(paths);
};

export default divideTrucks;
