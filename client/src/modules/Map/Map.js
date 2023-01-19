import {
    useRef,
    useEffect,
    useState,
    Children,
    isValidElement,
    cloneElement,
} from "react";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
    if (
        isLatLngLiteral(a) ||
        a instanceof window.google.maps.LatLng ||
        isLatLngLiteral(b) ||
        b instanceof window.google.maps.LatLng
    ) {
        return new window.google.maps.LatLng(a).equals(
            new window.google.maps.LatLng(b)
        );
    }

    return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
    const ref = useRef();

    if (!deepCompareEqualsForMaps(value, ref.current)) {
        ref.current = value;
    }

    return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
    useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

const Map = ({ onClick, onIdle, children, style, ...options }) => {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    useDeepCompareEffectForMaps(() => {
        if (map) {
            map.setOptions(options);
        }
    }, [map, options]);

    useEffect(() => {
        if (map) {
            ["click", "idle"].forEach((eventName) =>
                window.google.maps.event.clearListeners(map, eventName)
            );

            if (onClick) {
                map.addListener("click", onClick);
            }

            if (onIdle) {
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    return (
        <>
            <div ref={ref} style={style} />
            {Children.map(children, (child) => {
                if (isValidElement(child)) {
                    // set the map prop on the child component
                    return cloneElement(child, { map });
                }
            })}
        </>
    );
};

export default Map;
