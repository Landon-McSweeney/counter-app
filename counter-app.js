import { html, css, LitElement } from 'lit';

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

  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      --button-size: 40px;
      --button-spacing: 8px;
      --number-color: black;
      --highlight-color: red;
    }

    .counter {
      text-align: center;
    }

    .counter p {
      font-size: 48px;
      color: var(--number-color);
    }

    .counter button {
      width: var(--button-size);
      height: var(--button-size);
      font-size: 24px;
      margin: 0 var(--button-spacing);
      cursor: pointer;
    }

    .counter button:focus {
      outline: none;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    .counter button:disabled {
      background-color: lightgray;
      cursor: not-allowed;
    }
  `;

  render() {
    return html`
      <div class="counter">
        <p style="color: ${this.getCounterColor()}">${this.counter}</p>
        <button @click="${this.decrement}" ?disabled="${this.counter <= this.min}">-</button>
        <button @click="${this.increment}" ?disabled="${this.counter >= this.max}">+</button>
      </div>
      <confetti-container id="confetti"></confetti-container>
    `;
  }
  increment() {
    if (this.counter < this.max) {
      this.counter++;
      this.requestUpdate();
    }
  }

  decrement() {
    if (this.counter > this.min) {
      this.counter--;
      this.requestUpdate();
    }
  }

  getCounterColor() {
    if (this.counter === 18 || this.counter === 21 || this.counter === this.max || this.counter === this.min) {
      return this.counter === 21 ? 'green' : 'orange'; // Change color on 21 or extremes
    }
    return 'black';
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has('counter') && this.counter === 21) {
      this.makeItRain();
    }
  }

  makeItRain() {
    // Dynamically import the confetti container and trigger the animation
    import('@haxtheweb/multiple-choice/lib/confetti-container.js').then(() => {
      setTimeout(() => {
        this.shadowRoot.querySelector('#confetti').setAttribute('popped', '');
      }, 0);
    });
  }
}

customElements.define('counter-app', CounterApp);