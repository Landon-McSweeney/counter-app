import { LitElement, html, css } from "lit";

export class CounterApp extends LitElement {
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
    .counter {
      font-size: 32px;
      font-weight: bold;
    }
    .buttons {
      display: flex;
      gap: 8px;
    }
    button {
      padding: 8px;
      font-size: 16px;
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  updated(changedProperties) {
    if (changedProperties.has("counter") && this.counter === 21) {
      this.makeItRain();
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
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

  render() {
    return html`
      <confetti-container id="confetti">
        <div class="counter" style="color: ${this.counter >= 21 ? 'green' : this.counter >= 18 ? 'blue' : 'black'};">
          ${this.counter}
        </div>
        <div class="buttons">
          <button @click="${this.decrement}" ?disabled="${this.counter === this.min}">-</button>
          <button @click="${this.increment}" ?disabled="${this.counter === this.max}">+</button>
        </div>
      </confetti-container>
    `;
  }
}

customElements.define("counter-app", CounterApp);
