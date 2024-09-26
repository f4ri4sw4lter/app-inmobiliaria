import { useState, useEffect } from "react";
import { getMetrics } from "../helpers";

export const useFetchMetrics = () => {
    
    const [metrics, setMetrics] = useState([]);
    const [metricsIsLoading, setIsLoading] = useState( true );

    useEffect(() => {
        getMetrics()
            .then(({ metrics }) => {
                setMetrics(metrics);
                setIsLoading(false);
            })
    }, []);
    
    return {
        metrics,
        metricsIsLoading
    }
}