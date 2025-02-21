import { LitElement, html, css } from 'lit';

class CounterApp extends LitElement {
  static properties = {
    counter: { type: Number },
    min: { type: Number },
    max: { type: Number },
  };

  constructor() {
    super();
    this.counter = 0;
    this.min = 0;
    this.max = 10;
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('counter')) {
      // Trigger confetti effect when counter reaches 21
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then((module) => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  // Example increment and decrement methods
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
      <div>
        <p>${this.counter}</p>
        <button @click="${this.increment}">+</button>
        <button @click="${this.decrement}">-</button>
        <confetti-container id="confetti"></confetti-container>
      </div>
    `;
  }
}

customElements.define('counter-app', CounterApp);

