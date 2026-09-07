export function HeroDiorama() {
  return (
    <div className="hero-diorama" aria-hidden="true">
      <div className="diorama-skyline diorama-skyline-back">
        <span style={{ height: "92px" }} />
        <span style={{ height: "136px" }} />
        <span style={{ height: "72px" }} />
        <span style={{ height: "168px" }} />
        <span style={{ height: "108px" }} />
        <span style={{ height: "148px" }} />
      </div>
      <div className="diorama-platform">
        <div className="diorama-ring ring-a" />
        <div className="diorama-ring ring-b" />
        <div className="diorama-centerpoint" />
        <div className="diorama-clinic-tower tower-a"><i /><b /><b /><b /></div>
        <div className="diorama-clinic-tower tower-b"><i /><b /><b /><b /></div>
        <div className="diorama-clinic-tower tower-c"><i /><b /><b /><b /></div>
      </div>
    </div>
  );
}
