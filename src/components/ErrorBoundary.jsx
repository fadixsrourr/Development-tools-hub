import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props){ super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error){ return { error }; }
  componentDidCatch(error, info){ console.error("ErrorBoundary:", error, info); }

  render(){
    if (this.state.error){
      return (
        <div style={{
          padding: 16, background: "#1b1b1e", color: "#ffb4b4",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        }}>
          <h2 style={{marginTop:0}}>💥 A component crashed</h2>
          <pre style={{whiteSpace:"pre-wrap"}}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
