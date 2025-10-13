import { Component, signal, computed, effect } from '@angular/core';
import { JsonPipe } from '@angular/common';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-signals',
  imports: [JsonPipe],
  template: `
    <div class="signals-container">
      <h2>Signals - Fine-Grained Reactivity</h2>
      <p class="description">
        Signals are Angular's new reactive primitive that provide fine-grained reactivity
        and better performance compared to traditional change detection.
      </p>

      <div class="demo-grid">
        <!-- Basic Signal -->
        <div class="demo-card">
          <h3>📊 Basic Signal</h3>
          <div class="demo-content">
            <p>Counter: <strong>{{ count() }}</strong></p>
            <div class="button-group">
              <button (click)="increment()">Increment</button>
              <button (click)="decrement()">Decrement</button>
              <button (click)="reset()">Reset</button>
            </div>
          </div>
          <div class="code-section">
            <pre><code>count = signal(0);

increment() &#123;
  this.count.update(v => v + 1);
&#125;

decrement() &#123;
  this.count.update(v => v - 1);
&#125;</code></pre>
          </div>
        </div>

        <!-- Computed Signal -->
        <div class="demo-card">
          <h3>🔢 Computed Signal</h3>
          <div class="demo-content">
            <p>Count: {{ count() }}</p>
            <p>Doubled: <strong>{{ doubled() }}</strong></p>
            <p>Tripled: <strong>{{ tripled() }}</strong></p>
            <p class="info">Computed values update automatically when count changes!</p>
          </div>
          <div class="code-section">
            <pre><code>count = signal(0);

doubled = computed(() =>
  this.count() * 2
);

tripled = computed(() =>
  this.count() * 3
);</code></pre>
          </div>
        </div>

        <!-- Task List Signal -->
        <div class="demo-card full-width">
          <h3>📝 Task List with Signals</h3>
          <div class="demo-content">
            <div class="input-group">
              <input
                type="text"
                #taskInput
                placeholder="Enter a new task..."
                (keyup.enter)="addTask(taskInput.value); taskInput.value = ''"
              />
              <button (click)="addTask(taskInput.value); taskInput.value = ''">
                Add Task
              </button>
            </div>

            <div class="stats">
              <span>Total: {{ totalTasks() }}</span>
              <span>Completed: {{ completedTasks() }}</span>
              <span>Pending: {{ pendingTasks() }}</span>
              <span>Progress: {{ completionPercentage() }}%</span>
            </div>

            <div class="task-list">
              @for (task of tasks(); track task.id) {
                <div class="task-item" [class.completed]="task.completed">
                  <input
                    type="checkbox"
                    [checked]="task.completed"
                    (change)="toggleTask(task.id)"
                  />
                  <span>{{ task.title }}</span>
                  <button class="delete-btn" (click)="deleteTask(task.id)">✕</button>
                </div>
              }
              @empty {
                <p class="empty-state">No tasks yet. Add one above!</p>
              }
            </div>
          </div>
          <div class="code-section">
            <pre><code>tasks = signal&lt;Task[]&gt;([]);

totalTasks = computed(() =>
  this.tasks().length
);

completedTasks = computed(() =>
  this.tasks().filter(t => t.completed).length
);

addTask(title: string) &#123;
  this.tasks.update(tasks => [...tasks, &#123;
    id: Date.now(),
    title,
    completed: false
  &#125;]);
&#125;</code></pre>
          </div>
        </div>

        <!-- Effect Example -->
        <div class="demo-card">
          <h3>⚡ Effects</h3>
          <div class="demo-content">
            <p>Count: {{ count() }}</p>
            <p class="info">Check the console to see effect logs!</p>
            <button (click)="increment()">Increment to trigger effect</button>
          </div>
          <div class="code-section">
            <pre><code>constructor() &#123;
  effect(() => &#123;
    console.log('Count changed:',
      this.count()
    );
  &#125;);
&#125;</code></pre>
          </div>
        </div>

        <!-- Benefits -->
        <div class="demo-card">
          <h3>✨ Benefits of Signals</h3>
          <div class="benefits-list">
            <div class="benefit-item">
              <strong>Fine-grained reactivity</strong>
              <p>Only components using the signal re-render</p>
            </div>
            <div class="benefit-item">
              <strong>Better performance</strong>
              <p>No zone.js or dirty checking needed</p>
            </div>
            <div class="benefit-item">
              <strong>Simpler mental model</strong>
              <p>Explicit dependencies and updates</p>
            </div>
            <div class="benefit-item">
              <strong>Type-safe</strong>
              <p>Full TypeScript support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .signals-container {
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
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
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

    .demo-content p {
      margin: 0.5rem 0;
      font-size: 1.05rem;
    }

    .demo-content strong {
      color: #667eea;
      font-size: 1.2rem;
    }

    .button-group {
      display: flex;
      gap: 0.5rem;
      margin-top: 1rem;
      flex-wrap: wrap;
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
      font-style: italic;
      font-size: 0.95rem;
    }

    .input-group {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .input-group input {
      flex: 1;
      padding: 0.5rem 1rem;
      border: 2px solid #e9ecef;
      border-radius: 6px;
      font-size: 1rem;
    }

    .input-group input:focus {
      outline: none;
      border-color: #667eea;
    }

    .stats {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .stats span {
      padding: 0.5rem 1rem;
      background: #f8f9fa;
      border-radius: 6px;
      font-weight: 500;
      color: #495057;
    }

    .task-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .task-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: #f8f9fa;
      border-radius: 6px;
      transition: all 0.3s ease;
    }

    .task-item:hover {
      background: #e9ecef;
    }

    .task-item.completed span {
      text-decoration: line-through;
      color: #6c757d;
    }

    .task-item input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .task-item span {
      flex: 1;
    }

    .delete-btn {
      padding: 0.25rem 0.5rem;
      background: #dc3545;
      font-size: 0.9rem;
    }

    .delete-btn:hover {
      background: #c82333;
    }

    .empty-state {
      text-align: center;
      color: #6c757d;
      padding: 2rem;
      font-style: italic;
    }

    .benefits-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .benefit-item strong {
      color: #212529;
      display: block;
      margin-bottom: 0.25rem;
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

      .stats {
        font-size: 0.9rem;
      }
    }
  `]
})
export class SignalsComponent {
  // Basic signal
  count = signal(0);

  // Computed signals
  doubled = computed(() => this.count() * 2);
  tripled = computed(() => this.count() * 3);

  // Task signals
  tasks = signal<Task[]>([
    { id: 1, title: 'Learn about Signals', completed: true },
    { id: 2, title: 'Try computed values', completed: false },
    { id: 3, title: 'Understand effects', completed: false }
  ]);

  totalTasks = computed(() => this.tasks().length);
  completedTasks = computed(() => this.tasks().filter(t => t.completed).length);
  pendingTasks = computed(() => this.totalTasks() - this.completedTasks());
  completionPercentage = computed(() =>
    this.totalTasks() > 0
      ? Math.round((this.completedTasks() / this.totalTasks()) * 100)
      : 0
  );

  constructor() {
    // Effect example - logs to console when count changes
    effect(() => {
      console.log('Count changed to:', this.count());
      console.log('Doubled value:', this.doubled());
    });

    effect(() => {
      console.log('Tasks updated. Total:', this.totalTasks(), 'Completed:', this.completedTasks());
    });
  }

  increment() {
    this.count.update(v => v + 1);
  }

  decrement() {
    this.count.update(v => v - 1);
  }

  reset() {
    this.count.set(0);
  }

  addTask(title: string) {
    if (!title.trim()) return;

    this.tasks.update(tasks => [...tasks, {
      id: Date.now(),
      title: title.trim(),
      completed: false
    }]);
  }

  toggleTask(id: number) {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  deleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }
}
