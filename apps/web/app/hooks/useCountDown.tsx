import { useEffect, useState } from "react";

interface ICountdownTimerProps {
    deadline: Date;
}

interface ICountdownTimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
}

const INITIAL_TIME_LEFT = { hours: 0, minutes: 0, seconds: 0 };

const useCountDown = ({ deadline }: ICountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState<ICountdownTimeLeft>(INITIAL_TIME_LEFT);

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function calculateTimeLeft(): ICountdownTimeLeft {
        let timeLeft: ICountdownTimeLeft = {
            ...INITIAL_TIME_LEFT,
        };
        let currentDate = new Date();
        let difference = deadline.getTime() - currentDate.getTime();

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor(difference / (1000 * 60 * 60)),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        if (difference <= 0) {
            timeLeft = INITIAL_TIME_LEFT;
        }

        return timeLeft;
    }

    return timeLeft;
};

export default useCountDown;
