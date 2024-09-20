import { useState, useEffect } from "react";
import moment from "moment";

export const useStaffHomeClock = () => {
  const [clock, setClock] = useState<string>(
    moment().format("ddd, DD MMM YYYY, h:mm A")
  );
  useEffect(() => {
    let rotationInterval = setInterval(() => {
      setClock(moment().format("ddd, DD MMM YYYY, h:mm A"));
    }, 1000);

    return () => {
      clearInterval(rotationInterval);
    };
  }, []);

  return clock;
};
