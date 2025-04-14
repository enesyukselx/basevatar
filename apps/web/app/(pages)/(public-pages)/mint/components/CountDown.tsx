"use client";
import useCountDown from "@/app/hooks/useCountDown";

const CountDown = ({ date }: { date: Date }) => {
    const countdown = useCountDown({ deadline: date });

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
