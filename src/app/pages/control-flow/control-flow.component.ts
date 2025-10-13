import { Component, signal } from '@angular/core';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user' | 'guest';
  email: string;
}

@Component({
  selector: 'app-control-flow',
  imports: [],
  template: `
    <div class="control-flow-container">
      <h2>Control Flow - New Built-in Syntax</h2>
      <p class="description">
        Angular 20 introduces new built-in control flow (at-if, at-for, at-switch) that replaces
        structural directives with better performance and improved developer experience.
      </p>

      <div class="demo-grid">
        <!-- @if Example -->
        <div class="demo-card">
          <h3>🔀 at-if / at-else</h3>
          <div class="demo-content">
            <div class="button-group">
              <button (click)="toggleLogin()">
                {{ isLoggedIn() ? 'Logout' : 'Login' }}
              </button>
            </div>

            @if (isLoggedIn()) {
              <div class="message success">
                ✅ Welcome back! You are logged in.
              </div>
            } @else {
              <div class="message warning">
                ⚠️ Please log in to continue.
              </div>
            }

            @if (isLoggedIn() && isAdmin()) {
              <div class="message info">
                🔑 Admin panel is available!
              </div>
            }
          </div>
          <div class="code-section">
            <pre><code>at-if (isLoggedIn()) &#123;
  &lt;div&gt;Welcome back!&lt;/div&gt;
&#125; at-else &#123;
  &lt;div&gt;Please log in&lt;/div&gt;
&#125;

at-if (isLoggedIn() && isAdmin()) &#123;
  &lt;div&gt;Admin panel&lt;/div&gt;
&#125;</code></pre>
          </div>
        </div>

        <!-- @for Example -->
        <div class="demo-card">
          <h3>🔁 at-for with at-empty</h3>
          <div class="demo-content">
            <div class="button-group">
              <button (click)="addUser()">Add User</button>
              <button (click)="clearUsers()">Clear All</button>
            </div>

            <div class="user-list">
              @for (user of users(); track user.id) {
                <div class="user-item">
                  <strong>{{ user.name }}</strong>
                  <span class="badge">{{ user.role }}</span>
                  <button class="small-btn" (click)="removeUser(user.id)">✕</button>
                </div>
              } @empty {
                <p class="empty-state">No users found. Add some!</p>
              }
            </div>

            <p class="info">Count: {{ users().length }}</p>
          </div>
          <div class="code-section">
            <pre><code>at-for (item of users(); track item.id) &#123;
  &lt;div&gt;
    &lt;strong&gt;item.name&lt;/strong&gt;
    &lt;span&gt;item.role&lt;/span&gt;
  &lt;/div&gt;
&#125; at-empty &#123;
  &lt;p&gt;No users found&lt;/p&gt;
&#125;</code></pre>
          </div>
        </div>

        <!-- @switch Example -->
        <div class="demo-card full-width">
          <h3>🎯 at-switch / at-case / at-default</h3>
          <div class="demo-content">
            <div class="button-group">
              <button (click)="setTheme('light')">Light</button>
              <button (click)="setTheme('dark')">Dark</button>
              <button (click)="setTheme('auto')">Auto</button>
              <button (click)="setTheme('custom')">Custom</button>
            </div>

            @switch (currentTheme()) {
              @case ('light') {
                <div class="theme-display light">
                  <h4>☀️ Light Theme</h4>
                  <p>Clean and bright interface for daytime use.</p>
                </div>
              }
              @case ('dark') {
                <div class="theme-display dark">
                  <h4>🌙 Dark Theme</h4>
                  <p>Easy on the eyes for nighttime coding.</p>
                </div>
              }
              @case ('auto') {
                <div class="theme-display auto">
                  <h4>🔄 Auto Theme</h4>
                  <p>Automatically adjusts based on system preferences.</p>
                </div>
              }
              @default {
                <div class="theme-display custom">
                  <h4>🎨 Custom Theme</h4>
                  <p>Your personalized color scheme.</p>
                </div>
              }
            }
          </div>
          <div class="code-section">
            <pre><code>at-switch (currentTheme()) &#123;
  at-case ('light') &#123;
    &lt;div&gt;Light Theme&lt;/div&gt;
  &#125;
  at-case ('dark') &#123;
    &lt;div&gt;Dark Theme&lt;/div&gt;
  &#125;
  at-default &#123;
    &lt;div&gt;Custom Theme&lt;/div&gt;
  &#125;
&#125;</code></pre>
          </div>
        </div>

        <!-- Nested Control Flow -->
        <div class="demo-card full-width">
          <h3>🔗 Nested Control Flow</h3>
          <div class="demo-content">
            <div class="status-grid">
              @if (isLoggedIn()) {
                <div class="status-card">
                  <h4>User Status</h4>
                  @for (user of users(); track user.id; let idx = $index) {
                    <div class="nested-item">
                      <span>{{ idx + 1 }}. {{ user.name }}</span>
                      @switch (user.role) {
                        @case ('admin') {
                          <span class="badge admin">👑 Admin</span>
                        }
                        @case ('user') {
                          <span class="badge user">👤 User</span>
                        }
                        @default {
                          <span class="badge guest">👥 Guest</span>
                        }
                      }
                    </div>
                  } @empty {
                    <p class="empty-state">No users to display</p>
                  }
                </div>
              } @else {
                <div class="message warning">
                  Please login to view user status
                </div>
              }
            </div>
          </div>
          <div class="code-section">
            <pre><code>at-if (isLoggedIn()) &#123;
  at-for (user of users(); track user.id) &#123;
    at-switch (user.role) &#123;
      at-case ('admin') &#123;
        &lt;span&gt;Admin&lt;/span&gt;
      &#125;
      at-default &#123;
        &lt;span&gt;User&lt;/span&gt;
      &#125;
    &#125;
  &#125;
&#125;</code></pre>
          </div>
        </div>

        <!-- Benefits -->
        <div class="demo-card full-width">
          <h3>✨ Benefits of New Control Flow</h3>
          <div class="benefits-grid">
            <div class="benefit-item">
              <strong>🚀 Better Performance</strong>
              <p>More efficient than structural directives</p>
            </div>
            <div class="benefit-item">
              <strong>📝 Cleaner Syntax</strong>
              <p>No more *ngIf, *ngFor, *ngSwitch</p>
            </div>
            <div class="benefit-item">
              <strong>🎯 Built-in Tracking</strong>
              <p>at-for requires track for better list rendering</p>
            </div>
            <div class="benefit-item">
              <strong>💡 Better DX</strong>
              <p>Improved IDE support and readability</p>
            </div>
            <div class="benefit-item">
              <strong>🔒 Type Safety</strong>
              <p>Better type inference with new syntax</p>
            </div>
            <div class="benefit-item">
              <strong>📦 Smaller Bundles</strong>
              <p>More tree-shakeable than directives</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .control-flow-container {
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

    .button-group {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1rem;
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

    .small-btn {
      padding: 0.25rem 0.5rem;
      font-size: 0.9rem;
      background: #dc3545;
    }

    .small-btn:hover {
      background: #c82333;
    }

    .message {
      padding: 1rem;
      border-radius: 8px;
      margin: 0.5rem 0;
      font-weight: 500;
    }

    .message.success {
      background: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .message.warning {
      background: #fff3cd;
      color: #856404;
      border: 1px solid #ffeaa7;
    }

    .message.info {
      background: #d1ecf1;
      color: #0c5460;
      border: 1px solid #bee5eb;
    }

    .user-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin: 1rem 0;
    }

    .user-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .user-item strong {
      flex: 1;
    }

    .badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .badge.admin {
      background: #ffd43b;
      color: #000;
    }

    .badge.user {
      background: #667eea;
      color: white;
    }

    .badge.guest {
      background: #6c757d;
      color: white;
    }

    .theme-display {
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 1rem;
    }

    .theme-display h4 {
      margin: 0 0 0.5rem 0;
    }

    .theme-display.light {
      background: #fff;
      border: 2px solid #ffd43b;
      color: #000;
    }

    .theme-display.dark {
      background: #212529;
      border: 2px solid #495057;
      color: #fff;
    }

    .theme-display.auto {
      background: linear-gradient(to right, #fff 50%, #212529 50%);
      border: 2px solid #667eea;
      color: #667eea;
    }

    .theme-display.custom {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: 2px solid #764ba2;
      color: white;
    }

    .status-grid {
      margin-top: 1rem;
    }

    .status-card {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 8px;
    }

    .status-card h4 {
      margin: 0 0 1rem 0;
      color: #212529;
    }

    .nested-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem;
      background: white;
      border-radius: 6px;
      margin-bottom: 0.5rem;
    }

    .empty-state {
      text-align: center;
      color: #6c757d;
      padding: 1.5rem;
      font-style: italic;
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
      margin-top: 0.5rem;
    }

    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

      .benefits-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ControlFlowComponent {
  isLoggedIn = signal(false);
  isAdmin = signal(true);
  currentTheme = signal<'light' | 'dark' | 'auto' | 'custom'>('light');

  users = signal<User[]>([
    { id: 1, name: 'Alice Admin', role: 'admin', email: 'alice@example.com' },
    { id: 2, name: 'Bob User', role: 'user', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Guest', role: 'guest', email: 'charlie@example.com' }
  ]);

  private userIdCounter = 4;

  toggleLogin() {
    this.isLoggedIn.update(v => !v);
  }

  setTheme(theme: 'light' | 'dark' | 'auto' | 'custom') {
    this.currentTheme.set(theme);
  }

  addUser() {
    const roles: ('admin' | 'user' | 'guest')[] = ['admin', 'user', 'guest'];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    this.users.update(users => [...users, {
      id: this.userIdCounter++,
      name: `User ${this.userIdCounter}`,
      role: randomRole,
      email: `user${this.userIdCounter}@example.com`
    }]);
  }

  removeUser(id: number) {
    this.users.update(users => users.filter(u => u.id !== id));
  }

  clearUsers() {
    this.users.set([]);
  }
}
