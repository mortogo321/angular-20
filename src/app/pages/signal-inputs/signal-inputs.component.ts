import { Component, input, output, model, computed, signal } from '@angular/core';

// Child component with signal inputs
@Component({
  selector: 'app-user-card',
  imports: [],
  template: `
    <div class="user-card">
      <div class="user-header">
        <h4>{{ name() }}</h4>
        @if (isAdmin()) {
          <span class="admin-badge">👑 Admin</span>
        }
      </div>
      <p>Email: {{ email() }}</p>
      <p>Age: {{ age() }}</p>
      <p class="greeting">{{ greeting() }}</p>
      <button (click)="handleClick()">Send Message</button>
    </div>
  `,
  styles: [`
    .user-card {
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 0.5rem 0;
    }

    .user-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .user-header h4 {
      margin: 0;
      color: #212529;
    }

    .admin-badge {
      background: #ffd43b;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 600;
    }

    .user-card p {
      margin: 0.5rem 0;
      color: #495057;
    }

    .greeting {
      font-style: italic;
      color: #667eea;
      font-weight: 500;
    }

    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s ease;
    }

    button:hover {
      background: #5568d3;
    }
  `]
})
export class UserCard {
  // Input signals - reactive inputs
  name = input.required<string>();
  email = input.required<string>();
  age = input<number>(0);
  isAdmin = input(false);

  // Computed from inputs
  greeting = computed(() =>
    `Hello ${this.name()}! You are ${this.age()} years old.`
  );

  // Output signal
  messageSent = output<string>();

  handleClick() {
    this.messageSent.emit(`Message sent to ${this.name()}`);
  }
}

// Component with two-way binding using model()
@Component({
  selector: 'app-counter-control',
  imports: [],
  template: `
    <div class="counter-control">
      <h4>{{ label() }}</h4>
      <div class="controls">
        <button (click)="decrement()">-</button>
        <span class="value">{{ value() }}</span>
        <button (click)="increment()">+</button>
      </div>
    </div>
  `,
  styles: [`
    .counter-control {
      background: #f8f9fa;
      border: 2px solid #dee2e6;
      border-radius: 8px;
      padding: 1rem;
    }

    .counter-control h4 {
      margin: 0 0 1rem 0;
      color: #212529;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 1rem;
      justify-content: center;
    }

    .controls button {
      width: 40px;
      height: 40px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1.5rem;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .controls button:hover {
      background: #5568d3;
    }

    .value {
      font-size: 1.5rem;
      font-weight: 600;
      color: #212529;
      min-width: 50px;
      text-align: center;
    }
  `]
})
export class CounterControl {
  label = input('Counter');

  // Two-way binding with model()
  value = model(0);

  increment() {
    this.value.update(v => v + 1);
  }

  decrement() {
    this.value.update(v => v - 1);
  }
}

@Component({
  selector: 'app-signal-inputs',
  imports: [UserCard, CounterControl],
  template: `
    <div class="signal-inputs-container">
      <h2>Signal Inputs & Outputs</h2>
      <p class="description">
        Angular 20 introduces signal-based component APIs with input(), output(), and model()
        functions for better reactivity and type safety.
      </p>

      <div class="demo-grid">
        <!-- Signal Inputs -->
        <div class="demo-card">
          <h3>📥 Signal Inputs with input()</h3>
          <div class="demo-content">
            <p>Control user data from parent:</p>

            <div class="input-controls">
              <label>
                Name:
                <input
                  type="text"
                  [value]="userName()"
                  (input)="updateUserName($event)"
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  [value]="userEmail()"
                  (input)="updateUserEmail($event)"
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  [value]="userAge()"
                  (input)="updateUserAge($event)"
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  [checked]="userIsAdmin()"
                  (change)="toggleAdmin()"
                />
                Is Admin
              </label>
            </div>

            <app-user-card
              [name]="userName()"
              [email]="userEmail()"
              [age]="userAge()"
              [isAdmin]="userIsAdmin()"
              (messageSent)="onMessageSent($event)"
            />

            @if (lastMessage()) {
              <div class="message-display">
                {{ lastMessage() }}
              </div>
            }
          </div>
          <div class="code-section">
            <pre><code>// Child Component
class UserCard &#123;
  name = input.required&lt;string&gt;();
  email = input.required&lt;string&gt;();
  age = input&lt;number&gt;(0);

  greeting = computed(() =>
    \`Hello \$&#123;this.name()&#125;!\`
  );
&#125;

// Parent Template
&lt;app-user-card
  [name]="userName"
  [email]="userEmail"
  [age]="userAge"
/&gt;</code></pre>
          </div>
        </div>

        <!-- Signal Outputs -->
        <div class="demo-card">
          <h3>📤 Signal Outputs with output()</h3>
          <div class="demo-content">
            <p>Child components emit events to parent:</p>

            <div class="event-log">
              <h4>Event Log:</h4>
              @for (event of eventLog(); track $index) {
                <div class="event-item">
                  {{ event }}
                </div>
              }
              @empty {
                <p class="empty-state">No events yet</p>
              }
            </div>

            <button (click)="clearEventLog()">Clear Log</button>
          </div>
          <div class="code-section">
            <pre><code>// Child Component
class UserCard &#123;
  messageSent = output&lt;string&gt;();

  sendMessage() &#123;
    this.messageSent.emit('Hello!');
  &#125;
&#125;

// Parent Template
&lt;app-user-card
  (messageSent)="onMessage($event)"
/&gt;</code></pre>
          </div>
        </div>

        <!-- Two-way Binding with model() -->
        <div class="demo-card full-width">
          <h3>🔄 Two-way Binding with model()</h3>
          <div class="demo-content">
            <p>The model() function enables two-way data binding:</p>

            <div class="model-demo">
              <div class="counter-display">
                <h4>Parent Counter Value: {{ parentCounter() }}</h4>
                <p class="info">Changes in the child component update the parent automatically</p>
              </div>

              <div class="counters-grid">
                <app-counter-control
                  label="Counter 1"
                  [(value)]="parentCounter"
                />

                <app-counter-control
                  label="Counter 2"
                  [(value)]="secondCounter"
                />

                <div class="counter-control">
                  <h4>Total: {{ totalCount() }}</h4>
                  <p class="info">Sum of both counters (computed)</p>
                </div>
              </div>
            </div>
          </div>
          <div class="code-section">
            <pre><code>// Child Component
class CounterControl &#123;
  value = model(0); // Two-way binding

  increment() &#123;
    this.value.update(v => v + 1);
  &#125;
&#125;

// Parent Component
parentCounter = signal(0);

// Parent Template
&lt;app-counter-control
  [(value)]="parentCounter"
/&gt;</code></pre>
          </div>
        </div>

        <!-- Advanced: Transform Inputs -->
        <div class="demo-card">
          <h3>🔧 Input Transforms</h3>
          <div class="demo-content">
            <p>Transform input values automatically:</p>

            <div class="transform-demo">
              <label>
                Enter a number (will be doubled):
                <input
                  type="number"
                  [value]="rawValue()"
                  (input)="updateRawValue($event)"
                />
              </label>

              <div class="result-display">
                <p>Raw value: <strong>{{ rawValue() }}</strong></p>
                <p>Doubled: <strong>{{ doubledValue() }}</strong></p>
              </div>
            </div>
          </div>
          <div class="code-section">
            <pre><code>// With transform
age = input(0, &#123;
  transform: (value: string | number) =>
    typeof value === 'string'
      ? parseInt(value, 10)
      : value
&#125;);

// Usage
&lt;app-user [age]="'25'" /&gt;
// Automatically converts to number</code></pre>
          </div>
        </div>

        <!-- Benefits -->
        <div class="demo-card">
          <h3>✨ Benefits</h3>
          <div class="benefits-list">
            <div class="benefit-item">
              <strong>🎯 Reactive by Default</strong>
              <p>Inputs are signals, enabling fine-grained reactivity</p>
            </div>
            <div class="benefit-item">
              <strong>🔒 Type Safety</strong>
              <p>Better TypeScript inference and required inputs</p>
            </div>
            <div class="benefit-item">
              <strong>⚡ Better Performance</strong>
              <p>More efficient change detection</p>
            </div>
            <div class="benefit-item">
              <strong>📝 Simpler API</strong>
              <p>Cleaner syntax compared to decorators</p>
            </div>
            <div class="benefit-item">
              <strong>🔄 Built-in Two-way Binding</strong>
              <p>model() provides native two-way binding</p>
            </div>
            <div class="benefit-item">
              <strong>🔧 Transforms</strong>
              <p>Built-in input transformation support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .signal-inputs-container {
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    h2 {
      font-size: 2rem;
      color: #212529;
      margin-bottom: 0.5rem;
    }

    .description {
      font-size: 1.1rem;
      color: #6c757d;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
      gap: 1.5rem;
    }

    .demo-card {
      background: white;
      border: 2px solid #e9ecef;
      border-radius: 12px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
    }

    .demo-card.full-width {
      grid-column: 1 / -1;
    }

    .demo-card h3 {
      margin: 0 0 1rem 0;
      color: #212529;
      font-size: 1.3rem;
    }

    .demo-content {
      flex: 1;
      margin-bottom: 1rem;
    }

    .input-controls {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .input-controls label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      color: #495057;
      font-weight: 500;
    }

    .input-controls input[type="text"],
    .input-controls input[type="email"],
    .input-controls input[type="number"] {
      padding: 0.5rem;
      border: 2px solid #e9ecef;
      border-radius: 6px;
      font-size: 1rem;
    }

    .input-controls input[type="text"]:focus,
    .input-controls input[type="email"]:focus,
    .input-controls input[type="number"]:focus {
      outline: none;
      border-color: #667eea;
    }

    .input-controls input[type="checkbox"] {
      width: 20px;
      height: 20px;
    }

    .message-display {
      background: #d4edda;
      border: 2px solid #28a745;
      padding: 1rem;
      border-radius: 8px;
      margin-top: 1rem;
      color: #155724;
      font-weight: 500;
    }

    .event-log {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      max-height: 300px;
      overflow-y: auto;
    }

    .event-log h4 {
      margin: 0 0 0.75rem 0;
      color: #212529;
    }

    .event-item {
      background: white;
      padding: 0.5rem;
      border-radius: 4px;
      margin-bottom: 0.5rem;
      color: #495057;
      border-left: 3px solid #667eea;
    }

    .empty-state {
      color: #6c757d;
      font-style: italic;
      text-align: center;
      padding: 1rem;
    }

    button {
      padding: 0.5rem 1rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s ease;
    }

    button:hover {
      background: #5568d3;
    }

    .model-demo {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .counter-display {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
    }

    .counter-display h4 {
      margin: 0 0 0.5rem 0;
      color: #212529;
      font-size: 1.5rem;
    }

    .counters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .transform-demo {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .transform-demo label {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      color: #495057;
      font-weight: 500;
    }

    .transform-demo input {
      padding: 0.5rem;
      border: 2px solid #e9ecef;
      border-radius: 6px;
      font-size: 1rem;
    }

    .result-display {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
    }

    .result-display p {
      margin: 0.5rem 0;
      color: #495057;
    }

    .result-display strong {
      color: #667eea;
      font-size: 1.2rem;
    }

    .code-section {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1rem;
      overflow-x: auto;
    }

    .code-section pre {
      margin: 0;
      font-size: 0.9rem;
    }

    .code-section code {
      color: #495057;
      font-family: 'Monaco', 'Courier New', monospace;
    }

    .info {
      color: #6c757d;
      font-size: 0.95rem;
      font-style: italic;
    }

    .benefits-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .benefit-item {
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .benefit-item strong {
      color: #212529;
      display: block;
      margin-bottom: 0.5rem;
    }

    .benefit-item p {
      color: #6c757d;
      margin: 0;
      font-size: 0.95rem;
    }

    @media (max-width: 768px) {
      .demo-grid {
        grid-template-columns: 1fr;
      }

      .counters-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class SignalInputsComponent {
  // User data signals
  userName = signal('John Doe');
  userEmail = signal('john@example.com');
  userAge = signal(30);
  userIsAdmin = signal(false);

  // Event tracking
  lastMessage = signal('');
  eventLog = signal<string[]>([]);

  // Two-way binding
  parentCounter = signal(5);
  secondCounter = signal(3);
  totalCount = computed(() => this.parentCounter() + this.secondCounter());

  // Transform demo
  rawValue = signal(10);
  doubledValue = computed(() => this.rawValue() * 2);

  updateUserName(event: Event) {
    const target = event.target as HTMLInputElement;
    this.userName.set(target.value);
  }

  updateUserEmail(event: Event) {
    const target = event.target as HTMLInputElement;
    this.userEmail.set(target.value);
  }

  updateUserAge(event: Event) {
    const target = event.target as HTMLInputElement;
    this.userAge.set(parseInt(target.value) || 0);
  }

  toggleAdmin() {
    this.userIsAdmin.update(v => !v);
  }

  onMessageSent(message: string) {
    this.lastMessage.set(message);
    this.eventLog.update(log => [
      `${new Date().toLocaleTimeString()}: ${message}`,
      ...log
    ]);
  }

  clearEventLog() {
    this.eventLog.set([]);
    this.lastMessage.set('');
  }

  updateRawValue(event: Event) {
    const target = event.target as HTMLInputElement;
    this.rawValue.set(parseInt(target.value) || 0);
  }
}
