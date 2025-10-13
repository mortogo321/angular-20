import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-heavy-component',
  imports: [],
  template: `
    <div class="heavy-component">
      <h4>🎉 Heavy Component Loaded!</h4>
      <p>This component was deferred and loaded on demand.</p>
      <div class="loading-animation">
        @for (item of [1,2,3,4,5]; track item) {
          <div class="loading-box"></div>
        }
      </div>
    </div>
  `,
  styles: [`
    .heavy-component {
      background: #d4edda;
      border: 2px solid #28a745;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 1rem 0;
    }

    .heavy-component h4 {
      margin: 0 0 0.5rem 0;
      color: #155724;
    }

    .heavy-component p {
      margin: 0 0 1rem 0;
      color: #155724;
    }

    .loading-animation {
      display: flex;
      gap: 0.5rem;
    }

    .loading-box {
      width: 40px;
      height: 40px;
      background: #28a745;
      border-radius: 4px;
      animation: pulse 1.5s ease-in-out infinite;
    }

    .loading-box:nth-child(2) { animation-delay: 0.1s; }
    .loading-box:nth-child(3) { animation-delay: 0.2s; }
    .loading-box:nth-child(4) { animation-delay: 0.3s; }
    .loading-box:nth-child(5) { animation-delay: 0.4s; }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.1); opacity: 0.7; }
    }
  `]
})
export class HeavyComponent {}

@Component({
  selector: 'app-defer',
  imports: [HeavyComponent],
  template: `
    <div class="defer-container">
      <h2>Defer Loading - Optimize Performance</h2>
      <p class="description">
        at-defer allows you to declaratively lazy load components and reduce initial bundle size.
        Components are loaded on demand based on triggers like viewport visibility, interaction, or timers.
      </p>

      <div class="demo-grid">
        <!-- On Interaction -->
        <div class="demo-card">
          <h3>👆 Defer on Interaction</h3>
          <div class="demo-content">
            <p>Click the button to load the component:</p>
            <button (click)="showInteraction.set(true)">
              Load Component
            </button>

            @if (showInteraction()) {
              @defer (on interaction) {
                <div class="deferred-content">
                  <p>✅ Component loaded on button interaction!</p>
                  <p class="info">This was triggered by the interaction trigger.</p>
                </div>
              } @placeholder {
                <div class="placeholder">
                  <p>⏳ Click button to load...</p>
                </div>
              } @loading (minimum 500ms) {
                <div class="loading">
                  <p>⌛ Loading component...</p>
                </div>
              }
            }
          </div>
          <div class="code-section">
            <pre><code>at-defer (on interaction) &#123;
  &lt;app-heavy /&gt;
&#125; at-placeholder &#123;
  &lt;div&gt;Click to load&lt;/div&gt;
&#125; at-loading &#123;
  &lt;div&gt;Loading...&lt;/div&gt;
&#125;</code></pre>
          </div>
        </div>

        <!-- On Viewport -->
        <div class="demo-card">
          <h3>👁️ Defer on Viewport</h3>
          <div class="demo-content">
            <p>Scroll down to load the component:</p>

            <div class="scroll-space">
              <p>↓ Scroll down ↓</p>
            </div>

            @defer (on viewport) {
              <div class="deferred-content">
                <p>✅ Component loaded when visible!</p>
                <p class="info">Triggered by viewport intersection.</p>
              </div>
            } @placeholder {
              <div class="placeholder viewport-placeholder">
                <p>⏳ Scroll to load...</p>
              </div>
            }
          </div>
          <div class="code-section">
            <pre><code>at-defer (on viewport) &#123;
  &lt;app-heavy /&gt;
&#125; at-placeholder &#123;
  &lt;div&gt;Scroll to load&lt;/div&gt;
&#125;</code></pre>
          </div>
        </div>

        <!-- On Hover -->
        <div class="demo-card">
          <h3>🖱️ Defer on Hover</h3>
          <div class="demo-content">
            <p>Hover over the box to load:</p>

            <div class="hover-trigger">
              @defer (on hover) {
                <div class="deferred-content">
                  <p>✅ Loaded on hover!</p>
                  <p class="info">Triggered by hover event.</p>
                </div>
              } @placeholder {
                <div class="placeholder">
                  <p>🖱️ Hover me to load</p>
                </div>
              } @loading (minimum 300ms) {
                <div class="loading">
                  <p>⌛ Loading...</p>
                </div>
              }
            </div>
          </div>
          <div class="code-section">
            <pre><code>at-defer (on hover) &#123;
  &lt;app-heavy /&gt;
&#125; at-placeholder &#123;
  &lt;div&gt;Hover to load&lt;/div&gt;
&#125;</code></pre>
          </div>
        </div>

        <!-- On Idle -->
        <div class="demo-card">
          <h3>😴 Defer on Idle</h3>
          <div class="demo-content">
            <p>Component loads when browser is idle:</p>

            @defer (on idle) {
              <div class="deferred-content">
                <p>✅ Loaded during browser idle time!</p>
                <p class="info">Uses requestIdleCallback.</p>
              </div>
            } @placeholder {
              <div class="placeholder">
                <p>⏳ Will load when idle...</p>
              </div>
            }
          </div>
          <div class="code-section">
            <pre><code>at-defer (on idle) &#123;
  &lt;app-heavy /&gt;
&#125; at-placeholder &#123;
  &lt;div&gt;Loading when idle&lt;/div&gt;
&#125;</code></pre>
          </div>
        </div>

        <!-- On Timer -->
        <div class="demo-card">
          <h3>⏰ Defer on Timer</h3>
          <div class="demo-content">
            <p>Component loads after 2 seconds:</p>

            @defer (on timer(2s)) {
              <div class="deferred-content">
                <p>✅ Loaded after 2 seconds!</p>
                <p class="info">Triggered by timer.</p>
              </div>
            } @placeholder {
              <div class="placeholder">
                <p>⏳ Loading in 2s...</p>
              </div>
            } @loading {
              <div class="loading">
                <p>⌛ Loading...</p>
              </div>
            }
          </div>
          <div class="code-section">
            <pre><code>at-defer (on timer(2s)) &#123;
  &lt;app-heavy /&gt;
&#125; at-placeholder &#123;
  &lt;div&gt;Wait 2s&lt;/div&gt;
&#125;</code></pre>
          </div>
        </div>

        <!-- Heavy Component Example -->
        <div class="demo-card full-width">
          <h3>🎨 Heavy Component Example</h3>
          <div class="demo-content">
            <div class="button-group">
              <button (click)="loadHeavy.set(true)">
                Load Heavy Component
              </button>
              <button (click)="loadHeavy.set(false)">
                Unload
              </button>
            </div>

            @if (loadHeavy()) {
              @defer {
                <app-heavy-component />
              } @placeholder {
                <div class="placeholder">
                  <p>⏳ Heavy component placeholder</p>
                </div>
              } @loading (minimum 1s) {
                <div class="loading">
                  <div class="spinner"></div>
                  <p>⌛ Loading heavy component...</p>
                </div>
              } @error {
                <div class="error">
                  <p>❌ Failed to load component</p>
                </div>
              }
            }
          </div>
          <div class="code-section">
            <pre><code>at-defer &#123;
  &lt;app-heavy-component /&gt;
&#125; at-placeholder &#123;
  &lt;div&gt;Placeholder&lt;/div&gt;
&#125; at-loading (minimum 1s) &#123;
  &lt;div&gt;Loading...&lt;/div&gt;
&#125; at-error &#123;
  &lt;div&gt;Error!&lt;/div&gt;
&#125;</code></pre>
          </div>
        </div>

        <!-- Benefits -->
        <div class="demo-card full-width">
          <h3>✨ Benefits of at-defer</h3>
          <div class="benefits-grid">
            <div class="benefit-item">
              <strong>📦 Smaller Initial Bundle</strong>
              <p>Reduce initial load time by deferring non-critical components</p>
            </div>
            <div class="benefit-item">
              <strong>⚡ Better Performance</strong>
              <p>Load components only when needed</p>
            </div>
            <div class="benefit-item">
              <strong>🎯 Multiple Triggers</strong>
              <p>viewport, interaction, hover, idle, timer, and more</p>
            </div>
            <div class="benefit-item">
              <strong>🔄 Loading States</strong>
              <p>Built-in placeholder, loading, and error states</p>
            </div>
            <div class="benefit-item">
              <strong>📝 Declarative Syntax</strong>
              <p>Simple, readable template syntax</p>
            </div>
            <div class="benefit-item">
              <strong>🎨 Customizable</strong>
              <p>Control minimum loading times and prefetch strategies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .defer-container {
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

    .button-group {
      display: flex;
      gap: 0.5rem;
      margin: 1rem 0;
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

    .deferred-content {
      background: #d4edda;
      border: 2px solid #28a745;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
    }

    .deferred-content p {
      margin: 0.5rem 0;
      color: #155724;
    }

    .placeholder {
      background: #fff3cd;
      border: 2px dashed #ffc107;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      margin: 1rem 0;
    }

    .placeholder p {
      margin: 0;
      color: #856404;
      font-weight: 500;
    }

    .loading {
      background: #d1ecf1;
      border: 2px solid #17a2b8;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      margin: 1rem 0;
    }

    .loading p {
      margin: 0;
      color: #0c5460;
      font-weight: 500;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #17a2b8;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 1rem;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .error {
      background: #f8d7da;
      border: 2px solid #dc3545;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
      text-align: center;
    }

    .error p {
      margin: 0;
      color: #721c24;
      font-weight: 500;
    }

    .scroll-space {
      height: 150px;
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 1rem 0;
    }

    .scroll-space p {
      color: #6c757d;
      font-weight: 500;
      font-size: 1.2rem;
    }

    .hover-trigger {
      min-height: 100px;
      cursor: pointer;
    }

    .viewport-placeholder {
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
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
      font-size: 0.9rem;
      font-style: italic;
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
export class DeferComponent {
  showInteraction = signal(false);
  loadHeavy = signal(false);
}
