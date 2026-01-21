export default function Calendar() {
  const data = {
    month: "January",
    year: 2026,
    timeSlots: ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"],
    calendar: [
      {
        date: "2026-01-21",
        day: "Mon",
        slots: {
          "09:00": "available",
          "10:00": "booked",
          "11:00": "available",
          "13:00": "available",
          "14:00": "available",
          "15:00": "available"
        }
      },
      {
        date: "2026-01-22",
        day: "Tue",
        slots: {
          "09:00": "available",
          "10:00": "available",
          "11:00": "available",
          "13:00": "available",
          "14:00": "available",
          "15:00": "available"
        }
      },
      {
        date: "2026-01-23",
        day: "Wed",
        slots: {
          "09:00": "booked",
          "10:00": "booked",
          "11:00": "available",
          "13:00": "available",
          "14:00": "available",
          "15:00": "available"
        }
      },
      {
        date: "2026-01-24",
        day: "Thu",
        slots: {
          "09:00": "booked",
          "10:00": "available",
          "11:00": "available",
          "13:00": "available",
          "14:00": "available",
          "15:00": "available"
        }
      },
      {
        date: "2026-01-25",
        day: "Fri",
        slots: {
          "09:00": "available",
          "10:00": "available",
          "11:00": "available",
          "13:00": "available",
          "14:00": "available",
          "15:00": "booked"
        }
      }
    ]
  }

  return (
    <div className="m-4 rounded-md border border-blue-200 shadow-md">
      <p className="text-center text-blue-600 font-bold uppercase p-3 text-sm sm:text-base">
        Please review the available booking slots below
      </p>

      <div className="overflow-x-auto">
        <div className="m-2 border rounded-sm min-w-[720px]">
          <p className="text-center font-bold text-blue-500 p-0.5 text-base sm:text-lg mb-2">
            {data.month} {data.year}
          </p>

          <div className="grid grid-cols-6 text-xs sm:text-sm">
            <div className="font-bold p-2 text-center">Time</div>

            {data.calendar.map((day, i) => (
              <div key={i} className="font-bold p-2 text-center">
                {day.day}
                <br />
                <span className="text-xs text-gray-500">
                  {day.date.split("-")[2]}
                </span>
              </div>
            ))}

            {data.timeSlots.map((time) => (
              <>
                <div
                  key={time}
                  className="p-2 text-center border-r-2 font-medium"
                >
                  {time}
                </div>

                {data.calendar.map((day, index) => {
                  const status = day.slots[time]
                  return (
                    <div
                      key={index}
                      className={`p-2 m-1 text-center rounded 
                        ${
                          status === "available"
                            ? "bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer"
                            : "bg-red-100 text-red-600 cursor-not-allowed"
                        }
                      `}
                    >
                      {status === "available" ? "Available" : "Booked"}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </div>
      </div>

      <p className="capitalize text-center font-bold pb-1 text-gray-400 text-[10px] sm:text-xs">
        if these time does not work or you prefer to fill out a "form" in the chat,
        and i will provide the link !
      </p>
    </div>
  )
}
