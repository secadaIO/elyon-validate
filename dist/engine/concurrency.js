export async function runConcurrent(tasks) {
    return Promise.all(tasks.map(t => t()));
}
