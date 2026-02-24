from typing import List, Tuple

Process = Tuple[int, int, int]  # (process_id, arrival_time, burst_time)


def total_waiting_time_fcfs(processes: List[Process]) -> int:
    """Compute total waiting time for FCFS scheduling."""
    if not processes:
        return 0

    # FCFS schedules processes in ascending arrival time.
    sorted_processes = sorted(processes, key=lambda p: p[1])

    current_time = 0
    total_waiting_time = 0

    for _, arrival_time, burst_time in sorted_processes:
        # If CPU is idle, jump to the process arrival time.
        if current_time < arrival_time:
            current_time = arrival_time

        waiting_time = current_time - arrival_time
        total_waiting_time += waiting_time

        current_time += burst_time

    return total_waiting_time


if __name__ == "__main__":
    processes_input: List[Process] = [
        (1, 0, 5),
        (2, 1, 3),
        (3, 2, 8),
        (4, 3, 6),
    ]

    total_wait = total_waiting_time_fcfs(processes_input)
    print(f"Total Waiting Time:{total_wait}")
