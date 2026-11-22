import React from "react";

/** Menahan error satu halaman supaya seluruh panel tidak jadi layar hitam. */
export default class Penahan extends React.Component {
  constructor(p) { super(p); this.state = { galat: null }; }
  static getDerivedStateFromError(galat) { return { galat }; }
  componentDidCatch(galat) { console.error("Halaman panel error:", galat); }
  componentDidUpdate(prev) {
    if (prev.kunci !== this.props.kunci && this.state.galat) this.setState({ galat: null });
  }
  render() {
    if (!this.state.galat) return this.props.children;
    return (
      <div className="kosong" style={{ padding: 24, textAlign: "left" }}>
        <b style={{ color: "#e8538f" }}>Halaman ini error.</b>
        <div style={{ marginTop: 8, fontSize: 12, wordBreak: "break-word" }}>
          {String(this.state.galat && (this.state.galat.message || this.state.galat))}
        </div>
        <button className="tombolBaru" style={{ marginTop: 12 }} onClick={() => this.setState({ galat: null })}>Coba lagi</button>
      </div>
    );
  }
}
