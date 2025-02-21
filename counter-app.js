import { LitElement, html, css } from "lit";

class CounterApp extends LitElement {
  static properties = {
    counter: { type: Number },
    min: { type: Number },
    max: { type: Number },
  };

  constructor() {
    super();
    this.counter = 16;
    this.min = 10;
    this.max = 25;
  }

  static styles = css`
    :host {
      display: block;
      text-align: center;
      font-family: Arial, sans-serif;
    }
    .counter {
      font-size: 3rem;
      margin-bottom: 16px;
    }
    .buttons {
      display: flex;
      gap: 8px;
      justify-content: center;
    }
    button {
      font-size: 1.5rem;
      padding: 8px 16px;
      cursor: pointer;
      border: none;
      background-color: #007bff;
      color: white;
      border-radius: 4px;
    }
    button:hover {
      background-color: #0056b3;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
    .counter.low {
      color: red;
    }
    .counter.mid {
      color: orange;
    }
    .counter.high {
      color: green;
    }
  `;

  render() {
    return html`
      <confetti-container id="confetti">
        <div class="counter ${this.getCounterClass()}">${this.counter}</div>
        <div class="buttons">
          <button @click="${this.decrement}" ?disabled="${this.counter <= this.min}">-</button>
          <button @click="${this.increment}" ?disabled="${this.counter >= this.max}">+</button>
        </div>
      </confetti-container>
    `;
  }

  increment() {
    if (this.counter < this.max) {
      this.counter++;
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
    }
  }

  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has("counter") && this.counter === 21) {
      this.makeItRain();
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        const confetti = this.shadowRoot.querySelector("#confetti");
        if (confetti) {
          confetti.setAttribute("popped", "");
        } else {
          console.error("Confetti container not found!");
        }
      }, 0);
    }).catch(err => console.error("Confetti import failed:", err));
  }

  getCounterClass() {
    if (this.counter === this.min || this.counter === this.max) {
      return "low";
    }
    if (this.counter >= 18 && this.counter < 21) {
      return "mid";
    }
    if (this.counter >= 21) {
      return "high";
    }
    return "";
  }
}

customElements.define("counter-app", CounterApp);
