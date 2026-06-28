import { lazy, Suspense, useEffect, useRef, useState } from "react";

// Lazy-loaded so three.js only downloads when the footer is near the viewport.
const GlobeGL = lazy(() => import("react-globe.gl"));

interface Loc {
  city: string;
  country: string;
  lat: number;
  lng: number;
}

export default function Globe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null);
  const [loc, setLoc] = useState<Loc | null>(null);
  const [show, setShow] = useState(false);
  const [dim, setDim] = useState(560);

  // Approximate location from IP — no permission prompt.
  useEffect(() => {
    let alive = true;
    fetch("https://ipwho.is/")
      .then((r) => r.json())
      .then((d) => {
        if (alive && d && d.success && typeof d.latitude === "number") {
          setLoc({ city: d.city, country: d.country, lat: d.latitude, lng: d.longitude });
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Defer mounting the heavy globe until the footer is approaching.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "500px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Keep the canvas square and sized to the container.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setDim(Math.min(el.clientWidth || 560, 760));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [show]);

  const handleReady = () => {
    const g = globeRef.current;
    if (!g) return;
    const c = g.controls();
    if (c) {
      c.autoRotate = true; // always spinning
      c.autoRotateSpeed = 0.45;
      c.enableZoom = false; // let the page scroll over the globe
      c.enablePan = false;
    }
    g.pointOfView({ altitude: 2.3 });
  };

  // When location resolves: pause spin, swing to face it, then resume spinning.
  useEffect(() => {
    const g = globeRef.current;
    if (!g || !loc) return;
    const c = g.controls();
    if (c) c.autoRotate = false;
    g.pointOfView({ lat: loc.lat, lng: loc.lng, altitude: 2.3 }, 2200);
    const t = setTimeout(() => {
      const cc = g.controls();
      if (cc) cc.autoRotate = true;
    }, 2700);
    return () => clearTimeout(t);
  }, [loc, show]);

  const pts = loc ? [{ lat: loc.lat, lng: loc.lng }] : [];
  const labels = loc
    ? [{ lat: loc.lat, lng: loc.lng, text: [loc.city, loc.country].filter(Boolean).join(", ") }]
    : [];

  return (
    <div className="globe" ref={wrapRef}>
      {show && (
        <Suspense fallback={null}>
          <GlobeGL
            ref={globeRef}
            width={dim}
            height={dim}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="/earth-night.jpg"
            showAtmosphere
            atmosphereColor="#8ab4ff"
            atmosphereAltitude={0.18}
            pointsData={pts}
            pointColor={() => "#e2ff2d"}
            pointAltitude={0.01}
            pointRadius={0.55}
            ringsData={pts}
            ringColor={() => "#e2ff2d"}
            ringMaxRadius={5}
            ringPropagationSpeed={1.6}
            ringRepeatPeriod={1000}
            labelsData={labels}
            labelText="text"
            labelColor={() => "#e2ff2d"}
            labelSize={1.3}
            labelDotRadius={0.45}
            labelResolution={2}
            onGlobeReady={handleReady}
          />
        </Suspense>
      )}
    </div>
  );
}
