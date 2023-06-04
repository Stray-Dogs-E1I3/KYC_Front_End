import React, { useCallback, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Daily from "../daily/Daily";
import useGetMonthlyTransaction from "../../store/useGetMonthlyTransaction";
import useAccount from "../../store/account";

const Calendar = () => {
  const [currentEvents, setCurrentEvents] = useState([]);
  const [dailyGasFee, setDailyGasFee] = useState([]);
  const [date, setDate] = useState("");
  const { token } = useAccount();
  const { monthlyTx, getMonthlyTransaction } = useGetMonthlyTransaction();

  const createCalendarData = useCallback((title, date) => {
    const gasTitle = `${title} fee`;
    return { title: gasTitle, date };
  }, []);

  const zerofill = useCallback((value, fillCount) => {
    let result = value;

    if (typeof value === "number") result = value.toString();
    return result.padStart(fillCount, "0");
  }, []);

  const handleEventClick = useCallback((selected) => {
    setDate(selected.event.startStr);
  }, []);

  useEffect(() => {
    if (currentEvents[0]) {
      const currentDay = currentEvents[0].source?.context?.currentDate;
      const currentMonth = currentDay.getMonth() + 1;
      const conversionMonth = zerofill(currentMonth, 2);
      const currentDate = currentDay.getDate();
      const conversionDate = zerofill(currentDate, 2);
      const requestString = `${currentDay.getFullYear()}-${conversionMonth}-${conversionDate}`;
      getMonthlyTransaction(requestString, token);
    }
  }, [currentEvents]);

  useEffect(() => {
    const dailyList = [];
    if (monthlyTx) {
      const { DailyGasfeeInCalendar } = monthlyTx;
      if (DailyGasfeeInCalendar.length !== 0) {
        DailyGasfeeInCalendar.forEach((gasFee) => {
          dailyList.push(createCalendarData(gasFee.title, gasFee.date));
        });
      }
    }

    setDailyGasFee(dailyList);
  }, []);

  return (
    <>
      <Card sx={{ width: "100%", overflow: "hidden" }}>
        <CardContent>
          {date === "" ? (
            <>
              {dailyGasFee.length !== 0 && (
                <TableContainer sx={{ mt: 1, maxHeight: 750 }}>
                  <Box m="10px">
                    <Box display="flex" justifyContent="space-between">
                      {/* CALENDAR */}
                      <Box flex="1 1 100%" ml="15px">
                        <FullCalendar
                          height="75vh"
                          plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                          ]}
                          headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right:
                              "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                          }}
                          initialView="dayGridMonth"
                          editable={true}
                          selectable={true}
                          selectMirror={true}
                          dayMaxEvents={true}
                          eventClick={handleEventClick}
                          eventsSet={(events) => setCurrentEvents(events)}
                          initialEvents={dailyGasFee}
                        />
                      </Box>
                    </Box>
                  </Box>
                </TableContainer>
              )}

              {dailyGasFee.length === 0 && (
                <TableContainer sx={{ mt: 1, maxHeight: 750 }}>
                  <Box m="10px">
                    <Box display="flex" justifyContent="space-between">
                      {/* CALENDAR */}
                      <Box flex="1 1 100%" ml="15px">
                        <FullCalendar
                          height="75vh"
                          plugins={[
                            dayGridPlugin,
                            timeGridPlugin,
                            interactionPlugin,
                            listPlugin,
                          ]}
                          headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right:
                              "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                          }}
                          initialView="dayGridMonth"
                          editable={true}
                          selectable={true}
                          selectMirror={true}
                          dayMaxEvents={true}
                          eventClick={handleEventClick}
                          eventsSet={(events) => setCurrentEvents(events)}
                          initialEvents={[
                            { date: "2023-06-01", title: "loading" },
                          ]}
                        />
                      </Box>
                    </Box>
                  </Box>
                </TableContainer>
              )}
            </>
          ) : (
            <>
              <Daily date={date} setDate={setDate} />
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Calendar;
