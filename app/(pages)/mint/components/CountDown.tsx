"use client";

import { useEffect, useState } from "react";

const CountDown = () => {
    const endDate = new Date("2024-04-06T14:59:59Z");
    const now = new Date();
    let timeDifference = endDate.getTime() - now.getTime() < 0 ? 0 : endDate.getTime() - now.getTime();

    const [countdown, setCountdown] = useState({
        hours: Math.floor(timeDifference / (1000 * 60 * 60)),
        minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
    });

    useEffect(() => {
        const interval = setInterval(() => {
            timeDifference = timeDifference - 1000;
            if (timeDifference > 0) {
                const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

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
