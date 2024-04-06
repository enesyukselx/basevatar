"use client";

import { useEffect, useRef, useState } from "react";

const CountDown = ({ currDate, date }: { currDate: Date; date: string }) => {
    const endDate = new Date(date);
    const now = currDate;
    const timeDifference = useRef(endDate.getTime() - now.getTime() < 0 ? 0 : endDate.getTime() - now.getTime());


    const [countdown, setCountdown] = useState({
        hours: Math.floor(timeDifference.current / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference.current % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference.current % (1000 * 60)) / 1000),
    });

    useEffect(() => {
        const interval = setInterval(() => {
            timeDifference.current = timeDifference.current - 1000;
            if (timeDifference.current > 0) {
                const hours = Math.floor(timeDifference.current / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference.current % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference.current % (1000 * 60)) / 1000);

                setCountdown({ hours, minutes, seconds });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    return (
        <div className="countdown-timer">
            <div className="countdown-item">
                <div className="countdown-number">{countdown.hours.toString().padStart(2, "0")}</div>
                <div className="countdown-text">Hours</div>
            </div>
            <div className="countdown-item">
                <div className="countdown-number">{countdown.minutes.toString().padStart(2, "0")}</div>
                <div className="countdown-text">Minutes</div>
            </div>
            <div className="countdown-item">
                <div className="countdown-number">{countdown.seconds.toString().padStart(2, "0")}</div>
                <div className="countdown-text">Seconds</div>
            </div>
        </div>
    );
};

export default CountDown;
