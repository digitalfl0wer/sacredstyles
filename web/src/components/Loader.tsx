export function Loader() {
  return (
    <div aria-hidden className="loader-sequence" style={{ width: 240, height: 180 }}>
      <div className="loader-frame silhouette" />
      <div className="loader-frame buds" />
      <div className="loader-frame bloom" />
    </div>
  );
}



